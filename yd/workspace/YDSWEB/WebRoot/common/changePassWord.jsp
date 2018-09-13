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
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/commonMessage.js"></script>
	
	<!-- 画面用js -->
	<script type="text/javascript" src="<%=basePath %>js/common/changePassWord.js"></script>
	
	<title>修改密码</title>
</head>
<body onload="initModify()">
	<jsp:include page="../common/commonPage.jsp"></jsp:include>
	<div class="ydscontainer">
		<div class="none">
			<s:fielderror/>
		</div>
		<s:form id="mainForm" action="modifyPwd" method="post" namespace="/common" validate="true">
			<div class="span-24 last">
				<div class="span-24 last" >
					<div class="span-2 text_right">
						<label>旧密码<span class="color_red">*</span></label>
					</div>
					<div class="span-3">
						<s:password id="oldPW" name="passWord.oldPW"  maxlength="50" tooltip="请输入您现在正在使用的密码" />
					</div>
				</div>
				<div class="span-24 margin_top_6">
					<div class="span-2 text_right">
						<label>新密码<span class="color_red">*</span></label>
					</div>
					<div class="span-4">
						<s:password id="newPW" name="passWord.newPW" maxlength="50" onkeyup="chkpwd(this);"  tooltip="请输入您要修改的新密码"/>
					</div>
					<div class="span-3 last"  id="chkResult"></div>
				</div>
				<div class="span-24 last">
					<div class="span-2 text_right">
						<label>确认新密码<span class="color_red">*</span></label>
					</div>
					<div class="span-3">
						<s:password id="reNewPW" name="passWord.reNewPW" maxlength="50" tooltip="请再次输入您要修改的新密码" />
					</div>
				</div>

				<div class="span-6 color_red text_center">
					<s:property value="errorM"/>
					<s:hidden id="successM" name="successM"/>
				</div>
				<div class="span-24 last">
					<div class="prepend-2 span-3">
						<input type="button" value="修改密码" class="btn span-2" onclick="modifySubmit();" >
					</div>
				</div>
			</div>
		</s:form>
	</div>
</body>
</html>