/** 
 * 数据权限作用域列表
 * @author add by shiyong , updata by gyh
 * @date 2017-3-23
 */

var menuOnId;
var menuGridObj;
var arr = new Array();//数据
/**
 * 加载菜单列表
 */
function initMenuGridObj(appId){
	$.xljUtils.removeGridScroll("xjtreegrid-body");

	var colWidth=$('.xj-main-grid').width();
	//参数跟jqgrid相似
	var options={
			ExpandLevel:2,//默认打开的级次，从0开始
			colNames:["id","所属系统","菜单名称","菜单级次","菜单编码","上级菜单id","上级菜单","是否虚拟菜单","状态","图标","是否第三方菜单","URL",'排序号',"打开方式","说明"],
			colModel:[ 
			          {name : 'id',label : 'id',width : 55,align : "center",hidden : true},
			          {name : 'appName',label : '所属系统',width : 250,align : "center",hidden : true},
			          {name : 'name',label : '菜单名称',width : colWidth*0.15 ,align : "left",cellattr: addCellAttr},
			          {name : 'level',label : '菜单级次',width : colWidth*0.04,align : "center"},
			          {name : 'code',label : '菜单编码',width : colWidth*0.08,align : "center"},
			          {name : 'parentId',label : '上级菜单id',width : 180,align : "center",hidden : true},
			          {name : 'parentName',label : '上级菜单',width : colWidth*0.11,align : "center"},
			          {name : 'isinventedmenu',label : '是否虚拟菜单',width : colWidth*0.08,align : "center"},
			          {name : 'status',label : '状态',width : colWidth*0.04,align : "center"},
			          {name : 'menuIcon',label : '图标',width : colWidth*0.04,align : "center"},
			          {name : 'isoutmenu',label : '是否第三方菜单',width : colWidth*0.06,align : "center"},
			          {name : 'url',label : 'URL',width : colWidth*0.19,align : "left"},
			          {name : 'sort',label : '排序号',width : 50,align : "center",hidden : true},
			          {name : 'openmode',label : '打开方式',width : colWidth*0.05,align : "center"},
			          {name : 'remark',label : '说明',width : colWidth*0.15,align : "center"}
			          ],
			  click:function(id,row,col,colname,value){//回调方法，单击单元格时触发，分别表示id、行号、列号、列名（colModel中name值）、单元格内容
				  menuOnId=id;
				  $(".ui-state-highlight").removeClass("ui-state-highlight");
				  $("#"+id).addClass("ui-state-highlight");
			  }
	};
	arr = initJsonData(appId);
	$funXjJqgrid=$("#menuList").xjTreegrid(options);
	$funXjJqgrid.loadJsonData(arr);
	initGridStyle();
}
function initGridStyle(){
	$.each(arr,function(i,val){
		if(val.status == "禁用"){
			$("#"+val.id).find("div[colname='name']").css('color','red');
			$("#"+val.id).find("div[colname='status']").css('color','red');
		}
	});
	if(menuOnId){
		$(".ui-state-highlight").removeClass("ui-state-highlight");
		$("#"+menuOnId).addClass("ui-state-highlight");
	}
	$(".xjtreegrid-body").height($(".xj-main-grid").height()-50);
	$.xljUtils.removeGridScroll("xjtreegrid-body");
	$(".nicescroll-rails").remove();
	$.xljUtils.addGridScroll("xjtreegrid-body");
	$("div[id$='-hr']").remove();//去除横向滚动条送
	$.xljUtils.treeResizeFn("xjtreegrid-body");
}
function initJsonData(appId){
	var arr;
	var ppdata={"menuDelFlag":"0","appId":appId};
	var ubody = "sys/res/resource/queryList";
	var uall = serviceUrl+ubody;
	$.ajax({
		type:'post',
		url:uall,
		dataType:'json',
		async: false,
		contentType:'application/json',
		data:JSON.stringify(ppdata),
		async: false,
		success: function(data) {
			if(data.success){
				if(data.result){
					arr=data.result;
					var val;
					for(var o in arr){
						arr[o].fullid=arr[o].prefixId;
						arr[o].isShow=true;
						arr[o].pId = arr[o].parentId;
						val=arr[o]
						if(val.status == "1"){
							val.status="启用";
						}else if(val.status == "0"){
							val.status="禁用";
						}
						
						if(val.isinventedmenu ==  "1"){
							val.isinventedmenu ="是";
						}else if(val.isinventedmenu == "0"){
							val.isinventedmenu ="否";
						}
						
						if(val.isoutmenu ==  "1"){
							val.isoutmenu ="是";
						}else if(val.isoutmenu  == "0"){
							val.isoutmenu ="否";
						}
						
						if(val.openmode ==  "1"){
							val.openmode ="内部打开";
						}else if(val.openmode  == "0"){
							val.openmode ="新窗口打开";
						}
					}	
					return arr; 
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化数据请求失败");
		}
	});
	return arr;
}
//计算高度
function resizeHeight(){
	//左侧  头部底部为60px  title类 为50px
	var w_h = $(window).height();
	$('.xj-main-grid').height(w_h-70);
	
}

//grid 自适应宽度
$(window).resize(function(){
	resizeHeight();
	if($(".xjtreegrid-body").length>0){
		$(".xjtreegrid-body").height($(".xj-main-grid").height()-50);
	}
});
/**
 * 追加表格数据，模拟分页
 */
//初始化数据
var pageFlag=true;
var limit=50;//每页条数
var start=limit;//下拉分页初始条数
function addGridPage(){
	var gridH=$('#ascrail2000');
	var gridHight=$('#ascrail2000').height();
	var scroll=gridH.find('div')[0];
	var top=$(scroll).css('top').replace('px','');
	var sH=$('#ascrail2000 div').height();
	if(gridHight-top-sH<=30 && pageFlag){
		pageFlag=false;
		queryData2=getMenuParam();
		//请求数据
		var ubody = "sys/res/resource/queryList";
		var uall = serviceUrl+ubody;
		$.ajax({
			type:'POST',
			url:uall,
			dataType:'json',
			contentType:'application/json',
			data:JSON.stringify(queryData2),
			success: function(json) {
				if(json.success == true){
					var dataRow=json.result;
					if(dataRow.length>0){
						menuGridObj.jqGrid("addRowData","id", dataRow, "last");
						try {menuGridObj.jqGrid("setTreeNode", start+1, start+limit+1);} catch (e) {}
						pageFlag=true;
						start=start+limit;
					}
				}else{
					pop_tip_open("red",json.msg);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				pop_tip_open("red","查询列表请求失败");
			}
		})
	}
}
/**
 * 获取查询参数
 */
function getMenuParam(){
	selAppId=$('#appId option:selected').val();
	var paramData={
			menuDelFlag:"0",
			appId:selAppId
//			,start:start
//			,limit:limit
//			,fristLimit:limit
	};
	arr = initJsonData(selAppId);
	$funXjJqgrid.loadJsonData(arr);
	initGridStyle();
	return paramData;
}
/**
 * 重置查询条件
 */
function resetMenuParam(){
	pageFlag=true;
	start=limit;
}
/**
 * 切换系统下拉框
 * @param ele
 */
function selectAppForm(ele){
	resetMenuParam();
	var queryData2=getMenuParam();
	menuOnId="";
//	//menuGridObj.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");
//	initMenuGridObj(appList[0].id);
}
/**
 * 修改菜单状态
 */
function updatestatus(status){
//	var ids=menuGridObj.jqGrid('getGridParam','selrow');
	ids=menuOnId;
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选中一条菜单");
	}else{
		menuOnId=ids;
		var updatedata ={
				status:status,
		};
		var uBody = "sys/res/resource/update/"+ids;
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
	            	resetMenuParam();
	            	var queryData2=getMenuParam();
//	            	//menuGridObj.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");
	            }else{
	            	pop_tip_open("red",json.msg);
	            }
	        },
	        error:function(XMLHttpRequest, textStatus, errorThrown){
	        	pop_tip_open("red","修改菜单状态请求失败");
	        }
	    })
	}
	
}
//打开方式：0新增，1编辑。默认新增
var editType=0;
var selAppId;
var selAppName;
/**
 * 增加菜单
 */
