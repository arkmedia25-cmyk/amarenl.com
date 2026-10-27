/** @type {import('next').NextConfig} */
// Preview deploy'larında Vercel görsel optimizasyonunu kapat: her preview binlerce
// dönüşüm üretip görsel kotasını (Hobby 5K/ay) tek başına tüketiyordu. Üretim
// davranışı değişmez (VERCEL_ENV yalnızca Vercel'de dolu).
const nextConfig = {
  images: {
    unoptimized: process.env.VERCEL_ENV === 'preview',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amarecdn.azureedge.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
