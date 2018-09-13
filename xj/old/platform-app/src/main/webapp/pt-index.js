/**
 * Created by admin on 2017/8/11.
 */
$(function () {

    var breadcrumbContainer = $(window.parent.document.getElementById('breadcrumbContainer'));
    if(breadcrumbContainer[0]){
        /* var bread_h = 33;
         $(window.parent.document).find(".embed-responsive-4by3").height($(window).height() + bread_h);*/

        breadcrumbContainer.css("display","none");
        window.parent.computeIframeHeight();

        $(window).on('unload', function () {
            /*$(window.parent.document).find(".embed-responsive-4by3").height($(window).height() - bread_h-2);
             */
            breadcrumbContainer.css("display","block");
            window.parent.computeIframeHeight();
        });
    }

    $('#toApprove_A').on('show.bs.tab', function () {
        switchTaskTab('toApprove');
    });
    $('#toRead_A').on('show.bs.tab', function () {
        switchTaskTab('toRead');
    });
    $('#haveDone_A').on('show.bs.tab', function () {
        switchTaskTab('haveDone');
    });
    $('#myStart_A').on('show.bs.tab', function () {
        switchTaskTab('myStart');
    });
    $('#email_A').on('show.bs.tab', function () {
        $('#moreMsgListBtn').hide();
        getEmailInfo();
    });

    refreshMyTaskData();

    $('#email_A').dblclick(function () {
        window.open(hostUrl + 'outlook_mail.html');
    });

    /**
     * 获取流程模板列表
     */
    function getFlTemplateList() {
        $.ajax({
            url : hostUrl + "flow/fl/queryFlList",
            type:'POST',
            data:JSON.stringify({start:0,limit:10,status:'1',useStatus:true}),
            contentType: "application/json",
            dataType: "JSON",
            success:function (resultData) {
                if(resultData&&resultData.success){
                    var tbodyObj = $('<tbody></tbody>');
                    var templates = resultData.result.list;
                    for (var i = 0; i < templates.length; i++) {
                        var template = templates[i];
                        var name = template.name;
                        var code = template.code;
                        var version = template.version;
                        var objectName = template.businessObjectName;
                        var status = template.status;
                        status = status=='1'?'已发布':'未发布';
                        var isDefualt = template.isDefualt;
                        isDefualt = ((typeof isDefualt != 'undefined')&&isDefualt==true)?'是':'否';

                        var trObj = $('<tr></tr>');
                        trObj.append('<td title="'+name+'">'+name+'</td>');
                        trObj.append('<td title="'+code+'">'+code+'</td>');
                        trObj.append('<td title="'+version+'">'+version+'</td>');
                        trObj.append('<td title="'+objectName+'">'+objectName+'</td>');
                        trObj.append('<td title="'+status+'">'+status+'</td>');
                        trObj.append('<td title="'+isDefualt+'">'+isDefualt+'</td>');
                        tbodyObj.append(trObj);
                    }

                    $('#flowTempateList').append(tbodyObj);
                }
            }
        });

        $('#flowTempateList').parents('.fullWidth').find('.iconMore_bd').parent('a').attr('href',hostUrl + 'flow/editor/fl_list.html?_t='+new Date().getTime());
        $('#flowTempateList').parents('.fullWidth').find('.iconMore_bd').parent('a').on('click',function () {
            if(window.parent&&$.isFunction(window.parent.switchPro)){
                window.parent.switchPro('PT','LCPZ');
            }
        });
    }
    //109暂时不用
    //getFlTemplateList();

    /**
     * 获取用户列表
     */
    function getUserList() {
        $.ajax({
            //url: hostUrl + "sys/org/user/page",
            url: hostUrl + "sys/org/user/queryUserListByOrgIdForPortal",
            type: 'POST',
            //data: JSON.stringify({start: 0, limit: 10, status: '1', useStatus: true,sidx:'sort',sord:'ASC',hasPost:true}),
            data: JSON.stringify({start: 0, limit: 50,includelow:'0',orgId:'',hasPost:true}),
            contentType: "application/json",
            dataType: "JSON",
            success: function (resultData) {
                if (resultData && resultData.success) {
                    var tbodyObj = $('<tbody></tbody>');
                    //var users = resultData.result.list;
                    var users = resultData.result;
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        var name = user.realName;
                        var loginName = user.loginName;
                        var mobile = user.mobile;
                        var prefixName = user.prefixName;
                        var postName = user.postName;

                        var trObj = $('<tr></tr>');
                        trObj.append('<td title="'+name+'">' + name + '</td>');
                        trObj.append('<td title="'+loginName+'">' + loginName + '</td>');
                        trObj.append('<td title="'+mobile+'">' + (mobile?mobile:'') + '</td>');
                        trObj.append('<td title="'+postName+'">' + (postName?postName:'') + '</td>');
                        tbodyObj.append(trObj);
                    }

                    $('#userList').append(tbodyObj);
                }
            }
        });

        $('#userList').parents('.fullWidth').find('.iconMore_bd').parent('a').attr('href',hostUrl + 'sysManager/org/organization_list.html?_t='+new Date().getTime());
        $('#userList').parents('.fullWidth').find('.iconMore_bd').parent('a').on('click',function () {
            if(window.parent&&$.isFunction(window.parent.switchPro)){
                window.parent.switchPro('PT','JGYRY');
            }
        });
    }
    //109暂时不用
    //getUserList();

});

