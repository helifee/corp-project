<%@page contentType="text/html; charset=UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>招标采购首页</title>
		<link href="css/app.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="js/App.js"></script>
		<script type="text/javascript" src="page/Graph/Graph-index.js"></script>
		<script type="text/javascript">
		$(document).ready(function() {
	    	$(window).resize(function() {
	    		var mainheight = $(window).height() - $("#title_tb").height()  - 25;
				$("#gf").height(mainheight);
	        
		        //子页面
				setClientHeight('gf',null,0);
	        
	    	});
		});
		</script>
		
	</head>
	<body style="margin: 0px;padding: 0px;">
		<table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="title_tb">
			<tr>
				<td>
					<div class="wdtable_titleh">
						流程图
					</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="window.close()">关闭</a>
					</div>
				</td>
			</tr>
		</table>
		<table width="100%" border="0" cellspacing="1" cellpadding="0" class="table02">
			<tr>
				<td>
					<iframe id="gf" src="Graph!iframe.ajax?fiId=${fiId}" width="100%" marginheight="0" marginwidth="0" frameborder="0" scrolling="auto" onreadystatechange="setClientHeight('gf',this)" onload="setClientHeight('gf',this)"></iframe>
					<script>
						//$("#gf").load(function() {
							//var mainheight = $("#gf").contents().find("body").height() + 15;
							//$(this).height(mainheight);
						//});
					</script>
					<script>
						var mainheight = $(window).height() - $("#title_tb").height()  - 25;
						$("#gf").height(mainheight);
					</script>
				</td>
			</tr>
		</table>
	</body>
	
</html>
