/*
 * @(#)k040021.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 教育管理
 */
/**
 *  试题新建修改JavaScript.
 *
 * @author wanqiuhong
 * @version 1.0
 */
/**
 * 题库画面模式枚举.
 * 		1：题库新建
 * 		2:练选新建
 * 		3：考选新建
 * 		4：题库修改
 * 		5：练选修改
 *  	6：考选修改
 *   	7：参照
 */
var OpenEnum = {
	questionMode1: 1,
	questionMode2: 2,
	questionMode3: 3,
	questionMode4: 4,
	questionMode5: 5,
	questionMode6: 6,
	questionMode7: 7
};

/**
 * 答案题型枚举.
 * 		1：单选题
 * 		2:多选题
 * 		3：判断题
 * 		4：填空题
 * 		5：问答题
 *  	6：上传题
 */
var answerTypeEnum = {
	typeEnum1: 1,
	typeEnum2: 2,
	typeEnum3: 3,
	typeEnum4: 4,
	typeEnum5: 5,
	typeEnum6: 6
};

var arrayChooseOptionType;
var arrayJudgeOptionType;

/**
 * 关键字信息.
 */
var g_jscon;

/**
 * 画面onload.
 */
function initForm() {

	// 分类初期设置
	initCategory();
	
	// 多功能编辑器
	initEditor('editor', 830, 200);
	
	// 关键字信息
	g_jscon = new JsContentFilter('keyword', 'k040011GetKeywordList.action', 'keywordList');
	
	g_box = new PopupBox({
		// 唯一标志
		key: 3,
		// 标题内容，元素或字符串
		title: '答案设置',
		// 图标的CSS
		icon: 'img_opt opt_EditTable',
		// 内容元素
		content: $('setAnswer'),
		// 显示位置，相当与z-index
		position: 5,
		// 是否允许拖动
		drag: true
	
	});
	
	initValidation('questionInfoForm');
	
	// 选择题选项表达方式集合
	var chooseOptionTypeList = $('chooseOptionTypeList1').childElements();
	arrayChooseOptionType = new Array(chooseOptionTypeList.length);
	for (var i = 0; i < chooseOptionTypeList.length; i++) {
		var chooseOptionType = chooseOptionTypeList[i].innerHTML.split(',');
		arrayChooseOptionType[i] = chooseOptionType;
	}
	
	// 判断题选项表达方式集合
	var judgeOptionTypeList = $('judgeOptionTypeList').childElements();
	arrayJudgeOptionType = new Array(judgeOptionTypeList.length);
	for (var i = 0; i < judgeOptionTypeList.length; i++) {
		var judgeOptionType = judgeOptionTypeList[i].innerHTML.split('/');
		arrayJudgeOptionType[i] = judgeOptionType;
	}
	
	//arrayChooseOptionType =[['A','B','C','D','E','F','G','H','I','J'],
	//['a','b','c','d','e','f','g','h','I','j'],
	//[1,2,3,4,5,6,7,8,9,10],
	//['(1)','(2)','(3)','(4)','(5)','(6)','(7)','(8)','(9)','(10)'],
	//['㈠','㈡','㈢','㈣','㈤','㈥','㈦','㈧','㈨','㈩'],
	//['Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ','Ⅵ','Ⅶ','Ⅷ','Ⅸ','Ⅹ']];
	
	///arrayJudgeOptionType =[['是','否'],
	//['正确','错误'],
	//['对','错'],
	//['YES','NO'],
	//['√','×'],
	//['○','×']];
	if ($F('questionKindList') != 7 && $F('answersize') > 0) {
		$('addAnswer').disable();
	}
}

/**
 * 分类初期设置.
 */
function initCategory() {

	// 是否需要权限控制（0：不需要，1：需要）
	var authorityNeed = 0;
	// 权限区分
	var authorityId = 0;
	// 是否有初期值
	var initExist = 0;
	// 第一行是否为空
	var firstOptionNull;
	
	// 题库画面模式 = <题库新建>时
	if ($F('questionMode') == OpenEnum.questionMode1) {
	
		// 需要权限控制
		authorityNeed = 1;
		
		// 权限区分：题库管理员
		authorityId = 3
		
		// 没有初期值
		initExist = 0;
		
		// 第一行为空
		firstOptionNull = 0;
	}
	
	// 题库画面模式 = <练选新建>或<考选新建>或<练选修改>或<考选修改>时
	if ($F('questionMode') == OpenEnum.questionMode2 ||
	$F('questionMode') == OpenEnum.questionMode3 ||
	$F('questionMode') == OpenEnum.questionMode5 ||
	$F('questionMode') == OpenEnum.questionMode6) {
	
		// 不需要权限控制
		authorityNeed = 0;
		
		// 有初期值
		initExist = 1;
		
		// 第一行不为空
		firstOptionNull = 1;
	}
	
	// 题库画面模式 = <题库修改>或<参照>时
	if ($F('questionMode') == OpenEnum.questionMode4 || $F('questionMode') == OpenEnum.questionMode7) {
	
		// 需要权限控制
		authorityNeed = 1;
		
		// 权限区分：题库管理员
		authorityId = 3
		
		// 有初期值
		initExist = 1;
		
		// 第一行不为空
		firstOptionNull = 1;
	}
	
	// 分类初期化
	initCategoryList('K040021', authorityNeed, authorityId, false, initExist, 'sltCategory1', 'sltCategory2', 'sltCategory3', firstOptionNull, '0');
	
}

/**
 * 弹出答案设置.
 */
function pop() {

	// 获得当前试题题型
	var queKind = $F('questionKindList');
	
	// 初始化答案设置信息
	initAnswerItems();
	
	// 根据题型显示对应编辑框
	showdiv(queKind);
	
	// 弹出的位置，top left 
	g_box.Popup();
}

/**
 * 关闭答案设置.
 */
function closediv() {

	g_box.Close();
}

/**
 * 关闭答案设置并设置到画面.
 */
function setdiv() {

	// 追加答案设置
	setAnswerCard();
	
	// 追加按钮设置
	if ($F('questionKindList') != 7) {
	
		$('addAnswer').disable();
	}
}

/**
 * 初始化答案设置信息.
 */
function initAnswerItems() {
	// 答案设置
	// 试题题型
	if ($F('questionKindList') == 7) {
	
		$('answerKindList').value = 1;
		$('answerKindList').enable();
	} else {
		$('answerKindList').value = $F('questionKindList');
		$('answerKindList').disable();
	}
	// 试题数
	$('questionNum').value = 1;
	if ($F('questionKindList') != 7) {
		$('questionNum').disable();
	} else {
		$('questionNum').enable();
	}
	// 试题分数
	$('answerScore1').value = 1;
	// 题号编辑
	//$('answerQuesNoL').clear();
	//$('answerQuesNoC').clear();
	//$('answerQuesNoR').clear();
	
	// 单选题
	// 选项表示方式
	$('chooseOptionTypeList1').value = 1;
	// 选项数
	$('optionNumber1').value = 4;
	
	// 多选题
	// 选项表示方式
	$('chooseOptionTypeList2').value = 1;
	// 选项数
	$('optionNumber2').value = 4;
	
	// 判断题
	// 选项表示方式
	$('judgeOptionTypeList').value = 1;
	
	// 填空题
	// 填空数
	$('blankNumber1').value = 1;
}

/**
 * 根据题型显示对应编辑框.
 */
function showdiv(sid) {
	if (sid == 7) {
		sid = 1;
	}
	var i;
	for (i = 1; i < 7; i++) {
		if (i == sid) {
			$('setDive' + i).setStyle({
				display: 'block'
			});
		} else {
			$('setDive' + i).setStyle({
				display: 'none'
			});
		}
	}
}

