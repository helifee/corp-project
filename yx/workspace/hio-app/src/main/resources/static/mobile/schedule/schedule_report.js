var img = $(".img");
var imgIdx = 0;
var fileInfoArray = new Array();
var path;
var businessId;
$(function() {
    var curWwwPath = window.document.location.href;
    var pathName =  window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    var localhostPaht = curWwwPath.substring(0,pos);
    var projectName = pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    path = localhostPaht + projectName;
	var paramText = curWwwPath.split("?")[1];
    var paramArray = paramText.split("&");
    businessId = paramArray[0].split("=")[1];
    console.log("businessId="+businessId+"; path="+path);
    queryBeanAndSetFormData(businessId);
    $("#uploadImage").on("change", function(){
    	//alert(" change() is called ");
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return;
        if (/^image/.test( files[0].type)){
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = function(e) {
            	var div=$("<div class='img-box'></div>");
         	    var img=$("<img id='fileupload_"+imgIdx+"'/>");
         	    img.attr("src",e.target.result);
         	    div.append(img);
         	    $(".upload-img").before(div);
            }
        }
    }).fileupload({  
        url: path + '/univ/attachment/attachmentTemp/upload',
        sequentialUploads: true, 
        formData:{appId:"1", businessId:businessId, categoryId:'1', type:'file'},
        
    }).bind('fileuploaddone', function (e, data) {  
        //data.result.result[0]是保存成功后返回的完整的信息，用户下一步的删除或提交操作,要妥善处理
        fileDataItem = data.result.result[0];
        delete fileDataItem.fileBytes; 
        fileInfoArray.push(fileDataItem);
        mui.toast('上传图片成功');
    });
});


function queryBeanAndSetFormData(id){
	$.ajax({
        type:'get',
        url: path+'/oa/taskPackageDispatch/get/'+id+'?time='+Math.random(),
        success: function(data) {
        	if(data.success){
	        	var resultData=data.result
	        	$("#id").val(resultData.id);
	        	$("#concurrencyVersion").val(resultData.concurrencyVersion);
	        	$("#content").val(resultData.content);
	        	$("#reportText").val(resultData.report);
	        	$("#dutyUser").html(resultData.dutyUser);
	        	$("#dutyDept").html(resultData.dutyDept);
	        	
	        	$("#expectCompleteDate").html(resultData.expectCompleteDate);
	        	$("#actualCompleteDate").html(resultData.actualCompleteDate);
	        	
	        	var d=resultData.reportStatus;
	        	if(d=="1"){
	        		$("input[name='reportStatus']").val("未汇报");
	        	}else if(d=="2"){
	        		$("input[name='reportStatus']").val("已汇报");
	        	}
        	}else{
        		pop_tip_open("red",data.msg);
        	}
        },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
}

function saveReportDataAndUpdateFileInfo(){
	var reportText = $("#reportText").val();
	var paramData = {dispatchId: businessId, report:reportText};
	
	$.ajax({
		url: path + '/oa/taskPackageDispatch/report',
		type: 'POST',
		dataType: 'JSON',
		contentType: 'application/json',
		data:JSON.stringify(paramData),
		success:function(returnData) {
			updateFileInfo();
			//切换回列表页面
			setTimeout(function() {
				window.location.href = path+"/mobile/schedule/schedule_list.html?hideHeader=true";
	        },500);
		},
		error:function(xhr){
			$.xljUtils.getError(xhr.status);
		}
	});
}

function updateFileInfo(){
	$.ajax({
		url: path + '/univ/attachment/attachment/saveBatch',
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(fileInfoArray),
		dataType: "JSON",
		success: function(dt) {
			console.log("");
		}
	});
}


/*var callBack = function(album){
	album.forEach(function(val,idx){
		//console.log("; idx="+idx);
		imgIdx++;
		alert("idx 0001");
	    var div=$("<div class='img-box'></div>");
	    var img=$("<img id='fileupload_"+imgIdx+"'/>");
	    //<input type="file" id="weixin_image" name="weixin_image" multiple>
	    img.attr("src",val.data);
	    div.append(img);
	    $(".upload-img").before(div);*/
	    /*var urlText = 'http://127.0.0.1:8080/platform-app/univ/attachment/attachmentTemp/upload';
	    alert("idx 0002 urlText="+urlText);
	    img.fileupload({  
	    	url: 'http://127.0.0.1:8080/platform-app/univ/attachment/attachmentTemp/upload',
	    	sequentialUploads: true, 
	        formData:{appId:"1", businessId:'221234567890',categoryId:'1', type:'file'}
	    }).bind('fileuploadprogress', function (e, data) {  
	    	console.log("------------file upload in progress-------");
	        
	    }).bind('fileuploaddone', function (e, data) {  
	    	alert("idx 0003");
	        //console.log("data.result.result[0]="+JSON.stringify(data.result.result[0]));
	        fileDataItem = data.result.result[0];
	        delete fileDataItem.fileBytes; 
	        fileInfoArray.push(fileDataItem);
	        alert("idx 0004");
	        alert("fileDataItem="+JSON.stringify(fileDataItem));
	    });*/
	    
/*	});
}*/
//var carera=new $.Pgater($("#btn"),callBack);