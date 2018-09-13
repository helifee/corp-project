/*
 * @(#)empState.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
 */
/**
 * @fileoverview 人员管理画面JavaScript.
 *
 * @author 远东）mengqingyang
 * @version 1.0
 */

/**
 * 人员类（弹出的员工选择画面取得本页面传递的人员数组用）
 * @param {String} id
 * @param {String} name
 */
function User(id, name) {
	this.id = id;
	this.name = name;
}

/**
 * 画面onload初始化.
 */
function init() {
	//new JsNameFilter('empId', 'empNm', window['g_basePath']);
	// 列表隔行变色
	
	// 员工状态设定pop画面
	g_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'my01',
		// *标题内容，可用元素或字符串
		title: '员工状态设定',
		// *图标的CSS
		icon: '',
		// *内容元素
		content: $('div_empStateSet_pop'),
		// *显示位置，相当与z-index
		position: 3,
		// 是否允许拖动
		drag: true,
		// 关闭前的回调，用于校验等
		beforeclose: function() {
			return chkPopContent();
		},
		// 关闭后的回调，用于刷新页面等
		afterclose: function() {
			updateEmpList();
			//列表隔行变色
			listColor('table_peoList', 450);
		}
	});
	if ($('modeFlg').value == '2') {
		//$('empId').disable();
		//$('empNm').disable();
	}else{
		$('save').hide();
		$('addEmpState').hide();
		
	}
	
	listColor('table_peoList', 450);
	
	// pop员工选择画面
	emp_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'empSelect',
		// *标题内容，可用元素或字符串
		title: '员工选择',
		// *图标的CSS
		icon: 'org_info',
		// *内容元素
		content: $('empSelectPage'),
		// *显示位置，相当与z-index
		position: 9,
		// 是否允许拖动
		drag: true,
		loader: true
	});
	
	
	
}

/**
 * 关闭员工选择画面
 * 由弹出的员工选择画面调用
 */
function empSelectPageLoaded() {
	emp_box.loaded();
}


/**
 * 弹出员工选择画面
 * 参数empNum为限定选择的人数，如果不需要限定则不传
 */
function popSelEmp1() {
	// 参数empNum为限定选择的人数，如果不需要限定则不传
	$('empSelectPage').src = 'yb9010Init.action?empNum=1&mode=1';
	emp_box.Popup(40,200);
}

/**
 * 弹出的员工选择画面取得本页面传递的人员数组
 * @return 本页面传递的人员数组
 * ※弹出的员工选择画面会调用
 */
function prepareInitUsers() {

	//不需要传初始人员
	var usersPrevious = [];
	return usersPrevious;
	
	/*
	 // 传初始人员
	 var usersPrevious = [];
	 var id = 'YD'+$('empId').innerHTML;
	 var name = $('empNm').value;
	 // 初始人员存在则传给人员选择画面
	 if (id && name) {
	 usersPrevious.push(new User(id, name));
	 }
	 return usersPrevious;
	 */
}

/**
 * 取得弹出的员工选择画面所选人员信息
 * @param 人员数组
 * ※弹出的员工选择画面会调用
 */
function display(users) {
	//所选人员
	if (typeof(users) != 'undefined') {
		if (users.length != 0) {
			//所选人员只有一个只取数组里的第一个
			$('empId').innerHTML = users[0].id.replace('YD', '');
			$('empId2').value = users[0].id.replace('YD', '');
			$('empNm').innerHTML = users[0].name;
			$('empNm2').value = users[0].name;
			//关闭弹出的员工选择画面※
			emp_box.close(0);
		}
	} else {
		alert('请添加名为users的类');
	}
}

/**
 * 按照画面上的更改修改数据库
 * @return
 */
function saveEmpState() {

	// 清除错误
	$('errorMessage').className = 'none';
	if ($('modeFlg').value == '2') {
		//$('empId').enable();
		//$('empNm').enable();
	}
	//输入校验
	if (!checkForm('empStateForm')) {
		return;
	}
	if (chkTblEmpty()) {
		MsgBox.error(getMessage('js.emp.error.0010'));
		return;
	}
	
	
	//画面保存
	var url = 'yb0030UpdateStateLst.action';
	var pars = $('empStateListForm').serialize() +
	'&' + dataSerialize($('empStateListForm')) +
	'&' + $('empStateForm').serialize();
	pars = addToken(pars);
	//	new Ajax.Updater('div_peo_empStateList', url, {
	//					method: 'post',
	//					parameters: pars,
	//					onLoading:  function() {},
	//					onSuccess:  function(response) {},
	//					onFailure:  function(request) {},
	//					onComplete: function(request) {
	//						//列表隔行变色
	//						listColor('table_peoList',null);
	//						initValidation('empStateForm');
	//					}
	//					}
	//					);
	
		
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
	    //$('empStateForm').action = url;
		post(url,pars.toQueryParams() );
		//$('postdata').value = pars;
		//$('empStateForm').submit();
	}, function(){
		if ($('modeFlg').value == '2') {
			//$('empId').disable();
			//$('empNm').disable();
		}
	}, '是', '否');
}
/**
 * 根据员工编号检索员工状态并显示
 * @return
 */
