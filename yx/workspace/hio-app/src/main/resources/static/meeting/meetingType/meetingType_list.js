var rowDataCurr;//当前选中数据
var rowDataBefore;
var ProjectTypeAllData=null;
var descData=null;
$(function(){
	//数据权限按钮
	$.xljUtils.btnPowerOperation("OA",$.xljUtils.getUrlParam("btnMenuCode"));
	//页面加载完成之后执行
    pageInit();

    $.xljUtils.resizeNestedGrid();

    $("#pName").keypress(function(e){
        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13){
        	searchProjectDate();
        }
 	});
});  
/**
 * 
 */
function pageInit(){
	getProjectTypeData();
}

/**
 * author:liuf
 * describe: 过滤查询
 * param: null
 */

function searchProjectDate(){

	$("#list2").jqGrid().trigger("reloadGrid");
}
/**
 * author:liuf
 * describe: 加载页面数据
 * param: null
 */

function getProjectTypeData(){
	//var data=null;
	// jQuery("#list2").jqGrid('clearGridData');
	   jQuery("#list2").jqGrid({
		    url: serviceUrl+'oa/meeting/meetingType/getTypetree',
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
            	   var name=$("#name").val();// 获取名称
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
						  for(var o in arr){
							  if(rowDataCurr&&rowDataCurr.prefixId.indexOf(arr[o].id)>-1){
								  arr[o].expanded=true;
							  }
						  }
						  return arr;
            		  }
            		   
            		   
            	 }  
               },
               repeatitems : false  
           },
           colModel : [ 
               {name : 'id',label : 'id',hidden:true,align : "center"},
               {name : 'name',label : '类型名称',align : "center",editable: true,cellattr: addCellAttr},
               {name : 'code',label : '编码',align : "center"},
               {name : 'status',label : '状态',align : "center",formatter:function(status){
               	if(status=="0"){
               		return "禁用";
               	}else if(status=="1"){
               		return "启用";
               	}else{
               		return "";
               	}
               },cellattr: addCellAttr},
               {name : 'sort',label : '排序',hidden:true,align : "center"},
               {name : 'remarks',label : '备注',align : "center"},
               {name : 'flowInstanceName',label : '会议管理模板',align : "center"},
               {name : 'hyjyFlowInstanceName',label : '会议纪要模板',align : "center"},
               {name : 'expanded',label : '是否展开',hidden:true,align : "center"},
			   {name : 'prefixId',label : 'ids',hidden:true,align : "center"}
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
            		//重新选择行时清除上一次选中行的样式
            		$('#list2'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
            	}
           },
           onSelectRow: function () {
           	var rowId=$('#list2').jqGrid("getGridParam","selrow");
           	rowDataCurr = $('#list2').jqGrid('getRowData',rowId);
           },
           pager : '#pager2',
           loadError:function(jqXHR, textStatus, errorThrown){
        	   $.xljUtils.getError(jqXHR.status);
           },
           gridComplete:function(){
			   $(".ui-widget-content .ui-state-default").css({"margin-top":"8px"});
        	   $.xljUtils.addGridScroll();
			   $.xljUtils.gridResizeFn();
             var arrdata=jQuery("#list2").jqGrid('getRowData');   
       /*      for(var o in arrdata){
            	 if(arrdata[o].expanded=="false"){
            		 $("#"+arrdata[o].id).hide();
            	 }
             }*/
             //$.each(arrdata, function (i, val) { $('#list2').treegrid('collapseAll', arrdata[i].id)})
             rowDataBefore = rowDataCurr;
             if(rowDataBefore!=null&&rowDataBefore!='undefined'){
            	 //添加回显选中行样式
            	 $('#list2').setSelection(rowDataBefore.id,true);
            	 $("#"+rowDataBefore.id).addClass("ui-state-highlight"); 
             }
           }
       });
	   

}

/**
 * 绑定流程
 */
function bindFlow(){
	//获取选择的类别
	var ids=jQuery("#list2").jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择要绑定的行");
		return false;
	}else{
		$(this).xljSingleSelector({
			title:'选择流程模板',//选择器标题，默认是'选择组织机构'
            selectorType:'post',//选择器类型，默认是组织机构选择器
            immediatelyShow:true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
            treeUrl:'',
            treeParam:'',//生成zTree树的参数
//            targetId:'resourceId',//选择的数据的ID存储input域
//            targetName:'resourceIdName',//选择的数据的Name存储input域
            ajaxType: 'POST',	//ajax的type 默认为post
            /**
             * 保存回调函数
             * @param selectDatas 已选择的数据json对象
             * @param ele 绑定选择器的对象
             */
            saveCallback:postCallback,
            formatTreeJson:function(data){return data;},
            treeSettings:{}
		});
	}
}



