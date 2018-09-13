var rowCaptionData;//当前选中数据
var rowCaptionDataBefore;
var preId;
var delTreeId;
var idForList="";
$(function() {
	$.xljUtils.customValidate();//表单初始验证
	getAccountCaptionGrid();
	$('#accountCaption').jqGrid().setGridHeight($(window).height()-195);
/*	$.xljUtils.resizeNestedGrid();*/
	$("#saveAccountCaption").on('click', function() {
		$("#accountCaptionForm").submit();
	});
	$('#parentName,#selectCaptionName').on('click', function() {
		var id=$("input[name='id']").val();
		var accountSetId=$("#selectCompany").val();
		var urlBody = "finance/accountCaption/queryCaptionList";
		var urlAll = hostUrl + urlBody;
		var dataPost = {
			menuDelFlag : "0",
			menuStatus : "1",
			appId : $('#appId').val(),
			prefixId:preId,
			delTreeId:id,
			accountSetId:accountSetId
		}
		$(document.body).data($(this).attr('id'), '');
		$(this).xljSingleSelector({
			title : '选择上级科目',//选择器标题，默认是'选择组织机构'
			selectorType : 'captionName',//选择器类型，默认是组织机构选择器
			immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
			treeUrl : urlAll,
			treeParam : dataPost,//生成zTree树的参数
			targetId : 'parentId',//选择的数据的ID存储input域
			targetName : 'parentName',//选择的数据的Name存储input域
			ajaxType : 'POST', //ajax的type 默认为post
			saveCallback:accountCallback,
			formatTreeJson : function(data) {
				return data;
			},
			treeSettings : {
				data : {
					simpleData : {
						enable : true,
						idKey : 'id',
						pIdKey : 'parentId'
					}
				}
			}
		});
	});
	$('#assNames,#selectAssNames').on('click', function() {
		
		$("#myModal").modal("show");
		$("#myModal .modal-dialog").height($(window).height()*0.8);
		$("#myModal .modal-dialog .ztree-box").height($("#myModal .modal-dialog").height()-130);
		$("#myModal .modal-dialog .tableStyle").height($("#myModal .modal-dialog").height()-130);

		var setting = {
				data: {
					simpleData: {
						enable: true,
						pIdKey: 'parentId'
						
					},
					key: {}
				},
				callback: {
					beforeClick: function (treeId, treeNode, clickFlag) {
						return !treeNode.isParent;
					},
					onClick: appendDataToRight,
					onCollapse: function () {
						$.xljUtils.treeResizeFn();
					},
					onExpand: function () {
						$.xljUtils.treeResizeFn();
					}
				}

			};
		var accountSetId=$("#selectCompany").val();
		var data={accountSetId:accountSetId};
		$.ajax({
			type: "post",
			url: hostUrl + "finance/assType/queryAssType",
			dataType: "json",
			data:JSON.stringify(data),
			contentType: 'application/json',
			success: function (typeNodes) {
				var zNodes = typeNodes.result;
				var inputVal=$("#corname").val();
				if(inputVal){
					var dataArr=new Array();
				  for(var o in zNodes){
					  if((zNodes[o].assName).indexOf(inputVal)>-1){
						  dataArr.push(zNodes[o]);
					  }
				  }
					zNodes=	dataArr;
				}
				recursionArray(zNodes);
				var treeObj = $.fn.zTree.init($("#_zTree"), setting, zNodes);
				treeObj.expandAll(true);
				//
				$.xljUtils.addTreeScroll();
				$.xljUtils.treeResizeFn();
				//默认加载第一个菜单的列表数据
				var nodesId=idForList.split(",");
				
				for(var o in nodesId){
					for(var j in zNodes){
						if(zNodes[j].id==nodesId[o]){
							var row=$("<tr style='text-align:center'>" +
									"<td style='width:5%;'></td>" +
									"<td  style='display:none'>"+zNodes[j].id+"</td>" +
									"<td style='width:19%;'>"+zNodes[j].assName+"</td>" +
									"<td style='width:19%;'>"+zNodes[j].bizObjectName+"</td>" +
									"<td style='width:19%;'>"+zNodes[j].type+"</td>" +
									"<td style='width:19%;'>"+zNodes[j].synchro+"</td>" +
									"<td style='width:19%;'>"+zNodes[j].isDirectCode+"</td>" +
									"</tr>");
								row.on("dblclick",function(){
								$(this).remove();
								idForList=idForList.replace(treeNode.id,"");
							});
							$("#accountCaptionList").append(row);
							resetModelNum();
						}
					}
				};
			},
			complete:function(){
				//$.xljUtils.addTreeScroll();
				//	$.xljUtils.treeResizeFn();
			}
		});
	});

	$('#bizItemNames,#SelectbizItemNames').on('click', function() {
		var appCode= $("#selectCompany").find("option:selected").attr("appCode");
		var  appId= $('#appId').val();
		var  prefixId=$("#parentId").val();
		var accountSetId=$("#selectCompany").val();
		var urlBody = "finance/sysBizItem/getSysBizItemList";
		var urlAll = hostUrl + urlBody;
		var dataPost = {
				menuDelFlag : "0",
				menuStatus : "1",
				appId :appId,
				sysName:appCode,
				prefixId:prefixId,
				accountSetId:accountSetId
		}
		$(document.body).data($(this).attr('id'), '');
		$(this).xljSingleSelectorReset({
			title : '选择科目对照项',//选择器标题，默认是'选择组织机构'
			selectorType : 'company',//选择器类型，默认是组织机构选择器
			immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
			treeUrl : urlAll,
			treeParam : dataPost,//生成zTree树的参数
			targetId : 'bizItemIds',//选择的数据的ID存储input域
			targetName : 'bizItemNames',//选择的数据的Name存储input域
			ajaxType : 'POST', //ajax的type 默认为post
			saveCallback:menuCallback,
			treeSettings : {
				data : {
					simpleData : {
						enable : true,
						idKey : 'id',
						pIdKey : 'parentId'
					}
				},
				check: {
					enable: true,
					chkStyle: "checkbox",
					chkboxType: { "Y": "ps", "N": "ps" }
                }
			}
		});
	});

})
/**
 * 科目回调函数
 * @param data
 */
