<template>
    <!--系统设置主容器-->
    <div class="content-wrapper">
        <settingHeader v-if="!isHideHeader()"></settingHeader>
        <div class="main-wrapper" :class="{'cc-main-wrapper':JZY.IS_CC}" :style="{top:$store.state.route.path=='/login'?'0':'52px',
    height:$store.state.route.path=='/login'?'100%':'calc(100% - 52px)'}">
            <div v-if="!isFullPage()" class="aside-menu-wrapper">
                <orgMenu v-if="routerModuleLoaded&&JZY.s.getPathName()=='/system/organization'"></orgMenu>
                <roleMenu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/system/role')"></roleMenu>
                <applicationMenu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/system/application')"></applicationMenu>
                <companyMenu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/system/company')"></companyMenu>
                <!--&lt;!&ndash;<news-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/news/details')"></news-menu>&ndash;&gt;-->
                <!--<ehr-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/ehr')"></ehr-menu>-->
                <!--<task-menu v-if="routerModuleLoaded&&JZY.s.getPathName().startsWith('/task')"></task-menu>-->
            </div>
            <div :class="{'full-page-content':isFullPage(),'page-content-with-aside':!isFullPage()}" class="page-content">
                <router-view class="router-wrapper"></router-view>
            </div>
        </div>

    </div>
</template>

<script>
    import settingHeader from './Header/header.vue'
    import orgMenu from './main/organization/organization.menu.vue'
    import applicationMenu from './main/application/application.menu.vue'
    import companyMenu from './main/company/company.menu.vue'
    import roleMenu from './main/role/role.menu.vue'
    export default {
        components:{
            settingHeader,
            orgMenu,
            applicationMenu,
            companyMenu,
            roleMenu
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
                return JZY.s.fullPageModulesPath.includes(JZY.s.getPathName())
            }
        },
        data(){
            return {
                // languageLoaded:true,
                routerModuleLoaded:false
            }
        },
        async mounted(){

            // let locale='zh-CN'
            let locale=(await JZY.locale.getCurrentLanguage());

            this.languageLoaded=true

            let lowerLocale=locale.toLowerCase()
            let underscoreLocale=locale.split('-').join('_')


            jQuery.getScript('/static/ueditor/lang/'+lowerLocale+'/'+lowerLocale+'.js')

            // this.JZY.s.reloadWhenHMR()


            this.$router.beforeEach((to,from,next)=>{
                this.routerModuleLoaded=true

                next()
            })

            this.$router.afterEach(()=>{
                // setTimeout(()=>{
                this.routerModuleLoaded=true
                // },300)

            })
        }
    }
</script>

<style scoped lang="scss">
    /*@import "../../static/styles/index.scss";*/
    $headerHeight: 50px;
    .content-wrapper{
        height:100%;
        overflow-y:scroll;
        /*overflow-x:hidden;*/
        .main-wrapper{
            position: absolute;
            left: 0;
            /*top: 52px;*/
            width: 100%;
            /*height: calc(100% - 52px);*/
            background-color:$theme-grey-body-background;
            overflow-y: scroll;
            &.cc-main-wrapper{
                top:0;
                height:100%;
                .aside-menu-wrapper{
                    margin-top:0;
                }
            }
        }

        .page-content{
            float:right;
            background:rgba(255, 255, 255, 1);
            box-sizing: border-box;
            &.page-content-with-aside{
                width:calc(100% - 176px - 16px);
                /*height:calc(100% - 16px);*/
                position: relative;
                margin-right:0;
            }
            &.full-page-content{
                width:100%;
            }
        }
        .aside-menu-wrapper{
            width:176px;
            height:calc(100% - 50px);
            background:rgba(255, 255, 255, 1);
            /*box-shadow:3px 0px 5px rgba(153, 153, 153, 0.349019607843137);*/
            position:fixed;
            left:0;
            bottom: 0;
            top:0px;
            margin-top: 54px;
            overflow-y: auto;
        }
        .router-wrapper{
            width: 100%;
            box-sizing: border-box;
            transition:none;
        }
    }
    .horizontal-collapse-transition{
        display: none;
    }
</style>