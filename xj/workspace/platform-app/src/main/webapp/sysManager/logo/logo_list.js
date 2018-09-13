var rowDataId;
var rowDataBeforeId;
$(function(){
	initLogoList();
	$.xljUtils.resizeNestedGrid();
	//更新数据
    $('#updateBtn').on('click',function () {
        //判断是否选择多行
        var idsVal = $('#logoList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal.length > 1) {
            $.xljUtils.tip('blue', "只能选择一行数据进行更新！");
            return;
        }

        //判断是否选择数据
        var idVal = $('#logoList').jqGrid('getGridParam', 'selrow');
        if (!idVal) {
            $.xljUtils.tip('blue', "请选择一条需要更新的数据！");
            return;
        }
        window.open('logo_edit.html?id='+idVal, '_blank');
    });
});

/**
 * 初始化logo列表
 */
function initLogoList() {
    var categoryGrid = jQuery("#logoList").jqGrid({
        url: baseUrl + 'sys/sysLogo/page',
        ajaxGridOptions: {contentType: 'application/json'},
        mtype: "POST",
        contentType: "application/json",
        datatype: "json",
        postData: {delflag: false},
        multiboxonly: false,
        multiselect: false,
        autowidth: true,
        rownumbers: true,
        jsonReader: {
            repeatitems: false
        },
        colNames: ['ID', 'logo名称', 'logo图标'],
        colModel: [
            {name: 'id', index: 'id', width: 55, hidden: true},
            {name: 'name', index: 'name'},
            {name : 'url',label : '图标',align : "center",formatter:function(icon){
            	if(icon){
            		return '<img src="'+icon+'" style="width:132px;height:30px">';
            	}else{
            		return "";
            	}
            }}
        ],
        rowNum: 20,//一页显示多少条
        rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
        pager: '#logoPager',//表格页脚的占位符(一般是div)的id
        viewrecords: true,
        ondblClickRow: function(id,name){
        	window.open('logo_edit.html?id='+id, '_blank');
		},
		onCellSelect: function(){
        	if(rowDataBeforeId!=null&&rowDataBeforeId!='undefined'){
        		//重新选择行时清除上一次选中行的样式
        		$('#logoList'+'#'+rowDataBeforeId).find("td").removeClass("ui-state-highlight"); 
        	}
        },
        onSelectRow: function () {
        },
        loadError: function (xhr, status, error) {
            $.xljUtils.getError(xhr.status);
        },
        gridComplete: function () {
            $.xljUtils.addGridScroll();
            $.xljUtils.gridResizeFn();
            if(rowDataId!=null&&rowDataId!='undefined'){
            	//添加回显选中行样式
            	$('#logoList').setSelection(rowDataId,true);
            	$('#logoList'+'#'+rowDataId).find("td").addClass("ui-state-highlight"); 
            }
            rowDataBeforeId = rowDataId;
        },
        loadComplete: function (xhr) {

        }
    });
}


function reloadGrid(id){
	pop_tip_open("green","数据操作成功！");
	rowDataId = id;
	$('#logoList').jqGrid().trigger("reloadGrid");
}