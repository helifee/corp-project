<%@ taglib prefix="s" uri="/struts-tags"%>  
<%@ page language="java" contentType="text/html; charset=utf-8"  pageEncoding="utf-8"%>  
<html>  
    <head>  
        <title>远东公司内部网</title>  
  </head>  
    <body>  
      <s:if test="#session.userinfo == null">  
      	<jsp:forward page="/login.jsp" />     
      </s:if>  
    </body>  
</html>  