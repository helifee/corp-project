<template>
    <div class="customer-box-order">
        <!-- <my_header titleName="订单" :isShowPlus="false"></my_header> -->
        <div class="bd_pad60">
           <crmSearch 
           type
           v-on:searchResult="getSearchResult" 
           :placeholder="placeholder" 
           @onCancel="onCancel"
           @onFocus="onFocus"
           v-on:mySelected="getMySelected">
                <div slot="searchResultPage">
                    <crmOrderList :searchList="searchList" v-on:selected="getSelected"  @loadMore="getMoreSearch"
                        :status="searchPages.status"  class="bd_pad60"
                     :currentTotal="searchCurrentTotal" :pageNum="searchPages.pageNum" :total="searchPages.total"></crmOrderList>
                </div>
           </crmSearch>
           <crmOrderList :searchList="list" v-on:selected="getSelected"  @loadMore="getMoreList"
                :status="pages.status"
            :currentTotal="listCurrentTotal" :pageNum="pages.pageNum" :total="pages.total"></crmOrderList>
        </div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import { XHeader,Grid,GridItem } from 'vux'
    import crmSearch from '../m_crm_search/m_crm_common_search.vue'
    import my_header from '../../../components/m_crm_header.vue'

    import bService from '@mobile/pages/m_crm/m_business/b_service.js'


    import crmOrderList from "@mobile/pages/m_crm/m_order/m_order_list.vue"

    export default {
        components: {
            my_header,
            crmSearch,
            XHeader,
            crmOrderList
        },
        data () {
            return {
                orderType:'',//订单状态
                searchCurrentTotal:0,
                listCurrentTotal:0,
                placeholder : "搜索订单",
                list : [],
                searchList : [],
                pageCount:10,
                pages:{
                    pageNum:1,
                    total : 0,
                    status:false
                },
                searchPages:{
                    pageNum:1,
                    total : 0,
                    status:false
                },
            }
        },
        mounted(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.getList({
                pageNum:this.pages.pageNum
            });
        },
        created(){

            document.title = '订单';
        },
        methods: {
            getMoreSearch(){

            },
            onCancel(){
                // this.searchList = [];
            },
            onFocus(){
                // this.searchList = [];
            },
            //搜索关键词的回调
            getSearchResult(data){
                this.searchList = [];
                this.opportunityName = data;
                this.searchPages.pageNum = 1;
                if(data){
                    this.getList({ pageNum:this.searchPages.pageNum,orderName:data},true);
                }
            },
            //搜索结果的回调
            getMySelected(item){
                console.log(item)
            },
            //列表点击事件
            getSelected(item){
                this.$router.push("/m_order_details/"+item.orderId);
            },
            getList(p,type){
                if(!this.reloadStatus){
                    this.reloadStatus = true;
                    let param = {
                        pageNum : "",
                        pageCount : this.pageCount,
                        orderStatus : this.orderType,
                        orderName : "",
                        customerName : this.$route.query.customerName || "",
                        customerId : this.$route.query.customerId || "",
                        opportunityId : this.$route.query.opportunities || "",
                        signAmountSort : ""
                    }
                    $.extend(param,p);
                    param = JSON.stringify(param);
                    if(type){
                        this.searchPages.status = true;
                    }else{
                        this.pages.status = true;
                    }
                    let bList = bService.getOpportunitiesPage(param,true);
                        bList.then((data) =>{
                            if(data.status == "200" && data.result && data.result.list){
                                if(type){
                                    this.searchList = this.searchList.concat(data.result.list);
                                    this.searchCurrentTotal = this.searchCurrentTotal + data.result.list.length;
                                    this.searchPages.total = data.result.total;
                                    this.searchPages.status = false;
                                }else{
                                    this.list = this.list.concat(data.result.list);
                                    this.listCurrentTotal = this.listCurrentTotal + data.result.list.length;
                                    this.pages.total = data.result.total;
                                    this.pages.status = false;
                                }
                            }
                        },function(data){
                            console.log(data)
                        }).finally(()=>{
                            this.reloadStatus = false; 
                            if(type){
                                    this.searchPages.status = false;
                                }else{
                                    this.pages.status = false;
                                }
                        })
                }
            
            },
            getMoreList(val){
                this.pages.pageNum = val;
                this.getList({pageNum:this.pages.pageNum});
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../static/css/n_myCss.scss';
</style>