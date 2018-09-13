+function($,window) {
	var isLoading = true;
	// ajax请求处理
	$(document).ajaxSend(onSend).ajaxStart(onStart).ajaxComplete(onComplete)
			.ajaxSuccess(onSuccess).ajaxError(onError);
	function onSend(event, request, settings) {
	}
	function onStart(event) {
		// 显示加载进度条
		if(isLoading){
			$('body').mask("正在操作，请稍侯！");
		}
	}
	
	function onComplete(event, xhr, settings) {
		// 隐藏加载进度条
		if(isLoading){
			$('body').unmask();
		}
	}
	
	function onSuccess(event, xhr, settings) {
	}
	
	function onError(event, xhr, settings, errorThrown) {
		//if(console && console.error){
			//console.error(e);
		//}
		//console.log(event,xhr,errorThrown);
	}
	
	function validate(key,value){
		var returnObj = {
			'status' : true,
			'errorMsg':''
		}
		var methods = {
			"require" : function(){
				if(!value){
					return returnObj;
				}
				var status = this.val() && $.trim(this.val()),errorMsg;
				
				if(!status){
					errorMsg = this.attr('require-msg');
				}
				return {
					'status' : !!status,
					'errorMsg' : errorMsg
				};
			},
			"length" : function(){
				var status = this.val().length == value,errorMsg;
				if(!status){
					errorMsg = this.attr('format-msg');
				}
				return {
					'status' : status,
					'errorMsg' : errorMsg
				};
			},
			"format" : function(){
				var dataRequire = this.data('require');
				var currVal = $.trim(this.val());
				if(!dataRequire && !currVal){
					return returnObj;
				}
				var reg = new RegExp(value),errorMsg;
				
				var status = reg.test(this.val());
				if(!status){
					errorMsg = this.attr('format-msg');
				}
				return {
					'status' : status,
					'errorMsg' : errorMsg
				};
			},
			"requireCondition" : function(){
				var targetId = this.attr('target'),targetVal = this.attr('target-value'),operateType = this.attr('target-operate'),status,errorMsg;
				switch(operateType) {
					case "equals" : 
					if($('#'+targetId).val() == targetVal){

						status = this.val() && $.trim(this.val());
						
						if(!status){
							errorMsg = this.attr('require-msg');
						}
						
						return {
							'status' : status,
							'errorMsg' : errorMsg
						};
					}
					break;
				}
				return returnObj;
			},
			"formatCondition" : function(){
				var targetId = this.attr('target'),targetVal = this.attr('target-value'),operateType = this.attr('target-operate'),status,errorMsg;
				switch(operateType) {
					case "equals" : 
					if($('#'+targetId).val() == targetVal){

						var reg = new RegExp(value),errorMsg;
						
						var status = reg.test(this.val());
						
						if(!status){
							errorMsg = this.attr('format-msg');
						}
						return {
							'status' : status,
							'errorMsg' : errorMsg
						};
					}
					break;
				}
				return returnObj;
			}
		};
		
		if(methods[key]){
			
			return methods[key].call(this,key);
		}else{
			return returnObj;
		}
	};

	$(document).on('click',"input[name^='checkAll_'][type='checkbox']",function(){
		$("input[name='"+$(this).data('checkitem')+"']").prop('checked',$(this).prop('checked'));
	});
	
	$(document).on('click',"input[name^='checkItem_'][type='checkbox']",function(){
		var checked = $("input[name='"+$(this).attr("name")+"']").length === $("input[name='"+$(this).attr("name")+"']:checked").length;
		$("input[name='"+$(this).data('checkall')+"']").prop('checked',checked);
	});
	
	$(document).on('click',"a[name^='downloadAll_']",function(){
		var arrUploadId = [];
		$("input[name='"+$(this).data('checkitem')+"']:checked").each(function(){
			arrUploadId.push($(this).data('id'));
		});
		if(arrUploadId.length === 0){
			alert('请选择下载的文件');
			return false;
		}
		var $form = $("#"+$(this).data('form'));
		$form.attr('action',"File!downloadChooseZip.do?uids="+arrUploadId.join());
		$form.submit();
	});
	
	/**
	 * 打开模式窗口
	 * @param url
	 * @param vArguments
	 * @param sFeatures
	 */
	function showModalDialogOverride(url,vArguments,sFeatures){
		return window.showModalDialog(url,vArguments,calcShowModalDialogLocation(sFeatures.dialogWidth,sFeatures.dialogHeight,sFeatures.scroll))
	}

	/**
	 * 计算模式窗口位置
	 * @param dialogWidth
	 * @param dialogHeight
	 * @returns {String}
	 */
	function calcShowModalDialogLocation(dialogWidth, dialogHeight,scroll) {
	    var iWidth = dialogWidth;
	    var iHeight = dialogHeight;
	    var scroll = scroll;
	    if(scroll=='' || scroll==null){
	    	scroll = 'no';
	    }
	    var iTop = (window.screen.availHeight - 20 - iHeight) / 2;
	    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
	    return 'dialogWidth:' + iWidth + 'px;dialogHeight:' + iHeight + 'px;dialogTop: ' + iTop + 'px; dialogLeft: ' + iLeft + 'px;center:yes;scroll:'+scroll+';status:no;resizable:0;location:no';
	}
	
	function startValidate(){
		var startPostId = $('#startPostId').val();
		if(!startPostId){
			alert('请选择发起岗位！');
			return false;
		}
		var noteType = $('#opCode').data('notetype');
		var userNote = $('#userNote').val();
		if(noteType == 2 && !$.trim(userNote)){ //意见必填项标识
			alert("请填写处理意见");
			return false;
		}
		// 判断责任人是否为空
		var isResponsiblePersonNull = false;
	   
		$('#approvalHistoryHtml tr').each(function(){
			var isNeedValidate = $(this).find("td[data-participantsnamevalidate]").data('participantsnamevalidate');
			if(!!isNeedValidate){
				var responsiblePerson = $(this).find("td[data-participantsnamevalidate]").html();
				
				responsiblePerson=responsiblePerson.replace("(","").replace(")","");
				var existLable=$(responsiblePerson).find("label[name='currentDealPerson']").length;
			
				if(existLable==0){
					//判断2种情况 ，,一种不包label
					if(!$.trim(responsiblePerson)){
						isResponsiblePersonNull = true;
						return false;
					}
				}else{
					//一种包含lable,如果当前的label没有，在继续查看添加的lable
					var tempZone=responsiblePerson;
					responsiblePerson= $(tempZone).find("label[name='currentDealPerson']").html();
					if(!$.trim(responsiblePerson)){
						var addResponsiblePerson= $(tempZone).find("label[id^='participantsName']").html();
						if(!$.trim(addResponsiblePerson)){
							isResponsiblePersonNull = true;
							return false;
						}
					}
				}
			}
		});
	
		
		if(isResponsiblePersonNull){
			var result = confirm('有责任人为空是否需要提交,如果不需要提交可以联系管理员。');  
			return result;
		}
		return true;
	}
	
	function approveValidate(){
		var opCode = $('dd.selected').data('code');
		if(!opCode){
			alert("请选择操作！");
			return false;
		}
		if(opCode === 'XB' || opCode === 'ZB'){
			
			var dealUserNames = $('#dealUserNames').val();
			var dealUserIds = $('#dealUserIds').val();
			
			if(!dealUserNames || !dealUserIds){
				alert("请选择操作人！");
				return false;
			}
		}
		
		var noteType = $('dd.selected').data('notetype');
		var userNote = $('#userNote').val();
		if(noteType == 2 && !$.trim(userNote)){ //意见必填项标识
			alert("请填写处理意见");
			return false;
		}
		return true;
	}
	
	var showCuiBan = function(fiId){
		var width = 1000;
		var height = 600;
		var scroll = 'yes';
		var url = "FlowInstanceManager!showCuiBan.do?fiId=" + fiId;
	    var dt = new Date().getTime();
	    if(url!=null&&url.indexOf('dt')<0){
	        if(url.indexOf('?')>-1){
	        	url += "&dt="+dt;
	        }else{
	        	url += "?dt="+dt;
	        }
	    }
	    var returnValue = window.showModalDialog(url,self,calcShowModalDialogLocation(width, height, scroll));
	}
	
	function replaceCurrentApproval(fiId){
		var url = "FlowInstanceManager!forwardReplaceCurrentApproval.do";

    	var sFeatures = {
    		dialogWidth : 1500,
    		dialogHeight : 600
    	};
    	
    	url += "?fiId=" + fiId;
    	var rv = smFlowInstance.showModalDialogOverride(url, window, sFeatures);
		if(window.location){
			window.location.reload();
		}
	}
	
	function addCurrentApprovalPerson(fiId,tokenId){
		var url = "FlowInstanceManager!forwardAddCurrentApprovalPerson.do";

    	var sFeatures = {
    		dialogWidth : 1500,
    		dialogHeight : 600
    	};
    	
    	url += "?fiId=" + fiId+"&tokenId="+tokenId;
    	var rv = smFlowInstance.showModalDialogOverride(url, window, sFeatures);
		if(window.location){
			window.location.reload();
		}
	}
	
	
	function selectParticipantByDomOp(minCount,userIdDomId, userNameDomId,isNotInput){
    	var selectedUserIds = $("#"+userIdDomId).val();
    	var url = "Orgn!index.do";
    	var dto = {
    		"minCount":minCount,
    		"maxCount":smFlowInstance.maxUserCount,
    		"needBackUserInfo" : 1,
    		"selectedUserQueryMethod":"findByRoleId",
    		"selectedUserIds" : selectedUserIds
    	}
    	var sFeatures = {
    		dialogWidth : 1000,
    		dialogHeight : 600
    	};
    	
    	url += "?paramJsonStr=" + encodeURI(JSON.stringify(dto));
    	var rv = smFlowInstance.showModalDialogOverride(url, window, sFeatures);
    	if(rv){
    		var result = $.parseJSON(decodeURI(rv));
        	getUserInfo(userIdDomId, userNameDomId,result,isNotInput);
    	}
    	return result;
    }
    function getUserInfo(userIdDomId, userNameDomId,userInfo,isNotInput) {
    	var selectIds = "";
    	var selectNames = "";
    	if(userInfo && userInfo.length>0){
    		for(var i=0;i<userInfo.length;i++){
    			selectIds += userInfo[i].userid + ((i == userInfo.length-1) ? "" : ",");
    			selectNames += userInfo[i].username + ((i == userInfo.length-1) ? "" : ";");
    		}
    	}
    	if (selectIds){
    		$("#"+userIdDomId).val(selectIds);
    		if(userNameDomId){
    			if(isNotInput){
    				$("#"+userNameDomId).html(";"+selectNames);
    			}else{
    				$("#"+userNameDomId).val(selectNames);
    			}
    			
    		}
    	}else{
    		$("#"+userIdDomId).val(selectIds);
    		if(userNameDomId){
    			if(isNotInput){
    				$("#"+userNameDomId).html(selectNames);
    			}else{
    				$("#"+userNameDomId).val(selectNames);
    			}
    		}    		
    	}
    }
    
    function getReloadUrl(url){
    	if(url.lastIndexOf('#')>0){
    		url = url.substring(0,url.length-1);
    	}
    	if(url.indexOf('?')>0){
              url+=("&t="+Math.random());
        }else{
             url+=("?t="+Math.random());
        }
    	return url;
    }
    
    function dealCloseWindowWin(wOpener){
    	if(!wOpener || !wOpener.top){
    		return;
    	}
    	var openerHref = wOpener.location.href;
    	//打开审批页面为"首页-待办"
    	if(openerHref.indexOf("App!desktop1.do")>-1){
    		wOpener.top.location.href = getReloadUrl(wOpener.top.location.href);
    		//window.close();
    	}
    	/*//打开审批页面为"首页-预警"
    	else if(openerHref.indexOf("App!desktop2.do")>-1){
    		wOpener.top.location.href = getReloadUrl(wOpener.top.location.href);
    		top.close();
    	}
    	//打开审批页面为"清标界面"
    	else if(openerHref.indexOf("clear!itemSelect.do")>-1){
    		wOpener.opener.location.href = wOpener.opener.location.href;
    		window.opener.close();
    		top.close();
    	}
    	//打开审批页面为"招标方案管理"
    	else if(openerHref.indexOf("gc_blue_print!view.do")>-1){
    		wOpener.opener.location.href = wOpener.opener.location.href;
    		wOpener.close();
    		top.close();
    	}
    	else{
    		wOpener.location.href = getReloadUrl(wOpener.location.href);
    		top.close();
    	}*/
    }
    var callBack = $.Callbacks("once memory");

	var itemHtml = "<tr id='\${fileID}'>"
		  +	  "<td>\${fileName}</td><td colspan='2'><span class='progressbar'><!--Progress Bar--></span><span class='data'></span></td></tr>";
	
	function reloadUpload(){
		var ownerId = "fiId_"+$('#fiId').val()+"_wiId_"+$('#tId').val();
		$.post('File!findUploadedFile.do',{'category':'ATT_SP','ownerId':ownerId},function(data){
    		$('#flowInstanceFileQueue').empty().append(data);
    	});
	}
	
	function uploadify(basePath){
		var ownerId = "fiId_"+$('#fiId').val()+"_wiId_"+$('#tId').val();
		$("#file_upload").uploadify({
			formData      : {'category':'ATT_SP','ownerId':ownerId},
			swf           : basePath+'js/uploadify.swf',
			uploader      : basePath+'File!upload.do;jsessionid='+smFlowInstance.sessionId+'?category=ATT_SP&ownerId='+ownerId,
			width         : 20,
			height        : 36,
			auto          : true,
			multi         : true,
			cancelImg     : 'img/uploadify-cancel.png',
			queueID       : 'flowInstanceFileQueue',
			fileSizeLimit : '50MB',
			removeCompleted : false,
			buttonText : '<i class="glyphicon glyphicon-paperclip glyphicon-lg"></i>',
			itemTemplate : itemHtml,
			successTimeout : 5,
			'uploadLimit' : 20,
			'prevent_swf_caching':false,
			onUploadComplete: function(file) {
				$('#' + file.id).find(".progressbar").eq(0).fadeOut(1000);
			},
			onUploadProgress : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
				var percentage = Math.round(bytesUploaded / bytesTotal * 100);
				$('#' + file.id).find('.progressbar').eq(0).progressBar(percentage, { barImage: 'images/progressbg_green.gif'});
	        },
	  	    onUploadError : function(file, errorCode, errorMsg, errorString) {
	  	    	$('#' + file.id).find('.progressbar').eq(0).stop().fadeOut();
	        },
	        onQueueComplete : function(queueData) {
	        	reloadUpload();
	        }
		});
	}
	
	callBack.add(uploadify);
  	
	function openWindow(url, title, iWidth, iHeight) {
  		var dt = new Date();
  		var url = url + ((url.indexOf('?') == -1) ? '?' : '&') + 't=' + dt.getTime();
  		var iTop = (window.screen.availHeight - 30 - iHeight) / 2;
  		var iLeft = (window.screen.availWidth - 10 - iWidth) / 2;
  		var win = window.open(url, title, "width=" + iWidth + ", height=" + iHeight + ",top=" + iTop + ",left=" + iLeft + ",toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no,alwaysRaised=yes,depended=yes");
  	}
	
	$(document).on('click',"a[name='urlOpen']",function(){
		  
	 	var urlReg = new RegExp("(http|ftp|https):\/\/");
	 	var href = $(this).data('href');
	 	
	 	if(urlReg.test(href)){
	 		window.open(href); 
	 	}else{
	 		window.open("http://" + href);
	 	}
	 	return false;
	 });

	$("#url_upload").click(function() {
		var ownerId = "fiId_"+$('#fiId').val()+"_wiId_"+$('#tId').val();
		openWindow('File!urlUploadForNewFlow.do?category=ATT_SP&ownerId='+ownerId,'路径上传',1400,600);
	});
	
	$(document).on('click',"a[name='removeUploadFile']",function(){
		var delFileName = $(this).data('name');
		$.post("File!delete.do",{id:$(this).data('id')},function(data){
			var swfuploadify = $("#file_upload").data('uploadify');
			var queueFiles = swfuploadify.queueData.files;
			for (var n in queueFiles) {
				file = queueFiles[n];
				if(file.name == delFileName){
					delete queueFiles[n];
				}
			}
			reloadUpload();
  		});
	});
	
	function openCustomOpinion(){
		var url = "UserNote!list.do";
    	var sFeatures = {
    		dialogWidth : 1000,
    		dialogHeight : 600
    	};
    	url += "?t=" + (new Date()).getTime();
    	var r = showModalDialogOverride(url, window, sFeatures);
    	reloadSpNotes("commonOpinion");
	}
	
	function reloadSpNotes(spNoteSelectId){
		$.post("UserNote!getUserSpNotes.ajax",
			{"t" : (new Date()).getTime()},
			function(result){
				//清空select
				$("#" + spNoteSelectId).empty();
				$("#" + spNoteSelectId).append("<option value=''>请选择</option>");
				for(var i=0;i<result.length;i++){
					$("#" + spNoteSelectId).append("<option value='" + result[i].note + "'>" + result[i].note + "</option>");
				}
			},"json");
	}
	
	$('button').click(function(){
		var alertMsg = $(this).data('alertmsg');
		if(alertMsg){
			if(!confirm(alertMsg)){
				return false;
			}
		}
		//是否选择用户
		var isSelectUser = $(this).data('selectuser');
		//是否催办
		var isHasten = $(this).data('hasten');
		//是否替换当前审批人
		var isReplaceCurrentApproval = $(this).data('replacecurrentapproval');
		if(isSelectUser){
			selectParticipantByDomOp(1,"dealUserIds");
		}else if(isHasten){
			var result = showCuiBan($('#fiId').val());
		}else if(isReplaceCurrentApproval){
			replaceCurrentApproval($('#fiId').val());
		}
		
		//添加审批人
		var addcurrentapprovalperson=$(this).data('addcurrentapprovalperson');		
		if(addcurrentapprovalperson){
			addCurrentApprovalPerson($('#fiId').val(),$('#tokenId').val());
		}
		
		var isReload = $(this).data('isreload');
		
		var isColse = $(this).data('iscolse');
		
		var isRequestServer = $(this).data('isrequestserver');
		if(isRequestServer){
			$.post('FlowInstanceManager!'+$(this).data('action'),{'tId':$('#tId').val(),'fiId':$('#fiId').val(),'bizUrl':$('#bizUrl').val(),'userIds':$('#dealUserIds').val()},function(data){
				if(data.msg){
    				alert(data.msg);
    			}
				if(isColse){
					window.close();
					
				}
    			if(!!isReload){
    				window.location.reload();
    			}
    			if(data.success){
					if(data.redirectUrl){
						window.location.href = data.redirectUrl;
					}
				}
			});
		}	
	});

	window.smFlowInstance = {
			"showModalDialogOverride":showModalDialogOverride,
			"selectParticipantByDomOp":selectParticipantByDomOp,
			"validate":validate,
			"startValidate":startValidate,
			"approveValidate":approveValidate,
			"maxUserCount":null,
			"showCuiBan":showCuiBan,
			"replaceCurrentApproval":replaceCurrentApproval,
			"callBack":callBack,
			"refreshParentWin":dealCloseWindowWin,
			"sessionId":null,
			"reloadUpload":reloadUpload,
			"refreshParentWinTimer":null,
			"openCustomOpinion":openCustomOpinion
	};
	



	(function($){
		try{
			loadBizInfo();
				}catch(ex){
					
				}
	    })(jQuery)

    	//$.post('FlowInstanceApprove!loadBizAttachment.do',{
    		//'bizAttachment.proofreadBeforeCode':$('#category').val(),
    		//'bizAttachment.proofreadBeforeOwnId':$('#ownerId').val(),
    		//'bizAttachment.proofreadAfterCode':$('#category2').val(),
    		//'bizAttachment.proofreadAfterOwnId':$('#ownerId2').val(),
    		//'flId':$('#flId').val()
    	//},function(data){
    		//$('#bizAttachment').append(data);
    	//})
   
	
	
}(jQuery,window)

