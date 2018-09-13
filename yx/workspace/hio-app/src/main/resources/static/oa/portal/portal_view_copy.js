var currentPortalPageId;
var currentUserLoginName;
$(function () {
    $('#componentContainer').css({'min-height':$(window).height()});

    //获取url参数，并将其缓存至body中
    var urlParam = $.xljUtils.getUrlParams();
    $('body').data(urlParam);
    $('body').data('portalPageComponentsJson',{});

    currentPortalPageId = urlParam.portalPageId;
    if(window.parent&&$.isFunction(window.parent.storeCurrentPortalId)){
        window.parent.storeCurrentPortalId(currentPortalPageId);
    }

    var breadcrumbContainer = $(window.parent.document.getElementById('breadcrumbContainer'));
    if(breadcrumbContainer[0]){
        /* var bread_h = 33;
         $(window.parent.document).find(".embed-responsive-4by3").height($(window).height() + bread_h);*/

        breadcrumbContainer.css("display","none");
        window.parent.computeIframeHeight();

        $(window).on('unload', function () {
            /*$(window.parent.document).find(".embed-responsive-4by3").height($(window).height() - bread_h-2);
            */
            breadcrumbContainer.css("display","block");
            window.parent.computeIframeHeight();
        });
    }

    initNewsRead();

    var portalPageComponents;
    var gap = (document.getElementById('componentContainer').offsetWidth-20)/64;
    if(window.opener&&$.isFunction(window.opener.getPortalPageComponents)) {
        portalPageComponents = window.opener.getPortalPageComponents();
        initPortalPage(portalPageComponents,gap);

        $('.groupnews_container').find('.glyphicon-refresh').parent('a').click();
    }else{
        $.ajax({
            type:"POST",
            url:"http://127.0.0.1:9999/platform-app/"+"oa/portal/portalComponentPosition/queryList?_t="+new Date().getTime(),
            data:JSON.stringify({portalPageId:$("body").data('portalPageId')}),
            dataType:"json",
            contentType:'application/json',
            //async:false,
            success:function (resultData ) {
                if(resultData) {
                    var componentPositions = resultData.result;
                    /*var originPortalPageId = componentPositions[0].originPortalPageId;
                    if(originPortalPageId){
                        if(window.parent&&$.isFunction(window.parent.storeCurrentPortalId)){
                            window.parent.storeCurrentPortalId(originPortalPageId);
                        }
                    }*/
                    var components = [];
                    portalPageComponents = componentPositions;
                    initPortalPage(portalPageComponents,gap);

                    $('.groupnews_container').find('.glyphicon-refresh').parent('a').click();
                }
            }
        });
    }

    function initPortalPage(portalPageComponents,gap) {
    	var beginTime = new Date().getTime();
        if(!portalPageComponents){
            return;
        }
        var portalPageComponentsJson = $('body').data('portalPageComponentsJson');
        for(var item in portalPageComponents){
            var componentId = item;
            var positionObj = portalPageComponents[item];
            portalPageComponentsJson[positionObj.componentId] = positionObj;

            var componentObj = assembleComponentList(positionObj);

            var componentId= positionObj.componentId;
            var componentWidth= positionObj.componentWidth;
            var componentHeight= positionObj.componentHeight;
             var contentUrl= "";
             if(positionObj.contentUrl.indexOf(".html") != -1){
                  console.log("101");
                  contentUrl= positionObj.contentUrl;
             } else{
                  console.log("202");
                  contentUrl = "http://127.0.0.1:9999"+positionObj.contentUrl;
             }
            var displayMoreMenu= positionObj.displayMoreMenu;
            var displayMoveMenu= positionObj.displayMoveMenu;
            var displayTitle= positionObj.displayTitle;
            var id= positionObj.id;
            var paddingBottom= positionObj.paddingBottom;
            var paddingLeft= positionObj.paddingLeft;
            var paddingRight= positionObj.paddingRight;
            var paddingTop= positionObj.paddingTop;
            var portalPageId= positionObj.portalPageId;
            var refreshInterval= positionObj.refreshInterval;
            var startColNum= positionObj.startColNum;
            var startRowNum= positionObj.startRowNum;
            var title = positionObj.title;
            if(displayTitle=='N'){
                $(componentObj.find('.news_title')[0]).hide();
            }

            if (displayMoreMenu=='N'){
                $(componentObj.find('.iconMore_bd')[0]).hide();
            }

            componentObj.find('.groupnews_container').css({
                height:'100%'
            });

            $('#componentContainer').append(componentObj);
            componentObj.css({
                width:componentWidth/64*100+'%',
                height:componentHeight+'px',
                position:'absolute',
                top:startRowNum,
                left:gap*startColNum,
                'padding-left':paddingLeft+'px',
                'padding-right':paddingRight+'px',
                'padding-top':paddingTop+'px',
                'padding-bottom':paddingBottom+'px'

            });
            //componentObj.find('.glyphicon-refresh').parent('a').click();

            //$('body').getNiceScroll().show().resize();
        }
        var endTime = new Date().getTime();
        
    }
    //initPortalPage();

    $(window).on('resize',function () {

        var gap = (document.getElementById('componentContainer').offsetWidth)/64;
        var portalPageComponentsJson = $('body').data('portalPageComponentsJson');
        var componentContainers = $('.resizable-cs');
        for (var i = 0; i < componentContainers.length; i++) {
            var componentContainer = $(componentContainers[i]);

            var componentId = componentContainer.find('.groupnews_container').attr('id');

            var positionObj = portalPageComponentsJson[componentId];
            var componentId= positionObj.componentId;
            var componentWidth= positionObj.componentWidth;
            var componentHeight= positionObj.componentHeight;
             var contentUrl = "";
             console.log(positionObj.contentUrl);
            if(positionObj.contentUrl.indexOf(".html") != -1){
                console.log("1");
                 contentUrl= positionObj.contentUrl;
            } else{
                 console.log("2");
                 contentUrl = "http://127.0.0.1:9999"+positionObj.contentUrl;
            }
            var displayMoreMenu= positionObj.displayMoreMenu;
            var displayMoveMenu= positionObj.displayMoveMenu;
            var displayTitle= positionObj.displayTitle;
            var id= positionObj.id;
            var paddingBottom= positionObj.paddingBottom;
            var paddingLeft= positionObj.paddingLeft;
            var paddingRight= positionObj.paddingRight;
            var paddingTop= positionObj.paddingTop;
            var portalPageId= positionObj.portalPageId;
            var refreshInterval= positionObj.refreshInterval;
            var startColNum= positionObj.startColNum;
            var startRowNum= positionObj.startRowNum;
            var title = positionObj.title;
            componentContainer.find('.groupnews_container').css({
                height:'100%'
            });

            componentContainer.css({
                width:componentWidth/64*100+'%',
                height:componentHeight+'px',
                position:'absolute',
                top:startRowNum,
                left:gap*startColNum,
                'padding-left':paddingLeft+'px',
                'padding-right':paddingRight+'px',
                'padding-top':paddingTop+'px',
                'padding-bottom':paddingBottom+'px'

            });

            computeNewsListWidth(componentContainer.find('.news_more')[0]);
        }

    });

    /**
     * 组装组件列表
     * @param component
     */
    function assembleComponentList(component) {
        var liObj = $('<li></li>');
        liObj.addClass('dropable-cs');

        var spanIconObj = $('<span></span>');
        spanIconObj.addClass('glyphicon');
        spanIconObj.addClass('glyphicon-cog');
        liObj.append(spanIconObj);

        var spanTextObj = $('<span></span>');
        spanTextObj.addClass('glyphicon-class');
        spanTextObj.text(component.title);
        liObj.append(spanTextObj);

        //拖拽容器
        var divObj = $('<div class="resizable-cs"></div>');
        liObj.append(divObj);

        //组件容器
        var groupNewsContainerObj = $('<div class="groupnews_container"></div>');
        groupNewsContainerObj.attr('data-contentUrl',component.contentUrl);
        groupNewsContainerObj.attr('data-title',component.title);
        groupNewsContainerObj.attr('id',component.componentId);
        divObj.append(groupNewsContainerObj);

        //
        var fullWidthObj = $('<div class="fullWidth"></div>');
        groupNewsContainerObj.append(fullWidthObj);

        //标题容器
        var newsTitleObj = $('<div class="news_title clearfix"></div>');
        fullWidthObj.append(newsTitleObj);

        //标题
        var titleSpanObj = $('<span><img src="../../common/img/arrow_mini.png" alt="">'+component.title+'</span>');
        //titleSpanObj.text(component.title);
        newsTitleObj.append(titleSpanObj);

        //更多按钮
        //var moreLinkObj = $('<a href="#" class="news_more">更多</a>');
        /*if(component.moreUrl&&component.moreUrl!=''){
         var reg = /^(http:\/\/)/;
         component.moreUrl = reg.test(component.moreUrl)?component.moreUrl:('http://'+window.location.host+component.moreUrl);
         //moreLinkObj.attr('href',component.moreUrl);
         }else{
         moreLinkObj.attr('href','javascript:void(0)');
         }*/
        //newsTitleObj.append(moreLinkObj);

        //组件内容
        var contentObj = $('<div class="component-content"></div>');
        contentObj.css({'min-heihgt':'260px'});
        fullWidthObj.append(contentObj);

        //操作按钮栏
        var toolsObj = $('<div class="component-tools"></div>');
        toolsObj.css({
            position: 'absolute',
            right: '0',
            top: '0px',
            border: 'none',
            height: '40px',
            //width: '5%',
            'z-index': '5',
            //'background-color': '#333',
            filter:'alpha(Opacity=80)',
            // '-moz-opacity':'0.3',
            // 'opacity': '0.3'
            //display:'none'
        });
        fullWidthObj.append(toolsObj);

        //操作按钮
        var toolsGroupObj = $('<div class="pull-right"></div>');
        toolsGroupObj.css({'line-height':'40px'});
        toolsObj.append(toolsGroupObj);
        //删除按钮
        var delObj = $('<a href="javascript:void(0);" class="news_more" title="删除" ><i class="glyphicon glyphicon-remove"></i> </a>');
        delObj.attr('onclick','removePortlet(this,"'+component.title+'")');
        delObj.css({
            float:'right',
            'margin-right':'10px',
            color: '#fff'
        });
        //toolsGroupObj.append(delObj);

        //移动按钮
        var moveObj = $('<a href="javascript:void(0);" class="news_more move" title="移动" ><i class="glyphicon glyphicon-move"></i> </a>');
        moveObj.css({
            cursor:'move',
            float:'right',
            'margin-right':'10px',
            color: '#fff'
        });
        //toolsGroupObj.append(moveObj);

        //刷新按钮
        var refreshObj = $('<a href="javascript:void(0);" class="refrensh-btn" title="刷新" ><i class="glyphicon glyphicon-refresh"></i> </a>');
        refreshObj.attr('onclick','refreshPortlet(this,"'+component.contentUrl+'")');
        refreshObj.css({
            float:'right',
            'margin-right':'10px',
            color: '#333',
            display:'none'
        });
        toolsGroupObj.append(refreshObj);

        //编辑组件属性按钮
        var editObj = $('<a href="javascript:void(0);" class="news_more" title="编辑组件属性" ><i class="glyphicon glyphicon-edit"></i> </a>');
        editObj.attr('onclick','editComponentAttr(this)');
        editObj.css({
            float:'right',
            'margin-right':'10px',
            color: '#fff'
        });
        //toolsGroupObj.append(editObj);

        //更多按钮
        // var moreObj = $('<a href="javascript:void(0);" class="news_more" title="更多" ><i class="glyphicon glyphicon-th-list"></i> </a>');
        var moreObj = $('<a href="javascript:void(0);" class="news_more" title="更多" ><i class="iconMore_bd"></i> </a>');

        if(component.moreUrl&&component.moreUrl!=''){
            var reg = /^(http:\/\/)/;
            component.moreUrl = reg.test(component.moreUrl)?component.moreUrl:('http://'+window.location.host+component.moreUrl);
            moreObj.attr('href',component.moreUrl);
            moreObj.attr('target','_blank');
        }
        moreObj.css({
            float:'right',
            'margin-right':'10px',
            color: '#333'
        });
        toolsGroupObj.append(moreObj);

        return divObj;
    }

    //setTimeout(function () {
        //$('.groupnews_container').find('.glyphicon-refresh').parent('a').click();
    //},500);

    initUserInfo();
});

