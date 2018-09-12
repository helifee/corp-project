<template>
<div>
    <right-slide-modal
            title="编辑客户"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateSave('customersForm')" size="medium ">保存</el-button>
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
            </ul>
        </div>

        <div class="dia-content">
            <el-form :model="customersForm" :rules="rules" :inline="true" ref="customersForm" label-width="82px" class="">
                <el-form-item label="客户名称：" prop="customer"  style="width: 716px">
                    <el-input :maxlength="101" v-model.trim="customersForm.customer" @blur="customerName()" style="width: 615px"></el-input>
                </el-form-item>
                <el-form-item label="负责人" prop="signName"  style="width: 400px">
                    <el-input v-model="customersForm.signName" :disabled="true" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="contactNumber"  style="width: 290px">
                    <el-input :maxlength="21" @blur="blurMethod" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="customersForm.contactNumber" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件：" prop="email" style="width: 400px">
                    <el-input :maxlength="101" v-model="customersForm.email" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="客户来源：" prop="source" style="width: 290px">
                    <!-- <el-input v-model="customersForm.source" style="width: 280px"></el-input> -->
                    <el-select v-model="customersForm.source" placeholder="请选择客户来源" style="width: 200px">
                        <el-option label="网站" value="0"></el-option>
                        <el-option label="百度推广" value="1"></el-option>
                        <el-option label="会销" value="2"></el-option>
                        <el-option label="微信" value="3"></el-option>
                        <el-option label="地推" value="4"></el-option>
                        <el-option label="其他" value="9"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户类型：" prop="customerType"  style="width: 400px">
                    <el-select v-model="customersForm.customerType" placeholder="请选择项目等级" style="width: 200px">
                        <!-- <el-option label="一般客户" value="0"></el-option> -->
                        <el-option label="潜在客户" value="1"></el-option>
                        <el-option label="普通客户" value="2"></el-option>
                        <el-option label="vip客户" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系地址：" prop="address" style="width: 290px">
                    <el-input :maxlength="101" v-model="customersForm.address" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="企业网站：" prop="website"  style="width: 400px">
                    <el-input :maxlength="101" v-model="customersForm.website" style="width: 200px"></el-input>
                </el-form-item>

                <el-form-item label="备注：" prop="progress"  style="width: 716px">
                    <el-input 
                            v-textarea-limiter
                            :maxlength="2500"
                            type="textarea"
                            style="width: 615px; height:96px;"
                            :rows="3"
                            v-model="customersForm.progress">
                    </el-input>
                </el-form-item>

                <!-- <el-form-item label="共享：" prop="sharing" style="width: 425px"> -->
                    <!-- <group-tree
                          :selectedDeptsToTree="groupTreeData.deptList"
                          :selectedRolesToTree="groupTreeData.roleList"
                          :selectedUsersToTree="groupTreeData.userList"
                          @getDataFromGroupTree = "getDataFromGroupTree"
                        >
                    </group-tree> -->
                    <!-- <el-input v-model="customersForm.sharing" style="width: 280px"></el-input> -->
                    <!-- <i class="el-icon-share" @click="showUserTreeOnly = !showUserTreeOnly"></i> -->
                    <!-- <el-button @click="showUserTreeOnly = !showUserTreeOnly">共享图标</el-button> -->
                    <!-- <el-tag
                    v-for="(item,index) in showUserOnly"
                    :key="index"
                    closable
                    :disable-transitions="false"
                    @close="deleteUserOnly(item.sid)">
                    {{item.name}}
                    </el-tag>

                    <user-tree
                        :selectUserDialogVisible="showUserTreeOnly"
                        :enable-checked-multiple="enableCheckedMultipleUser"
                        :show-inside-outside-tabs="showInsideOutsideTabs"
                        :selectedUsers = "showUserOnly"
                        :filterDataUrl = "filterDataUrl"
                        @closeCreateModal ="showUserTreeOnly = !showUserTreeOnly"
                        @getUserTree = "getUserTreeOnly">
                    </user-tree>
                </el-form-item> -->

                <el-form-item label="附件：" prop="fileList" style="width: 700px">
                    <!--<el-input v-model="customersForm.sharing" style="width: 280px"></el-input>-->
                    <!-- <el-upload
                            style="width: 280px"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-change="handleChange"
                            :file-list="customersForm.fileList">
                        <el-button size="small" type="primary"><i class="el-icon-upload"></i> 点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">点击上传按钮上传文件</div>
                    </el-upload> -->
                    <attach-upload
                                 v-if="this.customersForm.attachmentParam.businessId"
                                :multiple="false"
                                :readonly="false"
                                @fileQueued="handleAttachQueued"
                                @uploadError="handleAttachError"
                                @uploadFinished="handleAttachUploadSuccess"
                                :required="false"
                                ref="attachUpload"
                                :appId="this.customersForm.attachmentParam.app"
                                :businessId="this.customersForm.attachmentParam.businessId"
                                :categoryId="this.customersForm.attachmentParam.category">
                    </attach-upload>
                </el-form-item>
                <!-- <el-form-item class="information">
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
                                <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="title"
                                label="职务"
                                width="120">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.title" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="phoneNumber"
                                label="手机号码"
                                width="150">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.phoneNumber" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                label="电子邮件"
                                width="190">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.email" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="decisionRole"
                                label="决策关系"
                                width="140">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.decisionRole" placeholder="请选择决策关系">
                                    <el-option label="普通员工" value="0"></el-option>
                                    <el-option label="采购决策人" value="1"></el-option>
                                    <el-option label="项目决策人" value="2"></el-option>
                                    <el-option label="人事决策人" value="3"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label=""
                                width="120">
                            <template slot-scope="scope">
                                <span class="el-icon-circle-close" @click="delInformation(scope.$index, scope.row)" style="font-size: 20px;color: red"></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item> -->

                <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('customersForm')">立即创建</el-button>
                    <el-button @click="resetForm('customersForm')">重置</el-button>
                </el-form-item> -->


            </el-form>

        </div>
    </right-slide-modal>
