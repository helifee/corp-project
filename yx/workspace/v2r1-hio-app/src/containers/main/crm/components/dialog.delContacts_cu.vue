<template>
<div class="crm_add_contacts">
    <right-slide-modal
            title="编辑联系人"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <el-button @click="operateSave('form')" size="medium ">保存</el-button>
                <el-button @click="operateClose()" size="medium ">关闭</el-button>
            </ul>
        </div>
        <div class="detail-content">
            <el-form ref="form" :sid="form.sid"  :model="form" :rules="rules" label-width="120px">
                <el-form-item label="客户名称：" prop="cusName">
                    <el-input class="cusSelect"
                    placeholder="请输入内容"
                    v-model="this.form.cusName"
                    :title="this.form.cusName"
                    :disabled="true">
                    </el-input>
                    <!-- <el-select v-model="form.customerId"  @change="select(form.customerId)" placeholder="请选择">
                        <el-option
                        v-for="item in form.options"
                        :key="item.customerId"
                        :label="item.customerName"
                        :value="item.customerId">
                        </el-option>
                    </el-select> -->
                    <!-- <el-input v-model="form.name"></el-input> -->
                </el-form-item>
                <el-form-item label="姓名：" prop="fullName">
                    <el-input v-model="form.fullName" :maxlength="101"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex">
                        <el-option label="请选择性别" value="-1"></el-option>
                        <el-option label="男" value="0"></el-option>
                        <el-option label="女" value="1"></el-option>
                    </el-select>
                    <!-- <el-radio-group v-model="form.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio  :label="0" >女</el-radio>
                    </el-radio-group> -->
                </el-form-item>
                <el-form-item label="手机号码：" prop="phone">
                    <el-input v-model="form.phone" :maxlength="11" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="职务：" prop="job">
                    <el-input v-model="form.job" :maxlength="101"></el-input>
                </el-form-item>
                <el-form-item label="决策关系：" prop="relation">
                    <el-select v-model="form.relation" placeholder="请选择决策关系">
                        <el-option label="普通员工" value="0"></el-option>
                        <el-option label="采购决策人" value="1"></el-option>
                        <el-option label="项目决策人" value="2"></el-option>
                        <el-option label="人事决策人" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电子邮件：" prop="mail">
                    <el-input v-model="form.mail" :maxlength="101"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="des">
                    <el-input v-model="form.des" :rows="5" v-textarea-limiter type="textarea" :maxlength="2500"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </right-slide-modal>
</div>
</template>

