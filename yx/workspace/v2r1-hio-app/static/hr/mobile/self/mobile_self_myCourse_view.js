/**
 * 我的课程视频播放页面
 * @type {Element}
 */
$.weui = {};
$.weui.alert = function (options) {
    options = $.extend({title: '警告', text: '警告内容'}, options);
    var $alert = $('.weui_dialog_alert');
    $alert.find('.weui_dialog_title').text(options.title);
    $alert.find('.weui_dialog_bd').text(options.text);
    $alert.on('touchend click', '.weui_btn_dialog', function () {
        $alert.hide();
    });
    $alert.show();
};
//播放器
var video = document.getElementById("video");
//课件附件
var ATTACH_TYPE_COURSEWARE = $.hrUtils.getHRSysParamByKeyMobile("ATTACH_TYPE_COURSEWARE");
//允许播放视频的扩展名
var extendNames = new Array("ogg", "avi", "asf", "mov", "mp4");

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

// 当播放remindTime分钟后，提示remindText
var remindTime;
var remindText;
//定时器
var remind;
//计时使用
var remindBeginTime;
var remindSurplusTime;
//是否允许下载
var ifDownload;

//上来就执行
$(function () {
    var tendId = $.xljUtils.getUrlParam("tendId");
    var businessId = $.xljUtils.getUrlParam("businessId");//附件业务id是课程中课件的id nowPlayingCourId
    var subjectId = $.xljUtils.getUrlParam("id");//课程id
    $("#nowPlayingCourId").val(businessId);
    //初始化评论id
    initUuid();
	//初始化personId
    initPersonId();
    //初始化课件信息
    initCourList(subjectId,businessId);
    //填充课件
    fillCourData(businessId);
    //判断课件是否能下载
    getIfDownload(subjectId);
    //初始化星星
  /*  iniStar($("#star"));
    //初始化提醒
    initRemind();*/
    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
});
/**
 * 在即将离开当前页面(刷新或关闭)时执行
 * @returns {boolean}
 */
window.onbeforeunload = function () {
    //未播放过、播放完毕
    if (isPlayed == 0 && isPlayOver == 1) {
        var nowPlayingCourId = $("#nowPlayingCourId").val();
        //当前播放课件的id不为空
        if (nowPlayingCourId != undefined && nowPlayingCourId != "" && nowPlayingCourId != null && nowPlayingCourId != "null" && nowPlayingCourId != "undefined") {
            updateStudyPlayInfo();
        }
        return true;
    }
};
//保存笔记
$("#saveNoteBtn").on('click', function (event) {
    saveNote();
});
//保存评论
$("#saveCommentBtn").on('click', function (event) {
    saveComment();
});
//暂停
$("#video").on('pause', function (event) {
    vidplay();
});
//播放
$("#video").on('play', function (event) {
    vidplay();
});
video.oncontextmenu = function () {
    return false;
};
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
});
/**
 *  加载课件信息
 *  @param subjectId 课程id
 *  @param id 课件id
 */
