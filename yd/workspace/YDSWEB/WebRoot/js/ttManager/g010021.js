/*
 * @(#)g010021.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试系统权限管理
 */
/**
 * @fileoverview 权限管理JavaScript.
 *
 * @author guozhizhou
 * @version 1.0
 */
function nTabs(thisObj, Num){
    $('parameter').value = Num;
    if ($(thisObj).className == "active") 
        return;
    var tabObj = $(thisObj).parentNode.id;
    var tabList = $(tabObj).select('li');
    for (i = 0; i < tabList.length; i++) {
        if (i == Num) {
            if (i == tabList.length - 1) {
                $(thisObj).className = 'active bd_r_1sccc';
            }
            else {
                $(thisObj).className = 'active';
            }
            $(tabObj + '_Content' + i).setStyle({
                display: 'block'
            });
        }
        else {
            if (i == tabList.length - 1) {
                tabList[i].className = 'normal bd_r_1sccc';
            }
            else {
                tabList[i].className = 'normal';
            }
            $(tabObj + '_Content' + i).setStyle({
                display: 'none'
            });
        }
    }
}

/**
 * 操作状态枚举.0:无 1：维护权限修改 2：其他权限修改.
 */
var OperateEnum = {
    None: 0,
    Modify: 1,
    Other: 2
};

/**
 * 分页全局变量.0:维护权限修改 1：其他权限修改 2：权限申请查看.
 */
var SimpleNum = {
    Maintenance: 0,
    Assignment: 1,
    Application: 2
};

/**
 * 当前操作状态.
 */
var g_pagerFlag = SimpleNum.Maintenance;

/**
 * 当前编辑行号
 */
var cur_user_id = "";

/**
 * 当前操作状态.
 */
var g_operateFlag = OperateEnum.None;

/**
 * 分页时使用的ajax提交函数.
 * @param {Object} pageUrl
 * @param {Object} pageNumber
 */
function pagerCommonTag(pageUrl, pageNumber){
    if (g_pagerFlag == SimpleNum.Maintenance) {
        from = "maintenanceFrom";
        list = "table_dateAList";
    }
    else 
        if (g_pagerFlag == SimpleNum.Assignment) {
            from = "otherJurisdictionForm";
            list = "table_dateOtherList";
        }
    
    // 显示加载动画
	showLoader();
	
    var url = pageUrl;
    var pars = $(from).serialize() + '&pageNumber=' + pageNumber;
    pars = addStamp(pars);
    new Ajax.Updater(list, url, {
        method: 'get',
        parameters: pars,
        onSuccess: function(request){
        },
        onComplete: function(request){
			var flg = checkException(request);
			if (!flg) {
				
                // 隐藏加载动画
                hideLoader();
			}
		},
        onFailure: reportError
    });
}

/**
 * 画面onload.
 */
function G010021initForm(){
    // 显示加载动画
	showLoader();
    
    initTtJsNameFilter('userIdNum_0', 'userNm_0');
    initTtJsNameFilter('userIdNum_1', 'userNm_1');
    listColor('g010021_maintenanceList');
    $('sltCategory1').focus();
    initCategoryList('g010021', '0', 1, true, '0', 'sltCategory1', 'sltCategory2', 'sltCategory3', '1', '1');
    if ($('parameter').value == null || $('parameter').value == '') {
        $('parameter').value = 0;
    }
    
    nTabs($('tab' + $('parameter').value), $('parameter').value);
    // 开始与结束日期校验 
    addCustomCheck($('startTimeNm_0'), getMessage('js.com.warning.0006'), 'startTimeNm_0', function compareInputTime(){
        if (compareTime($('startTimeNm_0'), $('endTimeNm_0'))) {
            removeFieldError($('endTimeNm_0'));
        }
        return compareTime($('startTimeNm_0'), $('endTimeNm_0'));
    });
    
    addCustomCheck($('endTimeNm_0'), getMessage('js.com.warning.0006'), 'endTimeNm_0', function compareInputTime(){
        if (compareTime($('startTimeNm_0'), $('endTimeNm_0'))) {
            removeFieldError($('startTimeNm_0'));
        }
        return compareTime($('startTimeNm_0'), $('endTimeNm_0'));
    });
	
    // 隐藏加载动画
    hideLoader();
}

/**
 * 权限申请查看按钮事件.
 * @param {Object} subWinUrl 弹出新窗口参数
 */
