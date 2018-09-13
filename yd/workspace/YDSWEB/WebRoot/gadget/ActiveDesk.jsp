<%--
 * @(#)ActiveDesk.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 活动桌面
--%>

<%--
 * 个人活动桌面（主页面JSP）
 * 
 * @author 远东)zhangzheng
 * @version 1.00 2010/08/12
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
	<script type="text/javascript" src="<%=basePath %>js/common/scriptaculous/scriptaculous.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/gadget/ActiveDesk.js"></script>
	<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-store, must-revalidate"> 
	<META HTTP-EQUIV="expires" CONTENT="0"> 	
	<title>个人活动桌面</title>
</head>
<body onselectstart="return false;">
<div class="float_l padding_top_4">
<!-- 内容区域 -->
<div id="mask" style="width:100%;height:100%;position:fixed;top:0;left:0;background:url(<%=basePath %>js/common/fix/blank.gif);display:none;_position:absolute;_top:expression(documentElement.scrollTop + 'px');"></div>
<s:hidden id="gadgetSize" value="%{activeDeskInfoList.size}"/>
<div id="wall">	
	<div id="leftRail" class="gadgetRail">
		<div id="Road_0" class="gadgetRoad gadgetWay2">
			<s:iterator value="activeDeskInfoList">
			<s:if test="locationCol == 0">
				<div id="gg_${gadgetId}" class="gadget type${gadgetInfo.gadgetType}">
					<div class="gadgetHead">
						<div class="gadgetTitle">
							<div style="height:19px;width:17px;background-image:url(<%=basePath %>images/activeDesk/icon/${gadgetInfo.preImg});background-repeat:no-repeat;float:left;margin-top:3px">
							</div>
							${gadgetInfo.gadgetNm}
						</div>
						<div class="gadgetButton">
							<s:if test="gadgetInfo.refreshFlg != 0">
								<a href="#this" class="gadgetRefresh" onclick="refreshEvent(this);" title="刷新"></a>
							</s:if>
							<s:if test="gadgetInfo.foldFlg != 0">
								<a href="#this" class="gadgetToggle" onclick="togEvent(this);" title="<s:if test="modeFlg == \"2\"">展开</s:if><s:else>收缩</s:else>"></a>
							</s:if>
							<s:if test="gadgetInfo.closeFlg != 0">
								<a href="#this" class="gadgetClose" onclick="closeEvent(this);" title="关闭"></a>
							</s:if>
						</div>
					</div>
					<div class="gadgetBody position_rel" style="display:<s:if test="modeFlg == \"2\"">none</s:if>">
						<div style="height:0px;">
							<iframe src="${gadgetInfo.gadgetUrl}" height="100%" width="100%" frameborder="0" onload="gadgetLoad('gg_${gadgetId}', this);"></iframe>
						</div>
						<div style="position:absolute;top:0;left:0;width:100%;height:0px;background:url(<%=basePath %>js/common/fix/blank.gif)"></div>
					</div>
				</div>
			</s:if>
			</s:iterator>
		</div>
		<div id="Road_1" class="gadgetRoad gadgetWay1">
			<s:iterator value="activeDeskInfoList">
			<s:if test="locationCol == 1">
				<div id="gg_${gadgetId}" class="gadget type${gadgetInfo.gadgetType}">
					<div class="gadgetHead">
						<div class="gadgetTitle">
							<div style="height:19px;width:17px;background-image:url(<%=basePath %>images/activeDesk/icon/${gadgetInfo.preImg});background-repeat:no-repeat;float:left;margin-top:3px">
							</div>
							${gadgetInfo.gadgetNm}
						</div>
						<div class="gadgetButton">
							<s:if test="gadgetInfo.refreshFlg != 0">
								<a href="#this" class="gadgetRefresh" onclick="refreshEvent(this);" title="刷新"></a>
							</s:if>
							<s:if test="gadgetInfo.foldFlg != 0">
								<a href="#this" class="gadgetToggle" onclick="togEvent(this);" title="<s:if test="modeFlg == \"2\"">展开</s:if><s:else>收缩</s:else>"></a>
							</s:if>
							<s:if test="gadgetInfo.closeFlg != 0">
								<a href="#this" class="gadgetClose" onclick="closeEvent(this);" title="关闭"></a>
							</s:if>
						</div>
					</div>
					<div class="gadgetBody position_rel" style="display:<s:if test="modeFlg == \"2\"">none</s:if>">
						<div style="height:0px;">
							<iframe src="${gadgetInfo.gadgetUrl}" height="100%" width="100%" frameborder="0" onload="gadgetLoad('gg_${gadgetId}', this);"></iframe>
						</div>
						<div style="position:absolute;top:0;left:0;width:100%;height:0px;background:url(<%=basePath %>js/common/fix/blank.gif)"></div>
					</div>
				</div>
			</s:if>
			</s:iterator>
		</div>
		<div id="Road_2" class="gadgetRoad gadgetWay1">
			<s:iterator value="activeDeskInfoList">
			<s:if test="locationCol == 2">
				<div id="gg_${gadgetId}" class="gadget type${gadgetInfo.gadgetType}">
					<div class="gadgetHead">
						<div class="gadgetTitle">
							<div style="height:19px;width:17px;background-image:url(<%=basePath %>images/activeDesk/icon/${gadgetInfo.preImg});background-repeat:no-repeat;float:left;margin-top:3px">
							</div>
							${gadgetInfo.gadgetNm}
						</div>
						<div class="gadgetButton">
							<s:if test="gadgetInfo.refreshFlg != 0">
								<a href="#this" class="gadgetRefresh" onclick="refreshEvent(this);" title="刷新"></a>
							</s:if>
							<s:if test="gadgetInfo.foldFlg != 0">
								<a href="#this" class="gadgetToggle" onclick="togEvent(this);" title="<s:if test="modeFlg == \"2\"">展开</s:if><s:else>收缩</s:else>"></a>
							</s:if>
							<s:if test="gadgetInfo.closeFlg != 0">
								<a href="#this" class="gadgetClose" onclick="closeEvent(this);" title="关闭"></a>
							</s:if>
						</div>
					</div>
					<div class="gadgetBody position_rel" style="display:<s:if test="modeFlg == \"2\"">none</s:if>">
						<div style="height:0px;">
							<iframe src="${gadgetInfo.gadgetUrl}" height="100%" width="100%" frameborder="0" onload="gadgetLoad('gg_${gadgetId}', this);"></iframe>
						</div>
						<div style="position:absolute;top:0;left:0;width:100%;height:0px;background:url(<%=basePath %>js/common/fix/blank.gif)"></div>
					</div>
				</div>
			</s:if>
			</s:iterator>
		</div>
	</div>
	<div id="rightRail"  class="gadgetRail">
		<div id="Road_3" class="gadgetRoad gadgetWay1">
			<s:iterator value="activeDeskInfoList">
			<s:if test="locationCol == 3">
				<div id="gg_${gadgetId}" class="gadget type${gadgetInfo.gadgetType}">
					<div class="gadgetHead">
						<div class="gadgetTitle">
							<div style="height:19px;width:17px;background-image:url(<%=basePath %>images/activeDesk/icon/${gadgetInfo.preImg});background-repeat:no-repeat;float:left;margin-top:3px">
							</div>
							${gadgetInfo.gadgetNm}
						</div>
						<div class="gadgetButton">
							<s:if test="gadgetInfo.refreshFlg != 0">
								<a href="#this" class="gadgetRefresh" onclick="refreshEvent(this);" title="刷新"></a>
							</s:if>
							<s:if test="gadgetInfo.foldFlg != 0">
								<a href="#this" class="gadgetToggle" onclick="togEvent(this);" title="<s:if test="modeFlg == \"2\"">展开</s:if><s:else>收缩</s:else>"></a>
							</s:if>
							<s:if test="gadgetInfo.closeFlg != 0">
								<a href="#this" class="gadgetClose" onclick="closeEvent(this);" title="关闭"></a>
							</s:if>
						</div>
					</div>
					<div class="gadgetBody position_rel" style="display:<s:if test="modeFlg == \"2\"">none</s:if>">
						<div style="height:0px;">
							<iframe src="${gadgetInfo.gadgetUrl}" height="100%" width="100%" frameborder="0" onload="gadgetLoad('gg_${gadgetId}', this);"></iframe>
						</div>
						<div style="position:absolute;top:0;left:0;width:100%;height:0px;background:url(<%=basePath %>js/common/fix/blank.gif)"></div>
					</div>
				</div>
			</s:if>
			</s:iterator>
		</div>
	</div>
</div>
<!-- 内容区域 -->
<div class="none">
	<jsp:include page="../common/commonPage.jsp"></jsp:include>
</div>
</div>
</body>
</html>