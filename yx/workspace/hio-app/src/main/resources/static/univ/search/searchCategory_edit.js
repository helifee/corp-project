/*
 * 检索分类编辑页面js
 * 创建人：haoqipeng 2017-03-25
 */

/**
 * 提交 表单
 * @param {function} callback
 * @returns
 */
function submitForm(callback) {
	var $form = $('form.search-category');
	if ($form.find('input[name="id"]').val() == '') {
		if ($(window).data('edit-mode') == 'add') {
			initUuid();
			$.xljUtils.tip('blue','正在初始化主键，请稍后重试');
		} else {
			$.xljUtils.tip('blue', '主键标识丢失，请重新进入编辑页面');
		}
		
		return;
	}
	
	// 表单验证
	$.xljUtils.customSingleValidate($form[0]);
	var isValid = $form.valid();
	var $subForm = $('.form-search-property-list');
	$.xljUtils.customSingleValidate($subForm[0]);
	var isSubValid = $subForm.valid();
	if(isValid && isSubValid){
		
		$subForm.find('input[name="categoryId"]').val($form.find('input[name="id"]').val());
		
		// 准备表单提交数据
		var submitData = $form.serializeObject();
		submitData.propertyList = serializePropertyArray();
		var saveOptions = {
				url: $form.attr('action'),
				type:$form.attr('method'),
				data:JSON.stringify(submitData)
		};
		
		// 表单提交
		$.xljUtils.xljAjax(saveOptions,function(data){
			if ($(window).data('edit-mode') == 'add') {
				window.opener.setCategoryAddedRowId(data.id);
			}
			if (callback != undefined && typeof callback === 'function') {
				callback(data);
			} else {
				$.xljUtils.tip('green','检索分类保存成功');
				window.opener.refreshCategoryGrid();
				window.close();
			}
		});
	}
}

/**
 * 
 * 保存操作
 * 
 * @returns
 */
function save() {
	submitForm();
}

/**
 * 序列化属性列表数据为json数组
 * @returns {Array} 属性json对象列表
 */
function serializePropertyArray() {
	var dataArray = [];
	$('.table-category-property>tbody>tr').each(function(){
		if ($(this).data('data-readonly') == true) {
			dataArray.push($(this).data('data-data'));
		} else {
			var curRowData = $(this).find(':input').serializeArray();
			var curDataJson = {};
			$.each(curRowData, function(index, value){
				curDataJson[value.name] = value.value;
			});
			dataArray.push(curDataJson);
		}
	});
	return dataArray;
}

/**
 * 
 * 保存并新增操作
 * 
 * @returns
 */
function saveAndAdd() {
	submitForm(function(data){
		$.xljUtils.tip('green','检索分类保存成功');
		window.opener.refreshCategoryGrid();
		var $mainForm = $('form.search-category');
		$(window).data('edit-mode','add');
        $('.title-part').text('新增');
        $('title').text('检索分类-新增');
        $mainForm.attr('action', serviceUrl + 'univ/search/searchCategory/save');
        $mainForm.attr('method','POST');
        $mainForm.find(':input').each(function(){
        	$(this).val('');
        });
        var $firstPropertyRow = $('.table-category-property>tbody>tr:first');
        $firstPropertyRow.siblings().remove();
        setDefaultForNewRow($firstPropertyRow);
        initUuid();
	});
}


/**
 * 新取得表单记录ID
 * @returns
 */
function initUuid(callback){
	$.xljUtils.getUuid(function(uuid){
		if (!$.xljUtils.isEmpty(uuid)) {
			$('.search-category').find('input[name="id"]').val(uuid);
			if (callback != undefined) {
				callback();
			}
		}
	});
}

/**
 * 初始化属性选择列表modal
 * @returns
 */
