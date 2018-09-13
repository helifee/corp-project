/*
 * @(#) k050051.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
 */
/**
 * @fileoverview 试卷查看JavaScript.
 *
 * @author liyanrui
 * @version 1.0
 */
var k060031Handle;
/**
 * 图标提示文字枚举.
 */
var IconMsgEnum = {
	Show: '展开',
	Hide: '收缩'
};

/**
 * CSS枚举.
 */
var CssEnum = {
	IconShow: 'opt_FillRight',
	IconHide: 'opt_FillDown'
};
var g_box;
/**
 * 画面初期处理.
 */
function initPage() {
	
	// 火狐IE兼容
	firefoxIE();	

	// 试题内容控制
	var labels = $('K050051Form').select('label[title="content"]');
	for (var i = 0; i < labels.size(); i++) {
		var label = labels[i];
		var rtfContent = label.previous();
		label.innerText = rtfContent.innerHTML.replace(/\r|\n/g, "");
		label.title = rtfContent.innerHTML;
	}
	
	// 不批准理由控制
	if ($F('hidMode') == 8 && $F('hidPaperStatus') == 4) {
		$('txtRefuseReason').readOnly = true;
	}
	// initViewLink();
}

/**
 * 批准处理.
 */
function approve() {

	if (confirm(getMessage('js.tt.warn.JYW16'))) {
		// 显示加载动画
		showLoader();
		// 表单提交
		var url = 'k050051ApprovePaper.action';
		$('K050051Form').action = url;
		$('K050051Form').submit();
	}
}

/**
 * 不批准处理.
 */
function disApprove() {

	if (confirm(getMessage('js.tt.warn.JYW06'))) {
		// 显示加载动画
		showLoader();
		// 表单提交
		var url = 'k050051DisApprovePaper.action';
		$('K050051Form').action = url;
		$('K050051Form').submit();
	}
}

/**
 * 删除试卷处理.
 */
function deleteTestPager() {
	if (confirm(getMessage('js.tt.warn.JYW07'))) {
		// 显示加载动画
		showLoader();
		// 表单提交
		var url = 'k050051DeletePaper.action';
		$('K050051Form').action = url;
		$('K050051Form').submit();
	}
}

/**
 * 固定大题详细信息是否可见.
 */
function bodyOneResize(index) {
	if ($('module_1_body' + index).visible()) {
		$('module_1_body' + index).hide();
	} else {
		$('module_1_body' + index).show();
	}
}

/**
 * 随机大题详细信息是否可见.
 */
function bodyTwoResize(index) {
	if ($('module_2_body' + index).visible()) {
		$('module_2_body' + index).hide();
	} else {
		$('module_2_body' + index).show();
	}
}

/**
 * 试卷预览.
 */
function testPreview() {
	//计算left,top,居中定位
	var width = 1000;
	var height = 800;
	var left = (screen.availWidth - width) * 0.5;
	var top = (screen.availHeight - height) * 0.5;
	var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
	'px, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=yes';
	k060031Handle = window.open('k060031InitEditViewMode?ifViewChange=0&paperId=' +
	$F('hidPaperId') +
	'&paperVersionNo=' +
	$F('hidPaperVersionNo'), 'testPreviewWin', sFeatures);
}

/**
 * 预览.
 */
function k050051QuePreview(index) {
	alert($F('questionId' + index));
	window.open('k040051InitQuesViewAndCheckMode?mode=6&questionIdList[0]=' +
	$F('questionId' + index));
}

/**
 * 参照新建.
 */
function referToNew() {

}

/**
 * 固定大题展开收缩.
 */
function resize1(index) {
	$('module_1_body' + index).toggle();
	
	// 更改图标及提示文字
	if ($('modifyIcon1' + index).hasClassName(CssEnum.IconShow)) {
		$('modifyIcon1' + index).removeClassName(CssEnum.IconShow).addClassName(CssEnum.IconHide);
		$('modifyIcon1' + index).title = IconMsgEnum.Hide;
	} else {
		$('modifyIcon1' + index).removeClassName(CssEnum.IconHide).addClassName(CssEnum.IconShow);
		$('modifyIcon1' + index).title = IconMsgEnum.Show;
	}
}

/**
 * 随机大题展开收缩.
 */
function resize2(index) {
	$('module_2_body' + index).toggle();
	
	// 更改图标及提示文字
	if ($('modifyIcon2' + index).hasClassName(CssEnum.IconShow)) {
		$('modifyIcon2' + index).removeClassName(CssEnum.IconShow).addClassName(CssEnum.IconHide);
		$('modifyIcon2' + index).title = IconMsgEnum.Hide;
	} else {
		$('modifyIcon2' + index).removeClassName(CssEnum.IconHide).addClassName(CssEnum.IconShow);
		$('modifyIcon2' + index).title = IconMsgEnum.Show;
	}
}

/**
 * 试题预览初始化.
 */
function initViewLink() {
	var paperSize, questionSize;
	paperSize = $F('paperSize');
	for (var i = 0; i < paperSize; i++) {
		questionSize = $F('queInfoSize_' + i);
		for (var j = 0; j < questionSize; j++) {
			bindTipbox('preView', 'questionId_' + i + '_' + j, 0, viewLinkBack);
		}
	}
}

/**
 * 试题预览callBack.
 */
function viewLinkBack(element, tipbox) {
	var clickLine = $(element).up('tr', 0);
	var questionId = clickLine.select('input')[0].value;
	var paperId = $F('paperId');
	var sURL, pars;
	if ($F('hidPaperType') == 1) {
	
		sURL = 'k040051InitQuesViewAndCheckMode' + '?' + 'mode=6' + '&' + 'paperId=' + paperId + '&queId=' + questionId + '&' + 'callScreenId=K050051';
	} else if ($F('hidPaperType') == 2) {
	
		sURL = 'k040051InitQuesViewAndCheckMode' + '?' + 'mode=7' + '&' + 'paperId=' + paperId + '&queId=' + questionId + '&' + 'callScreenId=K050051';
	}
	if (!$('tipFrame')) {
		$(tipbox).update('<iframe id="tipFrame" width="800px" height="150px"></iframe>');
	}
	$('tipFrame').src = sURL;
}

/** 
 * 关闭所有子窗口.
 */
function closeAllSubwin() {
	if (window.k060031Handle) {
		k060031Handle.close();
	}
}
