/**
 * Created by dgh on 2017/4/24.
 */
$(function () {
    //$('#_contentTypeContainer');
    $.ajax({
        url: serviceUrl + 'oa/content/contentType/queryList',
        type: 'POST',
        contentType:'application/json',
        data:JSON.stringify({displayPortal:'Y'}),
        dataType: 'JSON',
        async:false,
        success: function (resultData) {
            if (resultData && resultData.success) {
                var datas = resultData.result;
                for (var i = 0; i < datas.length; i++) {
                    var contentTypeObj = datas[i];
                    var contentTypeId = contentTypeObj.id;
                    var contentTypeCode = contentTypeObj.code;

                    var ulObj = $('<ul class="news_list"></ul>');
                    //ulObj.attr('id',contentTypeCode);
                    //$('#_contentTypeContainer').append(ulObj);
                    $('#'+contentTypeCode).append(ulObj);

                }
            } else {
                $.xljUtils.tip('red', "删除数据失败！");
            }
        },
        error:function (xhr) {
            $.xljUtils.getError(xhr.status);
        }
    });
});