function initPropertyModal() {
	$.xljUtils.initJqGrid({
		gridSelecter:'#propertyGrid',
		url:serviceUrl + 'univ/search/searchProperty/queryList?random='+Date.now(),
		jsonReader : {
   		 	root:'result'
		},
		colNames : ['主键' ,'名称', '编码', '属性类别',  '属性类别','数据类型','数据类型'],//jqGrid的列显示名字
        colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
            {name : 'id',index : 'id',hidden:true},
            {name : 'name',index : 'name', width : 160},
            {name : 'code',index : 'code',width : 160},
            {name : 'categoryName',index : 'category',width : 102, formatter:function(value, grid, row, state){
            	var ct = {'0':'系统预置','1':'自定义'};
            	return ct[row.category];
            }},
            {name : 'category',index : 'category',hidden:true},
            {name : 'typeName',index : 'type',width : 120, formatter:function(value, grid, row, state){
            	var ct = {'string':'字符串','date':'日期','number':'数值','file':'文件'};
            	return ct[row.type];
            }},
            {name : 'type',index : 'type',hidden:true},
        ],
        rowNum : -1,
		multiselect:false,
		sortname : 'name',
		ondblClickRow:function(rowid,iRow,iCol,e) {
			modalSelect();
		}
	});
}

/**
 * 为属性列表新行设置默认值
 * @param {object} $row 行元素jquery对象
 * @param {object} valueObject 默认数据
 * @returns
 */
function setDefaultForNewRow($row, valueObject) {
	var categoryIdVal = $('.search-category').find('input[name="id"]').val();
	var defaultTemp = {categoryId:categoryIdVal, code:'', name:'', category:'', type:'', isSearchItem:'true', isDisplay:'true', isOrderItem:'false', defaultValue:''};
	if (valueObject == undefined || valueObject == null) {
		valueObject = defaultTemp;
	} else {
		valueObject = $.extend({},defaultTemp, valueObject);
	}
	$row.find('td[name="name"]').text(valueObject.name);

	var $inputs = $row.find(':input');
	$.each($inputs, function(index, inp){
		$(inp).val(valueObject[inp.name]);
	});
	
	$.xljUtils.getUuid(function(uuid){
		if (!$.xljUtils.isEmpty(uuid)) {
			$row.find('input[name="id"]').val(uuid);
			valueObject.id = uuid;
			$row.data('data-data', valueObject);
		}
	});
}


/**
 * 增行
 * @param {object} rowData 行数据
 * @returns
 */
function addRow(rowData) {
	
	$('.table-category-property>tbody').append(function(){
		var $lastRow = $(this).find('tr:last');
		
		var $addRow =  $lastRow.clone(true);
		$addRow.removeData(['data-readonly', 'data-data']);
		$addRow.find('select,:text').removeAttr('disabled');
		$addRow.find('a.a-property-select').on('click', showPropertyModal);
		$addRow.find('td:eq(0)').text(parseInt($lastRow.find('td:eq(0)').text()) + 1);
		setDefaultForNewRow($addRow, rowData);
		return $addRow;
	});
}

/**
 * 删行
 * @returns
 */
function delRow() {
	var $curRow = $('.table-category-property>tbody>tr.active');
	if ($curRow.length == 0) {
		$.xljUtils.tip('blue','请先选择要删除的行');
		return;
	}

	// 已启用只读行不能执行删除
	if ($curRow.data('data-readonly') == true) {
		return;
	}
	var $siblingRow = $curRow.siblings();
	
	if ($siblingRow.length > 0) {
		var $activeRow = $curRow.prev().length == 1? $curRow.prev(): $curRow.next();
	
		resetRowNo();
		$('.table-category-property>tbody>tr.active').remove();
		$activeRow.addClass('active');
	} else {
		$.xljUtils.tip('blue','提示：至少应有一行属性记录');
	}
}

/**
 * 新增分类，添加默认分类属性行：标题、内容、创建人、创建日期
 */
