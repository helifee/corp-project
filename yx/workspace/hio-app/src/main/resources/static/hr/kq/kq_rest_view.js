;(function ($, window, document, undefined) {
    var restApplyTypeList;
    var restApplyId;//请假申请id
    var applyId;//系统申请表单据id
    var duplicateResult;//日期重复校验
    var typeStatus;//年假状态：启用/禁用
    var annualRemainDays;//当前员工的年假剩余天数
    var applyRegular;//年假限制设置
    var deptComList;//部门和公司映射
    // var startFlag = true;//用于判断开始日期是否是工作日（true  是  false 否）
    // var endFlag = true;//用于判断结束日期是否是工作日（true  是  false 否）
    var myKqFlag;//是否来自我的考勤（true 是）
    var restTypeList = {};//请假类型列表
    var annualInfo;//员工个人年假信息
    var type;
    var initApplicant;
    var initApplicantName;
    var restTypeForUpdate;//请假类型显示
    $(function () {
        //resizeHeight();
        applyId = $.xljUtils.getUrlParam("businessId");//业务id 即申请单id 平台默认拼接businessId=？
        getSysApplyById(applyId)
        getKqRestInfoById(applyId);
        var personId = $("#personId").val();
        queryAnnualInfoById(personId);
        queryRestApplyTypeList();//查询初始化请假类型下拉选择
        restInit();//查询本年度申请列表
        $("#restType option[value='" + restTypeForUpdate + "']").prop("selected", true);

        var status = $("#status").val();
        var restType = $("#restType").find("option:selected").text();
        if (restType === "年假" && annualInfo.length > 0) {
            if (status !== null && status !== undefined) {
                if (status === "草稿") {
                    annualRemainDays = annualInfo[0].annualRemainDays;
                    $("#annualRemainDaysS").empty();
                    $("#annualRemainDaysS").append("年假剩余" + annualRemainDays + "天");
                } else if (status === "审批中" || status === "已审批") {
                    var annualRemainDaysForForm = $("#annualRemainDaysForForm").val();
                    $("#annualRemainDaysS").empty();
                    $("#annualRemainDaysS").append("年假剩余" + annualRemainDaysForForm + "天");
                }
            } else {
                $("#annualRemainDaysS").empty();
            }
        } else {
            $("#annualRemainDaysS").empty();
        }
        pageInit();

        //resizeGrid();
        setIframeHeight();
    });

    function pageInit() {
        attachmentInit();
        initDatetimepicker();
    }

    function openNewWindow(src) {
        window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
    }

    window.closeWindow = function () {
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
//     $(window).resize(function () {
//         resizeHeight();
//         resizeGrid();
//     });

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


    /**
     * 附件
     * @param businessId 业务单据id
     */
    window.editAttach = function (businessId) {
        $('.attachment-container').xljAttachment({
            appId: 'HR',
            businessId: businessId,
            categoryId: ATTACH_TYPE_KQQJ,
            mode: 'view',
            serverAddr: ATTACH_SERVERADDR
        });
    };

    var count = true;

    /**
     * 查询该条记录所对应的申请单据id
     */
    window.querySysApplyIds = function (ids) {
        var applyIds;
        $.ajax({
            url: serviceUrl + "kq/hrKqRest/querySysApplyIds/" + ids,
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({"ids": ids}),
            success: function (data) {
                if (data.success) {
                    var result = data.result;
                    applyIds = result.split(",")[0];
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
        return applyIds;
    };

    /**
     *根据id查询请假申请信息
     */
    window.getKqRestInfoById = function (applyId) {
        $.ajax({
            url: serviceUrl + "kq/hrKqRest/queryApplyList",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify({"applyId": applyId}),
            success: function (data) {
                if (data.success) {
                    var result = data.result.list;
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
                    $("#applicant").val(result[0].applicant);
                    $("#applicantName").val(result[0].personName);
                    $("#postId").val(result[0].postId);
                    $("#postName").val(result[0].postName);
                    $("#rankId").val(result[0].rankId);
                    var restType = result[0].restType;
                    // $("#restType").val(restType);
                    $("#deptId").val(result[0].deptId);
                    $("#deptName").val(result[0].deptName);
                    // $("#applyDate").val(changeTimeStyle(result[0].applyDate).format("yyyy-MM-dd"));
                    $("#applyRestDays").val(result[0].applyRestDays);
                    var applyStartDate = result[0].applyStartDate;
                    var applyEndDate = result[0].applyEndDate;
                    //请假信息表中存储的年假剩余天数（状态由草稿变为审批中的时候查询到的年假剩余天数）
                    $("#annualRemainDaysForForm").val(result[0].annualRemainDays);
                    restTypeForUpdate = result[0].restType;
                    $("#applyStartDate").val((new Date(changeTimeStyle(applyStartDate)).format("yyyy-MM-dd")).toString() + " " + applyStartDate.substring(11, 16));
                    $("#applyEndDate").val((new Date(changeTimeStyle(applyEndDate)).format("yyyy-MM-dd")).toString() + " " + applyEndDate.substring(11, 16));

                    $("#reason").val(result[0].reason);

                    $("#destroyStatus").val(result[0].destroyStatus);

                    // $("#restType option[value='" + restType + "']").prop("selected", true);

                    $("#restType").prop("disabled", "disabled");
                    $("#applyStartTime").prop("disabled", "disabled");
                    $("#applyEndTime").prop("disabled", "disabled");

                    applyId = result[0].applyId;
                    $("#applyId").val(applyId);
                    //todo 制单人所属机构
                    $("#createrOrgIdPlat").val(result[0].createrOrgIdPlat);
                    $("#createrOrgNamePlat").val(result[0].createrOrgNamePlat);

                    var restTypeName = result[0].restTypeName;
                    if (restTypeName === "年假") {
                        var start_year = parseInt(new Date(changeTimeStyle(applyStartDate)).getFullYear());
                        var end_year = parseInt(new Date(changeTimeStyle(applyEndDate)).getFullYear());
                        $("#annualYear").val(end_year);
                    }
                    //基本信息回显
                    getEmpById(result[0].personId);
                    editAttach(applyId);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };

    function getEmpById(id) {
        if (id == null || id == "") {
            id = $("#personId").val();
        }
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
                    $("#postName").val(result.postName);
                    var headshipRank = $.hrUtils.getHRCodeNameById(result.headshipRank);
                    $("#headshipRank").val(headshipRank);
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

                $("#sysApplyFrom").find("input[name='deptId']").val(data.result.deptId);
                $("#sysApplyFrom").find("input[name='deptName']").val(data.result.deptName);
                var deptId = $("#deptId");
                //先清空
                deptId.empty();
                deptId.append("<option value='" + data.result.deptId + "'>" + data.result.deptName + "</option>");

                //$("#sysApplyFrom").find("input[name='postId']").val(data.result.postId);
                //$("#sysApplyFrom").find("input[name='rankId']").val(data.result.rankId);
                $("#sysApplyFrom").find("input[name='applyDate']").val(changeTimeStyle(data.result.applyDate).format("yyyy-MM-dd"));
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
    window.attachmentInit = function () {
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
    };


    /**
     * 更新单据信息
     */
    window.updateDocumentsForm = function (applyId) {
        //var sysApplyArr = $("#sysApplyFrom").serializeArray();
        var sysApplyDto = {};
        // var str = "name,applicant,applicantName,deptName,deptId,companyId,companyName";
        // var array = str.split(",");
        // for (var i in sysApplyArr) {
        //     if (contains(array, sysApplyArr[i].name)) {
        //         // if (sysApplyArr[i].name == "name") {
        //         sysApplyDto[sysApplyArr[i].name] = sysApplyArr[i].value;
        //     }
        // }
        sysApplyDto.name = $("#name").val();
        sysApplyDto.applicant = $("#applicant").val();
        sysApplyDto.applicantName = $("#applicantName").val();
        sysApplyDto.deptName = $("#deptName").val();
        sysApplyDto.deptId = $("#deptId").val();
        sysApplyDto.companyId = $("#companyId").val();
        sysApplyDto.companyName = $("#companyName").val();
        $.ajax({
            url: serviceUrl + "sys/sysApply/update/" + applyId,
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(sysApplyDto),
            success: function (data) {
                if (data.success == true) {

                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };

    /**
     * 根据假期类别名称查询信息
     */
    window.queryAnnualTypeInfo = function (name) {
        $.ajax({
            url: serviceUrl + "kq/hrKqHolidaytypeSetting/queryListByCondition",
            type: "post",
            data: JSON.stringify({"name": name}),
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    typeStatus = result[0].status;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", textStatus);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    };


    /**
     *校验
     */
    window.annualCheck = function () {
        var msg = "";
        var personId = $("#personId").val();
        var restType = $("#restType").find("option:selected").text();
        if (restType == "年假") {
            // queryAnnualInfoById(personId);
            // }
            var a = document.getElementById("restType");
            if (annualInfo.length > 0) {
                annualRemainDays = annualInfo[0].annualRemainDays;
                $("#annualRemainDaysS").empty();
                $("#annualRemainDaysS").append("年假剩余" + annualRemainDays + "天");
                // var restType = $("#restType").find("option:selected").text();
                if (annualRemainDays <= 0) {
                    a.options[0].selected = true;//默认选中第一个
                    pop_tip_open("red", "您年假剩余天数是0，不能申请年假");
                    return;
                }
            } else {
                pop_tip_open("red", "没有查到您的年假信息，请选择其他类型假期！");
                a.options[0].selected = true;//默认选中第一个
                return;
            }
        } else {
            $("#annualRemainDaysS").empty();
        }
        // msg = calculateRestDays2();
        // return msg;
    };

    window.annualCheck2 = function () {
        var applyRestDays = $("#applyRestDays").val();
        var restType = $("#restType").find("option:selected").text();
        if (restType == "年假") {
            if (annualRemainDays < applyRestDays) {
                pop_tip_open("red", "您的年假天数仅剩" + annualRemainDays + "天，请调整时间或选择其他类型假期");
            }
        }
    };
    /**
     * 查询员工个人的年假信息
     */
    window.queryAnnualInfoById = function (personId) {
        var annualYear = $("#annualYear").val();
        $.ajax({
            url: serviceUrl + "kq/hrKqAnnual/queryAnnualDays",
            type: "post",
            data: JSON.stringify({"personId": personId, "annualYear": annualYear}),
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            success: function (data) {
                if (data.success == true) {
                    annualInfo = data.result.list;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", textStatus);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
        return annualInfo;
    };


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
     * 刷新父页面表格数据
     */
    window.refreshParent = function (editId) {
        window.opener.jqGridKqRest.jqGrid().trigger("reloadGrid");
        if (editId != null && editId != "") {
            window.opener.focusIdCallBack(editId);
        }
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

    window.initDatetimepicker = function () {
        //年月日
        var picker = $('.datetimepicker2').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });
    };

    /**
     * 仅测试使用
     * @param code
     * @param id
     */
    /* function applyTest(code, id) {
     var urlBody = "kq/hrKqRest/getBusinessObjectVar";
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
     var result  = data.result;
     }
     }, error: function (XMLHttpRequest, textStatus, errorThrown) {
     pop_tip_open("red", "服务异常,请联系管理员！");
     }
     });
     }*/

    /**
     * 用户选择回调方法
     */
    window.userCallback = function (data, success) {
        console.log(data);
        //经办人
        var userId = data.id;
        $('#applicant').val(userId);
        getDirectDeptAnaDirectComByUser();

        //业务表保存hr系统人员信息
        var loginName = data.loginName;
        var flag = getHRUserInfo(loginName);
        if (flag == false) {
            pop_tip_open("red", "当前经办人【" + data.name + "】与HR系统无法对应，请选择其他人员！");
            // $("#applicant").val("");
            // $("#applicantName").val("");
            // $("#deptId").val("");
            // $("#deptName").val("");
            // $("#personId").val("");
            emptyPerson();
            return;
        }
        var personId = $('#personId').val();
    };

    /**
     * 根据平台账户获取人力系统用户信息
     * @param account  平台账户
     */
    function getHRUserInfo(account) {
        var flag = false;//标志hr系统是否有当前人
        $.ajax({
            url: serviceUrl + "emp/empPersonInfo/getHREmpInfoByAccount2",
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
                        $('#orgId').val(result.orgId);
                        $("#personName").val(result.name);
                        var deptName = $.hrUtils.getHRPrefixOrgNameById(result.deptId);
                        $("#hrDeptId").val(result.deptId);
                        $("#hrDeptName").val(deptName);
                        $("#postName").val(result.postName);
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
     * 根据用户获取其所有组织的顶级部门和顶级公司
     */
    window.getDirectDeptAnaDirectComByUser = function () {
        //经办人
        var applicant = $('#applicant').val();
        var postData = {"userId": applicant};
        $.ajax({
            url: "/hr-app/sys/sysApply/getDirectDeptAnaDirectComByUser",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        var data = xhr.result;
                        console.log(data);
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
                        //联动所属公司
                        changeCompanyByDeptId();
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "获取顶级部门和公司失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr) {
                console.log(xhr);
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
    window.changeCompanyByDeptId = function () {
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
    };

    //针对IE进行时间转换
    window.changeTimeStyle = function (bTime) {
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
        var later = new Date(bTime);
        return later;
    };

    window.calculateWorkDays = function () {
        var msg = "";
        var personId = $("#personId").val();
        var startDate = $("#applyStartDate").val();
        var endDate = $("#applyEndDate").val();
        var applyStartTime = $("#applyStartTime").val();
        var applyEndTime = $("#applyEndTime").val();

        if (personId != null && personId != "" && startDate != null && startDate != "" && endDate != null && endDate != "") {
            if (startDate > endDate) {
                pop_tip_open("red", "开始时间不能大于结束时间！");
                $("#applyStartDate").val("");
                $("#applyEndDate").val("");
                return;
            }
            msg = getWorkDays(personId, startDate, endDate, applyStartTime, applyEndTime);
        } else {
            $("#applyRestDays").val(0);
        }
        return msg;
    };

    /**
     *工作日请假天数计算
     */
    window.getWorkDays = function (personId, startDate, endDate, applyStartTime, applyEndTime) {
        var msg = "";
        var urlBody = "kq/hrKqSummary/queryWorkDays";
        var urlAll = serviceUrl + urlBody;
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
                    var result = data.result;
                    var resultList = result["list"];
                    var sum = result["sum"];
                    var ss = startDate.substring(0, 10);
                    if (!contains(resultList, startDate.substring(0, 10))) {
                        msg = "开始时间不是工作日，请重新选择!";
                        pop_tip_open("red", "开始时间不是工作日，请重新选择!");
                        $("#applyRestDays").val(0);
                        $("#applyStartDate").val("");
                        // $("#applyEndDate").val("");
                        // startFlag = false;
                        return;
                    }
                    if (!contains(resultList, endDate.substring(0, 10))) {
                        msg = "结束时间不是工作日，请重新选择!";
                        pop_tip_open("red", "结束时间不是工作日，请重新选择!");
                        $("#applyRestDays").val(0);
                        // $("#applyStartDate").val("");
                        $("#applyEndDate").val("");
                        // endFlag = false;
                        return;
                    }
                    // startFlag = true;
                    // endFlag = true;
                    var applyRestDays = result.length;
                    $("#applyRestDays").val(sum);

                } else {
                    pop_tip_open("red", data.msg);
                    $("#applyRestDays").val(0);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                msg = "服务异常,请联系管理员！";
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
        return msg;
    };


    window.calculateRestDays2 = function () {
        var msg = "";
        var restType = $("#restType").val();
        var result = restTypeList[restType];
        var calculateRule = result.calculateRule;//1088100158  工作日  1088100159 自然日
        if (calculateRule == "1088100158") {
            msg = calculateWorkDays();
        } else if (calculateRule == "1088100159") {
            getWorkDays2();
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
        var restType = $("#restType").find("option:selected").text();
        if (restType === "年假") {
            var applyRestDays = $("#applyRestDays").val();
            if (annualInfo != null && annualInfo.length > 0) {
                annualRemainDays = annualInfo[0].annualRemainDays;
                if (applyRestDays > annualRemainDays) {
                    pop_tip_open("red", "您的年假仅剩" + annualRemainDays + "天，请重新选择开始结束日期");
                    $("#applyStartDate").val("");
                    $("#applyEndDate").val("");
                    $("#applyRestDays").val(0);
                }
            }
        }
        return msg;
    };

    /**
     * 自然日请假天数计算：不管排班
     */
    window.getWorkDays2 = function () {
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
            days = 0;
        }
        $("#applyRestDays").val(days);
    };

    function getDateDiff(date1, date2) {
        var sArr = date1.split("-");
        var eArr = date2.split("-");
        var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
        var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
        var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
        return Math.abs(result);
    }

    /**
     * 个人年度请假信息
     * */
    window.restInit = function () {
        var personId = $("#personId").val();
        if (personId === undefined || personId === null || personId === "") {
            personId = "---";
        }
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var ubody = "kq/hrKqRest/queryPerApplyList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridKqRest = jQuery("#listRest").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                postData: {"personId": personId, "year": year, "status": "1067100108"},
                contentType: "application/json",
                datatype: "JSON",
                jsonReader: {
                    // repeatitems: false
                    root: "result"
                },
                colModel: [
                    // {name: 'id', label: "序号", width: 48, align: "center"},
                    {name: 'name', label: "主题", width: 93, align: "center"},
                    {name: 'personName', label: "申请人", width: 100, align: "center"},
                    {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                    {
                        name: 'restTypeName',
                        label: "请假类型",
                        width: 100,
                        align: "center"
                    },
                    {name: 'applyRestDays', label: "请假天数", width: 100, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 120,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 120,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    }
                ],

                width: $(".grid-container").width(),
                //height: $(window).height() - 200,
                autowidth: true,
                shrinkToFit: true,
                rownumbers: true,
                multiselect: true,
                multiboxonly: true,
                sortname: '',//初始化的时候排序的字段
                sortorder: "",//排序方式,可选desc,asc
                rowNum: -1,//一页显示多少条
                // rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: "#pager2",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
                loadComplete: function (data) {
                    console.log(data);
                },
                gridComplete: function () {
                    $(".ui-state-default.ui-jqgrid-hdiv").css("background", "#acd7ff");
                    $(".ui-jqgrid .ui-jqgrid-hbox").css("marginTop", "4px");
                    // $(".ui-jqgrid .ui-jqgrid-bdiv").css("height","auto");
                    $(".ui-widget-content").css("overflow", "hidden");
                    $("#listRest").setGridWidth($(".grid-container").width(), true);
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }
            });
    };

    //字符串截取：yyyy-MM-dd hh:mm
    function dateFormatter(cellValue, options, rowObjec) {
        if (cellValue == null || cellValue == "") {
            return "";
        } else {
            return cellValue.substring(0, 16);
        }
    }

    window.queryRestApplyTypeList = function () {
        var orgId = $('#orgId').val();

        $.ajax({
            url: serviceUrl + "kq/hrKqRest/queryRestApplyTypeList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"orgId": orgId}),
            async: false,
            success: function (data) {
                if (data.success) {
                    restApplyTypeList = data.result;
                    var selTypeObj = $("#restType");

                    for (i in restApplyTypeList) {
                        var typeId = restApplyTypeList[i].id;
                        restTypeList[typeId] = restApplyTypeList[i];
                        var typeName = restApplyTypeList[i].name;
                        // if (typeStatus === "1092100170" && restApplyTypeList[i].name != "年假") {//年假未启用
                        //     selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                        // } else {
                        //     selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                        // }
                        if (restApplyTypeList[i].status === "1092100169") {//启用状态的假期
                            selTypeObj.append("<option value=" + typeId + ">" + typeName + "</option>");
                        }
                    }
                }

            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };
})(jQuery, window, document);