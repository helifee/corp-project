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
<title>�����˻�����ֵ����֪ͨ��ѯ</title>
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
</head>
<body>
<html:form  method="post" action="/hvpssystemstatusnotifyAction.do?method=findList">
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
  <tr>
        			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
						<h5 align="left">&nbsp;�����˻�����&nbsp;->&nbsp;�˻�����֪ͨ&nbsp;->&nbsp;����ֵ����֪ͨ</h5>
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
                  <td width="120" height="40" class="text_tablehead_b">���ı�ʶ�ţ�</td>
                  <td width="120"><div align="left">
                   <input type="text" name="po.msgid"/>
                  </td>
                  <td width="120" height="40" class="text_tablehead_b">�������ڣ�</td>
                  <td width="120"><div align="left">
                   <input width="120" type="text" name="po.workdate"/>
                  </td>
                   <td  width="90" height="40" class="text_tablehead_b"></td>
                   <td  colspan="4" align="center">
                  <input name="query" type="button" class="button" value="�� ѯ"  onclick="nullsubmit()"/> 
                  </td>
                </tr> 
            </table><br>
              <div align="center"><br><div align="center">
              <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
                <tr>
 
                   <td  align="center" class="text_listhead">���</td>
                   <td  align="center" class="text_listhead">���ı�ʶ��</td>
                   <td  align="center" class="text_listhead">���ķ���ʱ��</td>
                   <td  align="center" class="text_listhead">����������</td>
                   <td  align="center" class="text_listhead">ϵͳ��</td>
                   
                   <td  align="center" class="text_listhead">֪ͨ����</td>
                   <td  align="center" class="text_listhead">Ԥ�������ر�����</td>
                   <td  align="center" class="text_listhead">������</td>
                   <td  align="center" class="text_listhead">����ֵ</td>	 
                   <td  align="center" class="text_listhead">����ֵ������־</td>
                </tr> 
                  <tr>
				  <tr onMouseOver="this.bgColor='#B4FFFF';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">		
                  <td  class="text_list"><div class="gridCell_standard">1</td>
                  <td  class="text_list"><div class="gridCell_standard">2011030300000003</td>
                  <td  class="text_list"><div class="gridCell_standard">155223</td>
                  <td  class="text_list"><div class="gridCell_standard">0000</td>
                  <td  class="text_list"><div class="gridCell_standard">SAPS</td>
                  <td  class="text_list"><div class="gridCell_standard">���Ԥ������֪ͨ</td>
 				  <td  class="text_list"><div class="gridCell_standard">����</td>
                  <td  class="text_list"><div class="gridCell_standard">203100000035</td>
 				  <td  class="text_list"><div class="gridCell_standard">500000</td> 				 
 				   <td  class="text_list"><div class="gridCell_standard">�����</td>
 				  </tr> 
                </table></div></div></td>
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
