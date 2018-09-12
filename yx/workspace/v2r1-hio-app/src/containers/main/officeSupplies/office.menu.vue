<template>
    <el-menu :router="true" :default-active="defaultActive" :default-openeds="openeds"  @open="handleOpen" @close="handleClose">
        <el-menu-item index="/office/management">
            <i class="el-icon-menu"></i>
            <span slot="title">{{l('{officeLocale.menu.management}')}}</span>
        </el-menu-item>
        <el-menu-item index="/office/storage">
            <i class="el-icon-news"></i>
            <span slot="title">{{l('{officeLocale.menu.storage}')}}</span>
        </el-menu-item>
        <el-menu-item index="/office/delivery">
            <i class="el-icon-sold-out"></i>
            <span slot="title">{{l('{officeLocale.menu.delivery}')}}</span>
        </el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        data() {
            return {
                openeds:['/office/management'],
                defaultActive:JZY.s.getPathName(),//当前激活的菜单
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
                this.$router.push({ name: 'office/management'})
                this.$router.go(1);
            },
            handleClose(key, keyPath){
                this.$router.push({ name: 'office/management'})
                this.$router.go(1);
            }
        },
        mounted(){
            // window.vue = this //chrome中console调试用，完事后可删除
        },
        watch:{
            $route(to) {
                // console.info("oldVal",to)
//                this.defaultActive = to.path


                // console.info("oldVal",to)
                if (to.query.hasOwnProperty('fromPage') && to.query.fromPage != '') {
                    if(to.query.fromPage == 'storage'){
                        this.defaultActive = '/office/storage'
                    }else if(to.query.fromPage == 'delivery'){
                        this.defaultActive = '/office/delivery'
                    }

                }else{
                    this.defaultActive = to.path
                }
            }
        },
    }
</script>