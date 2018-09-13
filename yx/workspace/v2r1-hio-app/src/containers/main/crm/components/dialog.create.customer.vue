<template>
<div>
    <right-slide-modal
            class="customerDiv"
            title="创建客户"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li>
                    <el-button @click="operateSave('customersForm')">保存</el-button>
                </li>
                <li>
                    <el-button @click="operateClose()">关闭</el-button>
                </li>
            </ul>
        </div>

        <div class="dia-content">
            <el-form :model="customersForm" :sid="customersForm.sid" :rules="rules" :inline="true" ref="customersForm" label-width="82px" class="">
                <el-form-item label="客户名称：" prop="customer"  style="width: 716px">
                    <el-input :maxlength="101" v-model.trim="customersForm.customer" @blur="customerName()" style="width: 615px"></el-input>
                </el-form-item>
                <el-form-item label="负责人：" prop="signName"  style="width: 400px">
                    <el-input v-model="customersForm.signName" :disabled="true" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="contactNumber"  style="width: 290px">
                    <el-input :maxlength="21" @blur="blurMethod"  onkeyup="value=value.replace(/[^\d]/g,'')" v-model="customersForm.contactNumber" style="width: 200px"></el-input>
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
                <el-form-item label="客户类型：" prop="customerType"  style="width:400px">
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
                            class="remarks"
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
                        <el-button size="small" type="primary"><i class="el-icon-upload"></i> 点击上传</el-button> -->
                        <!-- <div slot="tip" class="el-upload__tip">点击上传按钮上传文件</div> -->
                    <!-- </el-upload> -->
                    <attach-upload
                                v-if="this.customersForm.businessId"
                                :multiple="false"
                                :readonly="false"
                                @fileQueued="handleAttachQueued"
                                @uploadError="handleAttachError"
                                @uploadFinished="handleAttachUploadSuccess"
                                :required="false"
                                ref="attachUpload"
                                :appId="this.customersForm.appId"
                                :businessId="this.customersForm.businessId"
                                :categoryId="this.customersForm.categoryId"></attach-upload>
                    </el-form-item>

                <el-form-item class="information">
                    <span style="font-family: MicrosoftYaHei-Bold; font-weight:bold; font-size: 14px; color: #454545; letter-spacing: 0;">创建联系人</span>
                    <span @click="addInformation" class="el-icon-circle-plus-outline add"></span>
                    <el-table
                            :data="customersForm.information"
                            style="width: 100%;text-align: center;"
                            :render-header="labelHead"
                            :header-cell-class-name="tableheaderClassName"
                            :header-cell-style="{'text-align':'center','background':'#f0f0f0','font-size':'14px','font-weight':'normal','color':'#333','padding':'4px 0px'}">
                        <el-table-column
                                prop="name"
                                label="姓名"
                                width="120">
                            <template slot-scope="scope">
                                <!-- <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span> -->

                                <el-form-item
                                        style="float: left"
                                        v-if="scope.row.editFlag"
                                        :prop="'information.' + scope.$index + '.name'"
                                        :rules="[
                                            { required: true, message: '请输入姓名', trigger: 'blur' },
                                            { min: 1, max: 100, message: '1~100字符', trigger: ['blur','change'] },
                                            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                                            ]"
                                >
                                    <!--<el-input  size="small" style="margin-top: 16px;width: 90px" :maxlength="101" v-model="scope.row.name"></el-input>-->
                                    <el-input size="small" style="margin-top: 16px" :maxlength="101" v-if="scope.row.editFlag" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                                </el-form-item>


                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="title"
                                label="职务"
                                width="120">
                            <template slot-scope="scope">
                                <!-- <span v-if="!scope.row.editFlag">{{ scope.row.job }}</span> -->
                                <el-form-item
                                        style="float: left"
                                        v-if="scope.row.editFlag"
                                        :prop="'information.' + scope.$index + '.title'"
                                        :rules="[
                                            { min: 1, max: 100, message: '1~100字符', trigger: ['blur','change'] },
                                            { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                                            ]"
                                >
                                    <!--<el-input  size="small" style="margin-top: 16px;width: 90px" :maxlength="101" v-model="scope.row.name"></el-input>-->
                                    <el-input  size="small" style="margin-top: 16px" v-if="scope.row.editFlag" :maxlength="101" v-model="scope.row.title" placeholder="请输入内容"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="phoneNumber"
                                label="手机号码"
                                width="150">
                            <template slot-scope="scope">
                                <!-- <span v-if="!scope.row.editFlag">{{ scope.row.telephone }}</span> -->
                                <el-form-item
                                        style="float: left"
                                        v-if="scope.row.editFlag"
                                        :ref="'information_' + scope.$index + '_phoneNumber'"
                                        :prop="'information[' + scope.$index + '].phoneNumber'"

                                >
                                    <!--<el-input  size="small" style="margin-top: 16px;width: 90px" :maxlength="101" v-model="scope.row.name"></el-input>-->
                                    <el-input @focus="JZY.s.clog(1);$nextTick(function(){ $refs['information_' + scope.$index + '_phoneNumber'].clearValidate() })" style="margin-top: 16px" size="small" :maxlength="11" onkeyup="value=value.trim().replace(/[^\d]/g,'')"  v-if="scope.row.editFlag" v-model.number="scope.row.phoneNumber" placeholder="请输入内容"></el-input>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                label="电子邮件"
                                width="170">
                            <template slot-scope="scope">
                                <el-form-item
                                        style="float: left"
                                        v-if="scope.row.editFlag"
                                        :prop="'information.' + scope.$index + '.email'"
                                        :rules="[
                                            { min: 1, max: 100, message: '1~100字符', trigger: ['blur','change'] },
                                            { type: 'email', message: '邮箱不正确', trigger: 'blur' }
                                            ]"
                                >
                                    <!--<el-input  size="small" style="margin-top: 16px;width: 90px" :maxlength="101" v-model="scope.row.name"></el-input>-->
                                    <el-input style="margin-top: 16px" size="small" v-if="scope.row.editFlag" v-model="scope.row.email" :maxlength="101" placeholder="请输入内容"></el-input>
                                </el-form-item>
                                <!-- <span v-if="!scope.row.editFlag">{{ scope.row.mail }}</span> -->
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="decisionRole"
                                label="决策关系"
                                width="140">
                            <template slot-scope="scope">
                                <!-- <span v-if="!scope.row.editFlag">{{ scope.row.decision }}</span> -->
                                <!-- <el-input  v-if="scope.row.editFlag" v-model="scope.row.decision" placeholder="请输入内容"></el-input> -->
                                <el-form-item
                                        style="float: left"
                                        v-if="scope.row.editFlag"
                                        :prop="'information.' + scope.$index + '.decisionRole'"
                                        :rules="[
                                            { required: true, message: '请选择决策关系', trigger: 'blur' },
                                            ]"
                                >
                                    <!--<el-input  size="small" style="margin-top: 16px;width: 90px" :maxlength="101" v-model="scope.row.name"></el-input>-->
                                    <el-select style="margin-top: 16px"  size="small" v-if="scope.row.editFlag" v-model="scope.row.decisionRole" placeholder="请选择决策关系">
                                        <el-option label="普通员工" value="0"></el-option>
                                        <el-option label="采购决策人" value="1"></el-option>
                                        <el-option label="项目决策人" value="2"></el-option>
                                        <el-option label="人事决策人" value="3"></el-option>
                                    </el-select>
                                </el-form-item>

                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label=""
                                width="120">
                            <template slot-scope="scope">
                                <!-- <span class="el-icon-success" @click="saveInformation(scope.$index, scope.row)" style="font-size: 20px;color: #67c23a;margin-right: 12px"></span> -->
                                <span class="el-icon-circle-close" @click="delInformation(scope.$index, scope.row)" style="font-size: 20px;color: red"></span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>

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
import {customerAddMod,initAjaxSid,contrastName} from '@Main/crm/getData'
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
//              alert('附件上传出错啦')
            },
            handleAttachQueued(){
                // alert('add one new attach file')
              this.isAttachUploadFinished=false
            },
            handleAttachUploadSuccess(res){
                this.isAttachUploadFinished=true
            //   alert('全部上传成功,返回信息请查看控制台显示')
//              console.log('附件上传成功返回信息：',res)
            },
            //客户名称对比
             async contrastNameData({
                 name = '',
                 sid = '',
             }= {}){
                let res = await contrastName(
                    name,
                    sid,
                ).catch((e)=>{
                    console.log('my ee---:',e)
                    if(e.message=="客户名称已存在！"){
                        this.nameJud=false;
                    }
                })
                console.info(res);
                if(res[0]==true){
                    this.nameJud=true;
                }
            },

            async initAjaxSidData(){
                let res = await initAjaxSid()
                console.info(res[0])
                this.customersForm.sid=res[0].businessId;

                this.customersForm.appId=res[0].app;
                this.customersForm.businessId=res[0].businessId;
                this.customersForm.categoryId=res[0].category;

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
                JZY.u.successMsg("保存成功")
                await Promise.all("attachUpload".split(",").map((ref)=>this.$refs[ref].saveFiles()))
                this.$emit("closeCreateModal");
            },
            customerName (){
                let name=this.customersForm.customer;//客户名称
                let sid='';

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
//            console.log(obj);
            },
            //删除用户tag的事件
            deleteUserOnly(sid) {
                this.showUserOnly = this.showUserOnly.filter(function(item) {
                return item.sid != sid;
                });
//                console.log(this.showUserOnly);
            },
