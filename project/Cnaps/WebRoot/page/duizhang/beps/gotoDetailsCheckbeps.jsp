<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean"
	prefix="bean"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html"
	prefix="html"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic"
	prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
		<title>С����ϸ�˶Բ�ѯ�б�</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css"
			type="text/css" media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>

		<script language="javascript">
	function sendDetailsDownload(orgnlmsgid,orgnlinstgpty,orgnlmsgtpcd,sndrcvtp){
		window.location.href="<%=path%>/DuizhangAction.do?method=sendDetailsDownloadBeps&orgnlmsgid="
			+orgnlmsgid+"&orgnlinstgpty="+orgnlinstgpty+"&orgnlmsgtpcd="+orgnlmsgtpcd+"&sndrcvtp="+sndrcvtp;
	}
</script>
</head>
	<body>
		<html:form method="post" action="/DuizhangAction.do?method=XXXX">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td valign="top">
						<div align="center">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td>
										<br />
										<br />
										<table width="95%" border="0" align="center" cellpadding="0"
											cellspacing="0">
											<tr>
												<td colspan="6">
													<div class="text_title">
														<span class="text_blue2">С����ϸ�˶��б�</span>
													</div>
												</td>
											</tr>
										</table>
										
									</td>


								</tr>
								<tr>

									<td valign="top">
										<div align="center">
											<table width="95%" border="0" align="center" cellpadding="0"
												cellspacing="0" class="table_head">
												<tr>
													<td width="180" height="20" class="text_tablehead_b">
														��������
													</td>
													<td width="180" height="20">
														${chckdt }
													</td>
													<td width="180" height="20" class="text_tablehead_b">
														������ʶ
													</td>
													<td width="180" height="20">
														<c:if test="${sndrcvtp eq 'SR00'}">����</c:if>
														<c:if test="${sndrcvtp eq 'SR01'}">����</c:if>
													</td>
												</tr>
												<tr>
													<td width="180" height="20" class="text_tablehead_b">
														��������
													</td>
													<td width="180" height="20">
														<c:if test="${pmttp eq 'beps.121.001.01'}">�ͻ�������ͨ����</c:if>
														<c:if test="${pmttp eq 'beps.122.001.01'}">����������ͨ����</c:if>
														<c:if test="${pmttp eq 'beps.124.001.01'}">ʵʱ���ǻ�ִ</c:if>
														<c:if test="${pmttp eq 'beps.125.001.01'}">���ڴ���</c:if>
														<c:if test="${pmttp eq 'beps.128.001.01'}">��ͨ��ǻ�ִ</c:if>
														<c:if test="${pmttp eq 'beps.130.001.01'}">CISͨ�û�ִ</c:if>
														<c:if test="${pmttp eq 'beps.132.001.01'}">ʵʱ��ǻ�ִ</c:if>
														<c:if test="${pmttp eq 'beps.134.001.01'}">���ڽ�ǻ�ִ</c:if>
														<c:if test="${pmttp eq 'beps.381.001.01'}">�������ջ�ִ</c:if>
														<c:if test="${pmttp eq 'beps.383.001.01'}">����������ִ</c:if>
														<c:if test="${pmttp eq 'beps.385.001.01'}">ʵʱ���ջ�ִ</c:if>
														<c:if test="${pmttp eq 'beps.387.001.01'}">ʵʱ������ִ</c:if>
														<c:if test="${pmttp eq 'beps.127.001.01'}">��ͨ���</c:if>
														<c:if test="${pmttp eq 'beps.133.001.01'}">���ڽ��</c:if>
														<c:if test="${pmttp eq 'ccms.314.001.01'}">��ѯ��</c:if>
														<c:if test="${pmttp eq 'ccms.315.001.01'}">�鸴��</c:if>
													</td>
													<td width="180" height="20" class="text_tablehead_b">
														�����
													</td>
													<td width="180" height="20">
														${netgrnd }
													</td>
												</tr>
											</table>
										</div>
									</td>
								</tr>
								<tr>
									<td valign="top">
										<br />
										<div align="center">
											<table width="95%" class="tbcolor">
												<tr class="text_listhead">
													<td>
														ԭ���ı�ʶ��
													</td>
													<td>
														ԭ����������
													</td>
													<td>
														ԭ�������ͱ���
													</td>
													<td>
														��ϸҵ���ܱ���
													</td>
													<td>
														��ϸҵ���ܽ��
													</td>
													<td>
														ҵ��״̬
													</td>
													<td>
														���ı�ʶ��
													</td>
													<td>
														����ҵ��״̬
													</td>
													<td>
														������̬����
													</td>
													<td>
														����
													</td>
												</tr>
											
												<logic:present name="queryList">
													<logic:iterate id="po" name="queryList">
														<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
															onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
															bgcolor="E6E6E6">
															<td class="text_list">
																${po.orgnlmsgid }
															</td>
															<td class="text_list">
																${po.orgnlinstgpty }
															</td>
															<td class="text_list">
																${po.orgnlmsgtpcd }
															</td>
															<td class="text_list">
																${po.nboftxs }
															</td>
															<td class="text_list">
																${po.ctrlsum }
															</td>
															<td class="text_list">
																${po.prcsts }
															</td>
															<td class="text_list">
																${po.msgId }
															</td>
															<td class="text_list">
																${po.orgPrcSts }
															</td>
															<td class="text_list">
																${po.netgDt }
															</td>
															<td class="text_list">
																<div align="center">
																	<span class="text_list"> <c:if
																			test="${po.msgId eq '' || po.msgId ==null || po.msgId eq 'null'}">
																			<a href="#"
																				onClick="sendDetailsDownload('${po.orgnlmsgid}','${po.orgnlinstgpty }','${po.orgnlmsgtpcd }','${sndrcvtp}')"><u>��ϸ�������뷢��</u>
																			</a>
																		</c:if> <c:if
																			test="${!(po.prcsts eq orgPrcSts)&& !(po.msgId eq '' || po.msgId ==null || po.msgId eq 'null') }">
																			<a href="#" onClick="viewdetails2('${po.msgId}')"><u>ҵ��״̬��ѯ</u>
																			</a>
																		</c:if> </span>
																</div>
															</td>
														</tr>
													</logic:iterate>
													<logic:empty name="queryList">
														<tr>
															<td colspan="9" align="center">
																<font color="red">û�з��������ļ�¼!</font>
															</td>
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
												<td><jsp:include page="/page/common/Page.jsp" /></td>
											</tr>
										</table>
									</td>
									<td></td>
								</tr>
               
							</table>

</html:form>
		
	</body>
</html>
