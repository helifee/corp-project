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
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
	 	<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
	 	<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
	 	<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/js/common/jquery-1.3.1.js"></script>
		<script type="text/javascript" src="<%=path%>/js/zcxjs/zcx.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdcard.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
	    <script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
	   <script language="javascript">
		function saveFun(data) {}
		
		//�ύʱ�����տ�����Ϣ
		function OnSave() {
			var userMap = {};
			userMap.accountnumber = document.getElementById("skrzh").value;
			userMap.accountname = document.getElementById("skrmc").value;
			userMap.addr = document.getElementById("cdtraddr").value;
			userMap.issuer =document.getElementById("skhkhhhh").value;
			userMap.issuernm =document.getElementById("skrkhhmc").value;
			  PubService.saveOthersBankAccountMsg(userMap, function(data){
			  }); 
		}
		
		
	
		//���л���ѯ
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
		      document.getElementById("skrmc").value=obj.accountname==null?"": obj.accountname  ;//������
			  document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr  ; //�˵�ַ
			   document.getElementById("skhkhhhh").value= obj.issuer==null?"": obj.issuer ;   //�к�
			  document.getElementById("skrkhhmc").value=obj.issuernm==null?"":obj.issuernm ; //����
		 }
	   	});
		}
			
		
		
		//���л���ѯ
		function  PubQueryAccount(paymentGroupNum){
			if(isNull(trim(paymentGroupNum))){
						return;
					}
				var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
						pop.show();
						PubService.QueryAccount(paymentGroupNum,function(obj){
							pop.close();
					if(obj==null||obj.acctid==null){
						alert("�տ�����Ϣ��ѯʧ�ܣ�δ�鵽�����Ϣ" );
						document.getElementById("dbtracctid").value="";
					return;
					}else{   
						document.getElementById("payAccountId").value=document.getElementById("fkrzh").value;//�˺�
						document.getElementById("payAccountName").value=obj.mm==null?"": obj.mm;//����
						document.getElementById("fkrmc").value=obj.mm==null?"": obj.mm;//����
						document.getElementById("fkrdz").value=obj.addr==null?"": obj.addr;//��ַ
						document.getElementById("sqrlxdh").value=obj.tel==null?"": obj.tel;//��ϵ�绰
						document.getElementById("sgrzjh").value=obj.certid==null?"": obj.certid;//֤����
			}
			});
	   	}
		
		
		
			
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var recvbkno= document.getElementById("skhkhhhh");
				var recvbkname=document.getElementById("skrkhhmc");
				var skhhh= document.getElementById("skhhh");
				var skhmc=document.getElementById("skhmc");
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
			var moneyNum=document.getElementById("hkje");
			// msg=isMonNull(moneyNum,msg);
				if(VForm.Validate()){
					var billtp = document.getElementById("billtp").value;
					var cashpaybrnch = document.getElementById("cashpaybrnch").value;
					if(billtp == 'CT02' && cashpaybrnch == "") {
						alert("����Ʊ����Ϊ�ֽ��Ʊʱ,����Ҹ����кű��");
						return ;
					}
				   document.getElementById("hkje").value=rmoney(document.getElementById("hkje").value) ;
				   document.getElementById("sxf").value=rmoney(document.getElementById("sxf").value) ;
				   document.getElementById("ydf").value=rmoney(document.getElementById("ydf").value) ;
				   document.getElementById("ydjs").value=rmoney(document.getElementById("ydjs").value) ;
				   document.getElementById("payAccountId").value=document.getElementById("fkrzh").value;
				  if(document.getElementById("waiven").checked!=""){
					open3("<%=request.getContextPath()%>");
				}
				else{
					document.forms[0].submit();
				}
				  //document.forms[0].submit();
				}		
			}
			function bhhfunction(val){
				if(val=='Y'){
					/*$("#sxf").val("");
					$("#ydf").val("");
					$("#ydjs").val("");
					$("#sxf").attr("readonly",true);
					$("#ydf").attr("readonly",true);
					$("#ydjs").attr("readonly",true);*/
					document.getElementById("sxf").value=""; 
				    document.getElementById("ydf").value="";
					document.getElementById("sxf").readOnly=true;
					document.getElementById("ydf").readOnly=true;
					jisuan();
				}else{
					/*$("#sxf").attr("readonly",false);
					$("#ydf").attr("readonly",false);*/
					//$("#ydjs").attr("readonly",false);
					document.getElementById("sxf").readOnly=false;
					document.getElementById("ydf").readOnly=false;
				}
			}
			
			function isMonNull(moneyNum,msg){
		 	if(moneyNum.value==''||moneyNum.value==0.00||moneyNum.value==0||moneyNum.value=='0.00'||moneyNum.value=='0'){
		 		msg += moneyNum.title+"����Ϊ�գ�@";
		 		return msg;
		 	}
		 }

			//���������Ѳ�ѯ
			function addchange(){
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
				    signtype: '01',
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
				 // jisuan();
			}
			function clrAmt0(){
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('ze').value=document.getElementById('hkje').value;
			}
			function jisuan(){
				var sxf = document.getElementById("sxf").value; 
				var ydf = document.getElementById("ydf").value;
				var ydjs =document.getElementById("ydjs").value;
				var hkje = document.getElementById("hkje").value;
				document.getElementById("ze").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje), 2);
			}
			
			//ѡ�񸶿����˻� �� ���ȼ� ʱ��������Ϣ
			function clrAmt(){
				document.getElementById('hkje').value="";
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('ze').value="";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
			
			function setCashpaybrnch(val){
				if(val!="CT02"){
					document.getElementById("cashBtn").disabled="disabled";
				}
				if(val=="CT02"){
					document.getElementById("cashBtn").disabled="";
				}
			}

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
			<input type="hidden" name="pmttp" value="A202" /><!-- ҵ������ -->
			<input type="hidden" name="pmtkd" value="02901" /><!-- ҵ������ -->
			<input type="hidden" name="issuerbk" value="${bankInfo.bankcode }"/><!-- �������к� -->
			<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="signmd" name="signmd" type="hidden" maxlength="19" value="01"/><!-- ǩ��ģʽ -->
			<input  id="proposeracctccy" name="proposeracctccy" type="hidden" maxlength="19" value="CNY"/><!--�˻����� -->
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
						                  	<div  class="text_title"><span class="text_blue2">���л�Ʊ�ֽ�ǩ��</span></div>
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
																	<select  name="sttlmprty" id="yxj" onclick="clrAmt();">
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
																	<span  class="STYLE1">*</span>
																</td>
																
															</tr>
                                                    		<tr>
															<td class="text_tablehead_b"  >
																	��Ʊ����
														  </td>
																<td>
																		<select   name="billtp" id="billtp" onChange="setCashpaybrnch(this.value);">
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
															<td class="text_tablehead_b"  >
																	֤������
														  </td>
																<td>
																		<select   name="certtype" id="zjlx">
																		<option value="01">
																			���֤
																		</option>
																		<option value="02">
																			����֤
																		</option>
																		<option value="03">
																			ѧ��֤
																		</option>
																	
																	</select>
																	
																</td>
															
																<td class="text_tablehead_b" >
																	������֤����
																</td>
																<td >
																	<input name="appcertno" id="sgrzjh" type="text" size="19" onblur="checkIdCardNo(this.value,'sgrzjh')"
																		maxlength="32" title="������֤����" />
																		<span name="validate" dataName="appcertno" dataType="Empty" msg="������֤���Ų���Ϊ�գ�" class="STYLE1">*</span>
																</td>
													  </tr>
													  <tr>
													  <td class="text_tablehead_b" >
																	��������ϵ�绰
																</td>
																<td>
																	<input  name="appphone" id="sqrlxdh" type="text"
																		 maxlength="20" title="��������ϵ�绰" />
																		 
																</td>
                                                  				<td class="text_tablehead_b" >
																	����������
																</td>
																<td>
																	<input name="dbtrnm" id="payAccountName" type="text" 
																		title="����������" maxlength="60" />
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
                                                  				<td class="text_tablehead_b" >
																	�ۿ��˺�
																</td>
																<td>
																<input name="dbtracctid" id="payAccountId" type="hidden"
																		 title="�������˺�" maxlength="32" />
																	<input name="dbtramtacctid" id="fkrzh" type="text"
																		 title="�ۿ��˺�" maxlength="32""
																		onKeyPress="actkeyPress()" />
																		<!--  onblur="PubQueryAccount(this.value);clrAmt(); -->
																	<span name="validate" dataName="dbtramtacctid" dataType="Empty" msg="�ۿ��˺Ų���Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b" >
																	�ۿ��
																</td>
																<td>
																	<input name="dbamtnm" id="fkrmc" type="text"
																		title="�ۿ��" maxlength="60"
																		onKeyPress="charPress()" />
																	<span name="validate" dataName="dbamtnm" dataType="Empty" msg="�ۿ������Ϊ�գ�" class="STYLE1">*</span>	
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	����Ҹ����к�
																</td>
																<td>
																	<input name="cashpaybrnch" id="cashpaybrnch" type="text" class="text_tablehead_b_c"
																		 title="����Ҹ��к�" maxlength="12" value=""  readonly="readonly"
																		onKeyPress="actkeyPress()"  />
																		<input type="button" class="button" id="cashBtn"  value="����" onclick="selectBankInfoOfFkk()">
																		<span class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b">
																	����Ҹ�������
																</td>
																<td>
																	<input name="agtdbtrissrnm" id="agtdbtrissrnm" type="text" title="����Ҹ�������"
																		  maxlength="60" readonly="readonly" value=""
																		onKeyPress="actkeyPress()" />
																		<span name="validate" dataName="agtdbtrissrnm" dataType="Empty" msg="����Ҹ������Ʋ���Ϊ�գ�" class="STYLE1">*</span>	
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
                                           		  </table>
                                             
                                                  
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
																		onblur="queryBypaymentGroupNum(this.value);" />
																</td>
															
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="cdtrnm" id="skrmc" type="text"
																		title="�տ�������" maxlength="60"
																		onKeyPress="queryBypaymentGroupNum(this.value);" />
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
																		 title="�տ��˿������к�" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<input type="button" class="button"  value="����" onClick="selectBankInfo();">	
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
																		 title="�ܶ�" maxlength="12" />
																<span name="validate" dataName="allchange" dataType="Empty" msg="�ܶ��Ϊ�գ�" class="STYLE1">*</span>
																</td>
																</tr><tr>
																
																<td class="text_tablehead_b" >
																		�����
																	</td>
																	<td colspan="4">
																		<input name="ntryamt" id="hkje" type="text"
																			 title="�����" maxlength="12"
																			onKeyPress="amountPress()"
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange();"
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
																	<input name="charge" id="sxf" type="text" 
																		title="������" maxlength="12"  readonly="readonly"/>
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
																	<input name="postage" id="ydf" type="text"
																		title="�ʵ��" maxlength="12"  readonly="readonly"/>
																</td>
																<td class="text_tablehead_b" >
																	��ؼ���
																</td>
																<td colspan="4">
																	<input name="otherchange" id="ydjs" type="text" 
																		title="��ؼ���" maxlength="12"  readonly="readonly"/>
																
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
																	��ע
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
																		<input id="saveButton" type="reset" style="cursor: pointer" class="button" value="��  ��"   />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    			
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
