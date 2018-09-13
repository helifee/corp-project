/** 
 * 数据权限作用域列表
 * @author add by shiyong , updata by gyh
 * @date 2017-3-23
 */
//打开方式：0新增，1编辑
var editType=window.opener.editType;
if(editType==1){
	$("#editFormTitel").text("修改");
	$("title").html("系统-修改");
}else{
	$("#editFormTitel").text("新增");
	$("title").html("系统-新增");
}

/**
 * 初始化主键ID
 */
function initUuid(){
	//隐藏预览图片dom
	$('#newImg').hide();

	var uBody = "generator/getGuuid"+"?time="+Math.random();
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#appFrom").find("input[name='id']").val(guuid);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化主键ID请求失败");
		}
	})
}


function newFile(target) {
	//判断文件类型
	var filePath = target.value;
	if(filePath!=""){
		var fileType=(filePath.substr(filePath.lastIndexOf("."))).toLowerCase();
		if(fileType!=".jpg"&&fileType!=".gif"&&fileType!=".jpeg"&& fileType!=".png"){
			pop_tip_open("blue","您上传图片的类型不符合(.jpg|.jpeg|.gif|.png)！");
			clearPic();
			return false;
		}
	}

	document.getElementById('newImg').setAttribute('width',"80px");
	document.getElementById('newImg').setAttribute('hight',"80px");
	try{
		var windowURL = window.URL || window.webkitURL;
		var loadImg = windowURL.createObjectURL(document.getElementById('photoPic').files[0]);
		document.getElementById('newImg').setAttribute('src',loadImg);
	}catch(e){
		document.getElementById('newImg').setAttribute('src',"../../common/img/default.png");
		var div = document.getElementById('newImg');
		document.getElementById('photoPic').select();
		document.getElementById('photoPic').blur();
		top.parent.document.body.focus();
		var src = document.selection.createRange().text;
		div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
		div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
	}
	$('#newImg').next().html("");
	$('#newImg').next().append("<a href='javascript:void(0)' onclick='clearPic()'>删除</a>");
	$("#isDelPic").val("1");
	$('#newImg').show();
}  

function clearPic(){
	$("#newImg").removeAttr("width");
	$("#newImg").removeAttr("height");
	$('#newImg').next().html("");
	$("#isDelPic").val("0");
	$('#newImg').hide();
	$('#photoPic').replaceWith('<input type="file" id="photoPic"  onchange="newFile(this)" name="icon" multiple="true" class="" accept="image/*"/>')
}
/**
 * 新增--数据保存
 */
function addSaveForm(ifNew){
	 $.ajax({
	       url:hostUrl+"sys/res/appSystem/save",
	       data:new FormData($( "#appFrom" )[0]),  
	       type:'POST',
		   	processData:false,
			contentType:false,
	       success:function (resultData) {
	           if(resultData) {
	               var successFlag = resultData.success;
	               var result = resultData.result;
	               var msg = resultData.msg;
	               if(successFlag) {
	            	   refreshGrid(result.id);
	                   if(ifNew==1){
	                	   refreshWin();
	                   }else{
	                		 window.close();
	                   }
	               }else {
	            		pop_tip_open("red",msg);
	               }
	           }
	       },
			error: function (jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
	        }
	   });
}
/**
 * 刷新业务系统表格
 */
function refreshGrid(id) {
	var queryData2={
			delflag:false
	};
	window.opener.appGridObj.jqGrid("setGridParam", { postData: queryData2 }).trigger("reloadGrid");
	if(id !=null &&id !=""){
		window.opener.appOnId=id;
	}
};
/**
 * 关闭页面
 */
function closeWin(){
	window.close();
}

/**
 * 编辑页面-初始化业务系统信息
 */
