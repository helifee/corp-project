/**
 * lixd
 * 人事子集导入js
 */
;
(function ($, window, document, undefined) {

    //初始化页面
    $(function () {
        //初始化上传等待的样式
        initLoading();
        //防止按钮刷新页面
        $('.btn').click(function (e) {
            e.preventDefault();
        });
    });
    //返回人员列表
    $("#backEmpList").click(function () {
        var back = $.xljUtils.getUrlParam("back");
        if (back == "01") {//返回人员列表
            //status=01 载入查询条件
            window.location.href = "../org/org_list.html?status=01";
        } else {
            window.history.go(-1);
        }

    });
    //上传人事基本信息
    $("#saveBtn").unbind('click').on('click', function () {
        showLoading("处理中，请稍候");
        saveInfo();
    });
    //导出人事基本信息模板
    $("#exportModel").unbind('click').on('click', function () {
        exportModel();
    });

    /**
     * 上传人员基本信息子集
     */
    function saveInfo() {
        $("#messagePanel").hide();
        $("#messagePanel p").empty();
        var file = $('#uploadFile_JL')[0].files[0];
        var formdata = new FormData();
        formdata.append('resource', file);
        formdata.append('test', 123);
        if (file != undefined) {
            $.ajax({
                url: hostUrl + "emp/empPersonInfo/uploadFileUpdate",
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
                    if (data.success) {
                        $.xljUtils.tip("blue", data.message);
                        $("#messagePanel p").append(data.message);
                        $("#messagePanel").show();
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
                                $.xljUtils.tip("blue", "请根据提示信息完善excel在上传");
                            }
                        }else{
                            $("#messagePanel p").append(data.message);
                            $("#messagePanel").show();
                        }
                        $.xljUtils.tip("blue", data.message);
                    }
                    hideLoading();
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    hideLoading();
                }
            });
        }
    }

    /**
     * 人员基本信息子集
     * 导出excel文件
     */
    function exportModel() {
        // window.open("../modelDir/人员信息导入模板.xlsx","exportTarget");
        var token=window.parent.JZY.s.getAccessTokenByAuthorization();
        var urlBody = 'emp/empPersonInfo/exportTemplate?' + token;
        var urlAll = hostUrl + urlBody;

        // var form = $('#exportParaForm');   //定义一个form表单
        var form = $("<form>");   //定义一个form表单
        form.attr('target', 'exportTarget');
        form.attr('action', urlAll);
        form.attr('method', 'post');

        $('body').append(form);  //将表单放置在web中
        form.submit();   //表单提交
        pop_tip_open('blue', '导出成功');
    }


    window.codeSetCallBack = function (data) {
        var codeSetId = data.id;
        initSysCodeSelect(codeSetId);
    };
    // 初始化代码项选择
    window.initSysCodeSelect = function (codeSetId) {
        var treeParam = {};
        treeParam.code_set_id = codeSetId;
        $('#sysCode').hrxljSingleSelectorReset({
            title: '选择代码',//选择器标题，默认是'选择组织机构'
            // selectorPersonType: 'org',
            selectorType: 'hrSysCode',//选择器类型，默认是组织机构选择器
            immediatelyShow: false,//是否立即显示选择器，用于js调用判断,默认false,使用click触发
            gridTitle: '',//列表标题，默认是'组织列表'
            treeUrl: null,
            ajaxType: 'POST',	//ajax的type 默认为post
            treeParam: treeParam,//生成zTree树的参数
            targetId: null,//选择的数据的ID存储input域ID
            targetName: null,//选择的数据的Name存储input域ID
            targetPrefixId: null,//选择的数据的PrefixId存储input域ID
            targetPrefixName: null,//选择的数据的PrefixName存储input域ID
            targetCode: null,//选择数据的编码存储input域ID
            noSelectedDataTip: null,
            selectNodeType: {},//JSON格式,可选节点,其中msg为固定key，显示选择错误提示之用
            // 例：{
            //      msg:'请选择分期',
            //      type:'branch',//指定分期可选
            //      type:'dept',//指定部门可选
            //      type:'company',//指定公司可选
            //      type:'group',//指定项目可选
            //      type:'person',//指定人员可选
            //      type:'post',//指定岗位可选
            //      mold:'role'//指定角色可选
            // }
            /**
             * 保存回调函数
             * @param selectedData 已选择的数据json对象
             * @param ele 绑定选择器的对象
             */
            saveCallback: codeCallback,
            treeSettings: {}
        });

    };

    /**
     * 代码项回调
     */
    function codeCallback(data) {
        var codeItemId = data.id;
        $('#codeItemId').val();
        var codeItemName = data.name;
        $('#codeItemName').val(codeItemName);
    }

    function initLoading() {
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
    }

    function showLoading(text) {
        $("#loadingText").html(text);
        $("#loading").modal("show");
    }

    function hideLoading() {
        $("#loading").modal("hide");
    }
})(jQuery, window, document);