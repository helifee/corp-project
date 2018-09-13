/*
 * @(#)j020011.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 新建课程及权限分配JavaScript.
 *
 * @author qianguorong
 * @version 1.0
 */
/**
 * 画面onload.
 */
function initForm(){

    // 员工ID和姓名控件初始化
    initTtJsNameFilter("approverUserId", "approverUserNM", "../../", true);
    
    // 分类初期化
    initCategoryList('J020011', '1', 1, true, '1', 'sltCategory1', 'sltCategory2', 'sltCategory3', '1', '1');
    
    // 针对对象变化操作
    showSelectDiv();
    
    //焦点设置
    $('courseName').focus();
    
    // 自定义校验
    compareTimeForTable('editorListTable');
    
	if ($('coursePublishStatus').value == 2){
		//开课状态下，画面输入/按钮不可用
		$('courseName').disable();
		$('approverUserId').disable();
		$('approverUserNM').disable();
		$('necessaryFlag').disable();
		$('objectTypeList').disable();
		$('btnOK').disable();
		$('obj2').disable();
		$('yearList').disable();
		$('btnSelectUser').disable();
		$('btnSelectEditors').disable();
		
		//禁用编辑者一览
        listSize = $('editorListTable').down(0).childElements().length;
        for (var i = 0; i < listSize; i++) {
            $('editorListTable').down('tr', i).down('input', 0).disable();
            $('editorListTable').down('tr', i).down('input', 1).disable();
        }
	}
}

/**
 * 更新课程基本信息
 */
function submitNewCourse(){
    // 自动校验
    if (!checkForm('courseInfoForm')) 
        return;
    
	// 加载动画显示
	showLoader();
	
    // 表单提交
    var tmp1 = $F('sltCategory1');
    var tmp2 = $F('sltCategory2');
    var tmp3 = $F('sltCategory3');
    var url = 'j020011InsertCourse.action?courseInfo.category1Id=' + tmp1 +
    '&courseInfo.category2Id=' +
    tmp2 +
    '&courseInfo.category3Id=' +
    tmp3 +
    "&sltCategory1=" +
    tmp1 +
    "&sltCategory2=" +
    tmp2 +
    "&sltCategory3=" +
    tmp3 +
    "&" +
    dataSerialize($('courseInfoForm'));
    $('courseInfoForm').action = url;
    $('courseInfoForm').submit();
}

/**
 * 追加课程基本信息
 */
function submitUpdCourse(){
    // 自动校验
    if (!checkForm('courseInfoForm')) 
        return;
    
	// 加载动画显示
	showLoader();
	
    // 表单提交
    var tmp1 = $F('sltCategory1');
    var tmp2 = $F('sltCategory2');
    var tmp3 = $F('sltCategory3');
    var url = 'j020011UpdateCourse.action?courseInfo.category1Id=' + tmp1 +
    '&courseInfo.category2Id=' +
    tmp2 +
    '&courseInfo.category3Id=' +
    tmp3 +
    "&sltCategory1=" +
    tmp1 +
    "&sltCategory2=" +
    tmp2 +
    "&sltCategory3=" +
    tmp3 +
    "&" +
    dataSerialize($('courseInfoForm'));
    $('courseInfoForm').action = url;
    $('courseInfoForm').submit();
}

/**
 * 开课
 */
function submitCourseStart(){
    if (confirm(getMessage("js.tt.info.JYT12"))) {
    	// 加载动画显示
    	showLoader();
    	
        // 表单提交
        var url = 'j020011UpdateCourseStart.action';
        $('courseInfoForm').action = url;
        $('courseInfoForm').submit();
    }
}

/**
 * 停课
 */
function submitCourseStop(){
    if (confirm(getMessage("js.tt.info.JYT13"))) {
    	// 加载动画显示
    	showLoader();
    	
        // 表单提交
        var tmp1 = $('courseName').value;
        var url = 'j020011UpdateCourseStop.action?courseInfo.courseName=' + tmp1;
        $('courseInfoForm').action = url;
        $('courseInfoForm').submit();
    }
}
