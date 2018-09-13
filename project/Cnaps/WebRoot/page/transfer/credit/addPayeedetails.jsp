<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
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
		           //收款行行号查询
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var recvbkno= document.getElementById("cdtrBrnchId");
				var recvbkname=document.getElementById("receBankName");
				var recvopnbkno=document.getElementById("cdtrMmbId");
				var skhkhhhh= document.getElementById("receOpenBankNum");
				var skrkhhmc=document.getElementById("receOpenBankName");
				selectkhhBank(url,recvbkno,recvbkname,recvopnbkno,skhkhhhh,skrkhhmc);
				
				
			}
		          //收款清算行行号查询
			function selectBankInfoqing(){
				var url ="<%=request.getContextPath()%>";
				var cdtrMmbId= document.getElementById("cdtrMmbId");
				
				selectBank(url,cdtrMmbId,"","");
			}
		// 开户行行号查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var receOpenBankNum= document.getElementById("receOpenBankNum");
				 var receOpenBankName= document.getElementById("receOpenBankName");
				selectBank(url,receOpenBankNum,receOpenBankName,"");
			}
			function commitForm(){
			   
				var msg = "@";
				var receAcount = document.getElementById("receAcount");
				var receName = document.getElementById("receName");
				var cdtrBrnchId = document.getElementById("cdtrBrnchId");
				var receBankName = document.getElementById("receBankName");
				//var receAddress = document.getElementById("receAddress");
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
				   /*    if(isNull(trim(receAddress.value))){
					msg += receAddress.title+"不能为空！@";
				    }*/
				       if(isNull(trim(money.value))){
					msg += money.title+"不能为空！@";
				    }
				var boo = msgSplit(msg);
				 
				
				if(boo){
				document.getElementById("money").value=rmoney(document.getElementById("money").value) ;
				
			 	 document.forms[0].submit();
				 
				 				}
				 
		 }
		 
		 	 
    var A00100 = {name:"00100",value:"电费"}; 
    var A00200 = {name:"00200",value:"水暖费"}; 
    var A00300 = {name:"00300",value:"煤气费"}; 
    var A00400 = {name:"00400",value:"电话费"}; 
    var A00500 = {name:"00500",value:"通讯费"}; 
    var A00600 = {name:"00600",value:"保险费"}; 
    var A00700 = {name:"00700",value:"房屋管理费"};   
    var A00800 = {name:"00800",value:"代理服务费"}; 
    var A00900 = {name:"00900",value:"学教费"};
     var A01000 ={name:"01000",value:"企业管理费用"};
    var A09001 = {name:"09001",value:"其他"};
    var A01100 = {name:"01100",value:"代理服务费"};
    var A01200 = {name:"01200",value:"薪金报酬"};
A104 = [A00100,A00200,A00300,A00400,A00500,A00600,A00700,A00800,A00900,A01000,A01100,A09001 ];
	var A01300 = {name:"01300",value:"慈善捐款"};
