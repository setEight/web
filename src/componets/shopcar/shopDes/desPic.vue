<template>
    <div class="pic_container vue_container">
        <div class="pic_title">
            <h3>{{des.title}}</h3>
        </div>
        <div class="pic_content" v-html="des.content">
        </div>
    </div>
</template>

<script>
    export default {
        name: "desPic",
        data(){
            return {
                des:{},
                id: this.$route.params.id
            }
        },
        created(){
            this.getPic()
        },
        methods:{
            getPic(){
                this.$axios.get('/api/goods/getdesc/'+this.id)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.des = result.data.message[0];
                        }
                    });
            }
        }
    }
</script>

<style lang="less" scoped>
    @baseFontSize:100px;
    .pic_container{
        .pic_title{
            height: 50rem/@baseFontSize;
            border-bottom: 1px solid #CCCCCC;
            h3{
                font-size: 16rem/@baseFontSize;
                color: #007aff;
                text-align: center;
            }
        }
    }
</style>