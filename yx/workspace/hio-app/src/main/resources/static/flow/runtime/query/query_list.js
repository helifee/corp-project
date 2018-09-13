var selectType="starter";//选中类型 starter/ agent / approver  
var instanceGrid, agentGrid;
var sysAppList, busiObjectList;
var appId="-1", busiObjectId="-1", flowId="-1";
var currentPersonList; 
var selectedIds = "";
var fristAppId;
//默认不展开
var select1="0";
var select2="0";
var select3="0";
$(function() {
	initTwoQueryGridList();
	queryAppSystemList();
	initDatetimepicker();
	$.xljUtils.resizeNestedGrid();
});



//高级查询
$("#changeRightIcon").on("click",function(e){
	$(this).toggleClass("col");
	var colFlag = $(this).hasClass("col");
	if(colFlag){
		$('#changeRightIcon').addClass('fa-angle-down');
		$('#changeRightIcon').removeClass('fa-angle-up');
		$("#xj-form-content_"+selectType).hide();
	}else{
		$('#changeRightIcon').addClass('fa-angle-up');
		$('#changeRightIcon').removeClass('fa-angle-down');
		$("#xj-form-content_"+selectType).show();
	}
	$.xljUtils.resizeNestedGrid();
	$.xljUtils.gridResizeFn();
	
	
});
$(".senior-btn").on("click",function(e){
	var btnName=$("#highSearchBtn").html();
	if(btnName=='高级查询'){
		$("#highSearchBtn").html("收起");
		$('#highSearchClass').addClass('fa-angle-up');
		$('#highSearchClass').removeClass('fa-angle-down');
	}else{
		$("#highSearchBtn").html("高级查询");
		$('#highSearchClass').addClass('fa-angle-down');
		$('#highSearchClass').removeClass('fa-angle-up');
	}
	switch (selectType) {
	case "starter":
		if(select1=="0"){//不展开
			select1="1";
		}else{//展开
			select1="0";
		}
		break;
	case "approver":
		if(select2=="0"){//不展开
			select2="1";
		}else{//展开
			select2="0";
		}
		break;
	case "agent":
		if(select3=="0"){//不展开
			select3="1";
		}else{//展开
			select3="0";
		}
		break;
	default:
		break;
	}
	var p_obj = $(".condition-con:visible");
	$(p_obj).find(".senior-tr").toggleClass("hide");
	$.xljUtils.resizeNestedGrid();
	$.xljUtils.gridResizeFn();
	e.stopPropagation();
});

/**
 * 多页签切换
 */

$(".con-tit button").on("click",function(e){
	$("#instanceGrid").hide();
	$("#agentGrid").hide();
	var index = $(this).index();
	var name = $(this).attr("name");
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
    e.stopPropagation();
    selectType = name;
	$('#changeRightIcon').addClass('fa-angle-up');
	$('#changeRightIcon').removeClass('fa-angle-down');
	$('#changeRightIcon').removeClass('col');
    switch (selectType) {
	case "starter":
		if(select1=="0"){//不展开
			$("#highSearchBtn").html("高级查询");
			$('#highSearchClass').addClass('fa-angle-down');
			$('#highSearchClass').removeClass('fa-angle-up');
		}else{//展开
			$("#highSearchBtn").html("收起");
			$('#highSearchClass').addClass('fa-angle-up');
			$('#highSearchClass').removeClass('fa-angle-down');
		}
		break;
	case "approver":
		if(select2=="0"){//不展开
			$("#highSearchBtn").html("高级查询");
			$('#highSearchClass').addClass('fa-angle-down');
			$('#highSearchClass').removeClass('fa-angle-up');
		}else{//展开
			$("#highSearchBtn").html("收起");
			$('#highSearchClass').addClass('fa-angle-up');
			$('#highSearchClass').removeClass('fa-angle-down');
		}
		break;
	case "agent":
		if(select3=="0"){//不展开
			$("#highSearchBtn").html("高级查询");
			$('#highSearchClass').addClass('fa-angle-down');
			$('#highSearchClass').removeClass('fa-angle-up');
		}else{//展开
			$("#highSearchBtn").html("收起");
			$('#highSearchClass').addClass('fa-angle-up');
			$('#highSearchClass').removeClass('fa-angle-down');
		}
		break;

	default:
		break;
	}
    $("#xj-form-content_starter").hide();
    $("#xj-form-content_approver").hide();
    $("#xj-form-content_agent").hide();
    $("#xj-form-content_"+selectType+"").show();
    
	doSearchAction();
	$.xljUtils.resizeNestedGrid();
	$.xljUtils.gridResizeFn();
	$('.ui-jqgrid').removeAttr('style');
	var colFlag = $("#showHiddenSpan").hasClass("col");
	if(colFlag){
		$("#showHiddenSpan").toggleClass("col");
	}
});



