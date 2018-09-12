/**
 * 关闭页面
 *
 */
window.closePa=function () {
    $(".layer-bg").hide();
    $(".ss").attr("class","ss animated slideOutRight");
};

/**
 * 弹出页面
 * @param path
 */
/*
window.openPa = function(path){
    $("#iframeP").attr("src",path);
    $(".ss").attr("class","ss animated slideInRight").show();
    $(".layer-bg").show();
}*/
window.openPa = function(path){
    $("#iframeP").attr("src",path);
    $(".ss").attr("class","ss animated slideInRight").show();
    $(".layer-bg").show();
    // $(".ss").html('<iframe id="iframeP" src="'+path+'"  style=" border-radius: 0px;border-image: initial;background: inherit;box-shadow: rgba(153, 153, 153, 0.35) -2px 0px 5px;border-width: initial;border-style: none;border-color: initial;height: 100%;width: 100%"></iframe>')
    setTimeout(function(){
        $(".ss").html('<iframe id="iframeP" src="'+path+'" style=" border-radius: 0px;border-image: initial;background: inherit;box-shadow: rgba(153, 153, 153, 0.35) -2px 0px 5px;border-width: initial;border-style: none;border-color: initial;height: 100%;width: 100%"></iframe>')        },500);
};
