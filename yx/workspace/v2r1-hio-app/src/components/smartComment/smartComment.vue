<template>
    <!--<div calss="jzy-comment">-->
        <div class="commentAll">
            <!--评论区域 begin-->
            <div class="reviewArea clearfix" v-if="startComment">
                <!-- <el-input ref="textarea" class="jzy-comment-content comment-input" placeholder="说点儿神马吧" onkeyup="handleReplyTextareaKeyUp(this)" :rows="4" v-model="textareaModel" v-textarea-limiter type="textarea" :maxlength="100"></el-input> -->

                <textarea ref="textarea" class="jzy-comment-content comment-input" placeholder="说点儿神马吧" onkeyup="handleReplyTextareaKeyUp(this)" :rows="4"></textarea>
            </div>
            <div class="comment_list_warp" v-if="startComment">
                <el-popover
                    v-model="popperVisible"
                    ref="popover2"
                    placement="top"
                    title="选择表情"
                    width="377"
                    trigger="click">
                    <emoticon @updateEmoticonSrcs="handleUpdateEmoticonSrcs" @insertEmoticon="handleInsertEmoticon"></emoticon>
                </el-popover>

                <span v-popover:popover2 style="cursor:pointer">
                    <svg t="1516169621597" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1044" xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14"><defs></defs><path d="M512 63.791885c-247.536746 0-448.208115 200.671369-448.208115 448.208115s200.671369 448.208115 448.208115 448.208115 448.208115-200.671369 448.208115-448.208115S759.535723 63.791885 512 63.791885zM512 906.423141c-217.829144 0-394.423141-176.593997-394.423141-394.423141s176.593997-394.423141 394.423141-394.423141 394.423141 176.593997 394.423141 394.423141S729.829144 906.423141 512 906.423141zM368.573403 494.071675c29.707602 0 53.784974-42.005696 53.784974-71.713298s-24.077372-71.713298-53.784974-71.713298c-29.707602 0-53.784974 42.005696-53.784974 71.713298S338.865801 494.071675 368.573403 494.071675zM655.426597 494.071675c29.707602 0 53.784974-42.005696 53.784974-71.713298s-24.077372-71.713298-53.784974-71.713298c-29.707602 0-53.784974 42.005696-53.784974 71.713298S625.718995 494.071675 655.426597 494.071675zM691.283246 619.569948c-8.695033-3.764744-20.904099-4.715395-32.790824-4.427846-32.450063 46.003753-85.912695 76.141144-146.492422 76.141144-61.726853 0-116.139114-31.195489-148.392702-78.669734-10.075473 0.214894-20.779256 1.90028-30.890544 6.956436-11.599176 5.809309-15.633049 13.984503-18.143219 21.029966 41.21775 71.050196 114.113991 122.396631 197.426465 122.396631 84.764546 0 158.737304-53.157687 199.524243-126.143978C706.396455 629.771287 699.906647 623.317295 691.283246 619.569948z" p-id="1045" fill="#46A7FF"></path></svg>
                </span>

                <el-button type="primary" style="float:right;" class="plBtn" size="small">发表</el-button>

                <!--<a href="javascript:;" class="plBtn">评论</a>-->
            </div>
            <!--评论区域 end-->
            <div class="comment_line"></div>
            <!--回复区域 begin-->
            <div class="comment-show">
                <div class="comment_number" v-if="smartCommentList.length > 0">
                    全部评论<span>({{smartCommentList.length}})</span>
                </div>

                <!-- <div v-if="smartCommentList.length == 0" style="color:#505050">
                    暂无评论
                </div> -->
                <!--加载更多demo-->
