/*
 * @(#)j030051.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
 */
/**
 * @fileoverview 教材内容编辑JavaScript.
 *
 * @author zhanghaibo
 * @version 1.0
 */

/**
 * RADIO ID.
 */
var g_idcount = 0;

/**
 * 画面onload.
 */
function initForm() {
	
	// 每十分钟更新一次排他锁
	window.setInterval(updateLock,600000); 
	
	// 章节标题非空校验
	addRequiredCheck('chapterTitle', getMessage('js.com.warning.0001', '章节标题'), true);
	
	// 锚点链接编辑区域隐藏
	$('txtInnerLinkText').hide();
	$('btnAddAnchorTxt').hide();
	
	initEditor('editor',940,300);
	
	document.observe('keydown', function(event){
		if (event.keyCode == 83 && event.ctrlKey){
			save();
		}
	});

}

/**
 * 更新排他锁.
 */
function updateLock(){
	var url = 'j030051UpdateLock.action';
	var params = 'bookContentInfo.bookId=' + $F('bookId') + '&' +
				'bookContentInfo.chapterNo=' + $F('chapterNo');
	params = addStamp(params);
	new Ajax.Request(url, { 
		method: 'get', 
		parameters: params,
		onComplete : function(response) {
			var flg = checkException(response);
		}
	}); 
}

/**
 * 加载编辑器.
 */
function initEditor(theName, theWidth, theHeight){   
	var editor = ckeditorConfig(theName, theWidth, theHeight, [    
						    ['PreviewV2','-','Templates'],   
						    ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print'],    
						    ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],    
						    '/',    
						    ['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],    
						    ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],    
						        
						    ['Link','Unlink','Anchor'],    
						    ['InsertImage','InsertMedia','InsertDownload','InsertPractice','syntaxhighlight','-','Table','HorizontalRule','Smiley','SpecialChar'],    
						    '/',    
						    ['Styles','Format','Font','FontSize'], 
							['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],   
						    ['TextColor','BGColor'],    
						    ['Maximize','ShowBlocks','-','About']    
						  ]);
	// 添加快捷键，ctrl + s = 保存，ctrl + z = 撤销
	CKEDITOR.config.keystrokes = [[CKEDITOR.CTRL + 83 /*s*/, 'saveContent' ],[ CKEDITOR.CTRL + 90 /*Z*/, 'undo' ]];
	// 添加自定义按钮事件
	addButtonToEditor(editor); 
}

/**
 * 添加自定义按钮事件至编辑器.
 */
function addButtonToEditor(editor){   
     editor.on('pluginsLoaded', function( ev ){ 
	 
	 	// 保存
	 	editor.addCommand( 'saveContent', {   
            exec:function (){
				save();
            }   
         } );  
		 
	 	//插入图片  
        editor.addCommand( 'insertImage', {   
            exec:function (e){   
				
                var returnValue = window.showModalDialog('j030091InitAddPhoto?mode=1&objectId='+$('bookId').value+'&editNo='+$('editNo').value,
												'','dialogWidth=800px;dialogHeight=600px');   
                
				if (returnValue != undefined && returnValue != null && returnValue.strip() != ''){
					editor.insertHtml(returnValue);   
				}
            }   
         } );   
               
        editor.ui.addButton('InsertImage',   
            {   
                label : '插入图片',   
                className : 'cke_button_image',   
                command : 'insertImage'  
            }); 
		
		//插入多媒体
		 editor.addCommand( 'insertMedia', {   
            exec:function (e){
				
                var returnValue = window.showModalDialog('j030081InitAddVideo.action?mode=1&objectId='+$('bookId').value+'&editNo='+$('editNo').value,
												'','dialogWidth=800px;dialogHeight=600px');   
                
				if (returnValue != undefined && returnValue != null && returnValue.strip() != ''){
					editor.insertHtml(returnValue); 
				}
            }   
         } );   
               
        editor.ui.addButton('InsertMedia',   
            {   
                label : '插入多媒体',   
                icon : '../../images/tt/media.gif',   
                command : 'insertMedia'  
            });
		
		//插入下载文件
		editor.addCommand( 'insertDownload', {   
            exec:function (e){
				   
               var returnValue = window.showModalDialog('j030131InitAddFile.action?mode=1&objectId='+$('bookId').value+'&editNo='+$('editNo').value,
												'','dialogWidth=800px;dialogHeight=600px');   
                
				if (returnValue != undefined && returnValue != null && returnValue.strip() != ''){
					editor.insertHtml(returnValue);   
				}  
            }   
         } );   
               
        editor.ui.addButton('InsertDownload',   
            {   
                label : '插入文件',   
                icon : '../../images/tt/download.bmp',   
                command : 'insertDownload'  
            }); 
		
//		//插入练习
//		editor.addCommand( 'insertPractice', {   
//            exec:function (e){   
//               var returnValue = window.showModalDialog('j030121InitAddPractice.action?bookId='+$('bookId').value+'&editNo='+$('editNo').value,
//												'','dialogWidth=800px;dialogHeight=600px');   
//                
//				if (returnValue != undefined && returnValue != null && returnValue.strip() != ''){
//					editor.insertHtml(returnValue);   
//				}
//				  
//            }   
//         } );   
//               
//        editor.ui.addButton('InsertPractice',   
//            {   
//                label : '插入练习',   
//                icon : '../../images/tt/practice.bmp',   
//                command : 'insertPractice'  
//            }); 
   
     }); 
}

