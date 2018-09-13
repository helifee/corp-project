/*
 * @(#)j030041.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
 */
/**
 * 教材状态.
 */
var bookStatus = {
    edit: 1,
    wait: 2,
    open: 3,
    refu: 4
};

/**
 * 画面onload.
 */
function initForm(){
    // 显示加载动画
    showLoader();
    addRequiredCheck('beditBookName', getMessage('js.com.warning.0001', '教材名称'), true);
    
    $('div_training_refuseReason').hide();
    $('uploadWaitInfo').hide();
    
    if ($('bookStatus').value == 1) {
        //编辑中状态下，再编辑按钮不可见
        $('btnReset').hide();
    }
    else {
        //非编辑中状态下，画面不可入力
        $('beditBookName').disable();
        $('beditKeyWord').disable();
        $('beditPreKnowledge').disable();
        $('beditSource').disable();
        $('beditApplyTo').disable();
        $('beditAbstract').readOnly = true;
        $('btnChapEdit').disable();
        $('btnSave').disable();
        $('btnSubmit').disable();
        $('bookCoverImg').disable();
        $('filetext').disable();
        $('btnUpload').disable();
        
        $('btnReset').enable();
        $('btnSubmit').hide();
        if ($('bookStatus').value == 4) {
            $('div_training_refuseReason').show();
        }
    }
    
    new JsFileUpload({
        fileInputId: 'bookCoverImg', // file控件ID
        backVarName: 'bookCover', // 返回值变量名
        eventElementId: 'btnUpload', // 上传图片按钮ID
        onUpload: function(){
        
            $('filetext').value = $('bookCoverImg').value
            
            //文件格式校验
            if (!fileTypeValidate()) {
                return false;
            }
            
            var url = 'j030041UploadValidate';
            params = 'bookInfo.bookId=' + $F('bookId');
            params = addStamp(params);
            new Ajax.Request(url, {
                method: 'get',
                parameters: params,
                onSuccess: function(response){
                    if (response.getHeader('Content-Type').startsWith('text/html')) {
                        document.write(response.responseText);
                        return false;
                    }
                }
            });
            
            $('filetext').hide();
            $('btnUpload').hide();
            $('uploadWaitInfo').show();
            
            return true;
        },
        onSuccess: function(response){ // 成功返回执行方法
            var img = $('bookCovImg');
            
            img.src = getTempUrl($('bookCover').value);
            $('filetext').show();
            $('btnUpload').show();
            $('uploadWaitInfo').hide();
        }
    });
    // 隐藏加载动画
    hideLoader();
}

/**
 * 信息栏展开收缩.
 */
function resize(view){
    $('div_ttTraining_bookDetailsMView').toggle();
    
    // 更改图标及提示文字
    if ($('beditIcon').hasClassName('opt_FillRight')) {
        $('beditIcon').removeClassName('opt_FillRight').addClassName('opt_FillDown');
    }
    else {
        $('beditIcon').removeClassName('opt_FillDown').addClassName('opt_FillRight');
    }
    
}

/**
 * 上传文件格式校验.
 */
function fileTypeValidate(){

    var allowExt = ".jpg|.jpeg|.gif|.bmp|.png|";
    var fileExt = $('bookCoverImg').value.substr($('bookCoverImg').value.lastIndexOf(".")).toLowerCase();
    
    if (allowExt.indexOf(fileExt + "|") == -1) { //判断文件类型是否允许上传
        addFieldError('filetext', getMessage('js.tt.error.JYE10'));
        return false;
    }
    return true;
}

/**
 * 输入校验.
 * @return Boolean true:false.
 */
function validate(){

    // 概述输入校验
    if (!bookAbstractValidate()) {
        return false;
    }
    
    return true;
}

/**
 * 概述输入校验.
 * @return Boolean true:false.
 */
function bookAbstractValidate(){

    form = $('mainForm');// 需校验的form
    var continueValidation = true;// 校验状态标记
    //输入长度校验
    if (form.elements['beditAbstract']) {
        field = form.elements['beditAbstract'];
        if (continueValidation && field.value != null) {
            var value = field.value;
            //trim field value
            while (value.substring(0, 1) == ' ') 
                value = value.substring(1, value.length);
            while (value.substring(value.length - 1, value.length) == ' ') 
                value = value.substring(0, value.length - 1);
            if (value.length < -1 || value.length > 400) {
                addFieldError('beditAbstract', getMessage('js.com.warning.0011', '概述', '400'));
                continueValidation = false;
            }
        }
    }
    
    if (continueValidation) {
        return true;
    }
    else {
        $('beditAbstract').focus();
        return false;
    }
}



/**
 * 保存.
 */
function save(){

    // 输入校验
    
    if (!validate()) {
        return;
    }
    
    //去除再编辑用教材名称
    if ($('bookName')) {
        $('bookName').remove();
    }
    
    targetForm = $('mainForm');
    targetForm.action = 'j030041UpdateBookInfo.action';
    
    if (checkForm('mainForm')) {
        // 显示加载动画
        showLoader();
        $('mainForm').submit();
    }
    
}

/**
 * 提交审批.
 */
function sendToApproval(){

    // 输入校验
    if (!validate()) {
        return;
    }
    
    if (confirm(getMessage('js.tt.warn.KSW12'))) {
        //去除再编辑用教材名称
        if ($('bookName')) {
            $('bookName').remove();
        }
        targetForm = $('mainForm');
        targetForm.action = 'j030041SendToApproval.action';
        if (checkForm('mainForm')) {
            // 显示加载动画
            showLoader();
            $('mainForm').submit();
        }
    }
}

/**
 * 再编辑.
 */
function reEdit(){

    var status = $('bookStatus').value;
    
    if (status == bookStatus.open) {
        if (!confirm(getMessage('js.tt.warn.JYW05'))) {
            return;
        }
    } else{
    	if (!confirm(getMessage('js.tt.warn.JYW04'))) {
            return;
        }
    }
    
    targetForm = $('mainForm');
    targetForm.action = 'j030041ReEditBook.action';
    // 显示加载动画
    showLoader();
    targetForm.submit();
}

/**
 * 刷新章节列表.
 */
function refreshList(){
   
    // 章节列表取得
    var url = 'j030041GetChapterList.action';
    var params = 'bookInfo.bookId=' + $F('bookId') + '&' +
    'bookInfo.editNo=' +
    $F('editNo') +
    '&' +
    'bookInfo.bookStatus=' +
    $F('bookStatus');
    params = addStamp(params);
    new Ajax.Updater('div_chapterList', url, {
        method: 'get',
        parameters: params,
        onComplete: function(response){
            var flg = checkException(response);
        }
    });
}