</div>
</template>

<script>
import {customerAddMod,contrastName} from '@Main/crm/getData'
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
            blurMethod(){
                this.customersForm.contactNumber=this.customersForm.contactNumber.replace(/[^\d]/g,'')
            },
            //附件上传方法
            handleAttachError(){
              alert('附件上传出错啦')
            },
            handleAttachQueued(){
                // alert('add one new attach file')
              this.isAttachUploadFinished=false
            },
            handleAttachUploadSuccess(res){
                this.isAttachUploadFinished=true
            //   alert('全部上传成功,返回信息请查看控制台显示')
              console.log('附件上传成功返回信息：',res)
            },
             //客户名称对比
             async contrastNameData({
                 name = '',
                 sid = '',
             }= {}){
                let res = await contrastName(
                    name,
                    sid,
                )
                console.info(res);
            },
            // 客户新增修改
            async customerAddModData( {
                sid = '' ,
                name = '' ,
                phoneNumber = '' ,
                email = '' ,
                source='' ,
                type = '',
                status='',
                address='',
                webSite='',
                comment='',
                salesmans='',
                contacts=''
             } = {} ){
                let res = await customerAddMod(
                    sid,
                    name,
                    phoneNumber,
                    email,
                    source,
                    type,
                    status,
                    address,
                    webSite,
                    comment,
                    salesmans,
                    contacts
                    )
                console.info(res[0])
                JZY.u.successMsg("编辑成功")
                await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles())) 
                this.$emit("closeCreateModal");
            },
            customerName (){
                let name=this.customersForm.customer;//客户名称
                let sid=this.customersForm.sid;
                
                this.contrastNameData({
                    'name':name, 
                    'sid':sid, 
                })
            },
            // getDataFromGroupTree:function(obj){
            //     console.info("getDataFromGroupTree")
            //     console.info(obj)
            // },
            //接收用户树组件的返回值
            getUserTreeOnly:function(obj){
                this.showUserOnly = [...obj]
                this.arr.push(obj.sid)//['1','2']
                console.log(obj);
            },
            //删除用户tag的事件
            deleteUserOnly(sid) {
                this.showUserOnly = this.showUserOnly.filter(function(item) {
                    return item.sid != sid;
                });

                this.arr.splice(this.arr.indexOf(sid),1); //['1','2']
                console.log(this.showUserOnly);
                console.log(this.arr);
            },
            //重置
            resetForm (customersForm){
                console.log(customersForm);
            },
