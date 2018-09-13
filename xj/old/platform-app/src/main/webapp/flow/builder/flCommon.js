/**
 * Created by dgh on 2017/11/28.
 */
//添加行
var addRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }
    var trObj = addStandardPostRow(table);
    table.append(trObj);
    selectRow(trObj);
};

//准备根据类型和id查询参与人参数
var prepareParamDataForResData = function (partnerList){
    var userArray = [];
    var postArray = [];
    var roleArray = [];
    var orgArray = [];
    for(var idx=0; idx<partnerList.length; idx++){
        var item = partnerList[idx];
        var scope = item.participantScope;
        scope = scope+"";
        if(scope == "11"){//指定人员
            userArray.push(item.participantId+"&&"+item.paramValue);
            //userArray.push(item.participantId);
        }else if(scope == "21"){//指定岗位
            postArray.push(item.participantId);
        }else if(scope.indexOf("31")==0 || scope == "51"){//选择了角色
            roleArray.push(item.participantId);
        }
    }
    var typeArray = ['postUser', 'post', 'role', 'org'];
    var idArray = [userArray, postArray, roleArray, orgArray];
    var paramArray = new Array();
    for(var i=0; i<typeArray.length; i++){
        var idItemArray = idArray[i];
        if(idItemArray.length>0){
            var obj = new Object();
            obj.type = typeArray[i];
            obj.ids = idArray[i];
            paramArray.push(obj);
        }
    }
    return paramArray;
};

//获取参与人数据
var queryResDataList = function (paramData){
    var participantNameDef = new $.Deferred();
    var postdata={ paramData:paramData };
    $.ajax({ //发送更新的ajax请求
        type: "POST",
        url: hostUrl+"sys/org/orgnazation/queryResListByIds?_t="+new Date().getTime(),
        dataType:"json",
        data:  JSON.stringify(postdata),//此处必须JSON.stringify(paramData)
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function(data){
            var resDataList = data.result;
            var participantNameMap = {};
            for(var i in resDataList){
                var obj = resDataList[i];
                var id = obj.id;
                var participantName = obj.prefixName;
                participantNameMap[id] = participantName;
            }

            participantNameDef.resolve(participantNameMap);
        },
        error: function(data){
            if(data.msg){
                $.xljUtils.tip('red',data.msg);
            }else{
                $.xljUtils.tip('red','查询资源数据的接口异常');
            }
            participantNameDef.resolve(null);
        }
    });

    return participantNameDef.promise();
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
        var participantType = obj.participantType;
        var participantScope = obj.participantScope;
        var participantId = obj.participantId;
        var participantName = obj.participantName;
        var paramValue = obj.paramValue;
        var sort = obj.sort;

        var trObj;
        switch (participantType) {
            case '1':
                trObj = addPersonRow(table);
                table.append(trObj);
                break;

            case '2':
                trObj = addPostRow(table);
                table.append(trObj);
                break;

            case '3':
                trObj = addStandardPostRow(table);
                table.append(trObj);
                break;

            case '4':
                trObj = addRelativeRow(table);
                table.append(trObj);
                break;

            case '5':
                trObj = addRoleRow(table);
                table.append(trObj);
                break;

            default:
                break;
        }
        if(trObj){
            selectRow(trObj);
            var selRowObj = getSelectRow(table);
            selRowObj.find(':input[name="type"]').val(participantType);
            selRowObj.find(':input[name="type"]').change();

            selRowObj = getSelectRow(table);

            selRowObj.find(':input[name="participantScope"]').val(participantScope);
            selRowObj.find(':input[name="participantScope"]').change();

            selRowObj.find(':input[name="participantId"]').val(participantId);
            selRowObj.find(':input[name="participantName"]').val(participantName);
            if(paramValue){
                selRowObj.find(':input[name="paramValue"]').val(paramValue);
            }
        }
    }

    //获取对应参与人的全路径，同时赋值给相应的participantName表单对象
    var paramData = prepareParamDataForResData(rowDatas);
    var participantNameDef = queryResDataList(paramData);
    $.when(participantNameDef).done(function (participantNameMap) {
        if(participantNameMap){
            for(var partnerId in participantNameMap){
                var participantIdInputObj = table.find(':input[name="participantId"][value="'+partnerId+'"]');
                participantIdInputObj.siblings(':input[name="participantName"]').val(participantNameMap[partnerId]);
            }
        }
    });
};

