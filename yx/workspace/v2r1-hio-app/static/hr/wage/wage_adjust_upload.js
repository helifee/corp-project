;(function ($, window, document, undefined) {
    //定义全局参数
    var rowData;    //行数据
    var orgId;//列表页查询条件
    var nameOrCodeByCal;
    /**
     * 为空指的就是默认查询所有
     * entry: 新入职
     * leave: 离职
     * noAdjust: 未定薪
     * adjust: 定薪
     */
    var queryCalculateStatus = "";

    //返回上一级
    window.msgClosePage = function (){
        localStorage.removeItem('nameOrCodeByCal');
        localStorage.removeItem('orgId');
        // window.history.go(-1);
        window.location.href="wage_salary_calculate.html?queryFlag=01";
    };

    $(function () {
        //列表页查询条件
        $('#orgId').val(localStorage.getItem('orgId'));
        $('#nameOrCodeByCal').val(localStorage.getItem('nameOrCodeByCal'));
        nameOrCodeByCal=$('#nameOrCodeByCal').val();
        orgId=$('#orgId').val();
        queryCalculateStatus=localStorage.getItem('queryCalculateStatus');
         //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });

    //上传
    $("#saveBtn").unbind('click').on('click', function () {
        $("#messagePanel").hide();
        $("#messagePanel p").empty();
        var file = $('#uploadFile')[0].files[0];
        var formdata=new FormData();
        formdata.append('resource',file);
        formdata.append('test', 123);
        if (file != undefined) {
            $.ajax({
                url: hostUrl + "wage/wageAdjustInfo/uploadAdjustCalculate",
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
                    if(data!=null&&data!=undefined) {
                        if (data.status==200) {
                            $.xljUtils.tip("blue","导入成功");
                        } else {
                            if (undefined != data.result && null != data.result) {
                                console.log("data.result = " + data.result);
                                var errorMsg = JSON.stringify(data.result).replace(/\\/g, "").replace(/"/g, "").replace(/{/g, "").split("},");
                                var oneMsg;
                                for (var i = 0; i < errorMsg.length; i++) {
                                    oneMsg = JSON.stringify(errorMsg[i]).replace(/\,/g, "").replace(/}/g, "").split(":");
                                    console.log("oneMsg = " + oneMsg);
                                    if (undefined != oneMsg && oneMsg.length > 0 && '""' != oneMsg) {
                                        $("#messagePanel p").append("" + (i + 1) + "、" + oneMsg + ";<br/>");
                                    }
                                }
                                $("#messagePanel").show();
                                if ($("#messagePanel p").val() != null) {
                                    $.xljUtils.tip("blue", "请根据提示信息完善excel再上传");
                                }
                            }
                            $.xljUtils.tip("blue", data.message);
                        }

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


    //下载模板
    $("#downloadModel").click(function (e) {
        e.preventDefault();
        var urlBody = "wage/wageAdjustInfo/exportAdjustCalculate?"+window.parent.JZY.s.getAccessTokenByAuthorization();
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
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "queryCalculateStatus");
        input3.attr('value', queryCalculateStatus);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "模板导出成功");
    });

    // $("#downloadModel").unbind('click').on('click', function () {
    //
    //     var token = "49109848-ba00-46bd-931f-ba4572ba7e43";
    //
    //     var urlBody = "wage/wageAdjustInfo/exportAdjustCalculate";
    //     var urlAll = hostUrl + urlBody;
    //     $.ajax({
    //         type: 'POST',
    //         url: urlAll,
    //         dataType: 'json',
    //         contentType: 'application/json',
    //         async: false,
    //         data: JSON.stringify({nameOrCodeByCal:nameOrCodeByCal,queryOrgIds:orgId}),
    //         success: function (json) {
    //             if (json.success == true) {
    //                 var path = json.result;
    //                 if (undefined != path && "" != path) {
    //                     var form = $("<form>");   //定义一个form表单
    //                     form.attr('style', 'display:none');   //在form表单中添加查询参数
    //                     form.attr('target', 'exportTarget');
    //                     form.attr('method', 'post');
    //                     form.attr('action', hostUrl + "wage/wageAdjustInfo/exportInfoClient?access_token=" + token);
    //                     //添加后台导出参数
    //                     var input1 = $('<input>');
    //                     input1.attr('type', 'hidden');
    //                     input1.attr('name', "path");
    //                     input1.attr('value', path);
    //
    //                     $('body').append(form);  //将表单放置在web中
    //                     form.append(input1);   //将查询参数控件提交到表单上
    //                     form.submit();   //表单提交
    //                     pop_tip_open("green", "下载成功");
    //                 }
    //             } else {
    //                 pop_tip_open("blue", json.message);
    //             }
    //
    //         }, error: function (XMLHttpRequest, textStatus, errorThrown) {
    //             pop_tip_open("red", "下载失败");
    //         }
    //     });
    // });

})(jQuery, window, document);