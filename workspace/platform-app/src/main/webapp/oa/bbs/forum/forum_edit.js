/**
 * @author luorongxin
 */
var id;//编辑的菜单id
var name;//编辑的名称
var pname;//父级名
var oper;//操作
var rowData;//选中的系统菜单
var uuid;
var url;//提交表单的地址
var type;//提交表单的方法
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
    //获取url参数
    id = $.xljUtils.getUrlParam("id");
    name = decodeURI(escape($.xljUtils.getUrlParam("name")));
    pname = decodeURI(escape($.xljUtils.getUrlParam("pname")));
    oper = $.xljUtils.getUrlParam("oper");
    //重置表单
    $('#forumForm')[0].reset();
    $("#closeBtn").on("click", function () {
        document.getElementById("forumForm").reset();
    });
    //绑定按钮事件
    //保存按钮
    $("#saveBtn").on('click', function () {
        submitForm();
    });
    //关闭当前页面
    $("#closeBtn").on('click', function () {
        window.close();
    });
    
    $("#clearContent").unbind('click').on('click',function () {//清除内容
		$("#forumManager").val("");
		$("#forumManagerId").val("");
	});
    
    $('.parent-selecter').xljSingleSelector({
		title:'选择上级分类',//选择器标题，默认是'选择组织机构'
		selectorType:'eeee',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
		treeUrl:hostUrl + 'oa/bbs/forumType/getShowTree'+'?time='+Math.random(),// 生成zTree树的请求url,不指定使用默认对应类型的url
		treeParam:{},//生成zTree树的请求参数，json对象
//		targetId:'parentId',//选择的数据的ID存储input域的id
//		targetName:'parentName',//选择的数据的Name存储input域
		saveCallback:function (selectData,ele) {
			if (selectData != null) {
				$("#parentName").val(selectData.name);
				$("#typeId").val(selectData.id);
			}
		},
		selectNodeType:{
			"isParent":false,
			"msg":"只能选择叶子节点！"
		},
		formatTreeJson:formatZTreeData,
		treeSettings:{data:{
			simpleData: {
				enable: true
			}
		}}
	});
    //新增操作
    if (oper == "add") {
        $('title').text("论坛版块-新增");
        $(".xj-form-title").text("论坛版块-新增");
        $('#forumForm').attr('action', baseUrl + 'oa/bbs/forum/save');
        //初始化UUID
        $.ajax({
            type: "GET",
            url: baseUrl+"oa/content/contentChild/getGuuid?time=" + Math.random(),
            dataType: "json",
            success: function (resultValue) {
                uuid = resultValue.result;
                $('#id').val(uuid);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "系统繁忙,请稍后重试！");
            }
        });
        //获取登录人信息
        getLoginMsg();
        //修改操作
    } else if (oper == "edit") {
        $('title').text("论坛版块-修改");
        $(".xj-form-title").text("论坛版块-修改");
        $("#updateLine").show();
        editForum(id);
    }
}
/**
 * 编辑分类
 * @param
 */
