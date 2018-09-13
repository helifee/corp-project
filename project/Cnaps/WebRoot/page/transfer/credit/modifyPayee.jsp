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
        <script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>	
		<script type="text/javascript"	src="<%=request.getContextPath()%>/js/common/popup.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			function commitForm(){
			  var msg = "@";
				var receAcount = document.getElementById("receAcount");
				var receName = document.getElementById("receName");
				var cdtrBrnchId = document.getElementById("cdtrBrnchId");
				var receBankName = document.getElementById("receBankName");
				var receAddress = document.getElementById("receAddress");
				var cdtrBrnchId = document.getElementById("cdtrBrnchId");
				var receOpenBankNum = document.getElementById("receOpenBankNum");
				var cdtrMmbId = document.getElementById("cdtrMmbId");
				var money = document.getElementById("money");
				  
				 
				   if(isNull(trim(cdtrMmbId.value))){
					msg += cdtrMmbId.title+"不能为空！@";
				    }
				   if(isNull(trim(receOpenBankNum.value))){
					msg += receOpenBankNum.title+"不能为空！@";
				    }
				  if(isNull(trim(cdtrBrnchId.value))){
					msg += cdtrBrnchId.title+"不能为空！@";
				    }
				   if(isNull(trim(receAcount.value))){
					msg += receAcount.title+"不能为空！@";
				    }
			       if(isNull(trim(receName.value))){
					msg += receName.title+"不能为空！@";
				    }
			       if(isNull(trim(cdtrBrnchId.value))){
					msg += cdtrBrnchId.title+"不能为空！@";
				    }
				    if(isNull(trim(receBankName.value))){
					msg += receBankName.title+"不能为空！@";
				    }
				       if(isNull(trim(receAddress.value))){
					msg += receAddress.title+"不能为空！@";
				    }
				       if(isNull(trim(money.value))){
					msg += money.title+"不能为空！@";
				    }
				var boo = msgSplit(msg);
				 
				
				
			
				 
				if(boo){
				document.getElementById("money").value=rmoney(document.getElementById("money").value) ;
				 	 document.forms[0].submit();
				}
				 
		 }
		   //收款行行号查询
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var cdtrBrnchId= document.getElementById("cdtrBrnchId");
				var receBankName=document.getElementById("receBankName");
				selectBank(url,cdtrBrnchId,receBankName,"");
				
				var recvbkno= document.getElementById("cdtrBrnchId");
				var recvbkname=document.getElementById("receBankName");
				var recvopnbkno=document.getElementById("cdtrMmbId");
				var skhkhhhh= document.getElementById("receOpenBankNum");
				var skrkhhmc=document.getElementById("receOpenBankName");
				selectkhhBank(url,recvbkno,recvbkname,recvopnbkno,skhkhhhh,skrkhhmc);
				
				
			}
				// 开户行行号查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var receOpenBankNum= document.getElementById("receOpenBankNum");
				 var receOpenBankName= document.getElementById("receOpenBankName");
				selectBank(url,receOpenBankNum,receOpenBankName,"");
			}
		</script>
	</head>
	<body> 
	<!--  	<form method="post" action="<%=path%>/transfer/RealTimeCreditAction.do?method=sendCredit">-->
			<form method="post" name="form1"
			action="<%=path%>/transfer/RegularCreditChildrenAction.do?method=modifyChild">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
			<input name="regularCreditPersonDetail.id" id="id" type="hidden" value="${sap.id}">
			<input name="regularCreditPersonDetail.parentid" id="parentid" type="hidden" value="${sap.parentid}">
			 
		  <input id="contrperson" name="contrperson" type="hidden" >
		  
		 
		  
		  
		  
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
						                  	<div  class="text_title"><span class="text_blue2"> 收款人信息修改</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		 
                                               <div class="table_body">
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">申请人信息</span></td>
                                                      </tr>
                                                     
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	收款人账号
																</td>
																<td>
																		<input name="regularCreditPersonDetail.receAcount" id="receAcount" value="${sap.receAcount}" type="text" size="32"
																		maxlength="32" title="收款人账号" />
																		<font color="red">*</font>
																	
																</td>
															
																<td class="text_tablehead_b" >
																		收款人名称 
																</td>
																<td >
																 <input name="regularCreditPersonDetail.receName" id="receName" type="text" size="12"
																		maxlength="49" title="收款人名称" value="${sap.receName}"  /><font color="red">*</font>
																		
																		</td>
															</tr>
															<tr>
																	
																<td class="text_tablehead_b"  >
																	收款人地址
																</td>
																<td >
																	<input name="regularCreditPersonDetail.receAddress" id="receAddress" type="text"
																	value="${sap.receAddress}"	 title="收款人地址" maxlength="45" />
																</td>
																</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	收款行行号
																</td>
																<td >
																	<input name="regularCreditPersonDetail.cdtrBrnchId" id="cdtrBrnchId" value="${sap.cdtrBrnchId}" type="text"
																	style="width:100px" readonly="readonly"
																		 title="收款行行号" maxlength="12" />	<input type="button" class="button"  value="搜索" onclick="selectBankInfo()"><font color="red">*</font>
																</td>

																<td class="text_tablehead_b" >
																		收款行名称
																</td>
																<td>
																<input name="regularCreditPersonDetail.receBankName" id="receBankName" type="text" value="${sap.receBankName}"
																		 maxlength="45" title="收款行名称" /><font color="red">*</font>
																	</td>
																</tr>
																
																
																<tr>
																<td class="text_tablehead_b" >
																	收款人开户行行号
																</td>
																<td >
																	<input name="regularCreditPersonDetail.receOpenBankNum" id="receOpenBankNum" type="text" value="${sap.receOpenBankNum}" 
																		style="width:100px" readonly="readonly"
																		 title="收款人开户行行号" maxlength="12" />
																		 <input type="button" class="button"  value="搜索" onclick="selectBankInfoOfFkk()">
																<font color="red">*</font>
																</td>

																<td class="text_tablehead_b" >
																	收款人开户行名称
																</td>
																<td>
																		<input name="regularCreditPersonDetail.receOpenBankName" id="receOpenBankName" type="text"
																		value="${sap.receOpenBankName}"  maxlength="45" title="收款人开户行名称" />			<font color="red">*</font>
															
																</td>
																
																</tr>
																<tr>
																	
																<td class="text_tablehead_b"  >
																		收款清算行行号
																</td>
																<td>
																		
																<input name="regularCreditPersonDetail.cdtrMmbId" id="cdtrMmbId" type="text" value="${sap.cdtrMmbId}"
																		 title="收款清算行行号" readonly="true"/>	
																	
																	
																	
																</td>
																<td class="text_tablehead_b" >
																		单笔金额
																</td>
																<td>
																<input name="regularCreditPersonDetail.money" id="money" value="${sap.money}" type="text"
																		 maxlength="15" title="单笔金额"
																		 onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"  />		<font color="red">*</font>
																</td>
																</tr>
																
															 
                                                 		<tr>
																
																
																
                                                 	</table>
                                                </div>
                                                	 
                                                    <div class="table_content">
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">附言信息</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																	&nbsp;&nbsp;&nbsp;附言
																</td>
																<td colspan="3">
																<input type="text" name="regularCreditPersonDetail.postscript" id="postscript" value="${sap.postscript}"
																	style="width:500px;"
																	onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','fy')"
																/>
																	
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
