(function() {
	if (window['formvalidationcheck']) {
		return;
	} else {
		window['formvalidationcheck'] = 1;
	}
	/**
	 * 初始化form校验.
	 * @param {Object} form form对象或ID.
	 */
	var initValidation = function(form) {
		createTip('vtip');
		if ($(form).readAttribute('init') == 'pass') return;
		var errors = $(form).down('.errorMessage');
		var kname = $(form).name;
		var pname = kname + '_error';
		if (!errors) {
			errors = $$('.errorMessage');
			if (errors && errors.length > 0) {
				errors = errors[0];
			} else {
				errors = null;
			}
			kname = '_global';
			pname = '_global_error';
		}
		if (errors && !window[pname]) {
			var cont = errors.up();
			errors.insert({
				bottom: new Element('div').update('确定').addClassName('imgBtn1 float_r').observe('click', function() {
					window[pname].Close();
				})
			});
			window[pname] = new PopupBox({
				key: kname,
				title: '错误',
				icon: '',
				content: errors,
				position: 3,
				drag: true
			});
			errors = errors.select('span');
			var contents = [];
			for (var i = 0, len = errors.length; i < len; i++) {
				var name = errors[i].id.split('_')[1];
				if (contents.indexOf(errors[i].innerHTML) == -1) {
					contents.push(errors[i].innerHTML);
					$(errors[i]).addClassName('cur_pointer');
					$(errors[i]).observe('click', function(event) {
						var e = Event.element(event);
						var nm = e.id.split('_')[1];
						window[pname].Close();
						if (kname != '_global' && $(form)[nm]) {
							if ($(form)[nm].focus) {
								$(form)[nm].activate();
								$(form)[nm].blur();
								$(form)[nm].activate();
							} else $($(form)[nm][0]).activate();
						}
					});
					
					var emt = kname != '_global' ? $($(form)[name]) : null;
					if (Object.isElement(emt)) {
						if (!emt.readAttribute('err') || emt.readAttribute('e_js')) {
							var err = emt.readAttribute('errMsg');
							if (err) err = err + '<br/>';
							else err = '';
							err = err + errors[i].innerHTML;
							emt.writeAttribute({
								'err': '1',
								'e_js': '1',
								'errmsg': err
							});
						}
					} else if (emt) {
						if (!$(emt[0]).readAttribute('err') || $(emt[0]).readAttribute('e_js')) {
							var err = $(emt[0]).readAttribute('errMsg');
							if (err) err = err + '<br/>';
							else err = '';
							err = err + errors[i].innerHTML;
							for (var j = 0; j < emt.length; j++) {
								$(emt[j]).writeAttribute({
									'err': '1',
									'e_js': '1',
									'errmsg': err
								});
							}
						}
					}
				} else {
					$(errors[i]).up().hide();
				}
			}
			window[pname].popup();
			cont.update('输入有误！ ').insert({
				bottom: new Element('a', {
					'href': '#this'
				}).update('[详细]').observe('click', function() {
					window[pname].popup();
				})
			}).addClassName('errorContainer').removeClassName('none');
		}
		var matchs = getMatch(form);
		var validate = window[$(form).id + '_validation'];
		for (var i = 0; i < matchs.length; i++) {
			if (matchs[i].name) {
				matchs[i].fcheck = true;
				matchs[i].observe('focus', onfucusEvent);
				matchs[i].observe('blur', onlosefocusEvent);
				if (matchs[i].readAttribute('err') == '1') {
					matchs[i].addClassName('errorInput');
				}
			}
		}
		$(form).observe('submit', onsubmit);
		$(form).observe('reset', onreset);
		$(form).writeAttribute({
			'init': 'pass'
		});
	}, /**
	 * 取得焦点事件.
	 * @param {Object} event 事件对象.
	 */
	onfucusEvent = function(event) {
				
		var element = Event.element(event);
		// 金钱控件显示为全选中
		if ($(element).readAttribute('tagtype') == 'money' && $(element).value != '') {
			$(element).activate();
		}

		createTip('vtip');
		if (element.readAttribute('err') == '1') {
			$('vtip_text').update(element.readAttribute('errMsg'));
			$('vtip').className = 'float_l position_abs tip_box_err';
		} else {
			$('vtip_text').update(element.readAttribute('tooltip'));
			$('vtip').className = 'float_l position_abs tip_box_msg';
		}
		if (element.up('.overflow_scr_y')) {
			element.up('.overflow_scr_y').down().addClassName('position_rel');
		} else {
			Element.addClassName(document.body, 'position_rel');
		}
		element.getOffsetParent().insert({
			bottom: $('vtip')
		});
		var offset = element.positionedOffset();
		if ($('vtip_text').innerHTML.length > 0) {
			$('vtip').show();
			$('vtip').setStyle({
				top: offset.top - $('vtip').getHeight() + 1 + 'px',
				left: offset.left + 'px'
			});
			if (ie6) $('vtip_mask').setStyle({
				width: $('vtip').getWidth() + 'px',
				height: $('vtip').getHeight() + 'px'
			});
		}
	}, /**
	 * 失去焦点事件.
	 * @param {Object} event 事件对象.
	 */
	onlosefocusEvent = function(event) {
		var element = Event.element(event);
		createTip('vtip');
		$('vtip').hide();
		
		// 检验正确时，执行格式转换函数
		if(checkInput(element)){
			convertType(element);
		}
		
	}, /**
	 * 提交表单事件.
	 * @param {Object} event 事件对象.
	 */
	onsubmit = function(event) {
		var form = Event.element(event);
		var result = checkForm(form);
		if (!result) Event.stop(event);
		return result;
	}, /**
	 * 重置表单事件.
	 * @param {Object} event  事件对象.
	 */
	onreset = function(event) {
		clearError(Event.element(event));
	}, /**
	 * 单独输入框注册校验框架.
	 * @param {Object} element 输入框对象或ID.
	 */
	registValidate = function(element) {
		createTip('vtip');
		$(element).observe('focus', onfucusEvent);
		$(element).observe('blur', onlosefocusEvent);
		if ($(element).readAttribute('err') == '1') {
			$(element).addClassName('errorInput');
		}
		$(element).fcheck = true;
	}, 
	
	/**
	 * 转换输入格式.
	 * @param {Object} element 输入框对象或ID.
	 */
	convertType = function(element) {
		if ($(element).readAttribute('tagtype') == 'money') {
			$(element).value = convertMoney($(element).value);
		}
	},

	/**
	 * 校验输入框.
	 * @param {Object} element 输入框对象或ID.
	 * @return {bool} 校验结果(true:正确).
	 */
	checkInput = function(element) {
		var form, checkArr, checkTypes, checking, errFlag, errMsg, elements;
		element = $(element);
		form = Element.up(element, 'form');
		if (form) {
			if (window[form.name + '_validation']) {
				checkArr = window[form.name + '_validation'][element.name];
			}
		} else if (window['body_validation']) {
			checkArr = body_validation[element.name];
		}
		errFlag = false;
		if (checkArr) {
			checkTypes = Object.keys(checkArr);
			for (var i = 0, len = checkTypes.length; i < len; i++) {
				checking = checkArr[checkTypes[i]];
				if (!checking) continue;
				if (errFlag && !(checking.param && checking.param.shortCircuit)) break;
				if (checkTypes[i] == 'required') {
					if (element.value.empty()) {
						errMsg = checking.message;
						errFlag = true;
					}
				} else if (checkTypes[i] == 'requiredstring') {
					if (checking && checking.param.trim == 'true') {
						element.value = element.value.strip();
					}
					if (element.value.empty()) {
						errMsg = checking.message;
						errFlag = true;
					}
				} else if (checkTypes[i] == 'stringlength') {
					if (!element.value.empty()) {
						if ((checking.param.minLength && element.value.length < checking.param.minLength) || (checking.param.maxLength && element.value.length > checking.param.maxLength)) {
							errMsg = checking.message;
							errFlag = true;
						}
					}
				} else if (checkTypes[i] == 'regex') {
					if (!element.value.empty()) {
						var regex = new RegExp(checking.param.expression);
						if (!element.value.match(regex)) {
							errMsg = checking.message;
							errFlag = true;
						}
					}
				} else if (checkTypes[i] == 'int') {
					if (!element.value.empty()) {
						if ((checking.param.min && element.value - 0 < checking.param.min) || (checking.param.max && element.value - 0 > checking.param.max)) {
							errMsg = checking.message;
							errFlag = true;
						}
					}
				} else if (checkTypes[i] == 'email') {
					if (!element.value.empty()) {
						var regex = new RegExp('\\b(^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\\.[A-Za-z0-9-]+)*((\\.[A-Za-z0-9]{2,})|(\\.[A-Za-z0-9]{2,}\\.[A-Za-z0-9]{2,}))$)\\b', 'ig');
						if (!regex.test(element.value)) {
							errMsg = checking.message;
							errFlag = true;
						}
					}
				} else if (checkTypes[i] == 'url') {
					if (!element.value.empty()) {
						var regex = new RegExp('(^(ftp|http|https):\\/\\/(\\.[_A-Za-z0-9-]+)*(@?([A-Za-z0-9-])+)?(\\.[A-Za-z0-9-]+)*((\\.[A-Za-z0-9]{2,})|(\\.[A-Za-z0-9]{2,}\\.[A-Za-z0-9]{2,}))(:[0-9]+)?([/A-Za-z0-9?#_-]*)?$)', 'ig');
						if (!regex.test(element.value)) {
							errMsg = checking.message;
							errFlag = true;
						}
					}
				} else if (checkTypes[i] == 'date') {
					if (!element.value.empty()) {
						var dtmp = element.value.split('-');
						var i_day, f_day, t_day;
						if (dtmp.length != 3) {
							errMsg = checking.message;
							errFlag = true;
						} else {
							i_day = new Date(parseInt(dtmp[0], 10), parseInt(dtmp[1], 10) - 1, parseInt(dtmp[2], 10));
							if (checking.param.min) {
								dtmp = checking.param.min.split('-');
								if (dtmp.length == 3) f_day = new Date(parseInt(dtmp[0], 10), parseInt(dtmp[1], 10) - 1, parseInt(dtmp[2], 10));
							}
							if (checking.param.max) {
								dtmp = checking.param.max.split('-');
								if (dtmp.length == 3) t_day = new Date(parseInt(dtmp[0], 10), parseInt(dtmp[1], 10) - 1, parseInt(dtmp[2], 10));
							}
							if ((f_day && i_day < f_day) || (t_day && i_day > t_day)) {
								errMsg = checking.message;
								errFlag = true;
							}
						}
					}
				} else if (checkTypes[i] == 'double') {
					if (!element.value.empty()) {
						
						// 追加的校验
						var value0 = element.value.replace(',', '');
						var regex = new RegExp('^[+-]?[0-9]+(\.?[0-9]+)?$');
						if (!regex.test(value0)) {
							errMsg = getMessage('js.com.warning.0002');
							errFlag = true;
						}else{
							
							// 原来生成的校验
							var value = parseFloat(value0);							
							if ((checking.param.minInclusive && value < checking.param.minInclusive) ||
							(checking.param.maxInclusive && value > checking.param.maxInclusive) ||
							(checking.param.minExclusive && value <= checking.param.minExclusive) ||
							(checking.param.maxExclusive && value >= checking.param.maxExclusive)) {
								errMsg = checking.message;
								errFlag = true;
							}
						}
					}
				} else if (checking.param && checking.param.callBack && (!checking.param.notauto || checkInput.caller != onlosefocusEvent)) {
					if (!checking.param.callBack(element.value, element, form)) {
						errMsg = checking.message;
						errFlag = true;
					}
				}
			}
		}
		elements = $NN(element.name) || [];
		for (var j = 0; j < elements.length; j++) {
			if ((element.up('form') == null) != ($(elements[j]).up('form') == null)) continue;
			if (element.up('form') && $(elements[j]).up('form') && element.up('form').name != $(elements[j]).up('form').name) continue;
			
			if (errFlag) {
				$(elements[j]).writeAttribute({
					'err': '1',
					'errMsg': errMsg
				}).addClassName('errorInput');
			} else {
				$(elements[j]).writeAttribute({
					'err': '0'
				}).removeClassName('errorInput');
			}
		}
		
		return !errFlag;
	};
	window.initValidation = initValidation;
	window.registValidate = registValidate;
	window.checkInput = checkInput;
})();

