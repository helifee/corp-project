var type=$.xljUtils.getUrlParam('type');
var id=$.xljUtils.getUrlParam('id');
$(function () {
	pageInit();
	  if(type=="add"){
		  $("#financeSystemTitle").html("财务系统注册-新增");
		   document.title="财务系统注册-新增";
	  }else{
		  $("#financeSystemTitle").html("财务系统注册-修改");
		   document.title="财务系统注册-修改";
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
		url : serviceUrl + 'finance/sysRegister/get/' + id + '?time='
				+ Math.random(),
		success : function(data) {
			if (data.success) {
				var result = data.result;
				$("input[name='fiSysCode']").val(result.fiSysCode);
				$("input[name='id']").val(result.id);
				$("input[name='fiSysName']").val(result.fiSysName);
				$("input[name='type']").val(result.type);
				$("input[name='status'][value=" + result.status + "]").attr(
						"checked", true);
				$("input[name='sender']").val(result.sender);
				$("input[name='webUrl']").val(result.webUrl);
				$("input[name='concurrencyVersion']").val(
						result.concurrencyVersion);
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
			url : serviceUrl + "finance/sysRegister/save",
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
		                	   $('#systemGrid').jqGrid().trigger("reloadGrid");
		                	   $("#financeForm")[0].reset();
		                	   var uuid=getuuid();
		                	   $("input[name='id']").val(uuid);
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
	} else {
		$.ajax({
					url : serviceUrl + "finance/sysRegister/update/"
							+ financeSystemDto.id,
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
				                	   $('#systemGrid').jqGrid().trigger("reloadGrid");
				                	   $("#financeForm")[0].reset();
				                	   var uuid=getuuid();
				                	   $("input[name='id']").val(uuid);
				                	   type="add";
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
