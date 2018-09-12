/**
 * lixd
 * 消息列表js
 */
;
(function ($, window, document, undefined) {
    //定义全局参数
    var rowData;    //行数据
    var rowDataBefore;  //修改前的数据
    var jqGridMsg;
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

        //初始化指标集列表
        initMsgList();

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        resizeGrid();
    });
    /**
     * 初始化指标集列表
     * 注：queryList的方法平台好像改为了只查询发送给用户的消息
     */
    function initMsgList() {
        //创建jqGrid组件
        jqGridMsg = jQuery("#msgList").jqGrid(
            {
                url: hostUrl + "flow/sysNoticeMsg/queryList",//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData: {"appCode": 'HR'},
                colNames: ['id', '消息业务id', '消息来源系统编号', '标题', '编号', '接收用户id', '接收用户姓名', '接受用户账号', '消息类型', '消息操作类型', '消息来源类型','一级分类','二级分类','三级分类'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', label: 'id', editable: true, sortable: false, hidden: true, align: "center"},
                    {
                        name: 'businessId',
                        label: 'businessId',
                        editable: true,
                        sortable: false,
                        hidden: true,
                        align: "center"
                    },
                    {name: 'appCode', label: 'appCode', editable: true, sortable: false, hidden: true, align: "center"},
                    {name: 'title', index: 'title', editable: true, align: "center"},
                    {name: 'code', index: 'code', editable: true, align: "center"},
                    {name: 'userId', index: 'userId', editable: true, align: "center", hidden: true},
                    {name: 'userName', index: 'userName', editable: true, align: "center"},
                    {name: 'loginName', index: 'loginName', editable: true, align: "center"},
                    {name: 'msgType', index: 'msgType', editable: true, align: "center", formatter: msgTypeFmatter},
                    {name: 'opType', index: 'opType', editable: true, align: "center", formatter: opTypeFmatter},
                    {name: 'source', index: 'source', editable: true, align: "center"},
                    {name: 'firstType', index: 'source', editable: true, align: "center", formatter: firstTypeFmatter},
                    {name: 'secondType', index: 'source', editable: true, align: "center"},
                    {name: 'thirdType', index: 'source', editable: true, align: "center",formatter: msgSetTypeFmatter}
                ],
                width: $('.mytable1').width(),
                height: $('.mytable1').height(),
                autoWidth: true,
                sortname: 'title',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                onSelectRow: function () {
                    var rowId = $('#msgList').jqGrid("getGridParam", "selrow");
                    rowData = $('#msgList').jqGrid('getRowData', rowId);
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
                        jqGridMsg.jqGrid().trigger("reloadGrid");
                    }
                }
            });
    }

    /**
     * 消息类型数据格式化
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {String}
     */
    function msgTypeFmatter(cellvalue, options, rowObject) {
        if (cellvalue) {
            return "审批类消息";
        } else {
            return "通知类消息";
        }
    }
    /**
     * 一级分类数据格式化
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {String}
     */
    function firstTypeFmatter(cellvalue, options, rowObject) {
        if (cellvalue=='TASKTODO') {
            return "待办消息";
        } else if(cellvalue=='MEETING'){
            return "会议提醒";
        } else if(cellvalue=='SCHEDULE'){
            return "日程提醒";
        } else if(cellvalue=='DIRECTORS'){
            return "董办平台";
        } else if(cellvalue=='NEWS'){
            return "新闻提醒";
        } else if(cellvalue=='DIRECTORS'){
            return "董办平台";
        }else if(cellvalue=='CLOCKIN'){
            return "打卡消息提醒";
        }
    }
    /**
     * 消息类型数据格式化
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {String}
     */
    function msgSetTypeFmatter(cellvalue, options, rowObject) {
        return $.hrUtils.getHRCodeNameById(cellvalue);
    }

    /**
     * 消息状态
     * 操作类型数据格式化
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {String}
     */
    function opTypeFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "DB") {
            return "代办";
        } else if (cellvalue == "DY") {
            return "待阅";
        } else if (cellvalue == "YB") {
            return "已办";
        } else if (cellvalue == "YY") {
            return "已阅";
        }
    }

    //发送消息
    $("#editBtn").unbind('click').on('click', function () {
        window.open("msg_edit.html?type=add");
    });
    //恢复消息状态
    $("#recoveryBtn").unbind('click').on('click', function () {
		recoveryStatus();
    });
    /**
     * 恢复消息状态
     */
    function recoveryStatus() {
        var idsVal = $('#msgList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一条数据进行恢复！");
                return;
            } else {
                var rowId = $('#msgList').jqGrid("getGridParam", "selrow");
                updateStatusYB2DB(rowId);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要编辑的消息！");
        }
    }
    //测试生日提醒
    $("#testTimeMsg").unbind('click').on('click', function () {
        testTimeMsg(0);
    });
    //转正预警
    $("#testTimeMsg1").unbind('click').on('click', function () {
        testTimeMsg(1);
    });
    //合同到期预警
    $("#testTimeMsg2").unbind('click').on('click', function () {
        testTimeMsg(2);
    });
    //未加入考勤班组预警
    $("#testTimeMsg3").unbind('click').on('click', function () {
        testTimeMsg(3);
    });
    //离职未停缴预警
    $("#testTimeMsg4").unbind('click').on('click', function () {
        testTimeMsg(4);
    });
    //离职未停薪预警
    $("#testTimeMsg5").unbind('click').on('click', function () {
        testTimeMsg(5);
    });
    //通用提醒
    $("#testTimeMsg6").unbind('click').on('click', function () {
        testTimeMsg(6);
    });
    //考试通知
    $("#testTimeMsg7").unbind('click').on('click', function () {
        testTimeMsg(7);
    });
    //考勤签到通知
    $("#testTimeMsg8").unbind('click').on('click', function () {
        testTimeMsg(8);
    });
    //考勤漏打卡通知
    $("#testTimeMsg9").unbind('click').on('click', function () {
        testTimeMsg(9);
    });
    //考勤签退通知
    $("#testTimeMsg10").unbind('click').on('click', function () {
        testTimeMsg(10);
    });
    //年龄工龄司龄
    $("#testTimeMsg11").unbind('click').on('click', function () {
        testTimeMsg(11);
    });
    //考试通知
    $("#examNoticeMsg").unbind('click').on('click', function () {
        //鑫苑 杨一清
        examNoticeMsg("5e01a0a6c4874caca438162718f5e6d5,cd85f482ff6bcabd3515a4182dfjtzef","考试啦，完蛋啦，啦啦啦,你考试得了100分666");
    });
    //删除
    $("#deleteBtn").unbind('click').on('click', function () {
        del();
    });
    //编辑
    $("#updateBtn").unbind('click').on('click', function () {
        updateInfo();
    });
    function testTimeMsg(type) {
        var postDto = {};
        if(type==0) {
            postDto.taskCode = "personBirthdayTimeTask";
        }else if(type==1){
            postDto.taskCode = "personRegular";
        }else if(type==2){
            postDto.taskCode = "contExpiration";
        }else if(type==3){
            postDto.taskCode = "notJoinKqGroup";
        }else if(type==4){
            postDto.taskCode = "dimissionNoStopInsurance";
        }else if(type==5){
            postDto.taskCode = "dimissionNoStopSalary";
        }else if(type==6){
            postDto.taskCode = "common";
        }else if(type==7){
            postDto.taskCode = "exam";
        }else if(type==8){
            postDto.taskCode = "kqSignTimeTask";
        }else if(type==9){
            postDto.taskCode = "kqNoSignTimeTask";
        }else if(type==10){
            postDto.taskCode = "kqSignOutTask";
        }else if(type==11){
            postDto.taskCode = "updateEmpInfoOfAge";
        }
        $.ajax({
            url: hostUrl + "sys/sysNoticeMsg/testTimeMsg",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(postDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", xhr.msg);
                        //重新加载数据
                        $('#msgList').jqGrid().trigger("reloadGrid");
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
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
    }

    /**
     * 考试通知
     * @param personIds 自定义提醒范围
     * @param showText  自定义提醒信息
     */
    function examNoticeMsg(personIds,showText) {
        var postDto = {};
        postDto.personIds=personIds;
        postDto.showText=showText;
        $.ajax({
            url: hostUrl + "sys/sysNoticeMsg/examNoticeMsg",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(postDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", xhr.msg);
                        //重新加载数据
                        $('#msgList').jqGrid().trigger("reloadGrid");
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
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
    }

    function updateInfo() {
        var idsVal = $('#msgList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一条数据进行编辑！");
                return;
            } else {
                var rowId = $('#msgList').jqGrid("getGridParam", "selrow");
                rowData = $('#msgList').jqGrid('getRowData', rowId);
                window.open("msg_edit.html?type=update&msgId=" + rowData.id);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要编辑的消息！");
        }
    }

    /**
     * 查询编制申请列表
     */
    function toOrgSizeApplyList() {
        var idsVal = $('#orgSizeList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一个机构进行申请！");
                return;
            } else {
                var rowId = $('#orgSizeList').jqGrid("getGridParam", "selrow");
                rowData = $('#orgSizeList').jqGrid('getRowData', rowId);
                window.location.href = "org_size_apply_list.html?orgSizeId=" + rowData.id;
            }
        } else {
            $.xljUtils.tip("blue", "请选择要申请的机构！");
        }
    }

    /**
     * 删除年度编制信息
     */
    function del() {
        var idsVal = $('#msgList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: hostUrl + "flow/sysNoticeMsg/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                $('#msgList').jqGrid().trigger("reloadGrid");
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
    //查询
    $("#queryBtn").click(function () {
        postQuery();
    });
    /**
     * 安照消息名称查询
     */
    function postQuery() {
        //用户模糊查询值
        var title = $("#title").val();
        var queryDataPost = {};
        queryDataPost.title = title;
        jqGridMsg.jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
    }
})(jQuery, window, document);