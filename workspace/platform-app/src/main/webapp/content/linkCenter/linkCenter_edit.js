var type= $.xljUtils.getUrlParam('type');
var regInput=true;
var pId="";
var selectId="";
$(function () {
	pageInit();
	if(type=="add"){
		 $("#linkCenterTitle").html("链接中心-新增");
		   document.title="链接中心-新增";
	}else{
		 $("#linkCenterTitle").html("链接中心-修改");
		   document.title="链接中心-修改";
	}
	  $("#saveBtn").on('click',function(){
		  $("#linkCenter").attr("data-validate-success","saveForm('over')");
		  $("#linkCenter").submit();
	  });
	  
	  $("#saveAndCreateBtn").on('click',function(){
		  $("#linkCenter").attr("data-validate-success","saveForm('continue')");
		  $("#linkCenter").submit();
	  });
	  $("input[name='type']").change(function(){
		  var d=$("input[type='radio']:checked").val();
		  if(d=="1"){
				  $("#LinkCenterselect").val(""); 
				  $("#parentName").val(""); 
				  $("#LinkCenterselect").find("option[value='']").attr("selected",true);
		  }else if(d=="0"){
			  $("#LinkCenterselect").val(pId);
		  }
	  });
});
/**
 * author:liuf
 * describe:页面加载完毕后执行
 * param: null
 */
window.newFile=function(target) {
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
	$('#photoPic').replaceWith('<input type="file" id="photoPic"  onchange="newFile(this)" name="icon" multiple="true" class="" accept="image/*"/>');
}

function pageInit(){
	var parentId=""; 
	if(type=="add"){

		//隐藏预览图片dom
		$('#newImg').hide();

		getParentName(parentId);
		var uuid=getuuid();
		$("#linkCenterId").val(uuid);
		var reId=$.xljUtils.getUrlParam('parentId');
		var	saveId=$.xljUtils.getUrlParam('id');
		if(!reId){
			$("#LinkCenterselect").val(saveId);
			var parentName=$("#LinkCenterselect").find("option:selected").text();
			$("#parentName").val(parentName);
		}
		 $('#uploadFile').xljAttachment({appId:'1',businessId:uuid,categoryId:'1',mode:'add',singleUpload:true});
	}else{
		selectId=$.xljUtils.getUrlParam('parentId');
		parentId=$.xljUtils.getUrlParam('id');
		getParentName(parentId);
		getLinkCenterData(parentId);
		 $('#uploadFile').xljAttachment({appId:'1',businessId:parentId,categoryId:'1',mode:'edit',singleUpload:true});
	}
}
/**
 * author:liuf
 * describe:新增获得uuid
 * param: null
 */
