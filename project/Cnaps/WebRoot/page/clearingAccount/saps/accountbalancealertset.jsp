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
		<title> 清算账户余额警戒值设置管理 </title>
		<link href="<%=path%>/css/page_color.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/systemGroupManage/addGroup.js"></script>
		<script type="text/javascript" src="<%=path %>/js/ybjs/hvps111.js"></script>
		<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
	</head>
	<body onload="selectLoad();">
		<form method="post" action="<%=path%>/demoAction.do?method=findList">
		  <input id="signval" type="hidden" value="sign0">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48" ></td>
					<td >
						&nbsp;
					</td>
					<td width="8" ></td>
				</tr>
				<tr valign="top">
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);" ></td>
					<td style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#FFFFFF,endColorStr=#99bbe8);">
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table border="0" cellspacing="0" cellpadding="0">											
											<tr>
												<td>							  			  			
													<fieldset style="width:700px;border:1px #CCCCCC solid; padding:3px;" align="center" >
													<table border="0" cellspacing="0" cellpadding="0" align="center">														
														<tr>	
															<td class="text_tablehead_b" align="right" width="140px">被设置清算行行号：</td>
															<td>
																<input type="text" name="po.mmbid"/>
															</td>															
															<td class="text_tablehead_b" align="right" width="140px">预警开启关闭类型：</td>
															<td>
																<select name="po.swtchtp" title="预警开启关闭类型">
																	<option value="ST00">开启</option>
																	<option value="ST01">关闭</option>
																</select>
															</td>
														 </tr>
														 <tr>
															<td class="text_tablehead_b" align="right" width="140px">清算账户警戒金额：</td>
															<td>
																<input type="text" name="po.acctwrngval"/>
															</td>
															<td class="text_tablehead_b" align="right" width="140px">警戒金额正负标志：</td>
															<td>
																<select name="po.wrngplusmnstp" title="警戒金额正负标志">
																	<option value="PM00">正金额</option>
																	<option value="PM01">负金额</option>
																</select>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
										<br />
										<br />
										<input name="addButton" type="button" style="cursor: pointer" class="button" value="提  交" onclick="nullsubmit();" />
										&nbsp;
										<input name="backButton" style="cursor: pointer" type="button" class="button" value="返  回" onclick="history.back();" />
										<br />
										<br />
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
 
