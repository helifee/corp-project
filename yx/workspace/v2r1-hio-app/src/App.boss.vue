<template>
    <div v-if="languageLoaded" class="content-wrapper">

        <div class="header_top" style="width:100%;background:#fff;">
            <div class="logo-wrapper">
                <img :src="JZY.store.state.session.tenantInfo.logo || JZY.c.imgPath+'/hiologo@2x.png'">
            </div>
            <div  class="items-wrapper">
                <el-menu style="display:inline-block;box-sizing:border-box;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="/netDisk">企业网盘</el-menu-item>

                </el-menu>
                <!--<div :class="{active:activeMenuId==item.sid}" v-for="item in menuData" class="menu-item"-->
                     <!--@click="handleMenuItemClick(item)"><span>{{item.name}}</span></div>-->
            </div>
            <div class="sys-wrapper">
                <!-- <el-button size="mini" @click="JZY.s.logout()">logout</el-button> -->
                <!-- <el-button @click="" circle type="primary" size="mini" class="el-icon-search"></el-button> -->
                <!-- <el-button @click="handleSysSetting" circle type="primary" size="mini" class="el-icon-setting"></el-button>
                <el-button @click="handleEmailBoxSetting" circle type="primary" size="mini" class="el-icon-message"></el-button> -->
                <!-- <el-button @click="" circle type="primary" size="mini" class="el-icon-service"></el-button> -->

                <!--<span v-if="$store.state.session.tenantInfo.isSuper=='1'" @click="handleSysSetting" title="系统设置"><icon name="header_set" scale = "2" style="color:#46A7FF" ></icon></span>-->
                <!--<span @click="handleEmailBoxSetting" title="我的邮箱"><icon name="header_email" scale = "2" style="color:#46A7FF"></icon></span>-->
                <span @click="handlePageClose" title="关闭页面"><icon name="header_shutdown" scale = "2" style="color:#46A7FF"></icon></span>
            </div>
        </div>

        <!--<el-menu style="width:100%;position:fixed;top:0;left:0;z-index:2000;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
            <!--<el-menu-item index="/netDisk">企业网盘</el-menu-item>-->

        <!--</el-menu>-->
        <!--<jzy-header ref="header" v-if="isHideHeaderInvokeCount>=2 && !isHideHeader"></jzy-header>-->
        <!--style="height:100%"-->
        <div :class="{'cc-main-wrapper':JZY.IS_CC,'main-wrapper': !isHideHeader}">
            <div v-if="isHideHeaderInvokeCount>=2 &&!isFullPage()" class="aside-menu-wrapper">
                <!--<home-left v-if="routerModuleLoaded&&JZY.s.getPathName()=='/'"></home-left>-->
                <!--<home-left v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/phoneList')"></home-left>-->
                <!--&lt;!&ndash;<demo-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/demo')"></demo-menu>&ndash;&gt;-->
                <!--<news-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/news')"></news-menu>-->
                <!--<crm-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/crm')"></crm-menu>-->
                <!--&lt;!&ndash;<news-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/news/details')"></news-menu>&ndash;&gt;-->
                <!--&lt;!&ndash;<ehr-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/ehr')"></ehr-menu>&ndash;&gt;-->
                <!--<task-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/task')"></task-menu>-->
                <!--<approve-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/approve')"></approve-menu>-->
                <!--<plan-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/plan')"></plan-menu>-->
                <!--<project-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/project')"></project-menu>-->
                <!--<email-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/email')"></email-menu>-->
                <!--<office-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/office')"></office-menu>-->

                <net-disk-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/netDisk')"></net-disk-menu>
                <!--<personal-net-disk-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/personalNetDisk')"></personal-net-disk-menu>-->

                <!--<journal-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/journal')"></journal-menu>-->
                <!--<meeting-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/meeting')"></meeting-menu>-->
                <!--<hr-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/hr')"></hr-menu>-->
                <!--<contract-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/contract')"></contract-menu>-->

            </div>


            <div style="margin-top:75px;margin-right:12px;" :class="{'full-page-content':isFullPage(),'page-content-with-aside':isHideHeaderInvokeCount>=2 && !isFullPage()}" class="page-content">
                <router-view v-loading="isLoading" class="router-wrapper"></router-view>
            </div>
        </div>

    </div>
