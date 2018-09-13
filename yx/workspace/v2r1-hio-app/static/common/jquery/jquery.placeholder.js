/*placeholder支持多个密码版本，密码的样式需将login-input换成自己的输入框的样式，保证统一
在做登录的时候我们都会用到文本框中显示要输入的默认提示，以前都是用js判断的比较麻烦，还有一个就是password是通过两个input框切换实现的，还好html5提供了一个属性placeholder，在input类型的框上可以起到占位符的效果，但现在还不是所有的浏览器都支持很html5，下面就通过jquery、html5来实现可以兼容多种浏览器的placeholder效果。
大致思路：
	1.判断浏览器是否支持html5的placeholder，支持就直接使用该属性。
	2.不支持就通过jquery来添加blur focus事件
	3.对password框的特使处理
*/
function isPlaceholder(){
    var input = document.createElement('input');
    return 'placeholder' in input;
}

$(document).ready(function() {
    if (!isPlaceholder()) { // 如果不支持placeholder属性
        $("input[type='text']").each(function (i, n) {
            var tip = $(n).attr("placeholder") ? $(n).attr("placeholder") : "";
            $(n).attr("title", tip);
        });
        $("input[type='password']").each(function (i, n) {
            var tip = $(n).attr("placeholder") ? $(n).attr("placeholder") : "";
            $(n).attr("title", tip);
        });
    }
});
    //创建一个类
/*
    function Placeholder(obj){
        this.input = obj; // obj为添加了placeholder属性的input|textarea
        this.label = document.createElement('span'); // 创建label标签
        // label标签的innerHTML设为input|textarea 的placeholder属性值。
        this.label.innerHTML = obj.getAttribute('placeholder');
        this.label.style.cssText = 'position:absolute; text-indent:2px;color:#999999; font-size:12px;';
        if(obj.value != ''){
            this.label.style.display = 'none';
        };
        this.init();
    }
    Placeholder.prototype = {
        //获取input|textarea的位置，以便相应的label定位

        getxy : function(obj){
            var left, top;
            if(document.documentElement.getBoundingClientRect){
                var html = document.documentElement,
                    body = document.body,
                    pos = obj.getBoundingClientRect(),
                    st = html.scrollTop || body.scrollTop,
                    sl = html.scrollLeft || body.scrollLeft,
                    ct = html.clientTop || body.clientTop,
                    cl = html.clientLeft || body.clientLeft;
                left = pos.left + sl - cl;
                top = pos.top + st - ct;
            }else{
                while(obj){
                    left += obj.offsetLeft;
                    top += obj.offsetTop;
                    obj = obj.offsetParent;
                }
            }
            return{
                left: left,
                top : top
            }
        },
        //取input|textarea的宽高，将label设为相同的宽高
        getwh : function(obj){
            return {
                w : obj.offsetWidth,
                h : obj.offsetHeight
            }
        },
        //添加宽高值方法
        setStyles : function(obj,styles){
            for(var p in styles){
                obj.style[p] = styles[p]+'px';
            }
        },
        init : function(){
            var label = this.label,
                input = this.input,
                getXY = this.getxy,
                xy = this.getxy(input),
                wh = this.getwh(input);
            this.setStyles(label, {'width':wh.w, 'height':wh.h, 'lineHeight':28, 'left':xy.left, 'top':xy.top});
            document.body.appendChild(label);
            label.onclick = function(){
                this.style.display = "none";
                input.focus();
            }
            input.onfocus = function(){
                label.style.display = "none";
            };
            input.onblur = function(){
                if(this.value == ""){
                    label.style.display = "block";
                }
            };
            if(window.attachEvent){
                window.attachEvent("onresize",function(){// 因为label标签添加到body上，以body为绝对定位，所以当页面
                    var xy = getXY(input);
                    Placeholder.prototype.setStyles(label, {'left':xy.left, 'top':xy.top});
                })}else{
                window.addEventListener("resize",function(){
                    var xy = getXY(input);
                    Placeholder.prototype.setStyles(label, {'left':xy.left, 'top':xy.top});
                },false);
            }
        }
    }

}*//*
$(document).ready(function() {
    var inpColl = [];
    $("input").not("input[type='password']").each(function(i,n){
        inpColl.push($(n).get(0));
    });

    //document.getElementsByTagName('input')
    //var inpColl =.get(0),
    textColl = document.getElementsByTagName('textarea');
    //html集合转化为数组
    function toArray(coll){
        for(var i = 0, a = [], len = coll.length; i < len; i++){
            a[i] = coll[i];
        }
        return a;
    }
    var inpArr = toArray(inpColl),
        textArr = toArray(textColl),
        placeholderArr = inpArr.concat(textArr);
    for (var i = 0; i < placeholderArr.length; i++){ // 分别为其添加替代placeholder的label
        if (placeholderArr[i].getAttribute('placeholder')){
            new Placeholder(placeholderArr[i]);
        }
    }
    $('.passwordtip').show()
    $('.passwordtip').on('click',function() {
        $(this).siblings(".passwordinput").focus();
        $(this).hide()
    })
    $('.passwordinput').focus(function() {
        $(".passwordtip").hide()
    })
    $('.passwordinput').blur(function() {
        if( $(this).val()==""){
            $(".passwordtip").show()
        }
    })
});*/