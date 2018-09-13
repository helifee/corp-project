/*
 * @(#)k050041.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试管理系统
 *    SubSystem: 教育系统
 */
var handle1;
var handle2;

/**
 * 修改后的分数.
 */
var g_answerNewScore = new Array();

/**
 * 答案序号.
 */
var g_answerSerialNo = new Array();

/**
 * 原始分数.
 */
var g_answerOldScore = new Array();

/**
 * 答案分数数组长度.
 */
var g_length;

/**
 * 画面模式枚举.
 */
var OpenEnum = {
	examMode: 1,
	exerciseMode: 2
};
/**
 * 当前选中行.
 */
var nowLine;
/**
 * 批量修改分数弹出DIV层.
 */
var g_boxChangePoint;
/**
 * 修改分数弹出DIV层.
 */
var g_boxChangePointItem;
/**
 * 点击事件所在行.
 */
var clickLine;
/**
 * 关键字信息.
 */
var g_jscon;
function initForm() {
	
	// 火狐IE兼容
	firefoxIE();
	
	// 画面列表校验
	inputCheck();
	
	$('bigquestionInfo.bigquestionTitle').focus();
	// 按钮初期化设置
	regBtnFunc();
	if ($F('hidBigquestionType') == 1) {
	
		// 鼠标点击radioButton后取得当前行
		var myFunction = {
			clickEvent: function(event) {
				var clickObj = event.element();
				
				if (clickObj.checked) {
				
					nowLine = clickObj.up('tr', 0);
					
					// 取前一行，下一行
					var pLine = nowLine.previous(0);
					var nLine = nowLine.next(0);
					
					// 上移按钮
					$('btnMoveUp').enable();
					
					// 下移按钮
					$('btnMoveDown').enable();
					if (pLine == null) {
					
						// 上移按钮
						$('btnMoveUp').disable();
					}
					if (nLine == null) {
					
						// 下移按钮
						$('btnMoveDown').disable();
					}
				}
			}
		};
		myFunction.bindClickEvent = myFunction.clickEvent.bindAsEventListener(myFunction);
		var table_Bigquestion = $('stableQuestionTable');
		for (var i = 0; i < table_Bigquestion.rows.length; i++) {
		
			Event.observe('radioSelectRow' + i, 'click', myFunction.bindClickEvent);
			$('content' + i).innerText = $('rtfContent' + i).innerText.replace(/\r|\n/g, "");
			$('content' + i).title = $('rtfContent' + i).innerText;
		}
		
		// 按钮设置
		$('btnMoveUp').disable();
		$('btnMoveDown').disable();
		// 重置列表颜色
		listColor('stableQuestionTable', 300);
	} else if ($F('hidBigquestionType') == 2) {
		// 分类下拉列表初期化
		var slt1Id = 'category1Id';
		var slt2Id = 'category2Id';
		var slt3Id = 'category3Id';
		initCategoryList('K050041', '0', 2, true, '1', slt1Id, slt2Id, slt3Id, '0', '1');
		
		// 关键字信息
		var keyWord = 'keyword';
		g_jscon = new JsContentFilter(keyWord, 'k050041GetKeyword.action', 'keywordList');
		
		// 按钮设置
		$('btnCreateQuestion').hide();
		$('btnChooseQuestion').hide();
		$('btnMoveUp').hide();
		$('btnMoveDown').hide();
	}
	// 批量修改分数弹出画面，接口暂时去掉
	//	g_boxChangePoint = new PopupBox({
	// 唯一标志
	//		key: 1,
	// 标题内容，元素或字符串
	//		title: '批量修改分数修改',
	// 图标的CSS
	//		icon: 'img_opt opt_Help',
	// 内容元素
	//		content: $('changeScore'),
	// 显示位置，相当与z-index
	//		position: 3,
	// 是否允许拖动
	//		drag: true
	//	});
	
	g_boxChangePointItem = new PopupBox({
		// 唯一标志
		key: 2,
		// 标题内容，元素或字符串
		title: '试题分数修改',
		// 图标的CSS
		icon: 'img_opt opt_Help',
		// 内容元素
		content: $('changeIetmScore'),
		// 显示位置，相当与z-index
		position: 3,
		// 是否允许拖动
		drag: true
	});
}

/**
 * TODO
 * 批量修改分数按钮事件.
 */
