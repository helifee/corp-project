
var statGrid;
var appId="-1", busiObjectId="-1";resourceId = "-1";
$(function() {
	initStatGridList();
	$.xljUtils.resizeNestedGrid();
	$.xljUtils.addGridScroll();
	initDatetimepicker();
	
	/*$('.singleArray-first').xljSingleArraySelector({
	    selectorTypeArray:['busiObject'],
	    appId : $("#appId").val(),
	    targetId:'busiObjectId',//选择的数据的ID存储input域
	    targetName:'busiObjectName' //选择的数据的Name存储input域
	});*/
	$('.singleArray-first').xljSingleArraySelector({
	    selectorTypeArray:['busiObject'],
	    selectorType:'busiObject',
	    appId : $("#appId").val(),
	    treeUrl: hostUrl+'flow/businessObject/getCategoryTreeBySystemApp',
	    targetId:'busiObjectId', //选择的数据的ID存储input域  
	    targetName:'busiObjectName', //选择的数据的Name存储input域
	    saveCallback: function(selectData,selectArray,ele){
	    	//console.info(selectData);
	    }
	});
});
function resourceIdChange(that) {
	resourceId = that.value;
	if(resourceId=='-1'){
		$("#appId").val("");
		$("#appName").val("");
	}else{
		if(resourceId=='flow'){
			queryAppSystemList();
		}else if(resourceId=='OA'){
			$('#appId').empty();
			$("#appId").append("<option value=''>"+'全部'+"</option>");
		}else if(resourceId=='LLOA'){
			$('#appId').empty();
			$("#appId").append("<option value=''>"+'全部'+"</option>");
		}
	}
}
function appIdChange(that){
	appId = that.value;
	$("#busiObjectName").val("");  
	$("#busiObjectId").val("");  
	$('.singleArray-first').xljSingleArrayDraw({
		selectArray: ['busiObject'],
		selectType:'busiObject',
		appId : appId
	},$('.singleArray-first'));
}

function emptyBusiObject(){
	$("#busiObjectId").val("");
	$("#busiObjectName").val("");
}

function clearCondition(){
	queryAppSystemList();
	emptyBusiObject();
	$("#startDate1").val("");
	$("#endDate1").val("");
	// $("#startDate2").val("");
	// $("#endDate2").val("");
	$("#endSum").val("");
	$("#startSum").val("");
	$("#compareType").val("-1");
	$("input[name='statWay'][value='COM']").prop("checked", true);
}

function compareTypeChange(){
	var type= $("#compareType").val();
	if("between"== type){
		$("#endSumSpan").show();
	}else{
		$("#endSumSpan").hide();
	}
}

function exportData(){  
	var appId = $("#appId").val(); 
	var statWay=$("input:radio[name='statWay']:checked").val();
	var busiObjectId = $("#busiObjectId").val();
	var startDate1 = $("#startDate1").val();
	var endDate1 = $("#endDate1").val();
	// var startDate2 = $("#startDate2").val();
	// var endDate2 = $("#endDate2").val();
	var compareType = $("#compareType").val();
	var startSum = $("#startSum").val();
	var endSum = $("#endSum").val();
	
	var paramText = "?appId="+appId+"&busiObjectId="+busiObjectId+"&statWay="+statWay
			+"&startDate1="+startDate1+"&endDate1="+endDate1
			// +"&startDate2="+startDate2+"&endDate2="+endDate2
			+"&compareType="+compareType+"&startSum="+startSum+"&endSum="+endSum;
	var url = hostUrl+"flow/instanceStat/exportTaskLength"+paramText;  
    $('#statForm').attr('action', url); 
    $('#statForm').submit(); 
    //还原action值  
    //url = contextPath+"/brand/getBrand";  
    //$('#searchform').attr('action', url); 
}


//初始化日期控件
function initDatetimepicker(){
    $('.form_datetime').datetimepicker({
        language:  'zh-CN',
        format: 'custom',
        customFormat:'yyyy-MM-dd HH:mm:ss',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        showSecond:true
    });
    /*//防止按钮刷新页面
    $('.btn').click(function(e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function(e) {
        e.preventDefault();
        $(this).parents('.fullWidth').children('input').val('');
    });*/
}

//总任务数的链接
function taskSumFormatter(cellvalue, options, rowObject) {
	var statWay = rowObject.statWay;
	var statWayId = rowObject.statWayId;
	if(cellvalue==0){
		return "0";
	}
	return '<a id=\'' +options.rowId+ '_a\' href=\'javaScript:void(0);\' style=\'font-weight: bold;color:#3c8dbc;\''
	+' onclick="gotoDetail(\'TASKSUM\', \''+statWay+'\', \''+statWayId+'\');">'+cellvalue+'</a>';        
}

