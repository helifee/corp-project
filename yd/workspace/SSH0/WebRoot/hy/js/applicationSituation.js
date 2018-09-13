/**
 * 预约情况一览js
 */﻿﻿
//开始日期和结束日期文本框的可输入性转换，只有当期button被选中时，两个文本框才可用。
function textEmptyCheck(){
	
	var radioCheckSign = document.getElementById("rq");
	
	if( ((radioCheckSign.checked==true) && (document.getElementById("startDate").value=="")) 
		    && (document.getElementById("endDate").value=="")){
		alert("开始日期或结束日期不允许全为空。");
		return false ;
	}
	
	return true;
}

//当鼠标移动到对应的链接上时对应的标签由隐藏变为显示。
function show(hysm , xxqxFlag){	
	if( xxqxFlag == 0 ){
		var objDiv=document.getElementById(hysm) ;
		objDiv.style.display="";
	}
}

//当鼠标从链接上移开时对应的标签由显示变为隐藏。
function hide(hysm , xxqxFlag){
	if( xxqxFlag == 0 ){
		var objDiv=document.getElementById(hysm) ;
		objDiv.style.display="none";
	}
	
}
//在画面参加人中点击查看链接时提交链接到预约更改画面。
function yueyueAction(){
	targetForm = document.forms[0];
	targetForm.action = "yuyue" ;
	targetForm.submit();
}

//画面提交函数，当点击查询时提交到本页面的conferensituation。
function conferensituation(){

	var isOrNotNull = textEmptyCheck();
	 if(isOrNotNull == true){
		 var url = "conferensituationXiangxi";
			    new Ajax.Updater('div_hy_situationXiangxiAjax', url, {
			    parameters: $('YuyueQingkuang').serialize() ,     
				onLoading : function() {
				},
				onSuccess: function(response){ 
                    checkSession(response);
				}	
			});		
    }	  
}

//分页时使用的ajax提交函数。
function conferensituationPageTag(pageUrl , pageNumber , conferensituationId , startDate , endDate ,  radiobutton , items1){
	
	var isOrNotNull = textEmptyCheck();
	 if(isOrNotNull == true){
		 var url = pageUrl+"&pageNumber=" + pageNumber +
		                   "&conferensituationId=" + conferensituationId + 
		                   "&startDate=" +startDate +
		                   "&endDate=" + endDate +
		                   "&radiobutton=" + radiobutton +
		                   "&items1="+items1;
			    new Ajax.Updater('div_hy_situationXiangxiAjax', url , {    
				onLoading : function() {
				},
				onSuccess: function(response){ 
                    checkSession(response);
				}	
			});		
    }	  
}

//在画面会议报告中点击返回时提交链接到预约一览画面。
function conferenceinitAction(yydate){	
	targetForm = document.forms[0];
	targetForm.action = "conferenceinit?yyDate="+yydate ;
	targetForm.submit();
}

//画面提交函数，当点击会议室选择时，提交到会议室分布画面的distributeaction。
function distributeAction( ){
	
	var  targetForm = document.forms[0];
	targetForm.action="distributeaction?pageId=situation" ; 
	targetForm.submit();
}
function textDisabled(currentDay , firstWeek , lastWeek , firstMonth , lastMonth){
	
	if(document.getElementById("dr").checked==true  ){
		document.getElementById("startDate").disabled = true;
	    document.getElementById("endDate").disabled = true;  
		document.getElementById("startDate").value = currentDay;
		document.getElementById("endDate").value = currentDay ;
	}
	if(document.getElementById("dz").checked==true  ){
		document.getElementById("startDate").disabled = true;
		document.getElementById("endDate").disabled = true;
		document.getElementById("startDate").value = firstWeek;
		document.getElementById("endDate").value = lastWeek ;
	}
	if(document.getElementById("dy").checked==true ){
		document.getElementById("startDate").disabled = true ;
		document.getElementById("endDate").disabled = true ;
		document.getElementById("startDate").value = firstMonth;
		document.getElementById("endDate").value = lastMonth ;
	}
	if(document.getElementById("rq").checked==true  ){
		document.getElementById("startDate").disabled = false;
		document.getElementById("endDate").disabled = false;
		
	}
}

//设置pageNumber隐藏域的值
function setpageNumberText(pageNumber){
	document.getElementById("pageNumber").value = pageNumber ;
}








