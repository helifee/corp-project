<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ page import="com.cnaps.hvps.persistence.duizhang.TotalAcctEntity" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>�����ܲ�ѯ�б� </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script language="javascript">
	function sendDetailsCheck(chckdt,pmttp,direction,prcSts){
		window.location.href="<%=path %>/DuizhangAction.do?method=sendDetailsCheckHvps&chckdt="
			+chckdt+"&pmttp="+pmttp+"&direction="+direction+"&prcSts="+prcSts;
	}
</script>


</head>
<body>
<html:form  method="post" action="/DuizhangAction.do?method=XXXX">
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
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0">
	        		<tr>
	        			<th class="text_tablehead_b" colspan="2">
												<h4 align="center">	</h4>
											</th>
	        		</tr>
	        		<tr>
	        			
	          			<td width="10">&nbsp;</td>
	          			<td>
	          			<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">�����ж����б��ѯ</span></div>
                					</td>
                				</tr>
                			</table>
	          				<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="table_head">
                				<tr>
					                <td align="center" width="30%" height="40"  >�������ڣ�${entity.chckdt }</td>
					                <td align="center" width="40%" height="40"  >�������ͣ�
														<c:if test="${entity.msgTpCd eq 'hvps.111.001.01'}">�ͻ�������ҵ����        </c:if>   
														<c:if test="${entity.msgTpCd eq 'hvps.112.001.01'}">���ڻ���������ҵ����    </c:if>
														<c:if test="${entity.msgTpCd eq 'hvps.141.001.01'}">��ʱת��ҵ����            </c:if>  
														<c:if test="${entity.msgTpCd eq 'hvps.631.001.01'}">����������㱨��        </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.121.001.01'}">�ͻ�������ͨ����ҵ����    </c:if>
														<c:if test="${entity.msgTpCd eq 'beps.122.001.01'}">���ڻ���������ͨ����ҵ����</c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.123.001.01'}">ʵʱ����ҵ����            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.125.001.01'}">���ڴ���ҵ����            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.127.001.01'}">��ͨ���ҵ����            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.131.001.01'}">ʵʱ���ҵ����            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.133.001.01'}">���ڽ��ҵ����            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.380.001.01'}">��������ҵ����            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.382.001.01'}">��������ҵ����            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.384.001.01'}">ʵʱ����ҵ����            </c:if>  
														<c:if test="${entity.msgTpCd eq 'beps.385.001.01'}">ʵʱ����ҵ����            </c:if>      
														<c:if test="${entity.msgTpCd eq 'ccms.314.001.01'}">��Ϣ�౨��                  </c:if>
														<c:if test="${entity.msgTpCd eq 'ccms.315.001.01'}">��Ϣ�౨��                  </c:if>
										</td>
					                <td align="center" width="30%" height="40"   >ҵ�����ͣ�
					                	<c:if test="${entity.pmtTp eq 'A100'}">��ͨ���                  </c:if>
												<c:if test="${entity.pmtTp eq 'A108'}">�ֽ���                  </c:if>
												<c:if test="${entity.pmtTp eq 'A109'}">ί���տ���أ�          </c:if>
												<c:if test="${entity.pmtTp eq 'A110'}">���ճи������أ�          </c:if>
												<c:if test="${entity.pmtTp eq 'A201'}">֧Ʊ                      </c:if>
												<c:if test="${entity.pmtTp eq 'A202'}">���л�Ʊ                  </c:if>
												<c:if test="${entity.pmtTp eq 'A111'}">��ҵ��Ʊ                  </c:if>
												<c:if test="${entity.pmtTp eq 'A112'}">�������                  </c:if>
												<c:if test="${entity.pmtTp eq 'A113'}">�羳֧��                  </c:if>
												<c:if test="${entity.pmtTp eq 'A101'}">�������ʽ�㻮            </c:if>
												<c:if test="${entity.pmtTp eq 'A114'}">���п�����Ʊ�ݽ��������</c:if>
												<c:if test="${entity.pmtTp eq 'A102'}">������                  </c:if>
												<c:if test="${entity.pmtTp eq 'A307'}">�����ʽ��ծ�Ҹ����ǻ���  </c:if>
												<c:if test="${entity.pmtTp eq 'A105'}">�˻�                      </c:if>
												<c:if test="${entity.pmtTp eq 'A104'}">�����ʽ���ǻ���          </c:if>
												<c:if test="${entity.pmtTp eq 'A103'}">����ͬ�ǽ�����������      </c:if>
												<c:if test="${entity.pmtTp eq 'A106'}">֧ȡ���л���              </c:if>
												<c:if test="${entity.pmtTp eq 'A113'}">�羳֧��                  </c:if>
												<c:if test="${entity.pmtTp eq 'A115'}">�ٴ���                    </c:if>
												<c:if test="${entity.pmtTp eq 'A114'}">���п�����Ʊ�ݽ��������</c:if>
												<c:if test="${entity.pmtTp eq 'A200'}">�м��ʽ�㻮            </c:if>
												<c:if test="${entity.pmtTp eq 'A307'}">�����ʽ��ծ�Ҹ����ǻ���</c:if>
												<c:if test="${entity.pmtTp eq 'G101'}">�����г����׽���        </c:if>
												<c:if test="${entity.pmtTp eq 'G102'}">ծȯ�г����׽���        </c:if>
												<c:if test="${entity.pmtTp eq 'G103'}">ծȯ���С��Ҹ������滮��</c:if>
												<c:if test="${entity.pmtTp eq 'G104'}">���п������      </c:if>
												<c:if test="${entity.pmtTp eq 'G105'}">������ҵ��Ʊ�ʽ�����</c:if>
												<c:if test="${entity.pmtTp eq 'G106'}">��㽻���г�����</c:if>
												<c:if test="${entity.pmtTp eq 'G107'}">�ʽ�ؽ���</c:if>
												<c:if test="${entity.pmtTp eq 'G108'}">�����Զ����</c:if>
												<c:if test="${entity.pmtTp eq 'G109'}">��Ѻ����</c:if>
												<c:if test="${entity.pmtTp eq 'H010'}">��㽻�������</c:if>
												<c:if test="${entity.pmtTp eq 'H011'}">֤ȯ���������</c:if>
												<c:if test="${entity.pmtTp eq 'H012'}">����ϵͳ�����</c:if>
												<c:if test="${entity.pmtTp eq 'K001'}"> ��ѯ��</c:if>
												<c:if test="${entity.pmtTp eq 'K002'}"> �鸴��</c:if>
					               </td>
					            </tr> 
            				</table>
            				<br>
		            		<div align="center"><br><table width="95%"  class="tbcolor">
					                
					                <tr class="text_listhead">
					                   <td  >ҵ��״̬</td>
					                   <td  >���˲�����</td>
					                   <td  >�����ܱ���</td>	
					                   <td  >�����ܽ��</td>
					                   <td  >�����ܱ���</td>
					                   <td  >�����ܽ��</td>
					                </tr> 
					                
									  <c:forEach items="${entity.duizhangList}" var="po">
										   <tr  class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list" rowspan="3"><div class="gridCell_standard">
							                  	<c:if test="${po.prcSts eq 'PR04'}">������</c:if>
							                  	<c:if test="${po.prcSts eq 'PR09'}">�Ѿܾ�</c:if>
							                  	<c:if test="${po.prcSts eq 'PR08'}">�ѳ���</c:if>
							                  	<c:if test="${po.prcSts eq 'PR05'}">�ѳɹ�</c:if>
							                  </div></td>
							                  <td  class="text_list"><div class="gridCell_standard">���ڹ����</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.sndTtlCnt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.sndTtlAmt }</div></td>		
							                  <td  class="text_list"><div class="gridCell_standard">${po.rcvTtlCnt }</div></td>	
							                  <td  class="text_list"><div class="gridCell_standard">${po.rcvTtlAmt }</div></td>
						                  </tr>
						                  <tr  class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list"><div class="gridCell_standard">����</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.rhsndTtlCnt }</div></td>
							                  <td  class="text_list"><div class="gridCell_standard">${po.rhsndTtlAmt }</div></td>		
							                  <td  class="text_list"><div class="gridCell_standard">${po.rhrcvTtlCnt }</div></td>	
							                  <td  class="text_list"><div class="gridCell_standard">${po.rhrcvTtlAmt }</div></td>	
						                  </tr>
						                   <tr  class="text_list" onmouseover="this.bgColor='#CE4C56'" onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;" bgcolor="E6E6E6">
							                  <td  class="text_list"><div class="gridCell_standard">���˽��</div></td>
							                  <td  class="text_list" colspan="2"><div class="gridCell_standard">
							                  	<c:choose>
							                  		<c:when test="${po.sendNumFlag eq '1' || po.sendAmtFlag eq '1'}">
							                  			<span class="text_list">
                                              			 <a href="#"   onClick="sendDetailsCheck('${entity.chckdt }','${entity.pmtTp }','SR00','${po.prcSts }')"><u>ҵ����ϸ�˶Է���</u></a></span>
							                  		</c:when>
							                  		<c:otherwise>
							                  			<font color="red" style="font-weight: bolder">һ��</font>
							                  		</c:otherwise>
							                  	</c:choose>
							                  </div></td>
							                 <td  class="text_list" colspan="2"><div class="gridCell_standard">
							                  	<c:choose>
							                  		<c:when test="${po.recvNumFlag eq '1' || po.recvAmtFlag eq '1'}">
							                  			<span class="text_list">
                                              			 <a href="#"   onClick="sendDetailsCheck('${entity.chckdt }','${entity.pmtTp }','SR01','${po.prcSts }')"><u>ҵ����ϸ�˶Է���</u></a></span>
							                  		</c:when>
							                  		<c:otherwise>
							                  			<font color="red" style="font-weight: bolder">һ��</font>
							                  		</c:otherwise>
							                  	</c:choose>
							                  </div></td>
						                  </tr>
					                  </c:forEach>
					               
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
			     		<td>&quot;</td>
		     		</tr>
	    		</table>
	    	</td>
	    	<td >
	    	</td>
	  	</tr>  
	</table>
</html:form>
</body>
</html>