function changeScoreBatchPop() {
	// 弹出的位置，left top
	g_boxChangePoint.Popup();
}

/**
 * 试题分数onClick事件.
 */
function changeItemScorePop(obj) {
	clickLine = obj.up('tr', 0);
	
	// 第一次onClick事件标示
	var g_flag = clickLine.select('input')[5].value;
	var questionNum = Number(clickLine.select('td')[5].innerHTML);
	if (questionNum == 1) {
		return;
	}
	var url = 'k050041SearchAnswerInfo';
	var pars = 'questionId=' + clickLine.select('input')[2].value;
	var myAjax = new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		onComplete: function(request) {
			if (g_flag == 1){
				
				// 接收答案信息
				var answerInfo = request.responseText.evalJSON(true);
				g_length = answerInfo.length;
				for (var i = 0; i < answerInfo.length; i++) {
					
					// 隐藏字符串是空的情况
					if (clickLine.select('input')[4].value.empty()) {
						
						g_answerNewScore[i] = answerInfo[i].answerScore;
						
					} else {
						
						// 隐藏字符串分离后的数组长度小于答案信息长度
						if (clickLine.select('input')[4].value.split(',').length < i+1){
							g_answerNewScore[i] = answerInfo[i].answerScore;
						} else {
							g_answerNewScore[i]= clickLine.select('input')[4].value.split(',')[i];
						}
					}	
					
					// 设置原始分数
					g_answerOldScore[i]= answerInfo[i].answerScore;
					
					// 设置序号
					g_answerSerialNo[i] = answerInfo[i].answerSerialNo
				}
				
				// 从新设置标示
				clickLine.select('input')[5].value = 0;
			}

			// 设置答案区域
			setAnswerArea(g_length);
			
			// 设置输入考试分数
			$('txtScoreItem').update(clickLine.select('input')[3].value);	
					
			// 弹出DIV层
			g_boxChangePointItem.Popup();
			
			//焦点设置
			$('answerCTxt0').focus();
		},
		onFailure: reportError
	});
}

/**
 * 向上移动.
 */
function moveRowUp() {
	// 如果没有选中一行
	if (nowLine == null) {
		MsgBox.message(getMessage('js.com.info.0014'));
		return;
	}
	
	// 取前一行
	var pLine = nowLine.previous(0);
	if (pLine != null) {
		var url = 'k050041MoveQuestionUp.action';
		var pars = 'itemNo=' + nowLine.select('input')[0].value;
		var myAjax = new Ajax.Request(url, {
			method: 'post',
			parameters: pars,
			onComplete: function(response) {
				var flg = checkException(response);
				if (!flg) {
					// 设置当前行与下一行排序的序号
					var displaySeq = pLine.select('input')[0].value;
					pLine.select('input')[0].value = nowLine.select('input')[0].value;
					nowLine.select('input')[0].value = displaySeq;
					// 插入当前行
					pLine.insert({
						before: nowLine
					});
					// 重新获得上一行
					pLine = nowLine.previous(0);
					if (pLine == null) {
						// 上移按钮
						$('btnMoveUp').disable();
					}
					// 下移按钮
					$('btnMoveDown').enable();
					// 重置列表颜色
					listColor('stableQuestionTable', 300);
				}
			},
			onFailure: reportError
		
		});
	}
}

/**
 * 向下移动.
 */
function moveRowDown() {
	// 如果没有选中一行
	if (nowLine == null) {
		MsgBox.message(getMessage('js.com.info.0014'));
		return;
	}
	
	// 取下一行
	var nLine = nowLine.next(0);
	
	if (nLine != null) {
		var url = 'k050041MoveQuestionDown.action';
		var pars = 'itemNo=' + nowLine.select('input')[0].value;
		var myAjax = new Ajax.Request(url, {
			method: 'post',
			parameters: pars,
			onComplete: function(response) {
				var flg = checkException(response);
				if (!flg) {
					// 设置当前行与下一行排序的序号
					var displaySeq = nLine.select('input')[0].value;
					nLine.select('input')[0].value = nowLine.select('input')[0].value;
					nowLine.select('input')[0].value = displaySeq;
					// 插入当前行
					nLine.insert({
						after: nowLine
					});
					// 重新获得下一行
					nLine = nowLine.next(0);
					if (nLine == null) {
					
						// 下移按钮
						$('btnMoveDown').disable();
					}
					// 上移按钮
					$('btnMoveUp').enable();
					// 重置列表颜色
					listColor('stableQuestionTable', 300);
				}
			},
			onFailure: reportError
		
		});
	}
	
}

