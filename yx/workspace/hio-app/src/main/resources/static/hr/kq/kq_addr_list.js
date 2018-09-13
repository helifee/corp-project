(function ($, window, document, undefined) {
    var durAddType;
    var treeNode1;//用于更新左侧树
    // var ifChanged = $("#addrListForm").data("changed");//表单是否被修改过(true 是  false 否)
    /**
     * 通过jquery给form表单中的数据赋值引起变化的，需要添加以下代码手动触发变化：
     *      $("#addrListForm").data("changed", true);
     */
    $(function () {
        /*控制页面左右滚动条*/
        var h = $(window).height();
        var w = $(window).width();
        var leftWidth = $(".slide-left .ztree-box").width();
        $("#right").css("height", h + "px");
        //$("#right").css("width",(w-leftWidth-15)+"px");
        $("#right").css("overflow", "scroll");
        mapInit();
        resizeHeight();
        pageInit();
        $("#addrListForm").data("changed", false);//表单是否修改,默认为false
        $("#addrListForm").data("addressChanged", false);//表单是否修改

        $("#saveBtn").on('click', function () {
            var addFlag = $("#addFlag").val();
            var ifChanged = $("#addrListForm").data("changed");
            var hrKqAddrArr = $("#addrListForm").serializeArray();
            if (ifChanged == "true" || ifChanged == true) {
                if (addFlag == "true" || addFlag == true) {
                    $("#addrListForm").attr("data-validate-success", "saveForm(0)");
                } else {

                    $("#addrListForm").attr("data-validate-success", "editSaveForm()");
                }
                $("#addrListForm").submit();
            } else {
                pop_tip_open("red", "没有修改，不需要保存！");
            }
            var id = $(':focus').attr("id");
            $("#" + id + "").blur();
        });

        //点击新增，需要
        $("#addAddress").on('click', function () {
            resetForm();
        });
    });


    //清空表单：包括内容及其提示信息
    function resetForm() {
        $("#addFlag").val(true);
        $("#id").val("");
        //textAreaWindth textAreaInput valid
        $("td").removeClass("has-error");//移除红色边框
        $("td").removeClass("has-success");//移除绿色边框
        $(".error").text("");//去除提示信息
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var nodes = treeObj.getSelectedNodes();
        if (nodes.length > 0) {
            treeObj.cancelSelectedNode(nodes[0]);
        }
        empty();
        $(':input', '#addrListForm')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');

    }

//给页面的input添加change事件
    $(":input").bind("input propertychange", function () {
        $("#addrListForm").data("changed", true);
    });

    $('.btn').click(function (e) {
        e.preventDefault();
    });

    function pageInit() {
        queryAddrList("");
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
                map.centerAndZoom(poi, 16);
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
        // map.centerAndZoom("北京", 12);                   // 初始化地图,设置城市和地图级别。
        map.enableScrollWheelZoom();

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

        var geoc = new BMap.Geocoder();//地址解析器
        //单击获取点击的经纬度
        map.addEventListener("click", function (e) {
            setAddr(e.point.lng, e.point.lat);

            $("#location").val("");
            var pt = e.point;
            geoc.getLocation(pt, function (rs) {
                // var address = rs.address + rs.business;
                var address = rs.address;
                $("#location").val(address);
                $("#addrListForm").data("changed", true);
            });

        });

        //    });

        window.setAddr = function (lng, lat) {
            map.clearOverlays();
            var addPoint = new BMap.Point(lng, lat);
            var marker = new BMap.Marker(addPoint); // 创建点
            map.centerAndZoom(addPoint, 16);
            map.addOverlay(marker); //增加点
//        vectorMarkerTmp = vectorMarker;
            $("#latitude").val(lat);
            $("#longitude").val(lng);
        };
        window.setPlace = function () {
            $("#location").val("");
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun() {
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                $("#longitude").val(pp.lng);
                $("#latitude").val(pp.lat);
                map.centerAndZoom(pp, 16);
                map.addOverlay(new BMap.Marker(pp));    //添加标注

                geoc.getLocation(pp, function (rs) {
                    // var address = rs.address + rs.business;
                    var address = rs.address;
                    $("#location").val(address);
                    $("#addrListForm").data("changed", true);

                });
            }

            var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        };
    }

    window.openNewWindow = function (src) {
        window.open(src, 'width=' + (window.screen.availWidth - 180) + ',height=' + (window.screen.availHeight - 60) + ',top=0, left=90');
    };

    function closeWindow() {
        window.close();
    }

//计算高度
    function resizeHeight() {
        //左侧  头部底部为60px  title类 为50px
        var w_h = $(window).height();
        $(".slide-left .ztree-box").height((w_h - 80) + "px");
        //右侧table
//        $(".table").height((w_h-70 ) + "px");
    }

//grid 自适应宽度
    $(window).resize(function () {
        resizeHeight();
    });
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
        $("#addrListForm").data("changed", true);
        orgCheck(data);
    };

    window.orgCheck = function (data) {
        if (data.length > 1000) {
            pop_tip_open("red", "机构数不能超过1000！");
            $("#addrListForm").find("input[id='orgIds']").val("");
            $("#addrListForm").find("input[id='orgName11']").val("");
        }
    };
// window.ipCheck = function () {
//     var ip = $("#ip").val();
//     // pop_tip_open("red", ip.length);
//     if (ip.split(",").length > 30 || ip.length > 520) {
//     var ip = $("#ip").val("");
//         pop_tip_open("red", "签到网关不能超过30个！");
//     }
// };
    /**
     * 清空组织机构上级
     */
    window.empty = function () {
        $("#addrListForm").find("input[id='orgIds']").val("");
        $("#addrListForm").find("input[id='orgName11']").val("");
    };

    /**
     * 初始化主键ID
     */
    function initUuid() {
        var uBody = "sys/uuid/generator/getGuuid" + "?time=" + Math.random();
        var uAll = serviceUrl + uBody;
        $.ajax({
            type: 'get',
            async: false,
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#id").val(guuid);
            }
        });
    }


    /**
     * 修改签到地点
     */
    window.editSaveForm = function () {
        var hrKqAddrArr = $("#addrListForm").serializeArray();
        var hrKqAddrDto = {};
        var ip = $("#ip").val();
        if (ip !== undefined && ip !== null && ip !== "") {
            var flag = checkIPBatch(ip);
            if (flag == false) {
                pop_tip_open("red", "您输入的ip地址不合法！");
                return;
            }
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
        var id = $('#id').val();
        hrKqAddrDto.id = id;
        var uBody = "kq/hrKqAddr/update/" + id;
        var uAll = serviceUrl + uBody;
        $.ajax({
            url: uAll,
            data: JSON.stringify(hrKqAddrDto),
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'JSON',
            success: function (resultData) {
                // if (resultData) {
                var successFlag = resultData.success;
                var result = resultData.result;
                var msg = resultData.msg;
                // var node = zTreeObj.getNodeByParam("id", id);
                // zTreeObj.selectNode(node);
                // queryAddrListById(id);
                if (successFlag) {
                    pop_tip_open("blue", msg);
                    $("#addrListForm").data("changed", false);
                    treeNode1.name = hrKqAddrDto.address;
                    zTreeObj.updateNode(treeNode1);
                } else {
                    pop_tip_open("red", "修改保存失败！" + msg);
                }
                // }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "修改保存失败");
            }
        });

    };


    /**
     * 根据id查询签到地点
     */
    window.queryAddrListById = function (id) {
        var selectAddrId = $("#selectAddrId").val();
        var hrKqAddrDtoQ = {};
        if (id == "" || id == null) {
            id = selectAddrId;
            // hrKqAddrDtoQ["id"] = selectAddrId;
        }
        hrKqAddrDtoQ["id"] = id;


        $.ajax({
                url: serviceUrl + "kq/hrKqAddr/queryAddrById",
                type: "post",
                data: JSON.stringify(hrKqAddrDtoQ),
                dataType: 'JSON',
                contentType: 'application/json',
                success: function (data) {
                    if (data.success == false) {
                        pop_tip_open("red", "签到地点查询失败");
                    } else {
                        $("#addrListForm").data("changed", false);//表单是否修改
                        var result = data.result;
                        if (result.length > 0) {
                            var id = result[0].id;
                            var orgIds = result[0].orgIds;
                            var address = result[0].address;
                            var scope = result[0].scope;
                            var ip = result[0].ip;
                            var latitude = result[0].latitude;
                            var longitude = result[0].longitude;
                            var location = result[0].location;
                            $("#id").val(id);
                            $("#orgIds").val(orgIds);
                            $("#address").val(address);
                            $("#scope").val(scope);
                            $("#ip").val(ip);
                            $("#location").val(location);
                            $("#longitude").val(longitude);
                            $("#latitude").val(latitude);

                            // var orgName = orgInterpret(orgIds);
                            $("#orgName11").val(result[0].orgNames);
                            if (latitude != null && longitude != null) {
                                setAddr(longitude, latitude);
                            }
                            $("td").removeClass("has-error");//移除红色边框
                            $("td").removeClass("has-success");//移除绿色边框
                            $(".error").text("");//去除提示信息
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    pop_tip_open("red", textStatus);
                    $.xljUtils.tip("red", "查询失败！");
                }
            }
        )
        ;
    };


    /**
     *查询签到地点列表
     */
    window.queryAddrList = function (treeId) {
        $("#treeDemo_1_ul").empty();
        $.ajax({
            url: serviceUrl + "kq/hrKqAddr/queryList",
            type: "post",
            data: "{}",
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data) {
                if (data.success == false) {
                    pop_tip_open("red", "签到地点查询失败");
                }
                var result = data.result;
                recursionArray(result);
                zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, result);
                var nodes = zTreeObj.getNodes();
                treeNode1 = nodes[0];
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].name = nodes[i].address;
                    //调用updateNode(node)接口进行更新
                    zTreeObj.updateNode(nodes[i]);
                }
                //默认展开第一个节点和第二个节点
                zTreeObj.expandNode(nodes[0], true, false, false, false);
                zTreeObj.expandNode(nodes[1], true, false, false, false);
                if (treeId == "" || treeId == null) {
                    zTreeObj.selectNode(nodes[0]);
                    if (nodes.length > 0) {
                        var id = nodes[0].id;
                        queryAddrListById(id);
                    }
                } else {
                    var node = zTreeObj.getNodeByParam("id", treeId);
                    zTreeObj.selectNode(node);
                    queryAddrListById(treeId);
                }

                if (result.length == 0) {
                    resetForm();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", textStatus);
                $.xljUtils.tip("red", "签到地点查询失败！");
            }
        });
    };

    /**
     * 刪除签到地点
     */
    window.delAddrById = function () {
        //选中一条记录
        var id;
        var nodes = zTreeObj.getSelectedNodes();
        if (nodes.length == 0) {
            pop_tip_open("red", "请选择要删除的地点");
        } else if (nodes.length > 0) {
            id = nodes[0].id;
            pop_text_open("blue", '确认删除吗？', function () {
                var urlBody = "kq/hrKqAddr/delete/" + id;
                var urlAll = serviceUrl + urlBody;
                $.ajax({
                    type: 'DELETE',
                    url: urlAll,
                    async: false,
                    dataType: 'json',
                    contentType: 'application/json',
                    data: "{}",
                    success: function (json) {
                        if (json.success == true) {
                            pop_tip_open("blue", "删除成功!");
                            queryAddrList("");
                        } else {
                            pop_tip_open("red", json.msg);
                        }
                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        pop_tip_open("red", "删除失败!");
                    }
                })
            }, true);
        }
    };

    /**
     * 多选机构翻译
     */
    function orgInterpret(orgIds) {
        var ids = orgIds.split(",");
        var orgName = "";
        if (ids != null && ids != "") {
            for (var i = 0; i < ids.length; i++) {
                orgName += $.hrUtils.getHROrgNameById(ids[i]) + ",";
            }
        }

        if (orgName != null) {
            orgName = orgName.substring(0, orgName.length - 1);
            return orgName;
        } else {
            return "";
        }
    }


    /**
     * 校验ip地址
     * @param ip
     * @returns {boolean}
     */
    window.checkIP = function (ip) {
        var obj = ip;
        var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        var reg = obj.match(exp);
        if (reg == null) {
            return false;//不合法
        } else {
            return true; //合法
        }
    };


    /**
     * 校验一串ip地址
     * @param ip
     * @returns {boolean}
     */
    window.checkIPBatch = function (ips) {
        var flag = false;
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

        if (flag == true) {
            return true;
        } else {
            return false;
        }
    };

    window.addressChange = function () {
        var address = $("#address").val();
        if (address != null && address != "") {
            $("#addrListForm").data("addressChanged", true);
        }
    };

    /**
     * 签到范围校验：true 通过  false 不通过
     */
    window.scopeChack = function () {
        var flag = $("#scope-error").hasClass("error");
        if (flag == false) {
            var scope = $("#scope").val();
            if (scope != null && scope != "") {
                $("#scope").val(parseInt(scope));
            }
        }
    };
    window.checkIfRename = function () {
        var addFlag = $("#addFlag").val();
        var address = $("#address").val();
        var ifChanged = $("#addrListForm").data("addressChanged");

        // 1.新增时
        // 2.修改且签到地点字段有修改时
        if ((address != null && address != "" && addFlag == "true") || addFlag != "true" && ifChanged == "true") {
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
                                $("#address").val("");
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
        }
    };


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

    };

    /**
     * 新增签到地点
     */
    window.addSaveForm = function (sign) {
        initUuid();
        var hrKqAddrArr = $("#addrListForm").serializeArray();
        var hrKqAddrDto = {};
        var ip = $("#ip").val();
        if (ip !== undefined && ip !== null && ip !== "") {
            var flag = checkIPBatch(ip);
            if (flag == false) {
                pop_tip_open("red", "您输入的ip地址不合法！");
                return;
            }
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
                        $("#addrListForm").data("changed", false);
                        queryAddrList(id);
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


    window.zTreeBeforeOnClick = function (treeId, treeNode, clickFlag) {
        var ifChanged = $("#addrListForm").data("changed");
        var addFlag = $("#addFlag").val();
        var flag = false;
        if (ifChanged == "true" || ifChanged == true) {//有修改（为true就是没有保存，保存成功之后置为false）
            pop_text_open("blue", '尚未保存数据，是否保存？', function () {
                $("#addrListForm").attr("data-validate-success", "");
                $("#addrListForm").submit();
                var errorFlag = $("td").hasClass("has-error");
                if (errorFlag == true) {
                    flag = false;
                    return;
                }

                if (errorFlag == false) {
                    if (addFlag == "true" || addFlag == true) {//新增
                        saveForm(0);
                        flag = true;
                    } else {
                        editSaveForm();
                        flag = true;
                    }
                }

                zTreeObj.selectNode(treeNode);
                queryAddrListById(treeNode.id);
            }, function () {
                zTreeObj.selectNode(treeNode);
                queryAddrListById(treeNode.id);
                return true;
            });
        } else {
            return true;
        }

        return flag;
    };
    /**
     * 树点击节点事件
     */
    window.zTreeOnClick = function (event, treeId, treeNode) {
        $("#addFlag").val(false);
        treeNode1 = treeNode;
        queryAddrListById(treeNode.id);
    };

})
(jQuery, window, document);