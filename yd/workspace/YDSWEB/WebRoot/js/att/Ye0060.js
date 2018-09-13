/*
 * @(#)Ye0060.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
 */
/**
 * @fileoverview 项目加班一览画面JavaScript.
 *
 * @author sundefu
 * @version 1.0
 */
/**
 * 日期查询条件类型枚举.1:当月 2：前月 3：全年 4：指定日期.
 */
var DatetypeEnum = {
    thisMonth: '0',
    lastMonth: '1',
    wholeYear: '2',
    inputBySelf: '3'
};

/**
 * 画面模式枚举.1:追加申请 2：查看 3：审批.
 */
var modeEnum = {
    New: '1',
    Lookover: '2',
    approve: '3'
};

/**
 * 弹出层操作类型枚举.1:新建 2：查看 3：修改.
 */
var OperateEnum = {
    New: '1',
    Lookover: '2',
    Modify: '3'
};

/**
 * 统计方式枚举.1:按日期 2：按人员
 */
var StatisticModeEnum = {
    ByDate: '1',
    ByEmp: '2'
};

/**
 * 加班日期类型枚举.1:周末 2：法定节假日
 */
var OverTimeDateTypeEnum = {
	Work: 0,
    Holiday: '1',
    Rest: '2'
};

/**
 * 审批状态枚举. 0：未申请 1:待审批 3:已批准 5：被否决
 */
var appStatusEnum = {
	UN_APPLY: 0,
    PENDING: '1',
    APPROVED: '3',
	REJECTED: '5'
};
// 加班登记画面操作模式
var g_operateFlag = OperateEnum.None;
// 画面统计方式
var g_statisticMode = StatisticModeEnum.ByDate;

// 属性表格列名
var g_tableRowNameLv1First = 'showOvertimeDate';
var g_tableRowWidthLv1First = 190;
var g_tableRowNameLv2First = 'empName';
var g_tableRowWidthLv2First = 57;
var g_lv2Indent = 133;
/**
 * 保持checkBox状态的Hash
 */
var g_checkBoxStatus = new Hash();
// 参照登记的基准日期
var g_date_applyRefered;

/**
 * 页面初始化.
 */
function init(){
	
    // 追加申请时必须选择一个项目
    if ($('mode').value == modeEnum.New) {
        addRequiredCheck($('projectId'), getMessage('js.com.warning.0001', '所选项目'), true);
        // 日期条件默认值设定
        setDefaultDateRange(0);
    }
    // 设置画面表示项目
	if ($('myOvertime').value == 1) {
		$('checkMyProject').checked = true;
	}
	
    // 设置画面表格列名和宽度
    setTableRows();
	
    /**
     *编辑弹出画面
     */
    g_box = new PopupBox({
        // 唯一标志
        key: 'm',
        // 标题内容，元素或字符串
        title: '加班申请',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_ye0060_overtimeInfo'),
        // 显示位置，相当与z-index
        position: 10,
        // 是否允许拖动
        drag: true,
        // 加载动画
        loader: true
    });

    /**
     *编辑弹出画面
     */
    g_box_2 = new PopupBox({
        // 唯一标志
        key: 'n',
        // 标题内容，元素或字符串
        title: '参照登记',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_ye0060_applyByRefered'),
        // 显示位置，相当与z-index
        position: 11,
        // 是否允许拖动
        drag: true,
        // 加载动画
        loader: false
    });
	
	// 需要重新检索时，进行画面刷新
	if ($('searchFlag') && $('searchFlag').value == 1) {
		searchOvertime();
	}
		
    return;
}

/**
 * 日期条件类型选择.
 *
 * @param selectedRadio 日期条件radio控件
 */
function selectDateType(selectedRadio){
    setDefaultDateRange(1);
}

/**
 * 设置日期条件默认值.
 * @param dateType 日期条件类型
 * @return none
 */