//添加标准岗位类型参与者
var addStandardPostRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }

    //当前表格id
    var tableId = table.attr('id');
    var index = table.data('trIndex');//table.find('tr').length + 1;
    index = index?(index+1):1;
    table.data('trIndex',index);
    var trObj = $('<tr id="tr_' + tableId + '_'  +  index + '"></tr>');
    //类型
    var typeTd = $('<td style="width:15%;"></td>');
    var typeInputObj = $('<select class="form-control addInputWidth" id="type_' + tableId + '_'  +  index + '" name="type" >' +
        '<option value="1">人员</option>' +
        '<option value="2">岗位</option>' +
        '<option value="3" selected>标准岗位</option>' +
        '<option value="4">相对参与人</option>' +
        '<option value="5">角色</option>' +
        '</select>'
    );
    typeInputObj.on('change', function () {
        typeChangeSel(table, $(this));
    });

    typeTd.append(typeInputObj);

    //范围
    var scopeTd = $('<td style="width:15%;"></td>');
    var scopeInputObj = $('<select class="form-control" style="width:100%;" id="participantScope_' + tableId + '_'  +  index + '" name="participantScope">' +
        '<option value="311">本集团</option>' +
        '<option value="312" selected>本公司</option>' +
        '<option value="313">本部门</option>' +
        '<option value="314">本项目</option>' +
        '<option value="315">本分期</option>' +
        '<option value="317">表单组织</option>' +
        '</select>'
    );
    scopeInputObj.on('change', function () {
        var scopeVal = $(this).val();
        if (scopeVal == '317') {
            var trObj = $($(this).parents('tr')[0]);
            var trId = trObj.attr('id');
            var participantTd = $(trObj.find(':input[name="participantName"]').parents('td')[0]);
            participantTd.css({width: '35%'});
            participantTd.attr('colspan', '1');

            var paramTd = $('<td style="width:35%;"></td>');
            var paramInputObj = $('<select class="form-control addInputWidth" id="paramValue' + trId.replace(/tr/g, '') + '" name="paramValue"></select>');
            if (variableList) {
                for (var i = 0; i < variableList.length; i++) {
                    var obj = variableList[i];
                    var optObj = $('<option value="' + obj.code + '">' + obj.name + '</option>');
                    paramInputObj.append(optObj);
                }
            }
            paramTd.append(paramInputObj);
            participantTd.after(paramTd);
        } else {
            var trObj = $($(this).parents('tr')[0]);
            var participantTd = $(trObj.find(':input[name="participantName"]').parents('td')[0]);
            participantTd.css({width: '70%'});
            participantTd.attr('colspan', '2');

            participantTd.next('td').remove();

        }
    });
    scopeTd.append(scopeInputObj);

    //参与者
    var participantTd = $('<td style="width:70%;" colspan="2"></td>');
    var participantInputObj = $(
        '<div class="input-group" style="width:100%;">' +
        '    <input type="text" class="form-control" id="participantName_' + tableId + '_'  +  index + '" name="participantName" placeholder="请选择..." readonly="true">' +
        '    <input type="hidden" id="participantId_' + tableId + '_'  +  index + '" name="participantId">' +
        '    <input type="hidden" id="status_' + tableId + '_'  +  index + '" name="status" value="">' +
        '    <span class="input-group-addon w28 "  readonly="readonly" >' +
        '        <i class="fa fa-ellipsis-h"></i>' +
        '    </span>' +
        '</div>'
    );
    participantInputObj.find('.input-group-addon').xljMultipleSelector({
        title: '选择标准岗位',
        selectorType: 'role',
        targetId: 'participantId_' + tableId + '_'  +  index,
        targetName: 'participantName_' + tableId + '_'  +  index,
        treeParam: {type: '1'},
        saveCallback: function (selectedData, ele) {
            selectorCallback(selectedData,ele);
        }

    });
    participantTd.append(participantInputObj);


    trObj.append(typeTd);
    trObj.append(scopeTd);
    trObj.append(participantTd);
    //trObj.append(paramTd);
    //table.append(trObj);

    trObj.on('click',function () {
        selectRow($(this));
    });
    return trObj;
};

