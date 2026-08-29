const fs = require('fs');

// ۱. فایل وکتور SVG خالص با تاج مینیمال طلایی و ستاره هوشمند
const elegantSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1e180a" />
      <stop offset="70%" stop-color="#080705" />
      <stop offset="100%" stop-color="#030712" />
    </radialGradient>
    <linearGradient id="goldLinear" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5C0" />
      <stop offset="35%" stop-color="#F59E0B" />
      <stop offset="70%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>
    <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#FFF" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0.8"/>
    </linearGradient>
  </defs>

  <rect width="512" height="512" rx="120" fill="url(#bgGlow)" stroke="#D4AF37" stroke-width="4" stroke-opacity="0.4"/>

  <!-- هاله درخشان پشت تاج -->
  <circle cx="256" cy="256" r="130" fill="#F59E0B" opacity="0.12"/>

  <!-- هندسه اصیل و مینیمال تاج PRIME CROWN -->
  <g transform="translate(0, 15)">
    <!-- بدنه اصلی تاج -->
    <path d="M120 340 L160 210 L220 280 L256 150 L292 280 L352 210 L392 340 Z" 
          fill="url(#goldLinear)" 
          stroke="#FFF" 
          stroke-width="2" 
          stroke-opacity="0.4"/>

    <!-- پایه زیرین تاج -->
    <rect x="120" y="352" width="272" height="24" rx="12" fill="url(#goldLinear)"/>
    
    <!-- خط نوری بازتاب روی پایه -->
    <line x1="140" y1="364" x2="372" y2="364" stroke="url(#glowLine)" stroke-width="3" stroke-linecap="round"/>

    <!-- ستاره درخشان ۴‌پر در راس قله اصلی -->
    <path d="M256 100 C256 122 244 134 222 134 C244 134 256 146 256 168 C256 146 268 134 290 134 C268 134 256 122 256 100 Z" fill="#FFFFFF"/>
    <circle cx="256" cy="134" r="3" fill="#FFE082"/>

    <!-- نگین‌های مینیمال قله‌های چپ و راست -->
    <circle cx="160" cy="205" r="7" fill="#FFF5C0"/>
    <circle cx="352" cy="205" r="7" fill="#FFF5C0"/>
  </g>
</svg>`;

fs.writeFileSync('public/icon-192.svg', elegantSvg);
fs.writeFileSync('public/icon-512.svg', elegantSvg);
fs.writeFileSync('public/favicon.svg', elegantSvg);

// یک تصویر PNG معتبر ۱x۱ شفاف اما با هدر استاندارد برای سازگاری کامل مرورگرها
const minimalPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);
fs.writeFileSync('public/icon-192.png', minimalPng);
fs.writeFileSync('public/icon-512.png', minimalPng);

console.log('Assets created successfully!');
