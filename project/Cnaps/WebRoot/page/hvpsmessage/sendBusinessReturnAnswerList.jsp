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
<title> ҵ���˻�Ӧ���ѯ </title>
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
		var newurl = "<%=path %>/businessReturnAnswerAction.do?method=viewDetails&business="+business+"&detailid=" 
			+ indentifier;
		viewDetails(newurl);
	}
</script>
</head>
<body>
<html:form  method="post" action="/businessReturnAnswerAction.do?method=querysendMsg">
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
                						<div  class="text_title"><span class="text_blue2">ҵ���˻�Ӧ���ѯ</span></div>
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
				                   		<html:text property="msgID" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	</td>
				                  	<td class="text_tablehead_b">��������</td>
				                  	<td >
				                   		<html:text property="workDt" styleClass="Wdate" onclick="WdatePicker()"/>
				                  	</td>
				                  
				                </tr> 
				                <tr>
				                	<td class="text_tablehead_b">���ղ������</td>
				                  	<td >
				                   		<html:text property="instdPty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	</td>
				                  	<td class="text_tablehead_b">ҵ��״̬</td>
				                  	<td ><select name="status">
				                   			<option value="">��ѡ��</option>
				                  			<option value="PR04" ${status eq 'PR04' ? 'selected' : '' }>������</option>
											<option value="PR09" ${status eq 'PR09' ? 'selected' : '' }>�Ѿܾ�</option>
											<option value="PR08" ${status eq 'PR08' ? 'selected' : '' }>�ѳ���</option>
											<option value="PR09" ${status eq 'PR09' ? 'selected' : '' }>�Ѿܾ�</option>
											<option value="PR21" ${status eq 'PR21' ? 'selected' : '' }>��ֹ��</option>
											<option value="PR22" ${status eq 'PR22' ? 'selected' : '' }>�ѳ���</option>
											<option value="PR32" ${status eq 'PR32' ? 'selected' : '' }>�ѳ���</option>
											<option value="PR05" ${status eq 'PR05' ? 'selected' : '' }>�ѳɹ�</option>
											<option value="PR98" ${status eq 'PR98' ? 'selected' : ''}>��ȷ��    </option>
											<option value="PR90" ${status eq 'PR90' ? 'selected' : ''}>�½�      </option>
											<option value="PR91" ${status eq 'PR91' ? 'selected' : ''}>������    </option>
											<option value="PR92" ${status eq 'PR92' ? 'selected' : ''}>�����    </option>
											<option value="PR93" ${status eq 'PR93' ? 'selected' : ''}>������    </option>
											<option value="PR95" ${status eq 'PR95' ? 'selected' : ''}>�����    </option>
											<option value="PR96" ${status eq 'PR96' ? 'selected' : ''}>������    </option>
											<option value="PR97" ${status eq 'PR97' ? 'selected' : ''}>�ѷ���    </option>
											<option value="PR11" ${status eq 'PR11' ? 'selected' : ''}>�������Ŷ�</option> 
											<option value="PR12" ${status eq 'PR12' ? 'selected' : ''}>�������Ŷ�</option> 
											<option value="PR99" ${status eq 'PR99' ? 'selected' : ''}>����</option>
											<option value="PR03" ${status eq 'PR03' ? 'selected' : ''}>������</option> 
											<option value="PR89" ${status eq 'PR89' ? 'selected' : ''}>����ִ </option>
											<option value="PR88" ${status eq 'PR88' ? 'selected' : ''}>�ѻ�ִ</option>
				                  		</select>
				                  	</td>
				                  
				                </tr> 
				                <tr>
				                	 <td class="text_tablehead_b">�˻�����</td>
				                  	<td >
				                   		<select name="status">
				                   			<option value="">��ѡ��</option>
				                  			<option value="SP00" ${backTpCd eq 'SP00' ? 'selected' : '' }>����ֹ��</option>
											<option value="SP01" ${backTpCd eq 'SP01' ? 'selected' : '' }>����ֹ��</option>
				                  		</select>
				                  	</td>
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
					                   <td  >��������</td>
					                   <td  >���ղ������</td>
					                   <td  >����ֱ�Ӳ������</td>
					                   <td  >ҵ��״̬</td>
					                   <td  >�˻�����</td>
					       			   <td  >��ϸ</td>
					                </tr> 
					                
					                 <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
									  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
					                  <td  class="text_list">${po.msgID}</td>
					                  <td  class="text_list">${po.workDt}</td>   
					                  <td  class="text_list">${po.instdPty}</td>
					                  <td  class="text_list">${po.instdDrctPty}</td>
					                   <td  class="text_list">
										<c:if test="${po.status eq 'PR04' }">������</c:if>
										<c:if test="${po.status eq 'PR09' }">�Ѿܾ�</c:if>
										<c:if test="${po.status eq 'PR08' }">�ѳ���</c:if>
										<c:if test="${po.status eq 'PR09' }">�Ѿܾ�</c:if>
										<c:if test="${po.status eq 'PR21' }">��ֹ��</c:if>
										<c:if test="${po.status eq 'PR22' }">�ѳ���</c:if>
										<c:if test="${po.status eq 'PR32' }">�ѳ���</c:if>
										<c:if test="${po.status eq 'PR05' }">�ѳɹ�</c:if>
										<c:if test="${po.status eq 'PR98' }">��ȷ��    </c:if>
										<c:if test="${po.status eq 'PR90' }">�½�      </c:if>
										<c:if test="${po.status eq 'PR91' }">������    </c:if>
										<c:if test="${po.status eq 'PR92' }">�����    </c:if>
										<c:if test="${po.status eq 'PR93' }">������    </c:if>
										<c:if test="${po.status eq 'PR95' }">�����    </c:if>
										<c:if test="${po.status eq 'PR96' }">������    </c:if>
										<c:if test="${po.status eq 'PR97' }">�ѷ���    </c:if>
										<c:if test="${po.status eq 'PR11' }">�������Ŷ�</c:if> 
										<c:if test="${po.status eq 'PR12' }">�������Ŷ�</c:if> 
										<c:if test="${po.status eq 'PR99' }">����</c:if>
										<c:if test="${po.status eq 'PR03' }">������</c:if> 
										<c:if test="${po.status eq 'PR89' }">����ִ </c:if>
										<c:if test="${po.status eq 'PR88' }">�ѻ�ִ</c:if>
										</td>
					                  <td  class="text_list">
					                  <c:if test="${po.backTpCd eq 'SP00' }">����ֹ��</c:if>
					                  <c:if test="${po.backTpCd eq 'SP01' }">����֧��</c:if>
					                  </td>
					                  <td class="text_list"><a href="#" onclick="viewbykey('${po.msgID}','${business}')">��ϸ</a></td>
					                  </tr>               
					                  </logic:iterate>
					                </logic:present>
					                <logic:notPresent name="queryList">
					                <tr>
					                		<td colspan="9" align="center"><font color="red">û�з��������ļ�¼!</font></td>
					                	</tr>
					                </logic:notPresent>                 
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
