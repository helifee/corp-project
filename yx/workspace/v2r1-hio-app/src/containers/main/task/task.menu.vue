<template>
    <div class="task_menu">
        <el-menu :default-active="defaultActive" class="menu_list" :router="true" :default-openeds="openeds"  @open="handleOpen" @close="handleClose">
            <el-submenu index="/task">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>我的任务</span>
                </template>
                <el-menu-item index="/task">我创建的</el-menu-item>
                <el-menu-item index="/task/own">我负责的</el-menu-item>
                <el-menu-item index="/task/join">我参与的</el-menu-item>
                <el-menu-item index="/task/concern">我关注的</el-menu-item>
                <el-menu-item index="/task/share">共享给我的</el-menu-item>
                <!-- <el-menu-item index="/task/create">我创建的（{{ $store.state.taskModule.leftMenu.task }}）</el-menu-item>
                <el-menu-item index="/task/own">我负责的（{{ $store.state.taskModule.leftMenu.own }}）</el-menu-item>
                <el-menu-item index="/task/join">我参与的（{{ $store.state.taskModule.leftMenu.join }}）</el-menu-item>
                <el-menu-item index="/task/concern">我关注的（{{ $store.state.taskModule.leftMenu.concern }}）</el-menu-item>
                <el-menu-item index="/task/share">共享给我的（{{ $store.state.taskModule.leftMenu.share }}）</el-menu-item> -->
            </el-submenu>
            <el-menu-item index="/task/set" v-if="JZY.s.hasMenuPermisson('task_manage','modify')">
                <i class="el-icon-setting"></i>
                <span slot="title">任务管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
  //数据接口文件
  import { getTaskInfoById } from '@Main/task/getData'
  export default {
    data() {
      return {
        openeds: ['/task'],
        defaultActive: JZY.s.getPathName(),//当前激活的菜单
        form: {},
      }
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
            this.$router.push({ name: 'task'})
            // this.$router.go(1);
            //最终都会匹配到/task/1这条路径上
        },
        handleClose(key, keyPath){
            this.$router.push({ name: 'task'})
            // debugger
            // this.$router.go(1);
        },
        //获取任务详情
        async taskInfo( taskId = '' ){
            let res = await getTaskInfoById( taskId )
            console.info(res[0])
            if (Object.keys(res[0]).length > 0) {
                this.form = JZY.u.deepExtend({} ,this.form ,res[0])
            }
            console.info(this.form)
        },
    },
    async mounted(){
        // window.vue = this //chrome中console调试用，完事后可删除
        console.info(this.$route)
        // await this.taskInfo(this.$route.params.id)
        // console.info("this.form",this.form)
        // debugger
        
        // let fromPage = ''
        // if (to.query.hasOwnProperty('fromPage') && to.query.fromPage == 'taskForProject') {//项目的任务
        //     this.defaultActive = '/task/'+fromPage
        // }
        if (this.$route.query.hasOwnProperty('fromPage') && this.$route.query.fromPage != '') {
            let routerStr = this.$route.query.fromPage == 'task' ? '/' : '/task/'
            this.defaultActive = routerStr+this.$route.query.fromPage
        }else{
            this.defaultActive = this.$route.path
        }

    },
    watch:{
        $route(to) {
            // console.info("oldVal",to)
            if (to.query.hasOwnProperty('fromPage') && to.query.fromPage != '') {
                let routerStr = to.query.fromPage == 'task' ? '/' : '/task/'
                this.defaultActive = routerStr+to.query.fromPage
            }else{
                this.defaultActive = to.path
            }
        }
    },
  }
</script>

<style lang="scss">
    @import "./task.scss" //加载整个任务项目的公共样式
</style>
<style scoped lang="scss">
.task_menu{
    .menu_list{
        height:100%;
    }
}
</style>