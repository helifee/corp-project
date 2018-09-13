<%--
 * @(#)J030141.jsp
 * Copyright (c) 2009-2010 大连远东计算机系统有限公司
 * All rights reserved.
 *      Project: 教育考试培训系统
 *    SubSystem: 教育子系统
--%>
<%--
 * 变更履历画面
 * 
 * @author lijinling
 * @version 1.00 2010/03/15
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
<script type="text/javascript" src="<%=basePath %>js/common/formValidation.js"></script>
<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>

<!-- 画面用js -->
<script type="text/javascript" src="<%=basePath %>js/ttTraining/j030141.js"></script>
<title>变更履历</title>
</head>
<body onload="init()">
<div class="container">              
<s:include value="../manager/head.jsp" />
<div class="span-24 margin_top_2">
<div class="tt_module padding_bottom_4 overflow_hd">
<s:include value="../manager/navigator.jsp" />
	<div class="container showgrid">
       	<div class="span-24 padding_top_8 title_tt">
			<h2 >变更履历</h2>
		</div>
		
	<s:form id="submitApproveForm" validate="true" action="j030141SubmitModifyHistory" >
		<div class="prepend-5 span-14 append-5">
		<div class="span-3 text_right">
			<label>变更内容描述：</label>
			</div>
			<div class="span-11 last">
				<s:textarea  rows="8" cols="50" id="modifyHistory" name="bookInfo.modifyHistory" />
			</div>
		</div>
		<div class="prepend-5 span-14 append-5">
			<div class="span-3 text_right">
				<label>变更后版本选择：</label>
			</div>
			<div>
				<select id="versionSelect">
				</select>
			</div>
		</div>
		<div class="prepend-10 span-2 margin_top_6"><input type="button"  class="btn span-2" value="提交审批" onclick="submitApprove()"/></div>
		<div class="none font_weight_b">
			<select>
				<option id="tmplOption"></option>
			</select>
		</div>

		<div>
			<s:hidden id="versionNo" name="bookInfo.versionNo" />
			<s:hidden id="updateNo" name="bookInfo.updateNo" />
			<s:hidden id="preVersionNo" name="bookInfo.preVersionNo" />
			<s:hidden id="preUpdateNo" name="bookInfo.preUpdateNo" />
			<s:hidden id="option" name="option"/>
		</div>
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