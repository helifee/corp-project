<template>
  <div class="order_wrap order_detail">
    <!--页头-->
   
    <!--表单项-->
    <div class="detail_content">
        <!-- <el-button type="primary" size="small" >{{orderForm.orderStatus ? '已签':'草稿'}}</el-button> -->
        <div class="opertionWrap">
            <span class="statusSpan">{{orderForm.orderStatus ? '已签':'草稿'}}</span>
            <div class="detailStatusWrap">
                <el-button v-if="!orderForm.orderStatus" @click="changeDialogVisible">编辑</el-button>
                <el-button v-if="!orderForm.orderStatus" @click="delBusinessFn()">删除</el-button>
                <el-button @click="goback">返回</el-button>
            </div>
        </div>
        <el-form ref="orderForm" label-position="right" label-width="100px" class="detail_form">
          <el-form-item label="订单名称：">
              
              <span v-text="orderForm.name"></span>
          </el-form-item>
          <el-form-item label="订单编号：">
              <span v-text="orderForm.code"></span>
          </el-form-item>
          <el-form-item label="客户名称：">
              <span v-text="orderForm.customerName"></span>
          </el-form-item>
          <el-form-item label="销售商机：">
              <span v-text="orderForm.opportunityName"></span>
          </el-form-item>
          <el-form-item label="产品总额：">
              <span v-text="orderForm.contractAmount"></span>
          </el-form-item>
          <el-form-item>
              <div slot='label' >折<span style="padding-left:2em;"></span>扣：</div>
              <span v-text="orderForm.discount"></span>
          </el-form-item>
          <el-form-item label="签约金额：">
              <span v-text="orderForm.signAmount"></span>
          </el-form-item>
          <el-form-item label="签约日期：">
              <span>{{orderForm.dealDate | datafilter}}</span>
          </el-form-item>
          <el-form-item label="开始日期：">
              <span>{{orderForm.contractStartDate | datafilter}}</span>
          </el-form-item>
          <el-form-item label="结束日期：">
              <span>{{orderForm.contractEndDate | datafilter}}</span>
          </el-form-item>
          <el-form-item label="我方负责人：">
              <span v-text="orderForm.personOurName"></span>
          </el-form-item>
          <el-form-item label="客户签约人：">
              <span v-text="orderForm.personOtherName"></span>
          </el-form-item>
          <el-form-item label="付款方式：">
              <span >
                  {{orderForm.paymentChannel | filterPayType}}
              </span>
          </el-form-item>
          <el-form-item label="合同类型：">
              <span >
                  {{orderForm.contractType | filterContractType}}
              </span>
          </el-form-item>
          <el-form-item class="row _bdWrap">
              <div slot='label' >合<span style="padding-left:2em;"></span>同：</div>
              <attach-upload
                        :readonly="true"
                        ref="contractFile"
                        v-if="orderForm.contractParam"
                        :appId="orderForm.contractParam.app"
                        :businessId="orderForm.contractParam.businessId"
                        :categoryId="orderForm.contractParam.category">
                        </attach-upload>
          </el-form-item>
          <el-form-item class="row _bdWrap" >
              <div slot='label' >备<span style="padding-left:2em;"></span>注：</div>
              <span><pre>{{orderForm.comment}}</pre></span>
          </el-form-item>
          <el-form-item class="row _bdWrap" label="附 件：">
              <div slot='label' >附<span style="padding-left:2em;"></span>件：</div>
              <attach-upload
                                :readonly="true"
                                ref="attachFile"
                                v-if="orderForm.attachmentParam"
                                :appId="orderForm.attachmentParam.app"
                                :businessId="orderForm.attachmentParam.businessId"
                                :categoryId="orderForm.attachmentParam.category"
                                >
                        </attach-upload>
          </el-form-item>
          <el-form-item label="创建人：">
              <div slot='label' >创<span style="padding-left:1em;"></span>建<span style="padding-left:1em;"></span>人：</div>
              <span v-text="orderForm.createPersonName"></span>
          </el-form-item>
          <el-form-item label="创建时间：">
              <span>{{orderForm.createDate }}</span>
          </el-form-item>
          <div style="float:left;width:100%;">
              <div class="line"></div>
          </div>
          <div class="title">
            <h2>产品信息：</h2>
          </div>
          <myTable :tableTitle="tableTitle" :tableData="tableData"></myTable>
        </el-form>
    </div>
    <order-right-modal :dialogVisible = "dialogVisible" 
        v-if="dialogVisible"
        @closeCreateModal="changeDialogVisible"
        @showGoodsModal="closeGoodsDialog"
        :showGoodsDialogVisible="goodsDialogVisible"
        @reloadOrder='getDetail'
        :orderDetail="orderDetail"
        ></order-right-modal>
        <dialog-choose-goods  class="goods"
         :dialogVisible="goodsDialogVisible" 
         v-if="goodsDialogVisible"
         ref="chooseGoods"
         @closeCreateModal="closeGoodsDialog"></dialog-choose-goods>
