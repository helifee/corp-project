/*
 * @(#)k050011.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
 */
/**
 *  试卷新建及权限分配JavaScript.
 *
 * @author jiaosunquan
 * @version 1.0
 */

/**
 * 画面onload.
 */
function initForm() {
	
	// 员工ID和姓名控件初始化
	initTtJsNameFilter("approverUserId", "approverUserNM");

	// 分类初期化
	if($F('mode') == 1 || $F('mode') == 2){
		initCategoryList('k050011','1',2,true,'1',
				'sltCategory1', 'sltCategory2', 'sltCategory3','1','1');		
	}else{
		initCategoryList('k050011','0',2,true,'1',
				'sltCategory1', 'sltCategory2', 'sltCategory3','1','1');		
	}
	
    // 自定义校验
    compareTimeForTable('editorListTable');
    
	// 焦点设置
	$('paperTitle').focus();
}

/**
 * 追加提交表单.
 */
function submitInsert() {

	// 自动校验
	if (!checkForm('k050011Form')) 
		return;
	    
	// 加载动画显示
	showLoader();
		
	// 表单提交
	var tmp1 = $F('sltCategory1');
	var tmp2 = $F('sltCategory2');
	var tmp3 = $F('sltCategory3');

	var url = 'k050011InsertNewPaper.action?testPaperInfo.category1Id=' + tmp1
			+ '&testPaperInfo.category2Id=' + tmp2 + '&testPaperInfo.category3Id='
			+ tmp3 + "&sltCategory1=" + tmp1 + "&sltCategory2=" + tmp2
			+ "&sltCategory3=" + tmp3 + "&" + dataSerialize($('k050011Form'));
	$('k050011Form').action = url;
	$('k050011Form').submit();
}

/**
 * 追加提交表单.
 */
function submitInnerInsert() {

	// 自动校验
	if (!checkForm('k050011Form')) 
		return;
	    
	// 加载动画显示
	showLoader();
		
	var tmp1 = $F('sltCategory1');
	var tmp2 = $F('sltCategory2');
	var tmp3 = $F('sltCategory3');

	// 设置Action
	var url = 'k050011InsertNewPaper2.action';
	// 设置参数
	var pars = 'testPaperInfo.category1Id=' + tmp1
			+ '&testPaperInfo.category2Id=' + tmp2 + '&testPaperInfo.category3Id='
			+ tmp3 + "&sltCategory1=" + tmp1 + "&sltCategory2=" + tmp2
			+ "&sltCategory3=" + tmp3 + "&" + $('k050011Form').serialize();
	pars = addStamp(pars);
    // Ajax提交请求
    var myAjax = new Ajax.Request(url, {
        method: 'post',
        parameters: pars,
        onComplete: function(request){
            var flg = checkException(request);
            if (!flg) {
				// 隐藏加载动画
               	hideLoader();
					
                if (request.responseText == '') {
                    //window.opener.location.href = 'k060061InitEditMode.action?operatMode=2';
                    //window.open('', '_self', '');
                    //window.close();
				    if (window.opener != null && 
						!window.opener.closed &&
						window.opener.selectePaperCallBack != undefined){
						window.opener.selectePaperCallBack();
					}
					
				    window.open('', '_self', '');
				    window.close();
                }
                else {
                    $('div_main').update(request.responseText);
                }
            }
        },
        onFailure: reportError
    });
}

 /**
  * 修改提交表单.
  */
 function submitUpdate() {

	// 自动校验
	if (!checkForm('k050011Form')) 
		return;
	    
	// 加载动画显示
	showLoader();
	
	// 表单提交
	var tmp1 = $F('sltCategory1');
	var tmp2 = $F('sltCategory2');
	var tmp3 = $F('sltCategory3');

	var url = 'k050011UpdatePaper.action?testPaperInfo.category1Id=' + tmp1
			+ '&testPaperInfo.category2Id=' + tmp2 + '&testPaperInfo.category3Id='
			+ tmp3 + "&sltCategory1=" + tmp1 + "&sltCategory2=" + tmp2
			+ "&sltCategory3=" + tmp3 + "&" + dataSerialize($('k050011Form'));
	$('k050011Form').action = url;
	$('k050011Form').submit();
 }
 
 /**
  * 参照新建提交表单.
  */
 function submitInsertCopy() {

	// 自动校验
	if (!checkForm('k050011Form')) 
		return;
	    
	// 加载动画显示
	showLoader();
	
	// 表单提交
	var tmp1 = $F('sltCategory1');
	var tmp2 = $F('sltCategory2');
	var tmp3 = $F('sltCategory3');

	var url = 'k050011InsertReferPaper.action?testPaperInfo.category1Id=' + tmp1
			+ '&testPaperInfo.category2Id=' + tmp2 + '&testPaperInfo.category3Id='
			+ tmp3 + "&sltCategory1=" + tmp1 + "&sltCategory2=" + tmp2
			+ "&sltCategory3=" + tmp3 + "&" + dataSerialize($('k050011Form'));
	$('k050011Form').action = url;
	$('k050011Form').submit();
 }
