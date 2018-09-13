<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-logic" prefix="logic"%>
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
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=path %>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path %>/js/common/check.js"></script>
		<script type="text/javascript">

          function commitForm(){
           var msg = "@";
					var acctid = document.getElementById("acctid");
				if(isNull(trim(acctid.value))){
					msg += acctid.title+"不能为空！@";
				    }
				    
				    	var boo = msgSplit(msg);
				    	if(boo){
			return document.forms[0].submit();
				}
		}	 
		</script>

	</head>
	<body>
		<html:form method="post"
			action="/applicationEnterAction.do?method=sendMessage">
			<input type="hidden" name="token" value="${token}" />			
			<!-- 防止重复提交 -->
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td width="8" height="48"></td>
					<td>
						&nbsp;
					</td>
					<td width="8"></td>
				</tr>
				<tr valign="top">
					<td></td>
					<td>

						<table width="100%" border="0" cellspacing="0" cellpadding="0"
							align="center">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<table width="75%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td>
													<div class="text_title">
														<span class="text_blue2">净借记限额查询申请</span>
														</div>
												</td>
											</tr>
											</table>
											<table width="75%" border="0" cellspacing="0" cellpadding="0" class="table_body">
											<tr>
												<td>
													<div >
														<table >
															<tr>
																<td colspan="4">
																	&nbsp;
																</td>
															</tr>
															<tr>
																<td colspan="4">
																	<span class="text_tablehead">发起机构信息</span>
																</td>
															</tr>
															<tr>
																<td class="text_tablehead_b">
																	发起直接参与机构：
																	
																</td>
																<td colspan="3">
																	<input name="acctid" id="acctid" type="text" value="${sessionScope.bankInfo.directbankcode }" readonly="readonly"
																		style="width: 180px;" title="发起直接参与机构" /><font color="#FF0000">*</font>
																</td>
															</tr>
															<tr>
																<td colspan="4" >&nbsp;</td>
															</tr>
															<tr>
															<td colspan="3" >&nbsp;</td>
																<td  align="left">
																		<span class="STYLE1" align="right">说明：红色*标注项为必填项</span>
																	
																</td>
															</tr>
															
															<tr>
																<td colspan="4" align="right">
																	<div>
																		<input name="addButton" type="button"
																			style="cursor: pointer" class="button" value="保  存"
																			onclick="commitForm();" />
																	</div>
																</td>
															</tr>
															<tr>
																<td colspan="4" >&nbsp;</td>
															</tr>
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
				</tr>
			</table>
	</html:form>
	</body>
</html>