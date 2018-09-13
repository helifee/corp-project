/**
 * 流程访问跳转至业务表单页面
 * Created by ciic on 2018/4/27.
 */
(function (window, document, undefined) {
    var personId, businessId, accessToken, tendId, device;
    window.addEventListener("load", function () {
        var formMode = getUrlParam("formMode"); //instance(新增、修改)   preview（只读）
        var bizType = getUrlParam("bizType"); //业务类型
        device = getUrlParam("device") || getDeviceType(); //跳转设备类型：pc、mobile
        personId = getUrlParam("personId"); //人员id
        accessToken = getUrlParam("accessToken");
        tendId = getUrlParam("tendId");
        businessId = getUrlParam("businessId"); //流程业务单据id

        var userInfo = getUserInfo();
        accessToken = encodeURI(userInfo.accessToken);
        tendId = userInfo.tendId;

        // 对目前的formMode进行规范，针对人事目前只能处理
        // 两个状态：instance/preview
        if (formMode == 'draft' || formMode == 'preview') {
            formMode = 'preview';
        } else {
            formMode = 'instance';
        }

        jumpTo(formMode, bizType, device, accessToken, tendId);
    });

    var getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        if (!window.location.search) return null;
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    };

    var designUrl = function (bizType, device) {
        return instanceUrl(bizType, device);
    };

    var instanceUrl = function (bizType, device) {
        switch (bizType) {
            case "YGZZ": //员工转正
                return "emp/emp_regular.html?personId=" + personId + "&businessId=" + businessId;

            case "RYLZ": //人员离职
                return "emp/emp_leavework.html?personId=" + personId + "&businessId=" + businessId;

            case "RYDD": //人员调动
                return "emp/emp_personChange.html?personId=" + personId + "&businessId=" + businessId;

            case "TDX": //调定新
                return "wage/wage_salary_adjustment.html?personId=" + personId + "&businessId=" + businessId;

            case "KQBDK": //补打卡
                return device == "pc"
                    ? "kq/kq_noPunchCard_add.html?personId=" + personId + "&businessId=" + businessId
                    : "mobile/not_clock_in_edit.html?personId=" + personId + "&businessId=" + businessId;

            case "KQQJ": //请假
                return device == "pc"
                    ? "kq/kq_rest_add.html?personId=" + personId + "&businessId=" + businessId
                    : "mobile/apply_for_leave.html?personId=" + personId + "&businessId=" + businessId;

            case "KQCC": //出差
                return device == "pc"
                    ? "kq/kq_buss_trip_add.html?personId=" + personId + "&tripType=1" + "&businessId=" + businessId
                    : "mobile/apply_for_trip_edit.html?personId=" + personId + "&tripType=1" + "&businessId=" + businessId;

            case "KQGC": //市内公出
                return device == "pc"
                    ? "kq/kq_buss_trip_add.html?personId=" + personId + "&tripType=2" + "&businessId=" + businessId
                    : "mobile/apply_for_trip_edit.html?personId=" + personId + "&tripType=2" + "&businessId=" + businessId;

            default:
                return "#";
        }
    };

    var previewUrl = function (bizType) {//只读
        // var businessId = "";
        switch (bizType) {
            case "YGZZ": //员工转正
                return "emp/emp_regular_read.html?businessId=" + businessId;

            case "RYLZ": //人员离职
                return "emp/emp_leavework_read.html?businessId=" + businessId;

            case "RYDD": //人员调动
                return "emp/emp_personChange_read.html?businessId=" + businessId;

            case "TDX": //调定新
                return "wage/wage_adjust_callback.html?businessId=" + businessId;

            case "KQBDK": //补打卡
                return device == "pc"
                    ? "kq/kq_noPunchCard_view.html?businessId=" + businessId
                    : "mobile/not_clock_in_edit_read.html?businessId=" + businessId;

            case "KQQJ": //请假
                return device == "pc"
                    ? "kq/kq_rest_view.html?businessId=" + businessId
                    : "mobile/apply_for_leave_read.html?businessId=" + businessId;

            case "KQCC": //出差
                return device == "pc"
                    ? "kq/kq_buss_trip_view.html?businessId=" + businessId + "&tripType=1"
                    : "mobile/apply_for_trip_edit_read.html?businessId=" + businessId + "&tripType=1";

            case "KQGC": //市内公出
                return device == "pc"
                    ? "kq/kq_buss_trip_view.html?businessId=" + businessId + "&tripType=2"
                    : "mobile/apply_for_trip_edit_read.html?businessId=" + businessId + "&tripType=2";

            default:
                return "#";
        }
    };

    var jumpTo = function (formMode, bizType, device, accessToken, tendId) {
        // 移动端不支持
        // var toUrl = eval(`${formMode}Url("${bizType}", "${device}")`);
        // toUrl = `${toUrl}&accessToken=${accessToken}&tendId=${tendId}`;
        var toUrl = eval(formMode + 'Url("' + bizType + '", "' +  device + '")');
        toUrl = [toUrl, '&accessToken=', accessToken, '&tendId=', tendId].join('');
        console.info('HR 跳板：', toUrl);
        toUrl ? (window.location.href = toUrl) : null;
    };

    var getUserInfo = function () {
        var deviceType = getDeviceType();
        if (deviceType == 'pc') {
            if (window && window.parent && window.parent.localStorage) {
                let loc = window.parent.localStorage;
                let tendId = JSON.parse(loc.userInfo).userInfo.defaultTendId;
                let accessToken = loc.authorization;
                return {accessToken, tendId};
            }

        } else if (deviceType == 'mobile') {
            if (window && window.parent && window.parent.sessionStorage) {
                let loc = window.parent.sessionStorage;
                let tendId = loc.tendId;
                let accessToken = loc.authorization;
                return {accessToken, tendId};
            }

        } else {
            return {accessToken: '', tendId: ''};
        }
    };

    var getDeviceType = function () {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            return 'mobile';

        } else if (/(Android)/i.test(navigator.userAgent)) {
            return 'mobile';
        } else {
            return 'pc';
        }
    }

})(window, document);
