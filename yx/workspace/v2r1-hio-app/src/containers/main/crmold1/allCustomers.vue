<template>
    <div class="wrap">
        <div class="content-title">
            <h3>全部客户</h3>
            <el-button type="primary" class="add-news" @click="newProject"><i class="el-icon-plus"></i> 新建客户</el-button>
        </div>
        <!--项目列表-->
        <div class="project-wrap">
            <!--查询条件-->
            <div class="project-search">
                <!--检索内容-->
                <el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm">
                    <el-form-item label=" 查询条件：" prop="searchVal">
                        <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 查询条件：" prop="searchVal1">
                        <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 查询条件：" prop="searchVal2">
                        <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 查询条件：" prop="searchVal3">
                        <el-input v-model="searchForm.searchVal" placeholder="请输入关键词进行检索" style="width: 240px"></el-input>
                    </el-form-item>
                    <el-form-item label=" 查询条件：" prop="searchVal3">
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

        <right-slide-modal
            title="创建客户"
            :visible.sync="dialogVisible"
            class="slide-modal">
            <div class="operation">
                <ul>
                    <li><el-button @click="saveDialog">保存</el-button></li>
                    <li><el-button @click="closeDialog">关闭</el-button></li>
                </ul>
            </div>
            <div class="dia-content">
                <el-form :model="customersForm" :inline="true" ref="customersForm" label-width="100px" class="">
                    <el-form-item label="客户名称：" prop="customer"  style="width: 900px">
                        <el-input v-model="customersForm.customer" style="width: 720px"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" prop="contactNumber"  style="width: 425px">
                        <el-input v-model="customersForm.contactNumber" style="width: 280px"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮件：" prop="email" style="width: 425px">
                        <el-input v-model="customersForm.email" style="width: 280px"></el-input>
                    </el-form-item>

                    <el-form-item label="客户来源：" prop="source" style="width: 425px">
                        <el-input v-model="customersForm.source" style="width: 280px"></el-input>
                    </el-form-item>
                    <el-form-item label="客户类型：" prop="customerType"  style="width: 425px">
                        <el-select v-model="customersForm.customerType" placeholder="请选择项目等级" style="width: 280px">
                            <el-option label="潜在客户" value="1"></el-option>
                            <el-option label="普通客户" value="2"></el-option>
                            <el-option label="vip客户" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系地址：" prop="address" style="width: 425px">
                        <el-input v-model="customersForm.address" style="width: 280px"></el-input>
                    </el-form-item>
                    <el-form-item label="企业网站：" prop="website"  style="width: 425px">
                        <el-input v-model="customersForm.website" style="width: 280px"></el-input>
                    </el-form-item>

                    <el-form-item label="备注：" prop="remarks"   style="width: 900px">
                        <el-input
                            type="remarks"
                            style="width: 720px"
                            :rows="3"
                            placeholder="请输入内容"
                            v-model="customersForm.sharing">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="共享：" prop="sharing" style="width: 425px">
                        <el-input v-model="customersForm.sharing" style="width: 280px"></el-input>
                    </el-form-item>

                    <el-form-item label="附件：" prop="fileList" style="width: 425px">
                        <!--<el-input v-model="customersForm.sharing" style="width: 280px"></el-input>-->
                        <el-upload
                            style="width: 280px"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-change="handleChange"
                            :file-list="customersForm.fileList">
                            <el-button size="small" type="primary"><i class="el-icon-upload"></i> 点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">点击上传按钮上传文件</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item class="information">
                        <span @click="addInformation" class="el-icon-circle-plus-outline add"></span>
                        <el-table
                                :data="customersForm.information"
                                style="width: 100%;text-align: center;"
                                :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333','padding':'4px 0px'}">
                                <el-table-column
                                    prop="name"
                                    label="联系人"
                                    width="120">
                                <template slot-scope="scope">
                                    <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
                                    <el-input  v-if="scope.row.editFlag" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                                </template>
                                </el-table-column>
                                <el-table-column
                                    prop="job"
                                    label="职务"
                                    width="150">
                                    <template slot-scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.job }}</span>
                                        <el-input  v-if="scope.row.editFlag" v-model="scope.row.job" placeholder="请输入内容"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="telephone"
                                    label="手机号码"
                                    width="120">
                                    <template slot-scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.telephone }}</span>
                                        <el-input  v-if="scope.row.editFlag" v-model="scope.row.telephone" placeholder="请输入内容"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="mail"
                                    label="电子邮件"
                                    width="180">
                                    <template slot-scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.mail }}</span>
                                        <el-input  v-if="scope.row.editFlag" v-model="scope.row.mail" placeholder="请输入内容"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="decision"
                                    label="决策关系"
                                    width="180">
                                    <template slot-scope="scope">
                                        <span v-if="!scope.row.editFlag">{{ scope.row.decision }}</span>
                                        <el-input  v-if="scope.row.editFlag" v-model="scope.row.decision" placeholder="请输入内容"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="address"
                                    label=""
                                    width="120">
                                    <template slot-scope="scope">
                                        <span class="el-icon-success" @click="saveInformation(scope.$index, scope.row)" style="font-size: 20px;color: #67c23a;margin-right: 12px"></span>
                                        <span class="el-icon-circle-close" @click="delInformation(scope.$index, scope.row)" style="font-size: 20px;color: red"></span>
                                    </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('customersForm')">立即创建</el-button>
                        <el-button @click="resetForm('customersForm')">重置</el-button>
                    </el-form-item>


                </el-form>

            </div>

        </right-slide-modal>
    </div>
</template>

<script>
    export default{
        components: {
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            newProject (){
                this.dialogVisible = true
            },
            closeDialog (){
                this.dialogVisible = false
            },
            saveDialog (){
                this.$message({
                    showClose: true,
                    message: '保存成功',
                    type: 'success'
                });
                let that = this;
                setTimeout(function () {
                    that.dialogVisible = false
                },3000)

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
