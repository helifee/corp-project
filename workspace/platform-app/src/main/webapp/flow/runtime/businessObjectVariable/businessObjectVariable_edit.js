/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-24
 */

/**
 * 此文件实现业务对象的业务变量的新增或修改操作
 */
var variableList;
var systemList;
var systemId;
var searchSystemId="", keyword="";
var businessObjectId;
var lastSel_rowId;
var parentId="";
var id = "";
/**
 * 页面JS的执行入口处
 */
$(function () {
	systemId = $.getUrlParam('systemId');
	querySystemAppInfo(systemId); //查询所属系统的数据和列表
	$("#systemAppId").val(systemId);
	
	businessObjectId = $.getUrlParam('busiObjectId');
	$("#businessObjectId").val(businessObjectId);
	queryBusinessObject(); //查询所属业务对象的数据
	
	id = $.getUrlParam('id');
	$("#id").val(id);
	queryParentVariableList();//查询上级变量列表
	initSearchTable();
	if("-1" != id){
		querySingleVariable(id);//给form表单的元素进行赋值
	}
	parentId  = $.getUrlParam('parentId');
	if(parentId && parentId.length>10){
		$("#parentId").val(parentId);
		queryBusinessVariable(parentId);
	}
	//$('html').niceScroll().show().resize();//重置纵向滚动条
	
	$('.singleArray-first').xljSingleArraySelector({
	    selectorTypeArray:['busiVariable'],
	    businessObjectId : businessObjectId,
	    treeUrl: hostUrl+'flow/businessObjectVariable/getVariableTreeByBusiObject',
	    targetId:'parentId',//选择的数据的ID存储input域
	    targetName:'parentName' //选择的数据的Name存储input域
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
});

/**
 * 数据类型的下拉框的值发生变化的事件处理方法
 * @param obj
 */
function dataTypeChange(obj){
	var idText = obj.id;
	var selIndex = obj.options.selectedIndex;
	var selVal = obj.options[selIndex].value;
	if(selVal==6){//当选择的是对象时,出现关联业务对象的选择框
		$("#relateBusinessObjectTR_1").show();
		$("#relateBusinessObjectTR_2").show();
	}else{
		$("#relateBusinessObjectTR_1").hide();
		$("#relateBusinessObjectTR_2").hide();
	}
}

function emptyParentInfo(){
	$("#parentId").val("");
	$("#parentName").val("");
}

/**
 * 查询单个变量的详细数据
 * @param id: 单个变量ID
 */
function querySingleVariable(id){
	$.ajax({
	       url: hostUrl+"flow/businessObjectVariable/get/"+id+"?t="+ new Date().getTime(),
	       type:'GET',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   var dataObj = resultData.result;
	    	   setFormDataBySingleVariable(dataObj);
	       }
	});
}

/**
 * 根据单独变量的对象实例对表单元素进行赋值
 * @param dataObj
 */
function setFormDataBySingleVariable(dataObj){
    $("input[name='forFinance'][value='"+dataObj.forFinance+"']").attr("checked",true);
    $("input[name='forFlowBranch'][value='"+dataObj.forFlowBranch+"']").attr("checked",true);
    
    $("#code").val(dataObj.code);//编号
    $("#code").attr("readonly","readonly");
	$("#name").val(dataObj.name);//名称
	$("#type").val(dataObj.type);
	$("#relationCode").val(dataObj.relationCode);
	
	
	if(dataObj.parentId && dataObj.parentId.length>10){
		$("#parentId").val(dataObj.parentId);
		queryBusinessVariable(dataObj.parentId);
	}
	
	$("#comment").html(dataObj.comment);//名称
	$("#concurrencyVersion").val(dataObj.concurrencyVersion);//编号
	$("#prefixId").val(dataObj.prefixId);//prefixId
	$("#sort").val(dataObj.sort);//sort
	
	if(dataObj.type==6){//当选择的是对象时,出现关联业务对象的选择框
		$("#relateBusinessObjectTR_1").show();
		$("#relateBusinessObjectTR_2").show();
		$("#relateBusinessObject").val(dataObj.relateBusinessObject);//名称
		queryRelateBusinessObject(dataObj.relateBusinessObject);
	}else{
		$("#relateBusinessObjectTR_1").hide();
		$("#relateBusinessObjectTR_2").hide();
	}
}

function queryBusinessVariable(dataId){
	$.ajax({
	       url: hostUrl+"flow/businessObjectVariable/get/"+dataId+"?t="+ new Date().getTime(),
	       type:'GET',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   var dataObj = resultData.result;
	    	   $("#parentName").val(dataObj.name);
	       }
	});
}

/**
 * 根据关联对象的ID查询相关联的对象数据
 * @param relateObjectId
 */
function queryRelateBusinessObject(relateObjectId){
	$.ajax({
	       url: hostUrl+"flow/businessObject/get/"+relateObjectId,
	       type:'GET',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   var dataObj = resultData.result;
	    	   $("#relateBusinessObject_name").val(dataObj.name);
	       }
	});
}