function openApplication(subWinUrl){

    window.open(subWinUrl, 'pars', 'width=830,height=600');

    // 画面状态
    g_operateFlag = OperateEnum.None;
    
}

/**
 * 维护权限分配页面显示.
 * @param {Object} thisObj 选项卡参数
 * @param {Object} Num 选项卡号
 */
function search(thisObj, Num){

    // 处于编辑状态时
    if (g_operateFlag == OperateEnum.Modify) {
        return;
    }
    else 
        if (g_operateFlag != OperateEnum.None) {
        
            if (confirm(getMessage('js.tt.warn.GLW10'))) {
				nTabs(thisObj, Num);
			}
			else {
				return;
			}
        }
    nTabs(thisObj, Num);
    
    // 显示加载动画
	showLoader();
	
    var url = 'g010021PagedMaintPermList.action';
    var pars = $('maintenanceFrom').serialize() + '&pageNumber=1';
    pars = addStamp(pars);
    g_operateFlag = OperateEnum.None;
    
    // 设定分页枚举状态
    g_pagerFlag = SimpleNum.Maintenance;
    new Ajax.Updater('table_dateAList', url, {
        method: 'get',
        parameters: pars,
        onSuccess: function(request){
        },
        onFailure: reportError,
        onComplete: function(request){
			var flg = checkException(request);
			if (!flg) {
			
				// 重置列表颜色
				listColor('g010021_maintenanceList');
				clearError('maintenanceFrom');
				
                // 隐藏加载动画
                hideLoader();
			}
		}
        
    });
    // 开始与结束日期校验 
    addCustomCheck($('startTimeNm_0'), getMessage('js.com.warning.0006'), 'startTimeNm_0', function compareInputTime(){
        if (compareTime($('startTimeNm_0'), $('endTimeNm_0'))) {
            removeFieldError($('endTimeNm_0'));
        }
        return compareTime($('startTimeNm_0'), $('endTimeNm_0'));
    });
    
    addCustomCheck($('endTimeNm_0'), getMessage('js.com.warning.0006'), 'endTimeNm_0', function compareInputTime(){
        if (compareTime($('startTimeNm_0'), $('endTimeNm_0'))) {
            removeFieldError($('startTimeNm_0'));
        }
        return compareTime($('startTimeNm_0'), $('endTimeNm_0'));
    });
}

/**
 * 其他权限分配检索事件.
 * @param {Object} thisObj 选项卡参数
 * @param {Object} Num 选项卡号
 */
function searchOther(thisObj, Num){

    // 处于编辑状态时
    if (g_operateFlag == OperateEnum.Other) {
        return;
    }
    else 
        if (g_operateFlag != OperateEnum.None) {
           if(confirm(getMessage('js.tt.warn.GLW10'))){
		   	   nTabs(thisObj, Num);
		   }else{
		   	   return;
		   }
        }
    
    // 显示加载动画
	showLoader();
	
    nTabs(thisObj, Num);
    var url = 'g010021SearchOtherPermList.action';
    var pars = $('otherJurisdictionForm').serialize() + '&pageNumber=1';
    pars = addStamp(pars);
    
    // 设定分页枚举状态
    g_pagerFlag = SimpleNum.Assignment;
    
    // 设定状态
    g_operateFlag = OperateEnum.None;
    clearError('otherJurisdictionForm');
    
    // 设定焦点位置
    $('userIdNum_1').focus();
    new Ajax.Updater('table_dateOtherList', url, {
        method: 'get',
        parameters: pars,
        onSuccess: function(request){
        },
        onFailure: reportError,
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
				
                // 重置列表颜色
            	listColor('g010021_otherJurisdictionList');
                
                // 隐藏加载动画
                hideLoader();
            }
        }
    });
	
    // 开始与结束日期校验 
    addCustomCheck($('startTimeNm_1'), getMessage('js.com.warning.0006'), 'startTimeNm_1', function compareInputTime(){
        if (compareTime($('startTimeNm_1'), $('endTimeNm_1'))) {
            removeFieldError($('endTimeNm_1'));
        }
        return compareTime($('startTimeNm_1'), $('endTimeNm_1'));
    });
    
    addCustomCheck($('endTimeNm_1'), getMessage('js.com.warning.0006'), 'endTimeNm_1', function compareInputTime(){
        if (compareTime($('startTimeNm_1'), $('endTimeNm_1'))) {
            removeFieldError($('startTimeNm_1'));
        }
        return compareTime($('startTimeNm_1'), $('endTimeNm_1'));
    });
}

