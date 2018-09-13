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

$(function () {
	getBusinessObjectPage();
	
    //页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
    $.xljUtils.addGridScroll();
});

/**
 * 使用jqgrid来查询和展示业务对象的分页数据
 */
function getBusinessObjectPage() {
    //创建jqGrid组件
    $.xljUtils.initJqGrid({
            gridSelecter:"#jqgridList",
            url: serviceUrl+"flow/monitorSetting/page",
            postData: {delflag: 0},
            datatype: "json",
            ajaxGridOptions: {contentType: 'application/json;charset=utf-8'},
            mtype: "post", 
            jsonReader: {
                repeatitems: false
            },

            colModel: [
                {name: 'id', label: 'ID', align: "center", hidden: true},
                {name: 'name', label: '监控标题', align: "left", width:"300", cellattr: addCellAttr},
                {name: 'type', label: '监控类型', align: "center", width:"70", formatter: dealWayformatter},
                {name: 'status', label: '状态', align: "center", width:"70", formatter: dataformatter, cellattr: addCellAttr},
                {name: 'startDate', label: '开始时间', align: "center", width:"120"},
                {name: 'endDate', label: '结束时间', align: "center", width:"120"},
                {name: 'remark', label: '备注说明', align: "left", width:"300"},
                
            ],
            pager: '#jqgridPager',             
            rowNum: 20, 
            rowList: [20, 50, 100, 200],  
            sortname: 'name', 
            sortorder: "desc", 
            viewrecords: true,  
        	multiselect:true, 
        	onselectrow:true,
            ondblClickRow:function(rowid,iRow,iCol,e){
            	var urlText = serviceUrl + "flow/runtime/monitor/monitor_edit_new.html?monitorId=" + rowid;
                openWin(urlText);
            },
            //autowidth: true,  //首次被创建时会根据父元素比例重新调整表格宽度
            // onSelectRow: function (rowid, status) {//被选中的状态
            //     lastSel_dataId = rowid;
            // },

            // //加载失败事件
            // loadError: function (xhr, status, error) {
            //     //console.info(xhr);
            //     //console.info(status);
            //     //console.info(error);
            // },
            // //加载完成
            // loadComplete: function (xhr) {
            // 	$.xljUtils.addGridScroll();
            // }
        });
}

/**
 * 设置新增行ID到jqgrid
 * @param rowId
 * @returns
 */
function setJqGridAddedRowId(rowId) {
    $.xljUtils.setAddedRowId('#jqgridList', rowId);
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
function dealWayformatter(cellvalue, options, rowObject) {
    if("1"==cellvalue){
    	return "按人员";
    }else if("2"==cellvalue){
    	return "按模板";
    }
    else return "按异常";
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
    openWin(baseUrl + "flow/runtime/monitor/monitor_edit_new.html?monitorId=-1");
}

/**
 * 修改按钮的处理事件
 */
function modifyItem(rowid,iRow,iCol,e) {
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
    var urlText = serviceUrl + "flow/runtime/monitor/monitor_edit_new.html?monitorId=" + rowIds[0];
    openWin(urlText);
    lastSel_dataId=undefined;
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
        url: "/platform-app/flow/monitorSetting/changeStatus/" + idStatusText,
        type: 'DELETE',
        contentType: 'application/json',
        dataType: 'JSON',
        success: function (resultData) {
            var dataObj = resultData.result;
            //重新设置参数,然后调用reloadGrid的方法来 刷新JQGrid列表
            refreshJqGridData();
            
            setTimeout(function() {
            	$.each(rowIds, function(index, item) {
            		$("#jqgridList").jqGrid('setSelection', item)    	
            	})
            }, 500);
        },
        error:function () {
            
        }
    });
    
}

/**
 * 删除按钮的处理事件
 */
function deleteItem() {
    var idText="";
	var rowIds = $("#jqgridList").jqGrid('getGridParam','selarrrow');
	if(rowIds.length == 0){
		pop_tip_open("blue","至少选择一条数据！");
		return;
	}
	for(var i in rowIds){
		idText += rowIds[i]+",";
	}
	idText = idText.substring(0, idText.length);
	var popText = "确认要删除这"+rowIds.length+"条数据吗？"
	pop_text_open("blue", popText, function() {
		$.ajax({
			type : "delete",
			url : serviceUrl + "flow/monitorSetting/deletePseudoBatch/" + idText,
			dataType : "json",
			contentType : 'application/json;charset=utf-8', //设置请求头信息
			success : function(data) {
				pop_tip_open("green", "删除成功！");
				refreshJqGridData();
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
function refreshJqGridData() {
	var postData = $("#jqgridList").jqGrid("getGridParam", "postData");
    $.each(postData, function (k, v) {
        delete postData[k];
    });
    
	var postData = {delflag: 0};
	var keyword = $("#keyword").val();
	if(keyword && keyword.length>0){
		postData = {delflag: 0, name:keyword};
	}
	$("#jqgridList").jqGrid('setGridParam', {
        datatype: 'json', postData: postData,
    }).trigger("reloadGrid");
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
