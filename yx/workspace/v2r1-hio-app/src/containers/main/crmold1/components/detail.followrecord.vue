<template>

<div class="participants-wrap">
       
        <!--查询条件-->
        <div class="project-search">
            <!--检索内容-->
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                <el-form-item label=" 创建时间:" prop="date">
                    <el-input v-model="searchForm.date" placeholder="时间" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
            </el-form>

        </div>
        <!--新建任务-->
        <div class="btn-positon-box">
            <el-button type="primary" class="add-part" @click="showRecordformDialog"><i class="el-icon-plus"></i> 创建跟进(有)</el-button>
            <el-button type="primary" class="add-part2" @click="showRecordformDialog"><i class="el-icon-plus"></i> 创建跟进(无)</el-button>
        </div>

        <tableCrm :isSelection="isSelection"></tableCrm>
        <dialog-follow-recordform :title1="recordformTitle" :dialogVisible="recordformDialogVisible" :recordId="recordId" @closeCreateModal="closeRecordformDialog"></dialog-follow-recordform>

    </div>

</template>

<script>
    import dialogFollowRecordform from '@Main/crm/components/dialog.follow.recordform.vue'
    import tableCrm from '@Main/crm/components/table.vue'
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
            
            resetForm(formName) {
                console.log(this.$refs)
                this.$refs[formName].resetFields();
            },
            search (){
                console.log(this.$refs)
                console.log(this.searchForm.searchVal)
            },
            showRecordformDialog (id){
                this.recordformDialogVisible = true;
            },
            closeRecordformDialog (id){
                this.recordformDialogVisible = false;
            },
        },
        data(){
            return {
                recordformTitle:'新建跟进记录',
                recordformDialogVisible:false,
                recordId:'',
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