/**
 * 保存会议类别关联的流程
 * @param data
 */
function postCallback(data) {
	//获取选择的岗位
	var ids=jQuery("#list2").jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择要绑定的行");
	}else{
		var flowInstanceId='';
		var flowInstanceName='';
		if(data!=null&&data!=''){
			flowInstanceId=data.id;
			flowInstanceName=data.name;
		}
		var list=[];
		var updatedata ={
				id:ids,
				flowInstanceId:flowInstanceId,
				flowInstanceName:flowInstanceName
		};
		list[0]=updatedata;
		var jdata={
				list:list
		};
		var uBody = "oa/meeting/meetingType/updateBatchFlow";
	    var uAll = serviceUrl + uBody;
		$.ajax({
			type:'PUT',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(jdata),
	        success: function(json) {
	            if(json.success == true){
	            	reloadGrid(ids);
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	            
	        },error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","设置流程模板请求失败");
	        }
	    });
	}
}



/**
 * 绑定流程
 */
function updateFlow(){
	var ids= jQuery("#list2").jqGrid('getGridParam', 'selarrrow');
	if(ids==null ||ids.length==0){
		pop_tip_open("blue","请选择要绑定的行!");
		return false;
	}
	jQuery(ids).each(function(){
		jQuery("#list2").jqGrid('editRow', this);
	});
	$("#listButton").hide();
	$("#saveButton").show();
}

/**
 * 取消编辑
 */
var officeInfoFrid=jQuery("#officeInfoList");
function cancel() {
	 jQuery("#list2").trigger('reloadGrid');
	 $("#listButton").show();
    $("#saveButton").hide();
}

/**
 * 保存编辑
 */
function addRowData() {
//	var officeInfoFrid=jQuery("#officeInfoList");
	var ids= jQuery("#list2").jqGrid('getGridParam', 'selarrrow');
	var jsonDataS=[];
	var jData={};
	var i=0;
	 var reg =/^\d+$/;  
	 var reg1=/^[0-9]+([.]{1}[0-9]+){0,1}$/;
	jQuery(ids).each(function(){
		jQuery("#list2").jqGrid('saveRow', this);
		var data=jQuery("#list2").jqGrid('getRowData',this);
		if(data.buyPrice!="" && data.inCount!=""&& (reg.test(data.inCount)) &&(reg1.test(data.buyPrice))){
			jsonDataS[i]={
					id:data.id,
					buyPrice:data.buyPrice,
					inCount:data.inCount
			};
			i++;
		}
	});
	if(jsonDataS.length <=0){
		jQuery(ids).each(function(){
			jQuery("#officeInfoList").jqGrid('editRow', this);
		});
		pop_tip_open("blue","没有需要入库的档案或数据格式不正确");
		//reloadGrid();
		return false;
	}
	var jd={
			params:jsonDataS
	}
	$.ajax({
		url : serviceUrl + "oa/office/officeInfo/updateCount",
		type : 'PUT',
		dataType : 'JSON',
		contentType : "application/json",
		data : JSON.stringify(jd),
		success : function(resultData) {
			if (resultData.success) {
				reloadGrid();
			} else {
				pop_tip_open("red", resultData.msg);
			}
		},
	});
	$("#listButton").show();
	$("#saveButton").hide();
}

/**
 * author:liuf
 * describe: 删除产品类型
 * param: null
 */
