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
<title> ֧��ҵ��������ѯ </title>
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
	function viewdetails(id,pmttpbgclsotid,systemcd,txid){
		var newurl = "<%=path %>/TransProcessAction.do?method=gotoTransDetails&pmtgrpid="+id+"&pmttpbgclsotid="+pmttpbgclsotid+"&systemcd="+systemcd+"&txid="+txid;
		viewDetails(newurl);	
	}
</script>
</head>
<body>
<html:form  method="post" action="/TransProcessAction.do?method=querySendxml&operway=07">
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
                						<div  class="text_title"><span class="text_blue2">֧��ҵ��������ѯ</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">֧���������</td>
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
											<option value="PR81" ${condition.status eq 'PR81' ? 'selected' : ''}>������    </option>
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
				                  			<option value="A100" ${condition.pmttp eq 'A100' ? 'selected' : '' }>��ͨ���</option>
				                  			<option value="A108" ${condition.pmttp eq 'A108' ? 'selected' : '' }>�ֽ���</option>
				                  			<option value="A109" ${condition.pmttp eq 'A109' ? 'selected' : '' }>ί���տ�(����)</option>
				                  			<option value="A110" ${condition.pmttp eq 'A110' ? 'selected' : '' }>���ճи�(����)</option>
				                  			<option value="A200" ${condition.pmttp eq 'A200' ? 'selected' : '' }>�м��ʽ�㻮</option>
				                  			<option value="A202" ${condition.pmttp eq 'A202' ? 'selected' : '' }>���л�Ʊ</option>
				                  			<option value="A113" ${condition.pmttp eq 'A113' ? 'selected' : '' }>�羳֧��</option>
				                  			<option value="A101" ${condition.pmttp eq 'A101' ? 'selected' : '' }>�������ʽ�㻮</option>
				                  			<option value="A102" ${condition.pmttp eq 'A102' ? 'selected' : '' }>������</option>
				                  			<option value="A104" ${condition.pmttp eq 'A104' ? 'selected' : '' }>�����ʽ���ǻ���</option>
				                  			<option value="B104" ${condition.pmttp eq 'B104' ? 'selected' : '' }>�����ʽ��ǻ���</option>
				                  			<option value="A106" ${condition.pmttp eq 'A106' ? 'selected' : '' }>֧ȡ�����ʽ�</option>
				                  			<option value="A307" ${condition.pmttp eq 'A307' ? 'selected' : '' }>�����ʽ��ծ�Ҹ����ǻ���</option>
				                  			<option value="B307" ${condition.pmttp eq 'B307' ? 'selected' : '' }>�����ʽ��ծ�Ҹ���ǻ���</option>
				                  			<option value="A301" ${condition.pmttp eq 'A301' ? 'selected' : '' }>�ɷ�ҵ��</option>
				                  			<option value="A201" ${condition.pmttp eq 'A201' ? 'selected' : '' }>֧Ʊ</option>
				                  			<option value="B100" ${condition.pmttp eq 'B100' ? 'selected' : '' }>��ͨ���</option>
				                  			<option value="B308" ${condition.pmttp eq 'B308' ? 'selected' : '' }>֧Ʊ����</option>
				                  			<option value="B309" ${condition.pmttp eq 'B309' ? 'selected' : '' }>ͨ��Ʊ�ݽ���</option>
				                  			<option value="C102" ${condition.pmttp eq 'C102' ? 'selected' : '' }>���˴���ͨ��</option>
				                  			<option value="D102" ${condition.pmttp eq 'D102' ? 'selected' : '' }>���˴���ͨ��</option>
				                  			<option value="E100" ${condition.pmttp eq 'E100' ? 'selected' : '' }>���ڴ���</option>
				                  			<option value="F100" ${condition.pmttp eq 'F100' ? 'selected' : '' }>���ڽ��</option>
				                  			<option value="A309" ${condition.pmttp eq 'A309' ? 'selected' : '' }>CISͨ��Ʊ��ҵ���ִ</option>
				                  			<option value="A308" ${condition.pmttp eq 'A308' ? 'selected' : '' }>CIS֧Ʊҵ���ִ</option>
				                  			<%-- 
				                  			<option value="A112" ${condition.pmttp eq 'A112' ? 'selected' : '' }>�������</option>
				                  			--%>
				                  		</select>
				                  	</td>
				                  	<td>&nbsp;</td>
				                </tr> 
				                <tr>
				                	<td class="text_tablehead_b">�����(��Χ)</td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>-<input type="text" name="po.endamount" value="${condition.endamount }"/>
				                  	</td>
				                  	<td class="text_tablehead_b">ϵͳ����</td>
				                   	<td  >
				                  		<html:select property="po.systemcd" value="${condition.systemcd }">
				                  			<html:option value="">��ѡ��</html:option>
				                  			<html:option value="HVPS" >���ʵʱ֧��ϵͳ</html:option>
				                  			<html:option value="BEPS" >С������֧��ϵͳ</html:option>
				                  			
				                  		</html:select>
				                  	</td>
				                </tr>
				                <tr>
				                <%-- 
				               	 	<td  class="text_tablehead_b">�ͻ���</td>
				                   	<td colspan="2">
				                  		<input type="text" name="po.proposercstmrid" value="${condition.proposercstmrid }" size="32" maxlength="30"/>
				                  	</td>
				                  	--%>
				                  	<td   class="text_tablehead_b">�������˺�</td>
				                   	<td colspan="2">
				                  		<input type="text" name="po.applicantacct" size="32" maxlength="32" value="${condition.applicantacct }"/>
				                  	</td>
				                  	<td   class="text_tablehead_b">�������</td>
				                   	<td >
				                  		<input type="text" name="po.txid" size="32" maxlength="32" value="${condition.txid }"/>
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
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					                <tr  class="text_listhead">
					                   <td>֧���������</td>
					                   <td>�������</td>
					                   <td>ǩ������</td>
					                   <td >ǩ�����к�</td>
					                  
					                  <td >���ı��</td>					                  
					                   <td >ҵ������</td>
					                  
					                   <td   >�������˺�</td>
					                   <td   >�����</td>					                   
					                   <td   >ҵ��״̬</td>
					                   <td   >��������</td>
					                   <td   >��ϸ</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td><div >${po.pmtgrpid }</div></td>
							                  <td><div >${po.txid }</div></td>
							                  <td><div >${po.workdt }</div></td>
							                  <td><div >${po.instgpty }</div></td>
							                  <td>
							                  	<div >
								                   <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">���ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'hvps.112.001.01'}">��������ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">С��ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.122.001.01'}">С�������ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">��ͨ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">ʵʱ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">ʵʱ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.125.001.01'}">���ڴ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.133.001.01'}">���ڽ��</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.130.001.01'}">CISͨ�û�ִҵ����</c:if>
								                  	
								                </div>
								               </td>
							                   <td><div >
							                     <c:if test="${po.pmttp eq 'A100'}">��ͨ���</c:if>
							                  	 <c:if test="${po.pmttp eq 'A108'}">�ֽ���</c:if>
								                  <c:if test="${po.pmttp eq 'A109'}">ί���տ�(����)</c:if>
								                  <c:if test="${po.pmttp eq 'A110'}">���ճи�(����)</c:if>
								                   <c:if test="${po.pmttp eq 'A200'}">�м��ʽ�㻮</c:if>
								                   <c:if test="${po.pmttp eq 'A202'}">���л�Ʊ</c:if>
								                  <c:if test="${po.pmttp eq 'A112'}">�������</c:if>
								                  <c:if test="${po.pmttp eq 'A101'}">�������ʽ�㻮)</c:if>
								                  <c:if test="${po.pmttp eq 'A102'}">������</c:if>
								                  <c:if test="${po.pmttp eq 'A104'}">�����ʽ���ǻ���</c:if>
								                   <c:if test="${po.pmttp eq 'A106'}">֧ȡ�����ʽ�</c:if>
								                  <c:if test="${po.pmttp eq 'A301'}">�ɷ�ҵ��</c:if>
								                  <c:if test="${po.pmttp eq 'A201'}">֧Ʊ</c:if>
								                   <c:if test="${po.pmttp eq 'B100'}">��ͨ���</c:if>
								                   <c:if test="${po.pmttp eq 'B104'}">�����ʽ��ǻ���</c:if>
								                   <c:if test="${po.pmttp eq 'B307'}">�����ʽ��ծ�Ҹ���ǻ���</c:if>
								                    <c:if test="${po.pmttp eq 'A307'}">�����ʽ��ծ�Ҹ����ǻ���</c:if>
								                   
								                     <c:if test="${po.pmttp eq 'C102'}">���˴���ͨ��</c:if>
								                      <c:if test="${po.pmttp eq 'D102'}">���˴���ͨ��</c:if>
								                      <c:if test="${po.pmttp eq 'D200'}">ʵʱ����</c:if>
								                     <c:if test="${po.pmttp eq 'C101'}">ʵʱ����</c:if>
								                     <c:if test="${po.pmttp eq 'C210'}">н�𱨳�</c:if>
								                    <c:if test="${po.pmttp eq 'C100'}">ʵʱ����</c:if>
								                    <c:if test="${po.pmttp eq 'D100'}">ʵʱ���</c:if>
								                    <c:if test="${po.pmttp eq 'D203'}">ʵʱͨ��Ʊ�ݽ���</c:if>
								                     <c:if test="${po.pmttp eq 'E100'}">���ڴ���</c:if>
								                   <c:if test="${po.pmttp eq 'F100'}">���ڽ��</c:if>
								                   <c:if test="${po.pmttp eq 'B308'}">֧Ʊ����</c:if>
								                    <c:if test="${po.pmttp eq 'B309'}">ͨ��Ʊ�ݽ���</c:if>
								                     <c:if test="${po.pmttp eq 'A309'}">CISͨ��Ʊ��ҵ���ִ</c:if>
								                    <c:if test="${po.pmttp eq 'A308'}">CIS֧Ʊҵ���ִ	</c:if>
							                  </div>
							                  </td>
							                 
							                  <td><div >
							                  
							                   ${po.applicantacct eq ''? po.dbtracct : po.applicantacct}
							                  
							                  </div></td>
							                  <td><div align="right">
							                  	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount }"/>
							                </div></td>

							                <td>
							                  <div >
							                  	   <c:if test="${po.status eq 'PR04' }">������</c:if>
													<c:if test="${po.status eq 'PR09' }">�Ѿܾ�</c:if>
													<c:if test="${po.status eq 'PR08' }">�ѳ���</c:if>
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
												</div>
							                </td>
											<td>
												<div>
												 ${po.orgCode}
												 </div>
											</td>
							                 <td><div ><span >
                                               <a href="#"   onClick="viewdetails('${po.pmtgrpid}','${po.pmttpbgclsotid}','${po.systemcd}','${po.txid }')"><u>��ϸ</u></a></span></div>
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
