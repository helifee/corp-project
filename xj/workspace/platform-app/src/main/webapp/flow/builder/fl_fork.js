$(function () {

    var currentVarArray;
    //初始化变量列表
    var initVariableList = function() {
        if(window.parent&&$.isFunction(window.parent.getVariableListDef)){
            var variableListDef = window.parent.getVariableListDef();
            $.when(variableListDef).done(function (variableList) {
                currentVarArray = variableList;
                var selectObj = $('#varName');
                var tempSelObj = $('<select></select>');
                $.each(variableList,function (i,variableObj) {
                    var code = variableObj.code;
                    var name = variableObj.name;
                    var type = variableObj.type;
                    var optObj = $('<option data-type="'+type+'" value="'+code+'">'+name+'</option>');
                    tempSelObj.append(optObj);
                });
                selectObj.append(tempSelObj.html());

                if(window.parent&&$.isFunction(window.parent.getSelectCell)){
                    var cell = window.parent.getSelectCell();

                    //设置分支名称
                    $('#lineName').val(cell.value);

                    //设置公式
                    //var formula = translate(line.conditionExpression);
                    var formula = cell.conditionTranslation;
                    formula = (formula&&formula!=''?formula:translate(cell.conditionExpression));
                    $('#formulaCanvas').val(formula);

                    //cell.conditionExpression = translate(cell.conditionTranslation);

                }
            });
        }
    };
    initVariableList();

    //变量名称更改事件
    $('#varName').change(function() {
        $('#varVal').val('');
    });

    //添加公式按钮点击事件
    $('#addConditionBtn').on('click',function () {
        addFormula();
    });

    //验证公式按钮点击事件
    $('#validateFormulaBtn').on('click',function () {
        validateFormula();
    });

    //保存按钮点击事件
    $('#saveBtn').on('click',function () {
        //输入值名称检查
        /*if($('#lineName').val() == '') {
            $.xljUtils.tip('blue', '名称不能为空！');
            return ;
        }*/

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

        var lineName = $('#lineName').val();
        var formulaCanvas = $('#formulaCanvas').val();
        if(lineName==''&&formulaCanvas!=''){
            $('#lineName').val(formulaCanvas.replace(/[\[\]\(\)\']/g,''));
        }

        var name = $('#lineName').val();
        var conditionTranslation = $('#formulaCanvas').val();
        var conditionExpression = translate(conditionTranslation);
        if(window.parent&&$.isFunction(window.parent.getSelectCell)){
            var cell = window.parent.getSelectCell();
            cell.conditionTranslation = conditionTranslation;
            cell.conditionExpression = conditionExpression;
            cell.value = name;
            window.parent.updateCellAttr(cell.id,'value',cell.value);
            window.parent.closeFrameWnd();
        }
    });

    //转换表达式
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
        $.each(currentVarArray, function(index, item) {
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

    //添加公式方法
    var addFormula = function () {
        var formula = '[' + $('#varName').find("option:selected").text() + ']' + ' ' + $('#operator').val() + ' ';
        if($('#varName').find("option:selected").attr('data-type') != "1"){
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
        $('#formulaCanvas').val($('#formulaCanvas')[0].value + ' ' + formula);

        //先后台校验表达式
        $.post(hostUrl + '/expression/validate', {expression: $('#formulaCanvas').val()}, function(data) {
            if(data.success) {
                $('#validateResult').removeClass('error').addClass('success').text('公式验证通过');
            } else {
                $.xljUtils.tip('red', '表达式有错误，请修改！');
                $('#validateResult').removeClass('success').addClass('error').text('公式验证不通过');
            }
        });
    };

    //调整公式优先级
    var insertBrackets = function (bracket) {
        $('#formulaCanvas').val($('#formulaCanvas')[0].value + ' ' + bracket );
    };
    window.insertBrackets = insertBrackets;

    //验证公式
    var validateFormula = function () {
        $.post(hostUrl + '/expression/validate', {expression: $('#formulaCanvas')[0].value}, function(data) {
            if(data.success) {
                $('#validateResult').removeClass('error').addClass('success').text('公式验证通过');
            } else {
                $('#validateResult').removeClass('success').addClass('error').text('公式验证不通过');
            }
        });
    };

    //同步验证公式是否正确
    var validateFormulaSync = function (expression) {
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

});