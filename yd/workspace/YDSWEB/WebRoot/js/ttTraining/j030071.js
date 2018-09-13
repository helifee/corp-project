/*
 * @(#)j030071.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 教材内容浏览JavaScript.
 *
 * @author yukunpeng
 * @version 1.0
 */
/**
 * 画面初始化控制编辑
 */
function initPage(showBookMark){
	
	// 火狐IE兼容
	firefoxIE();	
    if (!showBookMark) {
        $('btnsave').hide();
    }
    memuHide();
    pageCtrl();
}

/**
 * 隐藏 隐藏目录按钮 章节目录，
 * 显示 显示目录按钮，
 * 调整内容显示区域的宽度.
 */
function memuHide(){
    $('btnhidemenu').addClassName('none');
    $('divmenu').addClassName('none');
    $('divmenulist').addClassName('none');
    $('btnshowmenu').removeClassName('none');

}

/**
 * 隐藏 显示目录按钮 ，
 * 显示 隐藏目录按钮 章节目录，
 * 调整内容显示区域的宽度.
 */
function memuShow(){
    $('btnhidemenu').removeClassName('none');
    $('divmenu').removeClassName('none');
    $('divmenulist').removeClassName('none');
    $('btnshowmenu').addClassName('none');

}

/**
 * 1)上一页，下一页按钮 状态控制
 *   当前页数curOrder 为最大页数(totalPages)时，下一页不可用，
 *   当前页数curOrder 为最小页数(1)时，上一页不可用，
 *   当前页数curOrder在二者之间，2个按钮都可用;
 * 2)代码高亮表示.
 */
function pageCtrl(){
    //按钮控制
    var totalPage = Number($F('totalPages'));
    var curOrder = Number($F('curOrder'));
    if (totalPage <= 1) {
        $('btnprevpage').disable();
        $('btnnextpage').disable();
		$('btnprevpage2').disable();
        $('btnnextpage2').disable();
    }
    else {
        if (curOrder == 1) {
            $('btnprevpage').disable();
            $('btnnextpage').enable();
			$('btnprevpage2').disable();
        	$('btnnextpage2').enable();
        }
        if (curOrder > 1 && curOrder < totalPage) {
            $('btnprevpage').enable();
            $('btnnextpage').enable();
			$('btnprevpage2').enable();
        	$('btnnextpage2').enable();
        }
        if (curOrder == totalPage) {
            $('btnprevpage').enable();
            $('btnnextpage').disable();
			$('btnprevpage2').enable();
        	$('btnnextpage2').disable();
        }
    }
    //代码部分高亮显示
    SyntaxHighlighter.highlight();
}

/**
 * 编辑显示顺序，取得下一页内容
 */
function getNextChapter(){
    var showOrder = $F('curOrder');
    showOrder++;
    getContentByOrder(showOrder);
	scroll(0,0);
}

/**
 * 编辑显示顺序，取得上一页内容
 */
function getPrevChapter(){
    var showOrder = $F('curOrder');
    showOrder--;
    getContentByOrder(showOrder);
	scroll(0,0);
}

/**
 * 根据章节编号查找教材内容.
 * @param {int} chapterNo 章节编号.
 */
function getContentByChapterNo(chapterNo){
	// 火狐IE兼容
	firefoxIE();
    var bookId = $F('bookId');
    var editNo = $F('editNo');
    var url = 'j030071GetChapterContent.action';
    var pars = 'chapterInfo.bookId=' + encodeURI(bookId) + '&chapterInfo.editNo=' + encodeURI(editNo) + '&chapterInfo.chapterNo=' + encodeURI(chapterNo);
    addStamp(pars);
	new Ajax.Updater('divcontentview', url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
                pageCtrl();
                SyntaxHighlighter.highlight();
            }
        }
    });
	var url = 'j030071GetInnerIndex.action';
 	var pars = 'chapterInfo.bookId=' + encodeURI(bookId) + '&chapterInfo.editNo=' + encodeURI(editNo) + '&chapterInfo.chapterNo=' + encodeURI(chapterNo);
    addStamp(pars);
	new Ajax.Updater('divinnerlink', url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
                pageCtrl();
                SyntaxHighlighter.highlight();
            }
        }
    });
}

/**
 * 根据显示顺序查找教材内容.
 * @param {int} showOrder 显示顺序.
 */
function getContentByOrder(showOrder){

    //ajax操作时禁用 翻页按钮
    $('btnprevpage').disable();
    $('btnnextpage').disable();
    var bookId = $F('bookId');
    var editNo = $F('editNo');
    var url = 'j030071GetOrderContent.action';
    var pars = 'chapterInfo.bookId=' + encodeURI(bookId) + '&chapterInfo.editNo=' + encodeURI(editNo) + '&chapterInfo.showOrder=' + encodeURI(showOrder);
    addStamp(pars);
	new Ajax.Updater('divcontentview', url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
                pageCtrl();
                SyntaxHighlighter.highlight();
            }
        }
    });
}

/**
 * 保存进度
 * 添加或更新书签.
 */
function editBookMark(){

    var bookId = $F('bookId');
    var chapterNo = $F('chapterNo');
    var bookName = $('bookName').innerText;
    var chapterTitle = $('chapterTitle').innerText;
    
    var url = 'j030071EditBookmarker.action';
    var pars = 'chapterInfo.bookId=' + encodeURI(bookId) + '&chapterInfo.chapterNo=' + encodeURI(chapterNo) + '&bookName=' + encodeURI(bookName) + '&chapterInfo.chapterTitle=' + encodeURI(chapterTitle);
    new Ajax.Request(url, {
        method: 'get',
        parameters: pars,
        onComplete: function(response){
            checkException(response);
            
        },
        onSuccess: showOpTip(getMessage('js.tt.info.GTT02'))
    });
}
