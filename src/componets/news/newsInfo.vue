<template>
    <div class="newsInfo_container vue_container">
        <h3>{{newsInfo.title}}</h3>
        <p class="count">
            <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
            <span>点击次数：{{newsInfo.click}}次</span>
        </p>
        <div v-html="newsInfo.content" class="content"></div>
        <comment :cmtid="id"></comment>
    </div>
</template>

<script>
    import comment from '../common/comment.vue'
    export default {
        name: "newsInfo",
        data() {
            return {
                id: this.$route.params.id,
                newsInfo: {}
            }
        },
        created() {
            this.getNewsInfo();
        },
        components:{
            comment
        },
        methods: {
            getNewsInfo() {
                this.$axios.get('/api/getnew/' + this.id)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.newsInfo = result.data.message[0];
                        }
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    @baseFontSize: 100px;

    .newsInfo_container{
        >h3 {
            text-align: center;
            color: #ff0000;
        }
        p.count {
            font-size: 12rem/@baseFontSize;
            display: flex;
            justify-content: space-between;
            color: #007aff;
        }
        .content{
            text-indent: 2em;
        }
    }
</style>