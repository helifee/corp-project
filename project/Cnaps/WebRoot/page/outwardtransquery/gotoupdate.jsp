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
		<link href="<%=path%>/css/page_color.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
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
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=tranUpdate">
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
												<h4 align="center">
												ҵ��ά������
													
												</h4>
											</th>
											<tr>
											<td>
											<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  												<legend >ҵ����Ϣ</legend>
  												<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd">
  												<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
												<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
  													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">֧���������</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtgrpid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">ҵ�����ͱ���</td>
														<td  class="text1" width="150">&nbsp;${entity.pmttp}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ҵ���������</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtkd}</td>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >����״̬</td>
														<td  class="text1" width="150">&nbsp;${entity.status}</td>
														
													</tr>
													<tr>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">�տ����к�</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">�տ�������</td>
														<td class="text1" width="150">&nbsp;${entity.cdtrbrnchnm}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����</td>
														<td  class="text1" width="150">&nbsp;${entity.brnchid}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ϵͳ���</td>
														<td  class="text1" width="150">&nbsp;${entity.systemcd}</td>
														
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190">���ı�ʶ��</td>
														<td  class="text1" width="150">&nbsp;${entity.msgid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">��ִ���ı�ʶ��</td>
														<td  class="text1" width="150">&nbsp;${entity.recptmsgid}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">������ʶ��</td>
														<td  class="text1" width="150">&nbsp;${entity.chnlid}</td>
														<td  class="text_tablehead_b" align="right" class="text1" width="190">�˵��˱�ʶ��</td>
														<td  class="text1" width="150">&nbsp;${entity.endtoendid}</td>
														
													</tr>
													<tr>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">���ִ���</td>
														<td class="text1" width="150">&nbsp;${entity.currencycd}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����</td>
														<td  class="text1" width="150">&nbsp;${entity.amount}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ϵͳ������</td>
														<td  class="text1" width="150">&nbsp;${entity.workdt}</td>
															<td   class="text_tablehead_b"  align="right" class="text1" width="190">�ܶ�</td>
														<td  class="text1" width="150">&nbsp;${entity.totalamt}</td>
													</tr>
													<tr>
													
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">���л�</td>
														<td  class="text1" width="150">&nbsp;${entity.bankcustomer}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ǩ��ģʽ</td>
														<td  class="text1" width="150">&nbsp;${entity.signmd}</td>
														<td colspan="4">&nbsp;</td>
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >ǩ����Ա</td>
														<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">ǩ���ն˺�</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtrmlid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">ǩ������</td>
														<td  class="text1" width="150">&nbsp;${entity.signeddt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ǩ��ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtm}</td>
													</tr>
													<tr>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">�ϴ�ά������Ա</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintainuserid}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">�ϴ�ά���ն˺�</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintaintrmlid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">�ϴ�ά������</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintaindt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">�ϴ�ά��ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintaintm}</td>
												</tr>
												<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">�ϴ�״̬����</td>
														<td  class="text1" width="150">&nbsp;${entity.lststatusdt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">�ϴ�״̬ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.lststatustm}</td>
													</tr>
  												</table>
  											</fieldset>
											</td>
											</tr>
											<tr>
											<td>
											
												<div style="width:780px;"  align="center" >
												<div style="float: left;width��40%;"><input type="button" value="��������Ϣ" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(0)"/>|</div>
												<div style="float: left;width��40%;"><input type="button" value="�տ�����Ϣ"style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(1)"/>|</div>
												<div style="float: left;width��40%;"><input type="button" value="�շ���Ϣ" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(2)"/>|</div>
												<div style="float: left;width��40%;"><input type="button" value="��������Ϣ"style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(3)"/>|</div>
												<div style="float: left;width��40%;"><input type="button" value="��Ա��Ϣ" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(4)"/>|</div>
												<div style="float: left;width��40%;"><input type="button" value="������Ϣ" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(5)"/></div>
											
											
											
											
											<div id="details" name="details" style="display:none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;"  >
											  		<legend >��������Ϣ</legend>	
											  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												
												
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">������֤����</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercertid}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">������֤������</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercerttp}</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">������֤�����й���</td>
													<td class="text1" width="150"  colspan="3">&nbsp;${entity.proposercertissued}</td>
													
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�������˺�</td>
													<td  class="text1" width="150">&nbsp;${entity.proposeracct}</td>
													<td class="text_tablehead_b"  align="right" class="text1" width="190">����������</td>
													<td class="text1" width="150">&nbsp;${entity.proposernm}</td>
												</tr>
												<tr>
													<td class="text_tablehead_b"  align="right" class="text1" width="190">��������ϵ�绰</td>
													<td class="text1" width="150">&nbsp;${entity.proposertel}</td>
														<td class="text_tablehead_b"  align="right" class="text1" width="190">�����˿ͻ���</td>
													<td class="text1" width="150">&nbsp;${entity.proposercstmrid}</td>
												</tr>
												<tr>
													<td class="text_tablehead_b"  align="right" class="text1" width="190">�����˵�ַ</td>
													<td class="text1" width="150" colspan="3">&nbsp;${entity.proposeraddr}</td>
												</tr>
												<tr>
													<td class="text_tablehead_b"  align="right" class="text1" width="190">�������˻�����</td>
													<td class="text1" width="150">&nbsp;${entity.proposeraccttp}</td>
														<td class="text_tablehead_b"  align="right" class="text1" width="190">�������˻�����</td>
													<td class="text1" width="150">&nbsp;${entity.proposeracctccy}</td>
												</tr>
												</table>
												</fieldset>
											</div>
											<div id="details" name="details" style="display: none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				<legend >�տ�����Ϣ</legend>
											  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												<tr>
													<td   class="text_tablehead_b" align="right" class="text1" width="190">�տ����к�</td>
														<td><input type="text" value="${entity.cdtrbrnchid}" name="cdtrbrnchid"></td>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">�տ�������</td>
														<td><input type="text" value="${entity.cdtrbrnchnm}" name="cdtrbrnchnm"></td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ��˿������к�</td>
													<td><input type="text" value="${entity.cdtrissuer}" name="cdtrissuer"></td>
													
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ��˿���������</td>
													<td><input type="text" value="${entity.cdtrissuer}" name="cdtrissuer"></td>
												</tr>
												<tr>
													<td  class="text_tablehead_b" align="right" class="text1" width="190" >�տ����˺�</td>
													<td><input type="text" value="${entity.cdtracct}" name="cdtracct"></td>
													
													<td    class="text_tablehead_b" align="right" class="text1" width="190">�տ�������</td>
													<td><input type="text" value="${entity.cdtrnm}" name="cdtrnm"></td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ��˵�ַ</td>
													<td><input type="text" value="${entity.cdtraddr}" name="cdtraddr"></td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ����������к�</td>
													<td><input type="text" value="${entity.cdtrmmbid}" name="cdtrmmbid"></td>
												</tr>
												</table>
												</fieldset>
											</div>
											<div id="details"  name="details" style="display: none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				<legend >�շѽ��</legend>
										  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����</td>
													<td  class="text1" width="150">&nbsp;${entity.amount}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�ܶ�</td>
														<td  class="text1" width="150">&nbsp;${entity.totalamt}</td>
											</tr>
											<tr>
												<td  class="text_tablehead_b" align="right" class="text1" width="190" >������</td>
												<td  class="text1" width="150">&nbsp;${entity.servicecharge}</td>
												<td    class="text_tablehead_b" align="right" class="text1" width="190">�ʵ��</td>
												<td  class="text1" width="150">&nbsp;${entity.postage}</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">��ؼ���</td>
												<td  class="text1" width="150">&nbsp;${entity.outstationcharge}</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">����</td>
												<td  class="text1" width="150">&nbsp;${entity.waive}</td>
											</tr>
											</table>
											</fieldset>
											</div>
											<div id="details" name="details" style="display: none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				<legend >��������Ϣ</legend>
										  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												
											<tr>
												<td  class="text_tablehead_b" align="right" class="text1" width="190">�������˺�</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtracct}</td>
												<td    class="text_tablehead_b" align="right" class="text1" width="190">����������</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtrnm}</td>
											</tr>
											<tr>
												<td  class="text_tablehead_b" align="right" class="text1" width="190">�����˵�ַ</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtraddr}</td>
												
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����˿������к�</td>
												<td  class="text1">&nbsp;${entity.dbtrissuer}</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">�������������к�</td>
												<td  class="text1">&nbsp;${entity.dbtrmmbid}</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b" align="right" class="text1" width="190">�������к�</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_tablehead_b" align="right" class="text1" width="190">����������</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>
											</tr>
											
											</table>
											</fieldset>
											</div>	
											
											<div id="details" name="details" style="display: none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
												  				<legend >��Ա��Ϣ</legend>
												  <table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >���˹�Ա</td>
														<td  class="text1" width="150">&nbsp;${entity.checkerid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">�����ն˺�</td>
														<td  class="text1" width="150">&nbsp;${entity.checkedtrmlid}</td>
													</tr>
													<tr>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">��������</td>
														<td  class="text1" width="150">&nbsp;${entity.checkeddt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">����ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.checkedtm}</td>
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >��˹�Ա</td>
														<td  class="text1" width="150">&nbsp;${entity.approvalid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">����ն˺�</td>
														<td  class="text1" width="150">&nbsp;${entity.approvedtrmlid}</td>
													</tr>
													<tr>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">�������</td>
														<td  class="text1" width="150">&nbsp;${entity.approveddt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">���ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.approvedtm}</td>
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >������Ա</td>
														<td  class="text1" width="150">&nbsp;${entity.authenticateid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">�����ն˺�</td>
														<td  class="text1" width="150">&nbsp;${entity.authenticatedtrmlid}</td>
													</tr>
													<tr>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">��������</td>
														<td  class="text1" width="150">&nbsp;${entity.authenticateddt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">����ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.authenticatedtm}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ҵ�����ȼ�</td>
														<td class="text1" width="150">&nbsp;${entity.sttlmprty}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">����</td>
														<td  class="text1" width="150">&nbsp;${entity.ustrd}</td>
													</tr>
													
													
													</table>
													</fieldset>
											</div>
											
											<div id="details" name="details" style="display: none">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				<legend >������Ϣ</legend>
											  <table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												
												<tr>
													<td  class="text_tablehead_b" align="right" class="text1" width="190" >ƾ֤����</td>
													<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
													<td    class="text_tablehead_b" align="right" class="text1" width="190">ƾ֤��</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">ƾ֤��������</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherpswdtp}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">ƾ֤����</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherpswd}</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">ƾ֤ǩ������</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherissuedt}</td>
												
												</tr>
												<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">Ʊ������</td>
														<td  class="text1" width="150">&nbsp;${entity.notestp}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">Ʊ������</td>
														<td  class="text1" width="150">&nbsp;${entity.notesdt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">Ʊ�ݺ���</td>
														<td  class="text1" width="150">&nbsp;${entity.notesno}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">�⳥����</td>
														<td  class="text1" width="150">&nbsp;${entity.amndsamt}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">�ܸ����</td>
														<td  class="text1" width="150">&nbsp;${entity.rjctamt}</td>
													</tr>
												</table>
												</fieldset>
											</div>	
											</div>
												</td>
											</tr>
											<tr>
												<td>&nbsp;</td>
											</tr>
										</table>


										<br />
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="��  ��" onclick="history.back();" />
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
