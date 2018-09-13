$(function () {
    var urlParams = $.xljUtils.getUrlParams();
    var contentTypeCodes = '';
    contentTypeCodes = !urlParams?'':urlParams.contentTypeCodes;

    if(contentTypeCodes=='DBPT'){
        $('head title').text('董办平台');
    }else {
        $('head title').text('新闻公告');
    }

    if(urlParams.hideHeader&&urlParams.hideHeader=='true'){
        //$('header').hide();
        ///$('#pullrefresh').css({'padding-top':'0px'});
    }

    initNewsRead();

    var limit = 10;
    var start = 0;
    var count = 0;
    var total = 0;
    mui.init({
        swipeBack:true ,//启用右滑关闭功能
        pullRefresh:{
            container:'#pullrefresh',
            up:{
                contentdown : "上拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                auto:true,
                callback:function () {
                    var that = this;
                    //1、加载完新数据后，必须执行如下代码，true表示没有更多数据了：
                    //2、若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
                    setTimeout(function () {
                        var param = {
                            contentTypeCodes:contentTypeCodes,
                            limit:limit,
                            start:start+count*limit
                        };
                        initNewsList(param);
                        that.endPullupToRefresh((start+count*limit)>=total);
                        count++;
                    },2000);

                    $(".news-title").dotdotdot();
                }
            }
        }

    });

    $(".news-title").dotdotdot();


    function initNewsList(param) {
        mui.ajax(serviceUrl+'oa/content/contentRowType/queryListForMobile',{
            data:JSON.stringify(param),
            dataType:'json',//服务器返回json格式数据
            type:'POST',//HTTP请求类型
            async:false,
            timeout:10000,//超时时间设置为10秒；
            headers:{'Content-Type':'application/json'},
            success:function(data){
                //服务器返回响应，根据响应结果，分析是否登录成功；
                console.info(data);
                if(data&&data.success) {
                    var newsList = data.result.list;
                    total = data.result.total;
                    for (var i = 0; i < newsList.length; i++) {
                        var obj = newsList[i];
                        var liObj = $('<li class="mui-table-view-cell" ></li>');
                        liObj.attr('id',obj.id);
                        var newsTitle = $('<div class="news-title"></div>');
                        liObj.append(newsTitle);
                        var publishDate = obj.publishDate;
                        if(obj.newIconDays&&obj.newIconDays!=0&&publishDate){
                            var publishTime = new Date(publishDate).getTime();
                            var currentTime = new Date().getTime();
                            if(currentTime<(publishTime+obj.newIconDays*24*60*60*1000)){
                                var newsIconSpan = $('<span class="news-icon"></span>');
                                newsIconSpan.css({'font-size':'12px','color':'#EE7600'});
                                newsIconSpan.html('New&nbsp;&nbsp;');
                                newsTitle.append(newsIconSpan);
                            }
                        }
                        newsTitle.append(obj.title);
                        var newsBase = $('<div class="news-base"></div>');
                        liObj.append(newsBase);
                        var newsType = $('<span class="news-type"></span>');
                        newsBase.append(newsType);
                        newsType.text(obj.contentTypeName);
                        var newsDept = $('<span class="news-dept"></span>');
                        newsBase.append(newsDept);
                        newsDept.html(obj.belongDeptName+'&nbsp;&nbsp;'+obj.author);
                        var newsDate = $('<span class="news-date"></span>');
                        newsBase.append(newsDate);
                        newsDate.text(!obj.publishDate?'':obj.publishDate.substring(0,10));

                        $('#newsListUl').append(liObj);

                        clearNewsIcon();
                    }
                }else{
                    mui.toast('新闻列表获取失败！',{ duration:'long', type:'div' });
                }
            },
            error:function(xhr,type,errorThrown){
                //异常处理；
                console.log(type);
            }
        });
    }

    //单击新闻打开新闻详细
    mui(".mui-table-view").on('tap','.mui-table-view-cell',function(){
        //获取id
        var id = this.getAttribute("id");
        recordNewsReadForPerson(this);
        if(urlParams.contentTypeCodes=='DBPT'){
            window.location.href = serviceUrl + 'mobile/contentType/mobileDocs_view.html?hideHeader=true&id='+id;
        }else{
            window.location.href = serviceUrl + 'mobile/contentType/mobileNews_view.html?hideHeader=true&id='+id;
        }

    });

});

function initNewsRead() {
    $.ajax({
        url:  'http://127.0.0.1:9999/platform-app/oa/content/contentRowType/getNewsReadForPersonal?_t='+new Date().getTime(),
        type:'GET',
        dataType: 'json',
        success:function (resultData) {
            if(resultData.success){
                $('body').data('NEWS_READ',JSON.parse(resultData.result));
            }
        }
    });
}

function clearNewsIcon() {
    var newsIconKeys = $('body').data('NEWS_READ');
    if(newsIconKeys){
        for (var i = 0; i < newsIconKeys.length; i++) {
            var obj = newsIconKeys[i];
            obj = obj.substring(obj.lastIndexOf("_")+1);
            $('#'+obj).find('.news-icon').remove();
        }
    }
}

function recordNewsReadForPerson(ele) {
    var contentRowTypeId = $(ele).attr('id');
    if($(ele).find('.news-icon').length>0){
        $.ajax({
            url:  'http://127.0.0.1:9999/platform-app/oa/content/contentRowType/getNewsReadForPersonal?contentRowTypeId='+contentRowTypeId+'&_t='+new Date().getTime(),
            type:'GET',
            dataType: 'json',
            success:function (resultData) {
                if(resultData.success){
                    var contentTypeId = resultData.result;
                    $(ele).find('.news-icon').remove();
                }
            }
        });
    }
}