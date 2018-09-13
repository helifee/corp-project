/*
 * @(#)JsNameFilter.js
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 共通系统
 */
/**
 * @fileoverview 无刷新文件上传JavaScript.
 *
 * @author wangduo
 * @version 1.0
 */

/**
 * 无刷新文件上传
 * @param {Object} options 参数列表
 */
function JsFileUpload(options) {

	/**
	 * 参数列表
	 * fileInputId:file控件ID
	 * backVarName:储存路径的隐藏控件ID
	 * eventElementId:上传图片按钮ID
	 * onUpload：上传时调用的方法
	 * onSuccess:成功返回执行方法
	 */
	var myOptions = {
		fileInputId: '',
		backVarName: '',
		eventElementId: '',
		onUpload: function() {
			return true
		},
		onSuccess: function() {
		}
	};
	
	// 将options中值设置到myOptions中 
	Object.extend(myOptions, options);
	
	/**
	 * 创建 frame
	 * @param {Object} id 随机ID
	 */
	function createUploadIframe(id) {
	
		var frameId = 'jUploadFrame' + id;
		var uploadIframe;
		
		if (window.ActiveXObject) {
		
			uploadIframe = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');
			
		} else {
		
			uploadIframe = document.createElement('iframe');
			uploadIframe.id = frameId;
			uploadIframe.name = frameId;
		}
		
		Element.extend(uploadIframe);
		
		uploadIframe.setStyle({
			position: 'absolute',
			top: '-1000px',
			left: '-1000px'
		});
		
		document.body.appendChild(uploadIframe);
		
		return uploadIframe;
	}
	
	/**
	 * 创建  form
	 * @param {Object} id 随机ID
	 */
	function createUploadForm(id) {
	
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = document.createElement('form');
		form.id = formId;
		form.name = formId;
		Element.extend(form);
		form.setStyle({
			position: 'absolute',
			top: '-1200px',
			left: '-1200px'
		});
		
		var oldElement = $(myOptions.fileInputId);
		var newElement = oldElement.clone();
		newElement.value = "";
		
		oldElement.id = fileId;
		
		if (!window.ActiveXObject) {
			newElement.observe('change', fileUpload);
		}
		
		// 将新的file控件放置到当前flieInput后
		oldElement.insert({
			after: newElement
		});
		
		// 将当前flieInput放置到表单中
		form.insert({
			top: oldElement
		});
		
		oldElement.name = 'upload';
		
		document.body.appendChild(form);
		
		return form;
	}
	
	/**
	 * 上传文件
	 */
	function fileUpload() {
	
		// 上传时调用传入的方法
		if (!myOptions.onUpload()) return;
		
		var tempId = new Date().getTime();
		var uploadIframe = createUploadIframe(tempId);
		var uploadForm = createUploadForm(tempId);
		
		// 设置表单属性
		uploadForm.writeAttribute({
			action: window['g_basePath'] + 'common/uploadImage.action',
			method: 'POST',
			target: uploadIframe.id
		});
		
		if (uploadForm.encoding) {
			uploadForm.encoding = 'multipart/form-data';
		} else {
			uploadForm.enctype = 'multipart/form-data';
		}
		
		uploadForm.submit();
		uploadIframe.observe('load', uploadCallback);
		
		// 上传完成后调用方法
		function uploadCallback() {
			var ret = uploadIframe.contentWindow.document.body.innerHTML;
			if (ret.include('errorMessage')) {
				MsgBox.error(ret.stripTags());
			} else {
				ret = ret.stripTags();
				
				// 给页面控件赋值
				$(myOptions.backVarName).value = ret;
				
				// 上传完成后调用页面方法
				myOptions.onSuccess(ret);
			}
			// 删除上传使用的form和frame
			setTimeout(function() {
				try {
					uploadForm.remove();
					uploadIframe.remove();
				} 
				catch (e) {
				}
			}, 100)
		}
	}
	
	// 如果设置上传按钮
	var eventElement = $(myOptions.eventElementId);
	if (eventElement) {
		eventElement.addClassName('cur_pointer');
		eventElement.observe('mouseover', function(event) {
			var fileInput = $(myOptions.fileInputId);
			// 如果点击是出现焦点虚线
			if (fileInput.hideFocus == false) {
				// 取消虚线
				fileInput.hideFocus = true;
			}
			fileInput.setStyle({
				'left': (event.clientX + getWindowScrollLeft() - fileInput.getWidth() / 2) + 'px',
				'top': (event.clientY + getWindowScrollTop() - fileInput.getHeight() / 2) + 'px'
			});
		});
	}
	
	$(myOptions.fileInputId).observe('change', fileUpload);
}

/**
 * 取得临时文件的Url.
 * @param {Object} fileName 临时文件名.
 */
function getTempUrl(fileName){
	return window['g_basePath'] + 'common/getTempImage.action?fileName=' + fileName;
}
