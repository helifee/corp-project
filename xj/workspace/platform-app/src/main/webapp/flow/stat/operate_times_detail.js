
var operateType, statWay, statWayId, appId, busiObjectId;
var startDate1, endDate1, startDate2, endDate2;
/**
 * 页面JS的执行入口处
 */
$(function() {
	//http://127.0.0.1:8080/platform-app/flow/stat/operate_times_detail.html?
	//operateType=DRAW_BACK_INSTANCE&statWay=FLOW&statWayId=jiaojie
	//&appId=9d6cba61c4b24a5699c339a49471a0e7&busiObjectId=
	
	//?statWayId="+statWayId+"&
	var url = decodeURI(location.href);
	var urlText = url.split("?")[1]; 
	var urlText3 = urlText.split("&")[0];
	statWayId = decodeURI(urlText3.split("=")[1]);
	console.log("001 ------------>>> statWayId="+statWayId);
	
	operateType = $.getUrlParam('operateType');
	statWay = $.getUrlParam('statWay');
	//statWayId = $.getUrlParam('statWayId');
	appId = $.getUrlParam('appId');
	busiObjectId = $.getUrlParam('busiObjectId');
	
	//&startDate1=&endDate1=&startDate2=&endDate2=&time=0.9514705098171647
	startDate1 = $.getUrlParam('startDate1');
	endDate1 = $.getUrlParam('endDate1');
	startDate2 = $.getUrlParam('startDate2');
	endDate2 = $.getUrlParam('endDate2');
	
	queryStatDetailList();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.addGridScroll();
});


/**
 * 在jqgridList标签上绑定jqgrid表格，并实现获取数据
 */
function queryStatDetailList(){
	var postData = { operateType: operateType, statWay:statWay, 
			statWayId:statWayId, appId:appId, busiObjectId:busiObjectId,
			startDate1:startDate1, endDate1: endDate1, 
			startDate2:startDate2, endDate2:endDate2 };
	
    jQuery("#jqgridList").jqGrid(//创建jqGrid组件
        {
            url : hostUrl+"flow/instanceStat/detailOperateTimesList",//获取数据的地址
            postData : postData,
            datatype : "json", 
            ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
            mtype : "post",
            jsonReader: {
            	root: "result"
            }, 
            colModel : [
                {name:'id',       label:'ID',  sortable:false,  align:"left", hidden:true},
                {name:'code',    label:'变量编码',  sortable:false,  align:"left", },
                {name:'name',     label:'流程标题', sortable:false,  align:"left",},
                {name:'busiObjectName',     label:'业务对象', sortable:false,  align:"left", },
    			{name:'startDate',  label: '发起时间',   sortable:false,  align:"left",},
    			{name:'startUserName',    label: '发起人',  sortable:false,  align:"left", },
    			
    			{name:'flowBusinessDeptName', label: '发起部门', sortable:false,  align:"left",},
    			{name:'flowBusinessCompanyName', label: '发起公司', sortable:false,  align:"left",},
    			{name:'flowName', label: '流程模板', sortable:false,  align:"left",},
    			{name:'currentApprovers', label: '当前审批人', sortable:false,  align:"left", },
    			{name:'status', label: '流程状态', sortable:false,  align:"left", formatter: statusformatter }
            ],    
            rowNum : -1,//在grid上显示记录条数，这个参数是要被传递到后台
            viewrecords : true, //定义是否要显示总记录数
            sortname : 'id',//默认的排序列
            sortorder : "desc",//排序方式,可选desc,asc
            viewrecords : true, //定义是否要显示总记录数
           	//autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度 
            loadComplete : function(xhr) {
            	$('.ui-state-default.ui-jqgrid-hdiv').css({'overflow':'hidden','margin-top':'8px'});
    			$.xljUtils.addGridScroll();
    			$.xljUtils.gridResizeFn();
    		},
            loadError: function(xhr, status, error){
            	
            }
    });
}

/**
 * 对bool类型的变量进行解析
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function boolformatter(cellvalue, options, rowObject){  
	if(cellvalue){
		return "是";
	}else{
		return "否";
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
 * 解析变量类型
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function statusformatter(cellvalue, options, rowObject){  

	/*RUNNING("运行中", "1"), 
	FINISHED("正常完成", "2"), 
	WITHDRAW("撤回", "3"),
	REJECT("打回", "4"),
	CANCEL("作废", "7"),
	HANGUP("挂起", "9");*/
	if(cellvalue == 1){
		return "运行中";
	}else if(cellvalue == 2){
		return "正常完成";
	}else if(cellvalue == 3){
		return "撤回";
	}else if(cellvalue == 4){
		return "打回";
	}else if(cellvalue == 7){
		return "作废";
	}else if(cellvalue == 9){
		return "挂起";
	}
    return "";  
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

function exportDetailData(){  
	//http://127.0.0.1:8080/platform-app/flow/stat/operate_times_detail.html?
	//operateType=DRAW_BACK_INSTANCE&statWay=FLOW&statWayId=jiaojie
	//&appId=9d6cba61c4b24a5699c339a49471a0e7&busiObjectId=
	//&startDate1=&endDate1=&startDate2=&endDate2=&time=0.9514705098171647
	var paramText = "?operateType="+operateType+"&statWay="+statWay+"&statWayId="+statWayId
			+"&appId="+appId+"&busiObjectId="+busiObjectId
			+"&startDate1="+startDate1+"&endDate1="+endDate1
			+"&startDate2="+startDate2+"&endDate2="+endDate2;
	var url = hostUrl+"flow/instanceStat/exportOperateTimesDetailList"+paramText;
	console.log(url);
    $('#statForm').attr('action', url); 
    $('#statForm').attr('method', "POST"); 
    $('#statForm').submit(); 
}