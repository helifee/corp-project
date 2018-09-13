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

		<script type="text/javascript"
			src="<%=path%>/js/transfer/transferOfTransit.js"></script>

		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/systemManager/showeditpanel.js"></script>

		<script type="text/javascript">
		
		
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
				selectBank(url,recvbkno,recvbkname,recvopnbkno);
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
			 /* if(VForm.Validate()){
			  
			  }*/
				var msg = validate();
				var reg = /(^\s)* | (\s$)* /gi;
				var hkje = document.getElementById('hkje');//�����
				var sxf = document.getElementById('sxf');//������
				var ydf = document.getElementById('ydf');//�ʵ��
				var ydjs = document.getElementById('ydjs');//��ؼ���
				var ze = document.getElementById('ze');//�ܶ�
				var chrgcdid=document.getElementById("chrgcdid");//���ñ���
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
				
				var boo = msgSplit(msg);
			    if(chrgcdid.value==""){
				   alert("���ñ��벻��Ϊ�գ�");
				   return;
				}
				if(boo){
				// document.getElementById("hvps11109").value=rmoney(document.getElementById("hvps11109").value) ;
				//document.getElementById("A10051").value=rmoney(document.getElementById("A10051").value) ;
					document.forms[0].submit();
				}
			}

			function fmoney(s, n)//������ת���ɶ��ŷָ�����ʽ,������λС��s:value,n:С��λ��      
			{   
			    n = n > 0 && n <= 20 ? n : 2;   
			    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
			    var l = s.split(".")[0].split("").reverse(),   
			    r = s.split(".")[1];   
			    t = "";   
			    for(i = 0; i < l.length; i ++ )   
			    {   
			    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
			    }   
			    return t.split("").reverse().join("") + "." + r;   
			}   
			//��ԭ���   
			function rmoney(s)   
			{   
				var str=/\S/;
				if(!str.test(s)){
					return 0;
				}
				 return parseFloat(s.replace(/[^\d\.-]/g, ""));   
			}
			
			function bhhfunction(val){
				if(val=='Y'){
					$("#sxf").val("");
					$("#ydf").val("");
					$("#ydjs").val("");
					$("#sxf").attr("readonly",true);
					$("#ydf").attr("readonly",true);
					$("#ydjs").attr("readonly",true);
					jisuan();
				}else{
					$("#sxf").attr("readonly",false);
					$("#ydf").attr("readonly",false);
					$("#ydjs").attr("readonly",false);
				}
			}

			function jisuan(){
			
				var sxf = $("#sxf").val();
				var ydf = $("#ydf").val();
				var ydjs = $("#ydjs").val();
				var hkje = $("#hkje").val();
				var n=0;
				var aa=document.getElementById('ywlxbmval').value;
				if(aa=='A104'){
				var amts = document.getElementsByName("amt");
				for(i=0;i<amts.length;i++){
				   n+=parseFloat(rmoney(amts[i].value));
				}
				}
				document.getElementById("ze").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje)+n, 2);
				
			}
			
			
			
			//���������
