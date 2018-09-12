(function ($, doc, win) {
    //显示alert提示信息
    win.show_shield1 = function () {
        var l = doc.getElementById("info_window");
        l.style.display = "block";
        var s = doc.getElementById("test");
        s.style.display = "block";
    };

    $(function () {

        //路径中的personId
        var personId = $.xljUtils.getUrlParam("personId");
        //团队考勤穿透而来
        if(personId!=undefined&&personId!=null&&personId!=''){

        }else{
            //验证用户信息
            var personInfoDto= $.hrUtils.getLoginUser();
            var userId = "";
            if (personInfoDto == null) {
                $("#info").empty();
                $("#info").append("没有获取到当前登陆的用户信息");
                show_shield1();
            } else {
                personId = personInfoDto.userId;
            }
        }
        $("#person_id").val(personId);
        $('#calendar').eCalendar();//======加载展示日历========
    });

    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 15 * (clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

    win.setBtnClick = function setBtnClick(element) {
        if ("sign_set_open" == element.attr("set_mark")) {
            element.find("img").attr("src", "img/22.png");
            element.find("input").attr("value", "sign_set_close");
            element.attr("set_mark", "sign_set_close");
        } else {
            element.find("img").attr("src", "img/11.png");
            element.attr("set_mark", "sign_set_open");
            element.find("input").attr("value", "sign_set_open");
        }

    };
    //设置提醒
    win.shield = function () {
        var perId = $("#person_id").val();
        if (undefined == perId || "" == perId) {
            // alert("人员id为空!");
            $("#info").empty();
            $("#info").append("人员信息获取失败");
            show_shield1();
            return;
        }
        var dt = {};
        dt.person_id = perId;
        var s = document.getElementById("test");
        s.style.display = "block";
        //$mobile 开发环境放开、生产环境注释掉，原因 移动端im会自动追加token到header上
        var accessToken = $.xljUtils.getUrlParam("accessToken");
        var urlBody = "/kq/hrKqSignSet/queryList?access_token="+accessToken.split(' ')[1];
        var urlAll = hostUrl + urlBody;
        var tendId = $.xljUtils.getUrlParam("tendId");
        dt.tendId = tendId;
        $.ajax({
            type: "POST", url: urlAll,
            contentType: 'application/json',
            data: JSON.stringify(dt),
            dataType: 'JSON',
            async: false,
            success: function (retData) {
                if (true == retData.success && undefined != retData.result && undefined != retData.result[0]) {
                    retDt = retData.result[0];
                    console.log("设置结果 = " + JSON.stringify(retDt));
                    if ("sign_set_open" == retDt.sign_set_1) {
                        var a = '<a href="#"><img src="img/11.png"/></a> <input hidden="hidden" name="sign_set_1" value="sign_set_open">';
                        $("#sign_set_1").empty();
                        $("#sign_set_1").append(a);
                    } else {
                        var a = '<a href="#"><img src="img/22.png"/></a> <input hidden="hidden" name="sign_set_1" value="sign_set_close">';
                        $("#sign_set_1").empty();
                        $("#sign_set_1").append(a);
                    }
                    // if("sign_set_open" == retDt.sign_set_2){
                    // 	var b = '<a href="#"><img src="img/11.png"/></a> <input hidden="hidden" name="sign_set_2" value="sign_set_open">';
                    // 	$("#sign_set_2").empty();
                    // 	$("#sign_set_2").append(b);
                    // }else{
                    // 	var b = '<a href="#"><img src="img/22.png"/></a> <input hidden="hidden" name="sign_set_2" value="sign_set_close">';
                    // 	$("#sign_set_2").empty();
                    // 	$("#sign_set_2").append(b);
                    // }
                    if ("sign_set_open" == retDt.sign_set_3) {
                        var c = '<a href="#"><img src="img/11.png"/></a> <input hidden="hidden" name="sign_set_3" value="sign_set_open">';
                        $("#sign_set_3").empty();
                        $("#sign_set_3").append(c);
                    } else {
                        var c = '<a href="#"><img src="img/22.png"/></a> <input hidden="hidden" name="sign_set_3" value="sign_set_close">';
                        $("#sign_set_3").empty();
                        $("#sign_set_3").append(c);
                    }
                    if ("sign_set_open" == retDt.sign_set_4) {
                        var b = '<a href="#"><img src="img/11.png"/></a> <input hidden="hidden" name="sign_set_4" value="sign_set_open">';
                        $("#sign_set_4").empty();
                        $("#sign_set_4").append(b);
                    } else {
                        var b = '<a href="#"><img src="img/22.png"/></a> <input hidden="hidden" name="sign_set_4" value="sign_set_close">';
                        $("#sign_set_4").empty();
                        $("#sign_set_4").append(b);
                    }
                } else {
                    var a = '<a href="#"><img src="img/22.png"/></a> <input hidden="hidden" name="sign_set_1" value="sign_set_close">';
                    $("#sign_set_1").empty();
                    $("#sign_set_1").append(a);
                    // var b = '<a href="#"><img src="img/22.png"/></a> <input hidden="hidden" name="sign_set_2" value="sign_set_close">';
                    // $("#sign_set_2").empty();
                    // $("#sign_set_2").append(b);
                    var c = '<a href="#"><img src="img/22.png"/></a> <input hidden="hidden" name="sign_set_3" value="sign_set_close">';
                    $("#sign_set_3").empty();
                    $("#sign_set_3").append(c);
                    var b = '<a href="#"><img src="img/22.png"/></a> <input hidden="hidden" name="sign_set_4" value="sign_set_close">';
                    $("#sign_set_4").empty();
                    $("#sign_set_4").append(b);
                }
            }
        });
        var l = document.getElementById("log_window");
        l.style.display = "block";

    };

    win.cancel_shield = function () {
        var s = document.getElementById("test");
        s.style.display = "none";

        var l = document.getElementById("log_window");
        l.style.display = "none";
    };
    //确认设置提醒
    win.setSignRemind = function () {
        var perId = $("#person_id").val();
        if (undefined == perId || "" == perId) {
            // alert("人员id为空!");
            $("#info").empty();
            $("#info").append("人员信息获取失败!");
            show_shield1();
            return;
        }
        var dt = {};
        dt.person_id = perId;
        var set_1 = $("input[name='sign_set_1']").val();
        if (undefined != set_1 && "" != set_1) {
            dt.sign_set_1 = set_1;
        }
        // var set_2 =  $("input[name='sign_set_2']").val();
        // if(undefined != set_2 && "" != set_2){
        // 	dt.sign_set_2 = set_2;
        // }
        var set_3 = $("input[name='sign_set_3']").val();
        if (undefined != set_3 && "" != set_3) {
            dt.sign_set_3 = set_3;
        }
        var set_4 = $("input[name='sign_set_4']").val();
        if (undefined != set_4 && "" != set_4) {
            dt.sign_set_4 = set_4;
        }
        dt.status = "1105100196";//有效
        console.log("数据 === " + JSON.stringify(dt));
        //$mobile 开发环境放开、生产环境注释掉，原因 移动端im会自动追加token到header上
        var accessToken = $.xljUtils.getUrlParam("accessToken");
        var urlBody = "/kq/hrKqSignSet/saveOrUpdate?access_token="+accessToken.split(' ')[1];
        var urlAll = hostUrl + urlBody;
        //dt.sign_date = dYear + "-" + settings.months[dMonth];
        var tendId = $.xljUtils.getUrlParam("tendId");
        dt.tendId=tendId;
        $.ajax({
            type: "POST", url: urlAll, data: JSON.stringify(dt),
            contentType: 'application/json', dataType: 'JSON',
            async: false,
            success: function (retData) {
                retDt = retData.result;
                console.log("设置结果 = " + JSON.stringify(retDt));
                cancel_shield();
            }
        });
    };

    //取消alert提示信息
    win.cancel_shield1 = function () {
        $("#info").empty();
        var s = document.getElementById("test");
        s.style.display = "none";

        var l = document.getElementById("info_window");
        l.style.display = "none";
    };


    win.noPunchApply = function (noPunchStatus,noPunchApplyId) {
        if (noPunchStatus === null || noPunchApplyId === null) {
            window.location.href = "../mobile/not_clock_in_edit.html?type=add";
        } else if (noPunchStatus !== null && noPunchStatus === '草稿') {//草稿
            window.location.href = "../mobile/not_clock_in_edit.html?type=update&noPunchApplyId=" + noPunchApplyId;
        } else if (noPunchStatus !== null && noPunchStatus === '审批中') {//审批中
        }
    };

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
})($, document, window);