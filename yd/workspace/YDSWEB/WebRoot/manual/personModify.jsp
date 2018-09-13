<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>添加分组</title>
		<!-- 共通css -->
		<link rel="stylesheet" type="text/css" href="../css/gray.css">
		<link rel="stylesheet" type="text/css" href="../css/manual.css">
		<link rel="stylesheet" type="text/css" href="../js/highlighter/highlighter.css">
		<!-- 共通js -->
		<script type="text/javascript" src="../js/common/prototype.js"></script>
		<script type="text/javascript" src="../js/common/util.js"></script>
		<script type="text/javascript" src="../js/highlighter/highlighter.js"></script>
		<script type="text/javascript" src="../js/manual/common.js"></script>
	</head>
	
	<body class="bgclr_gray">
		<table class="mbg">
			<tr>
				<td class="mbg_lt"></td>
				<td class="mbg_t"></td>
				<td class="mbg_rt"></td>
			</tr>
			<tr>
				<td class="mbg_l"></td>
				<td class="mbg_c">		
				<!-- 内容开始 -->	
	<jsp:include page="../common/commonPage.jsp"></jsp:include>
	<div class="span-18">
	
		<s:form  action="savePerson" namespace="/manual" method="post">
			<div class="span-12 margin_top_20 prepend-h">

				<div class="span-8 margin_top_10">
					<div class="span-1">ID : </div>
					<div class="span-4"><s:property value="personInfo.id"/></div>
				</div>
				<div class="span-8 margin_top_10">
					<div class="span-1">姓名</div>
					<div class="span-4"><s:textfield name="personInfo.name" cssClass="span-3"/></div>
				</div>
				<div class="span-8 margin_top_10 text_center">
				    <s:hidden name="personInfo.id"/>
					<s:submit value="保存" cssClass="imgBtn2" ></s:submit>
				</div>	
			</div>
			<s:hidden name="fromId"/>
		</s:form>
		
	</div>	
				<!-- 内容结束 -->	
				</td>
				<td class="mbg_r"></td>
			</tr>
			<tr>
				<td class="mbg_lb"></td>
				<td class="mbg_b"></td>
				<td class="mbg_rb"></td>
			</tr>
		</table>
	</body>
</html>