<template>
    <div>
        <!--右侧弹窗填写纪要-->
        <right-slide-modal :title="title" :visible.sync="propsDialogVisible" :showClose="false">
            <div slot="operateButtons" class="operate_buttons">
                <ul>
                    <li><el-button :disabled="btnDisabled" @click="operateSave()" >保存</el-button></li>
                    <li><el-button @click="operateClose()" >关闭</el-button></li>
                </ul>
            </div>
            <div class="meetingRecordEdit">
                <el-form label-position="right" label-width="130px" :model="detailData" :rules="rules" ref="refForm">
                    <el-form-item label="会议主题：" prop="title" >
                        <span class="title">{{detailData.mtTitle}}</span>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="实际开始时间：" prop="realStartTime">
                                <el-date-picker  v-model="detailData.realStartTime"  type="datetime" style="width:100%"
                                                 placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="计划开始时间：">
                                <span>{{detailData.planTime}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="实际召开地点：" prop="realPlace">
                                <el-input v-model="detailData.realPlace" placeholder="输入实际召开地点" maxlength="101"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="计划召开地点：">
                                <span class="planPlaceCss" :title="detailData.planPlace">{{detailData.planPlace}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="要求参会成员：" >
                        <el-tag class="tag"  v-for="(item,index) in detailData.meetingAttendeesNameList" :key="index">{{item}}</el-tag>
                    </el-form-item>
                    <el-form-item label="实际参会成员：" prop="realJoinMan">
                        <!--<el-tag type="success" class="tag1" closable v-for="(item,index) in detailData.realJoinMan"-->
                                <!--@close="handleJoinMenClose(item,index)" :key="index">{{item}}</el-tag>-->
                        <!--<i class="el-icon-news btnicon" @click = "selectUsers"></i>-->
                        <blend-tree ref= "refSelectRealJoinMan" :selectedDataToTree = "selectedUsersToTree"
                                    :enable-checked-multiple = "true" :tagButtons="['user']" activeTab = "user"
                                    @getDataFromTree = "userFromTreeFunc">
                            <!--添加按钮图标的插槽-->
                            <div slot="add_button">
                                <i class="el-icon-circle-plus btnicon" @click.stop= "$refs.refSelectRealJoinMan.blendTreeDialogShow();"></i>
                            </div>
                        </blend-tree>
                    </el-form-item>
                    <el-form-item label="会议内容："  prop="content">
                        <el-input type="textarea" :rows="5" style="width: 600px"  v-textarea-limiter maxlength="2500"
                                  placeholder="输入会议内容" v-model="detailData.content">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="会议记录：" prop="record">
                        <el-input type="textarea" :rows="5" style="width: 600px" v-textarea-limiter maxlength="2500"
                                  placeholder="输入会议记录" v-model="detailData.record">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="会议决议：" >
                        <el-input type="textarea" :rows="5" style="width: 600px" v-textarea-limiter maxlength="2500"
                                  placeholder="输入会议决议" v-model="detailData.resolution">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" :rows="5" style="width: 600px" v-textarea-limiter maxlength="2500"
                                  placeholder="输入会议备注" v-model="detailData.remarks">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="附件：">
                        <attach-upload v-if="showAttachment" :appId="attachmentPK.appId" :multiple="false" ref="meetingAttachment"
                                       :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
                    </el-form-item>
                </el-form>
            </div>
        </right-slide-modal>
        <!--<seleUser :selectUserDialogVisible="selectUserDialogVisible"-->
                  <!--:enable-checked-multiple = "true"-->
                  <!--@closeCreateModal ="selectUserDialogVisible = !selectUserDialogVisible"-->
                  <!--:show-inside-outside-tabs="false"-->
                  <!--:selectedUsers= "selectedUsersToTree" @getUserTree = "userFromTreeFunc"-->
        <!--&gt;</seleUser>-->
    </div>
</template>

<script>
    import seleUser from '@/components/userTree/userTree.vue'
    let validateJoinMen = (rule, value, callback) => {
        if(value==""){
            callback(new Error('请选择参会人员'));
        }else{
            callback();
        }
    };
    export default {
        name: "meeting-record-edit",
        components:{
            seleUser
        },
        data(){
            return{
                title:"创建会议纪要",
                detailData:{
                    mtTitle:"",
                    realStartTime:new Date(),
                    planTime:"",
                    realPlace:"",
                    planPlace:"",
                    meetingAttendeesNameList:[],
                    realJoinMan:[],
                    realJoinManId:[],
                    content:"",
                    record:"",
                    resolution:"",
                    remarks:"",
                    // fileData:[{
                    //     url:"/images/myw3schoolimage.jpg",
                    //     name:"food2.jpeg",
                    //     size:"50M"
                    // }]
                },
                rules: {
                    realStartTime:{ required: true, message: '请选择时间', trigger: 'blur' },
                    realPlace:[{ required: true, message: '请输入地点', trigger: 'blur' },
                        {min:1, max:100, message:"地点长度不能大于100字符，请重新输入！", trigger:'blur'},
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }],
                    realJoinMan:{ required: true,validator:validateJoinMen},
                },
                // selectUserDialogVisible:false,
                selectedUsersToTree:{userList:[]},
                btnDisabled:false,
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
            meetingId:{},
            meetingSummaryData:{}
        },
        mounted(){
           if(this.meetingId!=undefined && this.meetingId!=""){
               //填写会议纪要
               this.title="创建会议纪要";
               JZY.xhr.requestPromises([
                   JZY.xhr.post('/meeting/meetingInfo/createRedisId',{type:'MeetingSummary'},{alertSuccess:false}),
                   this.getMeetDetailById(this.meetingId)
               ]).then(async ([generatePk])=>{
                   this.attachmentPK=generatePk[0];
                   this.detailData.sid=generatePk[0].businessId;
                   this.showAttachment=true;
               })
           }else{
               if(this.meetingSummaryData!=undefined){
                   this.title="编辑会议纪要";
                   this.detailData.mtTitle=this.meetingSummaryData.mtTitle;
                   this.detailData.realStartTime=moment(this.meetingSummaryData.actualBeginDate).format('YYYY-MM-DD HH:mm:ss');
                   this.detailData.planTime=moment(this.meetingSummaryData.beginDate).format('YYYY-MM-DD HH:mm:ss');
                   this.detailData.realPlace=this.meetingSummaryData.actualBoardroomAddress;
                   this.detailData.planPlace=this.meetingSummaryData.boardroomAddressName;
                   this.detailData.meetingAttendeesNameList=this.meetingSummaryData.meetingAttendeesNameList;
                   // this.detailData.realJoinMan=this.meetingSummaryData.actualAttendeesNameList;
                   // this.detailData.realJoinManId=this.meetingSummaryData.meetingActualAttendeesIdList;
                   try{
                       this.detailData.realJoinMan=[];
                       this.detailData.realJoinManId=[];
                       this.meetingSummaryData.meetingActualAttendeesDtoList.forEach(item=>{
                           this.detailData.realJoinManId.push(item.actualAttendeesId);
                           this.detailData.realJoinMan.push(item.actualAttendeesName);
                           this.selectedUsersToTree.userList.push({sid:item.actualAttendeesId,name:item.actualAttendeesName});
                       })
                   }catch (e){}
                   this.detailData.content=this.meetingSummaryData.meetingContent;
                   this.detailData.record=this.meetingSummaryData.meetingRecord;
                   this.detailData.resolution=this.meetingSummaryData.meetingResult;
                   this.detailData.remarks=this.meetingSummaryData.remarks;
                   this.attachmentPK=this.meetingSummaryData.accessoryIdDto;
                   this.showAttachment=true;
               }
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
            // dateToStringFormat(dateTime){
            //     // alert(dateTime)
            //     let a= moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
            //     // alert(a)
            //     return a;
            // },
            operateClose(){
                this.$emit("closeCreateModal");
            },
            async handleSaveAttach(){
                await Promise.all("meetingAttachment".split(",").map((ref)=>this.$refs[ref].saveFiles()))
            },
            operateSave(){
                this.btnDisabled=true
                this.$refs['refForm'].validate((valid) => {
                    if (valid) {
                        try{
                            let pas={
                                actualBeginDate:JZY.u.formatTime(this.detailData.realStartTime),
                                actualBoardroomAddress:this.detailData.realPlace,
                                meetingActualAttendeesIdList:this.detailData.realJoinManId,
                                meetingContent:this.detailData.content,
                                meetingRecord:this.detailData.record,
                                meetingResult:this.detailData.resolution,
                                remarks:this.detailData.remarks,
                            };
                            if(this.meetingId!=undefined && this.meetingId!=""){
                                //新增
                                pas.meetingInfoId=this.meetingId;
                                pas.sid=this.detailData.sid;
                                this.commitAllData(pas,"/meeting/meetingSummary/save","add");
                            }else{
                                //修改
                                pas.meetingInfoId=this.meetingSummaryData.meetingInfoId;
                                this.commitAllData(pas,"/meeting/meetingSummary/update/"+this.meetingSummaryData.sid,"update");
                            }
                        }catch(e){
                            this.btnDisabled=false;
                            this.$message("保存数据异常:"+e);
                        }
                    } else {
                        this.btnDisabled=false
                        return false;
                    }
                })
                // this.$message("保存并关闭");
                // this.$emit("closeCreateModal");
            },
            // handleJoinMenClose(item,index){
            //     this.detailData.realJoinMan.splice(index, 1);
            //     this.detailData.realJoinManId.splice(index, 1);
            // },
            // selectUsers(){
            //     this.selectedUsersToTree=[];
            //     this.detailData.realJoinMan.forEach((item,index)=>{
            //         this.selectedUsersToTree.push({
            //             sid:this.detailData.realJoinManId[index],
            //             name:item,
            //         })
            //     })
            //     this.selectUserDialogVisible=true
            // },
            userFromTreeFunc(selectedUsers){
                this.detailData.realJoinMan=[];
                this.detailData.realJoinManId=[];
                selectedUsers.userList.forEach(item=>{
                    this.detailData.realJoinMan.push(item.name);
                    this.detailData.realJoinManId.push(item.sid);
                })
            },
            async getMeetDetailById(meetingId){
                await JZY.xhr.request({type:'get',url:'/meeting/meetingInfo/get/'+meetingId}).then((resultData)=>{
                    // console.log("getMeetDetailById:"+JSON.stringify(resultData))
                    this.detailData.mtTitle=resultData[0].mtTitle;
                    this.detailData.planTime=resultData[0].beginDate;
                    this.detailData.planPlace=resultData[0].boardroomAddressName;
                    this.detailData.meetingAttendeesNameList=JZY.u.copy(resultData[0].meetingAttendeesNameList);  // 会议参会人员名字
                    let menIndex=this.detailData.meetingAttendeesNameList.indexOf(resultData[0].emceeName);
                    if(menIndex==-1){
                        this.detailData.meetingAttendeesNameList.push(resultData[0].emceeName);
                    }
                    menIndex=this.detailData.meetingAttendeesNameList.indexOf(resultData[0].meetingOrganizationName);
                    if(menIndex==-1){
                        this.detailData.meetingAttendeesNameList.push(resultData[0].meetingOrganizationName);
                    }
                    //带入主持人、会议组织人、会议参与人并去重
                    this.detailData.realJoinMan=[];
                    this.detailData.realJoinManId=[];
                    if(resultData[0].meetingAttendeesDtoList!=null){
                        resultData[0].meetingAttendeesDtoList.forEach(item=>{
                            this.detailData.realJoinMan.push(item.attendeesName);
                            this.detailData.realJoinManId.push(item.attendeesId);
                            this.selectedUsersToTree.userList.push({sid:item.attendeesId,name:item.attendeesName});
                        })
                    }
                    menIndex=this.detailData.realJoinManId.indexOf(resultData[0].emceeId);
                    if(menIndex==-1){
                        this.detailData.realJoinManId.push(resultData[0].emceeId);
                        this.detailData.realJoinMan.push(resultData[0].emceeName);
                        this.selectedUsersToTree.userList.push({sid:resultData[0].emceeId,name:resultData[0].emceeName});
                    }
                     menIndex=this.detailData.realJoinManId.indexOf(resultData[0].meetingOrganizationId);
                    if(menIndex==-1){
                        this.detailData.realJoinManId.push(resultData[0].meetingOrganizationId);
                        this.detailData.realJoinMan.push(resultData[0].meetingOrganizationName);
                        this.selectedUsersToTree.userList.push({sid:resultData[0].meetingOrganizationId,name:resultData[0].meetingOrganizationName});
                    }
                    // JZY.u.successMsg('操作成功')
                }).catch((e)=>{
                    // JZY.u.warningMsg(e)
                })
            },
            async commitAllData(pas,url,type){
                let requestType="post";
                if(type=="update"){
                    requestType="PUT"
                }
                await JZY.xhr.request({type:requestType,url,data:pas}).then((resultData)=>{
                    try{
                        this.$emit("closeCreateModal");
                        if(type=="add"){
                            this.$emit("successBackFun");
                        }
                        this.handleSaveAttach();
                        JZY.u.successMsg('操作成功');
                    }catch (e){
                        this.btnDisabled=false;
                        this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    this.btnDisabled=false;
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .meetingRecordEdit{
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
        .tag1{
            color:#333333;
            border: 1px solid #ebeef5;
            background: #ffff;
            margin-right: 5px;
        }
        .btnicon{
            cursor:pointer;
        }
        .planPlaceCss{
            overflow: hidden;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 100%;
        }
    }
    .operate_buttons {
        float: right;
    }
</style>