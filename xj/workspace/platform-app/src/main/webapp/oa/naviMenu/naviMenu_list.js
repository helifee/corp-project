/**
 * @author luorongxin
 */
var rowData;
var dataArray;//父子菜单id数组集合
var openUrl = "naviMenu_edit.html";
$(function(){
	//获取所有菜单
	pageInit();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
	 //重置模糊搜索关键字
    $('#keywords').val('');
	/*绑定按钮事件*/
	//新增
	$('#addBtn').on('click',function(){
		addNaviMenu();
	});
	//修改
	$('#updateBtn').on('click',function(){
		editNaviMenu();
	});
	//删除
	$('#delsBtn').on('click',function(){
		delNaviMenu();
	});
	//上移
	$("#upBtn").on('click',function () {
	    	toLocation(2);
	});
	//下移
	$("#downBtn").on('click',function () {
	    	toLocation(3);
	 });
	 //启用
    $("#actBtn").unbind('click').on('click',function () {
    	changeState(true);
    });
    //禁用
    $("#disBtn").unbind('click').on('click',function () {
    	changeState(false);
    });
    //模糊查询按钮绑定回车键
    $(document).keydown(function(event){ 
    	if(event.keyCode==13){ 
    	$("#searchBtn").click(); 
    	  } 
    	}); 

	  //禁用所有按钮的默认行为
    $('.btn').click(function() {
        return false;
    });
    //阻止默认行为
    $('.btn').click(function(e) {
        e.preventDefault();
    });
});
/**
 * 模糊查询: 名字或者编码
 */
function fuzzySearch(){
	$('#list2').jqGrid().trigger("reloadGrid");
};
/**
 * 获取所有菜单
 *
 */
function pageInit(){
	//$.xljUtils.initJqGrid();
	$('#list2').jqGrid({
		url: baseUrl+'/oa/sys/sysNaviMenu/getTree/ALL',
		ajaxGridOptions: { contentType: 'application/json' },
		mtype : "POST",
		treeGrid: true,
		treeGridModel: "adjacency",
		ExpandColumn:"name",
		datatype : "json",
		autowidth:true,
		subGrid:true,
		multiselect :false,
		jsonReader : {
			root:function(data){
				var name=$("#keywords").val();// 获取名称
				var array=new Array();
				var arr=data.result;
				name=$.trim(name);
				if(name){
					for(var o in arr){
						if(arr[o].name.indexOf(name)>-1 || arr[o].menuName.indexOf(name)>-1){
							array.push(arr[o]);
						}
						arr[o].expanded=false;
					}
					var resultArray=new Array();
					if(arr!=null && arr.length>0){
						resultArray = getRecursionData(arr,array,resultArray);
						for(var t=0;t<resultArray.length;t++){
							for(var s=0;s<arr.length;s++){
								if(resultArray[t].id==arr[s].id){
									arr[s].expanded=true;
									break;
								}
							}
						}
					}
					return arr;
				}else{
					return data.result;
				}
			},
			repeatitems : false
		},
		rownumbers:false,
		colModel : [
			{name : 'id',label : 'id',hidden:true,sortable:false,align : "center"},
			{name : 'parentId',label : '上级id',hidden:true,align : "center"},
			{name : 'name',label : '名称',sortable:false,align : "center",cellattr: addCellAttr},
			{name : 'code',label : '编码',hidden:false,align : "center"},
			{name : 'sort',label : '序号',hidden:true,align : "center"},
			{name : 'parentName',label : '上级菜单',hidden:true,align : "center"},
			{name : 'type',label : '类型',sortable:false,align : "center",formatter:function(type){
				if(type=="0"){
					return "系统菜单";
				}else if(type=="1"){
					return "自定义菜单";
				}else{
					return "";
				}
			}},
			{name : 'menuName',label : '菜单名称',sortable:false,align : "center"},
			{name : 'image',label : '菜单图标',hidden:false,sortable:false,align : "center",formatter:function(image){
				if(image){
					return '<img src="data:image/jpeg;base64,'+image+'" style="width:30px;height:30px">';
				}else{
					return "";
				}
			}},
			{name : 'resourceName',label : '资源名称',sortable:false,align : "center",hidden:true},
			{name : 'resourceId',label : '资源id',sortable:false,hidden:true,align : "center"},
			{name : 'url',label : '链接',sortable:false,align : "center"},
			{name : 'portalId',label : '所属门户ID',sortable:false,align : "center",hidden:true},
			{name : 'portalName',label : '所属门户',sortable:false,align : "center"},
			{name : 'state',label : '状态',sortable:false,align : "center",formatter: "select", editoptions:{value:"false:禁用;true:启用"},cellattr: addCellAttr}
		],
		treeReader:{
			level_field: "level",
			parent_id_field: "parentId",
			leaf_field: "isLeaf",
			expanded_field: "expanded",
			left_field:"lft",
			right_field: "rgt"
		},
		onSelectRow: function (rowid,status) {

		},
		ondblClickRow:function(rowid){
			rowData = $('#list2').jqGrid('getRowData',rowid);
			window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8")+"&pname="+encodeURI(rowData.parentName,"UTF-8"));
		},
		gridComplete: function () {
			$('#list2').jqGrid('resetSelection');
			var currentSelRowId = $('#list2').data('currentSelRowId');
			if(currentSelRowId){
				$('#list2').jqGrid('setSelection',currentSelRowId);
			}


			$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();

		},
		rowNum:-1,
		rowTotal:-1,
		loadError:function(xhr,status,error){
			//异常处理
			console.log(xhr.status);
			if(xhr.status==404){
				pop_tip_open("red","请求url有误！");
				return;
			}
			if(xhr.status==405){
				pop_tip_open("red","请求方法有误！");
				return;
			}
			pop_tip_open("red","网络异常,请联系管理员！");
		},
		loadComplete:function(xhr){
			console.log(xhr);
			if(!xhr.success){
				switch (xhr.code) {
					case "50000":
						pop_tip_open("red",xhr.msg);
						break;
					case "50001":
						pop_tip_open("red",xhr.msg);
						break;
					case "50002":
						pop_tip_open("blue",xhr.msg);
						break;
					case "50003":
						pop_tip_open("red",xhr.msg);
						break;

					default:
						pop_tip_open("red","查询数据失败！");
						break;
				}
			}else{
				idsArray(xhr);//生成父子id数组
			}
		}

	});
}

