import Vue from 'vue'
import App from './app.vue'
//mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI);

//mui
import './lib/mui/css/mui.min.css'
//mui扩展图标
import './lib/mui/css/icons-extra.css'

//axios
import axios from 'axios'
axios.defaults.baseURL = 'http://www.liulongbin.top:3005';
Vue.prototype.$axios = axios;
//路由
import VueRouter from 'vue-router'
import router from './router.js'
Vue.use(VueRouter);

//moment
import Moment from 'moment'

import './app.less'

//缩略图
import VuePreview from 'vue-preview'

Vue.use(VuePreview);

//全局过滤器 格式时间
Vue.filter('dateFormat',function (dateStr,partern = 'YYYY-MM-DD HH:mm:ss') {
    return Moment(dateStr).format(partern);
});

new Vue({
    el:'#app',
    render: c => c(App),
    router
});