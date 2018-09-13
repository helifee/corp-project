/**
 * Created by Administrator on 2017/12/16.
 */

(function(){
    var baseUrl = '/';
    var hostUrl = '/platform-app/';
    var MenuPage = function (){

    }
    MenuPage.prototype = {
        _ajax : function(cb,dataP,url){
            if(!dataP){
                dataP = '{"isMobileAllowed":"1"}';
            }
            if(!url){
                url = hostUrl+"sys/quick/entry/queryPortalList"+'?time='+Math.random();
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
        /**
         * 获取uuid
         * @returns {*}
         */
        initUUID:function () {
            var guuid;
            var url = hostUrl+'generator/getGuuid?time='+Math.random();
            $.ajax({
                type : 'get',
                async:false,
                url : url,
                success : function(data) {
                    guuid = data.result;
                }
            });
            return guuid;
          },
        MenuEvent:function(){
            $(".menu-wrap").find("li,.menu-fixed-item").on("click", function () {
                var menu = $(this).parents(".menu-wrap");
                menu.find(".current").removeClass("current");
                $(this).addClass("current");
            });
        },
        myIconEvent:function(){
            //点击打开事件
            var self = this;
            $("body").delegate("#item_list .item,#menu_list_data .icon-my-s2", "click", function(event){
                var id = self.initUUID();
                var name = $(this).find(".title").text();
                if(id){
                    window.open(hostUrl+"mobile/approve/flow/customFormFill.html?type=add&id="+id+"&customFormId=" + $(this).attr("data-id")+"&name="+name);
                }

            });
        }

    }
    window["menuPage"]= new MenuPage();

})()