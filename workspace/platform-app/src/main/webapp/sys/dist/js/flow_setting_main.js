
    $(function () {
        $("#content-nav li").click(function () {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $("iframe").attr("src", $(this).attr("oval"));
        });
    });