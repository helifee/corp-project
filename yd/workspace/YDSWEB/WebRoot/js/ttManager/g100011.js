/*
 * @(#)g010011.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理子系统
 */
/**
 * @fileoverview 主画面JavaScript.
 *
 * @author liuyiwei
 * @version 1.0
 */
var regexDateFormat = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$';
/**
 * 画面onload.
 */
function initForm(){

    // 重置列表颜色
  //  listColor('table_courseInfoList');
    
    //注册分类
  //  initCategoryList('g100011', '0', 1, true, '0', 'courseCategory1', 'courseCategory2', 'courseCategory3', '1', '1');
  //  initCategoryList('g100011', '0', 1, true, '0', 'examineCategory1', 'examineCategory2', 'examineCategory3', '1', '1');
    
}

/**
* 画面onload.(课程搜索）
*/
function initSearchCourseInfo(){
	
   //注册分类
   initCategoryList('g100011', '0', 1, true, '0', 'courseCategory1', 'courseCategory2', 'courseCategory3', '1', '1');
   
 }

/**
* 画面onload.(考试搜索）
*/
function initSearchExamineInfo(){
	
   //注册分类
   initCategoryList('g100011', '0', 1, true, '0', 'examineCategory1', 'examineCategory2', 'examineCategory3', '1', '1');
   
   // 考试时间from校验
   addRegexCheck($('examineTimeFrom'), getMessage('js.com.warning.0002', '开始日期'), regexDateFormat);
   
   // 考试时间to校验
   addRegexCheck($('examineTimeTo'), getMessage('js.com.warning.0002', '结束日期'), regexDateFormat);
   
   // 考试时间from与考试时间to校验 
   addCustomCheck($('examineTimeFrom'), getMessage('js.com.warning.0006'), 'examineTimeFrom', function compareInputTime(){
       if (compareTime($('examineTimeFrom'), $('examineTimeTo'))) {
           removeFieldError($('examineTimeTo'));
       }
       return compareTime($('examineTimeFrom'), $('examineTimeTo'));
   });
   
   addCustomCheck($('examineTimeTo'), getMessage('js.com.warning.0006'), 'examineTimeTo', function compareInputTime(){
       if (compareTime($('examineTimeFrom'), $('examineTimeTo'))) {
           removeFieldError($('examineTimeFrom'));
       }
       return compareTime($('examineTimeFrom'), $('examineTimeTo'));
   });
   
 }

/**
 * 实现课程一览分页提交.
 */
function pagerCommonTag(pageUrl, pageNumber){

    //从隐藏控件中取出上次使用的检索条件
    var pars = $('oldParam').value;
    
    // 显示加载动画
	showLoader();
	
    //var pars = $('courseInfoForm').serialize() + '&attentionFlag=' + $('attentionFlag').value;
    //pars = addStamp(pars);
    var url = pageUrl + "&pageNumber=" + pageNumber;
    new Ajax.Updater('div_courseInfoList', url, {
        parameters: pars,
        onLoading: function(){
        },
        onSuccess: function(response){
        },
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
                //listColor('table_courseInfoList');
                
                // 隐藏加载动画
                hideLoader();
            }
        }
    });
}

/**
 * 检索课程一览.
 */
