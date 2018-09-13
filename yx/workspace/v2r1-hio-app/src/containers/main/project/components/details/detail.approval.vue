<template>
    <div class="approve approve_wrap">

        <approve-for-project
                ref="approveList"
            :projectId = "id"
            :projectName = "projectName"
            :projectPermissionValue="projectPermissionValue"
            @getPageTotal = "getPageTotal1">
        </approve-for-project>

    </div>
</template>
<script>

    import approveForProject from '@Main/approve/approveForProject.vue'



    import flowForm from "@/containers/main/flowForm/client"



    import { getTaskList } from '@Main/task/getData'

    export default {
        components: {
            approveForProject,

        },
        data() {
            return {
                num:''
            }
        },
        props: ['id','projectName',"projectPermission"],
        computed: {
            projectPermissionValue: {
                get:function(){
                    if(this.projectPermission =='4'){
                        return false;
                    }else{
                        return true;
                    }
                },
                set:function (value) {
                    return  value;
                }
            },
        },
        filters:{
        },
        methods: {

            getPageTotal1:function(num){
                this.num = num;
                this.$emit("approvalNum",num);
            },
//            refleshApprove(){
//                console.log("刷新审批了")
//                this.$refs.approveList.getRefleshTableData();
//            }

        },
        watch: {
        }
    }
</script>
<style lang="scss" scoped>
    @import "src/containers/main/task/task.scss"; //加载整个任务项目的公共样式
    @import "src/containers/main/approve/approve.scss"; //加载整个审批的公共样式
    .approve{
        padding: 0px;
    }
</style>
