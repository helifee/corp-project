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
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
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
		<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			function viewbykeyfkrxx(id,pmtgrpid){
		var newurl = "<%=path %>/RegularDebitChildrenAction.do?method=queryList&syspara=fkrxx&id="+id+"&pmtgrpid="+pmtgrpid+"&checkflag=checkflag";
		viewDetailsByHeightWidth(newurl,'�������б�',300,'90%');	
		//viewDetails(newurl);
	}
			function commitForm(){
			 
			  	document.forms[0].submit();
			  
				
			}
			function selectDet(i){
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
			
		</script>
	</head>
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=02">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			
			<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">				
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF;" ><br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								<br></td>
								<td>
									<div align="center">
									<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
                				<tr>
                					<td colspan="6">
                						<div  class="text_title"><span class="text_blue2"> 
                						
                							ҵ����ϸ����
                						
                						</span></div>
                					</td>
                				</tr>
                			</table>
										<table width="95%" height="30" border="0" cellpadding="0"
											cellspacing="0" class="table_head" >
											
											<tr>
												<td height="30">
													<div align="center">
													<br/><br/><br/>
													<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
												<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
														<table >
														
  													
			                                     	<tr>
			                	                         <td  class="text_zcx">֧���������</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtgrpid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">ҵ������</td>
														<td  class="text1" width="150">&nbsp;
																 <c:if test="${entity.pmttp eq 'A100'}">��ͨ���</c:if>
											                  	 <c:if test="${entity.pmttp eq 'A108'}">�ֽ���</c:if>
												                  <c:if test="${entity.pmttp eq 'A109'}">ί���տ�(����)</c:if>
												                  <c:if test="${entity.pmttp eq 'A110'}">���ճи�(����)</c:if>
												                   <c:if test="${entity.pmttp eq 'A200'}">�м��ʽ�㻮</c:if>
												                   <c:if test="${entity.pmttp eq 'A202'}">���л�Ʊ</c:if>
												                  <c:if test="${entity.pmttp eq 'A112'}">�������</c:if>
												                  <c:if test="${entity.pmttp eq 'A101'}">�������ʽ�㻮)</c:if>
												                  <c:if test="${entity.pmttp eq 'A102'}">������</c:if>
												                  <c:if test="${entity.pmttp eq 'A104'}">�����ʽ���ǻ���</c:if>
												                  <c:if test="${entity.pmttp eq 'A301'}">�ɷ�ҵ��</c:if>
												                  <c:if test="${entity.pmttp eq 'A201'}">֧Ʊ</c:if>
												                   <c:if test="${entity.pmttp eq 'B100'}">��ͨ���</c:if>
												                   <c:if test="${entity.pmttp eq 'B104'}">�����ʽ��ǻ���</c:if>
												                   <c:if test="${entity.pmttp eq 'B307'}">�����ʽ��ծ�Ҹ���ǻ���</c:if>
												                     <c:if test="${entity.pmttp eq 'C102'}">���˴���ͨ��</c:if>
												                      <c:if test="${entity.pmttp eq 'D102'}">���˴���ͨ��</c:if>
												                      <c:if test="${entity.pmttp eq 'D200'}">ʵʱ����</c:if>
												                     <c:if test="${entity.pmttp eq 'C101'}">ʵʱ����</c:if>
												                     <c:if test="${entity.pmttp eq 'C210'}">н�𱨳�</c:if>
												                    <c:if test="${entity.pmttp eq 'C100'}">ʵʱ����</c:if>
												                    <c:if test="${entity.pmttp eq 'D100'}">ʵʱ���</c:if>
												                    <c:if test="${entity.pmttp eq 'D203'}">ʵʱͨ��Ʊ�ݽ���</c:if>
												                     <c:if test="${entity.pmttp eq 'E100'}">���ڴ���</c:if>
												                   <c:if test="${entity.pmttp eq 'F100'}">���ڽ��</c:if>
												                   <c:if test="${entity.pmttp eq 'C100'}">ʵʱ����</c:if>
								                    				<c:if test="${entity.pmttp eq 'D100'}">ʵʱ���</c:if>
														</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">ҵ������</td>
														<td  class="text1" width="150">&nbsp;
														
														
														
														<c:if test="${entity.pmtkd   eq '03401' }">֧Ʊ����</c:if>
														<c:if test="${entity.pmtkd   eq '03402' }">���л�Ʊ</c:if>
														<c:if test="${entity.pmtkd   eq '03403' }">��ҵ�жһ�Ʊ</c:if>
														<c:if test="${entity.pmtkd   eq '03404' }">���гжһ�Ʊ</c:if>
														<c:if test="${entity.pmtkd   eq '03405' }">��ҵ��Ʊ</c:if>
														<c:if test="${entity.pmtkd   eq '03406' }">���б�Ʊ</c:if>
														
															<c:if test="${entity.pmtkd   eq '00100' }">���</c:if>
															<c:if test="${entity.pmtkd   eq '00200' }">ˮů��</c:if>  
                                                            <c:if test="${entity.pmtkd   eq '00300' }">ú����</c:if>  
                                                            <c:if test="${entity.pmtkd   eq '00400' }">�绰��</c:if> 
                                                            <c:if test="${entity.pmtkd   eq '00500' }">ͨѶ��</c:if> 
                                                             <c:if test="${entity.pmtkd   eq '00600' }">���շ�</c:if> 
                                                            <c:if test="${entity.pmtkd   eq '00700' }">���ݹ����</c:if> 
                                                           <c:if test="${entity.pmtkd   eq '00800' }">��������</c:if> 
                                                            <c:if test="${entity.pmtkd   eq '00900' }">ѧ�̷�</c:if>
                                                             <c:if test="${entity.pmtkd   eq '01000' }">���ߵ��ӷ�</c:if>
                                                             <c:if test="${entity.pmtkd   eq '09001' }">����</c:if>
         			                                          <c:if test="${entity.pmtkd   eq '01100' }">��ҵ�������</c:if>
														 <c:if test="${entity.pmtkd   eq '01200' }">н�𱨳�</c:if>
														 <c:if test="${entity.pmtkd   eq '01300' }">���ƾ��</c:if>
														<c:if test="${entity.pmtkd   eq '01400' }">�ɷ�</c:if>
														
														
														
														
														
														
														
														
														
														</td>
														<td  class="text_zcx" align="right" class="text1" width="190" >����״̬</td>
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
	
	<tr>
			             	<td   class="text_zcx" align="right"  width="190">�տ����к�</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_zcx" align="right"  width="190">�տ�������</td>
														<td class="text1"  colspan="5">&nbsp;${entity.cdtrbrnchnm}</td>
														     </tr>
			               <tr>
			              <td   class="text_zcx"  align="right"  >��������</td>
																<td class="text1">
																	&nbsp;${entity.orgCode}
																</td>
														<td   class="text_zcx"  align="right" >ϵͳ���</td>
														<td  class="text1"  >&nbsp;
															<c:if test="${entity.systemcd eq 'HVPS'}">���</c:if>
															<c:if test="${entity.systemcd eq 'BEPS'}">С��</c:if>
														</td>
														<td   class="text_zcx"  align="right" class="text1" >ϵͳ����</td>
														<td  class="text1" >&nbsp;${entity.workdt}</td>
														<td   class="text_zcx"  align="right"  >ǩ��ģʽ</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.signmd eq '01'}">�ֽ�</c:if>
															<c:if test="${entity.signmd eq '02'}">����</c:if>
															<c:if test="${entity.signmd eq '03'}">ת��</c:if>
															<c:if test="${entity.signmd eq '04'}">����</c:if>
														</td>
						   </tr>
			               <tr>
			               			<td   class="text_zcx"  align="right">������ʶ</td>
														<td  class="text1" >&nbsp;<c:if test="${entity.chnlrmkid eq '1510'}">����</c:if></td>
							
														<td   class="text_zcx" align="right" class="text1" >���ִ���</td>
														<td class="text1" >&nbsp;${entity.currencycd}</td>
														<td   class="text_zcx"  align="right" class="text1" >�����</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
							              				</td>
														<td   class="text_zcx"  align="right" class="text1" >��&nbsp;&nbsp;&nbsp;&nbsp;��</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
			               </tr>
			                <tr>
			               		<td  class="text_zcx" align="right" class="text1" width="190" >ǩ����Ա</td>
														<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">ǩ���ն�</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtrmlid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">ǩ������</td>
														<td  class="text1" width="150">&nbsp;${entity.signeddt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">ǩ��ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtm}</td>
																               </tr>
																               <tr>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	��������
																</td>
																<td class="text1">
																	&nbsp;${entity.netgdt}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	�����
																</td>
																<td class="text1">
																	&nbsp;${entity.netgrnd}
																</td>
																<td class="text_zcx" align="right" class="text1"
																	width="190">
																	��������
																</td>
																<td class="text1" width="150">
																	&nbsp; ${entity.sttlmdt}
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
													<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">&nbsp;</td>
														<td  class="text1"colspan="3">&nbsp;${entity.ustrd}</td>
													</tr>
							 </table>
							
 								<div  style="width: 90%;" align="left">

															<div class="tabdetails" id="tabdetails"
																style="float: left; cursor: hand;background: #B3B3B3;"
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
															

														</div>
 
                                <div id="details" name="details" style="display:block;">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;"  >
											  		
											  	<table >
												
												
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">֤������</td>
													<td  class="text1" width="150">&nbsp;
														<c:if test="${entity.proposercerttp eq '01'}">���֤</c:if>
														<c:if test="${entity.proposercerttp eq '02'}">����֤</c:if>
														<c:if test="${entity.proposercerttp eq '03'}">ѧ��֤</c:if>
														<c:if test="${entity.proposercerttp eq '04'}">Ӫҵִ��</c:if>
														<c:if test="${entity.proposercerttp eq '05'}">��֯��������</c:if>
													</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">֤����</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercertid}</td>
													
												</tr>
												
												
												<tr>
													<td class="text_zcx"  align="right" class="text1" width="190">��ϵ�绰</td>
													<td class="text1" width="150">&nbsp;${entity.proposertel}</td>
														<td class="text_zcx"  align="right" class="text1" width="190">�ͻ���</td>
													<td class="text1" width="150">&nbsp;${entity.proposercstmrid}</td>
												</tr>
												
												<tr>
													<td class="text_zcx"  align="right" class="text1" width="190">�˻�����</td>
													<td class="text1" width="150">&nbsp;
														<c:if test="${entity.proposeraccttp eq 'AT00'}">�Թ��˻�</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT01'}">���˴��ǿ��˻�</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT02'}">���˽�ǿ��˻�</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT03'}">����</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT04'}">����</c:if>
													</td>
														
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >�տ����˺�</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtracct}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">�տ�������</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrnm}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">�տ��˵�ַ</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtraddr}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">�տ��˿������к�</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuer}</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">�տ��˿���������</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuernm}</td>
												</tr>
												<tr>
													<td   class="text_zcx" align="right" class="text1" width="190">�տ����к�</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_zcx" align="right" class="text1" width="190">�տ�������</td>
														<td class="text1" width="150">&nbsp;${entity.cdtrbrnchnm}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">�տ��������к�</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtrmmbid}</td>
												</tr>
												
												
												
												</table>
												</fieldset>
											</div>
											<div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				
										  	<table >
												
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190">�������˺�</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtracct}</td>
												<td    class="text_zcx" align="right" class="text1" width="190">����������</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtrnm}</td>
											</tr>
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190">�����˵�ַ</td>
												<td  class="text1" colspan="3">&nbsp;${entity.dbtraddr}</td>
												
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">�����˿������к�</td>
												<td  class="text1">&nbsp;${entity.dbtrissuer}</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">�����˿���������</td>
												<td  class="text1">&nbsp;${entity.dbtrissuernm}</td>
											</tr>
											<tr>
												<td   class="text_zcx" align="right" class="text1" width="190">�������к�</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_zcx" align="right" class="text1" width="190">����������</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">�����������к�</td>
												<td  class="text1" colspan="3">&nbsp;${entity.dbtrmmbid}</td>
											</tr>
											</table>
											</fieldset>
											</div>	
	

		                       
											
												<div id="details"  name="details" style="display: none;">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				
										  	<table >
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">�����</td>
													<td  class="text1" width="150">&nbsp;
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
													</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">�ܶ�</td>
														<td  class="text1" width="150">&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
											</tr>
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190" >������</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.servicecharge }"/>
												</td>
												<td    class="text_zcx" align="right" class="text1" width="190">�ʵ��</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.postage }"/>
												</td>
											</tr>
											<tr>
												<td   class="text_zcx"  align="right" class="text1" width="190">��ؼ���</td>
												<td  class="text1" width="150">&nbsp;
													<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.outstationcharge }"/>
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
												<td   class="text_zcx"  align="right" class="text1" width="190">����</td>
												<td  class="text1" width="150">&nbsp;
													<c:if test="${entity.waive eq 'Y'}">����</c:if>
													<c:if test="${entity.waive eq 'N'}">������</c:if>
												</td>
												 --%>
											</tr>
											</table>
											</fieldset>

                                       </div>

											
	                      
												<div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;height:150px;border:1px #CCCCCC solid; padding:3px;" align=center >
												  				
												  <table >
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
																			ǩ���ն˺�
																		</td>
																		<td class="text1" width="150">
																			&nbsp;${entity.signedtrmlid}
																		</td>
																	</tr>
																	<tr>
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
														<td  class="text_zcx" align="right" class="text1" width="190" >���˹�Ա</td>
														<td  class="text1" width="150">&nbsp;${entity.checkerid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">�����ն˺�</td>
														<td  class="text1" width="150">&nbsp;${entity.checkedtrmlid}</td>
													</tr>
													<tr>
														<td    class="text_zcx" align="right" class="text1" width="190">��������</td>
														<td  class="text1" width="150">&nbsp;${entity.checkeddt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">����ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.checkedtm}</td>
													</tr>
											 												 
												 
													 
												
													
													
													</table>
													</fieldset>
											</div>
											
											
                                              </div>
                                               
													 <br />
													 
												<br>
                                              </td>      
											</tr>
	 									</table>
													 </td>
											</tr>
										</table>
 
						
					<br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"><br></td>
	
				</tr>
			</table>
			 

 
			 
		 	</body>
</html>
