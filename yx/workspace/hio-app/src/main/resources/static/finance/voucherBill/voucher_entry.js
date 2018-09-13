var rowData;//当前选中数据
var rowDataBefore;
var appCode ;
var accountSetId ;
var companyId;
var bl = false; // 凭证生成加载业务单据，false查询，true重新加载
var exportbl = false; // 查询凭证，false查询，true重新加载
var voucherBillId;
var isup = false ;
//数据列的定义
var colModeldata =[];
$(function(){
	voucherBillId = $.xljUtils.getUrlParam('id');
	accountSetId = $.xljUtils.getUrlParam('accountSetId');
	$("#voucherBillId").val(voucherBillId);
	getVoucherBill();
});

function myformatter(date){  
    var y = date.getFullYear();  
    var m = date.getMonth()+1;  
    var d = date.getDate();  
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);  
} 
function getCurrentMonthFirst(date){
 date.setDate(1);
 return date;
}

function getVoucherBill(){
	if(voucherBillId){
		$.ajax({
	        type:'get',
	        url:serviceUrl+'finance/voucherBill/get/'+voucherBillId+'?time='+Math.random(),
	        success: function(data) {
	        	var billData=data.result;
	        	if(billData){
	        		//页面元素赋值
	        		$("#word").html(billData.word);
	        		$("#voucherNo").html(billData.voucherNo);
	        		$("#enterName").html(billData.enterName);
	        		$("#enterDate").html(billData.enterDate);
	        		$("#enterDateId").val(billData.enterDate);
	        		$("#exportDate").html(billData.exportDate);
	        		$("#errorCause").html(billData.errorCause);
	        		var amount = billData.creditAmount.replace(/,/gi,'') - billData.debitAmount.replace(/,/gi,'');
	        		$("#_amount").html(amount);
	        		$("#_debitAmount").html(billData.debitAmount);
	        		$("#_creditAmount").html(billData.creditAmount);
	        		getVoucherEntrys();
	        		getVoucherBillRelation();
	        	}else{
	        		pop_tip_open("red","数据为空！");
	        	}
        	},
       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
    		   pop_tip_open("red","服务异常,请联系管理员！");
            }
		});
	}
}

function getVoucherEntrys(){
	jQuery("#voucherEntryList").jqGrid(
            {
                url:serviceUrl+'finance/voucherBillEntry/queryList',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                postData:{voucherBillId:voucherBillId,delflag:0},
                autowidth:true,
                async: true,
                rownumbers:true,
                jsonReader : {
                	root:"result",
                	repeatitems : false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {name : 'voucherBillId',label : 'voucherBillId',hidden:true,align : "center"},
                    {name : 'captionCode',label : 'captionCode',hidden:true,align : "center"},
                    {name : 'captionId',label : 'captionId',hidden:true,align : "center"},
                    {name : 'assName',label : 'assName',hidden:true,align : "center"},
                    {name : 'summary',label : '摘要',align : "center"},
                    {name : 'captionName',label : '会计科目',align : "center"},
                    {name : 'assCompent',label : '辅助核算',align : "center"},
                    {name : 'cashFlowName',label : '现金流量',align : "center"},
                    {name : 'drmny',label : '借方金额',align : "center"},
                    {name : 'crmny',label : '贷方金额',align : "center"},
                    {name : 'remark',label : '备注',align : "center"},
                ],
                rowNum : -1,//一页显示多少条
                rowList : [ 20, 50,100,200 ],//可供用户选择一页显示多少条
                pager : '',//表格页脚的占位符(一般是div)的id
                
                onSelectRow: function () {
                	var rowId=$('#voucherEntryList').jqGrid("getGridParam","selrow");
      		      	rowData = $('#voucherEntryList').jqGrid('getRowData',rowId);
                },
                loadComplete:function(xhr){
                	
                },
                viewrecords : true,
                loadError:function(jqXHR, textStatus, errorThrown){
             	   $.xljUtils.getError(jqXHR.status);
                },
                /*gridComplete: function () {
                	$(window).resize();
                    $.xljUtils.addGridScroll();
                    //重绘滚动条
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#voucherEntryList').setSelection(my.dataPar.rowDataBefore.id,true);
                    	$('#voucherEntryList '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                },*/
            });
}

