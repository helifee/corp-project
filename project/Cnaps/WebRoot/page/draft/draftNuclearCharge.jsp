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
		<title>���л�Ʊ��Ѻ</title>
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
									 +"title='�Ҹ��к�' value=''  />"
				+"<span name='validate' dataName='dbtrBrnchId' dataType='Empty' msg='�Ҹ��кŲ���Ϊ��!' class='STYLE1'> * </span>";
			}
			else if(obj=='CT00'||obj=='CT01'){
				obj0.innerHTML="<input style='width: 180px;' name='eme.dbtrBrnchId'"
									+"id='dbtrBrnchId' type='text' size='19' maxlength='19'"
									 +"title='�Ҹ��к�' readonly='readonly' value='0' />";
				obj1.innerHTML="<input style='width: 180px;' name='eme.checkNum'"
									+"id='eme.checkNum' type='text' readonly='readonly'"
									+"title='�鸴���' value='0' />";
			}
			else if(obj=='CT03'){
				obj0.innerHTML="<input style='width: 180px;' name='dbtrBrnchId'"
									+"id='dbtrBrnchId' type='text' size='19' maxlength='19'"
									 +"title='�Ҹ��к�' readonly='readonly' value='0' />";
				obj1.innerHTML="<input style='width: 180px;' name='eme.checkNum'"
									+"id='checkNu' type='text' "
									+"title='�鸴���' />";
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
			 	alert("����Ʊ����Ϊ�ֽ��Ʊʱ,�Ҹ��к�Ϊ������!");
			 	return;
			 }
			 
			if(VForm.Validate()){
				if(notesNo.value.length!=8) {
					alert("��Ʊ�����������8λ!");
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
														<span class="text_blue2">���л�Ʊ��Ѻ</span>
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
																		<span class="text_tablehead">��Ʊ��Ϣ</span>
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		��Ʊ����
																	</td>
																	<td>
																		<select name="eme.businessSizeCode"
																			id="businessSizeCode" style="width: 180px;"
																			onchange="check0(this.value);"
																			title="��Ʊ����">
																			<option value="">
																				��ѡ��
																			</option>
																			<option value="CT00">
																				��ת�û�Ʊ
																			</option>
																			<option value="CT01">
																				����ת�û�Ʊ
																			</option>
																			<option value="CT02">
																				�ֽ��Ʊ
																			</option>
																			<option value="CT03">
																				�鸴��
																			</option>
																		</select>
																		<span name="validate" dataName="eme.businessSizeCode" dataType="Empty" msg="��Ʊ���಻��Ϊ�գ�" class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		ǩ�����к�
																	</td>
																	<td>
																		<input style="width: 180px;" name="eme.issuerBk"
																			id="issuerBk" type="text" readonly="readonly"
																			title="ǩ�����к�" value="${bankCode}" />
																	</td>
																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		ǩ������
																	</td>
																	<td>
																		<input type="text" name="eme.notesDt" id="notesDt"
																			class="Wdate" onclick="WdatePicker()" />
																			<span name="validate" dataName="eme.notesDt" dataType="Empty" msg="ǩ�����ڲ���Ϊ�գ�" class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		�Ҹ��к�
																	</td>
																	<td id='dfhh'>
																		<input style="width: 180px;" name="eme.dbtrBrnchId"
																			id="dbtrBrnchId" type="text" size="19" maxlength="19"
																			title="�Ҹ��к�" readonly="readonly" />
																	</td>
																</tr>
																<tr>
																	<td class="text_tablehead_b">
																		��Ʊ����
																	</td>
																	<td>
																		<input name="eme.notesNo" id="notesNo"
																			type="text" style="width: 180px;" title="��Ʊ����" onkeyup="limitLength(this.value,8,'��ʾ��','notesNo')"
																			maxlength="35" />
																		<span name="validate" dataName="eme.notesNo" dataType="Empty" msg="��Ʊ���벻��Ϊ�գ�" class="STYLE1">*</span>
																	</td>
																	<td class="text_tablehead_b">
																		���
																	</td>
																	<td>
																		<input name="eme.moneyNum" id="moneyNum" type="text"
																			title="���" maxlength="12" onkeypress="amountPress()"
																			onKeyPress="amountPress()"
																		onkeyup="value=value.replace(/[^\d.,]/g,'')  "
																		onblur="value=fmoney(value, 2);if(value == 'NaN.undefined') value = ''; " />
																		<span name="validate" dataName="eme.moneyNum" dataType="Empty" msg="����Ϊ�գ�" class="STYLE1">*</span>
																	</td>

																</tr>

																<tr>
																	<td class="text_tablehead_b">
																		�鸴���
																	</td>
																	<td id="cfsh">
																		<input style="width: 180px;" name="eme.checkNum" onkeyup="limitLength(this.value,8,'��ʾ��','notesNo')"
																			id="checkNum" type="text" readonly="readonly"
																			title="�鸴���"  />
																	</td>
																	<td class="text_tablehead_b">
																		��Ʊ��Ѻ
																	</td>
																	<td id="hpmy">
																		<input style="width: 180px;" name="eme.encodeNo" 
																			id="encodeNo" type="text" 
																			title="��Ʊ��Ѻ"  />
																		<span name="validate" dataName="eme.encodeNo" dataType="Empty" msg="��Ʊ��Ѻ����Ϊ�գ�" class="STYLE1">*</span>
																	</td>
																</tr>
															</table>
														</div>
														<div class="table_content" align="center">
														
														<table>
                                                    		<tr>
                                                    			<td >
                                                    				<input name="addButton" type="button" style="cursor: pointer"
																		class="button" value="��  ��" onclick="checkAndSub();" />
                                                    			</td>
                                                    			<td >&nbsp;
                                                    				<input name="backButton" style="cursor: pointer" type="reset"
																		class="button" value="��  ��"  />
                                                    			</td>
                                                    		</tr>
                                                    	</table>
														</div>
														<div class="table_content" align="center">
															<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
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
