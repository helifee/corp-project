<template>
    <div class="wrap" v-loading="loading">
        <div class="head clearfix">
            <div class="head-left">
                查看人员：
                <el-button size="small" :class="{allBtn:true,isAll:isAll}"  @click="allplan(1)">全部</el-button>
                <span v-for="(item,index) in filterData" @click="curFilter(index,item.sid)">
                    <el-tag
                            :class="{cur:item.isCur}"
                            :key="index"
                            closable
                            @close="removePerson(item.sid)"
                            :disable-transitions=true
                            style="margin-right: 10px">
                        {{item.name}}
                    </el-tag>
                </span>
                &nbsp;&nbsp;&nbsp;
                <!--<span  style="color: #00a0e9;cursor: pointer"  @click="filterMethod">筛选查看</span>-->
                <span  style="color: #00a0e9;cursor: pointer"  @click="filterTreeChange">筛选查看</span>

                <blend-tree
                        ref= "filterTree"
                        :resultDataListShow="false"
                        :enable-checked-multiple = "true"
                        :filterDataUrl = "filterDataUrl"
                        :tagButtons="['user']"
                        activeTab = "user"
                        :selectedDataToTree = "selectedDataToTree"
                        @getDataFromTree = "getDataFromTree">
                </blend-tree>

            </div>
            <el-select v-model="planType" style="margin-top: 12px;"  size="small" placeholder="请选择" class="head-right">
                <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                </el-option>
            </el-select>
        </div>
        <div class="plan-content"  v-show="hasData" >
            <div class="plan-list">
                <ul>
                    <li @click="handleClick(item.sid)" v-for="(item,index) in commentList">
                        <p>{{item.planTitle}}</p>
                        <span>{{item.publishDate}}</span>
                    </li>
                    <div class="load-more">
                        <div class="loading" v-if="loadMore"><i class="el-icon-loading"></i><span>正在加载中</span></div>
                        <!--<div class="loading" v-else><span>没有更多了</span></div>-->
                    </div>

                </ul>
            </div>
            <div class="creatPagePanels" v-loading="loadDetail">
                <report-Detail :detailData="detailData"  v-if="detailData.sid" :type="detailType" style="padding: 0px 24px"></report-Detail>
                <div v-else  class="noData"><p>该计划不存在</p></div>
            </div>
        </div>
        <!--<el-row :gutter="0" class="plan-content"  v-show="hasData"   style="margin-top: 10px">-->
            <!--<el-col :span="6" class="plan-list">-->
                <!--&lt;!&ndash;<el-tabs tab-position="left" type="card" id="leftTab" class="creatPageTabs" v-model="activeName" @tab-click="handleClick">&ndash;&gt;-->
                <!--&lt;!&ndash;<el-tab-pane v-for="(item,index) in approveInfo" @click="getData(item.id)" :id="item.id" :key="item.id" :label="item.name" :name = " 'list-' + index "></el-tab-pane>&ndash;&gt;-->
                <!--&lt;!&ndash;</el-tabs>&ndash;&gt;-->
                <!--<ul>-->
                    <!--<li @click="handleClick(item.sid)" v-for="(item,index) in commentList">-->
                        <!--<p>{{item.planTitle}}</p>-->
                        <!--<span>{{item.publishDate}}</span>-->
                    <!--</li>-->
                    <!--<div class="load-more">-->
                        <!--<div class="loading" v-if="loadMore"><i class="el-icon-loading"></i><span>正在加载中</span></div>-->
                        <!--<div class="loading" v-else><span>没有更多了</span></div>-->
                    <!--</div>-->

                <!--</ul>-->

            <!--</el-col>-->
            <!--<el-col :span="18">-->
                <!--&lt;!&ndash;tabs对应的content内容&ndash;&gt;-->
                <!--&lt;!&ndash;wibdknljk&ndash;&gt;-->
                <!--<el-row :gutter="0" class="creatPagePanels" v-loading="loadDetail">-->
                    <!--<el-col :span="24">-->
                        <!--<report-Detail :detailData="detailData" :type="detailType" style="padding: 30px"></report-Detail>-->
                    <!--</el-col>-->
                <!--</el-row>-->
            <!--</el-col>-->
        <!--</el-row>-->
        <div v-show="!hasData" class="noData"><p>暂无内容</p></div>
        <user-tree
                v-if="showUserTree"
                :selectUserDialogVisible="showUserTree"
                @closeCreateModal ="showUserTree = !showUserTree"
                :show-inside-outside-tabs=false
                :selectedUsers = "filterData"
                @getUserTree = "getUserTree"
                :filterDataUrl = "filterDataUrl"
                :enable-checked-multiple=true>

            <!--:filterDataUrl = '/journal/journal/selectCondition'-->
        </user-tree>
    </div>
