<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath(); 
	response.setHeader("Cache-Control","no-cache"); //HTTP 1.1
	response.setHeader("Pragma","no-cache"); //HTTP 1.0
	response.setDateHeader ("Expires", 0); //prevents caching at the proxy server
	
%>

<html>
	<head>
	<%
String type=request.getParameter("type");
 %>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
		  <META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">   
		  <META   HTTP-EQUIV="Expires"   CONTENT="0">   
		
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
			<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
        <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
		<script type="text/javascript">
		
		function getDefaultDate(){
		 var newDay=new Date();
		 var year=newDay.getFullYear();
		 var month=newDay.getMonth();
		 var day=newDay.getDate();
		 document.getElementById("paydt").value= year+'-'+(month+1)+'-'+day;
		}
		
		function selectBankZHCPR(){
				var url ="<%=request.getContextPath()%>";
				var holderbk= document.getElementById("holderbk");
				var holderbkname=document.getElementById("holderbkname");
				selectBank(url,holderbk,holderbkname,'');
			}
		
		function selectBankHPQHH(){
				var url ="<%=request.getContextPath()%>";
				var issuerbk= document.getElementById("issuerbk");
				var issuerbkname=document.getElementById("issuerbkname");
				selectBank(url,issuerbk,issuerbkname,'');
			}
			
			function commitForm(){
				if(VForm.Validate()){
				document.getElementById("issueamt").value = rmoney(document.getElementById("issueamt").value);
				document.getElementById("rmnngamt").value = rmoney(document.getElementById("rmnngamt").value);
				document.getElementById("actntryamt").value = rmoney(document.getElementById("actntryamt").value);
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

		</script>
	</head>
	<body onload="getDefaultDate();">
		<form method="post"
			action="<%=path%>/jieFuAction.do?method=sendMessage&type=money">

			<input id="signval" type="hidden" value="sign0">
				<input id="id" name="id" type="hidden" value="${po.id}">
				<input type="hidden" name="opertype" value="01" />
			
			
			

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
						                  	<div  class="text_title"><span class="text_blue2">���л�Ʊ���˽⸶
						                  	</span></div>
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
                                                      <input id="pmtgrpid" type="hidden" value="${po.pmtgrpid }">
                                                      <td class="text_tablehead_b" >
																	֧���������
																</td>
																<td>
																	<input name="pmtgrpid" id="pmtgrpid" type="text" maxlength="60" readonly="readonly" value="${po.pmtgrpid}" />
																
																</td>
                                                      </tr>
                                                      <tr>
                                                        
																
																<td class="text_tablehead_b" >
																	��Ʊ����
																</td>
																<td>
																	<input name="notesno" id="" type="text" maxlength="60" readonly="readonly" onKeyPress="numPress()"  title="��Ʊ����" value="${po.endtoendid}" />
																
																</td>
																<!--  -<td class="text_tablehead_b"  >
																 ��ʾ��������
																</td>
																<td >
																	<!--  <input name="paydt" id="paydt" value=""
																		class="Wdate" type="text"
																		readonly="readonly" title="��ʾ��������" onKeyPress="fun_date()" 
																		class="Wdate" onclick="WdatePicker()"  /> -->
																<td class="text_tablehead_b" >
																	��Ʊ����
																</td>
																<td >
																<input name="billtp" id="billtp"  type="hidden" value="${addentity.billtp}"/>	
																<select  name="billtp" id="billtp" style="width:180px;"  disabled="disabled" title="��Ʊ����" >
																<option value="${addentity.billtp}"  'selected' }>
																  <c:if test="${addentity.billtp eq 'CT00' }">��ת�û�Ʊ</c:if>
												                  <c:if test="${addentity.billtp eq 'CT01' }">����ת�û�Ʊ</c:if>
												                  <c:if test="${addentity.billtp eq 'CT02' }">�ֽ��Ʊ</c:if>
																</option>
																</select>
																</td>
																
															</tr>
                                                       
                                                         
                                                      
                                                      
															<tr>
																
																<td class="text_tablehead_b" >
																    ��Ʊ����
																</td>
																<td>
																	
																	<input name="dbtracct" id="cprq"  type="text" readonly="readonly"  value="${ po.signeddt}"
																		readonly="readonly" title="��Ʊ����" 
																		/>	
																	</td>
																	
																	<td class="text_tablehead_b"  >
																	��Ʊ���
																</td>
																<td >
																	<input name="issueamt" id="" type="text"   onKeyPress="amountPress()" readonly="readonly" maxlength="12" value="${po.totalamt}"
																	onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"  
																		title="��Ʊ���" />
																
																</td>
																	
															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	��Ʊ��Ѻ
																</td>
																<td>
																	<input name="billseal" id="" type="text" maxlength="14" readonly="readonly" onKeyPress="numPress()"   title="��Ʊ��Ѻ" value="${addentity.billseal}"/>
																
																</td>
																	<td class="text_tablehead_b"  >
																	��Ʊ���
																</td>
																<td >
																	<input name="issueamt" id="" type="text"   onKeyPress="amountPress()" readonly="readonly" maxlength="12" value="${po.totalamt}"
																	onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"  
																		title="��Ʊ���" />
																
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	ǩ�����к�
																</td>
																<td >
																	<input name="issuerbk" id="issuerbk" type="text"   readonly="readonly" value="${ po.dbtrissuer}"
																		   maxlength="12" title="ǩ�����к�" />
																
																	
																</td>
																
																	<td class="text_tablehead_b"  >
																	��Ʊ�տ�������
																</td>
																<td >
																	<input name="rcvrnm" id="" type="text"  maxlength="60" readonly="readonly" onKeyPress="actkeyPress()" value="${ po.cdtrnm}"
																		title="��Ʊ�տ�������" />
																<!--
																<td class="text_tablehead_b"  >
																	ǩ��������
																</td>
																<td >
																	<input name="issuerbkname" id="issuerbkname" type="text"  readonly="readonly" value="${ po.notesdt}"
																		title="ǩ��������" />
																</td>
																-->
															</tr>
															
															
															<tr>
															<td class="text_tablehead_b"  >
																	��Ʊ�������˺�
																</td>
																<td >
																	<input name="issueracct" id="" type="text"  maxlength="32" readonly="readonly" onKeyPress="actkeyPress()" value="${ po.proposeracct}"
																		title="��Ʊ�������˺�" />
																
																</td>
																<td class="text_tablehead_b"  >
																	��Ʊ����������
																</td>
																<td >
																	<input name="issuernm" id="" type="text"   maxlength="60" readonly="readonly" onKeyPress="actkeyPress()" value="${ po.dbtrnm}"
																		title="��Ʊ����������" />
																
																</td>
															</tr>
															
															<tr>
														
																
																
																<td class="text_tablehead_b"  >
																	ԭ�ֽ��Ʊ�Ҹ���
																</td>
																<td id="orgnlpmtbktb">
																	<input name="orgnlpmtbk" id="orgnlpmtbk" type="text"  readonly="readonly"   maxlength="32" onKeyPress="actkeyPress()" value="${ po.dbtrmmbid}"
																	 maxlength="32"	title="ԭ�ֽ��Ʊ�Ҹ���" />
																	
																</td>
																
															</tr>
															
															<tr>
															<td class="text_tablehead_b"  >
																	����Ʊ�˿�����
																</td>
																<td colspan=>
																	<input name="holderBk" id="holderbk" type="text"   readonly="readonly"
																	 maxlength="12"	title="����Ʊ�˿�����" />
																	<span name="validate" dataName="holderBk" dataType="Empty" msg="����Ʊ�˿����в���Ϊ�գ�" class="STYLE1">*</span>	
																	
																</td>
																<td class="text_tablehead_b"  >
																	����Ʊ�˿���������
																</td>
																<td colspan=>
																	<input name="holderbkname" id="holderbkname" type="text"   readonly="readonly"
																		title="����Ʊ�˿���������" />
																	<span name="validate" dataName="holderbkname" dataType="Empty" msg="����Ʊ�˿��������Ʋ���Ϊ�գ�" class="STYLE1">*</span>	
																</td>
															</tr>
															
															<tr>
																<td>&nbsp;</td>
																<td><input type="button" class="button"   value="����" onclick="selectBankZHCPR()"></td>
															</tr>
															
															<tr>
															<td class="text_tablehead_b"  >
																	����Ʊ���˺�
																</td>
																<td >
																	<input name="holderacct" id="" type="text"   maxlength="32" onKeyPress="actkeyPress()"
																		title="����Ʊ���˺�" />
																
																	<span name="validate" dataName="holderacct" dataType="Empty" msg="����Ʊ���˺Ų���Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b"  >
																	����Ʊ������
																</td>
																<td >
																	<input name="holdernm" id="" type="text"   maxlength="60" onKeyPress="actkeyPress()"
																		title="����Ʊ������" />
																
																	<span name="validate" dataName="holdernm" dataType="Empty" msg="����Ʊ�����Ʋ���Ϊ�գ�" class="STYLE1">*</span>	
																</td>
															</tr>
															
															<tr>
															<td class="text_tablehead_b"  >
																	������
																</td>
																<td >
																	<input name="rmnngamt" id="" type="text"  onKeyPress="amountPress()" maxlength="12"
																	onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" 
																		title="������" />
																
																	<span name="validate" dataName="rmnngamt" dataType="Empty" msg="�������Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b"  >
																	ʵ�ʽ�����
																</td>
																<td >
																	<input name="actntryamt" id="" type="text"  onKeyPress="amountPress()" maxlength="12"
																	onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" 
																		title="ʵ�ʽ�����" />
																
																	<span name="validate" dataName="actntryamt" dataType="Empty" msg="ʵ�ʽ������Ϊ�գ�" class="STYLE1">*</span>	
																</td>
															</tr>
															 <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
	                                                      </tr>
                                                    		<tr>
																<td class="text_tablehead_b" >
																	����
																</td>
																<td colspan="3">
																	<textarea name="remarkinfo" id="fy"   onKeyPress="jsxxcd(this,60)"
																		rows="2" cols="60" onkeyup="limitLength(value,60,'��ʾ��','fy')"></textarea>
																</td>
															</tr>
															<tr align="center">
                                                    		<td>&nbsp;</td><td>&nbsp;</td>
                                                    			<td align="center">
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="��  ��" onclick="commitForm();" />
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
