var dt = new Date();
var tree;
var currentNode;
var buildTree = function(partyStructTypeId,isStruct) {
	dt = new Date();
	var root = new Ext.tree.AsyncTreeNode({
		id : '0',
		text : '组织架构'
	});
	tree = new Ext.tree.TreePanel({
		loader : new Ext.tree.TreeLoader({
			dataUrl : 'PartyEntity!getTrees.do?isStruct='+isStruct+'&dt='+dt+'&partyStructTypeId='+partyStructTypeId
		}),
		root : root,
		renderTo : 'partyTree',
		rootVisible:false,
		border : false,
		autoHeight : false,
		enableDD : false,
		animate : true,// 以动画形式伸展,收缩子节点
		autoScroll : true,
		viewConfig : { style : { overflow: 'auto', overflowX: 'hidden' } }
	});
	tree.on('click', function(node) {
		currentNode = node;
		dt = new Date();
		document.getElementById("currentNodeId").value=node.id;
		var partyStructTypeId = document.getElementById("currentStructTypeId").value;
		//获取查询的条件，并2次转码，防止乱码
		Ext.get(document.getElementById("role_frame")).dom.src ="PartyStruct!roleList.do?grant=false&partyStructTypeId="+partyStructTypeId+"&size=10&parentId=" + node.id+"&dt="+dt;
	});

	tree.on('beforeload', function(node) {
		dt = new Date();
		if(node.partyStructTypeId=='undefined'||node.partyStructTypeId==''||node.partyStructTypeId==null||node.partyStructTypeId==0){
			node.partyStructTypeId = partyStructTypeId;
		}
		
		tree.loader.dataUrl = 'PartyEntity!getTrees.do?isStruct='+isStruct+'&parentEntityId='+node.id+'&partyStructTypeId='+node.partyStructTypeId+'&dt='+dt.getTime();
	});

	//定义右键菜单  
	var rightClick = new Ext.menu.Menu({  
		id :'rightClickCont',  
		items : [{  
			id:'rMenu1',  
			text : '修改',  
			//增加菜单点击事件  
			handler:function (node){  
				UpdateNode();
			}
		}]
	});  

	//增加右键点击事件  
	tree.on('contextmenu',function(node,event){//声明菜单类型  
		node.select();
		currentNode = node;
		event.preventDefault();  
		rightClick.showAt(event.getXY());//取得鼠标点击坐标，展示菜单
	}); 
	root.expand();
	root.select();
	tree.loader.on("load",function(node,response){
		root.firstChild.expand();
	});
};

var refreshTree=function(id){
	if(isEmpty(id)){
		tree.getRootNode().reload();
	}else{
		var node = tree.getNodeById(id);
		if ( node.hasChildNodes() ) {
			node.reload();
		} else {
			node.parentNode.reload();
			node.expand();
		}
	}
}

var init = function() {
	var currentStructTypeId = document.getElementById("currentStructTypeId").value;
	var isStruct = document.getElementById("isStruct").value;
	buildTree(currentStructTypeId,isStruct);
	setClientHeight('partyTree');
	$("#upcompany").bind("click",function(){ UpdateNode(); });
	$("#deleteNode").bind("click",function(){ DeleteNode(); });
	$("#showProjBranch").bind("click",function(){ showProjBranch(); });
	tree.setHeight($('#partyTree').height());

};

Ext.onReady(init);

