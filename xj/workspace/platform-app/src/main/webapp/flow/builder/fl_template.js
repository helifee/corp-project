/**
 * Created by dgh on 2017/11/24.
 * 流程模板数据初始化使用
 */
define(['xljUtils', 'utils','actions'], function (xljUtils, utils,action) {

    var flDataDef;
    var nodeTypeObj = {
        'start':1,
        'task':2,
        'end':3,
        'join':4,
        'fork':5,
        'connector':6,
        'cc':7
    };

    //验证流程图连接正确性
    var validateFlowChart = function () {
        var graph = utils.getGraphEditor();
        var parentNode = graph.getDefaultParent();
        var allCells = parentNode.children;
        var hasStartCell = false;
        var hasMoreStartCell = false;
        var hasEndCell = false;
        var hasMoreEndCell = false;
        var cellConnectorIsCorrect = true;
        var acBaseInfoIsCorrect = true;
        var errorMsg = '';
        if(allCells){
            for(var i in allCells){
                var cell = allCells[i];
                if(!cell.isEdge()){
                    var nodeType = cell.nodeType;
                    if(nodeType=='start'){
                        if(hasStartCell){
                            hasMoreStartCell = true;
                            errorMsg = '只能有一个开始节点';
                            break;
                        }
                        hasStartCell = true;
                        var edges = cell.edges;
                        var isSourceCell = false;
                        //var isTargetCell = false;
                        for(var i in edges){
                            var edge = edges[i];
                            var source = edge.source;
                            if(source==cell){
                                isSourceCell = true;
                            }
                        }
                        if(!isSourceCell){
                            cellConnectorIsCorrect = false;
                            errorMsg = '开始节点未连线';
                            graph.clearSelection();
                            graph.setSelectionCell(cell);
                            break;
                        }
                    }
                    if(nodeType=='end'){
                        if(hasEndCell){
                            hasMoreEndCell = true;
                            errorMsg = '只能有一个结束节点';
                            break;
                        }
                        hasEndCell = true;
                        var edges = cell.edges;
                        var isTargetCell = false;
                        for(var i in edges){
                            var edge = edges[i];
                            var target = edge.target;
                            if(target==cell){
                                isTargetCell = true;
                            }
                        }
                        if(!isTargetCell){
                            cellConnectorIsCorrect = false;
                            errorMsg = '结束节点未连线';
                            graph.clearSelection();
                            graph.setSelectionCell(cell);
                            break;
                        }
                    }
                    if(nodeType!='start'&&nodeType!='end'){
                        var edges = cell.edges;
                        var isSourceCell = false;
                        var isTargetCell = false;
                        for(var i in edges){
                            var edge = edges[i];
                            var source = edge.source;
                            var target = edge.target;
                            if(source==cell){
                                isSourceCell = true;
                            }
                            if(target==cell){
                                isTargetCell = true;
                            }
                        }
                        if(!isSourceCell||!isTargetCell){
                            cellConnectorIsCorrect = false;
                            errorMsg = '任务、网关节点连线不完整';
                            graph.clearSelection();
                            graph.setSelectionCell(cell);
                            break;
                        }

                        //验证
                        if((nodeType=='task'||nodeType=='cc')&&!cell.extra){
                            acBaseInfoIsCorrect = false;
                            errorMsg = '流程模板环节基本信息填写不完整';
                            graph.clearSelection();
                            graph.setSelectionCell(cell);
                            break;
                        }else if(nodeType=='task'&&cell.extra&&cell.extra!=''){
                            try {
                                var acObj = JSON.parse(cell.extra);
                                var participant = cell.participant;
                                if(!acObj.isAddLabel&&(!participant||participant=='')){
                                    acBaseInfoIsCorrect = false;
                                    errorMsg = '流程模板环节基本信息填写不完整';
                                    graph.clearSelection();
                                    graph.setSelectionCell(cell);
                                    break;
                                }

                            }catch (e){
                                console.error(e);
                            }

                        }
                    }
                }
            }

            if(!hasStartCell&&errorMsg==''){
                errorMsg = '没有开始节点';
            }
            if(!hasEndCell&&errorMsg==''){
                errorMsg = '没有结束节点';
            }

            return {validateFlag:hasStartCell&&!hasMoreStartCell&&!hasMoreEndCell&&hasEndCell&&cellConnectorIsCorrect&&acBaseInfoIsCorrect,errorMsg:errorMsg};
        }else{
            errorMsg = '没有流程图';
            return {validateFlag:false,errorMsg:errorMsg};
        }
    };

    //获取模板数据
    var getFlDataForSave = function (flBaseData) {
        var flData ;
        if(flBaseData&&flBaseData.flData){
            flData = flBaseData.flData;
            //验证基本信息必填项
            if (!flData.code || $.trim(flData.code) == '') {
                $.xljUtils.tip('blue', '流程基本信息填写不完整');
                var flDataDef = new $.Deferred().resolve(flBaseData).promise();

                if(window.setFlDataDef){
                    window.setFlDataDef(flDataDef);
                }

                utils.closeFrameWnd();
                action.getAction(utils.getGraphEditor(), 'baseInfo');
                return null;
            }
            if (!flData.name || $.trim(flData.name) == '') {
                $.xljUtils.tip('blue', '流程基本信息填写不完整');
                var flDataDef = new $.Deferred().resolve(flBaseData).promise();

                if(window.setFlDataDef){
                    window.setFlDataDef(flDataDef);
                }
                utils.closeFrameWnd();
                action.getAction(utils.getGraphEditor(), 'baseInfo');
                return null;
            }
            if (!flData.flowTitle || $.trim(flData.flowTitle) == '') {
                $.xljUtils.tip('blue', '流程基本信息填写不完整');
                var flDataDef = new $.Deferred().resolve(flBaseData).promise();

                if(window.setFlDataDef){
                    window.setFlDataDef(flDataDef);
                }
                utils.closeFrameWnd();
                action.getAction(utils.getGraphEditor(), 'baseInfo');
                return null;
            }
            if (!flData.sort || $.trim(flData.sort) == '') {
                $.xljUtils.tip('blue', '流程基本信息填写不完整');
                var flDataDef = new $.Deferred().resolve(flBaseData).promise();

                if(window.setFlDataDef){
                    window.setFlDataDef(flDataDef);
                }
                utils.closeFrameWnd();
                action.getAction(utils.getGraphEditor(), 'baseInfo');
                return null;
            }

            var flDataDef = new $.Deferred().resolve(flBaseData).promise();

            if(window.setFlDataDef){
                window.setFlDataDef(flDataDef);
            }

            var flId = flData.id;
            //获取节点信息
            var graph = utils.getGraphEditor();
            var parentNode = graph.getDefaultParent();
            var childCells = parentNode.children;
            var stepArr = [];
            var acArr = [];
            for (var i = 0; i < childCells.length; i++) {
                var obj = childCells[i];

                if (obj.isEdge()) {
                    var stepObj = {};
                    stepObj.id = obj.id;
                    stepObj.code = obj.code;
                    stepObj.conditionExpression = obj.conditionExpression;
                    stepObj.conditionTranslation = obj.conditionTranslation;
                    stepObj.name = obj.value;
                    stepObj.sourceId = obj.source.id;
                    stepObj.targetId = obj.target.id;
                    stepObj.nodeId = obj.mxObjectId.replace('mxCell#', '');
                    stepObj.flId = flId;
                    stepArr.push(stepObj);
                } else {
                    var acObj = {};
                    var extra = obj.extra;

                    if (extra && extra != '') {
                        acObj = JSON.parse(extra);
                    }
                    //审核人
                    var participant = obj.participant;
                    if (participant && participant != '') {
                        acObj.participant = participant;
                    }
                    //抄送人
                    var ccPerson = obj.ccPerson;
                    if (ccPerson && ccPerson != '') {
                        acObj.ccPerson = ccPerson;
                    }
                    acObj.id = obj.id;
                    acObj.name = obj.value;
                    acObj.flId = flId;
                    acObj.acType = nodeTypeObj[obj.nodeType];
                    acObj.nodeId = obj.mxObjectId.replace('mxCell#', '');
                    acObj.x = obj.geometry.x;
                    acObj.y = obj.geometry.y;
                    acObj.width = obj.geometry.width;
                    acObj.height = obj.geometry.height;
                    acObj.height = obj.geometry.height;
                    acArr.push(acObj);
                }
            }
            flData.ac = JSON.stringify(acArr);
            flData.step = JSON.stringify(stepArr);
            flData.delflag = false;
            delete flData.graphXml;
        }

        return flData;
    };

    //保存模板数据
    var saveFlData = function (flBaseData,saveType) {
        //获取流程图节点详细信息
        var flData = getFlDataForSave(flBaseData);

        if(saveType=='publish'){
            var validateResult = validateFlowChart();
            if(!validateResult.validateFlag){
                $.xljUtils.tip('blue',validateResult.errorMsg);
                return;
            }
        }

        if(flData){
            if(saveType == 'temporary') {
                flData.status = '0';
                $('#tempSaveBtn').attr('disabled', 'disabled');

            } else if(saveType == 'publish') {
                flData.status = '1';
                $('#publishBtn').attr('disabled', 'disabled');
            }
            $.ajax({
                url : hostUrl + "flow/fl/saveAll",
                data : JSON.stringify(flData),
                type : 'POST',
                contentType : 'application/json',
                dataType : 'JSON',
                complete: function() {
                    if(saveType == 'temporary') {
                        $('#tempSaveBtn').removeAttr('disabled');

                    } else if(saveType == 'publish') {
                        $('#publishBtn').removeAttr('disabled');
                    }
                },
                success : function(data) {
                    if (data) {
                        var successFlag = data.success;
                        var result = data.result;
                        var msg = data.msg;
                        if (successFlag) {
                            if ("temporary" == saveType) {
                                $.xljUtils.tip("green", "暂存成功！");
                                if (window.opener != null && window.opener._flListGrid != null) {
                                    window.opener._flListGrid.jqGrid("setGridParam").trigger("reloadGrid");
                                }
                                if (window.opener != null && window.opener.versionGrid != null) {
                                    window.opener.versionGrid.jqGrid("setGridParam").trigger("reloadGrid");
                                }
                                $("#code").attr("disabled",true);
                            } else {
                                $.xljUtils.tip("green", "发布成功！");
                                if (window.opener != null && window.opener._flListGrid != null) {
                                    window.opener._flListGrid.jqGrid("setGridParam").trigger("reloadGrid");
                                }
                                if (window.opener != null && window.opener.versionGrid != null) {
                                    window.opener.versionGrid.jqGrid("setGridParam").trigger("reloadGrid");
                                }
                                closeWin();
                            }
                        } else {
                            if ("0" == saveType) {
                                $.xljUtils.tip("red", "暂存失败！");

                            } else {
                                $.xljUtils.tip("red", "发布失败！");
                            }
                        }
                    }
                },
                error : function(xhr) {
                    window.flDataDef = new $.Deferred().resolve({flData:flData}).promise();
                    $.xljUtils.getError(xhr.status);
                }
            });
        }
    };

    //关闭模板页面
    var closeWin = function () {
        window.open('','_self');
        window.close();
    };

    //初始化操作按钮事件
    var initOperation = function () {
        //暂存
        $('#tempSaveBtn').on('click', function () {
            //获取模板基本信息
            var flDataDef = getFlDataDef();
            $.when(flDataDef).done(function (flBaseData) {
                //var flData = getFlDataForSave(flBaseData);
                saveFlData(flBaseData,'temporary');
            });
        });

        //发布
        $('#publishBtn').on('click',function () {
            if("create" != act){
                //是否生成新版本
                $("#newVersionDialog").show();
                return;
            }
            //获取模板基本信息
            var flDataDef = getFlDataDef();
            $.when(flDataDef).done(function (flBaseData) {
                //var flData = getFlDataForSave(flBaseData);
                saveFlData(flBaseData,'publish');
            });
        });

        //生成新版本
        $('#yesBtn').on('click',function () {
            $("#newVersionDialog").hide();
            //获取模板基本信息
            var flDataDef = getFlDataDef();
            $.when(flDataDef).done(function (flBaseData) {
                var oldFlData = flBaseData.flData;
                oldFlData.versionRemark = $("#versionRemark").val();
                oldFlData.ifNewVersion = true;
                var date = new Date();
                oldFlData.newVersion = $.xljUtils.formatDate("yyyyMMddhhmmss", date);
                saveFlData(flBaseData,'publish');
            });
        });
        //不生成新版本
        $('#noBtn').on('click',function () {
            $("#newVersionDialog").hide();
            //获取模板基本信息
            var flDataDef = getFlDataDef();
            $.when(flDataDef).done(function (flBaseData) {
                saveFlData(flBaseData,'publish');
            });
        });
        //关闭窗口
        $('#closeWinBtn').on('click',function () {
            closeWin();
        });

        //获取url参数
        var urlParams = $.xljUtils.getUrlParams();
        //操作类型
        var act = urlParams.act;
        if(act=='view'){
            $('#tempSaveBtn').remove();
            $('#publishBtn').remove();
        }
    };

    //初始化模板数据
    var initFlDatas = function () {
        //获取url参数
        var urlParams = $.xljUtils.getUrlParams();
        //操作类型
        var act = urlParams.act;

        flDataDef = new $.Deferred();

        if (act == 'create') {//新建
            //应用ID
            var appId = urlParams.appId;
            //业务对象id
            var businessObjectId = urlParams.businessObjectId;
            //业务对象名称
            var businessObjectName = decodeURIComponent(urlParams.businessObjectName);
            var date = new Date();

            var flData = {
                id:utils.getUUID(1),
                appId: appId,
                businessObjectId: businessObjectId,
                businessObjectName: businessObjectName,
                version:$.xljUtils.formatDate("yyyyMMddhhmmss", date),
                sort:$.xljUtils.formatDate("yyyyMMddhhmmss", date)
            };
            var data = {
                flData: flData,
                act: act
            };
            flDataDef.resolve(data);
        }else if (act == 'update'|| act=='view') {//更新
            //模板ID
            var flId = urlParams.flId;
            //业务对象id
            var businessObjectId = urlParams.businessObjectId;
            $.ajax({
                type: "get",
                url: hostUrl + "flow/fl/getAll/" + flId + "?entryType=true&time=" + new Date().getTime(),
                success: function (data) {
                    if(data.success&&data.result){
                        var flData = data.result;
                        /*flData.id = utils.getUUID(1);
                        var date = new Date();
                        var version = $.xljUtils.formatDate("yyyyMMddhhmmss", date);
                        flData.version = version;*/
                        flData.oldStatus = flData.status;
                        var data = {
                            flData: flData,
                            act: act
                        };
                        flDataDef.resolve(data);
                    }
                },
                error: function (xhr) {
                    $.xljUtils.getError(xhr.status);
                }
            });

        } else {
            flDataDef.resolve();
        }

        return flDataDef.promise();
    };

    //初始化默认变量
    var initVariableListByBusinessObjectId = function () {
        var def = new $.Deferred();
        //获取url参数
        var urlParams = $.xljUtils.getUrlParams();
        var paramData = {
            businessObjectId: urlParams.businessObjectId,
            delflag: false,
            sord: 'asc',
            sidx: 'sort'
        };
        $.ajax({ //发送更新的ajax请求
            type: "post",
            url: hostUrl + "flow/businessObjectVariable/queryList",
            dataType: "json",
            //async : false,
            data: JSON.stringify(paramData), //将对象序列化成JSON字符串  ,
            contentType: 'application/json;charset=utf-8', //设置请求头信息
            success: function (data) {
                if (data.success) {
                    var variableList = data.result;
                    def.resolve(variableList);
                }

            },
            error: function (data) {
                def.resolve();
            }
        });

        return def.promise();
    };

    //获取引用流程模板数据
    var referenceFl = function (referenceId) {
        var flDataDef = new $.Deferred();
        $.ajax({
            type: "get",
            url: hostUrl + "flow/fl/getAll/" + referenceId + "?entryType=true&time=" + new Date().getTime(),
            success: function (data) {
                var flData = data.result;
                delete flData['code'];
                delete flData['name'];
                flData.id = utils.getUUID(1);
                var date = new Date();
                var version = $.xljUtils.formatDate("yyyyMMddhhmmss", date);
                flData.version = version;
                var data = {
                    flData: flData
                };
                flDataDef.resolve(data);
            },
            error: function (xhr) {
                $.xljUtils.getError(xhr.status);
                flDataDef.resolve(null);
            }
        });
        return flDataDef;
    };

    //引用其他流程模板,绘制流程模板
    var referenceOtherFl = function (flId) {
        $.when(flDataDef).done(function(flBaseData){
            var oldFlData = flBaseData.flData;
            var oldAct = flBaseData.act;
            var newFlDataDef = referenceFl(flId);
            $.when(newFlDataDef).done(function(flBaseData){
                var flData = flBaseData.flData;
                var oldFlDef = new $.Deferred();
                oldFlData.participant = flData.participant;
                oldFlDef.resolve({flData:oldFlData,act:oldAct});
                flDataDef = oldFlDef.promise();

                if(flData.graphXml){
                    var graph = utils.getGraphEditor();
                    //从xml中渲染画布
                    utils.renderModelFromXml(graph,flData.graphXml);
                    utils.renderModelFromXml(graph,flData.graphXml);

                    utils.closeFrameWnd();
                }
            });
        });

    };

    //获取连线中的条件表达式使用的业务表单字段
    var getConditionFields = function () {
        //获取节点信息
        var graph = utils.getGraphEditor();
        var parentNode = graph.getDefaultParent();
        var childCells = parentNode.children;
        var fieldArr = [];
        if(!childCells){
            return fieldArr;
        }
        for (var i = 0; i < childCells.length; i++) {
            var obj = childCells[i];
            if (obj.isEdge()) {
                var conditionExpression = obj.conditionExpression;
                if(conditionExpression){
                    var reg = /\[(.+?)\]/g;
                    var matchArr = conditionExpression.match(reg);
                    for (var j = 0; j < matchArr.length; j++) {
                        var field = matchArr[j];
                        field = field.replace('[','').replace(']','');

                        fieldArr.push(field);
                    }
                }
            }
        }

        return fieldArr;
    };



    return {
        initOperation: initOperation,
        initFlDatas: initFlDatas,
        initVariableListByBusinessObjectId: initVariableListByBusinessObjectId,
        referenceOtherFl:referenceOtherFl,
        getFlDataForSave:getFlDataForSave,
        validateFlowChart:validateFlowChart,
        getConditionFields:getConditionFields
    };
});