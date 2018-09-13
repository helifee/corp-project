//打开窗口参数定义
var specs = '';
//画布环节类型定义
var acTypeArr = ["", "start", "task", "end", "join", "fork", "connector", "cc"];

$(function () {
	$.getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = decodeURI(window.location.search).substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	};
});

/**
 * 日期格式化
 * 
 * @param pattern  格式化模式
 * 
 * eg:new Date().format("yyyy-MM-dd HH:mm:ss")
 * 
 */
Date.prototype.format = function (pattern) {
	/*初始化返回值字符串*/
	var returnValue = pattern;
	/*正则式pattern类型对象定义*/
	var format = {
		"y+": this.getFullYear(),
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"H+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"S": this.getMilliseconds(),
		"h+": (this.getHours() % 12),
		"a": (this.getHours() / 12) <= 1 ? "AM" : "PM"
	};
	/*遍历正则式pattern类型对象构建returnValue对象*/
	for (var key in format) {
		var regExp = new RegExp("(" + key + ")");
		if (regExp.test(returnValue)) {
			var zero = "";
			for (var i = 0; i < RegExp.$1.length; i++) {
				zero += "0";
			}
			var replacement = RegExp.$1.length == 1 ? format[key] : (zero + format[key]).substring((("" + format[key]).length));
			returnValue = returnValue.replace(RegExp.$1, replacement);
		}
	}
	return returnValue;
}

/**
 * 获取Guuid
 * 
 * @param id  表单Guuid隐藏于ID
 */
function getGuuid(id) {
	var guuid = "";
	if (typeof id != "undefined") {
		$.ajax({
			type: 'get',
			async: false,
			url: hostUrl + 'generator/getGuuid' + "?time=" + Math.random(),
			success: function (data) {
				guuid = data.result;
				$("#" + id).val(guuid);
			},
			error: function (xhr) {
				$.xljUtils.getError(xhr.status);
			}
		});
	} else {
		$.ajax({
			type: 'get',
			async: false,
			url: hostUrl + 'generator/getGuuid' + "?time=" + Math.random(),
			success: function (data) {
				guuid = data.result;
			},
			error: function (xhr) {
				$.xljUtils.getError(xhr.status);
			}
		});
	}
	return guuid;
}

/**
 * 判断字符串是否以某个字符串开头
 * 
 * @param compareStr  开头的字符串
 * 
 * eg:
 *  var str = 'abc';
 *  str.startWith('ab') //true
 *  str.StartWith('b') //false
 */
String.prototype.startWith = function (compareStr) {
	return this.indexOf(compareStr) == 0;
}

/**
 * 在新窗口全屏打开外外部链接
 * 
 * @param url  需要打开的URL
 */
function openWin(url) {
	if (url.indexOf('casUrlLogin') > -1) {
		//老平台cas单点不需要encodeURI链接
		window.open(url, '', specs);
	} else {
		window.open(encodeURI(url), '', specs);
	}
}

/**
 * 关闭窗口
 */
function closeWin() {
	if ("undefined" != typeof localTemp && localTemp) {
		if (window.opener.clearLocal != undefined) {
			window.opener.clearLocal(localTemp);
		}
	}
	/*newwin = window.open("",'_self');
     newwin.close();*/
	window.close();
	/*	var userAgent = navigator.userAgent;
		if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
		   window.location.href="about:blank";
		} else {
		   window.opener = null;
		   window.open("", "_self");
		   window.close();
		};*/
}

/**
 * 表单校验规则
 */
var validatorrule = {
	feedbackIcons: {
		valid: 'glyphicon glyphicon-ok',
		invalid: 'glyphicon glyphicon-remove',
		validating: 'glyphicon glyphicon-refresh'
	},
	/**
	 * 表单域配置（必须是name）
	 */
	fields: {
		code: {
			//提示消息
			message: '编码验证失败',
			//需要做的验证  
			validators: {
				//验证项  
				notEmpty: {
					message: '编码不能为空',
				}
			}
		},
		name: {
			message: '名称验证失败',
			validators: {
				notEmpty: {
					message: '名称不能为空',
				}
			}
		},
		flowTitle: {
			message: '默认标题验证失败',
			validators: {
				notEmpty: {
					message: '默认标题不能为空',
				}
			}
		}
	}
};

