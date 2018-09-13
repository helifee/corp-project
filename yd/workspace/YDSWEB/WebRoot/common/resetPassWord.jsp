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
	<base href="<%=basePath%>">
	<!-- 共通css -->
	<link rel="stylesheet" type="text/css" href="<%=basePath%>${session.userTheme}">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/JsInputFilter.js"></script>
 	<script type="text/javascript" src="<%=basePath %>js/common/JsNameFilter.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/common/changePassWord.js"></script>
	
	<title>重置密码</title>
</head>
<body onload="initReset()">
<jsp:include page="../common/commonPage.jsp"></jsp:include>
<div class="ydscontainer">
	<s:form id="mainForm" action="resetPwd" method="post" namespace="/common" validate="true">
		<div class="span-24 ">
			<div class="span-24">
				<div class="span-2 text_right">
					<label>重置用户ID<span class="color_red">*</span></label>
				</div>
				<div class="span-2 ">
					<s:textfield id="userId" name="passWord.userId" maxlength="6" cssClass="span-2" value="" tooltip="请输入要修改密码的员工编号"/>
				</div>
				<div class=" span-2 ">
					<s:textfield  id="nameInput" name="noname" cssClass="span-2 last" tooltip="请输入要修改密码的员工的姓名（汉字）" />
				</div>
			</div>
			<div class="span-24">
				<div class="span-2 text_right">
					<label>重置新密码<span class="color_red">*</span> </label>
				</div>
				<div class="span-3 last">
					<s:password id="newPW" name="passWord.newPW" maxlength="50" tooltip="请输入要重置的新密码"/>
				</div>
			</div>
			<div class="span-24">
				<div class="span-2 text_right">
					<label>确认新密码<span class="color_red">*</span> </label>
				</div>
				<div class="span-3 last">
					<s:password id="reNewPW" name="passWord.reNewPW" maxlength="50" tooltip="请重新输入要重置的新密码"/>
				</div>
			</div>
			<div class="span-24 margin_top_6">
				<div class="span-2 text_right">
					<label>管理员密码<span class="color_red">*</span> </label>
				</div>
				<div class="span-3">
					<s:password id="managerPW" name="passWord.managerPW" maxlength="50" tooltip="请输入您的密码来确认您的身份"/>
				</div>
			</div>		
			<div class="span-7 color_red text_center">
				<s:property value="errorM"/>
				<s:hidden id="successM" name="successM"/>
			</div>
			<div class="span-24">
				<div class="prepend-2 span-3">
					<input type="button" value="重置密码" class="btn span-2" onclick="resetSubmit();">
				</div>
			</div>
		</div>
	</s:form>
</div>
</body>
</html>