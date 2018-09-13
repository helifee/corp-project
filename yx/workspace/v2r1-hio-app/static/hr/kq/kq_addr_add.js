;(function ($, window, document, undefined) {
    // var planId = $.xljUtils.getUrlParam("attendanceRulesEditId");
    var planId = window.parent.attendanceRulesEditId;
    // var planId = "";
    $("#planId").val(planId);
    var type = $.xljUtils.getUrlParam("type");
    var editAddressId;
    var address;
    $(function () {

        // loadMapJS();
        //
        mapInit();

        if (type === "add") {
            $('title').text("签到地点-新增");
            $(".xj-form-title").text("签到地点-新增");
        } else if (type === "update") {
            $('title').text("签到地点-修改");
            $(".xj-form-title").text("签到地点-修改");
            editAddressId = window.parent.editAddressId;
            getAddressById(editAddressId);
        }

        $("#saveBtn").on('click', function () {
            if (type === "add") {
                $("#addrAddForm").attr("data-validate-success", "saveForm(0)");
                $("#addrAddForm").submit();
            } else if (type === "update") {
                $("#addrAddForm").attr("data-validate-success", "saveForm(1)");
                $("#addrAddForm").submit();
            }

        });

        $("#closeWindow").on('click', function () {
            // window.parent.closePa()
            window.parent.closePa();
        });

        //默认手动
        $("#address").css("background-color", "#ffffff");
        $("#address").css("cursor", "auto");
        $("#address").removeAttr("readonly");
        $("#address").removeAttr("unselectable");
        $("#r-result").show();

        initUuid();
        document.onreadystatechange = loadComplete;//当页面加载状态改变的时候执行这个方法.

    });

    function loadComplete() {
        if (document.readyState === "complete") {
            $("#address").val(address);
        }
    }

    function mapInit() {
        $.ajax({
            "async": "false",
            "url": "http://api.map.baidu.com/location/ip?ak=jrwKjTPLeh7pu1mGA4gItbgqQ1OV8wGi",
            "type": "GET",
            "dataType": "jsonp",
//                    "jsonpCallback" : "showLocation",
            jsonp: 'callback',
            "timeout": "5000",
            "contentType": "application/json;utf-8",
            "data": {"coor": "bd09ll"},
            "success": function (data) {
                var content = data.content;
                var point = content.point;
                var poi = new BMap.Point(point.x, point.y);
                map.centerAndZoom(poi, 12);
            },
            "error": function (data) {
                alert(data);
            }
        });

        // 百度地图API功能
        window.G = function (id) {
            return document.getElementById(id);
        };

        var map = new BMap.Map("allmap");
        map.enableScrollWheelZoom();
        map.centerAndZoom("北京", 12);                   // 初始化地图,设置城市和地图级别。

        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
            {
                "input": "address"
                , "location": map
            });

        ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
            var str = "";
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province + _value.city + _value.district + _value.street + _value.business;
            }
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            G("searchResultPanel").innerHTML = str;
        });

        var myValue;
        ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
            var _value = e.item.value;
            myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
            G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
            $("#address").val(myValue);//签到地点
            setPlace();

        });

        var geoc = new BMap.Geocoder();
        //地图加载完成事件
        //    map.addEventListener("tilesloaded", function () {
        //单击获取点击的经纬度
        map.addEventListener("click", function (e) {
            setAddr(e.point.lng, e.point.lat);
            $("#location").val("");
            var pt = e.point;
            geoc.getLocation(pt, function (rs) {
//            var addComp = rs.addressComponents;
//            alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                var address = rs.address + rs.business;
                $("#location").val(address);
            });

        });

        window.setAddr = function (lng, lat) {
            map.clearOverlays();
            var addPoint = new BMap.Point(lng, lat);
            var marker = new BMap.Marker(addPoint); // 创建点
            map.centerAndZoom(addPoint, 12);
            map.addOverlay(marker); //增加点
//        vectorMarkerTmp = vectorMarker;
            $("#latitude").val(lat);
            $("#longitude").val(lng);
        };

        //清空签到地点
        window.mapReset = function () {
            map.clearOverlays();
            map.centerAndZoom("北京", 12);
            $("#latitude").val(null);
            $("#longitude").val(null);
        };


        window.setPlace = function () {
            $("#location").val("");
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun() {
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                $("#longitude").val(pp.lng);
                $("#latitude").val(pp.lat);
                map.centerAndZoom(pp, 12);
                map.addOverlay(new BMap.Marker(pp));    //添加标注


                geoc.getLocation(pp, function (rs) {
                    var address = rs.address + rs.business;
                    $("#location").val(address);
                });

            }

            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        };

    }

    function openNewWindow(src) {
        window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
    }

    function closeWindow() {
        window.parent.closePa()
    }

    /**
     * 多选机构的回调
     */
    window.orgCallback1 = function (data) {
        var orgIds = "";
        for (var i = 0; i < data.length; i++) {
            orgIds += data[i].id + ",";
        }
        orgIds = orgIds.substring(0, orgIds.length - 1);
        $('#orgIds').val(orgIds);
    };

    /**
     * 清空组织机构上级
     */
    window.empty = function () {
        $("#addrAddForm").find("input[id='orgIds']").val("");
        $("#addrAddForm").find("input[id='orgName11']").val("");
    };


    /**
     * 初始化主键ID
     */
    function initUuid() {
        var uBody = "generator/getGuuid" + "?time=" + Math.random();
        var uAll = hostUrl + uBody;
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#addrAddForm").find("input[name='id']").val(guuid);
            }
        });
    }

    /**
     * 保存表单
     */
    var renameFlag;

    window.saveForm = function (sign) {
        if (renameFlag === 'true') {
            pop_tip_open("red", "有重名的签到地点，请重新填写！");
        } else {
            var address = $("#address").val();
            var ip = $("#ip").val();
            if (ip === "" && address === "") {
                pop_tip_open("red", "网关和地点不能同时为空！");
                return;
            }
            if (sign === 0) {
                addSaveForm(sign);
            } else if (sign === 1) {
                editSaveForm(sign);
            }
        }

    };

    /**
     * 新增签到地点
     */
    function addSaveForm(sign) {
        initUuid();
        var hrKqAddrArr = $("#addrAddForm").serializeArray();
        var hrKqAddrDto = {};
        var ip = $("#ip").val();
        var flag = checkIPBatch(ip);
        if (flag === false) {
            pop_tip_open("red", "您输入的ip地址不合法！");
            return;
        }
        for (var i in hrKqAddrArr) {
            if (hrKqAddrArr[i].name == 'id') {
                hrKqAddrDto['sid'] = hrKqAddrArr[i].value;
            } else if (hrKqAddrArr[i].name == null || hrKqAddrArr[i].value == "") {
                hrKqAddrDto[hrKqAddrArr[i].name] = null;
            } else if (hrKqAddrArr[i].name == "orgName11") {

            } else {
                hrKqAddrDto[hrKqAddrArr[i].name] = hrKqAddrArr[i].value;
            }
        }
        hrKqAddrDto.delflag = 0;
        var id = hrKqAddrDto.sid;
        $.ajax({
            url: hostUrl + "kq/hrKqAddr/save",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(hrKqAddrDto),
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        pop_tip_open("blue", "保存成功！");
                        window.parent.closePa();
                        refreshParent();
                    } else {
                        pop_tip_open("red", xhr.message);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }

    function editSaveForm(sign) {
        var hrKqAddrArr = $("#addrAddForm").serializeArray();
        var hrKqAddrDto = {};
        var ip = $("#ip").val();
        var flag = checkIPBatch(ip);
        if (flag === false) {
            pop_tip_open("red", "您输入的ip地址不合法！");
            return;
        }
        for (var i in hrKqAddrArr) {
            if (hrKqAddrArr[i].name == 'id') {
                hrKqAddrDto['sid'] = hrKqAddrArr[i].value;
            } else if (hrKqAddrArr[i].name == null || hrKqAddrArr[i].value == "") {
                hrKqAddrDto[hrKqAddrArr[i].name] = "";
            } else if (hrKqAddrArr[i].name == "orgName11") {

            } else {
                hrKqAddrDto[hrKqAddrArr[i].name] = hrKqAddrArr[i].value;
            }
        }
        hrKqAddrDto.sid = editAddressId;
        $.ajax({
            url: hostUrl + "kq/hrKqAddr/update/" + editAddressId,
            type: 'PUT',
            async: false,
            data: JSON.stringify(hrKqAddrDto),
            dataType: "JSON",
            contentType: 'application/json',
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        pop_tip_open("blue", "保存成功！");
                        window.parent.closePa();
                        refreshParent();
                    } else {
                        pop_tip_open("red", xhr.message);
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    }


    /**
     * 查询单条记录
     */
    function getAddressById(id) {
        var urlBody = "kq/hrKqAddr/get/" + id;
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'GET',
            url: urlAll,
            async: false,
            success: function (data) {
                if (data.success == true) {
                    var result = data.result;
                    address = result.address;
                    $("#scope").val(result.scope);
                    $("#ip").val(result.ip);
                    $("#location").val(result.location);
                    $("#longitude").val(result.longitude);//y
                    $("#latitude").val(result.latitude);//x
                    $("#planId").val(result.planId);
                    $("#signType").val(result.signType);
                    setAddr(result.longitude, result.latitude);
                } else {
                    pop_tip_open("red", data.message);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "服务异常,请联系管理员！");
            }
        });

    }

    window.checkIfRename = function () {
        var address = $("#address").val();
        $.ajax({
            url: hostUrl + "kq/hrKqAddr/queryIfRename",
            type: 'POST',
            dataType: 'JSON',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify({"address": address}),
            success: function (data) {
                if (data) {
                    if (data.success) {
                        renameFlag = data.result;
                        if (renameFlag == 'true') {
                            $.xljUtils.tip("red", "您填写的签到地点已存在，请重新填写！");
                        }
                    } else {
                        pop_tip_open("red", "查询失败！");
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });

    };

    /**
     * 校验一串ip地址
     * @param ip
     * @returns {boolean}
     */
    function checkIPBatch(ips) {
        var flag = false;
        if (ips === "" || ips === null) {
            flag = true;
        } else {
            var ipArr = ips.split(",");
            for (var i = 0; i < ipArr.length; i++) {
                var obj = ipArr[i];
                var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                var reg = obj.match(exp);
                if (reg == null) {
                    flag = false;//不合法
                    break;
                } else {
                    flag = true; //合法
                }
            }
        }

        if (flag == true) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * 刷新父页面表格数据
     */
    function refreshParent() {
        var queryData = {
            "planId": planId
        };

        window.parent.jqGridKqAddr.jqGrid("setGridParam", {postData: queryData}).trigger("reloadGrid");
    }

    window.signTypeChange = function () {
        var signType = $("input[name='signType']:checked").val();
        if (signType === "1254100971") {//自动打卡，将签到地点输入框置灰，地图上的地点搜索隐藏
            $("#address").css("background-color", "#eaeaea");
            $("#address").css("cursor", "not-allowed");
            $("#address").attr("readonly", "true");
            $("#address").attr("unselectable", "on");
            $("#r-result").hide();
        } else if (signType === "1254100973") {
            $("#address").css("background-color", "#ffffff");
            $("#address").css("cursor", "auto");
            $("#address").removeAttr("readonly");
            $("#address").removeAttr("unselectable");
            $("#r-result").show();
        }
    };

    function loadMapJS() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + DB_MAP_AK;
        $('body').append(script);

        var script2 = document.createElement('script');
        script2.type = 'text/javascript';
        script2.src = 'http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js';
        $('body').append(script2);


    }

    window.addrCheck = function () {
        var address = $("#address").val();
        if (address == undefined || address == "" || address == null) {//如果签到地点是空，则经纬度也必须是空
            mapReset();
        }
    };


})(jQuery, window, document);