/*
 * @(#)advice.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通
 */
/**
 * @fileoverview 意见反馈JavaScript.
 *
 * @author qianguorong
 * @version 1.0
 */

var g_url = 'submitAdvice.action';
/**
 * 提交意见反馈(TT)
 */
function submitAdvice(){

	// 加载动画显示
	showLoader();
	
    // 表单提交
    $('myForm').action = g_url;
    $('myForm').submit();
}

/**
 * 页面初始化(common)
 */
function init(){
	parent.adviceLoaded();
	var href = parent.frames['main'].location.href;
	var sp = href.split('/');
	$('comAdvice_pageLink1').writeAttribute({
		'value' : href
	});
	$('comAdvice_pageLink2').writeAttribute({
		'value' : ''
	});
	$('comAdvice_pageLink2').observe('change',function(){
		if($('comAdvice_pageLink2').checked){
			$('subSys').value = 'website';
			$('pageId').value = '';
		} else {
			$('subSys').value = sp[sp.length - 2];
			$('pageId').value = sp[sp.length - 1];
		}
	});
	$('subSys').value = sp[sp.length - 2];
	$('pageId').value = sp[sp.length - 1];
}


/**
 * 提交(common)
 */
function doSubmit(){
	
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
		var param = $('adviceForm').serialize();
		new Ajax.Request(g_url, {
			method: 'post',
			parameters: addStamp(param),
			onComplete: function(response){
				showOpTip(getMessage('js.com.info.0019'));
				cancel.delay(2.5);
			}
		});
	}, function(){
	// do nothing
	}, '是', '否');
	
	
}
/**
 * 取消(common)
 */
function doCancel(){
	
	MsgBox.confirm(getMessage('js.com.info.0015'), '确认对话框', function(){
		cancel();
	}, function(){
	// do nothing
	}, '是', '否');
	
	
}

/**
 * 关闭(common)
 */
function cancel(){
	parent.adviceClose();
}
