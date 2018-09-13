    /**
     * Created by ciic on 2017/6/22.
     */
;(function ($,window,document,undefined) {


    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //计算高度
    window.resizeHeight = function () {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //右侧table
        $(".con-table .mytable").height((w_h - 175)+ "px");
    };

    //计算表格宽度
    window.resizeGrid = function () {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height()-54);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-1, true);
        $.xljUtils.gridResizeFn();
    };

    //显示变动明细中的增加人员
    window.addPersonList = function () {
        var ubody = "wage/wageRecord/queryExchangeListByAdd";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件

        jQuery("#salaryRecord_addPersonList").jqGrid({
            // url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            // postData:{accountId:accountId},
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            colNames: ['personId','所属机构ID',  '姓名', '人员编号', '所属机构','所属机构','部门', '岗位', '工作城市级别','人员状态','进入本公司时间'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'personId',label : 'personId',editable:true,sortable:false,hidden:true,key:true},
                {name : 'orgId',label : 'orgId',editable:true,sortable:false,hidden:true},
                {name: 'personName',  width: 120,editable:true, sortable:false,align:'center'},
                {name: 'personCode', width: 100,editable:true, sortable:false,align:'center'},
                {name: 'orgName',  editable:true, sortable:false,align:'center',hidden:true},
                {name: 'prefixName',  width: 300,editable:true, sortable:false,align:'center'},
                {name: 'deptName',  width: 200,editable:true, sortable:false,align:'center'},
                {name: 'postName',  width: 160,editable:true, sortable:false,align:'center'},
                {name: 'workPlaceRankFormat', width: 100,editable:true, sortable:false,align:'center'},
                {name: 'personStatusFormat', width: 100,editable:true, sortable:false,align:'center'},
                {name: 'entryOrgTime', width: 100,editable:true, sortable:false,align:'center',formatter:"date", formatoptions: {newformat:'Y-m-d'}}
            ],
            loadComplete:function(data){
                file_data = data.result;
            },
            rowNum : -1,//一页显示多少条 -1全部
            sortname : 'personId',//初始化的时候排序的字段
            rownumbers: true,
            multiselect: true,
            // multiboxonly: true,//只能通过复选框进行多选
            sortorder: "desc",//排序方式,可选desc,asc
            gridComplete: function () {
                $. xljUtils.addGridScroll();
                $. xljUtils.gridResizeFn();
            }
        });
    };

    //显示变动明细中的减少人员
    window.delPersonList = function () {
        var ubody = "wage/wageRecord/queryExchangeListByDel";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件

        jQuery("#salaryRecord_delPersonList").jqGrid({
            // url: uall,
            ajaxGridOptions: { contentType: 'application/json' },
            mtype : "POST",
            // postData:{accountId:accountId},
            datatype : "json",
            jsonReader : {
                root:"result"
            },
            colNames: ['id', '姓名', '人员编号', '所属机构', '所属机构','部门', '岗位','工作城市级别', '人员状态','离职时间'],//jqGrid的列显示名字
            colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                {name : 'id',label : 'personId',editable:true,sortable:false,hidden:true,key:true},
                {name: 'personName',  width: 120,editable:true, sortable:false,align:'center'},
                {name: 'personCode', width: 120,editable:true, sortable:false,align:'center'},
                {name: 'orgName',  width: 300,editable:true, sortable:false,align:'center',hidden:true},
                {name: 'prefixName',  width: 300,editable:true, sortable:false,align:'center'},
                {name: 'deptName',  width: 200,editable:true, sortable:false,align:'center'},
                {name: 'postName',  width: 160,editable:true, sortable:false,align:'center'},
                {name: 'workPlaceRankFormat', width: 100,editable:true, sortable:false,align:'center'},
                {name: 'personStatusFormat', width: 100,editable:true, sortable:false,align:'center'},
                {name: 'leaveTime', width: 100,editable:true, sortable:false,align:'center',formatter:"date", formatoptions: {newformat:'Y-m-d'}}

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

    //保存或修改成功，提示后关闭窗口
    window.msgClosePage = function (){
        window.history.go(-1);
    };

    $(function() {
        resizeHeight();
        addPersonList();
        delPersonList();
        resizeGrid();
    });

    //表格上面 切换：增加人员/减少人员
    $(".right-content .con-tit button").on("click", function (e) {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        if ($(this).attr('class').indexOf('bydel') > 0) {
            $("#addDiv").css("display", "none");//增加人员为none（隐藏）
            $("#delDiv").css("display", "block");//减少人员设置为block（显示）
        }  else {
            $("#addDiv").css("display", "block");//增加人员为block（显示）
            $("#delDiv").css("display", "none");//减少人员设置为none（隐藏）
        }
        $.xljUtils.gridResizeFn();
        e.stopPropagation();
    });

})(jQuery, window, document)