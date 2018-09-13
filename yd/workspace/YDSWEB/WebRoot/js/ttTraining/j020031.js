/*
 * @(#)j020031.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 课程详细(管理)JavaScript.
 *
 * @author zhangaijun
 * @version 1.0
 */
/**
 * 操作模式枚举.2:编辑 3：审批 7：参与.
 */
var OperateEnum = {
	Edit: 2,
	Approve: 3,
	Join: 7
};

/**
 * 课程开课状态枚举.1:未开课 2:已开课 3:停课
 */
var PublishEnum = {
	UnStart: 1,
	IsStart: 2,
	Stop: 3
};

/**
 * 课程审批状态枚举.1:编辑中 2:待审批 3:已批准 4:不批准
 */
var ConfirmEnum = {
	OnEdit: 1,
	Wait: 2,
	Allow: 3,
	Refuse: 4
};

/**
 * 画面onload.
 */
function initForm() {

	// 重置列表颜色
	listColor('table_bookList', 300);
	
	// 画面控制
	pageLoadControl();
	
}

/**
 * 画面初期控制
 */
function pageLoadControl() {
	// 显示加载动画
	showLoader();
	if ($F('operatMode') == OperateEnum.Approve) {
		// 审批模式控制
		pageControlApprove();
	} else if ($F('operatMode') == OperateEnum.Join) {
		// 参与模式控制
		pageControlJoin();
	} else if ($F('operatMode') == OperateEnum.Edit) {
		// 编辑模式控制
		pageControlEdit();
	}
	// 隐藏加载动画
	hideLoader();
}

/**
 * 编辑模式的画面控制.
 */
function pageControlEdit() {

	// 课程开课状态=已开课
	if ($('coursePublishStatus').value == PublishEnum.IsStart) {
		// 课程基本信息不可用,追加创建教材不可用
		disableForm();
		
	} else {
		// 课程开课状态!=已开课
		// 课程审批状态=编辑中
		if ($('courseConfirmStatus').value == ConfirmEnum.OnEdit) {
			// 课程基本信息可用
			$('courseInfoForm').enable();
			// 追加创建教材可用
			$('btnAddBook').enable();
			$('btnCreateBook').enable();
			// 再编辑不可用，确定可用，提交审批可用
			$('btnReEdit').disable();
			$('btnOk').enable();
			$('btnConfirm').enable();
			// 一览可用
			listControl(false);
		} else {
			// 课程审批状态!=编辑中
			// 课程基本信息不可用,追加创建教材不可用
			disableForm();
			$('btnAddBook').disable();
			$('btnCreateBook').disable();
			// 再编辑可用，确定不可用，提交审批不可用
			$('btnReEdit').enable();
			$('btnOk').disable();
			$('btnConfirm').disable();
			
			// 一览不可用
			listControl(true);
		}
		
		// 不批准理由不可用
		if ($('refuseReason')) {
			$('refuseReason').readOnly = true;
		}
	}
}

/**
 * 审批模式的画面控制.
 */
function pageControlApprove() {

	// 课程基本信息不可用,追加创建教材不可用
	disableForm();
	
	// 未开课
	if ($F('coursePublishStatus') != PublishEnum.IsStart) {
		// 编辑中
		if ($F('courseConfirmStatus') == ConfirmEnum.OnEdit || $F('courseConfirmStatus') == ConfirmEnum.Allow ||
		$F('courseConfirmStatus') == ConfirmEnum.Refuse) {
			$('refuseReason').readOnly = true;
		} else {
			$('refuseReason').readOnly = false;
		}
	}
}

/**
 * 参与模式的画面控制.
 */
function pageControlJoin() {

	// 课程基本信息不可用,追加创建教材不可用
	disableForm();
	
}

/**
 * 课程基本信息禁用,追加创建教材禁用
 */
function disableForm() {

	$('courseName').disable();
	$('courseAbstract').readOnly = true;
}

/**
 * 选择教材
 */
function addBooks() {

	// 表单提交
	var url = 'j020031AddBooks.action' + '?' + dataSerialize($('courseInfoForm'));
	$('courseInfoForm').action = url;
	$('courseInfoForm').submit();
	
	var sURL = 'j030021InitAddMode?courseId=' + $('paramCourseId').value +
	'&sltCategory1=' +
	$('category1Id').value +
	'&sltCategory2=' +
	$('category2Id').value +
	'&sltCategory3=' +
	$('category3Id').value;
	var sHandle = $('paramCourseId').value;
	
	//计算left,top,居中定位
	var width = 1000;
	var height = 680;
	var left = (screen.availWidth - width) * 0.5;
	var top = (screen.availHeight - height) * 0.5;
	var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
	'px, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=no';
	
	// 打开子窗口
	window.open(sURL, sHandle, sFeatures);
	
}