<my-scroll
    ref="myScroll"
    :noData='hasNoMoreData'
    @reflashData="reflashData">
    <div slot="contentScroll" class="my_scroll">
        <!--滚动内容区域 start-->
        <!-- <ul>
          <li v-for="(item,index) in dataList" :key="index">
            {{item.name}}
          </li>
        </ul> -->
        <!--滚动内容区域 end-->

                <div class="comment-show-con clearfix" v-for="(item,index) in smartCommentList" :key="index">
                    <div class="comment-show-con-img pull-left"><img :src="item.resourceImgUrl || '/static/images/logo.png' " :alt="item.commentUserId" width="48" height="48"></div>
                    <div class="comment-show-con-list pull-left clearfix">
                        <div class="pl-text clearfix">
                            <input type="hidden" name="comment-size-commentId" class="comment-size-commentId" :value="item.commentId">
                            <input type="hidden" name="comment-size-commentUserId" class="comment-size-commentUserId" :value="item.userId">
                            <i class="comment-size-name">{{ item.userName }}</i>

                            <a href="javascript:;" title="删除此条评论" class="removeBlock" v-if="item.isDelete"><icon name="comment_delete" scale="1.8" style="color:#A0A0A0"  onmouseover="this.style.cssText='color:#46A7FF;'" onmouseout="this.style.cssText='color:#A0A0A0;'"></icon></a>
                            <!-- <a href="javascript:;" class="removeBlock" v-if="item.isDelete">删除</a> -->

                            <span class="date-dz-left comment-time">{{item.commentDate}}</span>

                            <span class="content">
                            <pre><span class="my-pl-con" v-html = "item.commentContent"></span></pre></span>
                        </div>
                        <div class="date-dz">
                            <div class="date-dz-right pull-right comment-pl-block">
                                <!-- <a href="javascript:;" class="removeBlock" v-if="item.isDelete">删除</a> -->
                                <!-- <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" v-if="startComment">回复</a> -->
                                <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" v-if="startComment"><icon name="comment_add" scale="2" style="color:#A0A0A0" onmouseover="this.style.cssText='color:#46A7FF;'" onmouseout="this.style.cssText='color:#A0A0A0;'"></icon></a>

                                <!-- <span class="pull-left date-dz-line">|</span>
                                <a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a> -->
                            </div>
                        </div>
                        <div class="hf-list-con"></div>
                    </div>
                    <div class="pull-left clearfix border_line"></div>
                </div>
                <!-- <div class="comment-show-con clearfix">
                    <div class="comment-show-con-img pull-left"><img src="http://www.jq22.com/demo/jQueryWbPl201705260102/images/header-img-comment_03.png" alt=""></div>
                    <div class="comment-show-con-list pull-left clearfix">
                        <div class="pl-text clearfix">
                            <a href="#" class="comment-size-name">张三 : </a>
                            <span class="my-pl-con">&nbsp;来啊 造作啊!</span>
                        </div>
                        <div class="date-dz">
                            <span class="date-dz-left pull-left comment-time">2017-5-2 11:11:39</span>
                            <div class="date-dz-right pull-right comment-pl-block">
                                <a href="javascript:;" class="removeBlock">删除</a>
                                <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a>
                                <span class="pull-left date-dz-line">|</span>
                                <a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a>
                            </div>
                        </div>
                        <div class="hf-list-con"></div>
                    </div>
                </div> -->

    </div>
</my-scroll>
            </div>
            <!--回复区域 end-->
        </div>
    <!--</div>-->


