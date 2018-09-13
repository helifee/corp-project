/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-22
 */

/**
 * 此文件实现业务对象的列表及相关操作
 */
var appList;
var selectedAppId;
var lastSel_dataId;
//打开方式：0新增，1编辑。默认新增
var editType=0;

var updateObjectId;
var busiObjectGrid;

//参考资料见 http://www.cnblogs.com/duhuo/p/5521116.html 
/**
 * 使用jqgrid来查询和展示业务对象的分页数据
 */
function initBusinessObjectGrid() {
    //创建jqGrid组件
	busiObjectGrid = $("#jqgridList").jqGrid(
        {
            url: serviceUrl+"flow/businessObject/queryListByCondition",//获取数据的地址
            ajaxGridOptions: {contentType: 'application/json;charset=utf-8'},
			mtype : "POST", 
			contentType : "application/json",  
            postData: {appId: selectedAppId, delflag: 0},
            datatype : "local", 
			treedatatype : "json",
            /*jsonReader: {
            	root:"result"
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
           				     if(initArray[item].name.indexOf(keyword)>-1 || initArray[item].code.indexOf(keyword)>-1 ){
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
            colModel: [
                {name: 'id', label: 'ID', align: "left",sortable:false, hidden: true},
                {name: 'name', label: '业务对象名称', sortable:false, align: "left", width:'150'},
                {name: 'appId', label: '所属系统',  sortable:false, hidden: true, align: "left"},
                {name: 'dataType', label: '数据类型',sortable:false,  align: "left", width:'40', formatter: dataTypeformatter},
                //{name : 'level',label : '菜单级次',width : 80,align : "center"},
	            {name : 'parentId', label : '上级菜单id', sortable:false, align : "left",hidden : true},
	            {name : 'prefixId', label : 'prefixId', sortable:false, hidden : true},
                {name: 'code', label: '业务对象编码', sortable:false, align: "left", width:'100',},
                
                //{name: 'forFlow', label: '用于流程', sortable:false, align: "left",width:'40', formatter: dataformatter},
                {name: 'pcUrl', label: '审批URL(PC)', sortable:false, width:'150', align: "left"},
                {name: 'phoneUrl', label: '审批URL(手机)', sortable:false, width:'150',  align: "left"},
                {name: 'paramUrl', label: '审批URL(Pad)',sortable:false,  width:'150', align: "left"},
                {name: 'comment', label: '备注说明', sortable:false, align: "center"}
               /* {name: 'forFinance', label: '是否用户财务接口', align: "center", formatter: dataformatter},
                {name: 'forCustomizeForm', label: '用于表单组件', align: "center", formatter: dataformatter},
                {name: 'forDataAuth', label: '用于数据权限', align: "center", formatter: dataformatter},
                */
            ],
            rowNum: -1,//在grid上显示记录条数，这个参数是要被传递到后台
            
            sortname: 'id',//默认的排序列
            sortorder: "asc",//排序方式,可选desc,asc
            treeReader:{
           	 	level_field: "level",
           	 	parent_id_field: "parentId",
           	 	leaf_field: "isLeaf",
           	 	expanded_field: "expanded"
            },
            ondblClickRow:function(rowid){
           	    var urlText = "http://127.0.0.1:8081/platform-app/flow/runtime/businessObject/businessObject_edit.html?appId=" + selectedAppId + "&id=" + rowid;
                openWin(urlText);
            },
            onSelectRow: function (rowid, status) {//被选中的状态
            	$('#jqgridList ' + '#' + lastSel_dataId).find("td").removeClass("ui-state-highlight");
                lastSel_dataId = rowid;
            },
            gridComplete : function(xhr) {
    			$.xljUtils.addGridScroll();
    			$.xljUtils.resizeNestedGrid();
    			setTimeout(function () {
    				//console.info("lastSel_dataId="+lastSel_dataId);
    				//$('#jqgridList').jqGrid('setSelection',lastSel_dataId);
    				//添加回显选中行样式
                    //$('#jqgridList').setSelection(lastSel_dataId, true);
    				$("#jqgridList").jqGrid('setSelection', lastSel_dataId);
                    $('#jqgridList ' + '#' + lastSel_dataId).find("td").addClass("ui-state-highlight");
    			},1000);
    		},
            //加载失败事件
            loadError: function (xhr, status, error) {
                //console.info(xhr);
                //console.info(status);
                //console.info(error);
            }
        });
}