/**
 * 密码修改事件.
 * @param {Object} thisObj 选项卡参数
 * @param {Object} Num 选项卡号
 */
function searchPassword(thisObj, Num){

    // 处于编辑状态时
    if (g_operateFlag != OperateEnum.None) {
    
         if( confirm(getMessage('js.tt.warn.GLW10'))){
		   	 nTabs(thisObj, Num);
		   }else{
		   	   return;
		   }
    }
    nTabs(thisObj, Num);
    g_operateFlag = OperateEnum.None;
    
    // 设定焦点位置
    $('oldAdminId').focus();
    clearError('passwordForm');
}

/**
 * 维护权限分配【清空】按钮事件.
 */
function maintenanceClear(){

    // 清空确认信息
    if (confirm(getMessage('js.tt.warn.GLW09'))) {
    
        // 维护权限详细信息清空
        $('userIdNum_0').clear();
        $('userNm_0').clear();
        $('authorityList').value = 1;
        $('startTimeNm_0').clear();
        $('endTimeNm_0').clear();
         initCategoryList('g010021', '0', 1, true, '0', 'sltCategory1', 'sltCategory2', 'sltCategory3', '1', '1');
    }
    
    // 设定焦点位置
    $('sltCategory1').focus();
    clearError('maintenanceFrom');
}

/**
 * 其他权限分配【清空】按钮事件.
 */
function otherJurisdictionClear(){

    // 清空确认信息
    if (confirm(getMessage('js.tt.warn.GLW09'))) {
    
        // 其他权限详细信息清空
        $('userIdNum_1').clear();
        $('userNm_1').clear();
        $('authorityOtherList').value = 4;
        $('startTimeNm_1').clear();
        $('endTimeNm_1').clear();
    }
    
    // 设定焦点位置
    $('userIdNum_1').focus();
    clearError('otherJurisdictionForm');
}

/**
 * 密码维护【清空】按钮事件.
 */
function passwordClear(){

    // 清空确认信息
    if (confirm(getMessage('js.tt.warn.GLW09'))) {
    
        // 密码维护详细信息清空
        $('oldAdminId').clear();
        $('oldAdminPsw').clear();
        $('newAdminId').clear();
        $('newAdminPsw').clear();
        $('passwordConfim').clear();
        
        // 设定焦点位置
        $('oldAdminId').focus();
        clearError('passwordForm');
    }
}

/**
 * 维护权限分配添加数据.
 * @param {Object} tab 参数0
 */
function submitCreate(tab){

    // 页面提交g010021AddMaintPerm
    if (checkForm('maintenanceFrom')) {
        if (confirm(getMessage('js.com.info.0002'))) {
            // 显示加载动画
        	showLoader();
        	
            var url = 'g010021AddMaintPerm.action';
            var pars = $('maintenanceFrom').serialize();
			pars = addStamp(pars);
            new Ajax.Updater('table_dateAList', url, {
                method: 'post',
                parameters: pars,
                onSuccess: function(response){
                    showOpTip(getMessage('js.tt.info.GTT02'));
                },
                onComplete: function(response){
                    var flg = checkException(response);
                    if (!flg) {
                        // 重置列表颜色
                        listColor('table_dateAList');
                        
                        // 维护权限详细信息清空
                        $('userIdNum_0').clear();
                        $('userNm_' + tab).clear();
                        $('startTimeNm_' + tab).clear();
                        $('endTimeNm_' + tab).clear();
                         initCategoryList('g010021', '0', 1, true, '0', 'sltCategory1', 'sltCategory2', 'sltCategory3', '1', '1');
                        
                        // 设定焦点位置
                        $('sltCategory1').focus();
						
	                    // 隐藏加载动画
	                    hideLoader();
	                    
						// add by zhanghaibo 7/13
						new Ajax.Updater('div_head', 'g010021RefreshHead.action', {
							method: 'get',
                			parameters: addStamp(''),
							onComplete: function(response) {
								var flg = checkException(response);
							}
						});
                    }
                },
                onFailure: reportError
            });
			
			
        }
    }
}

/**
 * 其他权限分配添加数据.
 * @param {Object} tab 参数1
 */
