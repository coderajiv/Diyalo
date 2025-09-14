const withPWA = require('next-pwa')({
  dest: 'public',            // where the service worker will go
  register: true,            // auto-register the SW
  skipWaiting: true,         // update immediately on new SW
  disable: process.env.NODE_ENV === 'development', // disable in dev
});

module.exports = withPWA({
  reactStrictMode: true,
});
