/**
 * Created by dgh on 2017/11/24.
 */
$(function () {

    var operateType;

    //选择器回调函数
    var selectorCallback = function (selectedData, ele) {
        var tableObj = $($(ele).parents('table')[0]);
        var oldTrObj = $(ele).parents('tr');
        var type = oldTrObj.find(':input[name="type"]').val();
        if (selectedData && $.isArray(selectedData)) {
            if (selectedData.length == 0) {
                if (type == '1' && participantScope == '11') {
                    oldTrObj.find(':input[name="paramValue"]').val('');
                }
            }

            for (var i = 0; i < selectedData.length; i++) {
                var obj = selectedData[i];
                var id;
                var name;
                var newRowObj;
                if (type == '1') {//人员
                    //id = obj.id;
                    id = obj.userId == '' ? obj.id : obj.userId;
                    if (obj.postName && obj.postName != '') {
                        name = obj.prefixName + '/' + obj.postName + '/' + obj.name;
                    } else {
                        name = obj.prefixName + '/' + obj.name;
                    }
                    name = obj.name;
                    newRowObj = addPersonRow(tableObj);
                }

                if (i == 0) {
                    oldTrObj.find(':input[name="participantId"]').val(id);
                    oldTrObj.find(':input[name="participantName"]').val(name);
                } else {
                    getSelectRow(tableObj).after(newRowObj);
                    selectRow(newRowObj);

                    var selRowObj = getSelectRow(tableObj);
                    selRowObj.find(':input[name="type"]').val(type);
                    selRowObj = getSelectRow(tableObj);
                    selRowObj.find(':input[name="participantId"]').val(id);
                    selRowObj.find(':input[name="participantName"]').val(name);
                }
            }
        }

    };

    //添加人员类型参与者
    var addPersonRow = function (table) {
        if (typeof table === 'string') {
            table = $('#' + table);
        }
        //当前表格id
        var tableId = table.attr('id');
        var index = table.find('tr').length + 1;
        var trObj = $('<tr id="tr_' + tableId + '_' + index + '"></tr>');
        //类型
        var typeTd = $('<td style="width:15%;"></td>');
        var typeInputObj = $('<select class="form-control addInputWidth" id="type_' + tableId + '_' + index + '" name="type" >' +
            '<option value="1" selected>人员</option>' +
            '</select>'
        );
        typeTd.append(typeInputObj);

        //参与者
        var participantTd = $('<td style="width:70%;" colspan="2"></td>');
        var participantInputObj = $(
            '<div class="input-group" style="width:100%;">' +
            '    <input type="text" class="form-control" id="participantName_' + tableId + '_' + index + '" name="participantName" placeholder="请选择..." readonly="true">' +
            '    <input type="hidden" id="participantId_' + tableId + '_' + index + '" name="participantId">' +
            '    <span class="input-group-addon w28 "  readonly="readonly" >' +
            '        <i class="fa fa-ellipsis-h"></i>' +
            '    </span>' +
            '</div>'
        );
        participantInputObj.find('.input-group-addon').xljMultipleSelector({
            title: '选择人员',
            selectorType: 'onlyPerson',
            targetId: 'participantId_' + tableId + '_' + index,
            targetName: 'participantName_' + tableId + '_' + index,
            treeParam: {userStatus: true},
            saveCallback: function (selectedData, ele) {
                selectorCallback(selectedData, ele);
            }

        });
        participantTd.append(participantInputObj);

        var paramTd = $('<td style="width:35%;"></td>');
        trObj.append(typeTd);
        //trObj.append(scopeTd);
        trObj.append(participantTd);
        //trObj.append(paramTd);
        //table.append(trObj);
        trObj.on('click', function () {
            selectRow($(this));
        });
        return trObj;
    };

    //选择行
    var selectRow = function (trObj) {
        trObj.parents('table').find('tr.ui-state-highlight').removeClass('ui-state-highlight');
        $(trObj).addClass('ui-state-highlight');
    };

    //删除选中行
    var deleteRow = function (table) {
        if (typeof table === 'string') {
            table = $('#' + table);
        }
        var trObj = getSelectRow(table);
        var prevTrObj = trObj.prev('tr');
        var nextTrObj = trObj.next('tr');
        trObj.remove();
        if (prevTrObj[0]) {
            selectRow(prevTrObj);
        } else if (nextTrObj[0]) {
            selectRow(nextTrObj);
        }
    };

    //获取选中行
    var getSelectRow = function (table) {
        if (typeof table === 'string') {
            table = $('#' + table);
        }
        var trObj = table.find('tr.ui-state-highlight');
        return trObj;
    };

    //批量添加行（初始化使用）
    var batchAddRows = function (table,rowDatas) {
        if(typeof table === 'string' ){
            table = $('#'+table);
        }
        if(!rowDatas&&!$.isArray(rowDatas)){
            return;
        }
        for (var i = 0; i < rowDatas.length; i++) {
            var obj = rowDatas[i];
            var participantType = '1';//obj.participantType;
            //var participantScope = obj.participantScope;
            var participantId = !obj.participantId?obj.accessibleId:obj.participantId;
            var participantName = !obj.participantName?obj.accessibleName:obj.participantName;

            var trObj;
            switch (participantType) {
                case '1':
                    trObj = addPersonRow(table);
                    table.append(trObj);
                    break;
                default:
                    break;
            }
            if(trObj){
                selectRow(trObj);
                var selRowObj = getSelectRow(table);
                selRowObj.find(':input[name="type"]').val(participantType);
                selRowObj = getSelectRow(table);

                selRowObj.find(':input[name="participantId"]').val(participantId);
                selRowObj.find(':input[name="participantName"]').val(participantName);

            }
        }
    };

    //获取可阅人列表
    var getAccessibleDatas = function (table,instanceId) {
        if(typeof table == 'string'){
            table = $('#'+table);
        }
        var trArr = table.find('tr');
        var accessibleList = [];
        for (var i = 0; i < trArr.length; i++) {
            var trObj = $(trArr[i]);
            var inputDataArr = trObj.find(':input').serializeArray();
            var instanceAccesibleObj = {
                fiId:instanceId
            };
            $.each(inputDataArr,function (i,inputData) {
                var inputDataName = inputData.name;
                var inputDataValue = inputData.value;
                if(inputDataName=='participantName'){
                    instanceAccesibleObj.accessibleName = inputDataValue
                }

                if(inputDataName=='participantId'){
                    instanceAccesibleObj.accessibleId = inputDataValue
                }
            });
            accessibleList.push(instanceAccesibleObj);
        }

        return accessibleList;
    };

    //初始化可阅人
    var initParticipantForm = function () {
        if (window.parent && $.isFunction(window.parent.getInstanceDataDef)) {
            var instanceDataDef = window.parent.getInstanceDataDef();
            $.when(instanceDataDef).done(function (instanceData) {
                var participant = instanceData.instanceData.accessibles;
                if (participant && participant != '') {
                    var participantArr = JSON.parse(participant);
                    batchAddRows('_baseParticipantTb', participantArr);
                }

            });
        }
    };
    initParticipantForm();

    //添加可阅人按钮
    $('#addAccessibleBtn').on('click', function () {
        var tbObj = $('#_baseParticipantTb');
        var trObj = addPersonRow(tbObj);
        tbObj.append(trObj);
        selectRow(trObj);
    });


    //保存基本信息
    $('#saveBtn').on('click', function () {
        /*$('#_flForm').attr('data-validate-success', 'saveBaseInfo()');
        $('#_flForm').submit();*/
        saveBaseInfo();
    });

    //删除行
    $('#delAccessibleBtn').on('click', function () {
        deleteRow('_baseParticipantTb');
    });

    //保存基本信息
    window.saveBaseInfo = function () {
        var baseData = {};
        if (window.parent && $.isFunction(window.parent.getInstanceDataDef)) {
            var instanceDataDef = window.parent.getInstanceDataDef();
            $.when(instanceDataDef).done(function (instanceData) {
                //获取可阅人信息
                var participantArr = getAccessibleDatas('_baseParticipantTb', instanceData.instanceData.id);
                instanceData.instanceData.accessibles = JSON.stringify(participantArr);
                window.parent.instanceDataDefResolveData(instanceData);
            });
        }
    };

    //给变量列表页面使用
    window.getOldTitleVariable = function () {
        return $("#flowTitle").val();
    };

    //给变量列表页面回调使用使用
    window.setNewTitleVariable = function (showTitle, hiddenTitleId) {
        $("#flowTitleShow").val(showTitle);
        $("#flowTitle").val(hiddenTitleId);
    };


});