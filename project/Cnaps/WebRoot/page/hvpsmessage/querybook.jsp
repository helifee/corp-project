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
<title> ��ѯ��¼�� </title>
<link href="<%=path%>/css/page_color1.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="<%=path%>/ext2.2.1/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-base.js" ></script>
<script type="text/javascript" src="<%=path%>/ext2.2.1/ext-all.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/pathUtil.js"></script>
<script type="text/javascript" src="<%=path%>/js/common/check.js"></script>
<script type="text/javascript">
	function commitForm(){
				
				
			   var msg = "@";
				var instdPty = document.getElementById("instdPty");
				var msgid = document.getElementById("msgid");
			 
				 if(isNull(trim(instdPty.value))){
					msg += instdPty.title+"����Ϊ�գ�@";
				    }
                      if(isNull(trim(msgid.value))){
					msg += msgid.title+"����Ϊ�գ�@";
				    }
			 
			 
				 
		 
			 
				var boo = msgSplit(msg);
				 
			  	 
	
				if(boo){
				 document.forms[0].submit();
					}
				 
		 }
		 //<option value="beps.121.001.01">�ͻ�������ͨ����ҵ����</option>   ����������ͷ��
//<option value="beps.122.001.01">���ڻ���������ͨ����ҵ����</option> ����������ͷ��
	// <option value="beps.127.001.01">��ͨ���ҵ����</option> //����������ͷ��
	//<option value="beps.131.001.01">ʵʱ���ҵ����</option> //����������ͷ��	 Ԫ��ϸ��ʾ��
		 function zcx(value){
		 var sel=document.getElementById('querytype') ;
		   if(value=="beps.121.001.01"||value=="beps.122.001.01"||value=="beps.127.001.01"||value=="beps.131.001.01"){
		      
		   }else{
		        sel.options.length=0; 
		    	var opt = document.createElement('option');
						opt.setAttribute('value','QT00');
						opt.innerText ="������ѯ";
						sel.appendChild(opt);		 
						  }
		 
		 }
		  function zcxname(obj){
		 
		   if(obj.value== "QT01" ){
		       document.getElementById("p").style.display="block";
		      
		   } else{
		    document.getElementById("p").style.display="none";
		   }
		 
		 }
</script>
</head>
<body>