//添加人员类型参与者
var addPersonRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }
    //当前表格id
    var tableId = table.attr('id');
    var index = table.data('trIndex');//table.find('tr').length + 1;
    index = index?(index+1):1;
    table.data('trIndex',index);
    var trObj = $('<tr id="tr_'+ tableId + '_' + index + '"></tr>');
    //类型
    var typeTd = $('<td style="width:15%;"></td>');
    var typeInputObj = $('<select class="form-control addInputWidth" id="type_'+ tableId + '_'  + index + '" name="type" >' +
        '<option value="1" selected>人员</option>' +
        '<option value="2">岗位</option>' +
        '<option value="3" >标准岗位</option>' +
        '<option value="4">相对参与人</option>' +
        '<option value="5">角色</option>' +
        '</select>'
    );
    typeInputObj.on('change', function () {
        typeChangeSel(table, $(this));
    });
    typeTd.append(typeInputObj);

    //范围
    var scopeTd = $('<td style="width:15%;"></td>');
    var scopeInputObj = $('<select class="form-control addInputWidth" id="participantScope_' + tableId + '_' + index + '" name="participantScope">' +
        '<option value="11" selected>指定人员</option>' +
        '<option value="12">表单人员</option>' +
        '</select>'
    );
    scopeInputObj.on('change', function () {
        var scopeVal = $(this).val();
        var trObj = $($(this).parents('tr')[0]);
        var trId = trObj.attr('id');
        var participantTd = $(trObj.find(':input[name="participantName"]').parents('td')[0]);
        if (!participantTd[0]) {
            var participantTd = $(trObj.find(':input[name="participantId"]').parents('td')[0]);
        }
        participantTd.empty();
        if (scopeVal == '12') {
            var participantInputObj = $('<select class="form-control addInputWidth" id="participantId' + trId.replace(/tr/g, '') + '" name="participantId" ></select>');
            if (variableList) {
                for (var i = 0; i < variableList.length; i++) {
                    var obj = variableList[i];
                    var optObj = $('<option value="' + obj.code + '">' + obj.name + '</option>');
                    participantInputObj.append(optObj);
                }
            }
            participantTd.append(participantInputObj);

        } else {
            var participantInputObj = $(
                '<div class="input-group" style="width:100%;">' +
                '    <input type="text" class="form-control" id="participantName' + trId.replace(/tr/g, '') + '" name="participantName" placeholder="请选择..." readonly="true">' +
                '    <input type="hidden" id="participantId' + trId.replace(/tr/g, '') + '" name="participantId">' +
                '    <input type="hidden" id="status' + trId.replace(/tr/g, '') + '" name="status" value="">' +
                '    <input type="hidden" id="paramValue' + trId.replace(/tr/g, '') + '" name="paramValue" value="">' +
                '    <span class="input-group-addon w28 "  readonly="readonly" >' +
                '        <i class="fa fa-ellipsis-h"></i>' +
                '    </span>' +
                '</div>'
            );
            participantInputObj.find('.input-group-addon').xljMultipleSelector({
                title: '选择人员',
                selectorType: 'person',
                targetId: 'participantId' + trId.replace(/tr/g, ''),
                targetName: 'participantName' + trId.replace(/tr/g, ''),
                treeParam: {userStatus: true},
                saveCallback: function (selectedData, ele) {
                    selectorCallback(selectedData,ele);
                }

            });
            participantTd.append(participantInputObj);

        }

    });
    scopeTd.append(scopeInputObj);

    //参与者
    var participantTd = $('<td style="width:70%;" colspan="2"></td>');
    var participantInputObj = $(
        '<div class="input-group" style="width:100%;">' +
        '    <input type="text" class="form-control" id="participantName_'+ tableId + '_'  + index + '" name="participantName" placeholder="请选择..." readonly="true">' +
        '    <input type="hidden" id="participantId_'+ tableId + '_'  + index + '" name="participantId">' +
        '    <input type="hidden" id="status_'+ tableId + '_'  + index + '" name="status" value="">' +
        '    <input type="hidden" id="paramValue_'+ tableId + '_'  + index + '" name="paramValue" value="">' +
        '    <span class="input-group-addon w28 "  readonly="readonly" >' +
        '        <i class="fa fa-ellipsis-h"></i>' +
        '    </span>' +
        '</div>'
    );
    participantInputObj.find('.input-group-addon').xljMultipleSelector({
        title: '选择人员',
        selectorType: 'person',
        targetId: 'participantId_'+ tableId + '_'  + index,
        targetName: 'participantName_'+ tableId + '_'  + index,
        treeParam: {userStatus: true},
        saveCallback: function (selectedData, ele) {
            selectorCallback(selectedData,ele);
        }

    });
    participantTd.append(participantInputObj);

    var paramTd = $('<td style="width:35%;"></td>');
    trObj.append(typeTd);
    trObj.append(scopeTd);
    trObj.append(participantTd);
    //trObj.append(paramTd);
    //table.append(trObj);
    trObj.on('click',function () {
        selectRow($(this));
    });
    return trObj;
};

