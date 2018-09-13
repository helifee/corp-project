var dt = new Date();
var tree;
var buildTree = function() {
	dt = new Date();
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '菜单',
		app_code : 'a'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
		
			dataUrl : 'FuncAuth!getFuncModuleTrees.do?dt='+dt
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
		dt = new Date();
		//$("#roleId").attr("value",node.id);
		//$("#app").attr("value",node.app_code);
		$("#roleId").attr("value",node.id.split(":")[1]);
		$("#app").attr("value",node.id.split(":")[2]);
		//var systemCode = $("#app").val();	
		//Ext.get(document.getElementById("funcOpframe")).dom.src ="FuncAuth!funcRoleList.do?moduleId=" + node.id+"&systemCode="+systemCode+"&dt="+dt;
		Ext.get(document.getElementById("funcOpframe")).dom.src ="FuncAuth!funcRoleList.do?moduleId=" + node.id.split(":")[1]+"&systemCode="+node.id.split(":")[2]+"&dt="+dt;
		
	});
	
	tree.on('beforeload', function(node) {
		dt = new Date();
		
		//var systemCode = $("#app").val();
		//tree.loader.dataUrl = 'FuncAuth!getFuncModuleTrees.do?parentId='+node.id+'&systemCode='+systemCode+'&dt='+dt.getTime();
		
		if(node.id=='0'){		
			tree.loader.dataUrl = 'FuncAuth!getFuncModuleTrees.do?dt='+dt.getTime();
		}
		else{
			tree.loader.dataUrl = 'FuncAuth!getFuncModuleTrees.do?parentId='+node.id.split(":")[1]+'&systemCode='+node.id.split(":")[2]+'&dt='+dt.getTime();
		}
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

function loadData(obj) {
	if (!confirm("切换业务模块时，当前页面所选的数据将会丢失，是否保存?")) {
		var systemCode = $("#app").val();
		document.location.href = "FuncAuth!index.do?flag=1&systemCode=" + systemCode;
	} else {
		var systemCode = document.getElementById("funcOpframe").contentWindow.document.frm.systemCode.value;
		for (var x=0; x<obj.options.length; x++) {
			if (obj.options[x].value == systemCode) {
				obj.options[x].selected = true;
			}
		}
	}
}