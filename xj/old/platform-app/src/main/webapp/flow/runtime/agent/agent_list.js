/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-22
 */

/**
 * 此文件实现业务对象的列表及相关操作
 */
var rowData;//当前选中数据
var rowDataBefore;

var appList;
var selectedAppId;
var lastSel_dataId;

//参考资料见 http://www.cnblogs.com/duhuo/p/5521116.html 
/**
 * 使用jqgrid来查询和展示业务对象的分页数据
 */
function getBusinessObjectPage() {
    //创建jqGrid组件
    jQuery("#jqgridList").jqGrid(
        {
            url: hostUrl+"flow/agent/page",//获取数据的地址
            postData: {delflag: 0},
            datatype: "json",//从服务器端返回的数据类型，默认xml。可选类型：xml，local，json，jsonnp，script，xmlstring，jsonstring，clientside
            ajaxGridOptions: {contentType: 'application/json;charset=utf-8'},
            mtype: "post",//ajax提交方式。POST或者GET，默认GET
            jsonReader: {
                repeatitems: false
            },

            colModel: [
                {name: 'id', label: 'ID', align: "center", sortable:false, hidden: true},
                {name: 'createDate', label: 'createDate', hidden: true},
                {name: 'name', label: '主题', align: "left", cellattr: addCellAttr},
                {name: 'startDate', label: '开始时间',  align: "left"},
                {name: 'endDate', label: '结束时间', align: "left"},
                {name: 'authorizer', label: '授权人',  sortable:false, align: "left"},
                {name: 'authorized', label: '代理人',  sortable:false, align: "left"},
                {name: 'proxyType', label: '代理类型',  sortable:false, align: "left", formatter: proxyformatter},
                {name: 'status', label: '状态',  sortable:false, align: "left", formatter: dataformatter, cellattr: addCellAttr},
                {name: 'remark', label: '备注说明', sortable:false,  align: "left"}
            ],
            pager: '#jqgridPager',//定义翻页用的导航栏，必须是有效的html元素            
            rowNum: 20,//在grid上显示记录条数，这个参数是要被传递到后台
            rowList:  [20, 50, 100, 200], //可供用户选择一页显示多少条
            sortname: 'createDate',//默认的排序列
            sortorder: "desc",//排序方式,可选desc,asc
            viewrecords: true, //定义是否要显示总记录数
        	multiselect:true,//定义是否可以多选 
            //autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度
            onSelectRow: function (rowid, status) {//被选中的状态
                lastSel_dataId = rowid;
            },
            ondblClickRow:function(rowid){
           	    /*var urlText = baseUrl + "flow/runtime/businessObject/businessObject_edit.html?appId=" + selectedAppId + "&id=" + rowid;
                openWin(urlText);
                var urlText = baseUrl + "flow/runtime/businessObject/businessObject_edit.html?appId=" + selectedAppId + "&id=" + lastSel_dataId;
                openWin(urlText);*/
                var urlText = baseUrl + "flow/runtime/agent/agent_edit.html?agentId=" + rowid;
                openWin(urlText);
            },
            //加载失败事件
            loadError: function (xhr, status, error) {
                //console.info(xhr);
                //console.info(status);
                //console.info(error);
            },
            loadComplete : function(xhr) {
                $.xljUtils.addGridScroll();
            },
        });
}

/**
 * 样式格式化
 * @param rowId
 * @param val
 * @param rowObject
 * @param cm
 * @param rdata
 * @returns {String}
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
    if(rowObject.status!=1){
        return "style='color:red'";
    }
}

/**
 * 业务系统的格式化数据
 * @param cellvalue: 该字段的值
 * @param options:
 * @param rowObject
 * @returns {String} 返回业务系统的名称
 */
function proxyformatter(cellvalue, options, rowObject) {
    if("1"==cellvalue){
    	return "流程复制";
    }else if("2"==cellvalue){
    	return "流程剪切";
    }else if("3"==cellvalue){
    	return "前加签";
    }else if("4"==cellvalue){
    	return "后加签";
    }
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
        return "启用"
    }
    return "禁用";
}

/**
 * 新增按钮的处理事件
 */
function newItem() {
    openWin(baseUrl + "flow/runtime/agent/agent_edit.html?agentId=-1");
}

/**
 * 修改按钮的处理事件
 */
