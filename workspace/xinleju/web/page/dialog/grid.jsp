<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
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
				if(contextPath.length==1){
					contextPath = '';
				}
		</script>
</head>


<body>
<div class="easyui-layout" data-options="fit:true,border:false" id="businessObject_layout">
        <input type="hidden" id="componentId" value="${param.componentId}"  />
       <input type="hidden" id="model" value="${param.model}"  />
         <div data-options="region:'east'" style="width:140px;padding:5px;background:#eee;">
                <table  id="businessObjected_grid"></table >
        </div>
        
          <div data-options="region:'center'" style="padding:5px;background:#eee;">
                <table  id="businessObject_grid"></table>
        </div>
       </div>
     <script type="text/javascript" src="${pageContext.request.contextPath}/page/dialog/grid.js"></script>
</body>


</html>