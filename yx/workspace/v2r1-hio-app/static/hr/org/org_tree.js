/**
 * tsq
 * 机构树js
 */
//全局参数
//组织机构树
var  zTreeObj;
var rowDataBefore;
var rowData;
//组织机构树 的参数配置
var setting = {
    view: {
        dblClickExpand: false,
        showLine: false,
        selectedMulti: false,
        fontCss: getFontCss,
        nameIsHTML: true
    },
    edit: {
        enable: false,
        showRemoveBtn: false,
        showRenameBtn: null,
        drag: {
            autoExpandTrigger: false,
            prev: null,
            inner: null,
            next: null,
            isCopy: false,
            isMove: false
        }

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
        beforeDrag: beforeDrag, //拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作
        beforeDrop: beforeDrop, //拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作
        beforeDragOpen: beforeDragOpen, //拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作
        onDrag: onDrag, //捕获节点被拖拽的事件回调函数
        onDrop: onDrop, //捕获节点拖拽操作结束的事件回调函数
        onCollapse: function () {
            $.xljUtils.treeResizeFn();
        },
        onExpand: onExpand, //捕获节点被展开的事件回调函数
        beforeRename: zTreeBeforeRename,//编辑节点之前
        onRename: zTreeOnRename,//编辑节点之后
        onClick: zTreeOnClick //点击节点事件
    }
};


//查询用户功能权限
$.ajax({
    type:'POST',
    url:hostUrl+"auth/authData/queryAuthorizationBtnList?"+window.parent.JZY.s.getAccessTokenByAuthorization(),
    dataType:'JSON',
    contentType:'application/json',
    async:false,//设置为同步
    data:JSON.stringify({"menuCode":"hr_org"}),
    success:function(json){
        var list=json.result;
        if(list!=null&&list.length>0) {
            $.each(list,function(index,value){
                for(var key in value){
                    if(key=="code"&&value[key]=="2"){//编辑权限
                        setting.edit.enable=true;
                        setting.edit.showRemoveBtn = false;
                        setting.edit.showRenameBtn = showRenameBtn;
                        setting.edit.drag.autoExpandTrigger = true;
                        setting.edit.drag.prev = dropPrev;
                        setting.edit.drag.inner = dropInner;
                        setting.edit.drag.next = dropNext;
                        setting.edit.drag.isCopy = false;
                        setting.edit.drag.isMove = true;
                    }
                }
            });
        }
    },
    error:function(){
    }
});


/**
 * 用于捕获节点编辑名称结束（Input 失去焦点 或 按下 Enter 键）之后，更新节点名称数据之前的事件回调函数，并且根据返回值确定是否允许更改名称的操作
 * @param treeId
 * @param treeNode
 * @param newName
 * @param isCancel
 * @returns {Boolean}
 */
function zTreeBeforeRename(treeId, treeNode, newName, isCancel) {
    if (newName == "") {
        pop_tip_open("blue", "名称不能为空");
        return false;
    }
    if(treeNode.status=='0'){
        // pop_tip_open("blue", "撤销的机构不能改名");
        // alert("newName========"+newName);
        // alert("treeNode.name========"+treeNode.name);
        // newName=treeNode.name;
        // zTreeObj.updateNode(treeNode);
        return true;
    }
    var pNode = treeNode.getParentNode();
    var prefixNames = "";
    var prefixIds = "";
    if (pNode != null) {
        if (pNode.type == "cata") {//根
            prefixNames = newName;
            prefixIds = treeNode.id;
        } else {
            prefixNames = pNode.prefixName + "/" + newName;
            prefixIds = pNode.prefixId + "/" + treeNode.id;
        }
    } else {
        prefixNames = newName;
        prefixIds = treeNode.id;
    }
    var urlBody = "org/org/update/" + treeNode.id;
    var urlAll = hostUrl + urlBody;
    var updatedata = {
        name: newName,
        prefixName: prefixNames,
        prefixId: prefixIds
    };
    $.ajax({
        type: 'PUT',
        url: urlAll,
        async: false,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(updatedata),
        success: function (json) {
            if (json.success == true) {
                pop_tip_open("green", "修改成功");
                return true;
            } else {
                pop_tip_open("blue", json.message);
                return false;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "修改组织名称请求失败");
            return false;
        }
    })
}