function initCourList(subjectId,id) {
var cId = $.xljUtils.getUrlParam("cId");
    var url ="ojt/hrOjtCourseware/queryStudyList";
    $.ajax({
        type: "POST",
        url: hostUrl + url,
        dataType: "JSON",
        contentType: "application/json",
        data: JSON.stringify({subjectId: subjectId, personId: $("#personId").val()}),
        success: function (data) {
            var result = data.result;
            if(result != null && result.length > 0){
                $("#coure_title").html();
                for(var i = 0; i < result.length; i++){
                    var apphtml = '';
                        apphtml+=' <div class="xiang_guanb" id=\"xiangGuan'+result[i].id+'\" onclick="goToPlay(this)">'+
                            // '<div class="xiang_guan_pic">'+ "<img src='data:image/jpeg;base64," + result[i].photo + "' height='75px' width='120px' id='img' style='margin: 5px;'/>" +'</div>'+
                            '<div class="xiang_guan_pic" style="width: 133px;height: 80px;background-color: black;color: white;text-align: center;">'+ result[i].name + '</div>'+
                            '<div class="xiang_guan_tit">'+
                            '<p class="xiang_guan_titb">'+ result[i].name +'</p>'+
                            '<p class="xiang_guan_time">'+result[i].time+'</p>'+
                        '</div>'+
                       ' </div>';
                    $("#jianJie").append(apphtml);
                    var index = i+1;
                    var html = '<p class="coure_title" title="'+ result[i].name +'" onclick="goPlay(this)" id="'+result[i].id+'" businessId="'+ result[i].businessId +'" ><span class="index_name">'+ index+'</span>' ;
                    var HrOjtCoursewareDto=result[i];
                    if(HrOjtCoursewareDto!=null){
                        //课件id
                        /*var id=HrOjtCoursewareDto.id;
                        $('#id').val(id);*/
                        //$('#nowPlayingCourId').val(id);
                        html+='<input type="hidden" name="nowPlayingCourId" value="'+ HrOjtCoursewareDto.businessId +'">';
                        html+='<input type="hidden" name="name" value="'+ HrOjtCoursewareDto.name +'">';
                        //课程简介
                        // var remark=HrOjtCoursewareDto.remark;
                        // $('#remark').val(remark);
                        html+='<input type="hidden" name="remark" value="简介：'+ HrOjtCoursewareDto.remark +'">';
                        // var nowTime=HrOjtCoursewareDto.nowTime;
                        // $('#nowTime').val(nowTime);
                        html+='<input type="hidden" name="nowTime" value="'+ HrOjtCoursewareDto.nowTime +'">';
                        //已学时长
                        // var totalTime=HrOjtCoursewareDto.totalTime;
                        // $("#nowCourStudyTime").val(totalTime);
                        html+='<input type="hidden" name="totalTime" value="'+ HrOjtCoursewareDto.totalTime +'">';
                        //播放次数
                        // var playTimes=HrOjtCoursewareDto.playTimes;
                        // $('#nowCourPlayingTime').val(playTimes);
                        html+='<input type="hidden" name="playTimes" value="'+ HrOjtCoursewareDto.playTimes +'">';
                        var time=HrOjtCoursewareDto.time;//时长
                        //课件学习信息id
                        var studyId=HrOjtCoursewareDto.studyId;
                        html+='<input type="hidden" name="studyId" value="'+ HrOjtCoursewareDto.studyId +'">';
                        /*if (studyId == undefined || studyId == "" || studyId == null || studyId == "null" || studyId == "undefined") {
                            //未学，新增学习信息
                            addStudyInfo(id);
                        } else {
                            $("#nowCourStudyId").val(studyId);
                            //笔记
                            var note=HrOjtCoursewareDto.note;
                            $('#note').val(note);
                        }*/
                        //初始化评论
                        // initCommentList();
                    }
                    html+='</p>';
                    $("#coure_title").append(html);
                    $(".coure_name").html(result[i].name);
                    $(".coure_remark").html(result[i].remark);
                    //如果指定了播放哪个，就播放哪个
                   if(cId != null && cId){
                        $("#"+cId).click();
                    } else {//没有指定，默认播放第一个
                        $("#coure_title").children("p")[0].click();
                    }
                }
            }

        }
    });
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
    //后台生成的才对
    // ojtCourStudyDto.id = $("#spareId").val();
    initUuid();
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
                    //initCourList();
                    initUuid();
                    $("#nowCourStudyId").val(xhr.result);
                    $("#nowCourPlayingTime").val(ojtCourStudyDto.playTimes);
                } else {
                    if (xhr.code == "50000") {
                        var options = {title: '提示', text: xhr.msg};
                        $.weui.alert(options);
                        return;
                    }
                }
            } else {
                var options = {title: '提示', text: "服务异常,请联系管理员！"};
                $.weui.alert(options);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
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
        url: hostUrl + "ojt/ojtLeranHistory/saveHistory/",
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
            console.log(xhr);
            $.xljUtils.tip("red", "服务异常,请联系管理员！");
        }

    });
}
/**
 *  填充课件相关数据
 * @param businessId 业务id
 */
