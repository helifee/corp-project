/**
 * Created by admin on 2017/4/17.
 */

$(function () {
    if (typeof serviceUrl == 'undefined') {
        serviceUrl = '/platform-app/';
    }

    function initPageData() {
        $.ajax({
            contentType: "application/json;charset=utf-8;",
            type: 'POST',
            //async: false,
            url: serviceUrl + "oa/meeting/meeting/potalPage"+"?time="+Math.random(),
            dataType: "json",
            data: JSON.stringify({limit: 3, start: 0}),
            success: function (result) {
                console.info(result);
                result = result.result;
                $('#oaMettingSchedule').html('');
                if (result) {
                    result = result.list;;
                    for (var i in result) {
                        if (i > 2) {
                            break;
                        }
                        var newObj = result[i];
                        var id = newObj.id;//ID
                        var title = newObj.title;//标题
                        var status = newObj.status;
                       /* var publishTime = newObj.submittime;//发布时间
                        publishTime = publishTime ? publishTime.substring(0, publishTime.indexOf(' ')) : '';*/

                        var li = $('<li class="new"></li>');
                        if (i >= 2) {
                            li.removeClass('new');
                        }
                        var a = $('<a href=""></a>');
                        
                        if(status == 0){
            				a.attr('href', serviceUrl + "meeting/meeting/meeting_edit.html?act=update&id="+id+"&update="+true);
            			}else{
            				a.attr('href', serviceUrl + "meeting/meeting/meeting_view.html?act=view&id="+id+"&update="+false);
            			}
                        
                        a.attr('target', '_blank');
                        a.attr('title', title);
                        a.text(title);
                        li.append(a);
                       /* var span = $('<span ></span>');
                        span.text(publishTime);
                        li.append(span);*/
                        $('#oaMettingSchedule').append(li);


                    }

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.xljUtils.getError(jqXHR.status);
            }
        });
    }

    setTimeout(function () {
        initPageData();
    },500);
});



