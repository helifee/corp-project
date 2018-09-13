/*
 * @(#)Yc0030.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 会议室管理
 */
/**
 * @fileoverview 会议室一览详细画面JavaScript.
 *
 * @author chenyuer,bixiuqing
 * @version 1.0
 */
/**
 * 会议室相关数据.
 */
var g_metInfo;

/**
 * 最小时间.
 */
var g_minData;

/**
 * 人员类.
 * @param {String} id
 * @param {String} name
 */
function User(id, name) {
	this.id = id;
	this.name = name;
}

/**
 * 初始化页面.
 */
function init() {

	// 最小有效时间
	g_minData = $('myMinDate').value;
	
	$('reserverNm').disable();
	$('metUserNm').disable();
	// 不是初期load时
	if ($F('backFlg') != '9') {
		// 保存，修改，删除正常时，关闭本画面
		if ($F('backFlg') == '0' || $F('backFlg') == '6' || $F('backFlg') == '8') {
			// 调用父页面接口  
			parent.myInnerPageClose();
		}
		// 没做任何修改时
		if ($F('backFlg') == '10') {
			// 提示是否关闭本画面
			MsgBox.confirm(getMessage('js.met.warning.0020'), '确认', function() {
				// 调用父页面接口  
				parent.myInnerPageClose();
			}, nullFunc, '是', '否');
		}
		// 请求的会议不存在
		if ($F('backFlg') == '12') {

			// 提示会议不存在
			parent.MsgBox.message(getMessage('js.met.warning.0022'), '确认',  function() {
				// 调用父页面接口  
				parent.myInnerPageClose();
			});
		}
	}
	
	// 添加check
	addCheck();
	var radioReserveType = $NN('yc0030MetInfo.reserveType');
	// 如果选择单日预约
	if ($(radioReserveType[0]).checked) {
		// 隐藏周期预约设置
		hidden_reserveCycle();
	}
	
	// 设置是否可以检索周期会议信息
	if ('0' == $('canGetCycleInfo').value) {

		$(radioReserveType[1]).disable();
	}

	// 通知开发者选中时，显示备注
	if ($F('contactUser') == '1') {
		
		$('notes').show();
		// 通知开发者未选中时，隐藏备注
	} else {

		$('notes').hide();
	}

	// 修改时
	if ($F('viewMode') == '1') {

		// 判断是否可以修改
		// 单日时
		if ($(radioReserveType[0]).checked) {
			// 不能编辑时（是会议参加者，不是会议申请者时），单日信息不可用
			if ($F('editable') == false) {
				disable_day();
			// 可以编辑时（是会议申请者时）
			} else {
				// 过期不可修改，不过期可以修改
				if ($F('startDateOld') < new Date().pattern('yyyy-MM-dd')) {
					disable_day();
				} else if ($F('startDateOld') == new Date().pattern('yyyy-MM-dd')) {
					if ($F('endTimeOld') < new Date().pattern('HH:mm:ss')) {
						disable_day();
					} else {
						enable_day();
					}
				} else {
					enable_day();
				}
			}
		// 周期时	
		} else {
			// 不能编辑时（是会议参加者，不是会议申请者时），周期信息不可用
			if ($F('editable') == false) {
				disable_cycle();
			// 可以编辑时（是会议申请者时）
			} else {
				// 过期不可修改，不过期可以修改
				if ($F('endDateOld') < new Date().pattern('yyyy-MM-dd')) {
					disable_cycle();
				} else if ($F('endDateOld') == new Date().pattern('yyyy-MM-dd')) {
					if ($F('endTimeOld') < new Date().pattern('HH:mm:ss')) {
						disable_cycle();
					} else {
						enable_cycle();
					}
				} else {
					enable_cycle();
				}
			}
		}
	// 预约时	
	} else {
		// 隐藏域可用时会议室下拉框不可用可用
		$('metId').disable();
	}
	
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

	
	// 创建组画面
	team_box = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'team',
		// *标题内容，可用元素或字符串
		title: '新建组',
		// *图标的CSS
		icon: 'org_info',
		// *内容元素
		content: $('teamInfo'),
		// *显示位置，相当与z-index
		position: 10,
		// 是否允许拖动
		drag: true,
		loader: false
	});

	// 在加载完成时调用父页面接口  
	parent.myInnerPageLoaded();
}

/**
 * 关闭员工选择画面/
 * 由弹出的员工选择画面调用
 */
function empSelectPageLoaded() {
	emp_box.loaded();
}

/**
 * 弹出员工选择画面.
 * 参数empNum为限定选择的人数，如果不需要限定则不传.
 */
function userSelect() {
	// 参数empNum为限定选择的人数，如果不需要限定则不传
	$('empSelectPage').src = '../employee/yb9010Init.action?mode=2';
	emp_box.Popup();
}

/**
 * 取得自定义组用户
 */
