/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-04-09
 */

/**
 * 此文件实现流程的代理的增加或修改的操作
 */

var agentId;
var chooseType = "";//post-选择岗位; flow-选择流程模板
var chooseArray = new Array(); 
var postGrid, flowGrid;//分别对应岗位和模板结果数据的JqGrid数据
var postLastSel, flowLastSel;
var postChooseGrid;
var flowChooseGrid;
$(function () {
	initDatetimepicker();
	//获取两个参数
	agentId = $.getUrlParam("agentId");
	$("#id").val(agentId);
	initTwoGridTable();
	if("-1"!= agentId){
		queryAgentObject();
		$("#idTitle").html("流程代理信息-修改");
		$("#titleDiv").html("流程代理信息-修改");

	}else{
		$("#idTitle").html("流程代理信息-新增");
		$("#titleDiv").html("流程代理信息-新增");
	}
	
	//$('html').niceScroll().show().resize();//重置纵向滚动条
	
    $("#modalWindow").on('hide.bs.modal',function () {
		$("#modal-body").find('.ui-jqgrid-bdiv').getNiceScroll().remove();
    });
	$("#modalWindow").on('shown.bs.modal',function () {
		$.xljUtils.addGridScroll("ui-jqgrid-bdiv","#modal-body");
		$.xljUtils.gridResizeFn();
    });

});
//计算表格宽度
function resizeGrid(w){
	$(postGrid).jqGrid().setGridWidth(w, true);
	$(flowGrid).jqGrid().setGridWidth(w, true);
	$.xljUtils.gridResizeFn();
}
function gridWidthFn(){
	if(parseInt($(window).width())>1100){
		resizeGrid($(window).width()*0.83*0.84);
	}else{
		resizeGrid(770);
	}
}
//grid 自适应宽度
$(window).resize(function(){
	gridWidthFn();
});
//初始化日期控件
function initDatetimepicker(){
  $('.form_datetime').datetimepicker({
      language:  'zh-CN',
      format: 'yyyy-mm-dd hh:ii:ss',
      weekStart: 1,
      todayBtn:  1,
      autoclose: 1,
      todayHighlight: 1,
      startView: 2,
      forceParse: 0,
      showMeridian: 1,
	  pickerPosition:'top-right'
   });	
}

/**
 * 查询所对应的代理对象
 */
function queryAgentObject(){
	$.ajax({
	       url: hostUrl+"flow/agent/get/"+agentId+"?t="+ new Date().getTime(),
	       type:'GET',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   var dataObj = resultData.result;
	    	   setFormData(dataObj);
	       }
	});
}

/**
 * 设置Form表单的元素的值
 * @param dataObj
 */
function setFormData(dataObj){
	//根据Value值设置Radio为选中状态  
	$("input[name='proxyType'][value='"+dataObj.proxyType+"']").attr("checked",true);
	$("input[name='postScope'][value='"+dataObj.postScope+"']").attr("checked",true);
	$("input[name='flowScope'][value='"+dataObj.flowScope+"']").attr("checked",true);
	
	$("#concurrencyVersion").val(dataObj.concurrencyVersion);//并发版本
	$("#name").val(dataObj.name);//名称
	$("#authorizer").val(dataObj.authorizer);	
	$("#authorizerId").val(dataObj.authorizerId);
	$("#authorized").val(dataObj.authorized); 
	$("#authorizedId").val(dataObj.authorizedId);
	$("#startDate").val(dataObj.startDate);
	$("#endDate").val(dataObj.endDate);
	$("#remark").val(dataObj.remark);//说明
	postScopeChange(dataObj.postScope);
	flowScopeChange(dataObj.flowScope);
}

/**
 * 保存按钮的点击事件
 */
function saveForm(){
	$("#agentForm").attr("data-validate-success","doSaveFormAction()");
	$("#agentForm").submit();
}

/**
 * 执行提交数据的操作
 */
