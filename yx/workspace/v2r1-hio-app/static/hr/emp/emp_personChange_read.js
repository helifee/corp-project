/**
 * 人事调动编辑页面js
 */
;(function ($, window, document, undefined) {
    //操作类型
    var oper;
    //审批单ID
    var businessId;
    var personId;
    //保存标志默认为true
    var saveFlag = true;

    //上来就执行
    $(function () {
        personId = $.xljUtils.getUrlParam("personId");
        $("#personId").val(personId);
        businessId = $.xljUtils.getUrlParam("businessId");//业务ID
        //初始页面
        initInfo();

        $("#saveBtn").unbind('click').on('click', function () {
            saveOrUpdate();
        });

        //返回人员列表
        $("#backEmpList").click(function () {
            var back = $.xljUtils.getUrlParam("back");
            if (back == "01") {//返回人员列表
                //status=01 载入查询条件
                window.location.href = "../org/org_list.html?status=01";
            } else {
                window.history.go(-1);
            }

        });

    });


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

    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
        //$(".nicescroll-rails").offset();
    });

    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 99) + "px");
        //右侧table
        $(".mytable").height($(window).height() - 400 + "px");
        // $(".gbox_hrEmpSetList").height((w_h - 250) + "px");
        // $("#calendar").height((w_h)+"px");
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
        //suffix:      ["st", "nd", "rd", "th"],
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
     * 初始化页面
     */
    function initInfo() {
        //获取url参数
        //oper = $.xljUtils.getUrlParam("oper");
        if (businessId == undefined || businessId == '' || businessId == null) {
            $('title').text("员工调动新增");
            $(".xj-form-title").text("员工调动新增");
            //设置默认变动时间
            $("#changeTime").val(new Date().Format("yyyy-MM-dd"));

            //在组织人事列表点击的新增调动
            if (personId != undefined && personId != '') {
                //带出人员信息
                getEmpInfoSetById(personId);
            }
        } else {
            $('title').text("员工调动编辑");
            $(".xj-form-title").text("员工调动编辑");
            saveFlag = false;//如果为编辑，则将saveFlag置为false
            // 根据businessId获取页面数据
            getInfoByBusinessId(businessId);

        }
    }

    /**
     * 判定是更新还是保存
     * 保存编辑信息
     * @param saveFlag=true？新增：修改
     */
    function saveOrUpdate() {
        $("#empPersonChangeForm").attr("data-validate-success", "");
        return ehrApplyData();
        /* if (saveFlag) {
             $("#empPersonChangeForm").attr("data-validate-success", " window.submitAddForm()");//保存
             // $("#empPersonChangeForm").submit();
         } else {
             $("#empPersonChangeForm").attr("data-validate-success", " window.submitEditForm()");//更新
             // $("#empPersonChangeForm").submit();
         }*/
    }


    /**
     * 根据businessId获取业务单据信息
     */
    function getInfoByBusinessId(businessId) {
        //根据businessId获取从业务表获取页面信息
        $.ajax({
            url: hostUrl + "emp/hrEmpChange/queryListSP",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"businessId": businessId}),
            success: function (data, textStatus) {
                if (data.result.length > 0) {
                    var type = data.result[0].type;//变动类型
                    $('#type').val(type);
                    var type_name = $.hrUtils.getHRCodeNameById(type);
                    $('#type_name').val(type_name);
                    var deptBefpre = data.result[0].deptBefpre;//变动前部门
                    $('#deptBefpre').val(deptBefpre);
                    var deptBefpreName = $.hrUtils.getHROrgNameById(deptBefpre);
                    $('#deptBefpreName').val(deptBefpreName);
                    var deptAfter = data.result[0].deptAfter;//变动后部门
                    $('#deptAfter').val(deptAfter);
                    var deptAfterName = $.hrUtils.getHROrgNameById(deptAfter);
                    $('#deptAfterName').val(deptAfterName);

                    var postBefore = data.result[0].postBefore;//变动前职务
                    $('#postBefore').val(postBefore);
                    var postAfter = data.result[0].postAfter;//变动后职务
                    $('#postAfter').val(postAfter);

                    var headshipRankBefore = data.result[0].headshipRankBefore;//变动前职级
                    $('#headshipRankBefore').val(headshipRankBefore);
                    var headshipRankBefore_name = $.hrUtils.getHRCodeNameById(headshipRankBefore);
                    $('#headshipRankBefore_name').val(headshipRankBefore_name);
                    var headshipRankAfter = data.result[0].headshipRankAfter;//变动前职级
                    $('#headshipRankAfter').val(headshipRankAfter);
                    var headshipRankAfter_name = $.hrUtils.getHRCodeNameById(headshipRankAfter);
                    $('#headshipRankAfter_name').val(headshipRankAfter_name);

                    var changeTime = data.result[0].changeTime;//生效时间
                    if ("" != $.hrUtils.filterNull(changeTime) && changeTime.length > 10) {
                        $('#changeTime').val(changeTime.substr(0, 10));
                    }
                    $('#remark').val(data.result[0].remark);//说明
                    $('#topicName').val(data.result[0].topicName);//主题
                    $('#businessId').val(businessId);

                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 新增 保存审批单
     */
    window.submitAddForm = function () {
        //新增 保存 提交参数
        var param = {};
        var hrEmpChangeDto = {};
        //员工变动信息
        hrEmpChangeDto.personId = personId;
        hrEmpChangeDto.type = $('#type').val();
        hrEmpChangeDto.topicName = $('#topicName').val();
        hrEmpChangeDto.deptBefpre = $('#deptBefpre').val();
        hrEmpChangeDto.deptAfter = $('#deptAfter').val();
        hrEmpChangeDto.postBefore = $('#postBefore').val();
        hrEmpChangeDto.postAfter = $('#postAfter').val();
        hrEmpChangeDto.headshipRankBefore = $('#headshipRankBefore').val();
        hrEmpChangeDto.headshipRankAfter = $('#headshipRankAfter').val();
        var changeTime = $('#changeTime').val();//生效时间
        hrEmpChangeDto.changeTime = changeTime + " 00:00:00";
        hrEmpChangeDto.remark = $('#remark').val();

        hrEmpChangeDto.delflag = 0;//有效标志位
        hrEmpChangeDto.businessId = businessId;//业务ID
        hrEmpChangeDto.approvalStatus = APPLY_STATUS_INAPPROVAL;//状态

        param.hrEmpChangeDto = hrEmpChangeDto;

        $.ajax({
            type: 'POST',
            url: hostUrl + 'emp/hrEmpChangeTmp/saveChange',
            data: JSON.stringify(param),
            dataType: "json",
            contentType: 'application/json',
            success: function (xhr) {
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
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    };


    /**
     * 修改审批单
     */
    window.submitEditForm = function () {
        var data = ehrApplyData();
        return data;
    };

    /**
     * 根据id加载员工信息
     */
    function getEmpInfoSetById(personId) {
        //获取人员信息
        $.ajax({
            type: 'get',
            url: hostUrl + "emp/empPersonInfo/get/" + personId + "?time=" + Math.random(),
            success: function (data) {
                //$("#personId").val(data.result.id);
                $("#headshipRankBefore").val(data.result.headshipRank);
                $("#headshipRankBefore_name").val($.hrUtils.getHRCodeNameById(data.result.headshipRank));
                $("#headshipRankAfter").val(data.result.headshipRank);
                $("#headshipRankAfter_name").val($.hrUtils.getHRCodeNameById(data.result.headshipRank));
                $("#deptBefpre").val(data.result.deptId);
                $("#deptBefpreName").val($.hrUtils.getHROrgNameById(data.result.deptId));//获取部门名称
                $("#deptAfter").val(data.result.deptId);
                $("#deptAfterName").val($.hrUtils.getHROrgNameById(data.result.deptId));//获取部门名称
                $("#postBefore").val(data.result.postName);
                $("#postAfter").val(data.result.postName);
                $("#postId").val(data.result.postId);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "加载人员信息失败，请重试！");
            }
        });
    }

    /**
     * 调动后部门回调函数
     */
    window.deptAfterCallback = function (data) {
        $("#deptAfterName").val(data.name);
        $("#deptAfter").val(data.id);
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
    window.check = function () {
        var flag = false;
        $.xljUtils.customSingleValidate("#empPersonChangeForm");
        var validRet = $("#empPersonChangeForm").valid();
        //如果校验没有通过
        if (!validRet) {
            return validRet;
        }
        $.ajax({
            url: hostUrl + '/emp/empPersonInfo/checkPosition',
            data: {"currentPositionId": $("#postId").val(), "orgId": $('#deptAfter').val(), "userId": personId},
            type: "POST",
            dataType: "JSON",
            async: false,
            success: function (data) {
                //不存在orgId部门对应的职务
                //平台的接口封装了2层
                if (data && data.result.result == false) {
                    flag = true;//可以调动
                } else {//存在
                    $.xljUtils.tip("red", "此人员在该部门已有职务！");
                }
            }
        });
        return flag;
    }
})(jQuery, window, document);