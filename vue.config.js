module.exports = {
    devServer: {
      // Paths
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      proxyTable: {
        // '**': {
        //   target: 'http://localhost:8080',
        //   changeOrigin: true,
  
        },
        '/api': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          logLevel : 'debug',
          pathRewrite: {
            '^/api': '/api'
          }
        },
        '/oauth/token': {
          target: 'http://localhost:8081',
          logLevel : 'debug',
          changeOrigin: true,
          pathRewrite: {
            '^/oauth/token': ''
          }
  
        // }
      },
    }
}