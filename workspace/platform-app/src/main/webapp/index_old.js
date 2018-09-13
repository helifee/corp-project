//var urlHost = "http://192.168.3.84:8080/";


//当前系统的url和name
var showAppUrl = "";
var showAppName = "";
var isFromForum = null;
/**
 * 加载iframe
 * @param
 */
function onLoadIframe(src,menuName,submenuName) {
    var theEvent = window.event || arguments.callee.caller.arguments[0];
    var menuCode = $(theEvent.target).attr('menucode');
    $('body').data('_menuCode',menuCode);

    if(src.indexOf('?')>-1) {
        src += '&_time='+new Date().getTime();
    }else {
        src += '?_time='+new Date().getTime();
    }

    var favoriteLink = $('body').data('favoriteLink');
    if(!favoriteLink||favoriteLink!='true') {
        $('.change_content').attr('src',src);
    }

    $('.breadcrumb').empty();
    if(menuName == undefined){
    	$('.breadcrumb').append("<li><a href='#' onclick=\"onLoadIframe('" + showAppUrl + "')\">" + showAppName + "</a></li>");
    }else if(submenuName == undefined){
    	$('.breadcrumb').append("<li><a href='#' onclick=\"onLoadIframe('" + showAppUrl + "')\">" + showAppName + "</a></li>");
    	$('.breadcrumb').append("<li><a href='#' onclick=\"onLoadIframe('" + src + "','"+menuName+"')\">" + menuName + "</a></li>");
    }else{
    	$('.breadcrumb').append("<li><a href='#' onclick=\"onLoadIframe('" + showAppUrl + "')\">" + showAppName + "</a></li>");
    	$('.breadcrumb').append("<li>" + menuName + "</li>");
    	$('.breadcrumb').append("<li><a href='#' onclick=\"onLoadIframe('" + src + "','"+menuName+"','"+submenuName+"')\">" + submenuName + "</a></li>");
    }
//    $('.breadcrumb').append("<li><a href='#' onclick=\"onLoadIframe('" + $(this).attr('proUrl') + "')\">" + $(this).children('p').text() + "</a></li>");
    $('#proManage').modal('hide');
}

/**
 * 打开新窗口
 */
function openNewWindow(src) {
    window.open(src);
}


/**
 * 退出操作
 */
function quit(){
	var logoutUrl=hostUrl+"sys/authentication/logout";
	$.ajax({
        type:'POST',
        url:logoutUrl,
        dataType:'json',
        contentType:'application/json',
        data:"{}",
        success: function(json) {
            if(json.success){
                window.location.href=hostUrl+'login.html';
            }else{
            	
            }
        }
    })
}
	


/**
 * menu自适应
 */
function menuAdapt() {
    //setTimeout(function() {
        var minus = 380;
        if($(window).width() < 1000) {
            minus = 253;
        }
        menuContWidth = $(window).width()-$('.padR10').width()-$('.main_menu').width() - $('.xj-index-logo').width()-minus;
        if(menuContWidth <= 468) {
            menuContWidth = 468;
        }
        $('.scroll_container').width(menuContWidth).height(60);
        var li_width = 0;
        $('.scroll_box > ul > li').each(function(i) {
            li_width+=$('.scroll_box > ul > li').eq(i).width();
        });
        $('.scroll_box').width(li_width+5);
        if(li_width > menuContWidth) {
            $('.menu_container > .glyphicon').show();
        }else{
            $('.menu_container > .glyphicon').hide();
            $('.scroll_box').css('left','0');
        }
    //},500);
}

/**
 * 固定iframe高度
 */
function computeIframeHeight(isOa) {
    $('.embed-responsive-4by3').css({overflow:'hidden'});

    $('.embed-responsive-4by3').height($(window).height() -$("#headerContainer").outerHeight()-$("#breadcrumbContainer:visible").outerHeight());
}

/**
 * 首页获取所有系统
 */
