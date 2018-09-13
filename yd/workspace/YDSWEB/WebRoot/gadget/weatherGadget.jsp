<%--
 * @(#)weatherGadget.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	<link href="<%=basePath%>css/gadget.css" rel="stylesheet" type="text/css">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/gadget/base.js"></script>
	<script type="text/javascript">
	function resize(size){
		if (size == 2) {
			$('content').removeClassName('w_300').addClassName('w_600');
			$('extInfo').show();
		} else if (size == 1) {
			$('content').removeClassName('w_600').addClassName('w_300');
			$('extInfo').hide();
		}
		setHeight(200);
	}
	</script>
	<style type="text/css">
		#content.w_300{height:200px;background:url(../images/activeDesk/weather/bg1.png) no-repeat}
		#content.w_600{height:200px;background:url(../images/activeDesk/weather/bg2.png) no-repeat}
		#mainInfo div{position:absolute;}
		.bigImg{left:30px;top:-13px;width:120px;height:120px;}
		.bigTemp{left:160px;top:10px;font-size:48px;font-family:Arial,SimSun,"宋体";font-weight:bold;}
		.line{width:330px;top:102px;}
		.weatherBlock{top:100px;width:113px;}
		.weatherBlock div{font-size:12px; line-height:12px;color:#666666;}
		.weatherBlock img{width:45px;height:45px}
		.smallImg1{left:8px;top:0px;}
		.smallImg2{left:52px;top:0px;}
		.smallTemp{left:0px;top:50px;width:113px;text-align:center;}
		.smallWeather{left:0px;top:65px;width:113px;text-align:center;}
		.smallWind{left:0px;top:80px;width:113px;text-align:center;}
		#day0{left:5px;}
		#day1{left:113px;}
		#day2{left:221px;}
		#extInfo{left:335px;padding:10px;width:320px;}
	</style>
<base target="main"> 
<title>天气早知道</title>
</head>
<body scroll="no">
<div id="content" class="w_300 position_rel overflow_hd">
	<div id="mainInfo" class="w_300 position_abs">
		<div class="bigImg"><img src="<%=basePath%>images/activeDesk/weather/${weatherReport.todayPicStart}.png" /></div>
		<div class="bigTemp" title="更新时间：${weatherReport.updateTime}">${weatherReport.metar}</div>
		<div class="line"></div>
		<div id="day0" class="weatherBlock">
			<div class="smallImg1"><img src="<%=basePath%>images/activeDesk/weather/${weatherReport.todayPicStart}.png" /></div>
			<div class="smallImg2"><img src="<%=basePath%>images/activeDesk/weather/${weatherReport.todayPicEnd}.png" /></div>
			<div class="smallTemp">今天&nbsp;${weatherReport.todayTemperature}</div>
			<div class="smallWeather">${weatherReport.todayWeather}</div>
			<div class="smallWind">${weatherReport.todayWind}</div>
		</div>
		<div id="day1" class="weatherBlock">
			<div class="smallImg1"><img src="<%=basePath%>images/activeDesk/weather/${weatherReport.tomorrowPicStart}.png" /></div>
			<div class="smallImg2"><img src="<%=basePath%>images/activeDesk/weather/${weatherReport.tomorrowPicEnd}.png" /></div>
			<div class="smallTemp">明天&nbsp;${weatherReport.tomorrowTemperature}</div>
			<div class="smallWeather">${weatherReport.tomorrowWeather}</div>
			<div class="smallWind">${weatherReport.tomorrowWind}</div>
		</div>
		<div id="day2" class="weatherBlock">
			<div class="smallImg1"><img src="<%=basePath%>images/activeDesk/weather/${weatherReport.thirdDayPicStart}.png" /></div>
			<div class="smallImg2"><img src="<%=basePath%>images/activeDesk/weather/${weatherReport.thirdDayPicEnd}.png" /></div>
			<div class="smallTemp">后天&nbsp;${weatherReport.thirdDayTemperature}</div>
			<div class="smallWeather">${weatherReport.thirdDayWeather}</div>
			<div class="smallWind">${weatherReport.thirdDayWind}</div>
		</div>
	</div>
	<div id="extInfo" class="position_abs">
		${weatherReport.lifeExpectancy}
	</div>
</div>
	<!--[if IE 6]>
		<script type="text/javascript" src="<%=path %>/js/common/fix/IE7.js">IE7_PNG_SUFFIX = ".png";</script>
	<![endif]-->
</body>
</html>