function loadMsg(success,dealSpCallBack,msg,spWiId,bizId,code,isStartWp){
	if(isNotEmpty(success)){
		
		if(success == 'true'){
			//alert(msg+"窗口即将关闭！");
			try{
				if(isStartWp == 1 && code == 'EX_DAYEXPENSE'){
					if(window.confirm("是否打印粘贴单？")){
						window.open("/ex/basedoc/templet/stamp!display.do?nodetype=日常报销&receiptid="+bizId);
					}
					if(dealSpCallBack == 'true' && window.opener && window.opener.spCallBack){
						window.opener.spCallBack();
					}
					window.location.href = "Form!dealIndex.do?spWiId=" + spWiId+"&t="+ (new Date()).getTime();
				}else{
					dealCloseWindow(dealSpCallBack,spWiId);
				}
				
			}catch (e) {
				alert("父窗口刷新失败，请手动刷新！");
			}
		}else{
			alert(msg + "");
			try{
				dealCloseWindow(dealSpCallBack,spWiId);
			}catch (e) {
				alert("父窗口刷新失败，请手动刷新！");
			}
		}
	}
}
function dealCloseWindow(dealSpCallBack,spWiId){
	try{
		if(window){
			//---------由于打开页面存在各种情况,希望进行的操作也不尽相同,固此处提供此统一方法，对各链接区别操作---------
			var app = window.document.getElementById("app");
			if(null != app && isNotEmpty(app.value) && app.value == "oa" && top){
				if(confirm("是否关闭当前页面！！")){
					window.opener = null;
					window.open("", "_self");
					window.close();
				}else{
					//刷新页面
					window.location.href = "Form!dealIndex.do?spWiId=" + spWiId+"&t="+ (new Date()).getTime();
				}
			}
			if(window.opener){
				//调用父页面自身的处理方法
				if (dealSpCallBack == 'true' && typeof(window.opener.spCallBack) != "undefined"){
					window.opener.spCallBack();
					window.close();
				} else {
					var wOpener = window.opener;
					dealCloseWindowWin(wOpener);
				}
			} else if (window.parent &&  dealSpCallBack == 'true' && typeof(window.parent.spCallBack) != "undefined"){
				window.parent.spCallBack();
			} else {
				try{
					window.close();
				}catch (e) {
					//
				}
			}
		}
	}catch (e) {
			if(confirm("是否关闭当前页面！！")){
				window.opener = null;
				window.open("", "_self");
				window.close();
			}else{
				//刷新页面
				window.location.href = "Form!dealIndex.do?spWiId=" + spWiId+"&t="+ (new Date()).getTime();
			} 
		
	}
}
function dealCloseWindowWin(wOpener){
	var openerHref = wOpener.location.href;
	//打开审批页面为"首页-待办"
	if(openerHref.indexOf("App!desktop1.do")>-1){
		wOpener.top.location.href = getReloadUrl(wOpener.top.location.href);
		window.close();
	}
	//打开审批页面为"首页-预警"
	else if(openerHref.indexOf("App!desktop2.do")>-1){
		wOpener.top.location.href = getReloadUrl(wOpener.top.location.href);
		top.close();
	}
	//打开审批页面为"清标界面"
	else if(openerHref.indexOf("clear!itemSelect.do")>-1){
		wOpener.opener.location.href = wOpener.opener.location.href;
		window.opener.close();
		top.close();
	}
	//打开审批页面为"招标方案管理"
	else if(openerHref.indexOf("gc_blue_print!view.do")>-1){
		wOpener.opener.location.href = wOpener.opener.location.href;
		wOpener.close();
		top.close();
	}
	else{
		wOpener.location.href = getReloadUrl(wOpener.location.href);
		top.close();
	}
}