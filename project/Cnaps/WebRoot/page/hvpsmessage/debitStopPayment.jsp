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
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>���ֹ��¼��</title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript">

	var tabcount=1; //�������
	var mxxh = 0;  // ��ϸ����
	
	function funaddmx()
	{
		mxxh++;
		tabcount++;
		this.document.getElementById("countofmx").value=mxxh;
		
		//��̬����к���
		var newTr0 = this.document.getElementById("mxywxx_tb").insertRow();
		var newTd0 = newTr0.insertCell(); //ԭ��ϸ��ʶ��
		newTd0.className="text_tablehead_b";
		newTd0.innerHTML="ԭ��ϸ��ʶ��";
		var newTd1 = newTr0.insertCell(); //
		newTd1.className="text_tablehead_b";
		newTd1.innerHTML="<input type='text' name='tempbd"+(mxxh-1)+"orgnlTxId' id='orgnlTxId' maxlength='12' onkeyup='fun_number(this)' onblur='fun_number(this)' /><span class='STYLE1'>*</span>";
		var newTd2 = newTr0.insertCell(); //ԭҵ�����ͱ���
		newTd2.className="text_tablehead_b";
		newTd2.innerHTML="ԭҵ�����ͱ���";
		var newTd3 = newTr0.insertCell();
		newTd3.className="text_tablehead_b";
		newTd3.innerHTML="<input type='text' name='tempbd"+(mxxh-1)+"orgnlPmtTp' id='orgnlPmtTp' maxlength='12' onkeyup='fun_number(this)' onblur='fun_number(this)' /><span class='STYLE1'>*</span>";
		var newTd4 = newTr0.insertCell(); //ɾ����ť
		newTd4.className="text_tablehead_b";
		newTd4.innerHTML="<input type='button'class='button' value='ɾ��'  onclick='fundelmx(this)'/><input type='hidden' name='xh' id='xh' readonly='readonly' style='width: 45px;'/>";
		
		var newTr1 = this.document.getElementById("mxywxx_tb").insertRow();
		var newTd5 = newTr1.insertCell(); //ԭ�������к�
		newTd5.className="text_tablehead_b";
		newTd5.innerHTML="ԭ�������к�";
		var newTd6 = newTr1.insertCell(); //
		newTd6.className="text_tablehead_b";
		newTd6.innerHTML="<input type='text' name='tempbd"+(mxxh-1)+"orgnlDbtrBrnchId' id='orgnlDbtrBrnchId' maxlength='12' onkeyup='fun_number(this)' onblur='fun_number(this)' /><span class='STYLE1'>*</span>";
		var newTd7 = newTr1.insertCell(); //ԭ�տ����к�
		newTd7.className="text_tablehead_b";
		newTd7.innerHTML="ԭ�տ����к�";
		var newTd8 = newTr1.insertCell();
		newTd8.className="text_tablehead_b";
		newTd8.innerHTML="<input type='text' name='tempbd"+(mxxh-1)+"orgnlCdtrBrnchId' id='orgnlCdtrBrnchId' maxlength='12' onkeyup='fun_number(this)' onblur='fun_number(this)' /><span class='STYLE1'>*</span>";
		
		var newTr2 = this.document.getElementById("mxywxx_tb").insertRow();
		var newTd9=newTr2.insertCell();
		newTd9.classNmae="text_tablehead_b";
		newTd9.innerHTML="<div align='right'>����</div>";
		var newTd10 = newTr2.insertCell(); //����			
		newTd10.className="text_tablehead_b";
		newTd10.colSpan="3"; 
		newTd10.innerHTML="<div align='left'><textarea name='tempbd'"+(mxxh-1)+"'addtlInf'  cols='69' rows='2' id='msgcnt' onKeyPress='charPress()'></textarea></div>";
		// ���µ���ѭ������Ÿ�ֵ
		var mxleng = mxxh;
		while(mxleng >0)
		{
			this.document.getElementsByName("xh")[mxleng-1].value = mxleng;
			mxleng--;
			
		}
		
		
		//this.document.getElementById("gkzjjjhb_fjxx").rowSpan=7+mxxh;  // ���ÿ���
	}
	
		function fundelmx(obj)
	{
		mxxh--;
		tabcount--;
		this.document.getElementById("countofmx").value=mxxh;
		
		var rowidx = obj.parentNode.parentNode.rowIndex; // ��ȡ�������ڱ���е��е�λ�ã���ɾ����ǰ�к���һ��
		this.document.getElementById("mxywxx_tb").deleteRow(rowidx+2);
		this.document.getElementById("mxywxx_tb").deleteRow(rowidx+1);
		this.document.getElementById("mxywxx_tb").deleteRow(rowidx);
		
		var mxleng = mxxh;
		while(mxleng >0)
		{			
			this.document.getElementsByName("xh")[mxleng-1].value = mxleng;
			mxleng--;
		}
		
		
	}
	
		function funzhengbao()
	{
	
		var obj=document.getElementById("grpCxlId");
		var SP=obj.options[obj.selectedIndex].value;
		 	if(SP='SP00'){
				while(tabcount>1) {
				this.document.getElementById("mxywxx_tb").deleteRow(tabcount);;
				tabcount--;
			}	
		}
		}
	

</script>


