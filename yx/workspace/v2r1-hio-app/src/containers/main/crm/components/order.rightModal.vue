<template>
  <div class="order right_modal">
    <right-slide-modal :title="orderDetail.actType == 'modify'?'编辑订单':'创建订单'" :showClose="false" @open="openDialog" :visible.sync="propsData" class="order_right_model">
      <div slot="operateButtons" class="operate_buttons">
        <ul>
          <li v-for="(item,index) in pageButtons" :key="index">
            <el-button @click="operateFun(index)">{{item}}</el-button>
          </li>
        </ul>
      </div>
       <div class="order_wrap order_create form_create_crm">
        <el-row :gutter="0">
            <el-col :span="24">
                <el-form :inline="true" ref="orderForm" :model="orderForm" name="orderForm" :rules="orderRules" label-position="right" label-width="120px" class="detail_form">
                    <el-form-item label="订单名称：" prop="name">
                    <el-input v-model="orderForm.name" placeholder="请输入订单名称" :maxlength="101"></el-input>
                    </el-form-item>
                    <el-form-item label="订单编号：" prop="code">
                    <el-input v-model="orderForm.code" placeholder="请输入订单编号" :maxlength="101"></el-input>
                    </el-form-item>
                    <el-form-item label="客户名称：" prop="customer">
                    <el-select
                        v-model="orderForm.customer" value-key="customerId"
                        placeholder="请选择客户"
                        :disabled="isSelectCustomer"
                        @change="changeCustomer"
                        >
                        <el-option
                                :key="index" 
                                v-for="(item,index) in keyCustomerArr"
                                :label="item.customerName"
                                :value="item">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="销售商机：">
                    <el-select v-model="orderForm.opportunity" 
                     @focus='focusSelectCustomerFn'
                    placeholder="请选择销售商机" 
                    :disabled="isOpportunities"
                    value-key="sid"
                    @change="changeOpportunity"
                    >
                        <el-option
                                :key="index" 
                                v-for="(item,index) in businessArr"
                                :label="item.name"
                                :value="item">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item  prop="contractAmount">
                        <span slot="label">
                            产品总额： 
                            <el-tooltip content="根据产品总价计算，无需手工填写" placement="top">
                                <i class="el-icon-info"></i>
                            </el-tooltip>
                        </span>
                        <el-input v-model.number="orderForm.contractAmount" readonly="" placeholder="请输入产品总额">
                            <template slot="prepend">￥</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="折 扣：" prop="discount">
                        <numberInput v-model="orderForm.discount" placeholder="请输入折扣" type="hundred" mysolt="append-%"  >
                        </numberInput>
                        <!-- <el-input v-model="orderForm.discount" type="Number" maxlength="3" placeholder="请输入折扣">
                            <template slot="append">%</template>
                        </el-input> -->
                    </el-form-item>
                    <el-form-item label="签约金额：" prop="signAmount">
                        <span slot="label">
                            签约金额：
                            <el-tooltip content="系统默认签约金额为产品总额*折扣，您也可以根据订单实际情况进行修改" placement="top">
                                <i class="el-icon-info"></i>
                            </el-tooltip>
                        </span>
                        <!-- orderForm.contractAmount = ( Number(orderForm.signAmount)*( (Number(orderForm.discount || orderForm.discount === 0) ? Number(orderForm.discount) : 100)/100  )).toFixed(2) -->
                        <!-- <el-input v-model="orderForm.contractAmount" :maxlength="19" 
                        :value="contractAmountFn()" placeholder="请输入签约金额">
                            <template slot="prepend">￥</template>
                        </el-input> -->
                        <!-- <numberInput v-model="orderForm.contractAmount" 
                        :value="contractAmountFn()" 
                         mysolt="prepend-￥"   
                         placeholder="请输入签约金额" type="blend" > -->
                         <numberInput v-model="orderForm.signAmount"  
                         mysolt="prepend-￥"   
                         placeholder="请输入签约金额" type="blend" >
                            <!-- <template slot="prepend">￥</template> -->
                        </numberInput>
                    </el-form-item>
                    <el-form-item label="签约日期：" prop="dealDate" >
                        <el-date-picker
                            v-model="orderForm.dealDate"
                            type="date" value-format="yyyy-MM-dd hh:mm:ss"
                            v-if="datePickerShow"
                            placeholder="请选择签约日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="开始日期：" prop="contractStartDate">
                        <el-date-picker
                            v-model="orderForm.contractStartDate"
                            type="date" value-format="yyyy-MM-dd hh:mm:ss"
                            v-if="datePickerShow"
                            placeholder="请选择开始日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期：" prop="contractEndDate">
                    <el-date-picker
                        v-model="orderForm.contractEndDate"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        v-if="datePickerShow"
                        type="date"
                        placeholder="请选择结束日期">
                    </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item label="合同负责人：">
                    <el-input v-model="orderForm.contractPrincipal" placeholder="请输入合同负责人"></el-input>
                    </el-form-item> -->
                    <el-form-item label="我方负责人：" prop="personChargeOur" >
                        <!-- <el-tag
                            v-for="(item,index) in orderForm.personChargeOur"
                            :key="index"
                            closable
                            :disable-transitions="false"
                            @close="deleteUser($event,index,orderForm.personChargeOur)">
                            {{item.name}}
                        </el-tag>
                        <span class="el-icon-circle-plus add_approver" @click="showUserTreeDailog()">添加用户</span> -->
                        <blend-tree
                            ref= "userCcTree"
                            :tagButtons="['user']" 
                            activeTab = "user"
                            :enable-checked-multiple = "false" 
                            :selectedDataToTree = "selectedDataToTree"
                            @getDataFromTree = "getDataFromTreeForUserCc">
                            <!--添加按钮图标的插槽-->
                            <div slot="add_button">
                                <i class="el-icon-circle-plus" @click.stop = "$refs.userCcTree.blendTreeDialogShow()"></i>
                            </div>
                        </blend-tree>
                    </el-form-item>
                    <el-form-item label="客户签约人：" label-width="110px" prop="personOther">
                    <el-select v-model="orderForm.personOther"
                     @focus='focusSelectCustomerFn'
                     placeholder="请输入客户签约人" value-key="sid">
                        <el-option
                                :key="index" 
                                v-for="(item,index) in personOtherArr"
                                :label="item.name"
                                :value="item">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="付款方式：">
                    <!-- <el-select v-model="orderForm.paymentChannel" placeholder="请选择付款方式">
                        <el-option label="现金" value="现金"></el-option>
                        <el-option label="支票" value="支票"></el-option>
                    </el-select> -->
                        <el-select v-model="orderForm.paymentChannel" placeholder="请选择付款方式">
                            <el-option
                            v-for="item in l('{crmLocale.staticvariable.orderplaytype}')"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合同类型：">
                        <el-select v-model="orderForm.contractType" placeholder="请选择合同类型">
                            <el-option
                            v-for="item in l('{crmLocale.staticvariable.ordercontracttype}')"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合 同："  prop="contractParam" class="attachItem">
                        <attach-upload
                                v-model="orderForm.contractParam"
                                ref="contractUpload"
                                :required="true"
                                :appId="orderForm.contractParam.app"
                                :businessId="orderForm.contractParam.businessId"
                                :categoryId="orderForm.contractParam.category"
                                @fileQueued="handleAttachQueued"
                                @uploadError="handleAttachError"
                                :multiple="false"
                                @uploadFinished="handleAttachUploadSuccess">
                        </attach-upload>
                    </el-form-item>
                    <el-form-item class="row commonTextarea" label="备 注：" prop="comment" >
                        <el-input v-model="orderForm.comment" v-textarea-limiter type="textarea" rows="5" :maxlength="2500" ></el-input>
                    </el-form-item>
                    <!-- <el-form-item class="row file_upload" label="附 件："> -->
                    <!-- <pl-upload :filesList="orderForm.attachment"></pl-upload> -->
                    <!-- </el-form-item> -->
                    <el-form-item label="附件："  prop="attachmentParam" class="attachItem">
                        <attach-upload
                                v-model="orderForm.attachmentParam"
                                ref="attachUpload"
                                :required="true"
                                :multiple="false"
                                :appId="orderForm.attachmentParam.app"
                                :businessId="orderForm.attachmentParam.businessId"
                                :categoryId="orderForm.attachmentParam.category"
                                @fileQueued="handleAttachQueued"
                                @uploadError="handleAttachError"
                                @uploadFinished="handleAttachUploadSuccess">
                        </attach-upload>
                    </el-form-item>
                    <div style="float:left;width:100%;">
                        <div class="line"></div>
                    </div>
                    <el-form-item class="information" style="margin-left: 0px; float:none; width:100%" prop="des" >
                        <selectProducts :goodsList="orderForm.des" ref="vg"
                            @totalProducts="totalProducts" 
                         @showGoodsModal="showGoodsModal"></selectProducts>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
       </div>
    </right-slide-modal>
    <user-tree
        :selectUserDialogVisible="showUserTree"
        :enable-checked-multiple="userTreeEnableCheckedMultipleUser"
        :show-inside-outside-tabs="userTreeShowInsideOutsideTabs"
        :selectedUsers = "userTreeData"
        @closeCreateModal ="showUserTree = !showUserTree"
        @getUserTree = "getUserTree">
    </user-tree>
  </div>
