/**
 * add by dgh on 2017/12/4
 */
$(function () {
    var currentVarArray;

    //初始化该条件网关所有条件连线数据列表
    function initFormulaList() {
        var selCell = window.parent.getSelectCell();
        var edges = selCell.edges;
        var edgeArr = [];
        var forkLines = [];
        $.each(edges,function (i,edge) {
            if(edge.source===selCell){
                var forkLine = {};
                forkLine.nodeId = edge.id;
                forkLine.target = edge.target.value;
                forkLine.name = edge.value;
                forkLine.conditionExpression = edge.conditionExpression;
                forkLine.conditionTranslation = edge.conditionTranslation;
                forkLines.push(forkLine);
            }
        });


        $("#formulaTable").jqGrid({
            data: forkLines,
            datatype: 'local',
            rownumbers: true,
            width:$('div.grid-container').width()-1,
            colNames: ['NodeId', '流向环节名称', '显示名称', '条件表达式','条件公式'],
            colModel: [
                {name: 'nodeId', hidden: true},
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
                var ids = $('#formulaTable').jqGrid('getDataIDs');
                $('#formulaTable').jqGrid('setSelection',ids[0]);
                $.xljUtils.resizeNestedGrid();//Grid自适应
                $.xljUtils.addGridScroll();
                //$.xljUtils.gridResizeFn();
                //$('#formulaTable').jqGrid().setGridWidth($('div.grid-container').width(), true);

            }
        });
    }
    initFormulaList();

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
            });
        }
    };
    initVariableList();

    //插入优先级表达式
    window.insertBrackets = function (bracket) {
        $('#formulaCanvas').val($('#formulaCanvas')[0].value + ' ' + bracket );
    };

    //验证公式
    var validateFormula = function () {
        $.post(serviceUrl + '/expression/validate', {expression: $('#formulaCanvas')[0].value}, function(data) {
            if(data.success) {
                $('#validateResult').removeClass('error').addClass('success').text('公式验证通过');
            } else {
                $('#validateResult').removeClass('success').addClass('error').text('公式验证不通过');
            }
        });
    };

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
        conditionChange();
    };

    //表达式更改，同时更改列表内容
    var conditionChange = function () {
        var conditionTranslation = $('#formulaCanvas').val();
        var conditionExpression = translate(conditionTranslation);
        //先后台校验表达式
        $.post(serviceUrl + '/expression/validate', {expression: conditionExpression}, function(data) {
            if(data.success) {
                var selectedId = $('#formulaTable').jqGrid('getGridParam', 'selrow');
                var rowData = $('#formulaTable').jqGrid('getRowData',selectedId);
                rowData.conditionTranslation = conditionTranslation;
                rowData.conditionExpression = conditionExpression;
                $('#formulaTable').jqGrid('setRowData', selectedId, rowData);

                $('#validateResult').removeClass('error').addClass('success').text('公式验证通过');
            } else {
                $.xljUtils.tip('red', '表达式有错误，请修改！');
                $('#validateResult').removeClass('success').addClass('error').text('公式验证不通过');
            }
        });

    };

    //添加表达式
    $('#addConditionBtn').on('click',function () {
        addFormula();
    });

    //条件表达式按键事件
    $('#formulaCanvas').on('keyup',function () {
        conditionChange();
    });

    //显示名称按键事件
    $('#lineName').on('keyup',function () {
        var selectedId = $('#formulaTable').jqGrid('getGridParam', 'selrow');
        var rowData = $('#formulaTable').jqGrid('getRowData',selectedId);

        var name = $(this).val();
        rowData.name = name;

        $('#formulaTable').jqGrid('setRowData', selectedId, rowData);
    });

    //保存条件表达式
    $('#saveBtn').on('click',function () {
        var rowDataArr = $('#formulaTable').jqGrid('getRowData');
        for(var i in rowDataArr) {
            var forkLine = rowDataArr[i];
            var nodeId = forkLine.nodeId;
            var nodeName = forkLine.name;
            var conditionExpression = forkLine.conditionExpression;
            var conditionTranslation = forkLine.conditionTranslation;

            if(window.parent&&$.isFunction(window.parent.getCellById)){
                var cell = window.parent.getCellById(nodeId);
                cell.conditionTranslation = conditionTranslation;
                cell.conditionExpression = conditionExpression;
                cell.value = nodeName;
                window.parent.updateCellAttr(cell.id,'value',cell.value);
            }
        }
        window.parent.closeFrameWnd();
    });

    //验证公式按钮事件
    $('#validateFormulaBtn').on('click',function () {
        validateFormula();
    });

    //同步验证公式是否正确
    var validateFormulaSync = function (expression) {
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

    //获取表达式
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
});