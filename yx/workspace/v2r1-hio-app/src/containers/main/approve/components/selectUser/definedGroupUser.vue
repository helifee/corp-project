<template>
    <div class="defined_group_user approve">
        <el-row :gutter="20">
            <el-col :span="14">
                自定义组demo
            </el-col>
        </el-row>
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
            tabToggle:(i, v)=>{
                this.active = i
                this.currentView = v
                console.info(i)
                console.info(v)
            },
        },
        mounted(){
          window.vue = this //chrome中console调试用，完事后可删除
        }
    }
</script>
<style scoped lang="scss">
.defined_group_user.approve{
  
  
}
</style>