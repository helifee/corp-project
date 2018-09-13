<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
 	<div class="span-24 bgclr_tt">
   		<div class="span-20">
		<p><jsp:include page="../../common/guideLink.jsp" /></p>
   		</div>
		<div class="span-4 text_right last">
		</div>
	 </div>
 	<!-- 操作状态消息 -->
 	<s:hidden id="operateTip" value="%{#session.operateTip}"></s:hidden>
	<%session.removeValue("operateTip");%>
	<script type="text/javascript">
		window['g_path'] = '<%=path %>';
		window['g_basePath'] = '<%=basePath %>';
	</script>