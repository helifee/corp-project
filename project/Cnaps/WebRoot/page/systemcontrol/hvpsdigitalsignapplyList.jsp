<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>数字证书绑定通知查询</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
			type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewbykey(indentifier,business){
		var newurl = "<%=path %>/hvpsdigitalsignapplyAction.do?method=querysendMsg&business="+business+"&msgid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/hvpsdigitalsignapplyAction.do?method=findList">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
							<tr>
							<td class="text_tablehead_b">
							<%-- 
								<td width="360" background="<%=path%>/image/content_table_bar_L.jpg">
								--%>
									<h5 align="left">&nbsp;</h5>
								</td>
								<td  width="194" ></td>
								<td  width="270"  ></td>
				
							</tr>
						</table>
					</td>
					<td width="8" ></td>
  </tr>
  <tr valign="top">
    <td></td>
    <td>
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
                						<div  class="text_title"><span class="text_blue2">证书绑定通知查询</span></div>
                					</td>
                				</tr>
                			</table>
          <table width="95%" border="0"  cellpadding="0" cellspacing="0" class="table_head" >
                <tr><td colspan="4">&nbsp;</td></tr>
                <tr>
                  <td  class="text_tablehead_b">报文标识号：</td>
                  <td >
                   <html:text property="po.msgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
                  </td>
                  <td  class="text_tablehead_b">工作日期：</td>
                  <td >
                   <html:text property="po.workdate" styleClass="Wdate" onclick="WdatePicker()"/>
                  </td>
                  
                </tr> 
                <tr>
                	 <td   class="text_tablehead_b"></td> <td></td> <td   class="text_tablehead_b"></td>
                   <td  colspan="2" align="center">
                  <input name="query" type="button" class="button" value="查 询"  onclick="submit()"/> 
                  </td>
                </tr>
                 <tr><td colspan="4">&nbsp;</td></tr>
            </table>
            </div><br>
            <div align="center">
              <table  width="95%" class="tbcolor" >
                <tr class="text_listhead">
                  <td  >报文标识号</td>
                   <td  >发起直接参与机构</td>
                  <td  >变更类型</td>
                  <td  >业务状态</td>
                  <td>来往标识</td>
                   <td  >工作日期</td>
                    <td  >操作</td>
                </tr> 
                <logic:present name="queryList">
				  <logic:iterate id="po" name="queryList">
				  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
                   <td  class="text_list">${po.msgid}</td>
                  <td  class="text_list">${po.instgdrctpty}</td>
                  <td  class="text_list">
                  		<c:if test="${po.chgtp eq 'CC00'}">新增</c:if>
                  		<c:if test="${po.chgtp eq 'CC02'}">撤销</c:if>
                  </td>
                  <td  class="text_list">${po.pmtsts}</td>
                  <td>
                  	<c:if test="${po.sendrecvflag eq 'O'}">发送</c:if>
                  	<c:if test="${po.sendrecvflag eq 'I'}">接收</c:if>
                  </td>
                  <td  class="text_list">${po.workdate}</td>
                  <td  class="text_list">
         				<a href="#" onclick="viewbykey('${po.msgid}','${business}')">明细</a>
		          </td>   
                  </tr>               
                  </logic:iterate>                
                </logic:present>
                 <logic:notPresent name="queryList">
					                <tr>
					                		<td colspan="9" align="center"><font color="red">没有符合条件的记录!</font></td>
					                	</tr>
					                </logic:notPresent>  
                </table></div></td>
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
