;(function ($, window, document, undefined) {
    var token;
    $(function () {
        token = $.kqUtils.token;
        var orgIdList = $.xljUtils.getUrlParam("orgIdList");
        var nowKqStartDate = $.xljUtils.getUrlParam("startDate");
        var nowKqEndDate = $.xljUtils.getUrlParam("endDate");
        var name = decodeURI($.xljUtils.getUrlParam("name"));
        var kqRegular = $.xljUtils.getUrlParam("kqRegular");
        var kqResult = $.xljUtils.getUrlParam("kqResult");

        $("input[name='orgIdList']").val(orgIdList);
        $("input[name='nowKqStartDate']").val(nowKqStartDate);
        $("input[name='nowKqEndDate']").val(nowKqEndDate);
        $("input[name='name']").val(name);
        $("input[name='kqRegular']").val(kqRegular);
        $("input[name='kqResult']").val(kqResult);
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });
    /**
     * 保存导入信息
     */
    $("#saveBtn").unbind('click').on('click', function () {
        $("#messagePanel").hide();
        $("#messagePanel p").empty();
        /*$.xljUtils.customSingleValidate("#uploadForm");
        var validRet = $("#uploadForm").valid();
        if (!validRet) {
            return;
        }*/
        var file = $('#file')[0].files[0];
        var formdata = new FormData();
        formdata.append('resource', file);
        formdata.append('test', 123);

        var nowKqStartDate = $("input[name='nowKqStartDate']").val();
        var nowKqEndDate = $("input[name='nowKqEndDate']").val();

        if (file !== undefined) {
            $.ajax({
                url: hostUrl + "kq/hrKqSummary/uploadFile?startDate=" + nowKqStartDate + "&endDate=" + nowKqEndDate,
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

        /*var options = {
            url: hostUrl + "kq/hrKqSummary/uploadFile?startDate="+nowKqStartDate+"&endDate="+nowKqEndDate,
            dataType: "text",
            type: "POST",
            resetForm: true,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (dataText) {
                var data=JSON.parse(dataText);
                $.xljUtils.tip("green",data.msg);
                if(undefined != data.result){
                    console.log("data.result = " + data.result);
                    var errorMsg = JSON.stringify(data.result).replace(/\\/g,"").replace(/"/g,"").replace(/{/g,"").split("},");
                    var oneMsg;
                    for(var i = 0; i < errorMsg.length; i ++){
                        oneMsg = JSON.stringify(errorMsg[i]).replace(/\,/g,"").replace(/}/g,"").split(":");
                        console.log("oneMsg = " + oneMsg);
                        if(undefined != oneMsg && oneMsg.length > 0 && '""' != oneMsg){
                            $("#messagePanel p").append("" + (i + 1) +"、" + oneMsg[0] + oneMsg[2] + oneMsg[3] + ";<br/>");
                        }
                    }
                    $("#messagePanel").show();
                    window.opener.importRefresh();
                }
            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        };
        $("#uploadForm").ajaxSubmit(options);*/
    });

    //下载模板
    $("#downloadModel").unbind('click').on('click', function () {
        var orgIds = $("input[name='orgIdList']").val();
        var orgIdsList = [];
        if (orgIds !== undefined && orgIds != null && orgIds !== "") {
            orgIdsList = orgIds.split(",");
        }
        var nowKqStartDate = $("input[name='nowKqStartDate']").val();
        var nowKqEndDate = $("input[name='nowKqEndDate']").val();
        var name = $("input[name='name']").val();
        var kqRegulars = $("input[name='kqRegular']").val();
        var kqResults = $("input[name='kqResult']").val();

        var kqRegularList = [];
        if (kqRegulars !== undefined && kqRegulars != null && kqRegulars !== "" && kqRegulars !== "null") {
            kqRegularList = kqRegulars.split(",");
        }
        var kqResultList = [];
        if (kqResults !== undefined && kqResults != null && kqResults !== "" && kqResults !== "null") {
            kqResultList = kqResults.split(",");
        }
       /* var conditionMap = {
            "startDate": nowKqStartDate,
            "endDate": nowKqEndDate,
            "orgIdsList": orgIdsList,
            "name": name,
            "kqRegular": kqRegularList,
            "kqResult": kqResultList
        };
*/
        $('#startDate').val(nowKqStartDate);
        $('#endDate').val(nowKqEndDate);
        $('#orgIdsList').val(JSON.stringify(orgIdsList));
        $('#name').val(name);
        $('#kqRegular').val(JSON.stringify(kqRegularList));
        $('#kqResult').val(JSON.stringify(kqResultList));

        var urlBody = 'kq/hrKqSummary/exportTemplate?' + token;
        var urlAll = hostUrl + urlBody;

        var form = $('#exportParaForm');   //定义一个form表单
        form.attr('target', 'exportTarget');
        form.attr('action', urlAll);


        $('body').append(form);  //将表单放置在web中
        form.submit();   //表单提交
        pop_tip_open('blue', '导出成功');


        /*
                $.ajax({
                    type: 'POST',
                    url: urlAll,
                    dataType: 'json',
                    contentType: 'application/json',
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
                            pop_tip_open("blue", json.msg);
                        }
                    }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                        pop_tip_open("red", "下载失败");
                    }
                });
        */
    });
    $("#windowClose").unbind('click').on('click', function () {
        //window.history.go(-1);
        window.location.href = "kq_summary_accounts.html?status=01";
    })
})(jQuery, window, document);
