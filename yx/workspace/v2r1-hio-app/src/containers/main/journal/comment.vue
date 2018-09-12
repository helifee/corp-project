<template>
    <div class="comment">
        <h3>我评论的 </h3>
        <div class="comment-content" v-loading="!sysTime">
            <date-week-demo :sysTime="sysTime" @curdate="getCurdate" v-loading="isLoadData" v-if="sysTime">

                <div slot="detail" class="date-option">

                    <div v-if="hasData">
                        <el-button  size="small"  :class="{allBtn:true,isAll:isAll}" @click="allComment">{{l('{journalLocale.dateWeek.all}')}}</el-button>
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

                        <ul style="margin-top: 30px" class="filter">
                            <li v-for="(item,index) in listData" @click="showDetailDialog(item.sid)">
                                <div class="avatar">
                                    <img :src="item.imgUrl || '/static/images/logo.png' " alt="">
                                </div>
                                <div class="filter-content">
                                    <p class="member">{{item.createPersonName?item.createPersonName:'--'}}</p>
                                    <pre v-html="item.content"></pre>
                                    <p class="time">{{item.updateDate}}</p>
                                </div>
                            </li>
                        </ul>
                        <div class="loading" v-if="loadMore"><i class="el-icon-loading"></i><span>正在加载中</span></div>
                        <div class="loading" v-else><span>没有更多了</span></div>
                    </div>
                    <div v-else class="noData">
                        <p>暂无数据</p>
                    </div>

                </div>
            </date-week-demo>
        </div>
        <dialog-detail :journal-id="journalId" :dialog-visible="detailDialogVisible"  @closeCreateModal="closeDetailDialog"></dialog-detail>
    </div>
</template>

<script>
    JZY.locale.add('journalLocale',require('./journal.locale'))
    import dateWeekDemo from '@Main/journal/components/dateWeekDemo.vue'
    import dialogDetail from '@Main/journal/components/dialog.detail.vue'
    import {postJournalCommentList,postJournalCondition} from '@Main/journal/getData.js'
    export default{
        components:{
            dateWeekDemo,
            dialogDetail
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
                this.rqJournalList3(this.pageNum,this.userIdList);

            },
            filterTreeChange(){
                this.selectedDataToTree = {...this.formGroupData}
                this.filterDataUrl = {
                    host:'GLOBAL.MA_CHANG_XI',
                    type:'get',
                    url:'/journal/comment/filter/'+this.curDate
                }
                this.$refs.filterTree.blendTreeDialogShow()
            },




            //删除用户setag的事件
            removePerson(sid) {
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
                    return item.sid != sid&&item.isCur;
                });

                this.userIdList = [];
                this.finalData.map((item)=>{
                    this.userIdList.push(item.sid);
                });
                this.pageNum = 1;

                if(!this.userIdList.length){
                    this.isAll = true;
                }
                this.isLoadData = true;
                this.rqJournalListFilter(this.pageNum,this.userIdList);

            },
            curFilter(index,sid){
//                let isCur = !this.filterData[index].isCur;
                if(this.filterData.length>0){
                    this.$set(this.filterData, index,{
                        ...this.filterData[index],
                        isCur: true
                    });
                    this.finalData = this.filterData.filter(function(item) {
                        return item.isCur;
                    });


                    this.userIdList = [];
                    this.finalData.map((item)=>{
                        this.userIdList.push(item.sid);
                    });
                    this.pageNum = 1;

//                    this.isLoadData = true;
//                    let hasSid = this.filterData.find((item)=>item.sid==sid)?true:false;
//                    if(!hasSid){
                        this.isLoadData = true;
                        this.rqJournalListFilter(this.pageNum,this.userIdList);
//                    }
                }

            },
            getCurdate(val,isCurDate){
                this.isAll = true;
                this.curDate = val;
                this.filterData = [];
                this.filterData = [];
                this.userData=[];
                this.userIdList=[];
                this.pageNum = "1";
                this.isLoadData = true;
                this.rqJournalList(this.pageNum);
            },
            closeDetailDialog(){
                this.detailDialogVisible = false;
            },
            showDetailDialog(id){
                this.journalId = id;
                this.detailDialogVisible = true;
            },
//            getUserTree:function(arr){
//                this.filterData = [...arr];
//                this.userData = [...arr];
//                this.finalData = [...arr];
//                this.pageNum = "1";
//                this.userIdList = [];
//                if(this.filterData.length>0){
//                    this.$set(this.filterData,0,{
//                        ...this.filterData[0],
//                        isCur:true
//                    });
////                if(arr){
////                    arr.map((item)=>{
////                        this.userIdList.push(item.sid);
////                    });
////                }
//                    this.userIdList.push(arr[0].sid);
//                    this.isAll = false;
////                    console.log(this.userIdList,"userIdListuserIdList")
//                }else{
//                    this.isAll = true;
//                    this.userIdList =  []
//                }
//                this.isLoadData = true;
////                console.log(this.userIdList,"userIdListuserIdList")
//                this.rqJournalList(this.pageNum,this.userIdList);
//
//            },
//            filterMethod(){
//                this.showUserTree = !this.showUserTree;
//                this.filterDataUrl.url = '/journal/comment/filter/'+this.curDate;
//            },
            allComment(){
                this.filterData = [];
                this.formGroupData.userList=[];
                this.selectedDataToTree = {...this.formGroupData}
                this.userIdList=[];
                this.isLoadData = true;
                this.pageNum = "1";
                this.isAll = true;
                this.rqJournalList(this.pageNum,this.userIdList);
            },
            //获取筛选日志列表
            async rqJournalListFilter(pageNum,userIdList){
                let queryData={};
                queryData.journalDate=this.curDate;
                queryData.pageNum=parseInt(pageNum);
                queryData.pageCount=10;
                queryData.userIdList = userIdList;
                let res = await postJournalCommentList(queryData);
                this.listData = [];
//                console.log(res,"获取日志列表");
                let len = res[0].list.length;
                if(len){
                    this.hasData = true;
                    this.listData =res[0].list;
                    if(len<10){
                        this.loadMore = false;
                    }
                }else{
//                    this.hasData = false;
                }
                this.isLoadData = false;
                this.pageNum++;
            },
            //获取日志列表
            async rqJournalList(pageNum,userIdList){
                let queryData={};
                queryData.journalDate=this.curDate;
                queryData.pageNum=parseInt(pageNum);
                queryData.pageCount=10;
                queryData.userIdList = userIdList;
                let res = await postJournalCommentList(queryData);
                let len = res[0].list.length;
                if(len){
                    this.hasData = true;
                    this.listData =res[0].list;
                    if(len<10){
                        this.loadMore = false;
                    }
                }else{
                    this.hasData = false;
                }
                this.isLoadData = false;
                this.pageNum++;
            },
            async rqJournalList2(pageNum){
                let queryData={};
                queryData.journalDate=this.curDate;
                queryData.pageNum=pageNum;
                queryData.pageCount=10;
                queryData.userIdList = this.userIdList;
                let res = await postJournalCommentList(queryData);

                let len = res[0].list.length;
                if(len){
                    this.hasData = true;
                    res[0].list.map(item=>{
                        this.listData.push(item);
                    })
                    if(len<10){
                        this.loadMore = false;
                    }
                }else{
                    this.loadMore = false;
                }
                this.isLoadData = false;
                this.loadLock = true;
                this.pageNum++;
            },
            //删选查看的时候切换
            async rqJournalList3(pageNum,userIdList){
                let queryData={};
                queryData.journalDate=this.curDate;
                queryData.pageNum=parseInt(pageNum);
                queryData.pageCount=10;
                queryData.userIdList = userIdList;
                let res = await postJournalCommentList(queryData);
//                console.log(res,"获取日志列表");
                let len = res[0].list.length;
                if(len){
                    this.hasData = true;
                    this.listData =res[0].list;
                    if(len<10){
                        this.loadMore = false;
                    }
                }else{
//                    this.hasData = false;
                    this.listData =res[0].list;
                }
                this.isLoadData = false;
                this.pageNum++;
            },
            //获取服务器时间
            async getSysTime(){
                let res = await JZY.xhr.r([{
                    type: 'get',
                    url: '/sys/common/getSysTime',
                    data: {}
                }], 'GLOBAL', false, {alertError:true,alertSuccess:false}).then((res) => {
                    try {
                        this.sysTime = res[0];
                        return res;

                    } catch (e) {

                        return false;
                    }
                }).catch((e) => {
                    //接口失败
                    throw new Error(e)
                });
            }


        },
        data(){
            return {
                isAll:true,
                detailDialogVisible:false,
                journalId:'',
                showUserTree:false,
                curDate:'',
                pageNum:"1",
                listData:[],
                userData:[],
                filterData:[],
                finalData:[],
                userIdList:[],
                isLoadData:false,
                loadMore:true,
                loadLock:true,//状态标记，
                hasData:false,//有数据，
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
                },
                sysTime:'',
            }
        },
        mounted (){

            let that = this;
            $(".comment").scroll(function(){
                //下面这句主要是获取网页的总高度，
                var htmlHeight=$(".comment")[0].scrollHeight;
                //clientHeight是网页在浏览器中的可视高度，
                var clientHeight=document.body.clientHeight||document.documentElement.clientHeight;
                //scrollTop是浏览器滚动条的top位置，
                var scrollTop=$(".comment").scrollTop();
                var scrollTop2=$(".comment").scrollTop()+clientHeight-66;
//                console.log(htmlHeight,clientHeight,scrollTop,scrollTop2,"htmlHeight,clientHeight,scrollTop")
                //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
                if(scrollTop+clientHeight-72==htmlHeight){
//                    console.log(that.loadLock,"that.loadLock");
                    this.loadMore = true;
                    if(that.loadLock&&that.loadMore){
//                        console.log(that.pageNum,"pageNum");
                        this.loadLock = false;
                        that.rqJournalList2(that.pageNum);
//                        console.log("获取更多")
                    }

                }
            })
        },
        created(){
            this.getSysTime();
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .comment{
        padding: 0 24px;
        height: 100%;
        overflow-y: auto;
        h3{
            line-height: 64px;
            font-size: 14px;
            font-weight: normal;
            color: #191919;
            padding: 0;
            margin: 0;
        }
        .comment-content{
            /*background-color: #ffffff;*/
            .date-option{
                padding: 12px 22px;
                .member {
                    color: $theme-blue;
                    font-size: 14px;
                    line-height: 32px;
                    margin: 0px;
                }
                pre{
                    font-size: 14px;
                    line-height: 24px;
                    color: $theme-black;
                }
                .time{
                    color: #666666;
                    font-size: 12px;
                    line-height: 24px;
                    display: inline-block;
                }
                .filter{
                    li{
                        position: relative;
                        border-top: 1px solid #ccc;
                        padding: 16px;
                        cursor: pointer;
                        .avatar{
                            width: 40px;
                            height: 40px;
                            background-color: #fff;
                            border-radius: 50%;
                            overflow: hidden;
                            position: absolute;
                            left: 20px;
                            top:20px;
                            img{
                                width: 40px;
                                height: 40px;
                            }
                        }
                        .filter-content{
                            margin-left:60px;
                        }
                    }

                }
            }
            .loading{
                text-align: center;
                line-height: 60px;
            }
        }

        .el-tag{
            background-color: #ffffff;
            cursor: pointer;
        }
        .el-tag:hover{
            background: rgba(64,158,255,.1);
        }
        .el-tag.cur{
            background: rgba(64,158,255,.1);
        }
        .allBtn.isAll{
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
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
