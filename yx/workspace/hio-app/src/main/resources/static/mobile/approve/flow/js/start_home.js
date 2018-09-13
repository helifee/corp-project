/**
 * Created by Administrator on 2017/11/22.
 */

(function(window,document){


    var startHome = {
        baseUrl : '/',
        hostUrl : '/platform-app/',
        serviceUrl : 'http://192.168.3.52:9999/platform-app/',
        search:window.location.search,
        _render: function(){
            var $ul = $(".menu-wrap").find("ul");
            var $menu_data = $("#menu_list_data");//菜单展示列表
            var $add_con = $("#add-page");//添加页面列表
            $ul.empty();
            $menu_data.empty();
            $add_con.empty();
            menuPage._ajax(function(data){
                var res = data.result;
                res.map(function(r) {
                    var item = $(`<li>${r.name}</li>`);
                    item.data(item);
                    $ul.append(item);
                    var child_item = $(`
                         <div class="cont-tab-box">
                            <div class="list-sort-show">
                                <ul class="list-sort-ul">

                                </ul>
                            </div>
                         </div>
                        `);
                    r['children'].map(function(child) {
                        var li_item = $(`
                            <li>
                                <h2 class="icon-my icon-my-s1" data-id=${child.id}>
                                    <span class="arrow-box right"></span>
                                    <span class="title">${child.name}</span>
                                </h2>
                                <ul class="hide">

                                </ul>
                            </li>
                        `);
                        child['children'].map(function(item) {
                            var li = $(`
                                 <li>
                                     <h2 class="icon-my icon-my-s2" data-id=${item.id}>
                                        <span class="selected-border" style="display: none"></span>
                                        <span class="title">${item.name}</span>
                                    </h2>
                                 </li>
                            `);
                            $(li_item).find("ul").append($(li));
                        });
                        $(child_item).find("ul").append($(li_item));
                    });
                    $menu_data.append(child_item);
                    $add_con.html($menu_data.html());
                    $add_con.find(".selected-border").show();
                });
                var $bottom = $(`
                    <div class="bottom-sum-box">
                        已选择(<span id="num">2</span>/7)
                        <button class="sure">确认</button>
                    </div>
                `);
                $add_con.append($bottom);
                menuPage._addStyle($ul);
                menuPage.event();
                startHome.event();
            })

        },
        event : function() {
            var menuHtml = $(".menu-wrap");
            //菜单事件
            menuHtml.find("li,.menu-fixed-item").on("click", function () {
                var menu = $(this).parents(".menu-wrap");
                var target_box = $(menu).attr("data-target-box");
                if ($(this).hasClass("fixed")) {
                    $(".cont-box").show();
                    $(target_box).hide();
                    return;
                }
                $(".cont-box").hide();
                $(target_box).show();
                $(target_box).children(".cont-tab-box").hide();
                $(target_box).children(".cont-tab-box").eq($(this).index()).show();
            });


            //关闭弹框
            $(".pop-bottom-btn-box").on("click", function (e) {
                $(".pop-wrap-modal").hide();
            });
            //添加后 确认
            $(".bottom-sum-box .sure").on("click", function (e) {

            });
            //选择事件
            $("#add-page").find(".icon-my-s2").on("click", function (e) {
                $(this).find(".selected-border").toggleClass("selected");
                var num = $(".selected-border.selected").length;
                $(".bottom-sum-box #num").text(num);
                if (parseInt(num) > 7) {
                    $(".pop-wrap-modal").show();
                }
                e.stopPropagation();
            });
        },
            /**
         * 绑定事件
         */
        bind_event:function() {//事件绑定
            //编辑按钮
            $(".editmore").on("click", function(e){
                $(this).hide();
                $(".op-btn").show();
                $(".general .item").addClass("bg");
                $(".general .item").find(".text-icon").addClass("delete");
                $(".general .item").find(".right-icon").addClass("order");
                e.stopPropagation();
            });
            //完成
            $(".complete").on("click", function(e){
                $(".op-btn").hide();
                $(".editmore").show();
                $(".general .item").removeClass("bg");
                $(".general .item").find(".text-icon").removeClass("delete");
                $(".general .item").find(".right-icon").removeClass("order");
                //请求后台 保存数据


                e.stopPropagation();
            });
            //删除
            $("body").delegate(".text-icon.delete", "click", function(event){
                $(this).parents(".item").remove();
                e.stopPropagation();
            });
            //添加
            $(".op-btn .add").on("click", function(e){
                $(".home-head .tit").text("添加常用项");
                $(".cont-box,.menu-wrap").hide();
                $("#addPageMenu,#add-page").show();
                $("#addPageMenu li").eq(0).click();
            });
            //搜索
            $(".search-btn-box").on("click",function(){
                window.location.href='search-page.html';
            });
        },
        initSortEvent:function(){
            var item_list = document.getElementById('item_list');
            new Sortable(item_list,{
                handle: ".bg", // 拖拽区域，默认为 items 的 子元素
                onStart: function (/**Event*/evt) { // 拖拽开始
                    var itemEl = evt.item;// 当前拖拽的html元素
                    console.log(itemEl);
                },
                onEnd: function (/**Event*/evt) { // 拖拽结束
                    var itemEl = evt.item;
                }
            });
        },
        myStartRender:function(list){
            for(var i = 0; i< list.length; i++){
                var item = list[i];
                var item = $(`
                    <div class="item" code-attr = "${item.code}" onclick="javascript:window.open('../approve_detail.html?msgId=${item.code}');">
                        <i class="text-icon"></i>
                        <div class="text"><span class="title">${item.title}</span>
                        <p>发起时间：${item.sendDate}</p></div>
                        <i class="right-icon arrow" aria-hidden="true"></i>
                    </div>
                `);
                $("#mystart-list").append(item);
            }
        },
        getMyStartLunchFn:function(){
            var paramData = {
                start:0,
                limit:5,
                opType:'FQ',
                sord:"1"
            };
            menuPage._ajax(function(data){
                if(data.result){
                    var list = data.result.list;
                    if(list && list.length==0){
                        $(".my-start-box .no-start").show();
                        $("#mystart-list").empty;
                    }
                    if(list && list.length>0)
                        startHome.myStartRender(list);
                }
            },paramData,startHome.serviceUrl + "flow/sysNoticeMsg/querySysNoticeMsgByPage?_time="+new Date().getTime());
        },
        /**
         * 页面初始化
         */
        pageInit:function(){
            this._render();
            //获取我的发起数据
            this.getMyStartLunchFn();
            //绑定按钮事件
            this.bind_event();
            this.initSortEvent();//拖拽排序初始化
        }
    };
    startHome.pageInit();
    window["startHome"] = startHome;

})(window,document);