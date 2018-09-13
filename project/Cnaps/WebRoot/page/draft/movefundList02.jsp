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
<title> ���л�Ʊ��ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />	
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewdetails(pmtgrpid){
		var newurl = "<%=path %>/draftManageAction.do?method=sendDetailMessage&pmtgrpid="+pmtgrpid;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post" action="/draftManageAction.do?method=querySendxmldivide&id=02">
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
                						<div  class="text_title"><span class="text_blue2">���л�Ʊ��ѯ</span></div>
                					</td>
                				</tr>
                			</table>
                			<!--  
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">������(��Χ)</td>
				                  	<td  colspan="2">
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>-<input type="text" name="po.endid"   value="${condition.endid }"/>

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
				                  	<td>&nbsp;</td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b">ǩ������</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>-<input type="text" name="po.enddate" class="Wdate" onclick="WdatePicker()" value="${condition.enddate }"/>
				                  	</td>
				                   	<td class="text_tablehead_b">ҵ������</td>
				                   	<td  >
				                  		<select name="po.pmttp">
				                  			<option value="">��ѡ��</option>
				                  			<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>�ֽ���</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>ί���տ�(����)</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>��ͨ���ҵ��</option>
				                  			<option value="C102" ${condition.pmttp eq 'C102' ? 'selected' : '' }>���˴���ͨ��ҵ��</option>
				                  			<option value="D102" ${condition.pmttp eq 'D102' ? 'selected' : '' }>���˴���ͨ��ҵ��</option>
				                  			<option value="E100" ${condition.pmttp eq 'E100' ? 'selected' : '' }>��ͨ���ڴ���ҵ��</option>
				                  		</select>
				                  	</td>
				                  	<td>&nbsp;</td>
				                </tr> 
				                <tr>
				               	 	<td  class="text_tablehead_b">�ͻ���</td>
				                   	<td colspan="2">
				                  		<input type="text" name="po.proposercstmrid" value="${condition.proposercstmrid }" size="32" maxlength="30"/>
				                  	</td>
				                  	<td   class="text_tablehead_b">�������˺�</td>
				                   	<td >
				                  		<input type="text" name="po.applicantacct" size="32" maxlength="32" value="${condition.applicantacct }"/>
				                  	</td>
				                  	<td>&nbsp;</td>
				                </tr>
				                <tr>
				                	<td class="text_tablehead_b">�����(��Χ)</td>
				                  	<td colspan="4">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>-<input type="text" name="po.endamount" value="${condition.endamount }"/>
				                  	</td>
				                  	<td>&nbsp;</td>
				                </tr>
				                <tr>
				                	<td class="text_tablehead_b"  colspan="4">&nbsp;</td>
                					<td>
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>-->
            				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">������</td>
				                  	<td  colspan="2">
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>-<input type="text" name="po.endid"   value="${condition.endid }"/>

				                  	</td>
				                  	<td  class="text_tablehead_b">�ͻ���</td>
				                   	<td colspan="2">
				                  		<input type="text" name="po.proposercstmrid" value="${condition.proposercstmrid }" size="32" maxlength="30"/>
				                  	</td>
				                  	<td>&nbsp;</td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b">ǩ������</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>-<input type="text" name="po.enddate" class="Wdate" onclick="WdatePicker()" value="${condition.enddate }"/>
				                  	</td>
				                   	<td   class="text_tablehead_b">�������˺�</td>
				                   	<td >
				                  		<input type="text" name="po.applicantacct" size="32" maxlength="32" value="${condition.applicantacct }"/>
				                  	</td>
				                  	<td>&nbsp;</td>
				                </tr> 
				                <tr>
				                	<td class="text_tablehead_b">�����</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>-<input type="text" name="po.endamount" value="${condition.endamount }"/>
				                  	</td>
				                  	<td>&nbsp;</td>
				                  	<td>
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td>
				                </tr>
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					                <tr  class="text_listhead">
					                   <td  >֧���������</td>
					                   <td   >ǩ������</td>
					                   <td   >ǩ�����к�</td>
					                   <td   >�ͻ���</td>
					                  <td   >���ı��</td>					                  
					                  
					                  <td   >���ȼ�</td> 
					                   <td   >�˺�</td>
					                   <td   >���</td>					                   
					                   <td   >״̬</td>
					                   <td   >����</td>
					       				
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  ><div >${po.pmtgrpid }</div></td>
							                  <td  ><div >${po.workdt }</div></td>
							                  <td  ><div >${po.instgpty }</div></td>
							                  <td  ><div >${po.proposercstmrid }</div></td>
							                   <td  ><div >${po.msgtpid }</div></td>
							                  	
							                   <td  ><div >&nbsp;
								                  <c:if test="${po.sttlmprty eq 'NORM'}">��ͨ</c:if>
								                  <c:if test="${po.sttlmprty eq 'HIGH'}">����</c:if>
								                  <c:if test="${po.sttlmprty eq 'URGT'}">�ؼ�</c:if>
								                  </div>
								               </td>
							                  <td  ><div >${po.applicantacct }</div></td>
							                  <td  ><div >
							                  	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
							                </div></td>

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
													</div>
							                </td>

							                 <td  ><div ><span >
                                                <a href="#" ><u>�⸶</u></a></span></div>
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
	    	<td ></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
