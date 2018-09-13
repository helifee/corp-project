/**
 * 初始化页面参数
 * 加载附件
 */
$(function () {

    function initPageData() {
        $.ajax({
            contentType: "application/json",
            type: 'POST',
            async: false,
            url: baseUrl + 'oa/content/contentRowType/page',
            dataType: "json",
            data: JSON.stringify({publishState: "1",contentTypeId:'',contentType:'GROUP_NOTICE',limit:8,start:0}),
            success: function (result) {
                console.info(result);
                var result = result.result;
                $('#oaGroupNews').html('');
                if (result) {
                    for (var i in result) {
                        if(i>7){
                            break;
                        }
                        var newObj = result[i];
                        var id = newObj.id;//ID
                        var title = newObj.title;//标题
                        var publishTime = newObj.submittime;//发布时间
                        publishTime = publishTime.substring(0,publishTime.indexOf(' '));

                        var li = $('<li class="new"></li>');
                        if(i>=2){
                            li.removeClass('new');
                        }
                        var a = $('<a href=""></a>');
                        a.attr('href',baseUrl + 'content/contentRowType/contentRowType_view.html?id='+id);
                        a.attr('target','_blank');
                        a.attr('title',title);
                        a.text(title);
                        li.append(a);
                        var span = $('<span ></span>');
                        span.text(publishTime);
                        li.append(span);
                        $('#oaGroupNews').append(li);


                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });
    }

    initPageData();

});