</template>
<script>

    import emoticon from './emoticon'
    import $ from 'jquery'
    import {mapGetters} from 'vuex'

    //引入滚动加载更多组件
    import myScroll from '@/components/infinite-scroll/scroll'


    // import ElButton from "../../plugins/element-ui/packages/button/src/button";
    /*
    此插件textarea的高度是 height:100%; 继承父元素的高度 ==> 父元素只有一个 position:relative; 用于定位textarea
    页面中加载完毕又添加了pre标签，pre标签是以块元素存在的并且不可见，但是占用空间，
    不像display:none;什么空间也不占。
    所以textarea父元素的高度是通过pre撑开的(在textarea里面写入文字，文字会被添加到pre底下的span标签里，以此来撑开pre的高度)

    要改变textarea初始化时的高度，只需改变pre的padding值即可，页面加载时pre里面添加<br />标签是为了让pre标签初始时有个高度
 */
    (function () {



        $.extend($.fn,{
            //获取文本框内光标位置
            getSelectionStart: function() {
                var e = this[0];
                if (e.selectionStart) {
                    return e.selectionStart;
                } else if (document.selection) {
                    e.focus();
                    var r=document.selection.createRange();
                    var sr = r.duplicate();
                    sr.moveToElementText(e);
                    sr.setEndPoint('EndToEnd', r);
                    return sr.text.length - r.text.length;
                }

                return 0;
            },
            getSelectionEnd: function() {
                var e = this[0];
                if (e.selectionEnd) {
                    return e.selectionEnd;
                } else if (document.selection) {
                    e.focus();
                    var r=document.selection.createRange();
                    var sr = r.duplicate();
                    sr.moveToElementText(e);
                    sr.setEndPoint('EndToEnd', r);
                    return sr.text.length;
                }
                return 0;
            },
            //自动插入默认字符串
            insertString: function(str) {
                $(this).each(function() {
                    var tb = $(this);
                    tb.focus();
                    if (document.selection){
                        var r = document.selection.createRange();
                        document.selection.empty();
                        r.text = str;
                        r.collapse();
                        r.select();
                    } else {
                        var newstart = tb.get(0).selectionStart+str.length;
                        tb.val(tb.val().substr(0,tb.get(0).selectionStart) +
                            str + tb.val().substring(tb.get(0).selectionEnd));
                        tb.get(0).selectionStart = newstart;
                        tb.get(0).selectionEnd = newstart;
                    }
                });

                return this;
            },
            setSelection: function(startIndex,len) {
                $(this).each(function(){
                    if (this.setSelectionRange){
                        this.setSelectionRange(startIndex, startIndex + len);
                    } else if (document.selection) {
                        var range = this.createTextRange();
                        range.collapse(true);
                        range.moveStart('character', startIndex);
                        range.moveEnd('character', len);
                        range.select();
                    } else {
                        this.selectionStart = startIndex;
                        this.selectionEnd = startIndex + len;
                    }
                });

                return this;
            },
            getSelection: function() {
                var elem = this[0];

                var sel = '';
                if (document.selection){
                    var r = document.selection.createRange();
                    document.selection.empty();
                    sel = r.text;
                } else {
                    var start = elem.selectionStart;
                    var end = elem.selectionEnd;
                    var content = $(elem).is(':input') ? $(elem).val() : $(elem).text();
                    sel = content.substring(start, end);
                }
                return sel;
            }
        })


        // Constructor
        function FT(elem) {
            this.$textarea = $(elem);

            this._init();
        }

        FT.prototype = {
            _init: function () {
                var _this = this;

                // Insert wrapper elem & pre/span for textarea mirroring
                this.$textarea.wrap('<div class="flex-text-wrap" />').before('<pre class="pre"><span /><br /></pre>');

                this.$span = this.$textarea.prev().find('span');

                // Add input event listeners
                // * input for modern browsers
                // * propertychange for IE 7 & 8
                // * keyup for IE >= 9: catches keyboard-triggered undos/cuts/deletes
                // * change for IE >= 9: catches mouse-triggered undos/cuts/deletions (when textarea loses focus)
                this.$textarea.on('input propertychange keyup change', function () {
                    _this._mirror();
                });

                // jQuery val() strips carriage return chars by default (see http://api.jquery.com/val/)
                // This causes issues in IE7, but a valHook can be used to preserve these chars
                $.valHooks.textarea = {
                    get: function (elem) {
                        return elem.value.replace(/\r?\n/g, "\r\n");
                    }
                };

                this._mirror();
            }

            ,_mirror: function () {
                this.$span.text(this.$textarea.val());
            }
        };


        // console.log("$---:",$)

        // jQuery plugin wrapper
        $.fn.flexText = function () {
            return this.each(function () {
                // Check if already instantiated on this elem
                if (!$.data(this, 'flexText')) {
                    // Instantiate & store elem + string
                    $.data(this, 'flexText', new FT(this));
                }
            });
        };

    })();



    //最多可输入2500个字符，包括表情字符
    window.handleReplyTextareaKeyUp=function(t){
        var len = $(t).val().length;
        if(len > 2499){
            $(t).val($(t).val().substring(0,2500));
        }
    }




    export default {
        data(){
          return {
              imgSrcMap:{},
              popperVisible:false,
              nowBusinessId:this.businessId,//缓存当前业务id
              smartCommentList:[],//拉取的list

              textareaModel:'',//评论内容
              fhNTemp:'',//临时缓存“回复：xx”
              pageNum:  1, //当前页数
              pageCount: 10, //分页大小,每页多少条
              dataTotal: 0,   //数据总条数
              nowDataTotal: this.pageCount * this.pageNum,   //当前已加载的数据条数
              hasNoMoreData:false,//没有更多数据可加载的开关
          }
        },
        props:{
            businessId:{//业务id，具体的文章id
                type:String,
                default:''
            },
            business_type:{//业务分类
                type:String,
                default:''
            },
            startComment:{//是否开启评论
                type:Boolean,
                default:true
            },
            commentUserId:{//被评论人id，即业务组件的创建人id
                default:''
            }
        },
        computed: {
          ...mapGetters({
              session:'session'
          })
        },
        methods:{
            //表情
            handleUpdateEmoticonSrcs(map){
                this.imgSrcMap=map
                // console.log('this.imgSrcMap--:',this.imgSrcMap)
            },
            handleInsertEmoticon(type){
                this.popperVisible=false

                $(this.$refs.textarea).insertString(":"+type+":");
            },
            insertTest(){

            },
            //根据业务详情id获取评论列表
            async getSmartCommentById( pageNum = 1 , pageCount = 0 ){
                const data = {
                    businessId:this.nowBusinessId,
                    businessType:this.business_type,
                    pageNum:pageNum,
                    pageCount:pageCount || this.nowDataTotal
                }
               let res = await JZY.xhr.r([{type:'post',url:'/comment/queryList',data:data }],'GLOBAL.LOCALHOST.WANG_DONG_YU',false,false).then((resultData)=>{
                        try{
                            // this.smartCommentList=[]
                            return resultData;
                        }catch (e){
                            this.$message("role.list.vue:"+e);
                            return false;
                        }
                    }).catch((e)=>{
                        //接口失败
                        throw new Error(e)
                    })
                console.info(res[0])
                if (res[0].list.length > 0) {
                    this.smartCommentList = [...res[0].list]

                    this.dataTotal = res[0].total //数据总条数
                    console.info("this.smartCommentList",this.smartCommentList)

                    // if(res[0].list.length > 0){
                    //     this.hasNoMoreData = true
                        this.$nextTick(function(){
                            this.$refs.myScroll.changeDom()//设置滚动加载的dom高
                        })
                        
                    // }else{
                    //     this.hasNoMoreData = false
                    // }
                    // debugger
                }else{
                    this.smartCommentList=[]
                    this.$nextTick(function(){
                        this.$refs.myScroll.changeScrollState()//设置滚动加载的dom高
                    })
                    
                }
                
            },
            //新增评论
            async addSmartCommentById({content = '', userId = ''} = {}){
                console.log(this.business_type,"this.business_type")

                let result;
                if(this.business_type == 1){//判断是否有评论权限

                    console.log(res,"res")
                    let res = await JZY.xhr.request('/news/comment/'+this.businessId+'?random='+Math.random(),'GLOBAL.MA_CHANG_XI',false,false).then(([resultData])=>{
                        try{
                            return resultData;
                        }catch (e){
                            this.$message("role.list.vue:"+e);
                            return false;
                        }
                    }).catch((e)=>{
                        //接口失败
                        throw new Error(e)
                    });
                    console.log(res,"res")
                    if(res){
                        result = this.rqAddSmartComment( {'content':content ,'userId':userId} );
                    }else {
                        this.$message({
                            message: '暂无评论权限',
                            type: 'warning'
                        });
                    }

                }else{
                    result = this.rqAddSmartComment( {'content':content ,'userId':userId} );
                }

                return result;


            },
            //新增评论接口调用
            async rqAddSmartComment({content = '', userId = ''} = {}){
                const params = {
                    businessId:this.nowBusinessId, //业务id
                    businessType:this.business_type, //业务类型
                    commentUserId:userId,//被评论人id
                    commentContent:content //评论内容
                }

                    let res = await JZY.xhr.r([{type:'post',url:'/comment/save',data:params}],'GLOBAL.LOCALHOST.WANG_DONG_YU',false,false).then((resultData)=>{
                        try{
                            return resultData;
                        }catch (e){
                            this.$message("role.list.vue:"+e);
                            return false;
                        }
                    }).catch((e)=>{
                        //接口失败
                        throw new Error(e)
                    })
                    console.info(res[0])
                    if (res[0] == 1) {
                        this.getSmartCommentById()//刷新列表
                        return res[0]
                    }
                },


            //确定删除评论
            async deleteSmartCommentById( {commentId = ''} = {} ){
                    const params = {
                        businessId:this.nowBusinessId, //业务id
                        // businessType:this.business_type, //业务类型
                        commentId:commentId,//评论id
                    }
                   let res = await JZY.xhr.r([{type:'post',url:'/comment/delete',data:params}],'GLOBAL.LOCALHOST.WANG_DONG_YU',false,false).then((resultData)=>{
                            try{
                                return resultData;
                            }catch (e){
                                this.$message("role.list.vue:"+e);
                                return false;
                            }
                        }).catch((e)=>{
                            //接口失败
                            throw new Error(e)
                        })

                    console.info(res[0])
                    if (res[0] == 1) {//删除成功
                        this.getSmartCommentById()//刷新列表
                        this.$message("删除成功")
                        return true;
                    }else{//删除失败
                        this.$message("删除失败")
                        return false;
                    }
                
            },
            //新闻模块是否有评论权限
            async hasComment(){
                let res = await JZY.xhr.request('/news/comment/'+this.businessId+'?random='+Math.random(),'GLOBAL.MA_CHANG_XI',true,false).then(([resultData])=>{
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
                console.log(res,"hasCommenthasComment")
            },
            //滚动加载更多数据
            reflashData(){
                const pageNum = ++this.pageNum

                let dataLastNumber = this.pageCount * (pageNum - 1)
                this.nowDataTotal = this.pageCount * pageNum

                console.info("第几次加载数据：" + pageNum)
                if (this.dataTotal > 0) {
                    if ( this.nowDataTotal <= this.dataTotal || ( this.nowDataTotal >= this.dataTotal && this.dataTotal > dataLastNumber ) ) {//还有数据可加载
                        // debugger
                        this.getSmartCommentById( 1, this.nowDataTotal)
                    }else{
                        this.$nextTick(function(){
                            this.$refs.myScroll.changeScrollState()
                        })
                        // this.$message({
                        //     type: 'warning',
                        //     showClose:true,
                        //     message: '没有更多数据可加载'
                        // });
                    }
                // }else if(this.dataTotal === 0 && dataLastNumber == this.pageCount){
                }else if(this.dataTotal === 0 || this.smartCommentList.length == 0 ){
                    this.$nextTick(function(){
                        this.$refs.myScroll.changeScrollState()
                    })
                }
                // debugger

            },
        },
        components:{
            // ElButton,
            emoticon,
            myScroll,
        },
        async mounted(){
            this.getSmartCommentById()
            let self=this;
            // this.$nextTick(function () {
            //     console.log(this.$el.textContent) // => 'updated'
      
       
            (function(){
                $('.jzy-comment-content').flexText();

                //根据业务详情id获取评论列表
                // let xx =  this.getSmartCommentById()


                //输入评论的模板
                function transformCommentContent(str){
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
                }

                //评论功能，最外层
                $('.commentAll').on('click','.plBtn',function(){

                    var myDate = new Date();
                    //获取当前年
                    var year=myDate.getFullYear();
                    //获取当前月
                    var month=myDate.getMonth()+1;
                    //获取当前日
                    var date=myDate.getDate();
                    var h=myDate.getHours();       //获取当前小时数(0-23)
                    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
                    if(m<10) m = '0' + m;
                    var s=myDate.getSeconds();
                    if(s<10) s = '0' + s;
                    var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
                    //获取输入内容
                    var oSize=transformCommentContent($(self.$refs.textarea).val())
//                    console.info("获取输入内容"+oSize)
//                    console.info(self.session.sid)

                    if(oSize !== null && oSize !== undefined && oSize !== ''){//评论内容非空
                        //新增评论的后端接口
                        // debugger
                            let res = self.addSmartCommentById( {'content':oSize ,'userId':self.commentUserId} )
//                            console.info(res)
                            if (res) {//新增成功
                                // self.$message("新增成功")
                                if(oSize.replace(/(^\s*)|(\s*$)/g, "") != ''){
                                    // $(this).parent().parent().find('.reviewArea ').siblings('.comment-show').prepend(oHtml);

                                    // $(this).parent().parent().find('.flex-text-wrap').find('.comment-input').prop('value','').siblings('pre').find('span').text('');

                                    $(this).parent().parent().find('.reviewArea').find('.comment-input').prop('value','');
                                }
                            }else{//新增失败
                                self.$message("新增失败")
                            }



                    }else{
                        self.$message({
                          showClose: true,
                          message: '请输入评论内容后，再提交',
                          type: 'warning'
                        });
                    }

                    //动态创建评论模块
                //     let oHtml = `
                // <div class="comment-show-con clearfix">
                //     <div class="comment-show-con-img pull-left"><img src="http://www.jq22.com/demo/jQueryWbPl201705260102/images/header-img-comment_03.png" alt=""></div>
                //     <div class="comment-show-con-list pull-left clearfix">
                //         <div class="pl-text clearfix">
                //             <input type="hidden" name="comment-size-commentUserId" class="comment-size-commentUserId" :value="${self.session.sid}">
                //             <a href="#" class="comment-size-name">${self.session.name} : </a>
                //             <span class="my-pl-con">&nbsp;${oSize} </span>
                //         </div>
                //         <div class="date-dz">
                //             <span class="date-dz-left pull-left comment-time">${now}</span>
                //             <div class="date-dz-right pull-right comment-pl-block">
                //                 <a href="javascript:;" class="removeBlock">删除</a> 
                //                 <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a>
                //                 <span class="pull-left date-dz-line">|</span>
                //                 <a href="javascript:;" class="date-dz-z pull-left">
                //                     <i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)
                //                 </a>
                //             </div>
                //         </div>
                //         <div class="hf-list-con"></div>
                //     </div>
                // </div>`;
                console.info($(this).parent().parent().find('.flex-text-wrap').find('.comment-input').prop('value',''))
                 // comment-input"

                });

                $('.commentAll').on('click','.emoji-png',function(){
                    let label=$(this).next().text().trim()
//                    alert(label)
                })
                //显示对评论进行回复的弹出窗
                $('.comment-show').on('click','.pl-hf',function(){
                    //获取回复人的名字
                    var fhName = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').html();
                    //获取被评论人的id
                    var fhUserId = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.pl-text').find('.comment-size-commentUserId').val();
                    console.info("1获取回复人的id")
                    console.info(fhUserId)
                    //回复@
                    var fhN = '回复@'+fhName+'：';
                    self.fhNTemp = fhN  //缓存临时字符串
                    //var oInput = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.hf-con');
                    var fhHtml = '<div class="hf-con pull-left"> <textarea class="jzy-comment-content comment-input hf-input" rows="3" placeholder="" commentUserId ='+fhUserId+' onkeyup="handleReplyTextareaKeyUp(this)"></textarea><div class="callback_comment_tips">'+fhN+'</div> <i class="hf-pl">发表</i></div>';
                    //显示回复
                    if($(this).is('.hf-con-block')){
                        $(this).parents('.date-dz-right').parents('.date-dz').append(fhHtml);
                        $(this).removeClass('hf-con-block');
                        $('.jzy-comment-content').flexText();
                        $(this).parents('.date-dz-right').siblings('.hf-con').find('.pre').css('padding','6px 15px');
                        //console.log($(this).parents('.date-dz-right').siblings('.hf-con').find('.pre'))
                        //input框自动聚焦
                        // $(this).parents('.date-dz-right').siblings('.hf-con').find('.hf-input').val('').focus().val(fhN);
                        $(this).parents('.date-dz-right').siblings('.hf-con').find('.hf-input').val('').focus();
                    }else {
                        $(this).addClass('hf-con-block');
                        $(this).parents('.date-dz-right').siblings('.hf-con').remove();
                    }
                });

                //对评论进行回复的事件
                $('.comment-show').on('click','.hf-pl',function(){
                    var oThis = $(this);
                    var myDate = new Date();
                    //获取当前年
                    var year=myDate.getFullYear();
                    //获取当前月
                    var month=myDate.getMonth()+1;
                    //获取当前日
                    var date=myDate.getDate();
                    var h=myDate.getHours();       //获取当前小时数(0-23)
                    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
                    if(m<10) m = '0' + m;
                    var s=myDate.getSeconds();
                    if(s<10) s = '0' + s;
                    var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
                    //获取输入内容
                    var oHfVal = $(this).siblings('.flex-text-wrap').find('.hf-input').val();
                    console.log("获取回复输入的内容"+oHfVal)
                    //获取回复人的id
                    var fhUserId = $(this).siblings('.flex-text-wrap').find('.hf-input').attr('commentUserId');
                    // var fhUserId = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.pl-text').find('.comment-size-commentUserId').val();
                    console.info("获取回复人的id")
                    console.info(fhUserId)

                    // let checkContentHtml = oHfVal.split(self.fhNTemp)[1]
                    let checkContentHtml = self.fhNTemp + oHfVal

                    if(oHfVal !== null && oHfVal !== undefined && oHfVal !== ''){//评论内容非空

                            //新增评论的后端接口
                            let res = self.addSmartCommentById({'content':checkContentHtml, 'userId':fhUserId })
                            console.info(res)
                            if (res) {//新增成功
                                // self.$message("新增成功")
                            }else{//新增失败
                                self.$message("新增失败")
                            }


                    }else{
                        self.$message({
                          showClose: true,
                          message: '请输入评论内容后，再提交',
                          type: 'warning'
                        });

                    }
                    


                    var oHfName = $(this).parents('.hf-con').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').html();
                    var oAllVal = '回复@'+oHfName+' ：';
                    if(oHfVal.replace(/^ +| +$/g,'') == '' || oHfVal == oAllVal){

                    }else {
                        setTimeout(()=>{
                            let data=[
                                {

                                }
                            ]

                            var oAt = '';
                            var oHf = '';
                            $.each(data,function(n,v){
                                delete v.hfContent;
                                delete v.atName;
                                var arr;
                                var ohfNameArr;
                                if(oHfVal.indexOf("@") == -1){
                                    data['atName'] = '';
                                    data['hfContent'] = oHfVal;
                                }else {
                                    arr = oHfVal.split(':');
                                    ohfNameArr = arr[0].split('@');
                                    data['hfContent'] = arr[1];
                                    data['atName'] = ohfNameArr[1];
                                }

                                if(data.atName == ''){
                                    oAt = data.hfContent;
                                }else {
                                    oAt = '回复<a href="#" class="atName">@'+data.atName+'</a> : '+data.hfContent;
                                }
                                oHf = data.hfName;
                            });
                            var oHtml = '<div class="all-pl-con"><div class="pl-text hfpl-text clearfix"><i class="comment-size-name">我的名字 : </i><span class="content"><span><span class="my-pl-con">'+oAt+'</span></span></span></div><div class="date-dz"> <span class="date-dz-left pull-left comment-time">'+now+'</span> <div class="date-dz-right pull-right comment-pl-block"> <a href="javascript:;" class="removeBlock">删除</a> <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> </div> </div></div>';
                            // var oHtml = '<div class="all-pl-con"><div class="pl-text hfpl-text clearfix"><a href="#" class="comment-size-name">我的名字 : </a><span class="my-pl-con">'+oAt+'</span></div><div class="date-dz"> <span class="date-dz-left pull-left comment-time">'+now+'</span> <div class="date-dz-right pull-right comment-pl-block"> <a href="javascript:;" class="removeBlock">删除</a> <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> <span class="pull-left date-dz-line">|</span> <a href="javascript:;" class="date-dz-z pull-left"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">666</i>)</a> </div> </div></div>';


                            // oThis.parents('.hf-con').parents('.comment-show-con-list').find('.hf-list-con').css('display','block').prepend(oHtml) && oThis.parents('.hf-con').siblings('.date-dz-right').find('.pl-hf').addClass('hf-con-block') && oThis.parents('.hf-con').remove();
                            oThis.parents('.hf-con').siblings('.date-dz-right').find('.pl-hf').addClass('hf-con-block') && oThis.parents('.hf-con').remove();

                        })




                        // $.getJSON("json/pl.json",function(data){
                        //     });
                    }
                });
                //评论的删除事件
                $('.commentAll').on('click','.removeBlock',function(){
                    var oT = $(this).parents('.date-dz-right').parents('.date-dz').parents('.all-pl-con');
                    //获取评论id
                    var commentId = $(this).parents('.pl-text').find('.comment-size-commentId').val();
                    // var commentId = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.pl-text').find('.comment-size-commentId').val();
                    console.info("获取评论id")
                    console.info(commentId)

                    let resultData = false
                    //删除事件
                    self.$confirm('评论删除后无法恢复，您确认删除此条评论?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //确定删除
                        resultData = self.deleteSmartCommentById( {commentId: commentId} )

                    }).catch(() => {
                        self.$message({
                          type: 'info',
                          message: '已取消'
                        });          
                    });

                    if (resultData) {

                        if(oT.siblings('.all-pl-con').length >= 1){
                            oT.remove();
                        }else {
                            $(this).parents('.date-dz-right').parents('.date-dz').parents('.all-pl-con').parents('.hf-list-con').css('display','none')
                            oT.remove();
                        }
                        $(this).parents('.date-dz-right').parents('.date-dz').parents('.comment-show-con-list').parents('.comment-show-con').remove();
                    }

                })






                $('.comment-show').on('click','.date-dz-z',function(){
                    var zNum = $(this).find('.z-num').html();
                    if($(this).is('.date-dz-z-click')){
                        zNum--;
                        $(this).removeClass('date-dz-z-click red');
                        $(this).find('.z-num').html(zNum);
                        $(this).find('.date-dz-z-click-red').removeClass('red');
                    }else {
                        zNum++;
                        $(this).addClass('date-dz-z-click');
                        $(this).find('.z-num').html(zNum);
                        $(this).find('.date-dz-z-click-red').addClass('red');
                    }
                })
            })()
            // })
        },
        watch:{
            businessId:function(newVal,oldVal){
                this.nowBusinessId = newVal
                
                this.pageNum = 1  //当前页数
                this.pageCount = 10  //分页大小,每页多少条
                this.dataTotal = 0   //数据总条数
                this.nowDataTotal = this.pageCount * this.pageNum   //当前已加载的数据条数

                this.getSmartCommentById()
            }
        }
    }
</script>
<style lang="scss">



    pre {
        white-space: pre;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    .flex-text-wrap {
        width: 100%;
        position: relative;
        *zoom: 1;
    }
    textarea,
    .flex-text-wrap {
        outline: 0;
        margin: 0;
        border: none;
        padding: 0;
        *padding-bottom: 0!important;
    }
    .flex-text-wrap textarea,
    .flex-text-wrap pre {
        *white-space: pre;
        *word-wrap: break-word;
        white-space: pre-wrap;
        width: 100%;
        height: 100%;
        min-height:100px;
        max-height:250px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
    }
    .flex-text-wrap textarea {
        overflow-y: auto;
        position: absolute;
        top: 0;
        left: 0;
        // width:calc( 100% - 30px );
        width:100%;
        resize: none;
        /* IE7 box-sizing fudge factor */
        *height: 94%;
        *width: 94%;
    }
    .flex-text-wrap pre {
        display: block;
        visibility: hidden;
    }
    .flex-text-wrap,textarea { margin-bottom: 25px }
    textarea,.flex-text-wrap pre {
        line-height: 1.7;
        // font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        // font-size: 100%;
        padding: 10px 15px;
        border: 1px solid #EBEBEB;
        // width: calc( 100% - 30px );
        width:100%;
        -webkit-appearance: none;
        background: #fff;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        -moz-background-clip: padding;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        // -webkit-box-shadow: 0 0 8px rgba(182, 195, 214, .6) inset, 0 1px 1px #fff;
        // -moz-box-shadow: 0 0 8px rgba(182, 195, 214, .6) inset, 0 1px 1px #fff;
        // box-shadow: 0 0 8px rgba(182, 195, 214, .6) inset, 0 1px 1px #fff;
        -webkit-transition-duration: 300ms;
        -moz-transition-duration: 300ms;
        -o-transition-duration: 300ms;
        -ms-transition-duration: 300ms;
        transition-duration: 300ms;
        -webkit-transition-easing: ease-in-out;
        -moz-transition-easing: ease-in-out;
        -o-transition-easing: ease-in-out;
        -ms-transition-easing: ease-in-out;
        transition-easing: ease-in-out;
        -webkit-transition-property: border-color, -webkit-box-shadow;
        -webkit-transition-property: border-color, box-shadow;
        -moz-transition-property: border-color, -moz-box-shadow;
        -moz-transition-property: border-color, box-shadow;
        -o-transition-property: border-color, box-shadow;
        -ms-transition-property: border-color, box-shadow;
        transition-property: border-color, box-shadow;
    }
    .fork-link {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 140px;
    }
    @media only screen and (-webkit-min-device-pixel-ratio:1.25), (min-resolution:120dpi) {
        html {
            background-size: 51px auto;
        }
    }
    /*清除浮动*/
    .clearfix:before,
    .clearfix:after{content: " ";display: table;}
    .clearfix:after{clear: both;}
    .clearfix{zoom: 1;}
    /*浮动*/
    .pull-right{float: right !important;}
    .pull-left{float: left !important;}
    /*----------------------------------------------------------------------------------------------------------*/

    .flex-text-wrap,pre{margin: 0 !important;}
    .commentAll{
        padding: 16px 16px 0;
        // border: 1px solid #ededed;
        margin: 0 auto;
    }
    /*.plBtn{width: 75px;height: 36px;line-height: 36px;background-color: #339b53;text-align: center;display: block;float: right;color: #FFFFFF;font-size: 12px;border-radius: 6px;margin-right: 2px;margin-top: 20px;}*/
    /*.plBtn:hover{background-color: #2f904d;}*/

    /*----------评论区域 begin----------*/
    // .comment-show{margin-top: 20px;}
    .comment-show-con {
        width: 100%;
        padding: 0;
        margin-bottom:20px;
        & + .comment-show-con{
            // border-top: 1px solid #EDEDED;
        }
    }
    .comment-show-con-img {
        width: 48px;
        height: 48px;
        margin-top: 16px;
        border-radius:50%;
        overflow: hidden;
    }
    .comment-show-con-list {
        // width: 85%;
        width: calc(95% - 48px);
        margin-left: 2%;
        padding-bottom:12px;
    }
    .comment-show-con .border_line{
        width: 95%;
        margin-left: calc(2% + 48px);
        border-bottom:1px solid $theme-grey-table-border;
    }
    .pl-text {
        width: 100%;
        margin-top: 16px;
        word-wrap: break-word;
        overflow: hidden;
        pre{
            margin-top:16px;
        }
        .content{
            display:block;
            padding-top:16px;
            padding-bottom:10px;
        }
    }
    .date-dz {
        width: 100%;
        float: left;
    }
    .hf-list-con {
        float: left;
        width: 100%;
        background-color: #eaeaec;
        margin-top: 7px;
    }
    .comment-size-name {
        font-size: 14px;
        // color: $theme-blue;
    }
    .my-pl-con {
        font-size: 12px;
        color: $theme-black;
        line-height:18px;
        width: 100%;
    }
    .date-dz-left {
        font-size: 12px;
        color: $theme-black-other;
        display: inline-block;
        padding-top: 18px;
    }
    .comment-time, .comment-pl-block {
        padding-top: 0;
    }
    .comment-pl-block {
        margin-top: 0;
    }
    .date-dz-right {
        display: block;
        padding-top: 6px;
        padding-right: 18px;
        position: relative;
        overflow: hidden;
    }
    .removeBlock {
        // float: left;
        font-size: 12px;
        color: #8b8b8b;
        width:40px;
        text-indent:6px;
        // margin-right: 24px;
        display: inline-block;
        opacity: 0;
    }
    .hf-con-block {
        display: block;
    }
    .date-dz-pl, .date-dz-line, .date-dz-z {
        font-size: 12px;
        color: #8b8b8b;
    }
    .date-dz-line {
        display: block;
        padding: 0 20px;
    }
    .date-dz-z-click-red {
        width: 17px;
        height: 17px;
        margin-top: 12px;
        display: block;
        float: left;
        background-image: url(./icon-all_01.png);
        background-repeat: no-repeat;
        background-position: -6px -198px;
        margin-right: 5px;
    }
    .z-num {
        font-style: normal;
    }
    .date-dz-z-click {
        color: #b83b44;
    }
    .red {
        background-position: -6px -119px !important;
    }
    .hf-pl {
        width: 70px;
        height: 30px;
        line-height: 30px;
        background-color: #409EFF;
        /*background-color: #339b53;*/
        text-align: center;
        display: block;
        float: right;
        color: #FFFFFF;
        font-size: 12px;
        border-radius: 3px;
        margin-right: 2px;
        margin-top: 16px;
        &:hover{
            cursor:pointer;
        }
    }
    .hf-con{width: 100%;margin-top: 24px;}
    .hf-input{font-size: 12px;}

    .hf-con.pull-left{
        position:relative;
        .callback_comment_tips{
            width:100px;
            height:20px;
            line-height:20px;
            text-align:right;
            position:absolute;
            top:11px;
            left:16px;
            background-color:#fff;
            overflow:hidden;
            white-space:nowrap;
            text-overflow: ellipsis;
        }
        .flex-text-wrap textarea {
            text-indent:100px;
        }
    }
    .all-pl-con {
        width: 96%;
        padding: 2% 0;
        float: left;
        margin: 0 2%;
    }
    .atName {
        font-size: 12px;
        color: #339b53;
    }
    .hfpl-text{margin-top: 0;}
    .date-dz:hover .removeBlock {
        opacity: 1;
    }
    .hf-list-con .all-pl-con {
        border-top: 1px solid #d9d9d9;
        padding-bottom: 12px;
    }
    .hf-list-con .all-pl-con:first-child {
        border-top: 0;
    }

    .comment_list_warp{
        height:32px;
        line-height:32px;
        margin-top:16px;
        padding-bottom:24px;
    }
    .comment_line{
        width: calc( 100% + 32px );
        height: 1px;
        background-color: $theme-grey-body-background;
        margin-left:-16px;
        margin-right:-16px;
    }
    .comment_number{
        margin-top:26px;
        @include font(14px,40px);
        // color:$theme-blue;
        span{
            margin-left:8px;
        }
    }

    .pl-text:hover .removeBlock {
        opacity: 1;
    }
    .my_scroll{
        // border:1px solid #cc0
    }
    /*----------评论区域 end----------*/
</style>