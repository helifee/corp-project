<template>
<div class="crm_add_contacts">
    <right-slide-modal
            title="创建联系人"
            :visible.sync="propsDialogVisible"
            :showClose="false">
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li>
                    <el-button @click="operateSave('form')">保存</el-button></li>
                <li><el-button @click="operateClose()">关闭</el-button></li>
            </ul>
        </div>
        <div class="detail-content">
            <el-form ref="form" :sid="form.sid"  :model="form" :rules="rules" label-width="120px">
                <el-form-item label="客户名称：" prop="customerId">
                    <el-select v-model="form.customerId" class="cusSelect"  @change="select(form.customerId)" placeholder="请选择客户">
                        <el-option
                        v-for="item in form.options"
                        :key="item.customerId"
                        :label="item.customerName"
                        :title="item.customerName"
                        :value="item.customerId">
                        </el-option>
                    </el-select>
                    <!-- <el-input v-model="form.name"></el-input> -->
                </el-form-item>
                <el-form-item label="姓名：" prop="fullName">
                    <el-input v-model="form.fullName" :maxlength="101"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
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
                    <el-input v-model="form.des" :maxlength="2500" :rows="5" v-textarea-limiter type="textarea"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </right-slide-modal>
</div>
</template>

<script>
    import {postOfficeHouseSelectTree,postOfficeHouseSave} from '@Main/officeSupplies/getData.js'
    import {add,initAjax,modify} from '@Main/crm/getData'
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
            //获取我关注的任务列表
            async addData( {sid = '' ,customerId = '' ,opportunityId = '' ,name = '' ,phoneNumber='' ,title = '',gendar='',email='',comment='',decisionRole='' } = {} ){
                let res = await add(sid,customerId,opportunityId,name,phoneNumber,title,gendar,email,comment,decisionRole)
                console.info(res[0])
                this.$emit("closeCreateModal");
                this.$emit('contactListData');
            },
            // // 修改初始化
            //  async modifyData(sid){
            //     let res = await modify(sid)
            //     console.info(res[0])
            // },
            select(index){
                this.form.customerId=index;
                console.log(this.form.customerId)
            },
//            关闭
            operateClose(formName){
//
                this.$emit("closeCreateModal");
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
                        if(sex=="请选择性别"){
                            sex="-1";
                        }
                        
                        let relation=this.$refs[formName].$options.propsData.model.relation;
                        if(relation=="普通员工"){
                            relation="0";
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
                            'customerId':this.$refs[formName].$options.propsData.model.customerId, 
                            'opportunityId':'', 
                            'name':this.$refs[formName].$options.propsData.model.fullName, 
                            'phoneNumber':this.$refs[formName].$options.propsData.model.phone, 
                            'title':this.$refs[formName].$options.propsData.model.job, 
                            'gendar':sex, 
                            'email':this.$refs[formName].$options.propsData.model.mail, 
                            'comment':this.$refs[formName].$options.propsData.model.des, 
                            'decisionRole':relation 
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
                categoryList:'',
                form:{
                    sid:'',
                    name:'',
                    fullName:'',
                    sex:'-1',
                    phone:'',
                    job:'',
                    relation:'0',
                    mail:'',
                    des:'',
                    options:[],
                    customerId:''
                },
                rules:{
                    customerId:[
                        { required: true, message: '请输入客户', trigger: 'change'},
                        // { min: 1, max: 10, message: '长度在 1 到 100 个字符', trigger: 'change' },
                    ],
                    fullName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'change' },
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
                        // { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
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
    
        },
        created (){
            this.initAjaxData();    
        },
        ready (){
            
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
.cusSelect{width: 623.5px;}

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .el-scrollbar{
        .el-select-dropdown__item{width:622px;}
    }
    .operate_buttons {
        float: right;
    }
    // .el-select{
    //     .el-input__inner{
    //         width: 847.5px;
    //     }
    // }
</style>