function getAppById(){
	var appId = window.opener.updateAppId;
	var uBody = "sys/res/appSystem/get/"+appId+"?time="+Math.random();
	var uAll = hostUrl + uBody;
	$.ajax({
		type:'get',
		url:uAll,
		success: function(data) {
			var guuid=data.result;
			$("#appFrom").find("input[name='id']").val(data.result.id);
			$("#appFrom").find("input[name='code']").val(data.result.code);
			$("#name").val(data.result.name);
			$("#fullName").val(data.result.fullName);
			$("#url").val(data.result.url);
			if(data.result.isextsys == "1"){
				$("input[name='isextsys'][value=1]").attr("checked",true); 
			}else{
				$("input[name='isextsys'][value=0]").attr("checked",true); 
			}
			if(data.result.status == "1"){
				$("input[name='status'][value=1]").attr("checked",true); 
			}else{
				$("input[name='status'][value=0]").attr("checked",true); 
			}
			/*$("#icon").val(data.result.icon);*/
		    if(data.result.icon){
		    	 document.getElementById('newImg').setAttribute('src',"data:image/jpeg;base64,"+data.result.icon);
		    	 document.getElementById('newImg').setAttribute('width',"80px");
		    	 document.getElementById('newImg').setAttribute('hight',"80px");
		    	  $('#newImg').next().append("<a href='javascript:void(0)' onclick='clearPic()'>删除</a>");
		    	  $("#isDelPic").val("1");
		     }else{
				//隐藏预览图片dom
				$('#newImg').hide();
			}
			if(data.result.openmode == "1"){
				$("input[name='openmode'][value=1]").attr("checked",true); 
			}else{
				$("input[name='openmode'][value=0]").attr("checked",true); 
			}
			$("#sort").val(data.result.sort);
			$("#remark").val(data.result.remark);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			pop_tip_open("red","初始化业务系统信息请求失败");
		}
	})
}
/**
 * 编辑--保存
 */
function editSaveForm(ifNew){
	var appId = $('#id').val();
	$.ajax({
		url:hostUrl+"sys/res/appSystem/update",
	     data:new FormData($( "#appFrom" )[0]),  
	       type:'POST',
		   	processData:false,
			contentType:false,
			success:function (resultData) {
			if(resultData) {
				if(resultData) {
					var successFlag = resultData.success;
					var result = resultData.result;
					var msg = resultData.msg;
					if(successFlag) {
						//pop_tip_open("blue",'数据保存成功！');
						refreshGrid(appId);
						if(ifNew==1){//保存并新增
							refreshWin();
						}else{
							closeWin();
						}
					}else {
						pop_tip_open("red",msg);
					}
				}else {
					pop_tip_open("red",'数据保存失败！');
				}
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	});
	
	
}

/**
 * 保存-新增或编辑保存
 * @param ifNew:0只保存，1保存并新增
 */
function saveForm(ifNew){
	var  url = hostUrl+"sys/res/appSystem/save";
	if(editType=="1"){
		url = hostUrl+"sys/res/appSystem/update";
	}
	//校验url格式
    var flag = checkUrl($("#url").val());
	if(!flag){
		$("#url").focus ();
		return false;
	}
	var ajax_option={
		url:url,//form 的action
		type:"post",  //form 的method方法
		//beforeSubmit:checkUppro,  //在表达提交前执行的验证函数
		contentType: "application/x-www-form-urlencoded; charset=utf-8",   //设置编码集
		success:function(data){  //表单提交成功后执行的函数
			formSubmitCallBack(data,ifNew);
		}
	}
	$('#appFrom').ajaxSubmit(ajax_option);
}

/**
 * 校验url格式
 * @param urlString
 */
function checkUrl(urlString){
    if(urlString!=""){
        var reg=/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if(!reg.test(urlString)){
            pop_tip_open("blue","请输入正确的url");
            return false;
        }
    }
    return true;
}
/**
 * form表单提交回掉方法
 */
function formSubmitCallBack(resultData,ifNew){
	resultData = JSON.parse(resultData);
	if(resultData) {
		var appId = $("#appFrom").find("input[name='id']").val();
		var successFlag = resultData.success;
		var result = resultData.result;
		var msg = resultData.msg;
		if(successFlag) {
			refreshGrid(appId);
			if(ifNew==1){//保存并新增
				refreshWin();
			}else{
				closeWin();
			}
		}else {
			pop_tip_open("red",resultData.msg);
		}
	}
}
/**
 * 初始化数据
 */
$(function () {
	$("#saveBtn").on('click',function(){
		$("#appFrom").attr("data-validate-success","saveForm(0)");
		$("#appFrom").submit();
	});

	$("#saveAndCreateBtn").on('click',function(){
		$("#appFrom").attr("data-validate-success","saveForm(1)");
		$("#appFrom").submit();
	});
	if(editType==1){
		$("#saveAndCreateBtn").hide();
		getAppById();
	}else{
		initUuid();
	}
});
/**
 * 刷新页面
 */
function refreshWin(){
	$("#id").val("");
	$("#code").val("");
	$("#name").val("");
	$("#fullName").val("");
	$("#url").val("");
	$("input[name='isextsys'][value=1]").attr("checked",true); 
	$("input[name='status'][value=1]").attr("checked",true); 
	$("#icon").val("");
	$("input[name='openmode'][value=1]").attr("checked",true); 
	$("#sort").val("");
	$("#remark").val("");
	editType=0;
	initUuid();
}


