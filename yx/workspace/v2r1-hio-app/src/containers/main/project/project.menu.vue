<template>
    <div class="project_menu">
        <el-menu :default-active="defaultActive" class="menu_list" :router="true" :default-openeds="openeds"  @open="handleOpen" @close="handleClose">
            <el-submenu index="/project">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>我的项目</span>
                </template>
                <el-menu-item index="/project">我创建的</el-menu-item>
                <el-menu-item index="/project/responsible">我负责的</el-menu-item>
                <el-menu-item index="/project/participate">我参与的</el-menu-item>
                <el-menu-item index="/project/follow">我关注的</el-menu-item>
                <el-menu-item index="/project/shared">共享给我的</el-menu-item>
            </el-submenu>
            <el-menu-item index="/project/set"  v-if="JZY.s.hasMenuPermisson('project_manage','modify')">
                <i class="el-icon-setting"></i>
                <span slot="title">项目管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                openeds:['/project'],
                defaultActive:JZY.s.getPathName(),//当前激活的菜单
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
//                this.$router.push({ name: 'project', params: { taskId: 1 }})
//                this.$router.go(1);
                //最终都会匹配到/task/1这条路径上
            },
            handleClose(key, keyPath){
//                this.$router.push({ name: 'project'})
//                this.$router.go(1);
            }
        },
        mounted(){
            // window.vue = this //chrome中console调试用，完事后可删除
            if (this.$route.query.hasOwnProperty('fromPage') && this.$route.query.fromPage != '') {
                if(this.$route.query.fromPage == 'create'){
                    this.defaultActive = '/project'
                }else{
                    this.defaultActive = '/project/'+this.$route.query.fromPage
                }

            }else{
                this.defaultActive = this.$route.path
            }
        },
        watch:{
            $route(to) {
                // console.info("oldVal",to)
                if (to.query.hasOwnProperty('fromPage') && to.query.fromPage != '') {
                    if(to.query.fromPage == 'create'){
                        this.defaultActive = '/project'
                    }else{
                        this.defaultActive = '/project/'+to.query.fromPage
                    }

                }else{
                    this.defaultActive = to.path
                }
            }
        },
    }
</script>

<style lang="scss">
</style>
<style scoped lang="scss">
    .task_menu{
        .menu_list{
            height:100%;
        }
    }
</style>