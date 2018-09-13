/*
 * @(#)k050031.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
 */
var k060031Handle;
var k050041Handle;

/**
 * 试卷状态枚举.1:编辑中 2:待审批 3:已批准 4:不批准
 */
var PaperStatusEnum = {
	OnEdit: 1,
	WaitForApprove: 2,
	Approved: 3,
	Refuse: 4
};

/**
 * 题型枚举.1:单选题 2:多选题 3:判断题
 */
var QuesxtionTypeEnum = {
	QuesxtionType_1: 1,
	QuesxtionType_2: 2,
	QuesxtionType_3: 3
};
/**
 * 大题类别枚举.1:固定大题 2:随机大题
 */
var BigQuesxtionTypeEnum = {
	BigQuesxtionType_1: 1,
	BigQuesxtionType_2: 2
};

/**
 * 画面模式枚举.1:考试试卷编辑模式 2:练习试卷编辑模式
 */
var PaperModeEnum = {
	TestPaperEdit: 1,
	ExercisePaperEdit: 2
};

var nowLine; //当前选中行
var g_box; // 弹出DIV层
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
/**
 * 画面onload.
 */
function initPage() {
	
	// 火狐IE兼容
	firefoxIE();	
	// 按钮初期化设置
	regBtnFunc();
	
	myFunction.bindClickEvent = myFunction.clickEvent.bindAsEventListener(myFunction);
	var table_BigQuestion = $('tableBigQuestionList');
	for (var i = 0; i < table_BigQuestion.rows.length; i++) {
		Event.observe('radioSelectRow' + i, 'click', myFunction.bindClickEvent);
	}
	
	// 设置DIV弹出层
	g_box = new PopupBox({
		// 唯一标志
		key: 3,
		// 标题内容，元素或字符串
		title: '新建大题',
		// 图标的CSS
		icon: 'img_opt opt_EditTable',
		// 内容元素
		content: $('divSetBigquestion'),
		// 显示位置，相当与z-index
		position: 10,
		// 是否允许拖动
		drag: true
	});
	// 重置列表颜色
	listColor('tableBigQuestionList', 300);
	// 画面设置
	pageControlInit();
	clearDiv();
}

/**
 * 画面控件初期设置.
 */
function pageControlInit() {
	var mode = $F('hidModeKbn');
	var status = $F('hidPaperStatus');
	// 考试试卷编辑模式
	if (mode == PaperModeEnum.TestPaperEdit) {
	
		// 画面按钮设置
		if (status != PaperStatusEnum.OnEdit) {
			$('paperInfoForm').disable();
			$('btnSave').disable();
		}
	}
	
	//	listLinkControl(status);
	// 上移按钮
	$('btnMoveUp').disable();
	// 下移按钮
	$('btnMoveDown').disable();
}

/**
 * 大题类别与题型联动设置
 */
function changeQTypeQKind(selectId){
	// wanqiuhong 10/10 追加：大题类别与题型联动 
	var param = "bigQuestionTypeNo=" + selectId;
    param = addStamp(param);
    new Ajax.Request("k050031ChangeQTypeQKind.action", {
        method: 'get',
        parameters: param,
        onComplete: function(request){
            var selectList = request.responseText.evalJSON();
            _resetTTSelect("sltQuestionKind");
            _setQKindSelectList("sltQuestionKind", selectList);
        }
    })
}

/**
 * 设置下拉菜单值.
 * @param {Object} selectId 菜单Id.
 * @param {Object} selectList 数据.
 */
function _setQKindSelectList(selectId, selectList){
    var optionIdPre;
    var selectElement = $(selectId);
    var initValueExist = false;
    options = selectElement.childElements();
    
    for (var i = 0, len = selectList.length; i < len; i++) {
		
        optionIdPre = $(selectId).id + '_';
        if ($(optionIdPre + i) == null) {
            $(selectId).insert({
                bottom: new Element('option', {
                    'id': optionIdPre + i
                })
            });
        }
        $(optionIdPre + i).value = selectList[i]['diffNo'];
        $(optionIdPre + i).update(selectList[i]['diffName']);
        $(optionIdPre + i).show();
    }
}

/**
 * 添加大题.
 */