function submitCreateOther(tab){

    // 页面提交g010021AddOtherPerm
    if (checkForm('otherJurisdictionForm')) {
        if (confirm(getMessage('js.com.info.0002'))) {
            // 显示加载动画
        	showLoader();
        	
            var url = 'g010021AddOtherPerm.action';
            var pars = $('otherJurisdictionForm').serialize();
			pars = addStamp(pars);
            new Ajax.Updater('table_dateOtherList', url, {
                method: 'post',
                parameters: pars,
                onSuccess: function(response){
                    showOpTip(getMessage('js.tt.info.GTT02'));
                },
                onComplete: function(response){
                    var flg = checkException(response);
                    if (!flg) {
                    
                        // 重置列表颜色
                        listColor('table_dateOtherList');
                        
                        // 其他权限详细信息清空
                        $('userIdNum_1').clear();
                        $('userNm_' + tab).clear();
                        $('startTimeNm_' + tab).clear();
                        $('endTimeNm_' + tab).clear();
                        
                        // 设定焦点位置
                        $('userIdNum_1').focus();
						
	                    // 隐藏加载动画
	                    hideLoader();
	                    
						// add by zhanghaibo 7/13
						new Ajax.Updater('div_head', 'g010021RefreshHead.action', {
							method: 'get',
                			parameters: addStamp(''),
							onComplete: function(response) {
								var flg = checkException(response);
							}
						});
                    }
                },
                onFailure: reportError
            });
        }
    }
}

/**
 * 维护权限分配保存修改数据.
 * @param {Object} rowIndex 行数
 */
function saveModify(rowIndex){
    if (checkForm('maintenanceListFrom')) {
        
        // 页面提交g010021UpdMaintPerm
        if (confirm(getMessage('js.com.info.0003'))) {
            // 显示加载动画
        	showLoader();
        	
            var rowinner = $('userIdNum' + rowIndex).childElements()[0];
            var start = $('start' + rowIndex);
            var end = $('end' + rowIndex);
            var relatedobjectId = $('relatedobjectId' + rowIndex).childElements()[0];
            var authorityId = $('authorityId' + rowIndex).childElements()[0];
            var sltCategory1 = $('sltCategory1' + rowIndex).childElements()[0];
            var sltCategory2 = $('sltCategory2' + rowIndex).childElements()[0];
            var sltCategory3 = $('sltCategory3' + rowIndex).childElements()[0];
            var startTime = $('startTime' + rowIndex).childElements()[0];
            var url = 'g010021UpdMaintPerm.action';
            
            // 需要手动添加
            var pars = 'g010021aInfo.userIdNum=' + rowinner.innerHTML + '&' +
            'g010021aInfo.relatedobjectId=' +
            relatedobjectId.innerHTML +
            '&' +
            'g010021aInfo.authorityId=' +
            authorityId.innerHTML +
            '&' +
            'g010021aInfo.sltCategory1=' +
            sltCategory1.innerHTML +
            '&' +
            'g010021aInfo.sltCategory2=' +
            sltCategory2.innerHTML +
            '&' +
            'g010021aInfo.sltCategory3=' +
            sltCategory3.innerHTML +
            '&' +
            'g010021aInfo.startTime=' +
            startTime.innerHTML +
            '&' +
            'g010021aInfo.startTimeNm=' +
            start.childElements()[0].value +
            '&' +
            'g010021aInfo.endTimeNm=' +
            end.childElements()[0].value;
            pars = addStamp(pars);
            new Ajax.Updater('table_dateAList', url, {
                method: 'post',
                parameters: pars,
                onSuccess: function(response){
                    showOpTip(getMessage('js.tt.info.GTT02'));
                },
                onComplete: function(response){
                    var flg = checkException(response);
                    if (!flg) {
                    
                        // 重置列表颜色
                        listColor('g010021_maintenanceList');
                        
                        g_operateFlag = OperateEnum.None;
                        
                        // 隐藏加载动画
                        hideLoader();
                        
						// add by zhanghaibo 7/13
						new Ajax.Updater('div_head', 'g010021RefreshHead.action', {
							method: 'get',
                			parameters: addStamp(''),
							onComplete: function(response) {
								var flg = checkException(response);
							}
						});
                    }
                }
            });
        }
        else {
            return;
        }
        
        // 修改按钮名
        $('save' + rowIndex).addClassName('none');
        $('mod' + rowIndex).removeClassName('none');
        $('cancel' + rowIndex).addClassName('none');
        $('delete' + rowIndex).removeClassName('none');
        
        // 设定焦点位置
        $('sltCategory1').focus();
    }
}

/**
 * 其他权限分配保存修改数据.
 * @param {Object} rowIndex 行数
 */