function getAllProject() {
    var urlBody = "sys/authentication/getUserAuthenticationApp";
    var urlAll = hostUrl + urlBody;
    var postdata ={
        appDelFlag:"0",
		appStatus:"1"
    };
    $.ajax({
        type:'POST',
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(postdata),
        success: function(data) {
            if(data.result) {
                var projectItems = data.result;
                if(!projectItems||projectItems.length==0) {
                    $.xljUtils.tip('blue','暂无系统菜单数据！');
                    return;
                }
                getMenusByPro(projectItems[0].id);
                var defaultResourceUrl = projectItems[0].resourceUrl;
                if(defaultResourceUrl.indexOf('?')>-1) {
                    defaultResourceUrl += '&_time='+new Date().getTime();
                }else {
                    defaultResourceUrl += '?_time='+new Date().getTime();
                }
                $('.change_content').attr('src',defaultResourceUrl);
                showAppUrl = defaultResourceUrl;
                showAppName = projectItems[0].name;
                $('.breadcrumb').empty();
                $('.breadcrumb').append("<li><a href='#' onclick=\"onLoadIframe('" + showAppUrl + "')\">" + showAppName + "</a></li>");
                $('.main_menu').html("<span class='glyphicon glyphicon-th-large'></span> " + projectItems[0].name);

                for(var i in projectItems) {
                    var resourceUrl = projectItems[i].resourceUrl;
                    
                    var openmode = projectItems[i].openmode;
                    
                    if(resourceUrl.indexOf('?')>-1) {
                        resourceUrl += '&_time='+new Date().getTime();
                    }else {
                        resourceUrl += '?_time='+new Date().getTime();
                    }

                    if(null == projectItems[i].icon || "" == projectItems[i].icon){
                        //$('.project-item').append("<li><a href='#' onclick=\"onLoadIframe('" + projectItems[i].url + "')\" proId=" + projectItems[i].id + "><i class='fa fa-university'></i><p>" + projectItems[i].name +"</p></a></li>");
                        $('.project-item').append("<li><a href='#' proopenmpde="+openmode+" proUrl=" + resourceUrl + " proId=" + projectItems[i].id + " proCode=" +projectItems[i].code+ "><i class='fa fa-university'></i><p>" + projectItems[i].name +"</p></a></li>");
                    }else{
                        //$('.project-item').append("<li><a href='#' onclick=\"onLoadIframe('" + projectItems[i].url + "')\" proId=" + projectItems[i].id + "><i class='" + projectItems[i].icon +"'></i><p>" + projectItems[i].name +"</p></a></li>");
                        $('.project-item').append("<li>" +
                            "<a href='#' proopenmpde="+openmode+" proUrl=" + resourceUrl + " proId=" + projectItems[i].id + " proCode=" +projectItems[i].code+ "><i class='" + projectItems[i].icon +"'></i><p>" + projectItems[i].name +"</p></a></li>");
                    }
                }
            }else{
                return data.msg;
            }
        }
    });
}
/**
 * 导航下拉菜单添加鼠标划过隐藏功能
 */
function hideMenu() {
    $('.dropdown-toggle').on('click',function() {
		$('.dropdown-menu').css('display','none');
        $(this).parent().children('.dropdown-menu').css('display','block');
    })
    $('.dropdown-menu').on('mouseenter',function() {
        $(this).css('display','block');
    }).on('mouseleave',function() {
        $(this).css('display','none');
    }).on('click',function() {
        $(this).css('display','none');
    });
}
/**
 * 根据系统获取菜单
 */
