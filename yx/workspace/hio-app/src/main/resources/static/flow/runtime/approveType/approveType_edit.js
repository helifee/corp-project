/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-25
 */

/**
 * 此文件实现审批类型的修改及相关操作
 */
//-----------通用变量定义---------------------------
var approveId;
var typeKeyValue = "-1:请选择;";
var typeDataList = new Array();
var firstId = "", firstName = "";
var roleOneList = new Array();
var roleTwoList = new Array();
var roleThreeList = new Array();
var lastSel_rowId = -1;
//-----------通用方法定义---------------------------
/**
 * 扩展数组的insert方法
 */
Array.prototype.insert = function (index, item) {  
	this.splice(index, 0, item);  
};

/**
 * 数组的比较函数
 * @param property
 * @returns {Function}
 */
function compare(property){
   return function(a,b){
       var value1 = a[property];
       var value2 = b[property];
       return value1 - value2;
   }
}

/**
 * 根据name获取操作类型
 * @param name
 * @returns {String}
 */
function getOperationIdByName(name){
	var resultName = "";
	for(var idx=0; idx<typeDataList.length; idx++){
		var tempOper = typeDataList[idx];
		if(name == tempOper.name){
			resultName = tempOper.id;
			break;
		}
	}
	return resultName;
}

/**
 * 根据name获取操作类型
 * @param name
 * @returns {String}
 */
function getOperationNameById(operId){
	var resultName = "";
	for(var idx=0; idx<typeDataList.length; idx++){
		var tempOper = typeDataList[idx];
		if(operId == tempOper.id){
			resultName = tempOper.name;
			break;
		}
	}
	return resultName;
}

/**
 * 对数组的数据重新排序
 * @param tempArray
 * @returns
 */
function changeArraySort(tempArray){
	var newArray = tempArray.sort(compare('sort'));
	for(var idx=0; idx<newArray.length; idx++){
		var item = newArray[idx];
		item.sortId = idx+1;
		item.sort = idx+1;
	}
	return newArray;
}

/**
 * 关闭按钮的点击事件
 */
function closeMe(){
	window.opener=null;
	window.open('','_self');
	window.close();
}

$(function(){
	 approveId = $.getUrlParam("approveId");
	 queryApproveAllData();
	 setTimeout(function() {
	 	$('html').niceScroll().show().resize();//重置纵向滚动条
	 },500)
});

var lastSel;
/**
 * 初始化单个数据表格
 * @param v_tableId
 */
function initSingleJQGridTable(v_tableId){
	$("#"+v_tableId+"List").jqGrid({
		datatype : "local",
		height  : 175,
		scroll  : true,  scrollrows:true, 
		colModel : [ {name:'id',    label:'ID', hidden:true}, //cellattr: firstCellAttr,
                     {name:'operationId', label:'操作类型',  editable:true, edittype:"select", editoptions:{value: typeKeyValue}}, 
                     {name:'showName',    label:'显示名称',    editable:true, editoptions:{size:"10", maxlength:"30"}}, 
                     {name:'defaultNote', label:'默认意见', editable:true, editoptions:{size:"10", maxlength:"30"}}, 
                     {name:'noteType',    label:'是否需要填写意见',     editable:true, edittype:"select", editoptions:{value:"false:非必填;true:必填"}}, 
                     {name:'sort',        label:'编辑', formatter: operateFormatter }
                   ],
        autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度 
        onSelectRow: function(rowid, status) {//被选中的状态
        	lastSel_rowId = rowid;
        	var rowData = $("#"+v_tableId+"List").jqGrid('getRowData', rowid);
        },
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	changeGridIntoEditStatus(v_tableId);
	        $('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
	        console.log("----->>> gridComplete lastSel_rowId="+lastSel_rowId);
	        /*if(lastSel_rowId>=0){
	        	//console.info("gridComplete lastSel_rowId="+lastSel_rowId);
		        $("#"+v_tableId+"List").jqGrid('setSelection',lastSel_rowId+1);
	        }*/
	    }//end for gridComplete
	});//end for $("#
}

/**
 * 将grid设置为编辑模式
 * @param tableId
 */