function UpdateNode(){
	 if(currentNode == undefined)
	 {
    	 alert('请选择需要删除的组织机构节点');
 	     return;
	 }
	 
		
	var currentStructTypeId = document.getElementById("currentStructTypeId").value;
	var partyType = currentNode.attributes.partyType;
	var refId = currentNode.attributes.refId;
	
	if(partyType =='zb'){
		OpenWin("PartyEntity!edit.do?id="+currentNode.id+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId=&partyType="+partyType);
	}else if(partyType=='company'){
		OpenWin("PartyStruct!editCompany.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNode.id+"&partyType="+partyType);
	}else if(partyType=='department'){
		OpenWin("PartyStruct!editDept.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNode.id+"&partyType="+partyType);
	}else if(partyType=='group'){
		alert("修改项目请到 [主数据->项目档案] 中进行修改！");
		//openwindow("PartyStruct!editGroup.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNode.id+"&partyType="+partyType);
	}else{
		alert("此节点不可修改");
	}
	
}
//修改菜单信息
function DeleteNode()
{   
     if(currentNode == undefined)
	 {
    	 alert('请选择需要修改的组织机构节点');
 	     return;
	 }
     
     var currentStructTypeId = $('#currentStructTypeId').val();
     var partyType = currentNode.attributes.partyType;
     var partyCode =currentNode.attributes.code;
     var refId = currentNode.attributes.refId;
     if(partyType=='group'){
		alert("项目不可删除！");
		return;
     }
    if(partyType=="company"){
    	var url="PartyEntity!getCompanyById.do?refId="+refId;
    	$.ajaxSetup({async:false});
    	var checkOk=false;
    	$.get(url,{},function(data){
    		if(data.code.toUpperCase()=="JTBB"){
    			checkOk=true;
    		}
    	},'json');
    	if(checkOk){
    		alert("集团本部不能删除!");
    		return;
    	}
    }
    if(!window.confirm('确定要删除此数据？')) {
    	return;
    }
     
	$.post('PartyStruct!haveChild.ajax?parentEntityId='+currentNode.id, function(data) {
		//alert(data.haveChild);	
	
		if(partyType=='company' ){		
			if(data.haveChild){
				alert("此节点不可删除！");
			}else{
				$.post('PartyStruct!deleteNode.ajax?parentEntityId='+data.parentEntityId + '&partyType='+partyType + '&refId=' + refId, function(data2) {
					window.location.reload();
				});
			}
			//openwindow("PartyStruct!editCompany.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNode.id+"&partyType="+partyType);
		}else if(partyType=='department'){
			if(data.haveChild){
				alert("此节点不可删除！");
			}else{
				$.post('PartyStruct!deleteNode.ajax?parentEntityId='+data.parentEntityId+ '&partyType='+partyType + '&refId=' + refId, function(data2) {
 					window.location.reload();
				});
			}
			//openwindow("PartyStruct!editDept.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNode.id+"&partyType="+partyType);
		}else if(partyType=='group'){
			alert("项目不可删除！");
//			if(data.haveChild){
//				alert("此节点不可删除！");
//			}else{
//				$.post('PartyStruct!deleteNode.ajax?parentEntityId='+data.parentEntityId, function(data2) {
//					window.location.reload();
//				});
//			}
			//openwindow("PartyStruct!editGroup.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNode.id+"&partyType="+partyType);
		}else{
			alert("此节点不可删除！");
		}
	});
}

//删除组织架构节点（如果公司下无部门，部门下无人即可删除）
function deletecompany(parentId,partyStructTypeId){
	
	//1.如果公司下无部门，部门下无人即可删除
	
	
	//2.确定删除后进行删除操作（逻辑删除）
	
	if(confirm("确定要删除吗")){
		if($("input:checkbox:checked").length==0){
			alert("请只选择一条记录");
		}else{
			$.each($("input:checkbox:checked") , function() {
				var roleId = $(this).val();
				$('body').mask("操作中...");
				$.post('PartyStruct!deleteRole.ajax?roleId='+roleId, $('#frm').serialize(), function(data) {
					$('body').unmask();
					window.location.reload();
				});
			});
		}
	}
}

function openAddWindow(partyType,ifOnlyEntity){
	
	var currentNodeId = document.getElementById("currentNodeId").value;
	var currentStructTypeId = document.getElementById("currentStructTypeId").value;
	if(currentNodeId==0){
		alert("请先选择在哪个节点下添加");
	}else{
		if(ifOnlyEntity=='yes'||isEmpty(ifOnlyEntity)){ 
			OpenWin("PartyEntity!edit.do?parentEntityId="+currentNodeId+"&partyStructTypeId=" + currentStructTypeId+"&partyType="+partyType);  
		}else{
			if(partyType=='company' || partyType == 'zb'){
				// add by liuhm 部门、团队下不允许挂接公司
				var currPartyType = currentNode.attributes.partyType;
				if ( currPartyType == 'department' ) {
					alert("部门下不允许增加部门！");
				} else if ( currPartyType == 'group' ) {
					alert("团队下不允许增加部门！");
				} else {
					OpenWin("PartyStruct!editCompany.do?partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNodeId+"&partyType="+partyType);
				}
			}
			if(partyType=='department'){
				// add by liuhm 团队下不允许挂接部门
				var currPartyType = currentNode.attributes.partyType;
				if ( currPartyType == 'group' ) {
					alert("团队下不允许增加部门！");
				} else {
					OpenWin("PartyStruct!editDept.do?partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNodeId+"&partyType="+partyType);
				}
			}
			if(partyType=='group'){
				OpenWin("PartyStruct!editGroup.do?partyStructTypeId="+currentStructTypeId+"&parentEntityId="+currentNodeId+"&partyType="+partyType);
			}
		}
	}

}

function doSelect(partyStructTypeId){
	document.getElementById("currentStructTypeId").value=partyStructTypeId;
	window.location='PartyEntity!index.do?partyStructTypeId='+partyStructTypeId;
}

function openEditWindow(partyType,ifOnlyEntity){
	var currentNodeId = document.getElementById("parentId").value;
	var currentStructTypeId = document.getElementById("partyStructTypeId").value;
	if(currentNodeId == 0){
		alert("请先选择在哪个节点下添加");
	}else{
		var parentEntityId = document.getElementById("parentId").value;
		var currentStructTypeId = document.getElementById("partyStructTypeId").value;
		var refId = $('#refId').val();
		if(partyType=='company'){
			window.parent.openwindow("PartyStruct!editCompany.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+parentEntityId+"&partyType="+partyType);
		}else if(partyType=='department'){
			window.parent.openwindow("PartyStruct!editDept.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+parentEntityId+"&partyType="+partyType);
		}else if(partyType=='group'){
			window.parent.openwindow("PartyStruct!editGroup.do?id="+refId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId="+parentEntityId+"&partyType="+partyType);
		}else if(partyType=='zb'){
			window.parent.openwindow("PartyEntity!edit.do?id="+currentNodeId+"&partyStructTypeId="+currentStructTypeId+"&parentEntityId=&partyType="+partyType);
		}else{
			alert("此节点不可修改");
		}
	}

}

/**显示明细
 */
function showProjBranch(){
	if(currentNode == undefined) {
   	 alert('请选择需要删除的组织机构节点');
	     return;
	 }
	 
		
	var currentStructTypeId = document.getElementById("currentStructTypeId").value;
	var partyType = currentNode.attributes.partyType;
	var id = currentNode.attributes.refId;
	
	var parentNode = currentNode.parentNode;
	var parentPartyType = parentNode.attributes.partyType;
		
	if(isEmpty(id)){
		alert("请选择查看的数据！");
		return;
	} else if ( partyType != 'group' || parentPartyType != 'group' ) {
		alert("请选择需要查看的项目分期！");
		return;
	}
	
	$.post("PartyEntity!showProjBranch.do?refId="+id, function(data) {
		OpenWin(data.url);
		
	});
	
}