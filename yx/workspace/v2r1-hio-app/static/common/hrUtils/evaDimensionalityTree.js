/**
*测评角色维度树
 */
//全局参数
var  zTreeObj;
var rowDataBefore;
var rowData;
var zTreeObj;
var ztId;//用于参数传递
var zIsParent;//用于参数传递
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
    async: {
        enable: true,
        dataFilter:ajaxDataFilter,
        contentType :"application/json",
        url: hostUrl +"eva/hrEvaDimensionalityTree/getChildTreeList",
        autoParam: ["id=parentId"]
    },
    callback: {
        onClick: zTOnClick,
        beforeRename: zTreeBeforeRename
    },
    edit:{
        enable: false,
        showRemoveBtn: false,
        renameTitle: "编辑节点名称"
    }
};



function zTOnClick(event, treeId, treeNode){
    ztId = treeNode.id;
    zIsParent = treeNode.isParent;
}

function zTreeBeforeRename(treeId, treeNode, newName, isCancel){
    if(treeNode.name != newName){
        var jsonData = {};
        jsonData.id = treeNode.id;
        jsonData.name = newName;
        $.ajax({
            type: 'put',
            url: hostUrl + "eva/hrEvaDimensionalityTree/update/"+treeNode.id,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            async:false,
            success: function (json) {
                pop_tip_open("blue", "修改维度名称成功");
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "修改维度名称失败");
            }
        })
    }
}


function ajaxDataFilter(treeId, parentNode, responseData) {
    if (responseData) {
        //处理返回值，这里的返回值字段必须是json格式
        return responseData.result;
    }
    return responseData;
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
 * 测评角色维度树
 */
function getEvaDimensionalityTree(orgType) {
    var urlBody = "org/orgRoot/getTree";
    var urlAll = hostUrl + urlBody;
    var jsonData = {
        rootDelFlag: 0,
        orgDelFlag: 0,
        orgStatus:1,//有效的
        parentId: null
    };
    if(orgType=='1'){//只显示一级公司
        jsonData.only1=1;
    }if(orgType=="company"){//只显示公司
        jsonData.type="company";
    }
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

function getCompanyOrgTree(showFirstCompany) {
    //获取组织机构树地址
    var urlBody = "org/orgRoot/getCompanyTree";
    var urlAll = hostUrl + urlBody;
    var jsonData = {
        rootDelFlag: 0,
        orgDelFlag: 0,
        orgStatus:1,//有效的
        parentId: null
    };
    //只显示一级公司
    if(showFirstCompany=='1'){
        jsonData.only1=1;
    }
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
 * 搜索节点
 * @param e
 */
function searchNode(e) {
    var searchKeys = ['name'];
    $.xljUtils._searchTreeBtnEvent(key,zTreeObj, searchKeys);
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
    //todo 异步加载
    zTreeClick(treeorgId);
}

function zTreeClick(treeorgId){

    //获取组织机构树地址
    var urlBody = "eva/hrEvaDimensionalityTree/getTreeList";
    var urlAll = hostUrl + urlBody;
    var jsonData = {
        parentId: treeorgId
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
            // recursionArray(zNodes);


        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "获取组织机构树请求失败");
        }
    })
}




/**
 * 个性化文字样式，只针对 zTree 在节点上显示的对象
 * @param treeId
 * @param treeNode
 * @returns
 */
function getFontCss(treeId, treeNode) {
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
