<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
%>
<p>
<s:if test="#session.guideList.size > 0">
	<s:iterator value="#session.guideList" status="offset">  
		<s:if test="clickable">
			<s:url id="actionUrlValue" value="%{actionUrl}"></s:url>
			<s:a href="%{actionUrlValue}">
				<s:property value="title"></s:property>
			</s:a>
		</s:if>
		<s:else>
			<s:property value="title"></s:property>
		</s:else>
		<s:if test="!#offset.last">
			&nbsp;&gt;&gt;&nbsp;
		</s:if>	
	</s:iterator>
</s:if>
</p>


