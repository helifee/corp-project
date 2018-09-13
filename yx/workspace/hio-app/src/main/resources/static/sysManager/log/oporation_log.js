/** 
 * 操作日志
 * @author add by gyh
 * @date 2017-4-14
 */

var menuOnId;
var opeLogGridObj;
/**
 * 加载操作日志列表
 */
function initopeLogGridObj(appId){
	var ubody = "sys/log/logOperation/vaguePage";
	var uall = serviceUrl+ubody;
	var postdata={
			delflag:"0"
	}
	//创建jqGrid组件
	opeLogGridObj = jQuery("#opeLogList").jqGrid(
			{
				url: uall,
				ajaxGridOptions: { contentType: 'application/json' },
				mtype : "POST",  
				contentType : "application/json",  
				postData:postdata,
				datatype : "json", 
	            jsonReader : {
		            repeatitems : false  
		        },
	            rownumbers: true,
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'id',label : '序号',width : 85,align : "center",hidden : true},
				             {name : 'sysCode',index:'t.sys_code',label : '所属系统Id',width : 80,align : "center",hidden : true},
			                 {name : 'appName',index:'a.`name`',label : '所属系统',width : 80,align : "center"},
			                 {name : 'loginName',index:'login_name',label : '登录名',width : 100,align : "center"},
			                 {name : 'name',label : '姓名',width : 80,align : "center"},
			                 {name : 'comId',index:'com_id',label : '所在公司id',width : 80,align : "center",hidden : true},
			                 {name : 'comName',index:'com_name',label : '所在公司',width : 120,align : "center"},
			                 {name : 'loginIp',index:'login_ip',label : '登录ip',width : 100,align : "center"},
			                 {name : 'loginBrowser',index:'login_browser',label : '登录浏览器',width : 100,align : "center"},
			                 {name : 'operationTime',index:'operation_time',label : '操作时间',width : 150,align : "center"},
			                 //{name : 'operationTypeId',label : '操作类型ID',width : 100,align : "center", hidden : true},
			                 {name : 'operationTypeId',index:'operation_type_id',label : '操作类型',width : 100,align : "center",formatter:opeTypeFmatter},
			                 {name : 'node',label : '操作',width : 200,align : "center"},
			                 {name : 'note',label : '操作记录内容',width : 180,align : "center",formatter:function (cellvalue, options, rowObject) {

								 return '<a href="javascript:void(0);" onclick="showNote(\''+rowObject.id+'\')">'+$.xljUtils.escapeHtml(cellvalue)+'</a>';
							 }}
	             ],
	             rownumWidth:55,
	             rowNum : 20,//一页显示多少条
	             rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
	             pager : '#opeLogPager',//表格页脚的占位符(一般是div)的id
	             /*ondblClickRow:function(rowid){
	            	 editType=1;
	            	 updateMenuId = rowid;
	            	 window.open("menu_edit.html");
	             },*/
	             loadError:function(xhr,status,error){
	            	 $.xljUtils.tip("red","加载操作日志列表请求失败");
	             },
	             gridComplete: function(){
	               	$.xljUtils.addGridScroll();
	             	$.xljUtils.gridResizeFn();
	             },
	             sortname : 'create_date',//初始化的时候排序的字段
	             sortorder : "desc",//排序方式,可选desc,asc
//				             mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
	             viewrecords : true
			}).navGrid('#opeLogPager', { add: false, edit: false, del: false,search:false,refresh:false });
}

function showNote(rowId) {
	var rowData = $('#opeLogList').jqGrid('getRowData',rowId);
	$('#showContentModal').find('.modal-body').html($.xljUtils.escapeHtml(rowData.note));
	$('#showContentModal').modal({
		backdrop:'static',
		show:true
	});
}

/**
 * 查询操作日志
 */
function opeSearch(){
	var selApp=$('#appId option:selected').val();//选中app
	selApp=selApp.split("_");
	var uName=$("#uName").val();
	var opeTypeId=$("#opeTypeId").val();
	var startTime=$("#datetimepick_start").val();
	var endTime=$("#datetimepick_end").val();
	var jsonData={
			sysCode:selApp[0],
			sysId:selApp[1],
			opeTypeId:opeTypeId,
			startTime:startTime,
			endTime:endTime,
			uName:uName
	};
//	console.log(jsonData);
	opeLogGridObj.jqGrid("setGridParam", { postData: jsonData ,datatype:'json',page:1}).trigger("reloadGrid");
}


/**
 * 加载系统下拉框
 */
