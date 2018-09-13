//zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
var setting = {
    view: {
        dblClickExpand: false,
        showLine: true,
        selectedMulti: false,
        fontCss: getFontCss,
        nameIsHTML: true
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: showRenameBtn
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
        beforeClick: zTreeBeforeOnClick,
        onClick: zTreeOnClick, //点击节点事件
        beforeDrag: function () {
            return false;
        },//角色不允许拖拽
        // beforeRename: zTreeBeforeRename,//编辑节点之前
        // onRename: zTreeOnRename,//编辑节点之后
        onCollapse: function () {
            $.xljUtils.treeResizeFn();
        },
        onExpand: function () {
            $.xljUtils.treeResizeFn();
        } //捕获节点被展开的事件回调函数
    }
};

/**
 * 递归获取树图片样式
 */
function recursionArray(arr) {
    for (var i in arr) {
        arr[i].iconSkin = "diy-company";
    }
}


/**
 * 树搜索方法
 */

function focusKey(e) {
    if (key.hasClass("empty")) {
        key.removeClass("empty");
    }
}
function blurKey(e) {
    if (key.get(0).value === "") {
        key.addClass("empty");
    }
}

/* 点击查询 出现 隐藏search框 */
$(".my-search-btn").on("click", function (e) {
    var w_h = $(window).height();
    $(this).parent().parent().next().toggle();
    $(".searchBox").is(':hidden') ? $(".slide-left .ztree-box").height((w_h - 90) + "px") : $(".slide-left .ztree-box").height((w_h - 141) + "px");
    e.stopPropagation();
});

$("#key").keydown(function (e) {
    if (e.keyCode == 13) {
        userOnId = "";
        clickRadio();
        event = arguments.callee.caller.arguments[0] || window.event;
        (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
    }
});

function clickRadio() {
    // lastValue = "";
    // var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    // var value = $.trim(key.get(0).value);
    // //如果搜索框内无内容，不进行搜索，展开所有节点
    // if (value == "") {
    //     zTree.expandAll(true);
    //     setTimeout(function () {
    //         $.xljUtils.addTreeScroll('ztree-box');
    //         $.xljUtils.treeResizeFn();
    //     }, 300);
    // } else {
    //     searchNode();
    // }
    $.xljUtils._searchTreeBtnEvent(key, zTreeObj);
}

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
function updateNodes(highlight) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    for (var i = 0, l = nodeList.length; i < l; i++) {
        nodeList[i].highlight = highlight;
        zTree.updateNode(nodeList[i]);
    }
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
        {color: "#333", "font-weight": "normal", 'font-style': 'normal'} | (treeNode.status && treeNode.status == '0') ?
        {
            'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif',
            'font-style': 'normal',
            'color': '#CD0000'
        } :
        {color: "#333", "font-weight": "normal", 'font-style': 'normal'};
}
function filter(node) {
    return !node.isParent && node.isFirstNode;
}

/**
 * 设置显示编辑按钮
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function showRenameBtn(treeId, treeNode) {
    if (treeNode.parentId == null || treeNode.parentId == "") {
        return false;
    } else {
        return true;
    }
}



