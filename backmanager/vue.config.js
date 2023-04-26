const { defineConfig } = require('@vue/cli-service')
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy:{
      '/back':{
        target:'http://127.0.0.1:4000',
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
        .set('@', resolve('src'))
  }
})
