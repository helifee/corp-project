// ;(function ($, window, document, undefined) {
//出勤规则设置
//员工学习信息
var jqGridPersonStudyInfo;
//课件统计
var jqGridSubjectStatistics;

//初始化
$(function () {
    $('#subjectStatus').multipleSelect({
        width: '150px',
        filter: true,
        addTitle: true,
        minimumCountSelected: 10
    });
    $('#subjectStatus1').multipleSelect({
        width: '150px',
        filter: true,
        addTitle: true,
        minimumCountSelected: 10
    });
    $('#subjectStatus').change(function () {
        postQuery();
    });
    $("#searchBtn").click(function () {
        postQuery();
    });
    $('#subjectStatus1').change(function () {
        postQuery1();
    });
    $("#searchBtn1").click(function () {
        postQuery1();
    });

    //返回按钮
    $("#backToSmmmery").click(function () {
        window.history.go(-1);
    });

    /**
     * 没有查询按钮，回车查询
     */
    $("body").keydown(function (e) {
        if (e.keyCode == 13) {
            //处于激活状态的是员工学习情况表
            if($('.active').attr('class').indexOf('bydur')>-1){
                postQuery();
            }else{
                postQuery1();
            }

        }
    });

    pageInit();
    resizeGrid();
});

/**
 * 查询员工学习情况
 * @param userType
 */
function postQuery() {
    //用户模糊查询值
    var name = $("#name").val();
    var type = $("#subjectStatus").val();
    var typeStr="";
    if(type!=null&&type.length>0){
        for(var i=0;i<type.length;i++){
            if(typeStr.length>0){
                typeStr+=',';
            }
            typeStr+=type[i];
        }
    }
    var queryDataPost = {};
    queryDataPost.name = name;
    queryDataPost.subjectStatus = typeStr;
    jqGridPersonStudyInfo.jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
}
/**
 * 查询课件统计表
 * @param userType
 */
function postQuery1() {
    //用户模糊查询值
    var name = $("#name1").val();
    var type = $("#subjectStatus1").val();
    var typeStr="";
    if(type!=null&&type.length>0){
        for(var i=0;i<type.length;i++){
            if(typeStr.length>0){
                typeStr+=',';
            }
            typeStr+=type[i];
        }
    }
    var queryDataPost = {};
    queryDataPost.name = name;
    queryDataPost.subjectStatus = typeStr;
    jqGridSubjectStatistics.jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
}



$('.btn').click(function (e) {
    e.preventDefault();
});