function emptyDateObject(dateIdText){
	$("#"+dateIdText).val("");
}
/**
 * 重置查询条件
 */
//TODO
function resetFrom(){
	switch (selectType) {
	case "starter":
		//按发起人
		$("#name1").val('');
		$("#status1").val('-1');
		$("#starter").val("");
		$("#starterId").val("");
		$("#startDate1_1").val("");
		$("#endDate1_1").val("");
		appIdChange('1',fristAppId);
		emptyBusiObject('1');
		$("#code1").val("");
		$("#orgName1").val("");
		$("#orgId1").val("");
		$("#startDate2_1").val("");
		$("#endDate2_1").val("");
		break;
	case "approver":
		//按审批人
		$("#name2").val('');
		$("#status2").val('-1');
		$("#approver").val("");
		$("#approverId").val("");
		$("#approveStatus").val("-1");
		
		$("#startDate1_2").val("");
		$("#endDate1_2").val("");
		appIdChange('2',fristAppId);
		emptyBusiObject('2');
		$("#code2").val("");
		$("#orgName2").val("");
		$("#orgId2").val("");
		$("#startDate2_2").val("");
		$("#endDate2_2").val("");
		break;
	case "agent":
		//按代理
		$("#agentName").val('');
		$("#authorizer").val("");
		$("#authorizerId").val("");
		$("#authorized").val("");
		$("#authorizedId").val("");
		$("#name3").val("");
		appIdChange('3',fristAppId);
		emptyBusiObject('3');
		$("#flowId3").val("-1");
		$("#code3").val("");
		break;

	default:
		break;
	}
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


//初始化日期控件
function initDatetimepicker(){
  $('.form_datetime').datetimepicker({
	  language: 'zh-CN', //语言
	  format: 'yyyy-mm-dd',//显示格式  HH:ii:ss
	  minView: "month",//设置只显示到月份
	  initialDate: new Date(),//初始化当前日期
	  autoclose: true,//选中自动关闭
	  todayBtn: true//显示今日按钮 
  });
}


function initTwoQueryGridList(){
	instanceGrid = $("#instanceGridList");
	var paramData1 = {appId:"-1"};
	var urlText1 = serviceUrl+"flow/instance/queryInstanceBy"; //;
	var colModel1 = [ {name:'groupId',  hidden:true},  
	                  {name:'postId',  hidden:true}, {name:'participantId',  hidden:true},
	                {name:'appId',  label:'系统名称', width:"75",  align:"left",  hidden:true},
	                {name:'appName',  label:'系统名称', width:"75",  align:"left"},
	                {name:'busiObjectName',  label:'业务对象', width:"125", align:"left"},
	                {name:'name',  label:'流程标题', width:"200",  align:"left" , formatter: instanceFormatter },
	                //{name:'flowBusinessCompanyId',  label:'所属公司',  width:"100",  align:"center"},
	                {name:'currentApprovers',  label:'当前审批人', width:"150",   align:"left"  },
	                {name:'status',   label:'流程状态',   width:"75", align:"left" , formatter: statusformatter},
	                {name:'startUserName',  label:'发起人', width:"75",  align:"left"},
	                {name:'startDate',  label:'发起时间',  width:"125",   align:"left" }];
	initSingleGrid(instanceGrid, paramData1, urlText1, colModel1, "instanceGridPager");
	//startUserName flowBusinessCompanyName
	agentGrid = $("#agentGridList");
	var urlText2 = serviceUrl+"flow/agent/queryAgentInstanceList";//
	var paramData2 = {appId:"-1" };
	var colModel2 = [{name:'id',      label:'id', hidden:true},
	                 {name:'agentId',  label:'agentId',  hidden:true},
	                 {name:'pcUrl',  label:'pcUrl',  hidden:true},
	                 {name:'flCode',  label:'flCode',  hidden:true},
	                 {name:'flCode',  label:'flCode',  hidden:true},
	                 {name:'flCode',  label:'flCode',  hidden:true}, 
	                 {name:'businessObjectId',  label:'businessObjectId',        hidden:true},
	                 {name:'businessId',  label:'businessId',        hidden:true},
	                 {name:'customFormId',  label:'customFormId',        hidden:true},
	                 
	                 {name:'name',    label:'流程代理标题', align:"left"},
	                 {name:'instanceName',  label:'流程标题',  align:"left",formatter: instanceFormatter },
	                 {name:'busiObjectName', label:'业务对象',  align:"left"},
	                 {name:'authorizer',    label:'授权人',  align:"left"},
	                 {name:'authorized',     label:'代理人', align:"left"},
	                 {name:'currentApprovers',     label:'当前审批人', align:"left"},
	                 {name:'startUserName',     label:'发起人',  align:"left"},
	                 {name:'startDate',     label:'发起时间', align:"left"},
	                 ];
	initSingleGrid(agentGrid, paramData2, urlText2, colModel2, "agentGridPager");
}

function initSingleGrid(itemGrid, postParam, urlText, colModel, pagerIdText){
	itemGrid.jqGrid( {//创建jqGrid组件
        url : urlText, 
        postData : postParam,
        datatype : "json", 
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        mtype : "post", 
        //jsonReader : { root:"result" },
        jsonReader: {
            repeatitems: false
        },
        colModel : colModel,    
     //   rowNum : 20,//在grid上显示记录条数，这个参数是要被传递到后台
        viewrecords : true, //定义是否要显示总记录数
       	multiselect:true,//定义是否可以多选
        pager: '#'+pagerIdText,//定义翻页用的导航栏，必须是有效的html元素            
        rowNum: 20,//在grid上显示记录条数，这个参数是要被传递到后台
        rowList:  [20, 50, 100, 200], //可供用户选择一页显示多少条
        viewrecords: true, //定义是否要显示总记录数
       	gridComplete: function() {//当表格所有数据都加载完成
       		$('.ui-state-default.ui-jqgrid-hdiv').css({'overflow':'hidden','margin-top':'8px'});
        	$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
	    },
        loadError: function(xhr, status, error){
        	
        }
    });
}

//格式化流程标题的显示
function instanceFormatter(cellvalue, options, rowObject) {
	//businessObjectCode  businessId  customFormId
	var status = rowObject.status;
	var businessObjectId = rowObject.businessObjectId;
	var businessId = rowObject.businessId;
	var customFormId = rowObject.customFormId;
	//return "<a id='" +options.rowId+ "_a' href='javaScript:void(0);' style='font-weight: bold;color:#3c8dbc;' onclick='adminInstance(\""+rowObject.id+"\,\""+rowObject.status+"\");'>"+cellvalue+"</a>";  
	return '<a id=\'' +options.rowId+ '_a\' href=\'javaScript:void(0);\' style=\'font-weight: bold;color:#3c8dbc;\''
	+' onclick="adminInstance(\''+rowObject.id+'\',\''+status+'\',\''+businessObjectId+'\',\''+businessId+'\');">'+cellvalue+'</a>';        
}

function adminInstance(instanceId, status, businessObjectId, businessId){
	var businessObjectDto;
    $.ajax({
        type: "get",
        url: serviceUrl + "flow/businessObject/get/" + businessObjectId,
        dataType: "json",
        async: false,
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	businessObjectDto = data.result;
        },
        error: function (data) {
        	$.xljUtils.getError(xhr.status);
        }
    });

	var url = serviceUrl+"flow/runtime/approve/flow.html?instanceId=" + instanceId
			 + "&time=" + new Date().getTime();
	openWin(url);
}


