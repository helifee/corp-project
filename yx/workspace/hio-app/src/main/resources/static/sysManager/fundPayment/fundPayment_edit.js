/**
 * @author luorongxin
 */
var id;//编辑的id
var name;//编辑的name
var oper;//操作
var rowData;//选中的数据
var uuid;
var url;//提交的地址
var type;//提交方法
/**
 * 时间控件--中文
 */ 
$.fn.datetimepicker.dates['zh'] = {  
        days:       ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六","星期日"],  
        daysShort:  ["日", "一", "二", "三", "四", "五", "六","日"],  
        daysMin:    ["日", "一", "二", "三", "四", "五", "六","日"],  
        months:     ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月","十二月"],  
        monthsShort:  ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],  
        meridiem:    ["上午", "下午"],  
        //suffix:      ["st", "nd", "rd", "th"],  
        today:       "今天"  
};      
/**
 * 开始时间-结束时间 
 */
$(".form_datetime").datetimepicker({
	language : 'zh',
	format : "yyyy-mm-dd hh:ii:00",
	weekStart : 1,
	todayBtn : 1,
	autoclose : 1,
	startView : 2,
	forceParse : 0,
	showMeridian : 1
}).on('changeDate', function(ev){
	   var endText = $('#expiredTime').val();  
	   var startText =$('#automaticTime').val();  
	   if(endText!=''){
		   if(endText.valueOf()<startText.valueOf()){
			   return  $('#expiredTime').val(startText); ;
		   }
	   }
});

$(function(){
	//初始页面
	initPage();
	});
/**
 * 初始化页面
 */
function initPage(){
	//获取url参数
	id=$.xljUtils.getUrlParam("id");
	name=decodeURI(escape($.xljUtils.getUrlParam("name")));
	oper=$.xljUtils.getUrlParam("oper");
	//重置表单
    $('#floatWindowForm')[0].reset();
	$("#closeFloatWindowBtn").on("click",function(){
	    document.getElementById("floatWindowForm").reset();
	    $("#floatWindowForm :input[type='hidden']").val("");
	});
	//绑定按钮事件
	//保存窗口
	 $("#saveFloatWindowBtn").on('click',function () {
		 //表单提交
		 submitForm();
	 });
	 //关闭当前页面
	 $("#closeFloatWindowBtn").on('click',function () {
         document.getElementById("floatWindowForm").reset();
		 window.close();
	 });
	if(oper=="add"){
		$('title').text("浮动窗口-新增");
		$(".xj-form-title").text("浮动窗口-新增");
		$("input[type=radio][name=state][value=true]").prop('checked',true);
		 //初始化UUID
        $.ajax({
            type:"GET",
            url:baseUrl+"oa/content/contentChild/getGuuid"+'?time='+Math.random(),
            dataType:"json",
            success: function(resultValue, textStatus) {
                  uuid = resultValue.result;
                  $('#id').val(uuid);
              	// 上传回调成功后记录categoryId
          		$("#file").val(uuid);
          		//上传图片初始化
              	$('.attachment-container').xljAttachment({appId:'floatWindow',businessId:uuid,categoryId:'1',mode:'add',singleUpload:true});
            },
          	 error: function(XMLHttpRequest, textStatus, errorThrown) {
          		 $.xljUtils.tip("red","服务异常,请联系管理员！");
              }
        });

		url = baseUrl+'/oa/sys/sysFloatWindow/save';
		type= "POST";

	}else if(oper=="edit"){
		$('title').text("浮动窗口-修改");
		$(".xj-form-title").text("浮动窗口-修改");
		//上传图片初始化
    	$('.attachment-container').xljAttachment({appId:'floatWindow',businessId:id,categoryId:'1',mode:'edit',singleUpload:true});
		url = baseUrl+'oa/sys/sysFloatWindow/get/'+id;
		type= "GET";
		editFloatWindow(id);
        //新增url type
		url = baseUrl+'oa/sys/sysFloatWindow/update/'+id;
		type= "PUT";
	}else if(oper=="detail"){
		$('title').text("浮动窗口-明细");
		$(".xj-form-title").text("浮动窗口-明细");
		//上传图片初始化
    	$('.attachment-container').xljAttachment({appId:'floatWindow',businessId:id,categoryId:'1',mode:'view',singleUpload:true});
	}
}
/**
 * 表单保存提交
 */
function submitForm(){
	//获取当前表 附件个数
	var fileCount = $('.attachment-container').getFileCount();
	if(fileCount == 0){
		$.xljUtils.tip('blue', '请选择上传的图片!');
		return;
	}
	 //上传图片提交
    $('.attachment-container').xljAttachmentSubmit(function(isSuccess, obj){
		if (isSuccess) {
			if (obj.success === true) {
				  //表单提交
				  submit();
			} else {
				 //校验原附件存在
				if($('.attachment-container').getFileCount()!=0){
					submit();
				}else{
					$.xljUtils.tip('red', "上传图片服务异常！");
					return;
				}
			}
		} else {
			$.xljUtils.getError(obj);
			return;
		}
	});
    
  
}
/**
 * 表单提交方法
 */