/**
 * 添加指定错误信息.
 * @param {Object} element 输入框对象或ID.
 * @param {String} message 错误信息.
 */
function addFieldError(element, message) {
	if (!$(element).fcheck) {
		registValidate(element);
	}
	$(element).writeAttribute({
		'err': '1',
		'errMsg': message
	});
	$(element).addClassName('errorInput');
}

/**
 * 删除错误信息.
 * @param {Object} element 输入框对象或ID.
 */
function removeFieldError(element) {
	$(element).writeAttribute({
		'err': '0'
	});
	$(element).removeClassName('errorInput');
	try {
		var evt = getEvent();
		if (evt && Event.element(evt).name && Event.element(evt).name == $(element).name) {
			$('vtip').hide();
		}
	} 
	catch (err) {
		// donothing
	}
}

/**
 * 清除全部错误信息.
 * @param {Object} form  form对象或ID.
 */
function clearError(form) {
	var errors = Element.select($(form), '[err="1"]');
	for (var i = 0; i < errors.length; i++) {
		errors[i].writeAttribute({
			'err': '0'
		});
		errors[i].removeClassName('errorInput');
	}
	errors = $(form).down('.errorMessage');
	if (errors) errors.hide();
}

/**
 * 添加校验(非空).
 * @param {Object} element 输入框对象或ID.
 * @param {String} message 错误信息.
 * @param {Object} trim 移除两侧空格.
 */
