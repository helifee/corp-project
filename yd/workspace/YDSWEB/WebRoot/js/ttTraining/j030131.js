/*
 * @(#)j030131.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育
 */
/**
 * 主画面onload.
 */
function initForm(){
    // 显示加载动画
    showLoader();
    if ($('mode').value == 1) {
        //教材模式
        $('subInitBook').submit();
        
    }
    else 
        if ($('mode').value == 2) {
            //题库模式	
            $('subInitQue').submit();
        }
    // 隐藏加载动画
    hideLoader();
}

/**
 * 子画面onload.
 */
function initSub(){

    $('objectId').value = parent.$('objectId').value;
    $('editNo').value = parent.$('editNo').value;
    $('mode').value = parent.$('mode').value;
}

/**
 * 上传文件.
 */
function uploadDownloadFile(){

    //判断是否存在待上传文件
    if (null == $('uploadFile').value || '' == $('uploadFile').value) {
    
        MsgBox.message(getMessage('js.tt.warn.GLW04', '上传文件'));
        return;
    }
    
    //上传文件
    targetForm = $('uploadFileForm');
    targetForm.submit();
    
    targetForm.reset();
}

/**
 * 删除文件.
 * @param {String} dataId 资料ID
 */
function deleteFile(dataId){

    if (confirm(getMessage('js.tt.warn.JYW07'))) {
    
        $('dataId').value = dataId;
        targetForm = $('deleteFileForm');
        targetForm.submit();
        
    }
}

/**
 * 引用文件.
 * @param {String} dataId 资料ID
 * @param {String} dataName 资料名称
 */
function recommendFile(dataId, dataName){

    //设置返回值
    if ($('mode').value == 1) {
    
        var reParameter = "<a href='../../tt/manager/getFile.action?flag=BOOK_FILE&fileName=" + dataId + "' >";
    }
    else 
        if ($('mode').value == 2) {
        
            var reParameter = "<a href='../../tt/manager/getFile.action?flag=QUESTION_FILE&fileName=" + dataId + "' >";
        }
    
    //链接文字是否自定义
    if (parent.$('linkWord').value == null || parent.$('linkWord').value == '') {
    
        reParameter = reParameter + dataName;
    }
    else {
    
        reParameter = reParameter + parent.$('linkWord').value;
    }
    
    reParameter = reParameter + ' </a>';
    
    //提交返回值
    parent.window.returnValue = reParameter;
    //关闭画面
    parent.close();
    
}

/**
 * 对象跟随鼠标移动.
 */
function inputMouseover(event){

    var fileInput = $('uploadFile');
    
    fileInput.setStyle({
        'left': (event.clientX - fileInput.getWidth() / 2) + 'px',
        'top': (event.clientY - fileInput.getHeight() / 2) + 'px'
    });
}
