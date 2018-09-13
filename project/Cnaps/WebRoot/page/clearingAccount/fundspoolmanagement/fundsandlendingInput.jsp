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
		<META   HTTP-EQUIV="Pragma"   CONTENT="no-cache">   
		<META   HTTP-EQUIV="Cache-Control"   CONTENT="no-cache">   
		<META   HTTP-EQUIV="Expires"   CONTENT="0"> 
		<title>资金池/自动拆借管理查询申请</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<script type="text/javascript" src="<%=path%>/js/common/objectUtil.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/common/chineseUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>

		<script type="text/javascript">
			
			function commitForm(){
				if(VForm.Validate()){
					
					document.forms[0].submit();
				}
			  
			  
			}
			
			
		</script>
	</head>
	<body >
		<form method="post" name="myform"
			action="<%=path%>/FundsAndLendingAction.do?method=sendMessage">
			<input id="signval" type="hidden" value="sign0">
			<input type="hidden" name="token" value="${token}" />
			
			 
			 
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
						                  	<div  class="text_title"><span class="text_blue2"> 自动拆借管理录入</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		 
                                                <div class="table_body">
                                                   <div class="table_content">
                                                   
                                                 	<table>
                                                 			 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">	报文信息</span></td>
                                                      </tr>
                                                 		<tr>
															<td class="text_tablehead_b"  >
																		查询类型：：
																</td>
																<td>
																	<input name="po.queryType" id="queryType" type="text"
																		style="width: 180px;" maxlength="4"  onKeyPress="actkeyPress()"/>
																		<span name="validate" dataName="po.queryType" dataType="Empty" msg="拆入清算行行号不能为空！" class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																		清算日期：
																</td>
																<td >
																<input name="po.clearDate" id="clearDate" type="text"
																		style="width: 180px;" maxlength="10" readonly="readonly"  class="Wdate" onclick="WdatePicker()" />
																		<span name="validate" dataName="po.clearDate" dataType="Empty" msg="清算日期不能为空！" class="STYLE1">*</span>
																</tr>
																<tr>
											                  	<td  class="text_tablehead_b">
											                  		备注
											                  	</td>
											                  	<td colspan="3" >
											                   		<textarea name="po.remarkInfo" class="textarea_msg"  cols="50" rows="2" id="remarkInfo" onKeyPress="charPress()"></textarea>
											                   	</td>
											               		</tr>
																
																
																<tr>
																<td colspan="4" align="center">&nbsp;</td>
															</tr>
															<tr>
																<td colspan="4" align="center">
																		<span class="STYLE1">说明：红色*标注项为必填项</span>
																</td>
															</tr>	
																<tr>
																<td colspan="4" align="center">
																	<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="commitForm();" />
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
					</td>
					<td></td>

					
				</tr>
			</table>
		  


			</td>
			</tr>
			</table>
		</form>
	</body>
</html>
