<template>
    <div class="newsList_container vue_container">
        <ul class="mui-table-view">
            <li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h2>{{item.title}}</h2>
                        <p>
                            <span>发表时间：{{ item.add_time | dateFormat("YYYY-MM-DD")}}</span>
                            <span>点击次数：{{ item.click }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "newsList",
        data(){
            return {
                newsList:[]
            }
        },
        created(){
          this.getNewsList();
        },
        methods:{
            getNewsList(){
                this.$axios.get('/api/getnewslist')
                    .then(result => {
                        if (result.data.status === 0){
                            this.newsList = result.data.message;
                        }
                    });
            }
        }
    }
</script>

<style lang="less" scoped>
    @baseFontSize: 100px;

    .newsList_container{
        .mui-table-view-cell {
            position: relative;
            overflow: hidden;
            padding: 11rem/@baseFontSize 15rem/@baseFontSize;
            -webkit-touch-callout: none;
        }
        ul{
            li{
                a{
                    h2{
                        font-size: 14rem/@baseFontSize;
                    }
                    p{
                        font-size: 12rem/@baseFontSize;
                        display: flex;
                        justify-content: space-between;
                        color: #007aff;
                    }
                }
            }
        }
    }
</style>