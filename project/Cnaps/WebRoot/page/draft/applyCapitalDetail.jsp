<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
	String path = request.getContextPath();
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>��ϸ��Ϣ</title>
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/css/page_color1.css" />
		<script language="javascript">
    </script>
	</head>
	<body>
		<form>
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr valign="top">
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF;">
						<br>
					</td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
									<br>
								</td>
								<td>
									<div align="center">
										<table width="95%" border="0" align="center" cellpadding="0"
											cellspacing="0">
											<tr>
												<td colspan="6">
													<div class="text_title">
														<span class="text_blue2">��ϸ��Ϣ</span>
													</div>
												</td>
											</tr>
										</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head">

											<tr>
												<td height="30">
													<div align="center">
														<br />
														<br />
														<br />
														<table class="tbcolor">

															<tr>
																<td class="text_details_L">
																	���
																</td>
																<td class="text_list_L">
																	${po.id }
																</td>
																<td class="text_details_L">
																	֧���������
																</td>
																<td class="text_list_L">
																	${po.pmtgrpid }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	��������
																</td>
																<td class="text_list_L">
																	${po.workdt }
																</td>
																<td class="text_details_L">
																	���ı�ʶ��
																</td>
																<td class="text_list_L">
																	${po.msgid }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	���ķ���ʱ��
																</td>
																<td class="text_list_L">
																	${po.credttm }
																</td>
																<td class="text_details_L">
																	�����������к�
																</td>
																<td class="text_list_L">
																	${po.instgpty }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	���ղ�������к�
																</td>
																<td class="text_list_L">
																	${po.instdpty }
																</td>
																<td class="text_details_L">
																	����ֱ�Ӳ������
																</td>
																<td class="text_list_L">
																	${po.instgdrctpty }
																</td>
															</tr>
															<tr>
																
																<!--  <td class="text_details_L">
																	ϵͳ���
																</td>
																<td class="text_list_L">
																	${po.systemcd }
																</td>-->
															</tr>
															<tr>
															<td class="text_details_L">
																	����ֱ�Ӳ������
																</td>
																<td class="text_list_L">
																	${po.instddrctpty }
																</td>
																<td class="text_details_L">
																	��Ʊ����
																</td>
																<td class="text_list_L">
																	${po.issuedt }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	Ʊ�ݺ���
																</td>
																<td class="text_list_L">
																	${po.notesno }
																</td>
																<td class="text_details_L">
																	��Ʊ��Ѻ
																</td>
																<td class="text_list_L">
																	${po.billseal }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	��Ʊ����
																</td>
																<td class="text_list_L">
																	  <c:if test="${po.billtp eq 'CT00'}">��ת�û�Ʊ</c:if>
								                  						<c:if test="${po.billtp eq 'CT01'}">����ת�û�Ʊ</c:if>
								                  						<c:if test="${po.billtp eq 'CT02'}">�ֽ��Ʊ</c:if>
																</td>
																<td class="text_details_L">
																	��Ʊ���
																</td>
																<td class="text_list_L">
																	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.issueamt}" />
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	��Ʊǩ�����к�
																</td>
																<td class="text_list_L">
																	${po.issuerbk }
																</td>
																<td class="text_details_L">
																	��Ʊ�������˺�
																</td>
																<td class="text_list_L">
																	${po.issueracct }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	��Ʊ����������
																</td>
																<td class="text_list_L">
																	${po.issuernm }
																</td>
																<td class="text_details_L">
																	Ʊ����ص��տ�������
																</td>
																<td class="text_list_L">
																	${po.rcvrnm }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	����Ʊ�˿�����
																</td>
																<td class="text_list_L">
																	${po.holderbk }
																</td>
																<td class="text_details_L">
																	����Ʊ���˺�
																</td>
																<td class="text_list_L">
																	${po.holderacct }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	����Ʊ������
																</td>
																<td class="text_list_L">
																	${po.holdernm }
																</td>
																<td class="text_details_L">
																	������
																</td>
																<td class="text_list_L">
																<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.rmnngamt }" />
																	
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	ʵ�ʽ�����
																</td>
																<td class="text_list_L">
																	<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${po.actntryamt }" />
																</td>
																<td class="text_details_L">
																	��ʾ��������
																</td>
																<td class="text_list_L">
																	${po.paydt }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	ҵ��״̬
																</td>
																<td class="text_list_L">
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
																</td>
																<td class="text_details_L">
																	�ܾ�ҵ��Ĳ�������к�
																</td>
																<td class="text_list_L">
																	${po.rjctedptyid }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	ҵ��ܾ���
																</td>
																<td class="text_list_L">
																	${po.txrjctcd }
																</td>
																<td class="text_details_L">
																	ҵ��ܾ�ԭ��
																</td>
																<td class="text_list_L">
																	${po.txrjctinf }
																</td>
															</tr>
															<tr>
																<td class="text_details_L">
																	��̬����
																</td>
																<td class="text_list_L">
																	${po.sttlmdt }
																</td>
																<td class="text_details_L">
																	����״̬
																</td>
																<td class="text_list_L">
																	${po.lockflag }
																</td>
															<tr>
																<td class="text_details_L">
																	������
																</td>
																<td class="text_list_L">
																	${po.lockteller }
																</td>
																<td class="text_details_L">
																	&nbsp;
																</td>
																<td class="text_list_L">
																	&nbsp;
																</td>
															</tr>
															<tr>
															<td class="text_details_L">
																	��ע
																</td>
																<td class="text_list_L" colspan="4">
																	${po.ustrd }
																</td>
															</tr>

														</table>

														<br />
													</div>
													<br>
												</td>
											</tr>
										</table>
									</div>
									<br>
								</td>
							</tr>
						</table>
						<br>
					</td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<br>
					</td>

				</tr>
			</table>
		</form>
	</body>
</html>
