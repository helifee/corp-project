<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>
	<c:choose>
		<c:when test="${syspara == 'RegularDebitLedger'}">定期借记-总账</c:when>
		<c:when test="${syspara == 'RegularDebitTransfer'}">定期借记-转账</c:when>
	</c:choose>
</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type='text/javascript' src='<%=path%>/dwr/interface/CommonServices.js'></script>
	<script type='text/javascript' src='<%=path%>/dwr/interface/DebitService.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
  
	  
    
<style type="text/css">
input {width: 150px;}
</style>
 
<script type="text/javascript">
		function queryBypmtgrpid(paymentGroupNum){
		        alert(paymentGroupNum);
		     
		        
			  	 CommonServices.queryRegularDebit(paymentGroupNum,function(obj){
			  	  alert(obj.pmtgrpid);
				  if(obj==null||obj.pmtgrpid==null){
				  alert("支付交易组号不存在11，或已失效，未查到相关数据");
				 
				   return;
				  }
				  }
				  )
			  			
		

			}
	//计算总额
	function summxhzje(obj){
		var totalamount = 0;
		totalamount = parseFloat((this.document.getElementById("servicecharge").value == "")?"0.00":this.document.getElementById("servicecharge").value)+
		parseFloat((this.document.getElementById("postage").value == "")?"0.00":this.document.getElementById("postage").value)+
		parseFloat((this.document.getElementById("outstationcharge").value == "")?"0.00":this.document.getElementById("outstationcharge").value)+
		parseFloat((this.document.getElementById("amount").value == "")?"0.00":this.document.getElementById("amount").value);
		
		obj.value=totalamount;
	}
	
	 

	 
	function ckzfjyzh(){
		if(this.document.getElementById("amount").value != this.document.getElementById("aclmtamt").value){
			alert("收款金额 与 累计录入金额 不符！");
		}else{
			if(document.getElementById("pmtgrpid").value.replace(/\s/g,"") != ""){
				window.setTimeout(ckeckwethornull,5000);
			}else{
				ckeckwethornull();
			}
		}
	}
	
	 
	
</script>

</head>
<body>

<!--   
<html     form method="post" action="/regularDebitAction.do?method=sendMsgcreatedetails&syspara=input">-->

