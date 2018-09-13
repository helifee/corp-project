/*
 * @(#)g010021Application.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试管理系统
 *    SubSystem: 教育系统
 */
/**
 * @fileoverview 权限申请一览JavaScript.
 *
 * @author guozhizhou
 * @version 1.0
 */
/**
 * 分页时使用的ajax提交函数.
 */
function pagerCommonTag(pageUrl, pageNumber){
    var url = pageUrl;
    var pars = 'pageNumber=' + pageNumber;
    new Ajax.Updater('g010021ApplicationList', url, {
        method: 'get',
        parameters: pars,
        onSuccess: function(response){
        },
        onFailure: reportError,
		onComplete: function(response){
		
			var flg = checkException(response);
			if (!flg) {
				
				// 重置列表颜色
				listColor('g010021_applicationList');
			}
		}
    });
}

/**
 * 画面onload.
 */
function G010021applicationForm(){
	
	// 重置列表颜色
	listColor('g010021_applicationList');
}

/**
 * 删除权限一览信息.
 * @param {String} userIdNum 员工ID.
 */
function deleteApplicationInfo(linkElement, userIdNum, applyTime){

    // 获得当前行号
    var rowIndex = $(linkElement).up('tr', 0).rowIndex;
	
    // 该行变色标记
    selectLine('g010021_applicationList');
    
    // 提交到 g010021DelPermRequest
	if (confirm(getMessage('js.com.info.0001'))) {
        var url = 'g010021DelPermRequest.action';
        var pars = 'g010021aInfo.userIdNum=' + encodeURI(userIdNum) + '&' +
        'g010021aInfo.strApplyTime=' + encodeURI(applyTime);
		pars = addStamp(pars);
        new Ajax.Updater('g010021ApplicationList', url, {
            method: 'get',
            parameters: pars,
			onSuccess: function(request){
	   			showOpTip(getMessage('js.tt.info.GTT02'));
	   		},
            onComplete: function(request){
				var flg = checkException(response);
				if (!flg) {
				
					// 重置列表颜色
					listColor('g010021_applicationList');
				}
			}
        });
    }
    else {
    
        // 重置列表颜色
        listColor('g010021_applicationList');
    }
}