function gotoDetail(statType, statWay, statWayId){
	var appId = $("#appId").val();
	var startDate1 = $("#startDate1").val();
	var endDate1 = $("#endDate1").val();
	// var startDate2 = $("#startDate2").val();
	// var endDate2 = $("#endDate2").val();
	var busiObjectId = $("#busiObjectId").val();
	
	var compareType = $("#compareType").val();
	var startSum = $("#startSum").val();
	var endSum = $("#endSum").val();
	
	var url = encodeURI(hostUrl+"flow/stat/task_length_detail.html?statType="+statType+"&statWay="+statWay
			+"&statWayId="+statWayId+"&appId="+appId+"&busiObjectId="+busiObjectId
			+"&startDate1="+startDate1+"&endDate1="+endDate1
			// +"&startDate2="+startDate2+"&endDate2="+endDate2
			+"&compareType="+compareType+"&startSum="+startSum+"&endSum="+endSum+"&time="+Math.random());
	openWin(url);
}

function initStatGridList(){
	statGrid = $("#statGridList");
	var statWay=$("input:radio[name='statWay']:checked").val();
	var paramData = {appId:"initPage", statWay:statWay};
	var urlText = hostUrl+"/flow/instanceStat/statTaskLength";
	var colModel = [ 
        //统计维度  平均时长（小时） 最大时长（小时） 最小时长（小时）
        //statWay avgSum maxSum minSum
        {name:'statWayId',  label:'statWayId', hidden:true, sortable:false  },
        {name:'statWayName',  label:'统计维度',  width:"100",  align:"left", sortable:false  },
        {name:'taskSum',  label:'审批任务数',  width:"100", align:"center", sortable:false, formatter: taskSumFormatter},
        {name:'avgSum',  label:'平均时长（小时）',  width:"100", align:"center", sortable:false},
        {name:'maxSum',  label:'最大时长（小时）',  width:"100", align:"center", sortable:false},
        {name:'minSum',  label:'最小时长（小时）',  width:"100", align:"center", sortable:false},
	];
	initSingleGrid(statGrid, paramData, urlText, colModel);
}

function initSingleGrid(itemGrid, postParam, urlText, colModel){
	debugger;
	itemGrid.jqGrid( {//创建jqGrid组件
        url : urlText, 
        postData : postParam,
        datatype : "json", 
        ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
        mtype : "post", 
        jsonReader : { root:"result" },
        colModel : colModel,    
        rowNum : -1,//在grid上显示记录条数，这个参数是要被传递到后台
        sortname : 'id',//默认的排序列
        sortorder : "desc",//排序方式,可选desc,asc
        viewrecords : true, //定义是否要显示总记录数
       	//multiselect:true,//定义是否可以多选
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
	return "<a id='" +options.rowId+ "_a' href='javaScript:void(0);' style='font-weight: bold;color:#3c8dbc;' onclick='personalInstance(\""+rowObject.id+"\");'>"+cellvalue+"</a>";        
}

function personalInstance(instanceId){
	//flow/runtime/approve/approve.html?instanceId=81be28cc932f4fab935a06354343b5bb&requestSource=DB
	//&taskId=f8bebf7290ae4f11ab6d8ed721c5d693&taskType=2
	//&approveType=SP&msgId=28285c3473864a3197640192116d2375&businessObjectCode=null
	//&businessId=d274a75855c64e6497c0e11037986c94&customFormId=null&time=1493176542088
	var url = encodeURI(hostUrl+"flow/runtime/approve/approve.html?requestSource=DB&instanceId="+instanceId+"&time="+Math.random());
	openWin(url);
}

/**
 * 查询按钮的点击事件
 */
function doSearchAction(){
	debugger;
	var statWay=$("input:radio[name='statWay']:checked").val();
	var paramData = { appId:$("#appId").val(), statWay: statWay };
	paramData.startDate1 = $("#startDate1").val();
	paramData.endDate1 = $("#endDate1").val();
	paramData.busiObjectId = $("#busiObjectId").val();
	paramData.compareType = $("#compareType").val();
	paramData.startSum = $("#startSum").val();
	paramData.endSum = $("#endSum").val();

	statGrid.jqGrid('setGridParam', {
        datatype: 'json', postData: paramData,
    }).trigger("reloadGrid");

}


/**
 * 查询所有业务系统的静态数据
 */
function queryAppSystemList() {
    var postdata = {
        appDelflag: "0",
        appStatus: "1"
    }
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: hostUrl+"sys/res/appSystem/queryListForSelect",
//        url: hostUrl+"sys/res/appSystem/queryList",
        dataType: "json",
        async: true,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	$("#appId").empty();
        	$("#appId").append("<option value=''>"+'全部'+"</option>");
        	$.each(data.result, function(index, item){
        		$("#appId").append("<option value='"+item.id+"'>"+item.name+"</option>");
        	});
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