/**
 * 流程状态的格式化数据
 * @param cellvalue: 该字段的值
 * @param options:
 * @param rowObject
 * @returns {String} 返回业务系统的名称
 */
function statusformatter(cellvalue, options, rowObject) {
    if(cellvalue == "1"){
    	return "流程审批中";
    }else if(cellvalue == "2"){
    	return "流程完成";
    }else if(cellvalue == "3"){
    	return "流程撤回";
    }else if(cellvalue == "4"){
    	return "流程打回";
    }else if(cellvalue == "7"){
    	return "流程作废";
    }else if(cellvalue == "9"){
    	return "流程挂起";
    }
}

/**
 * 业务系统的格式化数据
 * @param cellvalue: 该字段的值
 * @param options:
 * @param rowObject
 * @returns {String} 返回业务系统的名称
 */
function systemformatter(cellvalue, options, rowObject) {
    var systemName = "";
	if(sysAppList && sysAppList.length>0) {
		$.each(sysAppList, function (index, item) {//遍历mapList的数组数据
			if (item.id == cellvalue) {
				systemName = item.name;
			}
		});//$.each(appList
	}
    return systemName;
}

function currentPersonformatter(cellvalue, options, rowObject){
	var instanceId = rowObject.id;
	var personNameText = "";
	for(var idx=0; idx<currentPersonList.length; idx++){
		var taskDto = currentPersonList[idx];
		if(taskDto.instanceId == instanceId){
			personNameText = taskDto.currentPersonNameText;
			break;
		}
	}
	return personNameText;
}

