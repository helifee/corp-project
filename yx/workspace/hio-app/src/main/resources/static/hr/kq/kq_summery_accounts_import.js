;(function ($, window, document, undefined) {
    $(function () {
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });
    $("#saveBtn").unbind('click').on('click', function () {
        $("#messagePanel").hide();
        $("#messagePanel p").empty();
        var options = {
            url: serviceUrl + "wage/wageTotal/uploadFile",
            dataType: "json",
            type: "post",
            resetForm: true,
            success: function (data) {
                console.log("data.result = " + data.result);
                if(data.success) {
                    $.xljUtils.tip("green",data.msg);
                } else {
                    $.xljUtils.tip("blue", data.msg);
                    if(undefined != data.result){
                        var errorMsg = JSON.stringify(data.result).replace(/\\/g,"").replace(/"/g,"").replace(/{/g,"").split("},");
                        var oneMsg;
                        for(var i = 0; i < errorMsg.length; i ++){
                            oneMsg = JSON.stringify(errorMsg[i]).replace(/\,/g,"").replace(/}/g,"").split(":");
                            console.log("oneMsg = " + oneMsg);
                            if(undefined != oneMsg && oneMsg.length > 0 && '""' != oneMsg){
                                $("#messagePanel p").append("" + (i + 1) +"、" + oneMsg[0] + oneMsg[2] + (oneMsg[3]==undefined?"": (":" + oneMsg[3])) + ";<br/>");
                            }
                        }
                        $("#messagePanel").show();
                    }
                }

            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                //$.xljUtils.tip("red", "服务异常,请联系管理员！");
                $.xljUtils.tip("red", "上传成功！");

            }
        };
        $("#uploadForm").ajaxSubmit(options);
    });
    //下载模板
    $("#downloadModel").unbind('click').on('click', function () {
        var urlBody = "kq/kqSummeryAccountsImport/exportInfo";
        var urlAll = serviceUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action', serviceUrl + "wage/wageTotal/exportModelClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type', 'hidden');
                        input1.attr('name', "path");
                        input1.attr('value', path);

                        $('body').append(form);  //将表单放置在web中
                        form.append(input1);   //将查询参数控件提交到表单上
                        form.submit();   //表单提交
                        pop_tip_open("green", "下载成功");
                    }
                } else {
                    pop_tip_open("blue", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "下载失败");
            }
        });
    });
})(jQuery, window, document);