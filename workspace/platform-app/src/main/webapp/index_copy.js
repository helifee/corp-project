$(function () {
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

    /**
     * 初始化所有系统
     */
    function initAllProject() {
        var urlBody = "sys/authentication/getUserAuthenticationApp";
        var urlAll = hostUrl + urlBody;
        var postdata = {
            appDelFlag: "0",
            appStatus: "1"
        };
        $.ajax({
            type: 'POST',
            url: urlAll,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(postdata),
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
                        var proUrl = project.resourceUrl;
                        var liObj = $('<li></li>');
                        $('.project-item ').append(liObj);

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
                            iconObj.attr('class', proIcon);
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
                            initMenusByProId(proId);
                            $('body').data('_proCode',proCode);
                            //切换菜单
                            switchMenu(proOpenmode,proUrl,null,proName);
                            //更换主菜单显示
                            $('.main_menu').empty();
                            $('.main_menu').append('<span class="glyphicon glyphicon-th-large"></span>');
                            $('.main_menu').append('&nbsp;'+proName);
                            //隐藏弹窗
                            $('#proManage').modal('hide');
                        });
                        if (i == 0) {
                            firstProA = aObj;
                        }
                    }
                    firstProA.click();

                } else {
                    $.xljUtils.tip('red', '获取系统菜单失败！');
                }
            },
            error: function (xhr) {
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
        //判断系统菜单是否存在
        if(proMenuName){
            var liObj = $('<li></li>');
            var aObj = $('<a href="javascript:void(0);"></a>');
            liObj.append(aObj);
            aObj.text(proMenuName);
            aObj.on('click',function () {
                switchMenu('1',proUrl,null,proMenuName);
            });
            breadcrumb.append(liObj);
        }

        //判断一级二级菜单是否存在
        //如果二级菜单不存在，一级菜单存在，则为一级菜单添加链接
        //如果二级菜单和已经菜单都存在则为二级菜单添加链接，一级菜单不添加链接
        if(!secondMenuName&&firstMenuName) {
            var liObj = $('<li></li>');
            var aObj = $('<a href="javascript:void(0);"></a>');
            liObj.append(aObj);
            aObj.text(firstMenuName);
            aObj.on('click',function () {
                switchMenu('1',proUrl,menuUrl,proMenuName,firstMenuName);
            });
            breadcrumb.append(liObj);
        }else if(firstMenuName&&secondMenuName) {
            var liObj = $('<li></li>');
            liObj.text(firstMenuName);
            breadcrumb.append(liObj);

            var liObj1 = $('<li></li>');
            var aObj1 = $('<a href="javascript:void(0);"></a>');
            liObj1.append(aObj1);
            aObj1.text(secondMenuName);
            aObj1.on('click',function () {
                switchMenu('1',proUrl,menuUrl,proMenuName,firstMenuName,secondMenuName);
            });
            breadcrumb.append(liObj1);
        }

        //判断是外部打开还是内部打开：1为内部打开；0为外部打开
        if(openMode=='1'){

            if(!menuUrl){
                $('#xj-index-iframe').attr('src',proUrl);
            }else{
                $('#xj-index-iframe').attr('src',menuUrl);
            }
        }else{
            if(!menuUrl){
                window.open(proUrl);
            }else{
                window.open(menuUrl);
            }
        }


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
        var openmode = parentMenu.openmode;
        var openmode = parentMenu.openmode;
        var parentId = parentMenu.parentId;
        var resourceurl = parentMenu.resourceurl;

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

                //隐藏下拉菜单
                $(this).parent('li').parent('ul.dropdown-menu').dropdown('toggle');
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
    function initMenusByProId(appId) {
        var urlBody = "sys/authentication/getUserAuthenticationMenu";
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
            success: function (data) {
                if (data.success) {
                    $('.scroll_box ul.navbar-nav').empty();
                    var menus = data.result;
                    for (var i in menus) {
                        var parentMenu = menus[i];
                        renderMenu(parentMenu, $('.scroll_box ul.navbar-nav'));
                    }

                    //收藏点击时触发对应菜单点击事件
                    var favoriteLink = $('body').data('favoriteLink');
                    if(favoriteLink=='true'){
                        var _menuCode = $('body').data('_menuCode');
                        $('a[menucode="'+_menuCode+'"]').click();
                    }

                    //导航下拉菜单添加鼠标划过隐藏功能
                    hideMenu();
                    //重新计算menu容器尺寸
                    resizeMenuContainer();
                    //计算iframe尺寸
                    computeIframeHeight();
                }
            },
            error: function (xhr) {
                $.xljUtils.tip('red', '获取菜单失败！');
            }
        });
    }

    /**
     * 重新计算菜单容器宽度
     */
    function resizeMenuContainer() {
        var navContainerWidth = $('.xj-index-menu').width();
        var navContainerHeihgt = $('.xj-index-logo').height();
        var navbarRightWidth = $('nav').find('.navbar-right').outerWidth();

        var scrollContainerWidth = navContainerWidth - navbarRightWidth - 200;
        $('nav').find('.scroll_container').width(scrollContainerWidth);
        $('nav').find('.scroll_container').height(navContainerHeihgt);

        var menuUlObj = $('.scroll_box > ul ');
        var menuLiObjsWidth = 0;
        var menuLiObjs = $('.scroll_box > ul > li');
        $.each(menuLiObjs,function (i,menuLiObj) {
            menuLiObjsWidth += $(menuLiObj).outerWidth();
        });

        $('nav').find('.scroll_box').height(navContainerHeihgt);
        $('nav').find('.scroll_box').width(menuLiObjsWidth);

        var scrollBoxWidth = menuUlObj.width();
        if(scrollContainerWidth<scrollBoxWidth){
            $('.menu_container a.glyphicon-menu-left').show();
            $('.menu_container a.glyphicon-menu-right').show();
            var menuLis = $('.scroll_box > ul > li:visible');
            for (var i = menuLis.length-1; i > 0; i--) {
                if(($('.scroll_container').width()+10)>$('nav').find('.scroll_box>ul').width()){
                    break;
                }
                var menuLi = menuLis[i];
                $(menuLi).hide();
            }
        }else{
            $('.menu_container a.glyphicon-menu-left').hide();
            $('.menu_container a.glyphicon-menu-right').hide();
            $('nav').find('.scroll_box>ul>li').show();
        }

    }

    $('.menu_container a.glyphicon-menu-left').on('click',function () {
        var menuLis = $('.scroll_box > ul > li:visible');
        if($('.scroll_box > ul > li:last').is(':visible')){
            return;
        }
        $(menuLis[0]).hide();
        $(menuLis[menuLis.length-1]).next('li').show();
    });

    $('.menu_container a.glyphicon-menu-right').on('click',function () {
        var menuLis = $('.scroll_box > ul > li:visible');
        if($('.scroll_box > ul > li:first').is(':visible')){
            return;
        }
        $(menuLis[0]).prev('li').show();
        $(menuLis[menuLis.length-1]).hide();
    });

    /**
     * 固定iframe高度
     */
    window.computeIframeHeight = function (isOa) {
        $('.embed-responsive-4by3').css({overflow:'hidden',width:'100%'});

        $('.embed-responsive-4by3').height($(window).height() -$("#headerContainer").outerHeight()-$("#breadcrumbContainer:visible").outerHeight());

    };

    //window改变大小事件
    $(window).on('resize',function () {
        resizeMenuContainer();
        //computeIframeHeight();
    });

    //首页logo点击事件
    $('#logoImg').on('click',function () {
        openOaPortal();
    });

    //打开oa首页
    function openOaPortal() {
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
    }

    //点击首页图标，刷新默认首页
    $('#portalHomeLi a').on('click',function () {
        openOaPortal();
    });

    //初始化所有portal列表
    function initPortalHomeList() {
        //如果首页列表不为空则不进行加载
        if($('#portalHomeMenu li').length==0){
            $.ajax({
                url:hostUrl + 'oa/portal/portalPage/getPortalListWithPermision?_t='+new Date().getTime(),
                type:'GET',
                dataType:'JSON',
                success:function (resultData) {
                    if(resultData&&resultData.success){
                        var result = resultData.result;
                        if(result&&$.isArray(result)) {
                            for (var j = 0; j < result.length; j++) {
                                var obj = result[j];
                                var portalPageId = obj.id;
                                var liObj = $('<li ></li>');
                                var aObj = $('<a></a>');
                                liObj.append(aObj);
                                aObj.attr('href','javascript:void(0)');
                                aObj.attr('onclick','switchPortalPage("'+portalPageId+'")');
                                aObj.text(obj.portalPageName);
                                $('#portalHomeMenu').append(liObj);
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
        }
    }
    //拥有权限的首页列表
    $('#portalHomeLi span.caret').on('click',function () {
        initPortalHomeList();
    });

    //消息按钮事件
    $('#msgBtn').on('click',function () {
        //platform-app/flow/sysNoticeMsg/queryFirstTypeStatData
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
                    var taskToDoSum = result.taskToDoSum;//流程
                    var meetingSum = result.meetingSum;//会议
                    var scheduleSum = result.scheduleSum;//日程
                    var newsSum = result.newsSum;//新闻
                    var directorsSum = result.directorsSum;//董办
                    var clockInSum = result.clockInSum;//打卡
                    $('#msgList').html('');
                    $('#msgList').append('<li><a href="javascript:void(0);" >日程提醒<span style="padding-left: 10px;float:right;">'+scheduleSum+'</span></a></li>');
                    $('#msgList').append('<li><a href="javascript:void(0);" >会议提醒<span style="padding-left: 10px;float:right;">'+meetingSum+'</span></a></li>');
                    $('#msgList').append('<li><a href="javascript:void(0);" >流程提醒<span style="padding-left: 10px;float:right;">'+taskToDoSum+'</span></a></li>');
                }
            }
        });
    });

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
        var url = baseUrl + "generator/getGuuid" + "?time=" + Math.random();
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
        var url = baseUrl + "generator/getGuuid" + "?time=" + Math.random();
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

                                        $('#xj-index-iframe').attr('src',url);
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
        var favoriteName = $(document.getElementById('xj-index-iframe').contentWindow.document.getElementsByTagName('title')[0]).text();
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
                async: true,
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

    //弹出浮动窗口
    popFloatWindow();

    //关闭浮动窗口按钮
    $('#closeFloatWindowBtn').click(function () {
        $('#floatWindowDiv').hide();
    });

    /**
     * 导航下拉菜单添加鼠标划过隐藏功能
     */
    function hideMenu() {
        $('.dropdown-menu').on('mouseleave',function() {
            $(this).prev().click();
        })
    }
    hideMenu();

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
    //aObj.on('click',function () {
    $('.project-item').find('a[procode="OA"]').click();
    $('#xj-index-iframe').attr('src', hostUrl + 'oa/portal/portal_view_copy.html?portalPageId='+portalPageId + '&_t='+new Date().getTime());
    //});
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