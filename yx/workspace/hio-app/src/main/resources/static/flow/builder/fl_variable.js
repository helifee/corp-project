/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-4-12
 */

/**
 * 此文件实现模板的默认标题规则的处理页面
 */

var objectId, objectName;
var variableList = new Array();
var selectedRowID = "";
var variableGrid = $("#variableGridList");
var oldFlowTitle = "";
var oldTitleArray;
var selectedDataIdArray = new Array();
var excludeArray;
$(function(){
	excludeArray = ["flow_business_company_id", "flow_business_dept_id", "flow_business_project_id", "flow_business_project_branch_id", "business_object_id", "start_user_id"];
	initPageParam();
	oldFlowTitle = opener.getOldTitleVariable();
	var reg = new RegExp("@","g");//g,表示全部替换。
	oldFlowTitle = oldFlowTitle.replace(reg,"");
	oldTitleArray = oldFlowTitle.split("-");
	resizeGrid();
	initGridTable();
	queryVariableList();

});

function resizeGrid(){
	$("#approverPart").height($(window).height()-80+"px");
}
$(window).resize(function(){
	resizeGrid();
	variableGrid.jqGrid().setGridWidth($("#approverPart").width(),true);
	variableGrid.jqGrid().setGridHeight($("#approverPart").height()-100,true);
});
/**
 * 初始化参数的处理, 其中设置审批类型放在该方法里面
 */
function initPageParam(){
	var url = decodeURI(location.href);
	var urlText = url.split("?")[1]; 
	var urlText2 = urlText.split("&")[0]; 
	objectId = urlText2.split("=")[1]; 
	
	var urlText3 = urlText.split("&")[1];
	objectName = decodeURI(urlText3.split("=")[1]); 
	$("#spanTitle").html("业务对象("+objectName+")的变量列表");
}

function initGridTable(){
	variableGrid.jqGrid({
		datatype : "local",
		//scroll  : true,  scrollrows:true,
		colModel : [ 
			{name:'id', label:'ID' ,hidden:true  }, 
			//{name:'checkStatus', label:'是否选择', align:"center", hidden:true }, 
			{name:'checkedStatus',  label:'选择', width:50, sortable:false, align:"center", formatter: checkformatter},
			{name:'sort',  label:'变量序号', width:50, sortable:false, align:"center"}, 
			{name:'name',  label:'变量名称',  width:150, sortable:false, align:"left"},
			{name:'code',  label:'变量编码', width:150, sortable:false,  align:"left" },
            {name:'parentName',  label:'上级变量',  width:100,  sortable:false, align:"left" },
			{name:'type',  label: '变量类型',  width:100, sortable:false,    align:"left",  formatter: typeformatter },
			{name:'comment', sortable:false, label: '备注说明', align:"left" }
		],
		width:$("#approverPart").width(),
		height:$("#approverPart").height()-100,
		forceFit:true, //当为ture时，调整列宽度不会改变表格的宽度。  
		sortname: 'id',//默认的排序列
        sortorder: "asc",//排序方式,可选desc,asc                                    		
		//multiselect:true,//定义是否可以多选
        onSelectRow: function (rowid, status) {//被选中的状态
        	////console.info("----->>> rowid="+rowid+";status="+status);
        	selectedRowID = rowid;
        	if(status == "true" || status==true){  //选中状态
        	}else{  }
        },
        
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
	    }
	});
	
}

function checkformatter(cellvalue, options, rowObject){
	if(cellvalue == true){
		return '<input type="checkbox" name="selecteId" onclick="checkboxChange(\''+rowObject.id+'\',this )" value="'+rowObject.id+'" checked="checked" />';
	}else{
		return '<input type="checkbox" name="selecteId" onclick="checkboxChange(\''+rowObject.id+'\',this )" value="'+rowObject.id+'" />';
	}
}

