var dt = new Date();
var tree;
var isEditFlag = false;
var buildTree = function() {
	var show = 'enable';
	dt = new Date();
	var root = new Ext.tree.AsyncTreeNode({
		id : '-1',
		text : '角色'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'FuncAuth!getTrees.do?show=' + show + '&dt='+dt
		}),
		root : root,
		renderTo : 'roleTree',
		border : false,
		containerScroll: false,
		//rootVisible:false,
		autoHeight : false,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : false,
		enableDD:false
	});
	tree.on('click', function(node) {
		if(!node.leaf){
			alert('根目录和父目录不能进行授权！')
		} else {
			if (isEditFlag) {
				if (confirm("当前角色的权限已更改，是否保存!")) {				
					document.getElementById("funcOpframe").contentWindow.save(1);
				} 
			}
			dt = new Date();
			$("#roleId").attr("value",node.id);
			var systemCode = document.getElementById("funcOpframe").contentWindow.document.getElementById("systemCode").value;
			isEditFlag = false;
			Ext.get(document.getElementById("funcOpframe")).dom.src ="FuncAuth!funcBtnList.do?roleId=" + node.id+"&systemCode="+systemCode+"&dt="+dt;
		}
		
	});
	
	tree.on('beforeload', function(node) {
		dt = new Date();
		tree.loader.dataUrl = 'FuncAuth!getTrees.do?show=' + show + '&parentId='+node.id+'&dt='+dt.getTime();
	});
	tree.on("nodedragover", function(e){ 
		var node = e.target; 
		if(node.leaf) 
		node.leaf=false; 
		return true; 
		}); 
	
	root.expand();
	root.select();
};

var refreshTree=function (id){
	//tree.root.reload();
	tree.getNodeById(id).reload();
}

var init = function() {
	buildTree();
};
 
Ext.onReady(init);

 
function iframeChangeSize(iframe,extHeight) {
	if(extHeight==null){
		extHeight = 0;
	}
	var pTar = null; 
	if (document.getElementById){ 
		pTar = document.getElementById(iframe); 
	} 
	else{ 
		eval('pTar = ' + iframe + ';'); 
	} 
	if (pTar && !window.opera){ 
		pTar.style.display="block"; 
		if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){ 
			//ns6 syntax 
			pTar.height = pTar.contentDocument.body.offsetHeight +20 +extHeight; 
		} 
		else if (pTar.Document && pTar.Document.body.scrollHeight){ 
			//ie5+ syntax 
			pTar.height = pTar.Document.body.scrollHeight + extHeight; 
		} 
	}   
}

function loadData(value) {
	if (confirm("切换业务模块时，当前页面所选的数据将会丢失，确认是否已保存?")) {
		var roleId = $("#roleId").val();
		document.getElementById("funcOpframe").contentWindow.document.location.href = "FuncAuth!funcBtnList.do?roleId="+roleId+"&systemCode=" + value;
	} 
}

function loadAuthData(value) {
	var roleId = $("#roleId").val();
	document.getElementById("funcOpframe").contentWindow.document.location.href = "FuncAuth!authFuncList.do?roleId="+roleId+"&systemCode=" + value;
}

