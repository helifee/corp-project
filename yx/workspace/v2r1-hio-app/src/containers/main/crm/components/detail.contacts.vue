<template>

<div class="participants-wrap">
        <!--查询条件-->
        <div class="project-search">
            <!--检索内容-->
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                <el-form-item label=" 联系人姓名:" prop="key">
                    <el-input v-model="searchForm.key" placeholder="输入汉字或拼音" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item label=" 手机号:" prop="phone">
                    <el-input v-model="searchForm.phone" placeholder="输入手机号" style="width: 240px"></el-input>
                </el-form-item>
            </el-form>

        </div>
        <!--新建任务-->
        <el-button type="primary" class="add-part" @click="showContactsDialog"><i class="el-icon-plus"></i> 添加人员</el-button>
        <tableCrm></tableCrm>
        <dialog-add-contacts  :dialog-visible="contactsDialogVisible" @closeCreateModal="showContactsDialog"></dialog-add-contacts>

    </div>

</template>

<script>
    import tableCrm from '@Main/crm/components/table.vue'
    import dialogAddContacts from '@Main/crm/components/dialog.addContacts.vue'
    export default{
        components:{
            tableCrm,
            dialogAddContacts
        },
        props:{
            
        },
        computed:{
            
        },
        methods:{
            showContactsDialog(){
                this.contactsDialogVisible = !this.contactsDialogVisible;
            }
        },
        data(){
            return {
                contactsDialogVisible:false,
                searchForm:{
                    key:'',
                    phone: ''
                },
                searchRules:{
                    key: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
                //参与人员
                
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
        
        .add-part {
            position: absolute;
            right: 20px;
            top:0px;
            padding: 8px 12px;
            border-radius: 0px;
        }
    }
</style>
