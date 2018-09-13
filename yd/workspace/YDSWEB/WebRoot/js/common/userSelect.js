/*
 * @(#)userSelect.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通系统
 */

/**
 * @fileOverview 人员选择页面Javascript
 * 
 * @author zhangdaoqiang
 * @version 1.0
 */

/**
 * 人员类
 * @param {String} id
 * @param {String} name
 */
function User(id, name) {
	this.id = id;
	this.name = name;
}

/**
 * 初始化页面
 */
function init() {
	
	//取得父页面人员
	var usersPrevious = window.dialogArguments;
	if(typeof(usersPrevious) == 'undefined') {
		if(window.opener && !window.opener.closed) {
			usersPrevious = window.opener.prepareInitUsers();
		}
	}
	
	//显示已选人员
	var right = $('user_right').options;
	var newOpt;
	if(typeof(usersPrevious) != 'undefined') {
		if(usersPrevious.length != 0) {
			usersPrevious.each(function(item){
				newOpt = new Option(item.name, item.id);
				right.add(newOpt);
			});
		}
	}
}
 
/**
 * 注册页面事件
 */
Event.observe(window, 'load', function() {
	
	//初始化页面
	init();
	
	//右移事件
	$('right').observe('click', moveSelect);
	
	//全部右移事件
	$('right_all').observe('click', moveAll);
	
	//左移事件
	$('left').observe('click', moveSelect);
	
	//全部左移事件
	$('left_all').observe('click', moveAll);
	
	//人员选择事件
	$('choose').observe('click', choose);

	//关闭按钮事件
	$('close').observe('click', closeWindow);
	
	//定位焦点
	$('condition1').focus();
	
});

/**
 * 移动选择的项
 * @param {Event} event
 * @return {Boolean} 是否成功标志
 */
function moveSelect(event) {
	var ret = judgeDirection(event);
	var src = ret[0];
	var dest = ret[1];
	
	for(var i = 0; i < src.options.length; i++){
		if(src.options[i].selected == true){
			var newOpt = new Option(src.options[i].text, src.options[i].value);
			dest.options.add(newOpt);
			//兼容IE、FF
			src.options[i] = null;
			i--;
		}
	}
	return true;
}

/**
 * 移动所有项
 * @param {} event
 * @return {Boolean} 是否成功标志
 */
function moveAll(event) {
	var ret = judgeDirection(event);
	var src = ret[0];
	var dest = ret[1];
	
	var newOpt;
	while(src.options.length > 0) {
		newOpt = new Option(src.options[0].text, src.options[0].value);
		dest.options.add(newOpt);
		//兼容IE、FF
		src.options[0] = null;
	}
	return true;
}

/**
 * 判断移动方向
 * @param {Event} event
 * @return {Array} 源element与目的element组成的数组
 */
function judgeDirection(event) {
	var ret = [];
	var firstLetter = event.element().identify().charAt(0);
	if( firstLetter == 'r') {
		ret.push($('user_left'), $('user_right'));
	} else if(firstLetter == 'l') {
		ret.push($('user_right'), $('user_left'));
	}
	return ret;
}

/**
 * 选择人员
 */
function choose() {
	var users = [];
	var selected = $('user_right').options;
	for(var i = 0; i < selected.length; i++) {
		users.push(new User(selected[i].value, selected[i].text));
	}
	
	//返回值设定
	if(typeof(window.dialogArguments) == 'undefined') {
		if(window.opener && !window.opener.closed) {
			window.opener.display(users);
		} else {
			alert('error!');
		}
	} else {
		window.returnValue = users;
	}
	window.close();
}

/**
 * 关闭窗口
 */
function closeWindow() {
	var answer = confirm('您确定关闭窗口吗？');
	if(answer) {
		window.close();	
	}
}