function AddRow()
{
var i = 1,j = 1;     //�к����к�
var oNewRow  ;    //��������ж���
var oNewCell1,oNewCell2,oNewCell3,oNewCell4;     //��������ж���
var listnum1 = 1;

i = document.getElementById("mytable").rows.length;
oNewRow = document.getElementById("mytable").insertRow(i);
oNewRow.id = j;
listnum1 = parseInt(listnum1)+1;
document.getElementById("listnum1").value = listnum1;
//��ӵ�һ��
oNewCell1 = document.getElementById("mytable").rows[i].insertCell(0);
//oNewCell1.style.backgroundColor="#FFFFFF"; 
oNewCell1.style.align="center";
//oNewCell1.style.class="text11";
oNewCell1.innerHTML = "<select name='collcode'><option value='1111111111'>��˰</option>"+
				"<option value='2222222222'>��˰</option><option value='3333333333'>����</option>"+
				"<option value='4444444444'>����</option><option value='5555555555'>����</option></select>";
//��ӵڶ���
oNewCell2 = document.getElementById("mytable").rows[i].insertCell(1);
oNewCell2.innerHTML = "<input type='text' name='adjustcode' id='adjustcode" + j + "'"+" value=\"\">";
//��ӵ�����
oNewCell3 = document.getElementById("mytable").rows[i].insertCell(2);
oNewCell3.innerHTML = "<input type='text' name='amt' id='amt" + j + "'"+"  value=\"\"  onKeyPress=\"amountPress()\" onblur=\"value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();\">";

//��ӵ�����


oNewCell4 = document.getElementById("mytable").rows[i].insertCell(3);
oNewCell4.innerHTML ="<input type='button' class='button' name=Del" + j + " value='ɾ��'"+"onClick='DelCurrentRow(" + j + ");'>";
j++;

}
		</script>
	</head>
	<body onload="selectLoad();">
		<form method="post"
			action="<%=path%>/transferOfTransitAction.do?method=sendMessage&signmd=03">
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
										<br />
										<table width="689" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td>
													<div class="text_title">
														<span class="text_blue2">�羳ת��ǩ��</span>
													</div>
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
																		ϵͳ��
																	</td>
																	<td>

																		<select id="xth" name="systemcd" title="ϵͳ��"
																			onChange="selectsyscode(this.value,'ywlxbmval');">
																			<option value="HVPS">
																				���
																			</option>
																			<option value="BEPS">
																				С��
																			</option>

																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		���ȼ�
																	</td>
																	<td>
																		<select name="sttlmprty" id="yxj">
																			<option value="NORM">
																				һ��
																			</option>
																			<option value="HIGH" selected="selected">
																				����
																			</option>
																			<option value="URGT">
																				�ؼ�
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>

																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		ҵ�����ͱ���
																	</td>
																	<td>
																		<select name="pmttp" id="ywlxbmval">
																			<option value="A113">
																				�羳֧��
																			</option>

																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		ҵ���������
																	</td>
																	<td>
																		<select name="pmtkd" id="select_input">
																			<option value="02123">
																				���˿羳���
																			</option>
																			<option value="02124">
																				���˿羳�˿�
																			</option>
																			<option value="02112">
																				����ó�׽���
																			</option>
																			<option value="02113">
																				����ó�׽����˿�
																			</option>
																			<option value="02114">
																				����ó�׽���
																			</option>
																			<option value="02115">
																				����ó�׽����˿�
																			</option>
																			<option value="02116">
																				�ʱ����¿羳֧��
																			</option>
																			<option value="02117">
																				�ʱ����¿羳֧���˿�
																			</option>
																			<option value="02125">
																				����������Ŀ֧��
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		֧�����
																	</td>
																	<td>
																		<input name="paymentno" id="" type="text"
																			readonly="readonly" value="${entity.paymentno }"
																			maxlength="19" title="֧�����" />

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
																		<select name="certtype" id="zjlx">
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
																		<span class="STYLE1">*</span>
																	</td>

																	<td class="text_tablehead_b">
																		������֤����
																	</td>
																	<td>
																		<input name="appcertno" id="sgrzjh" type="text"
																			size="19" maxlength="32" title="������֤����" />
																		<span name="validate" dataName="appcertno"
																			dataType="Empty" msg="������֤���Ų���Ϊ�գ�" class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		֤�����й���
																	</td>
																	<td>
																		<select name="certcountry" title="֤�����й���" id="zjfxgj">
																			<option value="CN">
																				CN-�л����񹲺͹�
																			</option>
																		</select>
																		<span class="STYLE1">*</span>

																	</td>

																	<td class="text_tablehead_b">
																		��������ϵ�绰
																	</td>
																	<td>
																		<input name="appphone" id="sqrlxdh" type="text"
																			maxlength="20" title="��������ϵ�绰" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>


																<tr>
																	<td class="text_tablehead_b">
																		�����˿ͻ���
																	</td>
																	<td>
																		<input type="text" maxlength="30"
																			name="proposercstmrid" title="�����˿ͻ���" id="sqrkhh">
																		<span class="STYLE1">*</span>

																	</td>

																	<td class="text_tablehead_b">
																		�������˻�����
																	</td>
																	<td>
																		<select name="proposeraccttp" title="����1���˻�����"
																			id="sqrzhlx">
																			<option value="AT00">
																				�Թ��˻�
																			</option>
																			<option value="AT01">
																				���˴��ǿ��˻�
																			</option>
																			<option value="AT02">
																				���˽�ǿ��˻�
																			</option>
																			<option value="AT03">
																				����
																			</option>
																			<option value="AT04">
																				����
																			</option>

																		</select>
																		<span class="STYLE1">*</span>
																	</td>

																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		�������˻�����
																	</td>
																	<td>
																		<input type="text" name="proposeracctccy"
																			title="�������˻�����" id="zhbz" value="CNY">

																		<span class="STYLE1">*</span>

																	</td>
																</tr>
														
																<tr>
																	<td class="text_tablehead_b">
																		�������к�
																	</td>
																	<td>
																		<input name="dbtrbrchid" id="fkhhh" type="text"
																			readonly="readonly" title="�������к�" maxlength="12"
																			value="${bankInfo.bankcode }"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		����������
																	</td>
																	<td>
																		<input name="dbtrbrnchnm" id="fkhmc" type="text"
																			title="����������" value="${bankInfo.participantname }"
																			maxlength="60" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		�������˺�
																	</td>
																	<td>
																		<input name="dbtracctid" id="fkrzh" type="text"  onblur="PubQueryAccount(this.value)"
																			title="�������˺�" maxlength="32"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		����������
																	</td>
																	<td>
																		<input name="dbtrnm" id="fkrmc" type="text"
																			title="����������" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
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
																		 <span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	�ۿ��
																</td>
																<td>
																	<input name="dbamtnm" id="kkhm" type="text"
																		title="�ۿ��" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
																<tr>
																	<td class="text_tablehead_b">
																		�����˵�ַ
																	</td>
																	<td colspan="3">
																		<input name="dbtraddr" id="fkrdz"
																			class="text_tablehead_b_addr"
																			onKeyPress="actkeyPress()"
																			onkeyup="limitLength(value,70,'��ʾ��','fkrdz')" />

																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		�����˿������к�
																	</td>
																	<td>
																		<input name="dbtrissr" id="fkrkhhhh" type="text"
																			class="text_tablehead_b_c" title="�����˿������к�"
																			maxlength="12" value="" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																		<input type="button" class="button" value="����"
																			onclick="selectBankInfoOfFkk()">

																	</td>
																	<td class="text_tablehead_b">
																		�����˿���������
																	</td>
																	<td>

																		<input name="dbtrissrnm" id="fkrkhkmc" type="text"
																			title="�����˿���������" maxlength="60" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		�����������к�
																	</td>
																	<td>
																		<input name="dbtrmmbid" id="fkqshhh" type="text"
																			readonly="readonly" title="�����������к�" maxlength="12"
																			value="${bankInfo.directbankcode }"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
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
																		�տ����к�
																	</td>
																	<td>
																		<input name="cdtrbrchid" id="skhhh" type="text"
																			class="text_tablehead_b_c" title="�տ����к�"
																			maxlength="12" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																		<input type="button" class="button" value="����"
																			onclick="selectBankInfo()">
																		<span class="STYLE1">*</span>
																	</td>

																	<td class="text_tablehead_b">
																		�տ�������
																	</td>
																	<td>
																		<input name="cdtracctnm" id="skhmc" type="text"
																			style="width: 180px;" title="�տ���������" maxlength="60"
																			readonly="readonly" onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		�տ����˺�
																	</td>
																	<td>
																		<input name="cdtracctid" id="skrzh" type="text"  onblur="queryBypaymentGroupNum(this.value)"
																			title="�տ����˺�" maxlength="32" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
																	</td>

																	<td class="text_tablehead_b">
																		�տ�������
																	</td>
																	<td>
																		<input name="cdtrnm" id="skrmc" type="text"
																			title="�տ�������" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		�տ��˵�ַ
																	</td>
																	<td colspan="3">
																		<input type="text" class="text_tablehead_b_addr"
																			name="cdtraddr" id="skrdz" onKeyPress="actkeyPress()"
																			onkeyup="limitLength(value,70,'��ʾ��','skrdz')" />

																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		�տ��˿������к�
																	</td>
																	<td>
																		<input name="cdtrissr" id="skhkhhhh" type="text"
																			class="text_tablehead_b_c" title="�տ��п������к�"
																			maxlength="12" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																		<input type="button" class="button" value="����"
																			onclick="selectBankInfoOfSkk()">
																	</td>

																	<td class="text_tablehead_b">
																		�տ��˿���������
																	</td>
																	<td>
																		<input name="cdtrissrnm" id="skrkhhmc" type="text"
																			readonly="readonly" title="�տ��˿���������" maxlength="60"
																			onKeyPress="actkeyPress()" />
																	</td>
																</tr>

																<tr>

																	<td class="text_tablehead_b">
																		�տ����������к�
																	</td>
																	<td>
																		<input name="cdtrmmbid" id="skhqshhh" type="text"
																			readonly="readonly" title="�տ����������к�" maxlength="12"
																			onKeyPress="actkeyPress()" />
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
																		<input name="currency" id="bzdm" type="text"
																			title="���ִ���" value="CNY" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																	</td>
																	<td class="text_tablehead_b">
																		�ܶ�
																	</td>
																	<td>
																		<input name="allchange" id="ze" type="text"
																			readonly="readonly" title="�ܶ�" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																		<span class="STYLE1">*</span>
																	</td>

																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		�����
																	</td>
																	<td colspan="4">
																		<input name="ntryamt" id="hkje" type="text"
																			title="�����" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />
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

																	<td class="text_tablehead_b">
																		���л�
																	</td>
																	<td>
																		<select name="selfaccount" id="bhh">
																			<option value="Y">
																				��
																			</option>
																			<option value="N">
																				��
																			</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		����
																	</td>
																	<td>

																		<input type="radio" class="text_tablehead_b_rad"
																			name="waive" value="N" checked="checked"
																			onclick="bhhfunction(this.value);">
																		������
																		<input type="radio" class="text_tablehead_b_rad"
																			name="waive" value="Y"
																			onclick="bhhfunction(this.value);">
																		����
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		������
																	</td>
																	<td>
																		<input name="charge" id="sxf" type="text" title="������"
																			maxlength="12" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />

																	</td>
																	<td class="text_tablehead_b">
																		�ʵ��
																	</td>
																	<td>
																		<input name="postage" id="ydf" type="text" title="�ʵ��"
																			maxlength="12" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />

																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		��ؼ���
																	</td>
																	<td colspan="4">
																		<input name="otherchange" id="ydjs" type="text"
																			title="��ؼ���" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />

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
																		<textarea name="remarkinfo" id="fy" rows="2" cols="60"
																			onKeyPress="charPress()"
																			onkeyup="limitLength(value,135,'��ʾ��','fy')"></textarea>
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
																		����ҵ��ο���
																	</td>
																	<td>
																		<input name="endtoendid" id="dddbsh" type="text"
																			maxlength="19" title="�˵��˱�ʶ��" />

																	</td>
																	<td class="text_tablehead_b">
																		����ҵ��ί������
																	</td>
																	<td>
																		<input name="accptncdt" type="text"
																			readonly="readonly" title="����ҵ��ί������" class="Wdate"
																			onclick="WdatePicker()" />
																	</td>
																</tr>
																
																<tr>
																	<td class="text_tablehead_b">
																		���ñ���
																	</td>
																	<td>
																	
																		
																		<select name="chrgcd" title="���ñ���"
																			 id="chrgcdid" >
																			 <option value="OUR">���𷽸���</option>
																			  <option value="BEN">���շ�����</option>
																			   <option value="SHA">��ͬ�е�</option>
																		</select>
																	</td>

																	<td class="text_tablehead_b">
																		�������շ�
																	</td>
																	<td>
																		<input type="text" name="sndbkchrg" title="�������շ�" />
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		�ձ����շ�
																	</td>
																	<td>
																		<input name="rcvbkchrg" type="text" title="�ձ����շ�" />
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		�羳ҵ����
																	</td>
																	<td colspan="3">
																		<textarea name="crossbrdrpstaddtlinf" rows="2"
																			cols="60"></textarea>
																	</td>

																</tr>

															</table>
														</div>

														<div class="table_content">
															<table>

																<tr>
																	<td class="text_tablehead_b">
																		&nbsp;
																	</td>
																	<td class="text_tablehead_b">
																		&nbsp;
																	</td>
																	<td>
																		<input name="addButton" type="button"
																			style="cursor: pointer" class="button" value="��  ��"
																			onclick="commitForm();" />
																	</td>
																	<td>
																		&nbsp;
																		<%-- 
                                                    				<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="��  ��" onclick="history.back();" />
											--%>
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
