<%--
 * @(#)Yb0070.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>

<%--
 * 组管理画面（主页面JSP）
 * 
 * @author fangjiayuan
 * @version 1.00 2010/08/05
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"	pageEncoding="utf-8"%>
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
	<script type="text/javascript" src="<%=basePath%>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsContentFilter.js"></script>
	

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/employee/Yb0070.js"></script>
	
	<title>自定义组管理</title>
</head>
<body onload="initForm()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div id="div_emp_team_main"  class="ydscontainer">
<!-- 组一览列表画面 -->
	<div id="div_emp_team_list" >
		<s:include value="Yb0072.jsp" />
	</div>
	<div id="div_team_apply" >
		<s:if test="applayMap.size > 0">
			<s:form id="teamApplayForm" action="" namespace="/employee" method="post" validate="true">
				<div class="span-22">
					<div class="span-20 font_weight_b margin_top_10">
						<span id="applayLabel">申请内容</span>
					</div>
					<div  id="table_applay" class="span-6 bd_1s999 overflow_scr_y last">		
						<div class="span-5 last">
							<s:checkboxlist id="applayInfosList" name="yb0071CondA.applayInfosList" list="applayMap" listKey="key" listValue="value" onclick="applayAllNoCheck()"/>
						</div>
					</div>
				</div>
			</s:form>
			<div class="span-9 last margin_bottom_6 margin_top_10">
				<div class="span-4 last">
					<s:checkbox name="applayAll" id="applayAll" value="false" onclick="applayAllCheck()"></s:checkbox>
					<span>全选</span>
				</div>		
					<input type="button" id="consentBtn" name="consentBtn" value="同意" class="btn span-2" onclick="agree()"/>
					<input type="button" id="noConsentBtn" name="noConsentBtn" value="不同意" class="btn span-2" onclick="disAgree()"/>
			</div>								
		</s:if>	
	</div>
	<div id="div_emp_team_creat" class="none">
		<s:include value="Yb0071.jsp" />
	</div>
	<!-- 人员选择弹出层  -->
	<div id="empSelect" class="none">
		<iframe id="empSelectPage" frameBorder=0 class="overflow_hd"></iframe>  
	</div>	
</div>
</body>
</html>