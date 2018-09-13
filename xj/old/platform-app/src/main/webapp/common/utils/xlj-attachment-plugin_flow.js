;(function($, window, document, undefined) {
	var FXljAttachment = function(ele, opts) {
		this.$element = ele;
		this.defaults = {
			categoryId:null,
			filesMap:null
		};
		this.options = $.extend({},this.defaults, opts);
	};

	FXljAttachment.prototype = {
		// 添加控件内容到页面
		_createFlowAttachmentModal:function(){
			var attHtmls = [];
			// table显示附件列表
			attHtmls.push('<table class="att-table" style="display:none;">');
			attHtmls.push('	<tr>');
			attHtmls.push('		<th><input name="aa" type="checkbox" class="check-all" /></th>');
			attHtmls.push('		<th><a href="javascript:void(0);" class="file-choose-upload-button" title="package download">打包下载</a></th>');
			attHtmls.push('		<th></th>');
			attHtmls.push('	</tr>');
			attHtmls.push('</table>');
			this.$element.html(attHtmls.join(''));
			return this;
		},
		// 附件列表查询
		_queryFlowList:function() {
			var that = this;
			var clist;
			if (that.options.filesMap != null&&that.options.filesMap!="") {
				clist = that.options.filesMap;
				for (var key in clist) {
//					console.log("属性：" + key + ",值：" + clist[key]);
					if (clist[key] != null&&key==that.options.categoryId) {
						// 表格显示
						$.each(clist[key], function (index, file) {
							var fileLi = $('<tr/>');
							fileLi.append($('<td/>').append($('<input name="ac" type="checkbox" class="file-check"/>').attr('value', JSON.stringify(file))))
								.append($('<td/>').append($('<p/>').text(file.fullName)).attr('title', file.fullName));

							var _preview = $('<td/>');
							var fileType = '*.pdf;*.doc;*.ppt;*.xls;*.docx;*.pptx;*.xlsx;image/jpg,image/jpeg,image/png,image/gif';
							if ("url" == file.type || fileType.indexOf(file.fullName.substring(file.fullName.lastIndexOf(".") + 1).toLowerCase()) > -1) {
								_preview.append($('<p/>').text("预览"));
								fileLi.append(_preview);
								$('.att-table', that.$element).append(fileLi);
								// 预览
								that._bindPreviewEvent(fileLi.find('td:eq(2) p'), file);
							} else {
								fileLi.append(_preview);
								$('.att-table', that.$element).append(fileLi);
							}
							// 下载
							that._bindDownloadEvent(fileLi.find('td:eq(1) p'), file);
							fileLi.find('td:eq(1) p,td:eq(2) p').on('mouseover', function () {
								$(this).css({'cursor': 'pointer', 'text-decoration': 'underline'});
							}).on('mouseout', function () {
								$(this).css({'cursor': '', 'text-decoration': ''});
							});
						});
					}
					if (null==clist[that.options.categoryId]||clist[that.options.categoryId].length == 0) {
						that.$element.empty();
					} else {
						// 无附件信息时，隐藏附件操作链接按钮
						$('.att-table', that.$element).css('display', 'block');
					}
				}
			}
		},
		// 绑定下载事件
		_bindDownloadEvent:function(target, fileInfo) {
			var that = this;
			target.on('click',function() {
				if (fileInfo.type == 'url') {
					window.open(encodeURI(encodeURI(fileInfo.url)),"_blank");
				} else {
					$.xljUtils.xljDownloadFromFileInfo(fileInfo);
				}
			});
		},
		// 绑定预览事件
		_bindPreviewEvent:function(target, file) {
			var that = this;
			target.on('click',function() {
				var officeType = '*.pdf;*.doc;*.ppt;*.xls;*.docx;*.pptx;*.xlsx';
				var pngType = "image/jpg,image/jpeg,image/png,image/gif";
				if(file.fileSize>10240000){
				    alert("附件过大请下载后查看！");
				    return false;
				}
				if("url"==file.type){
					window.open(file.url);
				}else{
					var obj = {};
					obj.FILENAME = file.path.substring(file.path.lastIndexOf('/') + 1);
					obj.GROUP = file.path;
					obj.NAME = file.name;
					var extensionName = obj.GROUP.substring(obj.GROUP.lastIndexOf(".") + 1);
					if (officeType.indexOf(extensionName.toLowerCase()) > -1) {
						$.ajax({
							url: "/platform-app/univ/attachment/attachment/docConverter" + "?time=" + Math.random(),
							data: JSON.stringify(obj),
							type: "POST",
							contentType: 'application/json',
							dataType: 'JSON',
							async: false,
							success: function (resultData) {
								if (resultData) {
									var successFlag = resultData.success;
									if (successFlag) {
										var exName =  resultData.msg.substring(resultData.msg.lastIndexOf(".")+1);
										if("html"==exName){
											window.open($.xljUtils.serverAddr+"/mobile/approve/approve_view.html?path="+resultData.msg.replace(/\\/g,"/")+"&fileName="+encodeURIComponent(file.name));
										}else{
											window.open($.xljUtils.serverAddr+"/pdf/viewer.html?path="+resultData.msg.replace(/\\/g,"/")+"&fileName="+encodeURIComponent(file.name));
										}
									} else {
										$.xljUtils.tip("red", '获取静态页面失败！');
									}
								}
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								$.xljUtils.tip("red", "服务异常,请联系管理员！");
							}
						});
					} else if(pngType.indexOf(extensionName.toLowerCase()) > -1){
						$.post($.xljUtils.serverAddr + "univ/attachment/attachment/getStorageIP",
							{ filePath: file.path },
							function (ip) {
								if (ip) {
									window.open($.xljUtils.serverAddr+"/mobile/approve/approve_view.html?path="+location.protocol + '//' +ip+":"+$.xljUtils.fdfsStoragePort+"/"+file.path+"&fileName="+encodeURIComponent(file.name));
								}
							}
						);
					}else{
						alert("该文件不支持预览,请在电脑上查看！")
						return;
					}
				}
			});
		},
		// 附件控件初始化
		_initFlow:function() {
			var that = this;
			// 绑定选中下载事件
			$('.file-choose-upload-button', that.$element).click(function(){
				var checkedItems = $(':checkbox.file-check:checked', that.$element);
				if (checkedItems.length == 0 ) {
					$.xljUtils.tip('blue', '请选择要下载的附件');
					return;
				}
				var downloadInfos=[];
				checkedItems.each(function(){
					downloadInfos.push(JSON.parse($(this).val()));
				});
				var downloadForm = $('<form action="' + $.xljUtils.serverAddr
					+'univ/attachment/attachment/downloadAll" method="post"/>')
					.append($('<input type="hidden" name="attListJson" value="'+ encodeURI(JSON.stringify(downloadInfos)) + '"/>'));
				var downloadFormContainer = $('<div style="width:0;height:0;"/>').appendTo('body');
				downloadFormContainer.append(downloadForm)
				downloadForm.submit();
				downloadFormContainer.remove();
			});
			// 绑定全选事件
			$(':checkbox.check-all', that.$element).change(function(){
				var chkValue = this.checked;
				$(':checkbox.file-check', that.$element).each(function(i){
					this.checked = chkValue;
				});
			});
			return this.$element;
		},
	};
	var flXljAtts = {};
	$.fn.extend({
		/**
		 * 根据选择器初始化附件控件
		 */
		fxljAttachment: function(options){
			flXljAtts[this.selector] = new FXljAttachment(this, options);
			// 添加附件控件HTML到页面
			flXljAtts[this.selector]._createFlowAttachmentModal();
			flXljAtts[this.selector]._initFlow();
			// 表单非新增模式下，查询附件信息
			flXljAtts[this.selector]._queryFlowList();
			return this;
		},
	});

})(jQuery, window, document);