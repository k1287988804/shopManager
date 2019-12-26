import Vue from 'vue'
import App from './app.vue'
import router from './router.js'
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
import './css/normalize.css'
import './css/style.css'
// elementUI
import './plugins/element.js'




var vm=new Vue({
    el:'#app',
    render:c=>c(App),
    router 
})