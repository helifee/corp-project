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
<title> ҵ���˻�����¼�� </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript">

var mxts=0;
var tabts=0;
	function changethlx()
	{		
		var lx = this.document.getElementById("rtrnTp").value;
		if(lx == "RP00" || lx == "")
		{
			if(tabts<=0){}
			else{
			 //ɾ��������ϸ�����Ӱ�ť��
			 for(var i=this.document.getElementById("ywmxtab").rows.length;i>0;i--){
			 	this.document.getElementById("ywmxtab").deleteRow(i-1);
			 }
			 mxts=0;
			 tabts=0;
			}
		}
		else
		{
			if(tabts<=0){
				//�������Ӱ�ť
				mxts=0;
				tabts++;
				var newTr0=this.document.getElementById("ywmxtab").insertRow();
				var newTd0=newTr0.insertCell();
				newTd0.className="text_tablehead_b";
				newTd0.innerHTML="��ϸ��������";
				var newTd1=newTr0.insertCell();
				newTd1.innerHTML="<input type='text' name='po.mxcount' id='mxcount' maxlength='12' readonly='readonly' value='0' />";
				var newTd2=newTr0.insertCell();
				newTd2.innerHTML="<input name='addButton' type='button'  style='cursor: pointer' class='button' value='��     ��' onclick='addmx();' />";
			}
			else{
				
			}
		}
	}
	
	function addmx(){
				//����һ��ҵ����ϸ
				//<input type="text" name="po.orgnlMsgId" id="orgnlMsgId" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)" /><span  class="STYLE1"> *</span>
				mxts++;
				tabts++;
				this.document.getElementById("mxcount").value=mxts;
				var nnewTr0=this.document.getElementById("ywmxtab").insertRow();
				var nnewTd0=nnewTr0.insertCell();
				nnewTd0.className="text_tablehead_b";
				nnewTd0.innerHTML="ԭ��ϸ��ʶ�ţ�";
				var nnewTd1=nnewTr0.insertCell();
				nnewTd1.innerHTML="<input type='text' name='polist.oriTrnsctnId' id='oriTrnsctnId' maxlength='35' onkeyup='fun_number(this)' onblur='fun_number(this)' />";
				/*var nnewTd2=nnewTr0.insertCell();
				nnewTd2.className="text_tablehead_b";
				nnewTd2.innerHTML="ԭ����ֱ�Ӳ������";
				var nnewTd3=nnewTr0.insertCell();
				nnewTd3.innerHTML="<input type='text' name='polist.orgnlDrctInstgPty' id='orgnlDrctInstgPty' maxlength='14' onkeyup='fun_number(this)' onblur='fun_number(this)' />";
				*/
				var nnewTd2=nnewTr0.insertCell();
				nnewTd2.innerHTML="<input name='delButton' type='button'  style='cursor: pointer' class='button' value='ɾ    ��' onclick='delmx(this);' /> <input type='hidden' name='xh' id='xh' readonly='readonly' style='width: 45px;'/>";
				/*
				var nnewTr1=this.document.getElementById("ywmxtab").insertRow();
				var nnewTd4=nnewTr1.insertCell();
				nnewTd4.className="text_tablehead_b";
				nnewTd4.innerHTML="ԭ����������";
				var nnewTd5=nnewTr1.insertCell();
				nnewTd5.innerHTML="<input type='text' name='polist.orgnlIndrctInstgPty' id='orgnlIndrctInstgPty' maxlength='14' onkeyup='fun_number(this)' onblur='fun_number(this)' />";
				var nnewTd6=nnewTr1.insertCell();
				nnewTd6.className="text_tablehead_b";
				nnewTd6.innerHTML="ԭ����ֱ�Ӳ������";
				var nnewTd7=nnewTr1.insertCell();
				nnewTd7.innerHTML="<input type='text' name='polist.orgnlDrctInstdPty' id='orgnlDrctInstdPty' maxlength='14' onkeyup='fun_number(this)' onblur='fun_number(this)' />";
				
				var nnewTr2=this.document.getElementById("ywmxtab").insertRow();
				var nnewTd8=nnewTr2.insertCell();
				nnewTd8.className="text_tablehead_b";
				nnewTd8.innerHTML="ԭ���ղ������";
				var nnewTd9=nnewTr2.insertCell();
				nnewTd9.innerHTML="<input type='text' name='polist.orgnlIndrctInstdPty' id='orgnlIndrctInstdPty' maxlength='14' onkeyup='fun_number(this)' onblur='fun_number(this)' />";
				var nnewTr3=this.document.getElementById("ywmxtab").insertRow();
				var nnewTd10=nnewTr3.insertCell();
				*/
	}
	
	function delmx(obj){
		mxts--;
		tabts--;
		this.document.getElementById("mxcount").value=mxts;
		var rowidx = obj.parentNode.parentNode.rowIndex; // ��ȡ�������ڱ���е��е�λ�ã���ɾ����ǰ�к���һ��
		//this.document.getElementById("ywmxtab").deleteRow(rowidx+3);
		//this.document.getElementById("ywmxtab").deleteRow(rowidx+2);
		//this.document.getElementById("ywmxtab").deleteRow(rowidx+1);
		this.document.getElementById("ywmxtab").deleteRow(rowidx);
	}
	
	
	
</script>
</head>
<body onload="changethlx();">

<html:form method="post" action="/businessReturnAction.do?method=sendMsg">
	<input id="business_name" type="hidden" value="businessReturn">
	<input id="repeatmark" type="hidden" value="0" />

 


	<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				
				
				
				<tr valign="top">
					
					
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
						                  	<div  class="text_title"><span class="text_blue2">ҵ���˻�����¼��</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																 <tr>
                                                      	<td colspan="5"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>
															
															<tr>
																<td class="text_tablehead_b" >
																		ԭ���ı�ʶ�ţ�
																</td>
																<td>
																		<input type="text" name="po.ornglMsgId" id="orgnlMsgId" maxlength="35" onkeyup="fun_number(this)" onblur="fun_number(this)" /><span  class="STYLE1"> *</span>
				               
																</td>
																<td class="text_tablehead_b" id="thlx" >
																	�˻����ͣ�
																</td>
																<td > 
																		<select name="po.rtrnTp" id="rtrnTp"  onchange="changethlx()">
										                               <option value="RP00">�����˻�</option>
			                   		                 	               <option value="RP01">�����˻�</option>
			                   	                                	</select>
																</td>
																<%--
																<td class="text_tablehead_b" >
																		ԭҵ�����ͣ�
																</td>
																<td >
																	<input type="text" name="po.oriPmtTp" id="oriPmtTp" maxlength="4" onkeyup="fun_number(this)" onblur="fun_number(this)" /><span  class="STYLE1"> *</span>
																	
																</td>
																 --%>
																<td> </td>
															</tr>
															
															<tr>
															
															</tr>
															<tr><td colspan='5'>
															<table id="ywmxtab">    
															</table>
															</td></tr>
															
														</table>
														
                                                 </div>
                                                	 
                                                   
                                                    
                                                     <div class="table_content" align="center">
                                                     <br />
										
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="ckeckwethornull();" />
										<br />
										<br />
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
										<br />
										<br />
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

