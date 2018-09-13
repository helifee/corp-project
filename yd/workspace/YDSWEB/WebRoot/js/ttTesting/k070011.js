/*
 * @(#) k070011.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试系统
 *    SubSystem: 考试子系统
 */

/**
 * @fileoverview 成绩查询JavaScript.
 *
 * @author chenjunshuai
 * @version 1.0
 */
var regexDateFormat = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$';

/**
 * 分页枚举.0:考试查询 1：员工查询 2：定位检索.
 */	
var pageFlagEnum = {
	page_1 : 0,
	page_2 : 1,
	page_3 : 2
}
var g_flag = 0;

/**
 * 页面初期化.
 */
function initForm() {
	
	// 火狐IE兼容
	firefoxIE();	
	
	// 显示加载动画
    showLoader();
	
	// 员工ID获取焦点
	$('examineId').focus();
	
	// 调用共同的员工ID获取员工姓名
	initTtJsNameFilter("employeesId", "employeesName");
	
	// 调用共同的3级联动	
	initCategoryList('K070011','0',1,true,'0','sltCategory1', 'sltCategory2', 'sltCategory3','1','1');
	initCategoryList('K070011','0',1,true,'0','sltCategoryA1', 'sltCategoryA2', 'sltCategoryA3','1','1');
	initCategoryList('K070011','0',1,true,'0','sltCategoryB1', 'sltCategoryB2', 'sltCategoryB3','1','1');
	initCategoryList('K070011','0',1,true,'0','sltCategoryC1', 'sltCategoryC2', 'sltCategoryC3','1','1');

	// 创建开始日期校验
	//addRegexCheck($('startDate'), getMessage('js.com.warning.0002', '创建日期'), regexDateFormat);
	
	// 创建结束日期校验
	//addRegexCheck($('endDate'), getMessage('js.com.warning.0002', '创建日期'), regexDateFormat);
	
	// 开始与结束日期校验 
	//addCustomCheck($('startDate'), getMessage('js.com.warning.0006'), 'startDate', function compareInputTime(){
	//	if (compareTime($('startDate'), $('endDate'))) {
    //        removeFieldError($('endDate'));
    //    }
	//	return compareTime($('startDate'), $('endDate'));
	//});
	
	//addCustomCheck($('endDate'), getMessage('js.com.warning.0006'), 'endDate', function compareInputTime(){
	//	if (compareTime($('startDate'), $('endDate'))) {
    //        removeFieldError($('startDate'));
    //    }
	//	return compareTime($('startDate'), $('endDate'));
	//});
	
	// 隐藏加载动画
    hideLoader();

}

/**
 * 页面Tab功能.
 */
function nTabs(thisObj, num){
	if (thisObj.className == "active") return;
	var tabObj = thisObj.parentNode.id;
	var tabList = $(tabObj).select('li');
	if (0 == num) {
		tabList[0].className = 'active';
		tabList[1].className = 'normal';
		tabList[2].className = 'normal';
		$('divEmpSearchPage').addClassName('none');
		$('divExamineSearchPage').removeClassName('none');
		$('divPostionSearchPage').addClassName('none');
		$('examineId').focus();
	} else if (1 == num) {
		tabList[0].className = 'normal';
		tabList[1].className = 'active';
		tabList[2].className = 'normal';
		$('divExamineSearchPage').addClassName('none');
		$('divEmpSearchPage').removeClassName('none');
		$('divPostionSearchPage').addClassName('none');
		$('employeesId').focus();
		clearError('k070011EmpExamineForm');
	} else if (2 == num) {
		tabList[0].className = 'normal';
		tabList[1].className = 'normal';
		tabList[2].className = 'active';
		$('divExamineSearchPage').addClassName('none');
		$('divEmpSearchPage').addClassName('none');
		$('divPostionSearchPage').removeClassName('none');
		$('examine1Id').focus();		
	}
}

/**
 * 分页时使用的ajax提交函数.
 */
