<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/fmt_rt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
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
  	<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
  	<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
   <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
   <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
    <script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
    <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		<script type="text/javascript">
			 function open2(id){
    			
			    var pop=new Popup({ contentType:1,scrollType:'yes',isReloadOnClose:false,width:760,height:350});
			    pop.setContent("contentUrl","<%=request.getContextPath()%>/transfer/RegularCreditChildrenAction.do?method=queryDetail4Check&id="+id);
			    pop.setContent("title","�տ�����Ϣ�б� ");
			    pop.build();
			    pop.show();
			 }
			 
	function viewdetails(id){
	 
		var newurl = "<%=path %>/transfer/RegularCreditChildrenAction.do?method=queryDetail4Check&id="+id;
		viewDetails(newurl);	
	}
			 
			function commitForm(){
			  if(VForm.Validate()){
			  	/*if(document.form['cdtrbrnchid'].value!=document.getElementById("cdtrbrnchid1").value){
			  		alert("�տ����к���ԭҵ������кŲ�һ��");
			  	}*/
			  	if(document.getElementById("amount").value!=document.getElementById("amount1").value){
			  		alert("��������ԭҵ���һ��");
			  		return false;
			  	}
			  	if(document.getElementById("nbOfTxs").value!=document.getElementById("nbOfTxs1").value){
			  		alert("֧��������ԭ֧��������һ��");
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
			
		</script>
	</head>
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage&operway=00">
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
                						
                																		���ڴ��Ǹ���
                						
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
			                	               	<td   class="text_zcx"  align="right" class="text1" width="190">֧���������</td>
														<td  class="text1" width="150">&nbsp;${entity.pmtgrpid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">ҵ�����ͱ���</td>
														<td  class="text1" width="150">&nbsp; 
														<c:if test="${entity.pmttp  eq 'E100'}">���ڴ���</c:if>
														
														</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">ҵ���������
														
														
														
														
														</td>
														<td  class="text1" width="150">&nbsp; 
														<c:if test="${entity.pmtkd  eq '00100'}">���</c:if>
														<c:if test="${entity.pmtkd  eq '00200'}">ˮů��</c:if>
														<c:if test="${entity.pmtkd  eq '00300'}">ú����</c:if>
														<c:if test="${entity.pmtkd  eq '00400'}">�绰��</c:if>
														<c:if test="${entity.pmtkd  eq '00500'}">ͨѶ��</c:if>
														<c:if test="${entity.pmtkd  eq '00600'}">���շ�</c:if>
														<c:if test="${entity.pmtkd  eq '00700'}">���ݹ����</c:if>
														<c:if test="${entity.pmtkd  eq '00800'}">��������</c:if>
														<c:if test="${entity.pmtkd  eq '00900'}">ѧ�̷�</c:if>
														<c:if test="${entity.pmtkd  eq '01000'}">���ߵ��ӷ�</c:if>
														 <c:if test="${entity.pmtkd  eq '09001'}">����</c:if>
														 <c:if test="${entity.pmtkd  eq '01100'}">��ҵ�������</c:if>
														 <c:if test="${entity.pmtkd  eq '01200'}">н�𱨳�</c:if>
        
														
														
														
														
														
														
														
														
														
														
														</td>
														<td  class="text_zcx" align="right" class="text1" width="190" >����״̬</td>
														<td  class="text1" width="150">&nbsp; 
														
													 <c:if test="${entity.status eq 'PR04' }">������</c:if>
													<c:if test="${entity.status eq 'PR09' }">�Ѿܾ�</c:if>
													<c:if test="${entity.status eq 'PR08' }">�ѳ���</c:if>
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
														<td   class="text_zcx" align="right" class="text1" width="190">�������к�</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchid}</td>
												<td   class="text_zcx" align="right" class="text1" width="190">����������</td>
												<td class="text1">&nbsp;${entity.dbtrbrnchnm}</td>						
														<td   class="text_zcx"  align="right" class="text1" width="190">�����</td>
														 <td  class="text1"  >&nbsp;${entity.brnchid}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">ϵͳ���</td>
														<td  class="text1" width="150">&nbsp; 
															<c:if test="${entity.systemcd eq 'HVPS'}">���</c:if>
															<c:if test="${entity.systemcd eq 'BEPS'}">С��</c:if>
														</td>
														
													</tr>	      
													
									
	                                          <tr>
														<td   class="text_zcx" align="right" class="text1" width="190">��������</td>
												<td class="text1">&nbsp;${entity.netgdt}</td>
												<td   class="text_zcx" align="right" class="text1" width="190">�����</td>
												<td class="text1">&nbsp;${entity.netgrnd}</td>						
	 													 
														<td   class="text_zcx"  align="right" class="text1" width="190">��������</td>
														<td  class="text1" width="150">&nbsp;  
														 ${entity.sttlmdt}
														</td>
														
													</tr>	      				
							<tr>
							<td   class="text_zcx"  align="right" class="text1" width="190">������ʶ��</td>
														<td  class="text1" width="150">&nbsp;${entity.chnlrmkid}</td>
														<!-- 
														<td  class="text_zcx" align="right" class="text1" width="190">���ı�ʶ��</td>
														<td  class="text1" width="150">&nbsp;${entity.msgid}</td>
														<td    class="text_zcx" align="right" class="text1" width="190">��ִ���ı�ʶ��</td>
														<td  class="text1" width="150">&nbsp;${entity.recptmsgid}</td>
														
														<td  class="text_zcx" align="right" class="text1" width="190">�˵��˱�ʶ��</td>
														<td  class="text1" width="150">&nbsp;${entity.endtoendid}</td>
														 -->
													</tr>
			              <tr>
														<td   class="text_zcx" align="right" class="text1" width="190">���ִ���</td>
														<td class="text1" width="150">&nbsp;${entity.currencycd}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">�����</td>
														<td  class="text1" width="150">&nbsp;
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount}"/>
											
														
														</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">ϵͳ������</td>
														<td  class="text1" width="150">&nbsp;${entity.workdt}</td>
															<td   class="text_zcx"  align="right" class="text1" width="190">�ܶ�</td>
														<td  class="text1" width="150">&nbsp;
														
															<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt}"/>
											
														</td>
													</tr>
			             <tr>
													
														<td   class="text_zcx"  align="right" class="text1" width="190">���л�</td>
														<td  class="text1" width="150">&nbsp;${entity.bankcustomer}</td>
														<td   class="text_zcx"  align="right" class="text1" width="190">ǩ��ģʽ</td>
														<td  class="text1" width="150">&nbsp; 
															<c:if test="${entity.signmd eq '01'}">�ֽ�</c:if>
															<c:if test="${entity.signmd eq '02'}">����</c:if>
															<c:if test="${entity.signmd eq '03'}">ת��</c:if>
															<c:if test="${entity.signmd eq '04'}">����</c:if>
														
														
														</td>
														<td colspan="4">&nbsp;</td>
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
			               	 	<!--  	<tr>
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
													</tr>-->
			            
			            <tr>
																		
<table> 




 <tr>
								<td style="width:14%;">
										<input type="button" value="�˶���Ϣ"   style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"
  onclick="selectDet(0)"/>
								</td>
								<td style="width:1%;">|
								</td>
								<!--   
										<td style="width:14%;">
										<input type="button" value="��������Ϣ"  style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"
  onclick="selectDet(1)"/>
										</td>
-->

										
												<td style="width:14%;">
									
								<input type="button" value="�տ�����Ϣ"style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="viewdetails(${entity.id})"/>
													
										
									</td>
									
								<td style="width:1%;">|
								</td>
											<td style="width:14%;">											
											
								<input type="button" value="�շ���Ϣ"   style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;"
  onclick="selectDet(3)"/>	
											
											</td>	<td style="width:1%;">|
								</td>
												<td style="width:14%;">
								 
													 
												
											<input type="button" value="��������Ϣ"style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(4)"/>
												
											
											</td>	
											<td style="width:1%;">|
								</td>
											<td style="width:14%;">
									 <input type="button" value="��Ա��Ϣ" style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(5)"/>
											
											<!-- 		<td style="width:1%;">|</td>
											
											<td style="width:14%;">
									 <input type="button" value="������Ϣ" style="width:100%;border: 1px solid ;background-color: #FFFFD0;margin-left: 1px;margin-top: 3px;cursor:hand;" onclick="selectDet(6)"/>	
											
											</td>-->
											</tr>
									 

</table>
 
  
 
     <div id="details" name="details" style="display:block;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;bgcolor="E6E6E6"  >
												
									 	
											  		<legend >�˶���Ϣ</legend>	
											 <table>
												<input type="hidden" name="systemcd" value="${entity.systemcd }"/>
												<input type="hidden" name="pmtgrpid" value="${entity.pmtgrpid }"/>
												<tr>
													<td   class="text_tablehead_b"  align="right" class="text1" width="10%">������</td>
													<td  class="text1" width="30%">
													<input type="text" name="amount1" value='${entity.amount}' readonly="readonly"/>
												 
													</td>
													<td  class="text1" width="60%"><input type="text" name="amount" value=""/>
												<font color="red">*</font>	</td>
													
												</tr>
												<tr>
													<td  class="text_tablehead_b" align="right" class="text1"  width="10%" >�������˺�</td>
													<td  class="text1"  width="30%">&nbsp;<input type="text" name="dbtracct1" value='${entity.dbtracct}' readonly="readonly"/>
													

													
													</td>
													<td  class="text1" width="60%">&nbsp;<input type="text" name="dbtracct" value=""/>
												<font color="red">*</font>
												</tr>
												<tr>
													<td class="text_tablehead_b" align="right" class="text1" width="10%">֧������</td>
													<td class="text1" width="30%">&nbsp;<input type="text" name="nbOfTxs1" value='${entity.nbOfTxs}' readonly="readonly"/>
													
													
													
													</td>
													<td class="text1" width="60%">&nbsp;<input type="text" name="nbOfTxs" value=""/>
												<font color="red">*</font>
													</tr>
												</table>
												
												</fieldset>
											</div>
 
 
 
 
 <div id="details" name="details" style="display:none;">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;"  >
											  		<legend >��������Ϣ</legend>	
											  	<table >
												
												
												 
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
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				<legend >�տ�����Ϣ</legend>
											  	<table >
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
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
										  				<legend >�շѽ��</legend>
										  	<table >
											 
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">�����</td>
													<td  class="text1" width="150">&nbsp;
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.amount}"/>
											
													
													</td>
													<td   class="text_tablehead_b"  align="right" class="text1" width="190">�ܶ�</td>
														<td  class="text1" width="150">&nbsp;
														<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.totalamt}"/>
														</td>
											</tr>
											<tr>
												<td  class="text_tablehead_b" align="right" class="text1" width="190" >������</td>
												<td  class="text1" width="150">&nbsp;
												<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.servicecharge}"/>
												</td>
												<td    class="text_tablehead_b" align="right" class="text1" width="190">�ʵ��</td>
												<td  class="text1" width="150">&nbsp;
												
												<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.postage}"/>
												</td>
											</tr>
											<tr>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">��ؼ���</td>
												<td  class="text1" width="150">&nbsp;
												<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.outstationcharge}"/>
												
												</td>
												<td   class="text_tablehead_b"  align="right" class="text1" width="190">����</td>
												<td  class="text1" width="150">&nbsp;
												<fmt:formatNumber pattern="###,###,###,###,###,###,##0.00" value="${entity.waive}"/>
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
													<td class="text1" width="150"  colspan="3">&nbsp;${entity.proposercertissued}</td>
													
												</tr>
												 
												<tr>
													<td class="text_tablehead_b"  align="right" class="text1" width="190">��������ϵ�绰</td>
													<td class="text1" width="150">&nbsp;${entity.proposertel}</td>
														<td class="text_tablehead_b"  align="right" class="text1" width="190">�����˿ͻ���</td>
													<td class="text1" width="150">&nbsp;${entity.proposercstmrid}</td>
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
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
												  				<legend >��Ա��Ϣ</legend>
												  <table >
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
													<!-- <tr>
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
														<td class="text1" colspan="3">&nbsp;${entity.sttlmprty} 
															 
														</td>
													</tr> -->
														<tr>
														<td  class="text_tablehead_b" align="right" class="text1" width="190" >ǩ����Ա</td>
														<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">ǩ���ն˺�</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtrmlid}</td>
														</tr>
														<tr>
														<td    class="text_tablehead_b" align="right" class="text1" width="190">ǩ������</td>
														<td  class="text1" width="150">&nbsp;${entity.signerid}</td>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">ǩ��ʱ��</td>
														<td  class="text1" width="150">&nbsp;${entity.signedtm}</td>
													</tr>
													<tr>
														<td   class="text_tablehead_b"  align="right" class="text1" width="190">����</td>
														<td  class="text1"colspan="3">&nbsp;${entity.ustrd}</td>
													</tr>
													
													
													</table>
													</fieldset>
											</div>
											
											<div id="details" name="details" style="display: none">
												<fieldset style="width:90%;border:1px #CCCCCC solid; padding:3px;" align=center >
											  				<legend >������Ϣ</legend>
											  <table>
												
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
										 
 
 
       
                                                     <div class="table_content">
                                                    	 
                                                    	     
                                                   <table>  
                                              <tr align="center">
                                              <td class="text_zcx">&nbsp;</td>
                                                    		<td class="text_zcx">&nbsp;</td>
                                              <td  > 
                                              
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										 </td>
                                              </tr>                    
                                                   
                                                    		<tr>
                                                    		<td class="text_zcx">&nbsp;</td>
                                                    		<td class="text_zcx">&nbsp;
                                                    		<input type="hidden" name="passno" value="N" >
                                                    		</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td><td class="text_zcx">&nbsp;</td>
                                                    			<td class="text_zcx">&nbsp;</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
 
												
	 
	 
	 
	 
	 
	 
	 <!-- ================ -->											
													</tr>
			           
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
			 

 

			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
	 
			
			
			
			
			
			
			 

		</form>
	</body>
</html>
