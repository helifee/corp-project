
$(function () {
    var urlParams = $.xljUtils.getUrlParams();
    if(urlParams.act=='create'){
        $('#scheduleEditTitle').text('我的日程-新增');
        $('#headerTitle').text('我的日程-新增');
    }else if(urlParams.act=='update') {
        $('#scheduleEditTitle').text('我的日程-更新');
        $('#headerTitle').text('我的日程-更新');
    }else if(urlParams.act=='view') {
        $('#scheduleEditTitle').text('我的日程-查看');
        $('#headerTitle').text('我的日程-查看');
        $('#saveBtn').hide();
        $('.form-date').find(':input').attr('disabled','disabled');
    }

    changeRepetitionFrequency();
    pageInit();


    function initFormData() {
        $.ajax({
            url:hostUrl + 'oa/workSchedule/get/'+urlParams.workScheduleId,
            type:'GET',
            dataType:'JSON',
            success:function (resultData) {
                if(resultData&&resultData.success){
                    var result = resultData.result;
                    if(result) {
                        for(var item in result) {
                            if(item=='periodProceeding'){
                                var periodProceedingInput = $('#workScheduleForm :input[name="periodProceeding"][value="'+result.periodProceeding+'"]')[0];
                                if(periodProceedingInput) {
                                    periodProceedingInput.checked = true;
                                    $(periodProceedingInput).change();
                                }
                                continue;
                            }
                            $('#workScheduleForm :input[name="'+item+'"]').val(result[item]);
                            if(item=='frequencyType'){
                                $('#workScheduleForm :input[name="'+item+'"]').change();
                                $('#repetitionFrequency').val(result.repetitionFrequency);
                            }
                        }

                        if(result.type=='MEETING'){
                            $($('input[name="type"]')[0]).next().val('会议');
                        }
                    }

                    if(urlParams.act=='view'){
                        $('#workScheduleForm :input[type="text"]').attr('readonly','readonly');
                        $('#workScheduleForm :input').attr('readonly','readonly');
                        $('#workScheduleForm select').attr('disabled','disabled');
                        $('#workScheduleForm :input[type="radio"]').attr('disabled','disabled');
                        /*$('.begin-time-date,.end-time-date').datetimepicker('remove');
                        $('.period-begin-time-date,.period-end-time-date').datetimepicker('remove');*/
                    }
                }
                else{
                    $.xljUtils.tip('red','日程信息获取失败！');
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }

        });
    }
    initFormData();

    //保存
    $('#saveBtn').on('click',function () {
        var periodProceeding = $(':input[name="periodProceeding"]:checked').val();
        if(periodProceeding=='1'){
            var periodBeginTime = $('#periodBeginTime').val();
            var periodEndTime = $('#periodEndTime').val();

            var begin = periodBeginTime;
            begin = new Date(begin.replace(/-/g,'/'));
            var end = periodEndTime ;
            end = new Date(end.replace(/-/g,'/'));
            if(begin>end){
                $.xljUtils.tip('blue','周期开始时间不能大于周期结束时间！');
                return;
            }
            var beginTime = $('#beginTime').val();
            var endTime = $('#endTime').val();
            var begin1 = new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' + new Date().getDate() + ' '+beginTime;
            begin1 = new Date(begin1);
            var end1 = new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' + new Date().getDate() + ' '+endTime;
            end1 = new Date(end1);
            if(begin1>end1){
                $.xljUtils.tip('blue','任务开始时间不能大于任务结束时间！');
                return;
            }


        }else{
            var beginTime = $('#beginTime').val();
            var endTime = $('#endTime').val();
            var begin = beginTime;
            begin = new Date(begin.replace(/-/g,'/'));
            var end = endTime;
            end = new Date(end.replace(/-/g,'/'));
            if(begin>end){
                $.xljUtils.tip('blue','开始时间不能大于结束时间！');
                return;
            }
        }
        if(urlParams.act=='create'){
            $('#workScheduleForm').attr('action',hostUrl+'oa/workSchedule/save');
            $('#workScheduleForm').attr('method','POST');
        }else if(urlParams.act=='update'){
            $('#workScheduleForm').attr('action',hostUrl+'oa/workSchedule/update/'+urlParams.workScheduleId);
            $('#workScheduleForm').attr('method','PUT');
        }

        if($('input[name="periodProceeding"]:checked').val()=='0') {
            $('.frequency-css').val('');
        }
        $('#workScheduleForm').attr('data-callback','saveDataAndCloseWin()');
        $('#workScheduleForm').submit();
    });

    $('#closeWinBtn').on('click',function () {
       window.close();
    });

    /**
     * 计算周期内任务个数
     * @param obj
     */
    function calculPeriodTaskNum() {
        var periodBeginTime = $('#periodBeginTime').val();
        var periodEndTime = $('#periodEndTime').val();
        if(periodBeginTime==''||periodEndTime==''){
            $('#periodTaskNum').val(0);
            return;
        }
        var beginTime = new Date(periodBeginTime);
        var endTime = new Date(periodEndTime);

        var y = endTime.getYear()-beginTime.getYear();
        var m = endTime.getMonth() - beginTime.getMonth()+1;
        var d = (endTime.getTime()-beginTime.getTime())/1000/60/60/24;
        var frequencyType = $('#frequencyType').val();
        var periodTaskNum = 0;
        if(frequencyType=='MONTH'){
            periodTaskNum = y*12+m;
            var begin = periodBeginTime.substring(0,periodBeginTime.lastIndexOf('-')+1);
            begin += $('#repetitionFrequency').val();
            begin = new Date(begin);
            if(beginTime>begin){
                periodTaskNum -= 1;
            }
            var end = periodEndTime.substring(0,periodEndTime.lastIndexOf('-')+1);
            end += $('#repetitionFrequency').val();
            end = new Date(end);
            if(endTime<end){
                periodTaskNum -= 1;
            }
        }else if(frequencyType=='WEEK'){
            var assignWeekDay = $('#repetitionFrequency').val();
            assignWeekDay = parseInt(assignWeekDay);

            var beginWeekDay = beginTime.getDay();
            var endWeekDay = endTime.getDay();

            var tempBeginTime ;
            if(assignWeekDay>=beginWeekDay){
                tempBeginTime = beginTime.getTime()+(Math.abs(assignWeekDay-beginWeekDay)*24*60*60*1000);
            }else{
                tempBeginTime = beginTime.getTime()+7*24*60*60*1000 - (Math.abs(assignWeekDay-beginWeekDay)*24*60*60*1000);
            }

            var tempEndTime ;
            if(assignWeekDay<=endWeekDay){
                tempEndTime = endTime.getTime()-(Math.abs(assignWeekDay-endWeekDay)*24*60*60*1000);
            }else{
                tempEndTime = endTime.getTime()-7*24*60*60*1000 + (Math.abs(assignWeekDay-endWeekDay)*24*60*60*1000);
            }

            var d1 = (tempEndTime-tempBeginTime)/1000/60/60/24;
            periodTaskNum = Math.round(d1/7)+1;
        }else if(frequencyType=='DAY'){
            periodTaskNum = d+1;
        }

        $('#periodTaskNum').val(periodTaskNum);
    }


    //重复频率改变事件
    $('#repetitionFrequency').on('change',function () {
        var periodBeginTime = $('#periodBeginTime').val();
        var periodEndTime = $('#periodEndTime').val();
        if (periodEndTime == ''||periodBeginTime == ''){
            return;
        }
        calculPeriodTaskNum();
    });

    function initDatepickerForBeginTimeAndEndTime() {
        $('#beginTime').off('click').on('click',function () {
            WdatePicker({
                el: this,
                dateFmt: "yyyy-MM-dd HH:mm:ss",
                errDealMode:-1,
                onpicked:function (dp) {
                    var periodProceeding = $('input[name="periodProceeding"]:checked').val();
                    if(periodProceeding=='1'){
                        var newDate = (dp.cal.newdate.H>=10?dp.cal.newdate.H:'0'+dp.cal.newdate.H) + ':'+(dp.cal.newdate.m>=10?dp.cal.newdate.m:'0'+dp.cal.newdate.m)+':'+(dp.cal.newdate.s>=10?dp.cal.newdate.s:'0'+dp.cal.newdate.s);
                        $('#beginTime').val(newDate);
                    }
                }
            });

        });
        $('#beginTime').siblings('.input-group-addon').off('click').on('click',function () {
            WdatePicker({
                el:"beginTime",
                dateFmt:"yyyy-MM-dd HH:mm:ss",
                errDealMode:-1,
                onpicked:function (dp) {
                    var periodProceeding = $('input[name="periodProceeding"]:checked').val();
                    if(periodProceeding=='1'){
                        var newDate = (dp.cal.newdate.H>=10?dp.cal.newdate.H:'0'+dp.cal.newdate.H) + ':'+(dp.cal.newdate.m>=10?dp.cal.newdate.m:'0'+dp.cal.newdate.m)+':'+(dp.cal.newdate.s>=10?dp.cal.newdate.s:'0'+dp.cal.newdate.s);
                        $('#beginTime').val(newDate);
                    }
                }
            })
        });

        $('#endTime').off('click').on('click',function () {
            var minDate=$("#beginTime").val();
            WdatePicker({
                el: this,
                dateFmt: "yyyy-MM-dd HH:mm:ss",
                minDate:'#F{$dp.$D(\'beginTime\')}',
                errDealMode:-1,
                onpicked:function (dp) {
                    var periodProceeding = $('input[name="periodProceeding"]:checked').val();
                    if(periodProceeding=='1'){
                        var newDate = (dp.cal.newdate.H>=10?dp.cal.newdate.H:'0'+dp.cal.newdate.H) + ':'+(dp.cal.newdate.m>=10?dp.cal.newdate.m:'0'+dp.cal.newdate.m)+':'+(dp.cal.newdate.s>=10?dp.cal.newdate.s:'0'+dp.cal.newdate.s);
                        $('#endTime').val(newDate);
                    }
                }
            });
        });
        $('#endTime').siblings('.input-group-addon').off('click').on('click',function () {
            var minDate=$("#beginTime").val();
            WdatePicker({
                el:"endTime",
                dateFmt:"yyyy-MM-dd HH:mm:ss",
                minDate:'#F{$dp.$D(\'beginTime\')}',
                errDealMode:-1,
                onpicked:function (dp) {
                    var periodProceeding = $('input[name="periodProceeding"]:checked').val();
                    if(periodProceeding=='1'){
                        var newDate = (dp.cal.newdate.H>=10?dp.cal.newdate.H:'0'+dp.cal.newdate.H) + ':'+(dp.cal.newdate.m>=10?dp.cal.newdate.m:'0'+dp.cal.newdate.m)+':'+(dp.cal.newdate.s>=10?dp.cal.newdate.s:'0'+dp.cal.newdate.s);
                        $('#endTime').val(newDate);
                    }
                }
            })
        });
    }
    initDatepickerForBeginTimeAndEndTime();

    function initDatepickerForPeriodBenginAndEnd() {
        $('#periodBeginTime').on('click',function () {
            WdatePicker({
                el: this,
                dateFmt: "yyyy-MM-dd",
                onpicked:function (dp) {
                    var periodEndTime = $('#periodEndTime').val();
                    if (periodEndTime == ''){
                        return;
                    }
                    calculPeriodTaskNum();
                }
            });
        });
        $('#periodBeginTime').siblings('.input-group-addon').on('click',function () {
            WdatePicker({
                el:"periodBeginTime",
                dateFmt:"yyyy-MM-dd",
                onpicked:function (dp) {
                    var periodEndTime = $('#periodEndTime').val();
                    if (periodEndTime == ''){
                        return;
                    }
                    calculPeriodTaskNum();
                }
            })
        });

        $('#periodEndTime').on('click',function () {
            var minDate=$("#periodBeginTime").val();
            WdatePicker({
                el: this,
                dateFmt: "yyyy-MM-dd",
                minDate:'#F{$dp.$D(\'periodBeginTime\')}',
                onpicked:function (dp) {
                    var periodBeginTime = $('#periodBeginTime').val();
                    if (periodBeginTime == ''){
                        return;
                    }
                    calculPeriodTaskNum();
                }
            });
        });
        $('#periodEndTime').siblings('.input-group-addon').on('click',function () {
            var minDate=$("#periodBeginTime").val();
            WdatePicker({
                el:"periodEndTime",
                dateFmt:"yyyy-MM-dd",
                minDate:'#F{$dp.$D(\'periodBeginTime\')}',
                onpicked:function (dp) {
                    var periodBeginTime = $('#periodBeginTime').val();
                    if (periodBeginTime == ''){
                        return;
                    }
                    calculPeriodTaskNum();
                }
            })
        });
    }
    initDatepickerForPeriodBenginAndEnd();

});

/**
 *  频率类型更改事件
 */
function changeRepetitionFrequency() {
    var frequencyType = $("select[name='frequencyType']").val();
    if(frequencyType=='MONTH'){
        $('#repetitionFrequencyTr').show();
        $('#repetitionFrequency').html('');
        for (var i = 0; i < 31; i++) {
            var obj = arguments[i];
            var opt = $('<option></option>');
            opt.val((i+1)<10?'0'+(i+1):(i+1));
            opt.text(i+1);
            $('#repetitionFrequency').append(opt);
        }
    }else if(frequencyType=='WEEK'){
        $('#repetitionFrequencyTr').show();
        $('#repetitionFrequency').html('');
        var weekObj = {
             1:'周一',
             2:'周二',
             3:'周三',
             4:'周四',
             5:'周五',
             6:'周六',
             0:'周日'
        };
        for(var item in weekObj) {
            var opt = $('<option></option>');
            opt.val(item);
            opt.text(weekObj[item]);
            $('#repetitionFrequency').append(opt);
        }
    }else if(frequencyType=='DAY'){
        $('#repetitionFrequencyTr').hide();
    }
}
/**
 * author:liuf
 * describe:加载完毕后执行
 * param: null
 */
function pageInit() {
    var uuid = getuuid();
    $("#workScheduleId").val(uuid);
    $("#frequencyTypeTr").hide();
    $("#repetitionFrequencyTr").hide();
    $("#periodBeginTimeTr").hide();
    $("#periodEndTimeTr").hide();
    $("#periodTaskNumTr").hide();

    $("input[name='periodProceeding']").change(function () {
        $('.begin-time-date,.end-time-date').find('input').val('');
        $('.period-begin-time-date,.period-end-time-date').find('input').val('');
        if (this.value == "0") {
            $("#frequencyTypeTr").hide();
            $("#repetitionFrequencyTr").hide();
            $("#periodBeginTimeTr").hide();
            $("#periodEndTimeTr").hide();
            $("#periodTaskNumTr").hide();
        } else if (this.value == "1") {
            $("#frequencyTypeTr").show();
            $("#repetitionFrequencyTr").show();
            $("#periodBeginTimeTr").show();
            $("#periodEndTimeTr").show();
            $("#periodTaskNumTr").show();
        }

    });
}

/**
 * author:liuf
 * describe:获取uuid
 * param: null
 */
function getuuid() {
    $.ajax({
        beforeSend: function () {
            var guuid = "";
        },
        type: 'get',
        async: false,
        url: hostUrl + 'generator/getGuuid?time=' + Math.random(),
        success: function (data) {
            if (data.success) {
                guuid = data.result;
            } else {
                $.xljUtils.tip("red", data.msg);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.xljUtils.getError(jqXHR.status);
        },
        complete: function () {
        }
    });
    return guuid;
}

/**
 * author:liuf
 * describe:新增 修改数据
 * param: null
 */
function saveForm(operateType) {
    var workScheduleArr = $("#workScheduleForm").serializeArray();
    var workScheduleDto = {};
    for (var i in workScheduleArr) {
        workScheduleDto[workScheduleArr[i].name] = workScheduleArr[i].value;
    }
    workScheduleDto.delflag = 0;
    workScheduleDto.createDate = new Date().getTime();
    workScheduleDto.updateDate = new Date().getTime();
    if (operateType == "create") {
        $.ajax({
            url: hostUrl + "/oa/workSchedule/save",
            data: JSON.stringify(workScheduleDto),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        /*	   window.opener.reloadGrid();*/
                        window.close();

                    } else {
                        $.xljUtils.tip("red", resultData.msg);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });
    } else {

    }


}
/**
 * author:liuf
 * describe:关闭页面
 * param: null
 */

/**
 * 保存回掉函数
 * @param resultData
 */
function saveDataAndCloseWin(resultData) {
    console.info(resultData);
    if(resultData.success) {
        if(window.opener&&$.isFunction(window.opener.reloadWin)){
            window.opener.reloadWin();
        }
        window.close();
    }else{
        $.xljUtils.tip('red','数据保存失败！');
    }
}