function pagerCommonTag(pageUrl, pageNumber){

	if (pageFlagEnum.page_1 == g_flag) {
		
		// 显示加载动画
     	showLoader();
		
		// 从隐藏控件中取出上次使用的检索条件
		var pars = $('oldK070011Form').value;
		
		// 设定pars及其余参数
		pars = pars + '&pageNumber=' + pageNumber;
	    new Ajax.Updater('divExamineList', pageUrl, {
	        method: 'post',
	        parameters: pars,
	        onSuccess: function(response){
	       },
	       onFailure: function(request){
	            MsgBox.error(getMessage('js.com.error.0001'));
	        },
			onComplete: function(response){
			var flg = checkException(response);
			if(!flg) {
							
				// 重置列表颜色
				listColor('examineTableList');	
				
				// 隐藏加载动画
                hideLoader();			
			}

			}
	   });		
	} else if (pageFlagEnum.page_2 == g_flag) {
		
		// 显示加载动画
     	showLoader();
		
		// 从隐藏控件中取出上次使用的检索条件
		var pars = $('oldK070011EmpExamineForm').value;
		
		// 设定url及其余参数
		pars = pars + '&pageNumber=' + pageNumber;
	    new Ajax.Updater('divEmpExamineList', pageUrl, {
	        method: 'post',
	        parameters: pars,
	        onSuccess: function(response){
	        },
	        onFailure: function(request){
	            MsgBox.error(getMessage('js.com.error.0001')); 
	        },
			onComplete: function(response){
			var flg = checkException(response);
			if(!flg) {
							
				// 重置列表颜色
				listColor('empExamineTableList');	
				
				// 隐藏加载动画
                hideLoader();			
			}

			}
	   });		
	} else {
		
		// 显示加载动画
     	showLoader();
		
		// 从隐藏控件中取出上次使用的检索条件
		var pars = $('oldK070011PostionForm').value;
		
		// 设定url及其余参数
		pars = pars + '&pageNumber=' + pageNumber;
	    new Ajax.Updater('divPosExamineList', pageUrl, {
	        method: 'post',
	        parameters: pars,
	        onSuccess: function(response){
	        },
	        onFailure: function(request){
	            MsgBox.error(getMessage('js.com.error.0001')); 
	        },
			onComplete: function(response){
				var flg = checkException(response);
				if (!flg) {
				
					// 重置列表颜色
					listColor('posSpecificTableList');
					
					// 隐藏加载动画
                	hideLoader();
				}
			}
	   });		
	}
}

/**
 * 考试选择一览检索.
 */
function selectExamineList(){
	if (checkForm('k070011Form')) {
		
		// 显示加载动画
     	showLoader();
		var url = 'k070011GetExamineList.action';
		var pars = $('k070011Form').serialize();
		$('oldK070011Form').value = pars;
	
		new Ajax.Updater('divExamineList', url, {
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
				
					//  隐藏汇总信息
					$('divExamineResultsInfo').addClassName('none');
					
					// 显示考试一览
					$('divExamineList').removeClassName('none');
					
					// 重置列表颜色
					listColor('examineTableList');
					
					// 隐藏加载动画
                	hideLoader();
				}
			}
		});
	}
}

/**
 * 考试汇总信息一览.
 */
function getExamineInfo(examineId, examineName, categoryName){
	
	// 显示加载动画
    showLoader();
	var url = 'k070011GetExamineResults.action';
	var pars = 'examineId =' + encodeURI(examineId)+ '&' + 'examineName ='+ encodeURI(examineName)
							+ '&' + 'categoryName ='+ encodeURI(categoryName);
	new Ajax.Updater('divExamineResultsInfo', url, {
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
			if(!flg) {
				
				// 显示考试汇总信息
			    $('divExamineResultsInfo').removeClassName('none');
			
				// 重置列表颜色
				listColor('examineResultsList');
				
				// 隐藏加载动画
                hideLoader();				
			}		
		}
	});
}

/**
 * 清空考试检索信息.
 */
function clearExamineInfo() {
	if (window.confirm(getMessage('js.tt.warn.JYW13'))) {
		
		// 清空考试ID
		$('examineId').clear();
		
		// 清空考试名称
		$('examineName').clear();

		// 清空考试分类
		clearCategory('K070011', 'sltCategory1', 'sltCategory2', 'sltCategory3');
		
		// 考试Id获取焦点
		$('examineId').focus();	
		
		// 去掉错误信息
		removeFieldError('examineId');	

		// 隐藏后台校验的错误
		$('errorMessage1').hide();
	}
}

/**
 * 员工查询考试信息一览检索.
 */
function empExamineSearch(){

	if (checkForm('k070011EmpExamineForm')) {
		
		// 显示加载动画
     	showLoader();
		g_flag = 1;
		$('employeesIdHidden').value = $F('employeesId');
		var url = 'k070011GetEmpExamineInfo.action';
		var pars = $('k070011EmpExamineForm').serialize();
		$('oldK070011EmpExamineForm').value = pars;
		new Ajax.Updater('divEmpExamineList', url, {
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
				
					// 显示考试信息
					$('divEmpExamineList').removeClassName('none');
					
					// 重置列表颜色
					listColor('empExamineTableList');
					
					// 隐藏加载动画
                	hideLoader();	
				}
			}
		});
	}
}
/**
 * 员工查询地具体考试信息一览检索.
 */
