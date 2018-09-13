/** 
 * 数据权限作用域列表
 * @author gyh
 * @date 2017-3-22
 */
//控制点业务对象ID
var dataItemId=window.opener.dataItemId;
//控制点表格对象
var dataPointGrid;

/**
 * 加载控制点表格
 */
function initdataPointGrid(){
	var ubody = "sys/res/dataPoint/queryByPram";
	var uall = serviceUrl+ubody;
	var postdata ={
			delflag:false,
			itemId:dataItemId
	};
	//创建jqGrid组件
	dataPointGrid = jQuery("#dataPointList").jqGrid(
			{
				url: uall,
				ajaxGridOptions: { contentType: 'application/json' },
				mtype : "POST",  
				contentType : "application/json",  
				postData:postdata,
				datatype : "json", 
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
				             ondblClickRow:function(rowid){
				            	 editType=1;
				            	 dataPointId = rowid;
				            	 window.open("dataPoint_edit.html");
				             },
				             loadError:function(xhr,status,error){
				            	 $.xljUtils.tip("red","控制点列表请求失败");
				             },
				             gridComplete: function(){
				              	/*//页面加载完毕后更改grid宽高
				                $.xljUtils.resizeNestedGrid();*/
				                 
				              	$.xljUtils.addGridScroll();
				            	$.xljUtils.gridResizeFn();
				            	
				              },
				             sortname : 'id',//初始化的时候排序的字段
				             sortorder : "desc",//排序方式,可选desc,asc
//				             mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
				             viewrecords : true
			}).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}
/**
 * 控制点类型渲染
 */
function typeFormatter(cellvalue, options, rowObject){
	if(cellvalue == "1"){
		return "普通";
	}else if(cellvalue == "2"){
		return "引用";
	}
}
/**
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
/**
 * 增加控制点
 */
var itemId;//作用域业务对象ID
function addDataPoint(){
	itemId=dataItemId;
	editType=0
	window.open("dataPoint_edit.html");
}

/**
 * 修改控制点
 */
var dataPointId;//控制点ID
function updateDataPoint(){
	var ids=dataPointGrid.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择一个控制点");
	}else{
		dataPointId = ids;
		editType=1;
		window.open("dataPoint_edit.html");
	}

}


/**
 * 删除控制点
 */
function deleteDataPoint(){
	var ids=dataPointGrid.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择一个控制点");
	}else{
		pop_text_open("blue",'确定删除这【1】条数据吗？',function(){
			var postJson={};
			postJson.ids=ids;
			//逻辑删除
			var uBody = "sys/res/dataPoint/deleteByIds";
			var uAll = serviceUrl + uBody;
			$.ajax({
				type:'PUT',
				url:uAll,
				dataType:'json',
				contentType:'application/json',
				data:JSON.stringify(postJson),
				success: function(json) {
					if(json.success == true){
						pop_tip_open("green",'删除成功！');
						var queryData2={
								delflag:false
						};
						dataPointGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
						window.opener.dataItemGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
					}else{
						pop_tip_open("red",json.msg);
					}
				},error:function(XMLHttpRequest, textStatus, errorThrown){
					pop_tip_open("red","删除控制点请求失败");
				}
			})
	    },true);
	}
}

/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}
/**
 * 初始化作用域业务对象信息
 */
function initDataItem(){
	var ubody = "sys/res/dataItem/queryDataItemAndPointList";
	var uall = serviceUrl+ubody;
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
					$("#itemId").val(item.id);
					$("#appId").val(item.appId);
					$("#appName").val(item.appName);
					$("#ctrlCode").val(item.ctrlCode);
					$("#ctrlName").val(item.ctrlName);
					$("#itemCode").val(item.itemCode);
					$("#itemName").val(item.itemName);		 
				}
			}else{
				pop_tip_open("red","初始化作用域业务对象信息失败");
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化作用域业务对象信息请求失败");
		}
	})
}


/**
 * 格式化样式
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
	if(rowObject.status == "0" ){
		return "style='color:red'";
	}
}

/**
 * 初始化数据
 */
$(function(){
	//初始化系统下拉框数据
	initDataItem();
	//初始化initdataPointGrid
	initdataPointGrid();

	//页面加载完毕后更改grid宽高
	$.xljUtils.resizeNestedGrid(10);
	//禁用所有按钮的默认行为，即刷新页面
	$('.btn').click(function() {
		return false;
	});
});

