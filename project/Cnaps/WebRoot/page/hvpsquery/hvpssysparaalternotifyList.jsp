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
<title>系统参数变更通知查询</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewbykey(indentifier,business){
		var newurl = "<%=path %>/hvpssysparaalterdetailAction.do?method=querysendMsg&business="+business+"&detailid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/hvpssysparaalternotifyAction.do?method=findList&business=${business}">
<input id="repeatmark" type="hidden" value="0">
 





<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" class="text_tablehead_b">
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
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="10">&nbsp;</td>
          <td>
            <div align="center">
             <table width="95%" height="22" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2"> 系统变更通知查询</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
               <tr>
                 <td width="120" height="40" class="text_tablehead_b">报文标识号：</td>
                  <td width="120"><div align="left">
                   <html:text property ="po.msgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
                  </td>
                  <td width="120" height="40" class="text_tablehead_b">工作日期：</td>
                  <td width="120"><div align="left">
                   <html:text property ="po.workdate" readonly="true" onclick="WdatePicker()"/>
                  </td>
                   <td  width="90" height="40" class="text_tablehead_b"></td>
                   <td  colspan="4" align="center">
                  <input name="query" type="button" class="button" value="查 询"  onclick="nullsubmit()"/> 
                  </td>
                </tr>             </table>
              <table width="761" height="23" border="0" cellpadding="0" cellspacing="0">
                <tr >
                <td width="41"   ></td>
                <td width="41" align="center"></td>
                <td width="414" ><div align="right">
                </div></td>
                </tr>
              </table>
              
              <table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
               
                <tr>
                   <td  align="center" class="text_listhead">报文标识号</td>
                   <td  align="center" class="text_listhead">报文发送时间</td>
                   <td  align="center" class="text_listhead">发起参与机构</td>
                   <td  align="center" class="text_listhead">系统号</td>
                   <td  align="center" class="text_listhead">备注</td>
                   <td  align="center" class="text_listhead">工作日期</td> 
                   <td  align="center" class="text_listhead">操作</td>
                </tr> 
                <logic:present name="queryList">
                <logic:iterate id="po" name="queryList">
                <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='#E6E6E6'" bgcolor="#E6E6E6">
                         
                
                   		 
                  <td  class="text_list"><div class="gridCell_standard"> ${po.msgid }  </td>
                  <td  class="text_list"><div class="gridCell_standard">${po.credttm }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.sendbranch }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.syscd }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.remarkinfo }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.workdate }</td>
                  <td  class="text_list">
       					<a href="#" onclick="viewbykey(${po.id},'${business}')">明细</a>
                  </td>
                  
                 
                </tr>
				</logic:iterate>
                </logic:present>
             </table></td>
        </tr>
		<tr>  
	      <td></td>      
	      <td>
	            <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td><jsp:include page="/page/common/Page.jsp"/></td>
        </tr>
      </table>	      </td>
	      <td></td>
	      </tr>
    </table>    </td>
    <td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);" ></td>
	
  </tr>  
</table>





 





























 
</html:form>
</body>
</html>
