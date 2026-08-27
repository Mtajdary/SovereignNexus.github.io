const fs = require('fs');

// ساخت یک تصویر شیک برداری SVG از تاج طلایی Prime Crown
const createCrownSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#05070c"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${size * 0.03}" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- پس‌زمینه دارک با گوشه‌های نرم برای حالت ماسکبل -->
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bgGrad)"/>
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="none" stroke="#eab308" stroke-width="${size * 0.015}" stroke-opacity="0.3"/>

  <!-- هاله نور طلایی مرکزی -->
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.3}" fill="#eab308" opacity="0.1" filter="url(#glow)"/>

  <!-- نماد تاج حاکمیتی (Crown Silhouette) -->
  <g filter="url(#glow)" transform="translate(${size * 0.15}, ${size * 0.2}) scale(${size * 0.7 / 100})">
    <!-- پایه‌های تاج -->
    <path d="M 10 75 L 20 25 L 38 52 L 50 15 L 62 52 L 80 25 L 90 75 Z" fill="url(#goldGrad)" stroke="#fef08a" stroke-width="2" stroke-linejoin="round"/>
    <!-- نگین‌های سر تاج -->
    <circle cx="20" cy="22" r="4" fill="#fef08a"/>
    <circle cx="50" cy="12" r="5.5" fill="#fef08a"/>
    <circle cx="80" cy="22" r="4" fill="#fef08a"/>
    <!-- نوار پایه تاج -->
    <rect x="10" y="78" width="80" height="10" rx="3" fill="url(#goldGrad)"/>
    <circle cx="30" cy="83" r="2.5" fill="#05070c"/>
    <circle cx="50" cy="83" r="2.5" fill="#05070c"/>
    <circle cx="70" cy="83" r="2.5" fill="#05070c"/>
  </g>
</svg>
`;

// ذخیره نسخه SVG
fs.writeFileSync('public/icon.svg', createCrownSvg(512));
fs.writeFileSync('public/logo192.svg', createCrownSvg(192));
fs.writeFileSync('public/logo512.svg', createCrownSvg(512));
console.log('SVG Icons Generated Successfully!');
