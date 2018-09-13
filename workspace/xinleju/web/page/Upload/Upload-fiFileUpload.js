//上传文件个数计数器
var fileCount=0;
//上传控件运行状态
var uploadStatus="stop";
//上传函数
function start_upload(formId,filedataId,ownerId,category,fileTdId,operationTdId){
	uploadStatus = "running";
	var filedata = document.getElementById(filedataId);
	var fileTd = document.getElementById(fileTdId); 
	
	//验证文件名
	if('true'==isCheckFileName){
		var fileNameCheckResult = checkFileName(filedata,category);
		if(!fileNameCheckResult[0]){
			alert(fileNameCheckResult[1]);
			return;
		}
	}
	var maskInfo = "附件上传中...请耐心等候...";
	//显示信息
	if(isScan=='true'){
		if(isEncrypt=='true'){
			maskInfo = "附件上载至缓冲区，病毒扫描并加密中...请耐心等候...";
		}else{
			maskInfo = "附件上载至缓冲区，病毒扫描中...请耐心等候...";
		}
	}else{
		if(isEncrypt=='true'){
			maskInfo = "附件加密中..请耐心等候...";
		}
	}
	
	if(filedata!=null&&filedata.value!=null&&filedata.value!=''){
		//附件类型判定
		var myType = filedata.value.substring(filedata.value.lastIndexOf('.')+1,filedata.value.length).toLowerCase();
		if(includeType!=''&&includeType!=null){
			if(!checkFileType(myType,includeType.toLowerCase())){
				var includeTypes = includeType.split(',');
				if(includeTypes.length>3){
					alert("请勿上传"+myType+"格式文件。");
				}else{
					alert("请您上传"+includeType+"格式的文件。");
				}
			}else{
				$('body', document).mask(maskInfo);
				document.getElementById(formId).submit();
			}
		}else{
			$('body', document).mask(maskInfo);
			document.getElementById(formId).submit();
		}
	}else{
		alert("请您先选择附件。");
	}
}

function uploadOK(uploadId,fileTrId,fileName,fillNameAll,fileTdId,noteTdId,operationTdId,note,category,ownerId,uvscanStatus,isEncrypt,isScan,isDoAfter,maskCode,luckyTime){
	var fileTd = document.getElementById(fileTdId); 
	var operationTd = document.getElementById(operationTdId);
	/*var addOperationStr = "<a href=\"#\" title=\"增加附件\"><img src=\"images/icon_add.png\" width=\"16\" height=\"16\" id=\"addImg"+count+"\" onclick=\"addRow('fileTr"+operationTdId.replace("operationTd","")+"')\" /> </a>";*/
	var addOperationStr = "";
	var deleteFileStr = "<a href=\"#\" title=\"删除\" onclick=\"deleteRowAndUploadInfo('"+fileTrId+"','"+uploadId+"');\"><img src=\"images/icon_delete.png\" width=\"16\" height=\"16\" /> </a>";
	var downloadFStr = "<a href=\"File!encrypt.ajax?id="+uploadId+"\" target=\"hidden_down_frame"+uploadId+"\" onclick=\"showDownLoadMask();\" title=\"下载\"><img src=\"images/icon_downLoad.png\" width=\"16\" height=\"16\" /> </a><iframe name='hidden_down_frame"+uploadId+"' id=\"hidden_down_frame"+uploadId+"\" style='display: none'></iframe>";
	var downloadStr = "<a href=\"File!download.ajax?id="+uploadId+"\" title=\"下载\"><img src=\"images/icon_downLoad.png\" width=\"16\" height=\"16\" /> </a>";
	var downloadFileEUvOkStr = "<a href=\"File!encrypt.ajax?id="+uploadId+"\" target=\"hidden_down_frame"+uploadId+"\" onclick=\"showDownLoadMask();\" title=\""+fillNameAll+"\">"+fileName+" <img src=\"images/security.png\" align=\"absmiddle\" border=\"0\" title=\"安全确认通过\"></a>";
	var downloadFileEUvNotStr = "<a href=\"File!encrypt.ajax?id="+uploadId+"\" target=\"hidden_down_frame"+uploadId+"\" onclick=\"showDownLoadMask();\" title=\""+fillNameAll+"\">"+fileName+" <img src=\"images/security_error.png\" align=\"absmiddle\" border=\"0\" title=\"安全验证异常\"></a>";
	var downloadFileUvOkStr = "<a href=\"File!download.ajax?id="+uploadId+"\" title=\"下载\">"+fileName+" <img src=\"images/security.png\" align=\"absmiddle\" border=\"0\" title=\"安全确认通过\"></a>";
	var downloadFileUvNotStr = "<a href=\"File!download.ajax?id="+uploadId+"\" title=\"下载\">"+fileName+" <img src=\"images/security_error.png\" align=\"absmiddle\" border=\"0\" title=\"安全验证异常\"></a>";
	var downloadFileEStr = "<a href=\"File!encrypt.ajax?id="+uploadId+"\" target=\"hidden_down_frame"+uploadId+"\" onclick=\"showDownLoadMask();\" title=\""+fillNameAll+"\">"+fileName+"</a>";
	var downloadFileStr = "<a href=\"File!download.ajax?id="+uploadId+"\" title=\""+fillNameAll+"\">"+fileName+"</a>";
	//是否扫描病毒
	if(isScan=='true'){
		//扫描情况反馈
		//正常
		if(uvscanStatus==1){
			//同步计数器
			initFileCount(category,ownerId,luckyTime);
			if(isEncrypt=='true'){
				fileTd.innerHTML = downloadFileEUvOkStr;
				operationTd.innerHTML = downloadFStr + deleteFileStr + addOperationStr;
			}else{
				fileTd.innerHTML = downloadFileUvOkStr;
				operationTd.innerHTML = downloadStr + deleteFileStr + addOperationStr;
			}
		}
		//感染
		else if(uvscanStatus==2){
			alert("‘"+fileName+"’文件由于病毒扫描异常，系统已经自动删除，请您重新上传。");
			fileTd.focus();
		}
		else{
			//同步计数器
			initFileCount(category,ownerId,luckyTime);
			if(isEncrypt=='true'){
				fileTd.innerHTML = downloadFileEUvNotStr;
				operationTd.innerHTML = downloadFStr + addOperationStr;
			}else{
				fileTd.innerHTML = downloadFileUvNotStr;
				operationTd.innerHTML = downloadStr + deleteFileStr + addOperationStr;
			}
		}
	}else{
		//同步计数器
		initFileCount(category,ownerId,luckyTime);
		if(isEncrypt=='true'){
			fileTd.innerHTML = downloadFileEStr;
			operationTd.innerHTML = downloadFStr + deleteFileStr + addOperationStr;
		}else{
			fileTd.innerHTML = downloadFileStr;
			operationTd.innerHTML = downloadStr + deleteFileStr + addOperationStr;
		}
	}
	
	//若需要自动出现“浏览”，方便下一次上传，则自动添加一行
	if('true'==isAutoNext){
		autoAddRow();
	}
	
	//高度自适应
	window.frameElement.height = document.body.scrollHeight;
	//若需要父页面也高度自适应则进入以下程序
	if('true'==isParentReHeight){
		try{
			parent.window.frameElement.height = parent.document.body.scrollHeight;
		}catch(e){
		
		}
	}
	$("body").unmask();
	uploadStatus="stop";
}

