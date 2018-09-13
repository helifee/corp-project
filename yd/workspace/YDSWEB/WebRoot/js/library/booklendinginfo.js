/*
 * @(#)booklendinginfo.js
 * Copyright (c) 2010-2011 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东工会图书管理
 *    SubSystem: 
 */
/**
 * 行数备份.
 */
var dividbk="";
/**
 * isbn备份.
 */
var isbnbk="";
/**
 * name备份.
 */
var namebk="";
/**
 * user备份.
 */
var useridbk="";
/**
 * 逾期备份.
 */
var overdaysbk="";

document.getElementById("commonmessage").innerHTML="检索中 ，请稍候...";
/**
 * 页面初始化.
 */
function init() {
	$('loader_container').className='none';
	new JsNameFilter("idInput", "nameInput", "../"); 
	initHead("借阅信息",true,true);
	setUserInfo(getMessage('js.ydb.info.0012',$("bookinfosize").value,$("overnum").value));	
	$('bookIsbn').focus();
	g_hysmimaInfo = new PopupBox({
		key: 'dismima',
		title: $('distconfirmTitle'),
		icon: 'img_opt opt_EditInfo',
		content: $('distconfirm'),
		position: 5,
		drag: true,
		beforeclose: function() {
				g_hysmimaInfo.Close(0);
			return false;
		}
	});

	regBtnFunc();
	Element.removeClassName(document.body, 'none');
}
/**
 * 检索按钮事件.
 */	
function sercthbklendinfo() {
	//检索ISBN对应的书籍	信息
	var param = "";
	param = "bookinfosercth.isbn=" + encodeURIComponent($("bookIsbn").value);
	isbnbk=encodeURIComponent($("bookIsbn").value);
	param += "&bookinfosercth.bookname=" + encodeURIComponent($("bookname").value);
	namebk= encodeURIComponent($("bookname").value);
	if($("idInput").value!=""){
		param += "&bookinfosercth.purseid=" +"YD"+ $("idInput").value;
		useridbk="YD"+ $("idInput").value;
	}
	else{
		param += "&bookinfosercth.purseid=" +$("idInput").value;
		useridbk= $("idInput").value;
	}

	if($("bookoverflg").checked){
		param += "&bookinfosercth.bookoverdays=1";
		overdaysbk="1";
	}
	else{
		param += "&bookinfosercth.bookoverdays=0";
		overdaysbk="0";
	}
	param += "&radom=" + Math.random();
	var url = "booklendinfomxsercth.action?" + param;
	if (document.readyState=="complete"){
		document.getElementById("commonmessage").innerHTML="检索中 ，请稍候...";
		$('loader_container').className='';
		
	}
	//编码转换
	url = encodeURI(url);
	new Ajax.Updater('lendmxdiv', url , {    
		onLoading : function() {},
		onSuccess : function(response) {},
		onComplete : function(request) {
		var flg = checkException(request);
		if (!flg) {
			$('loader_container').className='none';
			$('bookIsbn').focus();
			}
			
		}
	});
}
/**
 * 归还按钮事件.
 */	
function returnbook(objid) {
	dividbk=objid;
	g_hysmimaInfo.Popup();
	$("password").focus();
}
//密码回车键按下事件
function mimaclick()
{
	if (window.event.keyCode==13)
	{
		sumitreturn();	
	}
}
/**
 *  弹出确认按钮事件更新操作.
 */
function sumitreturn()
{
	//向后台传值
	var param = "";
	var mimaparam="";

	//验证密码逻辑
		if($("password").value=='')
		{
			MsgBox.message(getMessage('js.com.warning.0001', '密码'),'',function()
		            {
				$("password").focus();
		            });
		}
		else
		{
			mimaparam=$("password").value;
			var url = "userpwblinfovalidate.action?mimaparam=" +mimaparam ;
			new Ajax.Request(url, {
				method: 'get',
			
				onSuccess: function(response) {},
			    onComplete : function(request) {
				var flg = checkException(request);
						
				if (!flg) {
						
						
							if(request.responseText==1)
						    {
								//更新对应的书籍	信息
								g_hysmimaInfo.Close(0);
								$("password").value="";
								//更新对应的书籍	信息
								var param = "";
								param = "bookinfoupdate.bookid=" + $("bookid"+dividbk).innerText;
								if($("idInput").value!=""){
									param += "&bookinfoupdate.purseid=" +"YD"+ $("idInput").value;
								}
								else{
									param += "&bookinfoupdate.purseid=" +$("idInput").value;
								}
								
								//备份检索条件检索
								param += "&bookinfosercth.isbn=" + isbnbk;
								param += "&bookinfosercth.bookname=" + namebk;
								param += "&bookinfosercth.purseid=" + useridbk;
								param += "&bookinfosercth.bookoverdays=" + overdaysbk;

								param += "&radom=" + Math.random();
								var url = "booklendingupdateinfo.action?" + param;
								if (document.readyState=="complete"){
									document.getElementById("commonmessage").innerHTML="处理中 ，请稍候...";
									$('loader_container').className='';
									
								}
								//编码转换
								url = encodeURI(url);
								new Ajax.Updater('lendmxdiv', url , {    
									onLoading : function() {},
									onSuccess : function(response) {},
									onComplete : function(request) {
										var flg = checkException(request);
										
										if (!flg) {
											$('loader_container').className='none';
										setUserInfo(getMessage('js.ydb.info.0012',$("bookinfosize").value,$("overnum").value));	
										}
									}
								});
	
						    }
							else
							{
								MsgBox.message(getMessage('js.ydb.error.0006'),'',function()
							            {
									$("password").select();
							            });
							}
					
					
				}
				}
			});	
			
		}

}

/**
 *  弹出密码层取消按钮事件.
 */
function cancelmimaHys() {
	$("password").value="";
	g_hysmimaInfo.Close(0);
}





