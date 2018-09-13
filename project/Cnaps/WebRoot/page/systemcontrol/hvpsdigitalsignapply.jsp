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
		<title> 数字证书绑定</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>

	</head>
	<body>
		<form method="post" action="<%=path%>/hvpsdigitalsignapplyAction.do?method=signApply">
		  <input id="signval" type="hidden" value="sign0">
		  <input id="repeatmark" type="hidden" value="0" />
		  <input id="business_name" type="hidden" value="Hvpsdigitalsignapply">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48" ></td>
					<td >
						<table width="100%" height="48" border="0" cellpadding="0" cellspacing="0">
							<tr>
							<td class="text_tablehead_b">
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
					<td  ></td>
					<td >
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
					        	<td width="10">&nbsp;</td>
					        	<td style="font-size: 14px;font-weight: bold;color: #2A5BB8;white-space: normal;text-align: center;"></td>
					        </tr>
					        <tr>
					        	<td width="10">&nbsp;</td>
					        	<td width="10">&nbsp;</td>
					        </tr>
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table width="75%" border="0" cellspacing="0" cellpadding="0">											
											 <tr>
												<td  >
													<div  class="text_title"><span class="text_blue2">数字证书绑定</span></div>
												</td>
											</tr>
											<tr>
												<td>
												<div class="table_body">
													<table class="table_content">														
														<tr><td colspan="4">&nbsp;</td></tr>
														<tr>
					                                   	<td colspan="4"><span class="text_tablehead">基本信息</span></td>
					                                   </tr>
														<tr>																
															<td  class="text_tablehead_b">
															操作类型
															</td>
															<td>
															<select name="po.chgtp" title="操作类型" >
																<option value="CC00">新增</option>
																<option value="CC02">撤销</option>
															</select>
															<span  class="STYLE1">*</span>
															</td>
															<td  class="text_tablehead_b">
															发起直接参与机构
															</td>
															<td >
																<input type="text" id="instgdrctpty" name="po.instgdrctpty" maxlength="14" onkeyup="fun_number(this)" onblur="fun_number(this)"/>
																<span  class="STYLE1">*</span>
															</td>
															 
														</tr>
													</table>
													<table>
                                                    	
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td >
                                                    			<input name="addButton" type="button" style="cursor: pointer" class="button" value="保  存" onclick="ckeckwethornull();" />
																<input name="backButton" style="cursor: pointer" type="reset"
											class="button" value="重  置"  />
															</td>
                                                    		<td >&nbsp;</td>
                                                    	</tr>
                                                    	<tr><td colspan="4">&nbsp;</td></tr>
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
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
							</tr>
						</table>
					</td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
				</tr>
			</table>			
		</form>
	</body>
</html>
 