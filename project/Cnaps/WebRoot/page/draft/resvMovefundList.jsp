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
<title> ���л�Ʊ���ʲ�ѯ </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />	
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" 
type="text/css"	media="screen,projection" />
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">


	function jiefu(){
		
	}

	function viewdetails(pmtgrpid,type,id){
		var newurl = "<%=path %>/draftManageAction.do?method=gotoTransDetails0&id="+id+"&type="+type+"&pmtgrpid="+pmtgrpid;
		viewDetails(newurl);	
	}
	
	function fmoney(s, n)//������ת���ɶ��ŷָ�����ʽ,������λС��s:value,n:С��λ��      
			{   
			    n = n > 0 && n <= 20 ? n : 2;   
			    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
			    var l = s.split(".")[0].split("").reverse(),   
			    r = s.split(".")[1];   
			    t = "";   
			    for(i = 0; i < l.length; i ++ )   
			    {   
			    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
			    }   
			    return t.split("").reverse().join("") + "." + r;   
			} 
</script>
<%
String type2=(String)request.getAttribute("type");
request.setAttribute("type",type2); 
String pmtkdAttr2=(String)request.getAttribute("pmtkdAttr");//ҵ������
request.setAttribute("pmtkdAttr",pmtkdAttr2);
String status2=(String)request.getAttribute("stauts");
request.setAttribute("status",status2);
String direction2=(String)request.getAttribute("direction");
request.setAttribute("direction",direction2); 
System.out.println("type : "+type2+ "pmtkd:"+pmtkdAttr2+" status:"+status2+"  direction :"+direction2+"------------------------------------------------------------");
 %>
