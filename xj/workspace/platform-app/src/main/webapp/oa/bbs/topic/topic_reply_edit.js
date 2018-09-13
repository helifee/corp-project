;(function ($,window,document,UE) {
/**
 * @author luorongxin
 */
var id;//主键ID
var oper;//操作 edit / add
var editor;//在线编辑器
var from;//引用来源
var referUserName;//引用发表人
var referPublishTime;//引用发表时间
var referFloor;//引用楼层
$(function () {
    //获取url参数
    id = $.xljUtils.getUrlParam("id");
    oper = $.xljUtils.getUrlParam("oper");
    //绑定按钮事件
    bindButton();
    //新增操作
    if (oper == "add") {
        $(".xj-form-title").text("帖子回复-新增");
         from = $.xljUtils.getUrlParam("from");
        //初始化UUID
        $.ajax({
            type: 'get',
            url: baseUrl + "generator/getGuuid?"+"_t=" + new Date().getTime(),
            success: function (data) {
                var varId = data.result;
                $('#id').val(varId);
                //初始化附件
                initAttachment(varId);
            }
        });
        //回显引用内容
         echoQuote(from);

    } else if (oper == "edit") {  //修改操作
        $(".xj-form-title").text("帖子回复-修改");
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
            submitForm();
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
            treeParam:{},//生成zTree树的请求参数，json对象
            saveCallback:function (selectData,ele) {
                if (selectData != null) {
                    $("#forumName").val(selectData.name);
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
            $("#forumName").val("");
            $("#forumId").val("");
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
                        editor.focus(true);
                        editor.ready(function () {
                            // editor.setContent('<blockquote>'+obj['content']+'</blockquote>');
                            debugger;
                               var p = $('<p>');
                             var div = $('<div class="yy-con">');
                             var span = $('<span class="yy-floor">1-</span><span class="text">感谢楼主分享，支持原创！</span>');
                             var ps = $('<p><span class="name">孙全新</span>发表于<span>2017-06-28 14:34</span></p>');

                             span.appendTo(div);
                             ps.appendTo(div);
                             p.append(div);
                             editor.setContent(p.html());
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
 * 编辑回复
 * @param
 */
function editData() {
    $.ajax({
        type: 'GET',
        url: baseUrl + "oa/bbs/reply/get/" + id + '?_t=' + new Date().getTime(),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (xhr, textStatus) {
            if (xhr) {
                if (xhr.success) {
                    var obj = xhr.result;
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
                    $('#editor').html(obj['content']);//在线编辑器附值
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
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                            break;
                    }
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
 * 表单保存提交
 */
function submitForm() {
    var url;
    var method;
    var postData = {};
    if(oper=='add'){
        url = baseUrl + "oa/bbs/reply/save";
        method = 'POST';
        postData.id = $('#id').val();
    }else
    if(oper=='edit'){
        url = baseUrl + "oa/bbs/reply/update/"+id;
        method = 'PUT';
        postData.id = id;
    }
    postData.content = editor.getContent();
    postData.topicId = $('#topicId').val();
    if(from&&from!=null){
       postData.replyReferenceId = id;
        var content = editor.getContent();
      /*  var referUser ='来自'+referUserName+'('+referFloor+') '+ referPublishTime +' 发表的回复：';
        var field = $('<div/>');
        field.append($('<div style="background-color: #ececec;"><span style="font-size: 12px;font-family: 微软雅黑">'+referUser+'</span></div>')
            .append($(content).filter('blockquote')))
            .append($(content).filter('p'));
           field.find('blockquote').css({'font-size': '12px','font-family': '微软雅黑'});
        postData.content = field.html();
       */
        postData.content = content;
    }
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
                    window.opener.reload();
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
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                            break;
                    }
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

        allowDivTransToP: false,

        scaleEnabled:true

    });
}

/**
 * 初始化附件
 * @param
 */
function initAttachment(varId){
	try{
	    $('#attach_reply').xljAttachment({
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
    $('#attach_reply').xljAttachmentSubmit(function (isSuccess, obj) {
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