function setDefaultDateRange(initMode){
	// 取得画面选中日期限定条件
	var dateOptions = $NN('ye0060CondA.dateOptionType');
	var datetype;
    for (var i = 0; i < dateOptions.length; i++) {
        if (dateOptions[i].checked) {
        	datetype = i;
        }
    }
	
    // 自己指定日期时
    if (datetype == DatetypeEnum.inputBySelf) {
		if (initMode == 0) {
			return;
		}
        $('startDate').value = $('prjStartTime').innerHTML;
        $('endDate').value = $('prjEndTime').innerHTML;
        $('startDate').enable();
        $('endDate').enable();
        $('startDate').focus();
    }
    else {
        $('startDate').disable();
        $('endDate').disable();
        
        var thisDay = new Date();
        var thisMonth = thisDay.getMonth();
        var thisYear = thisDay.getFullYear();
        var daysOfThisMonth;
        var inputStartDate;
        var inputEndDate;
        // 选择当月
        if (datetype == DatetypeEnum.thisMonth) {
            var nextMonthFirstDay = new Date(thisYear, thisMonth + 1, 1);
            //取当月第一天 日期
            inputStartDate = new Date(thisYear, thisMonth, 1).pattern('yyyy-MM-dd');
            //取当月最后一天日期
            inputEndDate = (new Date(nextMonthFirstDay.getTime() - 1000 * 60 * 60 * 24)).pattern('yyyy-MM-dd');
        }
        else 
            if (datetype == DatetypeEnum.lastMonth) {
                // 选择上月
                var nextMonthFirstDay = new Date(thisYear, thisMonth, 1);
                //取上月第一天 日期
                inputStartDate = new Date(thisYear, thisMonth - 1, 1).pattern('yyyy-MM-dd');
                //取上月最后一天日期
                inputEndDate = (new Date(nextMonthFirstDay.getTime() - 1000 * 60 * 60 * 24)).pattern('yyyy-MM-dd');
            }
            else 
                if (datetype == DatetypeEnum.wholeYear) {
                    // 选择全年
                    inputStartDate = '' + thisYear + '-01-01';
                    inputEndDate = '' + thisYear + '-12-31';
                }
        
        $('startDate').value = inputStartDate;
        $('endDate').value = inputEndDate;
    }
    
    return;
}

/**
 * 项目状态选择联动.
 *
 * @param 项目状态radio控件
 */
function getPrjListByStatus(obj){
    var url = 'ye0060SearchPrjByListStatus.action';
    var pars = '?projectStatus=' + obj.value;
    
    pars = addStamp(pars);
    var myAjax = new Ajax.Request(url, {
        parameters: pars,
        method: 'post',
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
				// 重置下拉列表
                var selectElement = $('projectId');
                var options;
                if (selectElement != null) {
                    options = selectElement.childElements();
                    for (var i = 0, len = options.length; i < len; i++) {
                        options[i].remove();
                    }
                }
                // 检索获得项目列表json串
				if (response.responseText.blank()) {
					MsgBox.message(getMessage('js.com.warning.0004', '员工参与项目'));
					return;
				}
                selectList = response.responseText.evalJSON(true);
				// 生成新的下拉列表
                var optionIdPre;
                for (var i = 0, len = selectList.length; i < len; i++) {
                    optionIdPre = $('projectId').id + '_';
                    if ($(optionIdPre + i) == null) {
                        $('projectId').insert({
                            bottom: new Element('option', {
                                'id': optionIdPre + i
                            })
                        });
                    }
                    $(optionIdPre + i).value = selectList[i].orgId;
                    $(optionIdPre + i).update(selectList[i].orgSnm);
                    $(optionIdPre + i).show();
                }
                
                $('projectId').firstValue = selectList[0].orgId;
                $('projectId').defaultValue = $('projectId').firstValue;
				getPrjDetailInfo($('projectId'));
            }
        }
    });
}

/**
 * 项目下拉列表联动.
 *
 * @param 项目下拉列表
 */
function getPrjDetailInfo(obj) {
    var prjId = obj.value;
    
    var url = 'ye0060SearchPrjInfo.action';
	var pars = '?ye0060CondA.prjId=' + prjId;
    
    pars = addStamp(pars);
    var myAjax = new Ajax.Request(url, {
        parameters: pars,
        method: 'post',
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
				var prjDetailInfo = response.responseText.evalJSON(true);
				$('leaderName').innerHTML = prjDetailInfo.orgMngerName;
				var prjStartDate = new Date(prjDetailInfo.orgStDate.time).pattern('yyyy-MM-dd');
				var prjEndDate = new Date(prjDetailInfo.orgEndDate.time).pattern('yyyy-MM-dd');
				if (prjEndDate == '9999-12-31') {
					prjEndDate = '';
				}
				$('prjStartTime').innerHTML = prjStartDate;
				$('prjEndTime').innerHTML = prjEndDate;
				if ($('loginUserId').value == prjDetailInfo.orgMnger) {
					$('ifPrjLeader').value = true;
				} else {
					$('submitSelected').addClassName('none');
					$('ifPrjLeader').value = false;
				}
            }
        }
    });
}

/**
 * 检索加班信息.
 *
 */
