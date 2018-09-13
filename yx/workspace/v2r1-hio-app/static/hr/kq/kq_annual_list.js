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
    var myFlag;//是否来自考勤核算(true 是)
    var editAnnualFloatDays = false;//年假浮动天数是否可编辑，默认不可编辑
    var token;
    $(function () {
        //机构复选框制空
        /* $("#orgId").val("");
         $("#orgName").val("");*/

        resizeHeight();
        token = $.kqUtils.token;
        myFlag = $.xljUtils.getUrlParam("myFlag");


        //计薪期间校验
        var wagePeriodDto = $.kqUtils.queryWagePeriod();
        if (wagePeriodDto === undefined || wagePeriodDto == null) {//计薪期间没有设置记录
            pop_text_open("blue", '请先设置计薪期间', function () {
                window.location.href = "kq_wage_period.html?type=add";
            }, function () {
                return;
            });
        } else {
            var startDate = wagePeriodDto.startDate;
            if (startDate === undefined || startDate === null || startDate === "") {//计薪期间有设置，但是开始日期为空
                pop_text_open("blue", '请先设置计薪期间', function () {
                    window.location.href = "kq_wage_period.html?type=update&periodId=" + wagePeriodDto.id;
                }, function () {
                    return;
                });
            } else {
                queryAuth();
                pageInit();
                if (myFlag !== undefined && (myFlag === true || myFlag === "true")) {
                    $("#backToSmmmery").show();
                } else {
                    $("#backToSmmmery").hide();
                }
                resizeGrid();

                //年度选项初始化
                for (var i = 2010; i <= 2100; i++) {
                    $("#yearSelect").append("<option value=" + i + ">" + i + "</option>");
                }

                var year = new Date().getFullYear();
                $("#yearSelect option[value='" + year + "']").attr("selected", true);
            }
        }
        var status = $.xljUtils.getUrlParam("status");
        if (status == "01") {
            storageShow();
            document.onreadystatechange = loadComplete;//当页面加载状态改变的时候执行这个方法.

        }
        //test();
    });

    function loadComplete() {
        jqGridAnnualDays.jqGrid('GridUnload');
        if (document.readyState === "complete") { //当页面加载状态
            //annualQuery();
            var orgId = $("#orgId").val();
            var name = $("#name").val();
            var year = $("#yearSelect").val();
            var queryData = {
                "name": name,
                "annualYear": year,
                "orgId": orgId
            };
            queryAnnualList(queryData);
        }
    }

    $('.btn').click(function (e) {
        e.preventDefault();
    });

    $("#backToSummeryAccounts").click(function () {
        window.location.href = "kq_summary_accounts.html";
    });

    $("#closeWindow").click(function () {
        window.close();
    });

    function pageInit() {
        queryAnnualList();
    }

    function storageDate() {
        var orgId = $("#orgId").val();
        var orgName = $("#orgName").val();
        var name = $("#name").val();
        var year = $("#yearSelect").val();

        //var storage=window.localStorage;
        window.sessionStorage.setItem("annualListOrgID", orgId);
        window.sessionStorage.setItem("annualListOrgName", orgName);
        window.sessionStorage.setItem("annualListName", name);
        window.sessionStorage.setItem("annualListYear", year);

    }

    function storageShow() {
        var orgId = window.sessionStorage.getItem("annualListOrgID");
        var orgName = window.sessionStorage.getItem("annualListOrgName");
        var name = window.sessionStorage.getItem("annualListName");
        var year = window.sessionStorage.getItem("annualListYear");
        $("#orgId").val(orgId);
        $("#orgName").val(orgName);
        $("#name").val(name);
        var yearSelect = $("#yearSelect").find("option");
        for (var i = 0; i < yearSelect.size(); i++) {
            if ($(yearSelect[i]).val() == year) {
                $(yearSelect[i]).attr("selected", true);
            }
        }
    }

    //导出
    $("#export").click(function () {
        exportExcel();

        //pop_tip_open("blue", "导出成功！");
    });

    //导入
    $("#import").click(function () {
        //window.open("kq_annual_import.html");
        var orgId = $("#orgId").val();
        var name = $("#name").val();
        var year = $("#yearSelect").val();
        storageDate();
        window.location.href = "kq_annual_import.html?name=" + encodeURI(encodeURI(name)) + "&year=" + year + "&orgId=" + orgId;
    });


    //返回按钮
    $("#backToSmmmery").click(function () {
        window.location.href = "kq_summary_accounts.html?status=01";
    });

    /*//查询用户功能权限  add by tangsq since 20180122
    $.ajax({
        type: 'POST',
        url: hostUrl + "sys/sysUserInfo/queryAuthorizationBtnList",
        dataType: 'JSON',
        contentType: 'application/json',
        async: false,//设置为同步
        data: JSON.stringify({"menuCode": "zzrs"}),
        success: function (json) {
            var list = json.result;
            $.each(list, function (index, value) {
                for (var key in value) {
                    if (key == "code" && value[key] == "editAuthBtn") {   //编辑权限
                        $("#annualCalculateInit").show();//如果有编辑权限则显示 初始化  按钮
                        $("#annualCalculate").show();//计算
                        $("#import").show();//导入
                        editAnnualFloatDays = true;
                    }
                    if (key == "code" && value[key] == "exportAuthBtn") {   //导出权限
                        $("#export").show();//导出
                    }

                }
            });
        },
        error: function () {
            //alert("error");
        }
    });*/

    //查询用户功能权限
    function queryAuth() {
        $.ajax({
            type: 'POST',
            url: hostUrl + "auth/authData/queryAuthorizationBtnList",
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,//设置为同步
            data: JSON.stringify({"menuCode": "hr_attendance"}),
            success: function (json) {
                var list = json.result;
                $.each(list, function (index, value) {
                    for (var key in value) {
                        if (key == "code" && value[key] == "2") {//编辑权限
                            $("#annualCalculateInit").show();//如果有编辑权限则显示 初始化  按钮
                            $("#annualCalculate").show();//计算
                            $("#import").show();//导入
                            editAnnualFloatDays = true;
                            $("#export").show();//导出
                        }
                    }
                });
            },
            error: function () {
            }
        });
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
        // var w_h = $(window).height();
        // $(".slide-left .ztree-box").height((w_h - 70) + "px");
        //右侧table
        // $(".con-table .mytable").height((w_h - 130) + "px");
    }