/**
 * 判断字符串是否以某个字符串开头
 * 
 * @param compareStr  开头的字符串
 * 
 *  var str = 'abc';
 *  str.startWith('ab') //true
 *  str.StartWith('b') //false
 */
String.prototype.startWith = function (compareStr) {
	return this.indexOf(compareStr) == 0;
}
/**
 * 设置画布编辑器高度
 */
function resizeEditorHeight() {
	$("#_designer").height(($(window).height() - 150) + "px");
	//$("#graph").width($("#_base").width()*2);
	//$("#_designer #graph").height(($(window).height()-200)+"px");
}

/**
 * 隐藏Grid的滚动条
 */
function removeHorizontalScrollBar(gridId) {
	$("#" + gridId).closest(".ui-jqgrid-bdiv").css("overflow", "hidden");
}

/**
 * 编辑环节
 */
function editAc(editor, cell) {
	var nodeType = cell.getAttribute('nodeType');
	if (nodeType == 'fork') {
		var trs = new Array();
		var ids = new Array();
		var edges = cell.edges;
		mxUtils.forEach(edges, function (edge) {
			if (edge.source.isVertex()) {
				if (edge.source.id == cell.id && ids.indexOf(edge.id) < 0) { //去重
					trs.push({
						nodeId: edge.id,
						name: edge.getAttribute('label'),
						target: edge.target.getAttribute('label')
					});
					ids.push(edge.id);
				}
			}
		});
		if (trs.length > 0) {
			window.forkLines = trs;
			//alert("已经选择" + cell.getAttribute('label') + "====" + cell.id + "===" + cell.getGeometry().x + "===" + cell.getGeometry().y + "===" + cell.getGeometry().width + "===" + cell.getGeometry().height + "===" + trs.length);
			openWin("../../flow/editor/fl_fork_multi.html?businessObjectId=" + $.getUrlParam("businessObjectId"));
		}
	} else if (nodeType == 'join') {

	} else if (nodeType == 'cc') { //抄送节点
		var businessObjectId = $("#businessObjectId").val();
		var label = cell.getAttribute('label');
		var urlText = "fl_cc.html?nodeId=" + cell.id + "&label=" + label +
			"&nodeType=" + cell.getAttribute('nodeType') + "&businessObjectId=" + businessObjectId + "&time=" + new Date().getTime() + "&editorStatus=" + editorStatus;
		openWin(urlText);
	} else { //end start common节点
		var businessObjectId = $("#businessObjectId").val();
		var label = cell.getAttribute('label');
		if (label == '开始') {
			label = '发起';
		}
		var urlText = "fl_ac.html?nodeId=" + cell.id + "&label=" + label +
			"&nodeType=" + cell.getAttribute('nodeType') + "&businessObjectId=" + businessObjectId + "&time=" + new Date().getTime() + "&editorStatus=" + editorStatus;
		openWin(urlText);
	}
}

/**
 * 编辑环节连线
 */
function editTr(editor, cell) {
	var businessObjectId = $("#businessObjectId").val();
	//alert("已经选择"+cell.getAttribute('label')+"======"+cell.id+"==="+cell.getGeometry().x+"==="+cell.getGeometry().y +"==="+ cell.getGeometry().width+"==="+ cell.getGeometry().height+"==="+cell.source.id+"===="+cell.target.id);
	var subWin = "../../flow/editor/fl_fork.html?businessObjectId=" + businessObjectId + "&nodeId=" + cell.id + "&editorStatus=" + editorStatus;
	openWin(subWin);
}

