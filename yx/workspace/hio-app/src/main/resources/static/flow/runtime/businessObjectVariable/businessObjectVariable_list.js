/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-24
 */

/**
 * 此文件实现业务对象的业务变量的列表及相关操作
 */
var appList;
var systemId;
var businessObjectId;
var lastSel_dataId;

/**
 * 页面JS的执行入口处
 */
$(function() {
	systemId = $.getUrlParam('appId');
	businessObjectId = $.getUrlParam('busiObjectId');
	querySystemAppInfo(systemId);
	$("#busiObjectId").val(businessObjectId);
	queryBusinessObject(businessObjectId);
	queryBusiVariableList();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
});

/**
 * 查询单个业务对象,并对业务对象赋值
 */
function queryBusinessObject(){
	$.ajax({
	       url: serviceUrl+"flow/businessObject/get/"+businessObjectId,
	       type: 'GET',
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success: function (resultData) {
	    	   var dataObj = resultData.result;
	    	   $("#busiObjectName").html("业务对象:"+dataObj.name);
	       },
	       error: function(XMLHttpRequest, textStatus, errorThrown){
	    	   //console.info(textStatus);
	       }
	});
}

/**
 * 根据systemId获取系统的名称
 * @param systemId
 */
function querySystemAppInfo(systemId){
	$.ajax({
	       url: serviceUrl+"sys/res/appSystem/get/"+systemId,
	       type:'GET',
	       contentType:'application/json',
	       dataType:'JSON',
	       success:function (resultData) {
	    	   var dataObj = resultData.result;
	    	   $("#systemAppName").html("系统:"+dataObj.name);
	       }
	});
}

/**
 * 在jqgridList标签上绑定jqgrid表格，并实现获取数据
 */
function queryBusiVariableList(){
    jQuery("#jqgridList").jqGrid(//创建jqGrid组件
        {
            url :  "http://127.0.0.1:9999/platform-app/flow/businessObjectVariable/queryListByCondition",//获取数据的地址
            postData : { businessObjectId: businessObjectId, delflag:false},
            datatype : "json",//从服务器端返回的数据类型，默认xml。可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
            ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
            mtype : "post",//ajax提交方式。POST或者GET，默认GET
            /*jsonReader: {
            	repeatitems: false
            },*/
            jsonReader: {
				root:function(data){
					 var keyword = $("#keyword").val();
	            	 var initArray = data.result;
	            	 //console.info("------------------ initArray keyword="+keyword+"------------------");
	            	 if(keyword){
	            		 var prefixIdArray = new Array();
	            		 //console.info("----->>> keyword="+keyword);
	            		 for(var item in initArray){
           				     if(initArray[item].name.indexOf(keyword)>-1){
           				    	prefixIdArray.push(initArray[item].prefixId);
           				     }
	            		 }
	            		 //console.info(prefixIdArray);
	            		 var resultArray = new Array();
	            		 //console.info("------------------ prefixIdArray.length= "+prefixIdArray.length+"------------------");
	            		 if(prefixIdArray.length>0){
	            			 for(var idx1=0; idx1<initArray.length; idx1++){
	            				 for(idx2=0; idx2<prefixIdArray.length; idx2++){
	            					 var initItem = initArray[idx1];
	            					 var prefixId = prefixIdArray[idx2];
	            					 if(prefixId.indexOf(initItem.prefixId)>-1){
	            						 resultArray.push(initItem);
	            						 break;
	            					 }
	            				 }
	            			 }
	            		 }else{
	            			 resultArray = initArray;
	            		 }
	            		 return resultArray;
	            	 }else{
	            		 //console.info("----->>> keyword= 无关键字.....");
           			  	 return initArray;
	            	 }
				}
            },
            treeGridModel: "adjacency", 
	        ExpandColumn:"name",
	        treeGrid: true,
			autowidth:true,
            colModel : [
                {name:'id',       label:'ID', sortable:false,   align:"center", hidden:true},
                {name : 'parentId', label : 'parentId', sortable:false, hidden : true},
	            {name : 'prefixId', label : 'prefixId', sortable:false, hidden : true},
               
                {name:'name',     label:'变量名称', sortable:false,   align:"left", width:100},
                {name:'code',    label:'变量编码', sortable:false,  align:"left", width:100 },
                {name:'parentName',  label:'上级变量',  sortable:false, align:"left", width:100 },
    			{name:'type',  label: '变量类型',  sortable:false,    align:"left", width:100,  formatter: typeformatter },
    			/*{name:'relateBusinessObject',    label: '关联业务对象',  align:"center" },
    			{name:'forFlowBranch', label: '是否用于流程分支', align:"center", formatter: boolformatter },
    			{name:'forFinance', label: '是否用于财务接口',  align:"center", formatter: boolformatter  },*/
    			{name:'comment', sortable:false, label: '备注说明', align:"left" }
            ],    
            //pager : '#jqgridPager',//定义翻页用的导航栏，必须是有效的html元素            
            rowNum : -1,//在grid上显示记录条数，这个参数是要被传递到后台
            //rowList : [ 20, 50, 100, 200],//可供用户选择一页显示多少条
            //sortname : 'name',//默认的排序列
            //sortorder : "desc",//排序方式,可选desc,asc
            
            treeReader:{
           	 	level_field: "level",
           	 	parent_id_field: "parentId",
           	 	leaf_field: "isLeaf",
           	 	expanded_field: "expanded"
            },
            
            viewrecords : true, //定义是否要显示总记录数
           	//autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度 
            onSelectRow: function(rowid, status) {//被选中的状态
            	//lastSel_dataId = rowid;
            	$('#jqgridList ' + '#' + lastSel_dataId).find("td").removeClass("ui-state-highlight");
            	lastSel_dataId = rowid;
            },
            ondblClickRow:function(rowid){
            	lastSel_dataId = rowid;
           	    var urlText = baseUrl+"flow/runtime/businessObjectVariable/businessObjectVariable_edit.html?systemId=";
            	urlText = urlText+systemId+"&busiObjectId="+businessObjectId+"&id="+lastSel_dataId; 
            	openWin(urlText);
            },
            gridComplete : function(xhr) {
    			$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
    			setTimeout(function () {
    				//console.info("lastSel_dataId="+lastSel_dataId);
    				//添加回显选中行样式
                    //$('#jqgridList').setSelection(lastSel_dataId, true);
                    $("#jqgridList").jqGrid('setSelection', lastSel_dataId);
                    $('#jqgridList ' + '#' + lastSel_dataId).find("td").addClass("ui-state-highlight");
    			},1500);
    		},
            /*loadComplete : function(xhr) {
    			$.xljUtils.addGridScroll();
    		},*/
            loadError: function(xhr, status, error){
            	
            }
    });
    
}