function searchEmpState() {
	// 清除错误
	$('errorMessage').className = 'none';
	if ($('modeFlg').value == '2') {
		//$('empId').enable();
		//$('empNm').enable();
	}
	//输入校验
	if (!checkForm('empStateForm')) {
		return;
	}
	//画面检索
	var url = 'yb0030FindStateLst.action';
	var pars = $('empStateForm').serialize();
	pars = addToken(pars);
	new Ajax.Updater('div_peo_empStateList', url, {
		method: 'post',
		parameters: pars,
		onLoading: function() {
		},
		onSuccess: function(response) {
		},
		onFailure: function(request) {
		},
		onComplete: function(request) {
			//列表隔行变色
			listColor('table_peoList', 450);
		}
	});
	if ($('modeFlg').value == '2') {
		//$('empId').disable();
		//$('empNm').disable();
	}
	$('save').show();
	$('addEmpState').show();
}

/**
 * 弹出员工状态设定画面
 */
function popEmpStateSet(ele) {
	var index;
	// 弹出画面初始化 
	$('selStateId').selectedIndex = 0;
	$('popStartTime').clear();
	$('popEndTime').clear();
	$('popIndex').clear();
	$('popStartTime').enable();
	$('popEndTime').enable();
	removeFieldError($('popEndTime'));
	removeFieldError($('popStartTime'));
	
	// 如果来源是修改按钮 需要将画面的内容放到弹出层中
	if (ele != null) {
		index = $(($(ele).up('tr')).childElements()[0]).innerHTML;
		// 索引设定
		$('popIndex').value = index;
		
		// 状态设定
		for (var i = 0; i < $('selStateId').length; i++) {
		
			if ($('selStateId').options[i].value == $('empStateListForm_empStateList_' + index + '__empState').value) {
				$('selStateId').selectedIndex = i;
				break;
			}
		}
		// 开始日期
		$('popStartTime').value = $('empStateList[' + index + '].startTime').innerHTML;
		// 结束日期
		$('popEndTime').value = $('empStateList[' + index + '].endTime').innerHTML;
		
		// 开始日期在月结开始日期之前时不能修改
		if (compareDate($('popStartTime').value, $('monthFin').value)) {
			$('popStartTime').disable();
		}
		
	} else {
		// 空状态时是因为没查询
		if (chkTblEmpty()) {
			MsgBox.error(getMessage('js.com.warning.0001',$('stateLabel').innerHTML));
			return;
		}
	}
	
	g_box.popup();
}

/**
 * 员工状态设定画面关闭（点击确定）
 */
function popOkClose() {
	g_box.close();
}

/**
 * 员工状态设定画面关闭（点击取消）
 */
function popCancelClose() {
	g_box.close(0);
}

/*
 * 根据给定的开始结束日期返回时效字符
 * @return '将来', '现在', '过去'
 */
function getPrescripCNStr(startDate, endDate) {
	var cnStr;
	var now = formatOutput(new Date());
	if (!compareDate(startDate, now)) {
		cnStr = '将来';
	} else if (endDate != '' && !compareDate(now, endDate)) {
		cnStr = '过去';
	} else {
		cnStr = '现在';
	}
	return cnStr;
}

/**
 * 点击取消链接 删除表的行
 */
