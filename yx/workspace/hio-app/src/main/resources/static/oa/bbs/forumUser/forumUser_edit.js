;(function ($,window,document,UE) {
    /**
     * author :luorongxin
     */

    $(function () {
        //初始化数据
        initData();
        //按钮事件
        bindButton();

    })

    /**
     * 绑定按钮事件
     */
function bindButton() {
        $('#cancelBtn').click(function(){
            $(".right-content").load("forumUser/forumUser_view.html?t="+Math.random());
        });
        $('#saveBtn').click(function () {
                saveUser();
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

                        var signatureLine = obj['signatureLine'];

                        //实例化编辑器
                        editor =  new UE.ui.Editor( {

                            autoHeightEnabled: true,

                            autoFloatEnabled: true,

                            initialFrameWidth: 'auto',

                            initialFrameHeight:'auto',

                            scaleEnabled:true

                        });
                        editor.render("editor");
                        UE.getEditor('editor').ready(function() {
                            //this是当前创建的编辑器实例
                            this.setContent(obj['signatureLine'])});

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

    /**
     * 保存用户
     */
    function saveUser() {
        var postData = {};
        postData.id = $('#id').val();
        postData.nickName = $('#nickName').val();
        postData.signatureLine = editor.getContent();
        $.ajax({
            type: 'PUT',
            url: serviceUrl + "oa/bbs/forumUser/update/"+$('#id').val(),
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify(postData),
            success: function (xhr, textStatus) {
                if (xhr) {
                    if (xhr.success) {
                        $.xljUtils.tip("green", "修改成功！");
                        $(".right-content").load("forumUser/forumUser_view.html?t="+Math.random());
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
})(jQuery,window,document,UE)