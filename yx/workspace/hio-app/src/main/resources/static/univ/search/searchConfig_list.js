/*
 * 检索属性配置页面js
 * 创建人：haoqipeng 2017-03-25
 */

/**
 * 创建属性jqgrid组件
 * 
 * @returns
 */
function initPropsGrid(){
	// 创建jqGrid组件
	$.xljUtils.initJqGrid({
		gridSelecter:"#searchPropsGrid",
		url:serviceUrl + 'univ/search/searchProperty/page',
		colNames : ['主键' ,'名称', '编码', '属性类别', '数据类型', '状态', '状态值'],//jqGrid的列显示名字
        colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
            {name : 'id',index : 'id',hidden:true},
            {name : 'name',index : 'name', width : 90},
            {name : 'code',index : 'code',width : 100},
            {name : 'category',index : 'category',width : 80, formatter:function(value, grid, row, state){
            	var ct = {"0":"系统预置","1":"自定义"};
            	return ct[value + ''];
            }},
            {name : 'type',index : 'type',width : 80, formatter:function(value, grid, row, state){
            	var ct = {"string":"字符串","date":"日期","number":"数值","file":"文件"};
            	return ct[value];
            }},
            {name : 'statusName',index : 'status',width : 80, formatter:function(value, grid, row, state){
            	return row.status == true?'启用':'未启用';
            }},
			{name : 'status',index : 'status',hidden:true}
        ],
        pager : '#searchPropsPager',// 表格页脚的占位符(一般是div)的id
		multiselect:true,
		sortname : "updateDate",
		editUrl:baseUrl + 'univ/search/searchProperty_edit.html'
	});
}

/**
 * 创建分类jqgrid组件
 * 
 * @returns
 */
function initCategoryGrid(){
	// 创建jqGrid组件
	$.xljUtils.initJqGrid({
		gridSelecter:"#categoryGrid",
		url:serviceUrl + 'univ/search/searchCategory/page',
		colNames : ['主键', '分类名称', '分类编码','状态','状态值'],//jqGrid的列显示名字
        colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
            {name : 'id',index : 'id',hidden:true},
            {name : 'name',index : 'name', width : 90},
            {name : 'code',index : 'code',width : 100},
            {name : 'statusName',index : 'status',width : 80, formatter:function(value, grid, row, state){
            	return row.status == true?'启用':'未启用';
            }},
			{name : 'status',index : 'status',hidden:true}
        ],
        pager : '#categoryPager',// 表格页脚的占位符(一般是div)的id
		multiselect:true,
		sortname : "updateDate",
		editUrl:baseUrl + 'univ/search/searchCategory_edit.html'
	});
}

/**
 * 刷新属性列表
 * @returns
 */
function refreshPropertyGrid() {
	$.xljUtils.reLoadJqGridData('#searchPropsGrid');
}

/**
 * 刷新分类列表
 * @returns
 */
function refreshCategoryGrid() {
	$.xljUtils.reLoadJqGridData('#categoryGrid');
}

/**
 * 设置新增行ID到jqgrid
 * @param rowId
 * @returns
 */
function setPropertyAddedRowId(rowId) {
	$.xljUtils.setAddedRowId('#searchPropsGrid', rowId);
}

/**
 * 设置新增行ID到jqgrid
 * @param rowId
 * @returns
 */
function setCategoryAddedRowId(rowId) {
	$.xljUtils.setAddedRowId('#categoryGrid', rowId);
}

