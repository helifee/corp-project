<template>
    <div class="orderDetailsBox commonBussinesspage">
        <!-- <mCrmHeader titleName="订单详情" :isShowPlus="false"></mCrmHeader> -->
        <group>
            <cell title="订单名称" :value="order.name"></cell>
            <cell title="订单状态" :value="order.orderStatus">
                <slot name="value">
                    {{order.orderStatus ? '已签':'草稿'}}
                </slot>
            </cell>
            <cell title="签约日期" :value="order.dealDate">
                <slot name="value">
                    {{order.dealDate | dataFilter}}
                </slot>
            </cell>
            <cell title="订单编号" :value="order.code"></cell>
            <cell title="产品总额" :value="order.contractAmount"></cell>
            <cell title="折扣" :value="order.discount"></cell>
            <cell title="签约金额" :value="order.signAmount"></cell>
            <cell title="开始日期" >
                <slot name="value">
                    {{order.contractStartDate | dataFilter}}
                </slot>
            </cell>
            <cell title="结束日期" :value="order.contractEndDate" >
                <slot name="value">
                    {{order.contractEndDate | dataFilter}}
                </slot> 
            </cell>
            <cell title="客户名称" :value="order.customerName"></cell>
            <cell title="商机" :value="order.opportunityName">
                <slot name="value">
                    {{order.opportunityId ? order.opportunityName : "" }}
                </slot> 
            </cell>
            <cell title="客户签约人" :value="order.personOtherName" ></cell>
            <cell title="我方负责人" :value="order.personOurName" ></cell>
            <cell title="付款方式"  >
                <slot name="value">
                   {{order.paymentChannel | filterPayType}}
                </slot>
            </cell>
            <cell title="合同类型" >
                <slot name="value">
                    {{order.contractType | filterContractType}}
                </slot>
            </cell>
            <cell primary="content" title="备注" >
                <slot name="value">
                    <div style="word-break: break-all; float:right;text-align: left;">
                        <pre>
                            {{order.comment}}
                        </pre>
                    
                    </div>
                    
                </slot>
            </cell>
        </group>
        <div class="bd">
            <div class="r_title">
                <h2>
                    <span class="icon icon_cp"></span>
                    产品
                </h2>
            </div>
            <div class="list_xq_show list_pt_item">
                 <ul>
                        <li  v-for="(item,index) in opportunityProducts" v-if="opportunityProducts.length && index<2" @click="openDetails(item)" >
                            
                            <span class="m_uarrow_p">
                                <x-icon type="ios-arrow-right" size="25"></x-icon>
                            </span>
                            <div class="cell cell_p">
                                <div class="cell_row">
                                    <div class="l_bd c_black">
                                        <span>
                                            {{item.name}}
                                        </span>
                                    
                                    </div>
                                    <span class="r_bd c_black">
                                        单价(元/{{item.unit}})
                                    </span>
                                </div>
                                <div class="cell_row mb10">
                                    <div class="l_bd">
                                     <span>
                                            {{item | filterName}}
                                        </span>
                                    </div>
                                    <span class="r_bd">
                                        {{item.price}}
                                    </span>
                                </div>
                                <div class="cell_row">
                                    <div class="l_bd c_black">
                                         <span>
                                            总价(元)
                                        </span>
                                    </div>
                                    <span class="r_bd c_black">折扣</span>
                                </div>
                                <div class="cell_row">
                                    <div class="l_bd"> 
                                        <span>
                                            {{item.total}}
                                        </span>
                                    </div>
                                    <span class="r_bd">{{(item.discount || item.discount === 0) ? item.discount : 100}}%</span>
                                </div>
                            </div>
                        </li>

                    </ul>
                <div class="more"  @click="jumpProduct()">查看全部产品 | {{opportunityProducts.length}}
                    <x-icon type="ios-arrow-right" size="20"></x-icon>
                </div>
            </div>
        </div>
        <attachItem v-if="AttachmentInfo" :param="AttachmentInfo"></attachItem>
        <attachItem v-if="contractParamInfo" :param="contractParamInfo" h3Title="合同"></attachItem>
        <selectResultProduct 
        :dialogVisible="productShow"
         @closeModal="productShowFn" 
         showCheck
         @closeAll="productShowFn"
         showType
         :selectList.sync="opportunityProducts"></selectResultProduct>
         <productDetail class="m_pDetailsPage"
            @close="openDetails"
            showType
            :detail.sync="productContent"
          v-if="pcoductDetailshow"></productDetail>
    </div>
</template>
<script>

    import { Badge, Group, Cell } from 'vux'
    import bService from '@mobile/pages/m_crm/m_business/b_service.js'
    import mCrmHeader from '../../../components/m_crm_header.vue'
    import attachItem from '@mobile/components/attachItem.vue'
    // import productPage from '@mobile/pages/m_crm/m_business/m_business_product.vue'
    import selectResultProduct from "@mobile/pages/m_crm/m_business/modalProduct.vue"
    import productDetail from '@mobile/pages/m_crm/m_business/productDetail.vue'
    export default {
        components: {
            mCrmHeader,
           Group,
           Cell,
           attachItem,
           selectResultProduct,
           productDetail
        },
        props:[],
        filters:{
            dataFilter(nav){
                let temp = "";
                if(nav){
                    temp = nav.split(" ")[0]
                }
                return temp;
            },
            filterName(obj){
                let str = "";
                if(obj){
                    if(obj.categoryBaseName){
                        str += obj.categoryBaseName;
                    }
                    str += obj.categoryName ? " / " + obj.categoryName : ""
                }
                return str;
            }
        },
        created(){

            document.title = '订单';
        },
        methods: {
            openDetails(item){
                this.pcoductDetailshow = !this.pcoductDetailshow;
                item ? (this.productContent = item) : '';
            },
            productShowFn(){
                this.productShow = !this.productShow;
            },
            // jumpProduct(){
            //     this.$router.push("/m_product?businessId=" + this.$route.params.id + "&show=false" + "&type=true");
            // },
            jumpProduct(){
                this.productShowFn();
            },
            async getDetail(){
                let id = this.$route.params.id;
                let detail = await bService.getOpportunities(id,"true");
                    if(detail.status == "200"){
                        let res = detail.result;
                            document.title = res.name;
                            this.order = res;
                            this.opportunityProducts = res.orderProducts;
                            this.total = res.total;
                            this.AttachmentInfo = {
                                appId: this.order.attachmentParam.app,
                                categoryId: this.order.attachmentParam.category,
                                businessId : this.order.attachmentParam.businessId
                            }
                            this.contractParamInfo = {
                                appId: this.order.contractParam.app,
                                categoryId: this.order.contractParam.category,
                                businessId : this.order.contractParam.businessId
                            }
                    }
                            
                        
            }
        },
        mounted(){
            this.getDetail()
        },
        data () {
            return {
                pcoductDetailshow:false,
                productShow:false,
                AttachmentInfo:null,
                contractParamInfo:null,
                order : {},
                opportunityProducts:[]
            }
        }
    } 
</script>
<style  lang="scss">
 @import '../../../static/css/business.scss';
</style>
<style lang="scss" scoped>

   @import '../../../static/css/n_myCss.scss';

</style>

<style lang="scss" scoped>
    .weui-cells{
            background-color:transparent !important
        }
    .weui-cell:before {
            left:0;
                top: -10px;
          }
    .weui-cell{ margin-bottom:10px;background:#fff;}
</style>