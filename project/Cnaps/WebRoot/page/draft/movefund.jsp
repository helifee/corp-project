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

			function fmoney(s, n)//将数字转换成逗号分隔的样式,保留两位小数s:value,n:小数位数      
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
			//还原金额   
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
			
			
			
			//添加条件行

		</script>
	</head>
	<body>
		<form method="post"
			action="<%=path%>/transferOfTransitAction.do?method=sendMessage&signmd=02">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
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
						                  	<div  class="text_title"><span class="text_blue2">银行汇票资金移存</span></div>
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
																	系统号
																</td>
																<td>
																
																	<select   id="xth"  name="systemcd" title="系统号">
																		<option value="HVPS" selected="selected">
																			大额
																		</option>
																		
																		
																	</select>
																	<span  class="STYLE1">*</span>
																	</td>
																<td class="text_tablehead_b" >
																	优先级
																</td>
																<td>
																	<select  name="sttlmprty" id="yxj">
																		<option value="NORM">
																			一般
																		</option>
																		<option value="HIGH" selected="selected">
																			紧急
																		</option>
																		<option value="URGT">
																			特急
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																
															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	业务类型编码
																</td>
																<td>
																	<select name="pmttp" id="ywlxbmval" >
																		
                                                                       
																		<option value="A202" selected="selected">
																			银行汇票
																		</option>
																		
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	业务种类编码
																</td>
																<td >
																	<select name="pmtkd" id="select_input" >
																	<option value="02901" selected="selected">
																			银行汇票资金移存
																	  </option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	支付组号
															  </td>
																<td >
																	<input name="paymentno" id="" type="text"  readonly="readonly" value="${entity.paymentno }"
																		maxlength="19" title="支付组号" />
																
																	<span  class="STYLE1">*</span>
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
																		<select   name="certtype" id="zjlx">
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
																	<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	付款人证件号
																</td>
																<td >
																	<input name="appcertno" id="sgrzjh" type="text" size="19"
																		maxlength="32" title="付款人证件号" />
																		<span name="validate" dataName="appcertno" dataType="Empty" msg="付款人证件号不能为空！" class="STYLE1">*</span>
																</td>
													  </tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	证件发行国家
																</td>
																<td >
																	 <select  name="certcountry" title="证件发行国家" id="zjfxgj">
																		 <option value="CN">CN-中华人民共和国</option>
																  </select>
																		  <span  class="STYLE1">*</span>
															
																</td>

																<td class="text_tablehead_b" >
																	付款人联系电话
																</td>
																<td>
																	<input  name="appphone" id="sqrlxdh" type="text"
																		 maxlength="20" title="付款人联系电话" />
																		 <span  class="STYLE1">*</span>
																</td>
																</tr>
																
																
																<tr>
																<td class="text_tablehead_b" >
																	付款人客户号
																</td>
																<td >
																	 <input type="text"  maxlength="30" name="proposercstmrid" title="付款人客户号" id="sqrkhh">
																		  <span  class="STYLE1">*</span>
															
																</td>

																<td class="text_tablehead_b" >
																	付款人账户类型
																</td>
																<td>
																		 <select  name="proposeraccttp" title="付款人账户类型" id="sqrzhlx">
																		 <option value="AT00">对公账户</option>
																		  <option value="AT01">个人贷记卡账户</option>
																		   <option value="AT02">个人借记卡账户</option>
																		    <option value="AT03">存在</option>
																		     <option value="AT04">其他</option>
																		     
																		 </select>
																		 <span  class="STYLE1">*</span>
																</td>
																
																</tr>
																<tr>
																	
																<td class="text_tablehead_b"  >
																	付款人账户币种
																</td>
																<td >
																	 <input type="text"  name="proposeracctccy" title="付款人账户币种" id="zhbz" value="CNY">
																		
																		  <span  class="STYLE1">*</span>
															
																</td>
																</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款行行号
																</td>
																<td>
																	<input name="dbtrbrchid" id="fkhhh" type="text" readonly="readonly"
																		 title="付款行行号"  maxlength="12"  value="${bankInfo.bankcode }"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b">
																	付款行名称
																</td>
																<td>
																	<input name="dbtrbrnchnm" id="fkhmc" type="text" title="付款行名称" value="${bankInfo.participantname }"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人账号
																</td>
																<td>
																	<input name="dbtracctid" id="fkrzh" type="text"
																		 title="付款人账号" maxlength="32"
																		onKeyPress="actkeyPress()" />
																		 <span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	付款人名称
																</td>
																<td>
																	<input name="dbtrnm" id="fkrmc" type="text"
																		title="付款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人地址
																</td>
																<td colspan="3">
																	<input name="dbtraddr" id="fkrdz" class="text_tablehead_b_addr" 
																		 onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','fkrdz')"/>
																
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款人开户行行号
																</td>
																<td>
																	<input name="dbtrissr" id="fkrkhhhh" type="text" class="text_tablehead_b_c"
																		 title="付款人开户行行号" maxlength="12" value=""  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<input type="button" class="button"   value="搜索" onClick="selectBankInfoOfFkk()">
																		
																</td>
																<td class="text_tablehead_b">
																	付款人开户行名称
																</td>
																<td>

																	<input name="dbtrissrnm" id="fkrkhkmc" type="text" title="付款人开户行名称"
																		  maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
                                                  			</tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
																	付款清算行行号
																</td>
																<td>
																	<input name="dbtrmmbid" id="fkqshhh" type="text" readonly="readonly"
																		 title="付款清算行行号" maxlength="12" value="${bankInfo.directbankcode }"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
                                                  			</tr>
                                           		  </table>
                                             </div>
                                                  
                                                    <div class="table_content">
                                                   	<table>
	                                                  	
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">收款人信息</span></td>
	                                                      </tr>
                                                  			<tr>
																
																<td class="text_tablehead_b" >
																	收款行行号
																</td>
																<td>
																	<input name="cdtrbrchid" id="skhhh" type="text" class="text_tablehead_b_c"
																		 title="收款行行号" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<input type="button" class="button"  value="搜索" onClick="selectBankInfo()">
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	收款行名称
																</td>
																<td>
																	<input name="cdtracctnm" id="skhmc" type="text"
																		style="width: 180px;" title="收款人行名称" maxlength="60" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	收款人账号
																</td>
																<td>
																	<input name="cdtracctid" id="skrzh" type="text"
																		 title="收款人账号" maxlength="32"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	收款人名称
																</td>
																<td>
																	<input name="cdtrnm" id="skrmc" type="text"
																		title="收款人名称" maxlength="60"
																		onKeyPress="charPress()" />
																		<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	收款人地址
																</td>
																<td colspan="3">
																	<input type="text" class="text_tablehead_b_addr" name="cdtraddr" id="skrdz" 
																		onKeyPress="actkeyPress()" onKeyUp="limitLength(value,70,'提示：','skrdz')" />
																	
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	收款人开户行行号
																</td>
																<td>
																	<input name="cdtrissr" id="skhkhhhh" type="text" class="text_tablehead_b_c"
																		 title="收款行开户行行号" maxlength="12"  readonly="readonly"
																		onKeyPress="actkeyPress()" />
																	<input type="button" class="button"  value="搜索" onClick="selectBankInfoOfSkk()">	
																</td>
															
																<td class="text_tablehead_b">
																	收款人开户行名称
																</td>
																<td>
																	<input name="cdtrissrnm" id="skrkhhmc" type="text" readonly="readonly"
																		title="收款人开户行名称" maxlength="60"
																		onKeyPress="actkeyPress()" />
																</td>
															</tr>
															
																<tr>
																
																<td class="text_tablehead_b">
																	收款行清算行行号
																</td>
																<td>
																	<input name="cdtrmmbid" id="skhqshhh" type="text" readonly="readonly"
																		title="收款行清算行行号" maxlength="12" 
																		 onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
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
																
																<td class="text_tablehead_b" >
																	币种代码
																</td>
																<td>
																	<input name="currency" id="bzdm" type="text"
																		 title="币种代码"  value="CNY" readonly="readonly"
																		onKeyPress="actkeyPress()" />
																</td>
																<td class="text_tablehead_b" >
																	总额
																</td>
																<td >
																	<input name="allchange" id="ze" type="text" readonly="readonly"
																		 title="总额" maxlength="12"
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																<span  class="STYLE1">*</span>
																</td>
																
													  </tr>
																<tr>
																	<td class="text_tablehead_b" >
																		汇款金额
																	</td>
																	<td colspan="4">
																		<input name="ntryamt" id="hkje" type="text"
																			 title="汇款金额" maxlength="12"
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
	                                                      	<td colspan="4"><span class="text_tablehead">计费信息</span></td>
	                                                      </tr>
                                                    			<tr>
																
																<td class="text_tablehead_b"  >
																	本行户
																</td>
																<td >
																	<select   name="selfaccount" id="bhh" >
																		<option value="Y">
																			是
																		</option>
																		<option value="N">
																			否
																		</option>
																	</select>
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	减免
																</td>
																<td >
																
																	<input type="radio" class="text_tablehead_b_rad" name="waive" value="N" checked="checked" onClick="bhhfunction(this.value);">不减免
																	<input type="radio" class="text_tablehead_b_rad" name="waive" value="Y" onClick="bhhfunction(this.value);">减免
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																	手续费
															  </td>
																<td>
																	<input name="charge" id="sxf" type="text" 
																		title="手续费" maxlength="12" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />
																
																</td>
																<td class="text_tablehead_b" >
																	邮电费
																</td>
																<td>
																	<input name="postage" id="ydf" type="text"
																		title="邮电费" maxlength="12" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; jisuan();" />
																
																</td>
															</tr>
															<tr>
																
																<td class="text_tablehead_b" >
																	异地加收
																</td>
																<td colspan="4">
																	<input name="otherchange" id="ydjs" type="text" 
																		title="异地加收" maxlength="12" 
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
	                                                      	<td colspan="4"><span class="text_tablehead">汇票信息</span></td>
	                                                      </tr>
                                                    		<tr>
																<td class="text_tablehead_b" >
																	出票日期
																</td>
																<td>
																<input name="issuedt" id="cprq" class="Wdate" type="text"
																		readonly="readonly" title="出票日期" 
																		 onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	汇票密押
																</td>
																<td>
																<input name="billseal" id="hpmy"  type="text"
																		 title="汇票密押"  />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	汇票种类
																</td>
																<td>
																<input name="billtp" id="hpzl"  type="text"
																		 title="汇票种类" 
																		 />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	出票金额
																</td>
																<td>
																<input name="issueamt" id="cpje"  type="text"
																		 title="出票金额" 
																		 />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	汇票签发行行号
																</td>
																<td>
																<input name="issuerbk" id="hpqfhhh" type="text"
																		 title="汇票签发行行号" 
																		 />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	汇票申请人帐号
																</td>
																<td>
																<input name="issueracct" id="hpsqrzh"  type="text"
																		 title="汇票申请人帐号" />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															
															<tr>
																<td class="text_tablehead_b" >
																	汇票申请人名称
																</td>
																<td>
																<input name="issuernm" id="hpsqrmc"  type="text"
																		 title="汇票申请人名称"/>
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	票面记载的收款人名称
																</td>
																<td>
																<input name="rcvrnm" id="pjjzdskrmc"type="text"
																		title="票面记载的收款人名称"  />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	最后持票人开户行
																</td>
																<td>
																<input name="holderbk" id="zhcprkhh" type="text"
																		 title="最后持票人开户行"  />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	最后持票人账号
																</td>
																<td>
																<input name="holderacct" id="zhcprzh"  type="text"
																		 title="最后持票人账号"  />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	最后持票人名称
																</td>
																<td>
																<input name="holdernm" id="zhcprmc"  type="text"
																		 title="最后持票人名称"  />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	多余金额
																</td>
																<td>
																<input name="rmnngamt" id="dyje"  type="text"
																		 title="多余金额"  />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	实际结算金额
																</td>
																<td>
																<input name="actntryamt" id="sjjsje"  type="text"
																		 title="实际结算金额"  />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	提示付款日期
																</td>
																<td>
																<input name="paydt" id="tsfkrq" class="Wdate" type="text"
																		readonly="readonly" title="提示付款日期" 
																		 onclick="WdatePicker()" />
																		<span  class="STYLE1">*</span>
																</td>

															</tr>
															
															<tr>
																<td class="text_tablehead_b" >
																	现金汇票兑付行
																</td>
																<td>
																<input name="cashpaybrnch" id="xjhpdfh"  type="text"
																		 title="现金汇票兑付行" />
																		<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	端到端标识号
																</td>
																<td>
																	<input name="endtoendid" id="dddbsh" type="text" 
																		maxlength="19" title="端到端标识号"  />
																
																</td>
															</tr>
															
															
															
                                               		  </table>
                                                   </div>
                                                    
                                                  	
                                                  	 
                                                   	 <div class="table_content">
                                                   	<table>
	                                                  	
	                                                 	  <tr>
	                                                      	<td colspan="4"><span class="text_tablehead">附言信息</span></td>
	                                                      </tr>
                                                    		<tr>
																<td class="text_tablehead_b" >
																	附言
																</td>
																<td colspan="3">
																	<textarea name="remarkinfo" id="fy" 
																		rows="2" cols="60" onKeyPress="charPress()" onKeyUp="limitLength(value,135,'提示：','fy')"></textarea>
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
																		class="button" value="保  存" onClick="commitForm();" />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    			<%-- 
                                                    				<input name="backButton" style="cursor: pointer" type="button"
											class="button" value="返  回" onclick="history.back();" />
											--%>
                                                    			</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
                                                     <div class="table_content" align="center">
										    		
													<span class="STYLE1">说明：红色*标注项为必填项</span>
													
													</div>
                                                    
										   </td>
										 </tr>
															<tr id="A0000" style="display: none;">
															<td class="text_tablehead_b" >
																	端到端标识号
															  </td>
																<td>
																	<input name="endtoendid" id="dddbsh" type="text" 
																		maxlength="19" title="端到端标识号"  />
																
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
