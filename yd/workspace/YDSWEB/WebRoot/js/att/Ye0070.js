/*
 * @(#)Ye0070.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 
 */
/**
 * @fileoverview 员工加班一览画面JavaScript.
 *
 * @author likenan
 * @version 1.0
 */
 
/**
 * 日期类型枚举.1:当月 2：前月 3：全年 4：指定日期.
 */
var DatetypeEnum = {
    thisMonth: '0',
    lastMonth: '1',
    wholeYear: '2',
    inputBySelf: '3'
};

/**
 * 统计方式枚举.1:按年月 2：按项目
 */
var StatisticModeEnum = {
    ByDate: '1',
    ByPrj: '2'
}

var g_statisticMode = StatisticModeEnum.ByPrj;


//属性表格列名
var g_tableRowNameLv1First = 'prjName';
var g_tableRowWidthLv1First = 192;
var g_tableRowCssLv1First = 'text_left';
var g_tableRowNameLv2First = 'startSubYearMonth';
var g_tableRowWidthLv2First = 95;
var g_tableRowCssLv2First = 'text_center';
var g_lv2Indent = 192;

/**
 * 页面初始化.
 */
function init(){
	 
    // 日期条件默认值设定
    setDefaultDateRange(DatetypeEnum.thisMonth);
    
    // 设置画面表格列名和宽度
    setTableRows();
    
    return;
}

/**
* 设置日期条件默认值.
* @param dateType 日期条件类型
* @return none
*/
function setDefaultDateRange(datetype){
   // 自己指定日期时
   if (datetype == DatetypeEnum.inputBySelf) {
       //$('startDate').clear();
       //$('endDate').clear();
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
       var inputStartDate;
       var inputEndDate;
       // 选择当月
       if (datetype == DatetypeEnum.thisMonth) {
           //取当月第一天 日期
           inputStartDate = new Date(thisYear, thisMonth).pattern('yyyy-MM');
           //取当月最后一天日期
           inputEndDate = new Date(thisYear, thisMonth).pattern('yyyy-MM');
       }
       else 
           if (datetype == DatetypeEnum.lastMonth) {
               // 选择上月
               //取上月第一天 日期
               inputStartDate = new Date(thisYear, thisMonth - 1).pattern('yyyy-MM');
               //取上月最后一天日期
               inputEndDate = new Date(thisYear, thisMonth - 1).pattern('yyyy-MM');
           }
           else 
               if (datetype == DatetypeEnum.wholeYear) {
                   // 选择全年
                   inputStartDate = '' + thisYear + '-01';
                   inputEndDate = '' + thisYear + '-12';
               }
       
       $('startDate').value = inputStartDate;
       $('endDate').value = inputEndDate;
   }
   
   return;
}


/**
 * 初期化画面树形表格.（查询调用）
 *
 */
function searchOvertime(){
	 
	if($N('ye0070CondA.statisticMode').checked) {
		g_statisticMode = StatisticModeEnum.ByDate;
	} else {
		g_statisticMode = StatisticModeEnum.ByPrj;
	}
	// 设置画面表格列名和宽度
    setTableRows();
    
    var url = 'ye0070GetList.action';
    var pars = $('ye0070InitForm').serialize();
    
    // 如果日期控件不可用，手动传递参数
    if (!$NN('ye0070CondA.dateOptionType')[3].checked) {
        pars = pars + '&ye0070CondA.searchStartTime=' +
        $('startDate').value +
        '&ye0070CondA.searchEndTime=' +
        $('endDate').value;
    }
    pars = addStamp(pars);
    var myAjax = new Ajax.Request(url, {
        parameters: pars,
        method: 'post',
        onComplete: initOvertimeList
    })
}

/**
 * 初期化画面树形表格.
 *
 */