function fillCourData(businessId) {
    //如果没有指定播放哪个课件，返回
    if(businessId==null){
        return ;
    }
    //应先查询该视频是否已经下架，如果下架直接进行提示（单独的视频或者课程下架，都会导致课件失效）
    $.ajax({
        url: hostUrl + "ojt/hrOjtCourseware/getBusinissId/"+businessId,
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
                        //表示该课件已经失效
                        var options = {title: '提示', text: "该课件已经失效！！"};
                        $.weui.alert(options);
                    }
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }

    });
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
 * 判断课件是否允许下载
 */
function getIfDownload(subjectId) {

    var uAll = hostUrl + "ojt/hrOjtSubject/get/" + subjectId;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            console.log(data);
            var subject = data.result;
            ifDownload = subject.ifDownload;
            if(ifDownload && ifDownload=="1009100036"){
                $("#downloadBtn").show();
            } else{
                $("#downloadBtn").hide();
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: '获取课件是否允许下载失败'};
            $.weui.alert(options);
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
        // async:false,
        success: function (data) {
            var guuid = data.result;
            $("#spareId").val(guuid);
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: '初始化主键ID请求失败'};
            $.weui.alert(options);
        }
    })
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
            for (i = 0; i < aLi.length; i++) {
                aLi[i].className = i < this.index ? "on" : "";
            }
        });

        //鼠标离开后恢复上次评分
        $(aLi[i - 1]).bind("mouseout", function () {
            for (i = 0; i < aLi.length; i++){
                aLi[i].className = i < iStar ? "on" : "";
            }
        });
        //点击后进行评分处理
        $(aLi[i - 1]).bind("click", function () {
            iStar = this.index;
            oSpan.innerHTML = "<strong class='starLevel'>" + (this.index) + " 星</strong>"
        })
    }
}
/**
 * 初始化提醒
 */
function initRemind(){
   /* var uAll = hostUrl + "ojt/hrOjtSetting/queryListByCondition";
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
                        remindTime = setting.minute*60*1000;
                        // remindTime = 2000;
                        remindText = setting.remind;
                    }
                }
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: '初始化培训设置失败'};
            $.weui.alert(options);
        }
    })*/
}
/**
 *  保存笔记
 */
function saveNote(){
    //当前课程的学习id
    var nowCourStudyId = $("#nowCourStudyId").val();
    if (nowCourStudyId==undefined||nowCourStudyId==""){
        var options = {title: '提示', text: '请选择课件列表的课件后再保存笔记！'};
        $.weui.alert(options);
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
                    var options = {title: '提示', text: '笔记保存成功！'};
                    $.weui.alert(options);
                } else {
                    var options = {title: '提示', text: '笔记保存失败！'};
                    $.weui.alert(options);
                }
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            var options = {title: '提示', text: '笔记保存请求失败'};
            $.weui.alert(options);
        }

    });
}
/**
 *  保存评论
 */
function saveComment(){
    //当前播放的课件id
    var nowPlayingCourId = $("#nowPlayingCourId").val();
    if (nowPlayingCourId==undefined||nowPlayingCourId==""){
        var options = {title: '提示', text: "请选择课件列表的课件后再提交评论！"};
        $.weui.alert(options);
        return;
    }
    if($("#star .starLevel")[0]==undefined){
        var options = {title: '提示', text: "请选择评论星级后再提交评论！"};
        $.weui.alert(options);
        return;
    }
    var starLevel = $("#star .starLevel").html().substr(0,1);
    var comment = $("#comment").val();
    if(comment == undefined || comment == "" || comment == null){
        var options = {title: '提示', text: "请填写评论内容后再提交评论！"};
        $.weui.alert(options);
        return;
    }
    var ojtCourCommentDto = {};
    ojtCourCommentDto.delflag = 0;
    ojtCourCommentDto.id = $("#spareId").val();
    ojtCourCommentDto.personId = $("#personId").val();
    initUuid();
    ojtCourCommentDto.coursewareId = nowPlayingCourId;//课件id
    ojtCourCommentDto.starLevel = Number(starLevel)-1;
    ojtCourCommentDto.isReal = $("#isReal").prop("checked")?0:1;
    ojtCourCommentDto.content = comment;
    $.ajax({
        url: hostUrl + "ojt/hrOjtCoursewareComment/save",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(ojtCourCommentDto),
        success: function (xhr, textStatus) {
            if (xhr) {
                if (xhr.success) {
                    console.log("新增评论成功！");
                    //初始化课件评论列表
                    initCommentList();
                    cleanComment();
                } else {
                    if (xhr.code == "50000") {
                        var options = {title: '提示', text: xhr.msg};
                        $.weui.alert(options);
                        return;
                    }
                    var options = {title: '提示', text: "保存失败！"};
                    $.weui.alert(options);
                }
            } else {
                var options = {title: '提示', text: "服务异常,请联系管理员！"};
                $.weui.alert(options);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr);
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }
    });
}
/**
 *  初始化评论列表
 */
