var isImgClick = false;
function clickThisRow(id) {
	if (isImgClick) {
		isImgClick = false;
		return;
	}
	$("#"+id).attr("checked", !$("#"+id).attr("checked"));
	clickMe( document.getElementById(id) );
}

function clickMe(obj) {
	if(window.parent.isEditFlag!='undefine'){
		window.parent.isEditFlag = true;
	}
	//alert(window.parent.isEditFlag);

	// modify by liuhm 由于增加了root级，所有一些处理都需要进行调整
	var classNames = obj.className.split("_");
	var len = classNames.length;
//	var prefix = classNames[0] + "_" + classNames[1];
	var root = "input[class='" + classNames[0] + "_" + classNames[1] + "']";
	var rootChld = "input[class^='" + classNames[0] + "_" + classNames[1] + "_']";
	var rootChldChecked = "input[class^='" + classNames[0] + "_" + classNames[1] + "_']:checked";
	var pfm = "";
	var pfmChld = "";
	var pfmChldChecked = "";
	var cfm = null;
	var cfmChld = null;
	var cfmChldChecked = null;

	// 父菜单，针对所有子项操作
	if (len == 2) { // 业务模块
		$(rootChld).each(function() {
			checkboxCheck(obj, this);
		});
	} else if (len >= 3) { // 功能模块
		pfm = "input[class='" + classNames[0] + "_" + classNames[1] + "_" + classNames[2] + "']";
		pfmChld = "input[class^='" + classNames[0] + "_" + classNames[1] + "_" + classNames[2] + "_']";
		pfmChldChecked = "input[class^='" + classNames[0] + "_" + classNames[1] + "_" + classNames[2] + "_']:checked";
		if (len == 3) {
			$(pfmChld).each(function() {
				checkboxCheck(obj, this);
			});
			
			$(root).attr("checked", $(rootChldChecked).length > 0);
			
		} else if (len >= 4) { // 菜单
			cfm = $("input[class='" + classNames[0] + "_" + classNames[1] + "_" + classNames[2] + "_" + classNames[3] +"']");
			cfmChld = $("input[class^='" + classNames[0] + "_" + classNames[1] + "_" + classNames[2] + "_" + classNames[3] +"_']");
			cfmChldChecked = $("input[class^='" + classNames[0] + "_" + classNames[1] + "_" + classNames[2] + "_" + classNames[3] +"_']:checked");
			if (len == 4) { // 菜单
		        $(cfmChld).each(function() {
		        	checkboxCheck(obj, this);
		        });
		        
		    } else if (len == 5) { // 按钮，针对所有父项
		    	if ( $(cfmChldChecked).length > 0 ) {
		    		$(cfm).attr("checked", true);
		    	}
		    	
		    }

			$(pfm).attr("checked", $(pfmChldChecked).length > 0);
			$(root).attr("checked", $(rootChldChecked).length > 0);
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


function showOrHideApp(id, b) {
	isImgClick = true;
	if (b) {
		$("#app_img_"+id+"_show").hide();
		$("#app_img_"+id+"_hide").show();
		$(".tr_m_" + id).show();
	} else {
		$("#app_img_"+id+"_show").show();
		$("#app_img_"+id+"_hide").hide();
		$(".tr_m_" + id).hide();
	}
	window.parent.iframeChangeSize('funcOpframe',5);
}


function showOrHideFunc(id, b) {
	isImgClick = true;
	if (b) {
		$("#img_"+id+"_show").hide();
		$("#img_"+id+"_hide").show();
		$(".tr_" + id).show();
	} else {
		$("#img_"+id+"_show").show();
		$("#img_"+id+"_hide").hide();
		$(".tr_" + id).hide();
	}
	window.parent.iframeChangeSize('funcOpframe',5);
}

function selectRole(flag){
	var roleIds = $("#roleIds").val();
    var url = "FuncAuth!chooseRole.do?roleIds="+roleIds;
    var iWidth = window.screen.availWidth;
    var iHeight = window.screen.availHeight;
    var returnValue = window.showModalDialog(url,arguments,"dialogWidth="+iWidth+";dialogHeight="+iHeight);

    if (returnValue) {
    	if (returnValue[0].length > 0) {
    		try {
    			$("#roleIds").val(returnValue[0].substring(0,returnValue[0].length-1));
    			var systemCode = $("#systemCode").val();
    			var moduleId = $("#moduleId").val(); 
    			var sendData = {'roleIds':returnValue[0].substring(0,returnValue[0].length-1),'systemCode':systemCode,'moduleId':moduleId,'now':new Date()};
				$.ajax({
					type:"post",
					url:"FuncAuth!getOtherAuth"+flag+".do",
					async:false,
					data:sendData,
					dataType:"json",
					success:function(jsonvalue){
						if (flag == 1) {
							var moduleIds = jsonvalue.moduleIds;
							var btnIds = jsonvalue.btnIds;
							$("input[name='moduleIds']").each(function(){
								for (var x = 0; x < moduleIds.length; x++) {
									if (this.value == moduleIds[x]) {
										var classNames = this.className.split("_");
										var root = "input[class='" + classNames[0] + "_" + classNames[1] + "']";
										$(root).attr("checked", true);
										
										this.checked = true;
									}
								}
							});
							$("input[name='btnIds']").each(function() {
								for (var x = 0; x < btnIds.length; x++) {
									if (this.value == btnIds[x]) {
										this.checked = true;
									}
								}							
							});						
						}
						if (flag == 2) {
							var rbIds = jsonvalue.rbIds;
							$("input[name='rbIds']").each(function() {
								for (var x = 0; x < rbIds.length; x++) {
									if (this.value == rbIds[x]) {
										this.checked = true;
									}
								}							
							});	
						}
					},
					error:function(){}
				});
    		} catch(e) {}
    		
    	}
    }
}
/**
 * 保存
 */
function save(flag) {
	if (flag == 1) {
		var roleId = $("#roleId");
		if (roleId.val().length == 0) {
			alert("请选择标准角色!");
			return;
		}
		$('body').mask("保存中...");
		$.ajax({
            type: "POST",
            url:"FuncAuth!saves1.do",
            data:$("#frm").serialize(),
            async: false,
            error: function(request) {
            	$('body').unmask();
            	alter('网络出错,重新保存！')
            },
            success: function(data){
            	$('body').unmask();
            	alert('保存成功');
            }
        });
	}
	if (flag == 2) {
		var moduleId = $("#moduleId");
		if (moduleId.val().length == 0) {
			alert("请选择菜单!");
			return;
		}
		$('body').mask("保存中...");
		$.ajax({
            type: "POST",
            url:"FuncAuth!save2.do",
            data:$("#frm").serialize(),
            async: false,
            error: function(request) {
            	$('body').unmask();
            	alter('网络出错,重新保存！')
            },
            success: function(data){
            	$('body').unmask();
            	alert('保存成功');
            }
        });
	}
	window.parent.isEditFlag = false;
}
function loadData(value) {
	if (confirm("切换业务模块时，当前页面所选的数据将会丢失，确认是否已保存?")) {
		var roleId = $("#roleId").val();
		window.location.href = "FuncAuth!funcBtnList.do?roleId="+roleId+"&systemCode=" + value;
	} 
}