function del1Row(ele) {

	var tr = $(ele).up('tr');
	var hidds = $(tr.childElements()[1]).childElements();
	var preTr = findPreOrNxtTr(tr, 'pre');
	var nextTr = findPreOrNxtTr(tr, 'nxt');
	var monthFin = $('monthFin').value;
	var dateFromTo = $($(tr).childElements()[4]).childElements();
	var divnone = $(ele).up('div');
	var tmp = [];
	
	// start 删除check
	//只有一行不能取消
	if (null == preTr && null == nextTr) {
		MsgBox.error(getMessage('js.emp.error.0007'));
		return;
	}
	// 月结的状态不能取消
	if (hidds[4].value == '2') {
		MsgBox.error(getMessage('js.emp.error.0008'));
		return;
	}
	// 该行的开始日期在月结日期和月结日期之前时 若该行的结束日期是空则不能删除
	if (compareDate(dateFromTo[0].innerHTML, monthFin) && dateFromTo[2].innerHTML == '') {
		MsgBox.error(getMessage('js.emp.error.0008'));
		return;
	}
	// end 删除check
	// start 取消处理
	// 该行的开始日期在月结日期和月结日期之前时
	if (compareDate(dateFromTo[0].innerHTML, monthFin)) {
		// 月结日期和月结日期之前的状态保留
		// 结束日期
		dateFromTo[2].innerHTML = monthFin;
		// 可操作标志->月结
		hidds[4].value = '2';
		// 该行修改标识->1
		if (hidds[5].value != '2') {
			hidds[5].value = '1';
		}
		// 时效
		$($(tr).childElements()[2]).firstDescendant().innerHTML = '过去';
		// 操作区变为不可见
		divnone.className = 'none';
		
		// 后一状态的开始日期改为月结日期之后一天
		if (nextTr != null) {
			dateFromTo = $(nextTr.childElements()[4]).childElements();
			hidds = $(nextTr.childElements()[1]).childElements();
			// 开始日期
			dateFromTo[0].innerHTML = getNDaySDate(monthFin, 1);
			// 修改标志
			if (hidds[5].value != '2') {
				hidds[5].value = '1';
			}
			// 时效
			$($(nextTr).childElements()[2]).firstDescendant().innerHTML = getPrescripCNStr(dateFromTo[0].innerHTML, dateFromTo[2].innerHTML);
		}
	} else {
		// 该行删除标识->1
		hidds[6].value = '1';
		// 该行修改标识->1
		if (hidds[5].value != '2') {
			hidds[5].value = '1';
		}
		tmp[0] = dateFromTo[0].innerHTML;
		tmp[1] = dateFromTo[2].innerHTML;
		$(tr).hide();
		
		// 前一状态的结束日期变为该行的结束日期。前一状态变为可修改。
		if (preTr != null) {
			// start 前一状态
			dateFromTo = $(preTr.childElements()[4]).childElements();
			hidds = $(preTr.childElements()[1]).childElements();
			// 结束日期
			dateFromTo[2].innerHTML = tmp[1];
			// 修改标志
			if (hidds[5].value != '2') {
				hidds[5].value = '1';
			}
			// 时效
			$($(preTr).childElements()[2]).firstDescendant().innerHTML = getPrescripCNStr(dateFromTo[0].innerHTML, dateFromTo[2].innerHTML);
			// 可操作标志 
			hidds[4].value = '0';
			// 操作区可见
			divnone = $(preTr.childElements()[5]).childElements();
			divnone[0].className = '';
			// end 前一状态
		} else if (nextTr != null) {
			// 前一状态没有时后一状态的开始日期变为该行的开始日期
			dateFromTo = $(nextTr.childElements()[4]).childElements();
			hidds = $(nextTr.childElements()[1]).childElements();
			// 开始日期
			dateFromTo[0].innerHTML = tmp[0];
			// 时效
			$($(nextTr).childElements()[2]).firstDescendant().innerHTML = getPrescripCNStr(dateFromTo[0].innerHTML, dateFromTo[2].innerHTML);
			// 修改标志
			if (hidds[5].value != '2') {
				hidds[5].value = '1';
			}
		}
	}
	// end 取消处理
	//列表隔行变色
	listColor('table_peoList', null);
}

/**
 * 检查弹出画面和原来数据是否修改过
 * @return 000 未修改
 *         100 状态修改
 *         010 开始日期修改
 *         001 结束日期修改
 *         例: 110 状态修改 和 开始日期修改
 *
 */
function checkModified(selInd) {
	var reStr;
	
	if ($('empStateListForm_empStateList_' + selInd + '__empState').value != $('selStateId').value) {
		reStr = '1';
	} else {
		reStr = '0';
	}
	if ($('empStateList[' + selInd + '].startTime').innerHTML != $('popStartTime').value) {
		reStr += '1';
	} else {
		reStr += '0';
	}
	if ($('empStateList[' + selInd + '].endTime').innerHTML != $('popEndTime').value) {
		reStr += '1';
	} else {
		reStr += '0';
	}
	return reStr;
}

/**
 * 根据天数返回指定日期的前几天或后几天
 * @param sDate 'yyyy-MM-dd'
 * @param days 数字 可以为负
 * @return 返回字符串 'yyyy-MM-dd'
 */
function getNDaySDate(sDate, days) {
	// 1000 * 60 * 60 * 24
	var oneDayOfMill = 86400000;
	var date = new Date(sDate.substring(0, 4), sDate.substring(5, 7) - 1, sDate.substring(8, 10));
	date.setTime(date.getTime() + Number(days) * oneDayOfMill);
	
	return formatOutput(date);
}

/**
 * 格式化输出Date()
 * @return 'yyyy-MM-dd'
 */
function formatOutput(sDate) {
	var year = sDate.getFullYear();
	var month = sDate.getMonth() + 1;
	var day = sDate.getDate();
	var output;
	output = '' + year + '-';
	if (month < 10) {
		output = output + '0' + month + '-';
	} else {
		output = output + '' + month + '-';
	}
	if (day < 10) {
		output = output + '0' + day;
	} else {
		output = output + '' + day;
	}
	return output;
}

/**
 * 根据给定值设定行的内容
 * @param tr 行
 * @param values[][] 行的值
 *        [[索引,值 ],
 *         [索引,值]]
 *        索引含义
 *        0:行的索引值
 *        1:empId
 *        2:empState
 *        3:updateUser
 *        4:updateTime
 *        5:operableFlg
 *        6:modFlg
 *        7:delFlg
 *        8:startTimeBeforeUpdate
 *        9:prescription
 *        10:stateNm
 *        11:期间栏的startTime
 *        12:期间栏的endTime
 *        13：操作区 value 0:显示 1 不显示
 * @return 修改后的tr
 *
 */
