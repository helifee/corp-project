/**
 * Created by xph on 2017/7/6.
 */

(function ($, window, document, undefined) {
    var divWidth;
    var rowData;
    var rowDataBefore;
    var deptId;
    //手动的调整窗口时 grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //表示con-table 下的mytable1
        $(".con-table .mytable").height((w_h - 103) + "px");

    }

    //计算表格宽度
    function resizeGrid() {
        //右边一个列表
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 70);
        // // $("#gbox_subjectList").width($('.mytable').width());
        // $("#gbox_subjectList").width($('.mytable').width()-4);
        // $("#gview_subjectList").width($('.mytable').width()-4);
        // $(".ui-state-default .ui-jqgrid-hdiv").width($('.mytable').width()-4);
        // $(".ui-jqgrid-bdiv").width($('.mytable').width()-4);
        // $(".ui-state-default .ui-jqgrid-hdiv").width($('.mytable').width()-4);
        // $(".ui-jqgrid-htable").width($('.mytable').width()-4);

        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 80);

        $.xljUtils.gridResizeFn();
    }

    //上来就执行
    $(function () {
        //todo 禁用iframe的
        divWidth =  $("#userDiv").width();
        //初始化高度
        resizeHeight();
        initPersonDeptId();

        //初始化加载列表信息
        getSubjectList();
        initDatetimepicker();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        $('.my-checkbox').on('click', function (event) {
        });
        //在加载完表格后，设置表格的宽度
        resizeGrid();
        initCodeSelect("1015", "status");
    });

    //新增岗位跳转页面
    $("#addBtn").click(function () {
        var selectTypeId = $("#treeDemo .curSelectedNode span:last").attr("name");
        if (selectTypeId == undefined) {
            window.location.href="ojt_subject_edit.html?type=add";
        } else {
            window.open("ojt_subject_edit.html?type=add&typeId=" + selectTypeId);
        }
    });
    $("#delBtn").click(function () {
        del();
    });
    $("#setStatus0").click(function () {//发布
        showTreeModa2Modal("1009100036");
    });
    //推送
    $("#setStatus1").click(function () {
        // showTreeModa2Modal("1015100046");
        sentMsg();
    });
    $("#setStatus2").click(function () {
        showTreeModa2Modal("1009100037");
    });
    //统计
    $("#setStatus3").click(function () {
        window.location.href="ojt_statistics.html";
    });
    // $("#closeStatus").click(function () {
    //     $("#treeModa2").modal('hide');
    // });
    // $("#saveStatus").click(function () {
    //     setStatus();
    // });
    //编辑
    $("#updateBtn").unbind('click').on('click', function () {
        toUpdate();
    });
    //查询
    $("#queryBtn").unbind('click').on('click', function () {
        queryListByCondition();
    });
    //清除机构信息
    $("#clearOrg").unbind('click').on('click', function () {
        $("#orgId").val("");
        $("#orgName").val("");
    });
    //高级查询区域大小伸缩
    $("#expandedSearch").unbind('click').on('click', function () {
        flexExpandedSearch();
    });
    //高级查询
    $("#expandedSearchBtn").unbind('click').on('click', function () {
        expandedSearchSubject();
    });

    window.subjectTypeSearch = function () {
        expandedSearchSubject();
    }
    window.statusSearch = function () {
        expandedSearchSubject();
    };



    $("#treeDemo_1_a").click(function (e) {
        clickTreeNode(this);
    })




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
                postData: {},
                autowidth: true,
                /*width:400,*/
                colNames: ['id', '课程类型', '课程名称', '课程学分','课程状态', '课件', '讲师', '课程简介',
                    '允许下载','创建者', '创建时间','可播放的课件','不可播放的课件'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {
                        name: 'subjectTypeName',
                        index: 'subjectTypeName',
                        width: divWidth * 0.08,
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {name: 'name', index: 'name', width: divWidth * 0.15, editable: true, sortable: false, align: 'center'},
                    {name: 'credit', index: 'credit', width: divWidth * 0.072, editable: true, sortable: false, align: 'center'},
                    {name: 'subjectStatus', index: 'subjectStatus', width: divWidth * 0.072, editable: true, sortable: false, align: 'center',formatter: subjectStatusFmatter},
                    {
                        name: 'kejian', index: 'kejian', width: divWidth * 0.097, editable: true, sortable: false, align: 'center',
                        formatter: kejianFmatter
                    },
                    {
                        name: 'teacherName',
                        index: 'teacherName',
                        width: divWidth * 0.08,
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        name: 'remark',
                        index: 'remark',
                        width: divWidth * 0.187,
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: remarkFmatter
                    },
                    {
                        name: 'ifDownload',
                        index: 'ifDownload',
                        width: divWidth * 0.07,
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: codeFmatter
                    },
                    {
                        name: 'createPersonName',
                        index: 'createPersonName',
                        width: divWidth * 0.07,
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        name: 'hrCreateDate',
                        index: 'hrCreateDate',
                        editable: true,
                        sortable: false,
                        width: divWidth * 0.08,
                        align: 'center',
                        formatter: 'date',
                        formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}
                    },
                    {name: 'canPlayCount', index: 'canPlayCount', editable: true, sortable: false, hidden: true},
                    {name: 'cannotPlayCount', index: 'canPlayCount', editable: true, sortable: false, hidden: true}
                ],
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
                        $('#subjectList ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#subjectList').jqGrid("getGridParam", "selrow");
                    rowData = $('#subjectList').jqGrid('getRowData', rowId);
                },

                ondblClickRow: function () {
                    //跳转编辑页
                    var rowId = $('#subjectList').jqGrid("getGridParam", "selrow");
                    rowData = $('#subjectList').jqGrid('getRowData', rowId);
                    if(rowData.subjectStatus == "已发布"){
                        edit_subjectId = rowData.id;
                        window.location.href="ojt_subject_edit.html?type=update&subjectId=" + edit_subjectId+"&updateflag=true";
                    }else{
                        edit_subjectId = rowData.id;
                        window.location.href="ojt_subject_edit.html?type=update&subjectId=" + edit_subjectId;
                    }

                    //+"&name="+encodeURI(rowData.name,"UTF-8")
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
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
                shrinkToFit: false,
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
                        console.log(xhr);
                    }
                }

            });
        /*var w_h = $(window).height();
         var v = w_h - 150;
         $(".con-table .mytable #gbox_subjectList").css("height","'"+v+"px'");*/

    }

    /**
     *  课件
     */
    function kejianFmatter(cellvalue, options, rowObject) {
        if (cellvalue > 0) {
            var a = "<a style='color: #46A7FF;' " +
                "href='#' onclick='openViewPage(\"" + rowObject.id + "\")'>查看课件 ";
            if (rowObject.canPlayCount != 0 || rowObject.urlCour != 0) {
                a += "<img style='width:12px; height:12px; margin-right:2px; margin-bottom:2px;' src='icon_video.png'/>";
            }
            if (rowObject.cannotPlayCount != 0) {
                a += "<img style='width:12px; height:12px; margin-bottom:2px;' src='icon_file.png'/>";
            }
            return a += "</a>";
        } else {
            return "暂无课件";
        }
    }

    function subjectStatusFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "1009100036") {
            return "已发布";
        } else {
            return "未发布";
        }
    }
    window.openViewPage = function (id) {
        window.location.href="ojt_subject_courseware_view.html?id=" + id + "&type=total";
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
     *  机构信息
     */
    function orgIdFmatter(cellvalue, options, rowObject) {
        if (cellvalue == undefined) {
            return "暂未设置";
        }
        var org = $.hrUtils.getOrgById(cellvalue);
        if (org == undefined || org.prefixName == undefined) {
            return "该机构已被撤销";
        } else {
            return org.prefixName;
        }
    }

    /**
     *  代码项
     * @param cellvalue
     * @param options
     * @param rowObject
     * @returns {string}
     */
    function codeFmatter(cellvalue, options, rowObject) {
        if (options.pos == 18) {
            return $.hrUtils.getHRCodeNameById(rowObject.status);
        } else {
            if (cellvalue == "1009100036") {
                return "是";
            } else if (cellvalue == "1009100037") {
                return "否";
            } else {
                return $.hrUtils.getHRCodeNameById(cellvalue);
            }
        }
    }

    /**
     *  跳转至修改页面
     */
    function toUpdate() {
        var idsVal = $('#subjectList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
                return;
            } else {
                var rowId = $('#subjectList').jqGrid("getGridParam", "selrow");
                rowData = $('#subjectList').jqGrid('getRowData', rowId);
                if(rowData.subjectStatus == "已发布"){
                    edit_subjectId = rowData.id;
                    window.location.href="ojt_subject_edit.html?type=update&subjectId=" + edit_subjectId+"&updateflag=true";
                }else{
                    edit_subjectId = rowData.id;
                    window.location.href="ojt_subject_edit.html?type=update&subjectId=" + edit_subjectId;
                }
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }

    /**
     *  条件查询
     */
    function queryListByCondition() {
        var queryKey = $("#queryName").val();
        var queryCondition = {};
        queryCondition.name = queryKey;
        $("#subjectList").jqGrid('setGridParam', {
            datatype: 'json',
            postData: {name: queryKey, deptId: deptId},
            page: 1
        }).trigger('reloadGrid');
    }


    /**
     * 删除
     */
    function del() {
        var idsVal = $('#subjectList').jqGrid('getGridParam', 'selarrrow');
        /*$.hrUtils.focusNode(idsVal);return;*/
        /*$.hrUtils.focusNode(idsVal);
         $('#subjectList').jqGrid().trigger("reloadGrid");
         return;*/
        if (idsVal && idsVal != "") {
            var flag = true;
            for(var i = 0;i<idsVal.length;i++){
                var rowData = $('#subjectList').jqGrid('getRowData', idsVal[i]);
                if(rowData.subjectStatus == "已发布"){
                    $.xljUtils.tip("blue", "已发布课件禁止删除");
                    flag = false;
                    break;
                }
            }
            if(flag){
                $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                    $.ajax({
                        //url: hostUrl + "/org/post/deleteBatch/" + idsVal,
                        url: hostUrl + "/ojt/hrOjtSubject/deleteSubjectsAndCoures/" + idsVal,
                        type: 'DELETE',
                        dataType: 'JSON',
                        contentType: 'application/json',
                        data: JSON.stringify({}),
                        success: function (xhr, textStatus) {
                            console.log(xhr);
                            if (xhr) {
                                if (xhr.success) {
                                    $.xljUtils.tip("green", "数据删除成功！");
                                    var w = $.hrUtils.focusNode(idsVal);
                                    $('#subjectList').jqGrid("setGridParam", {
                                        gridComplete: function () {
                                            if (w != null && w != "") {
                                                $("#subjectList").setSelection(w);
                                            }
                                            w = "";
                                        }
                                    }).trigger("reloadGrid");
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
            }
        } else {
            $.xljUtils.tip("blue", "请选择要删除的数据！");
        }
    }

    //显示修改状态的悬浮层
    function showTreeModa2Modal(status) {
        var idsVal = $('#subjectList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
            } else {
                setStatus(status);
            }
        } else {
            $.xljUtils.tip("blue", "请选择要修改的数据！");
        }
    }

    /**
     * 推送
     */
    function sentMsg() {
        var idsVal = $('#subjectList').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一行数据进行编辑！");
            } else {
                rowData = $('#subjectList').jqGrid('getRowData', idsVal);
                if(rowData.subjectStatus =='已发布'){
                    //打开消息发送页面
                    openPa("ojt_sentMsg.html?subjectId="+idsVal);
                }else{
                    $.xljUtils.tip("blue", "只能推送已发布的课程！");
                }
            }
        } else {
            $.xljUtils.tip("blue", "请选择要推送的数据！");
        }
    }

    /**
     *  修改状态
     */
    function setStatus(status) {
        // var status = $("[name=status]:checked").val();
        // if (status == undefined){
        //     $.xljUtils.tip("blue", "请选择状态！");
        //     return;
        // }
        ojtSubjectDto = {};
        ojtSubjectDto.subjectStatus = status;
        var idsVal = $('#subjectList').jqGrid('getGridParam', 'selarrrow');
        var rowData = $('#subjectList').jqGrid('getRowData', idsVal[0]);
        if(status == '1009100036'){
            status = '已发布';
        } else if(status == '1009100037'){
            status = '未发布';
        }
        if (rowData.subjectStatus == status) {
            $.xljUtils.tip("blue", "课程状态无法重复设置！");
            return;
        }
        ojtSubjectDto.ids = idsVal;
        $.ajax({
            url: hostUrl + "/ojt/hrOjtSubject/updateList",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtSubjectDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        if("已发布" == status){
                            $.xljUtils.tip("green", "发布成功！");
                        }else if("未发布" == status){
                            $.xljUtils.tip("green", "下架成功！");
                        }
                        $('#subjectList').jqGrid().trigger("reloadGrid");
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
        // $("#treeModa2").modal('hide');
    }


    /**
     * 点击高级查询的时候添加可伸缩功能
     *
     */
    function flexExpandedSearch() {
        var s_Area = $('.expand-search');
        var s_btn = $('.btn-adv > i');
        var w_h = $(window).height();
        if (s_Area.height() == 36) {
            s_Area.css({"height": "85px"});
            s_btn.removeClass('fa-angle-down').addClass('fa-angle-up');
            $(".con-table .mytable").height((w_h - 160) + "px");
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 70);
        } else {
            s_Area.css({"height": "36px", "overflow": "hidden"});
            s_btn.removeClass('fa-angle-up').addClass('fa-angle-down');
            $(".con-table .mytable").height((w_h - 111) + "px");
            $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 70);
        }
        $.xljUtils.gridResizeFn();
    }

    //机构字典回调
    window.orgCallback = function (data) {
        var orgId = data.id;
        $("#orgId").val(orgId);
        // $("#orgName").val(data.name);
        $("#orgName").val(data.prefixName);

        expandedSearchSubject();
    }
    //初始化页面中的代码项列表
    function initCodeSelect(code_set_id, selectId) {
        var pam = {};
        pam.code_set_id = code_set_id;
        var urlBody = "/sys/sysCodeItem/getSysCodeItemById";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            headers: {'Content-type': 'application/json;charset=UTF-8'},
            type: 'POST',
            url: urlAll,
            data: JSON.stringify(pam),
            dataType: 'json',
            success: function (json) {
                var retDt = json.result;
                if (undefined != retDt) {
                    $.each(retDt, function (i, item) {
                        $("#" + selectId).append("<option value='" + item.id + "'>" + item.name + "</option>")
                    });
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "代码项初始化失败");
            }
        });
    }

    /**
     *  条件查询
     */
    function expandedSearchSubject() {

        var queryCondition = {};
        queryCondition.subjectName = $("#subjectName").val();
        $("#subjectList").jqGrid('setGridParam', {
            datatype: 'json',
            postData: queryCondition,
            page: 1
        }).trigger('reloadGrid');
    }




    /**
     *  获取当前登录用户的deptId
     */
    function initPersonDeptId() {
        var personInfoDto = $.hrUtils.getHREmpInfo()
        if (personInfoDto != null && personInfoDto != undefined) {
            deptId = personInfoDto.deptId;
        } else {
            // $.xljUtils.tip("red", "未获取到当前登录信息！");
        }
    }

    //初始化日期控件
    function initDatetimepicker() {
        //年月日
        var picker = $('.datetimepicker').datetimepicker({
            language: 'zh-CN', //语言
            format: 'yyyy-mm-dd',//显示格式
            minView: "month",//设置只显示到月份
            initialDate: new Date(),//初始化当前日期
            autoclose: true,//选中自动关闭
            todayBtn: true//显示今日按钮
        });
    }
})(jQuery, window, document);