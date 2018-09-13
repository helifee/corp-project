;(function ($, window, document, undefined) {
    var iRow;
    var iCol;
    var jqGridAnnualDays;
    var lastrow;
    var lastcell;
    var lastRowId;
    var beforeEditValue;
    var cellFlag;
    var editFlag;
    var orgId;
    var lastTime;
    $(function () {
        resizeHeight();
        pageInit();
        resizeGrid();

        //年度选项初始化
        for (var i = 2010; i <= 2100; i++) {
            $("#yearSelect").append("<option value=" + i + ">" + i + "</option>");
        }

        var year = new Date().getFullYear();
        $("#yearSelect option[value='" + year + "']").attr("selected", true);

        $('.btn').click(function (e) {
            e.preventDefault();
        });

        $("#backToSummeryAccounts").click(function () {
            window.location.href = "kq_summery_accounts.html";
        });

        $("#closeWindow").click(function () {
            window.close();
        });

        //导出
        $("#export").click(function () {
            pop_tip_open("blue", "导出成功！");
        });

        //导入
        $("#import").click(function () {
            window.open("kq_annual_import.html");
        });

    });

    function pageInit() {
        queryAnnualList();
    }

    function openNewWindow(src) {
        window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
    }

    function closeWindow() {
        window.close();
    }

//计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        // $(".slide-left .ztree-box").height((w_h - 70) + "px");
        //右侧table
        $(".con-table .mytable").height((w_h - 130) + "px");
    }

//计算表格宽度
    function resizeGrid() {
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 80);
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-2, true);
        $.xljUtils.gridResizeFn();
    }

//grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    /**
     * 考勤期间所属机构回调函数
     * @param data
     */
    window.personCallback = function (data) {
        $("#groupListForm").find("input[id='orgId']").val(data.id);
        $("#groupListForm").find("input[id='belongOrgName']").val(data.name);
    };

    /**
     * 样式格式化:对字段标红
     */
    window.addCellAttr = function (rowId, val, rowObject, cm, rdata) {
        if (!rowObject.useStatus) {
            return "style='color:blue'";
        }
    };
    window.addCellAttr2 = function (rowId, val, rowObject, cm, rdata) {
        if (!rowObject.useStatus) {
            return "style='color:DarkTurquoise'";
        }
    };

    /**
     * 年假信息
     */
    window.queryAnnualList = function () {
        var ubody = "kq/hrKqAnnual/queryAnnualDays";
        var uall = serviceUrl + ubody;
        //创建jqGrid组件
        jqGridAnnualDays = jQuery("#listAnnualInfo").jqGrid(
            {
                url: uall,
                ajaxGridOptions: {contentType: 'application/json'},
                mtype: "POST",
                // postData: {"orgId": "---"},
                contentType: "application/json",
                datatype: "JSON",
                jsonReader: {
                    repeatitems: false
                    // root: "result"
                },
                autowidth: true,
                shrinkToFit: false,
                colModel: [
                    {name: 'id', label: "id", hidden: true, width: 55, align: "center", frozen: true, fixed: true},
                    {name: 'name', label: "姓名", width: 150, align: "center", frozen: true, fixed: true},
                    {name: 'annualYear', label: "年度", width: 150, frozen: true, fixed: true},
                    {name: 'orgName', label: "机构", width: 150, align: "center", frozen: true, fixed: true},
                    {name: 'orgId', label: "机构id", hidden: true, frozen: true, fixed: true},
                    {name: 'postId', label: "岗位", width: 150, align: "center", hidden: true},
                    {name: 'postName', label: "岗位", width: 150, align: "center", frozen: true, fixed: true},
                    // {name: 'personType', label: "人员类别", width: 150, align: "center", formatter: codeFormatter},
                    // {name: 'personCode', label: "人员编号", width: 150, align: "center"},

                    {
                        name: 'entryTime',
                        label: "入职日期",
                        width: 150,
                        align: "center",
                        sortable: false,
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'},
                        fixed: true
                    },
                    {
                        name: 'entryOrgTime',
                        label: "进入本公司日期",
                        width: 150,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'},
                        fixed: true
                    },
                    {
                        name: 'workTime',
                        label: "参加工作日期",
                        width: 150,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'},
                        fixed: true
                    },
                    {
                        name: 'annualUsedDays',
                        label: "已休天数",
                        width: 100,
                        sortable: false,
                        align: "center",
                        cellattr: addCellAttr,
                        fixed: true
                    },
                    {
                        name: 'annualRemainDays',
                        label: "剩余天数",
                        width: 100,
                        sortable: false,
                        align: "center",
                        cellattr: addCellAttr,
                        title: false,
                        formatter: function (cellvalue, options, rowObject) {
                            return "<span title='剩余天数=年假实际天数-已休天数' class='autoTip'>" + cellvalue + "</span>";
                        },
                        fixed: true
                    },
                    {
                        name: 'annualRealDays',
                        label: "年假实际天数",
                        width: 100,
                        sortable: false,
                        align: "center",
                        title: false,
                        formatter: function (cellvalue, options, rowObject) {
                            return "<span title='年假实际天数=年假标准天数+年假浮动天数+上年结余天数' class='autoTip'>" + cellvalue + "</span>";
                        },
                        fixed: true
                    },
                    {
                        name: 'annualStandardDays',
                        label: "年假标准天数",
                        width: 100,
                        sortable: false,
                        align: "center",
                        cellattr: addCellAttr2,
                        fixed: true
                    },
                    {
                        name: 'annualFloatDays',
                        id: "annualFloatDays",
                        label: "年假浮动天数",
                        width: 100,
                        sortable: false,
                        align: "center",
                        editable: true,
                        cellattr: addCellAttr2,
                        fixed: true
                    },
                    {
                        name: 'annualBalanceDays', label: "上年结余", width: 100, sortable: false, align: "center",
                        cellattr: addCellAttr2,
                        fixed: true
                    },
                    {
                        name: 'annualBalanceRemainDays',
                        label: "结余剩余",
                        width: 100,
                        sortable: false,
                        align: "center",
                        fixed: true
                        // cellattr: addCellAttr2
                    },
                    {
                        name: 'annualBalanceDeadline',
                        label: "结余截止日",
                        width: 150,
                        sortable: false,
                        align: "center",
                        formatter: "date",
                        formatoptions: {newformat: 'Y-m-d'},
                        fixed: true
                    },


                    {
                        name: 'annualInvalidDays',
                        id: "annualInvalidDays",
                        label: "失效天数",
                        width: 100,
                        sortable: false,
                        align: "center",
                        fixed: true
                    }
                ],
                cellEdit: true,//是否开启单元格的编辑功能
                cellsubmit: "clientArray",
                // cellsubmit: 'remote',//or 'clientArray',remote代表每次编辑提交后进行服务器保存，clientArray只保存到数据表格不保存到服务器
                // cellurl: serviceUrl + 'kq/hrKqAnnual/queryAnnualDays',//cellsubmit要提交的后台路径
                // cellurl:"",//cellsubmit要提交的后台路径
                height: $(window).height() - 200,
                rownumbers: true,
                multiselect: true,
                multiboxonly: true,
                sortname: 'id',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                // rowNum: -1,//一页显示多少条 -1全部
                rowNum: 20,//一页显示多少条
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: "#pager2",//表格页脚的占位符(一般是div)的id
                page: 1,
                viewrecords: true, //定义是否要显示总记录数
                loadComplete: function (data) {

                },
                onCellSelect: function (rowid, iCol, cellcontent, e) {
                    var colModel = $("#listAnnualInfo").jqGrid('getGridParam', 'colModel');
                    editFlag = colModel[iCol].editable;
                    // lastRowId = rowid;


                },

                beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
                    beforeEditValue = v;
                    lastrow = iRow;
                    lastcell = iCol;
                    lastRowId = rowid;
                    $("#save").show();
                },

                beforeSaveCell: function (rowid, cellname, value, iRow, iCol) {
                    // var reg = /-?(0|[1-9]\d*)(\.\d+)?/;
                    // var reg1 = /^[0-9]*$/;
                    var reg1 = /^(\-|\+)?\d+(\.\d+)?$/
                    if (!reg1.test(value)) {
                        pop_tip_open("red", "请输入数字！");
                        cellFlag = false;
                        editFlag = false;
                        return;
                    } else {
                        cellFlag = true;
                        if (editFlag == true) {
                            // cellSave();
                        }
                        // save(rowid);
                    }
                },

                afterSaveCell: function (rowid, cellname, value, iRow, iCol) {
                    if (cellFlag == true) {
                        save(rowid, "");
                    } else {
                        $('#listAnnualInfo').jqGrid("setCell", rowid, cellname, beforeEditValue);
                    }
                    $("#save").hide();
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    // $(".autoTip").tooltip();
                }
            }).jqGrid('setFrozenColumns');
        $("#listAnnualInfo").jqGrid({}).jqGrid('setFrozenColumns').triggerHandler("jqGridAfterGridComplete");
        // $("#listAnnualInfo") .jqGrid('setFrozenColumns').triggerHandler("jqGridAfterGridComplete");
        // jQuery("#listAnnualInfo").jqGrid('setFrozenColumns');
        // jQuery("#listAnnualInfo").jqGrid('setGroupHeaders', {
        //     useColSpanStyle: false,
        //     groupHeaders:[
        //         {startColumnName: 'name', numberOfColumns: 1, titleText: '<em>A</em>'},
        //         {startColumnName: 'orgId', numberOfColumns: 1, titleText: 'B'}
        //     ]
        // });
    };

    window.annualQuery = function () {
        var name = $("#name").val();
        var year = $("#yearSelect").val();
        var queryData = {
            "name": name,
            "annualYear": year
        };
        jQuery("#listAnnualInfo").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid", [{page: 1}]);
    };

    $("#name").keydown(function (e) {
        if (e.keyCode == 13) {
            userOnId = "";
            annualQuery();
            event = arguments.callee.caller.arguments[0] || window.event;
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
        }
    });


    window.annualCalculate = function () {
        var ids = jqGridAnnualDays.jqGrid('getGridParam', 'selarrrow');
        if (ids == "" || ids == null) {
            pop_tip_open("red", "请选择人员！");
        } else {
            var yearSelect = $("#yearSelect").val();
            $.ajax({
                url: serviceUrl + "kq/hrKqAnnual/calculateAnnualInfo",
                // url: serviceUrl + "kq/hrKqAnnual/calculateAnnualInfoTwo",
                type: "post",
                // data: "{}",
                data: JSON.stringify({"ids": ids, "annualYear": yearSelect}),
                dataType: 'JSON',
                contentType: 'application/json',
                success: function (data) {
                    if (data.success == true) {
                        var result = data.result;
                        pop_tip_open("blue","计算成功！");
                        jQuery("#listAnnualInfo").jqGrid().trigger("reloadGrid");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", textStatus);
                    pop_tip_open("red", "计算失败！");
                }
            });
        }

    };

    window.annualCalculateAuto = function () {
        $.ajax({
            url: serviceUrl + "kq/hrKqAnnual/calculateAnnualInfoTwo",
            type: "post",
            data: "{}",
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    jQuery("#listAnnualInfo").jqGrid().trigger("reloadGrid");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", textStatus);
                pop_tip_open("red", "计算失败！");
            }
        });
    };

    window.annualCalculateInit = function () {
        var yearSelect = $("#yearSelect").val();
        $.ajax({
            url: serviceUrl + "kq/hrKqAnnual/calculateAnnualInfoInit",
            type: "post",
            data: "{}",
            data: JSON.stringify({"orgId": orgId, "annualYear": yearSelect}),
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    jQuery("#listAnnualInfo").jqGrid().trigger("reloadGrid");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", textStatus);
                pop_tip_open("red", "初始化失败！");
            }
        });
    };


    window.cellSave = function () {
        if (editFlag == true) {
            $("#listAnnualInfo").jqGrid("saveCell", lastrow, lastcell);
        }
    };

    $('html').bind('click blur', function (e) { //用于点击其他地方保存正在编辑状态下的行
        if (lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
            if (editFlag == true) {
                if ($(e.target).closest('#listAnnualInfo').length == 0) {
                    $("#listAnnualInfo").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                }
            }
        }
    });


    // $('html').keyup(function (e) {//自动保存
    //     lastTime = e.timeStamp;
    //     setTimeout(function () {
    //         if (lastTime - e.timeStamp == 0 && lastrow != "" && lastcell != "" && e.target.tagName != 'input' && e.target.tagName != 'TD') { //if a row is selected for edit
    //             if (editFlag == true) {
    //                 $("#listAnnualInfo").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
    //             }
    //         }
    //     }, 5000);
    // });
    window.saveAnnualFloatDay = function () {
        var id = lastrow + "_" + "annualFloatDays";
        var annualFloatDays = $("#listAnnualInfo tr:eq(" + (lastrow) + ")").find("#" + id + "").val();
        var reg = /-?(0|[1-9]\d*)(\.\d+)?/;
        var reg1 = /^[0-9]*$/;
        if (!reg.test(annualFloatDays) || !reg1.test(annualFloatDays)) {
            pop_tip_open("red", "请输入数字！");
            cellFlag = false;
            $('#listAnnualInfo').jqGrid("setCell", lastRowId, "annualFloatDays", beforeEditValue);
        } else {
            cellFlag = true;
            if (editFlag == true) {
                $("#listAnnualInfo").jqGrid("saveCell", lastrow, lastcell);//保存单元格，切换为文本模式
                save(lastRowId, annualFloatDays);
            }
            cellFlag = false;
            editFlag = false;
        }
        $("#save").hide();
    };

    /**
     * 保存操作类型数据
     */
    window.save = function (rowId, annualFloatDays) {
        if (cellFlag == true) {
            var rowData = $('#listAnnualInfo').jqGrid('getRowData', rowId);
            if (annualFloatDays != "" && annualFloatDays != null) {
                rowData.annualFloatDays = annualFloatDays;
            }
            $.ajax({
                type: "put",
                url: serviceUrl + "kq/hrKqAnnual/update/" + rowId,
                data: JSON.stringify(rowData),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    pop_tip_open("blue", "保存成功！");
                    //聚焦
                    $('#listAnnualInfo').jqGrid("setGridParam", {
                        gridComplete: function () {
                            if (rowId != null && rowId != "") {
                                $("#listAnnualInfo").setSelection(rowId);
                            }
                        }
                    }).trigger("reloadGrid");
                    $('#listAnnualInfo').jqGrid('setGridParam', {datatype: 'json'}).trigger("reloadGrid");
                },
                error: function (xhr) {
                    $.xljUtils.getError(xhr.status);
                }
            })
        }
    };


    window.orgFormatter = function (cellValue, options, rowObject) {
        var orgName = $.hrUtils.getHROrgNameById(cellValue);
        if (orgName != null) {
            return orgName;
        } else {
            return "";
        }
    };

    window.postFormatter = function (cellValue, options, rowObject) {
        var postName = $.hrUtils.getHRPostNameById(cellValue);
        if (postName != null) {
            return postName;
        } else {
            return "";
        }
    };

    /**
     * 树点击节点事件
     */

    window.zTreeOnClick = function (event, treeId, treeNode) {
        // var type = treeNode.type == 'cata';//根节点
        orgId = treeNode.id;
        if (treeNode.type == 'cata') {
            orgId = "";
        }
        var queryData = {
            "orgId": orgId
        };
        jQuery("#listAnnualInfo").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
    };


    window.codeFormatter = function (cellValue, options, rowObject) {
        var codeName = $.hrUtils.getHRCodeNameById(cellValue);
        if (codeName != null) {
            return codeName;
        } else {
            return "";
        }
    };


    /**
     * 新入职人员年假初始化测试
     */
    window.saveOrUpdateInitForEntryTest = function () {
        var yearSelect = $("#yearSelect").val();
        var personId = "199611daece64177ae9402454858160d";//总部鑫苑  张鑫
        $.ajax({
            url: serviceUrl + "kq/hrKqAnnual/saveOrUpdateInitForEntryTest",
            type: "post",
            data: JSON.stringify({"personId": personId, "annualYear": yearSelect}),
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    jQuery("#listAnnualInfo").jqGrid().trigger("reloadGrid");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", textStatus);
                pop_tip_open("red", "初始化失败！");
            }
        });
    };

})(jQuery, window, document)