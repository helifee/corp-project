/**
 * 移动端自助我的课程js
 * yyq、lixd
 */
(function ($, window, document, undefined) {

    var val = "";
    var flag = 1;
    var year;
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
        initDate();
       // initPersonId();
        //加载左侧类别树
      //  initSubjectType();
        queryList();
        //initSubjectList();
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

    window.goSelf = function(id){
        location.href="mobile_self_perInfo.html?personId="+id;
    }


    window.initDate = function () {
        var date=new Date;
         year=date.getFullYear();
        $("#yearValue").html(year);
    };

    $("#leftBtn").click(function () {
        year--;
        queryList();
        $("#yearValue").html(year);
    });

    $("#rightBtn").click(function () {
        year++;
        var tempDate = new Date;
        var tempYear = tempDate.getFullYear();
        if(year >= tempYear){
            queryList();
            $("#yearValue").html(year);
        }
    });

    window.queryList = function () {
        var condition = {};
       var personId = $.xljUtils.getUrlParam("personId");
        condition.personId = personId;
        condition.year = year;
        var urlBody = "/self/hrSelfTeamSalary/getDateList";
        var urlAll = hostUrl + urlBody;
        var html = '';
        $("#subjectDiv").html(html);
        $.ajax({
            url:urlAll,
            data:JSON.stringify(condition),
            type:"POST",
            contentType: 'application/json',
            dataType:"JSON",
            success:function (data) {
                if(data != null && data.result != null){
                    var result = data.result;
                    for(var i = 0;i < result.length;i++){
                        var payPeriod = result[i].payPeriod;
                        var month = result[i].payPeriod.split("-")[1];
                        html+= '<div class="weui_cell_hd lableName date"  onclick="goStep2(\''+ payPeriod +'\',\''+ personId +'\')">'+
                                    '<div style="float: left;width:50%" >'+
                                         month
                                   +'月</div>'+
                                    '<div style="float: left;width:50%" >'+
                                        $.hrUtils.filterNull2Zerro(result[i].salary)
                                     +'</div>'+
                                 '</div>';
                    }
                    $("#subjectDiv").html(html);
                }
            },
            error:function (data) {

            }
        })
    }

    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    //处理穿透跳转页面token 切库问题
    var tendId = $.xljUtils.getUrlParam("tendId");
    var accessToken = $.xljUtils.getUrlParam("accessToken");
    window.goStep2 = function (payPeriod, personId) {
        window.location.href='mobile_self_salary.html?personId='+personId+"&payPeriod="+payPeriod+"&tendId="+tendId+"&accessToken="+accessToken;
    }
})(jQuery, window, document);