function getVoucherBillRelation(){
	jQuery("#voucherBillRelationList").jqGrid(
            {
                url:serviceUrl+'finance/voucherBillRelation/queryList',
                ajaxGridOptions: { contentType: 'application/json' },
                mtype : "POST",  
                contentType : "application/json",  
                datatype : "json", 
                postData:{voucherBillId:voucherBillId},
                autowidth:true,
                async: true,
                rownumbers:true,
                jsonReader : {
                	root:"result",
                	repeatitems : false
                },
                colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',hidden:true,align : "center"},
                    {name : 'url',label : 'url',hidden:true,align : "center"},
                    {name : 'voucherBillId',label : 'voucherBillId',hidden:true,align : "center"},
                    {name : 'bizId',label : '单据编号 ',align : "center"},
                    {name : 'code',label : '名称 ',align : "center"},
                ],
                
                onSelectRow: function (bizId) {
                	//accountSetId=$('#voucherBillRelationList').jqGrid("getGridParam","selrow");
                	var rowId=$('#voucherBillRelationList').jqGrid("getGridParam","selrow");
      		      	rowData = $('#voucherBillRelationList').jqGrid('getRowData',rowId);
                },
                ondblClickRow:function(rowid){
                	window.open(rowData.url+rowData.bizId);
                },
                rowNum : -1,//一页显示多少条
                rowList : [ 20, 50,100,200 ],//可供用户选择一页显示多少条
                pager : '',//表格页脚的占位符(一般是div)的id
                loadComplete:function(xhr){
                	
                },
                viewrecords : true,
                loadError:function(jqXHR, textStatus, errorThrown){
             	   $.xljUtils.getError(jqXHR.status);
                },
                /*gridComplete: function () {
                	$(window).resize();
                    $.xljUtils.addGridScroll();
                    //重绘滚动条
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if(rowDataBefore!=null&&rowDataBefore!='undefined'){
                    	//添加回显选中行样式
                    	$('#voucherBillRelationList').setSelection(my.dataPar.rowDataBefore.id,true);
                    	$('#voucherBillRelationList '+'#'+rowDataBefore.id).find("td").addClass("ui-state-highlight"); 
                    }
                },*/
            });
}

function editVoucherDate() {
	$("#enterDateId").val($("#enterDate").html());
	$("#enterDataLable").addClass("lineH28");
	$.ajax({
        type:'get',
        url:serviceUrl+'finance/voucherBill/get/'+voucherBillId+'?time='+Math.random(),
        success: function(data) {
        	var billData=data.result;
        	if(billData.sendStatus ==1){
        		pop_tip_open("red","此凭证以输出，无法进行修改!");
        	}else{
    	    	$('#enterDate').hide();
    	    	$('#datetimepicker5').show();
        	}
    	},
   	    error: function(XMLHttpRequest, textStatus, errorThrown) {
		   pop_tip_open("red","服务异常,请联系管理员！");
        }
	});
}

function changeDate(){
	$("#enterDate").html($("#enterDateId").val());
	$("#enterDataLable").removeClass("lineH28");
	$('#enterDate').show();
	$('#datetimepicker5').hide();
	
	var voucherBillarr=$("#voucherBillForm").serializeArray();
	var voucherBillDto={};
	for(var o in voucherBillarr){
		voucherBillDto[voucherBillarr[o].name]=voucherBillarr[o].value;
	}
	$.ajax({
	       url:serviceUrl+'finance/voucherBill/update/'+voucherBillId+'?time='+Math.random(),
	       data:JSON.stringify(voucherBillDto),
	       type:'PUT',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData ) {
            if(resultData.success) {
                pop_tip_open("green",'保存成功！');
                location.reload();
            }else {
                pop_tip_open("red",resultData.msg);
            }
	       },
    	  error: function(XMLHttpRequest, textStatus, errorThrown) {
 		  pop_tip_open("red","服务异常,请联系管理员！");
       }
	});
};

