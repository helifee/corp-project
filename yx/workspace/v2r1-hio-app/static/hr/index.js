//var urlHost = "http://192.168.3.84:8080/";


//当前系统的url和name
var showAppUrl = "";
var showAppName = "";
$(function () {

var windowHeight = $(document).height();
    var windowWidth = $(document).width();
    //alert(windowHeight);
    $("#indexPic").css({'height':windowHeight});
    $("#body").css('overflow','hidden');
});
/**
 * 加载iframe
 * @param
 */
function onLoadIframe(src,menuName,submenuName) {
    $('.change_content').attr('src',src);
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
    window.open(src, "_blank",'width=' + (window.screen.availWidth - 10)+',height='+ (window.screen.availHeight - 60) + ',top=0, left=0');
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
        var menuContWidth = $(window).width()-$('.padR10').width()-$('.main_menu').width() - $('.xj-index-logo').width()-minus;
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
function computeIframeHeight() {
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
                getMenusByPro(projectItems[0].id);
                $('.change_content').attr('src',projectItems[0].resourceUrl);
                showAppUrl = projectItems[0].resourceUrl;
                showAppName = projectItems[0].name;
                $('.breadcrumb').empty();
                $('.breadcrumb').append("<li><a href='#' onclick=\"onLoadIframe('" + showAppUrl + "')\">" + showAppName + "</a></li>");
                $('.main_menu').html("<span class='glyphicon glyphicon-th-large'></span> " + projectItems[0].name);
                for(var i in projectItems) {
                    if(null == projectItems[i].icon || "" == projectItems[i].icon){
                        //$('.project-item').append("<li><a href='#' onclick=\"onLoadIframe('" + projectItems[i].url + "')\" proId=" + projectItems[i].id + "><i class='fa fa-university'></i><p>" + projectItems[i].name +"</p></a></li>");
                        $('.project-item').append("<li><a href='#' proUrl=" + projectItems[i].resourceUrl + " proId=" + projectItems[i].id + "><i class='fa fa-university'></i><p>" + projectItems[i].name +"</p></a></li>");
                    }else{
                        //$('.project-item').append("<li><a href='#' onclick=\"onLoadIframe('" + projectItems[i].url + "')\" proId=" + projectItems[i].id + "><i class='" + projectItems[i].icon +"'></i><p>" + projectItems[i].name +"</p></a></li>");
                        $('.project-item').append("<li><a href='#' proUrl=" + projectItems[i].resourceUrl + " proId=" + projectItems[i].id + "><i class='" + projectItems[i].icon +"'></i><p>" + projectItems[i].name +"</p></a></li>");
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
    var menuContWidth = $(window).width()-$('.padR10').width()-$('.main_menu').width() - $('.xj-index-logo').width()-minus;
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
                                submenu = submenu+"<li><a href='#' onclick=\"onLoadIframe('" + secondMenu[j].resourceurl + "','"+ menus[i].name +"','"+ secondMenu[j].name +"')\">" + secondMenu[j].name + "</a></li>";
                            }else{
                                submenu = submenu+"<li><a href='#' onclick=\"openNewWindow('" + secondMenu[j].resourceurl + "')\">" + secondMenu[j].name + "</a></li>";
                            }
                        }
                        $('.scroll_box > ul.nav').append("<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" + menus[i].name + "<span class='caret'></span></a><ul class='dropdown-menu'>"+submenu+"</ul></li>");
                    }else{
                        if(menus[i].openmode == "1") {
                            $('.scroll_box > ul.nav').append("<li><a href='#' onclick=\"onLoadIframe('" + menus[i].resourceurl + "','"+ menus[i].name +"')\">" + menus[i].name + "</a></li>");
                        }else{
                            $('.scroll_box > ul.nav').append("<li><a href='#' onclick=\"openNewWindow('" + menus[i].resourceurl + "')\">" + menus[i].name + "</a></li>");
                        }
                    }
                }
                menuAdapt();
                //导航下拉菜单添加鼠标划过隐藏功能
                hideMenu();
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
    var minus = 380;
    if($(window).width() < 1000) {
        minus = 253;
    }
    var menuContWidth = $(window).width()-$('.padR10').width()-$('.main_menu').width() - $('.xj-index-logo').width()- minus;
    //Menu宽度自适应
    menuAdapt();
    //固定iframe高度
    computeIframeHeight();
    //获取所有系统
    // getAllProject();

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

    //下拉菜单
    $('.menu_container').on('click','.dropdown',function() {
        var dropUl = $(this).children('.dropdown-menu');
        $(dropUl).css({'position':'fixed','top':'60px','left':$(this).offset().left});
    });



    $('#proManage').on('shown.bs.modal', function(e) {
        $('.project-item > li > a').click(function() {
            getMenusByPro($(this).attr('proId'));
            showAppUrl = $(this).attr('proUrl');
            showAppName = $(this).children('p').text();
            $('.breadcrumb').empty();
            $('.breadcrumb').append("<li><a href='#' onclick=\"onLoadIframe('" + $(this).attr('proUrl') + "')\">" + $(this).children('p').text() + "</a></li>");
            $('.change_content').attr('src',$(this).attr('proUrl'));
            $('.main_menu').html("<span class='glyphicon glyphicon-th-large'></span> " + $(this).children('p').text());
            $('#proManage').modal('hide');
        });
    });

    $('#changePortalTheme').on('click',function () {
        $.ajax({
            url:hostUrl + 'oa/portal/portalPage/getPortalWithPermision',
            type:'GET',
            async:false,
            dataType:'JSON',
            success:function (resultData) {
                if(resultData&&resultData.success){
                    var result = resultData.result;
                    if(result) {
                        var portalPageId = result.id;
                        window.open(hostUrl + 'oa/portal/personal_theme.html?portalPageId='+portalPageId,'_blank');
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

    //导航下拉菜单添加鼠标划过隐藏功能
    hideMenu();
});

