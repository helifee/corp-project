/*
 * @(#)k060121.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 考试系统
 */
/**
 *  考试评分详细.
 *
 * @author liuyiwei
 * @version 1.0 2010/05/24
 */
/**
 * 画面onload.
 */
function initForm(){

}

var EnumMarkMode = {
    WHOLEPAPER: 1,
    SINGLEQUESTION: 2
};

/**
 * 保持checkBox状态的Hash
 */
var checkBoxStatus = new Hash();

/**
 * checkBox全选/全不选
 */
function selectAll(){
    // 取得一览件数
    var itemCounts = $('itemCount').value;
    if (!itemCounts.empty()) {
        if (itemCounts != 0) {
            for (var i = 0; i < itemCounts; i++) {
                var itemSelected = 'itemSelected' + i;
                var itemId = 'itemId' + i;
                // 设置checkBox选中状态
                $(itemSelected).checked = $('selectAll').checked;
                // 保持checkBox选中状态
                if ($('selectAll').checked) {
                    checkBoxStatus.set($(itemId).value, $(itemSelected).checked);
                }
                else {
                    checkBoxStatus.unset($(itemId).value);
                }
            }
        }
    }
}

/**
 * 点击选中/取消选中一条
 * @param {itemIndex} 点击的考试序号
 */
function selectOneItem(itemIndex){
    var itemSelected = 'itemSelected' + itemIndex;
    var itemId = 'itemId' + itemIndex;
    // 保持checkBox选中状态
    if ($(itemSelected).checked) {
        checkBoxStatus.set($(itemId).value, $(itemSelected).checked);
    }
    else {
        checkBoxStatus.unset($(itemId).value);
    }
}

/**
 * 【开始评分】链接相关处理
 * @param {Object} missionId
 */
function operation(missionId){
    // 考试Id
    var examineId = $('examineId').value;
    // 评分任务分配方式
    var operatMode = $('operatMode').value;
    var form = $('markTaskListForm');
    // 参数
    if (operatMode == EnumMarkMode.WHOLEPAPER) {
        var pars = '?markTaskList=' + encodeURIComponent(missionId) + '&markTaskAsignStyle=' + encodeURIComponent(operatMode);
        addStamp(pars);
        form.action = 'k060091InitMarkMode.action' + pars;
    }
    else 
        if (operatMode == EnumMarkMode.SINGLEQUESTION) {
            var pars = '?examId=' + examineId + '&markTaskList=' + missionId + '&markMode=' + operatMode;
            addStamp(pars);
            form.action = 'k060101InitMarkBySingle.action' + pars;
        }
    // 显示加载动画
    showLoader();
    // 提交表单
    form.submit();
}

/**
 * 整卷评分相关处理
 */
function markSelectedInWholeView(){
    startMark(EnumMarkMode.WHOLEPAPER, 'k060091InitMarkMode.action');
}

/**
 * 单题评分相关处理
 */
function markSelectedInSingleView(){
    startMark(EnumMarkMode.SINGLEQUESTION, 'k060101InitMarkBySingle.action');
}

/**
 * 开始评分
 * @param markMode 评分模式
 * @param url 评分画面url
 */
function startMark(markMode, url){
    var missionIds = checkBoxStatus.keys();
    if (missionIds.length == 0) {
        return;
    }
    else {
        var paramMissions = '';
        for (var i = 0; i < missionIds.length; i++) {
            paramMissions = paramMissions + '&markTaskList=' + encodeURIComponent(missionIds[i]);
        }
    }
    // 评分任务分配方式
    var operatMode = $('operatMode').value;
    var examineId = $('examineId').value;
    var form = $('markTaskListForm');
    // 整卷评分
    if (markMode == EnumMarkMode.WHOLEPAPER) {
        var pars = '?markTaskAsignStyle=' + encodeURIComponent(operatMode) + paramMissions;
    }
    else 
        if (markMode == EnumMarkMode.SINGLEQUESTION) {
            var pars = '?examId=' + examineId + paramMissions + '&markMode=' + operatMode;
        }
    form.action = url + pars;
    // 显示加载动画
    showLoader();
    // 提交表单
    form.submit();
}