function setTR(tr, values) {
	var hidds;
	var tmpl = 'tmpForAddTbl';
	var modIdNameFlg;
	var dateFromTo;
	var divNone;
	var prescription;
	var stateNm;
	//alert($(tr).down(0).next(0).innerHTML);
	hidds = $($(tr).childElements()[1]).childElements();
	//alert(hidds.length);
	
	
	if (hidds[0].name.substring(0, 12) == tmpl) {
		modIdNameFlg = true;
	} else {
		modIdNameFlg = false;
	}
	dateFromTo = $($(tr).childElements()[4]).childElements();
	divNone = $($(tr).childElements()[5]).childElements();
	prescription = $($(tr).childElements()[2]).firstDescendant();
	stateNm = $($(tr).childElements()[3]).firstDescendant();
	
	for (var i = 0; i < values.length; i++) {
		if (values[i][0] == 0) {
			$($(tr).childElements()[0]).innerHTML = values[i][1];
			
			if (modIdNameFlg) {
				hidds[0].name = 'empStateList[' + values[i][1] + '].empId';
				hidds[0].id = 'empStateListForm_empStateList_' + values[i][1] + '__empId';
				hidds[1].name = 'empStateList[' + values[i][1] + '].empState';
				hidds[1].id = 'empStateListForm_empStateList_' + values[i][1] + '__empState';
				hidds[2].name = 'empStateList[' + values[i][1] + '].updateUser';
				hidds[2].id = 'empStateListForm_empStateList_' + values[i][1] + '__updateUser';
				hidds[3].name = 'empStateList[' + values[i][1] + '].updateTime';
				hidds[3].id = 'empStateListForm_empStateList_' + values[i][1] + '__updateTime';
				hidds[4].name = 'empStateList[' + values[i][1] + '].operableFlg';
				hidds[4].id = 'empStateListForm_empStateList_' + values[i][1] + '__operableFlg';
				hidds[5].name = 'empStateList[' + values[i][1] + '].modFlg';
				hidds[5].id = 'empStateListForm_empStateList_' + values[i][1] + '__modFlg';
				hidds[6].name = 'empStateList[' + values[i][1] + '].delFlg';
				hidds[6].id = 'empStateListForm_empStateList_' + values[i][1] + '__delFlg';
				hidds[7].name = 'empStateList[' + values[i][1] + '].startTimeBeforeUpdate';
				hidds[7].id = 'empStateListForm_empStateList_' + values[i][1] + '__startTimeBeforeUpdate';
				prescription.id = 'empStateList[' + values[i][1] + '].prescription';
				stateNm.id = 'empStateList[' + values[i][1] + '].stateNm';
				//dateFromTo[0].name='empStateList[' + values[i][1] + '].startTime';
				dateFromTo[0].id = 'empStateList[' + values[i][1] + '].startTime';
				//dateFromTo[2].name='empStateList[' + values[i][1] + '].endTime';
				dateFromTo[2].id = 'empStateList[' + values[i][1] + '].endTime';
			}
		}
		// 隐藏项
		
		if (values[i][0] == 1) {
			hidds[0].value = values[i][1];
		}
		if (values[i][0] == 2) {
			hidds[1].value = values[i][1];
		}
		if (values[i][0] == 3) {
		
			hidds[2].value = values[i][1];
		}
		if (values[i][0] == 4) {
			hidds[3].value = values[i][1];
		}
		if (values[i][0] == 5) {
			hidds[4].value = values[i][1];
		}
		if (values[i][0] == 6) {
			hidds[5].value = values[i][1];
		}
		if (values[i][0] == 7) {
			hidds[6].value = values[i][1];
		}
		if (values[i][0] == 8) {
			hidds[7].value = values[i][1];
		}
		if (values[i][0] == 9) {
			// 时效
			$($(tr).childElements()[2]).firstDescendant().innerHTML = values[i][1];
		}
		if (values[i][0] == 10) {
			// 状态名
			$($(tr).childElements()[3]).firstDescendant().innerHTML = values[i][1];
		}
		if (values[i][0] == 11) {
			dateFromTo[0].innerHTML = values[i][1];
		}
		if (values[i][0] == 12) {
			dateFromTo[2].innerHTML = values[i][1];
		}
		if (values[i][0] == 13) {
			if (values[i][1] == 0) {
				divNone[0].className = '';
			} else {
				divNone[0].className = 'none';
			}
		}
	}
	return $(tr);
}

/**
 * 查找当前行时间上的前或后一行（没有删除的行）
 * 若排列为  1)2010/10/12~
 *           * 2010/01/10 ~ 2010/10/11
 *           2)2009/01/10 ~ 2010/01/09
 *         *为当前行 调用 preOrNxt 'pre' 时 返回 2)
 *                       preOrNxt'nxt'时 返回 1）
 *                       preOrNxt 'top' 时 返回1）
 * @param preOrNxt 'pre' 'nxt' 'top'
 * @return 没有的话返回null
 */
