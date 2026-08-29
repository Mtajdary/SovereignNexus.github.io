class CryptoEngine {
  constructor() {
    this.algorithm = { name: 'AES-GCM', length: 256 };
  }

  // تولید کلید رمزنگاری امن بر اساس رمز عبور حاکمیتی
  async deriveKey(passphrase, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(passphrase),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      this.algorithm,
      false,
      ['encrypt', 'decrypt']
    );
  }

  // رمزنگاری متن خام به فرمت رمزگذاری شده
  async encrypt(plaintext, passphrase = 'PRIME_CROWN_MASTER_KEY') {
    const enc = new TextEncoder();
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const key = await this.deriveKey(passphrase, salt);

    const ciphertext = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      enc.encode(plaintext)
    );

    // تبدیل داده‌های باینری به Base64 برای ذخیره‌سازی آسان
    return {
      ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
      iv: btoa(String.fromCharCode(...iv)),
      salt: btoa(String.fromCharCode(...salt)),
      algorithm: 'AES-GCM-256'
    };
  }

  // رمزگشایی متن رمزگذاری شده به متن اصلی
  async decrypt(encryptedObj, passphrase = 'PRIME_CROWN_MASTER_KEY') {
    try {
      const dec = new TextDecoder();
      const ciphertext = new Uint8Array(atob(encryptedObj.ciphertext).split('').map(c => c.charCodeAt(0)));
      const iv = new Uint8Array(atob(encryptedObj.iv).split('').map(c => c.charCodeAt(0)));
      const salt = new Uint8Array(atob(encryptedObj.salt).split('').map(c => c.charCodeAt(0)));

      const key = await this.deriveKey(passphrase, salt);

      const decrypted = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        ciphertext
      );

      return dec.decode(decrypted);
    } catch (e) {
      console.error('Decryption failed:', e);
      return null;
    }
  }
}

export const cryptoEngine = new CryptoEngine();
