<template>

    <div>
        <el-menu v-if="!JZY.IS_CC"
                :default-active="JZY.s.getPathName()"
                class="el-menu-vertical-demo"
                :router="true"
        >
            <el-submenu index="">
                <template slot="title">
                    <i class="el-icon-sold-out"></i>
                    <span>{{l('{netDiskLocale.asideMenu.enterpriseNetDisk.title}')}}</span>
                </template>
                <el-menu-item data-router-href="/netDisk/my" index="/netDisk?">{{l('{netDiskLocale.asideMenu.enterpriseNetDisk.children.myFile}')}}</el-menu-item>
                <el-menu-item data-router-href="/netDisk/myFollow" index="/netDisk/myFollow">{{l('{netDiskLocale.asideMenu.enterpriseNetDisk.children.myFollow}')}}</el-menu-item>

            </el-submenu>
            <el-menu-item data-router-href="/netDisk/recentlyVisit" index="/netDisk/recentlyVisit">
                <i class="el-icon-time"></i>
                <span slot="title">{{l('{netDiskLocale.asideMenu.recentlyVisit}')}}</span>
            </el-menu-item>
            <el-menu-item data-router-href="/netDisk/dirManage" index="/netDisk/dirManage" v-if="JZY.store.state.session.userInfo.directoryManageEnable==true||JZY.s.hasMenuPermisson('disk_manage','modify')">
                <i class="el-icon-tickets"></i>
                <span slot="title">{{l('{netDiskLocale.asideMenu.dirManage}')}}</span>
            </el-menu-item>
        </el-menu>

        <el-menu v-if="isLocaleLoaded && (JZY.IS_CC)"
                 :router="true"
        >
            <!--<el-submenu index="/news">-->
                <!--<template slot="title">-->
                    <!--<i class="el-icon-sold-out"></i>-->
                    <!--<span>{{l('{netDiskLocale.asideMenu.enterpriseNetDisk.title}')}}</span>-->
                <!--</template>-->
                <!--<el-menu-item index="/netDisk">{{l('{netDiskLocale.asideMenu.enterpriseNetDisk.children.myFile}')}}</el-menu-item>-->
                <!--<el-menu-item index="/netDisk/myFollow">{{l('{netDiskLocale.asideMenu.enterpriseNetDisk.children.myFollow}')}}</el-menu-item>-->

            <!--</el-submenu>-->

            <el-menu-item data-href="/netDisk" index="/netDisk">

                <i class="el-icon-time"></i>
                {{l('{netDiskLocale.asideMenu.enterpriseNetDisk.children.myFile}')}}</el-menu-item>
            <el-menu-item index="/netDisk/myFollow">
                <i class="el-icon-star-off"></i>
                {{l('{netDiskLocale.asideMenu.enterpriseNetDisk.children.myFollow}')}}</el-menu-item>
            <el-menu-item index="/netDisk/recentlyVisit">
                <i class="el-icon-time"></i>
                <span slot="title">{{l('{netDiskLocale.asideMenu.recentlyVisit}')}}</span>
            </el-menu-item>
            <el-menu-item index="/netDisk/dirManage" v-if="JZY.s.hasMenuPermisson('disk_manage','modify')">
                <i class="el-icon-tickets"></i>
                <span slot="title">{{l('{netDiskLocale.asideMenu.dirManage}')}}</span>
            </el-menu-item>
        </el-menu>
    </div>

    </template>




    <!--<div>-->
        <!--sdfds-->
        <!--<el-menu :default-active="JZY.s.getPathName()" style="border-right:none;" :router="true">-->
            <!--<el-submenu index="1">-->
                <!--<template slot="title">-->
                    <!--<i class="el-icon-location"></i>-->
                    <!--<span>{{l('{netDiskLocale.asideMenu.enterpriseNetDisk.title}')}}</span>-->
                <!--</template>-->
                <!--<el-menu-item-group>-->
                    <!--<template slot="title">分组一</template>-->
                    <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
                    <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-menu-item-group title="分组2">-->
                    <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
                <!--</el-menu-item-group>-->
                <!--<el-submenu index="1-4">-->
                    <!--<template slot="title">选项4</template>-->
                    <!--<el-menu-item index="1-4-1">选项1</el-menu-item>-->
                <!--</el-submenu>-->
            <!--</el-submenu>-->
            <!--<el-menu-item index="/email/inbox/id">-->
                <!--<i class="el-icon-message"></i>q-->
                <!--<span slot="title">邮箱</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/docment">-->
                <!--<i class="el-icon-sold-out"></i>-->
                <!--<span slot="title">我的文档</span>-->
            <!--</el-menu-item>-->
            <!--<el-menu-item index="/notebook">-->
                <!--<i class="el-icon-upload"></i>-->
                <!--<span slot="title">云笔记</span>-->
            <!--</el-menu-item>-->
        <!--</el-menu>-->
    <!--</div>-->
<script>


    export default {
        data(){
          return {
              isLocaleLoaded:false
          }
        },
        mounted(){
            if(JZY.IS_CC){
                JZY.locale.add('netDiskLocale', require('./netDisk.locale'))
            }
            // JZY.s.hideLoading()

            this.isLocaleLoaded=true
        }
    }
</script>