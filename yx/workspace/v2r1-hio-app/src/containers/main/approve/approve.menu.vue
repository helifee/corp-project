<template>
    <div class="approve_menu">
        <el-menu :default-active="defaultActive" class="menu_list" :router="true">
            <el-menu-item index="/approve">
                <i class="el-icon-menu"></i>
                <span slot="title">
                    {{l('{approveLocale.menu.approve}')}}
                </span>
            </el-menu-item>
            <el-menu-item index="/approve/my">
                <i class="el-icon-date"></i>
                <span slot="title">
                    {{l('{approveLocale.menu.my}')}}
                </span>
            </el-menu-item>
            <el-menu-item index="/approve/shared">
                <i class="el-icon-sold-out"></i>
                <span slot="title">
                    {{l('{approveLocale.menu.shared}')}}
                </span>
            </el-menu-item>
            <el-menu-item index="/approve/concern">
                <i class="el-icon-news"></i>
                <span slot="title">
                    {{l('{approveLocale.menu.concern}')}}
                </span>
            </el-menu-item>
            <el-submenu index="/approve/set" v-if="JZY.s.hasMenuPermisson('flow_manage','modify')">
            <!-- <el-submenu index="/approve/set"> -->
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>
                        {{l('{approveLocale.menu.set}')}}
                    </span>
                </template>
                <el-menu-item index="/approve/set/flowDesign">
                    {{l('{approveLocale.menu.flowDesign}')}}
                </el-menu-item>
                <el-menu-item index="/approve/set/flowManage" >
                    {{l('{approveLocale.menu.flowManage}')}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
  // JZY.locale.add('approveLocale',require('./approve.locale'))  //此处不需要引入，即可正常使用，如果引入，会报错？
  export default {
    data() {
      return {
        defaultActive:JZY.s.getPathName(),//当前激活的菜单
      }
    },
    methods: {
    },
    mounted(){
      // window.vue = this //chrome中console调试用，完事后可删除
    },
    watch:{
        $route(to) {
            // console.info("oldVal",to)
            this.defaultActive = to.path
        }
    },
  }
</script>
<style lang="scss">
    @import "./approve.scss";//加载整个审批项目的公共样式
</style>
<style scoped lang="scss">
.approve_menu{
    .menu_list{
        height:100%;
    }
}
</style>