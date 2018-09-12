// ;(function ($, window, document, undefined) {
//出勤规则设置
var jqGridKqPlanSet;
//出差设置
var jqGridBussType;
//考勤假期类别设置
var jqGridHolidayType;
//考勤节假日设置
var jqGridHoliday;
//考勤调休日设置
var jqGridExchange;
//出勤规则设置
var regulationSet;
//修改出勤规则id
var attendanceRulesEditId;
//节假日初始化年度
var year;
var bussTypeEditId;//出差设置编辑
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
    // resizeHeight();
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

    //返回按钮
    $("#backToSmmmery").click(function () {
        window.location.href = "kq_summary_accounts.html?status=01";
    });

    /*

        $("input[type='checkbox']").on('click', function () {

            alert("asdsad");
        })


        $("input[type='checkbox']").click(function () {
            alert("哈哈");
            //都是单击事件，判断选中状态调用不同结果
            /!*  $("#checkbox的id").click(function(){
                  if($(this).attr("checked")==true){
                      //当前为选中状态

                  }else{
                      //当前为不选中状态
                  }
              )};*!/
        });
    */

    document.onreadystatechange = loadComplete;//当页面加载状态改变的时候执行这个方法.
    queryAuth();
    pageInit();
    resizeGrid();
});

function loadComplete() {
    if (document.readyState === "complete") {
        var fromTag = $.xljUtils.getUrlParam("fromTag");
        if (fromTag !== undefined && fromTag != null && fromTag !== "" && fromTag !== "null") {
            chooseTag(parseInt(fromTag));
        }
    }
    resizeHeight();
    resizeGrid();
}


$('.btn').click(function (e) {
    e.preventDefault();
});

/*//查询用户功能权限  add by tangsq since 20180123
$.ajax({
    type: 'POST',
    url: hostUrl + "sys/sysUserInfo/queryAuthorizationBtnList",
    dataType: 'JSON',
    contentType: 'application/json',
    async: false,//设置为同步
    data: JSON.stringify({"menuCode": "zzrs"}),
    success: function (json) {
        var list = json.result;
        $.each(list, function (index, value) {
            for (var key in value) {
                if (key == "code" && value[key] == "editAuthBtn") {   //编辑权限
                    $("#addAttendanceRules").show();//出勤设置  新增出勤规则
                    $("#delAttendanceRulesById").show();// 出勤设置  删除出勤规则

                    $("#addHolidayBtn").show();// 假期设置  新增
                    $("#editHolidayBtn").show();// 假期设置 修改
                    $("#delHolidayBtn").show();// 假期设置 删除
                    $("#startHolidayBtn").show();// 假期设置 启用
                    $("#revokeHolidayBtn").show();// 假期设置 禁用

                    $("#addBussBtn").show();// 出差设置 新增
                    $("#editBussBtn").show();// 出差设置 修改
                    $("#delBussBtn").show();// 出差设置 删除
                    $("#startBussBtn").show();// 出差设置 启用
                    $("#revokeBussBtn").show();// 出差设置 禁用

                    $("#saveBtn").show();//考勤计算规则  保存
                }

            }
        });
    },
    error: function () {
        //alert("error");
    }
});*/

//查询用户功能权限
window.queryAuth = function () {
    $.ajax({
        type: 'POST',
        url: hostUrl + "auth/authData/queryAuthorizationBtnList",
        dataType: 'JSON',
        contentType: 'application/json',
        async: false,//设置为同步
        data: JSON.stringify({"menuCode": "hr_attendance"}),
        success: function (json) {
            var list = json.result;
            $.each(list, function (index, value) {
                for (var key in value) {
                    if (key == "code" && value[key] == "2") {//编辑权限
                        $("#addAttendanceRules").show();//出勤设置  新增出勤规则
                        $("#delAttendanceRulesById").show();// 出勤设置  删除出勤规则

                        $("#addHolidayBtn").show();// 假期设置  新增
                        $("#editHolidayBtn").show();// 假期设置 修改
                        $("#delHolidayBtn").show();// 假期设置 删除
                        $("#startHolidayBtn").show();// 假期设置 启用
                        $("#revokeHolidayBtn").show();// 假期设置 禁用

                        $("#addBussBtn").show();// 出差设置 新增
                        $("#editBussBtn").show();// 出差设置 修改
                        $("#delBussBtn").show();// 出差设置 删除
                        $("#startBussBtn").show();// 出差设置 启用
                        $("#revokeBussBtn").show();// 出差设置 禁用

                        $("#saveBtn").show();//考勤计算规则  保存
                    }

                }
            });
        },
        error: function () {
        }
    });
};

