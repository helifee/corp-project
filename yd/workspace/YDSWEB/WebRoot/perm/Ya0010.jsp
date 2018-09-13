<%--
 * @(#)Ya0010.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 权限管理
--%>

<%--
 * 职位角色管理画面
 * 
 * @author lijinling
 * @version 1.00 2010/01/26
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
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
<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>

<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath%>js/perm/Ya0010.js"></script>
<title>职位角色管理</title>
</head>
<body onload="init()" >
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div class="ydscontainer">
	<div class="prepend-7 span-12 append-5 last">
		<div class="span-12 last">
			<!-- 职位一览 -->
			<div class="span-5 box_border_t box_border_l box_border_b last">
				<div class=" box_head_bc box_border_b text_center">
					<span class="font_weight_b">职位</span>
				</div>
				<div class="overflow_scr_y  h_230">
					<ul id="poslist" class="list_reset text_center">
						<s:iterator value="positionInfo" >
							<li class="box_border_b" onclick="focusPos(this)">
								<div>
									<s:hidden value="%{posId+','+posName}" name="position"></s:hidden>
									<s:property value="posName"/>
								</div>
							</li>
						</s:iterator>
					</ul>
				</div>
			</div>
			<!-- 角色一览 -->
			<div id="role" class="span-5 box_border last">
				<div class="box_head_bc box_border_b last text_center">
					<span class="font_weight_b">对应角色</span>
				</div>
				<div class="span-5 overflow_scr_y h_230 last">
					<ul class="list_reset">
						<s:iterator value="roleInfo">
							<li class="prepend-1">
								<div class="span-4 last"  flag="0" onclick="selectRole(this)">
									<s:checkbox name="roles" fieldValue="%{roleId+','+roleName}"/>
									<s:property value ="roleName"/>
								</div>
							</li>
						</s:iterator>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<hr class = "space"/>
	<!-- 调整结果 -->
	<div class="prepend-4 span-2 append-18 last">
		<span class="font_weight_b">调整结果</span>
	</div>
	<div class="prepend-4 span-16 append-4 last" >
		<div class="span-16 box_border last">
			<div class="span-16 last">
				<table class="datagrid2">
					<thead>
						<tr>
							<th class="percent_14">职位</th>
							<th class="percent_36">调整前</th>
							<th>调整后</th>
							<th class="percent_14">操作</th>
							<th class="none"></th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="span-16 float_l h_122 overflow_scr_y last">
				<div class="span-16 last">
					<table id="sublist" class="datagrid2">
						<tr id="temp" class="none">
							<td class="percent_14 vertical_mid"></td>
							<td class="percent_36 vertical_mid"></td>
							<td></td>
							<td class="percent_14 text_center vertical_mid"><a href='#' onclick='cancelRow(this)'>取消</a></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="span-20 append-3 text_right margin_top_4">
		<input type="button" id="submitBtn" class="btn span-2" onclick="submitAll()" value="保存">
	</div>
	<input type="hidden" value="default" id="posId">
</div>
<div>
	<!-- 刷新页面 -->
	<s:form action="ya0010Init" method="post" id="refresh">
	</s:form>
	<!--角色信息授权出层-->
	<div id="myPopContent01" class="none">
		<iframe id="myInnerPage" frameBorder="0"></iframe>
	</div>
</div>
</body>
</html>