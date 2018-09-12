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
        $(".con-table .mytable").height((w_h - 67) + "px");
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
        //初始化高度
        resizeHeight();

        initUuid();
        initPersonId();
        //加载左侧类别树
        getSubjectTypeData();
        //初始化加载列表信息
        getSubjectList();

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
        $("#queryBtn").on('click', function () {
            queryListByCondition();
        });
        //类别查询
        $("#ztreeKeywordsSearchBtn").on('click', function () {
            getSubjectTypeData();
        });
        //选课
        $("#choiceSubject").on('click', function () {
            choiceSubject();
        });
        //在加载完表格后，设置表格的宽度
        resizeGrid();
    });

    /**
     *  初始化课程类别数据
     */
    function getSubjectTypeData() {/*
        var queryKey = $("#ztreeKeywords").val();
        $.ajax({
            type: "POST",
            url: hostUrl + "ojt/hrOjtSubjectType/queryListByCondition",
            data: JSON.stringify({name: queryKey}),
            dataType: "JSON",
            contentType: "application/json",
            success: function (data) {
                // pop_tip_open("blue","新增成功！");
                $("#treeDemo_1_ul").empty();
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
                // if(queryKey != null && queryKey != "") {
                //     $("#treeDemo_1").find("a").addClass("curSelectedNode");
                // }else {
                //     $("#treeDemo_1").find("a").removeClass("curSelectedNode");
                // }
            }
        });*/
    }

    $("#treeDemo_1_a").click(function (e) {
        clickTreeNode(this);
    })

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
        $('#subjectList').jqGrid("setGridParam", {postData: queryDataPost}).trigger("reloadGrid");
    }

    /**
     * 加载Subject列表
     */
    function getSubjectList() {
        jqGridPost = jQuery("#subjectList").jqGrid(
            {
                url: hostUrl + 'ojt/hrOjtSubject/queryListByConditionByPage',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                //postData: {"status": '1', "name": '', "type": ''},
                postData: {
                    subjectStatus: '1009100036',
                    /*personId: $("#personId").val(),*/
                    /*timeInterval: true*/
                },
                autowidth: true,
                colNames: ['id', '课程类型', '课程名称', '课程学分', '课件', '讲师', '课程简介',
                    '允许下载','创建者', '创建时间','可播放的课件','不可播放的课件'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {
                        name: 'subjectTypeName',
                        index: 'subjectTypeName',
                        width: 100,
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {name: 'name', index: 'name', width: 200, editable: true, sortable: false, align: 'center'},
                    {name: 'credit', index: 'credit', width: 80, editable: true, sortable: false, align: 'center'},
                    {
                        name: 'kejian', index: 'kejian', width: 100, editable: true, sortable: false, align: 'center',
                        formatter: kejianFmatter
                    },
                    {
                        name: 'teacherName',
                        index: 'teacherName',
                        width: 100,
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        name: 'remark',
                        index: 'remark',
                        width: 200,
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: remarkFmatter
                    },
                    {
                        name: 'ifDownload',
                        index: 'ifDownload',
                        width: 80,
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: codeFmatter
                    },
                    {
                        name: 'createPersonName',
                        index: 'createPersonName',
                        width: 100,
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        name: 'hrCreateDate',
                        index: 'hrCreateDate',
                        editable: true,
                        sortable: false,
                        width: 100,
                        align: 'center',
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}
                    },
                    {name: 'canPlayCount', index: 'canPlayCount', editable: true, sortable: false, hidden: true},
                    {name: 'cannotPlayCount', index: 'canPlayCount', editable: true, sortable: false, hidden: true}
                ],
                // columns:[],
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                // jsonReader: {
                //     root: "result",
                //     repeatitems: false
                // },
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#subjectList ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#subjectList').jqGrid("getGridParam", "selrow");
                    rowData = $('#subjectList').jqGrid('getRowData', rowId);
                },

                ondblClickRow: function () {
                    //跳转编辑页
                    // var rowId = $('#subjectList').jqGrid("getGridParam", "selrow");
                    // rowData = $('#subjectList').jqGrid('getRowData', rowId);
                    // edit_subjectId = rowData.id;
                    // window.open("ojt_subject_edit.html?type=update&subjectId=" + edit_subjectId);
                    //+"&name="+encodeURI(rowData.name,"UTF-8")
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = null;//rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#subjectList').setSelection(rowDataBefore.id, true);
                        $('#subjectList ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                },
                rowNum: 20,//一页显示多少条 -1全部
                rowList: [20, 50, 100, 200],//可供用户选择一页显示多少条
                pager: "#pager",//表格页脚的占位符(一般是div)的id
                viewrecords: true, //定义是否要显示总记录数
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

    /**
     *  课程简介
     */
    function remarkFmatter(cellvalue, options, rowObject) {
        if (cellvalue == undefined) {
            return "暂未设置";
        }
        if (cellvalue.length > 10) {
            return cellvalue.substr(0, 10) + "...";
        }
        return cellvalue;
    }

    /**
     *  代码项
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    function codeFmatter(cellvalue, options, rowObject) {
        return $.hrUtils.getHRCodeNameById(cellvalue);
    }

    /**
     *  是否选课
     */
    function isChoiceFmatter(cellvalue, options, rowObject) {
        if (cellvalue == undefined || cellvalue == '') {
            return "未选择";
        } else if (cellvalue != '') {
            return "已选择";
        } else {
            return cellvalue;
        }
    }

    /**
     *  获取当前登录用户的ID
     */
    function initPersonId() {
        var personInfoDto = $.hrUtils.getHREmpInfo();
        if (personInfoDto != null) {
            var personId = personInfoDto.id;
            $("#personId").val(personId);
        }
    }

    /**
     * 初始化主键ID
     */
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     *  条件查询
     */
    function queryListByCondition() {
        var queryKey = $("#queryName").val();
        var queryCondition = {};
        queryCondition.name = queryKey;
        $("#subjectList").jqGrid('setGridParam', {datatype: 'json', postData: {name: queryKey}}).trigger('reloadGrid');
    }


    /**
     *  选课
     */
    function choiceSubject() {
        var ids = jQuery("#subjectList").jqGrid('getDataIDs');
        if (ids == undefined || ids == '') {
            $.xljUtils.tip("blue", "没有可以选择的课程！");
            return;
        }
        var idsVal = $('#subjectList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (rowData.isChoice == undefined || rowData.isChoice == '未选择') {
                $.xljUtils.confirm("blue", "确认要选择这【" + idsVal.length + "】门课程吗？", function () {
                    var rowDatas = new Array();
                    for (var i = 0; i < idsVal.length; i++) {
                        var rowData = $('#subjectList').jqGrid('getRowData', idsVal[i]);
                        var ojtStudentDto = {};
                        ojtStudentDto.delflag = 0;
                        ojtStudentDto.id = $("#id").val();
                        ojtStudentDto.personId = $("#personId").val();
                        ojtStudentDto.subjectId = rowData.id;
                        ojtStudentDto.startDate = new Date(rowData.stratDate.replace(/-/g, '/')).getTime();
                        ojtStudentDto.endDate = new Date(rowData.endDate.replace(/-/g, '/')).getTime();
                        ojtStudentDto.times = 0;
                        ojtStudentDto.rate = 0;
                        ojtStudentDto.status = '0';
                        rowDatas.push(ojtStudentDto);
                    }
                    $.ajax({
                        url: baseUrl + "ojt/hrOjtStudent/saveBatch/",
                        type: 'POST',
                        dataType: 'JSON',
                        contentType: 'application/json',
                        data: JSON.stringify(rowDatas),
                        success: function (xhr, textStatus) {
                            console.log(xhr);
                            if (xhr) {
                                if (xhr.success) {
                                    console.log("选课成功！");
                                    $.xljUtils.tip("green", "选课成功！");
                                    $('#subjectList').jqGrid().trigger('reloadGrid');
                                    initUuid();
                                } else {
                                    if (xhr.code == "50000") {
                                        $.xljUtils.tip("red", xhr.msg);
                                        return;
                                    }
                                    $.xljUtils.tip("red", "选课失败！");
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
            } else if (idsVal[0].isChoice != '已选择') {
                $.xljUtils.tip("blue", "该课程已选择！");
                return;
            }
        } else {
            $.xljUtils.tip("blue", "请选择要选的课程！");
            return;
        }
    }
    function kejianFmatter(cellvalue, options, rowObject) {
        if (cellvalue > 0) {
            var a = "<a style='color: blue;text-decoration: underline' " +
                "href='#' onclick='openViewPage(\"" + rowObject.id + "\")'>查看课件 ";
            if (rowObject.canPlayCount != 0 || rowObject.urlCour != 0) {
                a += "<img width='12px' height='16px' src='icon_video.png'/>";
            }
            if (rowObject.cannotPlayCount != 0) {
                a += "<img width='12px' height='16px' src='icon_file.png'/>";
            }
            return a += "</a>";
        } else {
            return "暂无课件";
        }
    }

    function remarkFmatter(cellvalue, options, rowObject) {
        if (cellvalue == undefined) {
            return "暂未设置";
        }
        if (cellvalue.length > 10) {
            return cellvalue.substr(0, 10) + "...";
        }
        return cellvalue;
    }

})(jQuery, window, document);