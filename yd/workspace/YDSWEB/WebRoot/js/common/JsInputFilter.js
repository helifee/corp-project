/*
 * @(#)JsInputFilter.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通系统
 */

/**
 * @fileoverview 输入框输入过滤提示JavaScript.
 * 
 * @author wangduo
 * @version 1.0
 */

/**
 * 通过输入值过滤出符合条件的选项
 * @param contentInputId 输入控件ID
 * @param iSearch 向控件输入值引起外部控件变化时使用
 * @param focusShowFlag 获得焦点时是否显示提示
 */
function JsInputFilter(contentInputId,iSearch,focusShowFlag) {

	// 储存所有待筛选内容
	var contentAll = new Array();
	// 筛选所用资源（拼音）
	var filterProperty = null;
	// 储存筛选后显示的内容
	var contentShow = null;
	// 筛选后是否有内容标记
	var hasContent = false;
	// 当前选中的第几个元素
	var selectedCount = 0;
	// keyDown,keyUp时输入框中的值
	var lastValue = '';
	// 用户输入的值
	var inputValue = '';
	// 判断鼠标是否在筛选内容的容器上
	var onDivc = false;
			
	// 输入框
	var contentInputContorl = $(contentInputId);

	// 输入框绑定事件
	contentInputContorl.observe('keydown', function(event) {
		doKeyDown(event);
	});
	
	contentInputContorl.observe('keyup', function(event) {
		doKeyUp(event);
	});
	
	contentInputContorl.observe('blur', function(event) {
		if (!onDivc) {
			// 设置用户输入的值
			inputValue = contentInputContorl.value;
			divc.hide();
			divc.innerHTML = '';
		}
		if (contentInputContorl.value != '') {
			contentChangeDo();
		}
		
	});
	
	contentInputContorl.observe('focus', function(event) {
		if (focusShowFlag && contentInputContorl.value == '') {
			divcDisplay();
		}
	});

	// 创建显示筛选内容的容器
	var divc = document.createElement('DIV');
	Element.extend(divc);
	// 设置荣容器样式
	divc.className = 'tip_container';
	divc.hide();
	document.body.appendChild(divc);
	
	divc.observe('mouseover', function(event) {
		onDivc = true;
	});
	divc.observe('mouseout', function(event) {
		selectedCount = -1;
		onDivc = false;
	});
	
	/**
	 * 得到KeyCode
	 * @param {Object} event 事件
	 */
	function getKeyCode(event) {
		return event.keyCode ? event.keyCode : event.which;
	}

	/**
	 * 鼠标移入内容时的样式
	 * @param {Object} div 提示内容
	 */
	function contentSelectedStyle(div) {
		if (div) div.className ='tip_selected';

	}
	
	/**
	 * 鼠标移出内容时的样式
	 * @param {Object} div 提示内容
	 */
	function contentNormalStyle(div) {
		if (div) div.className ='tip_normal';
	}

	/**
	 * 添加筛选后显示内容
	 * @param {Object} content 筛选出的内容
	 * @param {Object} index 内容的数组下标
	 */
	function appendItemShow(content,index) {

		var div = document.createElement('DIV');
		Element.extend(div);
		div.myIndex = index;
		// 给待筛选内容绑定事件
		div.observe('mouseover', function() {
			contentNormalStyle(divc.childElements()[0]);
			contentNormalStyle(divc.childElements()[selectedCount]);
			selectedCount = div.myIndex;
			contentSelectedStyle(div);
		});
		div.observe('mouseout', function() {
			contentNormalStyle(divc.childElements()[selectedCount]);
		});
		div.observe('click', function() {
			contentInputContorl.value = content;
			// 设置用户输入的值
			inputValue = contentInputContorl.value;
			divc.hide();
			onDivc = false;
			contentChangeDo();
			divc.innerHTML = '';
			contentInputContorl.focus();
		});
		
		var re = new RegExp('(' + contentInputContorl.value + ')', 'i');
		div.innerHTML = content.replace(re, '<span class="tip_blod">$1</span>');
		contentNormalStyle(div);
		
		divc.appendChild(div);
	}
	
	/**
	 * 控制下拉框的内容显示
	 */
	function divcDisplay() {
		
		contentShow = new Array();
		hasContent = false;
	
		divc.innerHTML = '';
		
		// 筛选出符合条件的内容
		doFilter();
		contentChangeDo();
		contentShow.sort();
		
		// 向筛选容器添加内容
		for (var i = 0; i <= contentShow.length - 1; i++) {
			appendItemShow(contentShow[i],i);
			hasContent = true;
		}

		// 显示下拉框
		if (hasContent && (contentInputContorl.value != '' || focusShowFlag)) {

			// 设置下拉框的位置及宽度、高度
			var realPos = contentInputContorl.cumulativeOffset();
			var scrollPos = contentInputContorl.cumulativeScrollOffset();
	
			divc.setStyle({
				left: realPos.left - scrollPos.left + getWindowScrollLeft() + 'px',
				top: realPos.top - scrollPos.top + getWindowScrollTop() + contentInputContorl.getHeight() + 'px',
				width: contentInputContorl.getWidth() - 2 + 'px'
			});

			selectedCount = 0;
			contentSelectedStyle(divc.childElements()[selectedCount]);
			divc.show();
		} else {
			divc.hide();
		}
	}
		
	/**
	 * 输入框输入事件
	 * @param {Object} event 事件
	 */
	function doKeyUp(event) {

		var keyCode = getKeyCode(event);
		
		// 屏蔽功能键
		if (keyCode == 9 || (keyCode >= 17 && keyCode <= 20) || keyCode == 27 || (keyCode >= 33 && keyCode <= 37) 
			 || keyCode == 39 || (keyCode >= 41 && keyCode <= 45 ) || keyCode == 47 || (keyCode >= 112 && keyCode <= 186)) return;
		
		// 筛选容器不显示时，上、下键可用
		if (divc.style.display != 'none' && (keyCode == 38 || keyCode == 40)) return;

		// Enter、Shift、Space键松开时，值没有发生变化，不响应
		if (keyCode == 13 || keyCode == 16 || keyCode == 32 || keyCode == 108) {
			if (lastValue == contentInputContorl.value) return;
		}
		
		// 显示下拉框
		divcDisplay();

		// 设置对比值
		lastValue = contentInputContorl.value;
		// 设置用户输入的值
		inputValue = contentInputContorl.value;
	}
	
	/**
	 * 触发的按上、下、回车的键盘事件
	 * @param {Object} event 事件
	 */
	function doKeyDown(event) {

		if (!hasContent) return;
		var keyCode = getKeyCode(event);
		
		var childArray = divc.childElements();
		var cLength = childArray.length;
		
		// Down键
		if (keyCode == 40) {
			contentNormalStyle(childArray[selectedCount]);
			selectedCount = (selectedCount >= cLength - 1) ? -1 : (selectedCount + 1);
			contentSelectedStyle(childArray[selectedCount]);
		// Up键
		} else if (keyCode == 38) { 
			contentNormalStyle(childArray[selectedCount]);
			selectedCount = selectedCount <= -1 ? (childArray.length - 1) : (selectedCount - 1);
			contentSelectedStyle(childArray[selectedCount]);
		// Enter键
		} else if (keyCode == 13 || keyCode == 108) {
			contentInputContorl.value = contentShow[selectedCount] ? contentShow[selectedCount] : inputValue;
			// 设置用户输入的值
			inputValue = contentInputContorl.value;
			contentChangeDo();
			divc.hide();
			onDivc = false;
			divc.innerHTML = '';
		}
		
		if (keyCode == 40 || keyCode == 38) {
			contentInputContorl.value = contentShow[selectedCount] ? contentShow[selectedCount] : inputValue;
			contentChangeDo();
		}
		
		// 设置对比值
		lastValue = contentInputContorl.value;
	}
	
	/**
	 * 筛选出符合条件的内容
	 */
	function doFilter() {
		
		var iValue = contentInputContorl.value;
		if (iValue == '' && !focusShowFlag) return;
		
		var reg;
		// 如果输入的都为字母且存在筛选资源（拼音）
		if (new RegExp('^[A-Za-z]+$').test(iValue) && filterProperty) {			
			// 拼接正则表达式
			var testStr = '';
			if (iValue.length > 0) testStr += '^'+iValue.charAt(0);
			for (var i = 1; i <= iValue.length - 1; i++) {
				testStr += iValue.charAt(i);
			}
			testStr += '[a-zA-z]*';
			reg = new RegExp(testStr, 'i');
			
			// 向显示内容数组添加符合条件的内容
			for (var i = 0; i < filterProperty.length; i++) {
				if (reg.test(filterProperty[i])) {
					contentShow.push(contentAll[i]);
				}
			}
		} else {
			
			try{
				reg = new RegExp('^' + iValue, 'i');
			}catch(err){
				return;
			}
			
			// 循环筛选符合条件的内容
			for (var i = 0; i < contentAll.length; i++) {
				if (iValue == '') {
					contentShow.push(contentAll[i]);
				} else if (reg.test(contentAll[i])) {
					contentShow.push(contentAll[i]);
				}
			}
		}
	}
	
	/**
	 * 输入框值变化处理（检索员工号）
	 */
	function contentChangeDo() {
		if (iSearch) iSearch.search();
	}
	
	// 添加待筛选内容数组
	this.setContentArray = function(cArray) {
		contentAll = cArray;

	}
	
	// 添加筛选所用资源（拼音）
	this.setFilterPropertyArray = function(fArray) {
		filterProperty = fArray;	
	}
	
	this.flush = function() {
		doFilter();
	}
}