function initCommentList() {
    //当前播放的课件id
    var nowPlayingCourId = $("#nowPlayingCourId").val();
    $.ajax({
        type: "POST",
        url:hostUrl+ "ojt/hrOjtCoursewareComment/queryListByCondition",
        dataType: "JSON",
        contentType:"application/json",
        data: JSON.stringify({coursewareId:nowPlayingCourId}),
        success: function(data){
            var result = data.result;
            if(result==null){
                return;
            }
            $("#commentList").empty();
            for(var i =0;i<result.length;i++){
                var html = '';
                html += '<div style="border: 1px dashed #acd7ff;margin: 20px;padding: 10px;line-height: 25px"> ';
                html+=
                    '<input type="hidden" name="personId" value="'+result[i].personId+'"/> ' +
                    '<input type="hidden" name="starLevel" value="'+result[i].starLevel+'"/> ' +
                    '<input type="hidden" name="content" value="'+result[i].content+'"/> ' +
                    '<input type="hidden" name="isReal" value="'+result[i].isReal+'"/> ';
                html+=
                    '<div class="star" id="star'+i+'" style="height: 19px">'+
                    '<span>'+(result[i].isReal=="0"?"匿名用户":result[i].personName)+'：</span>'+
                    '<ul>'+
                    '<li><a href="javascript:;">1</a></li>'+
                    '<li><a href="javascript:;">2</a></li>'+
                    '<li><a href="javascript:;">3</a></li>'+
                    '<li><a href="javascript:;">4</a></li>'+
                    '<li><a href="javascript:;">5</a></li>'+
                    '</ul>'+
                    '<span></span>'+
                    '<p></p>'+
                    '</div>';
                html+= '<span style="font-size: 16px;">'+result[i].content+'</span>';
                html += '</div>';
                $("#commentList").append(html);
                var star = $("#star"+i);
                iniStar(star);
                star.find("a:eq("+result[i].starLevel+")").trigger("click");
                star.find("a:eq("+result[i].starLevel+")").trigger("mouseover");
                star.find("li").unbind();
            }
            iniStar($("#star"));
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
/**
 * 视频相关
 * 播放视频
 */
function vidplay() {
//    if (video.src == null || video.src == "") {
//        pop_tip_open("red", "该课件未加载到可播放文件！");
//        return;
//    }
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
        if (timesNeedAdd == 0) {
            addPlayingTimes();
            timesNeedAdd = 1;
            if (lastTimeOver == 1) {
                lastTimeOver = 2;
            }
        }
        if (isPlayed == 1)
            isPlayed = 0;
        isPlayOver = 1;
    } else {              // pause the file, and display play symbol
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
/**
 *  当前播放的课件的学习次数+1
 */
function addPlayingTimes() {
    var playTimes = $("#nowCourPlayingTime").val();
    var ojtCourStudyDto = {};
    ojtCourStudyDto.id = $("#nowCourStudyId").val();
    ojtCourStudyDto.playTimes = Number(playTimes) + 1;
    updateStudy(ojtCourStudyDto, 0);
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
                    //initCourList();
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
 *  修改上一次播放的课件的学习信息，同时将课件学习信息展示
 *  @param isUpdateTotalTime 是否更新总时间
 *  @param flag 是否修改当前课程的播放次数
 */
function updateStudyPlayInfo(flag, isUpdateTotalTime) {
    //////////////////////////////////////获取当前播放时间//////////////////////////////////////////
    var nowTime;
    //获取播放之前的开始播放时间
    var nowPlayingCourId = $("#nowPlayingCourId").val();
    var oldNowTime = $('#nowTime').val();

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
 *  获取当前登录用户的ID
 */
function initPersonId() {
    var personInfoDto = $.hrUtils.getHREmpInfo();
    if (personInfoDto != null) {
        var personId = personInfoDto.id;
        var personName = personInfoDto.name;
        $("#personId").val(personId);
        $("#personName").html(personName);
    }
}

function playView(businessId){
    if(businessId==null){
        return ;
    }
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
                   // $("#download").show();
                    $("#filePath").val(cour.path);
                    $("#fullName").val(cour.fullName);
                    $("#fileSid").val(cour.sid);
                    
                    var fileUrl = "";
                    var canPlay = false;
                    if (cour.type == "file") {
                        var u = cour.url;
                        fileUrl =  u.split(":null")[0]+ '/' + cour.path;
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
                   if(fileUrl.indexOf("http://") == -1){
                        fileUrl = "http://"+fileUrl;
                   }
                    if (!canPlay) {
                        var options = {title: '提示', text: '本课件格式不支持播放!'};
                        $.weui.alert(options);
                    }
                    if (cour.type == "url" && fileUrl == "") {
                        window.open(cour.url);
                    }
                    //video.src = fileUrl;
					var access_token = $.xljUtils.getUrlParam("accessToken");
					access_token = access_token == null ? "" : access_token.replace('Bearer ','');
                    //video.src = ATTACH_SERVERADDR + "disk/attachment/downLoadByFileIdAndTendId/" + cour.sid + "/null?access_token=" + access_token;
					$('#video source').each(function(index, obj){
						obj.src = ATTACH_SERVERADDR + "disk/attachment/downLoadByFileIdAndTendId/" + cour.sid + "/null?access_token=" + access_token;
			        });
					video.courseId=cour.sid;
					
                    video.load();//加载
                    var nowTime = $("#nowTime").val();
                    if (nowTime != undefined && nowTime != "" && nowTime != null && nowTime != "null" && nowTime != "undefined") {
                        video.currentTime = nowTime;
                    }
                    video.play();//播放
					
                } else {
                    //该课件已失效，未找到相应资源
                    var options = {title: '提示', text: '该课件已失效，未找到相应资源!'};
                    $.weui.alert(options);
                }
            } else {
                //获取课件请求失败
                console.log(data1);
                var options = {title: '提示', text: '获取课件文件请求失败'};
                $.weui.alert(options);
            }
        }, false
    );
}

window.goPlay = function (cour) {
    $(cour).css("border","1px solid #2CAFFF");
    $(cour).find("span").css("color","#2CAFFF");
    $(cour).siblings().css("border","1px solid #EBEBEB");
    $(cour).siblings().children("span").css("color","#333333");
    $("#xiangGuan"+cour.id).css("display","none");
    $("#xiangGuan"+cour.id).siblings().css("display","");
  //  var id=HrOjtCoursewareDto.id;
    isFavorite($("#personId").val(),$(cour).attr("businessId"));
    $('#id').val(cour.id);
    $('#nowPlayingCourId').val($(cour).attr("businessId"));
    //课程简介
    // var remark=HrOjtCoursewareDto.remark;
    $('.coure_remark').html($(cour).find("input:hidden[name=remark]").val());
    $(".coure_name").html($(cour).find("input:hidden[name=name]").val());
    // var nowTime=HrOjtCoursewareDto.nowTime;
    $('#nowTime').val($(cour).find("input:hidden[name=nowTime]").val());
    //已学时长
    // var totalTime=HrOjtCoursewareDto.totalTime;
    $("#nowCourStudyTime").val($(cour).find("input:hidden[name=totalTime]").val());
    //播放次数
    // var playTimes=HrOjtCoursewareDto.playTimes;
     $('#nowCourPlayingTime').val($(cour).find("input:hidden[name=playTimes]").val());
  //  var time=HrOjtCoursewareDto.time;//时长
    //课件学习信息id
    var studyId=$(cour).find("input:hidden[name=studyId]").val();
    if (studyId == undefined || studyId == "" || studyId == null || studyId == "null" || studyId == "undefined") {
	     //未学，新增学习信息
	     addStudyInfo($(cour).attr("businessId"));
     } else {
	     $("#nowCourStudyId").val(studyId);
	     //笔记
	    /* var note=HrOjtCoursewareDto.note;
	     $('#note').val(note);*/
     }
    fillCourData($(cour).attr("businessId"));
}

window.goToPlay = function(div){
    var divId = $(div).attr("id");
    if(divId != null && divId != ''){
        var courId = divId.substring(9);
        if(courId != null && courId != '' && courId != undefined){
            $("#"+courId).click();
        }
    }
}

/**
 * 添加收藏
 */
function addFavorite() {
    var hrOjtFavoriteDto = {};
    hrOjtFavoriteDto.delflag = 0;
    hrOjtFavoriteDto.personId =  $("#personId").val();//人员ID
    hrOjtFavoriteDto.subjectId = $.xljUtils.getUrlParam("id");
    hrOjtFavoriteDto.coursewareId = $("#nowPlayingCourId").val();
    hrOjtFavoriteDto.id = $("#spareId").val();
    $.ajax({
        url: hostUrl + "ojt/hrOjtFavorite/save/",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(hrOjtFavoriteDto),
        success: function (xhr, textStatus) {
            if (xhr) {
                if (xhr.success) {
                    $("#favoriteImg").prop("src","../myimg/faverate_ok.png");
                    $('#favoriteBtn').unbind("click");//先移除  在绑定
                    $("#favoriteBtn").click(function () {
                        delFavorite(hrOjtFavoriteDto.id);
                    })
                    var options = {title: '提示', text: "收藏成功！"};
                    $.weui.alert(options);
                } else {
                    if (xhr.code == "50000") {
                        var options = {title: '提示', text: xhr.msg};
                        $.weui.alert(options);
                        return;
                    }
                }
            } else {
                var options = {title: '提示', text: "服务异常,请联系管理员！"};
                $.weui.alert(options);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }

    });

}

function isFavorite(personId,courseId){
    if(personId && personId != null && personId != "" && courseId && courseId != null && courseId != ""){
        var param = {};
        param.personId = personId;
        param.coureId = courseId;
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
                            $("#favoriteImg").prop("src","../myimg/faverate_ok.png");
                            $('#favoriteBtn').unbind("click");//先移除  在绑定
                            $("#favoriteBtn").click(function () {
                                delFavorite(xhr.result.id);
                            })
                        } else {
                            $("#favoriteImg").prop("src","../myimg/faverate_b.png");
                            $('#favoriteBtn').unbind("click");//先移除  在绑定
                            $("#favoriteBtn").click(function () {
                                addFavorite();
                            })
                        }
                    } else {
                        if (xhr.code == "50000") {
                            var options = {title: '提示', text: "更新收藏状态失败"};
                            $.weui.alert(options);
                            return;
                        }
                    }
                } else {
                    var options = {title: '提示', text: "服务异常,请联系管理员！"};
                    $.weui.alert(options);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr);
                var options = {title: '提示', text: "服务异常,请联系管理员！"};
                $.weui.alert(options);
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
                  //  $.xljUtils.tip("green", "课件取消收藏成功！");
                    $("#favoriteImg").prop("src","../myimg/faverate_b.png");
                    $('#favoriteBtn').unbind("click");//先移除  在绑定
                    $("#favoriteBtn").click(function () {
                        addFavorite();
                    })
                    var options = {title: '提示', text: "取消收藏成功！"};
                    $.weui.alert(options);
                    return;
                } else {
                    if (xhr.code == "50000") {
                        var options = {title: '提示', text: "课件取消收藏失败"};
                        $.weui.alert(options);
                        return;
                    }
                }
            } else {
                var options = {title: '提示', text: "服务异常,请联系管理员！"};
                $.weui.alert(options);
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            var options = {title: '提示', text: "服务异常,请联系管理员！"};
            $.weui.alert(options);
        }
    });
}

$("#downloadBtn").click(function(){
    $("#downloadImg").attr("src","../myimg/download_b_ing.png");
    var fileInfo = {};
    fileInfo.path = $("#filePath").val();
    fileInfo.fullName = $("#fullName").val();
    fileInfo.sid = $("#fileSid").val();
    $.xljUtils.xljDownloadFromFileInfo(fileInfo);
})