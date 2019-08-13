<template>
    <div>
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="item in banner" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "swiper",
        data(){
            return{

            }
        },
        props:['banner']
    }
</script>

<style scoped>

</style>