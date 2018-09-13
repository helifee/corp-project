var appOnId;//选中行ID
var appGridObj;
$(function(){
	//初始化initappGridObj
	initappGridObj();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
  //禁用所有按钮的默认行为，即刷新页面
    $('.btn').click(function() {
        return false;
    });
});

/**
 * 窗体加载数据列表
 */
function initappGridObj(){
    //创建jqGrid组件
    appGridObj = jQuery("#company_datagrid").jqGrid(
        {
        	url: baseUrl+'pl/plCompany/queryList',
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{appDelFlag:"0"},
            datatype : "json", 
            jsonReader : {
                root:"result"
            },
            rownumbers:true,
            autowidth:true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
		                     {name : 'companyId',label : 'companyId',width : 75, align:"center",hidden : true},
		                     {name : 'id',label : 'id',width : 75, align:"center",hidden : true},
		                     {name : 'px',label : '序号',width : 75, align:"center",hidden : true,editable : true},
	                         {name : 'code',label : '公司编码', align:"center",width : 55,hidden : true,editable : true},
	                         {name : 'name',label : '公司名称',width : 90,align:"center",editable : true},
	                         {name : 'isDelete',label : '显示/隐藏',width : 100,align:"center",editable : true,edittype : "select",editoptions : {value : "0:显示;1:隐藏"},
	                        	 formatter: function (v, opt, rec) { if (v == '0') return "显示"; return "<font color='red'>隐藏</font>"; }, unformat: function (v) { if (v == '显示') return '0'; return '1'; }}
           ],
            rowNum : -1,//一页显示多少条
//            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
//            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            ondblClickRow:function(rowid){
//            	editType=1;
//            	updateAppId = rowid;
//            	window.open("app_edit.html");
            },
            loadError:function(xhr,status,error){
            	$.xljUtils.tip("red","系统列表加载失败");
            },
            gridComplete: function(){
            	if(appOnId){
            		$(this).jqGrid("setSelection",appOnId);
            	}
            	$.xljUtils.addGridScroll();
            	$.xljUtils.gridResizeFn();
            },
            sortname : 'px',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}
/**
 * 上移app
 */
function upOrDownApp(status){
	var ids=appGridObj.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选中一条系统");
	}else{
		appOnId=ids;
		var updatedata = {};
		if(status==0){//上移
			var lastId = $("#company_datagrid #"+ids).prev()[0].id;	//获取选择数据上一行的ID	
			if(lastId==''||lastId==null ||lastId==undefined){
				pop_tip_open("blue","不可上移");
				return false;
			}
			updatedata.appId1=ids;
			updatedata.appId2=lastId;
			var rowData1 =appGridObj.jqGrid('getRowData',ids);
			var rowData2 =appGridObj.jqGrid('getRowData',lastId);
			updatedata.sort1=rowData1.px;
			updatedata.sort2=rowData2.px;
		}else{//下移
			console.log($("#company_datagrid #" + ids).next());
			console.log($("#company_datagrid #" + ids).next()[0]);
			if($("#company_datagrid #" + ids).next()[0]== undefined){
				pop_tip_open("blue","不可下移");
				return false;
			}
			var nextId = $("#company_datagrid #" + ids).next()[0].id;//获取选择数据下一行的ID
			if(nextId==''||nextId==null ||nextId==undefined){
				pop_tip_open("blue","不可下移");
				return false;
			}
			updatedata.appId1=ids;
			updatedata.appId2=nextId;
			var rowData1 =appGridObj.jqGrid('getRowData',ids);
			var rowData2 =appGridObj.jqGrid('getRowData',nextId);
			updatedata.sort1=rowData1.px;
			updatedata.sort2=rowData2.px;
		}
		
		var uBody = "pl/plCompany/upOrDown";
		var uAll = serviceUrl + uBody;
		$.ajax({
			type:'PUT',
			url:uAll,
			async: false,
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(updatedata),
			success: function(json) {
				if(json.success == true){
					pop_tip_open("green",json.msg);
					var queryData2={
							appDelFlag:"0"	            			
					};
					appGridObj.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
				}else{
					pop_tip_open("red",json.msg);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				pop_tip_open("red","移动失败");
			}
		})
	}
}

/**
 * 修改业务系统状态
 */
function updatestatus(status){
	var ids=appGridObj.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选中一条系统");
	}else{
		appOnId=ids;
		var updatedata ={
				is_delete:status,
		};
		var uBody = "pl/plCompany/update/"+ids;
	    var uAll = serviceUrl + uBody;
		$.ajax({
			type:'PUT',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(updatedata),
	        success: function(json) {
	            if(json.success == true){
	            	pop_tip_open("green",json.msg);
	            	var queryData2={
	            			appDelFlag:"0"	            			
	            			};
	            	appGridObj.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            	//appGridObj.jqGrid('setSelection',ids);
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	        },
	        error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","显示/隐藏失败");
	        }
	    })
	}
}


/**
 * 修改业务系统状态
 */
function syncompanys(){
	
		var updatedata ={
				is_delete:0,
		};
		var uBody = "pl/plCompany/getCompanies";
	    var uAll = serviceUrl + uBody;
		$.ajax({
			type:'PUT',
	        url:uAll,
	        async: false,
	        dataType:'json',
	        contentType:'application/json',
	        data:JSON.stringify(updatedata),
	        success: function(json) {
	            if(json.success == true){
	            	pop_tip_open("green",json.msg);
	            	var queryData2={
	            			appDelFlag:"0"	            			
	            			};
	            	appGridObj.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	            	//appGridObj.jqGrid('setSelection',ids);
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	        },
	        error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","同步公司请求失败");
	        }
	    })
}