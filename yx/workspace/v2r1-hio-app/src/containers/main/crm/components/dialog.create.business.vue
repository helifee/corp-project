<template>
    <div>
        <right-slide-modal
            :title="businessDetail.actType == 'modify' ? '编辑商机':'创建商机'"
            :visible.sync="propsDialogVisible"
            :showClose="false"
            @open="openDialog"
            >
        <div slot="operateButtons" class="operate_buttons">
            <ul>
                <li>
                    <el-button @click="saveFormBefore()" size="medium " :disabled ='!isAttachUploadFinished' >保存</el-button>
                </li>
                <li>
                    <el-button @click="operateClose()" size="medium ">关闭</el-button>
                </li>
            </ul>
        </div>
        <div class="form_create_crm">
            <el-form :inline="true" ref="form" :model="form" :rules="rules" class="demo-form-inline"  label-width="120px">
                <el-form-item label="商机名称:"  prop="name" >
                    <el-input v-model="form.name" placeholder="商机名称" :maxlength="101"></el-input>
                </el-form-item>
                <el-form-item label="客户名称:"  prop="customer">
                        <el-select v-model="form.customer"  value-key="customerId" 
                        :disabled="isSelectCustomer"
                           @change="changeSelectCustomer"
                           
                            placeholder="请选择客户"
                              >
                            <el-option :key="index" v-for="(item,index) in keyCustomerArr" :label="item.customerName" :value="item">
                            </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系人:"  prop="contactId">
                    <el-select v-model="form.contactId" placeholder="请选择联系人" @focus='focusSelectCustomerFn' value-key="sid">
                        <el-option :key="index" v-for="(item,index) in contacts" :label="item.name" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机号码:"   prop="phone" >
                    <el-input v-model="form.phone" placeholder="联系电话" disabled></el-input>
                </el-form-item>
                <el-form-item label="预计成交额:" prop="estimateAmount">
                    <!-- <el-input v-model="form.estimateAmount" type="Number" placeholder="预计成交额" :maxlength="19"></el-input> -->
                    <numberInput v-model="form.estimateAmount" placeholder="预计成交额" type="blend" ></numberInput>

                </el-form-item>
                <el-form-item label="预计成交日期:" prop="estimateDealTime">
                    <!-- <el-input v-model="form.estimateDealTime" placeholder="预计成交时间"></el-input> -->
                    <el-date-picker
                        v-if="datePickerShow"
                        v-model="form.estimateDealTime"
                        type="date"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        placeholder="选择日期">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="负责人:" prop="personInCharge">
                    <!-- <el-input v-model="form.personInCharge" placeholder="负责人"></el-input> -->
                    <el-tag>
                        {{form.personInCharge.name}}
                    </el-tag>
                    <!-- <span class="el-icon-circle-plus add_approver" @click="showUserTreeDailog()">添加用户</span> -->

                </el-form-item>

                <el-form-item label="商机阶段"  prop="stage">
                    <el-select v-model="form.stage" placeholder="商机阶段">
                        <el-option
                            v-for="item in l('{crmLocale.staticvariable.businessstage}')"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            </el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="附件"  prop="attachmentParam" class="loadCrmCreate">
                    <attach-upload
                            v-model="form.attachmentParam"
                            ref="attachUpload"
                            :required="true"
                            :multiple="true"
                            :appId="form.attachmentParam.app"
                            :businessId="form.attachmentParam.businessId"
                            :categoryId="form.attachmentParam.category"
                            @fileQueued="handleAttachQueued"
                            @uploadError="handleAttachError"
                            @uploadFinished="handleAttachUploadSuccess">
                    </attach-upload>
                </el-form-item>
              
                <hr style="float:none;width:100%">
                <el-form-item class="information" prop="des" style="float:none; width:100%"  >
                    <selectProducts  
 
                     :goodsList="form.des" 
                     @totalProducts="totalProducts"
                     ref="vg" @showGoodsModal="showGoodsModal"></selectProducts>
                </el-form-item>
            </el-form>
        </div>

    </right-slide-modal>
    </div>
    
    
</template>