/**
 * 刷新组件内容
 * @param btn
 */
function refreshPortlet(btn,contentUrl) {
	if(contentUrl.indexOf(".html") == -1){
		contentUrl = "http://localhost:9999/" + contentUrl;
	}
    var newsCode = contentUrl.substring(contentUrl.lastIndexOf('/')+1);
    var newsLimit = 10;
    if(newsCode=='XYJGG'){
        newsLimit = 8;
    }
    if(newsCode=='Company_Bulletin'){
        newsLimit = 20;
    }
    if(newsCode=='XYGZZD'){
        newsLimit = 6;
    }
    try{
        if(contentUrl&&contentUrl.indexOf('?')!=-1){
            contentUrl = contentUrl + '&_t='+new Date().getTime();
        }else{
            contentUrl = contentUrl + '?_t='+new Date().getTime();
        }

        var portalId = $.xljUtils.getUrlParams().portalPageId;
        contentUrl += '&portalId='+(portalId?portalId:'');
        contentUrl += '&newsLimit='+newsLimit;
        $(btn).parents('div.groupnews_container').find('.component-content').load(contentUrl,function () {
            var portlet = $(btn).parents('div.groupnews_container');
            var footer = portlet.find('.footer');
            if(footer.length>0) {
                portlet.css({
                    border:'none',
                    'background-color':footer.css('background-color')
                })
            }

            var copyright = portlet.find('.copyright');
            if(copyright.length>0) {
                copyright.css({'margin-top':'10px'});
                portlet.css({
                    border:'none',
                    'background-color':copyright.css('background-color')
                })
            }

            clearNewsIcon();

            //计算新闻列表长度
            $(btn).parents('div.groupnews_container').find(".rules_list li").each(function (i,liObj) {
                var liWidth = $(liObj).width();
                var newIconWidth = 0;
                var citySpanWidth = 0;
                var newIconSpan = $(liObj).find('.newicon');
                newIconWidth = newIconSpan[0]?32:newIconWidth;

                var citySpan = $(liObj).find('.city');
                citySpanWidth = citySpan[0]?(70):citySpanWidth;
                $(liObj).find('a').css({'display':'inline'});
                var aWidth = $(liObj).find('a').width();
                if(aWidth>(liWidth-newIconWidth-citySpanWidth)){
                    $(liObj).find('a').css({width:(liWidth-newIconWidth-citySpanWidth)+'px'});
                }
                $(liObj).find('a').css({'display':'inline-block'});

            });

            //计算待办列表宽度
            $(btn).parents('div.groupnews_container').find('ul.tab_list li').each(function (i,liObj) {
                var liWidth = $(liObj).width();
                var spanObj = $(liObj).find('span.t_delay');
                spanObj.dotdotdot();
                var spanWidth = spanObj.outerWidth();
                var imgWidth = $(liObj).find('img.xb').outerWidth();
                imgWidth = imgWidth?imgWidth:0;
                var aObj = $(liObj).find('a.t_content');
                $(liObj).find('a').css({'display':'inline'});
                var aWidth = $(liObj).find('a').width();
                if(aWidth>(liWidth-spanWidth-imgWidth)){
                    $(liObj).find('a').css({width:(liWidth-spanWidth-imgWidth-10)+'px'});
                }
                /*var ulObj = $(liObj).parent('ul');
                aObj.width(ulObj.width()-spanObj.width()-15);
                aObj.dotdotdot();*/
                $(liObj).find('a').css({'display':'inline'});
                $(liObj).find('a').dotdotdot();

            });

            //处理快捷菜单居中问题
            var shortcutMenuListDivObj = $('#shortcutMenuListDiv');
            if(shortcutMenuListDivObj.length>0) {
                var pWidth = shortcutMenuListDivObj.width();
                var liWidth = shortcutMenuListDivObj.find('li').outerWidth();
                var liCount = Math.floor(pWidth/(liWidth+13));
                if(liCount!=2){
                    liCount = 2;
                }
                shortcutMenuListDivObj.find('ul').width(liWidth*liCount+13*liCount).css({'margin':'auto'});

            }

            //处理左侧导航菜单居中问题
            var shortcutMenuListDivObj = $('.wuye');
            if(shortcutMenuListDivObj.length>0) {
                var num = shortcutMenuListDivObj.length;
                for(var i=0;i<num;i++){
                    var obj = $(shortcutMenuListDivObj[i]);
                    var pWidth = obj.width();//154
                    var liWidth = obj.find('li').outerWidth();//74
                    var liCount = Math.floor(pWidth/(liWidth+13));//2
                    if(liCount!=2){
                        liCount = 2;
                    }
                    obj.find('ul').width(liWidth*liCount+13*liCount).css({'margin':'auto'});
                }
            }




        });
    }catch (e){

    }
}

