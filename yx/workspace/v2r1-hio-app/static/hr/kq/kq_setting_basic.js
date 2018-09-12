// ;(function ($, window, document, undefined) {
//考勤期间设置
var jqGridDurSet;
//考勤节假日设置
var jqGridHoliday;
//考勤调休日设置
var jqGridExchange;
//考勤假期类别设置
var jqGridHolidayType;
//出勤规则设置
var regulationSet;
//考勤期间编辑id
var durationSetEditId;
//节假日初始化年度
var year;
var holidayEditId;//节假日编辑
var exchangeEditId;//调休日编辑
var holidayTypeEditId;//假期类别编辑
var focusIdDuration;//考勤期间设置的焦点
var focusIdRest1;//节假日设置的焦点
var focusIdRest2;//调休日设置的焦点
var focusIdType;//假期类别设置的焦点
var systemItemFlag;//假期类别是否是系统项
//初始化
$(function () {
    resizeHeight();
    $("#saveBtn").on('click', function () {
        $("#kqRegulationSetForm").attr("data-validate-success", "saveRegulationSetForm(0)");
        $("#kqRegulationSetForm").submit();
    });

    //节假日：年度选项初始化
    for (var i = 2010; i <= 2100; i++) {
        $("#yearSelect").append("<option value=" + i + ">" + i + "</option>");
    }

    year = new Date().getFullYear();
    $("#yearSelect  option[value='" + year + "']").attr("selected", true);


    pageInit();
    resizeGrid();
});

$('.btn').click(function (e) {
    e.preventDefault();
});


function pageInit() {
    kqSetForRest1Init();
    kqSetForRest2Init();
    // queryRegulation();
}

function openNewWindow(src) {
    window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
}

function closeWindow() {
    window.close();
}

//计算高度
function resizeHeight() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
//        $(".slide-left .ztree-box").height((w_h - 97) + "px");
    //右侧table
    // $(".con-table .mytable").height((w_h - 120) + "px");
    //解决多页签切换页面大小数据全部丢失的问题
    if ($(".mytable2").is(":hidden")) {
        $(".con-table .mytable1").height((w_h - 120) + "px");
    } else {
        $(".con-table .mytable2").height((w_h - 120) + "px");
    }
}

//计算表格宽度
function resizeGrid() {
    // $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height());
    // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
    //解决多页签切换页面大小数据全部丢失的问题
    if ($(".mytable2").is(":hidden")) {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height()-45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
    } else {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable2').height()-45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable2').width(), true);
    }
    $.xljUtils.gridResizeFn();
}

//grid 自适应宽度
$(window).resize(function () {
    resizeHeight();
    resizeGrid();
});

/**
 * 跳转到年假公式设置页面
 */
var typeStatus;//年假是否启用
function editAnnualFormula() {
    queryAnnualTypeInfo("年假");
    if (typeStatus == "1092100170") {
        pop_tip_open("red", "年假未启用，请先启用年假！");
    } else {
        window.open("kq_setting_basic_annual_formula_set.html");
    }
}

//表格上面 切换：考勤期间设置/节假日设置/假期类别设置/其他设置
$(".right-content .con-tit button").on("click", function (e) {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    if ($(this).attr('class').indexOf('byExchange') > 0) {
        $("#exchangeDiv").css("display", "block");//考勤期间设置设置为block（显示）
        $("#restDiv").css("display", "none");//节假日设置设置为none（隐藏）

    } else {
        $("#restDiv").css("display", "block");//节假日设置为block（显示）
        $("#exchangeDiv").css("display", "none");//考勤期间设置为none（隐藏）
    }
    $.xljUtils.gridResizeFn();
    e.stopPropagation();
});


/**
 * 考勤设置：考勤期间查询
 */
