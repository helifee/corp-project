/*
 * @(#)j020021.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 课程检索一览JavaScript.
 *
 * @author liuyiwei
 * @version 1.0
 */
/**
 * 图标提示文字枚举.
 */
var IconMsgEnum = {
    Show: '展开',
    Hide: '收缩'
};

var regexDateFormat = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$';

/**
 * 画面onload.
 */
function initForm(){
    // 显示加载动画
    showLoader();
    // 伸缩判断
    $('courseInfoIcon').title = IconMsgEnum.Show;
    
    // 重置列表颜色
    listColor('table_courseEditableList');
    
    //注册分类
    initCategoryList('j020021', '0', 1, true, '0', 'editableCategory1', 'editableCategory2', 'editableCategory3', '1', '1');
    
    //注册员工ID和姓名控件
    initTtJsNameFilter("editorId", "editorName");
    
    // 画面风格统一，精简画面项目后删除相关处理方法 2010/08/17 sundefu comment
    /*
     //$('confirmIcon').title = IconMsgEnum.Show;
     //$('paticipateIcon').title = IconMsgEnum.Show;
     //listColor('table_courseConfirmableList');
     //listColor('table_coursePaticipateList');
     //initCategoryList('j020021', '0', 1, true, '0', 'confirmableCategory1', 'confirmableCategory2', 'confirmableCategory3', '1', '1');
     // 一览没有数据时，隐藏对应的课程
     if ($('table_courseEditableList').innerHTML.empty()) {
     $('courseEditable').toggle();
     $('editIcon').removeClassName('opt_Plus').addClassName('opt_Add');
     $('editIcon').title = IconMsgEnum.Show;
     }
     if ($('table_courseConfirmableList').innerHTML.empty()) {
     $('courseConfirmable').toggle();
     $('confirmIcon').removeClassName('opt_Plus').addClassName('opt_Add');
     $('confirmIcon').title = IconMsgEnum.Show;
     }
     if ($('table_coursePaticipateList').innerHTML.empty()) {
     $('coursePaticipate').toggle();
     $('paticipateIcon').removeClassName('opt_Plus').addClassName('opt_Add');
     $('paticipateIcon').title = IconMsgEnum.Show;
     }
     // 更新日期from校验
     addRegexCheck($('updateTimeFrom'), getMessage('js.com.warning.0002', '更新日期'), regexDateFormat);
     
     // 更新日期to校验
     addRegexCheck($('updateTimeTo'), getMessage('js.com.warning.0002', '更新日期'), regexDateFormat);
     
     // 更新日期from与更新日期to校验
     addCustomCheck($('updateTimeFrom'), getMessage('js.com.warning.0006'), 'updateTimeFrom', function compareInputTime(){
     if (compareTime($('updateTimeFrom'), $('updateTimeTo'))) {
     removeFieldError($('updateTimeTo'));
     }
     return compareTime($('updateTimeFrom'), $('updateTimeTo'));
     });
     
     addCustomCheck($('updateTimeTo'), getMessage('js.com.warning.0006'), 'updateTimeTo', function compareInputTime(){
     if (compareTime($('updateTimeFrom'), $('updateTimeTo'))) {
     removeFieldError($('updateTimeFrom'));
     }
     return compareTime($('updateTimeFrom'), $('updateTimeTo'));
     });
     */
    // 隐藏加载动画
    hideLoader();
}

/**
 * 教材详细信息是否可见.
 */
function resize(){
    $('courseEditable').toggle();
    
    // 更改图标及提示文字
    if ($('courseInfoIcon').hasClassName('opt_FillRight')) {
        $('courseInfoIcon').removeClassName('opt_FillRight').addClassName('opt_FillDown');
        $('courseInfoIcon').title = IconMsgEnum.Hide;
    }
    else {
        $('courseInfoIcon').removeClassName('opt_FillDown').addClassName('opt_FillRight');
        $('courseInfoIcon').title = IconMsgEnum.Show;
    }
}

/**
 * 可编辑课程【检索】按钮事件.
 */
