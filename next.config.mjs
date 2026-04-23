/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/build-with-us',
        destination: '/studio',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