function pageInit() {
    kqPlanInit();//出勤规则
    kqSetForTypeInit();//假期类别设置
    kqSetForBussType();//出差设置
    queryRegulation();//考勤计算规则
    kqSetForRest1Init();//节假日
    kqSetForRest2Init();//调休日
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
    if (!$(".mytable1").is(":hidden")) {
        $(".con-table .mytable1").height((w_h - 120) + "px");
    } else if (!$(".mytable2").is(":hidden")) {
        $(".con-table .mytable2").height((w_h - 120) + "px");
    } else if (!$(".mytable3").is(":hidden")) {
        $(".con-table .mytable3").height((w_h - 120) + "px");
    } else if (!$(".mytable4").is(":hidden")) {
        $(".con-table .mytable4").height((w_h - 120) + "px");
    } else if (!$(".mytable5").is(":hidden")) {
        $(".con-table .mytable5").height((w_h - 120) + "px");
    }

}

//计算表格宽度
function resizeGrid() {
    // $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height());
    // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
    //解决多页签切换页面大小数据全部丢失的问题

    var w_h = $(window).height();

    //180

    if (!$(".mytable1").is(":hidden")) {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight(w_h - 180);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
    } else if (!$(".mytable2").is(":hidden")) {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight(w_h - 180);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable2').width(), true);
    } else if (!$(".mytable3").is(":hidden")) {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight(w_h - 180);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable3').width(), true);
    } else if (!$(".mytable4").is(":hidden")) {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight(w_h - 180);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable4').width(), true);
    } else if (!$(".mytable5").is(":hidden")) {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight(w_h - 180);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable5').width(), true);
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
        //window.open("kq_setting_basic_annual_formula_set.html");
        window.location.href = "kq_setting_basic_annual_formula_set.html?fromTag=4";
    }
}

//表格上面 切换：出勤规则设置/假期类别设置/出差类别设置/考勤规则设置
$(".right-content .con-tit button").on("click", function (e) {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    if ($(this).attr('class').indexOf('byrest') > 0) {// todo 出差设置
        $("#durDiv").hide();//出勤规则设置为none（隐藏）
        $("#bussDiv").show();//出差设置为none（显示）
        $("#typeDiv").hide();//假期类别设置为block（隐藏）
        $("#regulationSetDiv").hide();//考勤计算规则设置为none（隐藏）
        $("#holidayDiv").hide();//节假日设置为none（隐藏）
        $("#exchangeDiv").hide();//调休日设置为none（隐藏）
        $(".show1").hide();//只有节假日和调休日页签的时候显示按年度查询
    } else if ($(this).attr('class').indexOf('bytype') > 0) {//todo 假期类别设置
        $("#durDiv").hide();//出勤规则设置设置为none（隐藏）
        $("#bussDiv").hide();//出差设置设置为none（隐藏）
        $("#typeDiv").show();//假期类别设置设置为block（显示）
        $("#regulationSetDiv").hide();//考勤计算规则设置为none（隐藏）
        $("#holidayDiv").hide();//节假日设置为none（隐藏）
        $("#exchangeDiv").hide();//调休日设置为none（隐藏）
        $(".show1").hide();//只有节假日和调休日页签的时候显示按年度查询
    } else if ($(this).attr('class').indexOf('byoth') > 0) {//todo 考勤计算规则
        $("#durDiv").hide();//出勤规则设置设置为none（隐藏）
        $("#bussDiv").hide();//出差设置设置为none（隐藏）
        $("#typeDiv").hide();//假期类别设置设置为none（隐藏）
        $("#regulationSetDiv").show();//考勤计算规则设置为block（显示）
        $("#holidayDiv").hide();//节假日设置为none（隐藏）
        $("#exchangeDiv").hide();//调休日设置为none（隐藏）
        $(".show1").hide();//只有节假日和调休日页签的时候显示按年度查询
    } else if ($(this).attr('class').indexOf('byHoliday') > 0) {//todo 节假日设置
        $("#durDiv").hide();//出勤规则设置设置为none（隐藏）
        $("#bussDiv").hide();//出差设置设置为none（隐藏）
        $("#typeDiv").hide();//假期类别设置设置为none（隐藏）
        $("#regulationSetDiv").hide();//考勤计算规则设置为none（隐藏）
        $("#holidayDiv").show();//节假日设置为block（显示）
        $("#exchangeDiv").hide();//调休日设置为none（隐藏）
        $(".show1").show();//只有节假日和调休日页签的时候显示按年度查询
    } else if ($(this).attr('class').indexOf('byExchange') > 0) {//todo 调休日设置
        $("#durDiv").hide();//出勤规则设置设置为none（隐藏）
        $("#bussDiv").hide();//出差设置设置为none（隐藏）
        $("#typeDiv").hide();//假期类别设置设置为none（隐藏）
        $("#regulationSetDiv").hide();//考勤计算规则设置
        $("#holidayDiv").hide();//节假日设置为none（隐藏）
        $("#exchangeDiv").show();//调休日设置为block（显示）
        $(".show1").show();//只有节假日和调休日页签的时候显示按年度查询
    } else {//todo 出勤规则设置
        $("#durDiv").show();//出勤规则设置设置为block（显示）
        $("#bussDiv").hide();//出差设置设置为none（隐藏）
        $("#typeDiv").hide();//假期类别设置设置为none（隐藏）
        $("#regulationSetDiv").hide();//考勤计算规则设置为none（隐藏）
        $("#holidayDiv").hide();//节假日设置为none（隐藏）
        $("#exchangeDiv").hide();//调休日设置为none（隐藏）
        $(".show1").hide();//只有节假日和调休日页签的时候显示按年度查询
    }
    $.xljUtils.gridResizeFn();
    e.stopPropagation();
});


