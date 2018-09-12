<template>

<div class="participants-wrap">
       
        <!--查询条件-->
        <div class="project-search">
            <!--检索内容-->
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                <el-form-item label=" 下次联系时间:" prop="date">
                    <el-input v-model="searchForm.date" placeholder="时间" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
            </el-form>

        </div>
        <!--新建任务-->
        <!--<el-button type="primary" class="add-part" @click=""><i class="el-icon-plus"></i> 创建跟进</el-button>-->
        <div class="btn-positon-box">
            <el-button type="primary" class="add-part" @click="showRecordformDialog"><i class="el-icon-plus"></i> 创建计划</el-button>
            <el-button type="primary" class="add-part2" @click="showRecordformDialog"><i class="el-icon-plus"></i> 创建计划(无)</el-button>
        </div>
        <tableCrm :isSelection="isSelection"></tableCrm>
        <dialog-follow-recordform :title1="recordformTitle" :dialogVisible="recordformDialogVisible" :recordId="recordId" @closeCreateModal="showRecordformDialog"></dialog-follow-recordform>

    </div>

</template>

<script>
    import tableCrm from '@Main/crm/components/table.vue'
    import dialogFollowRecordform from '@Main/crm/components/dialog.follow.recordform.vue'
    export default{
        components:{
            tableCrm,
            dialogFollowRecordform
        },
        props:{
            
        },
        computed:{
            
        },
        methods:{
            showRecordformDialog (id){
                this.recordformDialogVisible = !this.recordformDialogVisible;
            },
            resetForm(formName) {
                console.log(this.$refs)
                this.$refs[formName].resetFields();
            },
            search (){
                console.log(this.$refs)
                console.log(this.searchForm.searchVal)
            },
        },
        data(){
            return {
                recordformTitle:'XXXXX客户',
                recordId:'',
                recordformDialogVisible : false,
                isSelection:true,
                searchForm:{
                    date:''
                },
                searchRules:{
                    key: [
                        
                    ]
                }
                
            }
        },
        watch : {
        },
        mounted (){
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
   .participants-wrap{
        position: relative;
        .btn-positon-box{
            position: absolute;
            right: 20px;
            top:0px;
            .add-part {
            padding: 8px 12px;
            border-radius: 0px;
            }
        }
    }
</style>
