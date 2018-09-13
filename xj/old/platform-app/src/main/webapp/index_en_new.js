$(function () {

    /**
     * 隐藏搜索按钮
     */
//    $('.menu_search').css({display:"none"});
    /**
     * 固定iframe高度
     */
    window.computeIframeHeight = function (isOa) {
        $('.embed-responsive-4by3').css({overflow:'hidden',width:'100%'});

        $('.embed-responsive-4by3').height($(window).height() -$("#headerContainer").outerHeight()-$("#breadcrumbContainer:visible").outerHeight());

    };
    var isFromForum = $.xljUtils.getUrlParam("isFromForum");
    // 打开全文检索
    $('.menu_search').on('click', function(){
        window.open('search_list.html?random=' + Date.now(), '_blank');
    });

    //退出
    $('#reLoginBtn').on('click', function () {
        var logoutUrl = hostUrl + "sys/authentication/logout";
        $.ajax({
            type: 'POST',
            url: logoutUrl,
            dataType: 'json',
            contentType: 'application/json',
            data: "{}",
            success: function (json) {
                if (json.success) {
                    window.location.href = hostUrl + 'login.html';
                } else {

                }
            }
        })
    });

    //修改个人信息
    $('#updatePersonalInfo').on('click',function () {
        window.open(hostUrl + "sysManager/org/updateMyInfo.html");
    });

    //修改密码
    $('#updatePersonalPwd').on('click',function () {
        window.open(hostUrl + "sysManager/org/updateMyPwd.html");
    });

    //修改个人首页风格
    $('#changePortalTheme').on('click',function () {
        var currentPortalPageId = $(window.document.body).data('currentPortalPageId');
        if(currentPortalPageId){
            window.open(hostUrl + 'oa/portal/personal_theme_copy.html?portalPageId='+currentPortalPageId+'&_time='+new Date().getTime(),'_blank');
            return;
        }

        /*$.ajax({
         url:hostUrl + 'oa/portal/portalPage/getPortalWithPermision?_time='+new Date().getTime(),
         type:'GET',
         async:false,
         dataType:'JSON',
         success:function (resultData) {
         if(resultData&&resultData.success){
         var result = resultData.result;
         if(result) {
         var portalPageId = result.id;
         window.open(hostUrl + 'oa/portal/personal_theme_copy.html?portalPageId='+portalPageId+'&_time='+new Date().getTime(),'_blank');
         //window.location.href = hostUrl + 'oa/portal/portal_view.html?portalPageId='+portalPageId;
         }else{
         $.xljUtils.tip('red','门户信息获取失败，请联系管理员！');
         }

         }else{
         $.xljUtils.tip('red','门户信息获取失败，请联系管理员！');
         }
         },
         error:function (xhr) {
         $.xljUtils.getError(xhr.status);
         }

         });*/
    });

    /**
     * 初始化所有系统
     */
    function initAllProject() {
        //post请求更改为get请求，解决IE9下获取菜单失败问题 update by dgh 2017/08/08
        var urlBody = "sys/authentication/getUserAuthenticationApp?appDelFlag=0&appStatus=1&_time="+new Date().getTime();
        var urlAll = hostUrl + urlBody;
        var postdata = {
            appDelFlag: "0",
            appStatus: "1"
        };
        $.ajax({
            type: 'GET',
            url: urlAll,
            dataType: 'json',
            //contentType: 'application/json',
            //async: false,
            //data: JSON.stringify(postdata),
            success: function (data) {
                if (data.success) {
                    var projectItems = data.result;
                    if (!projectItems || projectItems.length == 0) {
                        $.xljUtils.tip('blue', '暂无系统菜单数据！');
                        return;
                    }
                    var firstProA;
                    for (var i = 0; i < projectItems.length; i++) {
                        //系统菜单
                        var project = projectItems[i];
                        var proId = project.id;
                        var proIcon = project.icon;
                        var proOpenmode = project.openmode;
                        var proName = project.name;
                        var proCode = project.code;
                        //费用管理暂时隐藏掉
                        /*if(proCode=='EX'){
                            continue;
                        }*/
                        var proUrl = project.resourceUrl;
                        var liObj = $('<li></li>');

                        var aObj = $('<a href="javascript:void(0);"></a>');
                        aObj.attr('proOpenmode', proOpenmode);
                        aObj.attr('proName', proName);
                        aObj.attr('proCode', proCode);
                        aObj.attr('proUrl', proUrl);
                        aObj.attr('proId', proId);
                        liObj.append(aObj);

                        var iconObj = $('<i class="fa fa-university"></i>');
                        if (proIcon && proIcon != '') {
                            iconObj.removeAttr('class');
                            /*      iconObj.attr('class', proIcon);*/
                            iconObj='<img src="data:image/jpeg;base64,'+proIcon+'" style="width:40px;height:40px;margin-top:20px">';
                        }
                        aObj.append(iconObj);
                        var proNamePObj = $('<p></p>');
                        proNamePObj.text(proName);
                        aObj.append(proNamePObj);

                        //切换系统点击事件
                        aObj.on('click', function () {
                            var proOpenmode = $(this).attr('proopenmode');
                            var proCode = $(this).attr('procode');
                            var proName = $(this).attr('proname');
                            var proUrl = $(this).attr('prourl');
                            var proId = $(this).attr('proid');
                            //根据系统ID初始化系统下一级和二级菜单
                            initMenusByProId(proId,proOpenmode,proUrl,proName);
                            $('body').data('_proCode',proCode);
                            //隐藏弹窗
                            $('#proManage').modal('hide');
                            if(proCode=="OA"){
                                //弹出浮动窗口
                                popFloatWindow();
                            }else{
                                //隐藏浮动窗口
                                $('#floatWindowDiv').hide();
                            }
                        });
                        $('.project-item ').append(liObj);

                        $('.project-item ').find('a[procode="EX"]').parent('li').hide();

                        if (i == 0) {
                            firstProA = aObj;
                        }
                    }
                    firstProA.click();

                } else {
                    $.xljUtils.tip('red', '获取系统菜单失败！');
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                if(textStatus=='parsererror'){
                    window.location.href=hostUrl + 'login.html';
                    return;
                }
                if(xhr.status==0){
                    initAllProject();
                    return ;
                }
                $.xljUtils.tip('red', '获取系统菜单失败！');
            }
        });
    }
    initAllProject();

    /**
     * 切换菜单事件
     * @param proUrl 系统首页url
     * @param menuUrl 菜单url
     * @param proMenuName 系统名称
     * @param firstMenuName 一级菜单名称
     * @param secondMenuName 二级菜单名称
     */
    function switchMenu(openMode,proUrl,menuUrl,proMenuName,firstMenuName,secondMenuName) {

        var breadcrumb = $('#breadcrumbContainer').find('.breadcrumb');
        breadcrumb.empty();
        //帮助文档
        var $helpMement = $(".helpMement");
        var helpUrl = "/platform-app/help/web/helper.htm";
        //判断系统菜单是否存在
        if(proMenuName){
            var liObj = $('<li></li>');
            var aObj = $('<a href="javascript:void(0);"></a>');
            liObj.append(aObj);
            aObj.text(proMenuName);
            aObj.on('click',function () {
                switchMenu('1',proUrl,null,proMenuName);
                return false;
            });
            breadcrumb.append(liObj);
        }

        //oa门户切换时不执行系统或菜单的iframe刷新
        var switchPortal = $('body').data('switchPortal');
        if(switchPortal=='true'){
            delete $('body').data()['switchPortal'];
            return;
        }

        //判断一级二级菜单是否存在
        //如果二级菜单不存在，一级菜单存在，则为一级菜单添加链接
        //如果二级菜单和已经菜单都存在则为二级菜单添加链接，一级菜单不添加链接
        if(!secondMenuName&&firstMenuName) {
            var liObj = $('<li></li>');
            var aObj = $('<a href="javascript:;"></a>');
            liObj.append(aObj);
            aObj.text(firstMenuName);
            aObj.on('click',function () {
                switchMenu('1',proUrl,menuUrl,proMenuName,firstMenuName);
                return false;
            });
            breadcrumb.append(liObj);
            $helpMement.attr("href",helpUrl + "#_"+ (menuLocation[firstMenuName] || firstMenuName));
        }else if(firstMenuName&&secondMenuName) {
            var liObj = $('<li></li>');
            liObj.text(firstMenuName);
            breadcrumb.append(liObj);

            var liObj1 = $('<li></li>');
            var aObj1 = $('<a href="javascript:;"></a>');
            liObj1.append(aObj1);
            aObj1.text(secondMenuName);
            aObj1.on('click',function () {
                switchMenu('1',proUrl,menuUrl,proMenuName,firstMenuName,secondMenuName);
                return false;
            });
            breadcrumb.append(liObj1);
            var helpM = "";
            if( firstMenuName == "新闻中心" || firstMenuName == "知识中心"){
                helpM = firstMenuName;
            }else{
                helpM = secondMenuName;
            }
            $helpMement.attr("href",helpUrl + "#_"+menuLocation[helpM]);

        }

        //判断是外部打开还是内部打开：1为内部打开；0为外部打开
        if(openMode=='1'){
            // modify by 王建新 20170718 for 部分IE打开的URL有未转译现象，多decodeURL一次也不会错
            if(!menuUrl){
                proUrl = proUrl.indexOf('?')!=-1?(proUrl+'&_t='+new Date().getTime()):(proUrl+'?_t='+new Date().getTime());
                proUrl = proUrl.replace("&amp;", "&");
                $('#xj-index-iframe').attr('src',decodeURI(proUrl));
            }else{
                menuUrl = menuUrl.indexOf('?')!=-1?(menuUrl+'&_t='+new Date().getTime()):(menuUrl+'?_t='+new Date().getTime());
                $('#xj-index-iframe').attr('src',decodeURI(menuUrl));
            }
        }else{
            if(!menuUrl){

                proUrl = proUrl.indexOf('?')!=-1?(proUrl+'&_t='+new Date().getTime()):(proUrl+'?_t='+new Date().getTime());
                proUrl = proUrl.replace("&amp;", "&");
                window.open(proUrl);
            }else{
                menuUrl = menuUrl.indexOf('?')!=-1?(menuUrl+'&_t='+new Date().getTime()):(menuUrl+'?_t='+new Date().getTime());
                window.open(menuUrl);
            }
        }
        return false;
    }

    /**
     * 将菜单渲染到页面
     * @param parentMenu
     */
    function renderMenu(parentMenu, ulObj) {
        //获取子菜单
        var children = parentMenu.children;
        var menuCode = parentMenu.code;
        var menuId = parentMenu.id;
        var menuName = parentMenu.name;
        if(menuName == "自定义表单" && parentMenu.parentId == "9d6cba61c4b24a5699c339a49471a0e7"){
            return false;
        }
        var openmode = parentMenu.openmode;
        var openmode = parentMenu.openmode;
        var parentId = parentMenu.parentId;
        var resourceurl = parentMenu.resourceurl;
        if($.trim(resourceurl)!=''){
            resourceurl = (resourceurl&&resourceurl.indexOf('?')==-1?(resourceurl + '?btnMenuCode='+menuCode):(resourceurl + '&btnMenuCode='+menuCode));
        }

        var liObj = $('<li></li>');
        //$('.scroll_box ul.navbar-nav').append(liObj);
        ulObj.append(liObj);

        var aObj = $('<a href="javascript:void(0);"></a>');
        liObj.append(aObj);
        aObj.attr('menucode', menuCode);
        aObj.attr('menuId', menuId);
        aObj.attr('menuName', menuName);
        aObj.attr('menuOpenmode', openmode);
        aObj.attr('menuUrl', resourceurl);
        aObj.attr('menuPId', parentId);
        if (!children || children.length == 0) {
            aObj.on('click', function () {
                var openMode,proUrl,menuUrl1,proMenuName,firstMenuName,secondMenuName;

                $('body').data('_menuCode',menuCode);
                var menuPid = $(this).attr('menuPid');
                var firstMenu = $('a[menuid="'+menuPid+'"]');
                if(firstMenu.length>0){
                    var proId = firstMenu.attr('menuPid');
                    var proMenu = $('a[proid="'+proId+'"]');
                    proUrl = proMenu.attr('prourl');
                    proMenuName = proMenu.attr('proName');
                    firstMenuName = firstMenu.attr('menuname');
                    menuUrl1 = $(this).attr('menuUrl');
                    secondMenuName = $(this).attr('menuname');
                }else{
                    var proId = $(this).attr('menuPid');
                    var proMenu = $('a[proid="'+proId+'"]');
                    proUrl = proMenu.attr('prourl');
                    proMenuName = proMenu.attr('proName');
                    menuUrl1 = $(this).attr('menuUrl');
                    firstMenuName = $(this).attr('menuname');
                }
                openMode = $(this).attr('menuopenmode');
                switchMenu(openMode,proUrl,menuUrl1,proMenuName,firstMenuName,secondMenuName);
                return false;
                //隐藏下拉菜单
                //$(this).parent('li').parent('ul.dropdown-menu').dropdown('toggle');
                return false;
            });
            aObj.text(menuName);
        } else {
            liObj.attr('class', 'dropdown');
            //aObj.attr('class', 'dropdown-toggle');
            aObj.attr('id', menuId);
            aObj.attr('data-toggle', 'dropdown');
            aObj.attr('role', 'button');
            aObj.attr('aria-haspopup', 'true');
            aObj.attr('aria-expanded', 'false');
            aObj.text(menuName);
            aObj.append('<span class="caret"></span>');

            var ulObj = $('<ul class="dropdown-menu" ></ul>');
            ulObj.attr('aria-labelledby','"'+menuId+'"');
            liObj.append(ulObj);
            for (var i in children) {
                renderMenu(children[i], ulObj);
            }
        }
    }

    /**
     * 初始化菜单
     * @param appId
     */
    function initMenusByProId(appId,proOpenmode,proUrl,proName) {
        var urlBody = "sys/authentication/getUserAuthenticationMenu?_time="+new Date().getTime();
        var urlAll = hostUrl + urlBody;
        var dataPost = {
            appId: appId,
            menuDelFlag: "0",
            menuStatus: "1"
        };
        $.ajax({
            type: "POST",
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(dataPost),
            async: false,
            success: function (data) {
                if (data.success) {
                    $('.scroll_box ul.navbar-nav').empty();
                    var menus = data.result;
                    for (var i in menus) {
                        var parentMenu = menus[i];
                        renderMenu(parentMenu, $('.scroll_box ul.navbar-nav'));
                    }

                    //切换菜单
                    switchMenu(proOpenmode,proUrl,null,proName);
                    //更换主菜单显示
                    $('.main_menu').empty();
                    $('.main_menu').append('<span class="glyphicon glyphicon-th-large"></span>');
                    $('.main_menu').attr("title",proName);
                    $('.main_menu').append('&nbsp;'+proName);

                    //收藏点击时触发对应菜单点击事件
                    var favoriteLink = $('body').data('favoriteLink');
                    if(favoriteLink=='true'){
                        var _menuCode = $('body').data('_menuCode');
                        if(_menuCode){
                            if(!$('a[menucode="'+_menuCode+'"]')[0]){
                                $('#xj-index-iframe').attr('src','nopower.html');
                                return;
                            }
                            var _menuUrl = $('a[menucode="'+_menuCode+'"]').attr('menuurl');
                            //var menuUrlParam = '';
                            if(_menuUrl&&_menuUrl.indexOf('?')!=-1){
                                //menuUrlParam =  _menuUrl.substring(_menuUrl.indexOf('?'));
                                _menuUrl = _menuUrl.replace(/\?/,'&');
                            }

                            var _menuopenmode = $('a[menucode="'+_menuCode+'"]').attr('menuopenmode');
                            var _proUrl = $('#xj-index-iframe').attr('src');
                            //http://192.168.3.62:100/sa/casUrlLogin?erpUrl=http://192.168.3.6:8080/ad/leave/index.htm&username=admin

                            if(_proUrl.indexOf('casUrlLogin')!=-1) {
                                var _proUrlParam = _proUrl.substring(_proUrl.indexOf('?'));
                                _proUrlParam = _proUrlParam.replace('?', '').replace(/&/g, '","');
                                _proUrlParam = _proUrlParam.replace(/=/g, '":"');
                                var menuUrlObj ;
                                if (_proUrlParam != "") {
                                    _proUrlParam = JSON.parse('{"' + _proUrlParam + '"}');
                                }

                                delete _proUrlParam['_t'];
                                if(_proUrlParam.erpUrl) {
                                    _proUrlParam.erpUrl = _menuUrl;
                                }
                                //delete _proUrlParam['erpUrl'];
                                var targetUrl = _proUrl.substring(0,_proUrl.indexOf('?')+1);
                                for(var item in _proUrlParam){
                                    targetUrl += item + '=' + _proUrlParam[item] + '&';
                                }

                                targetUrl = targetUrl.substring(0,targetUrl.lastIndexOf('&'));
                                //targetUrl = targetUrl+'&'+_menuUrl;
                                $('a[menucode="'+_menuCode+'"]').attr('menuurl',targetUrl).click();

                            }else{
                                $('a[menucode="'+_menuCode+'"]').click();
                            }
                        }


                        delete $('body').data()['favoriteLink'];
                        delete $('body').data()['_menuCode'];
                    }

                    //重新计算menu容器尺寸
                    resizeMenuContainer();
                    //计算iframe尺寸
                    computeIframeHeight();
                    //鼠标滑过隐藏二级菜单
                    hideSecondMenu();
                    //跳转论坛首页
                    if(isFromForum && isFromForum==1){
                        $(".menu_container").find("a[menuName='论坛首页']").click();
                    }

                    if(ie8Match()){
                        $('.navbar-default .scroll_container .navbar-nav > li > a').css({'margin-top':'5px'});
                    }
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                if(textStatus=='parsererror'){
                    window.location.href=hostUrl + 'login.html';
                    return;
                }
                $.xljUtils.tip('red', '获取菜单失败！');
            }
        });
    }

    /**
     * 重新计算菜单容器宽度
     */
    function resizeMenuContainer() {
        var firstVisibleLiObj = $('nav').find('.scroll_box>ul>li:visible')[0];
        var firstVisibleMenuId = $(firstVisibleLiObj).find('a').attr('menuid');
        $('.menu_container a.glyphicon-menu-left').hide();
        $('.menu_container a.glyphicon-menu-right').hide();
        $('nav').find('.scroll_box>ul>li').show();

        var navContainerWidth = $('.xj-index-menu').width();
        var navContainerHeihgt = $('.xj-index-logo').height();
        var navbarRightWidth = $('nav').find('.navbar-right').outerWidth();

        var scrollContainerWidth = navContainerWidth - navbarRightWidth - 150;
        $('nav').find('.scroll_container').width(scrollContainerWidth);
        $('nav').find('.scroll_container').height(60);

        var menuUlObj = $('.scroll_box > ul ');
        var menuLiObjsWidth = 0;
        var menuLiObjs = $('.scroll_box > ul > li:visible');
        $.each(menuLiObjs,function (i,menuLiObj) {
            menuLiObjsWidth += $(menuLiObj).outerWidth();
        });

        $('nav').find('.scroll_box').height(60);
        $('nav').find('.scroll_box').width(menuLiObjsWidth+20);

        var scrollBoxWidth = menuUlObj.width();
        if(scrollContainerWidth<scrollBoxWidth){

            //var allLiObjs = $('.scroll_box > ul > li');
            //for (var i = 0; i < allLiObjs.length; i++) {
            //    var obj = $(allLiObjs[i]);
            //    var menuAObj = obj.find('a[menuid="'+firstVisibleMenuId+'"]');
            //    if(menuAObj[0]){
            //        break;
            //    }
            //    obj.hide();
            //}
            //var menuAObj = obj.find('a[menuid="'+firstVisibleMenuId+'"]');
            //var prevLiObjs = menuAObj.parent('li').prevAll();
            /*for (var i = prevLiObjs.length-1; i >= 0; i--) {
             var obj1 = prevLiObjs[i];
             if(($('.scroll_container').width()+10)<=$('nav').find('.scroll_box>ul').width()){
             break;
             }
             $(obj1).show();
             }*/

            var menuLis = $('.scroll_box > ul > li:visible');
            for (var i = menuLis.length-1; i > 0; i--) {

                if($('nav').find('.scroll_box>ul').width()+30>$('.scroll_container').width()){
                    var menuLi = menuLis[i];
                    $(menuLi).hide();
                    menuLiObjsWidth = menuLiObjsWidth-$(menuLi).width();

                }

            }
            $('nav').find('.scroll_box').width(menuLiObjsWidth+30);
            if($('.scroll_box > ul > li:last').is(':hidden')){
                $('.menu_container a.glyphicon-menu-right').show();
            }
            if($('.scroll_box > ul > li:first').is(':hidden')){
                $('.menu_container a.glyphicon-menu-left').show();
            }
            $('nav').find('.scroll_container').width(menuUlObj.outerWidth());
        }else{
            $('.menu_container a.glyphicon-menu-left').hide();
            $('.menu_container a.glyphicon-menu-right').hide();
            $('nav').find('.scroll_box>ul>li').show();
            $('nav').find('.scroll_container').width(menuUlObj.outerWidth());
        }
    }

    $('.menu_container a.glyphicon-menu-right').on('click',function () {
        var menuLis = $('.scroll_box > ul > li:visible');
        if($('.scroll_box > ul > li:last').is(':visible')){
            return;
        }

        $('.menu_container a.glyphicon-menu-left').show();
        $(menuLis[0]).hide();
        $(menuLis[menuLis.length-1]).next('li').show();

        if($('.scroll_box > ul > li:last').is(':visible')){
            $('.menu_container a.glyphicon-menu-right').hide();
            return;
        }
        return false;
    });

    $('.menu_container a.glyphicon-menu-left').on('click',function () {
        var menuLis = $('.scroll_box > ul > li:visible');

        if($('.scroll_box > ul > li:first').is(':visible')){
            return;
        }
        $('.menu_container a.glyphicon-menu-right').show();
        $(menuLis[0]).prev('li').show();
        $(menuLis[menuLis.length-1]).hide();

        if($('.scroll_box > ul > li:first').is(':visible')){
            $('.menu_container a.glyphicon-menu-left').hide();
        }
        return false;
    });


    //window改变大小事件
    $(window).on('resize',function () {
        resizeMenuContainer();
        computeIframeHeight();
    });

    //首页logo点击事件
    $('#logoImg').on('click',function () {
        openOaPortal();
    });

    //打开oa首页
    function openOaPortal() {
        var currentPortalPageId = $(window.document.body).data('currentPortalPageId');
        if(currentPortalPageId){
            $('.project-item').find('a[procode="OA"]').click();
            $('#xj-index-iframe').attr('src', hostUrl + 'oa/portal/portal_view_copy.html?portalPageId='+currentPortalPageId + '&_t='+new Date().getTime());
            return;
        }

        $.ajax({
            url:hostUrl + 'oa/portal/portalPage/getPortalWithPermision?_t='+new Date().getTime(),
            type:'GET',
            async:false,
            dataType:'JSON',
            success:function (resultData) {
                if(resultData&&resultData.success){
                    var result = resultData.result;
                    if(result) {
                        var portalPageId = result.id;
                        $('.project-item').find('a[procode="OA"]').click();
                        $(window.document.body).data('currentPortalPageId',portalPageId);
                        $('#xj-index-iframe').attr('src', hostUrl + 'oa/portal/portal_view_copy.html?portalPageId='+portalPageId+'&_t='+new Date().getTime());
                    }else{
                        $.xljUtils.tip('red','门户信息获取失败，请联系管理员！');
                    }

                }else{
                    $.xljUtils.tip('red','门户信息获取失败，请联系管理员！');
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }

        });
        //弹出浮动窗口
        popFloatWindow();
    }


    //点击首页图标，刷新默认首页
    $('#portalHomeLi a').on('click',function () {
        openOaPortal();
    });
    //问题反馈
    $('#feedback').on('click',function () {
        window.open(hostUrl + "oa/feedback/feedback_edit.html?type=add");
    });

    //初始化所有portal列表
    function initPortalHomeList() {
        //如果首页列表不为空则不进行加载
        //if($('#portalHomeMenu li').length==0){
        $.ajax({
            url:hostUrl + 'oa/portal/portalPage/getPortalListWithPermision?_t='+new Date().getTime(),
            type:'GET',
            dataType:'JSON',
            success:function (resultData) {
                if(resultData&&resultData.success){
                    var result = resultData.result;
                    if(result&&$.isArray(result)) {
                        $('#portalHomeMenu').empty();
                        for (var j = 0; j < result.length; j++) {
                            var obj = result[j];
                            var portalPageId = obj.id;
                            var liObj = $('<li ></li>');
                            var aObj = $('<a></a>');
                            liObj.append(aObj);
                            aObj.attr('href','javascript:void(0)');
                            aObj.attr('onclick','switchPortalPage("'+portalPageId+'")');
                            aObj.text(obj.portalPageName);
                            aObj.attr('id',portalPageId);
                            $('#portalHomeMenu').append(liObj);
                        }

                        var currentPortalPageId = $(window.document.body).data('currentPortalPageId');//document.getElementById('xj-index-iframe').contentWindow.currentPortalPageId;
                        if(currentPortalPageId) {
                            $('#portalHomeMenu').find('a>span').remove();
                            $('#portalHomeMenu').find('a[id="'+currentPortalPageId+'"]').append('<span style="margin-left:10px;" class="fa fa-home"></span>');
                        }

                    }else{
                        $.xljUtils.tip('red','门户信息获取失败，请联系管理员！');
                    }

                }else{
                    $.xljUtils.tip('red','门户信息获取失败，请联系管理员！');
                }
            },
            error:function (xhr) {
                $.xljUtils.getError(xhr.status);
            }

        });
        /*$('#portalHomeMenu').on('mouseleave',function() {
         $(this).dropdown('toggle');
         });*/
        //hideMenu();
        /*}else{
         var currentPortalPageId = $(window.document.body).data('currentPortalPageId');//document.getElementById('xj-index-iframe').contentWindow.currentPortalPageId;
         /!*if(!currentPortalPageId){
         currentPortalPageId = $(window.document.body).data('currentPortalPageId');//document.getElementById('xj-index-iframe').contentWindow.currentPortalPageId;
         }else {
         $(window.document.body).data('currentPortalPageId',currentPortalPageId);
         }*!/
         if(currentPortalPageId) {
         $('#portalHomeMenu').find('a>span').remove();
         $('#portalHomeMenu').find('a[id="'+currentPortalPageId+'"]').append('<span style="margin-left:10px;" class="fa fa-home"></span>');
         }
         }*/

    }

    //拥有权限的首页列表
    $('#portalHomeLi span.caret').on('click',function () {
        initPortalHomeList();
    });

    //消息按钮事件
    $('#msgBtn').on('click',function () {
        //platform-app/flow/sysNoticeMsg/queryFirstTypeStatData
        initMsgRemind();
    });
    function initMsgRemind() {
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: hostUrl + "flow/sysNoticeMsg/queryFirstTypeStatData",
            data: JSON.stringify({}),
            dataType: "JSON",
            async:false,
            success: function (resultData) {
                if(resultData.success){
                    var result = resultData.result;
                    var taskToDoSum = result?result.taskToDoSum:0;//流程
                    var meetingSum = result?result.meetingSum:0;//会议
                    var scheduleSum = result?result.scheduleSum:0;//日程
                    var newsSum = result?result.newsSum:0;//新闻
                    var directorsSum = result?result.directorsSum:0;//董办
                    var clockInSum = result?result.clockInSum:0;//打卡
                    var otherSum = result?result.otherSum:0;//打卡
                    //TASKTODO:代办；MEETING：会议；SCHEDULE：日程；NEWS：新闻；DIRECTORS：董办平台；CLOCKIN：打卡；
                    $('#msgList').html('');
                    if(!result){
                        result = {
                            taskToDoSum:0,
                            meetingSum:0,
                            scheduleSum:0,
                            newsSum:0,
                            otherSum:0
                        };
                    }
                    for(var item in result){
                        switch (item){
                            case 'taskToDoSum':
                                $('#msgList').append('<li><a href="javascript:void(0);" class="clearfix" onclick="openMsgList(this)" data-msgtype="TASKTODO" ><span style="float:left;">流程提醒</span><span style="padding-left: 10px;float:right;">'+result[item]+'</span></a></li>');
                                break;
                            case 'meetingSum':
                                $('#msgList').append('<li><a href="javascript:void(0);" class="clearfix" onclick="openMsgList(this)" data-msgtype="MEETING" ><span style="float:left;">会议提醒</span><span style="padding-left: 10px;float:right;">'+result[item]+'</span></a></li>');
                                break;
                            case 'scheduleSum':
                                $('#msgList').append('<li><a href="javascript:void(0);" class="clearfix" onclick="openMsgList(this)" data-msgtype="SCHEDULE" ><span style="float:left;">日程提醒</span><span style="padding-left: 10px;float:right;">'+result[item]+'</span></a></li>');
                                break;
                            case 'newsSum':
                                $('#msgList').append('<li><a href="javascript:void(0);" class="clearfix" onclick="openMsgList(this)" data-msgtype="NEWS" ><span style="float:left;">新闻提醒</span><span style="padding-left: 10px;float:right;">'+result[item]+'</span></a></li>');
                                break;
                            case 'otherSum':
                                $('#msgList').append('<li><a href="javascript:void(0);" class="clearfix" onclick="openMsgList(this)" data-msgtype="OTHER" ><span style="float:left;">其他提醒</span><span style="padding-left: 10px;float:right;">'+result[item]+'</span></a></li>');
                                break;
                            default:
                                break;
                        }
                    }
                    if(result&&(taskToDoSum>0||meetingSum>0||scheduleSum>0||newsSum>0||otherSum>0)){
                        $('#msgBtn').find('span').text('.');
                    }else{
                        $('#msgBtn').find('span').text('');
                    }
                }
            }
        });
    }
    initMsgRemind();

    window.openMsgList = function (ele) {
        var firstType = $(ele).attr('data-msgtype');

        window.open(hostUrl + 'flow/runtime/mytask/task_list.html?firstType='+firstType);
    };

    //收藏按钮点击事件
    $('#favoriteBtn').on('click',function () {
        //initSaveFavorite();
        initFavoriteTree();
        $('#favoriteContainer').show();
    });

    //关闭收藏夹
    $('#closeFavoriteContainerBtn').on('click',function () {
        $('#favoriteContainer').hide();
    });

    //保存收藏事件
    $('#saveFavoriteBtn').on('click',function () {
        $('#favoriteForm').attr('action',hostUrl+'oa/favorite/save');
        var url = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: url,
            async:false,
            success: function (data) {
                var guuid = data.result;
                $("#favoriteId").val(guuid);
                $("#favoriteCode").val(guuid);
            }
        });
        $('#favoriteForm').submit();
    });

    //保存收藏夹按钮事件
    $('#saveParentFavoriteBtn').on('click',function () {
        $('#parentFavoriteForm').attr('action',hostUrl+'oa/favorite/save');
        var url = hostUrl + "generator/getGuuid" + "?time=" + Math.random();
        $.ajax({
            type: 'get',
            url: url,
            async:false,
            success: function (data) {
                var guuid = data.result;
                $("#parentFavoriteId").val(guuid);
                $("#parentFavoriteCode").val(guuid);
            }
        });
        $('#parentFavoriteForm').submit();
    });

    //初始化创建一个个人默认文件夹
    function initSaveFavorite() {
        var favoriteObj = {};
        favoriteObj.name="收藏夹";
        favoriteObj.code = "ROOT_FAVORITE";
        favoriteObj.isFavorite = true;
        $.ajax({
            type: "POST",
            url: hostUrl + "oa/favorite/save",
            data: JSON.stringify(favoriteObj),
            dataType: "json",
            contentType: 'application/json',
            success: function (resultData) {
                var successFlag = resultData.success;
                if(successFlag) {
                    var result = resultData.result;
                    var optObj = $('<option></option>');
                    optObj.val(result.id);
                    optObj.text(result.name);
                    $('#favoriteParentId').append(optObj);

                    optObj = $('<option></option>');
                    optObj.val(result.id);
                    optObj.text(result.name);
                    $('#parentFavoriteParentId').append(optObj);
                }

            }
        });
    }

    //初始化收藏夹树
    function initFavoriteTree() {
        $.ajax({
            type: "POST",
            url: hostUrl + "oa/favorite/queryList?_t="+new Date().getTime(),
            data: JSON.stringify({}),
            dataType: "json",
            contentType: 'application/json',
            success: function (typeNodes) {
                if(typeNodes.success) {
                    var zNodes = typeNodes.result;
                    if(!zNodes||zNodes.length==0){
                        zNodes = [];
                        zNodes.push();
                        //return;
                    }

                    for (var j = 0; j < zNodes.length; j++) {
                        var zNode = zNodes[j];

                        if(zNode.isFavorite){

                            var optObj = $('<option></option>');
                            optObj.val(zNode.id);
                            optObj.text(zNode.name);
                            var existOption = $('#favoriteParentId option[value="'+zNode.id+'"]');
                            if(existOption.length==0) {
                                $('#favoriteParentId').append(optObj);
                            }


                            var optObj1 = $('<option></option>');
                            optObj1.val(zNode.id);
                            optObj1.text(zNode.name);
                            var existOption = $('#parentFavoriteParentId option[value="'+zNode.id+'"]');
                            if(existOption.length==0) {
                                $('#parentFavoriteParentId').append(optObj1);
                            }
                            zNode.isParent = true;
                        }
                    }
                    var setting = {

                        data:{
                            simpleData:{
                                enable:true,
                                idKey:'id',
                                pIdKey:'parentId',
                                rootPId:null
                            }
                        },
                        callback:{
                            onExpand:function (event, treeId, treeNode) {
                                $.xljUtils.treeResizeFn('favorite-tree');
                            },
                            onCollapse: function(){
                                $.xljUtils.treeResizeFn('favorite-tree');
                            },
                            onClick:function (event, treeId, treeNode) {
                                if(!treeNode.isFavorite){
                                    if(treeNode.linkType=='INNER'){
                                        var menuUrl = treeNode.resourceLink.substring(treeNode.resourceLink.indexOf('?'));
                                        var url = treeNode.resourceLink;
                                        var _proCode ;
                                        var _menuCode ;
                                        if(menuUrl){
                                            menuUrl = menuUrl.replace("?", "").replace(/&/g, "\",\"");
                                            menuUrl = menuUrl.replace(/=/g, '":"');
                                            var menuUrlObj ;
                                            if (menuUrl != "") {
                                                menuUrlObj = JSON.parse('{"' + menuUrl + '"}');
                                            }

                                            if(menuUrlObj){
                                                _proCode =  menuUrlObj._proCode;
                                                _menuCode =  menuUrlObj._menuCode;
                                                $('body').data('_menuCode',_menuCode);
                                                $('body').data('favoriteLink','true');
                                                //切换系统
                                                $('ul.project-item a[procode="'+_proCode+'"]').click();

                                                url = url.replace('_proCode='+_proCode,'');
                                                url = url.replace('_menuCode='+_proCode,'');
                                            }
                                        }
                                        switchPro(_proCode,_menuCode);
                                        //$('#xj-index-iframe').attr('src',url);
                                    }else{
                                        window.open(treeNode.resourceLink,'_blank');
                                    }
                                    $('#favoriteContainer').hide();
                                }
                            },
                            onRightClick:function (event,treeId,treeNode) {

                            },
                            beforeRemove:function (treeId,treeNode) {
                                var id = treeNode.id;
                                var flag = false;
                                if(treeNode.children&&treeNode.children.length>0){
                                    $.xljUtils.tip('blue','此收藏夹下有收藏项目，请先删除收藏项目！');
                                    return;
                                }
                                /*$.xljUtils.confirm('blue', '确定要删除吗？', function () {

                                 },true);*/
                                $.xljUtils.confirm('blue','确定要删除收藏【'+treeNode.name+'】吗？',function () {
                                    $.ajax({
                                        url: hostUrl + "oa/favorite/delete/" + id,
                                        type: 'DELETE',
                                        dataType: 'JSON',
                                        success: function (resultData) {
                                            if (resultData && resultData.success) {
                                                $.xljUtils.tip('green', "数据删除成功！");
                                                $('#favoriteParentId option[value="'+id+'"]').remove();
                                                $('#parentFavoriteParentId option[value="'+id+'"]').remove();
                                                //initFavoriteTree();
                                                var ztreeObj = $.fn.zTree.getZTreeObj(treeId);
                                                ztreeObj.removeNode(treeNode);

                                                flag = true;
                                            } else {
                                                $.xljUtils.tip('red', "删除数据失败！");
                                            }
                                        }
                                    });
                                },true);
                                return flag;
                            },
                            beforeRename:function (treeId,treeNode,newName) {
                                var jsonData = {};
                                jsonData.id = treeNode.id;
                                jsonData.name = newName;
                                var flag = false;
                                $.ajax({
                                    url:hostUrl+'oa/favorite/update/'+treeNode.id,
                                    data:JSON.stringify(jsonData),
                                    type:'PUT',
                                    contentType:'application/json',
                                    dataType:'JSON',
                                    async:false,
                                    success:function (resultData ) {
                                        if(resultData) {
                                            var successFlag = resultData.success;
                                            var result = resultData.result;
                                            var msg = resultData.msg;
                                            if(successFlag) {
                                                $('#favoriteParentId option[value="'+treeNode.id+'"]').text(treeNode.name);
                                                $('#parentFavoriteParentId option[value="'+treeNode.id+'"]').text(treeNode.name);
                                                $.xljUtils.tip('green', "重命名成功！");
                                                flag = true;
                                            }else{
                                                $.xljUtils.tip('red', "重命名失败！");
                                            }
                                        }

                                    },
                                    error:function (XMLHttpRequest, textStatus, errorThrown) {
                                        var status = XMLHttpRequest.status;
                                        $.xljUtils.getError(status);
                                    }
                                });


                                return flag;
                            }
                        },
                        edit:{
                            enable:true,
                            removeTitle:'删除',
                            renameTitle:'重命名',
                            shownRemoveBtn:true,
                            shownRenameBtn:true
                        }

                    };
                    zTreeObj = $.fn.zTree.init($("#favoriteTree"), setting, zNodes);
                    var nodes = zTreeObj.getNodes();
                    //默认展开第一个节点
                    zTreeObj.expandNode(nodes[0], true, false, false,false);
                    //zTreeObj.selectNode(nodes[0]);
                    //zTreeObj.setting.callback.onClick(null, zTreeObj.setting.treeId, nodes[0]);
                    setTimeout(function(){
                        $.xljUtils.addTreeScroll('favorite-tree');
                        $.xljUtils.treeResizeFn('favorite-tree');
                    },300);
                }else{

                }
            }
        });
    }

    //收藏夹/收藏弹出框显示时初始化收藏数据
    $('#favoriteModal').on('shown.bs.modal',function () {
        var resourceLink = $('#xj-index-iframe').attr('src');
        var favoriteName = '';
        try {
            favoriteName = $(document.getElementById('xj-index-iframe').contentWindow.document.getElementsByTagName('title')[0]).text();
        }catch (e){

        }

        if($.trim(favoriteName)=='') {
            favoriteName = resourceLink;
        }

        if(resourceLink.indexOf('?')!=-1){
            if(resourceLink.indexOf('_proCode')==-1){
                resourceLink += '&_proCode=' + $('body').data('_proCode');
            }

            if(resourceLink.indexOf('_menuCode')==-1){
                resourceLink += '&_menuCode=' + $('body').data('_menuCode');
            }
        }else{
            if(resourceLink.indexOf('_proCode')==-1){
                resourceLink += '?_proCode=' + $('body').data('_proCode');
            }
            if(resourceLink.indexOf('_menuCode')==-1){
                resourceLink += '&_menuCode=' + $('body').data('_menuCode');
            }
        }

        $('#resourceLink').val(resourceLink);
        $('#favoriteName').val(favoriteName);
    });

    //收藏夹/收藏弹出框隐藏事件
    $('#favoriteModal').on('hidden.bs.modal',function () {
        $('#favoriteForm')[0].reset();
    });
    $('#parentFavoriteModal').on('hidden.bs.modal',function () {
        $('#parentFavoriteForm')[0].reset();
    });

    //弹出浮动窗口
    function popFloatWindow() {
        try{
            $.ajax({
                type:'GET',
                url: hostUrl+'oa/sys/sysFloatWindow/get/portal'+'?_t'+new Date().getTime(),
                dataType:'json',
                contentType:'application/json',
                //async: true,
                success: function(json) {
                    if(json.success){
                        var data = json.result;
                        var top = data.top;
                        var width = data.width;
                        var left = data._left;
                        var height = data.height;
                        var delayInterval = data.delayInterval;
                        var showInterval = data.showInterval;
                        var url  = data.url;
                        var file = data.file;
                        var a = $('<a>');
                        if(''!=url&&null!=url){
                            a.prop('href',url);
                            a.prop('target','_blank');
                        }else{
                            a.prop('href','#');
                        }
                        var img = $('<img style="width: 100%;height: 100%;">');
                        if(""!=file&&null!=file){
                            img.prop('src',file);
                        }

                        a.append(img);
                        $('#floatWindowDiv').empty();
                        var closeDiv = $('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                        //关闭浮动窗口按钮
                        closeDiv.click(function () {
                            $('#floatWindowDiv').hide();
                        });
                        $('#floatWindowDiv').append(closeDiv);
                        $('#floatWindowDiv').append(a);
                        $("#floatWindowDiv").css({"width":parseInt(width)+"px","height":parseInt(height)+"px","marginTop":-(parseInt(height)/2)+"px","marginLeft":-(parseInt(width)/2)+"px"});
                        setTimeout(function(){
                            $('#floatWindowDiv').show();
                            $('#closeFloatWindowBtn').show();
                            setTimeout(function(){
                                $('#floatWindowDiv').hide();
                            },showInterval);
                        },delayInterval);


                    }else{

                    }
                }
            })
        }catch (e){

        }
    }

    /**
     * 导航下拉菜单添加鼠标划过隐藏功能
     */
    function hideMenu() {
        $('.navbar-right').find('.dropdown-menu').on('mouseleave',function() {
            $(this).prev().click();
        });
    }
    //导航右侧下拉隐藏
    hideMenu();

    function hideSecondMenu() {
        $('.scroll_box').find('.dropdown-menu').on('mouseleave',function() {
            $(this).prev().click();
        });
    }

    function ie8Match() {
        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
            return true;
        }

        return false;
    }

    if(ie8Match()){
        $('.navbar-default .navbar-nav > LI.home > A').css({'margin-top':'6px'});
        $('#portalHomeMenu').css({'margin-top':'4px'});
        $('#msgList').css({'margin-top':'8px'});
    }

    function switchThirdMenu() {
        var urlParams = $.xljUtils.getUrlParams();
        var proCode = urlParams.proCode;
        var menuCode = urlParams.menuCode;
        if(proCode&&menuCode){
            if(menuCode=='NEWS_MANAGE'){
                switchPro(proCode,menuCode);
                setTimeout(function () {
                    $($('a[menucode="NEWS_MANAGE"]').siblings('ul').find('li')[0]).find('a').click()
                },1000);

            }else{
                switchPro(proCode,menuCode);
            }

        }
    }
    switchThirdMenu();
});


