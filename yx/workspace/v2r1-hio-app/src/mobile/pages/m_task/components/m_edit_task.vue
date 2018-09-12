<template>
    <div class="m_edit_task">
        <!-- <scroller lock-x height="100%"> -->
        <div class="formContain" >
            <group  label-align="left">
                <x-input  class="require" :readonly="readonly" title="任务名称" :required="true" v-model="taskName" placeholder="必填...">
                </x-input>
                
                <popup-radio title="关联项目" :readonly="readonly" class="popupRadio" placeholder="输入..." :options="projectNames" @on-hide="peopleTree" v-model="projectId">
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

                <cell class="spacing" :readonly="readonly" title="任务进度" v-on:click.native="handleShowProgress" is-link
                          v-model="taskProgress"><span v-if="taskProgress==''">选择...</span></cell>
                <cell title="任务状态" class="" :readonly="readonly" :value="state"></cell>

                <popup-radio title="紧急程度" :readonly="readonly" class="popupRadio require emDegree" placeholder="必选..." :options="degreeNames" v-model="degreeName">
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
                
                <datetime title="开始时间" readonly  v-if="dateShow" class="spacing require"  year-row="{value}年" month-row="{value}月" day-row="{value}日" placeholder="必选..." clear-text="创建时间" v-model="startDate" value-text-align="left"></datetime>
                <datetime title="结束时间" readonly  v-if="dateShow" class="require"  year-row="{value}年" month-row="{value}月" day-row="{value}日" placeholder="必选..." clear-text="创建时间"  v-model="endDate" value-text-align="left"></datetime>
                <datetime title="开始时间" :end-date="endDate" v-if="!dateShow" class="spacing require"  year-row="{value}年" month-row="{value}月" day-row="{value}日" placeholder="必选..." clear-text="创建时间" v-model="startDate" value-text-align="left"></datetime>
                <datetime title="结束时间" :start-date="startDate" v-if="!dateShow" class="require"  year-row="{value}年" month-row="{value}月" day-row="{value}日" placeholder="必选..." clear-text="创建时间"  v-model="endDate" value-text-align="left"></datetime>
               
               <attachUpload :param="attachInfoParam" v-if="attachInfoParam.businessId" maxUploadNum="1" ref="uploadCompoment"></attachUpload>

                <popup-picker  class="spacing" title="提醒" :data="list3" popup-title="提醒" :columns="4" v-model="remained" @on-show="showCli"  @on-hide="hideCli"></popup-picker>
                
                <div v-transfer-dom>
                    <alert v-model="showAlert">{{this.alertContent}}</alert>
                </div>

                <cell title="被提醒人" @click.native="onClick" is-link >
                    <slot name="value">
                        <span class="text_l_r">{{remainedName}}</span>
                    </slot>
                </cell>
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
               <!-- <x-textarea class="spacing" title="任务描述" v-model="taskDescription" placeholder="输入..." :rows="3"></x-textarea> -->
               <!-- <x-button class="bottom" @click.native="preservation">保存</x-button> -->
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
            @closeSelect="closeSelectUser()" @setResult="getSelectedUsersData">
        </selectUser>
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
        <!-- </scroller> -->
    </div>
</template>
<script>
import selectUser from '@mobile/components/select/m_select.vue'
import timeData from '@mobile/pages/m_task/js/timeData.js'
import attachUpload from '../../../components/attachUpload.vue'/*底部导航栏（操作）组件-局部引入*/
import footerView from '@mobile/components/m_public/m_footer.vue'

