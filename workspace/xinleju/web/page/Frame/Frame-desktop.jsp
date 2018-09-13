<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>招标采购首页</title>
	<link href="css/xinyuan_style.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="js/dropdowntabs.js"></script>
    <script type="text/javascript" src="js/tabjs.js"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
</head>
<body>
  	<!-- 路径导航 -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td width="49%" valign="top"  class="idx_tb01">
                <ul id="tabnav_new" class="convention_tab_new">
                    <li class="current_tabsr"><a href="#">待办消息(<span id="db_count"></span>)</a></li>  
                    <li><a href="#">待阅消息(<span id="dy_count">${dyCount}</span>)</a></li>
                    <li><a href="#">已办</a></li>
                </ul>
                <div id="cardarea_new">
                    <div class="item"  id="mask_1" title="Frame!desktop1.do">
                       <iframe id="d1" allowTransparency="true" frameborder="0" width="100%" marginheight="0" height="230" marginwidth="0" scrolling="no" src="Frame!desktop1.do" onreadystatechange="setClientHeight('d1',this,'mask_1')" onload="setClientHeight('d1',this,'mask_1')"></iframe>
                    </div>
                    <div class="item display_none" id="mask_2" title="Frame!desktop2.do">
                       <iframe id="d2" allowTransparency="true" frameborder="0" width="100%" marginheight="0" height="230" marginwidth="0" scrolling="no" src="" onreadystatechange="setClientHeight('d2',this,'mask_2')" onload="setClientHeight('d2',this,'mask_2')"></iframe>
                    </div  >
                    <div class="item display_none" id="mask_3"  title="Frame!desktop3.do">
                       <iframe id="d3" allowTransparency="true" frameborder="0" width="100%" marginheight="0" height="230" marginwidth="0" scrolling="no" src="" onreadystatechange="setClientHeight('d3',this,'mask_3')" onload="setClientHeight('d3',this,'mask_3')"></iframe>
                    </div>
                </div>			
			</td>
			<td width="12" valign="top">&nbsp;</td>
			<td valign="top" class="idx_tb01">
                <ul class="convention_tab_new">
                    <li><a href="#">通知公告(<span id="tzgg_count"></span>)</a></li>  
                </ul>			
                <div>
                    <div id="mask_4">
                        <iframe id="d4" allowTransparency="true" frameborder="0" width="100%" marginheight="0" height="230" marginwidth="0" scrolling="no" src="Frame!desktop4.do" onreadystatechange="setClientHeight('d4',this,'mask_4')" onload="setClientHeight('d4',this,'mask_4')"></iframe>
                    </div>
                </div>				
			</td>
		</tr>
	</table>
	<input type="hidden" id="kp_OtherRegional" value="tabnav_new,li,cardarea_new,item,current_tabsr" title="这个必不可少" />
	<jdt:PageMetaTag />
	
	<script type="text/javascript">
    $('#mask_1').mask("数据加载中...");
    $('#mask_2').mask("数据加载中...");
    $('#mask_3').mask("数据加载中...");
    $('#mask_4').mask("数据加载中...");
    function setClientHeight(iframeID, _iframe, maskId) {
        var IS_IE = 0 <= navigator.userAgent.indexOf("MSIE");
        if ((IS_IE && _iframe.readyState == "complete" || !IS_IE)) {
            $('#' + maskId).unmask();
        }
    }

    function more(url) {
        window.location.href = url;
    }

    $(".item iframe").bind("load",function(){
        $("#cardarea_new").unmask();
     });

    $(".item iframe").each(function(){
        var that = this;
        that.onreadystatechange = function(){
            if (that.readyState=="interactive")//state: loading, interactive, complete
              {
                $("#cardarea_new").unmask();
              }
            
        };
     });
    $("#tabnav_new li").click(function(){
        var index = $(this).index();
        var date = new Date();
        var jDiv = $(".item").get(index);
        $("#cardarea_new").mask("数据加载中...");
        var $iframe = $(jDiv).find("iframe");
        var src = $(jDiv).attr("title") + "?requestTime="+date;
        $iframe.attr("src",src);
    });
    
</script>
</body>
</html>
