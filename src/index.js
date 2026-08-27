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

// ثبت سرویس‌ورکر به‌صورت قطعی در تمام محیط‌ها
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => {
        console.log('PWA ServiceWorker Active:', reg.scope);
      })
      .catch((err) => {
        console.error('ServiceWorker Error:', err);
      });
  });
}
