<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>  
	<c:choose> 
		<c:when test="${syspara == 'add'}">定期借记-付款签约添加</c:when>
		<c:when test="${syspara == 'modify'}">定期借记-付款签约修改</c:when>
	</c:choose>
</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
 <link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
        
<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
<script type="text/javascript">
	function selectBankInfoOfSkk(){
				var url ="<%=request.getContextPath()%>";
				var skrkhhhh= document.getElementById("skrkhhhh");
				var skrkhhhm=document.getElementById("skrkhhhm");
				selectBank(url,skrkhhhh,skrkhhhm,"");
			}
			//付款人开户行信息查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var fkhkhhhh= document.getElementById("fkrkhhhh");
				var fkrkhhmc=document.getElementById("fkrkhhmc");
				selectBank(url,fkhkhhhh,fkrkhhmc,"");
			}
	function dispywzlbm(txt){
		this.document.getElementById("ywzlbm").value=txt;
	}
	function xiugaibc(){
		if(confirm("确定要更改吗？")){
			ckeckwethornull();
		}
	}
</script>
</head>
<body onload="dispywzlbm('${po.ywzlbm}')">

<html:form method="post" action="/RegularDebitASignupAction.do?method=sendMsgSigned&syspara=${syspara}">
	<input id="business_name" type="hidden" value="regularDebitSigned">
	<input id="repeatmark" type="hidden" value="0">
 	 
		 
	 
	 
	
	
	  
		 
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
						                  	<div  class="text_title"><span class="text_blue2"><c:choose> 
		<c:when test="${syspara == 'add'}">定期借记-付款签约添加</c:when>
		<c:when test="${syspara == 'modify'}">定期借记-付款签约修改</c:when>
	</c:choose></span>
                                 </div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           
                                            <c:choose>
	          				<c:when test="${syspara == 'add'}">
                                           		<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">付款人信息<input type="hidden" name="poSigned.systemcd" value="BEPS"/></span></td>
                                                      </tr>
															
															<tr>
																<td class="text_tablehead_b" >
																			付款人账号
																</td>
																<td>
																	<input type="text" name="poSigned.fkrzh" id="fkrzh" maxlength="32" onKeyPress="actkeyPress()"/><font color="#FF0000">*</font>
								
															</tr>
															<tr>
															
																<td class="text_tablehead_b" >
																付款人名称
																</td>
																<td >
																	<input type="text" name="poSigned.fkrmc" id="fkrmc" maxlength="60"/><font color="#FF0000">*</font>
																</td>
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																付款人开户行行号<font color="#FF0000">*</font>
																</td>
																<td >
																		           		<input type="text" name="poSigned.fkrkhhhh" id="fkrkhhhh" style="width: 80px" maxlength="14"/>
																		           		<input type="button" class="button"   value="搜索" onclick="selectBankInfoOfFkk()">

																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b" >
																	                  		付款人开户行名称<font color="#FF0000">*</font>

																</td>
																<td >
															<input type="text" name="poSigned.fkrkhhmc" id="fkrkhhmc" maxlength="60" style="width: 280px"/>
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
															<td class="text_tablehead_b"  >
																	收款人代码<font color="#FF0000">*</font>
																</td>
																<td>
																						                   		<input type="text" name="poSigned.skrdm" id="skrdm" maxlength="5" onkeyup="fun_number(this)" onblur="fun_number(this)"/>

																</td>
															
																<td class="text_tablehead_b" >
																	收款人名称<font color="#FF0000">*</font>
																</td>
																<td >
																<input type="text" name="poSigned.skrmc" id="skrmc" maxlength="60"/>
																		</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	收款人开户行行号<font color="#FF0000">*</font>
																</td>
																<td >
																		<input type="text" name="poSigned.skrkhhhh" id="skrkhhhh"   style="width: 80px" maxlength="14"/>
																		<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfSkk()">
																</td>

																<td class="text_tablehead_b" >
																收款人开户行行名<font color="#FF0000">*</font>
																</td>
																<td>
																	<input type="text" name="poSigned.skrkhhhm" id="skrkhhhm" maxlength="60"/>
																</td>
																</tr>
														 
																
																
																
                                                 	</table>
                                                </div>
                                                
                                                    <div class="table_content">
                                                    
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">其他</span></td>
                                                      </tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
					                  	业务类型编码<font color="#FF0000">*</font>
																</td>
																<td>
																	<select name="poSigned.ywlxbm" id="ywlxbm" style="width: 130px;">
					                   			<option value="F100">定期借记业务</option>
					                   		</select>
																</td>
																<td class="text_tablehead_b">
	业务种类编码<font color="#FF0000">*</font>																</td>
																<td>
																	<select name="poSigned.ywzlbm" id="ywzlbm" style="width: 130px;">
					                   			<option value="">请选择</option>
					                   			<option value="00100">电费</option>
												<option value="00200">水暖费</option>
												<option value="00300">煤气费</option>
												<option value="00400">电话费</option>
												<option value="00500">通讯费</option>
												<option value="00600">保险费</option>
												<option value="00700">房屋管理费</option>
												<option value="00800">代理服务费</option>
												<option value="00900">学教费</option>
												<option value="01000">有线电视费</option>
												<option value="01100">企业管理费用</option>
												<option value="09001">其他</option>
					                   		</select>
																</td>
                                                  			</tr>
                                                  			
                                                  			<tr>
																	
																<td class="text_tablehead_b">
																		合同编号<font color="#FF0000">*</font>
																</td>
																<td >
																<input style="width: 100%" type="text" name="poSigned.htbh" id="htbh" maxlength="26" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
					                                          </td>

																<td class="text_tablehead_b" >
																 
																</td>
																<td>
																	 
																</td>
																</tr>	 
                                                  			 <tr>
															
																<td class="text_tablehead_b" >
																						                  	备注

																</td>
																<td colspan="3">
																		<textarea name="poSigned.bz" id="bz" rows="3" style="width: 100%" onkeyup="jsxxcd(this,140)" onblur="jsxxcd(this,140)"></textarea>
																		</td>			
 
															</tr>
                                                  			 
                                                  		</table>
                                                 </div>
                                                </c:when>
							<c:when test="${syspara == 'modify'}">  
                                                                                    <div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">付款人信息<input type="hidden" name="poSigned.systemcd" value="BEPS"/></span></td>
                                                      </tr>
															
															<tr>
																<td class="text_tablehead_b" >
																			付款人账号<font color="#FF0000">*</font>
																</td>
																<td>
																	<input type="text" name="poSigned.fkrzh" id="fkrzh" maxlength="32" value="${po.fkrzh}"/>
																</td>
																<td class="text_tablehead_b" >
																付款人名称<font color="#FF0000">*</font>
																</td>
																<td >
														         		<input type="text" name="poSigned.fkrmc" id="fkrmc" maxlength="60" value="${po.fkrmc}"/>

																</td>
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																付款人开户行行号<font color="#FF0000">*</font>
																</td>
																<td >
																		  					                   		<input type="text" name="poSigned.fkrkhhhh" id="fkrkhhhh" style="width: 80px"maxlength="14" value="${po.fkrkhhhh}"/>
