/*
 * 附件上传下载jQuery扩展
 * 
 * 调用方法：
 * 
 * 1.控件初始化
 * $(selector).xljAttachment({
 *     appId:(应用ID，必须), 
 *     businessId:(业务ID，必须),
 *     categoryId:(附件分类ID，必须),
 *     mode:(三种加载模式：'add','edit','view'，默认'add'),
 *     singleUpload:(默认false,单附件上传请指定true),
 *     autoSubmit:是否自动提交到附件正式表，自动提交到正式表时，不需要再次提交附件信息，默认false
 *     fromTempTable:初始化时是否从临时表里加载附件信息，默认false,
 *     fileUploaded:附件上传之后的回调函数，用于自定义处理上传完成之后返回的附件信息,
 *     hideButtonsWithNoFile:没有附件信息时隐藏操作按钮连接，默认为false，不隐藏；为true时，无附件时隐藏操作按钮
 * });
 * selecter为自己表单放置附件的父元素选择器
 * 
 * 例如：
 * add表单：
 * 	$('.attachment-container').xljAttachment({appId:'1',businessId:'122',categoryId:'1'});
 * 	或者 $('.attachment-container').xljAttachment({appId:'1',businessId:'122',categoryId:'1',mode:'add'});
 * 
 * 修改编辑表单：
 * 	$('.attachment-container').xljAttachment({appId:'1',businessId:'122',categoryId:'1',mode:'edit'});
 * 
 * 预览页面：
 * $('.attachment-container').xljAttachment({appId:'1',businessId:'122',categoryId:'1',mode:'view'});
 * 
 * 2.附件信息提交：
 * $(selector).xljAttachmentSubmit();
 * 
 * 创建者：haoqipeng 2017-03-27
 */

