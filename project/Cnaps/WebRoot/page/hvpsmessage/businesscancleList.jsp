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
<title> ҵ������ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewbykey(indentifier,business){
		var newurl = "<%=path %>/businessCancleAction.do?method=querysendMsgDetails&business="+business+"&detailid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/businessCancleAction.do?method=querysendMsg&business=${business}">
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
             <table width="95%"  border="0" cellpadding="0" cellspacing="0">
                <tr>
               	 <td>
                  <div align="left" class="text_title"><span class="text_blue2">ҵ���������ѯ</span></div>
                  </td>
                </tr>
              </table>
			 <table width="95%" border="0" cellpadding="0" cellspacing="0" style="border:1px #B3B3B3 solid; padding:3px;background: #F2F2F2;">
              <tr>
				                	<td width="120" height="40" class="text_tablehead_b">���ı�ʶ�ţ�</td>
				                  	<td width="120"><div align="left">
				                   		<html:text property="po.msgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	</td>
				                  	<td width="120" height="40" class="text_tablehead_b">�������ڣ�</td>
				                  	<td width="120"><div align="left">
				                   		<html:text property="po.workdate" readonly="readonly" style="width:100px;" styleClass="Wdate" onclick="WdatePicker()"/>
				                  	</td>
				                  	
				                </tr> 
				                <tr>
				                		<td  width="90" height="40" class="text_tablehead_b"></td>
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
					                   <td  align="center" class="text_listhead">���ı�ʶ��</td>
					                   <td  align="center" class="text_listhead">�����������к�</td>
					                  <td  align="center" class="text_listhead">���ղ�������к�</td>					                  
					                   <td  align="center" class="text_listhead">ԭ�������ͱ���</td>					                   
					                   <td  align="center" class="text_listhead">ԭ���ı�ʶ��</td>					                   
					                   <td  align="center" class="text_listhead">��������</td>
					                   <td  align="center" class="text_listhead">ҵ��״̬</td>
					                   <td  align="center" class="text_listhead">����</td>
					       				 
					                </tr> 

                <logic:present name="queryList">
                <logic:iterate id="po" name="queryList">
                <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
                        <td  class="text_list"><div class="gridCell_standard">${po.msgid }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.sendbranch }</td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.recvbranch }</td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                   <c:if test="${po.orimsgcode eq 'hvps.111.001.01'}">���ͻ���ͨ����</c:if>
								                  <c:if test="${po.orimsgcode eq 'hvps.112.001.01'}">��������ͨ����</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.121.001.01'}">С��ͻ���ͨ����</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.122.001.01'}">С�������ͨ����</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.127.001.01'}">��ͨ���</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.123.001.01'}">ʵʱ����</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.131.001.01'}">ʵʱ���</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.125.001.01'}">���ڴ���</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.133.001.01'}">���ڽ��</c:if>
								                  <c:if test="${po.orimsgcode eq 'beps.130.001.01'}">CISͨ�û�ִҵ����</c:if>
							                  
							                  </td>							                  
							                  <td  class="text_list"><div class="gridCell_standard">${po.orimsgid }</td>							                  
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdate }</td>
							                  <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.pmtsts eq 'PR09' }">�Ѿܾ�</c:if>
																	<c:if test="${po.pmtsts eq 'PR08' }">�ѳ���</c:if>
																	<c:if test="${po.pmtsts eq 'PR09' }">�Ѿܾ�</c:if>
																	<c:if test="${po.pmtsts eq 'PR05' }">�ѳɹ�</c:if>
																	<c:if test="${po.pmtsts eq 'PR96' }">������    </c:if>
																	<c:if test="${po.pmtsts eq 'PR97' }">�ѷ���    </c:if>
																	<c:if test="${po.pmtsts eq 'PR99' }">����</c:if>
																	<c:if test="${po.pmtsts eq 'PR89' }">����ִ </c:if>
																	<c:if test="${po.pmtsts eq 'PR88' }">�ѻ�ִ</c:if>
							                  </td>
							                  <td  class="text_list">
	             								<a href="#" onclick="viewbykey('${po.msgid}','${business}')">��ϸ</a>
							                  </td>		
                  
                 
                </tr>
				</logic:iterate>
				  <logic:notPresent name="queryList">
					                	<tr>
					                		<td colspan="9" align="center"><font color="red">û�з��������ļ�¼!</font></td>
					                	</tr>
					                </logic:notPresent>   
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
