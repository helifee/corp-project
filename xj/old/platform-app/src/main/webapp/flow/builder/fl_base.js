/**
 * Created by dgh on 2017/11/24.
 */
$(function () {

    var operateType ;
    //初始化默认标题
    var initDefualtTitle = function (act) {
        if (window.parent && $.isFunction(window.parent.getVariableListDef)) {
            var variableListDef = window.parent.getVariableListDef();
            $.when(variableListDef).done(function (variableList) {
                window.variableList = variableList;
                if (variableList) {
                    var defualtTitleObj = {};
                    var variableObjJson = {};
                    for (var i = 0; i < variableList.length; i++) {
                        var obj = variableList[i];
                        if (obj.code == 'business_object_name' || obj.code == 'flow_business_company_name' || obj.code == 'start_user_name') {
                            defualtTitleObj[obj.code] = obj.name;
                        }
                        variableObjJson[obj.code] = obj.name;
                    }

                    var defualtTitle = '';
                    var defualtTitleCode = '';
                    var flowTitle = $('#flowTitle').val();
                    if(flowTitle==''){
                        act = 'create';
                    }else{
                        act = 'update';
                    }
                    if (act == 'create') {
                        if (defualtTitleObj['business_object_name']) {
                            defualtTitle += '@' + defualtTitleObj['business_object_name'] + '@-';
                            defualtTitleCode += '@business_object_name@-';
                        }
                        if (defualtTitleObj['flow_business_company_name']) {
                            defualtTitle += '@' + defualtTitleObj['flow_business_company_name'] + '@-';
                            defualtTitleCode += '@flow_business_company_name@-';
                        }
                        if (defualtTitleObj['start_user_name']) {
                            defualtTitle += '@' + defualtTitleObj['start_user_name'] + '@-';
                            defualtTitleCode += '@start_user_name@-';
                        }

                        if (defualtTitle.lastIndexOf('-') != -1) {
                            defualtTitle = defualtTitle.substring(0, defualtTitle.lastIndexOf('-'));
                        }
                        if (defualtTitleCode.lastIndexOf('-') != -1) {
                            defualtTitleCode = defualtTitleCode.substring(0, defualtTitleCode.lastIndexOf('-'));
                        }
                    } else if (act == 'update') {
                        defualtTitleCode = $('#flowTitle').val();
                        defualtTitle = defualtTitleCode;
                        for (var key in variableObjJson) {
                            defualtTitle = defualtTitle.replace(key, variableObjJson[key]);
                        }
                    }

                    $('#flowTitleShow').val(defualtTitle);
                    $('#flowTitle').val(defualtTitleCode);
                }
            });
        }

    };

    //初始化表单数据
    var initForm = function () {
        if (window.parent && $.isFunction(window.parent.getFlDataDef)) {
            var flDataDef = window.parent.getFlDataDef();
            $.when(flDataDef).done(function (flData) {
                if (flData.act == 'create') {
                    operateType = 'create';
                    var baseData = flData.flData;
                    var date = new Date();
                    //var flId = window.parent.getUUID(1);
                    $('#id').val(baseData.id);
                    $("#appId").val(baseData.appId);
                    $("#businessObjectId").val(baseData.businessObjectId);
                    $("#businessObjectName").val(baseData.businessObjectName);
                    $("#version").val(baseData.version);
                    $("#sort").val(baseData.sort);
                    initDefualtTitle();
                } else if (flData.act == 'update') {
                    operateType = 'update';
                    $("#code").attr("readonly", 'readonly');
                    var updateData = flData.flData;
                    //updateData.id = window.parent.getUUID(1);
                    for (var key in updateData) {
                        if ("titleUpdate" == key || "retract" == key || "useStatus" == key || "doArchive" == key) {
                            if (updateData[key]) {
                                $("input[name='" + key + "'][value='1']").prop("checked", "checked");
                            } else {
                                $("input[name='" + key + "'][value='0']").prop("checked", "checked");
                            }
                        } else {
                            //$("#" + key).val(fl[key]);
                            var val = updateData[key];
                            if (key == 'name' || key == 'businessObjectName') {
                                val = $.xljUtils.htmlDecode(updateData[key]);
                            }
                            $("#" + key).val(val);
                        }
                    }

                    initDefualtTitle();
                } else {
                    operateType = flData.operateType;
                    var baseData = flData.flData;
                    for (var key in baseData) {
                        if ("titleUpdate" == key || "retract" == key || "useStatus" == key || "doArchive" == key) {
                            if (baseData[key]) {
                                $("input[name='" + key + "'][value='1']").prop("checked", "checked");
                            } else {
                                $("input[name='" + key + "'][value='0']").prop("checked", "checked");
                            }
                        } else {
                            var val = baseData[key];
                            if (key == 'name' || key == 'businessObjectName') {
                                val = $.xljUtils.htmlDecode(baseData[key]);
                            }
                            $("#" + key).val(val);
                        }
                    }

                    if(operateType&&operateType=='update'){
                        $("#code").attr("readonly", 'readonly');
                    }

                    initDefualtTitle();
                }

                var code = $("#code").val();
                $("#oldCode").val(code);

                $('#flowTitle').siblings('span.input-group-addon').css('cursor', 'pointer');
                $('#flowTitle').siblings('span.input-group-addon').on('click', function () {
                    var objectId = $("#businessObjectId").val();
                    var objectId = $("#businessObjectId").val();
                    var objectName = $("#businessObjectName").val();
                    window.open(encodeURI("fl_variable.html?objectId=" + objectId + "&objectName=" + objectName));
                });
            });
        }
    };
    initForm();

    //初始化可阅人
    var initParticipantForm = function () {
        if (window.parent && $.isFunction(window.parent.getFlDataDef)) {
            var flDataDef = window.parent.getFlDataDef();
            $.when(flDataDef).done(function (flData) {
                var participant = flData.flData.participant;
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
        addRow($('#_baseParticipantTb'));
    });


    //保存基本信息
    $('#saveBtn').on('click', function () {
        $('#_flForm').attr('data-validate-success', 'saveBaseInfo()');
        $('#_flForm').submit();
    });

    //删除行
    $('#delAccessibleBtn').on('click', function () {
        deleteRow('_baseParticipantTb');
    });

    //保存基本信息
    window.saveBaseInfo = function () {
        var baseDataArr = $('#_flForm').serializeArray();
        var baseData = {};
        for (var i in baseDataArr) {
            var name = baseDataArr[i].name;
            if (name && name != undefined && name != null) {
                if (name == "retract" || name == "useStatus" || name == "titleUpdate" || name == "doArchive") {
                    baseData[name] = baseDataArr[i].value == "1" ? true : false;
                } else {
                    baseData[name] = baseDataArr[i].value;
                }
            }
        }

        //获取可阅人信息
        var participantArr = getFlPartnerData('_baseParticipantTb', '3',baseData.id);
        baseData.participant = JSON.stringify(participantArr);

        //删除多余数据
        delete baseData['flowTitleShow'];
        if (window.parent && $.isFunction(window.parent.flDataDefResolveData)) {
            window.parent.flDataDefResolveData({operateType:operateType,flData: baseData});

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