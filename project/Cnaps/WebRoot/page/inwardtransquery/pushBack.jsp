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
		<title>退汇操作</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<link rel="stylesheet" href="<%=path%>/ext2.2.1/resources/css/xtheme-gray.css" type="text/css"	media="screen,projection" />
		
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
        <script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		<script type='text/javascript' src='<%=path%>/dwr/interface/PubService.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/engine.js'></script>
	   <script type='text/javascript' src='<%=path%>/dwr/util.js'></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
 
		<script language="javascript">
	
				function commitForm(){
			   var msg = "@";
			var cnclrsn = document.getElementById("cnclrsn");
			var dbtracct = document.getElementById("dbtracct");
			var dbtrnm = document.getElementById("dbtrnm");
			 
			
			 if(isNull(trim(cnclrsn.value))){
					msg += cnclrsn.title+"不能为空！@";
				    }
		 			 if(isNull(trim(dbtracct.value))){
					msg += dbtracct.title+"不能为空！@";
				    }
			 if(isNull(trim(dbtrnm.value))){
					msg += dbtrnm.title+"不能为空！@";
				    }
			 
			 
				    	    
				var boo = msgSplit(msg);
				 
					 
			
				if(boo){
				 
					document.forms[0].submit();
				 
				}
				 
		 }
		 
		 
	 
	 
	 //付款人开户行行号查询
			function selectBankInfoOfFkk(){
				var url ="<%=request.getContextPath()%>";
				var applyOpenBankNum= document.getElementById("applyOpenBankNum");
				var applyOpenBankName=document.getElementById("applyOpenBankName");
				selectBank(url,applyOpenBankNum,applyOpenBankName,"");
			}
	 
		</script>
	</head  >
	<body   > 
	 
	 		<form method="post" name="form1"
			action="<%=path%>/RecvTransProcessAction.do?method=pushback">
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
						                  	<div  class="text_title"><span class="text_blue2">退汇操作</span></div>
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
																
																<td class="text_tablehead_b"  >
																	退汇原因
																</td>
																<td >
																	<input name="pb.cnclrsn" id="cnclrsn" type="text"  
																		maxlength="19" title="退汇原因" />
																 
																</td>
																</tr>
															<tr>
																<td class="text_tablehead_b" >
																	<input type="hidden"    name="pb.id" title="系统号" value="${ID }">
																 
																</td>
																
															</tr>
															<tr>
															<td class="text_tablehead_b"  >
																	扣款人账号
																</td>
																<td >
																	<input name="pb.dbtracct" id="dbtracct" type="text"   
																		maxlength="19" title="扣款人账号" /> 
																</td>
																<td class="text_tablehead_b" >
																	扣款人名称
																</td>
																<td >
															<input name="pb.dbtrnm" id="dbtrnm" type="text"   
																		maxlength="19" title="扣款人名称" /> 
																</td>
																
															</tr>
															</table>
                                                 </div>
                                                
                                                   
                                                 
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
											 <input id="saveButton" type="reset" style="cursor: pointer" class="button" value="重  置"   />
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