function objectformatter(cellvalue, options, rowObject) {
    var objectName = "";
    for(var idx=0; idx<busiObjectList.length;idx++){
    	var item = busiObjectList[idx];
    	if (item.id == cellvalue) {
        	objectName = item.name;
        	break;
        }
    }
    if(objectName==null || objectName==""){
    	objectName = $("#busiObjectId").find("option:selected").text();
    }
    return objectName;
}

function emptyBusiObject(type){
	$("#busiObjectId"+type).val("");
	$("#busiObjectName"+type).val("");
	$("#flowId"+type).empty().append("<option value='-1'>请选择</option>");
}

/**
 * 查询按钮的点击事件
 */
function doSearchAction(){
	var type = "1";
	if(selectType=="approver"){
		type = "2";
	}else if(selectType=="agent"){
		type = "3";
	}

	var postData = instanceGrid.jqGrid("getGridParam", "postData");
	for(var key in postData){
		delete postData[key];
	}

	var busiObjectIdVal = $("#busiObjectId"+type).val();

	var paramData = { appId:$("#appId"+type).val(),
			          flowId: $("#flowId"+type).val(), name:$("#name"+type).val(), code:$("#code"+type).val(),
			          serialNo: $("#serialNo" + type).val()};
	if(busiObjectIdVal!=''){
		paramData.busiObjectIdList = busiObjectIdVal.split(',');
	}
	paramData.start = 0;
	paramData.page = 1;
	if(selectType=="starter" || selectType=="approver"){//选中的是starter/approver
		paramData.status = $("#status"+type).val();
		
		paramData.orgId = $("#orgId"+type).val();
		if(selectType=="starter" ){
			paramData.approverId ='';
			paramData.starterId = $("#starterId").val();
			paramData.approveStatus = '';
		}
		if(selectType=="approver" ){
			paramData.starterId ='';
			paramData.approverId = $("#approverId").val();
			paramData.approveStatus = $("#approveStatus").val();
		}
		
		var startDate1 = $("#startDate1_"+type).val();
		if(startDate1 && startDate1.length == 10){
			startDate1 = startDate1 + " 00:00:00";
		}else{
			startDate1 = "";
		}
		var endDate1 = $("#endDate1_"+type).val();
		if(endDate1 && endDate1.length == 10){
			endDate1 = endDate1 + " 23:59:59";
		}else{
			endDate1 = "";
		}
		
		if(startDate1!="" && endDate1!="" && startDate1>endDate1){
			pop_tip_open('red', "流程发起的开始时间不能大于流程发起的截止时间！");
			return;
		}
		
		var startDate2 = $("#startDate2_"+type).val();
		if(startDate2 && startDate2.length == 10){
			startDate2 = startDate2 + " 00:00:00";
		}else{
			startDate2 = "";
		}
		var endDate2 = $("#endDate2_"+type).val();
		if(endDate2 && endDate2.length == 10){
			endDate2 = endDate2 + " 23:59:59";
		}else{
			endDate2 = "";
		}
		if(startDate2!="" && endDate2!="" && startDate2>endDate2){
			pop_tip_open('red', "流程结束的开始时间不能大于流程结束的截止时间！");
			return;
		}
		
		paramData.startDate1 = startDate1;
        paramData.endDate1 = endDate1;
        paramData.startDate2 = startDate2;
        paramData.endDate2 = endDate2;
		postData = paramData;

		$("#instanceGrid").show();
		instanceGrid.jqGrid('setGridParam', {datatype: 'json', postData: postData,page:1 }).trigger("reloadGrid");
		setTimeout(function () { $.xljUtils.addGridScroll(); },1000);
		
	}else{//选中的是agent
		paramData.agentName = $("#agentName").val();;
		paramData.authorizerId = $("#authorizerId").val();
		paramData.authorizedId =  $("#authorizedId").val();
		postData = paramData;
		$("#agentGrid").show();
		agentGrid.jqGrid('setGridParam', { datatype: 'json', postData: postData ,page:1}).trigger("reloadGrid");
		setTimeout(function () { $.xljUtils.addGridScroll(); },1000);
	}
}


