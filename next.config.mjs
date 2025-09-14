/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

// Initialize the PWA plugin with its configuration
const withPwaPlugin = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

// Define your Next.js configuration
const nextConfig = {
  reactStrictMode: true,
};

// Wrap your Next.js config with the PWA plugin and export it
export default withPwaPlugin(nextConfig);

