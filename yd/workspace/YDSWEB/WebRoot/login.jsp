<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<s:if test="#session.userinfo != null">
<%response.sendRedirect("index.jsp"); %>
</s:if>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
<title>远东公司内部网--系统登录</title>
<base href="<%=basePath%>">
	<script type="text/javascript" src="<%=path %>/js/common/prototype.js"></script>
	<script type="text/javascript">
		try{document.domain='yds.yd';}catch(e){}
		document.observe('dom:loaded', function() {
			Event.observe($('userId'), 'keypress', enterEvent);
			Event.observe($('password'), 'keypress', enterEvent);
			$('userId').activate();
		});
		function doubleLogin(){
			newLogin();
		}
		function newLogin(){
			$('loginForm').submit();
		}
		function enterEvent(event){
			if(event.keyCode != 13) return;
			if(Event.element(event).id == 'userId'){
				$('password').focus();
			}else{
				doubleLogin();
			}
		}
	</script>
<!-- 登录页面css -->
<style>
	body {
		height: 100%;
		background: url('<%=basePath%>/images/earth.png') no-repeat center top;
		font-size: 12px;
		margin: 0;
		padding: 0;
	}
	
	label {
		font-size: 11px;
		color: Black;
		font-family: Tahoma, simhei;
	}
	
	input {
		border: 1px solid #999;
		width: 110px;
		height: 21px;
	}
	
	.loginWindow {
		margin: 160px auto 100px auto;
		width: 450px;
		height: 190px;
		background: url('<%=basePath%>/images/login.png') no-repeat;
		position: relative;
	}
	
	.logo {
		position: absolute;
		top: 70px;
		left: 80px;
		width: 58px;
		height: 53px;
		background: url('<%=basePath%>/images/logo.gif') no-repeat;
	}
	
	.sepr {
		position: absolute;
		top: 25px;
		left: 165px;
		width: 1px;
		height: 138px;
		background: url('<%=basePath%>/images/big_seperator.png') no-repeat;
	}
	
	.button {
		position: absolute;
		top: 110px;
		right: 68px;
		width: 95px;
		height: 28px;
		background: url('<%=basePath%>/images/login_btn.png') no-repeat;
		cursor: pointer;
	}
	
	.user {
		position: absolute;
		top: 50px;
		right: 68px;
	}
	
	.pwd {
		position: absolute;
		top: 80px;
		right: 68px;
	}
	
	.error {
		color: red;
		position: absolute;
		top: 155px;
		right: 68px;
	}
	
	.error li, .error ul {
		display: block;
		float: left;
		margin: 0;
		padding: 0;
	}
	
	.links {
		margin: 0px auto;
		width: 500px;
		height: 100px;
		text-aligh: center;
	}
	
	.loginNote {
		font-size: 12px;
		color: rgb(125, 125, 125);
		text-align: center;
	}
	
	.none {
		display: none;
	}
</style>

</head>
<body>
	<s:form id="loginForm" action="loginserver" focusElement="userId" theme="simple" name="loginForm" namespace="/common">
		<div class="loginWindow">
			<div class="logo"></div>
			<div class="sepr"></div>
			<div class="button" onclick="doubleLogin();" title="点击登录"></div>
			<div class="user">
				<label for="txtuserid">用户名: </label>
				<s:textfield id="userId" name="userId" cssClass="logintextbox" maxlength="6" />
			</div>
			<div class="pwd">
				<label for="txtpwd">密&nbsp;码:</label>
				<s:password id="password" name="password" cssClass="logintextbox" maxlength="11"/>
			</div>
			<div class="error">
				<s:property value="errormsg"/>
				<s:fielderror/>
			</div>
		</div>
		<div class="links">
			<table border="0" cellpadding="0" cellspacing="0" align="center">
				<tbody>
					<tr>
						<td colspan="11"><hr></td>
					</tr>
					<tr>
						<td width="50" align="center">&nbsp;</td>
						<td class="ssep"></td>
						<td width="90" align="center"><a href="http://ntsv2003/WebASVote/login.aspx" target="_blank">投票系统</a></td>
						<td class="ssep">|</td>
						<td width="90" align="center"><a href="http://192.168.80.172/seat/sekiSearch.jsp?LFLG=4" target="_blank">座席速查</a></td>
						<td class="ssep">|</td>
						<td width="90" align="center"><a href="http://192.168.80.172/wiki/index.php" target="_blank">维基百科</a></td>
						<td class="ssep">|</td>
						<td width="90" align="center"><a href="http://192.168.80.160/index2.jsp" target="_blank">旧社内网</a></td>
						<td width="50" align="center">&nbsp;</td>
					</tr>
					<tr>
						<td class="loginNote" colspan="11">大连远东计算机系统版权所有  &copy;2010 </td>
					</tr>
				</tbody>
			</table>
		</div>
	</s:form>
	</body>
</html>