/**
 * 读取画布的XML
 * 
 * @param xmlDoc 画布XML
 */
function readGraph(xmlDoc) {
	//console.info("------------------readGraph(xmlDoc)-----------------");
	//console.info(xmlDoc);
	var doc = mxUtils.parseXml(xmlDoc);
	//console.info(doc);
	//console.info("-------------------------------------------------");
	//console.info(doc.documentElement);
	editor.readGraphModel(doc.documentElement);
}

/**
 * 解析XML
 * 
 * @param xmlDoc    xml格式的文档
 * @param nodePath  需要查询的节点路径 （父子关系用空格相隔。eg：mxGraphModel root Start）
 * @param nodeArr   返回的node数组
 */
function parseXML(xmlDoc, nodePath, nodeArr) {
	if (nodePath.indexOf("Connector") >= 0) {
		$(xmlDoc).find(nodePath).each(function () {
			var data;
			var node = $(this);
			var id = node.attr("id");
			var label = node.attr("label");

			var localStor = window.localStorage.getItem(localTemp + id);
			if (localStor) {
				data = JSON.parse(localStor);
			} else {
				data = {
					"id": getGuuid(),
					"nodeId": id,
					"name": label,
					"delflag": false
				};
				window.localStorage.setItem(localTemp + id, JSON.stringify(data));
			}
			data.flId = $("#id").val();
			var source = JSON.parse(window.localStorage.getItem(localTemp + node.find("mxCell").attr("source")));
			data.sourceId = source.id;
			var target = JSON.parse(window.localStorage.getItem(localTemp + node.find("mxCell").attr("target")));
			data.targetId = target.id;
			nodeArr.push(data);
		});
	} else {
		$(xmlDoc).find(nodePath).each(function () {
			var data;
			var node = $(this);
			var id = node.attr("id");
			var label = node.attr("label");
			var nodeType = node.attr("nodeType");

			var localStor = window.localStorage.getItem(localTemp + id);
			if (localStor) {
				data = JSON.parse(localStor);
			} else {
				data = {
					"id": getGuuid(),
					"nodeId": id,
					"name": label,
					"acType": $.inArray(nodeType, acTypeArr),
					"delflag": false
				};
				window.localStorage.setItem(localTemp + id, JSON.stringify(data));
			}
			data.flId = $("#id").val();
			var dataX;
			var dataY;
			if (!node.find("mxCell mxGeometry").attr("x")) {
				dataX = 0;
			} else {
				dataX = parseInt(node.find("mxCell mxGeometry").attr("x"));
			}
			if (!node.find("mxCell mxGeometry").attr("y")) {
				dataY = 0;
			} else {
				dataY = parseInt(node.find("mxCell mxGeometry").attr("y"));
			}
			data.x = dataX;
			data.y = dataY;
			//data.x = parseInt(node.find("mxCell mxGeometry").attr("x"));
			//data.y = parseInt(node.find("mxCell mxGeometry").attr("y"));
			data.width = parseInt(node.find("mxCell mxGeometry").attr("width"));
			data.height = parseInt(node.find("mxCell mxGeometry").attr("height"));
			nodeArr.push(data);
		});
	}
}

/**
 * 保存JSON到WEB缓存
 * 
 * @param jsonArr JSON数组
 */
function pushDataToStor(jsonArr) {
	var objArr = JSON.parse(jsonArr);

	for (var i = 0; i < objArr.length; i++) {
		var obj = objArr[i];
		delJsonProp(obj);
		window.localStorage.setItem(localTemp + obj.nodeId, JSON.stringify(obj));
	}
}

/**
 * 删除JSON对象多余属性
 * 
 * @param json JSON对象
 */
function delJsonProp(json) {
	delete json.createCompanyId;
	delete json.createCompanyName;
	delete json.createDate;
	delete json.createOrgId;
	delete json.createOrgName;
	delete json.createPersonId;
	delete json.createPersonName;
	delete json.updateDate;
	delete json.updatePersonId;
	delete json.updatePersonName;
	delete json.createCompanyName;
}