function addMenu(){
	editType=0;
	//选中appId
	selAppId=$('#appId option:selected').val();
	selAppName= $('#appId option:selected').text();
	window.open("menu_edit.html");
}
/**
 * 上移app
 */
function upOrDownApp(status){
//	var ids=menuGridObj.jqGrid('getGridParam','selrow');
	ids=menuOnId;
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选中一条数据");
	}else{
		menuOnId=ids;
		var updatedata = {};
//		var obj=menuGridObj.jqGrid("getRowData");
		obj = arr;
		if(status==0){//上移
			var rowData1 = $funXjJqgrid.getRowData(menuOnId);
//			var rowData1 =menuGridObj.jqGrid('getRowData',ids);
			var level=rowData1.level;
			var pId=rowData1.parentId;
			var levelObg=[];
			var j=0;
			$.each(obj,function(i,val){
				if(val.level == level && pId == val.parentId){
					levelObg[j]=val;
					j++;
				}
			});
			var index;
			$.each(levelObg,function(i,val){
				if(val.id == ids){
					index=i;
				}
			});
			if(index <= 0){
				pop_tip_open("blue","不可上移");
				return false;
			}
			var lastId=levelObg[index-1].id;
			var rowData2 = $funXjJqgrid.getRowData(lastId);
//			var rowData2 =menuGridObj.jqGrid('getRowData',lastId);
			updatedata.menuId1=ids;
			updatedata.menuId2=lastId;
			updatedata.sort1=rowData1.sort;
			updatedata.sort2=rowData2.sort;
			updatedata.name1=rowData1.name;
			updatedata.name2=rowData2.name;
		}else{//下移
			var rowData1 = $funXjJqgrid.getRowData(menuOnId);
//			var rowData1 =menuGridObj.jqGrid('getRowData',ids);
			var level=rowData1.level;
			var pId=rowData1.parentId;
			var levelObg=[];
			var j=0;
			$.each(obj,function(i,val){
				if(val.level == level && pId == val.parentId){
					levelObg[j]=val;
					j++;
				}
			});
			var index;
			$.each(levelObg,function(i,val){
				if(val.id == ids){
					index=i;
				}
			});
			if(index == levelObg.length-1){
				pop_tip_open("blue","不可下移");
				return false;
			}
			var nextId=levelObg[index+1].id;
			var rowData2 = $funXjJqgrid.getRowData(nextId);
//			var rowData2 =menuGridObj.jqGrid('getRowData',nextId);
			updatedata.menuId1=ids;
			updatedata.menuId2=nextId;
			updatedata.sort1=rowData1.sort;
			updatedata.sort2=rowData2.sort;
			updatedata.name1=rowData1.name;
			updatedata.name2=rowData2.name;
		}
		console.log(updatedata);
		var uBody = "sys/res/resource/upOrDown";
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
					resetMenuParam();
					var queryData2=getMenuParam();
					menuOnId=ids;
//					//menuGridObj.jqGrid("setGridParam", { postData: queryData2,datatype:'json' }).trigger("reloadGrid");
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
 * 修改菜单
 */
var updateMenuId;
function updateMenu(){
//	var ids=menuGridObj.jqGrid('getGridParam','selrow');
	ids=menuOnId;
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择菜单");
	}else{
		updateMenuId = ids;
		editType=1;
		window.open("menu_edit.html");
	}

}