function searchOvertime(){
	// 项目是否选择校验
	if (!checkInput($('projectId'))) {
		return;
	}
	
	// 显示加载动画
	showLoader();
	// 记录当前统计方式
	if($N('ye0060CondA.statisticMode').checked) {
		g_statisticMode = StatisticModeEnum.ByDate;
	} else {
		g_statisticMode = StatisticModeEnum.ByEmp;
	}
	
    // 设置画面表格列名和宽度
    setTableRows();
	
	// 调用检索Action
    var url = 'ye0060SearchOvertimeList.action';
	// 检索参数
	if ($('checkMyProject').checked) {
		$('myOvertime').value = 1;
	} else {
		$('myOvertime').value = 0;
	}
    var pars = $('ye0060InitForm').serialize();
    
	// 如果日期控件不可用，手动传递参数
    if (!$NN('ye0060CondA.dateOptionType')[3].checked) {
        pars = pars + '&ye0060CondA.searchStartTime=' +
        $('startDate').value +
        '&ye0060CondA.searchEndTime=' +
        $('endDate').value;
    }

	// 取得加班一览信息并刷新画面
    pars = addStamp(pars);
    var myAjax = new Ajax.Request(url, {
        parameters: pars,
        method: 'post',
        onComplete: function(response){
			    var flg = checkException(response);
                if (!flg) {
                    if ('input' == response.responseText) {
                        // 隐藏加载动画
                        hideLoader();
                        MsgBox.message("检索数据量太大，请重新设置检索条件！");
                    }
                    else {
                        initOvertimeTreetable(response);
                    }
                }
                else {
                    // 隐藏加载动画
                    hideLoader();
                }
		}
    })
	
	// 初始化checkBox状态
	g_checkBoxStatus = new Hash();
    
    // 项目组长可以提交申请
    if ($('mode').value == modeEnum.New) {
        if ($('ifPrjLeader').value == 'true') {
            $('submitSelected').removeClassName('none');
        }
    }

}

/**
 * 初期化画面树形表格.
 *
 */
function initOvertimeTreetable(request){
	// 表格部分初期化
	$('overTimeTreetable').innerHTML = '';

    // 一级各列宽度
    var a = "lv1WidthStr = {'" +
    g_tableRowNameLv1First +
    "':" +
    g_tableRowWidthLv1First +
    ",'appEndRow': 114,'appOvertiomeSum': 57,'actualEndRow': 114," +
    "'actualOvertiomeSum': 57,'blank4': 152,'blank5': 57,'blank6': 57," +
    "'checkBoxItem': 38,'linkObject': 114}";
    eval(a);
    // 一级各列附加CSS
    var b = "lv1ClassStr = {'" +
    g_tableRowNameLv1First +
    "':'text_indent_8 text_left'," +
    "'appEndRow': 'text_center','appOvertiomeSum': 'text_right'," +
    "'actualEndRow': 'text_center','actualOvertiomeSum': 'text_right'," +
    "'checkBoxItem': 'text_center','linkObject': 'text_center'}";
    eval(b);
    // 二级各列宽度
    var c = "lv2Widthstr = {'anotherKey' : 1,'" +
    g_tableRowNameLv2First +
    "':" +
    g_tableRowWidthLv2First +
    ",'appStartMinute': 57,'appEndMinute': 57,'appOvertime': 57," +
    "'actualStartMinute': 57,'actualEndMinute': 57,'actualOvertime': 57," +
    "'overtimeComment': 152,'benefitName': 57,'stateName': 57," +
    "'checkBoxDetail': 38,'linkObject': 114 }";
    eval(c);
    // 二级各列附加CSS
    var d = "lv2ClassStr = {'anotherKey' : 'none','" +
    g_tableRowNameLv2First +
    "': 'text_left','appStartMinute': 'text_center', 'appEndMinute': 'text_center'," +
    "'appOvertime': 'text_right', 'actualStartMinute': 'text_center'," +
    "'actualEndMinute': 'text_center','actualOvertime': 'text_right'," +
    "'overtimeComment': 'text_left','benefitName': 'text_center'," +
    "'stateName': 'text_center','checkBoxDetail': 'text_center'," +
    "'linkObject': 'text_center'}"
    eval(d);
    
    var param = {
        // 目标容器
        dest: 'overTimeTreetable',
        
        // 第二级数据在bean中的名字
        lv2Name: 'ye0060OvertimeList',
        
        // 整体大小
        size: {
            width: 950,
            height: 400
        },
        
        totalLevel: 2,
        
        // 二级数据缩进
        lv2Indent: 133
    };
	
	// 设置树形表格属性值
    param.lv1Width = lv1WidthStr;
    param.lv1Class = lv1ClassStr;
    param.lv2Width = lv2Widthstr;
    param.lv2Class = lv2ClassStr;
    param.lv2Indent = g_lv2Indent;
    param.big = true;
	param.rate = 0.3;
	
    var t = new TreeTableX(param, request.responseText);
    
    // 计算时间总计
    sumTotalOvertime();
    // 隐藏加载动画
    hideLoader();
}

