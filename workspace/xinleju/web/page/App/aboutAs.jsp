<%@page contentType="text/html; charset=UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

    <base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>关于我们</title>
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<script language="javascript" type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
<script type="text/javascript" src="js/jquery.enplaceholder.js"></script>
<script type="text/javascript" src="js/search.js"></script>
    <style type="text/css">
      li{
           list-style-type:none;
           margin-top:5px;
        }
    </style>
	<script type="text/javascript">
		$(function() {
			var total = '${dbCount}';
			if (!total) {
				total = 0;
			}
			$('#db_count', $(parent.document)).html(total);
		});
	</script>
	<script type="text/javascript">
		function closeW(){
			window.close();
		}
	</script>
</head>
<body>
	<center><img src="images/logo.jpg"  width="400" height="100"/></center>
	<br/><font size="2">
	<b>版本：1.0.8223.31<br/><br/>
	口号：立志做房地产ERP的一个传奇<br/><br/>
	
	警告：本计算机程序受版权法律保护，未经授权檀自复制或散布
	本程序的部分或全部，将承受严厉的民事和刑事处罚，对已知的
	违反者将给予法律范围的全面制裁。</b></font>
	<br/><br/><br/>
	@2015 北京鑫乐居科技发展有限公司  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
	<input type="button" value="确定" onclick="closeW();"/>
	
	
</body>
</html>
