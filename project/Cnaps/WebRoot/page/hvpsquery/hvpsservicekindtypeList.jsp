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
<title> 业务种类与类型查询 </title>
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
</head>
<body>
<html:form  method="post" action="/hvpsservicekindtypeAction.do?method=findList&business=${business}">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
						<h5 align="left">&nbsp;大额支付系统&nbsp;->&nbsp;系统控制业务&nbsp;->&nbsp;业务种类与类型管理&nbsp;->&nbsp;业务种类与类型查询</h5>
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
                  <td width="120" height="40" class="text_tablehead_b">业务类型编码：</td>
                  <td width="120"><div align="left">
                   <input type="text" name="po.txtpcd"/>
                  </td>
                  <td width="120" height="40" class="text_tablehead_b">业务种类编码：</td>
                  <td width="120"><div align="left">
                   <input type="text" name="po.ctgypurpcd"/>
                  </td>
                   <td  width="90" height="40" class="text_tablehead_b"></td>
                   <td  colspan="4" align="center">
                  <input name="query" type="button" class="button" value="查 询"  onclick="nullsubmit()"/> 
                  </td>
                </tr> 
            </table><br>
            <div align="center"><br><div align="center">
              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr>
                   <td  align="center" class="text_listhead">序号</td>                                   
                  <td  align="center" class="text_listhead">报文编号</td>
                  <td  align="center" class="text_listhead">报文名称</td>
                  <td  align="center" class="text_listhead">业务类型编码</td>
                  <td  align="center" class="text_listhead">业务类型名称</td>
                  <td  align="center" class="text_listhead">业务种类编码</td>
                  <td  align="center" class="text_listhead">业务种类名称</td>
                
                </tr> 
                <logic:present name="queryList">
				  <logic:iterate id="po" name="queryList">
				  <tr onMouseOver="this.bgColor='#B4FFFF';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">		
                  <td  class="text_list"><div class="gridCell_standard">${po.id }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.msgtp}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.msgnm}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.txtpcd}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.txtpnm}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.ctgypurpcd}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.ctgypurpnm}</td>
                                   
                  </tr>               
                  </logic:iterate>                
                </logic:present></table></div></div></td>
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
