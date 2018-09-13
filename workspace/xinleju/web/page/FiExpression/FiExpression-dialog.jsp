<%@page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.net.*" %> 
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
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/TemplateWindow.js"></script>
		<script>
				var contextPath = '${pageContext.request.contextPath}';
				if(contextPath.length==1){
					contextPath = '';
				}
		</script>
		
<% 
String expression=""; 
if(request.getParameter("expression")!=null && !"null".equals(request.getParameter("expression"))){ 
	try{ 
		expression = request.getParameter("expression").replaceAll("\\+","%2B");
		expression=URLDecoder.decode(expression,"utf-8");//对中文参数进行解码 
		} 
		catch(Exception e){ 
		e.printStackTrace(); 
		} 
} 

%> 
</head>


<body>
<div class="easyui-layout" data-options="fit:true,border:false">
        <input type="hidden" id="componentId" value="${param.componentId}"  />
        <input type="hidden" id="boid" value="${param.boid}"  />
        <input type="hidden" id="start" size="3" value="0"/>  
        <input type="hidden" id="end"   size="3" value="0"/>
        <!-- 表达式编辑部分 --> 
        <div data-options="region:'north'" style="height:'auto';padding:5px;background:#eee;">
			<textarea id="expression" rows="5" cols="130"  
				onKeydown="posCursor()"   
          		onKeyup="posCursor()"   
          		onmousedown="posCursor()"   
          		onmouseup="posCursor()"   
          		onfocus="posCursor()"><%=expression %></textarea>
        </div>
        <div data-options="region:'center'" style="padding:5px;background:#eee;">
           <div class="easyui-layout" data-options="fit:true,border:false">
           	<!-- 公式部分 -->
           	<div data-options="region:'west'" style="width:300px;padding:5px;background:#eee;">
           		<table  id="west_grid"></table>
           	</div>
           	<!-- 运算符部分 -->
           	<div data-options="region:'center'" style="padding:5px;background:#eee;">
           		<table  id="center_grid"></table>
           	</div>
    		<!--  -->
           	<div data-options="region:'east'" style="width:300px;padding:5px;background:#eee;">
	           	<div  id="tree"></div>
           	</div>
           </div>
      </div>
       </div>
     <script type="text/javascript" src="${pageContext.request.contextPath}/page/FiExpression/FiExpression-dialog.js"></script>
</body>


</html>