/**
 * 用于捕获节点编辑名称结束之后的事件回调函数。
 * @param event
 * @param treeId
 * @param treeNode
 * @param isCancel
 */
function zTreeOnRename(event, treeId, treeNode, isCancel) {

//	alert(treeNode.id + ", " + treeNode.name);
}

/**
 * 设置显示编辑按钮
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function showRenameBtn(treeId, treeNode) {
    if (treeNode.type == "cata") {
        return false;
    }else if(treeNode.status=='0'){//撤销的机构不能编辑
        return false;
    } else {
        return true;
    }
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
 * 获取组织机构树
 */
function getOrgTree() {
    //获取组织机构树地址
    var urlBody = "org/orgRoot/getTree";
    var urlAll = hostUrl + urlBody;
    var jsonData = {
        rootDelFlag: 0,
        orgDelFlag: 0,
        parentId: null
    };
    $.ajax({
        type: 'POST',
        url: urlAll,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(jsonData),
        async:false,
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
//点击的组织机构树的节点
var importroleOrgNode;

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
 * 拖拽到目标节点时，设置是否允许移动到目标节点前面的操作
 * @param treeId
 * @param nodes
 * @param targetNode
 * @returns {Boolean}
 */
function dropPrev(treeId, nodes, targetNode) {
    var pNode = targetNode.getParentNode();
    if (pNode && pNode.dropInner === false) {
        return false;
    } else {
        for (var i = 0, l = curDragNodes.length; i < l; i++) {
            var curPNode = curDragNodes[i].getParentNode();
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
                return false;
            }
        }
    }
    return true;
}
/**
 * 拖拽到目标节点时，设置是否允许成为目标节点的子节点
 * @param treeId
 * @param nodes
 * @param targetNode
 * @returns {Boolean}
 */
function dropInner(treeId, nodes, targetNode) {
    if (targetNode && targetNode.dropInner === false) {
        return false;
    } else {
        for (var i = 0, l = curDragNodes.length; i < l; i++) {
            if (!targetNode && curDragNodes[i].dropRoot === false) {
                return false;
            } else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && curDragNodes[i].getParentNode().childOuter === false) {
                return false;
            }
        }
    }
    return true;
}
/**
 * 拖拽到目标节点时，设置是否允许移动到目标节点后面的操作
 * @param treeId
 * @param nodes
 * @param targetNode
 * @returns {Boolean}
 */
function dropNext(treeId, nodes, targetNode) {
    var pNode = targetNode.getParentNode();
    if (pNode && pNode.dropInner === false) {
        return false;
    } else {
        for (var i = 0, l = curDragNodes.length; i < l; i++) {
            var curPNode = curDragNodes[i].getParentNode();
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作
 * @param treeId
 * @param treeNodes
 * @returns {Boolean}
 */
function beforeDrag(treeId, treeNodes) {
    className = (className === "dark" ? "" : "dark");
    showLog("[ " + getTime() + " beforeDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes.");
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].drag === false) {
            curDragNodes = null;
            return false;
        } else if (treeNodes[i].parentTId && treeNodes[i].getParentNode().childDrag === false) {
            curDragNodes = null;
            return false;
        }
    }
    curDragNodes = treeNodes;
    return true;
}
/**
 * 拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function beforeDragOpen(treeId, treeNode) {
    autoExpandNode = treeNode;
    return true;
}
/**
 * 拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作
 * @param treeId
 * @param treeNodes
 * @param targetNode
 * @param moveType
 * @param isCopy
 * @returns {Boolean}
 */
function beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {
    className = (className === "dark" ? "" : "dark");
    showLog("[ " + getTime() + " beforeDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
    showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is " + (isCopy == null ? "cancel" : isCopy ? "copy" : "move"));
    //更改组织机构树组织机构顺序
    var urlBody = "org/org/updateOrgSort";
    var urlAll = hostUrl + urlBody;
    var data = {
        source: treeNodes[0],
        target: targetNode,
        type: moveType
    }
    var ret = false;
    if(treeNodes[0].status=='0'){
        pop_tip_open("blue", treeNodes[0].name+"是撤销的机构，不能移动");
        return ret;
    }
    //确认是异步的方法,不好用，暂时不修改
    // $.xljUtils.confirm("blue", "确定移动节点"+treeNodes[0].name+"到"+targetNode.name+"么？", function () {
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (json) {
                if (json.success == true) {
                    pop_tip_open("green", json.message);
                    ret = true;
                } else {
                    pop_tip_open("blue", json.message);
                    ret = false;
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "拖拽树请求失败");
            }
        })
    // }, true);
    return ret;
}
/**
 * 捕获节点被拖拽的事件回调函数
 * @param event
 * @param treeId
 * @param treeNodes
 */
