/**
 * Created by admin on 2017/10/21.
 */
$(function () {
    $('#excInitAttachBtn').on('click',function () {
        $.ajax({
            type: 'POST',
            url: serviceUrl + 'univ/attachment/batchProcessAttach/excProcessAttach',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({delflag:false}),
            success: function (json) {
                if(json.success){
                    $.xljUtils.tip('blue','附件初始化执行完毕！');
                }
            }
        });
    });
});