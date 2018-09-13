<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@page import="com.bancstone.constants.SystemConstants"%>
<%@page import="com.bancstone.common.utils.UrlParameter"%>
<%
	String path = request.getContextPath();
	Boolean flag = UrlParameter.getBoolean(request,
			SystemConstants.OPERATION_RESULT);
	String next_url = UrlParameter.getString(request,
			SystemConstants.NEXT_URL);
	next_url = next_url.replaceAll("\\\\", "%5C");
	//String title = "操作失败";
	String imgSrc = path + "/image/fail.jpg";
	if (flag == true) {
		//title = "操作成功";
		imgSrc = path + "/image/success.jpg";
	}
%>
<html>
<head>
<title>
信息提示
</title>

<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link href="<%=path%>/css/messageStyle.css" rel="stylesheet" type="text/css">
<script type="text/javascript" defer="true" src="<%=path%>/js/common/onkeydown.js"></script>

<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<META HTTP-EQUIV="Cache-control" CONTENT="no-cache">
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="EXPIRES" CONTENT="-1">  
 
<script language="JavaScript" type="text/JavaScript">

function goUrl(){
	window.parent.document.location.href = "<%=path + next_url%>";
}
 
</script>
</head>
<body bgcolor="#ffffff">
<br>
<br>
<br>
<TABLE width=98% border=0 align="center" cellPadding=0 cellSpacing=8 class=font>
  <TR>
    <TD align="center">
    <c:if test="${flag eq 'sucess'}">
    <img src="<%=path%>/image/success.jpg" width="128" height="128" border="0" align="absmiddle">
    </c:if>
    <c:if test="${flag eq 'failed'}">
    <img src="<%=path%>/image/fail.jpg" width="128" height="128" border="0" align="absmiddle">
    </c:if>
    <br>
    </TD>
  </TR>
  <TR>
    <TD height="26" align="center" class="text12">
    <bean:write name="message"/><br>
    <input type="hidden" id="backtype" name="backtype" value="yesurl"/>
  </TR>
  <TR>
    <TD height="46" align="center"><input name="button" id="backbutton"  type="button" style="cursor:pointer" class="button" onClick="javascript:goUrl()" onfocus="this.blur()" value="确定" ></TD>
  </TR>
</TABLE>
</body>
</html>