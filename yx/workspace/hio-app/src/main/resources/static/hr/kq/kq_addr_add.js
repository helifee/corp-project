;(function ($, window, document, undefined) {

    $(function () {
        mapInit();
        $("#saveBtn").on('click', function () {
            $("#addrAddForm").attr("data-validate-success", "saveForm(0)");
            $("#addrAddForm").submit();
        });

        $("#saveAndCreateBtn").on('click', function () {
            $("#addrAddForm").attr("data-validate-success", "saveForm(1)");
            $("#addrAddForm").submit();
        });

        $("#closeWindow").on('click', function () {
            window.close();
        });

        initUuid();
    });

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
                "input": "suggestId"
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

        window.setAddr = function (x, y) {
            map.clearOverlays();
            var addPoint = new BMap.Point(x, y);
            var marker = new BMap.Marker(addPoint); // 创建点
            map.centerAndZoom(addPoint, 12);
            map.addOverlay(marker); //增加点
//        vectorMarkerTmp = vectorMarker;
            $("#point_x").val(x);
            $("#point_y").val(y);
        };

        window.setPlace = function () {
            $("#location").val("");
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun() {
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                $("#point_x").val(pp.lng);
                $("#point_y").val(pp.lat);
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
        window.close();
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
        var uBody = "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
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
        // var address = $("#address").val();
        // checkIfRename(address);
        if (renameFlag == 'true') {
            pop_tip_open("red", "有重名的签到地点，请重新填写！");
        } else {
            addSaveForm(sign);
        }
        // addSaveForm(sign);

    };

    /**
     * 新增签到地点
     */
    window.addSaveForm = function (sign) {
        initUuid();
        var hrKqAddrArr = $("#addrAddForm").serializeArray();
        var hrKqAddrDto = {};
        var ip = $("#ip").val();
        var flag = window.opener.checkIPBatch(ip);
        if (flag == false) {
            pop_tip_open("red", "您输入的ip地址不合法！");
            return;
        }
        for (var i in hrKqAddrArr) {
            if (hrKqAddrArr[i].name == null || hrKqAddrArr[i].value == "") {
                hrKqAddrDto[hrKqAddrArr[i].name] = null;
            } else if (hrKqAddrArr[i].name == "orgName11") {

            } else {
                hrKqAddrDto[hrKqAddrArr[i].name] = hrKqAddrArr[i].value;
            }
        }
        hrKqAddrDto.delflag = false;
        var id = hrKqAddrDto.id;
        $.ajax({
            url: serviceUrl + "kq/hrKqAddr/save",
            type: 'POST',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            data: JSON.stringify(hrKqAddrDto),
            success: function (xhr) {
                if (xhr) {
                    if (xhr.success) {
                        pop_tip_open("blue", "保存成功！");
                        refreshParent(id);
                        closeWindow();
                    } else {
                        pop_tip_open("red", "保存失败！");
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }

        });
    };


    window.checkIfRename = function () {
        var address = $("#address").val();
        $.ajax({
            url: serviceUrl + "kq/hrKqAddr/queryIfRename",
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
     * 刷新父页面表格数据
     */
    function refreshParent(id) {
        // window.opener.jqGridExchange.jqGrid().trigger("reloadGrid");
        window.opener.queryAddrList(id);
    }
})(jQuery, window, document);