/**
 * 设置表格列名和宽度.
 *
 */
function setTableRows(){
    if (g_statisticMode == StatisticModeEnum.ByDate) {
        $('tableTitleDate1').removeClassName('none');
        $('tableTitleDate2').addClassName('none');
        
        g_tableRowNameLv1First = 'showOvertimeDate';
        g_tableRowWidthLv1First = 190;
        g_tableRowNameLv2First = 'empName';
        g_tableRowWidthLv2First = 57;
        g_lv2Indent = 133;
    }
    else {
        $('tableTitleDate2').removeClassName('none');
        $('tableTitleDate1').addClassName('none');
        
        g_tableRowNameLv1First = 'empName';
        g_tableRowWidthLv1First = 190;
        g_tableRowNameLv2First = 'showOvertimeDate';
        g_tableRowWidthLv2First = 133;
        g_lv2Indent = 57;
    }
}

/**
 * 计算时间总计.
 *
 */
function sumTotalOvertime(){
    var appOvertimeArray = $('overTimeTreetable').select('div[property="appOvertiomeSum"]');
    var appOverTimes;
    var appOvertimeHours = 0;
    var appOvertimeMinutes = 0;
    var actualOvertimeArray = $('overTimeTreetable').select('div[property="actualOvertiomeSum"]');
    var actualOverTimes;
    var actualOvertimeHours = 0;
    var actualOvertimeMinutes = 0;
	$('appOvertimeSum').innerHTML = '';
	$('actualOvertimeSum').innerHTML = '';
    if (appOvertimeArray) {
        for (i = 0; i < appOvertimeArray.length; i++) {
            appOverTimes = appOvertimeArray[i].innerHTML.split(':');
            appOvertimeHours = appOvertimeHours + parseInt(appOverTimes[0], 10);
            appOvertimeMinutes = appOvertimeMinutes + parseInt(appOverTimes[1], 10);
        }
		var minuteToHours =  appOvertimeMinutes / 60 + '';
        appOvertimeHours = appOvertimeHours + parseInt(minuteToHours.split('.')[0], 10);
        appOvertimeMinutes = appOvertimeMinutes % 60 + '';
        if (appOvertimeMinutes.length == 1) {
            appOvertimeMinutes = '0' + appOvertimeMinutes;
        }
        
        $('appOvertimeSum').innerHTML = (appOvertimeHours + ':' + appOvertimeMinutes);
    } else {
		$('appOvertimeSum').innerHTML = '0:00';
	}
    
    if (actualOvertimeArray) {
        for (i = 0; i < actualOvertimeArray.length; i++) {
            actualOverTimes = actualOvertimeArray[i].innerHTML.split(':');
            actualOvertimeHours = actualOvertimeHours + parseInt(actualOverTimes[0], 10);
            actualOvertimeMinutes = actualOvertimeMinutes + parseInt(actualOverTimes[1], 10);
        }
		var minuteToHours =  actualOvertimeMinutes / 60 + '';
        actualOvertimeHours = actualOvertimeHours - 0 + parseInt(minuteToHours.split('.')[0], 10);
        actualOvertimeMinutes = actualOvertimeMinutes % 60 + '';
        if (actualOvertimeMinutes.length == 1) {
            actualOvertimeMinutes = '0' + actualOvertimeMinutes;
        }
        
        $('actualOvertimeSum').innerHTML = (actualOvertimeHours + ':' + actualOvertimeMinutes);
    } else {
		$('actualOvertimeSum').innerHTML = ('0:00');
	}
}

/**
 * 加班登记信息弹出.
 *
 */
function popOvertimeApply(){
	// 项目Id校验
	if (!checkInput($('projectId'))) {
		return;
	}
	
	var projectObj = $('projectId');
    var url = 'ye0060OvertimeInfoOperate.action';
    pars = 'operateType=' + OperateEnum.New 
	+ '&attOvertime.prjId=' + projectObj.value 
	+ '&ye0060CondA.ifPrjLeader=' + $('ifPrjLeader').value;
    pars = addStamp(pars);
    new Ajax.Updater('div_ye0060_overtimeInfo', url, {
        method: 'get',
        evalScripts: true,
        parameters: pars,
        onComplete: function(request){
            g_box.loaded();
			setItemControl(OperateEnum.New);
        }
    });
    g_box.Popup();
}

