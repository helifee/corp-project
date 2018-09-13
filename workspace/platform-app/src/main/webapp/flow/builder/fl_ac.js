/**
 * create by dgh on 2017/11/30
 */
$(function () {
    var nodeTypeObj = {
        'start':1,
        'task':2,
        'end':3,
        'join':4,
        'fork':5,
        'connector':6,
        'cc':7
    };

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
                    if(item.code=='SH'){
                        $("#approveTypeId").append("<option value='"+item.code+"' selected>"+item.name+"</option>");
                    }else{
                        $("#approveTypeId").append("<option value='"+item.code+"'>"+item.name+"</option>");
                    }
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
    initVariableList();

    //环节审批人设置方式更改事件
    $('#_flAcForm :input[name="isAddLabel"]').on('change',function () {
        var isAddLabel = $(this).val();
        if("0" == isAddLabel){
            $("#haveApprover").hide();
            $("#approvePartnerDiv").show();
        }else{
            $("#haveApprover").show();
            $("#approvePartnerDiv").hide();
            $('#_approvePartnerTb').empty();
        }
    });

    //审批类型更改事件
    $('#approveTypeId').on('change',function () {
        var selectedType = $(this).val();
        if(selectedType == "JG"){//如果是校稿环节,则判断是否含有发起人,如果没有发起人,则在第一行添加一个发起人
            var typeObj = $('#_approvePartnerTb').find('select[name="type"] option[value="4"]:selected');
            var scopeObj = $('#_approvePartnerTb').find('select[name="participantScope"] option[value="40"]:selected');

            if(!typeObj[0]||(typeObj[0]&&!scopeObj[0])){//如果没有发起人,则在第一行添加一个发起人
                var trObj = addRelativeRow('_approvePartnerTb');
                trObj.find('select[name="participantScope"]').val('40');
                $('#_approvePartnerTb').append(trObj);
                selectRow(trObj);
            }
        }else if(selectedType == 'HQ'){
            $('#_flAcForm :input[name="approveStrategy"][value="3"]')[0].checked = true;
        }
    });

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
        extra.code = selCell.nodeType+'_'+nodeId;
        extra.acType = nodeTypeObj[nodeType];
        extra.nodeId = nodeId;
        if("start"==nodeType||"end"==nodeType){
            $('#name').val(extra.name);
            $('#code').val(extra.code);
            $("#name").attr("readonly","readonly");
            $("#code").attr("readonly","readonly");
            $("#approvePartnerDiv").empty();
            $("#aprroverSettingType").empty();
            $("#approveTypeId").append("<option value='"+nodeType+"' selected>"+label+"</option>");
            $("#approveTypeId").attr("readonly","readonly");
            $("#postOrPersonIsNullTr").hide();
            $("#hiddenPartTwo").hide();
            $("#hiddenPartOne").hide();
            $("#hiddenPartThree").hide();
            $("#hiddenPersonRepeat").hide();
            $("#overdueTR").hide();
        }else{
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
                if(item=='isStart' || item=='isAddLabel'){
                    if(value){
                        $('#_flAcForm :input[name="'+item+'"][value="1"]')[0].checked = true;
                    }else{
                        $('#_flAcForm :input[name="'+item+'"][value="0"]')[0].checked = true;
                    }
                }else{
                    var inputObj = $('#_flAcForm :input[name="'+item+'"]');
                    if($(inputObj[0]).attr('type')=='radio'){
                        if($('#_flAcForm :input[name="'+item+'"][value="'+value+'"]')[0]){
                            $('#_flAcForm :input[name="'+item+'"][value="'+value+'"]')[0].checked = true;
                        }
                    }else{
                        $('#_flAcForm :input[name="'+item+'"]').val(value);
                    }
                }
            }
            if($(':input[name="approveStrategy"][value="'+extra.approveStrategy+'"]')[0]){
                $(':input[name="approveStrategy"][value="'+extra.approveStrategy+'"]')[0].checked = true;
            }

            $(':input[name="isAddLabel"]:checked').change();

        }
    };
    initFormData();

    //初始化审批人、抄送人列表
    var initPartnerList = function () {
        var selCell= window.parent.getSelectCell();
        //审批人
        var approvePartnerArr = selCell.participant&&selCell.participant!=''?JSON.parse(selCell.participant):[];
        //抄送人
        var copyForPartnerArr = selCell.ccPerson&&selCell.ccPerson!=''?JSON.parse(selCell.ccPerson):[];

        batchAddRows('_approvePartnerTb',approvePartnerArr);
        batchAddRows('_copyForPartnerTb',copyForPartnerArr);

        if($('#approveTypeId').val()=='JG'){
            var type = $('#_approvePartnerTb').find(':input[name="type"]').val();
            var participantScope = $('#_approvePartnerTb').find(':input[name="participantScope"]').val();
            if(!(type=='4'&&participantScope=='40')){
                $('#approveTypeId').change();
            }
        }
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
        if(!acBaseInfo.isAddLabel&&acBaseInfo.acType=='2'){
            approvePartnerArr = getFlPartnerData('_approvePartnerTb','1',null,acBaseInfo.id);
            if(approvePartnerArr.length==0) {
                $.xljUtils.tip('blue','流程模板审批人不能为空！');
                return;
            }
            for (var i = 0; i < approvePartnerArr.length; i++) {
                var obj = approvePartnerArr[i];
                var participantName = obj.participantName;
                if(obj.participantType!='4'&&(!participantName||participantName=='')){
                    $.xljUtils.tip('blue','流程模板审批人中含有空值！');
                    return;
                }
            }
        }

        //获取抄送人
        var copyForPartnerArr = getFlPartnerData('_copyForPartnerTb','2',null,acBaseInfo.id);

        delete acBaseInfo.id;

        var cell = window.parent.getSelectCell();
        cell.extra = JSON.stringify(acBaseInfo);
        cell.participant = JSON.stringify(approvePartnerArr?approvePartnerArr:[]);
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