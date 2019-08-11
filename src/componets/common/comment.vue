<template>
    <div class="cmt_container vue_container">
        <h3>发表评论</h3>
        <textarea name="" id="" cols="30" rows="10" maxlength="120" placeholder="请输入评论（最多120字）"
                  v-model="content"></textarea>
        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
        <div class="cmt_list">
            <div class="cmt_item" v-for="(item,index) in comments" :key="item.id">
                <div class="cmt_title">
                    第{{index+1}}楼 用户： {{item.user_name}} 发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt_content">
                    {{item.content}}
                </div>
            </div>
        </div>
        <mt-button plain class="cmt_more" size="large" @click="getComments">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "comment",
        data() {
            return {
                comments: [],
                pageIndex: 1,
                content: ''
            }
        },
        props: ['cmtid'],
        created() {
            this.getComments();
        },
        methods: {
            getComments() {
                this.$axios.get('/api/getcomments/' + this.cmtid + "?pageindex=" + (this.pageIndex++))
                    .then(result => {
                        if (result.data.status === 0) {
                            this.comments = this.comments.concat(result.data.message);
                        }
                    });
            },
            postComments() {
                if (this.content) {
                    this.$axios.post('/api/postcomment/' + this.cmtid, {
                        content: this.content
                    })
                        .then(result => {
                            if (result.data.status === 0) {
                                this.pageIndex = 0;
                                this.comments.unshift({
                                    user_name:"匿名用户",
                                    add_time:new Date(),
                                    content:this.content
                                })
                                this.comments.pop();
                                this.content='';
                                Toast({
                                    message: '发表成功',
                                    position: 'bottom',
                                });
                            }
                        })
                        .catch(result => {
                            console.log(result);
                        })
                } else {
                    Toast({
                        message: '内容不能为空',
                        position: 'bottom',
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @baseFontSize: 100px;
    .cmt_container {
        h3{
            font-size: 20rem/@baseFontSize;
            border-bottom: 1px solid #000000;
            padding: 10rem/@baseFontSize 0;
        }
        textarea {
            height: 120rem/@baseFontSize;
        }
        .cmt_list {
            margin-top: 5rem/@baseFontSize;
            .cmt_item {
                font-size: 12rem/@baseFontSize;
                line-height: 25rem/@baseFontSize;
                .cmt_title {
                    background-color: #CCCCCC;
                }
                .cmt_content {
                    text-indent: 2em;
                    padding: 5rem/@baseFontSize 0;
                }
            }
        }
        .cmt_more {
            border: 1px solid orange;
            color: orange;
        }
    }
</style>