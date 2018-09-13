<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 业务状态查询申请 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
</head>
<body>
<html:form method="post" action="/businessStatusQueryAction.do?method=sendMsg&business=${business}">
	<input id="business_name" type="hidden" value="businessStatusQuery">
	<input id="repeatmark" type="hidden" value="0">
	<input id="sendbranch" name="po.sendbranch" type="hidden" value="${userentity.systemorganizationsmanage.namecode}">
	
	
	
	
	
	
	
 
	  
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
						                  	<div  class="text_title"><span class="text_blue2">业务状态查询申请</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		 
                                                 <div class="table_body">
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																	原报文标识号： 
																</td>
																<td>
																		<input type="text" name="po.orimsgid" id="orimsgid" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)"/> <font color="#FF0000">*</font>
																	
																</td>
															
															</tr>
																<tr>
																	
																 
																<td class="text_tablehead_b" >
																
																</td>
																<td>
																		</td>
																</tr>
																
																
															
																
															 
																
																
																
                                                 	</table>
                                                </div>
                                             	
                                                 
                                                   
                                        <div class="table_content" align="center"> 
                                        <br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="ckeckwethornull();" />
										<br />
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>  
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
