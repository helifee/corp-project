/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-24
 */

/**
 * 此文件实现业务对象的业务变量的列表及相关操作
 */

var dataType;
var businessObjectId;
var lastSel_dataId;
var firstType;
var currentUserLoginName;
/**
 * 页面JS的执行入口处
 */
$(function() {
	//跨租户使用，暂时注释掉
	initUserInfo();

	dataType = $.getUrlParam('dataType');
	firstType = $.getUrlParam('firstType');
	initTaskGridList();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.addGridScroll();
    //根据dataType的值选择对应的下标
	if($("#queryType option[value='"+dataType+"']")[0]){
    	$("#queryType option[value='"+dataType+"']")[0].selected=true;
	}

	if($("#firstType option[value='"+firstType+"']")[0]){
    	$("#firstType option[value='"+firstType+"']")[0].selected=true;
	}

	$('#firstType').on('change',function () {
		$('#queryType option[value="-1"]')[0].selected=true;
		dataType = null;
	});

	$('#queryType').on('change',function () {
		$('#firstType option[value=""]')[0].selected=true;
		firstType = null;
	});

	function ie8Match() {
		if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
			return true;
		}

		return false;
	}

	if(ie8Match()){
		$('.form-group').find('label').css('display','inline');
	}
});

function initUserInfo(){
	var uBody = "sys/org/user/getMyInfo?time="+Math.random();
	var uAll = "http://127.0.0.1:9999/platform-app/" + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		dataType:'JSON',
		async:false,
		success: function(data) {
			currentUserLoginName = data.result.loginName;
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			$.xljUtils.tip("red","获取用户请求失败");
		}
	});

}


/**
 * 在jqgridList标签上绑定jqgrid表格，并实现获取数据
 */
function initTaskGridList(){
	var postData = {};
	if(dataType){
		postData.dataType = dataType;
	}
	if (firstType) {
		postData.firstType = firstType;
	}
	postData.more=true;
    jQuery("#jqgridList").jqGrid(//创建jqGrid组件
        {
            url : serviceUrl+"flow/sysNoticeMsg/searchDataByKeyword",
            postData : postData, //,  sidx:"send_date", sord:"desc"},
            datatype : "json",
            ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
            mtype : "post",
            //jsonReader : { root:"result" }, 
            jsonReader: { repeatitems: false },
            colModel : [
                {name:'id',      label:'ID', align:"left", hidden:true},
                {name:'serverDate', label:'serverDate', align:"left",hidden:true},
                {name:'sendDate', label:'sendDate', align:"left",hidden:true},
                {name:'title',   label:'title/标题', width:300, align:"left", formatter: titleFormatter},
                {name:'sendDate',label:'time/到达时间',width:100, align:"left"},
				{name:'opType',  label:'查询分类', width:50,hidden:true, align:"center", formatter: opTypeFormatter,unformat:opTypeUnformatter }
            ],
            rowNum : -1,//在grid上显示记录条数，这个参数是要被传递到后台
            sortname : 'sendDate',//默认的排序列
            sortorder : "desc",//排序方式,可选desc,asc
            viewrecords : true, //定义是否要显示总记录数
            pager: '#jqgridPager',//定义翻页用的导航栏，必须是有效的html元素            
            rowNum: 20,//在grid上显示记录条数，这个参数是要被传递到后台
            rowList:  [20, 50, 100, 200], //可供用户选择一页显示多少条
			rownumWidth:48,
            rownumbers: true,
            multiselect: true,
            // multiboxonly: true,
            onSelectRow: function(rowid, status) {//被选中的状态
            	lastSel_dataId = rowid;
            },
            loadComplete : function(xhr) {
				$("tr.ui-jqgrid-labels th:visible:eq(0)").attr("title", "title/标题");
				$("tr.ui-jqgrid-labels th:visible:eq(1)").attr("title", "time/到达时间");
                // $.xljUtils.resizeNestedGrid();
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
    		},
            loadError: function(xhr, status, error){

            }
    });
}

