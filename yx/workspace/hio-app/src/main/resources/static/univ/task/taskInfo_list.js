$(function(){
    // 页面加载完成之后执行
	
	// 加载表格数据
    loadGridData();
    // 新增
    $('.btn-insert').click(insertClick);
    // 修改
    $('.btn-update').click(updateClick);
    // 删除
    $('.btn-delete').click(deleteClick);
    // 暂停
    $('.btn-pause').click(pauseClick);
    // 恢复
    $('.btn-recover').click(recoverClick);
    // 立即执行
    $('.btn-execute').click(executeClick);
    
    // 回车执行列表查询
    $('input[name="taskInfoName"]').on('keydown', function(e){
		if (e.keyCode == 13) {
			// 失去焦点
			$(this).blur();
			// 调用检索
			searchData();
		}
	});

    $.xljUtils.resizeNestedGrid();

});

/**
 * 新增事件
 * @returns
 */
function insertClick() {
	window.open(baseUrl + 'univ/task/taskInfo_edit.html?random='+Date.now(), '_blank');
}

/**
 * 修改事件
 * @returns
 */
function updateClick() {
	
//	// 判断是否选择多行
//    var selIds = $('#list').jqGrid('getGridParam','selarrrow');
//    console.log('selIds=' + selIds);
//    if (selIds.length > 1) {
//    	$.xljUtils.tip('blue', '只能选择一行数据进行更新！');
//        return;
//    }
//
//    // 判断是否选择数据
//    var selId = $('#list').jqGrid('getGridParam','selrow');
//    console.log('selId=' + selId);
//    if(selId == null) {
//    	$.xljUtils.tip('blue', '请选择一条需要更新的数据！');
//        return;
//    }
	
    
    var selIds = getSelectRowIds();
    if (selIds.length > 1) {
    	$.xljUtils.tip('blue', '只能选择一行数据进行更新！');
    } else if (selIds.length == 0) {
    	$.xljUtils.tip('blue', '请选择一条需要更新的数据！');
    } else {
    	window.open(baseUrl + 'univ/task/taskInfo_edit.html?random='+Date.now() + '&id=' + selIds[0],'_blank');
    }
	
}

/**
 * 删除事件
 * @returns
 */
function deleteClick() {
	// 判断是否选择行
	var selIds = getSelectRowIds();
    if (selIds.length == 0) {
    	$.xljUtils.tip('blue', '请选择需要删除的数据！');
    } else {
    	if ($.xljUtils.confirm('blue', '是否要删除选中的'+selIds.length + '行数据', function(){
			$.xljUtils.xljAjax({
				type:'DELETE',
		        url:serviceUrl + 'univ/task/taskInfo/deleteBatch/' + selIds.join(',')
			}, function(data){
        		$.xljUtils.reLoadJqGridData('#list');
	        	$.xljUtils.tip('green', '任务信息删除成功！');
			});
		
		},true));
    }
}

/**
 * 暂停事件
 * 
 * @returns
 */
function pauseClick() {
	var selIds = getSelectRowIds();
    if (selIds.length == 0) {
    	$.xljUtils.tip('blue', '请选择需要暂停的任务数据！');
    } else {
    	if ($.xljUtils.confirm('blue', '是否要暂停选中的'+selIds.length + '条任务', function(){
			$.xljUtils.xljAjax({
				type:'PUT',
		        url:serviceUrl + 'univ/task/taskInfo/updateTaskState/' + selIds.join(','),
		        data:JSON.stringify({active:false})
			}, function(data){
        		$.xljUtils.reLoadJqGridData('#list');
	        	$.xljUtils.tip('green', '任务已暂停！');
			});
		
		},true));
    }
}

/**
 * 恢复事件
 * 
 * @returns
 */
