/* 数据权限作用域列表
 * @author gyh
 * @date 2017-3-22
 */
//控制点业务对象ID
var dataItemId=window.opener.dataItemId;
//控制点表格对象
var dataPointGrid;

/*
 * TODO 加载控制点表格
 */
function initdataPointGrid(){
	var ubody = "sys/res/dataPoint/queryByPram";
	var uall = baseUrl+ubody;
	var postdata ={
			delflag:false,
			itemId:dataItemId
	};
    //创建jqGrid组件
    dataPointGrid = jQuery("#list2").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:postdata,
            datatype : "json", 
            height:480,
            jsonReader : {
                root:"result"
            },
            autowidth:true,
            rownumbers: true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : 'id',width : 55,align : "center",hidden : true},
                 {name : 'code',label : '控制点编号',width : 80,align : "center"},
                 {name : 'name',label : '控制点名称',width : 80,align : "center"},
                 {name : 'type',label : '控制点类型',width : 80,align : "center",formatter:typeFormatter},
                 {name : 'model',label : '打开方式',width : 80,align : "center",formatter:modelFormatter},
                 {name : 'url',label : 'URL',width : 80,align : "center"},
                 {name : 'remark',label : '备注说明',width : 180,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
            //rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
            //pager : '#pager2',//表格页脚的占位符(一般是div)的id
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}
/*
 * 控制点类型渲染
 */
function typeFormatter(cellvalue, options, rowObject){
	if(cellvalue == "1"){
		return "普通";
	}else if(cellvalue == "2"){
		return "引用";
	}
}
/*
 * 打开方式渲染
 */
function modelFormatter(cellvalue, options, rowObject){
	if(cellvalue == "1"){
		return "树型";
	}else if(cellvalue == "2"){
		return "列表";
	}else{
		return "";
	}
}

//打开方式：0新增，1编辑。默认新增
var editType=0;

/*
 * 增加控制点
 */
var itemId;//作用域业务对象ID
function addDataPoint(){
	itemId=dataItemId;
	editType=0
	window.open("dataPoint_edit.html");
}

/*
 * 修改控制点
 */
var dataPointId;//控制点ID
function updateDataPoint(){
	var ids=dataPointGrid.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择一个控制点");
	}else{
		dataPointId = ids;
		editType=1;
		window.open("dataPoint_edit.html");
	}
	
}


/*
 * 删除控制点
 */
function deleteDataPoint(){
	var ids=dataPointGrid.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		alert("请选择控制点");
	}else{
		var postJson={};
		postJson.ids=ids;
		//逻辑删除
		var uBody = "sys/res/dataPoint/deleteByIds";
	    var uAll = baseUrl + uBody;
		$.ajax({
	        type:'PUT',
	        url:uAll,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(postJson),
	        success: function(json) {
	        	if(json.success == true){
	            	alert('删除成功！');
	            	var queryData2={
	            			delflag:false
	            	};
	            	dataPointGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            	window.opener.dataItemGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            }else{
	            	alert(json.msg);
	            }
	        }
	    })
	}
}

/*
 * 关闭页面
 */
function closeWin(){
	window.close();
}
/*
 * TODO 初始化作用域业务对象信息
 */
function initDataItem(){
	var ubody = "sys/res/dataItem/queryDataItemAndPointList";
	var uall = baseUrl+ubody;
	var postdata ={
			id:dataItemId
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
        			 var item=data.result[0];
        			 $("#itemId").text(item.id);
        			 $("#appId").text(item.appId);
        			 $("#appName").text(item.appName);
        			 $("#ctrlCode").text(item.ctrlCode);
        			 $("#ctrlName").text(item.ctrlName);
        			 $("#itemCode").text(item.itemCode);
        			 $("#itemName").text(item.itemName);		 
        			 $("#remark").text(item.remark);		 
        		 }
        	}else{
        		return data.msg
        	}
     }
	})
}


/*
 * 格式化样式
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status == "0" ){
        return "style='color:red'";
    }
}

/*
 * 初始化数据
 */
$(function(){
	//初始化系统下拉框数据
	initDataItem();
	//初始化initdataPointGrid
	initdataPointGrid();
	
	//common--list.js中需要引用的东西
	$('#list2').jqGrid().setGridWidth($('.container-all').width());
    //禁用所有按钮的默认行为，即刷新页面
    $('.btn').click(function() {
        return false;
    });
    $('.btn-adv').click(function() {
        expandedSearch();
        $('#list2').jqGrid().setGridHeight(computeGridHeight());
    });
    //grid随窗口变化高度
    $(window).resize(function() {
        $('#list2').jqGrid().setGridHeight(computeGridHeight());
        $('#list2').jqGrid().setGridWidth($('.container-all').width());
    });
});

//扩展搜索
function expandedSearch() {
    var s_Area = $('.expand-search');
    var s_btn = $('.btn-adv > i');
    if(s_Area.height() == 36) {
        s_Area.css({"height":"114px"});
        s_btn.removeClass('fa-angle-down').addClass('fa-angle-up');
    }else{
        s_Area.css({"height":"36px","overflow":"hidden"});
        s_btn.removeClass('fa-angle-up').addClass('fa-angle-down');
    }
}
//计算jqgrid的高度
function computeGridHeight() {
    return $(window).height() - $('.xj-main-breadcrumbs').height() - $('.xj-main-advanced').height() - $('.xj-main-dimsearch').height() - 80;
}