<html:form method="post" action="/querybookAction.do?method=sendMsg&business=${business}">
	<input id="business_name" type="hidden" value="querybook">
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
						                  	<div  class="text_title"><span class="text_blue2">��ѯ��¼��</span></div>
						                  </td>
						                </tr>
                                         <tr>
                                           <td>
                                           		<div class="table_body">
                                                     <div class="table_content">
                                                      <table >
																 <tr>
                                                      	<td colspan="4"><span class="text_tablehead">������Ϣ</span></td>
                                                      </tr>
															
															<tr>
																<td class="text_tablehead_b" >
																		ԭ������������
																</td>
																<td>
																		<input type="text" name="po.instdPty" id="instdPty" maxlength="14" onkeyup="fun_number(this)"/><span  class="STYLE1"> *</span>
				               
																</td>
														 	 			<td class="text_tablehead_b" >
																		ԭ�������ͱ��룺
																</td>
																<td >
																	<select name="po.msgcode" id="msgcode" style="width: 180px;" onchange="zcx(this.vaue)" >
	<option value="hvps.111.001.01">�ͻ�������ҵ����</option>
	<option value="hvps.112.001.01">���ڻ���������ҵ����</option> 
	<option value="hvps.141.001.01">��ʱת�˱���</option> 
	<option value="beps.121.001.01">�ͻ�������ͨ����ҵ����</option> 
	<option value="beps.122.001.01">���ڻ���������ͨ����ҵ����</option> 
	<option value="beps.125.001.01">���ڴ���ҵ����</option> 
	<option value="beps.127.001.01">��ͨ���ҵ����</option>
	<option value="beps.128.001.01">��ͨ���ҵ���ִ����</option> 
	<option value="beps.130.001.01">CISͨ�û�ִҵ����</option> 
	<option value="beps.133.001.01">���ڽ��ҵ����</option> 
	<option value="beps.134.001.01">���ڽ��ҵ���ִ����</option>
	<option value="beps.380.001.01">��������ҵ����</option> 
	<option value="beps.381.001.01">��������ҵ���ִ����</option> 
	<option value="beps.382.001.01">��������ҵ����</option> 
	<option value="beps.383.001.01">��������ҵ���ִ����</option> 
	<option value="beps.411.001.01">���ҵ��ֹ�����뱨��</option>
	<option value="beps.412.001.01">���ҵ��ֹ��Ӧ����</option>
	<option value="ccms.314.001.01">ҵ���ѯ����</option> 
	<option value="ccms.315.001.01">ҵ��鸴����</option> 
	<option value="ccms.318.001.01">ҵ���˻����뱨��</option> 
	<option value="ccms.319.001.01">ҵ���˻�Ӧ����</option>
	<!-- <option value="CMT100">���֧������(һ��)</option> 
	<option value="CMT231">��ʱת�˱���(һ��)</option> 
	<option value="PGK001">��ͨ����ҵ���(һ��)</option> 
	<option value="PGK005">���ڴ���ҵ���(һ��)</option> 
	<option value="PGK002">��ͨ���ҵ���(һ��)</option> 
	<option value="PGK008">��ͨ��ǻ�ִ��(һ��)</option> 
	<option value="PGK006">���ڽ��ҵ���(һ��)</option> 
	<option value="PGK011">���ڽ�ǻ�ִ��(һ��)</option>
	<option value="CMT327">���ҵ��ֹ�����뱨��(һ��)</option> 
	<option value="CMT328">���ҵ��ֹ��Ӧ����(һ��)</option> 
	<option value="CMT301">��ѯ����(һ��)</option> 
	<option value="CMT302">�鸴����(һ��)</option> 
	<option value="CMT319">С��ҵ���˻����뱨��(һ��)</option> 
	<option value="CMT320">С��ҵ���˻�Ӧ����(һ��)</option> 
	<option value="CMT313">�����˻ر���(һ��)</option> 
	<option value="CMT3131">ҵ���˻�Ӧ����(һ��)</option>
	 -->
	 		                          </select>
				                  									<span  class="STYLE1">*</span>
																</td>
															
																 
																
															</tr>
															<tr>
															<td class="text_tablehead_b" >
																		��ѯ���ͣ�
																</td>
																<td >
																	<select name="po.querytype" id="querytype" style="width: 180px;" onchange="zcxname(this)">
				                  		                 	         <option value="QT00">������ѯ</option>
				                  		                     	      <option value="QT01">���ʲ�ѯ</option>
				                  		                          </select>
				                  									<span  class="STYLE1">*</span>
																</td>
															
																<td class="text_tablehead_b" >
																	ԭ���ı�ʶ�ţ�
																</td>
																<td >
																	<input type="text" name="po.msgid" id="msgid" /><span  class="STYLE1"> *</span>
																	
																</td>
																
															</tr>
																<tr id="p" style="display:none;">

															 
															
																<td class="text_tablehead_b" >
																	ԭ��ϸ��ʾ�ţ�
																</td>
																<td >
																	<input type="text" name="po.txid" id="txid" /><span  class="STYLE1"> *</span>
																	
																</td>
																
															</tr>
															<tr>
											                  	<td  class="text_tablehead_b">
											                  		��ѯ���ݣ�
											                  	</td>
											                  	<td colspan="3" >
											                   		<textarea name="po.querycontent" class="textarea_msg" cols="50" rows="5" id="querycontent" 
											                   			onKeyPress="charPress()" onkeyup="limitLength(value,512,'��ʾ��','fy')"></textarea>
											                   		<span  class="STYLE1">*</span>
											                   	</td>
											                </tr>
																
															</table>
                                                 </div>
                                                 <div class="table_content" align="center">
                                                 <br />
										<input name="addButton" type="button" style="cursor: pointer"
											class="button" value="��  ��" onclick="commitForm();"/>
										<br />
										<br />
										<span class="STYLE1">˵������ɫ*��ע��Ϊ������</span>
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