function addBigquestion() {
	// 设置下拉列表初期值
	$('sltBigQuestionType').value = 1;
	// 大题类别与题型联动设置
	changeQTypeQKind($('sltBigQuestionType').value);
	$('sltQuestionKind').value = 1;
	$('txtBigQuestionTime').clear();
	$('txtBigQuestionTitle').clear();
	$('txtBigQuestionDescription').clear();
	
	// 设置校验项目
	addRequiredCheck('sltQuestionKind', getMessage('js.com.warning.0001', '题型'), true);
	addRequiredCheck('sltBigQuestionType', getMessage('js.com.warning.0001', '大题类别'), true);
	addRegexCheck('txtBigQuestionTime', getMessage('js.com.warning.0002', '大题时间'), '^[1-9][0-9]*$')
	
	// 弹出层打开
	g_box.Popup();
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
		var url = 'k050031MoveBigquestionUp.action';
		var pars = 'moveBigquestionOrder=' + nowLine.select('input')[2].value;
		var myAjax = new Ajax.Request(url, {
			method: 'post',
			parameters: pars,
			onComplete: function(response) {
				var flg = checkException(response);
				if (!flg) {
					// 设置当前行与下一行排序的序号
					var displaySeq = pLine.select('input')[2].value;
					pLine.select('input')[2].value = nowLine.select('input')[2].value;
					nowLine.select('input')[2].value = displaySeq;
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
					listColor('tableBigQuestionList', 300);
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
		var url = 'k050031MoveBigquestionDown.action';
		var pars = 'moveBigquestionOrder=' + nowLine.select('input')[2].value;
		var myAjax = new Ajax.Request(url, {
			method: 'post',
			parameters: pars,
			onComplete: function(response) {
				var flg = checkException(response);
				if (!flg) {
					// 设置当前行与下一行排序的序号
					var displaySeq = nLine.select('input')[2].value;
					nLine.select('input')[2].value = nowLine.select('input')[2].value;
					nowLine.select('input')[2].value = displaySeq;
					
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
					listColor('tableBigQuestionList', 300);
				}
			},
			onFailure: reportError
		
		});
	}
	
}

/**
 * 编辑大题.
 */
function editBigQuestion(obj) {
	var line = obj.up('tr', 0);
	var serialNo = line.select('input')[1].value;
	
	//目标地址
	//var sURL = ' k050041BigQuestionEdit?bigquestionSerialNo=' + serialNo;
	var sURL = ' k050031EditQuestion?bigquestionSerialNo=' + serialNo
	 + "& testPaperInfo.paperTitle =" + $F('testPaperInfo.paperTitle')
	 + "& testPaperInfo.paperComment =" + $F('testPaperInfo.paperComment')
	 + "& testPaperInfo.paperDescription =" + $F('txtPaperDescription')
	 + "& testPaperInfo.paperTime =" + $F('testPaperInfo.paperTime');
	
	//窗口特征
	//	var sFeatures = 'dialogWidth:1000px;dialogHeight:800px;center:yes;help:yes;status:no';
	
	//打开子窗口
	//window.open(sURL, serialNo);
	k050041Handle = window.open(sURL, 'editBigQestionWin');
}

/**
 * 删除大题.
 */
function removeBigQuestion(obj) {
	var line = obj.up('tr', 0);
	var serialNo = line.select('input')[1].value;
	var order = line.select('input')[2].value;
	if (confirm(getMessage('js.tt.warn.JYW07'))) {
		var url = 'k050031RemoveBigquestion.action';
		var pars = 'moveBigquestionSerialNo=' + encodeURI(serialNo) + '&' + 'moveBigquestionOrder=' + encodeURI(order);
		new Ajax.Updater('divBigquestionList', url, {
			parameters: pars,
			method: 'get',
			onComplete: function(response) {
				var flg = checkException(response);
				if (!flg) {
					var status = $F('hidPaperStatus');
					// 计算试卷总分，试卷答题时间
					countScore();
					// 重置列表颜色
					listColor('tableBigQuestionList', 300);
					// 设置单选框点击事件
					myFunction.bindClickEvent = myFunction.clickEvent.bindAsEventListener(myFunction);
					var table_BigQuestion = $('tableBigQuestionList');
					for (var i = 0; i < table_BigQuestion.rows.length; i++) {
						Event.observe('radioSelectRow' + i, 'click', myFunction.bindClickEvent);
					}
					
					// 上移按钮
					$('btnMoveUp').disable();
					// 下移按钮
					$('btnMoveDown').disable();
					// 一览链接控制
					//					listLinkControl(status);
				}
			},
			onFailure: reportError
		
		});
	}
}

/**
 * 再编辑试卷.
 */
function reeditPaper() {
	
	// wanqiuhong 10/10 编辑：修改再编辑按钮的提示信息
    var status = $('testPaperInfo.paperStatusName').innerHTML;

    if ("已批准" == status) {
        if (!confirm(getMessage('js.tt.warn.JYW05'))) {
            return;
        }
    } else{
    	if (!confirm(getMessage('js.tt.warn.JYW04'))) {
            return;
        }
    }
	// 显示加载动画
	showLoader();
	var targetForm = $('paperInfoForm');
	targetForm.action = 'k050031ReeditPaper.action';
	targetForm.submit();
}

/**
 * 试卷预览.
 */
function paperReview() {
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
	$F('hidPaperVersionNo'), 'paperPreviewWin', sFeatures);
	
}

/**
 * 提交审批试卷.
 */
function submitForApproval() {

	// 画面输入校验
	if (!checkForm('paperInfoForm')) {
		return;
	}
	// 试卷答题时间逻辑检查
	if (!paperTimeCheck()) {
		return;
	}
	if (confirm(getMessage('js.tt.warn.KSW12'))) {
		// 判断大题数量
		var table_BigQuestionList = $('tableBigQuestionList');
		if (table_BigQuestionList.rows.length == 0) {
			MsgBox.message(getMessage('js.tt.error.KSE20'));
			return;
		}
		// 显示加载动画
		showLoader();
		// 画面提交
		var targetForm = $('paperInfoForm');
		targetForm.action = 'k050031SubmitPaperForApproval.action' + '?' + dataSerialize($('paperInfoForm'));
		targetForm.submit();
	}
}

/**
 * 保存试卷.
 */
function savePaperInfo() {
	// 画面输入校验
	if (!checkForm('paperInfoForm')) {
		return;
	}
	// 试卷答题时间逻辑检查
	if (!paperTimeCheck()) {
		return;
	}
	// 显示加载动画
	showLoader();
	var targetForm = $('paperInfoForm');
	targetForm.action = 'k050031SavePaperInfo.action' + '?' + dataSerialize($('paperInfoForm'));
	targetForm.submit();
}

/**
 * 弹出div层确定按钮操作.
 */
function saveBigquestion() {
	if (!checkForm('newBigquestionForm')) {
		return;
	}
	var questionKind = encodeURI($F('sltQuestionKind'));
	var bigquestionType = encodeURI($F('sltBigQuestionType'));
	var bigquestionTitle = encodeURI($F('txtBigQuestionTitle'));
	var bigquestionTime = encodeURI($F('txtBigQuestionTime'));
	var bigquestionDescription = encodeURI($F('txtBigQuestionDescription'));
	
	// 画面项目检查
	if (bigquestionType == BigQuesxtionTypeEnum.BigQuesxtionType_2) {
		if (!(questionKind == QuesxtionTypeEnum.QuesxtionType_1 || questionKind == QuesxtionTypeEnum.QuesxtionType_2 || questionKind == QuesxtionTypeEnum.QuesxtionType_3)) {
			MsgBox.message(getMessage('js.tt.error.KSE21'));
			return;
		}
	}
	
	// 弹出层重新设置
	clearDiv();
	g_box.Close();
	
	//检索数据并刷新信息显示列表
	var url = 'k050031AddBigquestion.action';
	var pars = 'questionKind=' + questionKind + '&bigquestionType=' + bigquestionType + '&bigquestionTitle=' + bigquestionTitle + '&bigquestionTime=' + bigquestionTime + '&bigquestionDescription=' + bigquestionDescription;
	new Ajax.Updater('divBigquestionList', url, {
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
				var status = $F('hidPaperStatus');
				// 计算试卷总分，试卷答题时间
				countScore();
				// 重置列表颜色
				listColor('tableBigQuestionList', 300);
				// 设置单选框点击事件
				myFunction.bindClickEvent = myFunction.clickEvent.bindAsEventListener(myFunction);
				var table_BigQuestion = $('tableBigQuestionList');
				for (var i = 0; i < table_BigQuestion.rows.length; i++) {
					Event.observe('radioSelectRow' + i, 'click', myFunction.bindClickEvent);
				}
				
				// 上移按钮
				$('btnMoveUp').disable();
				// 下移按钮
				$('btnMoveDown').disable();
				// 一览链接控制
				//				listLinkControl(status);
			}
		}
	});
}

