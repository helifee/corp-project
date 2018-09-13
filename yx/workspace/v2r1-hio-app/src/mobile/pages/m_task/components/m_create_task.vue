<template>
    <div class="m_create_task">
        <!-- <scroller lock-x height="100%"> -->
            <div class="formContain" >
            <group  label-align="left">
            <x-input  class="require" title="任务名称" :required="true" v-model="taskName" placeholder="必填..."></x-input>
            
            <popup-radio title="关联项目" class="popupRadio" placeholder="选择..." :options="projectNames" v-model="projectId" @on-hide="peopleTree" :readonly="proReadonly">
                <p slot="popup-header" class="vux-1px-b demo3-slot">关联项目</p>
            </popup-radio>

            <cell class="spacing require" title="负责人" is-link v-on:click.native="handleShowUserSelect('projectResponsiblePerson')" v-model="formData.projectResponsiblePersonName">
                <span v-if="formData.projectResponsiblePersonName==''">必选...</span>
            </cell>
            <cell  title="参与人" align-items="flex-start"  is-link v-on:click.native="handleShowUserSelect('projectParticipantPerson')" v-model="formData.projectParticipantPersonList">
                <span v-if="formData.projectParticipantPersonList==''">选择...</span>
                <div class="text_l_r"  slot v-else>{{formData.projectParticipantPersonList}}</div>
            </cell>
            <cell  title="共享人" align-items="flex-start" is-link v-on:click.native="handleShowUserSelect('projectSharePerson')" v-model="formData.projectSharePersonList">
                <span v-if="formData.projectSharePersonList==''">选择...</span>
                <div class="text_l_r"  slot v-else>{{formData.projectSharePersonList}}</div>
            </cell>

            <cell class="spacing" title="任务进度" v-on:click.native="handleShowProgress" is-link
                      v-model="taskProgress"><span v-if="taskProgress==''">选择...</span></cell>

            <popup-radio title="紧急程度" class="popupRadio require emDegree" placeholder="必选..." :options="degreeNames" v-model="degreeName">
                <p slot="popup-header" class="vux-1px-b demo4-slot">紧急程度</p>
                <template slot-scope="props" slot="each-item">
                <p style="text-align: center;">
                    {{ props.label }}
                </p>
                </template>
            </popup-radio>
            <!-- <cell title="紧急程度" class="require emDegree" @click.native="degreeClick" is-link >
                <slot name="value">
                    <span class="text_l_r">{{degreeName}}</span>
                </slot>
            </cell> -->

            <div v-transfer-dom>
            <popup v-model="show2">
                <popup-header
                    left-text="取消"
                    right-text="确定"
                    title="紧急程度"
                    :show-bottom-border="false"
                    @on-click-left="show2 = false"
                    @on-click-right="show2 = false">
                </popup-header>
                <group gutter="0">
                    <checklist title="" :max="1" label-position="left" required :options="degreeNames" v-model="degreeList" @on-change="degreeChange"></checklist>
                </group>
            </popup>
            </div>
            
            
            <datetime title="开始时间" :end-date="endDate" class="spacing require"  year-row="{value}年" month-row="{value}月" day-row="{value}日" placeholder="必选..." clear-text="创建时间" v-model="startDate" value-text-align="left"></datetime>
            <datetime title="结束时间" :start-date="startDate"  class="require"  year-row="{value}年" month-row="{value}月" day-row="{value}日" placeholder="必选..." clear-text="创建时间"  v-model="endDate" value-text-align="left"></datetime>
           
            <!-- <cell class="spacing" title="上传附件" value="上传..." is-link ></cell> -->
            <attachUpload class="spacing" :param="attachInfoParam" v-if="attachInfoParam.businessId" ref="uploadCompoment"></attachUpload>

            <popup-picker class="spacing" title="提醒" :data="list3" popup-title="提醒" @on-show="showCli"  @on-hide="hideCli" :columns="4" v-model="remained"></popup-picker>
            
            <cell title="被提醒人" @click.native="onClick" is-link >
                <slot name="value">
                    <span class="text_l_r">{{remainedName}}</span>
                </slot>
            </cell>

            <div v-transfer-dom>
                <alert v-model="showAlert">{{this.alertContent}}</alert>
            </div>

            <div v-transfer-dom>
            <popup v-model="show1">
                <popup-header
                    left-text="取消"
                    right-text="确定"
                    title="被提醒人"
                    :show-bottom-border="false"
                    @on-click-left="show1 = false"
                    @on-click-right="show1 = false">
                </popup-header>
                <group gutter="0">
                    <checklist title="" label-position="left" required :options="commonList" v-model="checklist" @on-change="change"></checklist>
                </group>
            </popup>
            </div>
            <x-textarea class="spacing" title="任务描述" v-model="taskDescription"
                :max="2500"
                :rows="3"
                placeholder="输入...">
            </x-textarea>
        </group>
            </div>
        <!--底部导航栏组件调用-->
        <footer-view
            :footerList = "footerList"
            @preservation = "preservation">
        </footer-view>

        <selectUser v-if="showUserSelect"
                    :selectedList='userList'
                    :showType='showType'
                    :active='active'
                    selectedKey='nodeId'
                @closeSelect="closeSelectUser()" @setResult="getSelectedUsersData"></selectUser>
        <!-- </scroller> -->
        <!--进度条-->
        <div class="projectProgress" v-if="popupRangeShow">
            <div class="progress-mask" style=""></div>
            <!--<x-dialog v-model="popupRangeShow" class="dialog-popupRange">-->
            <div class="dialog-popupRange">
                <div class="title" >
                    <div class="cancel" @click="dialogProgressColse">取消</div>
                    <span>任务进度</span>
                    <span class="ok" @click="dialogProgressColseOK">完成</span>
                </div>
                <div style="margin-top: 20px;text-align: center">{{curProgress}}%</div>
                <div style="margin-top: 50px;width: 95%;">
                    <range v-model="curProgress"  @on-change="onChange" minHTML="0%" maxHTML="100%" :range-bar-height="4"></range>
                </div>
            <!--</x-dialog>-->
            </div>
        </div>
    </div>
