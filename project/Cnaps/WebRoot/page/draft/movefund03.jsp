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
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>

		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
				<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
	 	<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
	 	<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.3.1.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		
	   <script language="javascript">
		
		
		function saveFun(data) {
      if (data) {
   // alert("ע��ɹ���");
      } else {
   // alert("data��");
    }
 }

	function OnSave() {
var userMap = {};
userMap.accountnumber = document.getElementById("cdtracctid").value;
userMap.accountname = document.getElementById("cdtrnm").value;
userMap.addr = document.getElementById("cdtraddr").value;
userMap.issuer =document.getElementById("skhkhhhh").value;
userMap.issuernm =document.getElementById("skrkhhmc").value;
  PubService.saveOthersBankAccountMsg(userMap, saveFun); 
}
		
	function queryBypaymentGroupNum(paymentGroupNum){
	 if(isNull(trim(paymentGroupNum))){
					 return;
			}
 		 	var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
			pop.show();
			
			PubService.queryOthersBankAccountMsg(paymentGroupNum,function(obj){
			 pop.close();
			   if(obj==null||obj.accountnumber==null){
				 return;
			   }else{
			  document.getElementById("cdtracctid").value=obj.accountnumber;
		      document.getElementById("cdtrnm").value=obj.accountname==null?"": obj.accountname  ;
			  document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr  ;
			   document.getElementById("skhkhhhh").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("skrkhhmc").value=obj.issuernm==null?"":obj.issuernm ;	
			    
			 }
		   	});
				
		}
			
		
		//��ѯ��������Ϣ
		function  PubQueryAccount(paymentGroupNum){
			clrAmt();
			if(isNull(trim(paymentGroupNum))){
			   return;
			}
			
			//document.getElementById("payAccountId").value=document.getElementById("dbtracctid").value;
			
		 	var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
			pop.show();
   			
			 PubService.QueryAccount(paymentGroupNum,function(obj){
			    pop.close();
			   if(obj==null||obj.acctid==null){
				  alert(" ��������Ϣ��ѯʧ��,δ�鵽�������" );
				   return;
			   }else{
			 		 		document.getElementById("fkrmc").value=obj.mm==null?"": obj.mm;//����
						      document.getElementById("fkrdz").value=obj.addr==null?"": obj.addr;//��ַ
						      document.getElementById("sqrlxdh").value=obj.tel==null?"": obj.tel;//��ϵ�绰
						      document.getElementById("zjlx").value=obj.certip==null?"": obj.certip;//֤������
							  document.getElementById("zjlx1").value=obj.certip==null?"": obj.certip;//֤������
						      document.getElementById("sgrzjh").value=obj.certid==null?"": obj.certid;//֤����
						      document.getElementById("sqrkhh").value=obj.cstmrid==null?"": obj.cstmrid;//�����˿ͻ���
						       document.getElementById("fkrkhhhh").value=obj.bankcode==null?"": obj.bankcode;//�����˿������к�
						       document.getElementById("fkrkhkmc").value=obj.acctissr==null?"": obj.acctissr;//�����˿���������
						      // document.getElementById("payAccountName").value=obj.mm==null?"": obj.mm;//����
						      document.getElementById("sqrzhlx").value=obj.accttp==null?"": obj.accttp;//�˻�����
						      document.getElementById("sqrzhlx1").value=obj.accttp==null?"": obj.accttp;
			 
			    
		 }
	   	});
				
			}
		
		
		
			
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var recvbkno= document.getElementById("skhhh");
				var recvbkname=document.getElementById("skhmc");
				var recvopnbkno=document.getElementById("skhqshhh");
				selectBank(url,recvbkno,recvbkname,recvopnbkno);
			}
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var cashpaybrnch= document.getElementById("cashpaybrnch");
				var fkrkhkmc=document.getElementById("agtdbtrissrnm");
				selectBank(url,cashpaybrnch,fkrkhkmc,"");
			}
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skhkhhhh= document.getElementById("skhkhhhh");
				var skrkhhmc=document.getElementById("skrkhhmc");
				selectBank(url,skhkhhhh,skrkhhmc,"");
			}
			function selectBankProxy(){
				var url ="<%=request.getContextPath()%>";
				var proxybankcode= document.getElementById("proxybankcode");
				var proxybankname= document.getElementById("proxybankname");
				selectBank(url,proxybankcode,proxybankname,"");
			}
			
			function commitForm(){
				if(VForm.Validate()){
					if(document.getElementById("billtp").value=="CT02"){//�ֽ��Ʊ
						
						if(document.getElementById("cashpaybrnch").value==""){
							alert("��������������к�");
							return false;
						}else if(document.getElementById("agtdbtrissrnm").value==""){
							alert("��������������к�");
							return false;
						}
					}
				 document.getElementById("hkje").value=rmoney(document.getElementById("hkje").value) ;
						    document.getElementById("sxf").value=rmoney(document.getElementById("sxf").value) ;
						   document.getElementById("ydf").value=rmoney(document.getElementById("ydf").value) ;
						   document.getElementById("ze").value=rmoney(document.getElementById("ze").value) ;
				 if(document.getElementById("waiven").checked!=""){
					open3("<%=request.getContextPath()%>");
				}
				else{
					document.forms[0].submit();
				}
				 //document.forms[0].submit();
				}		
			}
					//���������Ѳ�ѯ
		function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('hkje'),
				 	transno:'7100',
				 	pmttp:document.getElementById('pmttp'),
				    sxf : document.getElementById('sxf'),
				    ydf : document.getElementById('ydf'),
				    ydjs : document.getElementById('ydjs'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('ze'),
				    signtype: document.getElementById('signmd'),
				    yxj:document.getElementById('yxj'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs"),
				  	waiven: document.getElementById("waiven")
				  };
				 if(obj.hkje.value==""||obj.hkje.value=="0.00"){
				  	clrAmt();
				  }
				  else{
					calcharge(url,beginamt,endamt,obj);				  
				  }
				 //calcharge(url,beginamt,endamt,obj);
			}
			
			
			function clrAmt(){
				document.getElementById('hkje').value="";
				document.getElementById('sxf').value="";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('ze').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
			
				function clrAmt0(){
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('ze').value=document.getElementById('hkje').value;
			}
			
			
			//���������

		</script>
	</head>
	<body>
		<form method="post"
			action="<%=path%>/movefundAction.do?method=sendMessage&id=01">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" /><!-- �ظ������� -->
			<input type="hidden" name="dbtrbrchid" value="${bankInfo.bankcode }"/><!-- �������к� -->
			<input type="hidden" name="dbtrbrnchnm" value="${bankInfo.participantname }" /><!-- ���������� -->
			<input type="hidden" name="dbtrmmbid" value="${bankInfo.directbankcode }" /><!-- �����������к� -->
			<input type="hidden" name="systemcd" value="HVPS" /><!-- ϵͳ��� -->
			<input type="hidden" name="sttlmprty" value="NORM" /><!-- ���ȼ� -->
			<input type="hidden" name="pmttp" value="A202" /><!-- ҵ������ -->
			<input type="hidden" name="pmtkd" value="02901" /><!-- ҵ������ -->
			<input type="hidden" name="issuerbk" value="${bankInfo.bankcode }"/><!-- �������к� -->
			<input  id="signmd" name="signmd" type="hidden" maxlength="19" value="04"/><!-- ǩ��ģʽ -->
			<input  id="proposeracctccy" name="proposeracctccy" type="hidden" maxlength="19" value="CNY"/><!--�˻����� -->
			<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input id="contrperson" name="warrantyId" type="hidden" ><!-- ��Ȩ��Ա(������) -->
			
						<!-- ��ֹ�ظ��ύ -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr valign="top">
					
					<td></td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">&nbsp;
									
							  </td>
								<td align="center">
									<div align="center">
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">���л�Ʊ����ǩ��</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           <div class="table_body">
                                           <div class="table_content">
                                           		 <table >
                                                      <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>
													
															<tr>
															<td class="text_tablehead_b"  >
																	֧�����
															  </td>
																<td >
																	<input name="paymentno" id="" type="text"  readonly="readonly" value="${entity.paymentno }"
																		maxlength="19" title="֧�����" />
																</td>
																<td class="text_tablehead_b" >
																	���ȼ�
																</td>
																<td>
																	<select  name="sttlmprty" id="yxj" onchange="clrAmt();">
																		<option value="NORM" selected="selected">
																			һ��
																		</option>
																		<option value="HIGH" >
																			����
																		</option>
																		<option value="URGT">
																			�ؼ�
																		</option>
																	</select>
																</td>
															</tr>
															
																
																<tr>
															
															<td class="text_tablehead_b"  >
																	��Ʊ����
														  </td>
																<td>
																		<select   name="billtp" id="billtp" >
																		<option value="CT00">
																			��ת�û�Ʊ
																		</option>
																		<option value="CT01">
																			����ת�û�Ʊ
																		</option>
																		<option value="CT02">
																			�ֽ��Ʊ
																		</option>
																	
																	</select>
																	
																</td>
																<td class="text_tablehead_b" >
																	��Ʊ����
																</td>
																
																<td>
																	<input name="endtoendid" id="endtoendid" type="text" 
																		maxlength="19" title="��Ʊ����"  />
																<span name="validate" dataName="endtoendid" dataType="Empty" msg="��Ʊ���벻��Ϊ�գ�" class="STYLE1">*</span>
																</td>
															
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																	��Ʊ��Ѻ
																</td>
																<td>
																<input name="billseal" id="billseal"  type="text"
																		 title="��Ʊ��Ѻ"  />
																		<span name="validate" dataName="billseal" dataType="Empty" msg="��Ʊ��Ѻ����Ϊ�գ�" class="STYLE1">*</span>
																</td>
																
																
															</tr>
															
											 </table>
                                             </div>
                                               
                                            
                                                  
                                                <div class="table_content">
                                                   	<table>
	                                                   
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">��������Ϣ</span></td>
	                                                      </tr>
	                                                       <tr>
                                                  				<td class="text_tablehead_b" >
																	�������˺�
																</td>
																<td>
																	<input name="dbtracctid" id="fkrzh" type="text"
																		 title="�������˺�" maxlength="32" onblur="PubQueryAccount(this.value)"
																		onKeyPress="actkeyPress()" />
																	<span name="validate" dataName="dbtracctid" dataType="Empty" msg="�������˺Ų���Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b" >
																	����������
																</td>
																<td>
																	<input name="dbtrnm" id="fkrmc" type="text"
																		title="����������" maxlength="60" readonly="readonly"
																		onKeyPress="charPress()" />
																	<span name="validate" dataName="dbtrnm" dataType="Empty" msg="���������Ʋ���Ϊ�գ�" class="STYLE1">*</span>	
																</td>
                                                  			</tr>
	                                                      <tr>
															<td class="text_tablehead_b"  >
																	֤������
														  </td>
																<td>
																<input name="certtype" id="zjlx1" type="hidden"  readonly="readonly"/>
																		<select   name="certtype" id="zjlx" disabled="disabled">
																		<option value="01">
																			���֤
																		</option>
																		<option value="02">
																			����֤
																		</option>
																		<option value="03">
																			ѧ��֤
																		</option>
																		<option value="04">
																			Ӫҵִ��
																		</option>
																		<option value="05">
																			��֯��������
																		</option>
																	
																	</select>
																	
																</td>
															
																<td class="text_tablehead_b" >
																	������֤����
																</td>
																<td >
																	<input name="appcertno" id="sgrzjh" type="text" size="19" readonly="readonly" onblur="checkIdcard(this.value,'sgrzjh')"
																		maxlength="32" title="������֤����" />
																		
																</td>
													  </tr>
																<tr>
																

																<td class="text_tablehead_b" >
																	��������ϵ�绰
																</td>
																<td>
																	<input  name="appphone" id="sqrlxdh" type="text" readonly="readonly"
																		 maxlength="20" title="��������ϵ�绰" />
																		 
																</td>
																</tr>
																
																
																<tr>
																<td class="text_tablehead_b" >
																	�����˿ͻ���
																</td>
																<td >
																	 <input type="text"  maxlength="30" readonly="readonly" name="proposercstmrid" title="�����˿ͻ���" id="sqrkhh">
																		 
															
																</td>

																<td class="text_tablehead_b" >
																	�������˻�����
																</td>
																<td>
																		 <input type="hidden"  name="proposeraccttp" title="�������˻�����" id="sqrzhlx"/>
																		 <select  name="proposeraccttp1" title="�������˻�����" id="sqrzhlx1" disabled="disabled">
																		  <option value="">��ѡ��</option>
																		 <option value="AT00">�Թ��˻�</option>
																		  <option value="AT01">���˴��ǿ��˻�</option>
																		   <option value="AT02">���˽�ǿ��˻�</option>
																		    <option value="AT03">����</option>
																		     <option value="AT04">����</option>
																		     
																		 </select>
																</td>
																
																</tr>
                                                  			
                                                  			
                                                  			
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�����˵�ַ
																</td>
																<td colspan="3">
																	<input name="dbtraddr" id="fkrdz" class="text_tablehead_b_addr" 
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'��ʾ��','fkrdz')"/>
																
																</td>
                                                  			</tr>
                                                  			
                                                  			<tr>
	                                                  			<td>
	                                                  				<!-- ��Ʊǩ������Ϣ -->
		                                                  			<input name="dbtrissr" id="fkrkhhhh" type="hidden" class="text_tablehead_b_c"
																				 title="�����˿������к�" maxlength="12" value="${bankInfo.bankcode }"  readonly="readonly"
																				onKeyPress="actkeyPress()"  />
																	<input name="dbtrissrnm" id="fkrkhkmc" type="hidden" title="�����˿���������"
																				  maxlength="60" readonly="readonly" value="${bankInfo.participantname }"
																				onKeyPress="actkeyPress()" />
	                                                  			</td>
                                                  			</tr>
                                                  			
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	���������к�
																</td>
																<td>
																	<input name="cashpaybrnch" id="cashpaybrnch" type="text" class="text_tablehead_b_c"
																		 title="���������к�" maxlength="12" value=""  readonly="readonly"
																		onKeyPress="actkeyPress()"  />
																		<input type="button" class="button"   value="����" onclick="selectBankInfoOfFkk()">
																</td>
																<td class="text_tablehead_b">
																	������������
																</td>
																<td>
																	<input name="agtdbtrissrnm" id="agtdbtrissrnm" type="text" title="������������"
																		  maxlength="60" readonly="readonly" value=""
																		onKeyPress="actkeyPress()" />
																			
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�ۿ��˺�
																</td>
																<td>
																	<input name="dbtramtacctid" id="kkzh" type="text" 
																		 title="�ۿ��˺�" maxlength="32"
																		onKeyPress="actkeyPress()" /> 
																		<span name="validate" dataName="kkzh" dataType="Empty" msg="�ۿ��˺Ų���Ϊ�գ�" class="STYLE1">*</span>
																</td>
																
																<td class="text_tablehead_b" >
																	�ۿ��
																</td>
																<td>
																	<input name="dbamtnm" id="kkhm" type="text"
																		title="�ۿ��" maxlength="60" 
																		onKeyPress="charPress()" />
																		 <span name="validate" dataName="kkhm" dataType="Empty" msg="�ۿ������Ϊ�գ�" class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			
                                           		  </table>
                                             </div>
                                                  
                                                    <div class="table_content">
                                                   	<table>
	                                                  	
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">�տ�����Ϣ</span></td>
	                                                      </tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	�տ����˺�
																</td>
																<td>
																	<input name="cdtracctid" id="skrzh" type="text"
																		 title="�տ����˺�" maxlength="32"
																		onKeyPress="charPress()" onblur="queryBypaymentGroupNum(this.value)" />
																</td>
															
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="cdtrnm" id="skrmc" type="text"
																		title="�տ�������" maxlength="60"
																		onKeyPress="charPress()" />
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	�տ��˵�ַ
																</td>
																<td colspan="3">
																	<input type="text" class="text_tablehead_b_addr" name="cdtraddr" id="skrdz" 
																		onKeyPress="actkeyPress()" onKeyUp="limitLength(value,70,'��ʾ��','skrdz')" />
																	
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	�տ��˿������к�
																</td>
																<td>
																	<input name="cdtrissr" id="skhkhhhh" type="text" class="text_tablehead_b_c"
																		 title="�տ��п������к�" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																
																	<input type="button" class="button"  value="����" onClick="selectBankInfoOfSkk()">	
																</td>
															
																<td class="text_tablehead_b">
																	�տ��˿���������
																</td>
																<td>
																	<input name="cdtrissrnm" id="skrkhhmc" type="text" readonly="readonly"
																		title="�տ��˿���������" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
                                               		  </table>
                                                	</div>
                                                	 
                                                   <div class="table_content">
                                                   	<table>
	                                                   
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">�����Ϣ</span></td>
	                                                      </tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	���ִ���
																</td>
																<td>
																	<input name="currency" id="bzdm" type="text"
																		 title="���ִ���"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																	<td class="text_tablehead_b" >
																	�ܶ�
																</td> 
																<td >
																	<input name="allchange" id="ze" type="text" readonly="readonly"
																		 title="�ܶ�" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span name="validate" dataName="appcertno" dataType="Empty" msg="�ܶ��Ϊ�գ�" class="STYLE1">*</span>
																</td>
													  </tr>
													  <tr>
													  <td class="text_tablehead_b" >
																		�����
																	</td>
																	<td colspan="4">
																		<input name="ntryamt" id="hkje" type="text"
																			 title="�����" maxlength="12"
																			onKeyPress="amountPress()"
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange(this.value)"
																			/>
																	<span name="validate" dataName="ntryamt" dataType="Empty" msg="������Ϊ�գ�" class="STYLE1">*</span>
																	</td>
													  </tr>
                                               		 </table>
                                           	 </div>
                                                  	 
                                                  	 <div class="table_content">
                                                   	<table>
	                                                  	 
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">�Ʒ�/������Ϣ</span></td>
	                                                      </tr>
                                                    			<tr>												  	 
					<td class="text_tablehead_b" >
						��ȡ����
					</td>
					<td >					
						<input type="radio" class="text_tablehead_b_rad" name="po.waive" id="waivey" value="Y" checked="checked" onclick="addchange('this.value');">��ȡ
						<input type="radio" class="text_tablehead_b_rad" name="po.waive" id="waiven" value="N"  onclick="clrAmt0()">����ȡ
					</td>
				</tr>	
															<tr>
															<td class="text_tablehead_b" >
																	������
															  </td>
																<td>
																	<input name="charge" id="sxf" type="text"  readonly="readonly"
																		title="������" maxlength="12" 
																		onKeyPress="amountPress()" 
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"/>
																
																</td>
																<td class="text_tablehead_b" >
																	������Ϣ
																</td>
																<td>
																	<input name="systemcd" id="xth" type="hidden" title="ϵͳ��" maxlength="12" value=""/> 
																	<select   id="xth1"  name="systemcd1" title="ϵͳ��" disabled="disabled">
																	<option value="">
																		</option>
																		<option value="HVPS">
																			���
																		</option>
																		<option value="BEPS">
																			С��
																		</option>
																	</select>
																</td>
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																	�ʵ��
																</td>
																<td>
																	<input name="postage" id="ydf" type="text" readonly="readonly"
																		title="�ʵ��" maxlength="12" 
																		onKeyPress="amountPress()" 
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"/>
																
																</td>
																	<td class="text_tablehead_b" >
																	��ؼ���
																</td>
																<td colspan="4">
																	<input name="otherchange" id="ydjs" type="text" readonly="readonly"
																		title="��ؼ���" maxlength="19" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	������
																</td>
																<td>
																	<input name="counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="������" maxlength="19"  />
																</td>
															</tr>
                                               		   </table>
                                                  	
                                                  	
                                                  	
                                                  	
                                                    
                                                  	
                                                  	 
                                                   	 <div class="table_content">
                                                   	<table>
	                                                  	
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
	                                                      </tr>
                                                    		<tr>
																<td class="text_tablehead_b" >
																	����
																</td>
																<td colspan="3">
																	<textarea name="remarkinfo" id="fy" 
																		rows="2" cols="60" onKeyPress="charPress()" onKeyUp="limitLength(value,135,'��ʾ��','fy')"></textarea>
																</td>

															</tr>
                                               		   </table>
                                                   </div>
                                                                                      <div class="table_content">
                                                    	<table>
                                                    	
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="��  ��" onClick="commitForm();" />
                                                    			</td>
                                                    		<td >&nbsp;
                                                    			
                                                    				<input name="backButton" style="cursor: pointer" type="reset"
											class="button" value="��  ��"  />
											
                                                    			</td>
                                                    		</tr>
                                                    	</table>
                                                   </div>
                                                     <div class="table_content" align="center">
										    		
													<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
													
													</div>
                                                    
										   </td>
										 </tr>
															
															
									  </table>
                                  </div>
                                                     
                              </td>
                          </tr>
                                      </table>
						              
										
								</td>
							</tr>
						</table>
					<td></td>

					
<br />
													<br />
													<br />
		</form>
	</body>
</html>
