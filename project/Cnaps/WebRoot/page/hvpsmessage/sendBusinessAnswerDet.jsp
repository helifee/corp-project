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
<title> ҵ���˻������ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />

	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewbykey(flag,id){
		var newurl = "<%=path %>/businessReturnAnswerAction.do?method=sendMsg&flag="+flag+"&id="+id;
		viewDetailsByHeightWidth(newurl,'ҵ���˻�Ӧ��¼��',400,'90%');
	}
</script>
</head>
<body>
<html:form  method="post" action="/businessReturnAction.do?method=querysendMsg">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		
	  	<tr valign="top">
	    	<td >
	    	
	      		
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
                		<td colspan="6">&nbsp;</td>
                	</tr>
	        		<tr>
	          			<td >&nbsp;</td>
	          			<td>
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">ҵ���˻�Ӧ����</span></div>
                					</td>
                				</tr>
                			</table>
	          				
		            		<div align="center">
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead">
					                   <td>ԭҵ����ϸ��ʶ��</td>
					                   <td>ԭҵ���ı�ʶ��</td>
					                   <%-- 
					                   <td>ԭֱ�ӷ���������</td>
					                   <td>ԭֱ�ӽ��ղ������</td>
					                   --%>
					                   <td>ԭ����������</td>
					                 
					                   <td>ԭ���ղ������</td>
					                   <td>������ʶ</td>
					                   <td>Ӧ��״̬</td>
					                    <td>ԭҵ�����ʹ���</td>
					                    <td>ԭҵ���������</td>
					                  
					       			   <td>����</td>
					       			  
					                </tr> 
					                
					                 <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
					                  <td  class="text_list">${po.orngltxid}</td>
					                  <td  class="text_list">${po.ornglMsgId}</td>  
					                  <%--
					                  <td  class="text_list">${po.ornglInstgDrctPty}</td>
					                   <td  class="text_list">${po.ornglInstdDrctPty}</td>
					                   --%> 
					                  <td  class="text_list">${po.orgnlInstgPty}</td>
					                  <td  class="text_list">${po.ornglInstdPty}</td>
					                  <td  class="text_list">
					                  	<c:if test="${po.direction eq 'O'}">����</c:if>
					                  	<c:if test="${po.direction eq 'I'}">����</c:if>
					                  </td>
					                   <td  class="text_list">
					                   	<c:if test="${po.status eq '0'}">δӦ��</c:if>
					                   	<c:if test="${po.status eq '1'}">ͬ��</c:if>
					                   	<c:if test="${po.status eq '2'}">��ͬ��</c:if>
					                   </td>
					                  <td  class="text_list">
					                  		<c:if test="${po.ornglPmtTp eq 'A108'}">�ֽ���</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A110'}">���ճи�</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A109'}">ί���տ�(����)</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A101'}">�������ʽ�㻮</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A102'}">������</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A104'}">�����ʽ���ǻ���</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A301'}">�ɷ�ҵ��</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A201'}">֧Ʊ</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A100'}">��ͨ���</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A112'}">�������</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A200'}">�м��ʽ�㻮</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A202'}">���л�Ʊ</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A113'}">�羳֧��</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A307'}">�����ʽ��ծ�Ҹ����ǻ���</c:if>
																	<c:if test="${po.ornglPmtTp eq 'B307'}">�����ʽ��ծ�Ҹ���ǻ���</c:if>
				                  									<c:if test="${po.ornglPmtTp eq 'A106'}">֧ȡ���л���</c:if>
																	<c:if test="${po.ornglPmtTp eq 'B100'}">��ͨ���ҵ��</c:if>
																	<c:if test="${po.ornglPmtTp eq 'C102'}">���˴���ͨ��ҵ��</c:if>
																	<c:if test="${po.ornglPmtTp eq 'D102'}">���˴���ͨ��ҵ��</c:if>
																	<c:if test="${po.ornglPmtTp eq 'E100'}">��ͨ���ڴ���ҵ��</c:if>
																	<c:if test="${po.ornglPmtTp eq 'B308'}">֧Ʊ����</c:if>
																	<c:if test="${po.ornglPmtTp eq 'B309'}">Ʊ�ݽ���</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A113'}">�羳֧��</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A309'}">CISͨ��Ʊ��ҵ���ִ</c:if>
																	<c:if test="${po.ornglPmtTp eq 'A308'}">CIS֧Ʊҵ���ִ</c:if>
					                  
					                  </td>
					                   <td  class="text_list">${po.orgCode}</td>
					                  
					                  <td class="text_list"><a href="#" onclick="viewbykey('1','${po.id }')">ͬ��</a>
					                  	<a href="#" onclick="viewbykey('2','${po.id }')">�ܾ�</a>
					                  </td>
					                 
					                  </tr>               
					                  </logic:iterate>
					                   <logic:empty name="queryList">
					                  	<tr>
					                		<td colspan="9" align="center"><font color="red">û�з��������ļ�¼!</font></td>
					                	</tr>
					                  </logic:empty>    
					                </logic:present>
					                               
		                		</table>
		             		</div>	                
	            		</td>
	        		</tr>
					<tr>  
			    		<td></td>      
					   	<td>
					       	<table width="100%" border="0" cellpadding="0" cellspacing="0">
					        	<tr>
					          		<td><jsp:include page="/page/common/Page.jsp"/></td>
					          	</tr>
				         	</table>
				        </td>
			     		<td></td>
		     		</tr>
	    		</table>
	    	</td>
	    	<td >
	  	</tr>  
	</table>
</html:form>
</body>
</html>