/**
 * 追加答案设置.
 */
function setAnswerCard() {

	// 答案列表长度
	var answersize = parseInt($('answersize').value, 10);
	
	// 追加答案数量
	var questionNum = parseInt($('questionNum').value, 10);
	
	// 本次追加第一个答案的位置编号
	var sitNum = 0;
	
	// 追加答案
	if (setCheck()) {
	
		// 根据位置插入答案
		if ("" == $('answersize').value || 0 == $('answersize').value) {
		
			for (var i = 0; i < questionNum; i++) {
			
				// 复制答案
				newAnswer = $('answerDiv').clone(true);
				
				// 设置答案列表长度	
				answersize = i + 1;
				
				// 在空白的答案列表中插入第一个答案	
				$('answerEditDiv').insert({
					bottom: newAnswer
				});
				
				// 设置答案属性
				updateProp(newAnswer, i, i, sitNum);
			}
			
		} else {
		
			var trIndex = 0;
			
			while (trIndex < answersize) {
			
				// 取得复选框被选中的试题		
				if ($('asCheckbox' + trIndex).checked) {
				
					// 从列表最后一位到被选中的位置开始，答案列表中所有答案重新排序
					for (var i = answersize - 1; i >= trIndex; i--) {
					
						// 重置答案属性（被选中的答案之后所有答案向下移动questionNum个位置）
						updateProp($('answerDiv' + i), i, i + questionNum);
					}
					
					sitNum = trIndex;
					
					// 在被选中试题新行号前开始插入新答案
					for (var i = trIndex + questionNum - 1; i >= trIndex; i--) {
					
						// 复制答案
						newAnswer = $('answerDiv').clone(true);
						
						// 被选中试题新行号
						var newIndex = i + 1;
						
						// 在被选中试题新行号前插入答案	
						$('answerDiv' + newIndex).insert({
							before: newAnswer
						});
						
						// 设置该新答案属性
						updateProp(newAnswer, i, i, sitNum);
						
						// 设置答案列表长度	
						answersize++;
					}
					
					break;
				}
				
				trIndex++;
			}
			
			// 没有答案被选中
			if (trIndex == answersize) {
			
				sitNum = trIndex;
				
				for (var i = 0; i < questionNum; i++) {
				
					// 复制答案
					newAnswer = $('answerDiv').clone(true);
					
					// 设置答案行号
					var rowIndex = trIndex + i;
					
					// 在答案列表末插入答案
					$('answerEditDiv').insert({
						bottom: newAnswer
					});
					
					// 设置答案属性
					updateProp(newAnswer, rowIndex, rowIndex, sitNum);
					
					// 设置答案列表长度	
					answersize++;
				}
			}
		}
		
		// 答案列表长度重新设置
		$('answersize').value = answersize;
		
		g_box.Close();
	}
}

/**
 * 答案设置检查.
 */
function setCheck() {

	// 正整数判断
	var patrn = /^(\+{0,1})[0-9]*$/;
	
	// 判断试题分数
	if ("" == $('answerScore1').value || 0 == $('answerScore1').value) {
		addFieldError('answerScore1', getMessage('js.com.warning.0001', '试题分数'));
		// MsgBox.error(getMessage('js.com.warning.0001', '试题分数'));
		
		return false;
	}
	
	if (null == patrn.exec($('answerScore1').value)) {
		addFieldError('answerScore1', getMessage('js.tt.error.KSE54', '试题分数'));
		// MsgBox.error(getMessage('js.tt.error.KSE54', '试题分数'));
		
		return false;
	}
	
	// 判断答案数量
	if ("" == $('questionNum').value || 0 == $('questionNum').value) {
		addFieldError('answerScore1', getMessage('js.com.warning.0001', '试题分数'));
		// MsgBox.error(getMessage('js.com.warning.0001', '试题数'));
		
		return false;
		
	}
	
	if (null == patrn.exec($('questionNum').value)) {
		addFieldError('answerScore1', getMessage('js.tt.error.KSE54', '试题分数'));
		// MsgBox.error(getMessage('js.tt.error.KSE54', '试题数'));
		return false;
	}
	
	return true;
}

/**
 * 删除答案区域.
 */
function deleteAnswerArea() {

	// 答案列表长度
	var answersize = parseInt($('answersize').value, 10);
	
	if (answersize == 0) {
		return;
	}
	
	// 获得被选中试题行号
	for (var i = 0; i < answersize; i++) {
	
		// 删除行
		$('answerDiv' + i).remove();
		
	}
	
	// 设置答案列表长度
	$('answersize').value = 0;
	
	// 追加按钮设置
	$('addAnswer').enable();
}

/**
 * 删除答案设置.
 */
function deleteDiv() {

	// 原答案列表长度
	var answerLength = parseInt($('answersize').value, 10);
	
	// 答案列表长度
	var answersize = parseInt($('answersize').value, 10);
	
	// 被删除答案的位置集合
	var arrayIndex = new Array();
	
	if (answerLength == 0) {
		return;
	}
	
	// 数组序号
	var j = 0;
	
	// 获得被选中试题行号
	for (var i = 0; i < answersize; i++) {
	
		// 取得复选框被选中的试题		
		if ($('asCheckbox' + i).checked) {
		
			// 被删除答案的位置
			arrayIndex[j] = i;
			j++;
		}
	}
	
	// 需要被删除的答案数不为0
	if (0 != arrayIndex.length) {
		// 删除答案
		if (confirm(getMessage('js.tt.warn.JYW07'))) {
			for (var i = 0; i < arrayIndex.length; i++) {
			
				// 删除行
				$('answerDiv' + arrayIndex[i]).remove();
				
				// 设置答案列表长度
				answersize = answersize - 1;
			}
			
			// 从列表第一位被删除的位置开始，答案列表中所有答案重新排序
			if (0 != answersize) {
			
				// 原答案位置计数(从第一个被删除的答案的位置开始)
				var i = arrayIndex[0];
				
				// 被删除答案计数(后面的答案按照前面被删除答案的个数向前移动)
				var delIndex = 0;
				
				while (i < answerLength) {
					// 与原答案位置比较
					if (arrayIndex[delIndex] == i) {
						delIndex++;
					} else {
						// 重置答案属性
						updateProp($('answerDiv' + i), i, i - delIndex, '');
					}
					i++;
				}
			}
		}
		// 设置答案列表长度
		$('answersize').value = answersize;
	} else {
        //alert(getMessage('js.tt.info.KST11', '要删除的答案'));
        MsgBox.message(getMessage('js.tt.info.KST11', '要删除的答案'));
	}
	
	// 追加按钮设置
	if ($F('answersize') == 0) {
	
		$('addAnswer').enable();
	}
}

/**
 * 设置答案属性.
 * newAnswer 新建答案对象
 * oldIndex 旧答案行号
 * rowIndex 新答案行号
 * sitNum 本次追加第一个答案的位置编号
 */
