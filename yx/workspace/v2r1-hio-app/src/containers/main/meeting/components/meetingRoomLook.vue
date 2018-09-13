<template>
    <div>
        <!--右侧弹窗查看会议时占用的会议室信息-->
        <right-slide-modal title="预订会议室" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <!--<el-button @click="operateCommit()" size="medium ">提交</el-button>-->
                    <!--<el-button @click="operateSave()" size="medium ">保存</el-button>-->
                    <li><el-button @click="operateClose()" size="medium ">关闭</el-button></li>
                </ul>
            </div>
            <div>
                <el-form label-position="right" label-width="120px">
                    <el-form-item label="预订主题：">
                        {{detailData.mtTitle}}
                    </el-form-item>
                    <el-form-item label="会议室名称：">
                        {{detailData.boardroomAddress}}
                    </el-form-item>
                    <el-form-item label="预订时间：">
                        <span>{{detailData.beginDate}}~ {{detailData.endDate}}</span>
                    </el-form-item>
                    <el-form-item label="使用人：">
                        <span>{{detailData.meetingOrganizationName}}</span>
                    </el-form-item>
                    <el-form-item label="备注：">
                        {{detailData.remarks}}
                    </el-form-item>
                </el-form>
            </div>
        </right-slide-modal>
    </div>
</template>

<script>
    export default {
        name: "meeting-room-look",
        data(){
            return{
                detailData:{
                    mtTitle:"",
                    boardroomAddress:"",
                    beginDate:"",
                    endDate:"",
                    meetingOrganizationName:"",
                    remarks:""
                }
            }
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            meetingId:{
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
          this.getMeetDetailById();
        },
        methods:{
            operateClose(){
                this.$emit("closeCreateModal");
            },
            async getMeetDetailById(){
                await JZY.xhr.request({type:'get',url:'/meeting/meetingInfo/get/'+this.meetingId}).then((resultData)=>{
                    this.detailData.mtTitle=resultData[0].mtTitle;
                    // this.detailData.statusName=resultData[0].statusName;
                    this.detailData.beginDate=resultData[0].beginDate;
                    this.detailData.endDate=resultData[0].endDate;
                    // this.detailData.organDepartName=resultData[0].organDepartName;
                    //会议类型，1预定，0不是预定
                    if(resultData[0].boardroomType=="0"){
                        this.detailData.boardroomAddress=resultData[0].boardroomAddress;
                    }else{
                        this.detailData.boardroomAddress=resultData[0].boardroomAddressName;
                        // this.detailData.boardroomAddress=resultData[0].boardroomAddressName;
                    }
                    // this.detailData.emceeName=resultData[0].emceeName;
                    // this.detailData.meetingOrganizationName=resultData[0].meetingOrganizationName;
                    // this.detailData.recorderName=resultData[0].recorderName;
                    // this.detailData.meetingAttendeesNameList=resultData[0].meetingAttendeesNameList;  // 会议参会人员名字
                    // //meetingAttendeesIDList;// 会议参会人员list
                    // this.detailData.meetingCopySendNameList=resultData[0].meetingCopySendNameList;    //抄送人名字
                    // //meetingCopySendUserIdList;// 抄送人id的list
                    // this.detailData.meetingTarget=resultData[0].meetingTarget;
                    // this.detailData.meetingOutputDoc=resultData[0].meetingOutputDoc;
                    // this.detailData.meetingFollowActivity=resultData[0].meetingFollowActivity;
                    this.detailData.remarks=resultData[0].remarks;
                    this.detailData.meetingOrganizationName=resultData[0].meetingOrganizationName;
                    // this.detailData.createDate=resultData[0].createDate;
                    // this.detailData.meetingAgendaList=resultData[0].meetingAgendaList;// 会议议程表list
                    // //meetingOperateType  1：编辑+删除+提交+返回 0：编辑+删除+返回
                    // this.detailData.meetingOperateType=resultData[0].meetingOperateType;
                    // this.detailData.existMeetingOver=resultData[0].existMeetingOver;
                    // this.detailData.haveMeetingSummary=resultData[0].haveMeetingSummary;
                    // JZY.u.successMsg('操作成功')
                }).catch((e)=>{
                    // JZY.u.warningMsg(e)
                })
            }
        }
    }
</script>

<style scoped>
    .operate_buttons {
        float: right;
    }
</style>