function changeGridIntoEditStatus(tableId){
	var grid =  $("#"+tableId+"List");
    var ids = grid.jqGrid('getDataIDs');
    for (var i = 0; i < ids.length; i++) {
        grid.jqGrid('editRow',ids[i]);
    }
    
    var rowDatas = grid.jqGrid('getRowData');
    for(var j in rowDatas){
    	var rowData = rowDatas[j];
    	for(var item in rowData){
    		var inputObj = $(rowData[item]);
    		var inputName = inputObj.attr('name');
    		if(inputName){//根据name来对样式设置css样式
    			$('*[name="'+inputName+'"]').css({width:'99%',height:'95%'});
    		}
    	}
    }
}

/**
 * 初始化三个JqGrid的表格
 */
function pageInitForThreeJQGridTables(){
	initSingleJQGridTable("one");
	initSingleJQGridTable("two");
	initSingleJQGridTable("three");
	var gridWidth = $("#oneList").parents("td").width();
	$("#oneList").jqGrid("setGridWidth" , gridWidth);
	$("#twoList").jqGrid("setGridWidth" , gridWidth);
	$("#threeList").jqGrid("setGridWidth" , gridWidth);
}

/**
 * 操作列的格式化数据方法
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function operateFormatter(cellvalue, options, rowObject){  //image/flow/icon_add.png
	return "<div class='sort-box'><a class='order-icon up-icon' href=\"javascript:upRow('"+rowObject.tableId+"',"+cellvalue+")\" ></a>"+
	"<a class='order-icon down-icon' href=\"javascript:downRow('"+rowObject.tableId+"',"+cellvalue+")\" ></a>"+
	"<a  class='order-icon add-icon' href=\"javascript:addRow('"+rowObject.tableId+"',"+cellvalue+")\"  ></a>"+
	"<a class='order-icon delete-icon' href=\"javascript:deleteRow('"+rowObject.tableId+"',"+cellvalue+")\" ></a></div>";
}

/**
 * 向上按钮的点击事件
 * @param tableType
 * @param sort
 */
function upRow(tableType,sort){
	commonSortAction(tableType, sort, -1.5 );
}

/**
 * 向下按钮的点击事件
 * @param tableType
 * @param sort
 */
function downRow(tableType,sort){
	commonSortAction(tableType, sort, 1.5 );
	////console.info("downRow=  lastSel_rowId="+lastSel_rowId);
	//$("#"+tableType+"List").jqGrid('setSelection',lastSel_rowId+3);
	
}

/**
 * 通用的排序处理
 * @param tableType
 * @param sort
 * @param offset--向上:-1.5 ; 向下:+1.5  
 */
function commonSortAction(tableType, sort, offset){
	var tempRoleList = getAllDataOfSingleGrid(tableType);//把临时的数据赋值给tempStoreList
	for(var i=0; i<tempRoleList.length; i++){
		if(i+1 == sort){
			var tempItem = tempRoleList[i];
			tempItem.sort = sort + offset;
			tempItem.sortId = sort+ offset;
		}
	}
	tempRoleList = changeArraySort(tempRoleList);
	$("#"+tableType+"List").jqGrid('clearGridData');
	for ( var i = 0; i <= tempRoleList.length; i++){
	    $("#"+tableType+"List").jqGrid('addRowData', i + 1, tempRoleList[i]);
	}
	//step2 把临时的数据赋值给对应的roleOneList、roleTwoList、roleThreeList
	if("one" == tableType){
		roleOneList = tempRoleList;
	}else if("two" == tableType){
		roleTwoList = tempRoleList;
	}else if("three" == tableType){
		roleThreeList = tempRoleList;
	}
	var sortNum = sort;
	if(offset>0){//向下
		sortNum = sortNum+1;
		if(sortNum>tempRoleList.length){
			sortNum = tempRoleList.length;
		}
	}else{
		sortNum = sortNum-1;
		if(sortNum<1){
			sortNum = 1;
		}
	}
	$("#"+tableType+"List").jqGrid('setSelection', sortNum);
	
}

/**
 * 根据tableType获取Grid的所有取消编辑模式后的数据数组
 * @param tableType:[one two three]
 * @returns {Array}
 */
