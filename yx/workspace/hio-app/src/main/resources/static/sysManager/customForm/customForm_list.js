/**
 * author:zhangfangzhi
 * date:20170323
 */
var zTreeObj;
var jqGrid2;
var type=null;
var sessionId=null;
var rowData;
var rowDataBefore;
var appId = '';
$(function(){
	resizeHeight();
	$(window).resize(function() {
		resizeHeight();
	});
	//初始化树
	getCustomTree();
	//初始化表格
	initJqGrid2();
	
	//获取SESSIONID
	$.ajax({
        type:'get',
        url:serviceUrl+'sys/base/customForm/getSessionId'+'?time='+Math.random(),
        success: function(data) {
	        sessionId=data.result;
	    }
	});
	
	//$("#listButton").hide();
	
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    
	//禁用所有按钮的默认行为
//    $('.btn').click(function() {
//        return false;
//    });

	$('#searchKeywords').attr('data-temp-placeholder', '名称/编码');
	$("#searchKeywords").inputPlaceholder();

	//模糊搜索input框事件绑定
	$("#searchKeywords").bind('keypress',function (event) {
		if(event.keyCode == "13"){
			fuzzySearch();
		}
	});

	//模糊搜索按钮事件
	$('#fuzzySearchBtn').on('click',function () {
		fuzzySearch();
	});

	//模糊搜索
	function fuzzySearch() {
		var searchKeywordsVal = $.trim($("#searchKeywords").val());
		var postDataObj = $('#list2').jqGrid('getGridParam', 'postData');
		if(postDataObj != undefined){
			delete postDataObj['searchKeywords'];
		}
		if(searchKeywordsVal!=''){
			postDataObj['searchKeywords'] = searchKeywordsVal;
		}

		jQuery("#list2").jqGrid('setGridParam', {postData: postDataObj,page:1}).trigger('reloadGrid');
	}
    
    //所有ajax请求异常的统一处理函数，处理
    $(document).ajaxError(
        function(event,xhr,options,exc ){
            if(xhr.status == 'undefined'){
                return;
            }
            switch(xhr.status){
	            case 403:
	                pop_tip_open("red","系统拒绝。");
	                break;
	            case 404:
	                pop_tip_open("red","您访问的资源不存在。");
	                break;
	            case 500:
	                pop_tip_open("red","服务器异常。");
	                break;
            }
        }
    );
    loadAppId();
});

//计算高度
function resizeHeight(){
	//左侧  头部底部为60px  title类 为50px
	var w_h = $(window).height();
	$(".slide-left .ztree-box").height((w_h-152)+"px");
}

/************************************************treeBegin******************************************/
/**
 * 树参数设置
 */
