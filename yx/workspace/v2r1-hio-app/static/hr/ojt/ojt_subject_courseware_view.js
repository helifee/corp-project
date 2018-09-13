/**
 * Created by xph on 2017/7/19.
 */

(function ($, window, document, undefined) {

    var subjectId;
    var video = document.getElementById("video");
    var ATTACH_TYPE_COURSEWARE = $.hrUtils.getHRSysParamByKey("ATTACH_TYPE_COURSEWARE");
    //页面类型 total统计页面
    var type;

	 // 当前播放的课件Id
	 var courseId = "";
 
    //播放次数是否需要增加
    var timesNeedAdd = 0;
    //是否播放过
    var isPlayed = 1;
    //是否播放完毕
    var isPlayOver = 1;
    //本课件上次是否播放结束
    var lastTimeOver = 0;
    var courPath;
    var courName;
    // 当播放remindTime分钟后，提示remindText
    var remindTime;
    var remindText;
    //定时器
    var remind;
    //计时使用
    var remindBeginTime;
    var remindSurplusTime;

    var extendNames = new Array("ogg", "asf", "mov", "mp4");

    //是否允许下载
    var ifDownload;

    /**
     * 在即将离开当前页面(刷新或关闭)时执行
     * @returns {boolean}
     */
    window.onbeforeunload = function () {
        //未播放过、播放完毕
        if (type == null && isPlayed == 0 && isPlayed == 1) {
            var nowPlayingCourId = $("#nowPlayingCourId").val();//获取正在播放的课件ID
            //当前播放课件的id不为空
            if (nowPlayingCourId != undefined && nowPlayingCourId != "" && nowPlayingCourId != null && nowPlayingCourId != "null" && nowPlayingCourId != "undefined") {
                updateStudyPlayInfo();
            }
            return true;
        }
    };
    $(window).resize(function () {
        resizeHeight();
        // resizeGrid();
    });
    //计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".row .modal-body").height(w_h - 40);
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

    $(function () {

        // alert(video.canPlayType(""));
        // alert(video.canPlayType("mp4"));
        // alert(video.canPlayType(".mp4"));
        // alert(video.canPlayType("flv"));
        // alert(video.canPlayType(".flv"));
        resizeHeight();
        $("#nowPlayingCourId").val("");
        initPersonId();//初始化人员ID
        getIfDownload();//获得视频的状态是否可以下载
        type = $.xljUtils.getUrlParam("type");//获取页面类型
        if (type == "total") {
            // $.xljUtils.tip("blue", "您当前打开的是统计页面，无法增加评论、笔记，并且播放时长和播放位置也不会记录。" +
            //     "如需以上功能，请从 \"自助管理>我的课程\" 中的相关按钮进入。",15000);
            $("#addCommentDiv").hide();
            $("#noteListDiv").show();//展示播放列表
            $("#addNoteDiv").hide();//隐藏添加笔记
            $("#saveNoteBtn").hide();//隐藏保存笔记按钮
            $("#saveRemarkBtn").show();
            $("#remark").removeAttr("readonly");
            $("#video").attr("height", "470px");
            $("#videoControl").hide();
        } else {
            $("#addCommentDiv").show();
            $("#noteListDiv").hide();
            $("#addNoteDiv").show();
            $("#saveNoteBtn").show();
            $("#video").attr("height", "440px");
            $("#videoControl").show();
        }
        /*var tab = $.xljUtils.getUrlParam("tab");
        if (tab == "comment") {
            $("button.commentDiv").click();
        } else if (tab == "note") {
            $("button.noteDiv").click();
        }*/
        $("#courListDiv").height($("#playDiv").height());
        initCourList("yes");//初始化课件列表
        initUuid();//初始化课件评论主键
        iniStar($("#star"));
        //保存笔记
        // $("#saveNoteBtn").on('click', function (event) {
        //     saveNote();
        // });
        // //保存评论
        // $("#saveCommentBtn").on('click', function (event) {
        //     saveComment();
        // });
        // $("#saveRemarkBtn").on('click', function (event) {
        //     saveRemark();
        // });
        // $("#play").on('click', function (event) {
        //     vidplay(event);
        // });
        //暂停
        $("#video").on('pause', function (event) {
            vidplay();
        });
        //播放
        $("#video").on('play', function (event) {
            vidplay();
        });
        //禁用右键
        video.oncontextmenu = function () {
            return false;
        }
    });

    /**
     *  初始化课件列表
     */
    function initCourList(showFirst) {
        //课程id
        var subjectId = $.xljUtils.getUrlParam("id");
        var cId = $.xljUtils.getUrlParam("cId");
        var url = type == "total" ? "ojt/hrOjtCourseware/queryTotalListByCondition" : "ojt/hrOjtCourseware/queryStudyList";
        $.ajax({
            type: "POST",
            url: hostUrl + url,
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({subjectId: subjectId, personId: $("#personId").val()}),
            success: function (data) {
                console.log("初始化列表");
                //console.log(data);
                var result = data.result;
                if (result == null || result.length == 0) {
                    return;
                }
                $("#courList").find("ul").empty();
                for (var i = 0; i < result.length; i++) {
                    var html = '';
                    html += '' +
                        '<li><div class="list-subject-view clearfix"> ' +
                        '<a href="#" style="color:#46A7FF;font-weight:bold;font-size: 14px;background:none;' +
                        '"onclick="clickCourName(this)" id="' + result[i].sid + '"> ' +
                        '<span name="' + result[i].businessId + '">' + result[i].name + '</span> ' +
                        '<input type="hidden" name="remark" value="' + result[i].remark + '"/> ' +
                        '<input type="hidden" name="studyId" value="' + result[i].studyId + '"/> ' +
                        '<input type="hidden" name="nowTime" value="' + result[i].nowTime + '"/> ' +
                        '<input type="hidden" name="totalTime" value="' + result[i].totalTime + '"/> ' +
                        '<input type="hidden" name="playTimes" value="' + result[i].playTimes + '"/> ' +
                        '<input type="hidden" name="note" value="' + result[i].note + '"/> ' +
                        '</a> ';
                    if (type != "total") {
                        if (result[i].playTimes == undefined || result[i].playTimes == '' || result[i].playTimes == 0) {
                            html += '<br/><span class="played">已播放0次</span> <p title="' + result[i].remark + '">' + result[i].remark + '</p>';
                            /* html += '<br/><span>学习状态：未学</span> ';*/
                        } else {
                            html += '<br/><span class="played">已播放' + result[i].playTimes + '次</span> <p title="' + result[i].remark + '">' + result[i].remark + '</p>';// Math.ceil(
                            /* html += '<br/><span class="played">时  长：' + result[i].time + '&nbsp;&nbsp;&nbsp;&nbsp;</span>';*/
                            /*已学时长：' + Math.ceil(result[i].totalTime / 60) + '分钟</span>*/
                            // html += '<br/><span>时  长：'+result[i].time+'&nbsp;&nbsp;&nbsp;&nbsp;已学时长：'+result[i].totalTime+'秒</span> ';
                        }
                    }
                    html += '</div></li>';
                    $("#courList").find("ul").append(html);
                }
                if(cId && cId != undefined){
                    $("#"+cId).click();
                   // return;
                }
                if (showFirst != undefined && showFirst == "yes") {
                    $("#courList").find("a:first").click();//模拟点击效果
                }

            }
        });
    }

    /**
     *  单击课件列表中的课件时判断是否已经有课件在播放
     * @param e 课程链接a对象
     */
    window.clickCourName = function (e) {
        //点击的课件ID
        //alert($("#nowPlayingCourId").val());
        var nowPlayingCourId = $(e).find("span").attr("name");//获得当前播放课件的businessId
        var oldPlayingCourId = $("#nowPlayingCourId").val();
        //如果点击的课件是现在播放的课件
        isFavorite($("#personId").val(),nowPlayingCourId);//判断是否添加了收藏
        if (oldPlayingCourId == nowPlayingCourId) {
            return;
        } else if (oldPlayingCourId != undefined && oldPlayingCourId != "" && oldPlayingCourId != null && oldPlayingCourId != "null" && oldPlayingCourId != "undefined") {
            if (type != "total") {
                var isUpdateTotalTime = true;
                if (video.paused) {
                    isUpdateTotalTime = false;
                }
                video.pause();
                $.xljUtils.confirm("blue", "当前课件正在学习中，确定切换吗？", function () {
                    //切换课件 未播放过、播放完毕
                    if (isPlayed == 0 && isPlayOver == 1) {
                        //修改上次播放的课件的学习信息
                        updateStudyPlayInfo(1, isUpdateTotalTime);
                    }
                    isPlayed = 1;
                    timesNeedAdd = 0;
                    //填充页面上的数据
                    var pt = $(e).find("input:hidden[name=playTimes]").val();
                    if(pt == "" || pt == null || pt == undefined){
                        pt = 0;
                    }
                    $("#nowCourPlayingTime").val(pt);
                    fillPageData(nowPlayingCourId, e);
                }, function () {
                    video.play();
                });
            } else {
                fillPageData(nowPlayingCourId, e);
            }
        } else {
            //填充页面上的数据
            fillPageData(nowPlayingCourId, e);
        }
    };

    /**
     *  填充页面上的数据
     *  简介、视频、评论
     * @param nowPlayingCourId 当前播放的课件id
     * @param e 点击选中的课件链接
     */
    function fillPageData(nowPlayingCourId, e) {
        $("#courList").find("a").removeClass("curSelectedNode");
        $(e).addClass("curSelectedNode");
        $("#nowPlayingCourId").val(nowPlayingCourId);
        var pt = $(e).find("input:hidden[name=playTimes]").val();
        if(pt == "" || pt == null || pt == undefined){
            pt = 0;
        }
        $("#nowCourPlayingTime").val(pt);
        //填充课件相关信息
        fillCourData(e);
        //判断是否已学
        if (type != "total") {
            var studyId = $(e).find("input:hidden[name=studyId]").val();
            if (studyId == undefined || studyId == "" || studyId == null || studyId == "null" || studyId == "undefined") {
                //未学，新增学习信息
                addStudyInfo(nowPlayingCourId);
            } else {
                $("#nowCourStudyId").val(studyId);
                var note = $(e).find("input:hidden[name=note]").val();
                //回显笔记
                $("#note").val(note == "null" ? "" : note);
                // 因IE会造成InvalidStateError异常，暂时废弃
                //修改课件播放进度为当前学习进度
                // var nowTime = $(e).find("input:hidden[name=nowTime]").val();
                // if (nowTime != undefined && nowTime != "" && nowTime != null && nowTime != "null" && nowTime != "undefined") {
                // video.currentTime = nowTime;
                // }
            }
            $("#nowCourStudyTime").val($(e).find("input:hidden[name=totalTime]").val());
        }
        //初始化课件评论列表
        // initCommentList();

    }

    /**
     *  填充课件相关数据
     *  简介
     * @param e
     */
    function fillCourData(e) {

        var businessId = $("#nowPlayingCourId").val();//当前播放的课件ID
        //预览之前先要查询该课件是否已经失效
        $.ajax({
            url: hostUrl + "ojt/hrOjtCourseware/getByBusinessId/"+businessId,
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(null),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success && xhr.result) {
                        if(!xhr.result.delflag){
                            //预览
                            playView(businessId);
                        } else {
                            $.xljUtils.tip("blue", "该课件已失效！");
                        }
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });






        // $("#play").html(">");
    }

    /**
     * 扩展名是否在允许范围内
     * @param extendName
     * @returns {boolean}
     */
    function extendNameIsInArray(extendName) {
        for (var i = 0; i < extendNames.length; i++) {
            if (extendNames[i] === extendName) {
                return true;
            }
        }
        return false;
    }


    /**
     *  当前登录用户并未学习过此课件，新增课件学习信息
     * @param nowPlayingCourId 当前课件的id
     */
    function addStudyInfo(nowPlayingCourId) {
        var ojtCourStudyDto = {};
        while (true) {
            if ($("#spareId").val() != "") {
                break;
            }
        }
        // ojtCourStudyDto.id = $("#spareId").val();
        // initUuid();
        ojtCourStudyDto.personId = $("#personId").val();
        ojtCourStudyDto.coursewareId = nowPlayingCourId;
        ojtCourStudyDto.nowTime = 0;
        ojtCourStudyDto.delflag = 0;
        ojtCourStudyDto.totalTime = 0;
        ojtCourStudyDto.playTimes = 0;
        ojtCourStudyDto.note = "";
        $.ajax({
            url: hostUrl + "ojt/hrOjtCoursewareStudy/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtCourStudyDto),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        console.log("新增学习进度信息成功！");
                        initCourList();
                        initUuid();
                        // $("#nowCourStudyId").val(ojtCourStudyDto.id);
                        $("#nowCourStudyId").val(xhr.result);
                        $("#nowCourPlayingTime").val(ojtCourStudyDto.playTimes);
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        console.log("学习进度保存失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                //console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });

        //第一次观看添加历史学习记录
        var ojtLeranHistoryDto = {};
        var subjectId = $.xljUtils.getUrlParam("id");
        ojtLeranHistoryDto.personId = $("#personId").val();//人员ID
        ojtLeranHistoryDto.remainTime = "";//剩余时间(未看过)
        ojtLeranHistoryDto.coursewareId = nowPlayingCourId;//当前播放课件I
        ojtLeranHistoryDto.trainClass = subjectId;
        initUuid();
        ojtLeranHistoryDto.id = $("#spareId").val();
        ojtLeranHistoryDto.delflag = 0;
        //新增播放历史
        $.ajax({
            url: hostUrl+ "ojt/ojtLeranHistory/saveHistory/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtLeranHistoryDto),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        console.log("新增历史学习信息成功！");
                        //initCourList();
                        //initUuid();
                       // $("#nowCourStudyId").val(ojtCourStudyDto.id);
                        //$("#nowCourPlayingTime").val(ojtCourStudyDto.playTimes);
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        console.log("历史学习保存失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                //console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    /**
     *  当前播放的课件的学习次数+1
     */
    function addPlayingTimes() {
        var playTimes = $("#nowCourPlayingTime").val();
        if(playTimes == null || playTimes == "" || playTimes == undefined){
            playTimes = 0;
        }
        var ojtCourStudyDto = {};
        ojtCourStudyDto.id = $("#nowCourStudyId").val();
        ojtCourStudyDto.playTimes = Number(playTimes) + 1;
        updateStudy(ojtCourStudyDto, 0);
    }


    /**
     *  修改上一次播放的课件的学习信息，同时将课件学习信息展示
     *  @param flag 是否修改当前课程的播放次数
     *  @param isUpdateTotalTime 是否更新总时间
     */
    function updateStudyPlayInfo(flag, isUpdateTotalTime) {
        //////////////////////////////////////获取当前播放时间//////////////////////////////////////////
        var nowTime;
        //获取播放之前的开始播放时间
        var nowPlayingCourId = $("#nowPlayingCourId").val();
        var a = $("#courList").find("span[name=" + nowPlayingCourId + "]").parent();
        var oldNowTime = $(a).find("input:hidden[name=nowTime]").val();//播放之前的开始播放时间

        //IE浏览器的当前播放时间为video.currentTime(当前播放的时间)+开始时间
        //其他浏览器的当前播放时间为video.currentTime(当前播放到的时间)
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            // alert("是IE");
            nowTime = Number(video.currentTime) + Number(oldNowTime);
        } else {
            // alert("不是IE");
            nowTime = video.currentTime;
        }
        //////////////////////////////////////获取当前播放时间结束////////////////////////////////////////

        ///////////////////////////////////////计算播放总时间////////////////////////////////////////////
        //先获取原播放总时间
        var totalTime = $("#nowCourStudyTime").val();
        if (isUpdateTotalTime) {
            //若原播放总时间为空，则播放总时间=当前播放时间
            if (totalTime != undefined && totalTime != "" && totalTime != null && totalTime != "null" && totalTime != "undefined") {
                if (lastTimeOver == 2 || (!!window.ActiveXObject || "ActiveXObject" in window))
                    totalTime = parseFloat(totalTime) + video.currentTime;
                else
                    totalTime = parseFloat(totalTime) + video.currentTime - Number(oldNowTime);
            } else {
                totalTime = video.currentTime;
            }
        }
        var ojtCourStudyDto = {};
        ojtCourStudyDto.id = $("#nowCourStudyId").val();
        ojtCourStudyDto.totalTime = totalTime;
        if (!!window.ActiveXObject || "ActiveXObject" in window) {
            //当前因无法设置IE浏览前的currentTime,故IE下一直是从0开始播放
            ojtCourStudyDto.nowTime = video.currentTime;
        } else {
            ojtCourStudyDto.nowTime = nowTime;
        }
        ojtCourStudyDto.playTimes = $("#nowCourPlayingTime").val();
        if (type != "total") {
            updateStudy(ojtCourStudyDto, flag);
            //在此处修改历史播放记录，并且记录最后一次的历史播放时间
          // alert("当前已经播放的时间:nowTime"+nowTime);//累计播放时间
            //构造播放历史对象
            var ojtLeranHistory = {};
            var current = parseInt(nowTime);
            ojtLeranHistory.personId = $("#personId").val();//人员ID
            ojtLeranHistory.coursewareId = $("#nowPlayingCourId").val();
            var subjectId = $.xljUtils.getUrlParam("id");
            ojtLeranHistory.trainClass = subjectId;
            ojtLeranHistory.remainTime = current;
            $.ajax({
                url: hostUrl + "ojt/ojtLeranHistory/updateHistory",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify(ojtLeranHistory),
                success: function (resultData) {

                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", "播放次数保存请求失败");
                }
            });
        }
        $("#nowCourStudyTime").val(totalTime);
    }

    /**
     *  修改学习信息，提交数据
     * @param ojtCourStudyDto
     * @param flag 是否修改当前课程的播放次数
     */
    function updateStudy(ojtCourStudyDto, flag) {
        $.ajax({
            url: hostUrl + "ojt/hrOjtCoursewareStudy/update/" + ojtCourStudyDto.id,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtCourStudyDto),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        initCourList();
                        if (flag == 0) {
                            $("#nowCourPlayingTime").val(ojtCourStudyDto.playTimes);
                        }
                    } else {
                        pop_tip_open("red", "播放次数保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "播放次数保存请求失败");
            }
        });
    }

    /**
     *  初始化评论列表、星级
     *  @param nowPlayingCourId当前播放的课程id
     */
    function initCommentList() {
        //当前播放的课件
        var nowPlayingCourId = $("#nowPlayingCourId").val();
        $.ajax({
            type: "POST",
            url: hostUrl + "ojt/hrOjtCoursewareComment/queryListByCondition",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({coursewareId: nowPlayingCourId}),
            success: function (data) {
                var result = data.result;
                if (result == null) {
                    return;
                }
                $("#commentList").empty();
                for (var i = 0; i < result.length; i++) {
                    var html = '';
                    html += '<div style="border: 1px dashed #acd7ff;margin: 20px;padding: 10px;line-height: 25px"> ';
                    html +=
                        '<input type="hidden" name="personId" value="' + result[i].personId + '"/> ' +
                        '<input type="hidden" name="starLevel" value="' + result[i].starLevel + '"/> ' +
                        '<input type="hidden" name="content" value="' + result[i].content + '"/> ' +
                        '<input type="hidden" name="isReal" value="' + result[i].isReal + '"/> ';
                    html +=
                        '<div class="star" id="star' + i + '" style="height: 19px">' +
                        '<span>' + (result[i].isReal == "0" ? "匿名用户" : result[i].personName) + '：</span>' +
                        '<ul>' +
                        '<li><a href="javascript:;">1</a></li>' +
                        '<li><a href="javascript:;">2</a></li>' +
                        '<li><a href="javascript:;">3</a></li>' +
                        '<li><a href="javascript:;">4</a></li>' +
                        '<li><a href="javascript:;">5</a></li>' +
                        '</ul>' +
                        '<span></span>' +
                        '<p></p>' +
                        '</div>';
                    html += '<span style="font-size: 16px;">' + result[i].content + '</span>';
                    html += '</div>';
                    $("#commentList").append(html);
                    var star = $("#star" + i);
                    iniStar(star);
                    star.find("a:eq(" + result[i].starLevel + ")").trigger("click");
                    star.find("a:eq(" + result[i].starLevel + ")").trigger("mouseover");
                    star.find("li").unbind();
                }
                iniStar($("#star"));
            }
        });
    }

    /**
     *  初始化笔记列表
     */
    function initNoteList() {
        var nowPlayingCourId = $("#nowPlayingCourId").val();
        $.ajax({
            type: "POST",
            url: hostUrl + "ojt/hrOjtCoursewareStudy/queryNoteListByCondition",
            dataType: "JSON",
            contentType: "application/json",
            data: JSON.stringify({coursewareId: nowPlayingCourId}),
            success: function (data) {
                var result = data.result;
                if (result == null) {
                    return;
                }
                $("#noteList").empty();
                for (var i = 0; i < result.length; i++) {
                    var html = '';
                    html += '<div style="border: 1px dashed #acd7ff;margin: 20px;padding: 10px;line-height: 25px"> ';
                    html += '<span style="font-size: 16px;">' + result[i] + '</span>';
                    html += '</div>';
                    $("#noteList").append(html);
                }
            }
        });
    }

    /**
     *  保存笔记
     */
    function saveNote() {
        var nowCourStudyId = $("#nowCourStudyId").val();
        if (nowCourStudyId == undefined || nowCourStudyId == "") {
            $.xljUtils.tip("blue", "请选择课件列表的课件后再保存笔记！");
            return;
        }
        var ojtCourStudyDto = {};
        ojtCourStudyDto.id = nowCourStudyId;
        ojtCourStudyDto.note = $("#note").val();
        $.ajax({
            url: hostUrl + "ojt/hrOjtCoursewareStudy/update/" + ojtCourStudyDto.id,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtCourStudyDto),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        pop_tip_open("green", "笔记保存成功！");
                    } else {
                        pop_tip_open("red", "笔记保存失败！");
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "笔记保存请求失败");
            }

        });
    }


    /**
     *  保存评论
     */
    function saveComment() {
        var nowPlayingCourId = $("#nowPlayingCourId").val();
        if (nowPlayingCourId == undefined || nowPlayingCourId == "") {
            $.xljUtils.tip("blue", "请选择课件列表的课件后再提交评论！");
            return;
        }
        if ($("#star .starLevel")[0] == undefined) {
            $.xljUtils.tip("blue", "请选择评论星级后再提交评论！");
            return;
        }
        var starLevel = $("#star .starLevel").html().substr(0, 1);
        var comment = $("#comment").val();
        if (comment == undefined || comment == "" || comment == null) {
            $.xljUtils.tip("blue", "请填写评论内容后再提交评论！");
            return;
        }
        var ojtCourCommentDto = {};
        ojtCourCommentDto.delflag = 0;
        ojtCourCommentDto.id = $("#spareId").val();
        ojtCourCommentDto.personId = $("#personId").val();
        initUuid();
        ojtCourCommentDto.coursewareId = nowPlayingCourId;
        ojtCourCommentDto.starLevel = Number(starLevel) - 1;
        ojtCourCommentDto.isReal = $("#isReal").prop("checked") ? 0 : 1;
        ojtCourCommentDto.content = comment;
        $.ajax({
            url: hostUrl + "ojt/hrOjtCoursewareComment/save",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtCourCommentDto),
            success: function (xhr, textStatus) {
                //console.log(xhr);
                if (xhr) {
                    if (xhr.success) {
                        console.log("新增评论成功！");
                        initCommentList();
                        cleanComment();
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
                //console.log(xhr);
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }


    function saveRemark() {
        var nowPlayingCourId = $("#nowPlayingCourId").val();
        if (nowPlayingCourId == undefined || nowPlayingCourId == "") {
            $.xljUtils.tip("blue", "请选择课件列表的课件后再保存课件简介！");
            return;
        }
        var ojtCourDto = {};
        ojtCourDto.id = nowPlayingCourId;
        ojtCourDto.remark = $("#remark").val();
        $.ajax({
            url: hostUrl + "ojt/hrOjtCourseware/update/" + ojtCourDto.id,
            type: 'put',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(ojtCourDto),
            success: function (resultData) {
                if (resultData) {
                    var successFlag = resultData.success;
                    var result = resultData.result;
                    var msg = resultData.msg;
                    if (successFlag) {
                        pop_tip_open("green", "简介保存成功！" + msg);
                        initCourList();
                    } else {
                        pop_tip_open("red", "简介保存失败！" + msg);
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "简介保存请求失败");
            }

        });
    }

    function downloadCour(fileUrl, fileName) {
        var urlBody = "/ojt/hrOjtCourseware/downloadCour";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            data: {
                "fileUrl": fileUrl,
                "fileName": fileName
            },
            async: false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {//指定下载
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action', hostUrl + "/ojt/hrOjtCourseware/exportInfoClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type', 'hidden');
                        input1.attr('name', "path");
                        input1.attr('value', path);

                        $('body').append(form);  //将表单放置在web中
                        form.append(input1);   //将查询参数控件提交到表单上
                        form.submit();   //表单提交
                        pop_tip_open("", "下载成功");
                    }
                } else {
                    pop_tip_open("red", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "该模板文件未找到，下载失败");
            }
        });
    }

    /**
     * 重置评论
     */
    function cleanComment() {
        var lis = $("#star").find("li");
        for (i = 0; i < lis.length; i++) {
            lis[i].className = "";
        }
        $("#starLevelSpan").html("");
        $("#isReal").attr("checked", false);
        $("#comment").val("");
    }

   /* *//**
     * 初始化提醒
     *//*
    function initRemind() {
        var uAll = hostUrl + "ojt/hrOjtSetting/queryListByCondition";
        $.ajax({
            type: 'post',
            url: uAll,
            data: JSON.stringify({}),
            dataType: "JSON",
            async: false,
            contentType: "application/json",
            success: function (data) {
                if (data.result) {
                    if (data.result[0]) {
                        var setting = data.result[0];
                        if (setting) {
                            remindTime = setting.minute * 60 * 1000;
                            // remindTime = 2000;
                            remindText = setting.remind;
                        }
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化培训设置失败");
            }
        })
    }*/

    /**
     * 判断课件是否允许下载
     */
    function getIfDownload() {
        var subjectId = $.xljUtils.getUrlParam("id");
        var uAll = hostUrl + "ojt/hrOjtSubject/get/" + subjectId;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var subject = data.result;
                ifDownload = subject.ifDownload;
                if(ifDownload && ifDownload=="1009100036"){
                    $("#download").show();
                } else{
                    $("#download").hide();
                    $("#favorite").css("float",'');
                    $("#favorite").css("margin-left",'95%');
                    $("#favorite").css("margin-top",'');
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     * 初始化课件评论主键ID
     */
    function initUuid() {
        var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#spareId").val(guuid);
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    /**
     *  获取当前登录用户的ID
     */
    function initPersonId() {
        var personInfoDto = $.hrUtils.getLoginUser();
        if (personInfoDto != null) {
            var personId =  personInfoDto.userId;
            var personName = personInfoDto.name;
            $("#personId").val(personId);
           // alert("personId"+personId);
            $("#personName").html(personName);
        }
    }

    function iniStar(star) {
        var oStar = $(star);
        var aLi = $(oStar).find("li");
        var oUl = $(oStar).find("ul")[0];
        var oSpan = $(oStar).find("span")[1];
        // var oP = $(oStar).find("p")[0];
        var i = iScore = iStar = 0;
        // var aMsg = [
        //     "很不满意|差得太离谱，与卖家描述的严重不符，非常不满",
        //     "不满意|部分有破损，与卖家描述的不符，不满意",
        //     "一般|质量一般，没有卖家描述的那么好",
        //     "满意|质量不错，与卖家描述的基本一致，还是挺满意的",
        //     "非常满意|质量非常好，与卖家描述的完全一致，非常满意"
        // ]
        for (i = 1; i <= aLi.length; i++) {
            aLi[i - 1].index = i;
            //鼠标移过显示分数
            $(aLi[i - 1]).bind("mouseover", function () {
                // fnPoint(this.index);
                for (i = 0; i < aLi.length; i++) aLi[i].className = i < this.index ? "on" : "";
                // //浮动层显示
                // oP.style.display = "block";
                // //计算浮动层位置
                // oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
                // //匹配浮动层文字内容
                // oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
            });

            //鼠标离开后恢复上次评分
            $(aLi[i - 1]).bind("mouseout", function () {
                // fnPoint();
                for (i = 0; i < aLi.length; i++) aLi[i].className = i < iStar ? "on" : "";
                //关闭浮动层
                // oP.style.display = "none"
            });
            //点击后进行评分处理
            $(aLi[i - 1]).bind("click", function () {
                iStar = this.index;
                // oP.style.display = "none";
                // oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")"
                oSpan.innerHTML = "<strong class='starLevel'>" + (this.index) + " 星</strong>"
            })
        }
    }

    // 简介||评论||笔记的切换
    $(".right-content .con-tit button").on("click", function (e) {
        $(this).siblings().removeClass("active");//同胞移除激活状态的样式
        $(this).addClass("active");//自己激活
        //如果有这个样式
        if ($(this).attr('class').indexOf('remarkDiv') > 0) {
            $("#remarkDiv").css("display", "block");
            $("#commentDiv").css("display", "none");
            $("#noteDiv").css("display", "none");
        } else if ($(this).attr('class').indexOf('commentDiv') > 0) {
            $("#remarkDiv").css("display", "none");
            $("#commentDiv").css("display", "block");
            $("#noteDiv").css("display", "none");
        } else {
            $("#remarkDiv").css("display", "none");
            $("#commentDiv").css("display", "none");
            $("#noteDiv").css("display", "block");
        }
        $.xljUtils.gridResizeFn();
        e.stopPropagation();
    });


    ///////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////视频相关/////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
//
    function vidplay() {
//        if (video.src == null || video.src == "") {
//            pop_tip_open("red", "该课件未加载到可播放文件！");
//            return;
//        }
    	var isCanPlay = true;
    	$('#video source').each(function(index, obj){
    	    if (obj.src == null || obj.src == "") {
    	    	isCanPlay = false;
    	        return false;
    	    }
        });
        if(!isCanPlay) {
            pop_tip_open("red", "该课件未加载到可播放文件！");
            return;
        }
        
        if (video.error != null) {
            pop_tip_open("red", "视频加载出现问题！");
            return;
        }
        if (video.networkState == 3) {
            pop_tip_open("red", "视频资源没有找到，无法播放！");
            return;
        }
        if (video.networkState == 2) {
            //pop_tip_open("blue", "视频还未缓存完毕，如播放中遇到卡顿请稍后！");
        }
        // button = evt.target; //  get the button id to swap the text based on the state
        if (!video.paused) {   // play the file, and display pause symbol
            // video.play();
            // button.textContent = "||";

            // 如果切换视频集数，需要增加播放次数
            if(courseId != $("#nowPlayingCourId").val()) {
            	timesNeedAdd = 0;
            	courseId = $("#nowPlayingCourId").val();
            }
            
            if (remindTime != undefined && remindText != undefined) {
                if (remindBeginTime == undefined) {
                    remindBeginTime = new Date().getTime();
                    remindSurplusTime = remindTime;
                }
                remind = setTimeout(function () {
                    pop_tip_open("blue", remindText);
                }, remindSurplusTime);
            }
            if (timesNeedAdd == 0 && type != "total") {//
                addPlayingTimes();
                timesNeedAdd = 1;
                if (lastTimeOver == 1) {
                    lastTimeOver = 2;
                }
            }
            if (isPlayed == 1)
                isPlayed = 0;
            isPlayOver = 1;
        } else {              // pause the file, and display play symbol 暂停播放
            // video.pause();
            // button.textContent = ">";
            if (remindTime != undefined && remindText != undefined) {
                if (remindBeginTime != undefined) {
                    remindSurplusTime -= new Date().getTime() - remindBeginTime;
                }
                clearTimeout(remind);
            }
            updateStudyPlayInfo(1, true);
        }
    }

    $("#video").on("loadeddata", function (event) {
            // $("#play").html(">");
            var nowPlayingCourId = $("#nowPlayingCourId").val();
            var a = $("#courList").find("span[name=" + nowPlayingCourId + "]").parent();
            var nowTime = $(a).find("input:hidden[name=nowTime]").val();
            if (nowTime != undefined && nowTime != "" && nowTime != null && nowTime != "null" && nowTime != "undefined") {
            video.currentTime = nowTime;
        }
            lastTimeOver = 0;
        }
    );
    $("#video").on("ended", function (event) {
       // pop_tip_open("blue", "视频播放完毕！");
        // $("#play").html(">");
        if (isPlayed == 0) {
            isPlayOver = 0;
            timesNeedAdd = 0;
            if (type != "total") {
                updateStudyPlayInfo(0, true);
                video.currentTime = 0;
                video.pause();
                lastTimeOver = 1;
            }
            remindBeginTime = undefined;
            remindSurplusTime = undefined;
        }
    });

    window.showCurrentTime = function () {
        //alert(video.currentTime);
    };
    $("#cancelBtn").click(function () {
        if(type && type == "total"){//返回培训管理
            window.location.href="ojt_subject.html";
        } else if(type == "self" ){//返回课程库
            window.location.href="../self/sys_serial_number_list.html";
        } else if( type == 'self_history' ){
            window.location.href="../self/sys_serial_number_list.html?back=history";
        } else if(type == 'self_favorite'){
            window.location.href="../self/sys_serial_number_list.html?back=favorite";
        }

    })

    //增加收藏
    $("#favoriteBtn").click(function () {
        addFavorite();
    })

    function isFavorite(personId,courseId){
        if(personId && personId != null && personId != "" && courseId && courseId != null && courseId != ""){
            var param = {};
            param.personId = personId;//人员ID
            param.coureId = courseId;//课件的businessId
            $.ajax({
                url: hostUrl + "ojt/hrOjtFavorite/getByTwoIds",
                type: 'POST',
                dataType: 'JSON',
                contentType: 'application/json',
                data: JSON.stringify(param),
                success: function (xhr, textStatus) {
                    if (xhr) {
                        if (xhr.success) {
                            if(xhr.result != null && xhr.result.count >= 1){
                                //该课件已经被收藏
                               // $("#favoriteBtn").html("取消收藏");
                                $("#favoriteImg").attr("src",baseUrl+"/hr/images/faverate_ok.png");
                                $('#favoriteBtn').unbind("click");//先移除  在绑定
                                $("#favoriteBtn").click(function () {
                                	//console.log(xhr);
                                    delFavorite(xhr.result.id);
                                })
                            } else {
                                //$("#favoriteBtn").html("收藏");
                                $("#favoriteImg").attr("src",baseUrl+"/hr/images/faverate_b.png");
                                $('#favoriteBtn').unbind("click");//先移除  在绑定
                                $("#favoriteBtn").click(function () {
                                    addFavorite();
                                })
                            }
                        } else {
                            if (xhr.code == "50000") {
                                $.xljUtils.tip("red", "更新收藏状态失败");
                                return;
                            }
                        }
                    } else {
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }

            });
        }
    }

    function delFavorite(id){
        $.ajax({
            url: hostUrl + "ojt/hrOjtFavorite/delete/"+id,
            type: 'DELETE',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(null),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "课件取消收藏成功！");
                        //$("#favoriteBtn").html("收藏");
                        $("#favoriteImg").attr("src",baseUrl+"/hr/images/faverate_b.png");
                        $('#favoriteBtn').unbind("click");//先移除  在绑定
                        $("#favoriteBtn").click(function () {
                            addFavorite();
                        })
                        return;
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", "课件取消收藏失败！");
                            return;
                        }
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    function addFavorite() {
        var hrOjtFavoriteDto = {};
        hrOjtFavoriteDto.delflag = 0;
        hrOjtFavoriteDto.personId =  $("#personId").val();//人员ID
        hrOjtFavoriteDto.subjectId = $.xljUtils.getUrlParam("id");//课程ID
        hrOjtFavoriteDto.coursewareId = $("#nowPlayingCourId").val();//课件的businessID
        hrOjtFavoriteDto.id = $("#spareId").val();//初始化一个UUID
        $.ajax({
            url: hostUrl + "ojt/hrOjtFavorite/save/",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(hrOjtFavoriteDto),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "收藏添加成功！");
                       // $("#favoriteBtn").html("取消收藏");
                        $("#favoriteImg").attr("src",baseUrl+"/hr/images/faverate_ok.png");
                        $('#favoriteBtn').unbind("click");//先移除  在绑定
                        $("#favoriteBtn").click(function () {
                            delFavorite(hrOjtFavoriteDto.id);
                        })
                    } else {
                        if (xhr.code == "50000") {
                            $.xljUtils.tip("red", xhr.msg);
                            return;
                        }
                        console.log("历史学习保存失败！");
                    }
                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });

    }

    function playView(businessId) {
        $('.attachment-container').xljAttachment({
            appId: '4',
            businessId: businessId,
            categoryId: ATTACH_TYPE_COURSEWARE,
            mode: "view",
            serverAddr: ATTACH_SERVERADDR
        });
        //获取视频路径
        $.xljUtils.queryAttachmentUrlList("4", businessId, ATTACH_TYPE_COURSEWARE, function (succ, data1) {
                if (succ == true) {
                    var cour = data1.result[0];
                    if (cour) {
                        $("#filePath").val(cour.path);
                        $("#fullName").val(cour.fullName);
                        $("#fileSid").val(cour.sid);

                        var fileUrl = "";
                        var canPlay = false;
                        if (cour.type == "file") {
                            if(cour.url && cour.url.indexOf("null") >= 0){
                                cour.url = cour.url.split(":null")[0];
                            }
                            fileUrl = cour.url + '/' + cour.path;
                            if (extendNameIsInArray(cour.extendName)) {
                                canPlay = true;
                            }
                        } else if (cour.type == "url") {
                            var splitUrl = cour.url.split(".");
                            if (splitUrl.length > 0) {
                                if (extendNameIsInArray(splitUrl[splitUrl.length - 1])) {
                                    fileUrl = cour.url;
                                    canPlay = true;
                                }
                            }
                        }
                        if (!canPlay) {
                            $.xljUtils.tip("blue", "本课件格式不支持播放!");
                        }
                        if (cour.type == "url" && fileUrl == "") {
                            window.open(cour.url);
                        }
                        //video.src ="http://"+ fileUrl;
                        var access_token = window.parent.JZY.s.getAccessTokenByAuthorization();
                        //video.src = ATTACH_SERVERADDR + "disk/attachment/downLoadByFileIdAndTendId/" + cour.sid + "/null?" + access_token;
                        $('#video source').each(function(index, obj){
    						obj.src = ATTACH_SERVERADDR + "disk/attachment/downLoadByFileIdAndTendId/" + cour.sid + "/null?" + access_token;
    			        });
                        
                        video.load();
                    } else {
                        //该课件已失效，未找到相应资源
                        $.xljUtils.tip("red", "该课件已失效，未找到相应资源!");
                    }
                } else {
                    //获取课件请求失败
                    $.xljUtils.tip("red", "获取课件文件请求失败");
                }
            }, false
        );
    }

    $("#downloadBtn").click(function(){
        var fileInfo = {};
        fileInfo.path = $("#filePath").val();
        fileInfo.fullName = $("#fullName").val();
        fileInfo.sid = $("#fileSid").val();
        $.xljUtils.xljDownloadFromFileInfo(fileInfo);
    })

})(jQuery, window, document);