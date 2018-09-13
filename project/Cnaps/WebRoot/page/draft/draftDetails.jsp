<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>

<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css"
			type="text/css" media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		
		<script type="text/javascript">
			
			function commitForm(){
			  	document.forms[0].submit();
			}
			function selectDet(i){
				var len = document.getElementsByName("details").length;
				for(var j=0;j<len;j++){
					if(j==i){
						 document.getElementsByName("details")[j].style.display="block";
						 document.getElementsByName("tabdetails")[j].style.background="#B3B3B3";
					}else{
						document.getElementsByName("details")[j].style.display="none";
						document.getElementsByName("tabdetails")[j].style.background="#dbdbdb";
					}
				}
				
			}
			
		</script>
	</head>
	<body>
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=02">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<input type="hidden" name="systemcd" value="${po.systemcd }" />
			<input type="hidden" name="pmtgrpid"value="${po.pmtgrpid }" />
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
														<span class="text_blue2"> ҵ����ϸ���� </span>
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
														<table>
															

															<tr>
																<td class="text_zcx">
																	֧���������
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.pmtgrpid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ҵ�����ͱ���
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${po.pmttp eq 'A108'}">�ֽ���</c:if>
																	<c:if test="${po.pmttp eq 'A110'}">���ճи�</c:if>
																	<c:if test="${po.pmttp eq 'A109'}">ί���տ�(����)</c:if>
																	<c:if test="${po.pmttp eq 'A101'}">�������ʽ�㻮</c:if>
																	<c:if test="${po.pmttp eq 'A102'}">������</c:if>
																	<c:if test="${po.pmttp eq 'A104'}">�����ʽ���ǻ���</c:if>
																	<c:if test="${po.pmttp eq 'A301'}">�ɷ�ҵ��</c:if>
																	<c:if test="${po.pmttp eq 'A201'}">֧Ʊ</c:if>
																	<c:if test="${po.pmttp eq 'A100'}">��ͨ���</c:if>
																	<c:if test="${po.pmttp eq 'A112'}">�������</c:if>
																	<c:if test="${po.pmttp eq 'A200'}">�м��ʽ�㻮</c:if>
																	<c:if test="${po.pmttp eq 'A202'}">���л�Ʊ</c:if>
																	<c:if test="${po.pmttp eq 'A113'}">�羳֧��</c:if>

																	<c:if test="${po.pmttp eq 'B100'}">��ͨ���ҵ��</c:if>
																	<c:if test="${po.pmttp eq 'C102'}">���˴���ͨ��ҵ��</c:if>
																	<c:if test="${po.pmttp eq 'D102'}">���˴���ͨ��ҵ��</c:if>
																	<c:if test="${po.pmttp eq 'E100'}">��ͨ���ڴ���ҵ��</c:if>
																	<c:if test="${po.pmttp eq 'B308'}">֧Ʊ����</c:if>
																	<c:if test="${po.pmttp eq 'B309'}">Ʊ�ݽ���</c:if>
																	<c:if test="${po.pmttp eq 'A113'}">�羳֧��</c:if>
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ҵ���������
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${po.pmtkd eq'02102'}">��ͨ���	</c:if>
																	<c:if test="${po.pmtkd eq'02101'}">�ֽ���	</c:if>
																	<c:if test="${po.pmtkd eq'02106'}">ί���տ���أ�	</c:if>
																	<c:if test="${po.pmtkd eq'02107'}">���ճи������أ�	</c:if>
																	<c:if test="${po.pmtkd eq'03401'}">֧Ʊ	</c:if>
																	<c:if test="${po.pmtkd eq'02901'}">���л�Ʊ�ʽ��ƴ�	</c:if>
																	<c:if test="${po.pmtkd eq'02902'}">���л�Ʊ�ʽ�����	</c:if>
																	<c:if test="${po.pmtkd eq'02903'}">���л�Ʊ�ʽ���໮��	</c:if>
																	<c:if test="${po.pmtkd eq'02904'}">���л�Ʊ�ʽ�δ���˻�	</c:if>
																	<c:if test="${po.pmtkd eq'03404'}">���гжһ�Ʊ	</c:if>
																	<c:if test="${po.pmtkd eq'03403'}">��ҵ�жһ�Ʊ	</c:if>
																	<c:if test="${po.pmtkd eq'02104'}">�������	</c:if>
																	<c:if test="${po.pmtkd eq'02112'}">����ó�׽���	</c:if>
																	<c:if test="${po.pmtkd eq'02113'}">����ó�׽����˿�	</c:if>
																	<c:if test="${po.pmtkd eq'02114'}">����ó�׽���	</c:if>
																	<c:if test="${po.pmtkd eq'02115'}">����ó�׽����˿�	</c:if>
																	<c:if test="${po.pmtkd eq'02116'}">�ʱ����¿羳֧��	</c:if>
																	<c:if test="${po.pmtkd eq'02117'}">�ʱ����¿羳֧���˿�	</c:if>
																	<c:if test="${po.pmtkd eq'02125'}">����������Ŀ֧��	</c:if>
																	<c:if test="${po.pmtkd eq'02123'}">���˿羳���	</c:if>
																	<c:if test="${po.pmtkd eq'02124'}">���˿羳�˿�	</c:if>
																	<c:if test="${po.pmtkd eq'01300'}">���ƾ��	</c:if>
																	<c:if test="${po.pmtkd eq'09001'}">����	</c:if>
																	<c:if test="${po.pmtkd eq'02122'}">���п�����Ʊ�ݽ��������	</c:if>
																	<c:if test="${po.pmtkd eq'03001'}">������	</c:if>
																	<c:if test="${po.pmtkd eq'02205'}">��ծ�Ҹ�	</c:if>
																	<c:if test="${po.pmtkd eq'02108'}">�˻�	</c:if>
																	<c:if test="${po.pmtkd eq'03101'}">����ͬ�ǽ�����������	</c:if>
																	<c:if test="${po.pmtkd eq'02201'}">���뼶Ԥ������	</c:if>
																	<c:if test="${po.pmtkd eq'02202'}">ʡ��Ԥ������	</c:if>
																	<c:if test="${po.pmtkd eq'02203'}">���м�Ԥ������	</c:if>
																	<c:if test="${po.pmtkd eq'02204'}">�ؼ�Ԥ������	</c:if>
																	<c:if test="${po.pmtkd eq'09001'}">����	</c:if>
																	<c:if test="${po.pmtkd eq'03201'}">֧ȡ���л���	</c:if>
																	<c:if test="${po.pmtkd eq'04101'}">�ٴ���	</c:if>
																	<c:if test="${po.pmtkd eq'04001'}">������	</c:if>
																	<c:if test="${po.pmtkd eq'02704'}">���ʽת����	</c:if>
																	<c:if test="${po.pmtkd eq'02705'}">�ع�ʽת����	</c:if>
																	<c:if test="${po.pmtkd eq'02706'}">�ع�ʽת�������	</c:if>
																	<c:if test="${po.pmtkd eq'02118'}">�����ʽ���	</c:if>
																	<c:if test="${po.pmtkd eq'02119'}">�����ʽ��軹��	</c:if>
																	<c:if test="${po.pmtkd eq'02120'}">�����ʽ���	</c:if>
																	<c:if test="${po.pmtkd eq'02121'}">�����ʽ��軹��	</c:if>
																	<c:if test="${po.pmtkd eq'02105'}">�ʽ����	</c:if>
																	<c:if test="${po.pmtkd eq'02301'}">�����г�������ȯ����	</c:if>
																	<c:if test="${po.pmtkd eq'02302'}">�����г�������Ѻʽ�ع�����	</c:if>
																	<c:if test="${po.pmtkd eq'02303'}">�����г�������Ѻʽ�ع�����	</c:if>
																	<c:if test="${po.pmtkd eq'02304'}">�����г��������ʽ�ع�����	</c:if>
																	<c:if test="${po.pmtkd eq'02305'}">�����г��������ʽ�ع�����	</c:if>
																	<c:if test="${po.pmtkd eq'02401'}">ծȯ�г�������ȯ����	</c:if>
																	<c:if test="${po.pmtkd eq'02402'}">ծȯ�г�������Ѻʽ�ع�����	</c:if>
																	<c:if test="${po.pmtkd eq'02403'}">ծȯ�г�������Ѻʽ�ع�����	</c:if>
																	<c:if test="${po.pmtkd eq'02404'}">ծȯ�г��������ʽ�ع�����	</c:if>
																	<c:if test="${po.pmtkd eq'02405'}">ծȯ�г��������ʽ�ع�����	</c:if>
																	<c:if test="${po.pmtkd eq'02501'}">ծȯ���нɿ�	</c:if>
																	<c:if test="${po.pmtkd eq'02502'}">ծȯ������Ϣ	</c:if>
																	<c:if test="${po.pmtkd eq'02503'}">ծȯ������	</c:if>
																	<c:if test="${po.pmtkd eq'02504'}">ծȯ��Ϣ	</c:if>
																	<c:if test="${po.pmtkd eq'02505'}">ծȯ����������	</c:if>
																	<c:if test="${po.pmtkd eq'02506'}">ծȯ�Ҹ�������	</c:if>
																	<c:if test="${po.pmtkd eq'02507'}">��Ϣʽծȯ�Ҹ�������	</c:if>
																	<c:if test="${po.pmtkd eq'02601'}">���п������	</c:if>
																	<c:if test="${po.pmtkd eq'02701'}">���ʽ����	</c:if>
																	<c:if test="${po.pmtkd eq'02702'}">�ع�ʽ����	</c:if>
																	<c:if test="${po.pmtkd eq'02703'}">�ع�ʽ�������	</c:if>
																	<c:if test="${po.pmtkd eq'02704'}">���ʽת����	</c:if>
																	<c:if test="${po.pmtkd eq'02705'}">�ع�ʽת����	</c:if>
																	<c:if test="${po.pmtkd eq'02706'}">�ع�ʽת�������	</c:if>
																	<c:if test="${po.pmtkd eq'02707'}">���ʽ������	</c:if>
																	<c:if test="${po.pmtkd eq'02713'}">���ʽ�����ֵ����ջ�	</c:if>
																	<c:if test="${po.pmtkd eq'02708'}">�ع�ʽ������	</c:if>
																	<c:if test="${po.pmtkd eq'02709'}">�ع�ʽ���������	</c:if>
																	<c:if test="${po.pmtkd eq'02710'}">����������ҵ��Ʊ	</c:if>
																	<c:if test="${po.pmtkd eq'02711'}">��ʾ����	</c:if>
																	<c:if test="${po.pmtkd eq'02712'}">������ʾ����	</c:if>
																	<c:if test="${po.pmtkd eq'09001'}">����	</c:if>
																	<c:if test="${po.pmtkd eq'02801'}">��㽻���г�ѯ�۽���	</c:if>
																	<c:if test="${po.pmtkd eq'02802'}">��㽻���г����۽���	</c:if>
																	<c:if test="${po.pmtkd eq'03601'}">�ʽ�ؽ���	</c:if>
																	<c:if test="${po.pmtkd eq'03602'}">�����Զ����	</c:if>
																	<c:if test="${po.pmtkd eq'03501'}">����֧��	</c:if>
																	<c:if test="${po.pmtkd eq'03502'}">���ʿۿ�	</c:if>
																	<c:if test="${po.pmtkd eq'02602'}">��㽻�������	</c:if>
																	<c:if test="${po.pmtkd eq'02603'}">֤ȯ���������	</c:if>
																	<c:if test="${po.pmtkd eq'02604'}">����ϵͳ�����	</c:if>
																	<c:if test="${po.pmtkd eq'01400'}">�ɷ�ҵ��	</c:if>
																	
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	����״̬
																</td>
																<td class="text1" width="150">
																	&nbsp;
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

															</tr>

															<tr>
																<td class="text_zcx" align="right" width="190">
																	�տ����к�
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.cdtrbrnchid}
																</td>
																<td class="text_zcx" align="right" width="190">
																	�տ�������
																</td>
																<td class="text1" colspan="3">
																	${po.cdtrbrnchnm}
																</td>
																<td class="text_zcx" align="right" class="text1"
																			width="190">
																			ҵ�����ȼ�
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;
																			<c:if test="${po.sttlmprty eq 'NORM'}">һ��</c:if>
																			<c:if test="${po.sttlmprty eq 'HIGH'}">�ؼ�</c:if>
																			<c:if test="${po.sttlmprty eq 'URGT'}">����</c:if>
																		</td>
															</tr>
															<tr>
																<td class="text_zcx" >
																	�����
																</td>
																<td class="text1">
																	&nbsp;${po.brnchid}
																</td>
																<td class="text_zcx" align="right">
																	ϵͳ���
																</td>
																<td class="text1">
																	&nbsp;���</td>
																<td class="text_zcx" align="right" class="text1">
																	ϵͳ����
																</td>
																<td class="text1">
																	&nbsp;${po.workdt}
																</td>
																<td class="text_zcx" align="right">
																	ǩ��ģʽ
																</td>
																<td class="text1">
																	&nbsp;
																	<c:if test="${po.signmd eq '01'}">�ֽ�</c:if>
																	<c:if test="${po.signmd eq '02'}">����</c:if>
																	<c:if test="${po.signmd eq '03'}">ת��</c:if>
																	<c:if test="${po.signmd eq '04'}">����</c:if>
																</td>
															</tr>
															<tr>
																<td class="text_zcx" align="right">
																	������ʶ
																</td>
																<td class="text1">
																	&nbsp;
																	<c:if test="${po.chnlrmkid eq '1510'}">����</c:if>
																</td>
																<td class="text_zcx" align="right" class="text1">
																	���ִ���
																</td>
																<td class="text1">
																	&nbsp;${po.currencycd}
																</td>
																<td class="text_zcx" align="right" class="text1">
																	�����
																</td>
																<td class="text1">
																	&nbsp;
																	<fmt:formatNumber
																		pattern="###,###,###,###,###,###,##0.00"
																		value="${po.amount }" />
																</td>
																<td class="text_zcx" align="right" class="text1">
																	��&nbsp;&nbsp;&nbsp;&nbsp;��
																</td>
																<td class="text1">
																	&nbsp;
																	<fmt:formatNumber
																		pattern="###,###,###,###,###,###,##0.00"
																		value="${po.totalamt }" />
																</td>
															</tr>
															<tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ǩ����Ա
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.signerid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ǩ���ն�
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.signedtrmlid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ǩ������
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.signeddt}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ǩ��ʱ��
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.signedtm}
																</td>
															</tr>
															<tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	��������
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.netgdt}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	�����
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.netgrnd}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	��������
																</td>
																<td class="text1" width="150">
																	&nbsp;${po.sttlmdt}
																</td>
															</tr>
															
															<tr>
																		
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��&nbsp;&nbsp;&nbsp;&nbsp;��
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${po.addtlinf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��&nbsp;&nbsp;&nbsp;&nbsp;ע
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${po.ustrd}
																		</td>
																	</tr>
															
															<tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	&nbsp;
																</td>
																<td class="text1" width="150">
																	&nbsp;
																</td>

															</tr>
															
														</table>
<%-- 
														<table>
															<tr>
																<td style="width: 14%;">
																	<input type="button" class="tabdetails" value="��������Ϣ"
																		style="width: 100%; border: 1px solid; background-color: #FFFFD0; margin-left: 1px; margin-top: 3px; cursor: hand;"
																		onclick="selectDet(0)" />
																</td>
																<td style="width: 1%;">
																	|
																</td>

																<td style="width: 14%;">

																	<input type="button" value="�տ�����Ϣ"
																		style="width: 100%; border: 1px solid; background-color: #FFFFD0; margin-left: 1px; margin-top: 3px; cursor: hand;"
																		onclick="selectDet(1)" />

																</td>

																<td style="width: 1%;">
																	|
																</td>
																<td style="width: 14%;">

																	<input type="button" value="�շ���Ϣ"
																		style="width: 100%; border: 1px solid; background-color: #FFFFD0; margin-left: 1px; margin-top: 3px; cursor: hand;"
																		onclick="selectDet(2)" />

																</td>
																<td style="width: 1%;">
																	|
																</td>
																<!-- 
												<td style="width:14%;">
								 
													<c:if test="${po.pmttp eq 'F100'}">
														<input type="button" value="��������Ϣ"style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="viewbykeyfkrxx('${po.id}','${po.pmtgrpid}')"/>
													</c:if>													
													<c:if test="${po.pmttp != 'F100'}">
														<input type="button" value="��������Ϣ"style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(3)"/>
													</c:if>
												
											
											
											</td>
								
											<td style="width:1%;">| -->
																<td style="width: 14%;">
																	<input type="button" value="��Ա��Ϣ"
																		style="width: 100%; border: 1px solid; background-color: #FFFFD0; margin-left: 1px; margin-top: 3px; cursor: hand;"
																		onclick="selectDet(4)" />
																<td style="width: 1%;">
																	|
																</td>

																<td style="width: 14%;">
																	<input type="button" value="������Ϣ"
																		style="width: 100%; border: 1px solid; background-color: #FFFFD0; margin-left: 1px; margin-top: 3px; cursor: hand;"
																		onclick="selectDet(5)" />

																</td>

															</tr>


														</table>
--%>

														<div  style="width: 90%;" align="left">

															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;background: #B3B3B3;"
																onclick="selectDet(0)">
																��������Ϣ
															</div>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(1)">
																�տ�����Ϣ
															</div>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(2)">
																�շ���Ϣ
															</div>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(3)">
																��Ա��Ϣ
															</div>
															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;"
																onclick="selectDet(4)">
																��������Ϣ
															</div>

														</div>

														<div id="details" name="details" style="display: block;">
															<fieldset
																style="width: 90%;height:150px; border: 1px #CCCCCC solid; padding: 3px;">
																<%-- <legend >��������Ϣ</legend>	--%>
																<table>


																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			������֤������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<c:if test="${po.proposercerttp eq '01'}">���֤</c:if>
																			<c:if test="${po.proposercerttp eq '02'}">����֤</c:if>
																			<c:if test="${po.proposercerttp eq '03'}">ѧ��֤</c:if>
																			<c:if test="${po.proposercerttp eq '04'}">Ӫҵִ��</c:if>
																			<c:if test="${po.proposercerttp eq '05'}">��֯��������</c:if>
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			������֤����
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.proposercertid}
																		</td>
																		
																	</tr>
																	
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��������ϵ�绰
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.proposertel}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����˿ͻ���
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.proposercstmrid}
																		</td>
																	</tr>

																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�������˻�����
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<c:if test="${po.proposeraccttp eq 'AT00'}">�Թ��˻�</c:if>
																			<c:if test="${po.proposeraccttp eq 'AT01'}">���˴��ǿ��˻�</c:if>
																			<c:if test="${po.proposeraccttp eq 'AT02'}">���˽�ǿ��˻�</c:if>
																			<c:if test="${po.proposeraccttp eq 'AT03'}">����</c:if>
																			<c:if test="${po.proposeraccttp eq 'AT04'}">����</c:if>
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�������˻�����
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.proposeracctccy}
																		</td>
																	</tr>

																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�������˺�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.dbtracct}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			����������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.dbtrnm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����˵�ַ
																		</td>
																		<td class="text1" width="150" colspan="3">
																			&nbsp;${po.dbtraddr}
																		</td>
																	</tr>

																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����˿������к�
																		</td>
																		<td class="text1">
																			&nbsp;${po.dbtrissuer}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����˿���������
																		</td>
																		<td class="text1">
																			&nbsp;${po.dbtrissuernm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�������к�
																		</td>
																		<td class="text1">
																			&nbsp;${po.dbtrbrnchid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			����������
																		</td>
																		<td class="text1">
																			&nbsp;${po.dbtrbrnchnm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����������к�
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${po.dbtrmmbid}
																		</td>
																	</tr>


																</table>
															</fieldset>
														</div>



														<div id="details" name="details" style="display: none;">
															<fieldset
																style="width: 90%;height:150px; border: 1px #CCCCCC solid; padding: 3px;"
																align=center>
																<%-- <legend >�տ�����Ϣ</legend>--%>
																<table>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�տ����˺�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.cdtracct}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�տ�������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.cdtrnm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�տ��˵�ַ
																		</td>
																		<td class="text1" width="150" colspan="3">
																			&nbsp;${po.cdtraddr}
																		</td>

																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�տ��˿������к�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.cdtrissuer}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�տ��˿���������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.cdtrissuernm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�տ����к�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;&nbsp;${po.cdtrbrnchid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�տ�������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.cdtrbrnchnm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�տ����������к�
																		</td>
																		<td class="text1" width="150" colspan="3">
																			&nbsp;${po.cdtrmmbid}
																		</td>
																	</tr>
																</table>
															</fieldset>
														</div>

														<div id="details" name="details" style="display: none;">
															<fieldset
																style="width: 90%;height:150px; border: 1px #CCCCCC solid; padding: 3px;"
																align=center>
																
																<table>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${po.amount }" />
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�ܶ�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${po.totalamt }" />
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${po.servicecharge }" />
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�ʵ��
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${po.postage }" />
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��ؼ���
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${po.outstationcharge }" />
																		</td>
																		<%-- 
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			����
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<c:if test="${po.waive eq 'Y'}">����</c:if>
																			<c:if test="${po.waive eq 'N'}">������</c:if>
																		</td>
																		--%>
																	</tr>
																</table>
															</fieldset>

														</div>


														
														<div id="details" name="details" style="display: none;">
															<fieldset
																style="width: 90%;height:150px; border: 1px #CCCCCC solid; padding: 3px;"
																align=center>
																
																<table>
																  <tr>
																	<td  class="text_zcx" align="right" class="text1" width="190" >ǩ����Ա</td>
																	<td  class="text1" width="150">&nbsp;${po.signerid}</td>
																	<td    class="text_zcx" align="right" class="text1" width="190">ǩ���ն˺�</td>
																	<td  class="text1" width="150">&nbsp;${po.signedtrmlid}</td>
																</tr>
																<tr>
																	<td    class="text_zcx" align="right" class="text1" width="190">ǩ������</td>
																	<td  class="text1" width="150">&nbsp;${po.signeddt}</td>
																	<td   class="text_zcx"  align="right" class="text1" width="190">ǩ��ʱ��</td>
																	<td  class="text1" width="150">&nbsp;${po.signedtm}</td>
																</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			���˹�Ա
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.checkerid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����ն˺�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.checkedtrmlid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.checkeddt}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			����ʱ��
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.checkedtm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��˹�Ա
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.approvalid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			����ն˺�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.approvedtrmlid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.approveddt}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			���ʱ��
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.approvedtm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			������Ա
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.authenticateid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����ն˺�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.authenticatedtrmlid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.authenticateddt}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			����ʱ��
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${po.authenticatedtm}
																		</td>
																	</tr>
																	


																</table>
															</fieldset>
														</div>


														<div id="details" name="details" style="display: none">
															
															<fieldset
																style="width: 90%;height:150px; border: 1px #CCCCCC solid; padding: 3px;"
																align=center>
																
																<table>

																<c:choose>

																		<c:when test="${po.pmttp eq 'A202'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.issueDt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;
																					<c:if test="${addentity.billtp eq 'CT00' }">��ת�û�Ʊ</c:if>
																					<c:if test="${addentity.billtp eq 'CT01' }">����ת�û�Ʊ</c:if>
																					<c:if test="${addentity.billtp eq 'CT02' }">�ֽ��Ʊ</c:if>
																				

																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ�ݺ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${po.endtoendid}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ��Ѻ
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.billseal}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ���տ�������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.rcvrnm}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ֽ��ҶҸ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.cashpaybrnch}
																				<br></td>
																			</tr>
																			

																		</c:when>


																		
																		<c:otherwise>
�޸�����Ϣ��
																		</c:otherwise>

																	</c:choose>	
																	
																	<c:choose>
																		<c:when test="">
																	
																		</c:when>
																		<c:otherwise>
																	
																		</c:otherwise>
																	</c:choose>

																</table>
															</fieldset>
														</div>
														
</div>
<br />
														<br />
														<br />
</td></tr>
														
										</table>
								</td>
							</tr>
						</table>


					</td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						<br>
					</td>

				</tr>
			</table>
	</body>
</html>
