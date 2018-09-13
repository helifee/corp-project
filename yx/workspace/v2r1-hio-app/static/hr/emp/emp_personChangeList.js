/**
 * 人事信息-晋升晋级js
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
        $(".mytable").height((w_h - 80) + "px");
    }

    //计算表格宽度
    function resizeGrid() {
        //ui-jqgrid-bdiv这个样式 时jqGrid主体的样式
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() );
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }

    //上来就执行
    $(function () {

        //初始化指标集列表
        initSysInfoSetList();


        //初始化高度
        resizeHeight();



        /**
         * 新增入职员工
         */
        $("#addNewBtn").click(function(){
            window.open("emp_personChange.html?oper=add");
        });
        /**
         * 修改入职员工
         */
        $("#editBtn").click(function(){
            window.open("emp_personChange.html?oper=edit");
        });

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



        //修改
        $("#changeBtn").click(function () {
            var idsVal = $('#personChangeForm').jqGrid('getGridParam', 'selarrrow');
            if (idsVal && idsVal != "") {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    var rowId = $('#personChangeForm').jqGrid("getGridParam", "selrow");
                    rowData = $('#personChangeForm').jqGrid('getRowData', rowId);
                    window.open("emp_personinfo.html?empId=" + rowData.id);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //批量删除
        $("#delUprankBtn").click(function(){
            delOption();
        });
        //导出excel
        $("#exprotBtn").click(function(){
            exportExcel();
        });

    });


    /**
     * 初始化指标集列表
     */
    function initSysInfoSetList() {
        //创建jqGrid组件
        var jqGridSysInfoSet = jQuery("#personChangeForm").jqGrid(
            {
                url: baseUrl+'sys/sysApply/page',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                colNames: ['id','申请编号', '主题','审批状态','经办人','申请日期'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name : 'id',label : 'id',editable:true,sortable:false,hidden:true,align: "center"},
                    {name: 'code', index: 'code', editable: true, width: 100, align: "center"},
                    {name: 'name', index: 'name', editable: true, width: 100, align: "center"},
                    {name: 'status', index: 'status', editable: true, width: 100, align: "center"},
                    {name: 'applicant', index: 'applicant', editable: true, width: 100, align: "center"},
                    {name: 'applyDate', index: 'applyDate', editable: true, width: 100, align: "center"}
                ],
                width: window.screen.availWidth,
                height: $(window).height() - 200,
                autoWidth: true,
                pager: '#pager2',
                rowList: [10, 20, 30],//可供用户选择一页显示多少条
                //sortname: 'sort',//初始化的时候排序的字段
                //sortorder: "asc",//排序方式,可选desc,asc
                multiselect: true,
                postData:{"delflag":0,"type":'1068100113'},
                jsonReader: {
                    repeatitems: false
                },
                onSelectRow: function () {
                    var rowId = $('#personChangeForm').jqGrid("getGridParam", "selrow");
                    rowData = $('#personChangeForm').jqGrid('getRowData', rowId);
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                },
                rowNum: 10,
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

    /**
     * 删除
     */
    function delOption() {
        var idsVal = $('#personChangeForm').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: baseUrl + "sys/sysApply/deletePseudoBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                $('#personChangeForm').jqGrid().trigger("reloadGrid");
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
     *  导出Excel
     */
    function exportExcel() {
    //表格数据
        rowData = $('#personChangeForm').jqGrid('getRowData');
        for (var i = 0;i<rowData.length;i++){
            var applyDate = rowData[i].applyDate;
            if(applyDate!= undefined && applyDate !=null && applyDate.trim() != ''){
                var date = applyDate.replace(/-/g, '/');
                rowData[i].applyDate = new Date(date).getTime();
            }else {
                rowData[i].applyDate = "";
            }
        }
        var urlBody = "sys/sysApply/exportInfo";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(rowData),
            async: false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {//指定下载
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action', hostUrl + "org/orgPostRelation/exportInfoClient");
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
                    pop_tip_open("red", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "导出失败");
            }
        })
    }
})(jQuery, window, document);