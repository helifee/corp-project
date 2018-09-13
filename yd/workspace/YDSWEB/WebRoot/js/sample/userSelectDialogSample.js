/*
 * @(#)userSelectDialogSample.js
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
	
	//取得显示用的dom元素
	var usersElement = $('users');
	var count = $('number');
	
	//添加新人员
	if(typeof(users) != 'undefined') {
		
		//子页面返回时清空先前人员
		usersElement.innerHTML = '';
		count.innerHTML = 0;
		
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
function userSelect(){
	
	//目标地址
	var sURL = '../common/userSelect.jsp';

	//取得先前人员参数
	var usersPrevious = prepareInitUsers();
	
	/*
		 第一个参数：人员选择页面
		 第一个参数：传给子页面的参数（字符串或对象）
		 第三个参数：子页面的特征，如下：
		   1.dialogHeight: 对话框高度。 
		   2.dialogWidth: 对话框宽度。   
		   3.dialogLeft: 离屏幕左的距离。   
		   4.dialogTop: 离屏幕上的距离。   
		   5.center: {yes|no|1|0}：窗口是否居中，默认yes，但仍可以指定高度和宽度。   
		   6.help: {yes|no|1|0}：是否显示帮助按钮，默认yes。   
		   7.resizable: {yes|no|1|0}［IE5+］：是否可被改变大小。默认no。   
		   8.status: {yes|no|1|0}［IE5+］：是否显示状态栏。默认为yes[    Modeless]或no[Modal]。   
		   9.scroll: {yes|no|1|0|on|off}：指明对话框是否显示滚动条。默认为yes。   			
	*/
	//窗口特征
	var sFeatures = 'dialogWidth:1000px;dialogHeight:620px;center:yes;help:yes;status:no';
	
	//打开子窗口
	var usersSelected = window.showModalDialog(sURL, usersPrevious, sFeatures);
	
	//处理返回的人员
	display(usersSelected);
}
