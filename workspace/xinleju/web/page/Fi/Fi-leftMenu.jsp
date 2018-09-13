<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>财务系统接口</title>
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
    <div class="title"><span><img src="images/leftico01.png" /></span>基础数据</div>
    <ul class="menuson">
      <li class="active"><cite></cite><a href="#" onclick="redirectContentIframe('BusinessObject!list.do');return false;">业务对象注册</a><i></i></li>
      <li><cite></cite><a href="#" onclick="redirectContentIframe('FiSysInfo!list.do');return false;">财务系统列表</a><i></i></li>
    </ul>
    <div class="title"><span><img src="images/leftico01.png" /></span>凭证接口配置</div>
    <ul class="menuson">
      <li ><cite></cite><a href="#" onclick="redirectContentIframe('CorpMapping!list.do');return false;">公司对照</a><i></i></li>
      <li><cite></cite><a href="#" onclick="redirectContentIframe('#!list.do');return false;">会计科目同步</a><i></i></li>
      <li><cite></cite><a href="#" onclick="redirectContentIframe('#!list.do');return false;">辅助核算对照</a><i></i></li>
      <li><cite></cite><a href="#" onclick="redirectContentIframe('#!list.do');return false;">凭证模板设置</a><i></i></li>
    </ul>
     <div class="title"><span><img src="images/leftico01.png" /></span>凭证生成与输出</div>
    <ul class="menuson">
      <li><cite></cite><a href="#" onclick="redirectContentIframe('#!list.do');return false;">凭证生成</a><i></i></li>
      <li><cite></cite><a href="#" onclick="redirectContentIframe('#!list.do');return false;">凭证输出</a><i></i></li>
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
