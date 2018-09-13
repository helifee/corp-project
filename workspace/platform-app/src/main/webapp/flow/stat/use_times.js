
var instanceGrid;
var sysAppList, busiObjectList;
var appId="-1", busiObjectId="-1";

$(function() {
	queryAppSystemList();
	initInstanceGridList();
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
	$("#startDate").val("");
	$("#endDate").val("");
}

function exportData(){  
	var appId = $("#appId").val(); 
	var busiObjectId = $("#busiObjectId").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var paramText = "?appId="+appId+"&busiObjectId="+busiObjectId
			+"&startTime="+startTime+"&endTime="+endTime;
	console.log("exportData >> paramText="+paramText);
	var url = hostUrl+"flow/instanceStat/exportUseTimes"+paramText;  
    $('#statForm').attr('action', url); 
    $('#statForm').submit(); 
    //还原action值  
    //url = contextPath+"/brand/getBrand";  
    //$('#searchform').attr('action', url); 
}

//ajax本地调试不通过
function exportData_01(){  
	var paramData = { appId:$("#appId").val() };
	paramData.startDate = $("#startDate").val();
	paramData.endDate = $("#endDate").val();
	paramData.busiObjectId = $("#busiObjectId").val();
	$.ajax({  
        type: 'GET',  
        url: hostUrl+"flow/instanceStat/exportUseTimes",  
        data: JSON.stringify(paramData),  
        success:function(retJson){  
        	//console.info(retJson);
        }  
  });
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

function initInstanceGridList(){
	instanceGrid = $("#instanceGridList");
	var paramData1 = {appId:"initPage"};
	var urlText1 = hostUrl+"/flow/instanceStat/statUseTimes"; //;
	var colModel1 = [ 
	                //系统名称  模板名称  模板编码  业务对象名称, 使用次数
	                // String appName, flowName, flowCode, busiObjectName, userTimes;
	                {name:'appName',  label:'应用系统名称',  width:"100", align:"left", sortable:false },
	                {name:'flowName',  label:'流程模板标题',  width:"100", align:"left", sortable:false}, 
	                {name:'flowCode',  label:'模板编码',  width:"100", align:"left", sortable:false},
	                {name:'busiObjectName',  label:'业务对象名称', width:"100",  align:"left", sortable:false},
	                {name:'userTimes',  label:'使用次数', width:"100",  align:"center", sortable:false }
	               ];
	initSingleGrid(instanceGrid, paramData1, urlText1, colModel1);
}

function initSingleGrid(itemGrid, postParam, urlText, colModel){
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
	var paramData = { appId:$("#appId").val() };
	paramData.startDate = $("#startDate").val();
	paramData.endDate = $("#endDate").val();
	paramData.busiObjectId = $("#busiObjectId").val();
	//console.info("personal.... doSearchAction-------------------");
	//console.info(paramData);
	instanceGrid.jqGrid('setGridParam', {
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
        	sysAppList = data.result;
        	$("#appId").empty();
        	$("#appId").append("<option value=''>"+'全部'+"</option>");
        	$.each(sysAppList, function(index, item){
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
    });//end-for $.ajax({
}