/**
 * 弹出层日期选择联动.
 *
 * @param 日期控件对象
 */
function setOvertimeLimits(obj) {
	// 日期为空不做操作
	if (obj.value.blank()) {
		return;
	}
	// 取得项目控件对象
	var projectObj = $('projectId');
    var url = 'ye0060OnOvertimeDateChanged.action';
    pars = 'attOvertime.applyOvertimeDate=' + $('applyOvertimeDate_new').value
	+ '&attOvertime.prjId=' + projectObj.value 
	+ '&ye0060CondA.ifPrjLeader=' + $('ifPrjLeader').value;
    pars = addStamp(pars);
    new Ajax.Updater('div_ye0060_empListSelect', url, {
        method: 'get',
        evalScripts: true,
        parameters: pars,
        onComplete: function(request){
			setItemControl(OperateEnum.New);
        }
    });
}

/**
 * 查看加班信息弹出.
 *
 * @param applyOvertimeDate 申请加班日期
 * @param applyEmpId 申请加班员工
 */
function showOvertime(applyOvertimeDate, applyEmpId){
	searchEmpOvertime(applyOvertimeDate, applyEmpId, OperateEnum.Lookover);
    g_box.Popup();
}

/**
 * 修改信息弹出.
 *
 * @param applyOvertimeDate 申请加班日期
 * @param applyEmpId 申请加班员工
 */
function modifyOvertime(applyOvertimeDate, applyEmpId){
	searchEmpOvertime(applyOvertimeDate, applyEmpId, OperateEnum.Modify);
	g_box.Popup();
}

/**
 * 检索指定员工加班信息.
 *
 * @param applyOvertimeDate 申请加班日期
 * @param applyEmpId 申请加班员工
 * @param operateType 操作种别（2：查看；3：修改）
 */
function searchEmpOvertime(applyOvertimeDate, applyEmpId, operateType){
	var projectObj = $('projectId');
    var url = 'ye0060OvertimeInfoOperate.action';
    pars = 'operateType=' + operateType
	+ '&attOvertime.prjId=' + projectObj.value 
	+ '&ye0060CondA.ifPrjLeader=' + $('ifPrjLeader').value
	+ '&attOvertime.applyOvertimeDate=' + applyOvertimeDate
	+ '&attOvertime.empId=' + applyEmpId;
    pars = addStamp(pars);
    new Ajax.Updater('div_ye0060_overtimeInfo', url, {
        method: 'get',
        evalScripts: true,
        parameters: pars,
        onComplete: function(request){
            g_box.loaded();
			setItemControl(operateType);
        }
    });
    
}

/**
 * 设置画面控件控制.
 * 
 * @param operateType 弹出画面操作模式（1：追加申请；2：查看；3：修改）
 */
