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
    $('.embed-responsive-4by3').css({overflow:'hidden'});

    $('.embed-responsive-4by3').height($(window).height() -$("#headerContainer").outerHeight()-$("#breadcrumbContainer:visible").outerHeight());
}
/**
 * 获取所有系统
 *
 */
function getAllProject() {
    var urlBody = "platform-app/sys/res/appSystem/queryList";
    var urlAll = urlHost + urlBody;
    var postdata ={
        delflag:0
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
                    projectItems[i].url = projectItems[i].url.replace('/platform-app', '');
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
                            secondMenu[j].resourceurl = secondMenu[j].resourceurl.replace('/platform-app', '');
                            if(secondMenu[j].openmode == "1") {
                                submenu = submenu+"<li><a href='#' onclick=\"onLoadIframe('" + secondMenu[j].resourceurl + "')\">" + secondMenu[j].name + "</a></li>";
                            }else{
                                submenu = submenu+"<li><a href='#' onclick=\"openNewWindow('" + secondMenu[j].resourceurl + "')\">" + secondMenu[j].name + "</a></li>";
                            }
                        }
                        $('.scroll_box > ul.nav').append("<li class='dropdown'><a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>" + menus[i].name + "<span class='caret'></span></a><ul class='dropdown-menu'>"+submenu+"</ul></li>");
                    }else{
                        menus[i].resourceurl = menus[i].resourceurl.replace('/platform-app', '');
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
            '<div class="tipImg"></div> <div class="tipBody"><div class="p_con">' +
            '<p title="'+text+'">'+text+'</p></div> <div class="btn-footer"> ' +
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

        $(".p_con").dotdotdot();  //出现省略号  jquery插件
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
        var html= ' <a href="javascript:void(0);" class="close" onclick="$(this).parent().hide()"> &times; </a> ' +
            '<div class="dialog-tip '+skinType+' clearfix"> <div class="tipImg"></div> <p>'+text+'</p> </div>';

        if(tipBox.length<1){
            //tipBox = $("<div>", {id:"tip-box-alert",class:"tip-box-alert"});
            tipBox = $('<div></div>');
            tipBox.attr('id','tip-box-alert');
            tipBox.addClass('tip-box-alert');
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
    //新增页面  窗口resize的时候  右侧按钮位置随之变化
   /* $(window).resize(function(){
        if($("body").find("iframe").length<1){

        }
    });*/
//解决ie9下console未定义的问题
window.console = window.console || (function(){
        var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
        return c;
    })();

(function($){
    // 关闭$.ajax的cache属性，默认为true，现在改成false
    if (typeof($.ajaxSetup) == 'function') {
        $.ajaxSetup ({
            cache: false
        });
    }
    // 判断浏览器是否支持placeholder属性
    function isSupportPlaceholder() {
        var input = document.createElement('input');
        return 'placeholder' in input;
    }
    //添加仿placeholder属性
    function input(obj, val) {
        var $input = obj;
        if(!isSupportPlaceholder()){
            var val = val;
            $input.val(val);
            $input.focus(function() {
                var my = $(this),
                    tempVal = my.attr("data-temp-val");
                if(tempVal == "" || tempVal == undefined){
                    $(this).val("");
                }

            }).blur(function() {
                var my = $(this),
                    tempVal = my.attr("data-temp-val");
                if (tempVal) {
                    $(this).val(tempVal);
                }else{
                    $(this).val(val);
                }
            });
            $input.on("keyup",function(e){
                var v = $(this).val();
                if(v){
                    $(this).attr("data-temp-val",v);
                }else{
                    $(this).removeAttr("data-temp-val");
                }
            })
        }else{
            $input.attr("placeholder",val);
        }
    }
    $.fn.inputPlaceholder = function(val){
        this.each(function(){
            var my = $(this),
                tempPlaceholder = my.attr("data-temp-placeholder");
            input(my,tempPlaceholder);
        })
    };
    //扩展jquery方法 添加获得input值方法
    $.fn.extend({
        getInputVal : function(){
            var val = "";
            var my = $(this);
            if(!isSupportPlaceholder()){
                val = my.attr("data-temp-val");
            }else{
                val = my.val();
            }
            return val;
        }
    });
})(jQuery);
