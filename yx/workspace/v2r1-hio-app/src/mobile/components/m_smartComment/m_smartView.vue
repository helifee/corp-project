<template>
    <div class="m_smartComment_view_wrap" :style="{
    'margin-bottom': startCommentSwitch ? '60px':'0px'}">
        <!-- "propsData": {{propsData}} -->
        <div class="smart_title">
            全部评论
        </div>
        <div class="smart_list">
            <group title="">
              <cell v-for="(item,index) in smartCommentList" :key="index" :title="item.userName" align-items="flex-start">
                <div class="list_icon" slot="icon">
                    <img :src="item.resourceImgUrl || '/static/images/logo.png' " :alt="item.commentUserId" width="32" height="32">
                    <!-- <icon name="m_task_list" scale="1.5"></icon> -->
                </div>
                <div class="list_desc" slot="inline-desc">
                    <p class="content">
                        <!-- {{item.commentId}}-{{item.userName}} -->
                        <pre><span class="inner_content" v-html = "item.commentContent"></span></pre>
                    </p>
                    <p class="operate">
                        <span class="create_date">{{ item.commentDate | formatEendDateByMoment }}</span>
                        <span v-if="startCommentSwitch" class="replay_comment" @click="replayComment(item)">回复</span>
                        <span v-if="item.isDelete" class="delete_comment" @click="deleteSmartComment(item)">删除</span>
                    </p>
                </div>
              </cell>
            </group>
        </div>
        <group class="input_content" title="" v-show="propsData">
            <div class="input_smart_comment needsclick"
                ref="inputSmartComment"
                v-if="startCommentSwitch"
                contenteditable="true"
                tabindex = "0"
                :placeholder="placeholderText"
                @input = "inputChange">
            </div>
            <div class="save_smart_comment">
                <span @click.stop="saveSmartComment">发布</span>
            </div>
        </group>

        <!--评论删除弹出窗-->
        <actionsheet
            v-model="showDeleteOperate"
            :menus="moreDeleteList"
            @on-click-menu="clickDeleteOperate"
            @on-click-menu-delete="onCancelOperate"
            show-cancel>
        </actionsheet>
    </div>
