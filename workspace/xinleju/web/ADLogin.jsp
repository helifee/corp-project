<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/xinyuan_style.css" type="text/css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/ext/resources/css/xtheme-blue.css" />
<script src="${pageContext.request.contextPath}/js/application.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/jquery/jquery-1.7.2.js" type="text/javascript"></script>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
      <script type="text/javascript">
          $(function(){
       			var   WshShell   =new   ActiveXObject("WScript.Shell");  
       			var user= WshShell.ExpandEnvironmentStrings("%USERNAME%");  
       			alert(user);
          })

      </script>
  </head>
  
  <body>

  </body>
</html>