function updateProp(newAnswer, oldIndex, rowIndex, sitNum) {

	// 答案类型
	var answerType;
	
	// 正整数判断
	var patrn = /^[1-9][0-9]*$/;
	
	// 如果旧行号与新行号相等，则为追加答案
	if (oldIndex == rowIndex) {
	
		// 答案类型取新值
		answerType = $('answerKindList').value;
		
		// 设置画面显示答案分数取新值
		newAnswer.select('label')[1].innerHTML = parseInt($('answerScore1').value, 10);
		
		// 答案题号取新值
		//		if ("" != $('answerQuesNoC').value && 0 != $('answerQuesNoC').value) {
	
		//			if (null != patrn.exec($('answerQuesNoC').value)) {
	
		//				var answerQuesNoC = parseInt($('answerQuesNoC').value, 10) - sitNum + rowIndex;
	
		//			} else {
	
		//				var answerQuesNoC = $('answerQuesNoC').value
		//			}
	
		//			newAnswer.select('INPUT')[1].value = $('answerQuesNoL').value + answerQuesNoC + $('answerQuesNoR').value;
		//		}
	
		// 否则为重置答案
	} else {
	
		// 答案类型取原值	
		answerType = $('answerType_' + oldIndex).value;
		
		// 设置画面显示答案分数取新值
		newAnswer.select('label')[1].innerHTML = $('answerList[' + oldIndex + '].answerScore').innerHTML;
		
		
	}
	
	// 设置Div ID
	newAnswer.id = 'answerDiv' + rowIndex;
	
	// 答案复选框 ID
	newAnswer.select('INPUT')[0].id = 'asCheckbox' + rowIndex;
	
	// 答案编号  ID
	newAnswer.select('label')[0].id = 'answerList[' + rowIndex + '].answerSerialNo';
	
	// 答案编号显示用
	newAnswer.select('label')[0].innerHTML = rowIndex + 1;
	
	// 答案编号KEEP属性
	newAnswer.select('label')[0].writeAttribute({
		'keep': '1'
	});
	
	// 答案题号 ID 
	//	newAnswer.select('INPUT')[1].id = 'answerQuesNo_' + rowIndex;
	
	// 答案题号  NAME
	//	newAnswer.select('INPUT')[1].name = 'answerList[' + rowIndex + '].answerQuesNo';
	
	// 设置答案分数ID
	newAnswer.select('label')[1].id = 'answerList[' + rowIndex + '].answerScore';
	
	// 答案分数KEEP属性
	newAnswer.select('label')[1].writeAttribute({
		'keep': '1'
	});
	
	// 添加答案选项
	// 单选题
	if (answerTypeEnum.typeEnum1 == answerType) {
		if (oldIndex == rowIndex) {
			optionNumber = $('optionNumber1').value;
		} else {
			optionNumber = $('optionNumber_' + oldIndex).value;
		}
		for (var i = 0; i < optionNumber; i++) {
		
			// 单选按钮Div对象
			var radioline;
			
			// 选项表达方式
			var chooseOptionType;
			
			// 选项数	
			var optionNumber;
			
			if (oldIndex == rowIndex) {
			
				// 复制单选按钮
				radioline = $('radioDiv').clone(true);
				$(newAnswer).insert({
					bottom: radioline
				});
				
				// 选项表达方式取新值
				chooseOptionType = $('chooseOptionTypeList1').value;
				
				// 选项数取新值
				optionNumber = $('optionNumber1').value;
				
			} else {
			
				// 单选按钮原Div
				radioline = $('radioDiv' + oldIndex + "_" + i);
				
				// 选项表达方式取原值
				chooseOptionType = $('optionType_' + oldIndex).value;
				
				// 选项数取原值
				optionNumber = $('optionNumber_' + oldIndex).value;
			}
			
			// 设置TR ID
			radioline.id = 'radioDiv' + rowIndex + "_" + i;
			
			// 单选按钮ID
			radioline.select('INPUT')[0].id = 'answerContent_' + i;
			
			// 单选按钮NAME
			radioline.select('INPUT')[0].name = 'answerList[' + rowIndex + '].answerContent';
			
			// 单选按钮VALUE
			radioline.select('INPUT')[0].value = i;
			
			// 设置画面表示选项表达方式ID
			radioline.select('label')[0].id = 'opType_' + rowIndex;
			
			// 设置画面表示选项表达方式VALUE
			radioline.select('label')[0].innerHTML = arrayChooseOptionType[parseInt($('chooseOptionTypeList1').value, 10) - 1][i];
		}
		
		// 复制分数及其他隐藏项
		cloneOrther(newAnswer, oldIndex, rowIndex, answerType, chooseOptionType, optionNumber, 0, 0);
	}
	
	// 多选题
	if (answerTypeEnum.typeEnum2 == answerType) {
		if (oldIndex == rowIndex) {
			optionNumber = $('optionNumber2').value;
		} else {
			optionNumber = $('optionNumber_' + oldIndex).value;
		}
		for (var i = 0; i < optionNumber; i++) {
		
			// 多选按钮Div对象
			var multyline;
			
			// 选项表达方式
			var chooseOptionType;
			
			// 选项数	
			var optionNumber;
			
			if (oldIndex == rowIndex) {
			
				// 复制多选按钮
				multyline = $('multyDiv').clone(true);
				$(newAnswer).insert({
					bottom: multyline
				});
				
				// 选项表达方式取新值
				chooseOptionType = $('chooseOptionTypeList2').value;
				
				// 选项数取新值
				optionNumber = $('optionNumber2').value;
				
			} else {
			
				// 多选按钮原Div
				multyline = $('multyDiv' + oldIndex + "_" + i);
				
				// 选项表达方式取原值
				chooseOptionType = $('optionType_' + oldIndex).value;
				
				// 选项数取原值
				optionNumber = $('optionNumber_' + oldIndex).value;
			}
			
			// 设置Div ID
			multyline.id = 'multyDiv' + rowIndex + "_" + i;
			
			// 单选按钮ID
			multyline.select('INPUT')[0].id = 'answerContent_' + i;
			
			// 单选按钮NAME
			multyline.select('INPUT')[0].name = 'answerList[' + rowIndex + '].answerContent';
			
			// 单选按钮VALUE
			multyline.select('INPUT')[0].value = i;
			
			// 设置画面表示选项表达方式ID
			multyline.select('label')[0].id = 'opType_' + rowIndex;
			
			// 设置画面表示选项表达方式VALUE
			multyline.select('label')[0].innerHTML = arrayChooseOptionType[parseInt($('chooseOptionTypeList2').value, 10) - 1][i];
		}
		
		// 复制分数及其他隐藏项
		cloneOrther(newAnswer, oldIndex, rowIndex, answerType, chooseOptionType, optionNumber, 0, 0);
	}
	
	// 判断题
	if (answerTypeEnum.typeEnum3 == answerType) {
		for (var i = 0; i < 2; i++) {
		
			// 单选按钮Div对象
			var radioline;
			
			// 选项表达方式
			var chooseOptionType;
			
			if (oldIndex == rowIndex) {
			
				// 复制单选按钮
				radioline = $('radioDiv').clone(true);
				$(newAnswer).insert({
					bottom: radioline
				});
				
				// 选项表达方式取新值
				chooseOptionType = $('judgeOptionTypeList').value;
				
			} else {
			
				// 单选按钮原Div
				radioline = $('radioDiv' + oldIndex + "_" + i);
				
				// 选项表达方式取原值
				chooseOptionType = $('optionType_' + oldIndex).value;
			}
			
			// 设置Div ID
			radioline.id = 'radioDiv' + rowIndex + "_" + i;
			
			// 单选按钮ID
			radioline.select('INPUT')[0].id = 'answerContent_' + i;
			
			// 单选按钮NAME
			radioline.select('INPUT')[0].name = 'answerList[' + rowIndex + '].answerContent';
			
			// 单选按钮VALUE
			radioline.select('INPUT')[0].value = i;
			
			// 设置画面表示选项表达方式ID
			radioline.select('label')[0].id = 'opType_' + rowIndex;
			
			// 设置画面表示选项表达方式VALUE
			radioline.select('label')[0].innerHTML = arrayJudgeOptionType[parseInt($('judgeOptionTypeList').value, 10) - 1][i];
		}
		
		// 复制分数及其他隐藏项
		cloneOrther(newAnswer, oldIndex, rowIndex, answerType, chooseOptionType, 2, 0, 0);
	}
	
	// 填空题
	if (answerTypeEnum.typeEnum4 == answerType) {
		if (oldIndex == rowIndex) {
			blankNumber = $('blankNumber1').value;
		} else {
			blankNumber = $('blankNumber_' + oldIndex).value;
		}
		for (var i = 0; i < blankNumber; i++) {
		
			// 入力框Div对象
			var textline;
			
			// 填空数
			var blankNumber;
			
			if (oldIndex == rowIndex) {
			
				// 复制入力框
				textline = $('textDiv').clone(true);
				$(newAnswer).insert({
					bottom: textline
				});
				
				// 填空数取新值
				blankNumber = $('blankNumber1').value;
			} else {
			
				// 入力框原TD
				textline = $('textDiv' + oldIndex + "_" + i);
				
				// 填空数取原值
				blankNumber = $('blankNumber_' + oldIndex).value;
			}
			
			// 设置Div ID
			textline.id = 'textDiv' + rowIndex + "_" + i;
			
			// 入力框ID
			textline.select('INPUT')[0].id = 'answerContent_' + i;
			
			// 入力框NAME
			textline.select('INPUT')[0].name = 'answerList[' + rowIndex + '].answerContentList[' + i + '].answerContent';
		}
		
		// 复制分数及其他隐藏项
		cloneOrther(newAnswer, oldIndex, rowIndex, answerType, 0, 0, $('blankNumber1').value, 0);
	}
	
	// 问答题
	if (answerTypeEnum.typeEnum5 == answerType) {
	
		// 文本域Div对象
		var textArealine;
		
		// 字数限制
		var wordLimits;
		
		if (oldIndex == rowIndex) {
		
			// 复制文本域
			textArealine = $('askDiv').clone(true);
			$(newAnswer).insert({
				bottom: textArealine
			});
			
			// 选项表达方式取新值
			wordLimits = 999;
		} else {
		
			// 文本域原Div
			textArealine = $('askDiv' + oldIndex);
			
			// 填空数取原值
			wordLimits = $('wordLimits_' + oldIndex).value;
			
			// 得分点列表长度
			var answerPointsize = parseInt($('answerPointsize_' + oldIndex).value, 10);
			
			// 得分点列表中所有得分点重新排序
			for (var i = 0; i < answerPointsize; i++) {
			
				// 重置得分点选框 ID
				$('clonePointDiv' + oldIndex + '_' + i).select('INPUT')[0].id = 'poitCheckbox' + rowIndex + '_' + i;
				
				// 重置TR ID
				$('clonePointDiv' + oldIndex + '_' + i).id = 'clonePointDiv' + rowIndex + '_' + i;
			}
		}
		
		// 设置Div ID
		textArealine.id = 'askDiv' + rowIndex;
		
		// 文本域ID
		textArealine.select('TEXTAREA')[0].id = 'answerContent_' + rowIndex;
		
		// 文本域NAME
		textArealine.select('TEXTAREA')[0].name = 'answerList[' + rowIndex + '].answerContent';
		
		// 答案得分点 Div ID
		textArealine.select('INPUT')[2].id = 'answerPointsize_' + rowIndex;
		
		// 答案得分点 DIV ID
		textArealine.select('DIV')[0].id = 'answerPointDiv_' + rowIndex;
		
		// 复制分数及其他隐藏项
		cloneOrther(newAnswer, oldIndex, rowIndex, answerType, 0, 0, 0, wordLimits);
	}
	
	// 上传题
	if (answerTypeEnum.typeEnum6 == answerType) {
	
		// 上传控件Div对象
		var textArealine;
		
		if (oldIndex == rowIndex) {
		
			// 复制上传控件
			fileline = $('upDiv').clone(true);
			$(newAnswer).insert({
				bottom: fileline
			});
		} else {
		
			// 上传控件原TD
			fileline = $('upDiv' + oldIndex);
			
			// 得分点列表长度
			var answerPointsize = parseInt($('answerPointsize_' + oldIndex).value, 10);
			
			// 得分点列表中所有得分点重新排序
			for (var i = 0; i < answerPointsize; i++) {
			
				// 重置得分点选框 ID
				$('clonePointDiv' + oldIndex + '_' + i).select('INPUT')[0].id = 'poitCheckbox' + rowIndex + '_' + i;
				
				// 重置TR ID
				$('clonePointDiv' + oldIndex + '_' + i).id = 'clonePointDiv' + rowIndex + '_' + i;
			}
		}
		
		// 设置Div ID
		fileline.id = 'upDiv' + rowIndex;
		
		// 上传隐藏控件ID
		fileline.select('INPUT')[0].id = 'attachFile_' + rowIndex;
		
		// 上传隐藏控件ID
		fileline.select('INPUT')[0].name = 'answerList[' + rowIndex + '].attachFile';
		
		// 上传隐藏控件onPropertyChange
		fileline.select('INPUT')[0].observe('change', function(event) {
		
			$('filePath_' + rowIndex).value = this.value;
		});
		
		// 上传控件ID
		fileline.select('INPUT')[1].id = 'filePath_' + rowIndex;
		
		// 上传控件NAME
		fileline.select('INPUT')[1].name = 'answerList[' + rowIndex + '].attachFilePath';
		
		// 文件浏览按钮ID
		fileline.select('INPUT')[2].id = 'btnUpload_' + rowIndex;
		
		// 文件浏览按钮select
		fileline.select('INPUT')[2].name = 'btnUpload_' + rowIndex;
		
		// 答案得分点 DIV ID
		fileline.select('INPUT')[5].id = 'answerPointsize_' + rowIndex;
		
		// 答案得分点 DIV ID
		fileline.select('DIV')[0].id = 'answerPointDiv_' + rowIndex;
		
		// 复制分数及其他隐藏项
		cloneOrther(newAnswer, oldIndex, rowIndex, answerType, 0, 0, 0, 0);
		
	}
	
}