function getTeamUser(){
	var usersElement = $('metUserNm');
	var count = $('metUserCnt');
	//先清空先前人员
	usersElement.value = '';
	count.value = '';
	$('metUserId').value = '';
	var userId = '';
	var userName = '';
	var url = 'yc0030GetTeamUser.action';
	var pars = 'teamId=' + $F('teamSelect');
	new Ajax.Request(url, {
			method: 'get',
			parameters: pars,
			onComplete: function(request) {
				if (checkException(request)) {
					return;
				}
				var teamUser = request.responseText.evalJSON();
				var len = teamUser.length;
				if(len == 0) return;
				for(var i=0; i<len; i++){
					userId = userId + ',' +teamUser[i].userId;
					userName = userName + ',' +teamUser[i].userName;
				}
				if(userId.indexOf($F('reserverId')) <0){
					$('metUserNm').value = $F('reserverNm') + userName;
					$('metUserId').value = $F('reserverId')+ userId;
					len = len +1;
				}else{
					$('metUserNm').value = userName.substr(1);
					$('metUserId').value = userId.substr(1);
				}
				count.value = len;
				$('add2team').addClassName('none');
			}
		});
}


/**
 * 打开添加组弹出层.
 */
function openTeam(){
	// 初期化
	$('teamNm').value = '';
	$('teamDiffNm02').checked = true;
	clearError('teamInfoForm');
	
	team_box.Popup();
}

/**
 * 创建组并刷新组的下拉列表
 */
function createTeam(){
	if (!checkForm($('teamInfoForm'))) return;
	// 点击保存组信息
	MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
		$('userId').value = $F('metUserId');
		var url = 'yc0030CreateTeam.action';
		var pars = $('teamInfoForm').serialize();
		new Ajax.Request(url, {
				method: 'post',
				parameters: pars,
				onComplete: function(request) {
					if (checkException(request)) {
						return;
					}
					if(request.responseText !=''){
						var teamInfo  = request.responseText.split(',');
						// 刷新组选择下拉框
						$('teamSelect').insert({bottom: 
						      new Element('option', {'value':teamInfo[0]}).update(teamInfo[1])});
						$('teamSelect').selectedIndex = '';
					}
					team_box.close(0);
					// 显示添加成功
					showOpTip(getMessage('js.com.info.0008'));
				}
			});
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}

/**
 * 预约信息查询.
 * @param radio 会议预约类型（单日，周期）.
 */
function getMetreserveInfo(radio) {

	if (radio.value == '0') {
		//隐藏周期预约设置
		hidden_reserveCycle();
	} else {
		//显示周期预约设置
		display_reserveCycle();
	}
	
	// 清除错误信息
	clearError('metReserveForm');
	
	// 修改的时候
	if ($F('viewMode') == '1') {
		var url = 'yc0030GetMetInfo.action';
		// 单日时
		if (radio.value == '0') {

			var pars = 'yc0030MetInfo.startDate=' + $('startDate').value
				+ '&yc0030MetInfo.metId=' + $('metId').value 
				+ '&yc0030MetInfo.startHour=' + $('startHour').value 
				+ '&yc0030MetInfo.startMinute=' + $('startMinute').value
				+ '&yc0030MetInfo.startDateOld=' + $('startDateOld').value 
				+ '&yc0030MetInfo.metIdOld=' + $('metIdOld').value 
				+ '&yc0030MetInfo.startTimeOld=' + $('startTimeOld').value
				+ '&viewMode=' + $('viewMode').value
				+ '&yc0030MetInfo.reserveType=0';
		// 周期时
		} else {

			var pars =  'yc0030MetInfo.cycleMetId=' + $('cycleMetId').value
				+ '&viewMode=' + $('viewMode').value
				+ '&yc0030MetInfo.reserveType=1';
		}

		pars = addStamp(pars);
		new Ajax.Request(url, {
			method: 'get',
			parameters: pars,
			onComplete: function(request) {
				if (checkException(request)) {
					return;
				}
				// 请求的会议不存在
				if ($F('backFlg') == '12') {
		
					// 提示会议不存在
					parent.MsgBox.message(getMessage('js.met.warning.0022'), '确认',  function() {
						// 调用父页面接口  
						parent.myInnerPageClose();
					});
				} else {
					// 在加载完成时调用父页面接口  
					g_metInfo = request.responseText.evalJSON();
					
					// 单日时
					if (radio.value == '0') {
						// 单日数据的赋值
						setMetDaily();
					// 周期时
					} else {
						// 周期数据的赋值
						setMetCycle();
						// 周期显示时，隐藏一个高度div，防止滚动条的出现
						$('cycleHide').hide();
					}
				}
			}		
		});

	// 预约的时候
	} else {
		var cycleType = $NN('yc0030MetInfo.cycleType');
		if (radio.value == '1') {
			// 如果周期类型没有选择
			if (!$(cycleType[1]).checked && !$(cycleType[2]).checked) {
			
				// 默认选择每日为周期类型
				$(cycleType[0]).checked = true;
			}
			// 周期显示时，隐藏一个高度div，防止滚动条的出现
			$('cycleHide').hide();
			// 结束日期设置
			if ($('endDate').value == null || $('endDate').value == '') {
				$('endDate').value = $('startDate').value;
			} 
		}
	}
}

