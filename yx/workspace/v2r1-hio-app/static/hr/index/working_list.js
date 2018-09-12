/**
 * 本月人员在职
 */
;
(function ($, window, document, undefined) {
var timeRangeChange;//选择的双日历时间的值
var dateFlag=false;//是否选择日期标志
var divWidth;
/**
 *初始化人员信息列表
 */
function initPersonList() {
    //创建jqGrid组件
    var jqGridHrEmpWorking = jQuery("#hrEmpWorkingList").jqGrid(
        {
            url: hostUrl + 'emp/hrEmpIndex/queryWorkingList',//创建完成之后请求数据的url
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype: "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            colNames: ['id','姓名', '手机号', '所属机构', '入职时间', '人员类别', '试用期(月)','转正日期', '现合同开始时间', '现合同结束时间'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: 'id', editable: true, sortable: false, hidden: true, align: "center"},
                {name: 'realName', label: 'name',  width: divWidth * 0.12, align: "center"},
                {name: 'mobile', index: 'phone',  width:  divWidth * 0.12, align: "center"},
                {name: 'prefixName', index: 'prefixName',  width:  divWidth * 0.12, align: "center"},
                {name: 'entryTime',index: 'entryTime', width:  divWidth * 0.10,align: "center",formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                {name: 'personType', index: 'personType', width: divWidth * 0.10, align: "center"},
                {name: 'probationPeriod', index: 'probationPeriod',  width: divWidth * 0.08, align: "center"},
                {name: 'regularTime', index: 'regularTime',  width:  divWidth * 0.10, align: "center",formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                {name: 'nowBeginTime', index: 'nowBeginTime', width: divWidth * 0.12, align: "center", formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                {name: 'nowEndTime',index: 'nowEndTime',width:  divWidth * 0.12,align: "center",formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}}
            ],
           // width: $(window).width(),
            shrinkToFit: true,
            autoScroll: true,
            sortable: false,
            rownumbers: true,
            height: $(window).height() - 200,
            autoWidth: true,
            pager: '#pager2',
            rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
            viewrecords: true,
           sortname: 'entryTime',//初始化的时候排序的字段
            sortorder: "desc",//排序方式,可选desc,asc
            postData: {},
            jsonReader: {
                repeatitems: false
            },
            onSelectRow: function () {
                var rowId = $('#hrEmpWorkingList').jqGrid("getGridParam", "selrow");
                rowData = $('#hrEmpWorkingList').jqGrid('getRowData', rowId);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                resizeHeight();
            },
            rowNum: 20,
            loadError: function (xhr, status, error) {
                //异常处理
                console.log(xhr.status);
                if (xhr.status == 404) {
                    $.xljUtils.tip("red", "请求url有误！");
                    return;
                }
                if (xhr.status == 405) {
                    $.xljUtils.tip("red", "请求方法有误！");
                    return;
                }
                $.xljUtils.tip("red", "网络异常,请联系管理员！");
            },
            loadComplete: function (xhr) {
                if (!xhr.success) {
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
                            $.xljUtils.tip("red", "查询数据失败！");
                            break;
                    }
                } else {
                    //触发刷新表格，但是不刷新页面
                    // jqGridSysInfoSet.jqGrid().trigger("reloadGrid");
                }
            }
        });
}

    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 99) + "px");
    }
//计算表格宽度
    function resizeGrid(toggleHeight) {
        if (!toggleHeight || toggleHeight > 0) { // 收缩
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 190);
        } else { // 展开
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 275);
        }
    }

    //设置细滚动条
    function setNiceScroll(str) {
        $(str).niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "26px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: true, // nicescroll可以管理水平滚动
            railpadding: {right: -12}, // 设置轨道的内间距
            background: "#fff"
        });
        $(str).getNiceScroll().show().resize();
    }


    //查询用户功能权限
    window.queryAuth=function(){
        $.ajax({
            type:'POST',
            url:hostUrl+"auth/authData/queryAuthorizationBtnList",
            dataType:'JSON',
            contentType:'application/json',
            async:false,//设置为同步
            data:JSON.stringify({"menuCode":"hr_org"}),
            success:function(json){
                var list=json.result;
                if(list!=null&&list.length>0) {
                    $.each(list,function(index,value){
                        for(var key in value){
                            if(key=="code"&&value[key]=="2"){//编辑权限
                                $("#exportBtn").show();//导出
                            }
                        }
                    });
                }
            },
            error:function(){
            }
        });
    };