function checkboxChange(dataId, that){
	var checkedStatus = that.checked;
	//console.info("dataId="+dataId +"; checkedStatus="+checkedStatus);
	if(checkedStatus==true || checkedStatus=='true') {//选择的情况
		selectedDataIdArray.push(dataId);
	} else {//取消选择的情况
		for(var idx=0;idx<selectedDataIdArray.length; idx++ ){
    		var itemId = selectedDataIdArray[idx];
    		if(dataId == itemId){
    			selectedDataIdArray.splice($.inArray(dataId,selectedDataIdArray),1);
    			break;
    		}
    	}
	}
	//console.info(selectedDataIdArray);
}
/**
 * 解析变量类型
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function typeformatter(cellvalue, options, rowObject){  
	//1:字符串，2:整数，3:浮点数,4:布尔，5:日期，6:对象
	if(cellvalue == 1){
		return "字符串";
	}else if(cellvalue == 2){
		return "整数";
	}else if(cellvalue == 3){
		return "浮点数";
	}else if(cellvalue == 4){
		return "布尔";
	}else if(cellvalue == 5){
		return "日期";
	}else if(cellvalue == 6){
		return "对象";
	}
    return "";  
}

/**
 * 查询相关的业务变量数据列表
 */
function queryVariableList(){
	var paramData = {businessObjectId: objectId, delflag:false};
	$.ajax({ //发送更新的ajax请求
	    type : "post",  
	    //url : serviceUrl+"flow/businessObjectVariable/queryList",  
	    url : "http://127.0.0.1:9999/platform-app/flow/businessObjectVariable/queryListByCondition",//获取数据的地址
	    dataType : "json",  
	    data : JSON.stringify(paramData),//将对象序列化成JSON字符串  ,
	    contentType : 'application/json;charset=utf-8', //设置请求头信息  
	    success : function(data){
	    	var dataList = data.result;	
	    	variableList.splice(0,variableList.length);//先清空数据内的所有元素
	    	var tempList = new Array();
	    	for(var idx=0; idx<dataList.length; idx++){
	    		var item = dataList[idx];
	    		item.sort = idx+1+dataList.length;
	    		item.checkedStatus = false;
	    		var excludedFlag = checkExcludeVariable(item.code);
	    		if(!excludedFlag){
	    			var sortNO = findTitleIdSortNO(item.code);
		    		if(sortNO>=1){
		    			item.checkedStatus = true;
		    			item.sort = sortNO;
		    			selectedDataIdArray.push(item.id);
		    		}
		    		tempList.push(item);
	    		}
	    	}
	    	variableList = changeArraySort(tempList);
	    	for(var i=0; i<variableList.length; i++){
	    		var itemData = variableList[i];
	    		var dataId =  itemData.id;
	    		variableGrid.jqGrid('addRowData', itemData.id, itemData);
	    	}

			$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
	    	/*for(var idx=0; idx<selectedDataIdArray.length; idx++){
	    		var dataId = selectedDataIdArray[idx];
	    		variableGrid.jqGrid('setSelection',dataId);
	    	}*/
	    },  
	    error : function(data){  
	    	
	    }  
	});
}

function checkExcludeVariable(checkCode){
	var excludedFlag = false;
	for(var idx=0; idx<excludeArray.length; idx++){
		var item = excludeArray[idx];
		if(item == checkCode){
			excludedFlag = true;
			break;
		}
	}
	return excludedFlag;
}

function findTitleIdSortNO(testId){
	if(oldFlowTitle && oldFlowTitle.length>32){
		var sortNO = 0;
		for(var idx=0; idx<oldTitleArray.length; idx++){
			if(oldTitleArray[idx] == testId){
				sortNO = idx+1;
				break;
			}
		}
		return sortNO;
	}else{
		return 0;
	}
}

/**
 * 将某一行上移
 * @param tableType
 */
function upRow(tableType){
	sortCommonAction(-1.5);
} 

/**
 * 将某一行下移
 * @param tableType
 */
