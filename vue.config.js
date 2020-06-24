module.exports = {
    devServer: {
      proxy : {
        '/api': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          logLevel : 'debug',
          pathRewrite: {
            '^/api': '/api'
          }
        },
        '/oauth': {
          target: 'http://localhost:8081',
          logLevel : 'debug',
          changeOrigin: true,
          pathRewrite: {
            '^/oauth': '/oauth'
          }
        }
    }
  }
}