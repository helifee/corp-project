/*
 * @(#)Yb0040.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 员工管理
 */
/**
 * @fileoverview 员工职位设定画面JavaScript.
 *
 * @author jinfang
 * @version 1.0
 */

// 隐藏域
var empDispSeqList;
var empPosInfoList;
var closeFlag=0;
var empPosInfoList2;
/**
 * 初始化.
 */
function initForm() {
	// 从父画面取值
	//$('empId').innerHTML='YD201001';
	//$('empName').innerHTML=;
	// Id数组,Action数组
	var selectIdArr, actionNameArr;
	
	// 职位类别，职位联动设定
	// Id数组
	selectIdArr = ['posType', 'posId'];
	// Action数组
	actionNameArr = ['yb0040FindPosTypeLst.action', 'yb0040FindPosLst.action'];
	// 下拉列表无回调
	registMultiSelect(selectIdArr, actionNameArr);
	
	// 字符串转化成对象
	empPosInfoList = $('empPosInfo').value.evalJSON();
	empPosInfoList2 = $('empPosInfo').value.evalJSON();
	empDispSeqList = $('dispSeqInfo').value.evalJSON();
	
	// 生成当前职位一览和历史职位一览
	reloadTbl(empPosInfoList);
	listColor('table_posNowList',70);
	listColor('table_posAllList',120);
} 
 
/**
 * 添加按钮事件.
 */
function addPosInfo() {
	// 当前职位一览
	var nowTable = $('table_posNowList');
	var nowCount = nowTable.rows.length;
	// 历史职位一览
	var allTable = $('table_posAllList');
	var allCount = allTable.rows.length;
	
	// 新建行
	var newPosInfo = new Object();

	// 取得画面信息
	// 员工编号
	newPosInfo.empId = $('empId').innerHTML;
	// 员工姓名
	newPosInfo.empName = $('empName').innerHTML;
	// 职位类别ID
	newPosInfo.posType = $('posType').value
	// 职位ID
	newPosInfo.posId = $('posId').value;
	
	// 判断职位类别是否为空
	if(newPosInfo.posType == ''){
		// 错误信息
		MsgBox.error(getMessage('js.com.warning.0001',$('posTypeLabel').innerHTML));
		
		return;
	// 判断职位是否为空
	}else if(newPosInfo.posId == ''){
		// 错误信息
		MsgBox.error(getMessage('js.com.warning.0001',$('posLabel').innerHTML));
		
		return;
	// 取得职位类别名称和职位略称
	}else{
		// 职位类别
		newPosInfo.posTypeName = $('posType').options[$('posType').selectedIndex].text;
		// 职位略称
		newPosInfo.posSName = $('posId').options[$('posId').selectedIndex].text;
	}
	
	// 开始日期
	newPosInfo.startTime = new Date().format('yyyy-MM-dd');
	// 结束日期
	newPosInfo.endTime = '9999-12-31';
	
	// 职位级别
	var jsonStr = $F('dispSeqInfo');
	var jsonObj = eval('(' + jsonStr + ')');
	newPosInfo.dispSeq = jsonObj[newPosInfo.posId];
	
	// 主要职位表示
	if (nowCount == 0) {
		// 无当前职位时，将新建职位设定为第一职位
		newPosInfo.mainPosFlg = '1';
	} else {
		// 否则，默认设定为非主要职位
		newPosInfo.mainPosFlg = '0';
	}
	
	// 如果该职位已存在，则不能添加
	for(var i=0; i<empPosInfoList.length; i++){
		if(empPosInfoList[i].posSName.strip() == newPosInfo.posSName.strip()
		&& empPosInfoList[i].posTypeName.strip() == newPosInfo.posTypeName.strip()
		&& empPosInfoList[i].endTime == '9999-12-31'){
			MsgBox.error(getMessage('js.emp.error.0019'));
			return;
		}
	}
	
	// 向画面操作List中添加行
	empPosInfoList.push(newPosInfo);
	
	// 画面操作List排序：降序
	empPosInfoList.sort(function(a, b) {
		if (a['endTime'] == b['endTime'] ) {
			if(a['startTime'] == b['startTime']){
				if (a['posType'] == b['posType']) {
					return a['dispSeq'] > b['dispSeq'] ? -1 : 1;
				}
				return a['posType'] > b['posType'] ? -1 : 1;
			}
			return a['startTime'] > b['startTime'] ? -1 : 1;
		}
		return a['endTime'] > b['endTime'] ? -1 : 1;
	});
	
	// 新建行：当前职位一览
	var newRowNow = nowTable.insertRow(nowCount);
	// 新建行：历史职位一览
	var newRowAll = allTable.insertRow(allCount);
	// 新建列
	for (var i=0; i<4; i++) {
		var cell1=newRowNow.insertCell(i);
		var cell2=newRowAll.insertCell(i);
	}
	
	// 设定新建列单元格的样式
	// 当前职位一览
	var arrRowNow = $(newRowNow).childElements();
	
	Element.addClassName(arrRowNow[0], 'percent_20');
	Element.addClassName(arrRowNow[1], 'percent_30');
	Element.addClassName(arrRowNow[2], 'percent_30');
	
	// 历史职位一览
	var arrRowAll = $(newRowAll).childElements();
	
	Element.addClassName(arrRowAll[0], 'percent_30');
	Element.addClassName(arrRowAll[1], 'percent_30');
	Element.addClassName(arrRowAll[2], 'percent_20');

	// 重新生成表格
	reloadTbl(empPosInfoList);
}

