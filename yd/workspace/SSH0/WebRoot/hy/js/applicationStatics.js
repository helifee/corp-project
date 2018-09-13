/**
 * 预约统计js
 */

//点击当前年和三年时，标签形态的变换。
﻿﻿function setTab(name, cursel, n){
	for(i=1; i<=n; i++){
  		var menu = document.getElementById(name + i);
  		var con = document.getElementById("con_" + name + "_" + i);
  		menu.className = i == cursel ? "hover" : "";
  		con.style.display = i == cursel ? "block" : "none";
 	}
} 

//所选年份改变时，更新数据。  
function yueyueStaticsAction(){
	 var url = "staticsXiangxi";

	    new Ajax.Updater('div_hy_staticsAjax', url, {
	    parameters: $('staticsYuyuetongji').serialize()	,
		onLoading : function() {
		},
		onSuccess: function(response){ 
			checkSession(response);
		}	
	});			
}

//返回按钮按下时，返回预约一览画面
function conferenceinitAction(yyDate){	
	targetForm = document.forms[0];
	targetForm.action = "conferenceinit?yyDate="+yyDate ;
	targetForm.submit();
}

//点击当前年，状态变换为当前年。
function dFlagChange(){
	document.getElementById("dsFlag").value = "0" ;
}

//点击三年，状态变换为三年。
function sFlagChange(){
	document.getElementById("dsFlag").value = "1";
}