<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Insert title here</title>
	<link href="<%=basePath%>${session.userTheme}" rel="stylesheet" type="text/css">
	<link href="<%=basePath%>css/gadget.css" rel="stylesheet" type="text/css">
	<!-- 共通js -->
	<script type="text/javascript" src="<%=basePath %>js/common/prototype.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/common/util.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/gadget/base.js"></script>
	<script type="text/javascript">
		function resize(size){
			if(size == 2){
				$('content').removeClassName('w_300').addClassName('w_600');
				$('adv').src='<%=basePath%>images/adTT/advTT2.jpg';
				setHeight(266);
			} else if(size == 1){
				$('content').removeClassName('w_600').addClassName('w_300');
				$('adv').src='<%=basePath%>images/adTT/advTT1.jpg';
				setHeight(130);
			}
		}
	</script>
	<base target="main"> 
</head>
<body scroll="no">
	<div id="content" class="w_300">
		<a href="AdvPageTT.html"><img id="adv" width="100%" height="100%"></a>
	</div>
</body>
</html>