<html:form method="post" action="/RegularDebitTurnAction.do?method=sendturn" > 
	<input id="business_name" type="hidden" value="RegularDebitLdeger">
	<input id="repeatmark" type="hidden" value="0">
	
	<c:choose>
											<c:when test="${syspara == 'RegularDebitLedger'}"><input type="hidden" name="po.signmd" value="04"/></c:when>
											<c:when test="${syspara == 'RegularDebitTransfer'}"><input type="hidden" name="po.signmd" value="03"/></c:when>
										</c:choose>
	
	
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
						                  	<div  class="text_title"><span class="text_blue2">
						                 <c:choose>
								<c:when test="${syspara == 'RegularDebitLedger'}">定期借记-总账</c:when>
								<c:when test="${syspara == 'RegularDebitTransfer'}">定期借记-转账</c:when>
							</c:choose>
						                  	</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           	<div class="table_content"><hr/></div>
                                                     <div class="table_content">
                                                      <table >
																 
													<tr>
                                                      	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                                      </tr>			
															<tr>
																<td class="text_tablehead_b" >
																	支付交易组号
																</td>
																<td>	
													<input type="text" style="width: 180px;" name="po.pmtgrpid"  id="pmtgrpid" maxlength="20"  onblur="queryBypmtgrpid(this.value)"/>																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																业务类型编码
																</td>
																<td >
																	<select name="po.pmttp" id="pmttp" style="width: 180px;">
				                   			<option value="F100">定期借记业务</option>
				                   		</select>
																</td>
															</tr>
															
															 
															
															
															
															<tr>
															<td class="text_tablehead_b"  >
																	最迟回执天数
																</td>
																<td >
																		<input type="text" name="po.rcptltd" style="width: 180px;" id="rcptltd" maxlength="2" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	<!--端到端标识号-->
																</td>
																<td >
																	<!--<input name="endtoendid" id="dddbsh" type="text" 
																		maxlength="19" title="端到端标识号"  />
																
																	<span  class="STYLE1">*</span>-->
																</td>
																
															</tr>
															</table>
                                                 </div>
                                                 <div class="table_content"><hr/></div>
                                                   <div class="table_content">
                                                 	<table>
                                                 	 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">申请人信息</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	证件类型
																</td>
																<td>
																	<input type="text" readonly="readonly" id="proposercerttp" style="width: 180px;"/>
																</td>
															
																<td class="text_tablehead_b" >
																	申请人证件号
																</td>
																<td >
																	<input type="text" readonly="readonly" id="proposercertid" style="width: 180px;"/>	</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																		证件发行国家
																</td>
																<td >
																		<input type="text" readonly="readonly" id="proposercertissued" style="width: 180px;"/>
															
																</td>

																<td class="text_tablehead_b" >
																	申请人联系电话
																</td>
																<td>
																	<input type="text" readonly="readonly" id="proposertel" style="width: 180px;"/>
																</td>
																</tr>
																
																
																<tr>
																<td class="text_tablehead_b" >
																	申请人客户号
																</td>
																<td >
																	<input type="text" readonly="readonly" id="proposercstmrid" style="width: 180px;"/>
																</td>

																<td class="text_tablehead_b" >
																	申请人账户类型
																</td>
																<td>
																			<select id="proposeraccttp" style="width: 180px;">
				                   			<option value="">请选择</option>
				                   			<option value="AT00">对公账户</option>
				                   			<option value="AT01">个人贷记卡账户</option>
				                   			<option value="AT02">个人借记卡</option>
				                   			<option value="AT03">存折</option>
				                   			<option value="AT04">其他</option>
				                   		</select>
																</td>
																
																</tr>
																<tr>
																	
																<td class="text_tablehead_b"  >
																	申请人账户币种
																</td>
																<td >
																	<input type="text" readonly="readonly" id="proposeracctccy" style="width: 180px;"/>
															
																</td>
																</tr>
                                                 	</table>
                                              </div>
                                                    <div class="table_content"><hr/></div>
                                                    <div class="table_content">
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">付款人信息</span></td>
                                                      </tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	收款人账号
																</td>
																<td>
																		<input type="text" name="po.cdtracct" style="width: 180px;" id="cdtracct" maxlength="32"/>
				                   		<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b">
																	收款人名称
																</td>
																<td>
																	<input type="text" name="po.cdtrnm" id="cdtrnm" style="width: 180px;" maxlength="60"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	收款行行号
																</td>
																<td>
																	<input type="text" name="po.cdtrbrnchid" id="cdtrbrnchid" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font> 
																</td>
																<td class="text_tablehead_b" >
																		收款行行名
																</td>
																<td>
																	<input type="text" name="po.cdtrbrnchnm" id="cdtrbrnchnm" style="width: 180px;" maxlength="60"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	  		收款人开户行行号
																</td>
																<td colspan="3">
																		<input type="text" name="po.cdtrissuer" id="cdtrissuer" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	收款人开户行行名
																</td>
																<td>
																	<input type="text" name="po.cdtrissuernm" id="cdtrissuernm" style="width: 180px;" maxlength="60"/>
				               
																</td>
																<td class="text_tablehead_b">
																	收款清算行行号
																</td>
																<td>

																	<input type="text" name="po.cdtrmmbid" id="cdtrmmbid" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	收款人地址
																</td>
																<td colspan="4">
																	<textarea name="po.cdtraddr" id="cdtraddr"  style="width: 180px;" 
																		rows="4" onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','address')"></textarea>
																</td>
                                                  			</tr>
                                                  		</table>
                                                </div>
                                                  
                                                   <div class="table_content"><hr/></div>
                                                    <div class="table_content">
                                                  		<table>
                                                  		<tr>
                                                      	<td colspan="4"><span class="text_tablehead">金额信息</span></td>
                                                      </tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	币种代码
																</td>
																<td>
																		<input type="text" name="po.currencycd" style="width: 180px;" id="currencycd" readonly="readonly" value="CNY"/>
				                  	<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	总额
																</td>
																<td >
																		<input type="text" name="po.totalamt" style="width: 180px;" id="totalamt" maxlength="19" readonly="readonly"/>
				                
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" >
																		收款金额
																	</td>
																	<td colspan="4">
																	<input type="text" id="amount" readonly="readonly" style="width: 180px;"/>
																	</td>
																	
																</tr>
                                                  		</table>
                                                  	</div>
                                                  	<div class="table_content"><hr/></div>
                                                    <div class="table_content">
                                                    		<table>
                                                    					 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">计费信息</span></td>
                                                      </tr>
                                                    			<tr>
																<td class="text_tablehead_b" align="right">
																明细笔数
																</td>
																<td>
																 
																	
																	<input type="text" id="nboftxs" readonly="readonly" style="width: 180px;"/>
																<td class="text_tablehead_b" align="right" >
																	累计录入金额
																</td>
																<td>
															<input type="text" id="aclmtamt" readonly="readonly" style="width: 180px;"/>
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																	手续费
																</td>
																<td>
																		<input type="text" name="po.servicecharge" id="servicecharge" style="width: 180px;"
				                   		 maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
				                 
																</td>
																<td class="text_tablehead_b" >
																	邮电费
																</td>
																<td>
																	<input type="text" name="po.postage" id="postage" maxlength="19" style="width: 180px;"
				                   		onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	异地加收
																</td>
																<td  >
																	<input type="text" name="po.outstationcharge" id="outstationcharge" style="width: 180px;"
				                   		maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
																</td>
																	 
																<td class="text_tablehead_b" >
																	减免
																</td>
																<td >
																<select name="po.waive" id="waive" style="width: 180px;">
				                   			<option value="N">不减免</option>
				                   			<option value="Y">减免</option>
				                   		</select>
																</td>
															</tr>
                                                    		</table>
                                                    </div>
                                                  
                                                   
                                           </td>
                                         </tr>
                                      </table>
						              
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存"  onclick="ckeckwethornull();" />
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
					<td></td>

					
				</tr>
			</table>

 
		  
		  
	  
		  
		  
		  
		    

	 	
			
			
			
			
			
			
			
			
			
			
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
 	
	<!--
	<table id="querybook" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		
	  	<tr valign="top">
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
	      		<br/>
	      		<table width="100%" border="0" cellspacing="0" cellpadding="0" >
	        		<tr>
	        		<td width="10">&nbsp;</td>
	        		<td>
	        			<div align="center">
						<table border="0" cellspacing="0" cellpadding="0">
							<th class="text_tablehead_b" >
			        		<h4 align="center">
			        		<c:choose>
								<c:when test="${syspara == 'RegularDebitLedger'}">定期借记-总账</c:when>
								<c:when test="${syspara == 'RegularDebitTransfer'}">定期借记-转账</c:when>
							</c:choose>
							</h4>
			        </th>
	        		
	        		<tr>
	          			<td>
		          			<table border="1" bordercolor="#BDD#F0" cellspacing="0" cellpadding="0" bgcolor="#f4f8fd" >	          			
                				<tr>
                					<td class="text_tablehead_b" width="2" rowspan="3" align="center">
                						<span style="margin-left: 7px;">基</span>
																	<span style="margin-left: 7px;">本</span>
																	<span style="margin-left: 7px;">信</span>
																	<span style="margin-left: 7px;">息</span>
                						<c:choose>
											<c:when test="${syspara == 'RegularDebitLedger'}"><input type="hidden" name="po.signmd" value="04"/></c:when>
											<c:when test="${syspara == 'RegularDebitTransfer'}"><input type="hidden" name="po.signmd" value="03"/></c:when>
										</c:choose>
										<input type="hidden" name="po.systemcd" value="BEPS"/>
                					</td>
                					<td class="text_tablehead_b" align="right" >
				                   	支付交易组号
				                   	</td>
				                  	<td colspan="4">
				                   		<input type="text" style="width: 180px;" name="po.pmtgrpid"  id="pmtgrpid" maxlength="20" onblur="return startmethod('<%=path %>/regularDebitAction.do?method=sendMsgDebit&syspara=cxzfjyzh&pmtgrpid='+this.value,'0',this.value)"/>
				                  		<font color="#FF0000">*</font>
				                   	</td>
				                </tr>
				                <tr>
				                   	<td  class="text_tablehead_b" align="right" >
				                  	业务类型编码
				                  	</td>
				                  	<td >
				                   		<select name="po.pmttp" id="pmttp" style="width: 180px;">
				                   			<option value="F100">定期借记业务</option>
				                   		</select>
				                  
				                 </tr>
				                 <tr>
				                   <td  class="text_tablehead_b" align="right">
				                  	最迟回执天数
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.rcptltd" style="width: 180px;" id="rcptltd" maxlength="2" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	<font color="#FF0000">*</font>
				                  	</td>
				                 </tr>
				                 <tr></tr>
				                 <tr>
				                  	<td class="text_tablehead_b" width="2" rowspan="4"  align="center">
                						<span style="margin-left: 7px;">申</span>
										<span style="margin-left: 7px;">请</span>
										<span style="margin-left: 7px;">人</span>
										<span style="margin-left: 7px;">信</span>
										<span style="margin-left: 7px;">息</span>
                					</td>
                					<td class="text_tablehead_b" align="right">
				                  		证件类型
				                  	</td>
				                  	<td>
				                   		<input type="text" readonly="readonly" id="proposercerttp" style="width: 180px;"/>
				                  	</td>
                					<td  class="text_tablehead_b" align="right"  colspan="2">

				                		申请人证件号
				                	</td>
				                  	<td >
				                   		<input type="text" readonly="readonly" id="proposercertid" style="width: 180px;"/>
				                  	</td>
				                 </tr>
				                 <tr>
				                	 <td class="text_tablehead_b" align="right">
				                  		证件发行国家
				                  	</td>
				                  	<td>
				                   		<input type="text" readonly="readonly" id="proposercertissued" style="width: 180px;"/>
				                  	</td>
				                 	<td class="text_tablehead_b" align="right"  colspan="2">
				                   		申请人联系电话
				                   	</td>
				                  	<td>
				                   		<input type="text" readonly="readonly" id="proposertel" style="width: 180px;"/>
				                    </td>
				                 </tr>
				                 <tr>
				                  	<td  class="text_tablehead_b" align="right">
				                  		申请人客户号
				                  	</td>
				                  	<td >
				                   		<input type="text" readonly="readonly" id="proposercstmrid" style="width: 180px;"/>
				                  	</td>
				                  	<td class="text_tablehead_b" align="right"  colspan="2">
				                  		申请人账户类型
				                  	</td>
				                  	<td>
				                   		<select id="proposeraccttp" style="width: 180px;">
				                   			<option value="">请选择</option>
				                   			<option value="AT00">对公账户</option>
				                   			<option value="AT01">个人贷记卡账户</option>
				                   			<option value="AT02">个人借记卡</option>
				                   			<option value="AT03">存折</option>
				                   			<option value="AT04">其他</option>
				                   		</select>
				                  	</td>
				                  </tr>
				                  <tr>
				                  	<td class="text_tablehead_b" align="right">
				                  		申请人账户币种
				                  	</td>
				                  	<td colspan="4">
				                   		<input type="text" readonly="readonly" id="proposeracctccy" style="width: 180px;"/>
				                  	</td>
				                  	
				                  </tr>
				                 
				                   <tr></tr>
				                 <tr>
				                  	<td  width="2" rowspan="5"  width="2" class="text_tablehead_b" align="center">
                						<span style="margin-left: 7px;">收</span>
																<span style="margin-left: 7px;">款</span>
																<span style="margin-left: 7px;">人</span>
																<span style="margin-left: 7px;">信</span>
																<span style="margin-left: 7px;">息</span>
                					</td>
                					<td  class="text_tablehead_b" align="right">
				                		收款人账号
				                	</td>
				                  	<td >
				                   		<input type="text" name="po.cdtracct" style="width: 180px;" id="cdtracct" maxlength="32"/>
				                   		<font color="#FF0000">*</font>
				                  	</td>
				                  	<td  class="text_tablehead_b" align="right"  colspan="2">
				                  		收款人名称
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.cdtrnm" id="cdtrnm" style="width: 180px;" maxlength="60"/>
				                   		<font color="#FF0000">*</font>
				                  	</td>
				                 </tr>
				                  <tr>
				                  	<td class="text_tablehead_b" align="right">
				                  		收款行行号
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.cdtrbrnchid" id="cdtrbrnchid" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font>                  		
				                  	</td>
				                  	<td class="text_tablehead_b" align="right"  colspan="2">
				                  		收款行行名
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.cdtrbrnchnm" id="cdtrbrnchnm" style="width: 180px;" maxlength="60"/>
				                   		<font color="#FF0000">*</font>
				                    </td>
				                  </tr>
				                  <tr>
				                  	<td class="text_tablehead_b" align="right" width="140px">
				                  		收款人开户行行号
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.cdtrissuer" id="cdtrissuer" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font>
				                  	</td>
				                  	<td class="text_tablehead_b" align="right"  colspan="2" width="140px">
				                  		收款人开户行行名
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.cdtrissuernm" id="cdtrissuernm" style="width: 180px;" maxlength="60"/>
				                   	</td>
				                   </tr>
				                   <tr>
				                   <td class="text_tablehead_b" align="right">
				                  		收款清算行行号
				                  	</td>
				                  	<td colspan="4">
				                   		<input type="text" name="po.cdtrmmbid" id="cdtrmmbid" style="width: 180px;" maxlength="14"/>
				                   		<font color="#FF0000">*</font>	                   		
				                  	</td>
				                  </tr>
				                  <tr>
				                  	<td class="text_tablehead_b" align="right">收款人地址</td>
				                  	<td colspan="4">
				                   		<textarea name="po.cdtraddr" id="cdtraddr"  style="width: 180px;" 
																		rows="4" onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','address')"></textarea>
				                  	</td>
				                  </tr>
				                  <tr></tr>
				                 <tr>
				                 <td  rowspan="3"  width="2" class="text_tablehead_b" align="center">
																	<span style="margin-left: 7px;">金</span>
																	<span style="margin-left: 7px;">额</span>
																	<span style="margin-left: 7px;">信</span>
																	<span style="margin-left: 7px;">息</span>
																</td>
				                 	<td class="text_tablehead_b">
				                  		币种代码
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.currencycd" style="width: 180px;" id="currencycd" readonly="readonly" value="CNY"/>
				                  	<font color="#FF0000">*</font>
				                  	</td>
				                  	 	<td class="text_tablehead_b" align="right"  colspan="2">
				                  		总额
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.totalamt" style="width: 180px;" id="totalamt" maxlength="19" readonly="readonly"/>
				                  	</td>
				                 </tr>
				                 
				                  <tr>
				                  	<td class="text_tablehead_b">
				                  		收款金额
				                  	</td>
				                  	<td colspan="4">
				                   		<input type="text" id="amount" readonly="readonly" style="width: 180px;"/>
				                  	</td>
				                  </tr>
				                   <tr>
				                  	<td class="text_tablehead_b">
				                  		累计录入金额
				                  	</td>
				                  	<td>
				                   		<input type="text" id="aclmtamt" readonly="readonly" style="width: 180px;"/>
				                  	</td>
				                  	<td class="text_tablehead_b" align="right"  colspan="2">
				                  		累计录入笔数
				                  	</td>
				                  	<td>
				                   		<input type="text" id="nboftxs" readonly="readonly" style="width: 180px;"/>
				                  	</td>
				                  </tr>
				                  <tr></tr>
				                  <tr>
				                 <td  rowspan="4"  width="2" class="text_tablehead_b" align="center">
																	<span style="margin-left: 7px;">手</span>
																	<span style="margin-left: 7px;">续</span>
																	<span style="margin-left: 7px;">费</span>
																	<span style="margin-left: 7px;">信</span>
																	<span style="margin-left: 7px;">息</span>
																</td>
																</tr>
				                  <tr>
				                  	<td class="text_tablehead_b">
				                  		减免
				                  	</td>
				                  	<td colspan="4">
				                   		<select name="po.waive" id="waive" style="width: 180px;">
				                   			<option value="N">不减免</option>
				                   			<option value="Y">减免</option>
				                   		</select>
				                  	</td>
				                  </tr>
				                  <tr>
				                  	<td class="text_tablehead_b">
				                  		手续费
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.servicecharge" id="servicecharge" style="width: 180px;"
				                   		 maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
				                  	</td>
				                  	<td class="text_tablehead_b" align="right"  colspan="2">
				                  		邮电费
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.postage" id="postage" maxlength="19" style="width: 180px;"
				                   		onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
				                  	</td>
				                  </tr>
				                  <tr>
				                  	<td class="text_tablehead_b" align="right" >
				                  		异地加收
				                  	</td>
				                  	<td>
				                   		<input type="text" name="po.outstationcharge" id="outstationcharge" style="width: 180px;"
				                   		maxlength="19" onkeyup="fun_kd(this)" onblur="amountformat(this)"/>
				                  	</td>
				                  </tr>
				                 <tr>
				                 		 
															</tr>
								<tr></tr>
				               </table>
					       
	            		 </td>
	        		</tr>
	    		</table>
	    		<div align="center">
	    		<br />
				<span class="STYLE1">说明：红色*标注项为必填项</span>
				<br />
				<br />
				<input id="saveButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="ckeckwethornull();" />
				&nbsp;
				<input id="backButton" style="cursor: pointer" type="button" class="button" value="返  回" onclick="history.back();" />
				</div>
				
	    	</td>
	    	<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);"></td>
	  	</tr>
	</table>
	
	
	-->
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</html:form>
</body>
</html>
