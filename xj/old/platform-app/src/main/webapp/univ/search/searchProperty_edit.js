/*
 * 检索属性编辑页面js
 * 创建人：haoqipeng 2017-03-25
 */

/**
 * 提交 表单
 * @param {function} callback
 * @returns
 */
function submitForm(callback) {
	var $form = $('form.search-property');
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
	if(isValid){
		
		// 准备表单提交数据
		var submitData = $form.serializeObject();
		var saveOptions = {
				url: $form.attr('action'),
				type:$form.attr('method'),
				data:JSON.stringify(submitData)
		};
		
		// 表单提交
		$.xljUtils.xljAjax(saveOptions,function(data){
			if ($(window).data('edit-mode') == 'add') {
				window.opener.setPropertyAddedRowId(data.id);
			}
			if (callback != undefined && typeof callback === 'function') {
				callback(data);
			} else {
				$.xljUtils.tip('green','检索属性保存成功');
				window.opener.refreshPropertyGrid();
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
 * 
 * 保存并新增操作
 * 
 * @returns
 */
function saveAndAdd() {
	submitForm(function(data){
		$.xljUtils.tip('green','检索属性保存成功');
		window.opener.refreshPropertyGrid();
		var $form = $('form.search-property');
		
		$form.find('input').each(function(){
			$(this).val('');
		});
		
		$form.attr('action',hostUrl + 'univ/search/searchProperty/save');
		$form.attr('method','POST');
		$(window).data('edit-mode','add');
		$('.title-part').text('新增');
		$('title').text('检索属性-新增');
		initUuid();
	});
}

/**
 * 初始化主键ID
 * 
 * @returns
 */
function initUuid(){
	$.xljUtils.getUuid(function(uuid){
		$(".search-property").find("input[name='id']").val(uuid);
	});
}

$(function(){
	// 绑定保存事件
	$('.btn-save').click(save);
	// 绑定保存并新增事件
	$('.btn-save-add').click(saveAndAdd);
	
	// 获取记录主键，为空则为新增，否则为修改
	var recordId = $.xljUtils.getUrlParam('id');
	
	// console.log('recordId='+recordId);
	
	// 新增属性
	if(recordId == null){
        $(".title-part").text('新增');
        $('title').text('检索属性-新增');
        $(window).data('edit-mode','add');
        $(".search-property").attr('action',hostUrl + 'univ/search/searchProperty/save');
        $(".search-property").attr('method','POST');
        
        initUuid();
    } 
	// 修改属性
	else {
        $.xljUtils.xljAjax({
        	 url:hostUrl + 'univ/search/searchProperty/get/'+recordId + '?random=' + Date.now(),
             type:'GET'
        }, function(data){
			// 已启用状态数据，页面为预览状态，保存操作按钮不显示
			if (data.status == true || data.category == 0/*系统预置*/) {
				$(".title-part").text('预览');
				$('title').text('检索属性-预览');
				$('.btn-save').remove();
				$('.btn-save-add').remove();
				$(window).data('edit-mode','view');
			} else {
				$(".title-part").text('修改');
				$('title').text('检索属性-修改');
				$(window).data('edit-mode','update');
				$(".search-property").attr('action',hostUrl + 'univ/search/searchProperty/update/'+data['id']);
            	$(".search-property").attr('method','PUT');
			}
        	var formItems = $(".search-property .input-item");
            $.each(formItems, function(index, item) {
            	var $item = $(item);
				if ($item.prop('type') != 'radio') {
					$item.val(data[item.name]);
				} else {
					if ($item.val() == (data[item.name] + '')) {
						$item.prop('checked','checked');
					}
				}
            });


			// 已启用状态数据，页面为预览状态，表单只读
			if (data.status == true || data.category == 0/*系统预置*/) {
				$('form').find(':text,input[type="textarea"]').prop('disabled', 'disabled');
				$('form').find('select, :radio').prop('disabled','disabled');
			}


        });
        
    }
	
});