/**
 * 创建新教材
 */
function createBooks() {
	// 表单提交
	var url = 'j020031CreateNewBook.action?' + dataSerialize($('courseInfoForm'));
	$('courseInfoForm').action = url;
	// 显示加载动画
	showLoader();
	$('courseInfoForm').submit();
}

/**
 * 查看教材
 */
function showBook(paramBookId) {
	window.open('j030031InitManageMode?bookId=' + paramBookId, paramBookId);
}

/**
 * 管理教材
 */
function manageBook(paramBookId) {

	// 表单提交
	var url = 'j020031ManageBook.action?paramBookId=' + paramBookId + '&' + dataSerialize($('courseInfoForm'));
	$('courseInfoForm').action = url;
	// 显示加载动画
	showLoader();
	$('courseInfoForm').submit();
}

/**
 * 编辑教材
 */
function editBook(paramBookId) {
	// 表单提交
	var url = 'j020031EditBook.action?paramBookId=' + paramBookId + '&' + dataSerialize($('courseInfoForm'));
	$('courseInfoForm').action = url;
	// 显示加载动画
	showLoader();
	$('courseInfoForm').submit();
	
	
}

/**
 * 删除教材
 */
function deleteBook(paramBookId) {
	if (confirm(getMessage('js.tt.warn.JYW07'))) {
		// 表单提交
		var url = 'j020031DeleteBookFromCourse.action?paramBookId=' + paramBookId + '&' + dataSerialize($('courseInfoForm'));
		$('courseInfoForm').action = url;
		// 显示加载动画
		showLoader();
		$('courseInfoForm').submit();
	}
}

/**
 * 移除教材
 */
function removeBook(linkElement, paramBookId) {

	// 获得当前行号
	var rowIndex = linkElement.up('tr', 0).rowIndex;
	
	// 该行变色标记
	selectLine('table_bookList');
	
	if (confirm(getMessage('js.tt.warn.JYW12'))) {
	
		// 显示加载动画
		showLoader();
		
		var url = 'j020031RemoveBook.action';
		
		var pars = 'manaCourseInfo.courseId=' + encodeURI($F('courseId'));
		
		pars = pars + '& paramBookId=' + encodeURI(paramBookId);
		
		pars = addStamp(pars);
		
		var myAjax = new Ajax.Request(url, {
			method: 'post',
			parameters: pars,
			onComplete: removeBookBack(rowIndex),
			onFailure: reportError
		
		});
		
	}
	
	// 重置列表颜色
	listColor('table_bookList', 300);
}

function removeBookBack(rowIndex) {

	table = $('table_bookList')
	// 删除行
	table.deleteRow(rowIndex);
	
	// 再排序
	for (var i = rowIndex; i < table.rows.length; i++) {
		var row = table.rows[i];
		// 设置行的ID
		var L = row.childElements();
		L[8].childElements()[0].name = "manaBookInfoList[" + i + "].bookId";
		L[8].childElements()[1].name = "manaBookInfoList[" + i + "].bookName";
		L[8].childElements()[2].name = "manaBookInfoList[" + i + "].category";
		L[8].childElements()[3].name = "manaBookInfoList[" + i + "].approverTime";
		L[8].childElements()[4].name = "manaBookInfoList[" + i + "].createUserName";
		L[8].childElements()[5].name = "manaBookInfoList[" + i + "].statusName";
		L[8].childElements()[6].name = "manaBookInfoList[" + i + "].source";
		L[8].childElements()[7].name = "manaBookInfoList[" + i + "].editFlg";
		L[8].childElements()[8].name = "manaBookInfoList[" + i + "].bookStatus";
		L[8].childElements()[9].name = "manaBookInfoList[" + i + "].versionNum";
		L[8].childElements()[10].name = "manaBookInfoList[" + i + "].deleteFlg";
		L[8].childElements()[0].id = "manaBookInfoList[" + i + "].bookId";
		L[8].childElements()[1].id = "manaBookInfoList[" + i + "].bookName";
		L[8].childElements()[2].id = "manaBookInfoList[" + i + "].category";
		L[8].childElements()[3].id = "manaBookInfoList[" + i + "].approverTime";
		L[8].childElements()[4].id = "manaBookInfoList[" + i + "].createUserName";
		L[8].childElements()[5].id = "manaBookInfoList[" + i + "].statusName";
		L[8].childElements()[6].id = "manaBookInfoList[" + i + "].source";
		L[8].childElements()[7].id = "manaBookInfoList[" + i + "].editFlg";
		L[8].childElements()[8].id = "manaBookInfoList[" + i + "].bookStatus";
		L[8].childElements()[9].id = "manaBookInfoList[" + i + "].versionNum";
		L[8].childElements()[10].id = "manaBookInfoList[" + i + "].deleteFlg";
		
		
	}
	// 隐藏加载动画
	hideLoader();
}

