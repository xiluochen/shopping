const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use('/shop', createProxyMiddleware({
        // 配置服务端的url
        target:'http://127.0.0.1:4000',
        changeOrigin: true,
        // 将匹配请求中的/shop 去除
        pathRewrite: {
            "^/shop":"",
        }
    }))
}