<template>
    <div class="header-container">
        <header>
            <div class="header_top">
                <div class="logo-wrapper">
                    <img :src="JZY.store.state.session.tenantInfo.logo || JZY.c.imgPath+'/hiologo@2x.png'">
                </div>
                <div  class="items-wrapper">
                    <div :class="{active:activeMenuId==item.sid}" v-for="item in menuData" class="menu-item"
                         @click="handleMenuItemClick(item)"><span>{{item.name}}</span></div>
                </div>
                <div class="sys-wrapper">
                    <!-- <el-button size="mini" @click="JZY.s.logout()">logout</el-button> -->
                    <!-- <el-button @click="" circle type="primary" size="mini" class="el-icon-search"></el-button> -->
                    <!-- <el-button @click="handleSysSetting" circle type="primary" size="mini" class="el-icon-setting"></el-button>
                    <el-button @click="handleEmailBoxSetting" circle type="primary" size="mini" class="el-icon-message"></el-button> -->
                    <!-- <el-button @click="" circle type="primary" size="mini" class="el-icon-service"></el-button> -->

                    <span v-if="$store.state.session.tenantInfo.isSuper=='1'" @click="handleSysSetting" title="系统设置"><icon name="header_set" scale = "2" style="color:#46A7FF" ></icon></span>
                    <!--<span @click="handleEmailBoxSetting" title="我的邮箱"><icon name="header_email" scale = "2" style="color:#46A7FF"></icon></span>-->
                    <span @click="JZY.s.logout(true,false)" title="退出登录"><icon name="header_shutdown" scale = "2" style="color:#46A7FF"></icon></span>
                </div>
            </div>
            <el-dialog
                    custom-class="header-menu-edit-dialog-email"
                    :show-close="true"
                    :append-to-body="true"
                    :before-close="handleCloseEmailSetting"
                    title="邮箱设置"
                    :visible="dialogEmailSetting"
            >
               <set-email-accounts
                    @closeEmailAccountsSetting="handleCloseEmailSetting"
                    :emailAccounts="emailAccounts"
               ></set-email-accounts>
            </el-dialog>
            <el-dialog
                    v-loading="moreLoading"
                    @open="editingMode=false"
                    custom-class="header-menu-edit-dialog"
                    :append-to-body="true"
                    :close-on-click-modal="false"
                    :visible.sync="dialogVisible"
                    width="800px">
                <div >
                    <div style="background:rgba(242, 242, 242, 1);padding: 0px 24px;" v-if="editingMode">
                        <div>
                            <h4 class="theme-font" style="display:inline-block;font-size: 14px;margin: 0px;line-height: 64px">首选应用</h4>
                            <span style="font-size:12px;">可设置0-6个常用应用</span>
                            <div v-if="editingMode==true" style="display:inline-block;float:right;margin-top: 16px">
                                <el-button size="small" type="primary" @click="handleSaveCustom">保存</el-button>
                                <el-button @click="editingMode=false;" size="small">取消</el-button>
                            </div>
                        </div>
                        <div>
                                <!--<span class="custom-item-contain" style="padding-right: 20px;">-->
                                    <!--首页-->
                                <!--</span>-->
                            <span class="custom-item-contain" v-for="(item,index) in preferenceApps">
                                    {{item.name}}
                                    <span @click="removePreferenceApps(index,item)" class="header-remove-wrapper" v-if="editingMode&&!item.IS_HOME_PAGE" style="">
                                        ×
                                    </span>
                                </span>
                        </div>
                    </div>
                    <div style="padding: 0px 24px;">
                        <h4 class="theme-font" style="display:inline-block;font-size: 14px;margin: 0px;line-height: 64px">全部应用</h4>
                        <div v-if="!editingMode" style="display:inline-block;float:right;margin-top: 16px">
                            <el-button @click="setPreferenceApps()" size="small" type="primary">设置</el-button>
                            <el-button @click="dialogVisible=false" size="small">关闭</el-button>
                        </div>
                    </div>
                </div>
                <el-row style="margin-bottom: 24px">
                    <el-col :span="12" style="border-right:solid 1px #797979;">
                        <div v-for="item in leftApps">
                            <h5 style="margin-bottom:10px;">
                                <span class="small-circle" :style="{background:item.categoryColor}"></span>
                                {{item.category}}</h5>
                            <div @click="changeRoute(subItem)" v-for="(subItem,index) in item.items"
                                 :style="{padding:'0px '+(needPlusIcon(subItem)?10:18)+'px',cursor:((!needPlusIcon(subItem)&&(!editingMode))?'pointer':'normal')}"
                                 class="btn">
                                {{subItem.name}}
                                <span  @click.prevent="addPreferenceApps(subItem)" class="header-plus-wrapper" v-if="needPlusIcon(subItem)">＋</span>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div v-for="item in rightApps">
                            <h5 style="margin-bottom:10px;">
                                <span class="small-circle" :style="{background:item.categoryColor}"></span>
                                {{item.category}}</h5>
                            <div @click="changeRoute(subItem)" v-for="subItem in item.items"
                                 :style="{padding:'0px '+(needPlusIcon(subItem)?5:18)+'px',cursor:((!needPlusIcon(subItem)&&(!editingMode))?'pointer':'normal')}"
                                 class="btn">
                                {{subItem.name}}
                                <span @click.prevent="addPreferenceApps(subItem)" class="header-plus-wrapper" v-if="needPlusIcon(subItem)">
                                        ＋
                                    </span>
                            </div>
                        </div>
                    </el-col>
                </el-row>

            </el-dialog>
        </header>

        <!--<vm-data-viewer v-if="_self.JZY.s.isDebugMode()" :vm="_self" :keys="'activeMenuId activeMenuConfig'.split(' ')"></vm-data-viewer>-->
    </div>
