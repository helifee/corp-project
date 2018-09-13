<template>

    <right-slide-modal
            title="创建订单"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateClose()" size="medium ">提交</el-button>
                <el-button @click="operateClose()" size="medium ">保存</el-button>
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
            </ul>
        </div>
        <div class="record">
            {{recordId}}
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="订单名称">
                    <el-input v-model="form.input" placeholder="订单名称"></el-input>
                </el-form-item>
                <el-form-item label="订单编号" >
                    <el-input v-model="form.input" placeholder="订单编号"></el-input>
                </el-form-item>
                <el-form-item label="客户名称">
                    <el-input v-model="form.input" placeholder="客户名称"></el-input>
                </el-form-item>
                <el-form-item label="销售商机">
                    <el-input v-model="form.input" placeholder="销售商机"></el-input>
                </el-form-item>
                <el-form-item label="产品总额">
                    <el-input v-model="form.input" placeholder="产品总额"></el-input>
                </el-form-item>
                <el-form-item label="折扣">
                    <el-input v-model="form.input" placeholder="折扣"></el-input>
                </el-form-item>
                <el-form-item label="签约金额">
                    <el-input v-model="form.input" placeholder="签约金额"></el-input>
                </el-form-item>
                <el-form-item label="签约日期">
                    <el-input v-model="form.input" placeholder="签约日期"></el-input>
                </el-form-item>
                <el-form-item label="开始日期">
                    <el-input v-model="form.input" placeholder="开始日期"></el-input>
                </el-form-item>
                <el-form-item label="结束日期">
                    <el-input v-model="form.input" placeholder="结束日期"></el-input>
                </el-form-item>
                <el-form-item label="我方负责人">
                    <el-input v-model="form.input" placeholder="我方负责人"></el-input>
                </el-form-item>
                <el-form-item label="客户签约人">
                    <el-input v-model="form.input" placeholder="客户签约人"></el-input>
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-select v-model="form.region" placeholder="支付方式">
                        <el-option label="支票" value="1"></el-option>
                        <el-option label="汇款" value="2"></el-option>
                        <el-option label="现金" value="3"></el-option>
                        <el-option label="刷卡" value="3"></el-option>
                        <el-option label="支付宝" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同类型">
                    <el-select v-model="form.region" placeholder="合同类型">
                        <el-option label="直销合同" value="1"></el-option>
                        <el-option label="代理合同" value="2"></el-option>
                        <el-option label="采购合同" value="3"></el-option>
                        <el-option label="服务合同" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="合同">
                    <pl-upload></pl-upload>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="附件">
                    <pl-upload></pl-upload>
                </el-form-item>
                <hr>
                <h3>产品信息</h3>
                <el-form-item label="">
                    <el-button>提交</el-button>
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
                form:{
                    input:''
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