//添加岗位类型参与者
var addPostRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }
    var tableId = table.attr('id');
    var index = table.data('trIndex');//table.find('tr').length + 1;
    index = index?(index+1):1;
    table.data('trIndex',index);
    var trObj = $('<tr id="tr_' + tableId + '_'  + index + '"></tr>');
    //类型
    var typeTd = $('<td style="width:15%;"></td>');
    var typeInputObj = $('<select class="form-control addInputWidth" id="type_'+ tableId + '_'  + index + '" name="type" >' +
        '<option value="1" >人员</option>' +
        '<option value="2" selected>岗位</option>' +
        '<option value="3" >标准岗位</option>' +
        '<option value="4">相对参与人</option>' +
        '<option value="5">角色</option>' +
        '</select>'
    );
    typeInputObj.on('change', function () {
        typeChangeSel(table, $(this));
    });
    typeTd.append(typeInputObj);

    //范围
    var scopeTd = $('<td style="width:15%;"></td>');
    var scopeInputObj = $('<select class="form-control addInputWidth" id="participantScope_'+ tableId + '_'  + index + '"name="participantScope" >' +
        '<option value="21" selected>指定岗位</option>' +
        '<option value="22">表单岗位</option>' +
        '</select>'
    );
    scopeInputObj.on('change', function () {

        var scopeVal = $(this).val();
        var trObj = $($(this).parents('tr')[0]);
        var trId = trObj.attr('id');
        var participantTd = $(trObj.find(':input[name="participantName"]').parents('td')[0]);
        if (!participantTd[0]) {
            var participantTd = $(trObj.find(':input[name="participantId"]').parents('td')[0]);
        }
        participantTd.empty();
        if (scopeVal == '22') {
            var participantInputObj = $('<select class="form-control addInputWidth" id="participantId' + trId.replace(/tr/g, '') + '" name="participantId" ></select>');
            if (variableList) {
                for (var i = 0; i < variableList.length; i++) {
                    var obj = variableList[i];
                    var optObj = $('<option value="' + obj.code + '">' + obj.name + '</option>');
                    participantInputObj.append(optObj);
                }
            }
            participantTd.append(participantInputObj);

        } else {
            var participantInputObj = $(
                '<div class="input-group" style="width:100%;">' +
                '    <input type="text" class="form-control" id="participantName'+ trId.replace(/tr/g, '') + '" name="participantName" placeholder="请选择..." readonly="true">' +
                '    <input type="hidden" id="participantId'+ trId.replace(/tr/g, '') + '" name="participantId">' +
                '    <input type="hidden" id="status' + trId.replace(/tr/g, '') + '" name="status" value="">' +
                '    <span class="input-group-addon w28 "  readonly="readonly" >' +
                '        <i class="fa fa-ellipsis-h"></i>' +
                '    </span>' +
                '</div>'
            );
            participantInputObj.find('.input-group-addon').xljMultipleSelector({
                title: '选择岗位',
                selectorType: 'post',
                targetId: 'participantId' + trId.replace(/tr/g, ''),
                targetName: 'participantName' + trId.replace(/tr/g, ''),
                treeParam: {},
                saveCallback: function (selectedData, ele) {
                    selectorCallback(selectedData,ele);
                }

            });
            participantTd.append(participantInputObj);

        }


    });
    scopeTd.append(scopeInputObj);

    //参与者
    var participantTd = $('<td style="width:70%;" colspan="2"></td>');
    var participantInputObj = $(
        '<div class="input-group" style="width:100%;">' +
        '    <input type="text" class="form-control" id="participantName_' + tableId + '_' + index + '" name="participantName" placeholder="请选择..." readonly="true">' +
        '    <input type="hidden" id="participantId_' + tableId + '_' + index + '" name="participantId">' +
        '    <input type="hidden" id="status_' + tableId + '_' + index + '" name="status" value="">' +
        '    <span class="input-group-addon w28 "  readonly="readonly" >' +
        '        <i class="fa fa-ellipsis-h"></i>' +
        '    </span>' +
        '</div>'
    );
    participantInputObj.find('.input-group-addon').xljMultipleSelector({
        title: '选择岗位',
        selectorType: 'post',
        targetId: 'participantId_' + tableId + '_' + index,
        targetName: 'participantName_' + tableId + '_' + index,
        treeParam: {},
        saveCallback: function (selectedData, ele) {
            selectorCallback(selectedData,ele);
        }

    });
    participantTd.append(participantInputObj);

    var paramTd = $('<td style="width:35%;"></td>');
    trObj.append(typeTd);
    trObj.append(scopeTd);
    trObj.append(participantTd);
    //trObj.append(paramTd);
    //table.append(trObj);
    trObj.on('click',function () {
        selectRow($(this));
    });
    return trObj;
};

