<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="/WEB-INF/tld/struts-bean.tld" prefix="bean" %>
<%@ taglib uri="/WEB-INF/tld/struts-html.tld" prefix="html" %>
<%@ taglib uri="/WEB-INF/tld/struts-logic.tld" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=GBK" />
		<title>�ޱ����ĵ�</title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
		
	</head>
	<body>
		<html:form method="post" action="systemManage/systemOrganizationManageAction.do?method=xxx">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				 <tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td  width="194" ></td>
							<td  width="270"  ></td>
						</tr>
						</table>
					</td>
					<td width="8" ></td>
			</tr>
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
					<td
						style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table width="800" height="30" border="0" cellpadding="0"
											cellspacing="0">
											<tr>
												<td height="40">
													<div align="center">
														<span class="text_blue2">PVP��ϸҵ��鿴</span>
													</div>
												</td>
											</tr>
											
											
											<table width="820" border="0" cellpadding="1" cellspacing="1" 
		 bordercolor="#F0F0F0" bgcolor="#F0F0F0"
		style="text-align: left; vertical-align: top">
		<tr>
	    <td>
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >������Ϣ</legend>
  	<table class="sample">
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">������ˮ�ţ�</td>
		<td  class="text1" width="150">${pvpform.chnmsgid} </td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">����ۣ�</td>
		<td  class="text1" width="150">${pvpform.purchspric}</td>
	</tr>
	<tr>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����������</td>
		<td  class="text1">${pvpform.buyamt}</td>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">���ҷ��ţ�</td>
		<td  class="text1">CNY</td>
	</tr>
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">�������ڣ�</td>
		<td  class="text1" width="150">${pvpform.workdate} </td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">ǰ̨��ˮ�ţ�</td>
		<td  class="text1" width="150">${pvpform.chnmsgid}</td>
	</tr>

	 
	<tr>
		<td   class="text_tablehead_b" align="right" class="text1" width="190">�����ѽ�</td>
		<td class="text1">${pvpform.charge}</td>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">ҵ��״̬��</td>
		<td  class="text1">������</td>
	</tr>
		<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">ϵͳ��ţ�</td>
		<td  class="text1" width="150">${pvpform.workdate} </td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190"></td>
		<td  class="text1" width="150"></td>
	</tr>
	<tr>
		
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">��ע��</td>
		<td  class="text1">${pvpform.remarkinfo}</td>
	</tr>

	
	</table>
	</fieldset>
	
	
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >���������Ϣ</legend>
  	<table class="sample">
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">�����������кţ�</td>
		<td  class="text1" width="150">${pvpform.senddrctpty}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">�������кţ�</td>
		<td  class="text1" width="150">${pvpform.sendindrctpty}</td>
	</tr>
	
	</table>
	</fieldset>
	
	
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >���ջ�����Ϣ</legend>
  	<table class="sample">
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190" >�տ��������кţ�</td>
		<td  class="text1" width="150">${pvpform.recvdrctpty}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">�տ����кţ�</td>
		<td  class="text1" width="150">${pvpform.sendindrctpty}</td>
	</tr>
	
	</table>
	</fieldset>
	
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >��Ա��Ϣ</legend>
  	<table class="sample">
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190" >¼���Ա��</td>
		<td  class="text1" width="150">${pvpform.inputteller}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">���˹�Ա��</td>
		<td  class="text1" width="150">${entity.cbsendbrchbic}</td>
	</tr>
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190" >�������ˣ�</td>
		<td  class="text1" width="150">${hvpsfront141.lockteller}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">����״̬��</td>
		<td  class="text1" width="150">${hvpsfront141.lockflag}</td>
	</tr>
	<tr>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">��Ȩ��Ա��</td>
		<td  class="text1">${entity.cbsendbrchname}</td>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">����ţ�</td>
		<td  class="text1">${entity.cbrecvbrchbic}</td>
	</tr>
	<tr>
		<td   class="text_tablehead_b" align="right" class="text1" width="190">�˻�������������ţ�</td>
		<td class="text1">${entity.cbrecvbrchname}</td>
		<td   class="text_tablehead_b" align="right" class="text1" width="190">�ն˺ţ�</td>
		<td class="text1">${entity.cbchargecode}</td>
	</tr>
	
	
	</table>
	</fieldset>
	
	</td>
	</tr>
	</table>
		<br />
		<br />
			<input name="backButton" type="button" class="button" value="��  ��"
				onclick="history.back();" />
				<br />
				<br />
			
			</table>
		</td>
	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
					
				</tr>
			</table>
		</html:form>
	</body>
	</html>
 