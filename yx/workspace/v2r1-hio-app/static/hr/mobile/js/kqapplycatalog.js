/**
 *lixd
 * 移动端自助、考勤申请测试目录
 */
var tendId = $.xljUtils.getUrlParam("tendId");
if (tendId == undefined && tendId == null && tendId == '') {
    tendId = 'hio_tend045';//开发 王东宇
//  tendId='hio_tend023';//157 pan
}
var accessToken = $.xljUtils.getUrlParam("accessToken");
if (accessToken == undefined && accessToken == null && accessToken == '') {
    //156 pan
    // var accessToken='Bearer ad5042d3-4313-4007-b003-e927dd3e4407';
    //开发 王东宇
    // accessToken = 'Bearer 37ceea27-a8d8-47d3-9a87-b17761feeaa5';
    // accessToken = 'Bearer b38f9dd1-cf89-4d68-8f8b-614871c227b6';
    // accessToken = 'Bearer 6aec3281-1ce9-4b26-a347-2b552c80a387';
    accessToken = 'Bearer c5e197b5-a2dc-434c-bd4a-429af29e6d72';
}

$('#1').click(function () {
    window.location.href = "self/mobile_self_perInfo.html?tendId=" + tendId + "&accessToken=" + accessToken;
});
$('#2').click(function () {
    window.location.href = "self/mobile_self_team_info.html?tendId=" + tendId + "&accessToken=" + accessToken;
});
$('#3').click(function () {
    window.location.href = "kq_my_sign.html?tendId=" + tendId + "&accessToken=" + accessToken;
});
$('#4').click(function () {
    window.location.href = "self/mobile_self_team_kq.html?tendId=" + tendId + "&accessToken=" + accessToken;
});
$('#5').click(function () {
    window.location.href = "self/mobile_self_salary.html?tendId=" + tendId + "&accessToken=" + accessToken;
});
$('#6').click(function () {
    window.location.href = "self/mobile_self_team_xc.html?tendId=" + tendId + "&accessToken=" + accessToken;
});
$('#7').click(function () {
    window.location.href = "self/mobile_self_myCourse.html?tendId=" + tendId + "&accessToken=" + accessToken;
});
//考勤申请
var personId = $.xljUtils.getUrlParam("personId");
if (tendId == undefined || tendId == null || tendId != '') {
    personId = '1001';
}
$('#8').click(function () {
    window.location.href = "apply_for_leave.html?tendId=" + tendId + "&accessToken=" + accessToken + "&personId=" + personId + "&businessId=";
});
$('#9').click(function () {
    window.location.href = "apply_for_trip_edit.html?tripType=1&tendId=" + tendId + "&accessToken=" + accessToken + "&personId=" + personId + "&businessId=";
});
$('#10').click(function () {
    window.location.href = "apply_for_trip_edit.html?tripType=2&tendId=" + tendId + "&accessToken=" + accessToken + "&personId=" + personId + "&businessId=";
});
$('#11').click(function () {
    window.location.href = "not_clock_in_edit.html?tendId=" + tendId + "&accessToken=" + accessToken + "&personId=" + personId + "&businessId=";
});