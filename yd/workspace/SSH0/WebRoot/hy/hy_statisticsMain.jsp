<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<title>会议室预约统计一览</title>
<style type="text/css">
<!--
body {
	background-color: #ecf6ff;
}

ul {
	list-style: none;
}

/* 菜单class */
.Menubox {
	width: 50%;
	height: 28px;
	line-height: 28px;
}

.Menubox ul {
	margin: 0px;
	padding: 0px;
}

.Menubox li {
	float: left;
	display: block;
	cursor: pointer;
	width: 80px;
	text-align: center;
	color: #000000;
	background-color: #ffffff;
	border-left: 0px solid #ffffff;
	border-top: 0px solid #ffffff;
	border-right: 0px solid #ffffff;
	border-bottom: 0px solid #ffffff;
}

.Menubox li.hover {
	padding: 1px;
	background-color: #6c95d0;
	width: 80px;
	border-left: 0px solid #6c95d0;
	border-top: 0px solid #6c95d0;
	border-right: 0px solid #6c95d0;
	border-bottom: 0px solid #6c95d0;
	color: #ffffff;
	font-weight: bold;
	height: 27px;
	line-height: 27px;

}
-->
</style>
<script language="JavaScript" type="text/javascript"
	src="js/common.js"></script>
<script language="JavaScript" type="text/javascript"
	src="js/prototype.js"></script>
<script language="JavaScript" type="text/javascript"
	src="js/applicationStatics.js"></script>

</head>

<body>
<s:include value="../common/topmenu.jsp" />

<br />
<p align="center"><font size="4" color="green"><strong>会议室预约统计一览</strong></font></p>

<s:form action="" method="post" theme="simple" name="staticsYuyuetongji"
	id="staticsYuyuetongji">
	<input type="hidden" name="dsFlag" id="dsFlag" value="0" />
	<table width="1220" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td width="170" height="50"></td>
			<td align="left"><label> 
			
			
	<s:select name="staticsyear" list="yearList"   onchange="yueyueStaticsAction(); " >
					 </s:select>		
			
		</label></td>	
			<td width="60"><a href="#" onclick="conferenceinitAction('<s:property value="yyDate"/>');">返回</a>
			</td>
		</tr>
	</table>
	<div id="div_hy_staticsAjax" align="left"><s:include
		value="hy_statistics.jsp" /></div>
</s:form>
</body>
</html>


