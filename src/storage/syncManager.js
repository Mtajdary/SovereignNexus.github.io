import { dbStorage } from './db';

class SyncManager {
  // مهاجرت خودکار داده‌های قدیمی localStorage به IndexedDB
  async migrateFromLocalStorage() {
    try {
      const journalData = localStorage.getItem('pc_tactical_journal');
      if (journalData) {
        const parsed = JSON.parse(journalData);
        for (const item of parsed) {
          await dbStorage.put('journal', item);
        }
      }

      const coins = localStorage.getItem('pc_coins');
      if (coins) {
        await dbStorage.put('system_state', { key: 'coins', value: parseInt(coins, 10) });
      }

      const unlocked = localStorage.getItem('pc_unlocked_items');
      if (unlocked) {
        await dbStorage.put('system_state', { key: 'unlocked_items', value: JSON.parse(unlocked) });
      }

      console.log('مهاجرت داده‌ها به IndexedDB با موفقیت انجام شد.');
    } catch (err) {
      console.error('خطا در مهاجرت داده‌ها:', err);
    }
  }

  // ایجاد و دانلود فایل پشتیبان رمزگذاری‌شده یا استاندارد JSON
  async exportFullBackup(filename = null) {
    const backup = await dbStorage.exportEntireDatabase();
    backup.meta = {
      system: 'PRIME CROWN SOVEREIGN OS',
      version: '3.0.0',
      exportedAt: new Date().toISOString()
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    const name = filename || `prime_crown_sovereign_backup_${Date.now()}.json`;

    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', name);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    return backup;
  }

  // بازگردانی فایل پشتیبان و ثبت مجدد در IndexedDB
  async restoreBackup(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (!data.stores) {
            throw new Error('فرمت فایل پشتیبان معتبر نیست.');
          }

          // بازنویسی و تزریق استورها
          for (const [storeName, items] of Object.entries(data.stores)) {
            for (const item of items) {
              await dbStorage.put(storeName, item);
            }
          }

          resolve({ success: true, count: Object.keys(data.stores).length });
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(new Error('خطا در خواندن فایل'));
      reader.readAsText(file);
    });
  }
}

export const syncManager = new SyncManager();