function saveModifyOther(rowIndex){

    // 其他权限分配保存校验
    if (checkForm('otherJurisdictionListForm')) {
    
        if ($('startOtherId' + rowIndex).value == "") {
            addFieldError($('startOtherId' + rowIndex), '开始时间不能为空');
            return;
        }
        
        // 页面提交g010021UpdOtherPerm
        if (confirm(getMessage('js.com.info.0003'))) {
            // 显示加载动画
        	showLoader();
        	
            var rowinner = $('userIdNumOther' + rowIndex).childElements()[0];
            var start = $('startOther' + rowIndex);
            var end = $('endOther' + rowIndex);
            var relatedobjectId = $('relatedobjectIdOther' + rowIndex).childElements()[0];
            var authorityId = $('authorityIdOther' + rowIndex).childElements()[0];
            var sltCategory1 = $('sltCategory1Other' + rowIndex).childElements()[0];
            var sltCategory2 = $('sltCategory2Other' + rowIndex).childElements()[0];
            var sltCategory3 = $('sltCategory3Other' + rowIndex).childElements()[0];
            var startTime = $('startTimeOther' + rowIndex).childElements()[0];
            var url = 'g010021UpdOtherPerm.action';
            
            // 修改状态下userIdNum被禁用，serialize方法无法取到，需要手动添加
            var pars = 'g010021aInfo.userIdNum=' + rowinner.innerHTML + '&' +
            'g010021aInfo.relatedobjectId=' +
            relatedobjectId.innerHTML +
            '&' +
            'g010021aInfo.authorityId=' +
            authorityId.innerHTML +
            '&' +
            'g010021aInfo.sltCategory1=' +
            sltCategory1.innerHTML +
            '&' +
            'g010021aInfo.sltCategory2=' +
            sltCategory2.innerHTML +
            '&' +
            'g010021aInfo.sltCategory3=' +
            sltCategory3.innerHTML +
            '&' +
            'g010021aInfo.startTime=' +
            startTime.innerHTML +
            '&' +
            'g010021aInfo.startTimeNm=' +
            start.down().value +
            '&' +
            'g010021aInfo.endTimeNm=' +
            end.down().value;
			pars = addStamp(pars);
            new Ajax.Updater('table_dateOtherList', url, {
                method: 'post',
                parameters: pars,
                onSuccess: function(response){
                    showOpTip(getMessage('js.tt.info.GTT02'));
                },
                onComplete: function(response){
                    var flg = checkException(response);
                    if (!flg) {
                    
                        // 重置列表颜色
                        listColor('g010021_otherJurisdictionList');
                        
                        g_operateFlag = OperateEnum.None;
                        
                        // 隐藏加载动画
                        hideLoader();
                        
						// add by zhanghaibo 7/13
						new Ajax.Updater('div_head', 'g010021RefreshHead.action', {
							method: 'get',
                			parameters: addStamp(''),
							onComplete: function(response) {
								var flg = checkException(response);
							}
						});
                    }
                }
            });
        }
        else {
            return;
        }
        clearError('otherJurisdictionForm');
        // 修改按钮名
        $('saveOther' + rowIndex).addClassName('none');
        $('modOther' + rowIndex).removeClassName('none');
        $('cancelOther' + rowIndex).addClassName('none');
        $('deleteOther' + rowIndex).removeClassName('none');
        
        // 设定焦点位置
        $('userIdNum_1').focus();
    }
}

/**
 * 密码维护修改.
 */
function saveModifyPassword(){

    // 页面提交upDatePasswordAction
    if (checkForm('passwordForm')) {
        if (passwordValidate()) {
            if (confirm(getMessage('js.com.info.0003'))) {
                // 显示加载动画
            	showLoader();
            	
                $('passwordForm').action = 'g010021UpdAdminAccountInfo.action?parameter=' + $('parameter').value;
                $('passwordForm').submit();
            }
        }
    }
}

/**
 * 维护权限分配【修改】按钮事件.
 * @param {String} userIdNum 员工ID.
 */