function addRequiredCheck(element, message, trim) {
	var oParam;
	oParam = {};
	if (trim) oParam['trim'] = 'true';
	addInputCheck(element, 'requiredstring', message, oParam);
}

/**
 * 添加校验(正则).
 * @param {Object} element 输入框对象或ID.
 * @param {String} message 错误信息.
 * @param {Object} expression 表达式.
 */
function addRegexCheck(element, message, expression) {
	var oParam;
	oParam = {};
	oParam['expression'] = expression;
	addInputCheck(element, 'regex', message, oParam);
}

/**
 * 添加校验(长度).
 * @param {Object} element 输入框对象或ID.
 * @param {String} message 错误信息.
 * @param {Object} min 最小值.
 * @param {Object} max 最大值.
 */
function addLengthCheck(element, message, min, max) {
	var oParam;
	oParam = {};
	if (min != null) oParam['minLength'] = min;
	if (max != null) oParam['maxLength'] = max;
	addInputCheck(element, 'stringlength', message, oParam);
}

/**
 * 添加校验(INT).
 * @param {Object} element 输入框对象或ID.
 * @param {String} message 错误信息.
 * @param {Object} min 最小值.
 * @param {Object} max 最大值.
 */
function addIntCheck(element, message, min, max) {
	var oParam;
	oParam = {};
	if (min != null) oParam['min'] = min;
	if (max != null) oParam['max'] = max;
	addInputCheck(element, 'int', message, oParam);
}

