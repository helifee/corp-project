
/******************
   使div垂直居中对齐
    <div class="wrap">
        abcd1234
        <div class="middle">
        <img src="..." class="middle"/>
        <input type="" class="middle"/>
    </div>

*************************/
$(function(){
    $("div.wrap").each(function(i,w){
        var wrapHeight=$(w).height();
        $(w).css("line-height",wrapHeight+"px");
        $(w).find(".middle").each(function(j,v){
            $(v).css("vertical-align","middle");
            if($(v).is("input") && isIE()){
                $(v).css("align","absMiddle");//"vertical-align":"middle"
            }else{
                var height=$(v).height();
                var top=(wrapHeight-height)/2;
                $(v).css("margin-top",top+"px");
            }
        });
    });


    function isIE(){
        return navigator.appName.indexOf("Microsoft Internet Explorer")!=-1 && document.all;
        }

    function isIE6() {
        return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 6.0")=="-1"?false:true;
        }

    function isIE7(){
        return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 7.0")=="-1"?false:true;
        }

    function isIE8(){
        return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 8.0")=="-1"?false:true;
        }

    function isNN(){
        return navigator.userAgent.indexOf("Netscape")!=-1;
        }

    function isOpera(){
        return navigator.appName.indexOf("Opera")!=-1;
        }

    function isFF(){
        return navigator.userAgent.indexOf("Firefox")!=-1;
        }

    function isChrome(){
        return navigator.userAgent.indexOf("Chrome") > -1;
        }
});