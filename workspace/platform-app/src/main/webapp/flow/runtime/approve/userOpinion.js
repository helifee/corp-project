/**
 * @author:gyh
 * @date: 2017-11-13
 */

/**
 * 此文件实现审批类型的修改及相关操作
 */
//-----------通用变量定义---------------------------
var typeDataList = new Array();
var roleOneList = new Array();
//-----------通用方法定义---------------------------

/**
 * 关闭按钮的点击事件
 */
function closeMe(){
	window.opener=null;
	window.open('','_self');
	window.close();
}

$(function(){
	 queryApproveAllData();
});

var lastSel;
/**
 * 初始化单个数据表格
 * @param v_tableId
 */
function initSingleJQGridTable(v_tableId){
	$("#"+v_tableId+"List").jqGrid({
		datatype : "local",
		height  : "auto",
		scroll  : true,  scrollrows:true, 
		colModel : [ {name:'id',    label:'id', hidden:true}, //cellattr: firstCellAttr,
                     {name:'opinion', label:'意见', editable:true,width : 100},
                     {name:'sort',   label:'sort',hidden:true },
                     {name:'isDefault',   label:'isDefault',hidden:true },
                     {name:'sort1',  label:'编辑', formatter: operateFormatter, width : 50}
                   ],
        autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度 
        onSelectRow: function(rowid, status) {//被选中的状态
        	lastSel_rowId = rowid;
        	var rowData = $("#"+v_tableId+"List").jqGrid('getRowData', rowid);
        },
        gridComplete: function() {//当表格所有数据都加载完成，处理行数据变为编辑模式
        	changeGridIntoEditStatus(v_tableId);
	        $('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
//	        $.xljUtils.addGridScroll();
//        	$.xljUtils.gridResizeFn();
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
	var gridWidth = $("#oneList").parents("td").width();
	$("#oneList").jqGrid("setGridWidth" , gridWidth);
}

/**
 * 操作列的格式化数据方法
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function operateFormatter(cellvalue, options, rowObject){  //image/flow/icon_add.png
	return "<div class='sort-box'><a class='order-icon up-icon' href=\"javascript:upRow("+options.rowId+","+rowObject.sort+")\" ></a>"+
	"<a class='order-icon down-icon' href=\"javascript:downRow("+options.rowId+","+rowObject.sort+")\" ></a>"+
	"<a  class='order-icon add-icon' href=\"javascript:addRow("+rowObject.sort+")\"  ></a>"+
	"<a class='order-icon delete-icon' href=\"javascript:deleteRow("+rowObject.sort+")\" ></a></div>";
}

/**
 * 向上按钮的点击事件
 * @param tableType
 * @param sort
 */
function upRow(rowId,sort){
	if(rowId == 0){
//		pop_tip_open("blue","");
		return false;
	}
	sort = parseInt(sort);
	getTempData();
	var tempSort;//上一条sort
	var up ;//上一条
	var my ;//本条
	var temp = [];
	//交换顺序
	for(var i=0 ;i<dataList.length ;i++){
		var data = dataList[i];
		if(data.sort == sort){
			my = {
					id:data.id,
					opinion:data.opinion,
					sort:tempSort,
					isDefault:data.isDefault
			};
			break;
		}else{
			up = {
					id:data.id,
					opinion:data.opinion,
					sort:sort,
					isDefault:data.isDefault
			};
			tempSort = data.sort;
		}
	}
	for(var i=0 ;i<dataList.length ;i++){
		var data = dataList[i];
		if(data.sort == tempSort){
			temp.push(my);
		}else if(data.sort == sort){
			temp.push(up);
		}else{
			temp.push(data);
		}
		
	}
	$("#oneList").jqGrid('clearGridData');
	for ( var i = 0; i <= temp.length; i++){
	    $("#oneList").jqGrid('addRowData', i, temp[i]);
	}
	dataList = temp;
}

/**
 * 向下按钮的点击事件
 * @param tableType
 * @param sort
 */
function downRow(rowId,sort){
	if(rowId == dataList.length-1 ){
//		pop_tip_open("blue","");
		return false;
	}
	sort = parseInt(sort);
	getTempData();
	var tempSort;//下一条sort
	var my ;//本条
	var down ;//下一条
	var temp = [];
	//交换顺序
	for(var i=0 ;i<dataList.length ;i++){
		var data = dataList[i];
		if(data.sort == sort){
			my = {
					id:data.id,
					opinion:data.opinion,
					sort:data.sort,
					isDefault:data.isDefault
			};
		}else if(data.sort > sort){
			down = {
					id:data.id,
					opinion:data.opinion,
					sort:sort,
					isDefault:data.isDefault
			};
			tempSort = data.sort;
			break;
		}
	}
	my.sort = tempSort;
	for(var i=0 ;i<dataList.length ;i++){
		var data = dataList[i];
		if(data.sort == sort){
			temp.push(down);
		}else if(data.sort == tempSort){
			temp.push(my);
		}else{
			temp.push(data);
		}
		
	}
	$("#oneList").jqGrid('clearGridData');
	for ( var i = 0; i <= temp.length; i++){
	    $("#oneList").jqGrid('addRowData', i, temp[i]);
	}
	dataList = temp;
}

/**
 * 增加按钮的点击事件
 * @param tableType
 * @param sort
 */
function addRow(sort){
	sort = parseInt(sort);
	getTempData();
	var temp = [];
	for(var i=0 ;i<dataList.length ;i++){
		var data = dataList[i];
		if(data.sort < sort){
			temp.push(data);
		}else if(data.sort == sort){
			temp.push(data);
			var add = {sort:(sort+1),opinion:""};
			temp.push(add);
		}else if(data.sort > sort){
			data.sort += 1;
			temp.push(data);
		}
	}
	$("#oneList").jqGrid('clearGridData');
	for ( var i = 0; i <= temp.length; i++){
	    $("#oneList").jqGrid('addRowData', i, temp[i]);
	}
	dataList = temp;
}
/**
 * 删除按钮的点击事件
 * @param tableType
 * @param sort
 */
function deleteRow(sort){
	sort = parseInt(sort);
	getTempData();
	var temp = [];
	for(var i=0 ;i<dataList.length ;i++){
		var data = dataList[i];
		if(data.sort != sort){
			temp.push(data);
		}
	}
	if(temp.length == 0){
		var data={
				opinion:"",
				sort:1,
				isDefault:0
		};
		temp.push(data);
	}
	$("#oneList").jqGrid('clearGridData');
	for ( var i = 0; i <= temp.length; i++){
	    $("#oneList").jqGrid('addRowData', i, temp[i]);
	}
	dataList = temp;
}
function getTempData(){
	var grid = $("#oneList");
	var ids = grid.jqGrid('getDataIDs');
	for (var i = 0; i < ids.length; i++) {//关闭所有编辑模式
		grid.jqGrid('saveRow',ids[i]);
	}
    var temp = [];
    var allRowData = grid.jqGrid().getRowData();
    for(var i=0 ;i<allRowData.length ;i++){
		var data = {};
		data.id = allRowData[i].id;
		data.opinion = allRowData[i].opinion;
		data.sort = allRowData[i].sort;
		data.isDefault = allRowData[i].isDefault;
		temp.push(data);
	}
    dataList = temp;
}

/**
 * 将三个grid设置为编辑状态
 */
function changeAllGridIntoEditStatus(){
	changeGridIntoEditStatus("one");
}
/**
 * 保存按钮对应的点击事件
 */
function udpateApproveAndOtherData(){
	var grid = $("#oneList");
	var ids = grid.jqGrid('getDataIDs');
	var flag = true;
    for (var i = 0; i < ids.length; i++) {
    	opinion=$("#"+ids[i]+"_opinion").val();
    	if(!opinion){
    		pop_tip_open("blue", "不可为空");
    		flag = false;
    		return false;
    	}
    }
    if(flag){
    	for (var i = 0; i < ids.length; i++) {//关闭所有编辑模式
    		grid.jqGrid('saveRow',ids[i]);
    	}
    }
    var temp = [];
    var allRowData = grid.jqGrid().getRowData();
    for(var i=0 ;i<allRowData.length ;i++){
		var data = {};
		data.opinion = allRowData[i].opinion;
		data.sort = (i+1);
		data.isDefault = allRowData[i].isDefault=="true"?1:0;
		data.delflag = false;
		temp.push(data);
	}
	$.ajax({ //发送更新的ajax请求
	    type: "post",  
	    url: hostUrl+"flow/flowUserOpinion/saveUserOpinIons",  
	    data: JSON.stringify(temp),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){ 
	    	window.opener.getUserOpinions();
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

var dataList = [];
/**
 * 获取三个表格的所有数据
 */
function queryApproveAllData(){
	var dataObj ={"delflag":false,"sidx":"sort"};
	$.ajax({ //发送更新的ajax请求
	    type: "post",  
	    url: hostUrl+"flow/flowUserOpinion/queryUserOpinion",    
	    dataType:"json",  
	    data: JSON.stringify(dataObj),
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){ 
	    	var list = data.result;
	    	
	    	if(!list || list.length == 0){
	    		var data1 = {defaultNote:'', tableId:"one",sort:1};
	    		list = [];
	    		list.push(data1);
	    	}
	    	pageInitForThreeJQGridTables();
	    	
	    	//往JQGrid增加数据
	    	for ( var i = 0; i < list.length; i++){
	    		var da = {opinion:list[i].opinion,sort:list[i].sort,id:list[i].id,isDefault:list[i].isDefault}
	    		dataList.push(da);
	    		$("#oneList").jqGrid('addRowData', i, list[i]);
	    	}
    		if(dataList.length == 0){
    			var data={
    					opinion:"",
    					sort:1
    			};
    			$("#oneList").jqGrid('addRowData',0,data);
    		}
	    },  
	    error: function(data){  
	    	if(data.msg){
	    		pop_tip_open("red",data.msg);
	    	}else{
	    		pop_tip_open("red","修改失败！");
	    	}
	    }  
	}); 
}