/**
 * 替换人的回调函数处理事件
 * @param data
 * @param ele
 */
function replacerCallback(data, ele){
	$("#replacer").val(data.name);
	$("#replacerId").val(data.id);
	$("#replacerType").val(data.mold);
}

function orgCallback(data, ele){
	if(data && data.length>0){
		var orgName="";
		var orgId="";
		for(var idx=0; idx<data.length; idx++){
			orgName+= data[idx].name+",";
			orgId+= data[idx].id+",";
		}
		orgName = orgName.substr(0, orgName.length-1);
		orgId = orgId.substr(0, orgId.length-1);
		$("#orgName").val(orgName);
		$("#orgId").val(orgId);
	}
}

function emptyOrgObject(type){
	$("#orgName"+type).val("");
	$("#orgId"+type).val("");
}

function emptyStarterObject(){
	$("#starter").val("");
	$("#starterId").val("");
}

function emptyApproverObject(){
	$("#approverId").val("");
	$("#approver").val("");
}

function emptyCommonObject(dataIdText){
	$("#"+dataIdText+"Id").val("");
	$("#"+dataIdText).val("");
}

function starterCallback(data, ele){
	if(data && data.length>0){
		var itemName="";
		var itemId="";
		for(var idx=0; idx<data.length; idx++){
			var userId = data[idx].userId;
			userId = (!userId||userId=='')?data[idx].id:userId;
			itemName+= data[idx].name+",";
			itemId+= userId+",";
		}
		itemName = itemName.substr(0, itemName.length-1);
		itemId = itemId.substr(0, itemId.length-1);
		$("#starter").val(itemName);
		$("#starterId").val(itemId);
	}
}

function approverCallback(data, ele){
	if(data && data.length>0){
		var itemName="";
		var itemId="";
		for(var idx=0; idx<data.length; idx++){
			var userId = data[idx].userId;
			userId = (!userId||userId=='')?data[idx].id:userId;
			itemName+= data[idx].name+",";
			itemId+= userId+",";
		}
		itemName = itemName.substr(0, itemName.length-1);
		itemId = itemId.substr(0, itemId.length-1);
		$("#approver").val(itemName);
		$("#approverId").val(itemId);
	}
}
   


