/**
 * 系统首页快速入口模块
 * Author: xuguoping
 * Date: 2018.1.22
 */
;
(function($) {
    var TabElement = function(option) {
        this.option = option;
    }
    var isCountdown = true //左右切换的时候，控制连续点击

    TabElement.prototype = {
        'f': function(l) {
            var k = 0;
            $(l).each(function() {
                k += $(this).outerWidth(true);
            });
            return k;
        },
        'prevTab': function() {
            var that = this;
            var o = Math.abs(parseInt($(that.option.tab_list).css("margin-left")));
            var l = that.f($(that.option.content_tab).children().not(that.option.nav_tab));
            var k = $(that.option.content_tab).outerWidth(true) - l;
            var p = 0;
            if ($(that.option.tab_list).width() < k) {
                return false
            } else {
                var m = $(that.option.tab_list).children().first();
                var n = 0;
                while ((n + $(m).outerWidth(true)) <= o) {
                    n += $(m).outerWidth(true);
                    m = $(m).next()
                }
                n = 0;
                if (that.f($(m).prevAll()) > k) {
                    while ((n + $(m).outerWidth(true)) <= (k) && m.length > 0) {
                        n += $(m).outerWidth(true);
                        m = $(m).prev()
                    }
                    p = that.f($(m).prevAll())
                }
            }
            $(that.option.tab_list).animate({
                marginLeft: 0 - p + "px"
            }, "fast")
        },
        'nextTab': function() {
            // console.info("开始切换"+isCountdown)
            if (isCountdown) {
                isCountdown = false;

                var that = this;
                var o = Math.abs(parseInt($(that.option.tab_list).css("margin-left")));
                var l = that.f($(that.option.content_tab).children().not(that.option.nav_tab));
                var k = $(that.option.content_tab).outerWidth(true) - l;
                var p = 0;
                if ($(that.option.tab_list).width() < k) {
                    return false
                } else {
                    var m = $(that.option.tab_list).children().first();
                    var n = 0;
                    while ((n + $(m).outerWidth(true)) <= o) {
                        n += $(m).outerWidth(true);
                        m = $(m).next()
                    }
                    n = 0;
                    while ((n + $(m).outerWidth(true)) <= (k) && m.length > 0) {
                        n += $(m).outerWidth(true);
                        m = $(m).next()
                    }
                    p = that.f($(m).prevAll());
                    if (p >= 0) {
                        $(that.option.tab_list).animate({
                            marginLeft: 0 - p + "px"
                        }, function() {
                            isCountdown = true;
                        })
                    }else{
                        isCountdown = false;
                    }
                    
                }
            // console.info("结束切换")
            }
        },
        'goTab': function(n) {
            var that = this;
            var o = that.f($(n).prevAll()),
                q = that.f($(n).nextAll());
            var l = that.f($(that.option.content_tab).children().not(that.option.nav_tab));
            var k = $(that.option.content_tab).outerWidth(true) - l;
            var p = 0;
            if ($(that.option.tab_list).outerWidth() < k) {
                p = 0
            } else {
                if (q <= (k - $(n).outerWidth(true) - $(n).next().outerWidth(true))) {
                    if ((k - $(n).next().outerWidth(true)) > q) {
                        p = o;
                        var m = n;
                        while ((p - $(m).outerWidth()) > ($(that.option.tab_list).outerWidth() - k)) {
                            p -= $(m).prev().outerWidth();
                            m = $(m).prev()
                        }
                    }
                } else {
                    if (o > (k - $(n).outerWidth(true) - $(n).prev().outerWidth(true))) {
                        p = o - $(n).prev().outerWidth(true)
                    }
                }
            }
            $(that.option.tab_list).animate({
                marginLeft: 0 - p + "px"
            }, "fast")
        },
        'setTabColor': function() {
            var that = this;
            var o = Math.abs(parseInt($(that.option.tab_list).css("margin-left")));
            var l = that.f($(that.option.content_tab).children().not(that.option.nav_tab));
            var k = $(that.option.content_tab).outerWidth(true) - l;
            var p = 0;
            var lengthNav = Math.abs(parseInt($(that.option.tab_list).width())); //nav的实际长度
            // console.info(o)
            // console.info(l)
            // console.info(k)
            // console.info(lengthNav)
            // alert($(that.option.tab_list).width())
            setTimeout(function() {
                p = $('.page-tabs-content ul.nav').css('margin-left');
                p = Math.abs(p.split('px')[0]);
                // console.info(p)
                // console.info(lengthNav - p)
                // console.info(lengthNav - p < k)
                // console.info(p ==0  && l == 0)
                if (p ==0  && lengthNav >= k) {

                    // console.info("右侧变绿")
                    $('.J_tabLeft').css('color', '#F6F7F8');
                    $('.J_tabRight').css('color', '#D8D8D8');
                } else if (p <= l) {
                    // console.info("全灰色1")
                    $('.J_tabLeft').css('color', '#F6F7F8');
                    $('.J_tabRight').css('color', '#F6F7F8');
                } else if (lengthNav - p < k) {
                    // console.info("左侧变绿")
                    $('.J_tabLeft').css('color', '#D8D8D8');
                    $('.J_tabRight').css('color', '#F6F7F8');
                } else {
                    // console.info("全变绿")
                    $('.J_tabLeft').css('color', '#D8D8D8');
                    $('.J_tabRight').css('color', '#D8D8D8');
                }

                //设置按钮的hover色值
                var J_tabLeftColor = $(".J_tabLeft").css("color")
                var J_tabRightColor = $(".J_tabRight").css("color")

                
                $(".J_tabLeft").hover(function(){
                    $(this).css("color","#46A7FF");
                },function(){
                    $(this).css("color",J_tabLeftColor)
                });
                $(".J_tabRight").hover(function(){
                    $(this).css("color","#46A7FF");
                },function(){
                    $(this).css("color",J_tabRightColor)
                });

            }, 300);
        },
    };
    $.fn.menuTab = function(option) {
        var opt = $.extend({}, option);
        return new TabElement(opt);
    }
})(jQuery);