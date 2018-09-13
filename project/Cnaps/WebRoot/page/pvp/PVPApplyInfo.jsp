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
			var dbtrAcct = document.getElementById("dbtrAcct");
			var purchsPric = document.getElementById("purchsPric");
			 
			 if(isNull(trim(dbtrAcct.value))){
					msg += dbtrAcct.title+"不能为空！@";
				    }
			 if(isNull(trim(purchsPric.value))){
					msg += purchsPric.title+"不能为空！@";
				    }
			  
			 
				var boo = msgSplit(msg);
				 
					 
			
				 if(boo){
				 	document.getElementById("purchsPric").value=rmoney(document.getElementById("purchsPric").value) ;
			
			  document.forms[0].submit();
				 
				 }
				 
		 }
		 
		
		
	 
	  
	 
			
			
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
		</script>
		
		
			<SCRIPT language="javaScript"><!--
  function sendDate(){
  //	var name=document.form1.Username.value;
  //	var pass=document.form1.Userpass.value;
  	
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
	                 
		                
		                  document.form1.pmtGrpId.value=http_request.responseText;
	           
		               
	             
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
			action="<%=path%>/PVPApplyInfoAction.do?method=applyInfo">
			 
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
						                  	<div  class="text_title"><span class="text_blue2"> PVP结算申请信息报文 </span></div>
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
																支付组号
																</td>
																<td >
																<input name="po.pmtGrpId" id="pmtGrpId" type="text" readonly="readonly"
																		style="width: 180px;" title="支付交易组号" maxlength="22"
																		  />
																		<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
                                                                        系统编号
																</td>
																<td>
																		<input name="po.systemCd" id="systemCd" type="text" 
													readonly=readonly		value="HVPS"						maxlength="19" title="发起参与机构行号"  />
																

																
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
                                                                        发起参与机构行号
																</td>
																<td>
																		<input name="po.instgPty" id="instgPty" type="text" 
													readonly=readonly		value="${bankInfo.bankcode }"						maxlength="19" title="发起参与机构行号"  />
																

																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																接收参与机构行号
																</td>
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
																<input name="poNotify.instgDrctPty" id="instgDrctPty" type="text"  
										readonly=readonly			value="${bankInfo.directbankcode }"					style="width: 180px;" title="发起直接参与机构" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	接收直接参与机构
																</td>
																<td >
																	<input style="width:180px;" name="poNotify.instdDrctPty" id="instdDrctPty" type="text" size="19"
																		maxlength="19" title="接收直接参与机构" />	<font color=red>*</font>																	
																</td>
															</tr>
															
															
															
															 
															
																<tr>
																<td class="text_tablehead_b" >
																		付款人账号
																</td>
																<td>
																<input name="po.dbtrAcct" id="dbtrAcct" type="text"  
																		style="width: 180px;" title="付款人账号" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	付款人名称
																</td>
																<td >
																	<input style="width:180px;" name="po.dbtrNm" id="dbtrNm" type="text" size="19"
																		maxlength="19" title="付款人名称" />	<font color=red>*</font>																	
																</td>
															</tr>
															
															
																
																<tr>
																<td class="text_tablehead_b" >
																		付款人开户行行号
																</td>
																<td>
																<input name="po.dbtrIssuer" id="dbtrIssuer" type="text"  
																		style="width: 180px;" title="付款人开户行行号" maxlength="52"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	买入价
																</td>
																<td >
																	<input style="width:180px;" name="po.purchsPric" id="purchsPric" type="text" size="19"
																		maxlength="19" title="买入价" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"
																		
																		
																		/>	<font color=red>*</font>																	
																</td>
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																		买入外汇币种
																</td>
																<td>
																<input name="po.buyTp" id="buyTp" type="text"  
																		style="width: 180px;" title="买入外汇币种" maxlength="22"
																		  />
																	<font color=red>*</font>
																</td>
																<td class="text_tablehead_b" >
																	买入外汇数
																</td>
																<td >
																	<input style="width:180px;" name="po.buyAmt" id="buyAmt" type="text" size="19"
																		maxlength="19" title="买入外汇数" 
																		onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		
																		
																		 />	<font color=red>*</font>																	
																</td>
															</tr>
															
															 
															
															 
														 
														  
															</table>
                                                </div>
                                                 
                                                                  <div class="table_content">
                                                                                                  
                                                                            		<table>
                                                    		
																 
                                                       	 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">备注信息</span></td>
                                                      </tr><tr>
																<td class="text_tablehead_b" >
																	备注
																</td>
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
