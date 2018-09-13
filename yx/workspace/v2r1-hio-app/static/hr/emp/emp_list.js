/**
 * 人事信息列表js
 */
;
(function ($, window, document, undefined) {

    //定义全局参数
    var rowData;    //行数据
    var rowDataBefore;  //修改前的数据

    var isEdit = false;//操作标记
    // var selectedId;//被选中的行ID

    // var edit_orgId = '';//选中的节点id

    var jqGridSysInfoSet;

    var colNames = '';//动态列表头
    var colModel = '';//动态列列名

    var rootNode = '';//机构树根节点
    var nodes = '';//选择节点

    var retiredPersonFlag = false;//退休人员标识

    var querydate;//查询条件

    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });

    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var height = window.innerHeight;//$(window).height()
        $('.dictionary-tree').height(height - $('.tit-box').outerHeight() - $('.searchBox:visible').outerHeight() - 30);
    }

    //计算表格宽度
    function resizeGrid(toggleHeight) {
        if (!toggleHeight || toggleHeight > 0) { // 收缩
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 190);
        } else { // 展开
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 300);
        }
        $('#hrEmpSetList').jqGrid('destroyFrozenColumns');//避免重复加载冻结列样式
        $('#hrEmpSetList').jqGrid('setFrozenColumns');
        // 冻结列样式
        $.xljUtils.setFrozenColumnStyle(41);
    }

    //上来就执行
    $(function () {

        // document.onreadystatechange = loadComplete;//当页面加载状态改变的时候执行这个方法.
        //初始化人员列表
        initPersonList();


        //初始化显示设置
        initData1();

        //人员卡片
        $("#personCard").click(function () {
            var idsVal = $('#hrEmpSetList').jqGrid('getGridParam', 'selarrrow');
            console.info(idsVal);
            if (idsVal && idsVal != "") {
                window.open("emp_personCard.html?ids=" + idsVal);
            } else {
                $.xljUtils.tip("blue", "请选择人员数据！");
            }
        });

        //月报
        $('#monthlyReport').click(function () {
            storageDate();
            window.location.href = '../emp/emp_monthly_report.html?back=01';

        });

        //导入按钮
        $('#empImportBtn').click(function () {
            storageDate();
            window.location.href = '../emp/emp_import.html?back=01';

        });
        //导入更新按钮
        $('#empImportUpdateBtn').click(function () {
            storageDate();
            window.location.href = '../emp/emp_import_update.html?back=01';

        });
        //导出按钮
        $('#exportBtn').click(function () {
            $('#exportItem').modal('show');
            initData();
        });
        //全选
        $('#selectAll').click(function () {
            $('#items').find("input[type='checkbox']").prop("checked", "checked");
        });
        //全消
        $('#unSelectAll').click(function () {
            $('#items').find("input[type='checkbox']").prop("checked", "");
        });

        /**
         * 初始化导出的数据
         */
        function initData() {
            //加载列数据
            $.ajax({
                url: hostUrl + 'sys/sysInfoItem/queryListForItemSetPage',
                type: 'post',
                data: JSON.stringify({"setId": 'a3ef96bad9ea4318ba469a2ffbc8fef9', "status": true}),
                dataType: "json",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    var result = jQuery.isEmptyObject(data.result);
                    console.info(JSON.stringify(data));
                    if (!result) {
                        var count = 0;
                        var talbe = $("<table>", {
                            class: ".table .table-striped .table-bordered .table-hover .table-condensed",//加点样式
                        });
                        var tr = $("<tr>");
                        var td = $("<td>");
                        for (var i in data.result) {
                            if (count != 0 && count % 4 == 0) {//4列一行
                                // $("<br>").appendTo("#items");
                                talbe.append(tr);
                                tr = $("<tr>");//新行
                            }
                            if (data.result[i].name == '员工照片' || data.result[i].name == '密码' || data.result[i].name == 'id' || data.result[i].name == '入职审批号') {
                                continue;
                            } else {
                                $('<input />', {
                                    type: "checkbox",
                                    style: 'margin-left: 50px;margin-top: 30px;',
                                    val: data.result[i].id,//
                                    code: data.result[i].code.transform(),//转为驼峰命名
                                    name: data.result[i].name
                                }).appendTo(td);
                                // $('<span style="margin-left: 10px;margin-top: 30px;">' + data.result[i].name + '</span>').appendTo("#items");
                                $('<span style="margin-left: 10px;margin-top: 30px;">' + data.result[i].name + '</span>').appendTo(td);
                                td.appendTo(tr);
                                td = $("<td>");//创建新td
                            }
                            count++;
                        }
                        $('#items').empty();
                        talbe.appendTo("#items");
                    }
                },
                error: function () {
                    //alert("查询失败！");
					$.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            });
        }

        //显示设置页面
        $("#showUserGridSort").click(function () {
            $('#exportItem1').modal('show');
        });
        //全选
        $('#selectAll1').click(function () {
            $('#items1').find("input[type='checkbox']").prop("checked", "checked");
        });
        //全消
        $('#unSelectAll1').click(function () {
            $('#items1').find("input[type='checkbox']").prop("checked", "");
            //全消也要默认选中id,否则列表查询 详情查询会报错
            $('#items1').find("input[name='id']").prop("checked", "checked");
        });

        /**
         * 初始化显示设置的数据
         */
        function initData1() {
            //加载列数据
            $.ajax({
                url: hostUrl + 'sys/sysInfoItem/queryListForItemSetPage',
                type: 'post',
                data: JSON.stringify({"setId": 'a3ef96bad9ea4318ba469a2ffbc8fef9', "status": true}),
                dataType: "json",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    var result = jQuery.isEmptyObject(data.result);
                    // console.info(JSON.stringify(data));
                    //加载展示项
                    if (!result) {
                        var count = 0;
                        var talbe = $("<table>", {
                            class: ".table .table-striped .table-bordered .table-hover .table-condensed",//加点样式
                        });
                        var tr = $("<tr>");
                        var td = $("<td>");
                        $('#items1').empty();
                        for (var i in data.result) {
                            if (count != 0 && count % 4 == 0) {//4列一行
                                talbe.append(tr);
                                tr = $("<tr>");//新行
                            }
                            if (data.result[i].name == 'id') {
                                $('<input />', {
                                    type: "checkbox",
                                    style: 'margin-left: 90px;margin-top: 30px;display: none',
                                    checked: true,
                                    val: data.result[i].id,
                                    name: data.result[i].name
                                }).appendTo("#items1");
                                $('<span style="margin-left: 10px;margin-top: 30px;display: none">' + data.result[i].name + '</span>').appendTo("#items1");
                                continue;
                            } else if (data.result[i].name == '入职审批号') {
                                $('<input />', {
                                    type: "checkbox",
                                    style: 'margin-left: 90px;margin-top: 30px;display: none',
                                    checked: true,
                                    val: data.result[i].id,
                                    name: data.result[i].name
                                }).appendTo("#items1");
                                $('<span style="margin-left: 10px;margin-top: 30px;display: none">' + data.result[i].name + '</span>').appendTo("#items1");
                                continue;
                            }
                            if (data.result[i].name == '员工照片' || data.result[i].name == '密码') {
                                continue;
                            } else {
                                $('<input />', {
                                    type: "checkbox",
                                    style: 'margin-left: 50px;margin-top: 30px;',
                                    val: data.result[i].id,
                                    code: data.result[i].code,
                                    name: data.result[i].name
                                }).appendTo(td);
                                // $('<span style="margin-left: 10px;margin-top: 30px;">' + data.result[i].name + '</span>').appendTo("#items");
                                $('<span style="margin-left: 10px;margin-top: 30px;">' + data.result[i].name + '</span>').appendTo(td);
                                td.appendTo(tr);
                                td = $("<td>");//创建新td
                            }
                            count++;
                        }

                        talbe.appendTo("#items1");
                    }
                    //回显赋值
                    $.ajax({
                        url: hostUrl + 'sys/hrSysQuery/queryList',
                        type: 'post',
                        data: JSON.stringify({"code": 'emp_list'}),
                        dataType: "json",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        success: function (data) {
                            var seletedString = data.result[0].selectValue;
                            id = data.result[0].sid;//避开ios关键字
                            var rsult = jQuery.isEmptyObject(seletedString);
                            if (!result) {
                                var seletedItems = seletedString.split(",");
                                if (seletedItems != '') {
                                    for (var i in seletedItems) {
                                        // $('input:checkbox[value='+seletedItems[i]+']').attr('checked', 'true');
                                        $('#items1').find('input:checkbox[value=' + seletedItems[i] + ']').attr('checked', 'true');
                                    }
                                }
                            }
                        },
                        error: function () {
							//alert("查询失败！");
							$.xljUtils.tip("red", "服务异常,请联系管理员！");
                        }
                    });
                },
                error: function () {
                    //alert("查询失败！");
					$.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            });
        }

        //todo 导出动态列
        $("#exportData").click(function () {
            //触发高级查询的点击事件,获取最新的查询参数
            $('#searchFormBtn').trigger('click');

            // var param = {};//传递给后台参数
            var form = $("<form>");   //定义一个form表单
            form.attr('style', 'display:none');   //在form表单中添加查询参数
            form.attr('target', 'exportTarget');
            form.attr('method', 'post');
            form.attr('action', hostUrl + "/emp/empPersonInfo/exportData?" + window.parent.JZY.s.getAccessTokenByAuthorization());

            //迭代参数，赋值到隐藏域中
            $.each(querydate, function (k, v) {
                var param = $('<input>');
                param.attr('type', 'hidden');
                param.attr('name', k);
                param.attr('value', v);
                if (k == 'advancedQueryCondition') {//高级查询拼接的查询对象
                    param.attr('value', JSON.stringify(v));//转为字符串
                }
                form.append(param);
            });

            var sortname = $("#hrEmpSetList").jqGrid().getGridParam("sortname");//排序字段
            var sortorder = $("#hrEmpSetList").jqGrid().getGridParam("sortorder");//升降序

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

            var ids = "";
            var names = "";
            var codes = "";
            //获取勾选的需要导出的列
            // $("input[type='checkbox']:checked").each(function () {
            $('#items').find("input[type='checkbox']:checked").each(function () {
                if (ids.length > 0) {
                    ids += ',';
                }
                ids += $(this).val();
                if (names.length > 0) {
                    names += ",";
                }
                names += $(this).attr("name");
                if (codes.length > 0) {
                    codes += ",";
                }
                codes += $(this).attr("code");
            });

            if (names != undefined && names != '') { //传递导出列表表头
                var colModelParam = $('<input>');
                colModelParam.attr('type', 'hidden');
                colModelParam.attr('name', "colModel");
                colModelParam.attr('value', names);
                var colNamesParam = $('<input>');
                colNamesParam.attr('type', 'hidden');
                colNamesParam.attr('name', "colNames");
                colNamesParam.attr('value', codes);
                form.append(colModelParam);
                form.append(colNamesParam);
            }

            $('body').append(form);  //将表单放置在web中
            console.info("表单信息");
            console.info(form.serializeArray());
            form.submit();   //表单提交

            $('#exportItem').modal('hide');//隐藏
        });

        //导出列表数据
        $("#exportInfo").click(function () {
            //表格数据
            var rowData = $('#hrEmpSetList').jqGrid('getRowData');

            if (undefined == rowData) {
                pop_tip_open("", "没有数据!");
                return;
            }
            for (var i = 0; i < rowData.length; i++) {
                delete rowData[i].approve_person_id;
            }
            // console.log("colModel = " + colModel);
            // console.log("colNames = " + colNames);
            var urlBody = "/emp/empPersonInfo/exportHrEmpSetList";
            var urlAll = hostUrl + urlBody;
            $.ajax({
                type: 'POST',
                url: urlAll,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({"rowData": rowData, "colModel": colModel, "colNames": colNames}),
                async: false,
                success: function (json) {
                    if (json.success == true) {
                        var path = json.result;
                        if (undefined != path && "" != path) {
                            var form = $("<form>");   //定义一个form表单
                            form.attr('style', 'display:none');   //在form表单中添加查询参数
                            form.attr('target', 'exportTarget');
                            form.attr('method', 'post');
                            form.attr('action', hostUrl + "/emp/empPersonInfo/exportHrEmpSetListClient");
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
            });
        });
        //保存显示项
        $("#saveBtn").click(function () {
            var ids = "";
            var names = "";
            $('#items1').find("input[type='checkbox']:checked").each(function () {
                ids += "," + $(this).val();
                names += "," + $(this).attr("name");
            });
            if (ids != "") {
                ids = ids.substr(1, ids.length);
                names = names.substr(1, names.length);
            }
            var hrSysQueryDto = {};
            hrSysQueryDto.selectValue = ids;//指标项ID
            hrSysQueryDto.id = id;
            hrSysQueryDto.selectName = names;//指标项的名称
            //更新选择列表
            $.ajax({
                url: hostUrl + 'sys/hrSysQuery/update/' + id,
                type: 'PUT',
                data: JSON.stringify(hrSysQueryDto),
                dataType: "json",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success: function (data) {
                    $('#exportItem1').modal('hide');
                    //重载列表展示项
                    initPersonList(true);
                },
                error: function () {
                    //alert("查询失败！");
					$.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            });
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


        //查询用户功能权限
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
                                $("#addBtn").show();//机构  新增 按钮
                                $("#editBtn").show();//机构  修改 按钮
                                $("#copyBtn").show();//机构  复制 按钮
                                $("#pasteBtn").show();//机构  粘贴 按钮
                                $("#revokeBtn").show();//机构  撤销 按钮
                                $("#startBtn").show();//机构  启动 按钮
                                $("#deleteBtn").show();//机构  删除 按钮

                                $("#empAddBtn").show();//人事  新增 按钮
                                $("#empImportBtn").show();//人事  导入 按钮
                                $("#empImportUpdateBtn").show();//人事  导入 按钮
                                $("#exportBtn").show();//人事  导出 按钮
                                $("#delBtn").show();//人事  删除 按钮
                                $("#typeBtn").show();//人事  删除 按钮

                                $("#saveBtn").show();//如果有编辑权限则显示保存按钮

                            }
                            if (key == "code" && value[key] == "4") {//归档、新建权限
                                $("#empMonthlyFile").show();//人事  归档 按钮
                            }
                        }
                    });
                }
            },
            error: function () {
            }
        });


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
                    // var winObjEI = window.open("../emp/emp_personinfo.html?id=" + rowData.id + "&approvalNum=" + rowData.approvalNum);
                    window.location.href = "../emp/emp_personinfo.html?id=" + rowData.id + "&approvalNum=" + rowData.approvalNum;
                    isEdit = true;
                    var focusId = rowData.id;
                    var isClose1 = 1;
                    //关闭open页面时刷新父页面列表
                    var loop = setInterval(function () {
                        if (winObjEI.closed && isClose1 == 1) {
                            clearInterval(loop);
                            isClose1--;
                            // var queryData = {};
                            // queryData.gridComplete = function (){
                            //     if(focusId != null && focusId != ""){
                            //         $("#hrEmpSetList").setSelection(focusId);
                            //     }else if (focusId == null || focusId == ""){
                            //         $("#hrEmpSetList tr").last().find(":input[role='checkbox']").trigger("click");
                            //     }
                            //     focusId="";
                            // }
                            //$('#hrEmpSetList').jqGrid("setGridParam",queryData).trigger("reloadGrid");
                            $('#hrEmpSetList').jqGrid().trigger("reloadGrid");
                        }
                    }, 1000);
                }
            } else {
                $.xljUtils.tip("blue", "请选择要修改的数据！");
            }
        });

        //批量删除员工信息
        $("#delBtn").click(function () {
            delOption();
        });
        //人员类别
        $("#typeBtn").click(function () {
            window.location.href = "../sys/sys_serial_number_list.html";
        });
        //测试图片
        $("#testPhoto").click(function () {
            testPhoto();
        });
        //转正
        $("#regularBtn").click(function () {
            storageDate();
            var idsVal = $('#hrEmpSetList').jqGrid('getGridParam', 'selarrrow');
            if (idsVal == "" || idsVal == null) {
                window.location.href = '../emp/emp_regular.html?oper=add&back=01';
            } else {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    window.location.href = '../emp/emp_regular.html?oper=add&back=01&pId=' + idsVal;
                }
            }
        });
        //调动
        $("#personChangeBtn").click(function () {
            storageDate();
            var idsVal = $('#hrEmpSetList').jqGrid('getGridParam', 'selarrrow');
            if (idsVal == "" || idsVal == null) {
                window.location.href = '../emp/emp_personChange.html?oper=add&back=01';
            } else {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    window.location.href = '../emp/emp_personChange.html?oper=add&back=01&pId=' + idsVal;
                }
            }
        });
        //离职
        $("#leaveBtn").click(function () {
            storageDate();
            var idsVal = $('#hrEmpSetList').jqGrid('getGridParam', 'selarrrow');
            if (idsVal == "" || idsVal == null) {
                window.location.href = '../emp/emp_leavework.html?oper=add&back=01';
            } else {
                if (idsVal.length > 1) {
                    $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                    return;
                } else {
                    window.location.href = '../emp/emp_leavework.html?oper=add&back=01&pId=' + idsVal;
                }
            }
        });

        //回车事件--keydown，keypress，keyup，分别是按下，按着没上抬，上抬键盘 。
        $(document).keyup(function (event) {
            if (event.keyCode == 13) {
                $('#searchFormBtn').click();//触发高级查询的按钮
            }
        });
        //初始化高度
        // resizeHeight();
        // resizeGrid();
    });

    /**
     *初始化人员信息列表
     * @param flag  true?重置了标头
     */
    function initPersonList(flag) {
        if (flag) {
            colNames = '';//重置动态列表头
            colModel = '';//重置动态列列名
            $('#customtable').empty();
            $("#customtable").append('<table id="hrEmpSetList" constraint-layout="true"></table>');
            $("#customtable").append('<div id="pager2"></div>');
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
                                if (value != 'id' && value != 'approval_num') {
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
                                if (value != 'id' && value != '入职审批号') {
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
                // console.info(arr);
                for (var key in  arr) {
                    if (arr[key].name == "seniorit") {
                        arr[key].formatter = senioritFormatter;
                        break;
                    }
                }
                for (var key in  arr) {
                    if (arr[key].name == "workStatus") {
                        arr[key].formatter = workStatusFormatter;
                        break;
                    }
                }
                //创建jqGrid组件
                // colNames: ['id', '姓名', '人员编号', '所属机构', '岗位', '人员类别', '证件号码', '入职日期', '进入本公司日期'],
                var height = window.innerHeight;
                var initHeight = height - $('.query-condition').outerHeight() - $('#userList').outerHeight() - 80;
                jqGridSysInfoSet = jQuery("#hrEmpSetList").jqGrid(
                    {
                        url: hostUrl + 'emp/empPersonInfo/page',
                        datatype: "JSON",
                        mtype: "post",
                        async: false,
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
                        postData: {retiredPersonFlag: false},
                        //width: $(".tableStyle").width()-20,
                        //height: $(window).height() - 230,
                        height: initHeight,
                        rowNum: 20,
                        pager: "#pager2",
                        rowList: [20, 50, 100, 200],
                        viewrecords: true,
                        jsonReader: {
                            repeatitems: false,
                            // id: "sid"
                        },
                        onSelectRow: function () {
                            var rowId = $('#hrEmpSetList').jqGrid("getGridParam", "selrow");
                            rowData = $('#hrEmpSetList').jqGrid('getRowData', rowId);
                        },
                        ondblClickRow: function (rowid) {
                            //跳转编辑页
                            rowData = $('#hrEmpSetList').jqGrid('getRowData', rowid);
                            // var winObjEI = window.open("../emp/emp_personinfo.html?id=" + rowData.id + "&approvalNum=" + rowData.approvalNum);
                            window.location.href = "../emp/emp_personinfo.html?id=" + rowData.id + "&approvalNum=" + rowData.approvalNum;
                        },

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
                            // 冻结列样式
                            $.xljUtils.setFrozenColumnStyle(41);

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

                            }
                        },
                        gridComplete: function () {
                            // var ids = $("#hrEmpSetList").getDataIDs();
                            // for (var i = 0; i < ids.length; i++) {
                            //     var rowData = $("#hrEmpSetList").getRowData(ids[i]);
                            //     if (rowData.status != "在职") {//如果机构状态为注销状态，则背景色置于灰色
                            //         $('#' + ids[i]).find("td").addClass("SelectBG");
                            //     }
                            // }
                            $.xljUtils.addGridScroll();
                            $.xljUtils.gridResizeFn();

                            resizeHeight();
                            //resizeGrid();
                            //避免重复加载冻结列样式
                            $('#hrEmpSetList').jqGrid('destroyFrozenColumns');
                            //冻结列
                            jQuery("#hrEmpSetList").jqGrid('setFrozenColumns');
                            // loadComplete();
                        }
                    });


            },
            error: function () {
				//alert("查询失败！");
				$.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
        // grid加载完成后初始化高级查询控件
        $('div.query-div').hrQueryCondition({
            queryHandler: function (rdata) {
                //高级查询返回的查询条件
                // console.log(rdata);
                // console.log(JSON.stringify(rdata));
                //通过条件查询人员信息
                queryEmpListByCondition(rdata);
            },
            selectNodeType: $.hrQry.selectNodeType.companyOrDept,
            seniorSeparator: '~', // 双日式等分割符,如果不赋值则默认为' ~ '
            seniorContainer: '#hrEmpSetList',
            toggleSeniorCallback: function (toggleHeight) {
                resizeGrid(toggleHeight);
            },
            loadCompleteCallback: function () {
                // TODO 加载完后回调
                // console.log(111, "loadCompleteCallback");
                loadComplete();
            }
        });

    }

    window.senioritFormatter = function (cellvalue, options, rowObject) {
        if (!cellvalue) {
            if (rowObject.entryTime) {
                var UToTime = rowObject.entryTime.split(" ")[0];
                var aDate = UToTime.split("-");
                var NewDate = new Date(aDate[0], aDate[1] - 1, aDate[2]);
                var myDate = new Date();
                var dif = myDate.getTime() - NewDate.getTime();
                myDate.setTime(dif);
                cellvalue = myDate.getFullYear() - 1970;//计算司龄
            } else {
                cellvalue = 0;
            }
        }
        return cellvalue;
    };

    window.workStatusFormatter = function (cellvalue, options, rowObject) {
        if (cellvalue) {
            if (cellvalue == '0') {
                cellvalue = "未确认";
            } else if (cellvalue == '1') {
                cellvalue = "在职";
            } else if (cellvalue == '2') {
                cellvalue = "离职";
            } else if (cellvalue == '3') {
                cellvalue = "未邀请";
            }
        }
        return cellvalue;
    };

    /**
     * 样式格式化:对字段标红
     * 只有离职的人显示红色
     */
    window.addCellAttr = function (rowId, val, rowObject, cm, rdata) {
        if (rowObject.workStatus == "2") {
            return "style='color:red'";
        }
    };
    /* jQuery("#hrEmpSetList").jqGrid('filterToolbar',{stringResult: false,searchOnEnter : true});*/

    /**
     * 人员入职跳转
     */
    window.addEmpPersonInfoTmp = function () {
        //存储高级查询参数
        storageDate();
        // window.location.href = "../emp/emp_entry.html?oper=add&back=01";
        window.location.href = "../emp/emp_personinfo.html";
    };

    function getPostNameList() {
        //动态生成select内容
        var str = ":;";
        $.ajax({
            type: "post",
            async: false,
            url: hostUrl + 'emp/empPersonInfo/getPostNameList',
            success: function (data) {
                if (data != null) {
                    var jsonobj = JSON.stringify(data);
                    var length = data.result.length;
                    for (var i = 0; i < length; i++) {
                        if (i != length - 1) {
                            str += data.result[i].personType + ":" + data.result[i].personType + ";";
                        } else {
                            str += data.result[i].personType + ":" + data.result[i].personType;// 这里是option里面的 value:label
                        }
                    }
                }
            }
        });
        return str;
    }

    /**
     * 删除人员,逻辑删除
     */
    function delOption() {
        var idsVal = $('#hrEmpSetList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal == "" || idsVal == null) {
            pop_tip_open("blue", "请选择人员");
        } else {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能删除单个人员！");
                return;
            } else {
                $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                    $.ajax({
                        // url: hostUrl + "emp/empPersonInfo/deletePseudoBatch/" + idsVal,
                        url: hostUrl + "emp/empPersonInfo/deletePseudo/" + idsVal,
                        type: 'DELETE',
                        dataType: 'JSON',
                        contentType: 'application/json',
                        data: JSON.stringify({}),
                        success: function (xhr, textStatus) {
                            // console.log(xhr);
                            if (xhr) {
                                if (xhr.success) {
                                    $.xljUtils.tip("green", xhr.message);
                                    var focusId = $.hrUtils.focusNode(idsVal);//聚焦checked

                                    var queryData = {};
                                    if (focusId == null) {
                                        queryData.datatype = 'json';
                                        queryData.page = $('#hrEmpSetList').getGridParam('page') - 1;
                                        queryData.rowNum = $('#hrEmpSetList').getGridParam('rowNum');
                                    }
                                    queryData.gridComplete = function () {
                                        if (focusId != null && focusId != "") {
                                            $("#hrEmpSetList").setSelection(focusId);
                                        } else if (focusId == null || focusId == "") {
                                            $("#hrEmpSetList tr").last().find(":input[role='checkbox']").trigger("click");
                                        }
                                        focusId = "";
                                    }
                                    $('#hrEmpSetList').jqGrid("setGridParam", queryData).trigger("reloadGrid");
                                } else {
                                    if (xhr.code == "50000") {//请求返回的状态码？
                                        $.xljUtils.tip("red", xhr.message);
                                        return;
                                    }
                                    $.xljUtils.tip("red", xhr.message);
                                }
                            } else {
                                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                            }
                        },
                        error: function (xhr, textStatus, errorThrown) {
                            // console.log(xhr);
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                        }
                    });
                }, true);
                return;
            }
        }
        /*else {
         $.xljUtils.tip("blue", "请选择要删除的数据！");
         }*/
    }

    /**
     * 处理查询条件
     */
    window.dealCondition = function (rdata) {
        var queryCondition = {};
        //清空原有的查询条件
        var postData = $("#hrEmpSetList").jqGrid("getGridParam", "postData");
        $.each(postData, function (k, v) {
            delete postData[k];
        });

        queryCondition.personInfo = rdata.personInfo;//姓名、拼音、手机号
        // queryCondition.name=rdata.name;//姓名
        // queryCondition.pinyin=rdata.pinyin;//拼音
        // queryCondition.phone=rdata.phone;//电话号

        queryCondition.orgId = edit_orgId;//机构树的选中节点

        //参数传过来的机构 查询范围取并集 or
        if ($.hrUtils.filterNull(rdata.orgId) != '') {
            queryCondition.orgId1 = rdata.orgId;
        }
        queryCondition.orgName = rdata.orgName;//机构名称

        //将高级查询的条件放入queryCondition ？
        queryCondition.advancedQueryCondition = rdata;

        querydate = queryCondition;//记录上次的查询条件，供导出再查询使用
    };
    /**
     * 根据条件查询人员信息
     * @param rdata 查询参数对象 {"personInfo":"","orgId":"","orgName":"","maxEducation":"","maxDegree":"","personType":"","entryTime":"2018-01-06 ~ 2018-01-06"}
     */
    window.queryEmpListByCondition = function (rdata) {
        //处理查询参数
        dealCondition(rdata);

        //处理修改点击高级查询后 翻页的查询不好使的问题
        //处理翻页后再点击查询页数要回归1
        querydate.startNew = 0;
        var limitNew = $('#hrEmpSetList').getGridParam('rowNum');
        querydate.limitNew = parseInt(limitNew);
        //载入新的查询条件
        $("#hrEmpSetList").jqGrid('setGridParam', {datatype: 'json', postData: querydate}).trigger('reloadGrid');

        // delete querydate.startNew;
        // delete querydate.limitNew;
        // $("#hrEmpSetList").jqGrid('setGridParam', {datatype: 'json', postData: querydate});

        var postData = $("#hrEmpSetList").jqGrid("getGridParam", "postData");
        delete postData.startNew;
        delete postData.limitNew;
    };

    /**
     * 清空映射字段的值
     * @param id
     * @param hiddenId
     */
    window.emptyInfo = function (id, hiddenId) {
        $("#" + id).val("");
        $("#" + hiddenId).val("");
    };

    //设置细滚动条
    function setNiceScroll(str) {
        $(str).niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "26px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: true, // nicescroll可以管理水平滚动
            railpadding: {right: -12}, // 设置轨道的内间距
            background: "#fff"
        });
        $(str).getNiceScroll().show().resize();
    }

    //todo 修改人员信息后聚焦功能
    window.parentReloadById = function (callBackId) {
        $('#hrEmpSetList').jqGrid("setGridParam", {
            gridComplete: function () {
                if (callBackId != undefined && callBackId != "") {
                    $("#hrEmpSetList").setSelection(callBackId);
                }
            }
        }).trigger("reloadGrid");
    };

    /**
     * 修改人员状态
     * @param status 0禁用 1启用
     */
    window.updatestatus = function (status) {
        var id = jQuery("#hrEmpSetList").jqGrid('getGridParam', 'selarrrow');
        if (id == "" || id == null) {
            pop_tip_open("blue", "请选择人员");
        } else {
            if (id.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var updatedata = {
                    id: id[0],
                    status: status
                };
                if (status == 0) {
                    updatedata.disableTime = new Date().getTime();
                }
                var uBody = "emp/empPersonInfo/updateStatusById";
                var uAll = hostUrl + uBody;
                $.ajax({
                    type: 'POST',
                    url: uAll,
                    async: false,
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(updatedata),
                    success: function (json) {
                        if (json.success == true) {
                            pop_tip_open("green", json.message);
                            //刷新人事列表
                            var postData = jqGridSysInfoSet.jqGrid("getGridParam", "postData");
                            $("#hrEmpSetList").jqGrid('setGridParam', {
                                datatype: 'json',
                                postData: postData
                            }).trigger('reloadGrid');
                            /*var nodes = zTreeObj.getSelectedNodes();
                             userOnId = ids;
                             userQuery();*/
                        } else {
                            pop_tip_open("red", json.message);
                        }
                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        pop_tip_open("red", "修改用户状态请求失败");
                    }
                });
            }
        }
    };
    //人事月报归档
    $('#empMonthlyFile').click(function () {
        saveBackups();
    });

    /**
     * 归档备份
     */
    function saveBackups() {
        var uBody = "org/orgHistoryVersion/saveBackups";
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            url: uAll,
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("blue", xhr.message);
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("blue", "归档成功！");
                            return;
                        }
                        $.xljUtils.tip("red", "归档失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "查询版本信息失败");
            }
        })
    }

    /**
     * 本地仓库，记录查询条件
     */
    function storageDate() {
        var personInfo = $("#personInfo").val();
        var orgId = $("#orgId").val();
        var orgName = $("#orgName").val();

        window.sessionStorage.setItem("personInfo", personInfo);
        window.sessionStorage.setItem("orgId", orgId);
        window.sessionStorage.setItem("orgName", orgName);
    }

    /**
     * 回显查询条件
     */
    function storageShow() {
        var personInfo = window.sessionStorage.getItem("personInfo");
        var orgId = window.sessionStorage.getItem("orgId");
        var orgName = window.sessionStorage.getItem("orgName");

        $("#personInfo").val(personInfo);
        $("#orgId").val(orgId);
        $("#orgName").val(orgName);
    }

    function loadComplete() {
        //是否需要回显查询条件的标识
        //人事 新增、导入、月报、转正、调动、离职
        var status = $.xljUtils.getUrlParam("status");
        if (status == "01") {
            storageShow();
            //查询
            //$('#searchFormBtn').trigger('click');
        }
    }

    /**
     * 测试图片
     */
    function testPhoto() {
        var urlBody = "/emp/empPersonInfo/testPhoto";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({}),
            async: false,
            success: function (json) {
                if (json.status == '200') {
                    var photo = json.result;
                    //输出到页面上
                    document.write("<img src='data:image/jpg;base64,"+photo+"'/>");
                } else {
                    pop_tip_open("red", json.message);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "失败");
            }
        });
    }
})(jQuery, window, document);