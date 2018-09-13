<template>
    <div class="news-wrap">
        <div class="content-title">
            <h3>{{title}}</h3>
            <div class="news-tab" v-if="management"  >
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="all">

                    </el-tab-pane>
                    <el-tab-pane :label="l('{newsLocale.kewWords.unpublished}')" name="unPublish">

                    </el-tab-pane>
                    <el-tab-pane :label="l('{newsLocale.kewWords.published}')" name="publish">
                    </el-tab-pane>
                </el-tabs>
            </div>
            <el-form class="news-search" :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" style="">
                <el-form-item prop="searchVal">
                    <el-input  size="small" v-model="searchForm.searchVal"   placeholder="输入文章名称..." style="width: 248px">
                        <i
                            class="el-input__icon input-line"
                            slot="suffix">
                        </i>
                        <i
                            class="el-icon-search el-input__icon input-search"
                            slot="suffix"
                            @click="search('searchForm')">
                        </i>
                    </el-input>
                </el-form-item>
                <!--<el-form-item>-->
                    <!--<el-button  size="small" type="primary" @click="search('searchForm')">{{l('{newsLocale.kewWords.search.searchBtn}')}}</el-button>-->
                    <!--<el-button  size="small" @click="resetForm('searchForm')">{{l('{newsLocale.kewWords.search.resetBtn}')}}</el-button>-->
                <!--</el-form-item>-->
            </el-form>
            <el-button v-if="management" size = "small" type="primary" class="add-news" @click="showNewsDialog"><i class="el-icon-plus"></i> {{l('{newsLocale.kewWords.newArticle}')}}</el-button>
        </div>
        <!--检索内容-->
        <!--<el-form :inline="true" :model="searchForm" :rules="searchRules" ref="searchForm" style="padding-left: 22px;margin-top: 20px">-->
            <!--<el-form-item :label=" l('{newsLocale.kewWords.search.content}')+'：'" prop="searchVal">-->
                <!--<el-input  size="small" v-model="searchForm.searchVal"  clearable  placeholder="输入文章名称" style="width: 540px"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button  size="small" type="primary" @click="search('searchForm')">{{l('{newsLocale.kewWords.search.searchBtn}')}}</el-button>-->
                <!--<el-button  size="small" @click="resetForm('searchForm')">{{l('{newsLocale.kewWords.search.resetBtn}')}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <div v-loading="loading" style="min-height: 500px">
            <div v-if="tabType == 0">
                <!--检索结果-->
                <div class="search-result">
                    <div v-for="item,index in newsDataList" :key="index" >
                        <i class="el-icon-tickets"></i>
                        <router-link tag="div" class="news-brief-panel" :to="'/news/classification/'+columnId+'/' + item.sid ">
                            <div class="news-title">{{item.title}}&nbsp;&nbsp;<span class="red" v-if="+item.isNew">new</span>&nbsp;&nbsp;<span v-if="item.newsTop=='1'" class="news-top">top</span></div>
                            <div class="news-info" v-if="+item.status">
                                {{item.newsTypeName}}<span class="news-line">|</span>{{item.createPersonName}}&nbsp;&nbsp;{{l('{newsLocale.kewWords.publishedIn}')}}{{item.publishDate}}<span class="news-line">|</span>{{item.hitNum}}{{l('{newsLocale.kewWords.times}')}}
                            </div>
                            <div class="news-info" v-else>
                                {{item.newsTypeName}}<span class="news-line">|</span>{{item.createPersonName}}&nbsp;&nbsp;保存于{{item.publishDate}}<span class="news-line">|</span>{{item.hitNum}}{{l('{newsLocale.kewWords.times}')}}
                            </div>
                            <div class="news-brief">
                                <div class="news-brief-content">{{item.headline}}</div>
                            </div>

                        </router-link>
                    </div>
                    <div class="loading" v-if="loadMore"><i class="el-icon-loading"></i><span>正在加载中</span></div>
                    <div class="loading" v-else-if="!loadMore"><span>没有更多了</span></div>
                </div>
            </div>
            <div v-if="tabType == 1">
                <!--检索结果-->
                <div class="search-result">
                    <div v-for="item,index in newsDataList" :key="index" >
                        <i class="el-icon-tickets"></i>
                        <router-link tag="div" class="news-brief-panel" :to="'/news/classification/'+columnId+'/' + item.sid ">
                            <div class="news-title">{{item.title}}&nbsp;&nbsp;<span class="red" v-if="item.isNew">new</span>&nbsp;&nbsp;<span v-if="item.newsTop=='1'" class="news-top">top</span></div>
                            <div class="news-info">
                                {{item.newsTypeName}}<span class="news-line">|</span>{{item.createPersonName}}&nbsp;&nbsp;保存于{{item.publishDate}}<span class="news-line">|</span>{{item.hitNum}}{{l('{newsLocale.kewWords.times}')}}
                            </div>
                            <div class="news-brief">
                                <div class="news-brief-content">{{item.headline}}</div>
                            </div>
                        </router-link>
                    </div>

                    <div class="loading" v-if="loadMore"><i class="el-icon-loading"></i><span>正在加载中</span></div>
                    <div class="loading" v-else><span>没有更多了</span></div>
                </div>
            </div>
            <div v-if="tabType == 2">
                <!--检索结果-->
                <div class="search-result">
                    <div v-for="item,index in newsDataList" :key="index" >
                        <i class="el-icon-tickets"></i>
                        <router-link tag="div" class="news-brief-panel" :to="'/news/classification/'+columnId+'/' + item.sid ">
                            <div class="news-title">{{item.title}}&nbsp;&nbsp;<span class="red" v-if="item.isNew">new</span>&nbsp;&nbsp;<span v-if="item.newsTop=='1'" class="news-top">top</span></div>
                            <div class="news-info">
                                {{item.newsTypeName}}<span class="news-line">|</span>{{item.createPersonName}}&nbsp;&nbsp;{{l('{newsLocale.kewWords.publishedIn}')}}{{item.publishDate}}<span class="news-line">|</span>{{item.hitNum}}{{l('{newsLocale.kewWords.times}')}}
                            </div>
                            <div class="news-brief">
                                <div class="news-brief-content">{{item.headline}}</div>
                            </div>
                        </router-link>
                    </div>
                    <div class="loading" v-if="loadMore"><i class="el-icon-loading"></i><span>正在加载中</span></div>
                    <div class="loading" v-else><span>没有更多了</span></div>
                </div>
            </div>
        </div>
        <dialog-add-news  :dialog-visible="newsDialogVisible" :columnId="columnId" @closeCreateModal="closeNewsDialog" @refreshList="refreshList"></dialog-add-news>
    </div>
</template>

<script>
    import dialogAddNews from '@Main/news/components/dialog.addNews.vue'
    import {postNewsList} from '@Main/news/getData.js'
    import moment from 'moment'
    export default{
        props:{
            title:{
                required:false
            },
            columnId:{
                required:false
            },
        },
        components: {
            dialogAddNews,
        },
        methods:{
            closeNewsDialog(){
                this.newsDialogVisible = false;
            },
            showNewsDialog(){
                this.newsDialogVisible = true;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.newsTitle = '';
                this.loading = true;
                this.newsDataList = [];
                this.pageNum = 1;
                this.rqNewsList(1);
            },
            search (formName){
                this.$refs[formName].validate((valid) => {
                    this.newsTitle = this.searchForm.searchVal;
                    this.newsDataList = [];
                    this.loading = true;
                    this.pageNum = 1;
                    this.rqNewsList(1);
                })
            },
            refreshList(){
                this.newsDataList = [];
                this.pageNum = 1;
                this.rqNewsList(1);
            },
            //切换类别
            handleClick(tab, event) {
                this.tabType = tab.index;
                this.$refs['searchForm'].resetFields();
                this.newsTitle = '';
                this.pageNum = 1;
                this.newsDataList = [];
                this.loadLock = false;
                this.loadMore = true;
                if(tab.index == 0){
                    this.newsStatus = -1;
                }else if(tab.index == 1){
                    this.newsStatus = 0;
                }else if(tab.index == 2){
                    this.newsStatus = 1;
                }
                this.loading = true;
                this.rqNewsList(1);
            },
            //新闻列表
            async rqNewsList(pageNum){
                let res = await postNewsList(this.newsTitle.trim(),this.newsTypeId,this.newsStatus,pageNum,10);
                let len = res[0].list.length;
                if(len){
                    res[0].list.map(item=>{
                        let today = moment().format("YYYY-MM-DD");
                        let beforeDay = moment(today).subtract(1, "days").format("YYYY-MM-DD") +'00:00:00';
                        let threeBeforeDay = moment(today).subtract(3, "days").format("YYYY-MM-DD HH:mm:ss");
                        let publishTime = moment(item.publishDate).format("YYYY-MM-DD HH:mm:ss");
                        if(publishTime>beforeDay){
                            item.publishDate = moment(item.publishDate).format("HH:mm:ss");
                        }
                        if((publishTime>threeBeforeDay)&&item.status){
                            item.isNew = true;
                        }else{
                            item.isNew = false;
                        }
                        this.newsDataList.push(item);
                        this.loadLock = true;
                    });
                    this.pageNum++;
                    if(len<10){
                        this.loadMore = false;
                        this.loadLock = false;
                    }
//                    setTimeout(function () {
//                        $(".news-brief").each(function(i){
//                            var divH = $(this).find(".news-brief-content").height();
//                            if (divH > 48) {
//                                $(this).find(".tip").show();
//                            }else{
//                                $(this).find(".tip").hide();
//                            }
//                        });
//                    },200);
                }else{
                    this.loadMore = false;
                    this.loadLock = false;
                }
                this.loading = false;
            },
        },
        computed:{
        },
        data(){
            return {
                management:JZY.s.hasMenuPermisson('news_view','modify'),
                newsDialogVisible:false,
                newsDataList:[],
                newsTitle:'',
                newsTypeId:'',
                newsStatus:-1,
                pageNum:1,
                loading:false,
                loadLock:false,
                loadMore:true,
                tabType:0,
                activeName: 'all',
                searchForm:{
                    searchVal:'',
                },
                searchRules:{
                    searchVal: [
                        { required: false, message: '请输入检索内容', trigger: 'blur' },
                        { pattern: /^[^/&'<>%*\\]*$/, message: '存在不合法字符', trigger: 'blur' }
                    ]
                },
            }
        },
        mounted() {
            this.newsDataList = [];
            this.newsStatus = -1;
            this.activeName = 'all';
            if(this.columnId == 'all'){
                this.newsTypeId = '';
                this.loading = true;
                this.pageNum = 1;
                this.rqNewsList(1);
            }else {
                this.$refs['searchForm'].resetFields();
                this.newsTitle = '';
                this.loading = true;
                this.newsDataList = [];
                this.pageNum = 1;
                this.newsTypeId = this.columnId;
            }

            let that = this;
            $(".router-wrapper").scroll(function(){
                //下面这句主要是获取网页的总高度，
                var htmlHeight=$(".router-wrapper")[0].scrollHeight;
                //clientHeight是网页在浏览器中的可视高度，
                var clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
                //scrollTop是浏览器滚动条的top位置，
                var scrollTop=$(".router-wrapper").scrollTop();
                var scrollTop2=$(".router-wrapper").scrollTop()+clientHeight-66;
//                console.log(htmlHeight,clientHeight,scrollTop,scrollTop2,"htmlHeight,clientHeight,scrollTop")
//                console.log(htmlHeight,scrollTop2,"htmlHeight,scrollTop2")
                //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
                if(scrollTop+clientHeight-66>=htmlHeight){
                    console.log("aa")
                    if(that.loadLock){
//                        console.log(that.pageNum,"pageNum");
                        that.loadLock = false;
                        that.loadMore = true;
                        that.rqNewsList(that.pageNum);
//                        console.log("获取更多")
                    }
                }
            })

//            $(window).resize(function () {
//                setTimeout(function () {
//                    $(".news-brief").each(function(i){
//                        var divH = $(this).find(".news-brief-content").height();
//                            $(this).find(".tip").show();
//                        }else{
//                            $(this).find(".tip").hide();
//                        }
//                    });
//                },200);
//            });


        },
        watch: {
            'columnId':function(curVal,oldVal){
//                console.log(curVal);
                if(curVal == 'all'){
                    this.newsTypeId = '';
                }else {
                    this.$refs['searchForm'].resetFields();
                    this.newsTitle = '';
                    this.newsDataList = [];
                    this.newsStatus = -1;
                    this.newsTypeId = curVal;
                    this.activeName = 'all';
                    this.loading = true;
                }
                this.pageNum = 1;
                this.rqNewsList(1);
            },
            'testVal':function (curVal,oldVal) {
//                let value =  newValue.toString().replace(/(^|\s)\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
//                this.testVal =curVal+'111';
            }
        },

    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
    .news-wrap{
        background: #ffffff;
        .content-title{
             position: relative;
             margin-left: 24px;
             margin-right: 24px;
             line-height: 64px;
             height: 64px;
             border-bottom: 1px solid $theme-grey-table-border;
             h3{
                 height: 64px;
                 text-align: left;
                 font-size: 14px;
                 font-weight: normal;
                 color: $theme-black-title;
                 margin: 0 40px 0 0;
                 padding: 0;
                 float: left;
             }
            .news-search{
                position: absolute;
                right: 120px;
                top: 14px;
                .input-line{
                    border-left: 1px solid $theme-grey-input-border;
                    margin-right: 32px;
                }
                .input-search{
                    position: absolute;
                    right: 0;
                    top: 3px;
                    width: 32px;
                    height: 20px;
                    color: $theme-blue;
                    font-size: 18px;
                    vertical-align: middle;
                    font-weight: 800;
                    cursor: pointer;
                }
                .input-search:hover{
                    color: $theme-blue-active;
                }
            }
             .add-news{
                 position: absolute;
                 right: 0px;
                 top:16px;
             }
        }




        .el-pagination{
            float: right;
        }
    }
    .search-result{
        padding: 0 24px 20px;
        margin-top: -1px;
        .el-icon-tickets{
            padding-top: 24px;
            color: $theme-blue;
            float: left;
        }
    }
    .news-brief-panel{
        display: block;
        background-color: #fff;
        overflow: hidden;
        cursor: pointer;
        border-top: 1px solid $theme-grey-table-border;
        padding: 20px 0;
        margin: 0px;
        .news-title{
            min-width: 600px;
            padding: 0px 22px 0 8px;
            font-size: 14px;
            color: #333333;
        }
        .news-brief{
            margin: 0;
            padding: 0px 0px 0 8px;
            font-size: 14px;
            line-height: 24px;
            overflow:hidden;
            position: relative;
            .news-brief-content{
                color: $theme-black;
                font-size: 12px;
            }
        }
        .news-info{
            line-height: 46px;
            padding: 0 20px 0 8px;
            color: #9B9B9B;
            font-size: 12px;
            .news-line{
                color: $theme-grey-table-border;
                margin: 0 16px;
            }
        }
        &:hover{
            /*box-shadow:2px 3px 5px #888888;*/
        }

        .news-top{
            color: $theme-blue;
        }
        .red{
            color: #F05A5A;
        }
    }
    .loading{
        font-size: 12px;
        color: $theme-black-other;
        text-align: center;
        margin-top: 16px;
    }
</style>
<style rel="stylesheet/scss" lang="scss">
    .news-tab{
        margin: 0;
        .el-tabs__item{
            font-size: 12px;
        }
        .el-tabs__active-bar{
            display: none;
        }
        .el-tabs__nav-wrap::after{
            display: none;
        }
    }
</style>
