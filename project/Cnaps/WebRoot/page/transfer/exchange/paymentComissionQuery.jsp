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
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />	
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
<html:form  method="post" action="/TransProcessAction.do?method=querySendxml&direction=I&operway=08">
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
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="I"/>
	      			<input type="hidden" name="po.pmttp" size="32" maxlength="32" value="A109"/>
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	          			<td width="6">&nbsp;</td>
	          			</tr>
	          			<tr>
	          			<td >&nbsp;</td>
	          			<td>
	          			<div align="center">
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6"><div  class="text_title"><span class="text_blue2">�յ�ί���տ��ѯ</span></div></td>
                				</tr>
                				</table>
	          					<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;</td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">֧���������</td>
				                  	<td  colspan="3">
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>-<input type="text" name="po.endid"  maxlength="19" value="${condition.endid }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">����״̬</td>
				                  	<td colspan="3" > 
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
											<option value="PR94" ${condition.status eq 'PR94' ? 'selected' : ''}>������    </option>
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
				                	<td  class="text_tablehead_b">ǩ������</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>-<input type="text" name="po.enddate" class="Wdate" onclick="WdatePicker()" value="${condition.enddate }"/>
				                  	</td>
				                  	
				               	 	
				                </tr>
				                <tr>
				                		<td class="text_tablehead_b">�����</td>
				                  	<td colspan="3">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>-<input type="text" name="po.endamount" value="${condition.endamount }"/>
				                  	</td>
				                  	<td class="text_tablehead_b">&nbsp;</td>
                					<td colspan="3" align="left">
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td>
				                  	 
				                  	</tr>
				                
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="tbcolor">
					                <tr>
					                   <!-- 
					                   <td  align="center" class="text_listhead">���ı�ʶ��</td>
					                    -->
					                    <td  align="center" class="text_listhead">֧���������</td>
					                   <td  align="center" class="text_listhead">ǩ������</td>
					                   <td  align="center" class="text_listhead">ǩ�����к�</td>
					                   <!-- 
					                    <td  align="center" class="text_listhead">�ͻ���</td> 
					                  <td  align="center" class="text_listhead">���ı��</td>	
					                   -->				                  
					                   <td  align="center" class="text_listhead">ҵ������</td>
					                  <!-- <td  align="center" class="text_listhead">���ȼ�</td>  -->
					                   <td  align="center" class="text_listhead">�˺�</td>
					                   <td  align="center" class="text_listhead">���</td>					                   
					                   <td  align="center" class="text_listhead">״̬</td>
					                   <td  align="center" class="text_listhead">��ϸ</td>
					       				 
					                </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <!-- <td  class="text_list"><div class="gridCell_standard">${po.msgid }</div></td> -->
							                  <td  class="text_list"><div class="gridCell_standard">${po.txid}</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.workdt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.instgpty }</div></td>
							                   <!-- <td  class="text_list"><div class="gridCell_standard">${po.proposercstmrid }</div></td>
							                   <td  class="text_list"><div class="gridCell_standard">
								                  <c:if test="${po.msgtpid eq 'hvps.111.001.01'}">���ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.121.001.01'}">С��ͻ���ͨ����</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.123.001.01'}">С��ʵʱ����</c:if>
								                   <c:if test="${po.msgtpid eq 'beps.125.001.01'}">С��ڴ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.127.001.01'}">С����ͨ���</c:if>
								                  <c:if test="${po.msgtpid eq 'beps.131.001.01'}">С��ʵʱ���</c:if>
								                  
								                  </div>
								               </td>
								                -->
							                  
							                   <td  class="text_list"><div class="gridCell_standard"> 
							                  	<c:if test="${po.pmttp eq 'A100'}">��ͨ���	</c:if>
												<c:if test="${po.pmttp eq 'A108'}">�ֽ���	</c:if>
												<c:if test="${po.pmttp eq 'A109'}">ί���տ���أ�	</c:if>
												<c:if test="${po.pmttp eq 'A110'}">���ճи������أ�	</c:if>
												<c:if test="${po.pmttp eq 'A201'}">֧Ʊ	</c:if>
												<c:if test="${po.pmttp eq 'A202'}">���л�Ʊ	</c:if>
												<c:if test="${po.pmttp eq 'A111'}">��ҵ��Ʊ	</c:if>
												<c:if test="${po.pmttp eq 'A112'}">�������	</c:if>
												<c:if test="${po.pmttp eq 'A113'}">�羳֧��	</c:if>
												<c:if test="${po.pmttp eq 'A101'}">�������ʽ�㻮	</c:if>
												<c:if test="${po.pmttp eq 'A114'}">���п�����Ʊ�ݽ��������	</c:if>
												<c:if test="${po.pmttp eq 'A102'}">������	</c:if>
												<c:if test="${po.pmttp eq 'A307'}">�����ʽ��ծ�Ҹ����ǻ���	</c:if>
												<c:if test="${po.pmttp eq 'A105'}">�˻�	</c:if>
												<c:if test="${po.pmttp eq 'A103'}">����ͬ�ǽ�����������	</c:if>
												<c:if test="${po.pmttp eq 'A104'}">�����ʽ���ǻ���	</c:if>
												<c:if test="${po.pmttp eq 'A106'}">֧ȡ���л���	</c:if>
												<c:if test="${po.pmttp eq 'A115'}">�ٴ���	</c:if>
												<c:if test="${po.pmttp eq 'A116'}">������	</c:if>
												<c:if test="${po.pmttp eq 'A117'}">Ʊ��ת����	</c:if>
												<c:if test="${po.pmttp eq 'A200'}">�м��ʽ�㻮	</c:if>
												<c:if test="${po.pmttp eq 'G101'}">�����г����׽���	</c:if>
												<c:if test="${po.pmttp eq 'G102'}">ծȯ�г����׽���	</c:if>
												<c:if test="${po.pmttp eq 'G103'}">ծȯ���С��Ҹ������滮��	</c:if>
												<c:if test="${po.pmttp eq 'G104'}">���п������	</c:if>
												<c:if test="${po.pmttp eq 'G105'}">������ҵ��Ʊ�ʽ�����	</c:if>
												<c:if test="${po.pmttp eq 'G106'}">��㽻���г�����	</c:if>
												<c:if test="${po.pmttp eq 'G107'}">�ʽ�ؽ���	</c:if>
												<c:if test="${po.pmttp eq 'G108'}">�����Զ����	</c:if>
												<c:if test="${po.pmttp eq 'G109'}">��Ѻ����	</c:if>
												<c:if test="${po.pmttp eq 'H010'}">��㽻�������	</c:if>
												<c:if test="${po.pmttp eq 'H011'}">֤ȯ���������	</c:if>
												<c:if test="${po.pmttp eq 'H012'}">����ϵͳ�����	</c:if>
												               
												<c:if test="${po.pmttp eq 'A102'}"> ������	                       </c:if>                 
												<c:if test="${po.pmttp eq 'A307'}"> �����ʽ��ծ�Ҹ����ǻ���	       </c:if>                 
												<c:if test="${po.pmttp eq 'A301'}"> �ɷ�	                           </c:if>                 
												<c:if test="${po.pmttp eq 'A400'}"> ��������ͨ����ҵ��	           </c:if>                 
												<c:if test="${po.pmttp eq 'C100'}"> ��ͨʵʱ����ҵ��	               </c:if>                 
												<c:if test="${po.pmttp eq 'C101'}"> ʵʱ����	                       </c:if>                 
												<c:if test="${po.pmttp eq 'C102'}"> ���˴���ͨ��ҵ��	               </c:if>                 
												<c:if test="${po.pmttp eq 'C210'}"> н�𱨳�	                       </c:if>                 
												<c:if test="${po.pmttp eq 'E100'}"> ��ͨ���ڴ���ҵ��     	           </c:if>                 
												<c:if test="${po.pmttp eq 'E101'}"> ���ڴ���     	                   </c:if>                 
												<c:if test="${po.pmttp eq 'B100'}"> ��ͨ���ҵ��	                   </c:if>                 
												<c:if test="${po.pmttp eq 'B104'}"> �����ʽ��ǻ���ҵ��	           </c:if>                 
												<c:if test="${po.pmttp eq 'B309'}"> С��֧��ϵͳͨ��Ʊ�ݽ���ҵ��	   </c:if>                 
												<c:if test="${po.pmttp eq 'B308'}"> С��֧��ϵͳ֧Ʊ����ҵ��	       </c:if>                 
												<c:if test="${po.pmttp eq 'D102'}"> ���˴���ͨ��	                   </c:if>                 
												<c:if test="${po.pmttp eq 'D100'}"> ��ͨʵʱ���ҵ��	               </c:if>                 
												<c:if test="${po.pmttp eq 'D200'}"> ʵʱ����	                       </c:if>                 
												<c:if test="${po.pmttp eq 'D203'}"> ʵʱͨ��Ʊ�ݽ���ҵ��	           </c:if>                 
												<c:if test="${po.pmttp eq 'F100'}"> ��ͨ���ڽ��	                   </c:if>                 
												<c:if test="${po.pmttp eq 'E102'}"> ���ڴ���     	                   </c:if>                 
												<c:if test="${po.pmttp eq 'A308'}"> CIS֧Ʊҵ���ִ	                 </c:if>                 
												<c:if test="${po.pmttp eq 'A309'}"> CISͨ��Ʊ��ҵ���ִ	             </c:if>                   
												
							                  </div></td>
							                   <!--  <td  class="text_list"><div class="gridCell_standard"> 
								                  <c:if test="${po.sttlmprty eq 'NORM'}">��ͨ</c:if>
								                  <c:if test="${po.sttlmprty eq 'HIGH'}">����</c:if>
								                  <c:if test="${po.sttlmprty eq 'URGT'}">�ؼ�</c:if>
								                  </div>
								               </td>-->
							                  <td  class="text_list"><div class="gridCell_standard"> ${ po.applicantacct eq ''? po.dbtracct : po.applicantacct}</div></td>
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
													<c:if test="${po.status eq 'PR90' }">�� ��     </c:if>
													<c:if test="${po.status eq 'PR91' }">������    </c:if>
													<c:if test="${po.status eq 'PR92' }">�����    </c:if>
													<c:if test="${po.status eq 'PR93' }">������    </c:if>
													<c:if test="${po.status eq 'PR94' }">������    </c:if>
												 
													<c:if test="${po.status eq 'PR95' }">�����    </c:if>
													<c:if test="${po.status eq 'PR96' }">������    </c:if>
													<c:if test="${po.status eq 'PR97' }">�ѷ���    </c:if>
													<c:if test="${po.status eq 'PR11' }">�������Ŷ�</c:if> 
													<c:if test="${po.status eq 'PR12' }">�������Ŷ�</c:if> 
													<c:if test="${po.status eq 'PR99' }">�� ��</c:if>
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
	    	<td></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