function kqSetForDurInit() {
    var ubody = "kq/hrKqDurationSetting/queryList2";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridDurSet = jQuery("#listKqSetForDur").jqGrid(
        {
            url: uall,
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype: "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            autowidth: false,
            shrinkToFit: true,
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
                // repeatitems: false
            },

            rownumbers: true,
            colNames: ['公司id', '公司', '考勤结算日', '考勤分析日', '说明'],
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: '序号', width: 55, align: "center", sortable: false},
                {name: 'orgId', label: '公司id', hidden: true, width: 90, align: "center"},
                {name: 'orgName', label: '公司', width: 90, align: "center"},
                {name: 'accountDay', label: '考勤结算日', width: 90, align: "center"},
                {name: 'analysisDay', label: '考勤分析日', width: 90, align: "center"},
                // {name: 'freeze_day', label: '考勤冻结日', width: 90, align: "center"},
                {name: 'remark', label: '说明', width: 90, align: "center"}
            ],
            multiselect: true,
            multiboxonly: true,
            rowNum: -1,//一页显示多少条 -1全部
            sortname: "id",//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "查询考勤期间失败!");
            },
            ondblClickRow: function (rowid, iRow, iCol, e) {
                var rowData = $("#listKqSetForDur").getRowData(rowid);
                editDurationSet(rowid);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                var rowData = $('#listKqSetForDur').jqGrid('getRowData');
                //如果焦点id不为空
                if (focusIdDuration != undefined && focusIdDuration != null) {
                    //闪亮聚焦
                    $("#listRest").setSelection(focusIdDuration);
                }
            }
        });
}


//考勤期间编辑
function editDurationSet(id) {
    if (id == null || id == "") {
        var ids = jqGridDurSet.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择要修改的记录！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            durationSetEditId = ids[0];
            window.open("kq_setting_basic_dur_add.html?type=update");
        }
    } else {
        durationSetEditId = id;
        window.open("kq_setting_basic_dur_add.html?type=update");
    }
}

/**
 * 考勤设置：节假日设置，节假日
 */
function kqSetForRest1Init() {
    // var year = $("#yearSelect option:selected").val();
    var ubody = "kq/hrKqHolidaySetting/queryListByYear";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridHoliday = jQuery("#listKqSetForRest1").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"year": year},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result",
                id: "sid"
            },

            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'sid', label: '序号', width: 55, align: "center", hidden: true},
                {name: 'name', label: '节假日名称', width: 90, align: "center"},
                {
                    name: 'startDate',
                    label: '法定开始日期',
                    width: 90,
                    align: "center",
                    formatter: "date",
                    formatoptions: {newformat: 'Y-m-d'}
                },
                {
                    name: 'endDate',
                    label: '法定结束日期',
                    width: 90,
                    align: "center",
                    formatter: "date",
                    formatoptions: {newformat: 'Y-m-d'}
                }
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true,
            multiboxonly: true,
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "考勤节假日查询失败!");
            },
            loadComplete: function (data) {
                console.log(JSON.stringify(data))
            },
            ondblClickRow: function (rowid, iRow, iCol, e) {
                editHoliday(rowid);
            },
            gridComplete: function (data) {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                //如果焦点id不为空
                if (focusIdRest1 != undefined && focusIdRest1 != null) {
                    //闪亮聚焦
                    $("#listKqSetForRest1").setSelection(focusIdRest1);
                }
            }
        });
    var h = $('.mytable').height();//457  230
    $("#userDiv2 .tableStyle").css("height", ($('.mytable').height() - 227) + 'px');
}

//节假日编辑
function editHoliday(id) {
    if (id == null || id == "") {
        var ids = jqGridHoliday.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择要修改的记录！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            holidayEditId = ids[0];
            // window.open("kq_setting_basic_holiday_add.html?type=update");
            openPa﻿("kq_setting_basic_holiday_add.html?type=update");
        }
    } else {
        holidayEditId = id;
        // window.open("kq_setting_basic_holiday_add.html?type=update");
        openPa﻿("kq_setting_basic_holiday_add.html?type=update");
    }

}

/**
 * 考勤设置：节假日设置，调休日
 */