function getAppData(){
	var ubody = "sys/res/appSystem/queryList";
	var uall = serviceUrl+ubody;
	var postdata ={
			appDelFlag:"0",
			appStatus:"1"
	};
	$.ajax({
		type:'post',
		url:uall,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postdata),
		success: function(data) {
			if(data.success){
				if(data.result){	
					var appList=data.result;
					$("#appId").append("<option value=''>全部</option>");
					/*var queryData2={
							menuDelFlag:"0",
							appId:appList[0].id
					};
					opeLogGridObj.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");*/
					for(var o in appList){
//						$("#appId").append("<option value='"+appList[o].code+"'>"+appList[o].name+"</option>")
						$("#appId").append("<option value='"+appList[o].id+"_"+appList[o].code+"'>"+appList[o].name+"</option>")
					}
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","加载系统下拉框请求失败");
		}
	})
}



/**
 * 数据格式化
 */
function opeTypeFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "登录/退出";
	}else if(cellvalue == "2"){
		return "租户注册";
	}else if(cellvalue == "3"){
		return "打开菜单";
	}else if(cellvalue == "4"){
		return "业务操作";
	}
}

/**
 * 格式化样式
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
	if(rowObject.status == "0" ){
		return "style='color:red'";
	}
}

//TODO dubbo日志
/**
 * 加载dubbo日志列表
 */
function initdubboLogGridObj(){
	var ubody = "sys/log/logDubbo/vaguePage";
	var uall = serviceUrl+ubody;
	var postdata={
			delflag:"0"
	}
	//创建jqGrid组件
	dubboLogGridObj = jQuery("#dubboLogList").jqGrid(
			{
				url: uall,
				ajaxGridOptions: { contentType: 'application/json' },
				mtype : "POST",  
				contentType : "application/json",  
				postData:postdata,
				datatype : "json", 
	            jsonReader : {
		            repeatitems : false  
		        },
	            rownumbers: true,
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
			                 {name : 'sysCode',index:'t.sys_code',label : '所属平台Code',width : 80,align : "center",hidden : true},
			                 {name : 'appId',index:'a.id',label : '所属平台Id',width : 80,align : "center",hidden : true},
			                 {name : 'appName',index:'a.`name`',label : '所属平台',width : 80,align : "center"},
			                 {name : 'dubboMethod',index:'t.dubbo_method',label : '接口名称',width : 120,align : "center"},
			                 {name : 'startTime',index:'t.start_time',label : '开始运行时间',width : 80,align : "center"},
			                 {name : 'endTime',index:'t.end_time',label : '结束运行时间',width : 80,align : "center"},
			                 {name : 'executeTime',index:'t.execute_time',label : '耗时',width : 80,align : "center"},
			                 {name : 'resFlag',index:'t.res_flag',label : '是否成功',width : 60,align : "center",formatter:isSuccessFmatter},
			                 {name : 'info',index:'t.info',label : '信息描述',width : 120,align : "center"},
			                 {name : 'returnContent',index:'t.return_content',label : '返回内容',width : 120,align : "center"}
	             ],
	             rownumWidth:55,
	             rowNum : 20,//一页显示多少条
	             rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
	             pager : '#dubboLogPager',//表格页脚的占位符(一般是div)的id
	             /*ondblClickRow:function(rowid){
	            	 editType=1;
	            	 updateMenuId = rowid;
	            	 window.open("menu_edit.html");
	             },*/
	             loadError:function(xhr,status,error){
	            	 $.xljUtils.tip("red","加载dubbo日志列表请求失败");
	             },
	             gridComplete: function(){
	               	$.xljUtils.addGridScroll();
	             	$.xljUtils.gridResizeFn();
	             },
	             sortname : 't.create_date',//初始化的时候排序的字段
	             sortorder : "desc",//排序方式,可选desc,asc
	             viewrecords : true
			}).navGrid('#dubboLogPager', { add: false, edit: false, del: false,search:false,refresh:false });
}
/**
 * 加载系统下拉框
 */
