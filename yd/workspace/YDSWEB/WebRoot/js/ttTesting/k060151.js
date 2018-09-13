/*
 * @(#)userRoleMgr.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
 */
/**
 * @fileoverview 考试试卷生成一览JavaScript.
 *
 * @author shiyanyan
 * @version 1.0
 */
/**
 * +操作.
 * @param {int} i 试卷记录.
 */
function addPaperNum(i){

    // 未分卷子人数 =0时
    if ($('noPaperNum').innerHTML <= 0) {
    
        return false;
    }
    
    // 未分卷子人数减1
    $('noPaperNum').innerHTML = Number($('noPaperNum').innerHTML) - 1;
    
    // 张数加1
    $('paperNumId' + i).innerHTML = Number($('paperNumId' + i).innerHTML) + 1;
    
    // 隐藏项目张数加1
    $('paperNumIdHide' + i).value = $('paperNumId' + i).innerHTML;
    
}

/**
 * -操作.
 * @param {int} i 试卷记录.
 */
function mulPaperNum(i){

    // 张数 =0时
    if ($('paperNumId' + i).innerHTML <= 0) {
    
        return false;
    }
    
    // 未分卷子人数加1
    $('noPaperNum').innerHTML = Number($('noPaperNum').innerHTML) + 1;
    
    // 张数减1
    $('paperNumId' + i).innerHTML = Number($('paperNumId' + i).innerHTML) - 1;
    
    // 隐藏项目张数减1
    $('paperNumIdHide' + i).value = $('paperNumId' + i).innerHTML;
    
}

/**
 * 删除操作.
 */
function deleteline(i){

    if (!confirm(getMessage('js.tt.warn.JYW07'))) {
        return;
    }
    
    // 增加未分卷子人数
    $('noPaperNum').innerHTML = Number($('noPaperNum').innerHTML) + Number($('paperNumId' + i).innerHTML);
    
    // 指定行设定
    var nowLine = $('paperNumId' + i).up(1);
    
    // 指定行删除				
    nowLine.remove();
    
}

/**
 * 重新生成.
 */
function reCreate(index){

    // 显示加载动画
    showLoader();
    
    var url = "k060151GetQuestionsAgain";
    var pars = 'picPaperInfo.examineId=' + $F('examineId' + index) + '&' +
    'picPaperInfo.paperNo=' +
    $F('paperNo' + index) +
    '&' +
    'picPaperInfo.paperId=' +
    $F('paperId' + index) +
    '&' +
    'picPaperInfo.paperVersionNo=' +
    $F('paperVersionNo' + index) +
    '&' +
    'picPaperInfo.paperTitle=' +
    $F('paperTitle' + index) +
    '&' +
    'picPaperInfo.paperDescription=' +
    $F('paperDescription' + index) +
    '&' +
    'picPaperInfo.bigquestionNum=' +
    $F('bigquestionNum' + index) +
    '&' +
    'picPaperInfo.randomBigquestionFlg=1';
    
    pars = addStamp(pars);
    new Ajax.Request(url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
        
            var flg = checkException(response);
            if (!flg) {
                showOpTip(getMessage('js.tt.info.GTT02'));
            }
            // 隐藏加载动画
            hideLoader();
        }
    });
    
}

/**
 * 确定按钮.
 */
function updatePaperDetails(){

    if ($('noPaperNum').innerHTML != 0) {
    
        alert(getMessage('js.tt.error.KSE76'));
        return;
    }
    
    // 显示加载动画
    showLoader();
    $('paperListForm').submit();
    
}