var setting = {
		view: {
            dblClickExpand: false,  
            showLine: true,  
            selectedMulti: false,
            fontCss: false,
            nameIsHTML: true
        },  
	edit: {  
		enable: true,
		showRemoveBtn:false,
        showRenameBtn:false,
        drag: {  
            autoExpandTrigger: true,  
            prev: null,  
            inner: null,  
            next: null,
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
        beforeDrag: null, //拖拽前：捕获节点被拖拽之前的事件回调函数，并且根据返回值确定是否允许开启拖拽操作  
        beforeDrop: null, //拖拽中：捕获节点操作结束之前的事件回调函数，并且根据返回值确定是否允许此拖拽操作  
        beforeDragOpen: null, //拖拽到的目标节点是否展开：用于捕获拖拽节点移动到折叠状态的父节点后，即将自动展开该父节点之前的事件回调函数，并且根据返回值确定是否允许自动展开操作  
        onDrag: null, //捕获节点被拖拽的事件回调函数  
        onDrop: null, //捕获节点拖拽操作结束的事件回调函数
		onCollapse: function(){
			$.xljUtils.treeResizeFn();
		},
        onExpand:  function(){
			$.xljUtils.treeResizeFn();
		}, //捕获节点被展开的事件回调函数
        onClick:zTreeOnClick //点击节点事件
    }  
};


//获取自定义分类树
function getCustomTree() {
    $.ajax({
        type:'POST',
        url:serviceUrl + "sys/base/customFormGroup/getTree",
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify({'showAll':true}),
        success: function(json) {
            var zNodes = json.result;
            recursionArray(zNodes);
            zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
//			zTreeObj.expandAll(true);
			//加滚动条
			setTimeout(function(){
				$.xljUtils.addTreeScroll('ztree-box');
				$.xljUtils.treeResizeFn();
			},300);
        }
    })
}

/**
 * 递归树匹配节点icon
 */
function recursionArray(arr) {
	for(var i in arr) {
		if(arr[i].pId == '0') {
			arr[i].iconSkin = "diy-program";
		}else {
			arr[i].iconSkin = "diy-group";
	    } 
	}
}

/*
 * 树点击节点事件
 */
function zTreeOnClick(event, treeId, treeNode) {
	var queryData={"parentId":treeNode.id};
	//if(treeNode.pId!="0" && treeNode.pId!=null){
		jqGrid2.jqGrid("setGridParam", { postData: queryData ,page:1}).trigger("reloadGrid");
		//$("#listButton").show();
	/*}else{
		//$("#listButton").hide();

	}*/
}

/************************************************treeEnd******************************************/

/**
 * 初始化表格
 */
function initJqGrid2(){
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: serviceUrl+"sys/base/customForm/page",
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{},
            datatype : "json", 
            multiboxonly:true,
            multiselect:true,
            autowidth:true,
            rownumbers: true,
            jsonReader : {
                repeatitems: false
            },
            colModel : [ 
                 {name : 'id',label : 'id',hidden:true,align : "center"},
                 {
                 	label: '编码',
                     name: 'code',
                     width: 50,
                     editable: false
                 },
                 {
                 	 label: '显示名称',
                     name: 'name',
					 width: 300,
                     editable: false,
                     cellattr: addCellAttr
                 },
                 {
 					 label : '所属分类',
                     name: 'parentName',
                     width: 50,
                     editable: false
                 },
                 {
 					 label : '创建方式',
                     name: 'isInner',
                     width: 50,
                     editable: false,
                     formatter: innerFormatter
                 },
                 {
 					 label : '状态',
                     name: 'status',
                     width: 20,
                     editable: false,
                     formatter: statusFormatter,
                     cellattr: addCellAttr
                 },
                 {
 					 label : 'URL',
                     name: 'url',
                     width: 120,
                     editable: false
                 }
             ],
            rowNum : 20,//一页显示多少条
            rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",
            viewrecords : true,
            ondblClickRow:function(rowid){
            	window.open("customForm_edit.html?type=edit&id="+rowid+"&appId="+appId);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                rowDataBefore = rowData;
                if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                	$('#list2').setSelection(rowDataBefore.id,true);
                	$('#list2 '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                }
            },
            onCellSelect: function(){
            	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            		$('#list2 '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
            	}
            },
            onSelectRow: function () {
            	var rowId=$('#list2').jqGrid("getGridParam","selrow");
    		    rowData = $('#list2').jqGrid('getRowData',rowId);
            },
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

/**
 * 设计
 */
function jumpDesign(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(ids && ids.length==1){
//		window.open("dist/#/index.html?id="+ids[0]);
		var selectData = $('#list2').jqGrid('getRowData',ids[0]);
		if(selectData.isInner=="自定义表单"){
			window.open("dist/index.html?id="+ids[0]+"&cfVid=customFormRelease"+"&session="+sessionId+"&time="+Math.random());
		}else{
			pop_tip_open("blue","请选择创建方式为自定义表单的记录！");
		}
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}

/**
 * 单据分类添加
 */
function addGroup(oper){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getSelectedNodes();
	var curNode=nodes[0];
	if(curNode && curNode.pId!=null && curNode.pId!="0"){
		pop_tip_open("blue","请选择一级分类！");
	}else{
		if(nodes!=null && nodes.length>0){
			window.open("customFormGroup_edit.html?type=add&parentId="+curNode.id+"&parentName="+encodeURI(curNode.name,"UTF-8")+"&time="+Math.random());
		}else{
			window.open("customFormGroup_edit.html?type=add&parentId=&parentName=&time="+Math.random());
		}
	}
	
//	cleanStyle();
//	type=oper;
//	//重置表单
//	$('#customFormGroupForm')[0].reset();
//	$("#description").html("");
//	$("#customFormGroupForm").find("input[name='id']").val("");
//	$(".modal-title").html("单据分类-新增");
//	$.ajax({
//          type:'get',
//          url:serviceUrl+'/sys/uuid/generator/getGuuid'+'?time='+Math.random(),
			
//          success: function(data) {
//  	        var guuid=data.result;
//  		    $("#customFormGroupForm").find("input[name='id']").val(guuid);
//  	    }
//  	});
//    $("#customFormGroupForm").attr('action',serviceUrl+'/sys/base/customFormGroup/save');
//    $("#customFormGroupForm").attr('method','POST');
//    
//	$('#myModal').modal('show');
}

/**
 * 单据分类修改
 */
function editGroup(oper){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getSelectedNodes();
	var curSelectNode=null;
	if(nodes!=null && nodes.length>0){
		curSelectNode=nodes[0];
	}
	if(curSelectNode!=null){
		var pId=curSelectNode.id;
		var pName=curSelectNode.name;
		if(curSelectNode.pId=="0" || curSelectNode.pId==null){//根节点
			pId="0";
			pName="";
		}else{
			var treeNode = treeObj.getNodeByParam("id", curSelectNode.pId, null);
			pId=treeNode.id;
			pName=treeNode.name;
		}
		window.open("customFormGroup_edit.html?type=edit&parentId="+pId+"&id="+curSelectNode.id+"&parentName="+encodeURI($.xljUtils.htmlDecode(pName),"UTF-8")+"&time="+Math.random());
	}else{
		pop_tip_open("blue","请选中一个节点！");
		return;
	}
//	cleanStyle();
//	type=oper;
//	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
//	var nodes = treeObj.getSelectedNodes();
//	if(nodes.length>0){
//		$(".modal-title").html("单据分类-修改");
//        $.ajax({
//            url:serviceUrl+'/sys/base/customFormGroup/get/'+nodes[0].id+'?time='+Math.random(),
//            type:'GET',
//            success:function (resultData) {
//                if(resultData&&resultData.success) {
//                    var result = resultData.result;
//                    for(var item in result) {
//                        if($("#customFormGroupForm :input[name='"+item+"']").length>0){
//                            $("#customFormGroupForm :input[name='"+item+"']").val(result[item]);
//                        }
//                    }
//                    $("#customFormGroupForm").attr('action',serviceUrl+'/sys/base/customFormGroup/update/'+result['id']);
//                    $("#customFormGroupForm").attr('method','PUT');
//                    $('#myModal').modal('show');
//                }
//            }
//        });
//	}else{
//		pop_tip_open("blue","请选中一个节点！");
//		return;
//	}
}

/**
 * 表单保存
 * @param op
 */
function saveForm(op){
	$('#customFormGroupForm').attr('data-callback','formCallBack(true)');
    $('#customFormGroupForm').submit();
}

/**
 * 清除样式
 */
function cleanStyle(){
	$("#customFormGroupForm").find("input[name='code']").parent().removeClass("has-error has-feedback");
    $("#customFormGroupForm").find("input[name='name']").parent().removeClass("has-error has-feedback");
}

/**
 * form表单提交回调函数
 */
function formCallBack(isSave,resultJsonData) {
    if(resultJsonData) {
        var successFlag = resultJsonData.success;
        var msg = resultJsonData.msg;
        var result = resultJsonData.result;
        if(successFlag) {
        	if(result.codeExist){
      		   //code重复
      		   $("#customFormGroupForm").find("input[name='code']").parent().addClass("has-error has-feedback");
 	           $("#customFormGroupForm").find("input[name='code']").after("<label id='code-error' class='error help-block' style='margin: 0px; float: left;' for='code'>编码重复请重新输入</label>");
      	   }else{
      		   $("#customFormGroupForm").find("input[name='code']").parent().removeClass("has-error has-feedback");
 	           $("#customFormGroupForm").find("input[name='code']").after("");
      	   }
      	   if(result.nameExist){
      		   //name重复
      		   $("#customFormGroupForm").find("input[name='name']").parent().addClass("has-error has-feedback");
 	           $("#customFormGroupForm").find("input[name='name']").after("<label id='name-error' class='error help-block' style='margin: 0px; float: left;' for='name'>名称重复请重新输入</label>");
      	   } else{
      		   $("#customFormGroupForm").find("input[name='name']").parent().removeClass("has-error has-feedback");
 	           $("#customFormGroupForm").find("input[name='name']").after("");
      	   }
    	   if(result.codeExist==false && result.nameExist==false){
    		   //刷新树
        	   var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    		   if("add"==type){
    			   var icon = "diy-group";
            	   treeObj.addNodes(null, {id:result.id, name:result.name,sort:result.sort,iconSkin:icon});
            	   var treeNode = treeObj.getNodeByParam("id", result.id, null);
            	   treeObj.selectNode(treeNode,true);//指定选中ID的节点  
//            	   treeObj.setting.callback.onClick(null, treeObj.setting.treeId, treeNode);//调用事件  
//            	   treeObj.setting.callback.onClick=toInvokeClickNode(treeObj);
    		   }else if("edit"==type){
    			   	var nodes = treeObj.getSelectedNodes();
	    	    	var treeNode = treeObj.getNodeByParam("id", nodes[0].id, null);
	    	    	treeNode.name = result.name;
	    	    	treeNode.code = result.code;
	    	    	treeObj.updateNode(treeNode);
	    	    	
	    	    	//刷新列表
	    	    	var queryData={"parentId":treeNode.id};
	    	    	jqGrid2.jqGrid("setGridParam", { postData: queryData ,page:1}).trigger("reloadGrid");
    		   }
               $('#myModal').modal('hide');
    	   }
        }else {
            pop_tip_open("red","数据保存失败！");
        }
    }
}

//function toInvokeClickNode(treeNode){
//	var queryData={"parentId":treeNode.id};
//	jqGrid2.jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
//}

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
	if(nodes.length>0){
		var curNode=nodes[0];
		if(curNode.pId==null || curNode.pId=="0"){
			//一级节点删除判断
			$.ajax({
		        type:'get',
		        url:serviceUrl+'/sys/base/customFormGroup/getGroupCount/'+curNode.id+'?time='+Math.random(),
		        success: function(data) {
		        	var count=data.result;
		        	if(count>0){
		        		pop_tip_open("blue","该分类下存在子分类不能删除！");
		        	}else{
		        		pop_text_open("blue","确认删除该分类吗？",function(){
		    				$.ajax({
		    					url:serviceUrl+"/sys/base/customFormGroup/deletePseudo/"+curNode.id,
		    					type:'DELETE',
		    					dataType:'JSON',
		    					success:function (resultData ) {
		    						if (resultData&&resultData.success) {
		    							var treeNode = treeObj.getNodeByParam("id", curNode.id, null);
		    							var preNode = treeNode.getPreNode();
		    							treeObj.removeNode(treeNode);
		    							treeObj.selectNode(preNode,true);//指定选中ID的节点  
		    						}else{
		    							pop_tip_open("red","删除数据失败！");
		    						}
		    					}
		    				});
		    			},true);
		        	}
	        	}
			});
		}else{
			//二级节点删除判断
			//查询该节点下是否有表单
			$.ajax({
		        type:'get',
		        url:serviceUrl+'/sys/base/customFormGroup/getCount/'+curNode.id+'?time='+Math.random(),
		        success: function(data) {
		        	var count=data.result;
		        	if(count>0){
		        		pop_tip_open("blue","该分类下存在表单不能删除！");
		        	}else{
		        		pop_text_open("blue","确认删除该分类吗？",function(){
		    				$.ajax({
		    					url:serviceUrl+"/sys/base/customFormGroup/deletePseudo/"+curNode.id,
		    					type:'DELETE',
		    					dataType:'JSON',
		    					success:function (resultData ) {
		    						if (resultData&&resultData.success) {
		    							var treeNode = treeObj.getNodeByParam("id", curNode.id, null);
		    							var preNode = treeNode.getPreNode();
		    							var parNode = treeNode.getParentNode();
		    							treeObj.removeNode(treeNode);
		    							if(preNode){
		    								treeObj.selectNode(preNode,true);//指定选中ID的节点  
		    							}else{
		    								treeObj.selectNode(parNode,true);//指定选中ID的节点  
		    							}
		    						}else{
		    							pop_tip_open("red","删除数据失败！");
		    						}
		    					}
		    				});
		    			},true);
		        	}
	        	}
			});
		}
	}else{
		pop_tip_open("blue","请选中一个树节点！");
		return;
	}
}

/**
 * 自定义表单添加
 */
function formAdd(){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getSelectedNodes();
	if(nodes.length>0){
		if(!nodes[0].pId||nodes[0].pId=='0'){
			$.xljUtils.tip('blue','只能在子分类下创建！');
			return;
		}
		window.open("customForm_edit.html?type=add&id="+nodes[0].id+"&appId="+appId);
	}else{
		pop_tip_open("blue","请选中一个树节点！");
	}
}

/**
 * 自定义表单修改
 */
function formEdit(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(ids && ids.length==1){
		window.open("customForm_edit.html?type=edit&id="+ids+"&appId="+appId);
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}

/**
 * 刷新表格
 */
function reloadList(type,id){
	jQuery("#list2").trigger("reloadGrid");
	if(type=="add"){
		rowData = {id:id};
	}
}

/**
 * 刷新树
 * @param type
 * @param result
 */
function reloadTree(type,result){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	if(type=="add"){
		//添加树节点
		var nodes = treeObj.getSelectedNodes();
		if (nodes.length>0) {
			var curNode=nodes[0];
			var icon = "diy-program";
			if(result.cleanParent!=null && result.cleanParent=="1"){
				getCustomTree();
			}else{
//				curNode = treeObj.addNodes(curNode, {id:result.id, name:result.name,sort:result.sort,iconSkin:icon,pId:curNode.id,status:'1'});
				getCustomTree();
			}
		}else{
			getCustomTree();
		}
	}else if(type=="edit"){
		//修改树节点
		var treeNode = treeObj.getNodeByParam("id", result.currentDataId, null);
		var treeNodeToAdd=treeNode;
		if(result.isChangeParent==false){//没更换上级
	    	treeNode.name = result.name;
	    	treeNode.code = result.code;
	    	treeObj.updateNode(treeNode);
		}else{//更换上级
//			//删除节点
//			treeObj.removeNode(treeNode);
//			//添加节点
//			var treeNodeNew = treeObj.getNodeByParam("id", result.parentDataId, null);
//			var icon = "diy-program";
//			treeObj.addNodes(treeNodeNew, {id:treeNodeToAdd.id, name:treeNodeToAdd.name,sort:treeNodeToAdd.sort,iconSkin:icon,pId:treeNodeNew.id});
			getCustomTree();
		}
	}
	//刷新表格
	jQuery("#list2").trigger("reloadGrid");
}

/**
 * 自定义表单删除
 */
function formDel(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(!ids||ids.length==0) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	var prevId = $("#list2 #" + ids).prev()[0].id;
	var delCount=ids.length;
	ids = ids.join(",");
	if(ids&&ids!='') {
		$.ajax({
	        type:'get',
			url : serviceUrl + '/sys/base/customForm/getCount/'+ids+'?time='+Math.random(),
	        success: function(data) {
	        	var resultData=data.result;
	        	if(resultData){
	        		if(resultData.hasInstance){
	        			pop_tip_open("blue","选中的表单模板第"+resultData.validateRow+"行下存在表单实例不能删除！");
	        		}else{
	        			pop_text_open("blue","确认删除【"+delCount+"】张表单吗？",function(){
							$.ajax({
								url:serviceUrl+"sys/base/customForm/deletePseudoBatch/"+ids,
								type:'DELETE',
								dataType:'JSON',
								success:function (resultData ) {
									if (resultData && resultData.success) {
										rowData = $("#list2").jqGrid("getRowData",prevId);
										reloadList();
									}else{
										pop_tip_open("red","删除数据失败！");
									}
								}
							});
						},true);
	        		}
	        	}
        	}
		});
	}
}

/**
 * 关闭Modal（冲突需手动关闭）
 * @param modal
 */
function closeModleSelf(modal){
	$("#customFormGroupForm").validate().resetForm(); //清除验证
	$('#'+modal).modal('hide');
}

/**
 * 复制模板
 */
function copyTemplate(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(ids && ids.length==1){
		var selectData = $('#list2').jqGrid('getRowData',ids[0]);
		if(selectData.isInner=="自定义表单"){
			window.open("customForm_edit.html?type=copy&id="+ids[0]+"&appId="+appId);
		}else{
			pop_tip_open("blue","请选择创建方式为自定义表单的记录！");
		}
	}else{
		pop_tip_open("blue","请选择一行！");
		return;
	}
}

/**
 * 状态格式化
 */
function statusFormatter(cellvalue, options, rowObject){
	if(cellvalue=="0"){
		return "禁用";
	}else if(cellvalue=="1"){
		return "启用";
	}
	return "";
}

/**
 * 状态格式化
 */
function innerFormatter(cellvalue, options, rowObject){
	if(cellvalue=="0"){
		return "外部资源";
	}else if(cellvalue=="1"){
		return "内部资源";
	}else if(cellvalue=="2"){
		return "自定义表单";
	}
	return "";
}

/**
 * 分类上移下移
 */
function moveNode(sign){
	var nodes = zTreeObj.getSelectedNodes();
	if(nodes.length < 1 ){
		pop_tip_open("blue","请先选择一个分类");
		return;
	}
	if(sign == 1){
		var index = nodes[0].getIndex();
		if(index == 0){
			pop_tip_open("blue","已经是顶部，不能上移");
			return;
		}else{
			var node = nodes[0].getPreNode();
			if(node==null){
				pop_tip_open("blue","已经是顶部，不能上移");
				return;
			}else{
				$.ajax({
					url:serviceUrl+"sys/base/customFormGroup/updateSort/"+nodes[0].id,
					type:'put',
					dataType:'JSON',
					contentType:"application/json",
					data:'{"sortType":'+sign+'}',
					success:function (resultData ) {
						if (resultData&&resultData.success) {
							pop_tip_open("green","排序成功！");
							zTreeObj.moveNode(node,nodes[0], "prev");
						}else{
							pop_tip_open("red","排序失败！");
						}
					},
			   	    error: function(XMLHttpRequest, textStatus, errorThrown) {
					   pop_tip_open("red","服务异常,请联系管理员！");
			        }
				});
			}
		}
	}else{
		var node = nodes[0].getNextNode();
		if(node==null){
			pop_tip_open("blue","已经是底部，不能下移");
			return;
		}else{
			$.ajax({
				url:serviceUrl+"sys/base/customFormGroup/updateSort/"+nodes[0].id,
				type:'put',
				dataType:'JSON',
				contentType:"application/json",
				data:'{"sortType":'+sign+'}',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						pop_tip_open("green","排序成功！");
						zTreeObj.moveNode(node,nodes[0], "next");
					}else{
						pop_tip_open("red","排序失败！");
					}
				},
		   	    error: function(XMLHttpRequest, textStatus, errorThrown) {
				   pop_tip_open("red","服务异常,请联系管理员！");
		        }
			});
		}
	}
}

/**
 * 单据上移下移
 */
function updateSort(type){
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(!ids||ids.length==0) {
		pop_tip_open("blue","请选择一行！");
		return;
	}
	$.ajax({
		url:serviceUrl+"sys/base/customForm/updateSort/"+ids,
		type:'put',
		dataType:'JSON',
		contentType:"application/json",
		data:'{"sortType":'+type+'}',
		success:function (resultData ) {
			if (resultData&&resultData.success) {
				pop_tip_open("green","排序成功！");
				jQuery("#list2").trigger("reloadGrid");
			}else{
				pop_tip_open("red","排序失败！");
			}
		},
   	    error: function(XMLHttpRequest, textStatus, errorThrown) {
		   pop_tip_open("red","服务异常,请联系管理员！");
        }
	});
}

/**
 * 启用禁用
 */
function enableOrNot(st){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	
	if(id!=null && id!=""){
		var rowData = $("#list2").jqGrid('getRowData',id);
		var status=rowData.status;
		if(status=="启用"){
			status="1";
		}else{
			status="0";
		}
		if(status!=st){
			$.ajax({
		       url:serviceUrl+"/sys/base/customForm/enableOrNot",
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
		                   pop_tip_open("red","状态更新失败！");
		               }
		           }
		       }
			});
		}
	}else{
		pop_tip_open("blue","请选中一个节点！");
		return;
	}
}