/**
 * 复制其他隐藏项.
 * rowIndex 行号
 * answerType 答案题型
 * optionType 选项表示方式
 * optionNumber 选项数
 * blankNumber 填空数
 * wordLimits 字数限制
 */
function cloneOrther(newAnswer, oldIndex, rowIndex, answerType, optionType, optionNumber, blankNumber, wordLimits) {

	// 如果旧行号与新行号相等，则为追加答案
	if (oldIndex == rowIndex) {
	
		// 复制隐藏项
		var otherDiv = $('otherDiv').clone(true);
		
		$(newAnswer).insert({
			bottom: otherDiv
		});
		
		// 否则为重置答案
	} else {
		otherDiv = $('otherDiv' + oldIndex);
	}
	
	// 设置TR ID
	otherDiv.id = 'otherDiv' + rowIndex;
	
	// 答案题型ID
	otherDiv.select('INPUT')[0].id = 'answerType_' + rowIndex;
	
	// 答案题型NAME
	otherDiv.select('INPUT')[0].name = 'answerList[' + rowIndex + '].answerType';
	
	// 答案题型VALUE
	otherDiv.select('INPUT')[0].value = answerType;
	
	// 选项表示方式ID
	otherDiv.select('INPUT')[1].id = 'optionType_' + rowIndex;
	
	// 选项表示方式NAME
	otherDiv.select('INPUT')[1].name = 'answerList[' + rowIndex + '].optionType';
	
	// 选项表示方式VALUE
	otherDiv.select('INPUT')[1].value = optionType;
	
	// 选项数ID
	otherDiv.select('INPUT')[2].id = 'optionNumber_' + rowIndex;
	
	// 选项数NAME
	otherDiv.select('INPUT')[2].name = 'answerList[' + rowIndex + '].optionNumber';
	
	// 选项数VALUE
	otherDiv.select('INPUT')[2].value = optionNumber;
	
	// 填空数ID
	otherDiv.select('INPUT')[3].id = 'blankNumber_' + rowIndex;
	
	// 填空数NAME
	otherDiv.select('INPUT')[3].name = 'answerList[' + rowIndex + '].blankNumber';
	
	// 填空数VALUE
	otherDiv.select('INPUT')[3].value = blankNumber;
	
	// 字数限制ID
	otherDiv.select('INPUT')[4].id = 'wordLimits_' + rowIndex;
	
	// 字数限制NAME
	otherDiv.select('INPUT')[4].name = 'answerList[' + rowIndex + '].wordLimits';
	
	// 字数限制VALUE
	otherDiv.select('INPUT')[4].value = wordLimits;
	
}

