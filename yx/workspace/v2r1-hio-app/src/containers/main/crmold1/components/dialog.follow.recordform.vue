<template>

    <right-slide-modal
            :title="title1"
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
                <el-form :inline="true" :model="form" class="demo-form-inline">
                    <el-form-item label="联系电话">
                        <el-input v-model="form.region" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮件" style="margin-left: 120px">
                        <el-input v-model="form.region" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="客户来源">
                        <el-input v-model="form.region" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="客户类型" style="margin-left: 120px">
                        <el-select v-model="form.region" placeholder="电子邮件">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系地址">
                        <el-input v-model="form.region" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="企业网址" style="margin-left: 120px">
                        <el-input v-model="form.region" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <p class="red">本次跟进目标：争取已36万签约。</p>
                    <h3>跟进记录</h3>
                    <hr>
                    <el-form-item label="联系人">
                        <el-select v-model="form.region" placeholder="电子邮件">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="联系方式" style="margin-left: 120px">
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

                    <el-form-item label="备注" style="margin-left: 120px">
                        <el-input type="textarea"></el-input>
                    </el-form-item>

                    <br>
                    <el-form-item label="附件">
                        <pl-upload></pl-upload>
                    </el-form-item>

                    <br>
                    <el-form-item label="下次跟近目标">
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
            recordId:{
                required:true
            },
            title1:{
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
                title:'',
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
</style>
