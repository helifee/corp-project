<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
       	<!-- 共通css -->
		<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
    
    	<title>确认画面 - 远东公司内部网</title>
    </head>
    <body>
    <div class="ydscontainer">
		<div class="span-24 padding_top_8 title">
			<h2>确认画面</h2>
		</div>	
    	<br>
    	<div class="span-24">
    		<div class="span-2 text_left">&nbsp;</div>
		   	<div class="span-12 append-8 text_left">
		    	<s:if test="#session._message_id!=null">
			    	<%session.removeAttribute("_message_id");%>
		    	</s:if>
		    	<s:if test="#session.operateTip!=null">
		    		<%session.removeAttribute("operateTip");%>
		     	</s:if>
		    	<s:property value="errorMessage"/>
		    	<a href="#this" onclick="window.close()">关闭</a>
			</div>
    	</div>
    </div>
    </body>

</html>