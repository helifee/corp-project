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
 
	 
	 定期借记转账 
	 
</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	<script type='text/javascript' src='<%=path%>/dwr/interface/DebitService.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	  <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
 <script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script> 
 <script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
    
<style type="text/css">
input {width: 150px;}
</style>
 
<script language="javascript">
function getpmtkd(pmtkd ){
	  if( pmtkd=="00100"){
		document.getElementById("pmtkd").value="电费";
		}	
		  if( pmtkd=="00200"){
		document.getElementById("pmtkd").value="水暖费";
		}
		  if( pmtkd=="00300"){
		document.getElementById("pmtkd").value="煤气费";
		}
		  if( pmtkd=="00400"){
		document.getElementById("pmtkd").value="电话费";
		}	
		  if( pmtkd=="00500"){
		document.getElementById("pmtkd").value="通讯费";
		}	
		  if( pmtkd=="00600"){
		document.getElementById("pmtkd").value="保险费";
		}	
		 if( pmtkd=="00700"){
		document.getElementById("pmtkd").value="房屋管理费";
		}
		 if( pmtkd=="00800"){
		document.getElementById("pmtkd").value="代理服务费";
		}
		 if( pmtkd=="00900"){
		document.getElementById("pmtkd").value="学教费";
		}
		 if( pmtkd=="01000"){
		document.getElementById("pmtkd").value="有线电视费";
		}	
		 if( pmtkd=="01100"){
		document.getElementById("pmtkd").value="企业管理费用";
		}	
		 if( pmtkd=="09001"){
		document.getElementById("pmtkd").value="其他";
		}	
}

		function queryBypmtgrpid(paymentGroupNum){
	      clrAmt();	
                 	if(isNull(trim(paymentGroupNum))){
					 return;
				   }
		     
		         
			  	 PubService.queryRegularDebit(paymentGroupNum,function(obj){
			  	   
				   if(obj==null||obj.pmtgrpid==null){
				  alert("支付交易组号不存在，或已失效，未查到相关数据");
				  document.getElementById("pmtgrpid").value="";       
					document.getElementById("proposercertid").value="";   
					document.getElementById("proposertel").value="";      
					document.getElementById("proposercstmrid").value="";  
					document.getElementById("proposercerttp").value="";   
					  document.getElementById("proposercerttp1").value="";
					document.getElementById("cdtracct").value="";         
					document.getElementById("cdtrnm").value="";           
					                                                      
					document.getElementById("cdtrbrnchid").value="";      
					document.getElementById("cdtrbrnchnm").value="";      
					document.getElementById("cdtrissuer").value="";       
					document.getElementById("cdtrissuernm").value="";     
					document.getElementById("cdtrmmbid").value="";        
					 document.getElementById("cdtraddr").value="";        
					document.getElementById("nboftxs").value="";          
					document.getElementById("aclmtamt").value="";         
				  
				   document.getElementById("pmtgrpid").focus();
				   return;
				  }else{
				
				  document.getElementById("pmtgrpid").value=obj.pmtgrpid==null?"": obj.pmtgrpid;
				  document.getElementById("proposercertid").value=obj.proposercertid==null?"": obj.proposercertid;
				  document.getElementById("proposertel").value=obj.proposertel==null?"": obj.proposertel;
				  document.getElementById("proposercstmrid").value=obj.proposercstmrid==null?"": obj.proposercstmrid;
				  document.getElementById("proposercerttp").value=obj.proposercerttp==null?"": obj.proposercerttp;//证件类型
				    document.getElementById("proposercerttp1").value=obj.proposercerttp==null?"": obj.proposercerttp;//证件类型
				  document.getElementById("cdtracct").value=obj.cdtracct==null?"": obj.cdtracct;
				  document.getElementById("cdtrnm").value=obj.cdtrnm==null?"": obj.cdtrnm;
				  
				  document.getElementById("cdtrbrnchid").value=obj.cdtrbrnchid==null?"": obj.cdtrbrnchid;
				  document.getElementById("cdtrbrnchnm").value=obj.cdtrbrnchnm==null?"": obj.cdtrbrnchnm;
				  document.getElementById("cdtrissuer").value=obj.cdtrissuer==null?"": obj.cdtrissuer;
				  document.getElementById("cdtrissuernm").value=obj.cdtrissuernm==null?"": obj.cdtrissuernm;
				  document.getElementById("cdtrmmbid").value=obj.cdtrmmbid==null?"": obj.cdtrmmbid;
				   document.getElementById("cdtraddr").value=obj.cdtraddr==null?"": obj.cdtraddr;
				  document.getElementById("nboftxs").value=obj.nboftxs==null?"": obj.nboftxs;
				  document.getElementById("aclmtamt").value=obj.aclmtamt==null?"": fmoney(obj.aclmtamt);
				  
				  getpmtkd(obj.pmtkd);
				  if(obj.pmttp=="F100"){
		document.getElementById("pmttp").value="普通定期借记业务";
		}	
		  	  if(obj.pmttp=="E102"){
		document.getElementById("pmttp").value="定期代收";
		}	
				  if(obj.proposeraccttp=="AT00"){
		document.getElementById("proposeraccttp").value="对公账户";
		}	
		
			if(obj.proposeraccttp=="AT01"){
		document.getElementById("proposeraccttp").value="个人贷记卡账户";
		}	
			if(obj.proposeraccttp=="AT02"){
		document.getElementById("proposeraccttp").value="个人借记卡账户";
		}	
			if(obj.proposeraccttp=="AT03"){
		document.getElementById("proposeraccttp").value="存在";
		}
			if(obj.proposeraccttp=="AT04"){
		document.getElementById("proposeraccttp").value="其他";
		}		
				  }
				  }
				  )
			  			
		

			}
	//计算总额
	 	function jisuan(){
				var sxf = $("#servicecharge").val();
				var ydf = $("#postage").val();
				var ydjs = $("#outstationcharge").val();
				var hkje = $("#amount").val();//汇款金额
			 
				document.getElementById("totalamt").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje), 2);
			}
			 
		  function zcx(val){
				if(val.value=='Y'){
					$("#servicecharge").val("");//手续费
					$("#postage").val("");//邮电费
					$("#outstationcharge").val("");//异地加收
					$("#outstationcharge").attr("readonly",true);
					$("#postage").attr("readonly",true);
					$("#servicecharge").attr("readonly",true);
					jisuan();
				}else{
				 
					$("#servicecharge").attr("readonly",false);
					$("#postage").attr("readonly",false);
					$("#outstationcharge").attr("readonly",false);
				}
			}	 
			 

	 	function commitForm(){
	 	
	 	
			   var msg = "@";
					var pmtgrpid = document.getElementById("pmtgrpid");//支付交易组号
					var rcptltd = document.getElementById("rcptltd");//最迟回执天数
					var amount = document.getElementById("amount");//汇款金额
					var aclmtamt = document.getElementById("aclmtamt");//明细金额
					var totalamt = document.getElementById("totalamt");//总额
				 
				 var nboftxs = document.getElementById("nboftxs");//明细笔数
				 var pmttp = document.getElementById("pmttp");//业务类型
				  var pmtkd = document.getElementById("pmtkd");//业务种类
				  var cdtracct = document.getElementById("cdtracct");//收款人账号
				    var cdtrnm = document.getElementById("cdtrnm");//收款人名称
				     var cdtrissuer = document.getElementById("cdtrissuer");//收款人开户行行号
				    var cdtrissuernm = document.getElementById("cdtrissuernm");//收款人开户行名称
                  
                 	if(isNull(trim(pmtgrpid.value))){
					msg += pmtgrpid.title+"不能为空！ @";
				   }
				   if(isNull(trim(rcptltd.value))){
					msg += rcptltd.title+"不能为空！ @";
				   }
				   if(isNull(trim(pmttp.value))){
					msg += pmttp.title+"不能为空！ @";
				   }
				    if(isNull(trim(pmtkd.value))){
					msg += pmtkd.title+"不能为空！ @";
				   }
				   if(isNull(trim(cdtracct.value))){
					msg += cdtracct.title+"不能为空！ @";
				   }
				   if(isNull(trim(cdtrnm.value))){
					msg += cdtrnm.title+"不能为空！ @";
				   }
				   if(isNull(trim(cdtrissuer.value))){
					msg += cdtrissuer.title+"不能为空！ @";
				   }
				   if(isNull(trim(cdtrissuernm.value))){
					msg += cdtrissuernm.title+"不能为空！ @";
				   }
				   
				   
				   
				   
				   
				   
                   	if(isNull(trim(aclmtamt.value))){
					msg += aclmtamt.title+"不能为空！@";
				   }
			 	   if(isNull(trim(nboftxs.value))){
					msg += nboftxs.title+"不能为空！  @";
				   }
				
				
				var boo = msgSplit(msg);
				 
		 
				 
				if(boo){
			    	if(aclmtamt.value==amount.value){
				    	var servicecharge = document.getElementById("servicecharge");
						  var postage = document.getElementById("postage");
						  var outstationcharge = document.getElementById("outstationcharge");
					    document.getElementById("amount").value=rmoney(amount.value);//汇款金额
					    document.getElementById("servicecharge").value=rmoney(servicecharge.value);
					    document.getElementById("postage").value=rmoney(postage.value);
					    document.getElementById("outstationcharge").value=rmoney(outstationcharge.value);
					     document.getElementById("totalamt").value=rmoney(totalamt.value);
					     document.getElementById("aclmtamt").value=rmoney(aclmtamt.value);
					   	
						document.forms[0].submit();
					}else{
					  alert("收款金额与累计录入金额不一致");
					}
				}
		 }
	//增加手续费查询
		function addchange(paymentGroupNum){
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt").toString()%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt").toString()%>";
				 var obj ={
				 	hkje:document.getElementById('amount'),
				 	transno:'7125',
				 	pmttp:document.getElementById('pmttp'),
				    sxf : document.getElementById('servicecharge'),
				    ydf : document.getElementById('postage'),
				    ydjs : document.getElementById('outstationcharge'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('totalamt'),
				    xth: document.getElementById('xth'),
				    xth1: document.getElementById('xth1'),
				  	bepssxf: document.getElementById("bepssxf"),
				  	bepsydf: document.getElementById("bepsydf"),
				  	bepsydjs: document.getElementById("bepsydjs"),
				  	hvpssxf: document.getElementById("hvpssxf"),
				  	hvpsydf: document.getElementById("hvpsydf"),
				  	hvpsydjs: document.getElementById("hvpsydjs"),
				  	bepsgbf: document.getElementById("bepsgbf"),
				  	hvpsgbf: document.getElementById("hvpsgbf"),
				  	waiven: document.getElementById("waiven")
				  };
				 calcharge(url,beginamt,endamt,obj);
			}	 
		 function clrAmt(){
				document.getElementById('amount').value="";
				document.getElementById('servicecharge').value="0.00";
				document.getElementById('postage').value="0.00";
				document.getElementById('outstationcharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalamt').value="";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
		 function clrAmt0(){
				document.getElementById('servicecharge').value="0.00";
				document.getElementById('postage').value="0.00";
				document.getElementById('outstationcharge').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalamt').value=document.getElementById('amount').value;
			}
</script>
 
</head>
<body>
 
<!--   
<html     form method="post" action="/regularDebitAction.do?method=sendMsgcreatedetails&syspara=input">-->

<html:form method="post" action="/RegularDebitTurnAction.do?method=sendturn" > 
	<input id="business_name" type="hidden" value="RegularDebitLdeger">
	<input type="hidden" name="token" value="${token}" />
	<input id="repeatmark" type="hidden" value="0">
	<input type="hidden" name="po.signmd" value="03"/> 
	<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="bepsgbf" name="bepsgbf" type="hidden" maxlength="19" />
			<input  id="hvpsgbf" name="hvpsgbf" type="hidden" maxlength="19" />
									  
	
	
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
						       
								 定期借记转账 
						 
						                  	</span></div>
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
																	支付交易组号
																</td>
																<td>	
													<input type="text" style="width: 180px;" name="po.pmtgrpid"  id="pmtgrpid" maxlength="20" title="支付交易组号" onblur="queryBypmtgrpid(this.value)"/>																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																业务类型编码
																</td>
																<td >
																<input type="text" style="width: 180px;" name="po.pmttp"  id="pmttp" maxlength="20" readonly="readonly" title="业务类型编码" />																	<span  class="STYLE1">*</span>
													
														
																</td>
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	最迟回执天数
																</td>
																<td >
																		<input type="text" name="po.rcptltd" style="width: 180px;" title="最迟回执天数"  id="rcptltd" maxlength="2" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
				                  	<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	<!--端到端标识号-->业务种类编码
																</td>
																<td >
																<input type="text" style="width: 180px;" name="po.pmtkd"  id="pmtkd" maxlength="20" readonly="readonly" title="业务种类编码" />																	<span  class="STYLE1">*</span>
													
														
																</td>
																
															</tr>
															</table>
                                                 </div>
                                                  
                                                   <div class="table_content">
                                                 	<table>
                                                 	 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">付款人信息</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	证件类型
																</td>
																<td>
																<input type="hidden"   name="po.proposercerttp" id="proposercerttp">
																<select  id="proposercerttp1" disabled="disabled">
																		<option value="">
																			请选择
																		</option>
																		<option value="01">
																			身份证
																		</option>
																		<option value="02">
																			军官证
																		</option>
																		<option value="03">
																			学生证
																		</option>
																	</select>
																</td>
															
																<td class="text_tablehead_b" >
																	证件号
																</td>
																<td >
																	<input type="text" readonly="readonly" id="proposercertid"   title="申请人证件号"  style="width: 180px;"/>	</td>
															</tr>
																<tr>
																<td class="text_tablehead_b" >
																	联系电话
																</td>
																<td>
																	<input type="text" readonly="readonly" id="proposertel" title="申请人联系电话"  style="width: 180px;"/>
																</td>
																<td class="text_tablehead_b" >
																	客户号
																</td>
																<td >
																	<input type="text" readonly="readonly" id="proposercstmrid" title="申请人客户号" style="width: 180px;"/>
																</td>
																</tr>
																
																
																<tr>
																

																<td class="text_tablehead_b" >
																	账户类型
																</td>
																<td>
																<input type="text"  maxlength="30" name="po.proposeraccttp" title="申请人账户类型"  readonly="readonly" id="proposerAcctTp" style="width: 180px;">
														
																</td>
																
																</tr>
																
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	收款人账号
																</td>
																<td>
																		<input type="text" name="po.cdtracct" style="width: 180px;" id="cdtracct"  title="收款人账号"  readonly="readonly"  maxlength="32"/>
				                   		<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b">
																	收款人名称
																</td>
																<td>
																	<input type="text" name="po.cdtrnm" id="cdtrnm" style="width: 180px;" title="收款人名称"  readonly="readonly"  maxlength="60"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	  		收款人开户行行号
																</td>
																<td >
																		<input type="text" name="po.cdtrissuer" id="cdtrissuer" style="width: 180px;" title="收款人开户行行号" readonly="readonly"  maxlength="14"/>
				                   		<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	收款人开户行行名
																</td>
																<td>
																	<input type="text" name="po.cdtrissuernm" id="cdtrissuernm" title="收款人开户行行名" style="width: 180px;" readonly="readonly" maxlength="60"/><font color="#FF0000">*</font>
				               
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	收款人地址
																</td>
																<td colspan="4">
																
																
																	<input type="text" name="po.cdtraddr" id="cdtraddr" style="width: 480px;" title="收款人地址"   readonly="readonly" maxlength="14"/>
				                   	
																	</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	收款行行号
																</td>
																<td>
																	<input type="text" name="po.cdtrbrnchid" id="cdtrbrnchid" style="width: 180px;" title="收款行行号" readonly="readonly" maxlength="14"/>
				                   		<font color="#FF0000">*</font> 
																</td>
																<td class="text_tablehead_b" >
																		收款行行名
																</td>
																<td>
																	<input type="text" name="po.cdtrbrnchnm" id="cdtrbrnchnm" style="width: 180px;" title="收款行行名" readonly="readonly" maxlength="60"/>
				                   		<font color="#FF0000">*</font>
																</td>
                                                  			</tr>
                                                  			
                                                  			<tr>
                                                  				
																<td>

																	<input type="hidden" name="po.cdtrmmbid" id="cdtrmmbid" style="width: 180px;" title="收款清算行行号"   readonly="readonly" maxlength="14"/>
				                   		
																</td>
                                                  			</tr>
                                                  			
                                                  		</table>
                                                </div>
                                                  
                                                    
                                                    <div class="table_content">
                                                  		<table>
                                                  		<tr>
                                                      	<td colspan="4"><span class="text_tablehead">金额信息</span></td>
                                                      </tr>
                                                  			<tr>
																<td class="text_tablehead_b" align="right">
																明细笔数
																</td>
																<td>
																 
																	
																	<input type="text" id="nboftxs" readonly="readonly" style="width: 180px;" title="明细笔数"  /><font color="#FF0000">*</font>
																<td class="text_tablehead_b" align="right" >
																	累计录入金额
																</td>
																<td>
															<input type="text" id="aclmtamt" readonly="readonly" style="width: 180px;" title="累计录入金额"  /><font color="#FF0000">*</font>
															</tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	币种代码
																</td>
																<td>
																		<input type="text" name="po.currencycd" style="width: 180px;" id="currencycd"   title="币种代码" readonly="readonly" value="CNY"/>
				                  	<font color="#FF0000">*</font>
																</td>
																<td class="text_tablehead_b" >
																	总额
																</td>
																<td >
																		<input type="text" name="po.totalamt" style="width: 180px;" id="totalamt" title="总额" maxlength="19" readonly="readonly" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" /><font color="#FF0000">*</font>
				                
																</td>
																
																</tr>
																<tr>
																	<td class="text_tablehead_b" >
																		汇款金额
																	</td>
																	<td colspan="4">
																	<input type="text" id="amount"  name="po.amount" title="汇款金额"  style="width: 180px;" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';addchange(); "/><font color="#FF0000">*</font>
																	</td>
																	
																</tr>
                                                  		</table>
                                                  	</div>
                                                   
                                                    <div class="table_content">
                                                    		<table>
                                                    					 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">计费/渠道信息</span></td>
                                                      </tr>
                                                    			<tr>	 
																<td class="text_tablehead_b" >
																	收取费用
																</td>
																<td >
																	<input type="radio" class="text_tablehead_b_rad"  name="po.waive" id="waivey" value="Y" checked="checked" onclick="addchange('this.value');">收取
																	<input type="radio"  class="text_tablehead_b_rad" name="po.waive" id="waiven" value="N"  onclick="clrAmt0()">不收取
																</td>
															</tr>	
															<tr>
															<td class="text_tablehead_b" >
																	手续费
																</td>
																<td>
																		<input type="text" name="po.servicecharge" id="servicecharge" style="width: 180px;"  title="手续费" 
				                   		 maxlength="19" onKeyPress="amountPress()" readonly="readonly"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; "/>
				                 
																</td>
																<td class="text_tablehead_b" >
																	渠道信息
																</td>
																<td>
																	<input name="systemcd" id="xth" type="hidden" title="系统号" maxlength="12" value=""/> 
																	<select   id="xth1"  name="systemcd1" title="系统号" disabled="disabled">
																	<option value="">
																		</option>
																		<option value="HVPS">
																			大额
																		</option>
																		<option value="BEPS">
																			小额
																		</option>
																	</select>
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	邮电费
																</td>
																<td>
																	<input type="text" name="po.postage" id="postage" maxlength="19" style="width: 180px;"  title="邮电费"
				                   		onKeyPress="amountPress()" readonly="readonly"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; "/>
																</td>
																<td class="text_tablehead_b" >
																	异地加收
																</td>
																<td  >
																	<input type="text" name="po.outstationcharge" id="outstationcharge" style="width: 180px;" title="异地加收"
				                   		maxlength="19" onKeyPress="amountPress()" readonly="readonly"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; "/>
																</td>
																</tr>
																<tr>
																<td class="text_tablehead_b" >
																	工本费
																</td>
																<td  >
																	<input name="po.counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="工本费" maxlength="12" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																
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
                                                    			<span class="STYLE1">说明：红色*标注项为必填项</span>
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td>
                                                    		</tr>
                                                    		<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="保  存" onclick="commitForm();" />
																	<input name="backButton" style="cursor: pointer" type="reset"
											class="button" value="重  置"  />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    	 
                                                    			</td>
                                                    		</tr>
                                                    	</table>
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

 
		  
		  
	  
		  
		  
		  
		    

	 	
			
			
			
			
			
			
			
			
			
			
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	  
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</html:form>
</body>
</html>
