/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'Conxtent-Security-Policy',
            value:
              "script-src 'self'; report-uri /api/csp-violation-report;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;