/*
 * @(#)JsNameFilter.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通系统
 */
/**
 * @fileoverview 通过输入内容过滤出相应的员工JavaScript.
 *
 * @author wangduo
 * @version 1.0
 */
/**
 * 通过输入内容过滤出相应的员工
 * @param {String}	idInputId 员工编号输入框ID
 * @param {String}	nameInputId 员工姓名输入框ID
 * @param {String}	pathStr action相对路径
 * @param {boolean} notCheckInput 是否验证ID输入
 */
function JsNameFilter(idInputId, nameInputId, pathStr, notCheckInput) {

	pathStr = pathStr.charAt(pathStr.length) == '/' ? pathStr : pathStr + '/';
	
	// ajax请求得到员工编号、姓名、拼音首字母数组
	new Ajax.Request(pathStr + 'common/staffPinyin.action', {
		method: 'get',
		parameters: 'stamp=' + new Date().getTime(),
		onComplete: filterInit
	});
	
	/**
	 * 请求返回后初始化
	 * @param {Object} request 请求
	 */
	function filterInit(request) {
	
		// 如果验证输入
		if (!notCheckInput) {
			// 添加自定义校验
			addCustomCheck(idInputId, getMessage('js.com.warning.0003', '员工编号', '6'), 'idLengthCheck', idLengthCorrect);
			addCustomCheck(idInputId, getMessage('js.com.warning.0004', '员工'), 'personExistCheck', personExist);
		}
		
		// 员工编号数组
		var personIdArray = request.responseJSON.personIdList;
		// 员工姓名数组
		var nameArray = request.responseJSON.personNameList;
		// 员工拼音首字母数组
		var pinyinArray = request.responseJSON.personPinyinList;
		
		// 姓名输入框
		var nameInputContorl = $(nameInputId);
		
		// 员工编号输入控件
		var idInputControl = $(idInputId);
		
		if (idInputControl) {
		
			// 添加keyup事件
			idInputControl.observe('keyup', function(event) {
			
				setNameInputByIdInput();
			});
			
			// 添加失去焦点事件
			idInputControl.observe('blur', function(event) {
			
				nameInputContorl.value = getNameById(idInputControl.value);
				
			});
		}
		
		/**
		 * 通过ID输入框内容设置名字输入框
		 */
		function setNameInputByIdInput() {
		
			if (personExist()) {
				nameInputContorl.value = getNameById(idInputControl.value);
			} else {
				nameInputContorl.value = '';
				
				if (!notCheckInput) {
					if (idInputControl.value.length == 6) {
					
						// 验证ID对应员工是否存在
						checkInput(idInputId);
						fireEvent(idInputControl, 'focus');
					} else {
					
						// 去除输入提示
						removeFieldError(idInputId);
					}
				}
			}
		}
		
		/**
		 * 验证对应输入的员工编号的员工是否存在
		 */
		function personExist() {
			if (idInputControl.value == '') return true;
			if (idInputControl.value.length != 6) return false;
			if (getNameById(idInputControl.value) == '') return false;
			return true;
		}
		
		/**
		 * 验证ID输入长度
		 */
		function idLengthCorrect() {
			if (idInputControl.value != '' && idInputControl.value.length != 6) return false;
			return true;
		}
		
		/**
		 * 通过姓名得到ID
		 * @param {Object} personId 员工编号
		 */
		function getNameById(personId) {
			for (var i = 0; i <= personIdArray.length - 1; i++) {
				if (personId == personIdArray[i]) {
					return nameArray[i];
				}
			}
			return '';
		}
		
		/**
		 * 通过ID得到姓名
		 * @param {Object} personName 员工姓名
		 */
		function getIdByName(personName) {
			for (var i = 0; i <= nameArray.length - 1; i++) {
				if (personName == nameArray[i]) {
					return personIdArray[i];
				}
			}
			return '';
		}
		
		// 传入姓名过滤（员工姓名输入时引起的员工编号值的变化）
		var inputSearch = new Object();
		inputSearch.search = function() {
			idInputControl.value = getIdByName(nameInputContorl.value);
		}
		
		// 获得姓名、拼音首字母过滤功能
		var iFilter = new JsInputFilter(nameInputId, inputSearch);
		
		// 添加过滤资源
		iFilter.setContentArray(nameArray);
		iFilter.setFilterPropertyArray(pinyinArray);
	}
}