function getMenusByPro(appIds) {
    var minus = 380;
    if($(window).width() < 1000) {
        minus = 253;
    }
    menuContWidth = $(window).width()-$('.padR10').width()-$('.main_menu').width() - $('.xj-index-logo').width()-minus;
//    var urlBody = "sys/res/resource/getResourceTree";
    var urlBody = "sys/authentication/getUserAuthenticationMenu";
    var urlAll = hostUrl + urlBody;
    var dataPost={
        appId:appIds,
        menuDelFlag:"0",
        menuStatus:"1"
    };
    $.ajax({
        type:"POST",
        url:urlAll,
        dataType:'json',
        contentType:'application/json',
        data:JSON.stringify(dataPost),
        success: function(data) {
            if(data.result) {
                $('.scroll_container').empty();
                $('.scroll_container').append("<div class='scroll_box'></div>");
                $('.scroll_box').css('min-width',menuContWidth);
                $('.scroll_box').append("<ul class='nav navbar-nav'></ul>");
                var menus = data.result;
                for(var i in menus) {
                    if(menus[i].children && menus[i].children.length>0){
                        var secondMenu = menus[i].children;
                        var submenu="";
                        for(var j in secondMenu) {
                            if(secondMenu[j].openmode == "1") {
                                submenu = submenu+"<li><a href='#' menuCode = \""+secondMenu[j].code+"\" onclick=\"onLoadIframe('" + secondMenu[j].resourceurl + "','"+ menus[i].name +"','"+ secondMenu[j].name +"')\" menuName='"+ secondMenu[j].name +"'>" + secondMenu[j].name + "</a></li>";
                            }else{
                                submenu = submenu+"<li><a href='#'  menuCode = \""+secondMenu[j].code+"\"  onclick=\"openNewWindow('" + secondMenu[j].resourceurl + "')\" menuName='"+ secondMenu[j].name +"'>" + secondMenu[j].name + "</a></li>";
                            }
                        }
                        $('.scroll_box > ul.nav').append("<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" + menus[i].name + "<span class='caret'></span></a><ul class='dropdown-menu'>"+submenu+"</ul></li>");
                    }else{
                		if(menus[i].openmode == "1") {
                            $('.scroll_box > ul.nav').append("<li><a href='#' menuCode = \""+menus[i].code+"\" onclick=\"onLoadIframe('" + menus[i].resourceurl + "','"+ menus[i].name +"')\">" + menus[i].name + "</a></li>");
                        }else{
                            $('.scroll_box > ul.nav').append("<li><a href='#' menuCode = \""+menus[i].code+"\" onclick=\"openNewWindow('" + menus[i].resourceurl + "')\">" + menus[i].name + "</a></li>");
                        }
                    }
                }
                menuAdapt();
                //导航下拉菜单添加鼠标划过隐藏功能
                hideMenu();
            }
            //跳转论坛首页
            if(isFromForum && isFromForum==1){
            	$(".menu_container").find("a[menuName='论坛首页']").click();
            }

            //如果是收藏点击，则点击对应菜单
            var favoriteLink = $('body').data('favoriteLink');
            if(favoriteLink&&favoriteLink=='true') {
                delete $('body').data()['favoriteLink'];
                var _menuCode = $('body').data('_menuCode');
                $('.menu_container').find('a[menucode="'+_menuCode+'"]').click();
            }
        }
    });
};

/**
 * 修改个人信息
 */
function updateMyself(){
	window.open("sysManager/org/updateMyInfo.html");
}
/**
 * 修改密码
 */
function updateMyPwd(){
	window.open("sysManager/org/updateMyPwd.html");
}

