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
					msg += instdDrctPty.title+"不能为空！@";
				    }
			 if(isNull(trim(instdPty.value))){
					msg += instdPty.title+"不能为空！@";
				    }
			  
			 
				var boo = msgSplit(msg);
				 
					 
			
				 if(boo){
				 			 document.getElementById("ttlAmt").value=rmoney(document.getElementById("ttlAmt").value) ;
				 			 document.getElementById("amount").value=rmoney(document.getElementById("amount").value) ;
				 
				 document.forms[0].submit();
				 
				 }
				 
		 }
		 
		var mxxh = 1;  // 明细总数-国库资金借记划拨
	 
	function funaddmx()
	{
		mxxh++;
		this.document.getElementById("cdtrNb").value=mxxh;
		
		//动态添加行和列
		var newTr = this.document.getElementById("gkzjjjhb_mx").insertRow();
		var newTd0 = newTr.insertCell();
		 
		
	 
		newTd0.innerHTML = "<table>                                                    	                                                    		 <tr>																<td class='text_tablehead_b' >																		业务种类编码																</td>																<td>																<select  name='po.pmtKd' id='pmtKd'>																 	 <option value='00100'>电费</option>																	  <option value='00200'>水暖费</option>																	  <option value='00300'>煤气费</option>																	  <option value='00400'>电话费</option>																	  <option value='00500'>通讯费</option>																	  <option value='00600'>保险费</option>																	  <option value='00700'>房屋管理费</option>																	   <option value='00800'>代理服务费</option>																	   <option value='00900'>学教费</option>																	    <option value='01000'>有线电视费	 </option>																	     <option value='01100'>企业管理费用	 </option>																	       <option value='09001'>其他</option>																	       </select>																	</td>																<td class='text_tablehead_b' >																收款行行号																</td>																<td >																	<input style='width:180px;' name='po.cdtrBrnchId' id='cdtrBrnchId' type='text' size='19'																		maxlength='19' title='总金额' />	<font color=red>*</font>																																	</td>															</tr>															 <tr>																<td class='text_tablehead_b' >																		收款人账号																</td>																<td>																 <input style='width:180px;' name='po.cdtrAcct' id='cdtrAcct' type='text' size='19'																		maxlength='19' title='收款人账号' />	<font color=red>*</font>																	</td>																<td class='text_tablehead_b' >																收款人名称																</td>																<td >																	<input style='width:180px;' name='po.cdtrNm' id='cdtrNm' type='text' size='19'																		maxlength='19' title='收款人名称' />	<font color=red>*</font>																																	</td>															</tr>															<tr>																<td class='text_tablehead_b' >																		货币符号																</td>																<td>																 <input style='width:180px;' name='po.currencyCd' id='currencyCd' type='text' size='19'																		maxlength='19' title='货币符号' />	<font color=red>*</font>																	</td>																<td class='text_tablehead_b' >																金额																</td>																<td >																	<input style='width:180px;' name='po.amount' id='amount' type='text' size='19'																		maxlength='19' title='金额' />	<font color=red>*</font>																																	</td>															</tr>															<tr>																<td class='text_tablehead_b' >																		合同（协议）号																</td>																<td>																 <input style='width:180px;' name='po.agrmtNb' id='agrmtNb' type='text' size='19'																		maxlength='19' title='合同（协议）号' />	<font color=red>*</font>																	</td>																<td class='text_tablehead_b' >																核验标识																</td>																<td >																	<input style='width:180px;' name='po.chckFlg' id='chckFlg' type='text' size='19'																		maxlength='19' title='核验标识' />	<font color=red>*</font>																																	</td>															</tr>															<tr>																															<td class='text_tablehead_b' >																&nbsp;&nbsp;&nbsp;附言																</td>																<td colspan='3'>																	<input style='width:180px;' name='po.addtlInf' id='addtlInf' type='text' size='19'																		maxlength='800' title='附言' />	<font color=red>*</font>																			</td>															</tr>															                                                    		<tr><td></td><td></td><td></td><td align='right'><input type='button' value='删除'  class='button' onclick='fundelmxgz(this)'/></td></tr></table>                                                      "
		 
		//this.document.getElementById("gkzjjjhb_fjxx").rowSpan=7+mxxh;  // 设置跨行
	}
	 
	function fundelmxgz(obj)
	{
		mxxh--;
		this.document.getElementById("cdtrNb").value=mxxh;
		
		var rowidx = obj.parentNode.parentNode.parentNode.parentNode.rowIndex; // 获取对象所在表格中的行的位置，并删除当前行和下一行
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
						                  	<div  class="text_title"><span class="text_blue2">批量代付</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																 
													 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                                      </tr>	
															<tr>
																<td class="text_tablehead_b" >
                                                                       发起参与机构行号
																</td>
																<td>
																		<input name="po.instgPty" id="instgPty" type="text" 
														readonly=readonly		value="${bankInfo.bankcode }"					
														maxlength="19" title="发起参与机构行号"  />
																

																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
															接收参与机构行号																</td>
																<td >
																<input name="po.instdPty" id="instdPty" type="text"  
																		style="width: 180px;" title="接收参与机构行号" maxlength="22"
																		  />
																		<font color=red>*</font>
																</td>
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																		发起直接参与机构
																</td>
																<td>
																<input name="po.instgDrctPty" id="instgDrctPty" type="text"  
																readonly=readonly			value="${bankInfo.directbankcode }"				style="width: 180px;" title="发起直接参与机构" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	接收直接参与机构
																</td>
																<td >
																	<input style="width:180px;" name="po.instdDrctPty" id="instdDrctPty" type="text" size="19"
																		maxlength="19" title="接收直接参与机构" />	<font color=red>*</font>																	
																</td>
															</tr>
															
															
															
															<tr>
															<td class="text_tablehead_b"  >
																	系统编号
																</td>
																<td >
																		<select  name="po.systemCd" id="systemCd">
																	
																	 <option value="BEPS">小额</option>
																	   
																	</select>	 
																</td>
																<td class="text_tablehead_b" >
																	批次序号
																</td>
																<td >
																<input style="width:180px;" name="po.btchNb" id="btchNb" type="text" size="19"
																		maxlength="19" title="费用标识" />	<font color=red>*</font>																	
																
																</td>
																
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																		回执期限
																</td>
																<td>
																<input name="po.rcptLtd" id="rcptLtd" type="text"  
																		style="width: 180px;" title="回执期限" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	接收标识
																</td>
																<td >
																	
																	<select  name="po.rcvTp" id="rcvTp" title="接收标识">
																 	 <option value="RT00">付款人开户行接收</option>
																	  <option value="RT01">收款单位开户行接收</option>
																	  
																	  
																	       </select>	
																	
																	
																	
																	
																	
																	
																	
																	
																	 	<font color=red>*</font>																	
																</td>
															</tr>
																<tr>
																<td class="text_tablehead_b" >
																		收款人名称
																</td>
																<td>
																<input name="po.cdtrNm" id="cdtrNm" type="text"  
																		style="width: 180px;" title="收款人名称" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	收款人账号
																</td>
																<td >
																	<input style="width:180px;" name="po.cdtrAcct" id="cdtrAcct" type="text" size="19"
																		maxlength="19" title="收款人账号" />	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																		付款清算行行号
																</td>
																<td>
																<input name="po.dbtrMmbId" id="dbtrMmbId" type="text"  
																		style="width: 180px;" title="付款清算行行号" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	付款行行号
																</td>
																<td >
																	<input style="width:180px;" name="po.dbtrBrnchId" id="dbtrBrnchId" type="text" size="19"
																		maxlength="19" title="付款行行号" />	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																		收款清算行行号
																</td>
																<td>
																<input name="po.cdtrMmbId" id="cdtrMmbId" type="text"  
																		style="width: 180px;" title="收款清算行行号" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	总金额
																</td>
																<td >
																	<input style="width:180px;" name="po.ttlAmt" id="ttlAmt" type="text" size="19"
																		maxlength="19" title="总金额" 
																		
																	 onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" 
																		/>	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																		付款人数目
																</td>
																<td>
																<input name="po.cdtrNb" id="cdtrNb" type="text"  
																	value="1" readonly=readonly	style="width: 180px;" title="付款人数目" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	业务类型编码
																</td>
																<td >
																
																<select  name="po.pmtKd" id="pmtKd" title="业务类型编码" >
																 	 <option value="E101">批量代付</option>
																 </select>	
																	 																	
																</td>
															</tr>
															</table>
                                                </div>
                                                 <div class="table_content">
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="3"><span class="text_tablehead">付款人清单</span></td>
                                                      	<td class="text_tablehead_b">
                                                    			<!--	<input type="button" class="button" value="增  加" onclick="funaddmx()"/>-->
                                                    			</td>
                                                      </tr></table></div>
                                                      <div class="table_content" id="zcx">
                                                    
                                                    		<table>
                                                    	
                                                    		 <tr>
																<td class="text_tablehead_b" >
																		业务种类编码
																</td>
																<td>
																<select  name="poo.pmtKd" id="pmtKd">
																 	 <option value="00100">电费</option>
																	  <option value="00200">水暖费</option>
																	  <option value="00300">煤气费</option>
																	  <option value="00400">电话费</option>
																	  <option value="00500">通讯费</option>
																	  <option value="00600">保险费</option>
																	  <option value="00700">房屋管理费</option>
																	   <option value="00800">代理服务费</option>
																	   <option value="00900">学教费</option>
																	    <option value="01000">有线电视费	 </option>
																	     <option value="01100">企业管理费用	 </option>
																	       <option value="09001">其他</option>
																	       </select>	
																</td>
																<td class="text_tablehead_b" >
																收款行行号																</td>
																<td >
																	<input style="width:180px;" name="poo.cdtrBrnchId" id="cdtrBrnchId" type="text" size="19"
																		maxlength="19" title="总金额" />	<font color=red>*</font>																	
																</td>
															</tr>
															 <tr>
																<td class="text_tablehead_b" >
																		收款人账号
																</td>
																<td>
																 <input style="width:180px;" name="poo.cdtrAcct" id="cdtrAcct" type="text" size="19"
																		maxlength="19" title="收款人账号" />	<font color=red>*</font>	
																</td>
																<td class="text_tablehead_b" >
																收款人名称																</td>
																<td >
																	<input style="width:180px;" name="poo.cdtrNm" id="cdtrNm" type="text" size="19"
																		maxlength="19" title="收款人名称" />	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																		货币符号
																</td>
																<td>
																 <input style="width:180px;" name="poo.currencyCd" id="currencyCd" type="text" size="19"
																		readonly=readonly value="CNY" maxlength="19" title="货币符号" />	<font color=red>*</font>	
																</td>
																<td class="text_tablehead_b" >
																金额																</td>
																<td >
																	<input style="width:180px;" name="poo.amount" id="amount" type="text" size="19"
																		maxlength="19" title="金额" 
																		
																		
																		 onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" 
																		
																		
																		
																		
																		
																		/>	<font color=red>*</font>																	
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																		合同（协议）号
																</td>
																<td>
																 <input style="width:180px;" name="poo.agrmtNb" id="agrmtNb" type="text" size="19"
																		maxlength="19" title="合同（协议）号" />	<font color=red>*</font>	
																</td>
																<td class="text_tablehead_b" >
																核验标识																</td>
																<td >
																	 		
																	<select  name="poo.chckFlg" id="chckFlg" title="接收标识">
																 	 <option value="CE01">已核验</option>
																	  <option value="CE02">未核验</option>
																	  
																	  
																	       </select>	
																		
																		
																																			
																</td>
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																&nbsp;&nbsp;&nbsp;附言																</td>
																<td colspan="3">
																	<textarea name="poo.addtlInf" id="addtlInf" 
																		rows="2" cols="80" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','fy')"></textarea>
																</td>

															</tr>
															
                                                    		</table>
                                                    		 
															 
												           
                                                    		 <table id="gkzjjjhb_mx" border="0" cellpadding="0" cellspacing="0">
												               
												                </table>
												                     
												           
 </div>                           
                                                
                                                
                                                     <div class="table_content">
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">备注</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																&nbsp;&nbsp;&nbsp;备注																</td>
																<td colspan="3">
																	<textarea name="po.ustrd" id="ustrd" 
																		rows="2" cols="100" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','fy')"></textarea>
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
                                              
										<font color=red>说明：红色*标注项为必填项</font>
										 </td>
										 <td class="text_tablehead_b">&nbsp;</td>
                                         <td class="text_tablehead_b">&nbsp;</td>
									           </tr>                    
                                                   
                                                    		<tr><td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td class="text_tablehead_b">
                                                    				<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();" />
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
 