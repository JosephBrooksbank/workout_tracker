/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    'HASURA_PROJECT_ENDPOINT': 'https://ready-possum-47.hasura.app/v1/graphql',
    'HASURA_ADMIN_SECRET': 'KVeSEYtHBL8wwW4z7EtPG4DZUU66S4dZLpmMDUI4iWTeAlJr3JbbIrJFDBSIQl06'
  }
}

module.exports = nextConfig
