<template>
    <div class="m_project_detail">
        <div>
            <grid :cols="3" v-if="!isError" :show-lr-borders="false" :show-vertical-dividers="false" class="nav-wrap">
                <grid-item :link="'/m_project/detail_dynamic/'+id" label="动态">
                    <!--<img slot="icon" src="../assets/grid_icon.png">-->
                    <div class="list_icon" slot="icon" :style="{'background-color': '#009EFF' }">
                        <icon  name="m_project_dynamic" scale="1.5"></icon>
                    </div>
                </grid-item>
                <grid-item @on-item-click="goTask" label="任务" v-if="taskPermission">
                    <div class="list_icon" slot="icon" :style="{'background-color': '#0ABF86' }">
                        <icon  name="m_project_task" scale="1.5"></icon>
                    </div>
                </grid-item>
                <!--<grid-item link="/component/cell" @on-item-click="onItemClick" label="审批">-->
                    <!--&lt;!&ndash;<img slot="icon" src="../assets/grid_icon.png">&ndash;&gt;-->
                    <!--<span slot="label">审批</span>-->
                <!--</grid-item>-->
                <grid-item @on-item-click="goApprove" v-if="approvePermission" >
                    <div class="list_icon" slot="icon" :style="{'background-color': '#F24848' }">
                        <icon  name="m_project_approve" scale="1.5"></icon>
                    </div>
                    <span slot="label">审批</span>
                </grid-item>
                <grid-item :link="'/m_project/detail_participants/'+id" >
                    <div class="list_icon" slot="icon" :style="{'background-color': '#0ABF86' }">
                        <icon  name="m_project_team" scale="1.5"></icon>
                    </div>
                    <span slot="label">团队</span>
                </grid-item>

                <grid-item  class="goDisk" @on-item-click="goDisk" v-if="+detail.projectNetDisk&&diskPermission">
                    <div class="list_icon" slot="icon" :style="{'background-color': '#009EFF' }">
                        <icon  name="m_project_disk" scale="1.5"></icon>
                    </div>
                    <span slot="label">云盘</span>
                </grid-item>
            </grid>
            <group label-width="4.5em" label-margin-right="2em" label-align="left">
                <cell title="项目名称" align-items="flex-start" >
                    <div class="rightBd text_l_r"  slot>{{detail.projectName}}</div>
                </cell>
                <cell title="项目进度" :value="detail.projectProgressBar?detail.projectProgressBar:0" ></cell>
                <cell title="项目状态" :value="detail.projectStatus | state "></cell>
                <cell title="紧急程度" :value="detail.projectLevel | projectLevel"></cell>
            </group>
            <group label-width="4.5em" label-margin-right="2em" label-align="left">
                <cell title="创建时间" :value="detail.createDate" ></cell>
                <cell title="开始时间" :value="detail.projectStart" ></cell>
                <cell title="结束时间" :value="detail.projectEnd"></cell>
            </group>
            <group label-width="4.5em" label-margin-right="2em" label-align="left">
                <cell title="创建人" :value="detail.projectCreatePersonName" ></cell>
                <cell title="负责人" :value="detail.projectResponsiblePersonName" ></cell>
                <cell primary="content"  align-items="flex-start"  value-align='left' title="参与人">
                    <div class="rightBd text_l_r"  slot>{{detail.projectParticipantPersonList | projectList}}</div>
                </cell>
                <cell primary="content" align-items="flex-start"  value-align='left' title="共享人">
                    <div class="rightBd text_l_r"  slot>{{detail.projectSharePersonList | projectList}}</div>
                </cell>
            </group>
            <group label-width="4.5em" label-margin-right="2em" label-align="left">
                <attachItem v-if="attachInfoParam" :param="attachInfoParam"></attachItem>
            </group>
            <group label-width="5em" label-margin-right="2em" label-align="left">
                <cell title="沟通群组" :value="detail.projectCommunication | projectCommunication" ></cell>
                <cell title="云盘文件夹" :value="detail.projectNetDisk | projectNetDisk" ></cell>
            </group>
            <group label-width="4.5em" label-margin-right="2em" label-align="left">
                <cell title="项目描述"  align-items="flex-start"  value-align='left'>
                    <div class="rightBd text_l_r"  style="white-space:pre-wrap" slot>{{detail.projectDesc | projectDesc}}</div>
                </cell>
            </group>

        </div>
        <div class="btnGroups" v-if="!isError">
            <button @click="showMore">更多</button>
        </div>

        <actionsheet v-if="!isError" v-model="moreSheet" :menus="moreMenus"
                     show-cancel @on-click-menu="handleMask">
            <div slot="header"><p style="color: #999;font-size: 15px">更多</p></div>
        </actionsheet>
    </div>

