/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-23
 */

/**
 * 此文件实现业务对象的增加或修改的操作
 */

var appId;
var objId;
var parentId;
var selected_dataType = "";
$(function () {
	//获取两个参数
	appId = $.getUrlParam("appId");
	$("#appId").val(appId);
	querySystemAppInfo(appId);
	objId = $.getUrlParam("id");
	$("#id").val(objId);
	var parentId = $.getUrlParam("parentId");
	if("-1"!= objId){
		queryBusinessObject();
		$("#idTitle").html("业务对象信息-修改");
		$("#titleDiv").html("业务对象信息-修改");
	} else {
		$("#idTitle").html("业务对象信息-新增");
		$("#titleDiv").html("业务对象信息-新增");
	}
	
	if(parentId && parentId.length>2){
		$("#parentId").val(parentId);
		queryParentBusinessObject(parentId);
	}
	
	
	$('.singleArray-first').xljSingleArraySelector({
	    selectorTypeArray:['busiObject'],
	    appId : appId,
	    treeUrl: serviceUrl+'flow/businessObject/getCategoryTreeBySystemApp',
	    targetId: 'parentId',//选择的数据的ID存储input域
	    targetName: 'parentName', //选择的数据的Name存储input域
	    selectNodeType: { dataType:'1', msg:'只能选择业务对象分类'}//定义可选节点
	    
	    /*treeSettings:{
	    	check:{
                autoCheckTrigger:false,
                chkboxType:{ "Y": "", "N": "" },
                chkStyle:'checkbox',
                enable:true,
                nocheckInherit:false,
                chkDisabledInherit:false,
                radioType:'level'
            }
	    }*/
	});
	
	//$('html').niceScroll().show().resize();//重置纵向滚动条
});

//数据类型的change事件
function dataTypeChange(){
	var dataType=$("input:radio[name='dataType']:checked").val();
	if(dataType == 1){
		$("#configDiv_one").hide();
		$("#configDiv_two").hide();
	}else{
		$("#configDiv_one").show();
		$("#configDiv_two").show();
	}
	//$('html').niceScroll().show().resize();//重置纵向滚动条
}


function emptyBusiObject(){
	$("#parentId").val("");
	$("#parentName").val("");
}

/**
 * 查询所属应用系统的名称
 * @param appId
 */
function querySystemAppInfo(appId){
	$.ajax({
	       url: serviceUrl+"sys/res/appSystem/get/"+appId,
	       type: 'GET',
	       async: false,
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   var dataObj = resultData.result;
	    	   $("#systemAppName").val(dataObj.name);
	       }
	});
}

/**
 * 查询所对应的业务对象
 */
function queryBusinessObject(){
	$("#dataTypeSpan").hide();
	$("#dataTypeText").show();
	
	$.ajax({
	       url: serviceUrl+"flow/businessObject/get/"+objId+"?t="+ new Date().getTime(),
	       type:'GET',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   var dataObj = resultData.result;
	    	   setFormData(dataObj);
	       }
	});
}

function queryParentBusinessObject(parentId){
	$.ajax({
	       url: serviceUrl+"flow/businessObject/get/"+parentId+"?t="+ new Date().getTime(),
	       type:'GET',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   //console.info("queryParentBusinessObject----");
	    	   //console.info(resultData);
	    	   var dataObj = resultData.result;
	    	   $("#parentName").val(dataObj.name);
	       }
	});
}

/**
 * 设置Form表单的元素的值
 * @param dataObj
 */
