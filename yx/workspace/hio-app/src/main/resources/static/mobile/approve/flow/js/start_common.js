/**
 * Created by Administrator on 2017/11/22.
 */

(function(){
    var MenuPage = function (){

    }
    MenuPage.prototype = {
        _ajax : function(cb,dataP,url){
            if(!dataP){
                dataP = '{}';
            }
            if(!url){
                url = serviceUrl+"oa/quick/entry/queryPortalList"+'?time='+Math.random();
            }
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(dataP),
                success: function(resultData) {
                    if (resultData && resultData.success) {
                        console.log(resultData)
                        cb && cb (resultData)
                    }else {

                    }

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        },
        _addStyle : function(bd){
            var $li = bd.find("li");
            var sum = 0;
            var $parent = bd.parent(),
                pW = $parent.width();
            if($li.length){
                for(var i = 0; i<$li.length; i ++){
                    var $temp = $($li[i]);
                    sum = $temp.outerWidth() + sum + 5;
                }
                if(sum <= pW){
                    sum = pW;
                }
                bd.css({width: sum});
            }
        },
        event:function(){
            //折叠展开
            $(".icon-my").on("click", function () {
                $(this).find(".arrow-box").toggleClass("down");
                $(this).next().toggle();
            });
            $(".menu-wrap").find("li,.menu-fixed-item").on("click", function () {
                var menu = $(this).parents(".menu-wrap");
                menu.find(".current").removeClass("current");
                $(this).addClass("current");
            });
            //点击打开事件
            $("#menu_list_data").find(".icon-my-s2").on("click", function () {
                window.open(startHome.hostUrl + "/sysManager/customFormInstance/customFormInstance_list.html?id=" + $(this).attr("data-id"));
            });
        }

    }
    window["menuPage"]= new MenuPage();

})()