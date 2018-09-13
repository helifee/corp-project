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
    $('#forumTypeForm')[0].reset();
    $("#closeBtn").on("click", function () {
        document.getElementById("forumTypeForm").reset();
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
    //父级信息只读
    $('#parentName').prop('readonly', 'readonly');
    
    $('.parent-selecter').xljSingleSelector({
		title:'选择上级分类',//选择器标题，默认是'选择组织机构'
		selectorType:'eeee',//选择器类型，默认是组织机构选择器:org表示组织机构选择器； person表示人员选择器；post表示岗位选择器； role表示角色选择器；menu表示菜单选择器
		treeUrl:serviceUrl + 'oa/bbs/forumType/getShowTree'+'?time='+Math.random(),// 生成zTree树的请求url,不指定使用默认对应类型的url
		treeParam:{'forumFilter':'1'},//生成zTree树的请求参数，json对象
//		targetId:'parentId',//选择的数据的ID存储input域的id
//		targetName:'parentName',//选择的数据的Name存储input域
		saveCallback:function (selectData,ele) {
			if (selectData != null) {
				$("#parentName").val(selectData.name);
				$("#parentId").val(selectData.id);
			}
		},
		formatTreeJson:formatZTreeData,
		treeSettings:{data:{
			simpleData: {
				enable: true
			}
		}}
	});
    
    $("#clearContent").unbind('click').on('click',function () {//清除内容
		$("#parentName").val("");
		$("#parentId").val("");
	});
    
    //新增操作
    if (oper == "add") {
        $('title').text("版块类型-新增");
        $(".xj-form-title").text("版块类型-新增");
        $('#forumTypeForm').attr('action', serviceUrl + 'oa/bbs/forumType/save');
        //初始化UUID
        $.ajax({
            type: "GET",
            url: serviceUrl+"oa/content/contentChild/getGuuid?time=" + Math.random(),
            dataType: "json",
            success: function (resultValue) {
                console.info(resultValue);
                uuid = resultValue.result;
                $('#id').val(uuid);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "系统繁忙,请稍后重试！");
            }
        });
        if (id != null) {
            //二级数据添加父级信息
            $('#parentId').val(id);
            $('#parentName').val(name);
        }
        //修改操作
    } else if (oper == "edit") {
        $('title').text("版块类型-修改");
        $(".xj-form-title").text("版块类型-修改");
        
        $(".input-group-addon").hide();
        
        editForumType(id);
    }
}
/**
 * 编辑分类
 * @param
 */
function editForumType(id) {
    var formElements = $("#forumTypeForm").serializeArray();
    $.ajax({
        type: 'GET',
        url: serviceUrl + "oa/bbs/forumType/get/" + id + '?time=' + Math.random(),
        //data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (xhr, textStatus) {
            if (xhr) {
                if (xhr.success) {
                    var editObjData = xhr.result;
                    for (var i in formElements) {
                        var inputName = formElements[i].name;
                        var inputVal;
                        if (inputName == 'id') {
                            inputVal = editObjData.id;
                        }
                        if (inputName == 'parentId') {
                            inputVal = editObjData.parentId;
                        }
                        if (inputName == 'parentName') {
                            inputVal = pname;
                        }
                        if (inputName == 'code') {
                            inputVal = editObjData.code;
                        }
                        if (inputName == 'sortNum') {
                            inputVal = editObjData.sortNum;
                        }
                        if (inputName == 'description') {
                            inputVal = editObjData.description;
                        }
                        if (inputName == 'name') {
                            inputVal = editObjData.name;
                        }
                        if (inputName == 'delflag') {
                            inputVal = editObjData.delflag;
                        }
                        $("#forumTypeForm :input[name='" + inputName + "']").val(inputVal);
                    }
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

    $('#forumTypeForm').attr('action', serviceUrl + 'oa/bbs/forumType/update/' + id);
    $('#forumTypeForm').attr('method', 'put');
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
 * 定义 节点
 * @returns
 */
function TreeViewData() {
}
/**
 * 表单保存提交
 */
function submitForm() {
        $('#forumTypeForm').submit();
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
/**
 *关闭表单回调方法
 */
function closeForumTypeModal(xhr) {
    console.log(xhr);
    if (xhr) {
        var successFlag = xhr.success;
        if (successFlag) {
            if (window.opener != null) {
                //刷新父页面grid
                window.opener.reloadGrid(oper,$("#forumTypeForm").find("input[name='id']").val());
            }
            document.getElementById("forumTypeForm").reset();
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