/**
 * 考勤设置：出勤规则查询
 */
function kqPlanInit() {
    var ubody = "kq/hrKqPlan/queryListOrderForAttendance";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridKqPlanSet = jQuery("#listKqAttendanceRules").jqGrid(
        {
            url: uall,
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype: "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            jsonReader: {
                root: "result",
                repeatitems: false
            },

            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: '序号', width: 55, hidden: true},
                {name: 'planId', label: '方案id', width: 55, hidden: true},
                // {name: 'id', label: '序号', width: 55},
                // {name: 'planId', label: '方案id', width: 55},
                {
                    name: 'name', label: '方案名称', width: 90, align: "center"
                    /*,
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        //合并单元格
                        return 'id=\'name' + rowId + "\'";
                    }*/
                },
                {
                    name: 'ifSign', label: '是否打卡', width: 90, align: "center", formatter: signFormatter
                    /* ,
                     cellattr: function (rowId, tv, rawObject, cm, rdata) {
                         //合并单元格
                         return 'id=\'ifSign' + rowId + "\'";
                     }*/
                },
                {
                    name: 'attendanceTime', label: '出勤时间', width: 90, align: "center"
                    /*,
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        //合并单元格
                        return 'id=\'attendanceTime' + rowId + "\'";
                    }*/
                },
                {name: 'signAddress', label: '考勤地点', width: 90, align: "center"},
                /* {name: 'signAddress', label: '地点', width: 90, align: "center"},
                 {name: 'gateway', label: '网关', width: 90, align: "center"},
                 {name: 'signScope', label: '范围', width: 90, align: "center"},*/

            ],


            autowidth: true,
            shrinkToFit: true,//横向滚动条,false不显示：true:显示
            multiselect: true,
            multiboxonly: true,
            rowNum: -1,//一页显示多少条 -1全部
            sortname: "id",//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "查询出勤规则查询失败!");
            },
            loadComplete: function (data) {
            },
            ondblClickRow: function (rowId, iRow, iCol, e) {
                var rowData = $("#listKqAttendanceRules").getRowData(rowId);
                editAttendanceRules(rowData.planId);
            },
            onSelectRow: function (rowid, status) {
                var rowData = $("#listKqAttendanceRules").getRowData(rowid);
                var planId = rowData.planId;
                $("input[type='checkbox'][value='" + planId + "']").attr("checked", "checked");
            },

            gridComplete: function () {
                /*Merger4("listKqAttendanceRules", 'name');

               var rowIds = jQuery("#listKqAttendanceRules").jqGrid('getDataIDs');
               for (var k = 0; k < rowIds.length; k++) {
                   var curRowData = jQuery("#listKqAttendanceRules").jqGrid('getRowData', rowIds[k]);
                   var curChk = $("#" + rowIds[k] + "").find(":checkbox");
                   curChk.attr('name', 'name');   //给每一个checkbox赋名字
                   curChk.attr('value', curRowData['planId']);   //给checkbox赋值
                   // curChk.attr('title', curRowData['name'] );   //给checkbox赋予额外的属性值
               }*/

                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                var rowData = $('#listKqAttendanceRules').jqGrid('getRowData');
                //如果焦点id不为空
                if (focusIdDuration != undefined && focusIdDuration != null) {
                    //闪亮聚焦
                    $("#listKqAttendanceRules").setSelection(focusIdDuration);
                }
            }
        });
    /*  .setColProp("cb", {
      cellattr: function (rowId, tv, rawObject, cm, rdata) {
          //合并单元格
          return 'id=\'cb' + rowId + "\'";
      }
  });*/

    /*
    todo 打卡地点的显示改为一个方案显示一条，不进行标题合并和行列合并了，在后台进行拼接字段jQuery("#listKqAttendanceRules").jqGrid('setGroupHeaders', {
        useColSpanStyle: true,
        groupHeaders: [
            {startColumnName: 'signAddress', numberOfColumns: 3, titleText: '<em class="title_font">考勤地点</em>'}
        ]
    });*/
    // $("#listCourseware").setColProp("startDate", {editable: true});
    /*$("#listKqAttendanceRules").setColProp("cb", {
        cellattr: function (rowId, tv, rawObject, cm, rdata) {
            //合并单元格
            return 'id=\'cb' + rowId + "\'";
        }
    });*/
}