/**
 * 弹出div层取消按钮操作.
 */
function cancel() {
	clearDiv();
	g_box.Close();
}

/**
 * 清空弹出div层.
 */
function clearDiv() {
	$('sltQuestionKind').clear();
	$('sltBigQuestionType').clear();
	$('txtBigQuestionTitle').clear();
	$('txtBigQuestionTime').clear();
	$('txtBigQuestionDescription').clear();
}

/**
 * 一览链接控制
 */
function listLinkControl(status) {
	var tableBookList = $('tableBigQuestionList');
	var rows = tableBookList.childElements()[0].childElements();
	
	// 一览控制
	for (var i = 0; i < rows.length; i++) {
		var operArea = rows[i].childElements()[8].childElements();
		
		if (status == PaperStatusEnum.OnEdit) {
			operArea[0].removeClassName('none');
			operArea[1].addClassName('none');
			operArea[2].removeClassName('none');
			operArea[3].addClassName('none');
		} else {
			operArea[0].addClassName('none');
			operArea[1].removeClassName('none');
			operArea[2].addClassName('none');
			operArea[3].removeClassName('none');
		}
	}
}

/**
 * 计算试卷总分.
 */
function countScore() {
	var table_BigQuestionList = $('tableBigQuestionList');
	var bigQuestionTotalScore = 0;
	for (var i = 0, len = table_BigQuestionList.rows.length; i < len; i++) {
		var itemTotalScore = 'bigQuestionTotalScore' + i;
		bigQuestionTotalScore = bigQuestionTotalScore + Number($(itemTotalScore).innerText);
	}
	$('testPaperInfo.paperTotalScore').innerText = bigQuestionTotalScore;
}

