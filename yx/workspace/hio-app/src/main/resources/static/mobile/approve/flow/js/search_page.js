/**
 * Created by Administrator on 2017/12/12.
 */

(function(window,document){

    var searchPage = {
        baseUrl : '/',
        serviceUrl : '/platform-app/',
        /**
         * 绑定事件
         */
        bind_event:function() {//事件绑定
            $(".search-box input").on("keyup", function (e) {
                var val = $(this).val();
                //ajax请求
                if($.trim(val)){
                    clearTimeout($(this).data('timer'));
                    $(this).data('timer', setTimeout(function() {
                        var dataP = {name:val};
                        menuPage._ajax(function(data){
                            console.log(data);
                            searchPage.renderSearchList(data);
                        },dataP);
                    }, 1000));
                }
                $(".searchRecentBox").hide();
                $(".search_list").show();
            });
            //取消搜索
            $(".search-head .cancel").on("click", function (e) {
                $(".search-head input").val("");//设置位空
                //跳转---todo
                window.location.href="start_home.html";

            });

        },
        //获取搜索到的数据列表
        renderSearchList:function(data){
            var res = data.result;
            res.map(function(r) {
                var item = $(`<li>
                        <h2 class="icon-my icon-my-none">
                            <span class="title">${r.name}/<span id="childName"></span></span>
                        </h2>
                        <ul id="level2Ul">
                        </ul>
                        </li>`);
                item.data(item);
                r['children'].map(function(child) {
                    $(item).find("#childName").text(child.name);
                    child['children'].map(function(l) {
                        var li = $(`
                                <li>
                                <h2 class="icon-my icon-my-s2">
                                    <span class="title">${l.name}</span>
                                </h2>
                            </li>
                            `);
                        $(item).find("#level2Ul").append($(li));
                    });
                });
                $("#searchListData").append(item);
            });
        },
        //获取菜单信息
        getMenuFn:function(){
            menuPage._ajax(function(data){
                var $ul = $(".menu");
                $ul.empty();
                var all = $(`<li class="current">全部</li>`);
                $ul.append(all);
                var res = data.result;
                for(var i in res){
                    var item = $(`<li>${res[i].name}</li>`);
                    item.data(item);
                    $ul.append(item);
                }
                menuPage.event();
                menuPage._addStyle($ul);
            });
        },
        //获取最近搜索的记录
        getRecentData:function(){
            var dataP = {};
            var url = "";
            menuPage._ajax(function(data){
                //处理函数
                if(data.length<1){//搜索记录为空
                    $(".empty-box").show();
                    $(".searchRecentBox").hide();
                    return;
                }
                $("#recentBoxUl").empty();
                for(var i in data){
                    var item = $(`<li>
                        <h2 class="icon-my icon-my-s2">
                            <span class="title">${data[i].name}</span>
                        </h2>
                    </li>`);
                    $("#recentBoxUl").append(item);
                }
            },dataP,url);
        },
        /**
         * 页面初始化
         */
        pageInit:function(){
            this.getMenuFn();
            this.getRecentData();
            this.bind_event();
        }
    };
    searchPage.pageInit();
    window["searchPage"] = searchPage;

})(window,document);