function modifyInfo(userIdNum){

    // 处于编辑状态时
    if (g_operateFlag != OperateEnum.None) {
        
        // 修改按钮名
        $('cancel' + cur_user_id).addClassName('none');
        $('delete' + cur_user_id).removeClassName('none');
        $('save' + cur_user_id).addClassName('none');
        $('mod' + cur_user_id).removeClassName('none');
        $('start' + cur_user_id).addClassName('none');
        $("startTime" + cur_user_id).removeClassName('none');
        $('end' + cur_user_id).addClassName('none');
        $('endTime' + cur_user_id).removeClassName('none');
    }
    
    // 状态：维护权限修改
    g_operateFlag = OperateEnum.Modify;
    
    // 修改按钮名
    $('mod' + userIdNum).addClassName('none');
    $('save' + userIdNum).removeClassName('none');
    $('delete' + userIdNum).addClassName('none');
    $('cancel' + userIdNum).removeClassName('none');
    $('startTime' + userIdNum).addClassName('none');
    $("start" + userIdNum).removeClassName('none');
    $('endTime' + userIdNum).addClassName('none');
    $('end' + userIdNum).removeClassName('none');
    
    //设置当前编辑行
    cur_user_id = userIdNum;
    
    // 设定焦点位置
    $('startId' + userIdNum).focus();
	
	// 开始与结束日期校验 
    addCustomCheck($('startId'+ userIdNum), getMessage('js.com.warning.0006'), 'startId'+ userIdNum, function compareInputTime(){
        if (compareTime($('startId'+ userIdNum), $('endId'+ userIdNum))) {
            removeFieldError($('endId'+ userIdNum));
        }
        return compareTime($('startId'+ userIdNum), $('endId'+ userIdNum));
    });
    
    addCustomCheck($('endId'+ userIdNum), getMessage('js.com.warning.0006'), 'endId'+ userIdNum, function compareInputTime(){
        if (compareTime($('startId'+ userIdNum), $('endId'+ userIdNum))) {
            removeFieldError($('startId'+ userIdNum));
        }
        return compareTime($('startId'+ userIdNum), $('endId'+ userIdNum));
    });
	
}

/**
 * 其他权限分配【修改】按钮事件.
 * @param {String} userIdNum 员工ID.
 */
function modifyOtherInfo(userIdNum){

    // 处于编辑状态时
    if (g_operateFlag != OperateEnum.None) {
        
        // 修改按钮名
        $('cancelOther' + cure_user_id).addClassName('none');
        $('deleteOther' + cure_user_id).removeClassName('none');
        $('saveOther' + cure_user_id).addClassName('none');
        $('modOther' + cure_user_id).removeClassName('none');
        $('startOther' + cure_user_id).addClassName('none');
        $("startTimeOther" + cure_user_id).removeClassName('none');
        $('endOther' + cure_user_id).addClassName('none');
        $('mOther' + cure_user_id).removeClassName('none');
    }
    
    // 状态：其他权限修改
    g_operateFlag = OperateEnum.Other;
    
    // 修改按钮名
    $('modOther' + userIdNum).addClassName('none');
    $('saveOther' + userIdNum).removeClassName('none');
    $('deleteOther' + userIdNum).addClassName('none');
    $('cancelOther' + userIdNum).removeClassName('none');
    $('startTimeOther' + userIdNum).addClassName('none');
    $("startOther" + userIdNum).removeClassName('none');
    $('mOther' + userIdNum).addClassName('none');
    $('endOther' + userIdNum).removeClassName('none');
    
    //设置当前编辑行
    cure_user_id = userIdNum;
    
    // 设定焦点位置
    $('startOtherId' + userIdNum).focus();
	clearError('otherJurisdictionForm');
	
	// 开始与结束日期校验 
    addCustomCheck($('startOtherId'+ userIdNum), getMessage('js.com.warning.0006'), 'startOtherId'+ userIdNum, function compareInputTime(){
        if (compareTime($('startOtherId'+ userIdNum), $('endOtherId'+ userIdNum))) {
            removeFieldError($('endOtherId'+ userIdNum));
        }
        return compareTime($('startOtherId'+ userIdNum), $('endOtherId'+ userIdNum));
    });
    
    addCustomCheck($('endOtherId'+ userIdNum), getMessage('js.com.warning.0006'), 'endOtherId'+ userIdNum, function compareInputTime(){
        if (compareTime($('startOtherId'+ userIdNum), $('endOtherId'+ userIdNum))) {
            removeFieldError($('startOtherId'+ userIdNum));
        }
        return compareTime($('startOtherId'+ userIdNum), $('endOtherId'+ userIdNum));
    });
}

/**
 * 维护权限分配【取消】按钮事件.
 * @param {Object} userIdNum 员工ID.
 */
