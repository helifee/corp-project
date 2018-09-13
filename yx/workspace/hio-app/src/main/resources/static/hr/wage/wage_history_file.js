;(function ($,window,document,undefined) {
var jqGridUser;

//计算表格高度
window.resizeHeight = function() {
    //左侧  头部底部为60px  title类 为50px
    var w_h = $(window).height();
    //右侧只有一个列表 高一点
    //表示con-table 下的mytable1
    $(".con-table .mytable1").height((w_h - 90) + "px");
};

//计算表格宽度
window.resizeGrid = function() {
    //右边一个列表
    $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
    $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width()-1, true);
    $.xljUtils.gridResizeFn();
};


//手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

/**
 *历史报表信息
 */
window.initHistoryFileList = function() {
    var uAll = serviceUrl + "wage/wageTotal/queryWageTotal";
    //创建jqGrid组件
    jqGridUser = jQuery("#historyFileList").jqGrid(
        {
            // url: uAll,
            ajaxGridOptions: {contentType: 'application/json'},
            mtype: "POST",
            contentType: "application/json",
            postData: {"totalYear": $('#year').val()},
            datatype: "json",
            jsonReader: {},
            colModel: [
                {name : 'id',index : 'id',label : 'id',align : "center",hidden:true},
                {name : 'payPeriod',index : 'payPeriod',label : '发薪期间',align : "center"},
                {name : 'fileDate',index : 'fileDate',label : '归档时间',align : "center"},
                {name : 'person',index : 'orgCode',label : '人工成本',align : "center"},
                {name : 'before',index : 'totalYear',label : '税前工资',align : "center"},
                {name : 'siMoney',index : 'operator',label : '五险一金',align : "center"}
            ],
            rownumbers: true,
            rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
            pager: "#pager",//表格页脚的占位符(一般是div)的id
            viewrecords: true,//定义是否要显示总记录数
            rowNum: 20,//一页显示多少条
            multiselect: true,
            multiboxonly: true,//只能通过复选框进行多选
            gridComplete: function () {
                $. xljUtils.addGridScroll();
                $. xljUtils.gridResizeFn();

                var ids = $("#historyFileList").getDataIDs();
                for (var i = 0; i < ids.length; i++) {
                    var rowData = $("#historyFileList").getRowData(ids[i]);
                    if (rowData.status == "0" || rowData.status == "撤销") {//如果机构状态为注销状态，则背景色置于灰色
                        $('#' + ids[i]).find("td").addClass("SelectBG");
                    }
                }
            }
        });
    // jQuery("#historyFileList").jqGrid('filterToolbar');
};

/**
 * 状态数据格式化
 */
window.statusFmatter = function(cellvalue) {
    if(cellvalue == "1"){
        return "正常";
    }else if(cellvalue == "0"){
        return "撤销";
    }
};

/**
 * 薪资总额年度涉及年度查询
 */
window.initYear = function() {
    $.ajax({    //查询所有的账套列表
        type: "POST",
        // url:serviceUrl+ "wage/wageTotal/queryYear",
        dataType: "JSON",
        async:false,
        contentType:"application/json",
        success: function(resultData) {
            if(resultData.success) {
                var data = resultData.result;//所有具体的值信息
                if(data!=null) {
                    var result = data.totalYear;
                    if(result!=null&&result.length>0) {
                        for (var i = 0; i < result.length; i++) {
                            $("#year").append(' <option value="'+result[i].totalYear+'">'+result[i].totalYear+'</option>');
                        }
                    }

                }
            }else {
                pop_tip_open("blue", resultData.msg);
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }
    });

};


$(function () {
    initYear();//初始化年度
    //初始化高度
    resizeHeight();

    initHistoryFileList();
    //禁用所有按钮的默认行为，即刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });

    //初始化日期控件
    // initDatetimepicker();
    //在加载完表格后，设置表格的宽度
    resizeGrid();
});


$('#addBtn').click(function(){
    var idsVal = $('#historyFileList').jqGrid('getGridParam','selarrrow');
    if(idsVal&&idsVal!="") {
        if (idsVal.length > 1) {
            $.xljUtils.tip("blue", "只能选择一行数据进行修改！");
            return;
        }else{
            var rowId=$('#historyFileList').jqGrid("getGridParam","selrow");
            rowData = $('#historyFileList').jqGrid('getRowData',rowId);
            var winObjEI = window.open('wage_salary_total_edit.html?totalId='+rowData.id+"&editType=0");
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    //这里写刷新代码
                    $('#historyFileList').jqGrid().trigger("reloadGrid");
                }
            }, 1000);
        }
    }else{
        $.xljUtils.tip("blue", "请选择机构进行金额调整！");
        return;
    }
});

$('#year').change(function(e){
    // $("[id^=gs_]").val('');
    // var totalYear = $(this).children('option:selected').val();
    // var postData = $('#historyFileList').jqGrid("getGridParam", "postData");
    // $.each(postData, function (k, v) {
    //     delete postData[k];
    // });
    // postData["totalYear"]=totalYear;
    // $('#historyFileList').setGridParam({"postData":postData}).trigger("reloadGrid", [{ page: 1}]);
});

$("#seeBtn").click(function(){
    // var idsVal = $('#historyFileList').jqGrid('getGridParam','selarrrow');
    // if(idsVal&&idsVal!="") {
    //     if (idsVal.length > 1) {
    //         $.xljUtils.tip("blue", "只能选择一行数据进行查看调整过程！");
    //         return;
    //     }else{
    //         var rowId=$('#historyFileList').jqGrid("getGridParam","selrow");
    //         rowData = $('#historyFileList').jqGrid('getRowData',rowId);
    //         // var winObjEI = window.open('wage_total_details_list.html?totalId='+rowData.id);
    //         window.location.href=baseUrl+"/hr/wage/wage_total_details_list.html?totalId="+rowData.id;
    //         // var isClose = 1;
    //         // //关闭open页面时刷新父页面列表
    //         // var loop = setInterval(function () {
    //         //     if (winObjEI.closed && isClose == 1) {
    //         //         isClose--;
    //         //         //这里写刷新代码
    //         //         $('#historyFileList').jqGrid().trigger("reloadGrid");
    //         //     }
    //         // }, 1000);
    //     }
    // }else{
    //     $.xljUtils.tip("blue", "请选择需要进行查看调整过程的记录！");
    //     return;
    // }
    window.location.href="wage_history_file_details.html";
});


    //返回上一级
    window.goBack = function () {
        window.history.go(-1);
    };

})(jQuery, window, document);