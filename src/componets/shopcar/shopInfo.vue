<template>
    <div class="shopInfo_container vue_container">
        <!--banner-->
        <div class="mui-card info_banner">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!--<mt-swipe :auto="2000">-->
                    <!--<mt-swipe-item v-for="item in banner" :key="item.id">-->
                    <!--<img :src="item.src" alt="" class="responsive_img">-->
                    <!--</mt-swipe-item>-->
                    <!--</mt-swipe>-->
                    <banner :banner="banner"></banner>
                </div>
            </div>
        </div>
        <!--购买参数-->
        <div class="mui-card info_data">
            <div class="mui-card-header">{{shopInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price"><span class="old_price">市场价：<del>{{shopDes.market_price}}</del></span>销售价：<span
                            class="now_price">{{shopInfo.sell_price}}</span></p>
                    <p>购买数量：</p>
                    <!--<p class="count mui-clearfix">
                        <mt-button type="default" class="pull-left" @click="removeCou">-</mt-button>
                        <input type="text" readonly class="pull-left" v-model="shopInfo.cou">
                        <mt-button type="default" class="pull-left" @click="addCou">+</mt-button>
                    </p>-->
                    <numBox :maxNum="shopDes.stock_quantity" :count="1" class="numBox" @getCount="getSelectorCount"></numBox>
                    <div class="btn_buy">
                        <mt-button type="primary">立即购买</mt-button>
                        <mt-button type="danger" @click="insertBall">加入购物车</mt-button>
                    </div>
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
        <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
        >
            <div v-show="isTrue" class="ball" @transitionend="end"></div>
        </transition>
    </div>
</template>

<script>
    import banner from '../common/swiper.vue'
    import numBox from '../common/numBox.vue'

    export default {
        name: "shopInfo",
        data() {
            return {
                banner: [],
                id: this.$route.params.id,
                shopInfo: {},
                shopList: [],
                shopDes: {},
                count: 1,
                isShow: true,
                isTrue: false
            }
        },
        created() {
            this.getBanner();
            this.getShopInfo();
            this.getShopList();
        },
        mounted() {
        },
        components: {
            banner,
            numBox
        },
        methods: {
            getBanner() {
                this.$axios.get('/api/getthumimages/' + this.id)
                    .then(result => {
                        if (result.data.status === 0) {
                            result.data.message.forEach(item => {
                                item.img = item.src
                            });
                            this.banner = result.data.message;
                        }
                    });
            },
            getShopInfo() {
                this.$axios.get('/api/goods/getshopcarlist/' + this.id)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.shopInfo = result.data.message[0];
                        }
                    })
            },
            getShopList() {
                for (let i = 1; i < 3; i++) {
                    this.$axios.get('/api/getgoods?pageindex=' + i)
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
            },
            getSelectorCount(cou) {
                this.count = cou;
            },
            beforeEnter(el) {
                if (!this.isShow){
                    el.style.transform = 'translate(0,0)';
                }
            },
            enter(el, done) {
                if (!this.isShow) {
                    el.offsetWidth;
                    el.style.transition = 'all 1s';
                    let ballObj = el.getBoundingClientRect();
                    let obj = document.querySelector('.mui-badge');
                    let rectObj = obj.getBoundingClientRect();
                    let x = rectObj.left - ballObj.left;
                    let y = rectObj.top - ballObj.top;
                    el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
                    done();
                }
            },
            afterEnter() {
                if (!this.isShow){
                    this.isTrue = !this.isTrue;
                }
            },
            end() {
                this.isShow = true;
                this.$store.commit('getCount');
            },
            insertBall(){
                if (this.isShow){
                    this.isTrue = !this.isTrue;
                    this.isShow = false;

                    let goodsList = {
                        id: this.id,
                        count : this.count,
                        selected:false,
                        price:this.shopInfo.sell_price
                    }

                    this.$store.commit('addToCar',goodsList);
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
    @baseFontSize: 100px;
    .shopInfo_container {
        .mui-card {
            font-size: 14rem/@baseFontSize;
            &.info_banner {
                .mui-card-content-inner {
                    padding: 15px 60px;
                }
            }
            &.info_data {
                .mui-card-header {
                    font-size: 17px;
                    line-height: 20px;
                    height: 40px;
                }
                p {
                    font-size: 12px;
                    &.price {
                        .old_price {
                            margin-right: 10rem/@baseFontSize;
                        }
                        .now_price {
                            color: #ff0000;
                            font-size: 14px;
                        }
                    }
                    &.count {
                        input {
                            width: 40rem/@baseFontSize;
                            height: 40rem/@baseFontSize;
                            padding: 0;
                            margin: 0;
                            text-align: center;
                            font-size: 12rem/@baseFontSize;
                        }
                        .mint-button {
                            width: 40rem/@baseFontSize;
                            height: 40rem/@baseFontSize;
                            margin: 0;
                        }
                    }
                }
                .btn_buy {
                    .mint-button {
                        height: 40px;
                        font-size: 14px;
                        &:first-child {
                            width: 96px;
                        }
                        &:last-child {
                            width: 116px;
                        }
                    }
                }
            }
            &.cs_data {
                .mui-card-header {
                    font-size: 17rem/@baseFontSize;
                }
                .mui-card-content {
                    p {
                        font-size: 14rem/@baseFontSize;
                        line-height: 20rem/@baseFontSize;
                    }
                }
                .mui-card-footer {
                    display: block;
                    a {
                        display: block;
                        text-align: center;
                        border-radius: 5px;
                        height: 40rem/@baseFontSize;
                        line-height: 40rem/@baseFontSize;
                        font-size: 14rem/@baseFontSize;
                        &.pic {
                            color: #007aff;
                            margin-bottom: 10rem/@baseFontSize;
                            border: 1px solid #007aff;
                        }
                        &.pl {
                            color: #ff0000;
                            border: 1px solid #ff0000;
                        }
                    }
                }
            }
        }
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #ff0000;
            position: absolute;
            top: 400px;
            left: 175px;
        }
    }
</style>