/**
 * 追加答案得分点.
 */
function addPoint(btnId) {

	// 答案编号
	var tbId = Element.up(btnId, 'DIV', 1).select('label')[0].innerHTML - 1;
	
	// 得分点列表长度
	var answerPointsize = parseInt($('answerPointsize_' + tbId).value, 10);
	
	// 根据位置插入得分点
	if ("" == $('answerPointsize_' + tbId).value || 0 == $('answerPointsize_' + tbId).value) {
	
		// 复制答案
		newPoint = $('clonePointDiv').clone(true);
		
		// 设置答案列表长度	
		answerPointsize = 1;
		
		// 在空白的答案列表中插入第一个答案	
		$('answerPointDiv_' + tbId).insert({
			bottom: newPoint
		});
		
		// 设置答案属性
		updatePointProp(newPoint, 0, 0);
		
	} else {
	
		var trIndex = 0;
		
		while (trIndex < answerPointsize) {
		
			// 取得复选框被选中的得分点		
			if ($('poitCheckbox' + tbId + '_' + trIndex).checked) {
			
				// 从列表最后一位到被选中的位置开始，得分点列表中所有得分点重新排序
				for (var i = answerPointsize - 1; i >= trIndex; i--) {
				
					// 重置得分点属性（被选中的答案之后所有答案向下移动1个位置）
					updatePointProp($('clonePointDiv' + tbId + '_' + i), i, i + 1);
				}
				// 复制得分点
				newPoint = $('clonePointDiv').clone(true);
				
				// 被选中得分点新行号
				var newIndex = trIndex + 1;
				
				// 在被选中得分点新行号前插入得分点
				$('clonePointDiv' + tbId + '_' + newIndex).insert({
					before: newPoint
				});
				// 设置该新得分点属性
				updatePointProp(newPoint, trIndex, trIndex);
				
				// 设置得分点列表长度	
				answerPointsize++;
				
				break;
			}
			
			trIndex++;
		}
		
		// 没有得分点被选中
		if (trIndex == answerPointsize) {
		
			// 复制得分点
			newPoint = $('clonePointDiv').clone(true);
			
			// 设置得分点行号
			var rowIndex = trIndex;
			
			// 设置得分点列表长度	
			answerPointsize = trIndex + 1;
			
			// 在得分点列表末插入答案
			$('answerPointDiv_' + tbId).insert({
				bottom: newPoint
			});
			
			// 设置得分点属性
			updatePointProp(newPoint, rowIndex, rowIndex);
		}
	}
	
	// 答案列表长度重新设置
	$('answerPointsize_' + tbId).value = answerPointsize;
}

/**
 * 删除得分点设置.
 */
function delPoint(btnId) {

	// 答案编号
	var tbId = Element.up(btnId, 'DIV', 1).select('label')[0].innerHTML - 1;
	
	// 原得分点列表长度
	var pointLength = parseInt($('answerPointsize_' + tbId).value, 10);
	
	// 得分点列表长度
	var pointsize = parseInt($('answerPointsize_' + tbId).value, 10);
	
	// 被删除答案的位置集合
	var arrayIndex = new Array();
	
	// 数组序号
	var j = 0;
	
	if (pointLength == 0) {
		return;
	}
	
	// 获得被选中得分点行号
	for (var i = 0; i < pointsize; i++) {
	
		// 取得复选框被选中的得分点
		if ($('poitCheckbox' + tbId + '_' + i).checked) {
		
			// 被删除得分点的位置
			arrayIndex[j] = i;
			j++;
		}
	}
	
	// 需要被删除的得分点数不为0
	if (0 != arrayIndex.length) {
		// 删除得分点
		if (confirm(getMessage('js.tt.warn.JYW07'))) {
			for (var i = 0; i < arrayIndex.length; i++) {
			
				// 删除行
				$('clonePointDiv' + tbId + '_' + arrayIndex[i]).remove();
				
				// 设置得分点列表长度
				pointsize = pointsize - 1;
			}
			
			// 从列表第一位被删除的位置开始，得分点列表中所有得分点重新排序
			if (0 != pointsize) {
			
				// 得分点位置计数(从第一个被删除的得分点的位置开始)
				var i = arrayIndex[0];
				
				// 被删除得分点计数(后面的得分点按照前面被删除得分点的个数向前移动)
				var delIndex = 0;
				
				while (i < pointLength) {
					// 与原得分点位置比较，如果该位置得分点被删除，则后一得分点上移
					if (arrayIndex[delIndex] == i) {
						delIndex++;
					} else {
						// 重置答案属性
						updatePointProp($('clonePointDiv' + tbId + '_' + i), i, i - delIndex);
					}
					i++;
				}
			}
		}
		// 设置答案列表长度
		$('answerPointsize_' + tbId).value = pointsize;
	} else {
		//alert(getMessage('js.tt.info.KST11', '要删除的得分点'));
		MsgBox.message(getMessage('js.tt.info.KST11', '要删除的得分点'));
	}
}

/**
 * 设置得分点属性.
 * newAnswer 得分点对象
 * oldIndex 得分点旧行号
 * rowIndex 得分点新行号
 */
function updatePointProp(newPoint, oldIndex, rowIndex) {

	// 答案编号
	var tbId = Element.up(newPoint, 'DIV', 2).select('label')[0].innerHTML - 1;
	
	// 如果旧行号与新行号相等，则为追加得分点
	if (oldIndex == rowIndex) {
	
		// 添加行TR ID
		newPoint.id = 'clonePointDiv' + tbId + '_' + rowIndex;
		
	} else {
	
		// 重置TR ID
		newPoint.id = 'clonePointDiv' + tbId + '_' + rowIndex;
	}
	
	// 得分点选框 ID
	newPoint.select('INPUT')[0].id = 'poitCheckbox' + tbId + '_' + rowIndex;
	
	// 得分点内容 NAME
	newPoint.select('INPUT')[1].name = 'pointContent';
	
	// 得分点分数  NAME
	newPoint.select('INPUT')[2].name = 'pointScore';
	
}

/**
 * 对象跟随鼠标移动.
 */
function inputMouseover(event) {

	// 发生鼠标事件的按钮对象
	var element = Event.element(event);
	
	// 回应鼠标事件的fileID
	filePathId = element.up(1).select('INPUT')[0];
	
	// 获取按钮前
	var fileInput = $(filePathId.id);
	fileInput.setStyle({
		'left': (event.clientX + getWindowScrollLeft() - fileInput.getWidth() / 2) + 'px',
		'top': (event.clientY + getWindowScrollTop() - fileInput.getHeight() / 2) + 'px'
	});
}

