<template>
    <div class="shopInfo_container vue_container">
        <!--banner-->
        <div class="mui-card info_banner">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-swipe :auto="2000">
                        <mt-swipe-item v-for="item in banner" :key="item.id">
                            <img :src="item.src" alt="" class="responsive_img">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>
        <!--购买参数-->
        <div class="mui-card info_data">
            <div class="mui-card-header">{{shopInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price"><span class="old_price">市场价：<del>{{shopDes.market_price}}</del></span>销售价：<span class="now_price">{{shopInfo.sell_price}}</span></p>
                    <p>购买数量：</p>
                    <p class="count mui-clearfix">
                        <mt-button type="default" class="pull-left" @click="removeCou">-</mt-button>
                        <input type="text" readonly class="pull-left" v-model="shopInfo.cou">
                        <mt-button type="default" class="pull-left" @click="addCou">+</mt-button>
                    </p>
                    <p class="btn_buy">
                        <mt-button type="primary">立即购买</mt-button>
                        <mt-button type="danger">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <div class="mui-card cs_data">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：SD12487965165</p>
                    <p>库存情况：{{shopDes.stock_quantity}}</p>
                    <p>上架时间：{{shopDes.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <router-link :to="'/home/pic/'+id" plain class="pic" size="large">图文介绍</router-link>
                <router-link :to="'/home/msg/'+id" plain class="pl" size="large">商品评论</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "shopInfo",
        data(){
            return {
                banner:[],
                id: this.$route.params.id,
                shopInfo:{},
                shopList:[],
                shopDes:{}
            }
        },
        created(){
            this.getBanner();
            this.getShopInfo();
            this.getShopList();
        },
        methods:{
            getBanner(){
                this.$axios.get('/api/getthumimages/'+this.id)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.banner = result.data.message;
                        }
                    });
            },
            getShopInfo(){
                this.$axios.get('/api/goods/getshopcarlist/'+this.id)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.shopInfo = result.data.message[0];
                        }
                    })
            },
            addCou(){
                if (this.shopInfo.cou >= this.shopDes.stock_quantity) return;
                this.shopInfo.cou++;
            },
            removeCou(){
                if (this.shopInfo.cou <= 1) return;
                this.shopInfo.cou--;
            },
            getShopList(){
                for (let i = 1;i < 3;i++) {
                    this.$axios.get('/api/getgoods?pageindex='+i)
                        .then(result => {
                            if (result.data.status === 0) {
                                this.shopList = this.shopList.concat(result.data.message);
                                this.shopList.forEach(item => {
                                    if (item.id === parseInt(this.id)) {
                                            this.shopDes = item;
                                        }
                                    })
                            }
                        })
                }
            }
        }
    }
    /*this.shopList.forEach(item => {
        console.log(item);
        if (item.id === this.id) {
            this.shopDes = item;
        }
    })*/
</script>

<style lang="less" scoped>
    @baseFontSize:100px;
    .shopInfo_container{
        .mui-card{
            font-size: 14rem/@baseFontSize;
            &.info_banner{
                .mui-card-content-inner{
                    padding: 15rem/@baseFontSize 60px;
                    .mint-swipe {
                        height: 200rem/@baseFontSize;
                    }
                }
            }
            &.info_data{
                .mui-card-header{
                    font-size: 17rem/@baseFontSize;
                    line-height: 20rem/@baseFontSize;
                }
                p{
                    font-size: 12rem/@baseFontSize;
                    &.price{
                        .old_price{
                            margin-right: 10rem/@baseFontSize;
                        }
                        .now_price{
                            color: #ff0000;
                            font-size: 14rem/@baseFontSize;
                        }
                    }
                    &.count{
                        input{
                            width: 40rem/@baseFontSize;
                            height: 40rem/@baseFontSize;
                            padding: 0;
                            margin: 0;
                            text-align: center;
                            font-size: 12rem/@baseFontSize;
                        }
                        .mint-button{
                            width: 40rem/@baseFontSize;
                            height: 40rem/@baseFontSize;
                            margin: 0;
                        }
                    }
                    &.btn_buy{
                        .mint-button{
                            height: 40rem/@baseFontSize;
                            font-size: 14rem/@baseFontSize;
                            &:first-child{
                                width: 96rem/@baseFontSize;
                            }
                            &:last-child{
                                width: 96rem/@baseFontSize;
                            }
                        }
                    }
                }
            }
            &.cs_data{
                .mui-card-header{
                    font-size: 17rem/@baseFontSize;
                }
                .mui-card-content{
                    p{
                        font-size: 14rem/@baseFontSize;
                        line-height: 20rem/@baseFontSize;
                    }
                }
                .mui-card-footer{
                    display: block;
                    a{
                        display: block;
                        text-align: center;
                        border-radius: 5px;
                        height: 40rem/@baseFontSize;
                        line-height: 40rem/@baseFontSize;
                        font-size: 14rem/@baseFontSize;
                        &.pic{
                            color: #007aff;
                            margin-bottom: 10rem/@baseFontSize;
                            border: 1px solid #007aff;
                        }
                        &.pl{
                            color: #ff0000;
                            border: 1px solid #ff0000;
                        }
                    }
                }
            }
        }

    }
</style>