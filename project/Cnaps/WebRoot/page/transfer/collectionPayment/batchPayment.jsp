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
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript"  src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
		  <script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>	
		<script type="text/javascript" src="/cnaps/js/common/jquery-1.3.1.js"></script>
	  
		<script type="text/javascript">
		
			function commitForm(){
				 
			   var msg = "@";
			var instdPty = document.getElementById("instdPty");
			var instdDrctPty = document.getElementById("instdDrctPty");
			 
			 if(isNull(trim(instdDrctPty.value))){
					msg += instdDrctPty.title+"����Ϊ�գ�@";
				    }
			 if(isNull(trim(instdPty.value))){
					msg += instdPty.title+"����Ϊ�գ�@";
				    }
			  
			 
				var boo = msgSplit(msg);
				 
					 
			
				 if(boo){
				 			 document.getElementById("ttlAmt").value=rmoney(document.getElementById("ttlAmt").value) ;
				 			 document.getElementById("amount").value=rmoney(document.getElementById("amount").value) ;
				 
				 document.forms[0].submit();
				 
				 }
				 
		 }
		 
		var mxxh = 1;  // ��ϸ����-�����ʽ��ǻ���
	 
	function funaddmx()
	{
		mxxh++;
		this.document.getElementById("cdtrNb").value=mxxh;
		
		//��̬����к���
		var newTr = this.document.getElementById("gkzjjjhb_mx").insertRow();
		var newTd0 = newTr.insertCell();
		 
		
	 
		newTd0.innerHTML = "<table>                                                    	                                                    		 <tr>																<td class='text_tablehead_b' >																		ҵ���������																</td>																<td>																<select  name='po.pmtKd' id='pmtKd'>																 	 <option value='00100'>���</option>																	  <option value='00200'>ˮů��</option>																	  <option value='00300'>ú����</option>																	  <option value='00400'>�绰��</option>																	  <option value='00500'>ͨѶ��</option>																	  <option value='00600'>���շ�</option>																	  <option value='00700'>���ݹ����</option>																	   <option value='00800'>��������</option>																	   <option value='00900'>ѧ�̷�</option>																	    <option value='01000'>���ߵ��ӷ�	 </option>																	     <option value='01100'>��ҵ�������	 </option>																	       <option value='09001'>����</option>																	       </select>																	</td>																<td class='text_tablehead_b' >																�տ����к�																</td>																<td >																	<input style='width:180px;' name='po.cdtrBrnchId' id='cdtrBrnchId' type='text' size='19'																		maxlength='19' title='�ܽ��' />	<font color=red>*</font>																																	</td>															</tr>															 <tr>																<td class='text_tablehead_b' >																		�տ����˺�																</td>																<td>																 <input style='width:180px;' name='po.cdtrAcct' id='cdtrAcct' type='text' size='19'																		maxlength='19' title='�տ����˺�' />	<font color=red>*</font>																	</td>																<td class='text_tablehead_b' >																�տ�������																</td>																<td >																	<input style='width:180px;' name='po.cdtrNm' id='cdtrNm' type='text' size='19'																		maxlength='19' title='�տ�������' />	<font color=red>*</font>																																	</td>															</tr>															<tr>																<td class='text_tablehead_b' >																		���ҷ���																</td>																<td>																 <input style='width:180px;' name='po.currencyCd' id='currencyCd' type='text' size='19'																		maxlength='19' title='���ҷ���' />	<font color=red>*</font>																	</td>																<td class='text_tablehead_b' >																���																</td>																<td >																	<input style='width:180px;' name='po.amount' id='amount' type='text' size='19'																		maxlength='19' title='���' />	<font color=red>*</font>																																	</td>															</tr>															<tr>																<td class='text_tablehead_b' >																		��ͬ��Э�飩��																</td>																<td>																 <input style='width:180px;' name='po.agrmtNb' id='agrmtNb' type='text' size='19'																		maxlength='19' title='��ͬ��Э�飩��' />	<font color=red>*</font>																	</td>																<td class='text_tablehead_b' >																�����ʶ																</td>																<td >																	<input style='width:180px;' name='po.chckFlg' id='chckFlg' type='text' size='19'																		maxlength='19' title='�����ʶ' />	<font color=red>*</font>																																	</td>															</tr>															<tr>																															<td class='text_tablehead_b' >																&nbsp;&nbsp;&nbsp;����																</td>																<td colspan='3'>																	<input style='width:180px;' name='po.addtlInf' id='addtlInf' type='text' size='19'																		maxlength='800' title='����' />	<font color=red>*</font>																			</td>															</tr>															                                                    		<tr><td></td><td></td><td></td><td align='right'><input type='button' value='ɾ��'  class='button' onclick='fundelmxgz(this)'/></td></tr></table>                                                      "
		 
		//this.document.getElementById("gkzjjjhb_fjxx").rowSpan=7+mxxh;  // ���ÿ���
	}
	 
	function fundelmxgz(obj)
	{
		mxxh--;
		this.document.getElementById("cdtrNb").value=mxxh;
		
		var rowidx = obj.parentNode.parentNode.parentNode.parentNode.rowIndex; // ��ȡ�������ڱ���е��е�λ�ã���ɾ����ǰ�к���һ��
		alert(rowidx);
		this.document.getElementById('gkzjjjhb_mx').deleteRow(rowidx);
		
		//amountformat(this.document.getElementsByName("gz_cptlamt")[0]);
	}
			
			
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
		</script>
		
	 
	 
		
	</head>
	<body  >
		<form  name="form1" method="post"
			action="<%=path%>/BatchPaymentAction.do?method=batchPayment">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			 
	   
		  
		  
		  
		  
		  
		  
		  
		  
		    
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
						                  	<div  class="text_title"><span class="text_blue2">��������</span></div>
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
                                                                       �����������к�
																</td>
																<td>
																		<input name="po.instgPty" id="instgPty" type="text" 
														readonly=readonly		value="${bankInfo.bankcode }"					
														maxlength="19" title="�����������к�"  />
																

																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
															���ղ�������к�																</td>
																<td >
																<input name="po.instdPty" id="instdPty" type="text"  
																		style="width: 180px;" title="���ղ�������к�" maxlength="22"
																		  />
																		<font color=red>*</font>
																</td>
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																		����ֱ�Ӳ������
																</td>
																<td>
																<input name="po.instgDrctPty" id="instgDrctPty" type="text"  
																readonly=readonly			value="${bankInfo.directbankcode }"				style="width: 180px;" title="����ֱ�Ӳ������" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	����ֱ�Ӳ������
																</td>
																<td >
																	<input style="width:180px;" name="po.instdDrctPty" id="instdDrctPty" type="text" size="19"
																		maxlength="19" title="����ֱ�Ӳ������" />	<font color=red>*</font>																	
																</td>
															</tr>
															
															
															
															<tr>
															<td class="text_tablehead_b"  >
																	ϵͳ���
																</td>
																<td >
																		<select  name="po.systemCd" id="systemCd">
																	
																	 <option value="BEPS">С��</option>
																	   
																	</select>	 
																</td>
																<td class="text_tablehead_b" >
																	�������
																</td>
																<td >
																<input style="width:180px;" name="po.btchNb" id="btchNb" type="text" size="19"
																		maxlength="19" title="���ñ�ʶ" />	<font color=red>*</font>																	
																
																</td>
																
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																		��ִ����
																</td>
																<td>
																<input name="po.rcptLtd" id="rcptLtd" type="text"  
																		style="width: 180px;" title="��ִ����" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	���ձ�ʶ
																</td>
																<td >
																	
																	<select  name="po.rcvTp" id="rcvTp" title="���ձ�ʶ">
																 	 <option value="RT00">�����˿����н���</option>
																	  <option value="RT01">�տλ�����н���</option>
																	  
																	  
																	       </select>	
																	
																	
																	
																	
																	
																	
																	
																	
																	 	<font color=red>*</font>																	
																</td>
															</tr>
																<tr>
																<td class="text_tablehead_b" >
																		�տ�������
																</td>
																<td>
																<input name="po.cdtrNm" id="cdtrNm" type="text"  
																		style="width: 180px;" title="�տ�������" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	�տ����˺�
																</td>
																<td >
																	<input style="width:180px;" name="po.cdtrAcct" id="cdtrAcct" type="text" size="19"
																		maxlength="19" title="�տ����˺�" />	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																		�����������к�
																</td>
																<td>
																<input name="po.dbtrMmbId" id="dbtrMmbId" type="text"  
																		style="width: 180px;" title="�����������к�" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	�������к�
																</td>
																<td >
																	<input style="width:180px;" name="po.dbtrBrnchId" id="dbtrBrnchId" type="text" size="19"
																		maxlength="19" title="�������к�" />	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																		�տ��������к�
																</td>
																<td>
																<input name="po.cdtrMmbId" id="cdtrMmbId" type="text"  
																		style="width: 180px;" title="�տ��������к�" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	�ܽ��
																</td>
																<td >
																	<input style="width:180px;" name="po.ttlAmt" id="ttlAmt" type="text" size="19"
																		maxlength="19" title="�ܽ��" 
																		
																	 onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" 
																		/>	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																		��������Ŀ
																</td>
																<td>
																<input name="po.cdtrNb" id="cdtrNb" type="text"  
																	value="1" readonly=readonly	style="width: 180px;" title="��������Ŀ" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	ҵ�����ͱ���
																</td>
																<td >
																
																<select  name="po.pmtKd" id="pmtKd" title="ҵ�����ͱ���" >
																 	 <option value="E101">��������</option>
																 </select>	
																	 																	
																</td>
															</tr>
															</table>
                                                </div>
                                                 <div class="table_content">
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="3"><span class="text_tablehead">�������嵥</span></td>
                                                      	<td class="text_tablehead_b">
                                                    			<!--	<input type="button" class="button" value="��  ��" onclick="funaddmx()"/>-->
                                                    			</td>
                                                      </tr></table></div>
                                                      <div class="table_content" id="zcx">
                                                    
                                                    		<table>
                                                    	
                                                    		 <tr>
																<td class="text_tablehead_b" >
																		ҵ���������
																</td>
																<td>
																<select  name="poo.pmtKd" id="pmtKd">
																 	 <option value="00100">���</option>
																	  <option value="00200">ˮů��</option>
																	  <option value="00300">ú����</option>
																	  <option value="00400">�绰��</option>
																	  <option value="00500">ͨѶ��</option>
																	  <option value="00600">���շ�</option>
																	  <option value="00700">���ݹ����</option>
																	   <option value="00800">��������</option>
																	   <option value="00900">ѧ�̷�</option>
																	    <option value="01000">���ߵ��ӷ�	 </option>
																	     <option value="01100">��ҵ�������	 </option>
																	       <option value="09001">����</option>
																	       </select>	
																</td>
																<td class="text_tablehead_b" >
																�տ����к�																</td>
																<td >
																	<input style="width:180px;" name="poo.cdtrBrnchId" id="cdtrBrnchId" type="text" size="19"
																		maxlength="19" title="�ܽ��" />	<font color=red>*</font>																	
																</td>
															</tr>
															 <tr>
																<td class="text_tablehead_b" >
																		�տ����˺�
																</td>
																<td>
																 <input style="width:180px;" name="poo.cdtrAcct" id="cdtrAcct" type="text" size="19"
																		maxlength="19" title="�տ����˺�" />	<font color=red>*</font>	
																</td>
																<td class="text_tablehead_b" >
																�տ�������																</td>
																<td >
																	<input style="width:180px;" name="poo.cdtrNm" id="cdtrNm" type="text" size="19"
																		maxlength="19" title="�տ�������" />	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																		���ҷ���
																</td>
																<td>
																 <input style="width:180px;" name="poo.currencyCd" id="currencyCd" type="text" size="19"
																		readonly=readonly value="CNY" maxlength="19" title="���ҷ���" />	<font color=red>*</font>	
																</td>
																<td class="text_tablehead_b" >
																���																</td>
																<td >
																	<input style="width:180px;" name="poo.amount" id="amount" type="text" size="19"
																		maxlength="19" title="���" 
																		
																		
																		 onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" 
																		
																		
																		
																		
																		
																		/>	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																		��ͬ��Э�飩��
																</td>
																<td>
																 <input style="width:180px;" name="poo.agrmtNb" id="agrmtNb" type="text" size="19"
																		maxlength="19" title="��ͬ��Э�飩��" />	<font color=red>*</font>	
																</td>
																<td class="text_tablehead_b" >
																�����ʶ																</td>
																<td >
																	 		
																	<select  name="poo.chckFlg" id="chckFlg" title="���ձ�ʶ">
																 	 <option value="CE01">�Ѻ���</option>
																	  <option value="CE02">δ����</option>
																	  
																	  
																	       </select>	
																		
																		
																																			
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																&nbsp;&nbsp;&nbsp;����																</td>
																<td colspan="3">
																	<textarea name="poo.addtlInf" id="addtlInf" 
																		rows="2" cols="80" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','fy')"></textarea>
																</td>

															</tr>
															
                                                    		</table>
                                                    		 
															 
												           
                                                    		 <table id="gkzjjjhb_mx" border="0" cellpadding="0" cellspacing="0">
												               
												                </table>
												                     
												           
 </div>                           
                                                
                                                
                                                     <div class="table_content">
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">��ע</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																&nbsp;&nbsp;&nbsp;��ע																</td>
																<td colspan="3">
																	<textarea name="po.ustrd" id="ustrd" 
																		rows="2" cols="100" onKeyPress="charPress()" onkeyup="limitLength(value,135,'��ʾ��','fy')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    		
 </div>                           
                                                                                                   
                                                 
                                                         <div class="table_content">
                                                    	 
                                                    	     
                                                   <table>  
                                              <tr align="center">
                                              <td class="text_tablehead_b">&nbsp;</td>
                                               <td class="text_tablehead_b">&nbsp;</td> <td class="text_tablehead_b">&nbsp;</td>
                                              <td class="text_tablehead_b" > 
                                              
										<font color=red>˵������ɫ*��ע��Ϊ������</font>
										 </td>
										 <td class="text_tablehead_b">&nbsp;</td>
                                         <td class="text_tablehead_b">&nbsp;</td>
									           </tr>                    
                                                   
                                                    		<tr><td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td class="text_tablehead_b">
                                                    				<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();" />
                                                    			</td>
                                                    			<td  class="text_tablehead_b">&nbsp;</td>
                                                    	 
                                                    			<td  class="text_tablehead_b">&nbsp;</td>
                                                    			<td  class="text_tablehead_b">&nbsp;</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
                                                 
                                                         </div>
                                                                                        
                                      
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
 