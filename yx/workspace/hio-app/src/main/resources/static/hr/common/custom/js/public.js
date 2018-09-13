/**
 * 创建人：like
 *
 */
//index.js公共方法

/**
 * 以iframe的方式加载页面
 *
 */
function onLoadIframe(src) {
    $('.change_content').attr('src',src);
    $('#proManage').modal('hide');
}
/**
 * 以window.open的方式加载页面
 *
 */
function openNewWindow(src) {
    window.open(src, "_blank",'width=' + (window.screen.availWidth - 10)+',height='+ (window.screen.availHeight - 60) + ',top=0, left=0');
}
/**
 * 导航栏Menu随屏幕宽度自适应
 *
 */
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
/**
 * iframe高度随屏幕高度自适应
 *
 */
function computeIframeHeight() {
    $('.embed-responsive-4by3').height($(window).height() - 110);
}
/**
 * 获取所有系统
 *
 */
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
                        $('.project-item').append("<li><a href='#' proUrl=" + projectItems[i].url + " proId=" + projectItems[i].id + "><i class='fa fa-university'></i><p>" + projectItems[i].name +"</p></a></li>");
                    }else{
                        $('.project-item').append("<li><a href='#' proUrl=" + projectItems[i].url + " proId=" + projectItems[i].id + "><i class='" + projectItems[i].icon +"'></i><p>" + projectItems[i].name +"</p></a></li>");
                    }
                }
            }else{
                return data.msg;
            }
        }
    });
}

/**
 * 根据系统获取菜单
 *
 */
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

//list.js 公共方法

/**
 * 点击高级查询的时候添加可伸缩功能
 *
 */
function expandedSearch() {
    var s_Area = $('.expand-search');
    var s_btn = $('.btn-adv > i');
    if(s_Area.height() == 36) {
        s_Area.css({"height":"114px"});
        s_btn.removeClass('fa-angle-down').addClass('fa-angle-up');
    }else{
        s_Area.css({"height":"36px","overflow":"hidden"});
        s_btn.removeClass('fa-angle-up').addClass('fa-angle-down');
    }
}

    //skinType: blue  green red;text 为提示的内容
    // fn传入确定按钮要执行的方法 failFn为取消按钮要执行的方法；
    // callback 为执行后的回调函数 不需要不传  yesText为确定按钮的替换文字
    function pop_text_open(skinType, text, fn, failFn,yesText,callback) {
        if(!skinType){
            skinType = "blue";
        }
        var html= '<div class="dialog-box" id=""> <div class="con '+skinType+'"> ' +
            '<div class="tipImg"></div> <div class="tipBody">' +
            '<p>'+text+'</p> <div class="btn-footer"> ' +
            '<button class="sure" id="easyDialogYesBtn">确定</button> <button class="cancel" id="easyDialogNoBtn">取消</button> </div> </div> </div></div>';

        easyDialog.open({
            container: {
                content: html,
                yesFn: fn,
                noFn: failFn
            },
            callback:callback
        });
        if(yesText) $("#easyDialogYesBtn").text(yesText);
        if(!failFn) $("#easyDialogNoBtn").remove();
        $(".easyDialog_footer").remove();
    }
    //显示信息类提示框
    function pop_tip_open(skinType, text, time) {
        if(!skinType){
            skinType = "blue";
        }
        //默认消失时间
        if(!time){
            time = 3000;
        }
        var tipBox = $('body').find("#tip-box-alert");
        tipBox.css("position","fixed");
        var html= ' <a href="#" class="close" onclick="$(this).parent().hide()"> &times; </a> ' +
            '<div class="dialog-tip '+skinType+' clearfix"> <div class="tipImg"></div> <p>'+text+'</p> </div>';

        if(tipBox.length<1){
            tipBox = $("<div>", {id:"tip-box-alert",class:"tip-box-alert"});
            $('body').append(tipBox);
        }
        //鼠标滑入滑出
        $(tipBox).hover(function(){
            clearTimeout(timer);
        },function(){
            tipBox.fadeOut();
        }).trigger("mouseleave");

        tipBox.html(html);
        tipBox.show();
        var timer = setTimeout(function(){
            tipBox.fadeOut();
        },2000);

    }

//解决ie9下console未定义的问题
window.console = window.console || (function(){
        var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
        return c;
    })();