/**
 * 判断必输项
 * 
 * @param str
 */
function verify(str) {
	if (str.replace(/(^s*)|(s*$)/g, "").length == 0)
		return false;
	return true;
}
/**
 * 单元格添加id属性
 * 
 * @param rowId
 * @param val
 * @param rowObject
 * @param cm
 * @param rdata
 * @returns {String}
 */
function addCellAttr(rowId, val, rowObject, cm, rdata) {
	return "id='" + cm.name + rowId + "'";
}
/**
 * 隐藏网关环节行
 * 
 * @param gridId
 */
function hideGateway(gridId) {
	var ids = $("#" + gridId).jqGrid('getDataIDs');
	for (var i = 0; i < ids.length; i++) {
		var acType = $("#" + gridId).jqGrid("getCell", ids[i], "acType");
		if (acType == "4" || acType == "5") {
			$("#" + gridId).jqGrid('setRowData', ids[i], null, {
				display: "none"
			});
		}
	}
}

/**
 * 设置运行标识
 * 
 * @param gridId
 * @param isStart
 * 
 */
function setRunningStatus(gridId, isStart) {
	var ids = $("#" + gridId).getDataIDs();
	var length = ids.length;
	if (isStart) {
		$("#sequence1").addClass('ui-state-highlight');
		$("#acName1").addClass('ui-state-highlight');
		$("#postName1").addClass('ui-state-highlight');
		$("#approverName1").addClass('ui-state-highlight');
		$("#approvalType1").addClass('ui-state-highlight');
		$("#taskComments1").addClass('ui-state-highlight');
		$("#attachment1").addClass('ui-state-highlight');
		$("#taskEndTime1").addClass('ui-state-highlight');
		for (var i = 1; i < length; i++) {
			$("#sequence" + ids[i]).addClass('ui-state-highlight-notStart');
			$("#acName" + ids[i]).addClass('ui-state-highlight-notStart');
			$("#postName" + ids[i]).addClass('ui-state-highlight-notStart');
			$("#approverName" + ids[i]).addClass('ui-state-highlight-notStart');
			$("#approvalType" + ids[i]).addClass('ui-state-highlight-notStart');
			$("#taskComments" + ids[i]).addClass('ui-state-highlight-notStart');
			$("#attachment" + ids[i]).addClass('ui-state-highlight-notStart');
			$("#taskEndTime" + ids[i]).addClass('ui-state-highlight-notStart');
		}

	} else {
		for (var i = 0; i < length; i++) {
			var data = $("#" + gridId).jqGrid('getRowData', ids[i]);

			if (data.acStatus == '4' || data.postStatus == '4' || data.approverStatus == '4') {
				$("#sequence" + ids[i]).addClass('ui-state-highlight-notStart');
				$("#acName" + ids[i]).addClass('ui-state-highlight-notStart');
				$("#postName" + ids[i]).addClass('ui-state-highlight-notStart');
				$("#approverName" + ids[i]).addClass('ui-state-highlight-notStart');
				$("#approvalType" + ids[i]).addClass('ui-state-highlight-notStart');
				$("#taskComments" + ids[i]).addClass('ui-state-highlight-notStart');
				$("#taskEndTime" + ids[i]).addClass('ui-state-highlight-notStart');
				continue;
			}

			if (data.postStatus == "1" || data.postStatus == '') {
				$("#postName" + ids[i]).addClass('ui-state-highlight-notStart');
			} else if (data.postStatus == "2") {
				$("#postName" + ids[i]).addClass('ui-state-highlight');
			}
			if (data.taskStatus == '1' || data.taskStatus == '') {
				if (data.postStatus != '3') {
					$("#approverName" + ids[i]).addClass('ui-state-highlight-notStart');
					$("#approvalType" + ids[i]).addClass('ui-state-highlight-notStart');
					$("#taskComments" + ids[i]).addClass('ui-state-highlight-notStart');
					$("#attachment" + ids[i]).addClass('ui-state-highlight-notStart');
					$("#taskEndTime" + ids[i]).addClass('ui-state-highlight-notStart');
				}

			} else if (data.taskStatus == '2') {
				$("#approverName" + ids[i]).addClass('ui-state-highlight');
				$("#approvalType" + ids[i]).addClass('ui-state-highlight');
				$("#taskComments" + ids[i]).addClass('ui-state-highlight');
				$("#attachment" + ids[i]).addClass('ui-state-highlight');
				$("#taskEndTime" + ids[i]).addClass('ui-state-highlight');
			}
			if (data.acStatus == '1' || data.acStatus == '') {
				$("#sequence" + ids[i]).addClass('ui-state-highlight-notStart');
				$("#acName" + ids[i]).addClass('ui-state-highlight-notStart');
				$("#postName" + ids[i]).addClass('ui-state-highlight-notStart');

			} else if (data.acStatus == '2') {
				$("#sequence" + ids[i]).addClass('ui-state-highlight');
				$("#acName" + ids[i]).addClass('ui-state-highlight');

			} else if (data.acStatus == '3') {
				$("#sequence" + ids[i]).removeClass('ui-state-highlight-notStart');
				$("#acName" + ids[i]).removeClass('ui-state-highlight-notStart');
				$("#postName" + ids[i]).removeClass('ui-state-highlight-notStart');
				$("#approverName" + ids[i]).removeClass('ui-state-highlight-notStart');
				$("#approvalType" + ids[i]).removeClass('ui-state-highlight-notStart');
				$("#taskComments" + ids[i]).removeClass('ui-state-highlight-notStart');
				$("#attachment" + ids[i]).removeClass('ui-state-highlight-notStart');
				$("#taskEndTime" + ids[i]).removeClass('ui-state-highlight-notStart');

			}
		}
	}
}