function titleFormatter(cellvalue, options, rowObject) {
	 var hourSumText = rowObject.hourSum;
     var hourSum = parseInt(hourSumText);
     var showHourText = hourSum+" hour(s)";
     /*if(hourSum>24){
     	var daySum = parseInt(hourSum / 24);
     	var leftHour = hourSum % 24;
     	if(leftHour>0){
     		showHourText = daySum+"天"+leftHour+"小时";
     	}else{
     		showHourText = daySum+"天";
     	}
    }*/
    var opType = rowObject.opType;
    var showText = "";
    if(opType=="DB" || opType=="DY"){
    	showText = "stay   "+showHourText+"  " + rowObject.title ;
    }else{
    	showText = rowObject.title ;
    }
    return "<a id='" +options.rowId+ "_a' href='javaScript:void(0);' style='font-weight: bold;color:#3c8dbc;' onclick='taskView(\""+ decodeURI(rowObject.url) +"\",\""+opType+"\");'>"+showText+"</a>";
}

function taskView(urlText, opType){
    var tendCode = getTextUrlParams(urlText).tendCode;
	var flag = checkLogin(tendCode);
	if(!flag){
		//return window.location.href='/platform-app/login.html?_s='+$.xljUtils.getUrlParams()._s+'&_time='+Math.random();
        if(tendCode){
            window.open('/platform-app/login.html?tendCode='+tendCode+'&_time='+Math.random(),'_self');
        }else{
            window.open('/platform-app/login.html?_time='+Math.random(),'_self');
        }

		return;
	}
    var initText = serviceUrl+urlText+"&source="+opType+"&time="+Math.random();

	if(urlText && urlText.indexOf("http")==0){
		initText = urlText+"&source="+opType+"&time="+Math.random();
	}
	var url = initText;

	openWin(url);
}
function checkLogin(tendCode) {
    var flag = true;
    var url = serviceUrl + 'sys/thirdPartyAuthentication/checkLogin?_time=' + new Date().getTime();
	//跨租户消息问题，暂时注释掉
	if(currentUserLoginName){
		url = url +'&loginName='+currentUserLoginName;
	}
    if(tendCode){
        url += '&tendCode='+tendCode + '&_s='+tendCode;
    }
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'JSON',
        async: false,
        success: function (resultData) {
            flag = resultData.success;
        },
        error: function (xhr) {
            flag = false;
        }
    });
    return flag;
}

function getTextUrlParams(url) {
	var tendCodeParam = url.substring(url.indexOf('?'));
	tendCodeParam = tendCodeParam.replace('?', '').replace(/&/g, '","');
	tendCodeParam = tendCodeParam.replace(/=/g, '":"');
	if (tendCodeParam != "") {
		try{
			tendCodeParam = JSON.parse('{"' + tendCodeParam + '"}');
		}catch(e){}
	}

	return tendCodeParam;
}
/**
 * 兼容性时间创建方法
 */
function newDate(dateStr) {
	var array = dateStr.match(/\d+/g);
	dateStr = array[0] + '/' + array[1] + '/' + array[2];
	var date = new Date(dateStr);
	date.setHours(parseInt(array[3]), parseInt(array[4]), parseInt(array[5]));
	return date;
}
function calculateTimeOffset(newTime, oldTime){
    var hourSum = (newTime-oldTime)/1000/60/60;
    var hourText = hourSum+"";
    var index = hourText.indexOf(".");
    return hourText.substr(0,index+2);
}

function opTypeFormatter(cellvalue, options, rowObject) {
	if(cellvalue == "DB"){
    	return "待审";
    }else if(cellvalue == "DY"){
    	return "待阅";
    }else if(cellvalue == "YB"){
    	return "已办";
    }else if(cellvalue == "YY"){
    	return "已阅";
    }else if(cellvalue == "FQ"){
    	return "我的发起";
    }
    return "暂无";
}
function opTypeUnformatter(cellvalue, options, rowObject) {
	if(cellvalue == "待审"){
		return "DB";
	}else if(cellvalue == "待阅"){
		return "DY";
	}else if(cellvalue == "已办"){
		return  "YB";
	}else if(cellvalue == "已阅"){
		return "YY";
	}else if(cellvalue == "我的发起"){
		return "FQ";
	}
	return "暂无";
}
/**
 * 置为已办
 */