function kqSetForRest2Init() {
    // var year = $("#yearSelect option:selected").val();
    var ubody = "kq/hrKqExchangeSetting/queryListByYear";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridExchange = jQuery("#listKqSetForRest2").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"year": year},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result",
                id: "sid"
            },

            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                // {name: 'id', label: '序号', width: 55, align: "center", sortable: false},
                {
                    name: 'exchangeDate',
                    label: '调休日期',
                    width: 90,
                    align: "center",
                    formatter: "date",
                    formatoptions: {newformat: 'Y-m-d'}
                },
                {
                    name: 'publicDate',
                    label: '公休日期',
                    width: 90,
                    align: "center",
                    formatter: "date",
                    formatoptions: {newformat: 'Y-m-d'}
                },
                {name: 'remark', label: '说明', width: 90, align: "center"}
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'id',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            multiselect: true,
            multiboxonly: true,
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "考勤调休日查询失败!");
            },
            ondblClickRow: function (rowid, iRow, iCol, e) {
                editExchange(rowid);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                //如果焦点id不为空
                if (focusIdRest2 != undefined && focusIdRest2 != null) {
                    //闪亮聚焦
                    $("#listKqSetForRest2").setSelection(focusIdRest2);
                }
            }
        });
    var h = $('.mytable').height();//457  230
    $("#userDiv3 .tableStyle").css("height", ($('.mytable').height() - 227) + 'px');
}


//调休日编辑
function editExchange(id) {
    if (id == null || id == "") {
        var ids = jqGridExchange.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择要修改的记录！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            exchangeEditId = ids[0];
            // window.open("kq_setting_basic_exchange_add.html?type=update");
            openPa﻿("kq_setting_basic_exchange_add.html?type=update");
        }
    } else {
        exchangeEditId = id;
        // window.open("kq_setting_basic_exchange_add.html?type=update");
        openPa﻿("kq_setting_basic_exchange_add.html?type=update");
    }
}


/**
 * 考勤设置：假期类别设置
 */
function kqSetForTypeInit() {
    var ubody = "kq/hrKqHolidaytypeSetting/queryList2";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridHolidayType = jQuery("#listKqSetForType").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: 'id', hidden: true, width: 55, align: "center", sortable: false},
                {name: 'code', label: '假期编码', width: 90, align: "center"},
                {name: 'name', label: '假期名称', width: 90, align: "center"},
                {name: 'unit', label: '假期单位', width: 90, align: "center"},
                // {name: 'unitMin', label: '请假最小单位', width: 90, align: "center"},
                {name: 'calculateRule', label: '计算规则', width: 90, align: "center", hidden: true},
                {name: 'calculateRuleValue', label: '计算规则', width: 90, align: "center"},
                {name: 'type', label: '假期类型', width: 90, align: "center", hidden: true},
                {name: 'typeValue', label: '假期类型', width: 90, align: "center"},
                {name: 'status', label: '状态', width: 90, align: "center", hidden: true},
                {name: 'statusValue', label: '状态', width: 90, align: "center"},
                {name: 'property', label: '假期属性', width: 90, align: "center", hidden: true},
                {name: 'propertyValue', label: '假期属性', width: 90, align: "center"},
                {name: 'orgIds', label: '适用公司范围', hidden: true, width: 90, align: "center"},
                {name: 'orgNames', label: '适用公司范围', width: 90, align: "center"},
                {name: 'remark', label: '说明', width: 90, align: "center"}
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'code',//初始化的时候排序的字段
            sortorder: "asc",//排序方式,可选desc,asc
            multiselect: true,
            multiboxonly: true,
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "假期类别查询失败!");
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {
                var rowData = $("#listKqSetForType").getRowData(rowid);
                if (rowData.name != "年假") {
                }
            },
            ondblClickRow: function (rowid, iRow, iCol, e) {
                editHolidayType(rowid);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                //如果焦点id不为空
                if (focusIdType != undefined && focusIdType != null) {
                    //闪亮聚焦
                    $("#listKqSetForType").setSelection(focusIdType);
                }
            }
        });
}


//假期类别编辑
function editHolidayType(id) {
    var editId = "";
    if (id == null || id == "") {
        var ids = jqGridHolidayType.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择要修改的记录！");
            return;
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
            return;
        } else {
            editId = ids[0];
        }
    } else {
        editId = id;
    }
    var rowData = $('#listKqSetForType').jqGrid('getRowData', editId);
    var property = rowData.property;//假期属性
    if (property == "系统项") {
        // pop_tip_open("red", "系统项不允许编辑！");
        // return;
        systemItemFlag = true;
    } else {
        systemItemFlag = false;
    }
    holidayTypeEditId = editId;
    window.open("kq_setting_basic_holiday_type_add.html?type=update");

}


/**
 * 考勤设置：出勤规则设置
 */
