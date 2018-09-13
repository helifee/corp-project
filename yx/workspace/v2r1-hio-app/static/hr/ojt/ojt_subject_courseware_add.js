(function ($, window, document, undefined) {
    $("#closePage").click( function(){
        window.location.href="ojt_subject.html";
    })

    var subjectId = $.xljUtils.getUrlParam("subjectId");
    var size;
    // var isOver = 1;
    var videoDuration;
    //手动的调整窗口时
    //grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
    });
    //计算表格的高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 90) + "px");
        //表示con-table 下的mytable1
        $(".con-table .mytable1").height((w_h - 80) + "px");
    }
    //上来就执行
    $(function () {
        resizeHeight();
        //初始化主键ID
        initUuid();
        //initRemind();
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
           /* $("#ojtSubjectFrom").attr("data-validate-success", "saveInfo()");
            $("#ojtSubjectFrom").submit();*/
            saveInfo();
        });
        initDatetimepicker();
    });


    /**
     * 新增课件
     */
    window.saveInfo = function() {
        var files = $('.attachment-container').getFileList();
      /* if(files && files.length == 0){
            $.xljUtils.tip("blue", "附件尚未上传完毕，请稍后再保存");
            return;
        }*/
       if(!checkForm()){
           $.xljUtils.tip("blue", "请填写课件名称！");
           return;
       }
        var HrOjtCoursewareDto = {};
        HrOjtCoursewareDto.subjectId = subjectId;//课程ID
        HrOjtCoursewareDto.businessId = $("#id").val();
        HrOjtCoursewareDto.id = $("#id").val();
        HrOjtCoursewareDto.name = $("#name").val();//名称
        HrOjtCoursewareDto.classify = $("#classify").val();//课件分类
        if(videoDuration == undefined || videoDuration == null || videoDuration == ''){
            videoDuration = 0;
        }
        //var tempVideoDuration = Math.round(videoDuration / 1000);
        var tempVideoDuration = Math.floor(videoDuration / 1000); //取整
        var remainTime = tempVideoDuration;
        var remainTimeStr = "";
        var remainM = 0;
        var remainS = 0;
        if(remainTime >= 3600){//超过一小时
            var htemp = parseInt(remainTime / 3600);
            //小于10小时
            if(htemp < 10){
                remainTimeStr += "0"+htemp+":";
            } else {
                remainTimeStr+= htemp+":";
            }
            remainM = remainTime % 3600;
        } else {
            remainM = remainTime;
            remainTimeStr += "00:";
        }
        //拼接分钟
        if(remainM >= 60){
            var mtemp = parseInt(remainM / 60);
            if(mtemp < 10){
                remainTimeStr += "0"+mtemp+":";
            } else {
                remainTimeStr += mtemp+":";
            }
            remainS = remainM % 60;
        }else {
            remainTimeStr += "00:";
            remainS = remainM;
        }
        //拼接秒
        if(remainS >= 10){
            remainTimeStr += remainS;
        } else {
            remainTimeStr += "0"+remainS;
        }
        HrOjtCoursewareDto.time = remainTimeStr;//课件时长
        /*rowData.startDate = $("#startDate").val();
        rowData.endDate = $("#endDate").val();*/
        // HrOjtCoursewareDto.playProgress = $('[name = "playProgress"]:checked').val();//播放进度
        HrOjtCoursewareDto.source = $("#source").val();//来源
        // rowData.href = $("#href").val();
        HrOjtCoursewareDto.remark = $("#remark").val();//介绍
        HrOjtCoursewareDto.delflag = 0;
        HrOjtCoursewareDto.href=$("#href").val();
        /*if(rowData.startDate>rowData.endDate){
            $.xljUtils.tip("blue", "开始时间不能大于结束时间！");
            return;
        }*/
        // if(isOver == 1){
        //     $.xljUtils.tip("blue", "附件尚未上传完毕，请稍后再保存");
        //     return;
        // }

        if(files && files.length > 0){
            var fileSize = files[0].fileSize;
            if (size != undefined && size != null && fileSize > (size * 1024*1024)) {
                $.xljUtils.tip("blue", "附件过大，最大不能超过" + size + "M！");
                return;
            }
            HrOjtCoursewareDto.suffix = files[0].extendName;//视频地址
            HrOjtCoursewareDto.path =  files[0].url+"/"+files[0].path;
        }
        console.log(HrOjtCoursewareDto);
        //
        //提交
        $.ajax({
            url: hostUrl + "/ojt/hrOjtCourseware/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            async:  false,
            data: JSON.stringify(HrOjtCoursewareDto),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        $('.attachment-container').xljAttachmentSubmit();

                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        $.xljUtils.tip("red", "保存失败！");
                        return;
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    return;
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                return;
            }
        });
        window.location.href = "ojt_subject_edit.html?type=update&subjectId="+subjectId;

       /* /!*if(window.opener.getCouRowData != undefined) {
            var result = window.opener.getCouRowData(rowData);
            if (result == 0) {
                setTimeout(function () {
                    window.close();
                }, 1000);
            } else if (result == 1) {
                $.xljUtils.tip("blue", "该课件已存在！");
            }
        }else {
            alert("课程维护页面已被关闭，请重新新增课件！");
            window.close();
        }*!/!*!/*/

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
                $("#id").val(guuid);
                    //console.log("ATTACH_SERVERADDR"+ATTACH_SERVERADDR);  http://192.168.0.99/platform-app/
                $('.attachment-container').xljAttachment({
                    appId: 4,
                    businessId: guuid,
                    categoryId: ATTACH_TYPE_COURSEWARE,
                    mode: "add",
                    singleUpload:true,
                    // singleUpload: false,
                    autoSubmit: false,
                    fromTempTable: false,
                    formData:{isVideo:true},
                    serverAddr: ATTACH_SERVERADDR
                    ,fileUploaded:function (e) {
                        /*var fileSize = e.fileSize;
                        if (fileSize > (size * 1024*1024)) {
                            $.xljUtils.tip("blue", "附件过大，最大不能超过" + size + "M！");
                            return;
                        }
                        isOver = 0;*/
                        console.log("上传的附件对象的总时长");
                        console.log(e);
                        videoDuration = e.videoDuration;
                    }
                });
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     *  初始化附件上传大小限制
     */
    function initRemind(){
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
                            size = setting.size;
                        }
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化培训设置失败");
            }
        })
    }

    //初始化日期控件
    function initDatetimepicker(){
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
            startView:1,
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

    function checkForm(){
        var name = $("#name").val();
        if(name == undefined || name == null || name == ''){
            return false;
        }
        return true;
    }

})(jQuery, window, document);