<template>
  <div class="order_wrap order_detail">
    <!--页头-->
    <el-row class="operate_buttons">
        <el-col :span="8" class="title">
            您打开的订单id是：{{$route.params.id}}
        </el-col>
        <el-col :span="15" style="text-align:right">
          <!--返回按钮-->
            <el-button @click="goback">{{l('{orderLocale.order.detail.goback}')}}</el-button>
        </el-col>
    </el-row>
    <!--表单项-->
    <div class="detail_content">
        <el-button type="primary" size="small" round>{{orderType}}</el-button>
        <el-form ref="orderForm" :rules="orderRules" label-position="right" label-width="100px" class="detail_form">
          <el-form-item label="订单名称：">
              <span v-text="orderForm.orderName"></span>
          </el-form-item>
          <el-form-item label="订单编号：">
              <span v-text="orderForm.orderId"></span>
          </el-form-item>
          <el-form-item label="客户名称：">
              <span v-text="orderForm.customer"></span>
          </el-form-item>
          <el-form-item label="合同总额：">
              <span v-text="orderForm.contractMoney"></span>
          </el-form-item>
          <el-form-item label="折 扣：">
              <span v-text="orderForm.discount"></span>
          </el-form-item>
          <el-form-item label="签约金额：">
              <span v-text="orderForm.signedMoney"></span>
          </el-form-item>
          <el-form-item label="签约日期：">
              <span v-text="orderForm.signedTime"></span>
          </el-form-item>
          <el-form-item label="开始日期：">
              <span v-text="orderForm.startDate"></span>
          </el-form-item>
          <el-form-item label="结束日期：">
              <span v-text="orderForm.endDate"></span>
          </el-form-item>
          <el-form-item label="合同负责人：">
              <span v-text="orderForm.contractPrincipal"></span>
          </el-form-item>
          <el-form-item label="我方负责人：">
              <span v-text="orderForm.contractPrincipalOur"></span>
          </el-form-item>
          <el-form-item label="客户签约人：">
              <span v-text="orderForm.contractSignatory"></span>
          </el-form-item>
          <el-form-item label="付款方式：">
              <span v-text="orderForm.paymentMode"></span>
          </el-form-item>
          <el-form-item label="合同类型：">
              <span v-text="orderForm.contractType"></span>
          </el-form-item>
          <el-form-item class="row" label="合 同：">
              <span v-text="orderForm.contractWord"></span>
          </el-form-item>
          <el-form-item class="row" label="备 注：">
              <span v-text="orderForm.contractDesc"></span>
          </el-form-item>
          <el-form-item class="row" label="附 件：">
              <span v-text="orderForm.attachment"></span>
          </el-form-item>
          <el-form-item label="创建人：">
              <span v-text="orderForm.creater"></span>
          </el-form-item>
          <el-form-item label="创建时间：">
              <span v-text="orderForm.createTime"></span>
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
    </div>
</div>
</template>
<script>
  import '@Main/task/fonts/iconfont.css'
  JZY.locale.add("orderLocale", require("@Main/crm/crm.locale"));

  export default {
    components: {
    },
    data() {
      return {
        orderType: '已签',

        orderForm: {
          orderId:'001',
          orderType: '已签',
          orderName: '智能设备在购合同',
          customer:'北京分享科技有限公司',
          contractMoney:'9000.00',
          discount:'75%',
          signedMoney:'9000.00',
          signedTime:'2018-03-06 12:01:01',
          startDate:'2018-03-06 12:01:01',
          endDate:'2019-03-06 12:01:01',
          contractPrincipal:'张海',
          contractPrincipalOur:'张芳',
          contractSignatory:'张海',
          paymentMode:'现金',
          contractType:'直销',
          contractWord:'智能设备在购合同',
          contractDesc:'二次采购',
          attachment:'附件',
          creater:'杨帆',
          createTime:'2018-03-06 12:01:01',
        },
        orderRules:{
          orderName: [
            { required: true, message: '请输入主题', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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

      }
    },
    props: ['orderInfo'],
    computed:{

    },
    methods: {
        //返回
        goback (){
            this.$router.go(-1);
        },
    },
    mounted(){

    }
  }
</script>
<style scoped lang="scss">
$borderColor:#dcdfe6;
$backgroundColor:#e4e4e4;
.order_wrap.order_detail{
    padding: 20px;
    margin-bottom: 50px;
    position: relative;
    background: whitesmoke;
    .operate_buttons{
        width: 82.333%;
        position: fixed;
        top: 70px;
        right:0px;
        height:40px;
        line-height:40px;
        background-color:$backgroundColor;
        z-index:1;
        .title{
          overflow:hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
    }
    .detail_content{
        margin-top: 30px;
        padding: 20px 30px;
        background-color: #fff;
        border:1px solid $borderColor;
        .detail_form{
            margin-top:10px;
            padding: 40px 20px 20px;
            border:1px solid $borderColor;
            display: inline-block;
            .el-form-item{
              width:50%;
              float:left;
              .row{
                width:100%;
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
}
</style>