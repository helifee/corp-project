/**
 * Created by dgh on 2017/12/12.
 */
$(function () {

    //tab页签切换
    var switchTab = function () {
        $('.flow-tab button').on('click', function () {
            var btnId = $(this).attr('id');
            $('.flow-tab button').removeClass('active');
            $(this).addClass('active');
            if (btnId == 'approveHistory') {
                $('#approveHistoryDiv').show();
                $('#instanceDiv').hide();
                $('#readRecordDiv').hide();
                $('#readRecordDiv').find('.ui-jqgrid-bdiv').getNiceScroll().hide().resize();
            } else if (btnId == 'instance') {
                $('#approveHistoryDiv').hide();
                $('#instanceDiv').show();
                $('#readRecordDiv').hide();
                $('#readRecordDiv').find('.ui-jqgrid-bdiv').getNiceScroll().hide().resize();
                if(!$(this).data('isLoaded')){
                    initInstanceFlowLog(flowInstanceDataDef);
                    $(this).data('isLoaded',true);
                }

            } else if (btnId == 'readRecord') {
                $('#approveHistoryDiv').hide();
                $('#instanceDiv').hide();
                $('#readRecordDiv').show();
                $('#readRecordDiv').find('.ui-jqgrid-bdiv').getNiceScroll().show().resize();
                if(!$(this).data('isLoaded')){
                    initReadRecordLog(flowInstanceDataDef);
                    $(this).data('isLoaded',true);
                }
            }

        });
    };
    switchTab();

    //初始化流程实例数据
    var initInstanceData = function () {
        var instanceDataDef = new $.Deferred();
        var urlParams = $.xljUtils.getUrlParams();
        var postData = {};
        postData.instanceId = urlParams.instanceId;
        postData.businessId = urlParams.businessId;
        postData.flCode = urlParams.flCode;
        postData.appId = urlParams.appId;
        postData.userId = urlParams.userId;

        $.ajax({
            url: serviceUrl + "flow/instance/flowView",
            data: JSON.stringify(postData),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (data) {
                console.info(data);
                if (data.success) {
                    var flowInstance = data.result;
                    console.log(data.result);
                    instanceDataDef.resolve(flowInstance);
                    //设置流程标题
                    $('.flow-content-title span').text(flowInstance.instanceName);

                } else {
                    instanceDataDef.resolve(null);
                    $.xljUtils.tip('red', '流程实例数据获取失败');
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                instanceDataDef.resolve(null);
                $.xljUtils.getError(xhr.status);
            }
        });
        return instanceDataDef.promise();
    };
    var flowInstanceDataDef = initInstanceData();

    //打开窗口
    var openWin = function (url) {
        if (url.indexOf('casUrlLogin') > -1) {
            //老平台cas单点不需要encodeURI链接
            window.open(url);
        } else {
            window.open(encodeURI(url));
        }
    };

    //关闭窗口
    var closeWin = function () {
        window.open('','_self');
        window.close();
    };

    //流程通用ajax调用
    var commonAjaxAction = function (urlText, paramObject, actionName){
        $.ajax({
            url: "http://127.0.0.1:9999/platform-app/"+urlText,
            data:JSON.stringify(paramObject),
            type:'POST',
            contentType:'application/json',
            dataType:'JSON',
            success:function (resultData ) {
                if(resultData) {
                    var successFlag = resultData.success;
                    if(successFlag) {
                        $.xljUtils.tip("green",actionName+"成功！");
                    }else {
                        $.xljUtils.tip("red",actionName+"失败！");
                    }
                }
            }
        });
    };

    //***********************初始化操作按钮及按钮事件开始********************************

    //初始化操作按钮事件
    var initOperationBtnEvent = function (btnObj,btnCode,instanceId) {
        switch(btnCode){
            //调整环节
            case 'modifyAc':
                btnObj.on('click',function () {
                    var url = encodeURI("http://127.0.0.1:8081/platform-app/flow/runtime/query/modifyAc.html?&instanceId=" + instanceId + "&requestSource=adjust");
                    openWin(url);
                });
                break;
            //审结
            case 'finishApproval':
                btnObj.on('click',function () {
                    var urlText = "flow/instance/finishApproval/" + instanceId;
                    var paramObject = {};
                    commonAjaxAction(urlText, paramObject, "审结");
                });
                break;
            //作废流程
            case 'cancelInstance':
                btnObj.on('click',function () {
                    var urlText = "flow/instance/cancelInstance/" + instanceId;
                    var paramObject = {};
                    commonAjaxAction(urlText, paramObject, "作废流程");
                });
                break;
            //修改处理意见
            case 'modifyApproverAdvice':
                btnObj.on('click',function () {
                    var url = encodeURI("http://127.0.0.1:8081/platform-app/flow/runtime/query/modify_advice.html?instanceId=" + instanceId);
                    openWin(url);
                });
                break;
            //放行
            case 'letItGo':
                btnObj.on('click',function () {
                    var urlText = "flow/instance/letItGo/" + instanceId;
                    var paramObject = {};
                    commonAjaxAction(urlText, paramObject, "放行流程");

                    //更改消息状态
                    chnageStatusOfMsg('YB', 'DB',instanceId);

                    //刷新任务列表
                    //refreshTaskList();
                });
                break;
            //跳过当前审批人
            case 'skipCurrentApprover':
                btnObj.on('click',function () {
                    var urlText = "flow/instance/skipCurrentApprover/" + instanceId;
                    var paramObject = {};
                    commonAjaxAction(urlText, paramObject, "跳过当前审批人");
                });
                break;
            //修改审批人
            case 'modifyApprover':
                btnObj.on('click',function () {
                    var url = encodeURI(serviceUrl+"flow/runtime/query/modify_approver.html?instanceId=" + instanceId);
                    openWin(url);
                });
                break;
            //修改可阅人
            case 'modifyReader':
                btnObj.on('click',function () {
                    var url = encodeURI(serviceUrl+"flow/runtime/query/batch_modify_reader.html?instanceId=" + instanceId);
                    openWin(url);
                });
                break;
            //撤回流程
            case 'withDrawFlow':
                btnObj.on('click',function () {
                    $.ajax({
                        type: 'GET',
                        url: serviceUrl + 'flow/instance/withDrawFlow/' + instanceId,
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        success: function(data) {
                            if(data.success) {
//				location.
// ();
                                //刷新业务系统页面
                                try{
                                    var FunName = window.opener.flowCallBack;
                                    if(window.opener && FunName) {
                                        FunName();
                                    }
                                }catch (e){
                                    //跨域时，window.opener.flowCallBack会报错，导到后面的代码走不到，无法关闭页面
                                }
                                closeWin();
                            } else {
                                $.xljUtils.tip('red', data.msg);
                            }
                        }
                    });
                });
                break;
            //催办
            case 'remind':
                btnObj.on('click',function () {
                    var urlText = "flow/instance/remind/" + instanceId;
                    var paramObject = new Array();
                    commonAjaxAction(urlText, paramObject, "催办");
                });
                break;
            //撤回任务
            case 'withDrawTask':
                btnObj.on('click',function () {
                    var url = serviceUrl + 'flow/instance/withDrawTask?instanceId=' + instanceId;
                    if($.xljUtils.getUrlParam("taskId") != null) {
                        url = url + '&taskId=' + $.xljUtils.getUrlParam("taskId");
                    }
                    url = url + '&time=' + Math.random();	//IE下存在缓存问题。
                    $.ajax({
                        type: 'GET',
                        url: url,
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        success: function(data) {
                            if(data.success) {
                                location.reload();
                            } else {
                                $.xljUtils.tip('red', data.msg);
                            }
                        }
                    });
                });
                break;
            //传阅
            case 'pass':
                btnObj.xljMultipleSelector({
                    selectorType:'onlyPerson',
                    title:'选择人员',
                    selectNodeType:{type:'user',msg:'只能选择人员！'},
                    saveCallback:function (selectedData,ele) {
                        var urlText = "flow/instance/passAndRead/" + instanceId;
                        var paramObject = new Array();

                        for (var i in selectedData) {
                            var userId = selectedData[i].userId;
                            userId = (!userId||userId=='')?selectedData[i].id:userId;
                            paramObject.push({"id":userId,"name":selectedData[i].name,"loginName":selectedData[i].loginName});
                        }
                        commonAjaxAction(urlText, paramObject, "传阅");
                    }
                });
                break;
            //收藏
            case 'collect':
                btnObj.on('click',function () {
                    var urlText = "flow/instance/collection/" + instanceId;
                    $.ajax({
                        url: serviceUrl + urlText,
                        type:'POST',
                        contentType:'application/json',
                        dataType:'JSON',
                        success:function (resultData) {
                            if(resultData) {
                                var successFlag = resultData.success;
                                if(successFlag) {
                                    $.xljUtils.tip("green","收藏成功！");
                                }else {
                                    $.xljUtils.tip("red","收藏失败！");
                                }
                            }
                        }
                    });
                });
                break;
            //打印
            case 'print':
                btnObj.on('click',function () {
                    //打印前
                    var headerBackgoundColor = $('header').css('background-color');
                    var titleColor =  $('header div.xj-form-title').css('color');
                    $('header').css('background-color','transparent');
                    $('header').find('img').hide();
                    $('header').css('position','relative');
                    $('header div.xj-form-title').css('color','#333');
                    var approveIsVisible = $('#approveArea').parent('div').is(":visible");
                    if(approveIsVisible){
                        $('#approveArea').parent('div').hide();
                        $('.flowContent').parent('div').removeClass('col-xs-9').addClass('col-xs-12');
                    }

                    $('header .xj-flow-btn').hide();
                    $('.flow-tab').hide();
                    $('body').width(1240);

                    var bizFormFrame = document.getElementById('bizForm');
                    if(bizFormFrame&&bizFormFrame.contentWindow&&$.isFunction(bizFormFrame.contentWindow.resizeOfficeIframe)){
                        bizFormFrame.contentWindow.resizeOfficeIframe();
                        resizeBizFormHeight();
                    }

                    setTimeout(function () {
                        $('#flowContent').height($('#flowContent')[0].scrollHeight);
                        $(window).off('resize').on('resize',function () {
                            $('#flowContent').height($('#flowContent')[0].scrollHeight);
                        });
                        window.print();

                        //打印后
                        $('header').css('background-color',headerBackgoundColor);
                        $('header').find('img').show();
                        $('header').css('position','fixed');
                        $('header div.xj-form-title').css('color',titleColor);
                        if(approveIsVisible){
                            $('#approveArea').parent('div').show();
                            $('.flowContent').parent('div').removeClass('col-xs-9').addClass('col-xs-12');
                        }

                        $('header .xj-flow-btn').show();
                        $('.flow-tab').show();
                        $('body').css('width','100%');
                        $('#flowContent').height($('#flowContent')[0].scrollHeight);
                        $(window).off('resize').on('resize',function () {
                            //$('#flowContent').height($('#flowContent')[0].scrollHeight);
                            initFlowContentSize();
                        });
                        $(window).resize();
                    },300);
                });
                break;
            //关闭
            default:
                //关闭窗口
                btnObj.on('click',function () {
                    closeWin();
                });
                break;
        }
    };
    //初始化操作按钮
    var initOperationBtns = function (instanceDataDef) {
        $.when(instanceDataDef).done(function (flowInstance) {
            if(flowInstance){
                var btnCodes = flowInstance.btnCodes;
                if(btnCodes){
                    var btnCodeNameMap = {
                        modifyAc:'调整环节',
                        finishApproval:'审结',
                        cancelInstance:'作废流程',
                        modifyApproverAdvice:'修改处理意见',
                        letItGo:'放行',
                        skipCurrentApprover:'跳过当前审批人',
                        modifyApprover:'修改审批人',
                        modifyReader:'修改可阅人',
                        withDrawFlow:'撤回流程',
                        remind:'催办',
                        withDrawTask:'撤回任务',
                        pass:'传阅',
                        collect:'收藏',
                        print:'打印',
                        shut:'关闭'
                    };


                    //if(btnCodes.length>)
                    if(btnCodes.indexOf('shut')!=-1){
                        btnCodes.splice(btnCodes.indexOf('shut'),1);
                    }
                    var moreBtnContainer = $('<div class="btn-group" role="group">																										' +
                        '	<button type="button" class="btn btn-sm btn-adv dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">更多 ' +
                        '		<span class="caret"></span>                                                                                                         ' +
                        '	</button>                                                                                                                               ' +
                        '	<ul class="dropdown-menu">                                                                                                              ' +
                        '	</ul>                                                                                                                                   ' +
                        '</div>                                                                                                                                     ');

                    for(var key in btnCodeNameMap){
                        if($.inArray(key,btnCodes)!=-1){
                            var btnObj = $('<button type="button" class="btn btn-sm " ></button>');
                            btnObj.text(btnCodeNameMap[key]);

                            if($('#operationBtnContainer button').length>=4){
                                var liObj = $('<li><a href="javascript:void(0);" ></a></li>');
                                liObj.find('a').text(btnCodeNameMap[key]);
                                moreBtnContainer.find('ul').append(liObj);
                                initOperationBtnEvent(liObj.find('a'),key,flowInstance.instanceId);
                            }else{
                                $('#operationBtnContainer').append(btnObj);
                                initOperationBtnEvent(btnObj,key,flowInstance.instanceId);
                            }
                        }
                    }

                    //添加更多按钮
                    if(moreBtnContainer.find('ul li').length>0){
                        $('#operationBtnContainer').append(moreBtnContainer);
                    }

                    //关闭按钮放最后
                    var closeWinBtn = $('<button type="button" class="btn btn-sm"  id="closeWinBtn" title="close">关闭</button>');
                    initOperationBtnEvent(closeWinBtn,'shut');
                    $('#operationBtnContainer').append(closeWinBtn);

                }
            }

        });
    };
    initOperationBtns(flowInstanceDataDef);

    //***********************初始化操作按钮及按钮事件结束********************************



    //加载业务表单
    var loadBusinessForm = function (instanceDataDef) {
        $.when(instanceDataDef).done(function (flowInstance) {
            if(flowInstance){
                var startChar = '?';
                if (flowInstance.pcUrl.indexOf('?') != -1) {
                    startChar = '&';
                }

                var url = flowInstance.pcUrl + startChar
                    + 'businessId=' + flowInstance.businessId + '&time=' + Math.random();

                //针对旧的业务系统参数
                url = url + '&bizId=' + flowInstance.businessId + '&flCode=' + flowInstance.flCode
                    + '&DTL_SESSION_ID=' + flowInstance.currentSessionId + '&userId=' + flowInstance.currentUserId;

                url = url + '&approveType=' + flowInstance.currentApprovalTypeId + '&iframeMode=' + flowInstance.iframeMode;
                if (sessionSign) {
                    url += '&_s=' + sessionSign;
                }

                // 跳过自定义表单的iframe注入加载方式
                // 不等于“customFormInstance_flow.html”则用iframe加载
                var topSrc = window.location.href;
                if(topSrc.indexOf('#')!=-1){
                    topSrc = topSrc.substring(0,topSrc.indexOf('#'));
                }
                url += '&topWinSrc='+ encodeURIComponent(topSrc);
                $('#bizForm').attr('src', url);
                if (url && url.indexOf('customFormInstance_flow.html') == -1) {
                } else {
                    // 如果是“customFormInstance_flow.html”， 则隐藏iframe
                    $('#bizForm').hide();
                }
            }
        });
    };
    loadBusinessForm(flowInstanceDataDef);



    //****************初始化审批列表开始********************

    //绘制审批列表
    var drawApproveList = function (approvalTable, approvalList) {
        if (typeof approvalTable === 'string') {
            approvalTable = $('#' + approvalTable);
        }
        var tbodyObj = $('<tbody></tbody>');
        var theader = $('<tr class="form-tr form-header" >' +
            '<td style="width: 5%; text-align: center; font-weight: bold">序号</td>' +
            '<td style="width: 10%; text-align: center; font-weight: bold">环节名称</td>' +
            '<td style="width: 20%; text-align: center; font-weight: bold">岗位</td>' +
            '<td style="width: 10%; text-align: center; font-weight: bold">责任人</td>' +
            '<td style="width: 10%; text-align: center; font-weight: bold">操作</td>' +
            '<td style="width: 30%; text-align: center; font-weight: bold">处理意见</td>' +
            '<td style="width: 15%; text-align: center; font-weight: bold">处理时间</td>' +
            '</tr>');
        tbodyObj.append(theader);

        var acIdArr = [];
        var num = 0;
        var repeatAcIdNumJson = {};

        var postIdArr = [];
        var postNum = 0;
        var repeatPostIdNumJson = {};

        var repeatPersonArr = [];

        //需要添加附件的div id
        var attachmentIdArr = [];
        for (var i = 0; i < approvalList.length; i++) {
            var obj = approvalList[i];
            var acId = obj.acId;


            var setApproverWhenStart = obj.setApproverWhenStart;


            var nodeName = obj.acName;

            var postId = obj.postId;
            var postName = obj.postName;

            var approverName = obj.approverName;
            var approverId = obj.approverId;

            var taskId = obj.taskId;

            var repeatPersonId = acId + '&&' + postId + '&&' + approverId + '&&' + taskId;
            if ($.inArray(repeatPersonId, repeatPersonArr) != -1) {
                continue;
            }
            repeatPersonArr.push(repeatPersonId);
            if (setApproverWhenStart && !postName) {
                postName = '无岗位';
                approverName = '手选责任人';
            } else if (!setApproverWhenStart && !postName) {
                postName = '无岗位';
                approverName = '无';
            } else {
                postName = postName.lastIndexOf('/') != -1 ? (postName.substring(0, postName.lastIndexOf('/')) + '<br/>' + postName.substring(postName.lastIndexOf('/') + 1)) : postName;
            }

            if (obj.acType == '3') {
                postName = '';
                approverName = '';
            }

            if (!postName) {
                postName = '';
            }

            if (!approverName || approverName == 'null') {
                approverName = '';
            }

            var taskEndTime = obj.taskEndTime;
            taskEndTime = taskEndTime ? taskEndTime : '';

            var taskComments = obj.taskComments;
            taskComments = taskComments ? taskComments : '';
            //附件
            taskComments = taskComments + '</br>' + '<div id="_attachment-' + (i + 1) + '" class="check-list"></div>';

            var approvalType = obj.approvalType;
            //approvalType = approvalType?approvalType:(obj.acType=='1'?'发起流程':'');
            if (obj.taskResult == 'START') {
                approvalType = '发起流程';
            } else {
                approvalType = (obj.taskResultName == null) ? '' : obj.taskResultName;
            }

            //环节状态
            var acStatus = obj.acStatus;

            var trObj = $('<tr class="form-tr" data-acid="' + acId + '"></tr>');

            var numTd = $('<td style="width: 5%; text-align: center;">' + (num + 1) + '</td>');
            var nodeNameTd = $('<td style="width: 10%; text-align: left;">' + nodeName + '</td>');
            var postNameTd = $('<td style="width: 20%; text-align: left;">' + postName + '</td>');
            if (acStatus == '2') {
                numTd.addClass('current-node');
                nodeNameTd.addClass('current-node');
                postNameTd.addClass('current-node');
            }

            var approverNameTd = $('<td style="width: 10%; text-align: left;">' + approverName + '</td>');
            var approvalTypeTd = $('<td style="width: 10%; text-align: left;">' + approvalType + '</td>');
            var opinionTd = $('<td style="width: 30%; text-align: left;">' + taskComments + '</td>');
            var taskEndTimeTd = $('<td style="width: 15%; text-align: left;">' + taskEndTime + '</td>');
            if (acStatus == '2' && approvalType == '') {
                approverNameTd.addClass('current-node');
                approvalTypeTd.addClass('current-node');
                opinionTd.addClass('current-node');
                taskEndTimeTd.addClass('current-node');
            }
            var repeatAcIdNum = repeatAcIdNumJson[acId];
            //计算同一节点，合并同一个节点的序号、节点名称
            if ($.inArray(acId, acIdArr) == -1) {
                trObj.append(numTd);
                trObj.append(nodeNameTd);
                //trObj.append(postNameTd);

                acIdArr.push(acId);
                num++;
            } else {
                if (!repeatAcIdNum) {
                    repeatAcIdNum = 2;
                } else {
                    repeatAcIdNum++;
                }
                repeatAcIdNumJson[acId] = repeatAcIdNum;

                var oldTds = tbodyObj.find('tr[data-acid="' + acId + '"] td');
                if (repeatAcIdNum) {
                    $(oldTds[0]).attr('rowspan', repeatAcIdNum);
                    $(oldTds[1]).attr('rowspan', repeatAcIdNum);
                    //$(oldTds[2]).attr('rowspan',repeatAcIdNum);
                }
            }

            var repeatPostIdNum = repeatPostIdNumJson[acId + '/' + postId + '/' + taskId];
            if ($.inArray(acId + '/' + postId, postIdArr) == -1) {
                postNameTd.attr("data-postid", acId + '-' + postId + '-' + taskId);
                trObj.append(postNameTd);
                postIdArr.push(acId + '/' + postId + '/' + taskId);
                postNum++;
            } else {
                if (!repeatPostIdNum) {
                    repeatPostIdNum = 2;
                } else {
                    repeatPostIdNum++;
                }
                repeatPostIdNumJson[acId + '/' + postId + '/' + taskId] = repeatPostIdNum;

                var oldTds = tbodyObj.find('td[data-postid="' + (acId + '-' + postId + '-' + taskId) + '"]');
                if (repeatPostIdNum) {
                    //$(oldTds[0]).attr('rowspan',repeatAcIdNum);
                    //$(oldTds[1]).attr('rowspan',repeatAcIdNum);
                    $(oldTds).attr('rowspan', repeatPostIdNum);
                }

            }

            //trObj.append(postNameTd);
            trObj.append(approverNameTd);
            trObj.append(approvalTypeTd);
            trObj.append(opinionTd);
            trObj.append(taskEndTimeTd);

            if ((obj.taskStatus == '1' || obj.taskStatus == '') && obj.postStatus != '3') {
                trObj.addClass('not-approve-node');
            } else if (obj.acStatus == '4' || obj.postStatus == '4' || obj.approverStatus == '4') {
                trObj.addClass('not-approve-node');
            } else if (obj.acStatus == '1' || obj.acStatus == '') {
                trObj.addClass('not-approve-node');
            } else if (obj.acStatus == '3') {
                trObj.removeClass('not-approve-node');
            }

            //加载附件
            if(obj.taskStatus == '3') {
                if(obj.acType == '1'){
                    var attachmentIdMapJson = {};
                    attachmentIdMapJson.attachmentDivId = '_attachment-' + (i+1);
                    attachmentIdMapJson.appId = obj.appId;
                    attachmentIdMapJson.instanceId = obj.instanceId;
                    attachmentIdArr.push(attachmentIdMapJson);

                }else{
                    if(obj.groupKey != null) {
                        var attachmentIdMapJson = {};
                        attachmentIdMapJson.attachmentDivId = '_attachment-' + (i+1);
                        attachmentIdMapJson.appId = obj.appId;
                        attachmentIdMapJson.instanceId = obj.instanceId;
                        attachmentIdMapJson.groupKey = obj.groupKey;
                        attachmentIdArr.push(attachmentIdMapJson);
                    }
                }
            }

            tbodyObj.append(trObj);
        }

        approvalTable.empty();
        approvalTable.append(tbodyObj);
        //加载附件
        for (var i = 0; i < attachmentIdArr.length; i++) {
            var attachmentIdMapJson = attachmentIdArr[i];
            var appId = attachmentIdMapJson.appId;
            var instanceId = attachmentIdMapJson.instanceId;
            var groupKey = attachmentIdMapJson.groupKey;
            $('#' + attachmentIdMapJson.attachmentDivId).xljAttachment({
                appId: appId,
                businessId: instanceId,
                categoryId: groupKey?groupKey:instanceId,
                mode: 'table',
                hideButtonsWithNoFile: true
            });

        }
    };
    //初始化审批列表
    var initApproveList = function (instanceDataDef) {
        $.when(instanceDataDef).done(function (flowInstance) {
            var approvalListTb = $('#approvalList');
            if (flowInstance) {
                drawApproveList('approvalList', flowInstance.list);
            }

        })
    };
    initApproveList(flowInstanceDataDef);

    //****************初始化审批列表结束********************



    //初始化关联流程
    var initRelationFlow = function (instanceDataDef) {
        $.when(instanceDataDef).done(function (flowInstance) {
            if (flowInstance) {
                if (flowInstance.relateFlows != null && flowInstance.relateFlows.length > 0) {
                    $("#relateFlowContainer").show();
                    $.each(flowInstance.relateFlows, function (index, item) {
                        var url = serviceUrl + 'flow/runtime/approve/flow.html?instanceId=' + item.id + '&flCode='
                            + item.flCode + '&businessId=' + item.businessId + '&sourceInstanceId=' + flowInstance.instanceId;
                        if (sessionSign) {
                            url += '&_s=' + sessionSign;
                        }
                        var linkText = '<a target="_blank" href="' + url + '" >' + item.name + '</a><br/>';
                        $('#relateFlow').append($(linkText));
                    });
                } else {
                    $("#relateFlowContainer").hide();
                }
            }

        })
    };
    initRelationFlow(flowInstanceDataDef);



    //****************初始化流程提交区域开始********************

    //初始化下一环节
    var initNext = function (next) {
        var nexAc = '';
        if(next != '') {
            $.each(next, function() {
                if(this != '') {
                    nexAc = nexAc + this + ', ';
                }
            });
            if(nexAc!=''){

                if(nexAc.indexOf('\\')>=0) {
                    nexAc = nexAc.replace(/\\/g, '');
                }

                $("#next").html(nexAc.substring(0, nexAc.length - 2));
            }else{
                $("#next").html(nexAc);
            }
        }
    };

    //设置默认审批意见
    var setUserNode = function (){
        var val = $('#_defaultUserNode').val();
        var name = $('#_defaultUserNode').find('option[value="' + val + '"]').text();
        if(val == ''){
            name = "";
        }
        $("#approvalText").val(name);
    };

    //获取用户自定义意见
    var getUserOpinions = function (flag){
        $.ajax({
            type: "post",
            url: serviceUrl+"flow/flowUserOpinion/queryUserOpinion",
            dataType:"json",
            data: "{}",
            contentType: 'application/json;charset=utf-8',
            success: function(data){
                var list = data.result;
                if(list && list.length >0){
                    $('#_defaultUserNode').empty();
                    var optObj = $('<option></option>');
                    optObj.val("");
                    optObj.text("请选择自定义审批意见");
                    $('#_defaultUserNode').append(optObj);
                    for(var i=0;i<list.length;i++){
                        var optObj = $('<option></option>');
                        optObj.val(list[i].id);
                        optObj.text(list[i].opinion);
                        $('#_defaultUserNode').append(optObj);
                    }
                    if(flag){
                        setUserNode();
                    }
                }
            },
            error: function(data){
                if(data.msg){
                    $.xljUtils.tip("red",data.msg);
                }else{
                    $.xljUtils.tip("red","修改失败！");
                }
            }
        });
    };
    window.getUserOpinions = getUserOpinions;

    //初始化操作
    var initOperation = function (operations,instanceId) {
        //加载操作类型
        var xbSelectorContainer = $('<div></div>');
        var zbSelectorContainer = $('<div></div>');
        var dhSelectorContainer = $('<div></div>');
        var approveRepeatContainerDiv = $('<div></div>');
        $.each(operations,function (i,operation) {
            if(operation){
                var labelObj = $('<label class="operation-label" title="'+operation.eName+'"></label>');
                var radioObj = $('<input type="radio" name="approvalResult" >');
                radioObj.val(operation.operationCode);
                radioObj.data('defaultNote',operation.defaultNote);
                //radioObj.text(operation.showName);
                var hiddenObj = $('<input type="hidden" name="noteType">');
                hiddenObj.val(operation.noteType);

                labelObj.append(radioObj);
                labelObj.append(operation.showName);
                labelObj.append(hiddenObj);
                $('#operate').append(labelObj);

                switch (operation.operationCode){
                    //协办
                    case 'XB':
                        var xbSelector = $('<div id="xbSelector" style="display:none" class="input-group">' +
                            '<input type="text" class="form-control" id="xbPersonName" readonly="readonly" placeholder="选择人员（多选）">'
                            + '<input type="hidden" class="form-control" id="xbPersonId" readonly="readonly" title="选择人员（多选）" placeholder="选择人员（多选）">'
                            + '<span class="input-group-addon " >...</span></div>');
                        xbSelector.find('span.input-group-addon').xljMultipleSelector({
                            title:'选择人员',
                            selectorType:'onlyPerson',
                            selectNodeType: {
                                type: 'user',
                                msg: '只能选择人员！'
                            },
                            treeParam:{
                                userStatus:true
                            },
                            targetName:'xbPersonName',
                            targetId:'xbPersonId'
                        });
                        $(xbSelectorContainer).append(xbSelector);
                        break;
                    //转办
                    case 'ZB':
                        var zbSelector = $('<div id="zbSelector" style="display:none" class="input-group">' +
                            '<input type="text" class="form-control" id="zbPersonName" readonly="readonly" placeholder="选择人员">' +
                            '<input type="hidden" class="form-control" id="zbPersonId" readonly="readonly" title="选择人员" placeholder="选择人员">' +
                            '<span class="input-group-addon" >...</span></div>');
                        zbSelector.find('span.input-group-addon').xljSingleSelector({
                            title:'选择人员',
                            selectorType:'person',
                            treeParam:{
                                userStatus:true
                            },
                            targetName:'zbPersonName',
                            targetId:'zbPersonId'
                        });
                        $(zbSelectorContainer).append(zbSelector);
                        break;
                    //无异议
                    case 'WYY':
                        $('#approvalText').val(operation.defaultNote);
                        break;
                    //同意
                    case 'TY':
                        $('#approvalText').val(operation.defaultNote);
                        break;
                    //打回
                    case 'DH':
                        var selector = $('<div class="input-group select-box" id="dhContainer" style="display:none"><span class="input-group-addon" title="rebut">打回到</span><select id="dhSelect" class="form-control"></select></div>');
                        var approveRepeatContainer = $('<div id="approveRepeatDiv" style="display:none"><span style="margin-right: 5px;">重新审批</span>'
                            + '<input name="approveRepeat" type="radio" value="1" checked />是&nbsp;&nbsp;&nbsp;&nbsp;'
                            + '<input name="approveRepeat" type="radio" value="0" />否</div>');
                        $(dhSelectorContainer).append(selector);
                        $(approveRepeatContainerDiv).append(approveRepeatContainer);
                        break;
                    default:
                        break;
                }

            }
        });
        if(xbSelectorContainer.html()!=''){
            $('#operate').append(xbSelectorContainer);
        }
        if(zbSelectorContainer.html()!=''){
            $('#operate').append(zbSelectorContainer);
        }
        if(dhSelectorContainer.html()!=''){
            $('#operate').append(dhSelectorContainer);
        }
        if(approveRepeatContainerDiv.html()!=''){
            $('#operate').append(approveRepeatContainerDiv);
        }

        //审批类型点击事件
        $('#operate input[name=approvalResult]').on('click',function () {
            var operationCode = $(this).val();

            $("#zbSelector").hide();
            $("#xbSelector").hide();
            $('#dhContainer').hide();
            $('#approveRepeatDiv').hide();
            if("ZB"==operationCode ){
                $('#zbSelector').show();
            }else if("XB"==operationCode){
                $('#xbSelector').show();
            } else if(operationCode == 'DH') {
                $('#dhContainer').show();
                $('#approveRepeatDiv').show();
                //查询打回目标人
                $.ajax({
                    type: 'POST',
                    url: serviceUrl + 'flow/instance/queryApproverDone',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify({instanceId: instanceId}),
                    success: function(data) {
                        $('#dhSelect').empty();
                        $.each(data.result, function() {
                            $('#dhSelect').append('<option value="'+ this.id + '" data-returnName="' + this.name + '">' + this.displayName + '</option>');
                        });
                    }
                });
            }
            //设置各个操作的默认值
            if($('#approvalText').val()=="无异议"||$('#approvalText').val()=="沟通"||$('#approvalText').val()=="协办"||$('#approvalText').val()=="转办"){
                $('#approvalText').val($(this).data('defaultNote'));
            }
        });

        $('#operate input[name=approvalResult]')[0].checked = true;
        $($('#operate input[name=approvalResult]')[0]).click();

        getUserOpinions();

    };

    //验证流程提交前置条件
    var validateBeforeApprove = function () {
        var approvalResult = $('input[name="approvalResult"]:checked').val();//$('input[name="approvalResult"]').filter(':checked').val();
        var approvalText = $("#approvalText").val();
        var noteTypeVal = $('input[name="approvalResult"]:checked').siblings('input[name="noteType"]').val();
        if("XB" == approvalResult){
            var xbPersonId = $("#xbPersonId").val();
            if(!xbPersonId){
                $.xljUtils.tip('red', '请选择协办人！');
                return false;
            }
            if(!approvalText || approvalText==""){
                if(noteTypeVal=='true'){
                    $.xljUtils.tip('red', '请填写处理意见！');
                    return false;
                }
            }
        }
        if("ZB" == approvalResult){
            var zbPersonId = $("#zbPersonId").val();
            if(!zbPersonId){
                $.xljUtils.tip('red', '请选择转办人！');
                return false;
            }
            if(!approvalText || approvalText==""){
                if(noteTypeVal.val()=='true'){
                    $.xljUtils.tip('red', '请填写处理意见！');
                    return false;
                }
            }
        }

        if("DH" == approvalResult) {
            if(!approvalText || approvalText==""){
                if(noteTypeVal=='true'){
                    $.xljUtils.tip('red', '请填写处理意见！');
                    return false;
                }
            }
        }

        if("TY" == approvalResult) {
            if(!approvalText || approvalText==""){
                if(noteTypeVal=='true'){
                    $.xljUtils.tip('red', '请填写处理意见！');
                    return false;
                }
            }
        }

        if(!approvalText || approvalText==""){
            if(noteTypeVal=='true'){
                $.xljUtils.tip('red', '请填写处理意见！');
                return false;
            }
        }

        return true;
    };

    //提交流程
    var submitProcess = function (flowInstance) {

        var approvalSubmit = {};
        approvalSubmit.instanceId = flowInstance.instanceId;

        //确定当前提交人的任务ID
        $.each(flowInstance.list, function(index, item) {
            if(item.approverId == flowInstance.currentUserId
                && item.taskStatus == '2') {

                //不从当前URL中取值，是因为当用户提交审批后，下一审批人还是他本人的情况，此时第二次提交，URL中的taskId不是当前点亮行中的taskId
                /*var taskId = $.getUrlParam('taskId');
                var msgId = $.getUrlParam('msgId');*/
                approvalSubmit.taskId = item.taskId;//(taskId == '') ? item.taskId : taskId;
                approvalSubmit.msgId = item.msgId;//(msgId == '') ? item.msgId : msgId;
                return false;
            }
        });


        approvalSubmit.operationType = $("input[name='approvalResult']:checked").val();
        approvalSubmit.operationName = $("input[name='approvalResult']:checked").parent('label').text();
        approvalSubmit.userNote = $("#approvalText").val();
        approvalSubmit.userOpinionId = $('#_defaultUserNode').val();

        if(approvalSubmit.operationType == 'XB') {
            approvalSubmit.assisters = $('#xbPersonId').val();
            approvalSubmit.assistersName = $('#xbPersonName').val();

        } else if(approvalSubmit.operationType == 'ZB') {
            approvalSubmit.transferId = $('#zbPersonId').val();
            approvalSubmit.transferName = $('#zbPersonName').val();

        } else if(approvalSubmit.operationType == 'DH') {
            approvalSubmit.returnApprover = $('#dhSelect').val();
            approvalSubmit.returnApproverName = $('#dhSelect option:selected').attr('data-returnName')
            approvalSubmit.approveRepeat = $("input[name='approveRepeat']:checked").val();
        }

        $('#_currentAttachment').xljAttachmentSubmit(function(success, result) {
            if(success == false) {
            } else {
                $.ajax({
                    type: 'POST',
                    url: serviceUrl + 'flow/instance/approval',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data: JSON.stringify(approvalSubmit),
                    success: function(data) {
                        if(data.success) {
                            $.xljUtils.tip('green', '审批成功！');
                            //$('#_currentAttachment').xljAttachmentSubmit();

                            //审批完成后刷新任务列表
                            refreshTaskList();

                            location.reload();

                        } else {
                            $.xljUtils.tip('red', data.msg);


                            $(this).css("background","#ac2925");
                            $(this).removeAttr('disabled');
                            $(this).text("提交审批");
                        }
                    }
                });
            }
        });
    };

    //初始化流程提交区域
    var initApproveArea = function (instanceDataDef) {
        $.when(instanceDataDef).done(function (flowInstance) {
            if(flowInstance){
                if(flowInstance.operations != null && flowInstance.operations.length > 0 && $.xljUtils.getUrlParam("source") != 'FQ') {
                    $('#flowContent').parent('div').removeClass('col-xs-12').addClass('col-xs-9');
                    $('#approveArea').parent('div').show();

                    //初始化过程附件
                    $('#_currentAttachment').xljAttachment({
                        appId: flowInstance.appId,
                        businessId: flowInstance.instanceId,
                        categoryId: flowInstance.currentGroupKey,
                        mode:'add',
                        hideButtonsWithNoFile:true,
                        fileUploaded:function () {
                        }
                    });


                    //2、初始化操作类型
                    initOperation(flowInstance.operations,flowInstance.instanceId);

                    //3、初始化下一环节
                    initNext(flowInstance.nextAc);

                    //自定义审批意见
                    $('#userCustomOpinionBtn').on('click',function () {
                        openWin(serviceUrl + 'flow/runtime/approve/userOpinion.html');
                    });

                    $('#_defaultUserNode').on('change',function () {
                       setUserNode();
                    });

                    //绑定审批事件
                    $("#submitApprovalBtn").on("click", function(e) {

                        //禁用提交按钮，防止反复提交
                        $(this).css("background","#F0F0F0");
                        $(this).attr({ disabled: "disabled" });
                        $(this).text("提交中...");

                        //审批前检查
                        if(!validateBeforeApprove()) {

                            $(this).css("background","#ac2925");
                            $(this).removeAttr('disabled');
                            $(this).text("提交审批");

                            return ;
                        }

                        submitProcess(flowInstance);
                    });
                }else{
                    $('#submitApprovalBtn').attr('disabled','disabled')
                }
            }

        });

    };
    initApproveArea(flowInstanceDataDef);

    //****************初始化流程提交区域结束********************




    //*******************************流程状态更改事件*************************************

    //刷新opener 页面任务列表
    var refreshTaskList = function () {
        //刷新任务列表
        try {
            if(window.opener && $.isFunction(window.opener.refreshMyTaskData)) {
                window.opener.refreshMyTaskData();
            }
        } catch (e) {

        }
    };

    //设置消息状态为打开
    var setMessageOpened = function () {
        var msgId = $.xljUtils.getUrlParam("msgId");
        if(msgId&&msgId!='') {
            $.ajax({
                type: 'GET',
                url: serviceUrl + 'flow/sysNoticeMsg/setMessageOpened?messageId=' + msgId,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function() {
                    //console.info('更新消息状态成功！msgId=' + $.getUrlParam("msgId"));
                }
            });
        }
    };

    //更改流程阅读状态
    var changeInstanceReaderStatus = function (instanceId){
        var paramData = {instanceId: instanceId};
        var fullUrl = serviceUrl + "flow/instanceOperateLog/changeToReadIntoHaveRead";
        //fullUrl += '?_s='+sessionSign;
        $.ajax({ //发送更新的ajax请求
            type: "post",
            url: fullUrl,
            dataType: "json",
            async: true,//改为异步加载处理方式
            data: JSON.stringify( paramData ),
            contentType: 'application/json;charset=utf-8', //设置请求头信息
            success: function (data) {
                //console.info("调用修改操作日志的状态待阅变为已阅的接口 已成功!");
            },
            error: function (data) {
                if (data.msg) {
                    $.xljUtils.tip('red', data.msg);
                } else {
                    $.xljUtils.tip('red', "调用修改操作日志的状态待阅变为已阅的接口  失败！");
                }
            }
        });
    };

    //更新消息状态:destState-更新后状态；sourceState-更新前状态；
    var chnageStatusOfMsg = function (destState, sourceState,instanceId) {
        var msgId = $.xljUtils.getUrlParam('msgId');
        if (msgId) {
            // 因为入口比较多,所以改为默认都执行该方法，去执行力流程可阅人的操作日志状态(从view.js迁移过来)
            changeInstanceReaderStatus(instanceId);

            var paramData = {
                id : msgId,
                'newStatus' : destState,
                'oldStatus' : sourceState
            };
            var fullUrl = serviceUrl + "flow/sysNoticeMsg/updateStatusOfNoticeMsg";
            $.ajax({ // 发送更新的ajax请求
                type : "post",
                url : fullUrl,
                dataType : "json",
                data : JSON.stringify(paramData),
                contentType : 'application/json;charset=utf-8', // 设置请求头信息
                success : function(data) {
                    setTimeout(function () {
                        //消息状态更新成功后刷新前一页面中的任务列表
                        refreshTaskList();
                    },1000);
                },
                error : function(data) {
                    if (data.msg) {
                        $.xljUtils.tip('red', data.msg);
                    } else {
                        $.xljUtils.tip('red', "调用改变消息状态的接口失败！");
                    }
                }
            });
        }
    };

    //初始化流程相关消息状态
    var initChangeInstanceStatus = function (instanceDataDef) {
        $.when(instanceDataDef).done(function (flowInstance) {
            if(flowInstance){
                //设置对应消息为已打开过状态(如果地址URL中有msgId)
                setMessageOpened();

                //待阅变已阅
                chnageStatusOfMsg('YY', 'DY',flowInstance.instanceId);
            }
        });
    };
    initChangeInstanceStatus(flowInstanceDataDef);

    //*******************************流程状态更改事件***************************************




    //**************************初始化流转日志********************************

    var initInstanceFlowLog = function (instanceDataDef) {
        $.when(instanceDataDef).done(function (flowInstance) {
            if(flowInstance){
                $('#instanceChart').attr('src',  'http://127.0.0.1:8081/platform-app/flow/runtime/approve/flow_chart.html?instanceId='+ flowInstance.instanceId);
            }
        });
    };

    //**************************初始化流转日志********************************




    //**************************初始化阅读日志********************************

    var resizeRecordLogGrid = function () {
        $('#readRecordGrid').jqGrid('setGridWidth',$("#flowContent").width()-3);
        $('#readRecordGrid').jqGrid('setGridHeight',$('#flowContent').height()-75, true);
    };

    var initReadRecordLog = function (instanceDataDef) {
      $.when(instanceDataDef).done(function (flowInstance) {
          var paramData = {fiId: flowInstance.instanceId};
          var url = serviceUrl + "flow/instanceReadRecord/queryList";
          if(sessionSign){
              url += '?_s='+sessionSign;
          }

          $('#readRecordGrid').jqGrid( {
              url : url,
              postData : paramData,
              datatype : "json",
              ajaxGridOptions : {
                  contentType : 'application/json;charset=utf-8'
              },
              mtype : "post",
              jsonReader : {
                  root : "result"
              },

              colModel : [
                  {name: 'id',label : 'ID', hidden: true},
                  {name: 'userName',label : '人员名称', align:"center" },
                  {name: 'postName',label : '岗位' , align:"center"},
                  {name: 'readDate',label : '时间' , align:"center"}
              ],
              //forceFit:true,                                      //当为ture时，调整列宽度不会改变表格的宽度。
              //width: '100%',
              //width: $("#flowContent").width()-3,
              //height:$('#flowContent').height()-75,
              rowNum : -1,                                        //在grid上显示记录条数，这个参数是要被传递到后台，-1代表不翻页
              hoverrows:false,                                    //禁止mouse hovering
              sortname : 'readDate',//初始化的时候排序的字段
              sortorder : "desc",//排序方式,可选desc,asc
              onRightClickRow:function(rowid,iRow,iCol,e){
                  $("#"+rowid).removeClass('ui-state-highlight');  //取消右键点击单元格后的背景色
              },
              loadComplete : function(xhr) {  //当从服务器返回响应时执行
                  //列头英文悬浮提示readRecordDiv
                  //addReadlogEnglishTip();
                  resizeRecordLogGrid();
                  $.xljUtils.addGridScroll();
              },
              loadError : function(xhr, status, error) {            //如果请求服务器失败则调用此方法
                  $.xljUtils.getError(xhr.status);
              }
          });
      });
    };

    //**************************初始化阅读日志********************************






    //****************页面自适应计算开始********************

    //初始化页面内容高度
    function initFlowContentSize() {
        $('#flowContent').height($(window).height() - $('.flow-content-title').height() - $('.flow-tab').height() - 102);
        $('#approveArea').height($(window).height() - $('.flow-content-title').height() - $('.flow-tab').height() - 102);
        $('#instanceChart').height($(window).height() - $('.flow-content-title').height() - $('.flow-tab').height() - 144);
        $('#instanceChart').parent('div.embed-responsive').height($(window).height() - $('.flow-content-title').height() - $('.flow-tab').height() - 144);

    }
    initFlowContentSize();

    $(window).on('resize', function () {
        initFlowContentSize();

        resizeRecordLogGrid();
    });

    //计算iframe高度自适应:供子页面调用
    window.resizeIframe = function () {
        //高度计算
        var b_height;
        if (document.bizForm) {
            b_height = $("#form-composer", document.bizForm.document.body).height();
        } else {
            // ff
            var iframeBody = document.getElementById('bizForm').contentDocument.body;
            b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);

        }

        //自适应设置
        if (document.bizForm) {
            // ie, chrome
            var b_iframe = document.getElementById("bizForm");
            if (!$.isEmptyObject(document.bizForm) && $(document.bizForm.document).find('#form-composer')) {
                //自定义表单自适应设置
                $(b_iframe).height(b_height);
                $(document.bizForm.document).find('#form-composer').width("100%")
            } else {
                $(b_iframe).height(b_height + 20);
            }
        } else {
            //ff
            var iframeBody = document.getElementById('bizForm').contentDocument.body;
            var $iframeBody = $(iframeBody).find('#form-composer');

            var b_iframe = document.getElementById("bizForm");
            $iframeBody.width("100%");
            if ($iframeBody) {
                //自定义表单自适应设置
                $(b_iframe).height(b_height);
            } else {
                $(b_iframe).height(b_height + 20);
            }
        }
    };

    //计算iframe高度自适应:供子页面调用
    window.resizeIframeTo = function () {
        var b_height;
        $("#bizForm").attr("scrolling", "no");
        if (document.bizForm) {
            b_height = Math.max(document.bizForm.document.body.scrollHeight, document.bizForm.document.body.clientHeight);
        } else {
            // ff
            var iframeBody = document.getElementById('bizForm').contentDocument.body;
            b_height = Math.max(iframeBody.scrollHeight, iframeBody.clientHeight);
        }
        var b_iframe = document.getElementById("bizForm");
        $(b_iframe).height(b_height + 20 + 50);
        $("#bizForm").css("width", "99.2%");
        $("#bizForm").css("margin", "0 5px 0 5px");
    };

    //定时刷新iframe内容高度
    var resizeBizFormHeight = function () {
        //定时检测iframe内容高度
        var intervalIndex = setInterval(function () {
            var iframeHeight = window.location.hash.slice(1);
            if(iframeHeight!=''&&iframeHeight.indexOf('flowTopHeight=')!=-1){
                iframeHeight = iframeHeight.replace('flowTopHeight=','');
                $('#bizForm').height(parseInt(iframeHeight));
                $('#bizForm').parent('div').height(parseInt(iframeHeight));
                //window.clearInterval(intervalIndex);
            }
        },100);

        //超时30秒清除定时任务
        setTimeout(function () {
            window.clearInterval(intervalIndex);
        },30000);
    };
    resizeBizFormHeight();

    //****************页面自适应计算结束********************
});
