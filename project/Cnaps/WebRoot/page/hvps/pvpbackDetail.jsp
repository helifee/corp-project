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
		<td  class="text_tablehead_b" align="right" class="text1" width="190">�������ڣ�</td>
		<td  class="text1" width="150">${pvpform.workDate} </td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">�������ı�ʶ�ţ�</td>
		<td  class="text1" width="150">${pvpform.chnMsgId}</td>
	</tr>
	<tr>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">�������Ľ���ʱ�䣺</td>
		<td  class="text1">${pvpform.chnDtTm}</td>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">���ı�ʶ�ţ�</td>
		<td  class="text1">CNY</td>
	</tr>
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">���ķ���ʱ�䣺</td>
		<td  class="text1" width="150">${pvpform.workdate} </td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">���ķ���ʱ�䣺</td>
		<td  class="text1" width="150">${pvpform.creDtTm}</td>
	</tr>

	 <td  class="text_tablehead_b" align="right" class="text1" width="190" >���ҷ��ţ�</td>
		<td  class="text1" width="150">${pvpform.currency}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">����ۣ�</td>
		<td  class="text1" width="150">${pvpform.PurchsPric}</td>
	<tr>
		<td   class="text_tablehead_b" align="right" class="text1" width="190">������ı�ʶ�ţ�</td>
		<td class="text1">${pvpform.resultMsgID}</td>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">�������ʱ�䣺</td>
		<td  class="text1">ResultDtTm</td>
	</tr>
		
	<tr>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">��ע��</td>
		<td  class="text1">${pvpform.remarkinfo}</td>
		
	</tr>
    <tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190" >�����������</td>
		<td  class="text1" width="150">${pvpform.BuyAmt}</td>
		
	</tr>
	
	</table>
	</fieldset>
	
	
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >���������Ϣ</legend>
  	<table class="sample">
	
		<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">����ֱ�Ӳ��������</td>
		<td  class="text1" width="150">${pvpform.SendDrctPty} </td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">�����Ӳ������:</td>
		<td  class="text1" width="150">SendIndrctPty</td>
	</tr>
		
	
	
	</table>
	</fieldset>
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >���ջ�����Ϣ</legend>
  	<table class="sample">
	
		<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190">����ֱ�Ӳ��������</td>
		<td  class="text1" width="150">${pvpform.RecvDrctPty}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">���ռ�Ӳ��������</td>
		<td  class="text1" width="150">${pvpform.RecvIndrctPty}</td>
	</tr>
		
	
	
	</table>
	</fieldset>
	

	
	<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  				<legend >��Ա��Ϣ</legend>
  	<table class="sample">
	<tr>
		
		<td    class="text_tablehead_b" align="right" class="text1" width="190">ϵͳ��ţ�</td>
		<td  class="text1" width="150">${pvpform.systemCode}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">��ע��</td>
		<td  class="text1" width="150">${entity.RemarkInfo}</td>
	</tr>
	<tr>
		<td  class="text_tablehead_b" align="right" class="text1" width="190" >ҵ��״̬��</td>
		<td  class="text1" width="150">${hvpsfront141.PmtSts}</td>
		<td    class="text_tablehead_b" align="right" class="text1" width="190">ҵ�����룺</td>
		<td  class="text1" width="150">${hvpsfront141.ProCode}</td>
	</tr>
	<tr>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">�ܾ�ҵ��Ĳ�������кţ�</td>
		<td  class="text1">${entity.RjctBrchId}</td>
		<td   class="text_tablehead_b"  align="right" class="text1" width="190">�������ҵ��ܾ��룺</td>
		<td  class="text1">${entity.RjctRsn}</td>
	</tr>
	<tr>
		<td   class="text_tablehead_b" align="right" class="text1" width="190">ҵ��ܾ���Ϣ��</td>
		<td class="text1">${entity.RjctDesc}</td>
		<td   class="text_tablehead_b" align="right" class="text1" width="190">��̬���ڣ�</td>
		<td class="text1">${entity.ProDate}</td>
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
 