/*
 * @(#)bookreturn.js
 * Copyright (c) 2010-2011 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东工会图书管理
 *    SubSystem: 远东工会图书管理
 */
/**
 * @bookreturn 还书页面JavaScript.
 *
 * @author zhangchi
 * @version 1.0
 */
$('loader_container').className='none';
function init() {
	
	initHead("图书归还",true,true);
	setUserInfo(getMessage('js.ydb.info.0007'));
	g_hysmimaInfo = new PopupBox({
		key: 'dismima',
		title: $('distconfirmTitle'),
		icon: 'img_opt opt_EditInfo',
		content: $('distconfirm'),
		position: 5,
		drag: true,
		beforeclose: function() {
			g_hysmimaInfo.Close(0);
			$("password").value="";
			return false;
		}
	});
	regBtnFunc();
	Element.removeClassName(document.body, 'none');
}

/**
 *  提交按钮事件.
 */
function submitclick() {
	var ckbox = $('bookreturnmxtbl').select('input[type="checkbox"]');
	var isCheck = false;
	for (i = 0; i < ckbox.size(); i++) {
		if (ckbox[i].checked) {
			isCheck = true;
			break;
		}
	}
	if (!isCheck) {
		MsgBox.message(getMessage('js.ydb.error.0005'),'','');
	} else {
		$("distconfirm").removeClassName("none");
		g_hysmimaInfo.Popup();	
		var subfocus = document.getElementById("password");
		subfocus.focus();
	}
}
/**
*  弹出密码层取消按钮事件.
*/
function cancelmimaHys() {
	$("password").value="";
	g_hysmimaInfo.Close(0);
}
/**
*  弹出密码层确认按钮事件.
*/
function passwordSubmit() {
	
	var param = "";
	var passwordParam="";
	var bookid;
	var isbn;
	var mypassword;

	// 用户还书确认密码取得
	mypassword = $("password").value;
	
	// 密码验证
	if (mypassword == '') {
		MsgBox.message(getMessage('js.com.warning.0001', '密码'),'',
			function() {$("password").focus();}	);
	} else {
		var url = "passwordValidate.action?passwordParam=" +mypassword;
		new Ajax.Request(url, {
			onSuccess: function(response) {},
			onComplete:function(request){
				
				var flg = checkException(request);
				if (!flg) {

					if (request.responseText == 1) {
						
						g_hysmimaInfo.Close(0);
						if (document.readyState=="complete"){
							document.getElementById("commonmessage").innerHTML="处理中，请稍候 ...";
							$('loader_container').className='';
						}
						
						var url = "loanchange.action";
						$("bookreturn").action = url;
						$("bookreturn").submit();
					} else if (request.responseText == 0){
						MsgBox.message(getMessage('js.ydb.error.0006'),'',function()
					            {
							$("password").select();
					            });
					}
				}
			}
		}
		);
	}
}

//密码回车键按下事件
function passwordEnter()
{
	if (window.event.keyCode==13)
	{
		passwordSubmit();	
	}
}
