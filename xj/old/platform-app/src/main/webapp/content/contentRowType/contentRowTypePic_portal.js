/**
 * Created by admin on 2017/4/14.
 */
$(function () {
    var container = $('#picNewsContainer').parents('.groupnews_container');
    if(container.length>0){
        $('#picNewsContainer').find('img').height(container.height());
        $('#picNewsContainer').find('img').width(container.width());
    }

});