function modifyItem() {
	var idText="";
	var rowIds = $("#jqgridList").jqGrid('getGridParam','selarrrow');
	if(rowIds.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}
	if(rowIds.length != 1){
		pop_tip_open("blue","只能选择一条数据！");
		return;
	}
    var urlText = baseUrl + "flow/runtime/agent/agent_edit.html?agentId=" + rowIds[0];
    openWin(urlText);
}

function checkRecord() {
	
}
function changeIntoStatus(status){
	var idText="";
	var rowIds = $("#jqgridList").jqGrid('getGridParam','selarrrow');
	if(rowIds.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}
	for(var i in rowIds){
		idText += rowIds[i]+",";
	}
	idText = idText.substring(0, idText.length-1);
	var idStatusText = idText+"__"+status;
    
    $.ajax({
        url: "/platform-app/flow/agent/changeStatus/" + idStatusText,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'JSON',
        success: function (resultData) {
            var dataObj = resultData.result;
            //重新设置参数,然后调用reloadGrid的方法来 刷新JQGrid列表
            refreshJqGridData(idText);
        },
        error:function () {
            
        }
    });
}

/**
 * 业务变量按钮的处理事件
 */
function businessViriable() {
    if (!lastSel_dataId) {
        pop_tip_open('blue', "请选择一个业务对象!");
        return;
    }
    var urlText = baseUrl + "flow/runtime/businessObjectVariable/businessObjectVariable_list.html?appId=" + selectedAppId + "&busiObjectId=" + lastSel_dataId;
    openWin(urlText);
}

/**
 * 删除按钮的处理事件
 */
function deleteItem() {
	var allIdArr =$("#jqgridList").jqGrid('getDataIDs');
	var idText="";
	var rowIds = $("#jqgridList").jqGrid('getGridParam','selarrrow');
	if(rowIds.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}
	var firstSelDataId = rowIds[0];
	for(var i in rowIds){
		idText += rowIds[i]+",";
	}
	idText = idText.substring(0, idText.length);
	var popText = "确认要删除这"+rowIds.length+"条数据？"
	pop_text_open("blue", popText, function() {
		$.ajax({
			type : "delete",
			url : hostUrl + "flow/agent/deletePseudoBatch/" + idText,
			dataType : "json",
			contentType : 'application/json;charset=utf-8', //设置请求头信息
			success : function(data) {
				pop_tip_open("green", "删除成功！");
				
				//重新设置参数,然后调用reloadGrid的方法来 刷新JQGrid列表
	            var selIdx=0;
	            for(var idx=0; idx<allIdArr.length; idx++){
	            	if(firstSelDataId == allIdArr[idx]){
	            		selIdx = idx-1;
	            	}
	            }
	            
	            for(var idx2=0; idx2<rowIds.length; idx2++){
	            	var deleteRowId = rowIds[idx2];
	            	allIdArr.splice($.inArray(deleteRowId, allIdArr),1);
	            }
	           
	            if(selIdx<0){
	            	selIdx = 0;
	            }
	            refreshJqGridData(allIdArr[selIdx]);
			},
			error : function(xhr) {
				$.xljUtils.getError(xhr.status);
			}
		});
	}, function() {
		return;
	});
}

/**
 * 刷新JqGrid的表格数据，子窗口调用是opener.refreshJqGridData();
 */
function refreshJqGridData(rowId) {
	var postData = $("#jqgridList").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    
	var postData = {delflag: 0, start:0};
	var keyword = $("#keyword").val();
	if(keyword && keyword.length>0){
		postData = {delflag: 0, name:keyword};
	}
	console.log(JSON.stringify(postData));
	$("#jqgridList").jqGrid('setGridParam', {
        datatype: 'json', postData: postData,page:1
    }).trigger("reloadGrid");
	
	lastSel_dataId = rowId;
	if(rowId && rowId.length>10){
		setTimeout(function () {
			var rowIdArray = rowId.split(",");
			for(var idx=0; idx<rowIdArray.length; idx++){
				$('#jqgridList').jqGrid('setSelection',rowIdArray[idx]);
			}
		},500);
	}
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
    	appDelflag: "0",
        appStatus: "1"
    }
    $.ajax({ //发送更新的ajax请求
        type: "post",
        url: hostUrl+"sys/res/appSystem/queryList",
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
                getBusinessObjectPage();
                $.each(appList, function (index, item) {//遍历mapList的数组数据
                    $("#systemAppId").append("<option value=" + item.id + ">" + item.name + "</option>");
                });
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
    //queryAppSystemList();
	getBusinessObjectPage();
    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.addGridScroll();
});
