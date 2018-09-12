/**
 * lixd
 * 系统角色列表js
 */
;
(function ($, window, document, undefined) {
    //定义全局参数
    var rowData;    //行数据
    var rowDataBefore;  //修改前的数据
    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        var w_w = $(window).width();
        $(".con-table .mytable").height((w_h - 80) + "px");
        $(".con-table .mytable").width((w_w) + "px");
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

        initSysRoleInfoList();

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
        $("#saveDemo").click(function () {
            $.xljUtils.tip('green', '保存成功！');
        });
        //树加滚动条
        setTimeout(function () {
            $.xljUtils.addTreeScroll();
            $.xljUtils.treeResizeFn();
        }, 300);
    });
    /**
     * 初始化角色列表
     */
    function initSysRoleInfoList() {
        //创建jqGrid组件
        var jqGridSysRoleInfo = jQuery("#sysRoleInfoList").jqGrid(
            {
                url: baseUrl + '/sys/sysRoleInfo/queryList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                colNames: ['id', '序号','角色名称', '创建时间', '系统管理员','hr专业人员','领导人员','状态'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',editable:true,sortable:false,hidden:true,align: "center"},
                    {name: 'sort', index: 'sort', align: "center"},
                    {name: 'name', index: 'name', align: "center"},
                    {name: 'createDate', index: 'createDate',  align: "center"},
                    {name: 'isSysoper', index: 'isSysoper', align: "center",formatter:yesNoTypeFmatter},
                    {name: 'isBussinessuser', index: 'isBussinessuser',  align: "center",formatter:yesNoTypeFmatter},
                    {name: 'isHrleader', index: 'isHrleader', align: "center",formatter:yesNoTypeFmatter},
                    {name: 'status', index: 'status', align: "center",formatter:setStatusTypeFmatter}
                ],
                width: $('.mytable').width(),
                height: $('.mytable').height(),
                autoWidth: true,
                sortname: 'sort',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                onSelectRow: function () {
                    var rowId = $('#sysPmsRoleList').jqGrid("getGridParam", "selrow");
                    rowData = $('#sysPmsRoleList').jqGrid('getRowData', rowId);
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
                        jqGridSysRoleInfo.jqGrid().trigger("reloadGrid");
                    }
                }
            });
    }

    //新增页面
    $("#addBtn").click(function () {
        window.open("sys_role_info_edit.html?type=add");
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
     * @param
     */
    function toUpdate() {
        var idsVal = $('#sysRoleInfoList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#sysRoleInfoList').jqGrid("getGridParam", "selrow");
                rowData = $('#sysRoleInfoList').jqGrid('getRowData', rowId);
//			 	 $.xljUtils.confirm("blue", "进入【" + rowData.name + "】的编辑状态吗？", function(){
//			 		 window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));
//			 	 },true);
                window.open("sys_role_info_edit.html?type=update&roleId=" + rowData.id);
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
     * 状态
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
    /**
     * 是否
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    function yesNoTypeFmatter(cellvalue, options, rowObject) {
       if (cellvalue == "1") {
            return "是";
        }else{
           return "否";
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
//			 	 $.xljUtils.confirm("blue", "进入【" + rowData.name + "】的编辑状态吗？", function(){
//			 		 window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));
//			 	 },true);
                window.location.href="sys_info_item.html?setId=" + rowData.id+"&sysName="+rowData.name;
            }
        } else {
            $.xljUtils.tip("blue", "请选择要查看的指标集！");
        }
    }


    /**
     * 删除指标集
     */
    function del() {
        var idsVal = $('#sysRoleInfoList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: baseUrl + "/sys/sysRoleInfo/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                $('#sysRoleInfoList').jqGrid().trigger("reloadGrid");
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
})(jQuery, window, document);