/**
 * 添加校验(DOUBLE).
 * @param {Object} element 输入框对象或ID.
 * @param {String} message 错误信息.
 * @param {Object} min 最小值.
 * @param {Object} max 最大值.
 */
function addDoubleCheck(element, message, min, max) {
	var oParam;
	oParam = {};
	if (min != null) oParam['minInclusive'] = min;
	if (max != null) oParam['maxInclusive'] = max;
	addInputCheck(element, 'double', message, oParam);
}

/**
 * 添加校验(EMAIL).
 * @param {Object} element 输入框对象或ID.
 * @param {String} message 错误信息.
 */
function addEmailCheck(element, message) {
	var oParam;
	oParam = {};
	addInputCheck(element, 'email', message, oParam);
}

/**
 * 添加校验(URL).
 * @param {Object} element 输入框对象或ID.
 * @param {String} message 错误信息.
 */
function addUrlCheck(element, message) {
	var oParam;
	oParam = {};
	addInputCheck(element, 'url', message, oParam);
}

/**
 * 添加校验(日期).
 * @param {Object} element 输入框对象或ID.
 * @param {String} message 错误信息.
 * @param {Object} min 最小值.
 * @param {Object} max 最大值.
 */
function addDateCheck(element, message, min, max) {
	var oParam;
	oParam = {};
	if (min != null) oParam['min'] = min;
	if (max != null) oParam['max'] = max;
	addInputCheck(element, 'date', message, oParam);
}

