/*
 * @(#)j030121.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
 */
/**
 * 新建练习.
 *
 */
function createNewTest(){
    // 显示加载动画
    showLoader();
    //参数序列化
    var pars = $('creatNewTestForm').serialize();
    
    //时间戳
    pars = addStamp(pars);
    
    var url = 'j030121CreateNewPractice.action';
    new Ajax.Updater('div_update_list', url, {
        method: 'get',
        parameters: pars,
        onSuccess: function(response){
        },
        onFailure: reportError,
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
                // 隐藏加载动画
                hideLoader();
            }
        }
        
    });
    
}

/**
 * 删除练习.
 * @param {String} paperId 试卷ID
 * @param {String} paperVersionNo 试卷版本号
 */
function deleteTest(paperId, paperVersionNo){

    if (confirm(getMessage('js.tt.warn.JYW07'))) {
        // 显示加载动画
        showLoader();
        pars = 'paperId=' + paperId +
        '&paperVersionNo=' +
        paperVersionNo +
        '&bookId=' +
        $('bookId').value +
        '&editNo=' +
        $('editNo').value;
        
        //时间戳
        pars = addStamp(pars);
        var url = 'j030121DeletePractice.action?';
        new Ajax.Updater('div_update_list', url, {
            method: 'get',
            parameters: pars,
            onSuccess: function(response){
            },
            onFailure: reportError,
            onComplete: function(response){
                var flg = checkException(response);
                if (!flg) {
                    // 隐藏加载动画
                    hideLoader();
                }
            }
        });
        
    }
}

/**
 * 编辑练习.
 * @param {String} paperId 试卷ID
 */
function editTest(paperId){

    //检查教材状态
    var url = 'j030121EditPractice.action?paperId=' + paperId +
    '&bookId=' +
    $('bookId').value +
    '&editNo=' +
    $('editNo').value;
    $('TestForm').action = url;
    $('TestForm').submit();
    
    //弹出试卷编辑画面
}

/**
 * 引用练习.
 * @param {String} paperId 试卷ID
 * @param {String} paperTitle 试卷标题
 *
 */
function recommendTest(paperId, paperTitle){

    //设置返回值
    var reParameter = "<a href='../../tt/testing/k060031InitPracticeMode?ifViewChange=0&paperId=" + paperId +
    "' target='_blank'>";
    
    
    //链接文字是否自定义
    if (parent.$('linkWord').value == null || parent.$('linkWord').value == '') {
    
        reParameter = reParameter + paperTitle;
    }
    else {
    
        reParameter = reParameter + parent.$('linkWord').value;
    }
    
    reParameter = reParameter + '</a>';
    
    //提交返回值
    parent.window.returnValue = reParameter;
    //关闭画面
    parent.close();
    
}