/**
 * 合并单元格
 * 
 * @param gridId
 * 
 */
function mergerCell(gridId) {
	//得到显示到界面的id集合
	var ids = $("#" + gridId + "").getDataIDs();
	//当前显示多少条
	var length = ids.length;
	//定义合并行数
	var rowSpanTaxCount = 1;
	//序号
	var sequenceNumber = 0;
	var lastParentCellId = "";
	for (var i = 0; i < length; i++) {
		//从上到下获取一条信息
		var before = $("#" + gridId + "").jqGrid('getRowData', ids[i]);
		var nowParentCellId = before['acId'];
		//合并子列
		rowSpanTaxCount = 1;
		for (var j = i + 1; j <= length; j++) {
			//和上边的信息对比 如果值一样就合并行数+1,并让当前单元格隐藏,然后设置rowspan 
			var end = $("#" + gridId + "").jqGrid('getRowData', ids[j]);
			if (before['acId'] == end['acId'] && before['postId'] == end['postId']) {
				rowSpanTaxCount++;
				$("#" + gridId + "").setCell(ids[j], 'postName', '', {
					display: 'none'
				});
				$("#" + gridId + "").setCell(ids[j], 'acName', '', {
					display: 'none'
				});
			} else {
				break;
			}
			$("#postName" + ids[i] + "").attr("rowspan", rowSpanTaxCount);
			$("#acName" + ids[i] + "").attr("rowspan", rowSpanTaxCount);
		}
		//合并父列
		rowSpanTaxCount = 1;
		for (var k = i + 1; k <= length; k++) {
			//和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
			var end = $("#" + gridId + "").jqGrid('getRowData', ids[k]);
			if (before['acId'] == end['acId']) {
				rowSpanTaxCount++;
				$("#" + gridId + "").setCell(ids[k], 'acName', '', {
					display: 'none'
				});
				$("#" + gridId + "").setCell(ids[k], 'sequence', '', {
					display: 'none'
				});
				$("#jqg__approveHistory_" + ids[k] + "").hide();
				$("#jqg__approveHistory_" + ids[k] + "").parent().hide();
			} else {
				break;
			}
			$("#acName" + ids[i] + "").attr("rowspan", rowSpanTaxCount);
			$("#sequence" + ids[i] + "").attr("rowspan", rowSpanTaxCount);
			$("#jqg__approveHistory_" + ids[i] + "").parent().attr("rowspan", rowSpanTaxCount);
		}
		//设置序号
		if (lastParentCellId != nowParentCellId) {
			$("#" + gridId + "").jqGrid('setCell', ids[i], 'sequence', ++sequenceNumber);
			lastParentCellId = nowParentCellId;
		}
	}
}