/**
 * 设置新增行ID到jqgrid
 * @param rowId
 * @returns
 */
function setJqGridAddedRowId(rowId) {
	$.xljUtils.setAddedRowId('#list2', rowId);
}


/**
 * 改变行字段颜色
 */
function addCellAttr(rowId, val, rawObject, cm, rdata) {
    if(rawObject.planId == null && rawObject.state == false){
        return "style='color:red'";
    }
}
/**
 * 生成父子id数组
 */
function idsArray(xhr){
	  dataArray = new Array(); 
	  for(var i in xhr.result){
		 if(xhr.result[i].level=="0"){
			 var data= new Array();
			 data.push(xhr.result[i].id);
		     dataArray.push(data);
		 }
	  }
	  for(var i in xhr.result){
		  if(xhr.result[i].level=="1"){
			  var pid = xhr.result[i].parentId;
			  var id = xhr.result[i].id;
				 for(var j in dataArray){
					 var arr = dataArray[j];
					 if(arr.indexOf(pid)> -1){
						 arr.push(id);
					 }
				 }
			 } 
	  }
}
/**
 * 获取对应父子数组
 */
function getIds(pid){
	for(i in dataArray){
		   if(dataArray[i].indexOf(pid)>-1){
			   return dataArray[i];
		   }
	   }
}
/**
 * 删除菜单
 * @returns 
 */
function delNaviMenu(){
	var rowId=$('#list2').jqGrid("getGridParam","selrow");
	var url;
	var tips;
	if(rowId==null){
		pop_tip_open("blue","请选择要删除的数据！");
		return;
	}
      rowData = $('#list2').jqGrid('getRowData',rowId);
	  var name = rowData.name;
		if(name.length>10){
			name = name.substr(0,10)+"...";
		}
      if(rowData.level == "0"){
    	   var ids = getIds(rowData.id);
    	   url = baseUrl+"/oa/sys/sysNaviMenu/deleteBatch/"+ids;

    	   tips="确认删除菜单【" + $.xljUtils.htmlEncode(name) + "】及其子菜单吗?";
    	   
      }else{
    	   url = baseUrl+"/oa/sys/sysNaviMenu/deleteBatch/"+rowData.id;
    	   tips="确认删除菜单【" + $.xljUtils.htmlEncode(name) + "】吗?";
      }
	 pop_text_open("blue",tips ,function(){
		 $.ajax({
				url:url,
				type:'DELETE',
				dataType:'JSON',
				success:function (xhr, textStatus ) {
	        		 if (xhr){
	        			 if(xhr.success) {
	        				 pop_tip_open("green","数据删除成功！");
							 var ind = $('#list2').jqGrid('getInd',rowData.id);
							 if(ind-1>0){
								 var currentRow = $('#list2 tr')[ind-1];
								 reloadGrid($(currentRow).attr('id'));
							 }else{
								 reloadGrid(rowData.id);
							 }


		        		 }else{
		        			 if(xhr.code=="50000"){
		        				 pop_tip_open("red",xhr.msg);
		        				 return;
		        			 }
		        			 pop_tip_open("red","数据删除失败！");
		        		 }
	        		 }else{
	        			 pop_tip_open("red","服务异常,请联系管理员！");
	        		 }
					
				},
	          	 error: function(xhr, textStatus, errorThrown) {
	          		  console.log(xhr);
	          	     pop_tip_open("red","服务异常,请联系管理员！");
	              	}
			});
	   },true);
	
}

