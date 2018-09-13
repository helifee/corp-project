<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/META-INF/struts-tags.tld"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Insert title here</title>
	<link href="../css/gray.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="../js/common/prototype.js"></script>
	<script type="text/javascript" src="../js/common/util.js"></script>
</head>
<body class="span-10">
<div class="span-8 prepend-1">
	<s:form action="baseSubmitAction" validate="true">
		<div class="span-8 last"><h2>基本校验</h2></div>
		<div class="span-8 last">
			<div class="span-1 text_right">姓名</div>
			<div class="span-2">
				<s:textfield name="yourName" tooltip="输入姓名" cssClass="span-2"/>
			</div>
			<div class="span-1 text_right">电话</div>
			<div class="span-4 last">
				<s:textfield name="yourPhone" tooltip="电话(0411-11223344)" cssClass="span-4"/>
			</div>
		</div>
		<div class="span-8 last">
			<div class="span-1 text_right">年龄</div>
			<div class="span-2">
				<s:textfield name="yourAge" tooltip="输入年龄(18-60)" cssClass="span-2"/>
			</div>
			<div class="span-1 text_right">邮箱</div>
			<div class="span-4 last">
				<s:textfield name="yourMail" tooltip="电子邮箱" cssClass="span-4"/>
			</div>
		</div>
		<div class="span-8 text_right">
			<div class="span-4 text_center"><s:fielderror /></div>
			<s:submit value="提交" cssClass="btn span-2"/>
			<input type="button" value="错误测试" class="btn span-2" onclick="$('baseSubmitAction').submit();"/>
		</div>
	</s:form>
</div>
</body>
</html>