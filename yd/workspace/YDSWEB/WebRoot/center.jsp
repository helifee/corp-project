<%--
 * 主页信息画面（主页面JSP）
 * 
 * @author 远东)lincheng
 * @version 1.00 2010/03/18
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<jsp:include page="logincheck.jsp" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- 共通css -->
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	
	<!-- 共通js -->
	<script type="text/javascript" src="js/common/prototype.js"></script>
	<script type="text/javascript" src="js/common/scriptaculous/effects.js"></script>
	<script type="text/javascript" src="js/common/util.js"></script>

	<!-- 画面用js -->
	<script type="text/javascript" src="js/menu/menu.js"></script>
	<script type="text/javascript">
		window['g_path'] = '<%=path %>';
		window['g_basePath'] = '<%=basePath %>';
	</script>
	<title>大连远东计算机系统有限公司-内部网</title>
</head>
<body onload="menuInit()">
<div class="rrcc">
	<div class="left" id="LeftBox">
		<div class="left01">
			<s:property value="#session.userinfo.userName" />，你好！
		</div>
		<div class="left02" id="menuBox">
		<s:set name="list" value="#session.userMenu" />
		<s:if test="#list.size() > 0">
			<s:iterator value="#list">
				<div>
					<div target="<s:property value="target" />" class="menuP a1" onclick="if(menuP(this)){return true}else{return false};">
						<img src="images/menu/<s:property value="imgPath" />.png"><a href="${href}" target="<s:property value="target" />"><s:property value="text"/></a>
					</div>
					<s:set name="subList1" value="subMenu" />
					<s:if test="#subList1.size() > 0">
						<div class="menuS none">
						<s:iterator value="#subList1">
							<div>
								<div target="<s:property value="target" />" onclick="menuP(this)" class="a2">
									<img src="images/menu/<s:property value="imgPath" />.png"><a href="${href}" target="<s:property value="target" />"><s:property value="text"/></a>
								</div>
							</div>
						</s:iterator>
						</div>
					</s:if>
				</div>
			</s:iterator>
		</s:if>
		</div>
	</div>
	<div class="right" id="RightBox">	
		<iframe name="main" width="100%" height="100%" scrolling="Yes" frameborder="0" src="main.jsp">
			浏览器不支持嵌入式框架，或被配置为不显示嵌入式框架。
		</iframe>
	</div>
</div>
<div class="none">
	<iframe id="oldWeb" src="http://www.yds.yd/login/jump.html"></iframe>
</div>
<div id="adviceBox" class="none">
	<iframe id="adviceFrame" frameborder="0"></iframe>
</div>
</body>
</html>