function cancel(userIdNum){

    if (confirm(getMessage('js.com.info.0005'))) {
    
        // 修改按钮名
        $('cancel' + userIdNum).addClassName('none');
        $('delete' + userIdNum).removeClassName('none');
        $('save' + userIdNum).addClassName('none');
        $('mod' + userIdNum).removeClassName('none');
        $('start' + userIdNum).addClassName('none');
        $("startTime" + userIdNum).removeClassName('none');
        $('end' + userIdNum).addClassName('none');
        $('endTime' + userIdNum).removeClassName('none');
        
        // 设定焦点位置
        $('sltCategory1').focus();
        
        g_operateFlag = OperateEnum.None;
    }
}

/**
 * 其他权限分配【取消】按钮事件.
 * @param {Object} userIdNum 员工ID.
 */
function cancelOther(userIdNum){

    if (confirm(getMessage('js.com.info.0005'))) {
    
        // 修改按钮名
        $('cancelOther' + userIdNum).addClassName('none');
        $('deleteOther' + userIdNum).removeClassName('none');
        $('saveOther' + userIdNum).addClassName('none');
        $('modOther' + userIdNum).removeClassName('none');
        $('startOther' + userIdNum).addClassName('none');
        $("startTimeOther" + userIdNum).removeClassName('none');
        $('endOther' + userIdNum).addClassName('none');
        $('mOther' + userIdNum).removeClassName('none');
        
        // 设定焦点位置
        $('userIdNum_1').focus();
        clearError('otherJurisdictionForm');
        g_operateFlag = OperateEnum.None;
    }
}

/**
 * 删除维护权限.
 * @param {String} userIdNum.. 员工ID...
 */
function deleteInfo(linkElement, userIdNum, authorityId, sltCategory1, sltCategory2, sltCategory3, startTimeNm, relatedobjectId){

	// 处于编辑状态时
    if (g_operateFlag != OperateEnum.None) {
    
        // 修改按钮名
        $('cancel' + cur_user_id).addClassName('none');
        $('delete' + cur_user_id).removeClassName('none');
        $('save' + cur_user_id).addClassName('none');
        $('mod' + cur_user_id).removeClassName('none');
        $('start' + cur_user_id).addClassName('none');
        $("startTime" + cur_user_id).removeClassName('none');
        $('end' + cur_user_id).addClassName('none');
        $('endTime' + cur_user_id).removeClassName('none');
       
    }
	
	// 状态：维护权限修改
    g_operateFlag = OperateEnum.None;
	
	//设置当前编辑行
    cure_user_id = userIdNum;
	
    // 获得当前行号
    var rowIndex = $(linkElement).up('tr', 0).rowIndex;
    
    // 该行变色标记
    selectLine('g010021_maintenanceList');
    
    // 提交到 g010021DelMaintPerm
    if (confirm(getMessage('js.com.info.0001'))) {
        // 显示加载动画
    	showLoader();
    	
        var url = 'g010021DelMaintPerm.action';
        var pars = 'g010021aInfo.userIdNum=' + encodeURI(userIdNum) + '&' +
        'g010021aInfo.authorityId=' +
        encodeURI(authorityId) +
        '&' +
        'g010021aInfo.sltCategory1=' +
        encodeURI(sltCategory1) +
        '&' +
        'g010021aInfo.sltCategory2=' +
        encodeURI(sltCategory2) +
        '&' +
        'g010021aInfo.sltCategory3=' +
        encodeURI(sltCategory3) +
        '&' +
        'g010021aInfo.startTimeNm=' +
        encodeURI(startTimeNm) +
        '&' +
        'g010021aInfo.relatedobjectId=' +
        encodeURI(relatedobjectId);
        pars = addStamp(pars);
        new Ajax.Updater('table_dateAList', url, {
            method: 'get',
            parameters: pars,
            onSuccess: function(response){
                showOpTip(getMessage('js.tt.info.GTT02'));
            },
            onComplete: function(response){
                var flg = checkException(response);
                if (!flg) {
                
                    // 发生错误
                    if (!response.responseText.empty()) {

                        // 重置列表颜色
                        listColor('g010021_maintenanceList');
                        
                        // 设定焦点位置
                        $('sltCategory1').focus();
                    }
                    
                    // 隐藏加载动画
                    hideLoader();
                    
					// add by zhanghaibo 7/13
					new Ajax.Updater('div_head', 'g010021RefreshHead.action', {
						method: 'get',
            			parameters: addStamp(''),
						onComplete: function(response) {
							var flg = checkException(response);
						}
					});
                }
            }
        });
    }
    else {
    
        // 重置列表颜色
        listColor('g010021_maintenanceList');
    }
}

