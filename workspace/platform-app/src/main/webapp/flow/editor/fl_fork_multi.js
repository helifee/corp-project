$(function() {
	//定义连线缓存结构
	window.forkLines = opener.forkLines;
	
	//加载变量类型，即业务对象属性
	window.currentVarArray = getBizObjectVal();
	$.each(window.currentVarArray, function(index, item){
		$('#varName').append("<option type='"+item.type+"' value="+item.code+">"+item.name+"</option>");
	});

	initGrid();

	
	//显示名称回写
	$('#lineName').blur(function() {
		var selectedId = $("#formulaTable").jqGrid("getGridParam", "selrow");
		$("#formulaTable").jqGrid('setRowData', selectedId, {name: $('#lineName').val()});
	});
	
	//添加公式按钮
	$("#addFormula").click(function() {
		var formula = '[' + $('#varName').find("option:selected").text() + ']' + ' ' + $('#operator').val() + ' ';
		if($('#varName').find("option:selected").attr('type') != "1"){
			formula = formula + $('#varVal').val();
			
		}else{
			if($('#operator').val() == 'in' || $('#operator').val() == 'not in') {
				formula = formula + $('#varVal').val();
				
			} else {
				formula = formula + "'" + $('#varVal').val() + "'";				
			}
		}
		
		//在每一个单元表达式上加上括号
		formula = '(' + formula + ')';
		
		//先后台校验表达式
		$.post(hostUrl + '/expression/validate', {expression: formula}, function(data) {
			if(data.success) {
				$('#formulaCanvas').val($('#formulaCanvas')[0].value + ' ' + formula);
				
				//公式回写
				setExpressionToCell();
			} else {
				$.xljUtils.tip('red', '表达式有错误，请修改！');
			}
		});		
	});

	//公式编辑区变化事件：公式回写
	$("#formulaCanvas").change(function() {
		setExpressionToCell();
	});
	
	//保存按钮
	$('#save').click(function() {
		var rowList = $("#formulaTable").jqGrid("getRowData");
		
		var error = 0;
		$.each(rowList, function(index, row) {
			
			//检查数据是否为空
			if(row.name == '' || row.conditionExpression == '') {
				//高亮出错行
				var ids = $("#formulaTable").getDataIDs();
				$('#' + ids[index]).css('background-color', 'red');
				error++;
			}
			
			if(row.conditionExpression.indexOf('该变量已删除') != -1) {
				$.xljUtils.confirm('blue', '公式中变量已删除，请重新编辑！', function(){}, false);
				error++;
				return;
			}

			//验证条件表达式是否正确
			if(!validateFormulaSync(row.conditionExpression)){
				error++;
				$.xljUtils.tip('blue','条件表达式有错误，请确认输入正确的表达式！');
				return;
			}
			
			//设置业务ID
			if(!row.id) {
				row.id = window.bizIdList[index];
			}
			
			//重新渲染线的名称
			opener.callBack(row.nodeId, row.name);
			
			//去除与后台不一致属性
			row.target = undefined;
			
			//翻译公式
			//row.conditionExpression = translate(row.conditionExpression);
			
			//缓存连线的业务属性
			//var lineObj = window.localStorage.getItem(opener.localTemp + row.nodeId);
			//lineObj.name=
			window.localStorage.setItem(opener.localTemp + row.nodeId, JSON.stringify(row));
		});
		
		if(error == 0) {
			closeWin();
		}
	});
	
	//关闭按钮
	$('#close').click(function() {
		window.close();
	});
	
});

function getBizObjectVal() {
	var ret;
	$.ajax({
		type: 'GET',
		url: hostUrl + 'flow/businessObjectVariable/queryVariableUsedInExpression?businessObjectId=' + $.getUrlParam('businessObjectId'),
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		async:false,
		success: function(data) {
			ret = data.result;
		}
	});
	return ret;
}

//设置当前行指定列值
function setExpressionToCell() {
	setCellValue({conditionExpression: translate($('#formulaCanvas')[0].value),conditionTranslation:$('#formulaCanvas')[0].value});
}

//设置当前行指定列值
function setCellValue(cell) {
	var selectedId = $("#formulaTable").jqGrid("getGridParam", "selrow");
	$("#formulaTable").jqGrid('setRowData', selectedId, cell);
}

//设置当前行指定列值
function getCellValue(cellName) {
	var selectedId = $("#formulaTable").jqGrid("getGridParam", "selrow");
	return $("#formulaTable").jqGrid('getCell', selectedId, cellName);
}

