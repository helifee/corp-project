﻿﻿/**
 * 会议室变更画面js.
 */

//全局变量。用于保存所选择的记录。
var newUpdateFlag = 0 ;//当前操作状态标记。0：新建 ；1：更改。
var hysidPublic  = 0  ; 
var hysmcPublic  = "" ;
var cjrsPublic   = 0  ;
var hysdhPublic  = "" ;
var hyssbPublic  = "" ;
var hysjsPublic  = 0  ;
var hysBgPublic  = 0  ;
var hysqxPublic  = 0  ;
var hysqyPublic  = 0  ;
var hyszxPublic  = 0  ;
var hyszyPublic  = 0  ;
var hyspxPublic  = 0  ;

//更改显示函数，当点击更改时候，更改记录的文本框可用，并且可以更改。
function genggaiXianshiTable(hysid  , hysmc , cjrs , hysdh , hyssb , hysjs , hysBg , hysqx , hysqy , hyszx , hyszy , hyspx){
	
	//操作状态变更。
	newUpdateFlag = 1 ;

    //保存原始记录。
	hysidPublic  = hysid ; 
	hysmcPublic  = hysmc ;
	cjrsPublic   = cjrs  ;
	hysdhPublic  = hysdh ;
	hyssbPublic  = hyssb ;
	hysjsPublic  = hysjs ;
	hysBgPublic  = hysBg ;
	hysqxPublic  = hysqx ;
	hysqyPublic  = hysqy ;
	hyszxPublic  = hyszx ;
	hyszyPublic  = hyszy ;
	hyspxPublic  = hyspx ;
	hysdhPublic  = hysdh ;
	hyssbPublic  = hyssb ;

    //文本框更改为可用。
 	objDivHysId=document.getElementById("hysId").disabled = "";
 	objDivHysMc=document.getElementById("hysMc").disabled = "";
 	objDivHysRs=document.getElementById("hysRs").disabled = "";
 	objDivHysDh=document.getElementById("hysDh").disabled = "";
 	objDivHysSb=document.getElementById("hysSb").disabled = "";
 	objDivHysJs=document.getElementById("hysJs").disabled = "";
 	objDivHysBg=document.getElementById("hysBg").disabled = "";  	
 	objDivHysPx=document.getElementById("hysPx").disabled = "";
 	objDivHysQx=document.getElementById("hysQx").disabled = "";
 	objDivHysQy=document.getElementById("hysQy").disabled = "";
 	objDivHysZx=document.getElementById("hysZx").disabled = "";
 	objDivHysZy=document.getElementById("hysZy").disabled = "";
 	document.getElementById("tijiao").disabled = "";
 	document.getElementById("quxiao").disabled = "";

    //在文本框中显示要更改的记录。
 	document.getElementById("hysId").value = hysid ;
 	document.getElementById("hysMc").value = hysmc ;
 	document.getElementById("hysRs").value = cjrs ;
 	document.getElementById("hysDh").value = hysdh ;
 	document.getElementById("hysSb").value = hyssb ;
 	document.getElementById("hysJs").value = hysjs ;

 	if(hysBg==0){   	
 		objDivHysRs=document.getElementById("hysBg").value = "0" ;
 	}
 
 	if(hysBg==1){
 		objDivHysRs=document.getElementById("hysBg").value = "1" ;
 	}
 	
 	document.getElementById("hysQx").value = hysqx ;
 	document.getElementById("hysQy").value = hysqy ;
 	document.getElementById("hysZx").value = hyszx ;
 	document.getElementById("hysZy").value = hyszy ;
 	document.getElementById("hysPx").value = hyspx ;	
    objDiv=document.getElementById("xinjiangenggaiTable") ;
    objDiv.style.display="";           
}