function kqSetForRegulationInit() {
    var ubody = "kq/hrKqRegulation/queryList";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    regulationSet = jQuery("#regulationSet").jqGrid(
        {
            url: uall,
            // url : hostUrl+'/hr/hrDemo/queryList',//创建完成之后请求数据的url
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype: "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            jsonReader: {
                root: "result",
                repeatitems: false
            },

            rownumbers: false,
            colModel: [
                {name: 'minuteLate', label: '迟到规则', hidden: true},
                {name: 'minuteEarly', label: '早退规则', hidden: true}
            ],
            rowNum: -1,//一页显示多少条 -1全部
            // sortname: 'id',//初始化的时候排序的字段
            // sortorder: "desc",//排序方式,可选desc,asc
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "查询考勤期间失败!");
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                var rowData = $('#regulationSet').jqGrid('getRowData');

                var minuteLate = rowData[0].minuteLate;
                var minuteEarly = rowData[0].minuteEarly;

                $("#minuteLate").val(minuteLate);
                $("#minuteEarly").val(minuteEarly);
                $(this).closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide()
            }
        });
}

/**
 * 弹出新增页面
 * @type {number}
 */
// var durAddType = 0;
function editDurInfo(sign) {
    if (sign == 0) {
        // durAddType = 0;
        window.open("kq_setting_basic_dur_add.html?type=add");
    }
}

/**
 * 弹出新增页面：考勤节假日
 * @type {number}
 */
// var holidayAddType = 0;
var yearSelect;

function editHolidayInfo(sign) {
    if (sign == 0) {
        // holidayAddType = 0;
        yearSelect = $("#yearSelect").val();
        // window.open("kq_setting_basic_holiday_add.html?type=add");
        openPa﻿("kq_setting_basic_holiday_add.html?type=add");
    }
}

/**
 * 弹出新增页面：考勤调休日
 * @type {number}
 */
// var exchangeAddType = 0;
function editExchangeInfo(sign) {
    if (sign == 0) {
        // exchangeAddType = 0;
        // window.open("kq_setting_basic_exchange_add.html?type=add");
        openPa﻿("kq_setting_basic_exchange_add.html?type=add");
    }
}

/**
 * 弹出新增页面：假期类别
 * @type {number}
 */
var holidayTypeAddType = 0;

function editHolidayTypeInfo(sign) {
    if (sign == 0) {
        holidayTypeAddType = 0;
        window.open("kq_setting_basic_holiday_type_add.html?type=add");
    }
}

/**
 * 删除考勤期间
 */
function delDurationById() {
    //选中一条记录
    var ids = jqGridDurSet.jqGrid('getGridParam', 'selarrrow');
    if (ids == "" || ids == null) {
        pop_tip_open("blue", "请选择一条记录");
    } else {
        pop_text_open("blue", '确认删除这【' + ids.length + '】条数据吗？', function () {
            var urlBody = "kq/hrKqDurationSetting/deleteBatch/" + ids;
            var urlAll = hostUrl + urlBody;
            $.ajax({
                type: 'DELETE',
                url: urlAll,
                async: false,
                dataType: 'json',
                contentType: 'application/json',
                data: "{}",
                success: function (json) {
                    if (json.success == true) {
                        pop_tip_open("blue", "删除成功");
                        // $('#listKqSetForDur').jqGrid().trigger("reloadGrid");
                        var w = $.hrUtils.focusNode(ids);
                        $('#listKqSetForDur').jqGrid("setGridParam", {
                            gridComplete: function () {
                                if (w != null && w != "") {
                                    $('#listKqSetForDur').setSelection(w);
                                }
                                w = "";
                            }
                        }).trigger("reloadGrid");
                    } else {
                        pop_tip_open("red", json.msg);
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "删除考勤期间请求失败");
                }
            })
        }, true);
    }
}

/**
 * 删除节假日
 */
