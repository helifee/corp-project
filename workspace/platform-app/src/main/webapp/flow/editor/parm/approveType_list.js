/**
 * @author: peter <zhengjj_2009@126.com>
 * @date: 2017-03-25
 */

/**
 * 此文件实现审批类型的列表及相关操作
 */


var lastSel_approveType;

/**
 * 获取审批类型的表格定义
 */
function getApproveTypePage(){
    //创建jqGrid组件
    $("#approveType_list").jqGrid(
        {
            url : hostUrl+"flow/approveType/page",
            postData: {delflag: false},
            datatype : "json",
            ajaxGridOptions: { contentType: 'application/json;charset=utf-8' },
            mtype : "post",
            jsonReader: {
                repeatitems: false
            },           
            colModel : [
                {name:'id',     label:'ID',    align:"center", hidden:true},
                {name:'name',   label: '名称',  align:"center", cellattr: addCellAttr },
    			{name:'code',   label: '编号',  align:"center" },
    			{name:'remark', label: '备注',  align:"center" },
    			{name:'status', label: '状态',  align:"center", formatter: statusformatter, cellattr: addCellAttr } 
            ],
            forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
            //pager : '#approveType_pager',//定义翻页用的导航栏，必须是有效的html元素            
            rowNum: 20,//在grid上显示记录条数，这个参数是要被传递到后台
            rowList: [20, 50, 100, 200], //可供用户选择一页显示多少条
            sortname : 'id',//默认的排序列
            sortorder : "desc",//排序方式,可选desc,asc
            viewrecords : true, //定义是否要显示总记录数
           	onSelectRow: function(rowid, status) {//被选中的状态
            	lastSel_approveType = rowid;
            },
            ondblClickRow:function(rowid){
           	    lastSel_approveType = rowid;
                var urlText = baseUrl+"flow/runtime/approveType/approveType_edit.html?approveId="+lastSel_approveType+"&time=" + new Date().getTime();
            	openWin(urlText);
            },
            gridComplete: function() {//当表格所有数据都加载完成，
            	$('.ui-state-default.ui-jqgrid-hdiv').css({'margin-top':'8px'});
				$.xljUtils.addGridScroll();
				$.xljUtils.gridResizeFn();
				 $("#approveType_list").jqGrid('setSelection', lastSel_approveType);
				//$('#approveType_list').setSelection(lastSel_approveType, true);
                //$('#approveType_list ' + '#' + lastSel_approveType).find("td").addClass("ui-state-highlight");
            }
            
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
    if(!rowObject.status){
        return "style='color:red'";
    }
}

/**
 * 对status字段的解析
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {String}
 */
function statusformatter(cellvalue, options, rowObject){  
    cellvalue = ""+cellvalue;
	if("true" == cellvalue){
		return "启用";
	}
	if("false" == cellvalue){
		return "禁用";
	}
    return "["+cellvalue+"]";  
}

/**
 * 修改的点击事件
 */
function modifyItem(){
	if(!lastSel_approveType){
		pop_tip_open("blue","请选择一个审批类型进行修改操作!");
		return;
	}
	var urlText = baseUrl+"flow/runtime/approveType/approveType_edit.html?approveId="+lastSel_approveType+"&time=" + new Date().getTime();
	openWin(urlText);
}

/**
 * 启用或禁用按钮的点击事件
 * @param newStatus
 */
function changeStatus(newStatus){
	if(!lastSel_approveType){
		pop_tip_open("blue","请选择一个审批类型进行操作!");
		return;
	}
	var rowData = $('#approveType_list').jqGrid('getRowData', lastSel_approveType);
	if('1' == newStatus){
		rowData.status = 'true';
	}else if('0' == newStatus){
		rowData.status = 'false';
	}
	//---------------------  开始进行提交请求，交由后台处理   -----------------------
	$.ajax({ //发送更新的ajax请求
	    type: "put",  
	    url: hostUrl+"flow/approveType/update/" + lastSel_approveType,  
	    data: JSON.stringify(rowData),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType: 'application/json;charset=utf-8', //设置请求头信息  
	    success: function(data){ 
	    	//lastSel_approveType = "";
	    	$("#approveType_list").trigger("reloadGrid");//调用reloadGrid的方法来 刷新JQGrid列表
	    },  
	    error: function(data){  
	    	//lastSel_approveType = "";
	    	if(data.msg){
	    		pop_tip_open("red",data.msg);
	    	}else{
	    		pop_tip_open("red","修改失败！");
	    	}
	    }  
	});//end-for $.ajax({
}

function resetBasicApproveTypeData(type){
	var updateData = {code: type};
	$.ajax({  
	    type: "POST",  
	    url: hostUrl+"flow/approveType/resetBasicTypeData",  
	    data: JSON.stringify(updateData),//将对象序列化成JSON字符串  
	    dataType:"json",  
	    contentType: "application/json;charset=utf-8", //设置请求头信息  
	    success: function(data){ 
	    	pop_tip_open("green","恢复默认值操作成功！");
	    	$('#approveType_list').jqGrid('setGridParam', { datatype: 'json' }).trigger("reloadGrid");
	    },
		error: function(xhr){ 
			$.xljUtils.getError(xhr.status);
		} 
	});
}
/*$(function(){
	getApproveTypePage();
	//页面加载完毕后更改grid宽高
    $.xljUtils.resizeNestedGrid();
});*/

