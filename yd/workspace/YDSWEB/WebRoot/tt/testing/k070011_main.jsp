<%--
 * @(#)k070011_main.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>
<%--
 * 成绩查询（主页面JSP）
 * 
 * @author chenjunshuai
 * @version 1.00 2010/04/9
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
	<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>	
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>	
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k070011.js"></script>	
	<title>成绩查询</title>
</head>
<body onload="initForm()">
<div class="container">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
	<div id="k070011AllDiv"> 
		<div  class="span-24 padding_top_8 title_tt"><h2>成绩查询</h2></div>
		<div class="nTab">
	        <div class="TabTitle">
	          <ul id="myTab">
	              <li class="active" onclick="nTabs(this,0)">按考试查询</li>
	              <li class="normal" onclick="nTabs(this,1)">按员工查询</li>
	              <!-- 暂时删除-->
	              <div class="none"><li class="normal" onclick="nTabs(this,2)">定位检索</li></div>
	          </ul>
	        </div>
	        <div class="TabContent span-24">
	        	<!-- 考试查询 -->
	        	<div id="divExamineSearchPage" class="TabbedPanelsContent span-24">
		        		<div id="divExamineSearchInfo" class="span-23 prepend-h">
							<s:include value="k070011_examine_view.jsp" />
						</div>
	        		<s:hidden id="oldK070011Form" name="oldK070011Form" value=""/>
	        		<div id="divExamineList" class="span-18 margin_top_6 prepend-h none">
	        			<s:include value="k070011_examine_list.jsp"></s:include>
	        		</div>
	        		<div id="divExamineResultsInfo" class="span-16 margin_top_6 none">
						<s:include value="k070011_examine_results.jsp" />
					</div>
				</div>
				<!-- 员工查询 -->
				<div id="divEmpSearchPage" class="TabbedPanelsContent span-24 none">
					<s:form id="k070011EmpExamineForm" action="k070011GetEmpExamineInfo" method ="post" validate="true">
						<div class="span-24">
							<div class="span-2 text_right"><s:label value="员工ID:"/></div>
	       					<div class="span-2">	        
	   							<s:textfield id="employeesId" name="employeesId"
								maxlength="6" cssClass="span-2" />
	       					</div>
	       					<div class="span-5 ">
	       						<s:textfield id="employeesName" name="employeesName" cssClass="span-2" />
	       					</div>
							<div class="last text_left">
								<input type="button" value="检索" class="span-2 btn" onclick="empExamineSearch()">
							</div>
						</div>
						<s:hidden id="employeesIdHidden" />
					</s:form>
					<s:hidden id="oldK070011EmpExamineForm" name="oldK070011EmpExamineForm" value=""/>
					<div id="divEmpExamineList" class="span-18 margin_top_6 prepend-h none">
						<s:include value="k070011_emp_examine_list.jsp"></s:include>
					</div>
				</div>
				<!-- 定位检索 -->
				<!-- 暂时删除-->
				<div id="divPostionSearchPage" class="TabbedPanelsContent span-24 none">
	        		<div id="divPosExamineSearchInfo" class="span-24">
						<s:include value="k070011_postion_view.jsp" />
					</div>
					<s:hidden id="oldK070011PostionForm" name="oldK070011PostionForm" value=""/>
					<div id="divPosExamineList" class="span-23 margin_top_6 prepend-h none">
						<s:include value="k070011_postion_results.jsp"></s:include>
					</div>									
				</div>
	        </div>	
		</div>
		<div class="clear_both"></div>
	</div>
</div>
</div>
<s:include value="../manager/foot.jsp" />　
</div>
</body>
</html>