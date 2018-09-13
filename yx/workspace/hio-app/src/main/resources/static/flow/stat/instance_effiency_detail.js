
var statWay, statWayId, appId, busiObjectId;
var startDate1, endDate1, startDate2, endDate2;
var compareType, endSum, startSum;
/**
 * 页面JS的执行入口处
 */
$(function() {
	//l?statType=AVG&statWay=FLOW&statWayId=yzcx
	//&appId=9d6cba61c4b24a5699c339a49471a0e7
	//&busiObjectId=3d890c7fae7a48399221eeb2392a73cd
	//&startDate1=&endDate1=&startDate2=&endDate2=
	//&compareType=-1&startSum=&endSum=&time=0.04965297575696814
	
	var url = decodeURI(location.href);
	var urlText = url.split("?")[1]; 
	var urlText3 = urlText.split("&")[0];
	statWayId = decodeURI(urlText3.split("=")[1]);
	console.log("001 ------------>>> statWayId="+statWayId);
	
	statWay = $.getUrlParam('statWay');
	appId = $.getUrlParam('appId');
	busiObjectId = $.getUrlParam('busiObjectId');
	
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


/**
 * 在jqgridList标签上绑定jqgrid表格，并实现获取数据
 */
function queryStatDetailList(){
	var postData = { statWay:statWay,  statWayId:statWayId, appId:appId, busiObjectId:busiObjectId,
			startDate1: startDate1, endDate1: endDate1,  startDate2:startDate2, endDate2:endDate2,
			compareType: compareType, endSum: endSum, startSum:startSum };
	
    jQuery("#jqgridList").jqGrid( {//创建jqGrid组件
        url : serviceUrl+"flow/instanceStat/detailInstanceEfficiencyList",//获取数据的地址
        postData : postData,
        datatype : "json", 
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        mtype : "post",
        jsonReader: {
        	root: "result"
        }, 
        colModel : [
            {name:'id',       label:'ID',    align:"center", hidden:true},
            {name:'code',    label:'变量编码',   width:100, align:"left",  sortable:false, },
            {name:'name',     label:'流程标题',   width:200, align:"left",  sortable:false,},
            {name:'busiObjectName',     label:'业务对象',    width:100, align:"left",  sortable:false, },
			{name:'startDate',  label: '发起时间',  width:120, align:"left",  sortable:false,},
			{name:'startUserName',    label: '发起人', width:50, align:"left",  sortable:false,},
			
			{name:'flowBusinessDeptName', label: '发起部门', width:100, align:"left",  sortable:false,},
			{name:'flowBusinessCompanyName', label: '发起公司',  width:100, align:"left",  sortable:false,},
			{name:'flowName', label: '流程模板', width:100, align:"left",  sortable:false,},
			{name:'hourSum', label: '历时',  width:50, align:"left",  sortable:false,}
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

function exportDetailData(){  
	//appId:appId, busiObjectId:busiObjectId, statWay:statWay,  statWayId:statWayId, 
	//startDate1: startDate1, endDate1: endDate1,  startDate2:startDate2, endDate2:endDate2,
	//compareType: compareType, endSum: endSum, startSum:startSum
	
	var paramText = "?appId="+appId+"&busiObjectId="+busiObjectId+"&statWay="+statWay+"&statWayId="+statWayId
			+"&startDate1="+startDate1+"&endDate1="+endDate1
			// +"&startDate2="+startDate2+"&endDate2="+endDate2
			+"&compareType="+compareType+"&startSum="+startSum+"&endSum="+endSum;
	var url = serviceUrl+"flow/instanceStat/exportInstanceEfficiencyDetail"+paramText;
	console.log(url);
    $('#statForm').attr('action', url); 
    $('#statForm').attr('method', "POST"); 
    $('#statForm').submit(); 
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