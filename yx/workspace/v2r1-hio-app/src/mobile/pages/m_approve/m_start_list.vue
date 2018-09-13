<template>
    <div class="start_list">
        <div class="clearfix">
            <div class="search-btn-box">

                <div class="search-btn" style="cursor: pointer" @click="toSearchPage">
                    <i class="search-i"></i>
                    <span>搜索</span>
                </div>
            </div>
        </div>
        <tab active-color='#009EFF'>
            <tab-item  selected @on-item-click="num='my'">我的</tab-item>
            <tab-item  active-class="current" v-for="(item,index) in list" :key="index" v-if="item.childList.length>0" @on-item-click="num=index">{{item.name}}</tab-item>
        </tab>
        <!-- 常用 -->
        <div class="cont-box" v-show="num=='my'">
            <!-- 我的发起 -->
            <div class="common my-start-box">
                <div class="tit">草稿</div>
                <div id="mystart-list">
                    <my_scroller ref="myScroll1" v-on:getList="getDraftList" v-on:gotoDetail="draftDetail" :pageNum="pageNum" :pageTotal="pageTotal" :isContinue="isContinue" scrollPage="draftList" :list="draftList"></my_scroller>
                </div>
            </div>
        </div>
        <div id="menu_list_data" v-show="num!='my'">
            <div class="cont-tab-box" v-show="index==num" v-for="(item,index) in list">
                <div class="list-sort-show">
                    <ul class="list-sort-ul">
                        <li @click="toApproveStart(n)" v-for="(n,i) in item.childList">
                            <h2 class="icon-my icon-my-s2">
                                <span class="title">{{n.name}}</span>
                            </h2>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem  } from 'vux'
    import my_scroller from '../../components/m_crm_scroll.vue'
    import service from '../../pages/m_approve/m_approve_service'
    export default {
        name:"m_start_list",
        components: {
            my_scroller,Tab,TabItem
        },
        data () {
            return {
                num:"my",
                list:[],
                draftList:[],
                pageNum:"1",
                pageCount:"10",
                pageTotal:"1",
                isContinue:false

            }
        },
        created(){
            document.title = '流程发起';
        },
        mounted(){
            this.getTemplateList();
            this.getDraftList();


        },
        methods: {
            toSearchPage(){
                this.$router.push({
                    name: 'm_start_search'
                });
            },
            toApproveStart(item){
                if(item.freeOrTemplate=="F"){
                    this.$router.push({
                        path: '/m_approve/m_approve_free',
                        query: {
                            id: item.sid,
                            code:item.code
                        }
                    });
                }else{
                    this.$router.push({
                        path: '/m_approve/m_approve_start',
                        query: {
                            id: item.sid,
                            code:item.code
                        }
                    });
                }

            },
            //草稿打开
            draftDetail(item){
                if(item.freeOrTemplate=="F"){
                    this.$router.push({
                        name: 'm_approve_free',
                        query: {
                            instanceId:item.id,
                            state:item.state
                        }
                    });
                }else{
                    this.$router.push({
                        name: 'm_approve_start',
                        query: {
                            instanceId:item.id,
                            state:item.state
                        }
                    });
                }
            },
            //分类和模板列表
            getTemplateList(){
                service.getTemplateList().then((data)=>{
                    console.log(data[0]);
                    this.list = data[0];
                });
            },
            //我的草稿
            getDraftList(pageNum){
                if(pageNum) this.pageNum = pageNum;
                const paramData = {
                    "state":4,
                    "startSign":1,
                    "flowType":"",
                    "startDate":"",
                    "endDate":"",
                    "pageNum":this.pageNum,
                    "pageCount":this.pageCount,
                    "orderby":[]
                }
                service.getMyDraftList(paramData).then((data)=>{
                    console.log(data[0]);
                    this.draftList.push.apply(this.draftList,data[0].list);
                    this.pageNum = data[0].pageNum;
                    this.pageTotal = data[0].pageTotal;
                    if(this.pageNum>=this.pageTotal){
                        this.isContinue = false;
                    }else{
                        this.isContinue = true;
                    }
                    this.$refs.myScroll1.isJixuFn(this.isContinue);
            });
            }


        }
    }
</script>

<style lang="scss" scoped>
    @import '../../static/css/fill-style.css';
    @import '../../static/css/list.css';
    .vux-tab .vux-tab-item{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
<style lang="scss">
    body{
        background: #fff!important;
        overflow: auto!important;
    }
</style>