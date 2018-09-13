/**
 * Created by Administrator on 2017/11/22.
 */

(function(){


    var startHome = {
        baseUrl : '/',
        hostUrl : '/platform-app/',
        search:window.location.search,
        dataG:[],
        mapArr : [],
        removeMapArr:[],
        _render: function(){
            var $ul = $(".menu-wrap").find("ul");
            var $menu_data = $("#menu_list_data");//菜单展示列表
            var $add_con = $("#add-page");//添加页面列表
            $ul.empty();
            $menu_data.empty();
            $add_con.empty();
            menuPage._ajax(function(data){
                var res = data.result;
                startHome.dataG = res;
                res.map(function(r) {
                    var item = $(`<li>${r.name}</li>`);
                    $(item).attr("id",r.id);
                    item.data(item);
                    $ul.append(item);
                    var cont_box = $(`
                         <div class="cont-tab-box">
                            <div class="list-sort-show">
                                <ul class="list-sort-ul">

                                </ul>
                            </div>
                         </div>
                        `);
                    $menu_data.append(cont_box);
                });
                $add_con.html($menu_data.html());
                var $bottom = $(`
                    <div class="bottom-sum-box">
                        已选择(<span id="num">0</span>/7)
                        <button class="sure">确认</button>
                    </div>
                `);
                $add_con.append($bottom);
                menuPage._addStyle($ul);
                menuPage.MenuEvent();
                menuPage.myIconEvent();
                startHome.clickMenuFn();
                startHome.clickH2Fn();
                startHome.selectFn();
                startHome.event();
            });

            //获取我常用的数据
            startHome.getGeneralData();
        },
        renderGeneralList:function(data,isAdd){
            console.log(data);
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
            $("body").delegate(".pop-bottom-btn-box", "click", function(event){
                $(".pop-wrap-modal").hide();
            });
            //添加后 确认
            $("body").delegate(".bottom-sum-box .sure", "click", function(event){
                var self = startHome;
                $(".home-head .tit").text("快捷入口");
                $("#addPageMenu,#add-page,.noItem-box").hide();
                $(".cont-box,#generalMenu,#item_list").show();
                $("#generalMenu .menu-fixed-item").click();

                //重新渲染常用列表
                self.renderGeneralList(self.mapArr,true);
            });
        },
        clickMenuFn:function(){
            $("body").delegate(".menu-wrap li", "click", function(event){
                var $menu_data = $("#menu_list_data");//菜单展示列表
                var $add_con = $("#add-page");//添加页面列表
                var li_index = $(this).index();
                var self = startHome;
                $menu_data.find(".cont-tab-box").hide();
                var $conbox = $menu_data.find(".cont-tab-box").eq(li_index);
                $conbox.show();
                if($conbox.find(".list-sort-ul li").length>0){
                    return;
                }
                var id = $(this).attr("id");
                var index_n = _.findIndex(self.dataG, function(chr) {
                    return chr.id == id;
                });
                self.dataG[index_n].children.map(function(r){
                    var child_item = $(`
                            <li>
                                <h2 class="icon-my icon-my-s1" index-n=${index_n} data-id=${r.id}>
                                    <span class="arrow-box right"></span>
                                    <span class="title">${r.name}</span>
                                </h2>
                                <ul class="hide">

                                </ul>
                            </li>
                    `);
                    $conbox.find(".list-sort-ul").append(child_item);
                });
                $add_con.find(".cont-tab-box").eq(li_index).html($conbox.html());


            });
        },
        clickH2Fn:function(){
            $("body").delegate(".icon-my-s1", "click", function(event){
                var self = startHome;
                var $add_con = $("#add-page");//添加页面列表
                var id = $(this).attr("data-id");
                var index_n = $(this).attr("index-n");
                var ul = $(this).next("ul");
                $(this).find(".arrow-box").toggleClass("down");
                $(this).next().toggle();
                if(ul.find("li").length>0){//有数据
                    return;
                }
                var childrens = self.dataG[index_n];
                var index_c_n = _.findIndex(childrens.children, function(chr) {
                    return chr.id == id;
                });
                childrens.children[index_c_n].children.map(function(r){
                    var li = $(`
                             <li>
                                 <h2 class="icon-my icon-my-s2" data-id=${r.id} data-url = ${r.url} >
                                    <span class="selected-border" style="display: none"></span>
                                    <span class="title">${r.name}</span>
                                </h2>
                             </li>
                        `);
                    $(ul).append(li);
                });
                $add_con.find(".selected-border").show();
                var h2_objs = $("#add-page .icon-my-s2");
                $(h2_objs).each(function(i,h) {
                    self.mapArr.map(function(r) {
                        if($(h).attr("data-id")==r.id){
                            $(h).find(".selected-border").addClass("selected");
                        }
                    });
                    self.removeMapArr.map(function(r) {
                        if($(h).attr("data-id")==r.id){
                            $(h).find(".selected-border").removeClass("selected");
                        }
                    });
                });
                // $(".bottom-sum-box #num").text(self.mapArr.length);
                //menuPage.myIconEvent();
            });
        },
        selectFn:function(){
            //选择事件
            $("body").delegate("#add-page .icon-my-s2", "click", function(e){
                var self = startHome;
                var $select = $(this).find(".selected-border");
                var num = parseInt($(".bottom-sum-box #num").text());
                num = ($select.hasClass("selected")) ? num-1 : num+1;

                if (num > 7) {
                    $(".pop-wrap-modal").show();
                    return;
                }

                $select.toggleClass("selected");
                $(".bottom-sum-box #num").text(num);
                var id =$(this).attr("data-id");
                if($select.hasClass("selected")){
                    var name = $(this).find(".title").text();
                    var path = $("#addPageMenu .current").html()+"/"+$(this).parents(".list-sort-ul").find(".icon-my-s1 .title").text();
                    var url =$(this).attr("data-url");
                    var obj = {"name":name,"path":path,"url":url,"id":id};
                    self.mapArr.push(obj);
                }else{
                    self.mapArr = _.remove(self.mapArr, function(n) {
                        return n.id  != id;
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
                var data_id = $(item).attr("data-id");
                //添加页面add-page不再选中
               // $("#add-page").find(".icon-my-s2[data-id='"+data_id+"']").find(".selected-border").removeClass("selected");
                var self = startHome;
                var removeArr = self.mapArr;
                removeArr= _.remove(removeArr, function(n) {
                    return n.id == data_id;
                });
                self.removeMapArr.push(removeArr[0]);
                self.mapArr = _.remove(self.mapArr, function(n) {
                    return n.id != data_id;
                });
                $(".bottom-sum-box #num").text(self.mapArr.length);

                event.stopPropagation();
            });
            //添加
            $(".op-btn .add").on("click", function(e){
                var self = startHome;
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
            //$("body").delegate("#item_list .item", "click", function(event){
            //    window.open($(this).attr("data-url"));
            //});
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

})();