//修改出勤规则
function editAttendanceRules(id) {
    if (id == null || id == "") {
        var ids = jqGridKqPlanSet.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择要修改的记录！");
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
        } else {
            var rowData = $("#listKqAttendanceRules").getRowData(ids[0]);
            attendanceRulesEditId = rowData.planId;
            // window.open("kq_setting_attendance_rules.html?type=update");
            window.location.href = "kq_setting_attendance_rules.html?type=update&attendanceRulesEditId=" + attendanceRulesEditId;
        }
    } else {
        attendanceRulesEditId = id;
        // window.open("kq_setting_attendance_rules.html?type=update");
        window.location.href = "kq_setting_attendance_rules.html?type=update&attendanceRulesEditId=" + attendanceRulesEditId;
    }
}

/**
 * 出差设置
 */
function kqSetForBussType() {
    var ubody = "kq/hrKqBusstypeSetting/queryListByCondition";
    var uall = hostUrl + ubody;

    //创建jqGrid组件
    jqGridBussType = jQuery("#listKqSetForBuss").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            // postData: {"year": year},
            postData: {},
            datatype: "json",
            autowidth: true,
            jsonReader: {
                root: "result"
            },

            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: 'id', hidden: true, width: 55, align: "center", sortable: false},
                {name: 'code', label: '出差编码', width: 90, align: "center"},
                {name: 'name', label: '出差名称', width: 90, align: "center"},
                {name: 'unit', label: '出差单位', width: 90, align: "center"},
                {name: 'calculateRule', label: '计算规则', width: 90, align: "center", hidden: true},
                {name: 'calculateRuleValue', label: '计算规则', width: 90, align: "center"},
                {name: 'status', label: '状态', width: 90, align: "center", hidden: true},
                {name: 'statusValue', label: '状态', width: 90, align: "center"},
                {name: 'property', label: '出差属性', width: 90, align: "center", hidden: true},
                {name: 'propertyValue', label: '出差属性', width: 90, align: "center"},
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
                pop_tip_open("red", "出差设置查询失败!");
            },
            loadComplete: function (data) {
            },
            ondblClickRow: function (rowid, iRow, iCol, e) {
                editBussTrip(rowid);
            },
            gridComplete: function (data) {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                //如果焦点id不为空
                if (focusIdRest1 != undefined && focusIdRest1 != null) {
                    //闪亮聚焦
                    $("#listKqSetForBuss").setSelection(focusIdRest1);
                }
            }
        });
}

//出差设置编辑
function editBussTrip(id) {

    if (id == null || id == "") {
        var ids = jqGridBussType.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids.length == 0) {
            pop_tip_open("red", "请选择要修改的记录！");
            return;
        } else if (ids.length > 1) {
            pop_tip_open("red", "只能选择一条记录！");
            return;
        } else {
            bussTypeEditId = ids[0];
        }
    } else {
        bussTypeEditId = id;
    }

    var rowData = $('#listKqSetForBuss').jqGrid('getRowData', bussTypeEditId);
    var property = rowData.propertyValue;//假期属性
    if (property == "系统项") {
        // pop_tip_open("red", "系统项不允许编辑！");
        // return;
        systemItemFlag = true;
    } else {
        systemItemFlag = false;
    }
    //window.open("kq_setting_holiday_type_add.html?type=update");
    // window.location.href = "kq_setting_buss_type_add.html?type=update&bussTypeEditId=" + bussTypeEditId + "&systemItemFlag=" + systemItemFlag + "&fromTag=3";
    var url = 'kq_setting_buss_type_add.html?type=update&bussTypeEditId=' + bussTypeEditId + '&systemItemFlag=' + systemItemFlag + '&fromTag=3';
    openPa(url);
}


