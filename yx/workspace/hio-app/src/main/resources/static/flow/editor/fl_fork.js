$(function() {
	editorStatus=$.getUrlParam('editorStatus');
	if (editorStatus == 0) {
		$('#formulaForm').find('input,select,textarea').attr('disabled', true);
	}
	//加载变量类型
	window.businessObjectId = $.getUrlParam('businessObjectId');
	$.ajax({
		type: 'GET',
		url: serviceUrl + 'flow/businessObjectVariable/queryVariableUsedInExpression?businessObjectId=' + businessObjectId,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function(data) {
			window.currentVarArray = data.result;
			$.each(data.result, function(index, item){
				console.log(item);
				$('#varName').append("<option type='"+item.type+"' value="+item.code+">"+item.name+"</option>");
			});
			
			//从缓存中获取连线数据
			var nodeId = $.getUrlParam('nodeId');
			window.line = JSON.parse(window.localStorage.getItem(opener.localTemp+nodeId));
			if(line){
				//设置分支名称
				$('#lineName').val(line.name);
				
				//设置公式
				//var formula = translate(line.conditionExpression);
				var formula = line.conditionTranslation;
				formula = (formula&&formula!=''?formula:translate(line.conditionExpression));
				$('#formulaCanvas').val(formula);

				line.conditionExpression = translate(line.conditionTranslation);
				
			} else {//新增时生成业务ID
				line = {};
				line.nodeId = nodeId;
				setLineId();
			}			
		}
	});
	
	//缓存最终的公式
	$('#save').click(function() {
		
		//输入值名称检查
		if($('#lineName').val() == '') {
			$.xljUtils.tip('blue', '名称不能为空！');
			return ;
		}
		
		//输入值公式检查
		if($('#formulaCanvas')[0].value == '') {
			$.xljUtils.tip('blue', '公式不能为空！');
			return ;
		}
		
		if($('#formulaCanvas')[0].value.indexOf('该变量已删除') != -1) {
			$.xljUtils.confirm('blue', '公式中变量已删除，请重新编辑！', function(){}, false);
			return ;
		}

		//验证条件表达式是否正确
		if(!validateFormulaSync($('#formulaCanvas')[0].value)){
			$.xljUtils.tip('blue','条件表达式有错误，请确认输入正确的表达式！');
			return;
		}

		line.name = $.xljUtils.htmlDecode($("#lineName").val());
		line.conditionExpression = translate($("#formulaCanvas")[0].value);
		line.conditionTranslation = $("#formulaCanvas")[0].value;
		window.localStorage.setItem(opener.localTemp+line.nodeId, JSON.stringify(line));
		opener.callBack(line.nodeId, line.name);
		closeWin();

	});
	
	//关闭按钮
	$('#close').click(function() {
		window.close();
	});
	
	$('#varName').change(function() {
		$('#varVal').val('');
	});
	
});

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

		if(expressionName == item.code) {
			retParam = item.name;
		}

	});

	if(typeof retParam == 'undefined') {
		retParam = '该变量已删除';
		var formulaVal = $('#formulaCanvas').val();
		$('#formulaCanvas').val(formulaVal.replace(expressionName,retParam));
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

//添加公式方法
function addFormula() {
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
	$.post(serviceUrl + '/expression/validate', {expression: formula}, function(data) {
		if(data.success) {
			$('#formulaCanvas').val($('#formulaCanvas')[0].value + ' ' + formula);
		} else {
			$.xljUtils.tip('red', '表达式有错误，请修改！');
		}
	});
}

//调整公式优先级
function insertBrackets(bracket) {
	$('#formulaCanvas').val($('#formulaCanvas')[0].value + ' ' + bracket );
}

//验证公式
function validateFormula() {
	$.post(serviceUrl + '/expression/validate', {expression: $('#formulaCanvas')[0].value}, function(data) {
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
		url : serviceUrl + '/expression/validate',
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

/**
 * 获取Guuid并返回
 */
function setLineId() {
	$.ajax({
	    type:'get',
		url: serviceUrl + 'sys/uuid/generator/getGuuid',
		success: function(data) {
		     line.id = data.result;
		    }
	});
}
