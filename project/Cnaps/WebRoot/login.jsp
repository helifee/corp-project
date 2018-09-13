<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ page import="java.awt.*,java.awt.image.*,java.util.*" %>
<%
String path = request.getContextPath();
//设置页面不缓存
response.setHeader("Pragma","No-cache");
response.setHeader("Cache-Control","no-cache");
response.setDateHeader("Expires", 0);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>   
<head>
<title>中国现代化支付系统</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" type="text/css"
			media="screen,projection" />
<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"
			media="screen,projection" />
<script type="text/javascript" src="<%=path %>/js/common/validateUtil.js"></script>
<script type="text/javascript" src="<%=path %>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js" ></script>
<script type="text/javascript" src="<%=path %>/js/common/closeOpenWindow.js"></script>
<script type="text/javascript" src="<%=path %>/js/home/login.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script> 
</head>
<body bgcolor="#B6B6B6">
<html:form method="post" action="login.do?method=login">
<table align="center" width="100%" valign="center" height="100%">
<tr><td align="center" width="100%" valign="center" height="100%">
<table border="0" valign="center" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td style="background-image: url('<%=path %>/image/index3.jpg');width:629;height:64">
   <div align="center" style="margin-top: 30px;"><font style="font-weight: bolder;font-style: oblique;font-stretch: extra-condensed  ;color: #99bbe8; font-size: 30px;" ></font></div>
    
    </td>
  </tr>
</table>
<table width="629" height="212" border="0" align="center" cellpadding="0" cellspacing="0" background="<%=path %>/image/index5.jpg">
  <tr> 
    <td valign="top"><br>
      <table width="372" border="0" align="center" cellpadding="0" cellspacing="0">
      <tr><td><div align="center"><font color="#FF0000" size="2"></font></div></td></tr>
        <tr> 
          <td valign="top"><br>
           
            <TABLE width="60%" height="80" border=0 align=center class=unnamed1>
              <TBODY>
                <TR> 
                  <TD width=80 height=26><font style="font-weight: bolder;">用户名</font></TD>
                  <TD > <DIV > 
                     <html:text property="username" size="15" styleClass="BORDER-RIGHT: #999999 1px solid; BORDER-TOP: #999999 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #999999 1px solid; BORDER-BOTTOM: #999999 1px solid; BACKGROUND-COLOR: #ffffff"></html:text>
                    <span name="validate" dataName="username" dataType="Empty" msg="用户名不能为空！"></span>
                    </DIV></TD>
                </TR>
                <TR> 
                  <TD height=23><font style="font-weight: bolder;">密&nbsp;&nbsp;码</font></TD>
                  <TD > <DIV > 
                      <html:password property="password" styleClass="BORDER-RIGHT: #999999 1px solid; BORDER-TOP: #999999 1px solid; FONT-SIZE: 12px; BORDER-LEFT: #999999 1px solid; BORDER-BOTTOM: #999999 1px solid; BACKGROUND-COLOR: #ffffff" size="15" maxlength="15"></html:password>
                    <span name="validate" dataName="password" dataType="Empty" msg="密码不能为空！"></span>
                    </DIV></TD>
                </TR>
              </TBODY>
            </TABLE>
            <br>
            <table width="40%" border="0" align="center">
              <tr> 
                <td><div align="center">
                	<input type="button" value=" 登 录 " class="button" onclick="return loginSystem();"/>
                	<%-- 
                		<img style="cursor:hand;" onclick="return loginSystem();" src="<%=path %>/image/login.jpg" width="54" height="23">
                	--%>
                </div></td>
                <td><div align="center">
                	<input type="button" value=" 取 消 " class="button" onclick="return cancel();"/>
                	<%--
                		<img style="cursor:hand;" onclick="cancel()" src="<%=path %>/image/cancel.jpg" width="54" height="23">
                	 --%>
                </div></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<table border="0" align="center" cellpadding="0" cellspacing="0">
  <tr> 
    <td><img src="<%=path %>/image/index6.jpg" width="629" height="39"></td>
  </tr>
</table>
<table border="0" align="center" cellpadding="0" cellspacing="0">
  <tr> 
    <td><img src="<%=path %>/image/index7.jpg" width="629" height="41"></td>
  </tr>
</table>
<table border="0" align="center" cellpadding="0" cellspacing="0">
  <tr> 
    <td><img src="<%=path %>/image/index8.jpg" width="629" height="41"></td>
  </tr>
</table>
<table border="0" align="center" cellpadding="0" cellspacing="0">
  <tr> 
    <td><img src="<%=path %>/image/index9.jpg" width="629" height="26"></td>
  </tr>
</table>
</td></tr></table>
</html:form>
</body>
</html>