/**
 * 考勤设置：假期类别设置
 */
function kqSetForTypeInit() {
    var ubody = "kq/hrKqHolidaytypeSetting/queryList2";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridHolidayType = jQuery("#listKqSetForHolidayType").jqGrid(
        {
            url: uall,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"orgId": "", "includelow": "0"},
            datatype: "json",
            autowidth: true,
            jsonReader: {
                root: "result"
            },
            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: 'id', hidden: true, width: 55, align: "center", sortable: false},
                /*{name: 'code', label: '假期编码', width: 90, align: "center"},*/
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
                var rowData = $("#listKqSetForHolidayType").getRowData(rowid);
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
                    $("#listKqSetForHolidayType").setSelection(focusIdType);
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
    var rowData = $('#listKqSetForHolidayType').jqGrid('getRowData', editId);
    var propertyValue = rowData.propertyValue;//假期属性
    if (propertyValue == "系统项") {
        // pop_tip_open("red", "系统项不允许编辑！");
        // return;
        systemItemFlag = true;
    } else {
        systemItemFlag = false;
    }
    holidayTypeEditId = editId;
    //window.open("kq_setting_holiday_type_add.html?type=update");
    window.openPa("kq_setting_holiday_type_add.html?type=update&holidayTypeEditId=" + editId + "&systemItemFlag=" + systemItemFlag + "&fromTag=2");

}


/**
 * 弹出新增页面
 */
// var durAddType = 0;
function addAttendanceRules(sign) {
    if (sign == 0) {
        // window.open("kq_setting_attendance_rules.html?type=add");
        window.location.href = "kq_setting_attendance_rules.html?type=add";
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
        // window.location.href = "";
        window.openPa("kq_setting_holiday_type_add.html?type=add&fromTag=2");
    }
}

/**
 * 删除出勤规则
 */
