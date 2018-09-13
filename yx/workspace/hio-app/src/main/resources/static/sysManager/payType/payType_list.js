var rowDataNow;//当前选中数据
var rowDataBefore;
$(function(){
    //页面加载完成之后执行
    pageInit();
    $.xljUtils.resizeNestedGrid(); 
    $("#pName").inputPlaceholder();
    $("#pName").keypress(function(e){
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13){
        	searchPayTypeData();
        }
 })
});  
/**
 * 
 */
function pageInit(){
	getPayTypeData();
}

/**
 * author:liuf
 * describe: 过滤查询
 * param: null
 */

function searchPayTypeData(){
	$("#list2").jqGrid().trigger("reloadGrid");
}
/**
 * author:liuf
 * describe: 加载页面数据
 * param: null
 */

function getPayTypeData(){
	   jQuery("#list2").jqGrid({
		    url: serviceUrl+'sys/base/payType/getTypetree',
           ajaxGridOptions: { contentType: 'application/json' },
           mtype : "POST",  
           treeGrid: true,
           treeGridModel: "adjacency", 
           ExpandColumn:"name",
           datatype : "json", 
           subGrid:true,
           autowidth:true,
           jsonReader : {
               root:function(data){
            	   var pstatus=$("#status").val();//获取状态
            	   var name=$("#pName").getInputVal();// 获取名称
            	   var array=new Array();
            	   var arr=data.result;
	             	if(pstatus){//有状态的时候
		            		   if(name){//名称存在时
		            			   for(var o in arr){
		            				   if(arr[o].status==pstatus&&(arr[o].name.indexOf(name)>-1)){
		            					   array.push(arr[o].sort);
		            				   }
		            			   }
		            		   }else{
		            			   for(var o in arr){
		            				   if(arr[o].status==pstatus){
		            					   array.push(arr[o].sort);
		            				   }
		            			   }
		            		   }
            		   
		            	   if(array.length>0){
		            		  for(var d in array){
		            			  for(var i in arr){
		            				  if(arr[i].isrepat==true){
		            				  if(array[d].indexOf(arr[i].sort)>-1){
		            					  arr[i].expanded=true;
		            					  arr[i].isrepat=false;
		            				  }else{
		            					  arr[i].expanded=false;
		            					  arr[i].isrepat=true;
		            				  }
		            				  }
		            			  }
		            		  } 
		            		   return arr;
		            		 }else{
		            			 return null; 
		            		 }
            	   }else{//没状态的时候
            		  if(name){
            			  for(var o in arr){
           				   if(arr[o].name.indexOf(name)>-1){
           					   array.push(arr[o].sort);
           				   }
            			  }
            			   if(array.length>0){
 		            		  for(var d in array){
 		            			  for(var i in arr){
 		            				  if(arr[i].isrepat==true){
 		            				  if(array[d].indexOf(arr[i].sort)>-1){
 		            					  arr[i].expanded=true;
 		            					  arr[i].isrepat=false;
 		            				  }else{
 		            					  arr[i].expanded=false;
 		            					  arr[i].isrepat=true;
 		            				  }
 		            				  }
 		            			  }
 		            		  } 
 		            		   return arr;
 		            		 }else{
 		            			 return null; 
 		            		 }
            		  }else{
            			  return data.result; 
            		  }
            		   
            		   
            	 }  
               },
               repeatitems : false  
           },
           colModel : [ 
               {name : 'id',label : 'id',hidden:true,align : "center"},
               {name : 'name',label : '付款款项类型名称',align : "left",editable: true,cellattr: addCellAttr},
               {name : 'code',label : '付款款项类型编码',align : "center"},
               {name : 'status',label : '状态',align : "center",formatter:function(status){
               	if(status=="0"){
               		return "禁用";
               	}else if(status=="1"){
               		return "启用";
               	}else{
               		return "";
               	}
               },cellattr: addCellAttr},
               {name : 'remark',label : '备注',align : "center"},
               {name : 'level',label : 'level',hidden:true,align : "center"},
               {name : 'expanded',label : '是否展开',hidden:true,align : "center"}

           ],
           rowNum:-1,
           treeReader:{
           		   level_field: "level",
           		   parent_id_field: "parentId",
           		   leaf_field: "isLeaf",
           		   expanded_field: "expanded"
           		},
           	  ondblClickRow:function(id,iRow,iCol,e){//双击回显页面 除了名字列以外(名字列双击编辑)
             	    if(iCol==1){
             	    	return;
             	    }
              	toupdate();
              },
           onCellSelect:function(){
        	 	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            		$('#list2'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
            	}
           },
           onSelectRow: function () {
           	var rowId=$('#list2').jqGrid("getGridParam","selrow");
           	rowDataNow = $('#list2').jqGrid('getRowData',rowId);
           },
           pager : '#pager2',
           loadError:function(jqXHR, textStatus, errorThrown){
        	   $.xljUtils.getError(jqXHR.status);
           },
           gridComplete:function(){
        	   $.xljUtils.addGridScroll();
			   $.xljUtils.gridResizeFn();
             var arrdata=jQuery("#list2").jqGrid('getRowData');   
             for(var o in arrdata){
            	 if(arrdata[o].expanded=="false"){
            		 $("#"+arrdata[o].id).hide();
            	 }
             }
             rowDataBefore = rowDataNow;
             if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            	 //添加回显选中行样式
            	 $('#list2').setSelection(rowDataBefore.id,true);
            	 $("#"+rowDataBefore.id).addClass("ui-state-highlight"); 
             }
           }
       });
}

