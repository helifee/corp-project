
function Attachment(){
	this.containerSelecter = null;
	this.appId = null;
	this.businessId = null;
	this.categoryId = null;
	this.serverAddr = null;
	this.files = null;
}

Attachment.prototype = {
	contructor : Attachment,
	setParameters:function(containerSelecter, appId, businessId, categoryId, serverAddr) {
		this.containerSelecter = containerSelecter;
		this.appId = appId;
		this.businessId = businessId;
		this.categoryId = categoryId;
		this.serverAddr = serverAddr;
		return this;
	}
	
	,formatFileSize : function(bytes) {
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
	}

	,
	formatTime : function(seconds) {
		var date = new Date(seconds * 1000), days = Math.floor(seconds / 86400);
		days = days ? days + 'd ' : '';
		return days + ('0' + date.getUTCHours()).slice(-2) + ':'
				+ ('0' + date.getUTCMinutes()).slice(-2) + ':'
				+ ('0' + date.getUTCSeconds()).slice(-2);
	}
}

Attachment.prototype.submit = function(){
	$.ajax({
		url:attachment.serverAddr + 'attachment/save',
		type:'POST',
		contentType: "application/json",
		data:JSON.stringify(attachment.files[0]),
		dataType:"JSON",
		success:function(dt) {
    		console.log("..................save fileinfo success")
		},
		error:function(){
			console.log("..................save fileinfo  error");
		}
	});
}

Attachment.prototype.initAttachment = function(appId, businessId, categoryId){
	attachment.setParameters(null, appId,businessId ,categoryId, "http://10.17.3.72:8080/platform-app/univ/attachment/").init();
}

//Attachment.prototype.initList = function(appId, businessId, categoryId){
//	attachment.setParameters(null, appId,businessId ,categoryId, "http://10.17.3.72:8080/platform-app/univ/attachment/").queryList();
//}

