/**
 * Created by admin on 2017/4/17.
 */
$(function () {
    /*if(!hostUrl){
        hostUrl = '/platform-app/';
    }*/

    var container = $('#picNewsContainer').parents('.groupnews_container');
    if(container.length>0){
        $('#picNewsContainer').find('img').height(container.height());
        $('#picNewsContainer').find('img').width(container.width());
    }

});



