var save = function() {
	$('body').mask("数据保存中...");
	$.ajax({
		type : "POST",
		url : "CorpMapping!save.do",
		data : $('#frm').serialize(),
		dataType : "json",
		success : function(data, textStatus, jqXHR) {
			$('body').unmask();
			if (data && data.success) {
				parent.query();
				parent.closeDialog('newDialog');
			} else {
				alert(data.msg);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
			$('body').unmask();
			alert("网络故障！");
		},
		dataType : "json"
	});
};

var projectWindow;
var corpWindow;
var legaPersonWindow;
var appWindow;
$(function() {
	$("#fisysinfoName").val(getName($('#fisysinfoid').val(), fisysinfoid_ref));
	$("#targsyscorpName").val(
			getName($('#targsyscorpid').val(), targsyscorpid_ref));

	projectWindow = new TemplateWindow(
			{
				"id" : "projectWindow",
				"title" : '项目',
				"templateUrl" : contextPath
						+ "/page/dialog/grid.jsp?model=mdProjectRef",
				"baseParams" : {},
				"width" : 500,
				"okCallback" : function(data) {
					$('#mddataName').textbox('setValue',
							getName(data.id, project_ref));
					$('#mddataid').val(data.id);
				}

			});

	corpWindow = new TemplateWindow({
		"id" : "corpWindow",
		"title" : '公司',
		"templateUrl" : contextPath + "/page/dialog/grid.jsp?model=mdCorpRef",
		"baseParams" : {},
		"width" : 500,
		"okCallback" : function(data) {
			$('#mdcorpName')
					.textbox('setValue', getName(data.id, mdcorpid_ref));
			$('#mdcorpid').val(data.id);

			// 清空主数据信息
			$('#mddataName').textbox('setValue', '');
			$('#mddataid').val('');
		}

	});

	legaPersonWindow = new TemplateWindow({
		"id" : "legaPersonWindow",
		"title" : '法人',
		"templateUrl" : contextPath
				+ "/page/dialog/grid.jsp?model=mdLegaPersonRef",
		"baseParams" : {},
		"width" : 500,
		"okCallback" : function(data) {
			$('#mddataName').textbox('setValue',
					getName(data.id, legalperson_ref));
			$('#mddataid').val(data.id);
		}

	});

	appWindow = new TemplateWindow({
		"id" : "appWindow",
		"title" : '业务系统',
		"templateUrl" : contextPath + "/page/dialog/grid.jsp?model=appRef",
		"baseParams" : {},
		"width" : 500,
		"okCallback" : function(data) {
			var ids = new Array();
			for ( var i = 0, length = data.length; i < length; i++) {
				ids.push(data[i].code + "");
			}
			$('#beusedsysName').textbox('setValue',
					getName(ids.join(','), beusedsys_ref));
			$('#beusedsys').val(ids.join(','));
		}

	});

	// 主数据信息
	$('#mddataName').textbox(
			{
				editable : false,
				missingMessage : '主数据信息！',
				iconWidth : 15,
				icons : [ {
					iconCls : 'icon-search',
					handler : function(e) {
						var type = $('#frm_corpMapping_mddatatype').combobox(
								"getValue");
						if ($('#mdcorpid').val()) {
							if (type == 'project') {
								projectWindow.baseParams = {
									"keyword" : $('#mdcorpid').val()
								};
								projectWindow.openWindow();
							} else if (type == 'legalperson') {
								legaPersonWindow.baseParams = {
									"keyword" : $('#mdcorpid').val()
								};
								legaPersonWindow.openWindow();
							}
						} else {
							alert("请先选择主公司!");
						}

					}
				} ]
			});

	$('#mdcorpName').textbox({
		editable : false,
		missingMessage : '主数据公司！',
		iconWidth : 15,
		icons : [ {
			iconCls : 'icon-search',
			handler : function(e) {
				corpWindow.openWindow();
			}
		} ]
	});

	$('#beusedsysName').textbox({
		editable : false,
		missingMessage : '使用系统！',
		iconWidth : 15,
		icons : [ {
			iconCls : 'icon-search',
			handler : function(e) {
				appWindow.openWindow();
			}
		} ]
	});

	$('#frm_corpMapping_mddatatype').combobox({
		data : mddatatype_ref,
		valueField : 'key',
		textField : 'value'
	});

	$('#mdcorpName').textbox('setValue',
			getName($('#mdcorpid').val(), mdcorpid_ref));

	var type = $('#frm_corpMapping_mddatatype').combobox("getValue");
	if (type == 'project') {
		$('#mddataName').textbox('setValue',
				getName($('#mddataid').val(), project_ref));
	} else if (type == 'legalperson') {
		$('#mddataName').textbox('setValue',
				getName($('#mddataid').val(), legalperson_ref));
	}

	$('#beusedsysName').textbox('setValue',
			getName($('#beusedsys').val(), beusedsys_ref));

});

function getName(value, data) {
	var str = new Array();
	var values = (value + "").split(',');
	for ( var i = 0, length = data.length; i < length; i++) {
		for ( var j = 0, length1 = values.length; j < length; j++) {
			if (values[j] + "" == data[i].key + "") {
				str.push(data[i].value + "");
			}
		}

	}

	return str.join(',');
}
