;(function ($,window,document,undefined) {
/**
 * @author zhangfangzhi
 */
var id;//编辑的菜单id
var name;//编辑的名称
var pname;//父级名
var oper;//操作
var rowData;//选中的系统菜单
var uuid;
var url;//提交表单的地址
var type;//提交表单的方法
var editor;
$(function () {
    //初始化
    initPage();
    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
});
/**
 * 初始化页面
 */
function initPage() {
//	$('#topicForm').height($(window).height() - $('.xj-form-header').height());
    //获取url参数
    id = $.xljUtils.getUrlParam("id");
    name = decodeURI(escape($.xljUtils.getUrlParam("name")));
    pname = decodeURI(escape($.xljUtils.getUrlParam("pname")));
    oper = $.xljUtils.getUrlParam("oper");
    //重置表单
    $('#topicForm')[0].reset();
    //绑定按钮事件
    //保存按钮
    $("#saveFloatWindowBtn").on('click', function () {
        submitForm();
    });
    //关闭当前页面
    $("#closeFloatWindowBtn").on('click', function () {
        window.close();
    });
    
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
	$(".fa-times").unbind('click').on('click',function () {//清除内容
		$("#forumName").val("");
		$("#forumId").val("");
	});
	
    //新增操作
    if (oper == "add") {
        $('title').text("帖子-新增");
        $(".xj-form-title").text("帖子-新增");
        $('#topicForm').attr('action', baseUrl + 'oa/bbs/topic/save');
        //初始化UUID
        $.ajax({
            type: "GET",
            url: baseUrl+"oa/content/contentChild/getGuuid",
            dataType: "json",
            success: function (resultValue) {
                uuid = resultValue.result;
                $('#id').val(uuid);
                initAttarch(uuid,oper);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "系统繁忙,请稍后重试！");
            }
        });
        //加载editor
        initEditor();
        //修改操作
    } else if (oper == "edit") {
        $('title').text("帖子-修改");
        $(".xj-form-title").text("帖子-修改");
        //加载editor
        initEditor();
        editForum(id,oper);
    }
}
/**
 * 编辑帖子
 * @param
 */
function editForum(id,oper) {
    var formElements = $("#topicForm").serializeArray();
    $.ajax({
        type: 'GET',
        url: baseUrl + "oa/bbs/topic/get/" + id + '?time=' + Math.random(),
        //data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (xhr, textStatus) {
            if (xhr) {
                if (xhr.success) {
                    var result = xhr.result;
                    for(var item in result) {
                        if($("#topicForm :input[name='"+item+"']").length>0){
                        	$("#topicForm :input[name='"+item+"']").val(result[item]);
                        }
                    }
                    $("#forumName").val(result.forum);
                    editor.setData(result['content']);//在线编辑器附值
                    initAttarch(result.id,oper);
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

    $('#topicForm').attr('action', baseUrl + 'oa/bbs/topic/update/' + id);
    $('#topicForm').attr('method', 'put');
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
	$("#content").val(CKEDITOR.instances.content.getData());
    $('#topicForm').submit();
}
/**
 *关闭表单回调方法
 */
function closeForumModal(xhr) {
    console.log(xhr);
    if (xhr) {
        var successFlag = xhr.success;
        if (successFlag) {
            //保存附件
            saveAttachement();
            if (window.opener != null) {
                try{
                    //刷新父页面grid
                    window.opener.reloadList();
                }catch (e){
                }
            }
            document.getElementById("topicForm").reset();
            window.close();
        } else {
            switch (xhr.code) {
                case "50000":
                    $.xljUtils.tip("red", xhr.msg);
                    break;
                case "50001":
                    $.xljUtils.tip("red", xhr.msg);
                    break;
                case "50002":
                    $.xljUtils.tip("blue", xhr.msg);
                    break;
                case "50003":
                    $.xljUtils.tip("red", xhr.msg);
                    break;

                default:
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    break;
            }
        }
    }
}

/**
 * 加载在线编辑器
 */

function initEditor() {
    //加载在线编辑器
    var ckH = $(window).height() - 360;

    if(CKEDITOR.instances['content']){
        CKEDITOR.remove(CKEDITOR.instances['content']);
    }
    editor = CKEDITOR.replace('content',  { height: ckH + 'px' });

    CKEDITOR.on('instanceReady', function (ev) {
        editor = ev.editor;
        editor.setReadOnly(false);

    });
}

/**
 * 初始化附件
 * @param contentRowTypeId
 */
function initAttarch(busId,oper){
	try{
	    $('#attach_topic').xljAttachment({
	        appId: '1',
	        businessId: busId,
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

})(jQuery,window,document,CKEDITOR)
