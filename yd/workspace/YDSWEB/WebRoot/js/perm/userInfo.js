/*
 * @(#)userInfo.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */

/**
 * @fileoverview 用户基本信息画面JavaScript.
 *
 * @author chenyuer
 * @version 1.0
 */

/**
 * 操作状态枚举.0:无 1：新建 2：更改.
 */
var OperateEnum = {
	None: 0,
	Create: 1,
	Modify: 2
};

/**
 * 取消按钮枚举.0:用户信息检索栏的取消按钮 1：新建/变更用户信息栏的取消按钮.
 */
var CancleFlagEnum = {
	SearchCancle: 0,
	ModifyCancle: 1
};

/**
 * 当前操作状态.
 */
var g_operateFlag = OperateEnum.None;

/**
 * 画面onload.
 */
function initForm() {
	$('div_perm_userInfoUptView').hide();
	listColor('table_userList');
	$("submit").disable();
	$("modifyCancle").disable();
}

/**
 * 检索用户信息.
 */
function getUserInfo(){
	if (searchConditionValidate()) {
		//取得用户状态,员工属性,职位多选框的选中状态
		var userStateList = getCbxCheckedResult('div_userState');
		var empStatusList = getCbxCheckedResult('div_empStatus');
		var posList = getCbxCheckedResult('div_pos');
		
		//检索数据并刷新信息显示列表
		var url = 'queryUserInfoAction.action';
		var pars = $('userInfoSltForm').serialize() + '&uSCbxList=' + userStateList + '&eSCbxList=' + empStatusList + '&posCbxList=' + posList;
		new Ajax.Updater('div_perm_userInfoList', url, {
			parameters: pars,
			method: 'post',
			onLoading: function(){
			},
			onSuccess: function(response){
			},
			onFailure: function(request){
				reportError();
			},
			onComplete: function(request){
				freshRowIndex();
				// 重置列表颜色
				listColor('table_userList');
			}
		});
	}
	//新建/变更用户信息栏关闭
	if ($('div_perm_userInfoUptView').visible()) {
		$('div_perm_userInfoUptView').hide();
		if ($('modifyIcon').hasClassName('opt_FillRight')) {
			$('modifyIcon').removeClassName('opt_FillRight').addClassName('opt_FillDown');
		}
	}
	listColor('table_userList');
}


/**
 * 【取消】按钮事件.
 * @param {String} cancleFlag 取消按钮标识 
 */
function clearUserInfo(cancleFlag){
	if(cancleFlag == CancleFlagEnum.ModifyCancle){
		//新建/变更用户信息栏清空
		if (g_operateFlag!=OperateEnum.Modify) {
			$('UpdUserId').clear();
		}
 		$('UpdUserCPNm').clear();
 		$('UpdUserCNm').clear();
 		$('UpdUserJRNm').clear();
 		$('UpdUserJKNm').clear();
 		$('UpdUserJNm').clear();
 		$('UpdUserDMNm').clear();
 		$('UpdStartDate').clear();
		$('UpdUserEmail1').clear();
		$('UpdUserEmail2').clear();
		$('UpdUserDesp').clear();
		$('UpdDeptList').clear();
		$('UpdUserStateRadioList1').checked = true ;
		$('UpdEmpStatusRadioList1').checked = true ;
	}else if(cancleFlag == CancleFlagEnum.SearchCancle){
		//检索用户信息栏清空
		$('SltUserId').clear();
 		$('SltUserCPNm').clear();
 		$('SltUserCNm').clear();
 		$('SltStartDateFrom').clear();
 		$('SltStartDateTo').clear();
		$('SltDeptList').clear();
		clearCheckbox('div_userState');
		clearCheckbox('div_empStatus');
		clearCheckbox('div_pos');
	}else{
		reportError();
	}
}

/**
 * 新建用户信息.
 */
