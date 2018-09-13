/*
 * @(#)k060051.js
 * @考试检索一览画面用JavaScript.
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * 图标提示文字枚举.
 */
var IconMsgEnum = {
	Show: '展开',
	Hide: '收缩'
};

/** 
 * 画面onload.
 */
function initForm() {

	if ($('edShowFlg').value == 'true') {
		// 分类初期化
		initCategoryList('k060051', '0', 1, true, '0', 'sltCategory1', 'sltCategory2', 'sltCategory3', '1', '1');
		
	}
	
	// 焦点设置
	if ($('edShowFlg').value == 'true') {
		$('edexamineId').focus();
	} else if ($('imShowFlg').value == 'true') {
		$('impexamineId').focus();
	}
	setListColor();
	
}

/**
 * 设置列表颜色
 */
function setListColor() {
	// 重置列表颜色
	if ($('edShowFlg').value == 'true') {
		listColor('table_edtList');
	}
	if ($('imShowFlg').value == 'true') {
		listColor('table_impList');
	}
}

/**
 * 分页时使用的ajax提交函数.
 * @param {String} pageUrl 提交请求URL.
 * @param {Integer} pageNumber 当前页码.
 */
function pagerCommonTag(pageUrl, pageNumber) {

	//从隐藏控件中取出上次使用的检索条件
	var pars = $('oldParamed').value;
	//设定url以及其余参数
	var url = pageUrl + '&pageNumber=' + pageNumber + '&' + pars;
	pars = addStamp(pars);
	// 加载效果
	showLoader();
	new Ajax.Updater('div_edit_list', url, {
		onSuccess: function(response) {
		},
		onFailure: function(request) {
			alert(getMessage('js.com.error.0001'));
		},
		onComplete: function(response) {
			var flg = checkException(response);
			if (!flg) {
				setListColor();
				// 隐藏加载动画
				hideLoader();
			}
		}
	});
}

/**
 * 分页时使用的ajax提交函数.
 * @param {String} pageUrl 提交请求URL.
 * @param {Integer} pageNumber 当前页码.
 */
function pagerCommonTag1(pageUrl, pageNumber) {

	//从隐藏控件中取出上次使用的检索条件
	var pars = $('oldParamim').value;
	//设定url以及其余参数
	var url = pageUrl + '&pageNumber1=' + pageNumber + '&' + pars;
	pars = addStamp(pars);
	// 加载效果
	showLoader();
	new Ajax.Updater('div_implement_list', url, {
		onSuccess: function(response) {
		},
		onFailure: function(request) {
			alert(getMessage('js.com.error.0001'));
		},
		onComplete: function(response) {
			var flg = checkException(response);
			if (!flg) {
				setListColor();
				// 隐藏加载动画
				hideLoader();
			}
		}
	});
}

/**
 * 考试新建及权限分配(新建)
 */
function examineNew() {

	window.location.href = 'k060011InitCreateMode';
}

/**
 * 编辑考试一览检索
 */
function searchEditExamine() {
	if (validatesearcheditInfo()) {
	
		var url = 'k060051SearchEditInfo.action';
		
		//把检索条件所在的form串行化后，设到隐藏控件oldParamed中，
		//然后使用oldParamed的值，进行检索。（点击下一页的时候也是用这个隐藏控件的值）
		var pars = $('editinfoForm').serialize();
		$('oldParamed').value = pars;
		pars = 'pageNumber=0&' + pars;
		pars = addStamp(pars);
		showLoader();
		new Ajax.Updater('div_edit_list', url, {
			method: 'get',
			parameters: pars,
			onSuccess: function(response) {
			},
			onFailure: function(request) {
				alert(getMessage('js.com.error.0001'));
			},
			onComplete: function(response) {
				var flg = checkException(response);
				if (!flg) {
					// 焦点设置
					$('edexamineId').focus();
					setListColor();
					// 隐藏加载动画
					hideLoader();
				}
			}
		});
	}
}

/**
 * 实施考试一览检索
 */
function searchImptExamine() {
	if (validatesearchImplementInfo()) {
	
		var url = 'k060051SearchImplementInfo.action';
		
		//把检索条件所在的form串行化后，设到隐藏控件oldParamedim中，
		//然后使用oldParamedim的值，进行检索。（点击下一页的时候也是用这个隐藏控件的值）
		var pars = $('ImptinfoForm').serialize();
		$('oldParamim').value = pars;
		pars = 'pageNumber=0&' + pars;
		pars = addStamp(pars);
		// 加载效果
		showLoader();
		new Ajax.Updater('div_implement_list', url, {
			method: 'get',
			parameters: pars,
			onSuccess: function(response) {
			},
			onFailure: function(request) {
				alert(getMessage('js.com.error.0001'));
			},
			onComplete: function(response) {
				var flg = checkException(response);
				if (!flg) {
					// 焦点设置
					$('impexamineId').focus();
					setListColor();
					// 隐藏加载动画
					hideLoader();
				}
			}
		});
	}
}

/**
 * 编辑考试一览检索项目校验
 */
