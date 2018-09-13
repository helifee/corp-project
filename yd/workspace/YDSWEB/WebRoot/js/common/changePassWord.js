/*
 * @(#)changePassWord.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: sample
 */
/**
 * change pass word js
 *
 * @author yuanjinling
 * @version 1.0 2010/05/13
 */
function initReset() {
	new JsNameFilter("userId", "nameInput", window['g_basePath']);
	
	if ($("successM").value != '') {
		MsgBox.message('重置密码成功');
	}
	
	$("successM").value = '';
	addCustomCheck('reNewPW', getMessage('js.com.warning.0012'), 'mustsame', function(value) {
		if (value != $F('newPW')) return false;
		return true;
	});
}

function initModify() {

	if ($("successM").value != '') {
		MsgBox.message('修改密码成功');
	}
	
	$("successM").value = '';
	addCustomCheck('reNewPW', getMessage('js.com.warning.0012'), 'mustsame', function(value) {
		if (value != $F('newPW')) return false;
		return true;
	});
}

function resetSubmit() {
	if (checkForm('mainForm')) {
		$("mainForm").submit();
	}
}

function modifySubmit() {
	if (checkForm('mainForm')) {
		$("mainForm").submit();
	}
}

function chkpwd(obj){
	var t=obj.value;
	var id=getResult(t);
	
	//定义对应的消息提示
	var msg=new Array(4);
	msg[0]="密码过短。";
	msg[1]="密码强度差。";
	msg[2]="密码强度良好。";
	msg[3]="密码强度高。";
	
	var sty=new Array(4);
	sty[0]=-45;
	sty[1]=-30;
	sty[2]=-15;
	sty[3]=0;
	
	var col=new Array(4);
	col[0]="gray";
	col[1]="red";
	col[2]="#ff6600";
	col[3]="Green";
	
	//设置显示效果
	var bImg = window['g_basePath'] + "images/chkpwd.gif";//一张显示用的图片
	var sWidth = 300;
	var sHeight = 15;
	var Bobj = $("chkResult");

	Bobj.style.fontSize="12px";
	Bobj.style.color=col[id];
	Bobj.style.width=sWidth + "px";
	Bobj.style.height=sHeight + "px";
	Bobj.style.lineHeight=sHeight + "px";
	Bobj.style.background="url(" + bImg + ") no-repeat left " + sty[id] + "px";
	Bobj.style.textIndent="20px";
	Bobj.innerHTML="提示：" + msg[id];
}
	
	//定义检测函数,返回0/1/2/3分别代表无效/差/一般/强

function getResult(s) {
	if (s.length < 4) {
		return 0;
	}
	var ls = 0;
	if (s.match(/[a-z]/ig)) {
		ls++;
	}
	if (s.match(/[0-9]/ig)) {
		ls++;
	}
	if (s.match(/(.[^a-z0-9])/ig)) {
		ls++;
	}
	if (s.length <= 6 && ls > 0) {
		ls--;
	}
	return ls
}


