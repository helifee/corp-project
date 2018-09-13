<%--
 * @(#)Yc0020.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 会议室管理
--%>

<%--
 * 会议室预约一览画面（主页面JSP）
 * 
 * @author fangjiayuan
 * @version 1.00 2010/07/23
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

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/meet/Yc0020.js"></script>	
	<title>会议室预约情况一览</title>
</head>
<body onload="init();">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div id="meetTitle" class="none">会议室</div>
<div id="content" class="ydscontainer position_rel none">	
	<div class="span-24">
		<div id="metMap" class="hysMap"></div>
	</div>
	<!-- 分割线  -->
	<div class="span-24 margin_top_6 separator"></div>
	<div>
		<s:hidden id="sparkPopUpMsg" name="sparkPopUpMsg"></s:hidden>
	</div>
	<div class="span-24 margin_top_6 margin_bottom_4">
		<div class="prepend-7 span-3 float_l">
			<div id="btnPrev" class="btn span-2 text_center margin_right_10" onclick="gotoDay(-1);">&lt;&lt;前一天</div>
		</div>
		<div class="span-2 padding_top_2">
			<input type="text" id="viewDay" name="metDate" onclick="changeDay();" onblur="dayOnchange();" nowday="${metDate}" today="${today}" nowtime="${nowTimeScale}" class="span-2"/>
		</div>
		<div class="span-2 text_indent_8">
			<span id="weekDay"></span>
		</div>
		<div class="span-8 float_l last ">
			<div id="btnNext" class="margin_left_8 btn span-2 text_center" onclick="gotoDay(1);">后一天&gt;&gt;</div>
		</div>	
	</div>
	<div class="span-24">
		<div class="float_l span-2 ">
			<div class="span-1 font_simsun">&nbsp;</div>
			<div id="metList"></div>
		</div>
		<div class="span-22 last  position_rel">
			<div class="float_l margin_bottom_4 ">
				<div class="float_l font_simsun margin_left_p15">
					<div class="float_l hysTimeText">&nbsp;&nbsp;&nbsp;08:00</div>
					<div class="float_l hysTimeText">09:00</div>
					<div class="float_l hysTimeText">10:00</div>
					<div class="float_l hysTimeText">11:00</div>
					<div class="float_l hysTimeText">12:00</div>
					<div class="float_l hysTimeText">13:00</div>
					<div class="float_l hysTimeText">14:00</div>
					<div class="float_l hysTimeText">15:00</div>
					<div class="float_l hysTimeText">16:00</div>
					<div class="float_l hysTimeText">17:00</div>
					<div class="float_l margin_left_p18">18:00</div>
				</div>
				<div id="tLine" class="float_l font_size_0 hysTimeLine"></div>
			</div>
			<div id="metDaymetList" class="float_l">
			</div>
		</div>
	</div>
	<div id="metToolTip" class="hysToolTip">
		<table>
			<tr>
				<td class="text_right percent_24">名称：</td>
				<td id="tipMetNm" class="span-3"></td>
			</tr>
			<tr>
				<td class="text_right">人数：</td>
				<td id="tipContainCnt"></td>
			</tr>
			<tr>
				<td class="text_right">设备：</td>
				<td id="tipEquipment"></td>
			</tr>
			<tr>
				<td class="text_right">网线：</td>
				<td id="tipNetInterface"></td>
			</tr>
			<tr>
				<td class="text_right">电话：</td>
				<td id="tipTel"></td>
			</tr>
		</table>
	</div>
	<!--会议室预约详细弹出层-->
    <div id="myPopContent01" class="none">
		<iframe id="myInnerPage" frameBorder="0"></iframe>
    </div>	
</div>
</body>
</html>