function delHolidayById() {
    //选中一条记录
    var ids = jqGridHoliday.jqGrid('getGridParam', 'selarrrow');
    if (ids == "" || ids == null) {
        pop_tip_open("blue", "请选择一条记录");
    } else {
        var count = 0;
        for (var i = 0; i < ids.length; i++) {
            var rowData = $("#listKqSetForRest1").getRowData(ids[i]);
            var endDate = rowData.endDate;
            var startDate = rowData.startDate;
            //法定开始日期 > 当前日期，则可以删除
            var nowDate = new Date().format("yyyy-MM-dd");
            if (startDate <= nowDate) {//小于当前日期的记录不能删除
                count++;
            }
        }
        if (count > 0) {
            // pop_tip_open("red", "包含已使用的节假日，不允许删除！");
            // return;
        }
        pop_text_open("blue", '确认删除这【' + ids.length + '】条数据吗？', function () {
            var urlBody = "kq/hrKqHolidaySetting/deleteBatch/" + ids;
            var urlAll = hostUrl + urlBody;
            $.ajax({
                type: 'DELETE',
                url: urlAll,
                async: false,
                dataType: 'json',
                contentType: 'application/json',
                data: "{}",
                success: function (json) {
                    if (json.success == true) {
                        pop_tip_open("blue", "删除成功");
                        $('#listKqSetForRest1').jqGrid().trigger("reloadGrid");
                        // userQuery();
                        var w = $.hrUtils.focusNode(ids);
                        $('#listKqSetForRest1').jqGrid("setGridParam", {
                            gridComplete: function () {
                                if (w != null && w != "") {
                                    $('#listKqSetForRest1').setSelection(w);
                                }
                                w = "";
                            }
                        }).trigger("reloadGrid");
                    } else {
                        pop_tip_open("red", json.msg);
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "删除考勤节假日请求失败");
                }
            })
        }, true);
    }
}

/**
 * 删除调休日
 */
function delExchangeById() {
    //选中一条记录
    var ids = jqGridExchange.jqGrid('getGridParam', 'selarrrow');
    if (ids == "" || ids == null) {
        pop_tip_open("blue", "请选择一条记录");
    } else {
        var count = 0;
        for (var i = 0; i < ids.length; i++) {
            var rowData = $("#listKqSetForRest2").getRowData(ids[i]);
            var exchangeDate = rowData.exchangeDate;
            //调休日 > 当前日期，则可以删除
            var nowDate = new Date().format("yyyy-MM-dd");
            if (exchangeDate <= nowDate) {//小于当前日期的记录不能删除
                count++;
            }
        }

        if (count > 0) {
            // pop_tip_open("red", "包含已使用的调休日，不允许删除！");
            // return;
        }
        pop_text_open("blue", '确认删除这【' + ids.length + '】条数据吗？', function () {
            var urlBody = "kq/hrKqExchangeSetting/deleteBatch/" + ids;
            var urlAll = hostUrl + urlBody;
            $.ajax({
                type: 'DELETE',
                url: urlAll,
                async: false,
                dataType: 'json',
                contentType: 'application/json',
                data: "{}",
                success: function (json) {
                    if (json.success == true) {
                        pop_tip_open("blue", "删除成功");
                        $('#listKqSetForRest2').jqGrid().trigger("reloadGrid");
                        // userQuery();
                        var w = $.hrUtils.focusNode(ids);
                        $('#listKqSetForRest2').jqGrid("setGridParam", {
                            gridComplete: function () {
                                if (w != null && w != "") {
                                    $('#listKqSetForRest2').setSelection(w);
                                }
                                w = "";
                            }
                        }).trigger("reloadGrid");
                    } else {
                        pop_tip_open("red", json.msg);
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "删除考勤调休日请求失败");
                }
            })
        }, true);
    }
}

/**
 * 删除假期类别
 */
