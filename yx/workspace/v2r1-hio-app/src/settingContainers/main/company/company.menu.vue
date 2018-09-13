<template>
    <div class="companyMenu">
        <!--<el-menu  :default-active="JZY.s.getPathName()"  class="el-menu-vertical-demo"  :router="true"-->
                  <!--background-color="rgba(102, 102, 102, 1)" text-color="#fff" active-text-color="#fff" style="border-right:0"-->
        <!--&gt;-->
        <el-menu  :default-active="JZY.s.getPathName()"  :router="true">
            <el-menu-item index="/system/company">
                <div class="diyHove">
                    <span>企业信息</span>
                </div>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "companymenu"
    }
</script>

<style scoped lang="scss">
.companyMenu{
    height: 100%;
}
</style>