function deleteProjectType(){
var ids=jQuery("#list2").jqGrid('getGridParam',"selrow");
if(!ids) {
	pop_tip_open("blue","请选择一条数据");
	return;
}
var prev=	$("#"+ids).prev().attr("id");
	if(ids&&ids!='') {
		  pop_text_open("blue",'确认要删除该会议类型及该类型下面的所有类型吗？',function(){
				$.ajax({
					url:serviceUrl+"oa/meeting/meetingType/deleteBatch/"+ids,
					type:'DELETE',
					dataType:'JSON',
					success:function (resultData ) {
						if (resultData&&resultData.success) {
							rowDataCurr=$("#list2").jqGrid("getRowData",prev);
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
 * 如果父级启用的时候，给出提示框，子级是否要启用
 * @param e
 */
function  updateChildStatusByParentId(e){
	var ids=jQuery("#list2").jqGrid('getGridParam',"selrow");
	if(!ids) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
	var rowData = $("#list2").getRowData(ids);
	rowDataCurr = rowData;
	//首先要确认该会议类别是否有子级
	var paramData;
    paramData = JSON.stringify({'parentId':ids,'all':'all'});
		$.ajax({
			type:'post',
			url:serviceUrl+'oa/meeting/meetingType/queryList'+"?time="+Math.random(),
			dataType:'json',
			contentType:'application/json',
			data:paramData,
			async: false,
			success: function(data) {
				if(data.success){
					if(data.result){
						var childs =data.result;
						if(childs.length > 0){
							//如果有子级，则要判断，是否子级启用
							if(ids&&ids!='') {
								  pop_text_open("blue",'确认要启用该子级下面的会议类别吗吗？',function(){
									  //如果是，则要启用下面的子级会议类别
									  $.ajax({
											url:serviceUrl+"oa/meeting/meetingType/updateChildStatusByParentId/"+ids,
											type:'PUT',
											dataType:'JSON',
											async:false,
											contentType:"application/json",
											success:function (resultData) {
												if (resultData&&resultData.success) {
													$('#list2').jqGrid().trigger("reloadGrid");
													pop_tip_open("green","修改状态成功");
												}else{
													pop_tip_open("red",resultData.msg);
												}
											},
											error: function (jqXHR, textStatus, errorThrown) {
												$.xljUtils.getError(jqXHR.status);
									        }
										});
								  },function(){
									  //如果否，则只启用当前的会议类别
									  updateStatus(e);
								  });	
							}
						}else{
							//如果没有子级，则直接启用当前会议类别
							updateStatus(e);
						}
					}
				}else{
					$.xljUtils.tip("red",data.msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			}
		});
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
	$.ajax({
		url:serviceUrl+"oa/meeting/meetingType/updateStatus/"+rowid,
		type:'PUT',
		dataType:'JSON',
		async:false,
		contentType:"application/json",
		success:function (resultData) {
			if (resultData&&resultData.success) {
				$('#list2').jqGrid().trigger("reloadGrid");
				pop_tip_open("green","修改状态成功");
			}else{
				pop_tip_open("red",resultData.msg);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
	}
}


/**
 * author:liuf
 * describe:跳转添加页面  其中选中一行后 添加的新数据为该节点的子节点  不选 默认为根目录
 * param: null
 */
function toAdd(){
	/*var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
	var parentIdCode="";
	var parentsCode=getcodeValue(rowid,parentIdCode)
	$("#parentId").val(rowData.parentId);
	$("#parentCode").val(parentsCode);
	$("#parentName").val(rowData.name);
	alert($("#parentName").val());*/
	//var name=rowData.name;
	var ids=$('#list2').jqGrid('getGridParam','selrow');
	if(ids) {
		var rowData = $("#list2").getRowData(ids);
		rowDataCurr.prefixId = rowData.prefixId;
	}
	window.open("meetingType_edit.html?type=add");
	
}
function getParamsToAdd(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);
	var parentIdCode="";
	var parentsCode=getcodeValue(rowid,parentIdCode);
	var data={};
	data.name=rowData.name;
	data.parentId=rowid;
	data.parentsCode=parentsCode;
	return data;
}
function getParamsToUpdate(){
	var rowid = jQuery("#list2").jqGrid('getGridParam',"selrow");
	var rowDataOnly = jQuery("#list2").jqGrid('getRowData',rowid);
	var code=rowDataOnly.code;//  父节点代码
	var parentId=rowDataOnly.parentId;//  父节点id
	var rowData = jQuery("#list2").jqGrid('getRowData',parentId);
	var addcode="";
	var parentsCode=getcodeValue(parentId,addcode);
     parentsCode=parentsCode+"."+code;
	var data={};
	data.name=rowData.name;
	data.parentId=rowData.parentId;
	data.parentsCode=parentsCode;
	return data;
}
/**
 * author:wangw
 * describe:拼接参数 添加修改页面上的  所有的父级代码 自己体会吧 点到为止
 * param: rowid,parentIdCode 
 */
function getcodeValue(rowid,parentIdCode){
	var rowData = jQuery("#list2").jqGrid('getRowData',rowid);  
	var code=rowData.code;
	var parentId=rowData.parentId;
	if(!parentIdCode){
		parentIdCode=code;
	}else{
		parentIdCode=code+"."+parentIdCode;
	}
	
	if(parentId&&parentId!=''&&parentId!=null){
		parentIdCode = getcodeValue(parentId,parentIdCode);
	}
	return parentIdCode;
}
/**
 * author:wangw
 * describe:跳转修改页面
 * param: null
 */
function toupdate(){
	var rowid=jQuery("#list2").jqGrid('getGridParam',"selrow");
	if(!rowid) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
	var rowData = $("#list2").getRowData(rowid);
	rowDataCurr = rowData;
	window.open("meetingType_edit.html?type=edit&id="+rowid);
}

function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}
function reloadGrid(id){
	 pop_tip_open("green","数据操作成功！");
	if(null!=id&&""!=id&&rowDataCurr){
		rowDataCurr.id = id;
	}
	 $('#list2').jqGrid().trigger("reloadGrid");
}