function delHolidayTypeById() {
    //选中一条记录
    var ids = jqGridHolidayType.jqGrid('getGridParam', 'selarrrow');
    if (ids == "" || ids == null) {
        pop_tip_open("blue", "请选择一条记录");
    } else {
        var count = 0;//统计要删除的数据中包含几条系统项
        for (var i = 0; i < ids.length; i++) {
            var rowData = $('#listKqSetForType').jqGrid('getRowData', ids[i]);
            var property = rowData.property;//假期属性
            if (property == "系统项") {
                count++;
            }

            var listSize = restUseCheck(rowData.id);
            if (listSize > 0) {
                pop_tip_open("red", "假期" + rowData.name + "已使用，不允许删除！");
                return;
            }
        }

        if (count > 0) {
            pop_tip_open("red", "系统项不允许删除，请重新选择！");
            return;
        }
        pop_text_open("blue", '确认删除这【' + ids.length + '】条数据吗？', function () {
            var urlBody = "kq/hrKqHolidaytypeSetting/deleteBatch/" + ids;
            var urlAll = hostUrl + urlBody;
            $.ajax({
                type: 'DELETE',
                url: urlAll,
                async: false,
                dataType: 'json',
                contentType: 'application/json',
                data: "{}",
                success: function (json) {
                    if (json.success == true) {
                        pop_tip_open("blue", "删除成功");
                        $('#listKqSetForType').jqGrid().trigger("reloadGrid");
                        // userQuery();
                        var w = $.hrUtils.focusNode(ids);
                        $('#listKqSetForType').jqGrid("setGridParam", {
                            gridComplete: function () {
                                if (w != null && w != "") {
                                    $('#listKqSetForType').setSelection(w);
                                }
                                w = "";
                            }
                        }).trigger("reloadGrid");
                    } else {
                        pop_tip_open("red", json.msg);
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "删除考勤调休日请求失败");
                }
            })
        }, true);
    }
}

function restUseCheck(typeId) {
    var listSize;
    var urlBody = "kq/hrKqRest/queryApplyList";
    var urlAll = hostUrl + urlBody;
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"type": typeId}),
        success: function (data) {
            if (data.success == true) {
                listSize = data.result.list.length;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
    return listSize;
}


function codeFormatter(cellValue, options, rowObject) {
    var codeName = $.hrUtils.getHRCodeNameById(cellValue);
    if (codeName != null) {
        return codeName;
    } else {
        return "";
    }
}

/**
 * 多选机构翻译
 */
function orgInterpret(orgIds, options, rowObject) {
    var ids = orgIds.split(",");
    var orgName = "";
    if (ids != null && ids != "") {
        for (var i = 0; i < ids.length; i++) {
            orgName += $.hrUtils.getHROrgNameById(ids[i]) + ",";
        }
    }

    if (orgName != null) {
        orgName = orgName.substring(0, orgName.length - 1);
        return orgName;
    } else {
        return "";
    }
}


/**
 * 出勤规则设置
 */
function saveRegulationSetForm(sign) {
    var hrKqRegulationArr = $("#kqRegulationSetForm").serializeArray();
    var hrKqRegulationDto = {};
    for (var i in hrKqRegulationArr) {
        hrKqRegulationDto[hrKqRegulationArr[i].name] = hrKqRegulationArr[i].value;
    }
    hrKqRegulationDto.delflag = 0;
    // var id = $("#id").val;
    // hrKqRegulationDto["id"] = id;

    $.ajax({
        // url: hostUrl + "kq/hrKqRegulation/saveOrUpdate",
        url: hostUrl + "kq/hrKqRegulation/update/2c06c731a8ec494dadacfcc652e6017e",
        type: 'PUT',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrKqRegulationDto),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    pop_tip_open("blue", "保存成功！");
                    closeWindow();
                } else {
                    pop_tip_open("red", "保存失败！");
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            pop_tip_open("red", "服务异常,请联系管理员！");
        }

    });
}

/*
/!**
 * 查询出勤规则
 *!/
function queryRegulation() {
    $.ajax({
        url: hostUrl + "kq/hrKqRegulation/queryList",
        type: "post",
        data: "{}",
        dataType: 'JSON',
        contentType: 'application/json',
        success: function (data) {
            if (data.success == false) {
                pop_tip_open("red", "出勤规则查询失败");
            }
            var result = data.result;
            var minuteLate;
            var minuteEarly;
            if (result != null && result.length > 0) {
                minuteLate = result[0].minuteLate;
                minuteEarly = result[0].minuteEarly;
            }
            $("#minuteLate").val(minuteLate);
            $("#minuteEarly").val(minuteEarly);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", textStatus);
            $.xljUtils.tip("red", "出勤规则查询失败！");
        }
    });
}
*/

/**
 * 根据假期类别名称查询信息
 */
function queryAnnualTypeInfo(name) {
    $.ajax({
        url: hostUrl + "kq/hrKqHolidaytypeSetting/queryListByCondition",
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
            $.xljUtils.tip("red", "出勤规则查询失败！");
        }
    });
}


/**
 *编辑假期类别状态：true 启用  false 禁用
 */