</template>
<script>
    import moment from 'moment'
    //数据接口文件
    import { getCommentList, addComment, deleteComment,   } from '@mobile/components/m_smartComment/getData'
    import { XInput, Group, Cell, Actionsheet  } from 'vux'
    
    export default {
        name:"listView",
        components: {
          XInput,
          Group,
          Cell,
          Actionsheet,
        },
        data () {
            return {
                smartCommentList:[],//评论列表
                // smartCommentList:[{//评论列表
                //     "commentId":"2657669",
                //     "businessId":"350a4d2908934d17b95052c6abc2834d",
                //     "userId":"100207",
                //     "userName":"许国平",
                //     "commentUserId":"100207",
                //     "commentUserName":"许国平",
                //     "commentDate":"2018-06-22 18:39:47",
                //     "commentContent":"<br<s<bra@aa",
                //     "isDelete":true,
                //     "resourceImgUrl":null
                // },
                // {
                //     "commentId":"2657665",
                //     "businessId":"350a4d2908934d17b95052c6abc2834d",
                //     "userId":"100207",
                //     "userName":"许国平",
                //     "commentUserId":"100207",
                //     "commentUserName":"许国平",
                //     "commentDate":"2018-06-22 18:38:35",
                //     "commentContent":"<br<s<br>aaa",
                //     "isDelete":true,
                //     "resourceImgUrl":null
                // },],
                nowBusinessId:this.businessId,//缓存当前业务id
                nowUserId:this.commentUserId,//缓存当前被评论人id
                placeholderText:'说说你的看法...',//输入框默认提醒
                fhNTemp:'',//临时缓存“回复@xx：”

                pageNum:  1, //当前页数
                pageCount: 10, //分页大小,每页多少条

                dataTotal: 0,   //数据总条数
                nowDataTotal: 10,
                // nowDataTotal: this.pageCount * this.pageNum,   //当前已加载的数据条数
                hasNoMoreData:false,//没有更多数据可加载的开关


                //删除评论
                showDeleteOperate:false,//删除弹出窗
                moreDeleteList: {//删除弹出窗内容
                    'title.noop': '确定删除回复吗？',
                    delete: '<span style="color:red">删除</span>'
                },
                deleteSmartCommentId:'',//当前正在删除的评论的id
            }
        },
        props: {
            //是否显示评论的输入模块
            dialogVisible:{
                type:Boolean,
                default:true
            },
            businessId:{//业务id，具体的文章id
                type:String,
                default:''
            },
            businessType:{//业务分类
                type:String,
                default:''
            },
            startCommentSwitch:{//是否开启评论
                type:Boolean,
                default:true
            },
            commentUserId:{//被评论人id，即业务组件的创建人id
                default:''
            }
        },
        computed: {
          propsData:{
            get: function(){
              console.info("this.dialogVisible",this.dialogVisible)
              return this.dialogVisible
            },
            set: function(){
              this.$emit('changeCommentVisible',false)
            }
          }
        },
        filters:{
            formatEendDateByMoment (value){
                return moment(value).format("YYYY-MM-DD HH:MM")
            },
            //格式化“回复@xxx：”
            formatCommentContent (content = ''){
                let value = content.split("@")[1]
                return value
            },
        },
        methods: {
            //输入评论的模板
            transformCommentContent(str){
                str=str
                    // .replace(/<script[^>]*>.*?<\/script>/gi,'')
                    // .replace(/<[^<>]+>/gi,'')//过滤html标签
                    .replace(/[<">']/gi,function(a){//替换html标签
                        return {
                            '<': '&lt;',
                            '"': '&quot;',
                            '>': '&gt;',
                            "'": '&#39;'
                         }[a]
                    })
                    .replace(/:.*?:/gi,function (a) {
                        console.log('a---:',a)
                        let key=a.substring(1,a.length-1)
                        if(!(key in self.imgSrcMap)){ return ''}
                        return '<img style="width:25px;display:inline;" src="'+self.imgSrcMap[key]+'"/>'
                    })


                return str
            },
            //根据业务详情id获取评论列表
            async getSmartCommentById(  pageNum = 1 , pageCount = 0 ){
                let res = await getCommentList( this.nowBusinessId, this.businessType, pageNum, pageCount || this.nowDataTotal )
                console.info(res[0])
                if (res[0].list.length > 0) {
                    this.smartCommentList = [...res[0].list]

                    this.dataTotal = res[0].total //数据总条数
                    console.info("this.smartCommentList",this.smartCommentList)
                    // this.$nextTick(function(){
                    //     this.$refs.myScroll.changeDom()//设置滚动加载的dom高
                    // })
                }else{
                    this.smartCommentList=[]
                    this.$nextTick(function(){
                        // this.$refs.myScroll.changeScrollState()//设置滚动加载的dom高
                    })
                    
                }
            },
            //新增评论接口调用
            async addSmartComment( { content = '', userId = '' } = {} ){
                if( content !== null && content !== undefined && content !== '' ){//评论内容非空

                    if( this.nowUserId !== '' ){//对评论进行回复
                        content = this.fhNTemp + content
                    }

                    const params = {
                        businessId:this.nowBusinessId, //业务id
                        businessType:this.businessType, //业务类型
                        commentUserId:userId || this.commentUserId,//被评论人id
                        commentContent:content //评论内容
                    }

                    let res = await addComment( params )
                    console.info(res[0])
                    if (res[0] == 1) {//评论新增成功
                        this.getSmartCommentById()//刷新列表
                        return res[0]
                    }else{
                        return false
                    }

                }else{
                    return 'empty'
                }
            },
            //发布评论的事件
            async saveSmartComment ( ) {
                //获取输入内容
                let contentHtml = this.transformCommentContent(this.$refs.inputSmartComment.innerText)

                //新增评论
                let res = await this.addSmartComment( {'content':contentHtml ,'userId': this.nowUserId || this.commentUserId } )

                // debugger
                if ( res === 1 ) {//发布成功
                    this.$alert("发布成功")
                    this.$refs.inputSmartComment.innerText = ''
                    this.$emit('changeCommentVisible',false)

                }else if( res === 'empty' ){//内容不能为空
                    this.$alert('请输入评论内容后，再提交');
                }else{//发布失败
                    this.$alert("新增失败")
                    this.$emit( 'smartComment', this.commentUserId )
                }
            },
            //回复评论-输入框弹出
            replayComment( obj ={} ){
                console.info(obj)
                this.placeholderText = '回复@'+obj.userName+'：';
                this.fhNTemp = this.placeholderText
                // debugger
                this.$emit( 'smartComment', obj.userId )

            },
            //确定删除评论
            async deleteSmartComment( {commentId = ''} = {} ){
                this.showDeleteOperate = true
                this.deleteSmartCommentId = commentId
            },

            //确定删除评论
            async deleteSmartCommentById( ){
                let res = await deleteComment( this.nowBusinessId, this.deleteSmartCommentId )
                console.info(res[0])
                if (res[0] == 1) {//删除成功
                    // this.getSmartCommentById()//刷新列表
                    this.smartCommentList = this.smartCommentList.filter((item)=> {
                        return item.commentId != this.deleteSmartCommentId
                    });
                    this.deleteSmartCommentId = ''
                    this.$alert("删除成功")
                    return true;
                }else{//删除失败
                    this.$alert("删除失败")
                    return false;
                }
            },
            //关闭删除评论操作弹出窗事件
            clickDeleteOperate ( key ) {
                if (key === 'delete') {
                    this.deleteSmartCommentById()
                }
            },
            //关闭删除评论操作弹出窗事件
            onCancelOperate () {
              this.showDeleteOperate = false
            },
            //输入框的输入事件
            inputChange(){
                this.placeholderText = ''
            },
            //自动获取input焦点
            focusAuto( userId = '' ) {
                if ( userId == '' ) {//最外层的评论
                    this.placeholderText = '说说你的看法...'
                    this.nowUserId = '' //缓存当前被评论人id
                }
                this.$nextTick(function(){
                    this.nowUserId = userId //缓存当前被评论人id
                    this.$refs.inputSmartComment.focus()
                })
            },
            //新增评论-作废，新增之后不请求list接口，无法获取新增评论的id
            addComment1( {content = '', userId = ''} = {} ){
                this.smartCommentList.unshift({
                    "commentId":"100345",
                    "businessId":"350a4d2908934d17b95052c6abc2834d",
                    "userId":"100207",
                    "userName":"许国平",
                    "commentUserId":userId,
                    "commentUserName":"许国平",
                    "commentDate":"2018-06-13 16:15:42",
                    "commentContent":content,
                    "isDelete":true,
                    "resourceImgUrl":null
                })
            },
        },
        mounted(){
            //加载评论列表
            this.getSmartCommentById()

            let _this = this
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            $(window).on('resize', function () {
                var nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                if (clientHeight > nowClientHeight) {
                    //键盘弹出的事件处理
                    _this.focusAuto( _this.nowUserId )
                }
                else {
                    //键盘收起的事件处理
                    _this.$emit('changeCommentVisible')
                }
            });
        },
        beforeDestroy(){
            //键盘收起的事件处理
            this.$emit('changeCommentVisible','reflesh')
            // debugger
        },
    }
