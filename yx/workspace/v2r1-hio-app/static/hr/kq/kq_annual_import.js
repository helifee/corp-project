var token;
;(function ($, window, document, undefined) {
    var name = "";
    var year = "";
    var orgId = "";
    $(function () {
        token = $.kqUtils.token;
        orgId = $.xljUtils.getUrlParam("orgId");
        name = decodeURI($.xljUtils.getUrlParam("name"));
        year = $.xljUtils.getUrlParam("year");
    });

    //年假信息上传
    $("#saveBtn").unbind('click').on('click', function () {
        $("#messagePanel").hide();
        $("#messagePanel p").empty();
        // $.xljUtils.customSingleValidate("#uploadForm");
        // var validRet = $("#uploadForm").valid();
        // if (!validRet) {
        //     return;
        // }

        var file = $('#file')[0].files[0];
        var formdata = new FormData();
        formdata.append('resource', file);
        formdata.append('test', 123);
        if (file !== undefined) {
            $.ajax({
                url: hostUrl + "kq/hrKqAnnual/uploadFile",
                type: 'post',
                dataType: 'json',
                async: false,
                data: formdata,
                // resetForm: true,
                cache: false,//上传文件无需缓存
                processData: false,//用于对data参数进行序列化处理 这里必须false
                contentType: false, //必须
                beforeSend: function (xhr) {//成员变量覆盖局部变量
                    //上传文件不需要指定Content-Type，由浏览器指定
                    xhr.setRequestHeader('Authorization', window.parent.JZY.c.AUTO_LOGIN.headers.authorization);
                },
                success: function (dataText) {
                    var data = dataText;
                    if (data.success) {
                        $.xljUtils.tip('blue', data.message);
                    } else {
                        if (undefined !== data.result && null !== data.result) {
                            console.log('data.result = ' + data.result);
                            var errorMsg = JSON.stringify(data.result).replace(/\\/g, '').replace(/"/g, '').replace(/{/g, '').split('},');
                            var oneMsg;
                            for (var i = 0; i < errorMsg.length; i++) {
                                oneMsg = JSON.stringify(errorMsg[i]).replace(/\,/g, '').replace(/}/g, '').split(':');
                                console.log('oneMsg = ' + oneMsg);
                                if (undefined !== oneMsg && oneMsg.length > 0 && '""' !== oneMsg) {
                                    $("#messagePanel p").append('' + (i + 1) + '、' + oneMsg[0] + oneMsg[2] + $.hrUtils.filterNull(oneMsg[3]) + ';<br/>');
                                }
                            }
                            $('#messagePanel').show();
                            if ($('#messagePanel p').val() !== null) {
                                $.xljUtils.tip('blue', '请根据提示信息完善excel在上传');
                            }
                        }
                        $.xljUtils.tip('blue', data.message);
                    }
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            });
        } else {
            pop_tip_open('red', '请选择要上传的文件！');
        }

        /* var options = {
             url: hostUrl + "kq/hrKqAnnual/uploadFile?access_token=" + token,
             dataType: "text",
             type: "POST",
             resetForm: true,
             async: false,
             cache: false,
             contentType: false,
             processData: false,
             //data: JSON.stringify({accountId: accountId,calculateId:calculateId}),
             success: function (dataText) {
                 var data = JSON.parse(dataText);
                 if (data.success) {
                     $.xljUtils.tip('blue', data.message);
                 } else {
                     if (undefined !== data.result && null !== data.result) {
                         console.log('data.result = ' + data.result);
                         var errorMsg = JSON.stringify(data.result).replace(/\\/g, '').replace(/"/g, '').replace(/{/g, '').split('},');
                         var oneMsg;
                         for (var i = 0; i < errorMsg.length; i++) {
                             oneMsg = JSON.stringify(errorMsg[i]).replace(/\,/g, '').replace(/}/g, '').split(':');
                             console.log('oneMsg = ' + oneMsg);
                             if (undefined !== oneMsg && oneMsg.length > 0 && '""' !== oneMsg) {
                                 $("#messagePanel p").append('' + (i + 1) + '、' + oneMsg[0] + oneMsg[2] + $.hrUtils.filterNull(oneMsg[3]) + ';<br/>');
                             }
                         }
                         $('#messagePanel').show();
                         if ($('#messagePanel p').val() !== null) {
                             $.xljUtils.tip('blue', '请根据提示信息完善excel在上传');
                         }
                     }
                     $.xljUtils.tip('blue', data.message);
                 }
             },
             error: function (XmlHttpRequest, textStatus, errorThrown) {
                 $.xljUtils.tip("red", "服务异常,请联系管理员！");
             }
         };
         $("#uploadForm").ajaxSubmit(options);*/
    });


    //关闭
    $("#closeWindow").click(function () {
        //window.close();
        //window.history.go(-1);
        window.location.href = "kq_annual_list.html?status=01";
    });


    //下载模板
    $('#downloadTemplate').unbind('click').on('click', function () {
        /* var conditionMap = {
             "name": name,
             "annualYear": year,
             "orgId": orgId
         };*/
        var urlBody = 'kq/hrKqAnnual/exportTemplate?' + token;
        var urlAll = hostUrl + urlBody;

        var form = $('<form>');   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'name');
        input1.attr('value', name);

        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', 'annualYear');
        input2.attr('value', year);

        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', 'orgId');
        input3.attr('value', orgId);


        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open('blue', '导出成功');
        /*
                $.ajax({
                    type: 'POST',
                    url: urlAll,
                    dataType: 'json',
                    contentType: 'application/json',
                    // data: JSON.stringify(rowData),
                    data: JSON.stringify(conditionMap),
                    async: false,
                    success: function (json) {
                        if (json.success == true) {
                            var path = json.result;
                            if (undefined != path && "" != path) {
                                var form = $("<form>");   //定义一个form表单
                                form.attr('style', 'display:none');   //在form表单中添加查询参数
                                form.attr('target', 'exportTarget');
                                form.attr('method', 'post');
                                form.attr('action', hostUrl + "/kq/hrKqRest/exportInfoClient?" + token);
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
                            pop_tip_open("red", json.message);
                        }
                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        pop_tip_open("red", "导出失败");
                    }
                });
        */
    });

})(jQuery, window, document);



