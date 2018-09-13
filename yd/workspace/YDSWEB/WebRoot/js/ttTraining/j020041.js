/*
 * @(#)c020041.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 课程详细（用户）JavaScript.
 *
 * @author chenjunshuai
 * @version 1.0
 */
/**
 * 删除课程信息.
 */
function courseDel(){
    if (confirm(getMessage('js.tt.warn.JYW07'))) {
        var courseId = $F('courseId');
        
        // 执行删除操作
        var url = 'j020041DelCourseDetail.action?courseId =' + encodeURI(courseId);
        $('j020041form').action = url;
        // 显示加载动画
        showLoader();
        $('j020041form').submit();
    }
}

/**
 * 更新课程关注度.
 */
function changeAttention(){
    // 显示加载动画
    showLoader();
    var attentionFlag = $('attentionList.diffNo').value;
    var courseId = $F('courseId');
    var url = 'j020041UpdateAttention.action';
    var pars = 'attentionFlag = ' + encodeURI(attentionFlag) + '&' + 'courseId =' + encodeURI(courseId);
    pars = addStamp(pars);
    new Ajax.Request(url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
            checkException(response);
            // 隐藏加载动画
            hideLoader();
        },
        onFailure: reportError
    });
}