/**
 * 初始化新闻已读数据
 */
function initNewsRead() {
    $.ajax({
        url:'http://127.0.0.1:9999/platform-app/oa/content/contentRowType/getNewsReadForPersonal?_t='+new Date().getTime(),
        type:'GET',
        dataType: 'json',
        success:function (resultData) {
            if(resultData.success){
                $('body').data('NEWS_READ',JSON.parse(resultData.result));
            }
        }
    });
}

/**
 * 消除已读的new图标
 */
function clearNewsIcon() {

    var newsIconKeys = $('body').data('NEWS_READ');
    if(newsIconKeys){
        for (var i = 0; i < newsIconKeys.length; i++) {
            var obj = newsIconKeys[i];
            obj = obj.substring(obj.lastIndexOf("_")+1);
            $('#'+obj).siblings('.newicon').remove();
        }
    }
}

/**
 * 记录新闻已读，消除new图标
 * @param ele
 */
function recordNewsReadForPerson(ele) {
    var contentRowTypeId = $(ele).attr('id');
    if($(ele).siblings('.newicon').length>0){
        $.ajax({
            url:  'http://127.0.0.1:9999/platform-app/oa/content/contentRowType/getNewsReadForPersonal?contentRowTypeId='+contentRowTypeId+'&_t='+new Date().getTime(),
            type:'GET',
            dataType: 'json',
            success:function (resultData) {
                if(resultData.success){
                    var contentTypeId = resultData.result;
                    $(ele).siblings('.newicon').remove();
                }
            }
        });
    }
}