/**
 * 新建试题处理
 */
function creatQuestion() {

	//计算left,top,居中定位
	var width = 1000;
	var height = 600;
	var left = (screen.availWidth - width) * 0.5;
	var top = (screen.availHeight - height) * 0.5;
	var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
	'px, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=yes';
	
	var sURL;
	if ($F('hidModeKbn') == 1) {
	
		sURL = 'k040021InitNewQuesToTestMode' + '?' + 'category1=' + $F('hidCategory1') + '&' + 'category2=' + $F('hidCategory2') + '&' + 'category3=' + $F('hidCategory3') + '&' + 'paperId=' + $F('hidPaperId') + '&' + 'questionKind=' + $F('hidQuestionKind');
	} else if ($F('hidModeKbn') == 2) {
	
		sURL = 'k040021InitNewQuesToPracticeMode' + '?' + 'category1=' + $F('hidCategory1') + '&' + 'category2=' + $F('hidCategory2') + '&' + 'category3=' + $F('hidCategory3') + '&' + 'paperId=' + $F('hidPaperId') + '&' + 'questionKind=' + $F('hidQuestionKind');
	}
	//打开子窗口
	handle1 = window.open(sURL, 'addQuestionWin', sFeatures);
}

/**
 * 编辑试题处理
 */
function editQuestion(questionId) {

	//计算left,top,居中定位
	var width = 1000;
	var height = 600;
	var left = (screen.availWidth - width) * 0.5;
	var top = (screen.availHeight - height) * 0.5;
	var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
	'px, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=yes';
	
	var sURL;
	if ($F('hidModeKbn') == 1) {
	
		sURL = 'k040021InitUpdateQuesToTestMode' + '?' + 'category1=' + $F('hidCategory1') + '&' + 'category2=' + $F('hidCategory2') + '&' + 'category3=' + $F('hidCategory3') + '&' + 'paperId=' + $F('hidPaperId') + '&' + 'questionId=' + questionId + '&' + 'callScreenId=K050041';
	} else if ($F('hidModeKbn') == 2) {
	
		sURL = 'k040021InitUpdateQuesToPracticeMode' + '?' + 'category1=' + $F('hidCategory1') + '&' + 'category2=' + $F('hidCategory2') + '&' + 'category3=' + $F('hidCategory3') + '&' + 'paperId=' + $F('hidPaperId') + '&' + 'questionId=' + questionId + '&' + 'callScreenId=K050041';
	}
	//打开子窗口
	handle2 = window.open(sURL, 'editQuestionWin', sFeatures);
}

/**
 * 选择试题按钮事件.
 */
function chooseQuestion() {

	//计算left,top,居中定位
	var width = 1000;
	var height = 600;
	var left = (screen.availWidth - width) * 0.5;
	var top = (screen.availHeight - height) * 0.5;
	var sFeatures = 'width=' + width + 'px, height=' + height + 'px, left=' + left + 'px, top=' + top +
	'px, toolbar=no, menubar=no, scrollbars=yes, resizable=no,location=no, status=yes';
	
	var sURL;
	if ($F('hidModeKbn') == 1) {
	
		sURL = ' k040011InitSeleByExamineMode' + '?' + 'category1Id=' + $F('hidCategory1') + '&' + 'category2Id=' + $F('hidCategory2') + '&' + 'category3Id=' + $F('hidCategory3') + '&' + 'paperId=' + $F('hidPaperId') + '&' + 'questionKind=' + $F('hidQuestionKind');
	} else if ($F('hidModeKbn') == 2) {
	
		sURL = ' k040011InitSeleByPracticeMode' + '?' + 'category1Id=' + $F('hidCategory1') + '&' + 'category2Id=' + $F('hidCategory2') + '&' + 'category3Id=' + $F('hidCategory3') + '&' + 'paperId=' + $F('hidPaperId') + '&' + 'questionKind=' + $F('hidQuestionKind');
	}
	
	//打开子窗口
	handle1 = window.open(sURL, 'addQuestionWin', sFeatures);
}

/**
 * 删除固定大题.
 */