$(function() {
    // 初始化jqgrid
    initPropsGrid();
    initCategoryGrid();
    // Grid记载完成后重置宽高
    $.xljUtils.resizeNestedGrid();
	//$.xljUtils.addGridScroll();
    //$.xljUtils.gridResizeFn();
    
    // 属性添加按钮点击事件，打开编辑页面
    $('.btn-add-props').click(function(){
    	window.open(baseUrl + 'univ/search/searchProperty_edit.html','_blank');
    });

	// 分类添加按钮点击事件，打开编辑页面
    $('.btn-add-category').click(function(){
    	window.open(baseUrl + 'univ/search/searchCategory_edit.html','_blank');
    });
    
    // 属性修改按钮点击事件，打开编辑页面
    $('.btn-modify-props').click(function(){
    	
    	// 判断是否选择多行
        var selIds = $('#searchPropsGrid').jqGrid('getGridParam','selarrrow');
        // console.log('selIds=' + selIds);
        if (selIds.length > 1) {
        	$.xljUtils.tip('blue', '只能选择一行数据进行更新！');
            return;
        }

        // 判断是否选择数据
        var selId = $('#searchPropsGrid').jqGrid('getGridParam','selrow');
        // console.log('selId=' + selId);
        if(selId == null) {
        	$.xljUtils.tip('blue', '请选择一条需要更新的数据！');
            return;
        }

		// 判断数据状态是否为启用
		var selRowData = $('#searchPropsGrid').jqGrid('getRowData',selId);
		if (selRowData.status == true) {
			$.xljUtils.tip('blue', '该记录已经是启用状态，不能修改！');
            return;
		}


        window.open(baseUrl + 'univ/search/searchProperty_edit.html?random='+Date.now() + '&id=' + selId,'_blank');
    });

	// 属性启用按钮点击事件，对未启用的属性改为启用状态，启用之后的属性不能再进行启用、更新、删除操作
    $('.btn-enable-props').click(function(){
    	
    	// 判断是否选择多行
        var selIds = $('#searchPropsGrid').jqGrid('getGridParam','selarrrow');
        // console.log('selIds=' + selIds);
        if (selIds.length > 1) {
        	$.xljUtils.tip('blue', '只能选择一行数据进行启用更新！');
            return;
        }

        // 判断是否选择数据
        var selId = $('#searchPropsGrid').jqGrid('getGridParam','selrow');
        // console.log('selId=' + selId);
		
        if(selId == null) {
        	$.xljUtils.tip('blue', '请选择一条需要操作的数据！');
            return;
        }

		// 判断数据状态是否为启用
		var selRowData = $('#searchPropsGrid').jqGrid('getRowData',selId);
		if (selRowData.status == 'true') {
			$.xljUtils.tip('blue', '该记录已经是启用状态！');
            return;
		}

		// 更新为启用
		$.xljUtils.xljAjax({
			type:'PUT',
			url: serviceUrl + 'univ/search/searchProperty/update/'+selId,
			data: JSON.stringify({status:true})
		},function (data) {
			$.xljUtils.reLoadJqGridData('#searchPropsGrid');
			$.xljUtils.tip('blue', '更新状态成功！');
		});
        
    });

	// 分类修改按钮点击事件，打开编辑页面
    $('.btn-modify-category').click(function(){
    	
    	// 判断是否选择多行
    	var selIds = $('#categoryGrid').jqGrid('getGridParam','selarrrow');
    	// console.log('selIds=' + selIds);
    	if (selIds.length > 1) {
    		$.xljUtils.tip('blue', '只能选择一行数据进行更新！');
    		return;
    	}
    	
    	// 判断是否选择数据
    	var selId = $('#categoryGrid').jqGrid('getGridParam','selrow');
    	// console.log('selId=' + selId);
    	if(selId == null) {
    		$.xljUtils.tip('blue', '请选择一条需要更新的数据！');
    		return;
    	}
    	window.open(baseUrl + 'univ/search/searchCategory_edit.html?random='+Date.now() + '&id=' + selId,'_blank');
    });

	// 分类启用按钮事件，将分类数据更新为启用状态，并根据分类的设置初始化全文索引类型mapping
	// 启用之后的分类，分类的编码code和启用时的分类属性列表不能修改、删除，可以增加分类的属性
	// TODO 已经是启用状态的分类，添加新的分类属性之后，可进行再次启用状态，再次启用操作，将未启用状态分类属性更新为启用状态，并更新索引类型mapping
	$('.btn-enable-category').click(function(){
    	
    	// 判断是否选择多行
    	var selIds = $('#categoryGrid').jqGrid('getGridParam','selarrrow');
    	// console.log('selIds=' + selIds);
    	if (selIds.length > 1) {
    		$.xljUtils.tip('blue', '只能选择一行数据进行更新！');
    		return;
    	}
    	
    	// 判断是否选择数据
    	var selId = $('#categoryGrid').jqGrid('getGridParam','selrow');
    	// console.log('selId=' + selId);
    	if(selId == null) {
    		$.xljUtils.tip('blue', '请选择一条需要更新的数据！');
    		return;
    	}

		// 判断数据状态是否为启用
		var selRowData = $('#categoryGrid').jqGrid('getRowData',selId);
		if (selRowData.status == 'true') {
			$.xljUtils.tip('blue', '该记录已经是启用状态！');
            return;
		}

		// 更新为启用
		$.xljUtils.xljAjax({
			type:'POST',
			url: serviceUrl + 'univ/search/searchCategory/updateStatus',
			data: JSON.stringify({id:selId, status:true})
		},function (data) {
			$.xljUtils.reLoadJqGridData('#categoryGrid');
			$.xljUtils.tip('blue', '更新状态成功！');
		});

    	
    });
    
    // 属性删除按钮点击事件，删除当前选中行
    $('.btn-del-props').click(function(){
    	
    	// 判断是否选择行
        var selIds = $('#searchPropsGrid').jqGrid('getGridParam','selarrrow');
        // console.log('selIds=' + selIds);
        if (selIds.length > 0) {
        	
			for(var i = 0; i < selIds.length; i++) {
				var selRowData = $('#searchPropsGrid').jqGrid('getRowData',selIds[i]);
				if (selRowData.status == 'true') {
					$.xljUtils.tip('blue', '启用状态数据不能删除');
					return;
				}
			}

        	if ($.xljUtils.confirm('blue', '是否要删除选中的'+selIds.length + '行数据', function(){
    			
				$.xljUtils.xljAjax({
					type:'DELETE',
    		        url:serviceUrl + 'univ/search/searchProperty/deleteBatch/' + selIds.join(',')
				},function (data) {
					$.xljUtils.reLoadJqGridData('#searchPropsGrid');
					$.xljUtils.tip('green',data.msg);
				});
    		
    		},true));
        	
        }
    	
    });

	// 分类删除按钮点击事件，删除当前选中行
    $('.btn-del-category').click(function(){
    	
    	// 判断是否选择行
    	var selIds = $('#categoryGrid').jqGrid('getGridParam','selarrrow');
    	// console.log('selIds=' + selIds);
    	if (selIds.length > 0) {
    		for(var i = 0; i < selIds.length; i++) {
				var selRowData = $('#categoryGrid').jqGrid('getRowData',selIds[i]);
				if (selRowData.status == 'true') {
					$.xljUtils.tip('blue', '启用状态数据不能删除');
					return;
				}
			}

    		if ($.xljUtils.confirm('blue', '是否要删除选中的'+selIds.length + '行数据', function(){
				
				$.xljUtils.xljAjax({
					type:'DELETE',
    				url:serviceUrl + 'univ/search/searchCategory/deleteBatch/' + selIds.join(',')
				},function (data) {
					$.xljUtils.reLoadJqGridData('#categoryGrid');
    				$.xljUtils.tip('green',data.msg);
				});
    		},true));
    		
    	}
    	
    });
    
    //jQuery("#searchPropsGrid").jqGrid().setGridHeight($($('.grid-container')[0]).height()-75);
    //切换
    $(".con-tit .approve-btn").on("click",function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $(".search-list-container>div").hide();
        $(".search-list-container>div").eq(index).show();
        $.xljUtils.resizeNestedGrid();
    });
    
    /**
	 * 页面自动计算宽度和高度
	 */
	 /*resizeHeight();
	 $(window).resize(function() {
	     resizeHeight();
	 });
	 //计算高度
	 function resizeHeight(){
		 var documentBodyHeight = $(window).height();
	     //右侧table
	     $(".con-table").height(documentBodyHeight-$('.user-list').outerHeight());
	 }*/
    
});