//新建显示函数，当点击新建时，文本框变为可用，会议室ID显示当前最大会议室 ID+1，会议室排序显示当前最大排序ID+1。
function xinjianXianshiTable(nextHysid , nextHyspx){

	//操作状态变更。
	newUpdateFlag = 0 ;

	//文本框更改为显示。
 	objDivHysId=document.getElementById("hysId").disabled = "";
 	objDivHysMc=document.getElementById("hysMc").disabled = "";
 	objDivHysRs=document.getElementById("hysRs").disabled = "";
 	objDivHysDh=document.getElementById("hysDh").disabled = "";
 	objDivHysSb=document.getElementById("hysSb").disabled = "";
 	objDivHysJs=document.getElementById("hysJs").disabled = "";
 	objDivHysBg=document.getElementById("hysBg").disabled = "";  	
 	objDivHysPx=document.getElementById("hysPx").disabled = "";
 	objDivHysQx=document.getElementById("hysQx").disabled = "";
 	objDivHysQy=document.getElementById("hysQy").disabled = "";
 	objDivHysZx=document.getElementById("hysZx").disabled = "";
 	objDivHysZy=document.getElementById("hysZy").disabled = "";
 	document.getElementById("tijiao").disabled = "";
 	document.getElementById("quxiao").disabled = "";

 	//文本框赋值，会议室ID显示当前最大会议室 ID+1 ，会议室排序显示当前最大排序ID+1。
 	document.getElementById("hysId").value = nextHysid ;
 	document.getElementById("hysMc").value = "" ;
 	document.getElementById("hysRs").value = "" ;
 	document.getElementById("hysDh").value = "" ;
 	document.getElementById("hysSb").value = "" ;
 	document.getElementById("hysJs").value = "" ;	
 	document.getElementById("hysBg").value = "0" ;   	
 	document.getElementById("hysQx").value = "" ;
 	document.getElementById("hysQy").value = "" ;
 	document.getElementById("hysZx").value = "" ;
 	document.getElementById("hysZy").value = "" ;
    document.getElementById("hysPx").value = nextHyspx ;
 
    objDiv=document.getElementById("xinjiangenggaiTable") ;
    objDiv.style.display="";           
 }

//页面提交函数，提交到distributeaction。
function distributeAction(){	
    targetForm = document.forms[0];
    targetForm.action = "distributeaction" ;
    targetForm.submit();
}

//整数检查，检查输入的值是不是整数。
function isZhengShu(panduanData){
	
	var index1 = panduanData.indexOf(".");	
	if(index1 != -1){
		return false;
	}
	
	strToFloat = parseFloat (panduanData);
	strToInt = parseInt(panduanData);	
	if(strToFloat == strToInt){
	    return true;
	}else{
	    return false;
	} 
}

//判断特殊符号
function pdTsFh(pdtsfh){
	
	var index1 = pdtsfh.indexOf("'");
	var index2 = pdtsfh.indexOf("\\");
	
	if(index1 != -1 || index2 != -1){
		return false;
	}
	else{
		return true;
	}
			
	
	
}

//页面提交函数，提交到distributeDeleteAction。
function distributeDeleteAction(hysid){
 	
if(confirm("警告：删除会议室会导致该会议室的预约情况无法显示！\n\n确定删除吗?")){
 		var url = "distributeDeleteAction?hysIddelete="+hysid;
 		new Ajax.Updater('div_hy_distributeUpdate', url, {
			onLoading : function() {
			},
			onSuccess : function(response) {				
				 if (checkSession(response)){
						alert("删除成功");
					}
			
			},
			onFailure : function(request) {
				alert("服务器故障，请稍候重试");
			}
		});
    }  
}

//页面提交函数，提交到showDistribute。
function distributeUpdateAction(){
	var url = "showDistribute";
		new Ajax.Updater('div_hy_distributeUpdate', url, {
		onLoading : function() {
		},
		onSuccess : function(response) {				
				checkSession(response);		
			},
		onFailure : function(request) {
			alert("服务器故障，请稍候重试");
		}
	});
}

