;(function ($, window, document, undefined) {
    //定义全局参数
    var rowData;    //行数据
    var rowDataBefore;  //修改前的数据
    var jqGridSysInfoSet;
    var module;
    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 100) + "px");
        //表示con-table 下的mytable
        $(".con-table .mytable").height((w_h - 80) + "px");
    }

    //计算表格宽度
    function resizeGrid() {
        //ui-jqgrid-bdiv这个样式 时jqGrid主体的样式
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 100);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }

    //上来就执行
    $(function () {
        //初始化高度
        resizeHeight();

        //初始化指标集列表
        initSysInfoSetList();
        initColor();
        //处理日期选择	1
        dateTime();
        dateTime1();

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        //树加滚动条
        setTimeout(function () {
            $.xljUtils.addTreeScroll();
            $.xljUtils.treeResizeFn();
        }, 300);
    });
    /**
     * 初始化指标集列表
     */
    function initSysInfoSetList() {
        module=$.xljUtils.getUrlParam("module");
        $('#module').val(module);
        //创建jqGrid组件
        jqGridSysInfoSet = jQuery("#sysInfoSetList").jqGrid(
            {
                url: hostUrl + '/sys/sysInfoSet/queryList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData:{'module':module},
                colNames: ['sid','module', '指标集名称', '编码', '记录类型', '显示顺序', '指标集属性', '新增联动方法', '修改联动方法', '删除联动方法', '状态'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'sid', label: 'sid', editable: true, sortable: false, hidden: true, align: "center"},
                    {name: 'module', label: 'module', editable: true, sortable: false, hidden: true, align: "center"},
                    {name: 'name', index: 'name', editable: true, align: "center"},
                    {name: 'nameEn', index: 'nameEn', editable: true, align: "center"},
                    {
                        name: 'type',
                        index: 'type',
                        editable: true,
                        align: "center",
                        formatter: setTypeTypeFmatter
                    },
                    {name: 'sort', index: 'sort', editable: true, align: "center"},
                    {
                        name: 'property',
                        index: 'property',
                        editable: true,
                        align: "center",
                        formatter: setPropertyTypeFmatter
                    },
                    {name: 'addFunction', index: 'addFunction', editable: true, align: "center"},
                    {name: 'updateFunction', index: 'updateFunction', editable: true, align: "center"},
                    {name: 'delFunction', index: 'delFunction', editable: true, align: "center"},
                    {
                        name: 'status',
                        index: 'status',
                        editable: true,
                        align: "center",
                        formatter: setStatusTypeFmatter
                    }
                ],
                width: $('.mytable').width(),
                height: $('.mytable').height(),
                autoWidth: true,
                sortname: 'sort',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false,
                    id: "sid"
                },
                onSelectRow: function () {
                    var rowId = $('#sysInfoSetList').jqGrid("getGridParam", "selrow");
                    rowData = $('#sysInfoSetList').jqGrid('getRowData', rowId);
                },
                ondblClickRow:function(rowId){
                    //双击跳转查看代码项页面
                    rowData = $('#sysInfoSetList').jqGrid('getRowData',rowId);
                    window.location.href="sys_info_item.html?setId=" + rowData.sid+"&module="+$('#module').val()+"&setName="+encodeURI(rowData.name,"UTF-8");
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                rowNum: -1,
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
                        jqGridSysInfoSet.jqGrid().trigger("reloadGrid");
                    }
                }
            });
    }

    //新增页面
    $("#addBtn").click(function () {
        module=$('#module').val();
        if(""!=module){
            openPa("sys_info_set_edit.html?type=add&module="+module);
        }else{
            $.xljUtils.tip("blue", "请先选择左侧指标分类！");
        }
    });
    //编辑
    $("#updateBtn").unbind('click').on('click', function () {
        toUpdate();
    });
    //查看指标项
    $("#showItemBtn").unbind('click').on('click', function () {
        toSysItem();
    });
    //删除
    $("#deleteBtn").unbind('click').on('click', function () {
        del();
    });

    /**
     * 打开编辑页面
     */
    function toUpdate() {
        var idsVal = $('#sysInfoSetList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#sysInfoSetList').jqGrid("getGridParam", "selrow");
                rowData = $('#sysInfoSetList').jqGrid('getRowData', rowId);
                openPa("sys_info_set_edit.html?type=update&module="+module+"&setId=" + rowData.sid);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }

    //处理日期选择
    function dateTime() {
        //定义datatimepicker的日期格式
        $('.form_datetime').datetimepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd hh:ii',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });
    }

    //初始化日期控件
    function dateTime1() {
        $('.form_datetime1').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });
    }

    /**
     * 数据格式化
     * 指标集类型
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {String}
     */
    function setTypeTypeFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "1") {
            return "单记录";
        } else if (cellvalue == "2") {
            return "多记录";
        }
    }

    /**
     * 数据格式化
     * 指标集属性
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {String}
     */
    function setPropertyTypeFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "0") {
            return "国际";
        } else if (cellvalue == "1") {
            return "系统";
        } else if (cellvalue == "2") {
            return "用户";
        }
    }

    /**
     * 指标集状态
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    function setStatusTypeFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "0") {
            return "无效";
        } else if (cellvalue == "1") {
            return "有效";
        }
    }

    //查询指标集列表
    function sys_info_set() {
        window.location.href = 'sys_info_set.html';
    }

    //查询指标项列表
    function toSysItem() {
        var idsVal = $('#sysInfoSetList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一个指标集进行查看！");
                return;
            } else {
                var rowId = $('#sysInfoSetList').jqGrid("getGridParam", "selrow");
                rowData = $('#sysInfoSetList').jqGrid('getRowData', rowId);
                window.location.href="sys_info_item.html?setId=" + rowData.sid+"&setName="+encodeURI(rowData.name,"UTF-8");
            }
        } else {
            $.xljUtils.tip("blue", "请选择要查看的指标集！");
        }
    }


    /**
     * 删除指标集
     */
    function del() {
        var idsVal = $('#sysInfoSetList').jqGrid('getGridParam', 'selarrrow');
        var isDel=true;
        var strName = "";
        $.each(idsVal, function(index,val) {
            var rowData = $('#sysInfoSetList').jqGrid('getRowData',val);
            if(rowData.property == '1' || rowData.property == '系统' ){
                isDel=false;
                strName+=rowData.name+",";
            }
        });
        if(!isDel){
            if(""!=strName){
                $.xljUtils.tip("blue", strName.substring(0,strName.length-1)+"为系统指标，不可删除！");
            }
        }else{
            if (idsVal && idsVal != "") {
                $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                    $.ajax({
                        url: hostUrl + "/sys/sysInfoSet/deleteBatch/" + idsVal,
                        type: 'DELETE',
                        dataType: 'JSON',
                        contentType: 'application/json',
                        data: JSON.stringify({}),
                        success: function (xhr, textStatus) {
                            console.log(xhr);
                            if (xhr) {
                                if (xhr.success) {
                                    $.xljUtils.tip("green", "数据删除成功！");
                                    $('#sysInfoSetList').jqGrid().trigger("reloadGrid");
                                } else {
                                    if (xhr.code == "50000") {//请求返回的状态码？
                                        $.xljUtils.tip("red", xhr.msg);
                                        return;
                                    }
                                    $.xljUtils.tip("red", "数据删除失败！");
                                }
                            } else {
                                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                            }
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            console.log(xhr);
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                        }
                    });
                }, true);
                return;
            } else {
                $.xljUtils.tip("blue", "请选择要删除的数据！");
            }
        }
    }

    $("#empTree").unbind('click').on('click', function () {
        $("#treeDemo_1_span").css({'background-color': "#D0EEFF" });
        $("#treeDemo_5_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_4_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_2_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_3_span").css({'background-color': "#FFFFFF" });
        $('#module').val('hr_emp');
        module = 'hr_emp';
        jqGridSysInfoSet.jqGrid('setGridParam',{datatype:'json',postData:{'module':'hr_emp'}}).trigger("reloadGrid");
    });
    $("#wageTree").unbind('click').on('click', function () {
        $("#treeDemo_1_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_5_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_4_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_2_span").css({'background-color': "#D0EEFF" });
        $("#treeDemo_3_span").css({'background-color': "#FFFFFF" });
        $('#module').val('hr_wage');
        module = 'hr_wage';
        jqGridSysInfoSet.jqGrid('setGridParam',{datatype:'json',postData:{'module':'hr_wage'}}).trigger("reloadGrid");
    });
    $("#siTree").unbind('click').on('click', function () {
        $("#treeDemo_1_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_5_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_4_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_2_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_3_span").css({'background-color': "#D0EEFF" });
        $('#module').val('hr_si');
        module = 'hr_si';
        jqGridSysInfoSet.jqGrid('setGridParam',{datatype:'json',postData:{'module':'hr_si'}}).trigger("reloadGrid");
    });
    $("#orgTree").unbind('click').on('click', function () {
        $("#treeDemo_1_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_5_span").css({'background-color': "#D0EEFF" });
        $("#treeDemo_4_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_2_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_3_span").css({'background-color': "#FFFFFF" });
        $('#module').val('hr_org');
        module = 'hr_org';
        jqGridSysInfoSet.jqGrid('setGridParam',{datatype:'json',postData:{'module':'hr_org'}}).trigger("reloadGrid");
    });
    $("#postTree").unbind('click').on('click', function () {
        $("#treeDemo_1_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_5_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_4_span").css({'background-color': "#D0EEFF" });
        $("#treeDemo_2_span").css({'background-color': "#FFFFFF" });
        $("#treeDemo_3_span").css({'background-color': "#FFFFFF" });
        $('#module').val('hr_post');
        module = 'hr_post';
        jqGridSysInfoSet.jqGrid('setGridParam',{datatype:'json',postData:{'module':'hr_post'}}).trigger("reloadGrid");
    });

function  initColor() {
    module = $('#module').val();
    if(module=="hr_emp"){
        $("#treeDemo_1_span").css({'background-color': "#D0EEFF" });
    }else if(module=="hr_wage"){
        $("#treeDemo_2_span").css({'background-color': "#D0EEFF" });
    }else if(module=="hr_si"){
        $("#treeDemo_3_span").css({'background-color': "#D0EEFF" });
    }else if(module=="hr_org"){
        $("#treeDemo_5_span").css({'background-color': "#D0EEFF" });
    }else if(module=="hr_post"){
        $("#treeDemo_4_span").css({'background-color': "#D0EEFF" });
    }
}
})(jQuery, window, document);