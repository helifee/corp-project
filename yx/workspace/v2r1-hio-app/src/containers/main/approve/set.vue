<template>
    <div class="set approve_wrap">
    </div>
</template>

<script>
    import config from '@/config/index.js'
    import mockData from '@MockData'
    export default{
        components: {
        },
        data(){
            return {

            }
        },
        methods:{
            test1:function(){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve({foo:'barrrrrrr'})
                    },100)
                })
            },
        }
    }
</script>

<style scoped lang="scss">
.set.approve_wrap{
}
</style>