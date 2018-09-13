<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>

<s:if test="#session.userinfo == null">
	<script type="text/javascript">
		window.open('login.jsp', '_top');
	</script>
</s:if>
