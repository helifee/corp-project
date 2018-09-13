<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<title>PDF打印报表</title>
<head>
</head>
<body>
<%
	//request.setCharacterEncoding( "GBK" );
	String src = request.getParameter( "src" );
%>
<object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" id=pdfobj width="100%" height="100%" border="0">
      <param name="_Version" value="65539"> 
      <param name="_ExtentX" value="20108"> 
      <param name="_ExtentY" value="10866"> 
      <param name="_StockProps" value="0"> 
      <param name="SRC" value="<%=src%>"> 
<embed id=pdfobj src="<%=src%>" width="100%" height="800"></embed>
</object>

</body>
</html>
