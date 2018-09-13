<%@page import="java.net.URLEncoder"%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <title>人员选择</title>
    <link href="css/xy_data.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/jquery/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="page/OrgnSelect/OrgnSelect_singleUsersList.js"></script>
</head>
<body>
 
<form action="OrgnSelect!usersList.do" method="post" id="frm" name="frm">
	<input type="hidden" name="start" value="${start }"/>
	<div width="100%" border="0"  cellpadding="0"    frame = "void">
		<div  valign="top" align="left"  style="width:350px;height:400px;float:left;">
		    <table width="100%"  align="center"  valign="top" cellpadding="0" cellspacing="1" class="xy_01 mgb8"  id="l_table">
			      <tr>
				        <th width="45"><input type="checkbox" name="l_check_all" id="l_check_all" onclick="javascript:checkAllList(this);" /></th>
				        <th width="90">用户名</th>
				        <th width="90">姓名</th>
			      </tr>
			    <s:iterator value="page.items" var="item"  >
				      <tr  id="${item.id}" ondblclick="javascript:checkOneList(${item.id});additUserSingleList(${item.id});return false;">
					        <td align="center"><input id="chk_${item.id}" type="checkbox" name="l_user"  value="${item.id}" onclick="checkOneList(this);additUserList();" /></td>
					        <td>${item.loginName }</td>
					        <td>${item.realName }</td>
				      </tr>
				</s:iterator> 
		    </table>	
		    <s:if test="page.totalPages > 1">
	    	<app:PageTag actionName="OrgnSelect!usersList.do" formName="frm" ></app:PageTag>
	    	</s:if>
		</div >
	    <div align="center"  width="50px" border="0"  style="float:right;margin-right: 10px;" > 
		</div>
   	</div>
    </form>
</body>
</html>