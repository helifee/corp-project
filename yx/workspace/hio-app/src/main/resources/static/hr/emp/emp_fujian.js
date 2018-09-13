/**
 * 附件操作js
 */
;(function ($, window, document, undefined) {

    String.prototype.endWith=function(endStr){
        var d=this.length-endStr.length;
        return (d>=0&&this.lastIndexOf(endStr)==d)
    }

    //上来就执行
    $(function () {

        initPage();

        //关闭当前页面
        $("#closeBtn").unbind('click').on('click',function () {
            window.close();
        });

    });

    //todo 初始化页面
    function initPage(){
        //获取url参数
        var oper=$.xljUtils.getUrlParam("oper");//操作类型
        if(oper=="add"){
            $('title').text("新增附件");
            $(".xj-form-title").text("新增附件");
            initUpload();
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#attachFrom").attr("data-validate-success", "window.submitAddForm()");
                $("#attachFrom").submit();
            });
        }
        else if(oper=="edit"){
            $('title').text("修改附件");
            $(".xj-form-title").text("修改附件");
            editAttenment(id);
            //保存窗口
            $("#saveBtn").unbind('click').on('click',function () {
                //表单提交
                $("#attachFrom").attr("data-validate-success", "window.submitEditForm()");
                $("#attachFrom").submit();
            });
        }



    }

    //todo 初始化上传插件
    function initUpload() {
        var uAll = serviceUrl+"sys/uuid/generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var guuid = data.result;
                $("#attachFrom").find("input[name='id']").val(guuid);
                var attachId = guuid;
                $('.attachment-container').xljAttachment({
                    appId: "HR",
                    businessId: attachId,
                    categoryId: ATTACH_TYPE_PERSON,
                    mode: "add",
                    singleUpload:true,
                    autoSubmit: false,
                    fromTempTable: false,
                    serverAddr: ATTACH_SERVERADDR
                });
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    }

    //todo 保存附件
    window.submitAddForm = function(){
        //todo 初始化主键
        var uAll = serviceUrl+"sys/uuid/generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: uAll,
            success: function (data) {
                var uuid = data.result; //获取UUID成功后提交表单
                var formElements = $("#attachFrom").serializeArray();
                var hrEmpAttachmentDto = {};
                for(var i in formElements){
                    if(formElements[i].name.endWith("_name")){
                        continue;
                    }
                    hrEmpAttachmentDto[formElements[i].name]=formElements[i].value;
                }
                var personId=$.xljUtils.getUrlParam("id");//获取人员ID
                hrEmpAttachmentDto.delflag=false;//有效标志位
                hrEmpAttachmentDto.personId=personId;//关联人员Id
                hrEmpAttachmentDto.kinds = '1099100180';//附件类型
                hrEmpAttachmentDto.id=uuid;//主键
                $.ajax({
                    type: 'POST',
                    url: serviceUrl + "/emp/hrEmpAttachment/save/",
                    data: JSON.stringify(hrEmpAttachmentDto),
                    dataType: "json",
                    contentType: "application/json;charset=utf-8",
                    success: function (xhr, textStatus) {
                        console.log(xhr);
                        if (xhr) {
                            if (xhr.success) {
                                $.xljUtils.tip("green", "新增成功！");
                                //提交
                                $('.attachment-container').xljAttachmentSubmit();
                            } else {
                                if (xhr.code == "50000") {
                                    $.xljUtils.tip("red", xhr.msg);
                                    return;
                                }
                                $.xljUtils.tip("red", "保存失败！");
                            }
                        } else {
                            $.xljUtils.tip("red", "服务异常,请联系管理员！");
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        console.log(xhr);
                        $.xljUtils.tip("red", "服务异常,请联系管理员！");
                    }
                });
            }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                pop_tip_open("red", "初始化主键ID请求失败");
            }
        })
    };

    //todo 修改附件
    window.submitEditForm = function(){


    }


   //todo 清空代码项
    window.emptyInfo=function (id,hiddenId){
        $("#"+id).val("");
        $("#"+hiddenId).val("");
    }

})(jQuery, window, document);