/**
 * 新增菜单
 */
var popup;
function addNaviMenu(){
	var rowId=$('#list2').jqGrid("getGridParam","selrow");
	    rowData = $('#list2').jqGrid('getRowData',rowId);
	    if(rowData.level==1){
	    	pop_tip_open("blue","二级菜单不能添加子菜单！");
	    	return;
	    }
	    popup = window.open(openUrl+"?oper=add&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));
}
/**
 * 编辑菜单
 * @param
 */
function editNaviMenu(){
	var rowId=$('#list2').jqGrid("getGridParam","selrow");
	if(rowId==null||rowId=="undefined"){
		pop_tip_open("blue","请选择要修改的数据！");
		return;
	}
    rowData = $('#list2').jqGrid('getRowData',rowId);
    window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8")+"&pname="+encodeURI(rowData.parentName,"UTF-8"));
//	pop_text_open("blue", "进入菜单 【" + rowData.name + "】的编辑状态吗？",function(){
//		 popup = window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8")+"&pname="+encodeURI(rowData.parentName,"UTF-8"));
//	   },true);
}
/**
 * 刷新jqgrid
 */
function reloadGrid(id){
	if(id){
		$('#list2').data('currentSelRowId',id);
	}
	$('#list2').jqGrid().trigger("reloadGrid");
}
/**
 * 位移
 */ 
function toLocation(n){
	var rowId=$('#list2').jqGrid("getGridParam","selrow");
	if(rowId==null){
		pop_tip_open("blue","请选择要移动的数据！");
		return;
	}
     rowData = $('#list2').jqGrid('getRowData',rowId);
         if(rowData){
        	 var obj = {'id':rowData.id,'sort':rowData.sort,'parentId':rowData.parentId}
        	 $.ajax({
           	 url:baseUrl+'/oa/sys/sysNaviMenu/'+n+'/move',
           	 type:'POST',
           	 dataType:'JSON',
           	 contentType:'application/json',
           	 data:JSON.stringify(obj),
           	 success:function (xhr, textStatus) {
           		 console.log(xhr);
        		 if (xhr){
        			 if(xhr.success) {
        				 pop_tip_open("green",xhr.msg);
        				 reloadGrid(rowData.id);
	        		 }else{
	        			 if(xhr.code=="50000"){
	        				 pop_tip_open("red",xhr.msg);
	        				 return;
	        			 }
	        			 pop_tip_open("red","数据移动失败！");
	        		 }
        		 }else{
        			 pop_tip_open("red","服务异常,请联系管理员！");
        		 }
           	 },
           	 error: function(xhr, textStatus, errorThrown) {
	           		 console.log(xhr);
	          	     pop_tip_open("red","服务异常,请联系管理员！");
           	}
            });
          }else{
        	  pop_tip_open("blue","未获取到数据信息！");
         }
 }

/**
 * 状态修改
 * @param n
 */
function changeState(n){
	 var idVal = $('#list2').jqGrid('getGridParam','selrow');
	 if(idVal&&idVal!="") {
		 rowData = $('#list2').jqGrid('getRowData',idVal);
		 //不进行同样状态的操作
		 if(n==false&&rowData.state=='false'){
			 pop_tip_open("blue","该记录已禁用！");
			 return;
		 }
		 if(n==true&&rowData.state=='true'){
			 pop_tip_open("blue","该记录已启用！");
			 return;
		 }
		 var isChildren = false;
		 if(n==true&&rowData.isLeaf=="false"){//启用时判断
			 $.xljUtils.confirm("blue", "是否同时启用所有下级节点", function () {
				 isChildren = true;
			 },function () {
				 isChildren = false;
			 },"启用", function () {
				 $.ajax({
					 url:baseUrl+"/oa/sys/sysNaviMenu/update/"+idVal,
					 type:'PUT',
					 dataType:'JSON',
					 contentType:'application/json',
					 data:JSON.stringify({'id':idVal,'state':n,'parentId':rowData.parentId,'isChildren':isChildren}),
					 success:function (xhr,textStatus ) {
						 if (xhr){
							 if(xhr.success) {
								 pop_tip_open("green","状态修改成功！");
								 reloadGrid(idVal);
							 }else{
								 if(xhr.code=="50000"){
									 pop_tip_open("red",xhr.msg);
									 return;
								 }
								 pop_tip_open("red","状态修改失败！");
							 }
						 }else{
							 pop_tip_open("red","服务异常,请联系管理员！");
						 }
					 },
					 error: function(xhr, textStatus, errorThrown) {
						 console.log(xhr);
						 pop_tip_open("red","服务异常,请联系管理员！");
					 }
				 });
			 });
		 }else{
			 $.ajax({
				 url:baseUrl+"/oa/sys/sysNaviMenu/update/"+idVal,
				 type:'PUT',
				 dataType:'JSON',
				 contentType:'application/json',
				 data:JSON.stringify({'id':idVal,'state':n,'parentId':rowData.parentId,'isChildren':isChildren}),
				 success:function (xhr,textStatus ) {
					 console.log(xhr);
					 if (xhr){
						 if(xhr.success) {
							 pop_tip_open("green","状态修改成功！");
							 reloadGrid(idVal);
						 }else{
							 if(xhr.code=="50000"){
								 pop_tip_open("red",xhr.msg);
								 return;
							 }
							 pop_tip_open("red","状态修改失败！");
						 }
					 }else{
						 pop_tip_open("red","服务异常,请联系管理员！");
					 }
				 },
				 error: function(xhr, textStatus, errorThrown) {
					 console.log(xhr);
					 pop_tip_open("red","服务异常,请联系管理员！");
				 }
			 });
		 }

    }else{
   	 pop_tip_open("blue","请选择要操作的数据！");
    }
}

/**
 * 递归查询
 * @param dataArr		原数据
 * @param keyArray		含有查询关键字的数据
 * @param resultArray	返回结果数据
 * @returns
 */
function getRecursionData(dataArr,keyArray,resultArray){
    for(var i=0;i<keyArray.length;i++){
    	resultArray.push(keyArray[i]);
    	for(var k=0;k<dataArr.length;k++){
    		if(keyArray[i].parentId == dataArr[k].id){
    			var isRepeat=isRepeatArray(resultArray,dataArr[k]);
    			if(isRepeat){
    				resultArray.push(dataArr[k]);
    			}
    			resultArray=getParentRecursionData(dataArr,dataArr[k],resultArray);
    		}
    	}
    }
    
    return resultArray;
}

/**
 * @param dataArr		原数据
 * @param dataArrObj	递归中间节点
 * @param resultArray	结果数据
 * @returns
 */
function getParentRecursionData(dataArr,dataArrObj,resultArray){
	if(dataArrObj.parentId!=null && dataArrObj.parentId!=""){
		for(var k=0;k<dataArr.length;k++){
    		if(dataArrObj.parentId == dataArr[k].id){
    			var isRepeat=isRepeatArray(resultArray,dataArr[k]);
    			if(isRepeat){
    				resultArray.push(dataArr[k]);
    			}
    			getParentRecursionData(dataArr,dataArr[k],resultArray);
    		}
    	}
	}
	return resultArray;
}

/**
 * 判断当前节点是否重复
 * @param resultArray	当前所有不重复节点		
 * @param dataArrObj	新的判断是否重复节点
 * @returns {Boolean}	重复false 不重复true
 */
function isRepeatArray(resultArray,dataArrObj){
	var flag=true;
	if(resultArray!=null && resultArray.length>0){
		for(var s=0;s<resultArray.length;s++){
			if(dataArrObj.id==resultArray[s].id){
				flag=false;
				break;
			}
		}
	}
	return flag;
}

function getSelectRowData(selId) {
	return $('#list2').jqGrid('getRowData',selId);
}