function downRow(tableType){
	sortCommonAction(1.5);
}

/**
 * 将某一行置顶
 * @param tableType
 */
function topRow(tableType){
	sortCommonAction(-100);
}

/**
 * 将某一行置底
 * @param tableType
 */
function bottomRow(tableType){
	sortCommonAction(100);
}

/**
 * 排序的通用处理逻辑
 * @param tableType
 * @param offset 上移-1.5 下移+1.5  置顶-100，置底+100
 */
function sortCommonAction(offset){
	var tempList = new Array();
	for(var idx=0; idx<variableList.length; idx++){
		var item = variableList[idx];
		if(item.id == selectedRowID){
			item.sort = item.sort + offset;
		}
		item.checkedStatus = false;
		for(var idx1=0; idx1<selectedDataIdArray.length; idx1++){
			var dataId = selectedDataIdArray[idx1];
			if(dataId == item.id){
				item.checkedStatus = true;
				break;
			}
		}
		tempList.push(item);
	}
	
	variableList = changeArraySort(tempList);
	variableGrid.jqGrid('clearGridData',false);
	for(var idx=0; idx<variableList.length; idx++){
		var itemData = variableList[idx];
		var dataId =  itemData.id;
		variableGrid.jqGrid('addRowData', itemData.id, itemData);
	}
	var classText = "ui-row-ltr ui-state-highlight";
	variableGrid.addClass(classText).siblings().removeClass(classText);
	variableGrid.jqGrid('setSelection', selectedRowID);
	/*for(var idx=0; idx<selectedDataIdArray.length; idx++){
		var dataId = selectedDataIdArray[idx];
		variableGrid.jqGrid('setSelection',dataId);
	}*/
}

/**
 * 实现将tempArray按照某个属性进行排序,然后重新对sort属性进行赋值,使sort为我们想要的数据
 * @param tempArray
 * @returns
 */
function changeArraySort(tempArray){
	var newArray = tempArray.sort(compare('sort'));
	for(var idx=0; idx<newArray.length; idx++){
		var item = newArray[idx];
		item.sort = idx+1;
	}
	return newArray;
}

/**
 * 该方法实现数组对象的比较,以对象的property为比较参数,在changeArraySort()方法使用到
 * @param property
 * @returns{Function}
 */
function compare(property){
   return function(a,b){
       var value1 = a[property];
       var value2 = b[property];
       return value1 - value2;
   }
}

/**
 * 保存按钮的点击事件
 */
function saveForm(){
	//var ids = variableGrid.jqGrid('getGridParam','selarrrow');
	if(selectedDataIdArray.length == 0){
		pop_tip_open("blue","至少选择一条业务变量！");
		return;
	}
	
	var showTitle = "";
	var hiddenTitle = "";
	var resultArray = new Array();
	for(var idx=0; idx<selectedDataIdArray.length; idx++){
		var dataId = selectedDataIdArray[idx];
		var item = variableGrid.jqGrid('getRowData', dataId);
		resultArray.push(item);
	}
	var resultSortedArray = changeArraySort(resultArray);
	for(var idx1=0; idx1<resultSortedArray.length; idx1++){
		var item = resultSortedArray[idx1];
		////console.info("sort="+item.sort+"--- name="+item.name+"--- code="+item.code);
		showTitle += "@"+item.name+"@-"; 
		hiddenTitle += "@"+item.code+"@-";
	}
	
	showTitle = showTitle.substr(0, showTitle.length-1);
	hiddenTitle = hiddenTitle.substr(0, hiddenTitle.length-1);
	////console.info("showTitle="+showTitle);
	////console.info("hiddenTitle="+hiddenTitle);
	opener.setNewTitleVariable(showTitle, hiddenTitle);
	closeMe();
}

/**
 * 关闭按钮的点击事件
 */
function closeMe(){
	window.opener=null;
	window.open('','_self');
	window.close();
}