/**
 * author:liuf
 * describe: 删除产品类型
 * param: null
 */
function deletePayType(){
var ids=jQuery("#list2").jqGrid('getGridParam',"selrow");
if(!ids) {
	pop_tip_open("blue","请选择一条数据");
	return;
}
var prev=	$("#"+ids).prev().attr("id");
	if(ids&&ids!='') {
		  pop_text_open("blue",'确认要删除该付款款项类型及该类型下面的所有类型吗？',function(){
				$.ajax({
					url:serviceUrl+"sys/base/payType/deletePayType/"+ids,
					type:'DELETE',
					dataType:'JSON',
					success:function (resultData ) {
						if (resultData&&resultData.success) {
							rowDataNow={id:prev};
							$('#list2').jqGrid().trigger("reloadGrid");
							pop_tip_open("green","删除成功");
						}else{
							pop_tip_open("red",resultData.msg);
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						$.xljUtils.getError(jqXHR.status);
			        }
				});
		  },function(){
			  return;
		  });	
	}
}



/**
 * author:liuf
 * describe:修改状态 启用禁用 (当节点禁用时候  其子节点 以及所有孙子节点都禁用  当节点启用时 其父节点也相应的启用)
 * param: e(1是启用 0是禁用)
 */
function  updateStatus(e){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");

	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
	if(!rowid) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
	var  dataStatus="";
	if(rowData.status=="启用"){
		dataStatus=1;
	}else if(rowData.status=="禁用"){
		dataStatus=0;
	}
	if(e==dataStatus){
		return;
	}else{
		var isChildren = false;
		if(e==1&&rowData.isLeaf=="false") {//启用
			$.xljUtils.confirm("blue", "是否同时启用所有下级节点", function () {
				isChildren = true;
			}, function () {
				isChildren = false;
			}, "启用", function () {
				$.ajax({
					url: serviceUrl + "sys/base/payType/updateStatus/" + rowid,
					type: 'PUT',
					dataType: 'JSON',
					data:JSON.stringify({'id':rowid,'isChildren':isChildren}),
					async: false,
					contentType: "application/json",
					success: function (resultData) {
						if (resultData && resultData.success) {
							$('#list2').jqGrid().trigger("reloadGrid");
							pop_tip_open("green", "修改状态成功");
						} else {
							pop_tip_open("red", resultData.msg);
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						$.xljUtils.getError(jqXHR.status);
					}
				});
			});
		}else{
			$.ajax({
				url: serviceUrl + "sys/base/payType/updateStatus/" + rowid,
				type: 'PUT',
				dataType: 'JSON',
				async: false,
				data:JSON.stringify({'id':rowid,'isChildren':isChildren}),
				contentType: "application/json",
				success: function (resultData) {
					if (resultData && resultData.success) {
						$('#list2').jqGrid().trigger("reloadGrid");
						pop_tip_open("green", "修改状态成功");
					} else {
						pop_tip_open("red", resultData.msg);
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					$.xljUtils.getError(jqXHR.status);
				}
			});
		}
	}
}


/**
 * author:liuf
 * describe:跳转添加页面  其中选中一行后 添加的新数据为该节点的子节点  不选 默认为根目录
 * param: null
 */
function toAdd(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
	var level=rowData.level;
	if(level=="1"){
		window.open("payType_edit.html?type=add&parentId="+rowid);
	}else{
		window.open("payType_edit.html?type=add");
	}
}


/**
 * author:liuf
 * describe:跳转修改页面
 * param: null
 */
function toupdate(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	if(!rowid) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
	window.open("payType_edit.html?type=edit&id="+rowid);
}

function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}
function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	 rowDataNow={id:id};
	 $('#list2').jqGrid().trigger("reloadGrid");
}