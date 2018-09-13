;(function ($, window, document, undefined) {
    var jqGridByDay;//日明细
    var jqGridByMonth;//月结果
    var daysInMonth;//选择的月份有多少天
    var nowKqStartDays;//计薪期间-起始天数
    var nowKqEndDays;//计薪期间-结束天数
    var ifNextMonth;//计薪期间结束天数是否次月
    $(function () {
        resizeHeight();

        //当前考勤年月
        var nowKqMonth = $("#nowKqMonth").val();
        nowKqStartDays = "05";
        nowKqEndDays = "04";
        nowKqMonth = "2017-12";
        ifNextMonth = "1009100036";

        var nowKqStartDate = nowKqMonth + nowKqStartDays;
        var nowKqEndDate = nowKqMonth + nowKqEndDays;

        //计薪期间结束天数是否次月
        if (ifNextMonth !== undefined && ifNextMonth === "1009100037") {//否
            nowKqStartDate = nowKqMonth + "-" + nowKqStartDays;
            nowKqEndDate = nowKqMonth + +"-" + nowKqEndDays;
        } else if (ifNextMonth !== undefined && ifNextMonth === "1009100036") {//是
            nowKqStartDate = nowKqMonth + "-" + nowKqStartDays;
            var nextKqMonth = getNextMonth(nowKqStartDate);
            nowKqEndDate = nextKqMonth + "-" + nowKqEndDays;
        }

        $("#nowKqStartDate").html(nowKqStartDate.replace(/-/g, '.'));
        $("#nowKqEndDate").html(nowKqEndDate.replace(/-/g, '.'));


        pageInit();

        // //多选框
        // $('#kqRegular').multipleSelect({
        //     width: "50%",
        //     filter: true,
        //     placeholder: "请选择",
        //     minimumCountSelected: 10
        // });

        //审批中的记录
        $(".inAapprovalList").click(function () {
            // window.open("");
        });

        //月报
        $("#monthlyReport").click(function () {
            var nowKqMonth = $("#nowKqMonth").val();
            window.open('kq_summery_monthly_report.html?nowKqMonth=' + nowKqMonth)
        });

        //历史月报
        $("#HistoricalMonthlyReport").click(function () {
            var nowKqMonth = $("#nowKqMonth").val();
            window.open('kq_summery_historical_monthly_report.html?nowKqMonth' + nowKqMonth)
        });

        resizeGrid();
    });
    //
    $('#import').click(function () {
        var winObjEI = window.open('kq_summery_accounts_import.html');
        var isClose = 1;
        //关闭open页面时刷新父页面列表
        var loop = setInterval(function () {
            if (winObjEI.closed && isClose == 1) {

                isClose--;
                //这里写刷新代码
                $('#listResultByDay').jqGrid().trigger("reloadGrid");
            }
        }, 1000);
    });
    $('#kqSetting').click(function () {
        window.location.href = "kq_setting.html";
    });

    $('.btn').click(function (e) {
        e.preventDefault();
    });

    function pageInit() {
        daysInit();
        kqSummaryAccounts();
    }


//计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        // $(".slide-left .ztree-box").height((w_h - 70) + "px");
        //右侧table
        $(".con-table .mytable").height((w_h - 130) + "px");
    }

//计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 120);
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-2, true);
        $.xljUtils.gridResizeFn();
    }

//grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    /**
     * 样式格式化
     * @param rowId
     * @param val
     * @param rowObject
     * @param cm
     * @param rdata
     * @returns {String}
     */
    function addCellAttr(rowId, val, rowObject, cm, rdata) {
        var name = cm.name.substring(0, 3);
        var days = parseInt(cm.name.substring(3, 5));
        if (days >= 1 && days <= 9) {
            name = name + "0" + days;
        } else if (days > 9) {
            name = name + days;
        }
        var type = name + "kqType";
        var jsonData = JSON.stringify(rowObject);
        var data = eval('(' + jsonData + ')');
        var typeValue = data[type];//考勤类型

        if (typeValue == "1118100219") {//异常
            return "style='background-color:#F24848'";
        } else if (typeValue == "1118100220") {//请假
            return "style='background-color:yellow'";
        } else if (typeValue == "1118100221") {//出差
            return "style='background-color:orange'";
        } else if (typeValue == "1118100222") {//未打卡
            return "style='background-color:cornflowerblue'";
        } else if (typeValue == "1118100223") {//流程未结束
            return "style='background-color:#77d5f7'";
        }
    }


    /**
     * 考勤核算
     * */
    window.kqSummaryAccounts = function (postData) {
        //加载动态列
        var jqdata = [
            {name: 'orgName', label: "所属机构", width: 150, align: "center", frozen: true},
            {name: 'postName', label: "岗位", width: 150, align: "center", frozen: true},
            {name: 'name', label: "姓名", width: 150, align: "center", frozen: true},
            {name: 'account', label: "账号", width: 150, align: "center", frozen: true},
            {name: 'planName', label: "所属考勤规则", width: 150, align: "center", frozen: true},
        ];
        var month1 = $("#month1").val();
        var daysInMonth = getDaysInMonth(month1.substring(0, 4), month1.substring(5, 7));
        for (var i = 0; i < daysInMonth; i++) {
            var j = i + 1;
            if (j >= 1 && j <= 9) {
                j = "0" + j;
            }
            var name = "day" + j;
            var newDate = month1 + "-" + (i + 1);
            var dayOfWeek = new Date(newDate.replace(/-/g, '/')).getDay();
            if (dayOfWeek === 0) {
                dayOfWeek = "日";
            } else if (dayOfWeek === 1) {
                dayOfWeek = "一";
            } else if (dayOfWeek === 2) {
                dayOfWeek = "二";
            } else if (dayOfWeek === 3) {
                dayOfWeek = "三";
            } else if (dayOfWeek === 4) {
                dayOfWeek = "四";
            } else if (dayOfWeek === 5) {
                dayOfWeek = "五";
            } else if (dayOfWeek === 6) {
                dayOfWeek = "六";
            }
            var label = month1.substring(5, 7) + "." + (i + 1) + "(星期" + dayOfWeek + ")";
            var data = {name: name, label: label, width: 150, align: "center", cellattr: addCellAttr};
            jqdata.push(data);
        }
        var model = [];
        for (var i = 0; i < jqdata.length; i++) {
            model.push({
                name: jqdata[i].name,
                label: jqdata[i].label,
                width: jqdata[i].width,
                align: jqdata[i].align,
                cellattr: jqdata[i].cellattr
            });
        }


        var ubody = "kq/hrKqSummary/queryKqResultListByDay";
        var uall = serviceUrl + ubody;
        var jgGridResultData;//查询结果
        //卸载jqGrid组件
        jQuery('#listResultByDay').GridUnload();
        //创建jqGrid组件
        jqGridByDay = jQuery("#listResultByDay").jqGrid(
            {
                // url: uall,
                // postData: postData,
                // datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                datatype: "local",
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",

                jsonReader: {
                    // root: "result"
                    repeatitems: false
                },
                autowidth: true,
                shrinkToFit: false,
                rownumbers: true,
                colModel: model,
                height: $(window).height() - 200,

                rowNum: 20,//一页显示多少条
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
                page: 1,
                viewrecords: true, //定义是否要显示总记录数
                // sortname: 'id',//初始化的时候排序的字段
                // sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                },
                loadError: function (xhr, status, error) {
                    pop_tip_open("red", "服务器异常，请联系管理员");
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }
            }).jqGrid('setFrozenColumns');
        var mydata = [
            {
                id: "1",
                orgName: "鑫苑(中国)/鑫苑总部/董事会",
                postName: "董事长",
                name: "张杰",
                "account": "zhangjie",
                planName: "正常班",
                day01: "正常",
                day02: "正常",
                day03: "正常",
                day04: "正常",
                day05: "正常",
                day06: "正常",
                day07: "正常",
                day08: "正常",
                day09: "正常",
                day10: "正常",
                day11: "正常",
                day12: "正常",
                day13: "正常",
                day14: "正常",
                day15: "正常",
                day16: "正常",
                day17: "正常",
                day18: "正常",
                day19: "正常",
                day20: "正常",
                day21: "正常",
                day22: "正常",
                day23: "正常",
                day24: "正常",
                day25: "正常",
                day26: "正常",
                day27: "正常",
                day28: "正常",
                day29: "正常",
                day30: "正常",
                day31: "正常"

            }
        ];
        for (var i = 0; i <= mydata.length; i++) {
            jQuery("#listResultByDay").jqGrid('addRowData', i + 1, mydata[i]);
        }
    };


    /**
     * 年月初始化
     */
    window.daysInit = function () {
        var month1 = $("#month1").val();
        if (month1 == null || month1 == "") {
            var date = new Date();
            var month = date.getMonth() + 1;
            if (month >= 1 && month < 10) {
                month = "0" + month;
            }
            month1 = date.getFullYear() + "-" + month;
            $("#month1").val(month1);
        }
        daysInMonth = getDaysInMonth(month1.substring(0, 4), month1.substring(5, 7));
    };

    /**
     * 判断某年某月有多少天
     */
    window.getDaysInMonth = function (year, month) {
        var date = new Date(year, month, 0);
        var days = date.getDate();
        return days;
    };


    /**
     * 获取下一个月
     *
     * @date 格式为yyyy-mm的日期，如：2017-12
     */
    function getNextMonth(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2;
        return t2;
    }
})(jQuery, window, document);