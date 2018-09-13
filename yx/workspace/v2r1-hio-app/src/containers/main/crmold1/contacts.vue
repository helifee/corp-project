<template>
    <div class="wrap">
        <div class="content-title">
            <h3>联系人</h3>
            <el-button type="primary" class="add-news" @click="showContactsDialog"><i class="el-icon-plus"></i> 添加联系人</el-button>
        </div>

        <div class="project-wrap">
            <!--查询条件-->
            <div class="project-search">
                <!--检索内容-->
                <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                    <el-form-item label=" 联系人姓名：" prop="searchVal">
                        <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 手机号码：" prop="searchVal1">
                        <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 客户名称：" prop="searchVal2">
                        <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                        <el-button @click="resetForm('searchForm')">重置</el-button>
                    </el-form-item>
                    <el-form-item>

                    </el-form-item>
                </el-form>

            </div>
            <!--表格-->
            <el-table
                :data="tableData5"
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%;text-align: center;"
                @row-click='jump'
                :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333'}">
                <el-table-column type="expand">
                    <template slot-scope="props" >
                        <p style="text-align: left;">{{ props.row.describe }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="名称"
                    prop="name">
                </el-table-column>
                <el-table-column
                    label="来源"
                    prop="source"
                    :filters="[{ text: '网站', value: '网站' }, { text: '微信', value: '微信' },{ text: '广告', value: '广告' }, { text: '推荐', value: '推荐' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <span>{{scope.row.source}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="地址"
                    prop="address"
                    width="250">
                </el-table-column>
                <el-table-column
                    label="客户类型"
                    prop="customerType">
                </el-table-column>
                <el-table-column
                    label="创建时间"
                    sortable
                    prop="creationTime"
                    width="250">
                </el-table-column>
                <el-table-column
                    label="主联系人"
                    prop="masterContact">
                </el-table-column>
                <el-table-column
                    label="联系电话"
                    prop="telephone"
                    width="120">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <span style="color: #409EFF">共享</span>
                        <span style="color: #409EFF">编辑</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
        </el-pagination>

        <dialog-add-contacts  :dialog-visible="contactsDialogVisible" @closeCreateModal="closeContactsDialog"></dialog-add-contacts>

    </div>
</template>

<script>
    import dialogAddContacts from '@Main/crm/components/dialog.addContacts.vue'

    export default{
        components: {
            dialogAddContacts
        },
        methods:{
            jump(){
                location.href = "#/crm/contacts/details/2"
            },
            showContactsDialog (){
                this.contactsDialogVisible = true;
            },
            closeContactsDialog (){
                this.contactsDialogVisible = false;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            submitForm(formName) {
                this.
                console.log(this[formName])
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                console.log(this.$refs)
                this.$refs[formName].resetFields();
            },
            search (){
                console.log(this.$refs)
                console.log(this.searchForm.searchVal)
            },
            handleChange(file, fileList) {
                this.fileList3 = fileList.slice(-3);
            },
            filterTag(value, row) {
                return row.source === value;
            },
//            弹窗中 新增联系人
            addInformation (){
                this.customersForm.information.push({
                    name:'',
                    job:'',
                    telephone:'',
                    mail:'',
                    decision:'',
                    editFlag:true
                });
            },
            saveInformation (index, row){
                this.customersForm.information[index].editFlag = false;
            },
            delInformation (index, row){
                this.customersForm.information.splice(index,1)
            }

        },
        data(){
            return {
                contactsDialogVisible:false,
                dialogVisible:false,
                searchForm:{
                    searchVal:'',
                    searchVal1:'',
                    searchVal2:'',
                    searchVal3:'',
                },

                currentPage4: 4,
                content:"",
                customersForm: {
                    customer: '',//客户名称
                    contactNumber:'',//联系电话
                    email: '',//电子邮件
                    source: '',//客户来源
                    customerType: '',//客户类型
                    address: '',//联系地址
                    website: '',//企业网站
                    progress: null,//备注
                    sharing: '',//共享
                    fileList:[],//附件
                    information:[{
                        name:'姓名',
                        job:'gongzuo',
                        telephone:'1232132142',
                        mail:'1213213@163.com',
                        decision:'juece',
                        editFlag:true
                    }]
                },
                searchRules:{
                    searchVal: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal1: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal2: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    searchVal3: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                },
                tableData5: [{
                    id: '12987122',
                    name: '胡彦斌',
                    describe: '江浙小吃、小吃零食',
                    source: '微信',
                    address: '上海市普陀区真北路',
                    customerType: '潜在客户',
                    creationTime: '2017-10-01 12：00',
                    masterContact: '张三',
                    telephone: '13822229974',

                }, {
                    id: '12987122',
                    name: '胡彦斌',
                    describe: '江浙小吃、小吃零食',
                    source: '广告',
                    address: '上海市普陀区真北路',
                    customerType: '潜在客户',
                    creationTime: '2017-10-01 12：00',
                    masterContact: '张三',
                    telephone: '13822229974',

                },{
                    id: '12987122',
                    name: '胡彦斌',
                    describe: '江浙小吃、小吃零食',
                    source: '网站',
                    address: '上海市普陀区真北路',
                    customerType: '潜在客户',
                    creationTime: '2017-10-01 12：00',
                    masterContact: '张三',
                    telephone: '13822229974',

                },{
                    id: '12987122',
                    name: '胡彦斌',
                    describe: '江浙小吃、小吃零食',
                    source: '网站',
                    address: '上海市普陀区真北路',
                    customerType: '潜在客户',
                    creationTime: '2017-10-01 12：00',
                    masterContact: '张三',
                    telephone: '13822229974',

                },{
                    id: '12987122',
                    name: '胡彦斌',
                    describe: '江浙小吃、小吃零食',
                    source: '网站',
                    address: '上海市普陀区真北路',
                    customerType: '潜在客户',
                    creationTime: '2017-10-01 12：00',
                    masterContact: '张三',
                    telephone: '13822229974',

                },{
                    id: '12987122',
                    name: '胡彦斌',
                    describe: '江浙小吃、小吃零食',
                    source: '推荐',
                    address: '上海市普陀区真北路',
                    customerType: '潜在客户',
                    creationTime: '2017-10-01 12：00',
                    masterContact: '张三',
                    telephone: '13822229974',

                },],
                UEconfig:{
                    initialFrameWidth :800,//设置编辑器宽度
                    initialFrameHeight:250,//设置编辑器高度
                    // 设置不自动调整高度
                    scaleEnabled:false//不可以拉伸
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        overflow: hidden;
        height: 100%;
        overflow-y: auto;
        background: #ffffff;
        .content-title{
                 position: relative;
                 margin: 12px 0px;
                 line-height: 32px;
                 height: 48px;
                 border-bottom: 1px solid #eeeeee;
                 h3{
                     padding-left: 18px;
                 }
                 .add-news{
                     position: absolute;
                     right: 20px;
                     top:0px;
                     padding: 8px 12px;
                     border-radius: 0px;
                 }
        }
        .project-wrap{
            padding: 20px;
        }
        .el-pagination{
            float: right;
            margin: 20px 12px;
        }
    }
    .slide-modal{
        .operation{
            position: fixed;
            top: 70px;
            right:0px;
            width: 82.333%;
            height: 36px;
            background: rgba(255,255,255,0.3);
            z-index: 1001;
            ul{
                float: right;
                li{
                    float: left;
                    margin-right: 16px;
                    .el-button{
                        padding: 6px 18px;
                        border-radius: 0px;
                        margin-top: 4px;
                        font-weight: normal;
                        color: #82848a;
                    }
                }
            }
        }
        .dia-content{
            margin-top: 60px;
            .information{
                position: relative;
                .add{
                    position: absolute;
                    right: 24px;
                    top:10px;
                    color: #409EFF;
                    font-size: 30px;
                    z-index: 5;
                    cursor: pointer;
                }
            }

        }
    }
    /*项目进度滑块位置调整*/
    .el-slider .el-slider__button-wrapper{
        top:-18px;
    }
</style>
