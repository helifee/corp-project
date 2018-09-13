<template>
    <div class="detailEditForm">
        <el-form label-position="right" label-width="100px" :model="detailData" :rules="rules" ref="refForm">
            <el-form-item label="会议主题：" prop="mtTitle" >
                <el-input v-model="detailData.mtTitle"  placeholder="输入会议主题" style="width: 500px" maxlength="101"></el-input>
            </el-form-item>
            <el-form-item label="组织部门：" prop="organDepartName" ref="organDepartName">
                <el-tag type="success" v-if="detailData.organDepartName" closable
                        @close="handleNameClose('organDepartName')">{{detailData.organDepartName}}</el-tag>
                <i class="el-icon-circle-plus btnicon" @click = "selectDep"></i>
            </el-form-item>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="会议时间：" prop="meetingTime" ref="meetingTime">
                        <el-date-picker style="width:350px"
                                v-model="detailData.meetingTime"
                                :picker-options="pickerOptions"
                                @change="handleSeleMeetingTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="召开地点：">
                        <!--<el-button type="text">选择会议室</el-button>-->
                        <el-checkbox v-model="meetingRoomchecked" @change="handleSelectRoomChecked">选择会议室</el-checkbox>
                        <el-input v-if="!meetingRoomchecked" v-model="detailData.customBoardroomAddress" style="width:350px"></el-input>
                        <el-select v-if="meetingRoomchecked" v-model="detailData.boardroomAddressName" style="width:350px"
                                   placeholder="请选择会议室" @change="handleSelectRoomChange" popper-class="cssBoardroomAddressName">
                            <el-option v-for="item in meetingRoomList"
                                       :label="item.name" :value="item.sid" :key="item.sid"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--<el-col :span="12">-->
                    <!---->
                <!--</el-col>-->
            </el-row>
            <div v-if="roomChartVisible">
                <div style="margin-left: 20px">
                    <span>{{roomChartTitle}}</span>
                    <span style="float: right;">注:颜色线条代表该会议室该时间段已经被占用</span>
                </div>
                <roomReserveChart :chartData="roomReserveChartData" :style="{width: '100%', height: '180px'}"></roomReserveChart>
            </div>
            <el-form-item label="主持人：" prop="emceeName" ref="emceeName">
                <blend-tree ref= "refSelectEmceeName" :selectedDataToTree = "selectedEmceeToTree"
                            :enable-checked-multiple = "false" :tagButtons="['user']" activeTab = "user"
                            @getDataFromTree = "emceeFromTreeFunc">
                    <!--添加按钮图标的插槽-->
                    <div slot="add_button">
                        <i class="el-icon-circle-plus btnicon" @click.stop= "$refs.refSelectEmceeName.blendTreeDialogShow()"></i>
                    </div>
                </blend-tree>
            </el-form-item>
            <el-form-item label="会议组织人：" prop="meetingOrganizationName" ref="meetingOrganizationName">
                <blend-tree ref= "refSelectOrganizationName" :selectedDataToTree = "selectedOrganizationNameToTree"
                            :enable-checked-multiple = "false" :tagButtons="['user']" activeTab = "user"
                            @getDataFromTree = "organizationNameFromTreeFunc">
                    <!--添加按钮图标的插槽-->
                    <div slot="add_button">
                        <i class="el-icon-circle-plus btnicon" @click.stop= "$refs.refSelectOrganizationName.blendTreeDialogShow();"></i>
                    </div>
                </blend-tree>
            </el-form-item>
            <el-form-item label="纪要记录人：" prop="recorderName" ref="recorderName">
                <blend-tree ref= "refSelectRecorderName" :selectedDataToTree = "selectedRecorderNameToTree"
                            :enable-checked-multiple = "false" :tagButtons="['user']" activeTab = "user"
                            @getDataFromTree = "recorderFromTreeFunc">
                    <!--添加按钮图标的插槽-->
                    <div slot="add_button">
                        <i class="el-icon-circle-plus btnicon" @click.stop= "$refs.refSelectRecorderName.blendTreeDialogShow();"></i>
                    </div>
                </blend-tree>
            </el-form-item>
            <el-form-item label="参会人员：" prop="meetingAttendeesNameList" ref="meetingAttendeesNameList">
                <blend-tree ref= "refSelectAttendeesName" :selectedDataToTree = "selectedAttendeesNameToTree"
                            :enable-checked-multiple = "true" :tagButtons="['user']" activeTab = "user"
                            @getDataFromTree = "attendeesNameFromTreeFunc">
                    <!--添加按钮图标的插槽-->
                    <div slot="add_button">
                        <i class="el-icon-circle-plus btnicon" @click.stop= "$refs.refSelectAttendeesName.blendTreeDialogShow();"></i>
                    </div>
                </blend-tree>
            </el-form-item>
            <el-form-item label="抄送人员：" prop="meetingCopySendNameList">
                <blend-tree ref= "refSelectCopySend" :selectedDataToTree = "selectedCopySendToTree"
                            :enable-checked-multiple = "true" :tagButtons="['user']" activeTab = "user"
                            @getDataFromTree = "copySendFromTreeFunc">
                    <!--添加按钮图标的插槽-->
                    <div slot="add_button">
                        <i class="el-icon-circle-plus btnicon" @click.stop= "$refs.refSelectCopySend.blendTreeDialogShow();"></i>
                    </div>
                </blend-tree>
            </el-form-item>
            <el-form-item label="会议目标："  prop="meetingTarget">
                <el-input type="textarea" :rows="5" style="width: 600px" v-textarea-limiter maxlength="2500"
                          placeholder="输入会议目标" v-model="detailData.meetingTarget">
                </el-input>
            </el-form-item>
            <el-form-item label="输出文档：" prop="meetingOutputDoc">
                <el-input type="textarea" :rows="5" style="width: 600px" v-textarea-limiter maxlength="2500"
                          placeholder="输入输出文档" v-model="detailData.meetingOutputDoc">
                </el-input>
            </el-form-item>
            <el-form-item label="后续活动：" prop="meetingFollowActivity">
                <el-input type="textarea" :rows="5" style="width: 600px" v-textarea-limiter maxlength="2500"
                          placeholder="输入后续活动" v-model="detailData.meetingFollowActivity">
                </el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remarks">
                <el-input type="textarea" :rows="5" style="width: 600px" v-textarea-limiter maxlength="2500"
                          placeholder="输入会议备注" v-model="detailData.remarks">
                </el-input>
            </el-form-item>
            <el-form-item label="附件：">
                <attach-upload v-if="showAttachment" @attachUploadSuccess="handleAttachUploadSuccess" :appId="attachmentPK.appId"
                               :multiple="false" ref="meetingAttachment"
                               style="width: 90%" :businessId="attachmentPK.businessId" :categoryId="attachmentPK.categoryId"></attach-upload>
            </el-form-item>
            <!--<el-form-item >-->
            <div class="discussItem">
                <div class="title">
                    <h1 class="yc">会议议程</h1>
                    <el-button type="text" class="addItem" @click="addDiscussItem">
                    <i class="el-icon-circle-plus-outline"></i>
                    添加议程
                    </el-button>
                </div>
            </div>
            <el-form-item prop="meetingAgendaList" class="meetingAgendaListCSS">
                    <el-table  :data="detailData.meetingAgendaList"  :header-cell-class-name="tableHeaderCell" class="ycTable"
                               @cell-dblclick="celldbclick" >
                        <el-table-column type="index" label="序号"  min-width="90"></el-table-column>
                        <el-table-column prop="date"  label="时间"  min-width="280">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">
                                    {{dateToStringFormat(scope.row.agendaTime[0])}}~ {{dateToStringFormat(scope.row.agendaTime[1])}}
                                </span>
                                <span v-if="scope.row.editFlag">
                                     <el-date-picker
                                             v-model="scope.row.agendaTime"
                                             :picker-options="pickerOptions"
                                             style="width: 100%"
                                             type="datetimerange"
                                             value-format="yyyy-MM-dd HH:mm:ss"
                                             range-separator="至"
                                             start-placeholder="开始日期"
                                             end-placeholder="结束日期">
                                    </el-date-picker>
                                </span>

                            </template>
                        </el-table-column>
                        <el-table-column  min-width="200" label="会议议程" prop="meetingAgenda">
                            <template slot-scope="scope">
                                <span v-if="!scope.row.editFlag">{{scope.row.meetingAgenda}}</span>
                                <el-form-item v-if="scope.row.editFlag"
                                        :prop="'meetingAgendaList.' + scope.$index + '.meetingAgenda'"
                                        :rules="[
                                                    { min: 1, max: 100, message: '长度不能大于100字符', trigger: 'blur' },
                                                    { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                                                    ]"
                                >
                                    <el-input  v-model="scope.row.meetingAgenda" :maxlength=101 ></el-input>
                                </el-form-item>
                                <!--<el-input v-if="scope.row.editFlag" v-model="scope.row.meetingAgenda"  maxlength="101"></el-input>-->
                            </template>
                        </el-table-column>
                        <el-table-column  min-width="60">
                            <template slot-scope="scope">
                                <!--<span class="el-icon-success btnOK" v-if="scope.row.editFlag"-->
                                      <!--@click="saveInformation(scope.$index, scope.row)"  ></span>-->
                               <span class="el-icon-circle-close btnDel" @click="delInformation(scope.$index, scope.row)"></span>
                            </template>
                        </el-table-column>
                    </el-table>
            </el-form-item>
        </el-form>
        <selectDep :selectDepDialogVisible.sync="selectDepDialogVisible" @getSelectDep="getSelectDep"
                   v-if="selectDepDialogVisible"></selectDep>
        <!--<seleUser :selectUserDialogVisible="selectUserDialogVisible"-->
                  <!--:enable-checked-multiple = "selectUserMultiple"-->
                  <!--@closeCreateModal ="selectUserDialogVisible = !selectUserDialogVisible"-->
                  <!--:show-inside-outside-tabs="false"-->
                  <!--:selectedUsers= "selectedUsersToTree" @getUserTree = "userFromTreeFunc"-->
        <!--&gt;</seleUser>-->
    </div>
