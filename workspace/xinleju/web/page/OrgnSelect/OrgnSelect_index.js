var setting = {
	data : {
		simpleData : {
			enable : true,
			idKey : "id" ,         //在isSimpleData格式下，当前节点id属性  
			pIdKey : "pId" 
		}
	},
    async: {  
        enable: true,  
        url:"OrgnSelect!zTreeAsync.do",
        autoParam: ["id"]
    },
	view : {
		selectedMulti : false,
		dblClickExpand : false
	},
	callback : {
	    onAsyncSuccess: onAsyncSuccess,
		beforeClick : beforeClick,
		onClick : onClick
	}
};

/**
 * 異步加載成功后刷新結點
 * @param event
 * @param treeId
 * @param treeNode
 * @param msg
 */
function onAsyncSuccess(event, treeId, treeNode, msg) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    treeNode.halfCheck = false; 
    zTree.updateNode(treeNode);   //异步加载成功后刷新树节点
};

/**
 * 
 * @param treeId
 * @param treeNode
 * @returns {Boolean}
 */
function beforeClick(treeId, treeNode) {
	var check = (treeNode && !treeNode.isParent);
	if (treeId == 'treeDemo') {
		if (!check)
			alert("只能选择子级公司！");
	} else {
		if (!check)
			alert("只能选择具体分类！");
	}
	return check;
}

/**
 * @author 胡科
 * 当点击某一个子节点时，所做的对应的动作
 * @param e
 * @param treeId  
 * @param treeNode  树节点的id
 */
function onClick(e, treeId, treeNode) {
	document.getElementById("user_frame").src = "OrgnSelect!usersList.do?deptId="+ treeNode.id;
}

/**
 * 初始化页面
 */
function initUserIds() {
	$("#userIds").val("");
	$("#objName").val("");
	$("input[name=r_user]").each(function(i) {
		$("#userIds").val($("#userIds").val() + this.value + ",");
	});
	$("td[name=mytd]").each(function(i){
		var str1 = this.innerHTML;
		$("#objName").val($("#objName").val() + str1 + ",");				
	});
}

/**
 * 控制index页面上的checkbox的选中，主要是和全选那个按钮关联起来
 * @param check
 */
function checkOneIndex(check) {
	if (check.checked == false) {
		$("#r_check_all").attr({
			checked : false
		});
	} else {
		var checked = true;
		$("input[name=r_user]").each(function(i) {
			if (this.checked == false)
				checked = false;
		});
		$("#r_check_all").attr({
			checked : checked
		});
	}
}

/**
 * 对iframe上面全选按钮的控制
 * @param checkAll
 */
function checkAllIndex(checkAll) {
	$("input[name=r_user]").each(function(i) {
		this.checked = checkAll.checked;
	});
}

/**
 * 移除一行
 * @param id  要移除的这一行的id
 */
function removeTrIndex(id) {
	$("#r_table tr").each(function(i) {
		if (this.id == id) {
			$(this).remove();
			$("#userIds").val($("#userIds").val().replace(id + ",", ""));
			var cell = this.cells[2].innerHTML;
			$("#objName").val($("#objName").val().replace(cell + ",", ""));
		}
	});
}


/**
 * 双击移除一行
 * @param id  双击行的id
 */
function  removeUserSingleIndex(id) {
	removeTrIndex(id);
}



/**
 * 点击“确定”按钮，输出结果，和打开这个页面的页面交互
 */
function checkResult() {
	var str = $("#userIds").val();
	if(str!=null){
		str = str.substr(0,str.length-1); 
	}
	var name = $("#objName").val();
	if(str!=null){
		if(name!=null){
			name = name.substr(0,name.length-1); 
			window.opener.orgnSelect(str , name); 
		}
	}
	window.close();
}