/*
 * 两个日期的差值(d1 - d2)
 * @param d1 开始日期
 * @param d2 结束日期
 */
function DateDiff(d1, d2) {
	var day = 24 * 60 * 60 * 1000;
	try {
		var dateArr = d1.split("-");
		var checkDate = new Date();
		checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
		var checkTime = checkDate.getTime();
		
		var dateArr2 = d2.split("-");
		var checkDate2 = new Date();
		checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
		var checkTime2 = checkDate2.getTime();
		
		var cha = (checkTime - checkTime2) / day;
		return cha;
	} 
	catch (e) {
		return false;
	}
}
/*
 * 从json中获取数据，设置周期会议信息
 */
function setMetCycle() {

	//设置周期类型
	var radioCycleType = $NN('yc0030MetInfo.cycleType');
	$(radioCycleType[g_metInfo[0].cycleType - 1]).checked = true;
	// 如果选中为每天
	if (1 == g_metInfo[0].cycleType) {
		// 除每天之外的周期类型不可用
		$(radioCycleType[1]).disable();
		$(radioCycleType[2]).disable();
		$('day').disable();
		var delayedFlg = $NN('yc0030MetInfo.delayedFlg');
		for (var i = 0; i < delayedFlg.length; i++) {
			$(delayedFlg[i]).disable();
		}
		var workDay = $NN('yc0030MetInfo.workDay');
		for (var i = 0; i < workDay.length; i++) {
			$(workDay[i]).disable();
		}
	}
	//如果选中为每周
	if (2 == g_metInfo[0].cycleType) {
	
		//设置选中星期
		var workDayLst = $NN('yc0030MetInfo.workDay');
		for (var i = 0; i < g_metInfo[0].workDay.length; i++) {
			$(workDayLst[g_metInfo[0].workDay[i] - 1]).checked = true;
		}
		// 除每周之外的周期类型不可用
		$(radioCycleType[0]).disable();
		$(radioCycleType[2]).disable();
		$('day').disable();
		var delayedFlg = $NN('yc0030MetInfo.delayedFlg');
		for (var i = 0; i < delayedFlg.length; i++) {
			$(delayedFlg[i]).disable();
		}
		//如果选中为每月
	} else if (3 == g_metInfo[0].cycleType) {
	
		//设置每月日期
		$('day').value = g_metInfo[0].day;
		
		//设置遇休息提前退后选项
		var delayedRadio = $NN('yc0030MetInfo.delayedFlg');
		if (g_metInfo[0].delayedFlg == '1') {
			$(delayedRadio[0]).checked = true;
		} else {
			$(delayedRadio[1]).checked = true;
		}
		// 除每月之外的周期类型不可用
		$(radioCycleType[0]).disable();
		$(radioCycleType[1]).disable();
		var workDay = $NN('yc0030MetInfo.workDay');
		for (var i = 0; i < workDay.length; i++) {
			$(workDay[i]).disable();
		}
	}
	
	//日历的最小有效日期
	g_minData = g_metInfo[0].minDateS;

	//设置会议开始日期
	$('startDate').value = g_metInfo[0].startDateS;
	
	//设置会议结束日期
	$('endDate').value = g_metInfo[0].endDateS;
	
	//设置会议结束日期
	$('endDateOld').value = g_metInfo[0].endDateOldS;
	
	//设置选中会议室
	$('metId').value = g_metInfo[0].metId;
	
	//设置会议主题
	$('metTopic').value = g_metInfo[0].metTopic;
	
	//设置保密选项
	if (1 == g_metInfo[0].publicFlg) {
		$('publicFlg').checked = true;
	} else {
		$('publicFlg').checked = false;
	}
	
	//设置开始时间
	$('startHour').value = g_metInfo[0].startHour;
	$('startMinute').value = g_metInfo[0].startMinute;
	
	//设置结束时间
	$('endHour').value = g_metInfo[0].endHour;
	$('endMinute').value = g_metInfo[0].endMinute;
	
	//设置申请者
	$('reserverNm').value = g_metInfo[0].reserverNm;
	
	//设置参加者ID
	$('metUserId').value = g_metInfo[0].metUserId;
	
	//设置参加者
	$('metUserNm').value = g_metInfo[0].metUserNm;
	
	//设置人数
	$('metUserCnt').value = g_metInfo[0].metUserCnt;
	
	//设置更新flg
	$('updateFlg').value = g_metInfo[0].updateFlg;
	
	//设置备注
	$('metNotes').value = g_metInfo[0].metNotes;
	
	//设置通知开发者选项
	if (g_metInfo[0].contactUser == '0') {
		$('contactUser').checked = false;
		$('notes').hide();
	} else {
		$('contactUser').checked = true;
		$('notes').show();
	}

	if ($F('editable') == false) {
		disable_cycle();
	} else {
		// 过期不可修改，不过期可以修改
		if ($F('endDateOld') < new Date().pattern('yyyy-MM-dd')) {
			disable_cycle();
		} else if ($F('endDateOld') == new Date().pattern('yyyy-MM-dd')) {
			if ($F('endTimeOld') < new Date().pattern('HH:mm:ss')) {
				disable_cycle();
			} else {
				enable_cycle();
			}
		} else {
			enable_cycle();
		}
	}
	
}