</template>

<script>
    import selectDep from './selectDep.vue'
    import seleUser from '@/components/userTree/userTree.vue'
    import roomReserveChart from './roomReserveChart'
    let validateJoinMen = (rule, value, callback) => {
        if(value==""){
            callback(new Error('请选择参会人员'));
        }else{
            callback();
        }
    };
    let meettingTitleRule= {
            mtTitle:[{  required: true,message: '会议主题', trigger:'blur'},
                {min:1, max:100, message:"会议主题长度不能大于100字符，请重新输入！", trigger:'blur'},
                { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }],
        };
    export default {
        name: "detialEditForm",
        components:{
            selectDep,
            seleUser,
            roomReserveChart
        },
        props:{
            meetingData:{
                required:true
            }
        },
        data(){
            return{
                detailData:{
                    mtTitle:"",
                    organDepartName:"",
                    organDepartId:"",
                    meetingTime:[],
                    boardroomAddress:"",
                    boardroomType:0,    //会议类型，1预定，0不是预定
                    boardroomAddressName:"",  //为1时用来存放会议室id
                    customBoardroomAddress:"",  //为0时存放用户填写会的会议地址，后端无此字段
                    emceeName:"",
                    emceeId:"",
                    meetingOrganizationName:"",
                    meetingOrganizationId:"",
                    recorderName:"",
                    recorderId:"",
                    meetingAttendeesNameList:[],  //参会人数组
                    meetingAttendeesIdList:[],
                    meetingCopySendNameList:[],  //抄送人员
                    meetingCopySendIdList:[],
                    meetingTarget:"",
                    meetingOutputDoc:"",
                    meetingFollowActivity:"",
                    remarks:"",
                    // fileData:[{
                    //     url:"/images/myw3schoolimage.jpg",
                    //     name:"food2.jpeg",
                    //     size:"50M"
                    // }],
                    // meetingAgendaList:[{
                    //     agendaTime:[],
                    //     meetingAgenda:"",
                    //     editFlag:false
                    // }]
                    meetingAgendaList:[]
                },
                rules:meettingTitleRule,
                selectDepDialogVisible:false,
                meetingRoomchecked:false,
                // selectUserDialogVisible:false,
                selectedEmceeToTree:{},
                selectedOrganizationNameToTree:{},
                selectedRecorderNameToTree:{},
                selectedAttendeesNameToTree:{userList:[]},
                selectedCopySendToTree:{userList:[]},
                // selectedUsersToTree:{},
                meetingRoomList:[],
                roomChartVisible:false,
                roomChartTitle:"",
                arrChartData:[],//二维数组0，2等偶数放图上开始位置，1，3等奇数放图柱的长度,第二维数组长度为7表示周一到周日
                roomReserveChartData:[],
                pickerOptions:{
                    // disabledDate(time) {
                    //     let timeDate=moment(time.getTime()).format('YYYY-MM-DD');
                    //     let nowDate=moment(new Date()).format('YYYY-MM-DD');
                    //     return moment(timeDate).isBefore(nowDate);
                    // }
                },
                // curSelectUserDialog:"",  //临时记录在选择什么人
                // selectUserMultiple:false,
                showAttachment:false,
                attachmentPK:{
                    appId:"",
                    businessId:"",
                    categoryId:""
                },
            }
        },
        mounted(){
            if(this.meetingData!=""){
                try{
                    this.getMeetingRoomList();
                    //"修改会议";
                    this.detailData.mtTitle=this.meetingData.mtTitle;
                    if(this.meetingData.beginDate=="" || this.meetingData.beginDate==null){
                        this.detailData.meetingTime=[]
                    }else{
                        this.detailData.meetingTime=[moment(this.meetingData.beginDate),moment(this.meetingData.endDate)]
                    }
                    // this.detailData.beginDate=this.meetingData.beginDate;
                    // this.detailData.endDate=this.meetingData.endDate;
                    this.detailData.organDepartId=this.meetingData.organDepartId;
                    this.detailData.organDepartName=this.meetingData.organDepartName;
                    //会议类型，1预定，0不是预定
                    this.detailData.boardroomType=this.meetingData.boardroomType;
                    this.detailData.boardroomAddress=this.meetingData.boardroomAddress;
                    // this.detailData.boardroomAddressName=this.meetingData.boardroomAddressName;
                    if(this.meetingData.boardroomType=="1"){
                        this.meetingRoomchecked=true;
                        this.detailData.boardroomAddressName=this.meetingData.boardroomAddress;
                        this.getMeetingRoomList();
                    }else{
                        this.detailData.customBoardroomAddress=this.meetingData.boardroomAddressName;
                        this.detailData.boardroomAddressName="";
                    }

                    this.detailData.emceeId=this.meetingData.emceeId;
                    this.detailData.emceeName=this.meetingData.emceeName;
                    //传给选人组件以显示
                    if(this.detailData.emceeId!="" && this.detailData.emceeId!=null){
                        this.selectedEmceeToTree={userList:[{
                                            sid:this.detailData.emceeId,
                                            name:this.detailData.emceeName,
                                        }]};
                    }

                    this.detailData.meetingOrganizationId=this.meetingData.meetingOrganizationId;
                    this.detailData.meetingOrganizationName=this.meetingData.meetingOrganizationName;
                    if(this.detailData.meetingOrganizationId!="" && this.detailData.meetingOrganizationId!=null){
                        this.selectedOrganizationNameToTree={userList:[{
                                sid:this.detailData.meetingOrganizationId,
                                name:this.detailData.meetingOrganizationName,
                            }]};
                    }
                    this.detailData.recorderId=this.meetingData.recorderId;
                    this.detailData.recorderName=this.meetingData.recorderName;
                    if(this.detailData.recorderId!="" && this.detailData.recorderId!=null){
                        this.selectedRecorderNameToTree={userList:[{
                                sid:this.detailData.recorderId,
                                name:this.detailData.recorderName,
                            }]};
                    }
                    this.detailData.meetingTarget=this.meetingData.meetingTarget;
                    this.detailData.meetingOutputDoc=this.meetingData.meetingOutputDoc;
                    this.detailData.meetingFollowActivity=this.meetingData.meetingFollowActivity;
                    this.detailData.remarks=this.meetingData.remarks;
                    //处理参会人员
                    try{
                        this.detailData.meetingAttendeesIdList=[];
                        this.detailData.meetingAttendeesNameList=[];
                        this.meetingData.meetingAttendeesDtoList.forEach(item=>{
                            this.detailData.meetingAttendeesIdList.push(item.attendeesId);
                            this.detailData.meetingAttendeesNameList.push(item.attendeesName);
                            this.selectedAttendeesNameToTree.userList.push({sid:item.attendeesId,name:item.attendeesName})
                        })
                    }catch (e){}
                    // 会议抄送人list
                    try{
                        this.detailData.meetingCopySendIdList=[];
                        this.detailData.meetingCopySendNameList=[];
                        this.meetingData.meetingCopySendDtoList.forEach(item=>{
                            this.detailData.meetingCopySendIdList.push(item.copySendId);
                            this.detailData.meetingCopySendNameList.push(item.copySendName);
                            this.selectedCopySendToTree.userList.push({sid:item.copySendId,name:item.copySendName})
                        })
                    }catch (e){}
                    // this.detailData.meetingAgendaList=this.meetingData.meetingAgendaList;// 会议议程表list
                    this.attachmentPK=this.meetingData.accessoryIdDto;
                    this.showAttachment=true;
                    this.detailData.meetingAgendaList=[];
                    if(this.meetingData.meetingAgendaList!=null){
                        this.meetingData.meetingAgendaList.forEach(item=>{
                            this.detailData.meetingAgendaList.push({
                                agendaTime:[moment(item.meetingBeginDate).format('YYYY-MM-DD HH:mm:ss'),moment(item.meetingEndDate).format('YYYY-MM-DD HH:mm:ss')],
                                meetingAgenda:item.meetingAgenda,
                                editFlag:false
                            })
                        })
                    }
                }catch (e){
                    console.log(e)
                }

            }else{
                //"创建会议";
                JZY.xhr.requestPromises([
                    JZY.xhr.post('/meeting/meetingInfo/createRedisId',{type:'MeetingInfo'},{alertSuccess:false}),
                    this.getMeetingRoomList()
                ]).then(async ([generatePk])=>{
                    this.attachmentPK=generatePk[0];
                    this.detailData.sid=generatePk[0].businessId;
                    this.showAttachment=true;
                })
            }

        },
        methods:{
            tableHeaderCell(){
                return "tableHeaderCell"
            },
            dateToStringFormat(dateTime){
                return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
            },
            selectDep(){
                // this.$message('请选择组织部门');
                this.selectDepDialogVisible=true
            },
            getSelectDep(depInfo){
                // console.log("depInfo:"+JSON.stringify(depInfo))
                this.detailData.organDepartName=depInfo.name;
                this.detailData.organDepartId=depInfo.sid;
                this.cancelFieldValidate("organDepartName");
            },
            handleNameClose(item){
                if(item=='organDepartName'){
                    this.detailData.organDepartName="";
                    this.detailData.organDepartId="";
                }
            },
            celldbclick(row, column, cell, event){
                row.editFlag=true;
            },
            saveInformation(index,row){
                row.editFlag=false;
            },
            delInformation(index,row){
               this.detailData.meetingAgendaList.splice(index,1);
            },
            addDiscussItem(){
                if(this.detailData.meetingAgendaList==null){
                    this.detailData.meetingAgendaList=[];
                }
                this.detailData.meetingAgendaList.push({
                    agendaTime:[new Date(),new Date()],
                    meetingAgenda:"",
                    editFlag:true
                })
            },
            handleSelectRoomChecked(){
                if(!this.meetingRoomchecked){
                    this.roomChartVisible=false;
                }
            },
            handleSelectRoomChange(){
                this.getReserveRoomList(this.detailData.boardroomAddressName);
                // console.log(this.detailData.boardroomAddressName);
            },
            saveMeetingInfo(saveType,isUpdate){
                //saveType 0保存，1提交
                if(saveType=="0"){
                    this.rules=meettingTitleRule;
                    // this.handleSetCommitValue(saveType,isUpdate);
                }else if(saveType=="1"){
                    this.rules={
                        ...meettingTitleRule,
                        organDepartName:{  required: true, message: '请选择组织部门',trigger: 'change'},
                        emceeName:{ required: true, message: '请选择主持人'},
                        meetingOrganizationName:{ required: true,message: '请选择会议组织人'},
                        recorderName:{ required: true,message: '请选择纪要记录人' },
                        meetingAttendeesNameList:{ required: true,validator:validateJoinMen},
                        meetingTime:{required: true,message: '请选择会议时间'},
                        recorderName:{required: true,message: '请选择会议纪要人'},
                    };
                }
                setTimeout(() => {
                    this.$refs.refForm.validate(valid=> {
                        if (valid) {
                            this.handleSetCommitValue(saveType,isUpdate);
                        }
                    })
                }, 500);
            },

            handleAttachUploadSuccess(){

            },
            emceeFromTreeFunc(selectedUsers){
                this.detailData.emceeName=selectedUsers.userList.length==0?"":selectedUsers.userList[0].name;
                this.detailData.emceeId=selectedUsers.userList.length==0?"":selectedUsers.userList[0].sid;
                this.cancelFieldValidate("emceeName");
            },
            organizationNameFromTreeFunc(selectedUsers){
                this.detailData.meetingOrganizationName=selectedUsers.userList.length==0?"":selectedUsers.userList[0].name;
                this.detailData.meetingOrganizationId=selectedUsers.userList.length==0?"":selectedUsers.userList[0].sid;
                this.cancelFieldValidate("meetingOrganizationName");
            },
            recorderFromTreeFunc(selectedUsers){
                this.detailData.recorderName=selectedUsers.userList.length==0?"":selectedUsers.userList[0].name;
                this.detailData.recorderId=selectedUsers.userList.length==0?"":selectedUsers.userList[0].sid;
                this.cancelFieldValidate("recorderName");
            },
            attendeesNameFromTreeFunc(selectedUsers){
                this.detailData.meetingAttendeesNameList=[];
                this.detailData.meetingAttendeesIdList=[];
                this.cancelFieldValidate("meetingAttendeesNameList");
                selectedUsers.userList.forEach(item=>{
                    this.detailData.meetingAttendeesNameList.push(item.name);
                    this.detailData.meetingAttendeesIdList.push(item.sid);
                })
            },
            copySendFromTreeFunc(selectedUsers){
                this.detailData.meetingCopySendNameList=[];
                this.detailData.meetingCopySendIdList=[];
                selectedUsers.userList.forEach(item=>{
                    this.detailData.meetingCopySendNameList.push(item.name);
                    this.detailData.meetingCopySendIdList.push(item.sid);
                })
            },
            handleSeleMeetingTime(){
                this.cancelFieldValidate("meetingTime");
                if(this.roomChartVisible){
                  this.getReserveRoomList(this.detailData.boardroomAddressName)
                }else if(this.meetingRoomchecked && this.detailData.boardroomAddressName!=""){
                    this.getReserveRoomList(this.detailData.boardroomAddressName)
                }
            },
            cancelFieldValidate (refField) {
                this.$refs[refField].clearValidate() // 清除字段的验证
            },
            async handleSaveAttach(){
                await Promise.all("meetingAttachment".split(",").map((ref)=>this.$refs[ref].saveFiles()))
            },
            async handleSetCommitValue(saveType,isUpdate){
                // console.log(this.detailData.meetingTime)
                if(this.detailData.meetingTime==null){
                    this.detailData.meetingTime=[];
                }
                let pas={
                        mtTitle:this.detailData.mtTitle,
                        organDepartName:this.detailData.organDepartName,
                        organDepartId:this.detailData.organDepartId,
                        beginDate:this.detailData.meetingTime[0]==undefined?"":moment(this.detailData.meetingTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                        endDate:this.detailData.meetingTime[1]==undefined?"":moment(this.detailData.meetingTime[1]).format('YYYY-MM-DD HH:mm:ss'),
                        // boardroomAddress:this.detailData.boardroomAddress,
                        // boardroomAddressName:this.detailData.boardroomAddressName,  //为1时用来存放会议室id
                        // emceeName:this.detailData.emceeName,
                        emceeId:this.detailData.emceeId,
                        // meetingOrganizationName:"",
                        meetingOrganizationId:this.detailData.meetingOrganizationId,
                        // recorderName:"",
                        recorderId:this.detailData.recorderId,
                        // meetingAttendeesNameList:[],  //参会人数组
                        meetingAttendeesIdList:this.detailData.meetingAttendeesIdList,
                        // meetingCopySendNameList:[],  //抄送人员
                        meetingCopySendIdList:this.detailData.meetingCopySendIdList,
                        meetingTarget:this.detailData.meetingTarget,
                        meetingOutputDoc:this.detailData.meetingOutputDoc,
                        meetingFollowActivity:this.detailData.meetingFollowActivity,
                        remarks:this.detailData.remarks,
                        meetingAgendaList:[],
                }

                if(this.detailData.meetingAgendaList!=null){
                    this.detailData.meetingAgendaList.forEach((item,index)=>{
                        if(item.meetingAgenda!=""){
                            let agenda={
                                meetingAgenda:item.meetingAgenda,
                                meetingBeginDate:moment(item.agendaTime[0]).format('YYYY-MM-DD HH:mm:ss'),
                                meetingEndDate:moment(item.agendaTime[1]).format('YYYY-MM-DD HH:mm:ss'),
                            }
                            pas.meetingAgendaList.push(agenda);
                        }
                    })
                }
                // pas.meetingAgendaList=this.detailData.meetingAgendaList;
                if(this.meetingRoomchecked){
                    pas.boardroomAddress=this.detailData.boardroomAddressName;
                }else{
                    pas.boardroomAddress=this.detailData.customBoardroomAddress;
                }
                // boardroomAddress:this.detailData.boardroomAddress,
                // boardroomAddressName:this.detailData.boardroomAddressName,  //为1时用来存放会议室id
                pas.boardroomType=this.meetingRoomchecked==true?"1":"0";
                pas.status=saveType=="0"?"0":"2";
                // console.log("pas:"+JSON.stringify(pas))
                let requestType="POST";
                let url="/meeting/meetingInfo/save";
                if(isUpdate){
                    requestType="PUT"
                    url="/meeting/meetingInfo/update/"+this.meetingData.sid;
                }else{
                    pas.sid=this.detailData.sid;
                }
                await JZY.xhr.request({type:requestType,url,data:pas}).then((resultData)=>{
                // await JZY.xhr.request({type:requestType,url,data:pas},false,false).then((resultData)=>{
                    try{
                         this.handleSaveAttach();
                        this.$emit("successBackFun");
                        JZY.u.successMsg('操作成功');
                    }catch (e){
                        // this.btnDisabled=false;
                        // this.$message(e);
                    }
                }).catch((e)=>{
                    //接口失败
                    // this.btnDisabled=false;
                })
            },
            getRoomChartData(dayWeek,startPosition,duration){
                //dayWeek开始日期是周几   startPosition图上开始位置  duration图柱的长度
                let hasPos=false;
                try{
                    //arrChartData二维数组第一维的0，2等偶数放图上开始位置，1，3等奇数放图柱的长度,第二维数组长度为7表示周一到周日
                    this.arrChartData.forEach((item,index)=>{
                        if(index%2==0 || index==0){
                            item.forEach((childItem,childIndex)=>{
                                if((dayWeek-1)===childIndex && childItem===undefined){
                                    hasPos=true;
                                    this.arrChartData[index][dayWeek-1]=startPosition;
                                    this.arrChartData[index+1][dayWeek-1]=duration;
                                    foreach.break=new Error("StopIteration");
                                }
                            })
                        }
                    })
                }catch (e){}
                if(!hasPos){
                    let arryCurPos=[undefined,undefined,undefined,undefined,undefined,undefined,undefined];
                    arryCurPos[dayWeek-1]=startPosition;
                    this.arrChartData.push(arryCurPos);
                    let arryCurDur=[undefined,undefined,undefined,undefined,undefined,undefined,undefined];
                    arryCurDur[dayWeek-1]=duration;
                    this.arrChartData.push(arryCurDur);

                }
            },
            async getMeetingRoomList(){
                await JZY.xhr.post('/meeting/meetingBoardroom/queryList',{},{alertSuccess:false}).then((resultData)=>{
                    this.meetingRoomList=resultData[0];
                }).catch((e)=>{
                    //接口失败
                })
            },
            async getReserveRoomList(roomId){
                if(this.detailData.meetingTime.length<1){
                    // this.$message.warning(`请先选择会议时间`);
                    return;
                }
                if(this.detailData.meetingTime[0]==null){
                    return;
                }
                let reserveStartDate=moment(this.detailData.meetingTime[0]).format('YYYY-MM-DD');
                let weekOfday = moment(reserveStartDate).format('d');//计算今天是星期几 0-6
                if(weekOfday==0){
                    reserveStartDate=moment().subtract(1, "days").format("YYYY-MM-DD")
                }
                let start_monday=moment(reserveStartDate).day(1).format('YYYY-MM-DD')
                let last_sunday=moment(reserveStartDate).day(7).format('YYYY-MM-DD');
                this.roomChartTitle=start_monday+ " ~ "
                    +last_sunday+" 第"+moment(reserveStartDate).format('w')+"周";
                let pas={
                    meetingBoardroomId:roomId,
                    reserveStartTime:moment(start_monday).format('YYYY-MM-DD 00:00:00'),
                    reserveEndTime:moment(last_sunday).format('YYYY-MM-DD 23:59:59'),
                }
                await JZY.xhr.request({type:'POST',url:'/meeting/meetingReserveBoardroom/queryList',data:pas},false,false).then((resultData)=>{
                // console.log("getReserveRoomList:"+JSON.stringify(resultData))
                    this.arrChartData=[];
                    this.roomReserveChartData=[];
                    // resultData=[[{"reserveTitle":"wwwww","reserveStartTime":"2018-04-14 09:06:00","reserveEndTime":"2018-04-14 10:20:50","useUserid":"10111","remarks":null,"useUserName":"test","sid":"10006"},
                    //     {"reserveStartTime":"2018-04-10 09:56:20","reserveEndTime":"2018-04-15 11:12:40","useUserid":"10117","sid":"10007"},
                    //     {"reserveStartTime":"2018-04-13 20:10:00","reserveEndTime":"2018-04-13 21:30:00","useUserid":"10106","meetingBoardroomName":null,"useUserName":"咖啡","sid":"10008"}]]
                    resultData[0].forEach(item=>{
                        // console.log(item.reserveStartTime,item.reserveEndTime)
                        let dayWeek=moment(item.reserveStartTime).format('d')==0?7:moment(item.reserveStartTime).format('d');//开始日期是周几
                        let startDate=moment(item.reserveStartTime).format('YYYY-MM-DD');  //开始日期
                        let endData=moment(item.reserveEndTime).format('YYYY-MM-DD');  //结束日期
                        //处理跨天的情况
                        if(startDate!=endData){
                            // console.log("跨天：",item.reserveStartTime,item.reserveEndTime)
                            for(let i=0;moment(item.reserveStartTime).add(i, 'd').format('YYYY-MM-DD')<=endData;i++){
                                let curData=moment(item.reserveStartTime).add(i, 'd');
                                if(i==0){
                                    //第一天
                                    let startHour=moment(item.reserveStartTime).format('H');
                                    let startMinute=(moment(item.reserveStartTime).format('m')/60).toFixed(1);
                                    let startPosition=parseFloat(startHour)+parseFloat(startMinute);    //图上开始位置
                                    let duration=24-startPosition;     //图柱的长度
                                    this.getRoomChartData(dayWeek,startPosition,duration);
                                }else{
                                    let dayWeek=curData.format('d')==0?7:curData.format('d');//开始日期是周几
                                    let startPosition=0;    //图上开始位置
                                    let duration=0;
                                    if(moment(curData).format('YYYY-MM-DD')<endData){
                                        //中间的天
                                        duration=24;
                                    }else{
                                        //最后一天
                                        let endHour=moment(item.reserveEndTime).format('H');
                                        let endMinute=(moment(item.reserveEndTime).format('m')/60).toFixed(1);
                                        duration=parseFloat(endHour)+parseFloat(endMinute);
                                    }
                                    this.getRoomChartData(dayWeek,startPosition,duration);
                                }
                            }
                        }else{
                            let startHour=moment(item.reserveStartTime).format('H');
                            let startMinute=(moment(item.reserveStartTime).format('m')/60).toFixed(1);
                            let startPosition=parseFloat(startHour)+parseFloat(startMinute);    //图上开始位置
                            let duration=moment.duration(moment(item.reserveEndTime) - moment(item.reserveStartTime)).asHours();
                            duration=duration.toFixed(1);     //图柱的长度
                            this.getRoomChartData(dayWeek,startPosition,duration)
                        }
                    })
                    // console.log("end:",this.arrChartData)
                    //转成echart需要的数据
                    for(let z=0;z<this.arrChartData.length;z=z+2){
                        let objStartPos={
                            type: 'bar',
                            stack: 'roomChart'+z,
                            itemStyle: {
                            normal: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                        color: 'rgba(0,0,0,0)'
                                },
                                emphasis: {
                                    barBorderColor: 'rgba(0,0,0,0)',
                                        color: 'rgba(0,0,0,0)'
                                }
                             },
                            data: this.arrChartData[z]
                        }
                        let objDuration={
                            type: 'bar',
                            stack: 'roomChart'+z,
                            data: this.arrChartData[z+1]
                        }
                        this.roomReserveChartData.push(objStartPos);
                        this.roomReserveChartData.push(objDuration)
                    }
                    this.roomChartVisible=true;
                    // this.roomReserveChartData={}

                //     this.meetingRoomList=resultData[0];
                }).catch((e)=>{
                    //接口失败
                    JZY.u.errorMsg(e);
                })
            }
        }
    }
