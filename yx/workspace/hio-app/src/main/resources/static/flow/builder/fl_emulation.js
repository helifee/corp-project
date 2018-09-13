/**
 * Created by dgh on 2017/12/6.
 */
$(function () {

    //初始化模板表单变量列表
    var initVariableForm = function () {
        if (window.parent && $.isFunction(window.parent.getVariableListDef)) {
            var variableListDef = window.parent.getVariableListDef();
            $.when(variableListDef).done(function (variableList) {
                if (variableList) {
                    var flowFixVariable = ['flow_business_company_id', 'flow_business_company_name', 'flow_business_dept_id', 'flow_business_dept_name',
                        'start_user_id', 'start_user_name', 'business_object_name', 'flow_business_project_name', 'flow_business_project_branch_name'];
                    var flowFixRequiredVariable = ['flow_business_company_name', 'flow_business_dept_name', 'start_user_name', 'business_object_name'];
                    var businessRequiredFields = window.parent.getConditionFields();
                    flowFixRequiredVariable = flowFixRequiredVariable.concat(businessRequiredFields);
                    var _emulationBusinessFormTable = $('#_emulationVariableTb');
                    var tbodyObj = $('<tbody></tbody>');
                    var groupVariableArr = [];
                    var groupArr = [];
                    for(var i in variableList){
                        if(i!=0&&i%2==0){
                            groupVariableArr.push(groupArr);
                            groupArr = [];
                        }
                        groupArr.push(variableList[i]);
                    }
                    //为避免最后一次分组未放入分组数组中
                    if(groupVariableArr.length*2<variableList.length){
                        groupVariableArr.push(groupArr);
                    }

                    for(var i in groupVariableArr){
                        var groupInstanceArr = groupVariableArr[i];
                        var trObj = $('<tr class="form-tr"></tr>');
                        for (var i = 0; i < groupInstanceArr.length; i++) {
                            var obj = groupInstanceArr[i];
                            var name = obj.name;
                            if (name.lastIndexOf('ID') != -1 || name.lastIndexOf('_id') != -1) {
                                continue;
                            }
                            var code = obj.code;

                            var labelTdObj = $('<td class="form-label"></td>');
                            var nameLabelObj = '';
                            var isRequired = false;
                            if ($.inArray(code, flowFixRequiredVariable) == -1) {
                                nameLabelObj = $('<label>' + name + '</label>');
                            } else {
                                isRequired = true;
                                nameLabelObj = $('<label><span>*</span>' + name + '</label>');
                            }
                            labelTdObj.append(nameLabelObj);

                            var type = obj.type;
                            var validateRule;
                            switch (type) {
                                case '2':
                                    validateRule = 'data-digits="true"';
                                    break;
                                case '3':
                                    validateRule = 'data-number="true"';
                                    break;

                                case '5':
                                    validateRule = 'data-date="true"';
                                    break;
                            }

                            var codeTdObj = $('<td>' +
                                '<div class="input-group form-date">' +
                                '<input type="text" id="' + code + '" class="form-control" data-fieldtype="' + obj.type + '" data-required="' + isRequired + '" data-placeholder="' + name + '" ' + (validateRule ? validateRule : '') + ' name="' + code + '">' +
                                '</div>' +
                                '</td>');
                            if (code == 'business_object_name') {
                                codeTdObj.find('input').val($('#businessObjectName').val());
                                codeTdObj.find('input').attr('readonly', 'readonly');
                            }
                            var addonSpan = $('<span class="input-group-addon w28" ><a href="javascript:void(0);" class="fa fa-ellipsis-h" aria-hidden="true"></a></span>');
                            var removeSpan = $('<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>');
                            var orgType = '';
                            var tipMsg = '';
                            var targetId = '';
                            if (code == 'flow_business_company_name') {
                                orgType = 'company';
                                var hideInput = $('<input type="hidden" id="flow_business_company_id" name="flow_business_company_id">');
                                targetId = 'flow_business_company_id';
                                codeTdObj.find('input').attr('readonly', 'readonly');
                                codeTdObj.find('div').append(removeSpan);
                                codeTdObj.find('div').append(addonSpan);
                                codeTdObj.find('div').append(hideInput);
                            }
                            if (code == 'flow_business_dept_name') {
                                orgType = 'dept';
                                var hideInput = $('<input type="hidden" id="flow_business_dept_id" name="flow_business_dept_id">');
                                targetId = 'flow_business_dept_id';
                                codeTdObj.find('input').attr('readonly', 'readonly');
                                codeTdObj.find('div').append(removeSpan);
                                codeTdObj.find('div').append(addonSpan);
                                codeTdObj.find('div').append(hideInput);
                            }
                            if (code == 'flow_business_project_name') {
                                orgType = 'group';
                                var hideInput = $('<input type="hidden" id="flow_business_project_id" name="flow_business_project_id">');
                                targetId = 'flow_business_project_id';
                                codeTdObj.find('input').attr('readonly', 'readonly');
                                codeTdObj.find('div').append(removeSpan);
                                codeTdObj.find('div').append(addonSpan);
                                codeTdObj.find('div').append(hideInput);
                            }
                            if (code == 'flow_business_project_branch_name') {
                                orgType = 'branch';
                                var hideInput = $('<input type="hidden" id="flow_business_project_branch_id" name="flow_business_project_branch_id">');
                                targetId = 'flow_business_project_branch_id';
                                codeTdObj.find('input').attr('readonly', 'readonly');
                                codeTdObj.find('div').append(removeSpan);
                                codeTdObj.find('div').append(addonSpan);
                                codeTdObj.find('div').append(hideInput);
                            }
                            tipMsg = '请选择' + name;
                            if (code == 'start_user_name') {
                                var hideInput = $('<input type="hidden" id="start_user_id" name="start_user_id">');
                                targetId = 'start_user_id';
                                codeTdObj.find('input').attr('readonly', 'readonly');
                                codeTdObj.find('div').append(removeSpan);
                                codeTdObj.find('div').append(addonSpan);
                                codeTdObj.find('div').append(hideInput);
                                addonSpan.xljSingleSelector({
                                    title: tipMsg,//选择器标题，默认是'选择组织机构'
                                    selectorType: "person",//选择器类型，默认是组织机构选择器
                                    targetId: targetId,
                                    targetName: code
                                });
                            } else {
                                addonSpan.xljSingleSelector({
                                    treeUrl:  'http://127.0.0.1:9999/platform-app/sys/org/root/getOrgTreeByType' + '?time=' + Math.random(),
                                    treeParam: {
                                        'rootDelFlag': '0',
                                        'rootStatus': '1',
                                        'orgDelFlag': '0',
                                        'orgStatus': '1',
                                        'type': orgType
                                    },
                                    selectNodeType: {
                                        "type": orgType,
                                        "msg": tipMsg
                                    },
                                    title: tipMsg,//选择器标题，默认是'选择组织机构'
                                    selectorType: "org",//选择器类型，默认是组织机构选择器
                                    targetId: targetId,
                                    targetName: code
                                });
                            }

                            removeSpan.on('click', function () {
                                $(this).siblings('input').val('');
                            });
                            trObj.append(labelTdObj);
                            trObj.append(codeTdObj);
                        }
                        if(groupInstanceArr.length==1){
                            trObj.append('<td class="form-label"></td><td></td>')
                        }
                        tbodyObj.append(trObj);
                    }
                    _emulationBusinessFormTable.append(tbodyObj);

                    var flDataDef = window.parent.getFlDataDef();
                    $.when(flDataDef).done(function (flData) {
                        var baseData = flData.flData;
                        _emulationBusinessFormTable.find(':input[name="business_object_name"]').val($.xljUtils.htmlDecode(baseData.businessObjectName));
                    });
                }

            });
        }
    };
    initVariableForm();

    /**
     * 流程仿真计算
     */
    var flowEmulation = function (flData) {
        //验证仿真业务表单必填项
        $.xljUtils.customSingleValidate($('#_emulationVariableForm')[0]);
        if(!$('#_emulationVariableForm').valid()){
            return;
        }
        executeEmulation(flData);
    };



    /**
     * 向后台请求仿真执行
     */
    var executeEmulation = function (flData) {
        var formDatas = $('#_emulationVariableForm').serializeArray();
        var variableJson = {};
        $.each(formDatas,function (i,formData) {
            var fieldType = $('#'+formData.name).attr('data-fieldtype');
            if(fieldType=='2'&&formData.value!=''){
                variableJson[formData.name]=parseInt(formData.value);
            }else if(fieldType=='3'&&formData.value!=''){
                variableJson[formData.name]=parseFloat(formData.value);
            }else{
                variableJson[formData.name]=formData.value;
            }
        });
        var paramData = {};
        paramData.variableValueJson = JSON.stringify(variableJson);
        paramData.flData = flData;

        $.ajax({ //发送更新的ajax请求
            type : "post",
            url : serviceUrl + "flow/emulation",
            dataType : "json",
            //async : false,
            data : JSON.stringify(paramData), //将对象序列化成JSON字符串  ,
            contentType : 'application/json;charset=utf-8', //设置请求头信息
            success : function(data) {
                if(data.success){
                    var approvalList = data.result;
                    approvalList = processApprovalList(approvalList);
                    drawApproveList('_emulationApproveList',approvalList);
                }

            },
            error : function(data) {

            }
        });
    };

    //将审批人按','分割
    var processApprovalList = function (approvalList) {
        var approvalListNew = [];
        if(approvalList){
            $.each(approvalList,function (i,approval) {
                var approverName = approval.approverName;
                var approverId = approval.approverId;
                if(approverId){
                    var approverIdArr = approverId.split(',');
                    var approverNameArr = approverName.split(',');
                    if(approverIdArr.length>1){
                        for (var j = 0; j < approverIdArr.length; j++) {
                            var obj = approverIdArr[j];
                            //approvalObj.approverId = obj;
                            //approvalObj.approverName = approverNameArr[j];
                            var approvalObj = {};
                            for(var item in approval){
                                approvalObj[item] = approval[item];
                            }
                            approvalObj['approverId'] = approverIdArr[j];
                            approvalObj['approverName'] = approverNameArr[j];
                            approvalListNew.push(approvalObj);
                        }
                    }else{
                        approvalListNew.push(approval);
                    }
                }else{
                    approvalListNew.push(approval);
                }

            });
        }
        return approvalListNew;
    };

    //绘制审批列表
    var drawApproveList = function (approvalTable,approvalList) {
        if(typeof approvalTable === 'string'){
            approvalTable = $('#'+approvalTable);
        }
        var tbodyObj = $('<tbody></tbody>');
        var theader = $('<tr class="form-tr" style="background: #46A7FF;">'+
            '<td style="width: 5%; text-align: center; font-weight: bold">序号</td>'+
            '<td style="width: 15%; text-align: center; font-weight: bold">节点名称</td>'+
            '<td style="width: 15%; text-align: center; font-weight: bold">岗位</td>'+
            '<td style="width: 15%; text-align: center; font-weight: bold">责任人</td>'+
            '<td style="width: 15%; text-align: center; font-weight: bold">操作</td>'+
            '<td style="width: 15%; text-align: center; font-weight: bold">处理意见</td>'+
            '</tr>');
        tbodyObj.append(theader);

        var acIdArr = [];
        var num = 0;
        var repeatAcIdNumJson = {};

        var postIdArr = [];
        var postNum = 0;
        var repeatPostIdNumJson = {};

        var repeatPersonArr = [];

        for (var i = 0; i < approvalList.length; i++) {
            var obj = approvalList[i];
            var acId = obj.acId;


            var setApproverWhenStart = obj.setApproverWhenStart;


            var nodeName = obj.acName;
            var postId = obj.postId;
            var postName = obj.postName;
            var approverName = obj.approverName;
            var approverId = obj.approverId;
            var repeatPersonId = acId+'&&'+postId+'&&'+approverId;
            if($.inArray(repeatPersonId,repeatPersonArr)!=-1){
                continue;
            }
            repeatPersonArr.push(repeatPersonId);
            if(setApproverWhenStart&&!postName){
                postName = '无岗位';
                approverName = '手选责任人';
            }else if(!setApproverWhenStart&&!postName){
                postName ='无岗位';
                approverName ='无';
            }

            if(obj.acType=='3'){
                postName ='';
                approverName ='';
            }

            if(!postName){
                postName = '';
            }

            if(!approverName || approverName=='null'){
                approverName = '';
            }

            var approvalType = obj.approvalType;

            var trObj = $('<tr class="form-tr" data-acid="'+acId+'"></tr>');
            var numTd = $('<td style="width: 5%; text-align: center;">'+(num+1)+'</td>');
            var nodeNameTd = $('<td style="width: 15%; text-align: center;">'+nodeName+'</td>');
            var postNameTd = $('<td style="width: 15%; text-align: center;">'+postName+'</td>');
            var approverNameTd = $('<td style="width: 15%; text-align: center;">'+approverName+'</td>');
            var approvalTypeTd = $('<td style="width: 15%; text-align: center;"></td>');
            var opinionTd = $('<td style="width: 15%; text-align: center;"></td>');
            var repeatAcIdNum = repeatAcIdNumJson[acId];
            //计算同一节点，合并同一个节点的序号、节点名称
            if($.inArray(acId,acIdArr)==-1){
                trObj.append(numTd);
                trObj.append(nodeNameTd);
                //trObj.append(postNameTd);

                acIdArr.push(acId);
                num++;
            }else{
                if(!repeatAcIdNum){
                    repeatAcIdNum = 2;
                }else{
                    repeatAcIdNum++;
                }
                repeatAcIdNumJson[acId] = repeatAcIdNum;

                var oldTds = tbodyObj.find('tr[data-acid="'+acId+'"] td');
                if(repeatAcIdNum){
                    $(oldTds[0]).attr('rowspan',repeatAcIdNum);
                    $(oldTds[1]).attr('rowspan',repeatAcIdNum);
                    //$(oldTds[2]).attr('rowspan',repeatAcIdNum);
                }
            }

            var repeatPostIdNum = repeatPostIdNumJson[acId+'/'+postId];
            if($.inArray(acId+'/'+postId,postIdArr)==-1){
                postNameTd.attr("data-postid",acId+'-'+postId);
                trObj.append(postNameTd);
                postIdArr.push(acId+'/'+postId);
                postNum++;
            }else{
                if(!repeatPostIdNum){
                    repeatPostIdNum = 2;
                }else{
                    repeatPostIdNum++;
                }
                repeatPostIdNumJson[acId+'/'+postId] = repeatPostIdNum;

                var oldTds = tbodyObj.find('td[data-postid="'+(acId+'-'+postId)+'"]');
                if(repeatPostIdNum){
                    //$(oldTds[0]).attr('rowspan',repeatAcIdNum);
                    //$(oldTds[1]).attr('rowspan',repeatAcIdNum);
                    $(oldTds).attr('rowspan',repeatPostIdNum);
                }

            }

            //trObj.append(postNameTd);
            trObj.append(approverNameTd);
            trObj.append(approvalTypeTd);
            trObj.append(opinionTd);

            tbodyObj.append(trObj);
        }

        approvalTable.empty();
        approvalTable.append(tbodyObj);
    };

    //仿真按钮事件
    $('#executeEmulationBtn').on('click',function () {
        var flBaseDataDef = window.parent.getFlDataDef();
        $.when(flBaseDataDef).done(function (flBaseData) {
            var flData = window.parent.getFlDataForSave(flBaseData);
            var validateResult = window.parent.validateFlowChart();
            if(!validateResult.validateFlag){
                $.xljUtils.tip('blue',validateResult.errorMsg);
                return;
            }

            flData.status = '1';
            //$('#executeEmulationBtn').attr('disabled', 'disabled');
            flowEmulation(flData);
        });
    });
});