</template>

<script>
    JZY.locale.add('planLocale',require('./plan.locale'))
    import reportDetail from '@Main/plan/report.Detail.vue'
    import {postPlanCommentList,getPlan} from '@Main/plan/getData.js'
    import moment from 'moment'
    export default{
        components:{
            reportDetail
        },
        methods:{
            getDataFromTree( obj = {} ){
                this.formGroupData = {...obj};

                this.filterData = [...obj.userList];
                this.formGroupData.userList = [...obj.userList];
                this.finalData = [...obj.userList];
                this.pageNum = 1;
                this.userIdList = [];
                if(this.formGroupData.userList.length>0){
                    this.$set(this.filterData,0,{
                        ...this.filterData[0],
                        isCur:true
                    });
                    this.userIdList.push(obj.userList[0].sid);
                    this.isAll = false;
                }else{
                    this.isAll = true;
                    this.userIdList =  []
                }
                this.isLoadData = true;
                this.detailData = {};
                this.initPlanCommentList1(1);

            },
            filterTreeChange(){
                this.selectedDataToTree = {...this.formGroupData}
                this.filterDataUrl = {
                    host:'GLOBAL.MA_CHANG_XI',
                    type:'get',
                    url:'/plan/comment/filter'
                }
                this.$refs.filterTree.blendTreeDialogShow()
            },

            //删除用户setag的事件
            removePerson(sid) {
                console.log(sid)
                this.filterData =  this.filterData.filter(function(item) {
                    return item.sid != sid;
                });
                this.formGroupData.userList =  this.formGroupData.userList.filter(function(item) {
                    return item.sid != sid;
                });
                this.selectedDataToTree = {...this.formGroupData}
                if(+this.filterData.length){
                    this.$set(this.filterData,0,{
                        ...this.filterData[0],
                        isCur:true
                    });
                }
                this.finalData = this.filterData.filter(function(item) {
//                    console.log(item.sid != sid,"sidsidsidsidsidsidsidsidsid")
//                    console.log(item.isCur,"isCurisCurisCurisCurisCur")
                    return item.sid != sid&&item.isCur;
                });
//                this.filterData = this.finalData;
//                console.log(this.finalData,"finalDatafinalDatafinalData")

                this.userIdList = [];
                this.finalData.map((item)=>{
                    this.userIdList.push(item.sid);
                });
                this.pageNum = 1;

                if(!this.userIdList.length){
                    this.isAll = true;
                }
                this.isLoadData = true;
                this.pageNum = 1;

//                this.commentList = [];
                this.rqPlanCommentListFilter(this.pageNum);

            },
            curFilter(index,sid){
//                let isCur = !this.filterData[index].isCur;

                if(this.filterData.length>0){
                    this.$set(this.filterData,index,{
                        ...this.filterData[index],
                        isCur:true
                    });
                    this.finalData = this.filterData.filter(function(item) {
                        return item.isCur;
                    });
                    this.userIdList = [];
                    this.finalData.map((item)=>{
                        this.userIdList.push(item.sid);
                    });
                    this.pageNum = 1;
                    this.isLoadData = true;
//                    let hasSid = this.filterData.find((item)=>item.sid==sid)?true:false;
//                    if(!hasSid){
                        this.rqPlanCommentListFilter(this.pageNum);
//                    }
                }

            },
            handleClick(sid) {
                this.loadDetail = true;
                this.rqGetPlan(sid);
            },
            allplan(){
//                this.planType = -1;
                this.userIdList = [];
                this.filterData = [];
                this.formGroupData.userList=[];
                this.selectedDataToTree = {...this.formGroupData}
                this.isLoadData = true;
                this.pageNum = 1;
                this.isAll = true;
                this.initPlanCommentList(this.pageNum);
            },

            async rqPlanCommentListFilter(pageNum){
                let res = await postPlanCommentList(this.planType,this.userIdList,pageNum,20);
//                console.log(res,"res成功啊 啊啊");
//                console.log(JSON.stringify(res));
                this.commentList = [];
                if(res[0].list[0]){
                    this.loading = true;
                    this.detailId = res[0].list[0].sid;
                    this.rqGetPlan(res[0].list[0].sid);
                    res[0].list.map(item=>{
                        item.publishDate = moment(item.publishDate).format("YYYY-MM-DD")
                        this.commentList.push(item);
                    });
                    let len = res[0].list.length;
                    if(len<20){
                        this.loadMore = false;
                    }else{
                        this.loadMore = true;
                    }
                    this.pageNum++;
                    this.hasData = true;

                }else{
                    this.hasData = false;
                }


                this.loadLock = true;
                this.loading=false;
            },
            async rqPlanCommentList(pageNum){
                let res = await postPlanCommentList(this.planType,this.userIdList,pageNum,20);
//                console.log(res,"res成功啊 啊啊");
//                console.log(JSON.stringify(res));

                let len = res[0].list.length;
                res[0].list.map(item=>{
                    item.publishDate = moment(item.publishDate).format("YYYY-MM-DD")
                    this.commentList.push(item);
                });
                if(len<20){
                    this.loadMore = false;
                }else{
                    this.loadMore = true;
                }
                this.pageNum++;


                this.loadLock = true;
                this.loading=false;
            },
            async initPlanCommentList(pageNum){
                let res = await postPlanCommentList(this.planType,this.userIdList,pageNum,20);
//                console.log(res[0],"res成功啊 啊啊");
//                console.log(JSON.stringify(res[0]));
                this.commentList = [];
                this.loading = false;
                this.loadLock = true;
                if(res[0].list[0]){
                    this.loading = true;
                    this.detailId = res[0].list[0].sid;
                    this.rqGetPlan(res[0].list[0].sid);
                    res[0].list.map(item=>{
                        item.publishDate = moment(item.publishDate).format("YYYY-MM-DD")
                        this.commentList.push(item);
                    });
                    let len = res[0].list.length;
                    if(len<20){
                        this.loadMore = false;
                    }else{
                        this.loadMore = true;
                    }
                    this.pageNum++;
                    this.hasData = true;

                }else{
                    this.hasData = false;
                }

            },
            async initPlanCommentList1(pageNum){
                let res = await postPlanCommentList(this.planType,this.userIdList,pageNum,20);
                this.commentList = [];
                this.loading = false;
                this.loadLock = true;
                if(res[0].list[0]){
                    this.loading = true;
                    this.detailId = res[0].list[0].sid;
                    this.rqGetPlan(res[0].list[0].sid);
                    res[0].list.map(item=>{
                        item.publishDate = moment(item.publishDate).format("YYYY-MM-DD")
                        this.commentList.push(item);
                    });
                    let len = res[0].list.length;
                    if(len<20){
                        this.loadMore = false;
                    }else{
                        this.loadMore = true;
                    }
                    this.pageNum++;
                    this.hasData = true;

                }else{
//                    this.hasData = false;
                }

            },
            //计划详情
            async rqGetPlan(id){
                let res = await getPlan(id);
                this.detailData = {...res};
//                this.detailType = this.detailData.planType;
                switch(this.detailData.planType) {
                    case 0:
                        this.detailType = 'week';
                        break;
                    case 1:
                        this.detailType = 'month';
                        break;
                    case 2:
                        this.detailType = 'quarter';
                        break;
                    case 3:
                        this.detailType = 'year';
                        break;
                }
                this.loading=false;
                this.loadDetail = false;
//                console.log(res,"计划详情计划详情计划详情 啊啊");
            },
        },
        data(){
            return {
                isAll:true,
                loading:false,
                loadDetail:false,
                loadMore:true,
                loadLock:false,
                detailData:{},
                detailType:'',
                detailId:'',
                commentList:[],
                hasData:false,

                filterDataUrl:{
                    host:'GLOBAL.SHANG_BIN',
                    type:'get',
                    url:'/plan/comment/filter'
                },
                filterData:[],

                finalData:[],
                typeOptions:[{
                    value: -1,
                    label: '全部'
                },{
                    value: 0,
                    label: '周报'
                }, {
                    value: 1,
                    label: '月报'
                }, {
                    value: 2,
                    label: '季度报'
                }, {
                    value: 3,
                    label: '年度报'
                }
                ],
                planType:-1,
                userIdList:[],
                pageNum:1,
                showUserTree:false,
                tabType:0,
                filterDataUrl:{
                    host:'',
                    type:'',
                    url:'',
                },
                selectedDataToTree:{
                    userList:[]
                },
                formGroupData:{
                    userList:[]
                }
            }
        },
        mounted (){
            this.loading=true;
            this.initPlanCommentList(1);


            let that = this;
            $(".plan-list").scroll(function(){
                //下面这句主要是获取网页的总高度，
                var htmlHeight=$(".plan-list")[0].scrollHeight;
                //clientHeight是网页在浏览器中的可视高度，
                var clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
                //scrollTop是浏览器滚动条的top位置，
                var scrollTop=$(".plan-list").scrollTop();
                var scrollTop2=$(".plan-list").scrollTop()+clientHeight-72;
//                console.log(htmlHeight,clientHeight,scrollTop,scrollTop2,"htmlHeight,clientHeight,scrollTop")
//                console.log(htmlHeight,scrollTop2,"htmlHeight,scrollTop2")
                //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
                if(scrollTop+clientHeight-72>=htmlHeight){
                    if(that.loadLock&&that.loadMore){
                        that.loadLock = false;
//                        that.loadMore = true;
//                        console.log('加载更多')
                        that.rqPlanShareList(that.pageNum);
                    }
                }
            })



        },
        watch:{
            planType:{
                handler:function (newVal) {
                    this.loading=true;
                    this.planType = newVal;
                    this.commentList = [];
                    this.isLoadData = true;
                    this.pageNum = 1;
                    this.initPlanCommentList(1);
                }
            },

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped="">

    $color:#303133;
    $borderColor:#dcdfe6;
    .wrap{
        /*overflow: hidden;*/
        /*position: relative;*/
        height: 100%;
        overflow-y: auto;
        background: #ffffff;
        .head{
            line-height: 64px;
            padding: 0 24px ;
            border-bottom: 1px solid $theme-grey-table-border;
            .head-left{
                float: left;
            }
            .head-right{
                float: right;
            }
        }
        .all{
            text-align: center;
            line-height: 80px;
        }
        .plan-content{
            height:calc(100% - 120px);
            position: relative;
            .plan-list{
                position: fixed;
                border-right: 1px solid $theme-grey-table-border;
                height: calc(100% - 180px);
                /*padding-bottom: 40px;*/
                width: 255px;
                overflow-y: auto;
                ul{
                    li{
                        padding: 10px 24px;
                        border-bottom: 1px solid $theme-grey-table-border;
                        span{
                            color: #999;
                            font-size: 12px;
                        }
                        cursor: pointer;
                    }
                    li:last-of-type{
                        border-bottom: 0px none;
                    }
                    li:hover,li.cur{
                        background-color: #f0f0f0;
                    }
                    .load-more{
                        color: #999;
                        font-size: 12px;
                        text-align: center;
                        line-height: 46px;
                    }
                }
            }
            .creatPagePanels{
                height: 108%;
                overflow-y: auto;
                border-left:none;
                padding: 0 0px;
                padding-left: 254px;
                .subItems{
                    padding:18px 10px;
                    ul{
                        padding:0;
                        margin: 0;
                        li{
                            list-style: none;
                            height: 75px;
                            width: calc(23% - 17px);
                            line-height: 22px;
                            padding-top: 10px;
                            margin-left: 1%;
                            margin-right: 1%;
                            margin-bottom: 13px;
                            padding-left: 17px;
                            float: left;
                            font-size: 15px;
                            display: inline-block;
                            background-color:rgba(69, 167, 254, 0.2);
                            overflow: hidden;
                            &:hover{
                                cursor: pointer;
                                color: #fff;
                                background-color:rgba(0, 204, 255, 1);
                                box-shadow:5px 5px 5px rgba(69, 167, 254, 0.2);
                            }
                        }
                    }
                }
            }
        }
        .el-tag{
            background-color: #ffffff;
            cursor: pointer;
        }
        .el-tag:hover{
            background: $theme-blue-header-active;
        }
        .el-tag.cur{
            background: $theme-blue-header-active;
        }
        .allBtn.isAll{
            color: #fff;
            background-color: $theme-blue;
            border-color: $theme-blue;
        }
        .noData{
            p{
                text-align: center;
                color: $theme-black-other;
                font-size: 12px;
            }
        }
    }
</style>
