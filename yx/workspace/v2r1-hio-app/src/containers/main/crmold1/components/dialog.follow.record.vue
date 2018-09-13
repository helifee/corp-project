<template>

    <right-slide-modal
            title="跟进记录"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
            </ul>
        </div>
        <div class="record">
            {{recordId}}
            <div>
                <span class="label">客户名称：</span>XXXXXXX股份有限公司
            </div>
            <div>
                <span class="label">联系人：</span> 张三水
                <span class="label">联系电话：</span> 123242423535
                <span class="label">决策关系：</span> 采购决策人
            </div>
            <div>
                <span class="label">跟进内容：</span>
                预计在本月30号进行采购工作，需要提前准备产品说明
            </div>
            <div>
                <span class="label">创建人：</span>杨帆
                <span class="label">创建时间：</span>2017-12-23 12:30:59
            </div>
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
            recordId:{
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
//            关闭
            operateClose(){
                this.$emit("closeCreateModal");
            },

        },
        data(){
            return {
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
