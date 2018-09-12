/**
 * Created by xph on 2017/7/18.
 */

(function ($, window, document, undefined) {

    $(function () {
        updateExamInfoStatus();
        initPersonId();
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });


    /**
     *  初始化我的考试列表
     */
    function initExamList(){
        $("#mytest").jqGrid(
            {
                url: hostUrl + 'ojt/hrOjtSubject/queryExamList',//创建完成之后请求数据的url
                datatype: "JSON",//请求数据返回的类型。可选json,xml,txt
                mtype: "POST",//向后台请求数据的ajax的类型。可选post,get
                ajaxGridOptions: {contentType: 'application/json'},
                contentType: "application/json",
                //postData: {"status": '1', "name": '', "type": ''},
                postData: {status: '1',personId:$("#personId").val()},
                autowidth: true,
                colNames: ['计划id','试卷id','试卷名称','机构id','机构名称(隐)','机构名称',
                    '开始时间','结束时间','考试时长(分)','考试状态','是否考试'],
                colModel: [
                    {name: 'id', index: 'id', editable: true, sortable: false, hidden: true},
                    {name: 'paperId', index: 'paperId', editable: true, sortable: false, hidden: true},
                    {name: 'paperName', index: 'paperName', editable: true, sortable: false, align: 'center'},
                    {name: 'orgId', index: 'orgId', editable: true, sortable: false, hidden: true},
                    {name: 'orgName', index: 'orgName', editable: true, sortable: false, hidden: true},
                    {name: 'prefixName', index: 'prefixName', editable: true, sortable: false, align: 'center'},
                    {
                        name: 'startTime',
                        index: 'startTime',
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {
                        name: 'endTime',
                        index: 'endTime',
                        editable: true,
                        sortable: false,
                        align: 'center'
                    },
                    {name: 'duration', index: 'duration', editable: true, sortable: false, align: 'center'},
                    {
                        name: 'startUpStatus',
                        index: 'startUpStatus',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: startUpStatusFmatter
                    },
                    {
                        name: 'examStatus',
                        index: 'examStatus',
                        editable: true,
                        sortable: false,
                        align: 'center',
                        formatter: examStatusFmatter
                    }
                ],
                multiselect: true,
                multiboxonly: true,
                rownumbers: true,
                height: $(window).height() - 200,
                jsonReader: {
                    root: "result",
                    repeatitems: false
                },
                onCellSelect: function () {
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //重新选择行时清除上一次选中行的样式
                        $('#mytest ' + '#' + rowDataBefore.id).find("td").removeClass("ui-state-highlight");
                    }
                },
                onSelectRow: function () {
                    var rowId = $('#mytest').jqGrid("getGridParam", "selrow");
                    rowData = $('#mytest').jqGrid('getRowData', rowId);
                },

                gridComplete: function () {
                    $.xljUtils.addGridScroll();
                    $.xljUtils.gridResizeFn();
                    rowDataBefore = rowData;
                    if (rowDataBefore != null && rowDataBefore != 'undefined') {
                        //添加回显选中行样式
                        $('#mytest').setSelection(rowDataBefore.id, true);
                        $('#mytest ' + '#' + rowDataBefore.id).find("td").addClass("ui-state-highlight");
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
                        //success
                    }
                }

            });
    }
    /**
     *
     */
    function TimeFmatter(cellvalue, options, rowObject) {
        if(cellvalue != null && cellvalue != ""){
            cellvalue = cellvalue.replace(/-/g, '/');
        }
        var date = new Date(cellvalue);
        date.setTime(date.getTime()-8*60*60*1000);
        return date.getHours()+":"+date.getMinutes();
    }
    /**
     *  考试状态
     */
    function startUpStatusFmatter(cellvalue, options, rowObject) {
        if (cellvalue == "0") {
            return "未启动";
        } else if (cellvalue == "1") {
            return "启动";
        } else if (cellvalue == "2") {
            return "暂停";
        } else if (cellvalue == "3") {
            return "已收卷";
        }else {
            return cellvalue;
        }
    }

    function examStatusFmatter(cellvalue, options, rowObject) {
        if(cellvalue=="1127100242"){
            return "未考";
        }else if(cellvalue=="1127100241"){
            return "已考";
        }else if(cellvalue=="1127100755"){
            return "考试中";
        }else {
            return cellvalue;
        }
    }


    window.searchTable = function (){
        var startUpStatus = $("#startUpStatus").val();
        var orgId = $("#orgId").val();
        var queryData = {
            "startUpStatus": startUpStatus,
            "orgId": orgId
        };
        jQuery("#mytest").jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
    }


    window.goToExam = function () {
        var idsVal = $('#mytest').jqGrid('getGridParam', 'selarrrow');
        if (idsVal && idsVal != "") {
            if (idsVal.length > 1) {
                $.xljUtils.tip("blue", "只能选择一场考试！");
                return;
            }
            var rowId = $('#mytest').jqGrid("getGridParam", "selrow");
            var rowData = $('#mytest').jqGrid('getRowData', rowId);
            if(rowData.startUpStatus=="已收卷"){
                $.xljUtils.tip("blue", "该场考试已结束！");
                return;
            }
            var startTime = new Date(rowData.startTime.replace(/-/g, '/')).getTime();
            var endTime = new Date(rowData.endTime.replace(/-/g, '/')).getTime();
            var date = new Date().getTime();
            if(date < startTime || date > endTime){
                $.xljUtils.tip("blue", "当前未在考试时间内，无法参加考试！");
                return;
            }
            if(rowData.examStatus!="未考"){
                $.xljUtils.tip("blue", "已参加过该考试，无法重复参加考试！");
                return;
            }
            window.open('../ojt/ojt_paper_preview.html?paperId=' + rowData.paperId+"&type=planExam&planId="+rowData.id);
        } else {
            $.xljUtils.tip("blue", "请选择要参加的考试！");
        }
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

    /**
     *  获取当前登录用户的ID
     */
    function initPersonId() {
        var personInfoDto = $.hrUtils.getHREmpInfo()
        if (personInfoDto != null){
            var personId = personInfoDto.id;
            $("#personId").val(personId);
            initExamList();
        }
    }

    /**
     * 机构回调函数
     */
    window.orgCallback = function (data) {
        $("#examForm").find("input[id='orgId']").val(data.id);
        // $("#examForm").find("input[id='belongOrgName']").val(data.name);
        $("#examForm").find("input[id='belongOrgName']").val(data.prefixName);
        searchTable();
    };

    /**
     * 清空组织机构上级
     */
    window.empty = function () {
        $("#examForm").find("input[id='orgId']").val("");
        $("#examForm").find("input[id='belongOrgName']").val("");
        searchTable();
    };

})(jQuery, window, document);