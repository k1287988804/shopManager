import Vue from 'vue'
import App from './app.vue'
import router from './router.js'



var vm=new Vue({
    el:'#app',
    render:c=>c(App),
    router 
})