$(function() {
	isFromForum = $.xljUtils.getUrlParam("isFromForum");
    //弹出浮动窗口
    popFloatWindow();
    var minus = 380;
    if($(window).width() < 1000) {
        minus = 253;
    }
    menuContWidth = $(window).width()-$('.padR10').width()-$('.main_menu').width() - $('.xj-index-logo').width()- minus;
    //Menu宽度自适应
    menuAdapt();
    //固定iframe高度
    computeIframeHeight();
    //获取所有系统
    getAllProject();

    $(window).on('resize',function () {
        menuAdapt();
        computeIframeHeight();
    });
    //菜单移动
    var page = 1;
    var i = 1;
    //向右滚动
    $('.menu_container > .glyphicon-menu-right').click(function() {
        var limit = Math.floor(menuContWidth/120);
        var v_wrap = $('.menu_container');
        var v_show = v_wrap.find('.scroll_box');
        var v_cont = v_wrap.find('.scroll_container');
        var v_width = 120;
        var len = $('.scroll_box > ul > li').length - limit;
        console.log('len' + len);
        if(!v_show.is(":animated")) {
            if(page == len+1) {
                v_show.animate({left: '0px'},'slow');
                page = 1;
            }else{
                v_show.animate({left:'-=' + v_width}, 'slow');
                page++;
            }
        }
    });
    //向左滚动
    $('.menu_container > .glyphicon-menu-left').click(function() {
        var limit = Math.floor(menuContWidth/120);
        var v_wrap = $('.menu_container');
        var v_show = v_wrap.find('.scroll_box');
        var v_cont = v_wrap.find('.scroll_container');
        var v_width = 120;
        var len = $('.scroll_box > ul > li').length - limit;
        if(!v_show.is(":animated")) {
            if(page == 1) {
                //v_show.animate({left: '-=' + v_width * len},'slow');
                //page = len;
                alert('不能移动，当前已经是第一项!');
                return false;
            }else{
                v_show.animate({left:'+=' + v_width}, 'slow');
                page--;
            }
        }
    });

    // 打开全文检索
    $('.menu_search').on('click', function(){
    	window.open('search_list.html?random=' + Date.now(), '_blank');
    });
    
    //下拉菜单
    $('.menu_container').on('click','.dropdown',function() {
        var dropUl = $(this).children('.dropdown-menu');
        $(dropUl).css({'position':'fixed','top':'60px','left':$(this).offset().left});
    });



    $('#proManage').on('shown.bs.modal', function(e) {
        $('.project-item > li > a').click(function() {
        	
        	proopenmpde = $(this).attr('proopenmpde');
            var proCode = $(this).attr('procode');
            $('body').data('_proCode',proCode);
        	if(proopenmpde == "0"){
        		showAppUrl = $(this).attr('proUrl');
        		$('#proManage').modal('hide');
        		window.open(showAppUrl);
        	}else{
        		getMenusByPro($(this).attr('proId'));
                showAppUrl = $(this).attr('proUrl');
                showAppName = $(this).children('p').text();
                $('.breadcrumb').empty();
                $('.breadcrumb').append("<li><a href='#' onclick=\"onLoadIframe('" + $(this).attr('proUrl') + "')\">" + $(this).children('p').text() + "</a></li>");
                $('.change_content').attr('src',$(this).attr('proUrl'));
                $('.main_menu').html("<span class='glyphicon glyphicon-th-large'></span> " + $(this).children('p').text());
                $('#proManage').modal('hide');
        	}
        });
    });

    //修改个人首页
    $('#changePortalTheme').on('click',function () {
        $.ajax({
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

        });
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
        //portalHomeMenu
        $.ajax({
            url:hostUrl + 'oa/portal/portalPage/getPortalListWithPermision?_t='+new Date().getTime(),
            type:'GET',
            //async:false,
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
    initPortalHomeList();

    //导航下拉菜单添加鼠标划过隐藏功能
    hideMenu();

    //收藏按钮点击事件
    $('#favoriteBtn').on('click',function () {
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
            //async:false,
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
    initSaveFavorite();

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
                                            initFavoriteTree();

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


    //收藏夹/收藏弹出框隐藏事件
    $('#favoriteModal').on('shown.bs.modal',function () {
        var resourceLink = $('#xj-index-iframe').attr('src');
        var favoriteName = $(document.getElementById('xj-index-iframe').contentWindow.document.getElementsByTagName('title')[0]).text();
        if($.trim(favoriteName)=='') {
            favoriteName = resourceLink;
        }

        if(resourceLink.indexOf('?')!=-1){
            resourceLink += '&_proCode=' + $('body').data('_proCode');
            resourceLink += '&_menuCode=' + $('body').data('_menuCode');
        }else{
            resourceLink += '?_proCode=' + $('body').data('_proCode');
            resourceLink += '&_menuCode=' + $('body').data('_menuCode');
        }

        $('#resourceLink').val(resourceLink);
        $('#favoriteName').val(favoriteName);
    });
    $('#favoriteModal').on('hidden.bs.modal',function () {
        $('#favoriteForm')[0].reset();
    });

    $('#parentFavoriteModal').on('hidden.bs.modal',function () {
        $('#parentFavoriteForm')[0].reset();
    });
    //关闭浮动窗口按钮
    $('#closeFloatWindowBtn').click(function () {
        $('#floatWindowDiv').hide();
    });

    $('#logoImg').on('click',function () {
        openOaPortal();
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

//关闭收藏bain编辑弹出框
function closeFavoriteModal(isParent,resultData) {
    console.info(resultData);
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

function switchPortalPage(portalPageId) {
    //aObj.on('click',function () {
        $('.project-item').find('a[procode="OA"]').click();
        $('#xj-index-iframe').attr('src', hostUrl + 'oa/portal/portal_view_copy.html?portalPageId='+portalPageId + '&_t='+new Date().getTime());
    //});
}
