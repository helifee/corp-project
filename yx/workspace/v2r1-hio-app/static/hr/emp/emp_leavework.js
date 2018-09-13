/**
 * 人事离职编辑页面js
 */
;(function ($, window, document, undefined) {
    var oper;//操作类型
    var personId;
    var businessId;//业务ID
    var saveFlag;//子页面返回给父页面的ID

    //上来就执行
    $(function () {
        personId=$.xljUtils.getUrlParam("personId");
        businessId = $.xljUtils.getUrlParam("businessId");//业务ID


        $("#saveBtn").unbind('click').on('click', function () {
            saveOrUpdate();
        });

        //初始页面
        initPersonInfo();

        //返回人员列表
        $("#backEmpList").click(function () {
            var back = $.xljUtils.getUrlParam("back");
            if (back == "01") {//返回人员列表
                //status=01 载入查询条件
                window.location.href = "../org/org_list.html?status=01";
            }else{
                window.history.go(-1);
            }

        });

    });

    /**
     * 初始化页面
     */
    function initPersonInfo() {
        //获取url参数
        //oper = $.xljUtils.getUrlParam("oper");
        if (businessId == undefined || businessId == ''|| businessId == null)  {
            $('title').text("员工离职新增");
            $(".xj-form-title").text("员工离职新增");
            //在组织人事列表点击的新增离职
            if(personId!=undefined&&personId!=''){
                // getPersonInfo(personId);
                $("#personId").val(personId);
            }
        } else {
            $('title').text("员工离职编辑");
            $(".xj-form-title").text("员工离职编辑");
            // 根据审批单ID获取页面数据
            $("#businessId").val(businessId);
            getInfoByBusinessId(businessId);
        }
    }

    /**
     * 时间控件--中文
     */
    $.fn.datetimepicker.dates['zh'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        meridiem: ["上午", "下午"],
        today: "今天"
    };

    /**
     * 开始时间-结束时间
     */
    $(".form_datetime").datetimepicker({
        language: 'zh',
        format: "yyyy-mm-dd",
        minView: 'month',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    }).on('changeDate', function () {
        var startDate = $("#entryTime").val();
        var endDate = $("#leaveTime").val();
        if (new Date(startDate) > new Date(endDate)) {
            pop_tip_open("red", "入职时间不能晚于离职时间！");
            $("#leaveTime").val("");
        }
    });

    /**
     * 根据机构改变公司
     */
    function changeCompanyByDeptId() {
        //当前机构的默认值
        var deptId = $("#deptmentId").val();
        // alert("现在的机构ID是======"+deptId);
        $.each(deptComList, function (n, value) {
            //顶级
            // if (value.topDeptId == deptId) {
            //     $('#deptName').val(value.deptName);
            //     $('#companyId').val(value.topCompId);
            //     $('#companyName').val(value.topCompName);
            // }
            //直属
            if (value.directDeptId == deptId) {
                $('#deptName').val(value.directDeptName);
                $('#companyId').val(value.directCompId);
                $('#companyName').val(value.directCompName);
            }
        });
    }

    /**
     * 根据用户获取其所有组织的直属部门和直属公司
     */
    function getDirectDeptAnaDirectComByUser() {
        //经办人
        var applicant = $('#applicant').val();
        var postData = {"userId": applicant};
        $.ajax({
            url: hostUrl+"/sys/sysApply/getDirectDeptAnaDirectComByUser",
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
                        var deptmentId = $("#deptmentId");
                        //先清空
                        deptmentId.empty();

                        //遍历机构信息
                        $.each(data, function (n, value) {
                            deptmentId.append("<option value='" + value.directDeptId + "'>" + value.directDeptAllName + "</option>");
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



    /**
     * 编辑信息
     * 判定是更新还是保存
     * @param saveFlag=true?新增：修改
     */
    function saveOrUpdate() {
        $("#applicationForm").attr("data-validate-success", "");//保存
        return ehrApplyData();
        /*if (saveFlag) {
            //$("#applicationForm").attr("data-validate-success", " window.submitAddForm()");//保存

            // $("#applicationForm").submit();
        } else {
           // $("#applicationForm").attr("data-validate-success", " window.submitEditForm()");//更新
            $("#applicationForm").attr("data-validate-success", "");//更新

            // $("#applicationForm").submit();
        }*/
    }


    /**
     * 根据审批单Id审批单信息和人员信息
     */
    function getInfoByBusinessId(businessId) {
        $.ajax({
            type: "POST",
            url: hostUrl + "emp/hrEmpLeaveInfo/queryList",
            dataType: "json",
            contentType: 'application/json',
            async: false,//请求需要改为同步
            data: JSON.stringify({"businessId": businessId}),
            success: function (data, textStatus) {
                console.log(data.result[0]);
                $("#personId").val(data.result[0].personId);//人员编号
                $("#leaveInfoId").val(data.result[0].id);//这里需要将离职中间表Id保存下来，用于更新
                $("#leaveType").val(data.result[0].leaveType);
                $("#leaveType_name").val($.hrUtils.getHRCodeNameById(data.result[0].leaveType));
                var leaveTime = (data.result[0].leaveTime == '' || data.result[0].leaveTime == null) ? '' : changeTimeStyle(data.result[0].leaveTime).Format("yyyy-MM-dd");
                $("#leaveTime").val(leaveTime);
                $("#cause").val(data.result[0].cause);
                $("#topicName").val(data.result[0].topicName);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 带出人员信息
     */
    // function getPersonInfo(personId) {
    //     $.ajax({
    //         url: baseUrl + "emp/empPersonInfo/get/" + personId,
    //         type: 'GET',
    //         success: function (data, textStatus) {
    //             $("#nameName").val(data.result.name);
    //             $("#personId").val(data.result.id); //人员ID
    //             $("#phone").val(data.result.phone);//手机
    //             $("#personCode").val(data.result.personCode);//人员编号
    //             $("#orgId").val(data.result.orgId);//所在机构
    //             $("#orgName").val($.hrUtils.getHROrgNameById(data.result.orgId));//所在机构
    //             var postId = data.result.postId;
    //             $("#postId").val(postId);//岗位名称
    //             var postName = $.hrUtils.getPtPostNameById(postId);
    //             $("#postName").val(postName);//岗位名称
    //             $("#headshipRank").val(data.result.headshipRank);//职级
    //             $("#headshipRankName").val($.hrUtils.getHRCodeNameById(data.result.headshipRank));//职级
    //             $("#sex").val($.hrUtils.getHRCodeNameById(data.result.sex));//性别
    //             var entryTime = ( data.result.entryTime == '' || data.result.entryTime == null ) ? '' : changeTimeStyle(data.result.entryTime).Format("yyyy-MM-dd");
    //             $("#entryTime").val(entryTime);//入职时间
    //             var entryOrgTime = (data.result.entryOrgTime == '' || data.result.entryOrgTime == null) ? '' : changeTimeStyle(data.result.entryOrgTime).Format("yyyy-MM-dd");
    //             $("#entryOrgTime").val(entryOrgTime);//进入本公司时间
    //             var periodEndTime = (data.result.regularTime == '' || data.result.regularTime == null) ? '' : changeTimeStyle(data.result.regularTime).Format("yyyy-MM-dd");
    //             $("#periodEndTime").val(periodEndTime);//转正时间
    //         },
    //         error: function (xhr, textStatus, errorThrown) {
    //             $.xljUtils.tip("red", "服务异常,请联系管理员！");
    //         }
    //     });
    // }
    /**
     * 添加离职人员
     */
    window.submitAddForm = function () {
        var param = {};
        var hrEmpLeaveInfoTmpDto = {};
        //离职信息
        hrEmpLeaveInfoTmpDto.personId = personId;//人员ID
        if ($("#leaveTime").val() != '') {
            hrEmpLeaveInfoTmpDto.leaveTime = $("#leaveTime").val() + " 00:00:00";//离职时间
        }
        hrEmpLeaveInfoTmpDto.leaveType = $("#leaveType").val();//离职类型
        hrEmpLeaveInfoTmpDto.cause = $("#cause").val();//离职原因
        hrEmpLeaveInfoTmpDto.topicName = $("#topicName").val();//主题
        hrEmpLeaveInfoTmpDto.businessId = businessId;

        param.hrEmpLeaveInfoTmpDto = hrEmpLeaveInfoTmpDto;

        $.ajax({
            type: 'POST',
            url: baseUrl + 'emp/hrEmpLeaveInfo/saveLeaveWork',
            data: JSON.stringify(param),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr.success) {
                    $.xljUtils.tip("blue", "保存成功");
                } else {
                    //异常处理
                    switch (xhr.code) {
                        case "50000":
                            $.xljUtils.tip("red", xhr.msg);
                            break;
                        case "50001":
                            $.xljUtils.tip("red", xhr.msg);
                            break;
                        case "50002":
                            $.xljUtils.tip("blue", xhr.msg);
                            break;
                        case "50003":
                            $.xljUtils.tip("red", xhr.msg);
                            break;

                        default:
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                            break;
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    };

    /**
     * 修改离职人员
     */
    window.submitEditForm = function () {
        var param = {};
        var hrEmpLeaveInfoDto = {};
        hrEmpLeaveInfoDto.personId = $("#personId").val();//人员ID
        if ($("#leaveTime").val() != '') {
            hrEmpLeaveInfoDto.leaveTime = $("#leaveTime").val() + " 00:00:00";//离职时间
        }
        hrEmpLeaveInfoDto.leaveType = $("#leaveType").val();//离职类型
        hrEmpLeaveInfoDto.cause = $("#cause").val();//离职原因
        hrEmpLeaveInfoDto.businessId = businessId;//业务ID
        hrEmpLeaveInfoDto.topicName = $("#topicName").val();//主题
        hrEmpLeaveInfoDto.id = $("#leaveInfoId").val();//主键

        param.hrEmpLeaveInfoDto = hrEmpLeaveInfoDto;
        $.ajax({
            type: 'PUT',
            url: baseUrl + 'emp/hrEmpLeaveInfoTmp/updateApp/'+ hrEmpLeaveInfoDto.id,
            data: JSON.stringify(param),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr.success) {
                    $.xljUtils.tip("blue", "修改成功");
                } else {
                    //异常处理
                    switch (xhr.code) {
                        case "50000":
                            $.xljUtils.tip("red", xhr.msg);
                            break;
                        case "50001":
                            $.xljUtils.tip("red", xhr.msg);
                            break;
                        case "50002":
                            $.xljUtils.tip("blue", xhr.msg);
                            break;
                        case "50003":
                            $.xljUtils.tip("red", xhr.msg);
                            break;

                        default:
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                            break;
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });

    };

    /**
     * 格式化时间
     */
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    //针对IE进行时间转换
    function changeTimeStyle(bTime) {
        var timePar = bTime.split(' ');
        var timeDate = timePar[0].split('-');
        bTime = timeDate[1] + '/' + timeDate[2] + '/' + timeDate[0];
        var later = new Date(bTime);
        return later;
    }

    //todo 清空信息
    window.emptyInfo = function (id, hiddenId) {
        $("#" + id).val("");
        $("#" + hiddenId).val("");
    };

    /**
     * 表单校验
     * @returns {*}
     */
    window.check = function(){
        $.xljUtils.customSingleValidate("#applicationForm");
        var validRet = $("#applicationForm").valid();
        return validRet;
    }

})(jQuery, window, document);