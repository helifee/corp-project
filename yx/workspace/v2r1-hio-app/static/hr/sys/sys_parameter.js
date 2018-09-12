/**
 * lixd
 * 系统参数列表js
 */
;(function ($, window, document, undefined) {
	//定义全局参数
    var rowData;    //行数据
    var rowDataBefore;  //修改前的数据

	//手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeGrid();
    });

	//计算表格宽度
    function resizeGrid() {
		$(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 100);
		$(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width(), true);
    }

	//上来就执行
    $(function () {
        //初始化指标集列表
        initSysParameterList();

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });
    /**
     * 初始化指标集列表
     */
    function initSysParameterList() {
        //创建jqGrid组件
        var jqGridSysParameter = jQuery("#sysParameterList").jqGrid(
            {
                url: hostUrl + '/sys/sysParameter/queryList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                colNames: ['id', '参数名称', '参数值', '参数说明'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'sid', label: 'sid', editable: true, sortable: false, hidden: true, align: "center"},
                    {name: 'paraKey', index: 'paraKey', editable: true, align: "center"},
                    {name: 'paraValue', index: 'paraValue', editable: true, align: "center"},
                    {name: 'moduleName', index: 'moduleName', editable: true, align: "center"}

                ],
                width: $(window).width(),
                height:$(window).height()-100,
                rownumbers:true,
                autoWidth: true,
                shrinkToFit: true,
                sortname: 'paraKey',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect: true,//多选
                multiboxonly:true,//只能通过复选框多选
                jsonReader: {
                    root: "result",
                    repeatitems: false,
                    id:"sid"
                },
                onSelectRow: function () {
                    var rowId = $('#sysParameterList').jqGrid("getGridParam", "selrow");
                    rowData = $('#sysParameterList').jqGrid('getRowData', rowId);
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
                        jqGridSysParameter.jqGrid().trigger("reloadGrid");
                    }
                }
            });
    }

	//新增页面
    $("#addBtn").click(function () {
        openPa("sys_parameter_edit.html?type=add");
    });
	//编辑
    $("#updateBtn").unbind('click').on('click', function () {
        toUpdate();
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
        var idsVal = $('#sysParameterList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#sysParameterList').jqGrid("getGridParam", "selrow");
                rowData = $('#sysParameterList').jqGrid('getRowData', rowId);
                openPa("sys_parameter_edit.html?type=update&id=" + rowData.sid);

            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }

    /**
     * 删除
     */
    function del() {
        var idsVal = $('#sysParameterList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: hostUrl + "/sys/sysParameter/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                $('#sysParameterList').jqGrid().trigger("reloadGrid");
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

    /**
     * 通过key取值
     */
    function getValueByKey(paraKey) {
        $.ajax({
            url: hostUrl + "/sys/sysParameter/getValueByKey/" + paraKey,
            type: 'get',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (data) {
                if(data.success){
                    paraValue=data.result;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }
})(jQuery, window, document);