function searchCourseInfo(){

    // 画面输入校验
    if (checkForm('courseInfoForm')) {
    
        // 显示加载动画
    	showLoader();
		
		// 设置是否选修和关注度
    	setNecAtt();
		
		// 参数
        var pars = "courseInfo.courseName="+encodeURI($('courseName').value)+
					"&courseInfo.category1Id="+$('courseCategory1').value+
					"&courseInfo.category2Id="+$('courseCategory2').value+
					"&courseInfo.category3Id="+$('courseCategory3').value+
					"&courseInfo.necessaryFlagList[0]="+$('courseInfo.necessaryFlagList[0]').value+
					"&courseInfo.necessaryFlagList[1]="+$('courseInfo.necessaryFlagList[1]').value+
					"&courseInfo.attentionFlagList[0]="+$('courseInfo.attentionFlagList[0]').value+
					"&courseInfo.attentionFlagList[1]="+$('courseInfo.attentionFlagList[1]').value;
        //把检索条件所在的form串行化后，设到隐藏控件oldParam中，
        //然后使用oldParam的值，进行检索。（点击下一页的时候也是用这个隐藏控件的值）
        $('oldParam').value = pars;
        var url = "g100011SearchCourseInfoList.action";
        new Ajax.Updater('div_courseInfoList', url, {
            parameters: pars,
            onLoading: function(){
            },
            onSuccess: function(response){
            },
            onComplete: function(response){
                var flg = checkException(response);
                if (!flg) {
                    //listColor('table_courseInfoList');
                    
                    // 隐藏加载动画
                    hideLoader();
                }
            }
        });
    }
}

/**
 * 实现考试一览分页提交.
 */
function pagerCommonTag1(pageUrl, pageNumber){
	 
    // 显示加载动画
	showLoader();
		
    //从隐藏控件中取出上次使用的检索条件
    var pars = $('oldParam1').value;
    //var pars = $('examineInfoForm').serialize() + '&examineStatus=' + $('examineStatus').value;
    var url = pageUrl + "&pageNumber=" + pageNumber;
    new Ajax.Updater('div_examineInfoList', url, {
        parameters: pars,
        onLoading: function(){
        },
        onSuccess: function(response){
        },
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
 //               listColor('table_examineInfoList');
                
                // 隐藏加载动画
                hideLoader();
            }
        }
    });
}

/**
 * 检索考试一览.
 */
function searchExamineInfo(){

    // 画面输入校验
    if (checkForm('examineInfoForm')) {
    
        // 显示加载动画
    	showLoader();
		
		// 设置考试状态
    	setExamineStatus();
        var pars = $('examineInfoForm').serialize()+
					"&examineInfo.mustExamineFlgList[0]="+$('examineInfo.mustExamineFlgList[0]').value+
					"&examineInfo.mustExamineFlgList[1]="+$('examineInfo.mustExamineFlgList[1]').value+
					"&examineInfo.exaAttentionFlagList[0]="+$('examineInfo.exaAttentionFlagList[0]').value+
					"&examineInfo.exaAttentionFlagList[1]="+$('examineInfo.exaAttentionFlagList[1]').value+
					"&examineInfo.examineStatusList[0]="+$('examineInfo.examineStatusList[0]').value+
					"&examineInfo.examineStatusList[1]="+$('examineInfo.examineStatusList[1]').value+
					"&examineInfo.examineStatusList[2]="+$('examineInfo.examineStatusList[2]').value+
					"&examineInfo.examineStatusList[3]="+$('examineInfo.examineStatusList[3]').value+
					"&examineInfo.examineStatusList[4]="+$('examineInfo.examineStatusList[4]').value+
					"&examineInfo.examineStatusList[5]="+$('examineInfo.examineStatusList[5]').value+
					"&examineInfo.examineStatusList[6]="+$('examineInfo.examineStatusList[6]').value+
					"&examineInfo.examineStatusList[7]="+$('examineInfo.examineStatusList[7]').value;
        $('oldParam1').value = pars;
        var url = "g100011SearchExamineInfoList.action";
        new Ajax.Updater('div_examineInfoList', url, {
            parameters: pars,
            onLoading: function(){
            },
            onSuccess: function(response){
            },
            onComplete: function(response){
                var flg = checkException(response);
                if (!flg) {
                    //listColor('table_examineInfoList');
                    
                    // 隐藏加载动画
                    hideLoader();
                }
            }
        });
    }
}

/**
 * 删除书签.
 * @param {String} bookId 教材ID.
 */
