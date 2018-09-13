<template>
    <div class="search-page">
        <div class="search-head clearfix">
            <div class="search-box">
                <i class="search-i"></i>
                <input type="text" placeholder="搜索" v-model="searchName"/>
                <span class="searchSpan" @click="clearInputVal">+</span>
            </div>
            <a class="cancel" @click="getTemplateList">确定</a>
        </div>
        <tab active-color='#009EFF' v-show="isShowList">
            <tab-item  selected @on-item-click="num='all'">全部</tab-item>
            <tab-item  active-class="current" v-for="(item,index) in list" :key="index" v-if="item.childList.length>0" @on-item-click="num=index">{{item.name}}</tab-item>
        </tab>
        <!-- 搜索记录为空 -->
        <div class="empty-box" v-show="isEmptyLog">
            <div class="empty-con">
                <div class="img"></div>
                <p>暂无搜索记录</p>
            </div>
        </div>
        <!-- 有记录 -->
        <div class="search-list bg searchRecentBox" v-show="!isEmptyLog && !isShowList">
            <div class="title-search">
                <h2 class="icon-my icon-my-s3">
                    最近搜索
                    <span class="close-span" @click="clearSerachLog"></span>
                </h2>
            </div>
            <div class="list-sort-show">
                <ul class="list-sort-ul" id="recentBoxUl">
                    <li v-for="(item,index) in searchLog" @click="clickRecentLog(item)">
                        <h2 class="icon-my icon-my-s2">
                            <span class="title">{{item}}</span>
                        </h2>
                    </li>
                </ul>

            </div>

        </div>
        <!-- 搜索列表 -->
        <div class="search-list" id="search_list" v-show="isShowList && num=='all'">
            <div class="list-sort-show">
                <ul class="list-sort-ul list-pad-left" id="searchListData">
                    <li v-for="(item,index) in list" v-if="item.childList.length>0">
                        <h2 class="icon-my icon-my-none">
                            <span class="title">{{item.name}}</span>
                        </h2>
                        <ul id="level2Ul">
                            <li v-for="(n,i) in item.childList" @click="toApproveStart(n)">
                                <h2 class="icon-my icon-my-s2">
                                    <span class="title">{{n.name}}</span>
                                </h2>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 菜单tab列表 -->
        <div class="search-list" id="search_menu_list" v-show="num!='all'">
            <div class="list-sort-show" v-show="num==index" v-for="(item,index) in list">
                <ul class="list-sort-ul list-pad-left" id="menu_con">
                    <li>
                        <h2 class="icon-my icon-my-none">
                            <span class="title">{{item.name}}</span>
                        </h2>
                        <ul id="htmlLevel2Ul">
                            <li v-for="(n,i) in item.childList" @click="toApproveStart(n)">
                                <h2 class="icon-my icon-my-s2">
                                    <span class="title">{{n.name}}</span>
                                </h2>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem  } from 'vux'
    import service from '../../pages/m_approve/m_approve_service'
    export default {
        name:"m_start_search",
        components: {
            Tab, TabItem
        },
        data () {
            return {
                searchName:"",
                num:"all",
                list:[],
                isShowList:false,
                isEmptyLog:false,
                searchLog:[]

            }
        },
        created(){
            document.title = '搜索流程模板';
        },
        mounted(){
            this.getRecentData();
        },
        methods: {
            clearInputVal(){
                this.searchName = "";
            },
            clickRecentLog(name){
                this.searchName = name;
                this.getTemplateList();
            },
            //确定搜索
            toApproveStart(item){
                if(item.freeOrTemplate=="F"){
                    this.$router.push({
                        name: 'm_approve_free',
                        query: {
                            id: item.sid,
                            code:item.code
                        }
                    });
                }else{
                    this.$router.push({
                        name: 'm_approve_start',
                        query: {
                            id: item.sid,
                            code:item.code
                        }
                    });
                }
            },
            //分类和模板列表
            getTemplateList(){
                const param = {
                    "name":this.searchName,
                    "userId":this.$store.state.session.sid,
                    "sign":"mobile"
                }
                service.getTemplateListBySearch(param).then((data)=>{
                    console.log(data[0]);
                    this.list = data[0];
                    this.isShowList = true;
                    this.isEmptyLog = false;
                    this.setSearchLog();
                });
            },
            clearSerachLog(){
                window.sessionStorage.setItem('recentSearch',"");
                this.isEmptyLog = true;
            },
            setSearchLog(){
                if(!this.searchName) return;
                let conList = window.sessionStorage.getItem('recentSearch');
                if(!conList){
                    conList = [];
                }else{
                    conList = JSON.parse(conList);
                    if(conList.length>4){
                        conList.splice(0,1);
                    }
                }
                conList.push(this.searchName);
                window.sessionStorage.setItem('recentSearch',JSON.stringify(conList));
            },
            getRecentData(){
                let result = window.sessionStorage.getItem("recentSearch");
                if(!result){//搜索记录为空
                    this.isEmptyLog = true;
                }else{
                    this.isEmptyLog = false;
                    this.searchLog = JSON.parse(result);
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../static/css/fill-style.css';
    @import '../../static/css/list.css';
    #searchListData .icon-my,#search_menu_list .icon-my{
        margin-left: 0;
    }
    .vux-tab .vux-tab-item{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
<style>
    body{
        background: #fff!important;
        overflow: auto!important;
    }
</style>