/*
 * 任务信息编辑页面js
 * 创建人：haoqipeng 2017-03-25
 */

//var timeUnits = {'1':'秒','2':'分','3':'时','4':'日','5':'月','6':'周','7':'年'},
var
unitSecondKey = '1',
unitMinuteKey = '2',
unitHourKey = '3',
unitDayKey = '4',
unitMonthKey = '5',
unitWeekKey = '6',
unitYearKey = '7',
timeUnits = {
	'2' : {
		'name' : '分',
		'target' : '.minute-target'
	},
	'4' : {
		'name' : '日',
		'target' : '.day-target'
	},
	'5' : {
		'name' : '月',
		'target' : '.month-target'
	},
	'6' : {
		'name' : '周',
		'target' : '.week-target'
	}
}


/**
 * 
 * 提交表单
 * 
 * @returns
 */
function submitForm(callback) {
	var $form = $('form.taskInfo-form');
	if ($form.find('input[name="id"]').val() == '') {
		if ($(window).data('edit-mode') == 'add') {
			initUuid();
			$.xljUtils.tip('blue','正在初始化主键，请稍后重试');
		} else {
			$.xljUtils.tip('blue', '主键标识丢失，请重新进入编辑页面');
		}
		
		return;
	}
	
	// ==== 表单验证之前，根据时间单位确定执行时间的验证规则 ====
	var unitVal = $('.select-time-unit').val();
	// 时间单位分钟， 简单触发器
	if (unitVal == unitMinuteKey) {
		// 增加 时间间隔 控件 验证属性  data-digits="true" data-min="1"
		$('input[name="timeInterval"]').attr({'data-digits':'true','data-min':'1','data-required':'true'});
		// 删除表达式 控件 验证属性
		$('input[name="timeExpression"]').removeAttr('data-required data-maxlength');
		$('input[name="timeExpression"]').val('');
	} 
	// 表达式触发器
	else {
		
		// 删除 时间间隔 控件 验证属性
		$('input[name="timeInterval"]').removeAttr('data-digits data-min data-required');
		$('input[name="timeInterval"]').val('');
		// 增加表达式 控件 验证属性
		$('input[name="timeExpression"]').attr({'data-required':'true','data-maxlength':'100'});
	}
	
	// 表单验证
	$.xljUtils.customSingleValidate($form[0]);
	var isValid = $form.valid();
	if(isValid){
		
		// 准备表单提交数据
		var submitData = $form.serializeObject();
		delete submitData.timeDayValue;
		delete submitData.timeHourValue;
		delete submitData.timeMinuteValue;
		delete submitData.timeSecondValue;
		delete submitData.timeWeek;
		// 是否为简单触发器
		if (unitVal == unitMinuteKey) {
			submitData.simpleTrigger = true;
			submitData.timeExpression = null;
		} else {
			submitData.simpleTrigger = false;
			submitData.timeInterval = null;
		}
		var saveOptions = {
				url: $form.attr('action'),
				type:$form.attr('method'),
				data:JSON.stringify(submitData),
				success:function(data) {
					if (data) {
						if (data.success) {
							
							// 新增任务，将新增任务ID存储到jqgrid上
							if ($(window).data('edit-mode') == 'add') {
								window.opener.setAddedRowId($("input[name='id']").val());
							}
							if (callback != undefined && typeof callback === 'function') {
								callback(data);
							} else {
								$.xljUtils.tip('green','任务信息保存成功');
								window.opener.refreshGrid();
								window.close();
							}
						} else {
							$.xljUtils.tip('blue',data.msg);
						}
					} else {
						$.xljUtils.tip('red','保存任务信息发生错误');
					}
				}
		};
		
		// 表单提交
		$.xljUtils.xljAjax(saveOptions);
		
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
	submitForm(afterSaveAndAdd);
}

/**
 * 表单保存并新增回调函数
 * @returns
 */
function afterSaveAndAdd(resultJson) {
	$.xljUtils.tip('green','任务信息保存成功');
	$('title').text('任务信息-新增');
	$(window).data('edit-mode','add');
	var $form = $('form.taskInfo-form');
	$form.find('input:not(:radio,[name="active"])').each(function(){
		$(this).val('');
	});
	$('input[name="type"]', $form).val('1');
	$('input.select-time-unit').val('-1');
	$form.attr('action',baseUrl + 'univ/task/taskInfo/save');
	$form.attr('method','POST');
	
	initUuid();
}

/**
 * 初始化主键ID
 * 
 * @returns
 */
function initUuid(){
	$.xljUtils.getUuid(function(uuid){
		$(".taskInfo-form").find("input[name='id']").val(uuid);
	});
}

/**
 * 显示简单触发器
 * @returns
 */
function displaySimpleTask() {
	$('.select-time-unit').val(unitMinuteKey);
	$('.time-target-td').html($('.div-temp-content .minute-target')[0].outerHTML);
	var $timeExpressonInput = $('input[name="timeExpression"]');
	$timeExpressonInput.removeAttr('data-required data-maxlength');
	$('.time-expression-td').addClass('hidden');
}

$(function(){
	// 初始化执行时间-事件单位下拉框
	$('.select-time-unit').html(function(){
		var optionHtmlArray = ['<option value="-1" data-target="notarget"></option>'];
		$.each(timeUnits, function(key, value){
			optionHtmlArray.push('<option value="',key,'" data-target="',value.target,'">',value.name,'</option>')
		});
		return optionHtmlArray.join('');
	});
	
	// 执行时间单位选择事件
	$('.select-time-unit').change(function(){
		var unitVal = $(this).val();
		var $timeExpressonInput = $('input[name="timeExpression"]');
		
		if (unitVal == unitMinuteKey) {
			$timeExpressonInput.removeAttr('data-required data-maxlength');
			$('.time-expression-td').addClass('hidden');
		} else {
			$timeExpressonInput.attr({'data-required':'true', 'data-maxlength':'100'});
			$('.time-expression-td').removeClass('hidden');
		}
		
		$('.input-time-value').val('');
		
		// 给间隔输入项添加validate属性
		//var $inputTimeInternal = $('.input-time-interval');
		
		// 选择秒 0-59

		// 选择分 0-59
		
		// 选择时 0-23
		
		// 选择日 0-30
		
		// 选择月 0-11 JAN, FEB, MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV and DEC
		
		// 1 and 7 (1 = Sunday) or by using the strings SUN, MON, TUE, WED, THU, FRI and SAT.
		
		if (unitVal != '-1') {
			// 选择时间单位时，显示相应的编辑内容
			$('.time-target-td').removeClass('hidden');
			var $targetDiv = $('.div-temp-content').find($(this).find(':selected').attr('data-target'));
			$('.time-target-td').html($targetDiv[0].outerHTML);
		} else {
			// 没有选择时间单位时，隐藏编辑内容TD
			$('.time-target-td').addClass('hidden');
		}
	});
	
	$('.taskInfo-form').on('change',':checkbox[name="timeWeek"]',function(){
		var weekDays = [];
		$('.week-target :checkbox:checked').each(function(index, ele){
			weekDays.push(ele.value);
		});
		var weekDay = weekDays.join(',');
		if (weekDays.length == 7 || weekDays.length == 0) {
			weekDay = '*';
		}
		var hour = $('.taskInfo-form .input-time-value[name="timeHourValue"]').val();
		var minute = $('.taskInfo-form .input-time-value[name="timeMinuteValue"]').val();
		var second = $('.taskInfo-form .input-time-value[name="timeSecondValue"]').val();
		hour = hour==''?'0':hour;
		minute = minute==''?'0':minute;
		second = second==''?'0':second;
		var expr = [second, minute, hour, '?', '*', weekDay].join(' ');
		$('input[name="timeExpression"]').val(expr);
	});
	
	// 时间编辑输入框输入事件
	$('.taskInfo-form').on('change', '.input-time-value[name!="timeInterval"]', function(){
		var unitVal = $('.select-time-unit').val();
		var expr='';
		switch(unitVal) {
			case unitSecondKey:
			case unitMinuteKey:
			case unitHourKey:
			case unitDayKey:
				var hour = $('.taskInfo-form .input-time-value[name="timeHourValue"]').val();
				var minute = $('.taskInfo-form .input-time-value[name="timeMinuteValue"]').val();
				var second = $('.taskInfo-form .input-time-value[name="timeSecondValue"]').val();
				hour = hour==''?'0':hour;
				minute = minute==''?'0':minute;
				second = second==''?'0':second;
				expr = [second, minute, hour, '*', '*', '?'].join(' ');
				break;
			case unitMonthKey:
				var day = $('.taskInfo-form .input-time-value[name="timeDayValue"]').val();
				var hour = $('.taskInfo-form .input-time-value[name="timeHourValue"]').val();
				var minute = $('.taskInfo-form .input-time-value[name="timeMinuteValue"]').val();
				var second = $('.taskInfo-form .input-time-value[name="timeSecondValue"]').val();
				day = day==''?'0':day;
				hour = hour==''?'0':hour;
				minute = minute==''?'0':minute;
				second = second==''?'0':second;
				expr = [second, minute, hour, day, '*', '?'].join(' ');
				break;
			case unitWeekKey:
				var weekDays = [];
				$('.week-target :checkbox:checked').each(function(index, ele){
					weekDays.push(ele.value);
				});
				var weekDay = weekDays.join(',');
				var hour = $('.taskInfo-form .input-time-value[name="timeHourValue"]').val();
				var minute = $('.taskInfo-form .input-time-value[name="timeMinuteValue"]').val();
				var second = $('.taskInfo-form .input-time-value[name="timeSecondValue"]').val();
				hour = hour==''?'0':hour;
				minute = minute==''?'0':minute;
				second = second==''?'0':second;
				expr = [second, minute, hour, '?', '*', weekDay].join(' ');
				break;
		}
		$('input[name="timeExpression"]').val(expr);
	});
	
	// 绑定保存事件
	$('.btn-save').click(save);
	// 绑定保存并新增事件
	$('.btn-save-add').click(saveAndAdd);
	
	// 获取记录主键，为空则为新增，否则为修改
	var recordId = $.xljUtils.getUrlParam('id');
	
	// 新增属性
	if(recordId == null){
        $(".title-part").text('新增');
        $('title').text('任务信息-新增');
        $(window).data('edit-mode','add');
        $(".taskInfo-form").attr('action',baseUrl + 'univ/task/taskInfo/save');
        $(".taskInfo-form").attr('method','POST');
        
        displaySimpleTask();
		
        initUuid();
    } 
	// 修改属性
	else {
        $(".title-part").text('修改');
        $('title').text('任务信息-修改');
        $(window).data('edit-mode','update');
        $.xljUtils.xljAjax({
        	url:hostUrl + 'univ/task/taskInfo/get/'+recordId + '?random=' + Date.now(),
            type:'GET'
        }, function(data){
        	
        	// == 更新模式 ==
        	
        	// 简单触发器
        	if (data.simpleTrigger == true) {
        		displaySimpleTask();
        	} 
        	// 表达式触发器
        	else {
        		$('.time-target-td').addClass('hidden');
        	}
        	
        	var formItems = $(".taskInfo-form .input-item");
            $.each(formItems, function(index, item) {
				var $item = $(item);
				if ($item.prop('type') != 'radio') {
            		$(item).val(data[item.name]);
				} else {
					if ($item.val() == (data[item.name] + '')) {
						$item.prop('checked','checked');
					}
				}
            });

			// 任务编码、任务类全限定名、任务类型、方法名、是否平台任务不能修改
			formItems.filter('[name="code"],[name="fullyQualifiedName"],[name="methodName"]').prop('readonly','readonly');
			formItems.filter(':radio, select').prop('disabled','disabled');

            
            $(".taskInfo-form").attr('action',baseUrl + 'univ/task/taskInfo/update/'+data['id']);
            $(".taskInfo-form").attr('method','PUT');
        });
       
    }
	
});