function setItemControl(operateType){
	// 是否需要进行校验
    var checkFlag = false;
    if (operateType == OperateEnum.New) {
		checkFlag = true;
		// 弹出画面操作为追加申请模式
		g_operateFlag = OperateEnum.New;
		// 弹出画面操作按钮控制
		$('editButton').removeClassName('none');
		// 根据身份不同提供不同的登记方式
		if ($('ifPrjLeader').value == 'true') {
			// 项目组长可以为所有组员进行加班登记
			$('overtimeEmp_new').addClassName('none');
			$('overtimeEmpList_new').removeClassName('none');
		}
		else {
			// 项目成员可以为自己加班登记
			$('overtimeEmpList_new').addClassName('none');
			$('overtimeEmp_new').removeClassName('none');
		}
		// 为加班时间提供缺省值
        if ($('dateTypeFlag').value == OverTimeDateTypeEnum.Work) {
            $('applyStartTime_new').value = '18:00';
            $('applyEndTime_new').value = '21:00';
        } else {
            $('applyStartTime_new').value = '09:00';
            $('applyEndTime_new').value = '17:00';
		}
        // 添加日期非空校验
        addRequiredCheck('applyOvertimeDate_new', getMessage('js.com.warning.0001', '申请日期'), true);
	}
	else {
		// 只表示单个员工
		$('overtimeEmpList_new').addClassName('none');
		$('overtimeEmp_new').removeClassName('none');
		// 加班申请日期不可更改
		$('applyOvertimeDate_new').disable();
		// 记录画面操作模式
		g_operateFlag = operateType;
		// 根据时间设置翌日checkBox表示方式
		if ($('tomorrowValue').value == 2) {
			$('checkBoxtomorrowValue').checked = true;
		} else {
			$('checkBoxtomorrowValue').checked = false;
		}
		// 查看模式设置画面控件为不可编辑
		if (operateType == OperateEnum.Lookover) {
			$('editButton').addClassName('none');
			$('applyStartTime_new').disable();
			$('applyEndTime_new').disable();
			$('tomorrowValue').disable();
			$('overtimeComment_new').disable();
			$('benefitFlag_new').disable();
		}
		// 修改模式设置画面控件为可编辑
		else 
			if (operateType == OperateEnum.Modify) {
				checkFlag = true;
				$('editButton').removeClassName('none');
				$('applyStartTime_new').enable();
				$('applyEndTime_new').enable();
				$('tomorrowValue').enable();
				$('overtimeComment_new').enable();
			}
	}
	
    // 节假日只能选择加班费
    if ($('dateTypeFlag').value == OverTimeDateTypeEnum.Holiday) {
        $NN('attOvertime.benefitFlag')[0].disable();
        $NN('attOvertime.benefitFlag')[1].enable();
    }
	// 周末只能选择换休
    else 
        if ($('dateTypeFlag').value == OverTimeDateTypeEnum.Rest) {
            $NN('attOvertime.benefitFlag')[0].enable();
            $NN('attOvertime.benefitFlag')[1].disable();
        }
	
	// 添加校验
    if (checkFlag == true) {
        addCustomCheck($('applyStartTime_new'), getMessage('js.att.error.0004'), 'applyStartTime_new', function compareOverTime1(){
            return compareOvertime($('applyStartTime_new'), $('applyEndTime_new'))
        }, true);
        addCustomCheck($('applyEndTime_new'), getMessage('js.att.error.0004'), 'applyEndTime_new', function compareOverTime2(){
            return compareOvertime($('applyStartTime_new'), $('applyEndTime_new'))
        }, true);
        addRequiredCheck('applyStartTime_new', getMessage('js.com.warning.0001', '加班申请开始时间'), true);
        addRequiredCheck('applyEndTime_new', getMessage('js.com.warning.0001', '加班申请结束时间'), true);
        addRequiredCheck('overtimeComment_new', getMessage('js.com.warning.0001', '加班内容'), true);
    }
}

/**
 * 保存加班信息.
 *
 */
function saveApplyOvertimeInfo(){
	if (!checkForm($('applyOvertime_newForm'))){
		return;
	}
    MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
        // 显示加载动画
        showLoader();
        var url = 'ye0060SaveApplyOvertimeInfo.action';
		// 集体申请加班，自动选中已选择员工
        if ($('ifPrjLeader').value && g_operateFlag == OperateEnum.New) {
			selectAllOptions($('applyEmpListObj'));
        }
		// 翌日没有被选中则默认为当天
        if (!$('checkBoxtomorrowValue').checked) {
            $('tomorrowValue').value = 1;
        } else {
			$('tomorrowValue').value = 2;
		}
		// 表单串行化
        pars = $('applyOvertime_newForm').serialize() + '&operateType=' + g_operateFlag + '&ye0060CondA.ifPrjLeader=' + $('ifPrjLeader').value;
		
		// 修改模式将申请日期也作为手动设定参数
        if (g_operateFlag == OperateEnum.Modify) {
            pars = pars + '&attOvertime.applyOvertimeDate=' +
            $('applyOvertimeDate_new').value
        }
		
        pars = addStamp(pars);
        var myAjax = new Ajax.Request(url, {
            parameters: pars,
            method: 'post',
            onComplete: function(response){
                // 隐藏加载动画
                hideLoader();
                var flg = checkException(response);
                if (!flg) {
                    if ('success' == response.responseText) {
                        g_box.close(0);
                        var url = 'ye0060Init.action';
                        $('searchFlag').value = 1;
                        var tsobj = $NN('ye0060CondA.stateFlag');
                        if (tsobj) {
                            for (var i = 0; i < tsobj.length; i++) {
                                if (appStatusEnum.UN_APPLY == tsobj[i].value) {
                                    tsobj[i].checked = true;
                                }
                            }
                        }
                        $('ye0060InitForm').action = url;
                        $('ye0060InitForm').submit();
                    } else {
						MsgBox.message(response.responseText);
					}
                }
            }
        })
        
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}

/**
 * 删除加班信息.
 *
 * @param applyOvertimeDate 申请加班日期
 * @param applyEmpId 申请加班员工
 */
