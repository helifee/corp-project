/*
 * @(#)k050021.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
 */
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

/**
 * checkBox选中状态结果Hash.
 */
var checkBoxStatusHash = new Hash();

/**
 * 日期校验格式
 */
var regexDateFormat = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$';

/**
 * 画面初期设置.
 */
function initPage(modeKbn) {
	// 火狐IE兼容
	firefoxIE();
	
	// 员工ID，姓名动态检索控件
	initTtJsNameFilter('txtUpdateUserId', 'txtUpdateUserName');
	initTtJsNameFilter('txtCreateUserId', 'txtCreateUserName');
	// 试卷管理模式时
	if ($F('modeKbn') == 1) {
	
		initCategoryList('K050021', '0', 2, true, '0', 'sltCategory1', 'sltCategory2', 'sltCategory3', '0', '1');
	} else if ($F('modeKbn') == 2) {
	
		// 试卷状态下拉列表设置
		$('sltPaperStatusList').disable();
		
		initCategoryList('K050021', '0', 2, true, '1', 'sltCategory1', 'sltCategory2', 'sltCategory3', '0', '1');
	}
	//焦点设置
	$('txtPaperId').focus();
	
	// 重置列表颜色
	listColor('pagerCommonList');
}

/**
 * 检索试卷信息.
 */
function getPaperListInfo() {

	// 画面输入校验
	if (!checkForm('searchForm')) {
		return;
	}
	
	// 显示加载动画
	showLoader();
	//检索数据并刷新信息显示列表
	var url = 'k050021GetPaperList.action';
	//把检索条件所在的form串行化后，设到隐藏控件oldParam中，
	//然后使用oldParam的值，进行检索。（点击下一页的时候也是用这个隐藏控件的值）
	var pars = parametersEdit()
	$('oldParam').value = pars;
	pars = 'pageNumber=0&' + pars;
	new Ajax.Updater('div_pagerCommonAjax', url, {
		parameters: pars,
		method: 'post',
		onLoading: function() {
		},
		onSuccess: function(response) {
		},
		onFailure: function(request) {
			reportError();
		},
		onComplete: function(response) {
			var flg = checkException(response);
			if (!flg) {
				// 重置列表颜色
				listColor('pagerCommonList');
				//焦点设置
				$('txtPaperId').focus();
				// 隐藏加载动画
				hideLoader();
			}
		}
	});
	
}

/**
 * 信息栏展开收缩.
 */
function resize() {
	$('div_paperList_view').toggle();
	
	// 更改图标及提示文字
	if ($('modifyIcon').hasClassName(CssEnum.IconShow)) {
		$('modifyIcon').removeClassName(CssEnum.IconShow).addClassName(CssEnum.IconHide);
		$('modifyIcon').title = IconMsgEnum.Hide;
	} else {
		$('modifyIcon').removeClassName(CssEnum.IconHide).addClassName(CssEnum.IconShow);
		$('modifyIcon').title = IconMsgEnum.Show;
	}
}

/**
 * 系统错误处理.
 */
function reportError() {
	alert(getMessage('js.com.error.0001'));
}

/**
 * 检索条件清空.
 */
function resetCondition() {
	// 确认清空
	if (confirm(getMessage('js.tt.warn.JYW13'))) {
		$('errorArea').hide();
		$('searchForm').reset();
		// 分类
		clearCategory('K050021', 'sltCategory1', 'sltCategory2', 'sltCategory3');
	}
}

/**
 * 全部选中/取消.
 */
function srcClickAll() {

	// 未指定flag且选中全部
	// 或flag为true
	var table_paperList = $('pagerCommonList');
	if (table_paperList.rows.length >= 1) {
	
		for (var i = 0, len = table_paperList.rows.length - 1; i < len; i++) {
		
			var itemSelected = 'paperSelected' + i;
			var itemId = 'paperId' + i;
			
			$(itemSelected).checked = $('srcAll').checked;
			if ($('srcAll').checked) {
			
				// 添加到checkbox选中结果Hash			
				checkBoxStatusHash.set($(itemId).innerText, $(itemSelected).checked);
			} else {
				// 删除Hash中数据			
				checkBoxStatusHash.unset($(itemId).innerText, $(itemSelected).checked);
			}
		}
	}
}

