var rowData;//当前选中数据
var rowDataBefore;
$(function() {
	 
	$.xljUtils.customValidate();//表单初始验证
	getCompanyGrid();
	$('#companyCompare').jqGrid().setGridHeight($(window).height()-220);
	/*$.xljUtils.resizeNestedGrid();*/
	$("#companyCompareSave").on('click', function() {
		$("#companyCompareForm").submit();
	});

	$('#companyName,#selectCompanyName').on('click', function() {
		var urlBody = "sys/org/orgnazation/queryListCompanyTree";
		var urlAll = hostUrl + urlBody;
		var dataPost = {
			menuDelFlag : "0",
			menuStatus : "1",
			appId : $('#appId').val()
		}
		$(document.body).data($(this).attr('id'), '');
		$(this).xljSingleSelector({
			title : '选择公司名称',//选择器标题，默认是'选择组织机构'
			selectorType : 'company',//选择器类型，默认是组织机构选择器
			immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
			treeUrl : urlAll,
			treeParam : dataPost,//生成zTree树的参数
			targetId : 'companyId',//选择的数据的ID存储input域
			targetName : 'companyName',//选择的数据的Name存储input域
			ajaxType : 'POST', //ajax的type 默认为post
			//saveCallback:menuCallback,
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
			},
			saveCallback:function(selectData,ele){
				$("#companyCompareForm").find("input[name='companyName']").focus();
				var companyId=selectData.id;
				getBrachData(companyId);
			}
		});
	});
	$('#paymentOrganName,#selectPaymentOrganName').on('click', function() {
		var urlBody = "sys/base/baseCorporation/getPaymentOrganTree";
		var urlAll = hostUrl + urlBody;
		var dataPost = {
			menuDelFlag : "0",
			menuStatus : "1",
			appId : $('#appId').val()
		}
		$(document.body).data($(this).attr('id'), '');
		$(this).xljSingleSelector({
			title : '选择付款单位',//选择器标题，默认是'选择组织机构'
			selectorType : 'paymentOrgan',//选择器类型，默认是组织机构选择器
			immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
			treeUrl : urlAll,
			treeParam : dataPost,//生成zTree树的参数
			targetId : 'paymentOrganId',//选择的数据的ID存储input域
			targetName : 'paymentOrganName',//选择的数据的Name存储input域
			ajaxType : 'POST', //ajax的type 默认为post
			//saveCallback:menuCallback,
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
});
function getBrachData(id){
	 $("#projectBranchId").empty();
		var data={
	    		   "companyIds":id
	       }
		  $.ajax({
	          type:'POST',
	          url:hostUrl+'sys/org/orgnazation/queryBrachByCompanyId',
	          dataType:'json',
	          contentType:'application/json',
	          async:false,
	          data:JSON.stringify(data),
	          success: function(json) {
	        	  if(json.success){
	        		var  resultData=json.result;
	        		   for(var o in resultData){
	        			  if(resultData[o].status=='1'){
	        				  $("#projectBranchId").append( "<option value="+resultData[o].id+" selected='selected'>"+resultData[o].prefixName+"</option>");
	        			  }
	        		   }
	        	  }else{
	        			pop_tip_open("red",json.msg);
	        	  }
	          },
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        }
	      });  
}
function getCompanyGrid() {
	var accountSetId = $("#selectCompany").val();
	 jQuery("#companyCompare").jqGrid(
	            {
	                url: hostUrl+'finance/accountSetCompany/getaccountSetCompanypage'+'?time='+Math.random(),
	                ajaxGridOptions: { contentType: 'application/json' },
	                mtype : "POST",  
	                contentType : "application/json",  
	                datatype : "json", 
	                autowidth:true,
	                rownumbers:true,
	                postData:{accountSetId:accountSetId},
	                jsonReader : {
	                           repeatitems: false
	                },
	                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
	                             {
	             					name : 'id',
	             					label : 'id',
	             					hidden : true,
	             					align : "center"
	             				}, {
	             					name : 'companyName',
	             					label : '公司',
	             					align : "center"
	             				}, {
	             					name : 'projectBranchName',
	             					label : '项目分期',
	             					align : "center"
	             				}, {
	             					name : 'paymentOrganName',
	             					label : '付款单位(公司法人)',
	             					align : "center"
	             				} 
	                ],
	                rowNum : 20,//一页显示多少条
	                rowList : [ 20, 50, 100,200 ],//可供用户选择一页显示多少条
	                pager : '#companyComparepager',//表格页脚的占位符(一般是div)的id
	                ondblClickRow:function(rowid){
	                	editCompanyCompare();
	                },
	                onCellSelect: function(){
	                	if(rowDataBefore!=null&&rowDataBefore!='undefined'){
	                		//重新选择行时清除上一次选中行的样式
	                		$('#companyCompare'+'#'+rowDataBefore.id).find("td").removeClass("ui-state-highlight"); 
	                	}
	                },
	                onSelectRow: function () {
	                	var rowId=$('#companyCompare').jqGrid("getGridParam","selrow");
	        		      rowData = $('#companyCompare').jqGrid('getRowData',rowId);
	                },
	                viewrecords : true,
	                loadError:function(jqXHR, textStatus, errorThrown){
	             	   $.xljUtils.getError(jqXHR.status);
	                },
	                gridComplete:function(){
	                	 $.xljUtils.addGridScroll();
					//	$.xljUtils.gridResizeFn();
						rowDataBefore = rowData;
	                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
	                    	//添加回显选中行样式
	                    	$('#companyCompare').setSelection(rowDataBefore.id,true);
	                    	$('#companyCompare'+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
	                    }
	                
	                 }
	            });
}

function empty(obj) {
	$(obj).prev().val("");
	$(obj).prev().prev().val("");
}

function saveCompanyCompare() {
	var accountSetId = $("#selectCompany").val();
	var companyCompareArr = $("#companyCompareForm").serializeArray();
	var companyCompareDto = {};
	for ( var o in companyCompareArr) {
		companyCompareDto[companyCompareArr[o].name] = companyCompareArr[o].value;
	}
	companyCompareDto.delflag = 0;
	if (!companyCompareDto.id) {
		companyCompareDto.id = getuuid();
		companyCompareDto.accountSetId = accountSetId;
		companyCompareDto.projectBranchName=$("#projectBranchId").find("option:selected").text();
		$.ajax({
			url : hostUrl + "finance/accountSetCompany/save",
			data : JSON.stringify(companyCompareDto),
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			success : function(resultData) {
				if (resultData) {
					var successFlag = resultData.success;
					var result = resultData.result;
					var msg = resultData.msg;
					if (successFlag) {
						$("#companyCompareForm")[0].reset();
						$("#projectBranchId").empty();
						$("#addCompanyContrast").modal("hide");
						$('#companyCompare').jqGrid().trigger("reloadGrid");
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
			url : hostUrl + "finance/accountSetCompany/update/"
					+ companyCompareDto.id,
			data : JSON.stringify(companyCompareDto),
			type : 'put',
			contentType : 'application/json',
			dataType : 'JSON',
			success : function(resultData) {
				if (resultData) {
					var successFlag = resultData.success;
					var result = resultData.result;
					var msg = resultData.msg;
					if (successFlag) {
						$("#companyCompareForm")[0].reset();
						$("#projectBranchId").empty();
						$("#addCompanyContrast").modal("hide");
						$('#companyCompare').jqGrid().trigger("reloadGrid");
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
function delCompanyCompare() {
	var id = $('#companyCompare').jqGrid('getGridParam', 'selrow');
	if (!id) {
		pop_tip_open("blue", "请选择要删除的行！");
		return;
	}
	pop_text_open("blue", '确认要删除这条数据吗？', function() {
		$.ajax({
			url : hostUrl + "finance/accountSetCompany/deletePseudo/" + id,
			type : 'DELETE',
			dataType : 'JSON',
			success : function(resultData) {
				if (resultData && resultData.success) {
					$('#companyCompare').jqGrid().trigger("reloadGrid");
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

function editCompanyCompare() {
	$("#companyCompareForm").find("td").each(function(i){
		   $(this).removeClass("has-error");	
		   $(this).find("label").remove();
		});
	var id = $('#companyCompare').jqGrid('getGridParam', 'selrow');
	if (!id) {
		pop_tip_open("blue", "请选择要编辑的行！");
		return;
	}
	$("#addCompanyContrast").modal("show");
	$.ajax({
		type : 'get',
		url : hostUrl + 'finance/accountSetCompany/get/' + id + '?time='
				+ Math.random(),
		success : function(data) {
			if (data.success) {
				var result = data.result;
				$("input[name='id']").val(result.id);
				$("input[name='companyId']").val(result.companyId);
				getBrachData(result.companyId);
				$("input[name='companyName']").val(result.companyName);
				$("input[name='projectBranchId']").val(result.projectBranchId);
				$("input[name='projectBranchName']").val(
						result.projectBranchName);
				$("input[name='paymentOrganId']").val(result.paymentOrganId);
				$("input[name='paymentOrganName']")
						.val(result.paymentOrganName);
				$("input[name='concurrencyVersion']").val(
						result.concurrencyVersion);
			}
		}
	});
}
function addCompanyCompare(){
	$("#addCompanyContrast").modal("show");
	$("#companyCompareForm").find("td").each(function(i){
	   $(this).removeClass("has-error");	
	   $(this).find("label").remove();
	});
	$("#companyCompareForm")[0].reset();
	$("#projectBranchId").empty();
}