/**
 * 计算新闻列表宽度问题
 * @param ele
 */
function computeNewsListWidth(ele) {
    //计算新闻列表长度
    $(ele).parents('div.groupnews_container').find(".rules_list li").each(function (i,liObj) {
        var liWidth = $(liObj).width();
        var newIconWidth = 0;
        var citySpanWidth = 0;
        var newIconSpan = $(liObj).find('.newicon');
        newIconWidth = newIconSpan[0]?32:newIconWidth;

        var citySpan = $(liObj).find('.city');
        citySpanWidth = citySpan[0]?(70):citySpanWidth;
        $(liObj).find('a').css({'display':'inline'});
        var aWidth = $(liObj).find('a').width();
        if(aWidth>(liWidth-newIconWidth-citySpanWidth)){
            $(liObj).find('a').css({width:(liWidth-newIconWidth-citySpanWidth)+'px'});
        }

        $(liObj).find('a').css({'display':'inline-block'});

    });
}

/**
 * 选择公司加载完公司后，大类下面的新闻内容要发生变化，加载该公司下面的新闻
 */
function changeCompanyCallback(data,$ele){
    var url = $($ele).parents('.groupnews_container').attr('data-contentUrl');
    var newsCode = url.substring(url.lastIndexOf('/')+1);
    var newsLimit = 10;
    if(newsCode=='XYJGG'){
        newsLimit = 8;
    }
    if(newsCode=='Company_Bulletin'){
        newsLimit = 20;
    }
    if(newsCode=='XYGZZD'){
        newsLimit = 6;
    }
    $($ele).parents('.fullWidth').find('.component-content').load(url+"?newsLimit="+newsLimit+"&companyId="+data.id,function () {
        $($ele).parents('.fullWidth').find('.component-content').find(".rules_list li").each(function (i,liObj) {
            var liWidth = $(liObj).width();
            var newIconWidth = 0;
            var citySpanWidth = 0;
            var newIconSpan = $(liObj).find('.newicon');
            newIconWidth = newIconSpan[0]?32:newIconWidth;

            var citySpan = $(liObj).find('.city');
            citySpanWidth = citySpan[0]?(citySpan.outerWidth()+12):citySpanWidth;
            var aWidth = $(liObj).find('a').width();
            if(aWidth>(liWidth-newIconWidth-citySpanWidth)){
                $(liObj).find('a').css({width:(liWidth-newIconWidth-citySpanWidth)+'px'});
            }

        });
    });

}