function deleteOvertime(applyOvertimeDate, applyEmpId){
    MsgBox.confirm(getMessage('js.com.info.0001'), '确认对话框', function(){
        // 显示加载动画
        showLoader();
		
		var url = 'ye0060DeleteOvertimeInfo.action';
        pars = 'attOvertime.empId=' + applyEmpId + '&attOvertime.applyOvertimeDate=' + applyOvertimeDate;
		pars = pars + '&ye0060CondA.ifPrjLeader=' + $('ifPrjLeader').value;
        pars = addStamp(pars);
        var myAjax = new Ajax.Request(url, {
            parameters: pars,
            method: 'post',
            onComplete: function(response){
                // 隐藏加载动画
                hideLoader();
                var flg = checkException(response);
                if (!flg) {
                    if ('success' == response.responseText) {
                        var url = 'ye0060Init.action';
						$('searchFlag').value = 1;
                        $('ye0060InitForm').action = url;
                        $('ye0060InitForm').submit();
                    } else {
						MsgBox.message(response.responseText);
					}
                }
            }
        })
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}

/**
 * 删除指定日期加班信息.
 *
 * @param applyOvertimeDate 指定日期
 */
function deleteAllByDate(applyOvertimeDate){
	
    MsgBox.confirm(getMessage('js.com.info.0001'), '确认对话框', function(){
        // 显示加载动画
        showLoader();
		
		var projectObj = $('projectId');
		var url = 'ye0060DeleteAllByDate.action';
        pars = 'attOvertime.applyOvertimeDate=' + applyOvertimeDate;
		pars = pars + '&ye0060CondA.ifPrjLeader=' + $('ifPrjLeader').value;
		pars = pars + '&attOvertime.prjId=' + projectObj.value;
        pars = addStamp(pars);
        var myAjax = new Ajax.Request(url, {
            parameters: pars,
            method: 'post',
            onComplete: function(response){
                // 隐藏加载动画
                hideLoader();
                var flg = checkException(response);
                if (!flg) {
                    if ('success' == response.responseText) {
                        var url = 'ye0060Init.action';
						$('searchFlag').value = 1;
                        $('ye0060InitForm').action = url;
                        $('ye0060InitForm').submit();
                    } else {
						MsgBox.message(getMessage('js.com.warning.0011'));
					}
                }
            }
        })
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}

/**
 * 参照登记加班信息(弹出).
 *
 * @param dateApplyRefered 被参照日期
 */
function newByReference(dateApplyRefered){
	g_date_applyRefered = dateApplyRefered;
	addRequiredCheck($('referApplyingDate'), getMessage('js.com.warning.0001', '申请日期'), true);
	g_box_2.Popup();
	//g_box_2.loaded();
}
	


/**
 * 参照登记加班信息(保存).
 */
function newOvertimeByRefer(){
	// 参照登记时登记日期不能为空
	if (!checkInput($('referApplyingDate'))) {
		return;
	}
    MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
        // 显示加载动画
        showLoader();
		
        var projectObj = $('projectId');
        var url = 'ye0060NewOvertimeByRefer.action';
        
        pars = 'attOvertime.applyOvertimeDate=' + $('referApplyingDate').value;
        pars = pars + '&ye0060CondA.ifPrjLeader=' + $('ifPrjLeader').value;
        pars = pars + '&dateApplyRefered=' + g_date_applyRefered;
        pars = pars + '&attOvertime.prjId=' + projectObj.value;
        pars = addStamp(pars);
        var myAjax = new Ajax.Request(url, {
            parameters: pars,
            method: 'post',
            onComplete: function(response){
                // 隐藏加载动画
                hideLoader();
				
                var flg = checkException(response);
                
                if (!flg) {
                    if ('success' == response.responseText) {
                        var url = 'ye0060Init.action';
                        $('searchFlag').value = 1;
                        var tsobj = $NN('ye0060CondA.stateFlag');
                        if (tsobj) {
                            for (var i = 0; i < tsobj.length; i++) {
                                if (appStatusEnum.UN_APPLY == tsobj[i].value) {
                                    tsobj[i].checked = true;
                                }
                            }
                        }
                        $('ye0060InitForm').action = url;
                        $('ye0060InitForm').submit();
                    }
                    else {
                        MsgBox.message(response.responseText);
                    }
                }
            }
        })
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}


/**
 * 提交加班信息.
 *
 * @param changeType 提交种别
 */
function changeOvertimeInfoStatus(changeType){
	// 选择件数
    var selectedNum = g_checkBoxStatus.keys().length;
	var projectObj = $('projectId');
	
    // 加班信息选中情况
    if (selectedNum != 0) {
		var warningMessage = getMessage('js.att.warning.0002');
		var nextStatus;
		if (changeType == 1) {
			warningMessage = getMessage('js.att.warning.0002');
			nextStatus = appStatusEnum.PENDING;
		} else if (changeType == 2) {
			warningMessage = getMessage('js.att.warning.0003');
			nextStatus = appStatusEnum.APPROVED;
		} else if (changeType == 3) {
			warningMessage = getMessage('js.att.warning.0004');
			nextStatus = appStatusEnum.REJECTED;
		}
        MsgBox.confirm(warningMessage, '确认对话框', function(){
            // 显示加载动画
            showLoader();
            
            // 将提交结果转化成JSON串
            var checkBoxStatusJson = g_checkBoxStatus.toJSON();
            // 设置Action
            var url = 'ye0060ApplyChangeOvertimeStatus.action';
            // 设置参数
            var pars = 'checkBoxStatusJson =' + checkBoxStatusJson;
            pars = pars + '&changeStatusType=' + changeType;
            pars = pars + '&ye0060CondA.ifPrjLeader=' + $('ifPrjLeader').value;
            pars = pars + '&ye0060CondA.prjId=' + projectObj.value;
            
            pars = addStamp(pars);
            // Ajax提交请求
            var myAjax = new Ajax.Request(url, {
                method: 'post',
                parameters: pars,
                onComplete: function(request){
                    // 隐藏加载动画
                    hideLoader();
                    var flg = checkException(request);
                    if (!flg) {
                        if (request.responseText == 'success') {
                            var url = 'ye0060Init.action';
							$('searchFlag').value = 1;
							var tsobj = $NN('ye0060CondA.stateFlag');
							if (tsobj) {
								for (var i = 0; i < tsobj.length; i++) {
									if (nextStatus == tsobj[i].value) {
										tsobj[i].checked = true;
									}
								}
							}
                            $('ye0060InitForm').action = url;
                            $('ye0060InitForm').submit();
                        }
                    }
                }
            });
        }, function(){
            // 取消时回调
            return;
        }, '是', '否');
    }
    else {
        MsgBox.message(getMessage('js.com.info.0014'));
    }
}

/**
 * checkbox单击事件.
 * 
 * @param obj checkBox对象
 */
function selectOneItem(obj){

	// 确定该记录的键值
	var anotherKey = obj.up().up().childElements()[0].innerHTML;
	
    // 保持checkBox选中状态
    if (obj.checked) {
        g_checkBoxStatus.set(anotherKey, true);
    }
    else {
        g_checkBoxStatus.unset(anotherKey);
    }
}

/**
 * checkbox分组全选中事件.
 * 
 * @param obj checkBox对象
 */
function selectAllByGroup(obj) {
	// 取得组别下checkBox对象
	var checkBoxName = 'overtimeCheck' + obj.name.gsub('groupCheck', '');
	var checkBoxArray = $NN(checkBoxName);
    
    if (checkBoxArray) {
        for (var i = 0; i < checkBoxArray.length; i++) {
            checkBoxArray[i].checked = obj.checked;
            // 保持checkBox选中状态
            selectOneItem(checkBoxArray[i]);
        }
    }
}

/**
 * checkbox全选中事件.
 * 
 * @param obj checkBox对象
 */
function selectAllItems(obj){
    // 取得树形两层checkBox对象
    var checkBoxLvaArray = $('overTimeTreetable').select('div[property="checkBoxItem"]');
    var checkBoxLvbArray = $('overTimeTreetable').select('div[property="checkBoxDetail"]');
    // 更改选中状态
    if (checkBoxLvaArray) {
        for (var i = 0; i < checkBoxLvaArray.length; i++) {
            if (checkBoxLvaArray[i].down(0)) {
                checkBoxLvaArray[i].down(0).checked = obj.checked;
            }
        }
    }
    if (checkBoxLvbArray) {
    
    }
    for (var i = 0; i < checkBoxLvbArray.length; i++) {
        if (checkBoxLvbArray[i].down(0)) {
            checkBoxLvbArray[i].down(0).checked = obj.checked;
            // 保持checkBox选中状态
            selectOneItem(checkBoxLvbArray[i].down(0));
        }
    }
}

/**
 * 比较加班开始与结束时间.
 * 
 * @param objStart 开始时刻对象
 * @param objEnd 结束时刻对象
 * @return Boolean 比较结果（开始时间小于结束时间时返回true）
 */
function compareOvertime(objStart, objEnd) {
	if ($('checkBoxtomorrowValue').checked) {
		return true;
	}
	var overtimeStart = objStart.value.replace(':','');
	var overtimeEnd = objEnd.value.replace(':','');
	if (overtimeEnd > overtimeStart) {
		return true;
	}
	return false;
}

/**
 * 关闭弹出画面.
 */
function closeOvertimeApply(){
    g_box.close(0);
}
function closeApplyByRefer(){
    g_box_2.close(0);
}