/**
 * 初始化弹出框的查询表格
 */
function initSearchTable(){
	jQuery("#jqgridList").jqGrid({
        url: hostUrl+"flow/businessObject/seachKeyword",//获取数据的地址
        postData: { appId: searchSystemId, keyword:'',  delflag:false},
        datatype: "json",//从服务器端返回的数据类型，默认xml。可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        mtype: "post",//ajax提交方式。POST或者GET，默认GET
        
        jsonReader : { root:"result" },
        colModel: [
            {name:'id',       label:'ID',        align:"center", hidden:true},
            {name:'code',     label:'业务对象编码',  align:"center"},
            {name:'name',     label:'业务对象名称',  align:"center" }
        ],
        height: 310,
        width: 560,
        rowNum: -1,
        sortname: 'id',//默认的排序列
        sortorder: "desc",//排序方式,可选desc,asc
        viewrecords: true, //定义是否要显示总记录数
       	//autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度 
        onSelectRow: function(rowid, status) {//被选中的状态
        	lastSel_rowId = rowid;
        }
	});
}

/**
 * 查询上级业务变量的列表
 */
function queryParentVariableList(){
	var paramData = {
		businessObjectId:businessObjectId,
		delflag:false  };
	
	$.ajax({ //发送更新的ajax请求
	    type: "POST",  
	    url: hostUrl+"flow/businessObjectVariable/queryList",    
	    dataType: "json",  
	    async: false,
	    data:  JSON.stringify(paramData),//此处必须JSON.stringify(paramData)
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){
	    	$.each(data.result,function(index, item){//遍历mapList的数组数据
	    		if(item.id!=$("#id").val()){
	    			$("#parentId").append("<option value="+item.id+">"+item.name+"</option>");
	    		}
                
	    	});//$.each(appList	    	
	    },  
	    error: function(data){  
	    	if(data.msg){
	    		pop_tip_open("red",data.msg);
	    	}else{
	    		pop_tip_open("red","修改失败！");
	    	}
	    }  
	});//end-for $.ajax({
}

/**
 * 选择关联对象时，弹出框的点击事件
 */
function chooseBusiObject(){
	$("#modal-title").html("查找业务对象");//修改标题
	$("#modalWindow").modal("show");
}

/**
 * 关联对象的查询事件
 */
function searchBusiObject(){
	keyword = $("#keyword").val();
	searchSystemId = $("#searchSystemId").val();
	$("#jqgridList").jqGrid('setGridParam',{
        datatype:'json', 
        postData:{keyword:keyword, appId: searchSystemId},   
    }).trigger("reloadGrid");
}

/**
 * 查询所属系统的数据和列表
 * @param systemId 所属的业务系统ID
 */
function querySystemAppInfo(systemId){
	var postdata={
	    appDelflag: "0",
	    appStatus: "1"
	}
	$.ajax({
	       url: hostUrl+"sys/res/appSystem/queryList/",
	       type:'POST',
	       data: JSON.stringify(postdata),
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   systemList = resultData.result;
	    	   if(!systemList || systemList.length==0){
	    		   pop_tip_open("red","所属业务系统的数据接口异常,请核实之后再试!");
	    	   }else{
	    		   $.each(systemList,function(index, item){//遍历mapList的数组数据
		    		   if(systemId == item.id){
		    			   $("#systemName").val(item.name);
		    		   }
		               $("#searchSystemId").append("<option value="+item.id+">"+item.name+"</option>");
			       });
	    	   }
	       }
	});
}

/**
 * 查询所属业务对象的数据
 */
function queryBusinessObject(){
	$.ajax({
	       url: hostUrl+"flow/businessObject/get/"+businessObjectId,
	       type:'GET',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   var dataObj = resultData.result;
	    	   $("#businessObjectName").val(dataObj.name);
	       }
	});
}

/**
 * 保存按钮的点击事件
 */
function saveForm(){
	$("#variableForm").attr("data-validate-success","doSaveFormAction()");
	$("#variableForm").submit();
}

/**
 * 保存表单数据的方法
 */
function doSaveFormAction(){
	var formDataArray = $("#variableForm").serializeArray();
	var busiObjDto = {};
	for(var i in formDataArray){
		busiObjDto[formDataArray[i].name]=formDataArray[i].value;
	}
	
	var parentId = busiObjDto.parentId;
	if(id == parentId){
		pop_tip_open("red","上级变量不能与当前变量相同!");
		return;
	}
	
	if(busiObjDto.type!="6"){
		busiObjDto.relateBusinessObject = '';
	}
	busiObjDto.delflag=false;
	
	busiObjDto.code = $("#code").val();
	busiObjDto.name = $("#name").val();
	busiObjDto.comment = $("#comment").val();
	
	var resultMsg1 = checkUnicityByVariableCode(busiObjDto);
	var resultMsg2 = checkUnicityByVariableName(busiObjDto);
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
	//校验code是否以字母开头
	var checkMsg = checkStartWithLetter(busiObjDto.code);
	if(checkMsg && checkMsg.length>1){
		pop_tip_open("red",checkMsg);
		return;
	}
	busiObjDto.relateBusinessObject_name=undefined;
	//return ;
	if("-1" == busiObjDto.id){
		saveFormData(busiObjDto);
	}else{
		updateFormData(busiObjDto);
	}
}

