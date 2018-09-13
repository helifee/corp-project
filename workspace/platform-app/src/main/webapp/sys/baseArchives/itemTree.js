var mainId=null;
var zTreeObj;
var jqGrid2;
$(function () {
	$.getUrlParam = function(name){
		var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");       
		var r = window.location.search.substr(1).match(reg);
		if (r!=null ){
			return unescape(r[2]);
		}
		return null;     
	};
      
	var id = $.getUrlParam('id'); 
	mainId=id;
	$.ajax({
        type:'get',
        url:mainUrl+'/sys/base/customArchives/get/'+id,
        success: function(data) {
        	var customArchivesDto=data.result;
    		getTree(customArchivesDto.id,customArchivesDto.name);
    		initJqGrid2();
        }
	});
});	

//获取自定义表单树
function getTree(id,name) {
	var customArchivesItemDto={};
	customArchivesItemDto.mainId=id;	
	customArchivesItemDto.name=name;	
	$.ajax({
		type:"post",
		url: mainUrl+"/sys/base/customArchives/getTree",
		dataType:"json",
	  	contentType: "application/json;charset=utf-8",
	  	data:JSON.stringify(customArchivesItemDto),
	  	success: function(json) {
	  		var zNodes = json.result;
	  		recursionArray(zNodes);
	  		zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	  		zTreeObj.expandAll(true);
	      
	  		var nodes = zTreeObj.getNodes();  
	  		zTreeObj.selectNode(nodes[0],true);  
	  		zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);//调用事件  
	  	}
	})
}

//节点点击事件
function zTreeOnClick(event, treeId, treeNode) {
	var queryData={
			"parentId":treeNode.id
			};
	jqGrid2.jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
}

/**
 * 初始化表格
 */
function initJqGrid2(){
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: mainUrl+"/sys/base/customArchivesItem/page",
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{"parentId":""},
            datatype : "json", 
            height:220,
            multiboxonly:true,
            multiselect:true,
            autowidth:true,
            rownumbers: true,
            jsonReader : {
                root:"result.list"
            },
            colModel : [ 
                 {name : 'id',label : 'id',hidden:true,align : "center"},
                 {
                 	label: '类型编码',
                     name: 'code',
                     width: 75,
                     editable: false
                 },
                 {
                 	 label: '类型名称',
                     name: 'name',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '说明',
                     name: 'description',
                     width: 140,
                     editable: false
                 },
                 {
 					 label : '是否启用',
                     name: 'status',
                     width: 75,
                     editable: false,
                     formatter:function(status){
                     	if(status=="0"){
                     		return "禁用";
                     	}else if(status=="1"){
                     		return "启用";
                     	}else{
                     		return "";
                     	}
                     }
                 }
             ],
            rowNum : 10,//一页显示多少条
            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

/**
 * 保存校验
 * @param formName
 * @returns {Boolean}
 */
function validateField(formName){
	var name=$.trim($("#"+formName).find("input[name='name']").val());
	if(!name){
		$("#"+formName).find("input[name='name']").parent().addClass("has-error has-feedback");
		$("#"+formName).find("input[name='name']").attr("data-original-title","请输入名称");
		return false;
	}
	var code=$.trim($("#"+formName).find("input[name='code']").val());
	if(!code){
		$("#"+formName).find("input[name='code']").parent().addClass("has-error has-feedback");
		$("#"+formName).find("input[name='code']").attr("data-original-title","请输入编码");
		return false;
	}
	return true;
}
      
/**
 * 保存
 * @param formName
 */
function saveForm(formName){
	var flag=validateField(formName);
	if(!flag){
		return;
	}
	var customArchivesItemArr= $("#"+formName).serializeArray();
	var customArchivesItemDto={};
	for(var i in customArchivesItemArr){
		if("createDate"==customArchivesItemArr[i].name||"updateDate"==customArchivesItemArr[i].name|| "disabledDate"==customArchivesItemArr[i].name){
			customArchivesItemDto[customArchivesItemArr[i].name]=new Date().getTime();
		}else{
			customArchivesItemDto[customArchivesItemArr[i].name]=customArchivesItemArr[i].value;
		}
	}
	customArchivesItemDto.delflag=false;
	customArchivesItemDto.status='1';
	if(customArchivesItemDto.id==null || customArchivesItemDto.id==""){
		//add
		$.ajax({
	       url:mainUrl+"/sys/base/customArchivesItem/save",
	       data:JSON.stringify(customArchivesItemDto),
	       type:'POST',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               if(successFlag) {
	            	   //刷新树
	            	   var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	            	   var nodes = treeObj.getSelectedNodes();
	            	   if (nodes.length>0) {
	            		   var curNode=nodes[0];
	            		   var icon = "../css/zTreeStyle/img/diy/1_open.png";
	            		   curNode = treeObj.addNodes(curNode, {id:result.id, name:result.name,sort:result.sort,icon:icon,pId:curNode.id});
	            	   } 
	            	   //刷新表格
	            	   jQuery("#list2").trigger("reloadGrid");
	                   $('#addTreeModal').modal('hide');
	               }else {
	                   alert('数据保存失败！');
	               }
	           }
	       }
		});
	} else{
		//update
		$.ajax({
	       url:mainUrl+"/sys/base/customArchivesItem/update/"+customArchivesItemDto.id,
	       data:JSON.stringify(customArchivesItemDto),
	       type:'PUT',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData){
	    	    if(resultData.success){
	    	    	//刷新树
	    	    	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	    	    	var treeNode = treeObj.getNodeByParam("id", customArchivesItemDto.id, null);
	    	    	treeNode.name = customArchivesItemDto.name;
	    	    	treeNode.code = customArchivesItemDto.code;
	    	    	treeObj.updateNode(treeNode);
	    	    	//刷新表格
	            	jQuery("#list2").trigger("reloadGrid");
	                $('#editTreeModal').modal('hide');
	    	    }else {
                    alert('数据保存失败！');
                }
	       }
	   });
	}
}

