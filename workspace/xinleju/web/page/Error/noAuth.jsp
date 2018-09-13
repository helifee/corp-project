<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>没有权限</title> 
		<link href="../../js/jquery-easyui-1.4.1/themes/metro-gray/easyui.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="../../js/jquery/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="../../js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="../../js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
		<style>
		body {TEXT-ALIGN: center;}
		</style>
    </head>
	<body class="easyui-layout">   
	
	    <div data-options="region:'center'">   
	        <div class="easyui-layout" data-options="fit:true">   
	            <div data-options="region:'center'">
					<div id="win" class="easyui-window" title="消息提示" style="width:600px;height:400px" data-options="modal:true,
					collapsible:false,
					minimizable:false,
					maximizable:false,
					closable:false
					">   
	   					<h2> 您对当前页面没有访问权限，请联系管理员！  </h2>
					</div>  
	            </div>   
	        </div>   
	    </div>   
	</body>  

</html>