function mergerCheckbox(gridId) {
	//得到显示到界面的id集合
	var ids = $("#" + gridId + "").getDataIDs();
	//当前显示多少条
	var length = ids.length;
	//定义合并行数
	var rowSpanTaxCount = 1;
	//序号
	var sequenceNumber = 0;
	var lastParentCellId = "";
	for (var i = 0; i < length; i++) {
		//从上到下获取一条信息
		var before = $("#" + gridId + "").jqGrid('getRowData', ids[i]);
		var nowParentCellId = before['acId'];
		//合并父列
		rowSpanTaxCount = 1;
		for (var k = i + 1; k <= length; k++) {
			//和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
			var end = $("#" + gridId + "").jqGrid('getRowData', ids[k]);
			if (before['acId'] == end['acId']) {
				rowSpanTaxCount++;
				$("#" + gridId + "").setCell(ids[k], 'jqg__approveHistory_' + ids[k], '', {
					display: 'none'
				});
			} else {
				break;
			}
			$("#jqg__approveHistory_" + ids[i] + "").attr("rowspan", rowSpanTaxCount);
		}
	}
}
/**
 * 窗口添加纵向滚动条
 */
function addHtmlScroll() {
	//$("html").niceScroll({
	//    autohidemode: false,
	//    cursorcolor: "#eee",
	//    cursorwidth: "6px", // 滚动条的宽度，单位：便素
	//    cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
	//    horizrailenabled: true, // nicescroll可以管理水平滚动
	//    background: "#fff"
	//});
}
/**
 * Textarea添加纵向滚动条
 */
function addTextareaScroll() {
	//$("textarea").niceScroll({
	//	autohidemode: false,
	//	cursorcolor: "#eee",
	//	cursorwidth: "6px", // 滚动条的宽度，单位：便素
	//	cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
	//	horizrailenabled: true, // nicescroll可以管理水平滚动
	//	background: "#fff"
	//});
}
/**
 * 附件格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 */
function attachmentFormatter(cellvalue, options, rowObject) {
	return "<div id='_attachment-" + options.rowId + "' class='check-list'></div>";
}

/**
 * 替换审批意见里的换行符号
 */
function taskFormatter(cellvalue, options, rowObject) {

	//完成行&非结束行
	if (rowObject.acStatus == '3' && rowObject.acType != '3') {
		//完成行岗位为空处理
		if (rowObject.postId == '' || rowObject.postId == null) {
			return '岗位为空，系统自动跳过';
		}
	}

	//完成行审批人为空处理
	if (rowObject.postStatus == '3') {
		if (rowObject.approverId == '' || rowObject.approverId == null) {
			return '审批人为空，系统自动跳过';
		}
	}

	var result = '';

	//处理意见
	if (cellvalue == '' || cellvalue == null) {
		result = '';
	} else {
		if (cellvalue.indexOf('\n') >= 0) {
			result = cellvalue.replace(/\n/g, '</br>');
		} else {
			result = cellvalue;
		}

		if (cellvalue.indexOf('\\') >= 0) {
			result = cellvalue.replace(/\\/g, '');
		}
	}

	//附件
	result = result + '</br>' + '<div id="_attachment-' + options.rowId + '" class="check-list"></div>';
	return result;
}