function setFormData(dataObj){
	//处理systemAppName
	$.ajax({
	       url: serviceUrl+"sys/res/appSystem/get/"+appId,
	       type: 'GET',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success: function (resultData) {
	    	   $("#systemAppName").val(resultData.result.name);
	       }
	});
	
	//处理表单的数据
	//var forFinancce = $("input[name='forFinance']");
	//根据Value值设置Radio为选中状态  
	/*$("input[name='forFlow'][value='"+dataObj.forFlow+"']").attr("checked",true);
	$("input[name='forFinance'][value='"+dataObj.forFinance+"']").attr("checked",true);
	$("input[name='forCustomizeForm'][value='"+dataObj.forCustomizeForm+"']").attr("checked",true);
	$("input[name='forDataAuth'][value='"+dataObj.forDataAuth+"']").attr("checked",true);*/
	
	selected_dataType = dataObj.dataType;
	if(selected_dataType=="1"){
		$("#dataTypeText").text("分类");
	}else{
		$("#dataTypeText").text("业务对象");
		$("#configDiv_one").show();
		$("#configDiv_two").show();
	}
	
	$("#concurrencyVersion").val(dataObj.concurrencyVersion);//并发版本
    $("#code").val(dataObj.code);//编号
	$("#name").val(dataObj.name);//名称
	$("#pcUrl").val(dataObj.pcUrl);//pc业务表单访问url  		
	$("#phoneUrl").val(dataObj.phoneUrl);//phone业务表单访问url	
	$("#phoneBusinessUrl").val(dataObj.phoneBusinessUrl);//phone业务表单键值对url	
	$("#paramUrl").val(dataObj.paramUrl);//业务对象变量取值url 
	$("#approveClass").val(dataObj.approveClass);//审批接口类
	$("#approveMethod").val(dataObj.approveMethod);//审批接口方法
	$("#busidataClass").val(dataObj.busidataClass);//流程读取业务数据接口类
	$("#busidataMethod").val(dataObj.busidataMethod);//流程读取业务数据方法
	$("#callbackClass").val(dataObj.callbackClass);//流程回写接口类
	$("#callbackUrl").val(dataObj.callbackUrl);//业务系统回调代理页面
	$("#callbackMethod").val(dataObj.callbackMethod);//流程回写方法
	$("#financeClass").val(dataObj.financeClass);//财务接口类
	$("#comment").val(dataObj.comment);//说明
	
	$("#prefixId").val(dataObj.prefixId);//prefixId
	$("#sort").val(dataObj.sort);//sort
	if(appId == dataObj.parentId){
		$("#parentId").val("");
	}else{
		$("#parentId").val(dataObj.parentId);//parentId
		queryParentBusinessObject(dataObj.parentId);
	}
		
}

/**
 * 保存按钮的点击事件
 */
function saveForm(){
	$("#businessObjectForm").attr("data-validate-success","doSaveFormAction()");
	$("#businessObjectForm").submit();
}

/**
 * 执行提交数据的操作
 */
function doSaveFormAction(){
	var formDataArray = $("#businessObjectForm").serializeArray();
	var busiObjDto = {};
	for(var i in formDataArray){
		busiObjDto[formDataArray[i].name] = formDataArray[i].value;
	}
	busiObjDto.delflag = false;
	delete busiObjDto.parentName;
	busiObjDto.code = $("#code").val();
	busiObjDto.name = $("#name").val();
	
	busiObjDto.pcUrl = $("#pcUrl").val();
	busiObjDto.paramUrl = $("#paramUrl").val();
	busiObjDto.phoneUrl = $("#phoneUrl").val();
	busiObjDto.approveClass = $("#approveClass").val();
	busiObjDto.callbackClass = $("#callbackClass").val();
	busiObjDto.comment = $("#comment").val();
	
	var reg = /^[a-zA-Z0-9_-]+$/; 
	var regResult = reg.test(busiObjDto.code);
	if(!regResult){
		pop_tip_open("red","业务对象编码只能是字母、数字、半角的-和_!");
		return;
	}
	var parentId = busiObjDto.parentId;
	if(objId == parentId){
		pop_tip_open("red","父节点不能与当前业务对象分类相同!");
		return;
	}
	var self_prefixId = $("#prefixId").val();
	var comparenFlag = comparePrefixIdWithParentId(self_prefixId, parentId);
	if(!comparenFlag){
		pop_tip_open("red","父节点不能为当前业务对象分类下级!");
		return;
	}
	//校验名字和code是否重复
	var resultMsg1 = checkUnicityByBusiObjectCode(busiObjDto);
	var resultMsg2 = checkUnicityByBusiObjectName(busiObjDto);
	var resultMsg = "";
	if(resultMsg1.length>5){
		resultMsg = resultMsg1;
	}
	if(resultMsg.length>5){
		resultMsg = resultMsg+"<br/>"+resultMsg2;
	}else{
		resultMsg = resultMsg2;
	}
	
	if(resultMsg && resultMsg.length>5){
		pop_tip_open("red",resultMsg);
		return;
	}
	
	if("-1" == busiObjDto.id){
		saveFormData(busiObjDto);
	}else{
		busiObjDto.dataType = selected_dataType;
		updateFormData(busiObjDto);
	}
}

