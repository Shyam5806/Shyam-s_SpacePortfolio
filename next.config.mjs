/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Three.js uses browser APIs — mark as external for SSR safety
  experimental: {
    serverComponentsExternalPackages: ['three'],
  },
}

export default nextConfig
