/**
 * 移动端出差打卡js
 * Android版CC定位信息使用cc传过来的经度、维度、地址
 * iso版定位信息使用百度定位
 * 方法调用顺序慎重修改
 */
(function (doc, win) {
    var sysOs = "";//系统型号
    var responseData1;//cc返回的位置信息
    // var cancel_shield_flag;//弹框提示是哪一个  flag_check/flag_no_check
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
        // $("#info").empty();
        var s = document.getElementById("test");
        s.style.display = "none";

        var l = document.getElementById("info_window");
        l.style.display = "none";
    };
    //显示alert提示信息
    win.show_shield2 = function () {
        var l = doc.getElementById("info_window_noCheck");
        l.style.display = "block";
        var s = doc.getElementById("test_noCheck");
        s.style.display = "block";
    };
    //取消alert提示信息
    win.cancel_shield2 = function () {
        // $("#info").empty();
        var s = document.getElementById("test_noCheck");
        s.style.display = "none";

        var l = document.getElementById("info_window_noCheck");
        l.style.display = "none";
    };

    win.show_shield = function () {
        var info = $("#info").text();
        var info_noCheck = $("#info_noCheck").text();
        if (info != null && info != "") {
            show_shield1();
            // cancel_shield_flag = "flag_check";
        } else if (info_noCheck != null && info_noCheck != "") {
            show_shield2();
            // cancel_shield_flag = "flag_no_check";
        }
    };

    win.cancel_shield = function () {
        cancel_shield1();
        cancel_shield2();
        // if (cancel_shield_flag == "flag_check") {
        //     cancel_shield1();
        // } else if (cancel_shield_flag == "flag_no_check") {
        //     cancel_shield2();
        // }
    };
    // $("#info_noCheck").append("通过CC获取的经度：" + "11" + " 维度：" + "11" + " 地址：" + "11");
    // show_shield();
    //自动定位
    win.locateAddr = function () {
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        // map.enableScrollWheelZoom();
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
                map.centerAndZoom(r.point, 16);
                var geoc = new BMap.Geocoder();
                geoc.getLocation(r.point, function (rs) {
                    // var address = rs.address + rs.business;
                    var address = rs.address;
                    $("#sign_address").val(address);
                    // alert(address);
                    // $("#info").empty();
                    // $("#info").append(address);
                    // show_shield();
                    $('#showInfo').empty();
                    $('#showInfo').append(address);
                });
            }
            else {
                // alert('failed' + this.getStatus());
                $("#info").empty();
                $("#info").append('failed' + this.getStatus());
                show_shield();
            }
        }, {enableHighAccuracy: true});
    };
    /**
     * 通过CC定位获取经纬度，传给百度获取地理位置
     * @param position
     */
    win.showPositionByCC = function (responseData1) {
        // 百度地图API功能
        var currentLat = responseData1.latitude;
        var currentLon = responseData1.longitude;
        $("#longitude").val(currentLon);
        $("#latitude").val(currentLat);
        var gpsPoint = new BMap.Point(currentLon, currentLat);
        //地图初始化
        var bm = new BMap.Map("allmap");
        bm.centerAndZoom(gpsPoint, 16);
        var marker = new BMap.Marker(gpsPoint);
        bm.clearOverlays();
        bm.addOverlay(marker);
        bm.setCenter(gpsPoint);
        bm.panTo(gpsPoint);
        var address = responseData1.address;
        $("#sign_address").val(address);
        // //坐标转换完之后的回调函数
        // translateCallback = function (point) {
        //     var marker = new BMap.Marker(point);
        //     bm.clearOverlays();
        //     bm.addOverlay(marker);
        //     bm.setCenter(point);
        //     bm.panTo(point);
        //     var myGeo = new BMap.Geocoder();
        //     // 根据百度坐标得到地址描述
        //     myGeo.getLocation(point, function (result) {
        //         if (result) {
        //             bm.centerAndZoom(point, 16);
        //             var address = result.address;
        //             $("#sign_address").val(address);
        //         }
        //     });
        // };
        // setTimeout(function () {
        //     BMap.Convertor.translate(gpsPoint, 0, translateCallback)
        // }, 1000);
        // $("#info").empty();
    };

    /**
     * 通过手机定位获取经纬度，传给百度获取地理位置
     * @param position
     */
    win.showPosition = function (position) {
        // 百度地图API功能
        var currentLat = position.coords.latitude;
        var currentLon = position.coords.longitude;
        $("#longitude").val(currentLon);
        $("#latitude").val(currentLat);
        var gpsPoint = new BMap.Point(currentLon, currentLat);
        //地图初始化
        var bm = new BMap.Map("allmap");
        bm.centerAndZoom(gpsPoint, 16);

        //坐标转换完之后的回调函数
        translateCallback = function (point) {
            var marker = new BMap.Marker(point);
            bm.clearOverlays();
            bm.addOverlay(marker);
            bm.setCenter(point);
            bm.panTo(point);
            var myGeo = new BMap.Geocoder();
            // 根据百度坐标得到地址描述
            myGeo.getLocation(point, function (result) {
                if (result) {
                    bm.centerAndZoom(point, 16);
                    var address = result.address;
                    $("#sign_address").val(address);
                }
            });
        };
        setTimeout(function () {
            BMap.Convertor.translate(gpsPoint, 0, translateCallback)
        }, 1000);
        $("#info").empty();
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
                show_shield();
                break;
            case error.POSITION_UNAVAILABLE:
                $("#info").empty();
                $("#info").append("位置信息是不可用的。");
                show_shield();
                break;
            case error.TIMEOUT:
                $("#info").empty();
                $("#info").append("请求用户地理位置超时。");
                show_shield();
                break;
            case error.UNKNOWN_ERROR:
                $("#info").empty();
                $("#info").append("未知错误。");
                show_shield();
                break;
        }
    };
    /**
     * 通过H5 gps获取定位
     */
    win.generalBaiduMap = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);//定位
        } else {
            $("#info").empty();
            $("#info").append('该浏览器不支持地理位置!');
            show_shield();
        }
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

    /**
     * 查询当前人员的当天的签到时间、签退时间
     * @param personId
     */
    function queryMySignToday(personId) {
        var curData = new Date().format('yyyy-MM-dd');
        var urlBody = "kq/hrKqSign/querySignInfo";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'JSON',
            contentType: 'application/json',
            data: JSON.stringify({"personId": personId, 'date': curData, "ifBussQuery": "true"}),
            success: function (data) {
                if (data.success == true) {
                    var signList = data.result;
                    if (signList != null && signList.length > 0) {
                        for (i = 0; i < signList.length; i++) {
                            if (signList[i] != null) {
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

                                // if (signList[i].signStatus == '1105100196') {//有效
                                //     var sign_time = signList[i].signTime;//签到时间
                                //     if (sign_time != null && sign_time.length >= 16) {
                                //         if (signList[i].signType == '1107100200') {//签到
                                //             $("#sign_in_msg").empty();
                                //             $("#sign_in_msg").append(sign_time.substring(10, 16) + " " + "已签到");
                                //         } else if (signList[i].signType == '1107100201') {//签退
                                //             $("#sign_out_msg").empty();
                                //             $("#sign_out_msg").append(sign_time.substring(10, 16) + " " + "已签退");
                                //         }
                                //     }
                                // }
                            }
                        }
                    }
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });
    }

    //页面初始化
    $(doc).ready(function () {
        getOs();
        if (sysOs == "iOS") {//ios系统的处理
            locateAddr();//通过百度获取定位
        } else if (sysOs == "AndroidOS") {//Android系统的处理
            //执行调用
            connectRyJsBridge(function (bridge) {
                bridge.callHandler(
                    'MPFetchLocation'
                    , {}
                    , function (responseData) {
                        // document.getElementById("show").innerHTML = responseData;
                        responseData1 = JSON.parse(responseData);
                        var latitude = responseData1.latitude;//维度
                        var longitude = responseData1.longitude;//经度
                        var address = responseData1.address;//地址
                        $("#longitude").val(longitude);
                        $("#latitude").val(latitude);
                        $("#sign_address").val(address);
                        // $("#info").empty();
                        // // $("#info").append("通过CC获取的经度：" + longitude + " 维度：" + latitude + " 地址：" + address);
                        // $("#info_noCheck").append("通过CC获取的经度：" + longitude + " 维度：" + latitude + " 地址：" + address);
                        // show_shield();
                        $('#showInfo').empty();
                        $('#showInfo').append(address);
                        showPositionByCC(responseData1);//将定位传给百度，展示地图
                    }
                );
            });
        }
        getNetWayIp();//初始化数据
        //验证用户信息
        var msg = $.hrUtils.verifUserInfo();
        if (msg != null && msg.length > 0) {
            // alert(msg);
            $("#info").empty();
            $("#info").append(msg);
            show_shield();
        } else {
            //hr人员信息
            var hrEmpInfo = $.hrUtils.getHREmpInfo();
            $("#person_id").val(hrEmpInfo.id);
            queryMySignToday(hrEmpInfo.id)
        }
    });

    /*//经纬度转地址
     function toAddress(e) {
     var url = 'http://api.map.baidu.com/geocoder/v2/?ak=jrwKjTPLeh7pu1mGA4gItbgqQ1OV8wGi&callback=?&location=' + e.point.lat + ',' + e.point.lng + '&output=json&pois=1';
     $.getJSON(url, function (res) {
     var addComp = res.result.addressComponent;
     var address = "";
     if (undefined != addComp.province && "" != addComp.province) {
     address = address + addComp.province + ", ";
     }
     if (undefined != addComp.city && "" != addComp.city) {
     address = address + addComp.city + ", ";
     }
     if (undefined != addComp.district && "" != addComp.district) {
     address = address + addComp.district + ", ";
     }
     if (undefined != addComp.street && "" != addComp.street) {
     address = address + addComp.street;
     }
     if (undefined != addComp.streetNumber && "" != addComp.streetNumber) {
     address = address + addComp.streetNumber;
     }
     alert(address);
     $("#sign_address").val(address);
     });
     $("#longitude").val(e.point.lng);
     $("#latitude").val(e.point.lat);

     }*/

    /**
     * 点击按钮触发
     * 重新定位
     */
    win.dingwei = function () {
        if (sysOs == "iOS") {//ios系统的处理
            locateAddr();//通过百度获取定位
        } else if (sysOs == "AndroidOS") {//Android系统的处理
            //执行调用
            connectRyJsBridge(function (bridge) {
                bridge.callHandler(
                    'MPFetchLocation'
                    , {}
                    , function (responseData) {
                        // document.getElementById("show").innerHTML = responseData;
                        responseData1 = JSON.parse(responseData);
                        var latitude = responseData1.latitude;//维度
                        var longitude = responseData1.longitude;//经度
                        var address = responseData1.address;//地址
                        $("#longitude").val(longitude);
                        $("#latitude").val(latitude);
                        $("#sign_address").val(address);
                        // $("#info").empty();
                        // // $("#info").append("通过CC获取的经度：" + longitude + " 维度：" + latitude + " 地址：" + address);
                        // $("#info_noCheck").append("通过CC获取的经度：" + longitude + " 维度：" + latitude + " 地址：" + address);
                        // show_shield();
                        showPositionByCC(responseData1);//将定位传给百度，展示地图
                    }
                );
            });
        }
    };

    //打卡function
    win.mobileSignFunc = function (msgId) {
        var dt = {};
        var person_id = $('#person_id').val();
        if (person_id == null || person_id == '') {
            // alert("当前人员信息获取失败");
            $("#info").empty();
            $("#info").append("当前人员信息获取失败");
            show_shield();
            return;
        }
        dt.person_id = person_id;
        dt.sign_type = $("#sign_type").val();
        dt.kq_type = $("#kq_type").val();
        dt.netway = $("#netway").val();
        dt.longitude = $("#longitude").val();
        dt.latitude = $("#latitude").val();
        dt.sign_address = $("#sign_address").val();
        dt.mobile_sys_type = $("#mobile_sys_type").val();
        dt.mobile_data_type = $("#mobile_data_type").val();
        dt.sign_time = new Date().getTime();
        dt.sign_status = $("#sign_status").val();
        var urlBody = "/kq/hrKqSign/saveSomeAttr";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(dt),
            async: false,
            success: function (json) {
                if (json.success) {
                    var ret = json.result;
                    console.log(JSON.stringify(json));
                    if (undefined != ret && undefined != ret.sign_status && ret.sign_status.indexOf("签") != -1) {
                        if ("sign_in_msg" == msgId) {//显示时分
                            $("#sign_in_msg").empty();
                            $("#" + msgId).append(ret.sign_time + " " + ret.sign_status);
                        } else {
                            $("#sign_out_msg").empty();
                            $("#" + msgId).append(ret.sign_time + " " + ret.sign_status);
                        }
                    }
                } else {
                    // alert(json.msg);
                    $("#info").empty();
                    $("#info").append(json.msg);
                    show_shield();
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.status);
                console.log("保存失败");
            }
        });
    };
    //签到
    win.signInFunc = function () {
        $("#sign_type").val("1107100200");
        var info = $("#info").text();
        if (info != null && info != "") {
            show_shield();
            return;
        }
        isChecked();
        mobileSignFunc('sign_in_msg');
    };
    //签退
    win.signOutFunc = function () {
        $("#sign_type").val("1107100201");
        var info = $("#info").text();
        if (info != null && info != "" && info != "您已签到，无需重复签到！") {
            show_shield();
            return;
        }
        isChecked();
        mobileSignFunc('sign_out_msg');
    };
    /**
     * 搜索位置
     */
    win.searchPosition = function () {
        var position = $("#suggestId").val();
        if (undefined != position && "" != position) {
            $("#sign_address").val(position);
            locateAddr();
        } else {
            // alert("输入地址不能为空!");
            $("#info").empty();
            $("#info").append("输入地址不能为空!");
            show_shield();
        }
    };
    //获取访问手机的信息(android/iso;网关ip;经纬度;地址;wife/4g)(调用方会提供)
    function getNetWayIp() {
        // $("#netway").val("10.10.10.9");
        /* $("#longitude").val("39.919857");
         $("#latitude").val("116.461402");
         $("#sign_address").val("北京市朝阳区永安里");*/
        // $("#mobile_sys_type").val("android");
        $("#mobile_sys_type").val(getOs());
        $("#mobile_data_type").val("4G");
    }

    //判断是不是市内公出
    function isChecked() {
        var sngc_ = $("#sngc:checked").val();
        if ("1079100142" == sngc_) {
            $("#kq_type").val(sngc_);
        }
        //alert($("#kq_type").val());
    }

    //返回
    win.goBack = function () {
        win.history.go(-1);
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