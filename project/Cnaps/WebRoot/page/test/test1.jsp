<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<script type="text/javascript"> 
	
	function pzprint(){
		
		var newurl = "<%=path %>/PingzhengPrintAction.do?method=printexchangeMsgAction&msgtpid=1&systemcd=HVPS&pmttp=A202";
	  //alert(newurl);
		window.open(newurl,"汇兑凭证打印",'height=400, width=800, top=200, left=200,scrollbars=yes,resizable=yes');
			
	}
</script> 
</head> 
<body> 

	  <input name="button" id="backbutton"  type="button" style="cursor:pointer" class="button" onClick="pzprint()" value="凭证打印">
   

</body> 
</html> 
	
