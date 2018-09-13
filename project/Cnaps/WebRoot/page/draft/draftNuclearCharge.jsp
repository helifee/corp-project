<%@ page contentType="text/html; charset=GBK" language="java"%>
<%@ page language="java" pageEncoding="gbk"%>
<%@page import="com.cnaps.hvps.persistence.info.Querybook"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-bean"
	prefix="bean"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-html"
	prefix="html"%>
<%@ taglib uri="http://jakarta.apache.org/struts/tags-logic"
	prefix="logic"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%
	String path = request.getContextPath();
%>

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
		<title>银行汇票编押</title>
		<link href="<%=path%>/css/page_color1.css" rel="stylesheet"
			type="text/css" />
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js"></script>
		<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/validateUtil.js"></script>
		<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
		<script type="text/javascript"
			src="<%=path%>/js/datePicker/WdatePicker.js"></script>
		<script type="text/javascript">
		function check0(obj){
				var obj0=this.document.getElementById('dfhh');
				var obj1=this.document.getElementById('cfsh');
			if(obj=='CT02'){
				obj0.innerHTML="<input style='width: 180px;' name='eme.dbtrBrnchId'"
									+"id='dbtrBrnchId' type='text' size='19' maxlength='19'"
									 +"title='兑付行号' value=''  />"
				+"<span name='validate' dataName='dbtrBrnchId' dataType='Empty' msg='兑付行号不能为空!' class='STYLE1'> * </span>";
			}
			else if(obj=='CT00'||obj=='CT01'){
				obj0.innerHTML="<input style='width: 180px;' name='eme.dbtrBrnchId'"
									+"id='dbtrBrnchId' type='text' size='19' maxlength='19'"
									 +"title='兑付行号' readonly='readonly' value='0' />";
				obj1.innerHTML="<input style='width: 180px;' name='eme.checkNum'"
									+"id='eme.checkNum' type='text' readonly='readonly'"
									+"title='查复书号' value='0' />";
			}
			else if(obj=='CT03'){
				obj0.innerHTML="<input style='width: 180px;' name='dbtrBrnchId'"
									+"id='dbtrBrnchId' type='text' size='19' maxlength='19'"
									 +"title='兑付行号' readonly='readonly' value='0' />";
				obj1.innerHTML="<input style='width: 180px;' name='eme.checkNum'"
									+"id='checkNu' type='text' "
									+"title='查复书号' />";
			}
		}


</script>
		<script type="text/javascript">
		
		
		
			function checkAndSub(){
			var obj=this.document.getElementById("dbtrBrnchId");
			var obj1=this.document.getElementById("businessSizeCode");
			var notesNo=this.document.getElementById("notesNo");
			var checkObj=this.document.getElementById("checkNum");
			
			
			 if(obj.value==""&&obj1.value=='CT02'){
			 	alert("当汇票种类为现金汇票时,兑付行号为必输项!");
			 	return;
			 }
			 
			if(VForm.Validate()){
				if(notesNo.value.length!=8) {
					alert("汇票号码必须输入8位!");
					return;
				}
				this.document.getElementById('moneyNum').value=rmoney(this.document.getElementById('moneyNum').value); 
				this.document.forms[0].submit();
			}}

			
			
		</script>
	</head>
	<body>
		<html:form method="post"
			action="/movefundAction.do?method=decodeMsg">
			<input id="repeatmark" type="hidden" value="0" />
			<input id="encodeType" name="eme.encodeType" type="hidden" value="1" />
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr valign="top">

					<td><br></td>
					<td>
						<table width="100%" border="0" cellspacing="0" cellpadding="0">
							<tr>
								<td width="10">
									&nbsp;
								</td>
								<td>
									<div align="center">
										<br />
										<table width="689" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td>
													<div class="text_title">
														<span class="text_blue2">银行汇票核押</span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div class="table_body">
														<div class="table_content">
															<table>

																<tr>
																	<td colspan="4">
																		<span class="text_tablehead">汇票信息</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		汇票种类
																	</td>
																	<td>
																		<select name="eme.businessSizeCode"
																			id="businessSizeCode" style="width: 180px;"
																			onchange="check0(this.value);"
																			title="汇票种类">
																			<option value="">
																				请选择
																			</option>
																			<option value="CT00">
																				可转让汇票
																			</option>
																			<option value="CT01">
																				不可转让汇票
																			</option>
																			<option value="CT02">
																				现金汇票
																			</option>
																			<option value="CT03">
																				查复书
																			</option>
																		</select>
																		<span name="validate" dataName="eme.businessSizeCode" dataType="Empty" msg="汇票种类不能为空！" class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		签发行行号
																	</td>
																	<td>
																		<input style="width: 180px;" name="eme.issuerBk"
																			id="issuerBk" type="text" readonly="readonly"
																			title="签发行行号" value="${bankCode}" />
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		签发日期
																	</td>
																	<td>
																		<input type="text" name="eme.notesDt" id="notesDt"
																			class="Wdate" onclick="WdatePicker()" />
																			<span name="validate" dataName="eme.notesDt" dataType="Empty" msg="签发日期不能为空！" class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		兑付行号
																	</td>
																	<td id='dfhh'>
																		<input style="width: 180px;" name="eme.dbtrBrnchId"
																			id="dbtrBrnchId" type="text" size="19" maxlength="19"
																			title="兑付行号" readonly="readonly" />
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		汇票号码
																	</td>
																	<td>
																		<input name="eme.notesNo" id="notesNo"
																			type="text" style="width: 180px;" title="汇票号码" onkeyup="limitLength(this.value,8,'提示：','notesNo')"
																			maxlength="35" />
																		<span name="validate" dataName="eme.notesNo" dataType="Empty" msg="汇票号码不能为空！" class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		金额
																	</td>
																	<td>
																		<input name="eme.moneyNum" id="moneyNum" type="text"
																			title="金额" maxlength="12" onkeypress="amountPress()"
																			onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; " />
																		<span name="validate" dataName="eme.moneyNum" dataType="Empty" msg="金额不能为空！" class="STYLE1">*</span>
																	</td>

																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		查复书号
																	</td>
																	<td id="cfsh">
																		<input style="width: 180px;" name="eme.checkNum" onkeyup="limitLength(this.value,8,'提示：','notesNo')"
																			id="checkNum" type="text" readonly="readonly"
																			title="查复书号"  />
																	</td>
																	<td class="text_tablehead_b">
																		汇票密押
																	</td>
																	<td id="hpmy">
																		<input style="width: 180px;" name="eme.encodeNo" 
																			id="encodeNo" type="text" 
																			title="汇票密押"  />
																		<span name="validate" dataName="eme.encodeNo" dataType="Empty" msg="汇票密押不能为空！" class="STYLE1">*</span>
																	</td>
																</tr>
															</table>
														</div>
														<div class="table_content" align="center">
														
														<table>
                                                    		<tr>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="保  存" onclick="checkAndSub();" />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    				<input name="backButton" style="cursor: pointer" type="reset"
																		class="button" value="重  置"  />
                                                    			</td>
                                                    		</tr>
                                                    	</table>
														</div>
														<div class="table_content" align="center">
															<span class="STYLE1">说明：红色*标注项为必填项</span>
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
