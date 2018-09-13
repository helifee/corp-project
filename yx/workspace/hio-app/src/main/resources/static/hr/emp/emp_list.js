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
    /**
     * 原
     * 人员列表树的点击事件
     */
    // window.treeClick = function () {
    //     nodes = zTreeObj.getSelectedNodes();
    //     if (nodes.length < 1) {
    //         pop_tip_open("blue", "请先选择组织机构");
    //     } else {
    //         queryEmpListByCondition();
    //         // var allNodes = zTreeObj.getNodes();
    //         // rootNode = allNodes[0];
    //         // if(rootNode.id == nodes[0].id) {
    //         //     //clearCondition();//todo 清空查询条件
    //         //     edit_orgId = nodes[0].id;
    //         //     var retiredPersonFlag = $('#retiredPersonFlag').prop('checked');
    //         //     var postData = jqGridSysInfoSet.jqGrid("getGridParam", "postData");
    //         //     $.each(postData, function (k, v) {
    //         //         delete postData[k];
    //         //     });
    //         //     jqGridSysInfoSet.jqGrid("setGridParam", {postData:{"startNew":0,"limitNew":20,"retiredPersonFlag":retiredPersonFlag}}).trigger("reloadGrid");
    //         //     var postData = jqGridSysInfoSet.jqGrid("getGridParam", "postData");
    //         //     $.each(postData, function (k, v) {
    //         //         delete postData[k];
    //         //     });
    //         //     $("#hrEmpSetList").jqGrid("setGridParam", {postData:{"retiredPersonFlag":retiredPersonFlag}});
    //         // }else{
    //         //     //clearCondition();//todo 清空查询条件
    //         //     edit_orgId = nodes[0].id;
    //         //     var retiredPersonFlag = $('#retiredPersonFlag').prop('checked');
    //         //     var postData = jqGridSysInfoSet.jqGrid("getGridParam", "postData");
    //         //     $.each(postData, function (k, v) {
    //         //         delete postData[k];
    //         //     });
    //         //     jqGridSysInfoSet.jqGrid("setGridParam", {postData:{"orgId": edit_orgId,"startNew":0,"limitNew":20,"retiredPersonFlag":retiredPersonFlag}}).trigger("reloadGrid");
    //         //     var postData = jqGridSysInfoSet.jqGrid("getGridParam", "postData");
    //         //     $.each(postData, function (k, v) {
    //         //         delete postData[k];
    //         //     });
    //         //     $("#hrEmpSetList").jqGrid("setGridParam", {postData:{"orgId": edit_orgId,"retiredPersonFlag":retiredPersonFlag}});
    //         // }
    //     }
    // }

    //todo 清空查询条件
    function clearCondition() {
        $("input[type=reset]").trigger("click");
        $("#userQueryKey").val('');
    }

    //是否包含离退休人员
    $(".my-checkbox").on("click", function (e) {
        //切换样式
        $(this).toggleClass("checkd");
        e.stopPropagation();
        if ($('.my-checkbox').attr('class').indexOf('checkd') > 0) {
            retiredPersonFlag = true;
        } else {
            retiredPersonFlag = false;
        }
        queryEmpListByCondition();
    });

    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
        //$(".nicescroll-rails").offset();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 99) + "px");
        //右侧table
        $(".mytable").height((w_h - 110) + "px");
        // $(".gbox_hrEmpSetList").height((w_h - 250) + "px");
        // $("#calendar").height((w_h)+"px");
    }

    //计算表格宽度
    function resizeGrid() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 70);
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        //ui-jqgrid ui-widget ui-widget-content ui-corner-all
        $(".ui-jqgrid.ui-widget.ui-widget-content.ui-corner-all").width($('.mytable').width() - 4);
        $(".ui-jqgrid-view").width($('.mytable').width() - 4);
        $(".ui-state-default .ui-jqgrid-hdiv").width($('.mytable').width() - 4);
        $(".ui-jqgrid-bdiv").width($('.mytable').width() - 4);
        $.xljUtils.gridResizeFn();
    }

    //上来就执行
    $(function () {
        //初始化高度
        resizeHeight();

        //初始化组织机构树 全部
        // getOrgTree();

        //初始化人员列表
        initPersonList();

        //处理日期选择
        resizeGrid();
        // $.xljUtils.resizeNestedGrid();

        //显示设置页面
        $("#showUserGridSort").click(function () {
            var winObjEI = window.open("../emp/emp_setItemList.html");
            var isClose = 1;
            //关闭open页面时刷新父页面列表
            var loop = setInterval(function () {
                if (winObjEI.closed && isClose == 1) {
                    isClose--;
                    //$("#hrEmpSetList").jqGrid().trigger('reloadGrid');
                    initPersonList(true);
                }
            }, 1000);
        });

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

        //todo 导出动态列
        $("#exportData").click(function () {
            var param = {};//传递给后台参数
            //条件
            var queryKey = $("#userQueryKey").val();//查询条件
            var form = $("<form>");   //定义一个form表单
            form.attr('style', 'display:none');   //在form表单中添加查询参数
            form.attr('target', 'exportTarget');
            form.attr('method', 'post');
            form.attr('action', serviceUrl + "/emp/empPersonInfo/exportData");

            var minWorkAge = $('#minWorkAge').val();//工龄下限
            var maxWorkAge = $('#maxWorkAge').val();//工龄上限
            var minSeniorit = $("#minSeniorit").val();//司龄下限
            var maxSeniorit = $("#maxSeniorit").val();//司龄上限
            if (minWorkAge != '') {
                if (!$.isNumeric(minWorkAge)) {
                    $.xljUtils.tip("red", "工龄必须是数字！");
                    return;
                } else {
                    var minWorkAgeCon = $('<input>');
                    minWorkAgeCon.attr('type', 'hidden');
                    minWorkAgeCon.attr('name', "minWorkAge");
                    minWorkAgeCon.attr('value', minWorkAge);
                    form.append(minWorkAgeCon);
                }
            }
            if (maxWorkAge != '') {
                if (!$.isNumeric(maxWorkAge)) {
                    $.xljUtils.tip("red", "工龄必须是数字！");
                    return;
                } else {
                    var maxWorkAgeCon = $('<input>');
                    maxWorkAgeCon.attr('type', 'hidden');
                    maxWorkAgeCon.attr('name', "maxWorkAge");
                    maxWorkAgeCon.attr('value', maxWorkAge);
                    form.append(maxWorkAgeCon);
                }
            }
            if (minSeniorit != '') {
                if (!$.isNumeric(minSeniorit)) {
                    $.xljUtils.tip("red", "司龄必须是数字！");
                    return;
                } else {
                    var minSenioritCon = $('<input>');
                    minSenioritCon.attr('type', 'hidden');
                    minSenioritCon.attr('name', "minSeniorit");
                    minSenioritCon.attr('value', minSeniorit);
                    form.append(minSenioritCon);
                }
            }
            if (maxSeniorit != '') {
                if (!$.isNumeric(maxSeniorit)) {
                    $.xljUtils.tip("red", "司龄必须是数字！");
                    return;
                } else {
                    var maxWorkAgeCon = $('<input>');
                    maxWorkAgeCon.attr('type', 'hidden');
                    maxWorkAgeCon.attr('name', "maxSeniorit");
                    maxWorkAgeCon.attr('value', maxSeniorit);
                    form.append(maxWorkAgeCon);
                }
            }
            if (parseInt(minWorkAge) > parseInt(maxWorkAge)) {
                $.xljUtils.tip("red", "工龄下限必须小于工龄上限！");
                return;
            }
            if (parseInt(minSeniorit) > parseInt(maxSeniorit)) {
                $.xljUtils.tip("red", "司龄下限必须小于司龄上限！");
                return;
            }

            var sexCon = $("#sex").val();//性别
            if (sexCon != '') {
                var sex = $('<input>');
                sex.attr('type', 'hidden');
                sex.attr('name', "sexCon");
                sex.attr('value', sexCon);
                form.append(sex);
            }
            var personTypeCon = $("#personType").val();//人员类别
            if (personTypeCon != '') {
                var personType = $('<input>');
                personType.attr('type', 'hidden');
                personType.attr('name', "personTypeCon");
                personType.attr('value', personTypeCon);
                form.append(personType);
            }
            var headshipRankCon = $("#headshipRank").val();//职级
            if (headshipRankCon != '') {
                var headshipRank = $('<input>');
                headshipRank.attr('type', 'hidden');
                headshipRank.attr('name', "headshipRankCon");
                headshipRank.attr('value', headshipRankCon);
                form.append(headshipRank);
            }
            var educationCon = $("#education").val();//学历
            if (educationCon != '') {
                var education = $('<input>');
                education.attr('type', 'hidden');
                education.attr('name', "educationCon");
                education.attr('value', educationCon);
                form.append(education);
            }
            var degreeCon = $("#degree").val();//学位
            if (degreeCon != '') {
                var degree = $('<input>');
                degree.attr('type', 'hidden');
                degree.attr('name', "degreeCon");
                degree.attr('value', degreeCon);
                form.append(degree);
            }
            var recruitCannel = $("#recruitCannel").val();//招聘渠道
            if (recruitCannel != '') {
                var recruitCannelCon = $('<input>');
                recruitCannelCon.attr('type', 'hidden');
                recruitCannelCon.attr('name', "recruitCannel");
                recruitCannelCon.attr('value', recruitCannel);
                form.append(recruitCannelCon);
            }


            var sortname = $("#hrEmpSetList").jqGrid().getGridParam("sortname");//排序字段
            var sortorder = $("#hrEmpSetList").jqGrid().getGridParam("sortorder");//升降序
            //var retiredPersonFlag = $('#retiredPersonFlag').prop('checked');//是否含有离退休人员

            var allNodes = zTreeObj.getNodes();
            rootNode = allNodes[0];
            if (edit_orgId !== '' && rootNode.id !== nodes[0].id) {
                var orgParam = $('<input>');
                orgParam.attr('type', 'hidden');
                orgParam.attr('name', "orgId");
                orgParam.attr('value', edit_orgId);
                form.append(orgParam);
            }

            if (queryKey != undefined && queryKey != '') {//条件查询
                var nameParam = $('<input>');
                nameParam.attr('type', 'hidden');
                nameParam.attr('name', "name");
                nameParam.attr('value', queryKey);
                form.append(nameParam);
                var personCodeParam = $('<input>');
                personCodeParam.attr('type', 'hidden');
                personCodeParam.attr('name', "personCode");
                personCodeParam.attr('value', queryKey);
                form.append(personCodeParam);
            }
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
            if (colModel != undefined && colModel != '') { //传递导出列表表头
                var colModelParam = $('<input>');
                colModelParam.attr('type', 'hidden');
                colModelParam.attr('name', "colModel");
                colModelParam.attr('value', colModel);
                var colNamesParam = $('<input>');
                colNamesParam.attr('type', 'hidden');
                colNamesParam.attr('name', "colNames");
                colNamesParam.attr('value', colNames);
                form.append(colModelParam);
                form.append(colNamesParam);
            }

            //是否含有离职
            var retiredPersonFlagParam = $('<input>');
            retiredPersonFlagParam.attr('type', 'hidden');
            retiredPersonFlagParam.attr('name', "retiredPersonFlag");
            if (retiredPersonFlag) {
                retiredPersonFlagParam.attr('value', "true");
            } else {
                retiredPersonFlagParam.attr('value', "false");
            }
            form.append(retiredPersonFlagParam);


            $('body').append(form);  //将表单放置在web中
            console.info("表单信息");
            console.info(form.serializeArray());
            form.submit();   //表单提交
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
            console.log("colModel = " + colModel);
            console.log("colNames = " + colNames);
            var urlBody = "/emp/empPersonInfo/exportHrEmpSetList";
            var urlAll = serviceUrl + urlBody;
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
                            form.attr('action', serviceUrl + "/emp/empPersonInfo/exportHrEmpSetListClient");
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

        //todo 控制查询条件显隐
        var flag = true;
        var jqgridHeight = 0;
        //处理展开收起
        $("#upDownBtn").click(function () {
            $(".showOrHide").toggle();
            var s_btn = $('.btn-adv > i');
            if (flag == true) {//隐藏
                $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 140);
                $("#customtable").height(function (n, c) {
                    return c - 78;
                });
                s_btn.removeClass('fa-angle-up').addClass('fa-angle-down');
                flag = false;
            } else {//展开
                $("#customtable").height(function (n, c) {
                    return c + 78;
                });
                $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($(window).height() - 164);
                s_btn.removeClass('fa-angle-down').addClass('fa-angle-up');
                flag = true;
            }
            $(".ui-jqgrid-bdiv table").jqGrid().setGridParam('autowidth', false);
            $.xljUtils.addGridScroll();
            $.xljUtils.gridResizeFn();
        });

        //todo 查询权限
        $.ajax({
            type: 'POST',
            url: serviceUrl + "sys/sysUserInfo/queryAuthorizationBtnList",
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,//设置为同步
            data: JSON.stringify({"menuCode": "rsxx"}),
            success: function (json) {
                var list = json.result;
                $.each(list, function (index, value) {
                    for (var key in value) {
                        if (key == "code" && value[key] == "ru_li_zhuan_diao_jin_Btn") {   //入离转调晋控制权限
                            console.log(value[key]);
                            $("#ru_li_zhuan_diao_jin_Btn").show();
                        }
                    }
                });
            },
            error: function () {
                //alert("error");
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
                    var winObjEI = window.open("../emp/emp_personinfo.html?id=" + rowData.id + "&approvalNum=" + rowData.approvalNum);
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

        //查询
        $("#queryBtnOne").click(function () {
            queryEmpListByCondition();
        });
        $("#queryBtnTwo").click(function () {
            queryEmpListByCondition();
        });

        //回车事件--keydown，keypress，keyup，分别是按下，按着没上抬，上抬键盘 。
        $(document).keyup(function (event) {
            if (event.keyCode == 13) {
                queryEmpListByCondition();
            }
        });
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
            url: serviceUrl + 'sys/sysInfoItem/getSelectList',
            type: 'post',
            data: JSON.stringify({"code": 'emp_list'}),
            dataType: "json",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function (data) {
                var title = {};
                var arr = [];
                var flag = jQuery.isEmptyObject(data.result);
                var results = data.result;
                if (!flag) {
                    for (var i in results) {
                        $.each(results[i], function (key, value) {
                            if (key == 'code') {
                                title.name = value.transform();//todo 将字符串转驼峰命名
                                title.index = value.transform();
                                if (value != 'id' && value != 'approval_num') {
                                    colNames += value.transform() + ',';
                                }

                            }
                            if (key == 'name') {
                                title.label = value;
                                if (value != 'id' && value != '入职审批号') {
                                    colModel += value + ",";
                                }
                            }
                            if (key == "editType") {
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
                            if (key == 'type') {//todo 字典翻译
                                if (value == 5) {
                                    title.formatter = 'date';
                                    title.formatoptions = {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'};
                                }
                                // if(value==11){
                                //     if(results[i].code == 'org_id' || results[i].code == 'dept_id'){
                                //         title.formatter=$.hrUtils.getHROrgNameById;
                                //     }else if(results[i].code == 'post_id'){
                                //         title.formatter=$.hrUtils.getHRPostNameById;
                                //     }
                                // }
                            }
                        });
                        title.align = 'center';
                        title.cellattr = addCellAttr,
                            arr.push(title);
                        title = {};
                    }

                    colModel = colModel.substring(0, colModel.length - 1);
                    colNames = colNames.substring(0, colNames.length - 1);
                }
                console.info("graid列");
                console.info(arr);


                //创建jqGrid组件
                // colNames: ['id', '姓名', '人员编号', '所属机构', '岗位', '人员类别', '证件号码', '入职日期', '进入本公司日期'],
                jqGridSysInfoSet = jQuery("#hrEmpSetList").jqGrid(
                    {
                        url: serviceUrl + 'emp/empPersonInfo/page',
                        datatype: "JSON",
                        mtype: "post",
                        ajaxGridOptions: {contentType: 'application/json'},
                        contentType: "application/json",
                        colModel: arr,//列模型
                        shrinkToFit: false,
                        autoScroll: false,
                        autowidth: true,
                        sortname: 'defaultSort',//初始化的时候排序的字段
                        sortorder: "asc",//排序方式,可选desc,asc
                        multiselect: true,
                        multiboxonly: true,
                        rownumbers: true,
                        postData: {retiredPersonFlag: false},
                        //width: $(".tableStyle").width()-20,
                        height: $(window).height() - 164,
                        rowNum: 20,
                        pager: "#pager2",
                        rowList: [20, 50, 100, 200],
                        viewrecords: true,
                        jsonReader: {
                            repeatitems: false
                        },
                        onSelectRow: function () {
                            var rowId = $('#hrEmpSetList').jqGrid("getGridParam", "selrow");
                            rowData = $('#hrEmpSetList').jqGrid('getRowData', rowId);
                        },
                        ondblClickRow: function (rowid) {
                            //跳转编辑页
                            rowData = $('#hrEmpSetList').jqGrid('getRowData', rowid);
                            var winObjEI = window.open("../emp/emp_personinfo.html?id=" + rowData.id + "&approvalNum=" + rowData.approvalNum);
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

                                // jqGridSysInfoSet.jqGrid().trigger("reloadGrid");
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
                        }
                    });

            },
            error: function () {
                alert("查询失败！");
            }
        });
    }

    /**
     * 样式格式化:对字段标红
     */
    window.addCellAttr = function (rowId, val, rowObject, cm, rdata) {
        if (rowObject.status !== "在职") {
            return "style='color:red'";
        }
    };
    /* jQuery("#hrEmpSetList").jqGrid('filterToolbar',{stringResult: false,searchOnEnter : true});*/

    function getPostNameList() {
        //动态生成select内容
        var str = ":;";
        $.ajax({
            type: "post",
            async: false,
            url: serviceUrl + 'emp/empPersonInfo/getPostNameList',
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
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: serviceUrl + "emp/empPersonInfo/deletePseudoBatch/" + idsVal,
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
     * 根据条件查询人员信息
     */
    window.queryEmpListByCondition = function () {
        var queryCondition = {};//查询条件

        var minWorkAge = $('#minWorkAge').val();//工龄下限
        var maxWorkAge = $('#maxWorkAge').val();//工龄上限
        var minSeniorit = $("#minSeniorit").val();//司龄下限
        var maxSeniorit = $("#maxSeniorit").val();//司龄上限
        if (minWorkAge != '') {
            queryCondition.minWorkAge = minWorkAge;
            if (minWorkAge!=undefined&&!$.isNumeric(minWorkAge)) {
                $.xljUtils.tip("red", "工龄必须是数字！");
                return;
            }
        }
        if (maxWorkAge != '') {
            queryCondition.maxWorkAge = maxWorkAge;
            if (maxWorkAge!=undefined&&!$.isNumeric(maxWorkAge)) {
                $.xljUtils.tip("red", "工龄必须是数字！");
                return;
            }
        }
        if (minSeniorit != '') {
            queryCondition.minSeniorit = minSeniorit;
            if (minSeniorit!=undefined&&!$.isNumeric(minSeniorit)) {
                $.xljUtils.tip("red", "司龄必须是数字！");
                return;
            }
        }
        if (maxSeniorit != '') {
            queryCondition.maxSeniorit = maxSeniorit;
            if (maxSeniorit!=undefined&&!$.isNumeric(maxSeniorit)) {
                $.xljUtils.tip("red", "司龄必须是数字！");
                return;
            }
        }
        if (parseInt(minWorkAge) > parseInt(maxWorkAge)) {
            $.xljUtils.tip("red", "工龄下限必须小于工龄上限！");
            return;
        }
        if (parseInt(minSeniorit) > parseInt(maxSeniorit)) {
            $.xljUtils.tip("red", "司龄下限必须小于司龄上限！");
            return;
        }

        var sexCon = $("#sex").val();//性别
        if (sexCon != '') {
            queryCondition.sexCon = sexCon;
        }
        var personTypeCon = $("#personType").val();//人员类别
        if (personTypeCon != '') {
            queryCondition.personTypeCon = personTypeCon;
        }
        var headshipRankCon = $("#headshipRank").val();//职级
        if (headshipRankCon != '') {
            queryCondition.headshipRankCon = headshipRankCon;
        }
        var educationCon = $("#education").val();//学历
        if (educationCon != '') {
            queryCondition.educationCon = educationCon;
        }
        var degreeCon = $("#degree").val();//学位
        if (degreeCon != '') {
            queryCondition.degreeCon = degreeCon;
        }
        var recruitCannel = $("#recruitCannel").val();//招聘渠道
        if (recruitCannel != '') {
            queryCondition.recruitCannel = recruitCannel;
        }

        var queryKey = $("#userQueryKey").val();
        //var retiredPersonFlag = $('#retiredPersonFlag').prop('checked');//是否包含离职人员
        queryCondition.retiredPersonFlag = retiredPersonFlag;


        // var allNodes = zTreeObj.getNodes();//todo 判定机构树
        // rootNode = allNodes[0];
        // if (rootNode.id != '' && nodes !== '') {
        //     if (rootNode.id != nodes[0].id) {
        //         edit_orgId = nodes[0].id;
        //         queryCondition.orgId = edit_orgId;
        //     }
        // }
        queryCondition.orgId = edit_orgId;//机构树的选中节点

        queryCondition.name = queryKey;
        queryCondition.pinyin = queryKey;
        queryCondition.phone = queryKey;
        // queryCondition.personCode = queryKey;
        queryCondition.startNew = 0;
        var limitNew = $('#hrEmpSetList').getGridParam('rowNum');
        queryCondition.limitNew = parseInt(limitNew);
        //清空原有查询条件
        var postData = jqGridSysInfoSet.jqGrid("getGridParam", "postData");
        $.each(postData, function (k, v) {
            delete postData[k];
        });
        //载入新的查询条件
        $("#hrEmpSetList").jqGrid('setGridParam', {datatype: 'json', postData: queryCondition}).trigger('reloadGrid');
        var postData = jqGridSysInfoSet.jqGrid("getGridParam", "postData");
        $.each(postData, function (k, v) {
            delete postData[k];
        });
        delete queryCondition["startNew"];
        delete queryCondition["limitNew"];
        //$("#hrEmpSetList").jqGrid('setGridParam',{datatype:'json',postData:{name:queryKey,personCode:queryKey,retiredPersonFlag:retiredPersonFlag}});
        $("#hrEmpSetList").jqGrid('setGridParam', {datatype: 'json', postData: queryCondition});
        console.info("*******************************");
        console.info(jqGridSysInfoSet.jqGrid("getGridParam", "postData"));
    }

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


})(jQuery, window, document);