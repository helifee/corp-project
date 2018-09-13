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
<script language="javascript">
function pzprint(id,systemcd,pmttp){
		var msgtpid = id;
		var newurl = "<%=path %>/PingzhengPrintAction.do?method=printexchangeMsgAction&msgtpid="+msgtpid+"&systemcd="+systemcd+"&pmttp="+pmttp;
	    //alert(newurl);
		window.open(newurl,"汇兑凭证打印",'height=400, width=800, top=200, left=200,scrollbars=yes,resizable=yes');
			
	}
</script>
</head>
<body bgcolor="#ffffff">
<br>
<br>
<br>
<TABLE width=98% border=0 align="center" cellPadding=0 cellSpacing=8 class=font>
  <TR>
    <TD align="center"><img src="<%=path %>/image/success.jpg" width="128" height="128" border="0" align="absmiddle"><br>
    </TD>
  </TR>
  <TR>
    <TD height="26" align="center" class="text12">
   贷记业务发送成功！
    </TD>
  </TR>
  <TR>
    <TD height="26" align="center" class="text12">
    
    </TD>
  </TR>
  <TR>
    <TD height="46" align="center">
    	
    <input name="button" id="backbutton"  type="button" style="cursor:pointer" class="button" '${pmttp}')" value="凭证打印">
   
    </TD>
  </TR>
</TABLE>
</body>
</html>