function initOvertimeList(request) {
	// 一级各列宽度
    var a = "lv1WidthStr = {'" +
    g_tableRowNameLv1First +
    "':" +
    g_tableRowWidthLv1First +
    ",'appEndRow': " + 
    g_tableRowWidthLv2First + 
    ",'prjOverTimePCash': 76,'prjOverTimePRest': 76," +
    "'sumApplyPerCnt': 76,'prjOverTimeRCash': 76," +
    "'prjOverTimeRRest': 76,'sumActualPerCnt': 76,'blank6': 40}";
    eval(a);
    // 一级各列附加CSS
    var b = "lv1ClassStr = {'" + 
    g_tableRowNameLv1First +
    "': '" +
    g_tableRowCssLv1First +
    "','appEndRow': 'text_center'," +
    "'prjOverTimePCash': 'text_center','prjOverTimePRest': 'text_center'," +
    "'sumApplyPerCnt': 'text_center','prjOverTimeRCash': 'text_center', " +
    "'prjOverTimeRRest': 'text_center','sumActualPerCnt': 'text_center','blank6': 'text_center'}";
    eval(b);
    // 二级各列宽度
    var c = "lv2Widthstr = {'" +
    g_tableRowNameLv2First +
    "':" +
    g_tableRowWidthLv2First +
    ",'overTimePCash': 76,'overTimePRest': 76," +
    "'applyPerCnt': 76,'overTimeRCash': 76,'overTimeRRest': 76," +
    "'actualPerCnt': 76,'attState': 57,'linkObject': 140 }";
    eval(c);
    // 二级各列附加CSS
    var d = "lv2ClassStr = {'" +
    g_tableRowNameLv2First +
    "': '" +
    g_tableRowCssLv2First +
    "','overTimePCash': 'text_center'," +
    "'overTimePRest': 'text_center','applyPerCnt': 'text_center','overTimeRCash': 'text_center'," +
    "'overTimeRRest': 'text_center','actualPerCnt': 'text_center'," +
    "'attState': 'text_center','linkObject': 'text_center' }";
    eval(d);
	var param = {			
		// 目标容器
		dest:'overTimeTreetable',
		
		// 第二级数据在bean中的名字
        lv2Name: 'ye0072OvertimeList',
		
		// 整体大小
		size: {
			width: 950,
			height: 400
		},
		
		totalLevel : 2
	};
	param.lv1Width = lv1WidthStr;
    param.lv1Class = lv1ClassStr;
    param.lv2Width = lv2Widthstr;
    param.lv2Class = lv2ClassStr;
    param.lv2Indent = g_lv2Indent;
    
	var t = new TreeTableX(param, request.responseText);
	
	// 计算时间总计
    sumTotalOvertime();
}
 
 /**
  * 设置表格列名和宽度.
  *
  */
 function setTableRows(){
     if (g_statisticMode == StatisticModeEnum.ByDate) {
         $('tableTitleDate2').removeClassName('none');
         $('tableTitleDate1').addClassName('none');
         
         g_tableRowNameLv1First = 'startYearMonth';
	     g_tableRowWidthLv1First = 97;
	     g_tableRowCssLv1First = 'text_center';
	     g_tableRowNameLv2First = 'prjSubName';
	     g_tableRowWidthLv2First = 190;
	     g_tableRowCssLv2First = 'text_left';
	     g_lv2Indent = 97;
     
	 }
	 else {
	     $('tableTitleDate1').removeClassName('none');
	     $('tableTitleDate2').addClassName('none');
	     
	     g_tableRowNameLv1First = 'prjName';
	     g_tableRowWidthLv1First = 192;
	     g_tableRowCssLv1First = 'text_left';
	     g_tableRowNameLv2First = 'startSubYearMonth';
	     g_tableRowWidthLv2First = 95;
	     g_tableRowCssLv2First = 'text_center';
	     g_lv2Indent = 192;
	     
	     
	     }
	 }

  /**
   * 计算时间总计.
   *
   */
  function sumTotalOvertime(){
	  //预计有料加班总时间
	  var appSumCashArray = $('overTimeTreetable').select('div[property="prjOverTimePCash"]');
	  var appSumCashs;
	  var appSumCashHours = 0;
	  var appSumCashMinutes = 0;
	  $('appSumCash').innerHTML = '';
	  //预计换休加班总时间
	  var appSumRestArray = $('overTimeTreetable').select('div[property="prjOverTimePRest"]');
	  var appSumRests;
	  var appSumRestHours = 0;
	  var appSumRestMinutes = 0;
	  $('appSumRest').innerHTML = '';
	  //预计加班总人次
	  var appSumPerCntArray = $('overTimeTreetable').select('div[property="sumApplyPerCnt"]');
	  var appSumPerCnts = 0;
	  $('appSumPerCnt').innerHTML = '';
	  //实际有料加班总时间
	  var actualSumCashArray = $('overTimeTreetable').select('div[property="prjOverTimeRCash"]');
	  var actualSumCashs;
	  var actualSumCashHours = 0;
	  var actualSumCashMinutes = 0;
	  $('actualSumCash').innerHTML = '';
	  //实际换休加班总时间
	  var actualSumRestArray = $('overTimeTreetable').select('div[property="prjOverTimeRRest"]');
	  var actualSumRests;
	  var actualSumRestHours = 0;
	  var actualSumRestMinutes = 0;
	  $('actualSumRest').innerHTML = '';
	  //实际加班总人次
	  var actualSumPerCntArray = $('overTimeTreetable').select('div[property="sumActualPerCnt"]');
	  var actualSumPerCnts = 0;
	  $('actualSumPerCnt').innerHTML = '';
	  
	  //加算
	  //预计有料加班总时间
	  if (appSumCashArray) {
	      for (i = 0; i < appSumCashArray.length; i++) {
	          appSumCashs = appSumCashArray[i].innerHTML.split(':');
	          appSumCashHours = appSumCashHours + parseInt(appSumCashs[0], 10);
	          appSumCashMinutes = appSumCashMinutes + parseInt(appSumCashs[1], 10);
	      }
	      var minuteToHours =  appSumCashMinutes / 60 + '';
	      appSumCashHours = appSumCashHours + parseInt(minuteToHours.split('.')[0], 10); 
	      appSumCashMinutes = appSumCashMinutes % 60 + '';
	      if (appSumCashMinutes.length == 1) {
	          appSumCashMinutes = '0' + appSumCashMinutes;
	      }
	      
	      $('appSumCash').innerHTML = (appSumCashHours + ':' + appSumCashMinutes);
	  } else {
		$('appSumCash').innerHTML = '0:00';
	  }
	  //预计换休加班总时间
	  if (appSumRestArray) {
	      for (i = 0; i < appSumRestArray.length; i++) {
	          appSumRests = appSumRestArray[i].innerHTML.split(':');
	          appSumRestHours = appSumRestHours + parseInt(appSumRests[0], 10);
	          appSumRestMinutes = appSumRestMinutes + parseInt(appSumRests[1], 10);
	      }
	      var minuteToHours =  appSumRestMinutes / 60 + '';
	      appSumRestHours = appSumRestHours + parseInt(minuteToHours.split('.')[0], 10); 
	      appSumRestMinutes = appSumRestMinutes % 60 + '';
	      if (appSumRestMinutes.length == 1) {
	          appSumRestMinutes = '0' + appSumRestMinutes;
	      }
	      
	      $('appSumRest').innerHTML = (appSumRestHours + ':' + appSumRestMinutes);
	  } else {
		$('appSumRest').innerHTML = ('0:00');
	  }
	  //预计加班总人次
	  if (appSumPerCntArray) {
	      for (i = 0; i < appSumPerCntArray.length; i++) {
	    	  appSumPerCnts = appSumPerCnts + parseInt(appSumPerCntArray[i].innerHTML,10);
	      }      
	      $('appSumPerCnt').innerHTML = (appSumPerCnts);
	  } else {
		$('appSumPerCnt').innerHTML = ('0');
	  }
	  //实际有料加班总时间
	  if (actualSumCashArray) {
	      for (i = 0; i < actualSumCashArray.length; i++) {
	    	  actualSumCashs = actualSumCashArray[i].innerHTML.split(':');
	    	  actualSumCashHours = actualSumCashHours + parseInt(actualSumCashs[0], 10);
	    	  actualSumCashMinutes = actualSumCashMinutes + parseInt(actualSumCashs[1], 10);
	      }     
	      var minuteToHours =  actualSumCashMinutes / 60 + '';
	      actualSumCashHours = actualSumCashHours + parseInt(minuteToHours.split('.')[0], 10);
	      actualSumCashMinutes = actualSumCashMinutes % 60 + '';
	      
	      if (actualSumCashMinutes.length == 1) {
	    	  actualSumCashMinutes = '0' + actualSumCashMinutes;
	      }
	      
	      $('actualSumCash').innerHTML = (actualSumCashHours + ':' + actualSumCashMinutes);
	  } else {
		$('actualSumCash').innerHTML = '0:00';
	  }
	  //实际换休加班总时间
	  if (actualSumRestArray) {
	      for (i = 0; i < actualSumRestArray.length; i++) {
	    	  actualSumRests = actualSumRestArray[i].innerHTML.split(':');
	    	  actualSumRestHours = actualSumRestHours + parseInt(actualSumRests[0], 10);
	    	  actualSumRestMinutes = actualSumRestMinutes + parseInt(actualSumRests[1], 10);
	      }
	      var minuteToHours =  actualSumRestMinutes / 60 + '';
	      actualSumRestHours = actualSumRestHours + parseInt(minuteToHours.split('.')[0], 10);   
	      actualSumRestMinutes = actualSumRestMinutes % 60 + '';
	      
	      if (actualSumRestMinutes.length == 1) {
	    	  actualSumRestMinutes = '0' + actualSumRestMinutes;
	      }
	      
	      $('actualSumRest').innerHTML = (actualSumRestHours + ':' + actualSumRestMinutes);
	  } else {
		$('actualSumRest').innerHTML = ('0:00');
	  }
	  //实际加班总人次
	  if (actualSumPerCntArray) {
	      for (i = 0; i < actualSumPerCntArray.length; i++) {
	    	  actualSumPerCnts = actualSumPerCnts + parseInt(actualSumPerCntArray[i].innerHTML,10);
	      }      
	      $('actualSumPerCnt').innerHTML = (actualSumPerCnts);
	  } else {
		$('actualSumPerCnt').innerHTML = ('0');
	  }
  }
  
 /**
  * 日期条件类型选择.
  *
  */
 function selectDateType(selectedRadio){
    setDefaultDateRange(selectedRadio.value);
 }
  
 function showYe0060(prjInfo, yearMonth){
	 
	 window.location.href = 'ye0060Init' + '?ye0060CondA.prjId=' + prjInfo + '&monthForSearch =' + yearMonth
	                         + '&mode =2';
 }
 function operateYe0060(prjInfo, yearMonth){
	 
	 window.location.href = 'ye0060Init' + '?ye0060CondA.prjId=' + prjInfo + '&monthForSearch =' + yearMonth
	                         + '&mode =3';
 }
 