/**
 * 结束链接事件.
 */
function addEndTime(obj){	
	// 取得行号
	var rowNum = $(obj).up('tr').rowIndex;

	// 职位类别
	var posTypeNmCell = $('table_posNowList').down().childElements()[rowNum].childElements()[1].innerHTML;
	// 职位
	var posNmCell = $('table_posNowList').down().childElements()[rowNum].childElements()[2].innerHTML;

	// 当前职位一览
	// 有且仅有一条记录时
	if($('table_posNowList').rows.length == 1){
		// 错误信息
		MsgBox.error(getMessage('js.emp.error.0020'));
		return;
	// 存在多条记录时
	}else{
		// 设定结束日期
		for(var i=0; i<empPosInfoList.length; i++){
			if(posTypeNmCell.strip() == empPosInfoList[i].posTypeName.strip()
			&& posNmCell.strip() == empPosInfoList[i].posSName.strip()
			&& empPosInfoList[i].endTime == '9999-12-31'){
				// 结束日期
				empPosInfoList[i].endTime = new Date().format('yyyy-MM-dd');
			}
		}
		
		// 删除当前记录
		$('table_posNowList').deleteRow(rowNum); 
	}
	
	// 重新生成表格
	reloadTbl(empPosInfoList);
}

/**
 * 生成表格.
 */
function reloadTbl(obj){	
	// 取得当然职位一览表格中的所有行
	var rowNow = $('table_posNowList').select('tr');
	// 取得历史职位一览表格中的所有行
	var rowAll = $('table_posAllList').select('tr');
	
	// 当前职位一览index
	var nIdx=0;
	var flgIdx = 0;
		// 判断第一职位是否存在
	for(var i=0; i<empPosInfoList.length; i++){
		// RadioBox被选中
		if(empPosInfoList[i].endTime == '9999-12-31'
		&& empPosInfoList[i].mainPosFlg == '1'){
			// 累加
			flgIdx++;
		}
	
	}
	// 历史职位一览
	for (var i=0; i<obj.length; i++) {
		// 职位类别
		rowAll[i].childElements()[0].addClassName('percent_30');
		rowAll[i].childElements()[0].innerHTML = obj[i].posTypeName;
		// 职位
		rowAll[i].childElements()[1].addClassName('percent_30');
		rowAll[i].childElements()[1].innerHTML = obj[i].posSName;
		// 开始日期
		rowAll[i].childElements()[2].addClassName('percent_20');
		rowAll[i].childElements()[2].innerHTML = obj[i].startTime;
		// 结束日期
		if(obj[i].endTime == '9999-12-31'){
			rowAll[i].childElements()[3].innerHTML = '';
		}else{
			rowAll[i].childElements()[3].innerHTML = obj[i].endTime;
		}
		if(flgIdx==0)
		{
			nIdx=-1;
			flgIdx++;
			
		}
		var d=nIdx;
		// 当前职位一览
		if(obj[i].endTime == '9999-12-31'){
			// 第一职位	
			// RadioBox设定
		
			if (obj[i].mainPosFlg == '1') {
				nIdx=0;
				rowNow[nIdx].childElements()[0].addClassName('text_center','percent_20');
				rowNow[nIdx].childElements()[0].innerHTML = '<input type="radio" name="mainPosFlg" onclick="setFlg(this)" checked="checked" />';
			}else if(obj[i].mainPosFlg == '0'){
			
				nIdx=nIdx+1;
				d=nIdx;
				rowNow[nIdx].childElements()[0].addClassName('text_center','percent_20');
				rowNow[nIdx].childElements()[0].innerHTML = '<input type="radio" name="mainPosFlg" onclick="setFlg(this)" />';
			}
			// 职位类别
			rowNow[nIdx].childElements()[1].addClassName('percent_30');
			rowNow[nIdx].childElements()[1].innerHTML = obj[i].posTypeName;
			// 职位
			rowNow[nIdx].childElements()[2].addClassName('percent_30');
			rowNow[nIdx].childElements()[2].innerHTML = obj[i].posSName;
			// 操作
			rowNow[nIdx].childElements()[3].addClassName('text_center');
			rowNow[nIdx].childElements()[3].innerHTML = '<a href="#this" onclick="addEndTime(this)">结束</a>';
			nIdx=d;
		}

	}
	
	// 隔行变色
	listColor('table_posNowList',70);
	listColor('table_posAllList',120);
	parent.myInnerPageLoaded();
}