function createUserInfo(){
	
	// 处于编辑状态时
	if(!changeState()){
		return;
	}
	// 状态：新建
	g_operateFlag = OperateEnum.Create;
	
 	//新建/修改详细显示form文本框初始化
 	$('UpdUserId').clear();
 	$('UpdUserCPNm').clear();
 	$('UpdUserCNm').clear();
 	$('UpdUserJRNm').clear();
 	$('UpdUserJKNm').clear();
 	$('UpdUserJNm').clear();
 	$('UpdUserDMNm').clear();
 	$('UpdStartDate').clear();
	$('UpdUserEmail1').clear();
	$('UpdUserEmail2').clear();
	$('UpdUserDesp').clear();
	$('UpdDeptList').clear();
	$('UpdUserStateRadioList1').checked = true ;
	$('UpdEmpStatusRadioList1').checked = true ;
	
    //新建/修改详细信息可见
	if(!$('div_perm_userInfoUptView').visible()) {
    	resize('div_perm_userInfoUptView');
    }
	//新建/修改用户信息栏可编辑
	$('userInfoUpdForm').enable();
	
	$('submit').enable();
	$('modifyCancle').enable();
 	$('createBtn').disable();
}

/**
* 修改用户信息.
* @param {String} userId 用户ID.
*/
function modifyUserInfo(userId){
	
	// 处于编辑状态时
	if(!changeState()){
		return;
	}
	// 状态：更改
	g_operateFlag = OperateEnum.Modify;
	//用户信息检索栏关闭
	$('div_perm_userInfoSltView').hide();
	// 重置列表颜色
	listColor('table_userList');
	//该行变色标记
	selectLine('table_userList');
		
	// 修改用户信息
	var url = 'referUserInfoAction.action';
	var pars = 'userInfo.userId='+userId;
	new Ajax.Updater('div_perm_userInfoUptView', url, {
		parameters: pars,
		method: 'post',
		onLoading: function(){
		},
		onSuccess: function(response){
		},
		onFailure: function(request){
			reportError();
		},
		onComplete: function(request){
 			$('createBtn').enable();
			//新建/变更用户信息栏表示且不可更改
			$('div_perm_userInfoUptView').show();
			$('UpdUserId').value = $F('UpdUserId').substring(2);
			$('UpdUserId').disable();
			
		}
	});
}

/**
* 参照用户信息.
* @param {String} userId 用户ID.
*/
function referUserInfo(userId){
	
	// 处于编辑状态时
	if(!changeState()){
		return;
	}
	// 状态：无
	g_operateFlag = OperateEnum.None;
	//用户信息检索栏关闭
	$('div_perm_userInfoSltView').hide();
	// 重置列表颜色
	listColor('table_userList');
	//该行变色标记
	selectLine('table_userList');
	
	// 修改用户信息
	var url = 'referUserInfoAction.action';
	var pars = 'userInfo.userId='+userId;
	new Ajax.Updater('div_perm_userInfoUptView', url, {
		parameters: pars,
		method: 'post',
		onLoading: function(){
		},
		onSuccess: function(response){
		},
		onFailure: function(request){
			reportError();
		},
		onComplete: function(request){
 			$('createBtn').enable();
			//新建/变更用户信息栏表示且不可更改
			$('div_perm_userInfoUptView').show();
			$('userInfoUpdForm').disable();
		}
	});   
}

/**
* 删除用户信息.
* @param {String} userId 用户ID.
*/
function deleteUserInfo(userId){
	
	// 处于编辑状态时
	if(!changeState()){
		return;
	}
    //获得当前行号
	var rowIndex = $(event.srcElement).up('tr', 0).rowIndex;
	
	//页面提交函数，提交到deleteUserInfoAction
	if(confirm(getMessage('js.com.info.0001'))){
		var url = 'deleteUserInfoAction.action';
		var pars = 'userId='+encodeURI(userId);
		new Ajax.Request(url, {
			parameters : pars,
			method : 'get',
			onComplete : function(request) {
	 		//删除error时弹出错误提示框
	 			if (request.responseText.empty()) {
					alert(getMessage('js.com.info.0011'));
	 			} else {
					//列表显示总人数减一
					$('userInfoCnt').innerHTML--;
	 				//行删除
					table_userList.deleteRow(rowIndex);
					//重新显示行号
	 				freshRowIndex();
					// 重置列表颜色
					listColor('table_userList');
					//状态：无
					g_operateFlag = OperateEnum.None;
	 			}
			},
			onFailure : reportError
		});   
	}else{
    	// 重置列表颜色
		listColor('table_userList');
   }
}