//检查流程默认标题的有效性
function validateFlowTitle() {
	var flowTitleText = $("#flowTitleShow").val();
	if (flowTitleText.indexOf("@") < 0) {
		pop_tip_open("blue", "默认标题必须以@开头!");
		return;
	}
	var lastIndex = flowTitleText.lastIndexOf("@");
	if (lastIndex < 0 || lastIndex + 1 != flowTitleText.length) {
		pop_tip_open("blue", "默认标题必须以@结尾!");
		return;
	}
	//分割默认标题的内容
	var paramData = {
		businessObjectId: $("#businessObjectId").val(),
		variableNames: flowTitleText
	};
	$.ajax({
		url: hostUrl + "flow/businessObjectVariable/queryListByParamMap",
		data: JSON.stringify(paramData),
		type: 'POST',
		contentType: 'application/json',
		dataType: 'JSON',
		success: function (returnData) {
			if (returnData && returnData.success) {
				var itemList = returnData.result;
				if (itemList && itemList.length > 0) {
					var newFlowTitleText = "";
					var newFlowTitleCode = "";
					var showTitleArray = flowTitleText.split("-");
					var oldFlowTitleText = flowTitleText;
					for (var idx1 = 0; idx1 < showTitleArray.length; idx1++) {
						for (var idx2 = 0; idx2 < itemList.length; idx2++) {
							var showTitleItem = showTitleArray[idx1];
							var itemObj = itemList[idx2];
							if (showTitleItem == "@" + itemObj.name + "@") {
								newFlowTitleText += "@" + itemObj.name + "@-";
								newFlowTitleCode += "@" + itemObj.code + "@-";
								oldFlowTitleText = oldFlowTitleText.replace("@" + itemObj.name + "@", "");
							}
						}
					} //end for-loop
					if (newFlowTitleText.length > 2 && newFlowTitleCode.length > 2) {
						$("#flowTitleShow").val(newFlowTitleText.substr(0, newFlowTitleText.length - 1));
						$("#flowTitle").val(newFlowTitleCode.substr(0, newFlowTitleCode.length - 1));
						//$("#flowTitleShow").blur();
					}

					oldFlowTitleText = oldFlowTitleText.replace(new RegExp("-", "gm"), "");
					console.log("001 oldFlowTitleText=" + oldFlowTitleText);
					if (oldFlowTitleText && oldFlowTitleText.length > 1) {
						pop_tip_open("red", "默认标题的" + oldFlowTitleText + "找不到对应的变量编码");
					}
				} else {
					console.log("001 默认标题所有变量都找不到对应的变量编码=" + flowTitleText);
					pop_tip_open("red", "默认标题所有变量都找不到对应的变量编码");
					$("#flowTitleShow").val("");
					$("#flowTitle").val("");
				}

			}
		}
	});
}

