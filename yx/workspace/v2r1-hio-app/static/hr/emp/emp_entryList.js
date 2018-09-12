/**
 * 人事信息-入职js
 */
;
(function ($, window, document, undefined) {
    //审批状态回调函数
    var applyStstusOptions;
    applyStstusOptions = {
        title: '选择代码',//选择器标题，默认是'选择组织机构'
        selectorType: 'hrSysCode',//选择器类型，默认是组织机构选择器:org表示组织机构选择器；
        treeUrl: hostUrl + 'sys/sysCodeItem/getCodeTree',// 生成zTree树的请求url,不指定使用默认对应类型的url
        treeParam: {'code_set_id': 1067},//生成zTree树的请求参数
        targetId: null,//选择的数据的ID存储input域的id
        targetName: null,//选择的数据的Name存储input域
        saveCallback: function (selectData) {
            $("#applyStatus").val(selectData.id);
            $("#applyStatus_name").val(selectData.name);
            $("#applyStatus_name").trigger("change");
        }
    };
    $('.hr-single-selector-applyStstusOptions').xljSingleSelector(applyStstusOptions);


    //定义全局参数
    var rowData;    //行数据
    var rowDataBefore;  //修改前的数据
    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //初始化日期控件
    function initDatetimepicker() {
        var picker1 = $('#datetimepicker').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN'
        });
    }

    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 100) + "px");
        //表示con-table 下的mytable
        $(".mytable").height((w_h - 80) + "px");
    }

    //计算表格宽度
    function resizeGrid() {
        //ui-jqgrid-bdiv这个样式 时jqGrid主体的样式
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height());
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }

    //上来就执行
    $(function () {

        //初始化指标集列表
        initSysInfoSetList();

        //初始化时间控件
        initDatetimepicker();

        //初始化高度
        resizeHeight();

        //todo 关闭按钮
        $("#closeBtn").click(function () {
            window.close();
        });

        //todo 查看审批流程
        $("#checkApplyBtn").click(function () {
            checkApply();
        });

        /**
         * 根据条件查询
         */
        $("#queryBtn").click(function () {
            queryByConditon();
        });

        window.queryByConditon = function () {
            var queryCondition = {};
            var applyOrgId = $("#applyOrgId").val();//所属公司和部门
            var applyStatus = $("#applyStatus").val();//审批状态
            var dateOfApply = $("#dateOfApply").val();//申请时间
            var nameOrTopic = $("#nameOrTopic").val();//经办人或主题
            if (applyOrgId != '') {
                queryCondition.applyOrgId = applyOrgId;
            }
            if (applyStatus != '') {
                queryCondition.applyStatus = applyStatus;
            }
            if (dateOfApply != '') {
                queryCondition.dateOfApply = dateOfApply;
            }
            queryCondition.delflag = 0;
            queryCondition.applyName = nameOrTopic;
            queryCondition.applicant = nameOrTopic;
            var postData = $("#empEntityListForm").jqGrid("getGridParam", "postData");
            $.each(postData, function (k, v) {
                delete postData[k];
            });
            queryCondition.delflag = 0;
            queryCondition.type = '1068100133';
            queryCondition.startNew = 0;
            var limit = $('#empEntityListForm').getGridParam('rowNum');
            queryCondition.limitNew = parseInt(limit);
            $("#empEntityListForm").jqGrid('setGridParam', {
                datatype: 'json',
                postData: queryCondition
            }).trigger('reloadGrid');//动态赋值
            var postData = $("#empEntityListForm").jqGrid("getGridParam", "postData");
            delete postData["startNew"];
            delete postData["limitNew"];
        };

        //todo 导出报表
        $("#exportBtn").click(function () {
            var form = $("<form>");   //定义一个form表单
            var queryKey = $("#nameOrTopic").val();
            var sortname = $("#empEntityListForm").jqGrid().getGridParam("sortname");
            var sortorder = $("#empEntityListForm").jqGrid().getGridParam("sortorder");
            var applyOrgId = $("#applyOrgId").val();//所属公司和部门
            var applyStatus = $("#applyStatus").val();//审批状态
            var dateOfApply = $("#dateOfApply").val();//申请时间


            form.attr('style', 'display:none');   //在form表单中添加查询参数
            form.attr('target', 'exportTarget');
            form.attr('method', 'post');
            form.attr('action', hostUrl + "sys/sysApply/exportApplyInfo");

            if (applyOrgId != '') {
                var applyOrgIdParam = $('<input>');
                applyOrgIdParam.attr('type', 'hidden');
                applyOrgIdParam.attr('name', "applyOrgId");
                applyOrgIdParam.attr('value', applyOrgId);//机构或部门
                form.append(applyOrgIdParam);
            }

            if (applyStatus != '') {
                var applyStatusParam = $('<input>');
                applyStatusParam.attr('type', 'hidden');
                applyStatusParam.attr('name', "applyStatus");
                applyStatusParam.attr('value', applyStatus);//审批状态
                form.append(applyStatusParam);
            }

            if (dateOfApply != '') {
                var dateOfApplyParam = $('<input>');
                dateOfApplyParam.attr('type', 'hidden');
                dateOfApplyParam.attr('name', "dateOfApply");
                dateOfApplyParam.attr('value', dateOfApply);//审批状态
                form.append(dateOfApplyParam);
            }

            //查询入职审批类型 和 有效记录
            var delflagParam = $('<input>');
            delflagParam.attr('type', 'hidden');
            delflagParam.attr('name', "delflag");
            delflagParam.attr('value', '0');//有效记录
            form.append(delflagParam);

            var applyTypeParam = $('<input>');
            applyTypeParam.attr('type', 'hidden');
            applyTypeParam.attr('name', "type");
            applyTypeParam.attr('value', '1068100133');//入职类型
            form.append(applyTypeParam);

            if (queryKey != undefined && queryKey != '') {//条件查询
                var nameParam = $('<input>');
                nameParam.attr('type', 'hidden');
                nameParam.attr('name', "applyName");
                nameParam.attr('value', queryKey);
                form.append(nameParam);
                var personCodeParam = $('<input>');
                personCodeParam.attr('type', 'hidden');
                personCodeParam.attr('name', "applicant");
                personCodeParam.attr('value', queryKey);
                form.append(personCodeParam);
            }

            //排序字段  sidx（排序字段）   sord（升降序）
            if (sortname != undefined && sortname != '') { //排序字段
                var sortnameParam = $('<input>');
                sortnameParam.attr('type', 'hidden');
                sortnameParam.attr('name', "sidx");
                sortnameParam.attr('value', sortname);
                form.append(sortnameParam);
                var sortorderParam = $('<input>');
                sortorderParam.attr('type', 'hidden');
                sortorderParam.attr('name', "sord");
                sortorderParam.attr('value', sortorder);
                form.append(sortorderParam);
            }
            //todo 自定义导出名称
            var exportNameParam = $('<input>');
            exportNameParam.attr('type', 'hidden');
            exportNameParam.attr('name', "exportName");
            exportNameParam.attr('value', '入职申请');//入职类型
            form.append(exportNameParam);
            $('body').append(form);  //将表单放置在web中
            console.info("表单信息");
            console.info(form.serializeArray());
            form.submit();   //表单提交
        });

        /**
         * 新增入职员工
         */
        $("#addNewBtn").click(function () {
            window.location.href = "emp_entry.html?oper=add";
        });
        /**
         * 修改入职员工
         */
        $("#editBtn").click(function () {
            var idsVal = $('#empEntityListForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var rowId = $('#empEntityListForm').jqGrid("getGridParam", "selrow");
                    rowData = $('#empEntityListForm').jqGrid('getRowData', rowId);
                    if (rowData.status == '草稿') {
                        window.location.href = "emp_entry.html?oper=edit&id=" + rowData.id;
                    } else {
                        //如果是非草稿状态只能查看
                        window.location.href = "emp_entry_read.html?oper=edit&id=" + rowData.id;
                    }
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //todo 关闭页面回调父页面
        window.parentReloadById = function (callBackId) {
            $('#empEntityListForm').jqGrid("setGridParam", {
                gridComplete: function () {
                    if (callBackId != undefined && callBackId != "") {
                        $("#empEntityListForm").setSelection(callBackId);
                    }
                }
            }).trigger("reloadGrid");
        };

        //处理日期选择
        resizeGrid();
        // $.xljUtils.resizeNestedGrid();

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

        //修改员工资料
        $("#changeBtn").click(function () {
            var idsVal = $('#hrEmpSetList').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var rowId = $('#hrEmpSetList').jqGrid("getGridParam", "selrow");
                    rowData = $('#hrEmpSetList').jqGrid('getRowData', rowId);
                    window.location.href = "emp_personinfo.html?empId=" + rowData.id;
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //批量删除
        $("#delBtn").click(function () {
            delOption();
        });

    });

    window.orgCallback = function (data) {
        $("#applyOrgId").val(data.id);
        $("#orgName").val(data.name);
        //触发查询
        $("#applyOrgId").trigger("change");
    };


    /**
     * 初始化指标集列表
     */
    function initSysInfoSetList() {
        //创建jqGrid组件
        var jqGridSysInfoSet = jQuery("#empEntityListForm").jqGrid(
            {
                url: hostUrl + 'sys/sysApply/pageList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                colNames: ['id','是否走审批流标识', '申请编号', '主题', '审批状态', '制单人', '制单人所属机构', '经办人', '当前审批人', '申请日期'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', label: 'id', editable: true, sortable: false, hidden: true, align: "center"},
                    {name: 'isGoApp', label: 'isGoApp', editable: true, sortable: false, hidden: true, align: "center"},
                    {name: 'code', index: 'code', editable: true, width: 150, align: "center"},
                    {name: 'name', index: 'name', editable: true, width: 120, align: "center"},
                    {
                        name: 'status',
                        index: 'status',
                        editable: true,
                        width: 60,
                        align: "center",
                        formatter: $.hrUtils.getHRCodeNameById
                    },
                    {name: 'createrName', index: 'createrName', editable: true, width: 60, align: "center"},
                    {name: 'companyName', index: 'companyName', editable: true, width: 120, align: "center"},
                    {name: 'applicantName', index: 'applicantName', editable: true, width: 60, align: "center"},
                    {name: 'currentApprover', index: 'currentApprover', width: 60, align: "center", sortable: false},
                    {
                        name: 'applyDate',
                        index: 'applyDate',
                        editable: true,
                        width: 60,
                        align: "center",
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}
                    }
                ],
                width: window.screen.availWidth - 25,
                height: $(window).height() - 270,
                autoWidth: true,
                pager: '#pager2',
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                viewrecords: true,
                sortname: 'applyDate',//初始化的时候排序的字段
                sortorder: "desc",//排序方式,可选desc,asc
                multiselect: true,
                multiboxonly: true,
                postData: {"delflag": 0, 'type': '1068100133'},
                jsonReader: {
                    repeatitems: false
                },
                onSelectRow: function () {
                    var rowId = $('#empEntityListForm').jqGrid("getGridParam", "selrow");
                    rowData = $('#empEntityListForm').jqGrid('getRowData', rowId);
                },
                ondblClickRow: function (rowId) {
                    //双击跳转查看代码项页面
                    rowData = $('#empEntityListForm').jqGrid('getRowData', rowId);
                    if (rowData.status == '草稿') {
                        window.location.href = "emp_entry.html?oper=edit&id=" + rowData.id;
                    } else {
                        //如果是非草稿状态只能查看
                        window.location.href = "emp_entry_read.html?oper=edit&id=" + rowData.id;
                    }
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();

                },
                rowNum: 20,
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
                        // jqGridSysInfoSet.jqGrid().trigger("reloadGrid");
                    }
                }
            });
    }

    /**
     * 删除
     */
    function delOption() {
        var idsVal = $('#empEntityListForm').jqGrid('getGridParam', 'selarrrow');
        var flag = true;
        if (idsVal && idsVal != "") {
            for (var i in idsVal) {
                var rowData = $("#empEntityListForm").getRowData(idsVal[i]);
                if (rowData.status != "草稿") {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                    $.ajax({
                        url: hostUrl + "sys/sysApply/deletePseudoBatch/" + idsVal,
                        type: 'DELETE',
                        dataType: 'JSON',
                        contentType: 'application/json',
                        data: JSON.stringify({}),
                        success: function (xhr, textStatus) {
                            console.log(xhr);
                            if (xhr) {
                                if (xhr.success) {
                                    $.xljUtils.tip("green", "数据删除成功！");
                                    var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                    var queryData = {};
                                    if (focusId == null) {
                                        queryData.datatype = 'json';
                                        queryData.page = $('#empEntityListForm').getGridParam('page') - 1;
                                        queryData.rowNum = $('#empEntityListForm').getGridParam('rowNum');
                                    }
                                    queryData.gridComplete = function () {
                                        if (focusId != null && focusId != "") {
                                            $("#empEntityListForm").jqGrid('setSelection', focusId);
                                        } else if (focusId == null || focusId == "") {
                                            $("#empEntityListForm tr").last().find(":input[role='checkbox']").trigger("click");
                                        }
                                        focusId = "";
                                    }
                                    $('#empEntityListForm').jqGrid("setGridParam", queryData).trigger("reloadGrid");
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
                $.xljUtils.tip("blue", "只能删除草稿状态的记录，请重新选择！");
            }
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }

    function getIdsVal() {
        var idsCheck = $('#empEntityListForm').find("input[role='checkbox']:checked");
        var idsVal = new Array();
        for (var i = 0; i < idsCheck.length; i++) {
            idsVal.push($(idsCheck.get(i)).parent().parent().attr("id"));
        }
        return idsVal;
    }

    //todo 查看审批流程
    function checkApply() {
        var idsVal = $('#empEntityListForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行查询！");
                return;
            } else {
                var rowId = $('#empEntityListForm').jqGrid("getGridParam", "selrow");
                rowData = $('#empEntityListForm').jqGrid('getRowData', rowId);
                if (rowData.status != "草稿") {
                    if (rowData.isGoApp=='true') {//经过审批流提交的流程
                        toFlowView(rowData.id, FLCODE_RYRZ);
                    }else{
                        $.xljUtils.tip("red", "当前的流程不是经过审批流程提交的数据，无法查看审批流");
                        return;
                    }
                } else {
                    $.xljUtils.tip("red", "只有提交审批的数据才能查看审批进度");
                    return;
                }
            }
        } else {
            $.xljUtils.tip("blue", "请选择要查看的数据！");
        }
    }

    //todo 清空信息
    window.emptyInfo = function (id, hiddenId) {
        $("#" + id).val("");
        $("#" + hiddenId).val("");
        queryByConditon();
    }

})(jQuery, window, document);