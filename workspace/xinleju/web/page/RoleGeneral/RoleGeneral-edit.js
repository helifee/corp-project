
var isExist = false;

function save() {

   /* validateCode($("#code").val());
    
    if (isExist) {
        $("#code").focus();
        return;
    }*/
    
    if(true){
//		$('body').mask("数据保存中...");
//		$.ajax({
//			type : "POST",
//			url : "RoleGeneral!save.do",
//			data : $('#frm').serialize(),
//			dataType : "json",
//			success : function(data, textStatus, jqXHR) {
//				$('body').unmask();
//				if (data && data.success) {
//					window.opener.doRefreshParent();
//					window.close();
//				} else {
//					alert(data.msg);
//				}
//			},
//			error : function(jqXHR, textStatus, errorThrown) {
//				$('body').unmask();
//				alert("网络故障！");
//			}
//		});
		
		$.post('RoleGeneral!save.do', $('#frm').serialize(), function(data) {
			$('body').unmask();
			if (data && data.success) {
				window.opener.doRefreshParent();
				window.close();
			} else {
				$('body').unmask();
				alert("网络故障！");
			}
			
		});
		
	}else{
		alert("请正确填写信息");
	}
}

/**
 * 引入标准角色
 */
function unionRole() {
	var obj = $("#member").val();
	//解决乱码
	obj = encodeURI(obj);
	obj = encodeURI(obj); 
	openwindow('RoleGeneral!unionStandardRole.do?selRole='+obj);
}

function setStandardRole(role) {
	$("#member").val(role);
}


function validateCode(code) {
	try {
		if ($("#oldCode").val() != code) {
			var sendData = {'code':code,'now':Math.random()};
			$.ajax({
				type:"post",
				url:"RoleGeneral!validateCode.do",
				async:false,
				data:sendData,
				dataType:"json",
				success:function(jsonvalue){
					var result = jsonvalue.result;
					if (result == 0) {
						isExist = true;
						alert("编码已存在!");
					} else {
						isExist = false;
					}
				},
				error:function(){
				}
			});
		}
	} catch(e) {
	}
}