/**
 * 一览操作控制
 */
function listControl(enableFlg) {
	var tableBookList = $('table_bookList');
	var rows = tableBookList.childElements()[0].childElements();
	
	// 一览控制
	for (var i = 0; i < rows.length; i++) {
		var operArea = rows[i].childElements()[7].childElements();
		
		if (enableFlg == true) {
			operArea[0].addClassName('none');
			operArea[1].addClassName('none');
			operArea[2].addClassName('none');
			operArea[3].addClassName('none');
			operArea[4].removeClassName('none');
			operArea[5].removeClassName('none');
			operArea[6].removeClassName('none');
			operArea[7].removeClassName('none');
		} else {
			operArea[0].removeClassName('none');
			operArea[1].removeClassName('none');
			operArea[2].removeClassName('none');
			operArea[3].removeClassName('none');
			operArea[4].addClassName('none');
			operArea[5].addClassName('none');
			operArea[6].addClassName('none');
			operArea[7].addClassName('none');
		}
		
	}
}

/**
 * 更新课程基本信息
 */
function submitCourseInfo() {

	if (!checkForm('courseInfoForm')) {
		return;
	}
	
	// 表单提交
	var url = 'j020031UpdateCourseDetails.action' + '?' + dataSerialize($('courseInfoForm'));
	$('courseInfoForm').action = url;
	$('courseInfoForm').target = "_self";
	// 显示加载动画
	showLoader();
	$('courseInfoForm').submit();
	
}

/**
 * 提交申请课程基本信息
 */
function applyCourse() {

	if (!checkForm('courseInfoForm')) {
		return;
	}
	if (confirm(getMessage('js.tt.warn.KSW12'))) {
		// 表单提交
		var url = 'j020031ApplyCourseDetails.action' + '?' + dataSerialize($('courseInfoForm'));
		$('courseInfoForm').action = url;
		$('courseInfoForm').target = "_self";
		// 显示加载动画
		showLoader();
		$('courseInfoForm').submit();
	}
}

/**
 * 批准课程基本信息
 */
function confirmCourse() {
	if (confirm(getMessage('js.tt.warn.JYW16'))) {
		// 表单提交
		$('courseInfoForm').action = 'j020031ConfirmCourseDetails.action';
		$('courseInfoForm').target = "_self";
		// 显示加载动画
		showLoader();
		$('courseInfoForm').submit();
	}
}

/**
 * 不批准课程基本信息
 */
function unConfirmCourse() {

	if (!checkForm('courseInfoForm')) {
		return;
	}
	if (confirm(getMessage('js.tt.warn.JYW06'))) {
		// 表单提交
		$('courseInfoForm').action = 'j020031UnConfirmCourseDetails.action' + '?' + dataSerialize($('courseInfoForm'));
		$('courseInfoForm').target = "_self";
		// 显示加载动画
		showLoader();
		$('courseInfoForm').submit();
	}
}

/**
 * 点击再编辑课程
 */
function reEditCourseInfo() {
	if (confirm(getMessage('js.tt.warn.JYW04'))) {

		// 显示加载动画
		showLoader();
		var url = 'j020031ReEditCourseDetails.action';
		
		var pars = 'manaCourseInfo.courseId=' + encodeURI($F('courseId'));
		pars = addStamp(pars);
		
		var myAjax = new Ajax.Request(url, {
			method: 'post',
			parameters: pars,
			onComplete: reEditCourseInfoBack,
			onFailure: reportError
		
		});
	}
	
}

/**
 * 点击再编辑课程回调函数
 */
function reEditCourseInfoBack(response) {
	var flg = checkException(response);
	if (!flg) {
		// 课程审批状态设成<编辑中>
		$('courseConfirmStatus').value = ConfirmEnum.OnEdit;
		$('manaCourseInfo.courseConfirmStatusNm').update(response.responseText);
		
		// 编辑模式控制
		pageControlEdit();
	}
	// 隐藏加载动画
	hideLoader();
}

