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
		<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
		<title> 登录/退出申请录入 </title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
	</head>
	<body>
		<form method="post" action="<%=path%>/hvpspartystatusapplyAction.do?method=loginOrOut">
		  <input id="signval" type="hidden" value="sign0">
		  <input id="business_name" type="hidden" value="partystatusreques">
		  <input id="repeatmark" type="hidden" value="0">
		  	<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				<tr valign="top">
					<td  ></td>
					<td >
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
					        	<td colspan="4">&nbsp;</td>
					        </tr>
					       
							<tr>
								<td>&nbsp;</td>
								<td>
									<div align="center">									
										<table width="90%" border="0" cellspacing="0" cellpadding="0">											
											 <tr>
							                  <td  >
							                  	<div  class="text_title"><span class="text_blue2">登录退出申请录入</span></div>
							                  </td>
							                </tr>
											<tr>
												<td>
												<div class="table_body">
												<div class="table_content">
													<table >
														<tr><td colspan="4">&nbsp;</td></tr>														
														<tr>
														<td  class="text_tablehead_b">
									                  		 系统编号
									                  	</td>
									                  	<td >
									                   		<select name="po.systemcd" id="systemcd">
									                   			<option value="HVPS">大额实时支付系统</option>
									                   			<option value="BEPS">小额批量支付系统</option>
									                   			<option value="IBPS">网上支付跨行清算系统</option>
									                   		</select>
									                  	</td>																
															<td class="text_tablehead_b"  >
															操作类型
															</td>
															<td >
															<select name="po.loginoprtp" title="操作类型" >
																<option value="OT00">登录</option>
																<option value="OT01">退出</option>
															</select>
																<span  class="STYLE1">*</span>
															</td>
														</tr>
														<tr>
										                  	<td  class="text_tablehead_b">
										                  		发起直接参与机构
										                  	</td>
										                  	<td colspan="3">
										                   		<input type="text" name="po.instgdrctpty" id="instgdrctpty" maxlength="12" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
										                  		<span  class="STYLE1">*</span>
										                  	</td>
										                 </tr>
													</table>
													</div>
													</br>
													 <div class="table_content" align="center">
                                                    	<table>
                                                    		<tr>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="ckeckwethornull();" />
                                                    			<td >&nbsp;
                                                    			</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
                                                     <div class="table_content" align="center">
										    		<br />
													<span class="STYLE1">说明：红色*标注项为必填项</span>
													<br />
													<br />
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
					<td ></td>
				</tr>
			</table>			
		</form>
	</body>
</html>
 