//添加相对参与人类型参与者
var addRelativeRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }
    var tableId = table.attr('id');
    var index = table.data('trIndex');//table.find('tr').length + 1;
    index = index?(index+1):1;
    table.data('trIndex',index);
    var trObj = $('<tr id="tr_' + tableId + '_' + index + '"></tr>');
    //类型
    var typeTd = $('<td style="width:15%;"></td>');
    var typeInputObj = $('<select class="form-control addInputWidth" id="type_' + tableId + '_' + index + '" name="type" >' +
        '<option value="1" >人员</option>' +
        '<option value="2" >岗位</option>' +
        '<option value="3" >标准岗位</option>' +
        '<option value="4" selected>相对参与人</option>' +
        '<option value="5">角色</option>' +
        '</select>'
    );
    typeInputObj.on('change', function () {
        typeChangeSel(table, $(this));
    });
    typeTd.append(typeInputObj);

    //范围
    var scopeTd = $('<td style="width:85%;" colspan="3"></td>');
    var scopeInputObj = $('<select class="form-control addInputWidth" id="participantScope_' + tableId + '_' + index + '" name="participantScope">' +
        '<option value="40">发起人</option>' +
        '<option value="41" selected>发起人直接领导</option>' +
        '<option value="42">发起人顶级部门领导</option>' +
        '<option value="43">上一环节审批人直接领导</option>' +
        '<option value="44">上一环节审批人顶级部门领导</option>' +
        '</select>'
    );
    scopeTd.append(scopeInputObj);

    //参与者
    var participantTd = $('<td style="width:70%;" colspan="2"></td>');

    var paramTd = $('<td style="width:35%;"></td>');
    trObj.append(typeTd);
    trObj.append(scopeTd);
    //trObj.append(participantTd);
    //trObj.append(paramTd);
    //table.append(trObj);
    trObj.on('click',function () {
        selectRow($(this));
    });
    return trObj;
};

