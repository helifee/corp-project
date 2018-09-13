/**
 * ruanxin
 * 薪资计算js
 */
var payPeriodId;//发薪期间ID
var applyId;//申请审批单Id
;
(function ($, window, document, undefined) {

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //计算表格的高度
    window.resizeHeight = function () {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //表示con-table 下的mytable1
        $(".con-table .mytable").height((w_h - 130) + "px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 120);
        $.xljUtils.gridResizeFn();
    };

    //薪资计算:初始化
    window.initSalaryCalculate = function () {
        var ubody = "wage/wageRecord/queryPersonList";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jQuery("#salaryCalculateList").jqGrid({
            url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            postData:{type:"entry"},
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            colNames: ['id', '姓名', '手机号', '所属机构', '所属机构','部门', '岗位','工作城市级别', '人员状态'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : 'personId',editable:true,sortable:false,hidden:true,key:true},
                {name: 'realName',  width: 150,editable:true, sortable:false,align:'center'},
                {name: 'mobile', width: 150,editable:true, sortable:false,align:'center'},
                {name: 'orgName',  width: 330,editable:true, sortable:false,align:'center',hidden:true},
                {name: 'prefixName',  width: 330,editable:true, sortable:false,align:'center'},
                {name: 'deptName',  width: 230,editable:true, sortable:false,align:'center',hidden:true},
                {name: 'postName',  width: 190,editable:true, sortable:false,align:'center'},
                {name: 'workPlaceRankFormat', width: 230,editable:true, sortable:false,align:'center'},
                {name: 'personStatusFormat', width: 230,editable:true, sortable:false,align:'center'}
            ],
            loadComplete:function(data){
                file_data = data.result;
            },
            rowNum : -1,//一页显示多少条 -1全部
            rownumbers: true,
            multiselect: true,
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $. xljUtils.addGridScroll();
                $. xljUtils.gridResizeFn();
            }
        });
    };

    //返回上一级
    window.goBack = function () {
        window.history.go(-1);
    };

    //名称查询  回车查询
    $('#nameOrCodeByCal').bind('keypress',function(event){
        if(event.keyCode == "13") {
            refreshJqGridDataByCal();
        }
    });

    //点击查询按钮进行筛选查询
    window.refreshJqGridDataByCal = function () {
        var nameOrCode = $("#nameOrCodeByCal").val();
        jQuery("#salaryCalculateList").jqGrid("setGridParam", { postData : {payPeriodId:payPeriodId,nameOrCode:nameOrCode}}).trigger("reloadGrid");
    };

    $(function () {
        initSalaryCalculate();//初始化薪资计算页面

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        resizeGrid();
    });

})(jQuery, window, document);

