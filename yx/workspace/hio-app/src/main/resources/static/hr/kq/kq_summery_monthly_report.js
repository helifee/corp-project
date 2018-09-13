var absenceDate;//旷工详情（日期）
var absencePersonId;//旷工详情（人员id// ）
;(function ($, window, document, undefined) {
    var jqGridByDay;//日明细
    var jqGridByMonth;//月结果
    var daysInMonth;//选择的月份有多少天
    var nowKqMonth;//当前考勤期间
    $(function () {
        resizeHeight();
        //默认查询在职人员
        var personStatusName = codeFormatter("1143100260");
        $("#personStatusName").val(personStatusName);
        $("#personStatus").val("1143100260");
        $("#personStatusName2").val(personStatusName);
        $("#personStatus2").val("1143100260");
        // nowKqMonth = $.xljUtils.getUrlParam("nowKqMonth");
        nowKqMonth = "2017-12";
        $("#month1").val(nowKqMonth);
        $("#month2").val(nowKqMonth);
        $("#orgId").val("8cfa118d88a04689a66eed5122cf9c7a");

        pageInit();
        $.xljUtils.addTreeScroll();
        $.xljUtils.treeResizeFn();
        resizeGrid();

    });


    $('.btn').click(function (e) {
        e.preventDefault();
    });

    $("#exportBtnDay").on('click', function () {
        exportBtnDay();
    });
    $("#exportBtnMonth").on('click', function () {
        exportBtnMonth();
    });

    function pageInit() {
        // daysInit();
        // daysInitByMonth();
        initDatetimepicker();
        var orgId = $("#orgId").val();
        var status = $("#personStatus").val();
        var queryData = {
            "orgId": orgId,
            "date": nowKqMonth,
            "status": status
        };

        resultByMonthInit(queryData);
        resultByDayInit(queryData);
        bussList({"date": "true"});
        cityBussList({"date": "true"});
        kqLateList({"date": "true"});
        kqLeaveEarlyList({"date": "true"});
        kqAbsenceList({"date": "true"});
        // kqNoSignList({"date": "true"});
        kqAnnualLeaveList({"date": "true"});
        kqAbsenceLeaveList({"date": "true"});
        kqSickLeaveList({"date": "true"});
        kqMaritalLeaveList({"date": "true"});
        kqMaternityLeaveList({"date": "true"});
        kqPaidLeaveList({"date": "true"});
        kqOtherLeaveList({"date": "true"});

        kqRestInApprovalList({"personId": "---", "status": "1067100107"});//请假审批中
        kqBussInApprovalList({"personId": "---", "status": "1067100107"});//出差审批中
        kqNoSignInApprovalList({"personId": "---", "status": "1067100107"});//未打卡审批中
        kqBussPublicInApprovalList({"personId": "---", "status": "1067100107"});//市内公出审批中
        kqNoSignList({"date": "---", "personId": "---"});//漏打卡天数
    }

//计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        // $(".slide-left .ztree-box").height((w_h - 70) + "px");
        //右侧table
        $(".con-table .mytable").height((w_h - 180) + "px");
    }

//计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 60);
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
        } else if (typeValue == "1118100753") {//市内公出
            return "style='background-color:#23ff2a'";
        } else if (typeValue == "1118100223") {//流程未结束
            return "style='background-color:rgba(17, 211, 171, 0.69);";
        }
    }

    /**
     * 页签切换：按考勤日明细  考勤月结果
     */
    $(".right-content .con-tit button").on("click", function (e) {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if ($(this).attr('class').indexOf('byuser') > 0) {
            $("#colorDiv").css("visibility", "visible");
            $("#dayDiv").css("display", "block");//按考勤日明细的display属性设置为block（显示）
            $("#monthDiv").css("display", "none");//按考勤月结果的display属性设置为none（隐藏）
            $.xljUtils.removeGridScroll("tableMonth");
            // $.xljUtils.addGridScroll();
            // $.xljUtils.gridResizeFn();
        } else {
            $("#colorDiv").css("visibility", "hidden");
            $("#dayDiv").css("display", "none");//按考勤日明细的display属性设置为none（隐藏）
            $("#monthDiv").css("display", "block");//按考勤月结果的display属性设置为block（显示）
            // $.xljUtils.removeGridScroll("tableDay");
            $.xljUtils.addGridScroll("tableMonth");
            // $.xljUtils.gridResizeFn();
            $("body").find($(".tableMonth")).getNiceScroll().show().resize();
        }
        $.xljUtils.gridResizeFn();
        e.stopPropagation();
    });


    /**
     * 按人员排班查询人员
     */
    window.queryPersonByType = function () {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = zTree.getSelectedNodes();
        var id = nodes[0].id;
        var queryType = $("#queryType").val();
        var personName = $("#personName").val();
        var queryPersonData = {
            "queryType": queryType,
            "orgId": id,
            "personName": personName
        };
        jQuery("#listGroupByPerson").jqGrid("setGridParam", {postData: queryPersonData}).trigger("reloadGrid");

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

    window.daysInitByMonth = function () {
        var month2 = $("#month2").val();
        if (month2 == null || month2 == "") {
            var date = new Date();
            var month = date.getMonth() + 1;
            if (month >= 1 && month < 10) {
                month = "0" + month;
            }
            month2 = date.getFullYear() + "-" + month;
            $("#month2").val(month2);
        }
        // daysInMonth = getDaysInMonth(month2.substring(0, 4), month2.substring(5, 7));
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
     * 考勤统计：日明细
     * */
    window.resultByDayInit = function (postData) {
        //加载动态列
        var jqdata = [
            {name: 'orgName', label: "所属机构", width: 150, align: "center", frozen: true},
            {name: 'postName', label: "岗位", width: 150, align: "center", frozen: true},
            {name: 'month', label: "月份", width: 150, align: "center", frozen: true},
            {name: 'name', label: "姓名", width: 150, align: "center", frozen: true},
            {name: 'personCode', label: "人员编号", width: 150, align: "center", frozen: true},
        ];
        var month1 = $("#month1").val();
        daysInMonth = getDaysInMonth(month1.substring(0, 4), month1.substring(5, 7));
        for (var i = 0; i < daysInMonth; i++) {
            var j = i + 1;
            if (j >= 1 && j <= 9) {
                j = "0" + j;
            }
            var name = "day" + j;
            var newDate = month1 + "-" + (i + 1);
            var dayOfWeek = new Date(newDate.replace(/-/g, '/')).getDay();
            if (dayOfWeek == 0) {
                dayOfWeek = "日";
            } else if (dayOfWeek == 1) {
                dayOfWeek = "一";
            } else if (dayOfWeek == 2) {
                dayOfWeek = "二";
            } else if (dayOfWeek == 3) {
                dayOfWeek = "三";
            } else if (dayOfWeek == 4) {
                dayOfWeek = "四";
            } else if (dayOfWeek == 5) {
                dayOfWeek = "五";
            } else if (dayOfWeek == 6) {
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
                    var result = data.result;
                    // if (result != null && result.length >= 7) {
                    //     jgGridResultData = data.result.substring(7);
                    //     jgGridResultData = JSON.parse(jgGridResultData);
                    // }
                    // if (jgGridResultData != null) {
                    //     for (var j = 0; j <= jgGridResultData.length; j++) {
                    //         jQuery("#listResultByDay").jqGrid('addRowData', j + 1, jgGridResultData[j]);
                    //     }
                    // }
                },
                loadError: function (xhr, status, error) {
                    pop_tip_open("red", "服务器异常，请联系管理员");
                },
                gridComplete: function () {
                    resizeGrid();
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }
            }).jqGrid('setFrozenColumns');
        var mydata = [{
            "day20kqType": "1118100737",
            "day09": "---",
            "day07kqType": "1118100737",
            "day08": "08:47 \n18:04 ",
            "day07": "08:47 \n18:05 ",
            "day06": " \n",
            "personCode": "",
            "day05": "08:41 \n19:09 ",
            "day13kqType": "1118100737",
            "day04": "08:28 \n18:02 ",
            "day14": "08:38 \n18:35 ",
            "day13": "08:43 \n18:07 ",
            "day12": " \n18:09 ",
            "day11": "08:34 \n18:08 ",
            "day10": "---",
            "day04kqType": "1118100737",
            "orgName": "总部鑫苑/人力资源中心/人力行政部",
            "day06kqType": "1118100220",
            "postId": "e54cd3de64ad482c978247cd12899925",
            "day18kqType": "1118100737",
            "day03": "---",
            "day02": "---",
            "day01": "08:41 \n18:05 ",
            "month": "2017-12",
            "day12kqType": "1118100219",
            "name": "张晶晶",
            "personId": "0240e599abc148d8be443e06c94e02fd",
            "day15kqType": "1118100737",
            "day25kqType": "1118100737",
            "day29": " \n",
            "day28": " \n",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "day27": " \n",
            "day26": "08:29 \n",
            "day19kqType": "1118100737",
            "postName": "档案主管",
            "day11kqType": "1118100737",
            "day21kqType": "1118100737",
            "day01kqType": "1118100737",
            "day14kqType": "1118100737",
            "day08kqType": "1118100737",
            "day19": "08:40 \n18:25 ",
            "day18": "08:39 \n18:03 ",
            "day17": "---",
            "day16": "---",
            "day15": "08:50 \n18:03 ",
            "day25": "08:43 \n18:02 ",
            "day24": "---",
            "day23": "---",
            "day22": "08:36 \n18:05 ",
            "day21": "08:51 \n18:21 ",
            "day20": "08:43 \n18:26 ",
            "day22kqType": "1118100737",
            "day05kqType": "1118100737"
        }, {
            "day20kqType": "1118100221",
            "day09": "---",
            "day07kqType": "1118100221",
            "day08": "08:52 中国北京市朝阳区建国路77-81\n18:02 中国北京市朝阳区建国路77-81\n",
            "day07": "06:22 中国郑州市金水区农业南路\n18:35 中国北京市石景山区大横街\n",
            "day06": "08:11 中国北京市丰台区北京西站(南2出站口)\n18:14 中国郑州市荥阳市郑西·鑫苑名家\n",
            "personCode": "",
            "day05": "08:43 \n18:42 ",
            "day13kqType": "1118100737",
            "day04": "12:57 \n18:22 ",
            "day14": "08:55 \n18:12 ",
            "day13": "08:52 \n18:02 ",
            "day12": " \n19:08 ",
            "day11": "08:54 \n18:57 ",
            "day10": "---",
            "day04kqType": "1118100219",
            "orgName": "总部鑫苑/运营中心/营销管理部",
            "day06kqType": "1118100221",
            "postId": "f81b43320a0948ae8d903d5cf821dea4",
            "day18kqType": "1118100737",
            "day03": "---",
            "day02": "---",
            "day01": "---",
            "month": "2017-12",
            "day12kqType": "1118100219",
            "name": "陈仲曦",
            "personId": "05bf1d5bd2b94e148f432f8d8104847a",
            "day15kqType": "1118100737",
            "day25kqType": "1118100737",
            "day29": " \n",
            "day28": " \n",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "day27": " \n",
            "day26": "08:56 \n",
            "day19kqType": "1118100737",
            "postName": "策划高级经理",
            "day11kqType": "1118100737",
            "day21kqType": "1118100221",
            "day14kqType": "1118100737",
            "day08kqType": "1118100221",
            "day19": "08:53 \n18:07 ",
            "day18": "08:54 \n18:02 ",
            "day17": "---",
            "day16": "---",
            "day15": "08:52 \n18:06 ",
            "day25": "08:55 \n18:14 ",
            "day24": "---",
            "day23": "---",
            "day22": "08:55 中国西安市莲湖区丰镐东路28号\n20:27 中国北京市朝阳区东三环中路\n",
            "day21": "08:58 中国北京市朝阳区大山子出口(S12机场高速出口东北向)\n18:48 中国西安市莲湖区丰禾路\n18:11 中国西安市莲湖区丰禾路\n",
            "day20": "08:52 中国北京市朝阳区郎家园路\n18:42 中国北京市丰台区天津机场城市候机楼(北京南站)\n",
            "day22kqType": "1118100221",
            "day05kqType": "1118100737"
        },
            {
                "day20kqType": "1118100737",
                "day09": "---",
                "day07kqType": "1118100737",
                "day08": "08:47 \n18:32 ",
                "day07": "08:57 \n20:54 ",
                "day06": "08:49 \n19:07 ",
                "personCode": "002617",
                "day05": "10:25 \n19:24 ",
                "day13kqType": "1118100737",
                "day04": "08:44 \n",
                "day14": "08:46 \n",
                "day13": "08:48 \n19:15 ",
                "day12": " \n19:01 ",
                "day11": "08:51 \n19:20 ",
                "day10": "---",
                "day04kqType": "1118100219",
                "orgName": "总部鑫苑/人力资源中心/人力行政部",
                "day06kqType": "1118100737",
                "postId": "5687a5a4a2ac49ada47526b4bde3ead5",
                "day18kqType": "1118100219",
                "day03": "---",
                "day02": "---",
                "day01": "08:53 \n20:35 ",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "李维",
                "personId": "11029",
                "day15kqType": "1118100737",
                "day25kqType": "1118100219",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:50 \n",
                "day19kqType": "1118100737",
                "postName": "薪酬经理",
                "day11kqType": "1118100737",
                "day21kqType": "1118100737",
                "day01kqType": "1118100737",
                "day14kqType": "1118100219",
                "day08kqType": "1118100737",
                "day19": "08:47 \n19:09 ",
                "day18": "10:49 \n19:45 ",
                "day17": "---",
                "day16": "---",
                "day15": "08:50 \n18:48 ",
                "day25": "08:42 \n",
                "day24": "---",
                "day23": "---",
                "day22": "11:12 \n18:32 ",
                "day21": "08:51 \n18:29 ",
                "day20": "08:53 \n18:47 ",
                "day22kqType": "1118100219",
                "day05kqType": "1118100219"
            },
            {
                "day20kqType": "1118100221",
                "day09": "---",
                "day07kqType": "1118100737",
                "day08": "08:47 \n18:17 ",
                "day07": "08:52 \n18:23 ",
                "day06": "08:45 \n18:03 ",
                "personCode": "002625",
                "day05": "08:42 \n18:02 ",
                "day13kqType": "1118100737",
                "day04": "08:41 \n18:07 ",
                "day14": "08:24 \n18:07 ",
                "day13": "08:13 \n18:08 ",
                "day12": " \n18:14 ",
                "day11": "08:47 \n18:14 ",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/运营中心/设计管理部",
                "day06kqType": "1118100737",
                "postId": "51b72171338b48249aecbd73ffda04bd",
                "day18kqType": "1118100737",
                "day03": "---",
                "day02": "---",
                "day01": "08:52 \n18:16 ",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "殷蕊蕊",
                "personId": "11037",
                "day15kqType": "1118100737",
                "day25kqType": "1118100737",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:55 \n",
                "day19kqType": "1118100737",
                "postName": "景观设计经理",
                "day11kqType": "1118100737",
                "day21kqType": "1118100221",
                "day01kqType": "1118100737",
                "day14kqType": "1118100737",
                "day08kqType": "1118100737",
                "day19": "08:54 \n18:42 ",
                "day18": "08:16 \n18:11 ",
                "day17": "---",
                "day16": "---",
                "day15": "08:47 \n18:09 ",
                "day25": "08:28 \n18:15 ",
                "day24": "---",
                "day23": "---",
                "day22": "08:50 \n18:07 ",
                "day21": "08:36 中国郑州市二七区锦江都城(郑州二七店)(原郑州二七时尚旅酒店)\n18:08 中国北京市丰台区北京西站(南3出站口)\n",
                "day20": "08:37 中国北京市丰台区1站台(北京西站)\n18:26 中国郑州市二七区嵩山南路\n",
                "day22kqType": "1118100737",
                "day05kqType": "1118100737"
            },
            {
                "day20kqType": "1118100737",
                "day09": "---",
                "day07kqType": "1118100737",
                "day08": "08:56 \n19:15 ",
                "day07": "08:54 \n19:54 ",
                "day06": "08:56 \n19:43 ",
                "personCode": "002686",
                "day05": "08:53 \n19:35 ",
                "day13kqType": "1118100737",
                "day04": "08:59 \n20:19 ",
                "day14": "08:54 \n20:47 ",
                "day13": "08:58 \n19:09 ",
                "day12": " \n20:56 ",
                "day11": "08:56 \n",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/人力资源中心/人力行政部",
                "day06kqType": "1118100737",
                "postId": "47fa69871fe644f0aeda7dda2d889ef2",
                "day18kqType": "1118100737",
                "day03": "---",
                "day02": "---",
                "day01": "08:57 \n19:18 ",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "黄兄",
                "personId": "11101",
                "day15kqType": "1118100737",
                "day25kqType": "1118100219",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:46 \n",
                "day19kqType": "1118100737",
                "postName": "组织发展副总监",
                "day11kqType": "1118100219",
                "day21kqType": "1118100219",
                "day01kqType": "1118100737",
                "day14kqType": "1118100737",
                "day08kqType": "1118100737",
                "day19": "08:52 \n21:24 ",
                "day18": "08:56 \n21:35 ",
                "day17": "---",
                "day16": "---",
                "day15": "08:51 \n19:00 ",
                "day25": "09:05 \n18:49 ",
                "day24": "---",
                "day23": "---",
                "day22": "",
                "day21": "08:49 \n",
                "day20": "08:51 \n18:38 ",
                "day22kqType": "1118100221",
                "day05kqType": "1118100737"
            },
            {
                "day20kqType": "1118100737",
                "day09": "---",
                "day07kqType": "1118100737",
                "day08": "08:26 \n18:11 ",
                "day07": "08:56 \n18:08 ",
                "day06": "08:33 \n18:03 ",
                "personCode": "002703",
                "day05": "08:43 \n18:03 ",
                "day13kqType": "1118100220",
                "day04": "08:34 \n18:11 ",
                "day14": "08:34 \n18:05 ",
                "day13": "08:50 \n14:56 ",
                "day12": " \n18:03 ",
                "day11": "08:32 \n18:07 ",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/运营中心/设计管理部",
                "day06kqType": "1118100737",
                "postId": "A35A96FC84E74B9C88AD1A89669F6FB1",
                "day18kqType": "1118100737",
                "day03": "---",
                "day02": "---",
                "day01": "08:35 \n18:10 ",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "刘宝莉",
                "personId": "11118",
                "day15kqType": "1118100220",
                "day25kqType": "1118100220",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:20 \n",
                "day19kqType": "1118100737",
                "postName": "建筑设计经理",
                "day11kqType": "1118100737",
                "day21kqType": "1118100737",
                "day01kqType": "1118100737",
                "day14kqType": "1118100737",
                "day08kqType": "1118100737",
                "day19": "08:27 \n18:11 ",
                "day18": "08:33 \n18:50 ",
                "day17": "---",
                "day16": "---",
                "day15": "08:24 \n13:55 ",
                "day25": "08:48 \n12:06 ",
                "day24": "---",
                "day23": "---",
                "day22": " \n",
                "day21": "08:30 \n18:08 ",
                "day20": "08:24 \n18:10 ",
                "day22kqType": "1118100220",
                "day05kqType": "1118100737"
            },
            {
                "day20kqType": "1118100737",
                "day09": "---",
                "day07kqType": "1118100219",
                "day08": "07:51 \n17:06 ",
                "day07": "08:05 \n17:05 ",
                "day06": "07:51 \n17:07 ",
                "personCode": "002718",
                "day05": "07:50 \n17:08 ",
                "day13kqType": "1118100219",
                "day04": "07:54 \n17:02 ",
                "day14": "07:52 \n17:08 ",
                "day13": "07:45 \n17:06 ",
                "day12": " \n17:04 ",
                "day11": "08:18 \n17:10 ",
                "day10": "---",
                "day04kqType": "1118100219",
                "orgName": "总部鑫苑/成本管理部",
                "day06kqType": "1118100219",
                "postId": "7177648F7676489EBD42E2F82B3DCF0A",
                "day18kqType": "1118100737",
                "day03": "---",
                "day02": "---",
                "day01": " \n",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "姜阔",
                "personId": "11133",
                "day15kqType": "1118100219",
                "day25kqType": "1118100737",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "07:44 \n",
                "day19kqType": "1118100737",
                "postName": "招采经理",
                "day11kqType": "1118100219",
                "day21kqType": "1118100737",
                "day01kqType": "1118100220",
                "day14kqType": "1118100219",
                "day08kqType": "1118100219",
                "day19": "07:51 \n18:30 ",
                "day18": "07:50 \n18:09 ",
                "day17": "---",
                "day16": "---",
                "day15": "08:00 \n17:08 ",
                "day25": "08:12 \n18:45 ",
                "day24": "---",
                "day23": "---",
                "day22": "07:47 \n18:18 ",
                "day21": "07:49 \n18:16 ",
                "day20": "07:54 \n18:08 ",
                "day22kqType": "1118100737",
                "day05kqType": "1118100219"
            },
            {
                "day20kqType": "1118100737",
                "day07kqType": "1118100221",
                "day08": "08:26 中国河南省郑州市二七区大学南路5号\n19:24 中国河南省郑州市二七区\n",
                "day07": "07:29 中国河南省郑州市二七区大学南路5号\n19:08 中国河南省郑州市二七区大学南路5号\n19:08 中国河南省郑州市二七区大学南路5号\n",
                "day06": "07:27 中国北京市朝阳区双桥中路\n18:28 中国河南省郑州市二七区嵩山南路\n",
                "personCode": "002719",
                "day05": "08:54 \n19:00 ",
                "day13kqType": "1118100221",
                "day04": "08:30 \n18:21 ",
                "day14": "07:37 中国河南省郑州市二七区淮南街\n18:36 中国河南省郑州市二七区嵩山南路\n",
                "day13": "07:21 中国河南省郑州市二七区淮南街\n18:09 中国河南省郑州市二七区南四环辅路\n",
                "day12": "10:22 中国河北省石家庄市元氏县\n20:13 中国河南省郑州市二七区淮南街\n",
                "day11": "08:51 \n18:20 ",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/运营中心/品质监管部",
                "day06kqType": "1118100221",
                "postId": "B9809FA1EF45423294F5740CF9166D89",
                "day18kqType": "1118100737",
                "day03": "---",
                "day01": "07:26 中国河南省郑州市二七区大学南路5号\n19:04 中国河南省郑州市二七区大学南路5号\n",
                "month": "2017-12",
                "day12kqType": "1118100221",
                "name": "金万成",
                "personId": "11134",
                "day15kqType": "1118100221",
                "day25kqType": "1118100737",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:21 \n",
                "day19kqType": "1118100737",
                "day09kqType": "1118100221",
                "postName": "品质经理",
                "day11kqType": "1118100737",
                "day21kqType": "1118100737",
                "day01kqType": "1118100221",
                "day16kqType": "1118100221",
                "day14kqType": "1118100221",
                "day08kqType": "1118100221",
                "day19": "08:52 \n18:07 ",
                "day18": "08:43 \n18:42 ",
                "day17": "---",
                "day15": "07:01 中国河南省郑州市二七区淮南街\n18:04 中国河南省郑州市荥阳市郑上路\n",
                "day25": "07:01 \n18:57 ",
                "day24": "---",
                "day23": "---",
                "day22": "08:47 \n19:23 ",
                "day21": "08:47 \n18:09 ",
                "day20": "08:48 \n18:15 ",
                "day22kqType": "1118100737",
                "day02kqType": "1118100221",
                "day05kqType": "1118100737"
            },
            {
                "day20kqType": "1118100737",
                "day09": "---",
                "day07kqType": "1118100737",
                "day08": "08:27 \n18:35 ",
                "day07": "08:50 \n18:29 ",
                "day06": "08:24 \n18:31 ",
                "personCode": "002778",
                "day05": "08:43 \n18:51 ",
                "day13kqType": "1118100737",
                "day04": "08:41 \n18:21 ",
                "day14": "08:49 \n18:29 ",
                "day13": "08:47 \n18:26 ",
                "day12": " \n18:23 ",
                "day11": "08:23 \n18:25 ",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/财务管理中心/财务核算部",
                "day06kqType": "1118100737",
                "postId": "A551D2800E054A41B474CE96AC765172",
                "day18kqType": "1118100737",
                "day03": "---",
                "day02": "---",
                "day01": "08:49 \n18:25 ",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "许启川",
                "personId": "11195",
                "day15kqType": "1118100737",
                "day25kqType": "1118100737",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:49 \n",
                "day19kqType": "1118100737",
                "postName": "投资者关系副总监",
                "day11kqType": "1118100737",
                "day21kqType": "1118100737",
                "day01kqType": "1118100737",
                "day14kqType": "1118100737",
                "day08kqType": "1118100737",
                "day19": "08:26 \n18:57 ",
                "day18": "08:42 \n18:08 ",
                "day17": "---",
                "day16": "---",
                "day15": "08:42 \n19:59 ",
                "day25": "08:37 \n18:13 ",
                "day24": "---",
                "day23": "---",
                "day22": "08:38 \n18:52 ",
                "day21": "08:31 \n19:11 ",
                "day20": "08:26 \n18:43 ",
                "day22kqType": "1118100737",
                "day05kqType": "1118100737"
            },
            {
                "day20kqType": "1118100219",
                "day09": "---",
                "day07kqType": "1118100219",
                "day08": " \n",
                "day07": " \n",
                "day06": " \n",
                "personCode": "002797",
                "day05": " \n",
                "day13kqType": "1118100219",
                "day04": " \n",
                "day14": " \n",
                "day13": " \n",
                "day12": " \n",
                "day11": " \n",
                "day10": "---",
                "day04kqType": "1118100219",
                "orgName": "总部鑫苑/人力资源中心/人力行政部",
                "day06kqType": "1118100219",
                "postId": "2C9A48980BA943478B6CB78EBCE6C880",
                "day18kqType": "1118100219",
                "day03": "---",
                "day02": "---",
                "day01": " \n",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "刘朝阳",
                "personId": "11214",
                "day15kqType": "1118100219",
                "day25kqType": "1118100219",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": " \n",
                "day19kqType": "1118100219",
                "postName": "司机",
                "day11kqType": "1118100219",
                "day21kqType": "1118100219",
                "day01kqType": "1118100219",
                "day14kqType": "1118100219",
                "day08kqType": "1118100219",
                "day19": " \n",
                "day18": " \n",
                "day17": "---",
                "day16": "---",
                "day15": " \n",
                "day25": " \n",
                "day24": "---",
                "day23": "---",
                "day22": " \n",
                "day21": " \n",
                "day20": " \n",
                "day22kqType": "1118100219",
                "day05kqType": "1118100219"
            },
            {
                "day20kqType": "1118100737",
                "day07kqType": "1118100221",
                "day08": "10:17 中国郑州市二七区侯寨乡\n18:07 中国郑州市二七区嵩山南路\n18:01 中国郑州市二七区嵩山南路\n",
                "day07": "08:08 中国郑州市二七区郑飞国际酒店\n18:29 中国郑州市二七区嵩山南路\n18:08 中国郑州市二七区嵩山南路\n",
                "day06": "07:20 中国北京市通州区通朝大街105号\n18:02 中国郑州市二七区嵩山南路\n",
                "personCode": "002856",
                "day05": "08:50 \n19:58 ",
                "day13kqType": "1118100221",
                "day04": "08:49 \n20:03 ",
                "day14": "06:12 中国郑州市二七区郑飞国际酒店\n19:02 中国郑州市二七区嵩山路街道\n08:23 中国郑州市二七区淮南街\n",
                "day13": "08:01 中国郑州市二七区郑飞国际酒店\n18:12 中国郑州市二七区侯寨乡\n18:11 中国郑州市二七区侯寨乡\n18:11 中国郑州市二七区侯寨乡\n18:12 中国郑州市二七区侯寨乡\n",
                "day12": "10:20 中国石家庄市鹿泉区寺家庄镇\n18:08 中国郑州市二七区嵩山南路\n18:02 中国郑州市二七区河南省轻工业学校新校区\n18:08 中国郑州市二七区嵩山南路\n",
                "day11": "08:45 \n19:06 ",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/运营中心/品质监管部",
                "day06kqType": "1118100221",
                "postId": "F4B5D6B60110498FB9F89EC03DB604C1",
                "day18kqType": "1118100737",
                "day03": "---",
                "day01": "08:02 中国郑州市二七区郑飞国际酒店\n20:00 中国保定市定州市周村镇\n",
                "month": "2017-12",
                "day12kqType": "1118100221",
                "name": "李俄银",
                "personId": "11273",
                "day15kqType": "1118100221",
                "day25kqType": "1118100737",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:41 \n",
                "day19kqType": "1118100737",
                "day09kqType": "1118100221",
                "postName": "全过程品质总监",
                "day11kqType": "1118100222",
                "day21kqType": "1118100737",
                "day01kqType": "1118100221",
                "day16kqType": "1118100221",
                "day14kqType": "1118100221",
                "day08kqType": "1118100221",
                "day19": "08:48 \n18:18 ",
                "day18": "08:39 \n19:14 ",
                "day17": "---",
                "day15": "04:02 中国郑州市二七区郑飞国际酒店\n18:03 中国郑州市荥阳市米兰阳光苑4号楼\n",
                "day25": "08:41 \n18:46 ",
                "day24": "---",
                "day23": "---",
                "day22": "08:50 \n18:03 ",
                "day21": "08:40 \n18:26 ",
                "day20": "08:46 \n18:03 ",
                "day22kqType": "1118100737",
                "day02kqType": "1118100221",
                "day05kqType": "1118100737"
            },
            {
                "day20kqType": "1118100737",
                "day09": "---",
                "day07kqType": "1118100737",
                "day08": "08:28 \n18:58 ",
                "day07": "08:32 \n18:47 ",
                "day06": "08:44 \n18:02 ",
                "personCode": "002908",
                "day05": "08:37 \n18:27 ",
                "day13kqType": "1118100737",
                "day04": "08:54 \n18:52 ",
                "day14": "08:53 \n18:26 ",
                "day13": "08:55 \n18:07 ",
                "day12": " \n19:03 ",
                "day11": "08:51 \n18:16 ",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/运营中心/设计管理部",
                "day06kqType": "1118100737",
                "postId": "4522752B772248639220D32E308272F1",
                "day18kqType": "1118100220",
                "day03": "---",
                "day02": "---",
                "day01": "08:53 \n18:29 ",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "王启华",
                "personId": "11319",
                "day15kqType": "1118100737",
                "day25kqType": "1118100737",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:25 \n",
                "day19kqType": "1118100737",
                "postName": "景观设计师",
                "day11kqType": "1118100737",
                "day21kqType": "1118100737",
                "day01kqType": "1118100737",
                "day14kqType": "1118100737",
                "day08kqType": "1118100737",
                "day19": "08:41 \n18:41 ",
                "day18": " \n",
                "day17": "---",
                "day16": "---",
                "day15": "08:25 \n18:18 ",
                "day25": "08:52 \n18:12 ",
                "day24": "---",
                "day23": "---",
                "day22": "08:01 \n18:04 ",
                "day21": "08:08 \n18:08 ",
                "day20": "08:22 \n18:27 ",
                "day22kqType": "1118100737",
                "day05kqType": "1118100737"
            },
            {
                "day20kqType": "1118100223",
                "day09": "---",
                "day07kqType": "1118100223",
                "day08": "08:10 中国成都市武侯区世纪城路80号\n",
                "day07": "09:06 中国北京市顺义区三经路\n",
                "day06": "08:40 \n18:04 ",
                "personCode": "003265",
                "day05": "08:13 \n18:02 ",
                "day13kqType": "1118100737",
                "day04": "07:56 \n18:36 ",
                "day14": "08:15 中国北京市朝阳区建国路67号\n18:08 中国济南市槐荫区段兴西路25888号\n",
                "day13": "08:37 \n18:13 ",
                "day12": " \n18:42 ",
                "day11": "08:09 \n20:45 ",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/投资发展中心/投资发展部",
                "day06kqType": "1118100737",
                "postId": "3B26B595CAB14FE1A70389EEB942CFCB",
                "day18kqType": "1118100223",
                "day03": "---",
                "day02": "---",
                "day01": "07:52 \n18:50 ",
                "month": "2017-12",
                "day12kqType": "1118100223",
                "name": "谭晓峰",
                "personId": "11782",
                "day15kqType": "1118100223",
                "day25kqType": "1118100737",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "07:58 \n",
                "day19kqType": "1118100223",
                "postName": "总经理",
                "day11kqType": "1118100737",
                "day21kqType": "1118100223",
                "day01kqType": "1118100737",
                "day14kqType": "1118100223",
                "day08kqType": "1118100223",
                "day19": "08:55 中国成都市武侯区九方购物中心\n",
                "day18": "09:00 中国北京市朝阳区建国路77-81号\n18:03 中国北京市朝阳区建国路77-81号\n18:03 中国北京市朝阳区建国路77-81号\n",
                "day17": "---",
                "day16": "---",
                "day15": "20:38 中国北京市朝阳区建国路77-81号\n18:10 中国北京市朝阳区华贸广场路\n",
                "day25": "08:21 \n18:13 ",
                "day24": "---",
                "day23": "---",
                "day22": "08:41 \n19:07 ",
                "day21": "08:03 中国成都市武侯区天久南街\n",
                "day20": "08:59 中国成都市武侯区天顺路222号6-1806号\n",
                "day22kqType": "1118100737",
                "day05kqType": "1118100737"
            },
            {
                "day20kqType": "1118100737",
                "day09": "---",
                "day07kqType": "1118100220",
                "day08": " \n",
                "day07": "08:31 \n12:03 ",
                "day06": "08:17 \n18:01 ",
                "personCode": "003611",
                "day05": "08:22 \n18:01 ",
                "day13kqType": "1118100737",
                "day04": "08:37 \n18:01 ",
                "day14": "08:44 \n18:02 ",
                "day13": "08:50 \n18:03 ",
                "day12": " \n18:02 ",
                "day11": "08:47 \n18:34 ",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/运营中心/设计管理部",
                "day06kqType": "1118100737",
                "postId": "D355523A4B40477B995A10D4616CE39A",
                "day18kqType": "1118100737",
                "day03": "---",
                "day02": "---",
                "day01": "08:30 \n18:05 ",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "宋樱樱",
                "personId": "12233",
                "day15kqType": "1118100737",
                "day25kqType": "1118100223",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:03 \n",
                "day19kqType": "1118100737",
                "postName": "建筑设计经理",
                "day11kqType": "1118100737",
                "day21kqType": "1118100737",
                "day01kqType": "1118100737",
                "day14kqType": "1118100737",
                "day08kqType": "1118100220",
                "day19": "08:42 \n18:09 ",
                "day18": "08:51 \n18:02 ",
                "day17": "---",
                "day16": "---",
                "day15": "08:34 \n18:04 ",
                "day25": " \n",
                "day24": "---",
                "day23": "---",
                "day22": "08:43 \n18:02 ",
                "day21": "08:08 \n18:02 ",
                "day20": "08:57 \n18:12 ",
                "day22kqType": "1118100737",
                "day05kqType": "1118100737"
            },
            {
                "day20kqType": "1118100219",
                "day09": "---",
                "day07kqType": "1118100753",
                "day08": "",
                "day07": "",
                "day06": "08:57 中国北京市大兴区新源大街\n18:04 中国北京市大兴区新源大街\n",
                "personCode": "003615",
                "day05": "08:53 \n18:31 ",
                "day13kqType": "1118100219",
                "day04": "08:33 \n00:44 ",
                "day14": " \n",
                "day13": " \n",
                "day12": " \n",
                "day11": "08:33 \n",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/人力资源中心/人力行政部",
                "day06kqType": "1118100753",
                "postId": "A981817805624EB7ADA08576C4AD25CB",
                "day18kqType": "1118100219",
                "day03": "---",
                "day02": "---",
                "day01": "08:54 \n18:30 ",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "段继康",
                "personId": "12238",
                "day15kqType": "1118100753",
                "day25kqType": "1118100219",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": " \n",
                "day19kqType": "1118100219",
                "postName": "行政主管",
                "day11kqType": "1118100219",
                "day21kqType": "1118100219",
                "day01kqType": "1118100737",
                "day14kqType": "1118100219",
                "day08kqType": "1118100753",
                "day19": " \n",
                "day18": " \n",
                "day17": "---",
                "day16": "---",
                "day15": "",
                "day25": " \n",
                "day24": "---",
                "day23": "---",
                "day22": " \n",
                "day21": " \n",
                "day20": " \n",
                "day22kqType": "1118100219",
                "day05kqType": "1118100737"
            },
            {
                "day20kqType": "1118100219",
                "day09": "---",
                "day07kqType": "1118100219",
                "day08": "08:40 \n17:08 ",
                "day07": "08:48 \n17:15 ",
                "day06": "08:49 \n17:35 ",
                "personCode": "003782",
                "day05": "08:55 \n17:01 ",
                "day13kqType": "1118100219",
                "day04": "08:56 \n17:46 ",
                "day14": "08:46 \n17:04 ",
                "day13": "08:46 \n17:02 ",
                "day12": " \n17:02 ",
                "day11": "08:47 \n17:03 ",
                "day10": "---",
                "day04kqType": "1118100219",
                "orgName": "总部鑫苑/运营中心/设计管理部",
                "day06kqType": "1118100219",
                "postId": "D355523A4B40477B995A10D4616CE39A",
                "day18kqType": "1118100219",
                "day03": "---",
                "day02": "---",
                "day01": "08:51 \n17:02 ",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "刘冰",
                "personId": "12431",
                "day15kqType": "1118100219",
                "day25kqType": "1118100219",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:48 \n",
                "day19kqType": "1118100219",
                "postName": "建筑设计经理",
                "day11kqType": "1118100219",
                "day21kqType": "1118100219",
                "day01kqType": "1118100219",
                "day14kqType": "1118100219",
                "day08kqType": "1118100219",
                "day19": "08:44 \n17:16 ",
                "day18": "08:39 \n17:02 ",
                "day17": "---",
                "day16": "---",
                "day15": "08:17 \n17:07 ",
                "day25": "08:41 \n17:39 ",
                "day24": "---",
                "day23": "---",
                "day22": "08:45 \n17:06 ",
                "day21": "08:46 \n17:06 ",
                "day20": "08:37 \n17:24 ",
                "day22kqType": "1118100219",
                "day05kqType": "1118100219"
            },
            {
                "day20kqType": "1118100221",
                "day07kqType": "1118100221",
                "day08": "07:41 中国成都市武侯区世纪城路150号\n18:07 中国成都市武侯区世纪城路124号\n",
                "day17kqType": "1118100221",
                "day07": "07:55 中国成都市武侯区弈缘茶楼\n18:20 中国成都市武侯区天府二街\n",
                "day06": "08:34 中国成都市武侯区世纪城路154号\n18:34 中国成都市武侯区天府三街990号\n",
                "personCode": "003784",
                "day05": "07:03 中国北京市朝阳区宏昌路\n18:11 中国成都市武侯区世纪城路150号\n",
                "day13kqType": "1118100737",
                "day04": "08:18 \n18:05 ",
                "day14": "07:05 中国北京市朝阳区望京西园417号楼\n18:26 中国成都市武侯区世纪城路150号\n",
                "day13": "08:25 \n18:02 ",
                "day12": " \n18:04 ",
                "day11": "08:34 \n18:12 ",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/投资发展中心/投资发展部",
                "day06kqType": "1118100221",
                "postId": "58851927AC9F42819FA0F86E499900FD",
                "day18kqType": "1118100221",
                "day03": "---",
                "day02": "---",
                "day01": "08:14 中国成都市武侯区交易所大厦\n18:05 中国北京市朝阳区广顺北大街\n",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "邬鑫",
                "personId": "12433",
                "day15kqType": "1118100221",
                "day25kqType": "1118100219",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "07:31 \n",
                "day19kqType": "1118100221",
                "day09kqType": "1118100221",
                "postName": "投资经理",
                "day11kqType": "1118100737",
                "day21kqType": "1118100220",
                "day01kqType": "1118100221",
                "day14kqType": "1118100221",
                "day08kqType": "1118100221",
                "day19": "08:22 中国成都市武侯区天泰路287号\n18:05 中国成都市武侯区天府二街\n",
                "day18": "08:34 中国成都市武侯区天顺南街\n18:20 中国成都市武侯区天府二街\n",
                "day16": "---",
                "day15": "08:32 中国成都市武侯区弈缘茶楼\n18:05 中国成都市武侯区天府二街740号\n",
                "day25": "08:19 \n15:33 ",
                "day24": "---",
                "day23": "---",
                "day22": " \n",
                "day21": "08:18 \n12:01 ",
                "day20": "07:49 中国成都市武侯区天泰路\n19:48 中国北京市顺义区天竺镇\n",
                "day22kqType": "1118100220",
                "day05kqType": "1118100221"
            },
            {
                "day20kqType": "1118100219",
                "day09": "---",
                "day07kqType": "1118100219",
                "day08": " \n",
                "day07": " \n",
                "day06": " \n",
                "personCode": "003887",
                "day05": " \n",
                "day13kqType": "1118100219",
                "day04": " \n",
                "day14": " \n",
                "day13": " \n",
                "day12": " \n",
                "day11": " \n",
                "day10": "---",
                "day04kqType": "1118100219",
                "orgName": "总部鑫苑/运营中心/设计管理部",
                "day06kqType": "1118100219",
                "postId": "D4B24EAC363141039F3FBC9988896ADC",
                "day18kqType": "1118100219",
                "day03": "---",
                "day02": "---",
                "day01": " \n",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "胡伟",
                "personId": "12539",
                "day15kqType": "1118100219",
                "day25kqType": "1118100219",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": " \n",
                "day19kqType": "1118100219",
                "postName": "机电设计总监",
                "day11kqType": "1118100219",
                "day21kqType": "1118100219",
                "day01kqType": "1118100219",
                "day14kqType": "1118100219",
                "day08kqType": "1118100219",
                "day19": " \n",
                "day18": " \n",
                "day17": "---",
                "day16": "---",
                "day15": " \n",
                "day25": " \n",
                "day24": "---",
                "day23": "---",
                "day22": " \n",
                "day21": " \n",
                "day20": " \n",
                "day22kqType": "1118100219",
                "day05kqType": "1118100219"
            },
            {
                "day20kqType": "1118100737",
                "day09": "---",
                "day07kqType": "1118100737",
                "day08": "08:42 \n18:57 ",
                "day07": "08:48 \n18:48 ",
                "day06": "07:00 中国青岛市黄岛区长江西路157-1号楼\n19:58 中国北京市朝阳区郎家园东路\n07:00 中国青岛市黄岛区长江西路157-1号楼\n19:37 中国北京市朝阳区郎家园东路\n",
                "personCode": "003890",
                "day05": "08:48 中国青岛市黄岛区长江西路80号\n18:50 中国青岛市黄岛区长江中路366号\n",
                "day13kqType": "1118100737",
                "day04": "08:44 中国北京市朝阳区建国路77-81\n12:01 中国北京市朝阳区建国路77-81号\n12:01 中国北京市朝阳区建国路77-81号\n12:01 中国北京市朝阳区建国路77-81号\n18:29 中国青岛市黄岛区329省道\n12:01 中国北京市朝阳区建国路77-81号\n",
                "day14": "08:55 \n19:17 ",
                "day13": "08:50 \n18:19 ",
                "day12": " \n20:06 ",
                "day11": "08:48 \n19:30 ",
                "day10": "---",
                "day04kqType": "1118100221",
                "orgName": "总部鑫苑/运营中心/设计管理部",
                "day06kqType": "1118100221",
                "postId": "54FDC9D12C154F438778ADA1B8207D0A",
                "day18kqType": "1118100737",
                "day03": "---",
                "day02": "---",
                "day01": "08:50 \n18:12 ",
                "month": "2017-12",
                "day12kqType": "1118100219",
                "name": "唐海江",
                "personId": "12542",
                "day15kqType": "1118100222",
                "day25kqType": "1118100220",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:44 \n",
                "day19kqType": "1118100737",
                "postName": "装饰设计经理",
                "day11kqType": "1118100737",
                "day21kqType": "1118100222",
                "day01kqType": "1118100737",
                "day14kqType": "1118100737",
                "day08kqType": "1118100737",
                "day19": "08:48 \n19:14 ",
                "day18": "08:52 \n20:14 ",
                "day17": "---",
                "day16": "---",
                "day15": "08:55 \n19:22 ",
                "day25": " \n",
                "day24": "---",
                "day23": "---",
                "day22": "08:44 \n20:22 ",
                "day21": "08:52 \n18:15 ",
                "day20": "08:49 \n18:29 ",
                "day22kqType": "1118100737",
                "day05kqType": "1118100221"
            },
            {
                "day20kqType": "1118100221",
                "day07kqType": "1118100221",
                "day08": "07:51 中国河南省郑州市二七区大学南路5号\n21:15 中国河南省郑州市二七区淮河西路36号\n",
                "day07": "08:24 中国河南省郑州市二七区大学南路5号\n22:35 中国河南省郑州市二七区汉江路\n",
                "day23kqType": "1118100221",
                "day06": "08:50 中国北京市丰台区广莲路\n18:08 中国河南省郑州市二七区嵩山南路辅路\n",
                "personCode": "003920",
                "day05": "08:42 \n19:57 ",
                "day13kqType": "1118100221",
                "day04": "08:50 \n18:31 ",
                "day14": "08:16 中国河南省郑州市二七区淮南街\n18:07 中国河南省郑州市二七区\n",
                "day13": "08:42 中国河南省郑州市二七区南三环辅路\n18:58 中国河南省郑州市二七区郑密路188\n08:42 中国河南省郑州市二七区南三环辅路\n",
                "day12": "08:25 中国北京市西城区广安门内大街309号\n18:07 中国河南省郑州市二七区嵩山南路\n",
                "day11": "08:50 \n18:08 ",
                "day10": "---",
                "day04kqType": "1118100737",
                "orgName": "总部鑫苑/运营中心/品质监管部",
                "day06kqType": "1118100221",
                "day24kqType": "1118100221",
                "postId": "558dd13c88804e549369268609e7b206",
                "day18kqType": "1118100737",
                "day03": "---",
                "day01": "08:20 中国河南省郑州市二七区大学南路5号\n18:08 中国北京市丰台区广莲路8号\n18:08 中国北京市丰台区广莲路8号\n",
                "month": "2017-12",
                "day12kqType": "1118100221",
                "name": "宁红文",
                "personId": "12575",
                "day15kqType": "1118100221",
                "day25kqType": "1118100221",
                "day29": " \n",
                "day28": " \n",
                "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
                "day27": " \n",
                "day26": "08:23 \n",
                "day19kqType": "1118100221",
                "day09kqType": "1118100221",
                "postName": "品质副总监",
                "day11kqType": "1118100737",
                "day21kqType": "1118100221",
                "day01kqType": "1118100221",
                "day16kqType": "1118100221",
                "day14kqType": "1118100221",
                "day08kqType": "1118100221",
                "day19": "06:49 中国北京市通州区梨园路7号\n20:08 中国河南省郑州市二七区人和路\n",
                "day18": "08:40 \n18:07 ",
                "day17": "---",
                "day15": "07:30 中国河南省郑州市二七区淮南街\n18:10 中国河南省郑州市荥阳市郑上路辅路\n",
                "day25": "08:50 中国河南省郑州市荥阳市G310(郑上路)\n18:46 中国河南省郑州市二七区大学南路5号\n",
                "day22": "08:39 中国河南省郑州市二七区大学南路5号\n18:07 中国河南省郑州市二七区南四环辅路\n",
                "day21": "08:46 中国河南省郑州市二七区大学南路\n19:23 中国河南省郑州市二七区大学南路18号\n",
                "day20": "08:32 中国河南省郑州市二七区大学南路5号\n18:07 中国河南省郑州市荥阳市广武路\n",
                "day22kqType": "1118100221",
                "day02kqType": "1118100221",
                "day05kqType": "1118100737"
            }
        ];


        for (var i = 0; i <= mydata.length; i++) {
            jQuery("#listResultByDay").jqGrid('addRowData', i + 1, mydata[i]);
        }
        // resizeHeight();
    };

    window.emptyCodeInfo = function (codeName, codeId) {
        $("#" + codeName).val("");
        $("#" + codeId).val("");
    };
    window.onchangeKqSummary = function () {
        var name = $("#name").val();
        var orgId = $("#orgId").val();
        var month = $("#month1").val();
        var status = $("#personStatus").val();
        var queryDataByDay = {
            "orgId": orgId,
            "name": name,
            "date": month,
            "status": status
        };
        daysInit();
        resultByDayInit(queryDataByDay);
        queryConditionList();
    };

    window.onchangeKqSummaryByMonth = function () {
        var orgId = $("#orgId").val();
        var date = $("#month2").val();
        var name = $("#name2").val();
        var queryDataByMonth = {
            "orgId": orgId,
            "name": name,
            "date": date
        };
        daysInitByMonth();
        jQuery("#listResultByMonth").jqGrid("setGridParam", {
            postData: queryDataByMonth,
            page: 1
        }).trigger("reloadGrid");
    };


    function orgFormatter(cellValue, options, rowObject) {
        var orgName = $.hrUtils.getHROrgNameById(cellValue);
        if (orgName != null) {
            return orgName;
        } else {
            return "";
        }
    }

    function postFormatter(cellValue, options, rowObject) {
        var postName = $.hrUtils.getHRPostNameById(cellValue);
        if (postName != null) {
            return postName;
        } else {
            return "";
        }
    }


    window.initDatetimepicker = function () {
        var picker = $('.datetimepickerM').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN'
        });
    };

    /**
     * 考勤统计：月结果
     * */
    window.resultByMonthInit = function (postData) {
        // var date = $("#month2").val();
        var ubody = "kq/hrKqSummary/queryKqResultListByMonth";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#listResultByMonth").jqGrid(
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
                colModel: [
                    {name: 'orgName', label: "所属机构", width: 150, align: "center"},
                    {name: 'postName', label: "岗位", width: 150, align: "center"},
                    {name: 'date', label: "月份", width: 100, align: "center"},
                    {name: 'personName', label: "姓名", width: 100, align: "center"},
                    {name: 'personCode', label: "人员编号", width: 100, align: "center"},
                    {name: 'shouldAttendanceDays', label: "应出勤时长(天)", width: 80, align: "center"},
                    {name: 'realAttendanceDays', label: "实出勤时长(天)", width: 80, sortable: false, align: "center"},
                    {name: 'lateBuffer', label: "迟到的天数", width: 80, hidden: true, align: "center"},
                    {name: 'leaveEarlyBuffer', label: "早退的天数", width: 80, hidden: true, align: "center"},
                    {
                        name: 'bussTripDays',
                        label: "出差天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: bussFormatter
                    },
                    {
                        name: 'bussTripOfCityDays',
                        label: "市内公出天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: cityBussFormatter
                    },
                    {
                        name: 'lateDays',
                        label: "迟到次数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqLateFormatter
                    },
                    {
                        name: 'leaveEarlyDays',
                        label: "早退次数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqLeaveEarlyFormatter
                    },
                    {
                        name: 'absenteeismDays',
                        label: "旷工天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqAbsenceFormatter
                    },
                    {
                        name: 'noSignDays',
                        label: "漏打卡天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqNoSignFormatter
                    },
                    {
                        name: 'restInApprovalDays',
                        label: "请假审批中",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqRestInApprovalFormatter
                    },
                    {
                        name: 'bussInApprovalDays',
                        label: "出差审批中",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqBussInApprovalFormatter
                    },
                    {
                        name: 'noPunchInApprovalDays',
                        label: "未打卡审批中",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqNoSignInApprovalFormatter
                    },
                    {
                        name: 'inCityBussInApprovalDays',
                        label: "市内公出审批中",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqBussPublicInApprovalFormatter
                    },
                    {name: 'details', label: "旷工与迟到早退详情", width: 250, sortable: false, align: "center"},
                    {
                        name: 'annualLeave',
                        label: "年假",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqAnnualLeaveFormatter
                    },
                    {
                        name: 'absenceLeave',
                        label: "事假",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqAbsenceLeaveFormatter
                    },
                    {
                        name: 'sickLeave',
                        label: "病假",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqSickLeaveFormatter
                    },
                    {
                        name: 'maritalLeave',
                        label: "婚假",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqMaritalLeaveFormatter
                    },
                    {
                        name: 'maternityLeave',
                        label: "产假",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqMaternityLeaveFormatter
                    },
                    // {name: 'replenishSignDays', label: "补签天数", width: 80, sortable: false, align: "center"},
                    {
                        name: 'paidLeaveDays',
                        label: "带薪假天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqPaidLeaveFormatter
                    },
                    {
                        name: 'otherLeaveDays',
                        label: "其他请假天数",
                        width: 80,
                        sortable: false,
                        align: "center",
                        formatter: kqOtherLeaveFormatter
                    },
                    {name: 'leaveDetail', label: "请假详情", width: 150, sortable: false, align: "center"}
                ],
                height: $(window).height() - 150,
                rowNum: 20,//一页显示多少条 -1全部
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager3',//表格页脚的占位符(一般是div)的id
                page: 1,
                // sortname: "id",//初始化的时候排序的字段
                // sortorder: "desc",//排序方式,可选desc,asc
                viewrecords: true, //定义是否要显示总记录数
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    // $("#listResultByMonth").setGridHeight($('#month').height() - 75);
                    $("table#listResultByMonth").jqGrid().setGridHeight($('.mytable').height() - 70);

                    // var width = $("#dayDiv").width();
                    // $("#pager3").width(width - 10);
                    $.xljUtils.addGridScroll("tableMonth");
                    // $.xljUtils.gridResizeFn();
                    $("body").find($(".tableMonth")).getNiceScroll().show().resize();
                }
            });
        var mydata = [{
            "personId": "0240e599abc148d8be443e06c94e02fd",
            "personName": "张晶晶",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/人力资源中心/人力行政部",
            "postId": "e54cd3de64ad482c978247cd12899925",
            "postName": "档案主管",
            "personCode": "",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 1,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "",
            "lateBuffer": "2017-12-12,",
            "noSignDays": 1,
            "annualLeave": 0,
            "absenceLeave": 1,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "2017-12-12未签到，",
            "leaveDetail": "2017-12-06 请事假1.0天，",
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "05bf1d5bd2b94e148f432f8d8104847a",
            "personName": "陈仲曦",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/营销管理部",
            "postId": "f81b43320a0948ae8d903d5cf821dea4",
            "postName": "策划高级经理",
            "personCode": "",
            "date": "2017-12",
            "shouldAttendanceDays": 20,
            "realAttendanceDays": 20,
            "bussTripDays": 6,
            "bussTripOfCityDays": 0,
            "lateDays": 2,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "",
            "lateBuffer": "2017-12-04,2017-12-12,",
            "noSignDays": 2,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "2017-12-04迟到483分钟，2017-12-12未签到，",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11029",
            "personName": "李维",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/人力资源中心/人力行政部",
            "postId": "5687a5a4a2ac49ada47526b4bde3ead5",
            "postName": "薪酬经理",
            "personCode": "002617",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 4,
            "leaveEarlyDays": 3,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "2017-12-04,2017-12-25,2017-12-14,",
            "lateBuffer": "2017-12-18,2017-12-12,2017-12-22,2017-12-05,",
            "noSignDays": 7,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "2017-12-04未签退，2017-12-18迟到109分钟，2017-12-12未签到，2017-12-25未签退，2017-12-14未签退，2017-12-22迟到132分钟，2017-12-05迟到85分钟，",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11037",
            "personName": "殷蕊蕊",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/设计管理部",
            "postId": "51b72171338b48249aecbd73ffda04bd",
            "postName": "景观设计经理",
            "personCode": "002625",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 2,
            "bussTripOfCityDays": 0,
            "lateDays": 1,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "",
            "lateBuffer": "2017-12-12,",
            "noSignDays": 1,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "2017-12-12未签到，",
            "leaveDetail": "2017-12-27 请年假1.0天，",
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11101",
            "personName": "黄兄",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/人力资源中心/人力行政部",
            "postId": "47fa69871fe644f0aeda7dda2d889ef2",
            "postName": "组织发展副总监",
            "personCode": "002686",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 1.5,
            "bussTripOfCityDays": 0,
            "lateDays": 2,
            "leaveEarlyDays": 2,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "2017-12-11,2017-12-21,",
            "lateBuffer": "2017-12-12,2017-12-25,",
            "noSignDays": 4,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "2017-12-12未签到，2017-12-25迟到5分钟，2017-12-11未签退，2017-12-21未签退，",
            "leaveDetail": "2017-12-29 请年假1.0天，",
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11118",
            "personName": "刘宝莉",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/设计管理部",
            "postId": "A35A96FC84E74B9C88AD1A89669F6FB1",
            "postName": "建筑设计经理",
            "personCode": "002703",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 1,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "",
            "lateBuffer": "2017-12-12,",
            "noSignDays": 1,
            "annualLeave": 2.5,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 2.5,
            "otherLeaveDays": 0,
            "details": "2017-12-12未签到，",
            "leaveDetail": "2017-12-22 请年假1.0天，2017-12-13 请年假0.5天，2017-12-15 请年假0.5天，2017-12-25 请年假0.5天，",
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11133",
            "personName": "姜阔",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/成本管理部",
            "postId": "7177648F7676489EBD42E2F82B3DCF0A",
            "postName": "招采经理",
            "personCode": "002718",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 1,
            "leaveEarlyDays": 10,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "2017-12-07,2017-12-13,2017-12-04,2017-12-06,2017-12-26,2017-12-15,2017-12-11,2017-12-14,2017-12-08,2017-12-05,",
            "lateBuffer": "2017-12-12,",
            "noSignDays": 11,
            "annualLeave": 1,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 1,
            "otherLeaveDays": 0,
            "details": "2017-12-07早退55分钟，2017-12-13早退54分钟，2017-12-04早退58分钟，2017-12-06早退53分钟，2017-12-26未签退，2017-12-12未签到，2017-12-15早退52分钟，2017-12-11早退50分钟，2017-12-14早退52分钟，2017-12-08早退54分钟，2017-12-05早退52分钟，",
            "leaveDetail": "2017-12-01 请年假1.0天，",
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11134",
            "personName": "金万成",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/品质监管部",
            "postId": "B9809FA1EF45423294F5740CF9166D89",
            "postName": "品质经理",
            "personCode": "002719",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 11,
            "bussTripOfCityDays": 0,
            "lateDays": 0,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": null,
            "leaveEarlyBuffer": null,
            "lateBuffer": null,
            "noSignDays": 0,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11195",
            "personName": "许启川",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/财务管理中心/财务核算部",
            "postId": "A551D2800E054A41B474CE96AC765172",
            "postName": "投资者关系副总监",
            "personCode": "002778",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 1,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "",
            "lateBuffer": "2017-12-12,",
            "noSignDays": 1,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "2017-12-12未签到，",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11214",
            "personName": "刘朝阳",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/人力资源中心/人力行政部",
            "postId": "2C9A48980BA943478B6CB78EBCE6C880",
            "postName": "司机",
            "personCode": "002797",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 3,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 0,
            "leaveEarlyDays": 0,
            "absenteeismDays": 18,
            "absenteeismBuffer": "2017-12-20,2017-12-07,2017-12-13,2017-12-04,2017-12-06,2017-12-26,2017-12-18,2017-12-12,2017-12-15,2017-12-25,2017-12-19,2017-12-11,2017-12-21,2017-12-01,2017-12-14,2017-12-08,2017-12-22,2017-12-05,",
            "leaveEarlyBuffer": "",
            "lateBuffer": "",
            "noSignDays": 18,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "2017-12-20：旷工1天，2017-12-07：旷工1天，2017-12-13：旷工1天，2017-12-04：旷工1天，2017-12-06：旷工1天，2017-12-26：旷工1天，2017-12-18：旷工1天，2017-12-12：旷工1天，2017-12-15：旷工1天，2017-12-25：旷工1天，2017-12-19：旷工1天，2017-12-11：旷工1天，2017-12-21：旷工1天，2017-12-01：旷工1天，2017-12-14：旷工1天，2017-12-08：旷工1天，2017-12-22：旷工1天，2017-12-05：旷工1天，",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11273",
            "personName": "李俄银",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/品质监管部",
            "postId": "F4B5D6B60110498FB9F89EC03DB604C1",
            "postName": "全过程品质总监",
            "personCode": "002856",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 10.5,
            "bussTripOfCityDays": 0,
            "lateDays": 0,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": null,
            "leaveEarlyBuffer": null,
            "lateBuffer": null,
            "noSignDays": 0,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11319",
            "personName": "王启华",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/设计管理部",
            "postId": "4522752B772248639220D32E308272F1",
            "postName": "景观设计师",
            "personCode": "002908",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 1,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "",
            "lateBuffer": "2017-12-12,",
            "noSignDays": 1,
            "annualLeave": 1,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 1,
            "otherLeaveDays": 0,
            "details": "2017-12-12未签到，",
            "leaveDetail": "2017-12-27 请年假1.0天，2017-12-18 请年假1.0天，",
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "11782",
            "personName": "谭晓峰",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/投资发展中心/投资发展部",
            "postId": "3B26B595CAB14FE1A70389EEB942CFCB",
            "postName": "总经理",
            "personCode": "003265",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 0,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": null,
            "leaveEarlyBuffer": null,
            "lateBuffer": null,
            "noSignDays": 0,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 1,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "12233",
            "personName": "宋樱樱",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/设计管理部",
            "postId": "D355523A4B40477B995A10D4616CE39A",
            "postName": "建筑设计经理",
            "personCode": "003611",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 1,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "",
            "lateBuffer": "2017-12-12,",
            "noSignDays": 1,
            "annualLeave": 1.5,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 1.5,
            "otherLeaveDays": 0,
            "details": "2017-12-12未签到，",
            "leaveDetail": "2017-12-25 请病假1.0天，2017-12-07至2017-12-08 请年假1.5天，",
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "12238",
            "personName": "段继康",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/人力资源中心/人力行政部",
            "postId": "A981817805624EB7ADA08576C4AD25CB",
            "postName": "行政主管",
            "personCode": "003615",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 11,
            "bussTripDays": 0,
            "bussTripOfCityDays": 4,
            "lateDays": 0,
            "leaveEarlyDays": 1,
            "absenteeismDays": 10,
            "absenteeismBuffer": "2017-12-20,2017-12-13,2017-12-26,2017-12-18,2017-12-12,2017-12-25,2017-12-19,2017-12-21,2017-12-14,2017-12-22,",
            "leaveEarlyBuffer": "2017-12-11,",
            "lateBuffer": "",
            "noSignDays": 11,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "2017-12-20：旷工1天，2017-12-13：旷工1天，2017-12-26：旷工1天，2017-12-18：旷工1天，2017-12-12：旷工1天，2017-12-25：旷工1天，2017-12-19：旷工1天，2017-12-11未签退，2017-12-21：旷工1天，2017-12-14：旷工1天，2017-12-22：旷工1天，",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "12431",
            "personName": "刘冰",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/设计管理部",
            "postId": "D355523A4B40477B995A10D4616CE39A",
            "postName": "建筑设计经理",
            "personCode": "003782",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 1,
            "leaveEarlyDays": 17,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "2017-12-20,2017-12-07,2017-12-13,2017-12-04,2017-12-06,2017-12-26,2017-12-18,2017-12-15,2017-12-25,2017-12-19,2017-12-11,2017-12-21,2017-12-01,2017-12-14,2017-12-08,2017-12-22,2017-12-05,",
            "lateBuffer": "2017-12-12,",
            "noSignDays": 18,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "2017-12-20早退36分钟，2017-12-07早退45分钟，2017-12-13早退58分钟，2017-12-04早退14分钟，2017-12-06早退25分钟，2017-12-26早退57分钟，2017-12-18早退58分钟，2017-12-12未签到，2017-12-15早退53分钟，2017-12-25早退21分钟，2017-12-19早退44分钟，2017-12-11早退57分钟，2017-12-21早退54分钟，2017-12-01早退58分钟，2017-12-14早退56分钟，2017-12-08早退52分钟，2017-12-22早退54分钟，2017-12-05早退59分钟，",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "12433",
            "personName": "邬鑫",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/投资发展中心/投资发展部",
            "postId": "58851927AC9F42819FA0F86E499900FD",
            "postName": "投资经理",
            "personCode": "003784",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 11,
            "bussTripOfCityDays": 0,
            "lateDays": 1,
            "leaveEarlyDays": 1,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "2017-12-25,",
            "lateBuffer": "2017-12-12,",
            "noSignDays": 2,
            "annualLeave": 1.5,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 1.5,
            "otherLeaveDays": 0,
            "details": "2017-12-12未签到，2017-12-25早退147分钟，",
            "leaveDetail": "2017-12-21至2017-12-22 请年假1.5天，",
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "12539",
            "personName": "胡伟",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/设计管理部",
            "postId": "D4B24EAC363141039F3FBC9988896ADC",
            "postName": "机电设计总监",
            "personCode": "003887",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 3,
            "bussTripDays": 0,
            "bussTripOfCityDays": 0,
            "lateDays": 0,
            "leaveEarlyDays": 0,
            "absenteeismDays": 18,
            "absenteeismBuffer": "2017-12-20,2017-12-07,2017-12-13,2017-12-04,2017-12-06,2017-12-26,2017-12-18,2017-12-12,2017-12-15,2017-12-25,2017-12-19,2017-12-11,2017-12-21,2017-12-01,2017-12-14,2017-12-08,2017-12-22,2017-12-05,",
            "leaveEarlyBuffer": "",
            "lateBuffer": "",
            "noSignDays": 18,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "2017-12-20：旷工1天，2017-12-07：旷工1天，2017-12-13：旷工1天，2017-12-04：旷工1天，2017-12-06：旷工1天，2017-12-26：旷工1天，2017-12-18：旷工1天，2017-12-12：旷工1天，2017-12-15：旷工1天，2017-12-25：旷工1天，2017-12-19：旷工1天，2017-12-11：旷工1天，2017-12-21：旷工1天，2017-12-01：旷工1天，2017-12-14：旷工1天，2017-12-08：旷工1天，2017-12-22：旷工1天，2017-12-05：旷工1天，",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "12542",
            "personName": "唐海江",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/设计管理部",
            "postId": "54FDC9D12C154F438778ADA1B8207D0A",
            "postName": "装饰设计经理",
            "personCode": "003890",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 2.5,
            "bussTripOfCityDays": 0,
            "lateDays": 1,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": "",
            "leaveEarlyBuffer": "",
            "lateBuffer": "2017-12-12,",
            "noSignDays": 1,
            "annualLeave": 1,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 1,
            "otherLeaveDays": 0,
            "details": "2017-12-12未签到，",
            "leaveDetail": "2017-12-25 请年假1.0天，",
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }, {
            "personId": "12575",
            "personName": "宁红文",
            "orgId": "8cfa118d88a04689a66eed5122cf9c7a",
            "orgName": "总部鑫苑/运营中心/品质监管部",
            "postId": "558dd13c88804e549369268609e7b206",
            "postName": "品质副总监",
            "personCode": "003920",
            "date": "2017-12",
            "shouldAttendanceDays": 21,
            "realAttendanceDays": 21,
            "bussTripDays": 19,
            "bussTripOfCityDays": 0,
            "lateDays": 0,
            "leaveEarlyDays": 0,
            "absenteeismDays": 0,
            "absenteeismBuffer": null,
            "leaveEarlyBuffer": null,
            "lateBuffer": null,
            "noSignDays": 0,
            "annualLeave": 0,
            "absenceLeave": 0,
            "sickLeave": 0,
            "maritalLeave": 0,
            "maternityLeave": 0,
            "paidLeaveDays": 0,
            "otherLeaveDays": 0,
            "details": "",
            "leaveDetail": null,
            "restInApprovalDays": 0,
            "bussInApprovalDays": 0,
            "noPunchInApprovalDays": 0,
            "inCityBussInApprovalDays": 0
        }];

        for (var i = 0; i <= mydata.length; i++) {
            jQuery("#listResultByMonth").jqGrid('addRowData', i + 1, mydata[i]);
        }

    };

    /**
     * 考勤统计：月结果出差详细信息
     * */
    window.bussList = function (postData) {
        var ubody = "kq/hrKqSummary/queryBussDetail";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#bussList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    // {name: 'personId', label: "申请人", width: 100, align: "center", sortable: false},
                    {name: 'personName', label: "申请人", width: 100, align: "center", sortable: false},
                    // {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                    {name: 'applyTripDays', label: "出差天数", width: 100, sortable: false, align: "center"},
                    {name: 'location', label: "出发地点", width: 100, sortable: false, align: "center"},
                    {name: 'destination', label: "到达地点", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'}
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'}
                    },
                    {name: 'statusValue', label: "审批状态", width: 100, align: "center"},
                    {name: 'destroyStatusValue', label: "销出差状态", width: 100, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#bussList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：市内公出详情
     * @param postData
     */
    window.cityBussList = function (postData) {
        var ubody = "kq/hrKqSummary/queryCityBussDetail";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#cityBussList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    // {name: 'personId', label: "申请人", width: 100, align: "center", sortable: false},
                    {name: 'personName', label: "申请人", width: 100, align: "center", sortable: false},
                    // {name: 'deptName', label: "申请人所属机构", width: 150, align: "center"},
                    {name: 'applyTripDays', label: "出差天数", width: 100, sortable: false, align: "center"},
                    {name: 'location', label: "出发地点", width: 100, sortable: false, align: "center"},
                    {name: 'destination', label: "到达地点", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'}
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'}
                    },
                    {name: 'statusValue', label: "审批状态", width: 100, align: "center"},
                    {name: 'destroyStatusValue', label: "销出差状态", width: 100, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#cityBussList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：迟到详情
     * @param postData
     */
    window.kqLateList = function (postData) {
        var ubody = "kq/hrKqSummary/queryKqLateDetail";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqLateList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'person_id', label: "id", hidden: true, width: 150, align: "center", sortable: false},
                    {name: 'person_name', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'sign_date', label: "打卡日期", width: 100, align: "center", sortable: false},
                    {name: 'shift_name', label: "班次", width: 100, align: "center", sortable: false},
                    {
                        name: 'workin_time',
                        label: "应签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signInTime',
                        label: "实签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        sortable: false
                    },
                    {
                        name: 'workout_time',
                        label: "应签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signOutTime',
                        label: "实签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    // {name: 'sign_address', label: "打卡地址", width: 150, align: "center"}
                    {name: 'signInAddress', label: "签到地址", width: 150, align: "center", sortable: false},
                    {name: 'signOutAddress', label: "签退地址", width: 150, align: "center", sortable: false}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqLateList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：早退详情
     * @param postData
     */
    window.kqLeaveEarlyList = function (postData) {
        var ubody = "kq/hrKqSummary/queryKqLeaveEarlyDetail";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqLeaveEarlyList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'person_id', label: "id", hidden: true, width: 150, align: "center", sortable: false},
                    {name: 'person_name', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'sign_date', label: "打卡日期", width: 100, align: "center", sortable: false},
                    {name: 'shift_name', label: "班次", width: 100, align: "center", sortable: false},
                    {
                        name: 'workin_time',
                        label: "应签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signInTime',
                        label: "实签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        sortable: false
                    },
                    {
                        name: 'workout_time',
                        label: "应签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signOutTime',
                        label: "实签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    // {name: 'sign_address', label: "打卡地址", width: 150, align: "center"}
                    {name: 'signInAddress', label: "签到地址", width: 150, align: "center", sortable: false},
                    {name: 'signOutAddress', label: "签退地址", width: 150, align: "center", sortable: false}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqLeaveEarlyList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：旷工详情
     * @param postData
     */
    window.kqAbsenceList = function (postData) {
        var ubody = "kq/hrKqSummary/queryAbsenceDetail";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqAbsenceList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'person_id', label: "id", hidden: true, width: 150, align: "center", sortable: false},
                    {name: 'person_name', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'sign_date', label: "打卡日期", width: 100, align: "center", sortable: false},
                    {name: 'shift_name', label: "班次", width: 100, align: "center", sortable: false},
                    {
                        name: 'workin_time',
                        label: "应签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signInTime',
                        label: "实签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        sortable: false
                    },
                    {
                        name: 'workout_time',
                        label: "应签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signOutTime',
                        label: "实签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    }
                ],

                // width: $('.mytable').width() - 150,
                height: $('.mytable').height() - 70,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：漏打卡天数
     * @param postData
     */
    window.kqNoSignList = function (postData) {
        //未打卡详情（无请假、出差、未打卡，包括审批中和已审批）
        // var ubody = "kq/hrKqSummary/queryNoSignDetail";
        var ubody = "kq/hrKqSummary/queryUnusualDaysInfo";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqNoSignList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'person_id', label: "id", hidden: true, width: 150, align: "center", sortable: false},
                    {name: 'person_name', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'sign_date', label: "打卡日期", width: 100, align: "center", sortable: false},
                    {name: 'shift_name', label: "班次", width: 100, align: "center", sortable: false},
                    {
                        name: 'workin_time',
                        label: "应签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signInTime',
                        label: "实签到时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        sortable: false
                    },
                    {
                        name: 'workout_time',
                        label: "应签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    {
                        name: 'signOutTime',
                        label: "实签退时间",
                        width: 150,
                        align: "center",
                        formatter: "date",
                        formatoptions: {srcformat: 'Y-m-d H:i', newformat: 'Y-m-d H:i'},
                        // formatter: StrLenFormat,
                        sortable: false
                    },
                    // {name: 'sign_address', label: "打卡地址", width: 150, align: "center"}
                    {name: 'signInAddress', label: "签到地址", width: 150, align: "center", sortable: false},
                    {name: 'signOutAddress', label: "签退地址", width: 150, align: "center", sortable: false}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqNoSignList").jqGrid('setSelection', result[0].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };
    /**
     * 考勤统计：请假审批中
     * @param postData
     */
    window.kqRestInApprovalList = function (postData) {
        var ubody = "kq/hrKqRest/queryApplyList2";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqRestInApprovalList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "请假开始日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {
                        name: 'applyEndDate',
                        label: "请假结束日期",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {name: 'status', label: "状态", width: 100, sortable: false, align: "center"},
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };
    /**
     * 考勤统计：出差审批中
     * @param postData
     */
    window.kqBussInApprovalList = function (postData) {
        var ubody = "kq/hrKqBussTrip/queryApplyList2";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqBussInApprovalList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {
                        name: 'applyStartDate',
                        label: "出差开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {
                        name: 'applyEndDate',
                        label: "出差结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {name: 'applyTripDays', label: "出差天数", width: 100, sortable: false, align: "center"},
                    {name: 'status', label: "状态", width: 100, sortable: false, align: "center"},
                    {name: 'reason', label: "出差事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };
    /**
     * 考勤统计：未打卡审批中
     * @param postData
     */
    window.kqNoSignInApprovalList = function (postData) {
        var ubody = "kq/hrKqNotPunch/queryApplyList2";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqNoSignInApprovalList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    // {name: 'shiftName', label: "班次", width: 100, sortable: false, align: "center"},
                    {name: 'notPunchDate2', label: "未打卡日期", width: 100, sortable: false, align: "center"},
                    {name: 'signTypeValue', label: "补卡类型", width: 100, sortable: false, align: "center"},
                    {name: 'status', label: "状态", width: 100, sortable: false, align: "center"},
                    {name: 'reason', label: "未打卡事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：市内公出审批中
     * @param postData
     */
    window.kqBussPublicInApprovalList = function (postData) {
        var ubody = "kq/hrKqBussTrip/queryApplyList2";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqBussPublicInApprovalList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {
                        name: 'applyStartDate',
                        label: "出差开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {
                        name: 'applyEndDate',
                        label: "出差结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'}
                    },
                    {name: 'applyTripDays', label: "出差天数", width: 100, sortable: false, align: "center"},
                    {name: 'status', label: "状态", width: 100, sortable: false, align: "center"},
                    {name: 'reason', label: "出差事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {

                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };
    /**
     * 考勤统计：年假详情
     * @param postData
     */
    window.kqAnnualLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqAnnualLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqAnnualLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };


    /**
     * 考勤统计：事假详情
     * @param postData
     */
    window.kqAbsenceLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqAbsenceLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'destroyStatusValue', label: "销假状态", width: 100, sortable: false, align: "center"},
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqAbsenceLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：病假详情
     * @param postData
     */
    window.kqSickLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqSickLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqSickLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };


    /**
     * 考勤统计：婚假详情
     * @param postData
     */
    window.kqMaritalLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqMaritalLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqMaritalLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：产假详情
     * @param postData
     */
    window.kqMaternityLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqMaternityLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                // width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqMaternityLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：带薪假详情
     * @param postData
     */
    window.kqPaidLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqPaidLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                // autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqPaidLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };

    /**
     * 考勤统计：其他假期详情
     * @param postData
     */
    window.kqOtherLeaveList = function (postData) {
        var ubody = "kq/hrKqSummary/queryRestDetailList";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#kqOtherLeaveList").jqGrid(
            {
                url: uall,
                postData: postData,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                // autowidth: true,
                // shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'personName', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'restTypeName', label: "请假类型", width: 100, sortable: false, align: "center"},
                    {name: 'applyRestDays', label: "请假天数", width: 100, sortable: false, align: "center"},
                    {
                        name: 'applyStartDate',
                        label: "开始时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {
                        name: 'applyEndDate',
                        label: "结束时间",
                        width: 100,
                        sortable: false,
                        align: "center",
                        formatter: dateFormatter
                    },
                    {name: 'reason', label: "请假事由", width: 100, sortable: false, align: "center"}
                ],
                width: $('.mytable').width() - 120,
                height: $('.mytable').height() - 50,
                rowNum: -1,//一页显示多少条 -1全部
                // rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                // pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    var result = data.result;
                    if (result != null && result.length > 1) {
                        $("#kqOtherLeaveList").jqGrid('setSelection', result[1].id);
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                loadError: function (xhr, status, error) {

                }
            });
    };


    window.daysInitByMonth = function () {
        var month2 = $("#month2").val();
        if (month2 == null || month2 == "") {
            var date = new Date();
            var month = date.getMonth() + 1;
            if (month >= 1 && month < 10) {
                month = "0" + month;
            }
            month2 = date.getFullYear() + "-" + month;
            $("#month2").val(month2);
        }
        // daysInMonth = getDaysInMonth(month2.substring(0, 4), month2.substring(5, 7));
    };


    function codeFormatter(cellValue, options, rowObject) {
        // var codeName = $.hrUtils.getHRCodeNameById(cellValue);
        var codeName = cellValue;
        if (codeName != null) {
            return codeName;
        } else {
            return "";
        }
    }

    window.zTreeOnClick = function (event, treeId, treeNode) {
        var month = $("#month1").val();
        var date = $("#month2").val();
        // alert(treeNode.id);
        $("#orgId").val(treeNode.id);
        var status = $("#personStatus").val();
        var status2 = $("#personStatus2").val();

        var queryDataByDay = {
            "orgId": treeNode.id,
            "date": month,
            "status": status
        };
        var queryDataByMonth = {
            "orgId": treeNode.id,
            "date": date,
            "status": status2
        };
        if (event == "") {
            resultByDayInit(queryDataByDay);
            resultByMonthInit(queryDataByMonth);
        } else {
            jQuery("#listResultByDay").jqGrid("setGridParam", {
                postData: queryDataByDay,
                page: 1
            }).trigger("reloadGrid");
            jQuery("#listResultByMonth").jqGrid("setGridParam", {
                postData: queryDataByMonth,
                page: 1
            }).trigger("reloadGrid");
        }
    };


    // window.initDatetimepicker = function () {
    //     var picker = $('.datetimepickerM').datetimepicker({
    //         format: 'yyyy-mm',
    //         weekStart: 1,
    //         autoclose: true,
    //         startView: 3,
    //         minView: 3,
    //         forceParse: false,
    //         language: 'zh-CN'
    //     });
    // };

    //出差详情页面
    window.showBussModal = function (date, personId) {
        var queryData = {
            "date": date,
            "personId": personId,
            "status": "1067100108"
        };
        jQuery("#bussList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");

        // bussList({"date": date, "personId": personId});
        $("#bussModal").modal('show');
        $("#jqGridId").val("bussList");
        $("#modalId").val("bussModal");
    };

    //市内公出详情页面
    window.showCityBussModal = function (date, personId) {
        var queryData = {
            "date": date,
            "personId": personId,
            "status": "1067100108",
            "ifPublicType": "true"
        };
        jQuery("#cityBussList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");

        // bussList({"date": date, "personId": personId});
        $("#cityCussModal").modal('show');
        $("#jqGridId").val("cityBussList");
        $("#modalId").val("cityCussModal");
    };

    //迟到详情
    window.showKqLateModal = function (date, personId, late) {
        var queryData = {
            "date": date,
            "personId": personId,
            "late": late
        };
        jQuery("#kqLateList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqLateModal").modal('show');
        $("#jqGridId").val("kqLateList");
        $("#modalId").val("kqLateModal");
    };

    //早退详情
    window.showKqLeaveEarlyModal = function (date, personId, leaveEarly) {
        var queryData = {
            "date": date,
            "personId": personId,
            "leaveEarly": leaveEarly
        };
        jQuery("#kqLeaveEarlyList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqLeaveEarlyModal").modal('show');
        $("#jqGridId").val("kqLeaveEarlyList");
        $("#modalId").val("kqLeaveEarlyModal");
    };

    //旷工详情
    window.showKqAbsenceModal = function (date, personId, absence) {
        var queryData = {
            "date": date,
            "personId": personId,
            // "type": "absence"
            "absence": absence
        };
        jQuery("#kqAbsenceList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        // jQuery("#kqRestInApprovalList").jqGrid("setGridParam", {
        //     postData: {
        //         "date": date,
        //         "personId": personId,
        //         "type": "restInApproval"
        //     }
        // }).trigger("reloadGrid");
        // jQuery("#kqBussInApprovalList").jqGrid("setGridParam", {
        //     postData: {
        //         "date": date,
        //         "personId": personId,
        //         "type": "bussInApproval"
        //     }
        // }).trigger("reloadGrid");
        // jQuery("#kqNoSignInApprovalList").jqGrid("setGridParam", {
        //     postData: {
        //         "date": date,
        //         "personId": personId,
        //         "type": "noSignInApproval"
        //     }
        // }).trigger("reloadGrid");
        $("#kqAbsenceModal").modal('show');
        $("#jqGridId").val("kqAbsenceModal");
        $("#modalId").val("kqLeaveEarlyModal");
    };

    //旷工详情
    window.showKqAbsence = function (date, personId) {
        absenceDate = date;
        absencePersonId = personId;
        window.open("kq_summary_absence_list.html");
    };

    //未打卡详情
    window.showKqNoSignModal = function (date, personId) {
        var queryData = {
            "date": date,
            "personId": personId
        };
        jQuery("#kqNoSignList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqNoSignModal").modal('show');
        $("#jqGridId").val("kqNoSignList");
        $("#modalId").val("kqNoSignModal");
    };

    //年假详情
    window.showKqAnnualLeaveModal = function (date, personId) {
        var queryData = {
            "date": date,
            "personId": personId,
            "restType": "annualLeave"
        };
        jQuery("#kqAnnualLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqAnnualLeaveModal").modal('show');
        $("#jqGridId").val("kqAnnualLeaveList");
        $("#modalId").val("kqAnnualLeaveModal");
    };

    //事假详情
    window.showKqAbsenceLeaveModal = function (date, personId) {
        var queryData = {
            "date": date,
            "personId": personId,
            "restType": "absenceLeave"
        };
        jQuery("#kqAbsenceLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqAbsenceLeaveModal").modal('show');
        $("#jqGridId").val("kqAbsenceLeaveList");
        $("#modalId").val("kqAbsenceLeaveModal");
    };

    //病假详情
    window.showKqSickLeaveModal = function (date, personId) {
        var queryData = {
            "date": date,
            "personId": personId,
            "restType": "sickLeave"
        };
        jQuery("#kqSickLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqSickLeaveModal").modal('show');
        $("#jqGridId").val("kqSickLeaveList");
        $("#modalId").val("kqSickLeaveModal");
    };

    //婚假详情
    window.showKqMaritalLeaveModal = function (date, personId) {
        var queryData = {
            "date": date,
            "personId": personId,
            "restType": "maritalLeave"
        };
        jQuery("#kqMaritalLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqMaritalLeaveModal").modal('show');
        $("#jqGridId").val("kqMaritalLeaveList");
        $("#modalId").val("kqMaritalLeaveModal");
    };

    //产假详情
    window.showKqMaternityLeaveModal = function (date, personId) {
        var queryData = {
            "date": date,
            "personId": personId,
            "restType": "maternityLeave"
        };
        jQuery("#kqMaternityLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqMaternityLeaveModal").modal('show');
        $("#jqGridId").val("kqMaternityLeaveList");
        $("#modalId").val("kqMaternityLeaveModal");
    };

    //带薪假详情
    window.showKqPaidLeaveModal = function (date, personId) {
        var queryData = {
            "date": date,
            "personId": personId,
            "restType": "paidLeave"
        };
        jQuery("#kqPaidLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqPaidLeaveModal").modal('show');
        $("#jqGridId").val("kqPaidLeaveList");
        $("#modalId").val("kqPaidLeaveModal");
    };

    //其他假期详情
    window.showKqOtherLeaveModal = function (date, personId) {
        var queryData = {
            "date": date,
            "personId": personId,
            "restType": "otherLeave"
        };
        jQuery("#kqOtherLeaveList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqOtherLeaveModal").modal('show');
        $("#jqGridId").val("kqOtherLeaveList");
        $("#modalId").val("kqOtherLeaveModal");
    };

    //请假审批中详情
    window.showKqRestInApprovalModal = function (date, personId) {
        var queryData = {
            "date": date,
            "status": "1067100107",
            "personId": personId
        };
        jQuery("#kqRestInApprovalList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqRestInApprovalModal").modal('show');
        $("#jqGridId").val("kqRestInApprovalList");
        $("#modalId").val("kqRestInApprovalModal");
    };

    //出差审批中详情
    window.showKqBussInApprovalListModal = function (date, personId) {
        var queryData = {
            "date": date,
            "status": "1067100107",
            "personId": personId
        };
        jQuery("#kqBussInApprovalList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqBussInApprovalModal").modal('show');
        $("#jqGridId").val("kqBussInApprovalList");
        $("#modalId").val("kqBussInApprovalModal");
    };

    //未打卡审批中
    window.showKqNoSignInApprovalListModal = function (date, personId) {
        var queryData = {
            "date": date,
            "status": "1067100107",
            "personId": personId
        };
        jQuery("#kqNoSignInApprovalList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqNoSignInApprovalModal").modal('show');
        $("#jqGridId").val("kqNoSignInApprovalList");
        $("#modalId").val("kqNoSignInApprovalModal");
    };
    //市内公出审批中
    window.showKqBussPublicInApprovalListModal = function (date, personId) {
        var queryData = {
            "date": date,
            "status": "1067100107",
            "personId": personId,
            "ifPublicType": "true"
        };
        jQuery("#kqBussPublicInApprovalList").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
        $("#kqBussPublicInApprovalModal ").modal('show');
        $("#jqGridId").val("kqBussPublicInApprovalList");
        $("#modalId").val("kqBussPublicInApprovalModal");
    };

    //出差
    function bussFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showBussModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //市内公出
    function cityBussFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showCityBussModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //迟到
    function kqLateFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var lateBuffer = rowObject.lateBuffer;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqLateModal(\'' + date + '\',\'' + personId + '\',\'' + lateBuffer + '\')">' + cellValue + '</a>';
        return result;
    }

    //早退
    function kqLeaveEarlyFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var leaveEarlyBuffer = rowObject.leaveEarlyBuffer;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqLeaveEarlyModal(\'' + date + '\',\'' + personId + '\',\'' + leaveEarlyBuffer + '\')">' + cellValue + '</a>';
        return result;
    }

    //旷工
    function kqAbsenceFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var absence = rowObject.absenteeismBuffer;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqAbsenceModal(\'' + date + '\',\'' + personId + '\',\'' + absence + '\')">' + cellValue + '</a>';
        return result;
    }

    //未打卡
    function kqNoSignFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqNoSignModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //年假
    function kqAnnualLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqAnnualLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //事假
    function kqAbsenceLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqAbsenceLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //病假
    function kqSickLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref"  style="color: #0000FF" onclick="showKqSickLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //婚假
    function kqMaritalLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqMaritalLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //产假
    function kqMaternityLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqMaternityLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //带薪假
    function kqPaidLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqPaidLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //其他假期
    function kqOtherLeaveFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqOtherLeaveModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //请假审批中
    function kqRestInApprovalFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqRestInApprovalModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //出差审批中
    function kqBussInApprovalFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqBussInApprovalListModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //未打卡审批中
    function kqNoSignInApprovalFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqNoSignInApprovalListModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }

    //市内公出审批中
    function kqBussPublicInApprovalFormatter(cellValue, options, rowObject) {
        var date = rowObject.date;
        var personId = rowObject.personId;
        var result = '<a href="javascript:void(0)" name="kqMonthHref" style="color: #0000FF" onclick="showKqBussPublicInApprovalListModal(\'' + date + '\',\'' + personId + '\')">' + cellValue + '</a>';
        return result;
    }


    /**
     * 条件查询
     */
    window.queryConditionList = function () {
        var name = $("#name").val();
        var month = $("#month1").val();
        var orgId = $("#orgId").val();
        var status = $("#personStatus").val();

        var queryDataByDay = {
            "orgId": orgId,
            "name": name,
            "date": month,
            "status": status
        };
        jQuery("#listResultByDay").jqGrid("setGridParam", {postData: queryDataByDay}).trigger("reloadGrid");
    };

    $("#name").keydown(function (e) {
        if (e.keyCode == 13) {
            userOnId = "";
            queryConditionList();
            event = arguments.callee.caller.arguments[0] || window.event;
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
        }
    });


    window.queryConditionList2 = function () {
        var name = $("#name2").val();
        var month = $("#month2").val();
        var orgId = $("#orgId").val();
        var status = $("#personStatus2").val();

        var queryDataByMonth = {
            "orgId": orgId,
            "name": name,
            "date": month,
            "status": status
        };
        jQuery("#listResultByMonth").jqGrid("setGridParam", {postData: queryDataByMonth}).trigger("reloadGrid");
    };

    $("#name2").keydown(function (e) {
        if (e.keyCode == 13) {
            userOnId = "";
            queryConditionList2();
            event = arguments.callee.caller.arguments[0] || window.event;
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
        }
    });

    /**
     *  考勤日统计：导出Excel
     */
    window.exportBtnDay = function () {
        //表格数据
        var colNames = $("#listResultByDay").jqGrid('getGridParam', 'colNames');
        var colModel = $("#listResultByDay").jqGrid('getGridParam', 'colModel');
        rowData = $('#listResultByDay').jqGrid('getRowData');
        // for (var i = 0; i < rowData.length; i++) {
        //     var applyStartDate = rowData[i].applyStartDate;
        //     var applyEndDate = rowData[i].applyEndDate;
        //     rowData[i].applyStartDate = new Date(applyStartDate.replace(/-/g, '/')).getTime();
        //     rowData[i].applyEndDate = new Date(applyEndDate.replace(/-/g, '/')).getTime();
        // }
        var name = $("#name").val();
        var month = $("#month1").val();
        var orgId = $("#orgId").val();
        var conditionMap = {
            "start": null,
            "limit": null,
            "date": month,
            "name": name,
            "orgId": orgId,
            "colModel": colModel
        };
        var urlBody = "kq/hrKqSummary/exportInfoDay";
        var urlAll = serviceUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            // data: JSON.stringify({"rowData": rowData, "colModel": colModel}),
            data: JSON.stringify(conditionMap),
            async: false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {//指定下载
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action', serviceUrl + "org/orgPostRelation/exportInfoClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type', 'hidden');
                        input1.attr('name', "path");
                        input1.attr('value', path);

                        $('body').append(form);  //将表单放置在web中
                        form.append(input1);   //将查询参数控件提交到表单上
                        form.submit();   //表单提交
                        pop_tip_open("", "导出成功");
                    }
                } else {
                    pop_tip_open("red", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "导出失败");
            }
        })
    };

    /**
     *  考勤月统计：导出Excel
     */
    window.exportBtnMonth = function () {
        //表格数据
        var colNames = $("#listResultByMonth").jqGrid('getGridParam', 'colNames');
        var colModel = $("#listResultByMonth").jqGrid('getGridParam', 'colModel');
        /* rowData = $('#listResultByMonth').jqGrid('getRowData');
         var str = "bussTripDays,bussTripOfCityDays,lateDays,leaveEarlyDays,absenteeismDays,noSignDays,annualLeave,absenceLeave,sickLeave,maritalLeave,maternityLeave,paidLeaveDays,otherLeaveDays";
         var array = str.split(",");
         for (var i = 0; i < rowData.length; i++) {
             for (var j = 0; j < array.length; j++) {
                 var data = rowData[i];
                 var value = data[array[j]];
                 var sss = value.split(">");
                 var ss = sss[1].split("<");
                 data[array[j]] = ss[0];
             }
         }
 */
        var name = $("#name2").val();
        var month = $("#month2").val();
        var orgId = $("#orgId").val();
        var conditionMap = {
            "start": null,
            "limit": null,
            "date": month,
            "name": name,
            "orgId": orgId,
            "colModel": colModel
        };
        var urlBody = "kq/hrKqSummary/exportBtnMonth";
        var urlAll = serviceUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            // data: JSON.stringify({"rowData": rowData, "colModel": colModel}),
            data: JSON.stringify(conditionMap),
            async: false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {//指定下载
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action', serviceUrl + "org/orgPostRelation/exportInfoClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type', 'hidden');
                        input1.attr('name', "path");
                        input1.attr('value', path);

                        $('body').append(form);  //将表单放置在web中
                        form.append(input1);   //将查询参数控件提交到表单上
                        form.submit();   //表单提交
                        pop_tip_open("", "导出成功");
                    }
                } else {
                    pop_tip_open("red", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "导出失败");
            }
        })
    };

    function contains(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return true;
            }
        }
        return false;
    }

    //字符串截取：yyyy-MM-dd hh:mm
    function dateFormatter(cellValue, options, rowObjec) {
        if (cellValue == null || cellValue == "") {
            return "";
        } else {
            return cellValue.substring(0, 16);
        }
    }


    $('.modal-cancel').click(function (e) {
        // var modalId = "kqNoSignModal";
        var jqGridId = $("#jqGridId").val();
        var modalId = $("#modalId").val();
        jQuery("#" + jqGridId + "").jqGrid("clearGridData");
        $("#" + modalId + "").modal('hide');
    });

})(jQuery, window, document);