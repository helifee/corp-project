/**
 * 移动端打卡js
 * Android版CC定位信息使用cc传过来的经度、维度、地址
 * iso版定位信息使用百度定位
 * 方法调用顺序慎重修改
 */

var headers_;

(function (doc, win) {
    var sysOs = "";//系统型号
    /**
     * 获取手机系统型号信息
     */
    function getOs() {
        //判断数组中是否包含某字符串
        Array.prototype.contains = function (needle) {
            for (i in this) {
                if (this[i].indexOf(needle) > 0)
                    return i;
            }
            return -1;
        };

        var device_type = navigator.userAgent;//获取userAgent信息
        // document.write(device_type);//打印到页面
        var md = new MobileDetect(device_type);//初始化mobile-detect
        var os = md.os();//获取系统
        sysOs = os;
        var model = "";
        if (os == "iOS") {//ios系统的处理
            os = md.os() + md.version("iPhone");
            model = md.mobile();
        } else if (os == "AndroidOS") {//Android系统的处理
            os = md.os() + md.version("Android");
            var sss = device_type.split(";");
            var i = sss.contains("Build/");
            if (i > -1) {
                model = sss[i].substring(0, sss[i].indexOf("Build/"));
            }
        }
        // alert(os + "---" + model);//打印系统版本和手机型号
        return os + " " + model;
    }

    //显示alert提示信息
    win.show_shield1 = function () {
        var l = doc.getElementById("info_window");
        l.style.display = "block";
        var s = doc.getElementById("test");
        s.style.display = "block";
    };
    //取消alert提示信息
    win.cancel_shield1 = function () {
        $("#info").empty();
        var s = document.getElementById("test");
        s.style.display = "none";

        var l = document.getElementById("info_window");
        l.style.display = "none";
    };

    /**
     * 查询当前人员的当天的签到时间、签退时间
     * @param personId
     */
    function queryMySignToday(personId) {
        // var hostUrl = "/platform-app/";
        var curData = new Date().format('yyyy-MM-dd hh:mm:ss');
        // var curData = "2018-04-25 18:12:23";
        // var urlBody = "kq/hrKqSign/queryList";
        var urlBody = "kq/hrKqSign/querySignInfoForIm";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'JSON',
            contentType: 'application/json',
            // data: JSON.stringify({"person_id": personId, 'sign_date': curData}),
            data: JSON.stringify({"userId": personId, 'date': curData, "ifBussQuery": "false"}),
            headers: headers_,
            success: function (data) {
                if (data.status == 200) {
                    var result = data.result;
                    if (result != undefined && result != null) {
                        var signInTime = result.signInTime;//签到时间
                        var signOutTime = result.signOutTime;//签退时间
                        if (signInTime != null && signInTime != "") {
                            $("#sign_in_msg").empty();
                            $("#sign_in_msg").append(signInTime + " " + "已签到");
                        }
                        if (signOutTime != null && signOutTime != "") {
                            $("#sign_out_msg").empty();
                            $("#sign_out_msg").append(signOutTime + " " + "已签退");
                        }

                        var shiftName = result.shiftName;
                        $("#show_work_status").empty();
                        $("#show_work_status").append(shiftName);
                        var workInTime = result.workInTime;
                        var workOutTime = result.workOutTime;
                        if (undefined != workInTime && "" != workInTime && undefined != workOutTime && "" != workOutTime) {
                            $("#workin_time").empty();
                            $("#workin_time").append(workInTime);
                            $("#workout_time").empty();
                            $("#workout_time").append(workOutTime);
                            $("#validTime").empty();
                            if (shiftName != "休息日" && shiftName != "没有排班信息") {
                                $("#validTime").append("当天考勤时间为4:00至第二天凌晨4:00，在4:00之前签到签退记为前一天考勤！");
                            }
                        }
                        /*               for (i = 0; i < signList.length; i++) {
                                           if (signList[i] != null) {
                                               // if (signList[i].signStatus == '1105100196') {//有效
                                               // var sign_time = signList[i].signTime;//签到时间
                                               var signInTime = signList[i].signInTime;//签到时间
                                               var signOutTime = signList[i].signOutTime;//签退时间
                                               if (signInTime != null && signInTime.length >= 16) {
                                                   $("#sign_in_msg").empty();
                                                   $("#sign_in_msg").append(signInTime.substring(10, 16) + " " + "已签到");
                                               }
                                               if (signOutTime != null && signOutTime.length >= 16) {
                                                   $("#sign_out_msg").empty();
                                                   $("#sign_out_msg").append(signOutTime.substring(10, 16) + " " + "已签退");
                                               }


                                               // if (sign_time != null && sign_time.length >= 16) {
                                               //     if (signList[i].signType == '1107100200') {//签到
                                               //         $("#sign_in_msg").empty();
                                               //         $("#sign_in_msg").append(sign_time.substring(10, 16) + " " + "已签到");
                                               //     } else if (signList[i].signType == '1107100201') {//签退
                                               //         $("#sign_out_msg").empty();
                                               //         $("#sign_out_msg").append(sign_time.substring(10, 16) + " " + "已签退");
                                               //     }
                                               // }
                                               // }
                                           }
                                       }*/
                    }
                }
            }
            ,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
    }

    /**
     * 查询当前人员的签到地址
     * @param personId
     */
/*
    function querySignAddress(personId) {
        if (personId == null || personId == "") {
            personId = $("#person_id").val();
        }

        var urlBody = "kq/hrKqSign/querySignAddress";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            // async: false,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"personId": personId}),
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    if (result.length > 0) {
                        var net = "";
                        for (var i = 0; i < result.length; i++) {
                            if (result[i] != null) {
                                net += result[i].ip + ",";
                            }
                        }
                        net = net.substring(0, net.length - 1);
                        if (net == null || net == "") {
                            // if (sysOs == "iOS") {//ios系统的处理
                            //     locateAddr();//通过百度获取定位
                            // } else if (sysOs == "AndroidOS") {//Android系统的处理
                            //     geolocation();//通过GPS获取
                            // }
                        }
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
    }
*/

    /*
     * 遮罩信息,提示工作日打卡时间
     * 当前排班规定的签到、签退时间
     */
    win.pbInfoShow = function () {
        var mydate = new Date();
        var currentDate = mydate.getFullYear() + "-";
        // if (mydate.getMonth().toString().length == 1) {
        if (mydate.getMonth() < 9) {
            currentDate = currentDate + "0" + (mydate.getMonth() + 1) + "-";
        } else {
            currentDate = currentDate + (mydate.getMonth() + 1) + "-";
        }
        if (mydate.getDate().toString().length == 1) {
            currentDate = currentDate + "0" + mydate.getDate();
        } else {
            currentDate = currentDate + mydate.getDate();
        }
        /* if (mydate.getDay() == 0 || mydate.getDay() == 6) {
         alert("今天是周末!");
         return;
         }*/
        var dt = {};
        dt.person_id = $("#person_id").val();
        dt.sign_date = currentDate;
        console.log("=========" + JSON.stringify(dt));
        var urlBody = "/kq/hrKqSign/queryMyInfo";
        var urlAll = "/hr-app/" + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(dt),
            async: false,
            success: function (json) {
                console.log(JSON.stringify(json));
                if (undefined != json && json.success) {
                    // console.log(JSON.stringify(json.result));
                    if (json.result != null && json.result.length > 0) {
                        // console.log(json);
                        var shiftName = json.result[0].shiftName;
                        $("#show_work_status").empty();
                        $("#show_work_status").append(shiftName);
                        var workin_time = json.result[0].workInTime;
                        var workout_time = json.result[0].workOutTime;
                        if (undefined != workin_time && "" != workin_time && undefined != workout_time && "" != workout_time) {
                            $("#workin_time").empty();
                            $("#workin_time").append(json.result[0].workInTime);
                            $("#workout_time").empty();
                            $("#workout_time").append(json.result[0].workOutTime);
                            $("#validTime").empty();
                            // $("#validTime").append("当天考勤时间为" + json.result[0].validTimeSignin + "至" + json.result[0].validTimeSignout);
                            if (shiftName != "休息日" && shiftName != "没有排班信息") {
                                $("#validTime").append("当天考勤时间为4:00至第二天凌晨4:00，在4:00之前签到签退记为前一天考勤！");
                            }
                        }
                    } else {
                        $("#workin_time").empty();
                        $("#workin_time").append("人员没有排班信息");
                        $("#workout_time").empty();
                        $("#workout_time").append("人员没有排班信息");
                    }
                    return;
                }
                // alert(json.msg);
                $("#info").empty();
                $("#info").append(json.msg);
                show_shield1();
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert("查询失败");
                $("#info").empty();
                $("#info").append("查询失败");
                show_shield1();
            }
        });
    };

    /**
     * 通过cc获取定位
     * @param callback
     */
    function connectRyJsBridge(callback) {
        if (window.RyJsBridge) {
            callback(RyJsBridge)
        } else {
            document.addEventListener(
                'RyJsBridgeReady'
                , function () {
                    callback(RyJsBridge)
                },
                false
            );
        }
    }

    //修改大小
    $(win).resize(function () {
        var clientWidth = document.body.clientWidth;
        var clientHeight = document.body.clientHeight;
        $('#qiandao').attr("style", "text-align: center; margin-top: 20%;margin-left:" + (clientWidth / 2 - 60) + "px");
        $('#qiantui').attr("style", "text-align: center; margin-top: 20%;margin-left:" + (clientWidth / 2 - 60) + "px");
    });
    //页面初始化
    $(function () {
        var baseUrl = '/static/';
        // var hostUrl = window.getJZYWindow(window).JZY.xhr.transformUrl('/', 'GLOBAL.HR');
        var hostUrl = window.parent.JZY.xhr.transformUrl('/', 'GLOBAL.HR');

        // baseUrl = $.kqUtils.baseUrl;
        // hostUrl = $.kqUtils.hostUrl;
        headers_ = $.kqUtils.headers;

        // debugger;
        var clientWidth = document.body.clientWidth;
        var clientHeight = document.body.clientHeight;
        $('#qiandao').attr("style", "text-align: center; margin-top: 20%;margin-left:" + (clientWidth / 2 - 60) + "px");
        $('#qiantui').attr("style", "text-align: center; margin-top: 20%;margin-left:" + (clientWidth / 2 - 60) + "px");
        // getOs();//获取手机型号
        // if (sysOs == "iOS") {//ios系统的处理
        //     locateAddr();//通过百度获取定位
        // } else if (sysOs == "AndroidOS") {//Android系统的处理
        //     //通过cc获取定位
        //     connectRyJsBridge(function (bridge) {
        //         bridge.callHandler(
        //             'MPFetchLocation'
        //             , {}
        //             , function (responseData) {
        //                 // document.getElementById("show").innerHTML = responseData;
        //                 var responseData1 = JSON.parse(responseData);
        //                 var latitude = responseData1.latitude;//维度
        //                 var longitude = responseData1.longitude;//经度
        //                 var address = responseData1.address;//地址
        //                 $("#longitude").val(longitude);
        //                 $("#latitude").val(latitude);
        //                 $("#sign_address").val(address);
        //                 // $("#info").empty();
        //                 // $("#info").append("通过CC获取的经度："+longitude+" 维度："+latitude+" 地址："+address);
        //                 // show_shield1();
        //             }
        //         );
        //     });
        // }
        //验证用户信息
        /*var msg = $.hrUtils.verifUserInfo();
        if (msg != null && msg.length > 0) {
            // alert(msg);
            $("#info").empty();
            $("#info").append(msg);
            show_shield1();
            $("#show_work_status").empty();
            $("#show_work_status").append("人力资源系统无此人");
            $("#workin_time").empty();
            $("#workin_time").append("人力资源系统无此人");
            $("#workout_time").empty();
            $("#workout_time").append("人力资源系统无此人");
            generalShowDate();//页面显示日期
        } else {
            //hr人员信息
            var hrEmpInfo = $.hrUtils.getHREmpInfo();
            $("#person_id").val(hrEmpInfo.id);
            // getShiftName();
            pbInfoShow();
            // querySignAddress(hrEmpInfo.id);
            generalShowDate();//页面显示日期
            queryMySignToday(hrEmpInfo.id);//显示今天的打卡时间
        }*/
        // //hr人员信息
        $("#person_id").val("1003");
        // pbInfoShow();
        queryMySignToday("1003");
        generalShowDate();//页面显示日期
    });

    /**
     * 通过H5获取定位（签到地点没有设置网关的时候才获取定位）
     */
    function geolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);//定位
        } else {
            $("#info").empty();
            $("#info").append('该浏览器不支持地理位置!');
            show_shield1();
        }
    }

    /**
     * 通过手机定位获取经纬度，传给百度获取地理位置
     * @param position
     */
    win.showPosition = function (position) {
        var currentLat = position.coords.latitude;
        var currentLon = position.coords.longitude;
        //通过百度地图api对象封装真实的经纬度
        $("#longitude").val(currentLon);
        $("#latitude").val(currentLat);
        var gpsPoint = new BMap.Point(currentLon, currentLat);
        var pt = new BMap.Point(currentLon, currentLat);
        var geoc = new BMap.Geocoder();
        geoc.getLocation(pt, function (rs) {
            var address = rs.address;
            $("#sign_address").val(address);
            // var city = addComp.city;
        });
    };

    /**
     * 显示地理位置获取的异常信息
     * 很慢这个方式才会执行
     * @param error
     */
    win.showError = function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $("#info").empty();
                $("#info").append("用户拒绝对获取地理位置的请求。");
                show_shield1();
                break;
            case error.POSITION_UNAVAILABLE:
                $("#info").empty();
                $("#info").append("位置信息是不可用的。");
                show_shield1();
                break;
            case error.TIMEOUT:
                $("#info").empty();
                $("#info").append("请求用户地理位置超时。");
                show_shield1();
                break;
            case error.UNKNOWN_ERROR:
                $("#info").empty();
                $("#info").append("未知错误。");
                show_shield1();
                break;
        }
    };
    // /**
    //  * 获取班次名称
    //  */
    // function getShiftName() {
    //     var urlBody = "/kq/hrKqSummary/queryPBList3";
    //     var urlAll = hostUrl + urlBody;
    //     var postData = {};
    //     var curData = new Date().format('yyyy-MM-dd');
    //     postData.personId = $("#person_id").val();
    //     postData.startDate = curData;
    //     postData.endDate = curData;
    //     $.ajax({
    //         type: 'POST',
    //         url: urlAll,
    //         dataType: 'json',
    //         contentType: 'application/json',
    //         data: JSON.stringify(postData),
    //         async: false,
    //         success: function (json) {
    //             if (json.success) {
    //                 var data = json.result;
    //                 if (data.length > 0) {
    //                     // alert(data[0].shiftName);
    //                     $("#show_work_status").empty();
    //                     $("#show_work_status").append(data[0].shiftName);
    //                 }
    //             } else {
    //                 if (json != null && json.msg != null) {
    //                     // alert(json.msg);
    //                     $("#info").empty();
    //                     $("#info").append(json.msg);
    //                     show_shield1();
    //                 }
    //             }
    //         }, error: function (XMLHttpRequest, textStatus, errorThrown) {
    //             console.log(XMLHttpRequest.status);
    //             console.log("获取班次名称失败");
    //         }
    //     });
    // }

    //生成显示日期
    function generalShowDate() {
        var mydate = new Date();
        $("#show_month").empty();
        $("#show_month").append("" + (mydate.getMonth() + 1));
        var day = mydate.getDate();
        var week;
        if (mydate.getDay() == 0) week = "  星期日"
        if (mydate.getDay() == 1) week = "  星期一"
        if (mydate.getDay() == 2) week = "  星期二"
        if (mydate.getDay() == 3) week = "  星期三"
        if (mydate.getDay() == 4) week = "  星期四"
        if (mydate.getDay() == 5) week = "  星期五"
        if (mydate.getDay() == 6) week = "  星期六"
        if (mydate.getDay() == 0 || mydate.getDay() == 6) {
            // $("#show_work_status").empty();
            // $("#show_work_status").append("休息日");
        } else {
            // $("#show_work_status").empty();
            // $("#show_work_status").append("工作日");
        }
        $("#show_day_week").empty();
        $("#show_day_week").append("/" + mydate.getDate() + week);
        console.log("" + (mydate.getMonth() + 1) + "/" + mydate.getDate() + week);
    }


    /**
     * 打卡function
     */
    win.mobileSignFunc = function (msgId) {
        // var hostUrl = '/platform-app/';
        var dt = {};
        var person_id = $('#person_id').val();
        if (person_id == null || person_id == '') {
            // alert("当前人员信息获取失败");
            $("#info").empty();
            $("#info").append("当前人员信息获取失败");
            show_shield1();
            return;
        }
        var shiftSName = $("#show_work_status").text();
        if (shiftSName == "休息日") {
            $("#info").empty();
            $("#info").append("休息日无需打卡！");
            show_shield1();
            return;
        }
        if (shiftSName == "没有排班信息") {
            $("#info").empty();
            $("#info").append("没有排班信息！");
            show_shield1();
            return;
        }
        // dt.loginName = "xinkaoqin@ehr";
        // dt.sign_type = $("#sign_type").val();
        // dt.kq_type = $("#kq_type").val();
        // dt.gateway = $("#netway").val();
        // dt.longitude = $("#longitude").val();
        // dt.latitude = $("#latitude").val();
        // dt.sign_address = $("#sign_address").val();
        // dt.mobile_sys_type = $("#mobile_sys_type").val();
        // dt.mobile_data_type = $("#mobile_data_type").val();
        // dt.sign_time = "" + new Date().getTime();
        // dt.sign_status = $("#sign_status").val();
        dt.userId = "1003";
        dt.tendId = "hio_tend014";
        dt.kq_type = "";
        dt.gateway = "124.65.163.106";
        dt.longitude = "116.465769";
        dt.latitude = "39.906466";
        dt.sign_address = "中国北京市朝阳区建国路甲99号";
        dt.mobile_sys_type = "ios";
        dt.mobile_data_type = "wifi";
        dt.deviceModel = "iPhone 8 Plus";
        dt.deviceNo = "9E08CA01-5ED9-4B9B-9527-B27AA62B9D59";

        var urlBody = "/kq/hrKqSign/saveSomeAttrForIm";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(dt),
            async: false,
            headers: headers_,
            success: function (json) {
                if (json.success) {
                    var ret = json.result;
                    console.log(JSON.stringify(json));
                    if (undefined != ret && undefined != ret.sign_status && ret.sign_status.indexOf("签") != -1) {
                        if ("sign_in_msg" == msgId) {//显示时分
                            $("#sign_in_msg").empty();//点击签到，更新签到时间
                            $("#" + msgId).append(ret.signInTime + " " + ret.sign_status);
                        } else {
                            $("#sign_out_msg").empty();//点击签退，更新签退时间
                            $("#" + msgId).append(ret.signOutTime + " " + ret.sign_status);
                        }
                    }
                } else if (json != null && json.msg != null) {
                    // alert(json.msg);
                    $("#info").empty();
                    $("#info").append(json.msg);
                    show_shield1();
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log("保存失败");
            }
        });
    };
    //是否出差
    win.isChuChai = function () {
        win.location.href = "/hr-app/hr/mobile/mobile_sign_cc.html?pid=" + $("#person_id").val();
    };
    //签到
    win.signInFunc = function () {
        // $("#sign_type").val("1107100200");//签到
        // getNetWayIp();
        mobileSignFunc('sign_in_msg');
    };
    //签退
    win.signOutFunc = function () {
        // $("#sign_type").val("1107100201");//签退
        // getNetWayIp();
        mobileSignFunc('sign_out_msg');
    };

    //获取访问手机的信息(android/iso;网关ip;经纬度;地址;wifi/4g)(调用方会提供)
    function getNetWayIp() {
        $("#netway").val(returnCitySN.cip);//通过搜狐插件获取路由网关 219.143.152.210
        /*  $("#longitude").val("39.919857");
         $("#latitude").val("116.461402");
         $("#sign_address").val("北京市朝阳区永安里");*/
        $("#mobile_sys_type").val(getOs());
        $("#mobile_data_type").val("wifi");
    }

    //自动定位
    win.locateAddr = function () {
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        map.clearOverlays();
        map.centerAndZoom("北京", 12);
        var longitude, latitude;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                longitude = r.point.lng;
                latitude = r.point.lat;
                $("#longitude").val(longitude);
                $("#latitude").val(latitude);
                // alert(longitude + "  " + latitude);
                map.centerAndZoom(r.point, 16);
                var geoc = new BMap.Geocoder();
                geoc.getLocation(r.point, function (rs) {
                    // var address = rs.address + rs.business;
                    var address = rs.address;
                    $("#sign_address").val(address);
                    // alert(address);
                    // $("#info").empty();
                    // $("#info").append(address);
                    // show_shield1();
                });
            }
            else {
                // alert('failed' + this.getStatus());
                $("#info").empty();
                $("#info").append('failed' + this.getStatus());
                show_shield1();
            }
        }, {enableHighAccuracy: true});
    };
    //我的考勤
    win.mySignInfo = function () {
        win.location.href = "/hr-app/hr/mobile/kq_my_sign.html?pid=" + $("#person_id").val();
    };

    //显示遮罩信息
    win.show_shield = function () {
        var l = doc.getElementById("log_window");
        l.style.display = "block";
        var s = doc.getElementById("test");
        s.style.display = "block";
    };
    //取消遮罩信息
    win.cancel_shield = function () {
        var s = document.getElementById("test");
        s.style.display = "none";

        var l = document.getElementById("log_window");
        l.style.display = "none";
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

})(document, window);