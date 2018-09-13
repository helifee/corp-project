<template>
    <div class="m_project_edit">
        <!--<scroller lock-x height="calc( 100% - 50px)">-->
        <div class="formContain" >
            <group  label-align="left" label-width="120px">

                <x-input  class="spacing require" title="项目名称"  :max="100" v-model="formData.projectName"  :required="true" placeholder="必填..." ></x-input>
                <datetime  title="开始时间" class=" require"  year-row="{value}年" month-row="{value}月" day-row="{value}日"
                          placeholder="必选..." clear-text="开始时间" v-model="formData.projectStart" value-text-align="left"></datetime>
                <datetime title="结束时间" class="require"  year-row="{value}年" month-row="{value}月" day-row="{value}日"
                          placeholder="必选..." clear-text="结束时间"  v-model="formData.projectEnd" value-text-align="left"></datetime>
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

                <cell class="spacing" title="项目进度" v-on:click.native="handleShowProgress" is-link
                      v-model="formData.projectProgressBar"><span v-if="formData.projectProgressBar==''">选择...</span></cell>
                <popup-radio title="紧急程度" class="popupRadio require" placeholder="必选..."
                             :options="projectLevels" v-model="formData.projectLevel">
                    <p slot="popup-header" class="m_project_popuRadio_head">紧急程度</p>
                </popup-radio>

                <!--<cell class="spacing" title="上传附件" value="上传..." is-link ></cell>-->
                <attachUpload :param="attachInfoParam" v-if="attachInfoParam.businessId" :maxUploadNum="1" ref="uploadCompoment"></attachUpload>

                <x-switch v-if="!isEdit" class="spacing" title="创建沟通群组" v-model="formData.projectNetDisk"></x-switch>
                <x-switch v-if="!isEdit" title="创建云盘文件夹" v-model="formData.projectCommunication"></x-switch>

                    <x-textarea class="spacing" v-model="formData.projectDesc"
                                title="项目描述"
                                :max="2500" placeholder="输入..."  :rows="3"></x-textarea>
            </group>
        </div>
        <!--</scroller>-->
        <x-button class="bottomBtn"  @click.native="handleSave">保存</x-button>
        <selectUser v-if="showUserSelect"
                    :selectedList='userList'
                    :showType='showType'
                    :active='active'
                    selectedKey='nodeId'
                @closeSelect="closeSelectUser()" @setResult="getSelectedUsersData"></selectUser>
        <!--<mPopupRange :popupRangeShow="projectProgressBarDialog"></mPopupRange>-->
        <!--进度条-->
        <div class="projectProgress" v-if="popupRangeShow">
            <div class="progress-mask" style=""></div>
            <!--<x-dialog v-model="popupRangeShow" class="dialog-popupRange">-->
            <div class="dialog-popupRange">
                <div class="title">
                    <div class="cancel" @click="dialogProgressColse">取消</div>
                    <span>项目进度</span>
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
    import selectUser from '@mobile/components/select/m_select.vue'
    // import mPopupRange from '@mobile/components/m_public/m_popup_range.vue'
    import {XDialog ,Range,GroupTitle, Group, XButton, Cell, Scroller, XInput,PopupRadio ,Selector, PopupPicker, Datetime, XTextarea, XSwitch,Alert,AlertModule} from 'vux'
    import attachUpload from '../../../components/attachUpload.vue'
    import {getProjectDetail,postProjectInfoSave} from '@mobile/pages/m_project/detailService.js'
    export default {
        components: {
            Group,
            GroupTitle,
            Cell,
            XInput,
            Selector,
            PopupPicker,
            Datetime,
            XTextarea,
            XSwitch,
            XButton,
            Scroller,
            PopupRadio,
            selectUser,
            attachUpload,
            XDialog,
            Range,
            Alert,
            AlertModule
        },
        mounted(){
            if(this.isEdit){
                document.title = '编辑项目'
                this.getDetail();

            }else{

                document.title = '创建项目'
                this.getAttach();
                let obj = {
                    "sid":this.session.sid,
                    "name":this.session.name,
                    "imUserId":this.session.userIdIM,
                    'newname':this.session.name
                };

                this.formData.projectCreatePersonId=this.session.sid;
                this.formData.projectCreatePersonName=this.session.name;
                this.formData.projectCreatePersonImId=this.session.userIdIM;
                this.formData.projectCreatePersonDeptId=this.session.parentRealityId;

                this.formData.projectResponsiblePersonId=this.session.sid;
                this.formData.projectResponsiblePersonName=this.session.name;
                this.formData.projectResponsiblePersonImId=this.session.userIdIM;
                this.formData.projectResponsiblePersonDeptId=this.session.parentRealityId;

                this.projectResponsibleList.push(obj)
            }


        },
        data(){
            return{
                queryData:{},
                data1:0,
                id:this.$route.params.id,
                session:this.$store.state.session,
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


                    projectProgressBar:"0%",
                    projectLevel:'0',
                    projectNetDisk:true,
                    projectCommunication:true,
                    projectDesc:""
                },
                userList:[],//选中的人员
                showUserSelect:false,
                curUserSelectType:"",
                projectResponsibleList:[],
                projectParticipantPersonList:[
                    //     {
                    //     outType: 0,
                    //     shareType: 0,
                    //     teamPersonDeptId: "1004",
                    //     teamPersonId: "100204",
                    //     teamPersonImId: "f79bf59c7c7a42b39fd3a6a6b8c9f502",
                    //     teamPersonName: "史志远史志远史志远史志远史志远史志远",
                    // }
                ],  //向后端传的
                projectSharePersonList:[],         //向后端传的
                projectLevels: [{
                    value: "正常",
                    key: '0'
                },{
                    value: "紧急",
                    key: '1'
                },{
                    value: "非常紧急",
                    key: '2'
                }],
                detail:null,
                attachInfoParam:{
                    "businessId" : null,
                    "categoryId" : null,
                    "appId" : null
                },
                popupRangeShow:false,
                curProgress:0,
//                showType:[{"code":"person","multi" : true},"external",'dept',{"code":"role","multi" : true}],
                showType:[{"code":"person","multi" : false}],
                active : "person",
            }
        },
        computed:{
            isEdit(){
                return this.id != 'create'
            }
        },
        methods:{
            getSelectedUsersData(selectUserDatas){
                if(this.curUserSelectType=="projectResponsiblePerson"){
                    this.formData.projectResponsiblePersonId=selectUserDatas.length>0?selectUserDatas[0].sid : "";
                    this.formData.projectResponsiblePersonName=selectUserDatas.length>0?selectUserDatas[0].newname : "";
                    this.formData.projectResponsiblePersonImId=selectUserDatas.length>0?selectUserDatas[0].imUserId : "";
                    this.formData.projectResponsiblePersonDeptId=selectUserDatas.length>0?selectUserDatas[0].parentId : "";
                    this.projectResponsibleList = [...selectUserDatas];
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
                    this.showType = [{"code":"person","multi" : false}];
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
                    this.showType = [{"code":"person","multi" : true},{"code":"external","multi" : true}];
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
                    this.showType = [{"code":"person","multi" : true},{"code":"external","multi" : true},{"code":"dept", "typeCode" : false,"multi" : true},{"code":"role","multi" : true}];
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
            handleSave(){
                let formData = this.formData;
                let detailData = this.detail;
                let queryData = {};


                if(!formData.projectName){
                    AlertModule.show({
                        content: '项目名称不能为空!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 3000)
                    return ;

                }
                if(!formData.projectResponsiblePersonName){
                    AlertModule.show({
                        content: '负责人不能为空!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 3000)
                    return ;

                }
                if(!formData.projectStart){
                    AlertModule.show({
                        content: '开始时间不能为空!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 3000)
                    return ;

                }
                if(!formData.projectEnd){
                    AlertModule.show({
                        content: '结束时间不能为空!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 3000)
                    return ;

                }


                var patt = /^[^/&'<>%*?:|\\]*$/;
                if(!patt.test(formData.projectName)){
                    AlertModule.show({
                        content: '项目名称存在不合法字符!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 3000)
                    return ;
                }
                if(formData.projectStart>formData.projectEnd){
                    AlertModule.show({
                        content: '时间范围不正确!'
                    })
                    setTimeout(() => {
                        AlertModule.hide()
                    }, 3000)
                    return ;
                }

                if(this.isEdit){
                    let projectParticipantPersonList = [];
                    if(this.projectParticipantPersonList){
                        this.projectParticipantPersonList.map((item)=>{
                            let participant = {};
                            participant.teamPersonId = item.sid;
                            participant.teamPersonName = item.name;
                            participant.shareType = 0;
                            participant.teamPersonImId= item.imUserId;
                            participant.teamPersonDeptId = item.parentId;
                            participant.outType = item.isOut;
                            participant.teamType = 3;
                            participant.projectId = this.id;
                            projectParticipantPersonList.push(participant);
                        })
                    }
                    let projectSharePersonList = [];
                    if(this.projectSharePersonList){
                        this.projectSharePersonList.map((item)=>{
                            let share = {};
                            if(item.type=='user'||item.type =='external'){
                                share.teamPersonId = item.sid;
                                share.teamPersonName = item.name;
                                share.teamPersonImId= item.imUserId;
                                share.teamPersonDeptId = item.parentId;
                                share.shareType = 1;
                                share.teamType = 4;
                                share.outType = item.isOut;
                                share.projectId = this.id;
                            }
//                            else if(item.type =='external'){
//                                share.teamPersonId = item.sid;
//                                share.teamPersonName = item.name;
//                                share.teamPersonImId= item.imUserId;
//                                share.teamPersonDeptId = item.parentId;
//                                share.shareType = 1;
//                                share.teamType = 4;
//                                share.outType = 1;
//                                share.projectId = this.id;
//                            }
                            else if(item.type =='role'){
                                share.teamPersonId = item.sid;
                                share.teamPersonName =item.newname;
                                share.shareType = 2;
                                share.teamType = 4;
                                share.projectId = this.id;
                            }else if(item.selectType == 'role'){
                                share.teamPersonId = item.roleId;
                                share.teamPersonName = item.roleName;
                                share.shareType = 2;
                                share.teamType = 4;
                                share.projectId = this.id;
                            }else if(item.type =='dept'){
                                share.teamPersonId = item.sid;
                                share.teamPersonName = item.name;
                                share.shareType = 3;
                                share.teamType = 4;
                                share.projectId = this.id;
                            }else if(item.selectType =='dept'){
                                share.teamPersonId = item.sid;
                                share.teamPersonName = item.name;
                                share.shareType = 3;
                                share.teamType = 4;
                                share.projectId = this.id;
                            }
                            projectSharePersonList.push(share);
                        });
                    }



                    queryData = {
                        "sid":this.attachInfoParam.businessId,
                        "projectName": formData.projectName,
                        "projectStart": formData.projectStart,
                        "projectEnd": formData.projectEnd,

                        "projectResponsiblePersonId": this.projectResponsibleList[0].sid,
                        "projectResponsiblePersonName": this.projectResponsibleList[0].name,
                        "projectResponsiblePersonImId": this.projectResponsibleList[0].imUserId,
                        "projectResponsiblePersonDeptId": this.projectResponsibleList[0].parentId,

                        "projectCreatePersonId": detailData.projectCreatePersonId,
                        "projectCreatePersonName": detailData.projectCreatePersonName,
                        "projectCreatePersonImId": detailData.projectCreatePersonImId,
                        "projectCreatePersonDeptId": detailData.projectCreatePersonDeptId,

                        "projectParticipantPersonList":projectParticipantPersonList,
                        "projectSharePersonList":projectSharePersonList,

                        "projectProgressBar": parseInt(formData.projectProgressBar),
                        "projectLevel": +formData.projectLevel,
                        "projectCommunication": +detailData.projectCommunication,
                        "projectNetDisk": +detailData.projectNetDisk,
                        "projectDesc": formData.projectDesc,

                        "projectStatus": detailData.projectStatus,
                    }

//                    this.queryData =  {...queryData};
//                    console.log(JSON.stringify(queryData))
                        this.rqProjectUpdate(queryData);

                }else{
                    let projectParticipantPersonList = [];
                    if(this.projectParticipantPersonList){
                        this.projectParticipantPersonList.map((item)=>{
                            let participant = {};
                            participant.teamPersonId = item.sid;
                            participant.teamPersonName = item.name;
                            participant.shareType = 0;
                            participant.teamPersonImId= item.imUserId;
                            participant.teamPersonDeptId = item.parentId;
                            participant.outType = item.isOut;
//                            participant.outType = +item.isOut;
                            projectParticipantPersonList.push(participant);
                        })
                    }
                    let projectSharePersonList = [];
                    if(this.projectSharePersonList){
                        this.projectSharePersonList.map((item)=>{
                            let share = {};
                            if(item.type=='user'||item.type =='external'){
                                share.teamPersonId = item.sid;
                                share.teamPersonName = item.name;
                                share.teamPersonImId= item.imUserId;
                                share.teamPersonDeptId = item.parentId;
                                share.shareType = 1;
                                share.teamType = 4;
                                share.outType = item.isOut;
                            }
//                            else if(item.type =='external'){
//                                share.teamPersonId = item.sid;
//                                share.teamPersonName = item.name;
//                                share.teamPersonImId= item.imUserId;
//                                share.teamPersonDeptId = item.parentId;
//                                share.shareType = 1;
//                                share.teamType = 4;
//                                share.outType = 1;
//                            }
                            else if(item.type =='role'){
                                share.teamPersonId = item.sid;
                                share.teamPersonName =item.newname;
                                share.shareType = 2;
                                share.teamType = 4;
                                share.projectId = this.id;
                            }else if(item.selectType == 'role'){
                                share.teamPersonId = item.roleId;
                                share.teamPersonName = item.roleName;
                                share.shareType = 2;
                                share.teamType = 4;
                                share.projectId = this.id;
                            }else if(item.type =='dept'){
                                share.teamPersonId = item.sid;
                                share.teamPersonName = item.name;
                                share.shareType = 3;
                                share.teamType = 4;
                            }else if(item.selectType =='dept'){
                                share.teamPersonId = item.sid;
                                share.teamPersonName = item.name;
                                share.shareType = 3;
                                share.teamType = 4;
                                share.projectId = this.id;
                            }
                            projectSharePersonList.push(share);
                        });
                    }



                    queryData = {
                        "sid":this.attachInfoParam.businessId,
                        "projectName": formData.projectName,
                        "projectStart": formData.projectStart,
                        "projectEnd": formData.projectEnd,

                        "projectResponsiblePersonId": formData.projectResponsiblePersonId,
                        "projectResponsiblePersonName": formData.projectResponsiblePersonName,
                        "projectResponsiblePersonImId": formData.projectResponsiblePersonImId,
                        "projectResponsiblePersonDeptId": formData.projectResponsiblePersonDeptId,

                        "projectCreatePersonId": formData.projectCreatePersonId,
                        "projectCreatePersonName": formData.projectCreatePersonName,
                        "projectCreatePersonImId": formData.projectCreatePersonImId,
                        "projectCreatePersonDeptId": formData.projectCreatePersonDeptId,

                        "projectParticipantPersonList":projectParticipantPersonList,
                        "projectSharePersonList":projectSharePersonList,

                        "projectProgressBar": parseInt(formData.projectProgressBar),
                        "projectLevel": +formData.projectLevel,
                        "projectCommunication": +formData.projectCommunication,
                        "projectNetDisk": +formData.projectNetDisk,
                        "projectDesc": formData.projectDesc,
                    }
                    if(queryData.projectNetDisk){
                        this.rqNoRepeatName(queryData);
                    }else{
                        this.rqProjectSave(queryData);
                    }
//                    this.queryData =   {...queryData};
//                    console.log(JSON.stringify(queryData))
                }







            },
            handleShowProgress(){
                // this.curProgress=this.formData.projectProgressBar==""?0:this.formData.projectProgressBar.replace("%","");
                this.popupRangeShow=true;
            },
            dialogProgressColse(){
                this.popupRangeShow=false;
            },
            dialogProgressColseOK(){
                this.popupRangeShow=false;
                this.formData.projectProgressBar=this.curProgress+"%";
            },
            onChange(val){
//                console.log(val,"onChangeonChangeonChange");
            },
            //获取项目详情
            async getDetail(){
                let res = await getProjectDetail(this.id);
                this.detail = {...res[0]};
                this.detail.date = this.detail.projectStart + "<br/>" + this.detail.projectEnd;
                this.detail.projectProgressBar = this.detail.projectProgressBar + "%";
                this.attachInfoParam = {
                    appId: this.detail.appId,
                    categoryId: this.detail.categoryId,
                    businessId : this.detail.sid
                };
                let detail = this.detail;
                this.formData.projectName = detail.projectName;
                this.formData.projectStart = detail.projectStart;
                this.formData.projectEnd = detail.projectEnd;
                this.formData.projectProgressBar = detail.projectProgressBar;
                this.curProgress = parseInt(detail.projectProgressBar);
                this.formData.projectLevel = detail.projectLevel;
                this.formData.projectNetDisk = !!+detail.projectNetDisk;
                this.formData.projectCommunication = !!+detail.projectCommunication;
                this.formData.projectDesc = detail.projectDesc;
                //负责人  projectResponsibleList
//                this.projectResponsibleList
                this.formData.projectResponsiblePersonName = detail.projectResponsiblePersonName;//数据回显
                this.projectResponsibleList.push({
                    sid : detail.projectResponsiblePersonId,
                    name:detail.projectResponsiblePersonName,
                    imUserId:detail.projectResponsiblePersonImId,
                    parentId:detail.projectResponsiblePersonDeptId,
                    newname : detail.projectResponsiblePersonName
                });
                //参与人  projectParticipantPersonList
                detail.projectParticipantPersonList.forEach((item,index)=>{
                    this.formData.projectParticipantPersonList=this.formData.projectParticipantPersonList+item.teamPersonName+" ";
//                        this.projectParticipantPersonList.push({
//                            sid:item.sid,
//                            name:item.name,
//                        })
//
//                    let type = +item.outType  ? "external" : "user";
//                    this.projectParticipantPersonList.push({
//                        type : type || 'role',
//                        sid : item.teamPersonId,
//                        name:item.teamPersonName,
//                        imUserId:item.teamPersonImId,
//                        parentId:item.teamPersonDeptId,
//                    })
                    if(item.outType == "0"){
                        this.projectParticipantPersonList.push({
                            type : 'user',
                            sid : item.teamPersonId,
                            name:item.teamPersonName,
                            imUserId:item.teamPersonImId,
                            parentId:item.teamPersonDeptId,
                            newname:item.teamPersonName,
                            isOut:0,
                        })
                    }else if(item.outType == "1"){
                        this.projectParticipantPersonList.push({
                            type : 'external',
                            sid : item.teamPersonId,
                            name:item.teamPersonName,
                            imUserId:item.teamPersonImId,
                            parentId:item.teamPersonDeptId,
                            newname:item.teamPersonName,
                            isOut:1,

                        })
                    }
                });
                //共享人  projectSharePersonList
                detail.projectSharePersonList.forEach((item,index)=>{
                    this.formData.projectSharePersonList=this.formData.projectSharePersonList+item.teamPersonName+" ";
                    if(item.shareType == '1'&&item.outType == "0"){//内部人员

                        this.projectSharePersonList.push({
                            type : 'user',
                            sid : item.teamPersonId,
                            name:item.teamPersonName,
                            imUserId:item.teamPersonImId,
                            parentId:item.teamPersonDeptId,
                            newname : item.teamPersonName,
                            isOut:0,
                        })
                    }else if(item.shareType == '1'&&item.outType == "1"){//外部人员
                        this.projectSharePersonList.push({
                            type : 'external',
                            sid : item.teamPersonId,
                            name:item.teamPersonName,
                            imUserId:item.teamPersonImId,
                            parentId:item.teamPersonDeptId,
                            newname : item.teamPersonName,
                            isOut:1,
                        })
                    }else if(item.shareType == '2'){//角色
                        this.projectSharePersonList.push({
                            selectType :  'role',
                            roleId : item.teamPersonId,
                            roleName:item.teamPersonName,
                            newname:item.teamPersonName,
                        })
                    }else if(item.shareType == '3'){//部门
                        this.projectSharePersonList.push({
                            type : 'dept',
                            sid : item.teamPersonId,
                            name:item.teamPersonName,
                            imUserId:item.teamPersonImId,
                            newname:item.teamPersonName,
                        })
                    }
                });

            },
            //获取附件信息
            async getAttach(){
                let res  = await JZY.xhr.r([{type:'post',url:'/project/projectInfo/queryProjectId',data:{}}],'GLOBAL.YANG_NING',false,false).then((resultData)=>{
                    try{
                        return resultData;

                    }catch (e){
                        return false;
                    }
                }).catch((e)=>{
                    //接口失败
                    throw new Error(e)
                });
//                console.log(res[0],"res[0]res[0]");
                this.attachInfoParam.appId = res[0].appId;
                this.attachInfoParam.businessId = res[0].projectId;
                this.attachInfoParam.categoryId = res[0].categoryId;
            },
            //保存项目
            async rqProjectSave(queryData){
                JZY.xhr.post(
                    '/oa/project/projectInfo/save'
                    ,queryData
                    ,{alertError:true,alertSuccess:false})
                    .then(async (resultData)=>{
                        let attachDataInfo = await this.$refs.uploadCompoment.saveAttachFn();
//                        this.$alert('新建成功!');
                        this.$router.push("/m_project");
                    }).catch((e)=>{

                    //接口失败
                    console.log("接口失败",e);
                })


            },
            //是否重名
            async rqNoRepeatName(queryData){
//                let res = await postProjectNoRepeatName(queryData.projectName);
                let requestData = {
                    tendId: null,
                    fileName: queryData.projectName
                }
                let res = await JZY.xhr.r([{
                    type: 'post',
                    url: '/disk/diskCompanyProject/getNoRepeatName',
                    data: requestData
                }], 'GLOBAL.GATEWAY.LV_JIE', false, false).then((resultData) => {
                    try {
                        return resultData;

                    } catch (e) {

//                        console.log(e,"eeeeee是否重名是否重名是否重名")
//                        this.$message("role.list.vue:"+e);
                        return false;
                    }
                }).catch((e) => {
                    //接口失败
                    throw new Error(e)
                });
//                console.log(res[0],"是否重名是否重名是否重名")

                if (res[0] == queryData.projectName) {
                    queryData.netDiskName = res[0];

                    this.isSaveFinished = true;
                    this.rqProjectSave(queryData);
                } else {
                    this.$confirm('该项目名称云盘已存在，是否继续已' + res[0] + '名称创建文件夹?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        queryData.netDiskName = res[0];
                        this.isSaveFinished = true;
                        this.rqProjectSave(queryData);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消保存'
                        });
                    });
                }

            },
            //保存修改项目
            async rqProjectUpdate(queryData){

                JZY.xhr.post(
                    '/oa/project/projectInfo/update'
                    ,queryData
                    ,{alertError:true,alertSuccess:false})
                    .then(async (resultData)=>{
                        let attachDataInfo = await this.$refs.uploadCompoment.saveAttachFn();
                        AlertModule.show({
                            content: '修改成功!'
                        })
                        setTimeout(() => {
                            AlertModule.hide()
                        }, 3000)
                        this.$router.back(-1);
                    }).catch((e)=>{

                    //接口失败
                    console.log("接口失败",e);
                })


            },
        }
    }
</script>
<style  lang="scss">
    @import '../../../static/css/m_crm_add.scss';

    .weui-cell_radio{
        text-align:center;
        font-size: 17px;
        color: #191919;
        letter-spacing: 0;
        text-align: center;
        line-height: 17px;
    }
    .m_project_popuRadio_head {
        text-align: center;
        padding: 8px 0;
        color: #888;
    }
    .m_project_edit{
        background-color: #ffffff;
        /*font-family: PingFangSC-Medium;*/
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
        .weui-cell{margin-top: 0px;position: relative}
        .weui-cell_access .weui-cell__ft:after{
            margin-right: -7px;
        }
        input::-webkit-input-placeholder{color: #CCCCCC;}
        input::-moz-placeholder{color: #CCCCCC;}
        input:-moz-placeholder{ color: #CCCCCC;}
        input:-ms-input-placeholder{ color: #CCCCCC;}
        .vux-cell-value{float: right;}
        .vux-cell-placeholder{
            float: right;
            font-size: 16px;
            /*color: #CCCCCC;*/
            letter-spacing: 0;
            text-align: center;
        }
        .spacing{
            margin-top:8px;
        }
        .bottomBtn{
            display: block;
            position: absolute;
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
        }
        .vux-label{
            font-size: 16px;
            color: #191919;
            letter-spacing: 0;
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
            /*color: #CCCCCC;*/
            letter-spacing: 0;

            padding-right: 12px;
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

