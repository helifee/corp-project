<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>远东公司内部网--系统登录</title>
<base href="<%=basePath%>">

<style>
body { height:100%;background: url('<%=basePath%>hy/images/earth.png') no-repeat center top; font-size:12px;}
.logintextbox{background:url(hy/images/txt_box_bg.png) repeat-x; border:1px solid #999; width:120px; height:21px;}
.loginNote { font-size: 12px; color: rgb(125, 125, 125); text-align:center; }
.LoginBG { min-width: 1024px; width: 100%; height: 100%; background-position: center center; }
.LOGINLBL { font-weight: bold; font-size: 11px; color: Black; font-family: Tahoma; }
</style>
</head>
<body>
        <table class="LoginBG" width="100%" border="0"  cellpadding="0" cellspacing="0">
		    <tbody><tr valign="middle" align="center">
			    <td width="100%" height="150"></td>
		    </tr>
            <tr valign="middle" align="center">
            <td>
                 <table width="100%" border="0" cellpadding="0" cellspacing="0" height="100%">
                    <tbody><tr valign="bottom" align="center">
                        <td>
                             <table background="hy/images/login.png" width="450" height="190" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr>
                                    <td> </td>
                                    <td style="width: 400px;">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                        <tbody><tr>
                                            <td width="114" align="center">
                                            	<a href="" target=""><img alt="远东公司内部网" title="远东公司内部网" src="hy/images/logo.gif" border="0"></a>
                                            </td>
                                            <td class="bsep"><img src="hy/images/big_seperator.png" alt=""></td>
                                            <td width="278" align="center">
                                            <form action="hy/loginserver.action">
                                                <table border="0" cellpadding="2" cellspacing="0">
                                                    
                                                    <tbody><tr style="height: 30px;" valign="middle">
                                                        <th align="right" class="LOGINLBL">
                                                                <label for="txtuserid">用户名: </label>
                                                        </th>
                                                        <td>
													        <input value="" name="userID" maxlength="100" size="20" id="txtuserid" class="logintextbox" type="text">
													    </td>
                                                    </tr>
                                                    <tr style="height: 30px;" valign="middle">
                                                        <th align="right" class="LOGINLBL">
                                                                <label for="txtpwd">密 码:</label>
                                                        </th>
                                                        <td>
                                                             <input name="passWord" maxlength="50" class="logintextbox" type="password">
                                                        </td>
                                                    </tr>
                                                    <tr style="height: 36px;" valign="middle">
                                                        <td colspan="2" align="right">
                                                            <input name="login" src="hy/images/login_btn.png" alt="请点击登录" title="请点击登录" type="image" onclick="submit();">
                                                        </td>
                                                    </tr>
                                                </tbody></table>
                                            </form>
                                            </td>
                                        </tr>
                                    </tbody></table>
                                    </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
                    <tr width="100%">
                        <td height="70"> </td>
                    </tr>
                    <tr valign="middle" align="center">
                        <td height="110">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                <tr>
                                	<td colspan="11"><hr></td>
                                </tr>
                                <tr>
                                    <td width="50" align="center">&nbsp;</td>
                                    <td class="ssep"></td>
                                    <td width="90" align="center">投票系统</td>
                                    <td class="ssep">|</td>
                                    <td width="90" align="center">座席速查</td>
                                    <td class="ssep">|</td>
                                    <td width="90" align="center">维基百科</td>
                                    <td class="ssep">|</td>
                                    <td width="90" align="center">Google搜索</td>
                                    <td class="ssep"></td>
                                    <td width="50" align="center">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="loginNote" colspan="11">大连远东计算机系统版权所有  &copy;2010 </td>
                                </tr>
                            </tbody></table>
                        </td>
                    </tr>
               </tbody></table>
            </td>
            </tr>
        </tbody></table>
	</body>
</html>