/**
 * 提交用户信息.
 */
function submitUserInfo() {
	// 输入校验
	if (!conditionValidate()) {
		return;
	}	
	// 修改状态下
	if (g_operateFlag == OperateEnum.Modify) {
		submitModify();
		
	// 新建状态下
	} else if (g_operateFlag == OperateEnum.Create) {
		submitCreate();
	}
}

/**
* 提交修改表单.
*/
function submitModify(){
	// 页面提交updateUserInfoAction
	if (confirm(getMessage('js.com.info.0003'))) {
		var url = 'updateUserInfoAction.action';
		var pars = 'userInfo.userId=' + $F('UpdUserId') + '&' + $('userInfoUpdForm').serialize();
		//pars = addToken(pars);
		new Ajax.Updater('div_perm_userInfoList', url, {
			method: 'post',
			parameters: pars,
			onComplete: modifyUserInfoBack,
			onFailure: reportError
		});
	}
}

/**
* 提交新建表单.
*/
function submitCreate(){

	// 页面提交insertUserInfoAction
	if (confirm(getMessage('js.com.info.0002'))) {
		var url = 'insertUserInfoAction.action';
		var pars = $('userInfoUpdForm').serialize();
		//pars = addToken(pars);
		new Ajax.Updater('div_perm_userInfoList', url, {
			method: 'post',
			parameters: pars,
			onComplete: creatUserInfoBack,
			onFailure: reportError
		});
	}
}

/**
 * 修改用户信息回调函数
 * @param {Object} request
 */
function modifyUserInfoBack(request){
	//重新显示行号
	freshRowIndex();
	// 重置列表颜色
	listColor('table_userList');
	if (!$F('insertFlag').empty()) {
		alert(getMessage('js.com.warning.0005', '用户ID'));
	}else {
		g_operateFlag = OperateEnum.None;
		clearUserInfo(CancleFlagEnum.ModifyCancle);
		//新建按钮可用,提交,取消按钮不可用
		$('createBtn').enable();
		$('submit').disable();
		$('modifyCancle').disable();
		//新建/变更，检索信息栏关闭
		$('div_perm_userInfoUptView').hide();
		$('div_perm_userInfoSltView').hide();
		
	}
}
/**
 * 新建用户信息回调函数
 * @param {Object} request
 */
function creatUserInfoBack(request){
	//重新显示行号
	freshRowIndex();
	// 重置列表颜色
	listColor('table_userList');
	if (!$F('insertFlag').empty()) {
		alert(getMessage('js.com.warning.0005', '用户ID'));
	}else {
		g_operateFlag = OperateEnum.None;
		clearUserInfo(CancleFlagEnum.ModifyCancle);
		//新建按钮可用,提交,取消按钮不可用
		$('createBtn').enable();
		$('submit').disable();
		$('modifyCancle').disable();
		//新建/变更，检索信息栏关闭
		$('div_perm_userInfoUptView').hide();
		$('div_perm_userInfoSltView').hide();
	}
}


/**
* 系统错误处理.
*/
function reportError() {
	alert(getMessage('js.com.error.0001'));
}

/**
 * 信息栏展开收缩.
 */
function resize(view) {
	$(view).toggle();
	if (view == 'div_perm_userInfoUptView') {
		// 更改图标及提示文字
		if ($('modifyIcon').hasClassName('opt_FillRight')) {
			$('modifyIcon').removeClassName('opt_FillRight').addClassName('opt_FillDown');
		}
		else {
			$('modifyIcon').removeClassName('opt_FillDown').addClassName('opt_FillRight');
		}
	}else{
		if ($('searchIcon').hasClassName('opt_FillRight')) {
			$('searchIcon').removeClassName('opt_FillRight').addClassName('opt_FillDown');
		}
		else {
			$('searchIcon').removeClassName('opt_FillDown').addClassName('opt_FillRight');
		}
	}
	
}