function deleteStableQuestion(questionOrder) {
	if (confirm(getMessage('js.tt.warn.JYW07'))) {
		//检索数据并刷新信息显示列表
		var url = 'k050041DeleteStableQuestion.action';
		var pars = $('k050041MainForm').serialize() + '&' + 'itemNo=' + questionOrder;
		new Ajax.Updater('divQuestionList', url, {
			parameters: pars,
			method: 'post',
			onLoading: function() {
			},
			onSuccess: function(response) {
				showOpTip(getMessage('js.tt.info.GTT02'));
			},
			onFailure: function(request) {
				reportError();
			},
			onComplete: function(response) {
				var flg = checkException(response);
				if (!flg) {
					countNumAndScore();
					var table_Bigquestion = $('stableQuestionTable');
					for (var i = 0; i < table_Bigquestion.rows.length; i++) {
					
						$('content' + i).innerText = $('rtfContent' + i).innerText.replace(/\r|\n/g, "");
						$('content' + i).title = $('rtfContent' + i).innerText;
					}
					// 重置列表颜色
					listColor('stableQuestionTable', 300);
				}
			}
		});
	}
}

/**
 * 试题预览.
 */
function questionReview(obj) {
	clickLine = obj.up('tr', 0);
	var questionId = clickLine.select('input')[2].value;
	var paperId = $F('hidPaperId');
	var sURL;
	if ($F('hidModeKbn') == 1) {
	
		sURL = 'k040051InitQuesViewAndCheckMode' + '?' + 'mode=6' + '&' + 'queId=' + questionId + '&' + 'paperId=' + paperId + '&' + 'callScreenId=K050041';
	} else if ($F('hidModeKbn') == 2) {
	
		sURL = 'k040051InitQuesViewAndCheckMode' + '?' + 'mode=7' + '&' + 'queId=' + questionId + '&' + 'paperId=' + paperId + '&' + 'callScreenId=K050041';
	}
	//打开子窗口
	window.open(sURL);
}

/**
 * 保存大题.
 */
function saveQuestion(questionOrder) {
	// 画面Form校验
	if (!checkForm('k050041MainForm')) {
		return;
	}
	
	// 计算大题分数及数量
	countNumAndScore();
	// 设置Action
	var url = 'k050041SaveBigquestion';
	// 设置参数
	var pars = $('k050041MainForm').serialize() + '&' + dataSerialize($('k050041MainForm'));
	// Ajax提交请求
	var myAjax = new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		onSuccess: function(response) {
			showOpTip(getMessage('js.tt.info.GTT02'));
		},
		onComplete: function(request) {
			if (request.responseText == 'success') {
				window.opener.location.href = 'k050031BigquestionEditCallBack';
				window.open('', '_self', '');
				window.close();
			} else {
				$('div_dept_main').update(request.responseText);
			}
		},
		onFailure: reportError
	});
}


/**
 * 计算试题数量及大题分数.
 */
function countNumAndScore() {
	var questionNum = 0;
	var totalScore = 0;
	if ($F('hidBigquestionType') == 1) {
		var tableStableQuestion = $('stableQuestionTable');
		for (var i = 0; i < tableStableQuestion.rows.length; i++) {
			var itemScore = 'bigquestionInfo.stableQueInfoList[' + i + '].questionScore';
			totalScore = totalScore + Number($F(itemScore));
		}
		questionNum = tableStableQuestion.rows.length;
	} else if ($F('hidBigquestionType') == 2) {
		var itemNum = 'questionNum';
		var itemScore = 'questionScore';
		totalScore = Number($F(itemScore)) * Number($F(itemNum));
		questionNum = Number($F(itemNum));
	}
	$('bigquestionInfo.bigquestionTotalScore').innerText = totalScore;
	$('bigquestionInfo.questionNum').innerText = questionNum;
}

/**
 * 设置答案区域.
 */
