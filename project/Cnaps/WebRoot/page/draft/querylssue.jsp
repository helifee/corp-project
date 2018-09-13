<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> ���л�Ʊǩ���Ǽǲ���ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewdetails(id){
		var newurl = "<%=path %>//applyCapitalAction.do?method=queryDetailById&detailid="+id;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post" action="/applyCapitalAction.do?method=querylssueList">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
			</td>
			<td width="8" ></td>
		</tr>
	  	<tr valign="top">
	    	<td >
	    	<td >
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="O"/>
	      		<table width="100%" border="0" cellspacing="0" cellpadding="O">
	      			<tr>
                		<td colspan="6">&nbsp;</td>
                	</tr>
	        		<tr>
	          			<td >&nbsp;</td>
	          			<td>
	          			<div  align="center">
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">���л�Ʊǩ���Ǽǲ���ѯ</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
                				<td  class="text_tablehead_b">��������</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.workdtstart" class="Wdate" onclick="WdatePicker()" value="${condition.workdtstart }"/>-<input type="text" name="po.workdtend" class="Wdate" onclick="WdatePicker()" value="${condition.workdtend }"/>
				                  	</td>
				                  	<td class="text_tablehead_b" >
																	��Ʊ����
																</td>
																<td >
																<select  name="po.billtp" id="po.status" style="width:180px;" title="��Ʊ����">
																<option value="CT00"  selected="selected">��ת�û�Ʊ</option>
																<option value="CT01"  selected="selected">����ת�û�Ʊ</option>
																<option value="CT02"  selected="selected">�ֽ��Ʊ</option>
																</select>
																</td>
                				</tr>
                				<tr>
				                  	<td  class="text_tablehead_b">��Ʊ����</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.issuedtstart" class="Wdate" onclick="WdatePicker()" value="${condition.issuedtstart }"/>-<input type="text" name="po.issuedtend" class="Wdate" onclick="WdatePicker()" value="${condition.issuedtend }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">ҵ��״̬</td>
				                  	<td  > 
				                   		<select name="po.status">
				                   			<option value="">��ѡ��</option>
				                  			<option value="PR04" ${condition.status eq 'PR04' ? 'selected' : '' }>������</option>
				                  			<option value="PR09" ${condition.status eq 'PR09' ? 'selected' : '' }>�Ѿܾ�</option>
				                  			<option value="PR08" ${condition.status eq 'PR08' ? 'selected' : '' }>�ѳ���</option>
				                  			<option value="PR09" ${condition.status eq 'PR09' ? 'selected' : '' }>�Ѿܾ�</option>
				                  			<option value="PR21" ${condition.status eq 'PR21' ? 'selected' : '' }>��ֹ��</option>
				                  			<option value="PR22" ${condition.status eq 'PR22' ? 'selected' : '' }>�ѳ���</option>
				                  			<option value="PR32" ${condition.status eq 'PR32' ? 'selected' : '' }>�ѳ���</option>
				                  			<option value="PR05" ${condition.status eq 'PR05' ? 'selected' : '' }>�ѳɹ�</option>
				                  			<option value="PR98" ${condition.status eq 'PR98' ? 'selected' : ''}>��ȷ��    </option>
											<option value="PR90" ${condition.status eq 'PR90' ? 'selected' : ''}>�½�      </option>
											<option value="PR91" ${condition.status eq 'PR91' ? 'selected' : ''}>������    </option>
											<option value="PR92" ${condition.status eq 'PR92' ? 'selected' : ''}>�����    </option>
											<option value="PR93" ${condition.status eq 'PR93' ? 'selected' : ''}>������    </option>
											<option value="PR95" ${condition.status eq 'PR95' ? 'selected' : ''}>�����    </option>
											<option value="PR96" ${condition.status eq 'PR96' ? 'selected' : ''}>������    </option>
											<option value="PR97" ${condition.status eq 'PR97' ? 'selected' : ''}>�ѷ���    </option>
											<option value="PR11" ${condition.status eq 'PR11' ? 'selected' : ''}>�������Ŷ�</option> 
											<option value="PR12" ${condition.status eq 'PR12' ? 'selected' : ''}>�������Ŷ�</option> 
											<option value="PR99" ${condition.status eq 'PR99' ? 'selected' : ''}>����</option>
											<option value="PR03" ${condition.status eq 'PR03' ? 'selected' : ''}>������</option> 
											<option value="PR89" ${condition.status eq 'PR89' ? 'selected' : ''}>����ִ </option>
											<option value="PR88" ${condition.status eq 'PR88' ? 'selected' : ''}>�ѻ�ִ</option>
				                  		</select>
				                  	</td>
                				</tr>
                				<tr>
                				<td class="text_tablehead_b">��Ʊ���</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.issueamtstart" value="${condition.issueamtstart }"/>-<input type="text" name="po.issueamtend" value="${condition.issueamtend }"/>
				                  	</td>
				                  	<td class="text_tablehead_b"  >&nbsp;</td>
                					<td>
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td>
                				</tr>
				                <tr>
				                	
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					                <tr  class="text_listhead">
					                   <td  >��Ʊ����</td>
					                   <td   >��Ʊ��Ѻ</td>
					                   <td   >��Ʊ����</td>
					                   <td   >��Ʊ����</td>
					                  <td   >��Ʊ���</td>					                  
					                   <td   >��Ʊ�������˺�</td>
					                  <td   >��Ʊ�տ�������</td> 
					                   <td   >����Ʊ���˺�</td>
					                   <td   >����Ʊ������</td>					                   
					                   <td   >״̬</td>
					                   <td   >��ϸ</td>
					       				 
					                </tr>  
					                <logic:present name="querylssueList">
									  <logic:iterate id="po" name="querylssueList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  ><div >${po.notesno }</div></td>
							                  <td  ><div >${po.billseal }</div></td>
							                  <td  ><div >${po.issuedt }</div></td>
							                  <td  ><div >
							                  <c:if test="${po.billtp eq 'CT00' }">��ת�û�Ʊ</c:if>
							                  <c:if test="${po.billtp eq 'CT01' }">����ת�û�Ʊ</c:if>
							                  <c:if test="${po.billtp eq 'CT02' }">�ֽ��Ʊ</c:if>
							                  </div></td>
							                   <td  ><div >${po.issueamt }</div></td>
							                  <td  ><div >${po.issueracct }</div></td>
							                   <td  ><div >${po.rcvrnm }</div></td>
							                    <td  ><div >${po.holderacct }</div></td>
												<td  ><div >${po.holdernm }</div></td>
                                               <td  ><div >
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
													<c:if test="${po.status eq 'PR81' }">������</c:if>
                                               </div></td>
							                 <td  ><div ><span >
                                               <a href="#"   onClick="viewdetails('${po.id}')"><u> ��&nbsp;ϸ </u></a>
                                               </span></div>
                                               </td>				                  
						                  </tr>
					                  </logic:iterate> 
					                   <logic:empty name="querylssueList">
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
	    	<td ></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