</div>
</template>
<script>
  import '@Main/task/fonts/iconfont.css'
  JZY.locale.add("orderLocale", require("@Main/crm/crm.locale"));
  import cService from '@Main/crm/crm_service.js'
  import myTable from '@Main/crm/components/table.vue'
    import orderRightModal from '@Main/crm/components/order.rightModal.vue'
    import dialogChooseGoods from '@Main/crm/components/dialog.chooseGoods.vue'

  const tableTitle = [{
            type:"name",
            name:"产品名称"
        },
        {
            type:"categoryname",
            name:"产品类别"
        },
        {
            type:"unit",
            name:"单位"
        },
        {
            type:"price",
            name:"价格"
        },
        {
            type:"productCount",
            name:"数量"
        },
        {
            type:"discount",
            name:"折扣%"
        },
        {
            type:"total",
            name:"总价"
        },
        {
            type:"comment",
            name:"备注"
        }
    ] 
  export default {
    components: {
        myTable,
        orderRightModal,
        dialogChooseGoods
    },
    
    data() {
      return {
        orderDetailId : this.$route.params.id,
        orderForm: {
          orderStatus : 0
        },
        tableData: [],
        tableTitle : tableTitle,
        dialogVisible:false,//右侧弹出窗开关
        goodsDialogVisible:false,
        goodsList:[],
        orderDetail:{
            actType : 'modify'
        }
      }
    },
    filters:{
        datafilter(val){
            let temp = "";
            console.log(val)
            if(val){
                temp = val.split(" ")[0];
            }
            return temp;
        }
    },
    computed:{

    },
    methods: {
        //右侧弹窗口
        changeDialogVisible(){
            this.dialogVisible = !this.dialogVisible
        },
        //选择物品的弹窗
        closeGoodsDialog(item){
            this.goodsDialogVisible = !this.goodsDialogVisible;
            this.goodsList = item || [];
        },
        //返回
        goback (){
            this.$router.go(-1);
        },
        delBusinessFn(){
            JZY.u.warningMsg('您确认删除此订单吗?',true)
                  .then(() => {
                    cService.delBusiness({id:this.orderDetailId,context:this },true).then((data) =>{
                        this.goback()
                    })
                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消'
                    });          
                  });
            
        },
        async getDetail(){
            if(this.orderDetailId){
                let res = await cService.getOpportunities(this.orderDetailId,true);

                        let d = res[0];
                        this.orderForm = d;
                        //产品列表
                        cService.filterProducts(d.orderProducts);
                        this.tableData = d.orderProducts;
                        this.orderDetail = d;
                        this.orderDetail.actType = "modify";
                        this.orderDetail.orderId = this.orderDetailId;
                        
                        this.orderForm.createPersonName = d.createPersonName || (JZY.store.state.session.tenantInfo ? JZY.store.state.session.tenantInfo.userName : "");
                        this.$refs['contractFile'].getFilesList();
                        this.$refs['attachFile'].getFilesList();
            }
            
        }
    },
    mounted(){
        this.getDetail()
    }
  }
</script>
<style scoped lang="scss">
    @import '../crmcss/css.scss'

</style>