/*
 * @(#)j030031.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 教材内容浏览JavaScript.
 *
 * @author xinzhipeng
 * @version 1.0
 */
/**
 * 画面打开模式.
 */
var openMode = '0';
/**
 * 画面初始化控制编辑
 */
function initForm(mode){
    if (1 != mode) {
        openMode = '1';
    }
    if (mode == 3) {
        if (2 != $F('bookStatusHidden')) {
            $('btnRatifyBook').disable();
            $('btnRefuseBook').disable();
            $('txtRefuseReason').readOnly = true;
        }
    }
}

/**
 * 删除教材.
 */
function deleteBook(){

    var callScreenId = $F('callScreenIdHidden');
    
    if (confirm(getMessage('js.tt.warn.JYW07'))) {
        // 显示加载动画
        showLoader();
        var url = 'j030031DeleteBook.action';
        
        var pars = 'bookInfo.bookId=' + $('bookInfo.bookId').innerHTML;
        pars = pars + '&mode=' + encodeURI($F('mode'));
        pars = addStamp(pars);
        
        var myAjax = new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
            onComplete: function(request){
                var flg = checkException(request);
                if (!flg) {
                    if ('j020031.jsp' == callScreenId) {
                        window.location.href = 'j020031InitEditMode.action';
                    }
                    else {
                        window.location.href = 'j030021InitShowListMode.action?reloadFlg=' + '1';
                    }
                }
                // 隐藏加载动画
                hideLoader();
            }
        });
    }
}

/**
 * 教材批准.
 */
function ratifyBook(){
    if (confirm(getMessage('js.tt.warn.JYW16'))) {
    
        var tmp1 = $('bookInfo.bookId').innerHTML;
        var url = 'j030031RatifyBook.action?bookInfo.bookId=' + tmp1;
        
        $('mainForm').action = url;
        // 显示加载动画
        showLoader();
        $('mainForm').submit();
    }
}

/**
 * 教材不批准.
 */
function refuseBook(){
    // 自动校验
    if (!checkForm('mainForm')) 
        return;
    
    
    if (confirm(getMessage('js.tt.warn.JYW06'))) {
        var tmp2 = $('bookStatusHidden').value;
        var url = 'j030031RefuseBook.action?bookStatusHidden=' + tmp2 +
        "&" +
        dataSerialize($('mainForm'));
        
        $('mainForm').action = url;
        // 显示加载动画
        showLoader();
        $('mainForm').submit();
    }
}

/**
 * 教材内容查看（由打开按钮打开）.
 */
function openBookContent(){
    var bookId = $('bookInfo.bookId').innerHTML;
    var editNo = $F('editNoHidden');
    var chapterNo = $F('chapterNoHidden');
    var url = 'j030071InitByContentsMode.action?bookId=' + bookId + '&chapterNo=' + chapterNo + '&editNo=' + editNo;
    if ('1' == openMode) {
        url = 'j030071InitByContentsMode.action?bookId=' + bookId + '&chapterNo=' + chapterNo + '&editNo=' + editNo + '&openMode=1';
    }
    window.open(url, 'newwindow');
}

/**
 * 教材内容查看（由树状列表打开）.
 */
function getContentByChapterNo(chapterNo){
    var bookId = $('bookInfo.bookId').innerHTML;
    var editNo = $F('editNoHidden');
    var url = 'j030071InitByContentsMode.action?bookId=' + bookId + '&chapterNo=' + chapterNo + '&editNo=' + editNo;
    if ('1' == openMode) {
        url = 'j030071InitByContentsMode.action?bookId=' + bookId + '&chapterNo=' + chapterNo + '&editNo=' + editNo + '&openMode=1';
    }
    window.open(url, 'newwindow');
}

