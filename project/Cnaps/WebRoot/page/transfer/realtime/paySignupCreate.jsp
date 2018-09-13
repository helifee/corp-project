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
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
	    <link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
        <script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>	
		<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"  src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript"  src="<%=path%>/js/datePicker/WdatePicker.js"></script>
       <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
       <script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>
       <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
       	  <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript">
		
		//��ѯǩԼ����Ϣ
		function  PubQueryAccount(paymentGroupNum){
	 
   		if(isNull(trim(paymentGroupNum))){
					 return;
				   }
				var pop = createPopWin("popid",'ϵͳ������...',"<%=request.getContextPath()%>/page/transfer/shouquanCons.jsp");
					pop.show();
					PubService.QueryAccount(paymentGroupNum,function(obj){
					     pop.close();
				  if(obj==null||obj.acctid==null){
				 
				  alert(" �տ�����Ϣ�����ڣ�����ʧЧ��δ�鵽�������" );
				 
				       
				   return;
				  }else{
			 
			  //document.getElementById("payerNum").value=obj.acctid;
		      //document.getElementById("dbtrNm").value=obj.acctid==null?"": obj.acctid  ;

    		  document.getElementById("name").value=obj.mm==null?"": obj.mm;//����
		      document.getElementById("address").value=obj.addr==null?"": obj.addr;//��ַ
		      document.getElementById("phone").value=obj.tel==null?"": obj.tel;//��ϵ�绰
		      document.getElementById("certsize").value=obj.certip==null?"": obj.certip;//֤������
			  document.getElementById("certsize1").value=obj.certip==null?"": obj.certip;//֤������
		      document.getElementById("sgrzjh").value=obj.certid==null?"": obj.certid;//֤����
		      document.getElementById("proposerCstmrId").value=obj.cstmrid==null?"": obj.cstmrid;//�����˿ͻ���
		      document.getElementById("contractoraccttp1").value=obj.accttp==null?"": obj.accttp;//�������˻�����
		      document.getElementById("contractoraccttp").value=obj.accttp==null?"": obj.accttp;//�������˻�����
		       document.getElementById("applyOpenBankName").value=obj.acctissr==null?"": obj.acctissr;//����������
		      document.getElementById("applyOpenBankNum").value=obj.bankcode==null?"": obj.bankcode;//�������к�
		 }
	   	});
				
			}
	//�����˿������кŲ�ѯ
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var payOpenBankNum= document.getElementById("applyOpenBankNum");
				var payOpenBankName=document.getElementById("applyOpenBankName");
			 
				selectBank(url,payOpenBankNum,payOpenBankName,"");
			}
			function selectLoad(){
				//var temp = document.getElementById('ywlxbmval').value;
				transferOfClient(temp,'select_input');
				
			}
			 function open2(){
    			
			    var pop=new Popup({ contentType:1,scrollType:'yes',isReloadOnClose:false,width:360,height:200});
			    pop.setContent("contentUrl","<%=request.getContextPath()%>/page/transfer/realtime/authorization.jsp");
			    pop.setContent("title","��Ȩ");
			    pop.build();
			    pop.show();
			 }
				function commitForm(){
			   var msg = "@";
					var activeDate = document.getElementById("activeDate");
					var payAccount = document.getElementById("payAccount");
					var name = document.getElementById("name");
					var payAccount = document.getElementById("payAccount");
					var sgrzjh = document.getElementById("sgrzjh");
					var singleMoney=document.getElementById("singleMoney");
		 			var totalMoney=document.getElementById("totalMoney");
		 			
		 			var xth=document.getElementById("xth");
		 			if(isNull(trim(xth.value))){
					msg += xth.title+"����Ϊ�գ�@";
					}
					var signUpType=document.getElementById("signUpType");
		 			if(isNull(trim(signUpType.value))){
					msg += signUpType.title+"����Ϊ�գ�@";
					}
					var unactiveDate=document.getElementById("unactiveDate");
		 			if(isNull(trim(unactiveDate.value))){
					msg += unactiveDate.title+"����Ϊ�գ�@";
					}
					var certsize=document.getElementById("certsize");
		 			if(isNull(trim(certsize.value))){
					msg += certsize.title+"����Ϊ�գ�@";
					}
					var issueState=document.getElementById("issueState");
		 			if(isNull(trim(issueState.value))){
					msg += issueState.title+"����Ϊ�գ�@";
					}
					var phone=document.getElementById("phone");
		 			if(isNull(trim(phone.value))){
					msg += phone.title+"����Ϊ�գ�@";
					}
					var contractoraccttp=document.getElementById("contractoraccttp");
		 			if(isNull(trim(contractoraccttp.value))){
					msg += contractoraccttp.title+"����Ϊ�գ�@";
					}
					var proposerCstmrId=document.getElementById("proposerCstmrId");
		 			if(isNull(trim(proposerCstmrId.value))){
					msg += proposerCstmrId.title+"����Ϊ�գ�@";
					}
					var moneyClassCode=document.getElementById("moneyClassCode");
		 			if(isNull(trim(moneyClassCode.value))){
					msg += moneyClassCode.title+"����Ϊ�գ�@";
					}
					var applyOpenBankNum=document.getElementById("applyOpenBankNum");
		 			if(isNull(trim(applyOpenBankNum.value))){
					msg += applyOpenBankNum.title+"����Ϊ�գ�@";
					}
					var applyOpenBankName=document.getElementById("applyOpenBankName");
		 			if(isNull(trim(applyOpenBankName.value))){
					msg += applyOpenBankName.title+"����Ϊ�գ�@";
					}
		 			                
		 			
		 			
		 			if(isNull(trim(singleMoney.value))){
					msg += singleMoney.title+"����Ϊ�գ�@";
					}
					if(isNull(trim(totalMoney.value))){
					msg += totalMoney.title+"����Ϊ�գ�@";
					}
					if(rmoney(singleMoney.value)>rmoney(totalMoney.value)){
					msg += "�ۼƽ���費С�ڵ��ʽ�@";
					}
					
					
						if(isNull(trim(sgrzjh.value))){
					msg += sgrzjh.title+"����Ϊ�գ�@";
				}
					if(isNull(trim(payAccount.value))){
					msg += payAccount.title+"����Ϊ�գ�@";
				}
			 if(isNull(trim(activeDate.value))){
					msg += activeDate.title+"����Ϊ�գ�@";
				}
					if(isNull(trim(name.value))){
					msg += name.title+"����Ϊ�գ�@";
				}
				var boo = msgSplit(msg);
			 
			
				if(boo){
				 document.getElementById("totalMoney").value=rmoney(document.getElementById("totalmoney").value);
				  document.getElementById("singleMoney").value=rmoney(document.getElementById("singleMoney").value);
					document.forms[0].submit();
				 
				}
				 
		 }
		 
		 
		</script>
	</head>
	<body> 
	<!--  	<form method="post" action="<%=path%>/transfer/RealTimeCreditAction.do?method=sendCredit">-->
			<form method="post" name="form1"
			action="<%=path%>/transfer/PaySignupCreateAction.do?method=signupCreate">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
			<input id="cardcrash" name="cardcrash" type="hidden" value="crash">
		  <input id="contrperson" name="contrperson" type="hidden" >
		 <input type="hidden" id="xth" value="BEPS" title="ϵͳ��"/>
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
						                  	<div  class="text_title"><span class="text_blue2">ʵʱ����ǩԼ����</span></div>
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
																	 ǩԼ����
																</td>
																<td >
																	<select title="ǩԼ����"  name="po.signUpType" id="signUpType">
																		<option value="A">
																			 ͨ��
																		</option>
																		<option value="B">
																			ͨ�Һ��˻���ѯ
																		</option>
																		<option value="C">
																			 �˻���ѯ
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b"  >
																		��Ч����
																</td>
																<td ><!-- value="${sessionScope.workDate }" -->
																		 <input name="po.activeDate" id="activeDate" type="text"    readonly="readonly" title="��Ч����" style="width: 180px;"
								                        Class="Wdate"	  onclick="WdatePicker()"> <span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	ʧЧ����
																</td>
																<td >
																	 <input type="text" name="po.unactiveDate"  id="unactiveDate" value="" onclick="WdatePicker()" readonly="readonly" style="width: 180px;" class="Wdate" title="ʧЧ����">
																
																<span  class="STYLE1">*</span></td>
																<td class="text_tablehead_b" >
																	&nbsp;
																</td>
																<td >
																&nbsp;
																</td>
															</tr>
															</table>
                                                 </div>
                                                 
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">ǩԼ����Ϣ</span></td>
                                                      </tr>
                                                      <tr>
																	
																<td class="text_tablehead_b"  >
																	ǩԼ���˺�
																</td>
																<td >
																	<input name="po.payAccount" id="payAccount"  type="text" onblur="PubQueryAccount(this.value);"
																		 title="ǩԼ���˺�" maxlength="32" /><span  class="STYLE1">*</span>
																</td>
																	<td class="text_tablehead_b" >
																		ǩԼ������
																</td>
																<td>
																		 <input name="po.name" id="name" type="text" readonly="readonly"
																		 maxlength="15" title="ǩԼ������" />			<span  class="STYLE1">*</span>
															
																</td>
																
																</tr>
																
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	֤������
																</td>
																<td><input type="hidden" name="po.certsize" id="certsize1"/>
																		<select   name="po.certsize" id="certsize" disabled="disabled">
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
																<td class="text_tablehead_b"  >
																֤������
																</td>
																<td>
																		<input name="po.certnum" id="sgrzjh" type="text" readonly="readonly"  size="19" onblur="checkIdCardNo(this.value,'sgrzjh')"
																		maxlength="32" title="������֤����" />
																	<span  class="STYLE1">*</span>
																	<input type="hidden" name="po.issueState" id="issueState" title="֤�����й���" value="CN"/>
																</td>
															</tr>
															
																
															
															
															
																<tr>
																	
																

																<td class="text_tablehead_b" >
																	ǩԼ����ϵ�绰
																</td>
																<td>
																	<input name="po.phone" id="phone" type="text" readonly="readonly"
																		 maxlength="15" title="ǩԼ����ϵ�绰" /> <span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	ǩԼ���˻�����
																</td>
																<td>
																<input type="hidden" name="po.contractoraccttp" title="ǩԼ���˻�����" id="contractoraccttp1">
																		 <select  name="po.contractoraccttp" title="ǩԼ���˻�����" id="contractoraccttp" disabled="disabled">
																		   <option value="" selected>��ѡ��</option>
																		  <option value="AT01">���˴��ǿ��˻�</option>
																		   <option value="AT02">���˽�ǿ��˻�</option>
																		 </select>
																		 <span  class="STYLE1">*</span> 
																</td>
																</tr>
																<tr>
															 		<td class="text_tablehead_b" >
																	ǩԼ�˵�ַ
																</td>
																<td >
																	<input name="po.address" id="address" type="text" readonly="readonly"
																	style="width: 180%"	 title="ǩԼ�˵�ַ"  
																		onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'��ʾ��','address')"/>
																</td>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	ǩԼ�˿ͻ���
																</td>
																<td >
																	 <input type="text"  maxlength="30" readonly="readonly" name="po.proposerCstmrId" title="�տ��˿ͻ���" id="proposerCstmrId">
																		 
															<span  class="STYLE1">*</span>
																</td>
                                                  				<td class="text_tablehead_b" >
																	���ִ���
																</td>
																<td>
																	<input name="po.moneyClassCode" id="moneyClassCode" type="text"
																		style="width: 180px;" title="���ִ���"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" /><span  class="STYLE1">*</span>
																</td>
																
                                                  			</tr>
                                                  			<tr>
																<td class="text_tablehead_b">
																	ǩԼ�˿������к�
																</td>
																<td>
																	<input name="po.applyOpenBankNum" id="applyOpenBankNum" type="text" readonly="readonly"
																		style="width: 180px;" title="�ܶ�" maxlength="12"
																		 />
																</td>
                                                  				<td class="text_tablehead_b" >
																	ǩԼ�˿���������
																</td>
																<td>
																	<input name="po.applyOpenBankName" id="applyOpenBankName" type="text" readonly="readonly"
																			style="width: 180px;" title="ǩԼ�˿���������" maxlength="22"
																			/><span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			<tr>
																<td class="text_tablehead_b" >
																	���ʽ������
																</td>
																<td >
																	 <input type="text"  maxlength="9" name="po.singleMoney" title="���ʽ��" id="singleMoney"
																	 onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; ">
																		 <span  class="STYLE1">*</span>
															
																</td>
                                                  				<td class="text_tablehead_b" >
																	���ۼƽ������
																</td>
																<td>
																	<input name="po.totalMoney" id="totalmoney" type="text"
																		style="width: 180px;" title="�ۼƽ������"   
																		 maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; "/>
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
																	<textarea name="po.postscript" id="postscript" 
																		rows="2" cols="68" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','postscript')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                   </div>
                                                   
                                                   
                                                   
                                                   
                                                   
                                                     <div class="table_content">
                                                    <table>  
                                              <tr >
                                          
                                             
										 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center"><font color=red>˵������ɫ*��ע��Ϊ������</font></td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>                    
                                                   <tr >
                                          
                                             
										 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center">
										       <input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
										         
										         </td>
										  <td style="width:25%;">&nbsp;</td>
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
			</table>

 
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
			</form>
	</body>
</html>
		  
		  
		  
		  
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		 
		  
		  
		  
		  
		  
		  
		  
		  
		   