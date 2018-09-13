/**
 * Created by xph on 2017/7/7.
 * zxy、lixd
 */

(function ($, window, document, undefined) {

    var subjectId;//课程id
    var subjectTypeId;//课程类别
    var rowDataBefore;//修改前数据
    var rowData;        //数据

    /**
     * 保存标志位
     * true:已经保存过了
     */
    var isSave;

    //手动的调整窗口时
    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        // resizeGrid();
    });

    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".row .modal-body").height(w_h - 80);
        $(".row .modal-body").niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "6px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: true, // nicescroll可以管理水平滚动
            background: "#fff"
        });
        // $(".row .modal-body").getNiceScroll().show().resize();
        // $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //表示con-table 下的mytable1
        // $(".con-table .mytable").height((w_h - 80) + "px");
    }

    //计算表格宽度
    function resizeGrid() {
        //右边两个列表
        //设置table的高度比mytable高度小一点
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
        $("#courseware .ui-jqgrid-bdiv table").jqGrid().setGridWidth($('#courseware .mytable').width() - 15, true);
        $("#paper .ui-jqgrid-bdiv table").jqGrid().setGridWidth($('#paper .mytable').width() - 15, true);
        //右边一个列表
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable1').height() - 45);
        // $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable1').width()-2, true);

        $.xljUtils.gridResizeFn();
    }

    //上来就执行
    $(function () {
        resizeHeight();
        initDatetimepicker();
        //初始化题库分类下拉框
        // initTypeSelect();
        //initCodeSelect("1009","ifExam");
        //编辑类型
        var type = $.xljUtils.getUrlParam("type");
        if (type == 'add') {
            document.getElementById("saveBtn").style.display = "block";
            document.getElementById("delCouRow").style.display = "block";
            document.getElementById("addCouRow").style.display = "block";
            $('title').text("课程-新增");
            $(".xj-form-title").text("课程-新增");
            //初始化当前登录用户的名称
            initPersonName();
            initCoursewareList(-1);
            //initPaperList(-1);
            $("#status").val("1015100045");
            $("#statusSpan").html("未生效");
            $("#ifPublicYes").removeAttr("disabled");
            $("#ifPublicNo").removeAttr("disabled");
        } else if (type == 'update') {
            isSave = true;
            var updateflag = $.xljUtils.getUrlParam("updateflag");
            if (updateflag) {
                document.getElementById("saveBtn").style.display = "none";
                document.getElementById("delCouRow").style.display = "none";
                document.getElementById("addCouRow").style.display = "none";
            } else {
                document.getElementById("saveBtn").style.display = "block";
                document.getElementById("delCouRow").style.display = "block";
                document.getElementById("addCouRow").style.display = "block";
            }
            $('title').text("课程-修改");
            $(".xj-form-title").text("课程-修改");
            //根据id加载数据
            subjectId = $.xljUtils.getUrlParam("subjectId");
            getOjtSubjectById(subjectId);
            //$("#ojtSubjectFrom").find("input[name='id']").val(subjectId);
            $("#id").val(subjectId);
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
        //保存按钮
        $("#saveBtn").on('click', function () {
            if (type == 'add') {
                //如果已经保存了，要调用修改的方法 避免重复保存
                if (isSave && isSave != undefined && isSave == true) {
                    updateInfo();
                } else {
                    saveInfo();
                }
            } else if (type == 'update') {
                updateInfo();
            }
        });
        //点击增加试卷信息按钮，显示试卷列表
        $("#addPaperRow").on('click', function () {
            //初始化试卷列表
            intiPaperRow();
        });
        //删除试卷信息
        $("#delPaperRow").on('click', function () {
            delPaperRow();
        });
        //点击试卷列表中的确定按钮，增加试卷信息
        $("#addPaperRowBtn").on('click', function () {
            addPaperRow();
        });
        //取消增加试卷
        $("#canAddPaperBtn").on('click', function () {
        });
        //点击增加课件信息按钮，打开新增课件信息页面
        $("#addCouRow").on('click', function () {
            //window.open("ojt_subject_courseware_add.html");
            if (isSave) {
                addCouRow();
            } else {
                pop_tip_open("blue", "请先保存课件");
            }
        });
        //删除课件信息
        $("#delCouRow").on('click', function () {
            delCouRow();
        });
        // $("#hrCreateDate").val(new Date().toLocaleDateString().replace(/\//g, '-'));
        var dateTime = new Date(), timsStr = '';
        timsStr += dateTime.getFullYear() + '-';
        timsStr += dateTime.getMonth() + 1 + '-';
        timsStr += dateTime.getDate() + ' ';
        timsStr += dateTime.getHours() + ':';
        timsStr += dateTime.getMinutes() + ':';
        timsStr += dateTime.getSeconds();
        $("#hrCreateDate").val(timsStr);
        resizeGrid();
    });

    /**
     *  初始化当前登录用户的真实姓名
     */
    function initPersonName() {
        $.ajax({
            type: 'get',
            url: hostUrl + "ojt/hrOjtSubject/getRealName",
            success: function (data) {
                if (data != null && data.success && data.result != null) {
                    var realName = data.result.realName;
                    var userId = data.result.userId;
                    $("#ojtSubjectFrom").find("input[name='createPersonName']").val(realName);
                    $("#ojtSubjectFrom").find("input[name='userId']").val(userId);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     * 新增课程库主表信息
     */
    function saveInfo() {
        if (checkForm() && checkNameDuplicate()) {
            var ojtSubjectDto = {};
            ojtSubjectDto.delflag = 0;
            ojtSubjectDto.id = $("#id").val();
            ojtSubjectDto.name = $("#name").val();
            ojtSubjectDto.subjectTypeId = $("#type").val();//类型
            ojtSubjectDto.credit = $("#credit").val();//学分
            ojtSubjectDto.teacherName = $("#teacherName").val();//讲师
            ojtSubjectDto.remark = $("#remark").val();//简介
            ojtSubjectDto.ifDownload = $("[name=ifDownload]:checked").val();//允许下载
            ojtSubjectDto.hrCreateDate = new Date($("#hrCreateDate").val().replace(/-/g, '/')).getTime();//创建时间
            // ojtSubjectDto.status = $("[name = 'subjectStatus']:checked").val();//课程状态
            ojtSubjectDto.createPersonName = $('#createPersonName').val();
            ojtSubjectDto.createPersonId = $("#userId").val();
            ojtSubjectDto.subjectStatus = '1009100037';//新增课程默认未发布
            $.ajax({
                url: hostUrl + "ojt/hrOjtSubject/save/",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify(ojtSubjectDto),
                success: function (xhr, textStatus) {
                    if (xhr) {
                        if (xhr.success) {
                            subjectId = xhr.result;
                            $("#ojtSubjectFrom").find("input[name='id']").val(subjectId);
                            isSave = true;
                            //subjectId = ojtSubjectDto.id;
                            subjectTypeId = ojtSubjectDto.subjectTypeId;
                            $.xljUtils.tip("green", "保存成功！");
                            updateCoursewareInfo();
                        } else {
                            if (xhr.code == "50000") {
                                $.xljUtils.tip("red", xhr.msg);
                                return;
                            }
                            $.xljUtils.tip("red", "保存失败！");
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
            return true;
        }
    }

    /**
     * 修改课程主表信息
     * @param n
     */
    function updateInfo() {
        if (checkForm() && checkNameDuplicate()) {
            var ojtSubjectDto = {};
            ojtSubjectDto.delflag = 0;
            ojtSubjectDto.id = subjectId;
            ojtSubjectDto.name = $("#name").val();
            ojtSubjectDto.subjectTypeId = $("#type").val();//类型
            ojtSubjectDto.credit = $("#credit").val();//学分
            ojtSubjectDto.teacherName = $("#teacherName").val();//讲师
            ojtSubjectDto.remark = $("#remark").val();//简介
            ojtSubjectDto.ifDownload = $("[name=ifDownload]:checked").val();//允许下载
            ojtSubjectDto.hrCreateDate = new Date($("#hrCreateDate").val().replace(/-/g, '/')).getTime();//创建时间
            ojtSubjectDto.status = $("[name = 'subjectStatus']:checked").val();//课程状态
            /* ojtSubjectDto.subjectStatus = $("[name = 'subjectStatus']:checked").val();*/
            $.ajax({
                url: hostUrl + "ojt/hrOjtSubject/update/" + ojtSubjectDto.id,
                type: 'put',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify(ojtSubjectDto),
                success: function (resultData) {
                    if (resultData) {
                        var successFlag = resultData.success;
                        var result = resultData.result;
                        var msg = resultData.msg;
                        if (successFlag) {
                            subjectId = ojtSubjectDto.id;
                            subjectTypeId = ojtSubjectDto.subjectTypeId;
                            updateCoursewareInfo();
                            pop_tip_open("green", "数据修改成功！");
                        } else {
                            pop_tip_open("red", "数据修改失败！" + msg);
                        }
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "数据修改保存请求失败");
                }

            });
            return true;
        }
    }

    /**
     *  根据课件的id列表，增加课件信息
     * @param ids
     */
    function addCoursewareInfo(ids) {
        var ojtCoursewareDto = {}
        for (var i = 0; i < ids.length; i++) {
            ojtCoursewareDto[i] = {}
            var rowData = $('#listCourseware').jqGrid('getRowData', ids[i]);
            ojtCoursewareDto[i].id = rowData.id;
            ojtCoursewareDto[i].name = rowData.name;
            ojtCoursewareDto[i].classify = rowData.classify;
            ojtCoursewareDto[i].time = rowData.time;
            ojtCoursewareDto[i].startDate = new Date(rowData.startDate.replace(/-/g, '/')).getTime();
            ojtCoursewareDto[i].endDate = new Date(rowData.endDate.replace(/-/g, '/')).getTime();
            ojtCoursewareDto[i].source = rowData.source;
            ojtCoursewareDto[i].href = rowData.href;
            ojtCoursewareDto[i].remark = rowData.remark;
            ojtCoursewareDto[i].subjectId = rowData.subjectId;
            ojtCoursewareDto[i].playDuration = 0;
        }
        $.ajax({
            url: hostUrl + "ojt/hrOjtCourseware/saveList/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtCoursewareDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        console.log("增加课件成功！");
                        closePage(subjectId, subjectTypeId);
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "保存失败！");
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
     *  更新当前课程下的课件列表
     */
    function updateCoursewareInfo() {
        var ids = $("#listCourseware").jqGrid('getDataIDs');
        var oldIds = $("#coursewareIds").val();
        var idList = ids.toString().split(",");
        var oldIdList = oldIds.split(",");
        console.log("加载时课件id：" + idList.toString());
        console.log("保存时课件id：" + oldIdList.toString());
        var addList = new Array();
        var delList = new Array();
        for (var i = 0; i < idList.length; i++) {
            var isSame = true;
            for (var j = 0; j < oldIdList.length; j++) {
                if (idList[i] == oldIdList[j]) {
                    oldIdList.splice(j, 1);
                    isSame = false;
                    break;
                }
            }
            if (isSame)
                addList.push(idList[i]);
        }
        delList = oldIdList;
        console.log("需要增加的课件id：" + addList.toString());
        console.log("需要删除的课件id：" + delList.toString());
        if (delList.toString() != "") {
            //删除
            $.ajax({
                url: hostUrl + "/ojt/hrOjtCourseware/deletePseudoBatch/" + delList.toString(),
                type: 'DELETE',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({}),
                success: function (xhr, textStatus) {
                    console.log(xhr);
                    if (xhr) {
                        if (xhr.success) {
                            console.log("删除课件成功！");
                            if (addList.length == 0) {
                                // closePage();
                            }
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
        }
        if (addList.toString() == "") {
            closePage(subjectId, subjectTypeId);
        } else if (addList.length > 0) {
            addCoursewareInfo(addList);
        }
    }


    /**
     * 根据课程id加载课程信息
     */
    function getOjtSubjectById(subjectId) {
        var uBody = "/ojt/hrOjtSubject/get/" + subjectId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#ojtSubjectFrom").find("input[name='id']").val(data.result.sid);
                $("#ojtSubjectFrom").find("input[name='name']").val(data.result.name);
                $("#ojtSubjectFrom").find("input[name='credit']").val(data.result.credit);
                $("#ojtSubjectFrom").find("input[name='teacherName']").val(data.result.teacherName);
                $("#ojtSubjectFrom").find("input[name='examTimes']").val(data.result.examTimes);
                $("#ojtSubjectFrom").find("input[name='orgId']").val(data.result.orgId);
                $("#ojtSubjectFrom").find("input[name='createPersonName']").val(data.result.createPersonName);
                $("#ojtSubjectFrom").find("#userId").val(data.result.createPersonId);
                $("#ojtSubjectFrom").find("input[name='hrCreateDate']").val(data.result.hrCreateDate);
                $("#ojtSubjectFrom").find("input[name='type']").val(data.result.subjectTypeId);
                $("input[name='subjectStatus']").each(function () {
                    if ($(this).val() == data.result.subjectStatus) {
                        $(this).attr("checked", "checked");
                    }
                });
                $("#ojtSubjectFrom").find("input[name='stratDate']").val(data.result.stratDate);
                $("#ojtSubjectFrom").find("input[name='endDate']").val(data.result.endDate);
                $("#ojtSubjectFrom").find("#remark").val(data.result.remark);
                var orgName = $.hrUtils.getHROrgNameById(data.result.orgId);
                $("#ojtSubjectFrom").find("input[name='orgName']").val(orgName == undefined ? data.result.orgId : orgName);
                $("#subjectTypeId option[value='" + data.result.subjectTypeId + "']").attr("selected", true);
                $("#ojtSubjectFrom").find("input[name='status']").val(data.result.status);
                switch (data.result.status) {
                    case "1015100045":
                        $("#statusSpan").html("未生效");
                        break;
                    case "1015100046":
                        $("#statusSpan").html("已生效");
                        break;
                    case "1015100047":
                        $("#statusSpan").html("已失效");
                        break;
                }
                setCodeCheckData("ifPublic", data.result.ifPublic);
                getCanEditIfPublic(data.result.createPersonId);
                setCodeCheckData("ifDownload", data.result.ifDownload);
                $("#ifExam option[value='" + data.result.ifExam + "']").attr("selected", true);
                if (data.result.ifExam == "1009100037") {
                    $("#examTimes").attr("disabled", "disabled");
                }
                initCoursewareList(subjectId);
                // if (data.result.paperId!=undefined && data.result.paperId!='')
                //     initPaperList(data.result.paperId);
                // else
                //     initPaperList(-1);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化培训需求请求失败");
            }
        })
    }

    /**
     *  填充代码项的单选按钮
     * @param name
     * @param value
     */
    function setCodeCheckData(name, value) {
        $("input[name='" + name + "'][value='" + value + "']").attr("checked", true);
    }


    /**
     *  初始化课件列表，根据课程id获取该课程的所有课件信息
     * @param id
     */
    function initCoursewareList(id) {
        jqGridPost = jQuery("#listCourseware").jqGrid(
            {
                url: hostUrl + 'ojt/hrOjtCourseware/queryListByCondition',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                postData: {"delfalg": '0', "subjectId": id},
                autowidth: true,
                colNames: ['id', '课件名称', '课件分类', '课件时长（分）', /* '有效期起', '有效期止',*/ '课件简介', '课件来源', '链接地址', '课程ID'],
                colModel: [
                    {name: 'sid', index: 'sid', editable: true, sortable: false, hidden: true},
                    {name: 'name', index: 'name', editable: true, sortable: false, align: 'center'},
                    {
                        name: 'classify',
                        index: 'classify',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: classifyFmatter
                    },
                    {name: 'time', index: 'time', editable: true, sortable: false, align: 'center'},
                    /* {name: 'startDate', index: 'startDate', editable: true, sortable: false, align: 'center'},
                     {name: 'endDate', index: 'endDate', editable: true, sortable: false, align: 'center'},*/
                    {name: 'remark', index: 'remark', editable: true, sortable: false, align: 'center'},
                    {name: 'source', index: 'source', editable: true, sortable: false, align: 'center'},
                    {
                        name: 'href',
                        index: 'href',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: hrefFmatter
                    },
                    /*{
                        name: 'playProgress',
                        index: 'playProgress',
                        editable: true,
                        align: 'center',
                        sortable: false,
                        formatter: playProgressFmatter
                    },*/
                    {name: 'subjectId', index: 'subjectId', editable: true, sortable: false, hidden: true}
                ],
                // columns:[],
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false,
                    id: "sid"
                },
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#listCourseware ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#listCourseware').jqGrid("getGridParam", "selrow");
                    rowData = $('#listCourseware').jqGrid('getRowData', rowId);
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#listCourseware').setSelection(rowDataBefore.id, true);
                        $('#listCourseware ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
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
                        var ids = $("#listCourseware").jqGrid('getDataIDs');
                        $("#coursewareIds").val(ids.toString());
                    }
                }

            });
    }

    function classifyFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "0") {
            return "多媒体课件";
        } else if (cellvalue == "1") {
            return "普通课件";
        } else {
            return cellvalue;
        }
    }

    function hrefFmatter(cellvalue, options, rowObject) {
        if (cellvalue == null || cellvalue == "") {
            return "";
        } else {
            return "<a href='http://" + cellvalue + "' target='_blank'>" + cellvalue + "</a>";
        }
    }

    function playProgressFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "1009100036") {
            return "是";
        } else if (cellvalue == "1009100037") {
            return "否";
        } else {
            return "";
        }
    }

    /**
     *  初始化试卷列表，增加试卷时使用
     */
    function intiPaperRow() {/*
        //初始化试卷列表
        var tdwidth = ($(".modal-dialog").width()-130)/3;
        jqGridPost = jQuery("#listPaperForSelect").jqGrid(
            {
                url: hostUrl + 'ojt/hrOjtExamPapers/queryListByCondition',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                //postData: {"status": '1', "name": '', "type": ''},
                postData: {"delfalg": '0',status:"1015100046"},
                autowidth: true,
                shrinkToFit: false,
                colNames: ['id','试卷名称','分值','通过分数','考试时长','试卷说明'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'name', index: 'name', editable: true, sortable: false, align: 'center',width:tdwidth},
                    {name: 'totalScore', index: 'totalScore', editable: true, sortable: false, align: 'center',width:tdwidth},
                    {name: 'passScore', index: 'passScore', editable: true, sortable: false, align: 'center',width:tdwidth},
                    {name: 'duration', index: 'duration', editable: true, sortable: false, hidden: true},
                    {name: 'remark', index: 'remark', editable: true, sortable: false, hidden: true}
                ],
                // columns:[],
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#listPaperForSelect ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#listPaperForSelect').jqGrid("getGridParam", "selrow");
                    rowData = $('#listPaperForSelect').jqGrid('getRowData', rowId);
                },

                ondblClickRow: function () {
                    $("#addPaperRowBtn").click();
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#listPaperForSelect').setSelection(rowDataBefore.id, true);
                        $('#listPaperForSelect ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
                    }
                    // $("#userDiv .ui-jqgrid-bdiv table").jqGrid().setGridWidth($('#userDiv .mytable').width(), true);
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
                        //success
                    }
                }

            });*/
    }

    /**
     *  将试卷列表中的试卷信息移动到课程对应的试卷信息
     * @param rowData
     */
    function movePaperToAdd(rowData) {
        var ids = jQuery("#listPaperForAdd").jqGrid('getDataIDs');
        if (ids != '') {
            $.xljUtils.tip("blue", "每个课程只能对应一张试卷！");
            return;
        } else {
            $("#listPaperForAdd").jqGrid(
                {
                    colNames: ['id', '课件名称', '课件分类', '课件时长（分）', /* '有效期起', '有效期止',*/ '课件简介', '课件来源', '链接地址', '调整播放进度', '课程ID'],
                    colModel: [
                        {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                        {name: 'name', index: 'name', editable: true, sortable: false, align: 'center'},
                        {
                            name: 'classify',
                            index: 'classify',
                            editable: true,
                            sortable: false,
                            align: 'center',
                            formatter: classifyFmatter
                        },
                        {name: 'time', index: 'time', editable: true, sortable: false, align: 'center'},
                        /*  {name: 'startDate', index: 'startDate', editable: true, sortable: false, align: 'center'},
                          {name: 'endDate', index: 'endDate', editable: true, sortable: false, align: 'center'},*/
                        {name: 'source', index: 'source', editable: true, sortable: false, align: 'center'},
                        {name: 'href', index: 'href', editable: true, sortable: false},
                        {name: 'remark', index: 'remark', editable: true, sortable: false},
                        {name: 'schedule', index: 'schedule', editable: true, sortable: false},
                        {name: 'subjectId', index: 'subjectId', editable: true, sortable: false, hidden: true}
                    ],
                    multiselect: true,
                    multiboxonly: true,
                    rownumbers: true,
                    autowidth: true
                });
            $("#listPaperForAdd").jqGrid('addRowData', rowData.id, rowData, 'last');
            $("#listPaperForAdd").jqGrid('setSelection', rowData.id);
        }
    }

    /**
     *  增加试卷信息
     */
    function addPaperRow() {
        var rowId = $('#listPaperForSelect').jqGrid("getGridParam", "selrow");
        rowData = $('#listPaperForSelect').jqGrid('getRowData', rowId);
        movePaperToAdd(rowData);
    }

    /**
     *  删除试卷信息
     */
    function delPaperRow() {
        var ids = jQuery("#listPaperForAdd").jqGrid('getDataIDs');
        if (ids == undefined || ids == '') {
            $.xljUtils.tip("blue", "没有可以删除的试卷信息！");
            return;
        }
        var idsVal = $('#listPaperForAdd').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $("#listPaperForAdd").jqGrid("delRowData", idsVal[0]);
            });
        } else {
            $.xljUtils.tip("blue", "请选择要删除的试卷信息！");
            return;
        }
    }

    /**
     *  新增课件页面的回调方法，获取新增课件页面中新增的课件信息
     * @param rowData
     * @returns {*}
     */
    window.getCouRowData = function (rowData) {
        rowData.subjectId = $("#id").val();
        return addCouRow1(rowData);
    }

    /**
     *  将新增的课件信息显示到课程相关的课件信息列表中
     * @param rowData
     * @returns {number}
     */
    function addCouRow(rowData) {
        //先进行课程信息的修改或者保存
        var type = $.xljUtils.getUrlParam("type");
        if (type == 'add') {
            window.location.href = "ojt_subject_courseware_add.html?subjectId=" + subjectId;
        } else if (type == 'update') {
            if (updateInfo()) {
                window.location.href = "ojt_subject_courseware_add.html?subjectId=" + subjectId;
            }
        }

    }

    function addCouRow1(rowData) {
        var idsVal = $('#listCourseware').jqGrid('getDataIDs');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                for (var i = 0; i < idsVal.length; i++)
                    if (idsVal[i] == rowData.id) {
                        return 1;
                    }
            } else {
                if (idsVal == rowData.id) {
                    return 1;
                }
            }
            $("#listCourseware").jqGrid('addRowData', rowData.id, rowData, 'last');
        } else {
            $("#listCourseware").jqGrid(
                {
                    colNames: ['id', '课件名称', '课件分类', '课件时长（分）', '有效期起', '有效期止', '课件简介', '课件来源', '链接地址', '调整播放进度', '课程ID'],
                    colModel: [
                        {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                        {name: 'name', index: 'name', editable: true, sortable: false, align: 'center'},
                        {
                            name: 'classify',
                            index: 'classify',
                            editable: true,
                            sortable: false,
                            align: 'center',
                            formatter: classifyFmatter
                        },
                        {name: 'time', index: 'time', editable: true, sortable: false, align: 'center'},
                        {name: 'startDate', index: 'startDate', editable: true, sortable: false, align: 'center'},
                        {name: 'endDate', index: 'endDate', editable: true, sortable: false, align: 'center'},
                        {name: 'source', index: 'source', editable: true, sortable: false, align: 'center'},
                        {name: 'href', index: 'href', editable: true, sortable: false},
                        {name: 'remark', index: 'remark', editable: true, sortable: false},
                        {name: 'schedule', index: 'schedule', editable: true, sortable: false},
                        {name: 'subjectId', index: 'subjectId', editable: true, sortable: false, hidden: true}
                    ],
                    multiselect: true,
                    multiboxonly: true,
                    rownumbers: true,
                    autowidth: true
                });
        }
        return 0;
    }


    /**
     *  删除课件列表
     */
    function delCouRow() {
        /*var ids = jQuery("#listCourseware").jqGrid('getDataIDs');
        if(ids==undefined ||ids == '') {
            $.xljUtils.tip("blue", "没有可以删除的课件信息！");
            return;
        }*/
        var idsVal = $('#listCourseware').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            var selectedRowIds = idsVal.toString();
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $.ajax({
                    url: hostUrl + "/ojt/hrOjtCourseware/deleteBatch/" + idsVal,
                    type: 'DELETE',
                    dataType: 'JSON',
                    contentType: 'application/json',
                    data: JSON.stringify({}),
                    success: function (xhr, textStatus) {
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "数据删除成功！");
                                $('#listCourseware').jqGrid("setGridParam", {}).trigger("reloadGrid");
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
        } else {
            $.xljUtils.tip("blue", "请选择要删除的课件信息！");
            return;
        }
    }

    window.ifExamChange = function (e) {
        if (e.value == "1009100037") {
            $("#examTimesTip").hide();
            $("#examTimes").attr("disabled", "disabled");
        } else if (e.value == "1009100036") {
            $("#examTimesTip").show();
            $("#examTimes").removeAttr("disabled");
        }
    }

    function getCanEditIfPublic(createPersonId) {
        var uAll = hostUrl + "ojt/hrOjtSubject/canEditIfPublic/" + createPersonId;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                if (data.success) {
                    if (data.result) {
                        $("#ifPublicYes").removeAttr("disabled");
                        $("#ifPublicNo").removeAttr("disabled");
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log(XMLHttpRequest);
            }
        })
    }

    /**
     *  获取机构信息
     * @param data
     */
    window.orgCallback = function (data) {
        var orgId = data.id;
        $("#orgId").val(data.id);
        // $("#orgName").val(data.name);
        $("#orgName").val(data.prefixName);

    };

    //关闭页面
    function closePage(subjectId, subjectTypeId) {
        //重新加载父页面
        /* if(window.opener.reloadSubjectList!=undefined) {
             window.opener.reloadSubjectList(subjectId, subjectTypeId);
         }*/
        //关闭本页面
        window.close();
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

        //时分
        $('.datetimepicker3').datetimepicker({
            language: 'zh-CN',
            format: 'hh:ii',
            startView: 1,
            autoclose: true
        });

        //只选择年月
        $('.datetimepickerM').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN'
        });

        //只选择年
        $('.datetimepickerY').datetimepicker({
            format: 'yyyymm',
            weekStart: 1,
            autoclose: true,
            startView: 4,
            minView: 4,
            forceParse: false,
            language: 'zh-CN'
        });
    }

    $("#closePage").click(function () {
        window.location.href = "ojt_subject.html";
    });

    /**
     * 表单验证
     * @returns {boolean}
     */
    function checkForm() {
        var flag = true;
        var name = $("#name").val();
        if (name == null || name == '' || name == undefined) {
            flag = false;
        }
        var type = $("#type").val();
        if (type == null || type == '' || type == undefined) {
            flag = false;
        }
        var teacherName = $("#teacherName").val();
        if (teacherName == null || teacherName == '' || teacherName == undefined) {
            flag = false;
        }
        if (!flag) {
            $.xljUtils.tip("blue", "请将信息填写完整！");
            return flag;
        }
        var credit = $("#credit").val();
        if (credit == null || credit == '' || credit == undefined) {
            $.xljUtils.tip("blue", "请输入学分！");
            return false;
        } else {
            if (!isNumber(credit)) {
                $.xljUtils.tip("blue", "学分请输入数值类型！");
                return false;
            }
        }
        return flag;
    }

    /**
     * 校验名称是否重复
     */
    function checkNameDuplicate() {
        var flag = true;//不存在
        var dto = {};
        dto.name = $('#name').val();
        dto.delflag = 0;
        $.ajax({
            url: hostUrl + "ojt/hrOjtSubject/queryList/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify(dto),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        if (xhr.result != null && xhr.result.length > 0) {
                            //修改要排除本单据
                            if (isSave && isSave != undefined && isSave == true) {
                                for (var i = 0; i < xhr.result.length; i++) {
                                    var id = $('#id').val();
                                    if (id == xhr.result[i].sid) {
                                        continue;
                                    } else {
                                        flag = false;//存在
                                        $.xljUtils.tip("blue", "课程名称不能重复！");
                                        break;
                                    }
                                }
                            } else {
                                flag = false;//存在
                                $.xljUtils.tip("blue", "课程名称不能重复！");
                            }

                        }
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
        return flag;
    }

    /**
     * 判断是否输入的是数值类型
     * @param oNum
     * @return {boolean}
     */
    function isNumber(oNum) {
        if (!oNum) return false;
        var strP = /^\d+(\.\d+)?$/;
        if (!strP.test(oNum)) return false;
        try {
            if (parseFloat(oNum) != oNum) return false;
        }
        catch (ex) {
            return false;
        }
        return true;
    }
})(jQuery, window, document);