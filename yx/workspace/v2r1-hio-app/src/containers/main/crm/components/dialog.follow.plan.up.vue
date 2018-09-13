<template>
<div>
    <right-slide-modal
            title="跟进计划"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul style="margin-top:7px;">
                <!-- <el-button @click="operateSubmit()" size="medium ">确定分配</el-button> -->
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
            </ul>
        </div>
        <div class="record">
            <el-form  label-width="150px">
                <el-form-item label="联系人：">
                    <span style="display：inline-block; margin-top:0px;">{{editData.contactName}}</span>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <span style="display：inline-block; margin-top:0px;">{{editData.contactWay}}</span>
                </el-form-item>
                <el-form-item label="跟进目标：">
                    <span style="display：inline-block; margin-top:0px;">{{editData.target}}</span>
                </el-form-item>
                <el-form-item label="计划时间：">
                    <span style="display：inline-block; margin-top:0px;">{{editData.contactTime}}</span>
                </el-form-item>
                <el-form-item label="商机：">
                    <span style="display：inline-block; margin-top:0px;">{{editData.opportunityName}}</span>
                </el-form-item>
            </el-form>

        </div>
    </right-slide-modal>
</div>
</template>

<script>

    export default{
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            }
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
            dest(data){
                console.log(data);
                if(data.contactWay=="0"){
                    data.contactWay="电话";
                }else if(data.contactWay=="1"){
                    data.contactWay="邮件";
                }else if(data.contactWay=="2"){
                    data.contactWay="短信";
                }else if(data.contactWay=="3"){
                    data.contactWay="上门拜访";
                }else if(data.contactWay=="4"){
                    data.contactWay="会务";
                }
                this.editData=data
            },
            
            //关闭
            operateClose(){
                this.$emit("closeCreateModal");
            },
        },
        data(){
            return {
                editData:{}
            }
        },
        watch:{
        },
        mounted(){
           
        },
        created(){

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
        .el-form .el-form-item{margin-bottom: 0px;}
    }
</style>