function submit() {
   if($("#floatWindowForm").valid()){
	var formElements = $("#floatWindowForm").serializeArray();
	var postData = {};
		for(var i in formElements){
			var item = formElements[i];
			postData[item.name] = item.value;
		}
	$.ajax({
		type:type,
		url:url+'?time='+Math.random(),
		data:JSON.stringify(postData),
		dataType:"json",
		contentType: "application/json;charset=utf-8",
		success: function(xhr) {
			if(xhr){
				if(xhr.success){
					var editObjData = xhr.result;
					document.getElementById("floatWindowForm").reset();
					if(window.opener != null){
						if (oper == 'add') {
							window.opener.setJqGridAddedRowId(postData.id);
						}
						//刷新父页面grid
						window.opener.reloadGrid();
					}
					window.close();
				}else{
					//异常处理

					switch (xhr.code) {
						case "50000":
							$.xljUtils.tip("red",xhr.msg);
							break;
						case "50001":
							$.xljUtils.tip("red",xhr.msg);
							break;
						case "50002":
							$.xljUtils.tip("blue",xhr.msg);
							break;
						case "50003":
							$.xljUtils.tip("red",xhr.msg);
							break;

						default:
							$.xljUtils.tip("red","服务异常,请联系管理员！");
							break;
					}
				}

			}else{
				$.xljUtils.tip("red","服务异常,请联系管理员！");
			}
		},
		error: function(xhr, textStatus, errorThrown) {
			$.xljUtils.tip("red","服务异常,请联系管理员！");
		}
	 });
   }
}
/**
 * 编辑浮动窗口
 * @param 
 */
function editFloatWindow(id){
	var formElements = $("#floatWindowForm").serializeArray();
    $.ajax({
		  type:'GET',
    	  url:url+'?time='+Math.random(),
    	  dataType:"json",
    	  contentType: "application/json;charset=utf-8",
    	  success: function(xhr) {
    		  if(xhr){
    			  if(xhr.success){
    				  var editObjData = xhr.result;
      			    for (var i in formElements) {
      			        var inputName = formElements[i].name;
      			        var inputVal;
      			        if(inputName == 'id'){
      			        	inputVal = editObjData.id;
      			        }
      			        if(inputName == 'serialNo'){
      			        	inputVal = editObjData.serialNo;
      			        }
      			        if(inputName == 'url'){
      			        	inputVal = editObjData.url;
      			        	
      			        }
      			        if(inputName == 'file'){
      			        	//图片的categoryId
      			        	inputVal = '';
      			        }
      			        if(inputName == 'type'){
      			        	inputVal = editObjData.type;
      			        }
      			        if(inputName == 'top'){
      			        	inputVal = editObjData.top;
      			        }
      			        if(inputName == 'name'){
      			        	inputVal = editObjData.name;
      			        }
      			        if(inputName == '_left'){
      			        	inputVal = editObjData._left;
      			        }
      			        if(inputName == 'width'){
      			        	inputVal = editObjData.width;
      			        }
      			        if(inputName == 'height'){
      			        	inputVal = editObjData.height;
      			        }
      			        if(inputName == 'delayInterval'){
      			        	inputVal = editObjData.delayInterval;
      			        }
						if(inputName == 'showInterval'){
							inputVal = editObjData.showInterval;
						}
      			        if(inputName == 'creater'){
      			        	inputVal = editObjData.creater;
      			        }
      			        if(inputName == 'modifier'){
      			        	inputVal = editObjData.modifier;
      			        }
      			        
      			        if(inputName == 'automaticTime'){
      			        	inputVal = editObjData.automaticTime;
      			        }
      			        if(inputName == 'expiredTime'){
      			        	inputVal = editObjData.expiredTime;
      			        }
      			         $("#floatWindowForm :input[name='"+inputName+"']").val(inputVal);
      			    }
      			    if(editObjData.state==false){
      			    	$("input[type=radio][name=state][value=false]").prop('checked',true); 
      			    }else if(editObjData.state==true){
      			    	$("input[type=radio][name=state][value=true]").prop('checked',true); 
      			    }
    			  }else{
    				  //异常处理
    				  
    				  switch (xhr.code) {
    					case "50000":
    						$.xljUtils.tip("red",xhr.msg);
    						break;
    					case "50001":
    						$.xljUtils.tip("red",xhr.msg);
    						break;
    					case "50002":
    						$.xljUtils.tip("blue",xhr.msg);
    						break;
    					case "50003":
    						$.xljUtils.tip("red",xhr.msg);
    						break;

    					default:
    						$.xljUtils.tip("red","服务异常,请联系管理员！");
    						break;
    					}
    			  }
    			 
    		  }else{
    			  $.xljUtils.tip("red","服务异常,请联系管理员！");
    		  }
    	  },
    	  error: function(xhr, textStatus, errorThrown) {
           	$.xljUtils.tip("red","服务异常,请联系管理员！");
           }
    	  
		});

}
