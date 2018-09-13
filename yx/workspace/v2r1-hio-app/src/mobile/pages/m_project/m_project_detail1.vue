<template>
    <div class="m_project_detail">
        <div>
            <grid :cols="3" :show-lr-borders="false" :show-vertical-dividers="false" class="nav-wrap">
                <grid-item :link="'/m_project/detail_dynamic/'+id" label="动态">
                    <!--<img slot="icon" src="../assets/grid_icon.png">-->
                    <div class="list_icon" slot="icon" :style="{'background-color': '#009EFF' }">
                        <icon  name="m_project_dynamic" scale="1.5"></icon>
                    </div>
                </grid-item>
                <grid-item  label="任务" v-if="taskPermission" :link="'/m_task_forProject?projectId='+id+'&permission='+detail.projectPermission">
                    <div class="list_icon" slot="icon" :style="{'background-color': '#0ABF86' }">
                        <icon  name="m_project_task" scale="1.5"></icon>
                    </div>
                </grid-item>
                <!--<grid-item link="/component/cell" @on-item-click="onItemClick" label="审批">-->
                    <!--&lt;!&ndash;<img slot="icon" src="../assets/grid_icon.png">&ndash;&gt;-->
                    <!--<span slot="label">审批</span>-->
                <!--</grid-item>-->
                <grid-item  v-if="approvePermission" :link="'/m_approve/m_approve_list_project?id='+id+'&permission='+detail.projectPermission">
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

                <grid-item  class="goDisk" v-if="+detail.projectNetDisk&&diskPermission">
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
                <cell title="网盘文件夹" :value="detail.projectNetDisk | projectNetDisk" ></cell>
            </group>
            <group label-width="4.5em" label-margin-right="2em" label-align="left">
                <cell title="项目描述" :value="detail.projectDesc | projectDesc" align-items="flex-start"  value-align='left'></cell>
            </group>

        </div>
        <div class="btnGroups"
             v-if="isOut!=1">
            <button @click="showMore">更多</button>
        </div>

        <actionsheet v-model="moreSheet" :menus="moreMenus"
                     v-if="isOut!=1"
                     show-cancel @on-click-menu="handleMask">
            <div slot="header"><p style="color: #999;font-size: 15px">更多</p></div>
        </actionsheet>
    </div>

</template>

<script>
    // import bottonbtns from './components/mBottomBtns'
    // import bottonbtnItem from './components/bottonbtnItem'
    import { Group,XInput,Selector,PopupPicker,XAddress,XTextarea,Cell,Grid, GridItem ,Actionsheet} from 'vux'
    import attachItem from '../../components/attachItem.vue'
    import {getProjectDetail,postProjectDetail,getProjectOperation,getProjectFollow,getProjectDel,postProjectUpdateStatus} from '@mobile/pages/m_project/detailService.js'
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
            attachItem
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
            goDisk(){
              if(this.rootIdByProjectId)  {


              }else{
//                  this.$alert("网盘根目录不正确");
              }
            },
            projectEdit (){
                console.log('编辑');
                this.$router.push("/m_project_edit/"+this.id);
            },
            async follow(){
                let res = await getProjectFollow(this.id)
                this.$alert('关注成功!');
                this.getDetail();
                this.rquireProjectOperation(this.id);
            },
            async cancelFollow(){
                let res = await getProjectFollow(this.id)
                this.$alert('取消关注成功!');
                this.getDetail();
                this.rquireProjectOperation(this.id);
            },
            //删除
            del (){
                this.$confirm('此操作将永久删除该项目, 是否继续?').then(() => {


                    this.rquireProjectDel(this.id);



                    //去列表
//                    this.$alert('删除成功!');
                    let _this = this;

//                    setTimeout(function () {
//
//                    },3000);

                }).catch(() => {
//                    this.$message({
//                        type: 'info',
//                        message: '已取消删除'
//                    });
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
            //撤销
            async back (){
                let queryData={
                    projectId:this.id,
                    projectStatus:"4"
                }
                let res = await postProjectUpdateStatus(queryData);
                this.$alert('撤销成功!');
                this.getDetail();
                this.rquireProjectOperation(this.id);

            },
            //激活
            async revoke(){
                let queryData={
                    projectId:this.id,
                    projectStatus:"5"
                };
                let res = await postProjectUpdateStatus(queryData);
                this.$alert('激活成功!');
                this.getDetail();
                this.rquireProjectOperation(this.id);


            },
            //完成
            async comp (){
                let queryData={
                    projectId:this.id,
                    projectStatus:"3"
                };
                let res = await postProjectUpdateStatus(queryData);
                this.$alert('操作成功!');
                this.getDetail();
                this.rquireProjectOperation(this.id);
            },
            //取消完成
            async compCancel (){
                let queryData={
                    projectId:this.id,
                    projectStatus:"5"
                };
                let res = await postProjectUpdateStatus(queryData);
                this.$alert('操作成功!');
                this.getDetail();
                this.rquireProjectOperation(this.id);
            },

            async getDetail(){
                if(this.isOut == 0||this.isOut == 1){
                    let query = {
                        "tendId":this.$route.query.tendId,
                        "projectId":this.id,
                        "isOut":this.isOut
                    }
                    let res = await postProjectDetail(query);
                    this.detail = {...res[0]};
                    this.detail.date = this.detail.projectStart + "<br/>" + this.detail.projectEnd;
                    this.detail.projectProgressBar = this.detail.projectProgressBar + "%";
                    this.attachInfoParam = {
                        appId: this.detail.appId,
                        categoryId: this.detail.categoryId,
                        businessId : this.detail.sid
                    }
                    if(+this.detail.projectNetDisk){
                        this.rqDisk();
                    }

                }else{
                    let res = await getProjectDetail(this.id);
                    this.detail = {...res[0]};
                    this.detail.date = this.detail.projectStart + "<br/>" + this.detail.projectEnd;
                    this.detail.projectProgressBar = this.detail.projectProgressBar + "%";
                    this.attachInfoParam = {
                        appId: this.detail.appId,
                        categoryId: this.detail.categoryId,
                        businessId : this.detail.sid
                    }
                    if(+this.detail.projectNetDisk){
                        this.rqDisk();
                    }
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
                }], 'GLOBAL.GATEWAY.LV_JIE', false, {alertError:true,alertSuccess:false}).then((resultData) => {
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

                this.rootIdByProjectId = res[0];
//                console.log(res[0],"rqDiskrqDisk");
            }
        },
        mounted(){
            document.title = '项目详情'
            console.log(this.isOut,"isOut");
            this.getDetail();
            this.taskPermission = JZY.s.hasMenuPermisson('task_view','modify');
            this.approvePermission = JZY.s.hasMenuPermisson('flow_view','modify');
            this.diskPermission = JZY.s.hasMenuPermisson('disk_view','modify');

            this.rquireProjectOperation(this.id);
            let _this = this;
            setupWebViewJavascriptBridge(function(bridge){
                var callBackFn = function(){
                    bridge.callHandler(
                        'jzyJsHandlers',{'method':17,'params':{'tendId':_this.tendId,'fileId':_this.rootIdByProjectId}},
                        function(response){

                        }
                    );
                }
                //点击调用
                $(".m_project_detail").delegate(".goDisk", "click", function(e){
                    e.preventDefault();
                    callBackFn();

                });
            })
        },
        data () {
            return {
                id:this.$route.query.projectId,
                isOut:this.$route.query.isOut,
                rootIdByProjectId:'',
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