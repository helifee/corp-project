;(function ($,window,document,ajaxUtil) {
/**
 *  author:luorongxin
 */
var id; //主题id
var editor;//在线编辑器
var replyId;//回复id
var replyReferenceId;//引用id
var topic;//主题
$(function() {
    id = $.xljUtils.getUrlParam("id");
    //加载在线编辑器
    initEditor();
    //初始化回复ID
    IDGenerate();
    //计算点击数
     HitNum();
    //按钮列表
   /* $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='closeBtn'>关闭</button>");
    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='delBtn'>删除</button>");
    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='transBtn'>转移</button>");
    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='endPostBtn'>结帖</button>");
    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='unEssenceBtn'>取消精华</button>");
    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='essenceBtn'>置为精华</button>");
    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='unStickBtn'>取消置顶</button>");
    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='stickBtn'>置顶</button>");
    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='postBtn'>发帖</button>");
    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='viewBtn'>按人员查看</button>");
    $('#btnContainer').append("<button type='button' class='btn btn-sm btn-adv' id='collectBtn'>收藏</button>");*/
    //绑定按钮事件
      bindButton();
    //初始化收藏夹
    initFavoriteTree();
    getData({'id':id,'delflag':false,'start':0,'limit':10,'sortFields':JSON.stringify({'sortNum':'asc'})},true);    //拉取数据

})

    /**
     * 加载在线编辑器
     */

    function initEditor() {
        //实例化编辑器
        editor = UE.getEditor( 'editor', {

            autoHeightEnabled: true,

            autoFloatEnabled: true,

            initialFrameWidth: 'auto',

            initialFrameHeight:'auto',

            scaleEnabled:true

        });
    }

    /**
     * 计算点击
     */
    function HitNum() {
        try{
            $.ajax({
                type: 'PUT',
                url: baseUrl+"oa/bbs/topic/hit/"+id,
                dataType:"json",
                contentType:'application/json',
                success: function (data) {
                }
            });
        }catch (e){

        }
    }
    /**
     * 初始化附件组件
     */
    function initAttachment() {
            try{
            $('#loadFile').xljAttachment({
                appId: 'bbs',
                businessId: replyId,
                categoryId: '1',
                mode: 'add',
                singleUpload: false,
                fromTempTable:false
            });
        }catch (e){
          //  console.warn('附件初始化失败！');
        }
    }
    function IDGenerate() {
        $.ajax({
            type: 'get',
            url: baseUrl + "generator/getGuuid?time=" + Math.random(),
            success: function (data) {
                replyId = data.result;
                initAttachment();
            }
        });
    }
    /**
     * 绑定按钮事件
     */
    function bindButton() {

        //取消置顶按钮
        $('#unStickBtn').click(function() {
            updateStatus('unStick',false);
        });
        //置顶
        $("#stickBtn").click(function () {

                    stickConfirm("blue",function () {
                        var reg = new RegExp("^[0-9]*$");
                        var hour = $('#hours').val();
                        if($.trim(hour)==''){
                            alert("请输入时间!");
                            return;
                        }
                        if(!reg.test(hour)){
                            alert("请输入数字!");
                            return;
                        }
                        if(!/^[0-9]*$/.test(hour)){
                            alert("请输入数字!");
                            return;
                        }
                        updateStatus('stick',hour);
                        return;
                    },true);

        });

        //精华按钮
        $('#essenceBtn').click(function() {
             updateStatus('essence',true);
        });
        //取消精华按钮
        $('#unEssenceBtn').click(function() {
            updateStatus('unEssence',false);
        });
        //结帖按钮
        $('#endPostBtn').click(function() {
            updateStatus('endPost','CLOSED');
        });
        //转移按钮
       /* $('#transBtn').click(function() {*/
            $("#transBtn").xljSingleSelector({
                title:'版块选择',//选择器标题，默认是'选择组织机构'
                selectorType:'forum',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
                treeUrl:hostUrl + 'oa/bbs/forumType/getHomePageTree?time='+Math.random(),// 生成zTree树的请求url,不指定使用默认对应类型的url
                immediatelyShow: false,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
                treeParam:{},//生成zTree树的请求参数，json对象
                selectNodeType:{
                  msg:'只能选取板块！',
                  type:'1'
                },
                saveCallback:function (selectData,ele) {

                    var nodeChildren = selectData.children;
                    if (nodeChildren && nodeChildren.length > 0) {
                        $.xljUtils.tip('blue', '只能选取论坛板块！');
                        return;
                    }
                           updateStatus('trans',selectData.id);
                },
                formatTreeJson:function (arr) {
                    var zNodes = [];
                    for (var i = 0; i < arr.length; i++) {
                        var iconStyle='diy-group';
                        if(arr[i].code == "") {
                            iconStyle = "diy-group";
                        }else {
                            iconStyle = "diy-program";
                        }
                        zNodes.push({id:arr[i].id, pId:arr[i].pId, name:arr[i].name,iconSkin:iconStyle,type:arr[i].dataType});
                    }
                    return zNodes;
                },
                treeSettings:{
                   callback:{
                        onDblClick:false
                    },
                    data:{
                    simpleData: {
                        enable: true
                    }
                }}
            });

        // });
        //删除按钮
        $('#delBtn').click(function(ele) {

                $.xljUtils.confirm("blue","确认要删除本贴吗？" ,function(){
                    $.ajax({
                        type: "delete",
                        url: baseUrl+"oa/bbs/topic/deletePseudo/"+id,
                        dataType:"json",
                        success: function(xhr){
                            if(xhr.success){
                                window.close();
                            }else{
                                $.xljUtils.tip('red',xhr.msg);
                            }
                        }
                    });
                },true);
        });
        //关闭按钮
        $('#closeBtn').click(function() {
            window.close();
        });
        //按人员查看按钮
        $('#viewBtn').click(function() {
        	$("#viewBtn").hide();
        	$("#cancelViewBtn").show();
        	var  postData =  {'id':id,'delflag':false,'start':0,'limit':10,'sortFields':JSON.stringify({'createPersonId':'asc','sortNum':'asc'})};
        	getData(postData,false);
        });
        //取消按人员查看按钮
        $('#cancelViewBtn').click(function() {
        	$("#viewBtn").show();
        	$("#cancelViewBtn").hide();
        	var  postData =  {'id':id,'delflag':false,'start':0,'limit':10,'sortFields':JSON.stringify({'sortNum':'asc'})};
        	getData(postData,false);
        });
        //发帖按钮
        $('#postBtn').click(function() {
            window.open("topic_edit.html?oper=add");
        });

        //收藏按钮点击事件
        $('#favoriteBtn').on('click',function () {
            $('#favoriteModal').modal('show');
        });

        //保存收藏事件
        $('#saveFavoriteBtn').on('click',function () {
            $('#favoriteForm').attr('action',hostUrl+'oa/favorite/save');
            $("#favoriteId").val(id);
            $("#favoriteCode").val(id);
            $('#favoriteForm').submit();
        });

        //保存收藏夹按钮事件
        $('#saveParentFavoriteBtn').on('click',function () {
            $('#parentFavoriteForm').attr('action',hostUrl+'oa/favorite/save');
            var url = baseUrl + "generator/getGuuid" + "?time=" + Math.random();
            $.ajax({
                type: 'get',
                url: url,
                async:false,
                success: function (data) {
                    var guuid = data.result;
                    $("#parentFavoriteId").val(guuid);
                    $("#parentFavoriteCode").val(guuid);
                }
            });
            $('#parentFavoriteForm').submit();
        });

        $('#favoriteModal').on('shown.bs.modal',function () {
            var resourceLink = baseUrl+"oa/bbs/topic/topic_detail.html?id="+id;
            var favoriteName = topic;
            if($.trim(favoriteName)=='') {
                favoriteName = resourceLink;
            }
            $('#resourceLink').val(resourceLink);
            $('#favoriteName').val(favoriteName);
        });

        //创建文件夹
        $('#addParentFavorite').on('click',function () {
            // $('#parentFavoriteModal').modal('show');
            $('#parentFavoriteModal').show();
        });

       //回复按钮
        $('#reply-btn').click(function () {
            var postData = {};
            var content = editor.getContent();
            if($.trim(content)==''&&!(replyReferenceId&&replyReferenceId!='')){
                 $.xljUtils.tip("blue","回复内容不能为空！");
                return;
            }
            if(replyReferenceId&&replyReferenceId!=''){
                postData.content = content.substring(content.lastIndexOf('</blockquote>')+13);
                postData.replyReferenceId = replyReferenceId;
            }else{
                postData.content= content;
            }
            postData.topicId=id;
            postData.id = replyId;

              /*  $.ajax({
                    type: "POST",
                    url: baseUrl+"oa/bbs/reply/save",
                    dataType:"json",
                    contentType:'application/json',
                    data:JSON.stringify(postData),
                    success: function(xhr){
                        if(xhr.success){
                            $.xljUtils.tip('green','回复成功！');
                            try{
                                replyReferenceId='';//初始化引用信息
                                saveAttachement('loadFile');
                            }catch(e){

                            }
                            reloadData();
                            //初始化回复ID
                            IDGenerate();
                           editor.setContent('');
                        }else{
                            $.xljUtils.tip('red',xhr.msg);
                        }
                    }
                });*/

            //
            $('#loadFile').xljAttachmentSubmit(function (isSuccess, obj) {
                if (isSuccess) {
                    if (obj.success === true) {
                    //    $.xljUtils.tip('blue', '附件信息提交成功');

                    }
                    $.ajax({
                        type: "POST",
                        url: baseUrl+"oa/bbs/reply/save",
                        dataType:"json",
                        contentType:'application/json',
                        data:JSON.stringify(postData),
                        success: function(xhr){
                            if(xhr.success){
                                $.xljUtils.tip('green','回复成功！');
                                try{
                                    replyReferenceId='';//初始化引用信息
                                }catch(e){

                                }
                                reloadData();
                                //初始化回复ID
                                IDGenerate();
                                editor.setContent('');
                            }else{
                                $.xljUtils.tip('red',xhr.msg);
                            }
                        }
                    });

                } else {
                    $.xljUtils.getError(obj);
                }
            });


        });
    }

    /**
     * 保存附件
     */
    function saveAttachement(selector) {
        $('#'+selector).xljAttachmentSubmit(function (isSuccess, obj) {
            if (isSuccess) {
                if (obj.success === true) {
                    $.xljUtils.tip('blue', '附件信息提交成功');
                }
            } else {
                $.xljUtils.getError(obj);
            }
        });
    }
    /**
     * 置顶周期选择框
     */
    function stickConfirm(skinType, fn, failFn,yesText,callback) {
        var skinType = "blue";
        var html= '<div class="dialog-box" id=""> <div class="con '+skinType+'"> ' +
            '<span class="">置顶周期</span> <div class="tipBody">' +
            '<p><input type="text" class="form-control" id="hours" name="hours" value="" placeholder="(小时)"></p> <div class="btn-footer"> ' +
            '<button class="sure" id="easyDialogYesBtn">确定</button> <button class="cancel" id="easyDialogNoBtn">取消</button> </div> </div> </div></div>';
        easyDialog.open({
            container: {
                content: html,
                yesFn: fn,
                noFn: failFn
            },
            callback:callback
        });
        if(yesText) $("#easyDialogYesBtn").text(yesText);
        if(!failFn) $("#easyDialogNoBtn").remove();
        $(".easyDialog_footer").remove();
    }

    /**
     * 更新帖子状态
     * @param oper
     * @param param
     */
    function updateStatus(oper,param) {
        $.ajax({
            type: "put",
            contentType: "application/json",
            url: baseUrl + "oa/bbs/topic/updateStatus/"+id,
            data:JSON.stringify({'id':id,'oper':oper,'param':param}),
            dataType: "json",
            success: function (xhr) {
                if(xhr&&xhr.success){
                    reloadData();
                }else{
                    $.xljUtils.tip("red",xhr.msg);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red","系统繁忙,请稍后重试！");
            }
        });
    }

    /**
     * @param oper :screen 屏蔽 unScreen 解除屏蔽 ban 禁言
     * @param param
     */
    function screen_ban_fn(isFloorHost,oper,userId,varId,param,banDay) {
        var url;
        var postData;
        if(oper=='ban'){
            postData = JSON.stringify({'id':userId,'oper':oper,'banDay':banDay});
            url = baseUrl +"oa/bbs/forumUser/updateStatus/"+userId;
        }else if(oper=='screen'){
                 postData = JSON.stringify({'id':varId,'oper':oper,'param':param,'banDay':banDay});
                 if(isFloorHost=='true'){
                     url = baseUrl +"oa/bbs/topic/updateStatus/"+varId;
                 }else{
                     url = baseUrl +"oa/bbs/reply/updateStatus/"+varId;
                 }
        }else if(oper=='unScreen'){
                postData = JSON.stringify({'id':varId,'oper':oper,'param':param});
                if(isFloorHost=='true'){
                    url = baseUrl +"oa/bbs/topic/updateStatus/"+varId;
                }else{
                    url = baseUrl +"oa/bbs/reply/updateStatus/"+varId;
                }
        }
        $.ajax({
            type: "put",
            contentType: "application/json",
            url:url ,
            data:postData,
            dataType: "json",
            success: function (xhr) {
                if(xhr&&xhr.success){
                    reloadData();
                }else{
                    $.xljUtils.tip("red",xhr.msg);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red","系统繁忙,请稍后重试！");
            }
        });
    }

    /**
     * 删除帖子或回复
     * @param isFloorHost
     * @param varId
     */
    function contentDelFn(isFloorHost,varId) {
        var url;
        if(isFloorHost=='true'){
            url = baseUrl +"oa/bbs/topic/deletePseudo/"+varId;
        }else {
            url = baseUrl +"oa/bbs/reply/deletePseudo/"+varId;
        }
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url:url ,
            dataType: "json",
            success: function (xhr) {
                if(xhr&&xhr.success){
                    // getData({'id':id,'delflag':false,'start':0,'limit':20,'sortFields':JSON.stringify({'sortNum':'asc'})});    //拉取数据
                    reloadData();
                }else{
                    $.xljUtils.tip("red",xhr.msg);
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 帖子详细页
     * @param postData
     */
    function getData(postData,pageable) {
        //清空缓存数据
        $('.item-list').empty();
    var ajaxUtil = new AjaxUtil({
        url: hostUrl + "oa/bbs/topic/detail/page",
        data:
            JSON.stringify(postData)
        ,
        type:'POST',
        templateObj: ['#topic-template','#reply-template','#refer-template'],//页面模板id
        pagination: pageable?true:false,	//是否分页
        dataHandler: function(data) {   //数据处理
            var result = [];
            _.each(data, function(ele, index, list) {
                var obj = {};
                if(ele.floorHost){
                    if(ele.status=='DRAFT'){
                        $('.draft-hide').hide();
                    }
                    $('.topic-status').empty();
                    if(ele.essence){
                        $('.topic-status').append('<span class="icon jp">精品贴</span>');
                    }
                    if(ele.stick){
                        $('.topic-status').append('<span class="icon zd">置顶贴</span>');
                    }
                   /* if(true){
                        $('.topic-status').append('<span class="icon hot">热门贴</span>');
                    }*/
                    if(ele.closed){
                        $('.topic-status').append('<span class="icon yj">已结贴</span>');
                    }
                    $('.topic-status').append('<span class="pl0">点击:<label class="hit-num"></label></span>');
                    $('.topic-status').append('<span class="pl0">回复:<label class="reply-num"></label></span>');
                    $('.reply-title').val('回复：'+ele.topic);
                    topic = ele.topic;
                    $('.forum-title').text(ele.forum);
                    $('span.bbs-path').html('<span>'+ele.fullPath+'</span>');
                    $('.hit-num').text(ele.clickNum==null?"0":ele.clickNum);
                    $('.reply-num').text(ele.feedbackNums==null?"0":ele.feedbackNums);
                    $('#btnContainer').show();
                    if(!ele.closed){
                        $('.hffb-box').show();
                        $('.hf').show();
                    }else{
                        $('.hffb-box').hide();
                        $('.hf').hide();
                        $('.yy').hide();
                        $('.bj').hide();
                        $('.pb').hide();
                    }
                    //按钮列表
                    if(ele.essence){
                        $('#essenceBtn').hide();
                        $('#unEssenceBtn').show();
                    }else{
                        $('#unEssenceBtn').hide();
                        $('#essenceBtn').show();
                    }
                    if(ele.stick){
                        $('#stickBtn').hide();
                        $('#unStickBtn').show();
                    }else{
                        $('#unStickBtn').hide();
                        $('#stickBtn').show();
                    }
                }
                obj.topic = ele.topic;
                obj.topicId = ele.topicId;
                obj.replyId = ele.replyId;
                obj.userName = ele.userName;
                obj.userId = ele.userId;
                obj.level = ele.level;
                obj.dept = ele.dept;
                obj.post = ele.post;
                obj.publishTopicNum = ele.publishTopicNum == null?'0':ele.publishTopicNum;
                obj.score = ele.score;
                obj.floor = ele.floor;
                obj.publishTime = ele.publishTime;
                obj.role = ele.floorHost ? '楼主' : '#' + ele.floor;
                obj.content = ele.content == null ? '':ele.content;
                obj.floorHost = ele.floorHost;
                obj.praiseNum = ele.praiseNum == null? '0':ele.praiseNum;
                obj.editRecord =  ele.lastContentEditor&&ele.lastContentEditor!=null ? "该文章已在"+ele.lastContentEditTime+"被"+ele.lastContentEditor+"编辑过":"";
                obj.referData = ele.referData;
                result.push(obj);
            });
            return result;
        },
        callbackHandler: function() {
                try{
                    $('.attachment').each(function (index,obj) {
                        $('#'+obj.id).xljAttachment({
                                appId: 'bbs',
                                businessId: obj.id,
                                categoryId: '1',
                                mode: 'view',
                                singleUpload: true,
                                hideButtonsWithNoFile:true
                            });
                        }
                    );
            }catch (e){
              //  console.warn('附件组件初始化失败');
            }
            //回复跳转
            $('a.hf').click(function () {
                UE.getEditor('editor').focus();
            });
            //引用样式


        },
        pagerHandler: function(p) {
            getData(p,true);
        },
        wrapperClass: 'list-msg'
    });
    ajaxUtil.init();
}

    /**
     * 点赞
     * @param isFloorHost
     * @param replyId
     * @param topicId
     */
    window.praiseFn=function (isFloorHost,replyId,topicId) {
      console.log(isFloorHost);
}
    /**
     * 禁言
     * @param userId
     */
    window.banFn=function (userId) {
        banConfirm("blue",function () {
            var banDay = $('#banDay').val();
            screen_ban_fn(null,'ban',userId,'','',banDay);
            return;
        },true);
    }
    /**
     * 禁言周期选择框
     */
    function banConfirm(skinType, fn, failFn,yesText,callback) {
        var skinType = "blue";
        var html= '<div class="dialog-box" id=""> <div class="con '+skinType+'"> ' +
            '<span class="">禁言周期</span> <div class="tipBody">' +
            '<p><select class="form-control" id="banDay" name="banDay"><option value="15">情节轻微：15天</option><option value="30">情节严重：30天</option><option value="90">特别严重：3个月</option><option value="180">极为恶劣：6个月</option></select></p> <div class="btn-footer"> ' +
            '<button class="sure" id="easyDialogYesBtn">确定</button> <button class="cancel" id="easyDialogNoBtn">取消</button> </div> </div> </div></div>';
        easyDialog.open({
            container: {
                content: html,
                yesFn: fn,
                noFn: failFn
            },
            callback:callback
        });
        if(yesText) $("#easyDialogYesBtn").text(yesText);
        if(!failFn) $("#easyDialogNoBtn").remove();
        $(".easyDialog_footer").remove();
    }

    /**
     * 回显引用的内容
     */
    function echoQuote(from,referId) {
        $.ajax({
            type: 'POST',
            url: baseUrl + "oa/bbs/reply/quote/" + referId + '?_t=' + new Date().getTime(),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({'from':from,'id':referId}),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        var obj = xhr.result;
                        var referFloor = obj['referFloor'];
                        var referUserName = obj['referUserName'];
                        var referPublishTime = obj['referPublishTime'];
                        var content = obj['content'];
                        replyReferenceId = referId;
                        /*if(content=='<br>'){
                            //如果直接引用内容发布，引用id为前一个信息的引用id
                            replyReferenceId = obj['replyReferenceId'];
                        }*/
                        editor.ready(function () {
                            editor.setContent('<blockquote>'+referUserName+' 说：'+obj['content']+'</blockquote>');
                            editor.setContent('<p></p>',true);
                         //   debugger;
                         /*   var p = $('<p>');
                            var div = $('<div class="yy-con">');
                            var span = $('<span class="yy-floor">'+referFloor+'-</span><span class="text">'+content+'</span>');
                            var ps = $('<p><span class="name">'+referUserName+'</span>发表于<span>'+referPublishTime+'</span></p>');

                            span.appendTo(div);
                            ps.appendTo(div);
                            p.append(div);
                            editor.setContent(p.html());*/
                            editor.focus(true);
                        });
                    } else {
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            default:
                                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                                break;
                        }
                        //异常处理

                    }

                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });

    }
    /**
     * 只看该作者
     * @param userId
     */
    window.viewFn=function (oper,userId) {
        var postData;
        if(oper=='noPage'){
            postData =  {'id':id,'delflag':false,'start':0,'limit':-1,'sortFields':JSON.stringify({'sortNum':'asc'}),'createPersonId':userId};
            getData(postData,false);
        }else{
            postData =  {'id':id,'delflag':false,'start':0,'limit':20,'sortFields':JSON.stringify({'sortNum':'asc'})};
            getData(postData,true);
        }
    }
    /**
     * 跳转论坛首页
     * @param userId
     */
    window.toHomePage=function () {
        window.location.href="/platform-app/index.html?isFromForum=1";
    }
    /**
     * 引用
     * @param isFloorHost
     * @param replyId
     * @param topicId
     */
    window.quoteFn=function (isFloorHost,replyId,topicId) {
        if(isFloorHost=='true'){
            // window.open('topic_reply_edit.html?oper=add&from=floorHost&id='+topicId);
            echoQuote('floorHost',topicId);
        }else{
          //  window.open('topic_reply_edit.html?oper=add&from=floor&id='+replyId);
            echoQuote('floor',replyId);
        }

    }
    /**
     * 屏蔽
     * @param isFloorHost
     * @param replyId
     * @param topicId
     */
    window.screenFn=function (isFloorHost,userId,replyId,topicId) {
        screenConfirm("blue",function () {
            var banDay = $('#banDay').val();
            var screenReason = $('#screenReason').val();
            if(isFloorHost=='true'){
                screen_ban_fn(isFloorHost,'screen',userId,topicId,screenReason,banDay);
            }else{
                screen_ban_fn(isFloorHost,'screen',userId,replyId,screenReason,banDay);
            }
            return;
        },true);
    }
    /**
     * 解除屏蔽
     * @param isFloorHost
     * @param replyId
     * @param topicId
     */
    window.unScreenFn=function (isFloorHost,replyId,topicId) {
        if(isFloorHost=='true'){
            screen_ban_fn(isFloorHost,'unScreen','',topicId,'','0');
        }else{
            screen_ban_fn(isFloorHost,'unScreen','',replyId,'','0');
        }
    }
    /**
     * 屏蔽
     */
    function screenConfirm(skinType, fn, failFn,yesText,callback) {
        var skinType = "blue";
        var html= '<div class="dialog-box" id=""> <div class="con '+skinType+'"> ' +
            '<div class="forum-item clearfix"><span class="forum-label">屏蔽理由</span>' +
            '<textarea id="screenReason" class="form-control forum-text pull-right">此条言论违反论坛管理规定，已经被屏蔽！</textarea></div>' +
            '<div class="forum-item clearfix"><span class="forum-label">禁言周期</span><select class="form-control pull-right" id="banDay"><option value="0">请选择</option><option value="15">情节轻微：15天</option><option value="30">情节严重：30天</option><option value="90">特别严重：3个月</option><option value="180">极为恶劣：6个月</option></select></div> <div class="btn-footer"> ' +
            '<button class="sure" id="easyDialogYesBtn">确定</button> <button class="cancel" id="easyDialogNoBtn">取消</button> </div> </div> </div></div>';
        easyDialog.open({
            container: {
                content: html,
                yesFn: fn,
                noFn: failFn
            },
            callback:callback
        });
        if(yesText) $("#easyDialogYesBtn").text(yesText);
        if(!failFn) $("#easyDialogNoBtn").remove();
        $(".easyDialog_footer").remove();
    }
    /**
     * 编辑
     * @param isFloorHost
     * @param replyId
     * @param topicId
     */
    window.editFn=function (isFloorHost,replyId,topicId) {
        if(isFloorHost=='true'){
            window.open('topic_edit.html?oper=edit&id='+topicId+"&from=detail");
        }else{
            window.open('topic_reply_edit.html?oper=edit&id='+replyId+"&from=detail");
        }
    }
    /**
     * 删除
     * @param isFloorHost
     * @param replyId
     * @param topicId
     */
    window.delFn=function (isFloorHost,replyId,topicId) {
        $.xljUtils.confirm("blue","确认要删除本条数据吗？" ,function(){
            if(isFloorHost=='true'){
                contentDelFn(isFloorHost,topicId);
            }else{
                contentDelFn(isFloorHost,replyId);
            }
        },true);
    }
    /**
     * reload
     */
    window.reload = function () {
        reloadData();
    }
    function reloadData() {
        getData({'id':id,'delflag':false,'start':0,'limit':10,'sortFields':JSON.stringify({'sortNum':'asc'})},true);    //拉取数据
    }
//============================
    //初始化收藏夹树
    function initFavoriteTree() {
        $.ajax({
            type: "POST",
            url: hostUrl + "oa/favorite/queryList",
            data: JSON.stringify({}),
            dataType: "json",
            contentType: 'application/json',
            success: function (typeNodes) {
                if(typeNodes.success) {
                    var zNodes = typeNodes.result;
                    if(!zNodes){
                        return;
                    }

                    for (var j = 0; j < zNodes.length; j++) {
                        var zNode = zNodes[j];

                        if(zNode.isFavorite){
                            var optObj = $('<option></option>');
                            optObj.val(zNode.id);
                            optObj.text(zNode.name);
                            $('#favoriteParentId').append(optObj);

                            optObj = $('<option></option>');
                            optObj.val(zNode.id);
                            optObj.text(zNode.name);
                            $('#parentFavoriteParentId').append(optObj);
                            zNode.isParent = true;
                        }
                    }
                    var setting = {

                        data:{
                            simpleData:{
                                enable:true,
                                idKey:'id',
                                pIdKey:'parentId',
                                rootPId:null
                            }
                        },
                        callback:{
                            onExpand:function (event, treeId, treeNode) {
                                $.xljUtils.treeResizeFn('favorite-tree');
                            },
                            onCollapse: function(){
                                $.xljUtils.treeResizeFn('favorite-tree');
                            },
                            onClick:function (event, treeId, treeNode) {
                                if(!treeNode.isFavorite){
                                    $('#xj-index-iframe').attr('src',treeNode.resourceLink);
                                    $('#favoriteContainer').hide();
                                }
                            },
                            onRightClick:function (event,treeId,treeNode) {

                            },
                            beforeRemove:function (treeId,treeNode) {
                                var id = treeNode.id;
                                var flag = false;
                                /*$.xljUtils.confirm('blue', '确定要删除吗？', function () {

                                 },true);*/
                                $.ajax({
                                    url: hostUrl + "oa/favorite/delete/" + id,
                                    type: 'DELETE',
                                    dataType: 'JSON',
                                    async:false,
                                    success: function (resultData) {
                                        if (resultData && resultData.success) {
                                            $.xljUtils.tip('green', "数据删除成功！");
                                            flag = true;
                                        } else {
                                            $.xljUtils.tip('red', "删除数据失败！");
                                        }
                                    }
                                });
                                return flag;
                            },
                            beforeRename:function (treeId,treeNode,newName) {
                                var jsonData = {};
                                jsonData.id = treeNode.id;
                                jsonData.name = newName;
                                var flag = false;
                                $.ajax({
                                    url:hostUrl+'oa/favorite/update/'+treeNode.id,
                                    data:JSON.stringify(jsonData),
                                    type:'PUT',
                                    contentType:'application/json',
                                    dataType:'JSON',
                                    async:false,
                                    success:function (resultData ) {
                                        if(resultData) {
                                            var successFlag = resultData.success;
                                            var result = resultData.result;
                                            var msg = resultData.msg;
                                            if(successFlag) {
                                                $.xljUtils.tip('green', "重命名成功！");
                                                flag = true;
                                            }else{
                                                $.xljUtils.tip('red', "重命名失败！");
                                            }
                                        }

                                    },
                                    error:function (XMLHttpRequest, textStatus, errorThrown) {
                                        var status = XMLHttpRequest.status;
                                        $.xljUtils.getError(status);
                                    }
                                });
                                return flag;
                            },
                            onRemove:function (event, treeId, treeNode) {
                                var pNode =  treeNode.getParentNode();
                                pNode.isParent = true;
                                $.fn.zTree.getZTreeObj(treeId).updateNode(pNode);
                            }
                        },
                        edit:{
                            enable:true,
                            removeTitle:'删除',
                            renameTitle:'重命名',
                            shownRemoveBtn:true,
                            shownRenameBtn:true
                        }

                    };
                    zTreeObj = $.fn.zTree.init($("#favoriteTree"), setting, zNodes);
                    var nodes = zTreeObj.getNodes();
                    //默认展开第一个节点
                    zTreeObj.expandNode(nodes[0], true, false, false,false);
                    //zTreeObj.selectNode(nodes[0]);
                    //zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);
                    setTimeout(function(){
                        $.xljUtils.addTreeScroll('favorite-tree');
                        $.xljUtils.treeResizeFn('favorite-tree');
                    },300);
                }else{

                }
            }
        });
    }




//关闭收藏bain编辑弹出框
    window.closeFavoriteModal=function(isParent,resultData) {
        debugger;
        console.info(resultData);
        if (resultData.success) {
            var result = resultData.result;
            if (isParent) {
                $.xljUtils.tip('green', '文件夹创建成功');
                var optObj = $('<option></option>');
                optObj.val(result.id);
                optObj.text(result.name);
                $('#favoriteParentId').append(optObj);

                optObj = $('<option></option>');
                optObj.val(result.id);
                optObj.text(result.name);
                $('#parentFavoriteParentId').append(optObj);
                $('#parentFavoriteModal').modal('hide');
                result.isParent = true;

            } else {
                $.xljUtils.tip('green', '添加收藏成功');
                $('#favoriteModal').modal('hide');
                result.isParent = false;
            }

            var favoriteTree = $.fn.zTree.getZTreeObj('favoriteTree');
            var pNode = favoriteTree.getNodeByParam('id', result.parentId);
            favoriteTree.addNodes(pNode, result);
            favoriteTree.updateNode(result);

        } else {
            if (isParent) {
                $.xljUtils.tip('red', '文件夹创建失败');
            } else {
                $.xljUtils.tip('red', '添加收藏失败');
            }
        }

        $('#favoriteForm').reset();
        $('#parentFavoriteForm').reset();
    }


})(jQuery,window,document,AjaxUtil,UE)