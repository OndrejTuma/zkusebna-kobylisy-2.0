const withTM = require('next-transpile-modules')(['@toptal/picasso'])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM(nextConfig)
