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
		<title>银行本票现金签发</title>

		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"	type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"	src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript"	src="<%=path%>/js/common/jquery-1.3.2.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path%>/js/systemManager/showeditpanel.js"></script>
		 <script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	    <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript" src="<%=path%>/js/common/checkIdCardNo.js"></script>

		<script language="javascript">

		
		
			 	function zcx(val){
				if(val.value=='Y'){
					$("#sxf").val("");//手续费
					//$("#postCharge").val("");//邮电费
					//$("#otherPlaceCharge").val("");//异地加收
					$("#sxf").attr("readonly",true);
					//$("#postCharge").attr("readonly",true);
					//$("#otherPlaceCharge").attr("readonly",true);
					jisuan();
				}else{
					$("#sxf").attr("readonly",false);
					//$("#postCharge").attr("readonly",false);
					///$("#otherPlaceCharge").attr("readonly",false);
				}
			}
 
			function jisuan(){
				var sxf = $("#sxf").val();
			
				var hkje = $("#moneyNum").val();//汇款金额
			 
				document.getElementById("totalMoney").value = fmoney(rmoney(sxf)+rmoney(hkje), 2);
			}
			function commitForm(){
				
			   var msg = "@";
			     var honourno = document.getElementById("honourno");//本票号码
			      var billseal=document.getElementById("billseal");//密押
					 var password = document.getElementById("password");//冠字码
					  var certnum = document.getElementById("certnum");//证件号
					    var proposerNm= document.getElementById("proposerNm");//申请人名称
					    var phone= document.getElementById("phone");//申请人名称联系电话
					     var name = document.getElementById("name");//收款人名称
					      var moneyNum = document.getElementById("moneyNum");//出票金额
					 var paymentGroup = document.getElementById("paymentGrouppo");
					
					
				                   
                     var totalMoney = document.getElementById("totalMoney");
                    
                     
                     if(isNull(trim(honourno.value))){
					msg += honourno.title+"不能为空！@";
				    }
                      if(isNull(trim(billseal.value))){
					msg += billseal.title+"不能为空！@";
				    }
				    if(isNull(trim(password.value))){
					msg += password.title+"不能为空！@";
				    }
				    if(isNull(trim(certnum.value))){
					msg += certnum.title+"不能为空！@";
				    }
                   if(isNull(trim(proposerNm.value))){
					msg += proposerNm.title+"不能为空！@";
				    }
				     if(isNull(trim(phone.value))){
					msg += phone.title+"不能为空！@";
				    }
					if(isNull(trim(name.value))){
						msg += name.title+"不能为空！@";
				    }
				    if(isNull(trim(moneyNum.value))){
					msg += moneyNum.title+"不能为空！@";
				    }
					if(isNull(trim(paymentGroup.value))){
					msg += paymentGroup.title+"不能为空！@";
				    }
				    //if(isNull(trim(receAcount.value))){
					//msg += receAcount.title+"不能为空！@";
				   // }
					
					
					if(isNull(trim(totalMoney.value))){
					msg += totalMoney.title+"不能为空！@";
				    }
				   var boo = msgSplit(msg);
		      if(boo){
		      	 document.getElementById("totalMoney").value=rmoney(document.getElementById("totalMoney").value);
				  document.getElementById("moneyNum").value=rmoney(document.getElementById("moneyNum").value);//汇款金额
				  document.getElementById("sxf").value=rmoney(document.getElementById("sxf").value );
		      
			      	if(document.getElementById("waiven").checked!=""){
						open3("<%=request.getContextPath()%>");
					}
					else{
						document.forms[0].submit();
					}
				}
		 }
		 
		 //增加手续费查询
			function addchange(paymentGroupNum){
			
				var url ="<%=request.getContextPath()%>";
				var beginamt = "<%=request.getSession().getAttribute("beginamt")%>";
 				var endamt = "<%=request.getSession().getAttribute("endamt")%>";
				 var obj ={
				 	hkje:document.getElementById('moneyNum'),
				 	pmttp:document.getElementById('pmttp'),
				 	transno:'7123',
				    sxf : document.getElementById('sxf'),
				    ydf : document.getElementById('ydf'),
				    ydjs : document.getElementById('ydjs'),
				    gbf: document.getElementById('counterfoil'),
				    ze : document.getElementById('totalMoney'),
				    yxj:document.getElementById('yxj'),
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
				  if(obj.hkje.value==""||obj.hkje.value=="0.00"){
				  	clrAmt();
				  }else{
					calcharge(url,beginamt,endamt,obj);				  
				  }
			}
		 function clrAmt(){
				document.getElementById('moneyNum').value="";
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('ze').value="";
				document.getElementById("xth").value="";
				document.getElementById("xth1").value="";
			}
			function clrAmt0(){
				document.getElementById('sxf').value="0.00";
				document.getElementById('ydf').value="0.00";
				document.getElementById('ydjs').value="0.00";
				document.getElementById('counterfoil').value="0.00";
				document.getElementById('totalMoney').value=document.getElementById('moneyNum').value;
			}
		 
		 
		</script>


		<SCRIPT language="javaScript"><!--
  function sendDate(){

  	send_request("<%=path%>/transfer/RealTimeCreditAction.do?method=paymentGroupNumAjax");
  	  }
    var http_request = false;
  function send_request(url) {//初始化、指定处理函数、发送请求的函数
   http_request = false;
   if(window.XMLHttpRequest) { 
　　http_request = new XMLHttpRequest();
　　if (http_request.overrideMimeType) {//设置MiME类别
 　　http_request.overrideMimeType('text/xml');
　　}
   }
   else if (window.ActiveXObject) { // IE浏览器
　　try {
 　　http_request = new ActiveXObject("Msxml2.XMLHTTP");
　　} catch (e) {
 　　try {
  　　http_request = new ActiveXObject("Microsoft.XMLHTTP");
 　　} catch (e) {}
　　}
   }
   if (!http_request) { // 异常，创建对象实例失败
　　window.alert("不能创建XMLHttpRequest对象实例.");
　　return false;
   }
   http_request.onreadystatechange = processRequest;
   // 确定发送请求的方式和URL以及是否同步执行下段代码
   http_request.open("GET", url, true);
   http_request.send(null);
  }
  // 处理返回信息的函数
 　　function processRequest() {
     　　if (http_request.readyState == 4) { // 判断对象状态
         　　if (http_request.status == 200) { // 信息已经成功返回，开始处理信息
         //默认返回01，也就是错误信息，到时注掉就可以
                        if(http_request.responseText=='01'){
	                alert("获取支付交易组号失败，请刷新页面重新获取");
	             return false;
	               }
                      else{
	                 
		                
		                  document.form1.paymentGrouppo.value=http_request.responseText;
	           
		               
	             
	                }
         　　   } else {
                   alert(http_request.status);
                   document.form1.sss.disabled=false;
             　　     alert("您所请求的页面有异常。");
         　　  }
     　　}
 　　}
      --></script>
</head>
	<body onload="sendDate()">
		<form  name="form1" method="post"
			action="<%=path%>/cashierAction.do?method=sendMessage&type=01">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<input  id="hvpssxf" name="hvpssxf" type="hidden"  maxlength="19" />
			<input  id="hvpsydf" name="hvpsydf" type="hidden"  maxlength="19"  />
			<input  id="hvpsydjs" name="hvpsydjs" type="hidden" maxlength="19" />
			<input  id="bepssxf" name="bepssxf" type="hidden"  maxlength="19" />
			<input  id="bepsydf" name="bepsydf" type="hidden"  maxlength="19"  />
			<input  id="bepsydjs" name="bepsydjs" type="hidden" maxlength="19" />
			<input  id="bepsgbf" name="bepsgbf" type="hidden" maxlength="19" />
			<input  id="hvpsgbf" name="hvpsgbf" type="hidden" maxlength="19" />
			<!-- 防止重复提交 -->
			<input id="cardcrash" name="cardcrash" type="hidden" value="crash">
		  <input id="contrperson" name="contrperson" type="hidden" >
		  <input id="pmttp" name="pmttp" type="hidden" value="D203" >
		  
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
						                  	<div  class="text_title"><span class="text_blue2">银行本票现金签发</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                             <div class="table_body">
                                          <div class="table_content">
															<table>

																
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">基本信息</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		本票流水号
																	</td>
																	<td>
																		<input name="po.paymentGrouppo" id="paymentGrouppo"
																			type="text" readonly="readonly" style="width: 180px;"
																			title="本票流水号" maxlength="22"  />
																		<span class="STYLE1"> *</span>

																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		本票种类
																	</td>
																	<td>
																		<select name="po.businessSizeCode"
																			id="businessSizeCode" style="width: 180px;"
																			title="本票种类">
																			<option value="1" selected="selected">
																				现金本票
																			</option></select>
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		本票号码
																	</td>
																	<td>
																		<input style="width: 180px;" name="po.honourno" maxlength="8"
																			id="honourno" type="text"  title="本票号码" />
																		<span class="STYLE1"> *</span>
																	</td>
																	
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		密押
																	</td>
																	<td>
																	
																		<input style="width: 180px;" name="po.billseal"
																			id="billseal" type="text" size="20"
																			maxlength="20" title="密押"  />
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		本票冠字码
																	</td>
																	<td>
																		<input style="width: 180px;" name="po.password"
																			id="password" type="text"  maxlength="4"
																			 title="本票冠字码" />
																		<span class="STYLE1">*</span>
																	</td>
																	
																</tr>




															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">付款人信息</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		证件类型
																	</td>
																	<td>
																		<select name="po.certsize" id="certsize">
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
																	<td class="text_tablehead_b">
																		证件号
																	</td>
																	<td>
																		<input name="po.certnum" id="certnum" type="text" onblur="checkIdCardNo(this.value,'certnum')"
																			size="19" maxlength="32" title="申请人证件号" /><span class="STYLE1">*</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		申请人名称
																	</td>
																	<td>
																		<input name="po.proposerNm" id="proposerNm" type="text"
																			title="申请人名称" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
																		<input name="po.payBankName" id="fkhmc" type="hidden"
																			title="付款行名称" value="${bankInfo.participantname }"/>

																<input type="hidden" name="po.payBankNum" id="fkhhh"  title="付款行行号" 
																			value="${bankInfo.bankcode }"/>
																	</td>
																	<td class="text_tablehead_b">
																		联系人电话
																	</td>
																	<td>
																		<input name="po.phone" id="phone" type="text"
																			maxlength="20" title="申请人联系电话" /><span class="STYLE1">*</span>

																	</td>
																</tr>
																
																
        															<!--	<tr>
																	 <td class="text_tablehead_b">
																		付款行行号
																	</td>
																	<td>
																		<input name="po.payBankNum" id="fkhhh" type="text"
																			readonly="readonly" title="付款行行号" maxlength="12"
																			value="${bankInfo.bankcode }"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		付款行名称
																	</td>
																	<td>
																		<input name="po.payBankName" id="fkhmc" type="text"
																			title="付款行名称" value="${bankInfo.participantname }"
																			maxlength="60" readonly="readonly"
																			onKeyPress="actkeyPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>  -->
															</table>
														</div>
														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">收款人信息</span>
																	</td>
																</tr>


																<tr>
																	<td class="text_tablehead_b">
																		收款人名称
																	</td>
																	<td>
																		<input name="po.name" id="name" type="text"
																			title="收款人名称" maxlength="60" onKeyPress="charPress()" />
																		<span class="STYLE1">*</span>
																	</td>
																</tr>


															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">金额信息</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		币种代码
																	</td>
																	<td>
																		<input name="po.moneyClassCode" id="moneyClassCode"
																			type="text" title="币种代码" value="CNY"
																			readonly="readonly" onKeyPress="actkeyPress()" />
																	</td>
																	<td class="text_tablehead_b">
																		总额
																	</td>
																	<td>
																		<input name="po.totalMoney" id="totalMoney"
																			type="text" readonly="readonly" title="总额"
																			maxlength="12" onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';" />
																		<span class="STYLE1">*</span>
																	</td>

																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		出票金额
																	</td>
																	<td>
																		<input name="po.moneyNum" id="moneyNum" type="text"
																			title="出票金额" maxlength="12"
																			onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; addchange('this.value');" />
																		<span class="STYLE1">*</span>
																	</td>
                                                              
																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">计费信息</span>
																	</td>
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
																	<td  class="text_tablehead_b">
																		手续费
																	</td>
																	<td class="text_tablehead_b">
																		<input name="charge" id="sxf" type="text" 
																		title="手续费" maxlength="12"  readonly="readonly"
																		onKeyPress="amountPress()" 
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"/>

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
																	<input name="postage" id="ydf" type="text" readonly="readonly"
																		title="邮电费" maxlength="19"  />
																</td>
																
																<td class="text_tablehead_b" >
																	异地加收
																</td>
																<td colspan="4">
																	<input name="otherchange" id="ydjs" type="text" readonly="readonly"
																		title="异地加收" maxlength="19" />
																</td>
																
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	工本费
																</td>
																<td>
																	<input name="counterfoil" id="counterfoil" type="text" readonly="readonly"
																		title="工本费" maxlength="19"  />
																</td>
															</tr>
															</table>
														</div>

														<div class="table_content">

															<table>
																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">附言信息</span>
																	</td>
																</tr>
																<tr>

																	<td class="text_tablehead_b">
																		附言
																	</td>
																	<td colspan="3">
																		<textarea name="po.postscript" id="postscript"
																			rows="2" cols="68" onKeyPress="charPress()"
																			onkeyup="limitLength(value,135,'提示：','fy')"></textarea>
																	</td>

																</tr>
															</table>
														</div>

														<div class="table_content">
															<table>
																<tr>


																	<td style="width: 49%;">
																	</td>
																	<td style="width: 26%;" align="center">
																		<font color=red>说明：红色*标注项为必填项</font>
																	</td>
																	<td style="width: 25%;">
																		&nbsp;
																	</td>
																</tr>
																<tr>


																	<td style="width: 49%;">
																	</td>
																	<td style="width: 26%;" align="center">
																		<input name="addButton" type="button"
																			style="cursor: pointer" class="button" value="保  存"
																			onclick="commitForm();" />
																	<input name="backButton" style="cursor: pointer" type="reset"
																			class="button" value="重  置"  />
																	</td>
																	<td style="width: 25%;">
																		&nbsp;
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
			</table></form>
	</body>
</html>