function editStatus(sign) {
    var ids = jqGridHolidayType.jqGrid('getGridParam', 'selarrrow');
    if (ids == "" || ids.length == 0) {
        pop_tip_open("red", "请选择要修改的记录！");
    } else {
        // var rowData = $("#listKqSetForType").getRowData(ids);
        $.ajax({
            type: "put",
            url: hostUrl + "kq/hrKqHolidaytypeSetting/updateBatch/" + ids,
            data: JSON.stringify({"flag": sign}),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                // pop_tip_open("blue", "修改成功！");
                $('#listKqSetForType').jqGrid().trigger("reloadGrid");
            },
            error: function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        })
    }
}


// /**
//  *根据年度查询节假日
//  */
// function queryYearHoliday() {
//     $.ajax({
//         url: hostUrl + "kq/hrKqHolidaySetting/queryListByYear",
//         type: "post",
//         // data: "{}",
//         data: JSON.stringify({"year":year}),
//         dataType: 'JSON',
//         contentType: 'application/json',
//         success: function (data) {
//             if (data.success == true) {
//
//             }
//         },
//         error: function (XMLHttpRequest, textStatus, errorThrown) {
//             pop_tip_open("red", textStatus);
//             $.xljUtils.tip("red", "查询失败！");
//         }
//     });
// }
//


function orgFormatter(cellValue, options, rowObject) {
    var orgName = $.hrUtils.getHROrgNameById(cellValue);
    if (orgName != null) {
        return orgName;
    } else {
        return "";
    }
}

function queryOnchange() {
    var year = $("#yearSelect option:selected").val();
    var postData = {
        "year": year
    };
    var postExData = {
        "year": year
    };

    $("#listKqSetForRest1").jqGrid("setGridParam", {postData: postData}).trigger("reloadGrid");
    $("#listKqSetForRest2").jqGrid("setGridParam", {postData: postExData}).trigger("reloadGrid");
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

//考勤期间设置回调函数
function focusIdDurationCallBack(editId) {
    focusIdDuration = editId;
    //聚焦
    $('#listKqSetForDur').jqGrid("setGridParam", {
        gridComplete: function () {
            if (editId != null && editId != "") {
                $("#listKqSetForDur").setSelection(editId);
            }
        }
    }).trigger("reloadGrid");
}


//节假日设置回调函数
function focusIdRest1CallBack(editId) {
    focusIdDuration = editId;
    //聚焦
    $('#listKqSetForRest1').jqGrid("setGridParam", {
        gridComplete: function () {
            if (editId != null && editId != "") {
                $("#listKqSetForRest1").setSelection(editId);
            }
        }
    }).trigger("reloadGrid");
}

//调休日设置回调函数
function focusIdRest2CallBack(editId) {
    focusIdDuration = editId;
    //聚焦
    $('#listKqSetForRest2').jqGrid("setGridParam", {
        gridComplete: function () {
            if (editId != null && editId != "") {
                $("#listKqSetForRest2").setSelection(editId);
            }
        }
    }).trigger("reloadGrid");
}

//假期类别设置回调函数
function focusIdTypeCallBack(editId) {
    focusIdDuration = editId;
    //聚焦
    $('#listKqSetForType').jqGrid("setGridParam", {
        gridComplete: function () {
            if (editId != null && editId != "") {
                $("#listKqSetForType").setSelection(editId);
            }
        }
    }).trigger("reloadGrid");
}

function minuteCheck() {
    var minuteLate = $("#minuteLate").val();//迟到规则
    var minuteEarly = $("#minuteEarly").val();//早退规则
    var reg = /^([1-9]\d*|[0]{1,1})$/;
    if (!reg.test(minuteLate)) {
        $("#minuteLate").val(0);
        pop_tip_open("red", "只能输入正整数，请重新输入！");
        return;
    }
    if (!reg.test(minuteEarly)) {
        $("#minuteEarly").val(0);
        pop_tip_open("red", "只能输入正整数，请重新输入！");
        return;
    }

    if (minuteLate > 60) {
        $("#minuteLate").val(0);
        pop_tip_open("red", "最大值不能大于60，请重新输入！");
        return;
    }
    if (minuteEarly > 60) {
        $("#minuteEarly").val(0);
        pop_tip_open("red", "最大值不能大于60，请重新输入！");
        return;
    }

}

// })(jQuery, window, document)