//添加角色类型参与者
var addRoleRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }
    var tableId = table.attr('id');
    var index = table.data('trIndex');//table.find('tr').length + 1;
    index = index?(index+1):1;
    table.data('trIndex',index);
    var trObj = $('<tr id="tr_' + tableId + '_' + index + '"></tr>');
    //类型
    var typeTd = $('<td style="width:15%;"></td>');
    var typeInputObj = $('<select class="form-control addInputWidth" id="type_' + tableId + '_' + index + '" name="type" >' +
        '<option value="1" >人员</option>' +
        '<option value="2" >岗位</option>' +
        '<option value="3" >标准岗位</option>' +
        '<option value="4">相对参与人</option>' +
        '<option value="5" selected>角色</option>' +
        '</select>'
    );
    typeInputObj.on('change', function () {
        typeChangeSel(table, $(this));
    });
    typeTd.append(typeInputObj);

    //范围
    var scopeTd = $('<td style="width:15%;"></td>');
    /*var scopeInputObj = $('<select class="form-control addInputWidth" id="participantScope_'+index+'"name="participantScope" >' +
     '<option value="21" selected>指定岗位</option>' +
     '<option value="22">表单岗位</option>' +
     '</select>'
     );
     scopeTd.append(scopeInputObj);*/

    //参与者
    var participantTd = $('<td style="width:85%;" colspan="3"></td>');
    var participantInputObj = $(
        '<div class="input-group" style="width:100%;">' +
        '    <input type="text" class="form-control" id="participantName_' + tableId + '_' + index + '" name="participantName" placeholder="请选择..." readonly="true">' +
        '    <input type="hidden" id="participantId_' + tableId + '_' + index + '" name="participantId">' +
        '    <input type="hidden" id="status_' + tableId + '_' + index + '" name="status" value="">' +
        '    <input type="hidden" id="participantScope_' + tableId + '_' + index + '" name="participantScope" value="51">' +
        '    <span class="input-group-addon w28 "  readonly="readonly" >' +
        '        <i class="fa fa-ellipsis-h"></i>' +
        '    </span>' +
        '</div>'
    );
    participantInputObj.find('.input-group-addon').xljMultipleSelector({
        title: '选择角色',
        selectorType: 'role',
        targetId: 'participantId_' + tableId + '_' + index,
        targetName: 'participantName_' + tableId + '_' + index,
        treeParam: {type: false,roleCataStatus:true},
        saveCallback: function (selectedData, ele) {
            selectorCallback(selectedData,ele);
        }

    });
    participantTd.append(participantInputObj);

    var paramTd = $('<td style="width:35%;"></td>');
    trObj.append(typeTd);
    //trObj.append(scopeTd);
    trObj.append(participantTd);
    //trObj.append(paramTd);
    //table.append(trObj);
    trObj.on('click',function () {
        selectRow($(this));
    });
    return trObj;
};

//类型更改事件
var typeChangeSel = function (table, typeSelObj) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }
    var oldTrObj = typeSelObj.parent('td').parent('tr');
    var selTypeVal = typeSelObj.val();
    var trObj;
    switch (selTypeVal) {
        case '1':
            trObj = addPersonRow(table);
            oldTrObj.after(trObj);
            break;
        case '2':
            trObj = addPostRow(table);
            oldTrObj.after(trObj);
            break;
        case '3':
            trObj = addStandardPostRow(table);
            oldTrObj.after(trObj);
            break;
        case '4':
            trObj = addRelativeRow(table);
            oldTrObj.after(trObj);
            break;
        case '5':
            trObj = addRoleRow(table);
            oldTrObj.after(trObj);
            break;
        default:
            break;
    }
    if(trObj){
        selectRow(trObj);
    }
    oldTrObj.remove();
};

//选择行
var selectRow = function (trObj) {
    trObj.parents('table').find('tr.ui-state-highlight').removeClass('ui-state-highlight');
    $(trObj).addClass('ui-state-highlight');
};

//删除选中行
var deleteRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }
    var trObj = getSelectRow(table);
    var prevTrObj = trObj.prev('tr');
    var nextTrObj = trObj.next('tr');
    trObj.remove();
    if(prevTrObj[0]){
        selectRow(prevTrObj);
    }else if(nextTrObj[0]){
        selectRow(nextTrObj);
    }
};

//获取选中行
var getSelectRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }
    var trObj = table.find('tr.ui-state-highlight');
    return trObj;
};

//上移
var moveUpRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }

    var selRowObj = getSelectRow(table);
    if(!selRowObj[0]){
        return;
    }
    var prevTrObj = selRowObj.prev('tr');
    var nextTrObj = selRowObj.next('tr');

    if(prevTrObj[0]){
        //selRowObj.remove();
        prevTrObj.before(selRowObj);
    }

};

//下移
var moveDownRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }

    var selRowObj = getSelectRow(table);
    if(!selRowObj[0]){
        return;
    }
    var nextTrObj = selRowObj.next('tr');

    if(nextTrObj[0]){
        //selRowObj.remove();
        nextTrObj.after(selRowObj);
    }

};

//置顶
var toTopRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }
    var selRowObj = getSelectRow(table);
    if(!selRowObj[0]){
        return;
    }

    var firstRowObj = $(table.find('tr')[0]);
    if(firstRowObj[0]){
        //selRowObj.remove();
        firstRowObj.before(selRowObj);
    }
};