function getuuid(){
	
	$.ajax({
		beforeSend:function(){
			var guuid="";
		},
        type:'get',
        async:false,
		url:hostUrl+'generator/getGuuid?time='+Math.random(),
        success: function(data) {
        	if(data.success){
        		 guuid=data.result;
        		
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        },
        complete:function(){
        	return guuid;
        }
	});
	return guuid;
}

window.regData=function(ele){
	var placeholder=$(ele).attr("placeholder");
	var specialKey ="$%\\'\\\\^*\"\+[]【】{}";
	var inputval=$(ele).val();
	if((specialKey.indexOf(inputval)>-1&&(inputval!=""))||inputval.indexOf("&lt;")>-1||inputval.indexOf("'")>-1||inputval.indexOf("&gt;")>-1){
		pop_tip_open("blue",placeholder+"不允许输入特殊字符");
		regInput=false;
		$(ele).val("");
		return;
	}
	var dataLength=$(ele).val().length;
	var dataMaxLength=$(ele).attr("data-maxlength");
	if(parseInt(dataLength)>parseInt(dataMaxLength)){
		pop_tip_open("blue",placeholder+"输入超长,请重新输入");
		regInput=false;
		$(ele).val("");
		return;
	}else{
		regInput=true;
	}		
};
/**
 * author:liuf
 * describe:修改回显数据
 * param: id
 */
function getLinkCenterData(id){
	   $.ajax({
	       url:hostUrl+"sys/sysLinkCenter/get/"+id+'?time='+Math.random(),
	       type:'get',
	       async:false,
	       success: function(data) {
	    	   if(data.success){
	    		   var sysLinkCenter=data.result;
	    		   $("#LinkCenterselect").val(sysLinkCenter.parentId);
	    		     $("input[name='id']").val(sysLinkCenter.id);
	    		     $("input[name='name']").val(sysLinkCenter.name);
	    		     $("input[name='code']").val(sysLinkCenter.code);
	    		     $("input[name='sort']").val(sysLinkCenter.sort);
	    		 	 $("input[name='state'][value="+sysLinkCenter.state+"]").attr("checked",true);//状态
	    		     $("input[name='url']").val(sysLinkCenter.url);
	    		     $("textarea[name='remark']").val(sysLinkCenter.remark);
	    		   	$("input[name='type'][value="+sysLinkCenter.type+"]").attr("checked",true);//状态
	    		     if(sysLinkCenter.icon){
	    		    	 document.getElementById('newImg').setAttribute('src',"data:image/jpeg;base64,"+sysLinkCenter.icon);
	    		    	 document.getElementById('newImg').setAttribute('width',"80px");
	    		    	 document.getElementById('newImg').setAttribute('hight',"80px");
	    		    	  $('#newImg').next().append("<a href='javascript:void(0)' onclick='clearPic()'>删除</a>");
	    		    	  $("#isDelPic").val("1");
	    		     }else{
						 //隐藏预览图片dom
						 $('#newImg').hide();
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
/**
 * author:liuf
 * describe:加载父节点里面的内容
 * param: null
 */
function getParentName(parentId){
	$.ajax({
        type:'post',
        url:hostUrl+'sys/sysLinkCenter/queryList',
        dataType:'json',
        contentType:'application/json',
        async:false,
        data:"{}",
        success: function(data) {
        	if(data.success){
        		 if(data.result){	
        			 var linkCenter=data.result;
        			 for(var o in linkCenter){
        				 if(!linkCenter[o].parentId&&(linkCenter[o].type!="1")){
        					 if(parentId){
        						   if(linkCenter[o].id!=parentId){
              						 $("#LinkCenterselect").append("<option value='"+linkCenter[o].id+"'>"+linkCenter[o].name+"</option>")
		              					if(selectId&&(selectId==linkCenter[o].id)){
		              						$("#parentName").val(linkCenter[o].name);
		              					}
        						   }
        					 }else{
        						 $("#LinkCenterselect").append("<option value='"+linkCenter[o].id+"'>"+linkCenter[o].name+"</option>")
        					 }
        				 }
        			 }
        		 }
        	}else{
        		pop_tip_open("red",data.msg);
        	}
     },
		error: function (jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
        }
	}) 	
}


function changeParentName(){
 $(':radio[name="type"][value="0"]').prop("checked", "checked");
	var parentName=$("#LinkCenterselect").find("option:selected").text();
	$("#parentName").val(parentName);
}
/**
 * author:liuf
 * describe:保存数据
 * param: op
 */
function saveForm(btType){
	var  url = hostUrl+"sys/sysLinkCenter/save";
	if(type=="add"){
	}else{
		url = hostUrl+"sys/sysLinkCenter/update";
	}
	var ajax_option={
		url:url,//form 的action
		type:"post",  //form 的method方法
		//beforeSubmit:checkUppro,  //在表达提交前执行的验证函数
		contentType: "application/x-www-form-urlencoded; charset=utf-8",   //设置编码集
		success:function(data){  //表单提交成功后执行的函数
			formSubmitCallBack(data,btType);
		}
	};
	$('#linkCenter').ajaxSubmit(ajax_option);


}

/**
 * form表单提交回掉方法
 */
function formSubmitCallBack(resultData,op){
	resultData = JSON.parse(resultData);
	if(resultData) {
		var linkCenterId = $('#linkCenterId').val();
		var successFlag = resultData.success;
		var result = resultData.result;
		var msg = resultData.msg;
		if(successFlag) {
			if(op=="over"){
				window.opener.reloadGrid(linkCenterId);
				window.opener = null;
				window.close();
			}else if(op=="continue"){
				window.opener.reloadGrid(linkCenterId);
				$("#linkCenter")[0].reset();
				var uuid=getuuid();
				$("#linkCenterId").val(uuid);
			}
		}else {
			pop_tip_open("red",resultData.msg);
		}
	}
}


/**
 * author:liuf
 * describe:关闭页面
 * param: null
 */
function closed(){
	 window.close();
}