//页面提交函数，提交到distributeNewOrUpdateAction。
function submitTypeDistribute(){
	objHysId=document.getElementById("hysId");
	objHysMc=document.getElementById("hysMc");
	objHysRs=document.getElementById("hysRs");
	objHysJs=document.getElementById("hysJs");
	objHysBg=document.getElementById("hysBg");  	
	objHysQx=document.getElementById("hysQx");
	objHysQy=document.getElementById("hysQy");
	objHysZx=document.getElementById("hysZx");
	objHysZy=document.getElementById("hysZy");
	objHysPx=document.getElementById("hysPx");
	objHysDh=document.getElementById("hysDh");
	objHysSb=document.getElementById("hysSb");
	
	/*
	 * 提交信息合法性检查。
	 */
	if(objHysId.value ==""){
 	    alert("会议室ID:不能为空！");
 	    return;
    }
	
	if(objHysMc.value ==""){
 	    alert("会议室名称 :不能为空！");
 	    return;
    }
	
	if(objHysRs.value ==""){
 	    alert("容纳人数:不能为空！");
 	    return;
    }
	
	if(objHysJs.value ==""){
 	    alert("网线接口数量:不能为空！");
 	    return;
     }
	
	if(objHysBg.value == 2){
 	    alert("是否需要会议室报告:不能为空！");
 	    return;
     }
	
	if(objHysPx.value ==""){
	   	alert("排列顺序:不能为空！");
	   	return;
	}
	
	if(objHysQx.value ==""){
 	    alert("图像起点X坐标:不能为空！");
 	    return;
    }
	
	if(objHysQy.value ==""){
 	    alert("图像起点Y坐标:不能为空！");
 	    return;
    }
	if(objHysZx.value ==""){
 	    alert("图像终点X坐标:不能为空！");
 	    return;
    }
	
	if(objHysZy.value ==""){
 	    alert("图像终点Y坐标:不能为空！");
 	    return;
    }
	
    //检查长度	
	if(objHysId.value.length > 2){
 	    alert("会议室ID:长度大于2！");
 	    return;
    }

	if(objHysMc.value.length > 34){
 	    alert("会议室名称 :长度大于34！");
 	    return;
    }
	
	if(objHysRs.value.length > 3){
 	    alert("容纳人数:长度大于3！");
 	    return;
    }
	
	if(objHysDh.value.length > 4){
 	    alert("电话:长度大于4！");
 	    return;
    }
	
	if(objHysSb.value.length > 255){
 	    alert("设备:长度大于255！");
 	    return;
    }
	
	if(objHysJs.value.length > 3){
 	    alert("网线接口数量:长度大于3！");
 	    return;
     }
	
	if(objHysBg.value.length > 1){
 	    alert("是否需要会议室报告:长度大于1！");
 	    return;
     }
	
	if(objHysPx.value.length > 2){
	   	alert("排列顺序:长度大于2！");
	   	return;
	}
	
	if(objHysQx.value.length > 4 ){
 	    alert("图像起点X坐标:长度大于4！");
 	    return;
    }
	
	if(objHysQy.value.length > 4){
 	    alert("图像起点Y坐标:长度大于4！");
 	    return;
    }
	
	if(objHysZx.value.length > 4){
 	    alert("图像终点X坐标:长度大于4！");
 	    return;
    }
	
	if(objHysZy.value.length > 4){
 	    alert("图像终点Y坐标:长度大于4！");
 	    return;
    }

    //数据合法性验证
	if(isNaN(objHysId.value) || isZhengShu(objHysId.value) == false || parseInt(objHysId.value) < 0){
 	    alert("会议室ID:输入数据不正确！");
 	    return;
    }
	
	if(isNaN(objHysRs.value) || isZhengShu(objHysRs.value) == false || parseInt(objHysRs.value) < 0){
		alert("容纳人数:输入数据不正确！");
		return;
	}
	
	if(pdTsFh(objHysMc.value) == false){
		alert("会议室名称:输入数据不正确！");
		return;
	}
	
	if(pdTsFh(objHysDh.value) == false){
		alert("电话:输入数据不正确！");
		return;
	}
	
	if(pdTsFh(objHysSb.value) == false){
		alert("设备:输入数据不正确！");
		return;
	}

	if(isNaN(objHysJs.value) || isZhengShu(objHysJs.value) == false || parseInt(objHysJs.value) < 0){
		alert("网线接口数量:输入数据不正确！");
		return;
	}
	
	if(parseInt(objHysBg.value) != 0 && parseInt(objHysBg.value) != 1){
		alert("是否需要会议室报告:输入数据不正确！");
		return;
	}
	
	if(isNaN(objHysPx.value) || isZhengShu(objHysPx.value) == false || parseInt(objHysPx.value) < 0){
	   	alert("排列顺序:输入不正确！");
	   	return;
	}
	
	if(isNaN(objHysQx.value )|| isZhengShu(objHysQx.value) == false){
		alert("图像起点X坐标:输入数据不正确！");
		return;
	}
	
	if(isNaN(objHysQy.value) || isZhengShu(objHysQy.value) == false){
		alert("图像起点Y坐标:输入数据不正确！");
		return;
	}
	
	if(isNaN(objHysZx.value) || isZhengShu(objHysZx.value) == false){
		alert("图像终点X坐标:输入数据不正确！");
		return;
	}
	
	if(isNaN(objHysZy.value )|| isZhengShu(objHysZy.value) == false){
		alert("图像终点Y坐标:输入数据不正确！");
		return;
	}
	
	//如果当前状态为更改，则判断是否有更改的字段。
	if(newUpdateFlag == 1){
		if(objHysId.value == hysidPublic && objHysMc.value == hysmcPublic && 
		   objHysRs.value == cjrsPublic  && objHysJs.value == hysjsPublic && 
		   objHysBg.value == hysBgPublic && objHysPx.value == hyspxPublic &&
		   objHysQx.value == hysqxPublic && objHysQy.value == hysqyPublic && 
		   objHysZx.value == hyszxPublic && objHysZy.value == hyszyPublic &&
		   objHysDh.value == hysdhPublic && objHysSb.value == hyssbPublic ){
	 	   alert("没有修改的字段！");
	  	   return;
		}		
	}
	
	if(objHysId.value != hysidPublic){
		newUpdateFlag = 0 ;
	}
	
	//如果满足条件，则提交。
	var url = "distributeNewOrUpdateAction";
	new Ajax.Updater('div_hy_distributeUpdate', url, {
	parameters: $('distributeUpdateForm').serialize()	,
		onLoading : function() {
		},
		onSuccess : function(response) {	
	        if (checkSession(response)){		
				    alert("会议室变更成功！"); 	
				cancleDistribute();
			}
		},
		onFailure : function(request) {
			alert("程序有错误！");
		}
	
});
}

