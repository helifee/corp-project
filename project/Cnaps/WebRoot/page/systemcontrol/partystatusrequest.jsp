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
		<title> ��¼/�˳�����¼�� </title>
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
							                  	<div  class="text_title"><span class="text_blue2">��¼�˳�����¼��</span></div>
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
									                  		 ϵͳ���
									                  	</td>
									                  	<td >
									                   		<select name="po.systemcd" id="systemcd">
									                   			<option value="HVPS">���ʵʱ֧��ϵͳ</option>
									                   			<option value="BEPS">С������֧��ϵͳ</option>
									                   			<option value="IBPS">����֧����������ϵͳ</option>
									                   		</select>
									                  	</td>																
															<td class="text_tablehead_b"  >
															��������
															</td>
															<td >
															<select name="po.loginoprtp" title="��������" >
																<option value="OT00">��¼</option>
																<option value="OT01">�˳�</option>
															</select>
																<span  class="STYLE1">*</span>
															</td>
														</tr>
														<tr>
										                  	<td  class="text_tablehead_b">
										                  		����ֱ�Ӳ������
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
                                                    				<input name="addButton" type="button" style="cursor: pointer" class="button" value="��  ��" onclick="ckeckwethornull();" />
                                                    			<td >&nbsp;
                                                    			</td>
                                                    		</tr>
                                                    	</table>
                                                    </div>
                                                     <div class="table_content" align="center">
										    		<br />
													<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
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
 