/**
 * 改变行字段颜色
 */
function addCellAttr(rowId, val, rawObject, cm, rdata) {
    if(rawObject.status=="0"){
        return "style='color:red'";
    }
}

/**
 * 分类查询过滤
 */
function clickRadio(){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var allNode = treeObj.transformToArray(treeObj.getNodes());;
    treeObj.hideNodes(allNode);
    nodeList = treeObj.getNodesByParamFuzzy("name", $("#keywords").val(), null);
    nodeList = treeObj.transformToArray(nodeList);
    for(var n in nodeList){
       findParent(treeObj,nodeList[n]);
    }
    treeObj.showNodes(nodeList);
    setTimeout(function(){
    	$.xljUtils.addTreeScroll('ztree-box');
    	$.xljUtils.treeResizeFn();
    },300);
    
//    resizeHeight();
}

function findParent(treeObj,node){
    treeObj.expandNode(node,true,false,true);
    var pNode = node.getParentNode();
    if(pNode != null){
    	nodeList.push(pNode);
    	findParent(treeObj,pNode);
    }
}

/**
 * 数据权限下拉
 */
function loadAppId(){
	$.ajax({
	    type: 'POST',
	    contentType: "application/json",
	    url: serviceUrl + "/sys/res/appSystem/queryList",
	    data: JSON.stringify({delflag:false,code:'OA'}),
	    dataType: "JSON",
	    async:false,
	    success: function (resultData) {
	        if (resultData&&resultData.success) {
	            var fieldList = resultData.result;
	            if(fieldList&&fieldList.length>0){
	                appId = fieldList[0].id;
	            }
	        }
	    },
	    error:function (xhr) {
	        $.xljUtils.getError(xhr.status);
	    }
	});
}

/**
 * 查看版本历史
 */
function viewVersion(){
	var id=$('#list2').jqGrid('getGridParam','selrow');
	if(id!=null && id!=""){
		var rowData = $("#list2").jqGrid('getRowData',id);
		if(rowData && rowData.isInner=="自定义表单"){
			window.open("customFormVersion_list.html?customFormId="+rowData.id);
		}else{
			pop_tip_open("blue","只有创建方式为自定义表单的数据才能查看版本！");
			return;
		}
	}else{
		pop_tip_open("blue","请选中一个节点！");
		return;
	}
}
