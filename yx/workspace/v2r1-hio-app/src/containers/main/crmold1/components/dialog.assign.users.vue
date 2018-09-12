<template>

    <right-slide-modal
            title="分配客户"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateSubmit()" size="medium ">确定分配</el-button>
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
            </ul>
        </div>
        <div class="record">

            <el-form  label-width="150px" :model="form">
                <el-form-item label="客户范围：">
                    <el-select v-model="form.value" placeholder="客户范围">
                        <el-option label="查询结果" value="shanghai"></el-option>
                        <el-option label="选中客户" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分配用户：">

                </el-form-item>
                <el-form-item label="分配方式：">
                    <p>系统根据您分配用户的数据将客户资料平均分配给用户</p>
                </el-form-item>
            </el-form>

        </div>
    </right-slide-modal>

</template>

<script>
    export default{
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            }
        },
        methods:{
//            关闭
            operateClose(){
                this.$emit("closeCreateModal");
            },
            operateSubmit(){

            }
        },
        data(){
            return {
                form:{
                    value:''
                }
            }
        },
        watch : {
        },
        mounted (){
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
    .record{
        line-height: 48px;
        color: #666666;
        span.label{
            display: inline-block;
            width: 120px;
            text-align: right;
            color: #333333;
        }
    }
</style>
