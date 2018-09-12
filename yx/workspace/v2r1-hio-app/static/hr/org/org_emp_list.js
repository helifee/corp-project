/**
 * lixd
 * 机构变更信息列表js
 */
;
(function ($, window, document, undefined) {
    //定义全局参数
    var edit_postId;
    var rowData;
    var rowDataBefore;
    var jqGridPost;
    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        //表示con-table 下的mytable1
        $(".con-table .mytable1").height((w_h - 180) + "px");
    }

    //计算表格宽度
    function resizeGrid() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 65);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width(), true);
        $.xljUtils.gridResizeFn();
    }

    //上来就执行
    $(function () {
        //初始化高度
        resizeHeight();
        //初始化加载列表信息
        pageInit();

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        //在加载完表格后，设置表格的宽度
        resizeGrid();
    });
    /**
     * 加载post列表
     */
    function pageInit() {
        var orgId = $.xljUtils.getUrlParam("orgId");
        jqGridPost = jQuery("#orgChangeList").jqGrid(
            {
                url: hostUrl + '/emp/empPersonInfo/queryOrgEmpList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData: {"orgId": orgId},
                autowidth: true,
                colNames: ['id', '姓名', '手机号', '所属机构', '职务', '人员类别', '入职时间'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {
                        name: 'realName',
                        index: 'realName',
                        editable: true,
                        sortable: false,
                        align: 'center'
                    }, {
                        name: 'mobile',
                        index: 'mobile',
                        editable: true,
                        edittype: 'text',
                        sortable: false,
                        align: 'center'
                    },
                    {
                        name: 'prefixName', index: 'prefixName', editable: true, sortable: false, align: 'center'
                    },
                    {
                        name: 'postName',
                        index: 'postName',
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {name: 'personType', index: 'personType', editable: true, sortable: false, align: 'center'},
                    {
                        name: 'entryTime',
                        index: 'entryTime',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}
                    },
                ],
                // multiselect: true,
                // multiboxonly: true,
                rownumbers: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#orgChangeList ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#orgChangeList').jqGrid("getGridParam", "selrow");
                    rowData = $('#orgChangeList').jqGrid('getRowData', rowId);
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#orgChangeList').setSelection(rowDataBefore.id, true);
                        $('#orgChangeList ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
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
                                $.xljUtils.tip("red", xhr.message);
                                break;
                            case "50001":
                                $.xljUtils.tip("red", xhr.message);
                                break;
                            case "50002":
                                $.xljUtils.tip("blue", xhr.message);
                                break;
                            case "50003":
                                $.xljUtils.tip("red", xhr.message);
                                break;

                            default:
                                $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                    } else {
                        //success
                    }
                }

            });
    }

    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

})(jQuery, window, document);