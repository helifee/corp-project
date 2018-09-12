/**
 * 人事转正js
 * 逻辑：
 * 选择人员的时候，使用人员字典选择的正式表的人员
 * 保存的时候保存到临时表，使用的是人员临时表 empPersonInfoTmp
 *
 * 修改，查看的时候也是 审批表关联临时表查询的
 * 提交审批后，将临时表的信息保存到正式表
 */
;(function ($, window, document, undefined) {
    //操作类型
    var oper;
    var personId;
    var businessId;
    var saveFlag = true;
    window.getCheck = function () {
        $("#applicationForm").attr("data-validate-success", "")
        return true;
    };
    //上来就执行
    $(function () {


        personId = $.xljUtils.getUrlParam("personId");
        $("#personId").val(personId);
        businessId = $.xljUtils.getUrlParam("businessId");
        $("#saveBtn").unbind('click').on('click', function () {
            //saveOrUpdate();
            $("#applicationForm").attr("data-validate-success", "");//校验
            var data = ehrApplyData();
            return data;
        });
        //初始页面
        initPersonInfo();
        getEmpInfoSetById(personId);
    });

    /**
     * 初始化页面
     */
    function initPersonInfo() {
        //获取url参数
        if (businessId == undefined || businessId == '' || businessId == null) {
            //在组织人事列表点击的新增转正
            if (personId != undefined && personId != '') {
                //带出人员信息
                queryHasRegularInfo(personId);
            }
        } else {
            saveFlag = false;
            // 根据审批单ID获取页面数据
            getEidtInfo();
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
    });


    /**
     * 用户选择回调方法
     */
    window.userCallback = function (data, success) {
        console.log(data);
        //经办人
        var userId = data.id;
        $('#applicant').val(userId);
        //getTopDeptAnaTopComByUser();
        getDirectDeptAnaDirectComByUser();
    };

    /**
     * 判定是更新还是保存
     * 保存编辑信息
     * saveFlag=true?新增：修改
     */
    function saveOrUpdate() {
        //新增
        /*if (saveFlag) {
            $("#applicationForm").attr("data-validate-success","" );//校验
           var data =  ehrApplyData();
            return data;
            // $("#applicationForm").submit();
        } else {//修改
            //$("#applicationForm").attr("data-validate-success", "window.submitEditForm()");//更新
            // $("#applicationForm").submit();
        }*/
    }

    /**
     * 判定是否多次转正
     * @param personId
     */
    function queryHasRegularInfo(personId) {
        var flag=true;
        $.ajax({
            type: 'POST',
            url: hostUrl + 'emp/empPersonInfoTmp/queryHasRegularInfo',
            dataType: 'json',
            contentType: 'application/json',
            async:false,
            data: JSON.stringify({"personId": personId}),//转正
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        if (xhr.result.length > 0) {
                            $.xljUtils.tip("green", "人员已提交或完成转正申请,请勿重复操作！");
                            flag=false;
                        } else {
                            //选择人员后需要根据人员ID进行查询
                            getEmpInfoSetById(personId);
                        }
                    } else {
                        if (xhr.code == "50000") {//请求返回的状态码？
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "服务异常，请联系管理员！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
        return flag;
    }


    /**
     * 根据人员ID获取人员信息
     */
    function getEmpInfoSetById(personId) {
        //todo  获取人员基本信息
        $.ajax({
            type: "GET",
            url: hostUrl + "emp/empPersonInfo/get/" + personId,//从正式表中查询
            dataType: "json",
            success: function (data, textStatus) {
                if (data == null || data.result == null) {
                    return;
                }
                $("#personId").val(data.result.sid);//人员ID
                $("#personName").val(data.result.realName);
                // var orgId = data.result.orgId;//机构ID
                // $('#orgId').val(orgId);
                // $("#orgName").val($.hrUtils.getHRPrefixOrgNameById(orgId));
                // var postId = data.result.postId;//岗位
                // $('#postId').val(postId);
                // $("#postName").val($.hrUtils.getPtPostNameById(postId));
                var entryTime = (data.result.entryTime == null || data.result.entryTime == '') ? '' : changeTimeStyle(data.result.entryTime).Format("yyyy-MM-dd");
                $("#entryTime").val(entryTime);
                // var entryOrgTime = (data.result.entryOrgTime == null || data.result.entryOrgTime == '') ? '' : changeTimeStyle(data.result.entryOrgTime).Format("yyyy-MM-dd");
                // $("#entryOrgTime").val(entryOrgTime);

                // $("#headshipRank").val(data.result.headshipRank);
                // $("#headshipRankValue").val($.hrUtils.getHRCodeNameById(data.result.headshipRank));
                var probationPeriod = data.result.probationPeriod;//试用期(月)
                $('#probationPeriod').val(probationPeriod);
                //转正时间
                var periodEndTime = data.result.regularTime == null ? '' : changeTimeStyle(data.result.regularTime).Format("yyyy-MM-dd");
                $('#periodEndTime').val(periodEndTime);
                $('#phone').val(data.result.mobile);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }


    /**
     * 新增 保存信息
     */
    window.submitAddForm = function () {
        /*var param = {};
        var hrEmpRegularDto = {};
        hrEmpRegularDto.delflag = 0;
        hrEmpRegularDto.topicName = $("#topicName").val();//主题
        hrEmpRegularDto.businessId = businessId;//业务ID
        hrEmpRegularDto.approvalStatus= APPLY_STATUS_INAPPROVAL;//状态
        hrEmpRegularDto.personName = $("#personName").val();//姓名
        hrEmpRegularDto.personId = personId;//人员ID
        // hrEmpRegularDto.orgId = $("#orgId").val();//所在机构
        // hrEmpRegularDto.postId = $("#postId").val();//岗位
        hrEmpRegularDto.headshipRank = $('#headshipRank').val();//职级
        hrEmpRegularDto.phone = $('#phone').val();//手机
        if ($("#entryTime").val() != '') {
            hrEmpRegularDto.entryTime = $("#entryTime").val() + ' 00:00:00';//入职时间
        }
        if ($("#regularTime").val() != '') {
            hrEmpRegularDto.regularTime = $("#regularTime").val() + ' 00:00:00';//转正日期
        }
        hrEmpRegularDto.probationPeriod = $("#probationPeriod").val();//试用期
        hrEmpRegularDto.workSummary = $("#workSummary").val();//工作总结

        param.hrEmpRegularDto = hrEmpRegularDto;
        $.ajax({
            type: 'POST',
            url: hostUrl + 'emp/empPersonInfoTmp/saveRegular',
            data: JSON.stringify(param),
            dataType: "json",
            // async: false,
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        saveFlag = false;
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

                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });*/
    };

    /**
     * 修改信息
     */
    window.submitEditForm = function () {
        var param = {};
        var hrEmpRegularDto = {};
        //员工信息
        hrEmpRegularDto.delflag = 0;
        hrEmpRegularDto.businessId = businessId;//业务ID
        hrEmpRegularDto.personName = $("#personName").val();//姓名
        hrEmpRegularDto.personId = $("#personId").val();//人员ID
        // hrEmpRegularDto.orgId = orgId;//所在机构
        // hrEmpRegularDto.postName = $("#postName").val();//岗位
        hrEmpRegularDto.headshipRank = $('#headshipRank').val();//职级
        if ($("#entryTime").val() != '') {
            hrEmpRegularDto.entryTime = $("#entryTime").val() + ' 00:00:00';//入职时间
        }
        // if ($("#entryOrgTime").val() != undefined && $("#entryOrgTime").val() != '') {
        //     hrEmpRegularDto.entryOrgTime = $("#entryOrgTime").val() + ' 00:00:00';//加入本公司时间
        // }
        if ($("#regularTime").val() != '') {
            hrEmpRegularDto.regularTime = $("#regularTime").val() + ' 00:00:00';//转正日期
        }
        hrEmpRegularDto.probationPeriod = $("#probationPeriod").val();//试用期
        hrEmpRegularDto.workSummary = $("#workSummary").val();//工作总结

        param.hrEmpRegularDto = hrEmpRegularDto;
        $.ajax({
            type: 'PUT',
            url: hostUrl + 'emp/empPersonInfoTmp/updateApp/' + hrEmpRegularDto.businessId,
            data: JSON.stringify(param),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr) {
                if (xhr) {
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
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    };


    /**
     * 修改功能--加载信息
     */
    function getEidtInfo() {
        // businessId = $.xljUtils.getUrlParam("businessId");//获取审批单ID
        $.ajax({
            url: hostUrl + "emp/empPersonInfoTmp/queryRegularListByBusinessId",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"businessId": businessId}),
            success: function (data, textStatus) {
                if (data.result.length > 0) {
                    personId = data.result[0].id;//中间表Id
                    $("#personId").val(data.result[0].personId);//人员ID
                    $("#personName").val(data.result[0].personName);//人员名称
                    // var orgId = data.result[0].orgId;
                    // $('#orgId').val(orgId);
                    // $("#orgName").val($.hrUtils.getHRPrefixOrgNameById(data.result[0].orgId));//机构名称
                    // var postId = data.result[0].postId;//岗位
                    // $('#postId').val(postId);
                    // $("#postName").val($.hrUtils.getPtPostNameById(postId));//岗位名称
                    var headshipRank = data.result[0].headshipRank;
                    $("#headshipRank").val(headshipRank); //职级
                    $("#headshipRankValue").val($.hrUtils.getHRCodeNameById(headshipRank));//职级

                    var entryTime = data.result[0].entryTime == null ? '' : changeTimeStyle(data.result[0].entryTime).Format("yyyy-MM-dd");
                    $("#entryTime").val(entryTime);//入职时间
                    // var entryOrgTime = data.result[0].entryOrgTime == null ? '' : changeTimeStyle(data.result[0].entryOrgTime).Format("yyyy-MM-dd");
                    // $("#entryOrgTime").val(entryOrgTime);//进入本公司时间
                    $("#probationPeriod").val(data.result[0].probationPeriod);//试用期限
                    var regularTime = data.result[0].regularTime == null ? '' : changeTimeStyle(data.result[0].regularTime).Format("yyyy-MM-dd");
                    $("#regularTime").val(regularTime);//转正日期【注意对应关系】
                    $("#workSummary").val(data.result[0].workSummary);//工作总结
                    $('#phone').val(data.result[0].phone);
                    $('#businessId').val(businessId);
                    $("#topicName").val(data.result[0].topicName);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

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
        $("#applicationForm")[0].reset();
    };
    /**
     * 表单校验
     * @returns {*}
     */
    window.check = function () {
        //改为主动触发校验
        $.xljUtils.customSingleValidate("#applicationForm");
        var validRet = $("#applicationForm").valid();
        if(!validRet){
            return validRet;
        }
        if (businessId == undefined || businessId == '' || businessId == null) {
            //在组织人事列表点击的新增转正
            if (personId != undefined && personId != '') {
                //带出人员信息
                var flag = queryHasRegularInfo(personId);
                return flag
            }else{
                return true;
            }
        }else{
            return true;
        }
    }
})(jQuery, window, document);