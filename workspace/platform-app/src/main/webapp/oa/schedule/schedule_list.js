var urlParams = $.xljUtils.getUrlParams();

$(function () {

    $('#headerTitle').text('我的任务(' + urlParams.date + ')');
    $('#settlementTradesTitle').text('我的任务(' + urlParams.date + ')');
    //关闭窗口
    $('#closeWinBtn').on('click', function () {
        window.close();
    });

    $('#reportBtn').on('click', function () {
        var id = jQuery("#scheduleList").jqGrid('getGridParam', 'selrow');
        //var ids = jQuery("#scheduleList").jqGrid('getGridParam', 'selarrrow');

        if (!id || id == '') {
            $.xljUtils.tip('blue', '请选择一条任务进行汇报！');
            return;
        }
        var rowData = jQuery("#scheduleList").jqGrid('getRowData', id);
        if (!rowData || rowData.type != 'TASK') {
            $.xljUtils.tip('blue', '只有任务类型事项可以汇报！');
            return;
        }

        window.open('../taskPackageDispatch/taskPackageDispatch_edit.html?dispatchId=' + id);
    });


    initScheduleList();


});
/**
 * 初始化列表
 */
function initScheduleList() {
    function _initGrid(gridObj, colNames, colModel) {
        gridObj.jqGrid({
            datatype: "local",//请求数据返回的类型。可选json,xml,txt
            colNames: colNames,//jqGrid的列显示名字
            colModel: colModel,
            autoWidth: true,
            rownumbers: true,
            rowNum: -1,//一页显示多少条
            sortorder: "desc",//排序方式,可选desc,asc
            ondblClickRow: function (rowid, iRow, iCol, e) {
                var rowData = jQuery("#scheduleList").jqGrid('getRowData', rowid);
                if (rowData.type == 'TASK') {
                    window.open('../taskPackageDispatch/taskPackageDispatch_edit.html?dispatchId=' + rowid);
                } else {
                    window.open('schedule_edit.html?act=view&workScheduleId=' + rowid);
                }
            },
            gridComplete: function () {
                $('.ui-jqgrid-bdiv').getNiceScroll().show().resize();
            }
        });
    }

    function _initGridData() {
    	var data = window.opener.getSelectDayEvents(urlParams.date);
    	console.log(data);
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                /*if(obj.periodProceeding=='1'){
                 obj.id = obj.id.substring(obj.id.indexOf('_')+1);
                 obj.beginTime = obj.periodBeginTime+' '+obj.beginTime;
                 obj.endTime = obj.periodEndTime+' '+obj.endTime;
                 }*/

                obj.source = obj.businessSource;
                if (obj.source == 'OA') {
                    obj.source = '协同办公';
                }

                /*var beginTime = obj.beginTime;
                 obj.beginTime = beginTime.substring(0,19);
                 var endTime = obj.endTime;*/

                if (obj.type == 'PERSONAL_PROCEEDING') {
                    var endTime = obj.endTime;
                    var startTime = obj.beginTime;
                    /* endTime = endTime.substring(0,10) + ' 00:00:00';*/
                    var currentTime = new Date().getTime();
                    if (currentTime > (new Date(endTime.replace(/-/g, '/')).getTime())) {
                        obj.status = '已过期';
                    } else {
                        obj.status = '正常';
                    }

                } else if (obj.type == 'MEETING') {
                    /*switch (obj.status) {
                        case '1':
                            obj.status = '审批中';
                            break;
                        case '2':
                            obj.status = '已完成';
                            break;
                        case '0':
                            obj.status = '草稿';
                            break;
                        case '5':
                            obj.status = '未开始';
                            break;
                        case '6':
                            obj.status = '进行中';
                            break;
                        case '8':
                            obj.status = '已结束';
                            break;
                        case '11':
                            obj.status = '会议取消';
                            break;
                    }*/
                    var endTime = obj.endTime;
                    var startTime = obj.beginTime;
                    var currentTime = new Date().getTime();
                    if(currentTime<(new Date(startTime.replace(/-/g, '/')).getTime())){
                        obj.status = '未开始';
                    }

                    if(currentTime>=(new Date(startTime.replace(/-/g, '/')).getTime())&&currentTime<=(new Date(endTime.replace(/-/g, '/')).getTime())){
                        obj.status = '进行中';
                    }

                    if(currentTime>(new Date(endTime.replace(/-/g, '/')).getTime())){
                        obj.status = '已结束';
                    }
                }
                 else if (obj.type == 'TASK') {
                    switch (obj.status) {
                        case '1':
                            obj.status = '未汇报';
                            break;
                        case '2':
                            obj.status = '已汇报';
                            break;
                        case '3':
                            obj.status = '已关闭';
                            break;
                    }
                }


                $('#scheduleList').jqGrid('addRowData', obj.id, obj);
            }
        }
    }

    var colNames = ['序号', '主题/内容', '类型', '状态', '来源', '所属人', '所属人ID', '时间', '结束时间'];
    var colModel = [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
        {name: 'id', width: 55, align: "center", hidden: true},
        {name: 'content', width: 90, align: "center"},
        {
            name: 'type', width: 90, align: "center", formatter: function (v, opt, rec) {
            switch (v) {
                case 'PERSONAL_PROCEEDING':
                    return '个人事项';
                case 'TASK':
                    return '任务';
                case 'MEETING':
                    return '会议';
                default:
                    return '个人事项';
            }
        }, unformat: function (v) {
            switch (v) {
                case '个人事项':
                    return 'PERSONAL_PROCEEDING';
                case '任务':
                    return 'TASK';
                case '会议':
                    return 'MEETING';
                default:
                    return 'PERSONAL_PROCEEDING';
            }
        }
        },
        {
            name: 'status', width: 90, align: "center", formatter: function (v, opt, rec) {
            if (!v || v == '' || v == null) {
                v = "无";
            }

            return v;
        }
        },
        {name: 'source', width: 164, align: "center"},
        {name: 'taskOwner', width: 120, align: "center"},
        {name: 'taskOwnerId', width: 120, align: "center", hidden: true},
        {name: 'beginTime', width: 120, align: "center", formatter: function (beginTime, options, rowObject) {
                var endTime = '';
                if (rowObject.endTime) {
                    if (rowObject.endTime.indexOf(".") > -1) {
                        endTime = ' 至 '+ rowObject.endTime.substring(0, beginTime.indexOf("."));
                    } else {
                        endTime = ' 至 '+ rowObject.endTime;
                    }
                }
                if (beginTime) {
                    if (beginTime.indexOf(".") > -1) {
                        return beginTime.substring(0, beginTime.indexOf(".")) + endTime;
                    } else {
                        return beginTime + endTime;
                    }
                }
            }
        },
        {name: 'endTime', width: 120, align: "center", hidden: true}
    ];
    _initGrid($('#scheduleList'), colNames, colModel);
    $.xljUtils.resizeNestedGrid();

    _initGridData();
}
function reloadWin() {
    window.opener.reloadEvent();
    jQuery("#scheduleList").jqGrid("clearGridData");
    window.location.reload();
    /*    setTimeout(function () {
     if(rowId){local
     $('#scheduleList').jqGrid('setSelection',rowId);
     }
     },1500);*/

}