/** 数据权限作用域列表
 * @author gyh
 * @date 2017-3-22
 */
var dataItemGrid;//表格对象
var dataItemId;//选中行ID


/**
 * 加载数据权限作用域表格
 */
function initdataItemGrid(){
	var ubody = "sys/res/dataItem/queryDataItemAndPointList";
	var uall = hostUrl+ubody;
	var postdata ={
			delflag:false
	};
	var appId = $('#appId option:selected').val();
	if(appId !=null){
		postdata.appId=appId;
	}
	//创建jqGrid组件
	dataItemGrid = jQuery("#dataItemList").jqGrid(
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
				             {name : 'appId',label : '所属系统ID',width : 80,align : "center",hidden : true},
				             {name : 'appName',label : '所属系统',width : 80,align : "center"},
				             //{name : 'ctrlCode',label : '作用域编号',width : 80,align : "center"},
				             //{name : 'ctrlName',label : '作用域名称',width : 80,align : "center"},
				             {name : 'itemCode',label : '对象编号',width : 80,align : "center"},
				             {name : 'itemName',label : '业务对象',width : 80,align : "center"},
				             {name : 'pointIds',label : '控制点IDs',width : 80,align : "center",hidden : true},
				             {name : 'pointNames',label : '控制点',width : 230,align : "center"},
				             {name : 'remark',label : '说明',width : 280,align : "center"}
				             ],
				             rowNum : -1,//不分页
				             //rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
				             //pager : '#pager2',//表格页脚的占位符(一般是div)的id
				             sortname : 'id',//初始化的时候排序的字段
				             sortorder : "desc",//排序方式,可选desc,asc
				             ondblClickRow:function(rowid){
				            	 editType = 1;
				            	 dataItemId = rowid;
				            	 window.open("dataItem_edit.html");
				             },
				             loadError:function(xhr,status,error){
				            	 $.xljUtils.tip("red","加载数据权限作用域表格请求失败");
				             },
				             gridComplete: function(){
				            	 if(dataItemId){
					        		 $(this).jqGrid("setSelection",dataItemId);
					        	 }
				              	$.xljUtils.addGridScroll();
				            	$.xljUtils.gridResizeFn();
				              },
//				             mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
				             viewrecords : true
			}).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}

/**
 * 切换系统加载数据权限作用域表格
 */
function selectDataItemForm(ele){
	if(ele.value == ""){
		var postData = dataItemGrid.jqGrid("getGridParam", "postData");
		$.each(postData, function (k, v) {
			delete postData[k];
		});
		var queryData2={
				delflag:false
		};
		dataItemGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	}else{
		var queryData2={
				delflag:false,
				appId:ele.value
		};
		dataItemGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	}
}

/**
 *  编辑控制点
 */
function editDataPoint(){
	var ids=dataItemGrid.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择一条业务对象");
	}else{
		dataItemId = ids;
		window.open("dataPoint_list.html");
	}
}

//打开方式：0新增，1编辑。默认新增
var editType=0;
var selAppId;
var selAppName;
/**
 * 新增作用域业务对象
 */
function addDataItem(){
	editType=0;
	//选中appId
	selAppId=$('#appId option:selected').val();
	selAppName= $('#appId option:selected').text();
	window.open("dataItem_edit.html");
}

/**
 * 修改作用域业务对象
 */
function editDataItem(){
	var ids=dataItemGrid.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择一条业务对象");
	}else{
		dataItemId = ids;
		editType = 1;
		window.open("dataItem_edit.html");
	}
}

/**
 * 删除作用域业务对象
 */
function deleteDataItem(){
	var ids=dataItemGrid.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择一条业务对象");
	}else{
		pop_text_open("blue",'确定删除这【1】条数据吗？',function(){
			var uBody = "sys/res/dataItem/update/"+ids;
			var uAll = hostUrl + uBody;
			var postJson={
					id:ids,
					delflag:true
			};
			$.ajax({
				type:'PUT',
				url:uAll,
				dataType:'json',
				contentType:'application/json',
				data:JSON.stringify(postJson),
				success: function(json) {
					if(json.success == true){
						pop_tip_open("green",'删除成功');
						//刷新表格
						var appIdvaule = $('#appId option:selected').val();
						if(appIdvaule == ""){
							var postData = dataItemGrid.jqGrid("getGridParam", "postData");
							$.each(postData, function (k, v) {
								delete postData[k];
							});
							var queryData2={
									delflag:false
							};
							dataItemGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
						}else{
							var queryData2={
									delflag:false,
									appId:appIdvaule
							};
							dataItemGrid.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
						}
						var lastId = '';
						if($("#dataItemList #"+ids).prev().length >0){
							lastId=$("#dataItemList #"+ids).prev()[0].id;//获取选择数据上一行的ID
						}
						if(lastId!='' && lastId!=null){
							dataItemId=lastId;
						}
					}else{
						pop_tip_open("red",json.msg);
					}
				},error:function(XMLHttpRequest, textStatus, errorThrown){
					pop_tip_open("red","删除数据请求失败");
				}
			})
	    },true);
	}
}


/**
 * 初始化系统下拉框
 */
function getAppData(){
	var ubody = "sys/res/appSystem/queryList";
	var uall = hostUrl+ubody;
	var postdata ={
			appDelFlag:"0",
			appStatus:"1"
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
					var appList=data.result;
					$("#appId").append("<option value=''>全部</option>");
					for(var o in appList){
						$("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
					}
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化系统下拉框请求失败");
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
 * 初始化页面数据
 */
$(function(){
	//初始化系统下拉框数据
	getAppData();
	//初始化initdataItemGrid
	initdataItemGrid();
	//页面加载完毕后更改grid宽高
	$.xljUtils.resizeNestedGrid();
	//禁用所有按钮的默认行为，即刷新页面
    $('.btn').click(function() {
        return false;
    });
});

