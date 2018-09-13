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
		<title> 数字证书下载申请 </title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/digsigndownload.js"></script>
	</head>
	<body>
		<form method="post" action="<%=path%>/hvpsdigsigdownreqinfoAction.do?method=digisgDownload&business=${business}">
		  <input id="business_name" type="hidden" value="hvpsdigsigdownreqinfo">
		  <input id="repeatmark" type="hidden" value="0">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
			<td width="8" height="48" ></td>
			<td >
				<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td  class="text_tablehead_b">
						<h5 align="left">&nbsp;</h5>
					</td>
					<td  width="194" ></td>
					<td  width="270"  ></td>				
					</tr>
				</table>
			</td>
			<td width="8" ></td>
		</tr>
				<tr valign="top">
					<td  >&nbsp;</td>
					<td >
					<div align="center">
						<table width="75%" border="0" cellspacing="0" cellpadding="0">
					        
					        <tr>
								<td  >
									<div  class="text_title"><span class="text_blue2">数字证书下载申请</span></div>
								</td>
							</tr>						
							<tr>
								<td>
									<div class="table_body">
										<table width="95%"  class="table_content" id="mytable">														
												<tr><td colspan="4">&nbsp;</td></tr>
												<tr>
				                                   	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
				                                   </tr>
				                                   <input type="hidden" name="listnum1" value="1"/>
														<tr>
															<td  class="text_tablehead_b">
															直接参与机构号
															</td>
															<td >
																<input type="text" name="mmbcd" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
																<span  class="STYLE1">*</span>
																<input type="button" class="button" value="添加" onclick="AddRow();" />
															</td>
															
														</tr>
													</table>
												<table>
                                                    	
                                                    	<tr>
                                                    		<td colspan="4"><span class="text_tablehead">备注</span></td>
                                                    	</tr>
                                                    	<tr>	
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">
                                                    			<textarea id="rmk" name="po.rmk" class="textarea_msg" cols="50" rows="5" id="msgcnt" onKeyPress="charPress()" onkeyup="limitLength(value,256,'提示：','rmk')"></textarea>
                                                    		</td>
                                                    	</tr>
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td >
                                                    			<input name="addButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="ckeckwethornull();" />
                                                    			<input name="backButton" style="cursor: pointer" type="reset" class="button" value="重  置"  />
															</td>
                                                    		<td >&nbsp;</td>
                                                    	</tr>
                                                    	<tr><td colspan="4">&nbsp;</td></tr>
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td  >
																<span class="STYLE1">说明：红色*标注项为必填项</span>
															</td>
                                                    	</tr>
                                                    	<tr><td colspan="4">&nbsp;</td></tr>
                                                    </table>
                                                    
									</div>
									
								
								</td>
							</tr>
						</table>
						</div>
					</td>
					<td ></td>
					
					
				</tr>
			</table>
			
		</form>
	</body>
</html>
 