/**
 * 选中/取消单条数据.
 * @param itemIndex 被选中的行号.
 */
function selectOneItem(itemIndex) {
	var itemSelected = 'paperSelected' + itemIndex;
	var itemId = 'paperId' + itemIndex;
	if ($(itemSelected).checked) {
	
		// 添加到checkbox选中结果Hash			
		checkBoxStatusHash.set($(itemId).innerText, $(itemSelected).checked);
	} else {
		// 删除Hash中数据			
		checkBoxStatusHash.unset($(itemId).innerText, $(itemSelected).checked);
	}
	
}

/**
 * 分页ajax提交函数.
 * @param pageUrl 链接地址, pageNumber 页码.
 */
function pagerCommonTag(pageUrl, pageNumber) {
	// 显示加载动画
	showLoader();
	//从隐藏控件中取出上次使用的检索条件
	var pars = $('oldParam').value;
	var url = pageUrl + '&pageNumber=' + pageNumber + '&' + pars;
	new Ajax.Updater('div_pagerCommonAjax', url, {
		onLoading: function() {
		},
		onSuccess: function(response) {
		},
		onComplete: function(response) {
			var flg = checkException(response);
			if (!flg) {
				listColor('pagerCommonList');
				if ($F('modeKbn') == 2) {
					setCheckBoxStatus();
				}
				// 隐藏加载动画
				hideLoader();
			}
			
		}
	});
}

/**
 * 选择按钮事件.
 */
function returnChosenPaper() {

	// 判断教材选中情况
	if (checkSelectedItem()) {
		// 将提交结果转化成JSON串
		var checkBoxStatusJson = checkBoxStatusHash.toJSON();
		// 设置Action
		var url = 'k050021ChoosePaper';
		// 设置参数
		var pars = 'checkBoxStatusJson =' + checkBoxStatusJson;
		// Ajax提交请求
		var myAjax = new Ajax.Request(url, {
			method: 'post',
			parameters: pars,
			onComplete: function(request) {
				var flg = checkException(request);
				if (!flg) {
					if (request.responseText == 'success') {
						window.close();
						window.opener.selectePaperCallBack();
					} else {
						$('div_main').update(request.responseText);
					}
				}
			},
			onFailure: reportError
		});
	} else {
		MsgBox.message(getMessage('js.tt.info.KST11', '试卷'));
	}
}

/**
 * 新建试卷.
 */
function createNewPaper() {
	// 表单提交
	window.location.href = 'k050011InitCreateMode';
}

/**
 * 编辑检索条件串行化字符串.
 */
function parametersEdit() {

	var pars = $('searchForm').serialize();
	var pars2 = 'paperListInfo.category1Id=' + $F('sltCategory1') + '&' + 'paperListInfo.category2Id=' + $F('sltCategory2') + '&' + 'paperListInfo.category3Id=' + $F('sltCategory3') + '&';
	
	// 画面模式为试卷选择模式时，手动添加不可用控件的数据
	if ($F('modeKbn') == 2) {
	
		if ($('sltPaperStatusList').disabled) {
			pars2 = pars2 + 'paperListInfo.paperStatus=' + $F('sltPaperStatusList') + '&';
		}
	}
	pars = pars2 + pars;
	return pars;
}

/**
 * 保存checkBox状态.
 */
function setCheckBoxStatus() {

	var table_paperList = $('pagerCommonList');
	if (table_paperList.rows.length > 1) {
	
		for (var i = 0, len = table_paperList.rows.length - 1; i < len; i++) {
			var itemSelected = 'paperSelected' + i;
			var itemId = 'paperId' + i;
			
			$(itemSelected).checked = checkBoxStatusHash.get($(itemId).innerText);
		}
	}
}

/**
 * 检查画面选中试卷数量.
 * @return Boolean true:false.
 */
function checkSelectedItem() {

	// 选择件数
	var selectedNum = checkBoxStatusHash.keys().length;
	
	// Hash中数据数量为0件时
	if (selectedNum == 0) {
		return false;
		// Hash中的教材checkBox选中状态都为false时	
	} else if (checkBoxStatusHash.values().indexOf(true) == -1) {
		return false;
	}
	
	return true;
}
