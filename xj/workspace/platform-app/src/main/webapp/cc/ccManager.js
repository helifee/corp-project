/**
 * Created by admin on 2017/10/20.
 */
$(function () {
    //$('#uploadFile').xljAttachment({appId:'1',businessId:"ccmanage",categoryId:'1',mode:'add',singleUpload:true});
    $('#uploadFile').xljAttachment({appId:'1',businessId:"ccmanage",categoryId:'1',mode:'edit',singleUpload:true});
    $('#xpUploadFile').xljAttachment({appId:'1',businessId:"xpccmanage",categoryId:'1',mode:'edit',singleUpload:true});
    //保存程序包
    $('#saveBtn').on('click',function () {
        var defObjs = submitAttachments();
        $.when(defObjs.ccDef,defObjs.xpccDef).done(function () {
            $.ajax({
                type: "POST",
                url: hostUrl + "cc/ccManage/save",
                data: JSON.stringify({ccName:$('#ccName').val()}),
                dataType: "json",
                contentType: 'application/json',
                success: function (resultData) {
                    var successFlag = resultData.success;
                    if(successFlag) {
                        $.xljUtils.tip('green','数据保存成功！');
                    }

                }
            });
        });

    });

    function submitAttachments() {
        var defObjs = {};
        var def = new $.Deferred();
        $("#uploadFile").xljAttachmentSubmit(function(isSuccess,obj){
            if (isSuccess) {
                if (obj.success === true) {
                    $.xljUtils.tip('blue', '附件信息提交成功');
                }
                def.resolve(true);
            } else {
                $.xljUtils.getError(obj);
                def.resolve(false);
            }
        });
        defObjs.ccDef = def.promise();

        var def1 = new $.Deferred();
        $('#xpUploadFile').xljAttachmentSubmit(function(isSuccess,obj){
            if (isSuccess) {
                if (obj.success === true) {
                    $.xljUtils.tip('blue', '附件信息提交成功');
                }
                def1.resolve(true);
            } else {
                $.xljUtils.getError(obj);
                def1.resolve(false);
            }
        });
        defObjs.xpccDef = def1.promise();
        return defObjs;
    }
});