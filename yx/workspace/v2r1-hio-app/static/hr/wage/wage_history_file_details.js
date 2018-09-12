;(function ($,window,document,undefined) {

/**
 * @author ruanxin
 */


    //计算高度
    window.resizeHeight = function () {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".con-table .mytable").height((w_h - 190) + "px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    };

    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });


    //工资报表初始化
    window.initSalaryReportList = function () {
        var jqGridTemp = jQuery("#salaryReportList").jqGrid({
            // url : hostUrl+'wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name: 'personId', label: 'personId', editable: true, hidden: true},
                {name: 'realName', label: '姓名', editable: false, sortable: false, align: 'center',width:120},
                {name: 'erpAccount', label: '账号', editable: false, sortable: false, align: 'center',width:120},
                {name: 'prefixName', label: '所属机构', editable: false, sortable: false, align: 'center',width:220},
                {name: 'deptName', label: '入职时间', editable: false, sortable: false, align: 'center',width:200},
                {name: 'postName', label: '离职时间', editable: false, sortable: false, align: 'center',width:160},
                {name: 'personStatus', label: '员工状态', editable: false, sortable: false, align: 'center',width:160},
                {name: 'salary', label: '基本工资', editable: false, sortable: false, align: 'center',width:160},
                {name: 'fsalary', label: '应发工资', editable: false, sortable: false, align: 'center',width:160},
                {name: 'si', label: '五险一金', editable: false, sortable: false, align: 'center',width:160},
                {name: 'tax', label: '个税', editable: false, sortable: false, align: 'center',width:160},
                {name: 'ffsalary', label: '实发工资', editable: false, sortable: false, align: 'center',width:160}
            ],
            rownumbers: true,
            rowNum: -1
        });
    };

    //个税报表初始化
    window.initTaxReportList = function () {
        var jqGridTemp = jQuery("#taxReportList").jqGrid({
            // url : hostUrl+'wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name: 'personId', label: 'personId', editable: true, hidden: true},
                {name: 'realName', label: '姓名', editable: false, sortable: false, align: 'center',width:120},
                {name: 'erpAccount', label: '证件类型', editable: false, sortable: false, align: 'center',width:120},
                {name: 'prefixName', label: '证件号码', editable: false, sortable: false, align: 'center',width:220},
                {name: 'deptName', label: '收入额', editable: false, sortable: false, align: 'center',width:200},
                {name: 'postName', label: '免税所得', editable: false, sortable: false, align: 'center',width:160},
                {name: 'personStatus', label: '医保', editable: false, sortable: false, align: 'center',width:160},
                {name: 'personStatus', label: '公积金', editable: false, sortable: false, align: 'center',width:160},
                {name: 'personStatus', label: '五险一金', editable: false, sortable: false, align: 'center',width:160},
                {name: 'personStatus', label: '财产原值', editable: false, sortable: false, align: 'center',width:160},
                {name: 'ffsalary', label: '其他', editable: false, sortable: false, align: 'center',width:160}
            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            jsonReader : {
                root:"result",
                repeatitems : false
            }
        });
    };

    //网银数据初始化
    window.initBankDateList = function () {
        var jqGridTemp = jQuery("#bankDateList").jqGrid({
            // url : hostUrl+'/wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name: 'personId', label: 'personId', editable: true, hidden: true},
                {name: 'realName', label: '户名', editable: false, sortable: false, align: 'center',width:120},
                {name: 'erpAccount', label: '银行账号', editable: false, sortable: false, align: 'center',width:120},
                {name: 'prefixName', label: '金额', editable: false, sortable: false, align: 'center',width:220},
                {name: 'deptName', label: '注释', editable: false, sortable: false, align: 'center',width:200}
            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true,
            multiboxonly: true,//只能通过复选框进行多选
            jsonReader : {
                root:"result",
                repeatitems : false
            }
        });
    };

    //人工成本初始化
    window.initLaborCostist = function () {
        var jqGridTemp = jQuery("#laborCostList").jqGrid({
            // url : hostUrl+'/wage/wageTaxRate/queryListByType/2',//创建完成之后请求数据的url
            datatype : "JSON",//请求数据返回的类型。可选json,xml,txt
            mtype : "post",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: { contentType: 'application/json' },
            contentType : "application/json",
            width: $('.mytable').width(),
            height: $('.mytable').height() - 45,
            colModel : [
                {name: 'personId', label: 'personId', editable: true, hidden: true},
                {name: 'realName', label: '所属机构', editable: false, sortable: false, align: 'center',width:120},
                {name: 'erpAccount', label: '姓名', editable: false, sortable: false, align: 'center',width:120},
                {name: 'prefixName', label: '账号', editable: false, sortable: false, align: 'center',width:220},
                {name: 'deptName', label: '入职时间', editable: false, sortable: false, align: 'center',width:200},
                {name: 'postName', label: '离职时间', editable: false, sortable: false, align: 'center',width:160},
                {name: 'personStatus', label: '员工状态', editable: false, sortable: false, align: 'center',width:160},
                {name: 'personStatus', label: '应发工资', editable: false, sortable: false, align: 'center',width:160},
                {name: 'ffsalary', label: '实发工资', editable: false, sortable: false, align: 'center',width:160},
                {name: 'personStatus', label: '社保公积金企业', editable: false, sortable: false, align: 'center',width:160},
                {name: 'personStatus', label: '人工成本', editable: false, sortable: false, align: 'center',width:160}

            ],
            rownumbers: true,
            rowNum: -1,//一页显示多少条 -1全部
            multiselect: true,
            autowidth:true
        });
    };

    //初始化jqgrid
    $(function () {
        //初始化高度
        resizeHeight();
        initSalaryReportList();
        initTaxReportList();
        initBankDateList();
        initLaborCostist();

        //页面加载完毕后更改grid宽高
        $.xljUtils.resizeNestedGrid();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });

        //初始化宽度
        resizeGrid();


        //页签切换
        $(".right-content .con-tit button").on("click", function (e) {
            //左侧  头部底部为60px  title类 为50px
            var w_h = $(window).height();
            $(".slide-left .ztree-box").height((w_h - 25) + "px");

            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            if ($(this).attr('class').indexOf('byTaxReport') > 0) { //个税报表
                $("#taxReportDiv").css("display", "block");//个税报表设置为block（显示）
                $("#bankDateDiv").css("display", "none");//审批设置为none（隐藏）
                $("#salaryReportDiv").css("display", "none");//工资报表设置为none（隐藏）
                $("#laborCostDiv").css("display", "none");//人工成本为none（隐藏）
                //刷新个税报表
                initTaxReportList();

            } else if ($(this).attr('class').indexOf('byBankDate') > 0) { //网银数据
                $("#bankDateDiv").css("display", "block");//网银数据为block（显示）
                $("#taxReportDiv").css("display", "none");//个税报表设置为none（隐藏）
                $("#salaryReportDiv").css("display", "none");//工资报表为none（隐藏）
                $("#laborCostDiv").css("display", "none");//人工成本为none（隐藏）
                //刷新网银数据
                initBankDateList();
            } else if ($(this).attr('class').indexOf('byLaborCost') > 0) { //人工成本
                $("#laborCostDiv").css("display", "block");//人工成本为block（显示）
                $("#bankDateDiv").css("display", "none");//网银数据为none（隐藏）
                $("#taxReportDiv").css("display", "none");//个税报表设置为none（隐藏）
                $("#salaryReportDiv").css("display", "none");//工资报表为none（隐藏）

                //刷新人工成本
                initLaborCostist();
            } else { //工资报表显示
                $("#salaryReportDiv").css("display", "block");//工资报表设置为block（显示）
                $("#taxReportDiv").css("display", "none");//个税报表设置为none（隐藏）
                $("#bankDateDiv").css("display", "none");//网银数据为none（隐藏）
                $("#laborCostDiv").css("display", "none");//人工成本为none（隐藏）
                initSalaryReportList();

            }
            $.xljUtils.gridResizeFn();
            e.stopPropagation();
        });

        //刷新grid
        window.reloadGrid=function(){
            $.xljUtils.tip("green","数据操作成功！");
            $('#salaryPeriodList').jqGrid().trigger("reloadGrid");
        };
    });


    //返回上一级
    window.goBack = function () {
        window.history.go(-1);
    };



})(jQuery,window,document)