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
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
       <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
			<script type="text/javascript" src="<%=path%>/js/common/jquery-1.3.1.js"></script>
			<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
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
		
		
		
		
		
		
		
		
		
		
		
		
		
	
	
	
	
	
		<script type="text/javascript">
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var instdPty= document.getElementById("instdPty");
				var instdPtyNm=document.getElementById("instdPtyNm");
				var instdDrctPty=document.getElementById("instdDrctPty");
				selectBank(url,instdPty,instdPtyNm,instdDrctPty);
			}
			function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skhkhhhh= document.getElementById("receOpenBankNum");
				var skrkhhmc=document.getElementById("receOpenBankName");
				selectBank(url,skhkhhhh,skrkhhmc,"");
			}
			//付款人开户行信息查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var fkhkhhhh= document.getElementById("dbtrIssuer");
				var fkrkhhmc=document.getElementById("dbtrIssuerNm");
				selectBank(url,fkhkhhhh,fkrkhhmc,"");
			}
			function selectLoad(){
			 	transferOfClient(temp,'select_input');
				
			}
		 
			 
			 	function zcx(val){
				if(val.value=='Y'){
					$("#handingCharge").val("");//手续费
					$("#postCharge").val("");//邮电费
					$("#otherPlaceCharge").val("");//异地加收
					$("#handingCharge").attr("readonly",true);
					$("#postCharge").attr("readonly",true);
					$("#otherPlaceCharge").attr("readonly",true);
					jisuan();
				}else{
					$("#handingCharge").attr("readonly",false);
					$("#postCharge").attr("readonly",false);
					$("#otherPlaceCharge").attr("readonly",false);
				}
			}
 
			function jisuan(){
				var sxf = $("#handingCharge").val();
				var ydf = $("#postCharge").val();
				var ydjs = $("#otherPlaceCharge").val();
				var hkje = $("#moneyNum").val();//汇款金额
			 
				document.getElementById("totalMoney").value = fmoney(rmoney(sxf)+rmoney(ydf)+rmoney(ydjs)+rmoney(hkje), 2);
			}
			 
			 
			 
 
			
			 
			 
			 
			 
			 
			 
			 
			 
			 
			 
			
				function commitForm(){
			   var msg = "@";
				var instdPty = document.getElementById("instdPty");
				 
              var cstmrAcctId = document.getElementById("cstmrAcctId");
                var cstmrAcctNm = document.getElementById("cstmrAcctNm");
               var chckCdVal = document.getElementById("chckCdVal"); 
				if(isNull(trim(instdPty.value))){
					msg += instdPty.title+"不能为空！@";
				}
				 if(isNull(trim(cstmrAcctNm.value))){
					msg += cstmrAcctNm.title+"不能为空！@";
				}
				 if(isNull(trim(cstmrAcctId.value))){
					msg += cstmrAcctId.title+"不能为空！@";
				}
			  if(isNull(trim(chckCdVal.value))){
					msg += chckCdVal.title+"不能为空！@";
				}
				var boo = msgSplit(msg);
				 
			  	 
				if(boo){
					   document.forms[0].submit();
					}
				 
		 }
		</script>
	</head>
	<body onload="sendDate()">
		<form method="post" name="form1"
			action="<%=path%>/RealAccountAction.do?method=saveRealAccount">
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
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
									<br/>
						               <table width="689" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2">实时账户查询录入</span></div>
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
																		<!-- 系统编号-->
																</td>
																<td >
																	<input name="systemCd" id="systemCd" type="hidden" 
																	value="BEPS" readonly=readonly	maxlength="19" title="系统编号"  />
																
																	 
																</td>
																<td class="text_tablehead_b"  >
																	<!--  支付组号-->
																</td>
																<td >
																		<input name="po.pmtGrpId" id="pmtGrpId" type="hidden" readonly="readonly"
																		style="width: 180px;" title="支付交易组号" maxlength="22"
																		  />
																 
																</td>
															</tr>
                                                      
                                                      
															<tr>
																<td class="text_tablehead_b" >
																	<!--发起参与机构行号 -->
																</td>
																<td>
																<input  name="po.instgPty" id="instgPty"   type="hidden" readonly=readonly	
														 	value="${bankInfo.bankcode }"				 maxlength="20" title="发起参与机构行号" />
																	 
																	 
																</td>
																<td class="text_tablehead_b" >
																	<!-- 发起参与机构名称-->
																</td>
																<td>
																<input  name="po.instgPtyNm" id="instgPtyNm" type="hidden" readonly=readonly	
														 	value="${bankInfo.participantname }"				 maxlength="20" title="发起参与机构名称" />
																	 
																	 
																</td>
															</tr>
																<tr>
																
																<td class="text_tablehead_b" >
																	接收行行号
																</td>
																<td >
																	<input  name="po.instdPty" style="width:80px"  id="instdPty" type="text"
																		 maxlength="20" title="接收行行号" />
																	 <input type="button" class="button" value="搜索"
																			onclick="selectBankInfo()">
																	<span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	接收行名称
																</td>
																<td >
																	<input  name="po.instdPtyNm" id="instdPtyNm" type="text"
																		 maxlength="20" title="接收行名称" />
																	 
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
																<tr>
																<td class="text_tablehead_b" >
																	<!-- 发起直接参与机构 -->
																</td>
																<td>
																<input  name="po.instgDrctPty" id="instgDrctPty" type="hidden"
															readonly=readonly			value="${bankInfo.directbankcode }"				 maxlength="20" title="发起参与机构行号" />
																	 
																	 
																</td>
																<td class="text_tablehead_b" >
																<!--	接收直接参与机构v -->
																</td>
																<td >
																	<input  name="po.instdDrctPty" id="instdDrctPty" type="hidden"
																		 maxlength="20" title="清算行行号" />
																	 
																	 
																</td>
															</tr>
															
															
															<tr>
																<td class="text_tablehead_b" >
																	账户支付类型
																</td>
																<td>
																	<select  name="po.acctPmtTp" id="acctPmtTp" title="账户支付类型">
																	 <option value="AT00">银行账号</option>
																	 <option value="AT01">贷记卡</option>
																	 <option value="AT02">借记卡 </option>
																	 <option value="AT03">其他</option>
																	   
																	</select>	 
																
																 
																</td>
																<td class="text_tablehead_b" >
																	查询余额或状态
																</td>
																<td>
																
																<select  name="po.chckMd" id="chckMd" title="查询余额或状态">
																	 <option value="QT00">查询余额 </option>
																	  <option value="QT01">查询账户状态</option>
																	   
																	   
																	</select>	 
																 
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																	客户账户账号
																</td>
																<td >
																	<input  name="po.cstmrAcctId" id="cstmrAcctId" type="text"
																		 maxlength="32" title="客户账户账号" />
																	 
																	<span  class="STYLE1">*</span>
																</td> 
																<td class="text_tablehead_b" >
																	客户账户名称
																</td>
																<td>
																<input  name="po.cstmrAcctNm" id="cstmrAcctNm" type="text"
																		 maxlength="20" title="客户账户名称" />
																	 
																	<span  class="STYLE1">*</span>
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																	 密码验证码算法 
																</td>
																<td >
																
																<select  name="po.chckMd" id="chckMd" title="密码验证码算法">
																	 <option value="CD00">支付密码单密码</option>
																	  <option value="CD01">支付密码器密码</option>
																	  <option value="CD04">客户密码 </option>
																	  <option value="CD05">授权码</option>
																	   
																	</select>	 
																	 
																</td>
																<!--  <td class="text_tablehead_b" >
																	密码验证码长度
																</td>
																<td>
																<input  name="po.chckCdLen" id="chckCdLen" type="text"
																		 maxlength="20" title="密码验证码长度" />
																	 
																	<span  class="STYLE1">*</span>
																</td>-->
																<td class="text_tablehead_b" >
																	密码验证码值
																</td>
																<td >
																	<input  name="po.chckCdVal" id="chckCdVal" type="password"
																		 maxlength="20" title="密码验证码值" />
																	 
																	<span  class="STYLE1">*</span>
																</td>
															</tr>
															<tr>
																
																
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
																	<textarea name="poPrint.ustrd" id="ustrd" 
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','ustrd')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    </div>                                   
                                                  
                                                  
                                                    
                                                    
                                                    
                                           <div class="table_content">
                                                    <table>  
                                              <tr >
                                         	 <td style="width:49%;">
										 </td>
										         <td style="width:26%;" align="center"><font color=red>说明：红色*标注项为必填项</font></td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>                    
                                                   <tr >
                                          
                                             
										 <td style="width:40%;">
										 </td>
										         <td style="width:26%;" align="center">
										       <input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();" />
										          <input id="saveButton" type="reset" style="cursor: pointer" class="button" value="重  置"   /> 
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