//关闭收藏bain编辑弹出框
function closeFavoriteModal(isParent,resultData) {
    if(resultData.success) {
        var result = resultData.result;
        if(isParent) {
            $.xljUtils.tip('green','文件夹创建成功');
            var optObj = $('<option></option>');
            optObj.val(result.id);
            optObj.text(result.name);
            $('#favoriteParentId').append(optObj);

            optObj = $('<option></option>');
            optObj.val(result.id);
            optObj.text(result.name);
            $('#parentFavoriteParentId').append(optObj);
            $('#parentFavoriteModal').modal('hide');
            result.isParent = true;

        }else{
            $.xljUtils.tip('green','添加收藏成功');
            $('#favoriteModal').modal('hide');
            result.isParent = false;
        }

        var favoriteTree = $.fn.zTree.getZTreeObj('favoriteTree');
        var pNode = favoriteTree.getNodeByParam('id',result.parentId);
        favoriteTree.addNodes(pNode,result);
        favoriteTree.updateNode(result);

    }else{
        if(isParent) {
            $.xljUtils.tip('red','文件夹创建失败');
        }else{
            $.xljUtils.tip('red','添加收藏失败');
        }
    }

    $('#favoriteForm').reset();
    $('#parentFavoriteForm').reset();
}

//门户切换
function switchPortalPage(portalPageId) {
    //$('#portalHomeMenu').dropdown('toggle');
    $('#portalHomeMenu').find('a>span').remove();
    $('#portalHomeMenu').find('a[id="'+portalPageId+'"]').append('<span style="margin-left:10px;" class="fa fa-home"></span>');

    $('body').data('switchPortal','true');
    $(window.document.body).data('currentPortalPageId',portalPageId);
    $('.project-item').find('a[procode="OA"]').click();
    $('#xj-index-iframe').attr('src', hostUrl + 'oa/portal/portal_view_copy.html?portalPageId='+portalPageId + '&_t='+new Date().getTime());

}

//切换菜单，供iframe子页面调用
function switchPro(_proCode,_menuCode) {
    if(_menuCode) {
        $('body').data('_menuCode',_menuCode);
    }

    $('body').data('favoriteLink','true');

    //切换系统
    $('ul.project-item a[procode="'+_proCode+'"]').click();

}

//为portal子页面调用使用
function storeCurrentPortalId(currentPortalId) {
    $(window.document.body).data('currentPortalPageId',currentPortalId);
}

function reloadPage(updatePortalId) {
    $(window.document.body).data('currentPortalPageId',updatePortalId);
    $('.project-item').find('a[procode="OA"]').click();
    $('#xj-index-iframe').attr('src', hostUrl + 'oa/portal/portal_view_copy.html?portalPageId='+updatePortalId + '&_t='+new Date().getTime());
}