/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const nextConfig = {
  images: {
    domains: ['cp.alhayatsmart.com', 'images.pexels.com'],
    unoptimized: true
  },
  env: {
    API_URL: process.env.API_URL || 'https://cp.alhayatsmart.com/api/',
    FB_APP_ID: process.env.FB_APP_ID || '337882340426556',
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || 'UA-144674258-5'
  },
  experimental: {
    appDir: true
  }
};

module.exports = withNextIntl(nextConfig);