function recoverClick() {
	var selIds = getSelectRowIds();
    if (selIds.length == 0) {
    	$.xljUtils.tip('blue', '请选择需要恢复的任务数据！');
    } else {
    	if ($.xljUtils.confirm('blue', '是否要恢复选中的'+selIds.length + '条任务', function(){
			$.xljUtils.xljAjax({
				type:'PUT',
		        url:serviceUrl + 'univ/task/taskInfo/updateTaskState/' + selIds.join(','),
		        data:JSON.stringify({active:true})
			}, function(data){
        		$.xljUtils.reLoadJqGridData('#list');
	        	$.xljUtils.tip('green', '任务已恢复！');
			});
		
		},true));
    }
	
}

/**
 * 立即执行事件
 * 
 * @returns
 */
function executeClick() {
	var selIds = getSelectRowIds();
    if (selIds.length == 0) {
    	$.xljUtils.tip('blue', '请选择需要立即执行的任务数据！');
    } else {
    	if ($.xljUtils.confirm('blue', '是否要立即执行选中的'+selIds.length + '条任务', function(){
			$.xljUtils.xljAjax({
				type:'GET',
		        url:serviceUrl + 'univ/task/taskInfo/executeNow/' + selIds.join(',')
			}, function(data){
        		$.xljUtils.reLoadJqGridData('#list');
	        	$.xljUtils.tip('green', '任务已经开始执行！');
			});
		
		},true));
    }
	
}

function getSelectRowIds() {
    var selIds = $('#list').jqGrid('getGridParam','selarrrow');
    return selIds;
	
}

/**
 * 加载任务信息列表
 * @returns
 */
function loadGridData(){

	// 创建jqGrid组件
	$.xljUtils.initJqGrid({
		gridSelecter:'#list',
		url : serviceUrl + 'univ/task/taskInfo/page?random='+Date.now(),
		postData : {},
		colNames :['主键', '任务名称', '任务编码','任务类型','任务全限定名称','方法','时间表达式/间隔(分钟)', '下次执行时间', '是否有效', '描述'],
		colModel : [
			{ name : 'id',  index : 'id', align : 'center', hidden : true },
			{ name : 'name',index : 'name', align : 'left' },
			{ name : 'code',index : 'code', align : 'left'},
			{ name : 'type',index : 'type', align : 'center',formatter:function(value, grid, row, state){
            	var ct = {'1':'Java','2':'DB'};
            	return ct[value];
            }
            },
			{ name : 'fullyQualifiedName',index : 'fullyQualifiedName', align : 'left'},
			{ name : 'methodName',index : 'methodName', align : 'left'},
			{ name : 'timeExpression',index : 'timeExpression', align : 'left', formatter:function(value, grid, row, state){
            	return row.simpleTrigger == true? row.timeInterval:value;
            }},
			{ name : 'nextFireTime',index : 'nextFireTime', align : 'center', formatter:function(value, grid, row, state){
            	return value == null ? '': value;
            }},
			{ name : 'active',index : 'active', align : 'center',formatter:function(value, grid, row, state){
            	return value == false? '失效':'有效';
            }
            },
			{ name : 'remark', index : 'remark',align : 'left'}
		],
		multiselect:true,
		viewrecords:true,
		pager : '#pager',//表格页脚的占位符(一般是div)的id
		editUrl:baseUrl + 'univ/task/taskInfo_edit.html'
	});
};

/**
 * 列表检索
 * @returns
 */
function searchData(){
    var taskInfoName=$.trim($("#taskInfoName").val());
     var param = {};
     if (!$.xljUtils.isEmpty(taskInfoName)) {
    	 param.name = taskInfoName;
     }
     $.xljUtils.reLoadJqGridData('#list',param);

}

/**
 * 刷新属性列表
 * @returns
 */
function refreshGrid() {
	$.xljUtils.reLoadJqGridData('#list');
}

/**
 * 设置新增行ID到jqgrid
 * @param rowId
 * @returns
 */
function setAddedRowId(rowId) {
	$.xljUtils.setAddedRowId('#list', rowId);
}
