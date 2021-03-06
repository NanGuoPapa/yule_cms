const path = require("path")
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 开启 CSS source maps?
  css: {
    sourceMap: false
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set('@components', resolve('src/components'))
      .set('@images', resolve('src/assets/images'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://yule.tinsine.com/php/public/cms/', // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
