/**
 * Created by Administrator on 2017/11/22.
 */

(function(window,document){


    var startHome = {
        baseUrl : '/',
        hostUrl : '/platform-app/',
        search:window.location.search,
        mapArr : [],
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
                                     <h2 class="icon-my icon-my-s2" data-id=${item.id} data-url = ${item.url} >
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
                        已选择(<span id="num">0</span>/7)
                        <button class="sure">确认</button>
                    </div>
                `);
                $add_con.append($bottom);
                menuPage._addStyle($ul);
                menuPage.event();
                startHome.event();
                //获取我常用的数据
                startHome.getGeneralData();
            });

        },
        renderGeneralList:function(data,isAdd){
            var self = startHome;
            var bg = isAdd?"bg":"";
            var del = isAdd?"delete":"";
            var order = isAdd?"order":"";
            $("#item_list").empty();
            data.map(function(r){
                var item = $(` <div class="item ${bg}" data-id="${r.id}" data-url="${r.url}">
                       <i class="text-icon ${del}"></i>
                       <div class="text">
                           <span class="title">${r.name}</span>
                            <p>${r.path}</p>
                       </div>
                       <i class="right-icon arrow ${order}" aria-hidden="true"></i>
                   </div>`);
                $("#item_list").append(item);
            });
        },
        //我常用的数据接口
        getGeneralData:function(){
            var URL = this.hostUrl+"sys/quick/entry/queryFavouriteEntry";
            var self = startHome;
            menuPage._ajax(function(data){
                //处理返回的数据
                //默认在添加页面选中这几条 显示selected
                //底部的num也要进行赋值
                if(data.result.length<1){
                    $(".noItem-box").show();
                    $("#item_list").hide();
                    return;
                }
                var r_arr = data.result;
                var new_arr = [];
                r_arr.map(function(r) {
                    r = JSON.parse(r);
                    new_arr.push(r);
                });
                self.mapArr = new_arr;
                //渲染常用列表
                self.renderGeneralList(new_arr);
                var h2_objs = $("#add-page .icon-my-s2");
                $(h2_objs).each(function(i,h) {
                    new_arr.map(function(r) {
                        if($(h).attr("data-id")==r.id){
                            $(h).find(".selected-border").addClass("selected");
                        }
                    });
                });
                $(".bottom-sum-box #num").text(new_arr.length);
            },"",URL);
        },
        resetMapData:function(){
            var newArr = [];
            $("#item_list .item").each(function(i,n){
                var name = $(n).find(".title").text();
                var path = $(n).find("p").text();
                var url = $(n).attr("data-url");
                var id = $(n).attr("data-id");
                newArr.push({"name":name,"path":path,"id":id,"url":url});
            });
            return newArr;
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
                var self = startHome;
                $(".home-head .tit").text("快捷入口");
                $("#addPageMenu,#add-page,.noItem-box").hide();
                $(".cont-box,#generalMenu,#item_list").show();
                $("#generalMenu .menu-fixed-item").click();
                //重新渲染常用列表
                self.renderGeneralList(self.mapArr,true);
            });
            //选择事件
            $("#add-page").find(".icon-my-s2").on("click", function (e) {
                var self = startHome;
                var num = parseInt($(".bottom-sum-box #num").text());
                if (num > 6) {
                    $(".pop-wrap-modal").show();
                    return;
                }
                num = num+1;
                $(".bottom-sum-box #num").text(num);
                var $select = $(this).find(".selected-border");
                $select.toggleClass("selected");
                var id =$(this).attr("data-id");
                if($select.hasClass("selected")){
                    var name = $(this).find(".title").text();
                    var path = $("#addPageMenu .current").html()+"/"+$(this).parents(".list-sort-ul").find(".icon-my-s1 .title").text();
                    var url =$(this).attr("data-url");
                    var obj = {"name":name,"path":path,"url":url,"id":id};
                    self.mapArr.push(obj);
                }else{
                    self.mapArr = _.remove(self.mapArr, function(n) {
                        return n.id  == id;
                    });
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
                var self = startHome;
                var dataP = "{}";
                //数据可能是排序后的 对数组重新赋值
                self.mapArr = self.resetMapData();
                //请求后台 保存数据
                menuPage._ajax(function(data){
                    $(".op-btn").hide();
                    $(".editmore").show();
                    $(".general .item").removeClass("bg");
                    $(".general .item").find(".text-icon").removeClass("delete");
                    $(".general .item").find(".right-icon").removeClass("order");
                },JSON.stringify(self.mapArr),self.hostUrl+"sys/quick/entry/saveFavouriteEntry")

                e.stopPropagation();
            });
            //删除
            $("body").delegate(".text-icon.delete", "click", function(event){
                var item = $(this).parents(".item");
                item .remove();
                var self = startHome;
                self.mapArr = _.remove(self.mapArr, function(n) {
                    return n.id == $(item).attr("data-id");
                });
                event.stopPropagation();
            });
            //添加
            $(".op-btn .add").on("click", function(e){
                $(".home-head .tit").text("添加常用项");
                $(".cont-box,.menu-wrap").hide();
                $("#addPageMenu,#add-page").show();
                $("#addPageMenu li").eq(0).click();
                $(".bottom-sum-box #num").text(startHome.mapArr.length);
            });
            //搜索
            $(".search-btn-box").on("click",function(){
                window.location.href='search-page.html';
            });
            //点击常用表单
            $("body").delegate("#item_list .item", "click", function(event){
                window.open($(this).attr("data-url"));
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
            },paramData,startHome.hostUrl + "flow/sysNoticeMsg/querySysNoticeMsgByPage?_time="+new Date().getTime());
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