function getAllDataOfSingleGrid(tableType){
	var grid =  $("#"+tableType+"List");
    var ids = grid.jqGrid('getDataIDs');
    for (var i = 0; i < ids.length; i++) {//关闭所有编辑模式
    	//showName  defaultNote
    	var showNameValue = grid.jqGrid("getCell",ids[i],"showName");
    	var defaultNoteValue = grid.jqGrid("getCell",ids[i],"defaultNote");
    	if($(showNameValue) && $(showNameValue).attr("id")){
    		grid.find("#"+$(showNameValue).attr("id")).attr("data-html",true);
    	}
    	if($(defaultNoteValue) && $(defaultNoteValue).attr("id")){
    		grid.find("#"+$(defaultNoteValue).attr("id")).attr("data-html",true);
    	}
    	
        grid.jqGrid('saveRow',ids[i]);
    }
    var allRowData = grid.jqGrid().getRowData();//读取表格所有数据
    var tempList = new Array();
    for ( var kk = 0; kk < allRowData.length; kk++){
    	var tempObj = allRowData[kk];
    	if( tempObj.operationId ){ //&& "请选择"!=tempObj.operationId){//id不为-1且不等于"请选择",则不保存
    		var addObj = new Object();
        	addObj.defaultNote = tempObj.defaultNote;
        	addObj.noteType = tempObj.noteType;
        	addObj.operationId = getOperationIdByName(tempObj.operationId);
        	addObj.showName = tempObj.showName;
        	addObj.sort = kk+1;
        	addObj.sortId = kk+1;
        	addObj.tableId = tableType;
        	//审批角色: 1,发起人,2,审批人,3 被协办人
        	if("one" == tableType){
        		addObj.approveRole = 2;//2,审批人
        	}else if("two" == tableType){
        		addObj.approveRole = 3;//被协办人
        	}else if("three" == tableType){
        		addObj.approveRole = 1;//发起人
        	}
        	tempList.push(addObj);
    	}
	}
    return tempList;
}

/**
 * 增加按钮的点击事件
 * @param tableType
 * @param sort
 */
function addRow(tableType, sort){
	var tempStoreList = getAllDataOfSingleGrid(tableType);//把临时的数据赋值给tempStoreList
	sort = sort+0.5;
	var itemData = {operationId:"-1", showName: '', defaultNote:'', noteType:false, sort:sort, tableId:tableType};
	//step:1-插入的对应位置的元素; 2-排序和设置排序号; 3-清除数据; 4-往JQGrid增加数据
	tempStoreList.insert(0, itemData);
	tempStoreList = changeArraySort(tempStoreList);
	$("#"+tableType+"List").jqGrid('clearGridData');
	for ( var i = 0; i <= tempStoreList.length; i++){
	    $("#"+tableType+"List").jqGrid('addRowData', i + 1, tempStoreList[i]);
	}
	//step2 把临时的数据赋值给对应的roleOneList、roleTwoList、roleThreeList
	if("one" == tableType){
		roleOneList = tempStoreList;
	}else if("two" == tableType){
		roleTwoList = tempStoreList;
	}else if("three" == tableType){
		roleThreeList = tempStoreList;
	}
	$("#"+tableType+"List").jqGrid('setSelection',(sort+1-0.5));
}

/**
 * 删除按钮的点击事件
 * @param tableType
 * @param sort
 */
function deleteRow(tableType, sort){
	var tempDeleteList;
	if("one" == tableType){
		tempDeleteList = roleOneList;
	}else if("two" == tableType){
		tempDeleteList = roleTwoList;
	}else if("three" == tableType){
		tempDeleteList = roleThreeList;
	}
	
	//step: 删除对应的列表中的对应位置的元素; 排序和设置排序号; 清除数据; 往JQGrid增加数据
	tempDeleteList.splice(sort-1,1);  
	tempDeleteList = changeArraySort(tempDeleteList);
	$("#"+tableType+"List").jqGrid('clearGridData');
	if(tempDeleteList.length==0){//删除的是最后一条数据
		var itemData = {operationId:'', showName: '', defaultNote:'', noteType:false, sort:1, tableId:tableType};
		tempDeleteList.insert(0, itemData);
		tempDeleteList = changeArraySort(tempDeleteList);
	}
	for ( var i = 0; i < tempDeleteList.length; i++){
	    $("#"+tableType+"List").jqGrid('addRowData', i + 1, tempDeleteList[i]);
	}
	console.log("tableType="+tableType+"  (sort-1)="+(sort-1));
	var sortNum = sort-1;
	if(sortNum<1){
		sortNum = 1;
	}
	$("#"+tableType+"List").jqGrid('setSelection', sortNum);
}

