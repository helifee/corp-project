$(function() {
    //待办区域，单击页签时切换内容
    $("#daiban td.tab").click(function(){
        var index=$(this).find("span.tabIndex").html();
        $("#daiban td.tab").each(function(i,v){
            if(index==i){
                $(v).removeClass("unselected");
                $(v).addClass("selected");
        		var date = new Date();
        		$("#tabContent").mask("数据加载中...");
        		var src = $("#daiban ul.tab"+i).attr("title") + "?requestTime=" + date;
        		$("#daiban ul.tab"+i).find("iframe").attr("src", src);
                $("#daiban ul.tab"+i).show();
            }else{
                $(v).removeClass("selected");
                $(v).addClass("unselected");
                $("#daiban ul.tab"+i).hide();
            }
        });
    });
    
});
function showDetail(url){
	window.location.href (url);
}