function editForum(id) {
    var formElements = $("#forumForm").serializeArray();
    $.ajax({
        type: 'GET',
        url: baseUrl + "oa/bbs/forum/get/" + id + '?time=' + Math.random(),
        //data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (xhr, textStatus) {
            if (xhr) {
                if (xhr.success) {
                    var result = xhr.result;
                    for(var item in result) {
                        if($("#forumForm :input[name='"+item+"']").length>0){
                        	if(item=="portalPermission"){
                        		if(result.portalPermission=="1"){
                        			$("#forumForm :input[name='portalPermission']").eq(0).prop('checked', 'checked');
                	        	}else{
                	        		$("#forumForm :input[name='portalPermission']").eq(1).prop('checked', 'checked');
                	        	}
                        	}else{
                        		$("#forumForm :input[name='"+item+"']").val(result[item]);
                        	}
                            
                        }
                    }
                    $("#parentName").val(result.forumTypeName);
                    $("#createPersonSpan").html(result.createPersonName);
                    $("#createTimeSpan").html(result.createDate);
                    $("#updatePersonSpan").html(result.updatePersonName);
                    $("#updateTimeSpan").html(result.updateDate);
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

    $('#forumForm').attr('action', baseUrl + 'oa/bbs/forum/update/' + id);
    $('#forumForm').attr('method', 'put');
}

/**
 * 获取登录人信息
 */
function getLoginMsg(){
	$.ajax({
        type: "post",
        url: baseUrl+"oa/bbs/forum/queryLoginUser",
        dataType: "json",
        contentType:'application/json',
        data:JSON.stringify({}),
        success: function (resultValue) {
            var data = resultValue.result;
            if(data){
            	$("#createPersonSpan").html(data.createPersonName);
            	$("#createPersonName").val(data.createPersonName);
            	$("#createPersonId").val(data.createPersonId);
            	$("#createTimeSpan").html(data.createDate);
            	$("#createDate").val(data.createDate);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.xljUtils.tip("red", "系统繁忙,请稍后重试！");
        }
    });
}

/**
 * treeview 格式化
 */
var num = 0;
var level = 0;
function formateTreeView(data) {
    var nodeArray = new Array();
    for (var i in data.result) {
        var node = data.result[i];
        var treeViewData = new TreeViewData();
        treeViewData.id = node.id;
        treeViewData.name = node.name;
        treeViewData.code = node.code;
        treeViewData.parentId = node.parentId;
        treeViewData.level = level;
        if (node.children != null && node.children.length > 0) {
            treeViewData.isLeaf = false;
        } else {
            treeViewData.isLeaf = true;
        }
        treeViewData.expanded = false;
        treeViewData.loaded = true;
        treeViewData.lft = num;
        nodeArray.push(treeViewData);
        expandedNode(nodeArray, treeViewData);
        num = getChildren(node, nodeArray, level, num);
        treeViewData.rgt = num;
    }
    return nodeArray;
}
/**
 * 递归子集
 * @param parentNode
 * @param nodeArray
 * @param level
 * @param num
 * @returns {Number}
 */
function getChildren(parentNode, nodeArray, level, num) {
    if (parentNode.children != null && parentNode.children.length > 0) {
        level++;
        for (var i in parentNode.children) {
            ++num;
            var node = parentNode.children[i];
            var treeViewData = new TreeViewData();
            treeViewData.id = node.id;
            treeViewData.name = node.name;
            treeViewData.code = node.code;
            treeViewData.parentId = parentNode.id;
            treeViewData.level = level;
            if (node.children != null && node.children.length > 0) {
                treeViewData.isLeaf = false;
            } else {
                treeViewData.isLeaf = true;
            }
            treeViewData.expanded = false;
            treeViewData.loaded = true;
            treeViewData.lft = num;
            nodeArray.push(treeViewData);
            expandedNode(nodeArray, treeViewData);
            num = getChildren(node, nodeArray, level, num);
            treeViewData.rgt = num;
        }
        num++;

    } else {
        num++;
    }
    return num;
}

/**
 * 根据查询返回数据整理成zTree需要的JSON数据
 * @param arr
 * @returns
 */
function formatZTreeData(arr) {
	var zNodes = [];
	
	for (var i = 0; i < arr.length; i++) {
		var iconStyle='diy-group';
		if(arr[i].pId == '0') {
			iconStyle = "diy-group";
		}else {
			iconStyle = "diy-program";
	    } 
		zNodes.push({id:arr[i].id, pId:arr[i].pId, name:arr[i].name,iconSkin:iconStyle});
	}
	return zNodes;
};
//var reg   =/^[^@\/\'\\\"#$%&\^\*]+$/;
//function SpecialWordRegCheck(obj){
// var reg= /[(\/)(<)(>)]/g">\\)(')(")(<)(>)]/g;
// var str = obj.value;
// var flag= reg.test(str);
// flag = !flag;
// return flag;
//}

/**
 * 定义 节点
 * @returns
 */
function TreeViewData() {
}
/**
 * 表单保存提交
 */
function submitForm() {
        $('#forumForm').submit();
}
/**
 *关闭表单回调方法
 */
function closeForumModal(xhr) {
    if (xhr) {
        var successFlag = xhr.success;
        if (successFlag) {
            if (window.opener != null) {
                //刷新父页面grid
            	window.opener.reloadList(oper,$("#forumForm").find("input[name='id']").val());
            }
            document.getElementById("forumForm").reset();
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
