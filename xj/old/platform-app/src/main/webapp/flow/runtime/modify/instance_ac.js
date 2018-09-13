/**
 * Created by dgh on 2018/1/3.
 */
$(function () {

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
                    id = obj.userId != '' ? (obj.postId+'/'+id) : id;
                    if (obj.postName && obj.postName != '') {
                        name = obj.prefixName + '/' + obj.postName + '/' + obj.name;
                    } else {
                        name = obj.prefixName + '/' + obj.name;
                    }
                    newRowObj = addPersonRow(tableObj);
                }

                if (i == 0) {
                    oldTrObj.find(':input[name="participantId"]').val(id);
                    oldTrObj.find(':input[name="participantName"]').val(name);
                    oldTrObj.find(':input[name="postId"]').val(obj.postId);
                    oldTrObj.find(':input[name="postName"]').val(obj.prefixName + '/' + obj.postName);
                } else {
                    getSelectRow(tableObj).after(newRowObj);
                    selectRow(newRowObj);

                    var selRowObj = getSelectRow(tableObj);
                    selRowObj.find(':input[name="type"]').val(type);
                    selRowObj = getSelectRow(tableObj);
                    selRowObj.find(':input[name="participantId"]').val(id);
                    selRowObj.find(':input[name="participantName"]').val(name);
                    selRowObj.find(':input[name="postId"]').val(obj.postId);
                    selRowObj.find(':input[name="postName"]').val(obj.prefixName + '/' + obj.postName);
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
        var index = table.data('trIndex');//table.find('tr').length + 1;
        index = index?index+1:1;
        table.data('trIndex',index);
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
            '    <input type="hidden" id="postName_' + tableId + '_' + index + '" name="postName">' +
            '    <input type="hidden" id="postId_' + tableId + '_' + index + '" name="postId">' +
            '    <input type="hidden" id="approverId_' + tableId + '_' + index + '" name="approverId">' +
            '    <span class="input-group-addon w28 "  readonly="readonly" >' +
            '        <i class="fa fa-ellipsis-h"></i>' +
            '    </span>' +
            '</div>'
        );
        participantInputObj.find('.input-group-addon').xljMultipleSelector({
            title: '选择人员',
            selectorType: 'person',
            multiplePost:true,
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
            var postId = !obj.postId?'':obj.postId;
            var postName = !obj.postName?'':obj.postName;
            var approverId = !obj.id?'':obj.id;

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
                selRowObj.find(':input[name="postId"]').val(postId);
                selRowObj.find(':input[name="postName"]').val(postName);
                selRowObj.find(':input[name="approverId"]').val(approverId);

            }
        }
    };

    //添加行
    var addRow = function (table) {
        if(typeof table === 'string' ){
            table = $('#'+table);
        }
        var trObj = addPersonRow(table);
        table.append(trObj);
        selectRow(trObj);
    };

    //获取审批人，抄送人列表
    var getPartnerDatas = function (table,acId) {
        if(typeof table == 'string'){
            table = $('#'+table);
        }
        var trArr = table.find('tr');
        var partnerList = [];
        for (var i = 0; i < trArr.length; i++) {
            var trObj = $(trArr[i]);
            var inputDataArr = trObj.find(':input').serializeArray();
            var partnerObj = {
                acId:acId
            };
            $.each(inputDataArr,function (i,inputData) {
                var inputDataName = inputData.name;
                var inputDataValue = inputData.value;
                partnerObj[inputDataName] = inputDataValue;
            });
            delete partnerObj['type'];
            partnerList.push(partnerObj);
        }

        return partnerList;
    };


    var nodeTypeObj = {
        'start':1,
        'task':2,
        'end':3,
        'join':4,
        'fork':5,
        'connector':6,
        'cc':7
    };

    //数据库查询出来的原始审批人map
    //var originApprovePartnerMap = {};

    //查询和设置审批类型
    var queryAndSetApproveType = function (){
        var paramData = {delflag:false, status:true }; //{ delflag:false };
        $.ajax({ //发送更新的ajax请求
            type: "post",
            url: hostUrl+"flow/approveType/queryList",
            dataType:"json",
            async: false,
            data: JSON.stringify(paramData),
            contentType: 'application/json;charset=utf-8', //设置请求头信息
            success: function(data){
                $("#approveTypeId").empty();//首先清空select现在有的内容
                var resultList = data.result;
                $.each(resultList,function(index,item){//遍历mapList的数组数据
                    /*if(item.code=='SH'){
                        $("#approveTypeId").append("<option value='"+item.code+"' selected>"+item.name+"</option>");
                    }else{*/
                        $("#approveTypeId").append("<option value='"+item.code+"'>"+item.name+"</option>");
                    //}
                });
            }
        });
    };

    //初始化模板表单变量列表
    var initVariableList = function () {
        if(window.parent&&$.isFunction(window.parent.getVariableListDef)){
            var variableListDef = window.parent.getVariableListDef();
            $.when(variableListDef).done(function (variableList) {
                window.variableList = variableList;
            });
        }
    };
    //initVariableList();

    //初始化表单数据
    var initFormData = function () {
        var selCell = window.parent.getSelectCell();
        var nodeType = selCell.nodeType;
        var label = selCell.value;
        var mxObjectId = selCell.mxObjectId;
        var nodeId = mxObjectId.replace('mxCell#','');
        var extra = selCell.extra;
        if(extra){
            extra = JSON.parse(extra);
        }else{
            extra = {};
        }
        extra.id=selCell.id;
        extra.name = selCell.value;
        extra.code = extra.code?extra.code:selCell.nodeType+'_'+nodeId;
        extra.acType = nodeTypeObj[nodeType];
        extra.nodeId = nodeId;

        $("#name").removeAttr("readonly");
        //$("#code").removeAttr("readonly");
        queryAndSetApproveType();
        $("#hiddenPartTwo").show();
        $("#hiddenPartOne").show();
        $("#hiddenPartThree").show();
        $("#hiddenPersonRepeat").show();
        $("#overdueTR").show();
        for(var item in extra){
            var value = extra[item];
            var inputObj = $('#_flAcForm :input[name="'+item+'"]');
            if($(inputObj[0]).attr('type')=='radio'){
                if($('#_flAcForm :input[name="'+item+'"][value="'+value+'"]')[0]){
                    $('#_flAcForm :input[name="'+item+'"][value="'+value+'"]')[0].checked = true;
                }
            }else{
                $('#_flAcForm :input[name="'+item+'"]').val(value);
            }
        }
        if($(':input[name="approveStrategy"][value="'+extra.approveStrategy+'"]')[0]){
            $(':input[name="approveStrategy"][value="'+extra.approveStrategy+'"]')[0].checked = true;
        }

    };
    initFormData();

    //初始化审批人、抄送人列表
    var initPartnerList = function () {
        var selCell= window.parent.getSelectCell();
        //审批人
        var approvePartnerArr = selCell.participant&&selCell.participant!=''?JSON.parse(selCell.participant):[];
        for (var i = 0; i < approvePartnerArr.length; i++) {
            var approvePartner = approvePartnerArr[i];
            if(!(approvePartner.taskStatus=='1'||approvePartner.taskStatus=='2')){
                approvePartnerArr.splice(i,1);
            }
            //originApprovePartnerMap[approvePartner.id?approvePartner.id:('null'+i)] = approvePartner;
        }

        //抄送人
        var copyForPartnerArr = selCell.ccPerson&&selCell.ccPerson!=''?JSON.parse(selCell.ccPerson):[];

        batchAddRows('_approvePartnerTb',approvePartnerArr);
        batchAddRows('_copyForPartnerTb',copyForPartnerArr);
    };
    initPartnerList();

    //保存节点信息
    window.saveAcFormData = function(){
        var formDataArray = $("#_flAcForm").serializeArray();
        var acBaseInfo = {};
        for(var i in formDataArray){
            var name = formDataArray[i].name;
            //需要过滤掉参与人的所有字段
            if (name == 'isStart' || name == 'isAddLabel') {
                acBaseInfo[name] = formDataArray[i].value == "1" ? true : false;
            }else{
                acBaseInfo[name]=formDataArray[i].value;
            }
        }
        acBaseInfo.delflag = false;

        //获取审批人
        var approvePartnerArr;
        //筛选后新的审批人数组
        var newApprovePartnerArr = [];
        if(acBaseInfo.acType=='2'){
            approvePartnerArr = getPartnerDatas('_approvePartnerTb',acBaseInfo.id);
            if(approvePartnerArr.length==0) {
                $.xljUtils.tip('blue','流程模板审批人不能为空！');
                return;
            }

            var newApproverMap = {};
            for (var i = 0; i < approvePartnerArr.length; i++) {
                var obj = approvePartnerArr[i];
                var participantName = obj.participantName;
                if(obj.participantType!='4'&&(!participantName||participantName=='')){
                    $.xljUtils.tip('blue','流程模板审批人中含有空值！');
                    return;
                }
                var approverId = obj.approverId;
                if(!approverId||approverId==''){
                    approverId = window.parent.getUUID();
                }
                obj.id = approverId;
                delete obj['approverId'];
                newApproverMap[approverId] = obj;
            }

            //原始数据
            var selCell= window.parent.getSelectCell();
            var originApprovePartnerArr = selCell.participant&&selCell.participant!=''?JSON.parse(selCell.participant):[];
            for (var i = 0; i < originApprovePartnerArr.length; i++) {
                var originApprover = originApprovePartnerArr[i];
                if(originApprover.taskStatus=='1'||originApprover.taskStatus=='2'){
                    var newApprover = newApproverMap[originApprover.id];
                    if(!newApprover){
                        originApprovePartnerArr.splice(i,1);
                    }else{
                        $.extend(originApprover,newApprover);
                        newApprovePartnerArr.push(originApprover);
                        delete newApproverMap[newApprover.id];
                    }

                }else{
                    newApprovePartnerArr.push(originApprover);
                }
            }

            for(var item in newApproverMap){
                var newApprover = newApproverMap[item];
                newApprover.taskStatus = selCell.acStatus+'';
                newApprovePartnerArr.push(newApprover);
            }

        }

        //获取抄送人
        var copyForPartnerArr = getPartnerDatas('_copyForPartnerTb',acBaseInfo.id);

        delete acBaseInfo.id;

        var cell = window.parent.getSelectCell();
        cell.extra = JSON.stringify(acBaseInfo);
        cell.participant = JSON.stringify(newApprovePartnerArr?newApprovePartnerArr:[]);
        cell.ccPerson = JSON.stringify(copyForPartnerArr?copyForPartnerArr:[]);
        cell.value = acBaseInfo.name;
        window.parent.updateCellAttr(cell.id,'value',acBaseInfo.name);
        window.parent.closeFrameWnd();
    };

    //初始化页面操作按钮事件
    var initBtnAction = function () {
        //审批人设置列表头部按钮事件
        var btns = $('#approvePartnerDiv .btns-group').find('button');
        $.each(btns,function (i,btnObj) {
            var btnId = $(btnObj).attr('id');
            $('#'+btnId).on('click',function () {
                switch (btnId){
                    case 'toBottomBtn':
                        toBottomRow('_approvePartnerTb');
                        break;
                    case 'toTopBtn':
                        toTopRow('_approvePartnerTb');
                        break;
                    case 'upRowBtn':
                        moveUpRow('_approvePartnerTb');
                        break;
                    case 'downRowBtn':
                        moveDownRow('_approvePartnerTb');
                        break;
                    case 'deleteApprovePartnerBtn':
                        deleteRow('_approvePartnerTb');
                        break;
                    case 'addApprovePartnerBtn':
                        addRow('_approvePartnerTb');
                        break;
                }
            });

        });

        //抄送人设置列表头部按钮事件
        btns = $('#copyForPartnerDiv .btns-group').find('button');
        $.each(btns,function (i,btnObj) {
            var btnId = $(btnObj).attr('id');
            $('#'+btnId).on('click',function () {
                switch (btnId){
                    case 'deleteCopyForPartnerBtn':
                        deleteRow('_copyForPartnerTb');
                        break;
                    case 'addCopyForPartnerBtn':
                        addRow('_copyForPartnerTb');
                        break;
                }
            });
        });

        //保存
        $('#saveBtn').on('click',function () {
            $("#_flAcForm").attr('data-validate-success','saveAcFormData()');
            $("#_flAcForm").submit();
        });
    };
    initBtnAction();

});