//上来就执行
$(function () {
    divWidth =  $("#customtable").width();
    //功能按钮权限初始化
    queryAuth();

    //初始化人员列表
    initPersonList();

    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });

    //防止按钮刷新页面
    $('#backBtn').click(function (e) {
        //window.history.go(-1);
        window.location.href="index.html";
    });

    // 初始化双日历选择
    InitDateRangePicker();

    /**
     * 根据条件进行查询
     */
    $("#queryBtn").click(function(){
        queryByConditon();
    });

    window.queryByConditon = function () {
        if(dateFlag){
            var queryCondition = {};
            //申请时间var entryDate =timeRangeChange;
            if(timeRangeChange != '' && timeRangeChange != null){
                queryCondition.startDay = timeRangeChange[0];
                queryCondition.endDay = timeRangeChange[1];
            }
            var postData = $("#hrEmpWorkingList").jqGrid("getGridParam", "postData");
            $.each(postData, function (k, v) {
                delete postData[k];
            });
            queryCondition.startNew=0;
            var limitNew = $('#hrEmpWorkingList').getGridParam('rowNum');
            queryCondition.limitNew = parseInt(limitNew);
            $("#hrEmpWorkingList").jqGrid('setGridParam',{datatype:'json',postData:queryCondition}).trigger('reloadGrid');//动态赋值
            var postData = $("#hrEmpWorkingList").jqGrid("getGridParam", "postData");
            delete postData["startNew"];
            delete postData["limitNew"];
        }else {
            //没有选择合理的时间段
            alert("请选择合理的时间段！");
        }
    };
//todo 导出报表
//     $("#exportBtn1").click(function () {
//         // var form=new FormData();
//         window.location.href=hostUrl + "emp/hrEmpIndex/queryTest";
//     });
    $("#exportBtn").click(function () {
        var form = $("<form>");   //定义一个form表单
        var sortname = $("#hrEmpWorkingList").jqGrid().getGridParam("sortname");
        var sortorder = $("#hrEmpWorkingList").jqGrid().getGridParam("sortorder");
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'POST');
        form.attr('action', hostUrl + "emp/hrEmpIndex/workingExcel?"+window.parent.JZY.s.getAccessTokenByAuthorization());

        //查询条件
        if(timeRangeChange != '' && timeRangeChange != null && timeRangeChange != undefined) {//条件查询
            var startDay = timeRangeChange[0];
            var endDay = timeRangeChange[1];
            var queryDateStart = $('<input>');
            queryDateStart.attr('type', 'hidden');
            queryDateStart.attr('name', "startDay");
            queryDateStart.attr('value', startDay);
            form.append(queryDateStart);
            var queryDateEnd = $('<input>');
            queryDateEnd.attr('type', 'hidden');
            queryDateEnd.attr('name', "endDay");
            queryDateEnd.attr('value', endDay);
            form.append(queryDateEnd);
        }
        //排序字段  sidx（排序字段）   sord（升降序）
        if (sortname != undefined && sortname != '') { //排序字段
            var sortnameParam = $('<input>');
            sortnameParam.attr('type', 'hidden');
            sortnameParam.attr('name', "sidx");
            sortnameParam.attr('value', sortname);
            form.append(sortnameParam);
            var sortorderParam = $('<input>');
            sortorderParam.attr('type', 'hidden');
            sortorderParam.attr('name', "sord");
            sortorderParam.attr('value', sortorder);
            form.append(sortorderParam);
        }

        //todo 自定义导出名称
        var exportNameParam = $('<input>');
        exportNameParam.attr('type', 'hidden');
        exportNameParam.attr('name', "exportName");
        exportNameParam.attr('value', '本月在职人员');//入职类型
        form.append(exportNameParam);
        //todo 导出类型
        // form.append("exportName",sortname);
        // form.append("sord","本月在职人员");
        var exportNameParam = $('<input>');
        exportNameParam.attr('type', 'hidden');
        exportNameParam.attr('name', "type");
        exportNameParam.attr('value', 'working');//标志本月在职
        form.append(exportNameParam);
        // form.append("type","working");
        $('body').append(form);  //将表单放置在web中
        form.submit();   //表单提交

    });

});

/**
 * 初始化双日历选择
 */
var InitDateRangePicker = function(that) {
    $('input[name="entryDate"]').daterangepicker({
        startDate: moment().startOf('year'), //默认开始日期
        endDate: moment(), // 默认结束日期
        autoUpdateInput: false,
        showDropdowns : true,
        showCustomRangeLabel : false,
        alwaysShowCalendars : true,
        autoApply : false,
        ranges : {
            //'最近1小时': [moment().subtract('hours',1), moment()],
            '今日': [moment().startOf('day'), moment()],
            '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
            '当月': [moment().startOf('month'), moment()],
            '最近7日': [moment().subtract('days', 6), moment()],
            '最近30日': [moment().subtract('days', 29), moment()]
        },
        opens : 'left', //日期选择框的弹出位置
        buttonClasses : [ 'btn btn-default' ],
        applyClass : 'btn-small btn-primary blue',
        cancelClass : 'btn-small',
        locale : {
           // separator : that.options.seniorSeparator,
            format : 'YYYY-MM-DD', //控件中from和to 显示的日期格式
            direction: 'ltr',
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
        }
    }, function(start, end, label) {
        //$(this).val(start.format('YYYY-MM-DD') + "-" + end.format('YYYY-MM-DD'));
        timeRangeChange = [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
        dateFlag=true;
        console.log(timeRangeChange);
    });
};

})(jQuery, window, document);