/*
 * 从json中获取数据，设置单日会议信息
 */
function setMetDaily() {
	
	//日历的最小有效日期
	g_minData = g_metInfo[0].minDateS;

	//设置会议开始日期
	$('startDate').value = g_metInfo[0].startDateS;
	
	//设置选中会议室
	$('metId').value = g_metInfo[0].metId;
	
	//设置会议主题
	$('metTopic').value = g_metInfo[0].metTopic;
	
	//设置保密选项
	if (1 == g_metInfo[0].publicFlg) {
		$('publicFlg').checked = true;
	} else {
		$('publicFlg').checked = false;
	}
	//设置开始时间
	$('startHour').value = g_metInfo[0].startHour;
	$('startMinute').value = g_metInfo[0].startMinute;
	
	//设置结束时间
	$('endHour').value = g_metInfo[0].endHour;
	$('endMinute').value = g_metInfo[0].endMinute;
	
	//设置申请者
	$('reserverNm').value = g_metInfo[0].reserverNm;
	
	//设置参加者ID
	$('metUserId').value = g_metInfo[0].metUserId;
	
	//设置参加者
	$('metUserNm').value = g_metInfo[0].metUserNm;
	
	//设置人数
	$('metUserCnt').value = g_metInfo[0].metUserCnt;
	
	//设置备注
	$('metNotes').value = g_metInfo[0].metNotes;
	
	//设置通知开发者选项
	if (g_metInfo[0].contactUser == '0') {
		$('contactUser').checked = false;
		$('notes').hide();
	} else {
		$('contactUser').checked = true;
		$('notes').show();
	}
	
	if ($F('editable') == false) {
		disable_day();
		
	} else {
	
		if ($F('startDateOld') < new Date().pattern('yyyy-MM-dd')) {
			disable_day();
		} else if ($F('startDateOld') == new Date().pattern('yyyy-MM-dd')) {
			if ($F('endTimeOld') < new Date().pattern('HH:mm:ss')) {
				disable_day();
			} else {
				enable_day();
			}
		} else {
			enable_day();
		}
	}
}

/*
 * 隐藏周期预约设置
 */
function hidden_reserveCycle() {
	//隐藏结束日期
	var startEnd = window.$('startEnd');
	startEnd.style.display = 'none';
	
	//隐藏周期预约设置
	var cycle = $('cycle');
	cycle.style.display = 'none';
	
	//清空周期内容
	var radioCycleType = $NN('yc0030MetInfo.cycleType');
	for (var i = 0; i < radioCycleType.length; i++) {
		if ($(radioCycleType[i]).checked) {
			$(radioCycleType[i]).checked = false;
			break;
		}
	}
	
	clearWeek();
	clearMonth();
}

/*
 * 显示周期预约设置
 */
function display_reserveCycle() {
	//显示结束日期
	var startEnd = window.$('startEnd');
	startEnd.style.display = '';
	//显示周期预约设置
	var cycle = $('cycle');
	cycle.style.display = '';
}

/*
 * 单日过期时画面不可用
 */
function disable_day() {
	var reserveType = $NN('yc0030MetInfo.reserveType');
	// 如果为周期会议周期可用
	if ($('cycleMetId').value != 0) {
		if ('0' == $('canGetCycleInfo').value) {
			$(reserveType[1]).disable();
		} else {
			$(reserveType[1]).enable();
		}
	} else {
		$(reserveType[1]).disable();
	}
	// 可入力项目不可用
	$('startDate').disable();
	$('metId').disable();
	// 会议室下拉框可用时隐藏域不可用
	$('metIdH').enable();
	$('metTopic').disable();
	$('startHour').disable();
	$('startMinute').disable();
	$('endHour').disable();
	$('endMinute').disable();
	//$('reserverNm').disable();
	//$('metUserNm').disable();
	$('metUserCnt').disable();
	$('contactUser').disable();
	$('publicFlg').disable();
	$('metNotes').disable();
	// 按钮隐藏
	if ($('update') != null) {
		$('update').hide();
	}
	if ($('delete') != null) {
		$('delete').hide();
	}
	if ($('select') != null) {
		$('select').hide();
	}
	if ($('teamSelectDiv') != null) {
		$('teamSelectDiv').hide();
	}
}

/*
 * 单日未过期时画面可用
 */
