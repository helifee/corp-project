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
<title> ���ɸ�ʽ��ѯ�����ͣ� </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />

	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewbykey(indentifier,business){
		var newurl = "<%=path %>/sendFreeMessageAction.do?method=querysendMsgdetail&business="+business+"&detailid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/sendFreeMessageAction.do?method=querysendMsg">
<input type="hidden" name="direction" value="${direction }"/>
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		
	  	<tr valign="top">
	    	<td >
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
                						<div  class="text_title"><span class="text_blue2">���ɸ�ʽ��ѯ</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0"  class="table_head">
	          					<tr>
	          						<td colspan="4">&nbsp;</td>
	          					</tr>
                				<tr>
				                	<td class="text_tablehead_b">���ı�ʶ��</td>
				                  	<td >
				                   		<html:text property="po.msgid" maxlength="35" />
				                  	</td>
				                  	<td class="text_tablehead_b">��������</td>
				                  	<td >
				                   		<html:text property="po.workdate" styleClass="Wdate" onclick="WdatePicker()"/>
				                  	</td>
				                  
				                </tr> 
				                <tr>
				                	<td class="text_tablehead_b">ϵͳ���</td>
				                	<td >
				                   		<select name="po.systemcd" id="systemcd">
				                   			<option value="">��ѡ��</option>
				                   			<option value="HVPS" ${condition.systemcd eq 'HVPS' ? 'selected' : '' }>���ʵʱ֧��ϵͳ</option>
				                   			<option value="BEPS" ${condition.systemcd eq 'BEPS' ? 'selected' : '' }>С������֧��ϵͳ</option>
				                   			<option value="IBPS" ${condition.systemcd eq 'IBPS' ? 'selected' : '' }>����֧����������ϵͳ</option>
				                   		</select>
				                  	</td>
				                  	<td class="text_tablehead_b">������ʶ</td>
				                	<td >
				                   		<select name="po.direction" id="direction">
				                   			<option value="">��ѡ��</option>
				                   			<option value="O" ${condition.direction eq 'O' ? 'selected' : '' }>����</option>
				                   			<option value="I" ${condition.direction eq 'I' ? 'selected' : '' }>����</option>
				                   		</select>
				                  	</td>
				                </tr>
				                <tr>
				                	 <td  class="text_tablehead_b">&nbsp;</td>
				                	  <td  >&nbsp;</td>
				                	   <td  class="text_tablehead_b">&nbsp;</td>
				                	  <td  ><input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> </td>
				                  
				                </tr>
				                <tr>
	          						<td colspan="4">&nbsp;</td>
	          					</tr>
            				</table>
            				<br>
		            		<div align="center">
		              			<table width="95%" class="tbcolor">
					                <tr class="text_listhead">
					                  <td  >���ı�ʶ��</td>
					                   <td  >����������</td>
					                   <td  >���ղ������</td>
					                   <td  >��������</td>
					                   <td  >��̬����</td>
					                   <td  >����״̬</td>
					                   <td  >ϵͳ���</td>
					                   <td  >������ʶ</td>
					       			   <td  >��ϸ</td>
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
					                  <td  class="text_list">${po.msgid }</td>
					                  <td  class="text_list">${po.instgpty }</td>   
					                  <td  class="text_list">${po.instdpty }</td>
					                  <td  class="text_list">${po.workdate }</td>
					                   <td  class="text_list">${po.prodate }</td>
					                  <td  class="text_list">
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
					                   	<c:if test="${po.systemcd eq 'HVPS'}">���ʵʱ֧��ϵͳ</c:if>
					                   	<c:if test="${po.systemcd eq 'BEPS'}">С������֧��ϵͳ</c:if>
					                   	<c:if test="${po.systemcd eq 'IBPS'}">����֧����������ϵͳ</c:if>
					                   </td>
					                    <td  class="text_list">
					                   	<c:if test="${po.direction eq 'O'}">����</c:if>
					                   	<c:if test="${po.direction eq 'I'}">����</c:if>
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
