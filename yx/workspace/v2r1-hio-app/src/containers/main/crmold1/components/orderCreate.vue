<template>
    <div class="order_wrap order_create">
      <el-row :gutter="0">
        <el-col :span="24">
          <el-form ref="orderForm" :rules="orderRules" label-position="right" label-width="100px" class="detail_form">
            <el-form-item label="订单名称：" prop="orderName">
              <el-input v-model="orderForm.orderName" placeholder="请输入订单名称"></el-input>
            </el-form-item>
            <el-form-item label="订单编号：">
              <el-input v-model="orderForm.orderId" placeholder="请输入订单编号"></el-input>
            </el-form-item>
            <el-form-item label="客户名称：" prop="customer">
              <el-input v-model="orderForm.customer" placeholder="请输入客户名称"></el-input>
            </el-form-item>
            <el-form-item label="销售商机：">
              <el-select v-model="orderForm.marketOpportunity" placeholder="请选择销售商机">
                <el-option label="商机一" value="shanghai"></el-option>
                <el-option label="商机二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品总额：">
              <el-input v-model="orderForm.contractMoney" placeholder="请输入产品总额">
                <template slot="prepend">￥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="折 扣：">
              <el-input v-model="orderForm.discount" placeholder="请输入折扣">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="签约金额：">
              <el-input v-model="orderForm.signedMoney" placeholder="请输入签约金额">
                <template slot="append">￥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="签约日期：">
              <el-date-picker
                v-model="orderForm.signedTime"
                type="date"
                placeholder="请选择签约日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="开始日期：">
              <el-date-picker
                v-model="orderForm.startDate"
                type="date"
                placeholder="请选择开始日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期：">
              <el-date-picker
                v-model="orderForm.endDate"
                type="date"
                placeholder="请选择结束日期">
              </el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="合同负责人：">
              <el-input v-model="orderForm.contractPrincipal" placeholder="请输入合同负责人"></el-input>
            </el-form-item> -->
            <el-form-item label="我方负责人：">
              <el-input v-model="orderForm.contractPrincipalOur" placeholder="请输入我方负责人"></el-input>
            </el-form-item>
            <el-form-item label="客户签约人：">
              <el-select v-model="orderForm.contractSignatory" placeholder="请输入客户签约人">
                <el-option label="张三" value="张三"></el-option>
                <el-option label="李四" value="李四"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款方式：">
              <el-select v-model="orderForm.paymentMode" placeholder="请选择销售商机">
                <el-option label="现金" value="现金"></el-option>
                <el-option label="支票" value="支票"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="合同类型：">
              <el-select v-model="orderForm.contractType" placeholder="请选择合同类型">
                <el-option label="设备" value="设备"></el-option>
                <el-option label="会议" value="会议"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="row file_upload" label="合 同：">
              <pl-upload :filesList="orderForm.contractWord"></pl-upload>
              <!-- <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-change="handleChange"
                :file-list="form.fileList3">
                  <el-button type="primary"><i class="el-icon-upload"></i> 点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">点击左侧上传按钮上传文件</div>
              </el-upload> -->
            </el-form-item>
            <el-form-item class="row" label="备 注：">
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
              <h2>产品信息：</h2>
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
    import config from '@/config/index.js'
    
    import {addCategory} from '@Main/approve/getData'

    export default{
        components: {
        },
        data(){
            return {
              orderForm: {
                orderId:'001',
                orderType: '已签',
                orderName: '',
                customer:'',
                marketOpportunity:'beijing',
                contractMoney:'9000.00',
                discount:'75%',
                signedMoney:'9000.00',
                signedTime:'2018-03-06 12:01:01',
                startDate:'2018-03-06 12:01:01',
                endDate:'2019-03-06 12:01:01',
                contractPrincipal:'张海',
                contractPrincipalOur:'张芳',
                contractSignatory:'张三',
                paymentMode:'现金',
                contractType:'设备',
                contractWord:[{
                  name: 'food.jpeg',
                  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                  status: 'finished'
                }, {
                  name: 'food2.jpeg',
                  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                  status: 'finished'
                }],
                contractDesc:'二次采购',
                attachment:[{
                  name: 'food.jpeg',
                  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                  status: 'finished'
                }, {
                  name: 'food2.jpeg',
                  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                  status: 'finished'
                }],
                creater:'杨帆',
                createTime:'2018-03-06 12:01:01',
              },
              orderRules:{
                orderName: [
                  { required: true, message: '请输入订单名称', trigger: 'blur' },
                  { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                customer: [
                  { required: true, message: '请输入客户名称', trigger: 'blur' },
                ],
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
          categoryFormData:function(){
              this.categoryForm.sid = this.orderInfo.hasOwnProperty('sid') ? this.orderInfo.sid : ''
              this.categoryForm.name = this.orderInfo.hasOwnProperty('name') ? this.orderInfo.name : '',
              this.categoryForm.description = this.orderInfo.hasOwnProperty('description') ? this.orderInfo.description : ''
              return this.categoryForm
          },
        },
        props: ['orderInfo'],
        methods:{
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