function setYB() {
	var rowId = $("#jqgridList").jqGrid("getGridParam", "selrow");
	if(rowId&& rowId != ''){
		var rowData = $('#jqgridList').jqGrid('getRowData', rowId);
		if(rowData.opType=='DB'||rowData.opType=='DY'){
			$.ajax({
				type: "POST",
				contentType: "application/json",
				url: serviceUrl + "flow/sysNoticeMsg/updateStatusOfNoticeMsgByCurrentUser?_t="+new Date().getTime() ,
				data:JSON.stringify({'oldStatus':rowData.opType,'newStatus':rowData.opType=='DB'?'YB':'YY','id':rowData.id}),
				dataType: "json",
				success: function (result) {
					if(result&&result.success){
						$.xljUtils.tip('green',"消息处理成功！");
						$("#jqgridList").jqGrid().trigger('reloadGrid');
					}
				},
				error: function (xhr, textStatus, errorThrown) {
					$.xljUtils.tip("red", "服务异常,请联系管理员！");
				}
			});
		}else{
			$.xljUtils.tip("blue","只能操作待阅或待办的数据");
		}
	}else{
		$.xljUtils.tip("blue","请选择要操作的数据");
	}

}

/**
 * 批量置为已办
 */
function setYB_Batch() {
    var ids = $("#jqgridList").jqGrid("getGridParam", "selarrrow");
    if(ids&& ids != ''){
        for(var i in ids){
            var rowData = $('#jqgridList').jqGrid('getRowData', ids[i]);
            if(rowData.opType=='DB'||rowData.opType=='DY'){
                continue;
            }else{
                $.xljUtils.tip("blue","只能操作待阅或待办的数据");
                return;
            }
        }
        for(var i in ids){
            var rowData = $('#jqgridList').jqGrid('getRowData', ids[i]);
            if(rowData.opType=='DB'||rowData.opType=='DY'){
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: serviceUrl + "flow/sysNoticeMsg/updateStatusOfNoticeMsgByCurrentUser?_t="+new Date().getTime() ,
                    data:JSON.stringify({'oldStatus':rowData.opType,'newStatus':rowData.opType=='DB'?'YB':'YY','id':rowData.id}),
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        if(result&&result.success){
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });

            }
        }
            $.xljUtils.tip('green',"消息处理成功！");
            $("#jqgridList").jqGrid().trigger('reloadGrid');

    }else{
        $.xljUtils.tip("blue","请选择要操作的数据");
    }

}
/**
 * 刷新JqGrid的表格数据，子窗口调用是opener.refreshJqGridData();
 */
function refreshJqGridData(){
	var keyword = $("#keyword").val();
	var queryType = $("#queryType").val();
	var timeType = $("#timeType").val();
	var firstType = $('#firstType').val();
	var postData = $('#jqgridList').jqGrid('getGridParam','postData');
	if(postData){
		for(var item in postData){
			delete postData[item];
		}
	}
	postData = {dataType: queryType, keyword:keyword, timeType: timeType};
	if(firstType&&firstType!=''){
		postData.firstType = firstType;
	}

	if(queryType&&queryType!=''){
		postData.dataType = queryType;
	}
    postData.more=true;
	$("#jqgridList").jqGrid('setGridParam',{
	      datatype:'json',
	      postData:postData,
		  page:1
	 }).trigger("reloadGrid");

	setTimeout(function () {
		$.xljUtils.addGridScroll();
	},1500);
}

/**
 * 修改业务变量的处理事件
 */
function modifyItem(){
	if(!lastSel_dataId){
		pop_tip_open("blue","请选择一个业务变量!");
		return;
	}
	var urlText = baseUrl+"flow/runtime/businessObjectVariable/businessObjectVariable_edit.html?systemId=";
	urlText = urlText+systemId+"&busiObjectId="+businessObjectId+"&id="+lastSel_dataId;
	openWin(urlText);
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