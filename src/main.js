import Vue from 'vue'
import App from './app.vue'
import router from './router.js'
import './css/normalize.css'
import './css/style.css'
// elementUI
import './plugins/element.js'




var vm=new Vue({
    el:'#app',
    render:c=>c(App),
    router 
})