function searchEditableCourse(){

    // 画面输入校验
    if (checkForm('courseEditableInfoForm')) {
        // 显示加载动画
        showLoader();
        //检索数据并刷新信息显示列表
        var url = 'j020021GetEditableCourseInfo.action';
        var pars = $('courseEditableInfoForm').serialize();
		$('oldParam').value = pars;
        pars = addStamp(pars);
        
        new Ajax.Updater('div_editable_course_list', url, {
            parameters: pars,
            method: 'get',
            onSuccess: function(request){
            },
            onFailure: function(request){
                reportError();
            },
            onComplete: function(response){
                var flg = checkException(response);
                if (!flg) {
                    // 重置列表颜色
                    listColor('table_courseEditableList');
                    // 隐藏加载动画
                    hideLoader();
                }
            }
        });
    }
}

/**
 * 分页时使用的ajax提交函数
 * @param {pageUrl} 页面链接
 * @param {pageNumber} 页码
 */
function pagerCommonTag(pageUrl, pageNumber){
    // 显示加载动画
    showLoader();
    var pars = $('oldParam').value;
    var url = pageUrl + "&pageNumber=" + pageNumber;
    new Ajax.Updater('div_editable_course_list', url, {
        method: 'post',
        parameters: pars,
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
                listColor('table_courseEditableList');
                if ($('errorMessage').innerHTML == '') {
                    $('errorMessage').hide();
                }
                else {
                    $('errorMessage').show();
                }
                // 隐藏加载动画
                hideLoader();
            }
        }
    });
}

/**
 * 可审批课程【检索】按钮事件.
 */
function searchConfirmableCourse(){

    // 画面输入校验
    if (checkForm('courseConfirmableInfoForm')) {
        // 显示加载动画
        showLoader();
        //检索数据并刷新信息显示列表
        var url = 'j020021GetConfirmableCourseInfo.action';
        var pars = $('courseConfirmableInfoForm').serialize();
        pars = addStamp(pars);
        
        new Ajax.Updater('div_confirmable_course_list', url, {
            parameters: pars,
            method: 'get',
            onSuccess: function(request){
            },
            onFailure: function(request){
                reportError();
            },
            onComplete: function(response){
                var flg = checkException(response);
                if (!flg) {
                    // 重置列表颜色
                    listColor('table_courseConfirmableList');
                    // 隐藏加载动画
                    hideLoader();
                }
            }
        });
    }
}

/**
 * 参与课程【检索】按钮事件.
 */
function searchPaticipateCourse(){

    // 画面输入校验
    if (checkForm('coursePaticipateInfoForm')) {
        // 显示加载动画
        showLoader();
        //检索数据并刷新信息显示列表
        var url = 'j020021GetPaticipateCourseInfo.action';
        var pars = $('coursePaticipateInfoForm').serialize();
        pars = addStamp(pars);
        
        new Ajax.Updater('div_paticipate_course_list', url, {
            parameters: pars,
            method: 'get',
            onSuccess: function(request){
            },
            onFailure: function(request){
                reportError();
            },
            onComplete: function(response){
            
                //Ajax异常检查	true:异常	false:正常
                var flg = checkException(response);
                if (!flg) {
                    // 重置列表颜色
                    listColor('table_coursePaticipateList');
                    // 隐藏加载动画
                    hideLoader();
                }
            }
        });
    }
}

/**
 * 新建课程.
 */
function creatCourse(){
    //j020011
    var url = 'j020011InitNewCourseMode.action';
    $('courseEditableInfoForm').action = url;
    // 显示加载动画
    showLoader();
    $('courseEditableInfoForm').submit();
    
}

/**
 * 清空检索条件.
 */
function clearSearchCondition(num){
    // 确认清空
    if (!confirm(getMessage('js.tt.warn.JYW13'))) {
        return;
    }
    if (num == 1) {
        $('courseEditableInfoForm').reset();
        //注册分类
        initCategoryList('j020021', '0', 1, true, '0', 'editableCategory1', 'editableCategory2', 'editableCategory3', '1', '1');
        
    }
    else 
        if (num == 2) {
            $('courseConfirmableInfoForm').reset();
            //注册分类
            initCategoryList('j020021', '0', 1, true, '0', 'confirmableCategory1', 'confirmableCategory2', 'confirmableCategory3', '1', '1');
        }
        else 
            if (num == 3) {
                $('coursePaticipateInfoForm').reset();
            }
}