import {GroupTitle, Group,Alert,AlertModule, TransferDom, XButton, Popup, PopupHeader, Range, Cell,Checklist, Scroller, XInput,PopupRadio , Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch} from 'vux'
import {getCreateTaskId,getProjectListById,saveCreateTask,getTaskInfoById,updateTask,getUserListByProjectId} from '@mobile/pages/m_task/getData'
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
        document.title = '编辑任务'
        let taskId=this.$route.query.taskId;
        this.getTaskInfoByIdData({'taskId':taskId})
       
        this.list3=timeData;
        this.taskLiableId = this.$store.state.session.sid;
        this.taskLiableName = this.$store.state.session.name;

        // this.getCreateTaskId();
        //初始化获取关联项目list
        this.getlistProjectListById(this.taskLiableId)

        let obj = {
            "sid":this.$store.state.session.sid,
            "name":this.$store.state.session.name,
            "imUserId":this.$store.state.session.userIdIM
        }
        this.formData.projectCreatePersonId=this.$store.state.session.sid;
        this.formData.projectCreatePersonName=this.$store.state.session.name;
        this.formData.projectCreatePersonImId=this.$store.state.session.userIdIM;
        this.formData.projectCreatePersonDeptId=this.$store.state.session.parentRealityId;
        // this.projectResponsibleList.push(obj)
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
                    //权限判断
                    if (this.isCreatePersonLiable) { //创建人or负责人
                        this.showUserSelect = true;
                    } else if (this.isAffiliated) { //参与人
                        this.showUserSelect = false;
                    } else { //管理员
                        this.showUserSelect = true;
                    }

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
                    //权限判断
                    if (this.isCreatePersonLiable) { //创建人or负责人
                        this.showUserSelect = true;
                    } else if (this.isAffiliated) { //参与人
                        this.showUserSelect = false;
                    } else { //管理员
                        this.showUserSelect = true;
                    }

                    this.showType = [{
                        "code":"person",
                        "multi" : true,
                        'serviceName':'',
                        'url':"",
                        'ajaxType':'post'},{"code":"external","multi" : true}];
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
                    //权限判断
                    if (this.isCreatePersonLiable) { //创建人or负责人
                        this.showUserSelect = true;
                    } else if (this.isAffiliated) { //参与人
                        this.showUserSelect = true;
                    } else { //管理员
                        this.showUserSelect = true;
                    }

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
                // this.showUserSelect=true;
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
        //查询任务详情
        async getTaskInfoByIdData({taskId=''} = {} ){
            let res = await getTaskInfoById(taskId)
            console.info('任务详情',res[0])
            this.advanceTime=res[0].advanceTime;
            if(this.advanceTime !==-1){
                this.remained.push('到期日前')
                if(this.advanceTime=="0"){
                    this.remained.push('当'+'天')
                }else{
                    this.remained.push(this.advanceTime+'天')
                }
            }else{
                this.remained.push('不提醒')
            }
            // this.startDate=res[0].beginDate.replace(" 00:00:00","");
            this.startDate=res[0].beginDate.substring(0, 10);
            console.log("开始时间",this.startDate);
            this.createDate=res[0].createDate;
            this.createPersonName=res[0].createPersonName;
            this.taskDescription=res[0].describe;
            // this.endDate=res[0].endDate.replace(" 23:59:59","");
            this.endDate=res[0].endDate.substring(0, 10);
            console.log("结束时间",this.endDate);
            this.isAffiliated=res[0].isAffiliated;
            
            this.isCreatePersonLiable=res[0].isCreatePersonLiable;
            this.isShared=res[0].isShared;
            this.isfollow=res[0].isfollow;

            if(this.isCreatePersonLiable){//创建人or负责人
                this.readonly=false;
                this.dateShow=false;
            }else if(this.isAffiliated){//参与人
                this.readonly=true;
                this.dateShow=true;
            }else{//管理员
                this.readonly=false;
                this.dateShow=false;
            }

            
            this.isremindCreateperson=res[0].isremindCreateperson;//创建人
            if(this.isremindCreateperson){
                this.checklist.push("创建人");
            }
            this.isremindLiable=res[0].isremindLiable;//负责人
            if(this.isremindLiable){
                this.checklist.push("负责人");
            }
            this.isremindAffiliated=res[0].isremindAffiliated;//参与人
            if(this.isremindAffiliated){
                this.checklist.push("参与人");
            }
            this.projectId=res[0].projectId;
            if(this.projectId){
                this.chargeArr=[{
                    "code":"person",
                    "multi" : false,
                    'serviceName':'GLOBAL.YANG_NING',
                    'url':"/project/projectTeamPerson/queryProjectTeamPersonByProjectId/"+this.projectId,
                    'ajaxType':'get'  
                    }];
            }
            this.projectName=res[0].projectName;

            console.log(res[0].projectstageId);//关联项目的阶段id
            console.log(res[0].projectstageName);//关联项目的阶段
            this.remindTime=res[0].remindTime;

            // let index = this.remindTime.indexOf(":");
            if(this.advanceTime !==-1){
                if(this.remindTime.length<5){
                    this.remindTime="0"+this.remindTime;
                    this.remained.push(this.remindTime.substring(1,2)+'点')
                    this.remained.push(this.remindTime.substring(this.remindTime.length-2)+'分')
                }else if(this.remindTime.length>=5){
                    this.remained.push(this.remindTime.substring(0,2)+'点')
                    this.remained.push(this.remindTime.substring(this.remindTime.length-2)+'分')
                }
            }
            this.taskId=res[0].taskId;
            this.attachInfoParam = {
                'appId': 1,
                'categoryId': 1,
                'businessId' : this.taskId
            };
            this.taskLiableId=res[0].taskLiableId;
            this.taskLiableName=res[0].taskLiableName,
            this.formData.projectResponsiblePersonId=this.taskLiableId;
            this.formData.projectResponsiblePersonName=this.taskLiableName;
            this.projectResponsibleList.push({
                "sid":this.taskLiableId,
                "name":this.taskLiableName,
            })

            this.formData.projectResponsiblePersonName = this.taskLiableName;//数据回显
            this.projectResponsibleList=[];
            this.projectResponsibleList.push({
                sid : this.taskLiableId,
                name:this.taskLiableName,
                newname : this.taskLiableName
            });
            // this.formData.projectResponsiblePersonImId=this.$store.state.session.userIdIM;
            // this.formData.projectResponsiblePersonDeptId=this.$store.state.session.parentRealityId; 

            this.taskName=res[0].taskName;
            this.taskParticipantsSharedListDto=res[0].taskParticipantsSharedListDto;
            // this.projectParticipantPersonList=this.taskParticipantsSharedListDto.personList;

            console.log('编辑参与人',this.projectParticipantPersonList);
            this.projectParticipantPersonList=[];
            this.taskParticipantsSharedListDto.personList.forEach((item)=>{//参与人111
                this.formData.projectParticipantPersonList=this.formData.projectParticipantPersonList+item.sharedshowName+" ";
                if(item.outType == "0"){
                    this.projectParticipantPersonList.push({
                        type:'user',
                        sid: item.sharedshowId,
                        imUserId:item.sharedshowImid,
                        name:item.sharedshowName,
                        newname:item.sharedshowName,
                    })
                }else if(item.outType == "1"){
                    this.projectParticipantPersonList.push({
                        type:'external',
                        sid: item.sharedshowId,
                        imUserId:item.sharedshowImid,
                        newname:item.sharedshowName,
                        name:item.sharedshowName,
                    })
                }
            })
            if(res[0].taskProgress==null || res[0].taskProgress==""){
                this.taskProgress=0+'%';//进度
            }else{
                this.taskProgress=res[0].taskProgress+'%';//进度
            }
            
            this.curProgress = parseInt(res[0].taskProgress);

            this.taskSharedListDto=res[0].taskSharedListDto;
            console.log('gongxiangren',this.taskSharedListDto);
            this.projectSharePersonList=[];
            this.taskSharedListDto.departmentList.forEach((item)=>{//部门111
                this.projectSharePersonList.push({
                    type : 'dept',
                    selectType:"dept",
                    sid : item.sharedshowId,
                    name:item.sharedshowName,
                    newname:item.sharedshowName,
                })
            })
            this.taskSharedListDto.roleList.forEach((item)=>{//角色111
                this.projectSharePersonList.push({
                    selectType:'role',
                    roleId : item.sharedshowId,
                    roleName:item.sharedshowName,
                    newname:item.sharedshowName,
                })
            })
            // this.projectSharePersonList=this.taskSharedListDto.personList;//人员
            this.taskSharedListDto.personList.forEach((item)=>{
                this.projectSharePersonList.push({
                    type:item.type==0 ?"user":"external",
                    sid: item.sharedshowId,
                    imUserId:item.sharedshowImid,
                    name:item.sharedshowName,
                    newname:item.sharedshowName,
                })
            })
            this.projectSharePersonList.forEach((item)=>{//组合
                this.formData.projectSharePersonList=this.formData.projectSharePersonList+item.newname+" ";
            })
            
            if(res[0].taskStatus=="0"){
                this.state="未完成"
            }else if(res[0].taskStatus=="1"){
                this.state="已完成"
            }else if(res[0].taskStatus=="2"){
                this.state="已关闭"
            }else if(res[0].taskStatus=="3"){
                this.state="超期"
            }
            if(res[0].taskUrgentFlag=="0"){
                this.degreeName="正常";
                this.degreeList.push("正常")
            }else if(res[0].taskUrgentFlag=="1"){
                this.degreeName="紧急";
                this.degreeList.push("紧急")
            }else if(res[0].taskUrgentFlag=="2"){
                this.degreeName="非常紧急";
                this.degreeList.push("非常紧急")
            }
            // this.degreeName=res[0].taskUrgentFlag;
            
            // this.formData.projectName=res[0].taskName;//项目名称
            // this.formData.projectStage=res[0].projectstageName;//项目阶段
            // this.formData.chargePerson=res[0].taskLiableName;//负责人
            // this.formData.participants=res[0].taskParticipantsSharedListDto;//参与人
            // //参与人处理
            // if(this.formData.participants){
            //     let personList = this.formData.participants.personList;
            //     if(personList){
            //         if(personList.length>0){
            //             personList.forEach((n,i)=>{
            //                 this.formData.tsharePerson.push(n.sharedshowName);
            //             })
            //             this.formData.tshares = this.formData.tsharePerson.join(" ");
            //         }
            //     }
            // }
            // this.formData.sharedPerson=res[0].taskSharedListDto;//共享人
            // //共享人处理
            // if(this.formData.sharedPerson){
            //     let sharePersonList = this.formData.sharedPerson.personList;
            //     if(sharePersonList){
            //         if(sharePersonList.length>0){
            //             sharePersonList.forEach((n,i)=>{
            //                 this.formData.shaPerList.push(n.sharedshowName);
            //             })
            //             this.formData.shaPerson = this.formData.shaPerList.join(" ");
            //         }
            //     }
            // }
            // this.formData.progress=res[0].taskProgress;//任务进度
            // // this.state=res[0].taskStatus;//任务状态
            // if(res[0].taskStatus=="0"){
            //     this.formData.state="未完成"
            // }else if(res[0].taskStatus=="1"){
            //     this.formData.state="已完成"
            // }else if(res[0].taskStatus=="2"){
            //     this.formData.state="已关闭"
            // }else if(res[0].taskStatus=="3"){
            //     this.formData.state="超期"
            // }
            // // this.degree=res[0].taskUrgentFlag;//紧急程度
            // if(res[0].taskUrgentFlag=="0"){
            //     this.formData.degree="正常";
            // }else if(res[0].taskUrgentFlag=="1"){
            //     this.formData.degree="紧急";
            // }else if(res[0].taskUrgentFlag=="2"){
            //     this.formData.degree="非常紧急";
            // }
            // this.formData.startTime=res[0].beginDate;//开始时间
            // this.formData.endTime=res[0].endDate;//结束时间
            // this.formData.remind=res[0].remindTime.replace(":","时")+"分";//提醒
            // this.formData.remindPeople=res[0].createPersonName;//被提醒人
            // this.formData.textValue=res[0].describe;//被提醒人
        },
        //新建任务
        // async saveCreateTaskData(params){
        //     let res = await saveCreateTask(params);
        //     console.info('新建任务返回值',res[0])
        // },
        //编辑任务
        async updateTaskData(params){
            let res = await updateTask(params);
            console.info('编辑任务返回值',res[0])
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
                this.taskId = res[0].taskId
                this.app = res[0].app
                this.businessType = res[0].businessType
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
                spot=spot.replace("点",":");

                let minu=this.remained[3];
                minu=minu.replace("分","");

                console.log('remindTime提醒时间',spot+minu);
                this.advanceTime=dayStr;
                this.remindTime=spot+minu;
            }
            
            if(this.checklist.indexOf("创建人") > -1){
                this.isremindCreateperson=true;
            }else{
                this.isremindCreateperson=false;
            }
            if(this.checklist.indexOf("负责人") > -1){
                this.isremindLiable=true;
            }else{
                this.isremindLiable=false;
            }
            if(this.checklist.indexOf("参与人") > -1){
                this.isremindAffiliated=true;
            }else{
                this.isremindAffiliated=false;
            }
            this.betweenDate=[this.startDate ,this.endDate];
            let taskUrgentFlag='';
            if(this.degreeName=="正常"){
                taskUrgentFlag="0";
            }else if(this.degreeName=="紧急"){
                taskUrgentFlag="1";
            }else if(this.degreeName=="非常紧急"){
                taskUrgentFlag="2";
            }
            let taskStatus;
            if(this.state=="未完成"){
                taskStatus="0"
            }else if(this.state=="已完成"){
                taskStatus="1"
            }else if(this.state=="已关闭"){
                taskStatus="2"
            }else if(this.state=="超期"){
                taskStatus="3"
            }

           this.taskParticipantsSharedListDto.personList=[];
            this.projectParticipantPersonList.forEach((item)=>{//参与人111
                this.taskParticipantsSharedListDto.personList.push({
                    outType: item.type == "user" ? "0": "1",
                    sharedshowId: item.sid,
                    sharedshowImid: item.imUserId,
                    sharedshowName: item.name
                })
            })

            console.log('111111111111',this.projectSharePersonList);
            this.taskSharedListDto.departmentList=[];
            this.taskSharedListDto.roleList=[];
            this.taskSharedListDto.personList=[];
            this.projectSharePersonList.forEach((item)=>{
                if(item.selectType=="dept"){//部门111
                    this.taskSharedListDto.departmentList.push({
                        sharedshowId: item.sid,
                        sharedshowName: item.name
                    });
                }else if(item.selectType=="role"){//角色111
                    this.taskSharedListDto.roleList.push({
                        sharedshowId: item.roleId,
                        sharedshowName: item.roleName,
                    });
                }else if(item.type=="user"){
                     this.taskSharedListDto.personList.push({
                        outType: '0',
                        sharedshowId: item.sid,
                        sharedshowName: item.name,
                        sharedshowImid: item.imUserId
                    });
                }else if(item.type=="external"){
                     this.taskSharedListDto.personList.push({
                        outType: '1',
                        sharedshowId: item.sid,
                        sharedshowName: item.name,
                        sharedshowImid: item.imUserId
                    });
                }
            })
           let params={
                advanceTime: this.advanceTime,
                // app: this.app,
                betweenDate: this.betweenDate,
                beginDate:this.betweenDate.length > 0 ? this.betweenDate[0]+' 00:00:00' : '',
                endDate:this.betweenDate.length > 1 ? this.betweenDate[1]+' 23:59:59' : '',
                createDate:this.createDate,
                createPersonName:this.createPersonName,
                isAffiliated:this.isAffiliated,
                isCreatePersonLiable:this.isCreatePersonLiable,
                isShared:this.isShared,
                isfollow:this.isfollow,
                // businessType: this.businessType,
                describe: this.taskDescription,
                fileList: "",//附件上传，发给后端的，作废
                isremindAffiliated: this.isremindAffiliated,
                isremindCreateperson: this.isremindCreateperson,
                isremindLiable: this.isremindLiable,
                projectId: this.projectId,
                projectName: this.projectName,
                projectstageId:'',//关联项目的阶段id
                projectstageName:'',//关联项目的阶段
                remindTime: this.remindTime,
                taskId: this.taskId,
                taskLiableId: this.taskLiableId,
                taskLiableName:this.taskLiableName,
                taskName: this.taskName,
                taskParticipantsSharedListDto:this.taskParticipantsSharedListDto,
                taskStatus:taskStatus,
                taskProgress: this.taskProgress.replace("%",""),//进度
                taskSharedListDto:this.taskSharedListDto,
                taskUrgentFlag:taskUrgentFlag,
                warmListSelected:[+this.isremindCreateperson ? 0:'', +this.isremindLiable ? 1:'',+this.isremindAffiliated  ? 2:''],//提醒人
            };
            console.log(params);
            console.log(params.warmListSelected);
            if(this.isCreatePersonLiable==true){//是创建人or负责人
                this.updateTaskData(params);
            }else if(this.isAffiliated==true){//参与人
                const getParams = ['taskId','taskSharedListDto','taskSharedListDto','describe','advanceTime','remindTime']//设置可以更新的字段，回传后端
                let newParams = {}
                Object.keys(params).forEach((item)=>{
                    if (getParams.includes(item)) {
                    newParams[item] = params[item]
                    }
                })
                newParams = JZY.u.deepExtend({},newParams,{
                    isremindCreateperson:params.warmListSelected.indexOf(0) !== -1,
                    isremindLiable:params.warmListSelected.indexOf(1) !== -1,
                    isremindAffiliated:params.warmListSelected.indexOf(2) !== -1,
                })
                console.info(newParams)
                this.updateTaskData(newParams);
            }else{//管理员
                this.updateTaskData(params);
            }
            
        },
        handleShowProgress(){
            if(this.isCreatePersonLiable){//创建人or负责人
                this.readonly=false;
                this.dateShow=false;
                this.popupRangeShow=true;
            }else if(this.isAffiliated){//参与人
                this.readonly=true;
                this.dateShow=true;
                this.popupRangeShow=false;
            }else{//管理员
                this.readonly=false;
                this.dateShow=false;
                this.popupRangeShow=true;
            }
            // if(this.isAffiliated){
            //     this.popupRangeShow=false;
            // }else{
            //     this.popupRangeShow=true;
            // }
            
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
        onClick(){
            if(this.isCreatePersonLiable){//创建人or负责人
               if(this.popupValue=="1"){
                    return false;
                }else{
                    this.show1=true;
                }
            }else if(this.isAffiliated){//参与人
                if(this.popupValue=="1"){
                    return false;
                }else{
                    this.show1=true;
                }
            }else{//管理员
                if(this.popupValue=="1"){
                    return false;
                }else{
                    this.show1=true;
                }
            }
            // if(this.isAffiliated==true){
            //     return false;
            // }else{
            //     this.show1=true;
            // }
        },
        degreeClick(){
            if(this.isCreatePersonLiable){//创建人or负责人
               this.show2=true;
            }else if(this.isAffiliated){//参与人
                this.show2=false;
            }else{//管理员
                this.show2=true;
            }
        },
    },
    data(){
        return{
            copyChecklist:[],
            popupValue:"0",
            chargeArr:[],
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
            popupRangeShow:false,
            editableByRole:{//参与人可编辑的字段是：共享人、描述、提醒、附件
                taskName:false,
                projectName:false,
                projectstageName:false,
                taskLiableId:false,
                betweenDate:false,
                taskParticipantsSharedListDto:false,
                taskUrgentFlag:false,
                taskProgress:false,
            },
            readonly:false,
            dateShow:true,
            attachInfoParam:{},
            isfollow:false,
            isShared:false,
            isCreatePersonLiable:false,
            isAffiliated:false,
            createDate:'',
            createPersonName:'',
            advanceTime:'',
            remindTime:'',
            show1: false,
            show2: false,
            showAlert:false,
            alertContent:"",
            checklist: [],
            remainList:[],
            remainedName:'',
            commonList: [ '创建人', '负责人', '参与人' ],
            taskId:'',//任务id，业务id
            app:'',
            businessType:'',
            taskLiableId:'',//登录人id
            taskLiableName:'',//登录人姓名
            taskParticipantsSharedListDto:{//参与人
                personList: []
            },
            taskSharedListDto:{//共享人
                personList:[],
                roleList:[],
                departmentList:[]
            },
            taskName: '',
            projectName:'',
            projectId:'',
            projectList:[],
            projectNames: [],
            degreeList: [],
            degreeName:'',
            degreeNames: ['正常','紧急','非常紧急'],
            betweenDate:[],
            startDate: '',
            endDate: '',
            list3:[],
            remained: [],
            taskDescription:'',
            isremindCreateperson:false,//创建人
            isremindLiable:false,//负责人
            isremindAffiliated:false,//参与人
            state:'',
            taskProgress:'',
            curProgress:0,

            footerList:[{
              name:'保存',
              value:'preservation',
            }],//底部固定导航栏

        }
    }
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
    .m_edit_task{
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
        .weui-label{
            font-size: 16px;
            color: #191919;
            letter-spacing: 0;
            
            width: 4.5em;
            text-align: left;
            margin-right: 2em;
        }
        .emDegree .vux-cell-bd p{width: 5.5em;}
        .emDegree .vux-cell-bd p .vux-label{width: 5.5em !important;}
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
        .weui-cells_radio .weui-cell__ft{
            position: absolute;
            right:0.5rem;
        }
    }
</style>