function enable_day() {

	// 可入力项目可用
	$('startDate').enable();
	// 会议室下拉框可用时隐藏域不可用
	$('metIdH').disable();
	$('metId').enable();
	$('metTopic').enable();
	$('startHour').enable();
	$('startMinute').enable();
	$('endHour').enable();
	$('endMinute').enable();
	//$('reserverNm').enable();
	//$('metUserNm').enable();
	$('metUserCnt').enable();
	$('contactUser').enable();
	$('publicFlg').enable();
	$('metNotes').enable();
	// 按钮显示
	if ($('update') != null) {
		$('update').show();
	}
	if ($('delete') != null) {
		$('delete').show();
	}
	if ($('select') != null) {
		$('select').show();
	}
	if ($('teamSelectDiv') != null) {
		$('teamSelectDiv').show();
	}
}

/*
 * 周期过期时画面不可用
 */
function disable_cycle() {

	// 单日过期时画面不可用
	disable_day();
	// 可入力项目不可用
	$('endDate').disable();
	
	// 周期项目不可用
	$('day').disable();
	var delayedFlg = $NN('yc0030MetInfo.delayedFlg');
	for (var i = 0; i < delayedFlg.length; i++) {
		$(delayedFlg[i]).disable();
	}
	var workDay = $NN('yc0030MetInfo.workDay');
	for (var i = 0; i < workDay.length; i++) {
		$(workDay[i]).disable();
	}
	
}

/*
 * 周期未过期时画面可用
 */
function enable_cycle() {
	// 单日过期时画面可用
	enable_day();
	// 可入力项目可用
	$('endDate').enable();
}

/*
 * 清除周一至周五
 */
function clearWeek() {

	var workDayLst = $NN('yc0030MetInfo.workDay');
	for (var i = 0; i < workDayLst.length; i++) {
		$(workDayLst[i]).checked = false;
	}
}

/*
 * 清除每月信息
 */
function clearMonth() {

	var day = $('day');
	day.value = '';
	
	var delayedFlg = $NN('yc0030MetInfo.delayedFlg');
	for (var i = 0; i < delayedFlg.length; i++) {
		if ($(delayedFlg[i]).checked) {
			$(delayedFlg[i]).checked = false;
			break;
		}
	}
}

/*
 * 选择每月时，默认选择遇休日后延
 */
function selectMonth() {
	var cycleType = $NN('yc0030MetInfo.cycleType');
	var delayed = $NN('yc0030MetInfo.delayedFlg');
	if ($(cycleType[2]).checked) {
		if (!($(delayed[0]).checked || $(delayed[1]).checked)) {
			$(delayed[1]).checked = true;
		}
	}
	clearOther();
}

/*
 * 选择每日，每周，每月时，清除其他内容
 */
function clearOther() {

	//清除其它周期类型的信息
	var radioCycleType = $NN('yc0030MetInfo.cycleType');
	if ($(radioCycleType[0]).checked) {
		clearWeek();
		clearMonth();
		removeWeekError();

		removeFieldError($('day'));
	} else if ($(radioCycleType[1]).checked) {
		clearMonth();
		removeFieldError($('day'));
		
	} else {
		clearWeek();
		removeWeekError();
	}
	removeFieldError($('startDate'));
	removeFieldError($('endDate'));
	
}

/*
 * 自动选择每周
 */
function selectWeekly() {
	var cycleType = $NN('yc0030MetInfo.cycleType');
	if (!$(cycleType[1]).checked) {
		$(cycleType[1]).checked = true;
	}
	clearOther();
}

/*
 * 自动选择每月
 */
function selectMonthly() {
	var cycleType = $NN('yc0030MetInfo.cycleType');
	if (!$(cycleType[2]).checked) {
		$(cycleType[2]).checked = true;
	}
	clearOther();
}

/*
 * 点击每月 的日期
 */
function clickDay() {
	selectMonthly();
	
	var delayed = $NN('yc0030MetInfo.delayedFlg');
	if (!($(delayed[0]).checked || $(delayed[1]).checked)) {
		$(delayed[1]).checked = true;
	}
}

/*
 * 提交表单
 * @param cmd 确定目的Action
 */
function doSubmit(cmd) {


	// 新建预约信息
	if ('reserve' == cmd) {
		// 输入合法性检查
		if (checkForm('metReserveForm')) {
			// 人数是否超过会议室人数
			var overFlg = getOverFlg();
			if (overFlg) {
				MsgBox.confirm(getMessage('js.met.warning.0018'), '确认', function() {
					MsgBox.confirm.delay(0.1,getMessage('js.met.info.0011'), '确认', function() {
						$('metReserveForm').action = 'yc0030SaveData.action?fromId=' + $('fromId').value;
						$('metReserveForm').submit();
					}, nullFunc, '是', '否');
					
				}, nullFunc, '确定', '取消');
			} else {
			
				MsgBox.confirm(getMessage('js.met.info.0011'), '确认', function() {
					$('metReserveForm').action = 'yc0030SaveData.action?fromId=' + $('fromId').value;
					$('metReserveForm').submit();
				}, nullFunc, '是', '否');
			}
		} else {
			return;
		}
		// 更新预约信息
	} else if ('update' == cmd) {
		// 输入合法性检查
		if (checkForm('metReserveForm')) {
		
			// 判断人数是否超员
			var overFlg = getOverFlg();
			if (overFlg) {
			
				MsgBox.confirm(getMessage('js.met.warning.0018'), '确认', function() {
					doUpdate($('updateFlg').value);
					
				}, nullFunc, '确定', '取消');
			} else {
				doUpdate($('updateFlg').value);
				
			}
		} else {
			return;
		}
		// 取消预约信息	
	} else if ('delete' == cmd) {
	
		MsgBox.confirm(getMessage('js.met.info.0013'), '确认', function() {
			$('metReserveForm').action = 'yc0030Delete.action?fromId=' + $('fromId').value;
			$('metReserveForm').submit();
			
		}, nullFunc, '是', '否');
		
		// 选择参加者弹出层	
	} else if ('select' == cmd) {
		userSelect();
	}
	
}

