/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