/**
 * 删除其他维护权限.
 * @param {String} userIdNum.. 员工ID...
 */
function deleteOtherInfo(linkElement, userIdNum, authorityId, sltCategory1, sltCategory2, sltCategory3, startTimeNm, relatedobjectId){

	// 处于编辑状态时
    if (g_operateFlag != OperateEnum.None) {
        
        // 修改按钮名
        $('cancelOther' + cure_user_id).addClassName('none');
        $('deleteOther' + cure_user_id).removeClassName('none');
        $('saveOther' + cure_user_id).addClassName('none');
        $('modOther' + cure_user_id).removeClassName('none');
        $('startOther' + cure_user_id).addClassName('none');
        $("startTimeOther" + cure_user_id).removeClassName('none');
        $('endOther' + cure_user_id).addClassName('none');
        $('mOther' + cure_user_id).removeClassName('none');
    }
    
    // 状态：其他权限修改
    g_operateFlag = OperateEnum.None;
	
	//设置当前编辑行
    cure_user_id = userIdNum;
	
    // 获得当前行号
    var rowIndex = $(linkElement).up('tr', 0).rowIndex;
    clearError('otherJurisdictionForm');
    // 该行变色标记
    selectLine('g010021_otherJurisdictionList');
    
    // 提交到 g010021DelOtherPerm
    if (confirm(getMessage('js.com.info.0001'))) {
        // 显示加载动画
    	showLoader();
    	
        var url = 'g010021DelOtherPerm.action';
        var pars = 'g010021aInfo.userIdNum=' + encodeURI(userIdNum) + '&' +
        'g010021aInfo.authorityId=' +
        encodeURI(authorityId) +
        '&' +
        'g010021aInfo.sltCategory1=' +
        encodeURI(sltCategory1) +
        '&' +
        'g010021aInfo.sltCategory2=' +
        encodeURI(sltCategory2) +
        '&' +
        'g010021aInfo.sltCategory3=' +
        encodeURI(sltCategory3) +
        '&' +
        'g010021aInfo.startTimeNm=' +
        encodeURI(startTimeNm) +
        '&' +
        'g010021aInfo.relatedobjectId=' +
        encodeURI(relatedobjectId);
        pars = addStamp(pars);
        new Ajax.Updater('table_dateOtherList', url, {
            method: 'get',
            parameters: pars,
            onSuccess: function(response){
                showOpTip(getMessage('js.tt.info.GTT02'));
            },
            onComplete: function(response){
                var flg = checkException(response);
                if (!flg) {
                
                    // 发生错误
                    if (!response.responseText.empty()) {
             
                        // 重置列表颜色
                        listColor('g010021_otherJurisdictionList');
                        
                        // 设定焦点位置
                        $('userIdNum_1').focus();
                    }
                    
                    // 隐藏加载动画
                    hideLoader();
                    
					// add by zhanghaibo 7/13
					new Ajax.Updater('div_head', 'g010021RefreshHead.action', {
						method: 'get',
            			parameters: addStamp(''),
						onComplete: function(response) {
							var flg = checkException(response);
						}
					});
                }
            }
        });
    }
    else {
    
        // 重置列表颜色
        listColor('g010021_otherJurisdictionList');
    }
}

/**
 * 密码维护输入校验.
 * @return Boolean true:false.
 */
function passwordValidate(){

    // 确认新管理员密码输入校验
    return passwordConfimValidate();
}

/**
 * 确认输入新管理员密码输入校验.
 * @return Boolean true:false.
 */
function passwordConfimValidate(){

    form = $('passwordForm');// 需校验的form
    var continueValidation = true;// 校验状态标记
    // 确认输入校验
    if ($('newAdminPsw').value != $('passwordConfim').value) {
    
        addFieldError($('passwordConfim'), getMessage('js.tt.error.GLE06'));
        continueValidation = false;
    }
    
    if (continueValidation) {
        return true;
    }
    else {
        $('passwordConfim').focus();
        return false;
    }
}

function LTrim(str)
{
    var i;
    for(i=0;i<str.length;i++)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
    }
    str=str.substring(i,str.length);
    return str;
}
function RTrim(str)
{
    var i;
    for(i=str.length-1;i>=0;i--)
    {
        if(str.charAt(i)!=" "&&str.charAt(i)!=" ")break;
    }
    str=str.substring(0,i+1);
    return str;
}
function Trim(str)
{
    return LTrim(RTrim(str));
}