/*
 * 执行Update操作
 */
function doUpdate(changedFlg) {
	//判断预约类型,如果为单日则发送请求;如果为周期,则确认是否周期中的有单日被修改过
	var value = getRadioChecked();
	
	if (value == 1 && changedFlg == 1) {
		MsgBox.confirm(getMessage('js.met.warning.0019'), '确认', function() {
			MsgBox.confirm.delay(0.1,getMessage('js.met.info.0012'), '确认', function() {
				$('reserverNm').enable();
				$('metUserNm').enable();
				$('metReserveForm').action = 'yc0030Modify.action?fromId=' + $('fromId').value;
				$('metReserveForm').submit();
/*
				$('metReserveForm').action = 'yc0030Modify.action?fromId=' + $('fromId').value 
					+ '&yc0030MetInfo.reserverNm=' + encodeURI($('reserverNm').value)
					+ '&yc0030MetInfo.metUserNm=' + encodeURI($('metUserNm').value);
				$('metReserveForm').submit();
*/
			}, nullFunc, '是', '否');
			
		}, nullFunc, '确定', '取消');
	} else {
	

		MsgBox.confirm(getMessage('js.met.info.0012'), '确认', function() {
/*			
			$('metReserveForm').action = 'yc0030Modify.action?fromId=' + $('fromId').value
				+ '&yc0030MetInfo.reserverNm=' + encodeURI($('reserverNm').value)
				+ '&yc0030MetInfo.metUserNm=' + encodeURI($('metUserNm').value);
			$('metReserveForm').submit();
*/
			$('reserverNm').enable();
			$('metUserNm').enable();
			$('metReserveForm').action = 'yc0030Modify.action?fromId=' + $('fromId').value;
			$('metReserveForm').submit();
		}, nullFunc, '是', '否');
	}
}

/*
 * 取得人数是否溢出Flg
 */
function getOverFlg() {

	//取得预约人数
	var metUserCnt = $('metUserCnt').value;
	//取得选取的会议室
	var metRoomId = $('metId').selectedIndex;
	//生成各会议室容纳人数的数组
	var metRoomSize = $('metRoomSize').value;
	var metRoomSizeArray = new Array();
	metRoomSizeArray = metRoomSize.split(',');
	//转换类型，比较人数是否溢出
	var index = parseInt(metRoomId, 10);
	var max = parseInt(metRoomSizeArray[index], 10);
	var choice = parseInt(metUserCnt, 10);
	
	if (choice > max) {
		return true;
	}
	return false;
}

/*
 * 输入合法性检查
 */
