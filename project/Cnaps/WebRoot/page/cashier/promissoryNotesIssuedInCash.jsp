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
		<title>���б�Ʊ�ֽ�ǩ��</title>

		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"	src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript"	src="<%=path%>/js/common/jquery-1.3.2.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		 <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>

		<script language="javascript">

		
		
			 	function zcx(val){
				if(val.value=='Y'){
					$("#sxf").val("");//������
					//$("#postCharge").val("");//�ʵ��
					//$("#otherPlaceCharge").val("");//��ؼ���
					$("#sxf").attr("readonly",true);
					//$("#postCharge").attr("readonly",true);
					//$("#otherPlaceCharge").attr("readonly",true);
					jisuan();
				}else{
					$("#sxf").attr("readonly",false);
					//$("#postCharge").attr("readonly",false);
					///$("#otherPlaceCharge").attr("readonly",false);
				}
			}
 
			function jisuan(){
				var sxf = $("#sxf").val();
			
				var hkje = $("#moneyNum").val();//�����
			 
				document.getElementById("totalMoney").value = fmoney(rmoney(sxf)+rmoney(hkje), 2);
			}
			function commitForm(){
				
			   var msg = "@";
			     var honourno = document.getElementById("honourno");//��Ʊ����
			      var billseal=document.getElementById("billseal");//��Ѻ
					 var password = document.getElementById("password");//������
					  var certnum = document.getElementById("certnum");//֤����
					    var proposerNm= document.getElementById("proposerNm");//����������
					    var phone= document.getElementById("phone");//������������ϵ�绰
					     var name = document.getElementById("name");//�տ�������
					      var moneyNum = document.getElementById("moneyNum");//��Ʊ���
					 var paymentGroup = document.getElementById("paymentGrouppo");
					
					
				                   
                     var totalMoney = document.getElementById("totalMoney");
                    
                     
                     if(isNull(trim(honourno.value))){
					msg += honourno.title+"����Ϊ�գ�@";
				    }
                      if(isNull(trim(billseal.value))){
					msg += billseal.title+"����Ϊ�գ�@";
				    }
				    if(isNull(trim(password.value))){
					msg += password.title+"����Ϊ�գ�@";
				    }
				    if(isNull(trim(certnum.value))){
					msg += certnum.title+"����Ϊ�գ�@";
				    }
                   if(isNull(trim(proposerNm.value))){
					msg += proposerNm.title+"����Ϊ�գ�@";
				    }
				     if(isNull(trim(phone.value))){
					msg += phone.title+"����Ϊ�գ�@";
				    }
					if(isNull(trim(name.value))){
						msg += name.title+"����Ϊ�գ�@";
				    }
				    if(isNull(trim(moneyNum.value))){
					msg += moneyNum.title+"����Ϊ�գ�@";
				    }
					if(isNull(trim(paymentGroup.value))){
					msg += paymentGroup.title+"����Ϊ�գ�@";
				    }
				    //if(isNull(trim(receAcount.value))){
					//msg += receAcount.title+"����Ϊ�գ�@";
				   // }
					
					
					if(isNull(trim(totalMoney.value))){
					msg += totalMoney.title+"����Ϊ�գ�@";
				    }
				   var boo = msgSplit(msg);
		      if(boo){
		      	 document.getElementById("totalMoney").value=rmoney(document.getElementById("totalMoney").value);
				  document.getElementById("moneyNum").value=rmoney(document.getElementById("moneyNum").value);//�����
				  document.getElementById("sxf").value=rmoney(document.getElementById("sxf").value );
		      
			      	if(document.getElementById("waiven").checked!=""){
						open3("<%=request.getContextPath()%>");
					}
					else{
						document.forms[0].submit();
					}
				}
		 }
		 
		 //���������Ѳ�ѯ
			function addchange(paymentGroupNum){
			
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt")%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt")%>";
				 var obj ={
				 	hkje:document.getElementById('moneyNum'),
				 	pmttp:document.getElementById('pmttp'),
				 	transno:'7123',
				    sxf : document.getElementById('sxf'),
				    ydf : document.getElementById('ydf'),
				    ydjs : document.getElementById('ydjs'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('totalMoney'),
				    yxj:document.getElementById('yxj'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs"),
				  	bepsgbf: document.getElementById("bepsgbf"),
				  	hvpsgbf: document.getElementById("hvpsgbf"),
				  	waiven: document.getElementById("waiven")
				  };
				  if(obj.hkje.value==""||obj.hkje.value=="0.00"){
				  	clrAmt();
				  }else{
					calcharge(url,beginamt,endamt,obj);				  
				  }
			}
		 function clrAmt(){
				document.getElementById('moneyNum').value="";
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('ze').value="";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
			function clrAmt0(){
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalMoney').value=document.getElementById('moneyNum').value;
			}
		 
		 
		</script>


		<SCRIPT language="javaScript"><!--
  function sendDate(){

  	send_request("<%=path%>/transfer/RealTimeCreditAction.do?method=paymentGroupNumAjax");
  	  }
    var http_request = false;
  function send_request(url) {//��ʼ����ָ������������������ĺ���
   http_request = false;
   if(window.XMLHttpRequest) { 
����http_request = new XMLHttpRequest();
����if (http_request.overrideMimeType) {//����MiME���
 ����http_request.overrideMimeType('text/xml');
����}
   }
   else if (window.ActiveXObject) { // IE�����
����try {
 ����http_request = new ActiveXObject("Msxml2.XMLHTTP");
����} catch (e) {
 ����try {
  ����http_request = new ActiveXObject("Microsoft.XMLHTTP");
 ����} catch (e) {}
����}
   }
   if (!http_request) { // �쳣����������ʵ��ʧ��
����window.alert("���ܴ���XMLHttpRequest����ʵ��.");
����return false;
   }
   http_request.onreadystatechange = processRequest;
   // ȷ����������ķ�ʽ��URL�Լ��Ƿ�ͬ��ִ���¶δ���
   http_request.open("GET", url, true);
   http_request.send(null);
  }
  // ��������Ϣ�ĺ���
 ����function processRequest() {
     ����if (http_request.readyState == 4) { // �ж϶���״̬
         ����if (http_request.status == 200) { // ��Ϣ�Ѿ��ɹ����أ���ʼ������Ϣ
         //Ĭ�Ϸ���01��Ҳ���Ǵ�����Ϣ����ʱע���Ϳ���
                        if(http_request.responseText=='01'){
	                alert("��ȡ֧���������ʧ�ܣ���ˢ��ҳ�����»�ȡ");
	             return false;
	               }
                      else{
	                 
		                
		                  document.form1.paymentGrouppo.value=http_request.responseText;
	           
		               
	             
	                }
         ����   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             ����     alert("���������ҳ�����쳣��");
         ����  }
     ����}
 ����}
      --></script>
</head>
	<body onload="sendDate()">
		<form  name="form1" method="post"
			action="<%=path%>/cashierAction.do?method=sendMessage&type=01">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="bepsgbf" name="bepsgbf" type="hidden" maxlength="19" />
			<input  id="hvpsgbf" name="hvpsgbf" type="hidden" maxlength="19" />
			<!-- ��ֹ�ظ��ύ -->
			<input id="cardcrash" name="cardcrash" type="hidden" value="crash">
		  <input id="contrperson" name="contrperson" type="hidden" >
		  <input id="pmttp" name="pmttp" type="hidden" value="D203" >
		  
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
						                  	<div  class="text_title"><span class="text_blue2">���б�Ʊ�ֽ�ǩ��</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                             <div class="table_body">
                                          <div class="table_content">
															<table>

																
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">������Ϣ</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		��Ʊ��ˮ��
																	</td>
																	<td>
																		<input name="po.paymentGrouppo" id="paymentGrouppo"
																			type="text" readonly="readonly" style="width: 180px;"
																			title="��Ʊ��ˮ��" maxlength="22"  />
																		<span class="STYLE1"> *</span>

																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		��Ʊ����
																	</td>
																	<td>
																		<select name="po.businessSizeCode"
																			id="businessSizeCode" style="width: 180px;"
																			title="��Ʊ����">
																			<option value="1" selected="selected">
																				�ֽ�Ʊ
																			</option></select>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		��Ʊ����
																	</td>
																	<td>
																		<input style="width: 180px;" name="po.honourno" maxlength="8"
																			id="honourno" type="text"  title="��Ʊ����" />
																		<span class="STYLE1"> *</span>
																	</td>
																	
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		��Ѻ
																	</td>
																	<td>
																	
																		<input style="width: 180px;" name="po.billseal"
																			id="billseal" type="text" size="20"
																			maxlength="20" title="��Ѻ"  />
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		��Ʊ������
																	</td>
																	<td>
																		<input style="width: 180px;" name="po.password"
																			id="password" type="text"  maxlength="4"
																			 title="��Ʊ������" />
																		<span class="STYLE1">*</span>
																	</td>
																	
																</tr>




															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">��������Ϣ</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		֤������
																	</td>
																	<td>
																		<select name="po.certsize" id="certsize">
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
																	<td class="text_tablehead_b">
																		֤����
																	</td>
																	<td>
																		<input name="po.certnum" id="certnum" type="text" onblur="checkIdCardNo(this.value,'certnum')"
																			size="19" maxlength="32" title="������֤����" /><span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		����������
																	</td>
																	<td>
																		<input name="po.proposerNm" id="proposerNm" type="text"
																			title="����������" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
																		<input name="po.payBankName" id="fkhmc" type="hidden"
																			title="����������" value="${bankInfo.participantname }"/>

																<input type="hidden" name="po.payBankNum" id="fkhhh"  title="�������к�" 
																			value="${bankInfo.bankcode }"/>
																	</td>
																	<td class="text_tablehead_b">
																		��ϵ�˵绰
																	</td>
																	<td>
																		<input name="po.phone" id="phone" type="text"
																			maxlength="20" title="��������ϵ�绰" /><span class="STYLE1">*</span>

																	</td>
																</tr>
																
																
        															<!--	<tr>
																	 <td class="text_tablehead_b">
																		�������к�
																	</td>
																	<td>
																		<input name="po.payBankNum" id="fkhhh" type="text"
																			readonly="readonly" title="�������к�" maxlength="12"
																			value="${bankInfo.bankcode }"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		����������
																	</td>
																	<td>
																		<input name="po.payBankName" id="fkhmc" type="text"
																			title="����������" value="${bankInfo.participantname }"
																			maxlength="60" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>  -->
															</table>
														</div>
														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">�տ�����Ϣ</span>
																	</td>
																</tr>


																<tr>
																	<td class="text_tablehead_b">
																		�տ�������
																	</td>
																	<td>
																		<input name="po.name" id="name" type="text"
																			title="�տ�������" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>


															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">�����Ϣ</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		���ִ���
																	</td>
																	<td>
																		<input name="po.moneyClassCode" id="moneyClassCode"
																			type="text" title="���ִ���" value="CNY"
																			readonly="readonly" onKeyPress="actkeyPress()" />
																	</td>
																	<td class="text_tablehead_b">
																		�ܶ�
																	</td>
																	<td>
																		<input name="po.totalMoney" id="totalMoney"
																			type="text" readonly="readonly" title="�ܶ�"
																			maxlength="12" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																		<span class="STYLE1">*</span>
																	</td>

																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		��Ʊ���
																	</td>
																	<td>
																		<input name="po.moneyNum" id="moneyNum" type="text"
																			title="��Ʊ���" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; addchange('this.value');" />
																		<span class="STYLE1">*</span>
																	</td>
                                                              
																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">�Ʒ���Ϣ</span>
																	</td>
																</tr>
																<tr>
															  	 
																<td class="text_tablehead_b" >
																	��ȡ����
																</td>
																<td >
																
																	<input type="radio" class="text_tablehead_b_rad"  name="po.waive" id="waivey" value="Y" checked="checked" onclick="addchange('this.value');">��ȡ
																	<input type="radio"  class="text_tablehead_b_rad" name="po.waive" id="waiven" value="N"  onclick="clrAmt0()">����ȡ
																	
																 
																</td>
															</tr>
																<tr>
																	<td  class="text_tablehead_b">
																		������
																	</td>
																	<td class="text_tablehead_b">
																		<input name="charge" id="sxf" type="text" 
																		title="������" maxlength="12"  readonly="readonly"
																		onKeyPress="amountPress()" 
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
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
																		title="�ʵ��" maxlength="19"  />
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
														</div>

														<div class="table_content">

															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">������Ϣ</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		����
																	</td>
																	<td colspan="3">
																		<textarea name="po.postscript" id="postscript"
																			rows="2" cols="68" onKeyPress="charPress()"
																			onkeyup="limitLength(value,135,'��ʾ��','fy')"></textarea>
																	</td>

																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>


																	<td style="width: 49%;">
																	</td>
																	<td style="width: 26%;" align="center">
																		<font color=red>˵������ɫ*��ע��Ϊ������</font>
																	</td>
																	<td style="width: 25%;">
																		&nbsp;
																	</td>
																</tr>
																<tr>


																	<td style="width: 49%;">
																	</td>
																	<td style="width: 26%;" align="center">
																		<input name="addButton" type="button"
																			style="cursor: pointer" class="button" value="��  ��"
																			onclick="commitForm();" />
																	<input name="backButton" style="cursor: pointer" type="reset"
																			class="button" value="��  ��"  />
																	</td>
																	<td style="width: 25%;">
																		&nbsp;
																	</td>
																</tr>

															</table>
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
			</table></form>
	</body>
</html>