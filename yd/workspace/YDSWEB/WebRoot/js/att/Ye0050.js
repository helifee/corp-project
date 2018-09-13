/*
 * @(#)Ye0050.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
 */
/**
 * @author pengchuan
 * @version 1.0  2010/12/02
 */
/**
 *初期画面加载
 */
function initForm(){
	//初始时间默认处理
	var nowDate = new Date();                       //获取系统当前时间
	var nowYear = nowDate.getFullYear();            //获取当前年份(2位)
	var nowMonth = nowDate.getMonth();              //获取当前月份
	if($($NN('ye0050CondA.timeType')[0]).checked){
		$("startDate").disable();
	    $("endDate").disable();
		var newDate = new Date(nowYear,nowMonth+1,1);                //取下个月中的第一天	
		var monthFirst =  new Date(nowYear,nowMonth,1).pattern('yyyy-MM-dd'); //取当月第一天 日期
   		var monthLast = (new Date(newDate.getTime()-1000*60*60*24)).pattern('yyyy-MM-dd');//取当月最后一天日期
		$("startDate").value = monthFirst;
		$("endDate").value = monthLast ;
	}
	//审批意见弹出层
	g_box = new PopupBox({
        // 唯一标志
        key: 1,
        // 标题内容，元素或字符串
        title: '确认对话框',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_att_reason'),
        // 显示位置，相当与z-index
        position: 9,
        // 是否允许拖动
        drag: true
    });
	if($('fromId').value == "01"){
		$($NN('ye0050CondA.timeType')[3]).checked=true;
		$($NN('ye0050CondA.status')[0]).checked=true;
		$("startDate").value="";
		$("endDate").value="";
		searchAttInfo();
	}
	
	//查看弹出层
	g_box_correct = new PopupBox({
        // 唯一标志
        key: 2,
        // 标题内容，元素或字符串
        title: '考勤更正',
        // 图标的CSS
        icon: 'img_opt opt_EditTable',
        // 内容元素
        content: $('div_att_correct'),
        // 显示位置，相当与z-index
        position: 9,
        // 是否允许拖动
        drag: true
    });
}
/**
 * 检索一览
 */
function searchAttInfo(){
	
	//加载动画
	showLoader();
	$("startDate").enable();
	$("endDate").enable();
	var url = 'ye0050findAttInfoList.action';
	var pars=$('searchForm').serialize();
	pars = addStamp(pars);
    new Ajax.Updater('div_att_infoList', url, {
        method: 'get',
		parameters: pars,
		onComplete: function(response) {
			if(checkException(response)){
				return;
			}
			//列表滚动条设置
			listColor('table_attCorInfoList', 450);
			//隐藏动画
			hideLoader();
			if (!$($NN('ye0050CondA.timeType')[3]).checked) {
				$("startDate").disable();
				$("endDate").disable();
			}
		}
	});
	
}
/**
 * 日期选择操作
 */
function changeTime(val){
	radioDate = val.value;
	var nowDate = new Date();
    var nowYear = nowDate.getFullYear();       //获取当前年份(2位)
    var nowMonth = nowDate.getMonth();         //获取当前月份
 	var nowWeek = nowDate.getDay();			   //获取当前星期
	if(radioDate=='0' ){
		var newDate = new Date(nowYear,nowMonth+1,1);                //取下个月中的第一天	
		var monthFirst =  new Date(nowYear,nowMonth,1).pattern('yyyy-MM-dd'); //取当月第一天 日期
   		var monthLast = (new Date(newDate.getTime()-1000*60*60*24)).pattern('yyyy-MM-dd');//取当月最后一天日期
		$("startDate").disabled = true ;
		$("endDate").disabled = true ;
		$("startDate").value = monthFirst;
		$("endDate").value = monthLast ;
	}
	if(radioDate=='1' ){
		var newDate = new Date(nowYear,nowMonth,1);                //取当月的第一天	
		var monthFirst =  new Date(nowYear,nowMonth-1,1).pattern('yyyy-MM-dd'); //取上月第一天 日期
   		var monthLast = (new Date(newDate.getTime()-1000*60*60*24)).pattern('yyyy-MM-dd');//取上月最后一天日期
		$("startDate").disabled = true ;
		$("endDate").disabled = true ;
		$("startDate").value = monthFirst;
		$("endDate").value = monthLast ;
	}
	if(radioDate=='2' ){
		var newDate = new Date(nowYear,12,1);                //取下年的第一天	
		var monthFirst =  new Date(nowYear,0,1).pattern('yyyy-MM-dd'); //取当年第一天 日期
   		var monthLast = (new Date(newDate.getTime()-1000*60*60*24)).pattern('yyyy-MM-dd');//取当年最后一天日期
		$("startDate").disabled = true ;
		$("endDate").disabled = true ;
		$("startDate").value = monthFirst;
		$("endDate").value = monthLast ;
	}
	if(radioDate=='3'  ){
		$("startDate").enable();
		$("endDate").enable();
	}
}
/**
 * 同意操作
 * @param {Object} obj
 */