function delBookMark(bookId){

    if (confirm(getMessage('js.com.info.0001'))) {
        var url = 'g100011DelBookMark.action';
        var pars = 'bookId=' + bookId;
        pars = addStamp(pars);
        new Ajax.Updater('div_book_mark_list', url, {
            method: 'post',
            parameters: pars,
            onSuccess: function(request){
            },
            onFailure: function(request){
                reportError();
            },
            onComplete: function(request){
                checkException(request);
            }
        });
    }
}

/**
 * 提醒信息更新处理.
 * @param {String} informationId 消息ID.
 * @param {String} redirectUrl 消息URL.
 */
function updateLoseTime(redirectUrl, informationId){

    var pars = 'informationId=' + informationId;
    pars = addStamp(pars);
    
    redirectUrl = $('basePathHid').value + redirectUrl;
    var url = 'g100011UpdateLostTime.action';
    new Ajax.Request(url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
                //跳转页面
                window.location.href = redirectUrl;
            }
            
        },
        onFailure: reportError
    });
}

/**
 * 无视提醒信息.
 * @param {String} linkElem 时间触发link.
 * @param {String} informationId 消息ID.
 */
function ignoreInfo(linkElem, informationId){
	
    var pars = 'informationId=' + informationId;
    pars = addStamp(pars);
    
    var url = 'g100011UpdateLostTime.action';
    new Ajax.Request(url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
            var flg = checkException(response);
			
			if (!flg) {
                $(linkElem).up().previous().remove();
				$(linkElem).up().remove();
            }
        }
		
    });
}


/** 
 * 权限申请初始化.
 */
function initPermRequestForm(){

    //注册分类
    initCategoryList('permInfoDiv', '0', 1, true, '1', 'category1', 'category2', 'category3', '1', '1');
    
    // 开始日期校验
    addRegexCheck($('startTime'), getMessage('js.com.warning.0002', '开始日期'), regexDateFormat);
    
    // 结束日期校验
    addRegexCheck($('endTime'), getMessage('js.com.warning.0002', '结束日期'), regexDateFormat);
    
    // 开始与结束日期校验 
    addCustomCheck($('startTime'), getMessage('js.com.warning.0006'), 'startTime', function compareInputTime(){
        if (compareTime($('startTime'), $('endTime'))) {
            removeFieldError($('endTime'));
        }
        return compareTime($('startTime'), $('endTime'));
    });
    
    addCustomCheck($('endTime'), getMessage('js.com.warning.0006'), 'endTime', function compareInputTime(){
        if (compareTime($('startTime'), $('endTime'))) {
            removeFieldError($('startTime'));
        }
        return compareTime($('startTime'), $('endTime'));
    });
}

/**
 * 权限申请画面确认按钮.
 */
function submitPermRequest(){

    //$('permInfoForm').action = $('permInfoForm').action + '?permRequestInfo.authorityId=' + $('permRqstSLT').value;
    
    if (checkForm('permInfoForm')) {
        $('permInfoForm').submit();
    }
}

/**
 * 非必修是否选中.
 */
function selNecessary(){
	for (var i = 0; i < 2; i++) {
		if ($('attentionFlagListNew['+i+']').checked) {
			$('necessaryFlagList[1]').checked = true;
		}
	}
}

/**
 * 设置是否选修和关注度.
 */
function setNecAtt(){
	if ($('necessaryFlagList[0]').checked) {
		$('courseInfo.necessaryFlagList[0]').value= 1;
	} else {
		$('courseInfo.necessaryFlagList[0]').value= 0;
	}
	if ($('necessaryFlagList[1]').checked) {
		$('courseInfo.necessaryFlagList[1]').value= 2;
	} else {
		$('courseInfo.necessaryFlagList[1]').value= 0;
	}
	if ($('attentionFlagListNew[0]').checked) {
		$('courseInfo.attentionFlagList[0]').value= 1;
	} else {
		$('courseInfo.attentionFlagList[0]').value= 0;
	}
	if ($('attentionFlagListNew[1]').checked) {
		$('courseInfo.attentionFlagList[1]').value= 3;
	} else {
		$('courseInfo.attentionFlagList[1]').value= 0;
	}		
}