//            关闭
            operateClose(){
                this.$emit("closeCreateModal");
            },
            operateSave(operateSave){
                if(this.nameJud==false){
                    JZY.u.errorMsg("客户名称已存在！");
                }else{
                    this.$refs[operateSave].validate((valid) => {
                    if (valid) {
                        console.log('model',this.$refs[operateSave].$options.propsData.model);
                        this.showUserOnly.forEach((item)=>{
                            this.customersForm.salesmans.push({salesmanId:item.sid})
                        })
//                        console.log(this.customersForm.salesmans);
                        let sid=this.customersForm.sid;
                        let customer=this.customersForm.customer;//客户名称
                        console.log(customer);
                        let contactNumber=this.customersForm.contactNumber;//联系电话
//                        console.log(contactNumber);
                        let email=this.customersForm.email;//邮箱
//                        console.log(email);
                        let source=this.customersForm.source;//客户来源
                        if(source=="网站"){
                            source='0';
                        }
//                        console.log(source);
                        let customerType=this.customersForm.customerType;//客户类型
                        if(customerType=="潜在客户"){
                            customerType='1';
                        }
//                        console.log(customerType);
                        let address=this.customersForm.address;//地址
//                        console.log(address);
                        let website=this.customersForm.website;//网址
//                        console.log(website);
                        let progress=this.customersForm.progress;//备注
//                        console.log(progress);
                        let contacts=this.customersForm.information;
                        contacts.forEach((item)=>{
                            if(item.decisionRole=="普通员工"){
                                item.decisionRole="0";
                            }
                        })
//                        console.log(contacts);
                        let salesmans=this.customersForm.salesmans;
//                        console.log(salesmans);

                        this.customerAddModData( {
                                'sid':sid,
                                'name':customer,
                                'phoneNumber':contactNumber,
                                'email':email,
                                'source':source,
                                'type':customerType,
                                'status':'',
                                'address':address,
                                'webSite':website,
                                'comment':progress,
                                'salesmans':salesmans,
                                'contacts':contacts
                                });
                        } else {
//                            console.log('error submit!!');
                            return false;
                        }
                });
                }
            },

