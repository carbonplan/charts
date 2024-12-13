const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: { format: 'mdx' },
})

const isDev =
  process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'tsx', 'md', 'mdx'],
  assetPrefix: isDev ? '' : 'https://charts.docs.carbonplan.org',
})
