const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@/': path.resolve(__dirname, 'src/'),
      '@/components': path.resolve(__dirname, 'src/components/'),
      '@/contexts': path.resolve(__dirname, 'src/contexts/'),
      '@/core': path.resolve(__dirname, 'src/core/'),
      '@/pages': path.resolve(__dirname, 'src/pages/'),
      '@/styles': path.resolve(__dirname, 'src/styles/'),
      '@/utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
}
