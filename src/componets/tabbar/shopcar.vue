<template>
    <div class="shopcar_container">
        <div class="mui-card shop_list" v-for="(item,index) in list">
            <div class="mui-card-content">
                <div class="mui-card-content-inner mui-clearfix">
                    <mt-switch v-model="$store.getters.getSelect[item.id]" @change="changeSelect({id:item.id,statu:$store.getters.getSelect[item.id]})"></mt-switch>
                    <div class="img">
                        <img :src="item.thumb_path" alt="" class="responsive_img">
                    </div>
                    <div class="content">
                        <h2>{{item.title}}</h2>
                        <p>
                            <span class="price">￥{{item.sell_price}}</span>
                            <numBox :maxNum="60" :id="item.id" :count="$store.getters.getIdCou[item.id]" class="numBox" @getCount="getSelectorCount"></numBox>
                            <span class="del" @click="remove(index,item.id)">删除</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--结算-->
        <div class="mui-card money" >
            <div class="mui-card-content">
                <div class="mui-card-content-inner mui-clearfix">
                    <p>总计（不含运费）</p>
                    <p>已勾选商品  <span>{{$store.getters.getMoney.count}}</span> 件，总价 <span>&yen;{{$store.getters.getMoney.money}}</span></p>
                    <mt-button class="over" type="danger">去结算</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numBox from '../common/numBox.vue'
    export default {
        name: "shopcar",
        data(){
            return {
                count:0,
                list:[]
            }
        },
        created(){
          this.getList();
        },
        components:{
          numBox
        },
        methods:{
            getSelectorCount(cou) {
                this.count = cou;
            },
            getList(){
                let arr = [];
                this.$store.state.car.forEach(item => {
                    arr.push(item.id);
                });
                this.$axios.get('/api/goods/getshopcarlist/'+arr.join(','))
                    .then(result => {
                        if (result.data.status === 0){
                            this.list = result.data.message;
                        }
                    })
            },
            remove(index,id){
                this.list.splice(index,1);
                this.$store.commit('getDel',id);
            },
            changeSelect(obj){
                this.$store.commit('getStatus',obj);
            }
        }
    }
</script>

<style lang="less" scoped>
    @baseFontSize:100px;
    .shopcar_container{
        .shop_list{
            .mui-card-content-inner{
                padding-right: 0;
                >div{
                    float: left;
                    &.img{
                        width:57px;
                        margin-top: 5px;
                        margin-right: 1%;
                    }
                    &.content{
                        width: 60%;
                        h2{
                            font-size: 16px;
                        }
                        p{
                            font-size: 12px;
                            line-height: 24px;
                            span{
                                float: left;
                                &.price{
                                    color: #ff0000;
                                }
                                &.del{
                                    color: #007aff;
                                }
                            }
                        }
                    }
                }
                .mint-switch{
                    float: left;
                    margin-top: 20px;
                }
            }

        }
        .money{
            p{
                span{
                    font-weight: bold;
                    color: #ff0000;
                }
            }
            button{
                position: absolute;
                right: 10px;
                top:20px;
            }
        }
    }
</style>