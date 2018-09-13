/**
 * author:zhangfangzhi
 * date:20170322
 */
var mainId=null;//档案主表id
var zTreeObj;
var jqGrid2;
var rowDataSelect;
var rowDataBefore;
$(function () {
	//参数过滤
	var id = $.xljUtils.getUrlParam('id'); 
	mainId=id;
	
	//初始化树、表格
	$.ajax({
        type:'get',
        url:hostUrl+'/sys/base/customArchives/get/'+id+'?time='+Math.random(),
        success: function(data) {
        	var customArchivesDto=data.result;
        	$(".tit").html(customArchivesDto.name);
    		getTree(customArchivesDto.id,customArchivesDto.name);
    		initJqGrid2();
    		//页面加载完毕后更改grid宽高
    	    $.xljUtils.resizeNestedGrid();
        }
	});
	
    //禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
    });
    
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
});	

/*******************************************treeBegin************************************************/
/**
 * 树参数设置
 */
var setting = {
	view: {
        dblClickExpand: false,  
        showLine: false,  
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
        onExpand: function(){
        	$.xljUtils.treeResizeFn();
        }, //捕获节点被展开的事件回调函数  
        onCollapse:function(){
        	$.xljUtils.treeResizeFn();
        },
        onClick:zTreeOnClick //点击节点事件
    }  
};

/**
 * 节点点击事件
 * @param event
 * @param treeId
 * @param treeNode
 */
function zTreeOnClick(event, treeId, treeNode) {
	var queryData={
			"parentId":treeNode.id,
			"mainId":mainId
			};
	jqGrid2.jqGrid("setGridParam", { postData: queryData }).trigger("reloadGrid");
	$.xljUtils.resizeNestedGrid();
}

/**
 * 递归树匹配节点icon
 * @param arr
 */
function recursionArray(arr) {
	for(var i in arr) {
		if(arr[i].pId == '0') {
			arr[i].iconSkin = "diy-group";
		}else {
			arr[i].iconSkin = "diy-program";
	    } 
	}
}

/**
 * 档案子项树
 * @param id
 * @param name
 */