/**
 * 非考试是否选中.
 */
function selMustExamine() {
	for (var i = 0; i < 2; i++) {
		if ($('exaAttentionFlagList['+i+']').checked) {
			$('mustExamineFlgList[1]').checked = true;
		}
	}	
}
/**
 * 设置考试状态.
 */
function setExamineStatus(){
	setMustExamineAtt();
	if ($('exaStatusList[0]').checked) {
		$('examineInfo.examineStatusList[0]').value= 3;
	} else {
		$('examineInfo.examineStatusList[0]').value= 0;
	}
	if ($('exaStatusList[1]').checked) {
		$('examineInfo.examineStatusList[1]').value= 5;
	} else {
		$('examineInfo.examineStatusList[1]').value= 0;
	}
	if ($('exaStatusList[2]').checked) {
		$('examineInfo.examineStatusList[2]').value= 6;
	} else {
		$('examineInfo.examineStatusList[2]').value= 0;
	}
	if ($('exaStatusList[3]').checked) {
		$('examineInfo.examineStatusList[3]').value= 7;
	} else {
		$('examineInfo.examineStatusList[3]').value= 0;
	}
	if ($('exaStatusList[4]').checked) {
		$('examineInfo.examineStatusList[4]').value= 8;
	} else {
		$('examineInfo.examineStatusList[4]').value= 0;
	}
	if ($('exaStatusList[5]').checked) {
		$('examineInfo.examineStatusList[5]').value= 9;
	} else {
		$('examineInfo.examineStatusList[5]').value= 0;
	}
	if ($('exaStatusList[6]').checked) {
		$('examineInfo.examineStatusList[6]').value= 10;
	} else {
		$('examineInfo.examineStatusList[6]').value= 0;
	}
	if ($('exaStatusList[7]').checked) {
		$('examineInfo.examineStatusList[7]').value= 11;
	} else {
		$('examineInfo.examineStatusList[7]').value= 0;
	}							
}

/**
 * 设置是否必考和关注度.
 */
function setMustExamineAtt() {
	if ($('mustExamineFlgList[0]').checked) {
		$('examineInfo.mustExamineFlgList[0]').value= 2;
	} else {
		$('examineInfo.mustExamineFlgList[0]').value= 0;
	}
	if ($('mustExamineFlgList[1]').checked) {
		$('examineInfo.mustExamineFlgList[1]').value= 1;
	} else {
		$('examineInfo.mustExamineFlgList[1]').value= 0;
	}
	if ($('exaAttentionFlagList[0]').checked) {
		$('examineInfo.exaAttentionFlagList[0]').value= 1;
	} else {
		$('examineInfo.exaAttentionFlagList[0]').value= 0;
	}
	if ($('exaAttentionFlagList[1]').checked) {
		$('examineInfo.exaAttentionFlagList[1]').value= 3;
	} else {
		$('examineInfo.exaAttentionFlagList[1]').value= 0;
	}		
}

/**
 * 设置非必修不选中时候关注和不关注也不选中.
 */
function unselAttention(){
	if($('necessaryFlagList[1]').checked){
		$('necessaryFlagList[1]').unchecked;
	} else {
		for(var i=0; i <2; i++){
			$('attentionFlagListNew['+i+']').checked = false;
		}
	}
}

/**
 * 设置非必考不选中时候关注和不关注也不选中.
 */
function unselExAttention(){
	if($('mustExamineFlgList[1]').checked){
		$('mustExamineFlgList[1]').unchecked;
	} else {
		for(var i=0; i <2; i++){
			$('exaAttentionFlagList['+i+']').checked = false;
		}
	}
}