</template>

<script>
    // import bottonbtns from './components/mBottomBtns'
    // import bottonbtnItem from './components/bottonbtnItem'
    import { Group,XInput,Selector,PopupPicker,XAddress,XTextarea,Cell,Grid, GridItem ,Actionsheet,Alert,AlertModule} from 'vux'
    import attachItem from '../../components/attachItem.vue'
    import {getProjectDetail,postProjectDetail,getProjectOperation,getProjectFollow,getProjectDel} from '@mobile/pages/m_project/detailService.js'
    export default {
        name: "m_project_detail",
        components: {
            Group,
            XInput,
            Selector,
            PopupPicker,
            XAddress,
            XTextarea,
            Cell,
            Grid,
            GridItem,
            Actionsheet,
            attachItem,
            Alert,
            AlertModule
        },
        filters:{
            projectLevel(val){
                let temp = "";
                // 项目等级 非常紧急2，紧急1，正常0。
                switch(val){
                    case "0":
                        temp = "正常";
                        break;
                    case "1":
                        temp = "紧急"
                        break;
                    case "2":
                        temp = "非常紧急"
                        break;
                }
                return temp;
            },
            projectStatus(val){
                let temp = "";
                // 1已延期、2未启动、3已完成、4已撤销。
                switch(val){
                    case "0":
                        temp = "进行中";
                        break;
                    case "1":
                        temp = "已延期"
                        break;
                    case "2":
                        temp = "未启动"
                        break;
                    case "3":
                        temp = "已完成"
                        break;
                    case "4":
                        temp = "已撤销"
                        break;
                }
                return temp;
            },
            projectDesc(val){
                if(val){
                    return val.replace(/<[^>]+>/g,"")
                }
            },
            projectNetDisk(val){
                let temp = "";
                // 是否创建网盘 0否1是
                switch(val){
                    case "0":
                        temp = "未创建";
                        break;
                    case "1":
                        temp = "已创建"
                        break;
                    default:
                        temp = "未创建"
                        break;
                }
                return temp;
            },
            projectCommunication(val){
                let temp = "";
                // 项目沟通 0未启用 1启用
                switch(val){
                    case "0":
                        temp = "未创建";
                        break;
                    case "1":
                        temp = "已创建"
                        break;
                    default:
                        temp = "未创建"
                        break;
                }
                return temp;
            },
            projectList(list){
                let temp = "";
                if(list && list.length){
                    list.forEach(element => {
                        temp += " " + element.teamPersonName
                    });
                }
                return temp;
            },
            state (value){
                //'项目状态 ：0进行中、1已延期、2未启动、3已完成、4已撤销。',
                switch (value) {
                    case '0':
                        return '进行中';
                    case '1':
                        return '已延期';
                    case '2':
                        return '未启动';
                    case '3':
                        return '已完成';
                    case '4':
                        return '已撤销';
                    default:
                        return '--';
                }
            },
        },
        methods: {
            showMore(){
                this.moreSheet=true
            },
            handleMask(menuKey, menuItem){
                if(menuItem){
                    this[menuKey]();
                }

            },
            goTask(){
                if(this.isOut==1){
                    this.$router.push('/m_task_forProject?projectId='+this.id+'&permission='+this.detail.projectPermission+'&orgType=2');
                } else if(this.isOut==0){
                    this.$router.push('/m_task_forProject?projectId='+this.id+'&permission='+this.detail.projectPermission+'&orgType=1');
                } else{
                    this.$router.push('/m_task_forProject?projectId='+this.id+'&permission='+this.detail.projectPermission+'&orgType='+this.orgType);
                }
            },
            goApprove(){
                if(this.isOut==1){
                    this.$router.push('/m_approve/m_approve_list_project?projectId='+this.id+'&permission='+this.detail.projectPermission+'&orgType=2');
                } else if(this.isOut==0){
                    this.$router.push('/m_approve/m_approve_list_project?projectId='+this.id+'&permission='+this.detail.projectPermission+'&orgType=1');
                } else{
                    this.$router.push('/m_approve/m_approve_list_project?projectId='+this.id+'&permission='+this.detail.projectPermission+'&orgType='+this.orgType);
                }
            },
            goDisk(){
                  this.rqDisk();
            },
            projectEdit (){
                this.$router.push("/m_project_edit/"+this.id);
            },
            async follow(){
                let res = await getProjectFollow(this.id)
                AlertModule.show({
                    content: '关注成功!'
                })
                setTimeout(() => {
                    AlertModule.hide()
                }, 3000)
                this.getDetail();
                this.rquireProjectOperation(this.id);
            },
            async cancelFollow(){
                let res = await getProjectFollow(this.id)
                AlertModule.show({
                    content: '取消关注成功!'
                })
                setTimeout(() => {
                    AlertModule.hide()
                }, 3000)
                this.getDetail();
                this.rquireProjectOperation(this.id);
            },

            //删除
            del (){
                this.$confirm('此操作将永久删除该项目, 是否继续?').then(() => {
                    this.rquireProjectDel(this.id);
                }).catch(() => {
                });
            },
            async rquireProjectDel(){
                let res = await JZY.xhr.r([{
                    type: 'get',
                    url: '/project/projectInfo/delete/'+this.id,
                    data: {}
                }], 'GLOBAL.YANG_NING', false, {alertError:true,alertSuccess:false}).then((resultData) => {
                    try {
//                        return resultData;
                        AlertModule.show({
                            content: '删除成功!'
                        })
                        setTimeout(() => {
                            AlertModule.hide()
                        }, 3000)
                        this.$router.push("/m_project");

                    } catch (e) {

//                        console.log(e,"eeeeee是否重名是否重名是否重名")
//                        this.$message("role.list.vue:"+e);
                        return false;
                    }
                }).catch((e) => {
                    //接口失败
                    throw new Error(e)
                });
            },


            async postProjectUpdateStatus(queryData,operation){
                let res = await JZY.xhr.r([{
                    type: 'post',
                    url: '/project/projectInfo/updateProjectStauts',
                    data: queryData
                }], 'GLOBAL.YANG_NING', false, {alertError:true,alertSuccess:false}).then((res) => {
                    try {
                        if(operation == 'back'){
                            AlertModule.show({
                                content: '撤销成功!'
                            })
                        }else if(operation == 'revoke'){
                            AlertModule.show({
                                content: '激活成功!'
                            })
                        }else if(operation == 'comp'||operation == 'compCancel'){
                            AlertModule.show({
                                content: '操作成功!'
                            })
                        }
                        setTimeout(() => {
                            AlertModule.hide()
                        }, 3000)
                        this.getDetail();
                        this.rquireProjectOperation(this.id);
                    } catch (e) {
                        return false;
                    }
                }).catch((e) => {
//                    this.isError = true;
                    //接口失败
                    this.getDetail();
                    this.rquireProjectOperation(this.id);
                    throw new Error(e)
                });
            },
            //撤销
            back (){
                let queryData={
                    projectId:this.id,
                    projectStatus:"4"
                }
                this.postProjectUpdateStatus(queryData,'back');
            },
            //激活
            async revoke(){
                let queryData={
                    projectId:this.id,
                    projectStatus:"5"
                };
                this.postProjectUpdateStatus(queryData,'revoke');

            },
            //完成
            async comp (){
                let queryData={
                    projectId:this.id,
                    projectStatus:"3"
                };
                this.postProjectUpdateStatus(queryData,'comp');
                AlertModule.show({
                    content: '操作成功!'
                })
            },
            //取消完成
            async compCancel (){
                let queryData={
                    projectId:this.id,
                    projectStatus:"5"
                };
                this.postProjectUpdateStatus(queryData,'compCancel');
            },

            async getDetail(){
                if(this.orgType == 2){
                    let query = {
                        "tendId":this.$route.query.tendId,
                        "projectId":this.id,
                        "isOut":1
                    }
                    let res = await JZY.xhr.r([{
                        type: 'post',
                        url: '/project/projectInfo/mobile/query',
                        data: query
                    }], 'GLOBAL.YANG_NING', false, {alertError:true,alertSuccess:false}).then((res) => {
                        try {

                            this.detail = {...res[0]};
                            this.detail.date = this.detail.projectStart + "<br/>" + this.detail.projectEnd;
                            this.detail.projectProgressBar = this.detail.projectProgressBar + "%";
                            this.attachInfoParam = {
                                appId: this.detail.appId,
                                categoryId: this.detail.categoryId,
                                businessId : this.detail.sid
                            }
//                            if(+this.detail.projectNetDisk&&this.diskPermission){
////                                this.rqDisk();
//                            }
                        } catch (e) {


//                        console.log(e,"eeeeee是否重名是否重名是否重名")
//                        this.$message("role.list.vue:"+e);
                            return false;
                        }
                    }).catch((e) => {
                        this.isError = true;
                        //接口失败
                        throw new Error(e)
                    });
                }else if(this.isOut==0||this.isOut==1){
                    let query = {
                        "tendId":this.$route.query.tendId,
                        "projectId":this.id,
                        "isOut":this.isOut
                    }
                    let res = await  JZY.xhr.r([{
                        type: 'post',
                        url: '/project/projectInfo/mobile/query',
                        data: query
                    }], 'GLOBAL.YANG_NING', false, {alertError:true,alertSuccess:false}).then((res) => {
                        try {

                            this.detail = {...res[0]};
                            this.detail.date = this.detail.projectStart + "<br/>" + this.detail.projectEnd;
                            this.detail.projectProgressBar = this.detail.projectProgressBar + "%";
                            this.attachInfoParam = {
                                appId: this.detail.appId,
                                categoryId: this.detail.categoryId,
                                businessId : this.detail.sid
                            }
//                            if(+this.detail.projectNetDisk&&this.diskPermission){
////                                this.rqDisk();
//                            }
                        } catch (e) {
                            return false;
                        }
                    }).catch((e) => {
                        this.isError = true;
                        //接口失败
                        throw new Error(e)
                    });

                }else{
                    let res = await await JZY.xhr.r([{
                        type: 'get',
                        url: '/project/projectInfo/get/'+this.id,
                        data: {}
                    }], 'GLOBAL.YANG_NING', false, {alertError:true,alertSuccess:false}).then((res) => {
                        try {

                            this.detail = {...res[0]};
                            this.detail.date = this.detail.projectStart + "<br/>" + this.detail.projectEnd;
                            this.detail.projectProgressBar = this.detail.projectProgressBar + "%";
                            this.attachInfoParam = {
                                appId: this.detail.appId,
                                categoryId: this.detail.categoryId,
                                businessId : this.detail.sid
                            }
//                            if(+this.detail.projectNetDisk&&this.diskPermission){
////                                this.rqDisk();
//                            }
                        } catch (e) {

                            return false;
                        }
                    }).catch((e) => {
                        this.isError = true;
                        //接口失败
                        throw new Error(e)
                    });

                }

            },

            //查询项目对应操作权限getProjectDetail
            async rquireProjectOperation(id){
                let res = await getProjectOperation(id);
                let operation = {...res[0]};
                let fromPage = this.fromPage;
                this.moreMenus = {}
                if(+operation.update){
                    this.moreMenus.projectEdit = '编辑';
                }
                if(+operation.projectFinish){
                    this.moreMenus.comp = '完成';
                }
                if(+operation.projectCancelFinish){
                    this.moreMenus.compCancel = '取消完成';
                }
                if(+operation.projectActivation){
                    this.moreMenus.revoke = '激活';
                }
                if(+operation.projectRevoke){
                    this.moreMenus.back = '撤销';
                }
                if(!+operation.follow&&fromPage!='set'){
                    this.moreMenus.follow = '关注';
                }
                if(+operation.follow&&fromPage!='set'){
                    this.moreMenus.cancelFollow = '取消关注';
                }
                if(+operation.projectDelete){
                    this.moreMenus.del = '删除';
                }

            },
            //查询项目的网盘目录id
            async rqDisk(){
                let requestData = {
                    "tendId":sessionStorage.getItem('tendId'),
                    "projectId":this.id
                };
                let res = await JZY.xhr.r([{
                    type: 'post',
                    url: '/disk/diskCompanyProject/getRootIdByProjectId',
                    data: requestData
                }], 'GLOBAL.GATEWAY.LV_JIE', false, {alertError:true,alertSuccess:false}).then((res) => {
                    try {

                        this.rootIdByProjectId = res[0].fileId;
                        this.rootIdByProjectName = res[0].fileName;


                        let _this = this;
                        setupWebViewJavascriptBridge(function(bridge){
                            bridge.callHandler(
                                'jzyJsHandlers',{'method':17,'params':{'tendId':sessionStorage.getItem('tendId'),'projectId':_this.id,'directoryId':_this.rootIdByProjectId,'directoryName': _this.rootIdByProjectName}},
                                function(response){
                                }
                            );
                        });
                        return res;

                    } catch (e) {

//                        console.log(e,"eeeeee是否重名是否重名是否重名")
//                        this.$message("role.list.vue:"+e);
                        return false;
                    }
                }).catch((e) => {
                    //接口失败
                    throw new Error(e)
                });
            }
        },
        mounted(){
            document.title = '项目详情'
            this.getDetail();
            this.taskPermission = JZY.s.hasMenuPermisson('task_view','modify');
            this.approvePermission = JZY.s.hasMenuPermisson('flow_view','modify');
            this.diskPermission = JZY.s.hasMenuPermisson('disk_view','modify');

            this.rquireProjectOperation(this.id);

        },
        data () {
            return {
                id:this.$route.query.projectId,
                isOut:this.$route.query.isOut,
                rootIdByProjectId:'',
                rootIdByProjectName:'',
                fromPage:this.$route.query.fromPage,
                moreSheet:false,
                moreMenus: {
//                    projectEdit: "编辑",
//                    comp: "完成",
//                    compCancel: "取消完成",
//                    revoke: "激活",
//                    back: "撤销",
//                    follow: "关注",
//                    cancelFollow: "取消关注",
//                    del: "删除",
                },
                operation:null,
                detail : {},
                attachInfoParam:null,
                taskPermission:'',
                approvePermission:'',
                diskPermission:'',
                orgType: this.$route.query.orgType,//1为正常企业 2为合作企业；
                isError:false,
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    @import '../../static/css/common.scss';
.m_project_detail{
    padding-bottom: 60px;
    .nav-wrap{
        background-color: #ffffff;
    }

    .btnGroups {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        border-top:1px solid #d9d9d9;
        button {
            width: 100%;
            float: left;
            height: 50px;
            background-color: #ffffff;
            color: #009EFF;
            font-size: 16px;
            border: 0;
        }
    }
    .list_icon{
        width:30px;
        height:30px;
        line-height:30px;
        text-align:center;
        background-color:#0ABF86;
        color:#fff;
        border-radius:50%;
        margin-right:20px;
        position: relative;
        svg{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

}
</style>

<style lang="scss">
    body{
        overflow: auto!important;
    }
    .weui-grid:after{
        border-bottom: none;
    }
    .weui-grid__label{
        color: #191919;
        font-size: 12px;
    }
    .vux-label{
        font-size: 16px;
        color: #191919;
    }
    .weui-cell__ft{
        font-size: 16px;
        color: #666666;
    }
    .m_project_detail{
        .weui-cell__ft{
            color: #666666;
        }
        .weui-actionsheet__action{
            .weui-actionsheet__cell{
                color: #999999;
            }
        }

    }
</style>