/**
 * 查询所有业务系统的静态数据
 */
function queryAppSystemList() {
    var postdata = {
    	appDelFlag: "0",
        appStatus: "1"	
    };
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: serviceUrl+"sys/res/appSystem/queryList",
        dataType: "json",
        async: true,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	sysAppList = data.result;
        	if(sysAppList && sysAppList.length>0){
        		fristAppId = sysAppList[0].id;
        	}
        	$("#appId1").empty();
        	$.each(sysAppList, function(index, item){
        		$("#appId1").append("<option value='"+item.id+"'>"+item.name+"</option>");
        	});
        	$("#appId1").append("<option value='-1'  selected='selected'>全部</option>");
        	$("#appId2").empty();
        	$.each(sysAppList, function(index, item){
        		$("#appId2").append("<option value='"+item.id+"'>"+item.name+"</option>");
        	});
        	$("#appId2").append("<option value='-1'  selected='selected'>全部</option>");
        	$("#appId3").empty();
        	$.each(sysAppList, function(index, item){
        		$("#appId3").append("<option value='"+item.id+"'>"+item.name+"</option>");
        	});
        	$("#appId3").append("<option value='-1'  selected='selected'>全部</option>");
        	doSearchAction();
        	init_xljSingleArraySelector('1');
        	init_xljSingleArraySelector('2');
        	init_xljSingleArraySelector('3');
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "查询业务系统的列表数据失败！");
            }
        }
    });//end-for $.ajax({
}

function init_xljSingleArraySelector(type){
//	$('.singleArray-first').xljSingleArraySelector({
	/*$('#tree_0'+type).xljSingleArraySelector({
	    selectorTypeArray:['busiObject'],
	    selectorType:'busiObject',
	    appId : $("#appId"+type).val(),
	    treeUrl: serviceUrl+'flow/businessObject/getCategoryTreeBySystemApp?time='+Math.random(),
	    targetId: 'busiObjectId'+type, //选择的数据的ID存储input域  
	    targetName: 'busiObjectName'+type, //选择的数据的Name存储input域
	    saveCallback: function(selectData,selectArray,ele){
	    	$("#flowId"+type).empty().append("<option value='-1'>请选择</option>");
	    	var busiObjectId = $("#busiObjectId"+type).val();
	    	queryFlowViewList(busiObjectId,type);
	    }
	});*/

	$('#tree_0'+type).xljMultipleSelector({
		title:'选择业务对象',
		selectorType:'businessObject',
		treeUrl: serviceUrl+'flow/businessObject/getCategoryTreeBySystemApp?time='+Math.random(),
		treeParam:{"appDelFlag":false,"menuDelFlag":false,"delflag":false},
		treeSettings:{
			data:{
				simpleData:{
					enable:true,
					idKey:'id',
					pIdKey:'parentId',
					rootPId:null
				}
			}
		},
		targetId: 'busiObjectId'+type, //选择的数据的ID存储input域
		targetName: 'busiObjectName'+type, //选择的数据的Name存储input域
		gridColNames:['ID','名称'],
		gridColModel:[
			{name : 'id',width : 100,align : "center",hidden : true},
			{name : 'name',width : 90,align : "center"}
		],
		saveCallback: function(selectData,selectArray,ele){
			$("#flowId"+type).empty().append("<option value='-1'>请选择</option>");
			var busiObjectId = $("#busiObjectId"+type).val();
			queryFlowViewList(busiObjectId.split(','),type);
		}
	});
}

/**
 * 查询某个appID下所有的业务对象静态数据
 */
function queryBusiObjectList(paramId) {
	var postdata = { delflag: false };
	if(paramId != "-1"){
		postdata.appId = paramId;
	}
    
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: serviceUrl+"flow/businessObject/queryList",
        dataType: "json",
        async: false,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	busiObjectList = data.result;
        	$("#busiObjectId").empty();
        	$("#busiObjectId").append("<option value='-1'>请选择</option>");
        	$.each(busiObjectList, function(index, item){
        		$("#busiObjectId").append("<option value='"+item.id+"'>"+item.name+"</option>");
        	});
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "查询业务系统的列表数据失败！");
            }
        }
    });//end-for $.ajax({
}

