$(function () {
    var type = $.xljUtils.getUrlParam("type");//编辑类型
    var setId = $.xljUtils.getUrlParam("setId");//指标集的id
    if (type == 'add') {
        $('title').text("指标项-新增");
        $(".xj-form-title").text("指标项-新增");
        //新增页面
        $("#saveUpdateBtn").click(function () {
            $("#sysInfoItemFrom").attr("data-validate-success", " window.saveInfo()");
            $("#sysInfoItemFrom").submit();
        });
        //初始化id
        // initUuid();
        $("#sysInfoItemFrom").find("input[name='setId']").val(setId);
    } else if (type == 'update') {
        $('title').text("指标项-修改");
        $(".xj-form-title").text("指标项-修改");
        //编辑
        $("#saveUpdateBtn").unbind('click').on('click', function () {
            $("#sysInfoItemFrom").attr("data-validate-success", " window.updateInfo()");
            $("#sysInfoItemFrom").submit();
        });
        //根据id加载数据
        itemId = $.xljUtils.getUrlParam("itemId");
        getSysInfoItemById(itemId);
    }

    //防止按钮刷新页面
    $('.btn').click(function (e) {
        e.preventDefault();
    });
    //清除input框内容
    $('#valueEmpty').click(function (e) {
        e.preventDefault();
        $(this).parents('.fullWidth').children('input').val('');
    });


});

function closeWindow() {
    window.parent.closePa();
    window.parent.location.reload();
}
/**
 * 新增-初始化主键ID
 */
function initUuid() {
    var uAll = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            var guuid = data.result;
            $("#sysInfoItemFrom").find("input[name='id']").val(guuid);

        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化主键ID请求失败");
        }
    })
}
/**
 *修改
 */
function getSysInfoItemById(itemId) {
    var uBody = "/sys/sysInfoItem/get/" + itemId + "?time=" + Math.random();
    var uAll = hostUrl + uBody;
    $.ajax({
        type: 'get',
        url: uAll,
        success: function (data) {
            $("#sysInfoItemFrom").find("input[name='id']").val(data.result.sid);
            $("#sysInfoItemFrom").find("input[name='setId']").val(data.result.setId);
            $("#sysInfoItemFrom").find("input[name='name']").val(data.result.name);
            $("#type").val(data.result.type);
            if ("7" == data.result.type) {
                $("#codeSetName").attr("style", "background: none");
                $("#zidingyi1").attr("style", "");
                $("#zidingyi2").attr("style", "display: none");
            } else {
                empty();
                $("#codeSetName").attr("style", "background: #acacac");
                $("#zidingyi1").attr("style", "display: none");
                $("#zidingyi2").attr("style", "");
            }
            var codeSetId=data.result.codeSetId;
            $("#sysInfoItemFrom").find("input[name='codeSetId']").val(codeSetId);
            var codeSetName=$.hrUtils.getHRCodeSetNameById(codeSetId);
            $("#sysInfoItemFrom").find("input[name='codeSetName']").val(codeSetName);
            $("#sysInfoItemFrom").find("input[name='itemLength']").val(data.result.itemLength);
            $("#sysInfoItemFrom").find("input[name='defaultValue']").val(data.result.defaultValue);
            $("#sysInfoItemFrom").find("input[name='max_value']").val(data.result.max_value);
            $("#sysInfoItemFrom").find("input[name='minValue']").val(data.result.minValue);
            $("#sysInfoItemFrom").find("input[name='sort']").val(data.result.sort);
            $("#editType").val(data.result.editType);
            $("#itemProperty").val(data.result.itemProperty);
            $("#remark").val(data.result.remark);
            // $("#sysInfoItemFrom").find("input[name='remark']").val(data.result.remark);

            if (data.result.isEmpty == "1") {
                $("input[name='isEmpty'][value='1']").attr("checked", true);
            } else {
                $("input[name='isEmpty'][value='0']").attr("checked", true);
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "初始化指标集请求失败");
        }
    })
}


window.saveInfo = function () {
    var sysInfoItemArr = $("#sysInfoItemFrom").serializeArray();
    var sysInfoItemDto = {};
    sysInfoItemDto.delflag = 0;
    for (var i in sysInfoItemArr) {
        if (sysInfoItemArr[i].name != "codeSetName") {
            sysInfoItemDto[sysInfoItemArr[i].name] = sysInfoItemArr[i].value;
        }
    }
    $.ajax({
        url: hostUrl + "/sys/sysInfoItem/save/",
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(sysInfoItemDto),
        success: function (xhr) {
            if (xhr) {
                if (xhr.success) {
                    closeWindow();
                } else {
                    if (xhr.code == "50000") {
                        $.xljUtils.tip("red", xhr.msg);
                        return;
                    }
                    $.xljUtils.tip("red", "保存失败！");
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
 * 修改-保存
 * @param n
 */
window.updateInfo = function () {
    var sysInfoItemArr = $("#sysInfoItemFrom").serializeArray();
    var sysInfoItemDto = {};
    var sysCodeItemID = $('#id').val();
    for (var i in sysInfoItemArr) {
        sysInfoItemDto[sysInfoItemArr[i].name] = sysInfoItemArr[i].value;
    }
    $.ajax({
        url: hostUrl + "/sys/sysInfoItem/update/" + sysCodeItemID,
        type: 'put',
        dataType: 'JSON',
        contentType: 'application/json',
        data: JSON.stringify(sysInfoItemDto),
        success: function (resultData) {
            if (resultData) {
                var successFlag = resultData.success;
                var msg = resultData.msg;
                if (successFlag) {
                    $.xljUtils.tip("green", "修改成功！");
                    closeWindow();
                } else {
                    pop_tip_open("red", "数据修改保存失败！" + msg);
                }
            }
        }, error: function (XMLHttpRequest, textStatus, errorThrown) {
            pop_tip_open("red", "数据修改保存请求失败");
        }

    });
}


/**
 * 清空组织机构上级
 */
function empty() {
    $("#sysInfoItemFrom").find("input[id='codeSetName']").val("");
    $("#sysInfoItemFrom").find("input[id='codeSetId']").val("");
}

$('#type').change(function () {
    var optVal = $(this).children('option:selected').val();
    if ("7" == optVal) {
        $("#codeSetName").attr("style", "background: none");
        $("#zidingyi1").attr("style", "");
        $("#zidingyi2").attr("style", "display: none");
    } else {
        empty();
        $("#codeSetName").attr("style", "background: #acacac");
        $("#zidingyi1").attr("style", "display: none");
        $("#zidingyi2").attr("style", "");
    }

});