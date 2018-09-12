//$("#XXX") 输入框
// $("#XXX").erpListAutoComplete({
//          type : "POST" 请求方式 默认为GET
//          url : "baidu.com/kkk" 请求url
//          param : {kkk:"111",ddd:"2222"} 请求时的参数 参照jquery.ajax方式
//          data :  [{name: "111"},{name: "222"},{name: "333"}]不需请求数据时要查找的本地数据
//          renderMenu  : function(value){}  自定义下拉html 方法 参数为json数组
//          class : "myNewClass"    下拉自定义样式 给下拉框的增加样式
//          addMenuNewEvent : function(menu){}  为弹出的层添加新的事件
//          bindMenuEvent ： {   自定义下拉事件 默认为selected，focus ，直接修改事件， 可使用addMenuNewEvent添加新事件
//               e: 鼠标e
//               data:  选中的数据
//               target : 选中的行
//              "selected"  : function(e,data,target){
//                  },
//             "focus"  : function(e,data,target){
//                  },
//              }
//          bindInputEvent ： {      输入框自定义事件  默认blur，focus，keyup  可直接添加新事件或修改事件
//              "blur" : function(e){},
//              "focus" : function(e){}
//              }
//              "keyup" : function(e){}
//              }
// })
//例子：
//  html部分
// <div> <input class="aaa"> <input class="bbb"></div>
// js部分
// $(".aaa").erpListAutoComplete({
//     data : [{name: "来试一个1"},
//         {name: "来试一个2"},
//         {name: "来试一个3"},
//         {name: "来试一个4"},
//         {name: "来试一个5"}]
// });
// $(".bbb").erpListAutoComplete({
//     url : "url/url/url"
// });
(function(){
    function completeInput(option){

        this.opt = {
            $input : option.input,
            addClass : option.addClass || ""
        };
        $.extend(this.opt,option);

        var my = this;
        //输入框事件
        my.bindInputEvent = {
            'blur': function(e){
                var $input =  $(this);
            },
            //获取焦点时插入元素
            'focus': function(e){
                var num = Math.random();
                var $input =  $(this);
                if(my.menu){
                    my.menu.empty();
                    my.menu.show();
                    return;
                }
                my.menu = $("<div></div>")
                    .addClass("autoComplete")
                    .attr("autocomplete","autocomplete"+num)
                    .css({"position":"absolute"});
                my.positionMenu($input,my.menu);
                $input.attr("auto_id",num);
                $("body").append(my.menu);
                my.addMenuEvent(my.menu);
            },
            'keyup': function(e){
                var $input =  $(this),
                    val = $input.val();
                my.menu.empty();
                if($.trim(val) == '') {
                    //为空时清空弹出层
                    my.menu.hide();

                }else{
                    // 查找
                    my.getData(val);
                }
                return false;

            }
        }
        //输入事件扩展
        $.extend(my.bindInputEvent,my.opt.bindInputEvent);
        //弹出层事件
        my.bindMenuEvent = {
            "selected" : function(e,data,target){
                var value = data;
                my.opt.$input.val(value.name);
            },
            "focus" : function(e,data,target){

            }
        }
        //弹出层事件扩展
        $.extend(my.bindMenuEvent,my.opt.bindMenuEvent);
        var $input = my.opt.$input;
        $.each(my.bindInputEvent,function(i,n){
            $input.on(i,n)
        })
    }
    completeInput.prototype = {
        addMenuEvent : function(menu){
            var my = this;
            $.each(my.bindMenuEvent,function(key,n){
                menu.on(key,function(e){
                    var target = $(e.target),
                        data = target.data();
                    n(e,data,target);
                    menu.hide();
                })
            })
            menu.on("click","li",function(e){
                var target = $(e.target);
                target.trigger("selected");
            })
            menu.hover(function(e){
                var target = $(e.target);
                target.trigger("focus")
            },function(e){
                menu.hide();
            })
            my.opt.addMenuNewEvent && my.opt.addMenuNewEvent(menu);
        },
        _ajax : function(cb){
            var my = this;
            $.ajax({
                type: my.opt.type || 'GET',
                url: my.opt.url,
                data: my.opt.param,
                success: function(msg){
                    cb && cb(msg)
                }
            });
        },
        getData : function(val){
            var my = this;
            if(my.opt.data){
                var self = this,
                    list = my.opt.data,
                    arr = [];
                if(val) {
                    for(var i in list) {
                        if(list[i].name && list[i].name.match(val)) {
                            arr.push(list[i]);
                        }
                    }
                }

                var r = my.renderMenu(arr);
                my.menu.append(r);
                my.menu.show();

                return;
            }
            my._ajax(function(msg){
                var list = my.renderMenu(msg);
                my.menu.append(list);
                my.menu.show();
            })
        },
        positionMenu : function($input,menu){
            var offset = $input.offset(),height = $input.height(),width = $input.width();
            menu.css({"left":offset.left+"px","top":offset.top+height+"px","width": width+"px","z-index":20});
        },
        //渲染Html弹出层
        renderMenu : function(val){
            var my = this;
            if(this.opt.renderMenu){
                this.opt.renderMenu(val);
                return;
            }
            var bd = $("<ul></ul>");
            $.each(val,function(index,val){
                var html = $('<li>'+ val.name +'</li>').data(val);
                bd.append(html);
            })
            bd.addClass(my.opt.class);
            return bd;
        }
    }
    $.fn.erpListAutoComplete = function(opt){
        this.each(function(){
            var $input = $(this);
            var obj = {
                input : $input
            }
            $.extend(obj,opt)
            var myAuto = new completeInput(obj);
        })
    }
})()