function agreeMent(obj){
	//获取当前操作的行号
	var rowNum = $(obj).up('tr').rowIndex;
	var appEmpNm=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[0].innerHTML;
	//取得第一列隐藏项的值
	//取得审批Id
	var appId=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[1].select('input')[0].value;
	//取得申请人Id
	var appEmpId=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[1].select('input')[1].value;
	//取得变更后出勤时间（Date型）
	var aftStartTimeDate=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[1].select('input')[2].value;
	//取得变更后退勤时间（Date型）
	var aftEndTimeDate=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[1].select('input')[3].value;
	//取得考勤日期
	var attTime=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[3].innerHTML;
	$('year').value=attTime.split('/')[0];    //取得考勤日期的年
	$('month').value=attTime.split('/')[1];    //取得考勤日期的月
	$('day').value=attTime.split('/')[2];       //取得考勤日期的日
	$('flag').value=1;                          //同意操作Flag
	$('rstartTime').value=aftStartTimeDate;     //画面数据赋给更新DB的数据
	$('rendTime').value=aftEndTimeDate;			//画面数据赋给更新DB的数据
	$('attAppId').value=appId;
	$('attEmpId').value=appEmpId;
	var url='ye0050AttOperate.action';
	var pars=$('attCorInfo').serialize();
	pars = addStamp(pars);
	MsgBox.confirm(getMessage('js.att.info.0001',appEmpNm), '确认对话框', function(){
		        new Ajax.Updater('div_att_infoList', url, {
				        method: 'post',
						parameters: pars,
						onComplete: function(response){
							if(checkException(response)){
								return;
							}
							searchAttInfo();
						}
					});
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}
/**
 * 不同意操作
 * @param {Object} obj
 */
function disAgreeMent(obj){
	$('reason').value="";
	var rowNum = $(obj).up('tr').rowIndex;
	var appEmpNm=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[0].innerHTML;
	var appId=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[1].select('input')[0].value;
	var appEmpId=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[1].select('input')[1].value;
	var aftStartTimeDate=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[1].select('input')[2].value;
	var aftEndTimeDate=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[1].select('input')[3].value;
	var attTime=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[3].innerHTML;
	$('year').value=attTime.split('/')[0];
	$('month').value=attTime.split('/')[1];
	$('day').value=attTime.split('/')[2];
	$('flag').value=0;
	$('attAppId').value=appId;
	$('attEmpId').value=appEmpId;
	$('rstartTime').value=aftStartTimeDate;
	$('rendTime').value=aftEndTimeDate;
	$('appEmpNm').value=appEmpNm;
	MsgBox.confirm(getMessage('js.att.info.0002',appEmpNm), '确认对话框', function(){
		
		        g_box.Popup.delay(0.01);
    }, function(){
        // 取消时回调
        return;
    }, '是', '否');
}
/**
 * 审批意见确定
 */
function reason(){
	//审批意见不能为空校验
	if ($('reason').value == "") {
		alert(getMessage('js.com.warning.0001','审批意见'));
	}
	//输入内容赋给DB数据
	$('exaReason').value=$('reason').value;
	var url='ye0050AttOperate.action';
	var pars=$('attCorInfo').serialize();
	pars = addStamp(pars);
	if ($('reason').value != "") {
		        new Ajax.Updater('div_att_infoList', url, {
					method: 'get',
					parameters: pars,
					onComplete: function(response){
						if(checkException(response)){
								return;
					    }
						searchAttInfo();
						g_box.close();
					}
				});
  }
}
/**
 * 查看画面
 * @param {Object} obj
 */
function display(obj){
	var rowNum = $(obj).up('tr').rowIndex;
	var appId=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[1].select('input')[0].value;
	var attTime=$('table_attCorInfoList').down().childElements()[rowNum].childElements()[3].innerHTML;
	$('myInnerPage').src = 'ye0030Init.action?'+'loginId='+$('loginId').value + '&attDate='+attTime+'&appId='+appId;
}
/**
 * 迁移到考勤更正画面
 */
function herfAttCorrect(){
	$('myInnerPage').src = 'ye0030Init.action?'+'loginId='+$('loginId').value;
}
