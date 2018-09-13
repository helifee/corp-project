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
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>

		<script type="text/javascript">
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
			
			function commitForm(){
			
					document.forms[0].submit();
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

		</script>
	</head>
	<body>
		<form method="post"
			action="<%=path%>/transferOfTransitAction.do?method=sendMessage&signmd=02">
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
								<td width="10">&nbsp;
									
							  </td>
								<td align="center">
									<div align="center">
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">���л�Ʊ�ʽ��ƴ�</span></div>
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
																
																<td class="text_tablehead_b" >
																	ϵͳ��
																</td>
																<td>
																
																	<select   id="xth"  name="systemcd" title="ϵͳ��">
																		<option value="HVPS" selected="selected">
																			���
																		</option>
																		
																		
																	</select>
																	<span  class="STYLE1">*</span>
																	</td>
																<td class="text_tablehead_b" >
																	���ȼ�
																</td>
																<td>
																	<select  name="sttlmprty" id="yxj">
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
																	<span  class="STYLE1">*</span>
																</td>
																
															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	ҵ�����ͱ���
																</td>
																<td>
																	<select name="pmttp" id="ywlxbmval" >
																		
                                                                       
																		<option value="A202" selected="selected">
																			���л�Ʊ
																		</option>
																		
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	ҵ���������
																</td>
																<td >
																	<select name="pmtkd" id="select_input" >
																	<option value="02901" selected="selected">
																			���л�Ʊ�ʽ��ƴ�
																	  </option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	֧�����
															  </td>
																<td >
																	<input name="paymentno" id="" type="text"  readonly="readonly" value="${entity.paymentno }"
																		maxlength="19" title="֧�����" />
																
																	<span  class="STYLE1">*</span>
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
																	<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	������֤����
																</td>
																<td >
																	<input name="appcertno" id="sgrzjh" type="text" size="19"
																		maxlength="32" title="������֤����" />
																		<span name="validate" dataName="appcertno" dataType="Empty" msg="������֤���Ų���Ϊ�գ�" class="STYLE1">*</span>
																</td>
													  </tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	֤�����й���
																</td>
																<td >
																	 <select  name="certcountry" title="֤�����й���" id="zjfxgj">
																		 <option value="CN">CN-�л����񹲺͹�</option>
																  </select>
																		  <span  class="STYLE1">*</span>
															
																</td>

																<td class="text_tablehead_b" >
																	��������ϵ�绰
																</td>
																<td>
																	<input  name="appphone" id="sqrlxdh" type="text"
																		 maxlength="20" title="��������ϵ�绰" />
																		 <span  class="STYLE1">*</span>
																</td>
																</tr>
																
																
																<tr>
																<td class="text_tablehead_b" >
																	�����˿ͻ���
																</td>
																<td >
																	 <input type="text"  maxlength="30" name="proposercstmrid" title="�����˿ͻ���" id="sqrkhh">
																		  <span  class="STYLE1">*</span>
															
																</td>

																<td class="text_tablehead_b" >
																	�������˻�����
																</td>
																<td>
																		 <select  name="proposeraccttp" title="�������˻�����" id="sqrzhlx">
																		 <option value="AT00">�Թ��˻�</option>
																		  <option value="AT01">���˴��ǿ��˻�</option>
																		   <option value="AT02">���˽�ǿ��˻�</option>
																		    <option value="AT03">����</option>
																		     <option value="AT04">����</option>
																		     
																		 </select>
																		 <span  class="STYLE1">*</span>
																</td>
																
																</tr>
																<tr>
																	
																<td class="text_tablehead_b"  >
																	�������˻�����
																</td>
																<td >
																	 <input type="text"  name="proposeracctccy" title="�������˻�����" id="zhbz" value="CNY">
																		
																		  <span  class="STYLE1">*</span>
															
																</td>
																</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�������к�
																</td>
																<td>
																	<input name="dbtrbrchid" id="fkhhh" type="text" readonly="readonly"
																		 title="�������к�"  maxlength="12"  value="${bankInfo.bankcode }"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b">
																	����������
																</td>
																<td>
																	<input name="dbtrbrnchnm" id="fkhmc" type="text" title="����������" value="${bankInfo.participantname }"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�������˺�
																</td>
																<td>
																	<input name="dbtracctid" id="fkrzh" type="text"
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
																	�����˵�ַ
																</td>
																<td colspan="3">
																	<input name="dbtraddr" id="fkrdz" class="text_tablehead_b_addr" 
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'��ʾ��','fkrdz')"/>
																
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�����˿������к�
																</td>
																<td>
																	<input name="dbtrissr" id="fkrkhhhh" type="text" class="text_tablehead_b_c"
																		 title="�����˿������к�" maxlength="12" value=""  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<input type="button" class="button"   value="����" onClick="selectBankInfoOfFkk()">
																		
																</td>
																<td class="text_tablehead_b">
																	�����˿���������
																</td>
																<td>

																	<input name="dbtrissrnm" id="fkrkhkmc" type="text" title="�����˿���������"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	�����������к�
																</td>
																<td>
																	<input name="dbtrmmbid" id="fkqshhh" type="text" readonly="readonly"
																		 title="�����������к�" maxlength="12" value="${bankInfo.directbankcode }"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
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
																		 title="�տ����к�" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<input type="button" class="button"  value="����" onClick="selectBankInfo()">
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
																	<input name="cdtracctid" id="skrzh" type="text"
																		 title="�տ����˺�" maxlength="32"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	�տ�������
																</td>
																<td>
																	<input name="cdtrnm" id="skrmc" type="text"
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
															
																<tr>
																
																<td class="text_tablehead_b">
																	�տ����������к�
																</td>
																<td>
																	<input name="cdtrmmbid" id="skhqshhh" type="text" readonly="readonly"
																		title="�տ����������к�" maxlength="12" 
																		 onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
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
																<span  class="STYLE1">*</span>
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
	                                                      	<td colspan="4"><span class="text_tablehead">�Ʒ���Ϣ</span></td>
	                                                      </tr>
                                                    			<tr>
																
																<td class="text_tablehead_b"  >
																	���л�
																</td>
																<td >
																	<select   name="selfaccount" id="bhh" >
																		<option value="Y">
																			��
																		</option>
																		<option value="N">
																			��
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	����
																</td>
																<td >
																
																	<input type="radio" class="text_tablehead_b_rad" name="waive" value="N" checked="checked" onClick="bhhfunction(this.value);">������
																	<input type="radio" class="text_tablehead_b_rad" name="waive" value="Y" onClick="bhhfunction(this.value);">����
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																	������
															  </td>
																<td>
																	<input name="charge" id="sxf" type="text" 
																		title="������" maxlength="12" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />
																
																</td>
																<td class="text_tablehead_b" >
																	�ʵ��
																</td>
																<td>
																	<input name="postage" id="ydf" type="text"
																		title="�ʵ��" maxlength="12" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />
																
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
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
	                                                      	<td colspan="4"><span class="text_tablehead">��Ʊ��Ϣ</span></td>
	                                                      </tr>
                                                    		<tr>
																<td class="text_tablehead_b" >
																	��Ʊ����
																</td>
																<td>
																<input name="issuedt" id="cprq" class="Wdate" type="text"
																		readonly="readonly" title="��Ʊ����" 
																		 onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	��Ʊ��Ѻ
																</td>
																<td>
																<input name="billseal" id="hpmy"  type="text"
																		 title="��Ʊ��Ѻ"  />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	��Ʊ����
																</td>
																<td>
																<input name="billtp" id="hpzl"  type="text"
																		 title="��Ʊ����" 
																		 />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	��Ʊ���
																</td>
																<td>
																<input name="issueamt" id="cpje"  type="text"
																		 title="��Ʊ���" 
																		 />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	��Ʊǩ�����к�
																</td>
																<td>
																<input name="issuerbk" id="hpqfhhh" type="text"
																		 title="��Ʊǩ�����к�" 
																		 />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	��Ʊ�������ʺ�
																</td>
																<td>
																<input name="issueracct" id="hpsqrzh"  type="text"
																		 title="��Ʊ�������ʺ�" />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															
															<tr>
																<td class="text_tablehead_b" >
																	��Ʊ����������
																</td>
																<td>
																<input name="issuernm" id="hpsqrmc"  type="text"
																		 title="��Ʊ����������"/>
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	Ʊ����ص��տ�������
																</td>
																<td>
																<input name="rcvrnm" id="pjjzdskrmc"type="text"
																		title="Ʊ����ص��տ�������"  />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	����Ʊ�˿�����
																</td>
																<td>
																<input name="holderbk" id="zhcprkhh" type="text"
																		 title="����Ʊ�˿�����"  />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	����Ʊ���˺�
																</td>
																<td>
																<input name="holderacct" id="zhcprzh"  type="text"
																		 title="����Ʊ���˺�"  />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	����Ʊ������
																</td>
																<td>
																<input name="holdernm" id="zhcprmc"  type="text"
																		 title="����Ʊ������"  />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	������
																</td>
																<td>
																<input name="rmnngamt" id="dyje"  type="text"
																		 title="������"  />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	ʵ�ʽ�����
																</td>
																<td>
																<input name="actntryamt" id="sjjsje"  type="text"
																		 title="ʵ�ʽ�����"  />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	��ʾ��������
																</td>
																<td>
																<input name="paydt" id="tsfkrq" class="Wdate" type="text"
																		readonly="readonly" title="��ʾ��������" 
																		 onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	�ֽ��Ʊ�Ҹ���
																</td>
																<td>
																<input name="cashpaybrnch" id="xjhpdfh"  type="text"
																		 title="�ֽ��Ʊ�Ҹ���" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	�˵��˱�ʶ��
																</td>
																<td>
																	<input name="endtoendid" id="dddbsh" type="text" 
																		maxlength="19" title="�˵��˱�ʶ��"  />
																
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
                                                    
										   </td>
										 </tr>
															<tr id="A0000" style="display: none;">
															<td class="text_tablehead_b" >
																	�˵��˱�ʶ��
															  </td>
																<td>
																	<input name="endtoendid" id="dddbsh" type="text" 
																		maxlength="19" title="�˵��˱�ʶ��"  />
																
																</td>
																
																
																<td class="text_tablehead_b" >
																	token
																</td>
																<td>
																	<input type="text" name="token" value="${token}" />
																
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
