<template>
    <div>
        <!--右侧弹窗查看纪要-->
        <right-slide-modal title="会议纪要" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button v-if="detailData.existUpdateButton=='1'" @click="operateEdit()" size="medium ">编辑</el-button></li>
                    <li><el-button @click="operateClose()" size="medium ">关闭</el-button></li>
                </ul>
            </div>
            <div class="meetingRecord">
                <el-form label-position="right" label-width="120px">
                    <el-form-item label="会议主题：">
                        <span class="title">{{detailData.mtTitle}}</span>
                    </el-form-item>
                    <el-form-item label="实际开始时间：">
                        <span >{{detailData.actualBeginDate}}</span>
                    </el-form-item>
                    <el-form-item label="召开地点：">
                        <span>{{detailData.actualBoardroomAddress}}</span>
                    </el-form-item>
                    <el-form-item label="要求参会成员：">
                        <el-tag class="tag" v-for="(item,index) in detailData.meetingAttendeesNameList" :key="index">{{item}}</el-tag>
                    </el-form-item>
                    <el-form-item label="实际参会成员：">
                        <el-tag class="tag" v-for="(item,index) in detailData.actualAttendeesNameList" :key="index">{{item}}</el-tag>
                    </el-form-item>
                    <el-form-item label="会议内容：">
                        {{detailData.meetingContent}}
                    </el-form-item>
                    <el-form-item label="会议记录：">
                        {{detailData.meetingRecord}}
                    </el-form-item>
                    <el-form-item label="会议决议：">
                        {{detailData.meetingResult}}
                    </el-form-item>
                    <el-form-item label="备注：">
                        {{detailData.remarks}}
                    </el-form-item>
                    <el-form-item label="附件：">
                        <attach-upload v-if="showAttachment" :appId="attachmentPK.appId" :readonly="true"
                                       :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
                    </el-form-item>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="记录人：">
                                <span>{{detailData.recorderName}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="记录时间：">
                                <span>{{detailData.createDate}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </right-slide-modal>
    </div>


</template>

<script>
    // import attachment from './components/attachment.vue'
    export default {
        name: "meeting-record",
        // components:{
        //     attachment,
        // },
        data(){
            return{
                detailData:{
                    mtTitle:"",
                    actualBeginDate:"",
                    actualBoardroomAddress:"",
                    meetingAttendeesNameList:[],
                    actualAttendeesNameList:[],
                    meetingContent:"",
                    meetingRecord:"",
                    meetingResult:"",
                    remarks:"",
                    // fileData:[{
                    //     url:"/images/myw3schoolimage.jpg",
                    //     fileName:"food2.jpeg",
                    //     size:"50M",
                    //     fileType:"jpg"
                    // }],
                    recorderName:"",
                    createDate:"",
                    existUpdateButton:""  //是否显示编辑按钮，1显示，0不显示
                },
                initData:"",
                showAttachment:false,
                attachmentPK:{
                    appId:"",
                    businessId:"",
                    categoryId:""
                },
            }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            meetingSummaryId:{
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
        mounted(){
            this.getMeetRecordById(this.meetingSummaryId);
        },
        methods:{
            operateClose(){
               this.$emit("closeCreateModal");
            },
            operateEdit(){
                this.$emit("editMeetingSummaryFun",this.initData);
            },
            async getMeetRecordById(summaryId){
                await JZY.xhr.request({type:'get',url:'/meeting/meetingSummary/get/'+summaryId},false,false).then((resultData)=>{
                    // console.log(JSON.stringify(resultData))
                    this.initData=JZY.u.copy(resultData[0]);
                    this.detailData.mtTitle=resultData[0].mtTitle;
                    this.detailData.actualBeginDate=resultData[0].actualBeginDate;
                    this.detailData.actualBoardroomAddress=resultData[0].actualBoardroomAddress;
                    this.detailData.meetingAttendeesNameList=resultData[0].meetingAttendeesNameList;
                    this.detailData.actualAttendeesNameList=resultData[0].actualAttendeesNameList;
                    this.detailData.meetingContent=resultData[0].meetingContent;
                    this.detailData.meetingRecord=resultData[0].meetingRecord;
                    this.detailData.meetingResult=resultData[0].meetingResult;
                    this.detailData.remarks=resultData[0].remarks;
                    this.detailData.recorderName=resultData[0].recorderName;
                    this.detailData.createDate=resultData[0].createDate;
                    this.detailData.existUpdateButton=resultData[0].existUpdateButton;
                    this.attachmentPK=resultData[0].accessoryIdDto;
                    this.showAttachment=true;
                }).catch((e)=>{
                    JZY.u.warningMsg(e)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .meetingRecord{
        .el-form .el-form-item{
            margin-bottom:0;
        }
        .attachment{
            width: 40%;
            display:inline-block;
        }
        .title{
            font-size: 14px;
            font-weight: 600;
        }
        .tag{
            color:#333333;
            border: 0;
            background: #ffff;
            margin-right: 5px;
        }
    }
    .operate_buttons {
        float: right;
    }
</style>