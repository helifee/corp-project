<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
	
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>清算排队查询</title>
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
</head>
<body>
<html:form  method="post" action="/demoAction.do?method=findList">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
        			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
						<h5 align="left">&nbsp;清算账户管理&nbsp;->&nbsp;清算排队管理&nbsp;->&nbsp;清算排队查询</h5>
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
			</td>
			<td width="8" ></td>
  </tr>
  <tr valign="top">
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);"></td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
          <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="border:1px #99bbe8 solid; padding:3px;" >
                <tr>
                  <td width="120" height="40" class="text_tablehead_b">查询方式：</td>
                  <td>
                   <select name="po.qrytp">
                   		<option value="QT00">查询指定清算账户</option>
						<option value="QT01">查询指定及其辖属清算账户</option>
                   </select>
                  </td>
                  <td height="40" class="text_tablehead_b">被查询人行行号/被查询清算行行号：</td>
                  <td>
                  	<input width="120" type="text" name="po.mgrid"/>
                  </td>
                  <td align="center">
                  	<input name="query" type="button" class="button" value="查 询"  onclick="nullsubmit()"/> 
                  </td>
                  </tr>
            </table><br>
          </td>
         </tr>
			<tr>  
	       <td></td>      
	       <td>
	       <table width="100%" border="0" cellpadding="0" cellspacing="0">
        	<tr>
          <td><jsp:include page="/page/common/Page.jsp"/></td>
          </tr>
         </table></td>
	      <td></td>
	      </tr>
    </table></td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);"></td>
  </tr>  
</table>
</html:form>
</body>
</html>