/**
 * 删除菜单
 */
function deleteMenu(){
	//单选行获取一个ID
//	var ids=menuGridObj.jqGrid('getGridParam','selrow');
	ids=menuOnId;
	if(ids == "" || ids == null){
		pop_tip_open("blue","请选择菜单");
	}else{
		pop_text_open("blue",'确定删除此菜单及其下级菜单吗',function(){
			var uBody = "sys/res/resource/deletePseudo/"+ids;
			var uAll = serviceUrl + uBody;
			$.ajax({
				type:'DELETE',
				url:uAll,
				dataType:'json',
				success: function(json) {
					if(json.success == true){
						pop_tip_open("green",json.msg);
						resetMenuParam();
						var queryData2=getMenuParam();
//						//menuGridObj.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");
						
						var lastId = '';
						if($("#menuList #"+ids).prev().length >0){
							lastId=$("#menuList #"+ids).prev()[0].id;//获取选择数据上一行的ID
						}
						if(lastId!='' && lastId!=null){
							menuOnId=lastId;
						}
					}else{
						pop_tip_open("red",json.msg);
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					pop_tip_open("red","删除菜单请求失败");
				}
			})
		},true);
	}
}

/**
 * 加载系统下拉框
 */
function getAppData(){
	var ubody = "sys/res/appSystem/queryListForSelect";
//	var ubody = "sys/res/appSystem/queryList";
	var uall = serviceUrl+ubody;
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
					/*resetMenuParam();
					var queryData2=getMenuParam();
					queryData2.appId=appList[0].id*/
//					//menuGridObj.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");
					for(var o in appList){
						$("#appId").append("<option value='"+appList[o].id+"'>"+appList[o].name+"</option>")
					}
					initMenuGridObj(appList[0].id);
				}
			}else{
				pop_tip_open("red",data.msg);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","加载系统下拉框请求失败");
		}
	})
}

/**
 * 数据格式化
 */
function statusFmatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "启用";
	}else if(cellvalue == "0"){
		return "禁用";
	}
}

/**
 * 是否虚拟菜单格式化
 */
function isinventedmenuFormatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "是";
	}else if(cellvalue == "0"){
		return "否";
	}else{
		return "";
	}
}

/**
 * 是否第三方菜单格式化
 */
function isoutmenuFormatter (cellvalue, options, rowObject) {
	if(cellvalue == "1"){
		return "是";
	}else if(cellvalue == "0"){
		return "否";
	}else{
		return "";
	}
}

/**
 * 打开方式格式化
 */
function openmodeFormatter(cellvalue, options, rowObject) {
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
	resizeHeight();
	//初始化initmenuGridObj
	//initMenuGridObj();
	//初始化系统下拉框数据
	getAppData();
	
	//页面加载完毕后更改grid宽高
	$.xljUtils.resizeNestedGrid();
	//禁用所有按钮的默认行为，即刷新页面
	$('.btn').click(function() {
		return false;
	});
	//鼠标滚动事件
	$('.ui-jqgrid-bdiv').bind("scroll", function (event){  
		addGridPage();
	});

});


