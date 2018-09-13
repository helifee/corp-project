var type=$.xljUtils.getUrlParam('type');
var id=$.xljUtils.getUrlParam('id');
var sysName=$.xljUtils.getUrlParam('sysName');
$(function () {
	pageInit();
	$("select[name='appCode']").val(sysName);
	  if(type=="add"){
		  $("#financeSystemTitle").html("会计科目对照项注册-新增");
		   document.title="会计科目对照项注册-新增";
	  }else{
		  $("#financeSystemTitle").html("会计科目对照项注册-修改");
		   document.title="会计科目对照项注册-修改";
	  }
	  $("#saveBtn").on('click',function(){
		  $("#financeForm").attr("data-validate-success","saveFinanceSystem('over')");
		  $("#financeForm").submit();
	  });
	  
	  $("#saveAndCreateBtn").on('click',function(){
		  $("#financeForm").attr("data-validate-success","saveFinanceSystem('continue')");
		  $("#financeForm").submit();
	  });
    });
function pageInit(){
	if(type=="add"){
		var uuid=getuuid();
		 $("input[name='id']").val(uuid);
	}else{
		var id=$.xljUtils.getUrlParam('id'); 
		getfinanceSystem(id);
	}
}
function getfinanceSystem(id){
	$.ajax({
		type : 'get',
		url : serviceUrl + 'finance/sysBizItem/get/' + id + '?time='
				+ Math.random(),
		success : function(data) {
			if (data.success) {
				var result = data.result;
				$("input[name='id']").val(result.id);
				$("input[name='concurrencyVersion']").val(
						result.concurrencyVersion);
				$("input[name='appCode']").val(result.appCode);
				$("input[name='name']").val(result.name);
				$("input[name='code']").val(result.code);
				$("input[name='url']").val(result.url);
				$("input[name='method']").val(result.method);
			}
		}
	});
	
}

function saveFinanceSystem(op) {
	var financeSystemarr = $("#financeForm").serializeArray();
	var financeSystemDto = {};
	for ( var o in financeSystemarr) {
		financeSystemDto[financeSystemarr[o].name] = financeSystemarr[o].value;
	}
	financeSystemDto.delflag = 0;
	if (type=="add") {
		$.ajax({
			url : serviceUrl + "finance/sysBizItem/save",
			data : JSON.stringify(financeSystemDto),
			type : 'POST',
			contentType : 'application/json',
			dataType : 'JSON',
			success : function(resultData) {
				if (resultData) {
					var successFlag = resultData.success;
					var result = resultData.result;
					var msg = resultData.msg;
					if (successFlag) {
						   if(op=="over"){
		                	   window.opener.reloadGrid(financeSystemDto.id);
		                	   window.close();
		                   }else if(op=="continue"){
		                	   window.opener.reloadGrid(financeSystemDto.id);
		                		$("#financeForm")[0].reset();
		                		$("select[name='appCode']").val(sysName);
		                	   var uuid=getuuid();
		                	   $("input[name='id']").val(uuid);
		                   }
						//$("#add").modal("hide");
					} else {
						pop_tip_open("red", resultData.msg);
					}
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			},
			complete : function() {
			}
		});
	} else {
		$.ajax({
			url : serviceUrl + "finance/sysBizItem/update/" + financeSystemDto.id,
			data : JSON.stringify(financeSystemDto),
			type : 'put',
			contentType : 'application/json',
			dataType : 'JSON',
			success : function(resultData) {
				if (resultData) {
					var successFlag = resultData.success;
					var result = resultData.result;
					var msg = resultData.msg;
					if (successFlag) {
						   if(op=="over"){
		                	   window.opener.reloadGrid(financeSystemDto.id);
		                	   window.close();
		                   }else if(op=="continue"){
		                	   window.opener.reloadGrid(financeSystemDto.id);
		                		$("#financeForm")[0].reset();
		                		$("select[name='appCode']").val(sysName);
		                	   var uuid=getuuid();
		                	   $("input[name='id']").val(uuid);
		                	   type='add';
		                   }
					} else {
						pop_tip_open("red", resultData.msg);
					}
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$.xljUtils.getError(jqXHR.status);
			},
			complete : function() {
			}
		});
	}
}
function getuuid() {

	$.ajax({
		beforeSend : function() {
			var guuid = "";
		},
		type : 'get',
		async : false,
		url : serviceUrl+'sys/uuid/generator/getGuuid?time=' + Math.random(),
		success : function(data) {
			if (data.success) {
				guuid = data.result;

			} else {
				pop_tip_open("red", data.msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$.xljUtils.getError(jqXHR.status);
		},
		complete : function() {
			return guuid;
		}
	});
	return guuid;
}


function closed(){
	 window.close();
}
