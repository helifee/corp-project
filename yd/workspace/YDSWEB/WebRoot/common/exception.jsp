<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<html>
    <head>
    	<title>远东公司内部网</title>
    </head>
    <body>
    <div align="center">
    	<img src="<%=basePath %>images/error.gif" width="359" height="238"/>
    	<br/>
    	请联系内线电话： 8112！
    	<br/>
   </div>
    	<br>
    	<s:if test="#session.operateTip!=null">
    		<%session.removeAttribute("operateTip");%>
     	</s:if>
    	<s:actionerror />
    	<s:property value="exceptionStack"/>
    </body>

</html>

