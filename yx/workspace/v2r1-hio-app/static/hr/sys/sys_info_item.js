;(function ($, window, document, undefined) {
    //定义全局参数
    var setId;//指标集的id
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
        //表示con-table 下的mytable
        $(".con-table .mytable1").height((w_h - 80) + "px");
    }

    //计算表格宽度
    function resizeGrid() {
        //ui-jqgrid-bdiv这个样式 时jqGrid主体的样式
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 100);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
        $.xljUtils.gridResizeFn();
    }

    //上来就执行
    $(function () {
        //初始化高度
        resizeHeight();
        setId=$.xljUtils.getUrlParam("setId");
        //初始化指标项列表
        initSysInfoItemList();
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
    });
    /**
     * 初始化指标项列表
     */
    function initSysInfoItemList() {
        //指标集名称
        var setName=decodeURI(escape($.xljUtils.getUrlParam("setName")));
        $('.setName').text(setName);
        var module=$.xljUtils.getUrlParam("module");
        $('#module').val(module);
        //创建jqGrid组件
        var jqGridSysInfoItem = jQuery("#sysInfoItemList").jqGrid(
            {
                url: hostUrl + '/sys/sysInfoItem/queryListBySetId',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData: {"setId": setId},
                colNames: ['id', '名称', '编码', '属性', '是否必录', '类型', '排序', '状态'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', label: 'id', editable: true, sortable: false, hidden: true, align: "center"},
                    {name: 'name', index: 'name', align: "center"},
                    {name: 'code', index: 'code', align: "center"},
                    {name: 'itemProperty', index: 'itemProperty', align: "center",formatter: setItemPropertyFmatter},
                    {name: 'isEmpty', index: 'isEmpty', align: "center",formatter: setisEmptyFmatter},
                    {name: 'type', index: 'type', align: "center",formatter: setTypeFmatter},
                    {name: 'sort', index: 'sort', align: "center"},
                    {name: 'status', index: 'status', align: "center",formatter: setStatusTypeFmatter}
                ],
                width: $('.mytable1').width(),
                height: $('.mytable1').height(),
                autoWidth: true,
                sortname: 'sort',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                onSelectRow: function () {
                    var rowId = $('#sysInfoItemList').jqGrid("getGridParam", "selrow");
                    rowData = $('#sysInfoItemList').jqGrid('getRowData', rowId);
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
                        jqGridSysInfoItem.jqGrid().trigger("reloadGrid");
                    }
                }
            });
    }

    //新增页面
    $("#addBtn").click(function () {
        openPa("sys_info_item_edit.html?type=add&setId="+setId);
    });
    //编辑
    $("#updateBtn").unbind('click').on('click', function () {
        toUpdate();
    });
    //删除
    $("#deleteBtn").unbind('click').on('click', function () {
        del();
    });
    //返回指标集
    $("#backBtn").unbind('click').on('click', function () {
        window.location.href = 'sys_info_set.html?module='+$('#module').val();
    });
    /**
     * 打开编辑页面
     */
    function toUpdate() {
        var idsVal = $('#sysInfoItemList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#sysInfoItemList').jqGrid("getGridParam", "selrow");
                rowData = $('#sysInfoItemList').jqGrid('getRowData', rowId);
                openPa("sys_info_item_edit.html?type=update&itemId=" + rowData.id);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }

    /**
     * 删除指标集
     */
    function del() {
        var idsVal = $('#sysInfoItemList').jqGrid('getGridParam', 'selarrrow');
        var isDel=true;
        var strName = "";
        $.each(idsVal, function(index,val) {
            var rowData = $('#sysInfoItemList').jqGrid('getRowData',val);
            if(rowData.property == '3' || rowData.property == '系统指标' ){
                isDel=false;
                strName+=rowData.name+",";
            }
        });
        if(!isDel){
            if(""!=strName){
                $.xljUtils.tip("blue", strName.substring(0,strName.length-1)+"为系统指标项，不可删除！");
            }
        }else{
            if (idsVal && idsVal != "") {
                $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                    $.ajax({
                        url: hostUrl + "sys/sysInfoItem/deleteBatch/" + idsVal,
                        type: 'DELETE',
                        dataType: 'JSON',
                        contentType: 'application/json',
                        data: JSON.stringify({}),
                        success: function (xhr, textStatus) {
                            console.log(xhr);
                            if (xhr) {
                                if (xhr.success) {
                                    $.xljUtils.tip("green", "数据删除成功！");
                                    $('#sysInfoItemList').jqGrid().trigger("reloadGrid");
                                } else {
                                    $.xljUtils.tip("red", xhr.msg);
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
    function setItemPropertyFmatter(cellvalue) {
        if (cellvalue == "1") {
            return "国标";
        } else if (cellvalue == "2") {
            return "用户扩展";
        }else if (cellvalue == "3") {
            return "系统指标";
        }
    }
    function setStatusTypeFmatter(cellvalue) {
        if (cellvalue == "0") {
            return "禁用";
        } else if (cellvalue == "1") {
            return "启用";
        }
    }
    function setisEmptyFmatter(cellvalue) {
        if (cellvalue == "0") {
            return "非必填";
        } else if (cellvalue == "1") {
            return "必填";
        }
    }
    function setTypeFmatter(cellvalue) {
        if (cellvalue == "1") {
            return "整型";
        } else if (cellvalue == "2") {
            return "小数";
        }else if (cellvalue == "3") {
            return "字符";
        }else if (cellvalue == "4") {
            return "备注";
        }else if (cellvalue == "5") {
            return "8位日期";
        }else if (cellvalue == "6") {
            return "6位日期";
        }else if (cellvalue == "7") {
            return "代码";
        } else if (cellvalue == "8") {
            return "金钱";
        }else if (cellvalue == "9") {
            return "时间";
        }else if(cellvalue == "10"){
            return "照片";
        }else if (cellvalue == "11") {
            return "指标";
        }else if (cellvalue == "12") {
            return "计算";
        }else if (cellvalue == "13") {
            return "大文本";
        }else if (cellvalue == "14") {
            return "附件";
        }
    }
})(jQuery, window, document);