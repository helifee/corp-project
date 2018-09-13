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
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			
			function commitForm(){
			 
			  	document.forms[0].submit();
			  
				
			}
			function selectDet(i){
				var len = document.getElementsByName("details").length;
				for(var j=0;j<len;j++){
					if(j==i){
						 document.getElementsByName("details")[j].style.display="block";
					}else{
						document.getElementsByName("details")[j].style.display="none";
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
			<input type="hidden" name="systemcd" value="${entity.systemcd }" />
			<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }" />

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
																<td class="text_zcx" align="right" class="text1">��ϸ��ʶ��</td>
																<td class="text1" width="150">&nbsp;${entity.msgid}</td>
																<td class="text_zcx">
																	֧���������
																</td>

																<td class="text1" width="150">
																	&nbsp;${entity.txid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ҵ�����ͱ���
																</td>
																<td class="text1" width="150">
																	&nbsp;
														<c:if test="${entity.pmttp eq 'A100'}">��ͨ���	</c:if>
												<c:if test="${entity.pmttp eq 'A108'}">�ֽ���	</c:if>
												<c:if test="${entity.pmttp eq 'A109'}">ί���տ���أ�	</c:if>
												<c:if test="${entity.pmttp eq 'A110'}">���ճи������أ�	</c:if>
												<c:if test="${entity.pmttp eq 'A201'}">֧Ʊ	</c:if>
												<c:if test="${entity.pmttp eq 'A202'}">���л�Ʊ	</c:if>
												<c:if test="${entity.pmttp eq 'A111'}">��ҵ��Ʊ	</c:if>
												<c:if test="${entity.pmttp eq 'A112'}">�������	</c:if>
												<c:if test="${entity.pmttp eq 'A113'}">�羳֧��	</c:if>
												<c:if test="${entity.pmttp eq 'A101'}">�������ʽ�㻮	</c:if>
												<c:if test="${entity.pmttp eq 'A114'}">���п�����Ʊ�ݽ��������	</c:if>
												<c:if test="${entity.pmttp eq 'A102'}">������	</c:if>
												<c:if test="${entity.pmttp eq 'A307'}">�����ʽ��ծ�Ҹ����ǻ���	</c:if>
												<c:if test="${entity.pmttp eq 'A105'}">�˻�	</c:if>
												<c:if test="${entity.pmttp eq 'A103'}">����ͬ�ǽ�����������	</c:if>
												<c:if test="${entity.pmttp eq 'A104'}">�����ʽ���ǻ���	</c:if>
												<c:if test="${entity.pmttp eq 'A106'}">֧ȡ���л���	</c:if>
												<c:if test="${entity.pmttp eq 'A115'}">�ٴ���	</c:if>
												<c:if test="${entity.pmttp eq 'A116'}">������	</c:if>
												<c:if test="${entity.pmttp eq 'A117'}">Ʊ��ת����	</c:if>
												<c:if test="${entity.pmttp eq 'A200'}">�м��ʽ�㻮	</c:if>
												<c:if test="${entity.pmttp eq 'G101'}">�����г����׽���	</c:if>
												<c:if test="${entity.pmttp eq 'G102'}">ծȯ�г����׽���	</c:if>
												<c:if test="${entity.pmttp eq 'G103'}">ծȯ���С��Ҹ������滮��	</c:if>
												<c:if test="${entity.pmttp eq 'G104'}">���п������	</c:if>
												<c:if test="${entity.pmttp eq 'G105'}">������ҵ��Ʊ�ʽ�����	</c:if>
												<c:if test="${entity.pmttp eq 'G106'}">��㽻���г�����	</c:if>
												<c:if test="${entity.pmttp eq 'G107'}">�ʽ�ؽ���	</c:if>
												<c:if test="${entity.pmttp eq 'G108'}">�����Զ����	</c:if>
												<c:if test="${entity.pmttp eq 'G109'}">��Ѻ����	</c:if>
												<c:if test="${entity.pmttp eq 'H010'}">��㽻�������	</c:if>
												<c:if test="${entity.pmttp eq 'H011'}">֤ȯ���������	</c:if>
												<c:if test="${entity.pmttp eq 'H012'}">����ϵͳ�����	</c:if>
												               
												<c:if test="${entity.pmttp eq 'A102'}"> ������	                       </c:if>                 
												<c:if test="${entity.pmttp eq 'A307'}"> �����ʽ��ծ�Ҹ����ǻ���	       </c:if>                 
												<c:if test="${entity.pmttp eq 'A301'}"> �ɷ�	                           </c:if>                 
												<c:if test="${entity.pmttp eq 'A400'}"> ��������ͨ����ҵ��	           </c:if>                 
												<c:if test="${entity.pmttp eq 'C100'}"> ��ͨʵʱ����ҵ��	               </c:if>                 
												<c:if test="${entity.pmttp eq 'C101'}"> ʵʱ����	                       </c:if>                 
												<c:if test="${entity.pmttp eq 'C102'}"> ���˴���ͨ��ҵ��	               </c:if>                 
												<c:if test="${entity.pmttp eq 'C210'}"> н�𱨳�	                       </c:if>                 
												<c:if test="${entity.pmttp eq 'E100'}"> ��ͨ���ڴ���ҵ��     	           </c:if>                 
												<c:if test="${entity.pmttp eq 'E101'}"> ���ڴ���     	                   </c:if>                 
												<c:if test="${entity.pmttp eq 'B100'}"> ��ͨ���ҵ��	                   </c:if>                 
												<c:if test="${entity.pmttp eq 'B104'}"> �����ʽ��ǻ���ҵ��	           </c:if>                 
												<c:if test="${entity.pmttp eq 'B309'}"> С��֧��ϵͳͨ��Ʊ�ݽ���ҵ��	   </c:if>                 
												<c:if test="${entity.pmttp eq 'B308'}"> С��֧��ϵͳ֧Ʊ����ҵ��	       </c:if>                 
												<c:if test="${entity.pmttp eq 'D102'}"> ���˴���ͨ��	                   </c:if>                 
												<c:if test="${entity.pmttp eq 'D100'}"> ��ͨʵʱ���ҵ��	               </c:if>                 
												<c:if test="${entity.pmttp eq 'D200'}"> ʵʱ����	                       </c:if>                 
												<c:if test="${entity.pmttp eq 'D203'}"> ʵʱͨ��Ʊ�ݽ���ҵ��	           </c:if>                 
												<c:if test="${entity.pmttp eq 'F100'}"> ��ͨ���ڽ��	                   </c:if>                 
												<c:if test="${entity.pmttp eq 'E102'}"> ���ڴ���     	                   </c:if>                 
												<c:if test="${entity.pmttp eq 'A308'}"> CIS֧Ʊҵ���ִ	                 </c:if>                 
												<c:if test="${entity.pmttp eq 'A309'}"> CISͨ��Ʊ��ҵ���ִ	             </c:if>    
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ҵ���������
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${entity.pmtkd eq'02102'}">��ͨ���	</c:if>
																	<c:if test="${entity.pmtkd eq'02101'}">�ֽ���	</c:if>
																	<c:if test="${entity.pmtkd eq'02106'}">ί���տ���أ�	</c:if>
																	<c:if test="${entity.pmtkd eq'02107'}">���ճи������أ�	</c:if>
																	<c:if test="${entity.pmtkd eq'03401'}">֧Ʊ	</c:if>
																	<c:if test="${entity.pmtkd eq'02901'}">���л�Ʊ�ʽ��ƴ�	</c:if>
																	<c:if test="${entity.pmtkd eq'02902'}">���л�Ʊ�ʽ�����	</c:if>
																	<c:if test="${entity.pmtkd eq'02903'}">���л�Ʊ�ʽ���໮��	</c:if>
																	<c:if test="${entity.pmtkd eq'02904'}">���л�Ʊ�ʽ�δ���˻�	</c:if>
																	<c:if test="${entity.pmtkd eq'03404'}">���гжһ�Ʊ	</c:if>
																	<c:if test="${entity.pmtkd eq'03403'}">��ҵ�жһ�Ʊ	</c:if>
																	<c:if test="${entity.pmtkd eq'02104'}">�������	</c:if>
																	<c:if test="${entity.pmtkd eq'02112'}">����ó�׽���	</c:if>
																	<c:if test="${entity.pmtkd eq'02113'}">����ó�׽����˿�	</c:if>
																	<c:if test="${entity.pmtkd eq'02114'}">����ó�׽���	</c:if>
																	<c:if test="${entity.pmtkd eq'02115'}">����ó�׽����˿�	</c:if>
																	<c:if test="${entity.pmtkd eq'02116'}">�ʱ����¿羳֧��	</c:if>
																	<c:if test="${entity.pmtkd eq'02117'}">�ʱ����¿羳֧���˿�	</c:if>
																	<c:if test="${entity.pmtkd eq'02125'}">����������Ŀ֧��	</c:if>
																	<c:if test="${entity.pmtkd eq'02123'}">���˿羳���	</c:if>
																	<c:if test="${entity.pmtkd eq'02124'}">���˿羳�˿�	</c:if>
																	<c:if test="${entity.pmtkd eq'01300'}">���ƾ��	</c:if>
																	<c:if test="${entity.pmtkd eq'09001'}">����	</c:if>
																	<c:if test="${entity.pmtkd eq'02122'}">���п�����Ʊ�ݽ��������	</c:if>
																	<c:if test="${entity.pmtkd eq'03001'}">������	</c:if>
																	<c:if test="${entity.pmtkd eq'02205'}">��ծ�Ҹ�	</c:if>
																	<c:if test="${entity.pmtkd eq'02108'}">�˻�	</c:if>
																	<c:if test="${entity.pmtkd eq'03101'}">����ͬ�ǽ�����������	</c:if>
																	<c:if test="${entity.pmtkd eq'02201'}">���뼶Ԥ������	</c:if>
																	<c:if test="${entity.pmtkd eq'02202'}">ʡ��Ԥ������	</c:if>
																	<c:if test="${entity.pmtkd eq'02203'}">���м�Ԥ������	</c:if>
																	<c:if test="${entity.pmtkd eq'02204'}">�ؼ�Ԥ������	</c:if>
																	<c:if test="${entity.pmtkd eq'03201'}">֧ȡ���л���	</c:if>
																	<c:if test="${entity.pmtkd eq'04101'}">�ٴ���	</c:if>
																	<c:if test="${entity.pmtkd eq'04001'}">������	</c:if>
																	<c:if test="${entity.pmtkd eq'02704'}">���ʽת����	</c:if>
																	<c:if test="${entity.pmtkd eq'02705'}">�ع�ʽת����	</c:if>
																	<c:if test="${entity.pmtkd eq'02706'}">�ع�ʽת�������	</c:if>
																	<c:if test="${entity.pmtkd eq'02118'}">�����ʽ���	</c:if>
																	<c:if test="${entity.pmtkd eq'02119'}">�����ʽ��軹��	</c:if>
																	<c:if test="${entity.pmtkd eq'02120'}">�����ʽ���	</c:if>
																	<c:if test="${entity.pmtkd eq'02121'}">�����ʽ��軹��	</c:if>
																	<c:if test="${entity.pmtkd eq'02105'}">�ʽ����	</c:if>
																	<c:if test="${entity.pmtkd eq'02301'}">�����г�������ȯ����	</c:if>
																	<c:if test="${entity.pmtkd eq'02302'}">�����г�������Ѻʽ�ع�����	</c:if>
																	<c:if test="${entity.pmtkd eq'02303'}">�����г�������Ѻʽ�ع�����	</c:if>
																	<c:if test="${entity.pmtkd eq'02304'}">�����г��������ʽ�ع�����	</c:if>
																	<c:if test="${entity.pmtkd eq'02305'}">�����г��������ʽ�ع�����	</c:if>
																	<c:if test="${entity.pmtkd eq'02401'}">ծȯ�г�������ȯ����	</c:if>
																	<c:if test="${entity.pmtkd eq'02402'}">ծȯ�г�������Ѻʽ�ع�����	</c:if>
																	<c:if test="${entity.pmtkd eq'02403'}">ծȯ�г�������Ѻʽ�ع�����	</c:if>
																	<c:if test="${entity.pmtkd eq'02404'}">ծȯ�г��������ʽ�ع�����	</c:if>
																	<c:if test="${entity.pmtkd eq'02405'}">ծȯ�г��������ʽ�ع�����	</c:if>
																	<c:if test="${entity.pmtkd eq'02501'}">ծȯ���нɿ�	</c:if>
																	<c:if test="${entity.pmtkd eq'02502'}">ծȯ������Ϣ	</c:if>
																	<c:if test="${entity.pmtkd eq'02503'}">ծȯ������	</c:if>
																	<c:if test="${entity.pmtkd eq'02504'}">ծȯ��Ϣ	</c:if>
																	<c:if test="${entity.pmtkd eq'02505'}">ծȯ����������	</c:if>
																	<c:if test="${entity.pmtkd eq'02506'}">ծȯ�Ҹ�������	</c:if>
																	<c:if test="${entity.pmtkd eq'02507'}">��Ϣʽծȯ�Ҹ�������	</c:if>
																	<c:if test="${entity.pmtkd eq'02601'}">���п������	</c:if>
																	<c:if test="${entity.pmtkd eq'02701'}">���ʽ����	</c:if>
																	<c:if test="${entity.pmtkd eq'02702'}">�ع�ʽ����	</c:if>
																	<c:if test="${entity.pmtkd eq'02703'}">�ع�ʽ�������	</c:if>
																	<c:if test="${entity.pmtkd eq'02704'}">���ʽת����	</c:if>
																	<c:if test="${entity.pmtkd eq'02705'}">�ع�ʽת����	</c:if>
																	<c:if test="${entity.pmtkd eq'02706'}">�ع�ʽת�������	</c:if>
																	<c:if test="${entity.pmtkd eq'02707'}">���ʽ������	</c:if>
																	<c:if test="${entity.pmtkd eq'02713'}">���ʽ�����ֵ����ջ�	</c:if>
																	<c:if test="${entity.pmtkd eq'02708'}">�ع�ʽ������	</c:if>
																	<c:if test="${entity.pmtkd eq'02709'}">�ع�ʽ���������	</c:if>
																	<c:if test="${entity.pmtkd eq'02710'}">����������ҵ��Ʊ	</c:if>
																	<c:if test="${entity.pmtkd eq'02711'}">��ʾ����	</c:if>
																	<c:if test="${entity.pmtkd eq'02712'}">������ʾ����	</c:if>
																	<c:if test="${entity.pmtkd eq'02801'}">��㽻���г�ѯ�۽���	</c:if>
																	<c:if test="${entity.pmtkd eq'02802'}">��㽻���г����۽���	</c:if>
																	<c:if test="${entity.pmtkd eq'03601'}">�ʽ�ؽ���	</c:if>
																	<c:if test="${entity.pmtkd eq'03602'}">�����Զ����	</c:if>
																	<c:if test="${entity.pmtkd eq'03501'}">����֧��	</c:if>
																	<c:if test="${entity.pmtkd eq'03502'}">���ʿۿ�	</c:if>
																	<c:if test="${entity.pmtkd eq'02602'}">��㽻�������	</c:if>
																	<c:if test="${entity.pmtkd eq'02603'}">֤ȯ���������	</c:if>
																	<c:if test="${entity.pmtkd eq'02604'}">����ϵͳ�����	</c:if>

																</td>
																</tr><tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	����״̬
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${entity.status eq 'PR04' }">������</c:if>
																	<c:if test="${entity.status eq 'PR09' }">�Ѿܾ�</c:if>
																	<c:if test="${entity.status eq 'PR08' }">�ѳ���</c:if>
																	<c:if test="${entity.status eq 'PR09' }">�Ѿܾ�</c:if>
																	<c:if test="${entity.status eq 'PR21' }">��ֹ��</c:if>
																	<c:if test="${entity.status eq 'PR22' }">�ѳ���</c:if>
																	<c:if test="${entity.status eq 'PR32' }">�ѳ���</c:if>
																	<c:if test="${entity.status eq 'PR05' }">�ѳɹ�</c:if>
																	<c:if test="${entity.status eq 'PR98' }">��ȷ��    </c:if>
																	<c:if test="${entity.status eq 'PR90' }">�½�      </c:if>
																	<c:if test="${entity.status eq 'PR81' }">������    </c:if>
																	<c:if test="${entity.status eq 'PR82' }">�����    </c:if>
																	<c:if test="${entity.status eq 'PR83' }">������    </c:if>
																	<c:if test="${entity.status eq 'PR95' }">�����    </c:if>
																	<c:if test="${entity.status eq 'PR96' }">������    </c:if>
																	<c:if test="${entity.status eq 'PR97' }">�ѷ���    </c:if>
																	<c:if test="${entity.status eq 'PR11' }">�������Ŷ�</c:if>
																	<c:if test="${entity.status eq 'PR12' }">�������Ŷ�</c:if>
																	<c:if test="${entity.status eq 'PR99' }">����</c:if>
																	<c:if test="${entity.status eq 'PR03' }">������</c:if>
																	<c:if test="${entity.status eq 'PR89' }">����ִ </c:if>
																	<c:if test="${entity.status eq 'PR88' }">�ѻ�ִ</c:if>
																</td>

																<td class="text_zcx" align="right" width="190">
																	�տ����к�
																</td>
																<td class="text1" width="150">
																	&nbsp;&nbsp;${entity.cdtrbrnchid}
																</td>
																<td class="text_zcx" align="right" width="190">
																	�տ�������
																</td>
																<td class="text1">
																	&nbsp;${entity.cdtrbrnchnm}ee
																</td>


																<td class="text_zcx" align="right" class="text1">
																	ϵͳ������
																</td>
																<td class="text1">
																	&nbsp;${entity.workdt}
																</td>
																</tr><tr>
																<td class="text_zcx" align="right" class="text1">
																	�����
																</td>
																<td class="text1">
																	&nbsp;
																	<fmt:formatNumber
																		pattern="###,###,###,###,###,###,##0.00"
																		value="${entity.amount }" />
																</td>
																
																
																<td class="text_zcx" align="right" class="text1">
																	���ִ���
																</td>
																<td class="text1">
																	&nbsp;${entity.currencycd}
																</td>
																<td></td><td></td>
																</tr>
														</table>


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
																					�������˺�
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.dbtracct}
																				</td>
																				
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					����������
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.dbtrnm}
																				</td>
																		</tr><tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�����˵�ַ
																				</td>
																				<td class="text1" >
																					&nbsp;${entity.dbtraddr}
																				</td>

																			
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�����˿������к�
																				</td>
																				<td class="text1">
																					&nbsp;${entity.dbtrissuer}
																				</td>
																				</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�����˿���������
																				</td>
																				<td class="text1">
																					&nbsp;${entity.dbtrissuernm}
																				</td>
																			
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�������к�
																				</td>
																				<td class="text1">
																					&nbsp;${entity.dbtrbrnchid}
																				</td>
																				</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					����������
																				</td>
																				<td class="text1">
																					&nbsp;${entity.dbtrbrnchnm}
																				</td>
																			
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�����������к�
																				</td>
																				<td class="text1" colspan="3">
																					&nbsp;${entity.dbtrmmbid}
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
																					�տ����к�
																				</td>
																				<td class="text1" width="150">
																					&nbsp;&nbsp;${entity.cdtrbrnchid}
																				</td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�տ�������
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.cdtrbrnchnm}
																				</td>
																			</tr>
