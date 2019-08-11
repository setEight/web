<template>
    <div>
        <comment :cmtid="id"></comment>
    </div>
</template>

<script>
    import comment from '../../common/comment.vue'
    export default {
        name: "desMsg",
        data(){
            return {
                id: this.$route.params.id
            }
        },
        components:{
            comment
        }
    }
</script>

<style scoped>

</style>