function findPreOrNxtTr(tr, preOrNxt) {

	var siblings;
	var hidds;
	var findFlg = false;
	if (preOrNxt == 'nxt') {
		siblings = $(tr).previousSiblings();
	} else if (preOrNxt == 'pre') {
		siblings = $(tr).nextSiblings();
	} else if (preOrNxt == 'top') {
		siblings = $('table_peoList').rows;
	}
	if (siblings.length == 0) {
		return null;
	}
	for (var i = 0; i < siblings.length; i++) {
		hidds = $(siblings[i].childElements()[1]).childElements();
		if (hidds[6].value == '1') {
			continue;
		} else {
			tr = siblings[i];
			findFlg = true;
			break;
		}
	}
	if (findFlg) {
		return $(tr);
	}
	return null;
}

/**
 * 更新员工状态一览
 */
function updateEmpList() {
	// 临时变量
	var tmp;
	// 添加用
	// 取得<tr>模板
	var tr;
	var index; // 索引号
	var hidds;
	var topTr; // 第一个不是删除的状态
	var backupPreState = [];
	// 修改用
	var selInd; // 选中行的索引号
	var now;
	var endDate;
	var startDate;
	var preTr; // 选中的tr的前一行
	var nextTr; // 选中的tr的后一行
	var j;
	var values = new Array();
	var value = new Array();
	var modChkRes; // 000 为未修改 
	var tmpTr; // Tr模板
	var monthFin = $('monthFin').value; // 月结日期
	now = formatOutput(new Date());
	
	// 添加时
	if ($('popIndex').value == '') {
		startDate = $('popStartTime').value.strip();
		endDate = $('popEndTime').value.strip();
		
		// start 修改前一状态
		// 查找第一个不为删除的状态
		topTr = findPreOrNxtTr(null, 'top');
		index = $($(topTr).childElements()[0]).innerHTML;
		
		// 修改结束时间
		value[0] = '12';
		value[1] = getNDaySDate(startDate, -1);
		values[0] = value.clone();
		// 修改时效
		value[0] = '9';
		value[1] = getPrescripCNStr($('empStateList[' + index + '].startTime').innerHTML, getNDaySDate(startDate, -1));
		values[1] = value.clone();
		// 修改标志
		// 前一状态的员工状态备份
		hidds = $($(topTr).childElements()[1]).childElements();
		if (hidds[5].value != '2') {
			value[0] = '6';
			value[1] = '1';
			values[2] = value.clone();
		}
		// 操作区
		if (getNDaySDate(startDate, -1) == monthFin) {
			// 可操作标志
			value[0] = '5';
			value[1] = '2';
			values[3] = value.clone();
			// 操作区不可见
			value[0] = '13';
			value[1] = '1';
			values[4] = value.clone();
		}
		// 前一状态的员工状态备份
		backupPreState[0] = hidds[1].value;
		backupPreState[1] = $($(topTr).childElements()[3]).firstDescendant().innerHTML;
		
		// 整行修改
		topTr = setTR($(topTr), values);
		// end 修改前一状态
		
		// start 追加状态
		// 取得模板
		tr = $($('tmpForAddTbl').rows[0]).clone(true);
		// 设定索引
		index = $('listCnt').value;
		$('listCnt').value = Number($('listCnt').value) + 1;
		
		value[0] = '0';
		value[1] = index;
		values[0] = value.clone();
		
		// 设定隐藏项
		value[0] = '1';
		value[1] = 'YD' + $('empId').innerHTML;
		values[1] = value.clone();
		
		value[0] = '2';
		value[1] = $('selStateId').value;
		values[2] = value.clone();
		
		value[0] = '3';
		value[1] = '';
		values[3] = value.clone();
		
		value[0] = '4';
		value[1] = '';
		values[4] = value.clone();
		
		value[0] = '5';
		value[1] = '0';
		values[5] = value.clone();
		
		value[0] = '6';
		value[1] = '2';
		values[6] = value.clone();
		
		value[0] = '7';
		value[1] = '0';
		values[7] = value.clone();
		
		value[0] = '8';
		value[1] = startDate;
		values[8] = value.clone();
		
		// 时效
		value[0] = '9';
		if (compareDate(startDate, now) && compareDate(now, endDate)) {
			value[1] = '现在';
		} else {
			value[1] = '将来';
		}
		values[9] = value.clone();
		
		// 状态名
		value[0] = '10';
		value[1] = $('selStateId').options[$('selStateId').selectedIndex].text;
		values[10] = value.clone();
		
		// 期间
		value[0] = '11';
		value[1] = startDate;
		values[11] = value.clone();
		value[0] = '12';
		value[1] = endDate;
		values[12] = value.clone();
		
		// 操作
		value[0] = '13';
		value[1] = 0;
		values[13] = value.clone();
		
		tr = setTR($(tr), values);
		
		// 在表第一行加
		$('table_peoList').down().insert({
			'top': tr
		});
		// end 追加状态
		
		// start 若追加的状态的结束日期不为空 则在之后再新追加一条
		if (endDate != '') {
			// 取得模板
			tr = $($('tmpForAddTbl').rows[0]).clone(true);
			// 设定索引
			index = $('listCnt').value;
			$('listCnt').value = Number($('listCnt').value) + 1;
			
			// 将原先的参数修改下重新设定到新行中
			values[0][1] = index;
			
			// 设定隐藏项
			// 状态
			values[2][1] = backupPreState[0];
			// 起始时间
			values[8][1] = getNDaySDate(endDate, 1);
			
			// 时效
			values[9][1] = getPrescripCNStr(getNDaySDate(endDate, 1), '');
			
			// 状态名
			values[10][1] = backupPreState[1];
			
			// 期间
			tmp = $($(tr).childElements()[4]).childElements();
			values[11][1] = getNDaySDate(endDate, 1);
			values[12][1] = '';
			
			tr = setTR($(tr), values);
			// 在表第一行加
			$('table_peoList').down().insert({
				'top': tr
			});
		}
		// end 若追加的状态的结束日期不为空 则在之后再新追加一条
	
	} else {
		// 修改时
		selInd = $('popIndex').value;
		// 检查是否修改过，没修改的话直接返回
		modChkRes = checkModified(selInd);
		if (modChkRes == '000') {
			return null;
		}
		
		endDate = $('popEndTime').value.strip();
		startDate = $('popStartTime').value.strip();
		
		// start 修改当前行
		tr = $('empStateListForm_empStateList_' + selInd + '__empState').up('tr');
		// 当前状态备份
		hidds = $($(tr).childElements()[1]).childElements();
		backupPreState[0] = hidds[1].value;
		backupPreState[1] = $($(tr).childElements()[3]).firstDescendant().innerHTML;
		
		j = 0;
		// 如果修改的行的开始日期在月结日期和月结日期之前
		if ($('popStartTime').disabled == true) {
			// start 月结前的保留
			// 结束日期
			value[0] = '12';
			value[1] = monthFin;
			values[j] = value.clone();
			j++;
			// 修改标志
			if ($('empStateListForm_empStateList_' + selInd + '__modFlg').value != '2') {
				value[0] = '6';
				value[1] = '1';
				values[j] = value.clone();
				j++;
			}
			// 可操作标志 -》月结
			value[0] = '5';
			value[1] = '2';
			values[j] = value.clone();
			j++;
			// 时效
			value[0] = '9';
			value[1] = '过去';
			values[j] = value.clone();
			j++;
			// 操作区
			value[0] = '13';
			value[1] = '1';
			values[j] = value.clone();
			j++;
			
			tr = setTR(tr, values);
			// end 
			// start 月结日期后的新追加一条状态
			// 取得模板
			tmpTr = $($('tmpForAddTbl').rows[0]).clone(true);
			// 设定索引
			index = $('listCnt').value;
			$('listCnt').value = Number($('listCnt').value) + 1;
			
			value[0] = '0';
			value[1] = index;
			values[0] = value.clone();
			
			// 设定隐藏项
			value[0] = '1';
			value[1] = 'YD' + $('empId').innerHTML;
			values[1] = value.clone();
			
			value[0] = '2';
			value[1] = $('selStateId').value;
			values[2] = value.clone();
			
			value[0] = '3';
			value[1] = '';
			values[3] = value.clone();
			
			value[0] = '4';
			value[1] = '';
			values[4] = value.clone();
			
			value[0] = '5';
			value[1] = '0';
			values[5] = value.clone();
			
			value[0] = '6';
			value[1] = '2';
			values[6] = value.clone();
			
			value[0] = '7';
			value[1] = '0';
			values[7] = value.clone();
			
			value[0] = '8';
			value[1] = getNDaySDate(monthFin, 1);
			values[8] = value.clone();
			
			// 时效
			value[0] = '9';
			value[1] = getPrescripCNStr(getNDaySDate(monthFin, 1), endDate);
			values[9] = value.clone();
			
			// 状态名
			value[0] = '10';
			value[1] = $('selStateId').options[$('selStateId').selectedIndex].text;
			values[10] = value.clone();
			
			// 期间
			value[0] = '11';
			value[1] = getNDaySDate(monthFin, 1);
			values[11] = value.clone();
			value[0] = '12';
			value[1] = endDate;
			values[12] = value.clone();
			
			// 操作
			value[0] = '13';
			value[1] = 0;
			values[13] = value.clone();
			
			tmpTr = setTR($(tmpTr), values);
			
			// 在当前行后加
			$(tr).insert({
				'before': tmpTr
			});
			// end 月结日期后的新追加一条状态
			// 取得前一行 后一行
			preTr = null;
			nextTr = findPreOrNxtTr(tmpTr, 'nxt');
		} else {
			// 当前行修改
			// 状态
			value[0] = '2';
			value[1] = $('selStateId').value;
			values[j] = value.clone();
			j++;
			// ->状态名称
			value[0] = '10';
			value[1] = $('selStateId').options[$('selStateId').selectedIndex].text;
			values[j] = value.clone();
			j++;
			
			// 修改标志
			if ($('empStateListForm_empStateList_' + selInd + '__modFlg').value != '2') {
				value[0] = '6';
				value[1] = '1';
				values[j] = value.clone();
				j++;
			}
			// 时效
			value[0] = '9';
			value[1] = getPrescripCNStr(startDate, endDate);
			values[j] = value.clone();
			j++;
			
			// ->开始结束日期
			value[0] = '11';
			value[1] = startDate;
			values[j] = value.clone();
			j++;
			
			value[0] = '12';
			value[1] = endDate;
			values[j] = value.clone();
			j++;
			
			tr = setTR($(tr), values);
			// 取得前一行 后一行
			preTr = findPreOrNxtTr(tr, 'pre');
			nextTr = findPreOrNxtTr(tr, 'nxt');
		}
		// end 修改当前行
		
		// start 修改前后行
		// 修改前一行
		if (preTr != null) {
			j = 0;
			values = new Array();
			
			hidds = $($(preTr).childElements()[1]).childElements();
			// 终了时间
			value[0] = '12';
			value[1] = getNDaySDate(startDate, -1);
			values[j] = value.clone();
			j++;
			// 如果终了时间刚好是月结的时间
			if (getNDaySDate(startDate, -1) == monthFin) {
				// 可操作标志
				value[0] = '5';
				value[1] = '2';
				values[j] = value.clone();
				j++;
				// 操作区不可见
				value[0] = '13';
				value[1] = '1';
				values[j] = value.clone();
				j++;
			}
			
			// 修改标志
			// 是否是新追加行
			if (hidds[5].value != '2') {
				value[0] = '6';
				value[1] = '1';
				values[j] = value.clone();
				j++;
			}
			// 时效
			tmp = $($(preTr).childElements()[4]).childElements();
			value[0] = '9';
			value[1] = getPrescripCNStr(tmp[0].innerHTML, getNDaySDate(startDate, -1));
			values[j] = value.clone();
			j++;
			
			setTR(preTr, values);
		}
		// 修改后一行
		if (nextTr != null) {
			j = 0;
			values = new Array();
			
			hidds = $($(nextTr).childElements()[1]).childElements();
			// 开始时间
			value[0] = '11';
			value[1] = getNDaySDate(endDate, 1);
			values[j] = value.clone();
			j++;
			// 修改标志
			// 是否是新追加行
			if (hidds[5].value != '2') {
				value[0] = '6';
				value[1] = '1';
				values[j] = value.clone();
				j++;
			}
			// 时效
			tmp = $($(nextTr).childElements()[4]).childElements();
			value[0] = '9';
			value[1] = getPrescripCNStr(getNDaySDate(endDate, 1), tmp[2].innerHTML);
			values[j] = value.clone();
			j++;
			
			setTR(nextTr, values);
		} else {
			// 在后一行没有状态且修改后的终了时间不为空时追加一条元状态
			if (endDate != '') {
				// 取得模板
				tr = $($('tmpForAddTbl').rows[0]).clone(true);
				// 设定索引
				index = $('listCnt').value;
				$('listCnt').value = Number($('listCnt').value) + 1;
				
				value[0] = '0';
				value[1] = index;
				values[0] = value.clone();
				
				// 设定隐藏项
				value[0] = '1';
				value[1] = 'YD' + $('empId').innerHTML;
				values[1] = value.clone();
				
				value[0] = '2';
				value[1] = backupPreState[0];
				values[2] = value.clone();
				
				value[0] = '3';
				value[1] = '';
				values[3] = value.clone();
				
				value[0] = '4';
				value[1] = '';
				values[4] = value.clone();
				
				value[0] = '5';
				value[1] = '0';
				values[5] = value.clone();
				
				value[0] = '6';
				value[1] = '2';
				values[6] = value.clone();
				
				value[0] = '7';
				value[1] = '0';
				values[7] = value.clone();
				
				value[0] = '8';
				value[1] = getNDaySDate(endDate, 1);
				values[8] = value.clone();
				
				// 时效
				value[0] = '9';
				value[1] = getPrescripCNStr(getNDaySDate(endDate, 1), '');
				values[9] = value.clone();
				
				// 状态名
				value[0] = '10';
				value[1] = backupPreState[1];
				values[10] = value.clone();
				
				// 期间
				value[0] = '11';
				value[1] = getNDaySDate(endDate, 1);
				values[11] = value.clone();
				value[0] = '12';
				value[1] = '';
				values[12] = value.clone();
				
				// 操作
				value[0] = '13';
				value[1] = 0;
				values[13] = value.clone();
				
				tr = setTR($(tr), values);
				// 在表第一行加
				$('table_peoList').down().insert({
					'top': tr
				});
				
			}
		}
		// end 修改前后行
	}
}

