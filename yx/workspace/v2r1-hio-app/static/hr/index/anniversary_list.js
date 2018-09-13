/**
 * 本月人员在职
 */
;
(function ($, window, document, undefined) {
    var queryDay;
    var divWidth;
/**
 *初始化人员信息列表
 */
function initPersonList() {
    //创建jqGrid组件
    var jqGridHrEmpWorking = jQuery("#hrEmpAnniversaryList").jqGrid(
        {
            url: hostUrl + 'emp/hrEmpIndex/queryAnniversaryList',//创建完成之后请求数据的url
            datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype: "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            colNames: ['id','姓名', '手机号', '所属机构','人员类别', '入职时间', '入职周年（司龄）'],//列名
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name: 'id', label: 'id', hidden: true, align: "center"},
                {name: 'realName', label: 'name', width: divWidth * 0.2, align: "center"},
                {name: 'mobile', index: 'phone',  width: divWidth * 0.16, align: "center"},
                {name: 'prefixName', index: 'prefixName',width: divWidth * 0.16, align: "center"},
                {name: 'personType', index: 'personType',width: divWidth * 0.16, align: "center"},
                {name: 'entryTime',index: 'entryTime', width: divWidth * 0.16,align: "center",formatter: 'date',formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
                {name: 'anniversary', index: 'anniversary', width: divWidth * 0.16, align: "center"},
            ],
            shrinkToFit: false,
            autoScroll: true,
            sortable: false,
            rownumbers: true,
            height: $(window).height() - 200,
            autoWidth: true,
            pager: '#pager2',
            rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
            viewrecords: true,
            sortname: 'entryTime',//初始化的时候排序的字段
            sortorder: "desc",
            postData: {},
            jsonReader: {
                repeatitems: false
            },
            onSelectRow: function () {
                var rowId = $('#hrEmpAnniversaryList').jqGrid("getGridParam", "selrow");
                rowData = $('#hrEmpAnniversaryList').jqGrid('getRowData', rowId);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
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

    // 初始化日历
    Datetime();

    window.queryByConditon = function () {
         queryDay=$("#entryDate").val();
         if(queryDay !=null && queryDay != undefined){
            var queryCondition = {};
            queryCondition.queryDay = queryDay;
            var postData = $("#hrEmpAnniversaryList").jqGrid("getGridParam", "postData");
            $.each(postData, function (k, v) {
                delete postData[k];
            });
            queryCondition.startNew=0;
            var limitNew = $('#hrEmpAnniversaryList').getGridParam('rowNum');
            queryCondition.limitNew = parseInt(limitNew);
            $("#hrEmpAnniversaryList").jqGrid('setGridParam',{datatype:'json',postData:queryCondition}).trigger('reloadGrid');//动态赋值
            var postData = $("#hrEmpAnniversaryList").jqGrid("getGridParam", "postData");
            delete postData["startNew"];
            delete postData["limitNew"];
         }else {
             alert("请选择时间！");
         }
    };
//todo 导出报表
    $("#exportBtn").click(function () {
        var form = $("<form>");   //定义一个form表单
        var sortname = $("#hrEmpAnniversaryList").jqGrid().getGridParam("sortname");
        var sortorder = $("#hrEmpAnniversaryList").jqGrid().getGridParam("sortorder");

        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', hostUrl + "emp/hrEmpIndex/anniversaryExcel?"+window.parent.JZY.s.getAccessTokenByAuthorization());
        //查询条件
        if(queryDay != '' && queryDay != null && queryDay !=undefined ) {//条件查询
            var queryDateStart = $('<input>');
            queryDateStart.attr('type', 'hidden');
            queryDateStart.attr('name', "queryDay");
            queryDateStart.attr('value', queryDay);
            form.append(queryDateStart);
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
        exportNameParam.attr('value', '本月周年人员');//入职类型
        form.append(exportNameParam);
        //todo 导出类型
        var exportNameParam = $('<input>');
        exportNameParam.attr('type', 'hidden');
        exportNameParam.attr('name', "type");
        exportNameParam.attr('value', 'anniversary');//标志本月在职
        form.append(exportNameParam);
        $('body').append(form);  //将表单放置在web中
        console.info("表单信息");
        console.info(form.serializeArray());
        form.submit();   //表单提交
    });
});

    //设置日期时间控件
    var Datetime = function(e) {
        $('#datetimepicker1').datetimepicker({
            language: 'zh-CN',//显示中文
            format: 'yyyy-mm-dd',//显示格式
            minView: 3,//设置只显示到月份
            initialDate: new Date(),
            autoclose: true,//选中自动关闭
            todayBtn: true,//显示今日按钮
            locale: moment.locale('zh-cn'),
            startView: 3
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

})(jQuery, window, document);



