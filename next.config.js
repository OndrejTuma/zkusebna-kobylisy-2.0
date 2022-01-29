const withTM = require('next-transpile-modules')(['@toptal/picasso'])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = withTM(nextConfig)