/**
 * 切换代办页签
 * @param tabType
 */
function switchTaskTab(tabType) {
    $('#moreMsgListBtn').show();

    var opType = '';
    //['DB','DY','YB','YY','FQ']
    if(tabType=='toApprove'){
        opType = 'DB';
    }else if(tabType=='toRead') {
        opType = 'DY';
    }else if(tabType=='haveDone') {
        opType = 'YB';
    }else if(tabType=='myStart') {
        opType = 'FQ';
    }

    var paramData = {
        start: 0,
        limit: 5,
        opType: opType
    };
    if (tabType == 'haveDone') {
        paramData.orderByField = 'deal_date';
    }
    $.ajax({ //发送更新的ajax请求
        type: "POST",
        url: hostUrl + "flow/sysNoticeMsg/querySysNoticeMsgByPage?_time="+new Date().getTime(),
        dataType: "JSON",
        data: JSON.stringify(paramData),
        contentType: 'application/json;charset=utf-8', //设置请求头信息
        success: function (data) {
            if (data.success) {
                var result = data.result;
                var total = result.total;
                var list = result.list;
                var ulObj = $('<ul></ul>');
                for (var i = 0; i < list.length; i++) {
                    var obj = list[i];
                    var hourSum = obj.hourSum;
                    var hourSumTxt = hourSum + "小时";
                    hourSumTxt = "停留" + hourSumTxt;
                    var url = obj.url;
                    if (tabType == 'toApprove') {
                        if (url && url.indexOf("http") == 0) {
                            url = url + "&time=" + Math.random();
                        } else {
                            url = hostUrl + url + "&_t=" + new Date().getTime();
                        }
                    } else if (tabType == 'toRead') {
                        if (url && url.indexOf("http") == 0) {
                            url = url + "&firstTime=YES&time=" + Math.random();
                        } else {
                            url = hostUrl + url + "&firstTime=YES&_t=" + new Date().getTime();
                        }
                    } else if (tabType == 'haveDone' || tabType == 'myStart') {
                        if (url && url.indexOf("http") == 0) {
                            url = url + "&action=view&time=" + Math.random();
                        } else {
                            url = hostUrl + url + "&action=view&_t=" + new Date().getTime();
                        }
                    }

                    var liObj = $('<li></li>');
                    var delaySpanObj = $('<span class="t_delay"></span>');
                    delaySpanObj.text(hourSumTxt);
                    delaySpanObj.attr('title', hourSumTxt);

                    var aObj = $('<a class="t_content" href="javaScript:void(0)" onclick="checkLogin(\''+url+'\')"></a>');
                    aObj.attr('title',$.xljUtils.htmlDecode( obj.title));
                    aObj.text($.xljUtils.htmlDecode(obj.title));

                    if ("DB" == opType || "DY" == opType) {
                        liObj.append(delaySpanObj);
                    }

                    liObj.append(aObj);

                    ulObj.append(liObj);

                }
                if (tabType == 'toApprove') {
                    $('#toApprove_A').text('待审(' + total + ')');
                    $('#moreMsgListBtn').attr('href', hostUrl + 'flow/runtime/mytask/task_list.html?dataType=DB');
                    $('#toApproveDataList').empty();
                    $('#toApproveDataList').append(ulObj.html());

                } else if (tabType == 'toRead') {
                    $('#toRead_A').text('待阅(' + total + ')');
                    $('#moreMsgListBtn').attr('href', hostUrl + 'flow/runtime/mytask/task_list.html?dataType=DY');
                    $('#toReadDataList').empty();
                    $('#toReadDataList').append(ulObj.html());
                } else if (tabType == 'haveDone') {
                    $('#moreMsgListBtn').attr('href', hostUrl + 'flow/runtime/mytask/task_list.html?dataType=HAVE_DONE');
                    $('#haveDoneDataList').empty();
                    $('#haveDoneDataList').append(ulObj.html());
                } else if (tabType == 'myStart') {
                    $('#moreMsgListBtn').attr('href', hostUrl + 'flow/runtime/mytask/task_list.html?dataType=FQ');
                    $('#myStartDataList').empty();
                    $('#myStartDataList').append(ulObj.html());
                }

                //默认选择的tab更多链接
                var taskTabId = $('#flowTask').find('li.active a').attr("id");
                if (taskTabId == 'toApprove_A') {
                    $('#moreMsgListBtn').attr('href', hostUrl + 'flow/runtime/mytask/task_list.html?dataType=DB');
                } else if (taskTabId == 'toRead_A') {
                    $('#moreMsgListBtn').attr('href', hostUrl + 'flow/runtime/mytask/task_list.html?dataType=DY');
                } else if (taskTabId == 'haveDone_A') {
                    $('#moreMsgListBtn').attr('href', hostUrl + 'flow/runtime/mytask/task_list.html?dataType=HAVE_DONE');
                } else if (taskTabId == 'myStart_A') {
                    $('#moreMsgListBtn').attr('href', hostUrl + 'flow/runtime/mytask/task_list.html?dataType=FQ');
                } else if(taskTabId == 'email_A'){
                    $('#moreMsgListBtn').hide();
                }
            }
        },
        error: function (data) {
            if (data.msg) {
                $.xljUtils.tip('red', data.msg);
            } else {
                $.xljUtils.tip('red', "查询任务列表数据失败！");
            }
        }
    });
}

