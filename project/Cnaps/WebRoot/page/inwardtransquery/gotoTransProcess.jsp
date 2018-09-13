<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
			
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script language="javascript">
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
			function viewdetails(opertype,id){
				var newurl = "<%=path %>/RecvTransProcessAction.do?method=gotoProcess&id="+id+"&opertype="+opertype;
				viewDetails(newurl);	
			}
			
		</script>
	</head>
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					<%-- 
					<td background="<%=path%>/image/content_table_line_L.jpg"></td>
					--%>
					<td ></td>
					<td >
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
									<table width="95%"  border="0" cellpadding="0" cellspacing="0">
                <tr>
                <td colspan="6"><div  class="text_title"><span class="text_blue2">ҵ�����˴�����</span></div></td>
                </tr>
              </table>
										
  												
  												<table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
  												<tr class="text_list" bgcolor="E6E6E6"><td colspan="4" align="left">������Ϣ</td></tr>
  													<tr class="text_list"   bgcolor="E6E6E6">
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">֧���������</td>
														<td  class="text1" width="150">&nbsp;${entity.txid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">ҵ�����ͱ���</td>
														<td  class="text1" width="150">&nbsp;
																	<c:if test="${entity.pmttp eq 'A108'}">�ֽ���</c:if>
																	<c:if test="${entity.pmttp eq 'A110'}">���ճи�</c:if>
																	<c:if test="${entity.pmttp eq 'A109'}">ί���տ�(����)</c:if>
																	<c:if test="${entity.pmttp eq 'B100'}">��ͨ���ҵ��</c:if>
																	<c:if test="${entity.pmttp eq 'C102'}">���˴���ͨ��ҵ��</c:if>
																	<c:if test="${entity.pmttp eq 'D102'}">���˴���ͨ��ҵ��</c:if>
																	<c:if test="${entity.pmttp eq 'E100'}">��ͨ���ڴ���ҵ��</c:if>
																	<c:if test="${entity.pmttp eq 'A113'}">�羳֧��</c:if>
														</td>
														</tr><tr class="text_list"   bgcolor="E6E6E6">
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ҵ���������</td>
														<td  class="text1" width="150">&nbsp;
														
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
																	<c:if test="${entity.pmtkd eq'09001'}">����	</c:if>
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
																	<c:if test="${entity.pmtkd eq'09001'}">����	</c:if>
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
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >����״̬</td>
														<td  class="text1" width="150">&nbsp;
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
														
													</tr>
													
													
													<tr class="text_list"   bgcolor="E6E6E6">
														<td   class="text_tablehead_b" align="right" class="text1" width="190">���ִ���</td>
														<td class="text1" width="150">&nbsp;${entity.currencycd}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����</td>
														<td  class="text1" width="150">&nbsp;${entity.amount}</td>
														
														</tr><tr class="text_list"   bgcolor="E6E6E6">
														
													
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ϵͳ������</td>
														<td  class="text1" width="150">&nbsp;${entity.workdt}</td>
														<td></td><td></td>
														
													</tr>
													
												
												
													
  												</table>
											  	<table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
											  	<tr class="text_list" bgcolor="E6E6E6"><td colspan="4" align="left">�տ�����Ϣ</td></tr>
												<tr class="text_list"   bgcolor="E6E6E6">
													<td   class="text_tablehead_b" align="right" class="text1" width="190">�տ����к�</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">�տ�������</td>
														<td class="text1" width="150">&nbsp;${entity.cdtrbrnchnm}</td>
												</tr>
												<tr class="text_list"   bgcolor="E6E6E6">
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ��˿������к�</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuer}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ��˿���������</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuernm}</td>
												</tr>
												<tr class="text_list"   bgcolor="E6E6E6">
													<td  class="text_tablehead_b" align="right" class="text1" width="190" >�տ����˺�</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtracct}</td>
													<td    class="text_tablehead_b" align="right" class="text1" width="190">�տ�������</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrnm}</td>
												</tr>
												<tr class="text_list"   bgcolor="E6E6E6">
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ��˵�ַ</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtraddr}</td>
													
												</tr>
												<tr class="text_list"   bgcolor="E6E6E6">
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ����������к�</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtrmmbid}</td>
												</tr>
												</table>
										  	<table width="95%" border="0" cellpadding="0" cellspacing="0" class="tbcolor">
												
											
											<tr class="text_tablehead_b" bgcolor="E6E6E6"><td colspan="4" align="left">��������Ϣ</td></tr>
											<tr class="text_list"   bgcolor="E6E6E6">
												<td  class="text_tablehead_b"  align="right" class="text1" width="190">�������˺�</td>
												<td  class="text_tablehead_b"  align="right" class="text1" width="190">&nbsp;${entity.dbtracct}</td>
												<td    class="text_tablehead_b"  align="right" class="text1" width="190">����������</td>
												<td  class="text_tablehead_b"  align="right" class="text1" width="190">&nbsp;${entity.dbtrnm}</td>
											</tr>
											<tr class="text_list"   bgcolor="E6E6E6">
												<td  class="text_tablehead_b" align="right" class="text1" width="190">�����˵�ַ</td>
												<td  class="text1" width="150" colspan="3">&nbsp;${entity.dbtraddr}</td>
												
											</tr>
											<tr class="text_list"   bgcolor="E6E6E6">
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����˿������к�</td>
												<td  class="text1">&nbsp;${entity.dbtrissuer}</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����˿���������</td>
												<td  class="text1">&nbsp;${entity.dbtrissuernm}</td>
												
											</tr>
											<tr class="text_list"   bgcolor="E6E6E6">
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">�������������к�</td>
												<td  class="text1" colspan="3">&nbsp;${entity.dbtrmmbid}</td>
											</tr>
											<tr class="text_list"   bgcolor="E6E6E6">
												<td   class="text_tablehead_b" align="right" class="text1" width="190">�������к�</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_tablehead_b" align="right" class="text1" width="190">����������</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>
											</tr>
											
											</table>
											  
												


										<br />
										
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td ></td>

					<%--
					<td background="<%=path%>/image/content_table_line_R.jpg"></td> --%>
				</tr>
			</table>

		</form>
	</body>
</html>
