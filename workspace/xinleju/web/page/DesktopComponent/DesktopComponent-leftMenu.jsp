<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>桌面部件</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/search.js"></script>
<script type="text/javascript">
$(function(){	
	//导航切换
	$(".menuson li").click(function(){
		$(".menuson li.active").removeClass("active")
		$(this).addClass("active");
	});
	
	$('.title').click(function(){
		var $ul = $(this).next('ul');
		$('dd').find('ul').slideUp();
		if($ul.is(':visible')){
			$(this).next('ul').slideUp();
		}else{
			$(this).next('ul').slideDown();
		}
	});
})	
</script>
</head>

<body style="background:#f0f9fd;">
<dl class="leftmenu">
  <dd>
    <div class="title"><span><img src="images/leftico01.png" /></span>桌面部件</div>
    <ul class="menuson">
      <li class="active"><cite></cite><a href="#" onclick="redirectContentIframe('DesktopComponent!list.do');return false;">部件</a><i></i></li>
      <li><cite></cite><a href="#" onclick="redirectContentIframe('DeskTop!list.do');return false;">桌面</a><i></i></li>
    </ul>
  </dd>
  
</dl>
</body>
</html>
<script>
	function redirectContentIframe(myUrl){
		parent.document.getElementById("rightFrame").src=myUrl;
	}
</script>