/**
 * 获取当前日期.
 */
Date.prototype.format = function(format)  {  
   var o = {  
     'M+' : this.getMonth()+1,                 //month  
     'd+' : this.getDate(),                    //day  
     'h+' : this.getHours(),                   //hour  
     'm+' : this.getMinutes(),                 //minute  
     's+' : this.getSeconds(),                 //second  
     'q+' : Math.floor((this.getMonth()+3)/3), //quarter  
     'S' : this.getMilliseconds()              //millisecond  
   }  
   if(/(y+)/.test(format)) format=format.replace(RegExp.$1,  
     (this.getFullYear()+'').substr(4 - RegExp.$1.length));  
	 
	for(var k in o){
		if(new RegExp('('+ k +')').test(format)) {
			format = format.replace(RegExp.$1,  
				RegExp.$1.length==1 ? o[k] :    
         		('00'+ o[k]).substr((''+ o[k]).length));
		}
	}
		 
	return format;  
}

// 在加载完成时调用父页面接口  
Event.observe(window, 'load', function() {  
	parent.myInnerPageLoaded();  
});  

/**
 * 保存按钮.
 */
function close1() { 
	// index
	var flgIdx = 0;
	
	// 判断第一职位是否存在
	for(var i=0; i<empPosInfoList.length; i++){
		// RadioBox被选中
		if(empPosInfoList[i].endTime == '9999-12-31'
		&& empPosInfoList[i].mainPosFlg == '1'){
			// 累加
			flgIdx++;
		}
	}

	// 不存在第一职位时
	if(flgIdx == 0){
		// 错误信息
		MsgBox.error(getMessage('js.emp.error.0021'));
		
		return;
	// 存在第一职位时
	}else if(flgIdx == 1){
		
		// 调用父页面接口  
		MsgBox.confirm(getMessage('js.com.info.0004'), '确认对话框', function(){
		   for(var j=0;j<empPosInfoList.length;j++)
		{
			empPosInfoList[j].posSName=empPosInfoList[j].posSName.strip();
			empPosInfoList[j].posTypeName=empPosInfoList[j].posTypeName.strip()
		}
		
		$('empPosListJson').value =empPosInfoList.toJSON();
		var url = 'yb0040RegFrom.action';
        $('empPosMgrForm').action = url;
        $('empPosMgrForm').submit();
		parent.myInnerPageClose();
		}, function(){
		}, '是', '否');
		
		
		
	}
}  

/**
 * 取消按钮.
 */
function close2() {  
	// 调用父页面接口 
	parent.myInnerPageClose();
} 

/**
 * 设定第一职位.
 */
function setFlg(obj) {  
	// 取得行号
	var rowNum = $(obj).up('tr').rowIndex;
	
	// 职位类别
	var posTypeNmCell = $('table_posNowList').down().childElements()[rowNum].childElements()[1].innerHTML;
	// 职位
	var posNmCell = $('table_posNowList').down().childElements()[rowNum].childElements()[2].innerHTML;

	// 设定第一职位
	for(var i=0; i<empPosInfoList.length; i++){
		
		if(posTypeNmCell.strip() == empPosInfoList[i].posTypeName.strip()
		&& posNmCell.strip() == empPosInfoList[i].posSName.strip()
		&& empPosInfoList[i].endTime == '9999-12-31'){
			// RadioBox被选中
			empPosInfoList[i].mainPosFlg = '1';
		}else{
			// RadioBox未选中
			empPosInfoList[i].mainPosFlg = '0';
		}
	}
} 