function setAnswerArea(answerInfoLength) {
	var answerTable = $('answerTable');
	var answerTbody = new Element('tbody');
	for (var i = 0; i < answerInfoLength; i++) {
		// 新建一行
		var answerTr = new Element('tr', {
			'id': 'answerTr' + i
		});
		var answerNoTd = new Element('td', {
			'id': 'answerNoTd' + i,
			'class': 'span-2 text_center'
		});
		answerNoTd.update(g_answerSerialNo[i]);
		var answerPointTd = new Element('td', {
			'id': 'answerPointTd' + i,
			'class': 'span-2 text_center'
		});
		answerPointTd.update(g_answerOldScore[i]);
		
		var answerCTd = new Element('td', {
			'id': 'answerCTd' + i,
			'class': 'span-3'
		});
		var answerCTxt = new Element('input', {
			'id': 'answerCTxt' + i,
			'name': 'answerCTxt' + i,
			'type':'txt',
			'class': 'span-3 text_center',
			'value': g_answerNewScore[i],
			'maxlength':'3',
			'onBlur': 'sumPoint()'
		});	
		answerTr.insert({
			bottom: answerNoTd
		});
		answerTr.insert({
			bottom: answerPointTd
		});
		answerTr.insert({
			bottom: answerCTd
		});	
		answerCTd.insert({
			bottom: answerCTxt
		});	
					
		// 插入一行
		answerTbody.insert({
			bottom: answerTr
		});
	}
	answerTable.update(answerTbody);
	
	// 校验输入的答案分数
    for (var i = 0; i < answerInfoLength; i++) {
		addRequiredCheck('answerCTxt' + i, getMessage('js.com.warning.0001', '试题分数'), true);
		addRegexCheck('answerCTxt' + i, getMessage('js.com.warning.0002', '试题分数'), '^[0-9]*[1-9][0-9]*$');
	}	
}

/**
 * TODO 弹出div层确定按钮操作(changeScore).
 */
function changeScoreBatch() {

	// 输入项目检查
	var score = $F('divTxtScore');
	if (score == null) {
		MsgBox.message(getMessage('js.com.warning.0001', '试题分数'));
		return;
	}
	if ($F('hidBigquestionType') == 1) {
		if (confirm(getMessage("js.tt.warn.KSW28"))) {
			var tableStableQuestion = $('stableQuestionTable');
			for (var i = 0; i < tableStableQuestion.rows.length; i++) {
				var tr = tableStableQuestion.rows[i];
				if (Number(tr.select('td')[5].innerHTML) == 1) {
					var itemScore = $('bigquestionInfo.stableQueInfoList[' + i + '].questionScore');
					itemScore.value = score;
				}
			}
		}
	}
	g_boxChangePoint.Close();
	countNumAndScore();
}

/**
 * 弹出div层确定按钮操作(changeItemScore).
 */
function changeItemScore() {
	var answerTable = $('answerTable');

	// 试题总分数
	var sumPoint= parseInt($('answerCTxt0').value,10);
	g_answerNewScore[0] = $('answerCTxt0').value;
	
	// 试题总分数字符串
	var sumStr = $('answerCTxt0').value;
	
	// tr的总个数
	var sumTr = answerTable.down().childElements().length;
	for (var i = 0; i < sumTr; i++){
		
		// 校验答案分数
		if(!checkInput('answerCTxt' + i )){
			return;
		}		
	}
	for (var i = 1; i < sumTr; i++) {
		sumPoint+=parseInt($('answerCTxt' + i).value,10);
		sumStr+=','+$('answerCTxt' + i).value;
		g_answerNewScore[i] = $('answerCTxt' + i).value;
	}
	//var oldPoint = Number(clickLine.select('input')[3].value);
	//var newPoint = Number($('txtScoreItem').value);
	//var resultKbn = true;
	//for (var i = 0; i < answerTable.rows.length; i++) {
	//	var tr = answerTable.rows[i];
	//	var answerPoint = Number(tr.select('td')[1].innerHTML);
	//	var resultPoint = (answerPoint * newPoint) % oldPoint;
	//	if ((answerPoint * newPoint) % oldPoint != 0) {
	//		resultKbn = false;
	//		break;
	//	}
	//}
	//if (resultKbn == false) {
	//	MsgBox.message(getMessage('js.tt.error.KSE71'));
	//	return;
	//} else {
		clickLine.select('input')[3].value = sumPoint;
		clickLine.select('input')[4].value = sumStr;
		clickLine.select('input')[5].value = 1;
	//}
	g_boxChangePointItem.Close();
	
	// 计算大题总分数
	countNumAndScore();
}

/**
 * 修改答案分数onchange事件.
 */
