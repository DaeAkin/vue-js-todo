module.exports = {
    devServer: {
      proxy : {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          logLevel : 'debug',
          pathRewrite: {
            '^/api': '/api'
          }
        },
        '/oauth': {
          target: 'http://localhost:8080',
          logLevel : 'debug',
          changeOrigin: true,
          pathRewrite: {
            '^/oauth': '/oauth'
          }
        }
    }
  }
}