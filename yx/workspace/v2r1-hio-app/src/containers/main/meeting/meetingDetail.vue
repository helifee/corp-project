<template>
    <div class="meetingDetail">
        <div class="btnGroups">
            <el-button size="medium " v-if="detailData.meetingOperateType=='1' || detailData.meetingOperateType=='0'"
                       @click="handlerDetailEdit">编辑</el-button>
            <el-button size="medium " v-if="detailData.meetingOperateType=='1' || detailData.meetingOperateType=='0'"
                       @click="handleDetailDel">删除</el-button>
            <el-button size="medium " v-if="detailData.meetingOperateType=='1'" @click="handleCommite">提交</el-button>
            <el-button size="medium " v-if="detailData.haveMeetingSummary=='2'" @click="handleWriteSummary">填写会议纪要</el-button>
            <el-button size="medium " v-if="detailData.haveMeetingSummary=='1'" @click="handleLookSummary">查看会议纪要</el-button>
            <el-button size="medium " v-if="detailData.existMeetingOver=='1'" @click="handleMeetingOver">会议结束</el-button>
            <el-button size="medium " @click="handlerBack">返回</el-button>
        </div>
        <div class="content">
            <div class="title">
                <span class="titleName" :title="detailData.mtTitle">{{detailData.mtTitle}}</span>
                <span>{{meetingsatename(detailData.statusName)}}</span>
            </div>
            <el-form label-position="right" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="开会时间：">
                            <span>{{detailData.beginDate}}~ {{detailData.endDate}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="组织部门：">
                            <span>{{detailData.organDepartName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="召开地点：">
                            <span>{{detailData.boardroomAddress}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="主持人：">
                            <span>{{detailData.emceeName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="会议组织人：">
                            <span>{{detailData.meetingOrganizationName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="纪要记录人：">
                            <span>{{detailData.recorderName}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="参会人员：">
                    <el-tag class="tag" v-for="(item,index) in detailData.meetingAttendeesNameList" :key="index">{{item}}</el-tag>
                </el-form-item>
                <el-form-item label="抄送人员：">
                    <el-tag class="tag" v-for="(item,index) in detailData.meetingCopySendNameList" :key="index">{{item}}</el-tag>
                </el-form-item>
                <el-form-item label="会议目标：">
                    {{detailData.meetingTarget}}
                </el-form-item>
                <el-form-item label="输出文档：">
                    {{detailData.meetingOutputDoc}}
                </el-form-item>
                <el-form-item label="后续活动：">
                    {{detailData.meetingFollowActivity}}
                </el-form-item>
                <el-form-item label="备注：">
                    {{detailData.remarks}}
                </el-form-item>
                <el-form-item label="附件：">
                    <attach-upload v-if="showAttachment" :appId="attachmentPK.appId" :readonly="true" ref="meetingDetailAttach"
                                   :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="创建人：">
                            <span>{{detailData.createPersonName}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="创建时间：">
                            <span>{{detailData.createDate}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="discussItem">
                <h1 class="yc">会议议程</h1>
                <el-table  :data="detailData.meetingAgendaList"  :header-cell-class-name="tableHeaderCell" class="ycTable">
                    <el-table-column type="index" label="序号"  width="100"></el-table-column>
                    <el-table-column prop="date"  label="时间"  width="500">
                        <template slot-scope="scope">
                            <span>{{scope.row.meetingBeginDate}}~ {{scope.row.meetingEndDate}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="meetingAgenda" label="会议议程"  min-width="400" ></el-table-column>
                </el-table>
            </div>
        </div>
        <!--右侧弹窗创建会议-->
        <meetingDetialEditDialog :dialogVisible="meetingDialogVisible" v-if="meetingDialogVisible" :meetingData="meetingData"
                          @successBackFun="successBackFun"     @closeCreateModal="closeMeetingDialog"></meetingDetialEditDialog>
        <!--右侧弹窗查看纪要-->
        <meetingRecord :dialogVisible="viewRecordDiaVisible" v-if="viewRecordDiaVisible" :meetingSummaryId="meetingSummaryId"
                       @closeCreateModal="closeViewRecordDialog" @editMeetingSummaryFun="editMeetingSummaryFun"></meetingRecord>
        <!--右侧弹窗填写纪要-->
        <meetingRecordEdit :dialogVisible="writeRecordDiaVisible" :meetingId="meetingId" :meetingSummaryData="meetingSummaryData"
                           v-if="writeRecordDiaVisible"
                           @closeCreateModal="closeWriteRecordDialog" @successBackFun="successBackFun"></meetingRecordEdit>
    </div>
</template>

<script>
    import attachment from './components/attachment.vue'
    import meetingDetialEditDialog from './meetingDetailEditDialog.vue'
    import meetingRecord from './meetingRecord.vue'
    import meetingRecordEdit from './meetingRecordEdit.vue'
    export default {
        name: "meeting-detail",
        components:{
            attachment,
            meetingDetialEditDialog,
            meetingRecord,
            meetingRecordEdit
        },
        data(){
            return{
                detailData:{
                    mtTitle:"",
                    statusName:"",
                    beginDate:"",
                    endDate:"",
                    organDepartName:"",
                    boardroomAddress:"",
                    emceeName:"",   //主持人
                    meetingOrganizationName:"",
                    recorderName:"",
                    meetingAttendeesNameList:[],
                    meetingCopySendNameList:[],
                    meetingTarget:"",
                    meetingOutputDoc:"",
                    meetingFollowActivity:"",
                    remarks:"",
                    createPersonName:"",
                    createDate:"",
                    meetingAgendaList:[],
                    existMeetingOver:"0",  //1显示会议结束  0不显示会议结束
                    meetingOperateType:"",    //1：编辑+删除+提交+返回 0：编辑+删除+返回
                    haveMeetingSummary:"0",    //0什么也不显示 1查看会议纪要 2编辑会议纪要
                    // meetingAgendaList:[{
                    //     meetingBeginDate:"",
                    //     meetingEndDate:"",
                    //     meetingAgenda:""
                    // }]
                },
                meetingDialogVisible:false,
                meetingData:"",
                viewRecordDiaVisible:false,
                meetingSummaryId:"",
                writeRecordDiaVisible:false,
                meetingId:"",
                meetingSummaryData:"",
                showAttachment:false,
                attachmentPK:{
                    appId:"",
                    businessId:"",
                    categoryId:""
                },
            }
        },
        mounted(){
           this.getMeetDetailById(this.$route.params.id);
        },
        methods:{
            tableHeaderCell(){
                return "tableHeaderCell"
            },
            handlerDetailEdit(){
                // this.$router.push("/meeting/detailEdit/"+this.$route.params.id)
                this.meetingDialogVisible=true;
            },
            handleDetailDel(){
                this.$confirm('此操作将删除当前会议信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delMeetingById(this.$route.params.id);
                }).catch(() => {
                });

            },
            handleCommite(){
                //status:0草稿 1会议中 2未开始 3已结束
                this.updateMeetingStateById(this.$route.params.id,{
                    status:"2"
                })
            },
            handleWriteSummary(){
                this.meetingId=this.detailData.sid;
                this.writeRecordDiaVisible=true;
            },
            closeWriteRecordDialog(){
                this.writeRecordDiaVisible=false;
            },
            handleLookSummary(){
                this.meetingSummaryId=this.detailData.meetingSummaryId;
                this.viewRecordDiaVisible=true;
            },
            closeViewRecordDialog(){
               this.viewRecordDiaVisible=false;
            },
            editMeetingSummaryFun(meetingSummaryData){
                this.viewRecordDiaVisible=false;
                this.meetingId="";
                this.meetingSummaryData=meetingSummaryData;
                this.writeRecordDiaVisible=true;
            },
            handleMeetingOver(){
                //status:0草稿 1会议中 2未开始 3已结束
                this.updateMeetingStateById(this.$route.params.id,{
                    status:"3"
                })
            },
            handlerBack(){
                this.$router.push("/meeting/management")
            },
            closeMeetingDialog(){
                this.meetingDialogVisible=false
            },
            meetingsatename(val){
                switch(val){
                    case "0":return "草稿";
                    case "1":return "会议中";
                    case "2":return "未开始";
                    case "3":return "已结束";
                }
            },
            successBackFun(){
                this.getMeetDetailById(this.$route.params.id);
            },
            async delMeetingById(meetingId){
                await JZY.xhr.drop('/meeting/meetingInfo/delete/'+meetingId,{},{alertSuccess:true}).then((resultData)=>{
                    try{
                        this.$router.push("/meeting/management")
                    }catch (e){
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                })
            },
            async updateMeetingStateById(meetingId,pas){
                JZY.xhr.request({type:"PUT",url:"/meeting/meetingInfo/updateStatus/"+meetingId,data:pas}).then((resultData)=>{
                    try{
                        // this.$emit("successBackFun");
                        this.getMeetDetailById(meetingId);
                    }catch (e){
                        // this.btnDisabled=false;
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.btnDisabled=false;
                })
            },
            async getMeetDetailById(meetingId){
                await JZY.xhr.request({type:'get',url:'/meeting/meetingInfo/get/'+meetingId}).then((resultData)=>{
                    // console.log("getMeetDetailById:"+JSON.stringify(resultData))
                    this.meetingData=resultData[0];
                    this.detailData.sid=resultData[0].sid;
                    this.detailData.mtTitle=resultData[0].mtTitle;
                    this.detailData.statusName=resultData[0].statusName;
                    this.detailData.beginDate=resultData[0].beginDate;
                    this.detailData.endDate=resultData[0].endDate;
                    this.detailData.organDepartName=resultData[0].organDepartName;
                    //会议类型，1预定，0不是预定
                    // if(resultData[0].boardroomType=="0"){
                        this.detailData.boardroomAddress=resultData[0].boardroomAddressName;
                    // }else{
                    //     this.detailData.boardroomAddress=resultData[0].boardroomAddressName;
                    //     // this.detailData.boardroomAddress=resultData[0].boardroomAddressName;
                    // }
                    this.detailData.emceeName=resultData[0].emceeName;
                    this.detailData.meetingOrganizationName=resultData[0].meetingOrganizationName;
                    this.detailData.recorderName=resultData[0].recorderName;
                    this.detailData.meetingAttendeesNameList=resultData[0].meetingAttendeesNameList;  // 会议参会人员名字
                    //meetingAttendeesIDList;// 会议参会人员list
                    this.detailData.meetingCopySendNameList=resultData[0].meetingCopySendNameList;    //抄送人名字
                    //meetingCopySendUserIdList;// 抄送人id的list
                    this.detailData.meetingTarget=resultData[0].meetingTarget;
                    this.detailData.meetingOutputDoc=resultData[0].meetingOutputDoc;
                    this.detailData.meetingFollowActivity=resultData[0].meetingFollowActivity;
                    this.detailData.remarks=resultData[0].remarks;
                    this.detailData.createPersonName=resultData[0].createPersonName;
                    this.detailData.createDate=resultData[0].createDate;
                    this.detailData.meetingAgendaList=resultData[0].meetingAgendaList;// 会议议程表list
                    //meetingOperateType  1：编辑+删除+提交+返回 0：编辑+删除+返回
                    this.detailData.meetingOperateType=resultData[0].meetingOperateType;
                    this.detailData.existMeetingOver=resultData[0].existMeetingOver;
                    this.detailData.haveMeetingSummary=resultData[0].haveMeetingSummary;
                    this.detailData.meetingSummaryId=resultData[0].meetingSummaryId;
                    this.attachmentPK=resultData[0].accessoryIdDto;
                    this.showAttachment=true;
                    this.$refs.meetingDetailAttach.getFilesList();
                }).catch((e)=>{
                    // JZY.u.warningMsg(e)
                })
            }
        }
    }
</script>

<style  lang="scss">
.meetingDetail{
    position: relative;
    background: #fff;
    height: calc(100% - 60px);
    .el-form .el-form-item{
        margin-bottom:0;
    }
    .btnGroups{
        height: 56px;
        text-align:right;
        line-height: 56px;
        padding-right: 15px;
    }
    .content{
        position:absolute;
        height: calc( 100%  - 60px);
        overflow-y: auto;
        width: 100%;
        box-sizing:border-box;
        padding-left: 20px;
        .title{
            .titleName{
                font-size: 14px;
                margin-right: 10px;
                display: inline-block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                max-width: calc(100% - 200px);
                vertical-align: bottom;
            }
            margin: 0 0 20px 20px;
        }
        .tag{
            color:#333333;
            border: 0;
            background: #ffff;
            margin-right: 5px;
        }
        .attachment{
            width: 40%;
            display:inline-block;
        }
        .discussItem{
            border-top: 1px solid #ebeef5;
            margin: 20px;
            margin-bottom: 40px;
            .yc{
                font-size: 16px;
                margin: 20px 0 20px 0;
            }
            .ycTable{
                border: 1px solid #ebeef5;
                width: 100%;
            }
            .el-table {
                .tableHeaderCell {
                    color: #333333;
                    font-weight: 600;
                    background-color: rgba(250, 250, 250, 1);
                }
            }
        }
    }
}
</style>