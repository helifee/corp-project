/*
 * @(#)k060081.js
 * @考试报名批准用JavaScript.
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */

/**
 * Radio按钮事件处理
 */
function searchEnroll() {

	targetForm = $('enrollform');
	targetForm.action = 'k060081ApproveExamApply';
	targetForm.submit();
}

/**
 * 画面onload.
 */
function initForm() {

	// 重置列表颜色
	listColor('titletable');

	//	var itemCounts = $('itemCount').value;
	
//	if (itemCounts != 0) {
//		for (var i = 0;i < itemCounts;i++) {
//			var itemSelected = 'itemSelected' + i;
//			if($('diff'+i).value==2||$('diff'+i).value==3){
//				$(itemSelected).disable();
//			}
//		}
//	}
}

/**
 * 报名批准处理.
 */
function sanctionEnroll() {
    if (confirm(getMessage('js.tt.warn.JYW16'))) {

		// 显示加载动画
		showLoader();
		
		targetForm = $('enrollform');
		targetForm.action = 'k060081AdoptApply';
		targetForm.submit();
    }
}

/**
 * 报名不批准处理.
 */
function unSanctionEnroll() {
    if (confirm(getMessage('js.tt.warn.JYW06'))) {

		// 显示加载动画
		showLoader();
		
		targetForm = $('enrollform');
		targetForm.action = 'k060081RefuseApply';
		targetForm.submit();
    }
}

