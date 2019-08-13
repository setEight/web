import VueRouter from 'vue-router'

//组件
import Home from './componets/tabbar/home.vue'
import Member from './componets/tabbar/member.vue'
import Search from './componets/tabbar/search.vue'
import Shopcar from './componets/tabbar/shopcar.vue'
import NewsList from './componets/news/newsList.vue'
import NewsInfo from './componets/news/newsInfo.vue'
import PhotoList from './componets/photos/photoList.vue'
import PhotoInfo from './componets/photos/photoInfo.vue'
import ShopList from './componets/shopcar/shopList.vue'
import ShopInfo from './componets/shopcar/shopInfo.vue'
import DesPic from './componets/shopcar/shopDes/desPic.vue'
import DesMsg from './componets/shopcar/shopDes/desMsg.vue'

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/search',component:Search},
        {path:'/shopcar',component:Shopcar},
        {path:'/home/newsList',component:NewsList},
        {path:'/home/newsInfo/:id',component:NewsInfo},
        {path:'/home/photoList',component:PhotoList},
        {path:'/home/photoInfo/:id',component:PhotoInfo},
        {path:'/home/shopList',component:ShopList},
        {path:'/home/shopInfo/:id',component:ShopInfo},
        {path:'/home/pic/:id',component:DesPic},
        {path:'/home/msg/:id',component:DesMsg},
    ],
    linkActiveClass: 'mui-active',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});

export default router;