function onDrag(event, treeId, treeNodes) {
    className = (className === "dark" ? "" : "dark");
    showLog("[ " + getTime() + " onDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes.");
}
/**
 * 捕获节点拖拽操作结束的事件回调函数
 * @param event
 * @param treeId
 * @param treeNodes
 * @param targetNode
 * @param moveType
 * @param isCopy
 */
function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
    className = (className === "dark" ? "" : "dark");
    showLog("[ " + getTime() + " onDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
    showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is " + (isCopy == null ? "cancel" : isCopy ? "copy" : "move"))
}
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
/**
 * 搜索节点
 * @param e
 */
function searchNode(e) {
    // var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    // var keyType = "name";
    // var value = $.trim(key.get(0).value);
    // if (lastValue === value) return;
    // lastValue = value;
    // if (value === "") return;
    // updateNodes(false);
    //
    // nodeList = zTree.getNodesByParamFuzzy(keyType, value);
    // for (var i = 0; i < nodeList.length; i++) {
    //     var node = nodeList[i];
    //     var parentNode = node.getParentNode();
    //     if (parentNode && !parentNode.open) {
    //         zTree.expandNode(parentNode, true, false, false, true);
    //
    //     }
    // }
    // updateNodes(true);
    var searchKeys = ['name'];
    $.xljUtils._searchTreeBtnEvent(key,zTreeObj, searchKeys);

}
/**
 * 改变父节点或子节点样式
 * @param status 0禁用，1启用
 * @param node 节点
 */
function lockOrUnNodes(status, node) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    if (status == 0) {
        lockAllChildrenNodes(node, zTree);
    } else {
        unLockAllParentNodes(node, zTree);
    }
}
/**
 * 禁用所有子节点
 * @param treeNode
 * @param result
 * @returns
 */
function lockAllChildrenNodes(treeNode, zTree) {
    treeNode.status = "0";
    zTree.updateNode(treeNode);
    var childrenNodes = treeNode.children;
    if (childrenNodes) {
        for (var i = 0; i < childrenNodes.length; i++) {
            //递归
            lockAllChildrenNodes(childrenNodes[i], zTree);
        }
    }
}
/**
 * 启用所有父节点
 * @param treeNode
 * @param result
 * @returns
 */
function unLockAllParentNodes(treeNode, zTree) {
    treeNode.status = 1;
    zTree.updateNode(treeNode);
    var pNode = treeNode.getParentNode();
    if (pNode != null) {
        unLockAllParentNodes(pNode, zTree);
    }
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

    var treeorgId = "";
    if (treeNode.type != "cata") {
        treeorgId = treeNode.id;
    }
    // console.log(treeorgId);
    var queryDataPost = {
        "orgId": treeorgId
    };
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
 * 拖拽显示日志
 */
function showLog(str) {
    if (!log) log = $("#log");
    log.append("<li class='" + className + "'>" + str + "</li>");
    if (log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
    }
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
 * TODO设置拖拽时父节点自动展开是否触发 onExpand 事件回调函数
 */
function setTrigger() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.setting.edit.drag.autoExpandTrigger = $("#callbackTrigger").attr("checked");
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
