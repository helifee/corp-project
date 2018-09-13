var isExist = false;

function edit() {
	if ($.trim($("#name").val()).length == 0) {
		alert("编号规则名称不能为空!");
		$("#name").focus();
		return;
	}
    if ($.trim($("#code").val()).length == 0) {
        alert("编码不能为空!");
        $("#code").focus();
        return;
    }
    
    validateCode($("#code").val());
    
    if (isExist) {
        $("#code").focus();
        return;
    }
    
    if ($.trim($("#len").val()).length == 0) {
        alert("流水号位数不能为空!");
        $("#len").focus();
        return;
    }
    if (!/^\d{1,}$/.test($("#len").val())) {
    	alert("流水号位数必须为数字类型并且为正整数!");
        $("#len").focus();
        return;
    }
    if (parseInt($("#len").val()) <= 0) {
        alert("流水号位数必须大于0!");
        $("#len").focus();
        return;
    }
	//document.frm.submit();
    //window.opener.location.reload();
    //window.close();
    save();
}

function save() {
	if(true){
		$('body').mask("数据保存中...");
		$.ajax({
			type : "POST",
			url : "IdRule!edit.do",
			data : $('#frm').serialize(),
			dataType : "json",
			success : function(data, textStatus, jqXHR) {
				$('body').unmask();
				if (data && data.success) {
					window.opener.location.reload();
					window.close();
				} else {
					alert(data.msg);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				$('body').unmask();
				//alert("网络故障！");

				window.opener.location.reload();
				window.close();
			}
		});
	}else{
		alert("请正确填写信息");
	}
}


function validateCode(code) {
	try {
		if ($("#oldCode").val() != code) {
			var sendData = {'code':code,'now':new Date()};
			$.ajax({
				type:"post",
				url:"IdRule!validateCode.do",
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
				error:function(){}
			});
		}
	} catch(e) {}
}