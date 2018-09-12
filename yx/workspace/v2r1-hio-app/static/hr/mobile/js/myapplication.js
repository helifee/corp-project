/**
 * lixd
 * 我的考勤申请js
 */
//上来就执行
$(function () {
    var li_width = ($('.app_tag').width() - 3) / 4;
    $('.app_tag > li').width(li_width);
    //验证用户信息
    var msg = $.hrUtils.verifUserInfo();
    if(msg!=null&&msg.length>0){
        //禁用搜索按钮
        $('#search_input').attr("disabled","disabled");
        $('#search_btn').attr("disabled","disabled");
        alert(msg);
    }else {
        getAllRecords();
    }
});
/**
 * 获取查询参数
 * @param name
 * @returns {null}
 */
function getQueryString2(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 循环渲染加载leave列表
 * @param leaveType 迭代考勤的数据
 * @param startTime 开始时间的字段
 * @param endTime   结束时间的字段
 * @param state     状态的字段
 * @param title     标题
 * @param text      申请类型
 * @param id        主键的字段
 * @param element   元素类别
 */
function loopLeave(leaveType, startTime, endTime, state, title, text, id, element) {
    for (var i = 0; i < leaveType.length; i++) {
        var shortStart ="";
        if(leaveType[i][startTime]!=null&&leaveType[i][startTime].length>9){
            shortStart=leaveType[i][startTime].substring(0, 10);
        }else{
            shortStart=leaveType[i][startTime];
        }
        var shortEnd ="";
        if(leaveType[i][endTime]!=null&&leaveType[i][startTime].length>0){
            shortEnd=leaveType[i][endTime].substring(0, 10);
        }else{
            shortEnd=leaveType[i][endTime];
        }
        var div = $("<a href='javascript:;' class='leave_list'></a>");
        var childDiv01 = $('<div></div>');//标题行
        var childDiv02 = $('<div></div>');//状态、开始时间、结束时间
        childDiv01.append("<span id='ltype' style='display:none'>" + text + '</span>' + "<span class='font_strong list_title'>" + leaveType[i][title] + '</span>');
        if (leaveType[i][state] == APPLY_STATUS_DRAFT) {//草稿
            childDiv02.append("<span class='lv_state1'>" + "草稿" + '</span>' + '<span>' + shortStart + '</span>' + '<span>' + shortEnd + '</span>');
        } else if (leaveType[i][state] == APPLY_STATUS_INAPPROVAL) {//审批中
            childDiv02.append("<span class='lv_state2'>" + "审批中" + '</span>' + '<span>' + shortStart + '</span>' + '<span>' + shortEnd + '</span>');
        } else if (leaveType[i][state] == APPLY_STATUS_ENDAPPROVAL) {//已审批
            childDiv02.append("<span class='lv_state3'>" + "已审批" + '</span>' + '<span>' + shortStart + '</span>' + '<span>' + shortEnd + '</span>');
        } else {
            childDiv02.append("<span class='lv_state4'>" + "状态未知" + '</span>' + '<span>' + shortStart + '</span>' + '<span>' + shortEnd + '</span>');
        }
        div.append(childDiv01);
        div.append(childDiv02);
        //业务申请的主键
        div.append("<input type='hidden' id='record_id' value='" + leaveType[i][id] + "' type='" + leaveType[i][id] +"' status1='" + leaveType[i][state] + "' >");
        //申请单主键
        div.append("<input type='hidden' id='applyId' value='" + leaveType[i]["applyId"] + "' >");
        //流程实例id
        div.append("<input type='hidden' id='instanceId' value='" + leaveType[i]["instanceId"] + "' >");
        if (element) {
            element.append(div);
        }
    }
}

//获取所有数据
function getAllRecords() {
    $('#loadingToast').css('display', 'block');
    //当前用户信息
    var personDto = $.hrUtils.getHREmpInfo();
    if (personDto != null) {
        var personId = personDto.id;
        var title = $('#search_input').val() || '';
        var postData={};
        postData.personId=personId;
        postData.name=title;
        $.ajax({
            type: "post",
            url: hostUrl+"kq/hrKqRest/queryKqApplyInfo",
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (data) {
                if (data.success) {
                    if (data.result.length !== 0) {
                        var records = data.result;
                        var leave = records[0];
                        var trip = records[1];
                        var out = records[2];
                        var clock = records[3];
                        var leaveLength = leave.length;
                        if (leaveLength !== 0) {
                            var leave_ele = $('#leave');
                            leave_ele.empty();
                            loopLeave(leave, 'applyStartDate', 'applyEndDate', 'status', 'name', "请假", 'kqId', leave_ele);
                        }
                        else {
                            $('#leave').empty();
                            $('#leave').html('<div style="margin: 10px;">没有数据</div>');
                        }
                        var tripLength = trip.length;
                        if (tripLength !== 0) {
                            var trip_ele = $('#trip');
                            trip_ele.empty();
                            loopLeave(trip, 'applyStartDate', 'applyEndDate', 'status', 'name', "出差", 'kqId', trip_ele);
                        }
                        else {
                            $('#trip').empty();
                            $('#trip').html('<div style="margin: 10px;">没有数据</div>');
                        }
                        var outLength = out.length;
                        if (outLength !== 0) {
                            var out_ele = $('#cityout');
                            out_ele.empty();
                            loopLeave(out, 'applyStartDate', 'applyEndDate', 'status', 'name', "公出", 'kqId', out_ele);
                        } else {
                            $('#cityout').empty();
                            $('#cityout').html('<div style="margin: 10px;">没有数据</div>');
                        }
                        var clockLength = clock.length;
                        if (clockLength !== 0) {
                            var clock_ele = $('#notclock');
                            clock_ele.empty();
                            loopLeave(clock, 'notPunchDate', 'notPunchDate', 'status', 'name', "补签", 'kqId', clock_ele);
                        } else {
                            $('#notclock').empty();
                            $('#notclock').html('<div style="margin: 10px;">没有数据</div>');
                        }
                    } else {
                        $('#leave').empty();
                        $('#trip').empty();
                        $('#cityout').empty();
                        $('#notclock').empty();
                        location.reload();
                    }
                } else {
                    alert("数据出错！");
                }
                $('#loadingToast').css('display', 'none');
            },
            error: function (data) {
                alert(data + "连接数据库错误");
                $('#loadingToast').css('display', 'none');
            }
        });
    } else {
        alert("用户信息获取失败");
        $('#loadingToast').css('display', 'none');
    }

}
/**
 * 收索框失去焦点，触发查询
 */
$('#search_input').blur(function () {
    getAllRecords();
});
/**
 * 查询
 */
$('#search_btn').click(function () {
    setTimeout(function () {
        getAllRecords();
    }, 500);
});

//点击我的申请单项
// $('.leave_list').bind('click', function () {
// $('.leave_list').on('click',function() {
    $(document).on("click", ".leave_list", function() {
// $('.leave_list').live('click',function() {
// $('.leave_list').click(function () {
    var id = $(this).children('#record_id').val();//业务表主键
    var applyId = $(this).children('#applyId').val();//申请单id
    var instanceId = $(this).children('#instanceId').val();//流程实例id
    var state = $(this).children('#record_id').attr('status1');//状态代码
    var type = $(this).children('div')[0].firstChild.textContent;
    // var state = $(this).children('div')[1].firstChild.textContent;
    if (type == "请假" && (state == APPLY_STATUS_DRAFT)) {
        location.href = "apply_for_leave.html?type=update&restApplyId=" + id;
    }
    //查询审批的信息
    if (type == "请假" && (state != "" && state != APPLY_STATUS_DRAFT)) {
        location.href = hostUrl+"mobile/approve/approve_detail.html?instanceId="+instanceId+"&businessId="+applyId+"&appCode=HR";
    }
    if (type == "出差" && (state == APPLY_STATUS_DRAFT)) {
        location.href = "apply_for_trip_edit.html?type=update&tripType=1&bussApplyId=" + id;
    }
    if (type == "出差" && (state != "" && state != APPLY_STATUS_DRAFT)) {
        location.href = hostUrl+"mobile/approve/approve_detail.html?instanceId="+instanceId+"&businessId="+applyId+"&appCode=HR";
    }
    if (type == "公出" && (state == APPLY_STATUS_DRAFT)) {
        location.href = "apply_for_trip_edit.html?type=update&tripType=2&bussApplyId=" + id;
    }
    if (type == "公出" && (state != "" && state != APPLY_STATUS_DRAFT)) {
        location.href = hostUrl+"mobile/approve/approve_detail.html?instanceId="+instanceId+"&businessId="+applyId+"&appCode=HR";
    }
    if (type == "补签" && (state == APPLY_STATUS_DRAFT)) {
        location.href = "not_clock_in_edit.html?type=update&noPunchApplyId=" + id;
    }
    if (type == "补签" && (state != "" && state != APPLY_STATUS_DRAFT)) {
        location.href = hostUrl+"mobile/approve/approve_detail.html?instanceId="+instanceId+"&businessId="+applyId+"&appCode=HR";
    }
});
//点击各标签
$('#app_tab').find(".app_tag > li").bind('click', function () {
    //展示当前选中的申请类型
    //移除同胞元素的当前样式
    $(this).addClass('current').siblings().removeClass('current');
    var index = $(this).index();
    //根据索引，展示当前选中类型的申请
    $('#app_tab').find(".app_content > div").eq(index).show().siblings().hide();
});