</template>
<style lang="scss">
    $headerHeight: 50px;
    .header-menu-edit-dialog-email{

    }
    .header-menu-edit-dialog{
        .el-col-12{
            padding-left:40px;
        }
        .header-remove-wrapper{
            display:inline-block;color:#FF0000;
            cursor:pointer;font-size:10px;text-align:center;line-height:16px;margin:3px 0 0 10px;
            width:16px;height:16px;border-radius:50%;float:right;
        }
        .header-remove-wrapper:hover{
            background:rgba(255,38,38,.2);
        }
        .header-plus-wrapper{
            display: inline-block;
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 50%;
        }
        .header-plus-wrapper:hover{
            background:$theme-blue-header;
        }
        .el-dialog__header {
            height:0 !important;
        }
        .small-circle{
            width:10px;
            height:10px;
            border-radius: 50%;
            display:inline-block;
        }
        .el-dialog__body{
            margin-top: 0 !important;
            padding: 0 !important;
            overflow-y: auto !important;
            .btn{
                display: inline-block;
                margin-bottom:15px;font-size:12px;
                border: 1px solid rgb(121, 121, 121);
                margin-right: 20px;
            }
            .custom-item-contain{
                padding: 4px 10px 4px 16px;
                background: #fff;
                /*margin-top: 10px;*/
                margin-bottom: 16px;
                display: inline-block;
                margin-right:20px;
                font-size: 12px;
            }
        }
        .el-dialog__close.el-icon-close{
            display: none;
        }
    }
    .header-container {
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1999;

        header{
            // box-shadow: 0px 3px 5px rgba(153, 153, 153, 0.349019607843137);
            z-index:10;
            // min-width:1366px;
            width: 100%;
            background:#fff;
            height:$headerHeight;
            line-height:$headerHeight;
            position:fixed;
            top:0;
            left:0;
            .header_top{
                position:relative;
                .logo-wrapper{
                    height:$headerHeight;
                    width:176px;
                    line-height:$headerHeight - 10px;
                    float: left;
                    img{
                        display:inline-block;
                        width:144px;
                        height: 30px;
                        position: relative;
                        left:10px;
                        top: 10px;
                    }
                }
                .items-wrapper{
                    min-width:648px;
                    max-width:840px;
                    width:calc(100% - 176px - 16px - 185px );
                    margin-left:16px;
                    float: left;
                    .menu-item{
                        cursor:pointer;
                        float:left;
                        display:block;
                        min-width:72px;
                        max-width:96px;
                        width: 11.1111111%;
                        text-align:center;
                        height:$headerHeight - 2px;
                        font-weight:500;
                        color:$theme-black-title;
                        span{
                            display:inline-block;
                            @include font(14px,($headerHeight - 2px))
                        }
                        &.active{
                            span{
                                color:$theme-blue;
                                font-weight:600;
                                border-bottom:solid 2px $theme-blue;
                            }
                        }
                        &:hover{
                            color:$theme-blue;
                            background-color:$theme-blue-header-active;
                            font-weight:500;
                            border-bottom:solid 2px $theme-blue-header-active;
                            span{
                                border-bottom:none;
                            }
                        }

                    }
                }
                .sys-wrapper{
                    text-align:center;
                    position:absolute;
                    width:200px;
                    right: 20px;
                    top:15px;
                    text-align:right;
                    line-height:1;
                    span{
                        margin-left:20px;
                        &:hover{
                            cursor:pointer;
                        }
                    }
                }
            }
            .sys-wrapper{
                text-align:center;
                float: right;
                color: #46A7FF;
                i{
                    cursor:pointer;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
<script>
    // import headerMenuFun from './headerMenu.js'
    import locale from '@/locale/locale.js'
    import setEmailAccounts from '@Main/email/components/setEmailAccounts'
    import {email} from '@Main/email/getData';

    const HEADER_MENU_UNIQUE_KEY='name'
    export default {
        components:{
           setEmailAccounts
        },
        computed:{
            leftApps(){
                return this.allApps.filter((item,index)=> index%2==0)
            },
            rightApps(){
                return this.allApps.filter((item,index)=> index%2==1)
            }
        },
        data(){

            return {
                MAX_PREFERENCE_APP_NUM:6,
                preferenceApps:[],
                allApps:[],
                editingMode:false,
                dialogEmailSetting: false,
                dialogVisible:false,
                dialogVisible1:true,
                activeMenuId:null,
                activeMenuConfig:null,
                menuData:[],
                emailAccounts: [],
                moreLoading:false,
            }
        },
        async created(){
            await locale.getCurrentLanguage();
            if(JZY.c.AUTO_LOGIN.headers.authorization){
                this.queryAppByRole();
            }
        },
        watch:{
            $route(){
                this.setCurItemSelected();
            }
        },
        methods:{
            needPlusIcon(item){
                return this.editingMode&&!item.isInPreferenceApps&&this.MAX_PREFERENCE_APP_NUM>this.preferenceApps.length
            },
            handleSysExit(){
                this.$confirm('是否确定退出登录', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    JZY.s.logout();
                }).catch(() => {
                });

            },
            changeRoute(item){
                if(
                    (!this.editingMode)&&item.hasOwnProperty('url')
                ){
                    let findIsHava=this.menuData.find(menuItem=>menuItem.sid==item.sid);
                    if(findIsHava==undefined){
                        let lastAppItem=this.menuData[this.menuData.length-2];
                        if(lastAppItem.flowing==undefined){
                            item.flowing=true;
                            this.menuData.splice(this.menuData.length-1,0,item);
                        }else{
                            item.flowing=true;
                            this.menuData[this.menuData.length-2]=item;
                        }
                    }
                    this.activeMenuId=item.sid
                    JZY.router.push(item.url)
                    this.dialogVisible=false
                }
            },
            setPreferenceApps(){
                this.editingMode=true;
            },
            addPreferenceApps(item){
                item.isInPreferenceApps=true
                this.preferenceApps.push(item)
            },
            removePreferenceApps(index,removeItem){
                this.allApps.forEach((item,index)=>{
                    item.items.forEach((appItem,appIndex)=>{
                        if(removeItem[HEADER_MENU_UNIQUE_KEY]==appItem[HEADER_MENU_UNIQUE_KEY]){
                            appItem.isInPreferenceApps=false
                        }
                    })
                })
                this.preferenceApps.splice(index,1);
            },
            handleMenuItemClick(item){



                if(JZY.s.isAbsoluteUrl(item.url)){
                    window.open(item.url+'?tendId='+JZY.store.state.session.defaultTenat.tendId+'&userIMId='+JZY.store.state.session.userIdIM)
                    return false
                }

                // JZY.store.state.session.defaultTenat.tendId

                if(!item.isMore){

                    let handle=()=>{
                        this.activeMenuId=item.sid
                        this.activeMenuConfig=item;
                        this.JZY.s.changeRouter(item.url)
                    }
                    if(JZY.s.isUploadingFiles){
                        JZY.u.warningMsg('文件上传正在进行中，跳转后将终止文件上传，你确定要跳转吗？',true)
                            .then(()=>{
                                JZY.s.isUploadingFiles=false
                                JZY.s.eventBus.$emit('CANCEL_UPLOAD_WHEN_ROUTER_CHANGE')
                                handle()
                            })
                    }else{
                        handle()
                    }
                }else{
                    if(JZY.c.AUTO_LOGIN.headers.authorization){
                        this.moreLoading=true;
                        this.dialogVisible=true;
                        this.queryAppByRole();
                    }
                }
            },
            handleSysSetting(){
                // JZY.router.push("/systemSetting")
                // window.location.reload();
                if(this.$store.state.session.tenantInfo.isSuper=="1"){
                    window.open(location.href.split('#')[0]+'#/system/organization')
                }else {
                    JZY.u.errorMsg("您无权访问该应用请联系系统管理员");
                }
            },
            async handleEmailBoxSetting(){
                this.dialogEmailSetting = true;
                let url= JZY.xhr.transformUrl('/platform/mailboxAccount/getMailboxList','GLOBAL',false);
                await JZY.xhr.post(url,{},{alertSuccess:false}).then((res) => {
                    this.emailAccounts = res;
                });
            },
            handleCloseEmailSetting() {
                this.dialogEmailSetting = false;
                // this.$confirm('确认关闭？')
                //     .then(_ => {
                //     })
                //     .catch(_ => {});
            },
            handleSaveCustom(){
                let pas=[];
                this.preferenceApps.forEach(item=>{
                    pas.push(item.sid);
                })
                this.setCoustomAppList(pas);
            },
            async queryAppByRole(){
                let url= JZY.xhr.transformUrl('/sys/app/queryByUserId?r='+Math.random(),'GLOBAL',false);
                await JZY.xhr.post(url,{},{alertSuccess:false}).then((resultData)=>{
                    //处理头部的菜单
                    this.moreLoading=false;
                    let arryResultData=resultData[0];
                    // let arryResultData=[{"category":"协同办公","items":[{"name":"项目","category":"协同办公","remark":"夸企业协同工具，承载协同工作主要工具。","status":"1","icon":"项#e06741","url":"/project","sid":"1001"},{"name":"任务","category":"协同办公","remark":"管理团队成员的工作，可随时随地反馈和有效跟踪，多应用关联。","status":"1","icon":"任#0099ff","url":"/task","sid":"1002"},{"name":"日程","category":"协同办公","remark":"基于时间的协作工具，相互知晓同事的时间占用，避免工作冲突。","status":"1","icon":"日#00cccc","url":"/schedule","sid":"1003"},{"name":"审批","category":"协同办公","remark":"简化签批流程，提高工作效率，强化企业管理流程。","status":"1","icon":"审#ff9900","url":"/approve","sid":"1004"}],"categoryColor":"#FF0000"},{"category":"营销管理（CRM）","items":[{"name":"CRM","category":"营销管理（CRM）","remark":"客户/联系人是销售管理的核心，有效的管理企业资源才是保证企业长期发展的重要数据。\r\n\r\n","status":"1","icon":"客#cc6600","url":"/crm","sid":"1005"}],"categoryColor":"#00CCFF"},{"category":"文档管理","items":[{"name":"网盘","category":"文档管理","remark":"企业网盘，全文检索，可授权的网络存储。","status":"1","icon":"盘#cc6600","url":"/disk","sid":"1008"},{"name":"新闻","category":"文档管理","remark":"信息发布，意见收集。","status":"1","icon":"新#00cccc","url":"/news","sid":"1009"},{"name":"邮箱","category":"文档管理","remark":"使用邮箱管理功能","status":"1","icon":null,"url":"/email","sid":"1014"}],"categoryColor":"#19A2FF"},{"category":"EHR","items":[{"name":"人事管理","category":"EHR","remark":"开启人事管理功能，包括组织管理，薪酬管理、考勤管理、培训管理等\r\n\r\n","status":"1","icon":null,"url":"/hr","sid":"1015"}],"categoryColor":"#FF66CC"},{"category":"汇报日志","items":[{"name":"日志","category":"汇报日志","remark":"每日计划，工作记录，工作小结，评阅指导\r\n\r\n每日计划，工作记录，工作小结，评阅指导.","status":"1","icon":"志#cc6600","url":"/journal/mine","sid":"1010"},{"name":"计划","category":"汇报日志","remark":"记录每周、每月、每年达成了哪些工作成效，总结成长的心得\r\n\r\n","status":"1","icon":"计#0099ff","url":"/plan","sid":"1011"}],"categoryColor":"#FF9900"},{"category":"行政办公","items":[{"name":"办公用品","category":"行政办公","remark":"办公用品库存管理。","status":"1","icon":"品#999933","url":"/office/management","sid":"1012"},{"name":"会议/会议室","category":"行政办公","remark":"会议及会议室的管理，发布等","status":"1","icon":"会#0099ff","url":"/meeting/management","sid":"1013"},{"name":"合同管理","category":"行政办公","remark":"合同的维护，付款记录等","status":"1","icon":null,"url":"/contract","sid":"1016"}],"categoryColor":"#00CC00"},{"category":"visible","items":[{"name":"日程","category":"协同办公","remark":"基于时间的协作工具，相互知晓同事的时间占用，避免工作冲突。","status":"1","icon":"日#00cccc","url":"/schedule","sid":"1003","isMore":false,"isInPreferenceApps":{"name":"日程","category":"协同办公","remark":"基于时间的协作工具，相互知晓同事的时间占用，避免工作冲突。","status":"1","icon":"日#00cccc","url":"/schedule","sid":"1003"}},{"name":"审批","category":"协同办公","remark":"简化签批流程，提高工作效率，强化企业管理流程。","status":"1","icon":"审#ff9900","url":"/approve","sid":"1004","isMore":false,"isInPreferenceApps":{"name":"审批","category":"协同办公","remark":"简化签批流程，提高工作效率，强化企业管理流程。","status":"1","icon":"审#ff9900","url":"/approve","sid":"1004"}},{"name":"任务","category":"协同办公","remark":"管理团队成员的工作，可随时随地反馈和有效跟踪，多应用关联。","status":"1","icon":"任#0099ff","url":"/task","sid":"1002","isMore":false,"isInPreferenceApps":{"name":"任务","category":"协同办公","remark":"管理团队成员的工作，可随时随地反馈和有效跟踪，多应用关联。","status":"1","icon":"任#0099ff","url":"/task","sid":"1002"}}]}]
                    let allCategoryColors='#FF0000 #00CCFF #19A2FF #FF66CC #FF9900 #00CC00'.split(' ');
                    this.menuData=[];
                    this.preferenceApps=[];
                    let isCurUrlCunstom=true;     //当前url地址的项目是否已在自定义菜单里
                    //用户自定义的项目
                    let myCustomObj=arryResultData.find(item=>item.category=="visible");
                    if(myCustomObj!=undefined){
                        let myCustomItems=myCustomObj.items;
                        this.preferenceApps=JZY.u.copy(myCustomItems);
                        this.menuData.push({url:'/',name:"首页",sid:'indexfirst',isMore:false});
                        myCustomItems.forEach(appitem=>{
                            appitem.isMore=false;
                            this.menuData.push(appitem);
                        })
                        this.menuData.push({url:'/more',name:"更多",sid:'more',isMore:true});
                        let currentUrl=(this.JZY.s.getPathName().split('/')[1]||'');
                        currentUrl=currentUrl.split('?')[0]||'';
                        let activeMenuObj=this.menuData.find((item)=>{
                            return currentUrl==(item.url).split('/')[1];
                        })
                        if(activeMenuObj){
                            this.activeMenuId=activeMenuObj.sid;
                            this.activeMenuConfig=activeMenuObj
                        }else{
                            isCurUrlCunstom=false;
                        }
                    }else{
                        this.menuData.push({url:'/',name:"首页",sid:'indexfirst',isMore:false});
                        this.menuData.push({url:'/more',name:"更多",sid:'more',isMore:true});
                    }
                    arryResultData.forEach((item,index)=>{
                        if(item.category=="visible"){
                            arryResultData.splice(index,1);
                        }
                        item.categoryColor=allCategoryColors[index];
                        item.items.forEach(childItems=>{
                            if(item.category!="visible"){
                                let findCustom=this.preferenceApps.find((eachItem)=>eachItem[HEADER_MENU_UNIQUE_KEY]==childItems[HEADER_MENU_UNIQUE_KEY]);
                                if(findCustom!=undefined){
                                    childItems.isInPreferenceApps=true;
                                }
                                if(!isCurUrlCunstom){
                                    let currentUrl='/'+(this.JZY.s.getPathName().split('/')[1]||'');
                                    let childItemUrl='/'+(childItems.url.split('/')[1]||'');
                                    if(currentUrl==childItemUrl && currentUrl!=""){
                                        childItems.flowing=true;
                                        this.menuData.splice(this.menuData.length-1,0,childItems);
                                        this.activeMenuId=childItems.sid;
                                        isCurUrlCunstom=true;
                                    }
                                }
                            }
                        })
                    })
                    this.allApps=JZY.u.copy(arryResultData);
                }).catch((e)=>{
                    //接口失败
                    // JZY.u.errorMsg("获取用户菜单失败");
                    this.moreLoading=false;
                })
            },
            setCurItemSelected(){
                //根据路由地址把对应的模块标为选中状态
                try{
                    let currentUrl=(this.JZY.s.getPathName().split('/')[1]||'');
                    currentUrl=currentUrl.split('?')[0]||'';
                    let activeMenuObj=this.menuData.find((item)=>{
                        return currentUrl==(item.url).split('/')[1];
                    })
                    if(activeMenuObj){
                        this.activeMenuId=activeMenuObj.sid;
                        this.activeMenuConfig=activeMenuObj
                    }else{
                        currentUrl="/"+currentUrl;
                        this.allApps.forEach((item,index)=>{
                            if(item.category!="visible"){
                                item.items.forEach((childItems)=>{
                                    let childItemUrl='/'+(childItems.url.split('/')[1]||'');
                                    if(currentUrl==childItemUrl) {
                                        let lastMenusItem=this.menuData[this.menuData.length - 2];
                                        //判断更多前面的一个是否是临时的
                                        if(lastMenusItem.flowing){
                                            childItems.flowing = true;
                                            this.menuData.splice(this.menuData.length - 2, 1, childItems);
                                            this.activeMenuId = childItems.sid;
                                        }else{
                                            childItems.flowing = true;
                                            this.menuData.splice(this.menuData.length - 1, 0, childItems);
                                            this.activeMenuId = childItems.sid;
                                        }
                                    }
                                })
                            }
                        })
                    }
                }catch (e){}
            },
            async setCoustomAppList(pas){
                let url= JZY.xhr.transformUrl('/sys/appUser/updateAppList','GLOBAL',false);
                await JZY.xhr.post(url,pas,{alertSuccess:true}).then((resultData)=>{
                    // console.log("queryAppByRole",resultData);
                    this.menuData=[];
                    this.menuData.push({url:'/',name:"首页",sid:'indexfirst',isMore:false});
                    resultData[0].forEach(appitem=>{
                        appitem.isMore=false;
                        this.menuData.push(appitem);
                    })
                    this.menuData.push({url:'/more',name:"更多",sid:'more',isMore:true});
                    this.setCurItemSelected();
                    this.dialogVisible=false;
                }).catch((e)=>{
                    //接口失败
                })
            },
        },
    }
</script>
