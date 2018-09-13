/**
 * Created by admin on 2017/4/17.
 */
/**
 * 初始化页面参数
 * 加载附件
 */
$(function () {
    /*if(typeof serviceUrl=='undefined'){
        serviceUrl = '/platform-app/';
    }*/

    function initPageData() {
        $.ajax({
            contentType: "application/json",
            type: 'POST',
            async: false,
            url: serviceUrl + 'oa/content/contentRowType/page',
            dataType: "json",
            data: JSON.stringify({publishState: "1",contentType:'BYLAW',limit:3,start:0}),
            success: function (result) {
                // console.info(result);
                result = result.result;
                $('#oaBylaw').html('');
                if (result) {
                    result = result.list;
                    for (var i in result) {
                        if(i>2){
                            break;
                        }
                        var newObj = result[i];
                        var id = newObj.id;//ID
                        var title = newObj.title;//标题
                        var publishTime = newObj.submittime;//发布时间
                        publishTime = publishTime?publishTime.substring(0,publishTime.indexOf(' ')):'';

                        var li = $('<li class="new"></li>');
                        if(i>=2){
                            li.removeClass('new');
                        }
                        var a = $('<a href=""></a>');
                        //a.attr('href',serviceUrl + 'content/contentRowType/contentRowType_view.html?id='+id);
                        a.attr('href',serviceUrl + 'content/contentRowType/contentRowType_edit.html?contentTypeId='+id+'&type=view');
                        a.attr('target','_blank');
                        a.attr('title',title);
                        a.text(title);
                        li.append(a);
                        var span = $('<span ></span>');
                        span.text(publishTime);
                        li.append(span);
                        $('#oaBylaw').append(li);


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



