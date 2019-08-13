<template>
    <div>
        <div :id="id" class="mui-numbox" data-numbox-step='1' data-numbox-min='1' :data-numbox-max='maxNum'>
            <button class="mui-btn mui-numbox-btn-minus" type="button" @click="getCount">-</button>
            <input class="mui-numbox-input" type="number" ref="number" v-model="num" @change="setCount"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button" @click="getCount">+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "numBox",
        data(){
            return {
                num:this.count
            }
        },
        props:['maxNum','count','id'],
        mounted(){
            mui('.mui-numbox').numbox();
        },
        methods:{
            getCount(){
                this.$emit('getCount',mui('.mui-numbox').numbox().getValue());
            },
            setCount(){
                if (mui('#'+this.id).numbox()){
                    this.$store.commit('getChangeCou',{id:this.id,count:parseInt(mui('#'+this.id).numbox().getValue())});
                }
            }
        },
        watch:{
            maxNum:function (newVal,oldVal) {
                mui('.mui-numbox').numbox().setOption('max',newVal);
            }
        }
    }
</script>

<style scoped>

</style>