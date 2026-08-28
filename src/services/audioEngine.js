// Web Audio API Binaural Beats & Synthesizer Engine
class AudioEngineService {
  constructor() {
    this.ctx = null;
    this.oscLeft = null;
    this.oscRight = null;
    this.noiseNode = null;
    this.gainNode = null;
    this.isPlaying = false;
    this.currentPreset = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play subtle sound effects for UI
  playSfx(type = 'click') {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      const now = this.ctx.currentTime;
      if (type === 'click') {
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'granted') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.1);
        osc.frequency.setValueAtTime(659.25, now + 0.2);
        osc.frequency.setValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'reward') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        osc.frequency.setValueAtTime(1046.50, now + 0.24);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'unlock') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.3);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch (e) {
      console.warn('Audio SFX error:', e);
    }
  }

  // Play Binaural Beats (Alpha 10Hz, Theta 6Hz, Gamma 40Hz, or Noise)
  startPreset(preset = 'ALPHA', volume = 0.2) {
    try {
      this.init();
      this.stop();

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      let carrier = 220;
      let beat = 10; // Alpha: 10Hz

      if (preset === 'THETA') {
        carrier = 180;
        beat = 6;
      } else if (preset === 'GAMMA') {
        carrier = 260;
        beat = 40;
      } else if (preset === 'DELTA') {
        carrier = 140;
        beat = 3;
      }

      // Create stereo merger for binaural separation
      const merger = this.ctx.createChannelMerger(2);

      // Left oscillator
      this.oscLeft = this.ctx.createOscillator();
      this.oscLeft.type = 'sine';
      this.oscLeft.frequency.setValueAtTime(carrier, this.ctx.currentTime);
      this.oscLeft.connect(merger, 0, 0);

      // Right oscillator
      this.oscRight = this.ctx.createOscillator();
      this.oscRight.type = 'sine';
      this.oscRight.frequency.setValueAtTime(carrier + beat, this.ctx.currentTime);
      this.oscRight.connect(merger, 0, 1);

      merger.connect(this.gainNode);

      this.oscLeft.start();
      this.oscRight.start();
      this.isPlaying = true;
      this.currentPreset = preset;
    } catch (e) {
      console.warn('Binaural beat error:', e);
    }
  }

  setVolume(vol) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  stop() {
    try {
      if (this.oscLeft) {
        this.oscLeft.stop();
        this.oscLeft.disconnect();
        this.oscLeft = null;
      }
      if (this.oscRight) {
        this.oscRight.stop();
        this.oscRight.disconnect();
        this.oscRight = null;
      }
      this.isPlaying = false;
      this.currentPreset = null;
    } catch (e) {
      console.warn('Audio stop error:', e);
    }
  }
}

export const audioEngine = new AudioEngineService();