/**
 * 试卷答题时间检查.
 */
function paperTimeCheck() {
	// 试卷答题时间
	var paperTime = Number($F('testPaperInfo.paperTime'));
	// 大题的总答题时间
	var bigQuestionTotalTime = 0;
	var checkFlg = true;
	var table_BigQuestionList = $('tableBigQuestionList');
	var trArray = table_BigQuestionList.rows;
	for (var i = 0; i < trArray.length; i++) {
		var itemTime = trArray[i].select('td')[6].innerText;
		var bigQuestionTime = Number(itemTime);
		bigQuestionTotalTime = bigQuestionTotalTime + bigQuestionTime;
		// 大题没有设定答题时间
		if (bigQuestionTime == 0 || bigQuestionTime == null) {
			checkFlg = false;
		}
		// 没有设定答题时间的大题后面得大题设定答题时间时，报告错误消息
		if (checkFlg == false && bigQuestionTime > 0) {
			MsgBox.message(getMessage('js.tt.error.KSE77'));
			return false;
		}
	}
	// 大题的总答题时间 > 试卷答题时间时，报告错误消息
	if (bigQuestionTotalTime > paperTime) {
		MsgBox.message(getMessage('js.tt.error.KSE78'));
		return false;
	}
	// 有没有设置大题大题时间的大题时，大题的总答题时间 = 试卷答题时间时，报告错误消息
	if (bigQuestionTotalTime == paperTime && checkFlg == false) {
		MsgBox.message(getMessage('js.tt.error.KSE78'));
		return false;
	}
	return true;
}

/** 
 * 关闭所有子窗口.
 */
function closeAllSubwin() {
	if (window.k060031Handle) {
		k060031Handle.close();
	}
	if (window.k050041Handle) {
		k050041Handle.close();
	}
}
