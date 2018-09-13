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
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //表示con-table 下的mytable1
        $(".con-table .mytable1").height((w_h - 80) + "px");
    }

    //计算表格宽度
    function resizeGrid() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
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
    //删除变动信息
    $("#delBtn").click(function () {
        del();
    });
    //查询
    $("#queryBtn").click(function () {
        postQuery();
    });
    //变动类型改变就切换查询
    $('#type').change(function () {
        postQuery();
    });
    //返回
    $("#backBtn").click(function () {
        window.location.href = "org_list.html";
    });
    /**
     * 加载post列表
     */
    function pageInit() {
        var edit_orgId = $.xljUtils.getUrlParam("edit_orgId");
        jqGridPost = jQuery("#orgChangeList").jqGrid(
            {
                url: serviceUrl + '/org/orgChange/queryListByUnion',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData: {"orgId": edit_orgId, "name": '', "type": ''},
                autowidth: true,
                colNames: ['id', 'orgId', '机构名称', '变动类型', '变动时间', '变更内容', '变更字段', '变更前内容', '变更后内容', '操作人员'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {
                        name: 'orgId',
                        index: 'orgId',
                        editable: true,
                        sortable: false,
                        align: 'center', hidden: true
                    }, {
                        name: 'prefixName',
                        index: 'prefixName',
                        editable: true,
                        edittype: 'text',
                        sortable: false,
                        align: 'center'
                    },
                    {
                        name: 'type', index: 'type', editable: true, sortable: false, align: 'center',
                        formatter: typeFmatter
                    },
                    {
                        name: 'changeDate',
                        index: 'changeDate',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d H:i:s'}
                    },
                    {name: 'changeContent', index: 'changeContent', editable: true, sortable: false, align: 'center'},
                    {
                        name: 'changeField',
                        index: 'changeField',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: fieldFmatter
                    },
                    {
                        name: 'changeBefore',
                        index: 'changeBefore',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter:fieldValueFmatter
                    },
                    {name: 'changeAfter', index: 'changeAfter', editable: true, sortable: false, align: 'center',formatter:fieldValueFmatter},
                    {
                        name: 'createPersonName',
                        index: 'createPersonName',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter:function fieldValueFmatter(cellvalue, options, rowObject) {
                            return $.hrUtils.filterNull(cellvalue);
                        }
                    }

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
                        //success
                    }
                }

            });


    }

    /**
     * 安照机构查询
     * @param userType
     */
    function postQuery() {
        //用户模糊查询值
        var name = $("#name").val();
        var type = $("#type").val();
        var queryDataPost = {};
        queryDataPost.name = name;
        queryDataPost.type = type;
        jqGridPost.jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
    }

    /**
     * 变动类型
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    function typeFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "0") {
            return "新建";
        } else if (cellvalue == "1") {
            return "复制";
        } else if (cellvalue == "2") {
            return "移动";
        } else if (cellvalue == "3") {
            return "撤销";
        } else if (cellvalue == "4") {
            return "删除";
        } else if (cellvalue == "5") {
            return "修改";
        } else if (cellvalue == "6") {
            return "启用";
        }
    }

    /**
     * 机构翻译显示全路径名称
     * @param rowId
     * @param val
     * @param rowObject
     * @param cm
     * @param rdata
     * @returns {string}
     */
    function orgFmatter(rowId, val, rowObject, cm, rdata) {
        var orgDto=$.hrUtils.getOrgById(rowObject.orgId);
        if(orgDto!=null){
            return orgDto.prefixName;
        }else{
            return "";
        }
    }

    /**
     * 字段翻译
     * @param rowId
     * @param val
     * @param rowObject
     * @param cm
     * @param rdata
     * @returns {*}
     */
    function fieldFmatter(cellvalue, options, rowObject) {
        if(cellvalue==null){
            return "";
        }
        var value=$.hrUtils.getHRInfoNameById("hr_org_organization", cellvalue)
        if(value!=null&&value!=''){
            return value;
        }else{
            return cellvalue;
        }
    }
    /**
     * 字段值翻译
     * @param rowId
     * @param val
     * @param rowObject
     * @param cm
     * @param rdata
     * @returns {*}
     */
    function fieldValueFmatter(cellvalue, options, rowObject) {
        if(rowObject.changeField!=null){
            if(rowObject.changeField=='charge_id'){//负责人
                return $.hrUtils.getHRPersonNameById(cellvalue);
            }else if(rowObject.changeField=='type'){//负责人
                if(cellvalue=='company'){
                    return "公司";
                }else if(cellvalue=='dept'){
                    return "部门";
                }else if(cellvalue=='virtual'){
                    return "虚拟机构";
                }else{
                    return $.hrUtils.filterNull(cellvalue);
                }
            }else{
                return $.hrUtils.filterNull(cellvalue);
            }
        }else{
            return $.hrUtils.filterNull(cellvalue);
        }
    }

    /**
     * 删除机构变动信息
     * 数据多了需要有删除
     */
    function del() {
        var idsVal = $('#orgChangeList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "/org/orgChange/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                //刷新
                                $('#orgChangeList').jqGrid().trigger("reloadGrid");
                            } else {
                                if (xhr.code == "50000") {
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
     * 刷新grid
     */
    window.reload = function () {
        $('#orgChangeList').jqGrid().trigger("reloadGrid");
    };
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