function addDefaultCategoryProperties() {
	// 第一行：标题 title
	var $firstPropertyRow = $('.table-category-property>tbody>tr:first');
	setDefaultForNewRow($firstPropertyRow, {code:'title', name:'标题', category:'0', type:'string', isOrderItem:'true'});
	
	// 第二行：正文 content
	addRow({code:'content', name:'内容', category:'0', type:'string'});

	// 第三行：创建人 createPersonName
	addRow({code:'createPersonName', name:'创建人', category:'0', type:'string', isOrderItem:'true'});

	// 第四行：创建日期 createDate
	addRow({code:'createDate', name:'创建日期', category:'0', type:'date', isOrderItem:'true'});

	// 第五行：索引url url
	addRow({code:'url', name:'超链接', category:'0', type:'string', isSearchItem:'false', isDisplay:'false', isOrderItem:'false'});

	// 第六行：附件 files
	addRow({code:'files', name:'附件', category:'0', type:'file', isOrderItem:'false'});
}

/**
 * 属性模态框选择事件
 * @returns
 */
function modalSelect(){
	
	// 判断是否选择数据
	var selId = $('#propertyGrid').jqGrid('getGridParam','selrow');
	// console.log('selId=' + selId);
	if(selId != null) {
		// 当前行数据
		var rowData = $('#propertyGrid').jqGrid('getRowData',selId);
		
		$('.table-category-property>tbody input[name="code"]').val();
		
		var hasSelected = false;
		$('.table-category-property>tbody>tr:not(.active) input[name="code"]').each(function(index, item){
			if ($(item).val() == rowData.code) {
				hasSelected = true;
			}
		});
		
		if (hasSelected) {
			$.xljUtils.tip('blue','所选行已存在，不能重复选择');
		} else {
			// 将当前选中行数据显示到父窗口中
			var $curRow = $('.table-category-property>tbody>tr.active');
			$curRow.find('input[name="code"]').val(rowData.code);
			$curRow.find('td[name="name"]').text(rowData.name);
			$curRow.find('input[name="name"]').val(rowData.name);
			$curRow.find('input[name="type"]').val(rowData.type);
			$curRow.find('input[name="category"]').val(rowData.category);
			$('.property-code-modal').modal('hide');
		}
		
	} else {
		$.xljUtils.tip('blue','请选择数据行');
	}
}

/**
 * 弹出属性选择框
 */
function showPropertyModal(){
	$('.property-code-modal').modal({show:true, backdrop:'static'});
}
/**
 * 重置属性列表行号
 * 
 * @returns
 */
function resetRowNo() {
	$('.table-category-property>tbody>tr.active').nextAll().each(function(){
		$(this).find('td:first').text(function(index, txt){return parseInt(txt) - 1 + '';});
	});
}

