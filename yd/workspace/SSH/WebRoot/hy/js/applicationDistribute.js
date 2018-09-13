﻿/**
* 会议室分布js
*/

//当鼠标移动到标签上时，会议室标签改变颜色，对应的记录改变颜色。
function show(index ){
   tableName = 'xianshiTable';
   divName = 'layer'+index;
   document.getElementById(tableName).rows[index].style.backgroundColor='#DE7594';
   var objDiv=document.getElementById(divName) ;
   objDiv.style.backgroundColor='#DE7594';    	
}

//当鼠标离开标签时，会议室标签改变为原来颜色，对应的记录改变为原来颜色。
function hide(index ){
   tableName = 'xianshiTable';
   divName = 'layer'+index;
   document.getElementById(tableName).rows[index].style.backgroundColor='#ffffd9';
   var objDiv=document.getElementById(divName) ;
   objDiv.style.backgroundColor='#6C89CB';
}

//当鼠标移动到会议室一条记录上时，当前记录行改变颜色，对应的会议室标签改变颜色。
//当鼠标从一条会议室记录上离开时，当前记录和对应的会议室标签恢复为原来颜色。
function shTable(){
   var tableName = 'xianshiTable';  
   if(!document.getElementsByTagName || !document.createTextNode)return;
   var rows=document.getElementById('xianshiTable').getElementsByTagName('tr');
   for(var mmm = 0; mmm < rows.length; mmm++){
   	rows[mmm].onmouseover=function(){
   		var divName = 'layer' + eval(this.rowIndex); 
   		document.getElementById(divName).style.backgroundColor='#DE7594';
   		document.getElementById(tableName).rows[eval(this.rowIndex)].style.backgroundColor='#DE7594'; 	
   		return;
   	}
    rows[mmm].onmouseout=function(){
    	var divName = 'layer' + eval(this.rowIndex); 
    	document.getElementById(divName).style.backgroundColor='#6C89CB';
   		document.getElementById(tableName).rows[eval(this.rowIndex)].style.backgroundColor='#ffffd9'; 
   		return;
   	    
   	}
   }
}
//画面提交函数。点击变更链接时，提交到distributeUpdateAction。
function distributeUpdateAction(){	
  	targetForm = document.forms[0];
  	targetForm.action = "distributeUpdateAction" ;
  	targetForm.submit();
}  

//画面提交函数。点击会议室标签或者会议室记录时画面原路返回到上一个画面。
function hysYySummit(hysId , hysIdY , pageId , startDate ,  endDate , radiobutton , yyDate ){
    var  targetForm = document.forms[0];
    if( pageId== "situation"){

    	targetForm.action = "conferensituation?radiobutton=" + radiobutton
    	                    + "&conferensituationId=" + hysId
    	                    + "&startDate=" + startDate
    	                    + "&endDate=" + endDate
    	                    + "&pageId=hysDis"; 
    	targetForm.submit();
    }
    else{
	    targetForm.action="conferenceinit?hysId="+hysId 
	                      +"&yyDate="+yyDate; 
  	    targetForm.submit();
    }	
}