</head>
<body>
<html:form  method="post" action="/draftManageAction.do?method=querySendxml">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="8" height="48" ><br></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
					<br></td>
					<td  width="194" ><br></td>
					<td  width="270"  ><br></td>				
					</tr>
				</table>
			<br></td>
			<td width="8" ><br></td>
		</tr>
	  	<tr valign="top">
	    	<td >
	    	<br><td >
	      			<input type="hidden" name="po.direction" size="32" maxlength="32" value="O"/> <!-- ���� -->
	      			<input type="hidden" name="po.status" size="32" maxlength="32" value="PR04"/> <!-- ҵ��״̬ ������ -->
	      			<input type="hidden" name="po.pmttp" size="32" maxlength="32" value="A202"/> <!-- ҵ������ ���л�Ʊ -->
	      			<input type="hidden" name="pmtkdAttr" size="32" maxlength="32" value="${pmtkdAttr}"/> <!-- ҵ������  -->
	      		<table width="100%" border="0" cellspacing="0" cellpadding="O">
	      			<tr>
                		<td colspan="6">&nbsp;<br></td>
                	</tr>
	        		<tr>
	          			<td >&nbsp;<br></td>
	          			<td>
	          			<div  align="center">
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">���л�Ʊ���ʲ�ѯ</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
                					<td colspan="6">&nbsp;<br></td>
                				</tr>
                				<tr>
				                	<td class="text_tablehead_b">֧���������<br></td>
				                  	<td  colspan="2">
				                   		<input type="text" name="po.startid"  value="${condition.startid }"/>-<input type="text" name="po.endid"   value="${condition.endid }"/>

				                  	<br></td>
				                  	
				                  	<td class="text_tablehead_b">
												��Ʊ����
											</td>
											<td>
												<select  name="po.notestp" id="po.notestp" style="width:180px;" title="��Ʊ����">
												<option value=""  selected="selected">��ѡ��</option>
																<option value="CT00"  >��ת�û�Ʊ</option>
																<option value="CT01"  >����ת�û�Ʊ</option>
																<option value="CT02"  >�ֽ��Ʊ</option>
																</select>
											</td>
				                  	
				                  	<td>&nbsp;</td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b">��Ʊ����<br></td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.startdate" class="Wdate" onclick="WdatePicker()" value="${condition.startdate }"/>-<input type="text" name="po.enddate" class="Wdate" onclick="WdatePicker()" value="${condition.enddate }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">Ʊ�ݺ���<br></td>
				                  	<td >
				                   		<input type="text" name="po.endtoend" value="${condition.endtoend}"/>
				                  	</td>
				                   	
				                  	<td>&nbsp;</td>
				                </tr> 
				                <tr>
				                	<td class="text_tablehead_b">��Ʊ���<br></td>
				                  	<td colspan="2">
				                   		<input type="text" name="po.startamount" value="${condition.startamount }"/>-<input type="text" name="po.endamount" value="${condition.endamount }"/>
				                  	</td>
				                  	<td  class="text_tablehead_b">��Ʊ��Ѻ<br></td>
				                  	<td >
				                   		<input type="text" name="po.billSeal" value="${condition.billSeal}"/>
				                  	</td>
				                </tr>
				                <tr><td class="text_tablehead_b"><br></td>
				                  	<td colspan="2">
				                  	</td>
				                  	<td>
				                  		<input name="query" type="button" class="button" value="�� ѯ"  onclick="submit()"/> 
				                  	</td></tr>
            				</table>
            				</div>
            				<br>
		            		<div align="center">
		              			<table width="95%"  class="tbcolor">
					             <tr  class="text_listhead">
					             
					                  <td   >֧���������<br></td>
					                  <td   >ҵ������<br></td>
					                   <!--<td   >��Ʊ����<br></td>-->
					                   <td   >Ʊ�ݺ��� <br></td>
					                  <td   >��Ʊ��Ѻ <br></td>
					                  <td   >������ <br></td>					                  
					                  <!--<td>ǩ�����к�<br></td> -->
					                  <td   >ҵ��״̬<br></td>
					                  <td   >��Ʊ״̬<br></td>
					                   <td   >
													<u>��&nbsp;��</u>
					                    <br></td>
					                  </tr> 
					                <logic:present name="queryList">
									  <logic:iterate id="po" name="queryList">
										  <tr class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">		
							                  <td  ><div >${po.txid }</div></td>
							                  <td  ><div >
																	<c:if test="${po.pmtkd eq'02902'}">�ʽ�����	</c:if>
																	<c:if test="${po.pmtkd eq'02903'}">�ʽ���໮��	</c:if>
																	<c:if test="${po.pmtkd eq'02904'}">�ʽ�δ���˻�	</c:if>
							                  </div></td>
							                 <!--   <td  ><div >
							                  <c:if test="${po.notestp eq 'CT00'}">��ת�û�Ʊ</c:if>
								                  <c:if test="${po.notestp eq 'CT01'}">����ת�û�Ʊ</c:if>
								                  <c:if test="${po.notestp eq 'CT02'}">�ֽ��Ʊ</c:if>
							                  </div></td>-->
							                  <td  ><div >${po.endtoendid }</div></td>
							                   <td   >${po.billSeal} <br></td>
							                   <td  ><div >
							                   <fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.amount}" />
							                   </div></td>
							                     <!--<td  ><div >${po.dbtrissuer}</div></td>-->
							                      <td  ><div >
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
												</div></td>
												<td><div>${po.status}</div></td>
                                               <td  ><div ><span >
                                               <c:if test="${type eq '1'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>��������</u></a>
							                  </c:if>
							                  <c:if test="${type eq '2'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>��&nbsp;��</u></a>
							                  </c:if>
							                  <c:if test="${type eq '3'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>��&nbsp;ʧ</u></a>
							                  </c:if>
							                  <c:if test="${type eq '4'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>�˻ؽ⸶</u></a>
							                  </c:if>
							                  <c:if test="${type eq '5'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>�˻ؽ⸶</u></a>
							                  </c:if>
							                  <c:if test="${type eq '6'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>��&nbsp;��</u></a>
							                  </c:if>
							                  <c:if test="${type eq '7'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>��&nbsp;��</u></a>
							                  </c:if>
							                  <c:if test="${type eq '8'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>��&nbsp;��</u></a>
							                  </c:if>
							                  <c:if test="${type eq '9'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>��ʧά��</u></a>
							                  </c:if>
							                  <c:if test="${type eq '10'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')')"><u>��&nbsp;��</u></a>
							                  </c:if>
							                  <c:if test="${type eq 'query'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>��&nbsp;ϸ</u></a>
							                  </c:if>
							                   <c:if test="${type eq '11'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>��&nbsp;ϸ</u></a>
							                  </c:if>
							                    <c:if test="${type eq '12'}">
													<a href="#"   onClick="viewdetails('${po.pmtgrpid}','${type}','${po.id }')"><u>��&nbsp;ϸ</u></a>
							                  </c:if>
                                                </span></div>
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
			    		<td><br></td>      
					   	<td>
					       	<table width="100%" border="0" cellpadding="0" cellspacing="0">
					        	<tr>
					          		<td><jsp:include page="/page/common/Page.jsp"/><br></td>
					          	</tr>
				         	</table>
				        <br></td>
			     		<td><br></td>
		     		</tr>
	    		</table>
	    	<br></td>
	    	<td ><br></td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
