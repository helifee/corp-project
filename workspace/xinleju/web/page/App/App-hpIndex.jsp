<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
	<script type="text/javascript" src="js/App.js"></script>
    <link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="js/jquery-easyui-1.4.1/themes/icon.css">
    <script type="text/javascript" src="js/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="js/jquery-easyui-1.4.1/locale/easyui-lang-zh_CN.js"></script>
	<script src="js/jquery.loadmask.min.js" type="text/javascript"></script>
	<link href="css/mask.css" rel="stylesheet" type="text/css" />
    <title>鑫乐居ERP</title>
    
    <style type="text/css">
    	.component {
    		width:100%;
    		height:100%;
    		height: 280px;
    		margin-bottom: 20px;
    	}
    </style>
    
</head>

<body style="margin:0px;">
<table style="width:100%; margin: auto;" cellpadding="0" cellspacing="0" border="0">
  <s:iterator  var="num" begin="1" end="#request.urlItemTotal">
	<tr>
		<td>

			<iframe id="firstFrame" class="component" src="${urlList[num*2-2]}" scrolling="no" frameborder="0" onload="iframeChangeSize('firstFrame')"></iframe>
	
		</td>
		<td>
       
		    <iframe id="secondFrame" class="component" src="${urlList[num*2-1]}"  scrolling="no" frameborder="0" onload="iframeChangeSize('secondFrame')"></iframe>
		
		</td>
	</tr>
</s:iterator>
</table>
</body>
</html>