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
		<title>��ѯ�鸴���ѯ</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />


		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<link rel="stylesheet"
			href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css"
			type="text/css" media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>
	<script language="javascript">
	//�鿴��ϸ
	function viewdetails(id){
		var newurl = "<%=path %>/TransProcessAction.do?method=queryReplyInfoDetail&id="+id;
		var oldurl = "<%=path %>/TransProcessAction.do?method=queryReplyInfo";
		viewDetails(newurl);
	}
	function printDetails(id,type){
		var newurl = "<%=path %>/PingzhengPrintAction.do?method=printQueryReplyInfoAction&id="+id+"&flag="+type;
		var oldurl = "<%=path %>/TransProcessAction.do?method=queryReplyInfo";
		viewDetails(newurl);
	}
</script>
	</head>
	<body>
		<html:form method="post"
			action="/TransProcessAction.do?method=queryReplyInfo">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr valign="top">
					<td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td colspan="6">
									&nbsp;
								</td>
							</tr>
							<tr>
								<td>
									&nbsp;
								</td>
								<td>
									<table width="95%" border="0" align="center" cellpadding="0"
										cellspacing="0">
										<tr>
											<td colspan="6">
												<div class="text_title">
													<span class="text_blue2">��ѯ�鸴���ѯ</span>
												</div>
											</td>
										</tr>
									</table>
									<table width="95%" border="0" align="center" cellpadding="0"
										class="table_head">
										<tr>
											<td colspan="4">
												&nbsp;
											</td>
										</tr>
										<tr>
											<td class="text_tablehead_b">
												���ı�ʶ��
											</td>
											<td>
												<html:text property="po.msgid" maxlength="35" />
											</td>
											<td class="text_tablehead_b">
												��������
											</td>
											<td>
												<html:text property="po.workdt" styleClass="Wdate"
													onclick="WdatePicker()" />
											</td>
										</tr>
										<tr>
											<td class="text_tablehead_b">
												������ʶ
											</td>
											<td>
											<html:select property="po.direction" >
				                   			<html:option value="">��ѡ��</html:option>
				                   			<html:option value="I">����</html:option>
				                   			<html:option value="O">����</html:option>
				                   		</html:select>
											</td>
											<td class="text_tablehead_b">
												��ѯ����
											</td>
											<td>
											<html:select property="po.queryType" >
				                   			<html:option value="">��ѡ��</html:option>
				                   			<html:option value="QT00">��ѯ</html:option>
				                   			<html:option value="QT01">�鸴</html:option>
				                   		</html:select>
				                   		&nbsp;&nbsp;
										<input name="query" type="button" class="button" value="�� ѯ" onclick="submit()" />
											</td>
										</tr>
										<tr>
											<td colspan="4">
												&nbsp;
											</td>
										</tr>
									</table>
									<br>
									<div align="center">
										<table width="95%" class="tbcolor">
											<tr class="text_listhead">
												<td>
													֧���������
												</td>
												<td>
													���ı�ʶ��
												</td>
												<td>
													��ִ���ı�ʶ��
												</td>
												<td>
													����������
												</td>
												<td>
													ԭ���ı�ʶ��
												</td>
												<td>
													ԭ�������ʹ���
												</td>
												<td>
													ԭ����������
												</td>
												<td>
													��ѯ����
												</td>
												<td>
													ҵ��״̬
												</td>
												<td>
													������ʶ
												</td> 
												<!--  
												<td>
													��ϸ
												</td>
												-->
												<td>
													ƾ֤��ӡ
												</td>
											</tr>
											<logic:present name="replyInfoList">
												<logic:iterate id="replyInfo" name="replyInfoList">
													<tr class="text_list" onmouseover="this.bgColor='#CE4C56'"
														onmouseout="this.bgColor='E6E6E6'" style="cursor: hand;"
														bgcolor="E6E6E6">
														<td class="text_list">
															${replyInfo.pmtGrpId }
														</td>
														<td class="text_list">
															${replyInfo.msgId }
														</td>
														<td class="text_list">
															${replyInfo.recptMsgId }
														</td>
														<td class="text_list">
															${replyInfo.instgPty }
														</td>
														<td class="text_list">
															${replyInfo.ornglMsgId }
														</td>
														<td class="text_list">
															${replyInfo.ornglMsgTp }
														</td>
														<td class="text_list">
															${replyInfo.ornglInstgPty }
														</td>
														<td class="text_list">
															<c:if test="${replyInfo.queryType  eq 'QT00'}">��ѯ</c:if>
							                				<c:if test="${replyInfo.queryType  eq 'QT01'}">�鸴</c:if>
														</td>
														<td class="text_list">
															${replyInfo.status }
														</td>
														<td class="text_list">
															${replyInfo.direction }
														</td>
														<!--  
														<td>
															<a href="#" onClick="viewdetails('${replyInfo.id}')"><u>��ϸ</u></a>
														</td>-->
														<td>
															<a href="#" onClick="printDetails('${replyInfo.id}','${replyInfo.queryType}')"><u>ƾ֤��ӡ</u></a>
														</td>
												</logic:iterate>
												<logic:empty name="replyInfoList">
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
											<td><jsp:include page="/page/common/Page.jsp" /></td>
										</tr>
									</table>
								</td>
								<td></td>
							</tr>
						</table>
					</td>
					<td>
				</tr>
			</table>
		</html:form>
	</body>
</html>
