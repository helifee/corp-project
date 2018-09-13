<%--
 * @(#)k060011.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 考试子系统
--%>

<%--
 * 考试新建及权限分配
 * @author chenzhong
 * @version 1.00 2010/04/13
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
	<link href="<%=basePath%>${session.userTheme}"  rel="stylesheet" type="text/css">

	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttTesting/k060011.js"></script>

	<title>考试新建及权限分配</title>
</head>
<body onload="initForm()">
<div class="container">
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
	<div class="container showgrid ">
		<div class="padding_top_8 title_tt span-24">
			<h2>考试新建及权限分配</h2>
		</div>
		<s:form id="k060011Form" validate="true" action="k060011SubmitExamineInfo" method="post">
			<div class="span-24">
				<div class="span-3 text_right"><s:label value="考试名称：" /></div>
				<div class="span-6 text_left">
					<s:textfield id="examineName" name="examineInfo.examineName" maxlength="200" cssClass="span-10" />
				</div>
			</div>
			<div class="span-24 ">
			<div class="span-3 text_right"><s:label value="考试分类：" /></div>
				<div class="span-21 last">
						<select id="sltCategory1" name="category1Id" type="category1Id" Class="span-3"
								defaultValue="${sltCategory1}" accesskey="${sltCategory1Enable}"></select>
					
						<select id="sltCategory2" name="category2Id" type="category2Id" Class="span-3"
								defaultValue="${sltCategory2}" accesskey="${sltCategory2Enable}"></select>
					
						<select id="sltCategory3" name="category3Id" type="category3Id" Class="span-3"
								defaultValue="${sltCategory3}" accesskey="${sltCategory3Enable}"></select>
				</div>
			</div>
			<div class="span-24 ">
				<div class="span-3 text_right"><s:label value="实施者：" /></div>
				<div class="span-2">
					<s:textfield id="executantId" name="executantInfo.userId" maxlength="6" cssClass="span-2" />
				</div>
				<div class="span-2 last">
					<s:textfield id="executantName" name="executantInfo.userName" cssClass="span-2" />
				</div>
			</div>
			
		    <!-- 针对对象 -->
		    <div class="span-24 ">
		        <div class="span-3 text_right">
		       		<s:label value="针对对象：" />	  	        
		        </div>
		      	<!-- 针对对象 -->
		        <div class="span-3" id="div_objectType">
		     		<s:select id="objectTypeList" name="examineInfo.objectType" list="targetList" 
						listKey="diffNo" listValue="diffName" cssClass="span-3" onchange="showSelectDiv()"/>
		        </div>
		     	<!-- 针对项目组 -->
		        <div class="span-3 append-15 display_block last none" id="div_project">
					<s:select id="obj2" name="objectValue2" list="orgList" 
						listKey="orgId" listValue="orgNm" cssClass="span-3 display_none"/>
		        </div>
		    	<!--针对工龄 -->
		        <div class="span-6 append-12 display_none last none" id="div_year">
		            <div class="span-2 text_right">
		            	<label id="txtShow">入社不满：</label>
		           	</div> 	            
		            <div class="span-3 last" >
		      			<s:select id="yearList" name="examineInfo.objectValue" list="joinYearList" 
							listKey="diffNo" listValue="diffName" cssClass="span-3"/>          
		            </div>
		        </div>
				<!-- 针对个人 -->
				<div class="span-3 last none" id="div_person_button">
	              	<div>
	              		<input type="button" value="选择人员" id="btnSelectUser" class="span-2 btn"
		                 onClick="userSelect(1,'div_person')"/>
		            </div>
	          	</div>
	        	<div class="span-18 prepend-6 none" id="div_person">
					<s:hidden id="userIdList" name="strUserIdList"/>
					<s:label id="strUserNameList" name="strUserNameList" keep="1"/>
				</div>
		    </div>
			<!-- 编辑人员一览 -->
		    <div class="span-24 ">
		        <div class="span-3 append-21 text_right">
		       		<s:label value="编辑人员一览：" />	  	        
		        </div>
		 	   	<!-- include:编辑人员一览共通(jsp) -->
				<s:include value="../manager/editorList.jsp" />
		    </div>
			<div class="span-24 text_center margin_top_6">
				<input type="button" id="dosubmit" name="dosubmit" value="确定" class="span-2 btn"
				 onclick="doSubmit()"/>
			</div>
			<s:hidden id="examineId" name="examineInfo.examineId" />
			<s:hidden name="examineId" />
			<div class="prepend-2 span-20">
				<s:fielderror></s:fielderror>
			</div>
		</s:form>
		<div class="clear_both"></div>
	</div>
	</div>
  </div>
<s:include value="../manager/foot.jsp" />
</div>
</body>
</html>