function pageInit() {
    kqPlanInit();//出勤规则
    kqSetForTypeInit();//假期类别设置
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


//表格上面 切换：出勤规则设置/假期类别设置/出差类别设置/考勤规则设置
$(".right-content .con-tit button").on("click", function (e) {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    if ($(this).attr('class').indexOf('bytype') > 0) {//todo 假期类别设置
        $("#durDiv").hide();//出勤规则设置设置为none（隐藏）
        $("#bussDiv").hide();//出差设置设置为none（隐藏）
        $("#typeDiv").show();//假期类别设置设置为block（显示）
        $("#regulationSetDiv").hide();//考勤计算规则设置为none（隐藏）
        $("#holidayDiv").hide();//节假日设置为none（隐藏）
        $("#exchangeDiv").hide();//调休日设置为none（隐藏）
        $(".show1").hide();//只有节假日和调休日页签的时候显示按年度查询
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
 * 员工学习情况表
 */
function kqPlanInit() {
    var ubody = "ojt/hrOjtSubject/queryPersonStudyInfo";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridPersonStudyInfo = jQuery("#listPersonStudyInfo").jqGrid(
        {
            url: uall,
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype: "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            autowidth: true,
            jsonReader: {
                root: "result",
                repeatitems: false
            },

            rownumbers: true,
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: '序号', width: 55, hidden: true},
                {name: 'prefixName', label: '所属机构', width: 55},
                {name: 'realName', label: '姓名', width: 90, align: "center"},
                {name: 'mobile', label: '手机号', width: 90, align: "center"},
                {name: 'courName', label: '课件名称', width: 90, align: "center"},
                {name: 'subjectName', label: '所属课程', width: 90, align: "center"},
                // {name: 'subjectTypeName', label: '课程类别', width: 90, align: "center"},
                {name: 'subjectStatus', label: '课件状态', width: 90, align: "center",formatter: subjectStatusFmatter},
                {name: 'playDuration', label: '课件时长', width: 90, align: "center"},
                {name: 'totalTime', label: '累计学习时长', width: 90, align: "center",formatter: timeFmatter},
                {name: 'playTimes', label: '累计学习次数', width: 90, align: "center"},
            ],
            autowidth: true,
            shrinkToFit: true,//横向滚动条,false不显示：true:显示
            multiselect: true,
            multiboxonly: true,
            rowNum: -1,//一页显示多少条 -1全部
            sortname: "id",//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "查询员工学习情况失败!");
            },
            loadComplete: function (data) {
            },
            ondblClickRow: function (rowId, iRow, iCol, e) {
            },
            onSelectRow: function (rowid, status) {

            },

            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
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
    var property = rowData.property;//假期属性
    if (property == "系统项") {
        // pop_tip_open("red", "系统项不允许编辑！");
        // return;
        systemItemFlag = true;
    } else {
        systemItemFlag = false;
    }
    //window.open("kq_setting_holiday_type_add.html?type=update");
    // window.location.href = "kq_setting_buss_type_add.html?type=update&bussTypeEditId=" + bussTypeEditId + "&systemItemFlag=" + systemItemFlag + "&fromTag=3";
    openPa('kq_setting_buss_type_add.html?type=update&bussTypeEditId=" + bussTypeEditId + "&systemItemFlag=" + systemItemFlag + "&fromTag=3');

}


/**
 * 课件统计表
 */
function kqSetForTypeInit() {
    var ubody = "ojt/hrOjtSubject/querySubjectStatistics";
    var uall = hostUrl + ubody;
    //创建jqGrid组件
    jqGridSubjectStatistics = jQuery("#listSubjectStatistics").jqGrid(
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
                {name: 'name', label: '课件名称', width: 90, align: "center"},
                {name: 'subjectTypeName', label: '所属课程', width: 90, align: "center"},
                {name: 'subjectStatus', label: '课件状态', width: 90, align: "center",formatter: subjectStatusFmatter},
                {name: 'totalPersonNum', label: '合计学习人数', width: 90, align: "center"},
                {name: 'totalduration', label: '合计学习时长', width: 90, align: "center",formatter: timeFmatter},
                {name: 'avgduration', label: '平均学习时长', width: 90, align: "center",formatter: timeFmatter},
            ],
            rowNum: -1,//一页显示多少条 -1全部
            sortname: 'code',//初始化的时候排序的字段
            sortorder: "asc",//排序方式,可选desc,asc
            multiselect: true,
            multiboxonly: true,
            loadError: function (xhr, status, error) {
                pop_tip_open("red", "课件统计失败!");
            },
            onCellSelect: function (rowid, iCol, cellcontent, e) {

            },
            ondblClickRow: function (rowid, iRow, iCol, e) {
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
            }
        });
}

/**
 * 课件状态格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @return {string}
 */
function subjectStatusFmatter(cellvalue, options, rowObject) {
    if (cellvalue == "1009100036") {
        return "已发布";
    } else {
        return "未发布";
    }
}

/**
 * 时间格式化
 * @param cellvalue
 * @param options
 * @param rowObject
 * @return {string}
 */
function timeFmatter(cellvalue, options, rowObject) {
    return sec_to_time(cellvalue);
}


function codeFormatter(cellValue, options, rowObject) {
    var codeName = $.hrUtils.getHRCodeNameById(cellValue);
    if (codeName != null) {
        return codeName;
    } else {
        return "";
    }
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
 * 导出员工学习情况表
 */
function exportPersonStudyInfo() {
    var token=window.parent.JZY.s.getAccessTokenByAuthorization();
    var urlBody = 'ojt/hrOjtSubject/exportPersonStudyInfo?' + token;
    var urlAll = hostUrl + urlBody;

    var form =$("<form>");;   //定义一个form表单
    form.attr('target', 'exportTarget');
    form.attr('action', urlAll);
    form.attr('method', 'post');

    var name = $('<input>');
    name.attr('type', 'hidden');
    name.attr('name', 'name');
    name.attr('value', $('#name').val());
    form.append(name);

    var subjectStatus = $('<input>');
    subjectStatus.attr('type', 'hidden');
    subjectStatus.attr('name', 'subjectStatus');
    subjectStatus.attr('value', $('#subjectStatus').val());
    form.append(subjectStatus);


    $('body').append(form);  //将表单放置在web中
    form.submit();   //表单提交
    pop_tip_open('blue', '导出成功');
}
/**
 * 导出课件统计表
 */
function exportSubjectStatistics() {
    var token=window.parent.JZY.s.getAccessTokenByAuthorization();
    var urlBody = 'ojt/hrOjtSubject/exportSubjectStatistics?' + token;
    var urlAll = hostUrl + urlBody;

    var form =$("<form>");;   //定义一个form表单
    form.attr('target', 'exportTarget');
    form.attr('action', urlAll);
    form.attr('method', 'post');

    var name = $('<input>');
    name.attr('type', 'hidden');
    name.attr('name', 'name');
    name.attr('value', $('#name1').val());
    form.append(name);

    var subjectStatus = $('<input>');
    subjectStatus.attr('type', 'hidden');
    subjectStatus.attr('name', 'subjectStatus');
    subjectStatus.attr('value', $('#subjectStatus1').val());
    form.append(subjectStatus);


    $('body').append(form);  //将表单放置在web中
    form.submit();   //表单提交
    pop_tip_open('blue', '导出成功');
}
/**
 * 时间秒数格式化
 * @param s 时间戳（单位：秒）
 * @returns {*} 格式化后的时分秒
 */
var sec_to_time = function(s) {
    var t;
    if(s > -1){
        var hour = Math.floor(s/3600);
        var min = Math.floor(s/60) % 60;
        var sec = s % 60;
        if(hour < 10) {
            t = '0'+ hour + ":";
        } else {
            t = hour + ":";
        }

        if(min < 10){t += "0";}
        t += min + ":";
        if(sec < 10){t += "0";}
        t += sec.toFixed(0);
    }
    return t;
};


// })(jQuery, window, document)