/**
 * 提交试题信息.
 */
function submitAndNew() {

	// 输入校验
	if (!validate()) {
		return;
	}
	
	// 【立即核对复选框】被选中
	if ($F('reviewFlag')) {
	
		// 显示加载动画
		showLoader();
		
		// 表单提交，画面迁移到试题预览核对删除画面（K040051）
		var url = 'k040021NewQuestionChecked.action?questionInfo.category1Id=' + $F('sltCategory1') +
		'&questionInfo.category2Id=' +
		$F('sltCategory2') +
		'&questionInfo.category3Id=' +
		$F('sltCategory3') +
		'&category1 =' +
		$F('sltCategory1') +
		'&category2 =' +
		$F('sltCategory2') +
		'&category3 =' +
		$F('sltCategory3') +
		'&category1Flag =' +
		$('sltCategory1').readAttribute('accesskey') +
		'&category2Flag =' +
		$('sltCategory2').readAttribute('accesskey') +
		'&category3Flag =' +
		$('sltCategory3').readAttribute('accesskey') +
		'&questionInfo.questionContent =' +
		CKEDITOR.instances.editor.getData() +
		"&" +
		dataSerialize($('questionInfoForm'));
		
		$('questionInfoForm').action = url;
		$('questionInfoForm').submit();
		
		// 【立即核对复选框】未被选中
	} else {
		// 显示加载动画
		showLoader();
		
		var url = 'k040021NewQuestionAndCreate.action?questionInfo.category1Id=' + $F('sltCategory1') +
		'&questionInfo.category2Id=' +
		$F('sltCategory2') +
		'&questionInfo.category3Id=' +
		$F('sltCategory3') +
		'&category1 =' +
		$F('sltCategory1') +
		'&category2 =' +
		$F('sltCategory2') +
		'&category3 =' +
		$F('sltCategory3') +
		'&category1Flag =' +
		$('sltCategory1').readAttribute('accesskey') +
		'&category2Flag =' +
		$('sltCategory2').readAttribute('accesskey') +
		'&category3Flag =' +
		$('sltCategory3').readAttribute('accesskey') +
		'&questionInfo.questionContent =' +
		CKEDITOR.instances.editor.getData() +
		"&" +
		dataSerialize($('questionInfoForm'));
		$('questionInfoForm').action = url;
		$('questionInfoForm').submit();
	}
}

/**
 * 提交试题信息.
 */
function submitQuestionInfo() {

	// 输入校验
	if (!validate()) {
		return;
	}
	
	// 题库画面模式 = <题库新建> <参照>时
	if ($F('questionMode') == OpenEnum.questionMode1 ||
	$F('questionMode') == OpenEnum.questionMode7) {
		// 试题类型
		$('questionTypeList').enable();
		
		// 【立即核对复选框】被选中
		if ($F('reviewFlag')) {
		
			// 显示加载动画
			showLoader();
			
			// 表单提交，画面迁移到试题预览核对删除画面（K040051）
			var url = 'k040021SaveQuestionModeChecked17.action?questionInfo.category1Id=' + $F('sltCategory1') +
			'&questionInfo.category2Id=' +
			$F('sltCategory2') +
			'&questionInfo.category3Id=' +
			$F('sltCategory3') +
			'&category1 =' +
			$F('sltCategory1') +
			'&category2 =' +
			$F('sltCategory2') +
			'&category3 =' +
			$F('sltCategory3') +
			'&category1Flag =' +
			$('sltCategory1').readAttribute('accesskey') +
			'&category2Flag =' +
			$('sltCategory2').readAttribute('accesskey') +
			'&category3Flag =' +
			$('sltCategory3').readAttribute('accesskey') +
			"&" +
			dataSerialize($('questionInfoForm'));
			$('questionInfoForm').action = url;
			$('questionInfoForm').submit();
			
			// 【立即核对复选框】未被选中
		} else {
		
			// 显示加载动画
			showLoader();
			
			var url = 'k040021SaveQuestionMode17.action?questionInfo.category1Id=' + $F('sltCategory1') +
			'&questionInfo.category2Id=' +
			$F('sltCategory2') +
			'&questionInfo.category3Id=' +
			$F('sltCategory3') +
			'&category1 =' +
			$F('sltCategory1') +
			'&category2 =' +
			$F('sltCategory2') +
			'&category3 =' +
			$F('sltCategory3') +
			'&category1Flag =' +
			$('sltCategory1').readAttribute('accesskey') +
			'&category2Flag =' +
			$('sltCategory2').readAttribute('accesskey') +
			'&category3Flag =' +
			$('sltCategory3').readAttribute('accesskey') +
			"&" +
			dataSerialize($('questionInfoForm'));
			$('questionInfoForm').action = url;
			$('questionInfoForm').submit();
		}
	}
	
	// 题库画面模式 = <练选新建> 或<考选新建> 时
	if ($F('questionMode') == OpenEnum.questionMode2 ||
	$F('questionMode') == OpenEnum.questionMode3) {
	
		// 显示加载动画
		showLoader();
		
		
		// 试题类型
		$('questionTypeList').enable();
		var url = 'k040021SaveQuestionModeChecked23.action?questionInfo.category1Id=' + $F('sltCategory1') +
		'&questionInfo.category2Id=' +
		$F('sltCategory2') +
		'&questionInfo.category3Id=' +
		$F('sltCategory3') +
		'&questionInfo.questionKind=' +
		$F('questionKindList') +
		'&category1 =' +
		$F('sltCategory1') +
		'&category2 =' +
		$F('sltCategory2') +
		'&category3 =' +
		$F('sltCategory3') +
		'&category1Flag =' +
		$('sltCategory1').readAttribute('accesskey') +
		'&category2Flag =' +
		$('sltCategory2').readAttribute('accesskey') +
		'&category3Flag =' +
		$('sltCategory3').readAttribute('accesskey') +
		"&" +
		dataSerialize($('questionInfoForm'));
		$('questionInfoForm').action = url;
		$('questionInfoForm').submit();
	}
	
	// 题库画面模式 = <题库修改>时
	if ($F('questionMode') == OpenEnum.questionMode4) {
		
		// 试题类型
		$('questionTypeList').enable();
		
		// 【立即核对复选框】被选中
		if ($F('reviewFlag')) {
		
			// 显示加载动画
			showLoader();
			
			
			// 表单提交，画面迁移到试题预览核对删除画面（K040051）
			var url = 'k040021UpdateQuesChecked.action?questionInfo.category1Id=' + $F('sltCategory1') +
			'&questionInfo.category2Id=' +
			$F('sltCategory2') +
			'&questionInfo.category3Id=' +
			$F('sltCategory3') +
			'&category1 =' +
			$F('sltCategory1') +
			'&category2 =' +
			$F('sltCategory2') +
			'&category3 =' +
			$F('sltCategory3') +
			'&category1Flag =' +
			$('sltCategory1').readAttribute('accesskey') +
			'&category2Flag =' +
			$('sltCategory2').readAttribute('accesskey') +
			'&category3Flag =' +
			$('sltCategory3').readAttribute('accesskey') +
			"&" +
			dataSerialize($('questionInfoForm'));
			$('questionInfoForm').action = url;
			$('questionInfoForm').submit();
			
			// 【立即核对复选框】未被选中
		} else {
		
			// 显示加载动画
			showLoader();
			
			// 【立即核对复选框】未被选中
			var url = 'k040021UpdateQuestion.action?questionInfo.category1Id=' + $F('sltCategory1') +
			'&questionInfo.category2Id=' +
			$F('sltCategory2') +
			'&questionInfo.category3Id=' +
			$F('sltCategory3') +
			'&category1 =' +
			$F('sltCategory1') +
			'&category2 =' +
			$F('sltCategory2') +
			'&category3 =' +
			$F('sltCategory3') +
			'&category1Flag =' +
			$('sltCategory1').readAttribute('accesskey') +
			'&category2Flag =' +
			$('sltCategory2').readAttribute('accesskey') +
			'&category3Flag =' +
			$('sltCategory3').readAttribute('accesskey') +
			"&" +
			dataSerialize($('questionInfoForm'));
			$('questionInfoForm').action = url;
			$('questionInfoForm').submit();
		}
		
	}
	
	// 题库画面模式 = <练选修改> <考选修改>时
	if ($F('questionMode') == OpenEnum.questionMode5 ||
	$F('questionMode') == OpenEnum.questionMode6) {
	
		// 显示加载动画
		showLoader();
		
		// 试题类型
		$('questionTypeList').enable();
		var url = 'k040021SaveQuestionModeChecked56.action?questionInfo.category1Id=' + $F('sltCategory1') +
		'&questionInfo.category2Id=' +
		$F('sltCategory2') +
		'&questionInfo.category3Id=' +
		$F('sltCategory3') +
		'&questionInfo.questionKind=' +
		$F('questionKindList') +
		'&category1 =' +
		$F('sltCategory1') +
		'&category2 =' +
		$F('sltCategory2') +
		'&category3 =' +
		$F('sltCategory3') +
		'&category1Flag =' +
		$('sltCategory1').readAttribute('accesskey') +
		'&category2Flag =' +
		$('sltCategory2').readAttribute('accesskey') +
		'&category3Flag =' +
		$('sltCategory3').readAttribute('accesskey') +
		"&" +
		dataSerialize($('questionInfoForm'));
		$('questionInfoForm').action = url;
		$('questionInfoForm').submit();
	}
}