function getEmpExamineInfo(parentExamineId,examineRadioValue) {
	
	// 显示加载动画
    showLoader();
	var url = 'k070011GetEmpExamineSpecific.action';
	var pars = 'examineRadioValue='+examineRadioValue+ '&parentExamineId=' + encodeURI(parentExamineId) + 
				'&employeesId=' + encodeURI($F('employeesIdHidden'));
	new Ajax.Updater('divEmpSpecificList', url, {
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
			if(!flg) {
				
				// 显示考试信息
			    $('divEmpSpecificList').removeClassName('none');
			
				// 重置列表颜色
				listColor('empSpecificTableList');		
				
				// 隐藏加载动画
                hideLoader();			
			}		
		}
	});				
}

/**
 * 员工查询成绩明细按钮.
 */
function resultDetail(examineId) {
//	var examineId = "";
//	for (var i = 0; i < ($('empSpecificTableList').rows.length - 1); i++){
//		if ($('radioButton' + i).checked) {
//			examineId = $('empExamineid'+ i).innerText;
//		}
//	}
//	if("" == examineId){
//		MsgBox.message(getMessage('js.com.info.0014'));
//	} else {
//		window.open('k070031InitScoreDetails.action?examineId='+ examineId);
//	}
	window.open('k070031InitScoreDetails.action?examineId='+ examineId,'resultDetailsWin');
}

/**
 * 员工查询答题对照按钮.
 */
function answerContrast(examineId,examineJoinTimes){
//	var examineId = '';
//	var examineJoinTimes=''
//	for (var i = 0; i < ($('empSpecificTableList').rows.length - 1); i++){
//		if ($('radioButton' + i).checked) {
//			examineId = $('empExamineid'+ i).innerText;
//			examineJoinTimes = $('examineJoinTimes' + i).value;
//		}
//	}
//	if("" == examineId){
//		MsgBox.message(getMessage('js.com.info.0014'));
//	} else {
		window.open('k060091TestAnswerViewMode.action?examineId ='+ examineId+ '&' + 'examineJoinTimes=' + 
				examineJoinTimes + '&' + 'employeeId=' + $F('employeesIdHidden'));
//	}	
}

/**
 * 考试名称和档次检索.
 */
function getExamineNameLevel(examineId, resultlevelId, examineName){

	// 输入校验
	if (checkForm('k070011PostionForm')) {
	
		// 显示加载动画
		showLoader();
		var url = 'k070011GetExamineNameLevelInfo.action';
		var strExamineId = $F(examineId);
		var pars = 'k070011SearchPostionInfo.' + examineId + '=' + encodeURI(strExamineId);
		var pars = addStamp(pars);
		if (strExamineId.empty()) {
			return;
		}
		new Ajax.Request(url, {
			method: 'get',
			parameters: pars,
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
					getExamineNameLevelCallback(response.responseText, resultlevelId, examineName, examineId);
					
					// 隐藏加载动画
					hideLoader();
				}
			}
		});
	}
}

/**
 * 定位查询考试信息检索.
 */
function selectPostionExamine() {
	// 输入校验
	if (checkForm('k070011PostionForm')){
		
		// 显示加载动画
		showLoader();
		g_flag = 3;
		
		// 检索条件为空
		if ("" == $F('examine1Id') && 0 == $('sltCategoryA1').value && "" == $F('examine2Id') 
								  && 0 == $('sltCategoryB1').value && "" == $F('examine3Id') 
								  && 0 == $('sltCategoryC1').value) {
			// 隐藏加载动画
			hideLoader();
			MsgBox.message(getMessage('js.com.warning.0001', '检索条件'));
			return;
		}
		var url = 'k070011GetPostionExamineList.action';
		var pars = $('k070011PostionForm').serialize();
		$('oldK070011PostionForm').value = pars;
		new Ajax.Updater('divPosExamineList', url, {
			parameters: pars,
			method: 'post',
			onLoading: function(){
			},
			onSuccess: function(response){
			},
			onFailure: function(request){
				reportError();
			},
			onComplete: function(response) {
				var flg = checkException(response);
				if(!flg) {
					
					// 显示考试汇总信息
					$('divPosExamineList').removeClassName('none');
					
					// 重置列表颜色
					listColor('posSpecificTableList');	
					
					// 隐藏加载动画
					hideLoader();		
				}			
	
			}	
		});	
	}
}

/**
 * 取得名称和档次.
 */
