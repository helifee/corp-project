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
<title> ҵ��Ȩ�޲�ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
</head>
<body>
<html:form  method="post" action="/hvpspermissioninfoAction.do?method=findList&business=${business}">
<input id="repeatmark" type="hidden" value="0" />






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
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2"> ҵ��Ȩ�޲�ѯ </span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
                <tr>
                 <td width="120" height="40" class="text_tablehead_b">������������</td>
                  <td width="120"><div align="left">
                   <html:text property="po.initiateparticipant" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
                  </td>
                  <td width="120" height="40" class="text_tablehead_b">���ղ��������</td>
                  <td width="120"><div align="left">
                   <html:text property="po.receiveparticipant" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
                  </td>
                   <td  width="90" height="40" class="text_tablehead_b"></td>
                   <td  colspan="4" align="center">
                  <input name="query" type="button" class="button" value="�� ѯ"  onclick="nullsubmit()"/> 
                  </td>
                </tr> 
              </table>
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
                  
                   <td  align="center" class="text_listhead">�����������б�</td>
                  <td  align="center" class="text_listhead">���ղ�������б�</td>
                                   
                   <td  align="center" class="text_listhead">����������</td>
                    <td  align="center" class="text_listhead">���ܲ������</td>
                    <td  align="center" class="text_listhead">���ı��</td>
                  <td  align="center" class="text_listhead">ҵ�����ͱ���</td>
                  <td  align="center" class="text_listhead">Ȩ�ޱ�ʶ</td>
                  <td  align="center" class="text_listhead">Ȩ��Ȩ��ֵ</td>
                     				 
                </tr>
                <logic:present name="queryList">
                <logic:iterate id="po" name="queryList">
  
                <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                 
                  <td  class="text_list"><div class="gridCell_standard">${po.sndbkctgy}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.rcvbkctgy}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.receiveparticipant}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.receiveparticipant}</td>
                  
                  <td  class="text_list"><div class="gridCell_standard">${po.messagetype}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.transactiontypecode}</td>    
                  <td  class="text_list"><div class="gridCell_standard">${po.authoritysigncode}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.authorityweight}</td> 
                         
                
                       		 
                 
                  
                 
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
