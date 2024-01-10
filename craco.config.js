const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@/': path.resolve(__dirname, 'src/'),
      '@/components': path.resolve(__dirname, 'src/components/'),
      '@/contexts': path.resolve(__dirname, 'src/contexts/'),
      '@/pages': path.resolve(__dirname, 'src/pages/'),
      '@/styles': path.resolve(__dirname, 'src/styles/'),
      '@/core': path.resolve(__dirname, 'src/core/'),
    },
  },
}
