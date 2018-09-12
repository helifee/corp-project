/**
 * 移动端自助我的课程中课程的课件列表js
 * lixd
 */
$.weui = {};
$.weui.alert = function (options) {
    options = $.extend({title: '警告', text: '警告内容'}, options);
    var $alert = $('.weui_dialog_alert');
    $alert.find('.weui_dialog_title').text(options.title);
    $alert.find('.weui_dialog_bd').text(options.text);
    $alert.on('touchend click', '.weui_btn_dialog', function () {
        $alert.hide();
    });
    $alert.show();
};
var subjectId;//课程id
$(function () {
    subjectId= $.xljUtils.getUrlParam("id");
    initPersonId();
    initCourList();
});
/**
 *  获取当前登录用户的ID
 */
function initPersonId() {
    var personInfoDto = $.hrUtils.getHREmpInfo();
    if (personInfoDto != null) {
        var personId = personInfoDto.id;
        var personName = personInfoDto.name;
        $("#personId").val(personId);
        $("#personName").html(personName);
    }
}

/**
 *  初始化课件列表
 */
function initCourList() {
    var personId = $("#personId").val();
    var url = "ojt/hrOjtCourseware/queryStudyList";
    $.ajax({
        type: "POST",
        url: hostUrl + url,
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify({subjectId: subjectId, personId: personId}),
        success: function (data) {
            var result = data.result;
            if (result == null || result.length == 0) {
                return;
            }
            $("#courList").find("ul").empty();
            for (var i = 0; i < result.length; i++) {
                var html = '';
                html += '' +
                    '<li><div style="border: 1px dashed #acd7ff;margin: 20px;padding: 10px;line-height: 25px"> ' +
                    '<a href="#" style="color:blue;font-weight:bold;font-style:normal;text-decoration: underline' +
                    '"onclick="clickCourName(this)"> ' +
                    '<span name="' + result[i].id + '">' + result[i].name + '</span> ' +
                    '<input type="hidden" name="remark" value="' + result[i].remark + '"/> ' +
                    '<input type="hidden" name="studyId" value="' + result[i].studyId + '"/> ' +
                    '<input type="hidden" name="nowTime" value="' + result[i].nowTime + '"/> ' +
                    '<input type="hidden" name="totalTime" value="' + result[i].totalTime + '"/> ' +
                    '<input type="hidden" name="playTimes" value="' + result[i].playTimes + '"/> ' +
                    '<input type="hidden" name="note" value="' + result[i].note + '"/> ' +
                    '</a> ';
                if (result[i].playTimes == undefined || result[i].playTimes == '' || result[i].playTimes == 0) {
                    html += '<br/><span>已播放0次</span> ';
                    html += '<br/><span>学习状态：未学</span> ';
                } else {
                    html += '<br/><span>已播放' + result[i].playTimes + '次</span> ';// Math.ceil(
                    html += '<br/><span>时  长：' + result[i].time + '&nbsp;&nbsp;&nbsp;&nbsp;已学时长：' + Math.ceil(result[i].totalTime / 60) + '分钟</span> ';
                }
                html += '</div></li>';
                $("#courList").find("ul").append(html);
            }
        }
    });
}
/**
 * 查看视频
 * @param e
 */
function clickCourName(e) {
    //选中的课件id
    var nowPlayingCourId = $(e).find("span").attr("name");
    window.location.href = "mobile_self_myCourse_view.html?businessId=" + nowPlayingCourId+"&id="+subjectId;
}