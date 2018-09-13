<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page isELIgnored="false"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>数据展示</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script src="common/js/common.js"></script>
	<script src="common/js/jquery-1.5.2.min.js"></script>
	<link rel="stylesheet" href="common/css/style.css" type="text/css"></link>
  </head>
  
  <body>
	<table align="center">
		<tr><td><%@include file="/common/jsp/head.jsp"%></td></tr>
  		<tr>
  			<td>
  				<table width="100%">
  					<tr>
					  	<td width="4%">
					  		<a href="javascript:void(0);" onclick="javascript:newpage('0');">总和</a>&nbsp;&nbsp;
						  	<c:forEach items="${dptList }" var="dpt">
						  		<a href="javascript:void(0);" onclick="javascript:newpage('${dpt.id }');">${dpt.name }</a>&nbsp;&nbsp;
						  	</c:forEach>
						</td>
  					</tr>
  				</table>
  			</td>
  		</tr>
  		<tr><td width="1200px" height="500"><embed align="middle" src="FLEX-BIN/DataShow.swf" width="1200" height="500"></embed></td></tr>
	</table>
  </body>
	<script type="text/javascript">
		function newpage(tag){
			var url = "ueCurve.jsp?tag="+tag;
			if (isFireFox()){
		 		url = "datashow/ueCurve.jsp?tag="+tag;
		 	}
			window.open(url,"go","scrollbars=no,location=no,width=1220,height=730");
		}
	</script>
</html>