function deleteVhoucherEntry(){
	var id=$('#voucherEntryList').jqGrid('getGridParam','selrow');
	if(!id) {
		pop_tip_open("blue","请选择要删除的行！");
		return;
	}
	  pop_text_open("blue",'确认要删除这条数据吗？',function(){
			$.ajax({
				url:serviceUrl+"finance/voucherBillEntry/deletePseudo/"+id,
				type:'DELETE',
				dataType:'JSON',
				success:function (resultData ) {
					if (resultData&&resultData.success) {
						$('#voucherEntryList').jqGrid().trigger("reloadGrid");
						pop_tip_open("green","删除成功！");
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

function append(){
	$('#entryModalBody').load("voucherbillentry_modal.html",function(){
		//绑定modal树事件
		entrySelEvent();
		//表单元素赋值
		$("#voucherBillEntryFrom").find("input[name='voucherBillId']").val(voucherBillId);
		//修改titile
		$('.templateEntryModal-title').html("凭证模板分录-新增");
		getUUID();
	});
	isup = false ;
	//打开模态窗口
	$("#templateEntryModal").modal("show");
}

function editVoucher(){
	var id=$('#voucherEntryList').jqGrid('getGridParam','selrow');
	if(!id) {
		pop_tip_open("blue","请选择要编辑的行！");
		return;
	}
	isup = true;
	$('#entryModalBody').load("voucherbillentry_modal.html",function(){
		//绑定modal树事件
		entrySelEvent();
		//表单元素赋值
		//$("#voucherBillEntryFrom").find("input[name='voucherBillId']").val(voucherBillId);
		//修改titile
		$('.templateEntryModal-title').html("凭证模板分录-修改");
		$.ajax({
	        type:'get',
	        url:serviceUrl+'finance/voucherBillEntry/get/'+id+'?time='+Math.random(),
	        success: function(data) {
	        	var result=data.result;
	        	if(result){
	        		//页面元素赋值
	        		$("#voucherBillEntryFrom").find("input[name='id']").val(result.id);
   	        	    $("#voucherBillEntryFrom").find("input[name='voucherBillId']").val(result.voucherBillId);
   	        	    $("#voucherBillEntryFrom").find("input[name='captionId']").val(result.captionId);
   	        	    $("#voucherBillEntryFrom").find("input[name='assCode']").val(result.assCode);
   	        	    $("#voucherBillEntryFrom").find("input[name='assName']").val(result.assName);
   	        	    $("#voucherBillEntryFrom").find("input[name='realAssName']").val(result.realAssName);
   	        	    $("#voucherBillEntryFrom").find("input[name='cashFlowCode']").val(result.cashFlowCode);
   	        	    $("#voucherBillEntryFrom").find("input[name='summary']").val(result.summary);
   	        	    $("#voucherBillEntryFrom").find("input[name='captionName']").val(result.captionName);
   	        	    $("#voucherBillEntryFrom").find("input[name='assCompent']").val(result.assCompent);
   	        	    $("#voucherBillEntryFrom").find("input[name='cashFlowName']").val(result.cashFlowName);
   	        	    $("#voucherBillEntryFrom").find("input[name='drmny']").val(result.drmny);
   	        	    $("#voucherBillEntryFrom").find("input[name='crmny']").val(result.crmny);
   	        	    $("#voucherBillEntryFrom").find("input[name='remark']").val(result.remark);
   	        	 $("#voucherBillEntryFrom").find("input[name='assId']").val(result.assId);
	        	}else{
	        		pop_tip_open("red","数据为空！");
	        	}
        	},
       	    error: function(XMLHttpRequest, textStatus, errorThrown) {
    		   pop_tip_open("red","服务异常,请联系管理员！");
            }
		});
	});
	$("#templateEntryModal").modal("show");
}

/**
 * describe:新增的时候 自动的生成表单id
 */
function getUUID(){
	var my = this;
	$.ajax({
		type:'get',
		url:serviceUrl+'/sys/uuid/generator/getGuuid'+'?time='+Math.random(),
		async:false,
		success: function(data) {
			$("#voucherBillEntryFrom").find("input[name='id']").val(data.result);
		},
   	    error: function(XMLHttpRequest, textStatus, errorThrown) {
		   pop_tip_open("red","服务异常,请联系管理员！");
        }
	});
}

function entrySelEvent(){
	//会计科目名称
	$('#voucherBillEntryFrom').find('input[name="captionName"],a[id="selectCaption"]').on('click', function() {
		var urlBody = "finance/accountCaption/queryList"+'?time='+Math.random();
		var urlAll = serviceUrl + urlBody;
		var dataPost = {
				accountSetId:accountSetId==null?"null":accountSetId,
				delflag : 0
		}
		$(this).xljSingleSelector({
			title : '选择会计科目',//选择器标题，默认是'选择组织机构'
			selectorType : 'captionName',//选择器类型，默认是组织机构选择器
			immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
			treeUrl : urlAll,
			treeParam : dataPost,//生成zTree树的参数
			targetId : 'captionId',//选择的数据的ID存储input域
			targetName : 'captionName',//选择的数据的Name存储input域
			ajaxType : 'POST', //ajax的type 默认为post
			saveCallback:captionCallback,
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
	//辅助核算
	$('#voucherBillEntryFrom').find('input[name="assCompent"],a[id="selectAssName"]').on('click', function() {
		var captionIds = $("#voucherBillEntryFrom").find("input[name='captionId']").val();
		var assIds = $("#voucherBillEntryFrom").find("input[name='assId']").val();
		var assNames = $("#voucherBillEntryFrom").find("input[name='assName']").val();
		if(captionIds=='' || assNames==''){
			pop_tip_open("red","请选择会计科目！");
			return false;
		}
		//$("#add").modal("show");
    		var urlAll = serviceUrl+'finance/assType/queryTree';
    		var dataPost = {assIds:assIds};//'03bc2754bd2f4340829058e3daa8f916'
    		$(this).xljSingleSelector({
    			title : '选择辅助核算',//选择器标题，默认是'选择组织机构'
    			selectorType : 'company',//选择器类型，默认是组织机构选择器
    			immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
    			treeUrl : urlAll,
    			treeParam : dataPost,//生成zTree树的参数
    			targetId : 'assCode',//选择的数据的ID存储input域
    			targetName : 'assCompent',//选择的数据的Name存储input域
    			ajaxType : 'POST', //ajax的type 默认为post
    			
    			saveCallback:assCallback,
    			treeSettings : {
    				data : {
    					simpleData : {
    						enable : true,
    						idKey : 'id',
    						pIdKey : 'parentId'
    					}
    				},
    				callback : {
        				beforeCheck : recheckAss,
        	            //onCheck : onCheck
        	        },
    				check: {
    					enable: true,
    					chkStyle: "checkbox",
    					chkboxType: { "Y": "ps", "N": "ps" }
                    }
    			}
    		});
    		
	});
	//现金流量名称
	$('#voucherBillEntryFrom').find('input[name="cashFlowName"],a[id="selectCashFlow"]').on('click', function() {
		var urlBody = "finance/cashFlowItem/queryList"+'?time='+Math.random();
		var urlAll = serviceUrl + urlBody;
		var dataPost = {"accountSetId":accountSetId==null?"null":accountSetId};
		$(this).xljSingleSelector({
			title : '选择现金流量',//选择器标题，默认是'选择组织机构'
			selectorType : 'company',//选择器类型，默认是组织机构选择器
			immediatelyShow : true,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
			treeUrl : urlAll,
			treeParam : dataPost,//生成zTree树的参数
			targetId : 'cashFlowId',//选择的数据的ID存储input域
			targetName : 'cashFlowName',//选择的数据的Name存储input域
			ajaxType : 'POST', //ajax的type 默认为post
			saveCallback:cashflowCallback,
			treeSettings : {
				data : {
					simpleData : {
						enable : true,
						idKey : 'id',
						pIdKey : 'parentId'
					}
				},
			}
		});
	});
}

/**
 * 保存数据项事件
 */
function save_form(){
	//映射后台保存方法
	var url=serviceUrl+"finance/voucherBillEntry/save";
	//请求方式
	var type = 'POST';
	if(isup){
		//映射后台修改方法
		url=serviceUrl+"finance/voucherBillEntry/update/"+$('#voucherBillEntryFrom').find("input[name='id']").val();
		type = 'PUT';
	}
	var financeSystemarr=$("#voucherBillEntryFrom").serializeArray();
	var voucherBillEntryDto={};
	voucherBillEntryDto.delflag=0;
	for(var o in financeSystemarr){
		voucherBillEntryDto[financeSystemarr[o].name]=financeSystemarr[o].value;
	}
	$.ajax({
	       url:url,
	       data:JSON.stringify(voucherBillEntryDto),
	       type:type,
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData ) {
               if(resultData.success) {
                   pop_tip_open("green",'保存成功！');
                   $("#templateEntryModal").modal("hide");
                   jQuery("#voucherEntryList").jqGrid("setGridParam",{postData:{voucherBillId:voucherBillId,delflag:0}}).trigger("reloadGrid");
               }else {
                   pop_tip_open("red",resultData.msg);
               }
	       },
       	  error: function(XMLHttpRequest, textStatus, errorThrown) {
    		  pop_tip_open("red","服务异常,请联系管理员！");
          }
	   });
}

/**
 * 会计科目回调
 */
function captionCallback(treeNode,e) {
	$("#voucherBillEntryFrom").find("input[name='captionId']").val(treeNode.id);
	$("#voucherBillEntryFrom").find("input[name='captionName']").val(treeNode.name);
	$("#voucherBillEntryFrom").find("input[name='assId']").val(treeNode.assIds);
	$("#voucherBillEntryFrom").find("input[name='assName']").val(treeNode.assNames);
	$("#voucherBillEntryFrom").find("input[name='captionName']").focus();
}

/**
 * 辅助核算回调
 */
function assCallback(treeNodes,e){
	var treeIds = "";
	var realAssNames = "";
	var assItemCodes = "";
	var assNames = "";
	var assCompent = "";
	var assIds = "";
	if(treeNodes == null || treeNodes.length<1){
		//pop_tip_open("red","请选择辅助核算！");
		//modalContainer.modal('show');
		return false;
	}
	for(var i=0;i<treeNodes.length;i++){
		var isParent = treeNodes[i].isParent;
		if(!isParent){
			assNames += treeNodes[i].getParentNode().name +",";
			treeIds = treeNodes[i].tId;
			assItemCodes += treeNodes[i].assItemCode+",";
			realAssNames += treeNodes[i].name+",";
			assIds += treeNodes[i].getParentNode().id + ",";
			assCompent += "【"+treeNodes[i].getParentNode().name+"："+treeNodes[i].assItemCode+"/"+treeNodes[i].name+"】"
		}
	}
	
	treeIds = "_"+treeIds.split("_")[1];
	var treeObj = $.fn.zTree.getZTreeObj(treeIds);
	var nodes = treeObj.getNodes();
	var nums = 0;
	for(var i=0;i<nodes.length;i++){
		var isParent = nodes[i].isParent;
		if(isParent){
			nums ++ ;
		}
	}
	if(nums * 2 == treeNodes.length){
		$("#voucherBillEntryFrom").find("input[name='assCode']").val(assItemCodes);
		$("#voucherBillEntryFrom").find("input[name='assName']").val(assNames);
		$("#voucherBillEntryFrom").find("input[name='realAssName']").val(realAssNames);
		$("#voucherBillEntryFrom").find("input[name='assCompent']").val(assCompent);
		$("#voucherBillEntryFrom").find("input[name='assIds']").val(assIds);
	}else{
		pop_tip_open("red","请为每一个辅助核算选择一个明细！");
		modalContainer.modal('show');
		return false;
	}
	
}
function recheckAss(treeId, treeNode){
	var treeObj = $.fn.zTree.getZTreeObj(treeId);
	var childrenNodes = treeNode.getParentNode().children;
	 if (childrenNodes) {
         for (var i = 0; i < childrenNodes.length; i++) {
        	 treeObj.checkNode(childrenNodes[i], false, false);
         }
	 }
	return true;
}

/**
 * 现金流量回调
 */
function cashflowCallback(treeNode,e) {
	$("#voucherBillEntryFrom").find("input[name='cashFlowCode']").val(treeNode.code);
	$("#voucherBillEntryFrom").find("input[name='cashFlowName']").val(treeNode.name);
	$("#voucherBillEntryFrom").find("input[name='cashFlowName']").focus();
}