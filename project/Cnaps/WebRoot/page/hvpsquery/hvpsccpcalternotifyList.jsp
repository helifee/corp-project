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
<title> CCPC���ݱ��֪ͨ��ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
</head>
<body>
<html:form  method="post" action="/hvpsccpcalternotifyAction.do?method=findList&business=${business}">




 



 
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
             <table width="95%"  border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td ><div class="text_title"><span class="text_blue2"> CCPC���ݱ��֪ͨ</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
                      
           <tr>
                  <td width="120" height="40" class="text_tablehead_b">���ı�ʶ�ţ�</td>
                  <td width="120"><div align="left">
                   <input type="text" name="po.msgid"/>
                  </td>
                  <td width="120" height="40" class="text_tablehead_b">CCPC���룺</td>
                  <td width="120"><div align="left">
                   <input width="120" type="text" name="po.ndcd"/>
                  </td>
                  <td width="120" height="40" class="text_tablehead_b">CCPC���ƣ�</td>
                  <td width="120"><div align="left">
                   <input width="120" type="text" name="po.ndnm"/>
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
                   <td  align="center" class="text_listhead">���</td>
                   <td  align="center" class="text_listhead">���ı�ʶ��</td>
                   <td  align="center" class="text_listhead">���ķ���ʱ��</td>
                  <td  align="center" class="text_listhead">����ֱ�Ӳ������</td>
                  <td  align="center" class="text_listhead">�����Ӳ������</td>
                   <td  align="center" class="text_listhead">����ֱ�Ӳ������</td>
                  <td  align="center" class="text_listhead">���ռ�Ӳ������</td> 
                   <td  align="center" class="text_listhead">ϵͳ���</td>
                   <td  align="center" class="text_listhead">��ע</td>     
                                 
                  <td  align="center" class="text_listhead">�ܼ�¼��</td>
                  <td  align="center" class="text_listhead">�����ļ�¼��ʼ���</td>
                  <td  align="center" class="text_listhead">�����ļ�¼��ֹ���</td>  
                                  
                  <td  align="center" class="text_listhead">�������</td>
                  
                  <td  align="center" class="text_listhead">�б�����Ŀ</td>
                  <td  align="center" class="text_listhead">CCPC��������Ŀ</td>
                  <td  align="center" class="text_listhead">���д�������Ŀ</td>
                  
                  <td  align="center" class="text_listhead">�������</td>
                  <td  align="center" class="text_listhead">��Ч����</td>
                  <td  align="center" class="text_listhead">��Ч����</td>
                  <td  align="center" class="text_listhead">ʧЧ����</td>
                  
                  <td  align="center" class="text_listhead">CCPC����</td>
                  <td  align="center" class="text_listhead">CCPC����</td>
                  <td  align="center" class="text_listhead">CCPC����</td>
                  <td  align="center" class="text_listhead">���ڳ��д���</td>
                
                </tr> 
                <logic:present name="queryList">
                <logic:iterate id="po" name="queryList">
                <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='#E6E6E6'" bgcolor="#E6E6E6">
                     <td  class="text_list"><div class="gridCell_standard">${po.id }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.msgid }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.credttm }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.instgdrctpty }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.instgindrctpty }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.instddrctpty }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.instdindrctpty }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.syscd }</td>   
                  <td  class="text_list"><div class="gridCell_standard">${po.rmk }</td>    
                   
                  <td  class="text_list"><div class="gridCell_standard">${po.ttlnb }</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.startnb }</td>                        
                  <td  class="text_list"><div class="gridCell_standard">${po.endnb }</td>
                  
                  <td  class="text_list"><div class="gridCell_standard">${po.chngnb}</td>
                  
                  <td  class="text_list"><div class="gridCell_standard">${po.bktpchngnb}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.ccpcchngnb}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.citychngnb}</td>
                  
                  <td  class="text_list"><div class="gridCell_standard">${po.chngtp}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.fctvtp}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.fctvdt}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.ifctvdt}</td>
                  
                  <td  class="text_list"><div class="gridCell_standard">${po.ndcd}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.ndnm}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.ndtp}</td>
                  <td  class="text_list"><div class="gridCell_standard">${po.citycd}</td>                    
               
                  
                 
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