function doSaveFormAction(){
	var formDataArray = $("#agentForm").serializeArray();
	var agentObjDto = {};
	for(var i in formDataArray){
		agentObjDto[formDataArray[i].name] = formDataArray[i].value;
	}
	agentObjDto.delflag = false;
	var startTime = new Date(agentObjDto.startDate).getTime();
	var endTime = new Date(agentObjDto.endDate).getTime();
	if(startTime>endTime){
		pop_tip_open("red","开始时间必须小于截止时间!");
		return;
	}
	if(agentObjDto.authorizedId == agentObjDto.authorizerId){
		pop_tip_open("red","授权人和代理人不能是一个人!");
		return;
	}
	
    if(agentObjDto.postScope=="2"){
    	var allPostData = postGrid.jqGrid().getRowData();
    	if(!allPostData || allPostData.length==0){
    		pop_tip_open("red","请指定代理授权的岗位范围!");
    		return;
    	}
    	var postList = new Array();
    	$.each(allPostData, function(index, item){
    		item.postId = item.id;
    		postList.push(item);
    	})
    	agentObjDto.postList = postList;
    }
	if(agentObjDto.flowScope=="2"){
		var allFlowData = flowGrid.jqGrid().getRowData();
    	if(!allFlowData || allFlowData.length==0){
    		pop_tip_open("red","请指定代理授权的模版范围!");
    		return;
    	}
    	var flowList = new Array();
    	$.each(allFlowData, function(index, item){
    		item.flName = item.name;
    		delete item.name;
    		delete item.businessObjectId;
    		delete item.busiObjectName;
    		delete item.code;
    		item.flId = item.id;
    		flowList.push(item);
    	})
    	agentObjDto.flowList = flowList;
    }
	////console.info("agentObjDto.flowList -----");
	//console.info("--->>> agentObjDto.postList="+JSON.stringify(agentObjDto.postList));
	delete agentObjDto._name;
	delete agentObjDto._id;
	if("-1" == agentObjDto.id){
		agentObjDto.status = "1";
		saveFormData(agentObjDto);
	}else{
		updateFormData(agentObjDto);
	}
}

/**
 * 更新业务对象的表单数据
 * @param busiObjDto
 */
