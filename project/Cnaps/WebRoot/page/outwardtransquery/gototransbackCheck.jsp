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
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
			
			<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	 
	   <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
       <script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>

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
		function save(systemcd){
		if(systemcd == "HVPS"){
		document.forms[0].action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=00";
	
	    
		}else{
		document.forms[0].action="<%=path%>/TransProcessAction.do?method=sendBepsCheckMessage&operway=00";
	
		}
		 commitForm();
		
	}
	function viewbykeyfkrxx(id,pmtgrpid){
		var newurl = "<%=path %>/RegularDebitChildrenAction.do?method=queryList&syspara=fkrxx&id="+id+"&pmtgrpid="+pmtgrpid+"&checkflag=checkflag";
		viewDetails(newurl);
	}
	
	
	
	function ifpass(){
	var val = document.getElementById("yztg").value;
	  if(val=='Y'){
	  $("#backreason").val("");
	  $("#backreason").attr("readonly",true);
	  }else{
	   $("#backreason").attr("readonly",false);
	  }
	}
			
		</script>
	</head>
	<body > 
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=01">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			
			<!--================================================================================-->
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
                						
                							ҵ��ȡ����˽���
                						
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
														<table >
			           	<tr>
			                	                         <td  class="text_zcx">֧���������</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtgrpid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">ҵ�����ͱ���</td>
														<td  class="text1" width="150">&nbsp;
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
																<c:if test="${entity.pmttp eq 'C102'}">���˴���ͨ��ҵ��</c:if>
																<c:if test="${entity.pmttp eq 'D102'}">���˴���ͨ��ҵ��</c:if>
																<c:if test="${entity.pmttp eq 'E100'}">��ͨ���ڴ���ҵ��</c:if>
																<c:if test="${entity.pmttp eq 'B308'}">֧Ʊ����</c:if>
																<c:if test="${entity.pmttp eq 'B309'}">Ʊ�ݽ���</c:if>
																<c:if test="${entity.pmttp eq 'A113'}">�羳֧��</c:if>
														</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">ҵ���������</td>
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
																	<c:if test="${entity.pmtkd eq'01400'}">�ɷ�ҵ��	</c:if>
														
														
														
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
			              <td   class="text_zcx"  align="right"  >�����</td>
														<td  class="text1"  >&nbsp;${entity.brnchid}</td>
														<td   class="text_zcx"  align="right" >ϵͳ���</td>
														<td  class="text1"  >&nbsp;
															<c:if test="${entity.systemcd eq 'HVPS'}">���</c:if>
															<c:if test="${entity.systemcd eq 'BEPS'}">С��</c:if>
														</td>
														<td   class="text_zcx"  align="right" class="text1" >ϵͳ������</td>
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
			               	 	<td   class="text_zcx"  align="right" >���л�</td>
														<td  class="text1" >&nbsp;
															<c:if test="${entity.bankcustomer eq 'Y'}">��</c:if>
															<c:if test="${entity.bankcustomer eq 'N'}">��</c:if>
														</td>
														<td   class="text_zcx" align="right" class="text1" >���ִ���</td>
														<td class="text1" >&nbsp;${entity.currencycd}</td>
														<td   class="text_zcx"  align="right" class="text1" >�����</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount }"/>
							              				</td>
														<td   class="text_zcx"  align="right" class="text1" >�ܶ�</td>
														<td  class="text1" >&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt }"/>
														</td>
			               </tr>
			                <tr>
			               		<td  class="text_zcx" align="right" class="text1" width="190" >ǩ����Ա</td>
														<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">ǩ���ն˺�</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtrmlid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">ǩ������</td>
														<td  class="text1" width="150">&nbsp;${entity.signeddt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">ǩ��ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtm}</td>
																               </tr>
							
			            
			            <tr>
																		
<table> 




 <tr>
								<td style="width:14%;">
										<input type="button" value="�˶���Ϣ"   style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"
  onclick="selectDet(0)"/>
								</td>
								<td style="width:1%;">|
								</td>
								
									
										
												<td style="width:14%;">
									
									<input type="button" value="�տ�����Ϣ"  style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"
  onclick="selectDet(1)"/>
										
									</td>
									
								<td style="width:1%;">|
								</td>
											<td style="width:14%;">											
											
								<input type="button" value="�շ���Ϣ"   style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"
  onclick="selectDet(2)"/>	
											
											</td>	<td style="width:1%;">|
								</td>
												<td style="width:14%;">
								 
													<c:if test="${entity.pmttp eq 'F100'}">
														<input type="button" value="��������Ϣ"style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="viewbykeyfkrxx('${entity.id}','${entity.pmtgrpid}')"/>
													</c:if>													
													<c:if test="${entity.pmttp != 'F100'}">
														<input type="button" value="��������Ϣ"style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(3)"/>
													</c:if>
												
											
											
											</td>	
											<td style="width:1%;">|
								</td>
											<td style="width:14%;">
									 <input type="button" value="��Ա��Ϣ" style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(4)"/>
											
													<td style="width:1%;">|</td>
											
											<td style="width:14%;">
									 <input type="button" value="������Ϣ" style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(5)"/>	
											
											</td>
											</tr>
									 

                      </table>
 
 
 <!-- ================ -->											
		
  
 
     <div id="details" name="details" style="display:block;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;bgcolor="E6E6E6"  >
												
									 	
											  		<legend >�˶���Ϣ</legend>	
											  	<table >
												<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
												<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
												<input type="hidden" name="pmttp" value="${condition.pmttp }"/>
												<input type="hidden" name="username" id="username" value="${userentity.username}"/><!-- ��¼�� -->
												<input type="hidden" name="signerid" id="signerid" value="${entity.signerid}"/><!-- ǩ���� -->
													<tr>
													<td>
													<input type="hidden" name="passno" value="N" >
													</td>
													
													<td class="text_tablehead_b" align="right" width="190">�˻�ԭ��:</td>
													<td width="150">
													<textarea id="backreason" name="backreason"  rows="2" cols="30" ></textarea>
													</td>
												</tr>
												
												
												
												</table>
												</fieldset>
											</div>
 
 
 
 
                              
	
	
		                        <div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				<legend >�տ�����Ϣ</legend>
											  	<table >
												<tr>
													<td   class="text_zcx" align="right" class="text1" width="190">�տ����к�</td>
														<td class="text1" width="150">&nbsp;&nbsp;${entity.cdtrbrnchid}</td>
														<td   class="text_zcx" align="right" class="text1" width="190">�տ�������</td>
														<td class="text1" width="150">&nbsp;${entity.cdtrbrnchnm}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">�տ��˿������к�</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuer}</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">�տ��˿���������</td>
													<td  class="text1" width="150">&nbsp;${entity.cdtrissuernm}</td>
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
													<td   class="text_zcx"  align="right" class="text1" width="190">�տ����������к�</td>
													<td  class="text1" width="150" colspan="3">&nbsp;${entity.cdtrmmbid}</td>
												</tr>
												</table>
												</fieldset>
											</div>
											
												<div id="details"  name="details" style="display: none;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				<legend >�շѽ��</legend>
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
												<td   class="text_zcx"  align="right" class="text1" width="190">����</td>
												<td  class="text1" width="150">&nbsp;
													<c:if test="${entity.waive eq 'Y'}">����</c:if>
													<c:if test="${entity.waive eq 'N'}">������</c:if>
												</td>
											</tr>
											</table>
											</fieldset>

                                       </div>



											
		<div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				<legend >��������Ϣ</legend>
										  	<table >
										  	<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">������֤����</td>
													<td  class="text1" width="150">&nbsp;${entity.proposercertid}</td>
													
													<td   class="text_zcx"  align="right" class="text1" width="190">������֤������</td>
													<td  class="text1" width="150">&nbsp;
														<c:if test="${entity.proposercerttp eq '01'}">���֤</c:if>
														<c:if test="${entity.proposercerttp eq '02'}">����֤</c:if>
														<c:if test="${entity.proposercerttp eq '03'}">ѧ��֤</c:if>
														<c:if test="${entity.proposercerttp eq '04'}">Ӫҵִ��</c:if>
														<c:if test="${entity.proposercerttp eq '05'}">��֯��������</c:if>
													</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">������֤�����й���</td>
													<td class="text1" width="150" >&nbsp;
														<c:if test="${entity.proposercertissued eq 'CN'}">�л����񹲺͹�</c:if>
													</td>
													
													
												</tr>
												
												<tr>
													<td class="text_zcx"  align="right" class="text1" width="190">��������ϵ�绰</td>
													<td class="text1" width="150">&nbsp;${entity.proposertel}</td>
												  <td class="text_zcx"  align="right" class="text1" width="190">�����˿ͻ���</td>
													<td class="text1" width="150">&nbsp;${entity.proposercstmrid}</td>
												</tr>
												
												<tr>
													<td class="text_zcx"  align="right" class="text1" width="190">�������˻�����</td>
													<td class="text1" width="150">&nbsp;
														<c:if test="${entity.proposeraccttp eq 'AT00'}">�Թ��˻�</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT01'}">���˴��ǿ��˻�</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT02'}">���˽�ǿ��˻�</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT03'}">����</c:if>
														<c:if test="${entity.proposeraccttp eq 'AT04'}">����</c:if>
													</td>
														<td class="text_zcx"  align="right" class="text1" width="190">�������˻�����</td>
													<td class="text1" width="150">&nbsp;${entity.proposeracctccy}</td>
												</tr>
												
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190">�������˺�</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtracct}</td>
												<td    class="text_zcx" align="right" class="text1" width="190">����������</td>
												<td  class="text1" width="150">&nbsp;${entity.dbtrnm}</td>
											</tr>
											<tr>
												<td  class="text_zcx" align="right" class="text1" width="190">�����˵�ַ</td>
												<td  class="text1" >&nbsp;${entity.dbtraddr}</td>
												<td   class="text_zcx"  align="right" class="text1" width="190">�����������к�</td>
												<td  class="text1" >&nbsp;${entity.dbtrmmbid}</td>
												
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
											</table>
											</fieldset>
											</div>	
												<div id="details" name="details" style="display: none;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
												  				<legend >��Ա��Ϣ</legend>
												  <table >
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
														<td   class="text_zcx"  align="right" class="text1" width="190">ҵ�����ȼ�</td>
														<td class="text1" colspan="3">&nbsp;
															<c:if test="${entity.sttlmprty eq 'NORM'}">һ��</c:if>
															<c:if test="${entity.sttlmprty eq 'HIGH'}">����</c:if>
															<c:if test="${entity.sttlmprty eq 'URGT'}">�ؼ�</c:if>
														</td>
													</tr>
													<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">����</td>
														<td  class="text1"colspan="3">&nbsp;${entity.ustrd}</td>
													</tr>
													
													
													</table>
													</fieldset>
											</div>
											
											<div id="details" name="details" style="display: none">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				<legend >������Ϣ</legend>
											  <table>
												 
												
												
	 	<c:choose>

                 <c:when test="${entity.pmttp eq 'B308'}">
                                <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >��Ʊ����</td>
													<td  class="text1" width="150">&nbsp;${entity.issueDt}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">��ʾ��������</td>
													<td  class="text1" width="150">&nbsp;${entity.payDt}</td>
												</tr>
												 <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >Ʊ�ݺ���</td>
													<td  class="text1" width="150">&nbsp;${entity.notesNo}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">��;</td>
													<td  class="text1" width="150">&nbsp;${entity.purpose}</td>
												</tr>
												 <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >��������</td>
													<td  class="text1" width="150">&nbsp;${entity.numOfEndrsr}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">����������</td>
													<td  class="text1" width="150">&nbsp;${entity.endrsrNm}</td>
												</tr>
               </c:when>
                 <c:when test="${entity.pmttp eq 'B309'}">
                                                <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >��Ʊ����</td>
													<td  class="text1" width="150">&nbsp;${entity.issueDt}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">��ʾ��������</td>
													<td  class="text1" width="150">&nbsp;${entity.payDt}</td>
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >��Ʊ���</td>
													<td  class="text1" width="150">&nbsp;${entity.issueAmt}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">��Ʊ��������</td>
													<td  class="text1" width="150">&nbsp;${entity.maturityDt}</td>
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >��Ʊ��Ѻ</td>
													<td  class="text1" width="150">&nbsp;${entity.billSeal}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">�ж�Э����</td>
													<td  class="text1" width="150">&nbsp;${entity.accptncagrmntNo}</td>
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >�ж�����</td>
													<td  class="text1" width="150">&nbsp;${entity.accptncDt}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">�ж���</td>
													<td  class="text1" width="150">&nbsp;${entity.accptncNm}</td>
												</tr>
													<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >Ʊ������������</td>
													<td  class="text1" width="150">&nbsp;${entity.applyNm}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">Ʊ���������˺�</td>
													<td  class="text1" width="150">&nbsp;${entity.applyAcct}</td>
												</tr>
													<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >��Ʊ��ȫ��</td>
													<td  class="text1" width="150">&nbsp;${entity.drawerNm}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">��Ʊ���˺�</td>
													<td  class="text1" width="150">&nbsp;${entity.drawerAcct}</td>
												</tr>
												<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >���׺�ͬ����</td>
													<td  class="text1" width="150">&nbsp;${entity.trnsctnCntrctNo}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">ԭ�տ�������</td>
													<td  class="text1" width="150">&nbsp;${entity.oriCrdtrNm}</td>
												</tr>
											 <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >Ʊ�ݺ���</td>
													<td  class="text1" width="150">&nbsp;${entity.notesNo}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">��;</td>
													<td  class="text1" width="150">&nbsp;${entity.purpose}</td>
												</tr>
												 
												 <tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >��������</td>
													<td  class="text1" width="150">&nbsp;${entity.numOfEndrsr}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">����������</td>
													<td  class="text1" width="150">&nbsp;${entity.endrsrNm}</td>
												</tr>
												
               </c:when>
               
               
              
               <c:when test="${entity.pmttp eq 'A109'}">
                    <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >Ʊ������</td>
								<td  class="text1" width="150">&nbsp;${entity.notesdt}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">Ʊ������</td>
								<td  class="text1" width="150">&nbsp;${entity.notestp}</td>
					</tr>
					
               
               </c:when>
               
               
               <c:when test="${entity.pmttp eq 'A110'}">
                <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >Ʊ������</td>
								<td  class="text1" width="150">&nbsp;${addentity.notesdt}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">Ʊ�ݺ���</td>
								<td  class="text1" width="150">&nbsp;${addentity.notesno}</td>
					</tr>
					
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >�⳥����</td>
								<td  class="text1" width="150">&nbsp;${addentity.amndsamt}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">�ܸ�����</td>
								<td  class="text1" width="150">&nbsp;${addentity.rjctamt}</td>
					</tr>
					
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >ԭ�н��</td>
								<td  class="text1" width="150">&nbsp;${addentity.orgnlamt}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">֧�����</td>
								<td  class="text1" width="150">&nbsp;${addentity.pmtamt}</td>
					</tr>
					<tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >�ึ���</td>
								<td  class="text1" width="150">&nbsp;${addentity.oddamt}</td>
								
					</tr>
               
               </c:when>
               
               
               <c:when test="${entity.pmttp eq 'A201'}">
                <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >Ʊ������</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">��Ʊ������</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >Ʊ�ݽ��</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">�Ƽ�</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >Ʊ������</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
					</tr>
               
               </c:when>
               
                
               <c:when test="${entity.pmttp eq 'A104'}">
                <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >��ϸ���ܽ��</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">�ϱ��������</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >���չ������</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">��������</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >�������</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">Ԥ�㼶��</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 <tr>
								<td  class="text_zcx" align="right" class="text1" width="190" >�����ڱ�־</td>
								<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
								<td    class="text_zcx" align="right" class="text1" width="190">��ϸ����</td>
								<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
					</tr>
					 
               
               </c:when>
               
               
               
               
                      <c:otherwise> 
                      
                      <!--  
                          				<tr>
													<td  class="text_zcx" align="right" class="text1" width="190" >ƾ֤����</td>
													<td  class="text1" width="150">&nbsp;${entity.vouchertype}</td>
													<td    class="text_zcx" align="right" class="text1" width="190">ƾ֤��</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherno}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">ƾ֤��������</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherpswdtp}</td>
													<td   class="text_zcx"  align="right" class="text1" width="190">ƾ֤����</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherpswd}</td>
												</tr>
												<tr>
													<td   class="text_zcx"  align="right" class="text1" width="190">ƾ֤ǩ������</td>
													<td  class="text1" width="150">&nbsp;${entity.voucherissuedt}</td>
												
												</tr>
												<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">Ʊ������</td>
														<td  class="text1" width="150">&nbsp;${entity.notestp}</td>
													</tr>
													<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">Ʊ������</td>
														<td  class="text1" width="150">&nbsp;${entity.notesdt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">Ʊ�ݺ���</td>
														<td  class="text1" width="150">&nbsp;${entity.notesno}</td>
													</tr>
													<tr>
														<td   class="text_zcx"  align="right" class="text1" width="190">�⳥����</td>
														<td  class="text1" width="150">&nbsp;${entity.amndsamt}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">�ܸ����</td>
														<td  class="text1" width="150">&nbsp;${entity.rjctamt}</td>
													</tr>
													-->

              </c:otherwise>

        </c:choose>

												
								
												</table>
												</fieldset>
											</div>	
										 
 
 
       
                                                     <div class="table_content">
                                                    	 
                                                    	     
                                                   <table>  
                                              <tr align="center">
                                              <td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                              <td  > 
                                              
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������ ����ͨ����ע��ԭ��</span>
										 </td>
                                              </tr>                    
                                                   
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td><td class="text_tablehead_b">&nbsp;</td>
                                                    			<td class="text_tablehead_b">&nbsp;</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
			           
	 									</table>
													  
													 <br />
													 
												<br></td>
											</tr>
										</table>
 
							
						</table>
					<br></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#FFFFFF);"><br></td>
	
				</tr>
			</table>
			 

		 	</body>
</html>