<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�տ��˿������к�
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.cdtrissuer}
																				</td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�տ��˿���������
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.cdtrissuernm}
																				</td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�տ����˺�
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.cdtracct}
																				</td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�տ�������
																				</td>
																				<td class="text1" width="150">
																					&nbsp;${entity.cdtrnm}
																				</td>
																			</tr>
<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�տ��˵�ַ
																				</td>
																				<td class="text1" width="150" >
																					&nbsp;${entity.cdtraddr}
																				</td>

																			
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�տ����������к�
																				</td>
																				<td class="text1" width="150" >
																					&nbsp;${entity.cdtrmmbid}
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

																		<c:when test="${entity.pmttp eq 'B308'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.issueDt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��ʾ��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.payDt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ�ݺ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.notesNo}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��;
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.purpose}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.numOfEndrsr}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					����������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.endrsrNm}
																				<br></td>
																			</tr>
																		</c:when>
																		<c:when test="${entity.pmttp eq 'B309'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.issueDt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��ʾ��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.payDt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.issueAmt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.maturityDt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ��Ѻ
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.billSeal}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ж�Э����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.accptncagrmntNo}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ж�����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.accptncDt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ж���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.accptncNm}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ������������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.applyNm}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ���������˺�
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.applyAcct}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ��ȫ��
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.drawerNm}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ���˺�
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.drawerAcct}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					���׺�ͬ����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.trnsctnCntrctNo}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					ԭ�տ�������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.oriCrdtrNm}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ�ݺ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.notesNo}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��;
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.purpose}
																				<br></td>
																			</tr>

																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.numOfEndrsr}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					����������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.endrsrNm}
																				<br></td>
																			</tr>

																		</c:when>



																		<c:when test="${entity.pmttp eq 'A109'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.notesdt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;
																					<c:if test="${addentity.notestp eq '01' }">���гжһ�Ʊ</c:if>
																					<c:if test="${addentity.notestp eq '02' }">���ڴ浥</c:if>
																					<c:if test="${addentity.notestp eq '03' }">ƾ֤ʽ��ծ</c:if>
																					<c:if test="${addentity.notestp eq '04' }">��ػ��ڴ���</c:if>
																					<c:if test="${addentity.notestp eq '99' }">����</c:if>

																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ�ݺ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.notesno}
																				<br></td>
																			</tr>


																		</c:when>


																		<c:when test="${entity.pmttp eq 'A110'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.notesdt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ�ݺ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.notesno}
																				<br></td>
																			</tr>
																			

																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�⳥����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.amndsamt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ܸ�����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.rjctamt}
																				<br></td>
																			</tr>

																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					ԭ�н��
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.orgnlamt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					֧�����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.pmtamt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ึ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.oddamt}
																				<br></td>

																			</tr>

																		</c:when>


																		<c:when test="${entity.pmttp eq 'A201'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.voucherno}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ�ݽ��
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�Ƽ�
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.voucherno}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																			</tr>

																		</c:when>


																		<c:when test="${entity.pmttp eq 'A104'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��ϸ���ܽ��
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ϱ��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.voucherno}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					���չ������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.voucherno}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ԥ�㼶��
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.voucherno}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�����ڱ�־
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${entity.vouchertype}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��ϸ����
																				<br></td>
																				<td class="text1" width="150">3 ${entity.voucherno} 
																				<br></td>
																			</tr>


																		</c:when>
																		
																		<c:when test="${entity.pmttp eq 'A301'}">
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ɷ�����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;
																					<c:if test="${addentity.pymnttp eq 'TP00' }">�ֽ�</c:if>
																					
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�����ڼ�
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.term}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�շѵ�λ��ˮ��
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.flownum}
																				<br></td>
																				
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�շѸ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.chrgrmrk}
																				<br></td>
																				
																			</tr>
																			
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
