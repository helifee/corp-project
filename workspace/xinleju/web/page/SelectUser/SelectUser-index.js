
$(document).ready(function(){
	var mainheight = $(window).height() - $("#t1").height() - $("#t2").height() - $("#t3").height() - 50;
	$("#userTree").height(mainheight)
});

var setting = {
		async: {
			enable: true,
			url:"SelectUser!getUserTree.do",
			autoParam:["id","pId"]
		},
		view: {
			selectedMulti: false,
			showIcon: true,
		},
		callback : {
			onClick : function(event, treeId, treeNode, clickFlag) {
				expand(treeNode);
			}
		}
		
	};
var zTree;
$(document).ready(function(){
	zTree = $.fn.zTree.init($("#userTree"), setting);
});

var expand=function(treeNode){
	zTree.expandNode(treeNode, true, true, true);
}

var queryDept=function(){
	 var dept=document.getElementById('dept');
     var userTree=document.getElementById('userTree');
     
     var one=document.getElementById('one');
     var all=document.getElementById('all');
     
     one.setAttribute("class", "active");
     all.setAttribute("class", "");
     
     dept.style.display="block";
	 userTree.style.display="none";

}

var queryAll=function(){
	var dept=document.getElementById('dept');
    var userTree=document.getElementById('userTree');
    
    var one=document.getElementById('one');
    var all=document.getElementById('all');
    
    all.setAttribute("class", "active");
    one.setAttribute("class", "");
    
    dept.style.display="none";
	userTree.style.display="block";
}

var userId;
var selectedUser=function(id){
	var user=document.getElementById(id);
	$('a').each(function(index,domEle) {
		domEle.setAttribute("class", "");
	  });
	user.setAttribute("class", "active");
	userId=id;
}

var ensureSelected=function(){
	var dept=document.getElementById('dept');
    var userTree=document.getElementById('userTree');
    var user;
    if(userTree.style.display=="block"){
    	if(zTree) {
    		var selectedNodes = zTree.getSelectedNodes();
    		if(selectedNodes && selectedNodes.length >0){
    			if(selectedNodes[0].nodeType!="user"){
    				alert("请选择用户类型");
    				return;
    			}else{

    				window.opener.eval("getuserId").apply(this,[selectedNodes[0].id]);
    			}
    		}
    	}
    }else if(dept.style.display=="block"){
    	if(userId==null||userId==""||userId=="undefined"){
    		alert("请选择用户");
    	}else{
    		window.opener.eval("getuserId").apply(this,[userId]);
    	}
    }
	
}