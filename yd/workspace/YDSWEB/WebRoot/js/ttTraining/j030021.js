/*
 * @(#)j030021.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 教育考试系统（教育）
 */
/**
 * @fileoverview 教材一览画面JavaScript.
 *
 * @author sundefu
 * @version 1.0
 */
/**
 * 保持checkBox状态的Hash
 */
var g_checkBoxStatus = new Hash();
var g_mode;

var regexDateFormat = '^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$';
/**
 * 画面onload.
 */
function initForm(){
	
	// 火狐IE兼容
	firefoxIE();	
    // 显示加载动画
    showLoader();
    $('errorMessage').hide();
	// 创建者
    initTtJsNameFilter("createUserId", "createUserName");
	// 更新者
	initTtJsNameFilter("updateUserId", "updateUserName");
    //  分类初期化
    initCategoryList('j030021', '0', 1, true, '1', 'sltCategory11', 'sltCategory21', 'sltCategory31', '1', '1');
    // 刷新一览列表颜色
    listColor('pagerCommonList');
	
    // 统一画面风格 sundefu 2010/08/17 comment 	
    /*
     // 创建日期From校验
     addRegexCheck($('createTimeFrom'), getMessage('js.com.warning.0002', '创建日期'), regexDateFormat);
     // 创建日期To校验
     addRegexCheck($('createTimeTo'), getMessage('js.com.warning.0002', '创建日期'), regexDateFormat);
     // 开始与结束日期关联校验
     addCustomCheck($('createTimeFrom'), getMessage('js.com.warning.0006'), 'createTimeFrom', function compareInputTime(){
     if (compareTime($('createTimeFrom'), $('createTimeTo'))) {
     removeFieldError($('createTimeTo'));
     }
     return compareTime($('createTimeFrom'), $('createTimeTo'));
     });
     
     addCustomCheck($('createTimeTo'), getMessage('js.com.warning.0006'), 'createTimeTo', function compareInputTime(){
     if (compareTime($('createTimeFrom'), $('createTimeTo'))) {
     removeFieldError($('createTimeFrom'));
     }
     return compareTime($('createTimeFrom'), $('createTimeTo'));
     });
     */
    // 隐藏加载动画
    hideLoader();
}

/**
 * 图标提示文字枚举.
 */
var IconMsgEnum = {
    Show: '展开',
    Hide: '收缩'
};

/**
 * 教材详细信息是否可见.
 */
function resize(){
    $('bookInfo_basic').toggle();
    
    // 更改图标及提示文字
    if ($('bookInfoIcon').hasClassName('opt_FillRight')) {
        $('bookInfoIcon').removeClassName('opt_FillRight').addClassName('opt_FillDown');
        $('bookInfoIcon').title = IconMsgEnum.Hide;
    }
    else {
        $('bookInfoIcon').removeClassName('opt_FillDown').addClassName('opt_FillRight');
        $('bookInfoIcon').title = IconMsgEnum.Show;
    }
}

/**
 * 清空检索条件
 */
function clearAll(){

    // 确认清空
    if (!confirm(getMessage('js.tt.warn.JYW13'))) {
        return;
    }
    
    // 教材详细信息清空
    $('errorMessage').hide();
    $('searchForm').reset();
    //  分类初期化
    initCategoryList('j030021', '0', 1, true, '1', 'sltCategory11', 'sltCategory21', 'sltCategory31', '1', '1');
}

/**
 * checkBox全选/全不选
 */
function selectAllBooks(){
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
                    g_checkBoxStatus.set($(itemId).innerText, $(itemSelected).checked);
                }
                else {
                    g_checkBoxStatus.unset($(itemId).innerText);
                }
            }
        }
    }
}

/**
 * 设置checkBox状态
 */
function setCheckBoxStatus(){

    // 取得一览件数
    var Counts = $('itemCount');
    if (Counts != null) {
        var itemCounts = Counts.value;
        if (!itemCounts.empty()) {
            if (itemCounts != 0) {
                for (var i = 0; i < itemCounts; i++) {
                    var itemSelected = 'itemSelected' + i;
                    var itemId = 'itemId' + i;
                    $(itemSelected).checked = g_checkBoxStatus.get($(itemId).innerText);
                }
            }
        }
    }
}

/**
 * 点击选中/取消选中一条
 * @param {itemIndex} 点击的教材序号
 */
function selectOneItem(itemIndex){

    var itemSelected = 'itemSelected' + itemIndex;
    var itemId = 'itemId' + itemIndex;
    // 保持checkBox选中状态
    if ($(itemSelected).checked) {
        g_checkBoxStatus.set($(itemId).innerText, $(itemSelected).checked);
    }
    else {
        g_checkBoxStatus.unset($(itemId).innerText);
    }
}

/**
 * 教材一览检索.
 */
function getBookList(){
    // 画面输入校验
    if (!checkForm('searchForm')) {
        return;
    }
    // 显示加载动画
    showLoader();
    // 教材一览检索getBookListAction
    var url = 'j030021GetBookList.action';
    var pars = $('searchForm').serialize();
    pars = pars + '& j030021Info.category1Id=' + encodeURI($F('sltCategory11'));
    pars = pars + '& j030021Info.category2Id=' + encodeURI($F('sltCategory21'));
    pars = pars + '& j030021Info.category3Id=' + encodeURI($F('sltCategory31'));
    $('oldParam').value = pars;
	addStamp(pars);
    new Ajax.Updater('div_pagerCommonAjax', url, {
    
        method: 'post',
        parameters: pars,
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
                // 重置列表颜色
                listColor('pagerCommonList');
                // 隐藏加载动画
                hideLoader();
            }
            if ($('errorMessage').innerHTML == '') {
                $('errorMessage').hide();
            }
            else {
                $('errorMessage').show();
            }
        },
        onFailure: reportError
    });
}