function comparePrefixIdWithParentId(self_prefixId, parentId){
	var resultFlag = true;
	if(self_prefixId && self_prefixId.length>30){
		$.ajax({
		       url: serviceUrl+"flow/businessObject/get/"+parentId,
		       type: 'GET',
		       async: false,
		       contentType:'application/json',
		       dataType:'JSON',
		       success:function (resultData) {
		    	   var dataObj = resultData.result;
		    	   var parent_prefixId = dataObj.prefixId;
		    	   if(parent_prefixId.indexOf(self_prefixId)>-1){//说明所选中的parent其实是它的子节点
		    		   resultFlag = false;
		    	   }
		       }
		});
	}
	return resultFlag;
}

/**
 * 根据变量Code来判断数据的一致性
 * @param busiObjDto 业务对象的数据
 * @returns {String} 返回结果
 */
function checkUnicityByBusiObjectCode(busiObjDto){
	var paramData = {code:busiObjDto.code, delflag:false, appId:busiObjDto.appId};
	var checkMsg = "";
	$.ajax({ //发送更新的ajax请求
	    type: "POST",  
	    url: serviceUrl+"flow/businessObject/queryList",    
	    dataType: "json",  
	    async: false,
	    data:  JSON.stringify(paramData),//此处必须JSON.stringify(paramData)
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){
	    	var dataList = data.result;
	    	if(dataList && dataList.length>1){
	    		checkMsg = "业务对象的编码不能重复!";
	    	}else if(dataList && dataList.length==1){
	    		var dataItem = dataList[0];
	    		var dataId = dataItem.id;
	    		if(dataId != busiObjDto.id){
	    			checkMsg = "业务对象的编码不能重复!";
	    		}
	    	}
	    }  
	});
	return checkMsg;
}

/**
 * 根据变量Name来判断数据的一致性
 * @param busiObjDto 业务对象的数据
 * @returns {String} 返回结果
 */
function checkUnicityByBusiObjectName(busiObjDto){
	
	var paramData = {name:busiObjDto.name, delflag:false, appId:busiObjDto.appId};
	var v_parentId = $("#parentId").val();
	if(v_parentId && v_parentId.length>2){
		paramData.parentId = v_parentId;
	}
	var checkMsg = "";
	$.ajax({ //发送更新的ajax请求
	    type: "POST",  
	    url: serviceUrl+"flow/businessObject/queryList",    
	    dataType: "json",  
	    async: false,
	    data:  JSON.stringify(paramData),//此处必须JSON.stringify(paramData)
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){
	    	var dataList = data.result;
	    	if(dataList && dataList.length>1){
	    		checkMsg = "业务对象的名称不能重复!";
	    	}else if(dataList && dataList.length==1){
	    		var dataItem = dataList[0];
	    		var dataId = dataItem.id;
	    		if(dataId != busiObjDto.id){
	    			checkMsg = "业务对象的名称不能重复!";
	    		}
	    	}
	    }  
	});
	return checkMsg;
}

/**
 * 更新业务对象的表单数据
 * @param busiObjDto
 */
function updateFormData(busiObjDto){
	$.ajax({
	       url: serviceUrl+"flow/businessObject/update/"+busiObjDto.id,
	       data: JSON.stringify(busiObjDto),
	       type: 'PUT',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success: function (resultData ) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               opener.refreshJqGridData(busiObjDto.id);
	               if(successFlag) {
	                   pop_tip_open("green","更新数据操作成功！");
	               }else {
	            	   pop_tip_open("red","更新数据操作失败！");
	               }
	               closeMe();
	           }
	       }
	});
}

/**
 * 保存保单数据的处理方法
 */
function saveFormData(busiObjDto){
	busiObjDto.systemAppName = undefined;
	var dataParentId = busiObjDto.parentId;
	$.ajax({
	       url: serviceUrl+"flow/businessObject/save",
	       data: JSON.stringify(busiObjDto),
	       type: 'POST',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success:function (resultData ) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               
	               if(dataParentId && dataParentId.length>10){
	            	   opener.refreshJqGridData(dataParentId);
	               }else{
	            	   opener.refreshJqGridData(result.id);
	               }
	               
	               if(successFlag) {
	                   pop_tip_open("green","数据保存操作成功！");
	               }else {
	            	   pop_tip_open("red","数据保存操作失败！");
	               }
	               closeMe();
	           }
	       }
	});
}

/**
 * 关闭按钮的点击事件
 */
function closeMe(){
	window.opener=null;
	window.open('','_self');
	window.close();
}