</template>

<style lang="scss">

    // @import "../../static/styles/index.scss";
    /*@import "../asserts/styles/index.scss";*/
    $headerHeight: 60px;
    .header_top{
        position:fixed;
        top:0;
        left:0;
        z-index:2000;
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


    $headerHeight: 60px;

    .content-wrapper{
        height:100%;
        overflow-y:auto;
        /*overflow-x:hidden;*/
        .main-wrapper{

            position: absolute;
            left: 0;
            /*top: 50px;*/
            width: 100%;
            // padding-top:6px;
            background-color:$theme-grey-body-background;
            height: calc(100% - 10px);
            // overflow-y: auto;
            overflow-y: hidden;
            &.cc-main-wrapper{

                top:0;
                height:100%;
                .aside-menu-wrapper{
                    margin-top:0;
                }
            }
            /*min-height: 100px;*/
            /*height: 100%;*/
            /*margin-bottom: 60px;*/
        }

        .page-content{
            float:right;
            height:calc(100% - 32px);
            background:rgba(255, 255, 255, 1);
            /*margin-right:1%;*/
            box-sizing: border-box;
            /*padding:10px;*/
            /*transition: width linear 0.2s;*/
            /*margin-top: 12px;*/
            &.page-content-with-aside{
                // width:82.333%;
                width:calc(100% - 176px - 16px - 8px);
                // overflow-y:auto;
                // height:100%;
                position: relative;
                /*margin-top:16px;*/
                margin-right:8px;
            }
            &.full-page-content{
                width:100%;
                height: 100%;
            }
        }
        .aside-menu-wrapper{
            width:176px;
            height:calc(100% );
            background:#fff;
            // box-shadow:3px 0px 5px rgba(153, 153, 153, 0.349019607843137);
            position:fixed;
            left:0;
            bottom: 0;
            top:0px;
            margin-top: 61px;
            overflow-y: auto;
            /*&.cc-aside-menu-wrapper{*/
            /*margin-top:0;*/
            /*}*/
        }


        .router-wrapper{
            height:calc(100% - 50px);
            overflow-y:auto;
            // overflow-x:hidden;
            // min-width:1366px;
            // position: absolute;
            // top: 0;
            // bottom: 0;
            width: 100%;
            box-sizing: border-box;
            transition:none;
            // padding:16px 24px;
        }


    }
    .horizontal-collapse-transition{
        display: none;
    }

</style>

<script>
    // import jzyHeader from '@jzyHeader'
    // import homeLeft from '@Main/home/home.left.vue'
    // import demoMenu from '@Main/demo/demo.menu.vue'
    // import newsMenu from '@Main/news/news.menu.vue'
    // import crmMenu from '@Main/crm/crm.menu.vue'
    // import planMenu from '@Main/plan/plan.menu.vue'
    // import taskMenu from '@Main/task/task.menu.vue'
    // import approveMenu from '@Main/approve/approve.menu.vue'
    // import projectMenu from '@Main/project/project.menu.vue'
    // import emailMenu from '@Main/email/email.menu.vue'
    // import officeMenu from '@Main/officeSupplies/office.menu.vue'

    import netDiskMenu from '@Main/netDisk/netDisk.menu.vue'

    // import journalMenu from '@Main/journal/journal.menu.vue'
    // import meetingMenu from '@Main/meeting/meeting.menu.vue'
    //
    // import hrMenu from '@Main/hr/hr.menu.vue'
    // import contractMenu from '@Main/contract/contract.menu.vue'
    // import personalNetDiskMenu from '@Main/personalNetDisk/personalNetDisk.menu.vue'


    // import jQuery from 'jquery'



    import router from '@/router/router.js'

    // import {Loading} from 'element-ui'
    // let loadingInstance
    //
    // router.beforeEach((to,from,next)=>{
    //     loadingInstance = Loading.service({
    //         fullscreen: true,
    //         // background:"rgba(0, 0, 0, 0.8)"
    //     });
    //
    //     next()
    // })
    //
    // router.afterEach(()=>{
    //     setTimeout(()=>{
    //         loadingInstance.close()
    //     },300)
    //
    // })




    import {mapState} from 'vuex'
    export default{
        watch:{
            // '$store.state.route.query':function(nv,ov){
            //     if(Object.keys(ov).length>0){
            //         location.reload()
            //     }
            //     console.log('route query has been changed',arguments)
            // }
        },
        computed:{
            isHideHeader:function(){

                // if(process.env.FOR_BOSS==1){
                //     return true
                // }

                let pthArr = this.$route.path.split("/");

                this.isHideHeaderInvokeCount++

                if(pthArr[1]) {
                    pthArr[1] = "/" + pthArr[1];
                    return JZY.s.isHideHeader.includes(pthArr[1]);
                }else{
                    return false
                }
                return true;
            },
            ...mapState(['isLoading'])
        },
        components:{
            // hrMenu,
            netDiskMenu,
            // homeLeft,
            // jzyHeader,
            // demoMenu,
            // newsMenu,
            // crmMenu,
            // planMenu,
            // taskMenu,
            // approveMenu,
            // projectMenu,
            // emailMenu,
            // officeMenu,
            // journalMenu,
            // meetingMenu,
            // contractMenu,
            // personalNetDiskMenu
        },
        methods:{
            handlePageClose(){
              window.close()
            },
            isFullPage(){
                //   return JZY.s.fullPageModulesPath.includes(JZY.s.getPathName())
                let pthArr = this.$route.path.split("/");
                if(pthArr[1]) {
                    pthArr[1] = "/" + pthArr[1];
                    return JZY.s.fullPageModulesPath.includes(pthArr[1]);
                }
                return false;

                //
                // let res
                //
                // try{
                //     res=!(this.$refs.header&&this.$refs.header.activeMenuConfig.asideMenu)
                // }catch(e){
                //     res=true
                // }
                //
                // return res
            }
        },
        data(){
            return {
                activeIndex:'',
                isHideHeaderInvokeCount:0,
                languageLoaded:false,
                routerModuleLoaded:false
                // loading:true
            }
        },
        created(){


        },
        async mounted(){
            this.activeIndex=JZY.s.getPathName()

            // let locale='zh-CN'
            let locale=(await JZY.locale.getCurrentLanguage());



            this.languageLoaded=true
            //
            // let lowerLocale=locale.toLowerCase()
            // let underscoreLocale=locale.split('-').join('_')
            //
            //
            // jQuery.getScript('/static/utf8-php/lang/'+lowerLocale+'/'+lowerLocale+'.js')
            // jQuery.getScript('/static/plupload/js/i18n/'+underscoreLocale+'.js')
            // jQuery.getScript('/plugins/utf8-php/lang/'+(ueLan+'/'+ueLan)+'.js\')

            // this.JZY.s.reloadWhenHMR()


            router.beforeEach((to,from,next)=>{
                this.routerModuleLoaded=true

                next()
            })

            router.afterEach(()=>{
                // setTimeout(()=>{
                this.routerModuleLoaded=true
                // },300)

            })



            // 接下来要做的事情
            // TODO:  1、动态push路由，导致的tab切换
            // TODO： 2、浏览器的后退按钮要处理
            // TODO:  3、控制页面第二次刷新问题，还有/的问题
            // TODO:  4、文档
            // TODO:  5、存入的localstorage到时候要删除掉，退出的时候
            // TODO:  6、优化代码构建完毕之后的大小
        }
    }
</script>