//异常提醒
function alertException(exceptionDescribe){
	$("body").unmask();
	alert(exceptionDescribe);
}

//附件类型核定
function checkFileType(myType,includeType){
	var ifContant = false;
	if(myType!=null&&myType!=''&&includeType!=null&&includeType!=''){
		var includeTypes = includeType.split(',');
		for(var i=0;i<includeTypes.length;i++){
			if(includeTypes[i]==myType){
				ifContant = true;
			}
		}
	}else{
		ifContant = true;
	}
	return ifContant;
}

//显示下载进度
function showDownLoadMask(){
	$('body', document).mask("附件解密中..请耐心等候...");
}

//判断是否下载完成
function finishDownLoad(){
	$("body").unmask();
}

//获取附件上传个数
function getFileCount(){
	return fileCount;
}
//获取控件运行状态
function getUploadStatus(){
	return uploadStatus;
}
//同步计数器
function initFileCount(category,ownerId,luckyTime){
	var dt = new Date();
	Ext.Ajax.request({
		url : 'upload!getFileCount.ajax',
		params : {
			category : category,
			ownerId : ownerId,
			luckyTime : luckyTime,
			request_time:dt.getTime()
		},
		success : function(response) {
			var data = Ext.util.JSON.decode(response.responseText);
			fileCount = data.fileCount;
		}
	})
}

//在表格的最后一行之后自动添加一行
function autoAddRow(){
	try{
		var id = $("#todoTable").find("img:last").click();
	}catch(e){
		
	}
}

//验证文件名
function checkFileName(filedata,category){
	var result = [];
	result[0]=true;
	result[1]="文件名称符合要求";
	try{
		if(filedata!=null && category!=null){
			var myFileName = "";
			//linux系统
			if(filedata.value.lastIndexOf('/')>=0){
				myFileName = filedata.value.substring(filedata.value.lastIndexOf('/')+1,filedata.value.indexOf('.'));
			}
			//windows系统
			else{
				myFileName = filedata.value.substring(filedata.value.lastIndexOf('\\')+1,filedata.value.indexOf('.'));
			}
			//技术标一，技术标一文件名必须为：“技术标一”
			if('hb_technical_file_1'&&'技术标一'!=myFileName){
				result[0]=false;
				result[1]="请上传文件名称为  《技术标一》 的附件";
			}
		}
	}catch(e){
		
	}
	return result;
}
