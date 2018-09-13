<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>人员信息</title>
		<!-- 共通css -->
		<link rel="stylesheet" type="text/css" href="../css/gray.css">
		<link rel="stylesheet" type="text/css" href="../css/manual.css">
		<link rel="stylesheet" type="text/css" href="../js/highlighter/highlighter.css">
		<!-- 共通js -->
		<script type="text/javascript" src="../js/common/prototype.js"></script>
		<script type="text/javascript" src="../js/common/util.js"></script>
		<script type="text/javascript" src="../js/highlighter/highlighter.js"></script>
		<script type="text/javascript" src="../js/manual/common.js"></script>
		<script type="text/javascript" src="../js/manual/sessionStoreManual.js"></script>
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

	<div class="prepend-h">
		<p>ID : <s:property value="personInfo.id"/></p>
		<p>姓名 : <s:property value="personInfo.name"/></p>
		<p>部门 : <s:property value="personInfo.department"/></p>
		<p>职位 : <s:property value="personInfo.position"/></p>
		<p>电话 : <s:property value="personInfo.phoneNumber"/></p>
	
		<s:form action=""  method="post" id="perManagerForm" namespace="/manual">
			<s:hidden name="personInfo.id"/>
			<input id="btnDelete" type="button" value="删除" class="imgBtn2" onclick="del();" />
			<input id="btnModify" type="button" value="修改" class="imgBtn2" onclick="upd('${fromId}');" />
		</s:form>
		
		<p>说明 ： 删除后返回查询页面，利用先前条件重新查询。</p>
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
		<script type="text/javascript">SyntaxHighlighter.config.clipboardSwf="../js/highlighter/scripts/clipboard.swf";SyntaxHighlighter.all();</script>
	</body>
</html>