<input type="button" class="button"   value="搜索" onclick="selectBankInfoOfFkk()">
																</td>
																<td class="text_tablehead_b" >
																	                  		付款人开户行名称<font color="#FF0000">*</font>

																</td>
																<td>
 	
     		<input type="text" name="poSigned.fkrkhhmc" id="fkrkhhmc" maxlength="60" value="${po.fkrkhhmc}"/>
 
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
															<td class="text_tablehead_b"  >
																	收款人代码<font color="#FF0000">*</font>
																</td>
																<td>
															<input type="text" name="poSigned.skrdm" id="skrdm" maxlength="5" onkeyup="fun_number(this)" onblur="fun_number(this)" value="${po.skrdm}"/>
															</td>
															
																<td class="text_tablehead_b" >
																	收款人名称<font color="#FF0000">*</font>
																</td>
																<td >
																	<input type="text" name="poSigned.skrmc" id="skrmc" maxlength="60" value="${po.skrmc}"/>
																		</td>
															</tr>
																<tr>
																	
																<td class="text_tablehead_b">
																	收款人开户行行号<font color="#FF0000">*</font>
																</td>
																<td >
																							                   		<input type="text" name="poSigned.skrkhhhh" id="skrkhhhh" maxlength="14" style="width: 80px" value="${po.skrkhhhh}"/>
																							                   		<input type="button" class="button"  value="搜索" onclick="selectBankInfoOfSkk()">

																</td>

																<td class="text_tablehead_b" >
																收款人开户行行名<font color="#FF0000">*</font>
																</td>
																<td>
																<input type="text" name="poSigned.skrkhhhm" id="skrkhhhm" maxlength="60" value="${po.skrkhhhm}"/>
																</td>
																</tr>
														 
																
																
																
                                                 	</table>
                                                </div>
                                               
                                                    <div class="table_content">
                                                    
                                                  		<table>
                                                  		 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">其他</span></td>
                                                      </tr>
                                                  			<tr>
                                                  				<td class="text_tablehead_b" >
					                  	业务类型编码<font color="#FF0000">*</font>
																</td>
																<td>
																	<select name="poSigned.ywlxbm" id="ywlxbm" style="width: 130px;">
					                   			<option value="F100">定期借记业务</option>
					                   		</select>
																</td>
																<td class="text_tablehead_b">
	业务种类编码<font color="#FF0000">*</font>																</td>
																<td>
																	<select name="poSigned.ywzlbm" id="ywzlbm" style="width: 130px;">
					                   			<option value="">请选择</option>
					                   			<option value="00100">电费</option>
												<option value="00200">水暖费</option>
												<option value="00300">煤气费</option>
												<option value="00400">电话费</option>
												<option value="00500">通讯费</option>
												<option value="00600">保险费</option>
												<option value="00700">房屋管理费</option>
												<option value="00800">代理服务费</option>
												<option value="00900">学教费</option>
												<option value="01000">有线电视费</option>
												<option value="01100">企业管理费用</option>
												<option value="09001">其他</option>
					                   		</select>
																</td>
                                                  			</tr>
                                                  			
                                                  			<tr>
																	
																<td class="text_tablehead_b">
																		合同编号<font color="#FF0000">*</font>
																</td>
																<td >
																	<input style="width: 100%" type="text" name="poSigned.htbh" id="htbh" maxlength="26" onkeyup="fun_number(this)" onblur="fun_number(this)" value="${po.htbh}"/>
					                                          
					                                          </td>

																<td class="text_tablehead_b" >
																 
																</td>
																<td>
																	 
																</td>
																</tr>	 
                                                  			 <tr>
															
																<td class="text_tablehead_b" >
																						                  	备注

																</td>
																<td colspan="3">
																		
																		<textarea name="poSigned.bz" id="bz" rows="3" style="width: 100%" onkeyup="jsxxcd(this,140)" onblur="jsxxcd(this,140)">${po.bz}</textarea>
																	
																	
																		</td>			
 

															</tr>
                                                  			 
                                           	</table>
                                                 </div>
                                           
                                              </div>
                                           
                              
                                                  	 
                                                  
                                    </c:when>
					      </c:choose>         
					      
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
										    		<c:choose> 
					<c:when test="${syspara == 'add'}"><input id="saveButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="ckeckwethornull();" /></c:when>
					<c:when test="${syspara == 'modify'}"><input id="saveButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="xiugaibc()" /></c:when>
				</c:choose>			
										          <input id="saveButton" type="reset" style="cursor: pointer" class="button" value="重  置"   />
										         </td>
										  <td style="width:25%;">&nbsp;</td>
									           </tr>      
                                                    	
                                                    	</table>
                                                    </div>
                                                    
                                                    
                                                    
                                                      
                                           </td>
                                         </tr>
                                      </table>
					      
					            
                                           </td>
                                         </tr>
                                      </table>
						              
										<br />
										 
										<br />
										<br />
									&nbsp;
				
									 
										<br />
										<br />
									 
								</td>
							</tr>
						</table>
				 
					<td></td>

					
	 
 
		  
		  
	 
		  
		  
		  
		  
		  
		  
		  
		  
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
	 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
 
	
	
</html:form>
</body>
</html>