function getExamineNameLevelCallback(strJson, resultlevelId, examineName, examineId) {
	if (!strJson.empty()) {
		var selectList = strJson.evalJSON();

		// 清空档次内容
		clearLevel(resultlevelId);
		optionIdPre = resultlevelId + '_';
		for (var i = 0, len = selectList.length; i < len; i++) {
			if ($(optionIdPre + i) == null) {
				$(resultlevelId).insert({
					bottom: new Element('option', {
						'id': optionIdPre + i
					})
				});
			}
			$(optionIdPre + i).value = selectList[i]['diffNo'];
			$(optionIdPre + i).update(selectList[i]['diffName']);
		}
		$(examineName).update(selectList[0]['typeName']);
		$(resultlevelId).removeClassName('none');
	} else {
		MsgBox.message(getMessage('js.tt.info.JYT14', '考试名称和档次'));
		$(examineId).focus();
	}
}

/**
 * 检索条件时1时追加按钮.
 */
function addSearchA() {
	$('divSearch2').removeClassName('none');
	$('divRelation').removeClassName('none');
	$('addButtonA').disable();
	$('addButtonB').enable();
	$('removeButtonB').enable();
	$('examine2Id').focus();	
}

/**
 * 检索条件时2时追加按钮.
 */
function addSearchB() {
	$('divSearch3').removeClassName('none');
	$('addButtonB').disable();
	$('removeButtonB').disable();
	$('examine3Id').focus();	
}

/**
 * 检索条件时2时移除按钮.
 */
function removeSearchB() {
	$('addButtonA').enable();
	$('divSearch2').addClassName('none');
	$('resultlevel2Id').addClassName('none');
	$('divRelation').addClassName('none');
	$('examine2Id').clear();
	$('examine2Name').update();	
	clearLevel('resultlevel2Id');
	
	// 清空考试分类
	clearCategory('K070011', 'sltCategoryB1', 'sltCategoryB2', 'sltCategoryB3');
	
	//  设置单选按钮
	$('postionRadioValue1').checked='checked';	
	
	// 考试ID获取焦点
	$('examine1Id').focus();
}

/**
 * 检索条件时3时移除按钮.
 */
function removeSearchC(){
	$('examine3Id').clear();
	$('addButtonB').enable();
	$('removeButtonB').enable();
	$('divSearch3').addClassName('none');
	$('resultlevel3Id').addClassName('none');
	$('examine3Name').update();	
	clearLevel('resultlevel3Id');
	
	// 清空考试分类
	clearCategory('K070011', 'sltCategoryC1', 'sltCategoryC2', 'sltCategoryC3');
	
	//  设置单选按钮
	$('postionRadioValue1').checked='checked';	
	
	// 考试ID获取焦点
	$('examine2Id').focus();
}

/**
 * 定位查询的清空按钮.
 */
function clearAll() {
	if (window.confirm(getMessage('js.tt.warn.JYW13'))) {
	
		// 清空检索条件是1信息
		$('examine1Id').clear();
		$('examine1Name').update();
		$('resultlevel1Id').addClassName('none');
		$('addButtonA').enable();
		clearLevel('resultlevel1Id');
		
		// 清空考试分类
		clearCategory('K070011', 'sltCategoryA1', 'sltCategoryA2', 'sltCategoryA3');
		
		// 清空检索条件是2信息	
		$('divSearch2').addClassName('none');
		$('examine2Id').clear();
		$('examine2Name').update();
		$('divRelation').addClassName('none');
		clearLevel('resultlevel2Id');
		
		// 清空考试分类
		clearCategory('K070011', 'sltCategoryB1', 'sltCategoryB2', 'sltCategoryB3');
		
		// 清空检索条件是1信息
		$('examine3Id').clear();
		$('divSearch3').addClassName('none');
		$('examine3Name').update();
		clearLevel('resultlevel3Id');
		
		// 清空考试分类
		clearCategory('K070011', 'sltCategoryC1', 'sltCategoryC2', 'sltCategoryC3');
		
		// 考试ID获取焦点
		$('examine1Id').focus();
		
		//  设置单选按钮
		$('postionRadioValue1').checked = 'checked';
		
		// 去掉错误信息
		removeFieldError('examine1Id');
		removeFieldError('examine2Id');	
		removeFieldError('examine3Id');		
		
		// 隐藏后台校验的错误
		$('errorMessage2').hide();
	}		
}

/**
 * 清空档次内容.
 */
function clearLevel(resultlevelId){
	var selectElement = $(resultlevelId);
	var options;
	if (selectElement != null) {
		options = selectElement.childElements();
		if (options.length > 0) {
			for (var i = 0, len = options.length; i < len; i++) {
				options[i].remove();
			}
		}
	}	
}

/**
 * 系统错误处理.
 */
function reportError(){
	MsgBox.error(getMessage('js.com.error.0001'));
}
