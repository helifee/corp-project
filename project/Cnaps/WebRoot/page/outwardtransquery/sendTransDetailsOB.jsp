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
		<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
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
				if(i==4){
					shownames();
				}
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
			function shownames(){//��ʾ����������
				if(document.getElementById("endrsrNm")!=null){
					var str = document.getElementById("endrsrNm").value;
					 var objName= str.split(',');
					
					 var tb = document.getElementById('gkzjgzdfjjhb_mx');
				     var rowNum=tb.rows.length;
				     for (i=0;i<rowNum;i++){
				         tb.deleteRow(i);
				         rowNum=rowNum-1;
				         i=i-1;
				     }
					 for(var i=0;i < objName.length;i++){
					     var newTr = this.document.getElementById("gkzjgzdfjjhb_mx").insertRow();
						 var newTd1 = newTr.insertCell();
						 var newTd2 = newTr.insertCell();
						
					     newTd1.className="text_zcx";
						 newTd1.innerHTML = "����������";
						 newTd2.className="";
						 newTd2.innerHTML = "<td class='text1' width='150'>&nbsp;"+objName[i]+"</td>";
					 }
				}
			}
			function imageScan(flag,imagepath,imagename){
				if(imagepath==null||imagepath==""){
					alert("�ļ�·��������");
					return;
				}
				if(imagename==null||imagename==""){
					alert("�ļ�������");
					return;
				}
				var path ='<%=path%>/ImageAction.do?method=imageDeal&flag='+flag+"&imagepath="+imagepath+"&imagename="+imagename;
				viewDetails(path,"ͼ��Ԥ��");
			}
		</script>
	</head>
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=02">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			

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
									<input type="hidden" name="systemcd"
																value="${entity.systemcd }" />
															<input type="hidden" name="pmtgrpid"
																value="${entity.pmtgrpid }" />
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
																	&nbsp;${entity.pmtgrpid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ҵ�����ͱ���
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${entity.pmttp eq 'A108'}">�ֽ���</c:if>
																	<c:if test="${entity.pmttp eq 'A110'}">���ճи�</c:if>
																	<c:if test="${entity.pmttp eq 'A109'}">ί���տ�(����)</c:if>
																	<c:if test="${entity.pmttp eq 'A101'}">�������ʽ�㻮</c:if>
																	<c:if test="${entity.pmttp eq 'A102'}">������</c:if>
																	<c:if test="${entity.pmttp eq 'A104'}">�����ʽ���ǻ���</c:if>
																	<c:if test="${entity.pmttp eq 'A301'}">�ɷ�ҵ��</c:if>
																	<c:if test="${entity.pmttp eq 'A201'}">֧Ʊ</c:if>
																	<c:if test="${entity.pmttp eq 'A100'}">��ͨ���</c:if>
																	<c:if test="${entity.pmttp eq 'A112'}">�������</c:if>
																	<c:if test="${entity.pmttp eq 'A200'}">�м��ʽ�㻮</c:if>
																	<c:if test="${entity.pmttp eq 'A202'}">���л�Ʊ</c:if>
																	<c:if test="${entity.pmttp eq 'A113'}">�羳֧��</c:if>

																	<c:if test="${entity.pmttp eq 'B100'}">��ͨ���ҵ��</c:if>
																	<c:if test="${entity.pmttp eq 'B104'}">�����ʽ��ǻ���</c:if>
																	<c:if test="${entity.pmttp eq 'B307'}">�����ʽ��ծ�Ҹ���ǻ���</c:if>
																	<c:if test="${entity.pmttp eq 'C102'}">���˴���ͨ��ҵ��</c:if>
																	<c:if test="${entity.pmttp eq 'D102'}">���˴���ͨ��ҵ��</c:if>
																	<c:if test="${entity.pmttp eq 'E100'}">��ͨ���ڴ���ҵ��</c:if>
																	<c:if test="${entity.pmttp eq 'B308'}">֧Ʊ����</c:if>
																	<c:if test="${entity.pmttp eq 'B309'}">Ʊ�ݽ���</c:if>
																	<c:if test="${entity.pmttp eq 'A113'}">�羳֧��</c:if>
																	<c:if test="${entity.pmttp eq 'C100'}">ʵʱ����</c:if>
								                    				<c:if test="${entity.pmttp eq 'D100'}">ʵʱ���</c:if>
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ҵ���������
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	<c:if test="${entity.pmtkd   eq '09001' }">����</c:if>
																	<c:if test="${entity.pmtkd   eq '03401' }">֧Ʊ����</c:if>
																	<c:if test="${entity.pmtkd   eq '03402' }">���л�Ʊ</c:if>
																	<c:if test="${entity.pmtkd   eq '03403' }">��ҵ�жһ�Ʊ</c:if>
																	<c:if test="${entity.pmtkd   eq '03404' }">���гжһ�Ʊ</c:if>
																	<c:if test="${entity.pmtkd   eq '03405' }">��ҵ��Ʊ</c:if>
																	<c:if test="${entity.pmtkd   eq '03406' }">���б�Ʊ</c:if>
																	
																	<c:if test="${entity.pmtkd   eq '02201' }">���뼶Ԥ������</c:if>
																	<c:if test="${entity.pmtkd   eq '02202' }">ʡ��Ԥ������</c:if>
																	<c:if test="${entity.pmtkd   eq '02203' }">���м�Ԥ������</c:if>
																	<c:if test="${entity.pmtkd   eq '02204' }">�ؼ�Ԥ������</c:if>
																	<c:if test="${entity.pmtkd   eq '02205' }">��ծ�Ҹ�</c:if>
																	

																</td>
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

															</tr>

															<tr>
																<td class="text_zcx" align="right" width="190">
																	�տ����к�
																</td>
																<td class="text1" width="150">
																	&nbsp;&nbsp;${entity.cdtrbrnchid}
																</td>
																<td class="text_zcx" align="right" width="190">
																	�տ�������
																</td>
																<td class="text1" colspan="5">
																	&nbsp;${entity.cdtrbrnchnm}
																</td>
															</tr>
															<tr>
																 <td   class="text_zcx"  align="right"  >��������</td>
																<td class="text1">
																	&nbsp;${entity.orgCode}
																</td>
																<td class="text_zcx" align="right">
																	ϵͳ���
																</td>
																<td class="text1">
																	&nbsp;
																	<c:if test="${entity.systemcd eq 'HVPS'}">���</c:if>
																	<c:if test="${entity.systemcd eq 'BEPS'}">С��</c:if>
																</td>
																<td class="text_zcx" align="right" class="text1">
																	ϵͳ����
																</td>
																<td class="text1">
																	&nbsp;${entity.workdt}
																</td>
																<td class="text_zcx" align="right">
																	ǩ��ģʽ
																</td>
																<td class="text1">
																	&nbsp;
																	<c:if test="${entity.signmd eq '01'}">�ֽ�</c:if>
																	<c:if test="${entity.signmd eq '02'}">����</c:if>
																	<c:if test="${entity.signmd eq '03'}">ת��</c:if>
																	<c:if test="${entity.signmd eq '04'}">����</c:if>
																</td>
															</tr>
															
															<tr>
																<td class="text_zcx" align="right">
																	������ʶ
																</td>
																<td class="text1">
																	&nbsp;
																	<c:if test="${entity.chnlrmkid eq '1510'}">����</c:if>
																</td>

																<td class="text_zcx" align="right" class="text1">
																	���ִ���
																</td>
																<td class="text1">
																	&nbsp;${entity.currencycd}
																</td>
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
																	��&nbsp;&nbsp;&nbsp;&nbsp;��
																</td>
																<td class="text1">
																	&nbsp;
																	<fmt:formatNumber
																		pattern="###,###,###,###,###,###,##0.00"
																		value="${entity.totalamt }" />
																</td>
																<!-- <td   class="text_zcx"  align="right" >���л�</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.bankcustomer eq 'Y'}">��</c:if>
															<c:if test="${entity.bankcustomer eq 'N'}">��</c:if>
														</td>-->

															</tr>
															<tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ǩ����Ա
																</td>
																<td class="text1" width="150">
																	&nbsp;${entity.signerid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ǩ���ն�
																</td>
																<td class="text1" width="150">
																	&nbsp;${entity.signedtrmlid}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ǩ������
																</td>
																<td class="text1" width="150">
																	&nbsp;${entity.signeddt}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	ǩ��ʱ��
																</td>
																<td class="text1" width="150">
																	&nbsp;${entity.signedtm}
																</td>
															</tr>
															<tr>
																<td class="text_zcx" align="right" class="text1">
																	��������
																</td>
																<td class="text1">
																	&nbsp;${entity.netgdt}
																</td>
																<td class="text_zcx" align="right" class="text1">
																	�����
																</td>
																<td class="text1">
																	&nbsp; ${entity.netgrnd }
																</td>
																<td class="text_zcx" align="right" class="text1">
																	��������
																</td>
																<td class="text1">
																	&nbsp; ${entity. sttlmdt}
																</td>
														   </tr>
															<tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	�������
																</td>
																<td class="text1" width="150">
																	&nbsp;
																	${entity.txid }
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	���ı�ʶ��
																</td>
																<td class="text1" width="150">
																	&nbsp;${entity.msgid }
																	
																</td>
															</tr>
															<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��&nbsp;&nbsp;&nbsp;&nbsp;��
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${entity.addtlinf}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��&nbsp;&nbsp;&nbsp;&nbsp;ע
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${entity.ustrd}
																		</td>
																	</tr>
															<!-- 
							 <tr>
			               	 	<td    class="text_zcx" align="right" class="text1" width="190">�ϴ�ά������Ա</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintainuserid}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">�ϴ�ά���ն˺�</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintaintrmlid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">�ϴ�ά������</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintaindt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">�ϴ�ά��ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.lstmaintaintm}</td>	
			               </tr>									 
			              
			               	<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">�ϴ�״̬����</td>
														<td  class="text1" width="150">&nbsp;${entity.lststatusdt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">�ϴ�״̬ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.lststatustm}</td>
													</tr> -->

															<tr>
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

														
														<div style="width: 90%;" align="left">

															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand; background: #B3B3B3;"
																onclick="selectDet(0)">
																�տ�����Ϣ
															</div>
															<c:if test="${entity.pmttp eq 'F100'}">
																<div class="tabdetails" id="tabdetails"
																	style="float: left; cursor: hand;"
																	onclick="viewbykeyfkrxx('${entity.id}','${entity.pmtgrpid}')">
																	��������Ϣ
																</div>

															</c:if>
															<c:if test="${entity.pmttp != 'F100'}">
																<div class="tabdetails" id="tabdetails"
																	style="float: left; cursor: hand;"
																	onclick="selectDet(1)">
																	��������Ϣ

																</div>
															</c:if>

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
																style="width: 90%; height: 150px; border: 1px #CCCCCC solid; padding: 3px;">

																<table>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			������֤������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<c:if test="${entity.proposercerttp eq '01'}">���֤</c:if>
																			<c:if test="${entity.proposercerttp eq '02'}">����֤</c:if>
																			<c:if test="${entity.proposercerttp eq '03'}">ѧ��֤</c:if>
																			<c:if test="${entity.proposercerttp eq '04'}">Ӫҵִ��</c:if>
														<c:if test="${entity.proposercerttp eq '05'}">��֯��������</c:if>
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			������֤����
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.proposercertid}
																		</td>
																		
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��������ϵ�绰
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.proposertel}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����˿ͻ���
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.proposercstmrid}
																		</td>
																	</tr>

																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�������˻�����
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<c:if test="${entity.proposeraccttp eq 'AT00'}">�Թ��˻�</c:if>
																			<c:if test="${entity.proposeraccttp eq 'AT01'}">���˴��ǿ��˻�</c:if>
																			<c:if test="${entity.proposeraccttp eq 'AT02'}">���˽�ǿ��˻�</c:if>
																			<c:if test="${entity.proposeraccttp eq 'AT03'}">����</c:if>
																			<c:if test="${entity.proposeraccttp eq 'AT04'}">����</c:if>
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�������˻�����
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.proposeracctccy}
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
																		<td class="text1" width="150" colspan="3">
																			&nbsp;${entity.cdtraddr}
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
																			�տ��������к�
																		</td>
																		<td class="text1" width="150" colspan="3">
																			&nbsp;${entity.cdtrmmbid}
																		</td>
																	</tr>
																</table>
															</fieldset>
														</div>
														<div id="details" name="details" style="display: none;">
															<fieldset
																style="width: 90%; height: 150px; border: 1px #CCCCCC solid; padding: 3px;"
																align=center>

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
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����˵�ַ
																		</td>
																		<td class="text1" colspan="3">
																			&nbsp;${entity.dbtraddr}
																		</td>

																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����˿������к�
																		</td>
																		<td class="text1">
																			&nbsp;${entity.dbtrissuer}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����˿���������
																		</td>
																		<td class="text1">
																			&nbsp;${entity.dbtrissuernm}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�������к�
																		</td>
																		<td class="text1">
																			&nbsp;${entity.dbtrbrnchid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			����������
																		</td>
																		<td class="text1">
																			&nbsp;${entity.dbtrbrnchnm}
																		</td>
																	</tr>
																	<tr>
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
																style="width: 90%; height: 150px; border: 1px #CCCCCC solid; padding: 3px;"
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
																				value="${entity.amount }" />
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�ܶ�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${entity.totalamt }" />
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
																				value="${entity.servicecharge }" />
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�ʵ��
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${entity.postage }" />
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
																				value="${entity.outstationcharge }" />
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<fmt:formatNumber
																				pattern="###,###,###,###,###,###,##0.00"
																				value="${entity.counterfoil }" />
																		</td>
																		<%--
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			����
																		</td>
																		<td class="text1" width="150">
																			&nbsp;
																			<c:if test="${entity.waive eq 'Y'}">����</c:if>
																			<c:if test="${entity.waive eq 'N'}">������</c:if>
																		</td>
																		 --%>
																	</tr>
																</table>
															</fieldset>

														</div>
														<div id="details" name="details" style="display: none;">
															<fieldset
																style="width: 90%; height: 150px; border: 1px #CCCCCC solid; padding: 3px;"
																align=center>

																<table>
																<tr>
																	<td  class="text_zcx" align="right" class="text1" width="190" >ǩ����Ա</td>
																	<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
																	<td    class="text_zcx" align="right" class="text1" width="190">ǩ���ն˺�</td>
																	<td  class="text1" width="150">&nbsp;${entity.signedtrmlid}</td>
																</tr>
																<tr>
																	<td    class="text_zcx" align="right" class="text1" width="190">ǩ������</td>
																	<td  class="text1" width="150">&nbsp;${entity.signeddt}</td>
																	<td   class="text_zcx"  align="right" class="text1" width="190">ǩ��ʱ��</td>
																	<td  class="text1" width="150">&nbsp;${entity.signedtm}</td>
																</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			���˹�Ա
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.checkerid}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			�����ն˺�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.checkedtrmlid}
																		</td>
																	</tr>
																	<tr>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			��������
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.checkeddt}
																		</td>
																		<td class="text_zcx" align="right" class="text1"
																			width="190">
																			����ʱ��
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.checkedtm}
																		</td>
																	</tr>
																</table>
															</fieldset>
														</div>

														<div id="details" name="details" style="display: none">
															<fieldset
																style="width: 90%; height: 150px; border: 1px #CCCCCC solid; padding: 3px;"
																>
																<table>
																<c:choose>
																		
																		<c:when test="${entity.pmttp eq 'B308'}">
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
																					��ʾ��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.payDt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ�ݺ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.notesnum}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��;
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.purpose}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.numOfEndrsr}
																				</td>
																			</tr>
																			
																			<tr>
																				<td class="text_zcx" width="230">
																					&nbsp;
																					
																						&nbsp;&nbsp;&nbsp;<table id="gkzjgzdfjjhb_mx" border="0" cellpadding="0" cellspacing="0" >
																		              	 <tr align="right">
																		                </tr>
																	                </table>
																				</td>
																				<td class="text1" width="150">
																					&nbsp;
																					<input type="hidden" name="endrsrNm" id="endrsrNm" value="${addentity.endrsrNm}"/>
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ��ͼ��·��
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.imagepath}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ��ͼ������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.imagename}
																				<br></td>
																			</tr>
																			<tr>
																			<td class="text_zcx" align="right" class="text1"
																					width="190">
																				Ʊ��ͼ��Ԥ��
																				<br></td>
																				<td>
																					 <input name="photo" type="button" style="cursor: pointer" class="button"
																value="Ʊ������" onclick="imageScan('front','${addentity.imagepath}','${addentity.imagename}')" />
																<input name="photo" type="button" style="cursor: pointer" class="button"
																value="Ʊ�ݱ���" onclick="imageScan('back','${addentity.imagepath}','${addentity.imagename}')" />
																				</td>
																			</tr>
																		</c:when>
																		<c:when test="${entity.pmttp eq 'B309'}">
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
																					��ʾ��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.payDt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.issueAmt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.maturityDt}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ��Ѻ
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.billSeal}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ж�Э����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.accptncagrmntNo}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ж�����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.accptncDt}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					�ж���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.accptncNm}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ������������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.applyNm}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ���������˺�
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.applyAcct}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ��ȫ��
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.drawerNm}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��Ʊ���˺�
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.drawerAcct}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					���׺�ͬ����
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.trnsctnCntrctNo}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					ԭ�տ�������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.oriCrdtrNm}
																				<br></td>
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ�ݺ���
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.notesnum}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��;
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.purpose}
																				<br></td>
																			</tr>

																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					��������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.numOfEndrsr}
																				<br></td>
																				
																			</tr>
																			<tr>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ��ͼ��·��
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.imagepath}
																				<br></td>
																				<td class="text_zcx" align="right" class="text1"
																					width="190">
																					Ʊ��ͼ������
																				<br></td>
																				<td class="text1" width="150">
																					&nbsp;${addentity.imagename}
																				<br></td>
																			</tr>
																			<tr>
																			<td class="text_zcx" align="right" class="text1"
																					width="190">
																				Ʊ��ͼ��Ԥ��
																				<br></td>
																				<td>
																					 <input name="photo" type="button" style="cursor: pointer" class="button"
																value="Ʊ������" onclick="imageScan('front','${addentity.imagepath}','${addentity.imagename}')" />
																<input name="photo" type="button" style="cursor: pointer" class="button"
																value="Ʊ�ݱ���" onclick="imageScan('back','${addentity.imagepath}','${addentity.imagename}')" />
																				</td>
																			</tr>
																			<tr>
																				<td class="text_zcx" >
																					&nbsp;
																					
																						&nbsp;&nbsp;&nbsp;<table id="gkzjgzdfjjhb_mx" border="0" cellpadding="0" cellspacing="0" >
																		              	 <tr align="right">
																		                </tr>
																	                </table>
																				</td>
																				<td class="text1" width="150">
																					&nbsp;
																					<input type="hidden" name="endrsrNm" id="endrsrNm" value="${addentity.endrsrNm}"/>
																				<br></td>
																			</tr>

																		</c:when>
																		<c:when test="${entity.pmttp eq 'B104'}">
																			 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >��ϸ���ܽ��</td>
								<td  class="text1" width="150">&nbsp;
									<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addentity.dtlsmmryamt }"/>
								</td>
									<td    class="text_zcx" align="right" class="text1" width="190">��Ϣ��ˮ��</td>
								<td  class="text1" width="150">&nbsp;${addentity.flowno}</td>
					</tr>
					 <tr>
					 			<td    class="text_zcx" align="right" class="text1" width="190">�ϱ��������</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtcd}</td>
								<td  class="text_zcx" align="right" class="text1" width="190" >���չ������</td>
								<td  class="text1" width="150">&nbsp;${addentity.rcvcd}</td>
								
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >�������</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtnum}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">��������</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtforms}</td>
								
					</tr>
					<tr>
								<td    class="text_zcx" align="right" class="text1" width="190">Ԥ�㼶��</td>
								<td  class="text1" width="150">&nbsp;
									<c:if test="${addentity.budgetlevel eq 'BL00'}">����</c:if>
									<c:if test="${addentity.budgetlevel eq 'BL01'}">ʡ��</c:if>
								</td>
								<td    class="text_zcx" align="right" class="text1" width="190">Ԥ������</td>
								<td  class="text1" width="150">&nbsp;
									<c:if test="${addentity.budgettp eq 'BT00'}">Ԥ����</c:if>
									<c:if test="${addentity.budgettp eq 'BT01'}">Ԥ����</c:if>
								</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >�����ڱ�־</td>
								<td  class="text1" width="150">&nbsp;
									<c:if test="${addentity.indicator eq 'ID00'}">����</c:if>
									<c:if test="${addentity.indicator eq 'ID01'}">������</c:if>
								</td>
								<td    class="text_zcx" align="right" class="text1" width="190">��ϸ����</td>
								<td  class="text1" width="150">&nbsp;${addentity.numoftrnsctns}</td>
					</tr>
					<tr>
						<td colspan="4">
							<table>
								<tr>
									<td  class="text_zcx" align="right" class="text1" width="190" >���ջ��ش������</td>
									<td  class="text_zcx" align="right" class="text1" width="190" >Ԥ���Ŀ����</td>
									<td class="text_zcx" align="right" class="text1" width="190">������</td>
								</tr>
								<c:forEach items="${TreasuryTransferList}" var="addinfodetails">
								
								<tr>
									
										<td  class="text_zcx" width="190">&nbsp;
										<c:if test="${addinfodetails.typecd eq '1111111111'}">��˰</c:if>
										<c:if test="${addinfodetails.typecd eq '2222222222'}">��˰</c:if>
										<c:if test="${addinfodetails.typecd eq '3333333333'}">����</c:if>
										<c:if test="${addinfodetails.typecd eq '4444444444'}">����</c:if>
										<c:if test="${addinfodetails.typecd eq '5555555555'}">����</c:if>
										</td>
									
										<td  class="text_zcx" width="190">&nbsp;${addinfodetails.sbjctcd}</td>
								
										<td  class="text_zcx" width="190">&nbsp;
											<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addinfodetails.occrrdamt }"/>
										</td>
								</tr>	
								</c:forEach>
							</table>
						</td>
					</tr>
               </c:when>
               
               
               <c:when test="${entity.pmttp eq 'B307'}">
																			 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >��ϸ���ܽ��</td>
								<td  class="text1" width="150">&nbsp;
									<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addentity.dtlsmmryamt }"/>
								</td>
								<td    class="text_zcx" align="right" class="text1" width="190">��Ϣ��ˮ��</td>
								<td  class="text1" width="150">&nbsp;${addentity.flowno}</td>
								
					</tr>
					 <tr>
								 <td    class="text_zcx" align="right" class="text1" width="190">�ϱ��������</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtcd}</td>
								<td  class="text_zcx" align="right" class="text1" width="190" >���չ������</td>
								<td  class="text1" width="150">&nbsp;${addentity.rcvcd}</td>
								
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >�������</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtnum}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">��������</td>
								<td  class="text1" width="150">&nbsp;${addentity.rprtforms}</td>
								
					</tr>
					<tr>
						<td    class="text_zcx" align="right" class="text1" width="190">��ϸ����</td>
								<td  class="text1" width="150">&nbsp;${addentity.numoftrnsctns}</td>
					</tr>
					
					<tr>
						<td colspan="4">
							<table>
								<tr>
									<td  class="text_zcx" align="right" class="text1" width="190" >�Ҹ���ծ���д���</td>
									<td  class="text_zcx" align="right" class="text1" width="190" >�������</td>
									<td class="text_zcx" align="right" class="text1" width="190">������</td>
									<td class="text_zcx" align="right" class="text1" width="190">��Ϣ����</td>
									<td class="text_zcx" align="right" class="text1" width="190">��Ϣ���</td>
								</tr>
								<c:forEach items="${TreasuryTransferList}" var="addinfodetails">
								
								<tr>
									
										<td  class="text_zcx" width="190">&nbsp;
										<c:if test="${addinfodetails.typecd eq '111111111111'}">����</c:if>
										<c:if test="${addinfodetails.typecd eq '222222222222'}">����</c:if>
										<c:if test="${addinfodetails.typecd eq '333333333333'}">ũ��</c:if>
										<c:if test="${addinfodetails.typecd eq '444444444444'}">����</c:if>
										<c:if test="${addinfodetails.typecd eq '555555555555'}">����</c:if>
										<c:if test="${addinfodetails.typecd eq '666666666666'}">����</c:if>
										<c:if test="${addinfodetails.typecd eq '777777777777'}">����</c:if>
										</td>
									
										<td  class="text_zcx" width="190">&nbsp;${addinfodetails.cptlcd}</td>
								
										<td  class="text_zcx" width="190">&nbsp;
											<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addinfodetails.cptlamt }"/>
										</td>
										<td  class="text_zcx" width="190">&nbsp;${addinfodetails.accrlcd}</td>
								
										<td  class="text_zcx" width="190">&nbsp;
											<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${addinfodetails.accrlamt }"/>
										</td>
								</tr>	
								</c:forEach>
							</table>
						</td>
					</tr>
               </c:when>
               <c:when test="${entity.pmttp eq 'E100'}">
               <tr>
               	<td colspan="4">
               		<table>
               			 <tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">¼���ܱ���</td>
												<td  class="text1" width="150">&nbsp;${entity.nbOfTxs }
												</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">¼���ܽ��</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.aclmtamt }"/>
												</td>
											</tr>
               		</table>
               	</td>
               </tr>
               </c:when>
               
               
               
               
																		
																</c:choose>
																</table>
															</fieldset>
														</div>
													</div>
													<br>
						<br>
												</td>
											</tr>
											
										</table>



									</div>
								</td>
							</tr>
						</table>

						<br>
					</td>
					<td
						style="FILTER: progid : DXImageTransform . Microsoft . Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #FFFFFF);">
						
				<br>
					</td>

				</tr>
				
			</table>
	</body>
</html>