/**
 * 对bool类型的变量进行解析
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function boolformatter(cellvalue, options, rowObject){  
	if(cellvalue){
		return "是";
	}else{
		return "否";
	}
}

/**
 * 刷新JqGrid的表格数据，子窗口调用是opener.refreshJqGridData();
 */
function refreshJqGridData(rowid){
	//var rowid = $("#jqgridList").jqGrid('getGridParam','selrow');
	$("#jqgridList").jqGrid('setGridParam',{
	      datatype:'json', 
	      postData:{businessObjectId: businessObjectId, delflag:false},   
	 }).trigger("reloadGrid");
	setTimeout(function () {
		$('#jqgridList').jqGrid('setSelection',rowid);
	},500);

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
 * 新增业务变量的处理事件
 */
function newItem() {
	var parentId = "";
	if(lastSel_dataId && lastSel_dataId!="-1"  && lastSel_dataId!=""){
		parentId = lastSel_dataId;
	}
	//console.info("newItem----parentId="+parentId+" lastSel_dataId="+lastSel_dataId);
	var urlText = baseUrl+"flow/runtime/businessObjectVariable/businessObjectVariable_edit.html?systemId=";
	urlText = urlText+systemId+"&busiObjectId="+businessObjectId+"&id=-1&parentId="+parentId; 
	openWin(urlText);
}

/**
 * author:zhengjj
 * describe:修改排序 上移 下移 置顶 置底
 * param: (1是上移 2是下移 3是置顶 4是置底)
 */
function updateSort(e){
	var ids=jQuery("#jqgridList").jqGrid('getGridParam',"selrow");
	if(!ids) {
		pop_tip_open("blue","请选择一条数据");
		return;
	}
	if(ids){
		var sortType="";
		if(e=="1"){
			sortType="1";
		}else if(e=="2"){
			sortType="2";
		}else if(e=="3"){
			sortType="3";
		}else if(e=="4"){
			sortType="4";
		}
		$.ajax({
			url:serviceUrl+"flow/businessObjectVariable/updateSort/"+ids,
			type:'put',
			dataType:'JSON',
			contentType:"application/json",
			data:'{"sortType":'+sortType+'}',
			async:false,
			success:function (resultData ) {
				if (resultData&&resultData.success) {
					pop_tip_open("green","排序成功");
					$('#jqgridList').jqGrid().trigger("reloadGrid");
				}else{
					pop_tip_open("red",resultData.msg);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        }
		});
	}
}

/**
 * 修改业务变量的处理事件
 */
function modifyItem(){
	if(!lastSel_dataId){
		pop_tip_open("blue","请选择一个业务变量!");
		return;
	}
	var urlText = baseUrl+"flow/runtime/businessObjectVariable/businessObjectVariable_edit.html?systemId=";
	urlText = urlText+systemId+"&busiObjectId="+businessObjectId+"&id="+lastSel_dataId; 
	openWin(urlText);
}

/**
 * 删除业务变量的处理事件
 */
function deleteItem() {
	if(!lastSel_dataId){
		pop_tip_open("blue","请选择一个业务变量!");
		return;
	}
	var variableData =$("#jqgridList").jqGrid('getRowData',lastSel_dataId);
	var allIdArr =$("#jqgridList").jqGrid('getDataIDs');
	var checkMsg = checkDeleteVariableAction(variableData.code);
	if(checkMsg && checkMsg.length>1){
		pop_tip_open("red", checkMsg);
		return;
	}
	
	var rowData = $("#jqgridList").jqGrid('getRowData', lastSel_dataId);
	var prefixId = rowData.prefixId;
	var checkPassFlag = true;
	$.ajax({ //发送更新的ajax请求
        type: "post",
        url: serviceUrl+"flow/businessObjectVariable/queryRelatedCountByPrefixMap",
        dataType: "json",
        async: false,
        data: JSON.stringify({prefixId: prefixId, businessObjectId: businessObjectId}),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
        	//console.info(data);
        	var countSum = data.result;
        	if(countSum>0){
        		checkPassFlag = false;
        	}
        }
	});
	if (!checkPassFlag) {
    	pop_tip_open('blue', "该业务变量或子变量已经被引用,不能删除!");
    	return;
    }
	
	var popText = "确认要删除该业务变量吗？"
	pop_text_open("blue", popText, function() {
		$.ajax({
		       url: serviceUrl+"flow/businessObjectVariable/deletePseudo/"+lastSel_dataId,
		       type:'DELETE',
		       contentType:'application/json',
		       dataType:'JSON',
		       success:function (resultData) {
		    	   pop_tip_open("green",resultData.msg);
		    	   var dataObj = resultData.result;
		    	   
		    	    //重新设置参数,然后调用reloadGrid的方法来 刷新JQGrid列表
		            var selIdx=0;
		            for(var idx=0; idx<allIdArr.length; idx++){
		            	if(lastSel_dataId == allIdArr[idx]){
		            		selIdx = idx-1;
		            	}
		            }
		            if(selIdx<0){
		            	selIdx = 0;
		            }
		            refreshJqGridData(allIdArr[selIdx]);
		    	    lastSel_dataId = undefined;
			 }
		});
	} ,true);
}

function checkDeleteVariableAction(varCode){ 
	var checkResult = "";
	var urlText = serviceUrl+"/flow/step/bizVarBeUsedInFlow?businessObjectId="+businessObjectId+"&varCode="+varCode;
	$.ajax({
	       url: urlText,
	       type: 'GET',
	       async: false,
	       contentType: 'application/json',
	       dataType: 'JSON',
	       success: function (resultData) {
	    	   //console.info(resultData);
	    	   var result = resultData.success;
	    	   if(result==true){
	    		   checkResult = ""; 
	    	   }else{
	    		   checkResult = "该变量已经在\""+resultData.msg+"\"的流程模版中使用!";
	    	   }
	       },
	       error: function(XMLHttpRequest, textStatus, errorThrown){
	    	   //console.info(textStatus);
	       }
	});
}

/**
 * 关闭当前的子窗口
 */
function closeMe(){
	lastSel_rowId = "";
	window.opener=null;
	window.open('','_self');
	window.close();
}