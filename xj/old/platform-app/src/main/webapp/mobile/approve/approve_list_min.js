var path;
/*$(function () {*/
window.onload=function() {
    var E = window.document.location.href;
    var A = window.document.location.pathname;
    var B = E.indexOf(A);
    var D = E.substring(0, B);
    var C = A.substring(0, A.substr(1).indexOf("/") + 1);
    path = D + C
    /*});*/
}
mui.init();
var startPosition1 = 0;
var startPosition2 = 0;
var startPosition3 = 0;
var startPosition4 = 0;
var count1 = 0;
var count2 = 0;
var count3 = 0;
var count4 = 0;
/*$(function () {*/
window.onload=function() {
    initUserInfo();
    var A = $.getUrlParam("isMy");
    if (A && A == "1") {
        $("#sliderSegmentedControl").remove();
        $("title").html("我的发起");
        $("#ds").css("display", "none");
        $("#dy").css("display", "none");
        $("#yb").css("display", "none");
        $("#ds_div").css("display", "none");
        $("#dy_div").css("display", "none");
        $("#yb_div").css("display", "none");
        getToDoData(0, true, 3)
    } else {
        changeMenu();
        queryAndShowToDoSum()
    }
}
/*});*/

var currentUserLoginName;

function initUserInfo() {
    var A = "/sys/org/user/getMyInfo?time=" + Math.random();
    var B = path + A;
    $.ajax({
        type: "get",
        url: B,
        dataType: "json",
        async: true,
        cache: true,
        success: function (C) {
            currentUserLoginName = C.result.loginName
        }, error: function (D, C, E) {
            alert("获取用户请求失败")
        }
    })
}

$.getUrlParam = function (C) {
    var B = new RegExp("(^|&)" + C + "=([^&]*)(&|$)");
    var A = decodeURI(window.location.search).substr(1).match(B);
    if (A != null) {
        return unescape(A[2])
    }
    return null
};

function changeMenu() {
    var A = $.getUrlParam("menu");
    if (!A) {
        A = 0
    }
    mui("#slider").slider().gotoItem(A);
    getToDoData(0, true, A)
}

function getTextUrlParams(B) {
    var A = B.substring(B.indexOf("?"));
    A = A.replace("?", "").replace(/&/g, '","');
    A = A.replace(/=/g, '":"');
    if (A != "") {
        try {
            A = JSON.parse('{"' + A + '"}')
        } catch (C) {}
    }
    return A
}


function taskView(B) {
    var A = getTextUrlParams(B).tendCode;
    var C = checkLogin(A);
    if (!C) {
        if (A) {
            window.open("/platform-app/login.html?tendCode=" + A + "&_time=" + Math.random(), "_self")
        } else {
            window.open("/platform-app/login.html?_time=" + Math.random(), "_self")
        }
        return
    }
    return A
}

function checkLogin(A) {
    var C = true;
    var B = path + "/sys/thirdPartyAuthentication/checkLogin?_time=" + new Date().getTime();
    if (currentUserLoginName) {
        B = B + "&loginName=" + currentUserLoginName
    }
    if (A) {
        B += "&tendCode=" + A + "&_s=" + A
    }
    $.ajax({
        type: "GET",
        url: B,
        dataType: "JSON",
        async: true,
        cache: true,
        success: function (D) {
            C = D.success
        }, error: function (D) {
            C = false
        }
    });
    return C
}

function queryAndShowToDoSum() {
    var A = "/platform-app/flow/sysNoticeMsg/queryTwoSumData";
    $.ajax({
        type: "POST",
        url: A,
        data: JSON.stringify({}),
        contentType: "application/json",
        dataType: "JSON",
        success: function (C) {
            console.log("C:",C);
            if (C.success) {
                var B = C.result[0];
                if (B && B.toDoSum && B.toDoSum > 0) {
                    $("#toDoSum").text(B.toDoSum);
                    $("#toDoSum").show()
                } else {
                    $("#toDoSum").text("");
                    $("#toDoSum").hide()
                } if (B && B.toReadSum && B.toReadSum > 0) {
                    $("#toReadSum").text(B.toReadSum);
                    $("#toReadSum").show()
                } else {
                    $("#toReadSum").text("");
                    $("#toReadSum").hide()
                }
            } else {
                $("#toDoSum").text("");
                $("#toDoSum").hide();
                $("#toReadSum").text("");
                $("#toReadSum").hide()
            }
        }
    })
}

