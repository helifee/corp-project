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
	function viewbykey(indentifier,orgCode){
		var newurl = "<%=path %>/businessReturnAction.do?method=viewSendBusReturnDet&detailid=" 
			+ indentifier;
		viewDetails(newurl);
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
                						<div  class="text_title"><span class="text_blue2">ҵ���˻������ѯ</span></div>
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
				                   		<html:text property="msgID" maxlength="35" />
				                  	</td>
				                  	<td class="text_tablehead_b">��������</td>
				                  	<td >
				                   		<html:text property="workDt" styleClass="Wdate" onclick="WdatePicker()" readonly="readonly"/>
				                  	</td>
				                  <td class="text_tablehead_b">���ղ������</td>
				                  	<td >
				                   		<html:text property="instdPty" maxlength="14" />
				                  	</td>
				                </tr> 
				                <tr>
				                	
				                  	<td class="text_tablehead_b">ҵ��״̬</td>
				                  	<td >
				                   		
				                   		<html:select property="status">
				                   			<html:option value="">��ѡ��</html:option>
				                   			<html:option value="PR97">�ѷ���</html:option>
				                   			<html:option value="PR89">����ִ</html:option>
				                   			<html:option value="PR88">�ѻ�ִ</html:option>
				                   		</html:select>
				                  	</td>
				                  <td class="text_tablehead_b">�˻�����</td>
				                  	<td >
				                   		<html:select property="backTpCd">
				                   			<html:option value="">��ѡ��</html:option>
				                   			<html:option value="RP00">�����˻�</html:option>
				                   			<html:option value="RP01">�����˻�</html:option>
				                   		</html:select>
				                  	</td>
				                  	<td class="text_tablehead_b">������ʶ</td>
				                  	<td >
				                   		<html:select property="direction">
				                   			<html:option value="">��ѡ��</html:option>
				                   			<html:option value="O">����</html:option>
				                   			<html:option value="I">����</html:option>
				                   		</html:select>
				                  	</td>
				                </tr> 
				                <tr>
				                	 <td class="text_tablehead_b">&nbsp;</td>
				                  	<td >
				                   		&nbsp;
				                  	</td>
				                  	 <td class="text_tablehead_b">&nbsp;</td>
				                  	<td >
				                   		&nbsp;
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
					                   <td>ԭ���ı�ʶ��</td>
					                    <td>ԭ�������ʹ���</td>
					                    <td>������ʶ</td>
					                    <td>�����������</td>
					                    
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
																	<c:if test="${po.status eq 'PR81' }">������    </c:if>
																	<c:if test="${po.status eq 'PR82' }">�����    </c:if>
																	<c:if test="${po.status eq 'PR83' }">������    </c:if>
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
					                  	<c:if test="${po.backTpCd eq 'RP00'}">�����˻�</c:if>
					                  	<c:if test="${po.backTpCd eq 'RP01'}">�����˻�</c:if>
					                  </td>
					                  
					                   <td  class="text_list">${po.ornglMsgId}</td>
					                    <td  class="text_list">
					                    	 <c:if test="${po.ornglMsgTpCd eq 'hvps.111.001.01'}">���ͻ���ͨ����</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'hvps.112.001.01'}">��������ͨ����</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.121.001.01'}">С��ͻ���ͨ����</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.122.001.01'}">С�������ͨ����</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.127.001.01'}">��ͨ���</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.123.001.01'}">ʵʱ����</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.131.001.01'}">ʵʱ���</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.125.001.01'}">���ڴ���</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.133.001.01'}">���ڽ��</c:if>
								                  <c:if test="${po.ornglMsgTpCd eq 'beps.130.001.01'}">CISͨ�û�ִҵ����</c:if>
					                    </td>
					                    
					                    <td  class="text_list">
					                    	<c:if test="${po.direction eq 'O'}">����</c:if>
					                    	<c:if test="${po.direction eq 'I'}">����</c:if>
					                    </td>
					                   <td  class="text_list">${po.orgCode}</td>
					                  <td class="text_list"><a href="#" onclick="viewbykey('${po.id}')">��ϸ</a></td>
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
