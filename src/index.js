import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ثبت قطعی سرویس‌ورکر برای فعال‌سازی کامل PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then((reg) => console.log('PWA ServiceWorker Active:', reg.scope))
      .catch((err) => console.error('PWA SW Error:', err));
  });
}