/**
 * 分页时使用的ajax提交函数
 * @param {pageUrl} 页面链接
 * @param {pageNumber} 页码
 */
function pagerCommonTag(pageUrl, pageNumber){
    // 显示加载动画
    showLoader();
    g_mode = $('mode').value;
    var pars = $('oldParam').value;
    var url = pageUrl + "&pageNumber=" + pageNumber;
    new Ajax.Updater('div_pagerCommonAjax', url, {
        method: 'post',
        parameters: pars,
        onComplete: function(response){
            var flg = checkException(response);
            if (!flg) {
                listColor('pagerCommonList');
                if (g_mode == 1) {
                    setCheckBoxStatus();
                }
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
 * 加入课程.
 */
function addToCourse(){

    // 判断教材选中情况
    if (checkSelectedItem()) {
        // 将提交结果转化成JSON串
        var checkBoxStatusJson = g_checkBoxStatus.toJSON();
        // 设置Action
        var url = 'j030021AddToCourse';
        // 设置参数
        var pars = 'checkBoxStatusJson =' + checkBoxStatusJson;
        // Ajax提交请求
        var myAjax = new Ajax.Request(url, {
            method: 'post',
            parameters: pars,
            onComplete: function(request){
                var flg = checkException(request);
                if (!flg) {
                    if (request.responseText == 'success') {
                        window.opener.location.href = 'j020031InitEditMode?reloadFlg=2';
                        window.open('', '_self', '');
                        window.close();
                    }
                    else {
                        $('div_dept_main').update(request.responseText);
                    }
                }
            },
            onFailure: reportError
        });
    }
    else {
        MsgBox.message(getMessage('js.tt.info.KST11', '教材'));
    }
}

/**
 * 检查画面选中教材数量.
 */
function checkSelectedItem(){

    // 选择件数
    var selectedNum = g_checkBoxStatus.keys().length;
    
    // Hash中数据数量为0件时
    if (selectedNum == 0) {
        return false;
        // Hash中的教材checkBox选中状态都为false时	
    }
    else 
        if (g_checkBoxStatus.values().indexOf(true) == -1) {
            return false;
        }
    
    return true;
}

/**
 * 新建教材
 */
function createNewBook(){

    // 表单提交
    var url = 'j030011InitNewBookToBookMode.action';
    
    $('searchForm').action = url;
    // 显示加载动画
    showLoader();
    $('searchForm').submit();
}

/**
 * 教材ID链接
 * @param {clickedBookId} 点击的教材Id
 */
function openBook(clickedBookId){

    var bookId = encodeURI(clickedBookId);
    // 弹出教材详细画面
    window.open('j030031InitManageMode.action?bookId=' + bookId);
}

/**
 * 编辑链接
 * @param {clickedBookId} 要编辑的教材Id
 */
function editBook(clickedBookId){

    var bookId = encodeURI(clickedBookId);
    // 表单提交
    var url = 'j030041InitBookDetails.action?bookInfo.bookId=' + bookId;
    
    $('searchForm').action = url;
    // 显示加载动画
    showLoader();
    $('searchForm').submit();
}

/**
 * 审批链接
 * @param {clickedBookId} 要审批的教材Id
 */
function approveBook(clickedBookId){

    var bookId = encodeURI(clickedBookId);
    // 表单提交
    var url = 'j030031InitApproveMode.action?bookId=' + bookId;
    
    $('searchForm').action = url;
    // 显示加载动画
    showLoader();
    $('searchForm').submit();
}

/**
 * 删除链接
 * @param {clickedBookId} 要删除的教材Id
 */
function deleteBook(clickedBookId){
    var bookId = encodeURI(clickedBookId);
    // 表单提交
    var url = 'j030031InitDeleteMode.action?bookId=' + bookId;
    
    $('searchForm').action = url;
    // 显示加载动画
    showLoader();
    $('searchForm').submit();
}

/**
 * 管理链接
 * @param {clickedBookId} 要管理的教材Id
 */
function manageBook(clickedBookId){
    var bookId = encodeURI(clickedBookId);
    // 表单提交
    var url = 'j030011InitManageBookToBook.action?bookId=' + bookId;
    
    $('searchForm').action = url;
    // 显示加载动画
    showLoader();
    $('searchForm').submit();
}

/**
 * 浏览器判定.
 * @return Boolean true:false.
 */
function isIE(){
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 1) 
        return true;
    else 
        return false;
}

/**
 * 是FireFox时，不使用innerText.
 * @return Boolean true:false.
 */
if (!isIE()) {
    HTMLElement.prototype.__defineGetter__("innerText", function(){
        var anyString = "";
        var childS = this.childNodes;
        for (var i = 0; i < childS.length; i++) {
            if (childS[i].nodeType == 1) 
                anyString += childS[i].tagName == "BR" ? '\n' : childS[i].textContent;
            else 
                if (childS[i].nodeType == 3) 
                    anyString += childS[i].nodeValue;
        }
        return anyString;
    });
    HTMLElement.prototype.__defineSetter__("innerText", function(sText){
        this.textContent = sText;
    });
}


