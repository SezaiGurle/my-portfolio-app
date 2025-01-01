/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: Bu seçenek sadece geliştirme aşamasında kullanılmalıdır
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['cdn-images-1.medium.com', 'miro.medium.com'],
  },
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig 