<template>
    <div class="wrap" v-loading="loading">
        <div v-if="!noData">
            <div class="operation">
                <ul>
                    <li v-if="management&&hasEdit">
                        <el-dropdown  @command="handleCommand"  size = "small" >
                            <el-button type="primary"  size = "small" >
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="showNewsDialog">编辑</el-dropdown-item>
                                <el-dropdown-item command="cancelRelease" v-if="+newsData.status">取消发布</el-dropdown-item>
                                <el-dropdown-item command="release" v-else-if="!newsData.status">发布</el-dropdown-item>
                                <el-dropdown-item command="postTopCancel" v-if="+newsData.newsTop">取消置顶</el-dropdown-item>
                                <el-dropdown-item command="postTop" v-else-if="!newsData.newsTop">置顶</el-dropdown-item>
                                <el-dropdown-item command="delNews">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                    <!--<li v-if=""><el-button @click="showNewsDialog()">编辑</el-button></li>-->
                    <!--<li v-if="newsData.status" ><el-button @click="cancelRelease">取消发布</el-button></li>-->
                    <!--<li v-else-if="!newsData.status"><el-button @click="release">发布</el-button></li>-->
                    <!--<li v-if=""><el-button @click="delNews">删除</el-button></li>-->
                    <!--<li v-if="!newsData.newsTop"><el-button @click="postTop">置顶</el-button></li>-->
                    <!--<li v-else-if="newsData.newsTop"><el-button  @click="postTopCancel">取消置顶</el-button></li>-->
                    <li><el-button  size = "small" @click="goback">返回</el-button></li>
                </ul>
            </div>
            <div class="details">
                <h3>{{newsData.title}}</h3>
                <div v-if="+newsData.status" class="news-info">

                    {{newsData.newsTypeName}}<span class="news-line">|</span>{{newsData.createPersonName}}&nbsp;&nbsp;发布于：{{newsData.publishDate}}<span class="news-line">|</span>{{newsData.hitNum}}{{l('{newsLocale.kewWords.times}')}}<span class="news-line">|</span><label>附件：</label>
                    <span style="display: inline-block">
                        <attach-upload
                                        style="width: 500px;height: 36px;display: inline-block;overflow: hidden;margin-bottom: -12px"
                                        ref="attachUpload"
                                        :required="false"
                                        :readonly="true"
                                        :multiple="false"
                                        :appId="newsData.appId"
                                        :businessId="newsData.businessId"
                                        :categoryId="newsData.categoryId">
                        </attach-upload>
                    </span>

                    <!--<ul>-->
                        <!--<li><label>发布人：</label><span>{{newsData.createPersonName}}</span></li>-->
                        <!--<li v-if="newsData.status"><label>发布时间：</label><span>{{newsData.publishDate}}</span></li>-->
                        <!--<li v-else><label>保存时间：</label><span>{{newsData.updateDate}}</span></li>-->
                        <!--<li><label>浏览次数：</label><span>{{newsData.hitNum}}次</span></li>-->
                        <!--<li><label>所属栏目：</label><span>{{newsData.newsTypeName}}</span></li>-->
                        <!--<li><label>附件：</label>-->
                            <!--<span style="display: inline-block">-->
                                <!--<attach-upload-->
                                        <!--style="width: 500px;height: 36px;display: inline-block;overflow: hidden;margin-bottom: -12px"-->
                                        <!--ref="attachUpload"-->
                                        <!--:required="false"-->
                                        <!--:readonly="true"-->
                                        <!--:multiple="false"-->
                                        <!--:appId="newsData.appId"-->
                                        <!--:businessId="newsData.businessId"-->
                                        <!--:categoryId="newsData.categoryId">-->
                                <!--</attach-upload>-->
                            <!--</span>-->
                        <!--</li>-->
                    <!--</ul>-->
                </div>
                <div class="news-info" v-else >

                    {{newsData.newsTypeName}}<span class="news-line">|</span>{{newsData.createPersonName}}&nbsp;&nbsp;保存于：{{newsData.publishDate}}<span class="news-line">|</span>{{newsData.hitNum}}{{l('{newsLocale.kewWords.times}')}}<span class="news-line">|</span><label>附件：</label>
                    <span style="display: inline-block">
                        <attach-upload
                                style="width: 500px;height: 36px;display: inline-block;overflow: hidden;margin-bottom: -12px"
                                ref="attachUpload"
                                :required="false"
                                :readonly="true"
                                :multiple="false"
                                :appId="newsData.appId"
                                :businessId="newsData.businessId"
                                :categoryId="newsData.categoryId">
                        </attach-upload>
                    </span>
                </div>
                <div class="blue-line"></div>
                <div class="news-content" style="min-height: 350px;padding: 0px" >
                    <div v-html="newsData.newsContent">

                    </div>
                </div>
                <div>
                    <smart-comment
                        :startComment = "!!newsData.isComment"
                        :commentUserId = 'newsData.createPersonId'
                        :businessId="newsData.businessId"
                        business_type="1">
                    </smart-comment>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="no-data">
                暂无数据
            </div>

        </div>
        <dialog-edit-news  :dialog-visible="newsDialogVisible" :id="id"  @closeCreateModal="closeNewsDialog" @refreshData="refreshData"></dialog-edit-news>
    </div>
</template>

<script>
    JZY.locale.add('newsLocale',require('./news.locale'))
//    import UEditor from '@/components/UEditor.vue'
//    import '../../../../static/ueditor/ueditor.parse.js'
    import dialogEditNews from '@Main/news/components/dialog.editNews.vue'
    import {mapMutations} from 'vuex'
    import {getNewsRead,dropNews,putNewsTopCancel,putNewsTop,putNewsCancel,postNewsPublish,getNewsTypeList,getNewsComment} from '@Main/news/getData.js'
    export default{
        components: {
//            UEditor,
            dialogEditNews
        },
        methods:{
            closeNewsDialog(){
                this.newsDialogVisible = false;
            },
            showNewsDialog(){
                this.newsDialogVisible = true;
            },
            refreshData(){
                console.log("refreshDatarefreshDatarefreshData")
                this.loading = true;
                this.rqNewsRead(this.id);
//                this.rqNewsComment(this.id)
            },
            handleCommand(command){
                this[command]();
            },
            delNews (){
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.loading = true;
                    this.rqDropNews(this.id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            goback (){
                this.$router.go(-1);
                let classification = this.$route.params.column
            },
            //取消发布
            cancelRelease(){
                this.$confirm('此操作将取消发布该新闻, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.loading = true;
                    this.rqNewsCancel(this.id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            //发布
            release(){
                this.loading = true;
                this.rqNewsEdit(this.id);
            },

            //取消置顶
            postTopCancel(){
                this.$confirm('此操作将取消置顶该新闻, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.loading = true;
                    this.rqNewsTopCancel(this.id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            //置顶
            postTop(){
                this.$confirm('此操作将置顶该新闻, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.loading = true;
                    this.rqNewsTop(this.id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消置顶'
                    });
                });
            },

            ...mapMutations({
                updateColumn:'UPDATE_COLUMN'
            }),
            //刷新栏目
            async rqNewsTypeList(){
                let res = await getNewsTypeList();
                this.updateColumn(res);
                console.log(res,"resres")
            },

            //查看新闻
            async rqNewsRead(id){
                let res = await   JZY.xhr.request({type:'get',url:'/news/read/'+id},false,false).then((resultData)=>{
                    this.newsData = {...resultData[0]};
                    this.loading = false;
//                    console.log(JSON.stringify(this.newsData));

//                    this.$nextTick(()=>{
//                        this.$refs.UEditorDetail.setContent(this.newsData.newsContent);
//                    })

//                        try{
//                            this.$refs.UEditorDetail.setContent(this.newsData.newsContent);
//                        }catch(e){}
//                    this.$refs.UEditorDetail.setContent(this.newsData.newsContent);

//                    console.log('newsData.newsContent---:',this.newsData.newsContent)
                    //
                    //
                    // alert(document.querySelector('.news-content'))
                    //
//
//                    this.$nextTick(()=>{
//                        uParse('.news-content', {
//                            rootPath: '/static/'
//                        });
//                        // alert(document.querySelector('.news-content').innerHTML)
//                    })






                }).catch((e)=>{
                    console.log(e)
                    this.$message({
                        message: e.message,
                        type: 'warning'
                    });
                    this.noData = true;
                    this.loading = false;
                })
            },
            //删除新闻
            async rqDropNews(id){
                let res = await dropNews(id);
                this.loading = false;
                this.$message({
                    message: '删除新闻成功！',
                    type: 'success'
                });
                this.rqNewsTypeList();
                let that = this;
//                setTimeout(function () {
                    that.goback();
//                },3000);

            },
            //取消置顶
            async rqNewsTopCancel(id){
                let res = await putNewsTopCancel(id);
                this.loading = false;
                this.$message({
                    message: '新闻取消置顶成功！',
                    type: 'success'
                });
                this.refreshData();
//                let that = this;
//                setTimeout(function () {
//                    that.goback();
//                },3000);
            },
            //置顶
            async rqNewsTop(id){
                let res = await putNewsTop(id);
                this.loading = false;
                this.$message({
                    message: '置顶新闻成功！',
                    type: 'success'
                });

                this.refreshData();
//                let that = this;
//                setTimeout(function () {
//                    that.goback();
//                },3000);
            },

            //取消发布
            async rqNewsCancel(id){
                let res = await putNewsCancel(id);
                this.rqNewsTypeList();
                this.loading = false;
                this.$message({
                    message: '新闻取消发布成功！',
                    type: 'success'
                });
                this.refreshData();
//                let that = this;
//                setTimeout(function () {
//                    that.goback();
//                },3000);
            },

            //查看新闻
            async rqNewsEdit(id){
                let res = await   JZY.xhr.request({type:'get',url:'/news/edit/'+id},false,false).then((resultData)=>{
                    let newsData = {...resultData[0]};
                    console.log(JSON.stringify(newsData));



                    let queryData = {};
                    queryData.isComment = newsData.isComment;//是否允许评论，0：否；1：是    true
                    queryData.sid = newsData.sid;//id   新闻主键                                  false
                    queryData.newsContent = newsData.newsContent;//新闻内容                true
                    queryData.hitNum = newsData.hitNum;//新闻点击数量                               false
                    queryData.newsTop = newsData.newsTop;//是否置顶，0：否；1：是                     fasle
                    queryData.title = newsData.title;//新闻标题                         true
                    queryData.headline = newsData.headline;//新闻摘要                      true
                    queryData.newsTypeName = newsData.newsTypeName;//新闻栏目名称               true
                    queryData.msgReminding = newsData.msgReminding;//新闻是否提醒，0：否；1：是  true
//                    queryData.isSuper = 0;//是否超级管理员，0：否；1：是                false
                    queryData.typeId = newsData.typeId;//新闻栏目ID                    true
                    queryData.status = newsData.status;//新闻状态，0：草稿；1：发布                  false
                    queryData.businessId = newsData.businessId;
//用户
                    let userIdList = [];
                    if(newsData.userShareList){
                        let data = newsData.userShareList;
                        data.map((item)=>{
                            userIdList.push(item.id);
                        });
                    }
                    //角色
                    let roleIdList = [];
                    if(newsData.roleShareList){
                        let data = newsData.roleShareList;
                        data.map((item)=>{
                            roleIdList.push(item.id);
                        });
                    }
                    //部门
                    let orgIdList = [];
//                    console.log(newsData.orgShareList)
                    if(newsData.orgShareList){
                        let data = newsData.orgShareList;
                        data.map((item)=>{
                            orgIdList.push(item.id);
                        });
                    }

                    queryData.userIdList = userIdList;//可见范围人的ID集合                     false
                    queryData.orgIdList = orgIdList;//可见范围组织的ID集合                    false
                    queryData.roleIdList = roleIdList;//可见范围角色的ID集合                   false

//                    console.log(queryData)

                    this.rqNewsPublish(queryData);
//                    async rqNewsPublish(queryData){
//                        let res = await postNewsPublish(queryData);
//                        console.log(res,"resresres");
//                        this.$message({
//                            message: '发布新闻成功！',
//                            type: 'success'
//                        });
//                        this.operateClose('form');
//                    },

                }).catch((e)=>{
                })
            },
            //发布新闻
            async rqNewsPublish(queryData){
                let res = await postNewsPublish(queryData);
                console.log(res,"resresres");
                this.rqNewsTypeList();
                this.loading = false;
                this.$message({
                    message: '发布新闻成功！',
                    type: 'success'
                });

                this.refreshData();
//                let that = this;
//                setTimeout(function () {
//                    that.goback();
//                },3000);
            },
//            async rqNewsComment(id){
//                let res= await getNewsComment(id);
//                this.newsComment = res;
//                console.log(res,"resres")
//            }
            async rqNewsComment(id){
                let res = await JZY.xhr.request('/news/comment/'+id,'GLOBAL.MA_CHANG_XI',false,false).then(([resultData])=>{
                    try{
                        // console.info("get方法")
                        return resultData;
                    }catch (e){
                        this.$message("role.list.vue:"+e);
                        return false;
                    }
                }).catch((e)=>{
                    //接口失败
                    throw new Error(e)
                });
                this.newsComment = res;
            }

        },
        data(){
            return {
                management:JZY.s.hasMenuPermisson('news_view','modify'),
                newsDialogVisible:false,
                id:'',
                newsData:{},
                loading:false,
                noData:false,
                newsComment:null,

            }
        },
        computed:{
            hasEdit: {
                get:function(){
                    let isCurPerson = this.newsData.createPersonId==this.$store.state.session.sid?true:false;
                    return this.newsData.isSuper||isCurPerson;
                },
                set:function (curval) {
                    return  curval;
                }
            },
        },
        mounted(){

            this.id = this.$route.params.id;
            this.loading = true;
            this.rqNewsRead(this.id);
//            this.rqNewsComment(this.id)
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .wrap{
        position: relative;
        background: #ffffff;
        .operation{
            position: absolute;
            right: 16px;
            top:16px;
            /*width: 82.333%;*/
            height: 36px;
            /*background: rgba(255,255,255,0.3);*/
            ul{
                li{
                    float: left;
                    clear: none;
                    margin-right: 16px;
                    .el-button{
                        /*padding: 6px 18px;*/
                        /*border-radius: 0px;*/
                        /*margin-top: 4px;*/
                        /*font-weight: normal;*/
                        /*color: #82848a;*/
                    }
                }
            }
        }
        .blue-line{
            width: 40px;
            height: 3px;
            background-color: $theme-blue;
            margin-top: 12px;
            margin-bottom: 32px;
        }
        .details{
            padding: 22px;
            margin: 60px 42px;
            h3{
                min-height: 32px;
                color: $theme-black-title;
                font-size: 26px;
                font-weight: normal;
                text-align: left;
                padding: 0px 0px;
                margin: 0px 0 20px 0;
            }
            .news-info{
                margin-bottom: 24px;
                line-height: 40px;
                padding: 0 20px 0 0px;
                color: #9B9B9B;
                font-size: 12px;
                .news-line{
                    color: $theme-grey-table-border;
                    margin: 0 16px;
                }

            }
        }
        .news-content{
            /*width: 850px;*/
            margin: 0 auto;
            box-shadow: 10px 10px 5px #fff inset;

        }
    }
    .no-data{
        background: white;
        height: 100%;
        line-height: 300px;
        text-align: center;
    }

</style>
<style rel="stylesheet/scss" lang="scss">
    .news-content{
        .edui-default .edui-editor-toolbarboxinner{
            display: none;
        }
    }
    .news-content{
        font-size: 16px;
        word-break:break-all;
        position: relative;
        img{
            max-width: 100% !important;
        }
        ol{
            margin:0;padding:0;
            li{
                clear:both;
                /*list-style: auto;*/
            }
        }
        ul{
            margin:0;padding:0;
            li{
                clear:both;
                /*list-style: auto;*/
            }
        }
        em{
            font-style: italic;
        }


        .list-paddingleft-1{padding-left:0}
        .list-paddingleft-2{padding-left:20px}
        .list-paddingleft-3{padding-left:40px}
        a{
            color: $theme-blue;
        }
        a:hover{
            color: $theme-blue-active;
        }
        table{
            margin-bottom: 10px;
            border-collapse: collapse;
            display: table;
            border-spacing: 2px;
            border-color: grey;
        }
        td, th {
            padding: 5px 10px;
            border: 1px solid #DDD;
        }
    }
</style>
