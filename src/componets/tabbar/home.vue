<template>
    <div class="home_container vue_container">
        <!--banner-->
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in banner" :key="item.id">
                <img :src="item.img" alt="" class="responsive_img">
            </mt-swipe-item>
        </mt-swipe>
        <!--六宫格-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="item in cate" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link :to="item.href">
                    <img :src="item.img" alt="" class="responsive_img">
                    <div class="mui-media-body">{{item.msg}}</div></router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                banner: [],
                cate:[
                    {id:1,img:'../../images/menu1.png',msg:'新闻资讯',href:'/home/newsList'},
                    {id:2,img:'../../images/menu2.png',msg:'图片分享',href:'/home/photoList'},
                    {id:3,img:'../../images/menu3.png',msg:'商品购买',href:'/home/shopList'},
                    {id:4,img:'../../images/menu4.png',msg:'留言反馈',href:'#'},
                    {id:5,img:'../../images/menu5.png',msg:'视频专区',href:'#'},
                    {id:6,img:'../../images/menu6.png',msg:'联系我们',href:'#'},
                ]
            }
        },
        created(){
            this.getBanner();
        },
        methods: {
            getBanner() {
                this.$axios.get('/api/getlunbo')
                    .then(result => {
                        if (result.data.status === 0) {
                            this.banner = result.data.message;
                        }
                    });
            }
        }
    }
</script>

<style lang="less" scoped>
    @baseFontSize: 100px;
    .home_container{
        .mint-swipe {
            height: 200rem/@baseFontSize;
            img{
                height: 100%;
            }
        }
        .mui-content{
            .mui-table-view{
                margin-top: 0;
                background-color: #fff;
                border: none;
                li{
                    padding-top: 0;
                    padding-bottom: 0;
                    border: none;
                }
            }
        }
    }
</style>