function  getDubboAppData(){
	var ubody = "sys/res/appSystem/queryList";
	var uall = serviceUrl+ubody;
	var postdata ={
			appDelFlag:"0",
			appStatus:"1"
	};
	$.ajax({
		type:'post',
		url:uall,
		dataType:'json',
		contentType:'application/json',
		data:JSON.stringify(postdata),
		success: function(data) {
			if(data.success){
				if(data.result){	
					var appList=data.result;
					$("#appId_dubbo").append("<option value=''>全部</option>");
					$("#appId_task").append("<option value=''>全部</option>");
					for(var o in appList){
						$("#appId_dubbo").append("<option value='"+appList[o].code+"'>"+appList[o].name+"</option>")
						$("#appId_task").append("<option value='"+appList[o].code+"'>"+appList[o].name+"</option>")
					}
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","加载系统下拉框请求失败");
		}
	})
}
/**
 * 查询dubbo日志
 */
function dubboSearch(){
	var selAppCode=$('#appId_dubbo option:selected').val();//选中appCode
	var resFlag=$('#resFlag').val();
	var startTime=$("#do_datetimepick_start").val();
	var endTime=$("#do_datetimepick_end").val();
	var jsonData={
			sysCode:selAppCode,
			resFlag:resFlag,
			startTime:startTime,
			endTime:endTime
	};
	console.log(jsonData);
	dubboLogGridObj.jqGrid("setGridParam", { postData: jsonData ,datatype:'json',page:1}).trigger("reloadGrid");
}

/**
 * 是否成功
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function isSuccessFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "0"){
		return "否";
	}else if(cellvalue == "1"){
		return "是";
	}else{
		return "";
	}
}


//TODO task日志
/**
 * 加载task日志列表
 */
function initTaskLogGridObj(){
	var ubody = "sys/log/logTask/vaguePage";
	var uall = serviceUrl+ubody;
	var postdata={
			delflag:"0"
	}
	//创建jqGrid组件
	taskLogGridObj = jQuery("#taskLogList").jqGrid(
			{
				url: uall,
				ajaxGridOptions: { contentType: 'application/json' },
				mtype : "POST",  
				contentType : "application/json",  
				postData:postdata,
				datatype : "json", 
	            jsonReader : {
		            repeatitems : false  
		        },
	            rownumbers: true,
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
			                 {name : 'sysCode',index:'t.sys_code',label : '所属平台Code',width : 80,align : "center",hidden : true},
			                 {name : 'appId',index:'a.id',label : '所属平台Id',width : 80,align : "center",hidden : true},
			                 {name : 'appName',index:'a.`name`',label : '所属平台',width : 80,align : "center"},
			                 {name : 'taskCode',index:'t.task_code',label : '自动任务编码',width : 120,align : "center"},
			                 {name : 'taskName',index:'t.task_name',label : '自动任务名称',width : 120,align : "center"},
			                 {name : 'startTime',index:'t.start_time',label : '开始运行时间',width : 80,align : "center"},
			                 {name : 'endTime',index:'t.end_time',label : '结束运行时间',width : 80,align : "center"},
			                 {name : 'executeTime',index:'t.execute_time',label : '耗时（ms）',width : 80,align : "center"},
			                 {name : 'executeStatus',index:'t.execute_status',label : '是否成功',width : 60,align : "center",formatter:isSuccessFmatter},
			                 {name : 'runInfo',index:'t.run_info',label : '信息描述',width : 120,align : "center"}
	             ],
	             rownumWidth:55,
	             rowNum : 20,//一页显示多少条
	             rowList : [ 20,50,100,200],//可供用户选择一页显示多少条
	             pager : '#taskLogPager',//表格页脚的占位符(一般是div)的id
	             /*ondblClickRow:function(rowid){
	            	 editType=1;
	            	 updateMenuId = rowid;
	            	 window.open("menu_edit.html");
	             },*/
	             loadError:function(xhr,status,error){
	            	 $.xljUtils.tip("red","加载自动任务日志列表请求失败");
	             },
	             gridComplete: function(){
	               	$.xljUtils.addGridScroll();
	             	$.xljUtils.gridResizeFn();
	             },
	             sortname : 't.create_date',//初始化的时候排序的字段
	             sortorder : "desc",//排序方式,可选desc,asc
	             viewrecords : true
			}).navGrid('#taskLogPager', { add: false, edit: false, del: false,search:false,refresh:false });
}

/**
 * 查询task日志
 */
function taskSearch(){
	var selAppCode=$('#appId_task option:selected').val();//选中appCode
	var resFlag=$('#taskResFlag').val();
	var taskName=$('#taskName').val();
	var startTime=$("#datetimepick_task_start").val();
	var endTime=$("#datetimepick_task_end").val();
	var jsonData={
			sysCode:selAppCode,
			resFlag:resFlag,
			taskName:taskName,
			startTime:startTime,
			endTime:endTime
	};
	taskLogGridObj.jqGrid("setGridParam", { postData: jsonData ,datatype:'json',page:1}).trigger("reloadGrid");
}



function emptyDateObject(dateIdText){
	$("#"+dateIdText).val("");
}
function initDatePickerTime(){
	 $('.mydatetimepicker').datetimepicker({ 
	  	  language: 'zh-CN', //语言
		  format: 'yyyy-mm-dd hh:ii:ss',//显示格式
		  //minView: "month",//设置只显示到月份
		  initialDate: new Date(),//初始化当前日期
		  autoclose: true,//选中自动关闭
		  todayBtn: true//显示今日按钮
	  });  
}

$(function(){
	box_w = 1229;
	//初始化initopeLogGridObj
	initopeLogGridObj();
	//初始化系统下拉框数据
	getAppData();
	
	//Dubbo日志
	initdubboLogGridObj();
	//task日志
	initTaskLogGridObj();
	
	getDubboAppData();
	
	//加时间
	initDatePickerTime();
	//页面加载完毕后更改grid宽高
	$.xljUtils.resizeNestedGrid();
	//禁用所有按钮的默认行为，即刷新页面
	$('.btn').click(function() {
		return false;
	});
	
	$(".con-tit button").on("click",function(){
		var index = $(this).index();
		var tabboxs = $(this).parent().parent().find(".tabbox");
		var id = tabboxs.eq(index).attr("id");
	    $.xljUtils.resizeNestedGrid();
	    $.xljUtils.gridResizeFn();
	});
});


