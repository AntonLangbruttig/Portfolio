const { NextServer } = require('@next/server');

const server = new NextServer({
  // Your Next.js app directory
  dir: './',
});

exports.handler = async (event) => {
  return server.render(event);
};