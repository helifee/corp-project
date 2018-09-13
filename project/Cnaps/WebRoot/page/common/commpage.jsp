<%@ page contentType="text/html; charset=GBK" %>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic" %>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<link href="<%=path %>/css/messageStyle.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="<%=path%>/js/common/onkeydown.js"></script>
<script type="text/javascript">
	function truesubmit(id,syspara,PrntId){
		if(syspara == 'delmxjl'){
			this.document.forms[0].action="<%=path %>/regularDebitAction.do?method=sendMsgcreatedetails&syspara=delete&id="+id;
		}
		if(syspara == 'fkrdelete'){
			this.document.forms[0].action="<%=path %>/regularDebitAction.do?method=sendMsgInput&syspara=delete&id="+id+"&PrntId="+PrntId;
		}
		this.document.forms[0].submit();
	}
</script>

</head>
<body onload="truesubmit('${id}','${syspara}','${PrntId}')">
	<html:form method="post" action="/regularDebitAction.do?method=sendMsgcreatedetails">
	</html:form>
</body>
</html>