function insertBrackets(bracket) {
	$('#formulaCanvas').val($('#formulaCanvas')[0].value + ' ' + bracket );
	setExpressionToCell();	
	
//	var formulaExist = getCellValue('conditionExpression');
//	if(formulaExist != null) {
//		var formulaNew = formulaExist + ' ' + bracket;
//	}
//	setCellValue({conditionExpression: formulaNew});
}

//验证公式
function validateFormula() {
	$.post(hostUrl + '/expression/validate', {expression: $('#formulaCanvas')[0].value}, function(data) {
		if(data.success) {
			$('#validateResult').removeClass('error').addClass('success').text('公式验证通过');
		} else {
			$('#validateResult').removeClass('success').addClass('error').text('公式验证不通过');
		}
	});
}

//同步验证公式是否正确
function validateFormulaSync(expression) {
	var isValidate = false;
	$.ajax({
		type : "post",
		url : hostUrl + '/expression/validate',
		//dataType : "json",
		async : false,
		data : {expression:expression}, //将对象序列化成JSON字符串  ,
		//contentType : 'application/json;charset=utf-8', //设置请求头信息
		success : function(data) {
			if(data.success){
				isValidate = true;
			}
		}
	});
	return isValidate;
}

function translate(expression) {

	if(!expression||$.trim(expression)==''){
		return '';
	}
	var reg = /\[(.+?)\]/g;
	var matchArr = expression.match(reg);
	for (var i = 0; i < matchArr.length; i++) {
		var expressionName = matchArr[i];
		expressionName = expressionName.replace('[','').replace(']','');
		var expressionCode = getExpressionCode(expressionName);
		expression = expression.replace('['+expressionName+']','['+expressionCode+']');
	}

	return expression;
}

function getExpressionCode(expressionName) {
	var retParam;
	$.each(window.currentVarArray, function(index, item) {
		if(expressionName == item.name) {
			retParam = item.code;
		}
		else if(expressionName == item.code){
			retParam = item.name;
		}
	});

	if(typeof retParam == 'undefined') {
		retParam = '该变量已删除';

	}

	return retParam;
}

function getParam(param) {
	var retParam;
	$.each(window.currentVarArray, function(index, item) {
		if(param == item.name) {
			retParam = item.code;
		}
		if(param == item.code) {
			retParam = item.name;
		}
	});
	
	if(typeof retParam == 'undefined') {
		retParam = '该变量已删除';
	}
	return retParam;
}

/**
 * 初始化表格
 * @returns
 */
function initGrid() {
	//判断操作类型
	var oneLine = localStorage.getItem(opener.localTemp + forkLines[0].nodeId);
	if(oneLine) {	//修改
		$.each(forkLines, function(index, line) {
			var lineCache = JSON.parse(localStorage.getItem(opener.localTemp + line.nodeId));
			forkLines[index].id = lineCache.id;
//			forkLines[index].target = lineCache.targetId;	//值已从画布传过来
			forkLines[index].name = lineCache.name;
			forkLines[index].conditionExpression = lineCache.conditionTranslation?translate(lineCache.conditionTranslation):lineCache.conditionExpression;
			forkLines[index].conditionTranslation = translate(forkLines[index].conditionExpression);
		})
		
	} else  {	//新增
		//批量生成业务ID
		$.ajax({
			type:'get',
			url: hostUrl + 'generator/getGuuids?count=' + forkLines.length,
			success: function(data) {
				window.bizIdList = data.result;
			}
		});
		
	}		
	
	$("#formulaTable").jqGrid({
		data: forkLines,
		datatype: 'local',
		rownumbers: true,
		colNames: ['NodeId', '业务ID', '流向环节名称', '显示名称', '条件表达式','条件公式'],
		colModel: [
			{name: 'nodeId', hidden: true},
			{name: 'id', hidden: true},
			{name: 'target',  width: 100},
			{name: 'name',  width: 150},
			{name: 'conditionExpression',hidden:true},
			{name: 'conditionTranslation'}
		],
		onSelectRow: function(rowId) {
			//清空变量选择区
			$('#varName').get(0).selectedIndex = 0;
			$('#operator').get(0).selectedIndex = 0;
			$('#varVal').val('');
			$('#validateResult').text('');
			
			//当前 行数设置到公式编辑区
			var curLine = $("#formulaTable").jqGrid("getRowData", rowId);
			$("#targetName").val(curLine.target);
			$("#lineName").val(curLine.name);
			$("#formulaCanvas").val(curLine.conditionTranslation);
		},
		gridComplete : function() {                         //当表格所有数据都加载完成而且其他的处理也都完成时触发此事件，排序，翻页同样也会触发此事件
			$.xljUtils.resizeNestedGrid();//Grid自适应
			$.xljUtils.addGridScroll();
			$.xljUtils.gridResizeFn();
		}
	});

	$("#formulaTable").setSelection(1);	//默认选中首行

}