function updateFormData(agentObjDto){
	$.ajax({
	       url: hostUrl+"flow/agent/update/"+agentObjDto.id,
	       data: JSON.stringify(agentObjDto),
	       type: 'PUT',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success: function (resultData ) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               
		           	try {
		        		if(window.opener && $.isFunction(window.opener.refreshJqGridData)) {
		        			window.opener.refreshJqGridData(agentObjDto.id);
		        		}
		        	} catch (e) {
		        		
		        	}
	               
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
function saveFormData(agentObjDto){
	$.ajax({
	       url: hostUrl+"flow/agent/save",
	       data: JSON.stringify(agentObjDto),
	       type: 'POST',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success:function (resultData ) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               //console.info(result);
	               var msg = resultData.msg;
	               opener.refreshJqGridData(result.id);
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
 * 授权人的回调函数处理事件
 * @param data
 * @param ele
 */
function authorizerCallback(data, ele){
	$("#authorizer").val(data.name);
	$("#authorizerId").val(data.id);
}

/**
 * 代理人的回调函数处理事件
 * @param data
 * @param ele
 */
function authorizedCallback(data, ele){
	$("#authorized").val(data.name);
	$("#authorizedId").val(data.id);
}


/**
 * 关闭按钮的点击事件
 */
function closeMe(){
	window.opener=null;
	window.open('','_self');
	window.close();
}

/**
 * 岗位的选择范围的处理事件
 * @param selVal
 */
function postScopeChange(selVal){
	if("1"==selVal){
		$("#partPostScope").css("display","none");
	}else{
		$("#partPostScope").css("display","block");
		queryAndShowPostData(agentId);
	}
	//$('html').getNiceScroll().show().resize();//重置纵向滚动条
}

/**
 * 岗位的选择范围删除处理事件
 */
function deletePost() {
	postGrid.jqGrid("delRowData", postLastSel);
}

/**
 * 岗位的选择范围选择处理事件
 */
function choosePost() {
	initPostChooseGrid();
	chooseType = "post";//选择岗位
	$("#modalTitle").html("选择授权岗位");//修改标题
	$("#modalWindow").modal("show");
	$("#flowCondition").hide();
	
	var userId = $("#authorizerId").val();
	////console.info("userId="+userId);
	queryAndShowOrgUserPostList(userId);
}

function flowScopeChange(selVal) {
	if("1"==selVal){
		$("#partFlowScope").css("display","none");
	}else{
		$("#partFlowScope").css("display","block");
		queryAndShowFlowData(agentId);
	}
	//$('html').getNiceScroll().show().resize();//重置纵向滚动条
}

/**
 * 查询和展示被监控的模板数据
 * @param setttingId
 */
function queryAndShowFlowData(agentId){//   
	var urlText = hostUrl+"flow/agentFl/queryAgentFlowList";
	var dataList = commonQueryAndReturnData(agentId, urlText);
	flowGrid.jqGrid('clearGridData',false);//先清除旧数据
	//console.info("-------------queryAndShowFlowData--------------------");
	//console.info(dataList);
	for(var i=0; i<dataList.length; i++){
		var itemData = dataList[i];
		itemData.id = itemData.code;
		flowGrid.jqGrid('addRowData', itemData.id , itemData);
	}
}

/**
 * 查询和展示被监控的模板数据
 * @param setttingId
 */
function queryAndShowPostData(agentId){//   
	var urlText = hostUrl+"flow/agentPost/queryAgentPostList";
//	var urlText = hostUrl+"flow/agentPost/queryList";
	var dataList = commonQueryAndReturnData(agentId, urlText);
	postGrid.jqGrid('clearGridData',false);//先清除旧数据
	//console.info("queryAndShowPostData dataList="+JSON.stringify(dataList));
	if(!dataList || dataList==null || dataList.length==0){
		return;
	}
	for(var i=0; i<dataList.length; i++){
		var itemData = dataList[i];
		itemData.id = itemData.postId;
		postGrid.jqGrid('addRowData', itemData.id , itemData);
	}
}

/**
 * 通用的数据查询接口
 * @param setttingId
 * @param urlText
 * @returns
 */
function commonQueryAndReturnData(agentId, urlText){
	var paramData = {agentId: agentId};
	var dataList;
	$.ajax({  
	       url: urlText,
	       data: JSON.stringify(paramData),
	       type: 'POST',
	       async: false,
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success: function (resultData ) {
	           if(resultData) {
	               dataList = resultData.result;
	           }
	       }
	});
	return dataList;
}


/**
 * 岗位的选择范围删除处理事件
 */
function deleteFlow() {
	flowGrid.jqGrid("delRowData",flowLastSel);
}

/**
 * 岗位的选择范围选择处理事件
 */
function chooseFlow() {
	initFlowChooseGrid();
	chooseType = "flow";//选择岗位
	$("#modalTitle").html("选择授权模板");//修改标题
	$("#modalWindow").modal("show");
	$("#flowCondition").show();
    searchFlowBusiObject();
}

/**
 * 提交模态弹出框的数据，并关闭窗口
 */
function submitAndCloseModelWindow(){
	var idText="";
	var postGrid = $("#"+chooseType+"ChooseGrid");
	chooseArray.splice(0,chooseArray.length);//先清空数据内的所有元素
	var rowIds = postGrid.jqGrid('getGridParam','selarrrow');
	$.each(rowIds, function(index, item){
		var rowData = postGrid.jqGrid('getRowData',item);
		if(chooseType == "flow"){// flName busiObjectName  code
			var item = {id: rowData.code, code:rowData.code, flName:rowData.name,
					busiObjectName: rowData.businessObjectName};
			//id替换为流程模板的code，为的是每次取得最新的模板
			chooseArray.push(item);
		}else{
			var item = {id: rowData.id, postName:rowData.name};
			chooseArray.push(item);
		}
	})
	var dataGrid = $("#"+chooseType+"DataGrid");
    dataGrid.jqGrid('clearGridData',false);//先清除旧数据
	//此处需要获取dataGrid已有的数据数组,进行重复性的校验
	var haveShowDataArray = dataGrid.jqGrid().getRowData();
	for(var i=0; i<=chooseArray.length; i++){
		var dataItem = chooseArray[i];
		if(dataItem){
			var existFlag = checkDataItemExistInArray(dataItem, haveShowDataArray);
			if(existFlag == "NO"){
				dataGrid.jqGrid('addRowData', dataItem.id, dataItem);
			}
		}
	}
	postGrid.jqGrid().setGridWidth(565, true);
	closeModelWindow();
}

function checkDataItemExistInArray(checkItem,showDataArray){
	var existFlag = "NO";
	for(var idx=0; idx<showDataArray.length; idx++){
		var item = showDataArray[idx];
		if(item.id == checkItem.id){
			existFlag = "YES";
			break;
		}
	}
	return existFlag;
}

/**
 * 关闭模态弹出框窗口
 */
function closeModelWindow(){
	$("#modalWindow").modal("hide");
	$('#modalWindow').find(".ui-jqgrid-bdiv").getNiceScroll().hide();
}

function initPostChooseGrid(){
	$("#choosePostDiv").show();
	$("#chooseFlowDiv").hide();
	
	postChooseGrid = $("#postChooseGrid");
	postChooseGrid.jqGrid({
		datatype : "local", 
		scroll  : true,  scrollrows:true,
		colModel : [ {name:'id', label:'ID', hidden:true}, {name:'name',label:'名称',align:"center"}],
		rowNum: -1,
		width:565,
		height:320,
        multiselect: true,//定义是否可以多选
        sortname: 'id',//默认的排序列
        sortorder: "desc",//排序方式,可选desc,asc
		gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
			$("#choosePostDiv .ui-widget-content").css({'overflow':'hidden'});
	    }
	});
}

function queryAndShowOrgUserPostList(userId){
    var postdata = {
		userId: userId,
		searchType: 'Post'
    }
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: hostUrl+"sys/org/orgnazation/userRPOM",
        dataType: "json",
        async: false,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	 var dataList = data.result.postDtoList;
        	 ////console.info(dataList);//id name;
        	 postChooseGrid.jqGrid('clearGridData',false);//先清除旧数据
        	 var name,id;
        	 var selPostIds = postGrid.jqGrid('getDataIDs');
    		 for(var i=0; i<dataList.length; i++){
    			 //拼接岗位全路径
    			 name = dataList[i].orgPrefixName + "/" + dataList[i].name;
    			 dataList[i].name = name;
    			 id =  dataList[i].id;
    			 postChooseGrid.jqGrid('addRowData', id, dataList[i]);
    			 if(selPostIds.indexOf(id) >= 0){
                     postChooseGrid.jqGrid('setSelection',id);
				 }
    			 //postChooseGrid.jqGrid('addRowData', i + 1, dataList[i]);
    		 }
			$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "查询业务系统的列表数据失败！");
            }
        }
    });
}

