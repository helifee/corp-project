;(function ($,window,document,UE) {
    /**
     * author :luorongxin
     */
    $(function () {
        if($.inArray("editBtn_03", menuArray)>-1){
            $('#editBtn').show();
        }
        //初始化数据
        initData();
        //按钮事件
        bindButton();


    })

    /**
     * 绑定按钮事件
     */
function bindButton() {
         $('#editBtn').click(function(){
             $(".right-content").load("forumUser/forumUser_edit.html?t="+Math.random());
         });
    }

    /**
     *  获取论坛用户信息
      */
    function initData() {
        $.ajax({
            type: 'GET',
            url: serviceUrl + "oa/bbs/forumUser/get/currentUser?_t=" + new Date().getTime(),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        var obj = xhr.result;
                        //动态填充内容,获取table中的text属性
                        $("#contentForm :input[type='text']").each(function () {
                            if (obj[this.name] != "" && obj[this.name] != undefined) {
                                this.value = obj[this.name];
                            } else {
                                this.value = "";
                            }
                        });
                        //动态填充内容,获取table中的input属性
                        $("#contentForm :input[type='hidden']").each(function () {
                            if (obj[this.name] != "" && obj[this.name] != undefined) {
                                this.value = obj[this.name];
                            }
                        });
                        $('#divContent').html(obj['signatureLine']);
                    } else {
                        //异常处理
                        switch (xhr.code) {
                            case "50000":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            case "50002":
                                $.xljUtils.tip("red", xhr.msg);
                                break;
                            default:
                                $.xljUtils.tip("red", "服务异常,请联系管理员！");
                                break;
                        }
                    }

                } else {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.xljUtils.tip("red", "服务异常,请联系管理员！");
            }
        });
    }
})(jQuery,window,document)