</script>

<style lang="scss">
.m_smartComment_view_wrap{
    .weui-cells{
        margin-top:0px;
        .weui-cell{
            padding: 15px;
            .vux-cell-bd.vux-cell-primary{
                width: calc(100% - 44px)
            }
            .vux-label{
                width:auto;
                height:30px;
                line-height:30px;
                color:#666;
                font-size:14px;
                display:block;
                overflow:hidden;
                white-space:nowrap;
                text-overflow: ellipsis;
            }
        }
    }
    .input_content{
        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
        ::-webkit-scrollbar  
        {
            width: 8px;  
            height: 8px;  
            background-color: $theme-black-other;  
        }
        /*定义滚动条轨道 内阴影+圆角*/  
        ::-webkit-scrollbar-track  
        {
            -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);  
            border-radius: 0px;  
            background-color: $theme-grey-body-background;  
        }
        /*定义滑块 内阴影+圆角*/  
        ::-webkit-scrollbar-thumb  
        {
            border-radius: 8px;  
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
            background-color: $theme-black-other;  
        }
        .weui-cells{
            width:100%;
            background:#fff;
        }
    }
}
</style>
<style lang="scss" scoped>
.m_smartComment_view_wrap{
    margin-top:10px;
    background-color:#fff;
    .smart_title{
        font-size:16px;
        line-height:44px;
        text-indent:15px;
    }
    .smart_list{
        .list_desc{
            line-height:18px;
            font-size: 12px;
            p.content{
                width:100%;
                line-height:22px;
                color:#0D0D0D;
                display:block;
                span.inner_content{
                    word-break:normal;
                    width:auto; display:block;
                    white-space:pre-wrap;
                    word-wrap: break-word;
                    overflow: hidden;
                }
            }
            p.operate{
                width:100%;
                height:24px;
                line-height:24px;
                margin-top:4px;
                color:#666;
                display:block;
                overflow:hidden;
                white-space:nowrap;
                text-overflow: ellipsis;
                position:relative;
                .replay_comment{
                    margin-left:8px;
                }
                .delete_comment{
                    position:absolute;
                    right: 0;
                }
            }
        }
        .list_icon{
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-right:12px;
            overflow: hidden;
            // width:32px;
            // height:32px;
            // line-height:32px;
            // text-align:center;
            // background-color:#0ABF86;
            // color:#fff;
            // border-radius:50%;
            // position: relative;
            // svg{
            //     position: absolute;
            //     top: 50%;
            //     left: 50%;
            //     transform: translate(-50%, -50%);
            // }
        }

    }
    .input_content{
        width:100%;
        position: fixed;
        z-index: 5500;
        bottom: 0;
        width: 100%;
        .input_smart_comment {
            width: calc(100% - 70px); 
            float: left;
            padding:10px 5px 10px 15px;
            min-height: 20px;
            _height: 45px; 
            max-height: 45px;
            margin-left: auto; 
            margin-right: auto; 
            outline: 0; 
            font-size: 12px; 
            line-height: 20px;
            word-wrap: break-word;
            overflow-x: hidden;
            overflow-y: auto;
            background:#fff;
            -webkit-user-select: text;
            &:empty:before{
                content:attr(placeholder);
                font-size: 12px;
                color: #ccc;
            }
            &:focus:before{
                content:attr(placeholder);
                font-size: 12px;
                color: #ccc;
            }
        }
        .save_smart_comment{
            width:50px;
            max-height:85px;
            min-height:49px;
            line-height:49px;
            float: left;
            font-size: 14px; 
            text-align: center;
            color: #009EFF;
            position: absolute;
            z-index: 5501;
            right: 0;
            bottom: 0;
            background:#fff;
        }
    }
}
</style>