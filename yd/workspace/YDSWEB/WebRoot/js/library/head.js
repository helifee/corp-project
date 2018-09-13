/*
 * @(#)index.js
 * Copyright (c) 2010-2011 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东工会图书管理
 *    SubSystem: 
 */
/**
 * @fileoverview 画面标题JavaScript.
 *
 * @author zhanghaibo
 * @version 1.0
 */
var i=0;
var j=0;
var delay=500;
var timeoutId;
/**
 * 初期化
 */
function initHead(title,returnDisplay,logoutDisplay){
	$('head_title').innerText = title;
	
	if (!returnDisplay){
		$('head_return').hide();
		$('head_logout').addClassName('span-4');
	}
	if (!logoutDisplay){
		$('head_logout').hide();
		$('head_return').addClassName('span-4');
	}
	
	cursor();
	
}

/**
* 打字前的光标跳动
*/
function cursor(){
	
	var text = $('user_info').value;
	
	if (text.empty()){
		return;
	}

	if (j > 2){
		delay = 60;
		scrollit();
		return;
	}
	if (j % 2 == 0){
		$('cur').setStyle({'background': '#FFFFFF'});
	} else {
		$('cur').setStyle({'background': '#000000'});
	}
	j++;
	setTimeout("cursor()",delay);
}

/**
* 打字效果
*/
function scrollit(){ 
	var text = $('user_info').value;
	
	if (text.empty()){
		return;
	}
	
	$('head_info').innerText = text.slice(0,i++);
	
	if ($('head_info').innerText == text){
		$('head_info2').innerText = $('head_info').innerText;
		$('head_info').hide();
		$('cur').setStyle({'background': '#000000'});
	}
	timeoutId = setTimeout("scrollit()",delay);
} 


function hideUserInfo(){
	$('head_message').addClassName('none');
}

function showUserInfo(){
	
}

function fillReserve(text,url,no){
	$('head_reserve' + no).innerHTML = "<a href='"+url+"' onfocus='this.blur()'><u>"+text+"</u></a>";
}

function setUserInfo(userInfo){
	$('user_info').value = userInfo;
	
	cursor();
}

function showOpTip(msg,topPercent,leftPercent) {
	if (!$('operateTip') || $('operateTip').value == '' && !Object.isString(msg)) return;
	if (!$('opTipBox')) {
		Element.insert(document.body, {
			bottom: new Element('div', {
				'style': 'position:absolute;top:'+topPercent+'%;left:'+leftPercent+'%;padding:5px 5px;',
				'id': 'opTipBox'
			}).addClassName('ydb_opTip')
		});
		Element.insert($('opTipBox'), {
			bottom: new Element('div', {
				'style': 'padding:0px 15px;',
				'id': 'opTipBoxIn'
			}).addClassName('ydb_opTipIn ydb_font_weight_b')
		});
		
	}
	if (!Object.isString(msg)) {
		$('opTipBoxIn').update($('operateTip').value).show();
		$('operateTip').value = '';
	} else {
		$('opTipBoxIn').update(msg).show();
	}
	$('opTipBox').show();
	Element.hide.delay(3, 'opTipBox');
}
