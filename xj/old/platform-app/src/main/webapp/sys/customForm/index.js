var zTreeObj;
var urlBody = "";
var urlAll = "";
var jqGrid2;

$(function(){
	//初始化树
	getCustomTree();
	//初始化表格
	initJqGrid2();
});

//获取自定义分类树
function getCustomTree() {
    urlAll = mainUrl + "/sys/base/customFormGroup/getTree";
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'showAll':true}),
        success: function(json) {
            var zNodes = json.result;
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
			zTreeObj.expandAll(true); 
        }
    })
}

//递归树匹配节点icon
function recursionArray(arr) {
	for(var i in arr) {
		if(arr[i].parentId == '0') {
		     arr[i].icon = "../../sys/css/zTreeStyle/img/diy/main.png";
		}else {
		     arr[i].icon = "../../sys/css/zTreeStyle/img/diy/1_open.png";
	    } 
	}
}

/*
 * 树点击节点事件
 */
function zTreeOnClick(event, treeId, treeNode) {
	var queryData={"parentId":treeNode.id};
	jqGrid2.jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
	$("#listButton").show();
}

/**
 * 初始化表格
 */
function initJqGrid2(){
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: mainUrl+"/sys/base/customForm/page",
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
                 	label: '编码',
                     name: 'code',
                     width: 75,
                     editable: false
                 },
                 {
                 	 label: '显示名称',
                     name: 'name',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '所属分类',
                     name: 'parentName',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '快速入口',
                     name: 'flowPathName',
                     width: 75,
                     editable: false
                 },
                 {
 					 label : '默认流程模板',
                     name: 'flowTemplateName',
                     width: 75,
                     editable: false
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
 * 设计
 */
function jumpDesign(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	if(id!=null && id!=""){
		window.open("dist/index.html?id="+id);
	}else{
		alert("请选择一行！")
		return;
	}
}

/**
 * 单据分类添加
 */
function addGroup(){
	//重置表单
	$('#customFormGroupForm')[0].reset();
	$("#customFormGroupForm").find("input[name='id']").val("");
	$('#myModal').modal('show');
}

/**
 * 单据分类修改
 */
function editGroup(){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getSelectedNodes();
	if(nodes.length>0){
		//编辑自定义表单分类
		$.ajax({
	        type:'get',
	        url:mainUrl+'/sys/base/customFormGroup/get/'+nodes[0].id,
	        success: function(data) {
	        	var customFormGroupDto=data.result;
	        	$("#customFormGroupForm").find("input[name='id']").val(customFormGroupDto.id);
	        	$("#customFormGroupForm").find("input[name='code']").val(customFormGroupDto.code);
	        	$("#customFormGroupForm").find("input[name='name']").val(customFormGroupDto.name);
	        	$("#description").html(customFormGroupDto.description);
	        	$('#myModal').modal('show');
        	}
		});
	}else{
		alert("请选中一个节点！")
		return;
	}
}

/**
 * 单据分类校验
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
 * 单据分类删除
 */
function delGroup(){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getSelectedNodes();
	var id=nodes[0].id;
	if(nodes.length>0){
		//查询该节点下是否有表单
		$.ajax({
	        type:'get',
	        url:mainUrl+'/sys/base/customFormGroup/getCount/'+id,
	        success: function(data) {
	        	var count=data.result;
	        	if(count>0){
	        		alert("该分类下存在表单不能删除！");
	        	}else{
	        		if(confirm("确认删除该分类吗？")){
	    				$.ajax({
	    					url:mainUrl+"/sys/base/customFormGroup/deleteBatch/"+id,
	    					type:'DELETE',
	    					dataType:'JSON',
	    					success:function (resultData ) {
	    						if (resultData&&resultData.success) {
	    							var treeNode = treeObj.getNodeByParam("id", id, null);
	    							treeObj.removeNode(treeNode);
	    						}else{
	    							alert("删除数据失败！");
	    						}
	    					}
	    				});
	    			}
	        	}
        	}
		});
	}else{
		alert("请选中一个节点！")
		return;
	}
}

/**
 * 单据分类保存
 * @param formName
 */
function saveForm(formName){
	var flag=validateField(formName);
	if(!flag){
		return;
	}
	var customFormGroupArr= $("#customFormGroupForm").serializeArray();
	var customFormGroupDto={};
	for(var i in customFormGroupArr){
		if("createDate"==customFormGroupArr[i].name||"updateDate"==customFormGroupArr[i].name|| "disabledDate"==customFormGroupArr[i].name){
			customFormGroupDto[customFormGroupArr[i].name]=new Date().getTime();
		}else{
			customFormGroupDto[customFormGroupArr[i].name]=customFormGroupArr[i].value;
		}
	}
	customFormGroupDto.delflag=false;
	if(customFormGroupDto.id==null || customFormGroupDto.id==""){
		$.ajax({
	       url:mainUrl+"/sys/base/customFormGroup/save",
	       data:JSON.stringify(customFormGroupDto),
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
	            	   var icon = "../css/zTreeStyle/img/diy/1_open.png";
	            	   treeObj.addNodes(null, {id:result.id, name:result.name,sort:result.sort,icon:icon});
	            	   var treeNode = treeObj.getNodeByParam("id", result.id, null);
	            	   treeObj.selectNode(treeNode,true);//指定选中ID的节点  
	            	   treeObj.setting.callback.onClick(null, treeObj.setting.treeId, treeNode);//调用事件  
//	            	   treeObj.checkNode(treeNode, true, true);
	                   $('#myModal').modal('hide');
	               }else {
	                   alert('数据保存失败！');
	               }
	           }
	       }
		});
	}else{
		$.ajax({
	       url:mainUrl+"/sys/base/customFormGroup/update/"+customFormGroupDto.id,
	       data:JSON.stringify(customFormGroupDto),
	       type:'PUT',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData){
	    	    if(resultData.success){
	    	    	//刷新树
	    	    	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	    	    	var treeNode = treeObj.getNodeByParam("id", customFormGroupDto.id, null);
	    	    	treeNode.name = customFormGroupDto.name;
	    	    	treeNode.code = customFormGroupDto.code;
	    	    	treeObj.updateNode(treeNode);
	    	    	
	    	    	$('#myModal').modal('hide');
	    	    }else {
                    alert.error('数据保存失败！');
                }
	       }
	   });
	}
}

/**
 * 自定义表单添加
 */
function formAdd(){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getSelectedNodes();
	if(nodes.length>0){
		window.open("add.html?id="+nodes[0].id);
	}
}

/**
 * 自定义表单修改
 */
function formEdit(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	if(id.length>0){
		window.open("update.html?id="+id);
	}else{
		alert("请选择一行！")
		return;
	}
}

/**
 * 刷新表格
 */
function reloadList(){
	 jQuery("#list2").trigger("reloadGrid");
}

/**
 * 自定义表单删除
 */
function formDel(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(!ids||ids.length==0) {
		alert("请选择要删除的行！");
		return;
	}
	ids = ids.join(",");
	if(ids&&ids!='') {
		if(confirm("确认删除该表单吗？")){
			$.ajax({
				url:mainUrl+"/sys/base/customForm/deleteBatch/"+ids,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData && resultData.success) {
						reloadList();
					}else{
						alert("删除数据失败！");
					}
				}
			});
		}
	}
}
