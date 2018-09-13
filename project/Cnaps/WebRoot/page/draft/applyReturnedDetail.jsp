<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>�˻�������ϸ��Ϣ</title>
		<link rel="stylesheet" type="text/css" href="<%=path%>/css/page_color1.css"  />
		<script language="javascript">
    </script>
	</head>
	<body>
		<form>
			<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">				
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF;" ><br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								<br></td>
								<td>
									<div align="center">
									<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2">��ϸ��Ϣ</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
														<table class="tbcolor">
														 
														<!-- <tr><td  class="text_details_L" >���                </td><td  class="text_list_L" >${po.id            }</td>-->
														<!-- <td  class="text_details_L" >&nbsp;           </td><td  class="text_list_L" >&nbsp;       </td>-->
														<!--  <td  class="text_details_L" >��������            </td><td  class="text_list_L" >${po.workDt        }</td></tr>-->
														<tr><td  class="text_details_L" >���ı�ʶ��          </td><td  class="text_list_L" >${po.msgId         }</td>
														<td  class="text_details_L" >���ķ���ʱ��        </td><td  class="text_list_L" >${po.creDtTm       }</td></tr>
														<tr><td  class="text_details_L" >�����������к�    </td><td  class="text_list_L" >${po.instgPty      }</td>
														<td  class="text_details_L" >���ղ�������к�    </td><td  class="text_list_L" >${po.instdPty      }</td></tr>
														<tr><td  class="text_details_L" >����ֱ�Ӳ������    </td><td  class="text_list_L" >${po.instgDrctPty  }</td>
														<td  class="text_details_L" >����ֱ�Ӳ������    </td><td  class="text_list_L" >${po.instdDrctPty  }</td></tr>
														<tr><td  class="text_details_L" >��Ʊ����            </td><td  class="text_list_L" >${po.issueDt       }</td>
														<td  class="text_details_L" >Ʊ�ݺ���            </td><td  class="text_list_L" >${po.notesNo       }</td></tr>
														<tr><td  class="text_details_L" >��Ʊ��Ѻ            </td><td  class="text_list_L" >${po.billSeal      }</td>
														<td  class="text_details_L" >��Ʊ����            </td><td  class="text_list_L" >
														 <c:if test="${po.billTp eq 'CT00'}">��ת�û�Ʊ</c:if>
								                  						<c:if test="${po.billTp eq 'CT01'}">����ת�û�Ʊ</c:if>
								                  						<c:if test="${po.billTp eq 'CT02'}">�ֽ��Ʊ</c:if>
														</td></tr><tr>
														<td  class="text_details_L" >��Ʊ���            </td><td  class="text_list_L" >
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.issueAmt }" />
														</td>
														<td  class="text_details_L" >��Ʊǩ�����к�      </td><td  class="text_list_L" >${po.issuerBk      }</td></tr>
														<tr><td  class="text_details_L" >��Ʊ�������˺�      </td><td  class="text_list_L" >${po.issuerAcct    }</td>
														<td  class="text_details_L" >��Ʊ����������      </td><td  class="text_list_L" >${po.issuerNm      }</td></tr>
														<tr><td  class="text_details_L" >Ʊ����ص��տ�������</td><td  class="text_list_L" >${po.rcvrNm        }</td>
														<td  class="text_details_L" >ҵ��״̬            </td><td  class="text_list_L" >
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
														</td></tr>
														<tr>
														<td  class="text_details_L" >��ע                </td><td  class="text_list_L" colspan="4">${po.ustrd         }
														</tr>

														</table>
													  
													 <br />
													</div>
												<br></td>
											</tr>
										</table>
									</div>
								<br></td>
							</tr>
						</table>
					<br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"><br></td>
	
				</tr>
			</table>
		</form>		
	</body>
</html>
