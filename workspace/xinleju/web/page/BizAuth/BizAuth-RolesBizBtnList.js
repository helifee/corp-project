var hasChange = false;

function doSearch() {
	 $('#frm').submit();
}
function clickMe(obj) {
	var len = obj.className.split("_").length;
	var prefix = obj.className.split("_")[0] + "_" + obj.className.split("_")[1];
	var pfm = $("input[class='" + prefix + "']");
	var cfm = null;
	
	// 父菜单，针对所有子项操作
	if (len == 2) {
		$("input[class^='"+prefix+"']").each(function() {
			checkboxCheck(obj, this);
		});
	}
	
	// 子菜单，针对父我所有子项
    if (len == 3) {
    	if (obj.checked) {
    		pfm.attr("checked",true);
    	}
        $("input[class^='" + prefix +"_"+obj.className.split("_")[2] +"']").each(function() {
        	checkboxCheck(obj, this);
        });
    }
	// 按钮，针对所有父项
    if (len == 4) {
    	if (obj.checked) {
    		pfm.attr("checked",true);
    		cfm = $("input[class='" + prefix + "_" + obj.className.split("_")[2] +"']");
    		cfm.attr("checked",true);
    	}
    }    
}

function checkboxCheck(obj, obj1) {
    if (obj.checked) {
    	obj1.checked = true;
    } else {
    	obj1.checked = false;
    }
}

function showOrHideFunc(id, b) {
	if (b) {
		$("#img_"+id+"_show").hide();
		$("#img_"+id+"_hide").show();
		$(".tr_" + id).show();
	} else {
		$("#img_"+id+"_show").show();
		$("#img_"+id+"_hide").hide();
		$(".tr_" + id).hide();
	}
}

function selectRole(flag){
	var roleIds = $("#roleIds").val();
    var url = "BizAuth!chooseRole.do?roleIds="+roleIds;
    var returnValue = window.showModalDialog(url,arguments,"dialogWidth=480px;dialogHeight=450px");
    if (returnValue) {
		try {
			$("#roleIds").val(returnValue);
			var systemCode = $("#systemCode").val();
			var sendData = {'selectRoleId':returnValue,'systemCode':systemCode,'now':new Date()};
			$.ajax({
				type:"post",
				url:"BizAuth!getOtherAuth.do",
				async:false,
				data:sendData,
				dataType:"json",
				success:function(jsonvalue){
					var fieldInfos = jsonvalue.fieldInfos;
					$(":radio").each(function(){
						for(var x = 0; x < fieldInfos.length; x++){
							if($(this).attr("id") == fieldInfos[x].scopeId){
								$(this).attr("checked", true);
								if(fieldInfos[x].otherOptions){
									$(this).attr("value", fieldInfos[x].scopeId+"-"+fieldInfos[x].otherOptions);
								}
								break;
							}
						}
					});
				},
				error:function(){}
			});
		} catch(e) {}
    }
}

function save(flag) {
	if (flag == 1) {
		var roleId = $("#roleId");
		if (roleId.val().length == 0) {
			alert("请选择标准角色!");
			return;
		}
		document.frm.action = "BizAuth!saves1.do";
	}
	if (flag == 2) {
		var moduleId = $("#moduleId");
		if (moduleId.val().length == 0) {
			alert("请选择菜单!");
			return;
		}
		document.frm.action = "BizAuth!save2.do";
	}
	document.frm.submit();
}

function selectOptions(scopeId){
	$("#"+scopeId).attr("checked", true);
    var url = "BizAuth!chooseOption.do?scopeId="+scopeId+"&roleId="+$("#roleId").attr("value")+"&systemCode="+$("#systemCode").attr("value");
    arguments = $("#"+scopeId).attr("value");
    var returnValue = window.showModalDialog(url,arguments,"dialogWidth=650px;dialogHeight=500px");
    if (returnValue) {
		$("#"+scopeId).attr("value", returnValue);
    }
    
    hasChange = true;
}
function loadData(value) {
	if (!hasChange || confirm("切换业务模块时，当前页面所选的数据将会丢失，确认是否已保存?")) {
		var roleId = $("#roleId").val();
		window.location.href = "BizAuth!rolesBizBtnList.do?roleIds="+roleId+"&systemCode=" + value;
	}
}