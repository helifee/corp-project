;(function ($, window, document, undefined) {
    var jqGridByMonth;//月结果
    $(function () {
        resizeHeight();
        //验证用户信息
        var msg = $.hrUtils.verifUserInfo();
        if (msg != null && msg.length > 0) {
            pop_tip_open("red", msg);
        } else {
            //hr人员信息
            var personInfoDto = $.hrUtils.getHREmpInfo();
            $("#personId").val(personInfoDto.id);
        }

        // $("#personId").val("5e01a0a6c4874caca438162718f5e6d5");
        pageInit();
        resizeGrid();
        setTimeout(function () {
            $.xljUtils.addTreeScroll();
            $.xljUtils.treeResizeFn();
        }, 300);
    });

    $('.btn').click(function (e) {
        e.preventDefault();
    });

    function pageInit() {
        daysInitByMonth();
        signInfoList();
        initDatetimepicker();
    }

//计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 70) + "px");
        //右侧table
        $(".con-table .mytable").height((w_h - 100) + "px");
    }

//计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width() - 10, true);
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
        var kqType = rdata.kq_type;
        if (kqType == "1118100219") {//异常
            return "style='background-color:#F24848'";
        } else if (kqType == "1118100220") {//请假
            return "style='background-color:yellow'";
        } else if (kqType == "1118100221") {//出差
            return "style='background-color:orange'";
        } else if (kqType == "1118100753") {//市内公出
            return "style='background-color:#23ff2a'";
        } else if (kqType == "1118100222") {//未打卡
            return "style='background-color:cornflowerblue'";
        } else if (kqType == "1118100223") {//流程未结束
            return "style='background-color:rgba(17, 211, 171, 0.69)'";
        }
    }


    /**
     * 查询员工整月的考勤信息
     */
    window.signInfoList = function () {
        var date = $("#date").val();
        var personId = $("#personId").val();
        // var name = $("#name").val();
        var ubody = "kq/hrKqSummary/querySignListByMonth";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridByMonth = jQuery("#signInfoList").jqGrid(
            {
                url: uall,
                postData: {"personId": personId, "date": date},
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                jsonReader: {
                    root: "result"
                },
                autowidth: false,
                shrinkToFit: true,
                rownumbers: true,
                colModel: [
                    {name: 'person_id', label: "id", hidden: true, width: 150, align: "center", sortable: false},
                    {name: 'person_name', label: "姓名", width: 100, align: "center", sortable: false},
                    {name: 'sign_date', label: "打卡日期", width: 100, align: "center", sortable: false},
                    {
                        name: 'kq_type',
                        label: "考勤类型",
                        width: 100,
                        align: "center",
                        formatter: codeFormatter,
                        sortable: false,
                        cellattr: addCellAttr
                    },
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
                    {
                        name: 'signInAddress',
                        label: "签到地址",
                        width: 150,
                        align: "center",
                        sortable: false,
                        formatter: addressForMatter
                    },
                    {
                        name: 'signOutAddress',
                        label: "签退地址",
                        width: 150,
                        align: "center",
                        sortable: false,
                        formatter: addressForMatter
                    }
                ],
                height: $(window).height() - 150,
                rowNum: -1,//一页显示多少条 -1全部
                rownumWidth: 55,
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: '#pager2',//表格页脚的占位符(一般是div)的id
                sortname: "id",//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                loadComplete: function (data) {
                    console.log(data);
                },
                loadError: function (xhr, status, error) {
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                }
            });
    };


    window.myKqQuery = function () {
        var date = $("#date").val();
        var personId = $("#personId").val();
        // var name = $("#name").val();
        var queryDataByMonth = {
            "personId": personId,
            // "name": name,
            "date": date
        };
        jQuery("#signInfoList").jqGrid("setGridParam", {postData: queryDataByMonth}).trigger("reloadGrid");
    };


    window.daysInitByMonth = function () {
        var month2 = $("#date").val();
        if (month2 == null || month2 == "") {
            var date = new Date();
            var month = date.getMonth() + 1;
            if (month >= 1 && month < 10) {
                month = "0" + month;
            }
            month2 = date.getFullYear() + "-" + month;
            $("#date").val(month2);
        }
    };

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

    function codeFormatter(cellValue, options, rowObject) {
        var codeName = $.hrUtils.getHRCodeNameById(cellValue);
        if (codeName != null && codeName !== "") {
            return codeName;
        } else {
            return "";
        }
    }

    //跳转到请假申请列表
    $("#kqRestList").on('click', function () {
        var personId = $("#personId").val();
        window.location.href = "kq_rest_list_myKq.html?myFlag=true&myPersonId=" + personId;
    });
    //跳转到出差申请列表
    $("#kqBussList").on('click', function () {
        var personId = $("#personId").val();
        window.location.href = "kq_buss_trip_list_myKq.html?myFlag=true&myPersonId=" + personId;
    });
    //跳转到未打卡申请列表
    $("#kqNoPunchList").on('click', function () {
        var personId = $("#personId").val();
        window.location.href = "kq_noPunchCard_list_myKq.html?myFlag=true&myPersonId=" + personId;
    });
    //跳转到市内公出申请列表
    $("#kqBussLocalList").on('click', function () {
        var personId = $("#personId").val();
        window.location.href = "kq_local_city_trip_myKq.html?myFlag=true&myPersonId=" + personId;
    });

    //截取固定长度
    function StrLenFormat(cellvalue, options, rowObject) {
        if (cellvalue == null || cellvalue == "") {
            return "";
        } else {
            var oldstrlen = cellvalue.length;

            var newstr = "";

            if (oldstrlen > 10) {
                newstr = cellvalue.substring(11, 16);

                newstr = "<div title=‘" + cellvalue + "‘>" + newstr + "</div>";
            } else {
                newstr = cellvalue;
            }
            return newstr;
        }
    }

    function addressForMatter(cellvalue) {
        if (cellvalue === undefined || cellvalue === null || cellvalue === "" || cellvalue === "null") {
            cellvalue = "";
        }
        return cellvalue;
    }

})(jQuery, window, document);