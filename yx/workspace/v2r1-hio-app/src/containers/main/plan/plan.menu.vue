<template>
    <el-menu  :router="true" :default-active="defaultActive" :default-openeds="openeds"  @open="handleOpen" @close="handleClose">
        <el-menu-item index="/plan">
            <i class="el-icon-menu"></i>
            <span slot="title">{{l('{planLocale.menu.myPlan}')}}</span>
        </el-menu-item>
        <el-menu-item index="/plan/share">
            <i class="el-icon-news"></i>
            <span slot="title">{{l('{planLocale.menu.share}')}}</span>
        </el-menu-item>
        <el-menu-item index="/plan/comment">
            <i class="el-icon-sold-out"></i>
            <span slot="title">{{l('{planLocale.menu.comment}')}}</span>
        </el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        data() {
            return {
                openeds:['/plan'],
                defaultActive:JZY.s.getPathName(),//当前激活的菜单
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
                this.$router.push({ name: 'plan'})
                this.$router.go(1);
            },
            handleClose(key, keyPath){
                this.$router.push({ name: 'plan'})
                this.$router.go(1);
            }
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