/**
 * 编辑状态判断
 * @return Boolean true:false.
 */
function changeState(){
	// 处于编辑状态时
	if (g_operateFlag != OperateEnum.None) {
		if (confirm(getMessage('js.com.info.0005'))) {
			clearUserInfo(CancleFlagEnum.ModifyCancle);
		}else{
			return false;
		}
	}
	return true;	
}

/**
 * 刷新显示行号
 */
function freshRowIndex(){
	var rowCnt = $('table_userList').rows.length;
	//遍历除表头以外的所有行,并为其添加行号
	for(var i=1;i<rowCnt;i++){
		$('table_userList').rows.item(i).cells.item(0).innerHTML = i;
	}
}
/**
 * 清空一组单选框
 * @param {String} container 
 *                 装载多选框的容器.
 */
function clearCheckbox(container){
	//以checkbox为元素的数组
	var cbxList = $(container).getElementsByTagName('input');
	//循环拼接成由被选中的checkbox对应的区分名称组成的字符串
	for(var i=0;i<cbxList.length;i++){
		cbxList.item(i).checked = false;
	}
}



/**
 * 取得多选框选取结果公共函数
 * @param {String} container 
 *                 装载多选框的容器.
 * @return {String} checkedRltStr 
 *                  被选中的checkbox对应的区分名称组成的字符串.
 */
function getCbxCheckedResult(container){
	//以checkbox为元素的数组
	var cbxList = $(container).getElementsByTagName('input');
	//需要返回的字符串
	var checkedRltStr = '';
	//循环拼接成由被选中的checkbox对应的区分名称组成的字符串
	for(var i=0;i<cbxList.length;i++){
		if(cbxList.item(i).type == 'checkbox' && cbxList.item(i).checked){
			checkedRltStr = checkedRltStr + ';' + $F(cbxList.item(i)) ;
		}
	}
	//去除拼接好的字符串中第一位的分号
	if('' != checkedRltStr){
		checkedRltStr = checkedRltStr.substring(1);
	}
	return checkedRltStr;
}

/**
 * 用户信息检索条件输入校验.
 * @return Boolean true:false.
 */
function searchConditionValidate() {

	//需校验的form
    form = $('userInfoSltForm');
    
	//用户ID(检索用)输入校验
	if(!searchUserIdValidation(form)){
		if(g_operateFlag != OperateEnum.Modify){
			$('SltUserId').focus();
		}
		return false;	
	}
	
	//用户姓名(拼音)输入校验      
	if(!userCPNmValidate(form,false)){
		$('SltUserCPNm').focus();
		return false;	
	}
	
	return true;
}
/**
 * 用户信息新规/变更输入校验.
 * @return Boolean true:false.
 */
function conditionValidate() {
	
	//需校验的form
    form = $('userInfoUpdForm');
    
    //用户ID输入校验
	if(!modifyUserIdValidate(form)){
		$('UpdUserId').focus();
		return false;	
	}
	
	//用户姓名(拼音)输入校验
	if(!userCPNmValidate(form,true)){
		$('UpdUserCPNm').focus();
		return false;	
	}
	
	//用户中文姓名输入校验
	if(!userCnmValidate(form)){
		$('UpdUserCNm').focus();
		return false;	
	}
	
	//域用户名输入校验
	if(!userDMNmValidate(form)){
		$('UpdUserDMNm').focus();
		return false;	
	}
	
	//入社日期输入校验
	if(!startDateValidate(form)){
		$('UpdStartDate').focus();
		return false;	
	}
	
	//社内信箱输入校验
	if(!userEmail1Validate(form)){
		$('UpdUserEmail1').focus();
		return false;	
	}
	
	//社外信箱输入校验
	if(!userEmail2Validate(form)){
		$('UpdUserEmail2').focus();
		return false;	
	}
	
	return true;
}

