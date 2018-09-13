<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/hy/";
%>
 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<link rel="shortcut icon" type="image/vnd.microsoft.icon" href="../favicon.ico">
		<link rel="shortcut icon" type="image/x-icon" href="../favicon.ico">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>远东公司内部网--系统登录</title>
		<base href="<%=basePath%>">
		<style>
			body {
				height: 100%;
				background: url('images/earth.png') no-repeat center top;
				font-size: 12px;
			}
			
			.logintextbox {
				background: url(images/txt_box_bg.png) repeat-x;
				border: 1px solid #999;
				width: 120px;
				height: 21px;
			}
			
			.loginNote {
				font-size: 12px;
				color: rgb(125, 125, 125);
				text-align: center;
			}
			
			.LoginBG {
				min-width: 1024px;
				width: 100%;
				height: 100%;
				background-position: center center;
			}
			
			.LOGINLBL {
				font-weight: bold;
				font-size: 11px;
				color: Black;
				font-family: Tahoma;
			}
			
			.errmsg {
				color: red;
				text-align: right;
				height:15px;
				padding-right:50px;
				padding-left:160px;
			}
			.errmsg li, .errmsg ul{
				display: block;
				float: left;
				margin: 0;
				padding: 0;
			}
		</style>
		<script type="text/javascript" src="js/prototype.js"></script>
		<script language="JavaScript">
			if (window.top.location.href.match('index\.jsp')) window.top.location.href = 'logout.action';
		</script>
	</head>
	<body onload="loginForm.userID.focus()">
		<table class="LoginBG" width="100%" border="0" cellpadding="0" cellspacing="0">
			<tbody>
				<tr valign="middle" align="center">
					<td width="100%" height="150"></td>
				</tr>
				<tr valign="middle" align="center">
					<td>
						<table width="100%" border="0" cellpadding="0" cellspacing="0" height="100%">
							<tbody>
								<tr valign="bottom" align="center">
									<td>
										<table background="images/login.png" width="450" height="190" border="0" cellpadding="0" cellspacing="0">
											<tbody>
												<tr>
													<td></td>
													<td style="width: 400px;">
														<table border="0" cellpadding="0" cellspacing="0">
															<tbody>
																<tr>
																	<td width="114" align="center">
																		<a href="" target=""><img alt="远东公司内部网" title="远东公司内部网" src="images/logo.gif" border="0"></a>
																	</td>
																	<td class="bsep">
																		<img src="images/big_seperator.png" alt=""></td>
																	<td width="278" align="center">
																		<form action="loginserver.action" method="post" name="loginForm">
																			<table border="0" cellpadding="2" cellspacing="0">
																				<tbody>
																					<tr style="height: 30px;" valign="middle">
																						<th align="right" class="LOGINLBL">
																							<label for="txtuserid">用户名: </label>
																						</th>
																						<td>
																							<input value="" name="userID" maxlength="6" size="20" id="txtuserid" class="logintextbox" type="text">
																						</td>
																					</tr>
																					<tr style="height: 30px;" valign="middle">
																						<th align="right" class="LOGINLBL">
																							<label for="txtpwd">密 码:</label>
																						</th>
																						<td>
																							<input name="passWord" maxlength="11" class="logintextbox" type="password"></td>
																					</tr>
																					<tr style="height: 36px;" valign="middle">
																						<td colspan="2" align="right">
																							<input src="images/login_btn.png" alt="请点击登录" title="请点击登录" type="image">
																						</td>
																					</tr>
																				</tbody>
																			</table>
																		</form>
																	</td>
																</tr>
																<tr>
																	<td colspan="3" class="errmsg">
																		<s:fielderror/><s:property value="errormsg" />
																	</td>
																</tr>
															</tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr width="100%">
									<td height="70"></td>
								</tr>
								<tr valign="middle" align="center">
									<td height="110">
										<table border="0" cellpadding="0" cellspacing="0">
											<tbody>
												<tr>
													<td colspan="11">
														<hr></td>
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
													<td width="90" align="center"><a href="http://ydswebtest:8088/job/YDSWEB/" target="_blank">Hudson</a></td>
													<td class="ssep"></td>
													<td width="50" align="center">&nbsp;</td>
												</tr>
												<tr>
													<td class="loginNote" colspan="11">大连远东计算机系统版权所有
														&copy;2010
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	</body>
</html>
