/**
 * lixd
 * 代码树js
 */
//全局参数
//组织机构树
var  zTreeObj;
var rowDataBefore;
var rowData;
//组织机构树
var zTreeObj;
//组织机构树 的参数配置
var setting = {
    view: {
        dblClickExpand: false,
        showLine: false,
        selectedMulti: false,
        fontCss: getFontCss,
        nameIsHTML: true
    },
    data: {
        keep: {
            leaf: false,
            parent: true
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        onCollapse: function () {
            $.xljUtils.treeResizeFn();
        },
        //onExpand: onExpand, //捕获节点被展开的事件回调函数
        onClick: zTreeOnClick //点击节点事件
    }
};

/**
 * 捕获节点被展开的事件回调函数
 * @param event
 * @param treeId
 * @param treeNode
 */
function onExpand(event, treeId, treeNode) {
    if (treeNode === autoExpandNode) {
        className = (className === "dark" ? "" : "dark");
        showLog("[ " + getTime() + " onExpand ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
    }
    $.xljUtils.treeResizeFn();
}

//拖拽树的参数
var log, className = "dark", curDragNodes, autoExpandNode;
var source;
var target;
var type;
//树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};


//====================================以下是树相关方法===================================================
//树搜索定义的输入框
var key = $("#key");
/**
 * 获取系统代码树
 * @param codeSetId 代码集id
 */
function getCodeTree(codeSetId) {
    //获取组织机构树地址
    var urlBody = "sys/sysCodeSet/getTree";
    var urlAll = serviceUrl + urlBody;
    var jsonData = {
        rootDelFlag: 0,//根,即代码集 是否删除标识
        codeDelFlag: 0,//代码是否删除标识
        parentId: null,
        codeStatus:1,//有效的
        codeSetId:codeSetId//要展示的代码集id
    };
    $.ajax({
        type: 'POST',
        url: urlAll,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        success: function (json) {
            //返回的数据节点
            var zNodes = json.result;
            //设置图片样式
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);

            var nodes = zTreeObj.getNodes();
            //默认展开第一个节点
            zTreeObj.expandNode(nodes[0], true, false, false, false);
            key = $("#key");
            key.bind("focus", focusKey)
                .bind("blur", blurKey)
                .bind("propertychange", searchNode)
                .bind("input", searchNode);

            setTimeout(function () {
                $.xljUtils.addTreeScroll('ztree-box');
                $.xljUtils.treeResizeFn();
            }, 300);

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "获取组织机构树请求失败");
        }
    })
}

/**
 * 树搜索方法，聚集焦点
 *
 */

function focusKey(e) {
    if (key.hasClass("empty")) {
        key.removeClass("empty");
    }
}
/**
 * 树搜索方法，失去焦点
 *
 */
function blurKey(e) {
    if (key.get(0).value === "") {
        key.addClass("empty");
    }
}
/**
 * 树搜索方法，点击图片
 *
 */
function clickRadio() {
    lastValue = "";
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    var value = $.trim(key.get(0).value);
    //如果搜索框内无内容，不进行搜索，展开所有节点
    if (value == "") {
        zTree.expandAll(true);
        $.xljUtils.treeResizeFn();
    } else {
        searchNode();
    }
}

/**
 * 搜索节点
 * @param e
 */
function searchNode(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    var keyType = "name";
    var value = $.trim(key.get(0).value);
    if (lastValue === value) return;
    lastValue = value;
    if (value === "") return;
    updateNodes(false);

    nodeList = zTree.getNodesByParamFuzzy(keyType, value);
    for (var i = 0; i < nodeList.length; i++) {
        var node = nodeList[i];
        var parentNode = node.getParentNode();
        if (parentNode && !parentNode.open) {
            zTree.expandNode(parentNode, true, false, false, true);

        }
    }
    updateNodes(true);

}

/**
 * 刷新tree节点
 * @param highlight 高亮显示
 */
function updateNodes(highlight) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    for (var i = 0, l = nodeList.length; i < l; i++) {
        nodeList[i].highlight = highlight;
        zTree.updateNode(nodeList[i]);
    }
}
/**
 * 组织机构树点击节点事件
 */
function zTreeOnClick(event, treeId, treeNode) {
    //代码id
    var treeCodeId = "";
    if (treeNode.type != "cata") {
        treeCodeId = treeNode.id;
    }
    //自己的js中定义的点击事件触发的方法
    treeClick();
}
/**
 * 个性化文字样式，只针对 zTree 在节点上显示的对象
 * @param treeId
 * @param treeNode
 * @returns
 */
function getFontCss(treeId, treeNode) {
    /*return (!!treeNode.highlight) ? {color:'#A60000', "font-weight":"bold"} : {color:"#333", "font-weight":"normal"} | (treeNode.status&&treeNode.status=='0') ?
     {'color':'#CD0000'} :
     {color:"#333", "font-weight":"normal",'font-style':'normal'};*/
    return (treeNode.highlight) ?
    {
        'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif',
        'font-style': 'italic',
        "font-weight": "bold"
    } :
        {
            color: "#333",
            "font-weight": "normal",
            'font-style': 'normal'
        } | (treeNode.status && treeNode.status == '0') ?
        {
            'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif',
            'font-style': 'normal',
            'color': '#CD0000'
        } :
        {color: "#333", "font-weight": "normal", 'font-style': 'normal'};
}



/**
 * 获取时间
 * @returns {String}
 */
function getTime() {
    var now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        ms = now.getMilliseconds();
    return (h + ":" + m + ":" + s + " " + ms);
}

/**
 * 递归设置树的图片样式
 */
function recursionArray(arr) {
    //所属的分类 diy-group 目录 diy-company 集团和公司;diy-program 项目和分期;diy-department 部门;
    for (var i in arr) {
        if (arr[i].type == "zb" || arr[i].type == "company") {
            arr[i].iconSkin = "diy-company";
            if (arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        } else if (arr[i].type == "dept") {
            arr[i].iconSkin = "diy-department";
            if (arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        } else if (arr[i].type == "group") {
            arr[i].iconSkin = "diy-program";
            if (arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        } else if (arr[i].type == "branch") {
            arr[i].iconSkin = "diy-program";
            if (arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        } else if (arr[i].type == "cata") {
            arr[i].iconSkin = "diy-group";
            if (arr[i].children.length > 0) {
                recursionArray(arr[i].children);
            }
        }
    }
}