//            弹窗中 新增联系人
            addInformation (){
                let len=this.customersForm.information.length,
                    self=this

                // JZY.DEBUG_MODE && (alert('111'))
                // console.log('333333333')
                this.rules[`information[${len}].phoneNumber`]=[

                    { pattern: /^1[3|4|5|7|8|6|9][0-9]\d{8}$/, message: '手机号码不正确', trigger: 'blur' }]

                this.customersForm.information.push({
                    sid:'',
                    name:'',
                    title:'',
                    phoneNumber:'',
                    email:'',
                    decisionRole:'0',
                    editFlag:true
                });

                setTimeout(()=>{
                    console.log('push test')
                    this.rules[`information[${len}].phoneNumber`].unshift({ required: true, message: '请输入手机号码', trigger: ['blur','change'] })
                    // this.$refs.customersForm.resetField(`information[${len}].phoneNumber`)
                    this.$nextTick(()=>{
                        setTimeout(()=>{
                            console.log("set1 timeout next tick self refs--:",self.$refs)
                            self.$refs['information_' + len + '_phoneNumber'].clearValidate()
                        })

                    })


                })
            // :prop="'information.' + scope.$index + '.phoneNumber'"




                // console.log("111111111")
                // setTimeout(()=>{
                //     this.rules.information.push({
                //         phoneNumber:[
                //             { required: true, message: '请输入手机号码', trigger: ['blur','change'] },
                //             { pattern: /^1[3|4|5|7|8|6|9][0-9]\d{8}$/, message: '手机号码不正确', trigger: 'blur' }]
                //     })
                // })



            },
            saveInformation (index, row){
                this.customersForm.information[index].editFlag = false;
            },
            delInformation (index, row){
                this.customersForm.information.splice(index,1)
            },

            handleChange(file, fileList) {
//                console.log('附件file',file);
//                console.log('附件fileList',fileList);
                this.fileList3 = fileList.slice(-3);
            },

            //表格表头
            labelHead(h,{column,index}){

                return h('div',{class:'table-head',style:{}},[column.label])
            },
            tableheaderClassName(obj){
                if(obj.columnIndex ==1||obj.columnIndex ==3||obj.columnIndex ==5){
                    return "";
                }else{
                    return "table-head-red";
                }
            }
        },
        data(){
            return {
                customersForm: {
                    signName:'',
                    appId:'',
                    businessId:'',
                    categoryId:'',
                    sid:"",
                    customer: '',//客户名称
                    contactNumber:'',//联系电话
                    email: '',//电子邮件
                    source: '0',//客户来源
                    customerType: '1',//客户类型
                    address: '',//联系地址
                    website: '',//企业网站
                    progress: '',//备注
                    sharing: '',//共享
                    fileList:[],//附件
                    information:[],
                    salesmans:[]
                },
                rules:{
                    customer: [
                        { required: true, message: '请输入客户名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
                    ],
                    signName:[
                        { required: true, message: '负责人不能为空', trigger: 'blur' },
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
                nameJud:true
            }
        },
        watch : {
        },
        mounted (){
        },
        created (){
            this.initAjaxSidData();

            console.log('session信息',this.$store.state.session);
            console.log('session信息',this.$store.state.session.tenantInfo.roleMenus);
            let signName=this.$store.state.session.name;
            this.customersForm.signName=signName;
            console.log('登录人',signName);
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss">
.customerDiv .el-dialog__title{
    font-family: MicrosoftYaHei-Bold;
    font-size: 16px;
    color: #268EED;
    letter-spacing: 0;
    line-height: 16px;
}
.customerDiv .el-dialog__body{overflow-x: hidden;}
</style>

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
<style rel="stylesheet/scss" lang="scss" >
    .table-head-red{
        div.cell{
            width: auto;
        }
        div.cell:after{
            content: '*';
            color: $theme-red;
        }
    }
</style>