function delAttendanceRulesById() {
    //选中一条记录
    var ids = jqGridKqPlanSet.jqGrid('getGridParam', 'selarrrow');

    if (ids === "" || ids == null || ids.length == 0) {
        pop_tip_open("red", "请选择要删除的记录！");
    } else {
        var planIds = new Array();
        for (var i = 0; i < ids.length; i++) {
            var rowData = $('#listKqAttendanceRules').jqGrid('getRowData', ids[i]);
            if (rowData.planId != null || rowData.planId != "") {
                planIds[planIds.length] = rowData.planId;
            }
        }
        //var rowData = $('#subjectList').jqGrid('getRowData', rowId);

        pop_text_open("blue", '确认删除这【' + ids.length + '】条数据吗？', function () {
            var urlBody = "kq/hrKqPlan/deleteBatchInfo/" + planIds;
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
                        var w = $.hrUtils.focusNode(ids);
                        $('#listKqAttendanceRules').jqGrid("setGridParam", {}).trigger("reloadGrid");
                        w = "";
                        /*$('#listKqAttendanceRules').jqGrid("setGridParam", {
                             gridComplete: function () {
                                 if (w != null && w != "") {
                                     $('#listKqAttendanceRules').setSelection(w);
                                 }
                                 w = "";
                             }
                        }).trigger("reloadGrid");*/
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
            var rowData = $('#listKqSetForHolidayType').jqGrid('getRowData', ids[i]);
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
                        $('#listKqSetForHolidayType').jqGrid().trigger("reloadGrid");
                        // userQuery();
                        var w = $.hrUtils.focusNode(ids);
                        $('#listKqSetForHolidayType').jqGrid("setGridParam", {
                            gridComplete: function () {
                                if (w != null && w != "") {
                                    $('#listKqSetForHolidayType').setSelection(w);
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
 * 删除出差设置
 */
function delBussTypeById() {
    //选中一条记录
    var ids = jqGridHoliday.jqGrid('getGridParam', 'selarrrow');
    if (ids == "" || ids == null) {
        pop_tip_open("blue", "请选择一条记录");
    } else {
        var count = 0;//统计要删除的数据中包含几条系统项
        for (var i = 0; i < ids.length; i++) {
            var rowData = $('#listKqSetForBuss').jqGrid('getRowData', ids[i]);
            var property = rowData.propertyValue;//假期属性
            if (property == "系统项") {
                count++;
            }

            var listSize = bussRestUseCheck(rowData.id, '');
            if (listSize > 0) {
                pop_tip_open("red", "出差设置：" + rowData.name + "已使用，不允许删除！");
                return;
            }
        }

        if (count > 0) {
            pop_tip_open("red", "系统项不允许删除，请重新选择！");
            return;
        }
        pop_text_open("blue", '确认删除这【' + ids.length + '】条数据吗？', function () {
            var urlBody = "kq/hrKqBusstypeSetting/deleteBatch/" + ids;
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
                        $('#listKqSetForBuss').jqGrid().trigger("reloadGrid");
                        // userQuery();
                        var w = $.hrUtils.focusNode(ids);
                        $('#listKqSetForBuss').jqGrid("setGridParam", {
                            gridComplete: function () {
                                if (w != null && w != "") {
                                    $('#listKqSetForBuss').setSelection(w);
                                }
                                w = "";
                            }
                        }).trigger("reloadGrid");
                    } else {
                        pop_tip_open("red", json.msg);
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "删除出差设置请求失败");
                }
            })
        }, true);
    }
}


/**
 * 查看出差设置是否被使用
 * @param typeId 出差类型主键id
 * @param type   值为'update'时过滤掉审批完成的记录
 * @return {*}
 */
function bussRestUseCheck(typeId, type) {
    var listSize;
    var urlBody = "kq/hrKqBusstypeSetting/queryIsApproval";
    var urlAll = hostUrl + urlBody;
    $.ajax({
        type: 'POST',
        url: urlAll,
        async: false,
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify({"ids": typeId, "type": type}),
        success: function (data) {
            if (data.success == true) {
                listSize = data.result;
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "服务异常,请联系管理员！");
        }
    });
    return listSize;
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
        if (hrKqRegulationArr[i].name != "id") {
            hrKqRegulationDto[hrKqRegulationArr[i].name] = hrKqRegulationArr[i].value;
        }
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

/**
 * 查询出勤规则
 */
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
            if (result != null && result.length > 0) {
                $("#id").val(result[0].sid);
                var minuteLate = result[0].minuteLate;
                var minuteEarly = result[0].minuteEarly;
                $("#minuteLate").val(minuteLate);
                $("#minuteEarly").val(minuteEarly);
                $("#absenceDays01").val(result[0].absenceDays01);
                $("#absenceDays02").val(result[0].absenceDays02);
                $("#absenceDays03").val(result[0].absenceDays03);
                $("#absenceRulesMinutes01").val(result[0].absenceRulesMinutes01);
                $("#absenceRulesMinutes02").val(result[0].absenceRulesMinutes02);
                $("#noSignTimes").val(result[0].noSignTimes);
            } else {
                $("#minuteLate").val(0);
                $("#minuteEarly").val(0);
                $("#absenceDays01").val(0);
                $("#absenceDays02").val(0);
                $("#absenceDays03").val(0);
                $("#absenceRulesMinutes01").val(0);
                $("#absenceRulesMinutes02").val(0);
                $("#noSignTimes").val(0);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", textStatus);
            $.xljUtils.tip("red", "出勤规则查询失败！");
        }
    });
}

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
function editHolidayTypeStatus(sign) {
    var ids = jqGridHolidayType.jqGrid('getGridParam', 'selarrrow');
    if (ids === "" || ids.length === 0) {
        pop_tip_open("red", "请选择要修改的记录！");
    } else {
        var countTrue = 0;//已选择的记录中启用状态的假期类型数量
        var countFalse = 0;//已选择的记录中禁用状态的假期类型数量
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            var rowData = $("#listKqSetForHolidayType").getRowData(id);
            var status = rowData.status;
            if (status === "1092100169") {//启用
                countTrue++;
            } else if (status === "1092100170") {//禁用
                countFalse++;
            }
        }

        if (sign === true && countFalse === 0) {//要执行启用操作，但是选择的记录中没有处于禁用状态的
            pop_tip_open("red", "您所选的记录均处于启用状态，无需再次启用！");
            return;
        }
        if (sign === false && countTrue === 0) {//要执行禁用操作，但是选择的记录中没有处于启用状态的
            pop_tip_open("red", "您所选的记录均处于禁用状态，无需再次禁用！");
            return;
        }
        $.ajax({
            type: "put",
            url: hostUrl + "kq/hrKqHolidaytypeSetting/updateBatch/" + ids,
            data: JSON.stringify({"flag": sign, "type": "update"}),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (data) {
                if (data.msg == null && data.success == false) {
                    pop_tip_open("red", "选择的假期已经被使用，无法禁用！");

                }
                $('#listKqSetForHolidayType').jqGrid().trigger("reloadGrid");

                if (sign === true) {
                    pop_tip_open("blue", "启用成功！");
                } else {
                    pop_tip_open("blue", "禁用成功！");
                }

            },
            error: function (xhr) {
                $.xljUtils.getError(xhr.status);
            }
        })
    }
}


/**
 *编辑出差类别状态：true 启用  false 禁用
 */
function editBussStatus(sign) {
    var ids = jqGridBussType.jqGrid('getGridParam', 'selarrrow');
    if (ids === "" || ids.length === 0) {
        pop_tip_open("red", "请选择要修改的记录！");
    } else {
        var count = bussRestUseCheck(ids, 'update');
        if (count > 0) {
            pop_tip_open("red", "出差设置：" + rowData.name + "已使用，禁止操作！");
            return;
        } else {

            var countTrue = 0;//已选择的记录中启用状态的出差类型数量
            var countFalse = 0;//已选择的记录中禁用状态的出差类型数量
            for (var i = 0; i < ids.length; i++) {
                var id = ids[i];
                var rowData = $("#listKqSetForBuss").getRowData(id);
                var status = rowData.status;
                if (status === "1092100169") {//启用
                    countTrue++;
                } else if (status === "1092100170") {//禁用
                    countFalse++;
                }
            }

            if (sign === true && countFalse === 0) {//要执行启用操作，但是选择的记录中没有处于禁用状态的
                pop_tip_open("red", "您所选的记录均处于启用状态，无需再次启用！");
                return;
            }
            if (sign === false && countTrue === 0) {//要执行禁用操作，但是选择的记录中没有处于启用状态的
                pop_tip_open("red", "您所选的记录均处于禁用状态，无需再次禁用！");
                return;
            }

            $.ajax({
                type: "put",
                url: hostUrl + "kq/hrKqBusstypeSetting/updateBatch/" + ids,
                data: JSON.stringify({"flag": sign}),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.msg == null && data.success == false) {
                        pop_tip_open("red", "选择的假期已经被使用，无法禁用！");

                    }
                    $('#listKqSetForBuss').jqGrid().trigger("reloadGrid");

                    if (sign === true) {
                        pop_tip_open("blue", "启用成功！");
                    } else {
                        pop_tip_open("blue", "禁用成功！");
                    }

                },
                error: function (xhr) {
                    $.xljUtils.getError(xhr.status);
                }
            })
        }

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


//验证天数
function dayCheck(a) {
    var value = $(a).val();
    if (value < 0) {
        $("#minuteLate").val(0);
        pop_tip_open("red", "只能输入正整数，请重新输入！");
        return;
    }
}

//验证次数
function timeCheck(a) {
    var value = $(a).val();
    var reg = /^([1-9]\d*|[0]{1,1})$/;
    if (!reg.test(value)) {
        pop_tip_open("red", "只能输入正整数，请重新输入！");
        return;
    }
    /*if(value>2){
        pop_tip_open("red", "只能输入正整数，请重新输入！");
        return;
    }*/

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


function signFormatter(cellValue, options, rowObject) {
    var value = "";
    if (cellValue !== undefined && cellValue !== null && cellValue !== "") {
        if (cellValue === "1") {
            value = "是";
        } else if (cellValue === "0") {
            value = "否";
        }
    }
    return value;
}

/**
 * 子页面返回父页面确定返回到哪一个页签
 *
 *  2 假期设置  3 出差设置  4 年假公式
 * @param tagNum
 */
function chooseTag(tagNum) {
    if (tagNum === 2 || tagNum === 4) {//假期设置
        $("#holidayType").click();
    } else if (tagNum === 3) {//出差设置
        $("#bussType").click();
    }
}

Array.prototype.indexOf = function (val) { //prototype 给数组添加属性
    for (var i = 0; i < this.length; i++) { //this是指向数组，this.length指的数组类元素的数量
        if (this[i] == val) return i; //数组中元素等于传入的参数，i是下标，如果存在，就将i返回
    }
    return -1;
};
//delete mya[a]; mya.remove(rowId);
Array.prototype.remove = function (val) {  //prototype 给数组添加属性
    var index = this.indexOf(val); //调用index()函数获取查找的返回值
    if (index > -1) {
        this.splice(index, 1); //利用splice()函数删除指定元素，splice() 方法用于插入、删除或替换数组的元素
    }
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


/**
 * 合并单元格
 * todo 合并一个字段
 * @param gridName  jqGrid的id
 * @param CellName  jqGrid要合并的列name
 * @constructor
 */
/*function Merger4(gridName, CellName) {
    //得到显示到界面的id集合
    var mya = $("#" + gridName + "").getDataIDs();

    //当前显示多少条
    var length = mya.length;
    for (var i = 0; i < length; i++) {
        if (mya[i] != undefined) {
            //从上到下获取一条信息
            var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]);
            var rowSpanTaxCount = 1;
            //定义合并行数
            for (j = i + 1; j <= length; j++) {
                //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
                var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]);
                if (before[CellName] == end[CellName]) {
                    rowSpanTaxCount++;
                    $("#" + gridName + "").setCell(mya[j], CellName, '', {display: 'none'});
                    var rowData = $("#" + gridName).jqGrid('getRowData');
                    $("#jqg_" + gridName + '_' + rowData[i + 1].id).hide();
                } else {
                    break;
                }
            }
            $("#" + CellName + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount);//最后合并需要合并的行与合并的行数
        }
    }
}*/

/**
 * 合并单元格
 *
 * todo 合并多个字段
 *
 * @param gridName      jqGrid的id
 * @param cellNameArr   jqGrid要合并的列name组成的数组
 *
 * 如：var CellNameArr = [];
 * CellNameArr.push("name");
 * CellNameArr.push("ifSign");
 * CellNameArr.push("attendanceTime");
 * MergerShe("listKqAttendanceRules", CellNameArr);
 * @constructor
 */
/*function MergerShe(gridName, cellNameArr) {
    //得到显示到界面的id集合
    var mya = $("#" + gridName + "").getDataIDs();
    //当前显示多少条
    var length = mya.length;
    for (var i = 0; i < length; i++) {
        //从上到下获取一条信息
        var before = $("#" + gridName + "").jqGrid('getRowData', mya[i]);
        //定义合并行数
        var rowSpanTaxCount = 1;
        for (j = i + 1; j <= length; j++) {
            //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
            var end = $("#" + gridName + "").jqGrid('getRowData', mya[j]);
            // var cellNames = CellName.split(",");
            for (var n = 0; n < cellNameArr.length; n++) {
                if (before['id'] = end['id']) {
                    if (before[cellNameArr[n]] == end[cellNameArr[n]]) {
                        rowSpanTaxCount++;
                        $("#" + gridName + "").setCell(mya[j], cellNameArr[n], '', {display: 'none'});
                        var rowData = $("#" + gridName).jqGrid('getRowData');
                        $("#jqg_" + gridName + '_' + rowData[i + 1].id).hide();
                    } else {
                        rowSpanTaxCount = 1;
                        break;
                    }
                }
                $("#" + cellNameArr[n] + "" + mya[i] + "").attr("rowspan", rowSpanTaxCount);//最后合并需要合并的行与合并的行数

            }
        }
    }
}*/


//todo 2018.5.21  应李伟要求把节假日和调休日也放这个页面
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
            openPa("kq_setting_basic_holiday_add.html?type=update");
        }
    } else {
        holidayEditId = id;
        // window.open("kq_setting_basic_holiday_add.html?type=update");
        openPa("kq_setting_basic_holiday_add.html?type=update");
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
            openPa("kq_setting_basic_exchange_add.html?type=update");
        }
    } else {
        exchangeEditId = id;
        // window.open("kq_setting_basic_exchange_add.html?type=update");
        openPa("kq_setting_basic_exchange_add.html?type=update");
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
        openPa("kq_setting_basic_holiday_add.html?type=add");
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
        openPa("kq_setting_basic_exchange_add.html?type=add");
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
                        // $('#listKqSetForRest2').jqGrid().trigger("reloadGrid");
                        // userQuery();
                        var w = $.hrUtils.focusNode(ids);
                        focusIdCallBack(w);
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

//回调函数
function focusIdCallBack(editId) {
    focusId = editId;
}

// })(jQuery, window, document)