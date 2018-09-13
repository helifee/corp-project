<%--
 * @(#)Yb0030.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 远东公司内部网
 *    SubSystem: 人员管理
--%>
<%--
 * 员工状态设定画面（主页面JSP）
 * 
 * @author mengqingyang
 * @version 1.00 2010/06/13
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
	<script type="text/javascript" src="<%=basePath%>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/JsContentFilter.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/common/formValidation.js"></script>
	<script type="text/javascript" src="<%=basePath%>js/My97DatePicker/WdatePicker.js"></script>
	
	<!-- 画面用js  -->
	<script type="text/javascript" src="<%=basePath%>js/employee/Yb0030.js"></script>
	
	<title>员工状态设定</title>
</head>
<body onload="init()">
	<jsp:include page="../common/commonPage.jsp"></jsp:include>
	<div id="div_emp_state_main" class="ydscontainer">
		<s:form id="empStateForm" action="yb0030FindStateLst" namespace="/employee" validate="true">
			<div id="errorMessage" class="span-24">
				<s:fielderror></s:fielderror>
			</div>
			<s:hidden id="monthFin" name="monthFin"></s:hidden>
			<s:hidden id="modeFlg" name="modeFlg"></s:hidden>
			<s:hidden id="fromId" name="fromId"></s:hidden>
			<div class="span-24">
			<div class="span-4">
				<div class="span-2 text_right">
					<span>员工编号:</span>
				</div>
				<div class="span-2 last">
					<s:label id="empId" value="%{empId}"/>
					<s:hidden id="empId2" name="empId" />
				</div>
			</div>
			<div class="span-4">
				<div class="span-2 text_right">
					<span>员工姓名:</span>
				</div>
				<div class="span-2 last">
					<s:label id="empNm" value="%{empNm}"/>
					<s:hidden id="empNm2" name="empNm" />
				</div>
			</div>
				<s:if test="modeFlg!=2">
					<div class="span-2 last">
						<input type="button" id="popSelEmp" name="popSelEmp" 
							   value="选择员工" class="btn span-2" onclick="popSelEmp1();"/>
					</div>
	            </s:if>
				<s:if test="modeFlg!=2">
					<div class="span-14 text_right last">
						<input type="button" id="search" name="search" value="查询" class="btn span-2" onclick="searchEmpState();" />
					</div>
	            </s:if>
	       </div>
	       <div class="span-24">
		 		<!-- 人员选择弹出层  -->
				<div id="empSelect" class="none">
					<iframe id="empSelectPage" frameBorder=0 class="overflow_hd"></iframe>  
				</div>
			</div>
		</s:form>

		<!-- 分割线  -->
		<div class="span-24 separator"></div>
		

		<!--员工状态一览列表画面 -->
		<div id="div_peo_empStateList">
			
			<s:include value="Yb0031.jsp" />

		</div>
		<!-- 员工状态设定弹出层  -->
		<div id="div_empStateSet_pop" class="none">
				<table>
				<tr><td>
					<div class="span-2 text_center">
						<span id="stateLabel">员工状态:</span>
					</div>
					<div class="last text_left">
					<s:select id="selStateId" name="empStateForPop.empState" list="stateList" 
							listKey="diffNo" listValue="diffName" cssClass="w_90"/>
					</div>
				</td></tr>
				<tr><td>
					<div class="span-2 text_center">
						<span>状态期间:</span>
					</div>
					<div class="last text_left">
						<s:textfield id="popStartTime" name="popStartTime" onclick="WdatePicker()"></s:textfield>
						<SPAN>~</SPAN>
						<s:textfield id="popEndTime" name="popEndTime" onclick="WdatePicker()"></s:textfield>
					</div>
				</td></tr>
				<tr><td>
					<div class="span-9 text_center">
						<input type="button" id="popOk" name="popOk" 
							   value="确定" class="btn span-2" onclick="popOkClose();" />	
				  	    <input type="button" id="popCancel" name="popCancel" 
					   		   value="取消" class="btn span-2" onclick="popCancelClose();" />	
					</div>
				</td></tr>
				</table>
				<s:hidden id="popIndex"></s:hidden>
		</div>
		<div class="span-24 margin_top_20">
			<div class="span-24 text_right last">
		  	    <input type="button" id="save" name="save" 
			   		   value="保存" class="btn span-2" onclick="saveEmpState();" />
			</div>	
		</div>

</div>
</body>
</html>