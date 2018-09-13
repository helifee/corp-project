<%--
 * @(#)NewsGadget.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 公告系统
--%>

<%--
 * 公告新闻（主页面JSP）
 * 
 * @author 远东)zhangzheng
 * @version 1.00 2010/08/25
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

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gadget/NewsGadget.js"></script>
	
	<base target="main">
	<title>公告新闻</title>
</head>
<body onload="init();" scroll="no">
<div id="content" class="w_300 h_150 nTab overflow_hd">
<!-- 内容区域 -->
	<div class="TabTitle">
		<ul id="newsTabs">
			<li id="tab_pubs" class="normal">公告</li>
			<li id="tab_news" class="normal">新闻</li>
			<li id="tab_brief" class="normal bd_r_1sccc">简报</li>
		</ul>
	</div>
	<div class="font_simsun padding_left_10 padding_right_10 padding_top_10">
		<div id="pubs" class="none nlist">
			<s:iterator value="pubsList">
				<div class="position_rel h_22">
					<div class="position_abs">
						<div class="padding_top_2 float_l margin_right_2">						
							<s:if test="passDayType==0">
								<img src="../images/activeDesk/new.gif">
							</s:if>
							<s:else>
								<img src="../images/activeDesk/infoIcon.png">
							</s:else>
						</div>
						<a href="http://www.yds.yd/mail/NOTEXX.jsp?NTS_ID=${newsId}" title="${newsTitle}">${newsTitle}</a>
					</div>
					<div class="position_abs abs_right ndate">${newsDate}</div>
				</div>
			</s:iterator>
			<div class="float_r clear_both"><a href="http://www.yds.yd/mail/NOTEGD.jsp?NTS_PROP=0" title="更多&gt;&gt;">更多&gt;&gt;</a></div>
		</div>
		<div id="news" class="none nlist">
			<s:iterator value="newsList">
				<div class="position_rel h_22">
					<div class="position_abs">
						<div class="padding_top_2 float_l margin_right_2">	
							<s:if test="passDayType==0">
								<img src="../images/activeDesk/new.gif">
							</s:if>
							<s:else>
								<img src="../images/activeDesk/infoIcon.png">
							</s:else>
						</div>
						<a href="http://www.yds.yd/mail/NOTEXX.jsp?NTS_ID=${newsId}" title="${newsTitle}">${newsTitle}</a></div>
					<div class="position_abs abs_right ndate">${newsDate}</div>
				</div>
			</s:iterator>
			<div class="float_r clear_both"><a href="http://www.yds.yd/mail/NOTEGD.jsp?NTS_PROP=1" title="更多&gt;&gt;">更多&gt;&gt;</a></div>
		</div>
		<div id="brief" class="none nlist">
			<s:iterator value="briefList">
				<div class="position_rel h_22">
					<div class="position_abs">
						<div class="padding_top_2 float_l margin_right_2">	
							<s:if test="passDayType==0">
								<img src="../images/activeDesk/new.gif">
							</s:if>
							<s:else>
								<img src="../images/activeDesk/infoIcon.png">
							</s:else>
						</div>
						<a href="http://www.yds.yd/mail/NOTEXX.jsp?NTS_ID=${newsId}" title="${newsTitle}">${newsTitle}</a></div>
					<div class="position_abs abs_right ndate">${newsDate}</div>
				</div>
			</s:iterator>
			<div class="float_r clear_both"><a href="http://www.yds.yd/mail/NOTEGD.jsp?NTS_PROP=2" title="更多&gt;&gt;">更多&gt;&gt;</a></div>
		</div>
	</div>
<!-- 内容区域 -->
</div>
<!--[if IE 6]>
	<script type="text/javascript" src="<%=path %>/js/common/fix/IE7.js">IE7_PNG_SUFFIX = "-ie6.png";</script>
<![endif]-->
</body>
</html>