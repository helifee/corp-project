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
        initSysUserInfoList();

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
     * 初始化指标集列表
     */
    function initSysUserInfoList() {
        //创建jqGrid组件
        var jqGridSysUserInfo = jQuery("#sysUserInfoList").jqGrid(
            {
                url: serviceUrl + '/sys/sysUserInfo/queryList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                colNames: ['序号', '用户名', '密码', '状态','最后登录时间','登录次数'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', label: 'id', editable: true, sortable: false, hidden: true, align: "center"},
                    {name: 'loginName', index: 'loginName', width: 100, align: "center"},
                    {name: 'loginPwd', index: 'loginPwd', width: 100, align: "center"},
                    {name: 'status', index: 'status', width: 100, align: "center"},
                    {name: 'lastLoginTime', index: 'lastLoginTime', width: 100, align: "center"},
                    {name: 'loginTimes', index: 'loginTimes', width: 100, align: "center"}
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
                    var rowId = $('#sysUserInfoList').jqGrid("getGridParam", "selrow");
                    rowData = $('#sysUserInfoList').jqGrid('getRowData', rowId);
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
                        jqGridSysUserInfo.jqGrid().trigger("reloadGrid");
                    }
                }
            });
    }
    //修改密码
    $("#modifyPwd").unbind('click').on('click', function () {
        modifyPwd();
    });

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

    //修改密码
    function modifyPwd() {
        var idsVal = $('#sysUserInfoList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一个用户！");
                return;
            } else {
                var rowId = $('#sysUserInfoList').jqGrid("getGridParam", "selrow");
                rowData = $('#sysUserInfoList').jqGrid('getRowData', rowId);
//			 	 $.xljUtils.confirm("blue", "进入【" + rowData.name + "】的编辑状态吗？", function(){
//			 		 window.open(openUrl+"?oper=edit&id="+rowData.id+"&name="+encodeURI(rowData.name,"UTF-8"));
//			 	 },true);
                window.location.href="sys_user_modifyPwd.html?setId=" + rowData.id+"&sysName="+rowData.name;
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改密码的人员！");
        }
    }
})(jQuery, window, document);