A105 =[A01300,A09001];	
	
		 
		 
		  function init(){
	    var sel = document.getElementById("pmtKd");
		sel.options.length=0; 
		
		   if("${parentsize}" == "E100"){
	 		for(var i=0;i < A104.length;i++){
			var opt = document.createElement('option');
						opt.setAttribute('value',A104[i].name);
						opt.innerText = A104[i].value;
						sel.appendChild(opt);
			 }
			 
		}else {
		   if("${parentsize}" == "C210"){
			var opt = document.createElement('option');
						opt.setAttribute('value',A01200.name);
						opt.innerText = A01200.value;
						sel.appendChild(opt);
		 	
			}else{
			        if("${parentsize}" == "A101"){
			        
			        for(var i=0;i < A105.length;i++){
			var opt = document.createElement('option');
						opt.setAttribute('value',A105[i].name);
						opt.innerText = A105[i].value;
						sel.appendChild(opt);
			 }
			        }
			}
		
		
	 		}
	 }
		 
		</script>
	</head>
	<body  > 
	<!--  	<form method="post" action="<%=path%>/transfer/RealTimeCreditAction.do?method=sendCredit">-->
			<form method="post" name="form1"
			action="<%=path%>/transfer/RegularCreditChildrenAction.do?method=addChild&id=${ID}">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
			<input name="regularCreditPersonDetail.id" id="id" type="hidden" value="${ID}">
			
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
						                  	<div  class="text_title"><span class="text_blue2">定期贷记收款人增加</span></div>
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
																		<input name="regularCreditPersonDetail.receAcount" id="receAcount" type="text" size="32"
																		maxlength="32" title="收款人账号" onKeyPress="actkeyPress()" />
																		<span  class="STYLE1">*</span>
																	
																</td>
															
																<td class="text_tablehead_b" >
																		收款人名称 
																</td>
																<td >
																 <input name="regularCreditPersonDetail.receName" id="receName" type="text" size="12"
																		maxlength="39" title="收款人名称" />
																		<span  class="STYLE1">*</span>
																		</td>
															</tr>
															<tr>
																	
																<td class="text_tablehead_b"  >
																	收款人地址
																</td>
																<td  colspan="3">
																	
																			<textarea name="regularCreditPersonDetail.receAddress" id="receAddress" cols="60" 
																				 title="收款人地址"		rows="2" onKeyPress="actkeyPress()"  onkeyup="limitLength(value,70,'提示：','receAddress')"></textarea>
								                  	 
																		 
																		 
																</td>
																
																 				</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	收款行行号
																</td>
																<td >
																	<input name="regularCreditPersonDetail.cdtrBrnchId" id="cdtrBrnchId" type="text" style="width:100px" readonly="readonly"
																		 title="收款行行号" maxlength="12" />
																		<input type="button" class="button"  value="搜索" onclick="selectBankInfo()">
																		<span  class="STYLE1">*</span>
																</td>

																<td class="text_tablehead_b" >
																		收款行名称
																</td>
																<td>
																<input name="regularCreditPersonDetail.receBankName" id="receBankName" type="text" readonly="readonly"
																		 maxlength="35" title="收款行名称" /><span  class="STYLE1">*</span>
																		 	<input name="regularCreditPersonDetail.cdtrMmbId" id="cdtrMmbId" type="hidden" style="width:100px"
																		 title="收款清算行行号" readonly="true"/>	
																	</td>
																</tr>
																
																
																<tr>
																<td class="text_tablehead_b" >
																	收款人开户行行号
																</td>
																<td >
																	<input name="regularCreditPersonDetail.receOpenBankNum" id="receOpenBankNum" type="text"
																style="width:100px" readonly="readonly" title="收款人开户行行号" maxlength="12" />
																<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfFkk()">
																</td>

																<td class="text_tablehead_b" >
																	收款人开户行名称
																</td>
																<td>
																		<input name="regularCreditPersonDetail.receOpenBankName" id="receOpenBankName" type="text" readonly="readonly"
																		 maxlength="35" title="收款人开户行名称" />			<span  class="STYLE1">*</span>
															
																</td>
																
																</tr>
																
																	<tr>
																	
																<td class="text_tablehead_b" >
																	业务种类
																</td>
																<td>
																	
																	<select name="regularCreditPersonDetail.pmtKd" id="pmtKd">
																		<c:if test="${pmtkd eq '00100'}"><option value="00100">电费</option>        </c:if>
																		<c:if test="${pmtkd eq '00200'}"><option value="00200">水暖费</option>      </c:if>
																		<c:if test="${pmtkd eq '00300'}"><option value="00300">煤气费</option>      </c:if>
																		<c:if test="${pmtkd eq '00400'}"><option value="00400">电话费</option>      </c:if>
																		<c:if test="${pmtkd eq '00500'}"><option value="00500">通讯费</option>      </c:if>
																		<c:if test="${pmtkd eq '00600'}"><option value="00600">保险费</option>      </c:if>
																		<c:if test="${pmtkd eq '00700'}"><option value="00700">房屋管理费</option>  </c:if> 
																		<c:if test="${pmtkd eq '00800'}"><option value="00800">代理服务费</option>  </c:if>
																		<c:if test="${pmtkd eq '00900'}"><option value="00900">学教费</option>      </c:if>
																		<c:if test="${pmtkd eq '01000'}"><option value="01000">企业管理费用</option></c:if>
																		<c:if test="${pmtkd eq '09001'}"><option value="09001">其他</option>      </c:if>
																		<c:if test="${pmtkd eq '01100'}"><option value="01100">代理服务费</option></c:if>
																		<c:if test="${pmtkd eq '01200'}"><option value="01200">薪金报酬</option></c:if>
																		<c:if test="${pmtkd eq '01300'}"><option value="01300">慈善捐款</option></c:if>
																	</select>
															
																</td>
																
																<td class="text_tablehead_b" >
																		单笔金额
																</td>
																<td>
																<input name="regularCreditPersonDetail.money" id="money" type="text"
																		 maxlength="15" title="单笔金额"
																		 onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';"  />			<span  class="STYLE1">*</span>
															 
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
																&nbsp;&nbsp;&nbsp;	附言
																</td>
																<td colspan="3">
																	<textarea name="regularCreditPersonDetail.postscript" id="postscript" 
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','postscript')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    		
 </div>                           
 <%-- 
   <div class="table_content">
                                                    
                                                    		<table>
                                                    			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">附言信息</span></td>
                                                      </tr>
                                                    		<tr>
															
																<td class="text_tablehead_b" >
																&nbsp;&nbsp;&nbsp;	附言2
																</td>
																<td colspan="3">
																	<textarea name="regularCreditPersonDetail.postscript2" id="postscript2" 
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','postscript2')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    		
 </div>                           
 --%>
  <input id="remark" name="regularCreditPersonDetail.remark" type="hidden" value="" >
		                          	
     
                                                     <div class="table_content">
                                                    	 
                                                    	     
                                                   <table>  
                                              <tr align="center">
                                              <td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                              <td  > 
                                              
										<span class="STYLE1">说明：红色*标注项为必填项</span>
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
                                                 
                                                   
                                                    </div>
                                                  	 
                                                  
                                                    
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
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		   
													
						 

		</form>
	</body>
</html>
