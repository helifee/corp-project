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
<title>����֤�����������ѯ</title>
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
                						<div  class="text_title"><span class="text_blue2">֤�����������ѯ</span></div>
                					</td>
                				</tr>
                			</table>
          <table width="95%" border="0" cellpadding="0" cellspacing="0" class="table_head" >
               <tr>
        	<td colspan="2">&nbsp;</td>
        </tr>
                <tr>
                  <td  class="text_tablehead_b">���ı�ʶ��</td>
                  <td >
                   <input type="text" name="po.msgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
                  </td>
                  <td  ><input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> </td>
				               
                </tr> 
                
				                <tr>
        	<td colspan="2">&nbsp;</td>
        </tr>
            </table>
            </div><br>
            <div align="center">
              <table width="95%"  class="tbcolor">
                <tr class="text_listhead">
                   <td  >���ı�ʶ��</td>
                   <td  >���ķ���ʱ��</td>
                  <td  >����ֱ�Ӳ������</td>
                  <td  >����������</td>
                   <td  >����ֱ�Ӳ������</td>
                  <td  >���ղ������</td>
                   <td  >ϵͳ��������</td>  
                   <td  >��ע</td>                   
                  	<td  >��ϸ</td>    
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
            			<a href="#" onclick="viewbykey('${po.id}')">��ϸ</a>
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