</head>
<body><br>
<html:form method="post" action="/debitStopPaymentAction.do?method=sendMsg">
	<input id="business_name" type="hidden" value="debitStopPaymentForm">
	<input id="repeatmark" type="hidden" value="0">
	<table id="querybook" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
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
	    	<td ></td>
	    	<td >
	    	
	      		<table width="75%" border="0" cellspacing="0" cellpadding="0" align="center">
	        		
			       <tr>
					 <td  >
						<div  class="text_title"><span class="text_blue2">���ֹ��¼��</span></div>
					</td>
				 </tr>
	        		<tr>
	          			<td>
		          			<div class="table_body">
                              
                                   <table class="table_content">
                                   <tr><td colspan="5">&nbsp;</td></tr>
                                   <tr>
                                   	<td colspan="5"><span class="text_tablehead">������Ϣ</span></td>
                                   </tr>
                                   <%-- 
                                   	<tr>
										<td  class="text_tablehead_b">
				                		����ֱ�Ӳ������
				                	</td>
				                  	<td><div >
				                   		<input type="text" name="po.instgDrctPty" id="instgDrctPty" value="${bankInfo.sttlmagtid}"  maxlength="12" > <span  class="STYLE1">*</span>
				                  	</td>
				                  	<td  class="text_tablehead_b">
				                  		 ����ֱ�Ӳ������
				                  	</td>
				                  	<td >
				                   		<input type="text" name="po.instdDrctPty" id="instdDrctPty"  maxlength="12" onkeyup="fun_number(this)" onblur="fun_number(this)">
				                  		<span  class="STYLE1">*</span>
				                  	</td>
				                 </tr>
				                 
				                 <tr>
												<td colspan="5">
													<span class="text_tablehead">������Ϣ</span>
												</td>
											</tr>
				                 
				                 <tr>
												<td class="text_tablehead_b">
													�����Ӳ�������к�
												</td>
												<td>
													<div>
														<input type="text" name="po.instgInDrctPty"
															id="instgInDrctPty" maxlength="12"
															onkeyup="fun_number(this)" onblur="fun_number(this)">
														
													</div>
												</td>
												<td class="text_tablehead_b">
													���ռ�Ӳ�������к�
												</td>
												<td>
													<input type="text" name="po.instdInDrctPty"
														id="instdInDrctPty " maxlength="12"
														onkeyup="fun_number(this)" onblur="fun_number(this)">
													
												</td>
											</tr>
											--%>
											<tr>
												<td class="text_tablehead_b">
													ֹ�����ͱ�ʶ
												</td>
												<td>
													<div>
															<select name="po.grpCxlId" id="grpCxlId" onchange="">
																<option value="SP00">����ֹ��</option>
																<option value="SP01">����ֹ��</option>
															</select>
													</div>
												</td>
												<td class="text_tablehead_b">
													ԭ����ֱ�Ӳ������
												</td>
												<td>
													<input type="text" name="po.orgnlInstdDrctPty" id="orgnlInstdDrctPty"
														maxlength="12" onkeyup="fun_number(this)"
														onblur="fun_number(this)">
													<span class="STYLE1">*</span>
												</td>
											</tr>
											<tr>
												<td class="text_tablehead_b">
													ԭ���ı�ʶ��
												</td>
												<td>
													<div>
														<input type="text" name="po.orgnlMsgId"
															id="orgnlMsgId" maxlength="12"
															onkeyup="fun_number(this)" onblur="fun_number(this)">
														<span class="STYLE1">*</span>
													</div>
												</td>
												<%--
												<td class="text_tablehead_b">
													ԭ�������ͺ�
												</td>
												<td>
													<input type="text" name="po.orgnlMsgTpCd" id="orgnlMsgTpCd"
														maxlength="12" onkeyup="fun_number(this)"
														onblur="fun_number(this)">
													<span class="STYLE1">*</span>
												</td>
												 --%>
											</tr>
											<tr>
												<td colspan="5">
													<table id="mxywxx_tb" border="0"   cellpadding="0" cellspacing="0">
														<tr>
															<td colspan="5">
																<span class="text_tablehead">��ϸҵ����Ϣ</span>
															</td>
														</tr>
														<tr>
															<td >
																<span id='mxzts' name='mxzts' class="text_tablehead_b" value='1'>��ϸ������</span>
															</td>
															<td >
																<input type='text' name='po.mxcount' id='countofmx' maxlength='12' readonly='readonly' value='1' />
															</td>
															<td>
																<input type='button'class='button' value='����'  onclick='funaddmx()'/>
															</td>
														</tr>
													</table>
												</td>
											</tr>
											
											


											
											
											
				                 
				                 
		          					</table>
		          					 <table>
                                                    	<tr><td colspan="5">&nbsp;</td></tr>
                                                    	<tr>
                                                    	
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td >
                                                    			<div class="table_content" align="center">
                                                    			<input name="addButton" type="button" style="cursor: pointer" class="button" value="��  ��" onclick="ckeckwethornull();" />
                                                    			</div>
															</td>
                                                    		<td >&nbsp;</td>
                                                    	</tr>
                                                    	<tr><td colspan="5">&nbsp;</td></tr>
                                                    	<tr>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td class="text_tablehead_b">&nbsp;</td>
                                                    		<td >
                                                    			<div class="table_content" align="center">
                                                    			<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
                                                    			</div>
															</td>
                                                    		<td >&nbsp;</td>
                                                    	</tr>
                                                    	<tr><td colspan="5">&nbsp;</td></tr>
                                                    </table>
		          			</div>
		          			 <div class="table_content">
                                                   
                                                    </div>
                                                    
		          			    			
	            		</td>
	        		</tr>
	    		</table>
	    		
	    	</td>	    	
	    	<td >fun
	  	</tr>  
	</table>
</html:form>
</body>
</html>