/**
 * 业务系统的格式化数据
 * @param cellvalue: 该字段的值
 * @param options:
 * @param rowObject
 * @returns {String} 返回业务系统的名称
 */
function systemformatter(cellvalue, options, rowObject) {
    var systemName = "";
    $.each(appList, function (index, item) {//遍历mapList的数组数据
        if (item.id == cellvalue) {
            systemName = item.name;
        }
    });//$.each(appList
    return systemName;
}

function dataTypeformatter(cellvalue, options, rowObject){
	if(cellvalue == 1){
		return "分类";
	}else{
		return "业务对象";
	}
}

function textformatter(cellvalue, options, rowObject){ 
	if(rowObject.dataType==1){
		return "";
	}
	return "审批URL(PC):"+cellvalue+"<br/>审批URL(手机):"+rowObject.phoneUrl+"<br/>审批URL(Pad):"+rowObject.paramUrl;
}

/**
 * 状态字段的格式化数据
 * @param cellvalue: 该字段的值
 * @param options:
 * @param rowObject
 * @returns {String} 状态的名称
 */
function dataformatter(cellvalue, options, rowObject) {
    if (cellvalue == true || cellvalue =="1") {
        return "是"
    }
    return "否";
}

/**
 * 新增按钮的处理事件
 */
function newItem() {
	var rowData = $("#jqgridList").jqGrid('getRowData', lastSel_dataId);
	var dataType = rowData.dataType;
	if(dataType == "业务对象"|| dataType == "2"){
		pop_tip_open('blue', "业务对象下不允许新建分类或子业务对象!");
		return ;
	}
	var parentId = "";
	if(lastSel_dataId && lastSel_dataId!="-1"  && lastSel_dataId!=""){
		parentId = lastSel_dataId;
	}
    var urlText = "http://127.0.0.1:8081/platform-app/flow/runtime/businessObject/businessObject_edit.html?appId=" + selectedAppId + "&id=-1&parentId="+parentId;
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
			url:serviceUrl+"flow/businessObject/updateSort/"+ids,
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
 * 修改按钮的处理事件
 */
function modifyItem() {
    if (!lastSel_dataId) {
        pop_tip_open('blue', "请选择一个业务对象进行修改操作!");
        return;
    }
    var urlText = "http://127.0.0.1:8081/platform-app/flow/runtime/businessObject/businessObject_edit.html?appId=" + selectedAppId + "&id=" + lastSel_dataId;
    openWin(urlText);
}

/**
 * 业务变量按钮的处理事件
 */
function businessViriable() {
	
    if (!lastSel_dataId) {
        pop_tip_open('blue', "请选择一个业务对象!");
        return;
    }
    var rowData = $("#jqgridList").jqGrid('getRowData', lastSel_dataId);
	var dataType = rowData.dataType;
	var prefixId = rowData.prefixId;
	var checkPassFlag = true;
    if(dataType=="分类"){
    	pop_tip_open('blue', "业务对象分类没有业务变量!");
        return;
    }
    var urlText =  "http://127.0.0.1:8081/platform-app/flow/runtime/businessObjectVariable/businessObjectVariable_list.html?appId=" + selectedAppId + "&busiObjectId=" + lastSel_dataId;
    openWin(urlText);
}

/**
 * 删除按钮的处理事件
 */
function deleteItem() {
    if (!lastSel_dataId) {
        pop_tip_open('blue', "请选择一个业务对象进行修改操作!");
        return;
    }
    
    var rowData = $("#jqgridList").jqGrid('getRowData', lastSel_dataId);
    var allIdArr =$("#jqgridList").jqGrid('getDataIDs');
	var dataType = rowData.dataType;
	var prefixId = rowData.prefixId;
	var checkPassFlag = true;
    /*if(dataType=="分类"){
    	$.ajax({ //发送更新的ajax请求
            type: "post",
            url: serviceUrl+"flow/businessObject/queryCountLikePrefixMap",
            dataType: "json",
            async: false,
            data: JSON.stringify({prefixId: prefixId, dataType:1}),
            contentType: 'application/json;charset=utf-8', //设置请求头信息
            success: function (data) {
            	var countSum = data.result;
            	if(countSum>0){
            		checkPassFlag = false;
            	}
            }
    	});
    }*/
	$.ajax({ //发送更新的ajax请求
        type: "post",
        url: serviceUrl+"flow/businessObject/queryRelatedCountByPrefixMap",
        dataType: "json",
        async: false,
        data: JSON.stringify({prefixId: prefixId}),
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
    	if(dataType=="分类"){
    		pop_tip_open('blue', "该业务对象分类下的业务对象已经被引用,不能删除!");
    	}else{
    		pop_tip_open('blue', "该业务对象已经被引用,不能删除!");
    	}
        
        return;
    }
	var popText = "确认要删除该"+dataType+"吗？"
	pop_text_open("blue", popText, function() {
		$.ajax({
	        url: serviceUrl+"flow/businessObject/deletePseudo/" + lastSel_dataId,
	        type: 'DELETE',
	        contentType: 'application/json',
	        dataType: 'JSON',
	        success: function (resultData) {
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
	        },
	        error:function () {
	            
	        }
	    });
	}, true);
}

/**
 * 刷新JqGrid的表格数据，子窗口调用是opener.refreshJqGridData();
 */
function refreshJqGridData(rowid) {
	var postData = $("#jqgridList").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    
	var postData = {appId: selectedAppId, delflag: 0};
	var keyword = $("#keyword").val();
	if(keyword && keyword.length>0){
		postData = {appId: selectedAppId, delflag: 0, name:keyword};
	}
	$("#jqgridList").jqGrid('setGridParam', {
        datatype: 'json', postData: postData,
    }).trigger("reloadGrid");
	//console.info(">>> refreshJqGridData ---- rowid="+rowid);
	lastSel_dataId = rowid;
	setTimeout(function () {
		$('#jqgridList').jqGrid('setSelection',rowid);
	},500);
}

/**
 * 业务系统的Select下拉框的onchange处理事件
 * @param obj
 */
function selectChange(obj) {
    var idText = obj.id;
    var selIndex = obj.options.selectedIndex;
    selectedAppId = obj.options[selIndex].value;
    //重新设置参数,然后调用reloadGrid的方法来 刷新JQGrid列表
    refreshJqGridData();
}

/**
 * 查询所有业务系统的静态数据
 */
function queryAppSystemList() {
    var postdata = {
    	appDelFlag: "0",
    	appStatus: "1"
    }
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: serviceUrl+"sys/res/appSystem/queryList",
        dataType: "json",
        async: false,
        data: JSON.stringify(postdata),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
            $("#approveTypeId").empty();//首先清空select现在有的内容
            appList = data.result;
            if (!appList || appList.length == 0) {
                pop_tip_open('red', "查询业务系统的数据异常，请核查后再试!");
                return;
            } else {
                var tempItem = appList[0];
                selectedAppId = tempItem.id;
                $.each(appList, function (index, item) {//遍历mapList的数组数据
                    $("#systemAppId").append("<option value=" + item.id + ">" + item.name + "</option>");
                });
                var queryData2={
                	delFlag: "0",
                	appId: selectedAppId
            	};
                busiObjectGrid.jqGrid("setGridParam", { postData: queryData2 ,datatype:'json'}).trigger("reloadGrid");
            }
        },
        error: function (data) {
            if (data.msg) {
                pop_tip_open('red', data.msg);
            } else {
                pop_tip_open('red', "查询业务系统的列表数据失败！");
            }
        }
    });//end-for $.ajax({
}

$(function () {
	initBusinessObjectGrid();
    queryAppSystemList();
    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.addGridScroll();
});
