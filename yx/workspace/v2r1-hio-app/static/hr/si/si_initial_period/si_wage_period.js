/**
 * 计薪期间设置--考勤模块使用
 * @author ruanxin
 * @date 2018/2/27
 */

;(function ($, window, document, undefined) {

    $(function () {

        initPeriodSetting();

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });


        //计薪设置：切换开始日期进行相关处理
        $("#startDate").change(function(){
            var startDate = $("#startDate").val();
            if(startDate!=null&&startDate!='') {
                var endDate = calculateEndDate(startDate);
                if(startDate!='1'||startDate!=1) {
                    $("#endDate").val("次月" + endDate+"日");
                }else {
                    $("#endDate").val("本月" + endDate+"日");
                }

            }
        });

        //计薪设置：切换计薪方式进行相关处理
        $("#wageWay").change(function(){
            var startDate = $("#wageWay").val();
            if(startDate=="1") { //21.75
                $("#workingDay").val("21.75");
                document.getElementById('workingDayDiv1').style.visibility = 'hidden';//工作日天数设置为隐藏
                document.getElementById('workingDayDiv2').style.visibility = 'hidden';//工作日天数设置为隐藏
            } else if(startDate=="2") { //来源为考勤
                document.getElementById('workingDayDiv1').style.visibility = 'hidden';//工作日天数设置为隐藏
                document.getElementById('workingDayDiv2').style.visibility = 'hidden';//工作日天数设置为隐藏
                // $("#workingDay").val("22");//后期计算时进行读取
                // $("#workingDay").prop("disabled",true);
            } else if(startDate=="3") { //支持自定义设置
                $("#workingDay").val("");
                document.getElementById('workingDayDiv1').style.visibility = 'visible';//工作日天数设置为显示
                document.getElementById('workingDayDiv2').style.visibility = 'visible';//工作日天数设置为显示
                // $("#workingDay").prop("disabled",false);
            }
        });
    });

    //计薪设置：初始化
    window.initPeriodSetting = function () {
        var ubody = "wage/wagePeriod/queryList";
        var uall = hostUrl+ubody;
        var querydata ={time:new Date()};
        $.ajax({
            type:'post',
            dataType:'json',
            contentType:'application/json',
            data:JSON.stringify(querydata),
            url:uall,
            success: function(data) {
                //记录已经存在，直接修改
                if(data.result!=null&&data.result.length>0) {
                    var tempDate = data.result[0];
                    $("#periodFrom").find("input[name='periodId']").val(tempDate.sid);
                    $("#startDate").val(tempDate.startDate);
                    $("#wageWay").val(tempDate.wageWay);
                    $("#periodFrom").find("input[name='workingDay']").val(tempDate.workingDay);
                    $("#kqSource").val(tempDate.kqSource);
                    $("#siSource").val(tempDate.siSource);
                }
                //记录不存在，需新增插入
                else {
                    // initUuid();
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化薪资总额控制请求失败");
            }
        })
    };

    //计薪设置：保存
    $("#savePeriodSetting").click(function () {

        var tempPeriodDto={};
        var id = $("#periodId").val();
        var startDate = $("#startDate").val();
        var wageWay = $("#wageWay").val();
        var workingDay = $("#workingDay").val();
        var kqSource = $("#kqSource").val();
        var siSource = $("#siSource").val();

        if(startDate==null||startDate=='') {
            pop_tip_open("blue","请选择计薪开始时间！");
            return;
        } else if(wageWay==null||wageWay=='') {
            pop_tip_open("blue","请选择计薪方式！");
            return;
        } else if(kqSource==null||kqSource=='') {
            pop_tip_open("blue","请选择考勤数据来源！");
            return;
        } else if(siSource==null||siSource=='') {
            pop_tip_open("blue","请选择社保数据来源！");
            return;
        }

        //如果计薪方式为实际工作日，则必须数据工作日天数
        else if(wageWay=="3") {
            if(workingDay==null||workingDay=="") {
                pop_tip_open("blue","请输入工作日天数！");
                return;
            } else if(workingDay<0||workingDay>30) {
                pop_tip_open("blue","请输入有效工作日天数！");
                return;
            }
        }

        var endDate = calculateEndDate(startDate);//获取结束时间

        tempPeriodDto.startDate = startDate;
        tempPeriodDto.endDate = endDate;
        tempPeriodDto.wageWay = wageWay;
        tempPeriodDto.workingDay = workingDay;
        tempPeriodDto.kqSource = kqSource;
        tempPeriodDto.siSource = siSource;
        tempPeriodDto.delflag=0;
        if(id!=null&&id!=""){//编辑
            tempPeriodDto.id = id;
            updateSavePeriod(tempPeriodDto);
        }else{//新增
            addSavePeriod(tempPeriodDto);
        }
    });

    //计薪设置：修改保存
    window.updateSavePeriod = function (tempPeriodDto) {
        var periodId = $('#periodId').val();
        tempPeriodDto.id = periodId;
        $.ajax({
            url:hostUrl+"wage/wagePeriod/update/"+periodId,
            data:JSON.stringify(tempPeriodDto),
            type:'put',
            dataType:'JSON',
            contentType:'application/json',
            success:function (resultData ) {
                if(resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var message = resultData.message;
                    if(successFlag) {
                        $.xljUtils.tip("green","计薪设置修改成功！");
                        setTimeout(function () {
                            window.location.href = "si_initial_period.html";
                        }, 300);
                    }else {
                        pop_tip_open("blue","计薪设置修改失败！"+message);
                        initPeriodSetting();
                    }
                }
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","计薪设置修改请求失败");
            }
        });
    };

    //计薪设置：新增保存
    window.addSavePeriod = function (tempPeriodDto) {
        $.ajax({
            type:'get',
            url:hostUrl +  "generator/getGuuid"+"?time="+Math.random(),
            success: function(data) {
                var guuid=data.result;
                $("#periodFrom").find("input[name='periodId']").val(guuid);
                var periodId = $('#periodId').val();
                tempPeriodDto.id = guuid;
                $.ajax({
                    url:hostUrl+"wage/wagePeriod/save/",
                    type:'POST',
                    dataType:'JSON',
                    contentType:'application/json',
                    data:JSON.stringify(tempPeriodDto),
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr){
                            if(xhr.success) {
                                $.xljUtils.tip("green","计薪设置新增成功！");
                                setTimeout(function () {
                                    window.location.href = "si_initial_period.html";
                                }, 300);
                            }else{
                                if(xhr.code=="50000"){
                                    $.xljUtils.tip("blue",xhr.message);
                                    initPeriodSetting();
                                    return;
                                }
                                $.xljUtils.tip("blue","计薪设置新增失败！");
                                initPeriodSetting();
                            }
                        }else{
                            $.xljUtils.tip("red","服务异常,请联系管理员！");
                            initPeriodSetting();
                        }
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red","服务异常,请联系管理员！");
                    }
                });
            },error:function(XMLHttpRequest, textStatus, errorThrown){
                pop_tip_open("red","初始化主键ID请求失败");
            }
        });
    };

    //计薪设置：根据选择的开始时间获取结束时间
    window.calculateEndDate = function (startDate) {
        if(startDate!=null&&startDate!='') {
            if(startDate==1){
                return 31;
            }else {
                return startDate-1;
            }
        }
    };


    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

})(jQuery, window, document);