</template>
<script>
import timeData from '@mobile/pages/m_task/js/timeData.js'
import attachUpload from '../../../components/attachUpload.vue'
import selectUser from '@mobile/components/select/m_select.vue'
import {GroupTitle, Group,Alert,AlertModule, TransferDom, XButton, Popup, PopupHeader, Range, Cell,Checklist, Scroller, XInput,PopupRadio , Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch} from 'vux'
import footerView from '@mobile/components/m_public/m_footer.vue'

import {getCreateTaskId,getProjectListById,saveCreateTask,getUserListByProjectId} from '@mobile/pages/m_task/getData'
//关联项目接口
import { getProjectDetailForProject } from '@mobile/pages/m_project/detailService'

export default {
    directives: {
        TransferDom
    },
    components: {
        Group,
        GroupTitle,
        Cell,
        XInput,
        Selector,
        TransferDom,
        PopupPicker,
        Popup,
        PopupHeader,
        XAddress,
        Datetime,
        XNumber,
        XTextarea,
        XSwitch,
        XButton,
        Scroller,
        PopupRadio,
        Checklist,
        Range,
        attachUpload,
        selectUser,
        footerView,
        Alert,
        AlertModule
    },
    mounted(){
        $(".demo4-slot").next().addClass('degreeDiv');
        document.title = '创建任务'
        //根据项目id获取项目详情
        if (this.projectId) {
            this.getProjectInfo()
        }
        this.list3=timeData;
        this.taskLiableId = this.$store.state.session.sid;
        this.taskLiableName = this.$store.state.session.name;
        this.getCreateTaskId();
        //初始化获取关联项目list
        this.getlistProjectListById(this.taskLiableId);

        let obj = {
            "sid":this.$store.state.session.sid,
            "name":this.$store.state.session.name,
            "imUserId":this.$store.state.session.userIdIM,
            'newname':this.$store.state.session.name
        }

        this.formData.projectCreatePersonId=this.$store.state.session.sid;
        this.formData.projectCreatePersonName=this.$store.state.session.name;
        this.formData.projectCreatePersonImId=this.$store.state.session.userIdIM;
        this.formData.projectCreatePersonDeptId=this.$store.state.session.parentRealityId;

        this.formData.projectResponsiblePersonId=this.$store.state.session.sid;
        this.formData.projectResponsiblePersonName=this.$store.state.session.name;
        this.formData.projectResponsiblePersonImId=this.$store.state.session.userIdIM;
        this.formData.projectResponsiblePersonDeptId=this.$store.state.session.parentRealityId;

        this.projectResponsibleList.push(obj)
    },
    created(){
      this.projectId = this.$route.query.projectId  //从路由获取参数：项目id
      if(this.projectId==undefined){
          this.readonly=false;
          this.proReadonly=false;
      }else{
          this.readonly=true;
          this.proReadonly=true;
      };

      if(this.projectId){
            this.chargeArr=[{
              "code":"person",
              "multi" : false,
              'serviceName':'GLOBAL.YANG_NING',
              'url':"/project/projectTeamPerson/queryProjectTeamPersonByProjectId/"+this.projectId,
              'ajaxType':'get'  
            }];
        }
    },
    methods:{
        showCli(){
            console.log('展开',this.remained);
            if(this.remained[0]=="到期日前"){
                this.remained.splice(0,1,'提醒');
            }
            console.log(this.remained);
        },
        hideCli(){
            console.log('关闭',this.remained);
            if(this.remained[0]=="提醒"){
                this.remained.splice(0,1,'到期日前');
                this.popupValue="0";
                this.checklist=this.copyChecklist;
            }else if(this.remained[0]=="不提醒"){
                this.popupValue="1";
                this.copyChecklist=this.checklist;
                this.checklist=[];
            }
            console.log(this.remained);
        },
        //根据项目获取人员
        async getUserListByProjectIdData ( projectId = '' ){
          let res = await getUserListByProjectId( projectId )
          console.info('人员树',res[0])
        },
        peopleTree(){
            this.getUserListByProjectIdData(this.projectId);
            this.chargeArr=[{
              "code":"person",
              "multi" : false,
              'serviceName':'GLOBAL.YANG_NING',
              'url':"/project/projectTeamPerson/queryProjectTeamPersonByProjectId/"+this.projectId,
              'ajaxType':'get'  
            }];
        },
        //选人

getSelectedUsersData(selectUserDatas){
                if(this.curUserSelectType=="projectResponsiblePerson"){
                    this.formData.projectResponsiblePersonId=selectUserDatas.length>0?selectUserDatas[0].sid : "";
                    this.formData.projectResponsiblePersonName=selectUserDatas.length>0?selectUserDatas[0].newname : "";
                    this.formData.projectResponsiblePersonImId=selectUserDatas.length>0?selectUserDatas[0].imUserId : "";
                    this.formData.projectResponsiblePersonDeptId=selectUserDatas.length>0?selectUserDatas[0].parentId : "";
                    this.projectResponsibleList = [...selectUserDatas];
                    this.taskLiableId=this.formData.projectResponsiblePersonId;
                    this.taskLiableName=this.formData.projectResponsiblePersonName;
                    if(this.taskLiableId){
                        this.getlistProjectListById(this.taskLiableId);
                    }else{
                        return false;
                    } 
                }else if(this.curUserSelectType=="projectParticipantPerson"){
                    this.formData.projectParticipantPersonList="";
                    this.projectParticipantPersonList=[];
                    this.projectParticipantPersonList = [...selectUserDatas];
//                    console.log(this.projectParticipantPersonList,"this.projectParticipantPersonList")
                    this.projectParticipantPersonList.map(item=>{
                        console.log(item.hasOwnProperty('isOut'))
                        if(!(item.hasOwnProperty('isOut'))){
                            if(item.type == 'user'){
                                item.isOut = 0;
                            }else if(item.type == 'external'){
                                item.isOut = 1;
                            }
                        }

                    });
                    selectUserDatas.forEach((item,index)=>{
                        this.formData.projectParticipantPersonList=this.formData.projectParticipantPersonList+item.newname+" ";
                    })
                }else  if(this.curUserSelectType=="projectSharePerson"){
                    this.formData.projectSharePersonList="";
                    this.projectSharePersonList=[];
                    this.projectSharePersonList = [...selectUserDatas];
                    this.projectSharePersonList.map(item=>{
                        if(!(item.hasOwnProperty('isOut'))){
                            if(item.type == 'user'){
                                item.isOut = 0;
                            }else if(item.type == 'external'){
                                item.isOut = 1;
                            }
                        }
                    });
                    selectUserDatas.forEach((item,index)=>{
                        let newname = item.name||item.roleName
                        this.formData.projectSharePersonList=this.formData.projectSharePersonList+newname+" ";
//                        this.projectSharePersonList.push({
//                            sid:item.sid,
//                            name:item.name,
//                        })
                    })
                }
                // this.userList = item;
                // console.log("item:",selectUserDatas);
            },
            closeSelectUser(){
                this.showUserSelect=false;
            },
            handleShowUserSelect(selectType){
                this.curUserSelectType=selectType;
                this.userList = [];
                if(this.curUserSelectType=="projectResponsiblePerson"){//单选  负责人
                    if(this.chargeArr.length>0){
                        this.showType=this.chargeArr;
                    }else{
                        this.showType = [{"code":"person","multi" : false}];
                    }
//                    this.userList = [...this.projectResponsibleList];
                    this.projectResponsibleList.forEach( element =>{
                        this.userList.push({
                            type : 'user',
                            sid : element.sid,
                            key : 'sid',
                            name:element.newname,
                            newname : element.newname,
                            imUserId:element.imUserId,
                            parentId:element.parentId,
                        })
                    })
                }else if(this.curUserSelectType=="projectParticipantPerson"){//多选  参与人
                    this.showType = [{
                        "code":"person",
                        "multi" : true,
                        'serviceName':'',
                        'url':"",
                        'ajaxType':'post'
                        },{"code":"external","multi" : true}];
                    console.log('showType',this.showType);
                    console.log('参与人',this.projectParticipantPersonList);
                    this.projectParticipantPersonList.forEach( element =>{
//                        let type = element.type == "external" ? "user" : element.type;
                        this.userList.push({
                            type : element.type,
                            sid : element.sid,
                            key : 'sid',
                            name:element.newname,
                            newname : element.newname,
                            imUserId:element.imUserId,
                            parentId:element.parentId,
                            isOut:element.type == "external"?1:0,
                        })
                    })
                }else if(this.curUserSelectType=="projectSharePerson"){//多选  共享人
                    this.showType = [{
                        "code":"person",
                        "multi" : true,
                        'serviceName':'',
                        'url':"",
                        'ajaxType':'post'},{"code":"external","multi" : true},{"code":"dept", "typeCode" : false,"multi" : true},{"code":"role","multi" : true}];
//                    this.userList = [...this.projectSharePersonList];
                    this.projectSharePersonList.forEach( element =>{
//                        let type = element.type == "external" ? "user" : element.type;
                        this.userList.push({
                            type : element.type || 'role',
                            sid : element.sid || element.roleId,
                            key : 'sid',
                            name:element.newname,
                            newname : element.newname,
                            imUserId:element.imUserId,
                            parentId:element.parentId,
                            isOut:element.type == "external"?1:0,
                        })
                    })
                }
                this.showUserSelect=true;
            },
        //进度条
        handleShowProgress(){
            this.popupRangeShow=true;
        },
        dialogProgressColse(){
            this.popupRangeShow=false;
        },
        dialogProgressColseOK(){
            this.popupRangeShow=false;
            this.taskProgress=this.curProgress+"%";
        },
        onChange(val){
            console.log(val);
        },
        //获取项目详情
        async getProjectInfo(){
          let res = await getProjectDetailForProject( this.projectId )
          console.info("res",res[0])
          this.projectName = res[0]['projectName']

          this.projectNames.push({key:this.projectId,value:this.projectName});

        },
        //变化取值
        change (val, label) {
            console.log('change', val, label)
            this.remainList=[];
            this.remainList.push(label);
            this.remainedName = label.join(" ");
        },
        //紧急程度取值
        degreeChange(val, label) {
            console.log('change', val, label)  
            this.degreeName= label.join(" ");
        },
        //新建任务
        async saveCreateTaskData(params){
            let res = await saveCreateTask(params);
            console.info('新建任务返回值',res[0])
            let attachDataInfo = await this.$refs.uploadCompoment.saveAttachFn();
            AlertModule.show({
                content: '基本信息保存成功!'
            })
            setTimeout(() => {
                AlertModule.hide()
            }, 3000)
            this.$router.back(-1);
        },
        //获取新建任务的id
        async getCreateTaskId(){
            let res = await getCreateTaskId();
            console.info('新建任务',res[0])
            if (Object.keys(res[0]).length != 0) {
                this.taskId = res[0].taskId;
                this.app = res[0].app;
                this.businessType = res[0].businessType;
                this.attachInfoParam = {
                    appId: this.app,
                    categoryId: this.businessType,
                    businessId : this.taskId
                };
            }
        },
        //根据人员id获取项目list
        async getlistProjectListById ( sid = '' ){
          let res = await getProjectListById( sid )
          console.info(res[0])
          if (res[0].length > 0) {
            this.projectList = [...res[0]];
            this.projectList.forEach(item => {
                this.projectNames.push({key:item.sid,value:item.projectName});
            });
          }else{
            this.projectNames.push({key:'',value:"暂无数据"});
            this.projectId="";
            this.proReadonly=true;
          }
          console.info('项目list',this.projectList)
        },
        //保存
        preservation(){
            //获取项目名称
            this.projectNames.forEach(item => {
                if(item.key==this.projectId){
                    this.projectName=item.value;
                }
            });

            if(!this.taskName){
                AlertModule.show({
                    content: '任务名称不能为空!'
                })
                setTimeout(() => {
                    AlertModule.hide()
                }, 3000)
                return ;
                // this.alertContent="任务名称不能为空";
                // this.showAlert=true;
                // return
            }

            var patt = /^[^/&'<>%*?:|\\]*$/;
            if(!patt.test(this.taskName)){
                AlertModule.show({
                    content: '任务名称存在不合法字符!'
                })
                setTimeout(() => {
                    AlertModule.hide()
                }, 3000)
                return ;
            }

            if(!this.taskLiableName){
                AlertModule.show({
                    content: '负责人不能为空!'
                })
                setTimeout(() => {
                    AlertModule.hide()
                }, 3000)
                return ;
                // this.alertContent="负责人不能为空";
                // this.showAlert=true;
                // return
            }

            if(!this.degreeName){
                AlertModule.show({
                    content: '紧急程度不能为空!'
                })
                setTimeout(() => {
                    AlertModule.hide()
                }, 3000)
                return ;
                // this.alertContent="紧急程度不能为空";
                // this.showAlert=true;
                // return
            }

            if(!this.startDate){
                AlertModule.show({
                    content: '开始时间不能为空!'
                })
                setTimeout(() => {
                    AlertModule.hide()
                }, 3000)
                return ;
                // this.alertContent="开始时间不能为空";
                // this.showAlert=true;
                // return
            }

            if(!this.endDate){
                AlertModule.show({
                    content: '结束时间不能为空!'
                })
                setTimeout(() => {
                    AlertModule.hide()
                }, 3000)
                return ;
                // this.alertContent="结束时间不能为空";
                // this.showAlert=true;
                // return
            }

            //提醒判断取值
            if(this.remained[0]=="不提醒"){
                this.advanceTime='-1';
                this.remindTime='';
            }else if(this.remained[0]=="到期日前"){ 
                let dayStr=this.remained[1];
                if(dayStr=="当天"){
                    dayStr=0;
                }else{
                    dayStr=parseInt(dayStr.replace("天",""));
                }
                console.log('advanceTime提前时间',dayStr);

                let spot=this.remained[2];
                let numSpot=spot.replace("点","");
                if(numSpot<10){
                    spot='0'+spot;
                }
                spot=spot.replace("点",":");

                let minu=this.remained[3];
                minu=minu.replace("分","");

                console.log('remindTime提醒时间',spot+minu);
                this.advanceTime=dayStr;
                this.remindTime=spot+minu;
            }else if(this.remained.length==0){
                this.advanceTime=0;
                this.remindTime="09:00";
            }
            
            if(this.checklist.indexOf("创建人") > -1){
                this.isremindCreateperson=true;
            }
            if(this.checklist.indexOf("负责人") > -1){
                this.isremindLiable=true;
            }
            if(this.checklist.indexOf("参与人") > -1){
                this.isremindAffiliated=true;
            }
            this.betweenDate=[this.startDate ,this.endDate];
            let taskUrgentFlag='';
            if(this.degreeName=="正常"){
                taskUrgentFlag="0";
            }else if(this.degreeName=="紧急"){
                taskUrgentFlag="1";
            }else if(this.degreeName=="非常紧急"){
                taskUrgentFlag="2";
            }; 

            this.projectParticipantPersonList.forEach((item)=>{
                this.taskParticipantsSharedListDto.personList.push({
                    outType: item.type == "user" ? "0": "1",
                    sharedshowId: item.sid,
                    sharedshowImid: item.imUserId,
                    sharedshowName: item.name
                })
            })

            this.projectSharePersonList.forEach((item)=>{
                if(item.selectType=="dept"){
                    this.taskSharedListDto.departmentList.push({
                        sharedshowId: item.sid,
                        sharedshowName: item.name
                    });
                }else if(item.selectType=="role"){
                    this.taskSharedListDto.roleList.push({
                        sharedshowId: item.roleId,
                        sharedshowName: item.roleName,
                    });
                }else{
                     this.taskSharedListDto.personList.push({
                        outType: item.type == "user" ? "0": "1",
                        sharedshowId: item.sid,
                        sharedshowName: item.name,
                        sharedshowImid: item.imUserId
                    });
                }
            })
           let params={
                advanceTime: this.advanceTime,
                app: this.app,
                betweenDate: this.betweenDate,
                beginDate:this.betweenDate[0] !=="" ? this.betweenDate[0]+' 00:00:00' : '',
                endDate:this.betweenDate[1] !=="" ? this.betweenDate[1]+' 23:59:59' : '',
                businessType: this.businessType,
                describe: this.taskDescription,
                fileList: "",//附件上传，发给后端的，作废
                isremindAffiliated: this.isremindAffiliated,
                isremindCreateperson: this.isremindCreateperson,
                isremindLiable: this.isremindLiable,
                projectId: this.projectId,
                projectName: this.projectName=="暂无数据"?"":this.projectName,
                projectstageId:'',//关联项目的阶段id
                projectstageName:'',//关联项目的阶段
                remindTime: this.remindTime,
                taskId: this.taskId,
                taskLiableId: this.taskLiableId,
                taskLiableName:this.taskLiableName,
                taskName: this.taskName,
                taskParticipantsSharedListDto:this.taskParticipantsSharedListDto,
                taskProgress: this.taskProgress?this.taskProgress.replace("%",""):this.taskProgress,//进度
                taskSharedListDto:this.taskSharedListDto,
                taskUrgentFlag:taskUrgentFlag,
                warmListSelected:[+this.isremindCreateperson ? 0:'', +this.isremindLiable ? 1:'',+this.isremindAffiliated  ? 2:''],//提醒人
            };
            console.log(params);
            this.saveCreateTaskData(params);
        },
        onClick(){
            if(this.popupValue=="1"){
                return false;
            }else{
                this.show1=true;
            }
        },
        degreeClick(){
            this.show2=true;
        },
    },
    data(){
        return{
            popupValue:"0",
            copyChecklist:[],
            chargeArr:[],
            readonly:false,
            proReadonly:false,
            popupRangeShow:false,
            showType:[{"code":"person","multi" : false}],
            active : "person",
            formData:{
                projectName:"",
                projectStart:"",
                projectEnd:"",

                projectCreatePersonId:"",
                projectCreatePersonName:"",
                projectCreatePersonImId:"",
                projectCreatePersonDeptId:"",

                projectResponsiblePersonId:"",
                projectResponsiblePersonName:"",
                projectResponsiblePersonImId:"",
                projectResponsiblePersonDeptId:"",

                projectParticipantPersonList:"",
                projectSharePersonList:"",


                projectProgressBar:"",
                projectLevel:0,
                projectNetDisk:false,
                projectCommunication:false,
                projectDesc:""
            },
            userList:[],//选中的人员
            showUserSelect:false,
            curUserSelectType:"",
            projectResponsibleList:[],
            projectParticipantPersonList:[],  //向后端传的
            projectSharePersonList:[],         //向后端传的
            attachInfoParam:{},
            advanceTime:'',
            remindTime:'',
            show1: false,
            show2: false,
            showAlert:false,
            alertContent:"",
            checklist: ['创建人'],
            remainList:[],
            remainedName:'',
            commonList: [ '创建人', '负责人', '参与人' ],
            taskId:'',//任务id，业务id
            app:'',
            businessType:'',
            taskLiableId:'',//登录人id
            taskLiableName:'',//登录人姓名
            taskName: '',
            projectName:'',
            projectId:'',
            projectList:[],
            projectNames: [],
            degreeList: ['正常'],
            degreeName:'正常',
            degreeNames: ['正常','紧急','非常紧急'],
            betweenDate:[],
            startDate: '',
            endDate: '',
            list3:[],
            remained: ['到期日前','当天','9点','00分'],
            taskDescription:'',
            isremindCreateperson:false,//创建人
            isremindLiable:false,//负责人
            isremindAffiliated:false,//参与人
            taskProgress:'0%',
            curProgress:0,
            taskParticipantsSharedListDto:{//参与人
                personList: []
            },
            taskSharedListDto:{//共享人
                personList:[],
                roleList:[],
                departmentList:[]
            },
            footerList:[{
              name:'保存',
              value:'preservation',
            }],//底部固定导航栏
        }
    },
}
</script>
<style scoped lang="scss">
.rangeDiv{width: 100%; height: 180px; background: #fff; position: fixed; bottom: 0px; left: 0px;}
.headerBtn{height: 50px; width: 100%; box-shadow: inset 0 0 0 0 #EBEBEB;}
.headerBtn span{width: 32%; height: 50px; line-height: 50px; display: inline-block; text-align: center;}
.vux-range-input-box{margin-top: 32px; margin-right: 50px !important;}
.weui-cell{
    padding: 13px 15px;
    background: #fff;
    .vux-label{
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #191919;
        letter-spacing: 0;
    }   
}
.demo3-slot {
  text-align: center;
  padding: 14px 0;
  color: #888;
}
.demo4-slot {
  text-align: center;
  padding: 14px 0;
  color: #888;
}
</style>
<style  lang="scss">
@import '../../../static/css/m_crm_add.scss';
    .degreeDiv .weui-cell__bd{flex:0.9 !important; padding-left:36px;}
    .degreeDiv .weui-cell__ft{width: 0px !important; padding-left:0px;}
    .degreeDiv .weui-check__label{padding:10px 20px !important;}
    
    .m_create_task{
        font-family: PingFangSC-Medium;
        display: block;
        height: auto;
        .formContain{
            position: absolute;
            top: 0px;
            left: 0px;
            overflow: auto;
            bottom: 50px;
            width: 100%;
        }
        
        .weui-cell{margin-top: 0px;}
        .weui-cell_access .weui-cell__ft:after{
            margin-right: -7px;
        }
        input::-webkit-input-placeholder{color: #CCCCCC;}
        input::-moz-placeholder{color: #CCCCCC;}
        input:-moz-placeholder{ color: #CCCCCC;}
        input:-ms-input-placeholder{ color: #CCCCCC;}
        .vux-cell-value{
          display: inline-block;
          float: right;
          text-align: left;
          // float: right;
          color: #666666;
        }
        .vux-cell-placeholder{
            float: right;
            font-size: 16px;
            color: #CCCCCC;
            letter-spacing: 0;
            text-align: center;
        }
        .spacing{
            margin-top:8px;
        }
        .bottomBtn{
            display: block;
            position: fixed;
            left: 0px;
            bottom: 0px;
            /*box-shadow: inset 0 0 0 0 #CCCCCC;*/
            width:100%;
            height: 50px;
            /*line-height:50px;*/
            font-size: 16px;
            color: #009EFF;
            text-align: center;
            background: white;
        }

        .weui-cells{
            margin-top: 0px;
            background:#F0F2F3;
        }
        .emDegree .vux-cell-bd p{width: 5.5em;}
        .emDegree .vux-cell-bd p .vux-label{width: 5.5em !important;}
        .weui-label{
            font-size: 16px;
            color: #191919;
            letter-spacing: 0;
            
            width: 4.5em;
            text-align: left;
            margin-right: 2em;
        }
        .vux-label{
            font-size: 16px;
            color: #191919;
            letter-spacing: 0;

            width: 4.5em;
            text-align: left;
            margin-right: 2em;
        }
        .require .vux-label:after{
            content: '*';
            color: $theme-red;
        }
        .require .weui-label:after{
            content: '*';
            color: $theme-red;
        }
        .vux-datetime p:after{
            content: '*';
            color: $theme-red;
        }
        .weui-cell__ft{
            font-size: 16px;
            color: #666666;
            letter-spacing: 0;

        }
        .weui-input{
            text-align:right;
            font-size: 16px;
            color: #666666;
            letter-spacing: 0;
        }
        .projectProgress{
            .progress-mask{
                position: fixed;
                z-index: 1000;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
            }
            .dialog-popupRange{
                bottom: 0;
                width: 100%;
                max-width: 100%;
                left: 0;
                position: fixed;
                z-index: 1000;
                background: white;
                height: 200px;
            }
            .title{
                text-align: center;
                height: 50px;
                line-height:50px;
                border-bottom: 1px #EBEBEB solid;
                color: #999999 ;
                .cancel{float:left;margin-left: 10px}
                .ok{float: right;margin-right: 10px;color: #009EFF}
            }
        }
    }
</style>

