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
<title>数字证书下载申请明细查询</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
</head>
<body>
<html:form  method="post" action="/hvpsdigsigdownreqinfoAction.do?method=queryDigsignAppDetails">
 <input type="hidden" name="id" value="${condition }"/>
 <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  
  <tr valign="top">
    <td ></td>
    <td >
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
        	<td colspan="6">&nbsp;</td>
        </tr>
       
        <tr>
          <td >&nbsp;</td>
          <td>
          <div align="center">
          
         
            </div><br>
            <div align="center">
            <table width="95%" border="0"  cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">证书下载申请明细</span></div>
                					</td>
                				</tr>
                			</table>
              <table width="95%"  class="tbcolor">
                <tr class="text_listhead">
                   <td  >申请序号</td>
                   <td  >直接参与机构</td>
                  <td  >数字签名</td> 
                </tr> 
                <logic:present name="queryList">
				  <logic:iterate id="po" name="queryList">
				  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
                  <td  class="text_list">${po.applyId }</td>
                  <td  class="text_list">${po.instgdrctpty }</td>
                  <td  class="text_list">${po.certmsgbody }</td>
                  </tr>               
                  </logic:iterate>                
                </logic:present></table></div>
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
    <td ></td>
  </tr>  
</table>
</html:form>
</body>
</html>