/**
 * 添加自定义校验.
 * @param {Object} element 输入框对象或ID.
 * @param {String} message 错误信息.
 * @param {String} type 校验类型.
 * @param {Function} callBack 校验方法.
 * @param {bool} notAuto 失去焦点时不自动校验.
 */
function addCustomCheck(element, message, type, callBack, notAuto) {
	var oParam;
	oParam = {};
	if (notAuto) oParam.notauto = true;
	oParam.callBack = callBack;
	addInputCheck(element, type, message, oParam);
}

/**
 * 添加校验(通用).
 * @param {Object} element 输入框对象或ID.
 * @param {String} type 校验类型.
 * @param {String} message 错误信息.
 * @param {Object} param 参数.
 */
function addInputCheck(element, type, message, param) {
	var validate, form, oValid, oCheck;
	element = $(element);
	if (!element.fcheck) {
		registValidate(element);
	}
	form = element.up('form');
	if (form) {
		if (!window[form.name + '_validation']) {
			window[form.name + '_validation'] = {};
		}
		validate = window[form.name + '_validation'];
	} else {
		if (!window['body_validation']) {
			window.body_validation = {};
		}
		validate = body_validation;
	}
	if (!validate[element.name]) {
		validate[element.name] = {};
	}
	oValid = validate[element.name];
	if (!oValid[type]) {
		oValid[type] = {};
	}
	oCheck = oValid[type];
	oCheck['message'] = message;
	oCheck['param'] = param;
}

/**
 * 删除指定校验.
 * @param {Object} element 输入框对象或ID.
 * @param {Object} type 校验类型(*删除全部).
 */
function removeCheck(element, type) {
	var validate, form, oValid, oCheck;
	element = $(element);
	form = element.up('form');
	if (form) {
		if (!window[form.name + '_validation']) {
			return;
		}
		validate = window[form.name + '_validation'];
	} else {
		if (!window['body_validation']) {
			return;
		}
		validate = body_validation;
	}
	if (!validate[element.name]) {
		return;
	}
	if (type == '*') {
		validate[element.name] = null;
		return;
	}
	oValid = validate[element.name];
	if (!oValid[type]) {
		return;
	}
	oValid[type] = null;
}

/**
 * 手动执行表单校验.
 * @param {Object} form 要校验的表单.
 * @return {bool} 校验结果.
 */
function checkForm(form) {
	var matchs = getMatch(form);
	var validate = window[$(form).name + '_validation'];
	var errFlg = false;
	for (var i = 0; i < matchs.length; i++) {
		if (matchs[i].name && !checkInput(matchs[i]) && !errFlg) {
			matchs[i].activate();
			matchs[i].blur();
			matchs[i].activate();
			errFlg = true;
		}
	}
	return !errFlg;
}

/**
 * 取得需要绑定的元素.
 * @param {Object} form 表单.
 * @return {Array} 元素数组.
 */
function getMatch(form) {
	var elements = $(form).descendants();
	var matches = [];
	var select = ['input', 'select', 'textarea'];
	for (var i = 0, len = elements.length; i < len; i++) {
		if (select.indexOf(elements[i].tagName.toLowerCase()) != -1) {
			matches.push(elements[i]);
		}
	}
	return matches;
}

/**
 * 根据属性绑定校验事件.
 */
function propertyValidation() {
	var inputs = $$('[regular]');
	for (var i = 0, len = inputs.length; i < len; i++) {
		if (inputs[i].readAttribute('notnull') == '1') {
			addRequiredCheck(inputs[i], $(inputs[i]).readAttribute('errormessage'), true);
		}
		addRegexCheck(inputs[i], $(inputs[i]).readAttribute('errormessage'), $(inputs[i]).readAttribute('regular'));
	}
}
