<template>
    <div class="homeContainer">
        <!--系统头部-->
        <div v-once :is='headerTemp'></div>
        <div class="menu-tabs-row">
            <!--三级菜单导航-->
            <navigation-temp></navigation-temp>
            <!--一级tab功能-->
            <tabs-temp></tabs-temp>
        </div>
        <!--路由渲染功能-->
        <content-temp></content-temp>
    </div>
</template>

<style scoped lang="scss">
    /*不要嵌套太深*/

    /*定义内容区域常量*/

    $contentWidth: 1200px;

    .homeContainer {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: static;
        width: 100%;
        height: 100%;
        > div {
            width: 100%;
        }
    }

    .menu-tabs-row {
        position: relative;
        z-index: 999;
    }
</style>

<script>

    import {mapState} from 'vuex'
    import * as mainConst from '@/store/mainConst.js'
    import config from '@/config'

    // TODO：头部的引入，应该也是按需加载就可以更好的优化代码了
    /***引入各组件Header部分***/
    import b2bHeaderTemp from '@B2B/HeaderTemplate.vue'
    import tmsHeaderTemp from '@Tms/HeaderTemplate.vue'
    import wmsHeaderTemp from '@Wms/HeaderTemplate.vue'
    import scmHeaderTemp from '@Scm/HeaderTemplate.vue'
    import bossHeaderTemp from '@Boss/HeaderTemplate.vue'

    /***引入主体部分***/
    import navigationTemp from '@/containers/main/MainNavigation.vue'
    import tabsTemp from '@/containers/main/TabsTemplate.vue'
    import contentTemp from '@/containers/main/ContentTemplate.vue'
    export default {
        data() {
            return {
                headerTemp: '',
                systemArr:['crm','b2b','billing','permission','pay','tms','wms','coderule','scm','org','boss']
            }
        },
        computed: {
            ...mapState([
                'systemName',
                'userAuthor'
            ])
        },
        components: {
            navigationTemp,
            tabsTemp,
            contentTemp,
            b2bHeaderTemp,
            tmsHeaderTemp,
            wmsHeaderTemp,
            scmHeaderTemp,
            bossHeaderTemp
        },
        created() {
            let _this=this
            let urlArr = this.$route.path.split('/')
            // *路由初次进入和刷新控制*

            // 一、最外层的第一步其实还有任何没有在路由中的请求都会跳转404页面，包括/,所以像/b/a这种不规范的路径已经被杜绝了

            // 二、如果不存在systemName,那么说明是第一次进入
            if (this.systemName == '') {
                // 1、如果是第一次进入，判断url的前缀是iframe，则跳转404,要不然头部不知道请求哪个
                if (this.$route.path.toLowerCase().indexOf("/iframe") == 0) {
                    this.$router.push('/404')
                } else{
                    // 2、如果是第一次进入，判断url的前缀不是iframe

                    // 2.1、判断是否要做权限校验
                    if(config.setting.permission){
                        // 3.1、防止盗链
                        if(this.userAuthor.token){
                            // TODO；这里考虑token过期问题
                            // TODO；这里考虑跳转的页面，用户是否有权限登录
                            // 如果用户登陆过,则获取报文的第一段路径，存入systemName
                            this.$store.commit(mainConst.M_SET_SYSTEMNAME, urlArr[1])
                            this.chooseHeader(`/${urlArr[1]}`)
                        }
                        else{
                            // 3.2、如果用户没登陆过,则获跳转登录页
                            this.$store.commit(mainConst.M_SET_SYSTEMNAME, '')
                            this.$router.push(`${urlArr[1]}Login`)
                        }
                    }
                    else{
                        // 2.2、不做权限控制
                        this.$store.commit(mainConst.M_SET_SYSTEMNAME, urlArr[1])
                        this.chooseHeader(`/${urlArr[1]}`)
                    }

                }
            } else {
                // 三、如果存在systemName,那么说明是刷新问题
                // 2.0如果已经是b2b系统了，但是直接切换/crm系统，还要跳转到b2b首页问题
                if(urlArr.length<3){
                    this.systemArr.forEach(item=>{
                        if(item==urlArr[1]){
                            _this.$router.push(`/${this.systemName}`)
                        }
                    })
                }

                // 2.1、判断是否要做权限校验
                if(config.setting.permission){
                    // 3.1、防止盗链
                    if(this.userAuthor.token){
                        // TODO；这里考虑token过期问题
                        // TODO；这里考虑跳转的页面，用户是否有权限登录
                        this.chooseHeader(`/${this.systemName}`)
                    }
                    else{
                        // 3.2、如果用户没登陆过,则获跳转登录页
                        this.$store.commit(mainConst.M_SET_SYSTEMNAME, '')
                        this.$router.push(`${urlArr[1]}Login`)
                    }
                }
                else{
                    // 2.2、不做权限控制
                    this.chooseHeader(`/${this.systemName}`)
                }
            }

        },
        mounted(){
        },
        methods:{
            // 选择头部
            chooseHeader(url){
                // TODO：这里写到一个数组中循环更好
                switch (url) {
                    case '/crm':
                        this.headerTemp = 'bossHeaderTemp'
                        return
                    case '/b2b':
                        this.headerTemp = 'b2bHeaderTemp'
                        return
                    case '/billing':
                        this.headerTemp = 'bossHeaderTemp'
                        return
                    case '/permission':
                        this.headerTemp = 'bossHeaderTemp'
                        return
                    case '/pay':
                        this.headerTemp = 'bossHeaderTemp'
                        return
                    case '/tms':
                        this.headerTemp = 'tmsHeaderTemp'
                        return
                    case '/wms':
                        this.headerTemp = 'wmsHeaderTemp'
                        return
                    case '/coderule':
                        this.headerTemp = 'bossHeaderTemp'
                        return
                    case '/scm':
                        this.headerTemp = 'scmHeaderTemp'
                        return
                    case '/org':
                        this.headerTemp = 'bossHeaderTemp'
                        return
                    case '/boss':
                        this.headerTemp = 'bossHeaderTemp'
                        return
                }
            }
        }

    }
</script>
