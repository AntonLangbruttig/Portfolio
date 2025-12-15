export default {
  env: {
    MY_AWS_ACCESS_KEY_ID: process.env.MY_AWS_ACCESS_KEY_ID,
    MY_AWS_SECRET_ACCESS_KEY: process.env.MY_AWS_SECRET_ACCESS_KEY,
    SES_SENDER_EMAIL: process.env.SES_SENDER_EMAIL,
    SES_RECIPIENT_EMAIL: process.env.SES_RECIPIENT_EMAIL,
    AWS_REGION: process.env.AWS_REGION || 'us-east-1',
  },
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
