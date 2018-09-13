/*
 * @(#)k070031.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试子系统
 */
/**
 *  成绩明细JavaScript.
 *
 * @author chenzhong
 * @version 1.0
 */

/**
 * 画面onload
 * @param paperNum
 * 			试卷数
 */
function initPage(paperNum) {
	
	//设置表格颜色	
	var tableId = 'table_paper';
	for (var i = 0; i < paperNum; i++) {
		listColor(tableId + i);
	}
}

/**
 * 取得分数明细信息
 * @param examineId
 * 			考试ID
  * @param employeesId
 * 			员工ID 
 */
function gainPointDetail(examineId, employeesId){
	var url = 'k070031GainPointDetail.action';
	var pars = 'examEmployeeInfo.examineId='+examineId+"&examEmployeeInfo.employeesId="+employeesId;
	new Ajax.Updater('detailDiv', url, {
		parameters: pars,
		method: 'post',
		onLoading: function(){
		},
		onSuccess: function(response){
		},
		onFailure: function(request){
			reportError();
		},
		onComplete: function(response){
		
			var flg = checkException(response);
			
			if (!flg) {
				
				// 显示成绩明细一览
				$('detailDiv').removeClassName('none');
			}
		}
	});

}
