/*
 * @(#)k060011.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
 */
/**
 * @fileoverview 考试新建及权限分配JavaScript.
 *
 * @author chenzhong
 * @version 1.00 2010/04/19
 */

/**
 * 画面onload.
 */
function initForm() {
	
	// 分类初期化
	initCategoryList('k060011','1',2,true,'1','sltCategory1', 'sltCategory2', 'sltCategory3','1','1');

	// 员工ID和姓名控件
	initTtJsNameFilter("executantId", "executantName");
	
    // 针对对象变化操作
    showSelectDiv();

	// 焦点设置
	$('examineName').focus();
}

/**
 * 提交表单.
 */
function doSubmit() {
	
	if (!checkForm('k060011Form')) {
		return;
	}
	
	// 表单提交
	var tmp1= $F('sltCategory1');
 	var tmp2= $F('sltCategory2');
	var tmp3= $F('sltCategory3');
	var url = 'k060011SubmitExamineInfo.action?initInfo.category1Id='+tmp1+'&initInfo.category2Id='+tmp2+'&initInfo.category3Id='+
		tmp3+'&sltCategory1='+tmp1+'&sltCategory2='+tmp2+'&sltCategory3='+tmp3+'&'+dataSerialize($('k060011Form'));
    $('k060011Form').action = url;
    $('k060011Form').submit();
	
	showLoader();

}
