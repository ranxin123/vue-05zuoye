import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(ElementUI);
import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://www.liulongbin.top:3006"
new Vue({
  render: (h) => h(App),
}).$mount('#app');
