/*
 * @(#)Ye0040.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
 */
/**
 * @fileoverview 请假审批画面JavaScript.
 *
 * @author 
 * @version 1.0
 */

/**
 * 页面初始化.
 */
function init() {
	var nowDate = new Date();
    var nowYear = nowDate.getFullYear();       //获取当前年份(2位)
    var nowMonth = nowDate.getMonth();         //获取当前月份
	var newDate = new Date(nowYear,nowMonth+1,1);                //取下个月中的第一天	
	var monthFirst =  new Date(nowYear,nowMonth,1).pattern('yyyy-MM-dd'); //取当月第一天 日期
	var monthLast = (new Date(newDate.getTime()-1000*60*60*24)).pattern('yyyy-MM-dd');//取当月最后一天日期
	$("sDate").disable();
	$("eDate").disable();
	$("sDate").value = monthFirst;
	$("eDate").value = monthLast ;
	/**
	 *编辑弹出画面
	*/
	g_box = new PopupBox({
	    // 唯一标志
	    key: 1,
	    // 标题内容，元素或字符串
	    title: '意见-编辑',
	    // 图标的CSS
	    icon: 'img_opt opt_EditTable',
	    // 内容元素
	    content: $('div_ye0040_info'),
	    // 显示位置，相当与z-index
	    position: 30,
	    // 是否允许拖动
	    drag: true
	    //加载动画
	    //loader: true
	});
	
	// 临时项目
	var indexNm;
	// 请假信息详情/请假申请弹出层
	myPopbox03 = new PopupBox({
		// *唯一标志，相同页面中不可重复
		key: 'my03',
		
		// *标题内容，可用元素或字符串
		title: '查看请假详情/请假申请',
		
		// *图标的CSS
		icon: 'img_opt opt_Help',
		
		// *内容元素
		content: $('attInfoDetail'),
		
		// *显示位置，相当与z-index
		position: 3,
		
		// 是否允许拖动
		drag: true,
		
		// 是否需要加载动画
		loader: true,
		
		//关闭后的回调，用于刷新页面等  
        afterclose: function() {  
             searchAttList.delay(0.5);  
        }  
	});
}

// 接口：加载完成
function myInnerPageLoaded() {
	myPopbox03.loaded();
}
	
function myInnerPageClose() {  
	myPopbox03.close();  
}  

	
/**
 * 查询请假一览
 */
function searchAttList() {
	$("sDate").enable();
	$("eDate").enable();
		
	var url = 'ye0040SearchAttList.action';
	var pars = $('ye0040InitForm').serialize();
	$("sDate").disable();
    $("eDate").disable();
	pars = addStamp(pars);
	new Ajax.Updater('araList', url, {
		method: 'get',
		parameters: pars,
		onComplete: function(request) {
			if (checkException(request)) {
				return;
			}
			if ($('appDate').checked) {
				$("sDate").enable();
				$("eDate").enable();
			}
			listColor('araListTb', 400);
		}
	});
}

/**
 * 请假审批
 * @param {Object} isAgree
 * @param {Object} index
 */
function agreeConfirm(isAgree, index, name) {
	indexNm = index;
	if (isAgree) {
		MsgBox.confirm(getMessage('js.att.info.0001', name), '确认对话框', 
		function(){
			updateAndSearchAttList(index);
		}, function(){
			// do nothing
		}, 'Yes', 'No');
	} else {
		MsgBox.confirm(getMessage('js.att.info.0002', name), '确认对话框', function(){
			g_box.popup.delay(0.1);
		}, function(){
			// do nothing
		}, 'Yes', 'No');
	}
	
}

/**
 * 查询请假一览
 */
function updateAndSearchAttList(index) {
	$("sDate").enable();
	$("eDate").enable();
		
	var url = 'ye0040update.action';
	var pars = $('ye0040InitForm').serialize();
	$("sDate").disable();
    $("eDate").disable();
	pars = addStamp(pars);
	new Ajax.Updater('araList', url, {
		method: 'get',
		parameters: pars + '&appId=' + $F('appId' + index) + "&agree=true",
		onComplete: function(request) {
			if (checkException(request)) {
				return;
			}
			if ($('appDate').checked) {
				$("sDate").enable();
				$("eDate").enable();
			}
			listColor('araListTb', 400);
		}
	});
}

/**
 * 填写不同意意见并确定
 */
function rejectOk() {
	location.href = 'ye0040update.action?appId=' + $F('appId' + indexNm) + "&agree=false&exaSuggestion=" + $F('exaSuggestion');
	g_box.close();
	searchAttList();
}

/**
 * checkbox全选
 * @param {Object} obj
 */
function checkAll(obj) {
	var checkList = obj.up(0).next(0).select('input[type="checkbox"]');
	for (i = 0; i < checkList.size(); i++) {
		checkList[i].checked = obj.checked;
	}
}

/**
 * 查询日期
 * @param {Object} obj
 */
function qDate(obj) {
	var oValue = obj.value;
	var nowDate = new Date();
    var nowYear = nowDate.getFullYear();       //获取当前年份(2位)
    var nowMonth = nowDate.getMonth();         //获取当前月份
 	
	// 当前月
	if (oValue == 'nm') {
		var newDate = new Date(nowYear,nowMonth+1,1);                //取下个月中的第一天	
		var monthFirst =  new Date(nowYear,nowMonth,1).pattern('yyyy-MM-dd'); //取当月第一天 日期
   		var monthLast = (new Date(newDate.getTime()-1000*60*60*24)).pattern('yyyy-MM-dd');//取当月最后一天日期
   		$("sDate").disable();
		$("eDate").disable();
		$("sDate").value = monthFirst;
		$("eDate").value = monthLast ;
	// 前月
	} else if (oValue == 'bm') {
		var newDate = new Date(nowYear,nowMonth,1);   //取当月中的第一天	
		var monthFirst =  new Date(nowYear,nowMonth-1,1).pattern('yyyy-MM-dd');   //取上个月中的第一天	
   		var monthLast = new Date(newDate.getTime()-1000*60*60*24).pattern('yyyy-MM-dd');//取前月最后一天日期
		$("sDate").disable();
		$("eDate").disable();
		$("sDate").value = monthFirst;
		$("eDate").value = monthLast ;
	// 全年
	} else if (oValue == 'wy') {
		var monthFirst =  new Date(nowYear,0,1).pattern('yyyy-MM-dd');   //取当年中的第一天	
   		var monthLast = new Date(nowYear,11,31).pattern('yyyy-MM-dd');   //取当年最后一天日期
		$("sDate").disable();
		$("eDate").disable();
		$("sDate").value = monthFirst;
		$("eDate").value = monthLast ;
	// 指定日期	
	} else if (oValue == 'md') {
		$("sDate").enable();
		$("eDate").enable();
	}
	
}

/**
 * 查看请假详细/请假申请
 * @param {Object} appId
 */
function attInfoDetail(appId) {
	// 弹出前设置src属性来加载页面
	if (appId) {
		$('attInfoDetail').src = 'ye0020InitView.action?paraAppId=' + appId;
	} else {
		$('attInfoDetail').src = 'ye0020Init.action';
	}
	
	// 弹出在默认位置
	myPopbox03.popup();

}