/**
 * 查询用户模板
 * @param postdata
 */
function queryUserFlows(postdata){
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: hostUrl+"flow/fl/queryFlowBusiObjectList",
        dataType: "json",
        async: false,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	 var dataList = data.result;
           	 flowChooseGrid.jqGrid('clearGridData',false);//先清除旧数据
            var selFlowCodes = $("#flowDataGrid").jqGrid('getDataIDs');
            var code,id;
            for(var i=0; i<dataList.length; i++){
                code = dataList[i].code;
                id = dataList[i].id;
                flowChooseGrid.jqGrid('addRowData',id , dataList[i]);
                if(selFlowCodes.indexOf(code) >= 0){
                    flowChooseGrid.jqGrid('setSelection',id);
                }
            }
			$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "查询用户模板列表数据失败！");
            }
        }
    });
}

function initFlowChooseGrid(){
	/*var flowKeyword = $("#flowKeyword").val();
	var busiKeyword = $("#busiKeyword").val();
    var userId = $("#authorizerId").val();
	var postData = { delflag:false, flowKeyword:flowKeyword, busiKeyword:busiKeyword, userId:userId};*/
	flowChooseGrid = $("#flowChooseGrid");
	$("#choosePostDiv").hide();
	$("#chooseFlowDiv").show();
	
	var colModel = [{name:'id',label:'ID',align:"center",hidden:true},
	            {name:'name',label:'名称',align:"center"},
	            {name:'businessObjectName',label:'业务对象',align:"center"},
	            {name:'code',label:'编码',align:"center"}];
    flowChooseGrid.jqGrid({
        datatype : "local",
        scroll  : true,  scrollrows:true,
        colModel : colModel,
		width:565,
		height:280,
        rowNum: -1,
        multiselect: true,//定义是否可以多选
        sortname: 'id',//默认的排序列
        sortorder: "desc",//排序方式,可选desc,asc
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
            $('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
			$("#chooseFlowDiv .ui-widget-content").css({'overflow':'hidden'});
        }

	});
}

function searchFlowBusiObject(){
    var flowKeyword = $("#flowKeyword").val();
    var busiKeyword = $("#busiKeyword").val();
    var userId = $("#authorizerId").val();
    var postScope = $("input[name='postScope']:checked").val();
    var postIds = [];
    var allPost = postGrid.jqGrid().getRowData();
    for(var i = 0 ;i<allPost.length ;i++){
    	var postId = allPost[i].id;
        postIds.push(postId);
	}
	if(postIds.length == 0){
        postIds.push("");
	}
    var postData = { delflag:false,
		flowKeyword:flowKeyword,
		busiKeyword:busiKeyword,
		userId:userId,
        postScope:postScope,
        postIds:postIds
    };
    queryUserFlows(postData);
	/*console.log(JSON.stringify(postData));
	
	$("#flowChooseGrid").jqGrid('setGridParam', {
        datatype: 'json', postData: postData,
    }).trigger("reloadGrid");*/
}
function initTwoGridTable(){
	var outerWidth= $("#dataGridTD").width();
	////console.info("outerWidth="+outerWidth+"; clientWidth=");
	postGrid = $("#postDataGrid");
	postGrid.jqGrid({
		datatype : "local",
		height  : 150,
		width :   outerWidth,
		scroll  : true,  scrollrows:true,
		colModel : [ {name:'id',    label:'ID', hidden:true}, {name:'postName', align: "center", label:'名称'}],
        onSelectRow: function (rowid, status) {//被选中的状态
            postLastSel = rowid;
        },
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
			gridWidthFn();
	    }
	});

	
	
	flowGrid = $("#flowDataGrid");
	flowGrid.jqGrid({
		datatype : "local",
		height  : 150,
		width :   outerWidth,
		scroll  : true,  scrollrows:true, 
        colModel : [ {name:'id',    label:'ID', hidden:true},  {name:'flName',align: "center", label:'模板名称'},
		             {name:'busiObjectName', align: "center", label:'业务对象'},  {name:'code', align: "center",label:'模板编码'}
		          ],
        onSelectRow: function (rowid, status) {//被选中的状态
        	flowLastSel = rowid;
        },
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
			gridWidthFn();
	    }
	});

}