/**
 * 检查弹出层的内容是否合法
 */
function chkPopContent() {
	var addModFlg = true;// true：add  false:mod
	var tr = null;
	var preTr;
	var nextTr;
	var startDate = $('popStartTime').value;
	var endDate = $('popEndTime').value;
	var monthFin = $('monthFin').value;
	var dateFromTo;
	
	if ($('popIndex').value != '') {
		addModFlg = false;
		tr = $('empStateListForm_empStateList_' + $('popIndex').value + '__empState').up('tr');
		preTr = findPreOrNxtTr(tr, 'pre');
		nextTr = findPreOrNxtTr(tr, 'nxt');
	} else {
		preTr = findPreOrNxtTr(null, 'top');
		nextTr = null;
	}
	// start 开始日期检查
	// 开始日期不能为空
	if (startDate == '') {
		addFieldError($('popStartTime'), getMessage('js.com.warning.0001', '开始日期'));
		return false;
	}
	// 如果是添加的话还需要在现在日期之后<----修改前
	// 如果是添加的话还需要在月结日期之后<----修改后
	if (addModFlg) {
		/*
		 if (compareDate(startDate, formatOutput(new Date()))) {
		 addFieldError($('popStartTime'), getMessage('js.emp.error.0006', '开始日期', '今天(' + formatOutput(new Date()) + ')之后'));
		 return false;
		 }
		 */
		if (compareDate(startDate, monthFin)) {
			addFieldError($('popStartTime'), getMessage('js.emp.error.0006', '开始日期', '月结日期(' + monthFin + ')之后'));
			return false;
		}
	}
	// 检查开始日期是否在前一状态开始日期之后
	if (preTr != null) {
		dateFromTo = $($(preTr).childElements()[4]).childElements();
		
		if (compareDate(startDate, dateFromTo[0].innerHTML)) {
			addFieldError($('popStartTime'), getMessage('js.emp.error.0006', '开始日期', '前一状态的开始日期(' + dateFromTo[0].innerHTML +
			')之后'));
			return false;
		}
	}
	
	// 检查开始日期是否在月结日期之前
	if ($('popStartTime').disabled == false && compareDate(startDate, monthFin)) {
		addFieldError($('popStartTime'), getMessage('js.emp.error.0006', '开始日期', '月结日期(' + monthFin +
		')之后'));
		return false;
	}
	
	// 检查开始日期是否在后一状态的开始日期之前
	if (nextTr != null) {
		dateFromTo = $($(nextTr).childElements()[4]).childElements();
		
		if (compareDate(dateFromTo[0].innerHTML, startDate)) {
			addFieldError($('popStartTime'), getMessage('js.emp.error.0006', '开始日期', '后一状态的开始日期(' + dateFromTo[0].innerHTML +
			')之前'));
			return false;
		}
	}
	// end 开始日期检查
	// start 结束日期检查
	// 如果 结束日期为空且后一状态存在
	if (endDate == '' && nextTr != null) {
		addFieldError($('popEndTime'), getMessage('js.com.warning.0001', '结束日期'));
		return false;
	}
	
	if (endDate != '') {
		// 检查结束日期是否在开始日期之后
		if (!compareTime($('popStartTime'), $('popEndTime'))) {
			return false;
		}
		// 检查结束日期是否在后一个状态的结束日期之前
		if (nextTr != null) {
			dateFromTo = $($(nextTr).childElements()[4]).childElements();
			if (dateFromTo[2].innerHTML != '' && compareDate(dateFromTo[2].innerHTML, endDate)) {
				addFieldError($('popEndTime'), getMessage('js.emp.error.0006', '结束日期', '后一状态的结束日期(' + dateFromTo[2].innerHTML + ')之前'));
				return false;
			}
		}
		// 结束日期是否在月结日期以及月结日期之前
		if (compareDate(endDate, monthFin)) {
			addFieldError($('popEndTime'), getMessage('js.emp.error.0006', '结束日期', '月结日期(' + monthFin +
			')之后'));
			return false;
		}
	}
	//==============2010/08/09 滕长龙 对应9999/12/31日期越界问题 start =============
	if (endDate == '9999-12-31') {
		addFieldError($('popEndTime'), getMessage('js.com.warning.0004', '结束日期'));
		return false;
	}
	//==============2010/08/09 滕长龙 对应9999/12/31日期越界问题 end   =============
	// end 结束日期检查
	return true;
}

/**
 * 查找table中是否有数据（包括删除的）
 * @return true 是空的/false 不是空的
 */
function chkTblEmpty() {
	var sblings = $('table_peoList').rows;
	if (sblings.length == 0) {
		return true;
	}
	return false;
}

/**
 * 比较日期大小
 * @param String 'yyyy-MM-dd'
 * @param String 'yyyy-MM-dd'
 * @return <= true / > false
 */
function compareDate(d12, d22) {
	var d1 = new Date(d12.replace(/\-/g, '\/'));
	var d2 = new Date(d22.replace(/\-/g, '\/'));
	if (d1 > d2) {
	
		return false;
	}
	return true;
}
