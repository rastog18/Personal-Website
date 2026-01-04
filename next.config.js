/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  
    // Enables fully static output (great for Netlify/GitHub Pages).
    // If you're deploying on Vercel, you can remove this and it will still work.
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true }
  };
  
  module.exports = nextConfig;
  