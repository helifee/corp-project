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
<title>ҵ���˻�Ӧ���ѯ</title>
<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function viewdetails(txid,msgid,id,pmttpbgclsotid){
		var newurl = "<%=path %>/TransProcessAction.do?method=gotoTransDetails&txid="+txid+"&msgid="+msgid+"&id="+id+"&direction=I&pmttpbgclsotid="+pmttpbgclsotid;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post" action="/TransProcessAction.do?method=querySendxml&operway=">
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
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="I"/>
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<div align="center">
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="border:1px #99bbe8 solid; padding:3px;" >
                				<tr>
                					<td colspan="8">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">������</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>-<input type="text" name="po.endid"  maxlength="19" value="${condition.endid }"/>
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
				                   	<td class="text_tablehead_b">ҵ������</td>
				                   	<td  >
				                  		<select name="po.pmttp">
				                  			<option value="">��ѡ��</option>
				                  			<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>�ֽ���</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>ί���տ�(����)</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>��ͨ���ҵ��</option>
				                  			<option value="C102"  ${condition.pmttp eq 'C102' ? 'selected' : '' }>���˴���ͨ��ҵ��</option>
				                  			<option value="D102"  ${condition.pmttp eq 'D102' ? 'selected' : '' }>���˴���ͨ��ҵ��</option>
				                  			<option value="E100"  ${condition.pmttp eq 'E100' ? 'selected' : '' }>��ͨ���ڴ���ҵ��</option>
				                  		</select>
				                  	</td>
				                </tr> 
				                <tr>
				                	<td  class="text_tablehead_b">ǩ������</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>-<input type="text" name="po.enddate" class="Wdate" onclick="WdatePicker()" value="${condition.enddate }"/>
				                  	</td>
				               	 	<td  class="text_tablehead_b">�ͻ���</td>
				                   	<td   colspan="3">
				                  		<input type="text" name="po.proposercstmrid" value="${condition.proposercstmrid }" size="32" maxlength="30"/>
				                  	</td>
				                </tr>
				                <tr>
				                		<td class="text_tablehead_b">�����</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>-<input type="text" name="po.endamount" value="${condition.endamount }"/>
				                  	</td>
				                  	 	<td   class="text_tablehead_b">�������˺�</td>
				                   	<td colspan="3">
				                  		<input type="text" name="po.applicantacct" size="32" maxlength="32" value="${condition.applicantacct }"/>
				                  	</td>
				                  
				                   
				                </tr>
				                <tr>
				                	<td class="text_tablehead_b">&nbsp;</td>
                					<td colspan="6" align="right">
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                				</tr> 
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr>
					                   <td  align="center" class="text_listhead">���ı�ʶ��</td>
					                   <td  align="center" class="text_listhead">ǩ������</td>
					                   <td  align="center" class="text_listhead">ǩ�����к�</td>
					                    <td  align="center" class="text_listhead">�ͻ���</td>
					                  <td  align="center" class="text_listhead">���ı��</td>					                  
					                   <td  align="center" class="text_listhead">ҵ������</td>
					                  <td  align="center" class="text_listhead">���ȼ�</td> 
					                   <td  align="center" class="text_listhead">�˺�</td>
					                   <td  align="center" class="text_listhead">���</td>					                   
					                   <td  align="center" class="text_listhead">״̬</td>
					                   <td  align="center" class="text_listhead">��ϸ</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr onMouseOver="this.bgColor='#99bbe8';" onMouseOut="this.bgColor='FFFFD0'" bgcolor="FFFFD0">		
							                  <td  class="text_list"><div class="gridCell_standard">${po.msgid }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">${po.proposercstmrid }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">���ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">С��ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">С��ʵʱ����</c:if>
								                   <c:if test="${po.msgtpid eq 'beps.125.001.01'}">С��ڴ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">С����ͨ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">С��ʵʱ���</c:if>
								                  
								                  </div>
								               </td>
							                  
							                   <td  class="text_list"><div class="gridCell_standard">
							                  	<c:if test="${po.pmttp eq 'A108'}">�ֽ���</c:if>
												<c:if test="${po.pmttp eq 'A109'}">ί���տ�(����)</c:if>
												<c:if test="${po.pmttp eq 'B100'}">��ͨ���ҵ��</c:if>
												<c:if test="${po.pmttp eq 'C102'}">���˴���ͨ��ҵ��</c:if>
												<c:if test="${po.pmttp eq 'D102'}">���˴���ͨ��ҵ��</c:if>
												<c:if test="${po.pmttp eq 'E100'}">��ͨ���ڴ���ҵ��</c:if>
							                  </div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.sttlmprty eq 'NORM'}">��ͨ</c:if>
								                  <c:if test="${po.sttlmprty eq 'HIGH'}">����</c:if>
								                  <c:if test="${po.sttlmprty eq 'URGT'}">�ؼ�</c:if>
								                  </div>
								               </td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.applicantacct }</div></td>
							                <td  class="text_list"><div class="gridCell_standard">
							                  	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
							                </div></td>

							                  <td  class="text_list"><div class="gridCell_standard">
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
							                 <td  class="text_list"><div align="center"><span class="text_list">
                                               <a href="#"   onClick="viewdetails('${po.txid }','${po.msgid}','${po.id }','${po.pmttpbgclsotid}')"><u>��ϸ</u></a></span></div>
                                               </td>				                  
						                  </tr>
					                  </logic:iterate>                
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
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	  	</tr>  
	</table>
</html:form>
</body>
</html>
