/******************************************Treebegin*******************************************************/
var key;
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
		showRemoveBtn:false,
        showRenameBtn:false,
        drag: {  
            autoExpandTrigger: true,  
            prev: dropPrev,  
            inner: dropInner,  
            next: dropNext,
            isCopy: false,
            isMove: true
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
        onClick: null,  
        beforeDrag: beforeDrag, //拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作  
        beforeDrop: beforeDrop, //拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作  
        beforeDragOpen: beforeDragOpen, //拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作  
        onDrag: onDrag, //捕获节点被拖拽的事件回调函数  
        onDrop: onDrop, //捕获节点拖拽操作结束的事件回调函数  
        onExpand: onExpand, //捕获节点被展开的事件回调函数  
        onClick:zTreeOnClick //点击节点事件
    }  
};

//拖拽树的参数
var log, className = "dark", curDragNodes, autoExpandNode;
var source;
var target;
var type;

//树 搜索名称参数
var lastValue = "", nodeList = [], fontCss = {};

/*
 * 拖拽回调方法
 */

function getFont(treeId, node) {
    return node.font ? node.font : {};
}
function dropPrev(treeId, nodes, targetNode) {  
    var pNode = targetNode.getParentNode();  
    if (pNode && pNode.dropInner === false) {  
        return false;  
    } else {  
        for (var i=0,l=curDragNodes.length; i<l; i++) {  
            var curPNode = curDragNodes[i].getParentNode();  
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {  
                return false;  
            }  
        }  
    }  
    return true;  
}  
function dropInner(treeId, nodes, targetNode) {  
    if (targetNode && targetNode.dropInner === false) {  
        return false;  
    } else {  
        for (var i=0,l=curDragNodes.length; i<l; i++) {  
            if (!targetNode && curDragNodes[i].dropRoot === false) {  
                return false;  
            } else if (curDragNodes[i].parentTId && curDragNodes[i].getParentNode() !== targetNode && curDragNodes[i].getParentNode().childOuter === false) {  
                return false;  
            }  
        }  
    }  
    return true;  
}  
function dropNext(treeId, nodes, targetNode) {  
    var pNode = targetNode.getParentNode();  
    if (pNode && pNode.dropInner === false) {  
        return false;  
    } else {  
        for (var i=0,l=curDragNodes.length; i<l; i++) {  
            var curPNode = curDragNodes[i].getParentNode();  
            if (curPNode && curPNode !== targetNode.getParentNode() && curPNode.childOuter === false) {  
                return false;  
            }  
        }  
    }  
    return true;  
}  

function beforeDrag(treeId, treeNodes) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" beforeDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
	for (var i=0,l=treeNodes.length; i<l; i++) {
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
function beforeDragOpen(treeId, treeNode) {
	autoExpandNode = treeNode;
	return true;
}
function beforeDrop(treeId, treeNodes, targetNode, moveType, isCopy) {}
function onDrag(event, treeId, treeNodes) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" onDrag ]&nbsp;&nbsp;&nbsp;&nbsp; drag: " + treeNodes.length + " nodes." );
}
function onDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" onDrop ]&nbsp;&nbsp;&nbsp;&nbsp; moveType:" + moveType);
	showLog("target: " + (targetNode ? targetNode.name : "root") + "  -- is "+ (isCopy==null? "cancel" : isCopy ? "copy" : "move"))
}
function onExpand(event, treeId, treeNode) {
	if (treeNode === autoExpandNode) {
		className = (className === "dark" ? "":"dark");
		showLog("[ "+getTime()+" onExpand ]&nbsp;&nbsp;&nbsp;&nbsp;" + treeNode.name);
	}
}



/*
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

function clickRadio(e) {
	lastValue = "";
	searchNode(e);
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
	for(var i=0;i<nodeList.length;i++){
		var node=nodeList[i];
		var parentNode=node.getParentNode();
		if(parentNode && !parentNode.open){
			zTree.expandNode(parentNode,true,false,false,false);
		}
	}

	updateNodes(true);

}
function updateNodes(highlight) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	for( var i=0, l=nodeList.length; i<l; i++) {
		nodeList[i].highlight = highlight;
		zTree.updateNode(nodeList[i]);
	}
}
function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold"} : {color:"#333", "font-weight":"normal"};
}
function filter(node) {
	return !node.isParent && node.isFirstNode;
}


function showLog(str) {
	if (!log) log = $("#log");
	log.append("<li class='"+className+"'>"+str+"</li>");
	if(log.children("li").length > 8) {
		log.get(0).removeChild(log.children("li")[0]);
	}
}
function getTime() {
	var now= new Date(),
	h=now.getHours(),
	m=now.getMinutes(),
	s=now.getSeconds(),
	ms=now.getMilliseconds();
	return (h+":"+m+":"+s+ " " +ms);
}

function setTrigger() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.setting.edit.drag.autoExpandTrigger = $("#callbackTrigger").attr("checked");
}

//递归树匹配节点icon
function recursionArray(arr) {
	for(var i in arr) {
		if(arr[i].parentId == '0') {
		     arr[i].icon = "../../sys/css/zTreeStyle/img/diy/main.png";
		}else {
		     arr[i].icon = "../../sys/css/zTreeStyle/img/diy/1_open.png";
	    } 
		for(var j in arr[i].children){
			if(arr[i].children[j].parentId == '1') {
				arr[i].children[j].icon = "../../sys/css/zTreeStyle/img/diy/1_open.png";
			}
			for(var s in arr[i].children[j].children){
				arr[i].children[j].children[s].icon = "../../sys/css/zTreeStyle/img/diy/1_open.png";
			}
		}
	}
}
/******************************************Treeend*******************************************************/