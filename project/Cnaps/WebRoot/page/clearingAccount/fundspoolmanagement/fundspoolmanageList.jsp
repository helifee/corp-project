<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> �ʽ�ع����ѯ�б� </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>

<script language="javascript">

	
	function viewdetails(id){
		var newurl = "<%=path %>/FundspoolAction.do?method=sendDetailMessage&id="+id;
		viewDetails(newurl);	
	}
</script>

</head>
<body>
<html:form  method="post" action="/FundspoolAction.do?method=querySendxml">


 
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
   <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="360" >
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
                  <td width="134" style="background-image:url('<%=path%>/image/psimage.jpg');"><div align="left"><span class="text_blue2"> �ʽ�ع����ѯ</span></div></td><td width="781"></td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
                      
            	<tr>
				                	<td width="120" height="40" class="text_tablehead_b">���ı�ʶ�ţ�</td>
				                  	<td width="120"><div align="left">
				                   		<input type="text" name="po.msgId" value="${condition.msgId }"/>
				                  	</td>
				                  	<td width="120" height="40" class="text_tablehead_b">�������ڣ�</td>
				                  	<td width="120"><div align="left">
				                  	
				                  	
				                  	<input  type="text" name="po.workDate"  value="${condition.workDate }" readonly="readonly" title="��������" style="width: 180px;"
										class="Wdate" onclick="WdatePicker()" />
										
									</td>								
				                   	<td  width="90" height="40" class="text_tablehead_b"></td>
				                   	<td  colspan="4" align="center">
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
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
					                   <td  align="center" class="text_listhead">���ı�ʶ��</td>
					                   <td  align="center" class="text_listhead">��������</td>
					                  <td  align="center" class="text_listhead">����ֱ�Ӳ������</td>					                  
					                   <td  align="center" class="text_listhead">�ʽ�ع�������</td>	
					                     <td  align="center" class="text_listhead">��Ч����</td> 
					                   <td  align="center" class="text_listhead">ҵ��״̬</td>
					                   <td  align="center" class="text_listhead">����</td>
					       				 
					                </tr> 
                <logic:present name="queryList">
                <logic:iterate id="po" name="queryList">
                <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='#F2F2F2'" style="cursor: hand;" bgcolor="#F2F2F2">
                   <td  class="text_list"><div class="gridCell_standard">${po.msgId }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workDate }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.sendDrctPty }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.fundsOfPoolManagementType eq 'MT00'}">���ý��˳��</c:if>
												<c:if test="${po.fundsOfPoolManagementType eq 'MT01'}">������˳��</c:if>
												<c:if test="${po.fundsOfPoolManagementType eq 'MT02'}">ֹͣ�ʽ�ع���</c:if>
												<c:if test="${po.fundsOfPoolManagementType eq 'MT03'}">��������</c:if>
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.effectiveDate }</div></td> 
							                   <td  class="text_list"><div class="gridCell_standard">${po.pmtSts }</div></td>  
						                      <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetails('${po.id}')"><u>��ϸ</u></a></span></div>
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
