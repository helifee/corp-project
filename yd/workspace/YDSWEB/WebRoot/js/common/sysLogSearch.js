/*
 * @(#)sysLogSearch.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
 */

/**
 * @fileoverview 系统日志检索 JavaScript.
 *
 * @author guozhizhou
 * @version 1.0
 */

/**
 * 分页时使用的ajax提交函数.
 */
function pagerCommonTag(pageUrl, pageNumber){
    var url = pageUrl;
    var pars = addStamp($('logSearchInfoForm').serialize() + '&pageNumber=' + pageNumber);
    new Ajax.Updater('table_List', url, {
        method: 'get',
        parameters: pars,
        onSuccess: function(response){
        },
        onFailure: function(request){
            MsgBox.error(getMessage('js.com.error.0001'));
        }
    });
}

/**
 *   检索按钮事件.
 */
function search(){
	if (checkForm($('logSearchInfoForm'))) {
		var url = 'logSearchInfoAction.action';
		var pars = $('logSearchInfoForm').serialize() + '&pageNumber=1';
		pars = addStamp(pars);
		new Ajax.Updater('table_List', url, {
			method: 'get',
			parameters: pars,
			onSuccess: function(request) {
			},
			onFailure: function(request) {
				MsgBox.error(getMessage('js.com.error.0001'));
			}
		});
	}

}

/**
 * 取得操作人ID.
 */
function getOpId(){
    var url, pars, id;
    id = $F('opId');
    url = '../common/getUserNmAction.action';
    
     // 操作人ID为空时不进行get
    if (id.empty()) {
        return;
    }
	
   // 操作人ID输入校验
    if (checkInput('opId')) {
		pars = 'userId=' + encodeURI(id);
		new Ajax.Request(url, {
            method: 'get',
            parameters: pars,
            onComplete: function(request){
                if (request.responseText.empty()){
					MsgBox.error(getMessage('js.com.warning.0004','用户')); 
                    $('opId').focus();
                }
            }
        });
    }
}

/**
 * 取得被操作者ID.
 */
function getUserId(){
    var url, pars, id;
    id = $F('userId');
    url = '../common/getUserNmAction.action';
    pars = 'userId=' + encodeURI(id);
    
    // 被操作人ID为空时不进行get
    if (id.empty()) {
        return;
    }
    
    // 被操作人ID输入校验
    if (checkInput('userId')) {
        new Ajax.Request(url, {
            method: 'get',
            parameters: pars,
            onComplete: function(request){
                if (request.responseText.empty()) {
                    MsgBox.error(getMessage('js.com.warning.0004','用户'));
                    $('userId').focus();
                }
            }
        });
    }
}