;(function($, window, document, undefined) {
	if (!$.xljUtils) {
		$.extend({xljUtils:{}});
	}

	$.extend($.xljUtils, {
		/** 文件服务器地址 */
		// serverAddr:location.origin,
		serverAddr:location.protocol + '//' + location.host + baseUrl,
		/** fdfs存储服务端口 */
		fdfsStoragePort: '38727',
		/** 控件初始化模式：add-添加， edit-编辑修改， view-浏览， view-列表*/
		modeEnum:{
			add:'add',edit:'edit',view:'view',table:'table'
		},
		uploadResultCode:{
			uploadUnfinished:1,uploadfinished:2, uploadError:3, noSubmitData:4,checkError:5, autoSubmited:6
		},
		uploadStatus:{
			started:1,finished:2,uploading:3, progress100:4
		},
		/**
		 * 格式化文件大小
		 */
		formatFileSize : function(bytes) {
			if (typeof bytes !== 'number') {
				return '';
			}
			if (bytes >= 1000000000) {
				return (bytes / 1000000000).toFixed(2) + ' GB';
			}
			if (bytes >= 1000000) {
				return (bytes / 1000000).toFixed(2) + ' MB';
			}
			return (bytes / 1000).toFixed(2) + ' KB';
		},
		/**
		 * 将总秒数换算成 0d 00:00:00
		 */
		formatTime : function(seconds) {
			var date = new Date(seconds * 1000), days = Math.floor(seconds / 86400);
			days = days ? days + 'd ' : '';
			return days + ('0' + date.getUTCHours()).slice(-2) + ':'
				+ ('0' + date.getUTCMinutes()).slice(-2) + ':'
				+ ('0' + date.getUTCSeconds()).slice(-2);
		},

		/**
		 * 根据最大长度格式化字符串
		 */
		formatStringByLength:function(val, maxLength) {
			if (val === undefined || val == null || val.constructor != String) return val;
			if (maxLength === undefined || maxLength == null) return val;
			var valLength = 0;
			var subString = val;
			for (var i = 0; i < val.length; i++) {
				valLength ++;
				if (val.charCodeAt(i) > 127) {
					valLength ++;
				}
				if (valLength >= maxLength) {
					subString = val.substring(0, i) + '...';
					break;
				}
			}
			// if (valLength <= maxLength) return val;
			// return val.substr(0, (maxLength/2 - 2)) + '...' + val.substr(-(maxLength/2) + 2);
			return subString;
		},

		/**
		 * 查询附件URL列表
		 * @param appId 应用ID
		 * @param businessId 业务ID
		 * @param categoryId 附件分类ID
		 * @param callback 回调函数
		 * 		callback(okFlag, data): okFlag=true时，data为controller返回的JSON，附件URL为data.result[index].url
		 * 								okFlag=false时，data为ajax请求的xhr对象
		 *
		 * @param isAsync 是否异步，默认true
		 */
		queryAttachmentUrlList:function(appId, businessId, categoryId, callback,isAsync) {
			if(typeof isAsync == 'undefined'){
				isAsync = true;
			}
			$.ajax({
				url:$.xljUtils.serverAddr + 'univ/attachment/attachment/queryUrlList',
				type:'POST',
				contentType: "application/json",
				data:JSON.stringify({appId: appId, businessId: businessId, categoryId:categoryId}),
				dataType:"JSON",
				async:isAsync,
				success:function(dt) {
					callback(true, dt);
				},
				error:function(xhr) {
					callback(false, xhr);
				}
			});
		},

		/**
		 * 附件下载
		 * @param {String} appId 应用ID
		 * @param {String} businessId 表单业务ID
		 * @param {String} categoryId 附件分类ID
		 */
		xljDownLoad: function(appId, businessId, categoryId) {
			$.xljUtils.queryAttachmentUrlList(appId, businessId, categoryId, function(successFlag, obj) {
				// 查询成功
				if (successFlag == true) {
					if(obj.result && obj.result.constructor == Array) {
						if (obj.result.length == 1) {
							var fileUrl;
							if (obj.result[0].type == 'url') {
								fileUrl = obj.result[0].url;
								window.open(encodeURI(encodeURI(fileUrl)), '_blank');
							} else {
								var fileName = obj.result[0].fullName;
								if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
									fileName = encodeURI(encodeURI(fileName));
								}
								fileUrl = obj.result[0].url.replace(/:8080/g, ':' + $.xljUtils.fdfsStoragePort) + '/' + obj.result[0].path + '?filename=' + fileName;
								window.open(fileUrl, '_self');
							}
						} else if (obj.result.length > 1) {
							$.xljUtils.tip('blue', '查询出多个文件，无法定位文件，请联系管理员');
						} else {
							$.xljUtils.tip('blue', '文件不存在');
						}
					} else {
						$.xljUtils.tip('blue', '文件不存在');
					}
				} else {
					$.xljUtils.tip('blue', '文件下载失败，请稍后重试');
				}
			});
		},

		/**
		 * 根据文件路径和文件名下载文件
		 * @param {String} filePath 文件路径
		 * @param {String} fileName 文件名
		 */
		xljDownloadFromFileInfo: function (fileInfo) {
			// $.post($.xljUtils.serverAddr + "univ/attachment/attachment/filesExportHelper",
			// 	{ filePath: filePath ,fileName:fileName},
			// 	function (ip) {
			// 		// if (ip) {
			// 		// 	// 火狐浏览器不做转码处理
			// 		// 	if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
			// 		// 		//fileName = fileName.trim();
			// 		// 		//fileName = encodeURI(encodeURI(fileName));
			// 		// 	}
			// 		// 	var path = encodeURI(encodeURI('http://' + ip + ':'+ $.xljUtils.fdfsStoragePort+ '/'+filePath+ '?filename='+ fileName));
			//        //
			// 		// 	window.open(path);
			// 		// }
			// 	}
			// );
			var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 fileInfo.path, fileInfo.fullName
			if (userAgent.indexOf("Firefox") > -1) {
				window.open($.xljUtils.serverAddr + "univ/attachment/attachment/filesExportHelper?filePath="+fileInfo.path+"&fileName="+encodeURIComponent(fileInfo.fullName));
			}else{
				window.open($.xljUtils.serverAddr + "univ/attachment/attachment/filesExportHelper?filePath="+fileInfo.path+"&fileName="+encodeURIComponent(fileInfo.fullName));
			}
			// var downloadInfos=[];
			// downloadInfos.push(JSON.parse(fileInfo));
			//
			// var downloadForm = $('<form action="' + that.options.serverAddr
			// 	+'univ/attachment/attachment/downloadAll" method="post"/>')
			// 	.append($('<input type="hidden" name="attListJson" value="'+ encodeURI(JSON.stringify(downloadInfos)) + '"/>'));
			//
			// var downloadFormContainer = $('<div style="width:0;height:0;"/>').appendTo('body');
			// downloadFormContainer.append(downloadForm)
			// downloadForm.submit();
			// downloadFormContainer.remove();

		},

		/*xljDownloadFromFileInfo: function (filePath, fileName) {
			$.post($.xljUtils.serverAddr + "univ/attachment/attachment/getStorageIP",
				{ filePath: filePath },
				function (ip) {
					if (ip) {
						// 火狐浏览器不做转码处理
						if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) {
							fileName = fileName.trim();
							if(fileName.lastIndexOf(".")>10){
								fileName = fileName.substring(0,10)+"..."+fileName.substring(fileName.lastIndexOf("."));
							}
						}
						window.open(['http://' + ip + ':', $.xljUtils.fdfsStoragePort, '/', filePath, '?filename=', encodeURI(encodeURI(fileName))].join(''), "_self");
					}
				}
			);
		},*/
		getUuid:function(callback) {
			$.ajax({
		        type:'get',
		        url:$.xljUtils.serverAddr + "generator/getGuuid"+"?time="+Math.random(),
		        success: function(data) {
			        var guuid=data.result;
			        if (typeof callback === "function") {
			        	callback(guuid);
			        }
		        },
		        error:function(xhr) {
		        	callback(null);
		        }
			});
		},
		// 判空
		isEmpty:function(val) {
			if (val === undefined || val === null || val === '') {
				return true;
			}
			return false;
		},
		replaceNull:function(val, rpl) {
			if (rpl === undefined || rpl === null) rpl = '';
			if ($.xljUtils.isEmpty(val)) return rpl;
			return val;
		}

	});

	var XljAttachment = function(ele, opts) {
		this.$element = ele;
		this.$element.data('uploadFinished', $.xljUtils.uploadStatus.finished);
		this.defaults = {
				appId:null,
				businessId:null,
				categoryId:null,
				serverAddr:$.xljUtils.serverAddr,
				singleUpload:false,// 是否单附件上传
				mode:'add',// 是否新增表单上传附件
				fileList:{oldList:[], newList:[],totalSize:0, uploadedCount:0},
				fileUploaded:function(){},
				autoSubmit: false,// 是否自动提交
				fromTempTable: false,
				loadFilesDone:function(){},
				hideButtonsWithNoFile: false,
				isAsyncSubmit:true,// 是否异步保存附件信息
                onShowModalEvent:function(){},// modal打开触发事件
                onHideModalEvent:function(){},//modal关闭出发事件
                addUrlClickEvent:null // 添加url附件点击事件
		};
		this.options = $.extend({},this.defaults, opts);
		$.xljUtils.serverAddr = this.options.serverAddr;
	};

	XljAttachment.prototype = {
		// 添加控件内容到页面
		_createAttachmentModal:function(){
			var attHtmls = [];
			// table显示附件列表
			if (this.options.mode == $.xljUtils.modeEnum.table) {
				attHtmls.push('<table class="att-table" style="display:none;">');
				attHtmls.push('	<tr>');
				attHtmls.push('		<th><input name="aa" type="checkbox" class="check-all" /></th>');
				attHtmls.push('		<th><a href="javascript:void(0);" class="file-choose-upload-button" title="package download">打包下载</a></th>');
				attHtmls.push('		<th></th>');
				attHtmls.push('	</tr>');
				attHtmls.push('</table>');
			}
			// 非table显示情况下
			else {
				attHtmls.push('<div class="upload clearfix">');
				attHtmls.push('    <div class="up_title">');

				// 预览情况下，实现多文件下载
				if (this.options.mode == $.xljUtils.modeEnum.view) {
					attHtmls.push('        <span class="glyphicon glyphicon-link"></span>');
					attHtmls.push('        <a href="javascript:void(0);" class="fileinput-button file-choose-all-button" data-checked="false">');
					attHtmls.push('        	<span>全选</span></a>');
					attHtmls.push('       | <a href="javascript:void(0);" class="fileinput-button file-reverse-choose-button">');
					attHtmls.push('        	<span>反选</span></a>');
					attHtmls.push('       | <a href="javascript:void(0);" class="fileinput-button file-choose-upload-button">');
					attHtmls.push('        	<span>打包下载</span></a>');
				}

				// 编辑模式下添加附件控件可用
				else {
					attHtmls.push('        <span class="attachment-link-icon"></span>');
					attHtmls.push('        <a href="javascript:void(0);"  title="add attachment" class="fileinput-button">');
					attHtmls.push('        	<span>添加附件</span>');
					attHtmls.push('        	<input id="fileupload" class="fileupload" type="file" name="files[]" multiple></a>');
					attHtmls.push('        | <span class="attachment-url-icon"></span>');
					if (this.options.addUrlClickEvent && this.options.addUrlClickEvent instanceof Function) {
						attHtmls.push('        <a href="javascript:void(0);" class="fileinput-button url-add-button">');
					} else {
						attHtmls.push('        <a href="javascript:void(0);" class="fileinput-button url-add-button" data-toggle="modal" data-backdrop="static" data-target=".attachment-modal">');
					}

					attHtmls.push('        	<span title="add url">添加URL</span></a>');

					// 多附件上传，显示整体进度信息
					if (this.options.singleUpload === false) {
						attHtmls.push('        <span class="up_info totalstatus hidden">(<span class="totalpercent">0</span>%，已上传<span class="totalloaded">0</span>，总文件大小<span class="totalsize">0</span>)，总进度：</span>');
						attHtmls.push('        <span class="up_info totalstatus done-total hidden"></span>');
						attHtmls.push('        <div class="progress up_total totalstatus hidden">');
						attHtmls.push('            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">');
						attHtmls.push('                <span class="sr-only">40% Complete (success)</span>');
						attHtmls.push('            </div>');
						attHtmls.push('        </div>');
					}
				}
				attHtmls.push('        <div class="up_files">');
				attHtmls.push('            <ul class="clearfix">');
				attHtmls.push('            </ul>');
				attHtmls.push('        </div>');
				attHtmls.push('    </div>');
				attHtmls.push('</div>');

				// URL上传模态框内容
				if (!this.options.addUrlClickEvent) {
					if (this.options.mode !== $.xljUtils.modeEnum.view && $('.attachment-modal', document.body).length == 0) {
						var modalHtmls = [];
						modalHtmls.push('<div class="modal fade attachment-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
						modalHtmls.push('	<div class="modal-dialog">');
						modalHtmls.push('		<div class="modal-content">');
						modalHtmls.push('			<div class="modal-header">');
						modalHtmls.push('				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">');
						modalHtmls.push('					&times;');
						modalHtmls.push('				</button>');
						modalHtmls.push('				<h5 class="modal-title" id="myModalLabel">');
						modalHtmls.push('					URL附件上传');
						modalHtmls.push('				</h5>');
						modalHtmls.push('			</div>');
						modalHtmls.push('			<div class="modal-body">');
						modalHtmls.push('				<form class="from-line attachment-url-form" validate-type="jQueryValidate">');
						modalHtmls.push('				<div class="xj-form-content">');
						modalHtmls.push('				<input type="hidden" name="id" />');
						modalHtmls.push('				<input type="hidden" name="appId" />');
						modalHtmls.push('				<input type="hidden" name="businessId" />');
						modalHtmls.push('				<input type="hidden" name="categoryId" />');
						modalHtmls.push('				<input type="hidden" name="type" value="url" />');
						modalHtmls.push('				<input type="hidden" name="name" />');
						modalHtmls.push('				<table class="table table-bordered">');
						modalHtmls.push('					<tbody>');
						modalHtmls.push('						<tr class="form-tr">');
						modalHtmls.push('							<td class="form-label"><label><span>*</span>URL名称 :</label></td>');
						modalHtmls.push('							<td>');
						modalHtmls.push('								<input type="text" class="form-control addInputWidth input-item"');
						modalHtmls.push('									name="fullName" data-required="true" data-maxlength="50"');
						modalHtmls.push('									data-placeholder="URL名称">');
						modalHtmls.push('							</td>');
						modalHtmls.push('						</tr>');
						modalHtmls.push('						<tr class="form-tr">');
						modalHtmls.push('							<td class="form-label"><label><span>*</span>URL地址 :</label></td>');
						modalHtmls.push('							<td>');
						modalHtmls.push('								<input type="text" class="form-control addInputWidth input-item"');
						modalHtmls.push('									name="url" data-required="true" data-url="true" data-maxlength="1000"');
						modalHtmls.push('									data-placeholder="URL地址" />');
						modalHtmls.push('							</td>');
						modalHtmls.push('						</tr>');
						modalHtmls.push('					</tbody>');
						modalHtmls.push('				</table></div>');
						modalHtmls.push('				</form>');
						modalHtmls.push('			</div>');
						modalHtmls.push('			<div class="modal-footer">');
						modalHtmls.push('				<button type="button" class="btn btn-sm blue btn-primary">确定</button>');
						modalHtmls.push('				<button type="button" class="btn btn-sm opacity" data-dismiss="modal">关闭</button>');
						modalHtmls.push('			</div>');
						modalHtmls.push('		</div><!-- /.modal-content -->');
						modalHtmls.push('	</div><!-- /.modal -->');
						modalHtmls.push('</div>');
						$(document.body).append(modalHtmls.join(''));
						var  me = this;
						// 弹出后事件
						$('.attachment-modal').on('shown.bs.modal', function () {
							if (me.options.onHideModalEvent !== undefined && me.options.onHideModalEvent.constructor == Function) {
								me.options.onHideModalEvent();
							}
							//if ($('.attachment-modal input[name="id"]').val() == '') {
							$.xljUtils.getUuid(function(uuid){
								if (uuid != null) {
									$('.attachment-modal input[name="id"]').val(uuid);
								}
							});
							//}
						});
						// 关闭后事件
						$('.attachment-modal').on('hidden.bs.modal', function () {
							if (me.options.onShowModalEvent !== undefined && me.options.onShowModalEvent.constructor == Function) {
								me.options.onShowModalEvent();
							}
						});
					}
				}

			}

			this.$element.html(attHtmls.join(''));
			return this;
		},
		// 实例化选项检查
		_initOptionsCheck:function(){
			var msgs = [];
			// 浏览模式下可以不传递appid
			if (this.options.mode != $.xljUtils.modeEnum.view && this.options.mode != $.xljUtils.modeEnum.table) {
				if ($.xljUtils.isEmpty(this.options['appId'])) {
					msgs.push('应用ID');
				}
			}
			if ($.xljUtils.isEmpty(this.options['businessId'])) {
				msgs.push('业务ID');
			}
			if ($.xljUtils.isEmpty(this.options['categoryId'])) {
				msgs.push('附件分类ID');
			}
			return msgs.length == 0?null:'初始化参数【' + msgs.join('、') + '】不能为空' ;
		},
		// 附件列表查询
		_queryList:function() {
			var chkMsg = this._initOptionsCheck();
			if (chkMsg != null) {
				$.xljUtils.tip('red',chkMsg);
				return false;
			}
			var that = this;

			// 查询时可以不传appid
			var queryParam = {businessId: this.options.businessId, categoryId:this.options.categoryId,sidx:"CONVERT( name USING gbk ) COLLATE gbk_chinese_ci",sord:"asc"};
			if (!$.xljUtils.isEmpty(this.options.appId)) {
				queryParam.appId = this.options.appId;
			}

			$.ajax({
				url:this.options.serverAddr + 'univ/attachment/attachment'+(that.options.fromTempTable?'Temp':'')+'/queryList',
				type:'POST',
				contentType: "application/json",
				data:JSON.stringify(queryParam),
				dataType:"JSON",
				success:function(dt) {
					var clist = [];
					if (dt.result != null) {
						clist = dt.result;
					}
					// 从正式表加载附件
					if (!that.options.fromTempTable) {
						that.options.fileList.oldList = clist;
					}
					// 从临时表加载附件
					else {
						that.options.fileList.newList = clist;
						$.each(clist, function(index, item){
							delete item.fileBytes;
						});
					}
					$.each(clist, function(index, item){
						that.options.fileList.totalSize += item.fileSize;
					});
					if(dt.result != null) {
						// 非表格显示
						if (that.options.mode != $.xljUtils.modeEnum.table) {
							// 多文件上传时，显示总文件大小
							if (that.options.singleUpload == false && that.options.fileList.totalSize > 0) {
								that._setTotalSize();
								$('.up_info.totalstatus.done-total', that.$element).text('(总文件大小 ' + that._showTotalSize() + ')').removeClass('hidden');
							}

							$.each(dt.result, function (index, file) {
								var fileLi = $('<li/>');
								if (that.options.mode === $.xljUtils.modeEnum.view) {
									fileLi.append($('<input name="ab" type="checkbox" class="file-check"/>').attr('value', JSON.stringify(file)));
								}
								var context = (file.createDate.length > 10 ? (file.createDate.substr(0, 10)) : (file.createDate))
									+ ', ' + $.xljUtils.replaceNull(file.createPersonName, '--');
								fileLi.append(
									$('<img class="fileType"/>').attr('src', function () {
										if (file.fullName && /.docx?$/g.test(file.fullName)) {
											return that.options.serverAddr + 'univ/images/doc02.png';
										} else {
											return that.options.serverAddr + 'univ/images/doc03.png';
										}
									})
								).append(
									$('<div class="fileName"/>').append(
										$('<p/>').text(file.fullName).attr('title', file.fullName))
										.append($('<p/>').text(that._showTotalSize(file.fileSize))
											.append($('<p/>').text(context).attr('title', context))
										)
								);
								if (that.options.mode != $.xljUtils.modeEnum.view) {
									fileLi.append($('<a href="javascript:void(0);" style="padding-left: 10px" class="up_delete">删除</a>'));
								}
								var fileType = '*.pdf;*.doc;*.ppt;*.xls;*.docx;*.pptx;*.xlsx;image/jpg,image/jpeg,image/png,image/gif';
								if ("url" == file.type || fileType.indexOf(file.fullName.substring(file.fullName.lastIndexOf(".") + 1).toLowerCase()) > -1) {
									fileLi.append($('<a href="javascript:void(0);" class="up_preview">预览</a>'));
								}
								$('.up_files ul', that.$element).append(fileLi);

								// 下载
								that._bindDownloadEvent(fileLi.find('.fileName p:eq(0)'), file);
								// 预览
								that._bindPreviewEvent(fileLi.find('.up_preview'), file);

								fileLi.find('a.up_delete').on('click', function (e) {
									var node = $(this).parent();
									$.ajax({
										url: that.options.serverAddr + 'univ/attachment/attachment/deletefile',
										type: 'POST',
										dataType: 'JSON',
										contentType: 'application/json',
										data: JSON.stringify(file),
										success: function (rs) {
											if (rs.success) {
												var nodeParent = node.parent();
												node.remove();
												that._removeInfoFromFileList(file);
												//$('.up_info', that.$element).text('(上传完成，总文件大小' + $.xljUtils.replaceNull($.xljUtils.formatFileSize(that.options.fileList.totalSize,'--')) + ')');
												//that._setTotalSize();
												if (that.options['singleUpload'] === false) {
													if (nodeParent.children('li').size() == 0) {
														that._hideTotalProgressInfo();
													}
												}

											} else {
												$.xljUtils.tip('red', '附件删除失败');
											}
										},
										error: function (xhr) {
											$.xljUtils.getError(xhr.status);
										}
									});
								});


								fileLi.find('.fileName p:eq(0)').on('mouseover', function () {
									$(this).css({'cursor': 'pointer', 'text-decoration': 'underline'});
								}).on('mouseout', function () {
									$(this).css({'cursor': '', 'text-decoration': ''});
								});
							});
						}
						// 表格显示
						else {
							$.each(dt.result, function (index, file) {
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
					}

					if (that.options.loadFilesDone !== undefined && that.options.loadFilesDone.constructor == Function) {
						that.options.loadFilesDone();
					}

					if (that.options.hideButtonsWithNoFile == true && that.$element.getFileCount() == 0) {
						that.$element.empty();
					}else{
						// 无附件信息时，隐藏附件操作链接按钮
						$('.att-table', that.$element).css('display', 'block');
					}

				},
				error:function(xhr){
					$.xljUtils.getError(xhr.status);
				}
			});
		},
		// 附件信息提交
		_submit: function(callback) {
			var that = this;
			if (that.$element.data('uploadFinished') != $.xljUtils.uploadStatus.finished) {
				$.xljUtils.tip('blue','附件正在上传，请稍后提交...');
				if (typeof callback === "function") {
					callback(false, {msg:'附件正在上传，请稍后提交...',code:$.xljUtils.uploadResultCode.uploadUnfinished,success:false});
				}
				return;
			}
			// 如果没有附件
			if (this.options.fileList.newList.length == 0) {
				if (typeof callback === "function") {
					callback(true, {msg:'没有要提交的附件信息',code:$.xljUtils.uploadResultCode.noSubmitData,success:false});
				}
				return;
			}
			$.ajax({
				url:this.options.serverAddr + 'univ/attachment/attachment/saveBatch',
				type:'POST',
				//async: this.options.isAsyncSubmit,
				contentType: "application/json",
				data:JSON.stringify(this.options.fileList.newList),
				dataType:"JSON",
				/*success:function(dt) {
					if (typeof callback === "function") {
						callback(true, dt);
					}
				},
				error:function(xhr){
					if (typeof callback === "function") {
						callback(false, xhr);
					}
				},*/
				complete:function(xhr,ts) {
					if (typeof callback === "function") {
						if (xhr.status == 200) {
							// 提交成功则清空文件信息
							if (xhr.responseJSON.success == true) {
								that.options.fileList.oldList = that.options.fileList.oldList.concat(that.options.fileList.newList);
								that.options.fileList.newList = [];
							}
							callback(true, xhr.responseJSON);
						} else {
							callback(false, $.extend(xhr,{code:$.xljUtils.uploadResultCode.uploadError}));
						}
					}
				}
			});
		},
		// 创建附件信息展示内容
		_createFileInfoEle: function(file) {
			var that = this;
			var fileType = '*.pdf;*.doc;*.ppt;*.xls;*.docx;*.pptx;*.xlsx;image/jpg,image/jpeg,image/png,image/gif';
			var filePreview= $('<div class="attachment-operation-group"><a href="javascript:void(0);" class="up_delete">删除</a></div>');
			if("url"==file.type||fileType.indexOf(file.name.substring(file.name.lastIndexOf(".")+1).toLowerCase())>-1) {
				filePreview = $('<div class="attachment-operation-group"><a href="javascript:void(0);" class="up_delete">删除</a><a href="javascript:void(0);" class="up_preview" style="display: none">预览</a></div>');
			}

			return $('<li/>').append(
				$('<img class="fileType"/>').attr('src', function() {
					if(file.name && /.docx?$/g.test(file.name)) {
						return that.options.serverAddr + 'univ/images/doc02.png';
					} else {
						return that.options.serverAddr + 'univ/images/doc03.png';
					}
				})
			).append(
				$('<div class="fileName"/>').append($('<p/>').text(file.name).attr('title',file.name))
					.append($('<p class="clearfix"/>')
						.append($('<div class="progress up_progress"/>')
							.append($('<div/>',{
									'class':'progress-bar progress-bar-info',
									role:'progressbar',
									'aria-valuemin':'0',
									'aria-valuemax':'100',
									style:'width:0%'
								}).append($('<span class="sr-only"/>').text('20% Complete'))
							)
						).append($('<span class="up_size"/>').text('0%'))
						.append($('<span class="up_status"/>').text('剩余时间：').append($('<i/>')))

					)
			).append(filePreview);
		},
		// 添加附件操作处理
		_fileAdd:function(e, data) {
			var that = this;
			var isNull = false;
			var isSingleUpload = this.options['singleUpload'] === true;

			// 如果为单附件上传，已存在文件的情况下，提示先删除既有文件，再执行选择附件
			if (isSingleUpload) {
				if (this.options.fileList.oldList.length > 0 || this.options.fileList.newList.length > 0) {
					$.xljUtils.tip('blue','请先删除当前附件，再重新选择附件');
					return;
				}
			}
			// 根据选择文件信息创建文件展示信息

			// 多附件上传，显示整体统计信息
			$.each(data.files, function (index, file) {
				// 文件校验
				//判断文件大小
				if(file.size<=0){
					isNull = true;
					$.xljUtils.tip('blue','不能上传空文件！');
					return false;
				}
				// 1、文件类型

				var fileLi = that._createFileInfoEle(file);
				if (isSingleUpload) {
					$('.up_files ul', that.$element).html(fileLi);
				} else {
					$('.up_files ul', that.$element).append(fileLi);
				}
				data.context = fileLi;
			});
			if(isNull){
				return false;
			}
			if (!isSingleUpload) {
				if ($('.totalstatus', that.$element).hasClass('hidden')) {
					$('.totalstatus', that.$element).removeClass('hidden');
				}
				// 隐藏上传完成后统计信息
				$('.up_info.done-total', that.$element).addClass('hidden');
			}

			that.$element.data('uploadFinished', $.xljUtils.uploadStatus.started);
			// 附件上传
			var jqXHR = data.submit()
				.success(function (result, textStatus, jqXHR) {
					// console.log(result);
				}).error(function (jqXHR, textStatus, errorThrown) {
					// console.log(errorThrown);
				}).complete(function (result, textStatus, jqXHR) {
					// console.log(result);
				});
			// 上传过程中删除事件处理
			data.context.find('.up_delete').on('click', function(e){
				var nodeParent = $(this).parent().parent().parent();
//				console.log('--- uploadedCount -- :' + that.options.fileList.uploadedCount);
				
				$(this).parent().parent().remove();
				if (!that.options.isSingleUpload) {
					// 附件全部删除，重置整体统计信息
					if (nodeParent.children('li').size()==0) {
						that.$element.data('uploadFinished', $.xljUtils.uploadStatus.finished);
						that._hideTotalProgressInfo();
					} else {
						// 删除该附件之后，重置整体进度
						if (that.options.fileList.uploadedCount == that.options.fileList.newList.length) {
							that.$element.data('uploadFinished', $.xljUtils.uploadStatus.finished);
							that._hideTotalProgressInfo();
						}
					}
				}
				jqXHR.abort();
				
			});

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
				// if(file.fileSize>10240000){
				//     alert("附件过大请下载后查看！");
				//     return false;
				// }
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
		// 隐藏整体进度信息
		_hideTotalProgressInfo:function() {
			$('.up_info .totalpercent', this.$element).text(0);
			$('.up_info .totalloaded', this.$element).text(0);
			$('.up_info .totalsize', this.$element).text(0);
			$('.up_total .progress-bar', this.$element).css('width', '0%');
			$('.totalstatus', this.$element).addClass('hidden');
		},

		// 从列表中删除元素
		_removeInfoFromFileList:function(fileInfo) {
			if (fileInfo === undefined || fileInfo == null) return;
			if (fileInfo.constructor === Object) {
				var deleted = false;
				for (var i = 0,tempList = this.options.fileList.oldList; i < tempList.length; i++) {
					if (tempList[i]['id'] === fileInfo['id']) {
						tempList.splice(i, 1);
						if (fileInfo.type=='file') {
							this.options.fileList.totalSize -= fileInfo.fileSize;
							this._setTotalSize();
						}
						return;
					}
				}

				for (var i = 0,tempList = this.options.fileList.newList; i < tempList.length; i++) {
					if (tempList[i]['id'] === fileInfo['id']) {
						tempList.splice(i, 1);
						if (fileInfo.type=='file') {
							this.options.fileList.totalSize -= fileInfo.fileSize;
							this._setTotalSize();
						}
						return;
					}
				}
			}
		},
		// 计算总文件大小
		_getTotalFileSize:function() {
			var total = 0;
			$.each(this.options.fileList.oldList, function(index, item){
				total += (item.fileSize != null?item.fileSize:0);
			});
			$.each(this.options.fileList.newList, function(index, item){
				total += (item.fileSize != null?item.fileSize:0);
			});
			return total;
		},

		// 绑定模态框提交事件
		_bindModalEvent:function() {
			var that = this;

			// 添加URL附件按钮click事件
			if (this.options.addUrlClickEvent && this.options.addUrlClickEvent instanceof Function) {
				$('.url-add-button', this.$element).on('click', this, this.options.addUrlClickEvent);
			} else {
				$('.url-add-button', this.$element).on('click', function(){

					var isSingleUpload = that.options['singleUpload'] === true;

					// 如果为单附件上传，已存在文件的情况下，提示先删除既有文件，再执行选择附件
					if (isSingleUpload) {
						if (that.options.fileList.oldList.length > 0 || that.options.fileList.newList.length > 0) {
							$.xljUtils.tip('blue','请先删除当前附件，再重新选择附件');
							return false;
						}
					}

					$('.attachment-modal', document.body).modal({show:true,backdrop:'static'});

					var $modalPrimaryBtn = $('.attachment-modal .btn-primary');
					// modalPrimaryBtn.off('click');
					// url上传
					$modalPrimaryBtn.unbind();
					$modalPrimaryBtn.on('click', function(){
						var urlName = $('.attachment-modal input[name="fullName"]').val();
						$('.attachment-modal input[name="name"]').val(urlName);

						// 将当前附件控件初始化时的 appId、businessId、categoryId 赋给URL表单
						$('.attachment-modal input[name="appId"]').val(that.options.appId);
						$('.attachment-modal input[name="businessId"]').val(that.options.businessId);
						$('.attachment-modal input[name="categoryId"]').val(that.options.categoryId);

						$.xljUtils.customSingleValidate($('.attachment-url-form')[0]);
						var validateFlag =  $('.attachment-url-form').valid();

						if(validateFlag){

							if (that._isExistUrlName(urlName)) {
								$.xljUtils.tip('blue','URL附件名称重复，请修改');
								return false;
							}
							that._submitUrlAttachment();
						}
					});
					return false;

				});
			}

		},
		// 验证url名称重复
		_isExistUrlName: function(urlName) {
			var that = this;
			var isExist = false;
			$.each(this.options.fileList.oldList, function(index, item){
				if (item.type == 'url' && item.fullName == urlName) {
					isExist = true;
					return false;
				}
			});
			if (isExist) return true;
			$.each(this.options.fileList.newList, function(index, item){
				if (item.type == 'url' && item.fullName == urlName) {
					isExist = true;
					return false;
				}
			});
			return isExist;
		},
		_submitUrlAttachment: function(oData, backCall) {
			var that = this;
			if (!oData) {
				oData = $('form.attachment-url-form').serializeObject();
			}

			var sSubmitUrl;
			if (that.options.autoSubmit === true) {
				sSubmitUrl = this.options.serverAddr + 'univ/attachment/attachment/save';
			} else {
				sSubmitUrl = this.options.serverAddr + 'univ/attachment/attachmentTemp/save';
			}

			var jStr = "{";
			for(var item in oData){
				if(item=="url"){
					if(oData[item].indexOf("?")>0){
						oData[item] = oData[item]+ "&attachmentUrl_id="+oData['id'];
					}else{
						oData[item] = oData[item]+ "?attachmentUrl_id="+oData['id'];
					}
				}
				jStr += "\""+item+"\":\""+oData[item]+"\",";
			}
			jStr = jStr.substring(0,jStr.length-1);
			jStr += "}";

			// 保存URL到数据库
			$.ajax({
				url:sSubmitUrl,
				type:'POST',
				contentType: "application/json",
				data:jStr,
				dataType:"JSON",
				async: false,
				success:function(dt) {
					// 回调函数
					if (backCall) {
						//var backFun = JSON.stringify(backCall);
						eval(backCall);
					}
					if (!that.options.addUrlClickEvent) {
						$('.attachment-modal input[name="id"]').val('');
						$('.attachment-modal', document.body).modal('hide');
						$('.attachment-modal .btn-primary').off('click');
					}

					var fileInfo = dt.result;

					// 显示URL附件信息

					//---------------------------------------------------------------------------
					var fileType = '*.pdf;*.doc;*.ppt;*.xls;*.docx;*.pptx;*.xlsx;image/jpg,image/jpeg,image/png,image/gif';
					var filePreview= '<div class="attachment-operation-group"><a href="javascript:void(0);" class="up_delete">删除</a></div>';
					if("url"==fileInfo.type||fileType.indexOf(fileInfo.fullName.substring(fileInfo.fullName.lastIndexOf(".")+1).toLowerCase())>-1) {
						filePreview = '<div class="attachment-operation-group"><a href="javascript:void(0);" class="up_delete">删除</a><a href="javascript:void(0);" class="up_preview" style="display: none">预览</a></div>';
					}

					var context = $.xljUtils.isEmpty(fileInfo.createDate)?'--':(fileInfo.createDate.length > 10?(fileInfo.createDate.substr(0,10)):(fileInfo.createDate))
					+ ', ' + $.xljUtils.replaceNull(fileInfo.createPersonName,'--');
					var fileLi = $('<li/>').append(
						$('<img class="fileType"/>').attr('src', that.options.serverAddr + 'univ/images/doc02.png')
					).append(
						$('<div class="fileName"/>').append(
							$('<p/>').text(oData.fullName)
								.attr('title',oData.fullName))
							.append(
								$('<p/>').text(context)
									.attr('title',context).append().append(
									$('<span class="up_status up_ok">'
										+ (dt.success?'上传完成':'上传失败')+'</span>')
								)
							)
					).append($(filePreview));

					if (isSingleUpload) {
						$('.up_files ul', that.$element).html(fileLi);
					} else {
						$('.up_files ul', that.$element).append(fileLi);
					}

					var timeoutId;
					timeoutId = setTimeout(function() {
						var doneStatus = fileLi.find('.fileName p .up_status');
						$(doneStatus).removeClass('up_ok');
						if (timeoutId) clearTimeout(timeoutId);
					}, 1000);

					var isSingleUpload = that.options['singleUpload'] === false;
					if(that.options.fileUploaded != null && that.options.fileUploaded.constructor === Function) {
						that.options.fileUploaded(fileInfo);
					}
					if (dt.success) {
						delete fileInfo.fileBytes;
						that.options.fileList.newList.push(fileInfo);
						//that.options.fileList.totalSize += fileInfo.fileSize;

						// 绑定附件下载或查看事件
						that._bindDownloadEvent(fileLi.find('.fileName p:eq(0)'), fileInfo);
						// 预览
						$('.up_files ul').find('.up_preview').css("display","block");
						that._bindPreviewEvent(fileLi.find('.up_preview'), fileInfo);

						fileLi.find('.fileName p:eq(0)').on('mouseover',function(){
							$(this).css({'cursor':'pointer','text-decoration':'underline'});
						}).on('mouseout',function(){
							$(this).css({'cursor':'','text-decoration':''});
						});

						fileLi.find('.up_delete').on('click', function(e) {
							$.ajax({
								url:that.options.serverAddr + 'univ/attachment/attachment/delete/'+fileInfo.id,
								type:'DELETE',
								dataType:'JSON',
								success:function(rs) {
									if (rs.success) {
										var nodeParent = fileLi.parent();
										fileLi.remove();

										if (that.options['singleUpload'] === false) {
											if (nodeParent.children('li').size()==0) {
												that._hideTotalProgressInfo();
											}
										}

										// 从附件列表信息中清除
										that._removeInfoFromFileList(fileInfo);

									} else {
										$.xljUtils.tip('red','附件删除失败');
									}
								},
								error:function(xhr){
									$.xljUtils.getError(xhr.status);
								}
							});
						});
					}
					// 上传失败
					else {
						fileLi.find('.up_delete').on('click', function(e) {
							var nodeParent = fileLi.parent();
							fileLi.remove();

							if (that.options['singleUpload'] === false) {
								if (nodeParent.children('li').size()==0) {
									that._hideTotalProgressInfo();
								}
							}

						});
					}
					//---------------------------------------------------------------------------

				},
				error:function(xhr){
					$.xljUtils.getError(xhr.status);
				}
			});
			return true;
		},

		// 附件控件初始化
		_init:function() {
			// appId, businessId, categoryId三项不能为空，否则页面初始化失败
			var chkMsg = this._initOptionsCheck();
			if (chkMsg != null) {
				$.xljUtils.tip('red',chkMsg + '，页面初始化失败');
				return null;
			}
			var that = this;
			// 预览模式不进行上传功能初始化
			if (this.options.mode === $.xljUtils.modeEnum.view || this.options.mode === $.xljUtils.modeEnum.table) {
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

					var downloadForm = $('<form action="' + that.options.serverAddr
						+'univ/attachment/attachment/downloadAll" method="post"/>')
						.append($('<input type="hidden" name="attListJson" value="'+ encodeURI(JSON.stringify(downloadInfos)) + '"/>'));

					var downloadFormContainer = $('<div style="width:0;height:0;"/>').appendTo('body');
					downloadFormContainer.append(downloadForm)
					downloadForm.submit();
					downloadFormContainer.remove();

				});

				if(this.options.mode === $.xljUtils.modeEnum.view) {
					// 绑定全选事件
					$('.file-choose-all-button', that.$element).click(function(){
						$(':checkbox.file-check', that.$element).each(function(i){
							this.checked = true;
						});
					});
					// 绑定反选事件
					$('.file-reverse-choose-button', that.$element).click(function(){
						$(':checkbox.file-check', that.$element).each(function(i){
							this.checked = !this.checked;
						});
					});
				}
				// 表格显示附件列表
				else {
					// 绑定全选事件
					$(':checkbox.check-all', that.$element).change(function(){
						var chkValue = this.checked;

						$(':checkbox.file-check', that.$element).each(function(i){
							this.checked = chkValue;
						});

					});
				}

				return this.$element;
			}

			var uploadSubmitUrl;
			if (that.options.autoSubmit === true) {
				uploadSubmitUrl = this.options.serverAddr + 'univ/attachment/attachment/upload';
	    	} else {
	    		uploadSubmitUrl = this.options.serverAddr + 'univ/attachment/attachmentTemp/chunkUpload';
	    	}
			// 判断IE版本
//			var _dataType = 'json';
//			if(navigator.userAgent.indexOf('MSIE 9.') != -1) {
//                _dataType = 'text';
//            }

			var $this = $('.fileupload', this.$element).fileupload({
			    url: uploadSubmitUrl,
			    //forceIframeTransport:true,
			    progressInterval: 100,
			    maxChunkSize: 5 * 1000 * 1000,
			    maxRetries: 100,
			    retryTimeout: 1000,
			    dataType: 'json',
			    formData:{appId:this.options.appId, businessId:this.options.businessId,categoryId:this.options.categoryId, type:'file', chunkSize:5 * 1000 * 1000},
			    autoUpload: false,
			    acceptFileTypes: /\.(gif|jpe?g|png|zip|rar|docx?|xlsx?)$/i,
			    maxFileSize: 102400000
			}).on('fileuploadadd', function (e, data) {
				if(data.files[0].size>=102400000){
					$.xljUtils.tip('red','上传附件超过最大100M限制,不能上传!');
					return false;
				}
				// 添加文件
				that._fileAdd(e, data);
				var node = $(data.context);
				if(that.isIE()){
					var progress = 9;
					var progressWidth = 0;
					var interval = setInterval(function() {
						progressWidth = node.find('.progress .progress-bar').css('width');
						if(progress > 90||progressWidth =='100%'){
							clearInterval(interval);
						}
						node.find('.progress .progress-bar').css('width', progress + '%');
						// 上传百分比进度
						node.find('.up_size').text(progress + '%');
						progress+=10;
					}, 1000);
				}
			}).on('fileuploadprocessalways', function (e, data) {
				// console.log('fileuploadprocessalways');
			}).on('fileuploadprogress', function (e, data) {
				// console.log('fileuploadprogress start ');
			    var node = $(data.context);

			    var progress = parseInt(data.loaded / data.total * 100, 10);
			    node.find('.progress .progress-bar').css('width', progress + '%');
			    // 上传百分比进度
			    node.find('.up_size').text(progress + '%');
			    // 剩余时间
			    if (data.bitrate != 0) {
			    	node.find('.up_status i').text($.xljUtils.formatTime(((data.total - data.loaded)*8)/data.bitrate));
			    }
			    
			}).on('fileuploadchunkdone', function (e, data) {
//				console && console.log('---b--- fileuploadchunkdone\n');
//				console.log(data);
				var fileId = data.result && data.result.result && data.result.result.id;
				var node = $(data.context);
				node.data('currentFileId', fileId);
				data.formData.currentFileId = fileId;
				data.context.data('uploadedBytes', data.uploadedBytes);
			}).on('fileuploaddone', function (e, data) {
				// console.log('fileuploaddone');
				var node = $(data.context);
				var resultData = data.result;
			    node.find('.progress').parent().remove();
			    node.find('.fileName').append($('<p/>')
//			    	.text(that._showTotalSize(data.files[0].size))
			    	//that._showTotalSize(data.files[0].size)
			    	.append($('<span class="up_status up_ok">'+(resultData.success?'上传完成':'上传失败')+'</span><span>' + that._showTotalSize(data.result.result[0].fileSize) + '</span>')));
			    
			    if (that.options.singleUpload == true) {
					that.$element.data('uploadFinished', $.xljUtils.uploadStatus.finished);
				} else {
					if (that.$element.data('uploadFinished') == $.xljUtils.uploadStatus.progress100) {
						that.$element.data('uploadFinished',$.xljUtils.uploadStatus.finished);
					}
				}
			    var timeout = null;
			    timeout = setTimeout( function() {
			    	var doneStatus = node.find('.fileName p .up_status');
					$(doneStatus).removeClass('up_ok');
					if (timeout) {
						clearTimeout(timeout);
						// console.log('clearTimeout:' + timeout)
					}
				}, 1000);
			    node.find('.up_delete').off();
			    var isSingleUpload = that.options['singleUpload'] === false;
				if (resultData.success) {
					var fileInfo = $.extend({}, resultData.result[0]);
					delete fileInfo.fileBytes;
					that.options.fileList.newList.push(fileInfo);
					that.options.fileList.totalSize += fileInfo.fileSize;
					
					that.options.fileList.uploadedCount += 1;
//					console.log('--- uploadedCount -- :' + that.options.fileList.uploadedCount);
					
					that._setTotalSize();
					// 上传完成回调
					if(that.options.fileUploaded != null && that.options.fileUploaded.constructor === Function) {
						that.options.fileUploaded(fileInfo);
					} else {
						
					}
					
					// 绑定附件下载或查看事件
					that._bindDownloadEvent(node.find('.fileName p:eq(0)'), fileInfo);
					
					node.find('.fileName p:eq(0)').on('mouseover',function(){
						$(this).css({'cursor':'pointer','text-decoration':'underline'});
					}).on('mouseout',function(){
						$(this).css({'cursor':'','text-decoration':''});
					});
			        
					node.find('.up_delete').on('click', function(e) {
			        	$.ajax({
			        		url:that.options.serverAddr + 'univ/attachment/attachment/deletefile',
			        		type:'POST',
			        		dataType:'JSON',
			        		contentType:'application/json',
			        		data:JSON.stringify(fileInfo),
			        		success:function(rs) {
			        			if (rs.success) {
			        				// console.log("..................delete success")
			        				var nodeParent = node.parent();
			        				node.remove();

			        				that.options.fileList.uploadedCount -= 1;
			        				
			        				// 从附件列表信息中清除
			        				that._removeInfoFromFileList(fileInfo);
			        				//that._setTotalSize();
			        				if (that.options['singleUpload'] === false) { 
				        				if (nodeParent.children('li').size()==0) {
				        					that._hideTotalProgressInfo();
				                		}
			        				}
			        				
			        			} else {
			        				$.xljUtils.tip('red','附件删除失败');
			        			}
			        		},
			        		error:function(xhr){
			        			$.xljUtils.getError(xhr.status);
			        		}
			        	});
			        });
					// 预览
					node.find('.up_preview').css("display","block");
					that._bindPreviewEvent(node.find('.up_preview'), resultData.result[0])
				}
				// 上传失败
				else {
					node.find('.up_delete').on('click', function(e) {
						var nodeParent = node.parent();
			    		node.remove();
			    		
			    		if (that.options['singleUpload'] === false) { 
	        				if (nodeParent.children('li').size()==0) {
	        					that._hideTotalProgressInfo();
	                		}
        				}
			    		
			        });
				}
				
			}).on('fileuploadfail', function (e, data) {
				var fu = $(this).data('blueimp-fileupload') || $(this).data('fileupload'),
		            retries = data.context.data('retries') || 0,
		            retry = function () {
//		                $.getJSON(that.options.serverAddr + 'univ/attachment/attachmentTemp/getUploadedSize', {fileName: data.files[0].name, fileId:$(data.context).data('currentFileId')})
//		                    .done(function (result) {
//		                        var file = result.file;
//		                        data.uploadedBytes = file && file.size;
//		                        // clear the previous data:
//		                        data.data = null;
//		                        data.submit();
//		                    })
//		                    .fail(function () {
//		                        fu._trigger('fail', e, data);
//		                    });
						data.uploadedBytes = data.context.data('uploadedBytes') || 0;
//						console.log('---- retry ---- ' + data.uploadedBytes);
						data.data = null;
						data.submit();
		            };
		        if (data.errorThrown !== 'abort' && data.uploadedBytes < data.files[0].size &&
		                retries < fu.options.maxRetries) {
		            retries += 1;
		            data.context.data('retries', retries);
		            window.setTimeout(retry, retries * fu.options.retryTimeout);
		            return;
		        }
		        data.context.removeData('retries');
//		        $.blueimp.fileupload.prototype
//		            .options.fail.call(this, e, data);
				
			}).on('fileuploadfinished', function (e, data) {
				// console.log('fileuploadfinished start 3');
			}).on('fileuploadcompleted', function (e, data) {
				// console.log('fileuploadcompleted start 2');
			}).on('fileuploadfailed', function (e, data) {
				// console.log('fileuploadprogress start 1 ');
			}).prop('disabled', !$.support.fileInput)
			        .parent().addClass($.support.fileInput ? undefined : 'disabled');
			// 多附件上传绑定整体进度
			if (that.options['singleUpload'] === false) {
				$this.on('fileuploadprogressall', function (e, data) {
					// console.log('fileuploadprogressall');
					var progress = parseInt(data.loaded / data.total * 100, 10);
			    	$('.up_info .totalpercent', that.$element).text(progress);
			    	$('.up_info .totalloaded', that.$element).text($.xljUtils.formatFileSize(data.loaded));
			    	$('.up_info .totalsize', that.$element).text($.xljUtils.formatFileSize(data.total));
			    	$('.up_total .progress-bar', that.$element).css('width', progress + '%');
			    	
			    	if (data.loaded == data.total) {
						// console.log('fileuploadprogressall 100%');
			    		// 隐藏总进度条
			    		$('div.progress.up_total.totalstatus', that.$element).addClass('hidden');
						that.$element.data('uploadFinished', $.xljUtils.uploadStatus.progress100);
			    		// 显示总统计信息
			    		$('.up_info:not(.done-total)', that.$element).addClass('hidden');
			    		$('.done-total', that.$element).removeClass('hidden');
			    	}
				});
			}
			return this.$element;
		},
		_setTotalSize: function() {
			if(this.options.singleUpload == false) {
				$('.up_info.done-total', this.$element).text(
					'(上传完成，总文件大小' + this._showTotalSize() + ')'
				).removeClass('hidden');
			}
		},
		_showTotalSize: function(sizeValue) {
			if (sizeValue === undefined) sizeValue = this.options.fileList.totalSize;
			return $.xljUtils.replaceNull($.xljUtils.formatFileSize(sizeValue,'--'));
		},
		//判断是否是IE浏览器及版本
		isIE:function(){
			var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
			var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
			var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
			if(isIE){
				var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
				reIE.test(userAgent);
				var fIEVersion = parseFloat(RegExp["$1"]);
				if(fIEVersion < 10){
					return true;
				}else{
					return false;
				}//IE版本过低
			}else{
				return false;
			}
		}
	};
	var xljAtts = {};
	$.fn.extend({
		/**
		 * 根据选择器初始化附件控件
		 * @param {object} options 至少包含三个选项：appId, businessId, categoryId
		 */
		xljAttachment: function(options){
			
			xljAtts[this.selector] = new XljAttachment(this, options);
			
			// appId, businessId, categoryId都不能为空，否则不进行控件初始化
			var chkMsg = xljAtts[this.selector]._initOptionsCheck();
			if (chkMsg != null) {
				$.xljUtils.tip('red','附件上传组件初始化失败：<br>' + chkMsg);
				return this;
			}
			
			// 添加附件控件HTML到页面
			xljAtts[this.selector]._createAttachmentModal();
			xljAtts[this.selector]._init();
			
			
			
			// 表单非新增模式下，查询附件信息
			if (xljAtts[this.selector].options.mode !== $.xljUtils.modeEnum.add) {
				xljAtts[this.selector]._queryList();
			}
			
			// 编辑模式下
			if (xljAtts[this.selector].options.mode !== $.xljUtils.modeEnum.view) {
				// 初始化url上传模态框表单隐藏域
				// $('.attachment-modal input[name="appId"]').val(xljAtts[this.selector].options.appId);
				// $('.attachment-modal input[name="businessId"]').val(xljAtts[this.selector].options.businessId);
				// $('.attachment-modal input[name="categoryId"]').val(xljAtts[this.selector].options.categoryId);
				
				// 绑定模态窗口提交事件
				xljAtts[this.selector]._bindModalEvent();
			}
			
			return this;
		},
		// 附件信息提交
		xljAttachmentSubmit:function(callback) {
			// 附件控件是直接提交模式，则不执行整体附件信息提交
			if (xljAtts[this.selector].options.autoSubmit === true) {
				if (typeof callback == 'function') {
					callback(true, {msg:'',code:$.xljUtils.uploadResultCode.autoSubmited, success:true});
				}
				return this;
			}

			// appId, businessId, categoryId都不能为空，否则不进行表单提交
			var chkMsg = xljAtts[this.selector]._initOptionsCheck();
			if (chkMsg != null) {
				$.xljUtils.tip('red',chkMsg);
				if (typeof callback == 'function') {
					callback(false, {msg:'',code:$.xljUtils.uploadResultCode.checkError, success:false});
				}
				return this;
			}
			xljAtts[this.selector]._submit(callback);
			return this;
		},
		// 查询附件列表信息
		xljAttachmentQueryList: function() {
			xljAtts[this.selector]._queryList();
			return this;
		},
		
		// 初始化检查
		initOptionsCheck:function() {
			var msg = xljAtts[this.selector]._initOptionsCheck();
			if (msg != null) {
				$.xljUtils.tip('red',msg);
				return false;
			}
			return true;
		},
		// 取得文件信息列表
		getFileList:function() {
			return xljAtts[this.selector].options.fileList.oldList.concat(xljAtts[this.selector].options.fileList.newList);
		},
		// 取得文件信息列表文件数量大小
		getFileCount:function() {
			return this.getFileList().length;
		},
		serializeObject:function(){
	        var serializeObj = {};
	        var array = this.serializeArray();
	        $(array).each(function() {
	            if (serializeObj[this.name]) {
	                if ($.isArray(serializeObj[this.name])) {
	                    serializeObj[this.name].push(this.value);
	                } else {
	                    serializeObj[this.name] = [serializeObj[this.name],this.value];
	                }
	            } else {
	                serializeObj[this.name]=this.value;    
	            }
	        });
	        return serializeObj;
	    }
	});
	
})(jQuery, window, document);