</template>
<script>
JZY.locale.add("orderLocale", require("@Main/crm/crm.locale"));


import selectProducts from "@Main/crm/components/selectProducts.vue";
import {getUserCategory} from '@Main/approve/getData'
import cService from '@Main/crm/crm_service.js'
import numberInput from '@Main/crm/components/number.vue'
JZY.locale.add("crmLocale", require("@Main/crm/crm.locale"))

export default {
    components: {
        // orderCreate
        selectProducts,
        numberInput
    },
    data() {
        let my = this;
        let createProductorValidator = (rule, value, callback) =>{
                if(!this.orderForm.des.length){
                    callback(new Error("请选择产品!!!!!"));
                }else{
                    callback();
                }
                // callback();
            } 
        let validatorpersonOther = (rule, value, callback) =>{
                if(!(value && value.sid)){
                    callback(new Error("选择客户签约人"));
                }else{
                    callback();
                }
            } 
            
        let validatorCustomer = (rule, value, callback) =>{
                if(!(value && value.customerId)){
                    callback(new Error("选择客户"));
                }else{
                    callback();
                }
            }    
        let personChargeOurValidator = (rule, value, callback) =>{
                if(my.orderForm.personChargeOur && my.orderForm.personChargeOur.length){
                    callback();
                }else{
                    callback(new Error("请选择负责人"));
                }
            }  
        //小数点两位验证
        let numberValidator = (rule, value, callback) => {
            if(value){
                let reg = /(^[1-9]([0-9]{0,12})$)|(^[0-9]([0-9]{0,12})(\.[0-9]{1,2})?$)/;
                if(reg.test(value)){
                    callback();
                }else{
                    callback(new Error("值为13位整数或带两位小数的15位数字"))
                }
            }else{
                callback();
            }
        }    
        let numberTwoValidator = (rule, value, callback) => {
            if(value){
                let reg =  /^(?:0|[1-9][0-9]?|100)$/;
                if(reg.test(value)){
                    callback();
                }else{
                    callback(new Error("请输入0至100的整数"))
                }
            }else{
                callback();
            }
        }
        //todo
        //开始时间
        let contractStartDateFn = (rule, value, callback) => {
            if(value){
                let mydata = my.orderForm.contractEndDate;
                if(mydata && moment(value)>moment(mydata)){
                // if(mydata && (new Date(value).getTime() > new Date(mydata).getTime())){
                      callback(new Error("开始时间不能大于结束时间"));
                }else{
                    // my.$refs.orderForm.validateField('contractEndDate');
                    callback();
                }
            }else{
                callback();
            }
        }
        let contractEndDateFn = (rule, value, callback) => {
            if(value){
                let mydata = my.orderForm.contractStartDate;
                if(mydata && moment(value) < moment(mydata)){
                // if(mydata && (new Date(value).getTime() < new Date(mydata).getTime())){
                    callback(new Error("结束时间不能小于开始时间"));
                }else{
                    // my.$refs.orderForm.validateField('contractStartDate');
                    callback();
                }
            }else{
                callback();
            }
        }
        let ourArr = [
                    {
                        name:JZY.store.state.session.tenantInfo ? JZY.store.state.session.tenantInfo.userName : "",
                        sid:JZY.store.state.session.sid ? JZY.store.state.session.sid : ""
                    }
                ]
        return {
            datePickerShow:true,
            selectedDataToTree:{
                userList:ourArr
            },
            isSelectCustomer:false,
            isOpportunities:false,
            selectPageParam:{},
            businessArr:[
                {
                    sid: '',
                    name: '请选择商机'
                }
            ],
            personOtherArr:[],
            orderUUid:"",
            goodsList:[],
            showUserTree:false,//用户树组件弹出窗开关
            userTreeData :[],//用户树组件，传入已选择用户
            userTreeEnableCheckedMultipleUser:false,
            userTreeShowInsideOutsideTabs:false,
            loading:false,
            pageTitle: l("{orderLocale.order.createOrder.title}"),//页头标题
            pageButtons: l("{orderLocale.order.createOrder.buttons}"),//页头右侧的按钮数组
            tableData:[],
            keyCustomerArr:[],
            orderForm: {
                customer:{  //客户
                //   customerId: '',
                //   customerName: ''
                },
                opportunity:{  //商机
                //   opportunityId:"",
                //   opportunityName:""
                },
                code:'',  //订单编号
                name:'',
                type:'',
                discount:"",
                signAmount:"",  //产品总额
                contractAmount:"", //签约金额
                dealDate:'',
                contractStartDate:'',
                contractEndDate:'',
                comment:'',
                personOther:{  //客户签约人
                //   personChargeOther:"",  //id
                //   personOtherName:""     //name
                },
                
                
                personChargeOur:ourArr,
                contractParam:{},
                attachmentParam:{},
                // contract:"",  //合同
                contractType:"", //合同类型
                paymentChannel:"",
                // attachment:"" ,//附件
                orderStatus:"",//订单状态
                des:[] //订单产品
            },
            orderRules:{
                name: [
                  { required: true, message: '请输入订单名称', trigger: 'blur' },
                  { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: ['blur','change'] }
                ],
                code: [
                  
                  { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: ['blur','change']  },
                //   { pattern:/^[A-Za-z0-9]+$/, message: '只能输入数字或英文', trigger: 'blur' },
                ],
                customer: [
                  { required: true, message: '请输入客户名称', trigger: 'change' },
                  { validator:validatorCustomer, trigger: 'blur' }
                ],
                // opportunity:[
                //   { required: true, message: '请选择商机', trigger: 'change' },
                // ],
                discount:[
                //    { type:'number', message: '请输入数字', trigger: 'blur' },
                   { validator:numberTwoValidator, trigger: ['blur','change'] },

                ],
                contractAmount:[
                  { required: true, message: '请输入产品总额', trigger: 'blur' },
                   { validator:numberValidator, trigger: ['blur','change'] },
                ],
                signAmount:[
                  { required: true, message: '请输入签约金额', trigger: ['blur'] },
                   {validator:numberValidator,trigger: ['blur','change']}
                ],
                dealDate:[
                  { required: true, message: '请选择日期', trigger: 'blur' }
                ],
                contractStartDate:[
                  {validator:contractStartDateFn,trigger: ['blur','change']}
                ],
                contractEndDate:[
                  {validator:contractEndDateFn,trigger: ['blur','change']}
                ],
                personOther:[
                  { required: true, message: '请填写客户签约人', trigger: 'blur' },
                  { validator:validatorpersonOther, trigger: ['blur','change'] }
                ],
                personChargeOur:[
                  { required: true, message: '请填写我方负责人', trigger: 'blur' },
                   { validator:personChargeOurValidator, trigger: ['blur','change'] }
                ],
                // contractType:[
                //   { required: true, message: '请选择合同类型', trigger: 'blur' }
                // ],
                // paymentChannel:[
                //   { required: true, message: '请选择付款方式', trigger: 'blur' }
                // ],
                des:[
                  {validator:createProductorValidator,trigger:'change'}
                ],
                // ,
                comment:[
                    {  min: 1, max: 2500,  message: '长度在 1 到 2500 个字符', trigger: ['blur','change']  }
                ]

            }
        }
    },
    filters:{
        filterContractAmount(value){
            
            if(isNaN(value)){
                return 0;
            }else{
                return value.toFixed(2);
            }

        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            required: true
        },
        showGoodsDialogVisible:{
            type: Boolean
        },
        orderDetail:{
                type:Object
            }
    },
    computed: {
        propsData:{//初始化dialog是否显示的变量
            get: function(){
              return this.dialogVisible
            },
            set: function(){
              this.$emit('closeCreateModal',false)
            }
        }
    },
    methods: {
        contractStartDateStartFn(){
            
            this.$refs.orderForm.validateField('contractStartDate');
            this.$refs.orderForm.validateField('contractEndDate');
        },
        focusSelectCustomerFn(){
            this.$refs.orderForm.validateField('customer');
        },
        getDataFromTreeForUserCc(obj){
            this.orderForm.personChargeOur = obj.userList;
            
        },
        contractAmountFn(){
            if(this.initState2){
                this.initState2 = false;
            }else{
                if(this.orderForm.discount || this.orderForm.discount === 0){
                    
                    let tempAmount = (Number(this.orderForm.contractAmount) * Number(this.orderForm.discount)/100).toFixed(2);

                    this.orderForm.signAmount = tempAmount || "";

                }else if(this.orderForm.discount == ""){
                    let tempAmount = this.orderForm.contractAmount;
        // contractAmount
                    this.orderForm.signAmount = tempAmount || "";
                    // this.orderForm.contractAmount = String(this.orderForm.signAmount);
                }
            }
        },
        totalProducts(value){
            if(this.initState1){
                this.initState1 = false;
            }else{
                this.orderForm.signAmount = value;
                // v-model.number="orderForm.contractAmount" :value="orderForm.signAmount*(orderForm.discount ? orderForm.discount/100 :1 )"
                this.orderForm.contractAmount = value;
            }
            
        },
        handleAttachQueued(){
                // alert('add one new attach file')
                // this.isAttachUploadFinished=false
            },
        //文件上传-成功
        handleAttachUploadSuccess(res){
            // let $currentUpload = this.$refs['attachUpload'];
            // console.log($currentUpload);
            // this.isAttachUploadFinished=true
        },
        //文件上传-出错
        handleAttachError(){
            alert('附件上传出错啦')
        },
        //客户名称
        async changeCustomer(item){
            let p = {
                data: JSON.stringify({customerId : item.customerId}),
                context:this
            }
            this.businessArr = [{
                sid: '',
                name: '请选择商机'
            }];
            this.personOtherArr = [];
            this.orderForm.opportunity = {};
            this.orderForm.personOther = {};
            if(item.customerId){
                let perArr = await cService.getjointlevelqueryAll(p)
                    this.personOtherArr = perArr.result;
                
                let busArr = await cService.getjointlevelqueryAll(p,true)
                    
                    this.businessArr = this.businessArr.concat(busArr.result);
                
            }
            this.orderForm.des = [];
            return {
                personArr : this.personOtherArr,
                businessArr : this.businessArr
            }
        },
        async changeOpportunity(item){
            //商机

           this.initState2 = false;
           this.initState1 = false;
            let result = await cService.getOpportunitiesProduct(item.sid);
                if(result && result.status == "200"){
                   
                    this.orderForm.des = result.result;
                    cService.filterProducts(this.orderForm.des);
                        // this.goodsList = this.form.des;
                }
                    
                    
            
        },
        getSelectProduct(){
            let param = {
                pageNum:this.selectPageParam.pageNum,
                pageCount:this.selectPageParam.pageCount,
                pageNum:this.selectPageParam.pageNum
            }
        },
        reset(){
            this.$refs["orderForm"].resetFields();
        },
        //打开窗口初始化数据
        async openDialog(){
            // this.userTreeData = [];

                //获取联系人列表

                this.initCustomerArr();
                
                // this.businessArr = [];
                // this.personOtherArr = [];
                
                 //当前订单
                if(this.orderDetail && this.orderDetail.actType == "modify"){
                    this.orderUUid = this.orderDetail.orderId;
                    let resultOrder = await cService.getOpportunities(this.orderUUid,true);
                        let d = resultOrder[0];
                        jQuery.extend(this.orderForm,d);
                        //客户名称
                        let customerTemp =  {
                            customerName: d.customerName,
                            customerId:d.customerId
                        }
                        this.orderForm["customer"] = customerTemp;
                        let ccustomer = await this.changeCustomer(customerTemp);

                        
                        this.orderForm.opportunity = {
                            sid : d.opportunityId,
                            name : d.opportunityName || '请选择商机'
                        }
                        //我方负责人
                        this.orderForm.personChargeOur = [
                            {
                                sid:d.personChargeOur,
                                name:d.personOurName
                            }
                        ]
                        this.selectedDataToTree.userList = this.orderForm.personChargeOur;
                        //客户签约人
                        // if(d.personChargeOther){
                        //     this.personOtherArr = [{
                        //         sid:d.personChargeOther,
                        //         name:d.personOtherName
                        //     }]
                        // }
                        
                        ccustomer.personArr.forEach(element =>{
                            if(element.sid == d.personChargeOther){
                                this.orderForm.personOther = {
                                    sid:d.personChargeOther,
                                    name:d.personOtherName
                                }
                            }
                        })
                        // this.orderForm.personOther = this.personOtherArr[0];
                        //付款方式
                        this.orderForm.paymentChannel = d.paymentChannel || "";
                        //合同类型
                        this.orderForm.contractType = d.contractType || d.contractType===0 ? String(d.contractType) : "";
                        //产品列表
                        this.orderForm.des = d.orderProducts;
                        this.orderForm.comment = d.comment;
                        cService.filterProducts(this.orderForm.des);
                        // this.goodsList = this.orderForm.des;
                        this.orderForm.paymentChannel = String(this.orderForm.paymentChannel);
                        this.orderForm.contractType = String(this.orderForm.contractType);
                        this.orderForm.contractAmount = d.contractAmount;
                        this.datePickerShow=false;
                        this.orderForm.contractStartDate = d.contractStartDate;
                        this.orderForm.contractEndDate = d.contractEndDate;
                        this.orderForm.dealDate = d.dealDate;
                        this.$nextTick(()=>{
                            this.datePickerShow=true;
                        })
                    
                }else{
                    //新增订单
                    // 从客户新建订单时带过来客户信息，客户input不能编辑
                    //获取id
                    if(this.orderDetail.customerName){

                        let customerTemp = {
                            customerName: this.orderDetail.customerName.name,
                            customerId:this.orderDetail.customerName.sid
                        };
                        this.orderForm["customer"] = customerTemp;
                        
                        await this.changeCustomer(customerTemp);
                    }
                    //有商机时商机不能编辑
                    if(this.orderDetail.opportunities){
                       
                        this.orderForm.opportunity = {
                            sid : this.orderDetail.opportunities.sid,
                            name:this.orderDetail.opportunities.name || '请选择商机'
                        }
                        await this.changeOpportunity(this.orderForm.opportunity);
                    }
                    this.getUuid(true);
                }
                this.isSelectCustomer = 
                        this.orderForm.customer.customerId ? true : false;
                    // (this.orderDetail.actType != 'modify' && this.orderDetail.customerName && this.orderDetail.customerName.sid || ) ? true: false;
                    // ( this.orderDetail.customerName && this.orderDetail.customerName.sid || this.orderDetail.actType == 'modify') ? true: false;

                    // (this.orderForm.customer.customerName && this.orderForm.customer.customerName.sid) ? true: false;

                this.isOpportunities = 
                    (this.orderDetail.actType != 'modify' && this.orderDetail.opportunities && this.orderDetail.opportunities.sid) ? true: false;
                 
        },
        getUuid (){
            //获取业务id （新增） 修改不需要
            cService.getUuid(true).then( (data) =>{
                    this.orderUUid = data[0].attachmentParam.businessId;
                    this.orderForm.contractParam = data[0].contractParam;
                    this.orderForm.attachmentParam = data[0].attachmentParam;
                })
        },
        //删除用户tag的事件
        deleteUser(event,index,arr) {
            arr.splice(index, 1);
            return;
        },
        //接收用户树返回的数据
        getUserTree:function(arr){
            this.orderForm.personChargeOur = [...arr];
        },
        //选择负责人
        showUserTreeDailog:function(){
            this.userTreeEnableCheckedMultipleUser = false;
            this.showUserTree = !this.showUserTree;
        },
        //右侧弹出页面顶部的功能按钮事件
        operateFun(index) {
            switch (index) {
                case 0: //草稿事件
                    this.saveDialog(0);
                    break;
                case 1: //提交事件
                    this.saveDialog(1);
                    break;
                case 2: //关闭事件
                    this.gobackFromCreate();
                    break;
                default:
                    this.$message("错误");
            }
        },

        saveFn(orderStatus){
            
            let param = {
                    sid : this.orderUUid,
                    customerId:this.orderForm.customer.customerId,
                    customerName:this.orderForm.customer.customerName,
                    opportunityId:this.orderForm.opportunity.sid,
                    opportunityName:this.orderForm.opportunity.name || "" ,
                    code:this.orderForm.code,
                    name:this.orderForm.name,
                    type:this.orderForm.type,
                    discount:this.orderForm.discount,
                    signAmount:this.orderForm.signAmount,
                    contractAmount:this.orderForm.contractAmount,
                    dealDate:this.orderForm.dealDate,
                    contractStartDate:this.orderForm.contractStartDate,
                    contractEndDate:this.orderForm.contractEndDate,
                    personChargeOther:this.orderForm.personOther.sid,  //客户签约人
                    personOtherName:this.orderForm.personOther.name, //名字
                    personChargeOur:this.orderForm.personChargeOur[0] ? this.orderForm.personChargeOur[0].sid : '',
                    personOurName:this.orderForm.personChargeOur[0] ? this.orderForm.personChargeOur[0].name : '',
                    // personChargeOur:"9999999999999999999999",
                    // personOurName:"oooooooooooo",
                    contract:this.orderForm.contract || "",
                    contractType:this.orderForm.contractType,
                    paymentChannel:this.orderForm.paymentChannel,
                    attachment:this.orderForm.attachment || "",
                    orderStatus:orderStatus,
                    orderProducts:this.orderForm.des,
                    comment:this.orderForm.comment
                }
                let p = {
                    data: JSON.stringify(param),context:this
                }
                let my = this;
                cService.saveOpportunities(p,true).then((data) =>{
                    if(data.status == 200){
                        this.$refs['attachUpload'].saveFiles && this.$refs['attachUpload'].saveFiles();
                        this.$refs['contractUpload'].saveFiles && this.$refs['contractUpload'].saveFiles();
                        this.gobackFromCreate();
                        this.$emit("reloadOrder");
                    }
                    this.$message(data.message)
                })
                
        },
        async productIsNewFn(orderStatus){
            //保存前验证产品
            let productsList = this.orderForm.des;
            if(productsList &&　productsList.length){
                let isNewProduct = await cService.getProductValProductInfo(productsList);
                
                if(isNewProduct.result == false){ //产品信息有变更
                    if(isNewProduct.status == 102){
                        let msg =  isNewProduct.message + ",继续保持现有产品进行订单创建?";
                        JZY.u.warningMsg(msg,true)
                        // this.$confirm(msg, '提示', {
                        //     confirmButtonText: '确定',
                        //     cancelButtonText: '取消',
                        //     type: 'warning'
                        // })
                        .then(() => {
                            this.saveFn(orderStatus)
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
                    this.saveFn(orderStatus);
                }
                return;
            }
            this.saveFn(orderStatus);
        },
        //保存
        saveDialog(orderStatus) {
            if(orderStatus == 1){
                this.$refs["orderForm"].validate((valid) => {
                    if(valid){
                        this.productIsNewFn(orderStatus);
                    }
                })
            }else{
                    if(this.orderForm.customer.customerId){
                        this.productIsNewFn(orderStatus);
                    }else{
                        this.$message({
                            message:'请选择一个客户',
                            type:'error'
                        });
                    }
                    
            }
        },
        //关闭1
        gobackFromCreate(str) {
            if (str === 'reflashData') {
                this.$emit("closeCreateModal", str); //关闭弹出窗

            }else if(str ==='noClose'){

            }else{
                this.$emit("closeCreateModal"); 
            }
        },
        //打开选择产品列表
        showGoodsModal(){
            this.$emit("showGoodsModal");
        },
        initCustomerArr(){
                cService.getCustomerList('').then( (data)=>{
                        this.keyCustomerArr = data[0];
                    });
            }
    },
    mounted(){
        this.initState1 = true;
        this.initState2 = true;
        this.openDialog();
       
    },
    watch: {
        'orderForm.contractStartDate'(nVal){
            if(nVal){
                this.contractStartDateStartFn();
            }
        },
        'orderForm.contractEndDate'(nVal){
            if(nVal){
                this.contractStartDateStartFn();
            }
        },
        'orderForm.discount'(nVal){
            this.contractAmountFn();
        },
        'orderForm.contractAmount'(nVal){
            this.contractAmountFn();
        },
        'orderForm.personChargeOur'(nVal){

            this.$refs.orderForm.validateField('personChargeOur');
        },
        showGoodsDialogVisible(nVal,oVal){
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
                    this.orderForm.des = newArr;

                } 
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
   @import '../crmcss/css.scss'
</style>