</script>

<style  lang="scss">
    .cssBoardroomAddressName{
         .el-select-dropdown__list, .el-popper .el-cascader-menu{
            width:350px;
        }
    }
    .detailEditForm{
        /*height: calc(100% - 56px);*/
        /*width: 100%;*/
        /*box-sizing:border-box;*/
        /*padding-left: 20px;*/
        /*font-size: 14px;*/
        .btnicon{
            cursor:pointer;
        }
        .tag{
            margin-right: 5px;
        }
        .discussItem{
            border-top: 1px solid #ebeef5;
            .title{
                position: relative;
                .yc{
                    font-size: 16px;
                    margin: 20px 0 20px 0;
                    display: inline-block;
                }
                .addItem{
                    position:absolute;
                    right: 10px;
                    top:10px;
                    font-size:16px;
                }
             }
        }
        .meetingAgendaListCSS{
            .el-form-item__content{
                margin-left: 0px !important;
            }
            .ycTable{
                border: 1px solid #ebeef5;
                width: 100%;
                text-align: center;
            }

            .el-table {
                .tableHeaderCell {
                    color: #333333;
                    font-weight: 600;
                    background-color: rgba(250, 250, 250, 1);
                    text-align: center;
                }
                .btnOK{
                    font-size: 20px;color: #67c23a;margin-right: 12px;
                    cursor:pointer;
                }
                .btnDel{
                    font-size: 20px;color: red;
                    cursor:pointer;
                }

            }
        }


    }
</style>