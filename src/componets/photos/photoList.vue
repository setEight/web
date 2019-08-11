<template>
    <div class="photoList_container vue_container">
        <!--顶部滑动-->
        <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl"
                 class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <div class="mui-scroll">
                    <a v-for="item in cates" :key="item.id" @click="getPhotoList(item.id)" :class="{'cate_list':'true','active':item.id === cateId? true : false}" href="#">
                        {{item.title}}
                    </a>
                </div>
            </div>
            <div class="photoList">
                <div class="list_item" v-for="item in photoList" :key="item.id">
                    <router-link :to="'/home/photoInfo/'+item.id">
                        <img v-lazy="item.img_url" alt=""
                             class="responsive_img">
                        <div class="item_title">
                            <h3>{{item.title}}</h3>
                            <p>{{item.zhaiyao}}</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'

    export default {
        name: "photoList",
        data() {
            return {
                cates: [],
                photoList: [],
                cateId:0
            }
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll();
        },
        created() {
            this.getCategory();
            this.getPhotoList(0);
        },
        methods: {
            getCategory() {
                this.$axios.get('/api/getimgcategory')
                    .then(result => {
                        if (result.data.status === 0) {
                            result.data.message.unshift({title: '全部', id: 0});
                            this.cates = result.data.message;
                        }
                    });
            },
            getPhotoList(cateId) {
                this.cateId = cateId;
                this.$axios.get('/api/getimages/' + cateId)
                    .then(result => {
                        if (result.data.status === 0) {
                            this.photoList = result.data.message;
                        }
                    });
            }
        }
    }


</script>

<style lang="less" scoped>
    @baseFontSize:100px;
    .photoList_container {
        .mui-scroll {
            a {
                color: #000;
                line-height: 40rem/@baseFontSize;
                padding: 0 15rem/@baseFontSize;
                &.active{
                    color: #007aff;
                }
            }
        }
        .photoList {
            width: 96%;
            margin: 0 auto;
            .list_item {
                position: relative;
                margin-top: 10rem/@baseFontSize;
                box-shadow: 1px -1px 10px 1px rgba(0, 0, 0, 0.3);
                img {
                    display: block;
                }
                img[lazy=loading] {
                    width: 40rem/@baseFontSize;
                    height: 300rem/@baseFontSize;
                    margin: auto;
                }
                .item_title {
                    position: absolute;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    width: 100%;
                    h3 {
                        color: #FFFFFF;
                        font-size: 12rem/@baseFontSize;
                    }
                    p {
                        margin-bottom: 0;
                        color: #FFFFFF;
                        font-size: 12rem/@baseFontSize;
                        line-height: 12rem/@baseFontSize;
                    }
                }
            }
        }
    }
</style>