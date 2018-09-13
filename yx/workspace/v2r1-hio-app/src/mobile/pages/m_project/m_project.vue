<template>
    <div class="m_project">
        <div ref="head_project" style="margin-bottom: 10px">
            <div class="search" style="height: 44px">
                <mCrmSearch v-on:searchFn="searchCustomer"></mCrmSearch>
            </div>
            <tab active-color='#009EFF'>
                <tab-item selected  @on-item-click="handlerMyProject('myCreate')">我的创建</tab-item>
                <tab-item   @on-item-click="handlerMyProject('responsible')">我负责的</tab-item>
                <tab-item   @on-item-click="handlerMyProject('participate')">我参与的</tab-item>
                <tab-item   @on-item-click="handlerMyProject('shared')">共享给我的</tab-item>
                <tab-item   @on-item-click="handlerMyProject('follow')">我关注的</tab-item>
                <tab-item   @on-item-click="handlerMyProject('set')" v-if="JZY.s.hasMenuPermisson('project_manage','modify')">项目管理</tab-item>
            </tab>
        </div>
        <div >
            <projectListView
                    :dataList ="tableData"
                    :scrollerHeight="wrapperHeight"
                    :noMore="listNoMore"
                    :loading="dataLoading"
                    :moduleName="moduleName"
                    :orgType = "orgType"
                    @setTaskFollow = "setTaskFollow"
                    ref="refProListView"
                    @loadingMoreDatas = "loadingMoreDatas">
            </projectListView>  a
        </div>
        <div class="btnGroups" v-if="orgType != 2">
            <button  @click="handleCreateProject">创建项目</button>
            <span ></span>
            <button @click="handleFilter">筛选</button>
        </div>
        <div class="btnGroups" v-else>
            <button @click="handleFilter" style="width: 100%">筛选</button>
        </div>
        <actionsheet v-model="filterType" :menus="filterTypeMenus"
                     show-cancel @on-click-menu="handleFilterItem">
            <div slot="header"><p style="color: #999;font-size: 15px">筛选</p></div>
        </actionsheet>
    </div>

</template>

