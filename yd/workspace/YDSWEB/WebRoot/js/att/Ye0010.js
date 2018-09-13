/*
 * @(#)Yc0010.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考勤系统
 */
/**
 * @fileoverview 个人考勤信息画面JavaScript.
 *
 * @author jinfang
 * @version 1.0 2010/12/07
 */
/**
 * 操作状态枚举.0:无 1：新建 2：更改 .
 */
var OperateEnum = {
	None: '0',
	Create: '1',
	Modify: '2'
};

/**
 * 标题枚举.
 */
var TitleEnum = {
	Normal: '',
	Create: '新建',
	Modify: '修改'
};

var g_operateFlag = OperateEnum.None;

/**
 * 考勤年月
 */
var nYear;
var nMonth;

/**
 * 页面初始化.
 */
function init() {
	nYear = $('txtfYear').value - 0;   //年
	nMonth = $('txtfMonth').value - 0; //月
	
	$('bgmonth').update(nMonth);
	
	//考勤更正弹出画面
	g_box_correct = new PopupBox({
		// 唯一标志
		key: 3,
		// 标题内容，元素或字符串
		title: '考勤更正申请',
		// 图标的CSS
		icon: 'img_opt opt_EditTable',
		// 内容元素
		content: $('div_att_correct'),
		// 显示位置，相当与z-index
		position: 9,
		// 是否允许拖动
		drag: true
	});
		
	//休假请假弹出画面
	g_box_rest = new PopupBox({
		// 唯一标志
		key: 2,
		// 标题内容，元素或字符串
		title: '休假请假申请',
		// 图标的CSS
		icon: 'img_opt opt_EditTable',
		// 内容元素
		content: $('restPage'),
		// 显示位置，相当与z-index
		position: 9,
		// 是否允许拖动
		drag: true,
		// 关闭后的回调，用于刷新页面等  
         afterclose: function() {  
             searchAttInfo.delay(0.5,nYear,nMonth);  
         }  
	});
	
	//次月按钮是否可用
	btnClick();
	
	return;
}

/**
 * 前月次月按钮事件
 * oMonth：前月-1/次月+1
 */
function change(oMonth) {
	//加减月
	nMonth = oMonth + nMonth;
	
	if (nMonth > 12 && nYear == 2049) {
		nMonth = 12;
	} else if (nMonth < 1 && nYear == 1949) {
		nMonth = 1;
	} else if (nMonth > 12 || nMonth < 1) {
		nYear += (nMonth < 1 ? -1 : 1);
		nMonth = (nMonth + 11) % 12 + 1;
	}
	
	nYear = nYear > 2049 ? 2049 : nYear;
	nYear = nYear < 1949 ? 2049 : nYear;
	
	//设定日期控件年月
	window.location = window['g_basePath'] + 'att/ye0010Init.action?txtfYear={0}&txtfMonth={1}'.format(nYear, nMonth);
	
	//次月按钮是否可用
	btnClick();
}

/**
 * 日期控件事件
 *
 */
function pickedFunc() {
	//取得当前年
	nYear = $dp.cal.getP('y');
	//取得当前月
	nMonth = $dp.cal.getP('M')-0;
	
	//向后台提交年月
	window.location = window['g_basePath'] + 'att/ye0010Init.action?txtfYear={0}&txtfMonth={1}'.format(nYear, nMonth);
}

/**
 * 弹出层刷新画面
 *
 */
function searchAttInfo(year, month){
	//格式化月份
	month = month-0;
	
	//向后台提交年月
	window.location = window['g_basePath'] + 'att/ye0010Init.action?txtfYear={0}&txtfMonth={1}'.format(year, month);
	
	//次月按钮是否可用
	btnClick();
}

/**
 * 次月按钮是否可用
 *
 */
function btnClick(){
	
  	var theDate=new Date();  
	
	//如果是今天所在的月份，次月按钮不可用
	if(document.all){
		//ie
		if(nMonth >= (theDate.getMonth()+1) && nYear >= theDate.getYear()){
			$('aftmon').disable();
		}else{
			$('aftmon').enable();
		}
	}else{
	  	//ff
		if((nMonth >= (theDate.getMonth()+1) && (nYear >= (theDate.getYear()+1900)))){
			$('aftmon').disable();
		}else{
			$('aftmon').enable();
		}	
	}
}

/**
 * 休假申请按钮
 *
 */
function popInnerPage1() {  
	$('restPage').src = 'ye0020Init.action';
	g_box_rest.popup();
}

// 接口：加载完成
function myInnerPageLoaded() {
	g_box_rest.loaded();
}
	
function myInnerPageClose() {  
	g_box_rest.close();  
}  

/**
 * 休假请假链接
 *
 */	
function popInnerPage3(appId) {  
	$('restPage').src = 'ye0020InitViewSelf.action?paraAppId=' + appId;
	g_box_rest.popup();
}  

/**
 * 考勤更正按钮
 *
 */	    
function popInnerPage2() {  
	$('myInnerPage').src = 'ye0030Init.action?'+'loginId=' + $('loginId').value;
}  
	
/**
 * 考勤更正链接
 *
 */
function popInnerPage4(appId,year,month,day) {  
	$('myInnerPage').src = 'ye0030Init.action?'+'loginId=' + $('loginId').value +'&attDate=' +year + '-' + month + '-' + day+'&appId=' + appId;
}  