/** 
 * 数据权限作用域列表
 * @author add by shiyong , updata by gyh
 * @date 2017-3-23
 */

var appGridObj;
var appOnId;//选中行ID


/**
 * 初始化系统列表
 */
function initappGridObj(){
	var ubody = "sys/res/appSystem/queryList";
	var uall = serviceUrl+ubody;
    //创建jqGrid组件
    appGridObj = jQuery("#appGrid").jqGrid(
        {
        	url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",  
            contentType : "application/json",  
            postData:{appDelFlag:"0"},
            datatype : "json", 
            jsonReader : {
                root:"result"
            },
            rownumbers: true,
            autowidth:true,
            colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                 {name : 'id',label : '序号',width : 55,align : "center",hidden : true},
                 {name : 'code',label : '系统编码',width : 80,align : "center"},
                 {name : 'name',label : '显示名称',width : 80,align : "center",cellattr: addCellAttr},
                 {name : 'fullName',label : '全称',width : 120,align : "center"},
                 {name : 'url',label : '系统首页URL',width : 200,align : "center"},
                 {name : 'isextsys',label : '是否外系统',width : 80,align : "center", formatter:isextsysFmatter},
                 {name : 'status',label : '是否启用',width : 80,align : "center", formatter:statusFmatter,cellattr: addCellAttr},
                 {name : 'icon',label : '图标文件',width : 130,align : "center",formatter:function(icon){
                 	if(icon){
                		return '<img src="data:image/jpeg;base64,'+icon+'" style="width:30px;height:30px">';
                	}else{
                		return "";
                	}
                }},
                 {name : 'openmode',label : '打开方式',width : 80,align : "center", formatter:openmodeFmatter},
                 {name : 'sort',label : '排序号',width : 80,align : "center",hidden : true},
                 {name : 'remark',label : '说明',width : 230,align : "center"}
            ],
            rowNum : -1,//一页显示多少条
//            rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
//            pager : '#pager2',//表格页脚的占位符(一般是div)的id
            ondblClickRow:function(rowid){
            	editType=1;
            	updateAppId = rowid;
            	window.open("app_edit.html");
            },
            loadError:function(xhr,status,error){
            	$.xljUtils.tip("red","系统列表加载失败");
            },
            gridComplete: function(){
            	if(appOnId){
            		$("#"+appOnId).focus();
            		$(this).jqGrid("setSelection",appOnId);
            	}
            	$.xljUtils.addGridScroll();
            	$.xljUtils.gridResizeFn();
            },
            sortname : 'id',//初始化的时候排序的字段
            sortorder : "desc",//排序方式,可选desc,asc
//            mtype : "POST",//向后台请求数据的ajax的类型。可选post,get
            viewrecords : true
        }).navGrid('#pager2', { add: false, edit: false, del: false,search:false,refresh:false });
}
//打开方式：0新增，1编辑。默认新增
var editType=0;

/**
 * 增加业务系统
 */
function addApp(){
	 editType=0;
	window.open("app_edit.html");
}

/**
 * 修改业务系统
 */
var updateAppId;
function updateApp(){
	var ids=appGridObj.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选中一条系统");
	}else{
		appOnId=ids;
		updateAppId = ids;
		editType=1;
		window.open("app_edit.html");
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
				status:status,
		};
		var uBody = "sys/res/appSystem/updateStatus/"+ids;
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
	        	pop_tip_open("red","修改业务系统状态请求失败");
	        }
	    })
	}
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
			var lastId = $("#appGrid #"+ids).prev()[0].id;	//获取选择数据上一行的ID	
			if(lastId==''||lastId==null ||lastId==undefined){
				pop_tip_open("blue","不可上移");
				return false;
			}
			updatedata.appId1=ids;
			updatedata.appId2=lastId;
			var rowData1 =appGridObj.jqGrid('getRowData',ids);
			var rowData2 =appGridObj.jqGrid('getRowData',lastId);
			updatedata.sort1=rowData1.sort;
			updatedata.sort2=rowData2.sort;
		}else{//下移
			/*console.log($("#appGrid #" + ids).next());
			console.log($("#appGrid #" + ids).next()[0]);*/
			if($("#appGrid #" + ids).next()[0]== undefined){
				pop_tip_open("blue","不可下移");
				return false;
			}
			var nextId = $("#appGrid #" + ids).next()[0].id;//获取选择数据下一行的ID
			if(nextId==''||nextId==null ||nextId==undefined){
				pop_tip_open("blue","不可下移");
				return false;
			}
			updatedata.appId1=ids;
			updatedata.appId2=nextId;
			var rowData1 =appGridObj.jqGrid('getRowData',ids);
			var rowData2 =appGridObj.jqGrid('getRowData',nextId);
			updatedata.sort1=rowData1.sort;
			updatedata.sort2=rowData2.sort;
		}
		
		var uBody = "sys/res/appSystem/upOrDown";
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
				pop_tip_open("red","修改业务系统状态请求失败");
			}
		})
	}
}


/**
 * 删除app业务系统
 */
function deleteApp(){
	//多选框获取IDS
//	var ids=appGridObj.jqGrid('getGridParam','selarrrow');
	//单选行获取一个ID
	var ids=appGridObj.jqGrid('getGridParam','selrow');
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择业务系统");
	}else{
		pop_text_open("blue","确定要删除这【1】条数据吗？",function(){
			var uBody = "sys/res/appSystem/deletePseudoBatch/"+ids;
		    var uAll = serviceUrl + uBody;
			$.ajax({
		        type:'DELETE',
		        url:uAll,
		        dataType:'json',
		        success: function(json) {
		        	if(json.success == true){
		        		var lastId = '';
		        		if($("#appGrid #"+ids).prev().length >0){
		        			lastId=$("#appGrid #"+ids).prev()[0].id;//获取选择数据上一行的ID
		        		}
		        		if(lastId!='' && lastId!=null){
		        			appOnId=lastId;
		        		}

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
		        	pop_tip_open("red","删除业务系统请求失败");
		        }
		    })
	    },true);
	}
}
/**
 * 是否外系统格式化
 */
function isextsysFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "是";
	}else if(cellvalue == "0"){
		return "否";
	}else{
		return "";
	}
}

/**
 * 是否启用格式化
 */
function statusFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "启用";
	}else if(cellvalue == "0"){
		return "禁用";
	}else{
		return "";
	}
}
/**
 * 打开方式格式化
 */
function openmodeFmatter(cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "内部打开";
	}else if(cellvalue == "0"){
		return "新窗口打开";
	}else{
		return "";
	}
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
 * 禁用回车事件
 */
$(document).keydown(function(event){
  switch(event.keyCode){
     case 13:return false; 
     }
});
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