/**
 * 保存.
 */
function save() {
	
	if(checkForm('mainForm') && bookContentValidate()){
		// 显示加载动画
        showLoader();
		
		var url = 'j030051SaveBookContent.action';
		
		$('editor').value = CKEDITOR.instances.editor.getData();
		
    	var params = $('mainForm').serialize();

		new Ajax.Request(url, {
			method : 'post',
			parameters : params,
			onComplete : function(response){
				var flg = checkException(response);
				
				if (!flg)
					showOpTip(getMessage('js.tt.info.GTT02'));
				
				hideLoader();
			}
		});
	}
}

/**
 * 概述输入校验.
 * @return Boolean true:false.
 */
function bookContentValidate(){

    if (CKEDITOR.instances.editor.getData().length > 500000) {
		MsgBox.error(getMessage('js.com.warning.0011', '章节内容', '500000'));
        CKEDITOR.instances.editor.focus();
		return false;
    }
	
	return true;
    
}

/**
 * 退出编辑.
 */
function quitEdit() {
	
	if (!confirm(getMessage('js.tt.warn.JYW02'))){
		return;
	}
	
	var url = 'j030051QuitEdit.action';
	var params = 'bookContentInfo.bookId=' + $F('bookId') + '&' +
	'bookContentInfo.chapterNo=' +
	$F('chapterNo');
	params = addStamp(params);
	var request = new Ajax.Request(url, {
		method: 'post',
		parameters: params,
		asynchronous: false
	});
	
	if (window.opener != null && 
		!window.opener.closed &&
		window.opener.refreshList != undefined){
		window.opener.refreshList();
	}
	
	window.open('','_self','');
	window.close();
	
}
/**
 * 添加按钮
 */
function addline(){
	
	// 锚点链接编辑区域隐藏
	if(0 == g_idcount){
		$('txtInnerLinkText').show();
		$('btnAddAnchorTxt').show();
	}

    var anchoradd;// 添加行锚点显示名
    var i;// 列表长度
    // 添加行锚点显示名内容编辑
    i = parseInt(0, 10);
	i++;

    // 添加行
    var newline = $('cloneline').clone(true);
    
    // TABLE底部插入添加行
    $('anchorsTable').down(0).insert({
        bottom: newline
    });
    
    newline.removeClassName('none');
    
    g_idcount++;
    anchoradd = '锚点显示名' + g_idcount;
	
    // 添加行锚点显示名  ID 
    newline.select('INPUT')[0].id = 'linkId' + g_idcount;
        
    // 添加行锚点显示名  VALUE
    newline.select('INPUT')[0].value = anchoradd;
    
    // 添加行锚点名称  ID 
    newline.select('INPUT')[1].id = 'linkName' + g_idcount;
	
	// 添加行锚点内容  ID 
    newline.select('INPUT')[2].id = 'linkTxt' + g_idcount;
}

/**
 * 锚点链接文本生成
 */
function addInnerIndex(){
	var allAnchorLinkText = '';

	for(var txtNum = 1; txtNum <= g_idcount; txtNum++){
		
		var anchorId = $F('linkId' + txtNum);
		var anchorName = $F('linkName' + txtNum);
		var anchorTxt = '';
		
		if('' != anchorId && '' != anchorName){
			var anchorTxt = '<a href = "#' + anchorName +'">' + anchorId + '</a><br>';
			$('linkTxt' + txtNum).value  = anchorTxt;
		}else{
			$('linkTxt' + txtNum).value = anchorTxt;
		}
		
		allAnchorLinkText = allAnchorLinkText + anchorTxt;
	}
	$('bookContentInfo.innerIndex').value = allAnchorLinkText;
}

