;(function ($, window, document, undefined) {
    //定义全局参数
    var rowData;    //行数据
    var calculateId;//发薪期间ID
    var socialPayArea;
    var fundPayArea;
    var siPayArea;
    var nameOrMobile;
    var orgId;
    var socialPayAreaStr="";
    var queryDataPost = {};
    var calculateDateId;//当前期间
    var queryCalculateStatus = "";//entry: 在职,leave: 离职,all查询所有
    $(function () {
        //获取参数值
        calculateDateId= localStorage.getItem('calculateDateId');
        socialPayArea= localStorage.getItem('socialPayArea');
        fundPayArea= localStorage.getItem('fundPayArea');
        siPayArea=localStorage.getItem('siPayArea');
        nameOrMobile=localStorage.getItem('nameOrMobile');
        orgId=localStorage.getItem('orgId');
        queryCalculateStatus=localStorage.getItem('queryCalculateStatus');
        if(socialPayArea!=null && socialPayArea!='null' && socialPayArea.length>0){
            for(var i=0;i<socialPayArea.length;i++){
                if(socialPayAreaStr.length>0){
                    socialPayAreaStr+=',';
                }
                socialPayAreaStr+=socialPayArea[i];
            }
        }
        if (nameOrMobile == undefined || nameOrMobile == 'undefined' || nameOrMobile == null) {
            nameOrMobile = "";
        }

        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });

    //上传其他
    $("#saveBtn").unbind('click').on('click', function () {
        showLoading("处理中，请稍候");
        saveInfo();
    });

    window.showLoading = function (text) {
        $("#loadingText").html(text);
        $("#loading").modal("show");
    };

    window.initLoading = function () {
        $("body").append("<!-- loading -->" +
            "<div class='modal fade' id='loading' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-backdrop='static'>" +
            "<div class='modal-dialog' role='document'>" +
            "<div class='modal-content'>" +
            "<div class='modal-header'>" +
            "<h4 class='modal-title' id='myModalLabel'>提示</h4>" +
            "</div>" +
            "<div id='loadingText' class='modal-body'>" +
            "<span class='glyphicon glyphicon-refresh' aria-hidden='true'>1</span>" +
            "处理中，请稍候。。。" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
        );
    };


    window.saveInfo = function () {

        $("#messagePanel").hide();
        $("#messagePanel p").empty();
        var file = $('#uploadFile')[0].files[0];
        var formdata=new FormData();
        formdata.append('resource',file);
        formdata.append('test', 123);
        if (file != undefined) {
            $.ajax({
                url: hostUrl + "si/siCalculate/uploadFile",
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
                    var rr=JSON.parse(data.result);
                    if (rr.success) {
                        $.xljUtils.tip("blue", rr.message);
                    } else {
                        if (undefined != data.result && null != data.result) {
                            console.log("data.result = " + data.result);
                            var errorMsg = JSON.stringify(rr.result).replace(/\\/g, "").replace(/"/g, "").replace(/{/g, "").split("},");
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
                                setTimeout(function () {
                                    $.xljUtils.tip("blue", "请根据提示信息完善excel再上传");
                                }, 450);
                            }
                        } else {
                            setTimeout(function () {
                                $.xljUtils.tip("blue", rr.message);
                            },450);
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
    };

    window.hideLoading = function () {
        $("#loading").modal("hide");
    };

    window.goBack=function(){
        // window.history.go(-1);
        window.location.href="../si_file/si_file.html?queryFlag=01";
    };

    //下载模板
    $("#downloadModel").unbind('click').on('click', function () {


        var urlBody = "si/siCalculate/importInfo?"+window.parent.JZY.s.getAccessTokenByAuthorization();
        var urlAll = hostUrl + urlBody;
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', 'exportTarget');
        form.attr('method', 'post');
        form.attr('action', urlAll);
        //添加后台导出参数
        var input1 = $('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', "nameOrMobile");
        input1.attr('value', nameOrMobile);
        //添加后台导出参数
        var input2 = $('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', "calculateDateId");
        input2.attr('value', calculateDateId);
        //添加后台导出参数
        var input3 = $('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', "queryOrgIds");
        input3.attr('value', orgId);
        //添加后台导出参数
        var input4 = $('<input>');
        input4.attr('type', 'hidden');
        input4.attr('name', "siPayAreas");
        input4.attr('value', siPayArea);
        //添加后台导出参数
        var input5 = $('<input>');
        input5.attr('type', 'hidden');
        input5.attr('name', "fundPayAreas");
        input5.attr('value', fundPayArea);
        //添加后台导出参数
        var input6 = $('<input>');
        input6.attr('type', 'hidden');
        input6.attr('name', "socialPayAreas");
        input6.attr('value', socialPayAreaStr);
        var input7 = $('<input>');
        input7.attr('type', 'hidden');
        input7.attr('name', "queryCalculateStatus");
        input7.attr('value', queryCalculateStatus);
        $('body').append(form);  //将表单放置在web中
        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);   //将查询参数控件提交到表单上
        form.append(input3);   //将查询参数控件提交到表单上
        form.append(input4);   //将查询参数控件提交到表单上
        form.append(input5);   //将查询参数控件提交到表单上
        form.append(input6);   //将查询参数控件提交到表单上
        form.append(input7);   //将查询参数控件提交到表单上
        form.submit();   //表单提交
        pop_tip_open("", "模板导出成功");



        // var token = "49109848-ba00-46bd-931f-ba4572ba7e43";
        //
        // var urlBody = "si/siCalculate/importInfo";
        // var urlAll = hostUrl + urlBody;
        // $.ajax({
        //     type: 'POST',
        //     url: urlAll,
        //     dataType: 'json',
        //     contentType: 'application/json',
        //     async: false,
        //     data: JSON.stringify({nameOrMobile:nameOrMobile,calculateDateId:calculateDateId,queryOrgIds:orgId,siPayAreas:siPayArea,
        //         fundPayAreas:fundPayArea,socialPayAreas:socialPayAreaStr,importInfo:'yes'}),
        //     success: function (json) {
        //         if (json.success == true) {
        //             var path = json.result;
        //             if (undefined != path && "" != path) {
        //                 var form = $("<form>");   //定义一个form表单
        //                 form.attr('style', 'display:none');   //在form表单中添加查询参数
        //                 form.attr('target', 'exportTarget');
        //                 form.attr('method', 'post');
        //                 form.attr('action', hostUrl + "wage/wagePayHistory/exportInfoClient?access_token=" + token);
        //                 //添加后台导出参数
        //                 var input1 = $('<input>');
        //                 input1.attr('type', 'hidden');
        //                 input1.attr('name', "path");
        //                 input1.attr('value', path);
        //
        //                 $('body').append(form);  //将表单放置在web中
        //                 form.append(input1);   //将查询参数控件提交到表单上
        //                 form.submit();   //表单提交
        //                 document.querySelector('iframe').contentWindow.parent.JZY.u.successMsg('下载成功');
        //                 // pop_tip_open("green", "下载成功");
        //             }
        //         } else {
        //             pop_tip_open("blue", json.message);
        //         }
        //     }, error: function (XMLHttpRequest, textStatus, errorThrown) {
        //         document.querySelector('iframe').contentWindow.parent.JZY.u.errorMsg('下载失败！');
        //         // pop_tip_open("red", "下载失败");
        //     }
        // });
    });
})(jQuery, window, document);