// 查询附件
Attachment.prototype.queryList = function(appId, businessId, categoryId) {
	attachment.setParameters(null, appId,businessId ,categoryId, "http://10.17.3.72:8080/platform-app/univ/attachment/");
	$.ajax({
		url:attachment.serverAddr + 'attachment/queryList',
		type:'POST',
		contentType: "application/json",
		data:JSON.stringify({appId: appId, businessId: businessId, categoryId:categoryId}),
		dataType:"JSON",
		success:function(dt) {
			
			 $.each(dt.result, function (index, file) {
				var fileLi = $('<li/>').append(
						$('<img class="fileType"/>').attr('src', function() {
							if(file.fullName && /.docx?$/g.test(file.fullName)) {
								return '../images/doc02.png';
							} else {
								return '../images/doc03.png';
							}
						})
				).append(
					$('<div class="fileName"/>').append($('<p/>').text(file.fullName))
					.append($('<p/>').text(attachment.formatFileSize(file.fileSize)))
				).append($('<a href="javascript:void(0);" class="up_delete">删除</a>'));
		    	$('.up_files ul').append(fileLi);
		    	
		    	// 下载
		    	fileLi.find('.fileName p:eq(0)').on('click',function() {
					$.post(attachment.serverAddr + 'attachment/getStorageIP', 
							{filePath:file.path},
							function(ip){ 
								console.log(ip);
								if (ip)
									//window.location.href = "http://"+ip+":8080/" + data.result.result[0].path;
									window.open("http://"+ip+":8080/" + file.path,"_blank");
							}
						);
				});
		    	fileLi.find('.fileName p:eq(0)').on('mouseover',function(){
					$(this).css({'cursor':'pointer','text-decoration':'underline'});
				}).on('mouseout',function(){
					$(this).css({'cursor':'','text-decoration':''});
				});
			});
			
    		console.log("..................save fileinfo success");
    		
		},
		error:function(){
			console.log("..................save fileinfo  error");
		}
	});
}
Attachment.prototype.init = function() {
	var self = this;
	var url = this.serverAddr + 'attachment/';
	$('#fileupload').fileupload({
	    url: this.serverAddr + 'attachmentTemp/upload',
	    dataType: 'json',
	    formData:{appId:this.appId, businessId:this.businessId},
	    autoUpload: false,
	    acceptFileTypes: /(\.|\/)(gif|jpe?g|png|zip|rar|docx?|xlsx?)$/i,
	    maxFileSize: 1000000000
	}).on('fileuploadadd', function (e, data) {
		console.log('fileuploadadd');
		
	    $.each(data.files, function (index, file) {
		var fileLi = $('<li/>').append(
				$('<img class="fileType"/>').attr('src', function() {
					if(file.name && /.docx?$/g.test(file.name)) {
						return '../images/doc02.png';
					} else {
						return '../images/doc03.png';
					}
				})
		).append(
			$('<div class="fileName"/>').append($('<p/>').text(file.name))
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
		).append($('<a href="javascript:void(0);" class="up_delete">删除</a>'));
	    	$('.up_files ul').html(fileLi);
        data.context = fileLi;
	    });
	    var jqXHR = data.submit();
	    data.context.find('.up_delete').on('click', function(e){
	    	console.log("------------------delete ---")
	    	jqXHR.abort();
	    	var nodeParent = $(this).parent().parent();
	    	$(this).parent().remove();
	    });
	}).on('fileuploadprocessalways', function (e, data) {
		console.log('fileuploadprocessalways');
	}).on('fileuploadprogress', function (e, data) {
		console.log('fileuploadprogress start ');
	    var node = $(data.context);
		
	    var progress = parseInt(data.loaded / data.total * 100, 10);
	    node.find('.progress .progress-bar').css('width', progress + '%');
	    // 上传百分比进度
	    node.find('.up_size').text(progress + '%');
	    //console.log('data.total:' + data.total + ' data.loaded:' + data.loaded + ' data.bitrate:' + data.bitrate);
	    // 剩余时间
	    node.find('.up_status i').text(self.formatTime(((data.total - data.loaded)*8)/data.bitrate));
	    
	}).on('fileuploadprogressall', function (e, data) {
		console.log('fileuploadprogressall');
		
	}).on('fileuploaddone', function (e, data) {
		console.log('fileuploaddone');
		var node = $(data.context);
	    node.find('.progress').parent().remove();
	    node.find('.fileName').append($('<p/>').text(self.formatFileSize(data.files[0].size)).append($('<span class="up_status up_ok">'+(data.result.success?'上传完成':'上传失败')+'</span>')));
	    var timeout = null;
	    timeout = setTimeout( function() {
	    	var doneStatus = node.find('.fileName p .up_status');
			$(doneStatus).removeClass('up_ok');
			if (timeout) {
				clearTimeout(timeout);
				console.log('clearTimeout:' + timeout)
			}
		}, 1000);
	    node.find('.up_delete').off();
	    
		if (data.result.success) {
			console.log(data.result.result)
			self.files = data.result.result;
			
			// 下载
			node.find('.fileName p:eq(0)').on('click',function() {
				$.post(url + "getStorageIP", 
						{filePath:data.result.result[0].path},
						function(ip){ 
							console.log(ip);
							if (ip)
								//window.location.href = "http://"+ip+":8080/" + data.result.result[0].path;
								window.open("http://"+ip+":8080/" + data.result.result[0].path,"_blank");
						}
					);
			});
			node.find('.fileName p:eq(0)').on('mouseover',function(){
				$(this).css({'cursor':'pointer','text-decoration':'underline'});
			}).on('mouseout',function(){
				$(this).css({'cursor':'','text-decoration':''});
			});
	        node.find('.up_delete').on('click', function(e) {
	        	$.ajax({
	        		url:url + 'deletefile',
	        		type:'POST',
	        		dataType:'JSON',
	        		contentType:'application/json',
	        		data:JSON.stringify(data.result.result[0]),
	        		success:function(rs) {
	        			if (rs.success) {
	        				console.log("..................delete success")
	        				var nodeParent = node.parent();
	        				node.remove();
	        			} else {
	        				console.log("..................delete failed");
	        			}
	        		},
	        		error:function(){
	        			console.log("..................delete error");
	        		}
	        	});
	        });
		} else {
			node.find('.up_delete').on('click', function(e) {
				var nodeParent = node.parent();
	    		node.remove();
	        });
		}
		
	}).on('fileuploadfail', function (e, data) {
		console.log('fileuploadfail');
	}).prop('disabled', !$.support.fileInput)
	        .parent().addClass($.support.fileInput ? undefined : 'disabled');
}

var attachment = new Attachment();
$(function () {
//	attachment.initAttachment('1', '122', '1');
//	$('.testsubmit').click(function(){
//		attachment.submit();
//	});
	attachment.queryList('1', '122', '1');
	
});
