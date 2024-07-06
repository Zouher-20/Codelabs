/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp'
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin'
                    }
                ]
            }
        ];
    },
    images: {
        domains: ['example.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'daisyui.com',
                port: '',
                pathname: '/images/stock/**'
            }
        ]
    }
};

export default nextConfig;
