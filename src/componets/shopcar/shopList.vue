<template>
    <div class="shopList_container vue_container">
        <router-link class="list_item" v-for="item in shopList" :key="item.id" :to="'/home/shopInfo/'+item.id">
            <div class="item_title">
                <img :src="item.img_url" class="responsive_img">
                <h3>{{item.title}}</h3>
            </div>
            <div class="item_price">
                <p class="price">
                    <span class="now_price">￥{{item.sell_price}}</span>
                    <span class="old_price"><del>￥{{item.market_price}}</del></span>
                </p>
                <p class="last">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link>
        <mt-button v-if="flag" type="danger" size="large" @click="getShopList">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        name: "shopList",
        data(){
            return {
                shopList:[],
                pageIndex:1,
                testList:[],
                flag:true
            }
        },
        created(){
            this.getShopList();
        },
        methods:{
            getShopList(){
                this.$axios.get('/api/getgoods?pageindex='+this.pageIndex++)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.shopList = this.shopList.concat(result.data.message);
                            this.$axios.get('/api/getgoods?pageindex='+(this.pageIndex))
                                .then(result => {
                                    if (result.data.status === 0) {
                                        this.testList = result.data.message;
                                        if (!this.testList.length) this.flag=false;
                                    }
                                })
                        }
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    @baseFontSize:100px;
    .shopList_container{
        .list_item{
            width: 48%;
            margin: 0 1% 10rem/@baseFontSize;
            float: left;
            border: 1px solid #eeeeee;
            padding: 3px;
            .item_title{
                h3{
                    font-size: 14rem/@baseFontSize;
                    height: 56rem/@baseFontSize;
                    color: #000;
                }
            }
            .item_price{
                background-color: #eeeeee;
                padding: 1px;
                p{
                    font-size: 12rem/@baseFontSize;
                    .now_price{
                        color: #ff0000;
                        font-weight: bold;
                        margin-right: 15rem/@baseFontSize;
                        font-size: 20rem/@baseFontSize;
                    }
                    &.price{
                        padding: 10rem/@baseFontSize 0;
                    }
                    &.last{
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
        }
    }
</style>