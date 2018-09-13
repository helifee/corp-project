<%@ page language="java" contentType="text/html; charset=gbk"
    pageEncoding="gbk"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title></title>
		<link href="${pageContext.request.contextPath}/css/cfldcn_style.css" rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath}/css/xy_cost.css" rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath}/js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<link href="${pageContext.request.contextPath}/js/jquery-easyui-1.4.1/themes/icon.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/App.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery/jquery-1.7.1.js"></script>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/mask.css" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.loadmask.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.enplaceholder.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<script>
				var contextPath = '${pageContext.request.contextPath}';
		</script>
 
</head>


<body class="easyui-layout">
        <input type="hidden" id="componentId" value="${param.componentId}"  />
           <input type="hidden" id="model" value="${param.model}"  />
        <div data-options="region:'center'" style="padding:5px;background:#eee;">
                <ul id="tree"></ul>
        </div>
        <script type="text/javascript" src="${pageContext.request.contextPath}/page/dialog/tree.js"></script>
</body>
</html>