/**
 * 人事月报js
 * lixd
 */
;
(function ($, window, document, undefined) {

    //定义全局参数
    var querydate;//查询条件
    var colNames = '';//动态列表头
    var colModel = '';//动态列列名

    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        //resizeHeight();
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
        //var w_h = $(window).height();
        //表示con-table 下的mytable
    }

    //计算表格宽度
    function resizeGrid(toggleHeight) {
        if (!toggleHeight || toggleHeight > 0) { // 收缩
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 190);
        } else { // 展开
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 240);
        }
        $('#empHistoryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#empHistoryList').jqGrid('setFrozenColumns');
        // 冻结列样式
        $.xljUtils.setFrozenColumnStyle(41);
    }


    //查询用户功能权限
    window.queryAuth = function () {
        $.ajax({
            type: 'POST',
            url: hostUrl + "auth/authData/queryAuthorizationBtnList",
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,//设置为同步
            data: JSON.stringify({"menuCode": "hr_org"}),
            success: function (json) {
                var list = json.result;
                if (list != null && list.length > 0) {
                    $.each(list, function (index, value) {
                        for (var key in value) {
                            if (key == "code" && value[key] == "2") {//编辑权限
                                $("#exportBtn").show();//导出
                            }
                        }
                    });
                }
            },
            error: function () {
            }
        });
    };

    //上来就执行
    $(function () {
        queryAuth();
        //查询版本
        queryVersions();
        //初始化指标集列表
        initSysInfoSetList();

        //初始化时间控件
        initDatetimepicker();

        //初始化高度
        // resizeHeight();

        //导出报表
        $("#exportBtn").click(function (e) {
            e.preventDefault();
            //触发高级查询的点击事件,获取最新的查询参数
            var jqGrid = $("#empHistoryList");

            var urlBody = "org/empPersonInfoHistory/exportMonthInfo?" + window.parent.JZY.s.getAccessTokenByAuthorization();
            var urlAll = hostUrl + urlBody;

            var form = $("<form>");   //定义一个form表单
            form.attr('style', 'display:none');   //在form表单中添加查询参数
            form.attr('target', 'exportTarget');
            form.attr('method', 'post');
            form.attr('action', urlAll);
            //添加后台导出参数
            var input1 = $('<input>');
            input1.attr('type', 'hidden');
            input1.attr('name', "colNames");
            input1.attr('value', colNames);
            //添加后台导出参数
            var input2 = $('<input>');
            input2.attr('type', 'hidden');
            input2.attr('name', "colModel");
            input2.attr('value', colModel);
            //添加后台导出参数
            var input3 = $('<input>');
            input3.attr('type', 'hidden');
            input3.attr('name', "version");
            input3.attr('value', $("#version").val());
            if (querydate) {
                $.each(querydate, function (index, content) {
                    if (index == "advancedQueryCondition") {
                        var advQue = $('<input>');
                        advQue.attr('type', 'hidden');
                        advQue.attr('name', "advancedQueryCondition");
                        advQue.attr('value', JSON.stringify(content));
                        form.append(advQue)
                        console.info("JSON.stringify(content)=======" + JSON.stringify(content));
                    } else {
                        var param = $('<input>');
                        param.attr('type', 'hidden');
                        param.attr('name', index);
                        param.attr('value', content);
                        form.append(param)
                    }
                });
            }

            $('body').append(form);  //将表单放置在web中
            form.append(input1);   //将查询参数控件提交到表单上
            form.append(input2);   //将查询参数控件提交到表单上
            form.append(input3);   //将查询参数控件提交到表单上
            form.submit();   //表单提交
            pop_tip_open("", "导出成功");
        });
        //返回人员列表
        $("#backEmpList").click(function () {
            var back = $.xljUtils.getUrlParam("back");
            if (back == "01") {//返回人员列表
                //status=01 载入查询条件
                window.location.href = "../org/org_list.html?status=01";
            } else {
                window.history.go(-1);
            }
        });
        // resizeGrid();

        //绑定回车事件
        $(document).keydown(function (event) {
            if (event.keyCode == 13) { //绑定回车
                $('#searchFormBtn').click();
            }
        });

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
     * 查询版本信息
     */
    window.queryVersions = function () {
        //年月
        var yearMonth = $('#yearMonth').val();
        var postData = {};
        if (yearMonth == null || yearMonth == '') {
            var date = new Date();
            var year = date.getFullYear().toString();
            var month = (date.getMonth() + 1).toString();
            if (month.length < 2) {
                month = '0' + month;
            }
            yearMonth = year + "-" + month;
            $('#yearMonth').val(yearMonth);
        }
        postData.yearMonth = yearMonth;
        //不为空，查询翻译
        $.ajax({
            url: hostUrl + "/org/orgHistoryVersion/getVersionInfoByYearMonth",
            type: 'post',
            contentType: 'application/json',
            dataType: 'JSON',
            data: JSON.stringify(postData),
            async: false,
            success: function (data) {
                if (data.success) {
                    var versionList = data.result;
                    var version = $('#version');//版本
                    version.empty();//清空
                    if (versionList != null && versionList.length > 0) {
                        for (var i = 0; i < versionList.length; i++) {
                            version.append("<option value='" + versionList[i] + "'>" + versionList[i].substr(6, 13) + "</option>");
                        }
                        //默认选中当月最后一个版本
                        version.val(versionList[versionList.length - 1]);
                    } else {
                        version.append("<option value=''>当月没有归档</option>");
                    }
                    $('#searchFormBtn').click();
                }
            }
        });
    };
    /**
     * 查询
     */
    window.queryInfo = function () {
        $('#searchFormBtn').click();
    };
    /**
     * 处理查询条件
     * @param rdata 高级查询传过来的参数
     */
    window.dealCondition = function (rdata) {
        var queryCondition = {};
        //清空原有的查询条件
        var postData = $("#empHistoryList").jqGrid("getGridParam", "postData");
        console.info("yuanshih ");
        console.info(postData);
        $.each(postData, function (k, v) {
            delete postData[k];
        });

        var version = $('#version').val();
        // if (version == null || version == '') {
        //     $.xljUtils.tip("blue", "没有版本信息！");
        //     return;
        // }
        // queryCondition=rdata;

        queryCondition.version = version;//版本

        //参数传过来的机构 查询范围取并集 or
        if ($.hrUtils.filterNull(rdata.orgId) != '') {
            queryCondition.orgId1 = rdata.orgId;
        }

        //将高级查询的条件放入queryCondition ？
        queryCondition.advancedQueryCondition = rdata;

        querydate = queryCondition;//记录上次的查询条件，供导出再查询使用
    };
    /**
     * 查询
     * @param   rdata   高级查询的查询参数
     */
    window.queryByConditon = function (rdata) {
        //处理查询参数
        dealCondition(rdata);
        //销毁冻结列
//        $('#empHistoryList').jqGrid('destroyFrozenColumns');

        $("#empHistoryList").jqGrid('setGridParam', {
            datatype: 'json',
            postData: querydate,
            page: 1
        }).trigger('reloadGrid');
    };


    window.exportMonthInfo = function () {

        var token = "75470d25-4f8a-44f9-afe1-a12d31c97e6e";

        //触发高级查询的点击事件,获取最新的查询参数
        // $('#searchFormBtn').trigger('click');
        querydate.colNames = colNames;
        querydate.colModel = colModel;
        var urlBody = "org/empPersonInfoHistory/exportMonthInfo";
        var urlAll = hostUrl + urlBody;

        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(querydate),
            async: false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {//指定下载
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action', hostUrl + "/emp/empPersonInfo/exportModelClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type', 'hidden');
                        input1.attr('name', "path");
                        input1.attr('value', path);
                    }
                }
            }
        });
    };


    /**
     * 初始化指标集列表
     */
    function initSysInfoSetList() {
        var version = $('#version').val();//版本
        if (version == '') {//版本为空
            version = '-1';
        }
        //将字符串转驼峰命名
        String.prototype.transform = function () {
            var re = /_(\w)/g;
            return this.replace(re, function () {
                var args = arguments;
                return args[1].toUpperCase();
            });
        };
        //查询展示列
        $.ajax({
            url: hostUrl + 'sys/sysInfoItem/getSelectList',
            type: 'post',
            data: JSON.stringify({"code": 'emp_list'}),
            dataType: "json",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (data) {
                var title = {};//各列的定义
                var arr = [];//列模型
                var flag = jQuery.isEmptyObject(data.result);
                var results = data.result;//List<SysInfoItemDto>
                if (!flag) {
                    for (var i in results) {
                        $.each(results[i], function (key, value) {//SysInfoItemDto
                            if (key == 'code') {//字段
                                title.name = value.transform();//todo 将字符串转驼峰命名
                                title.index = value.transform();
                                if (value != 'id' && value != 'approval_num'&& value != 'outlander'&& value != 'leave_time'&& value != 'enabled_state') {
                                    colNames += value.transform() + ',';
                                }
                                //不特殊列为高级查询字段
                                if (value == 'real_name' || value == 'org_id' || value == 'account' || value == 'mobile' || value == 'dept_id' || value == 'functions') {
                                    title.queryable = false;
                                } else {
                                    title.queryable = true;
                                }
                                //默认高级查询追加的四个查询条件
                                if (value == 'person_type' || value == 'max_education' || value == 'work_status' || value == 'entry_time') {
                                    title.querydefault = true;
                                } else {
                                    title.querydefault = false;
                                }
                                //下拉多选类的字段
                                if (value == 'enabled_state') {//状态
                                    title.querytype = 'list';
                                    var list = [{name: "启用", value: "1"}, {name: "禁用", value: "0"}];
                                    title.listoption = list;
                                }
                                //下拉多选类的字段
                                if (value == 'work_status') {//状态
                                    title.querytype = 'list';
                                    var list = [{name: "未确认", value: "0"}, {name: "在职", value: "1"}, {
                                        name: "离职",
                                        value: "2"
                                    }, {name: "未邀请", value: "3"}];
                                    title.listoption = list;
                                }
                                //冻结姓名和所在机构列
                                if (value == 'real_name' || value == 'org_id') {
                                    title.frozen = true;
                                }
                            }
                            if (key == 'name') {//名称
                                title.label = value;
                                if (value != 'id' && value != '入职审批号'&& value != '是否外籍'&& value != '离职时间'&& value != '状态') {
                                    colModel += value + ",";
                                }
                            }
                            if (key == "editType") {//编辑类型
                                if (value == 1) { //隐藏
                                    title.hidden = true;
                                    title.editable = false;
                                }
                                if (value == 2) { //不可编辑
                                    title.editable = false;
                                }
                                if (value == 3) {//可编辑
                                    title.editable = true;
                                }
                            }
                            if (key == 'type') {//数据类型
                                if (value == 5) {
                                    title.formatter = 'date';
                                    title.formatoptions = {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'};
                                    title.querytype = 'date';
                                }
                                else if (value == 1 || value == 2 || value == 8) {
                                    title.querytype = 'number';
                                } else if (value == 7) {//代码
                                    title.querytype = 'sysCode';
                                } else {
                                    //如果类型还未定义
                                    if (title.querytype == undefined) {
                                        title.querytype = 'text';
                                    }
                                }
                                // if(value==11){
                                //     if(results[i].code == 'org_id' || results[i].code == 'dept_id'){
                                //         title.formatter=$.hrUtils.getHROrgNameById;
                                //     }else if(results[i].code == 'post_id'){
                                //         title.formatter=$.hrUtils.getHRPostNameById;
                                //     }
                                // }
                            }
                            if (key == 'codeSetId') {//代码集
                                //动态赋值代码集，高级查询组织代码字典
                                title.querycodeset = value;
                            }
                        });
                        title.align = 'center';
                        title.cellattr = addCellAttr, arr.push(title);
                        title = {};
                    }

                    colModel = colModel.substring(0, colModel.length - 1);
                    colNames = colNames.substring(0, colNames.length - 1);
                }
                // console.info("graid列");
                //console.info(arr);

                //创建jqGrid组件
                // colNames: ['id', '姓名', '人员编号', '所属机构', '岗位', '人员类别', '证件号码', '入职日期', '进入本公司日期'],
                jqGridSysInfoSet = jQuery("#empHistoryList").jqGrid(
                    {
                        url: hostUrl + '/org/empPersonInfoHistory/page',//动态查询
                        datatype: "JSON",
                        mtype: "post",
                        ajaxGridOptions: {contentType: 'application/json'},
                        contentType: "application/json",
                        colModel: arr,//列模型
                        shrinkToFit: false,
                        autoScroll: true,
                        autowidth: true,
                        sortname: 'defaultSort',//初始化的时候排序的字段
                        sortorder: "asc",//排序方式,可选desc,asc
                        sortable: false,
                        multiselect: true,
                        multiboxonly: true,
                        rownumbers: true,
                        postData: {"version": version},
                        //width: $(".tableStyle").width()-20,
                        height: $(window).height() - 190,
                        rowNum: 20,
                        pager: "#pager2",
                        rowList: [20, 50, 100, 200],
                        viewrecords: true,
                        jsonReader: {
                            repeatitems: false
                        },
                        onSelectRow: function () {
                        },
                        ondblClickRow: function (rowid) {
                        },
//                        beforeRequest:function(){
//                            $('#empHistoryList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
//                        },
                        loadError: function (xhr, status, error) {
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
                            $.xljUtils.setFrozenColumnStyle(41);

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

                            }
                        },
                        gridComplete: function () {
                            $.xljUtils.addGridScroll();
                            $.xljUtils.gridResizeFn();

                            //resizeHeight();
                            //resizeGrid();
                            //避免重复加载冻结列样式
                            jQuery("#empHistoryList").jqGrid('destroyFrozenColumns');
                            //冻结列
                            jQuery("#empHistoryList").jqGrid('setFrozenColumns');
                        }
                    });


            },
            error: function () {
                alert("查询失败！");
            }
        });
        $('div.query-div').hrQueryCondition({
            queryHandler: function (rdata) {
                queryByConditon(rdata);
            },
            selectNodeType: $.hrQry.selectNodeType.companyOrDept,
            seniorSeparator: '~', // 双日式等分割符,如果不赋值则默认为' ~ '
            seniorContainer: '#empHistoryList', // 对应的jqGrid的ID
            toggleSeniorCallback: function (toggleHeight) {
                resizeGrid(toggleHeight);
            }
        });
    }

    /**
     * 样式格式化:对字段标红
     * 只有离职的人显示红色
     */
    window.addCellAttr = function (rowId, val, rowObject, cm, rdata) {
        if (rowObject.workStatus == "2") {
            return "style='color:red'";
        }
    };

})(jQuery, window, document);