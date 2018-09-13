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
		<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
 
		<script language="javascript">
	
				function commitForm(){
			   var msg = "@";
			var proposerCstmrId = document.getElementById("proposerCstmrId");
			var certnum = document.getElementById("certnum");
			var name = document.getElementById("name");
			var payerAcount = document.getElementById("payerAcount");
			var applyOpenBankNum = document.getElementById("applyOpenBankNum");
			 
			var dbtrNm = document.getElementById("dbtrNm");
			
			 if(isNull(trim(dbtrNm.value))){
					msg += dbtrNm.title+"����Ϊ�գ�@";
				    }
		 			 if(isNull(trim(applyOpenBankNum.value))){
					msg += applyOpenBankNum.title+"����Ϊ�գ�@";
				    }
			 if(isNull(trim(payerAcount.value))){
					msg += payerAcount.title+"����Ϊ�գ�@";
				    }
			 if(isNull(trim(proposerCstmrId.value))){
					msg += proposerCstmrId.title+"����Ϊ�գ�@";
				    }
			 
				    	    
				var boo = msgSplit(msg);
				 
					 
			
				if(boo){
				document.getElementById("proposerAcct").value= document.getElementById("payerAcount").value  ;
				document.getElementById("address").value= document.getElementById("dbtrAddr").value  ;
				document.getElementById("name").value= document.getElementById("dbtrNm").value  ;
					document.forms[0].submit();
				// document.getElementById("hvps11109").value=rmoney(document.getElementById("hvps11109").value) ;
				//document.getElementById("A10051").value=rmoney(document.getElementById("A10051").value) ;
					 
				}
				 
		 }
		 
		 var A00100 = {name:"00100",value:"���"}; 
         var A00200 = {name:"00200",value:"ˮů��"}; 
         var A00300 = {name:"00300",value:"ú����"}; 
         var A00400 = {name:"00400",value:"�绰��"}; 
         var A00500 = {name:"00500",value:"ͨѶ��"}; 
         var A00600 = {name:"00600",value:"���շ�"}; 
         var A00700 = {name:"00700",value:"���ݹ����"};   
         var A00800 = {name:"00800",value:"��������"}; 
         var A00900 = {name:"00900",value:"ѧ�̷�"};
         var A01000 = {name:"01000",value:"���ߵ��ӷ�"};
         var A09001 = {name:"09001",value:"����"};
         var A01100 = {name:"01100",value:"��ҵ�������"};
         var A01200 = {name:"01200",value:"н�𱨳�"};
     A104 = [A00100,A00200,A00300,A00400,A00500,A00600,A00700,A00800,A00900,A01000,A01100,A09001,A01100];
	    var A01300 = {name:"01300",value:"���ƾ��"};
     A105 =[A01300,A09001];	
	
		 function ch_cxtj(obj){
		   var sel = document.getElementById("businessClassCode");
		sel.options.length=0; 
		
		   
		   if(obj.value == "E100"){
	 		for(var i=0;i < A104.length;i++){
			var opt = document.createElement('option');
						opt.setAttribute('value',A104[i].name);
						opt.innerText = A104[i].value;
						sel.appendChild(opt);
			 }
			 
		}else {
		   if(obj.value == "C210"){
			var opt = document.createElement('option');
						opt.setAttribute('value',A01200.name);
						opt.innerText = A01200.value;
						sel.appendChild(opt);
		 	
			}else{
			        if(obj.value == "A101"){
			        
			        for(var i=0;i < A105.length;i++){
			var opt = document.createElement('option');
						opt.setAttribute('value',A105[i].name);
						opt.innerText = A105[i].value;
						sel.appendChild(opt);
			 }
			        }
			}
		
		
	 		}
	 
	}
	 function init(){
	 
	  var sel = document.getElementById("businessClassCode");
			for(var i=0;i < A104.length;i++){
			var opt = document.createElement('option');
						opt.setAttribute('value',A104[i].name);
						opt.innerText = A104[i].value;
						sel.appendChild(opt);
			 }
	  		
	 }
	 
	 //�����˿������кŲ�ѯ
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var applyOpenBankNum= document.getElementById("applyOpenBankNum");
				var applyOpenBankName=document.getElementById("applyOpenBankName");
				selectBank(url,applyOpenBankNum,applyOpenBankName,"");
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
						 	 document.getElementById("payerAcount").value="";//�������˺�
						 	 document.getElementById("dbtrNm").value="";//����������
						  	 return;
						 }else{
							
						      document.getElementById("dbtrnm").value=obj.mm==null?"": obj.mm;//����
						      document.getElementById("certnum").value=obj.certid==null?"": obj.certid;//֤����
						      document.getElementById("certsize").value=obj.certip==null?"": obj.certip;//֤������
						       document.getElementById("certsize1").value=obj.certip==null?"": obj.certip;//֤������
						      document.getElementById("proposerCstmrId").value=obj.cstmrid==null?"": obj.cstmrid;//�����˿ͻ���
						      document.getElementById("dbtrAddr").value=obj.addr==null?"": obj.addr;//��ַ
						      document.getElementById("phone").value=obj.tel==null?"": obj.tel;//��ϵ�绰
						      
						      
						       document.getElementById("applyOpenBankNum").value=obj.bankcode==null?"": obj.bankcode;//�����˿������к�
						       document.getElementById("applyOpenBankName").value=obj.acctissr==null?"": obj.acctissr;//�����˿���������
						     
						      document.getElementById("payAccountType").value=obj.accttp==null?"": obj.accttp;//�˻�����
						      document.getElementById("payAccountType1").value=obj.accttp==null?"": obj.accttp;
						     
						 }
			   	});
				
			}
		</script>
	</head  >
	<body onload="init()" > 
	 
	<!--  	<form method="post" action="<%=path%>/transfer/RealTimeCreditAction.do?method=sendCredit">-->
			<form method="post" name="form1"
			action="<%=path%>/transfer/RegularCreditAction.do?method=createParentDetail">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- ��ֹ�ظ��ύ -->
			<input id="cardcrash" name="cardcrash" type="hidden" value="crash">
		
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
						                  	<div  class="text_title"><span class="text_blue2">���ڴ�����ϸ����</span></div>
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
																	<input name="po.paymentGroupNum" id="paymentGroupNum" type="text"  readonly="readonly" value="${paymentno }"
																		maxlength="19" title="֧���������" />
																<span name="validate" dataName="paymentno" dataType="Empty" msg="֧��������Ų���Ϊ�գ�" class="STYLE1">*</span>
																</td>
																</tr>
															<tr>
																<td class="text_tablehead_b" >
																	<input type="hidden" id="xth"  name="systemno" title="ϵͳ��" value="BEPS">
																<input name="po.proposerAcctCcy" id="proposerAcctCcy" type="hidden"
																		style="width: 180px;" title="���ִ���"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	ҵ�����ͱ���
																</td>
																<td >
																	<select  name="po.businessSizeCode" id="businessSizeCode"   onchange="ch_cxtj(this)" ><!-- onchange="ch_cxtj(this)"-->
																		<option value="E100">
																			��ͨ���ڴ���ҵ��
																		</option>
																		<option value="C210">
																			н�𱨳�
																		</option>
																		<option value="A101">
																			�������ʽ�㻮
																		</option>
																	</select>
																</td>
																<td class="text_tablehead_b" >
																	 ҵ��������� 
																</td>
																<td >
															<select  name="po.businessClassCode" id="businessClassCode">
																	
																	
																	</select>
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
																	<input name="po.payerAcount" id="payerAcount" type="text"
																			style="width: 180px;" title="�������˺�" maxlength="22"
																			onKeyPress="actkeyPress()"
																			onblur="PubQueryAccount(this.value)"/><font color="red">*</font>
																</td>
																<td class="text_tablehead_b">
																	���������� 
																</td>
																<td>
																	<input name="po.dbtrNm" id="dbtrNm" type="text"
																		style="width: 180px;" title="����������" maxlength="60"
																		 /><font color="red">*</font>
																</td>
                                                  			</tr>
                                                  			
                                                  			 
                                                  			
                                                  			<tr>
															<td class="text_tablehead_b"  >
																	֤������
																</td>
																<td>
																	<input type="hidden"   name="po.certsize" id="certsize" value=""/>
																	<select    id="certsize1" disabled="disabled">
																		<option value="">
																			��ѡ��
																		</option>
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
																	������֤����
																</td>
																<td >
																	<input name="po.certnum" id="certnum" type="text" readonly="readonly"
																		 title="������֤����" maxlength="18" /> 
																</td>
																
															</tr>
                                                      <tr>
																	
																<td class="text_tablehead_b">
																	�����˿ͻ���
																</td>
																<td >
																	<input name="po.proposerCstmrId" id="proposerCstmrId" type="text" readonly="readonly"
																		 title="�����˿ͻ���" maxlength="18" />
																</td>

																<td class="text_tablehead_b" >
																		�������˺�����
																</td>
																<td>
																	<input type="hidden" id="payAccountType" style="width: 180px;" name="po.payAccountType" title="�������˻�����"/>
																	<select id="payAccountType1" style="width: 180px;" title="�������˻�����" disabled="disabled">
																		<option value="">
																			��ѡ��
																		</option>
																		<option value="AT00">
																			�Թ��˻�
																		</option>
																		<option value="AT01">
																			���˴��ǿ��˻�
																		</option>
																		<option value="AT02">
																			���˽�ǿ�
																		</option>
																		<option value="AT03">
																		����																		</option>
																		<option value="AT04">
																			����
																		</option>
																	</select>	 
																</td>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	��������ϵ�绰
																</td>
																<td>
																	<input name="po.phone" id="phone" type="text" readonly="readonly"
																		 maxlength="15" title="��������ϵ�绰" /> 
																</td>
																</tr>
																 <tr>
                                                  				<td class="text_tablehead_b" >
																	�����˵�ַ
																</td>
																<td colspan="3">
																	<input name="po.dbtrAddr" id="dbtrAddr" type="text" readonly="readonly"
																		style="width: 280px;"	 title="�����˵�ַ" onKeyPress="actkeyPress()" onkeyup="limitLength(value,70,'��ʾ��','dbtrAddr')" 
																			/>
																</td>
																 
                                                  			</tr>
																
																<tr>
																<td class="text_tablehead_b" >
																<!--   	�����˵�ַ-->
																</td>
																<td >
																	<input name="po.address" id="address" type="hidden"
																		 title="�����˵�ַ" maxlength="65" />
															
																</td>

																<td class="text_tablehead_b" >
																		<!--   ����������-->
																</td>
																<td>
																		 <input name="po.name" id="name" type="hidden"
																		 maxlength="45" title="����������" /> 
															
																</td>
																
																</tr>
																<tr>
																	
																<td class="text_tablehead_b"  >
																	<!-- �������˺�-->
																</td>
																<td >
																	<input name="po.proposerAcct" id="proposerAcct" type="hidden"
																		 title="�������˺�" maxlength="32" />
																</td>
																
																</tr>
																
																
														<tr>
														<td class="text_tablehead_b">
																	<!-- 	�����˿������к�-->
																</td>
																<td>
																	<input name="po.applyOpenBankNum" id="applyOpenBankNum" type="hidden" value="${bankInfo.bankcode}"
																		class="text_tablehead_b_c" title="�����˿������к�" maxlength="12"   readonly="readonly"
																		 />
																		<!--  <input type="button" class="button"  value="����"  onclick="selectBankInfoOfFkk()">
																		<font color="red">*</font> -->
																</td>
														
                                                  				<td class="text_tablehead_b" >
																<!-- 	�����˿���������--> 
																</td>
																<td>
																	<input name="po.applyOpenBankName" id="applyOpenBankName" type="hidden"   readonly="readonly" value="${bankInfo.participantname}"
																			style="width: 180px;" title="�����˿���������" maxlength="52"
																			/>
																</td>
																
                                                  			</tr>
                                                  					
																
																
                                                 	</table>
                                                </div>
                                               
                                                    <div class="table_content">
                                                    
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead"></span></td>
                                                      </tr>
                                                  			
                                                  			 
                                                  			  <tr>
                                                  			  <td class="text_tablehead_b">
																<!-- 	�������к�  -->
																</td>
																<td>
																	<input name="po.dbtrBrnchId" id="dbtrBrnchId" type="hidden" value="${bankInfo.bankcode}" readonly="readonly"
																		style="width: 180px;" title="�������к�" maxlength="12"
																		 />
																</td>
                                                  					<td class="text_tablehead_b" >
																	<!--����������  -->
																</td>
																<td>
																	<input name="po.dbtrBrnchNm" id="dbtrBrnchNm" type="hidden" value="${bankInfo.participantname}" readonly="readonly"
																			style="width: 180px;" title="����������" maxlength="42"
																			/>
																</td>															
                                                  			</tr>
                                                  			  <tr>
                                                  				
																<td class="text_tablehead_b" >
																	<!--�����������к� -->
																</td>
																<td>
																	<input name="po.dbtrMmbId" id="dbtrMmbId" type="hidden" value="${bankInfo.directbankcode}" readonly="readonly"
																			style="width: 180px;" title="�����������к�" maxlength="22"
																			/>
																</td>
																
																<td class="text_tablehead_b">
																 
																</td>
																<td>
																	 
																</td>
                                                  			</tr>
                                                  			
                                                  			  
                                                  			  <tr>
                                                  				
																

                                                  			</tr>
                                                  		</table>
                                                 </div>
                                                 
                                                 
                                                 
                                                 
                                                 
                                                     <div class="table_content">
                                                    	 
                                                    	     
                                                   <table>  
                                              <tr align="center">
                                              <td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                              <td  > 
                                              
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										 </td>
                                              </tr>                    
                                                   
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
											 <input id="saveButton" type="reset" style="cursor: pointer" class="button" value="��  ��"   />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
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
			</table>

 
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
	 
		 
		 
		 
		 
		 
		 
		 
		 
		   
				 





















		</form>
	</body>
</html>
