<%@ page contentType="text/html;charset=gb2312"%>
<%
	request.setCharacterEncoding("gb2312");
%>
<jsp:useBean id="sb" class="com.helife.yd.SimpleBean" scope="page" />
<jsp:setProperty name="sb" property="*" />
<h1>аеУћЃК<jsp:getProperty name="sb" property="name" /></h1>
<h1>УмТыЃК<jsp:getProperty name="sb" property="password" /></h1>