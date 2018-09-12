<template>
    <div v-if="languageLoaded" class="content-wrapper" :class="JZY.IS_CC?'cc-content-wrapper':''" style="overflow-y:auto;">
        <!--<jzy-header ref="header" v-if="!isHideHeader()"></jzy-header>-->
        <!--&lt;!&ndash;style="height:100%"&ndash;&gt;-->
        <!--<div  :class="{'cc-main-wrapper':JZY.IS_CC,'main-wrapper': !isHideHeader()}">-->
            <!--<div v-if="!isFullPage()" class="aside-menu-wrapper">-->
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

                <!--<net-disk-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/netDisk')"></net-disk-menu>-->
                <!--<personal-net-disk-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/personalNetDisk')"></personal-net-disk-menu>-->

                <!--<journal-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/journal')"></journal-menu>-->
                <!--<meeting-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/meeting')"></meeting-menu>-->
                <!--<hr-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/ehr')"></hr-menu>-->
                <!--<contract-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/contract')"></contract-menu>-->

            <!--</div>-->


            <!--<div :class="{'full-page-content':isFullPage(),'page-content-with-aside':!isFullPage()}" class="page-content">-->
                <router-view v-loading="isLoading" class="router-wrapper"></router-view>
        <div style="height:500px;width:100%;" v-if="!hasAppLoaded" v-loading="trueVar"></div>
            <!--</div>-->
        <!--</div>-->

    </div>
</template>

<style lang="scss">

    @import "./static/styles/index.scss";
    /*@import "../asserts/styles/index.scss";*/



    .cc-body{
        .el-dialog{
            width:90%;
        }
        /*width:660px;*/
        overflow:auto;
        .net-disk-wrapper .upload-list-wrapper{
            width:95%;
        }


        .net-disk-wrapper {
            min-width: 1048px !important;
            /*.el-table {*/
                /*max-width: 300% !important;*/
                /*width: 1048px !important;*/
            /*}*/
        }
        /*.cc-content-wrapper{*/
            /*min-width:850px;*/
        /*}*/
    }



</style>

<script>



    import jQuery from 'jquery'



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
          '$store.state.route.query':(function(){
              var changeCount=0
             return function(nv,ov){
                 changeCount++
                 if(changeCount>1 && ((nv.accessToken&&nv.accessToken.trim()!=''&&JZY.c.AUTO_LOGIN.headers.authorization!=nv.accessToken)||
                     (nv.tendId && nv.tendId.trim()!=''&&JZY.c.AUTO_LOGIN.headers.tendId!=nv.tendId))){
                     location.reload()
                 }

                 // if(Object.keys(ov).length>0){
                 //     location.reload()
                 // }
                 console.log('route query has been changed',arguments)
             }
          })()
        },
        computed:{
            ...mapState(['isLoading'])
        },
        components:{
            // hrMenu,
            // netDiskMenu,
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
            isHideHeader(){
                let pthArr = this.$route.path.split("/");
                if(pthArr[1]) {
                    pthArr[1] = "/" + pthArr[1];
                    return JZY.s.isHideHeader.includes(pthArr[1]);
                }
                return false;
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
                trueVar:true,
                hasAppLoaded:false,
                languageLoaded:false,
                routerModuleLoaded:false
                // loading:true
            }
        },
        created(){



            // let memeryAuthorization=JZY.c.AUTO_LOGIN.headers.authorization
            // let authorization=localStorage.getItem('authorization')
            //
            // if(authorization && (!memeryAuthorization)){
            //     // if(authorization && (!memeryAuthorization)){
            //     // JZY.s.clog("JZY.c.AUTO_LOGIN--:",JSON.stringify(JZY.c.AUTO_LOGIN))
            //     JZY.c.AUTO_LOGIN.headers.authorization=authorization
            // }
        },
        async mounted(){

            JZY.s.appInstance=this;
            // this.hasAppLoaded=true
            // JZY.s.showLoading()
            // let locale='zh-CN'
            let locale=(await JZY.locale.getCurrentLanguage());

            this.languageLoaded=true

            let lowerLocale=locale.toLowerCase()
            let underscoreLocale=locale.split('-').join('_')


            // jQuery.getScript('/static/ueditor/lang/'+lowerLocale+'/'+lowerLocale+'.js')
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