function checkLogin(url){
    var flag = true;
    $.ajax({
        type: 'GET',
        url: hostUrl + 'sys/thirdPartyAuthentication/checkLogin?_time='+new Date().getTime(),
        dataType:'JSON',
        async:false,
        success: function (resultData) {
            flag = resultData.success;
        },
        error:function (xhr) {
            flag = false;
        }
    });
    if(!flag){
        return window.open('/platform-app/login.html?_time='+new Date().getTime(),'','');
    }
    if(url.indexOf('casUrlLogin')>-1){
        return window.open(url,'','');
    }else{
        return window.open(encodeURI(url),'','');
    }
}
/**
 * 获取邮箱列表
 */
function getEmailInfo() {
    $.ajax({
        type: 'GET',
        url: hostUrl + 'flow/sysNoticeMsg/getUserEmail?_time=' + new Date().getTime(),
        dataType: 'JSON',
        success: function (resultData) {
            if (resultData.success) {

                $('#myEmailList').empty();
                var emailMap = resultData.result;
                var unReadCount = emailMap.unReadCount;
                $('#email_A').text('邮箱(' + unReadCount + ')');

                var emailList = emailMap.emailInfoList;
                var outlook = hostUrl + 'outlook_mail.html';
                var ulObj = $('<ul></ul>');
                for (var i = 0; i < emailList.length; i++) {
                    var liObj = $('<li></li>');
                    var titleSpan = $('<a href="' + outlook + '" target="_blank" class=" email_title "></a>');
                    titleSpan.text(emailList[i].emailSubject);
                    titleSpan.attr('title', emailList[i].emailSubject);

                    var sendUserSpan = $('<span class="email_author"></span>');
                    sendUserSpan.text(emailList[i].sendUser);
                    sendUserSpan.attr('title', emailList[i].sendUser);

                    var sendTimeSpan = $('<span class="email_time"></span>');
                    sendTimeSpan.text(emailList[i].emailSendTime);
                    sendTimeSpan.attr('title', emailList[i].emailSendTime);

                    liObj.append(sendTimeSpan);
                    liObj.append(sendUserSpan);
                    liObj.append(titleSpan);
                    ulObj.append(liObj);
                }
                $('#myEmailList').append(ulObj.html());
                $('#myEmailList').find('li').each(function (i, liObj) {
                    $(liObj).find('a').css({width: ($(liObj).width() - 158) + 'px'});
                });
            }
        },
        error: function (xhr) {
            //console.info(xhr);
        }
    });
}

//刷新待办列表
function refreshMyTaskData() {
    switchTaskTab('toApprove');
    switchTaskTab('toRead');
    switchTaskTab('haveDone');
    switchTaskTab('myStart');
    getEmailInfo();
}
