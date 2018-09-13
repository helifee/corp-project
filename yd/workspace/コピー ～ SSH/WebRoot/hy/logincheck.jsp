<%@ taglib prefix="s" uri="/struts-tags" %>  
<%@ page language="java" contentType="text/html" import="java.util.*"%>  
<html>  
    <head>  
        <title>welcome</title>  
  </head>  
    <body>  
      <s:if test="#session.userinfo == null">  
      	<jsp:forward page="/hy/login.jsp" />     
      </s:if>  
    </body>  
</html>  