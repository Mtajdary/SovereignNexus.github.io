// تبدیل اعداد انگلیسی به فارسی
export const toPersianDigits = (num) => {
  if (num === null || num === undefined) return '';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num
    .toString()
    .replace(/\d/g, (d) => farsiDigits[parseInt(d, 10)]);
};

// فرمت‌بندی سکه‌های حاکمیتی با کاما و پسوند
export const formatCoins = (coins) => {
  if (typeof coins !== 'number') return '۰';
  return coins.toLocaleString('fa-IR');
};

// فرمت‌بندی استاندارد تاریخ شمسی
export const getPersianDate = (date = new Date()) => {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(date));
};

// گرد کردن دقیق اعشار محاسبات مهندسی
export const roundTo = (val, decimals = 2) => {
  const parsed = parseFloat(val);
  if (isNaN(parsed)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round(parsed * factor) / factor;
};