function sumPoint(){
	var answerTable = $('answerTable');
	
	// 答案总分数
	var sumPoint= parseInt($('answerCTxt0').value,10);
	
	// tr的总个数
	var sumTr = answerTable.down().childElements().length;
	
	// 校验每个入力框
	for (var i = 0; i < sumTr; i++){
		
		// 校验答案分数
		if(!checkInput('answerCTxt' + i )){
			return;
		}		
	}		
	for (var i = 1; i < sumTr; i++) {
		
		// 总分数
		sumPoint+=parseInt($('answerCTxt' + i).value,10);
	}
	$('txtScoreItem').update(sumPoint);
}

/**
 * TODO 弹出div层取消按钮事件.
 */
function divCancel() {
	g_boxChangePoint.Close();
}

/**
 * 弹出div层取消按钮事件.
 */
function divItemCancel() {
	
	// 把是否为第一次click标示设置为1
	clickLine.select('input')[5].value = 1;
	g_boxChangePointItem.Close();
}

/**
 * 试题选择按回调.
 */
function chooseQuestionCallBack(chooseQuestionJson) {

	// 选择试卷
	
	var url = 'k050041ChooseQuesCallBack.action';
	
	var pars = $('k050041MainForm').serialize();
	
	pars = pars + '& questionIdJson=' + encodeURI(chooseQuestionJson);
	
	
	new Ajax.Updater('divQuestionList', url, {
		parameters: pars,
		method: 'post',
		asynchronous: false,
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
				countNumAndScore();
				var table_Bigquestion = $('stableQuestionTable');
				for (var i = 0; i < table_Bigquestion.rows.length; i++) {
				
					$('content' + i).innerText = $('rtfContent' + i).innerText.replace(/\r|\n/g, "");
					$('content' + i).title = $('rtfContent' + i).innerText;
				}
				// 重置列表颜色
				listColor('stableQuestionTable', 300);
			}
		}
	});
}

/**
 * 关键字取得.
 */
function getKeyword(category1Id){

    // 关键字信息
    var url = 'k040011GetKeywordList.action?category1Id=' + category1Id;
    g_jscon.setContentArray(url)
}

/**
 * 获得题库试题数量.
 */
function getQuestionCount(obj) {
	clickLine = obj.up('tr', 0);
	var url = 'k050041GetQuestionCount.action';
	pars = $('k050041MainForm').serialize() + 	
			'&category1Id=' +
		    $('category1Id').value +
		    '&category2Id=' +
		    $('category2Id').value +
		    '&category3Id=' +
		    $('category3Id').value;
	// Ajax提交请求
	var myAjax = new Ajax.Request(url, {
		method: 'post',
		parameters: pars,
		onSuccess: function(response) {
		},
		onComplete: function(request) {
			if (request.responseText != null) {
				var resultCount = request.responseText;
				var baseCount = clickLine.select('label')[0]
				baseCount.innerText = Number(resultCount);
			}
		},
		onFailure: reportError
	});
}

/**
 * 校验一览画面输入项目.
 */
function inputCheck() {
	var tableRandomQuestion;
	// 画面输入校验
	if ($F('hidBigquestionType') == 1) {
		tableRandomQuestion = $('stableQuestionTable');
		for (var i = 0; i < tableRandomQuestion.rows.length; i++) {
			addRequiredCheck('bigquestionInfo.stableQueInfoList[' + i + '].questionScore', getMessage('js.com.warning.0001', '试题分数'), true);
			addRegexCheck('bigquestionInfo.stableQueInfoList[' + i + '].questionScore', getMessage('js.com.warning.0002', '试题分数'), '^[1-9][0-9]*$');
		}
	} else if ($F('hidBigquestionType') == 2) {
			addRequiredCheck('questionNum', getMessage('js.com.warning.0001', '出题数量'), true);
			addRegexCheck('questionNum', getMessage('js.com.warning.0002', '出题数量'), '^[1-9][0-9]*$');
			addRequiredCheck('questionScore', getMessage('js.com.warning.0001', '试题分数'), true);
			addRegexCheck('questionScore', getMessage('js.com.warning.0002', '试题分数'), '^[1-9][0-9]*$');
			addIntCheck($('questionNum'), getMessage('js.tt.error.KSE24'), 0, parseInt($('questionBaseCount').innerText, 10));
	}
}

/** 
 * 关闭所有子窗口.
 */
function closeAllSubwin() {
	if (window.handle1) {
		handle1.close();
	}
	if (window.handle2) {
		handle2.close();
	}
}
