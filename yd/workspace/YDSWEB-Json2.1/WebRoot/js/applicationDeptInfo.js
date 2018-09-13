﻿﻿/**
 * 部门管理画面js.
 */

//全局变量。用于保存所选择的记录。
var newUpdateFlag = 0 ;//当前操作状态标记。0：新建 ；1：更改。
var indexPublic = 0 ;

//新建部门信息
function newBuildDeptInfo(){

	//操作状态变更。
	newUpdateFlag = 0 ;

	//文本框启用
	$('deptInfoForm').enable(); 
	$('deptInfoListForm').disable(); 

 	//文本框赋值
 	document.getElementById("deptId").value = "" ;
 	document.getElementById("deptNm").value = "" ;
 	document.getElementById("deptSnm").value = "" ;
 	document.getElementById("leaderId").value = "" ;
 	document.getElementById("leaderNm").value = "" ;
 	document.getElementById("parentDeptId").value = "" ;
 	document.getElementById("parentDeptNm").value = "" ;
 	document.getElementById("deptDesc").value = "" ;
    
    //新建显示
    dept_info_body.style.display="block";
	
 	document.getElementById("newBuild").disabled = "true";
}

//修改部门信息
function modifyDeptInfo(deptId){
	
	//操作状态变更。
	newUpdateFlag = 1 ;

	//文本框更改为可编辑。
	$('deptInfoForm').enable(); 

 	//文本框赋值
 	var url = "getDeptInfoAction?deptId="+deptId;
	var url = "getDeptInfoAction.action?deptId="+deptId;
	new Ajax.Updater('div_perm_deptInfoView', url, {
		onLoading : function() {
		},
		onSuccess : function(response) {				
		},
		onFailure : function(request) {
			alert(getMessage("key007"));
		}
	}); 
    
    //更改显示
    dept_info_body.style.display="block";
    document.getElementById("newBuild").disabled = "true";
}

//页面提交函数，提交到deptInfoDelAction。
function deleteDeptInfo(deptId){
	if(confirm(getMessage("yds.com.info.0001"))){
 		var url = "deptInfoDelAction.action?deptId="+deptId;
 		new Ajax.Updater('div_perm_deptInfoList', url, {
			onLoading : function() {
			},
			onSuccess : function(response) {				
				alert(getMessage("yds.com.info.0010"));
			},
			onFailure : function(request) {
				alert(getMessage("key007"));
			}
		});
    }  
}

//取消函数。
function clearDeptInfo(){	
	
	//文本框值清空。
 	document.getElementById("deptId").value = "" ;
 	document.getElementById("deptNm").value = "" ;
 	document.getElementById("deptSnm").value = "" ;
 	document.getElementById("leaderId").value = "" ;
 	document.getElementById("leaderNm").innerHTML = "" ;
 	document.getElementById("parentDeptId").value = "" ;
 	document.getElementById("parentDeptNm").innerHTML = "" ;
 	document.getElementById("deptDesc").value = "" ;
    
	//操作状态标志设为0。
	newUpdateFlag = 0 ;
	
	//文本框设置为不显示。
	$('deptInfoForm').disable();
    
    document.getElementById("newBuild").disabled = "";
}

//提交新建或修改的部门信息
function submitDeptInfo(){
	
	//输入校验
	if (validate()) {
		return;
	}

	//修改状态下
	if (newUpdateFlag == 1) {
		if(confirm(getMessage("yds.com.info.0003"))){
			var deptId = document.getElementById("deptId").value;
			targetForm = document.forms[0];
			targetForm.action = "deptInfoUpdAction.action";
			targetForm.submit();
		}
	}else if (newUpdateFlag == 0) {
		if(confirm(getMessage("yds.com.info.0002"))){
			targetForm = document.forms[0];
			targetForm.action = "deptInfoAddAction";
			targetForm.submit();
		}
	}
}

function resize(){
	if(dept_info_body.style.display=="none"){
		dept_info_body.style.display="block";
	}
	else{
		dept_info_body.style.display="none";
	}
}