//            关闭
            operateClose(){
                this.$emit("closeCreateModal");
            },
            test(data){
                // 点击编辑对应的数据
                console.log('修改的数据',data);
                this.customersForm.sid=data.sid;
                this.customersForm.status=data.status;
                this.customersForm.customer=data.name;//客户名称
                this.customersForm.contactNumber=data.phoneNumber;//联系电话
                this.customersForm.email=data.email;//邮箱
                if(data.ownerPersonName==null || data.ownerPersonName==""){
                    this.customersForm.signName="";
                }else{
                    this.customersForm.signName=data.ownerPersonName;
                }
                // this.customersForm.customerType=data.type;//客户类型
                this.customersForm.address=data.address;////地址
                this.customersForm.website=data.webSite;//网址
                this.customersForm.progress=data.comment;//备注
                // this.showUserOnly=data.salesmans;//共享

                //  this.customersForm.source=data.source;//客户来源;
                 if(data.source==0){
                     this.customersForm.source="网站"
                 }else if(data.source==1){
                     this.customersForm.source="百度推广"
                 }else if(data.source==2){
                     this.customersForm.source="会销"
                 }else if(data.source==3){
                     this.customersForm.source="微信"
                 }else if(data.source==4){
                     this.customersForm.source="地推"
                 }else if(data.source==9){
                     this.customersForm.source="其他"
                 }
                 console.log(this.customersForm.source);


                // this.arr = [...data.salesmans];//共享
                data.salesmans.forEach((item)=>{
                    this.showUserOnly.push({
                        sid:item.salesmanId,
                        name:item.salesmanName
                    })
                })

                //  this.showUserOnly.forEach((item)=>{
                //     if(this.showUserOnly.indexOf(this.showUserOnly.sid)==-1){
                //         this.showUserOnly.push(this.showUserOnly.sid);
                //     }
                     
                // })
                console.log(this.showUserOnly);
                    if(data.type==0){
                        this.customersForm.customerType='一般客户';
                    }else if(data.type==1){
                        this.customersForm.customerType='潜在客户';
                    }else if(data.type==2){
                        this.customersForm.customerType='普通客户';
                    }else if(data.type==3){
                        this.customersForm.customerType='vip客户';
                    };
                


                data.contacts.forEach((item)=>{
                    //  this.customersForm.information.push({
                    //     name:'',
                    //     job:'',
                    //     telephone:'',
                    //     mail:'',
                    //     decision:'',
                    //     editFlag:true
                    // });
                    if(item.decisionRole==0){
                        item.decisionRole='普通员工';
                    }else if(item.decisionRole==1){
                        item.decisionRole='采购决策人';
                    }else if(item.decisionRole==2){
                        item.decisionRole='项目决策人';
                    }else if(item.decisionRole==3){
                        item.decisionRole='人事决策人';
                    };
                })
                this.customersForm.information=data.contacts;
                console.log(this.customersForm.information);
                this.customersForm.attachmentParam=data.attachmentParam;
                console.log('附件数据',this.customersForm.attachmentParam);
                 
            },
            operateSave(operateSave){
                this.$refs[operateSave].validate((valid) => {
                    if (valid) {
                        console.log(this.$refs[operateSave].$options.propsData.model);
                        
                        let sid=this.customersForm.sid;//sid
                        console.log(sid);
                        let status=this.customersForm.status;//status
                        console.log(status);
                        let customer=this.customersForm.customer;//客户名称
                        console.log(customer);
                        let contactNumber=this.customersForm.contactNumber;//联系电话
                        console.log(contactNumber);
                        let email=this.customersForm.email;//邮箱
                        console.log(email);
                        
                        // 客户类型转化
                        if(this.customersForm.customerType=="一般客户"){
                            this.customersForm.customerType="0"
                        }else if(this.customersForm.customerType=="潜在客户"){
                            this.customersForm.customerType="1"
                        }else if(this.customersForm.customerType=="普通客户"){
                            this.customersForm.customerType="2"
                        }else if(this.customersForm.customerType=="vip客户"){
                            this.customersForm.customerType="3"
                        }
                        let customerType=this.customersForm.customerType;//客户类型
                        console.log(customerType);

                        // 获取修改的客户来源参数
                        if(this.customersForm.source=="网站"){
                            this.customersForm.source="0"
                        }else if(this.customersForm.source=="百度推广"){
                            this.customersForm.source="1"
                        }else if(this.customersForm.source=="会销"){
                            this.customersForm.source="2"
                        }else if(this.customersForm.source=="微信"){
                            this.customersForm.source="3"
                        }else if(this.customersForm.source=="地推"){
                            this.customersForm.source="4"
                        }else if(this.customersForm.source=="其他"){
                            this.customersForm.source="9"
                        }
                        let source=this.customersForm.source;//客户来源
                        console.log(source);

                        let address=this.customersForm.address;//地址
                        console.log(address);
                        let website=this.customersForm.website;//网址
                        console.log(website);
                        let progress=this.customersForm.progress;//备注
                        console.log(progress);
                        
                        // 修改下面的框参数
                        this.customersForm.information.forEach((item)=>{
                            if(item.decisionRole=="普通员工"){
                                item.decisionRole="0"
                            }else if(item.decisionRole=="采购决策人"){
                                item.decisionRole="1"
                            }else if(item.decisionRole=="项目决策人"){
                                item.decisionRole="2"
                            }else if(item.decisionRole=="人事决策人"){
                                item.decisionRole="3"
                            }
                        })
                        let contacts=[];
                        console.log(contacts);

                        //获取共享id
                        // console.log(this.arr);
                        //  this.arr.forEach((item)=>{
                        //      this.customersForm.salesmans.push({salesmanId:item.salesmanId})
                        // })

                        this.showUserOnly.forEach((item)=>{
                            this.customersForm.salesmans.push({
                                salesmanId:item.sid
                            })
                        })
                        let salesmans=this.customersForm.salesmans;
                        

                        this.customerAddModData( {
                                'sid':sid, 
                                'name':customer, 
                                'phoneNumber':contactNumber, 
                                'email':email, 
                                'source':source, 
                                'type':customerType, 
                                'status':status, 
                                'address':address, 
                                'webSite':website, 
                                'comment':progress,
                                'salesmans':salesmans, 
                                'contacts':contacts 
                                });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                });
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
                console.log(this.customersForm.information);
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
                    signName:'',
                    attachmentParam:{},
                    sid:'',
                    customer: '',//客户名称
                    contactNumber:'',//联系电话
                    email: '',//电子邮件
                    source: '',//客户来源
                    customerType: '',//客户类型
                    address: '',//联系地址
                    website: '',//企业网站
                    progress: '',//备注
                    sharing: '',//共享
                    fileList:[],//附件
                    information:[],
                    salesmans:[],
                    arr:[],
                    status:''
                },
                rules:{
                    customer: [
                        { required: true, message: '请输入客户名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
                    ],
                    signName:[
                        { required: false, message: '负责人不能为空', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                    ],
                    contactNumber: [
                        { required: false, message: '请输入联系电话', trigger: 'blur'},
                        // {validator:function(rule,value,callback){
                        //     if(value==""){
                        //        callback();
                        //     }else{
                        //         if(/^1[34578]\d{9}$/.test(value) == false){
                        //             callback(new Error("请输入正确的手机号"));
                        //         }else{
                        //             callback();
                        //         }
                        //     }
                        // }, trigger: 'blur'}
                        {validator:function(rule,value,callback){
                            if(value==""){
                               callback();
                            }else{
                                if(/^[0-9]{1,21}$/.test(value) == false){
                                    callback(new Error("请输入正确的联系电话"));
                                }else if(value.length>20){
                                    callback(new Error("最多可输入20个字符"));
                                }else{
                                    callback();
                                }
                            }
                        }, trigger: 'change'}
                    ],
                    email:[
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
                        { min: 1, max: 100, message: '邮箱长度不能大于100字符', trigger: 'change' },
                    ],
                    source: [
                        { required: true, message: '请输入客户来源', trigger: 'change' },
                        // { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                    ],
                    customerType: [
                        { required: true, message: '请选择客户类型', trigger: 'change' },
                        // { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                    ],
                    address:[
                        { required: false, message: '请输入联系地址', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
                    ],
                    website:[
                        { required: false, message: '请输入企业网址', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
                    ],
                    progress:[
                        { required: false, message: '请输入备注', trigger: 'blur' },
                        { min: 1, max: 2500, message: '长度在 1 到 2500 个字符', trigger: 'change' },
                    ],
                },
                //用户树-开始
                //单选还是多选设置
                enableCheckedMultipleUser:true,//false单选，true多选（默认是多选，此种模式可不传递此参数）
                showInsideOutsideTabs:true,//显示内、外部，false:只显示‘人员’，其他逻辑无差异
                filterDataUrl:{
                    host:'GLOBAL.SHANG_BIN',
                    type:'post',
                    url:'/journal/journal/selectCondition',
                    data:{
                        journalDate:'2018-04-16'
                    }
                },//过滤数据源，获取data的接口
                //组合树-开始
                // groupTreeData:{
                //     // tagButtons:['dept','role','user'],//部门、角色、用户，默认三个，可不传值
                //     deptList:[{//已选择的部门
                //         sid:'1002',
                //         name:'市场部'
                //     },{
                //         sid:'1003',
                //         name:'人事部'
                //     }],
                //     roleList:[{//已选择的角色
                //     roleId:'1003',
                //     roleName:'销售经理'
                //     }],
                //     userList:[{//已选择的用户
                //         // nodeId:'e08fa8dcfb0f443fb8d09437e7a60aca',
                //         sid:'1000',
                //         name:'创建者'
                //     }],
                // },
                /*1棵树*/
                showUserTreeOnly:false,
                showUserOnly:[],
            }
        },
        watch : {
        },
        mounted (){
        },
        created(){
            console.log('session信息',this.$store.state.session);
            console.log('session信息',this.$store.state.session.tenantInfo.roleMenus);
            let signName=this.$store.state.session.name;
            // this.customersForm.signName=signName;
            console.log('登录人',signName);
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .operate_buttons {
        float: right;
        line-height: 50px;
        top:0px !important;
    }
    // .el-select .el-input__inner {
    //     width: 280px;
    // }
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
