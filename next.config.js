/** @type {import('next').NextConfig} */

const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    SHOW_IMAGES_SINCE_DAYS:31,
    UPLOADS_FOLDER:"http://39.107.24.84:8080/uploads/",
    HOST:"http://39.107.24.84:8080",
    PAGE_ENTRY:"http://39.107.24.84:4000",
    // UPLOADS_FOLDER:"http://localhost:8080/uploads/",
    // HOST:"http://localhost:8080",
    // PAGE_ENTRY:"http://localhost:3000",
    OPENAI_API_KEY:"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",
    OPENAI_ORG:"org-HtFHdnnhyCUhfe2o7YJA3n04",
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  images:{
    remotePatterns: [
      // {
      //   protocol: 'http',
      //   hostname: '39.107.24.84',
      //   port: '8080',
      //   pathname: '/uploads/**',
      // },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    domains: ['http://39.107.24.84:4000','http://39.107.24.84:8080'],
    // unoptimized: true,
  }
}

module.exports = nextConfig
