/**
 * 移动端自助我的课程js
 * yyq、lixd
 */
(function ($, window, document, undefined) {
    var val = "";
    var flag = 1;
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
    //上来就执行
    $(function () {
        initPersonId();
        //加载左侧类别树
      //  initSubjectType();
        initSubjectList();
        initLearnHistory();
       initFavoriteList();
        $("#subject").click();
    });
    /**
     *  获取当前登录用户的ID
     */
    function initPersonId() {
        var personInfoDto = $.hrUtils.getLoginUser();
        if (personInfoDto != null && personInfoDto != undefined) {
            var personId = personInfoDto.userId;
            $("#personId").val(personId);
        } else {
            var options = {title: '提示', text: '未获取到当前登录信息!'};
            $.weui.alert(options);
        }
    }

/*
    *
     * 查询正在学习的课程列表
     * @param subjectTypeId 课程类别id
    function initOnStudySubjectList(subjectTypeId) {
        var condition = {};
        var urlBody = "ojt/hrOjtStudent/queryListByConditionByPage";
        var urlAll = hostUrl + urlBody;
        var personId = $("#personId").val();
        if (subjectTypeId == null || subjectTypeId == "") {
            condition = {"delflag": '0', "personId": personId, "noRate": 1};
        } else {
            condition = {"delflag": '0', "personId": personId, "noRate": 1, "subjectTypeId": subjectTypeId};
        }
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(condition),
            success: function (data) {
                if (data.success == true) {
                    var list = data.result.list;
                    if(list!=null&&list.length>0){
                        var id=list[0].id;
                        $('#id').val(id);
                    }
                    for (var i = 0; i < list.length; i++) {
                        //排序展示 点击打开课程的详细信息页面
                        var div = "<div class='onStudy'>" +
                            "<a href='#'  id='" + list[i].subjectId + "' onclick='showOnStudySubjectDetail(this.id)'>" + (i + 1) + "." + list[i].subjectName + "</a>" +
                            "</div>";
                        $("#mySubject").append(div);
                        $("#mySubject").append("</br>");
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                var options = {title: '提示', text: '服务异常,请联系管理员！'};
                $.weui.alert(options);
            }
        });
    }*/
    /**
     * 查询已学习的课程列表
     * @param subjectTypeId 课程类别id
     */
   /* function initStudiedSubjectList(subjectTypeId) {
        var condition = {};
        var urlBody = "ojt/hrOjtStudent/queryListByConditionByPage";
        var urlAll = hostUrl + urlBody;
        var personId = $("#personId").val();
        if (subjectTypeId == null || subjectTypeId == "") {
            condition = {"delflag": '0', "personId": personId, "isRate": 1};
        } else {
            condition = {"delflag": '0', "personId": personId, "isRate": 1, "subjectTypeId": subjectTypeId};
        }
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(condition),
            success: function (data) {
                if (data.success == true) {
                    var list = data.result.list;
                    for (var i = 0; i < list.length; i++) {
                        //排序展示 点击打开课程的详细信息页面
                        var div = "<div class='onStudy'>" +
                            "<a href='#'  id='" + list[i].subjectId + "' onclick='showOnStudySubjectDetail(this.id)'>" + (i + 1) + "." + list[i].subjectName + "</a>" +
                            "</div>";
                        $("#mySubject").append(div);
                        $("#mySubject").append("</br>");
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                var options = {title: '提示', text: '服务异常,请联系管理员！'};
                $.weui.alert(options);
            }
        });
    }*/

    /**
     * 展示查看课程的详细信息
     * @param subjectId
     */
   /* window.showOnStudySubjectDetail = function (subjectId) {
        window.location.href = "mobile_self_myCourse_datail.html?subjectId=" + subjectId;
    };
    //查询课程信息
    window.querySubjectListByType=function () {
        queryOnStudySubjectListByType();
        queryStudiedSubjectListByType();
    };*/
    /**
     * 通过课程类别查询正学课程
     */
   /* window.queryOnStudySubjectListByType = function () {
        $("#mySubject").empty();
        var checkSubjectTypeId = $("#subjectType").val();
        initOnStudySubjectList(checkSubjectTypeId);
    };
    /!**
     * 通过课程类别查询已学课程
     *!/
    window.queryStudiedSubjectListByType = function () {
        $("#mySubject1").empty();
        var checkSubjectTypeId = $("#subjectType").val();
        initStudiedSubjectList(checkSubjectTypeId);
    };*/

    /**
     * 初始化课程列表
     */
    function initSubjectList() {

        var condition = {};
        var urlBody = "ojt/hrOjtSubject/queryListByConditionByPage";
        var urlAll = hostUrl + urlBody;
        var subjectName = $("#name").val();
        condition.subjectStatus ='1009100036';
         condition.subjectName = val;
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(condition),
            success: function (data) {
                if (data.success == true) {
                  /*  $(".subjectTable").html("");
                    var html = "<tr>"+
                        "<td class='title'>课程名称</td>"+
                        "<td class='title'>课程简介</td>"+
                        "</tr>";
                    $(".subjectTable").append(html);
                    var list = data.result.list;
                    for (var i = 0; i < list.length; i++) {
                        //排序展示 点击打开课程的详细信息页面

                        html="<tr>";
                        html+="<td class='subjectcontent subjectname'><a href='#' id='"+ list[i].id +"' onclick='goToView(\"id=" + list[i].id + "\")'><div>"+list[i].name+"</div></a></td>";
                        html+="<td class='subjectcontent'><div title='"+ list[i].remark +"'>"+list[i].remark+"</div></td></tr>";
                        $(".subjectTable").append(html);
                    }*/
                    $("#subjectDiv").html("");
                    var html = "";
                    var list = data.result.list;
                    for (var i = 0; i < list.length; i++) {
                        //排序展示 点击打开课程的详细信息页面
                   html +=  '<div class="subject_item">'+
                            '<div class="item_body"><img src="../myimg/lesson.png" style="width: 15px"></div>'+
                            "<div style= class='item_title'><a href='#' id='"+ list[i].id +"' onclick='goToView(\"id=" + list[i].id + "\")'>"+ list[i].name +"</a></div>"+
                            '<div style="" class="item_remark">课程简介：'+ list[i].remark +'</div>'+
                            '</div>';
                    }
                    $("#subjectDiv").html(html);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                var options = {title: '提示', text: '服务异常,请联系管理员！'};
                $.weui.alert(options);
            }
        });
    }

    /**
     * 初始化学习历史
     */
    function initLearnHistory() {
        var condition = {};
        var urlBody = "ojt/ojtLeranHistory/getHistoryList";
        var urlAll = hostUrl + urlBody;
        var personId = $("#personId").val();
        // var subjectName = $("#name").val();
        condition.personId = personId;
        condition.name = val;
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(condition),
            success: function (data) {
                if (data.success == true) {
                    var list = data.result.list;
                    $("#historyDiv").html("");
                    var html = "";
                    for (var i = 0; i < list.length; i++) {
                        //排序展示 点击打开课程的详细信息页面
                        /*var remainTime = "";

                        html="<tr>";
                        html+="<td class='subjectcontent subjectname'><a href='#' id='"+ list[i].id +"' onclick='goToView(\"id=" + list[i].subjectId+ "&businessId="+ list[i].coursewareId +"\")'><div>"+list[i].courName+"</div></a></td>";
                        if(list[i].remainTime == null || list[i].remainTime == "" || list[i].remainTime.indexOf("-") > 0){
                            remainTime = "未观看";
                        } else if(list[i].remainTime == "00:00:00"){
                            remainTime = "已看完";
                        } else {
                            remainTime = list[i].remainTime;
                        }
                        html+="<td class='subjectcontent'>"+remainTime+"</td>";
                        html+="<td class='subjectcontent'>"+ list[i].playTime +"次</td></tr>";
                        $(".historyTable").append(html);*/
                        var remainTime = "";
                            remainTime = list[i].remainTime;
                        html +=  '<div class="subject_item">'+
                            '<div class="item_body"><img src="../myimg/lesson.png" style="width: 15px"></div>'+
                            "<div style= class='item_title'><a href='#' id='"+ list[i].id +"' onclick='goToView(\"id=" + list[i].subjectId+ "&businessId="+ list[i].businessId +"&cId="+ list[i].coursewareId +"\")'>"+ list[i].courName +"</a></div>"+
                            '<div style="" class="item_remark">剩余时长：<span style="color: #2CAFFF">'+ remainTime+'</span><span style="color: #999999;float: right;display: inline-block">已学习'+list[i].playTime  +'次</span></div>'+
                            '</div>';
                    }
                    $("#historyDiv").html(html);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                var options = {title: '提示', text: '服务异常,请联系管理员！'};
                $.weui.alert(options);
            }
        });
    }

    window.getVal = function (search) {
        val = $(search).val();
       if(flag == 1){
           initSubjectList();
       } else if(flag == 2){
           initLearnHistory();
       } else if(flag == 3){
           initFavoriteList();
       }
       $("#name").val(val);
    };
    /**
     * 初始化收藏列表
     */
    function initFavoriteList() {
        var condition = {};
        var urlBody = "ojt/hrOjtFavorite/getFavoriteList";
        var urlAll = hostUrl + urlBody;
        var personId = $("#personId").val();
        condition.personId = personId;
        condition.coureName =  val;
        $.ajax({
            type: 'POST',
            url: urlAll,
            async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify(condition),
            success: function (data) {
                if (data.success == true) {
                    var html = "";
                    var list = data.result.list;
                    for (var i = 0; i < list.length; i++) {
                        //排序展示 点击打开课程的详细信息页面
/*
                        html="<tr>";
                        html+="<td class='subjectcontent subjectname'><a href='#' onclick='goToView(\"id=" + list[i].subjectId+ "&businessId="+ list[i].coureId +"\")'><div>"+list[i].coureName+"</div></a></td>";
                        html+="<td class='subjectcontent'><div>"+list[i].remark+"</div></td>";
                        html+="<td class='subjectcontent'>"+ list[i].playTime +"次</td></tr>";
                        $(".favoriteTable").append(html);*/
                        var remainTime = "";
                        /*if(list[i].remainTime == null || list[i].remainTime == "" || list[i].remainTime.indexOf("-") > 0){
                            remainTime = "未观看";
                        } else if(list[i].remainTime == "00:00:00"){
                            remainTime = "已看完";
                        } else {*/
                            remainTime = list[i].remainTime;
                        //}
                        html +=  '<div class="subject_item">'+
                            '<div class="item_body"><img src="../myimg/lesson.png" style="width: 15px"></div>'+
                            "<div style= class='item_title'><a href='#' id='"+ list[i].id +"' onclick='goToView(\"id=" + list[i].subjectId+ "&businessId="+ list[i].businessId + "&cId="+ list[i].coureId +"\")'>"+ list[i].coureName +"</a></div>"+
                            '<div style="" class="item_remark">剩余时长：<span style="color: #2CAFFF">'+ remainTime+'</span><span style="color: #999999;float: right;display: inline-block">已学习'+list[i].playTime  +'次</span></div>'+
                            '<div style="" class="item_remark">课程简介：'+ list[i].remark +'</div>'+
                            '</div>';
                    }
                    $("#favoriteDiv").html(html);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                var options = {title: '提示', text: '服务异常,请联系管理员！'};
                $.weui.alert(options);
            }
        });
    }
    $("#subject").click(function () {
        $("#favorite").css("border-bottom-color","white");
        $("#learnHistory").css("border-bottom-color","white");
        $("#subject").css("border-bottom-color","#2CAFFF");
        $("#subjectName").css("color","#2CAFFF");
        $("#favoriteName").css("color","black");
        $("#historyName").css("color","black");
        $("#historyDiv").hide();
        $("#favoriteDiv").hide();
        $("#subjectDiv").show();
        $("#name").val("");
        $("#name").prop("placeholder","课程名称");
       /* $("#expandedSearchBtn").unbind();
        $("#expandedSearchBtn").bind("click",function () {
            initSubjectList();
        })
        $("#expandedSearchBtn").click();*/
       flag = 1;
        val = "";
        getVal();
    });
    $("#learnHistory").click(function () {
        $("#favorite").css("border-bottom-color","white");
        $("#learnHistory").css("border-bottom-color","#2CAFFF");
        $("#historyName").css("color","#2CAFFF");
        $("#favoriteName").css("color","black");
        $("#subjectName").css("color","black");
        $("#subject").css("border-bottom-color","white");
        $("#historyDiv").show();
        $("#favoriteDiv").hide();
        $("#subjectDiv").hide();
        $("#name").prop("placeholder","学习历史");
        $("#name").val("");
        /*$("#expandedSearchBtn").unbind();
        $("#expandedSearchBtn").bind("click",function () {
            initLearnHistory();
        })
        $("#expandedSearchBtn").click();*/
        flag = 2;
        val = "";
        getVal();
    });
    $("#favorite").click(function () {
        $("#favorite").css("border-bottom-color","#2CAFFF");
        $("#favoriteName").css("color","#2CAFFF");
        $("#historyName").css("color","black");
        $("#subjectName").css("color","black");
        $("#learnHistory").css("border-bottom-color","white");
        $("#subject").css("border-bottom-color","white");
        $("#historyDiv").hide();
        $("#favoriteDiv").show();
        $("#subjectDiv").hide();
        $("#name").prop("placeholder","我的收藏");
        $("#name").val("");
        /*$("#expandedSearchBtn").unbind();
        $("#expandedSearchBtn").bind("click",function () {
            initFavoriteList();
        })
        $("#expandedSearchBtn").click();*/
        flag = 3;
        val = "";
        getVal();
    });
    //处理穿透跳转页面token 切库问题
    var tendId = $.xljUtils.getUrlParam("tendId");
    var accessToken = $.xljUtils.getUrlParam("accessToken");
    window.goToView = function(param){
        window.location.href="mobile_self_myCourse_view.html?"+param+"&tendId="+tendId+"&accessToken="+accessToken;
    }
})(jQuery, window, document);