$(function(){
	
	// ==================== 属性选择则模态框 start ====================
	
	// 初始化属性列表选择modal
	initPropertyModal();
	
	// 属性列表模态框选择按钮事件
	$('.property-code-modal .btn-select').on('click', modalSelect);
	
	// 属性列表模态框取消按钮事件
	$('.property-code-modal .btn-cancel').on('click', function(){
		$('.property-code-modal').modal('hide');
	});
	
	// 分类属性列表中属性编码参照按钮点击事件
	$('.table-category-property .a-property-select').on('click', showPropertyModal);
	
	$('.property-code-modal').on('hide.bs.modal', function () {
    	$(this).find('.ui-jqgrid-bdiv').getNiceScroll().hide();
    });
	$('.property-code-modal').on('show.bs.modal', function () {
		$(this).find('.ui-jqgrid-bdiv').getNiceScroll().show();
	});

	// ==================== 属性选择则模态框 end ====================
	
	// 绑定保存事件
	$('.btn-save').click(save);
	// 绑定保存并新增事件
	$('.btn-save-add').click(saveAndAdd);
	
	// 绑定增行按钮点击事件
	$('.btn-addrow').click(addRow);
	// 绑定删行按钮点击事件
	$('.btn-delrow').click(delRow);
	
	// 分类属性列表行选择事件
	$('.table-category-property>tbody>tr').on('click',function(){
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
	});
	
	// 获取记录主键，为空则为新增，否则为修改
	var recordId = $.xljUtils.getUrlParam('id');
	
	// console.log('recordId='+recordId);
	
	// 新增分类
	if(recordId == null){
		$(window).data('edit-mode','add');
        $('.title-part').text('新增');
        $('title').text('检索分类-新增');
        $('.search-category').attr('action', serviceUrl + 'univ/search/searchCategory/save');
        $('.search-category').attr('method','POST');

        initUuid(function(){
			// 新增分类，添加默认分类属性行：标题、内容、创建人、创建日期
			addDefaultCategoryProperties();
			// 标记默认行为只读
			var $curRows = $('.table-category-property>tbody>tr');
			$curRows.data('data-readonly', true);
			$curRows.find('select').prop('disabled', 'disabled');
			$curRows.find(':text').prop('disabled', 'disabled');
			$curRows.find('a.a-property-select').off('click');
		});
    } 
	// 修改分类
	else {
		$(window).data('edit-mode','update');
        $('.title-part').text('修改');
        $('title').text('检索分类-修改');

        $.ajax({
            url: serviceUrl + 'univ/search/searchCategory/get/'+recordId + '?random='+Date.now(),
            type:'GET',
            success:function (resultData) {
                if(resultData && resultData.success) {
                    var searchCategory = resultData.result;
                    var formItems = $('.search-category .input-item');

                    $.each(formItems, function(index, item) {
						var $item = $(item);
						if ($item.prop('type') != 'radio') {
							$item.val(searchCategory[item.name]);
						} else {
							if ($item.val() == (searchCategory[item.name] + '')) {
								$item.prop('checked','checked');
							}
						}
                    });
					
					// 启用状态下，分类名称、分类URL可以修改
					if (searchCategory.status == true) {
						formItems.filter(':not(:radio)[name!="name"][name!="serviceUrl"]').prop('disabled','disabled');
						formItems.filter(':radio').prop('disabled','disabled');
					}
                    
                    $('.search-category').attr('action',serviceUrl + 'univ/search/searchCategory/update/'+searchCategory['id']);
                    $('.search-category').attr('method','PUT');

                    // 初始化属性列表
                    if (searchCategory.propertyList != null && searchCategory.propertyList.length > 0) {

						var aas = ['title', 'content', 'createPersonName','createDate'];
						var cmmRows = new Array(4);
                    	var $lastRow = $('.table-category-property>tbody').find('tr:last');
                    	var $lastRowClone = $lastRow.clone(true);
                    	$lastRow.remove();
                    	$.each(searchCategory.propertyList, function(index, value){
                    		$('.table-category-property>tbody').append(function(){
                        		var $addRow =  $lastRowClone.clone(true);
                        		// $addRow.find('td:eq(0)').text(index + 1);
                        		$addRow.find('td[name="name"]').text(value.name);
                        		var $inputs = $addRow.find(':input');
								$.each($inputs, function(idx, inp){
									$(inp).val(value[inp.name] == null?'':(value[inp.name] + ''));
								});
								// 启用状态下，不能操作当前行，提交时，旧有数据从附加数据里取，不再从页面上取
								if (searchCategory.status == true || aas.indexOf(value.code) != -1) {
									$addRow.data('data-readonly',true);
									$addRow.data('data-data',value);
									// 不可编辑
									$addRow.find(':text').prop('disabled', 'disabled');
									$addRow.find('select').prop('disabled','disabled');
									$addRow.find('a').off('click');
									var cmmIndex = aas.indexOf(value.code);
									if (cmmIndex != -1) {
										cmmRows[cmmRows.length - 1 - cmmIndex] = $addRow;
										return null;
									}
								}
                        		return $addRow;
                        	});
                    	});
						$.each(cmmRows, function(index, item) {
							$('.table-category-property>tbody').prepend(item);
						});

						// 重置行号
						$('.table-category-property>tbody>tr').each(function(rIndex, rEle) {
							$('td:first', rEle).text(rIndex + 1);
						});
                    }
                    
                }
            }, error:function(xhr) {
            	$.xljUtils.getError(xhr.status);
            }
        });
    }
	
});