<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
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
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);"></td>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd">
											<th class="text_tablehead_b">
												<h4 align="center">�����ܺ˶�֪ͨ��ϸ</h4>
											</th>
											<tr>
											<td>
											<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  												<legend >��ϸ��Ϣ</legend>
  												<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd">
  													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">���ı�ʶ��</td>
														<td  class="text1" width="150">&nbsp;${entity.msgid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">���ķ���ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.credttm}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">����ֱ�Ӳ������</td>
														<td  class="text1" width="150">&nbsp;${entity.instgdrctpty}</td>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >����������</td>
														<td  class="text1" width="150">&nbsp;${entity.instgpty}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">����ֱ�Ӳ������</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.instddrctpty}</td>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">���ղ������</td>
														<td class="text1" width="150">&nbsp;${entity.instdpty}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ϵͳ����</td>
														<td  class="text1" width="150">&nbsp;${entity.systemcd}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">����</td>
														<td  class="text1" width="150">&nbsp;${entity.ustrd}</td>
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190">ԭ���ı�ʶ��</td>
														<td  class="text1" width="150">&nbsp;${entity.orgnlmsgid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">ԭ����������</td>
														<td  class="text1" width="150">&nbsp;${entity.orgnlinstgpty}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ԭ�������ͱ���</td>
														<td  class="text1" width="150">&nbsp;${entity.orgnlmsgtpcd}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">��������</td>
														<td  class="text1" width="150">&nbsp;${entity.chckdt}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">ҵ���Ķ��˼�¼��</td>
														<td class="text1" width="150">&nbsp;${entity.nbofpmtchckinf}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">��Ϣ���Ķ��˼�¼��</td>
														<td  class="text1" width="150">&nbsp;${entity.nbofmsgchckinf}</td>
													
													</tr>
  												</table>
  											</fieldset>
											</td>
											</tr>
											
											<tr>
												<td>&nbsp;</td>
											</tr>
										</table>


										<br />
										
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);"></td>

					<%--
					<td background="<%=path%>/image/content_table_line_R.jpg"></td> --%>
				</tr>
			</table>

		</form>
	</body>
</html>
