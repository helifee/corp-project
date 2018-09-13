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
<title>数字证书下载申请查询</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
			type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewbykey(indentifier){
		var newurl = "<%=path %>/hvpsdigsigdownreqinfoAction.do?method=queryDigsignAppDetails&id=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/hvpsdigsigdownreqinfoAction.do?method=findList">
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
          <table width="95%" border="0"  cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">证书下载申请查询</span></div>
                					</td>
                				</tr>
                			</table>
          <table width="95%" border="0" cellpadding="0" cellspacing="0" class="table_head" >
               <tr>
        	<td colspan="2">&nbsp;</td>
        </tr>
                <tr>
                  <td  class="text_tablehead_b">报文标识号</td>
                  <td >
                   <input type="text" name="po.msgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
                  </td>
                  <td  ><input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> </td>
				               
                </tr> 
                
				                <tr>
        	<td colspan="2">&nbsp;</td>
        </tr>
            </table>
            </div><br>
            <div align="center">
              <table width="95%"  class="tbcolor">
                <tr class="text_listhead">
                   <td  >报文标识号</td>
                   <td  >报文发送时间</td>
                  <td  >发起直接参与机构</td>
                  <td  >发起参与机构</td>
                   <td  >接收直接参与机构</td>
                  <td  >接收参与机构</td>
                   <td  >系统工作日期</td>  
                   <td  >备注</td>                   
                  	<td  >明细</td>    
                </tr> 
                <logic:present name="queryList">
				  <logic:iterate id="po" name="queryList">
				  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
                  <td  class="text_list">${po.msgid }</td>
                  <td  class="text_list">${po.credttm }</td>
                  <td  class="text_list">${po.instgdrctpty }</td>
                  <td  class="text_list">${po.instgindrctpty }</td>
                  <td  class="text_list">${po.instddrctpty }</td>
                  <td  class="text_list">${po.instdindrctpty }</td>
                  <td  class="text_list">${po.workdt }</td>
                  <td  class="text_list">${po.rmk }</td>     
                  <td  class="text_list">
            			<a href="#" onclick="viewbykey('${po.id}')">明细</a>
				  </td>                 
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
