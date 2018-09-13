/*
 * @(#)userSelectOpenSample.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通系统
 */

/**
 * @fileOverview 人员选择Sample页面js
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
 * 取得父页面初始人员数组
 * @return 初始人员数组
 */
function prepareInitUsers() {
	var usersPrevious = [];
	var usersLI = $('users').childElements();
	usersLI.each(function(item){
		usersPrevious.push(new User(item.id, item.innerHTML));
	});
	return usersPrevious;
}

/**
 * 显示选择的人员
 */
function display(users) {
	var usersElement = $('users');
	var count = $('number');
	
	//子页面返回时清空先前人员
	usersElement.innerHTML = '';
	count.innerHTML = 0;
	
	//添加新人员
	if(typeof(users) != 'undefined') {
		var len = users.length;
		if(len != 0) {

			for(var i = 0; i < len; i++) {
				var user = new Element('li', {'id':users[i].id}).update(users[i].name);
				Element.insert(usersElement, user);
			}
	
			count.update(len);
		}
	}
}

/**
 * 选择人员
 */
function userSelect() {
	
	//随机生成页面
	var iRand = Math.round(Math.random()*1000000);
	//var sURL = '../common/userSelect.jsp?id=' + iRand.toString();
	var sURL = '../employee/yb9010Init.action?mode=3';
	var sHandle = iRand.toString();
	
	//计算left,top,居中定位
	var width = 640;
	var height = 450;
	var left = (screen.availWidth - width) * 0.5;
	var top = (screen.availHeight - height) * 0.5;
	var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top + 'px, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no';

	//打开子窗口
	var oWin;
	try {
		oWin = window.open(sURL, sHandle, sFeatures);
	} catch(e) {
		alert('error');
	}
}