function getToDoData(D, C, F) {
    var B;
    var A = {
        start: D,
        limit: 25
    };
    B = "/platform-app/flow/sysNoticeMsg/searchDataByKeyword";
    if (F == 0) {
        A.dataType = "DB"
    } else {
        if (F == 1) {
            A.dataType = "DY"
        } else {
            if (F == 2) {
                A.dataType = "HAVE_DONE"
            } else {
                if (F == 3) {
                    A.dataType = "FQ"
                }
            }
        }
    }
    A.more = true;
    var E;
    $.ajax({
        type: "POST",
        url: B,
        data: JSON.stringify(A),
        contentType: "application/json",
        dataType: "JSON",
        success: function (K) {
            console.log("K:",K);
            var H = K.result;
            var G = H.list;
            var I;
            if (F == 0) {
                I = $("#ds_div")
            } else {
                if (F == 1) {
                    I = $("#dy_div")
                } else {
                    if (F == 2) {
                        I = $("#yb_div")
                    } else {
                        if (F == 3) {
                            I = $("#fq_div")
                        }
                    }
                }
            }
            I.find(".mui-pull-loading").html("下拉重新加载");
            if (G) {
                var J;
                if (F == 0) {
                    J = $("#tab_1");
                    count1 = H.total
                } else {
                    if (F == 1) {
                        J = $("#tab_2");
                        count2 = H.total
                    } else {
                        if (F == 2) {
                            J = $("#tab_3");
                            count3 = H.total
                        } else {
                            if (F == 3) {
                                J = $("#tab_4");
                                count4 = H.total
                            }
                        }
                    }
                } if (C) {
                    J.empty()
                }
                if (G.length > 7) {
                    I.find(".mui-pull-loading").html("上拉显示更多")
                }
                J.append(showListFragment(G, F))
            }
        }
    })
}
var showListFragment = function (J, C) {
    var L = document.createDocumentFragment();
    var G;
    for (var E = 0; E < J.length; E++) {
        var F = J[E];
        var M;
        var H;
        var I;
        var A;
        var B = F.sendDate;
        if (B) {
            var K = B.replace(/-/g, "/");
            var D = new Date(K);
            H = D.getTime()
        }
        M = new Date().getTime() - H;
        if (M > 0) {
            I = M / (1000 * 60 * 60);
            I = I | 0
        }
        if (I > 0) {
            A = "停留" + I + "小时"
        } else {
            A = "停留0小时"
        }
        G = $("<li></li>");
        G.addClass("mui-table-view-cell");
        G.attr("id", F.id + "_" + C);
        G.attr("data-urlText", encodeURI(F.mobibleUrl));
        var K;
        if (C == 0 || C == 1) {
            K = "<h4 class='mui-ellipsis-2' style='word-break: break-all;word-wrap: break-word;font-weight: normal'>" + F.title + "</h4>";
            if (A != undefined) {
                K += "<h5><i class='mui-icon iconfont icon-shijian'></i>" + A + "</h5>"
            }
        } else {
            K = "<h4 class='mui-ellipsis-2' style='word-break: break-all;word-wrap: break-word;font-weight: normal'>" + F.title + "</h4>"
        }
        K += "<input type='hidden' name='ifMobile' value='" + F.ifBussnissObjectLock + "'/>";
        $(G).html(K);
        $(L).append(G)
    }
    return L
};
var keywords = ["2017年度考核", "2017年考核"];
mui(".mui-table-view").on("tap", ".mui-table-view-cell", function () {
    if ($(this).parents(".mui-active").attr("id") == "ds_div") {
        var D = $(this).find("h4").text();
        var E = false;
        for (var B in keywords) {
            if (D.indexOf(keywords[B]) > -1) {
                E = true
            }
        }
        if (E) {
            alert("请在pc端查看");
            return
        }
    }
    var A = $(this).find("input[name='ifMobile']").val();
    if (A && A == "false") {
        alert("请在pc端查看");
        return
    }
    var H = $(this).attr("id");
    var G = $(this).attr("data-urlText");
    var F = taskView(G);
    var C = H.split("_");
    setTimeout(function () {
        var I = G;
        if (G && G.indexOf("msgId=") < 0) {
            if (G.indexOf("?") >= 0) {
                G = G + "&msgId=" + C[0] + "&users=[]&isback=N&opCode=NA&tabIdx=" + C[1] + "&time=" + Math.random()
            } else {
                G = G + "?msgId=" + C[0] + "&users=[]&isback=N&opCode=NA&tabIdx=" + C[1] + "&time=" + Math.random()
            }
        } else {
            if (G.indexOf("?") >= 0) {
                G = G + "&time=" + Math.random()
            } else {
                G = G + "?time=" + Math.random()
            }
        } if (F) {
            G += "&_s=" + F
        }
        if (G && G.indexOf("UserId") > 0) {
            G = I
        }
        if (G && G.indexOf("http") == 0) {
            window.location.href = G
        } else {
            window.location.href = path + "/" + G
        }
    }, 1000)
});
(function (B) {
    var A = mui.os.ios ? 0.003 : 0.0009;
    B(".mui-scroll-wrapper").scroll({
        bounce: false,
        indicators: true,
        deceleration: A
    });
    B.ready(function () {
        B.each(document.querySelectorAll(".mui-slider-group .mui-scroll"), function (D, C) {
            B(C).pullToRefresh({
                down: {
                    callback: function () {
                        if (D == 0) {
                            startPosition1 = 0
                        } else {
                            if (D == 1) {
                                startPosition2 = 0
                            } else {
                                if (D == 2) {
                                    startPosition3 = 0
                                } else {
                                    if (D == 3) {
                                        startPosition4 = 0
                                    }
                                }
                            }
                        }
                        var E = this;
                        E.refresh(true);
                        setTimeout(function () {
                            if (D == 0) {
                                getToDoData(startPosition1, true, D);
                                queryAndShowToDoSum()
                            } else {
                                if (D == 1) {
                                    getToDoData(startPosition2, true, D);
                                    queryAndShowToDoSum()
                                } else {
                                    if (D == 2) {
                                        getToDoData(startPosition3, true, D)
                                    } else {
                                        if (D == 3) {
                                            getToDoData(startPosition4, true, D)
                                        }
                                    }
                                }
                            }
                            E.endPullDownToRefresh()
                        }, 1000)
                    }
                },
                up: {
                    callback: function () {
                        var E = this;
                        if (D == 0) {
                            startPosition1 += 25;
                            if (startPosition1 > count1) {
                                E.endPullUpToRefresh(true);
                                return
                            }
                        } else {
                            if (D == 1) {
                                startPosition2 += 25;
                                if (startPosition2 > count2) {
                                    E.endPullUpToRefresh(true);
                                    return
                                }
                            } else {
                                if (D == 2) {
                                    startPosition3 += 25;
                                    if (startPosition3 > count3) {
                                        E.endPullUpToRefresh(true);
                                        return
                                    }
                                } else {
                                    if (D == 3) {
                                        startPosition4 += 25;
                                        if (startPosition4 > count4) {
                                            E.endPullUpToRefresh(true);
                                            return
                                        }
                                    }
                                }
                            }
                        }
                        setTimeout(function () {
                            if (D == 0) {
                                getToDoData(startPosition1, false, D)
                            } else {
                                if (D == 1) {
                                    getToDoData(startPosition2, false, D)
                                } else {
                                    if (D == 2) {
                                        getToDoData(startPosition3, false, D)
                                    } else {
                                        if (D == 3) {
                                            getToDoData(startPosition4, false, D)
                                        }
                                    }
                                }
                            }
                            E.endPullUpToRefresh(false)
                        }, 1000)
                    }
                }
            })
        })
    })
})(mui);
document.addEventListener("WeixinJSBridgeReady", function onBridgeReady() {
    WeixinJSBridge.call("hideOptionMenu");
    WeixinJSBridge.call("hideToolbar")
});
document.getElementById("ds").addEventListener("tap", function () {
    getToDoData(0, true, 0);
    queryAndShowToDoSum()
});
document.getElementById("dy").addEventListener("tap", function () {
    getToDoData(0, true, 1);
    queryAndShowToDoSum()
});
document.getElementById("yb").addEventListener("tap", function () {
    getToDoData(0, true, 2)
});
document.getElementById("fq").addEventListener("tap", function () {
    getToDoData(0, true, 3)
});