<script>
    import mCrmSearch from '@mobile/components/m_crm_search.vue'
    import projectListView from './components/m_project_listView'
    // import bottonbtns from './components/mBottomBtns'
    // import bottonbtnItem from './components/bottonbtnItem'
    import { Tab, TabItem,Actionsheet  } from 'vux'
    import {postProjectCreateList,postProjectResponsibleList,postProjectParticipateList,postProjectShareList,
        postProjectConcernList,postProjectInfoList,getProjectFollow} from '@mobile/pages/m_project/detailService.js'
    export default {
        name: "m_project",
        components: {
            Tab,TabItem,mCrmSearch,Actionsheet,projectListView
        },
        data(){
            return{
                // showMyProject:true,
                filterTypeMenus: [{
                    label: '<span style=\"color: #1AAD19 \">全部</span>',
                    value: ''
                }, {
                    label: '进行中',
                    value: '0',
                }, {
                    label: '已延期',
                    value: '1'
                }, {
                    label: '未开启',
                    value: '2'
                }, {
                    label: '已完成',
                    value: '3'
                }, {
                    label: '已撤销',
                    value: '4'
                }],
                filterType: false,
                tableData:[],
                wrapperHeight:0,
                listNoMore:false,
                queryData:{
                    pageNum:1,
                    searchValue:"",

                },
                moduleName:"myCreate",
                dataLoading:true,
                projectStatus:"",


                orgType: '',//1为正常企业 2为合作企业；
            }
        },
        mounted(){
            document.title = '我的项目'
            this.wrapperHeight = document.documentElement.clientHeight - 158;
            this.postProjectListData();
            $(window).resize(function() {
                //clientHeight是网页在浏览器中的可视高度，
                this.wrapperHeight = document.documentElement.clientHeight - 158;
            });

            //orgType，1为正常企业 2为合作企业
            this.orgType = this.$route.query.orgType;
        },
        watch:{
            projectStatus(newValue, oldValue){
                // console.info(newValue)
                // console.info(oldValue)
                this.filterTypeMenus = [{
                    label: '全部',
                    type: newValue === '' ? 'primary':'',
                    value: ''
                },{
                    label: '进行中',
                    type: newValue === '0' ? 'primary':'',
                    value: '0'
                },{
                    label: '已延期',
                    type: newValue === '1' ? 'primary':'',
                    value: '1'
                },{
                    label: '未开启',
                    type: newValue === '2' ? 'primary':'',
                    value: '2'
                },{
                    label: '已完成',
                    type: newValue === '3' ? 'primary':'',
                    value: '3'
                },{
                    label: '已撤销',
                    type: newValue === '4' ? 'primary':'',
                    value: '4'
                }]
            }
        },
        methods:{
            handlerMyProject(itemName){
                this.moduleName=itemName;
                this.queryData.searchValue="";
                this.projectStatus="";
                this.resetLoadData();
            },
            resetLoadData(){
                this.tableData=[];
                this.listNoMore=false;
                this.$refs.refProListView.scrollerReset();
                this.queryData.pageNum=1;
                // this.queryData.searchValue="",
                // this.queryData.projectStatus="",
                this.postProjectListData();
            },
            searchCustomer(value){
                this.queryData.searchValue=value;
                // this.queryData.projectStatus="";
                this.resetLoadData();
            },
            handleFilter(){
                this.filterType=true;
            },
            handleFilterItem(menuKey, menuItem){
                if(menuKey !='cancel'){
                    this.projectStatus=menuKey;
                    // this.queryData.searchValue="";
                    this.resetLoadData()
                }
            },
            handleCreateProject(){
                this.$router.push("/m_project_edit/create")
            },
            async setTaskFollow(item){
                let res =await getProjectFollow(item.sid);
                //不成功不会走下来
                try{
                    this.tableData.forEach(tableItem=>{
                        if(tableItem.sid==item.sid){
                            tableItem.concern=tableItem.concern=="1"?"0":"1";
                            foreach.break=new Error("StopIteration");
                        }
                    })
                }catch (e){}
            },

            async postProjectListData(type){
                let res;
                this.dataLoading=true;
                if(this.moduleName=="myCreate"){
                    res = await postProjectCreateList(this.queryData.searchValue,this.projectStatus,"", this.queryData.pageNum,10);
                }else if(this.moduleName=="responsible"){
                    res = await postProjectResponsibleList(this.queryData.searchValue,this.projectStatus,"", this.queryData.pageNum,10);
                }else if(this.moduleName=="participate"){
                    res = await postProjectParticipateList(this.queryData.searchValue,this.projectStatus,"", this.queryData.pageNum,10);
                }else if(this.moduleName=="shared"){
                    res = await postProjectShareList(this.queryData.searchValue,this.projectStatus,"", this.queryData.pageNum,10);
                }else if(this.moduleName=="follow"){
                    res = await postProjectConcernList(this.queryData.searchValue,this.projectStatus,"", this.queryData.pageNum,10);
                }else if(this.moduleName=="set"){
                    res = await postProjectInfoList(this.queryData.searchValue,this.projectStatus,"", this.queryData.pageNum,10);
                }
                try{
                    if(res!="error"){
                        if(type=="addMore"){
                            this.tableData=this.tableData.concat(res[0].list);
                        }else{
                            this.listNoMore=false;
                            this.tableData=res[0].list || "";
                        }
                        if(res[0].pageTotal<=this.queryData.pageNum && !this.listNoMore){
                            this.listNoMore=true;
                        }else{
                            this.queryData.pageNum++;
                        }
                    }
                    this.dataLoading=false;
                }catch (e){
                    this.dataLoading=false;
                }
            },
            loadingMoreDatas(){
                if(!this.dataLoading){
                    this.postProjectListData("addMore");
                }
            }
        }
    }
</script>

<style lang="scss">
.m_project{
    .search{
        margin-bottom: 10px;
        .vux-search-box .weui-search-bar{
            background-color: #FFFFFF ;
            color:#999999;
        }
        .weui-search-bar__label {
            border-radius: 10px;
            background-color: #EFEFF4;
        }
        .weui-search-bar__form{
            background-color: #FFFFFF ;
        }
        .weui-search-bar__form:after{
            border: 0;
        }
        .weui-search-bar__label span{
            color: #999999;
        }
        .weui-search-bar__box{
            background-color: #EFEFF4;
            border-radius: 10px;
        }
    }
    .btnGroups{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        button{
            width: calc( 50% - 1px);
            float: left;
            height: 50px;
            background-color: #ffffff;
            color: #009EFF;
            font-size: 16px;
            border: 0;
            border-top: 1px solid #d9d9d9;
        }
        span{
            width: 1px;
            height: 30px;
            display: inline-block;
            background: #EDEDED;
            margin-top: 10px;
            float: left;
        }
    }
    .weui-actionsheet__action{
        .weui-actionsheet__cell{
            color: #999999;
        }
    }

}
</style>