/**
 * 关键字取得.
 */
function getKeyword(category1Id) {

	// 关键字信息
	var url = 'k040031GetKeyWordInfo.action?category1Id=' + encodeURI($('sltCategory1').value);
	g_jscon.setContentArray(url)
}

/**
 * 加载编辑器.
 */
function initEditor(theName, theWidth, theHeight) {
	var editor = ckeditorConfig(theName, theWidth, theHeight, [['PreviewV2', '-', 'Templates'], ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print'], ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'], '/', ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'], ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'], ['Link', 'Unlink', 'Anchor'], ['InsertImage', 'InsertMedia', 'InsertDownload', 'syntaxhighlight', '-', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar'], '/', ['Styles', 'Format', 'Font', 'FontSize'], ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'], ['TextColor', 'BGColor'], ['Maximize', 'ShowBlocks', '-', 'About']]);
	
	addButtonToEditor(editor);
}

/**
 * 添加自定义按钮事件至编辑器.
 */
function addButtonToEditor(editor) {
	editor.on('pluginsLoaded', function(ev) {
	
		//插入图片  
		editor.addCommand('insertImage', {
			exec: function(e) {
				var returnValue = window.showModalDialog('../training/j030091InitAddPhoto?mode=2&objectId=' + $('questionInfo.questionId').innerHTML, '', 'dialogWidth=800px;dialogHeight=600px');
				
				
				if (returnValue != undefined && returnValue != null && returnValue.strip() != '') {
					editor.insertHtml(returnValue);
				}
			}
		});
		
		editor.ui.addButton('InsertImage', {
			label: '插入图片',
			className: 'cke_button_image',
			command: 'insertImage'
		});
		
		//插入多媒体
		editor.addCommand('insertMedia', {
			exec: function(e) {
			
				var returnValue = window.showModalDialog('../training/j030081InitAddVideo.action?mode=2&objectId=' + $('questionInfo.questionId').innerHTML, '', 'dialogWidth=800px;dialogHeight=600px');
				
				if (returnValue != undefined && returnValue != null && returnValue.strip() != '') {
					editor.insertHtml(returnValue);
				}
			}
		});
		
		editor.ui.addButton('InsertMedia', {
			label: '插入多媒体',
			icon: '../../images/tt/media.gif',
			command: 'insertMedia'
		});
		
		//插入下载文件
		editor.addCommand('insertDownload', {
			exec: function(e) {
			
				var returnValue = window.showModalDialog('../training/j030131InitAddFile.action?mode=2&objectId=' + $('questionInfo.questionId').innerHTML, '', 'dialogWidth=800px;dialogHeight=600px');
				
				if (returnValue != undefined && returnValue != null && returnValue.strip() != '') {
					editor.insertHtml(returnValue);
				}
			}
		});
		
		editor.ui.addButton('InsertDownload', {
			label: '插入文件',
			icon: '../../images/tt/download.bmp',
			command: 'insertDownload'
		});
		
	});
}

/**
 * 输入校验.
 * @return Boolean true:false.
 */
function validate() {

	// 试题类型输入校验
	if (!questionTypeValidate()) {
		return false;
	}
	
	// 分类输入校验
	if (!categoryValidate()) {
		return false;
	}
	
	// 试题难度输入校验
	if (!questionDifficultyValidate()) {
		return false;
	}
	
	// 试题来源输入校验
	if (!questionSourceValidate()) {
		return false;
	}
	
	// 试题内容输入校验
	if (!questionContentValidate()) {
		return false;
	}
	
	// 答案列表输入校验
	if (!answersizeValidate()) {
		return false;
	}
	
	// 答案内容输入校验
	if (!answerValidate()) {
		return false;
	}
	
	return true;
}

/**
 * 试题类型输入校验.
 * @return Boolean true:false.
 */
