/*
 * @(#)j030091.js
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
 * 上传图片.
 */
function uploadPic(){

    //判断是否存在待上传文件
    if (null == $('uploadImg').value || '' == $('uploadImg').value) {
    
        MsgBox.message(getMessage('js.com.warning.0001', '上传图片'));
        return;
    }
    
    //文件格式校验
    if (!fileTypeValidate()) {
        return;
    }
    
    //上传图片
    targetForm = $('uploadPicForm');
    targetForm.submit();
    
    targetForm.reset();
}

/**
 * 删除图片.
 * @param {String} dataId 资料ID
 */
function deletePic(dataId){

    if (confirm(getMessage('js.tt.warn.JYW07'))) {
    
        $('dataId').value = dataId;
        targetForm = $('deletePicForm');
        targetForm.submit();
        
    }
}

/**
 * 引用图片.
 * @param {String} dataId 资料ID
 * @param {String} remark 图片描述
 */
function recommendPic(dataId, remark){

    //设置返回值
    if ($('mode').value == 1) {
    
        var reParameter = "<img src='../../tt/manager/getFile.action?flag=BOOK_IMAGE&fileName=" + dataId + "' alt='" + remark + "'";
    }
    else 
        if ($('mode').value == 2) {
        
            var reParameter = "<img src='../../tt/manager/getFile.action?flag=QUESTION_IMAGE&fileName=" + dataId + "' alt='" + remark + "'";
        }
    
    //边框是否显示							 
    if (parent.$('imgFrame0').checked == true) {
        reParameter = reParameter + " border='1'";
    }
    
    //大小是否自定义
    if (parent.$('size0').checked == true) {
    
        if (parent.$('widthSize').value != null && parent.$('widthSize').value != '') {
            reParameter = reParameter + ' width=' + parent.$('widthSize').value + 'px';
        }
        
        if (parent.$('heightSize').value != null && parent.$('heightSize').value != '') {
            reParameter = reParameter + ' height=' + parent.$('heightSize').value + 'px';
        }
    }
    
    reParameter = reParameter + ' />';
    
    //提交返回值
    parent.window.returnValue = reParameter;
    //关闭画面
    parent.close();
    
}

/**
 * 自定义图片大小.
 * @param {String} value 选中的radio
 */
function defineSize(value){

    if (value == 1) {
        //清空宽高
        $('widthSize').clear();
        $('heightSize').clear();
        //宽高不可写
        $('widthSize').disable();
        $('heightSize').disable();
    }
    else 
        if (value == 0) {
            //宽高可写
            $('widthSize').enable();
            $('heightSize').enable();
            //设置宽高默认值
            $('widthSize').value = '100';
            $('heightSize').value = '150';
        }
}

/**
 * 上传文件格式校验.
 */
function fileTypeValidate(){

    var allowExt = ".jpg|.jpeg|.gif|.bmp|.png|";
    var fileExt = $('uploadImg').value.substr($('uploadImg').value.lastIndexOf(".")).toLowerCase();
    
    //判断文件类型是否允许上传
    if (allowExt.indexOf(fileExt + "|") == -1) {
        MsgBox.error(getMessage('js.tt.error.JYE10'));
        return false;
    }
    return true;
}

/**
 * 对象跟随鼠标移动.
 */
function inputMouseover(event){

    var fileInput = $('uploadImg');
    
    fileInput.setStyle({
        'left': (event.clientX - fileInput.getWidth() / 2) + 'px',
        'top': (event.clientY - fileInput.getHeight() / 2) + 'px'
    });
}
