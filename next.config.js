/** @type {import('next').NextConfig} */

const fs = require('fs-extra');

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  env: {
    backgroundImages:
      fs.readdirSync('./public/backgrounds').map(file => ({
        src: `/backgrounds/${file}`,
        width: 500,
        height: 500,
      }))
  }
}

module.exports = nextConfig
