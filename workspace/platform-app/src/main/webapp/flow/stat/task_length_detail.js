
var statWay, statWayId, appId, busiObjectId;
var startDate1, endDate1, startDate2, endDate2;
var compareType, endSum, startSum;
var paramPostData;
/**
 * 页面JS的执行入口处
 */
$(function() {
	//http://127.0.0.1:8080/platform-app/flow/stat/task_length_detail.html?
	//statType=TASKSUM
	//&statWay=COM&statWayId=1fadc6e6f5a34b40bc59d5add3364df5
	//&appId=9d6cba61c4b24a5699c339a49471a0e7
	//&busiObjectId=3d890c7fae7a48399221eeb2392a73cd
	statWay = $.getUrlParam('statWay');
	statWayId = $.getUrlParam('statWayId');
	appId = $.getUrlParam('appId');
	busiObjectId = $.getUrlParam('busiObjectId');
	
	//&startDate1=&endDate1=&startDate2=&endDate2=
	//&compareType=-1&startSum=&endSum=&time=0.09557450380773935
	startDate1 = $.getUrlParam('startDate1');
	endDate1 = $.getUrlParam('endDate1');
	// startDate2 = $.getUrlParam('startDate2');
	// endDate2 = $.getUrlParam('endDate2');
	compareType = $.getUrlParam('compareType');
	endSum = $.getUrlParam('endSum');
	startSum = $.getUrlParam('startSum');
	
	queryStatDetailList();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.addGridScroll();
});

function exportDetailData(){  
	var paramText = "?appId="+appId+"&busiObjectId="+busiObjectId+"&statWay="+statWay+"&statWayId="+statWayId
			+"&startDate1="+startDate1+"&endDate1="+endDate1
		//	+"&startDate2="+startDate2+"&endDate2="+endDate2
			+"&compareType="+compareType+"&startSum="+startSum+"&endSum="+endSum;
	var url = hostUrl+"flow/instanceStat/exportTaskLengthDetail"+paramText;
    $('#statForm').attr('action', url); 
    $('#statForm').attr('method', "POST"); 
    $('#statForm').submit(); 
}


/**
 * 在jqgridList标签上绑定jqgrid表格，并实现获取数据
 */
function queryStatDetailList(){
	paramPostData = { statWay:statWay, statWayId:statWayId, appId:appId, busiObjectId:busiObjectId,
			startDate1:startDate1, endDate1: endDate1, startDate2:startDate2, endDate2:endDate2,
			compareType: compareType, endSum: endSum, startSum:startSum };
	
    jQuery("#jqgridList").jqGrid(//创建jqGrid组件
        {
            url : hostUrl+"flow/instanceStat/detailTaskLengthList",//获取数据的地址
            postData : paramPostData,
            datatype : "json", 
            ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
            mtype : "post",
            jsonReader: {
            	root: "result"
            }, 
            colModel : [
                {name:'id',       label:'ID',    align:"center", hidden:true},
                {name:'finishFlag',       label:'finishFlag',    align:"center", hidden:true},
				{name:'instanceName', width:50, align:"center",  sortable:false,   label:'流程标题' },
				{name:'appCode', width:50, align:"center",  sortable:false,   label:'系统'},
				{name:'busiObjectName', width:50, align:"center",  sortable:false,   label:'业务对象' },
				{name:'operationType', width:50, align:"center",  sortable:false,   label:'审批状态' },
                {name:'hourSum', width:60, align:"center",  sortable:false,  label:'停留时长(小时)'},
				{name:'startDate', width:120, align:"center", sortable:false, label: '接受时间'},
				{name:'operateTime', width:120, align:"center", sortable:false, label: '处理时间' ,formatter:timeFormatter},
				{name:'operatorName', width:50, align:"center",  sortable:false,   label:'处理人'},
				{name:'operatorDeptName', width:50, align:"center",  sortable:false,   label:'处理人所在部门' },
				{name:'operatorCompanyName', width:50, align:"center",  sortable:false,   label:'处理人所在公司'},
				{name:'flowName', width:50, align:"center",  sortable:false,   label:'流程模板'},
				{name:'acName', width:50, align:"center",  sortable:false,   label:'节点名称'},
				{name:'startUserName', width:50, align:"center",  sortable:false,   label:'发起人'},
				{name:'flowBusinessDeptName', width:50, align:"center",  sortable:false,   label:'发起人所在部门'},
				{name:'flowBusinessCompanyName', width:50, align:"center",  sortable:false,   label:'发起人所在公司'}


              /*  {name:'instanceName', width:200,  align:"left", sortable:false,  label:'流程实例', },
    			{name:'acName', width:60, align:"center", label: '审批环节',   sortable:false, },
    			{name:'approveType',width:60,  align:"center", sortable:false,  label: '审核类型',},

    			{name:'dayType',width:60,  align:"center", sortable:false, label: '工作日处理', formatter:dayTypeFormatter },
    			{name:'operationType', width:80,  align:"center", sortable:false, label: '操作类型', },
    			{name:'startCompanyName', width:80,align:"center", sortable:false, label: '流程发起公司',}*/
            ],     
            rowNum : -1,//在grid上显示记录条数，这个参数是要被传递到后台
            viewrecords : true, //定义是否要显示总记录数
            sortname : 'id',//默认的排序列
            sortorder : "desc",//排序方式,可选desc,asc
            viewrecords : true, //定义是否要显示总记录数
           	// autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度
            loadComplete : function(xhr) {
            	$('.ui-state-default.ui-jqgrid-hdiv').css({'overflow':'hidden','margin-top':'8px'});
    			$.xljUtils.addGridScroll();
    			$.xljUtils.gridResizeFn();
    		},
    		ondblClickRow:function(rowId){
    	    	var url = hostUrl+"flow/runtime/approve/flow.html?instanceId=" + rowId
    			 + "&time=" + new Date().getTime(); 
            	window.open(url);
            },
            loadError: function(xhr, status, error){
            	
            }
    });
}

function timeFormatter(cellvalue, options, rowObject){
	if(rowObject.operateTime == null) {
		return "未处理";
	} else {
		return cellvalue;
	}
}

function dayTypeFormatter(cellvalue, options, rowObject){
	if(rowObject.operationType == '未处理') {
		return "";
	} else {
		return cellvalue;
	}
}

/**
 * 刷新JqGrid的表格数据，子窗口调用是opener.refreshJqGridData();
 */
function refreshJqGridData(){
	$("#jqgridList").jqGrid('setGridParam',{
	      datatype:'json', 
	      postData:{businessObjectId: businessObjectId, delflag:false},   
	 }).trigger("reloadGrid");
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