function loadBizInfo() {
    var bizUrl = $('#bizUrl').val();
    if(bizUrl.indexOf("?")>0){
    	bizUrl = bizUrl + "&bizId=" + $('#bizId').val() + "&flowCode=" + $('#flowCode').val() + "&isNewFlow=true";
    }else{
    	 bizUrl = bizUrl + "?bizId=" + $('#bizId').val() + "&flowCode=" + $('#flowCode').val() + "&isNewFlow=true";
    }
	$('#bizBasicInfo').load(bizUrl,{},function(response,textStatus,xhr){
		if(xhr.status==405){//主数据修改 chc edit 20160824
			var iframeWidth = $('#bizBasicInfo').width()-1;
			$('#bizBasicInfo').append("<iframe frameborder=0 src='"+bizUrl+"' height=500 width="+iframeWidth+"></iframe>");
		}else{
			$('#tranctionLabel').css('paddingTop',$('#tranctionUserIds').height()/2);
			if (textStatus == 'error') {
				if (xhr.status == 0 || xhr.status == 12017) {
					var $iframe = $('<iframe/>', {
						src: bizUrl,
						style: 'display: none;'
					});
					$iframe.appendTo('body');
					$iframe.load(function() {
						isLoading = false;
						$('#bizBasicInfo').load(bizUrl,function(){
							isLoading = true;
						});
						$iframe.remove();
					});
				}
			} 
		}
	});
}



