## 2024-03-21 - Fallback UX for React SPAs
**Learning:** React SPAs inherently show a completely blank screen when JavaScript is disabled or fails to load. This leaves users, especially those using restrictive browsers or corporate networks, with zero context as to why the app isn't working, causing significant confusion and appearing completely broken.
**Action:** Always include a styled `<noscript>` block in the base `index.html` of SPAs to provide a clear, helpful message when JS is unavailable, ensuring graceful degradation of the user experience.
