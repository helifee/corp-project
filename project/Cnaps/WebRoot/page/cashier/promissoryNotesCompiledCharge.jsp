<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@page import="com.cnaps.hvps.persistence.info.Querybook"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean" prefix="bean" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html" prefix="html" %>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic" prefix="logic" %>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>
<%
	String path = request.getContextPath();
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title> 本票编押 </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/datePicker/WdatePicker.js"></script>
<script type="text/javascript" src="<%=path%>/js/ybjs/helpUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript">

 

</script>
		<script type="text/javascript">
		
		
		
			function checkAndSub(){
			var flag=1;
			 if(this.document.getElementById("code").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=0;
			 if(this.document.getElementById("num").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=0;
			 if(this.document.getElementById("money").value.replace(/(^\s*)|(\s*$)/g, "") == "") flag=0;
			 if(flag=0){
			 	alert("业务要素不完整！");
			 	return;
			 } 
			 else{
			 	this.document.forms[0].submit();
			 }
			}

		
			
		</script>
</head>
<body>

<html:form method="post" action="/BianYaAction.do?method=sendMessage">
	 
	<input id="repeatmark" type="hidden" value="0" />




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
						                  	<div  class="text_title"><span class="text_blue2">银行本票编押</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		<div class="table_body">
                                                      <div class="table_content">
                                                      <table >
																 
													 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">编押信息</span></td>
                                                      </tr>	
															<tr>
																<td class="text_tablehead_b" >
																	本票种类
																</td>
																<td>
																<select  name="po.benpiaoclass" id="benpiaoclass" style="width:180px;" title="本票种类">
																<option value="01"  selected="selected">现金本票</option>
																<option value="03"  >转账本票</option>
															</select><span  class="STYLE1">*</span>
																</td>
																<td class="text_tablehead_b" >
																	签发行行号
																</td>
																<td >
																<input style="width:180px;" name="po.signbankcode" id="signbankcode" type="text" readonly="readonly"
																		 title="签发行行号" value="${bankCode }"/>
																</td>
															</tr>
															
																<tr>
																<td class="text_tablehead_b" >
																		签发日期
																</td>
																<td>
																<input type="text" name="po.signdate" id="signdate"   class="Wdate" value="${workFormatDate }" onclick="WdatePicker()" />
																</td>
														
																<td class="text_tablehead_b" >
																	本票冠字码
																</td>
																<td >
																	<input style="width:180px;" name="po.code" id="code" type="text" size="19"
																		maxlength="19" title="本票冠字码" /><span  class="STYLE1">*</span>
																	
																</td>
															</tr>
															
															
															
															<tr>
															<td class="text_tablehead_b"  >
																	本票号码
																</td>
																<td >
																		<input name="po.num" id="num" type="text"
																		style="width: 180px;" title="本票号码" maxlength="35"/><span  class="STYLE1">*</span>
																 
																</td>
																<td class="text_tablehead_b" >
																	金额
																</td>
																<td >
															
																<input name="po.money" id="money" type="text"
																			 title="金额" maxlength="12"
																			 onKeyPress="amountPress()"
																			onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																			onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; " />
																	<span  class="STYLE1">*</span>
																
																</td>
															
																
															</tr>
															</table>
                                                </div>
                                                 <div class="table_content" align="center">
                                                 <br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="保  存" onclick="checkAndSub();"/>
										<br />
										<br />
										<span class="STYLE1">说明：红色*标注项为必填项</span>
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
				</tr>
			</table> 
</html:form>
</body>
</html>
