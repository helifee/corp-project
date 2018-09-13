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
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>大连远东计算机系统有限公司-内部网</title>
<base href="<%=basePath%>">
<base target="main">
<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
<!-- 共通js -->
<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
<!-- 画面js -->
<script type="text/javascript" src="<%=basePath %>js/menu/menu.js"></script>
</head>
<body onload="getThemeList();">
<div class="header">
	<div class="headerLink">
		<a class="headerExit" href="common/logout.action" target="_top">安全退出</a>		
		<a class="reAdvice cur_pointer" onclick="parent.frames['center'].advicePop();">意见反馈</a>
		<a class="myHomeSet" href="gadget/initManageGadget.action">首页设置</a>
		<a class="myHome" href="main.jsp" target="main">我的首页</a> 
	</div>
	<p id="themeList"></p>
	<div class="quickLink">
		<div >
			<a href="http://www.yds.yd/kaoqin/KQXXHM_FRAME.jsp">
				<img src="images/activeDesk/kaoqin.png">考勤信息
			</a>
		</div>
		<div >
			<a  href="/meet/yc0020SystemTimeinit.action">
				<img src="images/activeDesk/meetting.png">会议预约
			</a>
		</div>
		<div >
			<a href="http://192.168.80.172/seat/sekiSearch.jsp?LFLG=4">
				<img src="images/activeDesk/seat.png">坐席查询
			</a>
		</div>
		<div>
			<a  href="http://www.yds.yd/shebei/DEV_BORROW_LOGIN.jsp">
				<img src="images/activeDesk/book.png">借书续借
			</a>
		</div>
	</div>
</div>
</body>
</html>