function getTree(id,name) {
	var customArchivesItemDto={};
	customArchivesItemDto.mainId=id;	
	customArchivesItemDto.name=name;	
	$.ajax({
		type:"post",
		url: hostUrl+"/sys/base/customArchives/getTree",
		dataType:"json",
	  	contentType: "application/json;charset=utf-8",
	  	data:JSON.stringify(customArchivesItemDto),
	  	success: function(json) {
	  		var zNodes = json.result;
	  		recursionArray(zNodes);
	  		zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
//	  		zTreeObj.expandAll(true);
	  		
	  		var nodes = zTreeObj.getNodes();  
	  		zTreeObj.selectNode(nodes[0],true);  
//	  		zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);//调用事件  
	  		$.xljUtils.addTreeScroll();
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
	return (treeNode.status&&treeNode.status=='0') ?
		        {'font-family': 'Verdana, Arial, Helvetica, AppleGothic, sans-serif','font-style':'normal', 'color':'red'} :
		        {color:"#333", "font-weight":"normal",'font-style':'normal'};
}
/*******************************************treeEnd************************************************/

/**
 * 初始化表格
 */
function initJqGrid2(){
    jqGrid2 = jQuery("#list2").jqGrid(
        {
        	url: hostUrl+"/sys/base/customArchivesItem/page",
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{"parentId":"-1"},
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
                 	label: '类型编码',
                     name: 'code',
                     width: 75,
                     editable: false
                 },
                 {
                 	 label: '类型名称',
                     name: 'name',
                     width: 75,
                     editable: false,
                     cellattr: addCellAttr
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
                     },
                     cellattr: addCellAttr
                 }
             ],
            rowNum : 20,//一页显示多少条
            rowList : [ 20, 50, 100, 200 ],//可供用户选择一页显示多少条
            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",
            viewrecords : true,
            ondblClickRow:function(rowid){
            	treeEdit();
            },
            onCellSelect: function(){
            	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            		$('#list2 '+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
            	}
            },
            onSelectRow: function () {
            	var rowId=$('#list2').jqGrid("getGridParam","selrow");
    		      rowDataSelect = $('#list2').jqGrid('getRowData',rowId);
            },
            gridComplete: function () {
            	$.xljUtils.addGridScroll();
            	rowDataBefore = rowDataSelect;
                if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                	$('#list2').setSelection(rowDataBefore.id,true);
                	$('#list2 '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                }
            },
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
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
	       url:hostUrl+"/sys/base/customArchivesItem/save",
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
	            	   if(result.nameExist){
	            		   //code重复
	            		   $("#addNameVal").html("名称重复请重新输入!");
	            	   }else{
	            		   $("#addNameVal").html("");
	            	   }
	            	   if(result.codeExist){
	            		   //name重复
	            		   $("#addCodeVal").html("编码重复请重新输入!");
	            	   }else{
	            		   $("#addCodeVal").html("");
	            	   }
	            	   if(result.codeExist==false && result.nameExist==false){
	            		   //刷新树
		            	   var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		            	   var nodes = treeObj.getSelectedNodes();
		            	   if (nodes.length>0) {
		            		   var curNode=nodes[0];
		            		   var icon = "diy-program";
		            		   curNode = treeObj.addNodes(curNode, {id:result.id, name:result.name,sort:result.sort,iconSkin:icon,pId:curNode.id});
		            	   } 
		            	   //刷新表格
		            	   jQuery("#list2").trigger("reloadGrid");
		                   $('#addTreeModal').modal('hide');
	            	   }
	               }else {
	            	   pop_tip_open("red","数据保存失败！");
	               }
	           }
	       }
		});
	} else{
		//update
		$.ajax({
	       	url:hostUrl+"/sys/base/customArchivesItem/update/"+customArchivesItemDto.id,
			data:JSON.stringify(customArchivesItemDto),
			type:'PUT',
			contentType:'application/json',
			dataType:'JSON',
			success:function (resultData){
				var result = resultData.result;
				if(resultData.success){
					if(result.nameExist){
						//code重复
						$("#addNameVal").html("名称重复请重新输入!");
					}else{
						$("#addNameVal").html("");
					}
					if(result.codeExist){
						//name重复
						$("#addCodeVal").html("编码重复请重新输入!");
					}else{
						$("#addCodeVal").html("");
					}
					if(result.codeExist==false && result.nameExist==false){
		    	    	//刷新树
		    	    	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		    	    	var treeNode = treeObj.getNodeByParam("id", customArchivesItemDto.id, null);
		    	    	treeNode.name = customArchivesItemDto.name;
		    	    	treeNode.code = customArchivesItemDto.code;
		    	    	treeObj.updateNode(treeNode);
		    	    	//刷新表格
		            	jQuery("#list2").trigger("reloadGrid");
		                $('#addTreeModal').modal('hide');
					}
	    	    }else {
	    	    	pop_tip_open("red","数据保存失败！");
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
	var curSelectNodeId="";
	if(nodes!=null && nodes.length>0){
		curSelectNodeId=nodes[0].id;
	}
	window.open("baseArchives_tree_edit.html?type=add&parentId="+curSelectNodeId+"&mainId="+mainId+"&time="+Math.random());//跳转查看页面
}

/**
 * 修改
 */
function treeEdit(){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(ids!=null && ids!="" && ids.length==1){
		var listId=ids[0];
		var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		var nodes = treeObj.getSelectedNodes();
		var curSelectNode=null;
		if(nodes!=null && nodes.length>0){
			curSelectNode=nodes[0];
		}
		var pId=curSelectNode.id;
		var pName=curSelectNode.name;
		
		if(listId==curSelectNode.id){
			if(curSelectNode.pId=="0" || curSelectNode.pId==null){//根节点
				pId="0";
				pName="";
			}else{
				var treeNode = treeObj.getNodeByParam("id", curSelectNode.pId, null);
				pId=treeNode.id;
				pName=treeNode.name;
			}
		}
		
		
		var idsArray=new Array();
	    var treeNode = treeObj.getNodeByParam("id", listId, null);
	    idsArray=getAllChildrenNodes(treeNode,idsArray);
	    idsArray.push(listId);
	    var excludeIds = idsArray.join(",");
		window.open("baseArchives_tree_edit.html?type=edit&parentId="+pId+"&mainId="+mainId+"&id="+listId+"&parentName="+encodeURI($.xljUtils.htmlDecode(pName),"UTF-8")+"&excludeIds="+excludeIds+"&time="+Math.random());//跳转查看页面
	}else{
		pop_tip_open("blue","请选中一个节点！");
		return;
	}
}

/**
 * 删除
 */
function treeDel(){
	var idsArray=new Array();
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	if(ids!=null && ids!="" && ids.length>0){
    	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    	for(var s=0;s<ids.length;s++){
    		var treeNode = treeObj.getNodeByParam("id", ids[s], null);
    		idsArray=getAllChildrenNodes(treeNode,idsArray);
    		idsArray.push(ids[s]);
    	}
    	var idsStr = idsArray.join(",");
		pop_text_open("blue","确认删除【"+ids.length+"】条数据吗？",function(){
			$.ajax({
				url:hostUrl+"/sys/base/customArchivesItem/deletePseudoBatch/"+idsStr,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						$('#list2').jqGrid().trigger("reloadGrid");
						var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
						for(var k=0;k<ids.length;k++){
							var treeNode = treeObj.getNodeByParam("id", ids[k], null);
							treeObj.removeNode(treeNode);
						}
					}else{
						pop_tip_open("red","删除数据失败！");
					}
				}
			});
		},true);
	}else{
		pop_tip_open("blue","请选择一个节点！");
		return;
	}
}

/**
 * 递归查询子节点
 * @param treeNode
 * @param result
 */
function getAllChildrenNodes(treeNode,result){
    if (treeNode.isParent) {
    	var childrenNodes = treeNode.children;
    	if (childrenNodes) {
    		for (var i = 0; i < childrenNodes.length; i++) {
    			result.push(childrenNodes[i].id);
    			result = getAllChildrenNodes(childrenNodes[i], result);
    		}
    	}
    }
    return result;
}

/**
 * 启用禁用
 */
function enableOrNot(st){
	var ids=$('#list2').jqGrid('getGridParam','selarrrow');
	
	if(ids!=null && ids!="" && ids.length==1){
		var rowData = $("#list2").jqGrid('getRowData',ids[0]);
		var status=rowData.status;
		if(status=="启用"){
			status="1";
		}else{
			status="0";
		}
		if(status!=st){
			$.ajax({
		       url:hostUrl+"/sys/base/customArchivesItem/enableOrNot",
		       data:JSON.stringify({'id':ids[0],'status':st}),
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
		            	   //刷新树节点样式
		            	   var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		            	   var treeNode = treeObj.getNodeByParam("id", ids[0], null);
		            	   treeNode.status=st;
		            	   treeObj.updateNode(treeNode);
		               }else {
		                   pop_tip_open("red","数据保存失败！");
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
 * 刷新树、列表
 * @param type
 * @param result
 */
function reloadList(type,result){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	if(type=="add"){
		//添加树节点
		var nodes = treeObj.getSelectedNodes();
		if (nodes.length>0) {
			var curNode=nodes[0];
			var icon = "diy-program";
			if(result.cleanParent!=null && result.cleanParent=="1"){
				getTree(mainId);
			}else{
//				curNode = treeObj.addNodes(curNode, {id:result.id, name:result.name,sort:result.sort,iconSkin:icon,pId:curNode.id,status:'1'});
				getTree(mainId);
			}
		}else{
			getTree(mainId);
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
			getTree(mainId);
		}
	}
	//刷新表格
	jQuery("#list2").trigger("reloadGrid");
}

/**
 * 关闭Modal（冲突需手动关闭）
 * @param modal
 */
function closeModleSelf(modal){
	$('#'+modal).modal('hide');
}

/*
* miying add
* */

resizeHeight();
$(window).resize(function() {
    resizeHeight();
});
//计算高度
function resizeHeight(){
	var w_h = $(window).height();
    //左侧  头部底部为60px  title类 为50px
    $(".slide-left .ztree-box").height((w_h-150)+"px");
    //右侧table
//    $(".con-table .mytable").height((w_h-180)/2+"px");
}