function customPrint() {

	// 打印前
	var $lcbegin = $('#lcbegin');
	$lcbegin.addClass("_printBegin");
	$('#beginapproval').hide();
	$('.xj-form-header').hide();
	$('.container-fluid').not(".xj-form-header").css({
		"width": '1000px',
		"margin": "0 auto"
	});
	var approveflag = 0;
	if ($('#approveArea').length > 0 && $('#approveArea').is(":visible")) {
		approveflag = 1;
		$('#approveArea').hide();
		// $('#lcbegin').width('100%');
		$lcbegin.css({
			"overflow": "visible"
		});
		var lcbeginHeight = $('#lcbegin').height();
		$lcbegin.height('auto');
		$("#approvalList").jqGrid().setGridWidth($("#approvalListDiv").width(), true);
	} else {
		$lcbegin.css({
			"overflow": "visible"
		});
		var lcbeginHeight = $('#lcbegin').height();
		$lcbegin.height('auto');
	}
	try {
		$("#approvalList").jqGrid().setGridWidth($("#approvalListDiv").width(), true);
	} catch (e) {}
	var relateHtml;
	if ($("#relateFlow").length > 0) {
		relateHtml = $("#relateFlow").html();
		if ($("#relateFlow").find("a").length > 0) {
			$("#relateFlow").find("a").removeAttr("href");
		}
	}


	try {
		// 复制表单区域
		// var $iframe = $("iframe#bizForm");
		// var bd_bf = $iframe.contents().find("body").children("div").clone(),
		// 	$printBox = $("<div id='printBox'></div>");
		// bd_bf.width("100%");
		$printBox = $("<div id='printBox'></div>")
		if ($('#form-composer').contents().length > 0) {
			// 有react组件生成的自定义表单
			var $bd_bf = $('#form-composer').contents().width('100%');
			$bd_bf.find('.upload').css('width', '100%');	
			$printBox.append($bd_bf.html());

		} else {
			// 无react标签，但有iframe标签
			var $iframe = $("iframe#bizForm");
			var $bd_bf = $iframe.contents().find("body").children("div").clone();
			$bd_bf.width("100%");
			$printBox.append($bd_bf.html());
		}

		var $bizFormDiv = $("#bizFormDiv");
		$bizFormDiv.after($printBox);
		$bizFormDiv.hide();
		$printBox = $("#printBox");

		var tempLinkStyle = $.ajax({
			url: "../../../oa/servey/serveyCreate/css/serveyCreate_edit.css",
			async: false
		}).responseText;
		var $contentOffice = $iframe.contents().find("iframe#contentOffice");
		var styleIframe = $iframe.contents().find("style");
		var styleHtml = styleIframe.html(),
			tempStyle = $("<style></style>");
		var csshtmltemp = tempLinkStyle + styleHtml;
		tempStyle.html(csshtmltemp);
		$printBox.append(tempStyle);
		$printBox.css({
			border: "1px solid #ccc"
		});
		if ($contentOffice.length) {
			var officeParentBd = $("#officeJk"),
				$word = $("<div></div>"),
				html = $contentOffice.contents().find("body").children().clone();
			var url = window.location.origin + window.hostUrl + "officeFiles/"
			var img = html.find("img");
			img.each(function (i) {
				var tempUrl = $(this).attr("src");
				$(this).attr("src", url + tempUrl);
			})

			$word.append(html);
			officeParentBd.hide();
			officeParentBd.after($word);
		}
		$printBox.find(".container-fluid").css("width", "");
		$("#approvalList").jqGrid().setGridWidth($("#approvalListDiv").width(), true);
		window.bizForm.resizeOfficeIframe();

	} catch (e) {}
	try {
		resizeIframe();
		window.bizForm.resizeOfficeIframe();
	} catch (e) {}

	// // 打印
	window.print();

	//
	// 打印后
	try {
		$lcbegin.removeClass("_printBegin");
		$bizFormDiv.show(); //ifram显示sh
		officeParentBd && officeParentBd.show();
		$printBox && $printBox.remove();
		tempStyle.remove();
	} catch (e) {}

	$('#beginapproval').show();
	$('.xj-form-header').show();
	$('.container-fluid').not(".xj-form-header").css({
		"width": "auto"
	});
	if ($('#approveArea').length > 0 && approveflag) {
		$('#approveArea').show();
		// $('#lcbegin').width('74%');
		$lcbegin.css({
			"overflow": "auto"
		});
		$lcbegin.height(lcbeginHeight + 'px');
		$("#approvalList").setGridWidth($("#approvalListDiv").width(), true);
	} else {
		$lcbegin.css({
			"overflow": "auto"
		});
		$lcbegin.height(lcbeginHeight + 'px');
		$("#approvalList").setGridWidth($("#approvalListDiv").width(), true);
	}
	if ($("#relateFlow")) {
		$("#relateFlow").html(relateHtml);
	}
	try {
		resizeIframe();
		window.bizForm.resizeOfficeIframe();
	} catch (e) {}
}