const { createProxyMiddleware } = require('http-proxy-middleware');

const BACK_END_PROXY = `http://${process.env.REACT_APP_CHAT_BACKEND_HOST}:${process.env.REACT_APP_CHAT_BACKEND_PORT}`;

module.exports = function (app) {
   app.use(
      '/api',
      createProxyMiddleware({
         target: BACK_END_PROXY,
         changeOrigin: true,
      })
   );
};