/**
 * 校验数组元素的唯一性
 * @param dataList
 */
function checkUnicityOfArray(dataList){
	for(var i=0; i<dataList.length-1; i++){
		var tempItem = dataList[i];
		for(var j=i+1; j<dataList.length; j++){
			var compareItem = dataList[j];
			if(tempItem.operationId == compareItem.operationId){
				return tempItem.operationId;
			}
		}
	}
	return "";
}

/**
 * 将三个grid设置为编辑状态
 */
function changeAllGridIntoEditStatus(){
	changeGridIntoEditStatus("one");
	changeGridIntoEditStatus("two");
	changeGridIntoEditStatus("three");
}


/**
 * 过滤掉三个数组中的含operationId="请选择"或者""的数据
 */
function filterOutWrongItemData(tempDataList){
	if(tempDataList.length==0){
		return tempDataList;
	}
	for(var idx=0; idx<tempDataList.length; idx++){
		var itemData = tempDataList[idx];
		if("" == itemData.operationId || "请选择" == itemData.operationId){
			tempDataList.splice(idx, 1);
		}
	}
	return tempDataList;
}
/**
 * 保存按钮对应的点击事件
 */
function udpateApproveAndOtherData(){
	var dataObj = new Object();
	dataObj.name = $("#name").val();
	var oneList1 = getAllDataOfSingleGrid("one");
	var twoList2 = getAllDataOfSingleGrid("two");
	var threeList3 = getAllDataOfSingleGrid("three");
	//过滤掉三个数组中的含operationId="请选择"或者""的数据
	oneList1 = filterOutWrongItemData(oneList1);
	twoList2 = filterOutWrongItemData(twoList2);
	threeList3 = filterOutWrongItemData(threeList3);

	//此处加入每个操作对象的操作重复性的校验
	var unicity1 = checkUnicityOfArray(oneList1);
	if(unicity1 && unicity1.length>1){
		pop_tip_open("red", "审批人操作定义的\""+getOperationNameById(unicity1)+"\"不能重复,<br/>请调整!");
		changeAllGridIntoEditStatus();
		return;
	}
	var unicity2 = checkUnicityOfArray(twoList2);
	if(unicity2 && unicity2.length>1){
		pop_tip_open("red", "被协办人操作定义的\""+getOperationNameById(unicity2)+"\"不能重复,<br/>请调整!");
		changeAllGridIntoEditStatus();
		return;
	}
	var unicity3 = checkUnicityOfArray(threeList3);
	if(unicity3 && unicity3.length>1){
		pop_tip_open("red", "发起人操作定义的\""+getOperationNameById(unicity3)+"\"不能重复,<br/>请调整!");
		changeAllGridIntoEditStatus();
		return;
	}
	var resultList1 = $.merge(oneList1, twoList2);
	resultList1 = $.merge(resultList1, threeList3);
	$.each(resultList1,function(index,item){
		if("必填" == item.noteType){
			item.noteType = true;
		}else if("非必填" == item.noteType){
			item.noteType = false;
		}
	});
	dataObj.approveOperationList = resultList1;

	//---------------------  开始进行提交请求，交由后台处理   -----------------------
	$.ajax({ //发送更新的ajax请求
	    type: "put",  
	    url: serviceUrl+"flow/approveType/updateAllData/"+approveId,  
	    data: JSON.stringify(dataObj),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){ 
	    	pop_tip_open("green",data.msg);
	    	window.close();
	    },  
	    error: function(data){  
	    	if(data.msg){
	    		pop_tip_open("red", data.msg);
	    	}else{
	    		pop_tip_open("red","修改失败！");
	    	}
	    }  
	});
}

