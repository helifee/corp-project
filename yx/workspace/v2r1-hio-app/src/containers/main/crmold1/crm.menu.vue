<template>
    <el-menu :default-active="JZY.s.getPathName()" class="el-menu-vertical-ehr"  :router="true">
        <el-menu-item index="/crm">
                <i class="el-icon-menu"></i>
                <span>我的CRM</span>
        </el-menu-item>
        <el-menu-item index="/crm/customer">
                <i class="el-icon-date"></i>
                <span>客户</span>
        </el-menu-item>
        <el-menu-item index="/crm/contacts">
                <i class="el-icon-picture"></i>
                <span>联系人</span>
        </el-menu-item>
        <el-menu-item index="/crm/business">
                <i class="el-icon-goods"></i>
                <span>商机</span>
        </el-menu-item>
        <el-menu-item index="/crm/order">
                <i class="el-icon-document"></i>
                <span>订单</span>
        </el-menu-item>
        <el-submenu index="/crm/settings">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>功能设置</span>
            </template>
            <el-menu-item index="/crm/settings">产品设置</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
      export default {
        data() {
          return {
          };
        },
        methods: {
          handleSelect(key, keyPath) {
            console.log(key, keyPath);

            var routerNext = keyPath[1].replace('./', '')
            console.info(routerNext)
            this.JZY.s.changeRouter('demo')
            // return this.$route.path.replace('/', '');
                }
            }
        }
</script>

<style scoped lang="scss" scoped>
    $iconColor: #3bb4f2;
    .el-menu-vertical-ehr{
        height:100%;
        // overflow-y:scroll;
        /*overflow-x:hidden;*/
    }
</style>