function appIdChange(type, that){
	if(that.value){
		appId = that.value;
	}else{
		appId=that;
		$("#appId"+type).val(appId);
	}
	//queryBusiObjectList(appId);
	$("#busiObjectName"+type).val("");  
	$("#busiObjectId"+type).val("");  
	$("#flowId"+type).empty().append("<option value='-1'>请选择</option>");
//	$('#tree_0'+type).xljSingleArrayDraw({
		/*$('#tree_0'+type).xljSingleArrayDraw({
		selectArray: ['busiObject'],
		selectType:'busiObject',
		appId : appId,
		treeNO : parseInt(type)-1,
	    treeUrl: serviceUrl+'flow/businessObject/getCategoryTreeBySystemApp?time='+Math.random(),
	    targetId: 'busiObjectId'+type, //选择的数据的ID存储input域  
	    targetName: 'busiObjectName'+type, //选择的数据的Name存储input域
	    saveCallback: function(selectData,selectArray,ele){
	    	$("#flowId"+type).empty().append("<option value='-1'>请选择</option>");
	    	var busiObjectId = $("#busiObjectId"+type).val();
	    	queryFlowViewList(busiObjectId,type);
	    }
		},$('#tree_0'+type));*/
//	},$('#tree_0'+type));
	$('#tree_0'+type).xljMultipleSelectorReset({
		title:'选择业务对象',
		selectorType:'businessObject',
		treeUrl: serviceUrl+'flow/businessObject/getCategoryTreeBySystemApp?time='+Math.random(),
		treeParam:{"appId":appId,"appDelFlag":false,"menuDelFlag":false,"delflag":false},
		treeSettings:{
			data:{
				simpleData:{
					enable:true,
					idKey:'id',
					pIdKey:'parentId',
					rootPId:null
				}
			}
		},
		targetId: 'busiObjectId'+type, //选择的数据的ID存储input域
		targetName: 'busiObjectName'+type, //选择的数据的Name存储input域
		gridColNames:['ID','名称'],
		gridColModel:[
			{name : 'id',width : 100,align : "center",hidden : true},
			{name : 'name',width : 90,align : "center"}
		],
		saveCallback: function(selectData,selectArray,ele){
			$("#flowId"+type).empty().append("<option value='-1'>请选择</option>");
			var busiObjectId = $("#busiObjectId"+type).val();
			queryFlowViewList(busiObjectId.split(','),type);
		}
	});
}

function busiObjectIdChange(that){
	busiObjectId = that.value;
	queryFlowViewList(busiObjectId);
}

/**
 *  查询某个busiObjectId下所有的模板视图数据
 */
function queryFlowViewList(paramId,type) {
	var postdata = { delflag: false };
	if(paramId != "-1"){
		postdata.businessObjectIdList = paramId;
//		postdata.busiObjectId = paramId;
	}
    
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: serviceUrl+"flow/fl/queryViewList",
        dataType: "json",
        async: false,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	busiObjectList = data.result;
        	$("#flowId"+type).empty();
        	$("#flowId"+type).append("<option value='-1'>请选择</option>");
			if(busiObjectList){
				$.each(busiObjectList, function(index, item){
					$("#flowId"+type).append("<option value='"+item.id+"'>"+item.name+"</option>");
				});
			}

        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "查询业务系统的列表数据失败！");
            }
        }
    });//end-for $.ajax({
}

function batchModifyReader(){
	
	if(selectType == "agent"){
		selectedIds = agentGrid.jqGrid('getGridParam','selarrrow');
	}else{
		selectedIds = instanceGrid.jqGrid('getGridParam','selarrrow');
	}
		
	if(selectedIds && selectedIds.length>0){
    	var url = encodeURI(serviceUrl+"flow/runtime/query/batch_modify_reader.html");
    	openWin(url);
    }else{
    	pop_tip_open('blue', "请选择至少一条流程实例");
    }
	
}