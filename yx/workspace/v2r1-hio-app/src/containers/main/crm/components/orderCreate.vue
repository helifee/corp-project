<template>
    <div class="order_wrap order_create">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="orderForm" :rules="orderRules" label-position="right" label-width="100px" class="detail_form">
            <el-form-item label="订单名称：" prop="orderName">
              <el-input v-model="orderForm.name" placeholder="请输入订单名称"></el-input>
            </el-form-item>
            <el-form-item label="订单编号：" prop="code">
              <el-input v-model="orderForm.code" placeholder="请输入订单编号"></el-input>
            </el-form-item>
            <el-form-item label="客户名称：" prop="customer">
              <el-select
                  v-model="orderForm.customer" filterable remote reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                <el-option
                        :key="index" 
                        v-for="(item,index) in keyCustomerArr"
                        :label="item.customerName"
                        :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="销售商机：" prop="opportunity">
              <el-select v-model="orderForm.opportunity" placeholder="请选择销售商机">
                <el-option label="商机一" value="shanghai"></el-option>
                <el-option label="商机二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品总额：" prop="signAmount">
              <el-input v-model.number="orderForm.signAmount" placeholder="请输入产品总额">
                <template slot="prepend">￥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="折 扣：" prop="discount">
              <el-input v-model.number="orderForm.discount" placeholder="请输入折扣">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="签约金额：" prop="contractAmount">
              <el-input v-model.number="orderForm.contractAmount" placeholder="请输入签约金额">
                <template slot="append">￥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="签约日期：" prop="dealDate">
              <el-date-picker
                v-model="orderForm.dealDate"
                type="date"
                placeholder="请选择签约日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="开始日期：" prop="contractStartDate">
              <el-date-picker
                v-model="orderForm.contractStartDate"
                type="date"
                placeholder="请选择开始日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期：" prop="contractEndDate">
              <el-date-picker
                v-model="orderForm.contractEndDate"
                type="date"
                placeholder="请选择结束日期">
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="合同负责人：">
              <el-input v-model="orderForm.contractPrincipal" placeholder="请输入合同负责人"></el-input>
            </el-form-item> -->
            <el-form-item label="我方负责人：" prop="personChargeOur">
              <el-input v-model="orderForm.personChargeOur" placeholder="请输入我方负责人"></el-input>
            </el-form-item>
            <el-form-item label="客户签约人：" prop="personOther">
              <el-select v-model="orderForm.personOther" placeholder="请输入客户签约人">
                <el-option label="张三" value="张三"></el-option>
                <el-option label="李四" value="李四"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款方式：" prop="paymentChannel">
              <el-select v-model="orderForm.paymentChannel" placeholder="请选择付款方式">
                <el-option label="现金" value="现金"></el-option>
                <el-option label="支票" value="支票"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合同类型：" prop="contractType">
              <el-select v-model="orderForm.contractType" placeholder="请选择合同类型">
                <el-option label="设备" value="设备"></el-option>
                <el-option label="会议" value="会议"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="row file_upload" label="合 同："  prop="contract">
              <pl-upload :filesList="orderForm.contract"></pl-upload>
              <!-- <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
                :file-list="form.fileList3">
                  <el-button type="primary"><i class="el-icon-upload"></i> 点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">点击左侧上传按钮上传文件</div>
              </el-upload> -->
            </el-form-item>
            <el-form-item class="row" label="备 注：" prop="contractWord">
              <el-input v-model="orderForm.contractDesc" v-textarea-limiter type="textarea" :rows="5" :maxlength="2500"></el-input>
            </el-form-item>
            <el-form-item class="row file_upload" label="附 件：">
              <pl-upload :filesList="orderForm.attachment"></pl-upload>
              <!-- <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
                :file-list="form.fileList3">
                  <el-button type="primary"><i class="el-icon-upload"></i> 点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">点击左侧上传按钮上传文件</div>
              </el-upload> -->
            </el-form-item>
            <div style="float:left;width:100%;">
                <div class="line"></div>
            </div>
            <div class="title">
              <h2>产品信息：<span @click="addInformation" class="el-icon-circle-plus-outline add"></span></h2>
            </div>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="产品名称">
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                width="120">
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格"
                width="150">
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                width="120">
              </el-table-column>
              <el-table-column
                prop="discount"
                label="折扣"
                width="100">
              </el-table-column>
              <el-table-column
                prop="totalPrice"
                label="总价"
                width="150">
              </el-table-column>
            </el-table>
          </el-form>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    JZY.locale.add('approveLocale',require('@Main/approve/approve.locale'))
    import cService from '@Main/crm/crm_service.js'

    export default{
        components: {
        },
        data(){
            let createProductorValidator = (rule, value, callback) =>{
                if(!value.length){
                    callback(new Error("请选择产品"));
                }
                // callback();
            }
            return {
              keyCustomerArr:[],
              orderForm: {
                sid:'001',
                customer:{  //客户
                  customerId: '',
                  customerName: ''
                },
                opportunity:{  //商机
                  opportunityId:"",
                  opportunityName:""
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
                personChargeOther:{  //客户签约人
                  personChargeOther:"",  //id
                  personOtherName:""     //name
                },
                personChargeOur:{  //我方签约人
                  personChargeOur:"",
                  personOurName:""
                },
                contract:"",  //合同
                contractType:"", //合同类型
                paymentChannel:"",
                attachment:"" ,//附件
                orderStatus:"",//订单状态
                orderProducts:[] //订单产品
              },
              orderRules:{
                name: [
                  { required: true, message: '请输入订单名称', trigger: 'blur' },
                  { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                code: [
                  { required: true, message: '请输入订单编号', trigger: 'blur' },
                  { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                customer: [
                  { required: true, message: '请输入客户名称', trigger: 'change' },
                ],
                opportunity:[
                  { required: true, message: '请选择商机', trigger: 'change' },
                ],
                discount:[
                  { required: true, message: '请输入折扣', trigger: 'blur' },
                   { type:'number', message: '请输入数字', trigger: 'blur' },
                ],
                signAmount:[
                  { required: true, message: '请输入产品总额', trigger: 'blur' },
                   { type:'number', message: '请输入数字', trigger: 'blur' },
                ],
                contractAmount:[
                  { required: true, message: '请输入签约金额', trigger: 'blur' },
                   { type:'number', message: '请输入数字', trigger: 'blur' },
                ],
                dealDate:[
                  { required: true, message: '请选择日期', trigger: 'blur' }
                ],
                contractStartDate:[
                  { required: true, message: '请选择开始日期', trigger: 'blur' }
                ],
                contractEndDate:[
                  { required: true, message: '请选择结束日期', trigger: 'blur' }
                ],
                personChargeOther:[
                  { required: true, message: '请填写客户签约人', trigger: 'blur' }
                ],
                personChargeOur:[
                  { required: true, message: '请填写我方负责人', trigger: 'blur' }
                ],
                contractType:[
                  { required: true, message: '请选择合同类型', trigger: 'blur' }
                ],
                paymentChannel:[
                  { required: true, message: '请选择付款方式', trigger: 'blur' }
                ],
                orderProducts:[
                  { required: true, message: '请选择产品', trigger: 'blur' },
                  {validator:createProductorValidator,trigger:'blur'}
                ]

              },
              tableData: [{
                name: '笔记本电脑',
                unit: '台',
                price: '3800.00',
                quantity: '1',
                discount: '90%',
                totalPrice: '3800.00'
              }],

                categoryForm: {
                  sid:'',
                  name: '',
                  description: ''
                },
                categoryRules: {
                  name: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                  ],
                }
            }
        },
        computed:{
         
        },
        methods:{
          //选择产品列表
          addInformation(){
            
          },
          //查询客户
          remoteMethod(query){
                if (query !== '') {
                    this.loading = true;
                    
                    cService.getCustomerList(query).then( (data)=>{
                        this.loading = false;
                        this.keyCustomerArr = data[0];
                    })
                }else{
                    this.keyCustomerArr = [];
                }
            },
          //保存表单方法
          async getFlowCategory(){
              let res = await addCategory()
              this.flowCategory.data = [...res[0]]
          },
            test1:function(){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve({foo:'barrrrrrr'})
                    },100)
                })
            },
            //保存表单事件
            saveCategoryForm:function(){
              this.$refs.categoryForm.validate(async (valid) => {
                if (valid) {
                  const params = {
                    ...this.categoryForm,
                    // other: '',
                  }
                  try{
                    const result = await addCategory(params)
                    console.info(result)
                    if (result[0]['status'] == 200) {
                      // this.initData();//父组件重新加载数据
                      this.categoryForm.sid = '';
                      this.categoryForm.name = '';
                      this.categoryForm.description = '';
                      this.$emit('closeDialog','reflashData')//关闭父组件的弹出窗
                      this.$message({
                        type: 'success',
                        message: '新增成功'
                      });
                    }
                  }catch(err){
                    console.log(err)
                  }
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: '请检查输入是否正确',
                    offset: 100
                  });
                  return false;
                }
              });
            }
        },
        mounted(){
        },
    }
</script>

<style lang="scss">
.order_wrap.order_create{
    .el-textarea{
      textarea{
        box-shadow:none;
      }
    }
}
</style>
<style scoped lang="scss">
$borderColor:#dcdfe6;
$backgroundColor:#e4e4e4;
.order_wrap.order_create{
    .detail_form{
        margin-top:10px;
        padding: 40px 20px 20px;
        border:1px solid $borderColor;
        display: inline-block;
        .el-form-item{
          width:50%;
          float:left;
          &.row{
            width:100%;
          }
          .el-input,.el-select{
            width:70%;
          }

          .file_upload{
              margin-top: 5px;
              label{
                  margin-top: 7px;
              }
              .el-upload__tip{
                  font-size: 14px;
                  color: #999;
                  display: inline-block;
                  margin-left: 30px;
              }
          }
        }
        .title{
          width:100%;
          float:left;
          font-size:15px;
          margin-bottom:20px;
        }
        .line{
            margin-left: -20px;
            margin-right: -20px;
            margin-bottom:20px;
            border-top: 1px solid $borderColor;
        }
    }
}
</style>