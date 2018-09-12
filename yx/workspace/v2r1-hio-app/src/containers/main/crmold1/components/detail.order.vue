<template>

<div class="participants-wrap">
       
        <!--查询条件-->
        <div class="project-search">
            <!--检索内容-->
            <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                <el-form-item label=" 订单名称:" prop="key">
                    <el-input v-model="searchForm.key" placeholder="输入订单名称" style="width: 240px"></el-input>
                </el-form-item>
                <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
            </el-form>

        </div>
        <!--新建任务-->
        <el-button type="primary" class="add-part" @click="changeDialogVisible"><i class="el-icon-plus"></i> 添加订单</el-button>
        <tableCrm :isSelection="isSelection"></tableCrm>
        <order-right-modal :dialogVisible = "dialogVisible" @closeCreateModal="changeDialogVisible"></order-right-modal>

    </div>

</template>

<script>
    import tableCrm from '@Main/crm/components/table.vue'
    import orderRightModal from '@Main/crm/components/order.rightModal.vue'
    export default{
        components:{
            tableCrm,
            orderRightModal
        },
        props:{
            
        },
        computed:{
            
        },
        methods:{
            changeDialogVisible(){
                this.dialogVisible = !this.dialogVisible;
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
                dialogVisible:false,
                isSelection:true,
                searchForm:{
                    key:'',
                    amount: ''
                },
                searchRules:{
                    key: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
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
        .add-part {
            position: absolute;
            right: 20px;
            top:0px;
            padding: 8px 12px;
            border-radius: 0px;
        }
    }
</style>