function menuCallback(treeNodes,e) {
	var treeIds = "";
	var treeNames = "";
	for(var i=0;i<treeNodes.length;i++){
		var isParent = treeNodes[i].isParent;
		if(!isParent){
			treeIds += treeNodes[i].code+",";
			treeNames += treeNodes[i].name+",";
		}
	}
	$("#accountCaptionForm").find("input[id='bizItemIds']").val(treeIds);
	$("#accountCaptionForm").find("input[id='bizItemNames']").val(treeNames);
}

function recursionArray(arr) {
    for(var i in arr) {
    	arr[i].iconSkin = "diy-system";
    }
};
function accountCallback(treeNode,e) {
	var flowId = $("#accountCaptionForm").find("input[name='id']").val();
	if(treeNode.id == flowId){
		pop_tip_open("blue","上级组织不能选择自己");
		$("#accountCaptionForm").find("input[id='parentId']").val('');
		$("#accountCaptionForm").find("input[id='parentName']").val('');
	}
};
function appendDataToRight(e,treeId,treeNode){
	var row=$("<tr style='text-align:center'>" +
			"<td style='width:5%;'></td>" +
			"<td  style='display:none'>"+treeNode.id+"</td>" +
			"<td style='width:19%;'>"+treeNode.assName+"</td>" +
			"<td style='width:19%;'>"+treeNode.bizObjectName+"</td>" +
			"<td style='width:19%;'>"+treeNode.type+"</td>" +
			"<td style='width:19%;'>"+treeNode.synchro+"</td>" +
			"<td style='width:19%;'>"+treeNode.isDirectCode+"</td>" +
			"</tr>");
	row.on("dblclick",function(){
		$(this).remove();
		idForList=idForList.replace(treeNode.id,"");
	});
	if(idForList.indexOf(treeNode.id)<0){
		$("#accountCaptionList").append(row);
	}
	idForList+=treeNode.id;
	resetModelNum();
}
function  resetModelNum(){
	$("#accountCaptionList").find("tr").each(function(i){
		if(i>-1){
			$(this).find("td").eq(0).html(i+1);
		}
	});
}
function getAccountCaptionGrid() {
 	var accountSetId = $("#selectCompany").val();
	jQuery("#accountCaption").jqGrid(
			{
				url : hostUrl
						+ 'finance/accountCaption/getaccountCaptionTree',
				ajaxGridOptions : {
					contentType : 'application/json'
				},
				mtype : "POST",
				contentType : "application/json",
		        treeGrid: true,
		        treeGridModel: "adjacency", 
		        ExpandColumn:"code",
		        datatype : "json", 
		        subGrid:true,
		        autowidth:true,
				postData:{accountSetId:accountSetId==null?"null":accountSetId},
				jsonReader : {
					root:"result",
					repeatitems : false
				},
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				{
					name : 'id',
					label : 'id',
					hidden : true,
					align : "center"
				},{
					name : 'prefixId',
					label : 'prefixId',
					hidden : true,
					align : "center"
				},{
					name : 'code',
					label : '会计科目编码',
					align : "center"
				}, {
					name : 'name',
					label : '会计科目名称',
					align : "center"
				}, {
					name : 'assNames',
					label : '辅助核算',
					align : "center"
				}, {
					name : 'bizItemNames',
					label : '业务系统数据',
					align : "center"
				}  ],
				rowNum : -1,//一页显示多少条
			    treeReader:{
	           		   level_field: "level",
	           		   parent_id_field: "parentId",
	           		   leaf_field: "isLeaf",
	           		   expanded_field: "expanded"
	           		},
	           	onCellSelect:function(){
	            	 	if(rowCaptionDataBefore!=null&&rowCaptionDataBefore!='undefined'){
	                		//重新选择行时清除上一次选中行的样式
	                		$('#accountCaption'+'#'+rowCaptionDataBefore.id).find("td").removeClass("ui-state-highlight"); 
	                	}
	            },
	            onSelectRow: function () {
	               	var rowId=$('#accountCaption').jqGrid("getGridParam","selrow");
	               	rowCaptionData = $('#accountCaption').jqGrid('getRowData',rowId);
	            },
	            loadError:function(jqXHR, textStatus, errorThrown){
	            	   $.xljUtils.getError(jqXHR.status);
	            },
				gridComplete : function() {
					   $.xljUtils.addGridScroll();
					//   $.xljUtils.gridResizeFn();
		             if(rowCaptionDataBefore!=null&&rowCaptionDataBefore!='undefined'){
		            	 //添加回显选中行样式
		            	 $('#accountCaption').setSelection(rowCaptionDataBefore.id,true);
		            	 $("#"+rowCaptionDataBefore.id).addClass("ui-state-highlight"); 
		             }
		     	
				}

			});
}
//打开新增
function addAccountCaption(){
	$("#accountCaptionForm").find("td").each(function(i){
		   $(this).removeClass("has-error");	
		   $(this).find("label").remove();
		});
	//var rowid=jQuery("#accountCaption").jqGrid('getGridParam',"selrow");
	$("#accountCaptionForm")[0].reset();
	$("#accountCaptionList").html("");
	if(rowCaptionData){
		var rowid=rowCaptionData.id;
		var rowData = jQuery("#accountCaption").jqGrid('getRowData',rowid);
		var prefixId=rowData.prefixId;
		var rName= rowData.name;
		$("#parentId").val(rowid);
		$("#parentName").val(rName);
	}
	$("#addAccountSubject").modal("show");
}
function empty(obj) {
	$(obj).prev().val("");
	$(obj).prev().prev().val("");
}