<script>
    import selectProducts from "@Main/crm/components/selectProducts.vue"
    // import dialogChooseGoods from '@Main/crm/components/dialog.chooseGoods.vue'
    import cService from '@Main/crm/crm_service.js'
    JZY.locale.add("crmLocale", require("@Main/crm/crm.locale"))
    import numberInput from '@Main/crm/components/number.vue'

    export default{
        components:{
            // dialogChooseGoods,
            selectProducts,
            numberInput
        },
        props:{
            dialogVisible:{
                type:Boolean,
                required:true
            },
            recordId:{
                required:false
            },
            showGoodsDialogVisible:{
                type:Boolean
            },
            businessDetail:{
                type:Object
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
            focusSelectCustomerFn(){
                 this.$refs.form.validateField('customer');
            },
            //选择客户（todo）
            async changeSelectCustomer(item){
                
                if(item.customerId){
                    let param = {
                        customerId : item.customerId
                    }
                    this.form.phone = "";
                    // this.contacts = [];
                    let contactsList = await cService.getContactsList(param);
                    this.contacts = contactsList[0];
                }
                
            },
            totalProducts(value){
                if(this.initState){
                    this.initState = false;
                }else{
                    this.form.estimateAmount = value.toString();
                }
                
            },

            handleChange(file, fileList) {
                // form.attachmentArr = fileList.slice(-3);
            },
            initCustomerArr(){
                cService.getCustomerList('').then( (data)=>{
                        
                        this.keyCustomerArr = data[0];
                    });
            },
            // remoteMethod(query){
            //     if (query !== '') {
            //         this.loading = true;
                    
            //         cService.getCustomerList(query).then( (data)=>{
            //             this.loading = false;
            //             this.keyCustomerArr = data[0];
            //         })
            //     }else{
            //         this.keyCustomerArr = [];
            //     }
            // },
            filterProducts(arr){
                if(arr && arr.length){
                    arr.forEach( (row,index) =>{
                        row.categoryname = 
                                    row.categoryBaseName +  (row.categoryName ? ("_" + row.categoryName) : "");
                    })
                }
            },
            //初始化窗口数据
            async openDialog(){
                
                this.goodsList = this.form.des;
                //获取联系人列表
                // let contactsList = await cService.getContactsList();
                // this.contacts = contactsList[0];
                
                this.contacts = [];
                this.keyCustomerArr = [];
                this.initCustomerArr();
                //修改商机获取当前商机
                //当前商机的产品
                if(this.businessDetail.actType == "modify"){
                    this.busUUid = this.businessDetail.opportunityId;
                    let resultBusiness = await cService.getOpportunities(this.busUUid);
                        let d = resultBusiness[0];
                        jQuery.extend(this.form,d);
                        //客户名称
                        let cusObj = 
                            {
                            customerName: d.customerName,
                            customerId:d.customerId
                            }
                        
                        // this.form["phone"] = d.phoneNumber;
                        
                        await this.changeSelectCustomer(cusObj);
                        this.form["customer"] = cusObj;
                        
                        //负责人
                        this.form.personInCharge = {
                            name:d.personInChargeName,
                            sid:d.personInCharge
                        };
                        
                        this.form.stage = String(d.stage);
                        this.form.contactId = {};
                        //联系人
                        this.contacts.forEach(element =>{
                            if(element.sid == d.contactId){
                                this.form.contactId = {
                                    sid:d.contactId,
                                    name:d.contactName
                                }
                                this.form.phone = d.phoneNumber
                            }
                        })
                        this.form.estimateAmount = d.estimateAmount.toString();
                        //产品列表
                        this.form.des = d.opportunityProducts;
                        this.filterProducts(this.form.des);
                        this.goodsList = this.form.des;
                        this.form.attachmentParam = d.attachmentParam;
                        this.datePickerShow=false;
                        this.form.estimateDealTime = d.estimateDealTime;
                        this.$nextTick(()=>{
                            this.datePickerShow=true;
                        })
                   
                }else{
                    //新增商机
                    // 在客户下新增商机
                    if(this.businessDetail.customer){
                        let cusObj = 
                            {
                            customerName: this.businessDetail.customer.name,
                            customerId:this.businessDetail.customer.sid
                            }
                        this.keyCustomerArr = [cusObj];
                        //获取当前客户下的联系人;
                        this.form["customer"] = cusObj;
                        
                        this.changeSelectCustomer(cusObj);
                        
                    }
                    //获取id
                    this.getUuid();
                }
                this.isSelectCustomer = 
                        this.form.customer.customerId ? true : false;
                
            },
            getUuid (){
                //获取业务id （新增） 修改不需要
                cService.getUuid().then( (data) =>{
                        this.busUUid = data[0].businessId;
                        this.form.attachmentParam.appId = data[0].app;
                        this.form.attachmentParam.businessId = data[0].businessId;
                        this.form.attachmentParam.categoryId = data[0].category;
                    })
            },
            // 关闭
            operateClose(){
                this.$emit("closeCreateModal");
            },
            
            async saveForm(){
                this.$refs["form"].validate((valid) => {
                    if(valid){
                        let param = {};
                        param = {
                            sid : this.busUUid,
                            name:this.form.name,
                            customerId:this.form.customer.customerId,
                            estimateAmount:String(this.form.estimateAmount),
                            estimateDealTime:this.form.estimateDealTime,
                            personInCharge:this.form.personInCharge.sid,
                            // personInCharge:this.form.personInCharge[0].sid || "988777",
                            stage:this.form.stage,
                            contactId:this.form.contactId.sid,
                            attachmentParam:this.form.attachmentParam,
                            opportunityProducts:this.form.des
                        }
                        let params = { data : JSON.stringify(param),context:this };

                        let saveSign =  cService.saveOpportunities(params).then((data) =>{
                            if(data.status == "200"){
                                this.$refs['attachUpload'].saveFiles && this.$refs['attachUpload'].saveFiles();
                                this.$message(data.message);
                                this.operateClose();
                                this.$emit("reloadList");
                            }
                        });
                        
                    }
                })
                
            },
            async saveFormBefore(){
                //保存前验证产品
                let productsList = this.form.des;
                if(productsList &&　productsList.length){
                    let isNewProduct = await cService.getProductValProductInfo(productsList);
                    
                    if(isNewProduct.result == false){ //产品信息有变更
                        if(isNewProduct.status == 102){
                            let msg =  isNewProduct.message + ",继续保持现有产品进行商机创建?";
                            this.$confirm(msg, '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.saveForm();
                            }).catch(() => {
                                this.$message({
                                type: 'info',
                                message: '已取消'
                                });          
                            }); 
                        }else{
                            this.$message({
                                type: 'error',
                                message: isNewProduct.message
                                }); 
                            }
                        
                        
                    }else{
                        this.saveForm();
                    }
                    return;
                }
                
                this.saveForm();
            },
           
             //打开选择产品列表
            showGoodsModal(){
                this.$emit("showGoodsModal");
            },
            delInformation (index, row){
                this.form.des.splice(index, 1)
            },
            handleAttachQueued(){
                
            },
            //文件上传-成功
            handleAttachUploadSuccess(res){
                
            },
            //文件上传-出错
            handleAttachError(){
                alert('附件上传出错啦')
            },
            
           
        },
        data(){
            let my = this;
            let createProductorValidator = (rule, value, callback) =>{
                if(!my.form.des.length){
                    callback(new Error("请选择产品!!!!!"));
                }else{
                    callback();
                }
            }            
            let customervalidator = (rule, value, callback) =>{
                if(!this.form.customer.customerId && !(this.form.contactId && this.form.contactId.sid)){
                    // if(!(this.form.contactId && this.form.contactId.sid)){
                    //     this.$message({
                    //         message:'请先选择客户',
                    //         type:'warning'
                    //     })
                    // }
                    callback(new Error("请选择客户"));
                }
                // else if(!this.form.customer.customerId){
                //     callback(new Error("请选择客户"));
                // }
                else{
                    if(this.form.name){
                        this.$refs.form.validateField('name');
                    }
                    callback();
                }
            }
            //上传附件个数//待定
            let attachmentParamValidator = (rule, value, callback) => {
                let $currentUpload = this.$refs['attachUpload'];
                let uploadFilesList = $currentUpload.uploadFilesList;
                if(uploadFilesList.length > 10){
                    callback(new Error("文件最多上传十个"));
                }else{
                    callback();
                }
            }
            //小数点两位验证
            let numberValidator = (rule, value, callback) => {
                if(value){
                    let reg = /(^[1-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{0,2})?$)/;
                    if(reg.test(value)){
                        callback();
                    }else{
                        callback(new Error("请输入13位整数或带两位小数的16位数字"))
                    }
                }else{
                    callback();
                }
            }
            let contackValidator = (rule, value, callback) =>{
                // if(!(this.form.customer && this.form.customer.customerId)){
                //         callback(new Error("请先选择客户后再选择联系人"));
                //     }
                if(!(value && value.sid)){  //没有选择联系人
                    // callback(new Error("请选择联系人"));
                    let isHave ;
                    // if(!(this.form.customer && this.form.customer.customerId)){
                    //     isHave = true;
                    //     // callback(new Error("请先选择客户"));
                    //     this.$message({
                    //         message:'请先选择客户',
                    //         type:'warning'
                    //     })
                    // }
                    callback(new Error("请选择联系人"));
                    
                    
                }else{
                    if(!(this.form.customer && this.form.customer.customerId)){
                        callback(new Error("请选择联系人"));
                    }else{
                        callback();
                    }
                    
                }
            }
            
            let valNamevalite  = (rule, value, callback) =>{
                if(value && this.form.customer.customerId){
                    let param = {
                        sid : this.busUUid,
                        customerId : this.form.customer.customerId,
                        name : value,
                    }
                    param = JSON.stringify(param);
                    cService.valNamevalite(param).then( (data)=>{
                        if(data.status == 200 && data.result == true){
                            return callback();
                        }else{
                            return callback(new Error(data.message))
                        }
                    })
                } 
                
            }

            return {
                datePickerShow:true,
                sumTotal:0,
                isSelectCustomer:false,
                userInfo:JZY.store.state.session,
                attach:{},
                isAttachUploadFinished:true,
                goodsList:[],
                showUserTree:false,//用户树组件弹出窗开关
                userTreeData :[],//用户树组件，传入已选择用户
                userTreeEnableCheckedMultipleUser:false,
                userTreeShowInsideOutsideTabs:true,
                loading:false,
                keyCustomerArr:[],
                chooseList:[],
                contacts:[],
                form:{
                    name:'',
                    customer:{
                        customerName:'',
                        customerId:''
                    },
                    contactId:{
                        name:""
                    },
                    stage:"0",
                    phone:'',
                    attachmentParam:{},
                    estimateAmount:'',
                    estimateDealTime:'',
                    personInCharge:{
                        name:JZY.store.state.session.tenantInfo ? JZY.store.state.session.tenantInfo.userName : "",
                        sid:JZY.store.state.session.sid ? JZY.store.state.session.sid : ''
                    },
                    des:[],
                },
                rules:{
                    name:[
                        { required: true, message: '请输入商机名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '请输入100个字符以内的商机名称', trigger: ['blur','change'] },
                        { validator:valNamevalite,trigger:['change','blur']}
                    ],
                    customer: [
                        { required: true, message: '请输入客户名称', trigger: 'change' },
                        { validator:customervalidator, trigger: ['blur','change'] }
                    ],
                    contactId: [
                        { required: true, message: '请选择联系人', trigger: 'change' },
                        { validator:contackValidator,trigger:['blur']}
                    ],
                    // phone: [
                    //     { required: true, message: '请输入手机号', trigger: 'blur' },
                    //     // { message: '请输入正确的手机号', trigger: 'blur' }
                    // ],
                    estimateAmount:[
                        { required: true, message: '请输入成交金额', trigger: 'blur' },
                        // { type: 'number', message: '请输入数字', trigger: 'blur' },
                        { validator:numberValidator,trigger:['blur','change'] }
                    ],
                    estimateDealTime:[
                        { required: true, message: '请输入成交时间', trigger: 'blur' },
                    ],
                    // personInCharge:[
                    //     // { required: true, message: '请输入负责人', trigger: 'blur' },
                    //     // { validator:personInCharge, trigger: 'blur' }
                    // ],
                    stage:[
                        { required: true, message: '请选择商机阶段', trigger: 'change' }
                    ],
                    des:[
                        // { required: true, message: '请选择产品', trigger: 'blur' },
                        {validator:createProductorValidator,trigger:'blur'}
                    ],
                    attachmentParam:[
                        {validator:attachmentParamValidator,trigger:'change'}
                    ]
                },
            }
        },
        watch : {
            "form.contactId" : function(nVal,oVal){
                //获取联系人电话
                if(nVal && nVal.phoneNumber){
                    this.form.phone = nVal.phoneNumber;
                }
            },
            showGoodsDialogVisible(nVal,oVal){  //监听选择物品窗口
                if(!nVal){
                     //获取当前选中返回的
                    let row = cService.getGoodsList();
                    //获取已经选择的
                    let old = this.$refs["vg"].goodsList;
                    let newArr = old.concat(row);
                    let result = {};
                    if(newArr && newArr.length){
                        newArr.forEach((element,index) => {
                            element.index = index;
                            if(result[element['productId']]){
                                element.index = result[element['productId']].index;
                                jQuery.extend(result[element['productId']],element)
                            }else{
                                result[element['productId']] = element;
                            }
                        }); 
                    }
                    newArr = [];
                    for(let key in result){
                        if(key ){
                            newArr.push( result[key] );
                        }
                    }
                    newArr.sort((a,b)=>{
                        if(a.index > b.index){
                            return 1
                        }else{
                            return -1
                        }
                    })
                    this.form.des = newArr;
                } 
            }         
        },
        async mounted (){
            this.initState = true;
            this.openDialog();
            
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import '../crmcss/css.scss'
</style>
