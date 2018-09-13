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
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"	type="text/css" />
		
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        
		
		 <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.2.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		
	 <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		
		
		

<script language="javascript">
		
	//�ύʱ�����տ�����Ϣ
	function OnSave() {
		var userMap = {};
		userMap.accountnumber = document.getElementById("cdtracctid").value;
		userMap.accountname = document.getElementById("cdtrnm").value;
		userMap.addr = document.getElementById("cdtraddr").value;
		userMap.issuer =document.getElementById("skhkhhhh").value;
		userMap.issuernm =document.getElementById("skrkhhmc").value;
		  PubService.saveOthersBankAccountMsg(userMap, function(data){
		  	
		  }); 
	}
	//��ѯ�տ�����Ϣ
	function queryBypaymentGroupNum(paymentGroupNum){
		if(isNull(trim(paymentGroupNum))){
			return;
		}
		var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
		pop.show();
        PubService.queryOthersBankAccountMsg(paymentGroupNum,function(obj){
		    pop.close();
		  if(obj==null||obj.accountnumber==null){
				  alert(" ��ѯ��Ϣ�����ڣ�δ�鵽�������" );
				  return;
		  }else{
			  document.getElementById("cdtracctid").value=obj.accountnumber;
		      document.getElementById("cdtrnm").value=obj.accountname==null?"": obj.accountname  ;
			  document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr  ;
			   document.getElementById("skhkhhhh").value=  obj.issuer==null?"": obj.issuer ;   
			  document.getElementById("skrkhhmc").value=obj.issuernm==null?"":obj.issuernm ;	
			   //document.all.bgdiv.style.display="none";
	          // document.all.checkdiv.style.display="none";
		 }
	   	});
	}	
	//��ѯ��������Ϣ
	function  PubQueryAccount(paymentGroupNum){
		   			if(isNull(trim(paymentGroupNum))){
							 return;
					}
					var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
					pop.show();
					PubService.QueryAccount(paymentGroupNum,function(obj){
					     pop.close();
						 if(obj==null||obj.acctid==null){
						 	 alert(" ��ѯ��Ϣ�����ڣ�δ�鵽�������" );
						  	 return;
						 }else{
							  document.getElementById("kkzh").value=obj.acctid==null?"": obj.acctid;//�ۿ��˺�
						      document.getElementById("kkhm").value=obj.mm==null?"": obj.mm;//�ۿ��
						      document.getElementById("dbtrnm").value=obj.mm==null?"": obj.mm;//����
						       document.getElementById("sqrzhlx").value=obj.accttp==null?"": obj.accttp;//�������˻����� 
						      document.getElementById("fkrdz").value=obj.addr==null?"": obj.addr;//��ַ
						      document.getElementById("sqrlxdh").value=obj.tel==null?"": obj.tel;//��ϵ�绰
						      document.getElementById("sgrzjh").value=obj.certid==null?"": obj.certid;//֤����
						      document.getElementById("proposercstmrid").value=obj.cstmrid==null?"": obj.cstmrid;//�����˿ͻ���
						      
						 }
			   	});
				
			}
		
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var recvbkno= document.getElementById("skhhh");
				var recvbkname=document.getElementById("skhmc");
				var recvopnbkno=document.getElementById("skhqshhh");
				var skhkhhhh= document.getElementById("skhkhhhh");
				var skrkhhmc=document.getElementById("skrkhhmc");
				selectkhhBank(url,recvbkno,recvbkname,recvopnbkno,skhkhhhh,skrkhhmc);
				
			}
			
			
			
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var fkrkhhhh= document.getElementById("fkrkhhhh");
				var fkrkhkmc=document.getElementById("fkrkhkmc");
				selectBank(url,fkrkhhhh,fkrkhkmc,"");
			}
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skhkhhhh= document.getElementById("skhkhhhh");
				var skrkhhmc=document.getElementById("skrkhhmc");
				selectBank(url,skhkhhhh,skrkhhmc,"");
			}
			function selectLoad(){
				var temp = document.getElementById('ywlxbmval').value;
				transferOfClient(temp,'select_input');
				
				var temp1 = document.getElementById('xth').value;
				transferOfClient(temp1,'ywlxbmval');

			}
			function commitForm(){
			 
			  OnSave();
				var msg = validate();
				
				var boo = msgSplit(msg);
				if(boo){
				var reg = /(^\s)* | (\s$)* /gi;
				var hkje = document.getElementById('hkje');//�����
				var sxf = document.getElementById('sxf');//������
				var ydf = document.getElementById('ydf');//�ʵ��
				var ydjs = document.getElementById('ydjs');//��ؼ���
				var ze = document.getElementById('ze');//�ܶ�
				var mxhzje = document.getElementById('mxhzje104');//��ϸ���ܽ��
				var amts = document.getElementsByName('amt');//��������ʽ𻮲� �����ϸ
				if(hkje.value.replace(reg, "")=="NaN.undefined"){
					alert("���׽���Ϊ�գ�");
					hkje.value = "";
					return false;
				}
				//������ʽת��
				if(hkje.value.replace(reg, "")!=""){
				    var number = hkje.value.replace(reg, "");
				   	hkje.value = number.replace(/[^\d\.-]/g, "");
				}
				
				//�ܽ���ʽת��
				if(ze.value.replace(reg, "")!=""){
				    var number = ze.value.replace(reg, "");
				   	ze.value = number.replace(/[^\d\.-]/g, "");
				}
				
				//��ϸ���ܽ���ʽת��
				if(mxhzje.value.replace(reg, "")!=""){
				    var number = mxhzje.value.replace(reg, "");
				   	mxhzje.value = number.replace(/[^\d\.-]/g, "");
				}
				
				
				//��������ʽ𻮲������ϸ
				for (var i = 0; i < amts.length; i++) {
			  
			    if(amts[i].value.replace(reg, "")!=""){
				    var number = amts[i].value.replace(reg, "");
				   	amts[i].value = number.replace(/[^\d\.-]/g, "");
				}
			      }
				
				
				
				
				var newurl = "<%=path %>/page/transfer/exchange/abc.jsp";
		       viewDetails(newurl);
				
				
				
				}
			}
			
			
			
			function bhhfunction(val){
				if(val=='Y'){
					
					document.getElementById("sxf").value=""; 
				    document.getElementById("ydf").value="";
				    document.getElementById("ydjs").value="";
					document.getElementById("sxf").readOnly=true;
					document.getElementById("ydf").readOnly=true;
					document.getElementById("ydjs").readOnly=true;
					jisuan();
				}else{
					
					document.getElementById("sxf").readOnly=false;
					document.getElementById("ydf").readOnly=false;
					document.getElementById("ydjs").readOnly=false;
				}
			}

			function jisuan(){
			
				var hkje = document.getElementById("hkje").value;  
				var n=0;
				var aa=document.getElementById('ywlxbmval').value;
				
				if(aa=='A104'){
				var amts = document.getElementsByName("amt");
				
				for(i=0;i<amts.length;i++){
				
				   n+=parseFloat(rmoney(amts[i].value));
				}
					document.getElementById("hkje").value=fmoney(n,2);
					document.getElementById("mxhzje104").value=fmoney(n,2);
					document.getElementById("ze").value = fmoney(n, 2);
				}else{
					document.getElementById("ze").value = fmoney(rmoney(hkje)+n, 2);
				}
				
				
			}
			
		
			

 </script>
	</head>
	<body onload="selectLoad();">
		<form method="post"
			action="<%=path%>/transferOfTransitAction.do?method=sendMessage&signmd=01">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					
					<td></td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">����ת�˻��</span></div>
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
																
																<input type="hidden" id="xth"  name="systemcd" title="ϵͳ��" value="HVPS" onChange="selectsyscode(this.value,'ywlxbmval');"> 
																
																
																	
																
																
															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	ҵ�����ͱ���
																</td>
																<td>
																	<select name="pmttp" id="ywlxbmval" 
																		onChange="transferOfClient(this.value,'select_input');changehkle(this.value,'hkje');">
																		
                                                                        <option value="A108">
																			�ֽ���
																		</option>
																		<option value="A109">
																			ί���տ�(����)
																		</option>
																		<option value="A110">
																			���ճи�(����)
																		</option>
																		
																		<option value="A101">
																			�������ʽ�㻮
																		</option>
																		
																		<option value="A102">
																			������
																		</option>
																		
																		<option value="A104">
																			�����ʽ���ǻ���
																		</option>
																	
																		<option value="A301">
																			�ɷ�ҵ��
																		</option>
																		
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	ҵ���������
																</td>
																<td >
																	<select name="pmtkd" id="select_input" 
																		onchange="isDisplayToInline(this.value);">
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	֧���������
																</td>
																<td >
																	<input name="paymentno" id="" type="text"  readonly="readonly" value="${entity.paymentno }"
																		maxlength="19" title="֧���������" />
																
																	<span  class="STYLE1">*</span>
																</td>
															
															<!-- 	�˵��˱�ʶ��--->
																	<input name="endtoendid" id="dddbsh" type="hidden" value="${entity.paymentno }"
																		title="�˵��˱�ʶ��"  />
																
																
																
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
																		<span name="validate" dataName="appcertno" dataType="Empty" msg="������֤���Ų���Ϊ�գ�" class="STYLE1"></span>
																</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	����й���
																</td>
																<td >
																	 <select  name="certcountry" title="֤�����й���" id="zjfxgj">
																		 <option value="CN">CN-�л����񹲺͹�</option>
																		 </select>
															
																</td>

																<td class="text_tablehead_b" >
																	��������ϵ�绰
																</td>
																<td>
																	<input  name="appphone" id="sqrlxdh" type="text"
																		 maxlength="15" title="��������ϵ�绰" />
																</td>
																</tr>
																
																
																<tr>
																<td class="text_tablehead_b" >
																	�����˿ͻ���
																</td>
																<td >
																	 <input type="text"  maxlength="30" name="proposercstmrid" id="proposercstmrid" title="�����˿ͻ���" id="sqrkhh">
															
																</td>

																<td class="text_tablehead_b" >
																	�������˻�����
																</td>
																<td>
																		 <select  name="proposeraccttp" title="�������˻�����" id="sqrzhlx">
																		 <option >��ѡ��</option>
																		 <option value="AT00">�Թ��˻�</option>
																		  <option value="AT01">���˴��ǿ��˻�</option>
																		   <option value="AT02">���˽�ǿ��˻�</option>
																		    <option value="AT03">����</option>
																		     <option value="AT04">����</option>
																		     
																		 </select>
																		 
																</td>
																
																</tr>
																<tr>
																	
																
																<td >
																	 <input type="hidden"  name="proposeracctccy" title="�������˻�����" id="zhbz" value="CNY">
																		
															
																</td>
																</tr>
	                                             
                                                  			<tr>
																<td>
																	<input name="dbtrbrchid" id="fkhhh" type="hidden" readonly="readonly"
																		 title="�������к�"  maxlength="12"  value="${bankInfo.bankcode }"
																		onKeyPress="actkeyPress()" />
																</td>
																<td>
																	<input name="dbtrbrnchnm" id="fkhmc" type="hidden" title="����������" value="${bankInfo.participantname }"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  			
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�������˺�
																</td>
																<td>
																	<input name="dbtracctid" id="fkrzh" type="text" onblur="PubQueryAccount(this.value)"
																		 title="�������˺�" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	����������
																</td>
																<td>
																	<input name="dbtrnm" id="fkrmc" type="text"
																		title="����������" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
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
																</td>
																<td class="text_tablehead_b" >
																	�ۿ��
																</td>
																<td>
																	<input name="dbamtnm" id="kkhm" type="text"
																		title="�ۿ��" maxlength="60"
																		onKeyPress="charPress()" />
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
																	<input name="dbtrissr" id="fkrkhhhh" type="hidden" class="text_tablehead_b_c"
																		 title="�����˿������к�" maxlength="12" value="${bankInfo.bankcode }"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		
																</td>
																<td>

																	<input name="dbtrissrnm" id="fkrkhkmc" type="hidden" title="�����˿���������"
																		  maxlength="60" readonly="readonly" value="${bankInfo.participantname }"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  			<tr>
																<td>
																	<input name="dbtrmmbid" id="fkqshhh" type="hidden" readonly="readonly"
																		 title="�����������к�" maxlength="12" value="${bankInfo.directbankcode }"
																		onKeyPress="actkeyPress()" />
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
																	�տ����к�
																</td>
																<td>
																	<input name="cdtrbrchid" id="skhhh" type="text" class="text_tablehead_b_c"
																		 title="�տ����к�" maxlength="12"   readonly="readonly"
																		 />
																		<input type="button" class="button"  value="����" onclick="selectBankInfo()" >
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="cdtracctnm" id="skhmc" type="text"
																		style="width: 180px;" title="�տ���������" maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																	�տ����˺�
																</td>
																<td>
																	<input name="cdtracctid" id="cdtracctid" type="text"
																		 title="�տ����˺�" maxlength="32"  onblur="queryBypaymentGroupNum(this.value)"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="cdtrnm" id="cdtrnm" type="text"
																		title="�տ�������" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	�տ��˵�ַ
																</td>
																<td colspan="3">
																	<input type="text" class="text_tablehead_b_addr" name="cdtraddr" id="cdtraddr" 
																		onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'��ʾ��','skrdz')" />
																	
																</td>
															</tr>
															<tr>
																
																
																<td>
																	<input name="cdtrissr" id="skhkhhhh" type="hidden" class="text_tablehead_b_c"
																		 title="�տ��п������к�" maxlength="12"  value="123"  
																		  />
																</td>
															
																
																<td>
																	<input name="cdtrissrnm" id="skrkhhmc" type="hidden"  
																		title="�տ��˿���������" maxlength="60" value="123"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															
																<tr>
																
																
																<td>
																	<input name="cdtrmmbid" id="skhqshhh" type="hidden" readonly="readonly"
																		title="�տ����������к�" maxlength="12" 
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
																
																
																	<input name="allchange" id="ze" type="hidden" readonly="readonly"
																		 title="�ܶ�" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																
																
																
																	<td class="text_tablehead_b" >
																		�����
																	</td>
																	<td colspan="4">
																		<input name="ntryamt" id="hkje" type="text"
																			 title="�����" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />
																	<span  class="STYLE1">*</span>
																	</td>
																	
																</tr>
                                                  		</table>
                                                  	</div>
                                                  	 
                                                  	
                                                  	 
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
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','fy')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                   </div>
                                                    
                                                    <div class="table_content">
                                                   	<table>
	                                                  	 
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">��������Ϣ</span></td>
	                                                      </tr>
															<!-- ��ҵ�����ͱ���ѡ��A109(ί���տ�(����))��ʱ��ʾdiv -->
															<tr id="A1091" style="display: none;">

																<td class="text_tablehead_b" >
																	Ʊ������
																</td>
																<td>
																	<input name="collectiondate" id="pjrq109" class="Wdate" type="text" value="${sessionScope.workDate }"
																		readonly="readonly" title="Ʊ������" 
																		class="Wdate" onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																
																<td class="text_tablehead_b" >
																	Ʊ������
																</td>
															
																<td>
																	<select  title="Ʊ������" id="pjzl109" name="collectiontype" >
																	    <option value="">
																			��ѡ��
																		</option>
																		<option value="01">
																			���гжһ�Ʊ
																		</option>
																		<option value="02">
																			���ڴ浥
																		</option>
																		<option value="03">
																			ƾ֤ʽ��ծ
																		</option>
																		<option value="04">
																			��ػ��ڴ���
																		</option>
																		<option value="99">
																			����
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr id="A1092" style="display: none;">
																<td class="text_tablehead_b" >
																	Ʊ�ݺ���
																</td>
																<td>
																	<input name="collectionno" id="pjhm109" type="text"
																		style="width: 140px;" title="Ʊ�ݺ���" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td colspan="3">&nbsp;</td>
															</tr>


															<!-- ��ҵ�����ͱ���ѡ��A110(-���ճи������أ�)����ʾDIV -->
															<tr id="A1101" style="display: none;">
																<td class="text_tablehead_b" >
																	Ʊ������
																</td>
																<td>
																	<input id="pjrq110" type="text"  name="honourdate" value="${sessionScope.workDate } "
																		class="Wdate" title="Ʊ������" maxlength="16"
																		onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	Ʊ�ݺ���
																</td>
																<td>
																	<input id="pjhm110" type="text"  name="honourno"
																		title="Ʊ�ݺ���" maxlength="32" onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>

															<tr id="A1102" style="display: none;">
																<td class="text_tablehead_b" >
																	�⳥����
																</td>
																<td>
																	<input name="damages" id="pcjje110" type="text"
																		 title="�⳥����"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" >
																	�ܸ�����
																</td>
																<td>
																	<input id="jfjje110" type="text"  name="refusechange"
																		title="�ܸ�����" onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

															</tr>
															<tr id="A1103" style="display: none;">
																<td class="text_tablehead_b" >
																	ԭ�н��
																</td>
																<td>
																	<input name="orgnlamt" id="ytje110" type="text"
																		 title="ԭ�н��"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" >
																	֧�����
																</td>
																<td>
																	<input id="zfje110" type="text"  name="pmtamt"
																		title="֧�����" onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr id="A1104" style="display: none;">
																<td class="text_tablehead_b" >
																	�ึ���
																</td>
																<td>
																	<input name="oddamt" id="dfje110" type="text"
																		 title="�ึ���"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

															
															</tr>

															<!-- ��ҵ�����ͱ���ѡ��A201(֧Ʊ)��ҵ���������ѡ��03401(֧Ʊ)ʱ��ʾdiv -->


															<tr id="A2011" style="display: none;">
																<td class="text_tablehead_b" >
																	Ʊ������
																</td>
																<td>
																	<input name="chkdate" id="pjrq201" type="text" value="${sessionScope.workDate } "
																		style="width: 180px;"  title="Ʊ������"
																		onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	��Ʊ������
																</td>
																<td>
																	<input name="chknm" id="cprmc201" type="text"
																		title="��Ʊ������" onKeyPress="actkeyPress()"
																		maxlength="60" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>

															<tr id="A2012" style="display: none;">
																<td class="text_tablehead_b" align="right">
																	Ʊ�ݽ��
																</td>
																<td>
																	<input name="chkamt" id="pjje201" type="text"
																		 title="Ʊ�ݽ��"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" align="right">
																	�Ƽ�
																</td>
																<td>
																	<input name="chkprice" id="pj201" type="text"
																		title="�Ƽ�"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>

															</tr>
															<tr id="A2013" style="display: none;">
																<td class="text_tablehead_b" >
																	Ʊ������
																</td>
																<td>
																	<input name="chkCount" id="pjzs201" type="text"
																		 title="Ʊ������" maxlength="4" />
															<span  class="STYLE1">*</span>
																</td>
															</tr>


															<!-- ��ҵ������ҵ������ΪA301-(�ɷ�ҵ��)��ʱ��ʾdiv -->

															<tr id="A3011" style="display: none;">

																<td class="text_tablehead_b" >
																	�շѵ�λ��ˮ��
																</td>
																<td>
																	<input name="jfmsgid" id="sfdwlsh301" type="text"
																		 title="�շѵ�λ��ˮ��"
																		onKeyPress="actkeyPress()" maxlength="20" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" >
																	�����ڼ�
																</td>
																<td>
																	<input name="jfdate" id="ssqj301" type="text"
																		 maxlength="16" title="�����ڼ�" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr id="A3012" style="display: none;">
																<td class="text_tablehead_b">
																	�ɷ�����
																</td>
																<td>
																	<select name="jftype"  id="jflx301">
																	    <option value="">
																	    ��ѡ��
																	    </option>
																		<option value="TP00" selected="selected">
																			�ֽ�
																		</option>

																	</select>
																	<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b">
																	�շѸ���
																</td>
																<td>
																	<textarea name="jfremarkinfo" id="sfyy301"  rows="3"
																		 title="�շѸ���"></textarea>
																</td>
															</tr>


															<!-- ��ҵ������ A104-�����ʽ���ǻ���  ��ʾDIV-->

															<tr id="A1041" style="display: none;">

																<td class="text_tablehead_b" >
																	��ϸ���ܽ��
																</td>
																<td>
																	<input name="gkallchange" id="mxhzje104" type="text" 
																		title="��ϸ���ܽ��" onKeyPress="amountPress()" readonly="readonly"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" /><span  class="STYLE1">*</span>
																
																
																</td>

																<td class="text_tablehead_b" >
																	�ϱ��������
																</td>
																<td>
																	<input name="gksendcode" id="sbgkdm104" type="text"
																		title="�ϱ��������" maxlength="10" /><span  class="STYLE1">*</span>
																
																</td>
															</tr>

															<tr id="A1042" style="display: none;">

																<td class="text_tablehead_b">
																	���չ������
																</td>
																<td>
																	<input name="gkreceivecode" id="jsgkdm104" type="text" 
																		title="���չ������" maxlength="10" /><span  class="STYLE1">*</span>
																
																</td>

																<td class="text_tablehead_b" >
																	��������
																</td>
																<td>
																	<input name="gktabledate" id="bbrq104" type="text"  value="${sessionScope.workDate } "
																		 class="Wdate" title="��������"
																		onclick="WdatePicker()" /><span  class="STYLE1">*</span>
																
																</td>
															</tr>

															<tr id="A1043" style="display: none;">

																<td class="text_tablehead_b">
																	�������
																</td>
																<td>
																	<input name="gktableid" id="bbxh104" type="text" 
																		title="�������" onKeyPress="actkeyPress()" maxlength="10" /><span  class="STYLE1">*</span>
																
																</td>

																<td class="text_tablehead_b" >
																	Ԥ�㼶��
																</td>
																<td>
																	<select name="gkbudgetlevel" id="ysjb104" >
																	    <option value="">
																			��ѡ��
																		</option>
																		<option value="BL00">
																			����
																		</option>
																		<option value="BL01">
																			ʡ��
																		</option>
																	</select><span  class="STYLE1">*</span>
																
																</td>
															</tr>

															<tr id="A1044" style="display: none;">
																<td class="text_tablehead_b" >
																	�����ڱ�־
																</td>
																<td>
																	<select name="gkadjustsign" id="tzqbz104">
																	    <option value="">
																			��ѡ��
																		</option>
																		<option value="ID00">
																			����
																		</option>
																		<option value="ID01">
																			������
																		</option>
																	</select><span  class="STYLE1">*</span>
																
																</td>

																<td class="text_tablehead_b" >
																	Ԥ������
																</td>
																<td>
																	<select name="gkbudgettype"  id="yszl104">
																	 <option value="">
																			��ѡ��
																		</option>
																		<option value="BT00">
																			Ԥ����
																		</option>
																		<option value="BT01">
																			Ԥ����
																		</option>
																	</select><span  class="STYLE1">*</span>
																
																</td>
															</tr>

															<tr id="A1045" style="display: none;">
																<td class="text_tablehead_b" >
																	��ϸ����
																</td>
																<td>
																	<input name="gkcount" id="listnum1" type="text"
																		 value="1" />
																<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" >
																	��ϸ�б�
																</td>
																<td class="text_tablehead_b" >
																	<input type="button" class="button" value="���" onclick="AddRow();" />
																<span  class="STYLE1">*</span>
																</td>
															</tr>


															<tr id="A1046" style="display: none;">
																<td colspan="4" >
																	<div align="center">
																		<table id="mytable"  cellpadding="0"
																			cellspacing="0"
																			style="text-align: center; vertical-align: top;">

																			<tr id="gr1">
																				<td class="text_tablehead_b" >
																					���ջ��ش������&nbsp;&nbsp;&nbsp;
																				</td>
																				<td class="text_tablehead_b">
																					Ԥ���Ŀ����&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																				</td>
																				<td class="text_tablehead_b"  >
																					������&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
																				</td>

																			</tr>
																			<tr>
																			
																				<td>
																					<select name="collcode" >
																					 
																						<option value="1111111111">
																							��˰
																						</option>
																						<option value="2222222222">
																							��˰
																						</option>
																						<option value="3333333333">
																							����
																						</option>
																						<option value="4444444444">
																							����
																						</option>
																						<option value="5555555555">
																							����
																						</option>
																					</select>
																				</td>
																				

																				<td>
																					<input type="text" name="adjustcode" id="adjustcode" value="" />
																				</td>
																				
																				<td>
																				<input type="text" name="amt" id="amt" value="" 
																				
																						onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />
																				</td>
																				<td>&nbsp;</td>
																			</tr>

																		</table>
																	</div>
																</td>
															</tr>
															<tr id="A0000" style="display: none;">
															
																
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
																		class="button" value="��  ��" onclick="commitForm();" />
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
													</div>
                                           </td>
                                         </tr>
                                      </table>
						              
										
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td></td>

					
				</tr>
			</table>
<br />
													<br />
													<br />
		</form>
	</body>
</html>