function saveAccountCaption() {
	var accountSetId = $("#selectCompany").val();
	var accountCaptionArr = $("#accountCaptionForm").serializeArray();
	var accountCaptionDto = {};
	for ( var o in accountCaptionArr) {
		accountCaptionDto[accountCaptionArr[o].name] = accountCaptionArr[o].value;
	}
	delete accountCaptionDto.parentName;
	accountCaptionDto.delflag = 0;
	if (!accountCaptionDto.id) {
		accountCaptionDto.id = getuuid();
		accountCaptionDto.accountSetId=accountSetId;
		$.ajax({
			url : hostUrl + "finance/accountCaption/save",
			data : JSON.stringify(accountCaptionDto),
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			success : function(resultData) {
				if (resultData) {
					var successFlag = resultData.success;
					var result = resultData.result;
					var msg = resultData.msg;
					if (successFlag) {
						$("#accountCaptionForm")[0].reset();
						$("#addAccountSubject").modal("hide");
						 rowCaptionData={id:accountCaptionDto.id};
						$('#accountCaption').jqGrid().trigger("reloadGrid");
						setTimeout(function () {
						       $('#accountCaption').jqGrid('setSelection',accountCaptionDto.parentId);
						    },1500);
						preId="";
						idForList="";
					} else {
						pop_tip_open("red", resultData.msg);
					}
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			},
			complete : function() {
			}
		});
	} else {
		$.ajax({
			url : hostUrl + "finance/accountCaption/update/"
					+ accountCaptionDto.id,
			data : JSON.stringify(accountCaptionDto),
			type : 'put',
			contentType : 'application/json',
			dataType : 'JSON',
			success : function(resultData) {
				if (resultData) {
					var successFlag = resultData.success;
					var result = resultData.result;
					var msg = resultData.msg;
					if (successFlag) {
						 rowCaptionData={id:accountCaptionDto.id};
						$('#accountCaption').jqGrid().trigger("reloadGrid");
						  setTimeout(function () {
						       $('#accountCaption').jqGrid('setSelection',accountCaptionDto.parentId);
						    },1500);
						$("#accountCaptionForm")[0].reset();
						$("#addAccountSubject").modal("hide");
						preId="";
						idForList="";
					} else {
						pop_tip_open("red", resultData.msg);
					}
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			},
			complete : function() {
			}
		});
	}
}
//=================================
function getuuid() {

	$.ajax({
		beforeSend : function() {
			var guuid = "";
		},
		type : 'get',
		async : false,
		url : hostUrl + 'generator/getGuuid?time=' + Math.random(),
		success : function(data) {
			if (data.success) {
				guuid = data.result;

			} else {
				pop_tip_open("red", data.msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
		},
		complete : function() {
			return guuid;
		}
	});
	return guuid;
}
function delAccountCaption() {
	var id = $('#accountCaption').jqGrid('getGridParam', 'selrow');
	if (!id) {
		pop_tip_open("blue", "请选择要删除的行！");
		return;
	}
	var prvid=$("#"+id).prev().attr("id");
	pop_text_open("blue", '确认要删除这条数据吗？', function() {
		$.ajax({
			url : hostUrl + "finance/accountCaption/deletePseudo/" + id,
			type : 'DELETE',
			dataType : 'JSON',
			success : function(resultData) {
				if (resultData && resultData.success) {
					rowCaptionData = {id:prvid};
					$('#accountCaption').jqGrid().trigger("reloadGrid");
					pop_tip_open("green", "删除成功！");
				} else {
					pop_tip_open("red", resultData.msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			}
		});
	}, function() {
		return;
	});
}
function saveAssType(){
	var idlist='';
	var nameList='';
	$("#accountCaptionList").find("tr").each(function(i){
		idlist+=$(this).find("td").eq(1).text()+",";
		nameList+=$(this).find("td").eq(2).text()+",";
	})
	$("#assIds").val(idlist);
	$("#assNames").val(nameList);
	$("#myModal").modal("hide");
}
function editAccountCaption() {
	$("#accountCaptionForm").find("td").each(function(i){
		   $(this).removeClass("has-error");	
		   $(this).find("label").remove();
		});
	$("#accountCaptionForm")[0].reset();
	$("#accountCaptionList").html("");
	var id = $('#accountCaption').jqGrid('getGridParam', 'selrow');
	if (!id) {
		pop_tip_open("blue", "请选择要编辑的行！");
		return;
	}
	$("#addAccountSubject").modal("show");
	$.ajax({
		type : 'get',
		url : hostUrl + 'finance/accountCaption/get/' + id + '?time='
				+ Math.random(),
		success : function(data) {
			if (data.success) {
				var result = data.result;
				$("input[name='id']").val(result.id);
				$("input[name='concurrencyVersion']").val(
						result.concurrencyVersion);
				$("input[name='name']").val(result.name);
				$("input[name='sort']").val(result.sort);
				$("input[name='code']").val(result.code);
				$("input[name='parentId']").val(result.parentId);
				var rowData = jQuery("#accountCaption").jqGrid('getRowData',result.parentId);
				$("input[name='parentName']").val(rowData.name);
				$("input[name='bizItemIds']").val(result.bizItemIds);
				$("input[name='bizItemNames']").val(result.bizItemNames);
				$("input[name='assIds']").val(result.assIds);
				$("input[name='assNames']").val(result.assNames);
				idForList=result.assIds;
			}
		}
	});
}
