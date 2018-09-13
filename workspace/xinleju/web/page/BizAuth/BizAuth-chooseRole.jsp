<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>标准角色</title>
<base target="_self" />
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link href="css/xy_cost.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<style type='text/css'>
html{overflow:hidden;}
</style>


<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<script type="text/javascript" src="js/application.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="page/BizAuth/BizAuth-chooseRole_tree.js?t=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="page/BizAuth/BizAuth-chooseOptionList.js?t=<%=System.currentTimeMillis()%>"></script>

</head>
<body>
   
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">标准角色</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="window.close();">关闭</a>
					</div>
				</td>
			</tr>
	</table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="100%" valign="top">
				   <div class="t_title" style='margin-top: 5px'>
				      <div class="hh">标准角色（双击选择）</div>
				     
				    </div> 
					<div id="roleTree"></div>
				</td>

   <!-- 
	<div class="popgsfl_title" style="width:380px">
		<div class="popgsfl_title_h1">请选择标准角色【双击选择】</div>
		<div class="popgsfl_title_close" id="tjDiv">
			<a href="#" onclick="window.close();">关闭</a>
		</div>
	</div>
	<div class="pop_msgalert" style="height:30px;">
		温馨提示：请从“标准角色”中<font style="color: red;font-weight: bold;">“双击”</font>选择您需要的角色。
	</div>
	<div id="roleTree"></div>
 -->
</body>
