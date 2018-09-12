<template>
    <div class="roleMenu">
        <el-menu  :default-active="JZY.s.getPathName()"    :router="true" default-active="/system/role">
            <el-menu-item index="/system/role" style="background: #ecf5ff">
                <div class="diyHove">
                    <span>角色列表</span>
                </div>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "rolemenu"
    }
</script>
<style scoped lang="scss">
    .roleMenu{
        height: 100%;
    }

</style>
<!--<style scoped lang="scss">-->
    <!--.roleMenu{-->
        <!--background-color: rgba(102, 102, 102, 1);-->
        <!--height: 100%;-->
        <!--.el-menu-vertical-demo{-->
            <!--padding-top: 10px;-->
            <!--.diyHove:hover{-->
                <!--background-color: rgba(0, 153, 255, 1);-->
                <!--margin-left: -20px;-->
                <!--margin-right: -20px;-->
                <!--padding: 0 20px;-->
            <!--}-->
            <!--.is-active .diyHove{-->
                <!--background-color: rgba(0, 153, 255, 1);-->
                <!--margin-left: -20px;-->
                <!--margin-right: -20px;-->
                <!--padding: 0 20px;-->
            <!--}-->
        <!--}-->
    <!--}-->

<!--</style>-->