var currentUserDef;
/**
 * 获取当前登录用户信息
 */
function initUserInfo(){
    var userDef = new $.Deferred();
    var uBody = "http://127.0.0.1:9999/platform-app/sys/org/user/getMyInfo?time="+Math.random();
    var uAll =  uBody;
    $.ajax({
        type:'get',
        url:uAll,
        dataType:'JSON',
        success: function(data) {
            userDef.resolve(data);
        },error:function(XMLHttpRequest, textStatus, errorThrown){
            $.xljUtils.tip("red","获取用户请求失败");
            userDef.resolve(false);
        }
    });
    currentUserDef = userDef.promise();

}
/**
 * 获取给定url的参数
 * @param url
 * @returns {string|*}
 */
function getTextUrlParams(url) {
    var tendCodeParam = url.substring(url.indexOf('?'));
    tendCodeParam = tendCodeParam.replace('?', '').replace(/&/g, '","');
    tendCodeParam = tendCodeParam.replace(/=/g, '":"');
    if (tendCodeParam != "") {
        try{
            tendCodeParam = JSON.parse('{"' + tendCodeParam + '"}');
        }catch(e){}
    }

    return tendCodeParam;
}

function checkLogin(url){
    if(!currentUserDef){
        currentUserDef = new $.Deferred();
        currentUserDef.resolve();
        currentUserDef.promise();
    }
    var def = new $.Deferred();
    def.resolve(url);
    def.promise();
    //currentUserDef
    $.when(currentUserDef,def).done(function (currentUserInfo,url) {
        return currentUserInfo;
    }).then(function (currentUserInfo,url) {
        var url = url;
        if(url.indexOf('/platform-app//')==0){
            url = url.replace('/platform-app//','/platform-app/');
        }
        var flag = true;
        var ajaxUrl = serviceUrl + 'sys/thirdPartyAuthentication/checkLogin?_time='+new Date().getTime();

        //跨租户消息问题，暂时注释掉
        if(currentUserInfo&&currentUserInfo.result&&currentUserInfo.result.loginName){
            ajaxUrl = ajaxUrl +'&loginName='+currentUserInfo.result.loginName;
        }
        var tendCode = getTextUrlParams(url).tendCode;
        if(tendCode){
            ajaxUrl += '&tendCode='+tendCode + '&_s='+tendCode;
        }

        $.ajax({
            type: 'GET',
            url: ajaxUrl,
            dataType:'JSON',
            success: function (resultData) {
                flag = resultData.success;
                if(!flag){
                    window.open('/platform-app/login.html?_time='+new Date().getTime(),'','');
                }
                if(url.indexOf('casUrlLogin')>-1){
                    window.open(url,'','');
                }else{
                    window.open(encodeURI(url),'','');
                }
            },
            error:function (xhr) {
                window.open('/platform-app/login.html?_time='+new Date().getTime(),'','');
            }
        });
    });
}