//置底
var toBottomRow = function (table) {
    if(typeof table === 'string' ){
        table = $('#'+table);
    }
    var selRowObj = getSelectRow(table);
    if(!selRowObj[0]){
        return;
    }
    var trs = table.find('tr');
    var lastRowObj = $(trs[trs.length-1]);
    if(lastRowObj[0]){
        //selRowObj.remove();
        lastRowObj.after(selRowObj);
    }
};

//选择器回调函数
var selectorCallback = function (selectedData,ele) {
    var tableObj = $($(ele).parents('table')[0]);
    var oldTrObj = $(ele).parents('tr');
    var type = oldTrObj.find(':input[name="type"]').val();
    var participantScope = oldTrObj.find(':input[name="participantScope"]').val();
    var paramValue = oldTrObj.find(':input[name="paramValue"]').val();
    if(selectedData&&$.isArray(selectedData)){
        if(selectedData.length==0){
            if(type=='1'&&participantScope=='11'){
                oldTrObj.find(':input[name="paramValue"]').val('');
            }
        }

        for (var i = 0; i < selectedData.length; i++) {
            var obj = selectedData[i];
            var id;
            var name;
            var newRowObj;
            if(type=='1'){//人员
                //id = obj.id;
                id = obj.userId;
                name = obj.prefixName+'/'+obj.postName+'/'+obj.name;
                if(participantScope=='11'){
                    paramValue = obj.postId;
                }
                newRowObj = addPersonRow(tableObj);

            }else if(type=='2'){//岗位
                id=obj.id;
                name=obj.prefixName + '/' + obj.name;
                newRowObj = addPostRow(tableObj);
            }else if(type=='3'){//标准岗位
                id = obj.id;
                name = obj.prefixName+'/'+obj.name;
                newRowObj = addStandardPostRow(tableObj);
            }else if(type=='4'){//相对参与人
            }else if(type=='5'){//角色
                id=obj.id;
                name=obj.prefixName + '/' + obj.name;
                newRowObj = addRoleRow(tableObj);
            }
            if(i==0){
                oldTrObj.find(':input[name="participantId"]').val(id);
                oldTrObj.find(':input[name="participantName"]').val(name);
                if(paramValue){
                    oldTrObj.find(':input[name="paramValue"]').val(paramValue);
                }
            }else{
                //var standardRoleRowObj = addStandardPostRow(tableObj);
                getSelectRow(tableObj).after(newRowObj);
                selectRow(newRowObj);

                var selRowObj = getSelectRow(tableObj);

                selRowObj.find(':input[name="type"]').val(type);
                selRowObj.find(':input[name="type"]').change();

                selRowObj = getSelectRow(tableObj);

                selRowObj.find(':input[name="participantScope"]').val(participantScope);
                selRowObj.find(':input[name="participantScope"]').change();

                selRowObj.find(':input[name="participantId"]').val(id);
                selRowObj.find(':input[name="participantName"]').val(name);
                if(paramValue){
                    selRowObj.find(':input[name="paramValue"]').val(paramValue);
                }
            }
        }
    }

};

//获取流程模板相关参与者数据
var getFlPartnerData = function (table,partnerType,flId,acId) {
    if(typeof table == 'string'){
        table = $('#'+table);
    }

    var flRelationDataArr = [];
    var trArr = table.find('tr');
    for (var i = 0; i < trArr.length; i++) {
        var trObj = $(trArr[i]);
        var flRelationData = {};
        flRelationData.type = partnerType;
        var inputDataArr = trObj.find(':input').serializeArray();
        for (var j = 0; j < inputDataArr.length; j++) {
            var inputData = inputDataArr[j];
            var inputDataName = inputData.name;
            var inputDataValue = inputData.value;
            if(inputDataName=='type'){
                flRelationData['participantType'] = inputDataValue;
            }else{
                flRelationData[inputDataName] = inputDataValue;
            }

        }
        flRelationData.sort = (i+1);
        if(flId){
            flRelationData.flId = flId;
        }
        if(acId){
            flRelationData.acId = acId;
        }
        flRelationDataArr.push(flRelationData)
    }

    return flRelationDataArr;
};
