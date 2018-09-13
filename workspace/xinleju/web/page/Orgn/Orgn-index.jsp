<%@page import="java.net.URLEncoder"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>人员选择</title>
<base target="_self" />
<link href="css/cfldcn_style.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="css/xy_cost.css"   />

<script type="text/javascript" src="js/jquery/jquery-1.7.2.js"></script>
<script type="text/javascript" src="js/jquery/jquery.json-2.2.js"></script>
<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js"></script> 
<script type="text/javascript" src="js/ext/ext-all.js"></script>
<script type="text/javascript" src="js/App.js"></script>
<script type="text/javascript" src="js/jquery.loadmask.min.js"></script>
<script type="text/javascript" src="page/Orgn/Orgn-index.js"></script>
</head>
<body>
	  <table width="100%" border="0" cellspacing="0" cellpadding="0"
			class="wdtable_title" id="maskA">
			<tr>
				<td>
					<div class="wdtable_titleh">请选择人员</div>
					<div class="wdtable_titletool">
						<a href="#" onclick="confirmSelectUser();">确定</a>
						<a href="#" onclick="window.close();">关闭</a>
					</div>
				</td>
			</tr>
	</table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0" id="myTable">
			<tr>
				<td width="22%" valign="top" >
				   <div class="t_title" style='margin-top: 5px'>
				      <div class="hh">组织机构</div>
				    </div> 
					<div id="orgnTree"></div>
				</td>
				<td width="1%" valign="top">&nbsp;</td>
				<td width="77%" valign="top" >
				  <iframe id="user_frame" name="user_frame" frameborder="0" src="Orgn!userList.do?paramJsonStr=${paramJsonStr}&isFirst=1&orgnId=${orgnId}" width="100%" height="550" marginheight="0" marginwidth="0" scrolling="yes"> </iframe>
				</td>
			</tr>
	</table>
	<input type="hidden" name="paramJsonStr" id="paramJsonStr" value="${paramJsonStr}"/>
	<input type="hidden" name="orgnId" id="orgnId" value="${orgnId}"/>
	<input type="hidden" name="nodePath" id="nodePath" value="${nodePath}"/>
</body>