/**
 * 根据变量Code是否以字母打头
 * @param code  
 * @returns {String} 返回结果
 */
function checkStartWithLetter(code) {
	var reg= /^[A-Za-z].*/;
	if (!reg.test(code)){ //判断是否符合正则表达式
	   return "业务变量的编码必须是以字母开头";
	}else{
		return "";
	}
}
/**
 * 根据变量Code来判断数据的一致性
 * @param busiObjDto 业务对象的数据
 * @returns {String} 返回结果
 */
function checkUnicityByVariableCode(busiObjDto) {
	var paramData = {code:busiObjDto.code, delflag:false, businessObjectId:busiObjDto.businessObjectId};
	var checkMsg = "";
	$.ajax({ //发送更新的ajax请求
	    type: "POST",  
	    url: hostUrl+"flow/businessObjectVariable/queryList",    
	    dataType: "json",  
	    async: false,
	    data:  JSON.stringify(paramData),//此处必须JSON.stringify(paramData)
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){
	    	var dataList = data.result;
	    	if(dataList && dataList.length>1){
	    		checkMsg = "业务变量的编码不能重复!";
	    	}else if(dataList && dataList.length==1){
	    		var dataItem = dataList[0];
	    		var dataId = dataItem.id;
	    		if(dataId != busiObjDto.id &&  busiObjDto.id =="-1"){
	    			checkMsg = "业务变量的编码不能重复!";
	    		}
	    	}
	    }  
	});
	return checkMsg;
}

/**
 * 根据变量名称来判断数据的一致性
 * @param busiObjDto 业务对象的数据
 * @returns {String} 返回结果
 */
function checkUnicityByVariableName(busiObjDto) {
	var paramData = {name:busiObjDto.name, delflag:false, businessObjectId:busiObjDto.businessObjectId};
	var checkMsg = "";
	$.ajax({ //发送更新的ajax请求
	    type: "POST",  
	    url: hostUrl+"flow/businessObjectVariable/queryList",    
	    dataType: "json",  
	    async: false,
	    data:  JSON.stringify(paramData),//此处必须JSON.stringify(paramData)
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){
	    	var dataList = data.result;
	    	if(dataList && dataList.length>1){
	    		checkMsg = "业务变量的名称不能重复!";
	    	}else if(dataList && dataList.length==1){
	    		var dataItem = dataList[0];
	    		var dataId = dataItem.id;
	    		if(dataId != busiObjDto.id &&  busiObjDto.id =="-1"){
	    			checkMsg = "业务变量的名称不能重复!";
	    		}
	    	}
	    }  
	});
	return checkMsg;
}

/**
 * 把修改的数据提交到数据库,操作成功后，会关闭当前页面，同时刷新父页面的表格数据
 * @param busiObjDto 表单对象的实例
 */
function updateFormData(busiObjDto){
	$.ajax({
	       url: hostUrl+"flow/businessObjectVariable/update/"+busiObjDto.id,
	       data:JSON.stringify(busiObjDto),
	       type:'PUT',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData ) {
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
 * 把新增的数据提交到数据库,操作成功后，会关闭当前页面，同时刷新父页面的表格数据
 * @param busiObjDto 表单对象的实例
 */
function saveFormData(busiObjDto){
	var dataParentId = busiObjDto.parentId;
	//console.info("dataParentId="+dataParentId);
	$.ajax({
	       url: hostUrl+"flow/businessObjectVariable/save",
	       data:JSON.stringify(busiObjDto),
	       type:'POST',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData ) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               //console.info(result);
	              
	               if(dataParentId && dataParentId.length>10){
	            	   opener.refreshJqGridData(dataParentId);
	               }else{
	            	   opener.refreshJqGridData(result.id);
	               }
	               
	               
	               if(successFlag) {
	                   pop_tip_open("green","保存数据操作成功！");
	               }else {
	            	   pop_tip_open("red","保存数据操作失败！");
	               }
	               closeMe();
	           }
	       }
	});
}

/**
 * 提交模态弹出框的数据，并关闭窗口
 */
function submitAndCloseModelWindow(){
	var rowData = $('#jqgridList').jqGrid('getRowData',lastSel_rowId);
	$("#relateBusinessObject_name").val(rowData.name);
	$("#relateBusinessObject").val(rowData.id);
	closeModelWindow();
}

/**
 * 关闭模态弹出框窗口
 */
function closeModelWindow(){
	lastSel_rowId = "";
	$("#modalWindow").modal("hide");
}

/**
 * 关闭当前的子窗口
 */
function closeMe(){
	lastSel_rowId = "";
	window.opener=null;
	window.open('','_self');
	window.close();
}