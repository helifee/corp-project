;(function ($,window,document,UE) {
    /**
     * @author luorongxin
     */
    var id;//主键ID
    var oper;//操作 edit / add
    var editor;//在线编辑器
    var from;//引用来源
    $(function () {
        //获取url参数
        id = $.xljUtils.getUrlParam("id");
        oper = $.xljUtils.getUrlParam("oper");
        var forumId = $.xljUtils.getUrlParam("forumId");
        var forumName = decodeURI(escape($.xljUtils.getUrlParam("forumName")));
        getUserInfo();
        //绑定按钮事件
        bindButton();
        //新增操作
        if (oper == "add") {
            $(".xj-form-title").text("帖子-新增");
            if(forumId!=null && forumId!="" && forumId!="null"){
            	$("#forumId").val(forumId);
            }
            if(forumName!=null && forumName!="" && forumName!="null"){
            	$("#forum").val(forumName);
            }
            from = $.xljUtils.getUrlParam("from");
            //初始化UUID
            $.ajax({
                type: 'get',
                url: baseUrl + "generator/getGuuid?"+"_t=" + new Date().getTime(),
                success: function (data) {
                    var varId = data.result;
                    $('#id').val(varId);
                    $('#createDate').val(getNowFormatDate());
                    //加载editor
                    initEditor();
                    //初始化附件
                    initAttachment(varId);
                }
            });
            //回显引用内容
          //  echoQuote(from);

        } else if (oper == "edit") {  //修改操作
            $(".xj-form-title").text("帖子-修改");
            from = $.xljUtils.getUrlParam("from");
            if(from&&from=='detail'){
                $('#temporaryBtn').hide();
            }
            //回显数据
            editData();
            //初始化附件
            initAttachment(id);
        }
    });

    /**
     * 绑定按钮事件
     */
    function  bindButton() {
        //保存按钮
        $("#saveBtn").on('click', function () {
            submitForm('save');
        });
        //暂存按钮
        $("#temporaryBtn").on('click', function () {
            submitForm('temporary');
        });
        //关闭按钮
        $("#closeBtn").on('click', function () {
            window.close();
        });
        //选择器
        $("#forumSelf").xljSingleSelector({
            title:'版块选择',//选择器标题，默认是'选择组织机构'
            selectorType:'eeee',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
            treeUrl:hostUrl + 'oa/bbs/forumType/getHomePageTree'+'?time='+Math.random(),// 生成zTree树的请求url,不指定使用默认对应类型的url
            treeParam:{'filterByRole':'filterByRole'},//生成zTree树的请求参数，json对象
            saveCallback:function (selectData,ele) {
                if (selectData != null) {
                    $("#forum").val(selectData.name);
                    $("#forumId").val(selectData.id);
                }
            },
            selectNodeType:{
                "dataType":"1",
                "msg":"请选择版块！"
            },
            formatTreeJson:formatZTreeData,
            treeSettings:{data:{
                simpleData: {
                    enable: true
                }
            }}
        });
        //清除选择器内容
        $(".fa-times").on('click',function () {
            $("#forum").val("");
            $("#forumId").val("");
        });
    }

    /**
     * 获取用户信息
     */
    function getUserInfo(){
        $.ajax({
            url:hostUrl+'oa/content/contentRowType/getUserInfo?time='+Math.random(),
            type:'GET',
            dataType:'JSON',
            success:function (returnData) {
                var  currentUser = returnData.result.securityUserDto.realName;
                $('#createPersonName').val(currentUser);
            }
        });
    }
    /**
     * 回显引用的内容
     */
    function echoQuote(from) {
        $.ajax({
            type: 'POST',
            url: baseUrl + "oa/bbs/reply/quote/" + id + '?_t=' + new Date().getTime(),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({'from':from,'id':id}),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        var obj = xhr.result;
                        referFloor = obj['referFloor'];
                        referUserName = obj['referUserName'];
                        referPublishTime = obj['referPublishTime'];
                        //动态填充内容,获取table中的text属性
                        $("#contentForm :input[type='text']").each(function () {
                            if (obj[this.name] != "" && obj[this.name] != undefined) {
                                if(this.name=='title'){
                                    this.value = '回复：'+obj[this.name];
                                }else
                                    this.value = obj[this.name];
                            } else {
                                this.value = "";
                            }
                        });
                        //动态填充内容,获取table中的input属性
                        $("#contentForm :input[type='hidden']").each(function () {
                            if (obj[this.name] != "" && obj[this.name] != undefined) {
                                this.value = obj[this.name];
                            }
                        });
                        //加载editor
                        initEditor();
                        // editor.setData('<blockquote>'+obj['content']+'</blockquote></br>');//在线编辑器附值
                           editor.setContent('<blockquote>'+obj['content']+'</blockquote></br>');
                    } else {
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            default:
                                $.xljUtils.tip("red", "系统繁忙，请稍后重试！");
                                break;
                        }
                    }

                } else {
                    $.xljUtils.tip("red", "系统繁忙，请稍后重试！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "系统繁忙，请稍后重试！");
            }
        });

    }
    /**
     * 编辑回复
     * @param
     */
    function editData() {
        $.ajax({
            type: 'GET',
            url: baseUrl + "oa/bbs/topic/get/" + id + '?_t=' + new Date().getTime(),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        var obj = xhr.result;
                        //动态填充内容,获取table中的text属性
                        $("#contentForm :input[type='text']").each(function () {
                            if (obj[this.name] != "" && obj[this.name] != undefined) {
                                    this.value = obj[this.name];
                            } else {
                                this.value = "";
                            }
                        });
                        //动态填充内容,获取table中的input属性
                        $("#contentForm :input[type='hidden']").each(function () {
                            if (obj[this.name] != "" && obj[this.name] != undefined) {
                                this.value = obj[this.name];
                            }
                        });
                        //加载editor
                        initEditor();
                        editor.ready(function () {
                            editor.setContent(obj['content'])
                        });
                        editor.focus(true);
                    } else {
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            default:
                                $.xljUtils.tip("red", "系统繁忙，请稍后重试！");
                                break;
                        }
                    }

                } else {
                    $.xljUtils.tip("red", "系统繁忙，请稍后重试！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "系统繁忙，请稍后重试！");
            }
        });

    }

    /**
     * 递归树匹配节点icon
     */
    function formatZTreeData(arr) {
        var zNodes = [];

        for (var i = 0; i < arr.length; i++) {
            var iconStyle='diy-group';
            if(arr[i].code == "") {
                iconStyle = "diy-group";
            }else {
                iconStyle = "diy-program";
            }
            zNodes.push({id:arr[i].id, pId:arr[i].pId, name:arr[i].name, dataType:arr[i].dataType,iconSkin:iconStyle});
        }
        return zNodes;
    };
    /**
     * 获取当前时间
     * @returns {string}
     */
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }
    /**
     * 表单保存提交
     */
    function submitForm(saveType) {
        var url;
        var method;
        var postData = {};

        if(saveType=='save'){
            $.xljUtils.customSingleValidate($('#contentForm')[0]);
            if(!$('#contentForm').valid()){
                return;
            }
            postData.status='PUBLISHED';
        }else if(saveType=='temporary'){
            var titleVal = $('#title').val();
            $("#contentForm").find("input[name='title']").parent().removeClass('has-error');
            $('#title-error').remove();
            if($.trim(titleVal)==''){
                $("#contentForm").find("input[name='title']").parent().addClass('has-error');
                $("#contentForm").find("input[name='title']").parent().append('<label id="title-error" class="error help-block" for="title" style="margin: 0px; text-align: left;">主题不能为空</label>');
                return;
            }
            postData.status='DRAFT';
        }


        if(oper=='add'){
            url = baseUrl + "oa/bbs/topic/save";
            method = 'POST';
            postData.id = $('#id').val();

        }else
        if(oper=='edit'){
            url = baseUrl + "oa/bbs/topic/update/"+id;
            method = 'PUT';
            postData.id = id;
        }
        // postData.content = CKEDITOR.instances.content.getData();
        postData.content = editor.getContent();
        postData.forumId = $('#forumId').val();
        postData.forum = $('#forum').val();
        postData.title = $('#title').val();
        /*if(from&&from!=null){
            postData.replyReferenceId = id;
            var content = CKEDITOR.instances.content.getData();
            var referUser ='来自'+referUserName+'('+referFloor+') '+ referPublishTime +' 发表的回复：';
            var field = $('<div/>');
            field.append($('<fieldset style="background-color: #ececec;"><span style="font-size: 12px;font-family: 微软雅黑">'+referUser+'</span></fieldset>')
                .append($(content).filter('blockquote')))
                .append($(content).filter('p'));
            field.find('blockquote').css({'font-size': '12px','font-family': '微软雅黑'});
            postData.content = field.html();
        }*/
        $.ajax({
            type: method,
            url: url,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify(postData),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        //保存附件
                        saveAttachement();
                        try{
                            window.opener.reloadList();
                        }catch (e){

                        }
                        try{
                            window.opener.reload();
                        }catch (e){

                        }

                        window.close();
                    } else {
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            default:
                                $.xljUtils.tip("red", "系统繁忙，请稍后重试！");
                                break;
                        }
                    }

                } else {
                    $.xljUtils.tip("red", "系统繁忙，请稍后重试！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "系统繁忙，请稍后重试！");
            }

        });
    }

    /**
     * 加载在线编辑器
     */

    function initEditor() {
        //加载在线编辑器
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
     * 初始化附件
     * @param
     */
    function initAttachment(varId){
        try{
            $('#attach_topic').xljAttachment({
                appId: 'bbs',
                businessId: varId,
                categoryId: '1',
                mode: oper,
                singleUpload: false
            });
        }catch (e){
            console.warn('附件初始化失败！');
        }
    }

    /**
     * 保存附件
     */
    function saveAttachement() {
        $('#attach_topic').xljAttachmentSubmit(function (isSuccess, obj) {
            if (isSuccess) {
                if (obj.success === true) {
                    $.xljUtils.tip('blue', '附件信息提交成功');
                }
            } else {
                $.xljUtils.getError(obj);
            }
        });
    }



})(jQuery,window,document,UE)
