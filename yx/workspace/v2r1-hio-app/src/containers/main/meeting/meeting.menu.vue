<template>
    <el-menu
            :default-active="JZY.s.getPathName()"
            class="el-menu-vertical-demo"
            :router="true"
    >
        <el-menu-item index="/meeting/management">
            <i class="iconfont iconsize">&#xe675;</i>
            <span>会议管理</span>
        </el-menu-item>
        <el-menu-item index="/meeting/copyme">
            <i class="iconfont iconsize">&#xe853;</i>
            <span slot="title">抄送我的</span>
        </el-menu-item>
        <el-menu-item index="/meeting/room">
            <i class="iconfont iconsize">&#xe610;</i>
            <span slot="title">会议室</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "meetingMenu"
    }
</script>

<style scoped>
 @import "./fonts/iconfont.css";
    .iconsize{
        font-size: 25px;
    }
</style>