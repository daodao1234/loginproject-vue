// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import globalVariable from '@/api/global_variable.js'
import axios from "axios"
import qs from "qs"
import { getCookie, compareTime } from '@/api/util.js'


Vue.use(ElementUI)

axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true  //use cookie

Vue.prototype.GLOBALVARIABLE = globalVariable
Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs
Vue.prototype.getCookie = getCookie

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requireAuth)) { // judge if logined
    let userCookie = getCookie("WISEUser")
    if (userCookie !=null && userCookie!="" && userCookie!="undefined") {
      if(to.path === "/login"){
        next("/mainView")
      }else{
        next()
      }  
    }else{
      next("/")
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})