/**
 * Created by xph on 2017/8/7.
 */
(function($, window, document, undefined){


    $(function () {
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
        $("#saveBtn").on('click', function () {
            saveInfo();
        });
        $("#downloadBtn").on('click', function () {
            downloadModel();
        });
        //初始化试题分类下拉框
        initTypeSelect();
    });

    /**
     * 初始化试题分类下拉框
     */
    function initTypeSelect(){
        $("#themeTypeSelect").empty();
        $.ajax({
            type: "POST",
            url:hostUrl+ "ojt/hrOjtThemeType/queryListByCondition",
            data: JSON.stringify({}),
            dataType: "JSON",
            contentType:"application/json",
            success: function(data){
                // pop_tip_open("blue","新增成功！");
                var result = data.result;
                if(result==null||result.length==0){
                    return;
                }
                for(var i =0;i<data.result.length;i++){
                    $("#themeTypeSelect").append("<option value="+result[i].id+">"+result[i].name+"</option>");
                }
            }
        });
    }


    function saveInfo(){
        $("#messagePanel").hide();
        $("#messagePanel p").empty();
        $("#uploadForm input[type='hidden']").remove();
        //将携带的信息附加到form表单中
        $("#uploadForm").append('<input type="hidden" name="themeTypeId" value="' + $("#themeTypeSelect").val() + '" />');
        var options = {
            url : hostUrl + "ojt/hrOjtExamTheme/importThemeInfos",
            dataType : "text/html",
            type : "post",
            resetForm: true,
            success : function(dataText){
                var data = JSON.parse(dataText);
                if (data != null && data.success){
                    $.xljUtils.tip("green",data.msg+","+JSON.parse(data.result).result);
                }else if(undefined != data.result){
                    $.xljUtils.tip("red",data.msg);
                    console.log("data.result = " + data.result);
                    for(var i = 0; i < data.result.length; i ++){
                        $("#messagePanel p").append("" + (i + 1) +"、" + data.result[i]  + ";<br/>");
                    }
                    $("#messagePanel").show();
                }else {
                    $.xljUtils.tip("red",data.msg);
                }
                if(window.opener.reloadThemeAndSelect!=undefined) {
                    window.opener.reloadThemeAndSelect();
                }
            },
            error: function(XmlHttpRequest, textStatus, errorThrown){
                $.xljUtils.tip("red","服务异常,请联系管理员！");
            }
        };
        $("#uploadForm").ajaxSubmit(options);
    }

    //下载模板
    function downloadModel(){
        var urlBody = "/zp/hrZpRequired/checkModelExists";
        var urlAll = hostUrl + urlBody;
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            data: {"filename":"themeImportModel.xlsx"},
            async : false,
            success: function (json) {
                if (json.success == true) {
                    var path = json.result;
                    if (undefined != path && "" != path) {//指定下载
                        var form = $("<form>");   //定义一个form表单
                        form.attr('style', 'display:none');   //在form表单中添加查询参数
                        form.attr('target', 'exportTarget');
                        form.attr('method', 'post');
                        form.attr('action',hostUrl + "/zp/hrZpRequired/exportModelClient");
                        //添加后台导出参数
                        var input1 = $('<input>');
                        input1.attr('type', 'hidden');
                        input1.attr('name', "path");
                        input1.attr('value', path);

                        $('body').append(form);  //将表单放置在web中
                        form.append(input1);   //将查询参数控件提交到表单上
                        form.submit();   //表单提交
                        pop_tip_open("", "下载成功");
                    }
                } else {
                    pop_tip_open("red", json.msg);
                }
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "该模板文件未找到，下载失败");
            }
        });
    }


})(jQuery, window, document);