/**
 * 获取三个表格的所有数据
 */
function queryApproveAllData(){
	$.ajax({ //发送更新的ajax请求
	    type: "get",  
	    url: serviceUrl+"flow/approveType/getObjectAllData/"+approveId+"?time=" + new Date().getTime(),    
	    dataType:"json",  
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){ 
	    	var approveItem = data.result;
	    	$("#code").val(approveItem.code);
	    	$("#name").val(approveItem.name);
	    	var typeList = approveItem.operationTypeList;//9个
	    	var typeEntity = typeList[0];
	    	firstId = typeEntity.id, firstName = typeEntity.name;
	    	$.each(typeList,function(index,item){//遍历mapList的数组数据
	    		var typeData = new Object();
	    		typeData.id = item.id;
	    		typeData.name = item.name;

	    		typeDataList.push(typeData);
	    		typeKeyValue += item.id+":"+item.name+";";
	    	});
	    	typeKeyValue = typeKeyValue.substr(0,typeKeyValue.length-1);

	    	var mapList = approveItem.approveOperationList;
	    	$.each(mapList,function(index,item){//遍历mapList的数组数据
	    		 var newObj = new Object();
	    		 newObj.operationId = item.operationId;
	    		 newObj.approveRole = item.approveRole;
	    		 //newObj.showName = item.showName;
	    		 newObj.defaultNote = item.defaultNote;
	    		 newObj.showName = $.xljUtils.htmlEncode($.trim(item.showName));
	    		 newObj.defaultNote = $.xljUtils.htmlEncode($.trim(item.defaultNote));
	    		 newObj.noteType = item.noteType;
	    		 newObj.sort = item.sort;
	    		 
	    	     if(!item.delflag){//未删除的数据才进行采集
	    	    	 if("1" == item.approveRole){
	    	    		 newObj.tableId = "three";
	    	    		 roleThreeList.push(newObj);
	    	    	 }else if("2" == item.approveRole){
	    	    		 newObj.tableId = "one";
	    	    		 roleOneList.push(newObj);
	    	    	 }else if("3" == item.approveRole){
	    	    		 newObj.tableId = "two";
	    	    		 roleTwoList.push(newObj);
	    	    	 }
	    	     }
	    	});//end for $.each(mapList.....
	    	
	    	if(roleOneList.length == 0){
	    		var data1 = {operationId:'-1', showName: '', defaultNote:'', noteType:false, sort:1, tableId:"one"};
	    		roleOneList.push(data1);
	    	}
	    	if(roleTwoList.length == 0){
	    		var data2 = {operationId:'-1', showName: '', defaultNote:'', noteType:false, sort:1, tableId:"two"};
	    		roleTwoList.push(data2);
	    	}
	    	if(roleThreeList.length == 0){
	    		var data3 = {operationId:'-1', showName: '', defaultNote:'', noteType:false, sort:1, tableId:"three"};
	    		roleThreeList.push(data3);
	    	}
	    	roleOneList   = changeArraySort(roleOneList);//排序和设置排序号 
	    	roleTwoList   = changeArraySort(roleTwoList);//排序和设置排序号
	    	roleThreeList = changeArraySort(roleThreeList);//排序和设置排序号
	    	pageInitForThreeJQGridTables();
	    	
	    	//往JQGrid增加数据
	    	for ( var i = 0; i <roleOneList.length; i++){
	    		$("#oneList").jqGrid('addRowData', i, roleOneList[i]);
	    	}
	    	for (var idx = 0; idx <roleTwoList.length; idx++){
	    		$("#twoList").jqGrid('addRowData', idx, roleTwoList[idx]);
	    	}
	    	for ( var idxK = 0; idxK <roleThreeList.length; idxK++){
	    	    $("#threeList").jqGrid('addRowData', idxK, roleThreeList[idxK]);
	    	}    	
	    },  
	    error: function(data){  
	    	if(data.msg){
	    		pop_tip_open("red",data.msg);
	    	}else{
	    		pop_tip_open("red","修改失败！");
	    	}
	    }  
	});//end-for $.ajax({
}