//计算表格宽度
    function resizeGrid() {
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 80);
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-2, true);
        // $.xljUtils.gridResizeFn();
        //解决切换页面大小出现滚动条、切换页面百分比页面出现空白的问题
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 220);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($(window).width() - 40);
        $('#listAnnualInfo').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#listAnnualInfo').jqGrid('setFrozenColumns');
        // 冻结列样式
        $.xljUtils.setFrozenColumnStyle(41);
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
     * 上级组织机构回调函数
     * @param data
     */
    window.orgCallback = function (data) {
        var orgId = data.prefixId;
        var orgName = data.prefixName;
        $("#orgId").val(orgId);
        $("#orgName").val(orgName);
    };

    window.empty = function (data) {
        $("#orgId").val("");
        $("#orgName").val("");
    };


    /**
     * 年假信息
     */
    function queryAnnualList(querydata) {
        var ubody = "kq/hrKqAnnual/queryAnnualDays";
        var uall = hostUrl + ubody;
        var postdata = querydata;
        if (postdata == null || postdata == 'undefined') {
            postdata = {};
        }
        //创建jqGrid组件
        jqGridAnnualDays = jQuery("#listAnnualInfo").jqGrid(
            {
                url: uall,
                postData: postdata,
                datatype: "JSON",
                mtype: "POST",
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",

                jsonReader: {
                    repeatitems: false
                    // root: "result"
                },
                autowidth: true,
                shrinkToFit: false,
                colModel: [
                    {name: 'id', label: "id", hidden: true, width: 55, align: "center", frozen: true},
                    // {name: 'id', label: "id", hidden: true, width: 55, align: "center"},
                    {name: 'name', label: "姓名", width: 150, align: "center", frozen: true},
                    {name: 'phone', label: "手机号", width: 150, align: "center", frozen: true,},
                    {name: 'orgName', label: "所属机构", width: 150, align: "center", frozen: true},
                    {name: 'orgId', label: "机构id", hidden: true},
                    {name: 'postName', label: "职务", width: 150, align: "center"},
                    {name: 'postId', label: "职务", width: 150, align: "center", hidden: true},
                    {name: 'annualYear', label: "年度", width: 150, align: "center",},
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
                    // {
                    //     name: 'entryOrgTime',
                    //     label: "进入本公司日期",
                    //     width: 150,
                    //     sortable: false,
                    //     align: "center",
                    //     formatter: "date",
                    //     formatoptions: {newformat: 'Y-m-d'},
                    //     fixed: true
                    // },
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
                        editable: editAnnualFloatDays,
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
                    }
                    // ,
                    //
                    //
                    // {
                    //     name: 'annualInvalidDays',
                    //     id: "annualInvalidDays",
                    //     label: "失效天数",
                    //     width: 100,
                    //     sortable: false,
                    //     align: "center",
                    //     fixed: true
                    // }
                ],
                cellEdit: editAnnualFloatDays,//是否开启单元格的编辑功能
                cellsubmit: "clientArray",
                // cellsubmit: 'remote',//or 'clientArray',remote代表每次编辑提交后进行服务器保存，clientArray只保存到数据表格不保存到服务器
                // cellurl: hostUrl + 'kq/hrKqAnnual/queryAnnualDays',//cellsubmit要提交的后台路径
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

                    $.xljUtils.setFrozenColumnStyle(41);

                    if (data.success == false) {
                        pop_tip_open("red", data.message);
                    }
                },
                loadError: function (xhr, status, error) {
                    pop_tip_open("red", "查询失败");
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
                gridComplete: function (data) {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    //冻结列
                    $('#listAnnualInfo').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
                    jQuery("#listAnnualInfo").jqGrid('setFrozenColumns');
                    // $(".autoTip").tooltip();
                }
            });
    }

    window.annualQuery = function () {
        var orgId = $("#orgId").val();
        var name = $("#name").val();
        var year = $("#yearSelect").val();
        var queryData = {
            "name": name,
            "annualYear": year,
            "orgId": orgId
        };
        $('#listAnnualInfo').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
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
                url: hostUrl + "kq/hrKqAnnual/calculateAnnualInfo",
                type: "post",
                data: JSON.stringify({"ids": ids, "annualYear": yearSelect}),
                dataType: 'JSON',
                contentType: 'application/json',
                success: function (data) {
                    if (data.success == true) {
                        pop_tip_open("blue", "计算成功！");
                        jQuery("#listAnnualInfo").jqGrid().trigger("reloadGrid");
                    } else {
                        pop_tip_open("blue", "计算失败！");
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
            url: hostUrl + "kq/hrKqAnnual/calculateAnnualInfoTwo",
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
        var orgId = $("#orgId").val();
        var yearSelect = $("#yearSelect").val();
        $.ajax({
            url: hostUrl + "kq/hrKqAnnual/calculateAnnualInfoInit",
            type: "post",
            data: JSON.stringify({"orgId": orgId, "annualYear": yearSelect}),
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    jQuery("#listAnnualInfo").jqGrid().trigger("reloadGrid");
                    pop_tip_open("blue", "初始化成功！");
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
                url: hostUrl + "kq/hrKqAnnual/update/" + rowId,
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
            url: hostUrl + "kq/hrKqAnnual/saveOrUpdateInitForEntryTest",
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

    /**
     * 注意：未完成，未与机构进行联动
     */
    window.exportExcel = function () {
//表格数据
        var name = $("#name").val();
        var year = $("#yearSelect").val();
        var orgId = $("#orgId").val();
        /*var colNames = $("#listRest").jqGrid('getGridParam', 'colNames');
        var colModel = $("#listRest").jqGrid('getGridParam', 'colModel');*/
        /*rowData = $('#listRest').jqGrid('getRowData');
         for (var i = 0; i < rowData.length; i++) {
         var applyStartDate = rowData[i].applyStartDate;
         var applyEndDate = rowData[i].applyEndDate;
         rowData[i].applyStartDate = new Date(applyStartDate.replace(/-/g, '/')).getTime();
         rowData[i].applyEndDate = new Date(applyEndDate.replace(/-/g, '/')).getTime();
         }*/
        /*var name = $("#personName").val();
        var SPStatus = $("#SPStatus").val();
        var restType = $("#type").val();
        var orgId = $("#orgId").val();
        var orgName = $("#belongOrgName").val();
        var date = $("#date").val();

        var conditionMap = {
            "start": null,
            "limit": null,
            "name": name,
            "status": SPStatus,
            "type": restType,
            "orgName": orgName,
            "date": date
        };*/

        // var conditionMap = {"name": name, "annualYear": year, "orgId": orgId};

        var urlBody = "kq/hrKqAnnual/exportInfo?" + token;
        var urlAll = hostUrl + urlBody;

        var form = $('<form>');   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'name');
        input1.attr('value', name);

        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', 'annualYear');
        input2.attr('value', year);

        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', 'orgId');
        input3.attr('value', orgId);


        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open('blue', '导出成功');
        /*
                $.ajax({
                    type: 'POST',
                    url: urlAll,
                    dataType: 'json',
                    contentType: 'application/json',
                    // data: JSON.stringify(rowData),
                    data: JSON.stringify(conditionMap),
                    async: false,
                    success: function (json) {
                        if (json.success == true) {
                            var path = json.result;
                            if (undefined != path && "" != path) {//指定下载
                                var form = $("<form>");   //定义一个form表单
                                form.attr('style', 'display:none');   //在form表单中添加查询参数
                                form.attr('target', 'exportTarget');
                                form.attr('method', 'post');
                                form.attr('method', 'post');
                                form.attr('action', hostUrl + "/kq/hrKqRest/exportInfoClient?" + token);
                                //添加后台导出参数
                                var input1 = $('<input>');
                                input1.attr('type', 'hidden');
                                input1.attr('name', "path");
                                input1.attr('value', path);

                                $('body').append(form);  //将表单放置在web中
                                form.append(input1);   //将查询参数控件提交到表单上
                                form.submit();   //表单提交
                                pop_tip_open("", "导出成功");
                            }
                        } else {
                            pop_tip_open("red", json.message);
                        }
                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        pop_tip_open("red", "导出失败");
                    }
                })
        */
    };


})(jQuery, window, document)