class BinauralEngine {
  constructor() {
    this.ctx = null;
    this.leftOsc = null;
    this.rightOsc = null;
    this.gainNode = null;
    this.noiseNode = null;
    this.noiseGain = null;
    this.isPlaying = false;
    this.currentMode = 'gamma';
    this.volume = 0.3;

    this.frequencies = {
      gamma: { name: 'گاما ۴۰Hz (فوق‌تمرکز)', carrier: 200, beat: 40, desc: 'حداکثر پردازش شناختی و کدنویسی عمیق' },
      alpha: { name: 'آلفا ۱۰Hz (جریان خلاقیت)', carrier: 180, beat: 10, desc: 'یادگیری سریع و حل مسائل پیچیده' },
      theta: { name: 'تتا ۶Hz (شهود و بصیرت)', carrier: 140, beat: 6, desc: 'تفکر استراتژیک و آرامش عمیق' },
      delta: { name: 'دلتا ۲.۵Hz (بازیابی)', carrier: 100, beat: 2.5, desc: 'ریکاوری بیولوژیک و کاهش خستگی' }
    };
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  createPinkNoise() {
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.05;
      b6 = white * 0.115926;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    return noise;
  }

  start(modeKey = 'gamma') {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stop();

    this.currentMode = modeKey;
    const config = this.frequencies[modeKey] || this.frequencies.gamma;
    const leftFreq = config.carrier - config.beat / 2;
    const rightFreq = config.carrier + config.beat / 2;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    // Left Channel Oscillator
    const merger = this.ctx.createChannelMerger(2);
    this.leftOsc = this.ctx.createOscillator();
    this.leftOsc.type = 'sine';
    this.leftOsc.frequency.setValueAtTime(leftFreq, this.ctx.currentTime);
    this.leftOsc.connect(merger, 0, 0);

    // Right Channel Oscillator
    this.rightOsc = this.ctx.createOscillator();
    this.rightOsc.type = 'sine';
    this.rightOsc.frequency.setValueAtTime(rightFreq, this.ctx.currentTime);
    this.rightOsc.connect(merger, 0, 1);

    merger.connect(this.gainNode);

    // Pink Noise Ambient
    this.noiseNode = this.createPinkNoise();
    this.noiseGain = this.ctx.createGain();
    this.noiseGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    this.noiseNode.connect(this.noiseGain);
    this.noiseGain.connect(this.gainNode);

    this.gainNode.connect(this.ctx.destination);

    this.leftOsc.start();
    this.rightOsc.start();
    this.noiseNode.start();

    this.isPlaying = true;
    return config;
  }

  stop() {
    if (this.leftOsc) {
      try { this.leftOsc.stop(); } catch (e) {}
      this.leftOsc.disconnect();
      this.leftOsc = null;
    }
    if (this.rightOsc) {
      try { this.rightOsc.stop(); } catch (e) {}
      this.rightOsc.disconnect();
      this.rightOsc = null;
    }
    if (this.noiseNode) {
      try { this.noiseNode.stop(); } catch (e) {}
      this.noiseNode.disconnect();
      this.noiseNode = null;
    }
    this.isPlaying = false;
  }

  setVolume(val) {
    this.volume = val;
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  playClickSfx() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  playSuccessSfx() {
    this.init();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.2, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  }
}

export const liveSynth = new BinauralEngine();
