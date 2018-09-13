var bussApplyTypeList;//出差类型
var bussTripWayList;//出行方式
var bussApplyId;//出差申请id
var applyId;//系统申请表单据id
var myKqFlag;//是否来自我的考勤（true 是）
(function ($, window, document, undefined) {
    var type;
    $(function () {
        resizeHeight();
        pageInit();
        myKqFlag = $.xljUtils.getUrlParam("myKqFlag");
        if (myKqFlag == "true" || myKqFlag == true) {
            $("#selectApplicant1").hide();
            $("#selectApplicant2").hide();
        } else {
            $("#selectApplicant1").show();
            $("#selectApplicant2").show();
        }
        type = $.xljUtils.getUrlParam("type");
        if (type == 'add') {
            $('title').text("市内公出申请-新增");
            $(".xj-form-title").text("市内公出申请-新增");
            $("#saveBtn").show();
            $("#applyBtn").show();
            // initUuidDocuments();
            // //********本地测试使用数据****开始
            // $("#applicant").val("1234");
            // $("#applicantName").val("张三");
            // $("#deptId").val("004a940dbcd54cafa13e3447b38e7e54");
            // $("#deptName").val("EHR事业部");
            // //********本地测试使用数据****结束
            initSysApply();
            initUuidBussApply();
        } else if (type = 'update') {
            $('title').text("市内公出申请-修改");
            $(".xj-form-title").text("市内公出申请-修改");
            bussApplyId = window.opener.bussApplyId;
            getKqBussInfoById(bussApplyId);

        }

        $("#saveBtn").on('click', function () {
            beforeSave();
            /* if (type == "add") {
             beforeSave();
             } else if (type == "update") {
             $("#sysApplyFrom").attr("data-validate-success", "");
             $("#bussApplyFrom").attr("data-validate-success", "");
             $("#sysApplyFrom").submit();
             $("#bussApplyFrom").submit();

             var flag = $("td").hasClass("has-error");
             if (flag == false) {
             //提交附件
             $('.attachment-container').xljAttachmentSubmit();
             saveDocumentsForm(1);
             saveApplyForm(1);
             }
             }*/
        });
        //发起审批
        $("#applyBtn").unbind('click').on('click', function () {
            var applyId = $('#id').val();//业务申请单的id
            var passFlag = beforeSave(true);
            if (passFlag == true) {
                toApplyByObjectCode(BOCODE_KQCC, applyId);
                // applyTest(BOCODE_KQCC, applyId);
            }
        });

        /*   //申请
         $("#applyBtn").unbind('click').on('click', function () {
         //发起申请
         var applyId = $("#bussApplyFrom").find("input[name='applyId']").val();//业务申请单的id
         toApplyByObjectCode(BOCODE_KQWDK, applyId);
         });*/
        resizeGrid();
    });

    function pageInit() {
        attachmentInit();
        queryTripWayList();
        // queryRestApplyTypeList();
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
        queryRestDuplicateList(applyStartDate, applyEndDate, personId);
        var conditionMap = {};
        if (type == 'add') {
            conditionMap = {
                "applyStartDate": applyStartDate,
                "applyEndDate": applyEndDate,
                "personId": $("#personId").val()
            };
        } else if (type = 'update') {
            conditionMap = {
                "applyStartDate": applyStartDate,
                "applyEndDate": applyEndDate,
                "personId": $("#personId").val(),
                "update": "update",
                "id": bussApplyId
            };
        }
        $.ajax({
            url: serviceUrl + "kq/hrKqBussTrip/queryDuplicateList",
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

    /**
     * 保存之前先校验
     */
    function beforeSave(applyFlag) {
        var passFlag = false;//是否校验成功并成功保存（用于发起审批时首先保存数据）：true为通过 false为不通过
        var duplicateFlag = checkIfDuplicate();
        if (duplicateFlag != null && ( duplicateFlag == "true" || duplicateFlag == true)) {//不重复，校验通过
            $("#sysApplyFrom").attr("data-validate-success", "");
            //$("#bussApplyFrom").attr("data-validate-success", "");
            $("#sysApplyFrom").submit();
            //$("#bussApplyFrom").submit();
            var flag = $("td").hasClass("has-error");
            if (flag == false) {
                //提交附件
                $('.attachment-container').xljAttachmentSubmit();
                /*  saveDocumentsForm(0);
                 saveApplyForm(0);*/
                if (type == 'add') {
                    saveDocumentsForm(0);
                    saveApplyForm(0, applyFlag);
                } else if (type = 'update') {
                    saveDocumentsForm(1);
                    saveApplyForm(1, applyFlag);
                }
                passFlag = true;
            }
        }
        return passFlag;
    }

    var count = true;

    function queryRestDuplicateList(applyStartDate, applyEndDate, personId) {
        $.ajax({
            url: serviceUrl + "kq/hrKqRest/queryDuplicateList",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({
                "applyStartDate": applyStartDate,
                "applyEndDate": applyEndDate,
                "personId": personId
            }),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    if (result.length > 0) {
                        count = false;
                    } else {
                        count = true;
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    /**
     * 查询出差类型列表
     */
    function queryRestApplyTypeList() {
        $.ajax({
            url: serviceUrl + "kq/hrKqBussTrip/queryBussApplyTypeList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: "{}",
            success: function (data) {
                if (data.success) {
                    bussApplyTypeList = data.result;
                    var selTypeObj = $("#tripType");
                    for (i in bussApplyTypeList) {
                        var typeId = bussApplyTypeList[i].id;
                        var typeName = bussApplyTypeList[i].name;
                        if (typeId == '1079100142') {
                            selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                        }
                    }
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
            url: serviceUrl + "kq/hrKqBussTrip/queryTripWayList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: "{}",
            success: function (data) {
                if (data.success) {
                    bussTripWayList = data.result;
                    var selTypeObj = $("#tripWay");

                    for (i in bussTripWayList) {
                        var typeId = bussTripWayList[i].id;
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
        var uBody = "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
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
        $("#status").val("1067100106");//草稿
        $("#bussApplyFrom").find("input[name='type']").val("1068100138");//出差申请
        $("#applicant").val("1234");
        $("#applicantName").val("张三");
        $("#deptId").val("004a940dbcd54cafa13e3447b38e7e54");
        $("#deptName").val("EHR事业部");
    }

    function initUuidBussApply() {
        var uBody = "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#bussApplyFrom").find("input[name='id']").val(guuid);
            }
        });

        // var personId = $("#applicant").val();
        // $("#bussApplyFrom").find("input[name='personId']").val(personId);
        var itemId = $.hrUtils.getHRCodeIdByName("1081", "未销");
        $("#destroyStatus").val(itemId);//销出差申请状态：未申请
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

    function saveApplyForm(sign, applyFlag) {
        if (sign == 0) {
            //请假申请信息
            addSaveApplyForm();
        } else if (sign == 1) {
            //请假申请信息
            updateApplyForm(bussApplyId);
        }
        if (applyFlag != null && applyFlag != "") {
        } else {
            setTimeout(function () {
                window.close();
            }, 300);
        }
    }

    /**
     * 保存表单：保存单据信息
     */
    function addSaveDocumentsForm() {

        //var sysApplyArr = $("#sysApplyFrom").serializeArray();
        var sysApplyDto = {};
        // for (var i in sysApplyArr) {
        //     if (sysApplyArr[i].name != "statusValue") {
        //         if (sysApplyArr[i].name == "applyDate") {
        //             var date = sysApplyArr[i].value.replace(/-/g, '/');
        //             if (date != "") {
        //                 sysApplyDto[sysApplyArr[i].name] = new Date(date).getTime();
        //             }
        //         } else {
        //             sysApplyDto[sysApplyArr[i].name] = sysApplyArr[i].value;
        //         }
        //     }
        // }
        sysApplyDto.id = $("#id").val();
        sysApplyDto.type = $("#type").val();
        sysApplyDto.name = $("#name").val();
        sysApplyDto.code = $("#code").val();
        var applyDate = $("#applyDate").val();
        if (applyDate != "") {
            sysApplyDto.applyDate = new Date(applyDate.replace(/-/g, '/')).getTime();
        }
        sysApplyDto.applicant = $("#applicant").val();
        sysApplyDto.applicantName = $("#applicantName").val();
        sysApplyDto.deptName = $("#deptName").val();
        sysApplyDto.deptId = $("#deptId").val();
        sysApplyDto.companyId = $("#companyId").val();
        sysApplyDto.companyName = $("#companyName").val();
        sysApplyDto.creater = $("#creater").val();
        sysApplyDto.createrName = $("#createrName").val();
        sysApplyDto.status = $("#status").val();
        sysApplyDto.createrOrgIdPlat = $("#createrOrgIdPlat").val();
        sysApplyDto.createrOrgNamePlat = $("#createrOrgNamePlat").val();
        var approvalDate = $("#approvalDate").val();
        if (approvalDate != "") {
            sysApplyDto.approvalDate = new Date(approvalDate.replace(/-/g, '/')).getTime();
        }

        sysApplyDto.delflag = false;
        sysApplyDto.approvalDate = null;

        $.ajax({
            url: serviceUrl + "sys/sysApply/save",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(sysApplyDto),
            success: function (data) {
                if (data.success == true) {
                    // pop_tip_open("blue", "保存成功！");
                    // refreshParent();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    /**
     * 保存表单：新增出差
     */
    function addSaveApplyForm() {
        // initUuidBussApply();

        //出发到达地点的处理
        // var s_province_s = $("#s_province_s").val();//出发省
        // var s_city_s = $("#s_city_s").val();//出发市
        // var s_province_e = $("#s_province_e").val();//到达省
        // var s_city_e = $("#s_city_e").val();//到达市
        /* if (s_province_s == "省份") {
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
         }*/

        // $("#location").val(s_province_s + "," + s_city_s);
        // $("#destination").val(s_province_e + "," + s_city_e);

        //var hrKqBussTripArr = $("#bussApplyFrom").serializeArray();
        var hrKqBussTripDto = {};
        // for (var i in hrKqBussTripArr) {
        //     if (hrKqBussTripArr[i].name != "applyEndTime" && hrKqBussTripArr[i].name != "applyStartTime"
        //         && hrKqBussTripArr[i].name != "s_province_s" && hrKqBussTripArr[i].name != "s_city_s"
        //         && hrKqBussTripArr[i].name != "s_province_e" && hrKqBussTripArr[i].name != "s_city_e") {
        //         hrKqBussTripDto[hrKqBussTripArr[i].name] = hrKqBussTripArr[i].value;
        //     }
        // }
        hrKqBussTripDto.id = $("#bussTripId").val();
        hrKqBussTripDto.applyId = $("#applyId").val();
        hrKqBussTripDto.destroyStatus = $("#destroyStatus").val();
        hrKqBussTripDto.applyEndDate = $("#applyEndDate").val();
        hrKqBussTripDto.applyStartDate = $("#applyStartDate").val();
        hrKqBussTripDto.tripType = '1079100142';
        hrKqBussTripDto.location = $("#location").val();
        hrKqBussTripDto.destination = $("#destination").val();
        hrKqBussTripDto.tripWay = $("#tripWay").val();
        hrKqBussTripDto.applyTripDays = $("#applyTripDays").val();
        hrKqBussTripDto.reason = $("#reason").val();
        hrKqBussTripDto.personId = $("#personId").val();
        hrKqBussTripDto.delflag = false;

        //开始结束时间的处理
        var applyEndDate = hrKqBussTripDto.applyEndDate;
        var applyEndTime = $("#applyEndTime").val();
        var applyStartDate = hrKqBussTripDto.applyStartDate;
        var applyStartTime = $("#applyStartTime").val();

        applyEndDate = applyEndDate + " " + applyEndTime;
        applyStartDate = applyStartDate + " " + applyStartTime;
        hrKqBussTripDto["applyEndDate"] = new Date(applyEndDate.replace(/-/g, '/')).getTime();
        hrKqBussTripDto["applyStartDate"] = new Date(applyStartDate.replace(/-/g, '/')).getTime();
        /* if (hrKqBussTripDto.applyStartDate > hrKqBussTripDto.applyEndDate) {
         pop_tip_open("red", "开始时间不能大于结束时间！");
         return;
         }*/


        $.ajax({
            url: serviceUrl + "kq/hrKqBussTrip/save",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(hrKqBussTripDto),
            success: function (data) {
                if (data.success) {
                    pop_tip_open("blue", "保存成功！");
                    refreshParent(hrKqBussTripDto.id);
                    setTimeout(function () {
                        window.close();
                    }, 300);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    /**
     *根据id查询请假申请信息
     */
    function getKqBussInfoById(id) {
        $.ajax({
            url: serviceUrl + "kq/hrKqBussTrip/queryApplyList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"bussApplyId": id, "ifPublicType": "true"}),
            success: function (data) {
                if (data.success) {
                    var result = data.result.list;
                    $('bussTripId').val(id);//公出id
                    $("#code").val(result[0].code);
                    $("#name").val(result[0].name);
                    var status = result[0].status;
                    $("#status").val(status);
                    if (status != "草稿") {
                        $("#saveBtn").hide();
                        $("#applyBtn").hide();
                    } else {
                        $("#saveBtn").show();
                        $("#applyBtn").show();
                    }

                    $("#personId").val(result[0].personId);
                    //基本信息回显
                    getEmpById(result[0].personId);
                    $("#applicant").val(result[0].applicant);
                    $("#applicantName").val(result[0].personName);
                    $("#postId").val(result[0].postId);
                    $("#postName").val(result[0].postName);
                    $("#rankId").val(result[0].rankId);
                    // var tripType = result[0].tripType;
                    var tripWay = result[0].tripWay;
                    // $("#tripType").val(tripType);
                    $("#tripWay").val(tripWay);
                    $("#deptId").val(result[0].deptId);
                    $("#deptName").val(result[0].deptName);
                    $("#applyDate").val(result[0].applyDate);
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
                    // $("#tripType option[value='" + tripType + "']").attr("selected", true);
                    // $("#tripWay option[value='" + tripWay + "']").attr("selected", true);

                    $("#destroyStatus").val(result[0].destroyStatus);

                    applyId = result[0].applyId;
                    $("#applyId").val(applyId);
                    //回显审批单信息
                    getSysApplyById(applyId);
                    $("#reason").val(result[0].reason);

                    $("#location").val(result[0].location);
                    $("#destination").val(result[0].destination);

                    //todo 制单人所属机构
                    $("#createrOrgIdPlat").val(result[0].createrOrgIdPlat);
                    $("#createrOrgNamePlat").val(result[0].createrOrgNamePlat);

                    // var location = result[0].location;
                    // var destination = result[0].destination;
                    //
                    // var locations = location.split(",");
                    // var destinations = destination.split(",");
                    // var s_province_s = "";
                    // var s_city_s = "";
                    // var s_province_e = "";
                    // var s_city_e = "";
                    // if (locations.length > 1) {
                    //     s_province_s = locations[0];
                    //     s_city_s = locations[1];
                    // } else {
                    //     s_province_s = locations[0];
                    // }
                    //
                    // if (destinations.length > 1) {
                    //     s_province_e = destinations[0];
                    //     s_city_e = destinations[1];
                    // } else {
                    //     s_province_e = destinations[0];
                    // }
                    // $("#s_province_s option[value='" + s_province_s + "']").attr("selected", true);
                    // change(1);
                    // $("#s_city_s option[value='" + s_city_s + "']").attr("selected", true);
                    // $("#s_province_e option[value='" + s_province_e + "']").attr("selected", true);
                    // change1(1);
                    // $("#s_city_e option[value='" + s_city_e + "']").attr("selected", true);

                    editAttach(applyId);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    function getEmpById(id) {
        if (id == null || id == "") {
            id = $("#personId").val();
        }
        // var urlBody = "emp/empPersonInfo/getEmpById/"+id;
        var urlBody = "emp/empPersonInfo/getEmpById/" + id;
        var urlAll = serviceUrl + urlBody;
        $.ajax({
            type: 'GET',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            // data: JSON.stringify({"orgId": orgId}),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    var personId = result.id;
                    $('#personId').val(personId);
                    $('#orgId').val(result.orgId);
                    $("#personName").val(result.name);
                    var deptName = $.hrUtils.getHRPrefixOrgNameById(result.deptId);
                    $("#hrDeptId").val(result.deptId);
                    $("#hrDeptName").val(deptName);
                    // alert(result.postName);
                    // alert($("#postName").val());
                    var headshipRank = $.hrUtils.getHRCodeNameById(result.headshipRank);
                    $("#headshipRank").val(headshipRank);
                    $("#postNameS").val(result.postName);
                    // $("#postName").val(result.postName);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });

    }

    /**
     * 获取申请单信息
     *修改,回显数据
     */
    window.getSysApplyById = function (applyId) {
        var uBody = "/sys/sysApply/get/" + applyId + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                $("#sysApplyFrom").find("input[name='id']").val(data.result.id);
                $("#sysApplyFrom").find("input[name='name']").val(data.result.name);
                $("#sysApplyFrom").find("input[name='code']").val(data.result.code);
                //用户的信息
                //制单人
                $("#sysApplyFrom").find("input[name='creater']").val(data.result.creater);
                $("#sysApplyFrom").find("input[name='createrName']").val(data.result.createrName);
                //经办人
                $("#sysApplyFrom").find("input[name='applicant']").val(data.result.applicant);
                $("#sysApplyFrom").find("input[name='applicantName']").val(data.result.applicantName);

                $("#companyId").val(data.result.companyId);
                $("#companyName").val(data.result.companyName);

                // $("#deptId").val(data.result.deptId);
                $("#deptName").val(data.result.deptName);
                getDirectDeptAnaDirectComByUser(data.result.deptId);
                // var deptId = $("#deptId");
                // //先清空
                // deptId.empty();
                // deptId.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

                //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
                //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
                $("#sysApplyFrom").find("input[name='applyDate']").val(data.result.applyDate);
                var status = data.result.status;
                $("#sysApplyFrom").find("input[name='status']").val(status);
                //isBtnShow2Hide();
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#sysApplyFrom").find("input[name='statusValue']").val(statusValue);
                // $("#sysApplyFrom").find("input[name='approvalDate']").val(data.result.approvalDate);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化申请单信息失败");
            }
        })
    };

    /**
     * 请假申请：附件
     * */
    function attachmentInit() {
        //创建jqGrid组件
        jQuery("#listAattachmentInit").jqGrid(
            {
                datatype: "local",//请求数据返回的类型。可选json,xml,txt
                // width: $('.container-all').width() - 150,
                // height: $(window).height() - $('.xj-main-breadcrumbs').height() - $('.xj-main-advanced').height() - $('.xj-main-dimsearch').height() - 283,
                width: window.screen.availWidth - 20,
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    // {name: 'id', label: "序号", width: 55, align: "center"},
                    {name: 'name', label: "附件名称", width: 160, align: "center"},
                    {name: 'sort', label: "附件分类", width: 100, align: "center"},
                    {name: 'size', label: "附件大小", width: 100, align: "center"},
                    {name: 'description', label: "说明", width: 80, align: "center"},
                ],

                rownumbers: true,
                multiselect: true,
                multiboxonly: true,
                rowNum: -1,//一页显示多少条 -1全部
                sortname: 'id',//初始化的时候排序的字段
                sortorder: "desc"//排序方式,可选desc,asc
            });
    }


    /**
     * 更新单据信息
     */
    function updateDocumentsForm(applyId) {
        //var sysApplyArr = $("#sysApplyFrom").serializeArray();
        var sysApplyDto = {};
        var str = "name,applicant,applicantName,deptName,deptId,companyId,companyName";
        sysApplyDto.name = $("#name").val();
        sysApplyDto.applicant = $("#applicant").val();
        sysApplyDto.applicantName = $("#applicantName").val();
        sysApplyDto.deptName = $("#deptName").val();
        sysApplyDto.deptId = $("#deptId").val();
        sysApplyDto.companyId = $("#companyId").val();
        sysApplyDto.companyName = $("#companyName").val();
        // var array = str.split(",");
        // for (var i in sysApplyArr) {
        //     if (contains(array, sysApplyArr[i].name)) {
        //         // if (sysApplyArr[i].name == "name") {
        //         sysApplyDto[sysApplyArr[i].name] = sysApplyArr[i].value;
        //     }
        // }

        $.ajax({
            url: serviceUrl + "sys/sysApply/update/" + applyId,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(sysApplyDto),
            success: function (data) {
                if (data.success == true) {
                    // pop_tip_open("blue", "保存成功！");
                    // refreshParent();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    /**
     * 更新出差信息
     */
    function updateApplyForm(bussApplyId) {
        // var s_province_s = $("#s_province_s").val();//出发省
        // var s_city_s = $("#s_city_s").val();//出发市
        // var s_province_e = $("#s_province_e").val();//到达省
        // var s_city_e = $("#s_city_e").val();//到达市
        // if (s_province_s == "省份") {
        //     s_province_s = "";
        // }
        // if (s_city_s == "地级市") {
        //     s_city_s = "";
        // }
        // if (s_province_e == "省份") {
        //     s_province_e = "";
        // }
        // if (s_city_e == "地级市") {
        //     s_city_e = "";
        // }
        //
        // $("#location").val(s_province_s + "," + s_city_s);
        // $("#destination").val(s_province_e + "," + s_city_e);
        // var hrKqBussTripArr = $("#bussApplyFrom").serializeArray();
        var hrKqBussTripDto = {};
        // for (var i in hrKqBussTripArr) {
        //     if (hrKqBussTripArr[i].name != "applyEndTime" && hrKqBussTripArr[i].name != "applyStartTime"
        //         && hrKqBussTripArr[i].name != "s_province_s" && hrKqBussTripArr[i].name != "s_city_s"
        //         && hrKqBussTripArr[i].name != "s_province_e" && hrKqBussTripArr[i].name != "s_city_e") {
        //         hrKqBussTripDto[hrKqBussTripArr[i].name] = hrKqBussTripArr[i].value;
        //     }
        // }
        hrKqBussTripDto.destroyStatus = $("#destroyStatus").val();
        hrKqBussTripDto.applyEndDate = $("#applyEndDate").val();
        hrKqBussTripDto.applyStartDate = $("#applyStartDate").val();
        hrKqBussTripDto.tripType = '1079100142';
        hrKqBussTripDto.location = $("#location").val();
        hrKqBussTripDto.destination = $("#destination").val();
        hrKqBussTripDto.tripWay = $("#tripWay").val();
        hrKqBussTripDto.applyTripDays = $("#applyTripDays").val();
        hrKqBussTripDto.reason = $("#reason").val();
        hrKqBussTripDto.personId = $("#personId").val();

        hrKqBussTripDto.delflag = false;
        hrKqBussTripDto.id = bussApplyId;
        hrKqBussTripDto.applyId = applyId;

        var applyEndDate = hrKqBussTripDto.applyEndDate;
        var applyEndTime = $("#applyEndTime").val();
        var applyStartDate = hrKqBussTripDto.applyStartDate;
        var applyStartTime = $("#applyStartTime").val();

        applyEndDate = applyEndDate + " " + applyEndTime;
        applyStartDate = applyStartDate + " " + applyStartTime;
        hrKqBussTripDto["applyEndDate"] = new Date(applyEndDate.replace(/-/g, '/')).getTime();
        hrKqBussTripDto["applyStartDate"] = new Date(applyStartDate.replace(/-/g, '/')).getTime();
        /*  if (hrKqBussTripDto.applyStartDate > hrKqBussTripDto.applyEndDate) {
         pop_tip_open("red", "开始时间不能大于结束时间！");
         return;
         }*/
        $.ajax({
            url: serviceUrl + "kq/hrKqBussTrip/update/" + bussApplyId,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(hrKqBussTripDto),
            success: function (data) {
                if (data.success) {
                    pop_tip_open("blue", "保存成功！");
                    refreshParent(hrKqBussTripDto.id);
                    // closeWindow();
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }


    /**
     * 刷新父页面表格数据
     */
    window.refreshParent = function (editId) {
        if (editId != null && editId != "") {
            window.opener.focusIdCallBack(editId);
        }
        window.opener.jqGridKqBuss.jqGrid().trigger("reloadGrid");
    };

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


    /**
     * 初始化申请单信息
     * 默认经办人为当前制单人
     */
    function initSysApply() {
        var uBody = "/sys/sysApply/getSysApply?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                initAttach(data.result.id);
                var loginName = data.result.loginName;
                var flag = getHRUserInfo(loginName);
                if (flag == false) {
                    pop_tip_open("red", "当前经办人【" + data.result.applicantName + "】与HR系统无法对应，请选择其他人员！");
                    emptyPerson();
                } else if (flag == true) {
                    //经办人
                    $("#sysApplyFrom").find("input[name='applicant']").val(data.result.applicant);
                    $("#sysApplyFrom").find("input[name='applicantName']").val(data.result.applicantName);

                    $("#companyId").val(data.result.companyId);
                    $("#companyName").val(data.result.companyName);

                    // $("#sysApplyFrom").find("input[name='deptId']").val(data.result.deptId);
                    // $("#sysApplyFrom").find("input[name='deptName']").val(data.result.deptName);
                    // var dept = $("#deptId");
                    // //先清空
                    // dept.empty();
                    // //机构信息
                    // dept.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");
                    //使用后台获取的直属部门的机构id赋值回显
                    getDirectDeptAnaDirectComByUser(data.result.deptId);
                }
                $("#sysApplyFrom").find("input[name='id']").val(data.result.id);
                $("#bussApplyFrom").find("input[name='applyId']").val(data.result.id);//业务表的关联id
                $("#sysApplyFrom").find("input[name='name']").val(data.result.name);
                //初始化申请单编号
                var applyCode = $.hrUtils.getApplyCodeByType('kqBussTrip');
                $("#code").val(applyCode);
                //用户的信息
                //制单人
                $("#sysApplyFrom").find("input[name='creater']").val(data.result.creater);
                $("#sysApplyFrom").find("input[name='createrName']").val(data.result.createrName);


                var applyDate = data.result.applyDate.substring(0, 10);
                $("#sysApplyFrom").find("input[name='applyDate']").val(applyDate);
                $("#sysApplyFrom").find("input[name='type']").val(APPLY_TYPE_KQCC);//考勤出差申请

                //制单人所属机构
                $("#sysApplyFrom").find("input[name='createrOrgIdPlat']").val(data.result.createrOrgIdPlat);
                $("#sysApplyFrom").find("input[name='createrOrgNamePlat']").val(data.result.createrOrgNamePlat);

                //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
                //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
                var status = data.result.status;
                $("#status").val(status);
                var statusValue = $.hrUtils.getHRCodeNameById(status);
                $("#sysApplyFrom").find("input[name='statusValue']").val(statusValue);
                // $("#sysApplyFrom").find("input[name='approvalDate']").val("0000-00-00 00:00:00");
                // getDirectDeptAnaDirectComByUser();

            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化指标集请求失败");
            }
        })
    }

    /**
     * 用户选择回调方法
     */
    window.userCallback = function (data, success) {
        //经办人
        var userId = data.id;
        $('#applicant').val(userId);
        getDirectDeptAnaDirectComByUser();

        //业务表保存hr系统人员信息
        var loginName = data.loginName;
        var flag = getHRUserInfo(loginName);
        if (flag == false) {
            pop_tip_open("red", "当前经办人【" + data.name + "】与HR系统无法对应，请选择其他人员！");
            emptyPerson();
            return;
        }
    };

    /**
     * 根据平台账户获取人力系统用户信息
     * @param account  平台账户
     */
    function getHRUserInfo(account) {
        var flag = false;//标志hr系统是否有当前人
        $.ajax({
            url: serviceUrl + "emp/empPersonInfo/getHREmpInfoByAccount",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({"account": account}),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    if (result != null) {
                        flag = true;
                        var personId = result.id;
                        $('#personId').val(personId);
                        $("#personName").val(result.name);
                        var deptName = $.hrUtils.getHRPrefixOrgNameById(result.deptId);
                        $("#hrDeptId").val(result.deptId);
                        $("#hrDeptName").val(deptName);
                        $("#postNameS").val(result.postName);
                        var headshipRank = $.hrUtils.getHRCodeNameById(result.headshipRank);
                        $("#headshipRank").val(headshipRank);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        })
        return flag;
    }

    /**
     * 根据用户获取其所有组织的直属部门和直属公司
     * @param deptId1 修改时指定选择的值
     */
    function getDirectDeptAnaDirectComByUser(deptId1) {
        //经办人
        var applicant = $('#applicant').val();
        var postData = {"userId": applicant};
        $.ajax({
            url: "/hr-app/sys/sysApply/getDirectDeptAnaDirectComByUser",
            type: 'POST',
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        var data = xhr.result;
                        //赋值所属机构下拉
                        //部门公司映射
                        deptComList = data;
                        var deptId = $("#deptId");
                        //先清空
                        deptId.empty();

                        //遍历机构信息
                        $.each(data, function (n, value) {
                            deptId.append("<option value='" + value.directDeptId + "'>" + value.directDeptAllName + "</option>");
                        });
                        //修改页面指定回显
                        if (deptId1 != undefined && deptId1 != null && deptId1 != '') {
                            //赋值
                            deptId.val(deptId1);
                        }
                        //联动所属公司
                        changeCompanyByDeptId();
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "获取直属部门和公司失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

//新增页面
    $("#deptId").change(function () {
        changeCompanyByDeptId();
    });

    /**
     * 根据机构改变公司
     */
    function changeCompanyByDeptId() {
        //当前机构的默认值
        var deptId = $("#deptId").val();
        // alert("现在的机构ID是======"+deptId);
        $.each(deptComList, function (n, value) {
            //直属
            if (value.directDeptId == deptId) {
                // $('#deptName').val(value.directDeptName);
                $('#deptName').val(value.directDeptAllName);
                $('#companyId').val(value.directCompId);
                $('#companyName').val(value.directCompName);
            }
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


    window.calculateBussDays = function () {
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
            days = days - 1
            if (days < 0) {
                days = 0;
            }
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
     * 仅测试使用
     * @param code
     * @param id
     */
    /* function applyTest(code, id) {
     var urlBody = "kq/hrKqBussTrip/getBusinessObjectVar";
     var urlAll = serviceUrl + urlBody;
     $.ajax({
     type: 'POST',
     url: urlAll,
     async: false,
     dataType: 'JSON',
     contentType: 'application/json',
     data: JSON.stringify({"businessId": id, "businessObjectCode": code}),
     success: function (data) {
     if (data.success == true) {
     var result = data.result;
     }
     }, error: function (XMLHttpRequest, textStatus, errorThrown) {
     pop_tip_open("red", "服务异常,请联系管理员！");
     }
     });
     }*/
    /**
     * 发起流程后，平台调用我们的方法
     */
    window.flowCallBack = function () {
        var id = $('bussTripId').val();
        refreshParent(id);
    }
})(jQuery, window, document);