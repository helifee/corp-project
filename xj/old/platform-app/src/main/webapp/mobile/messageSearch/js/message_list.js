/**
 * Created by miying on 2018/1/12.
 */

(function(){
    var messagePage = {
        baseUrl :'/',
        hostUrl : '/platform-app/',
        dataType:"DB",
        keyword:"",
        start:0,
        _ajax : function(cb,dataP,me){
            var self = messagePage;
            if(!dataP){
                dataP = '{}';
            }
            $.ajax({
                url: self.hostUrl+"flow/sysNoticeMsg/searchDataByKeyword",
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(dataP),
                success: function(resultData) {
                    if (resultData && resultData.success) {
                        //console.log(resultData)
                        cb && cb (resultData)
                    }else {

                    }

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    me.resetload();
                }
            });
        },
        bind_event : function(){
            //提示框样例
            var dialog_tip = this.dialog_tip = function (text){
                $(document).dialog({
                    type : 'notice',
                    infoText: text,
                    autoClose: 2500,
                    position: 'top'  // center: 居中; bottom: 底部
                });
            }
            //待办已办查询
            $(".btn-box .btn-con").on("click",function(e){
                var self = messagePage;
                $(this).siblings().removeClass("current");
                $(this).addClass("current");
                self.dataType = $(this).attr("attrtype");
                $("#content_items").empty();
                self.start = 0;
                self.loadFn();
                e.stopPropagation();
            });
            //点击列表跳转
            $("body").delegate(".con-list .item", "click", function(event){
                var url = $(this).attr("data-url");
                window.location.href=messagePage.hostUrl+url;
                event.stopPropagation();
            });

        },

       loadFn:function(){
            // dropload
            $('.con-list').dropload({
                scrollArea : window,
                domDown : {
                    domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
                },
                loadDownFn : function(me){
                    var num = 10;
                    var html = $(".dropload-down").html();
                    $(".dropload-down").remove();
                    var dropDiv = $("<div>",{class:"dropload-down",html:html});
                    $(".con-list").append(dropDiv);
                    var self = messagePage;
                    var start = self.start;
                    var dataP = {"appCode":"-1","sidx": "id","sord":"desc","start":start,"limit":num,"dataType":self.dataType,"keyword":self.keyword};
                    self._ajax(function(resultData){
                        //$("#content_items").empty();
                        self.start = resultData.result.start+num;
                        var list = resultData.result.list ? resultData.result.list : [];
                        if(!list.length){
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                            return;
                        }
                        for(var i = 0;i<list.length;i++){
                            var item = list[i];
                            var item = $(`
                               <div class="item" data-url="${item.mobibleUrl}">
                                    <p><span class="tit">${item.title}</span></p>
                                    <p style="line-height: 30px"><span>发起时间：</span><span class="time">${item.sendDate}</span></p>
                                    <p class="stopTime blue"><i class="fa fa-clock-o my-stop-icon" aria-hidden="true"></i><span>停留<span></span>${item.hourSum}小时</span></p>
                              </div>
                            `);
                            $("#content_items").append(item);
                        }
                        // 每次数据加载完，必须重置
                        me.resetload();
                    },dataP);
                }
            });
        },
        //手机搜索
        myInputSearch:function(){
            var val = $("#search_input").val();
            messagePage.keyword = $.trim(val);
            $("#content_items").empty();
            messagePage.start = 0;
            messagePage.loadFn();
        },
        //暂时没用  保留
        getMessageData:function(start){
            if(!start) start = 0;
            var self = this;
            var dataP = {"appCode":"-1","sidx": "id","sord":"desc","start":start,"limit":20,"dataType":self.dataType,"keyword":self.keyword};
            self._ajax(function(resultData){
                //$("#content_items").empty();
                //self.start = resultData.result.start;
                var list = resultData.result.list ? resultData.result.list : [];
                for(var i = 0;i<list.length;i++){
                    var item = list[i];
                    var item = $(`
                       <div class="item">
                            <p><span class="tit">${item.title}</span></p>
                            <p style="line-height: 30px"><span>发起时间：</span><span class="time">${item.sendDate}</span></p>
                            <p class="stopTime blue"><i class="fa fa-clock-o my-stop-icon" aria-hidden="true"></i><span>停留<span></span>${item.hourSum}小时</span></p>
                      </div>
                    `);
                    $("#content_items").append(item);
                }
            },dataP);
        },
        getUrlParam:function(name){
            var reg = new RegExp("(^|&)"+ name + "=([^&]*)(&|$)");
            var r = decodeURI(window.location.search).substr(1).match(reg);
            if (r!=null ){
                return unescape(r[2]);
            }
            return null;
        },
        /**
         * 页面初始化
         */
        pageInit:function(){
            this.loadFn();
            this.bind_event();
        }
    };
    messagePage.pageInit();

    window["myInputSearch"]= messagePage.myInputSearch;
    window["messagePage"]= messagePage;
})()
