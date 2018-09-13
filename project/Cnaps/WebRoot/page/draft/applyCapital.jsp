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
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
		<script type="text/javascript">
		
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
		      document.getElementById("issuernm").value=obj.accountname==null?"": obj.accountname  ;//������
		 }
	   	});
	}
		
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

			
			


			
			function checkAmt(type){    
				var rmnngamt =  document.getElementById("rmnngamt"); //������
				var actntryamt =  document.getElementById("actntryamt"); //ʵ�ʽ�����
				var issueamt =  document.getElementById("issueamt"); //ǩ�����
				if(type=='rmnngamt'&&issueamt.value!=''){
					var actAmt=rmoney(issueamt.value)-rmoney(rmnngamt.value);
					actntryamt.value=fmoney(actAmt);
				}
				else if(type=='actntryamt'&&issueamt.value!=''){
					var rmnAmt=rmoney(issueamt.value)-rmoney(actntryamt.value);
					if(rmnAmt<0) {
						alert("ʵ�ʽ�����ܴ���ǩ����");
						actntryamt.value="0.00";
						rmnngamt.value="0.00";
						return;
					}
					rmnngamt.value=fmoney(rmnAmt);
				}
				return;
			}
			
			//����������

		</script>
	</head>
	<body onload="getDefaultDate();">
		<form method="post"
			action="<%=path%>/applyCapitalAction.do?method=sendMessage">

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
						                  	<div  class="text_title"><span class="text_blue2">�����������л�Ʊ�ʽ�
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
                                                        
																
																<td class="text_tablehead_b" >
																	��Ʊ����
																</td>
																<td>
																	<input name="notesno" id="notesno" type="text" maxlength="8" 
																	onkeyup="limitLength(value,1835,'��ʾ��','notesno')"  title="��Ʊ����" />
																	<span name="validate" dataName="notesno" dataType="Empty" msg="��Ʊ���벻��Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b"  >
																	��ʾ��������
																</td>
																<td >
																	<input name="paydt" id="paydt" value=""
																		class="Wdate" type="text"
																		readonly="readonly" title="��ʾ��������" onKeyPress="fun_date()"
																		class="Wdate" onclick="WdatePicker()"  /> 
																
																	<span name="validate" dataName="paydt" dataType="Empty" msg="��ʾ�������ڲ���Ϊ�գ�" class="STYLE1">*</span>
																
															</tr>
                                                       
                                                         
                                                      
                                                      
															<tr>
																
																<td class="text_tablehead_b" >
																    ��Ʊ����
																</td>
																<td>
																
																	<input name="dbtracct" id="cprq" class="Wdate" type="text"  onKeyPress="fun_date()"
																		readonly="readonly" title="��Ʊ����" 
																		class="Wdate" onclick="WdatePicker()" />	
																	<span name="validate" dataName="dbtracct" dataType="Empty" msg="��Ʊ���ڲ���Ϊ�գ�" class="STYLE1">*</span>	
																	</td>
																	
																	<td class="text_tablehead_b" >
																	��Ʊ����
																</td>
																<td >
																<select  name="billtp" id="" style="width:180px;" title="��Ʊ����">
																<option value="CT00"  selected="selected">��ת�û�Ʊ</option>
																<option value="CT01"  selected="selected">����ת�û�Ʊ</option>
																<option value="CT02"  selected="selected">�ֽ��Ʊ</option>
																</select>
																	<span name="validate" dataName="billtp" dataType="Empty" msg="��Ʊ���಻��Ϊ�գ�" class="STYLE1">*</span>	
																</td>
															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	��Ʊ��Ѻ
																</td>
																<td>
																	<input name="billseal" id="" type="text" maxlength="14" onKeyPress="numPress()"   title="��Ʊ��Ѻ" />
																
																	<span name="validate" dataName="billseal" dataType="Empty" msg="��Ʊ��Ѻ����Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																	<td class="text_tablehead_b"  >
																	��Ʊ���
																</td>
																<td >
																	<input name="issueamt" id="issueamt" type="text"   onKeyPress="amountPress()" maxlength="12"
																	onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"  
																		title="��Ʊ���" />
																
																	<span name="validate" dataName="issueamt" dataType="Empty" msg="��Ʊ����Ϊ�գ�" class="STYLE1">*</span>
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	ǩ�����к�
																</td>
																<td >
																	<input name="issuerbk" id="issuerbk" type="text"   readonly="readonly" class="text_tablehead_b_c"
																		   maxlength="12" title="ǩ�����к�" />
																<span name="validate" dataName="issuerbk" dataType="Empty" msg="ǩ�����кŲ���Ϊ�գ�" class="STYLE1">*</span>
																<input type="button" class="button"   value="����" onclick="selectBankHPQHH()">
																	
																</td>
																<td class="text_tablehead_b"  >
																	ǩ��������
																</td>
																<td >
																	<input name="issuerbkname" id="issuerbkname" type="text"  readonly="readonly"
																		title="ǩ��������" />
																		
																</td>
															</tr>
															
															
															<tr>
															<td class="text_tablehead_b"  >
																	��Ʊ�������˺�
																</td>
																<td >
																	<input name="issueracct" id="" type="text"  maxlength="32" onKeyPress="actkeyPress()" onchange="queryBypaymentGroupNum(this.value)"
																		title="��Ʊ�������˺�" />
																
																	<span name="validate" dataName="issueracct" dataType="Empty" msg="��Ʊ�������˺Ų���Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b"  >
																	��Ʊ����������
																</td>
																<td >
																	<input name="issuernm" id="" type="text"   maxlength="60" onKeyPress="actkeyPress()"
																		title="��Ʊ����������" />
																
																	<span name="validate" dataName="issuernm" dataType="Empty" msg="��Ʊ���������Ʋ���Ϊ�գ�" class="STYLE1">*</span>	
																</td>
															</tr>
															
															<tr>
															<td class="text_tablehead_b"  >
																	��Ʊ�տ�������
																</td>
																<td >
																	<input name="rcvrnm" id="" type="text"  maxlength="60" onKeyPress="actkeyPress()"
																		title="��Ʊ�տ�������" />
																
																	<span name="validate" dataName="rcvrnm" dataType="Empty" msg="��Ʊ�տ������Ʋ���Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	����Ʊ�˿�����
																</td>
																<td colspan=>
																	<input name="holderbk" id="holderbk" type="text"   readonly="readonly" class="text_tablehead_b_c"
																	 maxlength="12"	title="����Ʊ�˿�����" />
																	<span name="validate" dataName="holderbk" dataType="Empty" msg="����Ʊ�˿����в���Ϊ�գ�" class="STYLE1">*</span>	
																	<input type="button" class="button"   value="����" onclick="selectBankZHCPR()">
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
																	<input name="rmnngamt" id="rmnngamt" type="text"  onKeyPress="amountPress()" maxlength="12" readonly="readonly"
																		title="������" />
																
																	<span name="validate" dataName="rmnngamt" dataType="Empty" msg="�������Ϊ�գ�" class="STYLE1">*</span>	
																</td>
																<td class="text_tablehead_b"  >
																	ʵ�ʽ�����
																</td>
																<td >
																	<input name="actntryamt" id="actntryamt" type="text"  onKeyPress="amountPress()" maxlength="12"
																	onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';checkAmt('actntryamt');" 
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
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','fy')"></textarea>
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
                                               
                                                 
                                                  
                                              
                                                    <div class="table_content">
                                                    	<table>
                                                    	
                                                    	
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