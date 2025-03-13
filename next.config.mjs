export default {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://api.iconify.design;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              img-src 'self' data: https://api.iconify.design https://main.d2l6i0f7oy0lzy.amplifyapp.com https://*.amazonaws.com;
              connect-src 'self' https://api.iconify.design;
              frame-src 'none';
            `.replace(/\s{2,}/g, " "),
          },
        ],
      },
    ];
  },
};
