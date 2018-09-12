/**
 * Created by xph on 2017/7/17.
 */

(function ($, window, document, undefined) {
    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        if ($("#searchBox").is(":hidden")) {
            $(".slide-left .ztree-box").height((w_h - 90) + "px");//div隐藏
        } else {
            $(".slide-left .ztree-box").height((w_h - 141) + "px");//div显示
        }
        //表示con-table 下的mytable1
        $(".con-table .mytable").height((w_h - 119) + "px");
        //$("#gview_mySubject .ui-jqgrid-bdiv").css("height","392px")
    }

    //计算表格宽度
    function resizeGrid() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 75);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width(), true);
        $.xljUtils.gridResizeFn();
    }

    $("#searchTreeBtn").click(function (e) {
        var w_h = $(window).height();
        $("#searchBox").toggle();
        if ($("#searchBox").is(":hidden")) {
            $(".slide-left .ztree-box").height((w_h - 90) + "px");//div隐藏
        } else {
            $(".slide-left .ztree-box").height((w_h - 141) + "px");//div显示
        }
        e.stopPropagation();
    });


    $(function () {
        resizeHeight();
        initPersonId();
        //加载左侧类别树
        initSubjectTypeTree();
        resizeGrid();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        //课程查询
        $("#onStudyQueryBtn").on('click', function () {
            queryOnStudyListByCondition();
        });
        $("#studiesQueryBtn").on('click', function () {
            queryStudiesListByCondition();
        });
        //类别查询
        $("#ztreeKeywordsSearchBtn").on('click', function () {
            initSubjectTypeTree();
        });
        //选课
        $("#deleteDemo").on('click', function () {
            deleteStudent();
        });
    });

    /**
     *  初始化课程类别数据
     */
    function initSubjectTypeTree() {
        var queryKey = $("#ztreeKeywords").val();
        $("#treeDemo_1_ul").empty();
        $.ajax({
            type: "POST",
            url: hostUrl + "ojt/hrOjtSubjectType/queryListByCondition",
            data: JSON.stringify({name: queryKey}),
            dataType: "JSON",
            contentType: "application/json",
            success: function (data) {
                var result = data.result;
                if (result == null || result.length == 0) {
                    return;
                }

                for (var i = 0; i < data.result.length; i++) {
                    var li = '' +
                        '<li class="level1" tabindex="0" hidefocus="true" > ' +
                        '<a  class="level1"  target="_blank" ';
                    if (queryKey != null && queryKey != "") {
                        li += 'style="color: rgb(51, 51, 51); font-weight: bold; font-style: italic;';
                    } else {
                        li += 'style="color:#333;font-weight:normal;font-style:normal;';
                    }
                    li += '' +
                        '"onclick="clickTreeNode(this)"> ' +
                        '<span id="treeDemo_2_ico" title="" treenode_ico="" class="button diy-company_ico_close" style=""></span>' +
                        '<span class="node_name" name="' + result[i].id + '">' + result[i].name + '</span> ' +
                        '</a> ' +
                        '</li>';
                    $("#treeDemo_1_ul").append(li)
                }
            }
        });
    }


    $("#treeDemo_1_a").click(function (e) {
        clickTreeNode(this);
    });

    /**
     *  点击左侧类别树后改变样式并刷新右侧表格
     */
    window.clickTreeNode = function (e) {
        $("#treeDemo_1").find("a").removeClass("curSelectedNode");
        $(e).addClass("curSelectedNode");
        var subjectTypeId = $(e).children("span:last").attr("name");
        if (e.className.indexOf("level0") != -1) {
            subjectTypeId = '';
        }
        //或刷新连带表格
        var queryDataPost = {
            "subjectTypeId": subjectTypeId
        };
        $('#mySubject').jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
        $('#mySubject1').jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
    }

    //自助 我的课程 已学课程||未学课程的切换
    $(".right-content .con-tit button").on("click", function (e) {
        $(this).siblings().removeClass("active");//同胞移除激活状态的样式
        $(this).addClass("active");//自己激活
        //如果有这个样式
        if ($(this).attr('class').indexOf('zhengxue') > 0) {
            $("#zhengxue").css("display", "block");
            $("#yixue").css("display", "none");
        } else {
            $("#zhengxue").css("display", "none");
            $("#yixue").css("display", "block");
        }
        $.xljUtils.gridResizeFn();
        e.stopPropagation();
    });

    /**
     * 初始化正学课程
     */
    function initOnStudySubjectList() {
        var ubody = "ojt/hrOjtStudent/queryListByConditionByPage";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridUser = jQuery("#mySubject").jqGrid(
            {
                url: uall,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                //postData: {"status": '1', "name": '', "type": ''},
                postData: {"delflag": '0', "personId": $("#personId").val(), "noRate": 1},
                autowidth: true,
                colNames: ['id', '用户id', '课程名称', '课程类别id', '课程类别', '起始时间', '结束时间', '学习次数',
                    '进度', '学习', '考试', "笔记", "评论", "是否考试", "已考次数"],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'personId', index: 'personId', editable: true, sortable: false, hidden: true},
                    {name: 'subjectName', index: 'subjectName', editable: true, sortable: false, align: 'center'},
                    {name: 'subjectTypeId', index: 'subjectTypeId', editable: true, sortable: false, hidden: true},
                    {
                        name: 'subjectTypeName',
                        index: 'subjectTypeName',
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        name: 'startDate',
                        index: 'startDate',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}
                    },
                    {
                        name: 'endDate',
                        index: 'endDate',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}
                    },
                    {name: 'times', index: 'times', editable: true, sortable: false, align: 'center'},
                    {
                        name: 'rate',
                        index: 'rate',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: rateFmatter
                    },
                    {
                        name: 'subjectId', index: 'subjectId', editable: true, sortable: false, align: 'center',
                        formatter: goToStudyFmatter
                    },
                    // {name: 'subjectId', index: 'subjectId', editable: true, sortable: false},
                    {
                        name: 'note', index: 'note', editable: true, sortable: false, align: 'center',
                        formatter: goToStudyFmatter
                    },
                    {
                        name: 'comment', index: 'comment', editable: true, sortable: false, align: 'center',
                        formatter: goToStudyFmatter
                    },
                    {
                        name: 'status', index: 'status', editable: true, sortable: false, align: 'center',
                        formatter: goToStudyFmatter
                    },
                    {name: 'ifExam', index: 'ifExam', editable: true, sortable: false, hidden: true},
                    {name: 'nowTimes', index: 'nowTimes', editable: true, sortable: false, hidden: true}
                ],
                // columns:[],
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                jsonReader: {
                    //root: "result",
                    repeatitems: false
                },
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#demandList ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#demandList').jqGrid("getGridParam", "selrow");
                    rowData = $('#demandList').jqGrid('getRowData', rowId);
                },

                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#demandList').setSelection(rowDataBefore.id, true);
                        $('#demandList ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                },
                rowNum: 20,//一页显示多少条 -1全部
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: "#pager2",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
                shrinkToFit: true,
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

    function rateFmatter(cellvalue, options, rowObject) {
        var rateDecimal = changeTwoDecimal_f(cellvalue) * 100;
        var rate = rateDecimal == false ? 0 : rateDecimal;
        var result = '' +
            '<div class="progress">' +
            '<div class="progress-bar" role="progressbar" aria-valuenow="60" ' +
            'aria-valuemin="0" aria-valuemax="100" style="width: ' + rate + '%;">' +
            '<span class="sr-only">' + rate + '% 完成</span>' +
            '</div>' +
            '</div>';
        return result;
    }

    /**
     *  跳转到学习课程页面
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    function goToStudyFmatter(cellvalue, options, rowObject) {
        var clazz = "";
        var location = "";
        var index = options.pos;
        if (options.gid == "mySubject") {
            index--;
        }
        switch (index) {
            case 10:
                clazz = "glyphicon-pencil";
                location = "goStudy(\'" + rowObject.kejian + "\',\'" + rowObject.subjectId + "\')";
                break;
            case 11:
                clazz = "glyphicon-pencil";
                location = "goExam(\'" + rowObject.ifExam + "\',\'" + rowObject.times + "\',\'" + rowObject.nowTimes + "\',\'" + rowObject.paperId + "\',\'" + rowObject.subjectId + "\')";
                break;
            case 12:
                clazz = "glyphicon-th";
                location = "javascript:window.open(\'../ojt/ojt_subject_courseware_view.html?id=" + rowObject.subjectId + "&tab=note\')";
                break;
            case 13:
                clazz = "glyphicon-th-list";
                location = "javascript:window.open(\'../ojt/ojt_subject_courseware_view.html?id=" + rowObject.subjectId + "&tab=comment\')";
                break;
        }
        var rateDecimal = changeTwoDecimal_f(cellvalue) * 100;
        var rate = rateDecimal == false ? 0 : rateDecimal;
        var result = '' +
            '<button type="button" class="btn btn-primary" onclick="' + location + '"';

        if (index == 11 && rowObject.ifExam == "1009100037") {//否
            result += " disabled";
        }
        if ((index == 10 || index == 12 || index == 13) && Number(rowObject.kejian) <= 0) {
            result += " disabled";
        }
        result += '>' +
            '<span class="glyphicon ' + clazz + '"></span>' +
            '</button>';
        return result;
    }


    /**
     * 初始化已学课程
     */
    function initStudiedSubjectList() {
        var ubody = "ojt/hrOjtStudent/queryListByConditionByPage";
        var uall = hostUrl + ubody;
        //创建jqGrid组件
        jqGridUser = jQuery("#mySubject1").jqGrid(
            {
                url: uall,
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                //postData: {"status": '1', "name": '', "type": ''},
                postData: {"delflag": '0', "personId": $("#personId").val(), "isRate": 1},
                autowidth: true,
                jsonReader: {
                    //root: "result",
                    repeatitems: false
                },
                rownumbers: true,
                colNames: ['id', '用户id', '课程名称', '课程类别id', '课程类别', '起始时间', '结束时间', '学习次数',
                    '进度', '学习', '考试', "笔记", "评论", "是否考试", "已考次数"],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'personId', index: 'personId', editable: true, sortable: false, hidden: true},
                    {name: 'subjectName', index: 'subjectName', editable: true, sortable: false, align: 'center'},
                    {name: 'subjectTypeId', index: 'subjectTypeId', editable: true, sortable: false, hidden: true},
                    {
                        name: 'subjectTypeName',
                        index: 'subjectTypeName',
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        name: 'startDate',
                        index: 'startDate',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}
                    },
                    {
                        name: 'endDate',
                        index: 'endDate',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}
                    },
                    {name: 'times', index: 'times', editable: true, sortable: false, align: 'center'},
                    {
                        name: 'rate',
                        index: 'rate',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: rateFmatter
                    },
                    {
                        name: 'subjectId', index: 'subjectId', editable: true, sortable: false, align: 'center',
                        formatter: goToStudyFmatter
                    },
                    // {name: 'subjectId', index: 'subjectId', editable: true, sortable: false},
                    {
                        name: 'note', index: 'note', editable: true, sortable: false, align: 'center',
                        formatter: goToStudyFmatter
                    },
                    {
                        name: 'comment', index: 'comment', editable: true, sortable: false, align: 'center',
                        formatter: goToStudyFmatter
                    },
                    {
                        name: 'status', index: 'status', editable: true, sortable: false, align: 'center',
                        formatter: goToStudyFmatter
                    },
                    {name: 'ifExam', index: 'ifExam', editable: true, sortable: false, hidden: true},
                    {name: 'nowTimes', index: 'nowTimes', editable: true, sortable: false, hidden: true}
                ],
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#mySubject ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#mySubject').jqGrid("getGridParam", "selrow");
                    rowData = $('#mySubject').jqGrid('getRowData', rowId);
                },

                ondblClickRow: function () {
                    //跳转编辑页
                    var rowId = $('#mySubject').jqGrid("getGridParam", "selrow");
                    rowData = $('#mySubject').jqGrid('getRowData', rowId);
                    edit_demandId = rowData.id;
                    window.open("ojt_demand_edit.html?type=update&demandId=" + edit_demandId);
                    //+"&name="+encodeURI(rowData.name,"UTF-8")
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#mySubject').setSelection(rowDataBefore.id, true);
                        $('#mySubject ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                },
                rowNum: 20,//一页显示多少条 -1全部
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: "#pager3",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
                shrinkToFit: true,
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
            }
        );
    }

    /**
     *  条件查询
     */
    function queryOnStudyListByCondition() {
        var queryKey = $("#onStudyQueryKey").val();
        var queryCondition = {};
        queryCondition.name = queryKey;
        $("#mySubject").jqGrid('setGridParam', {
            datatype: 'json',
            postData: {subjectName: queryKey}
        }).trigger('reloadGrid');
    }

    /**
     *  条件查询
     */
    function queryStudiesListByCondition() {
        var queryKey = $("#studiesQueryKey").val();
        var queryCondition = {};
        queryCondition.name = queryKey;
        $("#mySubject1").jqGrid('setGridParam', {
            datatype: 'json',
            postData: {subjectName: queryKey}
        }).trigger('reloadGrid');
    }

    /**
     *  取消选课
     */
    function deleteStudent() {
        var idsVal = $('#mySubject').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length == 1) {
                $.xljUtils.confirm("blue", "确认要撤销选择这门课程吗？", function () {
                    $.ajax({
                        url: baseUrl + "ojt/hrOjtStudent/deletePseudo/" + idsVal[0],
                        type: 'DELETE',
                        dataType: 'JSON',
                        contentType: 'application/json',
                        data: JSON.stringify({}),
                        success: function (xhr, textStatus) {
                            console.log(xhr);
                            if (xhr) {
                                if (xhr.success) {
                                    $.xljUtils.tip("green", "撤销成功！");
                                    $('#mySubject').jqGrid().trigger("reloadGrid");
                                } else {
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
                }, true);
            } else {
                $.xljUtils.tip("blue", "同时只能撤销一门课程！");
            }
        } else {
            $.xljUtils.tip("blue", "请选择要撤销的课程！");
        }
    }

    window.goStudy = function (kejian, subjectId) {
        if (Number(kejian) <= 0) {
            $.xljUtils.tip("blue", "此课程没有课件，不需学习！");
            return;
        }
        window.open("../ojt/ojt_subject_courseware_view.html?id=" + subjectId);
    }

    window.goExam = function (ifExam, times, nowTimes, paperId, subjectId) {
        if (ifExam == "1009100037") {
            $.xljUtils.tip("blue", "此课程无需考试！");
            return;
        }
        if (times == nowTimes) {
            $.xljUtils.tip("blue", "此课程的考试次数已达上限，无法再次考试！");
            return;
        }
        window.open("../ojt/ojt_paper_preview.html?paperId=" + paperId + "&type=subjectExam&subjectId=" + subjectId);
    }

    /**
     *  获取当前登录用户的ID
     */
    function initPersonId() {
        var personInfoDto = $.hrUtils.getHREmpInfo();
        if (personInfoDto != null && personInfoDto != undefined) {
            var personId = personInfoDto.id;
            $("#personId").val(personId);

            //初始化列表信息
            initOnStudySubjectList();
            initStudiedSubjectList();
        } else {
            $.xljUtils.tip("red", "未获取到当前登录信息！");
        }
    }

    /**
     *  强制转换为两位小数
     * @param x
     * @returns {*}
     */
    function changeTwoDecimal_f(x) {
        var f_x = parseFloat(x);
        if (isNaN(f_x)) {
            // console.log('function:changeTwoDecimal->parameter error 参数不是数字');
            return false;
        }
        var f_x = Math.round(x * 100) / 100;
        var s_x = f_x.toString();
        var pos_decimal = s_x.indexOf('.');
        if (pos_decimal < 0) {
            pos_decimal = s_x.length;
            s_x += '.';
        }
        while (s_x.length <= pos_decimal + 2) {
            s_x += '0';
        }
        return s_x;
    }
})(jQuery, window, document);