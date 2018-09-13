/**
 * Created by xph on 2017/7/12.
 */

(function ($, window, document, undefined) {
    var rowData;
    var rowDataBefore;
    var jqGridPost;
    var planId;
    var startUpStatus;

    //启动考试通知对象
    var startNoticePerson;

    var deptId;

    //手动的调整窗口时
    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
        resizeGrid();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        var leftHeight = $(".slide-left").height();
        $(".right-content").height(leftHeight);
        $(".right-content").niceScroll({
            autohidemode: false,
            cursorcolor: "#eee",
            cursorwidth: "6px", // 滚动条的宽度，单位：便素
            cursorborder: "1px solid #eee", // CSS方式定义滚动条边框
            horizrailenabled: true, // nicescroll可以管理水平滚动
            background: "#fff"
        });
        $(".right-content").getNiceScroll().show().resize();
        //表示con-table 下的mytable1
        // $(".con-table .mytable1").height((w_h - 80) + "px");
    }
    //计算表格宽度
    function resizeGrid() {
        //右边一个列表
        $(".ui-jqgrid-bdiv table").jqGrid().setGridHeight($('.mytable').height() - 45);
        $(".ui-jqgrid-bdiv table").jqGrid().setGridWidth($('.mytable').width()-2, true);
        $.xljUtils.gridResizeFn();
    }

    //上来就执行
    $(function () {
        /*控制页面左右滚动条*/
        var h = $(window).height();
        var w = $(window).width();
        //alert($(".slide-left .ztree-box").width());
        //$(".right-content").css("width",(w-leftWidth-15)+"px");
        // $(".right-content").css("overflow-y","scroll");
        resizeHeight();
        initPersonDeptId()
        initDatetimepicker();
        updateExamInfoStatus();
        initSetting();
        initPlanTree();
        initPaperList();
        initPersonList();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        //清除input框内容
        $('#valueEmpty').click(function (e) {
            e.preventDefault();
            $(this).parents('.fullWidth').children('input').val('');
        });
        $("#saveBtn").on('click', function () {
            // if ($("#isSave").val()=="0"){
            //     $.xljUtils.tip("blue", "请选择左侧考试计划后再操作！");
            //     return;
            // }
            if ($("#startUpStatus").val()!="0"&&$("#startUpStatus").val()!=""){
                $.xljUtils.tip("blue", "当前计划状态已启动过，无法修改！");
                return;
            }
            $("#ojtPlanFrom").attr("data-validate-success", "saveInfo(1)");
            $("#ojtPlanFrom").submit();
        });
        $("#addBtn").on('click', function () {
            // window.open("ojt_plan_add.html");
            setPageStatus(0);
            initUuid();
            $("#isSave").val("0");
            $("#startUpStatusValue").html("未启动");
            $("#startUpStatus").val("0");
        });
        $("#delBtn").on('click', function () {
            deletePlan();
        });
        $("#searchPlanBtn").on('click', function () {
            var searchName = $("#key").val();
            initPlanTree(searchName);
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
        //启动计划
        $("#startBtn").on('click', function () {
            // if ($("#isSave").val()=="0"){
            //     $.xljUtils.tip("blue", "请选择左侧考试计划后再操作！");
            //     return;
            // }
            $.xljUtils.confirm("blue", "确认要启动该计划吗？", function () {
                $("#ojtPlanFrom").attr("data-validate-success", "saveInfo(0)");
                $("#ojtPlanFrom").submit();
            },true);
        });
        //暂停计划
        $("#pauseBtn").on('click', function () {
            setPlanStartUpStatus(2);
        });
        //结束计划
        $("#endBtn").on('click', function () {
            // if ($("#isSave").val()=="0"){
            //     $.xljUtils.tip("blue", "请选择左侧考试计划后再操作！");
            //     return;
            // }
            setPlanStartUpStatus(3);
        });
        //选择人员
        $("#choicePersonDisplayBtn").on('click', function () {
            if(!havePaper()) {
                $.xljUtils.tip("blue", "请先设置试卷信息再选择人员！");
            }else {
                // alert($("#ojtPlanFrom").find("input[name='id']").val());
                $("#choicePersonBtn").click();
            }
        });

        // //发布成绩
        // $("#releaseResults").on('click', function () {
        //     releaseResults();
        // });
        setBtnStatus(3);
        setPageStatus(1);

        resizeGrid();
    });

    /**
     *  初始化左侧考试计划树
     */
    function initPlanTree(planName) {
        $("#treeDemo_1_ul").empty();
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtExamAct/queryListByCondition",
            data: JSON.stringify({"name":planName,deptId:deptId}),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                var result = data.result;
                if(result==null||result.length==0){
                    return;
                }

                for(var i =0;i<data.result.length;i++){
                    $("#treeDemo_1_ul").append('' +
                        '<li class="level1" tabindex="0" hidefocus="true" > ' +
                        '<a  class="level1"  target="_blank" style="color:#333;font-weight:normal;font-style:normal;' +
                        '"onclick="clickTreeNode(this)"> ' +
                        '<span id="treeDemo_2_ico" title="" treenode_ico="" class="button diy-company_ico_close" style=""></span>'+
                        '<span class="node_name" name="'+result[i].id+'">'+result[i].name+'</span> ' +
                        '</a> ' +
                        '</li>')
                }
                if(planId != null && planId != "") {
                    $("#treeDemo_1_ul").find("span[name="+planId+"]").parent().click();
                }else {
                    $("#treeDemo_1_ul").find("li a:first").click();
                }
            }
        });

    }

    /**
     *  点击左侧类别树后改变样式并刷新右侧表格
     */
    window.clickTreeNode = function (e){
        //改变选中树节点的样式
        $("#treeDemo_1").find("a").removeClass("curSelectedNode");
        $(e).addClass("curSelectedNode");
        var planId = $(e).children("span:last").attr("name");
        if (e.className.indexOf("level0")!=-1){
            planId = '';
        }

        $("#yes").attr("disabled","disabled");
        $("#no").attr("disabled","disabled");


        $("#id").val(planId);
        $("#isSave").val("1");
        //更新右侧显示信息
        var uBody = "ojt/hrOjtExamAct/get/" + planId + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                //根据结果集 解析、赋值、显示
                $("#ojtPlanFrom").find("input[name='id']").val(data.result.id);
                $("#planForm").find("input[name='orgId']").val(data.result.orgId);
                $("#ojtPlanFrom").find("input[name='paperId']").val(data.result.paperId);
                $("#planForm").find("input[name='name']").val(data.result.name);
                $("#planForm").find("input[name='startDate']").val(data.result.startDate);
                $("#planForm").find("input[name='endDate']").val(data.result.endDate);
                $("#planForm input[name='ifPublic']").attr("checked", false);
                $("#planForm input[name='ifPublic'][value='"+data.result.ifPublic+"']").prop("checked", 'checked');
                getCanEditIfPublic(data.result.createPersonId);
                $("#status").val(data.result.status);
                $("#planForm").find("textarea[name='remark']").val(data.result.remark);
                $("input[name='startUpStatus']").val(data.result.startUpStatus);
                switch (data.result.startUpStatus){
                    case "0":
                        $("span#startUpStatusValue").html("未启动");
                        break;
                    case "1":
                        $("span#startUpStatusValue").html("启动");
                        break;
                    case "2":
                        $("span#startUpStatusValue").html("暂停");
                        break;
                    case "3":
                        $("span#startUpStatusValue").html("收卷");
                        break;
                }
                var org = $.hrUtils.getOrgById(data.result.orgId);
                $("#planForm").find("input[name='orgName']").val(org.prefixName == undefined?data.result.orgId:org.prefixName);

                // $("#paperId").val(data.result.paperId);

                //根据试卷id获取试卷信息
                if(data.result.paperId) {
                    getPaperInfoById(data.result.paperId);
                }
                //根据计划id获取人员信息
                getPersonInfoByPlan(data.result);

                startUpStatus = data.result.startUpStatus;
                //根据计划状态设置页面控件及按钮是否可用
                if (data.result.startUpStatus == "0"){
                    setPageStatus(2);
                }else {
                    setPageStatus(1);
                }
                setBtnStatus(data.result.startUpStatus);
                $(".has-success").removeClass("has-success");
                $(".has-error").removeClass("has-error");
                $(".error").remove();
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化考试计划请求失败");
            }
        })
    }

    /**
     *  初始化计划相关联的考试信息表格，但不加载数据
     */
    function initPaperList(){
        jqGridPost = jQuery("#listPlanPaper").jqGrid(
            {
                url: hostUrl + 'ojt/hrOjtExamPapers/queryListByCondition',//创建完成之后请求数据的url
                datatype: "local",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                //postData: {"status": '1', "name": '', "type": ''},
                autowidth: true,
                colNames: ['id','试卷名称','分值','通过分数','考试时长','试卷说明'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'name', index: 'name', editable: true, sortable: false, align: 'center'},
                    {name: 'totalScore', index: 'totalScore', editable: true, sortable: false, align: 'center'},
                    {name: 'passScore', index: 'passScore', editable: true, sortable: false, align: 'center'},
                    {name: 'duration', index: 'duration', editable: true, sortable: false, align: 'center'},
                    {name: 'remark', index: 'remark', editable: true, sortable: false, align: 'center'}
                ],
                // columns:[],
                multiselect: true,
                multiboxonly: true,
                // rownumbers: true,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#listPlanPaper ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#listPlanPaper').jqGrid("getGridParam", "selrow");
                    rowData = $('#listPlanPaper').jqGrid('getRowData', rowId);
                },
                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    /*$.xljUtils.gridResizeFn();*/
                    rowDataBefore = rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#listPlanPaper').setSelection(rowDataBefore.id, true);
                        $('#listPlanPaper ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
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
                                // $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                    } else {
                        //success
                    }
                }

            });
    }

    /**
     *  根据试卷ID获取试卷信息，加载到已初始化好的表格中
     * @param paperId
     */
    function getPaperInfoById(paperId) {
        jQuery("#listPlanPaper").jqGrid("clearGridData");
        if(paperId == ''){
            return;
        }
        $("#listPlanPaper").jqGrid('setGridParam',{
            datatype:'json',
            postData:{"delfalg": '0',"id":paperId}
        }).trigger('reloadGrid');//动态赋值
    }
    /**
     *  根据计划获取人员信息，加载到已初始化好的表格中
     */
    function getPersonInfoByPlan(plan) {
        jQuery("#listPlanPerson").jqGrid("clearGridData");
        $("#listPlanPerson").jqGrid('setGridParam',{
            datatype:'json',
            postData: {"planId": plan.id, "paperId": plan.paperId},
        }).trigger('reloadGrid');//动态赋值
    }

    /**
     *  初始化计划相关联人员信息表格，但不加载数据
     */
    function initPersonList() {
        $("#listPlanPerson").jqGrid({
            url: hostUrl + 'ojt/hrOjtExamInfo/queryListByCondition',//创建完成之后请求数据的url
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
            ajaxGridOptions: {contentType: 'application/json'},
            contentType: "application/json",
            // postData: {"planId": plan.id, "paperId": plan.paperId},
            autowidth: true,
            colNames: ['id','人员id','机构负责人id','姓名','人员编号','所属机构','岗位','试卷状态','得分','考试用时','考试次数'],
            colModel: [
                {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                {name: 'personId', index: 'personId', editable: true, sortable: false, hidden: true},
                {name: 'chargeId', index: 'chargeId', editable: true, sortable: false, hidden: true},
                {name: 'personName', index: 'personName', editable: true, sortable: false, align: 'center'},
                {name: 'personCode', index: 'personCode', editable: true, sortable: false, align: 'center'},
                {name: 'orgName', index: 'orgName', editable: true, sortable: false, align: 'center'},
                {name: 'postName', index: 'postName', editable: true, sortable: false, align: 'center'},
                {
                    name: 'examStatus',
                    index: 'examStatus',
                    editable: true,
                    sortable: false,
                    align: 'center',
                    formatter:codeFmatter
                },
                {name: 'score', index: 'score', editable: true, sortable: false, align: 'center'},
                {name: 'time', index: 'time', editable: true, sortable: false, align: 'center'},
                {name: 'times', index: 'times', editable: true, sortable: false, align: 'center'}
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
                    $('#listPlanPerson ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                }
            },
            onSelectRow: function () {
                var rowId = $('#listPlanPerson').jqGrid("getGridParam", "selrow");
                rowData = $('#listPlanPerson').jqGrid('getRowData', rowId);
            },
            gridComplete: function () {
                $.xljUtils.addGridScroll();
                $.xljUtils.gridResizeFn();
                rowDataBefore = rowData;
                if (rowDataBefore != null && rowDataBefore != 'undefined') {
                    //添加回显选中行样式
                    $('#listPlanPerson').setSelection(rowDataBefore.id, true);
                    $('#listPlanPerson ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
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
                            // $.xljUtils.tip("red", "查询数据失败！");
                            break;
                    }
                } else {
                    //success
                }
            }

        });
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
     * 修改考试计划
     */
    window.saveInfo = function(isStart) {
        var isSave = $("#isSave").val();
        //序列化表单数组
        var ojtPlanArr = $("#ojtPlanFrom").serializeArray();
        var ojtPlanDto = {};
        ojtPlanDto.delflag = 0;
        //将表单数组转化为 数据传输对象
        for (var i in ojtPlanArr) {
            if (ojtPlanArr[i].name == "startDate" || "endDate" == ojtPlanArr[i].name) {
                var date = ojtPlanArr[i].value.replace(/-/g, '/');
                if (date != "") {
                    ojtPlanDto[ojtPlanArr[i].name] = new Date(date).getTime();
                }
                // var date = ojtPlanArr[i].value.split(':');
                // if (date != "") {
                //     ojtPlanDto[ojtPlanArr[i].name] = new Date(date[0]*1000*60*60+date[1]*1000*60).getTime();
                // }
            } else if("orgName" == ojtPlanArr[i].name){
            } else {
                ojtPlanDto[ojtPlanArr[i].name] = ojtPlanArr[i].value;
            }
        }
        if(ojtPlanDto.startDate>ojtPlanDto.endDate){
            $.xljUtils.tip("blue", "开始时间不能大于结束时间！");
            return;
        }
        if (havePaper()){
            ojtPlanDto.paperId = jQuery("#listPlanPaper").jqGrid('getDataIDs').toString();
        }else {
            ojtPlanDto.paperId = null;
        }
        $.ajax({
            url: baseUrl + (isSave==0?"ojt/hrOjtExamAct/save":("ojt/hrOjtExamAct/update/" + ojtPlanDto.id)),
            type: isSave==0?'POST':'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtPlanDto),
            success: function (xhr, textStatus) {
                console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        $("#isSave").val("1");
                        var odlPaperId = $("#paperId").val();
                        $("#paperId").val(ojtPlanDto.paperId);
                        if(isStart==0){
                            if($("#status option:selected").val()=="0"){
                                $.xljUtils.tip("blue", "草稿状态的计划无法启动！");
                                return;
                            }
                            if (!havePaper()){
                                $.xljUtils.tip("blue", "没有设置试卷信息的计划无法启动！");
                                return;
                            }
                            var flag = setPlanStartUpStatus(1);
                            if(flag) {
                                console.log("发送通知");
                                var personIds = $("#listPlanPerson").jqGrid('getCol', 'personId', false).toString();
                                if (personIds != "") {
                                    var paperName = $('#listPlanPaper').jqGrid('getRowData', ojtPlanDto.paperId).name;
                                    var startDate = new Date(ojtPlanDto.startDate);
                                    var endDate = new Date(ojtPlanDto.endDate);
                                    var beginTime = startDate.getHours() - 8 + ":" + startDate.getMinutes();
                                    var endTime = endDate.getHours() - 8 + ":" + endDate.getMinutes();
                                    var prompt = "";

                                    var chargeIds = $("#listPlanPerson").jqGrid('getCol', 'chargeId', false).toString();
                                    var promptIds = personIds + (chargeIds != "" ? "," + chargeIds : "");
                                    for(var i = 0;i<promptIds.split(",").length;i++){
                                        prompt+="您被安排于" + beginTime + "至" + endTime +
                                            "参加一场考试，考试内容为：" + paperName + "，请您做好准备！"+",";
                                    }
                                    prompt = prompt.substr(0,prompt.length-1);
                                    promptPersonToExam(promptIds, prompt);
                                }
                            }
                        }else {
                            if(odlPaperId != ojtPlanDto.paperId){
                                $.ajax({
                                    url: baseUrl + "ojt/hrOjtExamInfo/updateListPaperId",
                                    type: 'post',
                                    dataType: 'JSON',
                                    contentType: 'application/json',
                                    data: JSON.stringify({
                                        "paperId": ojtPlanDto.paperId,
                                        "oldPaperId": odlPaperId,
                                        "planId": ojtPlanDto.id
                                    }),
                                    success: function (resultData) {
                                        if (resultData) {
                                            var successFlag = resultData.success;
                                            var result = resultData.result;
                                            var msg = resultData.msg;
                                            if (successFlag) {
                                                $.xljUtils.tip("green", "保存成功！");
                                                planId = ojtPlanDto.id;
                                                initPlanTree();
                                            } else {
                                                pop_tip_open("red", "更新考试人员信息失败！");
                                            }
                                        }
                                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        pop_tip_open("red", "更新考试人员信息请求失败");
                                    }

                                });
                            }else {
                                $.xljUtils.tip("green", "保存成功！");
                            }
                        }
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
     *  删除考试计划
     */
    function deletePlan(){
        var selectPlan = $("#treeDemo_1_ul").find("a.curSelectedNode");
        var delId = $(selectPlan).children("span:last").attr("name");
        if (delId == undefined){
            $.xljUtils.tip("blue", "请选择考试计划后再删除！");
            return;
        }
        var status = $("#status option:selected").val();
        if (status == "1"){
            $.xljUtils.tip("blue", "您不能删除一个有效的考试计划！");
            return;
        }
        $.xljUtils.confirm("blue", "确认要删除这条数据吗？", function () {
            $.ajax({
                url: baseUrl + "/ojt/hrOjtExamAct/deletePseudoBatch/" + delId,
                type: 'DELETE',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify({}),
                success: function (xhr, textStatus) {
                    console.log(xhr);
                    if (xhr) {
                        if (xhr.success) {
                            $.xljUtils.tip("green", "数据删除成功！");
                            initPlanTree();
                            // $("#isSave").val("0");
                            // initUuid();
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

    /**
     *  初始化试卷列表，增加试卷时使用
     */
    function intiPaperRow(){
        // var selectPlan = $("#treeDemo_1_ul").find("a.curSelectedNode");
        // var delId = $(selectPlan).children("span:last").attr("name");
        // if (delId == undefined){
        //     $.xljUtils.tip("blue", "请选择考试计划后再设置试卷信息！");
        //     return;
        // }
        $("#treeModa3").modal('show');
        //初始化试卷列表
        var tdwidth = ($(".modal-dialog").width()-130)/3;
        jqGridPost = jQuery("#listPaperForPlan").jqGrid(
            {
                url: hostUrl + 'ojt/hrOjtExamPapers/queryListByCondition',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                //postData: {"status": '1', "name": '', "type": ''},
                postData: {"delfalg": '0',status:"1015100046"},
                autowidth: true,
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
                        $('#listPaperForPlan ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#listPaperForPlan').jqGrid("getGridParam", "selrow");
                    rowData = $('#listPaperForPlan').jqGrid('getRowData', rowId);
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
                        $('#listPaperForPlan').setSelection(rowDataBefore.id, true);
                        $('#listPaperForPlan ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
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
                                // $.xljUtils.tip("red", "查询数据失败！");
                                break;
                        }
                    } else {
                        //success
                    }
                }

            });
    }

    /**
     *  将试卷列表中的试卷信息移动到课程对应的试卷信息
     * @param rowData
     */
    function movePaperToAdd(rowData){
        if(havePaper()){
            $.xljUtils.tip("blue", "每个课程只能对应一张试卷！");
            return;
        }else {
            // $("#listPlanPaper").jqGrid(
            //     {
            //         colNames: ['id', '试卷名称', '分值', '通过分数', '考试时长', '试卷说明'],
            //         colModel: [
            //             {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
            //             {name: 'name', index: 'name', editable: true, sortable: false, align: 'center'},
            //             {name: 'totalScore', index: 'totalScore', editable: true, sortable: false, align: 'center'},
            //             {name: 'passScore', index: 'passScore', editable: true, sortable: false, align: 'center'},
            //             {name: 'duration', index: 'duration', editable: true, sortable: false, align: 'center'},
            //             {name: 'remark', index: 'remark', editable: true, sortable: false, align: 'center'}
            //         ],
            //         multiselect: true,
            //         multiboxonly: true,
            //         rownumbers: true,
            //         autowidth:true
            //     });
            $("#listPlanPaper").jqGrid("clearGridData");
            $("#listPlanPaper").jqGrid('addRowData',rowData.id, rowData);
            $("#listPlanPaper").jqGrid('setSelection',rowData.id);
        }
    }

    /**
     *  增加试卷信息
     */
    function addPaperRow(){
        var rowId = $('#listPaperForPlan').jqGrid("getGridParam", "selrow");
        if(rowId != ""){
            rowData = $('#listPaperForPlan').jqGrid('getRowData', rowId);
            movePaperToAdd(rowData);
        }
    }

    /**
     *  删除试卷信息
     */
    function delPaperRow(){
        if(!havePaper()) {
            $.xljUtils.tip("blue", "没有可以删除的试卷信息！");
            return;
        }
        var idsVal = $('#listPlanPaper').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            $.xljUtils.confirm("blue", "确认要删除这【" + idsVal.length + "】条数据吗？", function () {
                $("#listPlanPaper").jqGrid("delRowData", idsVal[0]);
                // $("#paperId").val("");
            });
        }else {
            $.xljUtils.tip("blue", "请选择要删除的试卷信息！");
            return;
        }
    }


    /**
     *  更新当前计划关联的人员列表
     */
    function updatePersonInfo(personIds,personInfo){
        var ids = personIds;
        var personIdColmunData = $("#listPlanPerson").jqGrid('getCol','personId',false);
        var examStatusColmunData = $("#listPlanPerson").jqGrid('getCol','examStatus',false);
        var idList = ids.split(",");
        var oldIdList = personIdColmunData.toString().split(",");
        console.log("加载时人员id："+oldIdList.toString());
        console.log("选择的人员id："+idList.toString());
        var addList = new Array();
        var updateList = new Array();
        for(var i = 0; i< idList.length;i++){
            var isSame = false;
            for(var j = 0; j< oldIdList.length;j++) {
                if(idList[i]==oldIdList[j]){
                    if (examStatusColmunData[j]=="已考") {
                        updateList.push(idList[i]);
                    }else if (examStatusColmunData[j]=="未考") {
                    }
                    isSame = true;
                    break;
                }
            }
            if(!isSame) {
                addList.push(idList[i]);
            }
        }
        console.log("需要增加的人员id："+addList.toString());
        console.log("需要修改的人员id："+updateList.toString());
        var addNameList = "";
        var updateNameList = "";
        if(addList.toString()!="") {
            for(var i = 0; i< addList.length;i++){
                addNameList+=personInfo[addList[i]]+",";
            }
            addNameList = addNameList.substring(0, addNameList.length - 1);
            // addPersonInfo(addList);
        }
        if(updateList.toString()!="") {
            for(var i = 0; i< updateList.length;i++){
                updateNameList+=personInfo[updateList[i]]+",";
            }
            updateNameList = updateNameList.substring(0, updateNameList.length - 1);
            // alert(updateNameList);
        }
        var confirmText = "将会安排";
        if (addNameList != "")
            confirmText+= " "+addNameList+" 共"+addList.length+"位人员参加考试，";
        if (updateNameList != "")
            confirmText+= " "+updateNameList+" 共"+updateList.length+"位人员重考，";
        confirmText+="确定继续吗？";
        if (confirmText != "将会安排确定继续吗？") {
            $.xljUtils.confirm("blue", confirmText, function () {
                var personIds = "";
                if(addList.toString()!="") {
                    addPersonList(addList);
                    personIds = addList.toString();
                }
                if(updateList.toString()!="") {
                    updatePersonList(updateList);
                    if (personIds==""){
                        personIds = updateList.toString();
                    }else {
                        personIds += ","+updateList.toString();
                    }
                }
                if(startUpStatus != 0 && startUpStatus != 3 && personIds != ""){
                    var startDate = $("#startDate").val();
                    var endDate = $("#endDate").val();
                    var paperName = $("#listPlanPaper").jqGrid('getCol','name',false)[0];
                    var prompt = "";
                    for(var i = 0;i<personIds.split(",").length;i++){
                        prompt+="您被安排于"+startDate+ "至"+endDate+
                            "参加一场考试，考试内容为："+paperName+"，请您做好准备！"+",";
                    }
                    prompt = prompt.substr(0,prompt.length-1);
                    promptPersonToExam(personIds,prompt);
                }
            }, true);
        }
    }

    /**
     *  根据人员id集合新增考试情况信息
     * @param addList
     */
    function addPersonList(addList){
        var infoList = new Array();
        var ids = jQuery("#listPlanPaper").jqGrid('getDataIDs');
        var paperId = ids[0];
        for (var i = 0; i < addList.length; i++){
            var info = {};
            info.personId = addList[i];
            info.paperId = paperId;
            info.planId = $("#id").val();
            info.examStatus = "1127100242";
            info.times = 0;
            infoList.push(info);
        }
        $.ajax({
            url: baseUrl + "ojt/hrOjtExamInfo/saveBatch",
            type: 'post',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(infoList),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        $("#listPlanPerson").jqGrid().trigger('reloadGrid');
                    } else {
                        pop_tip_open("red", "设置人员参加考试计划失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "设置人员参加考试计划请求失败");
            }

        });
    }

    /**
     *  根据人员id集合批量修改考试情况信息为未考
     * @param updateList
     */
    function updatePersonList(updateList){
        var planId = $("#id").val();
        var ids = jQuery("#listPlanPaper").jqGrid('getDataIDs');
        var paperId = ids[0];
        var postData = {};
        postData.planId = planId;
        postData.paperId = paperId;
        postData.personIds = updateList;
        $.ajax({
            url: baseUrl + "ojt/hrOjtExamInfo/updateBatch",
            type: 'post',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        $("#listPlanPerson").jqGrid().trigger('reloadGrid');
                    } else {
                        pop_tip_open("red", "修改人员考试状态失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "修改人员考试状态请求失败");
            }

        });
    }


    /**
     *  修改当前计划启动状态
     * @param status
     */
    function setPlanStartUpStatus(status) {
        // if($("#isSave").val()=="0"){
        //     $.xljUtils.tip("blue", "请选择左侧考试计划后再操作！");
        //     return;
        // }
        var startUpStatus = $("#startUpStatus").val();
        switch (status){
            case 1:
                if (startUpStatus==1 || startUpStatus==3){
                    $.xljUtils.tip("blue", "当前计划状态无法启动！");
                    return false;
                }
                break;
            case 2:
                if ($("#startUpStatus").val()!="1"){
                    $.xljUtils.tip("blue", "当前计划状态无法暂停！");
                    return false;
                }
                break;
            case 3:
                if ($("#startUpStatus").val()=="0"||$("#startUpStatus").val()=="3"){
                    $.xljUtils.tip("blue", "当前计划状态无法收卷！");
                    return false;
                }
                $.xljUtils.confirm("blue", "确认要结束该计划吗？", function () {
                    updateStartUpStaatus(startUpStatus,status);
                },true);

                break;
        }
        if(status != 3){
            updateStartUpStaatus(startUpStatus,status);
            if(status==1){
                return true;
            }
        }
        return false;
    }

    function updateStartUpStaatus(startUpStatus,status){
        $.ajax({
            url: baseUrl + "ojt/hrOjtExamAct/update/" + $("#id").val(),
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"startUpStatus":status}),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        switch (status){
                            case 1:
                                $.xljUtils.tip("green", "启动成功！");
                                $("#startUpStatus").val("1");
                                $("span#startUpStatusValue").html("启动");
                                setPageStatus(1);
                                break;
                            case 2:
                                $.xljUtils.tip("green", "暂停成功！");
                                $("#startUpStatus").val("2");
                                $("span#startUpStatusValue").html("暂停");
                                setPageStatus(1);
                                break;
                            case 3:
                                $.xljUtils.tip("green", "收卷成功！");
                                $("#startUpStatus").val("3");
                                $("span#startUpStatusValue").html("收卷");
                                setPageStatus(1);
                                break;
                        }
                        startUpStatus = status;
                        setBtnStatus(status);
                    } else {
                        pop_tip_open("red", "数据修改保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "数据修改保存请求失败");
            }

        });
    }


    /**
     *  根据计划启动状态修改页面按钮是否可用
     * @param status
     */
    function setBtnStatus(status) {
        $("#startBtn").removeAttr("disabled");
        $("#pauseBtn").removeAttr("disabled");
        $("#endBtn").removeAttr("disabled");
        $("#choicePersonDisplayBtn").removeAttr("disabled");
        switch (Number(status)) {
            case 0:
                $("#endBtn").attr("disabled", "disabled");
                break;
            case 1:
                $("#startBtn").attr("disabled", "disabled");
                break;
            case 2:
                $("#pauseBtn").attr("disabled", "disabled");
                break;
            case 3:
                $("#startBtn").attr("disabled", "disabled");
                $("#pauseBtn").attr("disabled", "disabled");
                $("#endBtn").attr("disabled", "disabled");
                $("#choicePersonDisplayBtn").attr("disabled", "disabled");
                break;
            default:
                break;
        }
    }


    /**
     *  修改页面状态
     * @param status 0：清空页面，1：禁止修改，2：解除禁止
     */
    function setPageStatus(status){
        switch (status){
            case 1:
                if ($("#pageStatus").val()=="1"){
                    return;
                }
                $("#pageStatus").val("1");

                $("#saveBtn").attr("disabled","disabled");
                $("#name").attr("disabled","disabled");
                // $(":radio[name=ifPublic]").attr("disabled","disabled");
                $("#status").attr("disabled","disabled");
                $("#remark").attr("disabled","disabled");
                $("#addPaperRow").attr("disabled","disabled");
                $("#delPaperRow").attr("disabled","disabled");
                setDatetimepickerAndOrgStatus(1);
                break;
            case 0:
                if ($("#pageStatus").val()=="0"){
                    return;
                }
                $("#pageStatus").val("0");
                $("#listPlanPaper").jqGrid("clearGridData");
                $("#ojtPlanFrom").find("input[name='id']").val("");
                $("#planForm").find("input[name='orgId']").val("");
                $("#planForm").find("input[name='orgName']").val("");
                $("#planForm").find("input[name='paperId']").val("");
                $("#planForm").find("input[name='name']").val("");
                $("#planForm").find("input[name='startDate']").val("");
                $("#planForm").find("input[name='endDate']").val("");
                $("#planForm input[name='ifPublic']").attr("checked", false);
                $("#planForm").find("input[name='status']").val("1009100036");
                $("#status option:first").attr("selected", true);
                $("#planForm").find("textarea[name='remark']").val("");
                $("#planForm").find("input[name='startUpStatus']").val("");
                $("span#startUpStatusValue").html("");
                $('#listPlanPaper').jqGrid('clearGridData');
                $('#listPlanPerson').jqGrid('clearGridData');
                $("#treeDemo_1").find("a").removeClass("curSelectedNode");
                $("#yes").removeAttr("disabled");
                $("#no").removeAttr("disabled");
            case 2:
                if ($("#pageStatus").val()=="2"){
                    return;
                }
                if(status=="2")
                    $("#pageStatus").val("2");

                $("#saveBtn").removeAttr("disabled");
                $("#name").removeAttr("disabled");
                // $(":radio[name=ifPublic]").removeAttr("disabled");
                $("#status").removeAttr("disabled");
                $("#remark").removeAttr("disabled");
                $("#addPaperRow").removeAttr("disabled");
                $("#delPaperRow").removeAttr("disabled");
                setDatetimepickerAndOrgStatus(0);
                break;
        }
    }

    /**
     *  修改日期控件和机构控件是否可用
     * @param status
     */
    function setDatetimepickerAndOrgStatus(status) {
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var orgName = $("#orgName").val();
        if (status){
            $("#startDateDiv").hide();
            $("#startDateDiv").after('<input id="startDateTemp" name="startDate" type="text" class="form-control addInputWidth" disabled '
                +'value="'+startDate+'">');
            $("#endDateDiv").hide();
            $("#endDateDiv").after('<input id="endDateTemp" name="endDate" type="text" class="form-control addInputWidth" disabled '
                +'value="'+endDate+'">');
            $("#orgDiv").hide();
            $("#orgDiv").after('<input id="orgNameTemp" name="orgName" type="text" class="form-control addInputWidth" disabled '
                +'value="'+orgName+'">');
        }else {
            $("#startDateDiv").show();
            $("#startDateDiv").next().remove();
            $("#endDateDiv").show();
            $("#endDateDiv").next().remove();
            $("#orgDiv").show();
            $("#orgDiv").next().remove();
        }
    }

    /**
     *  当前是否有试卷信息
     * @returns {boolean}
     */
    function havePaper(){
        var ids = jQuery("#listPlanPaper").jqGrid('getDataIDs');
        if(ids==undefined ||ids == '' || ids.toString()=='') {
            return false;
        }else if(ids!=''){
            return true;
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
                $("#ojtPlanFrom").find("input[name='id']").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     *  初始化启动考试通知对象
     */
    function initSetting(){
        var uAll = hostUrl + "ojt/hrOjtSetting/queryListByCondition";
        $.ajax({
            type: 'post',
            url: uAll,
            data: JSON.stringify({}),
            dataType: "JSON",
            async: false,
            contentType:"application/json",
            success: function (data) {
                if(data.result) {
                    if(data.result[0]) {
                        var setting = data.result[0];
                        if(setting) {
                            startNoticePerson = setting.startNoticePerson;
                        }
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化培训设置失败");
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

    }

    /**
     * 清空组织机构
     */
    window.empty = function (){
        $("input[id='orgId']").val("");
        $("input[id='orgName']").val("");
    }

    /**
     *  人员多选回调
     * @param data
     */
    window.personCallback = function (data) {
        var perIds = "";
        var personInfo = {}
        for (var i = 0; i < data.length; i++) {
            var perId = data[i].userId;
            perIds += perId + ",";
            personInfo[data[i].userId] = data[i].name;
        }
        perIds = perIds.substring(0, perIds.length - 1);

        updatePersonInfo(perIds,personInfo);
    };


    /**
     *  向用户发送通知，提示参加考试
     * @param personIds 要提示的用户ID
     * @param prompt    提示文字 --您被安排于beginTime至endTime参加一场考试，考试内容为：paperName，请您做好准备！
     */
    function promptPersonToExam(personIds, prompt) {
        // alert("将会安排：\""+personIds+"\"，提示文字为："+prompt);
        var postDto = {};
        postDto.personIds=personIds;
        postDto.showText=prompt;
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
                        // $.xljUtils.tip("green", xhr.msg);
                        //重新加载数据
                        // $('#msgList').jqGrid().trigger("reloadGrid");
                    } else {
                        console.log(xhr);
                        if (xhr.code == "50000") {
                            // $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        // $.xljUtils.tip("red", xhr.msg);
                    }
                } else {
                    console.log(xhr);
                    // $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }
    
    function updateExamInfoStatus() {
        // var url = hostUrl + 'ojt/hrOjtExamInfo/updateExamInfoStatus';
        $.ajax({
            url: baseUrl + 'ojt/hrOjtExamInfo/updateExamInfoStatus',
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (xhr, textStatus) {
                console.log(xhr);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                // $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    window.releaseResults = function () {
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var paperName = $("#listPlanPaper").jqGrid('getCol','name',false)[0];
        var personIds = $("#listPlanPerson").jqGrid('getCol', 'personId', false);
        var examStatuses = $("#listPlanPerson").jqGrid('getCol', 'examStatus', false);
        var scores = $("#listPlanPerson").jqGrid('getCol', 'score', false);
        var promptPersonIds = "";
        var promptTexts = "";
        for(var i = 0; i < examStatuses.length; i++){
            if(examStatuses[i]=="未考"){
                promptPersonIds += personIds[i] + ",";
                promptTexts+="您所参加的考试内容为：“"+paperName+"”"+
                    "，考试时间为："+startDate+ "至"+endDate+
                    "的考试，考试结果为：\""+"未考"+"\"。,";
            }else if(examStatuses[i]=="已考"){
                promptPersonIds += personIds[i] + ",";
                promptTexts+="您所参加的考试内容为：“"+paperName+"”"+
                    "，考试时间为："+startDate+ "至"+endDate+
                    "的考试，考试结果为：\""+scores[i]+"\"分。,";
            }
        }
        if(promptPersonIds != "") {
            promptPersonIds = promptPersonIds.substr(0, promptPersonIds.length - 1);
            promptTexts = promptTexts.substr(0, promptTexts.length - 1);
            promptPersonToExam(promptPersonIds, promptTexts);
            if(promptPersonIds.split(",").length == promptTexts.split(",").length){
                $.xljUtils.tip("green", "成绩发布成功！");
            }
        }
    }

    /**
     *  判断是否可以修改“是否公开”字段
     * @param createPersonId
     */
    function getCanEditIfPublic(createPersonId) {
        var uAll = hostUrl + "ojt/hrOjtSubject/canEditIfPublic/"+createPersonId;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                if (data.success){
                    if(data.result){
                        $("#yes").removeAttr("disabled");
                        $("#no").removeAttr("disabled");
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log(XMLHttpRequest);
            }
        })
    }


    /**
     *  获取当前登录用户的deptId
     */
    function initPersonDeptId() {
        var personInfoDto = $.hrUtils.getHREmpInfo()
        if (personInfoDto != null && personInfoDto != undefined){
            deptId = personInfoDto.deptId;
        }else {
            // $.xljUtils.tip("red", "未获取到当前登录信息！");
        }
    }

    //关闭页面
    function closePage() {
        //重新加载父页面
        if(window.opener.location!=undefined) {
            window.opener.location.reload();
        }
        //关闭本页面
        window.close();
    }

    window.reloadDataList = function (id){
        planId = id;
        initPlanTree();
    }

    //初始化日期控件
    function initDatetimepicker(){
        //年月日
        var picker = $('.datetimepicker').datetimepicker({
            language:  'zh-CN',
            format: 'yyyy-mm-dd hh:ii',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });
    }
})(jQuery, window, document);