//取得名称
function getName(index){
	
	indexPublic = index;
	var getFlg = true;
	if (index == 1) {
		var parentDeptId = document.getElementById("parentDeptId").value;
		var url = "getDeptNmAction?deptId="+parentDeptId;
		// 上级部门ID为空时不进行get
		if(parentDeptId == ""){
			getFlg = false;	
		}
		// 从数据库中检索上级部门名称是否存在
		if(getFlg){
			if (parentDeptIdValidate()) {
				return false;
			} else {
				new Ajax.Request(url, {
					method : 'post',
					onComplete : showResponse,
					onFailure : reportError
				});  
			}
		}
	}else{
		var leaderId = document.getElementById("leaderId").value;
		var url = "getLeaderNmAction?userId="+leaderId;

		// 上级主管ID为空时不进行get
		if(leaderId == ""){
			getFlg = false;	
		}
		// 从数据库中检索上级部门名称是否存在
		if(getFlg){
			if (leaderIdValidate()) {
				return false;
			} else {
				new Ajax.Request(url, {
					method : 'post',
					onComplete : showResponse,
					onFailure : reportError
				});  
			}
		}
	}
}

function reportError() {
	alert(getMessage("key999"));
}

function showResponse(originalRequest) {
	if (indexPublic == 1) {
		if(originalRequest.responseText != ""){
			// 显示服务器端的上级部门名称
			document.getElementById("parentDeptNm").innerHTML = originalRequest.responseText;
		}else{
			alert(getMessage("key004"));
			Field.focus($('departmentInfo.parentDeptId'));
		}
	}else if (indexPublic == 2) {
		if(originalRequest.responseText != ""){
			// 显示服务器端的部门主管名称 
			document.getElementById("leaderNm").innerHTML = originalRequest.responseText;
		}else{
			alert(getMessage("key018"));
			Field.focus($('departmentInfo.leaderId'));
		}
	}
}

//
function validate() {
    form = document.getElementById("deptInfoForm");

    var continueValidation = true;
    // field name: departmentInfo.deptId
    if (form.elements['departmentInfo.deptId']) {
        field = form.elements['departmentInfo.deptId'];
        if (continueValidation && field.value != null && (field.value == "" || field.value.replace(/^\s+|\s+$/g,"").length == 0)) {
            alert(getMessage("key001", "部门ID"));
            continueValidation = false;
        }
        
        if (continueValidation && field.value != null) {
            var value = field.value;
                //trim field value
                while (value.substring(0,1) == ' ')
                    value = value.substring(1, value.length);
                while (value.substring(value.length-1, value.length) == ' ')
                    value = value.substring(0, value.length-1);
            if ((3 > -1 && value.length < 3) ||
                (3 > -1 && value.length > 3)) {
            	alert(getMessage("key015"));
            	continueValidation = false;
            }
        }
        
        if (continueValidation && field.value != null && !field.value.match("[a-z0-9A-Z]{3}")) {
        	alert(getMessage("key016", "部门ID"));
        	continueValidation = false;
        }
    }

    // field name: departmentInfo.deptNm
    if (form.elements['departmentInfo.deptNm']) {
        field = form.elements['departmentInfo.deptNm'];
        if (continueValidation && field.value != null && (field.value == "" || field.value.replace(/^\s+|\s+$/g,"").length == 0)) {
        	alert(getMessage("key001", "部门名称"));
        	continueValidation = false;
        }
    }
    // field name: departmentInfo.deptSnm
    if (form.elements['departmentInfo.deptSnm']) {
        field = form.elements['departmentInfo.deptSnm'];
        if (continueValidation && field.value != null && (field.value == "" || field.value.replace(/^\s+|\s+$/g,"").length == 0)) {
        	alert(getMessage("key001", "部门略称"));
        	continueValidation = false;
        }
    }
    // field name: departmentInfo.parentDeptId
    if (form.elements['departmentInfo.parentDeptId']) {
        field = form.elements['departmentInfo.parentDeptId'];
        if (continueValidation && field.value != "") {
            var value = field.value;
                //trim field value
                while (value.substring(0,1) == ' ')
                    value = value.substring(1, value.length);
                while (value.substring(value.length-1, value.length) == ' ')
                    value = value.substring(0, value.length-1);
            if ((3 > -1 && value.length < 3) ||
                (3 > -1 && value.length > 3)) {
            	alert(getMessage("key015"));
            	continueValidation = false;
            }
        }
        
        if (continueValidation && field.value != "" && !field.value.match("[a-z0-9A-Z]{3}")) {
        	alert(getMessage("key016", "上级部门ID"));
        	continueValidation = false;
        } 
    }

    // field name: departmentInfo.leaderId
    if (form.elements['departmentInfo.leaderId']) {
        field = form.elements['departmentInfo.leaderId'];
        if (continueValidation && field.value != "") {
            var value = field.value;
                //trim field value
                while (value.substring(0,1) == ' ')
                    value = value.substring(1, value.length);
                while (value.substring(value.length-1, value.length) == ' ')
                    value = value.substring(0, value.length-1);
            if ((6 > -1 && value.length < 6) ||
                (6 > -1 && value.length > 6)) {
            	alert(getMessage("key017"));
            	continueValidation = false;
            }
        }
        
        if (continueValidation && field.value != "" && !field.value.match("19[8-9][0-9]{3}|20[0-9]{4}|[0]{6}")) {
        	alert(getMessage("key016", "部门主管ID"));
        	continueValidation = false;
        }
    }
    if (continueValidation) {
    	return false;
    } else{
    	return true;
    }
}

