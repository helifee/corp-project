<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean" %>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html" %>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>
<%
		response.setHeader("Pragma","No-cache");
		response.setHeader("Cache-Control","no-cache");
		response.setDateHeader("Expires", 0);	
		
%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
<script type="text/javascript">
          function commitForm(){
           var msg = "@";
					var sendDrctPty = document.getElementById("sendDrctPty");
				if(isNull(trim(sendDrctPty.value))){
					msg += sendDrctPty.title+"不能为空！@";
				    }
				    
				    	var boo = msgSplit(msg);
				    	if(boo){
			return document.forms[0].submit();
				}
		}	 
		</script>
		
	</head>
	<body >
		<html:form method="post" action="/transfer/SAPSNettingQueueQueryAction.do?method=querySave">
		<input type="hidden" name="token" value="${token}"/>
		  <input id="signval" type="hidden" value="sign0">
		  <input id="id" name="id" type="hidden" value="${pvpform.id}"/>
		   <input id="chnmsgid" name="chnmsgid" type="hidden"  value="${pvpform.chnmsgid}"/>
	 	   
		   
		     
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
						               <table width="75%" border="0" cellspacing="0" cellpadding="0" >
                                          <tr>
						                  <td  >
						                  	<div  class="text_title"><span class="text_blue2"> 查询申请录入</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		 
                                                   <div class="table_body">
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">发起机构信息</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	发起直接参与机构： 
																</td>
																<td>	<input name="po.sendDrctPty" id="sendDrctPty" type="text" style="width:180px;" title="发起直接参与机构"  /><font color="#FF0000">*</font>
															
																</td>
															
																<td class="text_tablehead_b" >
																		 
																</td>
																<td >
																 		</td>
															</tr>
															
																
															<tr>
																<td colspan="4">&nbsp;</td>
															</tr>	
															<tr>
																<td colspan="4" align="center">
																	<span class="STYLE1">说明：红色*标注项为必填项</span>
																</td>
															</tr>	
															<tr>
																<td colspan="4" align="center">
																	<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存"  onclick="commitForm();" />
																</td>
															</tr>	
                                                 	</table>
                                                 	<br />
										<br />
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
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
	 
 	   
		   
		   
		   
		   
		   
		   
		   
		  
			 
			
		</html:form>
	</body>
</html>
 