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
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.2.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
	    <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>

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
			  return;
		  }else{
			  document.getElementById("cdtracctid").value=obj.accountnumber;
		      document.getElementById("cdtrnm").value=obj.nm==null?"": obj.nm;
			  document.getElementById("cdtraddr").value=obj.addr==null?"": obj.addr;
			  document.getElementById("skhkhhhh").value=  obj.issuer==null?"": obj.issuer;   
			  document.getElementById("skrkhhmc").value=obj.issuernm==null?"":obj.issuernm;	
			   //document.all.bgdiv.style.display="none";
	          // document.all.checkdiv.style.display="none";
		 }
	   	});
	}	
	//��ѯ��������Ϣ
	function  PubQueryAccount(paymentGroupNum){
			clrAmt();
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
						      document.getElementById("kkhm").value=obj.mm==null?"": obj.mm;//�ۿ��
						      /*document.getElementById("dbtrnm").value=obj.mm==null?"": obj.mm;//����
						      document.getElementById("fkrdz").value=obj.addr==null?"": obj.addr;//��ַ
						     document.getElementById("sqrlxdh").value=obj.tel==null?"": obj.tel;//��ϵ�绰
						      document.getElementById("sgrzjh").value=obj.certid==null?"": obj.certid;//֤����accttp
						      */
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
			
			function selectLoad(){
				var temp = document.getElementById('ywlxbmval').value;
				transferOfClient(temp,'select_input');
				//var temp1 = document.getElementById('xth').value;
				//transferOfClient(temp1,'ywlxbmval');
			}
			
			//���������Ѳ�ѯ
			function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var hkje = document.getElementById('hkje');//�����
				var sxf = document.getElementById('sxf');//������
				var ydf = document.getElementById('ydf');//�ʵ��
				var ydjs = document.getElementById('ydjs');//��ؼ���
				var ze = document.getElementById('ze');//�ܶ�
				chargecal(url,hkje,sxf,ydf,ydjs,ze);
			}
			function clrAmt(){
				document.getElementById('hkje').value="0.00";
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('ze').value="0.00";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
			function commitForm(){
				if(VForm.Validate()){
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
				//�����ѽ���ʽת��
				if(sxf.value.replace(reg, "")!=""){
				    var number = sxf.value.replace(reg, "");
				   	sxf.value = number.replace(/[^\d\.-]/g, "");
				}
				//�ʵ�ѽ���ʽת��
				if(ydf.value.replace(reg, "")!=""){
				    var number = ydf.value.replace(reg, "");
				   	ydf.value = number.replace(/[^\d\.-]/g, "");
				}
				//��ؼ��ս���ʽת��
				if(ydjs.value.replace(reg, "")!=""){
				    var number = ydjs.value.replace(reg, "");
				   	ydjs.value = number.replace(/[^\d\.-]/g, "");
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
				
				if(document.getElementById("ywlxbmval").value=="A110"){
					this.document.getElementById("pcjje110").value=rmoney(document.getElementById("pcjje110").value);
			    document.getElementById("jfjje110").value=rmoney(document.getElementById("jfjje110").value);
			    document.getElementById("ytje110").value=rmoney(document.getElementById("ytje110").value);
			    document.getElementById("zfje110").value=rmoney(document.getElementById("zfje110").value);
			    document.getElementById("dfje110").value=rmoney(document.getElementById("dfje110").value);
			    document.getElementById("pjje201").value=rmoney(document.getElementById("pjje201").value);
				}
			    
			    
				document.forms[0].submit();
				}
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
				var sxf = document.getElementById("sxf").value; 
				var ydf = document.getElementById("ydf").value;
				var ydjs =document.getElementById("ydjs").value;
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
					document.getElementById("ze").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+n, 2);
				}else{
					document.getElementById("ze").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje)+n, 2);
				}
			}
 </script>
	</head>
	<body >
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
						                  	<div  class="text_title"><span class="text_blue2">����ί���տ�Ǽ�</span></div>
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
																	֧���������
																</td>
																<td >
																	<input name="paymentno" id="paymentno" type="text"  readonly="readonly" value="${entity.paymentno }"
																		maxlength="19" title="֧���������" />
																</td>
															
															<!-- 	�˵��˱�ʶ��--->
																	<input name="endtoendid" id="dddbsh" type="hidden" value="${entity.paymentno }"
																		title="�˵��˱�ʶ��"  />
																<input name="signpertype"  type="hidden" value="0">
																	<td class="text_tablehead_b" >
																	�յ��Ǽǲ����
																</td>
																<td >
																	<input name="comissonnum" id="comissonnum" type="text" size="19" 
																		maxlength="32" title="�յ�ί���տ�Ǽǲ����" />
																</td>
																
																
															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	ί�з�ʽ
																</td>
																<td>
																	<select name="pmttp" id="ywlxbmval" >
																		
                                                                        <option value="A108">
																			�绮
																		</option>
																		<option value="A109">
																			�ʻ�
																		</option>
																	</select>
																</td>
																<td class="text_tablehead_b" >
																	�յ�����
																</td>
																<td >
																	<input name="collectiondate" id="pjrq109" class="Wdate" type="text" 
																		 title="�յ�����" 
																		class="Wdate" onclick="WdatePicker()" />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	��������
																</td>
																<td>
																	<input name="collectiondate" id="pjrq109" class="Wdate" type="text" 
																		 title="�յ�����" 
																		class="Wdate" onclick="WdatePicker()" />
																</td>
															</tr>
															</table>
                                              </div>
                                              
                                                <div class="table_content">
                                                   	<table>
	                                                   
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">��֤��Ϣ</span></td>
	                                                      </tr>
																<tr>
																<td class="text_tablehead_b" >
																	������֤����
																</td>
																<td>
																	<input  name="appphone" id="sqrlxdh" type="text"
																		 maxlength="15" title="������֤����" />
																</td>
																<td class="text_tablehead_b"  >
																	������֤����
																</td>
																<td>
																	<select   name="certtype" id="zjlx">
																		<option value="01">
																			���гжһ�Ʊ
																		</option>
																		<option value="02">
																			��ҵ�жһ�Ʊ
																		</option>
																	</select>
																</td>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	������֤����
																</td>
																<td>
																	<input  name="appphone" id="sqrlxdh" type="text"
																		 maxlength="15" title="������֤����" />
																</td>
																<td class="text_tablehead_b" >
																	������֤����
																</td>
																<td>
																	<input  name="appphone" id="sqrlxdh" type="text"
																		 maxlength="15" title="������֤����" />
																</td>
																</tr>
																<tr>
																	<td >
																		 <input type="hidden"  name="proposeracctccy" title="�������˻�����" id="zhbz" value="CNY">
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
																	<input  name="appphone" id="sqrlxdh" type="text"
																		 maxlength="15" title="�������˺�" />
																</td>
																<td class="text_tablehead_b" >
																	����������
																</td>
																<td>
																	<input name="dbtrnm" id="fkrmc" type="text"
																		title="����������" maxlength="60"
																		onKeyPress="charPress()" />
																</td>
																</tr>
																<tr>
																	<td >
																		 <input type="hidden"  name="proposeracctccy" title="�������˻�����" id="zhbz" value="CNY">
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
																	<input name="cdtracctid" id="cdtracctid" type="text"
																		 title="�տ����˺�" maxlength="32"  onblur="queryBypaymentGroupNum(this.value)"
																		onKeyPress="charPress()" />
																		
																</td>
															
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="cdtrnm" id="cdtrnm" type="text"
																		title="�տ�������" maxlength="60"
																		onKeyPress="charPress()" />
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
																
																<td class="text_tablehead_b" >
																	�տ����к�
																</td>
																<td>
																	<input name="cdtrbrchid" id="skhhh" type="text" class="text_tablehead_b_c"
																		 title="�տ����к�" maxlength="12"   readonly="readonly"/>
																	<input type="button" class="button"  value="����" onclick="selectBankInfo()" >
																</td>
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="cdtracctnm" id="skhmc" type="text"
																		style="width: 180px;" title="�տ���������" maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															
															<tr>
																<td>
																	<input name="cdtrissr" id="skhkhhhh" type="hidden" class="text_tablehead_b_c"
																		 title="�տ��п������к�" maxlength="12" />
																</td>
																<td>
																	<input name="cdtrissrnm" id="skrkhhmc" type="hidden"  
																		title="�տ��˿���������" maxlength="60"
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
																<td class="text_tablehead_b" >
																	�տ���
																</td>
																<td >
																	<input name="allchange" id="ze" type="text" 
																		 title="�ܶ�" maxlength="19"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
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
	                                                  	 
	                                                 	 
															<!-- ��ҵ�����ͱ���ѡ��A109(ί���տ�(����))��ʱ��ʾdiv -->
															<tr id="A1091" style="display: none;">

																<td class="text_tablehead_b" >
																	Ʊ������
																</td>
																<td>
																	<input name="collectiondate" id="pjrq109" class="Wdate" type="text" 
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
																		 title="Ʊ�ݺ���" maxlength="32"
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
																	<input id="pjrq110" type="text"  name="honourdate" 
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
																	<input name="chkdate" id="pjrq201" type="text"
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

																<td class="text_tablehead_b">
																	�ɷ�����
																</td>
																<td>
																	<select name="jftype"  id="jflx301">
																	    <option value="" selected="selected">
																				��ѡ��
																		</option>
																		<option value="TP00" >
																			�ֽ�
																		</option>

																	</select>
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
																<td class="text_tablehead_b" >
																	�շѵ�λ��ˮ��
																</td>
																<td>
																	<input name="jfmsgid" id="sfdwlsh301" type="text"
																		 title="�շѵ�λ��ˮ��"
																		onKeyPress="actkeyPress()" maxlength="20" />
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
