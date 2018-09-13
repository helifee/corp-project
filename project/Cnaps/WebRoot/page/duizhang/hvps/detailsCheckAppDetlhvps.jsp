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
		<title></title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
			
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/transfer/transferOfCash.js"></script>
		<script type="text/javascript" src="<%=path%>/js/transfer/addRow.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript" src="<%=path %>/js/systemManager/showeditpanel.js"></script>
		
	</head>
	<body >
		<form name="myform" method="post"
			action="<%=path%>/TransProcessAction.do?method=sendCheckMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			<!-- 防止重复提交 -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					<%-- 
					<td background="<%=path%>/image/content_table_line_L.jpg"></td>
					--%>
					<td
						></td>
					<td>
						<br />
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table border="0" cellspacing="0" cellpadding="0" align="center" >
											<tr>
											<td>
											
  												
  												<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" >
					                				<tr>
					                					<td colspan="6">
					                						<div  class="text_title"><span class="text_blue2">大额明细核对申请明细</span></div>
					                					</td>
					                				</tr>
                								</table>
  												<table width="95%" class="tbcolor" align="center" >
  													<tr class="text_list"   style="cursor: hand;" bgcolor="E6E6E6">
														<td   >报文标识号</td>
														<td  >&nbsp;${entity.msgid}</td>
														<td    class="text_tablehead_b" >报文发送时间</td>
														<td  >&nbsp;${entity.credttm}</td>
													</tr>
													<tr class="text_list"   style="cursor: hand;" bgcolor="E6E6E6">
														<td   >发起直接参与机构</td>
														<td  >&nbsp;${entity.instgdrctpty}</td>
														<td  class="text_tablehead_b"  >发起参与机构</td>
														<td  >&nbsp;${entity.instgpty}</td>
													</tr>
													<tr class="text_list"   style="cursor: hand;" bgcolor="E6E6E6">
														<td   class="text_tablehead_b" >接收直接参与机构</td>
														<td >&nbsp;&nbsp;${entity.instddrctpty}</td>
														<td   class="text_tablehead_b" >接收参与机构</td>
														<td >&nbsp;${entity.instdpty}</td>
													</tr>
													<tr class="text_list"   style="cursor: hand;" bgcolor="E6E6E6">
														<td   >系统类型</td>
														<td  >&nbsp;${entity.systemcd}</td>
														<td   >对账日期</td>
														<td  >&nbsp;${entity.chckdt}</td>
													</tr>
													<tr class="text_list"   style="cursor: hand;" bgcolor="E6E6E6">
														<td   >对账业务类型数目</td>
														<td  >&nbsp;${entity.nbofchckreq}</td>
														<td   >总记录数</td>
														<td  >&nbsp;${entity.ttlnb}</td>
													</tr>
													<tr class="text_list"   style="cursor: hand;" bgcolor="E6E6E6">
														<td   >本报文记录起始号</td>
														<td  >&nbsp;${entity.startnb}</td>
														<td   >本报文记录截止号</td>
														<td  >&nbsp;${entity.endnb}</td>
													</tr>
													<tr class="text_list"   style="cursor: hand;" bgcolor="E6E6E6">
														<td   >原报文标识号</td>
														<td  >&nbsp;${entity.orgnlmsgid}</td>
														<td   >原发起参与机构</td>
														<td  >&nbsp;${entity.orgnlinstgpty}</td>
													</tr>
													<tr class="text_list"   style="cursor: hand;" bgcolor="E6E6E6">
														<td   >原报文类型号</td>
														<td  >&nbsp;${entity.orgnlmsgtpcd}</td>
														<td   >处理状态</td>
														<td  >&nbsp;${entity.prcsts}</td>
													</tr>
													<tr class="text_list"   style="cursor: hand;" bgcolor="E6E6E6">
														<td   >处理码</td>
														<td  >&nbsp;${entity.prccd}</td>
														<td   >拒绝信息</td>
														<td  >&nbsp;${entity.rjctinf}</td>
													</tr>
													<tr class="text_list"   style="cursor: hand;" bgcolor="E6E6E6">
														<td   >NPC接收日期</td>
														<td  >&nbsp;${entity.npcrcvdt}</td>
														<td   >NPC处理时间</td>
														<td  >&nbsp;${entity.npctrnsmttm}</td>
													</tr>
													
  												</table>
											</td>
											</tr>
											
											<tr>
												<td>&nbsp;</td>
											</tr>
										</table>


										<br />
										
										<br />
									</div>
								</td>
							</tr>
						</table>
					</td>
					<td
						style="FILTER:progid:DXImageTransform.Microsoft.Gradient(gradientType = 0, startColorStr = #FFFFFF, endColorStr = #99bbe8);"></td>

					<%--
					<td background="<%=path%>/image/content_table_line_R.jpg"></td> --%>
				</tr>
			</table>

		</form>
	</body>
</html>
