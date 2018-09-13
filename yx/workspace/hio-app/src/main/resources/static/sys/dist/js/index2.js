var urlHost = "http://192.168.3.84:8080/";

//加载iframe
function onLoadIframe(src) {
    $('.change_content').attr('src',src);
    $('#proManage').modal('hide');
}

//打开新窗口
function openNewWindow(src) {
    window.open(src, "_blank",'width=' + (window.screen.availWidth - 10)+',height='+ (window.screen.availHeight - 60) + ',top=0, left=0');
}


//menu自适应
function menuAdapt() {
    setTimeout(function() {
        var minus = 260;
        if($(window).width() < 1000) {
            minus = 133;
        }
        var menuContWidth = $(window).width()-$('.padR10').width()-$('.main_menu').width() - $('.xj-index-logo').width()-minus;
        $('.scroll_container').width(menuContWidth).height(60);
        var li_width = 0;
        $('.scroll_box > ul > li').each(function(i) {
            li_width+=$('.scroll_box > ul > li').eq(i).width();
        });
        $('.scroll_box').width(li_width);
        if(li_width > menuContWidth) {
            $('.menu_container > .glyphicon').show();
        }
    },500);
}

//固定iframe高度
function computeIframeHeight() {
    $('.embed-responsive-4by3').height($(window).height() - 60);
}

//首页获取所有系统
function getAllProject() {
    var urlBody = "platform-app/sys/res/appSystem/queryList";
    var urlAll = urlHost + urlBody;
    var postdata ={
        delflag:false
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
                //$('.change_content').attr('src',projectItems[0].url);
                $('.main_menu').html("<span class='glyphicon glyphicon-th-large'></span> " + projectItems[0].name);
                for(var i in projectItems) {
                    if(null == projectItems[i].icon || "" == projectItems[i].icon){
                        //$('.project-item').append("<li><a href='#' onclick=\"onLoadIframe('" + projectItems[i].url + "')\" proId=" + projectItems[i].id + "><i class='fa fa-university'></i><p>" + projectItems[i].name +"</p></a></li>");
                        $('.project-item').append("<li><a href='#' proUrl=" + projectItems[i].url + " proId=" + projectItems[i].id + "><i class='fa fa-university'></i><p>" + projectItems[i].name +"</p></a></li>");
                    }else{
                        //$('.project-item').append("<li><a href='#' onclick=\"onLoadIframe('" + projectItems[i].url + "')\" proId=" + projectItems[i].id + "><i class='" + projectItems[i].icon +"'></i><p>" + projectItems[i].name +"</p></a></li>");
                        $('.project-item').append("<li><a href='#' proUrl=" + projectItems[i].url + " proId=" + projectItems[i].id + "><i class='" + projectItems[i].icon +"'></i><p>" + projectItems[i].name +"</p></a></li>");
                    }
                }
            }else{
                return data.msg;
            }
        }
    });
}

//根据系统获取菜单
function getMenusByPro(appIds) {
    var minus = 260;
    if($(window).width() < 1000) {
        minus = 133;
    }
    var menuContWidth = $(window).width()-$('.padR10').width()-$('.main_menu').width() - $('.xj-index-logo').width()-minus;
    var urlBody = "platform-app/sys/res/resource/getResourceTree";
    var urlAll = urlHost + urlBody;
    var dataPost={
        appId:appIds
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
                    if(menus[i].children){
                        var secondMenu = menus[i].children;
                        var submenu="";
                        for(var j in secondMenu) {
                            if(secondMenu[j].openmode == "1") {
                                submenu = submenu+"<li><a href='#' onclick=\"onLoadIframe('" + secondMenu[j].resourceurl + "')\">" + secondMenu[j].name + "</a></li>";
                            }else{
                                submenu = submenu+"<li><a href='#' onclick=\"openNewWindow('" + secondMenu[j].resourceurl + "')\">" + secondMenu[j].name + "</a></li>";
                            }
                        }
                        $('.scroll_box > ul.nav').append("<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" + menus[i].name + "<span class='caret'></span></a><ul class='dropdown-menu'>"+submenu+"</ul></li>");
                    }else{
                        if(menus[i].openmode == "1") {
                            $('.scroll_box > ul.nav').append("<li><a href='#' onclick=\"onLoadIframe('" + menus[i].resourceurl + "')\">" + menus[i].name + "</a></li>");
                        }else{
                            $('.scroll_box > ul.nav').append("<li><a href='#' onclick=\"openNewWindow('" + menus[i].resourceurl + "')\">" + menus[i].name + "</a></li>");
                        }
                    }
                }
                menuAdapt();
            }
        }
    });
};

$(function() {
    var minus = 260;
    if($(window).width() < 1000) {
        minus = 133;
    }
    var menuContWidth = $(window).width()-$('.padR10').width()-$('.main_menu').width() - $('.xj-index-logo').width()- minus;
    //Menu宽度自适应
    menuAdapt();
    //固定iframe高度
    computeIframeHeight();
    //获取所有系统
    getAllProject();

    //菜单移动
    var page = 1;
    var i = 1;
    //向右滚动
    $('.menu_container > .glyphicon-menu-right').click(function() {
        var limit = Math.ceil(menuContWidth/120);
        var v_wrap = $('.menu_container');
        var v_show = v_wrap.find('.scroll_box');
        var v_cont = v_wrap.find('.scroll_container');
        var v_width = 120;
        var len = $('.scroll_box > ul > li').length - limit;
        if(!v_show.is(":animated")) {
            if(page == len+2) {
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
        var limit = Math.ceil(menuContWidth/120);
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

    //计算iframe高度
    $(window).resize(function() {
        computeIframeHeight();
    });

    $('#proManage').on('shown.bs.modal', function(e) {
        $('.project-item > li > a').click(function() {
            //getMenusByPro($(this).attr('proId'));
            $('.change_content').attr('src',$(this).attr('proUrl'));
            $('.main_menu').html("<span class='glyphicon glyphicon-th-large'></span> " + $(this).children('p').text());
            $('#proManage').modal('hide');
        });
    });
});