<script>
    import {postOfficeHouseSelectTree,postOfficeHouseSave} from '@Main/officeSupplies/getData.js'
    import {add,initAjax} from '@Main/crm/getData'
    export default{
        components:{

        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            id:{
                required:false
            },
            editLi:{
            }
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
            async initAjaxData(){
                let res = await initAjax(this.form.customerId)
                console.info(res[0])
                this.form.options=res[0];
                console.log(this.form.options);
            },
            //添加数据
            async addData( {sid = '' ,customerId = '' ,opportunityId = '' ,name = '' ,phoneNumber='' ,title = '',gendar='',email='',comment='',decisionRole='' } = {} ){
                let res = await add(sid,customerId,opportunityId,name,phoneNumber,title,gendar,email,comment,decisionRole)
                console.info(res[0])
                this.$emit("closeCreateModal");
            },
            select(index){
                this.form.customerId=index;
                console.log(this.form.customerId)
            },
//            关闭
            operateClose(formName){
                this.$emit("closeCreateModal");
            },
            test(data){
                // 点击编辑对应的数据
                console.log('修改的数据',data);
                console.log(data.comment);//备注
                console.log(data.customerId);//客户id
                console.log(data.customerName);//客户名字
                console.log(data.decisionRole);//决策关系
                console.log(data.email);//email
                console.log(data.gendar);//性别
                console.log(data.masterContact);//
                console.log(data.name);//联系人名字
                console.log(data.opportunityId);//商机id
                console.log(data.phoneNumber);//手机号
                console.log(data.sid);//sid
                console.log(data.title);//职务

                this.form.sid=data.sid;
                this.form.cusName=data.customerName;
                this.form.customerName=data.customerName;
                this.form.fullName=data.name;
                if(data.gendar=="1"){
                    data.gendar="女"
                }else if(data.gendar=="0"){
                    data.gendar="男"
                }else if(data.gendar=="-1"){
                    data.gendar="请选择性别"
                }
                this.form.sex=data.gendar;
                this.form.phone=data.phoneNumber;
                this.form.job=data.title;
                this.form.relation=data.decisionRole;
                this.form.mail=data.email;
                this.form.des=data.comment;
                this.form.customerId=data.customerId;
                if(data.decisionRole==0){
                    this.form.relation='普通员工';
                }else if(data.decisionRole==1){
                    this.form.relation='采购决策人';
                }else if(data.decisionRole==2){
                    this.form.relation='项目决策人';
                }else if(data.decisionRole==3){
                    this.form.relation='人事决策人';
                }
            },
//            保存
            operateSave (formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form.sid);
                        console.log(this.$refs[formName])
                        console.log(this.$refs[formName].$options.propsData.model);
                        console.log('备注',this.$refs[formName].$options.propsData.model.des);//备注
                        console.log('姓名',this.$refs[formName].$options.propsData.model.fullName);//姓名
                        console.log('职务',this.$refs[formName].$options.propsData.model.job);
                        console.log('邮箱',this.$refs[formName].$options.propsData.model.mail);
                        console.log('客户名称',this.$refs[formName].$options.propsData.model.name);
                        console.log('电话',this.$refs[formName].$options.propsData.model.phone);
                        console.log('关系',this.$refs[formName].$options.propsData.model.relation);
                        console.log('性别',this.$refs[formName].$options.propsData.model.sex);
                        
                        let sex=this.$refs[formName].$options.propsData.model.sex;
                        if(sex=="男"){
                            sex="0";
                        }else if(sex=="女"){
                            sex="1";
                        }else if(sex=="请选择性别"){
                            sex="-1";
                        }

                        let relationNum=this.$refs[formName].$options.propsData.model.relation;

                        if(relationNum=="普通员工"){
                            relationNum="0"
                        }else if(relationNum=="采购决策人"){
                            relationNum="1"
                        }else if(relationNum=="项目决策人"){
                            relationNum="2"
                        }else if(relationNum=="人事决策人"){
                            relationNum="3"
                        }
                        let myArray=this.$refs[formName].$options.propsData.model.options;
                        let name;
                        myArray.forEach((item)=>{
                            if(item.customerId==this.$refs[formName].$options.propsData.model.customerId){
                                name=item.customerName;
                            }
                        })
                        console.log('客户名称',name);
                        
                        this.addData( {
                            'sid':this.$refs[formName].$options.propsData.model.sid, 
                            'customerId':this.$route.query.customerId,
                            'opportunityId':'', 
                            'name':this.$refs[formName].$options.propsData.model.fullName, 
                            'phoneNumber':this.$refs[formName].$options.propsData.model.phone, 
                            'title':this.$refs[formName].$options.propsData.model.job, 
                            'gendar':sex, 
                            'email':this.$refs[formName].$options.propsData.model.mail, 
                            'comment':this.$refs[formName].$options.propsData.model.des, 
                            'decisionRole':relationNum
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
        data(){
            return {
                
                editData:[],
                categoryList:'',
                form:{
                    cusName:'',
                    sid:'',
                    name:'',
                    fullName:'',
                    sex:'',
                    phone:'',
                    job:'',
                    relation:'',
                    mail:'',
                    des:'',
                    options:[],
                    customerId:'',
                    customerName:''
                },
                rules:{
                    cusName:[
                        { required: true, message: '请输入客户名称', trigger: 'change' },
                        // { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' }
                    ],
                    fullName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max:100, message: '长度在 1 到 100 个字符', trigger: 'change' },
                    ],
                    // sex: [
                    //     { required: true, message: '请输入姓名', trigger: 'change' },
                    //     { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' },
                    // ],
                    phone: [
                        { required: true, message: '请输入手机号码', trigger: 'change'},
                        {validator:function(rule,value,callback){
                            if(/(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                        }, trigger: 'blur'}
                    ],
                    job:[
                        { required: false, message: '请输入职务名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
                    ],
                    relation: [
                        { required: true, message: '请输入决策关系', trigger: 'change' },
                        // { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
                    ],
                    mail:[
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
                        { min: 1, max: 100, message: '邮箱长度不能大于100字符', trigger: 'change' },
                    ],
                    des:[
                        { required: false, message: '请输入备注', trigger: 'blur' },
                        { min: 1, max: 2500, message: '长度在 1 到 2500 个字符', trigger: 'change' },
                    ],
                },
            }
        },
        watch:{
           
        },
        mounted (){
    // console.log('11111111111111',JSON.stringify(this.editLi));
        },
        created (){
            this.initAjaxData();    
        },
        ready (){
             
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .el-scrollbar{
        .el-select-dropdown__item{width:622px;}
    }
    .operate_buttons {
        float: right;
        line-height: 50px;
    }
</style>

<style rel="stylesheet/scss" lang="scss">
.cusSelect{width: 623.5px;}

</style>

