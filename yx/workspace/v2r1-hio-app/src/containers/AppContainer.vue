<template>
    <div v-if="languageLoaded" class="content-wrapper">
        <jzy-header ref="header" v-if="isHideHeaderInvokeCount>=2 && !isHideHeader"></jzy-header>
        <!--style="height:100%"-->
        <div :class="{'cc-main-wrapper':JZY.IS_CC,'full_page':isFullPage(),'main-wrapper': !isHideHeader}">
            <div v-if="isHideHeaderInvokeCount>=2 &&!isFullPage()" class="aside-menu-wrapper">
                <home-left v-if="routerModuleLoaded&&JZY.s.getPathName()=='/'"></home-left>
                <home-left v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/phoneList')"></home-left>
                <!--<demo-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/demo')"></demo-menu>-->
                <news-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/news')"></news-menu>
                <crm-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/crm')"></crm-menu>
                <!--<news-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/news/details')"></news-menu>-->
                <!--<ehr-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/ehr')"></ehr-menu>-->
                <task-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/task')"></task-menu>
                <approve-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/approve')"></approve-menu>
                <plan-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/plan')"></plan-menu>
                <project-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/project')"></project-menu>
                <email-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/email')"></email-menu>
                <office-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/office')"></office-menu>

                <net-disk-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/netDisk')"></net-disk-menu>
                <personal-net-disk-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/personalNetDisk')"></personal-net-disk-menu>

                <journal-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/journal')"></journal-menu>
                <meeting-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/meeting')"></meeting-menu>
                <hr-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/hr')"></hr-menu>
                <contract-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/contract')"></contract-menu>

            </div>


            <div :class="{'full-page-content':isFullPage(),'page-content-with-aside':isHideHeaderInvokeCount>=2 && !isFullPage()}" class="page-content">
                <router-view v-loading="isLoading" class="router-wrapper"></router-view>
            </div>
        </div>

    </div>
</template>

<style lang="scss">

  // @import "../../static/styles/index.scss";
  /*@import "../asserts/styles/index.scss";*/



    $headerHeight: 60px;

    .content-wrapper{
        height:100%;
        overflow-y:auto;
        /*overflow-x:hidden;*/
        .full_page{
            // height:100%;
        }
        .main-wrapper{

            position: absolute;
            left: 0;
            top: 50px;
            width: 100%;
            // padding-top:6px;
            background-color:$theme-grey-body-background;
            height: calc(100% - 50px);
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
                margin-top:16px;
                margin-right:8px;
            }
            &.full-page-content{
                width:100%;
                height: 100%;
            }
        }
        .aside-menu-wrapper{
            width:176px;
            height:calc(100% - 51px);
            background:#fff;
            // box-shadow:3px 0px 5px rgba(153, 153, 153, 0.349019607843137);
            position:fixed;
            left:0;
            bottom: 0;
            top:0px;
            margin-top: 51px;
            overflow-y: auto;
            /*&.cc-aside-menu-wrapper{*/
                /*margin-top:0;*/
            /*}*/
        }


        .router-wrapper{
            height:100%;
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
    import jzyHeader from '@jzyHeader'
    import homeLeft from '@Main/home/home.left.vue'
    import demoMenu from '@Main/demo/demo.menu.vue'
    import newsMenu from '@Main/news/news.menu.vue'
    import crmMenu from '@Main/crm/crm.menu.vue'
    import planMenu from '@Main/plan/plan.menu.vue'
    import taskMenu from '@Main/task/task.menu.vue'
    import approveMenu from '@Main/approve/approve.menu.vue'
    import projectMenu from '@Main/project/project.menu.vue'
    import emailMenu from '@Main/email/email.menu.vue'
    import officeMenu from '@Main/officeSupplies/office.menu.vue'

    import netDiskMenu from '@Main/netDisk/netDisk.menu.vue'

    import journalMenu from '@Main/journal/journal.menu.vue'
    import meetingMenu from '@Main/meeting/meeting.menu.vue'

    import hrMenu from '@Main/hr/hr.menu.vue'
    import contractMenu from '@Main/contract/contract.menu.vue'
    import personalNetDiskMenu from '@Main/personalNetDisk/personalNetDisk.menu.vue'


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
            hrMenu,
            netDiskMenu,
            homeLeft,
            jzyHeader,
            demoMenu,
            newsMenu,
            crmMenu,
            planMenu,
            taskMenu,
            approveMenu,
            projectMenu,
            emailMenu,
            officeMenu,
            journalMenu,
            meetingMenu,
            contractMenu,
            personalNetDiskMenu
        },
        methods:{

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
                isHideHeaderInvokeCount:0,
                languageLoaded:false,
                routerModuleLoaded:false
                // loading:true
            }
        },
        created(){


        },
        async mounted(){

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
