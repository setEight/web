<template>
    <div class="app_container vue_container">
        <!--header-->
        <mt-header fixed title="seiEight">
            <a slot="left" @click="getBack" v-if="flag">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>

        <!--router-view-->
        <transition>
            <router-view></router-view>
        </transition>

        <!--tabbar-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="my-mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="my-mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="my-mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="my-mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
            return {
                link: this.$route.path,
                flag:false
            }
        },
        methods:{
            getBack(){
                history.back();
            },
            getPath(){
                if (this.$route.path === '/home') {
                    this.flag = false;
                }else{
                    this.flag = true;
                }
            }
        },
        watch:{
            $route:'getPath'
        }
    }
</script>

<style lang="less" scoped>
    @baseFontSize: 100px;
    .app_container{
        padding-top: 40px;
        padding-bottom: 50px;
        header{
            z-index: 99;
        }
        .mui-bar-tab{
            .my-mui-tab-item {
                display: table-cell;

                width: 1%;
                height: 50px;

                text-align: center;
                vertical-align: middle;
                white-space: nowrap;
                text-overflow: ellipsis;

                color: #929292;
                .mui-icon {
                    top: 3px;
                    font-size: 20px;
                    width: 24px;
                    height: 24px;
                    padding-top: 0;
                    padding-bottom: 0;
                    ~ .mui-tab-label
                    {
                        font-size: 11px;

                        display: block;

                        text-overflow: ellipsis;
                    }
                    &:active {
                        background: none;
                    }
                }
                &.mui-active {
                    color: #007aff;
                }
            }
        }
    }
    .v-enter{
        transform: translateX(100%);
    }
    .v-leave-to{
        position: absolute;
        transform: translateX(-100%);
    }

    .v-enter-active,
    .v-leave-active{
        transition: all 1s;
    }
</style>