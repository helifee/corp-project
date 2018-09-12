/**
 * lixd
 * 生日提醒列表js
 */
;
(function ($, window, document, undefined) {
    //定义全局参数
    var rowData;    //行数据
    var rowDataBefore;  //修改前的数据
    var jqGridOrgSize;
    var msgId;//消息id
    var advanceDate;//提前提醒的时间
    var advanceUnit;//提前提醒的时间单位
    var personType;//人员的状态
    var curSysDate;//当前的系统时间
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
        //消息id
        msgId = $.xljUtils.getUrlParam("msgId");
        advanceDate=$.xljUtils.getUrlParam("advanceDate");
        advanceUnit=$.xljUtils.getUrlParam("advanceUnit");
        personType=$.xljUtils.getUrlParam("personType");
        curSysDate=$.xljUtils.getUrlParam("curSysDate");
        iniPersonListList();
        //已阅的处理方式
        var readType=$.xljUtils.getUrlParam("readType");
        if(readType=='1'){//按钮操作
            //显示已阅按钮
            $('#readType').show();
        }else{//看后即毁
            updateStatusOfNoticeMsgByCurrentUser(msgId);
        }
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
    //将消息设置为已阅
    $("#readType").unbind('click').on('click', function () {
        updateStatusOfNoticeMsgByCurrentUser(msgId);
    });
    /**
     * 初始化指标集列表
     */
    function iniPersonListList() {
        var postData={};
        // postData.birthday=new Date().format("yyyy-MM-dd");
        postData.advanceDate=advanceDate;
        postData.advanceUnit=advanceUnit;
        postData.personType=personType;
        postData.curSysDate=curSysDate;
        //创建jqGrid组件
        jqGridOrgSize = jQuery("#personList").jqGrid(
            {
                url: baseUrl + '/emp/empPersonInfo/queryListBirthday',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "post",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData: postData,
                colNames: ['id', '姓名', '人员编号', '所属机构', '岗位', '人员类别', '证件号码','出生日期', '入职日期', '进入本公司日期'],//列名
                colModel: [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
                    {name: 'id', label: 'id', editable: true, sortable: false, hidden: true, align: "center"},
                    {name: 'name', index: 'name', editable: true, width: 100, align: "center", frozen: true},
                    {
                        name: 'personCode',
                        index: 'personCode',
                        editable: true,
                        width: 100,
                        align: "center",
                        frozen: true
                    },
                    {name: 'orgId', index: 'orgId', editable: true, width: 100, align: "center",formatter:orgFormatter},
                    {name: 'postName', index: 'postName', editable: true, width: 100, align: "center"},
                    {
                        name: 'personType',
                        index: 'personType',
                        editable: true,
                        width: 100,
                        align: "center"
                    },
                    {name: 'idCard', index: 'idCard', editable: true, width: 100, align: "center"},
                    {
                        name: 'birth',
                        index: 'birth',
                        editable: true,
                        width: 100,
                        align: "center",
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},
                        searchoptions: {
                            dataInit: function (el) {
                                $(el).datetimepicker({format: 'yyyy-mm-dd', autoclose: true, minView: "month"});
                            }
                        }
                    },{
                        name: 'entryTime',
                        index: 'entryTime',
                        editable: true,
                        width: 100,
                        align: "center",
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'},
                        searchoptions: {
                            dataInit: function (el) {
                                $(el).datetimepicker({format: 'yyyy-mm-dd', autoclose: true, minView: "month"});
                            }
                        }
                    },
                    {
                        name: 'entryOrgTime',
                        index: 'entryOrgTime',
                        editable: true,
                        width: 100,
                        align: "center",
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}
                    }
                ],
                width: $('.mytable1').width(),
                height: $('.mytable1').height(),
                autoWidth: true,
                sortname: 'name',//初始化的时候排序的字段
                sortorder: "asc",//排序方式,可选desc,asc
                multiselect: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                onSelectRow: function () {
                    var rowId = $('#personList').jqGrid("getGridParam", "selrow");
                    rowData = $('#personList').jqGrid('getRowData', rowId);
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
                        jqGridOrgSize.jqGrid().trigger("reloadGrid");
                    }
                }
            });
    }
    /**
     * 机构数据格式化
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {String}
     */
    function orgFormatter(cellvalue, options, rowObject) {
        return $.hrUtils.getHROrgNameById(rowObject.orgId);
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