/**
 * 考勤出差申请
 */
var bussApplyTypeList;//出差类型
var bussTripWayList;//出行方式
var bussApplyId;//出差申请id
var applyId;//系统申请表单据id
var bussTypeList = {};//出差类型列表
(function ($, window, document, undefined) {
    $(function () {
        resizeHeight();
        pageInit();
        businessId = $.xljUtils.getUrlParam("businessId");
        personId = $.xljUtils.getUrlParam("personId");
        $("#personId").val(personId);
        $("#businessId").val(businessId);

        if (businessId == undefined || businessId == '' || businessId == null) {
            $('title').text("出差申请-新增");
            $(".xj-form-title").text("出差申请-新增");
            $("#saveBtn").show();
            $("#applyBtn").show();
            $("#destroyStatus").val("1081100727");//默认未销
        } else {
            $('title').text("出差申请-修改");
            $(".xj-form-title").text("出差申请-修改");
            getKqBussInfoById(businessId);
        }
        resizeGrid();
    });

    function pageInit() {
        // attachmentInit();
        // queryTripWayList();
        queryBussTypeList();
        initDatetimepicker();
    }

    function openNewWindow(src) {
        window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
    }

    window.closeWindow = function () {
        var id = $('bussTripId').val();
        refreshParent(id);
        window.close();
    };

//计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //右侧table
        $(".con-table .mytable").height((w_h - 180) / 3 + "px");
        //xj-main-grid grid-container
    }

//计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }

//grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    /**
     * 清空人员
     */
    window.emptyPerson = function () {
        $("#applicantName").val("");
        $("#applicant").val("");
        $("#deptName").val("");
        $("#companyId").val("");
        $("#companyName").val("");
        $("#deptId").empty();
    };

    function checkIfDuplicate() {
        var duplicateFlag = false;
        var applyStartDate = $("#applyStartDate").val();
        var applyEndDate = $("#applyEndDate").val();
        var applyEndTime = $("#applyEndTime").val();
        var applyStartTime = $("#applyStartTime").val();
        var personId = $("#personId").val();
        var bussId = $("#id").val();
        applyStartDate = applyStartDate + " " + applyStartTime;
        applyEndDate = applyEndDate + " " + applyEndTime;
        //出发到达地点的处理
        var s_province_s = $("#s_province_s").val();//出发省
        var s_city_s = $("#s_city_s").val();//出发市
        var s_province_e = $("#s_province_e").val();//到达省
        var s_city_e = $("#s_city_e").val();//到达市
        if (s_province_s == "省份") {
            pop_tip_open("red", "请选择出发省份");
            return;
        }
        if (s_city_s == "地级市") {
            pop_tip_open("red", "请选择出发城市");
            return;
        }
        if (s_province_e == "省份") {
            pop_tip_open("red", "请选择到达省份");
            return;
        }
        if (s_city_e == "地级市") {
            pop_tip_open("red", "请选择到达城市");
            return;
        }
        queryRestDuplicateList(applyStartDate, applyEndDate, personId,bussId);
        var conditionMap = {};
        if (businessId == undefined || businessId == '' || businessId == null) {
            conditionMap = {
                "applyStartDate": applyStartDate,
                "applyEndDate": applyEndDate,
                "personId": $("#personId").val()
            };
        } else {
            conditionMap = {
                "applyStartDate": applyStartDate,
                "applyEndDate": applyEndDate,
                "personId": $("#personId").val(),
                "update": "update",
                "id": bussId
            };
        }
        $.ajax({
            url: hostUrl + "kq/hrKqBussTrip/queryDuplicateList",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(conditionMap),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    // duplicateResult = data.result;
                    if (count == false) {
                        pop_tip_open("red", "当前时间段已有请假申请记录，不允许申请出差！");
                        duplicateFlag = false;
                    } else if (result.length > 0) {
                        pop_tip_open("red", "当前时间段已有出差记录，请重新选择开始结束日期！");
                        duplicateFlag = false;
                    } else {
                        duplicateFlag = true;
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
        return duplicateFlag;
    }


    var count = true;

    function queryRestDuplicateList(applyStartDate, applyEndDate, personId,bussId) {
        $.ajax({
            url: hostUrl + "kq/hrKqRest/queryDuplicateList",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({
                "applyStartDate": applyStartDate,
                "applyEndDate": applyEndDate,
                "personId": personId,
                "update":"update",
                "id",bussId
            }),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    count = result.length <= 0;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    /**
     * 查询出差类型
     */
    function queryBussTypeList() {
        var bussType = $.xljUtils.getUrlParam("tripType");
        if (bussType == '1') {//出差
            bussType = "01";
        } else if (bussType == '2') {//公出
            bussType = "02";
        }
        $.ajax({
            url: hostUrl + "kq/hrKqBusstypeSetting/queryListByCondition",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"status": "1092100169", "bussType": bussType}),//只查询启用状态的出差类型
            success: function (data) {
                if (data.success) {
                    bussApplyTypeList = data.result;
                    var selTypeObj = $("#tripType");

                    for (i in bussApplyTypeList) {
                        var typeId = bussApplyTypeList[i].id;
                        var typeName = bussApplyTypeList[i].name;
                        bussTypeList[typeId] = bussApplyTypeList[i];
                        // if (typeId != '1079100142') {
                        selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                        // }
                    }
                    $("#tripType option:first").prop("selected", 'selected');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    /**
     * 查询出行方式列表
     */
    function queryTripWayList() {
        $.ajax({
            url: hostUrl + "kq/hrKqBussTrip/queryTripWayList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: "{}",
            success: function (data) {
                if (data.success) {
                    bussTripWayList = data.result;
                    var selTypeObj = $("#tripWay");

                    for (i in bussTripWayList) {
                        var typeId = bussTripWayList[i].sid;
                        var typeName = bussTripWayList[i].name;
                        selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    /**
     * 初始化单据信息
     */
    function initUuidDocuments() {
        var uBody = "generator/getGuuid" + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#sysApplyFrom").find("input[name='id']").val(guuid);
                $("#bussApplyFrom").find("input[name='applyId']").val(guuid);
            }
        });

        //初始化申请单编号
        var applyCode = $.hrUtils.getApplyCodeByType('kqBussTrip');
        $("#code").val(applyCode);//申请日期
        var sysDate = new Date().format("yyyy-MM-dd");
        $("#applyDate").val(sysDate);//申请日期
        $("#destroyStatus").val("1081100147");//销出差申请状态：未申请
        $("#approvalStatus").val($.hrUtils.APPLY_DRAFT);//草稿
        $("#bussApplyFrom").find("input[name='type']").val("1068100138");//出差申请
        $("#applicant").val("1234");
        $("#applicantName").val("张三");
        $("#deptId").val("004a940dbcd54cafa13e3447b38e7e54");
        $("#deptName").val("EHR事业部");
    }

    /**
     * 初始化附件
     * @param businessId 业务单据id
     */
    window.initAttach = function (businessId) {
        $('.attachment-container').xljAttachment({
            appId: "HR",		//系统id
            businessId: businessId,//业务表单id
            categoryId: ATTACH_TYPE_KQCC,//附件分类
            mode: "add",
            //singleUpload:true,	//单个上传
            singleUpload: false,	//多个上传
            autoSubmit: false,
            fromTempTable: false,
            serverAddr: ATTACH_SERVERADDR	//附件服务器地址
        });
    };

    /**
     * 修改附件
     * @param businessId 业务单据id
     */
    window.editAttach = function (businessId) {
        $('.attachment-container').xljAttachment({
            appId: 'HR',
            businessId: businessId,
            categoryId: ATTACH_TYPE_KQCC,
            mode: 'edit',
            serverAddr: ATTACH_SERVERADDR
        });
    };


    function saveDocumentsForm(sign) {
        if (sign == 0) {
            //单据信息
            addSaveDocumentsForm();
        } else if (sign == 1) {
            //单据信息
            updateDocumentsForm(applyId);
        }
    }

    /**
     *根据id查询出差申请信息
     */
    function getKqBussInfoById(id) {
        var bussType = $.xljUtils.getUrlParam("tripType");
        var param = {};
        param.businessId = id;
        if (2 == bussType) {
            param.ifPublicType = "true";
        }
        $.ajax({
            url: hostUrl + "kq/hrKqBussTrip/queryApplyList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(param),
            success: function (data) {
                if (data.success) {
                    var result = data.result.list;
                    $('#bussTripId').val(id);//赋值出差表id
                    //出差信息回显校验优化
                    if (result != null && result.length > 0) {
                        $("#topicName").val(result[0].topicName);
                        $("#phone").val(result[0].phone);
                        var approvalStatusValue = result[0].approvalStatusValue;
                        var approvalStatus = result[0].approvalStatus;
                        $("#approvalStatus").val(approvalStatus);
                        $("#approvalStatusValue").val(approvalStatusValue);
                        $("#id").val(result[0].id);//添加id赋值用来 过滤此表单的已有出差记录的校验  add by tangsq since 20180611
                        $("#personId").val(result[0].personId);
                        $("#personName").val(result[0].personName);
                        $("#applicant").val(result[0].personId);
                        $("#applicantName").val(result[0].personName);

                        var tripType = result[0].tripType;
                        var tripWay = result[0].tripWay;
                        $("#tripWay").val(tripWay);
                        $("#applyTripDays").val(result[0].applyTripDays);
                        var applyStartDate = result[0].applyStartDate;
                        var applyEndDate = result[0].applyEndDate;

                        if (applyStartDate != null && applyStartDate != "") {
                            var applyStartDate2 = new Date(changeTimeStyle(applyStartDate));
                            if (applyStartDate2 != null && applyStartDate2 != "") {
                                $("#applyStartDate").val(applyStartDate2.format("yyyy-MM-dd"));
                            }
                        }

                        if (applyEndDate != null && applyEndDate != "") {
                            var applyEndDate2 = new Date(changeTimeStyle(applyEndDate));
                            if (applyEndDate2 != null && applyEndDate2 != "") {
                                $("#applyEndDate").val(applyEndDate2.format("yyyy-MM-dd"));
                            }
                        }
                        if (applyStartDate != null && applyStartDate != "") {
                            $("#applyStartTime option[value='" + applyStartDate.substring(11, 16) + "']").attr("selected", true);
                        }
                        if (applyStartDate != null && applyStartDate != "") {
                            $("#applyEndTime option[value='" + applyEndDate.substring(11, 16) + "']").attr("selected", true);
                        }
                        $("#tripType option[value='" + tripType + "']").attr("selected", true);
                        // $("#tripWay option[value='" + tripWay + "']").attr("selected", true);

                        $("#destroyStatus").val(result[0].destroyStatus);

                        $("#reason").val(result[0].reason);

                        $("#location").val(result[0].location);
                        $("#destination").val(result[0].destination);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    function initDatetimepicker() {
        //年月日
        var picker = $('.datetimepicker2').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });
    }

//针对IE进行时间转换
    function changeTimeStyle(bTime) {
        if (bTime == null || bTime == "") {
            return "";
        }
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
        var later = new Date(bTime);
        return later;
    }


    function getDateDiff(date1, date2) {
        var sArr = date1.replace(/-/g, "/");
        var eArr = date2.replace(/-/g, "/");
        var sRDate = new Date(sArr);
        var eRDate = new Date(eArr);
        var days = eRDate.getTime() - sRDate.getTime();
        var result = parseInt(days / (24 * 60 * 60 * 1000));
        // return Math.abs(result);
        return Math.abs(result);
    }

    /**
     * 判断一个数是否包含在一个数组内
     */
    function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }


    /**
     * 计算出差天数
     */
    window.getBussDays = function () {
        var tripType = $("#tripType").val();
        if (tripType === null || tripType === "" || tripType == undefined) {
            pop_tip_open("red", "出差类型不能为空！");
            return;
        }
        var tripTypeText = $("#tripType").find("option:selected").text();
        var bussTypeDto = bussTypeList[tripType];
        var calculateRule = bussTypeDto.calculateRule;//1088100158  工作日  1088100159 自然日

        var days = 0;
        if (calculateRule == "1088100158") {
            days = calculateWorkDays();
        } else if (calculateRule == "1088100159") {
            days = calculateNatureDays();
        }
        var applyEndTime = $("#applyEndTime").val();
        var applyStartTime = $("#applyStartTime").val();
        var applyEndDate = $("#applyEndDate").val();
        var applyStartDate = $("#applyStartDate").val();

        if (new Date(applyStartDate.replace(/-/g, '/')).getTime() > new Date(applyEndDate.replace(/-/g, '/')).getTime()) {
            $("#applyEndDate").val(null);
            $("#applyStartDate").val(null);
            pop_tip_open("red", "开始时间不能大于结束时间！");
            return;
        }

        applyEndDate = applyEndDate + " " + applyEndTime;
        applyStartDate = applyStartDate + " " + applyStartTime;
        applyStartDate = new Date(applyStartDate.replace(/-/g, '/')).getTime();
        applyEndDate = new Date(applyEndDate.replace(/-/g, '/')).getTime();
        if (applyStartDate > applyEndDate) {
            var start = document.getElementById("applyStartTime");
            start.options[0].selected = true;//默认选中第一个

            var end = document.getElementById("applyEndTime");
            end.options[0].selected = true;//默认选中第一个

            pop_tip_open("red", "开始时间不能大于结束时间！");
            return;
        }
        $("#applyTripDays").val(days);
    };

    /**
     * 自然日计算出差天数
     * @return {number}
     */
    function calculateNatureDays() {
        var startDate = $("#applyStartDate").val();
        var endDate = $("#applyEndDate").val();
        var applyStartTime = $("#applyStartTime").val();
        var applyEndTime = $("#applyEndTime").val();

        var days = 0;
        if (startDate != null && startDate != "" && endDate != null && endDate != "") {
            days = getDateDiff(startDate, endDate) + 1;
        }
        if ((applyStartTime == "09:00" && applyEndTime == "12:00") || (applyStartTime == "13:30" && applyEndTime == "18:00")) {//请半天
            days = days - 0.5;
            if (days < 0) {
                days = 0;
            }
        } else if (applyStartTime == "13:30" && applyEndTime == "12:00") {
            days = days - 1;
            if (days < 0) {
                days = 0;
            }
        }
        return days;
    }


    /**
     * 工作日计算出差天数
     * @return {number}
     */
    function calculateWorkDays() {
        var days = 0;
        var personId = $("#personId").val();
        var startDate = $("#applyStartDate").val();
        var endDate = $("#applyEndDate").val();
        var applyStartTime = $("#applyStartTime").val();
        var applyEndTime = $("#applyEndTime").val();

        if (personId !== null && personId !== "" && isNaN(startDate) && isNaN(endDate)) {
            if (startDate > endDate) {
                pop_tip_open("red", "开始时间不能大于结束时间！");
                $("#applyStartDate").val("");
                $("#applyEndDate").val("");
                return;
            }
            days = getWorkDays(personId, startDate, endDate, applyStartTime, applyEndTime);
        }
        return days;
    }

    /**
     *工作日计算出差天数
     */
    function getWorkDays(personId, startDate, endDate, applyStartTime, applyEndTime) {
        var sum = 0;
        var urlBody = "kq/hrKqPbManage/queryWorkDays";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({
                "personId": personId,
                "startDate": startDate,
                "endDate": endDate,
                "applyStartTime": applyStartTime,
                "applyEndTime": applyEndTime
            }),
            success: function (data) {
                if (data.success == true) {
                    var msg = "";
                    var result = data.result;
                    if (result != undefined && result != null) {
                        var resultList = result["list"];
                        sum = result["sum"];
                        var ifPlanSet = result["ifPlanSet"];
                        if (ifPlanSet == false) {
                            msg = "请先设置考勤方案!";
                            pop_tip_open("red", msg);
                            sum = 0;
                            $("#applyStartDate").val("");
                            $("#applyEndDate").val("");
                            return;
                        }
                        if (!contains(resultList, startDate.substring(0, 10))) {
                            msg = "开始时间不是工作日，请重新选择!";
                            pop_tip_open("red", "开始时间不是工作日，请重新选择!");
                            sum = 0;
                            $("#applyStartDate").val("");
                            return;
                        }
                        if (!contains(resultList, endDate.substring(0, 10))) {
                            msg = "结束时间不是工作日，请重新选择!";
                            pop_tip_open("red", "结束时间不是工作日，请重新选择!");
                            sum = 0;
                            $("#applyEndDate").val("");

                        }
                        // $("#applyRestDays").val(sum);
                    }
                } else {
                    pop_tip_open("red", data.message);
                    // $("#applyRestDays").val(0);
                    sum = 0;
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
        return sum;
    }

    /**
     * 校验
     * @returns {*}
     */
    window.check = function () {
        var passFlag = false;//是否校验成功并成功保存（用于发起审批时首先保存数据）：true为通过 false为不通过
        //这个校验如果通过了就会直接提交
        // $("#sysApplyFrom").attr("data-validate-success", "");
        // $("#bussApplyFrom").attr("data-validate-success", "");
        // $("#sysApplyFrom").submit();
        // $("#bussApplyFrom").submit();
        //改为主动触发校验
        $.xljUtils.customSingleValidate("#sysApplyFrom");
        var validRet = $("#sysApplyFrom").valid();
        //如果校验没有通过
        if (!validRet) {
            return validRet;
        }
        var flag = $("td").hasClass("has-error");
        var duplicateFlag;
        if (flag == false) {
            duplicateFlag = checkIfDuplicate();
        }
        if (duplicateFlag != null && (duplicateFlag == "true" || duplicateFlag == true)) {//不重复，校验通过
            if (flag == false) {

                passFlag = true;
            }
        }
        return passFlag;
    }

})(jQuery, window, document);