/**
 * 用户ID输入校验(检索用户信息用).
 * @param 校验控件所在的容器(form)名.
 * @return Boolean true:false.
 */
function searchUserIdValidation(form){
	//校验状态标记
    var continueValidation = true;
    //用户ID输入长度校验
    if (form.elements['userInfo.userId']) {
        field = form.elements['userInfo.userId'];
        if (continueValidation && field.value != '') {
            var value = field.value;
                //trim field value
                while (value.substring(0,1) == ' ')
                    value = value.substring(1, value.length);
                while (value.substring(value.length-1, value.length) == ' ')
                    value = value.substring(0, value.length-1);
            if ((0 > -1 && value.length < 0) ||
                (6 > -1 && value.length > 6)) {
                alert(getMessage('js.com.warning.0003', '用户ID', '6'));
                continueValidation = false;
            }
        }
    }
    //用户ID合法性校验
    if (form.elements['userInfo.userId']) {
        field = form.elements['userInfo.userId'];
        if (continueValidation && field.value != '' && !field.value.match('^[0-9]{0,6}$')) {
            alert(getMessage('js.com.warning.0002', '用户ID'));
            continueValidation = false;
        }
    }
	if (continueValidation) {
		return true;
	} else {
		return false; 
	}
}

/**
 * 用户ID输入校验(新建/变更用户信息用).
 * @param 校验控件所在的容器(form)名.
 * @return Boolean true:false.
 */