/**
 * 添加
 */
function treeAdd(){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getSelectedNodes();
	if(nodes.length>0){
		//重置表格
		$('#baseArchivesItemAddForm')[0].reset();
		$("#baseArchivesItemAddForm").find("input[name='mainId']").val("");
		$("#baseArchivesItemAddForm").find("input[name='parentId']").val("");
		$("#baseArchivesItemAddForm").find("input[name='id']").val("");
		$("#baseArchivesItemAddForm").find("input[name='parentId']").val(nodes[0].id);
		$("#baseArchivesItemAddForm").find("input[name='mainId']").val(mainId);
		$('#addTreeModal').modal('show');
	}else{
		alert("请选中一个节点！")
	}
}

/**
 * 修改
 */
function treeEdit(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	if(id!=null && id!=""){
		$.ajax({
	        type:'get',
	        url:mainUrl+'/sys/base/customArchivesItem/get/'+id,
	        success: function(data) {
	        	var customArchivesItemDto=data.result;
	        	$("#baseArchivesItemEditForm").find("input[name='id']").val(customArchivesItemDto.id);
	        	$("#baseArchivesItemEditForm").find("input[name='code']").val(customArchivesItemDto.code);
	        	$("#baseArchivesItemEditForm").find("input[name='name']").val(customArchivesItemDto.name);
	        	if(customArchivesItemDto.status=="1"){
	        		$("#baseArchivesItemEditForm").find('input:radio:first').prop('checked', 'checked');
	        	}else{
	        		$("#baseArchivesItemEditForm").find('input:radio:last').prop('checked', 'checked');
	        	}
	        	$("#description1").html(customArchivesItemDto.description);
        		$('#editTreeModal').modal('show');
        	}
		});
		
	}else{
		alert("请选中一个节点！")
		return;
	}
}

/**
 * 删除
 */
function treeDel(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	if(id!=null && id!=""){
		if(confirm("确认删除数据吗？")){
			$.ajax({
				url:mainUrl+"/sys/base/customArchivesItem/deleteBatch/"+id,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						$('#list2').jqGrid().trigger("reloadGrid");
						var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
						var treeNode = treeObj.getNodeByParam("id", id, null);
						treeObj.removeNode(treeNode);
					}else{
						alert("删除数据失败！");
					}
				}
			});
		}
	}else{
		alert("请选中一个节点！")
		return;
	}
}

//function enableOrNot(){
//	var id=$('#list2').jqGrid('getGridParam','selrow');
//	if(id!=null && id!=""){
//		$.ajax({
//	       url:mainUrl+"/sys/base/customArchivesItem/enableOrNot",
//	       data:JSON.stringify({'id':id}),
//	       type:'POST',
//	       contentType:'application/json',
//	       dataType:'JSON',
//	       success:function (resultData) {
//	           if(resultData) {
//	               var successFlag = resultData.success;
//	               var result = resultData.result;
//	               var msg = resultData.msg;
//	               if(successFlag) {
//	            	   //刷新表格
//	            	   jQuery("#list2").trigger("reloadGrid");
//	               }else {
//	                   alert('数据保存失败！');
//	               }
//	           }
//	       }
//		});
//	}else{
//		alert("请选中一个节点！")
//		return;
//	}
//}

/**
 * 启用禁用
 */
function enableOrNot(st){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	var rowData = $("#list2").jqGrid('getRowData',id);
	if(id!=null && id!=""){
		var status=rowData.status;
		if(status=="启用"){
			status="1";
		}else{
			status="0";
		}
		if(status!=st){
			$.ajax({
		       url:mainUrl+"/sys/base/customArchivesItem/enableOrNot",
		       data:JSON.stringify({'id':id,'status':st}),
		       type:'POST',
		       contentType:'application/json',
		       dataType:'JSON',
		       success:function (resultData) {
		           if(resultData) {
		               var successFlag = resultData.success;
		               var result = resultData.result;
		               var msg = resultData.msg;
		               if(successFlag) {
		            	   //刷新表格
		            	   jQuery("#list2").trigger("reloadGrid");
		               }else {
		                   alert('数据保存失败！');
		               }
		           }
		       }
			});
		}
	}else{
		alert("请选中一个节点！")
		return;
	}
}