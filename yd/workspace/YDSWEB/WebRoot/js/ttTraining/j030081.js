/*
 * @(#)j030081.js
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
 * 上传视频.
 */
function uploadVideoFile(){

    //判断是否存在待上传文件
    if (null == $('uploadVideo').value || '' == $('uploadVideo').value) {
    
        MsgBox.message(getMessage('js.com.warning.0001', '上传视频'));
        return;
    }
    
    //文件格式校验
    if (!fileTypeValidate()) {
        return;
    }
    
    //上传视频
    targetForm = $('uploadVideoForm');
    targetForm.submit();
    
    targetForm.reset();
}

/**
 * 删除视频.
 * @param {String} dataId 资料ID
 */
function deleteVideo(dataId){

    if (confirm(getMessage('js.tt.warn.JYW07'))) {
    
        $('dataId').value = dataId;
        targetForm = $('deleteVideoForm');
        targetForm.submit();
        
    }
}

/**
 * 引用视频.
 * @param {String} dataId 资料ID
 */
function recommendVideo(dataId){

    //允许视频类型
    var allowExt1 = ".avi|.wmv|.asf|.mp4|.mp3|";
    var allowExt2 = ".rm|";
    
    //取得视频类型
    var fileExt = dataId.substr(dataId.lastIndexOf(".")).toLowerCase();
    
    //视频类型满足allowExt1		
    if (allowExt1.indexOf(fileExt + "|") != -1) {
    
        //定义返回值中间变量
        var middlePar1 = '';
        var middlePar2 = "<PARAM NAME='ShowDisplay' VALUE='0'>" +
        "<PARAM NAME='ShowControls' VALUE='1'>" +
        "<PARAM NAME='AutoStart' VALUE='0'>" +
        "<PARAM NAME='AutoRewind' VALUE='0'>" +
        "<PARAM NAME='PlayCount' VALUE='0'>" +
        "<PARAM NAME='MovieWindowHeight' VALUE='240'>" +
        "<PARAM NAME='MovieWindowWidth' VALUE='320'>";
        if ($('mode').value == 1) {
        
            var middlePar3 = "<PARAM NAME='FileName' VALUE='../../tt/manager/getFile.action?flag=BOOK_MEDIA&fileName=" + dataId + "'>";
            var middlePar5 = "' src='../../tt/manager/getFile.action?flag=BOOK_MEDIA&fileName=" + dataId + "'>" +
            "</embed>" +
            "</OBJECT>";
        }
        else 
            if ($('mode').value == 2) {
            
                var middlePar3 = "<PARAM NAME='FileName' VALUE='../../tt/manager/getFile.action?flag=QUESTION_MEDIA&fileName=" + dataId + "'>";
                var middlePar5 = "' src='../../tt/manager/getFile.action?flag=QUESTION_MEDIA&fileName=" + dataId + "'>" +
                "</embed>" +
                "</OBJECT>";
            }
        var middlePar4 = '';
        
        //判断视频显示大小				
        if (parent.$('size2').checked == true) {
        
            //视频显示小
            middlePar1 = "<OBJECT id=video border=0 classid=clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95 width='150' height='120'>";
            middlePar4 = "<embed  width='150' height='120' border='0' showdisplay='0' showcontrols='1' autostart='1' autorewind='0' " +
            "playcount='0' moviewindowheight='240' moviewindowwidth='320' filename='" +
            dataId;
            
        }
        else 
            if (parent.$('size1').checked == true) {
            
                //视频显示中
                middlePar1 = "<OBJECT id=video border=0 classid=clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95 width='300' height='250'>";
                middlePar4 = "<embed  width='300' height='250' border='0' showdisplay='0' showcontrols='1' autostart='1' autorewind='0' " +
                "playcount='0' moviewindowheight='240' moviewindowwidth='320' filename='" +
                dataId;
                
            }
            else 
                if (parent.$('size0').checked == true) {
                
                    //视频显示大
                    middlePar1 = "<OBJECT id=video border=0 classid=clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95 width='500' height='420'>";
                    middlePar4 = "<embed  width='500' height='420' border='0' showdisplay='0' showcontrols='1' autostart='1' autorewind='0' " +
                    "playcount='0' moviewindowheight='240' moviewindowwidth='320' filename='" +
                    dataId;
                    
                }
        
        //设置返回值
        var reParameter = middlePar1 + middlePar2 + middlePar3 + middlePar4 + middlePar5;
        
        //视频类型满足allowExt2		 			
    }
    else 
        if (allowExt2.indexOf(fileExt + "|") != -1) {
        
            //定义返回值中间变量
            var middlePar1 = '';
            var middlePar2 = "<param name='_ExtentX' value='9313'>" +
            "<param name='_ExtentY' value='7620'>" +
            "<param name='AUTOSTART' value='0'>" +
            "<param name='SHUFFLE' value='0'>" +
            "<param name='PREFETCH' value='0'>" +
            "<param name='NOLABELS' value='0'>";
            if ($('mode').value == 1) {
            
                var middlePar3 = "<param name='SRC' VALUE='../../tt/manager/getFile.action?flag=BOOK_MEDIA&fileName=" + dataId + "'>";
                var middlePar5 = "<embed SRC='../../tt/manager/getFile.action?flag=BOOK_MEDIA&fileName=" + dataId +
                "' type='audio/x-pn-realaudio-plugin' CONSOLE='Clip1' CONTROLS='ImageWindow' ";
            }
            else 
                if ($('mode').value == 2) {
                
                    var middlePar3 = "<param name='SRC' VALUE='../../tt/manager/getFile.action?flag=QUESTION_MEDIA&fileName=" + dataId + "'>";
                    var middlePar5 = "<embed SRC='../../tt/manager/getFile.action?flag=QUESTION_MEDIA&fileName=" + dataId +
                    "' type='audio/x-pn-realaudio-plugin' CONSOLE='Clip1' CONTROLS='ImageWindow' ";
                }
            var middlePar4 = "<param name='CONTROLS' value='ImageWindow'>" +
            "<param name='CONSOLE' value='Clip1'>" +
            "<param name='LOOP' value='0'>" +
            "<param name='NUMLOOP' value='0'>" +
            "<param name='CENTER' value='0'>" +
            "<param name='MAINTAINASPECT' value='0'>" +
            "<param name='BACKGROUNDCOLOR' value='#000000'>";
            var middlePar6 = '';
            
            //判断视频显示大小				
            if (parent.$('size2').checked == true) {
            
                //视频显示小
                middlePar1 = "<OBJECT ID=video1 CLASSID='clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA'  width='300' height='180'>";
                middlePar6 = "width='300' height='180' AUTOSTART='false'>" +
                "</embed>" +
                "</OBJECT>";
                
            }
            else 
                if (parent.$('size1').checked == true) {
                
                    //视频显示中
                    middlePar1 = "<OBJECT ID=video1 CLASSID='clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA'  width='500' height='300'>";
                    middlePar6 = "width='500' height='300' AUTOSTART='false'>" +
                    "</embed>" +
                    "</OBJECT>";
                    
                }
                else 
                    if (parent.$('size0').checked == true) {
                    
                        //视频显示大
                        middlePar1 = "<OBJECT ID=video1 CLASSID='clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA'  width='800' height='480'>";
                        middlePar6 = "width='800' height='480' AUTOSTART='false'>" +
                        "</embed>" +
                        "</OBJECT>";
                        
                    }
            
            //设置返回值
            var reParameter = middlePar1 + middlePar2 + middlePar3 + middlePar4 + middlePar5 + middlePar6;
            
        }
    
    //提交返回值
    parent.window.returnValue = reParameter;
    //关闭画面
    parent.close();
    
}

/**
 * 上传文件格式校验.
 */
function fileTypeValidate(){

    var allowExt = ".avi|.wmv|.asf|.rm|.mp3|.mp4|";
    var fileExt = $('uploadVideo').value.substr($('uploadVideo').value.lastIndexOf(".")).toLowerCase();
    
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

    var fileInput = $('uploadVideo');
    
    fileInput.setStyle({
        'left': (event.clientX - fileInput.getWidth() / 2) + 'px',
        'top': (event.clientY - fileInput.getHeight() / 2) + 'px'
    });
}
