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
		<META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
		  <META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">   
		  <META   HTTP-EQUIV="Expires"   CONTENT="0"> 
		<title>清算账户自动拆借管理申请</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			
			function commitForm(){
				if(VForm.Validate()){
					
					document.forms[0].submit();
				}
			  
			  
			}
			
			
		</script>
	</head>
	<body >
	 
	
	
	  <form method="post" name="myform"
			action="<%=path%>/AutoLendingAction.do?method=sendMessage">
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
						                  	<div  class="text_title"><span class="text_blue2"> 自动拆借管理录入</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		 
                                                <div class="table_body">
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">	报文信息</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	拆入清算行行号：
																</td>
																<td>
																	<input name="po.creditor" id="creditor" type="text"
																		style="width: 180px;" maxlength="15"  onKeyPress="actkeyPress()"/>
																		<span name="validate" dataName="po.creditor" dataType="Empty" msg="拆入清算行行号不能为空！" class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																		拆出清算行行号：
																</td>
																<td >
																<input name="po.debtor" id="debtor" type="text"
																		style="width: 180px;" maxlength="15"  onKeyPress="actkeyPress()"/>
																		<span name="validate" dataName="po.debtor" dataType="Empty" msg="拆出清算行行号不能为空！" class="STYLE1">*</span>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	拆借协议号：
																</td>
																<td >
																	<input name="po.protocolNumber" id="protocolNumber" type="text"
																		style="width: 180px;" maxlength="15"  />
																</td>

																<td class="text_tablehead_b" >
																		自动拆借管理类型：
																</td>
																<td>
																<select name="po.interbankLoanManagementType" id="interbankLoanManagementType" onchange="selectType()">
																			<option value="PC00">签约</option>
																			<option value="PC01">撤销</option>
																			<option value="PC02">额度恢复</option>
																		</select>
																		<span class="STYLE1">*</span>
																	</td>
																</tr>
																
																
																<tr>
																<td class="text_tablehead_b" >
																拆借金额上限：
																</td>
																<td >
																<input name="po.interbankLoanUpperlimit" id="interbankLoanUpperlimit" type="text"
																		style="width: 180px;" maxlength="15"  onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		/>
																</td>

																<td class="text_tablehead_b" >
																	拆借金额下限：
																</td>
																<td>
																		<input name="po.interbankLoanLowerlimit" id="interbankLoanLowerlimit" type="text"
																		style="width: 180px;" maxlength="15"  onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		/>
																</td>
																
																</tr>
																<tr>
																	
																<td class="text_tablehead_b"  >
																	拆借协议生效日期：
																</td>
																<td >
																		<input name="po.protocolEffectiveDate" id="protocolEffectiveDate" type="text"
																		style="width: 180px;" maxlength="15" readonly="readonly"  class="Wdate" onclick="WdatePicker()" />
																</td>
																<td class="text_tablehead_b" >
																	拆借协议截止日期：
																</td>
																<td>
																	<input name="po.protocolExpirationDate" id="protocolExpirationDate" type="text"
																		style="width: 180px;" maxlength="15" readonly="readonly" class="Wdate" onclick="WdatePicker()"  />
																</td>
																</tr>
																<tr>
																	
																<td class="text_tablehead_b"  >
																		恢复金额：
																</td>
																<td >
																		<input name="po.amount" id="amount" type="text"
																		style="width: 180px;" maxlength="15"  onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		/>
															
																</td>
																<td class="text_tablehead_b" >
																 
																</td>
																<td>
																	 
																</td>
																</tr>
															 	<tr>
											                  	<td  class="text_tablehead_b">
											                  		备注
											                  	</td>
											                  	<td colspan="3" >
											                   		<textarea name="po.remarkInfo" class="textarea_msg"  cols="50" rows="2" id="remarkInfo" onKeyPress="charPress()"></textarea>
											                   	</td>
											               </tr>
											               	<tr>
																<td colspan="4" align="center">&nbsp;</td>
															</tr>
															<tr>
																<td colspan="4" align="center">
																		<span class="STYLE1">说明：红色*标注项为必填项</span>
																</td>
															</tr>	
																<tr>
																<td colspan="4" align="center">
																		<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();" />
																</td>
															</tr>	
																
																
                                                 	</table>
                                                 	
										<br />
										<br />
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
		  
		  
		  
		  
		  
		  
		  
		  
		  
	
	
	
	
	
	 
	
		
			<!-- 防止重复提交 -->	<%--
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48"></td>
					<td>
						<table width="100%" height="48" border="0" cellpadding="0"
							cellspacing="0">
							<tr>
								<td width="360" class="text_tablehead_b">
								 
									<h5 align="left">
									 
									</h5>
								</td>
								<td width="194"></td>
								<td width="270"></td>
								 
							</tr>
						</table>
					</td>
					<td width="8"></td>
				</tr>
				<tr valign="top">
					 
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);"></td>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table border="0" cellspacing="0" cellpadding="0">
											<th class="text_tablehead_b">
												<h4 align="center">
													清算账户自动拆借管理录入
													
												</h4>
											</th>
											<tr>
												<td>
												
												<fieldset
														style="width: 700px; border: 1px #CCCCCC solid; padding: 3px;"
														align=center>
														<legend>
															报文信息
														</legend>
														<br>
														<table border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	拆入清算行行号：
																</td>
																<td>
																	<input name="po.creditor" id="creditor" type="text"
																		style="width: 180px;" maxlength="15"  onKeyPress="actkeyPress()"/>
																		<span name="validate" dataName="po.creditor" dataType="Empty" msg="拆入清算行行号不能为空！" class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	拆出清算行行号：
																</td>
																<td>
																	<input name="po.debtor" id="debtor" type="text"
																		style="width: 180px;" maxlength="15"  onKeyPress="actkeyPress()"/>
																		<span name="validate" dataName="po.debtor" dataType="Empty" msg="拆出清算行行号不能为空！" class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	拆借协议号：
																</td>
																<td>
																	<input name="po.protocolNumber" id="protocolNumber" type="text"
																		style="width: 180px;" maxlength="15"  />
																		<span name="validate" dataName="po.protocolNumber" dataType="Empty" msg="拆借协议号不能为空！" class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	自动拆借管理类型：
																</td>
																<td>
																		<select name="po.interbankLoanManagementType" id="interbankLoanManagementType" onchange="selectType()">
																			<option value="PC00">签约</option>
																			<option value="PC01">撤销</option>
																			<option value="PC02">额度恢复</option>
																		</select>
																		<span class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	拆借金额上限：
																</td>
																<td>
																	<input name="po.interbankLoanUpperlimit" id="interbankLoanUpperlimit" type="text"
																		style="width: 180px;" maxlength="15"  onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"/>
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	拆借金额下限：
																</td>
																<td>
																	<input name="po.interbankLoanLowerlimit" id="interbankLoanLowerlimit" type="text"
																		style="width: 180px;" maxlength="15"  onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"/>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	拆借协议生效日期：
																</td>
																<td>
																	<input name="po.protocolEffectiveDate" id="protocolEffectiveDate" type="text"
																		style="width: 180px;" maxlength="15" readonly="readonly"  class="Wdate" onclick="WdatePicker()" />
																</td>
																<td class="text_tablehead_b" align="right" width="140px">
																	拆借协议截止日期：
																</td>
																<td>
																	<input name="po.protocolExpirationDate" id="protocolExpirationDate" type="text"
																		style="width: 180px;" maxlength="15" readonly="readonly" class="Wdate" onclick="WdatePicker()"  />
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" align="right" width="140px">
																	恢复金额：
																</td>
																<td>
																	<input name="po.amount" id="amount" type="text"
																		style="width: 180px;" maxlength="15"  onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"/>
																</td>
															</tr>
															
															</table>
															<br/>
															</fieldset>
															
													
												</td>
											</tr>
										</table>
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="返  回" onclick="history.back();" />
										<br />
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);"></td>

				
					 
				</tr>
			</table> --%>

		</form>
	</body>
</html>
