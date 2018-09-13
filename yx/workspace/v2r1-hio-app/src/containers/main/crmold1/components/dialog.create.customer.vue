<template>

    <right-slide-modal
            title="创建客户"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateSave()" size="medium ">保存</el-button>
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
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

</template>

<script>
    export default{
        components:{
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
        },
        computed:{
            propsDialogVisible: {
                get:function(){
                    return this.dialogVisible;
                },
                set:function () {
                    return  this.$emit("closeCreateModal");
                }
            }
        },
        methods:{
//            关闭
            operateClose(){
                this.$emit("closeCreateModal");
            },
            operateSave(){

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
            },

            handleChange(file, fileList) {
                this.fileList3 = fileList.slice(-3);
            },
        },
        data(){
            return {
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
            }
        },
        watch : {
        },
        mounted (){
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
    }
    .record{
        line-height: 48px;
        color: #666666;
        span.label{
            display: inline-block;
            width: 120px;
            text-align: right;
            color: #333333;
        }
    }
</style>
