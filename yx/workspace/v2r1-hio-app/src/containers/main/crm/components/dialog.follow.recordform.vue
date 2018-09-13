<template>

    <right-slide-modal
            :title="title"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li>
                    <el-dropdown>
                        <el-button type="primary">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>创建商机</el-dropdown-item>
                            <el-dropdown-item>创建订单</el-dropdown-item>
                            <el-dropdown-item>标记重点</el-dropdown-item>
                            <el-dropdown-item>标记失败</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </li>
                <li>
                    <el-button @click="operateClose()" size="medium ">关闭</el-button>
                </li>
            </ul>
        </div>
        <div class="record">
            <div class="record-left">
                <el-row :gutter="10">
                    <el-col :span="4">
                        <div class="grid-content">联系电话</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">客户类型：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">联系地址</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">企业网站：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">联系地址</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">企业网站：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content"></div>
                    </el-col>
                </el-row>
                <hr>
                <h2 style="font-size:14px; padding-left:20px; line-height:40px; background:#dedede; font-weight:normal">跟进记录</h2>

                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="联系人">
                        <el-select v-model="form.region" placeholder="电子邮件">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="联系方式" >
                        <el-select v-model="form.region" placeholder="电子邮件">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="选择商机">
                        <el-select v-model="form.region" placeholder="电子邮件">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <br>
                    <el-form-item label="跟进内容" >
                        <el-input type="textarea" style="width:100%"></el-input>
                    </el-form-item>
                    <br>
                    <el-form-item label="附件">
                        <pl-upload></pl-upload>
                    </el-form-item>
                </el-form>
                <h2 style="font-size:14px;padding-left:20px;line-height:40px; background:#dedede; font-weight:normal">跟进计划</h2>
                <el-form>
                    <el-form-item label="下次跟进目标">
                        <el-input v-model="form.region" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="下次联系时间">
                        <el-date-picker
                                v-model="form.region"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button>提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="record-right">
                <timeline>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。预约2015年4月30日       15：00：00

                            到访参观。预约2015年4月30日       15：00：00

                            到访参观。预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。
                        </div>
                    </timeline-title>
                    <timeline-title color="#9dd8e0">
                        <div class="detail">
                            015年4月23日   15：30：58<br/>


                            电话联系      操作人：张晓丽  <br/>

                            预约2015年4月30日       15：00：00

                            到访参观。 
                        </div>
                    </timeline-title>
                    <!--<timeline-item color="#9dd8e0">继续设计</timeline-item>-->
                </timeline>
            </div>
        </div>
    </right-slide-modal>

</template>

<script>
    import timeline from '@Main/plan/components/timeline'
    import timelineItem from '@Main/plan/components/timelineItem'
    import timelineTitle from '@Main/plan/components/timelineTitle'
    import ElButton from "../../../../plugins/element-ui/packages/button/src/button";
    import ElInput from "../../../../plugins/element-ui/packages/input/src/input";
    export default{
        components:{
            ElInput,
            ElButton,
            timeline,
            timelineItem,
            timelineTitle
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            // recordId:{
            //     required:true
            // },
            title:{
                type:String,
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
                    region:''
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
        li{
            float: left;
            margin-right: 12px;
        }
    }
    .record{
        line-height: 48px;
        color: #666666;
        position: relative;
        span.label{
            display: inline-block;
            width: 120px;
            text-align: right;
            color: #333333;
        }
        .record-left{
            float: left;
            width: 750px;
        }
        .record-right{
            float: right;
            width: 260px;
        }
    }
    .timeline-title{
        .detail{
            line-height: 24px;
        }
    }
    .el-input--suffix .el-input__inner{
        width:120px;
    }
    .el-textarea__inner{ width:400px}
    
</style>

