;;(function ($,window,document,undefined) {
/**
 * @author luorongxin
 */
var id;//编辑的id
var oper;//操作
var uuid;
var url;//提交的地址
var type;//提交方法
$(function(){
	 computeIframe();
	//初始页面
	initPage();
    bindButton();
	});

/**
 * 绑定按钮事件
 */
function bindButton() {
	//保存按钮
	$("#saveBtn").on('click',function () {
		//表单提交
		submitForm();
	});
	//关闭按钮
	$("#closeBtn").on('click',function () {
		window.close();
	});

}
/**
 * 初始化页面
 */
 function computeIframe() {
 	 $('#formbody').css({overflow:'hidden'});
	 $('#formbody').height($(window).height()-$('.xj-form-header').height());
		//美化滚动条
	 addNiceScroll();
}
function initPage(){
	//获取url参数
	id=$.xljUtils.getUrlParam("id");
	oper=$.xljUtils.getUrlParam("oper");
	//重置表单
    $('#DataSyncForm')[0].reset();
	$("#closeDataSyncModal").on("click",function(){
	    document.getElementById("DataSyncForm").reset();
	    $("#DataSyncForm :input[type='hidden']").val("");
	});

	 if(oper=="add"){
		$('title').text("数据同步管理-新增");
		$(".xj-form-title").text("数据同步管理-新增");
		$('#DataSyncForm').attr('action',baseUrl+'sys/tend/syncData/save');
		 $("#DataSyncForm :input[type=radio][name=mode][value='0']").prop("checked",true);
		 $("#DataSyncForm :input[type=radio][name=status][value=true]").prop("checked",true);
		 //初始化UUID
        $.ajax({
            type:"GET",
            url:serviceUrl+"sys/uuid/generator/getGuuid"+'?time='+Math.random(),
            dataType:"json",
            success: function(resultValue, textStatus) {
                  uuid = resultValue.result;
                  $('#id').val(uuid);
            },
          	 error: function(XMLHttpRequest, textStatus, errorThrown) {
          		 $.xljUtils.tip("blue","网络繁忙，请稍后！");
              }
        });	
        
	}else if(oper=="edit"){
		$('title').text("数据同步管理-修改");
		$(".xj-form-title").text("数据同步管理-修改");
		editDataSync(id);
	}
}
/**
 * 表单保存提交
 */
function submitForm(){
	if(oper == 'add'){
		url = serviceUrl+'sys/sync/syncData/save';
		type = 'POST';
	}
	else if(oper=='edit'){
        url = serviceUrl+'sys/sync/syncData/update/'+id;
		type = 'PUT';
	}
	var jsonData = {};
	var formFields = $('#DataSyncForm').serializeArray();
	for(var i=0;i<formFields.length;i++) {
		if(formFields[i].value==""){
			continue;
		}
		jsonData[formFields[i].name]=formFields[i].value;
	}
	jsonData.delflag=false;
	$.ajax({
		url:url,
		data:JSON.stringify(jsonData),
		type:type,
		contentType:'application/json',
		dataType:'JSON',
		success:function (resultData ) {
			if(resultData) {
				var successFlag = resultData.success;
				var result = resultData.result;
				var msg = resultData.msg;
				if(successFlag){
					 document.getElementById("DataSyncForm").reset();
					if(window.opener != null){
						window.opener.reloadGrid();
					}
					window.close();
				}else{
					switch (resultData.code) {
						case "50000":
							$.xljUtils.tip("red",resultData.msg);
							break;
						case "50001":
							$.xljUtils.tip("red",resultData.msg);
							break;
						case "50002":
							$.xljUtils.tip("blue",resultData.msg);
							break;
						case "50003":
							$.xljUtils.tip("red",resultData.msg);
							break;

						default:
							$.xljUtils.tip("blue","网络繁忙，请稍后！");
							break;
					}
				}

			}

		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			var status = XMLHttpRequest.status;
			$.xljUtils.getError(status);
		}
	});
	
}
//页面滚动条
function addNiceScroll(){
     $("#formbody").niceScroll({
         autohidemode: false,
         cursorcolor: "#eee",
         cursorwidth: "6px", // 滚动条的宽度，单位：便素
         cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
         horizrailenabled: true, // nicescroll可以管理水平滚动
         background: "#fff"

     });
}
/**
 * 编辑
 * @param 
 */
function editDataSync(id){
    $.ajax({
		  type:'GET',
    	  url:serviceUrl+'sys/sync/syncData/get/'+id+'?time='+Math.random(),
    	  dataType:"json",
    	  success: function(xhr) {
    		  if(xhr){
    			  if(xhr.success){
    				  var editObjData = xhr.result;
					  $("#DataSyncForm :input[type='text']").each(function () {
						  if (editObjData[this.name] != "" && editObjData[this.name] != undefined) {
							  this.value = editObjData[this.name];
						  } else {
							  this.value = "";
						  }
					  });
					  $("#DataSyncForm :input[type='hidden']").each(function () {
						  if (editObjData[this.name] != "" && editObjData[this.name] != undefined) {
							  this.value = editObjData[this.name];
						  }
					  });
//					  $("#DataSyncForm :input[type='radio']").each(function () {
//						  if (editObjData[this.name] != "" && editObjData[this.name] != undefined) {
//							  $("input[name='"+this.name+"'][value='"+editObjData[this.name]+"']").prop("checked",true);
//						  }
//					  });
					  if(editObjData.mode == "1"){
							$("input[name='mode'][value=1]").prop("checked",true); 
						}else if(editObjData.mode == "0"){
							$("input[name='mode'][value=0]").prop("checked",true); 
						}else {
							$("input[name='mode'][value=2]").prop("checked",true); 
						}
					  
					  if(editObjData.status == false){
							$("input[name='status'][value=false]").prop("checked",true); 
						}else{
							$("input[name='status'][value=true]").prop("checked",true); 
						}
					  $('textarea').each(function () {
						  if (editObjData[this.name] != "" && editObjData[this.name] != undefined) {
							  this.value = editObjData[this.name];
						  }
					  });
					  $('select').each(function () {
						  if (editObjData[this.name] != "" && editObjData[this.name] != undefined) {
							  $("option[value='"+editObjData[this.name]+"']").prop('selected',"selected");
						  }
					  });
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
    						$.xljUtils.tip("blue","网络繁忙，请稍后！");
    						break;
    					}
    			  }
    			 
    		  }else{
    			  $.xljUtils.tip("blue","网络繁忙，请稍后！");
    		  }
    	  },
    	  error: function(xhr, textStatus, errorThrown) {
           	$.xljUtils.tip("blue","网络繁忙，请稍后！");
           }
    	  
		});
}
})(jQuery,window,document)