//
function parentDeptIdValidate(){
	form = document.getElementById("deptInfoForm");
    var continueValidation = true;
	
    if (form.elements['departmentInfo.parentDeptId']) {
        field = form.elements['departmentInfo.parentDeptId'];
        if (continueValidation && field.value != "") {
            var value = field.value;
                //trim field value
                while (value.substring(0,1) == ' ')
                    value = value.substring(1, value.length);
                while (value.substring(value.length-1, value.length) == ' ')
                    value = value.substring(0, value.length-1);
            if ((3 > -1 && value.length < 3) ||
                (3 > -1 && value.length > 3)) {
            	alert(getMessage("yds.com.warning.0003", "上级部门ID", "3"));
            	continueValidation = false;
            }
        }
        
        if (continueValidation && field.value != "" && !field.value.match("[a-z0-9A-Z]{3}")) {
        	alert(getMessage("yds.com.warning.0002", "上级部门ID"));
        	continueValidation = false;
        } 
    }
    if (continueValidation) {
    	return false;
    } else{
    	return true;
		document.getElementById('departmentInfo.parentDeptId').focus();
    }
}

//
function leaderIdValidate(){
	form = document.getElementById("deptInfoForm");
    var continueValidation = true;
	
   if (form.elements['departmentInfo.leaderId']) {
        field = form.elements['departmentInfo.leaderId'];
        if (continueValidation && field.value != "") {
            var value = field.value;
                //trim field value
                while (value.substring(0,1) == ' ')
                    value = value.substring(1, value.length);
                while (value.substring(value.length-1, value.length) == ' ')
                    value = value.substring(0, value.length-1);
            if ((6 > -1 && value.length < 6) ||
                (6 > -1 && value.length > 6)) {
            	alert(getMessage("yds.com.warning.0003", "部门主管ID", "6"));
            	continueValidation = false;
            }
        }
        
        if (continueValidation && field.value != "" && !field.value.match("19[8-9][0-9]{3}|20[0-9]{4}|[0]{6}")) {
        	alert(getMessage("yds.com.warning.0002", "部门主管ID"));
        	continueValidation = false;
        }
    }
    if (continueValidation) {
    	return false;
    } else{
    	return true;
    	document.getElementById('departmentInfo.leaderId').focus(); 
    }
}