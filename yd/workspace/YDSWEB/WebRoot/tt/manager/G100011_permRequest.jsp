<%--
 * @(#)G100011_permRequest.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 管理子系统
--%>

<%--
 * 共通权限申请弹出画面
 * 
 * @author liuyiwei
 * @version 1.00 2010/05/07
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
	<script type="text/javascript" src="<%=basePath %>js/ttManager/ttCommon.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/My97DatePicker/WdatePicker.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/ttManager/g100011.js"></script>
	
	<title>权限申请</title>
</head>
<body onload="initPermRequestForm()">
	<div class="container showgrid">
	<s:include value="../manager/head.jsp" />
		<div class="span-24 margin_top_2">
			<div class="tt_module padding_bottom_4 overflow_hd">
			<s:include value="../manager/navigator.jsp" />
          	<!-- title -->
         	<div class="span-24 padding_top_8 title_tt">
          		<h2>权限申请</h2>
          	</div>
			<div id="permInfoDiv">
				<s:form id="permInfoForm" action="g100011InsertPermRequest"  validate="true">
				    <div class="span-22 last margin_top_6">
				    	<div class="span-3 text_right">
				    		<s:label id="permLbl" value="要申请的权限："/>
				    	</div>
				    	<div class="span-5 last">
				    		<s:select id="permRqstSLT" name="permRequestInfo.authorityId" list="permRqstList"
									listKey="diffNo" listValue="diffName" cssClass="span-2"/>
				 		</div>
				 	</div>
				 	<div class="span-22 last">
				 		<div class="span-3 text_right">
			            	<s:label id="categoryLbl" value="分类选择："/>
			            </div>
						<select class="span-3" id="category1" name="permRequestInfo.category1Id" type="category1Id"></select>
						<select class="span-3" id="category2" name="permRequestInfo.category2Id" type="category2Id"></select>
						<select class="span-3 last" id="category3" name="permRequestInfo.category3Id" type="category3Id"></select>
			        </div>
				 	<div class="span-22">
				 		<div class="span-3 text_right">
			              <s:label id="permTimeLbl" value="权限有效期间："/>
			            </div>
			            <s:textfield id="startTime" name="permRequestInfo.startTime" onclick="WdatePicker()" cssClass="span-2"/>
			            <s:label id="wavesLineLbl" value="～"/>
			            <s:textfield id="endTime" name="permRequestInfo.endTime" onclick="WdatePicker()" cssClass="span-2"/>
					</div>
					<div class="span-22 last">
						<div class="span-3 text_right">
							<s:label id="permReasonLbl" value="申请理由："/>
						</div>
						<div class="span-6 text_left">
							<s:textarea cssClass="span-6" rows="5" id="applyReason" name="permRequestInfo.applyReason" ></s:textarea>
						</div>
					</div>
					<div class="span-22 last margin_top_6">
						<div class="span-2 prepend-3">
							<input type="button" id="submitBtn" name="submitBtn" 
									class="span-2 btn" value="确定" onclick="submitPermRequest()">
						</div>
				 	</div>
				 	<div id="errormsgDiv" class="prepend-2 span-20">
						<s:fielderror></s:fielderror>
					</div>
				</s:form>
			</div>
			<div class="clear_both"></div>
			</div>
		</div>
		<s:include value="../manager/foot.jsp" />
	</div>
</body>
</html>