function validatesearcheditInfo() {
	form = $("editinfoForm");
	
	var continueValidation = true;
	if (form.elements['k060051EditInfo.examineId']) {
		field = form.elements['k060051EditInfo.examineId'];
		if (continueValidation && field.value != null) {
			var value = field.value;
			//trim field value
			while (value.substring(0, 1) == ' ') 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == ' ') 
				value = value.substring(0, value.length - 1);
			if (value.length < -1 || value.length > 8) {
				addFieldError('edexamineId', getMessage("js.com.warning.0003", "考试ID", "8"));
				continueValidation = false;
			}
		}
	}
	
	if (!continueValidation) {
		$('edexamineId').focus();
		return false;
	}
	
	if (form.elements['k060051EditInfo.examineName']) {
		field = form.elements['k060051EditInfo.examineName'];
		if (continueValidation && field.value != null) {
			var value = field.value;
			//trim field value
			while (value.substring(0, 1) == ' ') 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == ' ') 
				value = value.substring(0, value.length - 1);
			if (value.length > 200) {
				addFieldError('edexamineNmae', getMessage("js.com.warning.0003", "考试名称", "200"));
				continueValidation = false;
			}
		}
	}
	
	if (!continueValidation) {
		$('edexamineNmae').focus();
		return false;
	}
	
	return true;
	
}


/**
 * 实施考试一览检索项目校验
 */
function validatesearchImplementInfo() {
	form = $("ImptinfoForm");
	
	var continueValidation = true;
	
	if (form.elements['k060051ImplementInfo.examineId']) {
		field = form.elements['k060051ImplementInfo.examineId'];
		if (continueValidation && field.value != null) {
			var value = field.value;
			//trim field value
			while (value.substring(0, 1) == ' ') 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == ' ') 
				value = value.substring(0, value.length - 1);
			if (value.length > 8) {
				addFieldError('impexamineId', getMessage("js.com.warning.0003", "考试ID", "8"));
				continueValidation = false;
			}
		}
	}
	
	if (!continueValidation) {
		$('impexamineId').focus();
		return false;
	}
	
	if (form.elements['k060051ImplementInfo.examineName']) {
		field = form.elements['k060051ImplementInfo.examineName'];
		if (continueValidation && field.value != null) {
			var value = field.value;
			//trim field value
			while (value.substring(0, 1) == ' ') 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == ' ') 
				value = value.substring(0, value.length - 1);
			if (value.length > 200) {
				addFieldError('impexamineNmae', getMessage("js.com.warning.0003", "考试名称", "200"));
				continueValidation = false;
			}
		}
	}
	
	if (!continueValidation) {
		$('impexamineNmae').focus();
		return false;
	}
	return true;
	
}

/**
 * 重新评分处理
 * @param {String} examineId 考试ID.
 * @param {String} updateTime 更新时间.
 * @param {String} examineStatus 当前状态.
 */
function renewGrade(examineId, updateTime, examineStatus) {
	if (confirm(getMessage('js.tt.warn.KSW17'))) {
	
		var pars = 'examineId=' + examineId + '&updateTimepa=' + updateTime +
		'&examineStatuspa=' +
		examineStatus;
		targetForm = $('ImptinfoForm');
		targetForm.action = 'k060051ExamReMark?' + pars;
		targetForm.submit();
	}
}

/**
 * 分数汇总
 * @param {String} examineId 考试ID.
 * @param {String} updateTime 更新时间.
 */
function gradeCollect(examineId, updateTime) {

	var url = "k060051CollectScore.action"
	var pars = 'examineId=' + examineId + '&updateTimepa=' + updateTime;
	var myAjax = new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		onComplete: function(response) {
			var flg = checkException(response);
			if (!flg) {
				if (response.responseText == "noend") {
					// 评分未全部结束
					alert(getMessage('js.tt.info.KST15'));
					setListColor();
				} else if (!response.responseText.empty()) {
					// 考试是<试考试>
					var aResult = response.responseText.split(",", -1);
					alert(getMessage('js.tt.info.KST16', aResult[0], aResult[1]));
					searchImptExamine();
				} else {
					searchImptExamine();
				}
			}
		},
		onFailure: reportError
	});
}

/**
 * 成绩发布
 * @param {String} examineId 考试ID.
 * @param {String} updateTime 更新时间.
 */
function recordPublish(examineId, updateTime) {

	var url = "k060051RecordPublish.action"
	var pars = 'examineId=' + examineId + '&updateTimepa=' + updateTime;
	var myAjax = new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		onComplete: function(response) {
			var flg = checkException(response);
			if (!flg) {
				//$('msg').update(response.responseText);
				if (response.responseText.empty()) {
					searchImptExamine();
				}
				setListColor();
			}
		},
		onFailure: reportError
	});
}

/**
 * 报名审批和报名重新审批
 */
function enrollApproval(exaimneId) {
	//目标地址
	var sURL = 'k060081ApproveExamApply?startupId=K060051&examineId=' + exaimneId;
	
	//窗口特征
	var sFeatures = 'dialogWidth:1000px;dialogHeight:800px;center:yes;help:yes;status:no';
	
	//打开子窗口
	var refreshFlg = window.showModalDialog(sURL, '', sFeatures);
	
	if (refreshFlg == 1) {
		searchImptExamine();
	}
}

/**
 * 伸缩.
 */
function resize(resizeDiv, resizeIcon) {
	$(resizeDiv).toggle();
	
	// 更改图标及提示文字
	if ($(resizeIcon).hasClassName('opt_Plus')) {
		$(resizeIcon).removeClassName('opt_Plus').addClassName('opt_Add');
		$(resizeIcon).title = IconMsgEnum.Show;
	} else {
		$(resizeIcon).removeClassName('opt_Add').addClassName('opt_Plus');
		$(resizeIcon).title = IconMsgEnum.Hide;
	}
}