function modifyUserIdValidate(form){
	//校验状态标记
	var continueValidation = true;
	//用户ID非空校验
	if (form.elements['userInfo.userId']) {
		field = form.elements['userInfo.userId'];
		if (continueValidation && field.value != null && (field.value == '' || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
			alert(getMessage('js.com.warning.0001', '用户ID'));
			continueValidation = false;
		}
	}
    //用户ID输入长度校验
    if (form.elements['userInfo.userId']) {
        field = form.elements['userInfo.userId'];
		if (continueValidation && field.value != null) {
           var value = field.value;
               //trim field value
               while (value.substring(0,1) == ' ')
                   value = value.substring(1, value.length);
               while (value.substring(value.length-1, value.length) == ' ')
                   value = value.substring(0, value.length-1);
                if ((6 > -1 && value.length < 6) ||
                    (6 > -1 && value.length > 6)) {
                    alert(getMessage('js.com.warning.0003', '用户ID', '6'));
                	continueValidation = false;
                }
            }
    }
    //用户ID合法性校验
    if (form.elements['userInfo.userId']) {
        field = form.elements['userInfo.userId'];
        if (continueValidation && field.value != '' && !field.value.match('^[0-9]{0,6}$')) {
            alert(getMessage('js.com.warning.0002', '用户ID'));
            continueValidation = false;
        }
    }
	
	if (continueValidation) {
		return true;
	} else {
		return false; 
	}
}

/**
 * 用户姓名(拼音)输入校验.
 * @param form :校验控件所在的容器(form)名.
 * @param required :是否进行非空校验.
 * @return Boolean true:false.
 */
function userCPNmValidate(form,required){
	var continueValidation = true;//校验状态标记
	if (required == true) {
		//姓名(拼音)非空校验
		if (form.elements['userInfo.userCPNm']) {
			field = form.elements['userInfo.userCPNm'];
			if (continueValidation && field.value != null && (field.value == '' || field.value.replace(/^\s+|\s+$/g, '').length == 0)) {
				alert(getMessage('js.com.warning.0001', '姓名(拼音)'));
				continueValidation = false;
			}
		}
	}
    //姓名(拼音)合法性校验        
    if (form.elements['userInfo.userCPNm']) {
        field = form.elements['userInfo.userCPNm'];
        if (continueValidation && field.value != '' && !field.value.match('^[a-zA-Z]{0,30}$')) {
            alert(getMessage('js.com.warning.0002', '姓名(拼音)'));
            continueValidation = false;
        }
    }
	
	if (continueValidation) {
		return true;
	} else {
		return false; 
	}
}

/**
 * 用户中文姓名输入校验.
 * @param 校验控件所在的容器(form)名.
 * @return Boolean true:false.
 */
function userCnmValidate(form){
	var continueValidation = true;//校验状态标记
	//中文姓名非空校验
    if (form.elements['userInfo.userCnm']) {
        field = form.elements['userInfo.userCnm'];
        if (continueValidation && field.value != null && (field.value == '' || field.value.replace(/^\s+|\s+$/g,'').length == 0)) {
            alert(getMessage('js.com.warning.0001', '中文姓名'));
			continueValidation = false;      
        }
    }
	
	if (continueValidation) {
		return true;
	} else {
		return false; 
	}
}

/**
 * 域用户名输入校验.
 * @param 校验控件所在的容器(form)名.
 * @return Boolean true:false.
 */
function userDMNmValidate(form){
	var continueValidation = true;//校验状态标记
	//域用户名非空校验
	if (form.elements['userInfo.userDMNm']) {
        field = form.elements['userInfo.userDMNm'];
        if (continueValidation && field.value != null && (field.value == '' || field.value.replace(/^\s+|\s+$/g,'').length == 0)) {
            alert(getMessage('js.com.warning.0001', '域用户名'));
			continueValidation = false; 
                
        }
    }
	//域用户名合法性校验
	if (form.elements['userInfo.userDMNm']) {
        field = form.elements['userInfo.userDMNm'];
        if (continueValidation && field.value != null && !field.value.match('^\\w+@yds\.yd$')) {
            alert(getMessage('js.com.warning.0002', '域用户名'));
            continueValidation = false;          
        }
    }
	
	if (continueValidation) {
		return true;
	} else {
		return false; 
	}
}
/**
 * 入社日期输入校验.
 * @param 校验控件所在的容器(form)名.
 * @return Boolean true:false.
 */
function startDateValidate(form){
	var continueValidation = true;//校验状态标记
	//入社日期非空校验
	if (form.elements['userInfo.startDate']) {
        field = form.elements['userInfo.startDate'];
        if (continueValidation && field.value != null && (field.value == '' || field.value.replace(/^\s+|\s+$/g,'').length == 0)) {
            alert(getMessage('js.com.warning.0001', '入社日期'));
			continueValidation = false;            
        }
    }
	
	if (continueValidation) {
		return true;
	} else {
		return false; 
	}
}
/**
 * 社内信箱输入校验.
 * @param 校验控件所在的容器(form)名.
 * @return Boolean true:false.
 */
function userEmail1Validate(form){
	var continueValidation = true;//校验状态标记
	//社内信箱格式校验
	if (form.elements['userInfo.userEmail1']) {
        field = form.elements['userInfo.userEmail1'];
        if (continueValidation && field.value != null && !field.value.match("^(([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\\.[a-zA-Z0-9_-]{2,3}){1,2}))?$")) {
            alert(getMessage('js.com.warning.0002', '社内信箱'));
			continueValidation = false;     
        }
    }
	
	if (continueValidation) {
		return true;
	} else {
		return false; 
	}
}
/**
 * 社外信箱输入校验.
 * @param 校验控件所在的容器(form)名.
 * @return Boolean true:false.
 */
function userEmail2Validate(form){
	var continueValidation = true;//校验状态标记
	//社外信箱格式校验
	if (form.elements['userInfo.userEmail2']) {
        field = form.elements['userInfo.userEmail2'];
        if (continueValidation && field.value != null && !field.value.match("^(([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\\.[a-zA-Z0-9_-]{2,3}){1,2}))?$")) {
            alert(getMessage('js.com.warning.0002', '社外信箱')); 
			continueValidation = false;       
        }
    }
	
	if (continueValidation) {
		return true;
	} else {
		return false; 
	}
}