function addCheck() {
	
	var radioReserveType = $NN('yc0030MetInfo.reserveType');
	var radioCycleType = $NN('yc0030MetInfo.cycleType');
	var workDay = $NN('yc0030MetInfo.workDay');
	
	// 如果选择每周。周一到周五至少选择一个
	for (var i = 0; i < workDay.length; i++) {
		addCustomCheck($(workDay[i]), getMessage('js.com.warning.0001', '星期'), 'datecheck3', checkWeekDay);
	}

	// 如果选择每月，则预约哪一天必须入力
	addCustomCheck($('day'), getMessage('js.com.warning.0001', '日期'), 'datecheck4', function(value) {
		// 如果选择每月
		if ($(radioReserveType[1]).checked) {
			if ($(radioCycleType[2]).checked) {
				var day = $('day');
				if (day.value == '') {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		} else {
			return true;
		}
		
	});
	
	// 如果选择每月，则预约日必须为数值型且在1和31之间
	addCustomCheck($('day'), getMessage('js.com.warning.0002', '日期'), 'datecheck5', function(value) {
		// 如果选择周期,如果选择每月
		if ($(radioReserveType[1]).checked) {
			if ($(radioCycleType[2]).checked) {
				var day = $('day');
				//判断输入日期的合法性
				var floatValue = parseFloat(day.value);
				var intValue = parseInt(day.value, 10);
				if (floatValue != intValue) {
					return false;
				} else {
					if ((intValue < 1) || (intValue > 31)) {
						return false;
					} else {
						return true;
					}
				}
			} else {
				return true;
			}
		} else {
			return true;
		}
	});
	// 周期预约时开始和结束日期之间是否超过一年
	addCustomCheck($('endDate'), getMessage('js.met.warning.0021'), 'datecheck1', oneYearCheck);
	addCustomCheck($('startDate'), getMessage('js.met.warning.0021'), 'datecheck2', oneYearCheck);
	
	// 开始日期必须小于等于结束日期
	addCustomCheck($('endDate'), getMessage('js.com.warning.0006'), 'datecheck6', startEndDateCheck);
	addCustomCheck($('startDate'), getMessage('js.com.warning.0006'), 'datecheck7', startEndDateCheck);

	// 开始时间必须小于等于结束时间
	addCustomCheck($('endHour'), getMessage('js.met.warning.0003'), 'datecheck8', startEndTimeCheck);
	addCustomCheck($('endMinute'), getMessage('js.met.warning.0003'), 'datecheck9', startEndTimeCheck);
	addCustomCheck($('startHour'), getMessage('js.met.warning.0003'), 'datecheck10', startEndTimeCheck);
	addCustomCheck($('startMinute'), getMessage('js.met.warning.0003'), 'datecheck11', startEndTimeCheck);
	
	// 结束时间不能超过18：30
	addCustomCheck($('endMinute'), getMessage('js.met.warning.0016', '18:00'), 'datecheck12', endTimeCheck);
	addCustomCheck($('endHour'), getMessage('js.met.warning.0016', '18:00'), 'datecheck13', endTimeCheck);
	
}

/*
 * 取得所选Radio的值
 */
function getRadioChecked() {
	var value = 0;
	var radio = $NN('yc0030MetInfo.reserveType');
	
	for (i = 0; i < radio.length; i++) {
		if ($(radio[i]).checked) {
			value = $(radio[i]).value;
		}
	}
	return value;
}

/**
 * 选中通知开发者,显示备注
 */
function showMetNotes() {

	if ($('contactUser').checked) {
		$('notes').show();
	} else {
		$('metNotes').clear();
		$('notes').hide();
		
	}
}

/**
 * 取得父页面初始人员数组
 * @return 初始人员数组
 */
function prepareInitUsers() {

	var usersPrevious = [];
	// 取得参加者Id及名称的字符串
	var usersId = $('metUserId').value;
	var usersNm = $('metUserNm').value;
	// 设置参加者Id及名称的数组
	var usersIdLst = new Array();
	var usersNmLst = new Array();
	usersIdLst = usersId.split(',');
	usersNmLst = usersNm.split(',');
	
	// 设置数据,参加者不为空时
	//	if(usersIdLst.length == usersNmLst.length){
	if (usersId != '' && usersNm != '') {
		for (i = 0; i < usersIdLst.length; i++) {
			usersPrevious.push(new User(usersIdLst[i], usersNmLst[i]));
		}
		// 设置数据,参加者为空时
	} else {
		usersId = $('reserverId').value;
		usersNm = $('reserverNm').value;
		usersPrevious.push(new User(usersId, usersNm));
	}
	return usersPrevious;
}

/**
 * 显示选择的人员
 */
function display(users) {
	var usersElement = $('metUserNm');
	var count = $('metUserCnt');
	
	var usersIdLst = '';
	var usersNmLst = '';
	
	//子页面返回时清空先前人员
	usersElement.value = '';
	count.value = '';
	
	//添加新人员
	if (typeof(users) != 'undefined') {
		var len = users.length;
		if (len != 0) {
			for (var i = 0; i < len; i++) {
				usersIdLst = usersIdLst + ',' + users[i].id;
				usersNmLst = usersNmLst + ',' + users[i].name;
			}
			usersElement.value = usersNmLst.substr(1);
			$('metUserId').value = usersIdLst.substr(1);
			count.value = len;
			
			//关闭弹出的员工选择画面※
			emp_box.close(0);
			$('add2team').removeClassName('none');
		} else {
			
			$('metUserId').value = '';
			//关闭弹出的员工选择画面※
			emp_box.close(0);
		}
	}
	// 清空组选择
	$('teamSelect').selectedIndex = -1;
	
}

/**
 * 检查开始日期是否小于等于结束日期
 */
function startEndDateCheck() {
	var radioReserveType = $NN('yc0030MetInfo.reserveType');
	// 如果选择周期,周期日期判断
	if ($(radioReserveType[1]).checked) {
		var startDate = $('startDate');
		var endDate = $('endDate');
		//日期合法性判断
		var startDate_V = startDate.value;
		var endDate_V = endDate.value;
		if (startDate_V > endDate_V) {
			addFieldError($('startDate'), getMessage('js.com.warning.0006'));
			addFieldError($('endDate'), getMessage('js.com.warning.0006'));
			return false;
		}
	}
	var radioCycleType = $NN('yc0030MetInfo.cycleType');

	// 如果选择周期,周期日期判断
	if ($(radioReserveType[1]).checked) {
		if ($(radioCycleType[1]).checked) {
			if (checkWeekDay()) {
				removeWeekError();
			}
		}
		if ($(radioCycleType[2]).checked) {
			removeFieldError($('day'));
		}
	}
	removeFieldError($('startDate'));
	removeFieldError($('endDate'));
	return true;
	
}

/**
 * 检查开始日期和结束日期之间是否是一年
 */
function oneYearCheck() {
	
	var radioReserveType = $NN('yc0030MetInfo.reserveType');
	// 如果选择周期,周期日期判断
	if ($(radioReserveType[1]).checked) {
		var startDate = $('startDate');
		var endDate = $('endDate');

		//日期合法性判断
		var start = startDate.value;
		var end = endDate.value;
		if (DateDiff(end, start) > 365) {
			addFieldError($('startDate'), getMessage('js.met.warning.0021'));
			addFieldError($('endDate'), getMessage('js.met.warning.0021'));
			return false;
		}
	}

	// 如果选择周期,周期日期判断
	removeFieldError($('startDate'));
	removeFieldError($('endDate'));
	return true;
	
}

/**
 * 检查开始时间是否小于等于结束时间
 */
function startEndTimeCheck() {

	//判断时间合法性
	var startHour = $('startHour');
	var startMinute = $('startMinute');
	var endHour = $('endHour');
	var endMinute = $('endMinute');
	
	var startHour_V = startHour.value;
	var endHour_V = endHour.value
	var shead = startHour_V.substring(0, 1);
	var ehead = endHour_V.substring(0, 1);
	if (shead == '0') { //去除开头的0
		startHour_V = startHour_V.substring(1, 2);
	}
	if (ehead == '0') {
		endHour_V = endHour_V.substring(1, 2);
	}
	
	var sh = parseInt(startHour_V, 10);
	var eh = parseInt(endHour_V, 10);
	if (sh > eh) {
		addFieldError($('startHour'),getMessage('js.met.warning.0003'));
		addFieldError($('startMinute'),getMessage('js.met.warning.0003'));
		addFieldError($('endHour'),getMessage('js.met.warning.0003'));
		addFieldError($('endMinute'),getMessage('js.met.warning.0003'));
		return false;
		
	} else if (sh == eh) {
		var sm = parseInt(startMinute.value, 10);
		var em = parseInt(endMinute.value, 10);
		if (sm >= em) {
			addFieldError($('startHour'),getMessage('js.met.warning.0003'));
			addFieldError($('startMinute'),getMessage('js.met.warning.0003'));
			addFieldError($('endHour'),getMessage('js.met.warning.0003'));
			addFieldError($('endMinute'),getMessage('js.met.warning.0003'));
			return false;
			
		} else {
			removeFieldError($('startDate'));
			var radioReserveType = $NN('yc0030MetInfo.reserveType');
			// 如果选择周期,周期日期判断
			if ($(radioReserveType[1]).checked) {
				removeFieldError($('endDate'));
			}
			removeFieldError($('startHour'));
			removeFieldError($('startMinute'));
			removeFieldError($('endHour'));
			removeFieldError($('endMinute'));
			return true;
		}
	} else {
		removeFieldError($('startDate'));
		var radioReserveType = $NN('yc0030MetInfo.reserveType');
		// 如果选择周期,周期日期判断
		if ($(radioReserveType[1]).checked) {
			removeFieldError($('endDate'));
		}
		removeFieldError($('startHour'));
		removeFieldError($('startMinute'));
		removeFieldError($('endHour'));
		removeFieldError($('endMinute'));
		return true;
	}
}

/**
 * 检查结束时间是否在18：00之前
 */
function endTimeCheck() {
	// 核查结束时间
	if (18 == $('endHour').value && 30 == $('endMinute').value) {
		addFieldError($('endHour'),getMessage('js.met.warning.0016'));
		addFieldError($('endMinute'),getMessage('js.met.warning.0016'));
		return false;
	} else {
		removeFieldError($('endHour'));
		removeFieldError($('endMinute'));
		return true;
	}
}

/**
 * 清除周一到周五checkbox的错误信息
 */
function removeWeekError() {
	var workDay = $NN('yc0030MetInfo.workDay');
	for (var i = 0; i < workDay.length; i++) {
		removeFieldError($(workDay[i]));
	}

}

/**
 * 检查周一到周五是否都没选中
 */
function checkWeekDay() {
	
	var radioReserveType = $NN('yc0030MetInfo.reserveType');
	var radioCycleType = $NN('yc0030MetInfo.cycleType');
	// 如果选择周期,如果选择每周，则周一至周五必须选择一个
	if ($(radioReserveType[1]).checked) {
		if ($(radioCycleType[1]).checked) {
			var workDayLst = $NN('yc0030MetInfo.workDay');
			for (j = 0; j < workDayLst.length; j++) {
				if ($(workDayLst[j]).checked) {
					return true;
				}
			}
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
	
}

