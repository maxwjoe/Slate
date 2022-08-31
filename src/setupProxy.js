const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use('/*', proxy({
    target: 'https://slate-backend-server.herokuapp.com',
    changeOrigin: true,
    logLevel: 'debug',
    router: {
      'deployment': 'https://slate-fe.herokuapp.com/'
    }
  }));
};