function questionTypeValidate() {

	form = $('questionInfoForm');// 需校验的
	var continueValidation = true;// 校验结果标记
	if (form.elements['questionInfo.questionType']) {
		field = form.elements['questionInfo.questionType'];
		
		if (continueValidation && field.value != null && (field.value == "" || field.value.replace(/^\s+|\s+$/g, "").length == 0)) {
			addFieldError('questionTypeList', getMessage('js.com.warning.0001', '试题类型'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('questionTypeList').focus();
		return false;
	}
}

/**
 * 试题分类输入校验.
 * @return Boolean true:false.
 */
function categoryValidate() {

	if ($('sltCategory1').readAttribute('accesskey') == 1 && $('sltCategory1').value == 0) {
	
		addFieldError('sltCategory1', getMessage('js.com.warning.0001', '第一级分类'));
		$('sltCategory1').focus();
		return false;
	}
	
	if ($('sltCategory2').readAttribute('accesskey') == 1 && $('sltCategory2').value == 0) {
	
		addFieldError('sltCategory2', getMessage('js.com.warning.0001', '第二级分类'));
		$('sltCategory2').focus();
		return false;
	}
	
	if ($('sltCategory3').readAttribute('accesskey') == 1 && $('sltCategory3').value == 0) {
	
		addFieldError('sltCategory3', getMessage('js.com.warning.0001', '第三级分类'));
		$('sltCategory3').focus();
		return false;
	}
	
	return true;
}

/**
 * 试题难度输入校验.
 * @return Boolean true:false.
 */
function questionDifficultyValidate() {

	form = $('questionInfoForm');// 需校验的
	var continueValidation = true;// 校验结果标记
	if (form.elements['questionInfo.questionDifficulty']) {
		field = form.elements['questionInfo.questionDifficulty'];
		
		if (continueValidation && field.value != null && (field.value == "" || field.value.replace(/^\s+|\s+$/g, "").length == 0)) {
			addFieldError('questionDifficultyList', getMessage('js.com.warning.0001', '试题难度'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('questionDifficultyList').focus();
		return false;
	}
}

/**
 * 试题来源输入校验.
 * @return Boolean true:false.
 */
function questionSourceValidate() {

	form = $('questionInfoForm');// 需校验的form
	var continueValidation = true;// 校验状态标记
	//输入长度校验
	if (form.elements['questionInfo.questionSource']) {
		field = form.elements['questionInfo.questionSource'];
		if (continueValidation && field.value != null) {
			var value = field.value;
			//trim field value
			while (value.substring(0, 1) == ' ') 
				value = value.substring(1, value.length);
			while (value.substring(value.length - 1, value.length) == ' ') 
				value = value.substring(0, value.length - 1);
			if (value.length > 200) {
				addFieldError('questionSource', getMessage('js.com.warning.0011', '试题来源', '200'));
				continueValidation = false;
			}
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		$('questionSource').focus();
		return false;
	}
}

/**
 * 试题内容输入校验.
 * @return Boolean true:false.
 */
function questionContentValidate() {

	var continueValidation = true;// 校验结果标记
	if (continueValidation && CKEDITOR.instances.editor.getData() != null &&
	(CKEDITOR.instances.editor.getData() == "" || CKEDITOR.instances.editor.getData().replace(/^\s+|\s+$/g, "").length == 0)) {
		MsgBox.error(getMessage('js.com.warning.0001', '试题内容'));
		continueValidation = false;
	}
	
	if (continueValidation) {
		return true;
	} else {
		CKEDITOR.instances.editor.focus();
		return false;
	}
}

/**
 * 答案列表校验.
 * @return Boolean true:false.
 */
function answersizeValidate() {

	form = $('questionInfoForm');// 需校验的
	var continueValidation = true;// 校验结果标记
	if (form.elements['answersize']) {
		field = form.elements['answersize'];
		
		if (continueValidation && field.value != null && (field.value == "" || field.value == 0)) {
			MsgBox.error(getMessage('js.com.warning.0001', '答案'));
			continueValidation = false;
		}
	}
	
	if (continueValidation) {
		return true;
	} else {
		return false;
	}
}

/**
 * 答案内容校验.
 * @return Boolean true:false.
 */
function answerValidate() {

	// 答案列表长度
	var answersize = parseInt($('answersize').value, 10);
	
	for (var i = 0; i < answersize; i++) {
	
		// 单选题/多选题/判断题
		if (answerTypeEnum.typeEnum1 == $('answerType_' + i).value ||
		answerTypeEnum.typeEnum2 == $('answerType_' + i).value ||
		answerTypeEnum.typeEnum3 == $('answerType_' + i).value) {
		
			var nullFlag = true;
			// 选项数所在DIV
			var otherDiv = $('otherDiv' + i);
			// 答案所在DIV
			var answerDiv = $('answerDiv' + i);
			for (var j = 0; j < otherDiv.select('INPUT')[2].value; j++) {
			
				if (answerDiv.select('INPUT')[j + 1].checked) {
				
					nullFlag = false;
					break;
				}
			}
			
			if (nullFlag) {
			
				var index = i + 1;
				addFieldError(answerDiv.select('INPUT')[1], getMessage('js.com.warning.0001', '第' + index + '题答案'));
				
				answerDiv.select('INPUT')[1].focus();
				return false;
			}
		}
		
		// 填空题
		if (answerTypeEnum.typeEnum4 == $('answerType_' + i).value) {
		
			var nullFlag = false;
			var field;
			// 选项数所在DIV
			var otherDiv = $('otherDiv' + i);
			// 答案所在DIV
			var answerDiv = $('answerDiv' + i);
			
			for (var j = 0; j < otherDiv.select('INPUT')[3].value; j++) {
				field = answerDiv.select('INPUT')[j + 1];
				if (field.value == "" || field.value.replace(/^\s+|\s+$/g, "").length == 0) {
				
					var index = i + 1;
					
					addFieldError(field, getMessage('js.com.warning.0001', '第' + index + '题答案'));
					
					field.focus();
					
					return false;
				}
			}
		}
		
		// 问答题
		if (answerTypeEnum.typeEnum5 == $('answerType_' + i).value) {
		
			var nullFlag = false;
			// 答案所在DIV
			var answerDiv = $('answerDiv' + i);
			var field = answerDiv.select('TEXTAREA')[0];
			
			if (field.value == "" || field.value.replace(/^\s+|\s+$/g, "").length == 0) {
			
				var index = i + 1;
				
				addFieldError(field, getMessage('js.com.warning.0001', '第' + index + '题答案'));
				
				field.focus();
				
				return false;
			}
			
			// 得分点校验
			if (!pointValidate(i)) {
				return false;
			}
			
		}
		
		// 上传题
		if (answerTypeEnum.typeEnum6 == $('answerType_' + i).value) {
			var nullFlag = false;
			// 答案所在DIV
			var answerDiv = $('answerDiv' + i);
			var field = answerDiv.select('INPUT')[2];
			if (field.value == "" || field.value.replace(/^\s+|\s+$/g, "").length == 0) {
			
				var index = i + 1;
				
				addFieldError(field, getMessage('js.com.warning.0001', '第' + index + '题答案'));
				
				field.focus();
				
				return false;
			}
			// 得分点校验
			if (!pointValidate(i)) {
				return false;
			}
		}
		
	}
	return true;
}

/**
 * 得分点校验.
 * @return Boolean true:false.
 */
function pointValidate(i) {

	// 得分点列表
	var answerPointsize = form.elements['answerPointsize_' + i];
	
	// 得分点总和
	var scoreSum = 0;
	
	if (answerPointsize.value != null &&
	(answerPointsize.value != "" ||
	answerPointsize.value.replace(/^\s+|\s+$/g, "").length != 0) &&
	answerPointsize.value != 0) {
	
		for (var j = 0; j < answerPointsize.value; j++) {
		
			var nullPoitFlag = false;
			var index = i + 1;
			// 正整数判断
			var patrn = /^(\+{0,1})[0-9]*$/;
			// 得分点所在DIV
			var pointDiv = $('clonePointDiv' + i + '_' + j);
			// 得分点内容
			var pointContent = pointDiv.select('INPUT')[1];
			// 得分点分数
			var pointScore = pointDiv.select('INPUT')[2];
			// 得分点内容判断
			if (pointContent.value == "" || pointContent.value.replace(/^\s+|\s+$/g, "").length == 0) {
			
				addFieldError(pointContent, getMessage('js.com.warning.0001', '第' + index + '题得分点内容'));
				
				pointContent.focus();
				
				return false;
			}
			
			// 得分点分数判断
			if (pointScore.value == "" || pointScore.value.replace(/^\s+|\s+$/g, "").length == 0 || pointScore.value == 0) {
			
				addFieldError(pointScore, getMessage('js.com.warning.0001', '第' + index + '题得分点分数'));
				
				pointScore.focus();
				
				return false;
			}
			if (null == patrn.exec(pointScore.value)) {
			
				addFieldError(pointScore, getMessage('js.tt.error.KSE54', '得分点分数'));
				
				pointScore.focus();
				
				return false;
			}
			
			// 合计得分点分数
			scoreSum = scoreSum + parseInt(pointScore.value, 10);
		}
		
		if (parseInt(scoreSum, 10) > 100) {
		
			addFieldError($('clonePointDiv' + i + '_' + 0).select('INPUT')[2], getMessage('js.tt.info.KST20', index));
			
			$('clonePointDiv' + i + '_' + 0).select('INPUT')[2].focus();
			
			return false;
		}
	}
	
	return true;
}
