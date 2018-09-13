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
		<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			
			function commitForm(){
			  if(VForm.Validate()){
			  	if(document.getElementById('cdtrbrnchid').value!=document.getElementById("cdtrbrnchid1").value){
			  		alert("�տ����к���ԭҵ������кŲ�һ��");
			  		return false;
			  	}
			  	if(document.getElementById("amount").value!=document.getElementById("amount1").value){
			  		alert("�������ԭҵ���һ��");
			  		return false;
			  	}
			  	if(document.getElementById("cdtracct").value!=document.getElementById("cdtracct1").value){
			  		alert("�տ����˺���ԭҵ���տ����˺Ų�һ��");
			  		return false;
			  	}
			  	
			  	if(document.getElementById("signerid").value==document.getElementById("username").value){
			  	alert("������Ա������¼����Աһ��!");
			  	return false;
			  	
			  	}
			  	document.forms[0].submit();
			  }
				
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
		function save(systemcd){
		if(systemcd == "HVPS"){
		document.forms[0].action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=00";
	
	    
		}else{
		document.forms[0].action="<%=path%>/TransProcessAction.do?method=sendBepsCheckMessage&operway=00";
	
		}
		 commitForm();
		
	}
	function viewbykeyfkrxx(id,pmtgrpid){
		var newurl = "<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=fkrxx&id="+id+"&pmtgrpid="+pmtgrpid+"&fuhechax=0";
		viewDetails(newurl);
	}
			
		</script>
	</head>
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=00&systemcd=&{entity.}">
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
												���л�Ʊ��ϸҳ��
													
												</h4>
											</th>
											<tr>
											<td>
											<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;" align=center >
  												<legend >ҵ����Ϣ</legend>
  												<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd">
  													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">֧���������</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtgrpid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">ҵ�����ͱ���</td>
														<td  class="text1" width="150">&nbsp;
																<c:if test="${entity.pmttp eq 'A108'}">�ֽ���</c:if>
																<c:if test="${entity.pmttp eq 'A109'}">ί���տ�(����)</c:if>
																<c:if test="${entity.pmttp eq 'B100'}">��ͨ���ҵ��</c:if>
																<c:if test="${entity.pmttp eq 'C102'}">���˴���ͨ��ҵ��</c:if>
																<c:if test="${entity.pmttp eq 'D102'}">���˴���ͨ��ҵ��</c:if>
																<c:if test="${entity.pmttp eq 'E100'}">��ͨ���ڴ���ҵ��</c:if>
														</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ҵ���������</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtkd}</td>
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
															<c:if test="${entity.status eq 'PR91' }">������    </c:if>
															<c:if test="${entity.status eq 'PR92' }">�����    </c:if>
															<c:if test="${entity.status eq 'PR93' }">������    </c:if>
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
													<tr>
														<td   class="text_tablehead_b" align="right"  width="190">�տ����к�</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_tablehead_b" align="right"  width="190">�տ�������</td>
														<td class="text1"  colspan="5">&nbsp;${entity.cdtrbrnchnm}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right"  >�����</td>
														<td  class="text1"  >&nbsp;${entity.brnchid}</td>
														<td   class="text_tablehead_b"  align="right" >ϵͳ���</td>
														<td  class="text1"  >&nbsp;
															<c:if test="${entity.systemcd eq 'HVPS'}">���</c:if>
															<c:if test="${entity.systemcd eq 'BEPS'}">С��</c:if>
														</td>
														<td   class="text_tablehead_b"  align="right" class="text1" >ϵͳ������</td>
														<td  class="text1" >&nbsp;${entity.workdt}</td>
														<td   class="text_tablehead_b"  align="right"  >ǩ��ģʽ</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.signmd eq '01'}">�ֽ�</c:if>
															<c:if test="${entity.signmd eq '02'}">����</c:if>
															<c:if test="${entity.signmd eq '03'}">ת��</c:if>
															<c:if test="${entity.signmd eq '04'}">����</c:if>
														</td>
													</tr>
													<tr>
														<td  class="text_tablehead_b" align="right"  >���ı�ʶ��</td>
														<td  class="text1">&nbsp;${entity.msgid}</td>
														<td    class="text_tablehead_b" align="right" >��ִ���ı�ʶ��</td>
														<td  class="text1" colspan="5" >&nbsp;${entity.recptmsgid}</td>
														
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right">������ʶ��</td>
														<td  class="text1" >&nbsp;${entity.chnlid}</td>
														<td  class="text_tablehead_b" align="right" >�˵��˱�ʶ��</td>
														<td  class="text1" colspan="5">&nbsp;${entity.endtoendid}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" >���л�</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.bankcustomer eq 'Y'}">��</c:if>
															<c:if test="${entity.bankcustomer eq 'N'}">��</c:if>
														</td>
														<td   class="text_tablehead_b" align="right" class="text1" >���ִ���</td>
														<td class="text1" >&nbsp;${entity.currencycd}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" >�����</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
							              				</td>
														<td   class="text_tablehead_b"  align="right" class="text1" >�ܶ�</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
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
												<div style="float: left;width��40%;"><input type="button" value="�˶���Ϣ" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"onclick="selectDet(0)"/>|</div>
												<div style="float: left;width��40%;"><input type="button" value="��������Ϣ" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(1)"/>|</div>
												<div style="float: left;width��40%;"><input type="button" value="�տ�����Ϣ"style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(2)"/>|</div>
												<div style="float: left;width��40%;"><input type="button" value="�շ���Ϣ" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(3)"/>|</div>
												<div style="float: left;width��40%;">
													<c:if test="${entity.pmttp eq 'F100'}">
														<input type="button" value="��������Ϣ"style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="viewbykeyfkrxx('${entity.id}','${entity.pmtgrpid}')"/>
													</c:if>													
													<c:if test="${entity.pmttp != 'F100'}">
														<input type="button" value="��������Ϣ"style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(4)"/>
													</c:if>
												|</div>
												<div style="float: left;width��40%;"><input type="button" value="��Ա��Ϣ" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(5)"/>|</div>
												<div style="float: left;width��40%;"><input type="button" value="������Ϣ" style="border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(6)"/></div>
											
											<div id="details" name="details" style="display:block;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;"  >
											  		<legend >�˶���Ϣ</legend>	
											  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
												<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
												<input type="hidden" name="pmttp" value="${condition.pmttp }"/>
												<input type="hidden" name="username" id="username" value="${userentity.username}"/><!-- ��¼�� -->
												<input type="hidden" name="signerid" id="signerid" value="${entity.signerid}"/><!-- ǩ���� -->
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����</td>
													<td  class="text1" width="150">&nbsp;<input type="text" name="amount1" value='${entity.amount}' readonly="readonly"/></td>
													<td  class="text1" width="150">&nbsp;<input type="text" name="amount" value=""/>
													<span name="validate" dataName="amount" dataType="Empty" msg="������Ϊ�գ�" class="STYLE1">*</span>
													</td>
													
												</tr>
												<tr>
													<td  class="text_tablehead_b" align="right" class="text1" width="190" >�տ����˺�</td>
													<td  class="text1" width="150">&nbsp;<input type="text" name="cdtracct1" value='${entity.cdtracct}' readonly="readonly"/></td>
													<td  class="text1" width="150">&nbsp;<input type="text" name="cdtracct" value=""/>
													<span name="validate" dataName="cdtracct" dataType="Empty" msg="�տ����˺Ų���Ϊ�գ�" class="STYLE1">*</span></td>
												</tr>
												<tr>
													<td class="text_tablehead_b" align="right" class="text1" width="190">�տ����к�</td>
													<td class="text1" width="150">&nbsp;<input type="text" name="cdtrbrnchid1" value='${entity.cdtrbrnchid}' readonly="readonly"/></td>
													<td class="text1" width="150">&nbsp;<input type="text" name="cdtrbrnchid" value=""/>
													<span name="validate" dataName="cdtrbrnchid" dataType="Empty" msg="�տ����кŲ���Ϊ�գ�" class="STYLE1">*</span></td>
												</tr>
												</table>
												</fieldset>
											</div>
											
											
											<div id="details" name="details" style="display:none;">
												<fieldset style="width:780px;border:1px #CCCCCC solid; padding:3px;"  >
											  		<legend >��������Ϣ</legend>	
											  	<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" align="left">
												
												
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">������֤����</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercertid}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">������֤������</td>
													<td  class="text1" width="150">&nbsp;
														<c:if test="${entity.proposercerttp eq '01'}">���֤</c:if>
														<c:if test="${entity.proposercerttp eq '02'}">����֤</c:if>
														<c:if test="${entity.proposercerttp eq '03'}">ѧ��֤</c:if>
														<c:if test="${entity.proposercerttp eq '04'}">Ӫҵִ��</c:if>
														<c:if test="${entity.proposercerttp eq '05'}">��֯��������</c:if>
													</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">������֤�����й���</td>
													<td class="text1" width="150"  colspan="3">&nbsp;
														<c:if test="${entity.proposercertissued eq 'CN'}">�л����񹲺͹�</c:if>
													</td>
													
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
													<td class="text1" width="150">&nbsp;
														<c:if test="${entity.proposeraccttp eq 'AT00'}">�Թ��˻�</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT01'}">���˴��ǿ��˻�</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT02'}">���˽�ǿ��˻�</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT03'}">����</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT04'}">����</c:if>
													</td>
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
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_tablehead_b" align="right" class="text1" width="190">�տ�������</td>
														<td class="text1" width="150">&nbsp;${entity.cdtrbrnchnm}</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ��˿������к�</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuer}</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ��˿���������</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuernm}</td>
												</tr>
												<tr>
													<td  class="text_tablehead_b" align="right" class="text1" width="190" >�տ����˺�</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtracct}</td>
													<td    class="text_tablehead_b" align="right" class="text1" width="190">�տ�������</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrnm}</td>
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ��˵�ַ</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtraddr}</td>
													
												</tr>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�տ����������к�</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtrmmbid}</td>
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
													<td  class="text1" width="150">&nbsp;
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
													</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�ܶ�</td>
														<td  class="text1" width="150">&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
											</tr>
											<tr>
												<td  class="text_tablehead_b" align="right" class="text1" width="190" >������</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.servicecharge }"/>
												</td>
												<td    class="text_tablehead_b" align="right" class="text1" width="190">�ʵ��</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.postage }"/>
												</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">��ؼ���</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.outstationcharge }"/>
												</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">����</td>
												<td  class="text1" width="150">&nbsp;
													<c:if test="${entity.waive eq 'Y'}">����</c:if>
													<c:if test="${entity.waive eq 'N'}">������</c:if>
												</td>
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
												<td  class="text1" colspan="3">&nbsp;${entity.dbtraddr}</td>
												
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����˿������к�</td>
												<td  class="text1">&nbsp;${entity.dbtrissuer}</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����˿���������</td>
												<td  class="text1">&nbsp;${entity.dbtrissuernm}</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b" align="right" class="text1" width="190">�������к�</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_tablehead_b" align="right" class="text1" width="190">����������</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����������к�</td>
												<td  class="text1" colspan="3">&nbsp;${entity.dbtrmmbid}</td>
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
														<td class="text1" colspan="3">&nbsp;
															<c:if test="${entity.sttlmprty eq 'NORM'}">һ��</c:if>
															<c:if test="${entity.sttlmprty eq 'HIGH'}">�ؼ�</c:if>
															<c:if test="${entity.sttlmprty eq 'URGT'}">����</c:if>
														</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">����</td>
														<td  class="text1"colspan="3">&nbsp;${entity.ustrd}</td>
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
											class="button" value="��  ��" onclick="save('${entity.systemcd }')" />
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
