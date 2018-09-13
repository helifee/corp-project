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
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
 		<script type="text/javascript">
			function commitForm(){
		   var msg = "@";
			 	
		 
			 var dbtracct = document.getElementById("dbtracct");
			 var dbtrnm = document.getElementById("dbtrnm");
			 var dbtrbrnchid = document.getElementById("dbtrbrnchid");
			  var dbtrissuer = document.getElementById("dbtrissuer");
			 var dbtrmmbid = document.getElementById("dbtrmmbid");
			  var dtlAmt = document.getElementById("dtlAmt");
			 
			 if(isNull(trim(dbtracct.value))){
					msg += dbtracct.title+"不能为空！@";
				    }
			 if(isNull(trim(dbtrnm.value))){
					msg += dbtrnm.title+"不能为空！@";
				    }
			
			if(isNull(trim(dbtrissuer.value))){
					msg += dbtrissuer.title+"不能为空！@";
				    }
			if(isNull(trim(dbtrmmbid.value))){
					msg += dbtrmmbid.title+"不能为空！@";
				    }
			if(isNull(trim(dtlAmt.value))){
					msg += dtlAmt.title+"不能为空！@";
				    }
				   
				 var boo = msgSplit(msg);
				 
			
				
		 if(boo){
		 	 document.getElementById("dtlAmt").value=rmoney(document.getElementById("dtlAmt").value) ;
				document.forms[0].submit();
			 }
				 
		 }
		 
		 	 
	
			
			         //付款行行号查询
			function selectBankInfo(){
				var url ="<%=request.getContextPath()%>";
				var dbtrbrnchid= document.getElementById("dbtrbrnchid");
				var dbtrbrnchnm=document.getElementById("dbtrbrnchnm");
				selectBank(url,dbtrbrnchid,dbtrbrnchnm,"");
				
				var recvbkno= document.getElementById("dbtrbrnchid");
				var recvbkname=document.getElementById("dbtrbrnchnm");
				var recvopnbkno=document.getElementById("dbtrmmbid");
				var skhkhhhh= document.getElementById("dbtrissuer");
				var skrkhhmc=document.getElementById("dbtrissuernm");
				selectkhhBank(url,recvbkno,recvbkname,recvopnbkno,skhkhhhh,skrkhhmc);
				
			}
			        
		// 开户行行号查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var dbtrissuer= document.getElementById("dbtrissuer");
				 var dbtrissuernm= document.getElementById("dbtrissuernm");
				selectBank(url,dbtrissuer,dbtrissuernm,"");
			}
		</script>
	</head>
	<body  > 
	 		<form method="post" name="form0"
			action="<%=path%>/RegularDebitChildrenAction.do?method=saveChild">
			 <input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
			 <input type="hidden" name="poDetails.prntid" id="prntid" maxlength="32" value="${PrntId}"/>
		    <input type="hidden" name="poDetails.pmtgrpid" id="pmtgrpid" maxlength="32" value="${pmtgrpid}"/>
		    
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
						                  	<div  class="text_title"><span class="text_blue2">付款人信息添加</span></div>
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
																付款人账号
																</td>
																<td>
																		<input type="text" name="poDetails.dbtracct" id="dbtracct"  title="付款人账号" maxlength="32" onKeyPress="actkeyPress()"/><font color="#FF0000">*</font>
																</td>
															
																<td class="text_tablehead_b" >
																	付款人名称
																</td>
																<td >
																<input type="text" name="poDetails.dbtrnm" id="dbtrnm"   title="付款人名称" maxlength="60"/><font color="#FF0000">*</font>
																	</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	付款人地址
																</td>
																<td colspan="3" >
																		<input type="text" name="poDetails.dbtraddr"  style=" width : '400px'"  id="dbtraddr" title="付款人地址" maxlength="140"/>
						                  	
																</td>

																
																</tr>
																	<tr>
																	
																
																
																<td class="text_tablehead_b" >
																			付款行行号
																</td>
																<td>
																	<input type="text" name="poDetails.dbtrbrnchid" id="dbtrbrnchid" readonly="readonly"
																		maxlength="14" style="width:80px " title="付款行行号"/>
																		<input type="button" class="button"  value="搜索" onclick="selectBankInfo()"><font color="#FF0000">*</font>
															
																</td>
																<td class="text_tablehead_b"  >
																付款行行名
																</td>
																<td >
																	<input type="text" name="poDetails.dbtrbrnchnm" id="dbtrbrnchnm" 
																		maxlength="60" title="付款行行名" readonly="readonly"/><font color="#FF0000">*</font>
																</td>
																</tr>
																
																<tr>
																	
																 
																<td class="text_tablehead_b" >
																	付款人开户行行号
																</td>
																<td>
																<input type="text" name="poDetails.dbtrissuer" id="dbtrissuer" readonly="readonly"
																	 title="付款人开户行行号" style="width:80px " maxlength="14"/>
																<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfFkk()"><font color="#FF0000">*</font>
																	</td>
																	
																	<td class="text_tablehead_b" >
																付款人开户行行名
																</td>
																<td >
																	<input type="text" name="poDetails.dbtrissuernm" id="dbtrissuernm"
																		 title="付款人开户行行名" readonly="readonly" maxlength="60"/><font color="#FF0000">*</font>
																</td>
																	
																</tr>
																
																<tr>
																
																
																<td>
																	<input type="hidden" name="poDetails.dbtrmmbid" id="dbtrmmbid" title="付款清算行行号" style="width:80px " maxlength="14"/>
																		 
																		
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
																	业务种类编码
																</td>
																<td >
																<select name="poDetails.pmtkd" id="pmtkd" style="width: 130px;">
						                   		 					
										                   			<c:if test="${pmtkd eq '00100'}"><option value="00100">电费</option>        </c:if>
																	<c:if test="${pmtkd eq '00200'}"><option value="00200">水暖费</option>      </c:if>
																	<c:if test="${pmtkd eq '00300'}"><option value="00300">煤气费</option>      </c:if>
																	<c:if test="${pmtkd eq '00400'}"><option value="00400">电话费</option>      </c:if>
																	<c:if test="${pmtkd eq '00500'}"><option value="00500">通讯费</option>      </c:if>
																	<c:if test="${pmtkd eq '00600'}"><option value="00600">保险费</option>      </c:if>
																	<c:if test="${pmtkd eq '00700'}"><option value="00700">房屋管理费</option>  </c:if>
																	<c:if test="${pmtkd eq '00800'}"><option value="00800">代理服务费</option>  </c:if>
																	<c:if test="${pmtkd eq '00900'}"><option value="00900">学教费</option>      </c:if>
																	<c:if test="${pmtkd eq '01000'}"><option value="01000">有线电视费</option>  </c:if>
																	<c:if test="${pmtkd eq '01100'}"><option value="01100">企业管理费用</option></c:if>
																	<c:if test="${pmtkd eq '09001'}"><option value="09001">其他</option></c:if>
										                   		</select><font color="#FF0000">*</font>
																	</td> 
															<td class="text_tablehead_b">
																	金额
																</td>
																<td >
																			<input type="text" name="poDetails.dtlAmt" id="dtlAmt" maxlength="10"
																			 title="金额" onkeyup="value=value.replace(/[^\d.,]/g,'') " 
																			 	onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = '';  " />
																	<font color="#FF0000">*</font>
																</td>
																
															</tr>
															
																<tr>
																
																	<td width="140" class="text_tablehead_b">
						                  	扣款合同编号
						                  	</td>
						                  	<td><div align="left">
						                  		<input type="text" name="poDetails.pmtagrmtnb" id="pmtagrmtnb" maxlength="60"  title="扣款合同编号"   value="${poDetails.pmtagrmtnb}"/>
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
																	<textarea name="poDetails.addtlinf" id="addtlinf" 
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','addtlinf')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    		
 </div>                                                  	<%-- 
                                                <div class="table_content">
                                                                                                  
                                                        		<table>
                                                    		
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">备注信息</span></td>
                                                      </tr><tr>
																<td class="text_tablehead_b" >
																	备注
																</td>
																<td colspan="3">
																	<textarea name="poDetails.ustrd" id="ustrd" 
																		rows="2" cols="60" onKeyPress="charPress()" onkeyup="limitLength(value,135,'提示：','ustrd')"></textarea>
																</td>

															</tr>
                                                    		</table>
                                                    </div>
                                                   
                                                   --%>
                                                   
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
 