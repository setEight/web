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

//vuex
import Vuex from 'vuex'
Vue.use(Vuex);

let car = JSON.parse(localStorage.getItem('shopCar') || '[]');
const store = new Vuex.Store({
   state:{
       car:car,
   } ,
    mutations:{
        addToCar(state,goodsList){
           let flag = true;
           state.car.forEach(item => {
               if (item.id == goodsList.id){
                   item.count += parseInt(goodsList.count);
                   flag = false;
                   return true
               }
           });
           if (flag){
               state.car.push(goodsList);
           }
           localStorage.setItem('shopCar',JSON.stringify(state.car));
        },
        getDel(state,id){
            state.car.some((item,index) => {
                if (item.id == id) {
                    state.car.splice(index,1);
                    return true;
                }
            });
            localStorage.setItem('shopCar',JSON.stringify(state.car));
        },
        getStatus(state,obj){
            state.car.some(item => {
                if (item.id == obj.id) {
                    item.selected = obj.statu;
                    return true;
                }
            });
            localStorage.setItem('shopCar',JSON.stringify(state.car));
        },
        getChangeCou(state,obj){
            state.car.some(item => {
                if (item.id == obj.id) {
                    item.count = obj.count;
                    return true;
                }
            });
            localStorage.setItem('shopCar',JSON.stringify(state.car));
        }
    },
    getters:{
        getCount(state){
            let arr = state.car;
            let sum = 0;
            arr.forEach(item => {
                sum += parseInt(item.count);
            });
            return sum;
        },
        getSelect(state){
            let obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.selected;
            });
            return obj;
        },
        getIdCou(state){
            let obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.count;
            });
            return obj;
        },
        getMoney(state){
            let num = {
                count:0,
                money:0
            }
            state.car.forEach(item => {
               if (item.selected){
                   num.count += item.count;
                   num.money += item.count*item.price;
               }
            });
            return num;
        }
    }
});



new Vue({
    el:'#app',
    render: c => c(App),
    router,
    store
});