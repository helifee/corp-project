<template>
    <div class="_customerBox">
        <div class="bd_pad60">
           <crmSearch 
            class="m_bsearchBd"
            auto-fixed
            v-on:searchResult="getSearchResult" 
            type
            :placeholder="placeholder" 
            @onCancel="onCancel"
            @onFocus="onFocus"
            v-on:mySelected="getMySelected">
                    <div slot="searchResultPage">
                        <!-- <div class="overStageBd">
                            <ul class="stageItemBox">
                                <li v-for="(item, index) in stageItemArr"  v-on:click="getStageVal(item,index)">
                                <span :class="{'active': currentTab==index}">{{item.statusName}}</span>
                                </li>
                            </ul>
                        </div> -->
                        <crmBusinessList :searchList="searchList" v-on:selected="getSelected"  @loadMore="getMoreSearch"
                            :status="searchPages.status" class="bd_pad60"
                        :currentTotal="searchCurrentTotal" :pageNum="searchPages.pageNum" :total="searchPages.total"></crmBusinessList>
                    </div>
           </crmSearch>
           <div class="overStageBd">
                        <ul class="stageItemBox">
                            <li v-for="(item, index) in stageItemArr"  v-on:click="getStageVal(item,index)">
                               <span :class="{'active': currentTab==index}">{{item.statusName}}</span>
                            </li>
                        </ul>
                    </div>
           <crmBusinessList :searchList="list" v-on:selected="getSelected"  @loadMore="getMoreList"
                :status="pages.status"
            :currentTotal="listCurrentTotal" :pageNum="pages.pageNum" :total="pages.total"></crmBusinessList>
       </div>
       <div class="common-btn" v-if="!customer"><button @click="editBusiness">添加</button></div>
        <div class="common-btn" v-else><button @click="dialogVisibleFn">返回</button></div>
    </div>
</template>
<script>
    //JZY.locale.add('m_crm_homeLocale',require('./m_crm_home.locale'))
    import { XHeader,Grid,GridItem } from 'vux'
    import crmSearch from '../m_crm_search/m_crm_common_search.vue'

    import crmBusinessList from "@mobile/pages/m_crm/m_business/m_business_list.vue"
    import myheader from '../../../components/m_crm_header.vue'
    import bService from '@mobile/pages/m_crm/m_business/b_service.js'

    import mSearch from '@mobile/pages/m_crm/m_crm_search/m_crm_search.js'
    import s from '@mobile/m_service.js'
    export default {
        components: {
            myheader,
            crmSearch,
            XHeader,
            crmBusinessList
        },
        created(){
            if(!this.customer)
            document.title = '商机';
        },
        data () {
            let customer = (this.customer ? this.customer.sid : "") || this.$route.query.customerId;
            return {
                // isSelect:false,
                currentTab:0,
                searchCurrentTotal:0,
                listCurrentTotal:0,
                placeholder : "搜索商机",
                list : [],
                searchList : [],
                stageItemArr : [{
                    count:1,status:"",statusName:"全部"
                }],
                pages:{
                    pageNum:1,
                    pageCount:10,
                    total : 0,
                    status:false
                },
                searchPages:{
                    pageNum:1,
                    pageCount:10,
                    total : 0,
                    status:false
                },
                customerId: customer,
                stage:"",
                opportunityName:"",
                estimateAmountStart:"",
                estimateAmountEnd:""
            }
        },
        props:{
            customer : {
                type : Object
            },
            dialogVisible : {
                type : Boolean
            }
        },
        mounted(){
            // if(this.$route.query.isSelect) {
            //     this.isSelect = true;
            // }
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.getList({pageNum:this.pages.pageNum});
            this.getStage();
        },
        methods: {
            dialogVisibleFn(){
                this.$emit("close")
            },
            editBusiness(){
                this.$router.push("/m_business/m_addBusiness/new");
            },
            getMoreSearch(val){
                this.searchPages.pageNum = val;
                this.getList({pageNum:this.searchPages.pageNum},1);
            },
            getMoreList(val){
                this.pages.pageNum = val;
                this.getList({pageNum:this.pages.pageNum});
            }
            ,
            onCancel(){
                this.searchList = [];
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
                    this.getList({pageNum:this.searchPages.pageNum},1);
                }
            },
            //搜索结果的回调
            getMySelected(item){
                console.log(item)
            },
            //列表点击事件
            getSelected(item){

                // if(this.isSelect){
                //     const opporData = { 'opportunityId': item.opportunityId,'opportunitName':item.opportunitName};
                //     s.routerGo(opporData,this);
                // }else {
                //     this.$router.push("/m_b_details/" + item.opportunityId)
                // }
                if(this.customer){  //客户id
                    this.$emit("opportunity",item);
                    this.dialogVisibleFn();
                }else{
                    this.$router.push("/m_b_details/" + item.opportunityId)
                }
                
            },
            getList(p,type){
                // if(!this.reloadStatus){
                //     this.reloadStatus = true;
                    let param = {
                            // pageNum : this.pages.pageNum,
                            pageCount : this.pages.pageCount,
                            customerId : this.customerId,
                            stage : type ? "": this.stage,
                            opportunityName : this.opportunityName,
                            estimateAmountStart : this.estimateAmountStart,
                            estimateAmountEnd : this.estimateAmountEnd,
                            lastContactTimeSort : "",
                            estimateAmountSort : ""
        
                    };
                    $.extend(param,p);
                    param = JSON.stringify(param);
                    if(type){
                        this.searchPages.status = true;
                    }else{
                        this.pages.status = true;
                    }
                    
                    let bList =  bService.getOpportunitiesPage(param);
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
                            
                        }).finally((d)=>{
                            // this.reloadStatus = false; 
                            if(type){
                                    this.searchPages.status = false;
                                }else{
                                    this.pages.status = false;
                                }
                        })  
                // }
                
            },
            async getStage(){
                let param = {
                    customerId : this.customerId
                }
                param = JSON.stringify(param)
                let result = await bService.getopportunitiesStages(param);
                if(result.status == "200"){
                    this.stageItemArr = this.stageItemArr.concat(result.result);
                }

            },
            async getStageVal(item,index){
                this.currentTab = index;
                this.stage = item.status;
                this.pages.pageNum = 1;
                this.list = [];
                bService.oldXhr.abort();
                
                await this.getList({pageNum:this.pages.pageNum});
            }
        }
    }
</script>

<style lang="scss">
    ._customerBox{

        .weui-cells.vux-search_show{
            height:100%;
        }
    }
    
    

</style>
<style lang="scss" scoped>
    @import '../../../static/css/n_myCss.scss';
</style>