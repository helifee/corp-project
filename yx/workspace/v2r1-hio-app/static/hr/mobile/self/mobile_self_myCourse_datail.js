/**
 * 移动端自助我的课程详细信息js
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
$(function () {
    var subjectId = $.xljUtils.getUrlParam("subjectId");
    getSubjectInfoBySubjectId(subjectId);
});
function getSubjectInfoBySubjectId(subjectId) {
    var condition = {};
    var urlBody = "ojt/hrOjtStudent/queryListByConditionByPage";
    var urlAll = hostUrl + urlBody;
    var personId = $("#personId").val();
    condition = {"subjectId": subjectId};
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(condition),
        success: function (data) {
            if (data.success == true) {
                var list = data.result.list;
                if(list!=null&&list.length>0){
                    var ojtStudentDto=list[0];
                    if(ojtStudentDto!=null){
                        var id=ojtStudentDto.id;
                        $('#id').val(id);
                        var personId=ojtStudentDto.personId;
                        $('#personId').val(personId);
                        var subjectId=ojtStudentDto.subjectId;
                        $('#subjectId').val(subjectId);
                        var subjectName=ojtStudentDto.subjectName;
                        $('#subjectName').val(subjectName);
                        var subjectTypeName=ojtStudentDto.subjectTypeName;
                        $('#subjectTypeName').val(subjectTypeName);
                        var startDate=ojtStudentDto.startDate;
                        $('#startDate').val(startDate);
                        var endDate=ojtStudentDto.endDate;
                        $('#endDate').val(endDate);
                        var times=ojtStudentDto.times;
                        $('#times').val(times);
                        var rate=ojtStudentDto.rate;
                        $('#rate').val(rate);
                        var rate=ojtStudentDto.rate;
                        //展示进度条
                        showProgressBar(rate);
                    }
                }
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: '服务异常,请联系管理员！'};
            $.weui.alert(options);
        }
    });
}
/**
 * 查询课件列表
 */
function goStudy() {
    var subjectId=$('#subjectId').val();
    window.location.href = "mobile_self_myCourse_list.html?id=" + subjectId;
}
/**
 * 显示进度条
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {string}
 */
function showProgressBar(cellvalue) {
    var rateDecimal = changeTwoDecimal_f(cellvalue) * 100;
    var rate = rateDecimal == false ? 0 : rateDecimal;
    var result = '' +
        '<div class="progress" style="width:100%">' +
        '<div class="progress-bar" role="progressbar" aria-valuenow="60" ' +
        'aria-valuemin="0" aria-valuemax="100" style="width: ' + rate + '%;">' +
        '<span class="sr-only">' + rate + '% 完成</span>' +
        '</div>' +
        '</div>';
    $('#rate').append(result);
}
/**
 *  强制转换为两位小数
 * @param x
 * @returns {*}
 */
function changeTwoDecimal_f(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        // console.log('function:changeTwoDecimal->parameter error 参数不是数字');
        return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}