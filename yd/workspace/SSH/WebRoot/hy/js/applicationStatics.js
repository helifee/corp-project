/**
 * 预约统计js
 */
var tabFlag;//1：月统计；2：年统计； 3：视图统计
var radDisMFlag;//1：次数；2：利用率
var radDisYFlag;//1： 次数：2：利用率
var radDisVFlag;//1：饼状图：2：柱状图；3：线状图

function init(){
	tabFlag=1;
	radDisMFlag=1;
	radDisYFlag=1;
	radDisVFlag=1;

	setContext('myTab0' ,'stat_', 1 ,  3);
	setTab('disMethod', 1 , 3);
	setTab('radDisM', 1, 2);
	setTab('radDisY', 1, 2);
	setTab('radDisV', 1, 3);
	$('NumByM').checked = true;	
	$('NumByY').checked = true;	
	$('viewByP').checked = true;
}

function nTabs(thisObj,Num){	
	if(thisObj.className == "active")return;
	var tabObj = thisObj.parentNode.id;
	var tabList = $(tabObj).select('li');
	for(var i=0; i <tabList.length; i++){
	  if (i == Num){
	   if(i==tabList.length-1){
		   thisObj.className = 'active bd_r_1sccc';
		   }else{
			 thisObj.className = 'active';  
		   }
	   $(tabObj+'_Content'+i).setStyle({display: 'block'});
	  }else{
	   if(i==tabList.length-1){
		   tabList[i].className = 'normal bd_r_1sccc';
		   }else{
			   tabList[i].className = 'normal';
		   }
	   $(tabObj+'_Content'+i).setStyle({display: 'none'});
	  }
	}
}

function setContext(parentNodeId ,name, cursel , n){	
	for( var i=1; i <=n; i++){
		  if (i == cursel){
		       if(i == n){
			       $(name+i).className = 'active bd_r_1sccc';
			   }else{
				   $(name+i).className = 'active';  				  
			   }
		       $(parentNodeId+'_Content'+(i-1)).setStyle({display: 'block'});
		  }else{
		       if(i==n){
			       $(name+i).className = 'normal bd_r_1sccc';
			   }else{
				   $(name+i).className = 'normal';
			   }
		       $(parentNodeId+'_Content'+(i-1)).setStyle({display: 'none'});
		  }
    }	
}

// tab转换
﻿﻿function setTab(name, cursel, n){
	for(var i=1; i<=n; i++){		
		$('con_' + name + '_' + i).style.display = i == cursel ? "block" : "none";
 	}
} 

//所选年份改变时，更新数据。  
function yueyueStaticsAction(){
	 var url = "staticsXiangxi";
	    new Ajax.Updater('div_hy_staticsAjax', url, {
	    parameters: $('staticsYuyuetongji').serialize()	,
		onLoading : function() {
		},
		onSuccess:function(){
		//	changeImag();
		},
		onComplete : function(request) {
			setTab('disMethod', tabFlag , 3);
			setContext('myTab0' ,'stat_', tabFlag ,  3);
			setTab('radDisM', radDisMFlag, 2);
			setTab('radDisY', radDisYFlag, 2);
			setTab('radDisV', radDisVFlag, 3);
			if(tabFlag == 2){
				$('disStaticYear1111').style.display =  'none';
				
			}
			else{
				$('disStaticYear1111').style.display =  'block';
			}
		}
	});			
}

//返回按钮按下时，返回预约一览画面
function conferenceinitAction(yyDate){	
	targetForm = document.forms[0];
	targetForm.action = "conferenceinit?yyDate="+yyDate ;
	targetForm.submit();
}

function  tabFlagChange(num){	
	tabFlag = num;
	if(tabFlag==2){
		$('disStaticYear1111').style.display =  'none';
	}else{
		$('disStaticYear1111').style.display =  'block';
	}
}
function  radDisMFlagChange(num){
	radDisMFlag = num;
}
function  radDisYFlagChange(num){
	radDisYFlag = num;
}
function  radDisVFlagChange(num){
	radDisVFlag = num;
}