//取消函数。
function cancleDistribute(){	
	
	//文本框值清空。
	document.getElementById("hysId").value = "" ;
	document.getElementById("hysMc").value = "" ;
	document.getElementById("hysRs").value = "" ;
	document.getElementById("hysDh").value = "" ;
	document.getElementById("hysSb").value = "" ;
	document.getElementById("hysJs").value = "" ;	
	document.getElementById("hysBg").value = "2" ;   	
	document.getElementById("hysQx").value = "" ;
	document.getElementById("hysQy").value = "" ;
	document.getElementById("hysZx").value = "" ;
	document.getElementById("hysZy").value = "" ;
	document.getElementById("hysPx").value = "" ;
    
	//操作状态标志设为0。
	newUpdateFlag = 0 ;
	
	//文本框设置为不显示。
	objDivHysId=document.getElementById("hysId").disabled = "true";
	objDivHysMc=document.getElementById("hysMc").disabled = "true";
	objDivHysRs=document.getElementById("hysRs").disabled = "true";
	objDivHysDh=document.getElementById("hysDh").disabled = "true";
	objDivHysSb=document.getElementById("hysSb").disabled = "true";
	objDivHysJs=document.getElementById("hysJs").disabled = "true";
	objDivHysBg=document.getElementById("hysBg").disabled = "true";  	
	objDivHysPx=document.getElementById("hysPx").disabled = "true";
	objDivHysQx=document.getElementById("hysQx").disabled = "true";
	objDivHysQy=document.getElementById("hysQy").disabled = "true";
	objDivHysZx=document.getElementById("hysZx").disabled = "true";
	objDivHysZy=document.getElementById("hysZy").disabled = "true";
	document.getElementById("tijiao").disabled = "true";
	document.getElementById("quxiao").disabled = "true";
}
