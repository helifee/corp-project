<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";	
%>
<html>
<head>
<title>
信息提示
</title>
<link href="<%=path %>/css/messageStyle.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="<%=path%>/js/common/onkeydown.js"></script>
</head>
<body bgcolor="#ffffff">
<br>
<br>
<br>
<TABLE width=98% border=0 align="center" cellPadding=0 cellSpacing=8 class=font>
  <TR>
    <TD align="center"><img src="<%=path %>/image/warnning.gif" width="128" height="128" border="0" align="absmiddle"><br>
    </TD>
  </TR>
  <TR> 
  
    <TD height="26" align="center" class="text12">
    <bean:write name="message"/><br>
    <input type="hidden" id="backtype" name="backtype" value="nourl"/>
  </TR>
  <TR>
    <TD height="46" align="center"><input name="button" id="backbutton"  type="button" class="qbutton2" style="cursor:pointer" onClick="javascript:history.back();" value="返回"></TD>
  </TR>
</TABLE>
</body>
</html>