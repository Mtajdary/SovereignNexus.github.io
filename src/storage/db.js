const DB_NAME = 'PrimeCrownSovereignDB';
const DB_VERSION = 1;

class SovereignStorage {
  constructor() {
    this.db = null;
  }

  async init() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // 1. استور ژورنال تاکتیکی
        if (!db.objectStoreNames.contains('journal')) {
          const journalStore = db.createObjectStore('journal', { keyPath: 'id' });
          journalStore.createIndex('category', 'category', { unique: false });
          journalStore.createIndex('date', 'date', { unique: false });
        }

        // 2. استور نشست‌های تمرکز و غرقگی
        if (!db.objectStoreNames.contains('focus_sessions')) {
          const focusStore = db.createObjectStore('focus_sessions', { keyPath: 'id' });
          focusStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        // 3. استور محاسبات مهندسی عمران
        if (!db.objectStoreNames.contains('civil_records')) {
          const civilStore = db.createObjectStore('civil_records', { keyPath: 'id' });
          civilStore.createIndex('type', 'type', { unique: false });
        }

        // 4. استور پیکربندی و وضعیت سیستم
        if (!db.objectStoreNames.contains('system_state')) {
          db.createObjectStore('system_state', { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB init error:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async put(storeName, data) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(storeName) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName, id) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  async exportEntireDatabase() {
    await this.init();
    const stores = ['journal', 'focus_sessions', 'civil_records', 'system_state'];
    const backup = {
      version: DB_VERSION,
      exportTimestamp: new Date().toISOString(),
      stores: {}
    };

    for (const storeName of stores) {
      backup.stores[storeName] = await this.getAll(storeName);
    }

    return backup;
  }
}

export const dbStorage = new SovereignStorage();
