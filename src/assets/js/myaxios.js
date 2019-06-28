import axios from 'axios'

// 将axios 封装为一个组件，全局使用
var myaxios = {}
// 添加一个方法
myaxios.install = function (vue) {
//   统一挂载请求路径
  axios.defaults.baseURL = 'http://yule.tinsine.com/cms'
  // 将axios 挂载到 vue 的原型中
  vue.prototype.$http = axios
}
export default myaxios
