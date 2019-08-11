<template>
    <div class="photoInfo_container vue_container">
        <div class="photoInfo_title">
            <h3>{{photoInfo.title}}</h3>
            <p>
                <span>发表时间：{{photoInfo.add_time | dateFormat('YYYY-MM-DD')}}</span>
                <span>点击次数：{{photoInfo.click}}</span>
            </p>
        </div>
        <div class="image_list">
            <vue-preview :slides="imgList" @close="handleClose"></vue-preview>
        </div>
        <div class="photoInfo_content" v-html="photoInfo.content"></div>
        <comment :cmtid="id"></comment>
    </div>
</template>

<script>
    import comment from '../common/comment.vue'
    export default {
        name: "photoInfo",
        data(){
            return {
                id: this.$route.params.id,
                photoInfo:{},
                imgList:[]
            }
        },
        created(){
            this.getPhotoInfo();
            this.getImgList();
        },
        components:{
            comment
        },
        methods:{
            getPhotoInfo(){
                this.$axios.get('/api/getimageInfo/'+this.id)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.photoInfo = result.data.message[0];
                        }
                    })
            },
            getImgList(){
                this.$axios.get('/api/getthumimages/'+this.id)
                    .then(result => {
                        if (result.data.status === 0) {
                            result.data.message.forEach(item => {
                                item.msrc = item.src;
                                item.w = 600;
                                item.h = 400
                            });
                            this.imgList = result.data.message;
                        }
                    })
            },
            handleClose () {
                console.log('close event')
            }
        }
    }
</script>

<style lang="less" scoped>
    @baseFontSize:100px;
    .photoInfo_container{
        .photoInfo_title{
            border-bottom: 1px solid #000000;
            h3{
                padding: 0 10rem/@baseFontSize;
                color: #007aff;
                text-align: center;
                font-size: 16rem/@baseFontSize;
            }
            p{
                display: flex;
                justify-content: space-between;
            }
        }
        .photoInfo_content{
            line-height: 25rem/@baseFontSize;
            font-size: 12rem/@baseFontSize;
        }
    }
</style>