<template>
    <div class="customer-box commonBussinesspage bd_pad60">
        <!-- <mCrmHeader titleName="商机详情" :isShowPlus="true" rightBtnText="编辑" v-on:rightClick="editBusiness"></mCrmHeader> -->
        <div class="details">
            <div class="bd details_top">
                <h2 class="d_title">{{details.name}}</h2>
                <div class="d_top_c">
                    <p class="d_top_c_cel">
                        <span>预计成交时间</span>
                        <span class="right">{{details.estimateDealTime | filterDate}} </span>
                    </p>
                    <p class="d_top_c_cel">
                        <span>金额</span>
                        <span class="right">{{details.estimateAmount}} 元 </span>
                    </p>
                    <p class="d_top_c_cel">
                        <span>阶段</span>
                        <span class="right">{{details.stage | filterStage}} </span>
                    </p>
                    <p class="d_top_c_cel">
                        <span>客户名称</span>
                        <span class="right" @click="goCustomer">{{details.customerName}} </span>
                    </p>
                    <p class="d_top_c_cel">
                        <span>负责人</span>
                        <span class="right">{{details.personInChargeName}} </span>
                    </p>
                    <p class="d_top_c_cel">
                        <span>创建时间</span>
                        <span class="right" >{{details.createDate}} </span>
                    </p>

                </div>
            </div>
           <div class="bd contactsBd">
               <div class="r_title">

                    <h2>
                        <span class="icon"></span>
                        {{title[0]}}
                    </h2>
                </div>
               <flexbox>
                    <flexbox-item><div class="">{{details.contactName}}</div></flexbox-item>
                    <flexbox-item><div class="text-right right">{{details.phoneNumber}}</div></flexbox-item>
                </flexbox>
           </div>
           
           <div class="bd">
               <div class="r_title">
                    <h2>
                        <span class="icon icon_gj"></span>
                        跟进计划
                        <router-link v-on:click.native="putFromUrl" 
                        :to="{name:'m_follow_plan',query:{cId:detailsId,fromWhere:'bussiness','customerName':customer.name,'customerId':customer.sid,'opportunityId':details.sid,'opportunityName':details.name}}">
                            <x-icon type="ios-plus-empty" size="30"></x-icon>
                        </router-link>
                    </h2>
                </div>
                <div class="item_roced_list" >
                    <ul>
                        <li v-for="(item,index) in planList"  v-show="index<2">
                            <router-link :to="{name:'m_cus_plan_detail',query:{id:item.sid,fromWhere:'bussiness'}}">
                                <p class="title" style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap">{{item.target}}</p>
                                <p><span class="des">跟进时间：</span><span>{{handleTime(item.contactTime)}}</span></p>
                                <p><span class="des">跟进人：</span><span>{{item.createPersonName}}</span></p>
                                <!--<span class="status"><i class="circle green-circle"></i>已跟进</span>-->
                            </router-link>
                        </li>
                    </ul>
                    <router-link :to="{name:'m_cus_plan',query:{opportunityId:detailsId}}" v-if="planList.length" >
                        <div class="more"  >查看全部跟进计划 | {{planTotal}}
                            <x-icon type="ios-arrow-right" size="20"></x-icon>
                        </div>
                    </router-link>
                    <div class="more" v-else >查看全部跟进计划 | {{planTotal}}
                            <x-icon type="ios-arrow-right" size="20"></x-icon>
                        </div>
                    
                </div>
            </div>
            <div class="bd" style="margin-bottom:10px;">
                <div class="r_title">
                    <h2>
                        <span class="icon icon_gj"></span>
                        跟进记录
                        <router-link :to="{name:'m_follow_log',query:{cId:detailsId,'customerName':customer.name,'customerId':customer.sid,'contactId':details.contactId,'contcatName':details.contactName,'opportunityId':details.sid,'opportunityName':details.name,'decisionRole':details.decisionRole}}">
                        <x-icon type="ios-plus-empty" size="30"></x-icon>
                        </router-link>
                    </h2>
                </div>
                <div class="item_roced_list" >
                    <ul>
                        
                        <li v-for="(item,index) in recordList"  v-show="index<2">
                            <router-link :to="{name:'m_cus_his_detail',params:{id:item.sid}}">
                                <p><span class="des">联系人：</span><span>{{item.contactName}}-</span></p>
                                <p><span class="des">商机：</span><span>{{item.opportunityName}}</span></p>
                                <p><span class="des">跟进时间：</span><span>{{item.createTime}}</span></p>
                                <p><span class="des">联系方式：</span><span>{{item.contactWay | filtercontactWay}}</span></p>
                            </router-link>
                        </li>
                    </ul>
                    <router-link :to="{name:'m_cus_followLog',query:{opportunityId:detailsId}}"  v-if='recordList.length' >
                        <div class="more"  >查看全部跟进记录 | {{recordTotal}}
                            <x-icon type="ios-arrow-right" size="20"></x-icon>
                        </div>
                    </router-link>
                    <div class="more"  v-else >查看全部跟进记录 | {{recordTotal}}
                            <x-icon type="ios-arrow-right" size="20"></x-icon>
                        </div>
                    
                </div>
            </div>
            <div class="bd">
                <div class="r_title">
                    <h2>
                        <span class="icon icon_cp"></span>
                        {{title[3]}}
                        <x-icon type="ios-plus-empty" size="30" @click="jumpProduct(false)"></x-icon>
                    </h2>
                </div>
                <div class="list_xq_show list_pt_item">
                    <ul>
                        <li  v-for="(item,index) in opportunityProducts" v-if="opportunityProducts.length && index<2"  @click="openDetails(item)">
                            
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
                    <div class="more" v-if="opportunityProducts.length" @click="jumpProduct(true)">{{moretext[2]}}  | {{opportunityProducts.length}}
                        <x-icon type="ios-arrow-right" size="20"></x-icon>
                    </div>
                    <div class="more" v-else >{{moretext[2]}}  | {{opportunityProducts.length}}
                        <x-icon type="ios-arrow-right" size="20"></x-icon>
                    </div>
                </div>
            </div>
            <div class="bd">
                <div class="r_title">
                    <h2>
                        <span class="icon icon_cp"></span>
                        {{title[4]}}
                    </h2>
                </div>
                <div class="list_xq_show list_pt_item">
                    <ul>
                        <li v-for="(item,index) in orderList" v-if="orderList.length && index<2"  v-show="index<2">
                            <!-- <div class="cell">
                                <div class="c_w">
                                    <span class="labeN">商品名称：</span> <span class="text">{{item.orderName}}</span>
                                </div>
                                <div class="c_w">
                                    <span class="labeN">编号：</span> <span class="text">{{item.orderCode}}</span>
                                    </div>
                                <div class="c_w">
                                    <span class="labeN">产品总额：</span> <span class="text">{{item.signAmount}}</span>
                                    </div>
                                <div class="c_w">
                                    <span class="labeN">订单状态：</span> <span class="text">{{item.orderStatus=='1' ? '已签':'草稿'}}</span>
                                </div>
                                <div class="c_w">
                                    <span class="labeN">客户签约人：</span> <span class="text">{{item.personOurName}}</span>
                                </div>
                            </div> -->
                            <!-- <span class="m_uarrow_p">
                                <x-icon type="ios-arrow-right" size="25"></x-icon>
                            </span> -->
                            <div class="cell cell_p">
                                <div class="cell_row mb10">
                                    <div class="l_bd c_black">
                                        <span>
                                            {{item.orderName}}
                                        </span>
                                    
                                    </div>
                                    <span class="r_bd c_black">
                                         {{item.orderCode}}
                                    </span>
                                </div>
                                <div class="cell_row">
                                    <div class="l_bd">
                                     <span>
                                            {{item.customerName}}
                                        </span>
                                    </div>
                                </div>
                                <div class="cell_row">
                                    <div class="l_bd">
                                         <span>
                                            签约金额：{{item.signAmount}}
                                        </span>
                                    </div>
                                </div>
                                <div class="cell_row">
                                    <div class="l_bd"> 
                                        <span>
                                            订单状态：{{item.orderStatus ? "已签" : '草稿'}}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                    <div class="more" v-if="orderTotal>1" @click="jumpOrder(details)">
                        查看全部订单 | {{orderTotal}}
                        <x-icon type="ios-arrow-right" size="20"></x-icon>
                    </div>
                    <div class="more" v-else >
                        查看全部订单 | {{orderTotal}}
                        <x-icon type="ios-arrow-right" size="20"></x-icon>
                    </div>
                </div>
            </div>
            <attachItem v-if="AttachmentInfo" :param="AttachmentInfo"></attachItem>
        </div>
        <productPage class="m_cProductPage" 
        v-if="productShow" 
        @close="productShowFn"
        @reloadFn='saveProductListFn'
        :list="opportunityProducts"
        :showCheck="showCheck"
        type="opportunity"
        ></productPage>
        <productDetail class="m_pDetailsPage"
        @delProdcut="delProdcutFn"
        @editProdcut="editProdcutFn"
        @close="openDetails"
        :showType="false"
         :detail.sync="productContent"
          v-if="pcoductDetailshow"></productDetail>
        <div class="common-btn">
            <button  class="_business_w5" @click="del">删除</button>
            <button class="_business_w5" @click="editBusiness">编辑</button>
        </div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import { XHeader,Grid,GridItem,Flexbox, FlexboxItem } from 'vux'

    // import mCtitle from "@mobile/components/m_crm_record/m_crm_record_title.vue"
    // import crmBusinessRecordList from "@mobile/pages/m_crm/m_business/m_business_record_list.vue"

    import bService from '@mobile/pages/m_crm/m_business/b_service.js'
    import u from '@mobile/m_util.js'
    import mCrmHeader from '../../../components/m_crm_header.vue'
    import productPage from './m_business_product.vue'
    import productDetail from './productDetail.vue'
    import attachItem from '@mobile/components/attachItem.vue'

    export default {
        components: {
            mCrmHeader,
            XHeader,
            Flexbox,
            FlexboxItem,
            productPage,
            productDetail,
            attachItem
        },
        filters:{
            filtercontactWay(val){
                let str = "";
                // "1":"邮件",
                //     "0":"电话",
                //     "2":"短信",
                //     "3":"上门拜访",
                //     "4":"会务",
                switch(val){
                    case "0":
                    str = "电话";
                    break;
                    case "1":
                    str = "邮件";
                    break;
                    case "2":
                    str = "短信";
                    break;
                    case "3":
                    str = "上门拜访";
                    break;
                    case "4":
                    str = "会务";
                    break;
                }
                return str
            },
            filterDate(val){
                let temp = "";
                if(val){
                    temp = val.split(" ")[0]
                }
                return temp;
            },
            filterStage (val){
                let str = "";
                switch(val){
                    case 0:
                    str = "立项";
                    break;
                    case 1:
                    str = "初步沟通";
                    break;
                    case 2:
                    str = "需求商定";
                    break;
                    case 3:
                    str = "方案报价";
                    break;
                    case 4:
                    str = "赢单";
                    break;
                    case 5:
                    str = "输单";
                    break;
                }
                return str;
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

            document.title = '商机详情';
        }, 
        data () {
            return {
                AttachmentInfo:null,
                productContent:{},
                pcoductDetailshow:false,
                productShow:false,
                detailsId:'',
                recordTotal:0,
                planTotal:0,
                recordList:[],
                planList:[],
               orderType:'', //订单状态
               orderList:[],
               orderTotal:0,
               order:{
                   pageCount:10
               },
               title: ["联系人","跟进计划","跟进记录","产品","订单"],
               moretext: ["查看全部跟进计划","查看全部跟进记录","查看全部商品"],
               details:{},
               customer:{
                   sid: '',
                   name:''
               },
               opportunityProducts:[]  //产品
            }
        },
        mounted(){
            let id = this.$route.params.id;
            this.getDetails(id);
            this.getOrderList(id);   
            this.getFollowList(id); 
        },
        methods: {
            
            delProdcutFn(details){
                this.opportunityProducts.forEach((element,index) => {
                    if(element.productId == details.productId){
                        this.opportunityProducts.splice(index,1)
                    }
                });
                //重新保存商机
                this.saveProductListFn(this.opportunityProducts)
            },
            editProdcutFn(details){
                this.opportunityProducts.forEach((element,index) => {
                    if(element.productId == details.productId){
                        jQuery.extend(this.opportunityProducts[index],details)
                    }
                });
                //重新保存商机
                this.saveProductListFn(this.opportunityProducts)
            },
            openDetails(item){
                this.pcoductDetailshow = !this.pcoductDetailshow;
                item ? (this.productContent = item) : '';
            },
            productShowFn(){
                this.productShow = !this.productShow;
            },
            goCustomer(){
                this.$router.push('/m_cus/m_cus_detail?id=' + this.details.customerId )
            },
            del(){
                this.$confirm("确认删除该商机吗？删除后无法恢复！").then(()=>{
                    bService.delBusiness({id:this.$route.params.id }).then( (data) =>{
                        if(data.status == "200"){
                            this.$router.go(-1);
                        }else{
                            this.$alert(data.message);
                        }
                    })
                })
            },
            handleTime(date){
                return u.handleTimeNoSecondFn(date);
            },
            jumpProduct(show){
                this.showCheck = show;
                this.productShowFn();
                // this.$router.push("/m_product?businessId=" + this.$route.params.id + "&show=" + show + "&type=false");
            },
            jumpOrder(obj){
                this.$router.push("/m_order?customerName=" + obj.customerName + "&customerId=" + obj.customerId + "&opportunities=" + this.$route.params.id);
            },
            getSelected(item){
                
            },
            editBusiness(){
                let temp = "/m_business/m_addBusiness/modify?customerName=" 
                    + this.details.customerName 
                    + "&customerId=" 
                    + this.details.customerId 
                    + "&detail=" 
                    + this.$route.params.id;
                this.$router.push(temp)
            },
            async getDetails(id){
                // let id = this.$route.params.id;
                this.detailsId = id;
                let result = await bService.getOpportunities(id);
                // if(result.status == "200"){
                    this.details = result.result;
                    document.title = this.details.name;
                    this.opportunityProducts = 
                        (this.details.opportunityProducts && this.details.opportunityProducts.length)
                        ? this.details.opportunityProducts : [];
                    this.customer = {
                        sid : this.details.customerId,
                        name : this.details.customerName
                    };
                    this.AttachmentInfo = {

                        appId: this.details.attachmentParam.app,
                        categoryId: this.details.attachmentParam.category,
                        businessId : this.details.attachmentParam.businessId
                    }
                    this.getOrderList(id);   
                    this.getFollowList(id); 
                // }
               
            },
            getOrderList(id){
                let param = {
                    pageNum : 1,
                    pageCount : this.order.pageCount,
                    orderStatus : this.orderType,
                    orderName : "",
                    customerName : this.customer.name || "",
                    customerId : this.customer.sid || "",
                    opportunityId : id || "",
                    signAmountSort : ""
                }
                param = JSON.stringify(param);
                let orderList = bService.getOpportunitiesPage(param,true);
                orderList.then( (data)=>{
                    if(data.status == "200" && data.result && data.result.list){
                        this.orderList = data.result.list;
                        this.orderTotal = data.result.total;
                    }
                })
            },
            getFollowList(id){
                let param = {opportunityId:id};
                param = JSON.stringify(param);
                bService.getFollow(param,'plan').then((data)=>{
                    this.planList = data.result.list;
                    this.planTotal = data.result.total || 0;
                })
                bService.getFollow(param).then((data)=>{
                    this.recordList = data.result.list;
                    this.recordTotal = data.result.total || 0;
                })
            },
            async saveProductListFn(list){
                let param = this.details;
                param.opportunityProducts = list;
                param = { data : JSON.stringify(param)};
                let saveSign = await bService.saveOpportunities(param);
                if(saveSign.status == "200"){
                    this.message = saveSign.message;
                    this.$alert(this.message);
                    this.getDetails(this.details.sid);
                }
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