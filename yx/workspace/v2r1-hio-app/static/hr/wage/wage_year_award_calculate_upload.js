;(function ($, window, document, undefined) {
    //定义全局参数
    var rowData;    //行数据
    var orgId;//列表页查询条件
    var nameOrCodeByCal;


    //返回上一级
    window.msgClosePage = function (){
        localStorage.removeItem('nameOrCodeByCal');
        localStorage.removeItem('orgId');
        window.location.href="wage_year_award_calculate.html?queryFlag=01";
    };

    $(function () {

        //列表页查询条件
        $('#orgId').val(localStorage.getItem('orgId'));
        $('#nameOrCodeByCal').val(localStorage.getItem('nameOrCodeByCal'));
        nameOrCodeByCal=$('#nameOrCodeByCal').val();
        orgId=$('#orgId').val();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });

    //上传
    $("#saveBtn").click(function (e) {
        $("#messagePanel").hide();
        $("#messagePanel p").empty();
        var file = $('#uploadFile')[0].files[0];

        var formdata = new FormData();
        formdata.append('resource', file);
        formdata.append('test', 123);
        if (file != undefined) {
            $.ajax({
                url: hostUrl + "wage/wageAnnualBonus/uploadFile",
                type: 'post',
                dataType: 'json',
                async: false,
                data: formdata,
                contentType: false,    //不可缺
                processData: false,    //不可缺
                beforeSend: function (xhr) {//成员变量覆盖局部变量
                    //上传文件不需要指定Content-Type，由浏览器指定
                    xhr.setRequestHeader('Authorization', window.parent.JZY.c.AUTO_LOGIN.headers.authorization);
                },
                success: function (data) {
                    // var data = JSON.parse(dataText);
                    if (data.success) {
                        $.xljUtils.tip("blue", "上传成功");
                    } else {
                        if (undefined != data.result && null != data.result) {
                            console.log("data.result = " + data.result);
                            var errorMsg = JSON.stringify(data.result).replace(/\\/g, "").replace(/"/g, "").replace(/{/g, "").split("},");
                            var oneMsg;
                            for (var i = 0; i < errorMsg.length; i++) {
                                oneMsg = JSON.stringify(errorMsg[i]).replace(/\,/g, "").replace(/}/g, "").split(":");
                                console.log("oneMsg = " + oneMsg);
                                if (undefined != oneMsg && oneMsg.length > 0 && '""' != oneMsg) {
                                    $("#messagePanel p").append("" + (i + 1) + "、" + oneMsg[0] + oneMsg[2] + $.hrUtils.filterNull(oneMsg[3]) + ";<br/>");
                                }
                            }
                            $("#messagePanel").show();
                            if ($("#messagePanel p").val() != null) {
                                $.xljUtils.tip("blue", "请根据提示信息完善excel再上传");
                            }
                        }
                        $.xljUtils.tip("green", data.message);
                    }
                    hideLoading();
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    hideLoading();
                }
            });
        } else {
            $.xljUtils.tip("blue", "请选择上传文件！");
        }
    });

    window.hideLoading = function () {
        $("#loading").modal("hide");
    };

    $("#downloadModel").click(function (e) {
        e.preventDefault();

        var urlBody = "wage/wageAnnualBonus/importInfo?"+window.parent.JZY.s.getAccessTokenByAuthorization();
        var urlAll = hostUrl + urlBody;
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', "nameOrCodeByCal");
        input1.attr('value', nameOrCodeByCal);
        //添加后台导出参数
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', "queryOrgIds");
        input2.attr('value', orgId);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "模板导出成功");

    });

})(jQuery, window, document);